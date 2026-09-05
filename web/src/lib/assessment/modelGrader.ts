import { describeFunctionError } from "../functionErrors";
import { supabase } from "../supabase";
import { makeVerdict } from "./rubric";
import type { Item, ResponseChannel, Rubric, RubricVerdict } from "./types";

/**
 * Client for the LLM branch of the grading router.
 *
 * The judge returns **per-element credit and justifications only** — never a
 * score. Turning credit into a mark is `scoreFromVerdicts`' job, shared with the
 * exact and math graders (see `rubric.ts`). Two reasons: models are unreliable
 * at weighted arithmetic, and one scoring implementation means a written answer
 * and a multiple-choice answer cannot drift apart in how they are marked.
 *
 * The model call itself lives in a Supabase Edge Function because it needs an
 * API key, which must never reach a browser bundle.
 */

export interface JudgedResponse {
  ok: true;
  verdicts: RubricVerdict[];
  confidence: number;
  feedback: string;
}

export type ModelGradeResult =
  | JudgedResponse
  | { ok: false; reason: "unavailable" | "error"; message: string };

interface ElementVerdict {
  id: string;
  credit: number;
  justification: string;
}

interface JudgeResponse {
  elements: ElementVerdict[];
  forbidden: ElementVerdict[];
  confidence: number;
  feedback: string;
  nextStep?: string;
}

/**
 * The judge reports credit as an integer 0-100; internally credit is a 0..1
 * fraction, because that is what the weighted rubric arithmetic multiplies by.
 * Quantising to 1/100 keeps the two representations exactly convertible, so a
 * displayed "73/100" is the number that was actually scored, not a rounding of
 * something else.
 */
function toCredit(raw: number): number {
  const value = Number.isFinite(raw) ? raw : 0;
  return Math.round(Math.max(0, Math.min(100, value))) / 100;
}

export async function gradeOpenResponse(input: {
  item: Item;
  rubric: Rubric;
  answer: string;
  channel: ResponseChannel;
  latencySeconds: number;
}): Promise<ModelGradeResult> {
  const { item, rubric, answer, channel } = input;

  const { data, error } = await supabase.functions.invoke<JudgeResponse>("grade", {
    body: {
      itemId: item.id,
      conceptId: item.conceptId,
      stem: item.stem,
      cognitive: item.cognitive,
      channel,
      answer,
      rubric,
    },
  });

  if (error) return { ok: false, ...(await describeFunctionError(error)) };
  if (!data) return { ok: false, reason: "error", message: "Grader returned no result." };

  const credits = new Map<string, number>();
  const justifications = new Map<string, string>();
  for (const entry of [...(data.elements ?? []), ...(data.forbidden ?? [])]) {
    if (!entry?.id) continue;
    credits.set(entry.id, toCredit(entry.credit));
    justifications.set(entry.id, String(entry.justification ?? ""));
  }

  /**
   * Elements are built from OUR rubric, not from what the judge returned. An
   * element the model omitted scores 0 rather than vanishing — dropping it would
   * shrink the denominator and silently inflate the mark.
   */
  const verdicts: RubricVerdict[] = rubric.elements.map((element) =>
    makeVerdict({
      elementId: element.id,
      description: element.description,
      weight: element.weight,
      required: element.required,
      credit: credits.get(element.id) ?? 0,
      justification:
        justifications.get(element.id) ?? "The grader did not report on this element.",
    }),
  );

  for (const move of rubric.forbiddenMoves ?? []) {
    const credit = credits.get(move.id) ?? 0;
    if (credit <= 0) continue;
    verdicts.push(
      makeVerdict({
        elementId: move.id,
        description: move.description,
        weight: 0,
        credit,
        forbidden: true,
        justification: justifications.get(move.id) ?? "",
      }),
    );
  }

  const feedback = data.nextStep
    ? `${data.feedback}\n\nNext: ${data.nextStep}`
    : (data.feedback ?? "");

  return {
    ok: true,
    verdicts,
    confidence: Math.max(0, Math.min(1, data.confidence ?? 0.7)),
    feedback,
  };
}
