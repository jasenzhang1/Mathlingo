import type { Ability, Grade, Item } from "./types";
import { clamp, sigmoid } from "./numeric";

/**
 * Layer 3 — how hard is the question, and what does answering it do to the
 * learner's estimated ability and to the item's estimated difficulty.
 *
 * The model is a two-parameter logistic (2PL) item response model:
 *
 *     P(correct) = sigmoid(a * (theta - b))
 *
 * with `theta` the learner's ability on a concept and `b` the item's
 * difficulty, both on the same logit scale. Ability is carried as a Gaussian
 * belief and updated with a one-step Laplace approximation (equivalently, an
 * extended Kalman filter step), which gives us uncertainty-scaled learning for
 * free: the first answer on a concept moves the estimate a long way, the
 * fiftieth barely moves it at all, with no hand-tuned schedule.
 */

/** Ability of a learner who has never attempted the concept. */
export const PRIOR_ABILITY: Ability = {
  mean: 0,
  /** Wide: ~95% of the prior mass spans roughly -3 to +3 logits. */
  variance: 2.25,
  observations: 0,
};

/** Difficulty at which we quote "mastery". A learner at 0 has a 50% shot here. */
const REFERENCE_DIFFICULTY = 0;
const REFERENCE_DISCRIMINATION = 1.2;

/**
 * How many standard deviations below the mean we quote. Displayed mastery is a
 * lower confidence bound, so the bar reflects what we can *defend*, not the
 * most optimistic reading of two lucky answers.
 */
const CONSERVATISM_Z = 1;

/** Ability is clamped to this band; beyond it the logistic is saturated anyway. */
const ABILITY_BOUND = 4;

/**
 * Trust region on a single update, in logits.
 *
 * Without this the Laplace step is unbounded by the prior variance, and the
 * *first* response on a concept moves the estimate by ~2.4 logits — one fumbled
 * opening question and the learner's bar collapses to single digits, from which
 * the adaptive selector recovers only very slowly (items follow the estimate
 * down, so each subsequent success is unsurprising and worth little). Capping
 * the step keeps the shape of the Bayesian update while making the estimate
 * robust to a distracted first answer, a misread question, or a bad
 * transcription.
 */
const MAX_STEP = 1;

export function probabilityCorrect(abilityMean: number, item: Item): number {
  return sigmoid(item.discrimination * (abilityMean - item.difficulty));
}

/**
 * Bayesian update of the ability belief given a graded response.
 *
 * Posterior precision is prior precision plus the Fisher information the item
 * carried, `a^2 * p * (1 - p)`. That term peaks when p = 0.5, which is the
 * formal statement of an intuition worth keeping in mind when selecting items:
 * a question the learner was always going to get right, or never going to get
 * right, tells us almost nothing.
 */
export function updateAbility(
  ability: Ability,
  item: Item,
  score: number,
): Ability {
  const a = item.discrimination;
  const p = probabilityCorrect(ability.mean, item);

  const priorPrecision = 1 / ability.variance;
  const information = a * a * p * (1 - p);
  const posteriorVariance = 1 / (priorPrecision + information);

  const step = clamp(posteriorVariance * a * (score - p), -MAX_STEP, MAX_STEP);
  const mean = clamp(ability.mean + step, -ABILITY_BOUND, ABILITY_BOUND);

  return {
    mean,
    /**
     * Floor the variance. A learner's true ability drifts (they forget, they
     * learn elsewhere), so the belief must never harden to the point where new
     * evidence cannot move it.
     */
    variance: Math.max(posteriorVariance, 0.04),
    observations: ability.observations + 1,
  };
}

/** One graded response, reduced to what the ability estimator needs. */
export interface AbilityObservation {
  difficulty: number;
  discrimination: number;
  /** Partial credit in [0, 1]. */
  score: number;
}

/**
 * Batch re-estimation of ability from a learner's full response log for one
 * concept: the MAP estimate under the same 2PL model, found by Newton's method,
 * with the posterior variance read off the curvature at the optimum.
 *
 * This exists because the streaming update in `updateAbility` is *path
 * dependent*. Items are selected against the current estimate, so a bad early
 * streak pitches subsequent items low, which makes later successes unsurprising
 * and therefore cheap — two learners with identical response *rates* can end a
 * session tens of EXP apart depending on the order their answers happened to
 * fall in. Simulating a learner answering 85% of adaptively-pitched items
 * correctly, the online estimate landed anywhere from 19 to 92 mastery over 40
 * items.
 *
 * So the online update stays the fast path — it has to, because the bar must
 * move the instant the learner submits — and this runs as a nightly batch job
 * to correct the drift. Order-independent by construction: it sees the whole
 * log at once.
 */
export function estimateAbilityFromLog(
  observations: AbilityObservation[],
  priorMean = PRIOR_ABILITY.mean,
  priorVariance = PRIOR_ABILITY.variance,
): Ability {
  if (observations.length === 0) {
    return { mean: priorMean, variance: priorVariance, observations: 0 };
  }

  let mu = priorMean;
  const priorPrecision = 1 / priorVariance;

  for (let iteration = 0; iteration < 25; iteration++) {
    let gradient = -(mu - priorMean) * priorPrecision;
    let curvature = -priorPrecision;

    for (const o of observations) {
      const p = sigmoid(o.discrimination * (mu - o.difficulty));
      gradient += o.discrimination * (o.score - p);
      curvature -= o.discrimination * o.discrimination * p * (1 - p);
    }

    const step = clamp(-gradient / curvature, -1, 1);
    mu = clamp(mu + step, -ABILITY_BOUND, ABILITY_BOUND);
    if (Math.abs(step) < 1e-6) break;
  }

  // Posterior precision at the optimum: prior plus the Fisher information of
  // every observation, evaluated at the fitted ability.
  let precision = priorPrecision;
  for (const o of observations) {
    const p = sigmoid(o.discrimination * (mu - o.difficulty));
    precision += o.discrimination * o.discrimination * p * (1 - p);
  }

  return {
    mean: mu,
    variance: Math.max(1 / precision, 0.04),
    observations: observations.length,
  };
}

