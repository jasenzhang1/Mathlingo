import { createHash } from "node:crypto";

/**
 * The shape of the quant-interview spreadsheet, and the rules for reading it.
 *
 * The spreadsheet is the source of truth; everything in this directory reads
 * it, never the other way round. Headers are matched loosely (case, spacing,
 * punctuation, and a few natural phrasings like "how to get to the answer")
 * so the sheet can be written for a human first. Column *order* never matters.
 *
 * See `assessments/quant-interview/README.md` for the sheet layout as the
 * author sees it.
 */

export type TabKey = "inbox" | "bank" | "concepts" | "scenarios";

/** Default tab titles. Override with QUANT_TAB_INBOX etc. if the sheet uses others. */
export const DEFAULT_TAB_TITLES: Record<TabKey, string> = {
  inbox: "New Questions",
  bank: "Question Bank",
  /** Mathematical concept metadata. */
  concepts: "Classifications",
  /** Scenario metadata. */
  scenarios: "Category Classifications",
};

export function tabTitles(env: NodeJS.ProcessEnv = process.env): Record<TabKey, string> {
  return {
    inbox: env.QUANT_TAB_INBOX ?? DEFAULT_TAB_TITLES.inbox,
    bank: env.QUANT_TAB_BANK ?? DEFAULT_TAB_TITLES.bank,
    concepts: env.QUANT_TAB_CONCEPTS ?? DEFAULT_TAB_TITLES.concepts,
    scenarios: env.QUANT_TAB_SCENARIOS ?? DEFAULT_TAB_TITLES.scenarios,
  };
}

// ---------------------------------------------------------------------------
// Columns
// ---------------------------------------------------------------------------

/**
 * Canonical column keys per tab, each with the header spellings it accepts.
 * The first spelling is the one written when a tab has no header row yet.
 */
export const PROBLEM_COLUMNS = {
  id: ["id"],
  question: ["question", "problem", "prompt"],
  answer: ["answer", "final answer"],
  solution: ["solution", "how to get to the answer", "how to get the answer", "method", "explanation", "work"],
  difficulty: ["difficulty", "level"],
  concepts: ["concepts", "concept", "concept(s)", "mathematical concepts", "mathematical concept(s)", "mathematical concept"],
  scenario: ["scenario"],
  variation: ["variation", "twist", "variant"],
  parent: ["parent", "varies", "base problem", "parent id"],
  source: ["source"],
  added: ["added", "date added", "added at"],
  review_note: ["review note", "review_note", "claude note", "notes from claude"],
} as const;

export const CONCEPT_COLUMNS = {
  slug: ["slug", "id", "key"],
  name: ["name", "concept", "title"],
  description: ["description", "summary"],
  aliases: ["aliases", "also known as"],
  graph_concepts: ["graph concepts", "graph_concepts", "mathlingo concepts", "concept ids"],
} as const;

export const SCENARIO_COLUMNS = {
  slug: ["slug", "id", "key"],
  name: ["name", "scenario", "title"],
  setup: ["setup", "base setup", "description"],
  levers: ["levers", "variations", "ways to vary"],
  aliases: ["aliases", "also known as"],
  parent: ["parent", "parent scenario"],
} as const;

export type ProblemKey = keyof typeof PROBLEM_COLUMNS;
export type ConceptKey = keyof typeof CONCEPT_COLUMNS;
export type ScenarioKey = keyof typeof SCENARIO_COLUMNS;

type ColumnSpec = Record<string, readonly string[]>;

function normHeader(h: string): string {
  return h.toLowerCase().replace(/[_\s]+/g, " ").replace(/[^a-z0-9() ]/g, "").trim();
}

/**
 * Where each canonical key lives in a tab's header row. Unrecognised headers
 * are kept (see `extra`) so a column the author adds for their own use is
 * carried through untouched rather than dropped.
 */
export interface HeaderMap<K extends string> {
  index: Partial<Record<K, number>>;
  headers: string[];
  extra: number[];
}

export function mapHeaders<K extends string>(headers: string[], spec: Record<K, readonly string[]>): HeaderMap<K> {
  const index: Partial<Record<K, number>> = {};
  const claimed = new Set<number>();
  for (const key of Object.keys(spec) as K[]) {
    const accepted = spec[key].map(normHeader);
    const at = headers.findIndex((h, i) => !claimed.has(i) && accepted.includes(normHeader(h)));
    if (at >= 0) {
      index[key] = at;
      claimed.add(at);
    }
  }
  const extra = headers.map((_, i) => i).filter((i) => !claimed.has(i) && headers[i].trim() !== "");
  return { index, headers, extra };
}

export function defaultHeaders(spec: ColumnSpec): string[] {
  return Object.values(spec).map((names) => names[0]);
}

export function cell<K extends string>(row: string[], map: HeaderMap<K>, key: K): string {
  const i = map.index[key];
  return i === undefined ? "" : (row[i] ?? "").trim();
}

/** Lay out a record as a row in this tab's column order. Unmapped keys are dropped. */
export function toRow<K extends string>(map: HeaderMap<K>, values: Partial<Record<K, string>>): string[] {
  const row = new Array<string>(map.headers.length).fill("");
  for (const [key, value] of Object.entries(values) as [K, string | undefined][]) {
    const i = map.index[key];
    if (i !== undefined && value !== undefined) row[i] = value;
  }
  return row;
}

