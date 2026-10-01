import { useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Price } from "../components/billing/Price";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { startCheckout } from "../lib/billing/api";
import { INTERVIEW_FREE_PLAN, INTERVIEW_PLAN, PLANS, STUDENT_DISCOUNT, type Billing, type Tier } from "../lib/billing/tiers";
import { useSubscription } from "../lib/billing/useSubscription";
import { useAuth } from "../lib/auth/useAuth";
import { useOwnProfile } from "../lib/profiles";

type Product = Exclude<Tier, "free"> | "interview";

const RANK: Record<Tier, number> = { free: 0, graded: 1, tutored: 2 };
const discountPercent = Math.round(STUDENT_DISCOUNT * 100);

export function PricingPage() {
  const { user } = useAuth();
  const profile = useOwnProfile();
  const student = Boolean(profile?.isStudent);
  const { subscription, interview, interviewLifetime, loading } = useSubscription();
  const [searchParams] = useSearchParams();
  const [billing, setBilling] = useState<Billing>("monthly");
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cancelled = searchParams.get("checkout") === "cancelled";

  async function choose(product: Product) {
    setError(null);
    setPending(`${product}-${billing}`);

    const result = await startCheckout(product, billing);
    if (!result.ok) {
      setError(result.message);
      setPending(null);
      return;
    }
    // Leave the app for Stripe's hosted checkout — card details are entered
    // there, on Stripe's domain, and never touch this application.
    window.location.href = result.url;
  }

  /** The price line for a paid plan in the selected billing, with the other option underneath. */
  function priceBlock(monthly: number, lifetime: number) {
    const [main, other] = billing === "monthly" ? [monthly, lifetime] : [lifetime, monthly];
    return (
      <>
        <p className="mt-1">
          <Price amount={main} student={student} suffix={billing === "monthly" ? "/month" : "once, for life"} />
        </p>
        <p className="font-body mt-0.5 text-xs text-[var(--ink-soft)]">
          or <Price amount={other} student={student} suffix={billing === "monthly" ? "for life" : "/month"} size="sm" />
        </p>
      </>
    );
  }

  /** The button (or status) at the bottom of a paid card. */
  function action(product: Product, name: string, owned: "lifetime" | "current" | null): ReactNode {
    if (owned === "lifetime") return <span className={statusPill}>Yours for life</span>;
    if (owned === "current" && billing === "monthly") return <span className={statusPill}>Your current plan</span>;
    if (!user) {
      return (
        <Link to="/login" className={primaryButton + " block text-center"}>
          Sign in to {billing === "monthly" ? "subscribe" : "buy"}
        </Link>
      );
    }
    const key = `${product}-${billing}`;
    return (
      <button type="button" onClick={() => void choose(product)} disabled={pending !== null} className={primaryButton + " w-full"}>
        {pending === key ? "Opening checkout…" : billing === "monthly" ? `Choose ${name}` : `Buy ${name} for life`}
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="font-display text-3xl text-[var(--ink)] md:text-4xl">Plans</h1>
          <p className="font-body mx-auto mt-3 max-w-xl text-[var(--ink-soft)]">
            The curriculum is free, and always will be. What costs money is the part that needs a model behind it —
            marking your reasoning, and arguing with you about it.
          </p>

          <div className="mt-8 inline-flex rounded-full border border-[var(--line)] bg-[var(--panel)] p-1" role="group" aria-label="Billing">
            {(["monthly", "lifetime"] as Billing[]).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBilling(b)}
                aria-pressed={billing === b}
                className={`font-body rounded-full px-5 py-1.5 text-sm font-medium ${billing === b ? "bg-[var(--accent)] text-white" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"}`}
              >
                {b === "monthly" ? "Monthly" : "For life"}
              </button>
            ))}
          </div>
        </div>

        {student ? (
          <p className="font-body mx-auto mt-6 max-w-md rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-center text-sm text-[var(--accent)]">
            Student pricing: {discountPercent}% off every paid plan, applied automatically at checkout.
          </p>
        ) : (
          <p className="font-body mx-auto mt-6 max-w-md text-center text-sm text-[var(--ink-soft)]">
            Students get {discountPercent}% off every paid plan — sign up with your school email.
          </p>
        )}

        {cancelled && (
          <p className="font-body mx-auto mt-6 max-w-md rounded-xl bg-[var(--panel)] px-4 py-3 text-center text-sm text-[var(--ink-soft)]">
            Checkout cancelled — nothing was charged.
          </p>
        )}

        {error && (
          <p className="font-body mx-auto mt-6 max-w-md rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">{error}</p>
        )}

        <h2 className="font-display mt-12 text-2xl text-[var(--ink)]">Learning</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => {
            const featured = plan.id === "graded";
            const ownedForLife = !loading && plan.id !== "free" && RANK[subscription.lifetimeTier] >= RANK[plan.id];
            const subscribed = !loading && plan.id !== "free" && subscription.subscriptionTier === plan.id;

            return (
              <div
                key={plan.id}
                className={`flex flex-col rounded-2xl border bg-[var(--panel)] p-6 shadow-sm ${featured ? "border-[var(--accent)]" : "border-[var(--line)]"}`}
              >
                {featured && (
                  <span className="font-body mb-3 self-start rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
                    Most useful
                  </span>
                )}

                <h3 className="font-display text-xl text-[var(--ink)]">{plan.name}</h3>
                {plan.id === "free" ? (
                  <p className="mt-1">
                    <Price amount={0} student={false} />
                  </p>
                ) : (
                  priceBlock(plan.monthly, plan.lifetime)
                )}
                <p className="font-body mt-2 text-sm text-[var(--ink-soft)]">{plan.tagline}</p>

                <FeatureList features={plan.features} excludes={plan.excludes} />

                <div className="mt-6">
                  {plan.id === "free" ? (
                    !loading && subscription.tier === "free" && user ? (
                      <span className={statusPill}>Your current plan</span>
                    ) : (
                      <Link to="/map" className={secondaryButton}>
                        Start learning
                      </Link>
                    )
                  ) : (
                    action(plan.id, plan.name, ownedForLife ? "lifetime" : subscribed ? "current" : null)
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="font-display mt-14 text-2xl text-[var(--ink)]">Interview prep</h2>
        <p className="font-body mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">
          A separate plan for quant interview practice. It doesn't need, and isn't part of, a learning plan.
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
            <h3 className="font-display text-xl text-[var(--ink)]">{INTERVIEW_FREE_PLAN.name}</h3>
            <p className="mt-1">
              <Price amount={0} student={false} />
            </p>
            <p className="font-body mt-2 text-sm text-[var(--ink-soft)]">{INTERVIEW_FREE_PLAN.tagline}</p>
            <FeatureList features={INTERVIEW_FREE_PLAN.features} excludes={INTERVIEW_FREE_PLAN.excludes} />
            <div className="mt-6">
              {!loading && user && !interview ? (
                <Link to="/interview" className={secondaryButton}>
                  Try the free decks
                </Link>
              ) : (
                <Link to={user ? "/interview" : "/signup"} className={secondaryButton}>
                  {user ? "Open Interview Prep" : "Sign up free"}
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-[var(--accent)] bg-[var(--panel)] p-6 shadow-sm">
            <h3 className="font-display text-xl text-[var(--ink)]">{INTERVIEW_PLAN.name}</h3>
            {priceBlock(INTERVIEW_PLAN.monthly, INTERVIEW_PLAN.lifetime)}
            <p className="font-body mt-2 text-sm text-[var(--ink-soft)]">{INTERVIEW_PLAN.tagline}</p>
            <FeatureList features={INTERVIEW_PLAN.features} excludes={INTERVIEW_PLAN.excludes} />
            <div className="mt-6">
              {action("interview", INTERVIEW_PLAN.name, loading ? null : interviewLifetime ? "lifetime" : interview ? "current" : null)}
            </div>
          </div>
        </div>

        <p className="font-body mx-auto mt-8 max-w-2xl text-center text-xs text-[var(--ink-soft)]">
          Payments are handled by Stripe. Card details are entered on Stripe's own page and never reach Mathlingo's
          servers. Monthly plans can be cancelled any time from your account — you keep access until the end of the
          period you've paid for. Lifetime plans are a single payment with no renewal.
        </p>
      </main>
      <Footer />
    </div>
  );
}

const primaryButton =
  "font-body rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50";
const secondaryButton =
  "font-body block rounded-full border border-[var(--line)] px-4 py-2.5 text-center text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]";
const statusPill =
  "font-body block rounded-full border border-[var(--line)] px-4 py-2.5 text-center text-sm font-medium text-[var(--ink-soft)]";

function FeatureList({ features, excludes }: { features: string[]; excludes?: string[] }) {
  return (
    <ul className="font-body mt-5 flex-1 space-y-2 text-sm text-[var(--ink)]">
      {features.map((feature) => (
        <li key={feature} className="flex gap-2">
          <span className="text-[var(--teal)]" aria-hidden="true">
            ✓
          </span>
          <span>{feature}</span>
        </li>
      ))}
      {excludes?.map((feature) => (
        <li key={feature} className="flex gap-2 text-[var(--ink-soft)]">
          <span aria-hidden="true">·</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
