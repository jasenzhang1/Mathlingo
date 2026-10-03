import { parseNumericAnswer } from "./parseNumber";

/**
 * Numeric items whose answer is a vector rather than a single number — "compute
 * $3\mathbf{x} - 2\mathbf{y}$". The key is stored as a string, "[7, -2, 4]" —
 * the square-bracket notation used for vectors throughout — so it fits
 * `Item.answerKey` unchanged and reads naturally wherever it's shown. Older
 * keys written "(7, -2, 4)" are still recognised.
 */

export function formatVector(values: number[]): string {
  return `[${values.map((v) => String(Number(v.toFixed(6)))).join(", ")}]`;
}

/** True when an answer key is a vector, i.e. "[…, …]" (or the older "(…, …)"). */
export function isVectorKey(key: unknown): key is string {
  return typeof key === "string" && /^(\(.*,.*\)|\[.*,.*\])$/.test(key.trim());
}

/**
 * Reads a learner's vector: "(1, -2, 3)", "[1, -2, 3]", "1, -2, 3", "1 -2 3"
 * or "<1;-2;3>". Each entry may be anything `parseNumericAnswer` accepts
 * (fractions, decimals). Returns null if any entry doesn't parse.
 */
export function parseVectorAnswer(raw: string): number[] | null {
  const inner = raw.trim().replace(/^[([<⟨]\s*/, "").replace(/\s*[)\]>⟩]$/, "");
  if (!inner) return null;
  const parts = inner.includes(",") || inner.includes(";") ? inner.split(/\s*[,;]\s*/) : inner.split(/\s+/);
  const values = parts.map((part) => parseNumericAnswer(part));
  return values.every((v): v is number => v !== null) ? values : null;
}
