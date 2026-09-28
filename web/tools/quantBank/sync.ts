import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { concepts as graphConcepts } from "../../src/data/concepts.ts";
import {
  CONCEPT_COLUMNS,
  PROBLEM_COLUMNS,
  SCENARIO_COLUMNS,
  type ConceptMeta,
  type HeaderMap,
  type Problem,
  type ProblemKey,
  type ScenarioMeta,
  cell,
  defaultHeaders,
  isBlankRow,
  mapHeaders,
  nextProblemId,
  parseConcept,
  parseProblem,
  parseScenario,
  resolveLabel,
  similarity,
  slugify,
  tabTitles,
  toRow,
} from "./schema.ts";
import { type SheetStore, storeFromEnv } from "./sheets.ts";

/**
 * Daily sync between the quant-interview spreadsheet and the repo.
 *
 *   npm run quant:pull                 read the sheet, write .quant-sync/inbox.json
 *   npm run quant:apply [-- --dry-run] carry out .quant-sync/decisions.json
 *
 * The split is deliberate. Deciding which scenario a new problem belongs to,
 * whether "can't pass through (2,2)" is a new scenario or a variation of an
 * existing one, and whether the author's answer is actually right, is
 * judgement — that is the reviewer's job (Claude, following
 * `.claude/skills/quant-bank-sync/SKILL.md`). Everything mechanical — reading,
 * resolving labels that already match, assigning ids, moving rows, keeping the
 * repo mirror in step — lives here, and refuses to write anything if the
 * decisions do not validate against the sheet as it is *now*.
 */

const ROOT = join(import.meta.dirname, "..", "..", "..");
/** Where the repo copy of the bank lives. `--csv` runs mirror next to their CSVs instead. */
let MIRROR = join(ROOT, "assessments", "quant-interview");
const WORK = join(ROOT, ".quant-sync");
const INBOX_FILE = join(WORK, "inbox.json");
const DECISIONS_FILE = join(WORK, "decisions.json");

const SIMILAR_THRESHOLD = 0.3;

// ---------------------------------------------------------------------------
// Reading the sheet
// ---------------------------------------------------------------------------

interface Tab<K extends string> {
  title: string;
  map: HeaderMap<K>;
  /** Data rows (header excluded), with their data index, blank rows skipped. */
  rows: { index: number; row: string[] }[];
}

interface Snapshot {
  inbox: Tab<ProblemKey>;
  bank: Tab<ProblemKey>;
  conceptTab: Tab<keyof typeof CONCEPT_COLUMNS>;
  scenarioTab: Tab<keyof typeof SCENARIO_COLUMNS>;
  concepts: ConceptMeta[];
  scenarios: ScenarioMeta[];
  bankProblems: Problem[];
  inboxProblems: { index: number; problem: Problem; reviewNote: string }[];
}

async function readTab<K extends string>(
  store: SheetStore,
  title: string,
  spec: Record<K, readonly string[]>,
): Promise<Tab<K>> {
  const values = await store.read(title);
  const header = values[0] ?? [];
  return {
    title,
    map: mapHeaders(header, spec),
    rows: values
      .slice(1)
      .map((row, index) => ({ index, row }))
      .filter(({ row }) => !isBlankRow(row)),
  };
}

async function snapshot(store: SheetStore): Promise<Snapshot> {
  const titles = tabTitles();
  const [inbox, bank, conceptTab, scenarioTab] = await Promise.all([
    readTab(store, titles.inbox, PROBLEM_COLUMNS),
    readTab(store, titles.bank, PROBLEM_COLUMNS),
    readTab(store, titles.concepts, CONCEPT_COLUMNS),
    readTab(store, titles.scenarios, SCENARIO_COLUMNS),
  ]);
  return {
    inbox,
    bank,
    conceptTab,
    scenarioTab,
    concepts: conceptTab.rows.map(({ row }) => parseConcept(row, conceptTab.map)).filter((c) => c.slug),
    scenarios: scenarioTab.rows.map(({ row }) => parseScenario(row, scenarioTab.map)).filter((s) => s.slug),
    bankProblems: bank.rows.map(({ row }) => parseProblem(row, bank.map)),
    inboxProblems: inbox.rows.map(({ index, row }) => ({
      index,
      problem: parseProblem(row, inbox.map),
      reviewNote: cell(row, inbox.map, "review_note"),
    })),
  };
}

