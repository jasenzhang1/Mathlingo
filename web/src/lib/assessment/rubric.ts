import type { Item, Rubric, RubricVerdict } from "./types";

/**
 * The convergence point of the grading pipeline (`grading.md`).
 *
 * Exact grading, the math engine, and the LLM judge all produce **rubric
 * scores** — the same `RubricVerdict[]` shape — and this module is the only
 * place that turns those into a number. One scoring function for every channel
 * and every format means a multiple-choice answer and a written proof are
 * scored by identical arithmetic, and a change to how credit is weighted cannot
 * silently apply to one path and not another.
 *
 * "Everything depends on a rubric for each question", so `rubricFor` guarantees
 * one exists: authored rubrics are used as written, and deterministic formats
 * get a rubric derived from their own answer key.
 */

/** A required element below this is treated as absent rather than thin. */
export const REQUIRED_CREDIT_BAR = 0.5;
/** Cap applied when a required element is absent. */
export const REQUIRED_MISS_CAP = 0.5;
/** Cap applied when a forbidden move is committed at or above half credit. */
export const FORBIDDEN_CAP = 0.3;

/**
 * The rubric a question is graded against.
 *
 * For MCQ and multi-select the derivation is not a formality: each correct
 * choice becomes an element, and each *incorrect* choice becomes a forbidden
 * move carrying the misconception the author already tagged it with. So a
 * wrong selection feeds prerequisite blame through exactly the same path a
 * missed rubric element does in a written answer.
 */
export function rubricFor(item: Item): Rubric {
  if (item.rubric?.elements?.length) return item.rubric;

  switch (item.format) {
    case "mcq": {
      const correct = (item.choices ?? []).filter((c) => c.correct);
      return {
        elements: [
          {
            id: "correct-choice",
            description:
              correct.length === 1
                ? `Selects the correct option: ${correct[0]!.text}`
                : "Selects the correct option",
            weight: 1,
            required: true,
          },
        ],
        forbiddenMoves: (item.choices ?? [])
          .filter((c) => !c.correct && c.misconception)
          .map((c) => ({
            id: `chose-${c.id}`,
            description: c.text,
            weight: 0,
            misconception: c.misconception,
          })),
      };
    }

    case "multi-select": {
      const choices = item.choices ?? [];
      return {
        elements: choices
          .filter((c) => c.correct)
          .map((c) => ({
            id: `select-${c.id}`,
            description: c.text,
            weight: 1,
          })),
        forbiddenMoves: choices
          .filter((c) => !c.correct)
          .map((c) => ({
            id: `chose-${c.id}`,
            description: c.text,
            weight: 0,
            misconception: c.misconception,
          })),
      };
    }

    case "numeric":
      return {
        elements: [
          {
            id: "value",
            description: "Computes the correct value, within the stated tolerance",
            weight: 1,
            required: true,
          },
        ],
      };

    case "symbolic":
      return {
        elements: [
          {
            id: "expression",
            description: "Produces an expression equivalent to the correct one",
            weight: 1,
            required: true,
          },
        ],
      };

    default:
      // An open-response item with no authored rubric cannot be graded — there
      // is nothing to grade against. Callers surface this rather than guessing.
      return { elements: [] };
  }
}

export function makeVerdict(input: {
  elementId: string;
  description: string;
  weight: number;
  credit: number;
  justification: string;
  required?: boolean;
  forbidden?: boolean;
}): RubricVerdict {
  return {
    elementId: input.elementId,
    description: input.description,
    weight: input.weight,
    required: Boolean(input.required),
    credit: clamp01(input.credit),
    justification: input.justification,
    forbidden: input.forbidden,
  };
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, Number.isFinite(n) ? n : 0));

/**
 * Rubric scores -> final score.
 *
 * A weighted mean over the positive elements, then two caps: a required element
 * that is essentially absent caps the total below the pass mark, and a committed
 * forbidden move caps it harder still, because the answer reached its result by
 * a route that does not generalise.
 *
 * The caps are floors on failure, never bonuses — the score can only move down
 * through them, so a better answer can never score lower than a worse one.
 */
export function scoreFromVerdicts(verdicts: RubricVerdict[]): number {
  const elements = verdicts.filter((v) => !v.forbidden);
  const total = elements.reduce((sum, v) => sum + v.weight, 0);
  if (total <= 0) return 0;

  const earned = elements.reduce((sum, v) => sum + v.weight * v.credit, 0);
  let score = earned / total;

  if (elements.some((v) => v.required && v.credit < REQUIRED_CREDIT_BAR)) {
    score = Math.min(score, REQUIRED_MISS_CAP);
  }

  const worstForbidden = verdicts
    .filter((v) => v.forbidden)
    .reduce((worst, v) => Math.max(worst, v.credit), 0);
  if (worstForbidden >= 0.5) score = Math.min(score, FORBIDDEN_CAP);

  return clamp01(score);
}

/** Misconceptions to blame, given how each element scored. */
export function misconceptionsFrom(rubric: Rubric, verdicts: RubricVerdict[]) {
  const credit = new Map(verdicts.map((v) => [v.elementId, v.credit]));

  const missedElements = (rubric.elements ?? []).filter(
    (e) => e.misconception && (credit.get(e.id) ?? 0) < REQUIRED_CREDIT_BAR,
  );
  const committedMoves = (rubric.forbiddenMoves ?? []).filter(
    (e) => e.misconception && (credit.get(e.id) ?? 0) >= 0.5,
  );

  return [...missedElements, ...committedMoves].map((e) => e.misconception!);
}
