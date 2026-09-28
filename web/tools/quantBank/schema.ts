import { createHash } from "node:crypto";

/**
 * The shape of the quant-interview spreadsheet, and the rules for reading it.
 *
 * The spreadsheet is the source of truth and was designed for a human first,
 * so this file follows it rather than the other way round:
 *
 * - **Concepts** are *sections*: a number in `Classifications` naming a
 *   Topic › Subtopic ("231 · Combinatorics › Recursion (Characteristic
 *   Polynomial)"). Every problem has one section; `Tags` carries any further
 *   techniques as free text.
 * - **Scenarios** are *families*: a named setup in `Category Classifications`
 *   ("Lattice Walk — can only go U and R"), with a `Number` that groups related
 *   families (Divisibility, Digits, Modular Arithmetic and Bases all share 3).
 *
 * Headers are matched loosely (case, spacing, punctuation) and column order
 * never matters. See `assessments/quant-interview/README.md`.
 */

export type TabKey = "inbox" | "bank" | "concepts" | "families";

export const DEFAULT_TAB_TITLES: Record<TabKey, string> = {
  inbox: "New Questions",
  bank: "Question Bank",
  concepts: "Classifications",
  families: "Category Classifications",
};

export function tabTitles(env: NodeJS.ProcessEnv = process.env): Record<TabKey, string> {
  return {
    inbox: env.QUANT_TAB_INBOX ?? DEFAULT_TAB_TITLES.inbox,
    bank: env.QUANT_TAB_BANK ?? DEFAULT_TAB_TITLES.bank,
    concepts: env.QUANT_TAB_CONCEPTS ?? DEFAULT_TAB_TITLES.concepts,
    families: env.QUANT_TAB_FAMILIES ?? DEFAULT_TAB_TITLES.families,
  };
}

// ---------------------------------------------------------------------------
// Columns
// ---------------------------------------------------------------------------

/** Canonical key → accepted header spellings. The first is written when a column has to be created. */
export const PROBLEM_COLUMNS = {
  section: ["Section"],
  topic: ["Topic"],
  subtopic: ["Subtopic"],
  question: ["Question", "Problem"],
  answer: ["Answer"],
  solution: ["Notes", "Solution", "How to get to the answer"],
  difficulty: ["Difficulty"],
  instructional: ["Instructional"],
  tags: ["Tags"],
  family: ["Family", "Scenario"],
  family_num: ["Family Num", "Family Number"],
  source: ["Source"],
  review_note: ["Review Note", "Claude Note"],
} as const;

export const CONCEPT_COLUMNS = {
  section: ["Section"],
  topic: ["Topic"],
  subtopic: ["Subtopic"],
  example: ["Example"],
  notes: ["Notes"],
} as const;

export const FAMILY_COLUMNS = {
  category: ["Category", "Family"],
  number: ["Number", "Family Num"],
  meaning: ["Meaning", "Description"],
} as const;

export type ProblemKey = keyof typeof PROBLEM_COLUMNS;
export type ConceptKey = keyof typeof CONCEPT_COLUMNS;
export type FamilyKey = keyof typeof FAMILY_COLUMNS;

/** A value as written to the sheet. Numbers stay numbers, so Section/Difficulty sort and filter as before. */
export type CellValue = string | number;

