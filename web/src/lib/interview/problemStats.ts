import { supabase } from "../supabase";

/**
 * What the problem list (`/interview/problems`) shows beside each question:
 * its difficulty, which is literally the share of students who get it right
 * (migration 0017), and whether the current student has solved it.
 *
 * Best effort, like the rest of interview prep: if the function isn't deployed
 * or the network drops, every question reads as not yet rated.
 */

export interface QuestionStats {
  /** Students who have answered it. Only each one's first answer counts. */
  students: number;
  /** Of those, how many got it fully right. */
  solved: number;
}

/** null when nobody has answered yet. */
export function solveRate(stats: QuestionStats | undefined): number | null {
  return stats && stats.students > 0 ? stats.solved / stats.students : null;
}

/**
 * LeetCode's three bands, cut on the solve rate. The number is the
 * difficulty; the band only colours it and backs the difficulty filter.
 */
export type DifficultyBand = "easy" | "medium" | "hard" | "new";

export const DIFFICULTY_BANDS: { id: DifficultyBand; label: string; hint: string }[] = [
  { id: "easy", label: "Easy", hint: "60% or more get it right" },
  { id: "medium", label: "Medium", hint: "30–60% get it right" },
  { id: "hard", label: "Hard", hint: "Under 30% get it right" },
  { id: "new", label: "New", hint: "Nobody has answered it yet" },
];

export function difficultyBand(rate: number | null): DifficultyBand {
  if (rate === null) return "new";
  if (rate >= 0.6) return "easy";
  if (rate >= 0.3) return "medium";
  return "hard";
}

/** PostgREST caps a response at 1,000 rows; read in pages. */
const PAGE = 1000;

/** Read once and shared by the list and problem pages; an answer here clears it. */
let statsLoading: Promise<Map<string, QuestionStats>> | null = null;

export function loadQuestionStats(): Promise<Map<string, QuestionStats>> {
  statsLoading ??= fetchQuestionStats();
  return statsLoading;
}

async function fetchQuestionStats(): Promise<Map<string, QuestionStats>> {
  const out = new Map<string, QuestionStats>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase.rpc("interview_question_stats").range(from, from + PAGE - 1);
    if (error || !data) return out;
    for (const row of data as { question_id: string; students: number; solved: number }[]) {
      out.set(row.question_id, { students: Number(row.students), solved: Number(row.solved) });
    }
    if (data.length < PAGE) return out;
  }
}

export type ProblemStatus = "solved" | "attempted";

/**
 * Answers given this page load, so the list is up to date the moment a
 * student comes back to it, before their logged attempt can be read back.
 */
const sessionResults = new Map<string, ProblemStatus>();

export function noteResult(questionId: string, correctness: number) {
  statsLoading = null;
  if (correctness >= 1) sessionResults.set(questionId, "solved");
  else if (!sessionResults.has(questionId)) sessionResults.set(questionId, "attempted");
}

/** Solved if any answer was fully right, attempted if there are only misses. */
export async function loadMyStatuses(userId: string): Promise<Map<string, ProblemStatus>> {
  const out = new Map<string, ProblemStatus>();
  const note = (id: string, status: ProblemStatus) => {
    if (status === "solved" || !out.has(id)) out.set(id, status);
  };
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("interview_attempts")
      .select("question_id, correctness")
      .eq("user_id", userId)
      .order("id")
      .range(from, from + PAGE - 1);
    if (error || !data) break;
    for (const row of data as { question_id: string; correctness: number }[]) {
      note(row.question_id, row.correctness >= 1 ? "solved" : "attempted");
    }
    if (data.length < PAGE) break;
  }
  for (const [id, status] of sessionResults) note(id, status);
  return out;
}
