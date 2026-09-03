import { descendantCountOf } from "../prerequisiteGraph";
import { clamp, DAY_MS, daysBetween } from "./numeric";
import { PASS_THRESHOLD } from "./mastery";
import { AGAIN, EASY, GOOD, HARD } from "./types";
import type { Grade, Item, MemoryState, ReviewGrade } from "./types";

/**
 * Layer 5 — how fast the EXP bar drains, and when the concept comes back.
 *
 * This is FSRS (the algorithm Anki has shipped as its default scheduler since
 * 2023), not SM-2. The reason is that SM-2 tracks an "ease factor" with no
 * meaning outside the algorithm, whereas FSRS tracks two quantities that are
 * directly the things we want to show the learner and reason about:
 *
 *   stability S    — days until recall probability falls to 90%
 *   retrievability R(t) — recall probability right now
 *
 * R(t) is the EXP bar's decay curve (see exp.ts), and S is what a good review
 * increases. The weights below are the published FSRS-5 defaults; they are a
 * starting prior, and layer 4 re-fits them on our own review logs once we have
 * them (see `assessment.md` §4).
 */

/** FSRS-5 default parameters. Indices match the upstream `w` vector. */
const W = [
  0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575,
  0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655,
  0.6621,
] as const;

/** Power-law forgetting curve exponent, and the factor that pins R(S) = 0.9. */
const DECAY = -0.5;
const FACTOR = 19 / 81;

const MIN_STABILITY = 0.1;
const MAX_STABILITY = 365 * 10;

/**
 * Recall probability `days` after the last review.
 *
 * R(t) = (1 + FACTOR * t / S) ^ DECAY — a power law, not an exponential. The
 * distinction is not academic: a power law has a fat tail, so a concept with
 * high stability decays far more gently than an exponential would predict,
 * which is why mature intervals can stretch to months without the learner
 * actually losing the material.
 */
export function retrievability(stability: number, days: number): number {
  return Math.pow(1 + (FACTOR * days) / Math.max(stability, MIN_STABILITY), DECAY);
}

/** Days until retrievability falls to `targetRetention`. Inverse of the curve above. */
export function intervalForRetention(
  stability: number,
  targetRetention: number,
): number {
  const r = clamp(targetRetention, 0.5, 0.99);
  return (stability / FACTOR) * (Math.pow(r, 1 / DECAY) - 1);
}

/**
 * Target retention is not uniform across the graph.
 *
 * Forgetting a leaf concept costs the learner that concept. Forgetting a hub —
 * Expectation, say, which sits upstream of most of statistics — silently
 * corrupts every review that depends on it, and we would misattribute the
 * failures to the downstream topics. So hubs are held to a higher retention
 * target and come back sooner. `descendantCountOf` already computes the
 * transitive downstream size for the concept map, so we reuse it.
 */
export function targetRetentionFor(conceptId: string): number {
  const descendants = descendantCountOf.get(conceptId) ?? 0;
  // 0 descendants -> 0.86; ~50 descendants -> ~0.92; saturating above that.
  return clamp(0.86 + 0.06 * (1 - Math.exp(-descendants / 25)), 0.86, 0.94);
}

/**
 * Accuracy and speed together produce the FSRS grade — CLAUDE.md §1.4's
 * "depending on the speed and accuracy of their responses".
 *
 * Speed is deliberately kept out of the *ability* estimate (see mastery.ts) and
 * spent here instead. A learner who re-derives the answer correctly but slowly
 * knows the material and should be told so; what they lack is fluency, and the
 * right response to that is to see the concept again sooner, not to be marked
 * down for it.
 */
export function reviewGradeFor(grade: Grade, item: Item): ReviewGrade {
  if (grade.score < PASS_THRESHOLD) return AGAIN;

  const expected = Math.max(item.expectedSeconds, 5);
  const ratio = grade.latencySeconds / expected;

  if (ratio > 2) return HARD;
  if (ratio < 0.6 && grade.score >= 0.95) return EASY;
  return GOOD;
}

function initialDifficulty(grade: ReviewGrade): number {
  return clamp(W[4]! - Math.exp(W[5]! * (grade - 1)) + 1, 1, 10);
}

function initialStability(grade: ReviewGrade): number {
  return clamp(W[grade - 1]!, MIN_STABILITY, MAX_STABILITY);
}

function nextDifficulty(difficulty: number, grade: ReviewGrade): number {
  // Linear damping keeps difficulty from running away at the top of the scale.
  const delta = -W[6]! * (grade - 3);
  const damped = difficulty + delta * ((10 - difficulty) / 9);
  // Mean reversion toward the difficulty of a fresh "good" answer.
  const reverted = W[7]! * initialDifficulty(EASY) + (1 - W[7]!) * damped;
  return clamp(reverted, 1, 10);
}

