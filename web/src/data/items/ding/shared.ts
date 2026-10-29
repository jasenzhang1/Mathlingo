import type { SourceRef } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";

/**
 * Builders for the items drawn from Peng Ding, *Linear Model and Extensions*
 * (2024). Every chapter of the book feeds the regression course: most add
 * questions to the lesson that already covers the idea, and the chapters the
 * course had no home for (interactions, multinomial/ordinal logit, overdispersed
 * counts, Kaplan–Meier) get lessons of their own. The stems, numbers and
 * settings are ours; only the task skeletons follow the book and its exercises.
 */
export const ding = (locator: string): SourceRef => ({
  id: "ding-linear-models",
  tier: "restricted",
  title: "Linear Model and Extensions (Peng Ding, 2024)",
  locator,
  rewriteApprovedBy: "pending-review",
});

/** Compact builders whose items cite one chapter of the book. */
export function chapter(locator: string) {
  const { mcq, short, num } = makeBuilders(ding(locator));

  /** Multiple choice: `wrong` is [text, why it is wrong][]. */
  const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
    mcq(
      { concept, slug, cognitive: level <= 2 ? "recall" : "apply", level, seconds: level <= 2 ? 20 : level <= 5 ? 40 : 75, stem },
      right,
      wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]),
    );

  const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
    num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 120 : level >= 4 ? 75 : 40, stem }, key, tol);

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
