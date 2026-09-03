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

function creditLabel(credit: number): string {
  if (credit >= 1) return "Full";
  if (credit >= 0.75) return "Nearly";
  if (credit >= 0.5) return "Partial";
  if (credit >= 0.25) return "Minimal";
  return "Missing";
}

function creditColor(credit: number): string {
  if (credit >= 0.75) return "var(--teal)";
  if (credit >= 0.5) return "#c98a00";
  return "#c0392b";
}

export function RubricBreakdown({ breakdown }: { breakdown: RubricVerdict[] }) {
  if (breakdown.length === 0) return null;

  const elements = breakdown.filter((b) => !b.forbidden);
  const violations = breakdown.filter((b) => b.forbidden);

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
              </p>
              <span
                className="font-body shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  color: creditColor(element.credit),
                  background: `color-mix(in srgb, ${creditColor(element.credit)} 12%, transparent)`,
                }}
              >
                {creditLabel(element.credit)}
              </span>
            </div>

            <div
              className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[var(--line)]"
              role="img"
              aria-label={`${Math.round(element.credit * 100)} percent credit`}
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
