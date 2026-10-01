import { createClient } from "npm:@supabase/supabase-js@2";
import type Stripe from "npm:stripe@17";
import { isInterviewPrice, isProduct, periodEndOf, stripeClient, tierForPrice } from "../_shared/stripe.ts";

/**
 * Stripe -> our subscriptions table. The only writer of entitlement.
 *
 * This endpoint has JWT verification disabled (see config.toml) because Stripe
 * has no Supabase session. Its authentication is the signature header, and that
 * check is the single most important line in this file: without it, anyone who
 * learns the URL can POST a fabricated "subscription active" event and grant
 * themselves a paid plan.
 *
 * Two Deno-specific details that are easy to get wrong:
 *  - `constructEventAsync`, not `constructEvent`. Deno's Web Crypto is async,
 *    and the sync version throws here.
 *  - The RAW request body must be passed to the verifier. Parsing it as JSON
 *    first and re-serialising changes the bytes and the signature fails.
 */

const RELEVANT = new Set([
  "checkout.session.completed",
  // A lifetime purchase paid by a delayed method (e.g. bank debit) completes
  // its checkout unpaid and is only granted when this arrives.
  "checkout.session.async_payment_succeeded",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

function admin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature || !secret) {
    return new Response("Missing signature or signing secret.", { status: 400 });
  }

  const raw = await req.text();
  const stripe = stripeClient();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(raw, signature, secret);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("signature verification failed:", message);
    return new Response(`Signature verification failed: ${message}`, { status: 400 });
  }

  if (!RELEVANT.has(event.type)) {
    // Acknowledge anything we don't handle, or Stripe retries it indefinitely.
    return new Response(JSON.stringify({ received: true, ignored: event.type }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const db = admin();

    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object as Stripe.Checkout.Session;
      // `client_reference_id` is set to the Supabase user id when the Checkout
      // session is created — it is how a Stripe customer is tied to our user.
      const userId = session.client_reference_id ?? session.metadata?.supabase_user_id ?? null;
      const customerId = typeof session.customer === "string" ? session.customer : null;

      if (userId && customerId) {
        await db.from("subscriptions").upsert(
          { user_id: userId, stripe_customer_id: customerId, updated_at: new Date().toISOString() },
          { onConflict: "user_id" },
        );
      }

      // A lifetime purchase (migration 0009) has no subscription events to
      // follow, so it is granted here — once paid. Keyed by session id, so a
      // retried delivery is a no-op rather than a second purchase.
      const product = session.metadata?.product;
      if (session.mode === "payment" && session.metadata?.billing === "lifetime" && session.payment_status === "paid") {
        if (!userId || !isProduct(product)) {
          throw new Error(`Lifetime checkout ${session.id} is missing its user or product metadata.`);
        }
        const { error } = await db.from("lifetime_purchases").upsert(
          {
            stripe_checkout_session_id: session.id,
            user_id: userId,
            product,
            amount_total: session.amount_total,
            currency: session.currency,
          },
          { onConflict: "stripe_checkout_session_id" },
        );
        if (error) throw new Error(error.message);
        console.log(`lifetime purchase ${session.id}: user ${userId} -> ${product}`);
      }
      // A subscription's tier is set by the subscription.created/updated event
      // that follows, so there is no need to duplicate that logic here.
    } else {
      // RELEVANT narrows to subscription events here; the SDK's union type cannot know that.
      const subscription = event.data.object as Stripe.Subscription;
      const customerId =
        typeof subscription.customer === "string" ? subscription.customer : null;
      if (!customerId) {
        return new Response("No customer on subscription.", { status: 400 });
      }

      const deleted = event.type === "customer.subscription.deleted";
      const priceId = subscription.items.data[0]?.price?.id ?? "";

      // Interview prep is a second, independent subscription (migration 0008).
      // It must never reach the tier logic below: cancelling it would
      // otherwise set the customer's *learning* tier to free.
      if (isInterviewPrice(priceId)) {
        const periodEnd = periodEndOf(subscription);
        const { data: existing } = await db
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .maybeSingle();
        const userId = (existing?.user_id as string | undefined) ?? subscription.metadata?.supabase_user_id;
        if (!userId) {
          throw new Error(`No user for Stripe customer ${customerId} (interview subscription ${subscription.id}).`);
        }
        const { error } = await db.from("interview_subscriptions").upsert(
          {
            user_id: userId,
            stripe_subscription_id: subscription.id,
            status: deleted ? "canceled" : subscription.status,
            current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
            cancel_at_period_end: subscription.cancel_at_period_end ?? false,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );
        if (error) throw new Error(error.message);
        console.log(`interview subscription ${subscription.id}: user ${userId} (${deleted ? "canceled" : subscription.status})`);
        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const mapped = tierForPrice(priceId);

      /**
       * An unrecognised price used to fall back to 'free', which meant a
       * mistyped STRIPE_PRICE_* secret produced a *paying customer on the free
       * tier* — status 'active', tier 'free' — with a green webhook delivery and
       * nothing in the logs. Throwing instead makes Stripe mark the delivery
       * failed and retry, and names the offending price id so the mismatch is
       * findable.
       */
      if (!deleted && !mapped) {
        throw new Error(
          `Price ${priceId} maps to no tier. Check STRIPE_PRICE_GRADED ` +
            `(currently ${Deno.env.get("STRIPE_PRICE_GRADED") ?? "unset"}) and ` +
            `STRIPE_PRICE_TUTORED (currently ${Deno.env.get("STRIPE_PRICE_TUTORED") ?? "unset"}).`,
        );
      }

      const tier = deleted ? "free" : mapped!;

      /**
       * `current_period_end` moved from the subscription object onto its items
       * in a 2025 API version. Which one is populated depends on the API
       * version the account is pinned to, so read both — getting this wrong
       * silently stores a null period end, and `effective_tier` would then
       * treat a paying customer as entitled forever.
       */
      const periodEnd = periodEndOf(subscription);

      const fields = {
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        tier,
        status: deleted ? "canceled" : subscription.status,
        current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
        cancel_at_period_end: subscription.cancel_at_period_end ?? false,
        updated_at: new Date().toISOString(),
      };

      /**
       * Resolve the user before writing.
       *
       * This was an `update ... eq(stripe_customer_id)`, which returns NO error
       * when it matches nothing — so a customer with no row yet produced a
       * successful, green, entirely ineffective delivery. Stripe does not
       * guarantee event ordering, so `customer.subscription.created` can arrive
       * before `checkout.session.completed`, and a subscription started from the
       * Customer Portal has no checkout event at all.
       *
       * `subscription_data.metadata.supabase_user_id` is set when the Checkout
       * session is created, which gives a second way home when the customer id
       * is not yet on file.
       */
      const { data: existing } = await db
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_customer_id", customerId)
        .maybeSingle();

      const metadataUserId = subscription.metadata?.supabase_user_id;
      const userId = (existing?.user_id as string | undefined) ?? metadataUserId;

      if (!userId) {
        throw new Error(
          `No user for Stripe customer ${customerId}: no subscriptions row, and ` +
            `the subscription carries no supabase_user_id metadata.`,
        );
      }

      const { error } = await db
        .from("subscriptions")
        .upsert({ user_id: userId, ...fields }, { onConflict: "user_id" });

      if (error) throw new Error(error.message);
      console.log(`subscription ${subscription.id}: user ${userId} -> ${tier} (${fields.status})`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("webhook handler failed:", event.type, message);
    // A 500 makes Stripe retry with backoff, which is the behaviour we want for
    // a transient database failure — the event is not lost.
    return new Response(`Handler failed: ${message}`, { status: 500 });
  }
});
