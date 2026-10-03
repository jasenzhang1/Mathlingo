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
import { isVectorKey, parseVectorAnswer } from "../src/lib/assessment/vectorAnswer.ts";

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
      const mine = SOLVERS.binomialPmf!({ n, k, p }) as number;
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
  for (let k = 0; k <= n; k++) total += SOLVERS.binomialPmf!({ n, k, p }) as number;
  if (Math.abs(total - 1) > 1e-12) fail(`Binomial(${n}, ${p}) sums to ${total}, not 1`);
}

// --- 1b. Linear-algebra solvers against independent identities ---------------
// Each check uses a different route to the same quantity (or a property the
// answer must satisfy), so a typo in a solver can't also be in its check.
console.log("\nsolver agreement (linear algebra vs independent identities):");
{
  const rand = () => Math.floor(Math.random() * 13) - 6;
  const vec = (prefix: string, n: number) =>
    Object.fromEntries(Array.from({ length: n }, (_, i) => [`${prefix}${i + 1}`, rand()]));
  const get = (q: Record<string, number>, prefix: string, n: number) =>
    Array.from({ length: n }, (_, i) => q[`${prefix}${i + 1}`]!);
  const near = (a: number, b: number) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
  const num = (name: string, q: Record<string, number>) => SOLVERS[name]!(q) as number;
  const vecOut = (name: string, q: Record<string, number>) => SOLVERS[name]!(q) as number[];
  let checked = 0;
  const expect = (ok: boolean, what: string) => {
    checked++;
    if (!ok) fail(what);
  };

  for (let trial = 0; trial < 2000; trial++) {
    const n = 2 + (trial % 3);
    const q: Record<string, number> = { ...vec("x", n), ...vec("y", n), a: rand(), b: rand() };
    const x = get(q, "x", n);
    const y = get(q, "y", n);
    const xx = x.reduce((s, v) => s + v * v, 0);
    const yy = y.reduce((s, v) => s + v * v, 0);

    // linear combination: (ax + by) · e_i, entry by entry, and linear in a.
    const lc = vecOut("linearCombination", q);
    expect(lc.every((v, i) => near(v, q.a! * x[i]! + q.b! * y[i]!)), `linearCombination ${JSON.stringify(q)}`);
    // dot via polarisation: (‖x+y‖² − ‖x−y‖²)/4.
    const plus = x.map((v, i) => v + y[i]!).reduce((s, v) => s + v * v, 0);
    const minus = x.map((v, i) => v - y[i]!).reduce((s, v) => s + v * v, 0);
    expect(near(num("dotProduct", q), (plus - minus) / 4), `dotProduct ${JSON.stringify(q)}`);
    // norm² = x · x via the dot solver with y := x.
    const self = { ...q, ...Object.fromEntries(x.map((v, i) => [`y${i + 1}`, v])) };
    expect(near(num("norm", q) ** 2, num("dotProduct", self)), `norm ${JSON.stringify(q)}`);
    expect(near(num("distance", q) ** 2, minus), `distance ${JSON.stringify(q)}`);
    if (xx > 0) {
      const u = vecOut("unitVector", q);
      expect(near(u.reduce((s, v) => s + v * v, 0), 1) && u.every((v, i) => near(v * Math.sqrt(xx), x[i]!)), `unitVector ${JSON.stringify(q)}`);
    }
    if (xx > 0 && yy > 0) {
      // cos θ from the law of cosines: ‖x−y‖² = ‖x‖² + ‖y‖² − 2‖x‖‖y‖cos θ.
      const cos = (xx + yy - minus) / (2 * Math.sqrt(xx * yy));
      expect(near(num("cosAngle", q), cos), `cosAngle ${JSON.stringify(q)}`);
    }
    if (yy > 0) {
      // projection: residual orthogonal to y, and scalar projection = ‖proj‖ with sign.
      const pr = vecOut("vectorProjection", q);
      const residualDot = x.map((v, i) => v - pr[i]!).reduce((s, v, i) => s + v * y[i]!, 0);
      expect(Math.abs(residualDot) < 1e-9 * Math.max(1, xx, yy), `vectorProjection ${JSON.stringify(q)}`);
      const prLen = Math.sqrt(pr.reduce((s, v) => s + v * v, 0));
      expect(near(Math.abs(num("scalarProjection", q)), prLen), `scalarProjection ${JSON.stringify(q)}`);
    }
    if (y[n - 1] !== 0) {
      // orthogonal completion: the completed x really is orthogonal to y.
      const partial = { ...q };
      delete partial[`x${n}`];
      const k = num("orthogonalCompletion", partial);
      const completed = [...x.slice(0, n - 1), k];
      expect(Math.abs(completed.reduce((s, v, i) => s + v * y[i]!, 0)) < 1e-9 * Math.max(1, xx, yy), `orthogonalCompletion ${JSON.stringify(q)}`);
    }
    if (n === 3) {
      // cross product: orthogonal to both, and ‖x×y‖² = ‖x‖²‖y‖² − (x·y)² (Lagrange).
      const c = vecOut("crossProduct", q);
      const xy = x.reduce((s, v, i) => s + v * y[i]!, 0);
      expect(
        near(c.reduce((s, v, i) => s + v * x[i]!, 0), 0) &&
          near(c.reduce((s, v, i) => s + v * y[i]!, 0), 0) &&
          near(c.reduce((s, v) => s + v * v, 0), xx * yy - xy * xy),
        `crossProduct ${JSON.stringify(q)}`,
      );
    }

    // 2×2 and 3×3 matrices.
    const m: Record<string, number> = {};
    for (let i = 1; i <= 3; i++) for (let j = 1; j <= 3; j++) m[`m${i}${j}`] = rand();
    const mv = vecOut("matVec2", { ...m, x1: x[0]!, x2: x[1]! });
    // M x as a combination of M's columns.
    expect(near(mv[0]!, x[0]! * m.m11! + x[1]! * m.m12!) && near(mv[1]!, x[0]! * m.m21! + x[1]! * m.m22!), `matVec2`);
    // det2: the product of the eigenvalues, via trace and determinant-free route:
    // det(M) = ((tr M)² − tr(M²))/2.
    const tr = m.m11! + m.m22!;
    const trSq = m.m11! ** 2 + 2 * m.m12! * m.m21! + m.m22! ** 2;
    expect(near(num("det2", m), (tr * tr - trSq) / 2), `det2`);
    // det3 by Sarrus' rule.
    const sarrus =
      m.m11! * m.m22! * m.m33! + m.m12! * m.m23! * m.m31! + m.m13! * m.m21! * m.m32! -
      m.m13! * m.m22! * m.m31! - m.m11! * m.m23! * m.m32! - m.m12! * m.m21! * m.m33!;
    expect(near(num("det3", m), sarrus), `det3`);
    // matMulEntry2 against M (N e_j), i.e. via matVec2 on N's j-th column.
    const nm = { n11: rand(), n12: rand(), n21: rand(), n22: rand() };
    for (const i of [1, 2]) for (const j of [1, 2]) {
      const col = vecOut("matVec2", { ...m, x1: j === 1 ? nm.n11 : nm.n12, x2: j === 1 ? nm.n21 : nm.n22 });
      expect(near(num("matMulEntry2", { ...m, ...nm, i, j }), col[i - 1]!), `matMulEntry2`);
    }
    // symEigMax2 is a root of the characteristic polynomial, and ≥ the other root.
    const lam = num("symEigMax2", { a: q.a!, b: q.b!, c: x[0]! });
    const charPoly = (lam - q.a!) * (lam - x[0]!) - q.b! ** 2;
    expect(Math.abs(charPoly) < 1e-8 * Math.max(1, lam * lam) && lam >= (q.a! + x[0]!) / 2 - 1e-12, `symEigMax2`);
  }
  console.log(`  ${checked} checks across ${Object.keys(SOLVERS).length - 1} solvers`);
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
    const keyEntries = isVectorKey(instance.answerKey)
      ? parseVectorAnswer(instance.answerKey)
      : [Number(instance.answerKey)];
    if (instance.format === "numeric" && !(keyEntries ?? [NaN]).every(Number.isFinite)) {
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
    console.log(`    key = ${isVectorKey(instance.answerKey) ? instance.answerKey : Number(instance.answerKey).toFixed(4)}`);
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
