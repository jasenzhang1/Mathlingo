import { correlation, median } from "./numeric";
import type { Item, ItemStats, ItemStatus } from "./types";

/**
 * Layer 4 — the loop that keeps the bank honest.
 *
 * Every item is a measurement instrument, and instruments drift, arrive faulty,
 * or turn out to measure the wrong thing. The job here is to notice that from
 * response data alone, without waiting for someone to read all 232 concepts'
 * worth of questions.
 */

/** One learner's response to one item, as recorded in the review log. */
export interface ResponseRecord {
  itemId: string;
  learnerId: string;
  score: number;
  latencySeconds: number;
  abandoned: boolean;
  appealed: boolean;
  /** Learner's mastery of the concept at the moment they answered, in [0, 1]. */
  masteryAtAnswer: number;
  /** Set when a human re-graded this response. */
  humanScore?: number;
  answeredAt: number;
}

/** Items below this exposure count have stats too noisy to act on. */
export const MIN_EXPOSURES_FOR_JUDGEMENT = 30;

export function computeStats(records: ResponseRecord[]): ItemStats {
  const submitted = records.filter((r) => !r.abandoned);
  const scores = submitted.map((r) => r.score);
  const masteries = submitted.map((r) => r.masteryAtAnswer);

  const meanScore =
    scores.length === 0 ? 0 : scores.reduce((a, b) => a + b, 0) / scores.length;

  return {
    exposures: records.length,
    meanScore,
    /**
     * Point-biserial discrimination: does this item separate learners who know
     * the concept from those who do not? An item everyone gets right is
     * useless; an item that *strong* learners get wrong as often as weak ones
     * is worse than useless, because it is measuring noise and spending the
     * learner's EXP on it.
     */
    discrimination: correlation(scores, masteries),
    medianLatencySeconds: median(submitted.map((r) => r.latencySeconds)),
    abandonRate:
      records.length === 0
        ? 0
        : records.filter((r) => r.abandoned).length / records.length,
    appealRate:
      records.length === 0
        ? 0
        : records.filter((r) => r.appealed).length / records.length,
    judgeHumanAgreement: judgeAgreement(records),
  };
}

/**
 * Agreement between the model grader and human re-grades, on the subset of
 * responses that got both. Reported as 1 − mean absolute difference rather than
 * Cohen's kappa, because our scores are continuous partial credit rather than
 * categories; the interpretation ("1.0 is perfect agreement") is the same.
 */
function judgeAgreement(records: ResponseRecord[]): number | undefined {
  const dual = records.filter((r) => r.humanScore !== undefined);
  if (dual.length < 10) return undefined;
  const mad =
    dual.reduce((sum, r) => sum + Math.abs(r.score - r.humanScore!), 0) / dual.length;
  return 1 - mad;
}

export type FlagCode =
  | "too-easy"
  | "too-hard"
  | "non-discriminating"
  | "ambiguous"
  | "disputed"
  | "judge-unreliable"
  | "slow";

export interface ItemFlag {
  code: FlagCode;
  detail: string;
  /** What the flag implies for the item's status. */
  action: "quarantine" | "review" | "recalibrate";
}

/**
 * Automated triage. `quarantine` pulls the item immediately; `review` queues it
 * for a human; `recalibrate` means the item is fine but its difficulty estimate
 * is not.
 *
 * The thresholds are deliberately conservative on the quarantine side. Pulling
 * a good item costs us one question out of a large bank; leaving a mis-keyed
 * one live costs a learner EXP they earned, which is the thing that destroys
 * trust in the bar.
 */
