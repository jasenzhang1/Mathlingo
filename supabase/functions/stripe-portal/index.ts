import { createClient } from "npm:@supabase/supabase-js@2";
import { json, preflight } from "../_shared/cors.ts";
import { stripeClient } from "../_shared/stripe.ts";

/**
 * Opens the Stripe Customer Portal.
 *
 * This is why there is no billing UI to build: upgrades, downgrades,
 * cancellation, changing a card, and downloading invoices are all handled by
 * Stripe's hosted portal, and every one of them emits the webhook events that
 * keep our `subscriptions` table current. Writing those screens ourselves would
 * mean re-implementing proration and dunning, badly.
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

    const body = await req.json();
    const origin = String(body.origin ?? "").replace(/\/$/, "");

    const { data: subscription } = await db
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userData.user.id)
      .maybeSingle();

    const customerId = subscription?.stripe_customer_id as string | undefined;
    if (!customerId) {
      return json({ error: "You don't have a billing account yet." }, 404);
    }

    const session = await stripeClient().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/account`,
    });

    return json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("stripe-portal:", message);
    return json({ error: message }, 500);
  }
});
