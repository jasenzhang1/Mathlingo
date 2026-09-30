import type { SourceRef } from "../../../lib/assessment/types";

/**
 * Source for the curriculum-wide expansion that takes every lesson to 30, then
 * 40, items rated across the full 1–10 level scale (see ../authoring.ts for the
 * rubric). One module per section; ./index.ts collects them.
 */
export const EXPANSION: SourceRef = {
  id: "mathlingo-authored-expansion",
  tier: "generated",
  title: "Mathlingo authored item (full-range expansion)",
};
