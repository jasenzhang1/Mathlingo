import { loadItemBank } from "../src/data/items.ts";
import {
  explainScore,
  makeVerdict,
  rubricFor,
  scoreFromVerdicts,
} from "../src/lib/assessment/rubric.ts";
import { routeGrader } from "../src/lib/assessment/router.ts";
import type { RubricVerdict } from "../src/lib/assessment/types.ts";

/**
 * Tests the convergence point of the grading pipeline (`grading.md`): the single
 * scoring function every grader feeds into. Imports the real implementation
 * rather than a copy, so this cannot drift away from what ships.
 */

let failures = 0;
function check(name: string, actual: number, expected: number) {
  const ok = Math.abs(actual - expected) < 1e-9;
  console.log(
    `  ${ok ? "ok  " : "FAIL"} ${name.padEnd(52)} ${(actual * 100).toFixed(0).padStart(3)}%` +
      (ok ? "" : `  (expected ${(expected * 100).toFixed(0)}%)`),
  );
  if (!ok) failures++;
}

const v = (id: string, weight: number, credit: number, required = false): RubricVerdict =>
  makeVerdict({
    elementId: id,
    description: id,
    weight,
    credit,
    required,
    justification: "",
  });

const forbidden = (id: string, credit: number): RubricVerdict =>
  makeVerdict({
    elementId: id,
    description: id,
    weight: 0,
    credit,
    forbidden: true,
    justification: "",
  });

// Weights from the real bernoulli-binomial--explain-variance-max rubric.
const rubric = (d: number, s: number, u: number) => [
  v("decomposition", 2, d, true),
  v("single-trial", 2, s),
  v("uncertainty", 1, u),
];

console.log("scoring on a spectrum:");
check("blank answer", scoreFromVerdicts(rubric(0, 0, 0)), 0);
check("perfect on every element", scoreFromVerdicts(rubric(1, 1, 1)), 1);
check("all present but thinly justified", scoreFromVerdicts(rubric(0.75, 0.75, 0.75)), 0.75);
check("strong on required, nothing else", scoreFromVerdicts(rubric(1, 0, 0)), 0.4);
check("everything but the required element -> capped", scoreFromVerdicts(rubric(0, 1, 1)), 0.5);
check("required thin (0.75) is NOT capped", scoreFromVerdicts(rubric(0.75, 1, 1)), 0.9);
check("required at the bar (0.5) is not capped", scoreFromVerdicts(rubric(0.5, 1, 1)), 0.8);
check("required below the bar (0.25) is capped", scoreFromVerdicts(rubric(0.25, 1, 1)), 0.5);
check(
  "perfect answer with a forbidden move",
  scoreFromVerdicts([...rubric(1, 1, 1), forbidden("phrase", 1)]),
  0.3,
);
check(
  "forbidden move only quarter-committed does not cap",
  scoreFromVerdicts([...rubric(1, 1, 1), forbidden("phrase", 0.25)]),
  1,
);

console.log("\nmonotonicity — more credit must never score lower:");
let previous = -1;
for (const a of [0, 0.25, 0.5, 0.75, 1]) {
  const score = scoreFromVerdicts(rubric(a, a, a));
  console.log(`  all elements at ${a.toFixed(2)} -> ${(score * 100).toFixed(0)}%`);
  if (score < previous) {
    console.error("  FAIL score decreased as credit increased");
    failures++;
  }
  previous = score;
}

// --- 1/100 granularity ------------------------------------------------------
console.log("\n1/100 granularity — one point of credit must move the score:");
{
  let indistinguishable = 0;
  for (let c = 0; c < 100; c++) {
    const lower = scoreFromVerdicts(rubric(c / 100, 1, 1));
    const upper = scoreFromVerdicts(rubric((c + 1) / 100, 1, 1));
    // Below the required bar the cap flattens everything, which is intended.
    if (c / 100 >= 0.5 && lower === upper) indistinguishable++;
  }
  if (indistinguishable > 0) {
    console.error(`  FAIL ${indistinguishable} single-point steps produced no change`);
    failures++;
  } else {
    console.log("  ok   every 1-point step above the required bar changes the total");
  }

  const a = scoreFromVerdicts(rubric(0.68, 0.68, 0.68));
  const b = scoreFromVerdicts(rubric(0.81, 0.81, 0.81));
  console.log(
    `  68/100 across the board -> ${Math.round(a * 100)}/100; ` +
      `81/100 -> ${Math.round(b * 100)}/100`,
  );
  if (a === b) {
    console.error("  FAIL 68 and 81 are indistinguishable");
    failures++;
  }
}

// --- Score explanation ------------------------------------------------------
console.log("\nscore explanation (why the total isn't the average):");
{
  const capped = explainScore(rubric(0.2, 1, 1));
  console.log(
    `  required element at 20/100: weighted ${Math.round(capped.weighted * 100)}` +
      ` -> final ${Math.round(capped.final * 100)}, cap: ${capped.cap?.kind ?? "none"}`,
  );
  if (capped.cap?.kind !== "required-missing") {
    console.error("  FAIL expected a required-missing cap");
    failures++;
  }

  const clean = explainScore(rubric(0.9, 0.9, 0.9));
  if (clean.cap) {
    console.error("  FAIL an uncapped answer reported a cap");
    failures++;
  } else {
    console.log(`  uncapped answer: no cap reported, ${Math.round(clean.final * 100)}/100`);
  }

  const move = explainScore([...rubric(1, 1, 1), forbidden("phrase", 1)]);
  if (move.cap?.kind !== "forbidden-move") {
    console.error("  FAIL expected a forbidden-move cap");
    failures++;
  } else {
    console.log(
      `  forbidden move: weighted ${Math.round(move.weighted * 100)} -> final ${Math.round(move.final * 100)}`,
    );
  }
}

console.log("\ndominance — strictly better answers never score lower:");
let inversions = 0;
for (let trial = 0; trial < 20000; trial++) {
  const pick = () => Math.round(Math.random() * 100) / 100;
  const [d, s, u] = [pick(), pick(), pick()];
  const weak = scoreFromVerdicts(rubric(d, s, u));
  const strong = scoreFromVerdicts(
    rubric(Math.min(1, d + 0.25), Math.min(1, s + 0.25), Math.min(1, u + 0.25)),
  );
  if (strong < weak) inversions++;
}
if (inversions > 0) {
  console.error(`  FAIL ${inversions} inversions`);
  failures++;
} else {
  console.log("  ok   20,000 random pairs, no inversions");
}

// --- Every item routes somewhere and has a rubric ----------------------------
console.log("\nrouting and rubric coverage (grading.md: everything needs a rubric):");
const itemsByConcept = await loadItemBank();
const all = [...itemsByConcept.values()].flat();
const byKind: Record<string, number> = {};
for (const item of all) {
  const kind = routeGrader(item);
  byKind[kind] = (byKind[kind] ?? 0) + 1;

  const derived = rubricFor(item);
  if (derived.elements.length === 0) {
    console.error(`  FAIL ${item.id} (${item.format}) has no rubric`);
    failures++;
  }
  const weight = derived.elements.reduce((sum, e) => sum + e.weight, 0);
  if (weight <= 0) {
    console.error(`  FAIL ${item.id} rubric has zero total weight`);
    failures++;
  }
}
console.log(
  `  ${all.length} items -> ` +
    Object.entries(byKind)
      .map(([k, n]) => `${k}: ${n}`)
      .join(", "),
);
if (failures === 0) console.log("  ok   every item has a non-empty, positively weighted rubric");

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} FAILURE(S).`);
process.exit(failures === 0 ? 0 : 1);
