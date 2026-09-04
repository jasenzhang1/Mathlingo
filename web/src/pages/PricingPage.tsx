import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { startCheckout } from "../lib/billing/api";
import { PLANS, type Tier } from "../lib/billing/tiers";
import { useSubscription } from "../lib/billing/useSubscription";
import { useAuth } from "../lib/auth/useAuth";

export function PricingPage() {
  const { user } = useAuth();
  const { subscription, loading } = useSubscription();
  const [searchParams] = useSearchParams();
  const [pending, setPending] = useState<Tier | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cancelled = searchParams.get("checkout") === "cancelled";

  async function choose(tier: Tier) {
    if (tier === "free") return;
    setError(null);
    setPending(tier);

    const result = await startCheckout(tier);
    if (!result.ok) {
      setError(result.message);
      setPending(null);
      return;
    }
    // Leave the app for Stripe's hosted checkout — card details are entered
    // there, on Stripe's domain, and never touch this application.
    window.location.href = result.url;
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="font-display text-3xl text-[var(--ink)] md:text-4xl">
            Plans
          </h1>
          <p className="font-body mx-auto mt-3 max-w-xl text-[var(--ink-soft)]">
            The curriculum is free, and always will be. What costs money is the
            part that needs a model behind it — marking your reasoning, and
            arguing with you about it.
          </p>
        </div>

        {cancelled && (
          <p className="font-body mx-auto mt-6 max-w-md rounded-xl bg-[var(--panel)] px-4 py-3 text-center text-sm text-[var(--ink-soft)]">
            Checkout cancelled — nothing was charged.
          </p>
        )}

        {error && (
          <p className="font-body mx-auto mt-6 max-w-md rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => {
            const current = !loading && subscription.tier === plan.id;
            const featured = plan.id === "graded";

            return (
              <div
                key={plan.id}
                className={`flex flex-col rounded-2xl border bg-[var(--panel)] p-6 shadow-sm ${
                  featured ? "border-[var(--accent)]" : "border-[var(--line)]"
                }`}
              >
                {featured && (
                  <span className="font-body mb-3 self-start rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
                    Most useful
                  </span>
                )}

                <h2 className="font-display text-xl text-[var(--ink)]">{plan.name}</h2>
                <p className="font-display mt-1 text-3xl text-[var(--ink)]">
                  {plan.priceLabel}
                  {plan.id !== "free" && (
                    <span className="font-body text-sm text-[var(--ink-soft)]">/month</span>
                  )}
                </p>
                <p className="font-body mt-2 text-sm text-[var(--ink-soft)]">
                  {plan.tagline}
                </p>

                <ul className="font-body mt-5 flex-1 space-y-2 text-sm text-[var(--ink)]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="text-[var(--teal)]" aria-hidden="true">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.excludes?.map((feature) => (
                    <li key={feature} className="flex gap-2 text-[var(--ink-soft)]">
                      <span aria-hidden="true">·</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {current ? (
                    <span className="font-body block rounded-full border border-[var(--line)] px-4 py-2.5 text-center text-sm font-medium text-[var(--ink-soft)]">
                      Your current plan
                    </span>
                  ) : plan.id === "free" ? (
                    <Link
                      to="/map"
                      className="font-body block rounded-full border border-[var(--line)] px-4 py-2.5 text-center text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
                    >
                      Start learning
                    </Link>
                  ) : !user ? (
                    <Link
                      to="/login"
                      className="font-body block rounded-full bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-semibold text-white hover:opacity-90"
                    >
                      Sign in to subscribe
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void choose(plan.id)}
                      disabled={pending !== null}
                      className="font-body w-full rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                    >
                      {pending === plan.id ? "Opening checkout…" : `Choose ${plan.name}`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="font-body mx-auto mt-8 max-w-2xl text-center text-xs text-[var(--ink-soft)]">
          Payments are handled by Stripe. Card details are entered on Stripe's
          own page and never reach Mathlingo's servers. Cancel any time from your
          account — you keep access until the end of the period you've paid for.
        </p>
      </main>
      <Footer />
    </div>
  );
}