/** Structural problems in the sheet itself, independent of today's inbox. */
function lint(s: Snapshot): string[] {
  const out: string[] = [];
  const dupes = (xs: string[], what: string) => {
    const seen = new Set<string>();
    for (const x of xs) {
      if (seen.has(x)) out.push(`duplicate ${what}: ${x}`);
      seen.add(x);
    }
  };
  dupes(s.concepts.map((c) => c.slug), "concept slug");
  dupes(s.scenarios.map((c) => c.slug), "scenario slug");
  dupes(s.bankProblems.map((p) => p.id).filter(Boolean), "problem id");

  for (const key of ["question", "answer", "solution", "concepts", "scenario"] as const) {
    if (s.inbox.map.headers.length && s.inbox.map.index[key] === undefined) {
      out.push(`"${s.inbox.title}" has no "${key}" column (headers: ${s.inbox.map.headers.join(", ")})`);
    }
  }

  const conceptSlugs = new Set(s.concepts.map((c) => c.slug));
  const scenarioSlugs = new Set(s.scenarios.map((c) => c.slug));
  const ids = new Set(s.bankProblems.map((p) => p.id));
  const graph = new Set(graphConcepts.map((c) => c.id));
  for (const p of s.bankProblems) {
    if (!p.id) out.push(`bank row with no id: "${p.question.slice(0, 60)}"`);
    for (const c of p.concepts) if (!conceptSlugs.has(c)) out.push(`${p.id}: unknown concept "${c}"`);
    if (p.scenario && !scenarioSlugs.has(p.scenario)) out.push(`${p.id}: unknown scenario "${p.scenario}"`);
    if (p.parent && !ids.has(p.parent)) out.push(`${p.id}: parent ${p.parent} is not in the bank`);
  }
  for (const sc of s.scenarios) {
    if (sc.parent && !scenarioSlugs.has(sc.parent)) out.push(`scenario ${sc.slug}: unknown parent "${sc.parent}"`);
  }
  for (const c of s.concepts) {
    for (const g of c.graphConcepts) if (!graph.has(g)) out.push(`concept ${c.slug}: "${g}" is not a concepts.ts id`);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Mirror
// ---------------------------------------------------------------------------

function writeIfChanged(path: string, text: string): boolean {
  if (existsSync(path) && readFileSync(path, "utf8") === text) return false;
  writeFileSync(path, text);
  return true;
}

/**
 * The repo copy of the bank. Rewritten from the sheet on every run, so hand
 * edits made directly in the "Question Bank" tab land in git the next day too.
 */
function writeMirror(s: Snapshot): string[] {
  mkdirSync(MIRROR, { recursive: true });
  const json = (x: unknown) => JSON.stringify(x, null, 2) + "\n";
  const bank = [...s.bankProblems].sort((a, b) => a.id.localeCompare(b.id));
  const changed: string[] = [];
  const files: [string, unknown][] = [
    ["bank.json", bank],
    ["concepts.json", [...s.concepts].sort((a, b) => a.slug.localeCompare(b.slug))],
    ["scenarios.json", [...s.scenarios].sort((a, b) => a.slug.localeCompare(b.slug))],
  ];
  for (const [name, data] of files) if (writeIfChanged(join(MIRROR, name), json(data))) changed.push(name);
  return changed;
}

// ---------------------------------------------------------------------------
// pull
// ---------------------------------------------------------------------------

interface InboxEntry {
  row: number;
  fingerprint: string;
  question: string;
  answer: string;
  solution: string;
  difficultyRaw: string;
  difficulty: number;
  conceptLabels: { label: string; slug: string | null }[];
  scenarioLabel: { label: string; slug: string | null };
  variation: string;
  parent: string;
  source: string;
  issues: string[];
  existingReviewNote: string;
  alreadyInBank: string | null;
  similarBank: { id: string; score: number; scenario: string; variation: string; question: string }[];
  scenarioSuggestions: { slug: string; score: number }[];
}

async function pull(store: SheetStore) {
  const s = await snapshot(store);
  const warnings = lint(s);
  const byFingerprint = new Map(s.bankProblems.map((p) => [p.fingerprint, p.id]));

  const entries: InboxEntry[] = s.inboxProblems.map(({ index, problem: p, reviewNote }) => {
    const raw = s.inbox.rows.find((r) => r.index === index)!.row;
    const issues: string[] = [];
    if (!p.question) issues.push("no question");
    if (!p.answer) issues.push("no answer");
    if (!p.solution) issues.push("no solution");
    const difficultyRaw = cell(raw, s.inbox.map, "difficulty");
    if (!p.difficulty) issues.push(difficultyRaw ? `unreadable difficulty "${difficultyRaw}"` : "no difficulty");

    const scenarioSuggestions = s.scenarios
      .map((sc) => ({ slug: sc.slug, score: similarity(p.question, `${sc.name} ${sc.setup} ${sc.aliases.join(" ")}`) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => ({ ...x, score: Number(x.score.toFixed(2)) }));

    const similarBank = s.bankProblems
      .map((b) => ({ b, score: similarity(p.question, b.question) }))
      .filter((x) => x.score >= SIMILAR_THRESHOLD)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ b, score }) => ({
        id: b.id,
        score: Number(score.toFixed(2)),
        scenario: b.scenario,
        variation: b.variation,
        question: b.question,
      }));

    return {
      row: index + 2,
      fingerprint: p.fingerprint,
      question: p.question,
      answer: p.answer,
      solution: p.solution,
      difficultyRaw,
      difficulty: p.difficulty,
      conceptLabels: p.concepts.map((label) => ({ label, slug: resolveLabel(label, s.concepts) })),
      scenarioLabel: { label: p.scenario, slug: p.scenario ? resolveLabel(p.scenario, s.scenarios) : null },
      variation: p.variation,
      parent: p.parent,
      source: p.source,
      issues,
      existingReviewNote: reviewNote,
      alreadyInBank: byFingerprint.get(p.fingerprint) ?? null,
      similarBank,
      scenarioSuggestions,
    };
  });

  // Every problem already filed under a scenario this inbox touches — the
  // family a new variation has to be placed in, and checked against.
  const touched = new Set<string>();
  for (const e of entries) {
    if (e.scenarioLabel.slug) touched.add(e.scenarioLabel.slug);
    for (const sug of e.scenarioSuggestions) touched.add(sug.slug);
    for (const sim of e.similarBank) if (sim.scenario) touched.add(sim.scenario);
  }
  const families = Object.fromEntries(
    [...touched].sort().map((slug) => [
      slug,
      s.bankProblems
        .filter((p) => p.scenario === slug)
        .map((p) => ({ id: p.id, variation: p.variation, parent: p.parent, difficulty: p.difficulty, question: p.question })),
    ]),
  );

  mkdirSync(WORK, { recursive: true });
  writeFileSync(
    INBOX_FILE,
    JSON.stringify(
      {
        pulledAt: new Date().toISOString(),
        source: store.describe(),
        warnings,
        concepts: s.concepts,
        scenarios: s.scenarios,
        families,
        entries,
        bankSize: s.bankProblems.length,
        nextId: nextProblemId(s.bankProblems.map((p) => p.id)),
      },
      null,
      2,
    ) + "\n",
  );
  const mirrored = writeMirror(s);

  console.log(`Read ${store.describe()}`);
  console.log(
    `  bank ${s.bankProblems.length} · concepts ${s.concepts.length} · scenarios ${s.scenarios.length} · new ${entries.length}`,
  );
  for (const w of warnings) console.log(`  ! ${w}`);
  for (const e of entries) {
    const unresolved = [
      ...e.conceptLabels.filter((c) => !c.slug).map((c) => `concept "${c.label}"`),
      ...(e.scenarioLabel.slug ? [] : [`scenario "${e.scenarioLabel.label || "(blank)"}"`]),
    ];
    const flags = [
      e.alreadyInBank && `already in bank as ${e.alreadyInBank}`,
      e.similarBank[0] && `closest ${e.similarBank[0].id} (${e.similarBank[0].score})`,
      ...e.issues,
      unresolved.length && `unresolved ${unresolved.join(", ")}`,
    ].filter(Boolean);
    console.log(`  row ${e.row} [${e.fingerprint}] ${e.question.slice(0, 70)}${flags.length ? `\n      ${flags.join(" · ")}` : ""}`);
  }
  console.log(`Wrote ${INBOX_FILE}`);
  if (mirrored.length) console.log(`Mirror updated: ${mirrored.join(", ")}`);
}

// ---------------------------------------------------------------------------
// apply
// ---------------------------------------------------------------------------

interface Decisions {
  newConcepts?: {
    slug: string;
    name: string;
    description?: string;
    aliases?: string[];
    graphConcepts?: string[];
  }[];
  newScenarios?: {
    slug: string;
    name: string;
    setup: string;
    levers?: string[];
    aliases?: string[];
    parent?: string;
  }[];
  /**
   * Extend an existing scenario: a newly seen way of varying it, or another
   * name the author used for it (so the label resolves by itself next time).
   */
  scenarioUpdates?: { slug: string; addLevers?: string[]; addAliases?: string[] }[];
  problems: (
    | {
        fingerprint: string;
        action: "ingest";
        concepts: string[];
        scenario: string;
        variation?: string;
        /** A bank id, or "fp:<fingerprint>" for another problem ingested in this same run. */
        parent?: string;
        /** Only when the sheet's value is blank or unreadable. */
        difficulty?: number;
      }
    | { fingerprint: string; action: "hold"; note: string }
  )[];
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function ensureColumns<K extends string>(
  store: SheetStore,
  tab: Tab<K>,
  spec: Record<K, readonly string[]>,
  keys: K[],
  dryRun: boolean,
) {
  if (tab.map.headers.length === 0) {
    const header = defaultHeaders(spec);
    if (!dryRun) await store.writeHeader(tab.title, header);
    tab.map = mapHeaders(header, spec);
    return;
  }
  for (const key of keys) {
    if (tab.map.index[key] !== undefined) continue;
    const col = tab.map.headers.length;
    if (!dryRun) await store.setCell(tab.title, -1, col, spec[key][0]);
    tab.map.headers.push(spec[key][0]);
    tab.map.index[key] = col;
  }
}

async function apply(store: SheetStore, decisionsPath: string, dryRun: boolean) {
  const d = JSON.parse(readFileSync(decisionsPath, "utf8")) as Decisions;
  const s = await snapshot(store);
  const errors: string[] = [];
  const today = new Date().toISOString().slice(0, 10);

  // --- metadata -----------------------------------------------------------
  const conceptSlugs = new Set(s.concepts.map((c) => c.slug));
  const scenarioSlugs = new Set(s.scenarios.map((c) => c.slug));
  const graph = new Set(graphConcepts.map((c) => c.id));
  for (const c of d.newConcepts ?? []) {
    if (!SLUG.test(c.slug)) errors.push(`new concept slug "${c.slug}" is not kebab-case`);
    if (conceptSlugs.has(c.slug)) errors.push(`new concept "${c.slug}" already exists`);
    if (!c.name) errors.push(`new concept "${c.slug}" has no name`);
    for (const g of c.graphConcepts ?? []) if (!graph.has(g)) errors.push(`new concept ${c.slug}: "${g}" is not a concepts.ts id`);
    conceptSlugs.add(c.slug);
  }
  for (const sc of d.newScenarios ?? []) {
    if (!SLUG.test(sc.slug)) errors.push(`new scenario slug "${sc.slug}" is not kebab-case`);
    if (scenarioSlugs.has(sc.slug)) errors.push(`new scenario "${sc.slug}" already exists`);
    if (!sc.name || !sc.setup) errors.push(`new scenario "${sc.slug}" needs a name and a setup`);
    scenarioSlugs.add(sc.slug);
  }
  for (const sc of d.newScenarios ?? []) {
    if (sc.parent && !scenarioSlugs.has(sc.parent)) errors.push(`new scenario ${sc.slug}: unknown parent "${sc.parent}"`);
  }
  for (const u of d.scenarioUpdates ?? []) {
    if (!s.scenarios.some((sc) => sc.slug === u.slug)) errors.push(`scenarioUpdates: unknown scenario "${u.slug}"`);
  }

  // --- problems -----------------------------------------------------------
  const inboxByFp = new Map(s.inboxProblems.map((x) => [x.problem.fingerprint, x]));
  const bankByFp = new Map(s.bankProblems.map((p) => [p.fingerprint, p.id]));
  const bankIds = new Set(s.bankProblems.map((p) => p.id));
  const usedIds = s.bankProblems.map((p) => p.id);
  const idForFp = new Map<string, string>();
  const decided = new Set<string>();

  type Ingest = Extract<Decisions["problems"][number], { action: "ingest" }>;
  const ingests: { dec: Ingest; index: number; problem: Problem }[] = [];
  const holds: { index: number; note: string }[] = [];
  const alreadyBanked: { index: number; id: string }[] = [];
  const skipped: string[] = [];

  for (const dec of d.problems) {
    if (decided.has(dec.fingerprint)) errors.push(`${dec.fingerprint}: decided twice`);
    decided.add(dec.fingerprint);
    const hit = inboxByFp.get(dec.fingerprint);
    if (!hit) {
      // Edited or removed since the pull. Leave it for tomorrow rather than guess.
      skipped.push(dec.fingerprint);
      continue;
    }
    if (dec.action === "hold") {
      if (!dec.note?.trim()) errors.push(`${dec.fingerprint}: hold needs a note`);
      holds.push({ index: hit.index, note: dec.note });
      continue;
    }
    const banked = bankByFp.get(dec.fingerprint);
    if (banked) {
      alreadyBanked.push({ index: hit.index, id: banked });
      continue;
    }
    const p = hit.problem;
    const where = `row ${hit.index + 2} [${dec.fingerprint}]`;
    if (!p.question || !p.answer || !p.solution) errors.push(`${where}: question, answer and solution are all required to ingest`);
    if (!dec.concepts?.length) errors.push(`${where}: no concepts`);
    for (const c of dec.concepts ?? []) if (!conceptSlugs.has(c)) errors.push(`${where}: unknown concept "${c}"`);
    if (!scenarioSlugs.has(dec.scenario)) errors.push(`${where}: unknown scenario "${dec.scenario}"`);
    const difficulty = p.difficulty || dec.difficulty || 0;
    if (!(difficulty >= 1 && difficulty <= 5)) errors.push(`${where}: difficulty must be 1-5`);
    if (dec.difficulty && p.difficulty && dec.difficulty !== p.difficulty) {
      errors.push(`${where}: the sheet already says difficulty ${p.difficulty}; hold with a note to propose a change`);
    }
    const id = nextProblemId(usedIds);
    usedIds.push(id);
    idForFp.set(dec.fingerprint, id);
    ingests.push({ dec, index: hit.index, problem: { ...p, difficulty } });
  }

  const resolveParent = (parent: string | undefined, where: string): string => {
    if (!parent) return "";
    if (parent.startsWith("fp:")) {
      const id = idForFp.get(parent.slice(3));
      if (!id) errors.push(`${where}: parent ${parent} is not ingested in this run`);
      return id ?? "";
    }
    if (!bankIds.has(parent)) errors.push(`${where}: parent ${parent} is not in the bank`);
    return parent;
  };
  const bankRows = ingests.map(({ dec, problem, index }) => ({
    id: idForFp.get(dec.fingerprint)!,
    question: problem.question,
    answer: problem.answer,
    solution: problem.solution,
    difficulty: String(problem.difficulty),
    concepts: dec.concepts.join(", "),
    scenario: dec.scenario,
    variation: dec.variation ?? problem.variation,
    parent: resolveParent(dec.parent ?? problem.parent, `row ${index + 2}`),
    source: problem.source,
    added: today,
  }));

  if (errors.length) {
    console.error("Decisions do not validate; nothing was written:");
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  // --- writes, safest order first ----------------------------------------
  // Metadata before problems (so the bank never references a missing slug),
  // and the bank append before the inbox delete (so a crash in between leaves
  // a duplicate that tomorrow's pull recognises by fingerprint, never a loss).
  const tag = dryRun ? "[dry run] would" : "";
  const log = (msg: string) => console.log(`${tag ? `${tag} ` : ""}${msg}`);

  if (d.newConcepts?.length) {
    await ensureColumns(store, s.conceptTab, CONCEPT_COLUMNS, ["slug", "name", "description", "aliases", "graph_concepts"], dryRun);
    const rows = d.newConcepts.map((c) =>
      toRow(s.conceptTab.map, {
        slug: c.slug,
        name: c.name,
        description: c.description ?? "",
        aliases: (c.aliases ?? []).join(", "),
        graph_concepts: (c.graphConcepts ?? []).join(", "),
      }),
    );
    if (!dryRun) await store.append(s.conceptTab.title, rows);
    log(`add concepts: ${d.newConcepts.map((c) => c.slug).join(", ")}`);
  }
  if (d.newScenarios?.length) {
    await ensureColumns(store, s.scenarioTab, SCENARIO_COLUMNS, ["slug", "name", "setup", "levers", "aliases", "parent"], dryRun);
    const rows = d.newScenarios.map((sc) =>
      toRow(s.scenarioTab.map, {
        slug: sc.slug,
        name: sc.name,
        setup: sc.setup,
        levers: (sc.levers ?? []).join(", "),
        aliases: (sc.aliases ?? []).join(", "),
        parent: sc.parent ?? "",
      }),
    );
    if (!dryRun) await store.append(s.scenarioTab.title, rows);
    log(`add scenarios: ${d.newScenarios.map((sc) => sc.slug).join(", ")}`);
  }
  if (d.scenarioUpdates?.length) {
    await ensureColumns(store, s.scenarioTab, SCENARIO_COLUMNS, ["levers", "aliases"], dryRun);
    for (const u of d.scenarioUpdates) {
      const at = s.scenarioTab.rows.find(({ row }) => parseScenario(row, s.scenarioTab.map).slug === u.slug)!;
      const current = parseScenario(at.row, s.scenarioTab.map);
      for (const [key, have, add] of [
        ["levers", current.levers, u.addLevers ?? []],
        ["aliases", current.aliases, u.addAliases ?? []],
      ] as const) {
        const fresh = add.filter((x, i) => !have.some((h) => slugify(h) === slugify(x)) && add.indexOf(x) === i);
        if (fresh.length === 0) continue;
        const merged = [...have, ...fresh].join(", ");
        if (!dryRun) await store.setCell(s.scenarioTab.title, at.index, s.scenarioTab.map.index[key]!, merged);
        log(`extend ${key} of ${u.slug}: ${fresh.join(", ")}`);
      }
    }
  }

  if (bankRows.length) {
    await ensureColumns(store, s.bank, PROBLEM_COLUMNS, Object.keys(PROBLEM_COLUMNS).filter((k) => k !== "review_note") as ProblemKey[], dryRun);
    if (!dryRun) await store.append(s.bank.title, bankRows.map((r) => toRow(s.bank.map, r)));
    for (const r of bankRows) log(`bank ${r.id} · ${r.scenario}${r.variation ? ` / ${r.variation}` : ""} · ${r.question.slice(0, 60)}`);
  }

  if (holds.length) {
    await ensureColumns(store, s.inbox, PROBLEM_COLUMNS, ["review_note"], dryRun);
    const col = s.inbox.map.index.review_note!;
    for (const h of holds) {
      const note = `[${today}] ${h.note.trim()}`;
      if (!dryRun) await store.setCell(s.inbox.title, h.index, col, note);
      log(`hold row ${h.index + 2}: ${note}`);
    }
  }

  const remove = [...ingests.map((x) => x.index), ...alreadyBanked.map((x) => x.index)];
  if (remove.length) {
    if (!dryRun) await store.deleteRows(s.inbox.title, remove);
    log(`remove ${remove.length} row(s) from "${s.inbox.title}"`);
  }
  for (const a of alreadyBanked) console.log(`row ${a.index + 2} was already in the bank as ${a.id}; removed from inbox`);
  for (const fp of skipped) console.log(`skipped ${fp}: not in the inbox any more (edited or removed since pull)`);
  const undecided = s.inboxProblems.filter((x) => !decided.has(x.problem.fingerprint));
  for (const u of undecided) console.log(`row ${u.index + 2} [${u.problem.fingerprint}] has no decision; left in place`);

  if (!dryRun) {
    const changed = writeMirror(await snapshot(store));
    if (changed.length) console.log(`Mirror updated: ${changed.join(", ")}`);
  }
}

// ---------------------------------------------------------------------------

async function main() {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: {
      csv: { type: "string" },
      decisions: { type: "string" },
      "dry-run": { type: "boolean", default: false },
    },
  });
  const [command] = positionals;
  const store = storeFromEnv(process.env, values.csv);
  if (values.csv) MIRROR = join(values.csv, "_mirror");
  if (command === "pull") return pull(store);
  if (command === "apply") return apply(store, values.decisions ?? DECISIONS_FILE, values["dry-run"]!);
  console.error("usage: sync.ts pull|apply [--csv <dir>] [--decisions <file>] [--dry-run]");
  process.exit(2);
}

main().catch((e: unknown) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
