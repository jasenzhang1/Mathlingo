import type { Item, SourceRef } from "../lib/assessment/types";

/**
 * A worked seed bank — one item per format and cognitive level, so the shapes in
 * `lib/assessment/types.ts` have something concrete standing behind them and the
 * ingest pipeline has fixtures to test against.
 *
 * These are authored items, not a scrape. Where a source is listed at the
 * `restricted` tier it is recorded as the *task skeleton* the item was modelled
 * on — what is being tested and in what form — and the text, the numbers, and
 * the setting are ours. See `assessment.md` §1.2 for why that line exists and
 * exactly where it sits.
 */

const OCW_18_05: SourceRef = {
  id: "mit-ocw-18.05",
  tier: "open",
  title: "MIT 18.05 Introduction to Probability and Statistics (OpenCourseWare)",
  url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/",
  license: "CC-BY-NC-SA-4.0",
};

const BLITZSTEIN: SourceRef = {
  id: "blitzstein-hwang",
  tier: "open",
  title: "Introduction to Probability (Blitzstein & Hwang), free online edition",
  url: "https://projects.iq.harvard.edu/stat110/home",
  license: "free-to-use with attribution; verify before redistribution",
};

const STRANG_18_06: SourceRef = {
  id: "mit-ocw-18.06",
  tier: "open",
  title: "MIT 18.06 Linear Algebra (Strang, OpenCourseWare)",
  url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
  license: "CC-BY-NC-SA-4.0",
};

const CASELLA_BERGER: SourceRef = {
  id: "casella-berger",
  tier: "restricted",
  title: "Statistical Inference (Casella & Berger, 2nd ed.)",
  locator: "Ch. 3, binomial moment exercises",
  rewriteApprovedBy: "pending-review",
};

