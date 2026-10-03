import { formatProficiency, roundProficiency } from "../../lib/assessment/formatProficiency";
import {
  MASTERY_THRESHOLD,
  PROFICIENCY_THRESHOLD,
  SATISFACTION_THRESHOLD,
  type ExpSnapshot,
} from "../../lib/assessment/exp";

const TIER_MARKS = [
  { label: "Satisfactory", value: SATISFACTION_THRESHOLD },
  { label: "Proficient", value: PROFICIENCY_THRESHOLD },
  { label: "Mastered", value: MASTERY_THRESHOLD },
];

/** The bar’s fill colour for each tier, so crossing a threshold is visible at a glance. */
function fillColor(value: number): string {
  if (value >= MASTERY_THRESHOLD) return "#d4a017"; // gold — mastered
  if (value >= PROFICIENCY_THRESHOLD) return "#2563eb"; // blue — proficient
  if (value >= SATISFACTION_THRESHOLD) return "var(--teal)"; // teal — satisfactory, unlocked
  return "var(--accent)";
}

/**
 * The 0–100 proficiency bar. Two layers are drawn: the filled bar is current
 * proficiency (mastery decayed by how long since the last review), and a ghost
 * line marks the un-decayed ceiling — what a single successful refresh would
 * restore. That distinction is the honest reading of the model: forgetting is
 * recoverable, and showing only the decayed number reads as lost progress.
 */
export function ProficiencyBar({ exp }: { exp: ExpSnapshot }) {
  const value = roundProficiency(exp.value);
  const ceiling = roundProficiency(exp.ceiling);
  const showGhost = ceiling - value >= 2;

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
          Proficiency
        </span>
        <span className="font-display text-2xl text-[var(--ink)]">
          {formatProficiency(value)}
          <span className="font-body text-sm text-[var(--ink-soft)]">/100</span>
        </span>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-[var(--line)]">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{
            width: `${Math.max(value, 1)}%`,
            background: fillColor(value),
          }}
        />
        {showGhost && (
          <div
            className="absolute top-0 h-full w-0.5 bg-[var(--ink-soft)] opacity-40"
            style={{ left: `${ceiling}%` }}
            title={`Recoverable with one review: ${formatProficiency(ceiling)}`}
          />
        )}
        {TIER_MARKS.map((mark) => (
          <div
            key={mark.label}
            className={`absolute top-0 h-full ${
              value >= mark.value ? "w-0.5 bg-black" : "w-px bg-[var(--paper)]/70"
            }`}
            style={{ left: `${mark.value}%` }}
            title={`${mark.label}: ${mark.value}+`}
          />
        ))}
      </div>

      <div className="relative mt-1 h-3 text-[10px] text-[var(--ink-soft)]">
        {TIER_MARKS.map((mark) => (
          <span
            key={mark.label}
            className={`absolute -translate-x-1/2 whitespace-nowrap ${
              value >= mark.value ? "font-bold text-black dark:text-[var(--ink)]" : ""
            }`}
            style={{ left: `${mark.value}%` }}
            title={`${mark.label}: ${mark.value}+`}
          >
            {mark.value}
          </span>
        ))}
      </div>

      <p className="font-body mt-1 text-xs text-[var(--ink-soft)]">
        {exp.unlocked
          ? "Unlocked — you can move on to what this concept leads to."
          : `Reach 65 to unlock the concepts this one feeds into.`}
        {showGhost && ` A refresh would restore you to about ${formatProficiency(ceiling)}.`}
        {exp.dueAt && (
          <>
            {" "}
            {exp.bleeding
              ? "Past its grace period and fading — review now."
              : exp.due
                ? "Due for review — you have a day of grace before it starts fading."
                : `Next review around ${new Date(exp.dueAt).toLocaleDateString()}.`}
          </>
        )}
      </p>
    </div>
  );
}
