import type { SourceRef } from "../../lib/assessment/types";
import { makeBuilders, type Spec } from "./authoring";

/**
 * Shared builders for the `qi-*` modules, the question banks of the
 * Quantitative Investing course (after Paleologo, *The Elements of
 * Quantitative Investing*). Every numeric key was recomputed independently in
 * Python before landing.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-quantitative-investing",
  tier: "generated",
  title: "Mathlingo authored item (Quantitative Investing)",
};

const builders = makeBuilders(AUTHORED);
export const { mcq, short } = builders;

/**
 * The grader accepts answers within `max(|key| * tolerance, tolerance)`, so the
 * default tolerance of `0.01` is an absolute window of ±0.01 for any key below
 * one — wide enough to accept `0` for a variance like `0.0004`. Keys below one
 * therefore get half a unit in their last stated decimal instead (the same
 * window the rounding instruction implies); larger keys keep the default 1%.
 */
function precisionTolerance(key: number): number | undefined {
  if (Math.abs(key) >= 1 || key === 0) return undefined;
  const decimals = (key.toFixed(12).replace(/0+$/, "").split(".")[1] ?? "").length;
  return Math.min(0.01, 0.5 * 10 ** -decimals);
}

export const num = (spec: Spec, answerKey: number, tolerance?: number) =>
  builders.num(spec, answerKey, tolerance ?? precisionTolerance(answerKey));

export const m = (concept: string, slug: string, cognitive: Spec["cognitive"], level: number, seconds: number, stem: string) =>
  ({ concept, slug, cognitive, level, seconds, stem });
