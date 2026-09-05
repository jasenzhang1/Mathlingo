import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Surveys the authored banks before writing an importer against them. */

const DIR = join(import.meta.dirname, "..", "..", "assessments");
const ITEM_ROW = /^\|\s*([RAET]\d+)\s*\|/;

const formats = new Map<string, number>();
const levels = new Map<string, number>();
let rows = 0;
let sections = 0;
let withVerified = 0;
let malformed = 0;
const columnCounts = new Map<number, number>();
const samples: string[] = [];

for (const file of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
  if (file === "README.md" || file === "bernoulli-binomial.md") continue;
  const lines = readFileSync(join(DIR, file), "utf8").split(/\r?\n/);

  for (const line of lines) {
    if (/^##\s+.*\(`[a-z0-9-]+`\)\s*$/.test(line)) sections++;
    if (!ITEM_ROW.test(line)) continue;
    rows++;

    // Split on pipes, dropping the empty leading/trailing fields.
    const cells = line.split("|").slice(1, -1).map((c) => c.trim());
    columnCounts.set(cells.length, (columnCounts.get(cells.length) ?? 0) + 1);

    if (cells.length < 7) {
      malformed++;
      if (samples.length < 3) samples.push(line.slice(0, 160));
      continue;
    }

    levels.set(cells[1]!, (levels.get(cells[1]!) ?? 0) + 1);
    formats.set(cells[2]!, (formats.get(cells[2]!) ?? 0) + 1);
    if (/\[verified/i.test(cells[4]!)) withVerified++;
  }
}

console.log(`concept sections: ${sections}`);
console.log(`item rows:        ${rows}`);
console.log(`with [verified]:  ${withVerified}`);
console.log(`malformed:        ${malformed}`);

console.log("\ncolumns per row:");
for (const [n, count] of [...columnCounts].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${n} columns: ${count}`);
}

console.log("\ncognitive levels:");
for (const [level, count] of [...levels].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${level.padEnd(14)} ${count}`);
}

console.log("\nformats:");
for (const [format, count] of [...formats].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${format.padEnd(14)} ${count}`);
}

if (samples.length) {
  console.log("\nmalformed samples:");
  for (const s of samples) console.log(`  ${s}`);
}
