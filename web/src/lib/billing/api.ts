import { describeFunctionError } from "../functionErrors";
import { supabase } from "../supabase";
import type { Tier } from "./tiers";

export interface Subscription {
  tier: Tier;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  hasBillingAccount: boolean;
}

export const FREE_SUBSCRIPTION: Subscription = {
  tier: "free",
  status: "inactive",
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
  hasBillingAccount: false,
};

/**
 * Reads the caller's own subscription row.
 *
 * RLS restricts this to their own row, and there is no write policy at all —
 * the Stripe webhook is the only writer. So this is safe to read directly from
 * the browser, and safe to be wrong about: the Edge Functions re-check
 * entitlement server-side before spending anything.
 */
export async function loadSubscription(userId: string): Promise<Subscription> {
  const { data } = await supabase
    .from("subscriptions")
    .select("tier, status, current_period_end, cancel_at_period_end, stripe_customer_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (!data) return FREE_SUBSCRIPTION;

  const row = data as {
    tier: Tier;
    status: string;
    current_period_end: string | null;
    cancel_at_period_end: boolean;
    stripe_customer_id: string | null;
  };

  // Mirrors public.effective_tier: a lapsed subscription is not entitlement.
  const paying = ["active", "trialing", "past_due"].includes(row.status);

  return {
    tier: paying ? row.tier : "free",
    status: row.status,
    currentPeriodEnd: row.current_period_end,
    cancelAtPeriodEnd: row.cancel_at_period_end,
    hasBillingAccount: Boolean(row.stripe_customer_id),
  };
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

/** Starts Checkout. The browser leaves this app for Stripe's hosted page. */
export function startCheckout(tier: Exclude<Tier, "free">) {
  return invokeForUrl("stripe-checkout", { tier });
}

/** Opens the Customer Portal to change plan, card, or cancel. */
export function openBillingPortal() {
  return invokeForUrl("stripe-portal", {});
}
