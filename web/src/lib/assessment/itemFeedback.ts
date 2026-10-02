import { supabase } from "../supabase";

/**
 * Feedback on a question (migration 0014): learners flag problems, developers
 * leave notes, and both land in the inbox at /dev/questions.
 */

export type FeedbackReason =
  | "too-strict"
  | "wrong-key"
  | "ambiguous"
  | "typo"
  | "off-topic"
  | "too-easy"
  | "too-hard"
  | "other";

export const FEEDBACK_REASONS: { id: FeedbackReason; label: string }[] = [
  { id: "too-strict", label: "Graded too strictly" },
  { id: "wrong-key", label: "Answer key is wrong" },
  { id: "ambiguous", label: "Unclear what's being asked" },
  { id: "typo", label: "Typo or formatting" },
  { id: "off-topic", label: "Not about this lesson" },
  { id: "too-easy", label: "Too easy" },
  { id: "too-hard", label: "Too hard" },
  { id: "other", label: "Something else" },
];

export const reasonLabel = (id: string) => FEEDBACK_REASONS.find((r) => r.id === id)?.label ?? id;

export interface FeedbackRow {
  id: string;
  user_id: string;
  item_id: string;
  concept_id: string | null;
  reason: FeedbackReason;
  message: string;
  stem_shown: string | null;
  answer: string | null;
  score: number | null;
  from_developer: boolean;
  status: "open" | "resolved";
  created_at: string;
}

function explain(message: string): string {
  return /schema cache|does not exist/i.test(message)
    ? "Feedback can't be saved yet — run supabase/migrations/0014_item_feedback.sql."
    : message;
}

export async function sendFeedback(input: {
  itemId: string;
  conceptId: string;
  reason: FeedbackReason;
  message: string;
  stemShown: string;
  answer?: string;
  score?: number;
  fromDeveloper: boolean;
}): Promise<{ error: string | null }> {
  const { error } = await supabase.from("item_feedback").insert({
    item_id: input.itemId,
    concept_id: input.conceptId,
    reason: input.reason,
    message: input.message.slice(0, 4000),
    stem_shown: input.stemShown.slice(0, 10000),
    answer: input.answer?.slice(0, 10000) ?? null,
    score: input.score ?? null,
    from_developer: input.fromDeveloper,
  });
  return { error: error ? explain(error.message) : null };
}

/** Developers only (RLS): feedback, newest first. */
export async function loadFeedback(status: "open" | "resolved"): Promise<{ rows: FeedbackRow[]; error: string | null }> {
  const { data, error } = await supabase
    .from("item_feedback")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false })
    .limit(500);
  return { rows: (data as FeedbackRow[]) ?? [], error: error ? explain(error.message) : null };
}

export async function setFeedbackStatus(id: string, status: "open" | "resolved"): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("item_feedback")
    .update({ status, resolved_at: status === "resolved" ? new Date().toISOString() : null })
    .eq("id", id);
  return { error: error ? explain(error.message) : null };
}