function normHeader(h: string): string {
  return h.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export interface HeaderMap<K extends string> {
  index: Partial<Record<K, number>>;
  headers: string[];
}

export function mapHeaders<K extends string>(headers: string[], spec: Record<K, readonly string[]>): HeaderMap<K> {
  const index: Partial<Record<K, number>> = {};
  const claimed = new Set<number>();
  for (const key of Object.keys(spec) as K[]) {
    const accepted = spec[key].map(normHeader);
    const at = headers.findIndex((h, i) => !claimed.has(i) && accepted.includes(normHeader(h ?? "")));
    if (at >= 0) {
      index[key] = at;
      claimed.add(at);
    }
  }
  // Trailing empty header cells are just the sheet's width, not columns.
  const width = headers.reduce((w, h, i) => ((h ?? "").trim() ? i + 1 : w), 0);
  return { index, headers: headers.slice(0, width) };
}

export function defaultHeaders(spec: Record<string, readonly string[]>): string[] {
  return Object.values(spec).map((names) => names[0]);
}

export function cell<K extends string>(row: string[], map: HeaderMap<K>, key: K): string {
  const i = map.index[key];
  return i === undefined ? "" : (row[i] ?? "").trim();
}

/** Lay out a record in this tab's column order. Keys the tab has no column for are dropped. */
export function toRow<K extends string>(map: HeaderMap<K>, values: Partial<Record<K, CellValue>>): CellValue[] {
  const row = new Array<CellValue>(map.headers.length).fill("");
  for (const [key, value] of Object.entries(values) as [K, CellValue | undefined][]) {
    const i = map.index[key];
    if (i !== undefined && value !== undefined) row[i] = value;
  }
  return row;
}

// ---------------------------------------------------------------------------
// Records
// ---------------------------------------------------------------------------

/** One row of `Classifications`. */
export interface Section {
  section: number;
  topic: string;
  subtopic: string;
  example: string;
  notes: string;
}

/** One row of `Category Classifications`. */
export interface Family {
  category: string;
  /** Group number shared by related families. */
  number: number | null;
  meaning: string;
}

export interface Problem {
  section: number | null;
  topic: string;
  subtopic: string;
  question: string;
  answer: string;
  solution: string;
  /** The sheet's own scale (0–12 in practice). null when blank or not a number. */
  difficulty: number | null;
  instructional: string;
  tags: string[];
  family: string;
  familyNum: number | null;
  source: string;
  /** Stable identity of a row's content: question + answer + solution. */
  fingerprint: string;
}

export function splitList(s: string): string[] {
  return s
    .split(/[,;\n]/)
    .map((x) => x.trim())
    .filter(Boolean);
}

/** Tags as the sheet writes them: one per line, comma-terminated. */
export function joinTags(tags: string[]): string {
  return tags.join(",\n");
}

export function parseNumber(s: string): number | null {
  if (!s.trim()) return null;
  const n = Number(s.trim());
  return Number.isFinite(n) ? n : null;
}

function normText(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export function fingerprint(question: string, answer: string, solution: string): string {
  return createHash("sha256")
    .update([question, answer, solution].map(normText).join("␞"))
    .digest("hex")
    .slice(0, 12);
}

export function parseSection(row: string[], map: HeaderMap<ConceptKey>): Section | null {
  const section = parseNumber(cell(row, map, "section"));
  if (section === null) return null;
  return {
    section,
    topic: cell(row, map, "topic"),
    subtopic: cell(row, map, "subtopic"),
    example: cell(row, map, "example"),
    notes: cell(row, map, "notes"),
  };
}

export function parseFamily(row: string[], map: HeaderMap<FamilyKey>): Family | null {
  const category = cell(row, map, "category");
  if (!category) return null;
  return { category, number: parseNumber(cell(row, map, "number")), meaning: cell(row, map, "meaning") };
}

export function parseProblem(row: string[], map: HeaderMap<ProblemKey>): Problem {
  const question = cell(row, map, "question");
  const answer = cell(row, map, "answer");
  const solution = cell(row, map, "solution");
  return {
    section: parseNumber(cell(row, map, "section")),
    topic: cell(row, map, "topic"),
    subtopic: cell(row, map, "subtopic"),
    question,
    answer,
    solution,
    difficulty: parseNumber(cell(row, map, "difficulty")),
    instructional: cell(row, map, "instructional"),
    tags: splitList(cell(row, map, "tags")),
    family: cell(row, map, "family"),
    familyNum: parseNumber(cell(row, map, "family_num")),
    source: cell(row, map, "source"),
    fingerprint: fingerprint(question, answer, solution),
  };
}

export function isBlankRow(row: string[]): boolean {
  return row.every((c) => (c ?? "").trim() === "");
}

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "Dice Rolls" / "dice roll" / "Dice-Roll" all compare equal. Only plural *s* is folded. */
export function sameName(a: string, b: string): boolean {
  const fold = (s: string) =>
    slugify(s)
      .split("-")
      .map((w) => (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w))
      .join("-");
  return fold(a) === fold(b);
}

const STOP = new Set(
  "a an the of to in on at is are be we you if what how many ways can from and or with for by it this that which there".split(" "),
);

export function tokens(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((t) => t && !STOP.has(t)),
  );
}

/** Jaccard overlap of content words. Crude; only used to put candidates in front of a reviewer. */
export function similarity(a: string, b: string): number {
  const ta = tokens(a);
  const tb = tokens(b);
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  return inter / (ta.size + tb.size - inter);
}
