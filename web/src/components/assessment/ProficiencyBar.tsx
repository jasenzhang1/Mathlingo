import { formatDelta, formatProficiency, proficiencyDelta, roundProficiency } from "../../lib/assessment/formatProficiency";
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

/**
 * The fill is one gradient laid across the whole track and revealed up to the
 * current value: violet at 0, teal at the unlock line, blue at Proficient and
 * gold at Mastered. The tip of the bar is therefore always the colour of the
 * tier you're heading into, and each answer visibly shifts it — progress you
 * can see change hue, not just length (see gamification.md).
 */
const GRADIENT = `linear-gradient(to right, var(--accent) 0%, var(--teal) ${SATISFACTION_THRESHOLD}%, #2563eb ${PROFICIENCY_THRESHOLD}%, #d4a017 ${MASTERY_THRESHOLD}%, #d4a017 100%)`;

/** Index of the highest tier reached (0 = none yet). */
function tierIndex(value: number): number {
  return TIER_MARKS.filter((m) => value >= m.value).length;
}

/** The last answer's movement, so the bar can show it in place. */
export interface BarGain {
  /** Changes on every answer, so the animation replays. */
  key: string;
  before: number;
  after: number;
  /** The first answer sets a starting value rather than moving one. */
  first: boolean;
}

/**
 * The 0–100 proficiency bar. Two layers are drawn: the filled bar is current
 * proficiency (mastery decayed by how long since the last review), and a ghost
 * line marks the un-decayed ceiling — what a single successful refresh would
 * restore. That distinction is the honest reading of the model: forgetting is
 * recoverable, and showing only the decayed number reads as lost progress.
 */
export function ProficiencyBar({ exp, gain }: { exp: ExpSnapshot; gain?: BarGain }) {
  const value = roundProficiency(exp.value);
  const ceiling = roundProficiency(exp.ceiling);
  const showGhost = ceiling - value >= 2;
  const fill = Math.max(value, 1);
  // Goal-gradient cue: name the next line and how close it is.
  const next = TIER_MARKS.find((m) => value < m.value);
  const toNext = next ? roundProficiency(next.value - value) : 0;
  const delta = gain && !gain.first ? proficiencyDelta(gain.before, gain.after) : 0;
  const crossed =
    gain && tierIndex(roundProficiency(gain.after)) > tierIndex(roundProficiency(gain.before))
      ? TIER_MARKS[tierIndex(roundProficiency(gain.after)) - 1]
      : undefined;

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
          Proficiency
        </span>
        <span className="flex items-baseline gap-2">
          {delta !== 0 && (
            <span
              key={gain?.key}
              className={`ml-gain font-body text-sm font-semibold ${
                delta > 0 ? "text-[var(--teal)]" : "text-red-600"
              }`}
            >
              {formatDelta(delta)}
            </span>
          )}
          <span className="font-display text-2xl text-[var(--ink)]">
            {formatProficiency(value)}
            <span className="font-body text-sm text-[var(--ink-soft)]">/100</span>
          </span>
        </span>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-[var(--line)]">
        <div
          className="h-full rounded-full transition-[width,background-size] duration-500"
          style={{
            width: `${fill}%`,
            backgroundImage: GRADIENT,
            // Stretch the gradient to the full track so its stops sit on the tier lines.
            backgroundSize: `${10000 / fill}% 100%`,
            backgroundRepeat: "no-repeat",
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

      {crossed ? (
        <p key={gain?.key} className="ml-pop font-body mt-2 text-sm font-semibold text-[var(--ink)]">
          {crossed.label} reached.
        </p>
      ) : (
        next && (
          <p className="font-body mt-2 text-sm text-[var(--ink)]">
            <span className="font-semibold">{formatProficiency(toNext)}</span> to {next.label}
          </p>
        )
      )}

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
