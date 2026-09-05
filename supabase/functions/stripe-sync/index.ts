import { createClient } from "npm:@supabase/supabase-js@2";
import { json, preflight } from "../_shared/cors.ts";
import { stripeClient, tierForPrice } from "../_shared/stripe.ts";

/**
 * Reconciles our subscription row against Stripe's live state.
 *
 * Webhooks are best-effort. Events get missed — a destination created after the
 * first purchase, an event type left unticked, a delivery that failed while the
 * function was mid-deploy, a Stripe outage. When that happens the webhook-only
 * design has no way back: our row stays wrong until some *future* event happens
 * to correct it, and a paying customer sits on the free tier in the meantime.
 *
 * So this asks Stripe directly and writes what it says. Stripe is the source of
 * truth for billing; our table is a cache, and this is the cache refresh. It is
 * safe to call at any time and converges on the same answer as the webhook.
 */

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;

  try {
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "Not signed in." }, 401);

    const db = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    const { data: userData, error: userError } = await db.auth.getUser(token);
    if (userError || !userData?.user) return json({ error: "Session expired." }, 401);
    const user = userData.user;

    const stripe = stripeClient();

    // Find the customer: our row first, then by email, so a subscription made
    // before the row existed is still recoverable.
    const { data: row } = await db
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    let customerId = row?.stripe_customer_id as string | undefined;

    if (!customerId && user.email) {
      const found = await stripe.customers.list({ email: user.email, limit: 1 });
      customerId = found.data[0]?.id;
    }

    if (!customerId) {
      return json({ tier: "free", status: "inactive", synced: false });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      limit: 10,
    });

    /**
     * A customer can have several subscription objects — an abandoned
     * 'incomplete' one alongside the real one, or an old cancelled plan. Rank so
     * the entitlement-granting subscription wins regardless of creation order.
     */
    const rank = (status: string) =>
      status === "active" || status === "trialing"
        ? 3
        : status === "past_due"
          ? 2
          : status === "incomplete"
            ? 1
            : 0;

    const best = subscriptions.data.sort(
      (a, b) => rank(b.status) - rank(a.status) || b.created - a.created,
    )[0];

    if (!best) {
      await db.from("subscriptions").upsert(
        {
          user_id: user.id,
          stripe_customer_id: customerId,
          tier: "free",
          status: "inactive",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
      return json({ tier: "free", status: "inactive", synced: true });
    }

    const priceId = best.items.data[0]?.price?.id ?? "";
    const mapped = tierForPrice(priceId);
    if (!mapped) {
      return json(
        {
          error:
            `Stripe price ${priceId} maps to no tier. Check STRIPE_PRICE_GRADED / ` +
            `STRIPE_PRICE_TUTORED against your Stripe dashboard.`,
        },
        500,
      );
    }

    const withPeriod = best as unknown as { current_period_end?: number };
    const periodEnd = best.items.data[0]?.current_period_end ?? withPeriod.current_period_end;

    const entitling = ["active", "trialing", "past_due"].includes(best.status);

    await db.from("subscriptions").upsert(
      {
        user_id: user.id,
        stripe_customer_id: customerId,
        stripe_subscription_id: best.id,
        tier: entitling ? mapped : "free",
        status: best.status,
        current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
        cancel_at_period_end: best.cancel_at_period_end ?? false,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

    console.log(`sync: user ${user.id} -> ${mapped} (${best.status})`);

    return json({
      tier: entitling ? mapped : "free",
      status: best.status,
      synced: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("stripe-sync:", message);
    return json({ error: message }, 500);
  }
});
