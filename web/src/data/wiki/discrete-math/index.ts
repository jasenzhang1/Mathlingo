import type { WikiArticle } from "../types";

/**
 * Every discrete-math article, in one chunk.
 *
 * Loaded on demand by ../index.ts when a learner opens a discrete-math lesson,
 * so no other domain's articles are fetched. Add new articles here.
 *
 * `setTheory`, `countingMethods`, and `binomialTheorem` moved here from
 * `../probability/` when the three concepts moved domains in `concepts.ts` (see
 * `concepts.md`'s note on the discrete-math sweep) — the articles themselves
 * were written for this content already and needed no rewrite. The other 21
 * were authored alongside them to close out the domain.
 */
import { binomialTheorem } from "./binomial-theorem";
import { cardinality } from "./cardinality";
import { cartesianProduct } from "./cartesian-product";
import { chineseRemainderTheorem } from "./chinese-remainder-theorem";
import { combinations } from "./combinations";
import { countingMethods } from "./counting-methods";
import { directProof } from "./direct-proof";
import { equivalenceRelations } from "./equivalence-relations";
import { eulerianHamiltonianPaths } from "./eulerian-hamiltonian-paths";
import { factorials } from "./factorials";
import { fermatEulerTheorems } from "./fermat-euler-theorems";
import { fibonacciNumbers } from "./fibonacci-numbers";
import { functionsRelations } from "./functions-relations";
import { gcdEuclideanAlgorithm } from "./gcd-euclidean-algorithm";
import { graphBasics } from "./graph-basics";
import { graphColoring } from "./graph-coloring";
import { graphPathsConnectivity } from "./graph-paths-connectivity";
import { injectionsSurjectionsBijections } from "./injections-surjections-bijections";
import { integerPartitions } from "./integer-partitions";
import { logicalEquivalences } from "./logical-equivalences";
import { mathematicalInduction } from "./mathematical-induction";
import { modularArithmetic } from "./modular-arithmetic";
import { modularInverses } from "./modular-inverses";
import { permutations } from "./permutations";
import { pigeonholePrinciple } from "./pigeonhole-principle";
import { powerSet } from "./power-set";
import { proofByContradiction } from "./proof-by-contradiction";
import { proofBySets } from "./proof-by-sets";
import { propositionalLogic } from "./propositional-logic";
import { recursion } from "./recursion";
import { setTheory } from "./set-theory";
import { starsAndBars } from "./stars-and-bars";
import { strongInduction } from "./strong-induction";
import { trees } from "./trees";

const articles: WikiArticle[] = [
  binomialTheorem,
  cardinality,
  cartesianProduct,
  chineseRemainderTheorem,
  combinations,
  countingMethods,
  directProof,
  equivalenceRelations,
  eulerianHamiltonianPaths,
  factorials,
  fermatEulerTheorems,
  fibonacciNumbers,
  functionsRelations,
  gcdEuclideanAlgorithm,
  graphBasics,
  graphColoring,
  graphPathsConnectivity,
  injectionsSurjectionsBijections,
  integerPartitions,
  logicalEquivalences,
  mathematicalInduction,
  modularArithmetic,
  modularInverses,
  permutations,
  pigeonholePrinciple,
  powerSet,
  proofByContradiction,
  proofBySets,
  propositionalLogic,
  recursion,
  setTheory,
  starsAndBars,
  strongInduction,
  trees,
];

export default articles;
