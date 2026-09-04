import { Link } from "react-router-dom";
import { PLANS, type Entitlement, tierFor } from "../../lib/billing/tiers";

/**
 * Shown where a paid capability would be.
 *
 * It names what the plan does rather than what the learner is missing, and it
 * never blocks the free path: a learner without AI grading can still type an
 * answer and check it against the rubric themselves, so the prompt sits beside
 * the free route rather than in place of it.
 */
export function UpgradePrompt({
  entitlement,
  signedIn,
}: {
  entitlement: Entitlement;
  signedIn: boolean;
}) {
  const required = tierFor(entitlement);
  const plan = PLANS.find((p) => p.id === required)!;

  const headline =
    entitlement === "ai-tutor"
      ? "The tutor is part of the Tutored plan"
      : "Written answers are graded on the Graded plan";

  const body =
    entitlement === "ai-tutor"
      ? "A sparring partner for this concept — it asks, you answer, and it tells you exactly where the reasoning breaks."
      : "Explain your reasoning in writing, by hand, or out loud, and have it marked against the rubric with per-element feedback.";

  return (
    <div className="rounded-2xl border border-dashed border-[var(--accent)]/40 bg-[var(--panel)] p-6 text-center">
      <h3 className="font-display text-lg text-[var(--ink)]">{headline}</h3>
      <p className="font-body mx-auto mt-2 max-w-md text-sm text-[var(--ink-soft)]">
        {body}
      </p>
      <p className="font-body mt-3 text-sm text-[var(--ink)]">
        {plan.name} — {plan.priceLabel}/month
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {signedIn ? (
          <Link
            to="/pricing"
            className="font-body rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            See plans
          </Link>
        ) : (
          <Link
            to="/login"
            className="font-body rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}
