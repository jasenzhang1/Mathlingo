import type { CognitiveLevel, Item, SourceRef } from "../../lib/assessment/types";
import { levelToDifficulty } from "../../lib/assessment/difficultyLevel";
import { conceptById } from "../concepts";

/**
 * Builders for hand-authored item modules. They only remove boilerplate: each
 * returns an ordinary `Item`, every distractor still names the misconception it
 * diagnoses, and `prereqClosure` is the concept plus its direct prerequisites —
 * always upstream by construction, so `checkPrereqClosure` cannot fail on it.
 *
 * Difficulty can be given as `level`, the 1–10 scale shown in the app (see
 * lib/assessment/difficultyLevel.ts), instead of a raw logit. The rubric:
 * 1 — restate a definition; 2–3 — recognise or apply it in one step;
 * 4–5 — a standard multi-step calculation; 6–7 — explain why, or combine two
 * ideas; 8–9 — a derivation or an unfamiliar setting; 10 — genuinely hard.
 *
 * Numeric tolerance is relative with an absolute floor (see grading), so the
 * default `0.01` accepts answers rounded to about two significant decimals.
 */

/** [text, misconception id, why it is wrong, concept to blame (defaults to the item's own)] */
export type Distractor = [text: string, misconceptionId: string, why: string, blame?: string];
/** [id, description, weight, required] */
export type RubricElement = [id: string, description: string, weight: number, required?: boolean];

export interface Spec {
  concept: string;
  slug: string;
  cognitive: CognitiveLevel;
  /** Raw IRT logit. Give this or `level`. */
  difficulty?: number;
  /** The 1–10 level shown in the app; converted to a logit. */
  level?: number;
  seconds: number;
  stem: string;
}

export function makeBuilders(source: SourceRef) {
  function base({ concept, slug, cognitive, difficulty, level, seconds, stem }: Spec) {
    const c = conceptById.get(concept);
    if (!c) throw new Error(`Unknown concept ${concept}`);
    if ((difficulty === undefined) === (level === undefined)) {
      throw new Error(`${concept}--${slug}: give exactly one of difficulty or level`);
    }
    return {
      id: `${concept}--${slug}`,
      conceptId: concept,
      cognitive,
      stem,
      difficulty: level !== undefined ? levelToDifficulty(level) : difficulty!,
      discrimination: 1.2,
      expectedSeconds: seconds,
      prereqClosure: [concept, ...c.prerequisites],
      source,
      status: "live" as const,
    };
  }

  function mcq(spec: Spec, correct: string, distractors: Distractor[]): Item {
    return {
      ...base(spec),
      format: "mcq",
      channels: ["typed"],
      choices: [
        { id: "a", text: correct, correct: true },
        ...distractors.map(([text, id, description, blame], i) => ({
          id: String.fromCharCode(98 + i),
          text,
          correct: false,
          misconception: { id, description, blameConceptId: blame ?? spec.concept },
        })),
      ],
    };
  }

  function short(spec: Spec, elements: RubricElement[]): Item {
    return {
      ...base(spec),
      format: "short-answer",
      channels: ["typed", "spoken"],
      rubric: {
        elements: elements.map(([id, description, weight, required]) => ({
          id,
          description,
          weight,
          ...(required ? { required } : {}),
        })),
      },
    };
  }

  function num(spec: Spec, answerKey: number, tolerance = 0.01): Item {
    return {
      ...base(spec),
      format: "numeric",
      channels: ["typed", "handwritten"],
      answerKey,
      tolerance,
    };
  }

  return { mcq, short, num };
}
