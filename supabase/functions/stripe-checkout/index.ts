import { createClient } from "npm:@supabase/supabase-js@2";
import { json, preflight } from "../_shared/cors.ts";
import { priceForTier, stripeClient } from "../_shared/stripe.ts";

/**
 * Creates a Stripe Checkout session and returns its URL for the browser to
 * redirect to.
 *
 * The price is resolved from the tier **on the server**. The client sends only
 * "graded" or "tutored" — never a price or an amount — because a client that
 * can name its own price can name a very low one.
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

    const body = await req.json();
    const tier = body.tier === "tutored" ? "tutored" : "graded";
    const origin = String(body.origin ?? "").replace(/\/$/, "");
    if (!origin) return json({ error: "Missing origin." }, 400);

    const price = priceForTier(tier);
    if (!price) {
      return json(
        { error: `No Stripe price configured for the ${tier} tier.` },
        500,
      );
    }

    const stripe = stripeClient();

    // Reuse the Stripe customer if this user has one, so upgrades and repeat
    // purchases do not scatter duplicate customers through the dashboard.
    const { data: existing } = await db
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    let customerId = existing?.stripe_customer_id as string | undefined;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await db.from("subscriptions").upsert(
        { user_id: user.id, stripe_customer_id: customerId, updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      // How the webhook ties the resulting subscription back to our user.
      client_reference_id: user.id,
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/account?checkout=success`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      allow_promotion_codes: true,
      subscription_data: { metadata: { supabase_user_id: user.id } },
    });

    return json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("stripe-checkout:", message);
    return json({ error: message }, 500);
  }
});
