import Stripe from "npm:stripe@17";

/**
 * Shared Stripe client.
 *
 * `httpClient` must be the Fetch client: the SDK defaults to Node's `https`
 * module, which does not exist in Deno, and the failure it produces is an
 * unhelpful runtime error rather than a clear "wrong platform" message.
 */
export function stripeClient(): Stripe {
  const key = Deno.env.get("STRIPE_SECRET_KEY");
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Run: supabase secrets set STRIPE_SECRET_KEY=sk_...",
    );
  }
  /**
   * `apiVersion` is deliberately not pinned here. The SDK's TypeScript types are
   * generated for the exact version it ships with, so naming a different one is
   * a type error at deploy time — and the failure message points at the version
   * string rather than explaining itself. Letting the SDK use its own default
   * keeps types and runtime in agreement.
   */
  return new Stripe(key, {
    httpClient: Stripe.createFetchHttpClient(),
  });
}

/** Maps a Stripe price id to one of our tiers. */
export function tierForPrice(priceId: string): "graded" | "tutored" | null {
  if (priceId === Deno.env.get("STRIPE_PRICE_GRADED")) return "graded";
  if (priceId === Deno.env.get("STRIPE_PRICE_TUTORED")) return "tutored";
  return null;
}

export function priceForTier(tier: "graded" | "tutored"): string | undefined {
  return Deno.env.get(tier === "graded" ? "STRIPE_PRICE_GRADED" : "STRIPE_PRICE_TUTORED");
}
