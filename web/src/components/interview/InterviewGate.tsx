import { useEffect, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { startCheckout } from "../../lib/billing/api";
import { INTERVIEW_PLAN, type Billing } from "../../lib/billing/tiers";
import { useOwnProfile } from "../../lib/profiles";
import { Price } from "../billing/Price";
import { useSubscription } from "../../lib/billing/useSubscription";
import { useAuth } from "../../lib/auth/useAuth";
import { useIsDeveloper } from "../../lib/dev/devAuth";
import { InterviewAccessContext } from "../../lib/interview/access";
import { Footer } from "../Footer";
import { Nav } from "../Nav";

/**
 * Wraps every interview page. Subscribers (and developers) get everything;
 * signed-in users without the subscription get the free tier (the first
 * problems of the list), which pages read through `useInterviewAccess`;
 * signed-out visitors see the sales page.
 *
 * This is presentation, not protection — the question bank ships with the
 * site, so the gate decides what is shown, not what can be read.
 */
export function InterviewGate({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { interview, loading, refresh } = useSubscription();
  const isDeveloper = useIsDeveloper();
  const [searchParams] = useSearchParams();
  const justPaid = searchParams.get("checkout") === "success";

  // The webhook that grants access usually lands a moment after Stripe
  // redirects back; re-read a few times rather than show the paywall to
  // someone who has just paid.
  useEffect(() => {
    if (!justPaid || interview) return;
    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      void refresh();
      if (attempts >= 5) clearInterval(timer);
    }, 1500);
    return () => clearInterval(timer);
  }, [justPaid, interview, refresh]);

  const shell = (body: ReactNode) => (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-12">{body}</main>
      <Footer />
    </div>
  );

  if (authLoading || loading) {
    return shell(<p className="font-body text-center text-[var(--ink-soft)]">Loading…</p>);
  }
  if (user || isDeveloper) {
    const full = interview || isDeveloper;
    return shell(
      <InterviewAccessContext.Provider value={{ full }}>
        {!full && justPaid && (
          <p className="font-body mb-6 rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-center text-sm text-[var(--accent)]">
            Payment received — unlocking your access…
          </p>
        )}
        {children}
      </InterviewAccessContext.Provider>,
    );
  }

  return shell(
    <div className="mx-auto max-w-xl text-center">
      <h1 className="font-display text-3xl text-[var(--ink)] md:text-4xl">{INTERVIEW_PLAN.name}</h1>
      <p className="font-body mt-3 text-[var(--ink-soft)]">{INTERVIEW_PLAN.tagline}</p>
      <p className="font-body mt-4 text-sm text-[var(--ink-soft)]">
        <Link to="/signup" className="font-medium text-[var(--accent)] hover:underline">
          Create a free account
        </Link>{" "}
        to try the first 50 problems free.
      </p>
      <div className="mt-8 text-left">
        <InterviewUpgradeCard />
      </div>
    </div>,
  );
}

/** The subscribe card: monthly or lifetime price (student-discounted when it applies), what's included, and checkout. */
export function InterviewUpgradeCard() {
  const { user } = useAuth();
  const student = Boolean(useOwnProfile()?.isStudent);
  const [searchParams] = useSearchParams();
  const [pending, setPending] = useState<Billing | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cancelled = searchParams.get("checkout") === "cancelled";

  async function buy(billing: Billing) {
    setError(null);
    setPending(billing);
    const result = await startCheckout("interview", billing);
    if (!result.ok) {
      setError(result.message);
      setPending(null);
      return;
    }
    window.location.href = result.url;
  }

  const button =
    "font-body w-full rounded-full px-4 py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-50";

  return (
    <div className="rounded-2xl border border-[var(--accent)] bg-[var(--panel)] p-6 shadow-sm">
      {cancelled && (
        <p className="font-body mb-4 rounded-xl bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink-soft)]">
          Checkout cancelled — nothing was charged.
        </p>
      )}
      {error && <p className="font-body mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <Price amount={INTERVIEW_PLAN.monthly} student={student} suffix="/month" />
        <span className="font-body text-sm text-[var(--ink-soft)]">or</span>
        <Price amount={INTERVIEW_PLAN.lifetime} student={student} suffix="for life" />
      </div>
      <p className="font-body mt-1 text-xs text-[var(--ink-soft)]">
        Separate from, and independent of, any learning plan.
        {student && " Student pricing applied automatically at checkout."}
      </p>
      <ul className="font-body mt-5 space-y-2 text-sm text-[var(--ink)]">
        {INTERVIEW_PLAN.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-[var(--teal)]" aria-hidden="true">
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        {user ? (
          <div className="grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => void buy("monthly")} disabled={pending !== null} className={`${button} bg-[var(--accent)] text-white`}>
              {pending === "monthly" ? "Opening checkout…" : "Subscribe monthly"}
            </button>
            <button
              type="button"
              onClick={() => void buy("lifetime")}
              disabled={pending !== null}
              className={`${button} border border-[var(--accent)] text-[var(--accent)]`}
            >
              {pending === "lifetime" ? "Opening checkout…" : "Buy for life"}
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="font-body block rounded-full bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-semibold text-white hover:opacity-90"
          >
            Sign in to subscribe
          </Link>
        )}
      </div>
    </div>
  );
}
