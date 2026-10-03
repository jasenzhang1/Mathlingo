/** Parses "0.45", ".45", "45%", "7/3" into a number, or null if unparseable. */
export function parseNumericAnswer(raw: string): number | null {
  const text = raw.trim().replace(/,/g, "");
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
