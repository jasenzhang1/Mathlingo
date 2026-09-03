import { itemsByConcept } from "../src/data/items.ts";
import { makeVerdict, rubricFor, scoreFromVerdicts } from "../src/lib/assessment/rubric.ts";
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

console.log("\ndominance — strictly better answers never score lower:");
const anchors = [0, 0.25, 0.5, 0.75, 1];
let inversions = 0;
for (let trial = 0; trial < 20000; trial++) {
  const pick = () => anchors[Math.floor(Math.random() * anchors.length)]!;
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
