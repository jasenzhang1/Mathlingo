/**
 * Proficiency is shown to two decimal places everywhere — the bar, the gain
 * after each answer, the lesson list — so small moves are visible and the
 * numbers on screen agree with each other.
 */
export function roundProficiency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatProficiency(value: number): string {
  return roundProficiency(value).toFixed(2);
}

/**
 * The change shown after an answer, taken between the *rounded* before and
 * after values so that before + change = after exactly on screen.
 */
export function proficiencyDelta(before: number, after: number): number {
  return roundProficiency(roundProficiency(after) - roundProficiency(before));
}

export function formatDelta(delta: number): string {
  return `${delta >= 0 ? "+" : "−"}${Math.abs(delta).toFixed(2)}`;
}
