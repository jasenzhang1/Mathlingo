import { prereqsOf } from "../prerequisiteGraph";
import { expFor, type ExpSnapshot } from "./exp";
import {
  applyIndirectEvidence,
  confidenceWeightedScore,
  PASS_THRESHOLD,
  PRIOR_ABILITY,
  probabilityCorrect,
  updateAbility,
  updateItemDifficulty,
} from "./mastery";
import { clamp } from "./numeric";
import { destabilise, reviewGradeFor, sessionGrade, updateMemory } from "./scheduling";
import type { ConceptState, Grade, Item, MemoryState, ReviewGrade } from "./types";

/**
 * The orchestrator: one graded response in, a new set of concept states out.
 * Pure and clock-injected, so a whole learner history can be replayed from the
 * review log — which is what layer 4 needs in order to re-fit anything.
 */

/**
 * Blame weights for prerequisite propagation, answering CLAUDE.md §1.4's
 * "grades from previous units may also be affected".
 *
 * The asymmetry is intentional. A *diagnosed* prerequisite error is strong
 * evidence: the learner picked the distractor that swaps P(A|B) for P(B|A), so
 * we have genuinely observed something about Conditional Probability, even
 * though the question was about Bayes' Rule. An undiagnosed failure is weak
 * evidence spread thinly over the immediate prerequisites, and success is
 * weaker still — getting a downstream question right does suggest the
 * scaffolding held, but it is no substitute for assessing the scaffolding.
 */
const DIAGNOSED_BLAME = 0.35;
const UNDIAGNOSED_BLAME = 0.12;
const SUCCESS_CREDIT = 0.05;
/** Blame decays by this factor for each extra hop back up the graph. */
const HOP_DECAY = 0.5;
const MAX_HOPS = 2;

export interface ReviewOutcome {
  /** States for every concept this response touched, keyed by concept id. */
  states: Map<string, ConceptState>;
  /** The item's re-estimated difficulty, to be written back to the item bank. */
  itemDifficulty: number;
  reviewGrade: ReviewGrade;
  /** Score after rubric caps and grader-confidence weighting. */
  effectiveScore: number;
  passed: boolean;
  /** EXP before and after, for the concept under test. */
  expBefore: ExpSnapshot;
  expAfter: ExpSnapshot;
  /** Concepts debited or credited indirectly, with the weight applied. */
  propagation: { conceptId: string; weight: number; direction: "credit" | "debit" }[];
}

/**
 * One sitting on one concept. Ability is updated per item — every answer is
 * genuine evidence about what the learner knows — but memory is updated once
 * for the whole session, recomputed from `anchor` each time so that applying
 * the nth item's result is idempotent rather than compounding.
 *
 * A page reload starts a new session. That is a real (small) inaccuracy: the
 * second half of an interrupted sitting is scheduled as if it were a separate
 * occasion. The alternative is persisting the anchor server-side, which is not
 * worth a table for the size of the error.
 */
export interface SessionContext {
  /** Memory as of before this session's first graded item. */
  anchor: MemoryState | undefined;
  /** Review grades from this session's earlier items, oldest first. */
  grades: ReviewGrade[];
}

export function blankState(conceptId: string): ConceptState {
  return { conceptId, ability: { ...PRIOR_ABILITY } };
}

function stateFor(states: Map<string, ConceptState>, conceptId: string): ConceptState {
  return states.get(conceptId) ?? blankState(conceptId);
}

/**
 * Apply one graded response.
 *
 * `states` is not mutated; the returned map contains only the concepts that
 * changed, so the caller can persist a small diff.
 */
export function applyReview(
  states: Map<string, ConceptState>,
  item: Item,
  grade: Grade,
  now: number,
  session?: SessionContext,
): ReviewOutcome {
  const target = stateFor(states, item.conceptId);
  const expBefore = expFor(target, now);

  const score = confidenceWeightedScore(grade, item, target.ability.mean);
  const reviewGrade = reviewGradeFor({ ...grade, score }, item);

  /**
   * Shadow items are served for calibration only. We still learn the item's
   * difficulty from the response, but the learner's bar must not move on a
   * question we have not yet shown to be sound.
   */
  const counts = item.status === "live";

  const updated = new Map<string, ConceptState>();
  const propagation: ReviewOutcome["propagation"] = [];

  /**
   * With a session, memory is recomputed from the pre-session anchor using
   * every grade in the sitting; without one, each call is its own occasion.
   * See SessionContext for why the distinction matters.
   */
  const memory = counts
    ? session
      ? updateMemory(session.anchor, sessionGrade([...session.grades, reviewGrade]), now)
      : updateMemory(target.memory, reviewGrade, now)
    : target.memory;

  const nextTarget: ConceptState = counts
    ? {
        conceptId: target.conceptId,
        ability: updateAbility(target.ability, item, score),
        memory,
      }
    : target;
  updated.set(item.conceptId, nextTarget);

  if (counts) {
    applyPropagation(states, updated, propagation, item, grade, score);
  }

  return {
    states: updated,
    itemDifficulty: updateItemDifficulty(item, score, target.ability.mean),
    reviewGrade,
    effectiveScore: score,
    passed: score >= PASS_THRESHOLD,
    expBefore,
    expAfter: expFor(nextTarget, now),
    propagation,
  };
}

