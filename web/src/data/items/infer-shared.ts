import type { SourceRef } from "../../lib/assessment/types";
import { makeBuilders, type Spec } from "./authoring";

/**
 * Shared builders for the `infer-*` modules: inference with machine-learning
 * predictions (conformal, selection bias, PPI, active inference), missing data
 * and causal effects (MCAR/MAR/MNAR, potential outcomes, doubly robust
 * estimation, double sampling), adaptive LASSO, path signatures and
 * performative prediction. Every numeric key was recomputed independently in
 * Python before landing.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-inference",
  tier: "generated",
  title: "Mathlingo authored item (Modern inference)",
};

export const { mcq, short, num } = makeBuilders(AUTHORED);

export const m = (concept: string, slug: string, cognitive: Spec["cognitive"], level: number, seconds: number, stem: string) =>
  ({ concept, slug, cognitive, level, seconds, stem });
