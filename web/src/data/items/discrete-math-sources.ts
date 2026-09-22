import type { SourceRef } from "../../lib/assessment/types";

/**
 * Source registry for the discrete-math bank. Tiers follow `assessment.md`
 * §1.1; see `items/sources.ts` for the same pattern applied to regression.
 */

export const LEVIN_DISCRETE_MATH: SourceRef = {
  id: "levin-discrete-math",
  tier: "open",
  title: "Discrete Mathematics: An Open Introduction (Levin), free online edition",
  url: "https://discrete.openmathbooks.org/",
  license: "CC-BY-SA-4.0",
};

export const LLM_MATH_FOR_CS: SourceRef = {
  id: "mit-ocw-6.042j",
  tier: "open",
  title: "MIT 6.042J Mathematics for Computer Science (Lehman, Leighton & Meyer, OpenCourseWare)",
  url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/",
  license: "CC-BY-NC-SA-4.0",
};

export const ROSEN_DISCRETE_MATH: SourceRef = {
  id: "rosen-discrete-math",
  tier: "restricted",
  title: "Discrete Mathematics and Its Applications (Rosen, 7th ed.)",
  locator: "Ch. 1-2, 5-6, logic/sets/counting exercises",
  rewriteApprovedBy: "pending-review",
};

/**
 * Items with no external seed at all — authored from the concept and its
 * prerequisites. See `items/sources.ts`'s `AUTHORED` for the same pattern.
 */
export const AUTHORED_DM: SourceRef = {
  id: "mathlingo-authored-dm",
  tier: "generated",
  title: "Authored for Mathlingo from the concept and its prerequisites",
};
