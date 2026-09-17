import type { Item } from "../../lib/assessment/types";
import { AUTHORED_DM, LEVIN_DISCRETE_MATH, LLM_MATH_FOR_CS, ROSEN_DISCRETE_MATH } from "./discrete-math-sources";

/**
 * DM-3 — Counting & Combinatorics: Counting Methods, Pigeonhole Principle,
 * Factorials, Permutations, Combinations, Stars and Bars, Integer Partitions,
 * Binomial Theorem.
 *
 * Authored from `assessments/dm-03-counting-and-combinatorics.md` (which
 * carries the worked derivations for the 6 new concepts) plus the existing
 * `counting-methods`/`binomial-theorem` sections of
 * `assessments/foundations-of-probability.md`. Eight items per concept — two
 * at each cognitive level — so every pool clears the MIN_LIVE_ITEMS = 8 bar
 * `calibration.ts`'s coverage audit enforces, with a difficulty spread well
 * past the 1.5-logit floor.
 *
 * `prereqClosure` on every item is a subset of the concept's own ancestor
 * closure in `concepts.ts` (never anything outside it — `sourcing.ts`'s
 * `checkPrereqClosure` treats that as a hard failure). Every numeric
 * `answerKey` below was recomputed by hand, not carried over from memory:
 * factorials multiplied out digit by digit, binomial coefficients rebuilt
 * from n·(n-1)·…/k!, and every partition list enumerated directly.
 */
