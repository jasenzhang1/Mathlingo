import type { InterviewQuestion } from "./types";

/**
 * Unpublished question edits from `/dev/bundles` (Questions view), kept in
 * this browser.
 *
 * Unlike the bundle draft this is a patch — the full question for every id
 * that was edited or added — because the bank is large and only a handful of
 * questions change at a time. Publishing sends the patch, and the publish
 * function merges it into `web/src/data/interview/questions.json` by id.
 */

const STORAGE_KEY = "mathlingo:dev:interview-questions";

export type QuestionDraft = Record<string, InterviewQuestion>;

export function loadQuestionDraft(): QuestionDraft {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as QuestionDraft) : {};
  } catch {
    return {};
  }
}

export function saveQuestionDraft(draft: QuestionDraft): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Storage full or blocked: edits simply won't survive a reload.
  }
}

export function clearQuestionDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear.
  }
}

/** The repo's questions with a draft applied: edited ones replaced in place, new ones appended. */
export function applyQuestionDraft(repo: InterviewQuestion[], draft: QuestionDraft): InterviewQuestion[] {
  const seen = new Set<string>();
  const merged = repo.map((q) => {
    seen.add(q.id);
    return draft[q.id] ?? q;
  });
  for (const q of Object.values(draft)) if (!seen.has(q.id)) merged.push(q);
  return merged;
}
