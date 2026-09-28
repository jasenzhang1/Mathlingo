import { PRIOR_ABILITY, masteryLevel, updateAbility } from "../assessment/mastery";
import { clamp } from "../assessment/numeric";
import type { Ability } from "../assessment/types";
import { difficultyOf } from "./bank";
import { evaluate } from "./evaluate";
import type { InterviewQuestion } from "./types";

/**
 * How an answer becomes a number, and how that number moves a skill bar.
 *
 * Reuses the learning side's IRT *math* (a Gaussian ability belief updated by
 * a 2PL response model, quoted at its conservative end) but none of its
 * *state*: interview skills are their own table, keyed by section, and never
 * read or written by lesson assessment.
 */

// ---------------------------------------------------------------------------
// Correctness
// ---------------------------------------------------------------------------

/**
 * Keys are often rounded ("ln(2)/2 = 0.347"), so a candidate who types the exact
 * value must still pass: half a percent relative, or 5e-4 absolute for answers
 * near zero.
 */
export function numericMatches(input: number, key: number): boolean {
  return Math.abs(input - key) <= Math.max(5e-3 * Math.abs(key), 5e-4);
}

export type AutoGrade = { kind: "correct" } | { kind: "incorrect"; parsed: number } | { kind: "unparsed" } | { kind: "manual" };

/**
 * `manual`: the key is not a single number, so the candidate compares against
 * the revealed answer. `unparsed`: it is, but what they typed isn't a number
 * we can read — shown as such rather than marked wrong.
 */
export function autoGrade(q: InterviewQuestion, input: string): AutoGrade {
  if (q.numericAnswer === undefined) return { kind: "manual" };
  const value = evaluate(input);
  if (value === null) return { kind: "unparsed" };
  if (numericMatches(value, q.numericAnswer)) return { kind: "correct" };
  // A key written as a percentage ("8.4%") also accepts "8.4" typed without the sign.
  if (q.answer.includes("%") && !input.includes("%") && numericMatches(value / 100, q.numericAnswer)) {
    return { kind: "correct" };
  }
  return { kind: "incorrect", parsed: value };
}

// ---------------------------------------------------------------------------
// Speed
// ---------------------------------------------------------------------------

/** Seconds a strong candidate needs: a minute for a warm-up, about eight for a 10. */
export function expectedSeconds(q: InterviewQuestion): number {
  return 60 + 40 * difficultyOf(q);
}

/**
 * Full credit up to the expected time, then 20% off per doubling, floored at
 * 60%. A right answer is never worth less than most of a right answer —
 * interviewers care about speed, but they care about correct more.
 */
export function speedFactor(q: InterviewQuestion, seconds: number): number {
  const ratio = seconds / expectedSeconds(q);
  return ratio <= 1 ? 1 : clamp(1 - 0.2 * Math.log2(ratio), 0.6, 1);
}

/** Correctness (1, 0.5 for a partial self-grade, 0) scaled by speed. */
export function effectiveScore(q: InterviewQuestion, correctness: number, seconds: number): number {
  return correctness * (correctness > 0 ? speedFactor(q, seconds) : 1);
}

// ---------------------------------------------------------------------------
// Skill
// ---------------------------------------------------------------------------

/** Maps the 0–12 difficulty scale onto the ability logit scale: 4 is a coin flip for a 0-logit candidate. */
export function difficultyLogit(q: InterviewQuestion): number {
  return clamp((difficultyOf(q) - 4) / 1.6, -3, 4);
}

const DISCRIMINATION = 1.2;

export function updateSkill(ability: Ability | undefined, q: InterviewQuestion, score: number): Ability {
  return updateAbility(ability ?? PRIOR_ABILITY, { difficulty: difficultyLogit(q), discrimination: DISCRIMINATION }, score);
}

/** 0–100. An untouched section reads 0, not the prior's conservative-end value. */
export function skillBar(ability: Ability | undefined): number {
  return ability && ability.observations > 0 ? 100 * masteryLevel(ability) : 0;
}

/**
 * The next question to drill in a section: the unseen one whose difficulty
 * sits just above the candidate's current level — hard enough to be
 * informative, not so hard it is a guaranteed miss.
 */
export function pickTrainingQuestion(
  pool: InterviewQuestion[],
  ability: Ability | undefined,
  seen: Set<string>,
): InterviewQuestion | undefined {
  const target = (ability ?? PRIOR_ABILITY).mean + 0.4;
  const fresh = pool.filter((q) => !seen.has(q.id));
  const candidates = fresh.length ? fresh : pool;
  // A little jitter, so two questions at the same difficulty don't always come up in the same order.
  const distance = new Map(candidates.map((q) => [q.id, Math.abs(difficultyLogit(q) - target) + Math.random() * 0.3]));
  return [...candidates].sort((a, b) => distance.get(a.id)! - distance.get(b.id)!)[0];
}