export const discreteMathCountingItems: Item[] = [
  // =====================================================================
  // Counting Methods (`counting-methods`) — ancestors: set-theory
  // =====================================================================
  {
    id: "counting-methods--recall-multiplication-principle",
    conceptId: "counting-methods",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The multiplication principle says a k-stage process has a total outcome count of n1×n2×⋯×nk when:",
    choices: [
      {
        id: "a",
        text: "the number of choices at each stage does not depend on the choices made at earlier stages",
        correct: true,
      },
      {
        id: "b",
        text: "the totals at each stage are added rather than multiplied",
        correct: false,
        misconception: {
          id: "addition-instead-of-multiplication",
          description: "Adds the per-stage counts instead of multiplying them, which undercounts a sequential process badly.",
          blameConceptId: "counting-methods",
        },
      },
      {
        id: "c",
        text: "every stage must offer exactly the same number of choices",
        correct: false,
        misconception: {
          id: "requires-equal-stage-sizes",
          description: "Invents a constraint the principle does not have — stages can offer different numbers of choices.",
          blameConceptId: "counting-methods",
        },
      },
      {
        id: "d",
        text: "the order in which the stages occur does not matter",
        correct: false,
        misconception: {
          id: "stage-order-irrelevant-claim",
          description: "Confuses whether stage order affects the count (it doesn't, for the product) with an actual requirement of the principle.",
          blameConceptId: "counting-methods",
        },
      },
    ],
    difficulty: -1.45,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["counting-methods", "set-theory"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "counting-methods--recall-order-repetition-table",
    conceptId: "counting-methods",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which pairings of (order matters?, repetition allowed?) with their counting formula are correct? Select all that apply.",
    choices: [
      { id: "a", text: "order matters, no repetition → P(n,k)", correct: true },
      { id: "b", text: "order doesn't matter, no repetition → C(n,k)", correct: true },
      { id: "c", text: "order matters, repetition allowed → n^k", correct: true },
      {
        id: "d",
        text: "order doesn't matter, repetition allowed → P(n,k)",
        correct: false,
        misconception: {
          id: "repetition-unordered-mismatched",
          description: "Uses the no-repetition ordered formula for the repetition-allowed unordered case, which is stars and bars, C(n+k-1,k), not P(n,k).",
          blameConceptId: "counting-methods",
        },
      },
      {
        id: "e",
        text: "order matters, no repetition → n^k",
        correct: false,
        misconception: {
          id: "no-repetition-uses-power-formula",
          description: "Uses the repetition-allowed formula n^k for a no-repetition ordered problem, which is P(n,k) instead.",
          blameConceptId: "counting-methods",
        },
      },
    ],
    difficulty: -1.15,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["counting-methods", "set-theory"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "counting-methods--apply-three-course-meal",
    conceptId: "counting-methods",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A restaurant menu has 4 appetizers, 6 entrees, and 3 desserts. Assuming the choices at each course are " +
      "independent, how many distinct 3-course meals are possible? Give a whole number.",
    answerKey: 72,
    tolerance: 0.001,
    difficulty: -0.55,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["counting-methods", "set-theory"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "counting-methods--apply-password-count",
    conceptId: "counting-methods",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A password is 2 letters (A–Z) followed by 3 digits (0–9), with repetition allowed at every position. " +
      "How many distinct passwords are possible? Give a whole number.",
    answerKey: 676000,
    tolerance: 0.001,
    difficulty: -0.15,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["counting-methods", "set-theory"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "counting-methods--explain-dice-sum-sample-space",
    conceptId: "counting-methods",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The sum of two dice has only 11 possible values (2 through 12), but they are not equally likely. Explain " +
      "why not, and describe the correct equally-likely sample space to count with instead.",
    rubric: {
      elements: [
        {
          id: "ordered-pairs-sample-space",
          description: "Identifies the 36 equally likely ordered pairs (die 1, die 2) as the correct sample space.",
          weight: 3,
          required: true,
          misconception: {
            id: "sums-treated-as-equally-likely",
            description: "Treats the 11 possible sums as if each were equally likely, ignoring that they arise from unequal numbers of underlying outcomes.",
            blameConceptId: "counting-methods",
          },
        },
        {
          id: "unequal-ways-per-sum",
          description: "Notes that sums near 7 arise from more ordered pairs than extreme sums (e.g. 6 ways make 7, only 1 way makes 2).",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["counting-methods", "set-theory"],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "counting-methods--explain-derive-multiplication-principle",
    conceptId: "counting-methods",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Using the multiplication principle, derive why a 3-stage process with n1, n2, n3 independent choices has " +
      "n1×n2×n3 total outcomes, and explain explicitly why addition would be the wrong operation.",
    rubric: {
      elements: [
        {
          id: "nested-count",
          description:
            "Shows that for each of the n1 first-stage choices there are n2 ways to complete stage 2 (independent of the stage-1 choice), giving n1×n2 completions of the first two stages, then repeats for stage 3 to reach n1×n2×n3.",
          weight: 4,
          required: true,
        },
        {
          id: "why-not-addition",
          description:
            "Explains addition would only be correct if the stages were mutually exclusive alternative paths (choose stage 1 OR stage 2 OR stage 3), not a sequence where all three choices are made together.",
          weight: 3,
          required: true,
          misconception: {
            id: "sequential-stages-added",
            description: "Treats sequential independent choices as if they were mutually exclusive alternatives to be added.",
            blameConceptId: "counting-methods",
          },
        },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.3,
    expectedSeconds: 150,
    prereqClosure: ["counting-methods", "set-theory"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "counting-methods--transfer-password-checker-shortcircuit",
    conceptId: "counting-methods",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A password checker rejects a candidate immediately upon finding the first invalid character, without " +
      "examining the rest. Explain why the multiplication principle still correctly counts the total number of " +
      "valid passwords, even though real checking software doesn't independently examine every position this way.",
    rubric: {
      elements: [
        {
          id: "counts-outcomes-not-algorithm",
          description:
            "Explains the multiplication principle counts the size of the outcome space (how many valid passwords exist), which is independent of the algorithm used to check or construct any one instance.",
          weight: 4,
          required: true,
          misconception: {
            id: "algorithm-conflated-with-count",
            description: "Confuses the mechanics of a checking algorithm with what is being counted, as if a short-circuiting check changes the total number of valid outcomes.",
            blameConceptId: "counting-methods",
          },
        },
        {
          id: "independence-still-holds",
          description: "Notes the independent-choices structure that licenses the product still holds regardless of how any particular checker is implemented.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["counting-methods", "set-theory"],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "counting-methods--transfer-genotype-count",
    conceptId: "counting-methods",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A diploid organism's genotype at one gene locus is an unordered pair of alleles (Aa is the same genotype " +
      "as aA). If there are k possible alleles, explain why the number of distinct genotypes is C(k,2)+k rather " +
      "than the naive k², and say which counting-methods assumption the naive guess violates.",
    rubric: {
      elements: [
        {
          id: "identifies-unordered-with-repetition",
          description: "Identifies a genotype as an unordered selection of 2 alleles allowing repetition (same allele twice = homozygous), not an ordered pair.",
          weight: 3,
          required: true,
        },
        {
          id: "explains-k-squared-overcounts",
          description: "Explains k² counts ordered pairs, so it double-counts every heterozygous genotype (Aa and aA counted separately) even though they're the same genotype.",
          weight: 3,
          required: true,
          misconception: {
            id: "genotype-treated-as-ordered",
            description: "Applies the ordered-with-repetition formula n^k to an inherently unordered selection, missing that the multiplication principle's 'order matters' assumption fails here.",
            blameConceptId: "counting-methods",
          },
        },
        {
          id: "matches-formula",
          description: "Confirms C(k,2) (distinct-allele pairs) plus k (same-allele pairs) equals k(k+1)/2, matching the given formula.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.3,
    expectedSeconds: 180,
    prereqClosure: ["counting-methods", "set-theory"],
    source: AUTHORED_DM,
    status: "live",
  },

  // =====================================================================
  // Pigeonhole Principle (`pigeonhole-principle`) — ancestors: set-theory, counting-methods
  // =====================================================================
  {
    id: "pigeonhole-principle--recall-statement",
    conceptId: "pigeonhole-principle",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The (basic) pigeonhole principle states that if n items are placed into k containers with n > k, then:",
    choices: [
      { id: "a", text: "at least one container holds 2 or more items", correct: true },
      {
        id: "b",
        text: "every container holds at least 1 item",
        correct: false,
        misconception: {
          id: "every-container-nonempty-claimed",
          description: "Claims every container must be nonempty, which the principle never guarantees — only that some container is crowded.",
          blameConceptId: "pigeonhole-principle",
        },
      },
      {
        id: "c",
        text: "exactly one container holds all of the extra items",
        correct: false,
        misconception: {
          id: "exactly-one-crowded-container",
          description: "Overstates the conclusion as exact and unique, when the principle only guarantees existence of at least one crowded container.",
          blameConceptId: "pigeonhole-principle",
        },
      },
      {
        id: "d",
        text: "the items must first be sorted into groups before the principle applies",
        correct: false,
        misconception: {
          id: "sorting-precondition-invented",
          description: "Invents a precondition (sorting) the principle does not require.",
          blameConceptId: "pigeonhole-principle",
        },
      },
    ],
    difficulty: -1.25,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["pigeonhole-principle", "set-theory", "counting-methods"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "pigeonhole-principle--recall-generalized-applications",
    conceptId: "pigeonhole-principle",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of these are correct applications of the generalized pigeonhole principle? Select all that apply.",
    choices: [
      { id: "a", text: "37 people, 12 months → some month has at least ⌈37/12⌉ = 4 people", correct: true },
      { id: "b", text: "100 pigeons, 9 holes → some hole has at least ⌈100/9⌉ = 12 pigeons", correct: true },
      { id: "c", text: "5 items, 3 containers → some container has at least ⌈5/3⌉ = 2 items", correct: true },
      {
        id: "d",
        text: "10 items, 10 containers → guarantees some container has 2 items",
        correct: false,
        misconception: {
          id: "n-equals-k-forces-collision",
          description: "Applies the principle when n = k rather than n > k; with 10 items and 10 containers each item can have its own container, so nothing is forced.",
          blameConceptId: "pigeonhole-principle",
        },
      },
      {
        id: "e",
        text: "n items in k containers always forces exactly ⌈n/k⌉ items in the fullest container",
        correct: false,
        misconception: {
          id: "ceiling-treated-as-exact",
          description: "Reads ⌈n/k⌉ as an exact value rather than a guaranteed lower bound on the fullest container.",
          blameConceptId: "pigeonhole-principle",
        },
      },
    ],
    difficulty: -0.95,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["pigeonhole-principle", "set-theory", "counting-methods"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "pigeonhole-principle--apply-sock-drawer",
    conceptId: "pigeonhole-principle",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A drawer has socks in 5 colors. What is the minimum number of socks you must pull out to guarantee 3 of " +
      "the same color? Give a whole number.",
    answerKey: 11,
    tolerance: 0.001,
    difficulty: -0.35,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["pigeonhole-principle", "set-theory", "counting-methods"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "pigeonhole-principle--apply-colored-balls",
    conceptId: "pigeonhole-principle",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A bag contains balls of 7 different colors. What is the minimum number of balls you must draw to " +
      "guarantee at least 4 balls of the same color? Give a whole number.",
    answerKey: 22,
    tolerance: 0.001,
    difficulty: 0.05,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["pigeonhole-principle", "set-theory", "counting-methods"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "pigeonhole-principle--explain-prove-generalized",
    conceptId: "pigeonhole-principle",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Prove the generalized pigeonhole principle: if n items are placed into k containers, some container " +
      "holds at least ⌈n/k⌉ items.",
    rubric: {
      elements: [
        {
          id: "contradiction-setup",
          description: "Sets up a proof by contradiction: assumes every container holds at most ⌈n/k⌉ − 1 items.",
          weight: 3,
          required: true,
        },
        {
          id: "inequality-chain",
          description: "Derives that the total is then at most k·(⌈n/k⌉ − 1) < k·(n/k) = n, contradicting that all n items were placed somewhere.",
          weight: 4,
          required: true,
          misconception: {
            id: "asserts-without-inequality",
            description: "States the conclusion without carrying out the bounding inequality that produces the contradiction.",
            blameConceptId: "pigeonhole-principle",
          },
        },
      ],
    },
    difficulty: 0.55,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["pigeonhole-principle", "set-theory", "counting-methods"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "pigeonhole-principle--explain-first-letter-assumption",
    conceptId: "pigeonhole-principle",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "An argument claims: 'If 27 words are chosen, two must start with the same letter — by pigeonhole with " +
      "26 holes.' Identify what the pigeons and holes are, and flag the assumption the argument silently needs.",
    rubric: {
      elements: [
        {
          id: "identifies-pigeons-holes",
          description: "Identifies the 27 words as pigeons and the 26 letters as holes, and confirms n=27 > k=26.",
          weight: 3,
          required: true,
        },
        {
          id: "flags-assumption",
          description: "Flags the silent assumption that every word actually starts with one of the 26 letters (excludes numerals, symbols, or non-letter starts) — without it, the item-to-hole mapping isn't well defined.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["pigeonhole-principle", "set-theory", "counting-methods"],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "pigeonhole-principle--transfer-round-robin-games",
    conceptId: "pigeonhole-principle",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "In a tournament with 6 teams, each team has played some (possibly zero) of the other 5 teams so far. " +
      "Show, using pigeonhole, that at least two teams have played the same number of games.",
    rubric: {
      elements: [
        {
          id: "possible-values",
          description: "Identifies possible games-played counts as 0 through 5 (6 possible values) for 6 teams.",
          weight: 2,
          required: true,
        },
        {
          id: "mutual-exclusivity-trick",
          description:
            "Notes 0 and 5 cannot both occur simultaneously — a team with 0 games means no team could have reached 5, and vice versa — so effectively only 5 values are achievable at once, giving k=5 for n=6 pigeons.",
          weight: 4,
          required: true,
          misconception: {
            id: "naive-six-equals-six-pigeonhole",
            description: "Applies pigeonhole naively with n=k=6, which forces nothing, missing the mutual-exclusivity trick that reduces the effective hole count to 5.",
            blameConceptId: "pigeonhole-principle",
          },
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["pigeonhole-principle", "set-theory", "counting-methods"],
    source: ROSEN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "pigeonhole-principle--transfer-repeating-decimal",
    conceptId: "pigeonhole-principle",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain, using pigeonhole on the remainders produced by long division, why 1/7's decimal expansion must " +
      "eventually repeat, and use it to bound the length of the repeating block.",
    rubric: {
      elements: [
        {
          id: "remainders-as-holes",
          description: "Identifies the remainders at each division step as taking values in {0,...,6}, with 0 excluded since the division never terminates — leaving 6 possible nonzero remainders as the holes.",
          weight: 3,
          required: true,
        },
        {
          id: "repeat-forced",
          description: "Explains that among the remainders produced, pigeonhole forces a repeat within the first 6 steps (n pigeons > k=6 holes), and once a remainder repeats, every subsequent digit repeats identically.",
          weight: 3,
          required: true,
        },
        {
          id: "period-bound",
          description: "Concludes the repeating block has length at most 6, consistent with 1/7 = 0.overline{142857}, a period-6 decimal.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.3,
    expectedSeconds: 210,
    prereqClosure: ["pigeonhole-principle", "set-theory", "counting-methods"],
    source: AUTHORED_DM,
    status: "live",
  },

  // =====================================================================
  // Factorials (`factorials`) — ancestors: set-theory, counting-methods
  // =====================================================================
  {
    id: "factorials--recall-recursive-definition",
    conceptId: "factorials",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which recursive definition correctly defines n! for n ≥ 1, together with its base case?",
    choices: [
      { id: "a", text: "n! = n · (n−1)!, with 0! = 1", correct: true },
      {
        id: "b",
        text: "n! = n · (n−1)!, with 0! = 0",
        correct: false,
        misconception: {
          id: "zero-factorial-set-to-zero",
          description: "Sets 0! = 0 instead of 1, which breaks the recursion at n=1 (1! = 1·0! would give 0, not 1).",
          blameConceptId: "factorials",
        },
      },
      {
        id: "c",
        text: "n! = n + (n−1)!, with 0! = 1",
        correct: false,
        misconception: {
          id: "addition-instead-of-multiplication-factorial",
          description: "Uses addition instead of multiplication in the recursion, which doesn't produce factorial growth at all.",
          blameConceptId: "factorials",
        },
      },
      {
        id: "d",
        text: "n! = (n−1) · n!, with 1! = 1",
        correct: false,
        misconception: {
          id: "self-referential-recursion",
          description: "Defines n! in terms of itself rather than in terms of (n-1)!, which is circular and not a valid recursion.",
          blameConceptId: "factorials",
        },
      },
    ],
    difficulty: -1.25,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["factorials", "set-theory", "counting-methods"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "factorials--recall-true-statements",
    conceptId: "factorials",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about factorials are true? Select all that apply.",
    choices: [
      { id: "a", text: "0! = 1", correct: true },
      { id: "b", text: "n! counts the number of ways to arrange n distinct objects in a row", correct: true },
      { id: "c", text: "n! grows faster than any fixed exponential c^n as n → ∞", correct: true },
      {
        id: "d",
        text: "n! is defined for every real number n without any modification",
        correct: false,
        misconception: {
          id: "factorial-assumed-defined-for-reals",
          description: "Believes n! extends to all real numbers unmodified; the ordinary factorial is defined only for nonnegative integers without invoking the Gamma function.",
          blameConceptId: "factorials",
        },
      },
      {
        id: "e",
        text: "(n+1)! = (n+1) + n!",
        correct: false,
        misconception: {
          id: "factorial-recursion-uses-addition",
          description: "Writes the recursion with addition instead of multiplication; the correct identity is (n+1)! = (n+1)·n!.",
          blameConceptId: "factorials",
        },
      },
    ],
    difficulty: -0.95,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["factorials", "set-theory", "counting-methods"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "factorials--apply-eight-factorial",
    conceptId: "factorials",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Compute 8!. Give a whole number.",
    answerKey: 40320,
    tolerance: 0.001,
    difficulty: -0.35,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["factorials", "set-theory", "counting-methods"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "factorials--apply-ratio-nine-six",
    conceptId: "factorials",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Simplify 9!/6! to a single integer, without computing either factorial in full. Give a whole number.",
    answerKey: 504,
    tolerance: 0.001,
    difficulty: 0.05,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["factorials", "set-theory", "counting-methods"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "factorials--explain-induction-lower-bound",
    conceptId: "factorials",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Prove by induction that n! ≥ 2^(n−1) for all integers n ≥ 1.",
    rubric: {
      elements: [
        {
          id: "base-case",
          description: "Verifies the base case n=1: 1! = 1 ≥ 2^0 = 1.",
          weight: 2,
          required: true,
        },
        {
          id: "inductive-step",
          description: "Assumes k! ≥ 2^(k−1) and shows (k+1)! = (k+1)·k! ≥ (k+1)·2^(k−1) ≥ 2·2^(k−1) = 2^k, using k+1 ≥ 2 for k ≥ 1.",
          weight: 4,
          required: true,
          misconception: {
            id: "skips-inequality-chain",
            description: "Asserts the inductive step without the explicit (k+1)·k! ≥ 2·2^(k-1) inequality chain that makes the step valid.",
            blameConceptId: "factorials",
          },
        },
      ],
    },
    difficulty: 0.55,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["factorials", "set-theory", "counting-methods"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "factorials--explain-negative-factorial-undefined",
    conceptId: "factorials",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Try to extend the recursion n! = n·(n−1)! downward from 0! = 1 to define (−1)!. Explain why this fails, " +
      "and what that failure implies about factorials of negative integers.",
    rubric: {
      elements: [
        {
          id: "division-by-zero",
          description: "Shows the downward extension requires (−1)! = 0!/0 = 1/0, which is undefined.",
          weight: 4,
          required: true,
        },
        {
          id: "implication",
          description: "Concludes the ordinary factorial genuinely stops at n=0, and any extension to negative or non-integer arguments needs a different definition (the Gamma function), not this recursion.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["factorials", "set-theory", "counting-methods"],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "factorials--transfer-chess-move-orderings",
    conceptId: "factorials",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Brute-force searching every ordering of the first n moves of a game requires examining roughly n! " +
      "sequences. Using 15! ≈ 1.3×10^12, explain why even n = 15 makes this practically infeasible.",
    rubric: {
      elements: [
        {
          id: "order-of-magnitude",
          description: "Uses 15! ≈ 1.3×10^12 to estimate that even at a billion evaluations per second, this takes over 1300 seconds (about 22 minutes) just to examine orderings of the first 15 moves.",
          weight: 4,
          required: true,
        },
        {
          id: "growth-outpaces-hardware",
          description: "Explains that because factorial growth outpaces any fixed exponential, no fixed speed-up in hardware rescues brute force as n grows further — each additional move multiplies the work by roughly n, not by a constant factor.",
          weight: 3,
          required: true,
          misconception: {
            id: "faster-hardware-assumed-sufficient",
            description: "Assumes faster hardware alone can keep brute-force search tractable, missing that factorial growth outpaces any constant speed-up.",
            blameConceptId: "factorials",
          },
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.3,
    expectedSeconds: 180,
    prereqClosure: ["factorials", "set-theory", "counting-methods"],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "factorials--transfer-deck-shuffles-order-of-magnitude",
    conceptId: "factorials",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The number of distinct shuffles of a 52-card deck is 52! ≈ 8×10^67. Using orders of magnitude, explain " +
      "why this vastly exceeds the number of seconds since the Big Bang (~4×10^17), while it does NOT exceed " +
      "the number of atoms in the observable universe (~10^80).",
    rubric: {
      elements: [
        {
          id: "compares-to-seconds",
          description: "Shows 52!/4×10^17 ≈ 2×10^50, so 52! is vastly larger than the number of seconds since the Big Bang.",
          weight: 3,
          required: true,
        },
        {
          id: "compares-to-atoms",
          description: "Notes 8×10^67 is smaller than 10^80, so 52! does not exceed the number of atoms in the observable universe, correcting the popular but inaccurate 'more shuffles than atoms in the universe' claim.",
          weight: 3,
          required: true,
          misconception: {
            id: "deck-shuffles-exceed-universe-atoms",
            description: "Repeats the popular but numerically incorrect claim that 52! exceeds the number of atoms in the observable universe.",
            blameConceptId: "factorials",
          },
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.3,
    expectedSeconds: 210,
    prereqClosure: ["factorials", "set-theory", "counting-methods"],
    source: AUTHORED_DM,
    status: "live",
  },

  // =====================================================================
  // Permutations (`permutations`) — ancestors: set-theory, counting-methods, factorials
  // =====================================================================
  {
    id: "permutations--recall-definition",
    conceptId: "permutations",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "P(n,k) computes:",
    choices: [
      { id: "a", text: "the number of ordered selections of k objects from n distinct objects, without repetition", correct: true },
      {
        id: "b",
        text: "the number of unordered selections of k objects from n distinct objects",
        correct: false,
        misconception: {
          id: "permutation-confused-with-combination",
          description: "Describes an unordered selection, which is combinations, not permutations.",
          blameConceptId: "permutations",
        },
      },
      {
        id: "c",
        text: "the number of ordered selections of k objects from n, with repetition allowed",
        correct: false,
        misconception: {
          id: "permutation-allows-repetition",
          description: "Allows repetition, which P(n,k) does not — that variant is n^k instead.",
          blameConceptId: "permutations",
        },
      },
      {
        id: "d",
        text: "the same quantity as 'n choose k'",
        correct: false,
        misconception: {
          id: "permutation-mislabeled-as-choose",
          description: "Mislabels P(n,k) with the 'n choose k' phrase, which refers to C(n,k), a different quantity.",
          blameConceptId: "permutations",
        },
      },
    ],
    difficulty: -1.05,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["permutations", "set-theory", "counting-methods", "factorials"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "permutations--recall-equal-to-n-factorial",
    conceptId: "permutations",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following equal n!? Select all that apply.",
    choices: [
      { id: "a", text: "P(n,n)", correct: true },
      { id: "b", text: "P(n,n−1)", correct: true },
      {
        id: "c",
        text: "P(n,2), for every n",
        correct: false,
        misconception: {
          id: "p-n-2-assumed-equal-n-factorial",
          description: "Claims P(n,2) = n! for every n; this only coincides for small n and is false in general (P(n,2) = n(n-1)).",
          blameConceptId: "permutations",
        },
      },
      {
        id: "d",
        text: "P(n,0)",
        correct: false,
        misconception: {
          id: "p-n-0-assumed-n-factorial",
          description: "Claims P(n,0) = n!, but P(n,0) = 1 by definition (an ordered selection of zero objects).",
          blameConceptId: "permutations",
        },
      },
      {
        id: "e",
        text: "(n−1)!, when computing P(n,n)",
        correct: false,
        misconception: {
          id: "p-n-n-confused-with-circular",
          description: "Confuses P(n,n) with the circular-permutation count (n-1)!, which applies only when rotations are considered identical.",
          blameConceptId: "permutations",
        },
      },
    ],
    difficulty: -0.75,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["permutations", "set-theory", "counting-methods", "factorials"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "permutations--apply-p-nine-two",
    conceptId: "permutations",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Compute P(9,2). Give a whole number.",
    answerKey: 72,
    tolerance: 0.001,
    difficulty: -0.15,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["permutations", "set-theory", "counting-methods", "factorials"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "permutations--apply-officer-roles",
    conceptId: "permutations",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A president, vice-president, and secretary are chosen from 10 candidates, with no one holding two roles. " +
      "How many ways can the three roles be filled? Give a whole number.",
    answerKey: 720,
    tolerance: 0.001,
    difficulty: 0.25,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["permutations", "set-theory", "counting-methods", "factorials"],
    source: ROSEN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "permutations--explain-derive-formula",
    conceptId: "permutations",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Starting from the multiplication-principle product n·(n−1)·⋯·(n−k+1), derive the formula " +
      "P(n,k) = n!/(n−k)!.",
    rubric: {
      elements: [
        {
          id: "writes-k-factor-product",
          description: "Writes the k-factor descending product n·(n−1)·⋯·(n−k+1) from the multiplication principle.",
          weight: 2,
          required: true,
        },
        {
          id: "multiply-divide-step",
          description: "Multiplies and divides by (n−k)! to show n! = [n(n−1)⋯(n−k+1)]·(n−k)!, then divides both sides by (n−k)! to recover the product as n!/(n−k)!.",
          weight: 4,
          required: true,
          misconception: {
            id: "formula-quoted-not-derived",
            description: "States n!/(n-k)! as the answer without showing the multiply-and-divide step connecting it to the k-factor product.",
            blameConceptId: "permutations",
          },
        },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["permutations", "set-theory", "counting-methods", "factorials"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "permutations--explain-k-greater-than-n",
    conceptId: "permutations",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why P(n,k) should be treated as undefined (or 0) when k > n, using both the ordered-selection " +
      "definition and what happens to the formula n!/(n−k)!.",
    rubric: {
      elements: [
        {
          id: "combinatorial-impossibility",
          description: "Explains that with only n distinct objects, an ordered selection of k > n objects without repetition is impossible — you run out of objects before filling all k slots.",
          weight: 3,
          required: true,
        },
        {
          id: "formula-breakdown",
          description: "Notes the formula's denominator (n−k)! would be a factorial of a negative integer, which is undefined, consistent with the combinatorial impossibility.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["permutations", "set-theory", "counting-methods", "factorials"],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "permutations--transfer-relay-team-vs-order",
    conceptId: "permutations",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A relay race has 4 runners chosen from a team of 9, run in a specific leg order. Separately, a coach " +
      "wants to know how many ways to choose which 4 of the 9 make the relay team at all, ignoring order. " +
      "Compute both numbers and explain why one is exactly 4! times the other.",
    rubric: {
      elements: [
        {
          id: "computes-both-numbers",
          description: "Computes P(9,4) = 3024 and C(9,4) = 126 (or correctly cites both).",
          weight: 3,
          required: true,
        },
        {
          id: "explains-ratio",
          description: "Explains the ratio 4! = 24 is exactly the number of ways to order any fixed group of 4 runners into the 4 legs, so choosing the team and then assigning legs recreates every ordered selection exactly once.",
          weight: 3,
          required: true,
          misconception: {
            id: "ratio-unexplained",
            description: "States the numbers agree with a 4! ratio without explaining why assigning legs to a fixed team reproduces every ordered selection.",
            blameConceptId: "permutations",
          },
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.3,
    expectedSeconds: 180,
    prereqClosure: ["permutations", "set-theory", "counting-methods", "factorials", "combinations"],
    source: ROSEN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "permutations--transfer-cipher-key-space",
    conceptId: "permutations",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A permutation cipher's key on an n-symbol block is one of the n! rearrangements of the block. Explain " +
      "why choosing such a key is fundamentally a permutations problem rather than a combinations problem, and " +
      "why this matters for the size of the key space.",
    rubric: {
      elements: [
        {
          id: "bijection-not-subset",
          description: "Explains the key is a full ordering (bijection) of positions to positions, not a subset — every distinct arrangement scrambles the block differently, so order matters and it's a permutation, not a combination.",
          weight: 4,
          required: true,
          misconception: {
            id: "cipher-key-treated-as-subset-choice",
            description: "Treats choosing a cipher key as selecting a subset of symbols rather than an ordering of all of them.",
            blameConceptId: "permutations",
          },
        },
        {
          id: "key-space-implication",
          description: "Notes the key space P(n,n) = n! is dramatically larger than any C(n,k) for k < n, which is why even modest block sizes give astronomically large key spaces.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.3,
    expectedSeconds: 180,
    prereqClosure: ["permutations", "set-theory", "counting-methods", "factorials"],
    source: AUTHORED_DM,
    status: "live",
  },

  // =====================================================================
  // Combinations (`combinations`) — ancestors: set-theory, counting-methods, factorials, permutations
  // =====================================================================
  {
    id: "combinations--recall-formula",
    conceptId: "combinations",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "C(n,k) equals:",
    choices: [
      { id: "a", text: "n! / (k!(n−k)!)", correct: true },
      {
        id: "b",
        text: "n! / (n−k)!",
        correct: false,
        misconception: {
          id: "combination-missing-k-factorial",
          description: "Omits the k! divisor, giving P(n,k) instead of C(n,k).",
          blameConceptId: "combinations",
        },
      },
      {
        id: "c",
        text: "n! / k!",
        correct: false,
        misconception: {
          id: "combination-missing-n-minus-k-factorial",
          description: "Omits the (n−k)! divisor entirely, so it doesn't reduce to the correct count.",
          blameConceptId: "combinations",
        },
      },
      {
        id: "d",
        text: "k! / (n!(n−k)!)",
        correct: false,
        misconception: {
          id: "combination-inverted",
          description: "Inverts the numerator and denominator relative to the correct formula.",
          blameConceptId: "combinations",
        },
      },
    ],
    difficulty: -0.85,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["combinations", "set-theory", "counting-methods", "factorials", "permutations"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "combinations--recall-identities",
    conceptId: "combinations",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which identities are correct? Select all that apply.",
    choices: [
      { id: "a", text: "C(n,k) = C(n,n−k)", correct: true },
      { id: "b", text: "C(n,0) = 1", correct: true },
      { id: "c", text: "C(n,k) = C(n−1,k−1) + C(n−1,k)", correct: true },
      {
        id: "d",
        text: "C(n,k) = P(n,k) × k!",
        correct: false,
        misconception: {
          id: "combination-multiplied-instead-of-divided",
          description: "Multiplies by k! instead of dividing, inverting the overcounting-removal step.",
          blameConceptId: "combinations",
        },
      },
      {
        id: "e",
        text: "C(n,1) = 1 for all n",
        correct: false,
        misconception: {
          id: "c-n-1-assumed-one",
          description: "Claims C(n,1) = 1, but choosing 1 element from n has n ways, so C(n,1) = n.",
          blameConceptId: "combinations",
        },
      },
    ],
    difficulty: -0.55,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["combinations", "set-theory", "counting-methods", "factorials", "permutations"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "combinations--apply-c-eleven-three",
    conceptId: "combinations",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Compute C(11,3). Give a whole number.",
    answerKey: 165,
    tolerance: 0.001,
    difficulty: 0.05,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["combinations", "set-theory", "counting-methods", "factorials", "permutations"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "combinations--apply-pizza-toppings",
    conceptId: "combinations",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A pizza shop offers 10 toppings. How many different 4-topping pizzas can be made, with each topping used " +
      "at most once and order irrelevant? Give a whole number.",
    answerKey: 210,
    tolerance: 0.001,
    difficulty: 0.45,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["combinations", "set-theory", "counting-methods", "factorials", "permutations"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "combinations--explain-symmetry-bijection",
    conceptId: "combinations",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Prove C(n,k) = C(n,n−k) using a combinatorial (bijective) argument, not the factorial algebra.",
    rubric: {
      elements: [
        {
          id: "complement-bijection",
          description: "Describes the bijection: every chosen k-subset determines a unique (n−k)-subset, its complement, and vice versa.",
          weight: 4,
          required: true,
        },
        {
          id: "concludes-equal-size",
          description: "Concludes this pairs every k-subset with exactly one (n−k)-subset, so the two collections have the same size.",
          weight: 2,
          required: true,
          misconception: {
            id: "symmetry-proved-algebraically-only",
            description: "Falls back on the factorial-symmetry algebra instead of the requested combinatorial complement argument.",
            blameConceptId: "combinations",
          },
        },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["combinations", "set-theory", "counting-methods", "factorials", "permutations"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "combinations--explain-poker-hand-overcount",
    conceptId: "combinations",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A student computes the number of 5-card poker hands as P(52,5) instead of C(52,5) and gets an answer " +
      "120 times too large. Explain precisely where the factor of 120 comes from.",
    rubric: {
      elements: [
        {
          id: "names-5-factorial",
          description: "Identifies 120 = 5!, the number of orderings of any fixed 5-card hand.",
          weight: 3,
          required: true,
        },
        {
          id: "explains-overcount-mechanism",
          description: "Explains P(52,5) counts every ordered deal as distinct, so each actual (unordered) hand is counted once per each of its 5! internal orderings.",
          weight: 3,
          required: true,
          misconception: {
            id: "overcount-source-unnamed",
            description: "Notes the answer is 120× too large without identifying that 120 = 5! comes from the hand's internal orderings.",
            blameConceptId: "combinations",
          },
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.3,
    expectedSeconds: 150,
    prereqClosure: ["combinations", "set-theory", "counting-methods", "factorials", "permutations"],
    source: ROSEN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "combinations--transfer-pascal-row-sum",
    conceptId: "combinations",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Row n of Pascal's triangle has entries C(n,0), C(n,1), ..., C(n,n). Explain why this row sums to 2^n, " +
      "connecting the sum back to `counting-methods`'s idea of counting subsets.",
    rubric: {
      elements: [
        {
          id: "subset-count-connection",
          description: "Connects Σ_k C(n,k) to the total number of subsets of an n-element set — each subset has some size k, and summing C(n,k) over all sizes counts every subset exactly once.",
          weight: 3,
          required: true,
        },
        {
          id: "derives-2n-independently",
          description: "Derives 2^n independently via the multiplication principle: each of the n elements has 2 independent choices (in or out of the subset).",
          weight: 3,
          required: true,
          misconception: {
            id: "row-sum-asserted-not-derived",
            description: "States the row sums to 2^n without connecting it to counting subsets or the independent in/out choice per element.",
            blameConceptId: "combinations",
          },
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.3,
    expectedSeconds: 180,
    prereqClosure: ["combinations", "set-theory", "counting-methods", "factorials", "permutations"],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "combinations--transfer-birthday-problem-ordering",
    conceptId: "combinations",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The birthday problem counts the complementary event ('all n birthdays distinct') using P(365,n), a " +
      "permutation, rather than C(365,n), a combination. Explain why, even though we only care whether any two " +
      "people share a birthday.",
    rubric: {
      elements: [
        {
          id: "people-are-distinguishable",
          description:
            "Explains the n people are distinguishable individuals, each assigned a specific birthday, so the outcome is an ordered assignment (person 1's birthday, person 2's birthday, ...) — swapping which day goes to which person is a genuinely different assignment.",
          weight: 4,
          required: true,
          misconception: {
            id: "people-treated-as-indistinguishable",
            description: "Treats the sample space as an unordered set of days used, discarding which specific person got which day, and so reaches for C(365,n) instead of the ordered count.",
            blameConceptId: "combinations",
          },
        },
        {
          id: "contrasts-with-combination-framing",
          description: "Notes C(365,n) would only be correct if we cared solely about which set of days was used, not which person had which birthday.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.3,
    expectedSeconds: 180,
    prereqClosure: ["combinations", "set-theory", "counting-methods", "factorials", "permutations"],
    source: AUTHORED_DM,
    status: "live",
  },

  // =====================================================================
  // Stars and Bars (`stars-and-bars`) — ancestors: set-theory, counting-methods, factorials,
  // permutations, combinations
  // =====================================================================
  {
    id: "stars-and-bars--recall-formula",
    conceptId: "stars-and-bars",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The number of ways to distribute n identical items into k labeled groups, empty groups allowed, is:",
    choices: [
      { id: "a", text: "C(n+k−1, k−1)", correct: true },
      {
        id: "b",
        text: "C(n,k)",
        correct: false,
        misconception: {
          id: "distribution-treated-as-plain-combination",
          description: "Uses the plain combination formula, which doesn't account for repetition of identical items across groups.",
          blameConceptId: "stars-and-bars",
        },
      },
      {
        id: "c",
        text: "n^k",
        correct: false,
        misconception: {
          id: "distribution-treated-as-ordered-with-repetition",
          description: "Treats each of the n items as independently choosing among k groups as if the items were distinguishable, which overcounts since the items are identical.",
          blameConceptId: "stars-and-bars",
        },
      },
      {
        id: "d",
        text: "k^n",
        correct: false,
        misconception: {
          id: "n-and-k-roles-swapped",
          description: "Swaps the roles of n and k relative to the (already-wrong) n^k form, compounding the identical-items error.",
          blameConceptId: "stars-and-bars",
        },
      },
    ],
    difficulty: -0.65,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["stars-and-bars", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "stars-and-bars--recall-correct-scenarios",
    conceptId: "stars-and-bars",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which scenarios are correctly modeled by stars and bars (as opposed to permutations or combinations)? Select all that apply.",
    choices: [
      { id: "a", text: "distributing 20 identical stickers among 5 kids, some kids may get none", correct: true },
      { id: "b", text: "counting nonnegative integer solutions to x1+x2+x3 = 15", correct: true },
      { id: "c", text: "counting positive integer solutions to x1+x2 = 8 (after a shift-by-one substitution)", correct: true },
      {
        id: "d",
        text: "choosing 5 distinct books from a shelf of 20 to take home",
        correct: false,
        misconception: {
          id: "distinct-item-choice-treated-as-distribution",
          description: "Applies stars and bars to choosing distinct books, but the books are distinguishable and not being distributed into groups — this is a plain combination, C(20,5).",
          blameConceptId: "stars-and-bars",
        },
      },
      {
        id: "e",
        text: "ranking 5 runners by finish order",
        correct: false,
        misconception: {
          id: "ranking-treated-as-distribution",
          description: "Applies stars and bars to a ranking problem, which is a permutation (order among distinct runners), not a distribution of identical items.",
          blameConceptId: "stars-and-bars",
        },
      },
    ],
    difficulty: -0.35,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["stars-and-bars", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "stars-and-bars--apply-four-variable-solutions",
    conceptId: "stars-and-bars",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "How many nonnegative integer solutions are there to x1+x2+x3+x4 = 9? Give a whole number.",
    answerKey: 220,
    tolerance: 0.001,
    difficulty: 0.25,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["stars-and-bars", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "stars-and-bars--apply-nonempty-apples",
    conceptId: "stars-and-bars",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "20 identical apples are distributed among 5 children, and each child must receive at least 1 apple. How " +
      "many distributions are there? Give a whole number.",
    answerKey: 3876,
    tolerance: 0.001,
    difficulty: 0.65,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["stars-and-bars", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "stars-and-bars--explain-derive-nonempty-formula",
    conceptId: "stars-and-bars",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Derive the formula for distributing n identical items into k labeled groups with each group receiving " +
      "at least 1, by reducing it to the standard (empty-allowed) stars-and-bars formula.",
    rubric: {
      elements: [
        {
          id: "pre-distribute-step",
          description: "Pre-distributes 1 item to each of the k groups, using up k of the n items and leaving n−k items to distribute freely.",
          weight: 3,
          required: true,
        },
        {
          id: "applies-standard-formula",
          description: "Applies the standard formula to the remaining n−k items among the same k groups: C((n−k)+k−1, k−1) = C(n−1, k−1).",
          weight: 3,
          required: true,
          misconception: {
            id: "nonempty-formula-quoted-not-derived",
            description: "States C(n−1,k−1) as the answer without the pre-distribution step that reduces the nonempty case to the standard formula.",
            blameConceptId: "stars-and-bars",
          },
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["stars-and-bars", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "stars-and-bars--explain-symmetric-form",
    conceptId: "stars-and-bars",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A student is unsure whether to write the stars-and-bars count as C(n+k−1,k−1) or C(n+k−1,n). Explain why " +
      "these are the same number, and when each form is more natural to use.",
    rubric: {
      elements: [
        {
          id: "cites-symmetry-identity",
          description: "Cites the symmetry identity C(m,j) = C(m,m−j) with m = n+k−1, noting (n+k−1)−(k−1) = n, so the two forms are identical.",
          weight: 3,
          required: true,
          misconception: {
            id: "forms-asserted-equal-without-identity",
            description: "Asserts the two forms give the same number without invoking the symmetry identity that shows why.",
            blameConceptId: "stars-and-bars",
          },
        },
        {
          id: "explains-natural-use",
          description: "Notes C(n+k−1,k−1) is natural when thinking 'choose bar positions' while C(n+k−1,n) is natural when thinking 'choose star positions'.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["stars-and-bars", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "stars-and-bars--transfer-bosons-vs-fermions",
    conceptId: "stars-and-bars",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The number of ways to distribute n indistinguishable bosons among k distinguishable energy levels (any " +
      "number per level) uses the stars-and-bars formula. Explain what feature of bosons makes this the same " +
      "counting problem as identical candies among children, and contrast briefly with fermions (at most 1 " +
      "particle per level).",
    rubric: {
      elements: [
        {
          id: "boson-correspondence",
          description: "Identifies bosons as indistinguishable from one another, with any number allowed per labeled level, exactly matching the identical-items/labeled-groups structure of stars and bars.",
          weight: 3,
          required: true,
        },
        {
          id: "fermion-contrast",
          description: "Explains that with at most 1 fermion per level, the problem becomes choosing which levels are occupied — a plain combination C(k,n), not stars and bars, since no level can repeat.",
          weight: 3,
          required: true,
          misconception: {
            id: "fermion-case-also-treated-as-stars-and-bars",
            description: "Applies the stars-and-bars formula to the fermion case as well, missing that the at-most-one-per-level constraint changes it to a plain combination count.",
            blameConceptId: "stars-and-bars",
          },
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.3,
    expectedSeconds: 180,
    prereqClosure: ["stars-and-bars", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "stars-and-bars--transfer-labeled-vs-unlabeled-six-two",
    conceptId: "stars-and-bars",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain why stars and bars gives the labeled-groups count, and why this is generally larger than the " +
      "corresponding unlabeled count (integer partitions). Illustrate with n = 6 items split into k = 2 groups.",
    rubric: {
      elements: [
        {
          id: "computes-both-counts",
          description: "Computes the labeled count C(7,1) = 7 (or lists the 7 ordered pairs) and the unlabeled count as the partitions of 6 into at most 2 parts: 6; 5+1; 4+2; 3+3, giving 4.",
          weight: 3,
          required: true,
        },
        {
          id: "explains-the-gap",
          description: "Explains the gap arises because swapping which group gets the larger amount produces a different labeled outcome (e.g. (1,5) vs (5,1)) but is the same unlabeled partition (5+1).",
          weight: 3,
          required: true,
          misconception: {
            id: "labeled-unlabeled-counts-assumed-equal",
            description: "Assumes the labeled and unlabeled counts must agree, missing that erasing group labels collapses many distinct labeled outcomes into one partition.",
            blameConceptId: "stars-and-bars",
          },
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.3,
    expectedSeconds: 210,
    prereqClosure: ["stars-and-bars", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: AUTHORED_DM,
    status: "live",
  },

  // =====================================================================
  // Integer Partitions (`integer-partitions`) — ancestors: set-theory, counting-methods,
  // factorials, permutations, combinations, stars-and-bars
  // =====================================================================
  {
    id: "integer-partitions--recall-definition",
    conceptId: "integer-partitions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A partition of n is:",
    choices: [
      { id: "a", text: "a way of writing n as a sum of positive integers where order does not matter", correct: true },
      {
        id: "b",
        text: "a way of writing n as a sum of positive integers where order matters",
        correct: false,
        misconception: {
          id: "partition-confused-with-composition",
          description: "Describes an ordered sum (a composition), which is a different, larger-counted object than a partition.",
          blameConceptId: "integer-partitions",
        },
      },
      {
        id: "c",
        text: "a way of splitting n identical items among k labeled groups",
        correct: false,
        misconception: {
          id: "partition-confused-with-stars-and-bars",
          description: "Describes the stars-and-bars distribution problem (labeled groups), not the unlabeled partition problem.",
          blameConceptId: "integer-partitions",
        },
      },
      {
        id: "d",
        text: "a collection of subsets of an n-element set",
        correct: false,
        misconception: {
          id: "partition-confused-with-set-partition",
          description: "Confuses an integer partition of n with a set partition of an n-element set — a different and unrelated combinatorial object.",
          blameConceptId: "integer-partitions",
        },
      },
    ],
    difficulty: -0.45,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: [
      "integer-partitions",
      "set-theory",
      "counting-methods",
      "factorials",
      "permutations",
      "combinations",
      "stars-and-bars",
    ],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "integer-partitions--recall-true-statements",
    conceptId: "integer-partitions",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about integer partitions are true? Select all that apply.",
    choices: [
      { id: "a", text: "3+1+1 and 1+3+1 represent the same partition of 5", correct: true },
      { id: "b", text: "By convention, a partition's parts are listed in nonincreasing order", correct: true },
      { id: "c", text: "p(4) = 5", correct: true },
      {
        id: "d",
        text: "p(n) has a simple closed-form formula analogous to C(n+k−1,k−1)",
        correct: false,
        misconception: {
          id: "partition-count-assumed-closed-form",
          description: "Assumes p(n) has a clean binomial-style closed form; no such formula exists, which is exactly what makes partitions harder than stars and bars.",
          blameConceptId: "integer-partitions",
        },
      },
      {
        id: "e",
        text: "The number of partitions of n into exactly k parts is the same quantity as p(n) itself",
        correct: false,
        misconception: {
          id: "fixed-k-partition-count-confused-with-p-n",
          description: "Confuses the narrower fixed-part-count quantity with p(n), which sums over every possible part count from 1 to n.",
          blameConceptId: "integer-partitions",
        },
      },
    ],
    difficulty: -0.15,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: [
      "integer-partitions",
      "set-theory",
      "counting-methods",
      "factorials",
      "permutations",
      "combinations",
      "stars-and-bars",
    ],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "integer-partitions--apply-p-three",
    conceptId: "integer-partitions",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "What is p(3), the number of partitions of 3? Give a whole number.",
    answerKey: 3,
    tolerance: 0.001,
    difficulty: 0.45,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: [
      "integer-partitions",
      "set-theory",
      "counting-methods",
      "factorials",
      "permutations",
      "combinations",
      "stars-and-bars",
    ],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "integer-partitions--apply-six-exactly-three-parts",
    conceptId: "integer-partitions",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "How many partitions of 6 have exactly 3 parts? Give a whole number.",
    answerKey: 3,
    tolerance: 0.001,
    difficulty: 0.85,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: [
      "integer-partitions",
      "set-theory",
      "counting-methods",
      "factorials",
      "permutations",
      "combinations",
      "stars-and-bars",
    ],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "integer-partitions--explain-recurrence",
    conceptId: "integer-partitions",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Let p(n,k) denote the number of partitions of n into at most k parts. State the recurrence " +
      "p(n,k) = p(n−1,k−1) + p(n−k,k), and verify it on the case n=5, k=2.",
    rubric: {
      elements: [
        {
          id: "states-recurrence",
          description: "States a valid recurrence relating p(n,k) to partitions with fewer allowed parts or a smaller total, splitting on whether the partition uses fewer than k parts or has every part at least 1 (subtracting 1 from each of k parts).",
          weight: 3,
          required: true,
        },
        {
          id: "verifies-small-case",
          description: "Verifies on n=5, k=2: p(5,2) = 3 (5; 4+1; 3+2), and checks p(4,1) + p(3,2) = 1 + 2 = 3.",
          weight: 3,
          required: true,
          misconception: {
            id: "recurrence-unverified",
            description: "States the recurrence without checking it against a concrete small case, so an error in the recurrence would go unnoticed.",
            blameConceptId: "integer-partitions",
          },
        },
        {
          id: "explains-no-closed-form",
          description: "Notes the recurrence shifts two indices at once (n and k), unlike stars-and-bars' single clean binomial coefficient — which is why no simple product/binomial formula captures p(n) in general.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.4,
    expectedSeconds: 210,
    prereqClosure: [
      "integer-partitions",
      "set-theory",
      "counting-methods",
      "factorials",
      "permutations",
      "combinations",
      "stars-and-bars",
    ],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "integer-partitions--explain-many-to-one-mapping",
    conceptId: "integer-partitions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, using the labeled-vs-unlabeled distinction, why p(n) is never larger than the stars-and-bars " +
      "count of distributing n items into k labeled groups, and why the gap widens as n grows.",
    rubric: {
      elements: [
        {
          id: "many-to-one-mapping",
          description: "Explains every labeled distribution maps to some unlabeled partition (by forgetting which group got which amount), and this map is many-to-one (several labeled distributions collapse to one partition), so there can never be more partitions than labeled distributions.",
          weight: 4,
          required: true,
        },
        {
          id: "gap-widens",
          description: "Explains the gap widens because the number of ways to permute distinct part sizes among labeled groups grows large, while p(n) itself grows comparatively slowly.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.2,
    expectedSeconds: 180,
    prereqClosure: [
      "integer-partitions",
      "set-theory",
      "counting-methods",
      "factorials",
      "permutations",
      "combinations",
      "stars-and-bars",
    ],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "integer-partitions--transfer-young-diagram-conjugation",
    conceptId: "integer-partitions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A Young diagram represents a partition as left-justified rows of boxes, one row per part, in " +
      "nonincreasing order. Explain how reading a diagram's columns instead of its rows shows that the number " +
      "of partitions of n into at most k parts equals the number of partitions of n into parts of size at " +
      "most k (conjugation).",
    rubric: {
      elements: [
        {
          id: "describes-transpose",
          description: "Explains transposing the diagram (rows ↔ columns) turns a partition with at most k rows (at most k parts) into one with at most k columns (every part, now a column height, is at most k).",
          weight: 4,
          required: true,
        },
        {
          id: "involution-bijection",
          description: "Notes transposition is its own inverse (an involution) and maps partitions of n to partitions of n bijectively, so the two counts must be exactly equal.",
          weight: 3,
          required: true,
          misconception: {
            id: "conjugation-not-recognized-as-bijection",
            description: "Describes the transpose operation without recognizing it as a bijection (involution) between the two sets of partitions, leaving the equal-count conclusion unjustified.",
            blameConceptId: "integer-partitions",
          },
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.3,
    expectedSeconds: 210,
    prereqClosure: [
      "integer-partitions",
      "set-theory",
      "counting-methods",
      "factorials",
      "permutations",
      "combinations",
      "stars-and-bars",
    ],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "integer-partitions--transfer-generating-function",
    conceptId: "integer-partitions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The generating function ∏_{i≥1} 1/(1−x^i) encodes p(n) as the coefficient of x^n. Explain, connecting to " +
      "how the geometric series 1+x^i+x^{2i}+⋯ represents 'use 0, 1, 2, ... copies of part i', why the product " +
      "correctly counts partitions.",
    rubric: {
      elements: [
        {
          id: "geometric-series-meaning",
          description: "Explains each factor 1/(1−x^i) = 1+x^i+x^{2i}+⋯ represents choosing how many copies of part i to use (0, 1, 2, ...), with the exponent tracking the total contributed to n.",
          weight: 3,
          required: true,
        },
        {
          id: "product-counts-partitions",
          description: "Explains multiplying the factors for all i≥1 and expanding by the distributive law, each way of picking one term from each factor (one multiplicity per part size) contributes x^n exactly once for each distinct partition of n.",
          weight: 4,
          required: true,
          misconception: {
            id: "generating-function-treated-as-formula-not-explained",
            description: "Cites the generating function as giving p(n) without explaining why the coefficient-extraction corresponds to counting partitions.",
            blameConceptId: "integer-partitions",
          },
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.3,
    expectedSeconds: 210,
    prereqClosure: [
      "integer-partitions",
      "set-theory",
      "counting-methods",
      "factorials",
      "permutations",
      "combinations",
      "stars-and-bars",
    ],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },

  // =====================================================================
  // Binomial Theorem (`binomial-theorem`) — ancestors: set-theory, counting-methods, factorials,
  // permutations, combinations
  // =====================================================================
  {
    id: "binomial-theorem--recall-expansion",
    conceptId: "binomial-theorem",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The binomial theorem expands (x+y)^n as:",
    choices: [
      { id: "a", text: "Σ_{k=0}^{n} C(n,k) x^k y^{n−k}", correct: true },
      {
        id: "b",
        text: "Σ_{k=0}^{n} C(n,k) x^k y^k",
        correct: false,
        misconception: {
          id: "y-exponent-wrong",
          description: "Uses y^k instead of y^{n-k}, breaking the requirement that each term's exponents sum to n.",
          blameConceptId: "binomial-theorem",
        },
      },
      {
        id: "c",
        text: "Σ_{k=0}^{n} x^k y^{n−k}",
        correct: false,
        misconception: {
          id: "coefficient-dropped",
          description: "Drops the binomial coefficient C(n,k) entirely, giving the wrong weight to every term but the endpoints.",
          blameConceptId: "binomial-theorem",
        },
      },
      {
        id: "d",
        text: "Σ_{k=0}^{n} k · x^k y^{n−k}",
        correct: false,
        misconception: {
          id: "coefficient-replaced-with-k",
          description: "Uses k as the coefficient instead of C(n,k), which is not what expanding the product of n factors produces.",
          blameConceptId: "binomial-theorem",
        },
      },
    ],
    difficulty: -0.85,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["binomial-theorem", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "binomial-theorem--recall-identities",
    conceptId: "binomial-theorem",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which identities follow from the binomial theorem? Select all that apply.",
    choices: [
      { id: "a", text: "Setting x=y=1 gives Σ_k C(n,k) = 2^n", correct: true },
      { id: "b", text: "Setting x=1, y=−1 gives Σ_k (−1)^k C(n,k) = 0 for n ≥ 1", correct: true },
      { id: "c", text: "(x+y)^n has exactly n+1 terms when fully expanded (x, y formal variables)", correct: true },
      {
        id: "d",
        text: "The coefficient of x^k y^{n−k} in (x+y)^n is P(n,k), not C(n,k)",
        correct: false,
        misconception: {
          id: "binomial-coefficient-confused-with-permutation",
          description: "Uses P(n,k) as the coefficient instead of C(n,k); the expansion counts which factors contribute x, an unordered choice.",
          blameConceptId: "binomial-theorem",
        },
      },
      {
        id: "e",
        text: "Setting x=y=1 gives Σ_k C(n,k) = n!",
        correct: false,
        misconception: {
          id: "row-sum-confused-with-n-factorial",
          description: "Claims the row sum equals n! rather than 2^n, confusing two unrelated quantities.",
          blameConceptId: "binomial-theorem",
        },
      },
    ],
    difficulty: -0.55,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["binomial-theorem", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "binomial-theorem--apply-coefficient-x3y4",
    conceptId: "binomial-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Find the coefficient of x^3y^4 in (x+y)^7. Give a whole number.",
    answerKey: 35,
    tolerance: 0.001,
    difficulty: 0.05,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["binomial-theorem", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: LEVIN_DISCRETE_MATH,
    status: "live",
  },
  {
    id: "binomial-theorem--apply-row-sum-five",
    conceptId: "binomial-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Compute Σ_{k=0}^{5} C(5,k) directly by adding the six coefficients. Give a whole number.",
    answerKey: 32,
    tolerance: 0.001,
    difficulty: 0.45,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["binomial-theorem", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "binomial-theorem--explain-combinatorial-proof",
    conceptId: "binomial-theorem",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Prove the binomial theorem for a positive integer n by a combinatorial argument, expanding " +
      "(x+y)^n = (x+y)(x+y)⋯(x+y) (n factors) directly.",
    rubric: {
      elements: [
        {
          id: "pick-x-or-y-per-factor",
          description: "Explains expanding the product means picking either x or y from each of the n factors and multiplying the choices together.",
          weight: 3,
          required: true,
        },
        {
          id: "counts-ways-to-choose-k-factors",
          description: "Explains a term x^k y^{n−k} arises from every way of choosing which k of the n factors contribute an x, and there are C(n,k) such ways.",
          weight: 4,
          required: true,
          misconception: {
            id: "binomial-theorem-proved-by-induction-instead",
            description: "Substitutes an algebraic or inductive proof for the requested combinatorial 'choose which factors give x' argument.",
            blameConceptId: "binomial-theorem",
          },
        },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["binomial-theorem", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: LLM_MATH_FOR_CS,
    status: "live",
  },
  {
    id: "binomial-theorem--explain-binomial-pmf-sums-to-one",
    conceptId: "binomial-theorem",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A binomial random variable's pmf is P(X=k) = C(n,k) p^k (1−p)^{n−k}. Explain, using the binomial " +
      "theorem, why these probabilities are guaranteed to sum to 1 over k = 0, ..., n.",
    rubric: {
      elements: [
        {
          id: "recognizes-theorem-substitution",
          description: "Recognizes Σ_k C(n,k) p^k (1−p)^{n−k} is exactly the binomial theorem's expansion of (p + (1−p))^n, with x = p and y = 1−p.",
          weight: 4,
          required: true,
        },
        {
          id: "evaluates-to-one",
          description: "Evaluates p + (1−p) = 1, so the sum equals 1^n = 1.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.3,
    expectedSeconds: 150,
    prereqClosure: ["binomial-theorem", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "binomial-theorem--transfer-even-odd-subsets",
    conceptId: "binomial-theorem",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the alternating identity Σ_k (−1)^k C(n,k) = 0 (for n ≥ 1) implies a finite nonempty n-element " +
      "set has exactly as many subsets of even size as of odd size.",
    rubric: {
      elements: [
        {
          id: "splits-even-odd",
          description: "Splits the sum into even-k and odd-k terms: Σ_{k even} C(n,k) − Σ_{k odd} C(n,k) = 0, so the two sums are equal.",
          weight: 3,
          required: true,
        },
        {
          id: "subset-count-interpretation",
          description: "Interprets Σ_{k even} C(n,k) as the total number of even-sized subsets and Σ_{k odd} C(n,k) as the odd-sized ones, since C(n,k) counts k-element subsets.",
          weight: 3,
          required: true,
          misconception: {
            id: "alternating-sum-identity-not-connected-to-subsets",
            description: "Cites the alternating sum identity being zero without connecting the even/odd split to counting even- and odd-sized subsets.",
            blameConceptId: "binomial-theorem",
          },
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.3,
    expectedSeconds: 180,
    prereqClosure: ["binomial-theorem", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: AUTHORED_DM,
    status: "live",
  },
  {
    id: "binomial-theorem--transfer-vandermonde-committee",
    conceptId: "binomial-theorem",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Vandermonde's identity Σ_j C(m,j) C(n,k−j) = C(m+n,k) generalizes the binomial theorem to two groups. " +
      "Explain, with a combinatorial argument (not algebra), why choosing k people from a combined pool of m " +
      "men and n women equals summing, over every possible split j, the ways to choose j men and k−j women.",
    rubric: {
      elements: [
        {
          id: "classifies-by-j",
          description: "Explains the left side classifies every k-person committee from the combined m+n pool by how many of its members are men (j = 0, ..., k), a partition of committees into disjoint cases.",
          weight: 4,
          required: true,
        },
        {
          id: "independent-choice-per-split",
          description: "Explains for each fixed j, the number of committees with exactly j men and k−j women is C(m,j)·C(n,k−j), choosing men and women independently, and summing over j counts every committee exactly once.",
          weight: 3,
          required: true,
          misconception: {
            id: "vandermonde-proved-algebraically-instead",
            description: "Falls back on manipulating the algebraic identity rather than the requested classify-by-j combinatorial argument.",
            blameConceptId: "binomial-theorem",
          },
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.3,
    expectedSeconds: 210,
    prereqClosure: ["binomial-theorem", "set-theory", "counting-methods", "factorials", "permutations", "combinations"],
    source: AUTHORED_DM,
    status: "live",
  },
];
