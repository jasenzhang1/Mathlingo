import { describeFunctionError } from "../functionErrors";
import { supabase } from "../supabase";
import type { Item, ResponseChannel } from "./types";

/**
 * The normalization stage (`grading.md`): text, image, and audio submissions all
 * become one normalized answer before any grader sees them.
 *
 * The point of collapsing the channels here rather than in each grader is that
 * grading then cannot depend on how the answer was produced. Whatever the
 * learner did — typed, wrote on paper, spoke — the router and the rubric see
 * the same thing, so a handwritten proof is held to the same standard as a
 * typed one.
 *
 * What survives the collapse is `transcript` and `transcriptConfidence`: the
 * learner must be able to see what we believed they wrote or said, because when
 * OCR misreads a subscript the resulting mark is otherwise inexplicable.
 */

export interface RawSubmission {
  text?: string;
  selectedChoiceIds?: string[];
  /** Data URL from the drawing canvas or an uploaded photo. */
  image?: string;
  /** Recorded speech, already transcribed in-browser (see useSpeechInput). */
  spokenText?: string;
}

export interface NormalizedAnswer {
  /** What the graders read. */
  text: string;
  selectedChoiceIds: string[];
  channel: ResponseChannel;
  /** For image/audio: what we believed the learner produced. */
  transcript?: string;
  transcriptConfidence?: number;
}

export type NormalizeResult =
  | { ok: true; answer: NormalizedAnswer }
  | { ok: false; reason: "empty" | "unavailable" | "error"; message: string };

/** Strips the "data:image/png;base64," prefix the canvas produces. */
function splitDataUrl(dataUrl: string): { mediaType: string; base64: string } | null {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  return { mediaType: match[1]!, base64: match[2]! };
}

export async function normalizeSubmission(
  item: Item,
  raw: RawSubmission,
): Promise<NormalizeResult> {
  // Choices need no normalization — there is no free-form content to interpret.
  if (item.format === "mcq" || item.format === "multi-select") {
    const selected = raw.selectedChoiceIds ?? [];
    if (selected.length === 0) {
      return { ok: false, reason: "empty", message: "Select an option first." };
    }
    return {
      ok: true,
      answer: { text: selected.join(","), selectedChoiceIds: selected, channel: "typed" },
    };
  }

  if (raw.image) {
    const parts = splitDataUrl(raw.image);
    if (!parts) {
      return { ok: false, reason: "error", message: "The image could not be read." };
    }

    const { data, error } = await supabase.functions.invoke<{
      text: string;
      confidence: number;
    }>("transcribe", {
      body: {
        mediaType: parts.mediaType,
        image: parts.base64,
        // The question is passed so the model can resolve genuinely ambiguous
        // handwriting from context — a scrawled "p" and "ρ" are separable when
        // you know which one the question is about.
        stem: item.stem,
      },
    });

    if (error) {
      const failure = await describeFunctionError(error);
      return {
        ok: false,
        reason: failure.reason,
        message:
          failure.reason === "unavailable"
            ? "Handwriting recognition isn't deployed yet, so this can't be read."
            : failure.message,
      };
    }
    if (!data?.text?.trim()) {
      return {
        ok: false,
        reason: "empty",
        message: "Nothing legible was found in that image.",
      };
    }

    return {
      ok: true,
      answer: {
        text: data.text,
        selectedChoiceIds: [],
        channel: "handwritten",
        transcript: data.text,
        transcriptConfidence: data.confidence,
      },
    };
  }

  if (raw.spokenText?.trim()) {
    return {
      ok: true,
      answer: {
        text: raw.spokenText,
        selectedChoiceIds: [],
        channel: "spoken",
        transcript: raw.spokenText,
        // Browser speech recognition reports no usable per-utterance score, so
        // this is a fixed discount rather than a measurement — dictation errors
        // are real, and the judge should not treat a transcript as verbatim.
        transcriptConfidence: 0.85,
      },
    };
  }

  const text = (raw.text ?? "").trim();
  if (!text) {
    return { ok: false, reason: "empty", message: "Write an answer first." };
  }
  return { ok: true, answer: { text, selectedChoiceIds: [], channel: "typed" } };
}
