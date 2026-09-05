import { concepts } from "../src/data/concepts.ts";
import { loadItemBank } from "../src/data/items.ts";
import { routeGrader } from "../src/lib/assessment/router.ts";

/**
 * How much of the curriculum each subscription tier can actually be assessed on.
 *
 * Worth checking separately from raw coverage, because "every concept has items"
 * and "every concept has items a free user can answer" are very different
 * claims, and only the second one determines whether the free tier is a real
 * product. Open-response items need the paid grader, so a concept whose whole
 * pool is rubric-graded shows a free user an upgrade prompt and nothing else.
 */

const itemsByConcept = await loadItemBank();

const rows = concepts.map((concept) => {
  const pool = itemsByConcept.get(concept.id) ?? [];
  const deterministic = pool.filter((item) => routeGrader(item) !== "llm");
  return { concept, total: pool.length, free: deterministic.length };
});

const withAny = rows.filter((r) => r.total > 0).length;
const withFree = rows.filter((r) => r.free > 0).length;
const pct = (n: number) => `${((n / concepts.length) * 100).toFixed(1)}%`;

console.log(`concepts:                       ${concepts.length}`);
console.log(`  with any servable item:       ${withAny} (${pct(withAny)})`);
console.log(`  answerable on the free tier:  ${withFree} (${pct(withFree)})`);

const byDomain = new Map<string, { total: number; free: number }>();
for (const row of rows) {
  const entry = byDomain.get(row.concept.domain) ?? { total: 0, free: 0 };
  entry.total++;
  if (row.free > 0) entry.free++;
  byDomain.set(row.concept.domain, entry);
}

console.log("\nfree-tier coverage by domain:");
for (const [domain, { total, free }] of [...byDomain].sort()) {
  const bar = "█".repeat(Math.round((free / total) * 20)).padEnd(20, "·");
  console.log(`  ${domain.padEnd(22)} ${bar} ${free}/${total}`);
}

const starved = rows.filter((r) => r.total > 0 && r.free === 0);
console.log(`\n${starved.length} concepts have items, but none a free user can answer.`);
console.log("These show an upgrade prompt where an assessment should be.");
