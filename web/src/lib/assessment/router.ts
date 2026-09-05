import type { Item } from "./types";

/**
 * The grading router (`grading.md`): given a normalized answer's item, decide
 * which grader adjudicates it.
 *
 * Routing is on `format` alone, deliberately not on channel. A binomial
 * probability is graded the same way whether it was typed, handwritten, or
 * spoken — the normalization stage upstream has already reduced all three to
 * text, and letting the channel influence the grader is how you end up
 * accidentally marking handwriting more leniently than typing.
 */
export type GraderKind =
  /** Answer key comparison — choices. No interpretation. */
  | "exact"
  /** Numeric comparison within tolerance. */
  | "math"
  /** Model judge against a rubric. */
  | "llm";

export function routeGrader(item: Item): GraderKind {
  switch (item.format) {
    case "mcq":
    case "multi-select":
      return "exact";

    case "numeric":
      return "math";

    /**
     * Symbolic answers belong in the math engine — "np(1−p)" and "np − np²"
     * are the same expression and only a CAS says so reliably. We do not have
     * one, so they route to the judge, which handles algebraic equivalence
     * acceptably but not dependably. Replace this with a real CAS before
     * authoring symbolic items in volume.
     */
    case "symbolic":
      return "llm";

    case "short-answer":
    case "derivation":
    case "interview":
      return "llm";
  }
}

/** True when grading this item requires a deployed model grader. */
export function needsModelGrading(item: Item): boolean {
  return routeGrader(item) === "llm";
}
