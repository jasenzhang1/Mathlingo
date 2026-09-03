import { gradeOpenResponse } from "./modelGrader";
import { normalizeSubmission, type NormalizedAnswer, type RawSubmission } from "./normalize";
import { routeGrader } from "./router";
import {
  makeVerdict,
  misconceptionsFrom,
  rubricFor,
  scoreFromVerdicts,
} from "./rubric";
import type { Grade, Item, RubricVerdict } from "./types";

/**
 * The grading pipeline from `grading.md`, end to end:
 *
 *   submission -> normalize -> route -> grade -> rubric scores -> final grade
 *
 * `gradeSubmission` is the only entry point. Every path through it produces
 * `RubricVerdict[]` and hands them to the same `scoreFromVerdicts`, so the
 * three graders differ in how they judge, never in how they score.
 */

export type GradeResult =
  | { ok: true; grade: Grade }
  | { ok: false; reason: "empty" | "unavailable" | "error"; message: string };

/** Parses "0.45", ".45", "45%", "7/3" into a number, or null if unparseable. */
export function parseNumericAnswer(raw: string): number | null {
  const text = raw.trim().replace(/,/g, "");
  if (!text) return null;

  if (text.endsWith("%")) {
    const pct = Number(text.slice(0, -1));
    return Number.isFinite(pct) ? pct / 100 : null;
  }

  const fraction = /^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/.exec(text);
  if (fraction) {
    const denominator = Number(fraction[2]);
    if (denominator === 0) return null;
    return Number(fraction[1]) / denominator;
  }

  const value = Number(text);
  return Number.isFinite(value) ? value : null;
}

// --- Exact grading -----------------------------------------------------------

/**
 * Answer-key comparison for choices. Each correct option is a rubric element and
 * each incorrect one a forbidden move, so partial credit on a multi-select falls
 * out of the shared scoring rather than needing its own formula.
 */
function gradeExact(item: Item, answer: NormalizedAnswer): RubricVerdict[] {
  const rubric = rubricFor(item);
  const picked = new Set(answer.selectedChoiceIds);
  const choices = item.choices ?? [];

  const verdicts: RubricVerdict[] = [];

  if (item.format === "mcq") {
    const correct = choices.find((c) => c.correct);
    const gotIt = correct ? picked.has(correct.id) : false;
    verdicts.push(
      makeVerdict({
        elementId: "correct-choice",
        description: rubric.elements[0]?.description ?? "Selects the correct option",
        weight: 1,
        required: true,
        credit: gotIt ? 1 : 0,
        justification: gotIt
          ? "Correct."
          : `The correct option was: ${correct?.text ?? "(unknown)"}`,
      }),
    );
  } else {
    for (const element of rubric.elements) {
      const choiceId = element.id.replace(/^select-/, "");
      const selected = picked.has(choiceId);
      verdicts.push(
        makeVerdict({
          elementId: element.id,
          description: element.description,
          weight: element.weight,
          credit: selected ? 1 : 0,
          justification: selected
            ? "You identified this one."
            : "This condition also had to be selected.",
        }),
      );
    }
  }

  for (const move of rubric.forbiddenMoves ?? []) {
    const choiceId = move.id.replace(/^chose-/, "");
    if (!picked.has(choiceId)) continue;
    verdicts.push(
      makeVerdict({
        elementId: move.id,
        description: move.description,
        weight: 0,
        credit: 1,
        forbidden: true,
        justification:
          move.misconception?.description ?? "This option does not belong here.",
      }),
    );
  }

  return verdicts;
}

// --- Math engine -------------------------------------------------------------

/**
 * Numeric comparison within tolerance. Tolerance is relative with an absolute
 * floor, so it behaves sensibly for both a probability near 0.001 and a count
 * in the hundreds.
 */