/**
 * Ability drifts while a concept is untouched, so widen the belief with time
 * away. This is what makes a long-dormant concept get re-probed with informative
 * items rather than being treated as settled.
 */
export function decayConfidence(ability: Ability, daysSinceReview: number): Ability {
  const DRIFT_PER_DAY = 0.004;
  return {
    ...ability,
    variance: Math.min(ability.variance + DRIFT_PER_DAY * daysSinceReview, 2.25),
  };
}

/**
 * Mastery in [0, 1]: the probability a learner clears a reference-difficulty
 * item, evaluated at the conservative end of the ability belief.
 */
export function masteryLevel(ability: Ability): number {
  const conservativeMean =
    ability.mean - CONSERVATISM_Z * Math.sqrt(ability.variance);
  return sigmoid(
    REFERENCE_DISCRIMINATION * (conservativeMean - REFERENCE_DIFFICULTY),
  );
}

/**
 * Online re-estimation of item difficulty (Elo, with the same residual that
 * drove the ability update but the opposite sign). The step size shrinks with
 * exposure, so a brand-new item calibrates fast and a well-measured one is not
 * yanked around by a single response.
 */
export function updateItemDifficulty(item: Item, score: number, abilityMean: number): number {
  const exposures = item.stats?.exposures ?? 0;
  const step = 0.6 / (1 + exposures / 15);
  const p = probabilityCorrect(abilityMean, item);
  return clamp(item.difficulty - step * (score - p), -4, 4);
}

/**
 * Collapse a rubric-level grade into the scalar score the IRT update consumes.
 *
 * Two rules matter here:
 *
 *  - A missed *required* element caps the score below the pass mark. An answer
 *    that lands the algebra but assumes independence it was not given is not a
 *    70%; it is a miss with partial credit.
 *  - Speed does **not** enter this number. Being slow but right is a correct
 *    answer, and taking longer should not lower our estimate of what the
 *    learner knows. Speed is fluency, and fluency is handled in scheduling.ts
 *    where it belongs — it shortens or lengthens the next interval instead.
 */
export const PASS_THRESHOLD = 0.6;

export function effectiveScore(grade: Grade, item: Item): number {
  let score = clamp(grade.score, 0, 1);

  const missedRequired = (item.rubric?.elements ?? []).some(
    (el) => el.required && grade.rubricElementsMissed.includes(el.id),
  );
  if (missedRequired) score = Math.min(score, PASS_THRESHOLD - 0.05);

  const usedForbiddenMove = (item.rubric?.forbiddenMoves ?? []).some((el) =>
    grade.rubricElementsHit.includes(el.id),
  );
  if (usedForbiddenMove) score = Math.min(score, 0.25);

  return score;
}

/**
 * Evidence about a concept the learner was not directly asked about — a
 * prerequisite implicated by a diagnosed misconception downstream.
 *
 * Modelled as a virtual item pitched exactly at the learner's current ability
 * (so p = 0.5, the point of maximum information) but with discrimination scaled
 * down by `weight`. That keeps the update in the same Bayesian machinery as a
 * real response while making it explicit that indirect evidence is worth a
 * fraction of an actual observation. `observations` deliberately does not
 * increment: we have not assessed this concept, and the item selector should
 * not behave as though we have.
 */
export function applyIndirectEvidence(
  ability: Ability,
  score: number,
  weight: number,
): Ability {
  const a = clamp(weight, 0, 1) * REFERENCE_DISCRIMINATION;
  if (a === 0) return ability;

  const information = a * a * 0.25;
  const posteriorVariance = 1 / (1 / ability.variance + information);
  const step = clamp(
    posteriorVariance * a * (score - 0.5),
    -MAX_STEP,
    MAX_STEP,
  );

  return {
    mean: clamp(ability.mean + step, -ABILITY_BOUND, ABILITY_BOUND),
    variance: Math.max(posteriorVariance, 0.04),
    observations: ability.observations,
  };
}

/**
 * Down-weight the evidence when the grader was unsure — a shaky transcription
 * of handwriting, or a model judge that abstained. We still record the attempt,
 * but a low-confidence grade should not swing the ability estimate as hard as a
 * clean one. Implemented by shrinking the score toward the model's prediction,
 * which is exactly "this told us less than a full observation".
 */
export function confidenceWeightedScore(
  grade: Grade,
  item: Item,
  abilityMean: number,
): number {
  const raw = effectiveScore(grade, item);
  const transcriptPenalty =
    grade.transcriptConfidence === undefined ? 1 : grade.transcriptConfidence;
  const weight = clamp(grade.confidence * transcriptPenalty, 0, 1);
  const p = probabilityCorrect(abilityMean, item);
  return weight * raw + (1 - weight) * p;
}
