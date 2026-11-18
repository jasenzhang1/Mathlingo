import { writeFileSync } from "node:fs";
import { loadItemBank } from "../src/data/items.ts";
import { sectionSpecs } from "../src/data/sections.ts";
import type { Domain } from "../src/data/concepts.ts";

/**
 * Dumps every servable item in one domain (optionally one section) to JSON,
 * grouped by section and concept — the input the `question-vetter` agent reads.
 *
 *   npx tsx tools/exportItems.ts <domain> [sectionId] [--out file.json]
 */
const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const out = outIdx >= 0 ? args.splice(outIdx, 2)[1] : undefined;
const [domain, sectionId] = args as [Domain, string | undefined];
const sections = sectionSpecs[domain];
if (!sections) {
  console.error(`Unknown domain "${domain}". Known: ${Object.keys(sectionSpecs).join(", ")}`);
  process.exit(1);
}
const bank = await loadItemBank();
const result = sections
  .filter((s) => !sectionId || s.id === sectionId)
  .map((s) => ({
    section: s.id,
    label: s.label,
    concepts: s.conceptIds.map((c) => ({ conceptId: c, items: bank.get(c) ?? [] })),
  }));
const json = JSON.stringify(result, null, 1);
if (out) writeFileSync(out, json);
else console.log(json);
const n = result.flatMap((s) => s.concepts).reduce((a, c) => a + c.items.length, 0);
console.error(`${n} items across ${result.length} section(s)`);
