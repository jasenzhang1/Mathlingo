import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { concepts } from "../src/data/concepts.ts";
import { itemsByConcept } from "../src/data/items.ts";

/**
 * Answers one question: which concepts can actually be assessed today?
 *
 * Two banks exist and they are not the same thing:
 *   assessments/*.md   — authored question banks, prose. Human-readable design.
 *   web/src/data/items — the servable bank. Only these reach a learner.
 * A concept "has questions" in the first sense long before the app can quiz on it.
 */

const ROOT = join(import.meta.dirname, "..", "..");
const DIR = join(ROOT, "assessments");

/** conceptId -> number of authored questions under its section. */
const authored = new Map<string, number>();

/**
 * Cluster files use one table per concept, each row an item keyed R1/A1/E2/T1
 * (the cognitive level plus an index). The `bernoulli-binomial.md` pilot predates
 * that convention and groups items under "## 1. Recall" style headings instead,
 * so it is counted separately below.
 */
const ITEM_ROW = /^\|\s*[RAET]\d+\s*\|/;

for (const file of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
  const text = readFileSync(join(DIR, file), "utf8");
  const lines = text.split(/\r?\n/);

  let current: string | null = null;
  let matchedAnySection = false;

  for (const line of lines) {
    const heading = /^##\s+.*\(`([a-z0-9-]+)`\)\s*$/.exec(line);
    if (heading) {
      current = heading[1]!;
      matchedAnySection = true;
      if (!authored.has(current)) authored.set(current, 0);
      continue;
    }
    if (/^##\s/.test(line)) {
      current = null; // a non-concept section, e.g. "Cluster misconception index"
      continue;
    }
    if (current && ITEM_ROW.test(line)) {
      authored.set(current, authored.get(current)! + 1);
    }
  }

  // Pilot-format file: the whole file is one concept, named by the filename, and
  // items are bolded prose headers like "**R2. The four conditions.**" or
  // "**A2.1 Exact probability.**" rather than table rows.
  if (!matchedAnySection && file !== "README.md") {
    const conceptId = file.replace(/\.md$/, "");
    const count = lines.filter((l) => /^\*\*[RAET]\d+(\.\d+)?[.\s]/.test(l)).length;
    if (count > 0) authored.set(conceptId, (authored.get(conceptId) ?? 0) + count);
  }
}

const all = concepts.map((c) => c.id);
const withAuthored = all.filter((id) => (authored.get(id) ?? 0) > 0);
const withServable = all.filter((id) =>
  (itemsByConcept.get(id) ?? []).some((i) => i.status === "live" || i.status === "shadow"),
);

const pct = (n: number) => `${((n / all.length) * 100).toFixed(1)}%`;

console.log(`concepts in the map:            ${all.length}`);
console.log(`  with authored questions (md): ${withAuthored.length}  (${pct(withAuthored.length)})`);
console.log(`  with SERVABLE items (app):    ${withServable.length}  (${pct(withServable.length)})`);

console.log(`\nservable today:`);
for (const id of withServable) {
  const pool = itemsByConcept.get(id)!;
  const live = pool.filter((i) => i.status === "live").length;
  const levels = [...new Set(pool.map((i) => i.cognitive))].join("/");
  console.log(`  ${id.padEnd(28)} ${String(pool.length).padStart(2)} items (${live} live)  ${levels}`);
}

const totalQuestions = [...authored.values()].reduce((a, b) => a + b, 0);
console.log(`\nauthored questions in assessments/*.md: ${totalQuestions}`);

const missingAuthored = all.filter((id) => (authored.get(id) ?? 0) === 0);
if (missingAuthored.length) {
  console.log(`\nno authored questions found for ${missingAuthored.length} concepts:`);
  console.log("  " + missingAuthored.join(", "));
}

// Sections written for ids that are not in the concept map at all — either a
// typo in the markdown or a concept that was renamed after the bank was written.
const orphans = [...authored.keys()].filter((id) => !all.includes(id));
if (orphans.length) {
  console.log(`\nauthored sections with no matching concept id (${orphans.length}):`);
  console.log("  " + orphans.join(", "));
}

// The framework's own bar for a pool being adequate (assessment.md §4.3).
const MIN_LIVE = 8;
console.log(`\nservable pools below the MIN_LIVE_ITEMS=${MIN_LIVE} bar:`);
for (const id of withServable) {
  const live = (itemsByConcept.get(id) ?? []).filter((i) => i.status === "live").length;
  if (live < MIN_LIVE) console.log(`  ${id.padEnd(28)} ${live} live`);
}
