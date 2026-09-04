import { daysBetween } from "./numeric";
import { masteryLevel } from "./mastery";
import { dueAt, retrievability, targetRetentionFor } from "./scheduling";
import type { ConceptState } from "./types";

/**
 * The EXP bar — the one number the learner actually sees, and the join between
 * layer 3 (how much do they know) and layer 5 (how fresh is it).
 *
 *     EXP = 100 * mastery * retrievability
 *
 * The two factors do different jobs and it matters that they stay separate:
 *
 *  - `mastery` is the durable part. It only moves when the learner is actually
 *    assessed, and it is quoted at the conservative end of the ability belief,
 *    so it has to be earned across several items rather than won on one.
 *  - `retrievability` is the perishable part. It drains on the FSRS forgetting
 *    curve with no input from the learner at all, which is what creates the
 *    pull back to a topic — the Anki mechanic, rendered as a bar rather than a
 *    queue of due cards.
 *
 * The product means a half-learned concept can never look full even when freshly
 * reviewed, and a genuinely mastered one still fades if it is left alone. The
 * `ceiling` returned below is the un-decayed mastery: the height the bar would
 * snap back to after a single successful refresh. Drawing it as a ghost line
 * behind the bar tells the learner "this is recoverable in one review" rather
 * than "you have lost this", which is the honest reading of the model.
 */

export interface ExpSnapshot {
  /** 0–100, what the bar fills to right now. */
  value: number;
  /** 0–100, mastery ignoring decay — the ghost line behind the bar. */
  ceiling: number;
  /** Recall probability right now, in [0, 1]. */
  retrievability: number;
  /** When the bar drops to this concept's target retention. */
  dueAt?: number;
  /** True once the bar has decayed past the target — time to re-assess. */
  due: boolean;
  /** Has the learner cleared the gate to move on to dependent concepts? */
  unlocked: boolean;
}

/**
 * The bar level a learner must reach before dependent concepts open up
 * (CLAUDE.md §1: "once the customer gets proficient at the lesson, they are
 * allowed to move onto the next lesson(s)"). Set against `ceiling`, not
 * `value` — the gate should not slam shut on a concept the learner has proven
 * and merely not seen for a fortnight.
 *
 * This is the single most consequential product dial in the framework, so it is
 * worth knowing its exchange rate in questions. Simulating learners against a
 * pool spread over roughly −2.5 to +2.5 logits:
 *
 *   true ability θ = 2 (clears a typical item ~85% of the time)  ->  75 by item 10
 *   true ability θ = 1 (~72%)                                    ->  63 by item 25, 69 by item 60
 *   true ability θ = 0 (~50%)                                    ->  43 even at item 60
 *
 * At 65, a strong learner unlocks within a session and a shaky one needs a few
 * — which is the intended shape. Raising it to 80 would make most concepts
 * effectively ungated-forever; the conservatism is already carried by the
 * lower-confidence-bound inside `masteryLevel`, and doubling up on it here just
 * makes the tree impassable.
 */
export const UNLOCK_THRESHOLD = 65;

export function expFor(state: ConceptState, now: number): ExpSnapshot {
  const ceiling = 100 * masteryLevel(state.ability);

  if (!state.memory) {
    return {
      value: ceiling,
      ceiling,
      retrievability: 1,
      due: state.ability.observations === 0,
      unlocked: ceiling >= UNLOCK_THRESHOLD,
    };
  }

  const elapsed = daysBetween(state.memory.lastReviewedAt, now);
  const r = retrievability(state.memory.stability, elapsed);
  const due = dueAt(state.memory, state.conceptId);

  return {
    value: ceiling * r,
    ceiling,
    retrievability: r,
    dueAt: due,
    due: now >= due,
    unlocked: ceiling >= UNLOCK_THRESHOLD,
  };
}

/**
 * How much bar the learner will lose per day at the current point on the curve.
 * Only used for display ("−1.4/day"), but it is a surprisingly effective nudge:
 * a decaying number the learner can see is more motivating than a due date they
 * have to remember to check.
 */
export function dailyDecay(state: ConceptState, now: number): number {
  if (!state.memory) return 0;
  const today = expFor(state, now).value;
  const tomorrow = expFor(state, now + 24 * 60 * 60 * 1000).value;
  return today - tomorrow;
}

/**
 * Ordering for the review queue. Concepts closest to (or past) their target
 * retention come first; ties break toward hubs, since a stale hub is doing the
 * most damage to everything downstream.
 */
export function reviewPriority(state: ConceptState, now: number): number {
  const snapshot = expFor(state, now);
  if (!state.memory) return Number.POSITIVE_INFINITY;
  const target = targetRetentionFor(state.conceptId);
  return target - snapshot.retrievability;
}