function applyPropagation(
  states: Map<string, ConceptState>,
  updated: Map<string, ConceptState>,
  propagation: ReviewOutcome["propagation"],
  item: Item,
  grade: Grade,
  score: number,
): void {
  const passed = score >= PASS_THRESHOLD;

  /** conceptId -> blame weight, accumulated so a concept is only touched once. */
  const weights = new Map<string, number>();

  const add = (conceptId: string, weight: number) => {
    if (conceptId === item.conceptId || weight <= 0) return;
    weights.set(conceptId, Math.min(1, (weights.get(conceptId) ?? 0) + weight));
  };

  if (!passed) {
    const diagnosed = new Set(grade.misconceptions.map((m) => m.blameConceptId));
    for (const conceptId of diagnosed) add(conceptId, DIAGNOSED_BLAME);

    // Undiagnosed failure: spread thinly up the graph, decaying by hop.
    if (diagnosed.size === 0) {
      let frontier = prereqsOf.get(item.conceptId) ?? [];
      let weight = UNDIAGNOSED_BLAME;
      for (let hop = 0; hop < MAX_HOPS && frontier.length > 0; hop++) {
        const share = weight / Math.max(frontier.length, 1);
        for (const id of frontier) add(id, share);
        frontier = frontier.flatMap((id) => prereqsOf.get(id) ?? []);
        weight *= HOP_DECAY;
      }
    }
  } else {
    for (const id of prereqsOf.get(item.conceptId) ?? []) add(id, SUCCESS_CREDIT);
  }

  for (const [conceptId, weight] of weights) {
    const prior = updated.get(conceptId) ?? stateFor(states, conceptId);
    const ability = applyIndirectEvidence(prior.ability, passed ? 1 : 0, weight);

    /**
     * On blame we also pull the prerequisite's next review forward. We have not
     * measured it, so the ability nudge stays small — but we have good reason to
     * stop trusting that it is fresh, and the cheapest fix is to go and look.
     */
    const memory =
      !passed && prior.memory ? destabilise(prior.memory, 1 - weight / 2) : prior.memory;

    updated.set(conceptId, { conceptId, ability, memory });
    propagation.push({
      conceptId,
      weight,
      direction: passed ? "credit" : "debit",
    });
  }
}

/**
 * Layer 3's other half: how hard should the *next* question be?
 *
 * Pure maximum-information selection would target a 50% success rate, which is
 * statistically optimal and motivationally miserable. We target
 * `TARGET_SUCCESS` instead — hard enough to be informative and to force
 * retrieval, easy enough that a session does not feel like an exam — and break
 * ties toward items that carry more information and have not been seen recently.
 */
const TARGET_SUCCESS = 0.75;

export interface SelectionContext {
  /** Item ids the learner has seen recently, most recent first. */
  recentItemIds?: string[];
  /** Cognitive levels already covered in this session; uncovered levels are favoured. */
  coveredLevels?: Set<string>;
}

export function selectNextItem(
  candidates: Item[],
  state: ConceptState,
  context: SelectionContext = {},
): Item | undefined {
  const servable = candidates.filter(
    (item) => item.status === "live" || item.status === "shadow",
  );
  if (servable.length === 0) return undefined;

  const recent = context.recentItemIds ?? [];

  let best: Item | undefined;
  let bestScore = -Infinity;

  for (const item of servable) {
    const p = probabilityCorrect(state.ability.mean, item);

    // Closeness to the target success rate, on a smooth 0..1 scale.
    let score = 1 - Math.abs(p - TARGET_SUCCESS) / 0.75;

    // Sharper items measure more per question.
    score += 0.15 * clamp(item.discrimination / 2, 0, 1);

    // Recency penalty: seeing the same instance again invites recall of the
    // answer rather than of the method.
    const recentIndex = recent.indexOf(item.id);
    if (recentIndex >= 0) score -= 0.8 * (1 - recentIndex / Math.max(recent.length, 1));

    // Favour an untouched cognitive level, so a session cannot be all arithmetic.
    if (context.coveredLevels && !context.coveredLevels.has(item.cognitive)) {
      score += 0.2;
    }

    // Shadow items are worth serving occasionally to calibrate them, but they
    // should never crowd out the assessment itself.
    if (item.status === "shadow") score -= 0.5;

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return best;
}