function stabilityAfterRecall(
  stability: number,
  difficulty: number,
  retention: number,
  grade: ReviewGrade,
): number {
  const hardPenalty = grade === HARD ? W[15]! : 1;
  const easyBonus = grade === EASY ? W[16]! : 1;
  const growth =
    Math.exp(W[8]!) *
    (11 - difficulty) *
    Math.pow(stability, -W[9]!) *
    (Math.exp(W[10]! * (1 - retention)) - 1) *
    hardPenalty *
    easyBonus;
  return clamp(stability * (1 + growth), MIN_STABILITY, MAX_STABILITY);
}

function stabilityAfterLapse(
  stability: number,
  difficulty: number,
  retention: number,
): number {
  const next =
    W[11]! *
    Math.pow(difficulty, -W[12]!) *
    (Math.pow(stability + 1, W[13]!) - 1) *
    Math.exp(W[14]! * (1 - retention));
  // A lapse never *increases* stability.
  return clamp(Math.min(next, stability), MIN_STABILITY, MAX_STABILITY);
}

/**
 * Fold one graded review into the memory state. `now` is passed in rather than
 * read from the clock so the scheduler is a pure function and can be replayed
 * over a review log — which is exactly what layer 4's weight re-fit does.
 */
export function updateMemory(
  state: MemoryState | undefined,
  grade: ReviewGrade,
  now: number,
): MemoryState {
  if (!state) {
    return {
      stability: initialStability(grade),
      difficulty: initialDifficulty(grade),
      lastReviewedAt: now,
      reps: 1,
      lapses: grade === AGAIN ? 1 : 0,
    };
  }

  const elapsed = daysBetween(state.lastReviewedAt, now);
  const r = retrievability(state.stability, elapsed);
  const difficulty = nextDifficulty(state.difficulty, grade);

  const stability =
    grade === AGAIN
      ? stabilityAfterLapse(state.stability, difficulty, r)
      : stabilityAfterRecall(state.stability, difficulty, r, grade);

  return {
    stability,
    difficulty,
    lastReviewedAt: now,
    reps: state.reps + 1,
    lapses: state.lapses + (grade === AGAIN ? 1 : 0),
  };
}

/**
 * Collapse a whole session's item grades into the single review grade FSRS
 * expects.
 *
 * This exists because of a mismatch that is easy to miss and expensive to get
 * wrong. FSRS models one review *occasion* per card, with days in between; its
 * stability update is driven by `1 - retrievability`, i.e. by how much you had
 * forgotten before being tested. We assess a concept with many items in a single
 * sitting, where elapsed time is ~0 and retrievability is ~1. Feeding each item
 * to `updateMemory` separately therefore adds no stability for a correct answer
 * (the growth term vanishes) while still applying the full lapse penalty for
 * each miss — so a long, mostly-successful session ends with *lower* stability
 * than a short one, and the learner is told to come back tomorrow. That is the
 * opposite of what the evidence says.
 *
 * So: many items, one review. Accuracy across the session picks the grade.
 */
export function sessionGrade(grades: ReviewGrade[]): ReviewGrade {
  if (grades.length === 0) return AGAIN;

  const lapses = grades.filter((g) => g === AGAIN).length;

  // Enough of the session went wrong that the concept was not really recalled.
  // A third is deliberately lenient: the selector targets a 75% success rate, so
  // some misses are by design and must not be read as a lapse.
  if (lapses / grades.length >= 1 / 3) return AGAIN;

  const mean = grades.reduce((sum, g) => sum + g, 0) / grades.length;
  return clamp(Math.round(mean), HARD, EASY) as ReviewGrade;
}

/** Timestamp at which the concept should be re-assessed. */
export function dueAt(state: MemoryState, conceptId: string): number {
  const interval = intervalForRetention(
    state.stability,
    targetRetentionFor(conceptId),
  );
  return state.lastReviewedAt + Math.max(interval, 0.02) * DAY_MS;
}

export function isDue(state: MemoryState, conceptId: string, now: number): boolean {
  return now >= dueAt(state, conceptId);
}

/**
 * Pull a concept's next review forward without touching its ability estimate.
 * Used when a *downstream* failure implicates this prerequisite: we have not
 * observed the prerequisite directly, so we should not claim to have measured
 * it, but we have good reason to stop trusting that it is still fresh.
 */
export function destabilise(state: MemoryState, factor = 0.7): MemoryState {
  return {
    ...state,
    stability: clamp(state.stability * factor, MIN_STABILITY, MAX_STABILITY),
  };
}
