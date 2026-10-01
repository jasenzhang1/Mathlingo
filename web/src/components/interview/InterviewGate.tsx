import { useEffect, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { startCheckout } from "../../lib/billing/api";
import { INTERVIEW_PLAN } from "../../lib/billing/tiers";
import { useSubscription } from "../../lib/billing/useSubscription";
import { useAuth } from "../../lib/auth/useAuth";
import { useIsDeveloper } from "../../lib/dev/devAuth";
import { InterviewAccessContext } from "../../lib/interview/access";
import { Footer } from "../Footer";
import { Nav } from "../Nav";

/**
 * Wraps every interview page. Subscribers (and developers) get everything;
 * signed-in users without the subscription get the free tier (a couple of
 * mock-interview decks), which pages read through `useInterviewAccess`;
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
        to try a couple of mock-interview decks first.
      </p>
      <div className="mt-8 text-left">
        <InterviewUpgradeCard />
      </div>
    </div>,
  );
}

/** The subscribe card: price, what's included, and the checkout button. */
export function InterviewUpgradeCard() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cancelled = searchParams.get("checkout") === "cancelled";

  async function subscribe() {
    setError(null);
    setPending(true);
    const result = await startCheckout("interview");
    if (!result.ok) {
      setError(result.message);
      setPending(false);
      return;
    }
    window.location.href = result.url;
  }

  return (
    <div className="rounded-2xl border border-[var(--accent)] bg-[var(--panel)] p-6 shadow-sm">
      {cancelled && (
        <p className="font-body mb-4 rounded-xl bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink-soft)]">
          Checkout cancelled — nothing was charged.
        </p>
      )}
      {error && <p className="font-body mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <p className="font-display text-3xl text-[var(--ink)]">
        {INTERVIEW_PLAN.priceLabel}
        <span className="font-body text-sm text-[var(--ink-soft)]">/month</span>
      </p>
      <p className="font-body mt-1 text-xs text-[var(--ink-soft)]">Separate from, and independent of, any learning plan.</p>
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
          <button
            type="button"
            onClick={() => void subscribe()}
            disabled={pending}
            className="font-body w-full rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Opening checkout…" : `Subscribe to ${INTERVIEW_PLAN.name}`}
          </button>
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
