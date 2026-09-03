import { items as seedItems } from "../src/data/items.ts";
import {
  buildRetrievalBrief,
  gatherCandidates,
  ingestCandidates,
} from "../src/lib/assessment/retrieval.ts";
import { auditCoverage } from "../src/lib/assessment/calibration.ts";
import { createWassermanAdapter } from "./wassermanAdapter.ts";

/**
 * CLI for a retrieval run.
 *
 *   node ingest.mjs --concept expectation --corpus "<path to PDF or extracted .txt>"
 *
 * Prints the brief, what the adapters returned, and what survived ingest. The
 * rejections are the interesting half: they are how you tell a thin corpus from
 * a broken parser.
 */

function arg(name: string, fallback?: string): string {
  const i = process.argv.indexOf(`--${name}`);
  const value = i >= 0 ? process.argv[i + 1] : undefined;
  if (value === undefined) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required --${name}`);
  }
  return value;
}

const conceptId = arg("concept");
const corpus = arg("corpus");
/**
 * Comma-separated extra search terms. Worth its own flag because it is the
 * single highest-leverage input to a retrieval run: a textbook exercise says
 * "Find E(X)", never "here is an expectation problem", so searching on the
 * concept's own title finds almost nothing.
 */
const aliases = arg("aliases", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const pool = seedItems.filter((i) => i.conceptId === conceptId);
const brief = buildRetrievalBrief(conceptId, pool, { aliases });

console.log(`\n=== BRIEF: ${brief.conceptTitle} (${brief.conceptId}) ===`);
console.log(`queries       : ${brief.queries.join(" | ")}`);
console.log(`allowed       : ${brief.allowedConcepts.length} concepts upstream`);
console.log(`downstream    : ${brief.downstreamConcepts.join(", ") || "(none)"}`);
console.log(`existing pool : ${pool.length} items`);
for (const need of brief.needs) {
  console.log(
    `  need ${need.count} x ${need.cognitive.padEnd(8)} difficulty [${need.difficultyBand[0].toFixed(2)}, ${need.difficultyBand[1].toFixed(2)}]`,
  );
}

const adapter = createWassermanAdapter({ path: corpus });
console.log(`\nadapter: ${adapter.describe()}`);

const candidates = await gatherCandidates(brief, [adapter]);
console.log(`\n=== ${candidates.length} CANDIDATES ===`);
for (const c of candidates.slice(0, 8)) {
  console.log(
    `\n[${c.source.locator}] ${c.cognitive}/${c.format}\n  ${c.stem.slice(0, 230)}${c.stem.length > 230 ? "…" : ""}`,
  );
}

const report = ingestCandidates(conceptId, candidates, pool);

console.log(`\n=== INGEST ===`);
console.log(`accepted: ${report.accepted.length}   rejected: ${report.rejected.length}`);
for (const item of report.accepted.slice(0, 6)) {
  console.log(
    `  + ${item.id.padEnd(34)} ${item.cognitive.padEnd(9)} b=${item.difficulty.toFixed(2)} status=${item.status} <- ${item.source.locator}`,
  );
}
const byReason = new Map<string, number>();
for (const r of report.rejected) byReason.set(r.reason, (byReason.get(r.reason) ?? 0) + 1);
for (const [reason, count] of byReason) console.log(`  - ${count} ${reason}`);
for (const r of report.rejected.slice(0, 3)) {
  console.log(`      e.g. [${r.reason}] ${r.detail.slice(0, 150)}`);
}

console.log(`\nremaining need: ${report.remainingNeed.map((n) => `${n.count}x${n.cognitive}`).join(", ") || "(brief satisfied)"}`);
console.log(`coverage after ingest:`, auditCoverage(conceptId, report.pool).notes);
