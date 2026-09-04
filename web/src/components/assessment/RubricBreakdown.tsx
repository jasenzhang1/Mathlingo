import { explainScore } from "../../lib/assessment/rubric";
import type { RubricVerdict } from "../../lib/assessment/types";

/**
 * The element-by-element account of a written answer's score.
 *
 * This is the part that makes a qualitative grade defensible. A bare "72%" on a
 * written answer reads as arbitrary, and the learner's honest reaction is "says
 * who?". Showing which idea earned what, and what full credit would have
 * required, turns the number into something they can argue with — and arguing
 * with it is how they find out what they actually missed.
 *
 * Full-credit elements are shown too, for the same reason: a learner who scored
 * perfectly should learn what they did right, not just see a checkmark.
 */

/**
 * Credit is shown as the actual number out of 100, not a band word. A learner
 * comparing two attempts needs to see that 68 became 81; "Partial" twice hides
 * exactly the improvement they were working for.
 */
function creditOutOf100(credit: number): number {
  return Math.round(credit * 100);
}

function creditColor(credit: number): string {
  if (credit >= 0.7) return "var(--teal)";
  if (credit >= 0.45) return "#c98a00";
  return "#c0392b";
}

export function RubricBreakdown({ breakdown }: { breakdown: RubricVerdict[] }) {
  if (breakdown.length === 0) return null;

  const elements = breakdown.filter((b) => !b.forbidden);
  const violations = breakdown.filter((b) => b.forbidden);

  // Weights are only worth showing when they differ — otherwise the column is
  // noise. When they do differ it is the answer to "why isn't my total the
  // average of these numbers?".
  const weighted = new Set(elements.map((e) => e.weight)).size > 1;
  const totalWeight = elements.reduce((sum, e) => sum + e.weight, 0);

  return (
    <div className="mt-4">
      <h4 className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
        How this was scored
      </h4>

      <ul className="mt-2 space-y-2.5">
        {elements.map((element) => (
          <li
            key={element.elementId}
            className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-body text-sm font-medium text-[var(--ink)]">
                {element.description}
                {element.required && (
                  <span className="font-body ml-1.5 text-xs font-normal text-[var(--ink-soft)]">
                    (required)
                  </span>
                )}
                {weighted && (
                  <span className="font-body ml-1.5 text-xs font-normal text-[var(--ink-soft)]">
                    · worth {Math.round((element.weight / totalWeight) * 100)}% of this
                    question
                  </span>
                )}
              </p>
              <span
                className="font-body shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums"
                style={{
                  color: creditColor(element.credit),
                  background: `color-mix(in srgb, ${creditColor(element.credit)} 12%, transparent)`,
                }}
              >
                {creditOutOf100(element.credit)}
                <span className="font-normal opacity-70">/100</span>
              </span>
            </div>

            <div
              className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[var(--line)]"
              role="img"
              aria-label={`${creditOutOf100(element.credit)} out of 100`}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(element.credit * 100, 2)}%`,
                  background: creditColor(element.credit),
                }}
              />
            </div>

            {element.justification && (
              <p className="font-body mt-2 text-sm text-[var(--ink-soft)]">
                {element.justification}
              </p>
            )}
          </li>
        ))}
      </ul>

      {/* The arithmetic, when it isn't simply the weighted average. */}
      {(() => {
        const explanation = explainScore(breakdown);
        if (!explanation.cap) return null;
        return (
          <p className="font-body mt-3 rounded-xl border border-[#c98a00]/30 bg-[#c98a00]/5 px-3 py-2 text-sm text-[var(--ink)]">
            These elements average{" "}
            <strong>{Math.round(explanation.weighted * 100)}/100</strong>, but the score
            is capped at <strong>{Math.round(explanation.final * 100)}/100</strong>{" "}
            {explanation.cap.kind === "required-missing" ? (
              <>
                because a required part of the answer is missing: “
                {explanation.cap.description}”. That idea is load-bearing — without it
                the rest doesn't establish the result.
              </>
            ) : (
              <>
                because the answer relies on a step that isn't valid: “
                {explanation.cap.description}”. Reaching the right result by an invalid
                route won't generalise to the next problem.
              </>
            )}
          </p>
        );
      })()}

      {violations.length > 0 && (
        <div className="mt-3">
          <h4 className="font-body text-xs font-semibold uppercase tracking-wide text-[#c0392b]">
            Invalid steps
          </h4>
          <ul className="mt-2 space-y-2">
            {violations.map((violation) => (
              <li
                key={violation.elementId}
                className="rounded-xl border border-[#c0392b]/30 bg-[#c0392b]/5 p-3"
              >
                <p className="font-body text-sm font-medium text-[var(--ink)]">
                  {violation.description}
                </p>
                {violation.justification && (
                  <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">
                    {violation.justification}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
