import { clamp } from "./numeric";

/**
 * The 1–10 difficulty level shown to people, in steps of 0.1.
 *
 * The engine keeps `Item.difficulty` on the IRT logit scale, because ability
 * updates and calibration are defined in logits. The level is a linear
 * relabelling of it: one level point is one logit, and level 5.5 is logit 0,
 * so 1–10 covers logits −4.5 to +4.5.
 */
export const MIN_DIFFICULTY_LEVEL = 1;
export const MAX_DIFFICULTY_LEVEL = 10;
export const DIFFICULTY_LEVEL_STEP = 0.1;
const LEVEL_AT_LOGIT_ZERO = 5.5;

export function difficultyToLevel(logit: number): number {
  const level = clamp(
    logit + LEVEL_AT_LOGIT_ZERO,
    MIN_DIFFICULTY_LEVEL,
    MAX_DIFFICULTY_LEVEL,
  );
  return Math.round(level * 10) / 10;
}

export function levelToDifficulty(level: number): number {
  const snapped =
    Math.round(clamp(level, MIN_DIFFICULTY_LEVEL, MAX_DIFFICULTY_LEVEL) * 10) /
    10;
  // Round again to strip floating-point noise like 0.30000000000000004.
  return Math.round((snapped - LEVEL_AT_LOGIT_ZERO) * 10) / 10;
}

export function formatDifficultyLevel(logit: number): string {
  return difficultyToLevel(logit).toFixed(1);
}
