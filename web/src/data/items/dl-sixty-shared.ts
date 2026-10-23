import type { SourceRef } from "../../lib/assessment/types";
import { makeBuilders, type Spec } from "./authoring";

/**
 * Shared builders for the `dl-sixty-*` modules, which bring every Deep
 * Learning lesson to 60 questions. Every numeric key was recomputed
 * independently in Python before landing.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-dl-sixty",
  tier: "generated",
  title: "Mathlingo authored item (Deep Learning, to sixty)",
};

export const { mcq, short, num } = makeBuilders(AUTHORED);

export const m = (concept: string, slug: string, cognitive: Spec["cognitive"], level: number, seconds: number, stem: string) =>
  ({ concept, slug: `s60-${slug}`, cognitive, level, seconds, stem });