function gradeMath(item: Item, answer: NormalizedAnswer): RubricVerdict[] {
  const key = typeof item.answerKey === "number" ? item.answerKey : Number(item.answerKey);

  if (!Number.isFinite(key)) {
    throw new Error(
      `Item ${item.id} has no usable numeric answer key (got ${String(item.answerKey)}).`,
    );
  }

  const value = parseNumericAnswer(answer.text);
  const tolerance = item.tolerance ?? 0.001;
  const allowed = Math.max(Math.abs(key) * tolerance, tolerance);

  let credit = 0;
  let justification: string;

  if (value === null) {
    justification = `"${answer.text}" didn't parse as a number. The answer was ${key}.`;
  } else if (Math.abs(value - key) <= allowed) {
    credit = 1;
    justification = "Correct.";
  } else if (Math.abs(value - key) <= allowed * 10) {
    // Right method, wrong precision — worth distinguishing from a wrong answer,
    // because the fix is rounding rather than rethinking.
    credit = 0.5;
    justification = `Close: ${value}, but the answer is ${key}. Check your rounding and intermediate precision.`;
  } else {
    justification = `You answered ${value}; the answer is ${key}.`;
  }

  return [
    makeVerdict({
      elementId: "value",
      description: "Computes the correct value, within the stated tolerance",
      weight: 1,
      required: true,
      credit,
      justification,
    }),
  ];
}

// --- Pipeline ----------------------------------------------------------------

export async function gradeSubmission(input: {
  item: Item;
  raw: RawSubmission;
  latencySeconds: number;
}): Promise<GradeResult> {
  const { item, raw, latencySeconds } = input;

  // 1. Normalize: text / image / audio -> one answer.
  const normalized = await normalizeSubmission(item, raw);
  if (!normalized.ok) return normalized;
  const answer = normalized.answer;

  // 2. Route.
  const kind = routeGrader(item);
  const rubric = rubricFor(item);

  if (rubric.elements.length === 0) {
    return {
      ok: false,
      reason: "error",
      message: `Item ${item.id} has no rubric, so it cannot be graded.`,
    };
  }

  // 3. Grade -> rubric scores.
  let verdicts: RubricVerdict[];
  let confidence = 1;
  let feedback: string | undefined;

  if (kind === "llm") {
    const judged = await gradeOpenResponse({
      item,
      rubric,
      answer: answer.text,
      channel: answer.channel,
      latencySeconds,
    });
    if (!judged.ok) return judged;

    verdicts = judged.verdicts;
    feedback = judged.feedback;
    // A transcription step that was itself uncertain must discount the grade
    // built on top of it — otherwise a confident mark rests on a guessed word.
    confidence = judged.confidence * (answer.transcriptConfidence ?? 1);
  } else {
    verdicts = kind === "exact" ? gradeExact(item, answer) : gradeMath(item, answer);
    confidence = answer.transcriptConfidence ?? 1;
  }

  // 4. Rubric scores -> final score + feedback + confidence.
  const score = scoreFromVerdicts(verdicts);
  const credit = new Map(verdicts.map((v) => [v.elementId, v.credit]));

  return {
    ok: true,
    grade: {
      score,
      breakdown: verdicts,
      rubricElementsHit: verdicts
        .filter((v) => !v.forbidden && v.credit >= 0.75)
        .map((v) => v.elementId),
      rubricElementsMissed: verdicts
        .filter((v) => !v.forbidden && v.credit < 0.5)
        .map((v) => v.elementId),
      misconceptions: misconceptionsFrom(rubric, verdicts),
      confidence,
      latencySeconds,
      channel: answer.channel,
      adjudicator:
        kind === "llm" ? "model-judge" : kind === "math" ? "tolerance" : "key",
      feedback: feedback ?? summarise(verdicts, credit),
      transcript: answer.transcript,
      transcriptConfidence: answer.transcriptConfidence,
    },
  };
}

/** Overall line for the deterministic paths, which have no judge to write one. */
function summarise(verdicts: RubricVerdict[], credit: Map<string, number>): string {
  const positives = verdicts.filter((v) => !v.forbidden);
  const missed = positives.filter((v) => v.credit < 0.5);
  const violated = verdicts.filter((v) => v.forbidden);

  if (missed.length === 0 && violated.length === 0) return "Correct.";

  if (positives.length === 1) {
    return positives[0]!.justification;
  }

  const parts: string[] = [];
  const got = positives.length - missed.length;
  parts.push(`You got ${got} of ${positives.length}.`);
  if (violated.length > 0) {
    parts.push(violated[0]!.justification);
  } else if (missed.length > 0) {
    parts.push(`Missed: ${missed.map((m) => m.description).join("; ")}.`);
  }
  void credit;
  return parts.join(" ");
}
