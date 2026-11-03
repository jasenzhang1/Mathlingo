import { PRIOR_ABILITY, masteryLevel, updateAbility } from "../assessment/mastery";
import { clamp } from "../assessment/numeric";
import type { Ability } from "../assessment/types";
import type { Calibration } from "../assessment/itemCalibration";
import { difficultyOf } from "./bank";
import { evaluate, variablesOf } from "./evaluate";
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

/** Decimal places a numeric answer must be given to, when not given exactly. */
export const ANSWER_DECIMALS = 5;

/**
 * Within half a unit of the last required decimal: a candidate who rounds to
 * five places, or types an exact form (`1/3`, `ln(2)/2`), passes. A key that
 * is itself only known to `precision` places (a simulated or quoted value)
 * is matched at that precision instead.
 */
export function numericMatches(input: number, key: number, precision = ANSWER_DECIMALS): boolean {
  const half = 0.5 * 10 ** -precision;
  return Math.abs(input - key) <= half * (1 + 1e-9) + 1e-12 * Math.abs(key);
}

/** Decimal places in a plain decimal the candidate typed ("0.3333" → 4), or null for any other form. */
function typedDecimals(input: string): number | null {
  const m = input.trim().match(/^[+-]?\d*\.(\d+)$/);
  return m ? m[1].length : null;
}

/**
 * True when `input`, evaluated at sample values of the key's variables,
 * agrees with `key` everywhere the key is defined. Integer samples (for
 * `n`, `m`, `k`, `N`, which may sit inside `!` or `C(·,·)`), and values in
 * (0, 1) for `p` and `q`. "f(n) = …" is read from its right-hand side.
 */
export function expressionMatches(input: string, key: string): boolean | null {
  const vars = variablesOf(key);
  if (!vars || vars.length === 0) return null;
  const rhs = input.includes("=") ? input.slice(input.lastIndexOf("=") + 1) : input;
  const INTS = [3, 4, 5, 7, 10, 12, 6, 9];
  const PROBS = [0.13, 0.29, 0.37, 0.61, 0.77, 0.83, 0.45, 0.21];
  let compared = 0;
  for (let t = 0; t < INTS.length; t++) {
    const env: Record<string, number> = {};
    vars.forEach((v, i) => {
      const k = (t + 3 * i) % INTS.length;
      env[v] = v === "p" || v === "q" ? PROBS[k] : INTS[k];
    });
    const want = evaluate(key, env);
    if (want === null) continue;
    const got = evaluate(rhs, env);
    if (got === null) return false;
    if (Math.abs(got - want) > 1e-9 * Math.max(1, Math.abs(want))) return false;
    compared++;
  }
  return compared >= 3 ? true : null;
}

export type AutoGrade =
  | { kind: "correct" }
  | { kind: "incorrect"; parsed?: number }
  | { kind: "imprecise"; decimals: number }
  | { kind: "unparsed"; expression?: boolean }
  | { kind: "manual" };

/**
 * `manual`: the key is neither one number nor one formula, so the candidate
 * compares against the revealed answer. `unparsed`: what they typed can't be
 * read — shown as such rather than marked wrong. `imprecise`: a decimal that
 * agrees with the key as far as it goes but stops short of five places — the
 * candidate is asked for more digits, not marked wrong.
 */
export function autoGrade(q: InterviewQuestion, input: string): AutoGrade {
  if (q.expressionAnswer !== undefined) {
    const vars = variablesOf(q.expressionAnswer) ?? [];
    // Readability check at a point no sensible answer is undefined at.
    const env = Object.fromEntries(vars.map((v) => [v, v === "p" || v === "q" ? 0.37 : 11]));
    const rhs = input.includes("=") ? input.slice(input.lastIndexOf("=") + 1) : input;
    if (evaluate(rhs, env) === null) return { kind: "unparsed", expression: true };
    const ok = expressionMatches(input, q.expressionAnswer);
    return ok ? { kind: "correct" } : { kind: "incorrect" };
  }
  if (q.numericAnswer === undefined) return { kind: "manual" };
  const value = evaluate(input);
  if (value === null) return { kind: "unparsed" };
  const precision = q.numericPrecision ?? ANSWER_DECIMALS;
  if (numericMatches(value, q.numericAnswer, precision)) return { kind: "correct" };
  // A key written as a percentage ("8.4%") also accepts "8.4" typed without the sign.
  const percent = q.answer.includes("%") && !input.includes("%");
  if (percent && numericMatches(value / 100, q.numericAnswer, precision + 2)) return { kind: "correct" };
  // Right as far as it goes, but rounded too early: ask for more places.
  const decimals = typedDecimals(input.replace("%", ""));
  if (decimals !== null && decimals < precision) {
    // A typed "%" is already divided out by the evaluator; a bare number on a
    // percentage key is not.
    const scaled = percent ? value / 100 : value;
    const places = input.includes("%") || percent ? decimals + 2 : decimals;
    if (numericMatches(scaled, q.numericAnswer, places)) return { kind: "imprecise", decimals: precision };
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

/** Maps the authored 0–12 difficulty onto the ability logit scale: 4 is a coin flip for a 0-logit candidate. */
export function authoredDifficultyLogit(q: InterviewQuestion): number {
  return clamp((difficultyOf(q) - 4) / 1.6, -3, 4);
}

/**
 * Live difficulties, moved by every candidate's answers (migration 0013).
 * Filled by `useInterviewSkills`; until it loads, or for a question nobody
 * has answered, the authored value stands in.
 */
export const interviewCalibrations = new Map<string, Calibration>();

/** The question's difficulty in logits as it stands now — crowd-calibrated once answered. */
export function difficultyLogit(q: InterviewQuestion): number {
  return interviewCalibrations.get(q.id)?.difficulty ?? authoredDifficultyLogit(q);
}

export const DISCRIMINATION = 1.2;

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
