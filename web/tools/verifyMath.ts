import katex from "katex";
import { splitMath } from "../src/lib/wiki/inlineMath.ts";
import { concepts } from "../src/data/concepts.ts";
import { loadAllArticles } from "../src/data/wiki/index.ts";
import type { WikiBlock } from "../src/data/wiki/types.ts";

/**
 * Checks the inline-maths splitter, and that every formula in every wiki article
 * actually renders.
 *
 * A malformed formula is close to invisible in review: KaTeX draws it in red in
 * the browser and says nothing anywhere else. With hundreds of formulas being
 * authored, that needs to fail a check rather than wait to be noticed.
 */

let failures = 0;

function eq(name: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`  ${ok ? "ok  " : "FAIL"} ${name}`);
  if (!ok) {
    console.log(`       got      ${JSON.stringify(actual)}`);
    console.log(`       expected ${JSON.stringify(expected)}`);
    failures++;
  }
}

console.log("inline maths splitting:");
eq("plain prose", splitMath("no maths here"), [{ text: "no maths here", math: false }]);
eq("one formula", splitMath("the mean $np$ rises"), [
  { text: "the mean ", math: false },
  { text: "np", math: true },
  { text: " rises", math: false },
]);
eq("two formulas", splitMath("$a$ and $b$"), [
  { text: "a", math: true },
  { text: " and ", math: false },
  { text: "b", math: true },
]);
eq("escaped dollar", splitMath("costs \\$5 today"), [{ text: "costs $5 today", math: false }]);
eq("unclosed delimiter stays literal", splitMath("a $ b c"), [{ text: "a $ b c", math: false }]);
eq("formula at the very start", splitMath("$X$ is a variable"), [
  { text: "X", math: true },
  { text: " is a variable", math: false },
]);

/** Renders one expression, reporting where it came from if it fails. */
function checkLatex(latex: string, where: string) {
  try {
    katex.renderToString(latex, { throwOnError: true, strict: false });
  } catch (error) {
    console.log(`  FAIL ${where}`);
    console.log(`       ${latex}`);
    console.log(`       ${(error as Error).message.split("\n")[0]}`);
    failures++;
  }
}

/** Every inline `$...$` span in a piece of prose. */
function checkProse(text: string, where: string) {
  for (const segment of splitMath(text)) {
    if (segment.math) checkLatex(segment.text, where);
  }
}

function checkBlock(block: WikiBlock, where: string) {
  switch (block.kind) {
    case "prose":
      checkProse(block.text, where);
      break;
    case "formula":
      checkLatex(block.latex, where);
      if (block.caption) checkProse(block.caption, where);
      break;
    case "definitions":
      for (const item of block.items) {
        checkProse(item.term, where);
        checkProse(item.description, where);
      }
      break;
    case "example":
      checkProse(block.problem, where);
      for (const step of block.steps) checkProse(step, where);
      checkProse(block.answer, where);
      break;
    case "callout":
      checkProse(block.title, where);
      checkProse(block.text, where);
      break;
    case "table":
      for (const header of block.headers) checkProse(header, where);
      for (const row of block.rows) for (const cell of row) checkProse(cell, where);
      if (block.caption) checkProse(block.caption, where);
      break;
    case "list":
      for (const item of block.items) checkProse(item, where);
      break;
  }
}

const wikiByConcept = await loadAllArticles();

// An article filed under a concept id that does not exist is invisible: the
// lesson shows "coming soon" and the article is never reachable. Catch it here.
console.log("\narticle ids:");
const known = new Set(concepts.map((c) => c.id));
const orphans = [...wikiByConcept.keys()].filter((id) => !known.has(id));
if (orphans.length) {
  for (const id of orphans) console.log(`  FAIL no such concept: ${id}`);
  failures += orphans.length;
} else {
  console.log(`  ok   all ${wikiByConcept.size} articles map to real concepts`);
}

console.log(`\nformulas across ${wikiByConcept.size} wiki articles:`);
let formulaCount = 0;
for (const [conceptId, article] of wikiByConcept) {
  checkProse(article.summary, `${conceptId} · summary`);
  for (const section of article.sections) {
    for (const block of section.blocks) {
      if (block.kind === "formula") formulaCount++;
      checkBlock(block, `${conceptId} · ${section.heading}`);
    }
  }
}
console.log(`  ${formulaCount} display formulas, plus inline spans, all checked`);

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} FAILURE(S).`);
process.exit(failures === 0 ? 0 : 1);