// ---------------------------------------------------------------------------
// Records
// ---------------------------------------------------------------------------

export interface ConceptMeta {
  slug: string;
  name: string;
  description: string;
  aliases: string[];
  /** Ids in `web/src/data/concepts.ts` this interview concept leans on. */
  graphConcepts: string[];
}

export interface ScenarioMeta {
  slug: string;
  name: string;
  /** The base setup, stated once — what a candidate must recognise. */
  setup: string;
  /** The dimensions this scenario is varied along ("barrier", "forbidden point"). */
  levers: string[];
  aliases: string[];
  parent: string;
}

export interface Problem {
  id: string;
  question: string;
  answer: string;
  solution: string;
  /** 1 (warm-up) to 5 (hardest on-site). 0 when the sheet leaves it blank or unreadable. */
  difficulty: number;
  concepts: string[];
  scenario: string;
  /** What was changed relative to the scenario's base setup. Empty for the base problem. */
  variation: string;
  /** Id of the bank problem this one is a variation of. */
  parent: string;
  source: string;
  added: string;
  /** Stable identity of a row's content: question + answer + solution. */
  fingerprint: string;
}

export function splitList(s: string): string[] {
  return s
    .split(/[,;\n]/)
    .map((x) => x.trim())
    .filter(Boolean);
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

const WORD_DIFFICULTY: Record<string, number> = {
  "very easy": 1,
  easy: 2,
  medium: 3,
  moderate: 3,
  hard: 4,
  "very hard": 5,
  expert: 5,
};

/** Accepts 1–5, "3/5", "medium", etc. Returns 0 when it cannot tell. */
export function parseDifficulty(raw: string): number {
  const s = raw.trim().toLowerCase();
  if (!s) return 0;
  if (s in WORD_DIFFICULTY) return WORD_DIFFICULTY[s];
  const m = s.match(/^(\d+(?:\.\d+)?)(?:\s*\/\s*(\d+))?$/);
  if (!m) return 0;
  const n = Number(m[1]);
  const outOf = m[2] ? Number(m[2]) : 5;
  if (outOf <= 0) return 0;
  const scaled = Math.round((n / outOf) * 5);
  return scaled >= 1 && scaled <= 5 ? scaled : 0;
}

export function parseConcept(row: string[], map: HeaderMap<ConceptKey>): ConceptMeta {
  const name = cell(row, map, "name");
  return {
    slug: cell(row, map, "slug") || slugify(name),
    name,
    description: cell(row, map, "description"),
    aliases: splitList(cell(row, map, "aliases")),
    graphConcepts: splitList(cell(row, map, "graph_concepts")),
  };
}

export function parseScenario(row: string[], map: HeaderMap<ScenarioKey>): ScenarioMeta {
  const name = cell(row, map, "name");
  return {
    slug: cell(row, map, "slug") || slugify(name),
    name,
    setup: cell(row, map, "setup"),
    levers: splitList(cell(row, map, "levers")),
    aliases: splitList(cell(row, map, "aliases")),
    parent: cell(row, map, "parent"),
  };
}

export function parseProblem(row: string[], map: HeaderMap<ProblemKey>): Problem {
  const question = cell(row, map, "question");
  const answer = cell(row, map, "answer");
  const solution = cell(row, map, "solution");
  return {
    id: cell(row, map, "id"),
    question,
    answer,
    solution,
    difficulty: parseDifficulty(cell(row, map, "difficulty")),
    concepts: splitList(cell(row, map, "concepts")),
    scenario: cell(row, map, "scenario"),
    variation: cell(row, map, "variation"),
    parent: cell(row, map, "parent"),
    source: cell(row, map, "source"),
    added: cell(row, map, "added"),
    fingerprint: fingerprint(question, answer, solution),
  };
}

export function isBlankRow(row: string[]): boolean {
  return row.every((c) => (c ?? "").trim() === "");
}

// ---------------------------------------------------------------------------
// Label resolution
// ---------------------------------------------------------------------------

/**
 * Resolve a free-text label ("Catalan numbers", "reflection principle") to a
 * slug, by slug, name, or alias. Returns null rather than guessing: an
 * unresolved label is exactly the case the daily review exists to decide.
 */
export function resolveLabel(label: string, metas: { slug: string; name: string; aliases: string[] }[]): string | null {
  const want = slugify(label);
  if (!want) return null;
  for (const m of metas) {
    if (m.slug === want || slugify(m.name) === want || m.aliases.some((a) => slugify(a) === want)) return m.slug;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Similarity
// ---------------------------------------------------------------------------

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

/** Jaccard overlap of content words. Crude, but only used to surface candidates for a human-grade review. */
export function similarity(a: string, b: string): number {
  const ta = tokens(a);
  const tb = tokens(b);
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  return inter / (ta.size + tb.size - inter);
}

export function nextProblemId(existing: string[]): string {
  let max = 0;
  for (const id of existing) {
    const m = id.match(/^QI-(\d+)$/);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return `QI-${String(max + 1).padStart(4, "0")}`;
}