export const items: Item[] = [
  // --- Bernoulli & Binomial -------------------------------------------------
  {
    id: "bernoulli-binomial--recall-pmf-form",
    conceptId: "bernoulli-binomial",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "X ~ Binomial(n, p). Which expression gives P(X = k) for an integer 0 ≤ k ≤ n?",
    choices: [
      { id: "a", text: "C(n, k) · p^k · (1 − p)^(n − k)", correct: true },
      {
        id: "b",
        text: "p^k · (1 − p)^(n − k)",
        correct: false,
        misconception: {
          id: "forgets-binomial-coefficient",
          description:
            "Gives the probability of one specific ordering of successes and failures, forgetting to count the C(n, k) orderings that all yield k successes.",
          blameConceptId: "binomial-theorem",
        },
      },
      {
        id: "c",
        text: "C(n, k) · p^k · (1 − p)^k",
        correct: false,
        misconception: {
          id: "mismatched-exponents",
          description: "Exponents do not sum to n, so the terms cannot form a partition of the sample space.",
          blameConceptId: "pmf",
        },
      },
      {
        id: "d",
        text: "(k/n) · p · (1 − p)",
        correct: false,
        misconception: {
          id: "confuses-pmf-with-proportion",
          description: "Treats the PMF as a sample proportion rather than a probability of an exact count.",
          blameConceptId: "pmf",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["pmf", "binomial-theorem"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bernoulli-binomial--apply-exactly-k",
    conceptId: "bernoulli-binomial",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    /**
     * The stem said the player "lands {n} first serves" and then asked how many
     * were good — but landing a serve *is* the success, so it stated the answer
     * was n before asking for it. The player attempts n serves; k of them land.
     */
    stem: "A tennis player attempts {n} first serves, each landing independently with probability {p}. What is the probability that exactly {k} of them land? Give a decimal to three places.",
    params: [
      { name: "n", range: [6, 12], integer: true },
      { name: "k", range: [2, 8], integer: true, constraints: ["k <= n"] },
      { name: "p", choices: [0.55, 0.6, 0.62, 0.65, 0.7] },
    ],
    solver: "binomialPmf",
    tolerance: 0.005,
    difficulty: -0.5,
    discrimination: 1.4,
    expectedSeconds: 75,
    prereqClosure: ["pmf", "binomial-theorem", "mutual-independence"],
    source: BLITZSTEIN,
    status: "live",
  },
  /**
   * This item is why `bernoulli-binomial` lists Expectation and Variance as
   * prerequisites: `checkPrereqClosure` blocked it, the block turned out to be
   * a real gap in `concepts.ts` rather than a mis-filed item, and the edges were
   * added. Worth keeping in mind as the first worked example of the closure
   * check doing its job on the graph rather than on the item.
   */
  {
    id: "bernoulli-binomial--explain-variance-max",
    conceptId: "bernoulli-binomial",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten", "spoken"],
    stem: "The variance of a Binomial(n, p) is np(1 − p), which is largest at p = 1/2. Explain why that is the right answer intuitively — not by differentiating, but by saying what p = 1/2 means about the individual trials.",
    rubric: {
      elements: [
        {
          id: "decomposition",
          description:
            "Recognises the binomial as a sum of n independent Bernoulli trials, so the variance is n times the variance of one trial.",
          weight: 2,
          required: true,
          misconception: {
            id: "no-iid-decomposition",
            description:
              "Treats the binomial as an atomic distribution and never decomposes it into independent trials.",
            blameConceptId: "mutual-independence",
          },
        },
        {
          id: "uncertainty-peak",
          description:
            "Argues that a single trial is most unpredictable when the two outcomes are equally likely, and near-deterministic as p approaches 0 or 1.",
          weight: 2,
          required: true,
        },
        {
          id: "independence-additivity",
          description:
            "States that variances add because the trials are independent — the step that fails if the serves were correlated.",
          weight: 1,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-without-argument",
          description:
            "Asserts that variance peaks at 1/2 by symmetry alone, with no claim about what the trials are doing.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["mutual-independence", "variance", "expectation"],
    source: CASELLA_BERGER,
    status: "shadow",
  },

  // --- Bayes' Rule ----------------------------------------------------------
  {
    id: "bayes-rule--transfer-screening",
    conceptId: "bayes-rule",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A screening test for a condition affecting 1 in 1000 people has a 99% true positive rate and a 5% false positive rate. A patient tests positive. A colleague says 'so there's a 99% chance they have it.' Say what your colleague has confused with what, and roughly what the actual probability is.",
    rubric: {
      elements: [
        {
          id: "names-the-swap",
          description:
            "Identifies that P(positive | condition) has been mistaken for P(condition | positive).",
          weight: 3,
          required: true,
          misconception: {
            id: "inverse-conditional",
            description: "Reads a conditional probability backwards — the prosecutor's fallacy.",
            blameConceptId: "conditional-probability",
          },
        },
        {
          id: "base-rate",
          description:
            "Explains that with a 0.1% prevalence, false positives vastly outnumber true positives.",
          weight: 2,
          required: true,
        },
        {
          id: "magnitude",
          description: "Lands on roughly 2% (accept anything in 1%–3%).",
          weight: 2,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.8,
    expectedSeconds: 150,
    prereqClosure: ["conditional-probability", "probability-function"],
    source: OCW_18_05,
    status: "live",
  },

  // --- Rank -----------------------------------------------------------------
  {
    id: "rank--explain-min-bound",
    conceptId: "rank",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten", "spoken"],
    stem: "For an m × n matrix A, why must rank(A) ≤ min(m, n)? Give the argument for both bounds.",
    rubric: {
      elements: [
        {
          id: "column-bound",
          description:
            "rank is the dimension of the column space, which is a subspace of R^m, so it cannot exceed m.",
          weight: 2,
          required: true,
          misconception: {
            id: "column-space-ambient",
            description: "Loses track of which ambient space the column space lives in.",
            blameConceptId: "column-space",
          },
        },
        {
          id: "row-bound",
          description:
            "There are only n columns, so at most n of them can be independent — hence rank ≤ n.",
          weight: 2,
          required: true,
        },
        {
          id: "row-rank-equals-column-rank",
          description:
            "Notes that the same bound falls out of the row space, because row rank equals column rank.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["column-space", "row-space"],
    source: STRANG_18_06,
    status: "live",
  },

  // -------------------------------------------------------------------------
  // Bernoulli & Binomial — the first lesson with a full playable bank.
  // Authored from assessments/bernoulli-binomial.md; every numeric answerKey
  // below was verified by script before being written here.
  // -------------------------------------------------------------------------
  {
    id: "bernoulli-binomial--recall-four-conditions",
    conceptId: "bernoulli-binomial",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "Which conditions must hold for a count to follow a Binomial distribution? Select all that apply.",
    choices: [
      { id: "a", text: "A fixed number of trials, decided in advance", correct: true },
      { id: "b", text: "Each trial has exactly two outcomes", correct: true },
      { id: "c", text: "The same success probability on every trial", correct: true },
      { id: "d", text: "The trials are mutually independent", correct: true },
      {
        id: "e",
        text: "n must be large (at least 30)",
        correct: false,
        misconception: {
          id: "confuses-model-with-approximation",
          description:
            "Confuses the binomial model itself with the large-n condition for its Normal approximation.",
          blameConceptId: "bernoulli-binomial",
        },
      },
      {
        id: "f",
        text: "p must be at least 0.5",
        correct: false,
        misconception: {
          id: "invents-p-constraint",
          description: "Invents a constraint on p; any p in [0,1] is valid.",
          blameConceptId: "bernoulli-binomial",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["mutual-independence", "pmf"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bernoulli-binomial--apply-at-least-one",
    conceptId: "bernoulli-binomial",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A component fails on any given day with probability 0.02, independently of other days. " +
      "Over 30 days, what is the probability of at least one failure? Give a decimal to three places.",
    answerKey: 0.4545,
    tolerance: 0.01,
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["mutual-independence", "pmf"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bernoulli-binomial--apply-inverse-moments",
    conceptId: "bernoulli-binomial",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A binomial distribution has mean 6 and variance 2.4. Find n. " +
      "(Hint: divide the variance by the mean.)",
    answerKey: 10,
    tolerance: 0.001,
    difficulty: 0.9,
    discrimination: 1.7,
    expectedSeconds: 150,
    prereqClosure: ["expectation", "variance"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "bernoulli-binomial--apply-overbooking",
    conceptId: "bernoulli-binomial",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "An airline sells 108 tickets for a 100-seat plane. Each passenger shows up independently " +
      "with probability 0.90. What is the probability the flight is overbooked (more than 100 " +
      "passengers arrive)? Give a decimal to three places.",
    answerKey: 0.143,
    tolerance: 0.01,
    difficulty: 1.5,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["pmf", "mutual-independence"],
    source: BLITZSTEIN,
    status: "live",
  },
  {
    id: "bernoulli-binomial--explain-binomial-coefficient",
    conceptId: "bernoulli-binomial",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "The binomial PMF is C(n,k)·pᵏ(1−p)ⁿ⁻ᵏ. Explain what the C(n,k) factor is counting, " +
      "and what pᵏ(1−p)ⁿ⁻ᵏ alone would give you without it.",
    rubric: {
      elements: [
        {
          id: "one-sequence",
          description:
            "States that pᵏ(1−p)ⁿ⁻ᵏ is the probability of ONE specific ordering of k successes and n−k failures.",
          weight: 2,
          required: true,
          misconception: {
            id: "treats-single-sequence-as-total",
            description:
              "Treats the probability of one ordering as the probability of the whole event.",
            blameConceptId: "pmf",
          },
        },
        {
          id: "counts-orderings",
          description:
            "States that C(n,k) counts how many distinct orderings produce exactly k successes.",
          weight: 2,
          required: true,
          misconception: {
            id: "forgets-binomial-coefficient",
            description: "Omits or misidentifies the counting role of the binomial coefficient.",
            blameConceptId: "binomial-theorem",
          },
        },
        {
          id: "why-multiply",
          description:
            "Notes the orderings are mutually exclusive, so their probabilities add — giving a multiplication by the count.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["binomial-theorem", "pmf"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bernoulli-binomial--transfer-free-throws",
    conceptId: "bernoulli-binomial",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Why can't two free throws by the same player be modelled as Binomial(2, p)? " +
      "Think about player confidence — and say what the violation does to the variance.",
    rubric: {
      elements: [
        {
          id: "names-violation",
          description:
            "Identifies that independence and/or constant p fails: making the first shot can change the probability of making the second.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-independence",
            description: "Applies the binomial without checking whether trials are independent.",
            blameConceptId: "mutual-independence",
          },
        },
        {
          id: "consequence-on-variance",
          description:
            "States the consequence: positive correlation makes Var(X) = 2p(1−p) + 2Cov exceed the binomial's 2p(1−p), so the model understates the spread (more 0s and 2s, fewer 1s).",
          weight: 3,
          required: true,
        },
        {
          id: "honest-caveat",
          description:
            "Bonus: notes the dependence may be small in practice, so the binomial can still be a serviceable approximation — whether a violated assumption matters is quantitative.",
          weight: 1,
        },
      ],
      forbiddenMoves: [
        {
          id: "phrase-without-mechanism",
          description:
            "Answers only 'the trials aren't independent' with no mechanism and no consequence.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["mutual-independence", "variance"],
    source: OCW_18_05,
    status: "live",
  },
];

export const itemsByConcept = new Map<string, Item[]>();
for (const item of items) {
  const bucket = itemsByConcept.get(item.conceptId);
  if (bucket) bucket.push(item);
  else itemsByConcept.set(item.conceptId, [item]);
}
