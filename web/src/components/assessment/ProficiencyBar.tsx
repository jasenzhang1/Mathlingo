import type { ExpSnapshot } from "../../lib/assessment/exp";

/**
 * The 0–100 proficiency bar. Two layers are drawn: the filled bar is current
 * proficiency (mastery decayed by how long since the last review), and a ghost
 * line marks the un-decayed ceiling — what a single successful refresh would
 * restore. That distinction is the honest reading of the model: forgetting is
 * recoverable, and showing only the decayed number reads as lost progress.
 */
export function ProficiencyBar({ exp }: { exp: ExpSnapshot }) {
  const value = Math.round(exp.value);
  const ceiling = Math.round(exp.ceiling);
  const showGhost = ceiling - value >= 2;

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
          Proficiency
        </span>
        <span className="font-display text-2xl text-[var(--ink)]">
          {value}
          <span className="font-body text-sm text-[var(--ink-soft)]">/100</span>
        </span>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-[var(--line)]">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{
            width: `${Math.max(value, 1)}%`,
            background: exp.unlocked ? "var(--teal)" : "var(--accent)",
          }}
        />
        {showGhost && (
          <div
            className="absolute top-0 h-full w-0.5 bg-[var(--ink-soft)] opacity-40"
            style={{ left: `${ceiling}%` }}
            title={`Recoverable with one review: ${ceiling}`}
          />
        )}
      </div>

      <p className="font-body mt-2 text-xs text-[var(--ink-soft)]">
        {exp.unlocked
          ? "Unlocked — you can move on to what this concept leads to."
          : `Reach 65 to unlock the concepts this one feeds into.`}
        {showGhost && ` A refresh would restore you to about ${ceiling}.`}
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
