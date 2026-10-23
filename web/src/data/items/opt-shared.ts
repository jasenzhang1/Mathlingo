import type { SourceRef } from "../../lib/assessment/types";
import { makeBuilders, type Spec } from "./authoring";

/**
 * Shared builders for the `opt-*` modules, the question banks of the
 * Optimization course (root finding through ADMM). Every numeric key was
 * recomputed independently in Python before landing.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-optimization",
  tier: "generated",
  title: "Mathlingo authored item (Optimization)",
};

export const { mcq, short, num } = makeBuilders(AUTHORED);

export const m = (concept: string, slug: string, cognitive: Spec["cognitive"], level: number, seconds: number, stem: string) =>
  ({ concept, slug, cognitive, level, seconds, stem });
