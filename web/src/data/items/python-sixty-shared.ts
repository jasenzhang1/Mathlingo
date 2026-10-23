import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders, type Spec } from "./authoring";

/** Shared builders for the `python-sixty-*` modules (and the ML ones that follow them). */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-python-sixty",
  tier: "generated",
  title: "Mathlingo authored item (Python, to sixty)",
};

export const { mcq, short, num } = makeBuilders(AUTHORED);

/** A `code` item: the learner writes a function, graded by running `tests`. */
export function code(
  spec: Spec & { level: number },
  starterCode: string,
  referenceSolution: string,
  tests: [id: string, run: string, check: string][],
  codePackages?: string[],
): Item {
  const base = num(spec, 0);
  const { answerKey: _k, tolerance: _t, ...rest } = base as Item & { answerKey?: number; tolerance?: number };
  return {
    ...rest,
    format: "code",
    channels: ["typed"],
    starterCode,
    referenceSolution,
    codeTests: tests.map(([id, run, check]) => ({ id, description: `${run.replace(/^result = /, "")} → ${check.replace(/^result == /, "")}`, run, check })),
    ...(codePackages ? { codePackages } : {}),
  } as Item;
}

export const s = (concept: string, slug: string, cognitive: Spec["cognitive"], level: number, seconds: number, stem: string) =>
  ({ concept, slug: `s60-${slug}`, cognitive, level, seconds, stem });
