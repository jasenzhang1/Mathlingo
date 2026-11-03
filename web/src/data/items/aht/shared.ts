import type { SourceRef } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";

/**
 * Builders for the Algorithmic & High-Frequency Trading course, drawn from
 * Cartea, Jaimungal & Penalva, *Algorithmic and High-Frequency Trading* (2015).
 * The stems, numbers and settings are ours; only the task skeletons follow the
 * book and its exercises.
 */
export const cjp = (locator: string): SourceRef => ({
  id: "cartea-jaimungal-penalva",
  tier: "restricted",
  title: "Algorithmic and High-Frequency Trading (Cartea, Jaimungal & Penalva, 2015)",
  locator,
  rewriteApprovedBy: "pending-review",
});

/**
 * Keys below one get half a unit in their last stated decimal rather than the
 * default ±0.01 absolute window, which would accept almost anything for small
 * keys (as in qi-shared.ts).
 */
function precisionTolerance(key: number): number | undefined {
  if (Math.abs(key) >= 1 || key === 0) return undefined;
  const decimals = (key.toFixed(12).replace(/0+$/, "").split(".")[1] ?? "").length;
  return Math.min(0.01, 0.5 * 10 ** -decimals);
}

/** Compact builders whose items cite one chapter or section of the book. */
export function chapter(locator: string) {
  const { mcq, short, num } = makeBuilders(cjp(locator));

  /** Multiple choice: `wrong` is [text, why it is wrong][]. */
  const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
    mcq(
      { concept, slug, cognitive: level <= 2 ? "recall" : "apply", level, seconds: level <= 2 ? 20 : level <= 5 ? 40 : 75, stem },
      right,
      wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]),
    );

  const n = (concept: string, slug: string, level: number, stem: string, key: number, tol?: number) =>
    num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 120 : level >= 4 ? 75 : 40, stem }, key, tol ?? precisionTolerance(key));

  /** Short answer graded on two required rubric elements. */
  const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
    short(
      { concept, slug, cognitive: level >= 8 ? "transfer" : "explain", level, seconds: level >= 8 ? 300 : 180, stem },
      [
        ["main", a, 5, true],
        ["detail", b, 4, true],
      ],
    );

  return { m, n, s };
}