export function flagItem(item: Item, stats: ItemStats): ItemFlag[] {
  const flags: ItemFlag[] = [];
  if (stats.exposures < MIN_EXPOSURES_FOR_JUDGEMENT) return flags;

  if (stats.meanScore > 0.97) {
    flags.push({
      code: "too-easy",
      detail: `Everyone clears it (mean score ${stats.meanScore.toFixed(2)}); it carries almost no information.`,
      action: "recalibrate",
    });
  }
  if (stats.meanScore < 0.08) {
    flags.push({
      code: "too-hard",
      detail: `Almost nobody clears it (mean score ${stats.meanScore.toFixed(2)}). Either mis-keyed, or it needs prerequisites the concept does not have.`,
      action: "review",
    });
  }

  /**
   * The single most diagnostic statistic in the set. Near-zero discrimination on
   * a well-exposed item nearly always means one of three things: the key is
   * wrong, the wording is ambiguous, or the item is about a different concept
   * than it is filed under.
   */
  if (Number.isFinite(stats.discrimination) && stats.discrimination < 0.1) {
    flags.push({
      code: "non-discriminating",
      detail: `Point-biserial ${stats.discrimination.toFixed(2)}: strong and weak learners do equally well. Suspect a wrong key, ambiguous wording, or a mis-filed concept.`,
      action: "quarantine",
    });
  }

  if (stats.abandonRate > 0.25) {
    flags.push({
      code: "ambiguous",
      detail: `${(stats.abandonRate * 100).toFixed(0)}% of learners open it and never submit — usually a sign they cannot tell what is being asked.`,
      action: "review",
    });
  }
  if (stats.appealRate > 0.05) {
    flags.push({
      code: "disputed",
      detail: `${(stats.appealRate * 100).toFixed(0)}% of responses disputed the grade.`,
      action: "quarantine",
    });
  }
  if (stats.judgeHumanAgreement !== undefined && stats.judgeHumanAgreement < 0.85) {
    flags.push({
      code: "judge-unreliable",
      detail: `Model grader and human re-grades agree only ${stats.judgeHumanAgreement.toFixed(2)}. The rubric is likely under-specified.`,
      action: "review",
    });
  }
  if (stats.medianLatencySeconds > 4 * item.expectedSeconds) {
    flags.push({
      code: "slow",
      detail: `Median ${Math.round(stats.medianLatencySeconds)}s against an expected ${item.expectedSeconds}s — the speed component of the grade is mis-scaled for this item.`,
      action: "recalibrate",
    });
  }

  return flags;
}

/**
 * Promotion and demotion. Shadow items graduate once they have enough exposures
 * and no flags; live items fall back to quarantine the moment a quarantine-level
 * flag fires.
 */
export function nextStatus(item: Item, stats: ItemStats, flags: ItemFlag[]): ItemStatus {
  if (item.status === "draft" || item.status === "retired") return item.status;
  if (flags.some((f) => f.action === "quarantine")) return "quarantined";
  if (
    item.status === "shadow" &&
    stats.exposures >= MIN_EXPOSURES_FOR_JUDGEMENT &&
    flags.length === 0
  ) {
    return "live";
  }
  return item.status;
}

/**
 * Coverage audit for a concept's pool.
 *
 * A concept is not adequately assessed just because it has questions. It needs
 * questions at each cognitive level — CLAUDE.md §1.4 asks for exact answers,
 * then method-and-why, then something that reaches back to earlier material —
 * and enough of them that a learner reviewing monthly does not start
 * recognising instances instead of re-deriving them.
 */
export interface CoverageReport {
  conceptId: string;
  liveCount: number;
  byLevel: Record<string, number>;
  missingLevels: string[];
  /** Spread of live-item difficulty. A pool clustered at one level cannot adapt. */
  difficultySpread: number;
  adequate: boolean;
  notes: string[];
}

export const MIN_LIVE_ITEMS = 8;

export function auditCoverage(conceptId: string, items: Item[]): CoverageReport {
  const live = items.filter((i) => i.conceptId === conceptId && i.status === "live");

  const byLevel: Record<string, number> = {};
  for (const item of live) {
    byLevel[item.cognitive] = (byLevel[item.cognitive] ?? 0) + 1;
  }

  const required = ["recall", "apply", "explain"];
  const missingLevels = required.filter((level) => (byLevel[level] ?? 0) === 0);

  const difficulties = live.map((i) => i.difficulty);
  const difficultySpread =
    difficulties.length < 2
      ? 0
      : Math.max(...difficulties) - Math.min(...difficulties);

  const notes: string[] = [];
  if (live.length < MIN_LIVE_ITEMS) {
    notes.push(
      `Only ${live.length} live items (want ${MIN_LIVE_ITEMS}+); learners on a monthly cadence will start recognising instances.`,
    );
  }
  if (missingLevels.length > 0) {
    notes.push(`No live items at: ${missingLevels.join(", ")}.`);
  }
  if (live.length >= 2 && difficultySpread < 1.5) {
    notes.push(
      `Difficulty spread is only ${difficultySpread.toFixed(2)} logits — the selector has nothing to adapt with.`,
    );
  }

  return {
    conceptId,
    liveCount: live.length,
    byLevel,
    missingLevels,
    difficultySpread,
    adequate: notes.length === 0,
    notes,
  };
}
