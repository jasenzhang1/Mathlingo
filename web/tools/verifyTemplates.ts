import { items } from "../src/data/items.ts";
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

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} FAILURE(S).`);
process.exit(failures === 0 ? 0 : 1);
