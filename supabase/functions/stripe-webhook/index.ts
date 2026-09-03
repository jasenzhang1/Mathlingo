import { createClient } from "npm:@supabase/supabase-js@2";
import { stripeClient, tierForPrice } from "../_shared/stripe.ts";

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

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // `client_reference_id` is set to the Supabase user id when the Checkout
      // session is created — it is how a Stripe customer is tied to our user.
      const userId = session.client_reference_id;
      const customerId = typeof session.customer === "string" ? session.customer : null;

      if (userId && customerId) {
        await db.from("subscriptions").upsert(
          { user_id: userId, stripe_customer_id: customerId, updated_at: new Date().toISOString() },
          { onConflict: "user_id" },
        );
      }
      // The tier itself is set by the subscription.created/updated event that
      // follows, so there is no need to duplicate that logic here.
    } else {
      const subscription = event.data.object;
      const customerId =
        typeof subscription.customer === "string" ? subscription.customer : null;
      if (!customerId) {
        return new Response("No customer on subscription.", { status: 400 });
      }

      const priceId = subscription.items.data[0]?.price?.id ?? "";
      const tier = event.type === "customer.subscription.deleted"
        ? "free"
        : (tierForPrice(priceId) ?? "free");

      const periodEnd = subscription.items.data[0]?.current_period_end;

      const { error } = await db
        .from("subscriptions")
        .update({
          stripe_subscription_id: subscription.id,
          tier,
          status:
            event.type === "customer.subscription.deleted" ? "canceled" : subscription.status,
          current_period_end: periodEnd
            ? new Date(periodEnd * 1000).toISOString()
            : null,
          cancel_at_period_end: subscription.cancel_at_period_end ?? false,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", customerId);

      if (error) throw new Error(error.message);
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
