import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";
import {
  CONCEPT_COLUMNS,
  FAMILY_COLUMNS,
  PROBLEM_COLUMNS,
  type CellValue,
  type Family,
  type HeaderMap,
  type Problem,
  type ProblemKey,
  type Section,
  cell,
  defaultHeaders,
  isBlankRow,
  joinTags,
  mapHeaders,
  parseFamily,
  parseProblem,
  parseSection,
  sameName,
  similarity,
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
 * The split is deliberate. Choosing a problem's section and family, and
 * deciding whether the author's answer is actually right, is judgement — the
 * reviewer's job (Claude, following `.claude/skills/quant-bank-sync/SKILL.md`).
 * Reading, matching, moving rows and keeping the repo mirror in step is
 * mechanical and lives here, and nothing is written unless every decision
 * validates against the sheet as it is *now*.
 *
 * Two kinds of row are up for review:
 *   - every row of `New Questions`, which moves to the bank once filed;
 *   - `Question Bank` rows with a question but no Section — problems added to
 *     the bank directly. These are labelled in place; only blank cells are
 *     ever filled.
 */

const ROOT = join(import.meta.dirname, "..", "..", "..");
/** Where the repo copy of the bank lives. `--csv` runs mirror next to their CSVs instead. */
let MIRROR = join(ROOT, "assessments", "quant-interview");
const WORK = join(ROOT, ".quant-sync");
const INBOX_FILE = join(WORK, "inbox.json");
const DECISIONS_FILE = join(WORK, "decisions.json");

const SIMILAR_MIN = 0.2;

// ---------------------------------------------------------------------------
// Reading the sheet
// ---------------------------------------------------------------------------

interface Tab<K extends string> {
  title: string;
  map: HeaderMap<K>;
  /** Data rows (header excluded) with their data index; blank rows skipped. */
  rows: { index: number; row: string[] }[];
  exists: boolean;
}

type Location = "inbox" | "bank";

interface Candidate {
  location: Location;
  index: number;
  problem: Problem;
  reviewNote: string;
}

interface Snapshot {
  inbox: Tab<ProblemKey>;
  bank: Tab<ProblemKey>;
  conceptTab: Tab<keyof typeof CONCEPT_COLUMNS>;
  familyTab: Tab<keyof typeof FAMILY_COLUMNS>;
  sections: Section[];
  families: Family[];
  bankProblems: { index: number; problem: Problem }[];
  candidates: Candidate[];
}

async function readTab<K extends string>(
  store: SheetStore,
  title: string,
  spec: Record<K, readonly string[]>,
): Promise<Tab<K>> {
  let values: string[][];
  let exists = true;
  try {
    values = await store.read(title);
  } catch (e) {
    if (!(e instanceof Error && e.message.startsWith("No tab named"))) throw e;
    values = [];
    exists = false;
  }
  return {
    title,
    exists,
    map: mapHeaders(values[0] ?? [], spec),
    rows: values
      .slice(1)
      .map((row, index) => ({ index, row }))
      .filter(({ row }) => !isBlankRow(row)),
  };
}

async function snapshot(store: SheetStore): Promise<Snapshot> {
  const titles = tabTitles();
  const [inbox, bank, conceptTab, familyTab] = await Promise.all([
    readTab(store, titles.inbox, PROBLEM_COLUMNS),
    readTab(store, titles.bank, PROBLEM_COLUMNS),
    readTab(store, titles.concepts, CONCEPT_COLUMNS),
    readTab(store, titles.families, FAMILY_COLUMNS),
  ]);
  const bankProblems = bank.rows.map(({ index, row }) => ({ index, problem: parseProblem(row, bank.map) }));
  const candidates: Candidate[] = [
    ...inbox.rows.map(({ index, row }) => ({
      location: "inbox" as const,
      index,
      problem: parseProblem(row, inbox.map),
      reviewNote: cell(row, inbox.map, "review_note"),
    })),
    ...bank.rows
      .filter(({ row }) => cell(row, bank.map, "question") && !cell(row, bank.map, "section"))
      .map(({ index, row }) => ({
        location: "bank" as const,
        index,
        problem: parseProblem(row, bank.map),
        reviewNote: cell(row, bank.map, "review_note"),
      })),
  ];
  return {
    inbox,
    bank,
    conceptTab,
    familyTab,
    sections: conceptTab.rows.flatMap(({ row }) => parseSection(row, conceptTab.map) ?? []),
    families: familyTab.rows.flatMap(({ row }) => parseFamily(row, familyTab.map) ?? []),
    bankProblems,
    candidates,
  };
}

const sheetRow = (index: number) => index + 2;
const label = (s: Section) => `${s.section} · ${s.topic} › ${s.subtopic}`;
const short = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

function findFamily(families: Family[], name: string): Family | undefined {
  return families.find((f) => f.category === name) ?? families.find((f) => sameName(f.category, name));
}

/**
 * Structural problems already in the sheet, grouped so a thousand-row bank
 * yields a readable list rather than a wall. Reported, never auto-fixed:
 * several of these are the author's call (is 231 "Recursion" or "Recursion
 * (Characteristic Polynomial)"?).
 */
function lint(s: Snapshot): { check: string; count: number; examples: string[] }[] {
  const groups = new Map<string, Map<string, number>>();
  const add = (check: string, example: string) => {
    const g = groups.get(check) ?? new Map<string, number>();
    g.set(example, (g.get(example) ?? 0) + 1);
    groups.set(check, g);
  };

  for (const [tab, keys] of [
    [s.inbox, ["question", "answer", "solution", "difficulty"]],
    [s.bank, ["section", "topic", "subtopic", "question", "answer", "solution", "family", "family_num"]],
  ] as const) {
    if (!tab.exists) add("missing tab", tab.title);
    else for (const k of keys) if (tab.map.index[k] === undefined) add(`"${tab.title}" has no column for`, k);
  }

  const bySection = new Map<number, Section[]>();
  for (const sec of s.sections) bySection.set(sec.section, [...(bySection.get(sec.section) ?? []), sec]);
  for (const [n, secs] of bySection) {
    if (secs.length > 1) add("section number used twice in Classifications", `${n}: ${secs.map((x) => x.subtopic).join(" / ")}`);
  }
  for (const f of s.families) if (f.number === null) add("family with no Number", f.category);

  const seen = new Map<string, number>();
  for (const { index, problem: p } of s.bankProblems) {
    if (!p.question) continue;
    const dup = seen.get(p.fingerprint);
    if (dup !== undefined) add("exact duplicate rows in bank", `rows ${sheetRow(dup)} and ${sheetRow(index)}`);
    seen.set(p.fingerprint, index);

    if (p.section !== null) {
      const secs = bySection.get(p.section);
      if (!secs) add("bank Section not in Classifications", String(p.section));
      else if (!secs.some((x) => x.topic.trim() === p.topic.trim() && x.subtopic.trim() === p.subtopic.trim())) {
        add(
          "bank Topic/Subtopic differs from Classifications",
          `${p.section}: "${p.topic.trim()} › ${p.subtopic}" vs "${secs.map((x) => `${x.topic.trim()} › ${x.subtopic}`).join(" / ")}"`,
        );
      }
    }
    if (p.family) {
      const f = findFamily(s.families, p.family);
      if (!f) add("bank Family not in Category Classifications", p.family);
      else if (p.familyNum === null) add("bank Family with no Family Num", p.family);
      else if (f.number !== null && f.number !== p.familyNum) add("bank Family Num differs from Category Classifications", `${p.family}: ${p.familyNum} vs ${f.number}`);
    }
  }

  return [...groups].map(([check, g]) => ({
    check,
    count: [...g.values()].reduce((a, b) => a + b, 0),
    examples: [...g]
      .sort((a, b) => b[1] - a[1])
      .map(([ex, n]) => (n > 1 ? `${ex} (×${n})` : ex)),
  }));
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
 * The repo copy. Rewritten from the sheet on every run, in sheet order, so
 * hand edits anywhere in the workbook land in git the next day too.
 */
function writeMirror(s: Snapshot): string[] {
  mkdirSync(MIRROR, { recursive: true });
  const json = (x: unknown) => JSON.stringify(x, null, 1) + "\n";
  const changed: string[] = [];
  const files: [string, unknown][] = [
    ["bank.json", s.bankProblems.filter(({ problem }) => problem.question).map(({ problem }) => problem)],
    ["sections.json", s.sections],
    ["families.json", s.families],
  ];
  for (const [name, data] of files) if (writeIfChanged(join(MIRROR, name), json(data))) changed.push(name);
  return changed;
}

// ---------------------------------------------------------------------------
// pull
// ---------------------------------------------------------------------------

async function pull(store: SheetStore) {
  const s = await snapshot(store);
  const warnings = lint(s);
  const byFingerprint = new Map(
    s.bankProblems.filter(({ problem }) => problem.section !== null).map(({ index, problem }) => [problem.fingerprint, index]),
  );
  const filed = s.bankProblems.filter(({ problem }) => problem.question && problem.section !== null);
  const sectionOf = (n: number | null) => s.sections.filter((x) => x.section === n);

  const entries = s.candidates.map(({ location, index, problem: p, reviewNote }) => {
    const issues: string[] = [];
    if (!p.question) issues.push("no question");
    if (!p.answer) issues.push("no answer");
    if (!p.solution) issues.push("no solution (Notes)");
    if (p.difficulty === null) issues.push("no difficulty");

    const similar = filed
      .map(({ index: i, problem: b }) => ({ i, b, score: similarity(p.question, b.question) }))
      .filter((x) => x.score >= SIMILAR_MIN)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    // What the nearest filed problems were labelled — a starting point, not an answer.
    const tally = (keyOf: (b: Problem) => string) => {
      const votes = new Map<string, number>();
      for (const { b, score } of similar) {
        const k = keyOf(b);
        if (k) votes.set(k, (votes.get(k) ?? 0) + score);
      }
      return [...votes]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([k, w]) => ({ label: k, weight: Number(w.toFixed(2)) }));
    };

    const authorFamily = p.family ? findFamily(s.families, p.family) : undefined;
    return {
      location,
      row: sheetRow(index),
      fingerprint: p.fingerprint,
      question: p.question,
      answer: p.answer,
      solution: p.solution,
      difficulty: p.difficulty,
      instructional: p.instructional,
      tags: p.tags,
      source: p.source,
      author: {
        section: p.section,
        sectionKnown: p.section !== null ? sectionOf(p.section).map(label) : [],
        topic: p.topic,
        subtopic: p.subtopic,
        family: p.family,
        familyMatch: authorFamily?.category ?? null,
        familyNum: p.familyNum,
      },
      issues,
      existingReviewNote: reviewNote,
      alreadyInBank: location === "inbox" && byFingerprint.has(p.fingerprint) ? sheetRow(byFingerprint.get(p.fingerprint)!) : null,
      similar: similar.map(({ i, b, score }) => ({
        row: sheetRow(i),
        score: Number(score.toFixed(2)),
        section: sectionOf(b.section).map(label)[0] ?? String(b.section),
        family: b.family,
        difficulty: b.difficulty,
        question: short(b.question, 240),
      })),
      sectionVotes: tally((b) => (b.section === null ? "" : (sectionOf(b.section).map(label)[0] ?? String(b.section)))),
      familyVotes: tally((b) => b.family),
    };
  });

  // Every filed problem in each family a candidate might join: the set a new
  // problem has to be placed in, and checked against for duplicates.
  const touched = new Set<string>();
  for (const e of entries) {
    if (e.author.familyMatch) touched.add(e.author.familyMatch);
    for (const v of e.familyVotes) touched.add(v.label);
  }
  const families = Object.fromEntries(
    [...touched].sort().map((fam) => [
      fam,
      filed
        .filter(({ problem }) => problem.family && sameName(problem.family, fam))
        .map(({ index, problem }) => ({
          row: sheetRow(index),
          section: problem.section,
          difficulty: problem.difficulty,
          question: short(problem.question, 200),
        })),
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
        sections: s.sections.map((x) => ({ ...x, example: short(x.example, 200) })),
        families: s.families,
        familyMembers: families,
        entries,
        bankSize: filed.length,
      },
      null,
      1,
    ) + "\n",
  );
  const mirrored = writeMirror(s);

  const inboxCount = entries.filter((e) => e.location === "inbox").length;
  console.log(`Read ${store.describe()}`);
  console.log(
    `  bank ${filed.length} filed · sections ${s.sections.length} · families ${s.families.length}` +
      ` · to review: ${inboxCount} new + ${entries.length - inboxCount} unfiled in bank`,
  );
  if (warnings.length) console.log("Sheet warnings (not fixed automatically):");
  for (const w of warnings) {
    console.log(`  ! ${w.check}: ${w.count}`);
    for (const ex of w.examples.slice(0, 5)) console.log(`      ${ex}`);
    if (w.examples.length > 5) console.log(`      … ${w.examples.length - 5} more in inbox.json`);
  }
  for (const e of entries) {
    const flags = [
      e.alreadyInBank && `already in bank at row ${e.alreadyInBank}`,
      e.similar[0] && `closest row ${e.similar[0].row} (${e.similar[0].score})`,
      ...e.issues,
    ].filter(Boolean);
    console.log(`  ${e.location} row ${e.row} [${e.fingerprint}] ${short(e.question.replace(/\s+/g, " "), 70)}`);
    if (flags.length) console.log(`      ${flags.join(" · ")}`);
  }
  console.log(`Wrote ${INBOX_FILE}`);
  if (mirrored.length) console.log(`Mirror updated: ${mirrored.join(", ")}`);
}

// ---------------------------------------------------------------------------
// apply
// ---------------------------------------------------------------------------

interface Decisions {
  newSections?: { section: number; topic: string; subtopic: string; example?: string; notes?: string }[];
  newFamilies?: { category: string; number: number; meaning?: string }[];
  /** Fill in a family's Meaning. Only ever applied when the cell is blank. */
  familyMeanings?: { category: string; meaning: string }[];
  problems: (
    | {
        fingerprint: string;
        action: "file";
        section: number;
        /** Required only when the section number is shared by two Classifications rows. */
        subtopic?: string;
        /** Exact Category name; empty only when no family genuinely fits. */
        family: string;
        /** Final tag list. Omit to keep the author's tags. */
        tags?: string[];
        /** Only when the sheet's Difficulty is blank. */
        difficulty?: number;
      }
    | { fingerprint: string; action: "hold"; note: string }
  )[];
}

async function ensureColumns<K extends string>(
  store: SheetStore,
  tab: Tab<K>,
  spec: Record<K, readonly string[]>,
  keys: K[],
  dryRun: boolean,
  log: (msg: string) => void,
) {
  if (tab.map.headers.length === 0) {
    const header = defaultHeaders(spec);
    if (!dryRun) await store.writeHeader(tab.title, header);
    tab.map = mapHeaders(header, spec);
    log(`write header row in "${tab.title}"`);
    return;
  }
  for (const key of keys) {
    if (tab.map.index[key] !== undefined) continue;
    const col = tab.map.headers.length;
    if (!dryRun) await store.setCell(tab.title, -1, col, spec[key][0]);
    tab.map.headers.push(spec[key][0]);
    tab.map.index[key] = col;
    log(`add column "${spec[key][0]}" to "${tab.title}"`);
  }
}

/** Plain numbers go in as numbers, like the rest of the Answer column; anything else stays text. */
function answerCell(answer: string): CellValue {
  return /^-?\d+(\.\d+)?$/.test(answer) ? Number(answer) : answer;
}

async function apply(store: SheetStore, decisionsPath: string, dryRun: boolean) {
  const d = JSON.parse(readFileSync(decisionsPath, "utf8")) as Decisions;
  const s = await snapshot(store);
  const errors: string[] = [];
  const today = new Date().toISOString().slice(0, 10);
  const log = (msg: string) => console.log(dryRun ? `[dry run] would ${msg}` : msg);

  // --- metadata -----------------------------------------------------------
  const sections = [...s.sections];
  for (const n of d.newSections ?? []) {
    if (!Number.isInteger(n.section) || n.section <= 0) errors.push(`new section ${n.section}: must be a positive integer`);
    if (sections.some((x) => x.section === n.section)) errors.push(`new section ${n.section} is already used (${sections.filter((x) => x.section === n.section).map(label).join(" / ")})`);
    if (!n.topic || !n.subtopic) errors.push(`new section ${n.section}: needs a topic and a subtopic`);
    sections.push({ section: n.section, topic: n.topic, subtopic: n.subtopic, example: n.example ?? "", notes: n.notes ?? "" });
  }
  const families = [...s.families];
  for (const f of d.newFamilies ?? []) {
    if (findFamily(families, f.category)) errors.push(`new family "${f.category}" already exists as "${findFamily(families, f.category)!.category}"`);
    if (!Number.isInteger(f.number) || f.number <= 0) errors.push(`new family "${f.category}": number must be a positive integer`);
    families.push({ category: f.category, number: f.number, meaning: f.meaning ?? "" });
  }
  for (const m of d.familyMeanings ?? []) {
    const f = s.families.find((x) => x.category === m.category);
    if (!f) errors.push(`familyMeanings: no family named exactly "${m.category}"`);
    else if (f.meaning) errors.push(`familyMeanings: "${m.category}" already has a meaning; edit it in the sheet instead`);
  }

  // --- problems -----------------------------------------------------------
  const byFp = new Map<string, Candidate[]>();
  for (const c of s.candidates) byFp.set(c.problem.fingerprint, [...(byFp.get(c.problem.fingerprint) ?? []), c]);
  const bankFiled = new Set(s.bankProblems.filter(({ problem }) => problem.section !== null).map(({ problem }) => problem.fingerprint));
  const decided = new Set<string>();

  type File = Extract<Decisions["problems"][number], { action: "file" }>;
  const files: { dec: File; c: Candidate; sec: Section; fam: Family | undefined; difficulty: number | null }[] = [];
  const holds: { c: Candidate; note: string }[] = [];
  const staleInbox: Candidate[] = [];
  const skipped: string[] = [];

  for (const dec of d.problems) {
    if (decided.has(dec.fingerprint)) errors.push(`${dec.fingerprint}: decided twice`);
    decided.add(dec.fingerprint);
    const hits = byFp.get(dec.fingerprint) ?? [];
    if (hits.length === 0) {
      // Edited, filed or removed since the pull. Leave it for tomorrow rather than guess.
      skipped.push(dec.fingerprint);
      continue;
    }
    if (hits.length > 1) {
      errors.push(`${dec.fingerprint}: matches ${hits.length} identical rows (${hits.map((h) => `${h.location} ${sheetRow(h.index)}`).join(", ")}); delete the extra copies first`);
      continue;
    }
    const c = hits[0];
    const where = `${c.location} row ${sheetRow(c.index)} [${dec.fingerprint}]`;
    if (dec.action === "hold") {
      if (!dec.note?.trim()) errors.push(`${where}: hold needs a note`);
      holds.push({ c, note: dec.note });
      continue;
    }
    if (c.location === "inbox" && bankFiled.has(dec.fingerprint)) {
      staleInbox.push(c);
      continue;
    }
    const p = c.problem;
    if (!p.question || !p.answer || !p.solution) errors.push(`${where}: question, answer and notes are all required to file`);
    const matches = sections.filter((x) => x.section === dec.section);
    const sec = matches.length > 1 ? matches.find((x) => x.subtopic === dec.subtopic) : matches[0];
    if (matches.length === 0) errors.push(`${where}: section ${dec.section} is not in Classifications (add it under newSections)`);
    else if (!sec) errors.push(`${where}: section ${dec.section} is shared by ${matches.map((x) => `"${x.subtopic}"`).join(" and ")}; say which with "subtopic"`);
    const fam = dec.family ? families.find((f) => f.category === dec.family) : undefined;
    if (dec.family && !fam) errors.push(`${where}: family "${dec.family}" is not an exact Category name (or add it under newFamilies)`);
    if (fam && fam.number === null) errors.push(`${where}: family "${fam.category}" has no Number in Category Classifications`);
    if (p.difficulty !== null && dec.difficulty !== undefined && dec.difficulty !== p.difficulty) {
      errors.push(`${where}: the sheet already says difficulty ${p.difficulty}; hold with a note to propose a change`);
    }
    const difficulty = p.difficulty ?? dec.difficulty ?? null;
    if (difficulty === null && c.location === "inbox") errors.push(`${where}: no difficulty in the sheet or the decision`);
    if (sec) files.push({ dec, c, sec, fam, difficulty });
  }

  if (errors.length) {
    console.error("Decisions do not validate; nothing was written:");
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  // --- writes, safest order first ----------------------------------------
  // Metadata before problems (so no row names a section or family that does
  // not exist yet), and the bank append before the inbox delete (so a crash
  // in between leaves a copy tomorrow's pull recognises, never a loss).
  if (d.newSections?.length) {
    await ensureColumns(store, s.conceptTab, CONCEPT_COLUMNS, ["section", "topic", "subtopic", "example", "notes"], dryRun, log);
    const rows = d.newSections.map((n) => toRow(s.conceptTab.map, { section: n.section, topic: n.topic, subtopic: n.subtopic, example: n.example ?? "", notes: n.notes ?? "" }));
    if (!dryRun) await store.append(s.conceptTab.title, rows);
    log(`add sections: ${d.newSections.map((n) => `${n.section} ${n.topic} › ${n.subtopic}`).join("; ")}`);
  }
  if (d.newFamilies?.length) {
    await ensureColumns(store, s.familyTab, FAMILY_COLUMNS, ["category", "number", "meaning"], dryRun, log);
    const rows = d.newFamilies.map((f) => toRow(s.familyTab.map, { category: f.category, number: f.number, meaning: f.meaning ?? "" }));
    if (!dryRun) await store.append(s.familyTab.title, rows);
    log(`add families: ${d.newFamilies.map((f) => `${f.category} (${f.number})`).join("; ")}`);
  }
  if (d.familyMeanings?.length) {
    await ensureColumns(store, s.familyTab, FAMILY_COLUMNS, ["meaning"], dryRun, log);
    for (const m of d.familyMeanings) {
      const at = s.familyTab.rows.find(({ row }) => cell(row, s.familyTab.map, "category") === m.category)!;
      if (!dryRun) await store.setCell(s.familyTab.title, at.index, s.familyTab.map.index.meaning!, m.meaning);
      log(`set meaning of family "${m.category}": ${m.meaning}`);
    }
  }

  const labels = (x: (typeof files)[number]) => ({
    section: x.sec.section,
    topic: x.sec.topic,
    subtopic: x.sec.subtopic,
    tags: joinTags(x.dec.tags ?? x.c.problem.tags),
    family: x.fam?.category ?? "",
    family_num: x.fam?.number ?? "",
    difficulty: x.difficulty ?? "",
  });

  const fromInbox = files.filter((x) => x.c.location === "inbox");
  if (fromInbox.length) {
    const needed = Object.keys(PROBLEM_COLUMNS).filter((k) => k !== "review_note" && k !== "instructional") as ProblemKey[];
    await ensureColumns(store, s.bank, PROBLEM_COLUMNS, needed, dryRun, log);
    const rows = fromInbox.map((x) =>
      toRow(s.bank.map, {
        ...labels(x),
        question: x.c.problem.question,
        answer: answerCell(x.c.problem.answer),
        solution: x.c.problem.solution,
        instructional: x.c.problem.instructional,
        source: x.c.problem.source,
      }),
    );
    if (!dryRun) await store.append(s.bank.title, rows);
    for (const x of fromInbox) log(`file into bank: ${label(x.sec)} · ${x.fam?.category ?? "(no family)"} · ${short(x.c.problem.question, 60)}`);
  }

  // Unfiled bank rows are labelled in place, and only where the author left a
  // cell blank: a hand-typed Family or Tags is never overwritten.
  for (const x of files.filter((f) => f.c.location === "bank")) {
    const row = s.bank.rows.find((r) => r.index === x.c.index)!.row;
    const filled: string[] = [];
    for (const [key, value] of Object.entries(labels(x)) as [ProblemKey, CellValue][]) {
      const col = s.bank.map.index[key];
      if (col === undefined || value === "" || cell(row, s.bank.map, key)) continue;
      if (!dryRun) await store.setCell(s.bank.title, x.c.index, col, value);
      filled.push(key);
    }
    log(`label bank row ${sheetRow(x.c.index)}: ${label(x.sec)} · ${x.fam?.category ?? "(no family)"} (filled ${filled.join(", ") || "nothing"})`);
  }

  for (const loc of ["inbox", "bank"] as const) {
    const these = holds.filter((h) => h.c.location === loc);
    if (!these.length) continue;
    const tab = loc === "inbox" ? s.inbox : s.bank;
    await ensureColumns(store, tab, PROBLEM_COLUMNS, ["review_note"], dryRun, log);
    for (const h of these) {
      const note = `[${today}] ${h.note.trim()}`;
      if (!dryRun) await store.setCell(tab.title, h.c.index, tab.map.index.review_note!, note);
      log(`hold ${loc} row ${sheetRow(h.c.index)}: ${note}`);
    }
  }
  // A filed bank row's earlier hold note is resolved; clear it.
  for (const x of files.filter((f) => f.c.location === "bank" && f.c.reviewNote)) {
    if (!dryRun) await store.setCell(s.bank.title, x.c.index, s.bank.map.index.review_note!, "");
  }

  const remove = [...fromInbox.map((x) => x.c.index), ...staleInbox.map((c) => c.index)];
  if (remove.length) {
    if (!dryRun) await store.deleteRows(s.inbox.title, remove);
    log(`remove ${remove.length} filed row(s) from "${s.inbox.title}"`);
  }
  for (const c of staleInbox) console.log(`inbox row ${sheetRow(c.index)} was already filed in the bank; removed from inbox`);
  for (const fp of skipped) console.log(`skipped ${fp}: no longer in the sheet as pulled (edited, filed or removed since)`);
  for (const c of s.candidates.filter((x) => !decided.has(x.problem.fingerprint))) {
    console.log(`${c.location} row ${sheetRow(c.index)} [${c.problem.fingerprint}] has no decision; left as is`);
  }

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
  if (values.csv) {
    MIRROR = join(values.csv, "_mirror");
    rmSync(MIRROR, { recursive: true, force: true });
  }
  if (command === "pull") return pull(store);
  if (command === "apply") return apply(store, values.decisions ?? DECISIONS_FILE, values["dry-run"]!);
  console.error("usage: sync.ts pull|apply [--csv <dir>] [--decisions <file>] [--dry-run]");
  process.exit(2);
}

main().catch((e: unknown) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
