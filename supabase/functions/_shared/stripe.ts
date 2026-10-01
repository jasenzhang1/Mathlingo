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

/**
 * Interview prep is a separate product, not a tier — see migration 0008. Its
 * subscriptions are written to `interview_subscriptions`, never to
 * `subscriptions.tier`.
 */
export function isInterviewPrice(priceId: string): boolean {
  const interview = Deno.env.get("STRIPE_PRICE_INTERVIEW");
  return Boolean(interview) && priceId === interview;
}

export function interviewPrice(): string | undefined {
  return Deno.env.get("STRIPE_PRICE_INTERVIEW");
}

export type Product = "graded" | "tutored" | "interview";

/**
 * The one-time "for life" price for a product (mode: "payment" Checkout).
 * Lifetime purchases are recorded in `lifetime_purchases` (migration 0009).
 */
export function lifetimePrice(product: Product): string | undefined {
  return Deno.env.get(
    product === "graded"
      ? "STRIPE_PRICE_GRADED_LIFETIME"
      : product === "tutored"
        ? "STRIPE_PRICE_TUTORED_LIFETIME"
        : "STRIPE_PRICE_INTERVIEW_LIFETIME",
  );
}

export const isProduct = (v: unknown): v is Product => v === "graded" || v === "tutored" || v === "interview";

/**
 * `current_period_end` moved from the subscription onto its items in a 2025 API
 * version, and which one is populated depends on the version the account is
 * pinned to — so read both. The typed SDK only knows the older location.
 */
export function periodEndOf(subscription: Stripe.Subscription): number | undefined {
  const item = subscription.items.data[0] as unknown as { current_period_end?: number } | undefined;
  return item?.current_period_end ?? (subscription as unknown as { current_period_end?: number }).current_period_end;
}
