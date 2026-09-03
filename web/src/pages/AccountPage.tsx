import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { openBillingPortal } from "../lib/billing/api";
import { PLANS } from "../lib/billing/tiers";
import { useSubscription } from "../lib/billing/useSubscription";
import { useAuth } from "../lib/auth/useAuth";

export function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading, refresh } = useSubscription();
  const [searchParams] = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const justPaid = searchParams.get("checkout") === "success";

  /**
   * Stripe redirects back the moment payment succeeds, but the webhook that
   * grants the tier is a separate request that often lands a second or two
   * later. Without these retries a user who has just paid sees "Free".
   */
  useEffect(() => {
    if (!justPaid) return;
    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      void refresh();
      if (attempts >= 5 || subscription.tier !== "free") clearInterval(timer);
    }, 1500);
    return () => clearInterval(timer);
  }, [justPaid, refresh, subscription.tier]);

  async function manage() {
    setError(null);
    setBusy(true);
    const result = await openBillingPortal();
    if (!result.ok) {
      setError(result.message);
      setBusy(false);
      return;
    }
    window.location.href = result.url;
  }

  const plan = PLANS.find((p) => p.id === subscription.tier) ?? PLANS[0]!;

  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-[var(--paper)]">
        <Nav />
        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="font-display text-2xl text-[var(--ink)]">Sign in</h1>
          <Link
            to="/login"
            className="font-body mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Go to login →
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl text-[var(--ink)]">Account</h1>
        <p className="font-body mt-2 text-[var(--ink-soft)]">{user?.email}</p>

        {justPaid && subscription.tier !== "free" && (
          <p className="font-body mt-6 rounded-xl bg-[var(--teal)]/10 px-4 py-3 text-sm text-[var(--teal)]">
            You're on {plan.name}. Written answers and everything it unlocks are
            live now.
          </p>
        )}

        <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
          <h2 className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
            Plan
          </h2>

          {loading ? (
            <div className="mt-3 h-6 w-32 rounded bg-[var(--line)]" />
          ) : (
            <>
              <p className="font-display mt-1.5 text-2xl text-[var(--ink)]">
                {plan.name}
              </p>
              <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">
                {plan.tagline}
              </p>

              {subscription.currentPeriodEnd && subscription.tier !== "free" && (
                <p className="font-body mt-3 text-sm text-[var(--ink-soft)]">
                  {subscription.cancelAtPeriodEnd
                    ? `Cancels on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}. You keep access until then.`
                    : `Renews on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}.`}
                </p>
              )}

              {subscription.status === "past_due" && (
                <p className="font-body mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                  Your last payment didn't go through. Update your card to keep
                  access — we'll hold your plan for a few days.
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                {subscription.hasBillingAccount && (
                  <button
                    type="button"
                    onClick={() => void manage()}
                    disabled={busy}
                    className="font-body rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] disabled:opacity-50"
                  >
                    {busy ? "Opening…" : "Manage billing"}
                  </button>
                )}
                {subscription.tier !== "tutored" && (
                  <Link
                    to="/pricing"
                    className="font-body rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                  >
                    {subscription.tier === "free" ? "See plans" : "Upgrade"}
                  </Link>
                )}
              </div>

              {error && (
                <p className="font-body mt-3 text-sm text-red-700">{error}</p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
