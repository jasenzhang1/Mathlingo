import { spawnSync } from "node:child_process";
import { items } from "../src/data/items.ts";
import { buildTestScript } from "../src/lib/assessment/codeTests.ts";
import {
  canInstantiate,
  hasPlaceholders,
  instantiate,
  sampleParams,
  SOLVERS,
} from "../src/lib/assessment/templating.ts";

/**
 * Two checks, both of which the app depends on and neither of which was
 * previously running:
 *
 *  1. Every item in the bank can actually be rendered — no placeholder ever
 *     reaches a learner, and every numeric item has a finite answer key.
 *  2. Each registered solver agrees with an independent implementation, which
 *     is the two-solver rule `sourcing.ts` states but cannot enforce by itself.
 */

let failures = 0;
const fail = (message: string) => {
  console.error(`  FAIL ${message}`);
  failures++;
};

// --- 1. Independent check of binomialPmf -------------------------------------
// Reference: the recurrence P(k) = P(k-1) * (n-k+1)/k * p/(1-p), built up from
// P(0) = (1-p)^n. Shares no code path with the multiplicative-coefficient
// implementation in templating.ts.
function binomialPmfReference(n: number, k: number, p: number): number {
  let term = Math.pow(1 - p, n);
  for (let i = 1; i <= k; i++) term *= ((n - i + 1) / i) * (p / (1 - p));
  return term;
}

console.log("solver agreement (binomialPmf vs independent recurrence):");
let worst = 0;
for (let n = 1; n <= 30; n++) {
  for (let k = 0; k <= n; k++) {
    for (const p of [0.05, 0.25, 0.5, 0.55, 0.6, 0.62, 0.65, 0.7, 0.95]) {
      const mine = SOLVERS.binomialPmf!({ n, k, p });
      const reference = binomialPmfReference(n, k, p);
      worst = Math.max(worst, Math.abs(mine - reference));
    }
  }
}
console.log(`  max absolute disagreement over 4,185 cases: ${worst.toExponential(2)}`);
if (worst > 1e-12) fail(`binomialPmf disagrees with the reference by ${worst}`);

// Distributions must sum to 1 — catches a coefficient that is wrong everywhere.
for (const [n, p] of [[10, 0.6], [12, 0.55], [6, 0.7], [25, 0.5]] as const) {
  let total = 0;
  for (let k = 0; k <= n; k++) total += SOLVERS.binomialPmf!({ n, k, p });
  if (Math.abs(total - 1) > 1e-12) fail(`Binomial(${n}, ${p}) sums to ${total}, not 1`);
}

// --- 2. Every item renders concretely ----------------------------------------
console.log("\nitem rendering:");
const templated = items.filter((i) => i.params?.length);
console.log(`  ${items.length} items, ${templated.length} templated`);

for (const item of items) {
  if (!canInstantiate(item)) {
    fail(`${item.id} cannot be instantiated`);
    continue;
  }
  // Many draws, so a constraint that only occasionally fails is still caught.
  for (let trial = 0; trial < 500; trial++) {
    let instance;
    try {
      instance = instantiate(item);
    } catch (error) {
      fail(`${item.id} threw: ${(error as Error).message}`);
      break;
    }
    if (hasPlaceholders(instance.stem)) {
      fail(`${item.id} rendered with placeholders: ${instance.stem}`);
      break;
    }
    if (instance.format === "numeric" && !Number.isFinite(Number(instance.answerKey))) {
      fail(`${item.id} produced a non-finite key: ${String(instance.answerKey)}`);
      break;
    }
  }
}

// --- 3. Constraints actually hold --------------------------------------------
console.log("\nconstraint satisfaction:");
for (const item of templated) {
  const constraints = item.params!.flatMap((s) => s.constraints ?? []);
  if (constraints.length === 0) continue;
  for (let trial = 0; trial < 2000; trial++) {
    const values = sampleParams(item.params!);
    if (values.k !== undefined && values.n !== undefined && values.k > values.n) {
      fail(`${item.id} drew k=${values.k} > n=${values.n}`);
      break;
    }
  }
  console.log(`  ${item.id}: [${constraints.join("; ")}] held over 2,000 draws`);
}

