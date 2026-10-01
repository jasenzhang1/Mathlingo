import { describeFunctionError } from "../functionErrors";
import { supabase } from "../supabase";
import type { Billing, Tier } from "./tiers";

export interface Subscription {
  /** Effective tier: the better of an active subscription and any lifetime purchase. */
  tier: Tier;
  /** The tier owned outright by a lifetime purchase ("free" if none). */
  lifetimeTier: Tier;
  /** The active subscription's tier on its own ("free" if none). */
  subscriptionTier: Tier;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  hasBillingAccount: boolean;
}

export const FREE_SUBSCRIPTION: Subscription = {
  tier: "free",
  lifetimeTier: "free",
  subscriptionTier: "free",
  status: "inactive",
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
  hasBillingAccount: false,
};

const TIER_RANK: Record<Tier, number> = { free: 0, graded: 1, tutored: 2 };
const better = (a: Tier, b: Tier): Tier => (TIER_RANK[a] >= TIER_RANK[b] ? a : b);

/** The caller's lifetime purchases (migration 0009). A missing table reads as none. */
async function loadLifetimeProducts(userId: string): Promise<Set<string>> {
  const { data } = await supabase.from("lifetime_purchases").select("product").eq("user_id", userId);
  return new Set(((data ?? []) as { product: string }[]).map((r) => r.product));
}

/**
 * Reads the caller's own subscription row.
 *
 * RLS restricts this to their own row, and there is no write policy at all —
 * the Stripe webhook is the only writer. So this is safe to read directly from
 * the browser, and safe to be wrong about: the Edge Functions re-check
 * entitlement server-side before spending anything.
 */
export async function loadSubscription(userId: string): Promise<Subscription> {
  const [{ data }, lifetime] = await Promise.all([
    supabase
      .from("subscriptions")
      .select("tier, status, current_period_end, cancel_at_period_end, stripe_customer_id")
      .eq("user_id", userId)
      .maybeSingle(),
    loadLifetimeProducts(userId),
  ]);
  const lifetimeTier: Tier = lifetime.has("tutored") ? "tutored" : lifetime.has("graded") ? "graded" : "free";

  if (!data) return { ...FREE_SUBSCRIPTION, tier: lifetimeTier, lifetimeTier };

  const row = data as {
    tier: Tier;
    status: string;
    current_period_end: string | null;
    cancel_at_period_end: boolean;
    stripe_customer_id: string | null;
  };

  // Mirrors public.effective_tier: a lapsed subscription is not entitlement,
  // and a lifetime purchase always is.
  const paying = ["active", "trialing", "past_due"].includes(row.status);
  const subscriptionTier: Tier = paying ? row.tier : "free";

  return {
    tier: better(subscriptionTier, lifetimeTier),
    lifetimeTier,
    subscriptionTier,
    status: row.status,
    currentPeriodEnd: row.current_period_end,
    cancelAtPeriodEnd: row.cancel_at_period_end,
    hasBillingAccount: Boolean(row.stripe_customer_id),
  };
}

/**
 * Whether the caller holds the separate interview-prep subscription
 * (migration 0008). Same trust model as `loadSubscription`: read-only through
 * RLS, written only by the Stripe webhook. A missing table reads as "no".
 */
export async function loadInterviewAccess(userId: string): Promise<{ access: boolean; lifetime: boolean }> {
  const [{ data }, lifetimeProducts] = await Promise.all([
    supabase.from("interview_subscriptions").select("status, current_period_end").eq("user_id", userId).maybeSingle(),
    loadLifetimeProducts(userId),
  ]);
  // Mirrors public.has_interview_access: a lifetime purchase, or a paying
  // subscription (grace period included).
  if (lifetimeProducts.has("interview")) return { access: true, lifetime: true };
  if (!data) return { access: false, lifetime: false };
  const row = data as { status: string; current_period_end: string | null };
  const graceEnd = row.current_period_end ? new Date(row.current_period_end).getTime() + 3 * 86_400_000 : Infinity;
  return { access: ["active", "trialing", "past_due"].includes(row.status) && graceEnd > Date.now(), lifetime: false };
}

type RedirectResult =
  | { ok: true; url: string }
  | { ok: false; message: string };

async function invokeForUrl(
  fn: "stripe-checkout" | "stripe-portal",
  body: Record<string, unknown>,
): Promise<RedirectResult> {
  const { data, error } = await supabase.functions.invoke<{ url: string }>(fn, {
    body: { ...body, origin: window.location.origin },
  });

  if (error) {
    const failure = await describeFunctionError(error);
    return {
      ok: false,
      message:
        failure.reason === "unavailable"
          ? "Billing isn't set up yet — the payment functions haven't been deployed."
          : failure.message,
    };
  }
  if (!data?.url) return { ok: false, message: "No checkout URL was returned." };
  return { ok: true, url: data.url };
}

/**
 * Asks Stripe for the current state and rewrites our row from it.
 *
 * The escape hatch for a missed webhook. Called explicitly by the user
 * ("Refresh") and automatically when we return from checkout still looking
 * unpaid — the case where the webhook is the thing that failed, so waiting for
 * one more retry is exactly the wrong move.
 */
export async function syncSubscription(): Promise<{ ok: boolean; message?: string }> {
  const { error } = await supabase.functions.invoke("stripe-sync", { body: {} });
  if (error) {
    const failure = await describeFunctionError(error);
    return { ok: false, message: failure.message };
  }
  return { ok: true };
}

/**
 * Starts Checkout. The browser leaves this app for Stripe's hosted page.
 * "interview" buys the separate interview-prep product. "lifetime" is a
 * one-time payment instead of a monthly subscription.
 */
export function startCheckout(tier: Exclude<Tier, "free"> | "interview", billing: Billing = "monthly") {
  return invokeForUrl("stripe-checkout", { tier, billing });
}

/** Opens the Customer Portal to change plan, card, or cancel. */
export function openBillingPortal() {
  return invokeForUrl("stripe-portal", {});
}
