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

/** Ids of published questions deleted in this browser but not yet published. */
const DELETED_KEY = "mathlingo:dev:interview-questions-deleted";

export function loadDeletedQuestions(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(DELETED_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function saveDeletedQuestions(ids: string[]): void {
  try {
    localStorage.setItem(DELETED_KEY, JSON.stringify(ids));
  } catch {
    // Storage full or blocked: deletions simply won't survive a reload.
  }
}

export function clearDeletedQuestions(): void {
  try {
    localStorage.removeItem(DELETED_KEY);
  } catch {
    // Nothing to clear.
  }
}

/**
 * The repo's questions with a draft applied: edited ones replaced in place,
 * new ones appended, deleted ones removed.
 */
export function applyQuestionDraft(repo: InterviewQuestion[], draft: QuestionDraft, deleted: string[] = []): InterviewQuestion[] {
  const gone = new Set(deleted);
  const seen = new Set<string>();
  const merged = repo
    .filter((q) => !gone.has(q.id))
    .map((q) => {
      seen.add(q.id);
      return draft[q.id] ?? q;
    });
  for (const q of Object.values(draft)) if (!seen.has(q.id) && !gone.has(q.id)) merged.push(q);
  return merged;
}
