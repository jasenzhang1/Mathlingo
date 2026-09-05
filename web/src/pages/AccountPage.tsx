import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { openBillingPortal, syncSubscription } from "../lib/billing/api";
import { PLANS } from "../lib/billing/tiers";
import { useSubscription } from "../lib/billing/useSubscription";
import { useAuth } from "../lib/auth/useAuth";
import { useOwnProfile } from "../lib/profiles";

export function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const { subscription, loading, refresh } = useSubscription();
  const profile = useOwnProfile();
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
      if (attempts >= 4 || subscription.tier !== "free") clearInterval(timer);
    }, 1500);
    return () => clearInterval(timer);
  }, [justPaid, refresh, subscription.tier]);

  /**
   * Still on the free tier several seconds after paying means the webhook did
   * not arrive or did not apply. Retrying the read is pointless at that stage —
   * the row is wrong, not stale — so go and ask Stripe directly. Runs once.
   */
  const [reconciled, setReconciled] = useState(false);
  useEffect(() => {
    if (!justPaid || reconciled || loading || subscription.tier !== "free")
      return;
    const timer = setTimeout(() => {
      setReconciled(true);
      void resync();
    }, 7000);
    return () => clearTimeout(timer);
    // resync is stable enough for this one-shot; re-running on identity changes
    // would restart the timer on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justPaid, reconciled, loading, subscription.tier]);

  /**
   * Reads live state from Stripe and rewrites our row. The escape hatch for a
   * webhook that never arrived — without it, a missed event leaves a paying
   * customer on the free tier with no way to correct it from the UI.
   */
  async function resync() {
    setError(null);
    setBusy(true);
    const result = await syncSubscription();
    if (!result.ok) setError(result.message ?? "Couldn't refresh from Stripe.");
    await refresh();
    setBusy(false);
  }

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
        {profile && (
          <Link
            to={`/u/${profile.username}`}
            className="font-body mt-1 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View your public profile →
          </Link>
        )}

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

              {subscription.currentPeriodEnd &&
                subscription.tier !== "free" && (
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

              {/*
                'incomplete' means Stripe created the subscription but the first
                payment never cleared — usually an abandoned checkout or an
                unconfirmed 3-D Secure step. Showing a bare "Free" here is what
                makes this baffling: the user believes they paid, so the state
                has to be named.
              */}
              {subscription.status === "incomplete" && (
                <p className="font-body mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                  Your payment hasn't completed, so the plan isn't active yet.
                  Nothing has been charged. Start checkout again to finish it —
                  if your bank asked you to confirm the payment, that step needs
                  completing.
                </p>
              )}

              {subscription.status === "incomplete_expired" && (
                <p className="font-body mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                  Your last checkout expired before payment completed, so it was
                  cancelled. Nothing was charged — you can subscribe again
                  below.
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
                    Manage billing
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => void resync()}
                  disabled={busy}
                  className="font-body rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink-soft)] hover:border-[var(--accent)] hover:text-[var(--ink)] disabled:opacity-50"
                  title="Re-read your subscription directly from Stripe"
                >
                  {busy ? "Checking…" : "Refresh from Stripe"}
                </button>
                {subscription.tier !== "tutored" && (
                  <Link
                    to="/pricing"
                    className="font-body rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                  >
                    {subscription.status === "incomplete" ||
                    subscription.status === "incomplete_expired"
                      ? "Complete payment"
                      : subscription.tier === "free"
                        ? "See plans"
                        : "Upgrade"}
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
