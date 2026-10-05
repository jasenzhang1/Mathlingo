import type { FeedbackRow } from "../assessment/itemFeedback";
import type { Item } from "../assessment/types";
import { describeFunctionError } from "../functionErrors";
import { supabase } from "../supabase";

/**
 * Asks the `revise-item` Edge Function to revise a question in light of
 * feedback, as far as the developer agrees with it. Returns the proposed
 * question (the original with the model's patch applied) for review; nothing
 * is saved until the developer applies it.
 */

/** The agreement scale shown in the inbox, mapped onto the 0–100 the model reads. */
export const AGREEMENT_LEVELS = [
  { value: 25, label: "Slightly" },
  { value: 50, label: "Partly" },
  { value: 75, label: "Mostly" },
  { value: 100, label: "Fully" },
] as const;

export type Revision =
  | { ok: true; item: Item; summary: string; changes: string[]; changed: boolean }
  | { ok: false; message: string };

const PLACEHOLDER = /(?<![\\A-Za-z^_}])\{([A-Za-z_]\w*)\}/g;

function placeholders(text: string): string {
  return [...text.matchAll(PLACEHOLDER)].map((m) => m[1]).sort().join(",");
}

export async function reviseItem(input: {
  item: Item;
  feedback: FeedbackRow[];
  agreement: number;
  note?: string;
}): Promise<Revision> {
  const { data, error } = await supabase.functions.invoke<{
    summary: string;
    changes: string[];
    patch: Partial<Item>;
  }>("revise-item", {
    body: {
      item: input.item,
      agreement: input.agreement,
      note: input.note?.trim() || undefined,
      feedback: input.feedback.map((f) => ({
        reason: f.reason,
        message: f.message,
        answer: f.answer,
        score: f.score,
        stemShown: f.stem_shown,
      })),
    },
  });

  if (error) return { ok: false, message: (await describeFunctionError(error)).message };
  if (!data) return { ok: false, message: "The reviser returned nothing." };

  const patch = data.patch ?? {};
  const item: Item = { ...input.item, ...patch };

  // A templated question's placeholders are its contract with the solver.
  if (input.item.params && placeholders(item.stem) !== placeholders(input.item.stem)) {
    return {
      ok: false,
      message: "The revision changed the template placeholders, so it was discarded. Try again or edit by hand.",
    };
  }

  return {
    ok: true,
    item,
    summary: data.summary,
    changes: data.changes ?? [],
    changed: Object.keys(patch).length > 0,
  };
}

export type StemMatch =
  | { ok: true; item: Item; summary: string; changes: string[] }
  | { ok: false; message: string };

/**
 * "I rewrote the question; update everything else to match." Sends the item
 * (with its new stem) and the stem it had before; returns the item with the
 * answer key, choices, rubric, difficulty and timing brought in line. The stem
 * itself is never changed. Nothing is saved — the editor shows the result for
 * the developer to tweak and save.
 */
export async function matchStemWithAI(input: { item: Item; previousStem: string; note?: string }): Promise<StemMatch> {
  const { data, error } = await supabase.functions.invoke<{
    summary: string;
    changes: string[];
    patch: Partial<Item>;
  }>("revise-item", {
    body: { mode: "match-stem", item: input.item, previousStem: input.previousStem, note: input.note?.trim() || undefined },
  });
  if (error) return { ok: false, message: (await describeFunctionError(error)).message };
  if (!data) return { ok: false, message: "The AI returned nothing." };
  const { stem: _ignored, ...patch } = data.patch ?? {};
  return { ok: true, item: { ...input.item, ...patch }, summary: data.summary, changes: data.changes ?? [] };
}
