import type { SourceRef } from "../../lib/assessment/types";
import { makeBuilders, type Spec } from "./authoring";

/**
 * Shared builders for the `regression-gaps-*` modules: the lessons added to
 * cover topics the regression interview problems need (partial correlation,
 * Chow tests, HAC errors, PLS, LARS, unit roots, Stambaugh bias, Granger
 * causality, Fama–MacBeth). Every numeric key was recomputed independently in
 * Python before landing.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-regression-gaps",
  tier: "generated",
  title: "Mathlingo authored item (Linear Models & Time Series)",
};

export const { mcq, short, num } = makeBuilders(AUTHORED);

export const m = (concept: string, slug: string, cognitive: Spec["cognitive"], level: number, seconds: number, stem: string) =>
  ({ concept, slug, cognitive, level, seconds, stem });
