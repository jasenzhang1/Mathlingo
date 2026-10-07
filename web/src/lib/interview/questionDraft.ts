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

/**
 * Drops optional fields that are empty or at their default, and keeps the
 * repo version's key order, so an untouched field never shows up in the PR.
 */
export function normalizeQuestion(q: InterviewQuestion, original?: InterviewQuestion): InterviewQuestion {
  const c: Record<string, unknown> = { ...q };
  if (!q.otherSections?.length) delete c.otherSections;
  if (q.numericAnswer === undefined || !Number.isFinite(q.numericAnswer)) delete c.numericAnswer;
  if (q.status !== "draft") delete c.status;
  if (!q.free) delete c.free;
  if (!q.reviewNote) delete c.reviewNote;
  if (!q.instructional) delete c.instructional;
  const canonical = ["id", "title", "section", "otherSections", "family", "difficulty", "question", "answer", "notes", "tags", "source", "instructional", "numericAnswer", "status", "free", "reviewNote"];
  const order = [...Object.keys(original ?? {}), ...canonical, ...Object.keys(c)];
  const out: Record<string, unknown> = {};
  for (const k of order) if (k in c && !(k in out)) out[k] = c[k];
  return out as unknown as InterviewQuestion;
}

/**
 * Stores one question edit in this browser's draft, or drops it once it
 * matches the published version again. `original` is the published question,
 * if there is one. Returns the new draft.
 */
export function saveQuestionEdit(q: InterviewQuestion, original?: InterviewQuestion): QuestionDraft {
  const draft = { ...loadQuestionDraft() };
  const normalized = normalizeQuestion(q, original);
  if (original && JSON.stringify(normalized) === JSON.stringify(original)) delete draft[q.id];
  else draft[q.id] = normalized;
  saveQuestionDraft(draft);
  return draft;
}