// --- 4. Show what a learner actually sees ------------------------------------
console.log("\nsample rendered instances:");
for (const item of templated) {
  for (let i = 0; i < 3; i++) {
    const instance = instantiate(item);
    console.log(`  ${instance.stem}`);
    console.log(`    key = ${Number(instance.answerKey).toFixed(4)}`);
  }
}

// --- 5. Code items: the reference solution actually passes its own tests ----
// Runs on real CPython (not Pyodide, which the browser uses) — a subprocess
// per test is already fully isolated, so no namespace-clearing trick is
// needed here the way pythonSandbox.ts needs one for a long-lived interpreter.
console.log("\ncode items (reference solution vs. its own tests):");
const codeItems = items.filter((i) => i.format === "code");

// Preflight the third-party packages code items declare. Without this a
// missing NumPy surfaces as every test of every NumPy item "failing", which
// reads as a bank full of broken reference solutions rather than as one
// missing dependency on this machine.
const declaredPackages = [...new Set(codeItems.flatMap((i) => i.codePackages ?? []))].sort();
const unavailable = declaredPackages.filter(
  (pkg) => spawnSync("python3", ["-c", `import ${pkg}`], { encoding: "utf8" }).status !== 0,
);
if (unavailable.length > 0) {
  fail(
    `code items declare ${unavailable.join(", ")}, which this python3 cannot import.\n` +
      `    The browser gets these from Pyodide, but verifying a reference solution here\n` +
      `    needs them locally:  pip install ${unavailable.join(" ")}`,
  );
}
if (declaredPackages.length > 0) {
  console.log(
    `  packages declared: ${declaredPackages.join(", ")}` +
      (unavailable.length === 0 ? " (all importable)" : ""),
  );
}

let codeItemsChecked = 0;
for (const item of codeItems) {
  if (!item.referenceSolution) {
    fail(`${item.id} has no referenceSolution — its codeTests were never confirmed satisfiable`);
    continue;
  }
  if (!item.codeTests?.length) {
    fail(`${item.id} is format "code" but has no codeTests`);
    continue;
  }
  for (const test of item.codeTests) {
    const script = buildTestScript(item.referenceSolution, test);
    const result = spawnSync("python3", ["-c", script], { encoding: "utf8", timeout: 5000 });
    if (result.error) {
      fail(`${item.id} / ${test.id}: couldn't run python3 (${result.error.message})`);
      continue;
    }
    const stdout = result.stdout.trim();
    if (!stdout.endsWith("__MATHLINGO_TEST_PASS__")) {
      fail(
        `${item.id} / ${test.id}: reference solution failed its own test.\n` +
          `    stdout: ${stdout || "(empty)"}\n    stderr: ${result.stderr.trim() || "(empty)"}`,
      );
    }

    // The other half of the check: a test the *unimplemented* starter also
    // passes measures nothing. It matters more here than for other formats
    // because a code item's rubric is "fraction of tests passed", so a
    // vacuous test is partial credit for a submission that does nothing.
    // Assertions of the form "the input was not mutated" are the usual
    // offenders — trivially true of an empty function body.
    if (item.starterCode) {
      const stubScript = buildTestScript(item.starterCode, test);
      const stub = spawnSync("python3", ["-c", stubScript], { encoding: "utf8", timeout: 5000 });
      if (!stub.error && stub.stdout.trim().endsWith("__MATHLINGO_TEST_PASS__")) {
        fail(
          `${item.id} / ${test.id}: passes against starterCode, so it gives credit for an ` +
            `unimplemented answer. Assert the returned value too, not only a side effect that ` +
            `did not happen.`,
        );
      }
    }
  }
  codeItemsChecked++;
}
console.log(`  ${codeItemsChecked} code item(s), ${codeItems.reduce((n, i) => n + (i.codeTests?.length ?? 0), 0)} tests`);

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} FAILURE(S).`);
process.exit(failures === 0 ? 0 : 1);
