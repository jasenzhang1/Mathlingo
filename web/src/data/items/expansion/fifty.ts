import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/**
 * Compact builders for the Probability and Statistics expansion from 40 to 50
 * items per lesson. Slugs all start with `f-` so they cannot collide with the
 * earlier rounds. Each lesson gets a spread across the 1–10 level scale: a few
 * recall checks, standard calculations, and explain/transfer questions graded
 * by a two-element rubric.
 */
const { mcq, short, num } = makeBuilders(EXPANSION);

/** Multiple choice: the first answer is correct; each wrong one carries why it is wrong. */
export const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug: `f-${slug}`, cognitive: level <= 3 ? "recall" : "apply", level, seconds: level >= 6 ? 60 : 30, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-f-${slug}-${i}`, why] as [string, string, string]));

/** Numeric answer, relative tolerance `tol`. */
export const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug: `f-${slug}`, cognitive: "apply", level, seconds: level >= 7 ? 120 : level >= 4 ? 75 : 40, stem }, key, tol);

/** Short answer graded on two required rubric elements. */
export const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug: `f-${slug}`, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 180, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
