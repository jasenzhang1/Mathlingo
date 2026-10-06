import bundlesJson from "../../data/interview/bundles.json";
import familiesJson from "../../data/interview/families.json";
import questionsJson from "../../data/interview/questions.json";
import sectionsJson from "../../data/interview/sections.json";
import { loadBundleDraft } from "./bundleDraft";
import { applyQuestionDraft, loadDeletedQuestions, loadQuestionDraft } from "./questionDraft";
import type { Bundle, InterviewFamily, InterviewQuestion, InterviewSection } from "./types";

/**
 * The interview databank, indexed. This module (and everything importing it)
 * is only reached from the lazily loaded interview and dev pages, so the ~800
 * KB of question text is a separate chunk and never part of the learning
 * side's bundle.
 */

export const sections = sectionsJson as InterviewSection[];
export const families = familiesJson as InterviewFamily[];
/** Questions as committed to the repo. */
export const repoQuestions = questionsJson as InterviewQuestion[];
/**
 * The questions the app serves. A developer with unpublished edits from the
 * Questions view of `/dev/bundles` sees those instead (read once, at load).
 */
export const questions = applyQuestionDraft(repoQuestions, loadQuestionDraft(), loadDeletedQuestions());
/** Bundles as committed to the repo. */
export const repoBundles = bundlesJson as Bundle[];

export const sectionById = new Map(sections.map((s) => [s.id, s]));
export const familyById = new Map(families.map((f) => [f.id, f]));
export const questionById = new Map(questions.map((q) => [q.id, q]));

export const isLive = (q: InterviewQuestion) => q.status !== "draft";
export const liveQuestions = questions.filter(isLive);

/** What unrated questions are treated as, for ordering and scoring. */
export const DEFAULT_DIFFICULTY = 4;
export const difficultyOf = (q: InterviewQuestion) => q.difficulty ?? DEFAULT_DIFFICULTY;

export function sectionLabel(id: string | null): string {
  const s = id ? sectionById.get(id) : undefined;
  return s ? `${s.topic} › ${s.subtopic}` : "Unsorted";
}

/**
 * The bundles the app serves. A developer with unpublished edits from
 * `/dev/bundles` sees those instead, so a reordered chain can be tried in a
 * mock interview before it is published.
 */
export function activeBundles(): Bundle[] {
  return loadBundleDraft() ?? repoBundles;
}

/** Ids of every question in a free bundle — free whatever their own flag says. */
export function freeBundleQuestionIds(bundles: Bundle[] = activeBundles()): Set<string> {
  return new Set(bundles.filter((b) => b.free).flatMap((b) => b.questions));
}

/**
 * Free to everyone: marked free itself, or in a free bundle. A free bundle
 * guarantees its questions are free; a locked bundle may still hold free ones.
 */
export function isFreeQuestion(q: InterviewQuestion, freeViaBundle: Set<string> = freeBundleQuestionIds()): boolean {
  return Boolean(q.free) || freeViaBundle.has(q.id);
}

/** A bundle's questions in order, skipping drafts and ids that no longer exist. */
export function bundleQuestions(bundle: Bundle): InterviewQuestion[] {
  return bundle.questions.flatMap((id) => {
    const q = questionById.get(id);
    return q && isLive(q) ? [q] : [];
  });
}

/** Every technique a question can be trained under: its main section first, then the others. */
export function techniquesOf(q: InterviewQuestion): string[] {
  return [...(q.section ? [q.section] : []), ...(q.otherSections ?? [])];
}

/** Sections that have at least one servable question, grouped by topic in section-number order. */
export function sectionsByTopic(): { topic: string; sections: InterviewSection[] }[] {
  const used = new Set(liveQuestions.flatMap(techniquesOf));
  const groups = new Map<string, InterviewSection[]>();
  for (const s of [...sections].sort((a, b) => a.number - b.number || a.subtopic.localeCompare(b.subtopic))) {
    if (!used.has(s.id)) continue;
    groups.set(s.topic, [...(groups.get(s.topic) ?? []), s]);
  }
  return [...groups].map(([topic, secs]) => ({ topic, sections: secs }));
}

/** Questions to drill for a technique — those where it is the main technique or one of the others. */
export function questionsInSection(sectionId: string): InterviewQuestion[] {
  return liveQuestions.filter((q) => techniquesOf(q).includes(sectionId));
}

/** The list number: `iq-0042` is problem 42. */
export function problemNumber(q: InterviewQuestion): number {
  return Number.parseInt(q.id.replace(/^\D+/, ""), 10) || 0;
}

/** Questions have no titles, so the problem list shows the opening line. */
export function problemTitle(q: InterviewQuestion): string {
  return q.question.trim().split("\n")[0].trim();
}
