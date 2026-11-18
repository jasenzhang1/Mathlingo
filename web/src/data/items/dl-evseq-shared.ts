import type { SourceRef } from "../../lib/assessment/types";
import { makeBuilders, type Spec } from "./authoring";

/**
 * Shared builders for the `dl-evseq-*` modules: foundation models for event
 * sequences (bespoke vs. foundation models, masked code prediction, next-event
 * prediction, time-to-event pretraining). Every numeric key was recomputed
 * independently in Python before landing.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-dl-evseq",
  tier: "generated",
  title: "Mathlingo authored item (Deep Learning, event-sequence foundation models)",
};

export const { mcq, short, num } = makeBuilders(AUTHORED);

export const m = (concept: string, slug: string, cognitive: Spec["cognitive"], level: number, seconds: number, stem: string) =>
  ({ concept, slug, cognitive, level, seconds, stem });
