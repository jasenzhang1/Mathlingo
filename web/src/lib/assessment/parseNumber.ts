/**
 * Parses "0.45", ".45", "45%", "7/3" into a number, or null if unparseable.
 * Learners often write the whole equation — "k = 11", "x ≈ 1.23", "$11$" — so
 * math delimiters are dropped and only what follows the last "=" or "≈" is read,
 * as long as the left side names something (has a letter) rather than being a
 * calculation the learner left in.
 */
export function parseNumericAnswer(raw: string): number | null {
  let text = raw.trim().replace(/,/g, "").replace(/\$/g, "").trim();
  const equation = /^(.*[A-Za-z].*?)\s*(?:=|≈|\\approx)\s*([^=≈]+)$/.exec(text);
  if (equation) text = equation[2].trim();
  if (!text) return null;

  if (text.endsWith("%")) {
    const pct = Number(text.slice(0, -1));
    return Number.isFinite(pct) ? pct / 100 : null;
  }

  const fraction = /^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/.exec(text);
  if (fraction) {
    const denominator = Number(fraction[2]);
    if (denominator === 0) return null;
    return Number(fraction[1]) / denominator;
  }

  const value = Number(text);
  return Number.isFinite(value) ? value : null;
}
