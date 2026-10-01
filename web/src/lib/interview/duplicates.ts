import type { InterviewQuestion } from "./types";

/**
 * Finds duplicate and near-duplicate interview questions for the dev editor.
 *
 * Each question becomes a set of normalised words — lowercased, LaTeX commands
 * and punctuation stripped, common words dropped, numbers kept (a changed
 * number is often the only difference between a question and its near-copy,
 * and the developer should see that). Pairs are scored by Jaccard similarity
 * |A ∩ B| / |A ∪ B|, and pairs above the threshold are merged into groups, so
 * three copies of one question show up together rather than as three pairs.
 *
 * Brute force over all pairs is fine at this size (~10⁶ pairs of small sets),
 * and the size-ratio bound skips most of them without intersecting.
 */

const STOP = new Set(
  "a an and are as at be by for from has have if in is it its of on or that the then this to was what when which with will you your we they there their how many find given what's".split(" "),
);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/\\[a-z]+/g, " ") // \frac, \cdot, …
    .replace(/[^a-z0-9.]+/g, " ")
    .split(" ")
    .map((w) => w.replace(/^\.+|\.+$/g, ""))
    .filter((w) => w && !STOP.has(w));
}

export interface DuplicateGroup {
  /** Question ids, in bank order. */
  ids: string[];
  /** The highest pairwise similarity inside the group, 0–1. */
  score: number;
  /** True when at least two members have character-for-character identical text (whitespace aside). */
  exact: boolean;
  /**
   * True when two members have the same words but aren't exact copies — they
   * differ only in symbols or punctuation (`=` vs `<=`), which can matter a lot.
   */
  sameWords: boolean;
}

/** Order-independent key for a pair, used to remember dismissed groups. */
export const pairKey = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`);

export function findDuplicateGroups(
  questions: InterviewQuestion[],
  threshold: number,
  dismissed: Set<string> = new Set(),
): DuplicateGroup[] {
  const sets = questions.map((q) => new Set(tokenize(q.question)));
  const norm = questions.map((q) => tokenize(q.question).join(" "));
  const raw = questions.map((q) => q.question.replace(/\s+/g, " ").trim());
  const parent = questions.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const best = new Map<number, number>();
  const exactPair = new Set<number>();
  const sameWordsPair = new Set<number>();

  for (let i = 0; i < sets.length; i++) {
    const a = sets[i];
    if (a.size === 0) continue;
    for (let j = i + 1; j < sets.length; j++) {
      const b = sets[j];
      if (b.size === 0) continue;
      // Jaccard can't exceed min/max of the sizes — skip without intersecting.
      if (Math.min(a.size, b.size) / Math.max(a.size, b.size) < threshold) continue;
      let shared = 0;
      for (const w of a) if (b.has(w)) shared++;
      const sim = shared / (a.size + b.size - shared);
      if (sim < threshold) continue;
      if (dismissed.has(pairKey(questions[i].id, questions[j].id))) continue;
      const ri = find(i);
      const rj = find(j);
      parent[ri] = rj;
      const root = find(j);
      best.set(root, Math.max(sim, best.get(ri) ?? 0, best.get(rj) ?? 0));
      if (raw[i] === raw[j]) exactPair.add(i).add(j);
      else if (norm[i] === norm[j]) sameWordsPair.add(i).add(j);
    }
  }

  const groups = new Map<number, number[]>();
  for (let i = 0; i < questions.length; i++) {
    const r = find(i);
    groups.set(r, [...(groups.get(r) ?? []), i]);
  }
  return [...groups]
    .filter(([, members]) => members.length > 1)
    .map(([root, members]) => ({
      ids: members.map((i) => questions[i].id),
      score: best.get(root) ?? threshold,
      exact: members.some((i) => exactPair.has(i)),
      sameWords: members.some((i) => sameWordsPair.has(i)),
    }))
    .sort((a, b) => b.score - a.score || a.ids[0].localeCompare(b.ids[0]));
}
