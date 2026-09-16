import type { Item, SourceRef } from "../lib/assessment/types";
import { graphicalModelsItems } from "./items.graphical-models";
import { statisticsFoundationsItems } from "./items.statistics-foundations";
import { statisticsInferenceItems } from "./items.statistics-inference";
import { statisticsComparisonsItems } from "./items.statistics-comparisons";
import { statisticsNonparametricItems } from "./items.statistics-nonparametric";
import { statisticsTestsItems } from "./items.statistics-tests";
import { mlItems } from "./items-ml";
import { multivariateFormsItems } from "./items.multivariate-forms";
import { pythonItems } from "./items/python";
import { pythonFundamentalsItems } from "./items/python-fundamentals";
import { pythonControlFlowItems } from "./items/python-control-flow";
import { pythonFunctionsItems } from "./items/python-functions";
import { pythonContainersSplitItems } from "./items/python-containers-split";
import { numpyExpandedItems } from "./items/numpy-expanded";
import { pythonCodeExerciseItems } from "./items/python-code-exercises";
import { regressionDiagnosticsItems } from "./items/regression-diagnostics";
import { regressionExtensionsItems } from "./items/regression-extensions";
import { regressionFoundationsItems } from "./items/regression-foundations";
import { regressionGeneralizedItems } from "./items/regression-generalized";
import { regressionGeometryItems } from "./items/regression-geometry";
import { regressionSelectionItems } from "./items/regression-selection";

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


const OCW_18_650: SourceRef = {
  id: "mit-ocw-18.650",
  tier: "open",
  title: "MIT 18.650 Statistics for Applications (OpenCourseWare)",
  url: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
  license: "CC-BY-NC-SA-4.0",
};

const MML: SourceRef = {
  id: "deisenroth-mml",
  tier: "open",
  title: "Mathematics for Machine Learning (Deisenroth, Faisal & Ong), free online edition",
  url: "https://mml-book.github.io/",
  license: "free-to-download for personal use; verify before redistribution",
};

const WASSERMAN: SourceRef = {
  id: "wasserman-aos",
  tier: "restricted",
  title: "All of Statistics (Wasserman)",
  locator: "Ch. 3 and Ch. 5, moments and convergence",
  rewriteApprovedBy: "pending-review",
};

const BISHOP: SourceRef = {
  id: "bishop-prml",
  tier: "restricted",
  title: "Pattern Recognition and Machine Learning (Bishop, 2006)",
  locator: "§2.3, the Gaussian distribution",
  rewriteApprovedBy: "pending-review",
};

const COVER_THOMAS: SourceRef = {
  id: "cover-thomas",
  tier: "restricted",
  title: "Elements of Information Theory (Cover & Thomas, 2nd ed.)",
  locator: "§2.3, relative entropy",
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
  {
    id: "bayes-rule--recall-statement",
    conceptId: "bayes-rule",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State Bayes' Rule for P(A | B) in terms of P(B | A), P(A), and P(B).",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "Gives P(A | B) = P(B | A)·P(A) / P(B).",
          weight: 3,
          required: true,
        },
        {
          id: "names-the-parts",
          description:
            "Names P(A) as the prior, P(B | A) as the likelihood, and P(A | B) as the posterior.",
          weight: 2,
        },
      ],
    },
    difficulty: -1.8,
    discrimination: 1.0,
    expectedSeconds: 40,
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
  {
    id: "rank--recall-definition",
    conceptId: "rank",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The rank of a matrix A is:",
    choices: [
      { id: "a", text: "the dimension of its column space (equivalently, of its row space)", correct: true },
      {
        id: "b",
        text: "the number of rows of A",
        correct: false,
        misconception: {
          id: "rank-as-row-count",
          description: "Confuses the ambient dimension of the row space with the number of independent directions actually spanned within it.",
          blameConceptId: "row-space",
        },
      },
      {
        id: "c",
        text: "the number of nonzero entries of A",
        correct: false,
        misconception: {
          id: "rank-as-nonzero-count",
          description: "Treats rank as a count of nonzero entries rather than as a dimension of a spanned subspace.",
          blameConceptId: "column-space",
        },
      },
      {
        id: "d",
        text: "the largest entry of A",
        correct: false,
        misconception: {
          id: "rank-as-largest-entry",
          description: "Confuses rank, a structural property of the matrix as a linear map, with the size of one number inside it.",
          blameConceptId: "column-space",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 30,
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
  {
    id: "bernoulli-binomial--recall-mean-variance-formula",
    conceptId: "bernoulli-binomial",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten", "spoken"],
    stem: "State the mean and the variance of X ~ Binomial(n, p) in terms of n and p.",
    rubric: {
      elements: [
        { id: "mean", description: "Gives E[X] = np.", weight: 2, required: true },
        { id: "variance", description: "Gives Var(X) = np(1 − p).", weight: 2, required: true },
      ],
    },
    difficulty: -2.2,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["expectation", "variance"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bernoulli-binomial--recall-support",
    conceptId: "bernoulli-binomial",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For X ~ Binomial(n, p), what is the support of X (the set of values it can take)?",
    choices: [
      { id: "a", text: "{0, 1, 2, …, n}", correct: true },
      {
        id: "b",
        text: "{0, 1}",
        correct: false,
        misconception: {
          id: "confuses-with-bernoulli",
          description: "Gives the support of a single Bernoulli trial rather than of the count of n such trials.",
          blameConceptId: "bernoulli-binomial",
        },
      },
      {
        id: "c",
        text: "All nonnegative integers",
        correct: false,
        misconception: {
          id: "drops-the-upper-bound",
          description: "Forgets that a count of successes out of n trials can never exceed n.",
          blameConceptId: "pmf",
        },
      },
      {
        id: "d",
        text: "{1, 2, …, n}",
        correct: false,
        misconception: {
          id: "excludes-zero-successes",
          description: "Excludes the possibility of zero successes, which has positive probability (1 − p)ⁿ whenever p < 1.",
          blameConceptId: "pmf",
        },
      },
    ],
    difficulty: -2.5,
    discrimination: 1.0,
    expectedSeconds: 25,
    prereqClosure: ["pmf"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bernoulli-binomial--apply-no-successes",
    conceptId: "bernoulli-binomial",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A salesperson closes a sale with probability 0.25 on each of 8 independent calls in a day. " +
      "What is the probability that none of the calls result in a sale? Give a decimal to three places.",
    answerKey: 0.1,
    tolerance: 0.005,
    difficulty: -0.7,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["pmf", "mutual-independence"],
    source: BLITZSTEIN,
    status: "live",
  },
  {
    id: "bernoulli-binomial--apply-defect-count",
    conceptId: "bernoulli-binomial",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A factory's defect rate is 5% per unit, independently across units. In a sample of 15 units, " +
      "what is the probability that exactly 2 are defective? Give a decimal to three places.",
    answerKey: 0.135,
    tolerance: 0.005,
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["pmf", "binomial-theorem"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bernoulli-binomial--apply-n-from-variance-p",
    conceptId: "bernoulli-binomial",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A binomial distribution has variance 4 and p = 0.2. Find n. (Hint: divide the variance by p(1 − p).)",
    answerKey: 25,
    tolerance: 0.001,
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["expectation", "variance"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "bernoulli-binomial--explain-why-independence-needed",
    conceptId: "bernoulli-binomial",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The binomial PMF C(n,k)pᵏ(1−p)ⁿ⁻ᵏ assumes the trials are independent. Explain what would go wrong " +
      "with the formula if consecutive trials were positively correlated.",
    rubric: {
      elements: [
        {
          id: "multiplication-needs-independence",
          description:
            "Explains that multiplying pᵏ(1−p)ⁿ⁻ᵏ for one ordering is only valid because independence lets probabilities of individual outcomes multiply.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-independence",
            description: "Applies the binomial formula without checking whether trials are independent.",
            blameConceptId: "mutual-independence",
          },
        },
        {
          id: "consequence",
          description:
            "Notes that positive correlation would make extreme counts (near 0 or near n) more likely than the formula predicts, understating the true spread.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["mutual-independence", "pmf"],
    source: BLITZSTEIN,
    status: "live",
  },
  {
    id: "bernoulli-binomial--explain-symmetry-p-and-complement",
    conceptId: "bernoulli-binomial",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why P(X = k) for Binomial(n, p) equals P(X = n − k) for Binomial(n, 1 − p), using the roles " +
      "of 'success' and 'failure.'",
    rubric: {
      elements: [
        {
          id: "relabelling",
          description:
            "Explains that swapping the labels 'success' and 'failure' turns k successes out of n into n − k 'successes' under the relabelled scheme with probability 1 − p.",
          weight: 3,
          required: true,
        },
        {
          id: "coefficient-symmetry",
          description: "Notes C(n, k) = C(n, n − k), so the counting factor matches under the relabelling too.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["pmf", "binomial-theorem"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bernoulli-binomial--transfer-sum-of-binomials",
    conceptId: "bernoulli-binomial",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "X ~ Binomial(10, 0.3) and Y ~ Binomial(15, 0.3) are independent. A colleague claims X + Y ~ " +
      "Binomial(25, 0.3). Is this correct? Justify it, and say what condition would make it fail.",
    rubric: {
      elements: [
        {
          id: "correct-given-equal-p",
          description:
            "States the claim is correct here, because X and Y can each be written as sums of independent Bernoulli(0.3) trials, so X + Y is a sum of 25 independent Bernoulli(0.3) trials.",
          weight: 3,
          required: true,
        },
        {
          id: "would-fail-if-p-differs",
          description:
            "Identifies that the result fails if the two binomials have different success probabilities — the sum is then not binomial at all.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-sum-always-binomial",
            description: "Assumes any sum of independent binomials is binomial, without checking that the success probabilities match.",
            blameConceptId: "bernoulli-binomial",
          },
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["mutual-independence", "pmf"],
    source: BLITZSTEIN,
    status: "live",
  },
  {
    id: "bernoulli-binomial--transfer-negative-correlation-variance",
    conceptId: "bernoulli-binomial",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Suppose n Bernoulli(p) trials are negatively correlated (as when sampling without replacement from " +
      "a finite population), so Cov(Xᵢ, Xⱼ) < 0 for i ≠ j. Compare Var(ΣXᵢ) to the binomial variance " +
      "np(1 − p), and give the intuitive reason using a finite-population argument.",
    rubric: {
      elements: [
        {
          id: "variance-decomposition",
          description:
            "Writes Var(ΣXᵢ) = np(1 − p) + n(n − 1)·Cov(Xᵢ, Xⱼ), so negative pairwise covariance pulls the total below the binomial value.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-independence",
            description: "Applies the binomial variance formula without accounting for the covariance terms between correlated trials.",
            blameConceptId: "mutual-independence",
          },
        },
        {
          id: "intuition",
          description:
            "Explains the mechanism: sampling without replacement means an early success depletes the finite pool of remaining successes, making a later success less likely — so counts cluster closer to the mean than independent trials would.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["mutual-independence", "variance"],
    source: CASELLA_BERGER,
    status: "live",
  },

  // --- Regression -----------------------------------------------------------
  // Authored from assessments/reg-01..reg-05; see web/src/data/items/ for the
  // per-cluster files and the shared source registry.
  ...regressionFoundationsItems,
  ...regressionGeometryItems,
  ...regressionDiagnosticsItems,
  ...regressionSelectionItems,
  ...regressionGeneralizedItems,
  ...regressionExtensionsItems,

  // =========================================================================
  // Multivariate Probability & Asymptotics — the whole domain, 7 concepts.
  // Authored from assessments/mp-01-multivariate-probability.md, expanded to
  // the 8-live-item bar auditCoverage asks for. Every numeric answerKey below
  // was recomputed by script before being written here; the derivation rubrics
  // are the same arguments the wiki articles in data/wiki/ set out, so a
  // learner who read the lesson has genuinely seen the required moves.
  // =========================================================================

  // --- Central Limit Theorem ------------------------------------------------
  {
    id: "central-limit-theorem--recall-statement",
    conceptId: "central-limit-theorem",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "X₁, …, Xₙ are iid with mean μ and finite variance σ². Which statement is the central limit theorem?",
    choices: [
      {
        id: "a",
        text: "√n(X̄ₙ − μ)/σ converges in distribution to N(0, 1) as n → ∞",
        correct: true,
      },
      {
        id: "b",
        text: "X̄ₙ converges to μ as n → ∞",
        correct: false,
        misconception: {
          id: "clt-is-lln",
          description:
            "States the law of large numbers instead. It describes where X̄ₙ goes, not the shape of its fluctuations around that point.",
          blameConceptId: "law-of-large-numbers",
        },
      },
      {
        id: "c",
        text: "The Xᵢ themselves become Normally distributed as n grows",
        correct: false,
        misconception: {
          id: "clt-normalises-the-data",
          description:
            "Applies the theorem to the observations rather than to the sampling distribution of their mean. Sample size never changes the population's shape.",
          blameConceptId: "central-limit-theorem",
        },
      },
      {
        id: "d",
        text: "(X̄ₙ − μ)/σ converges in distribution to N(0, 1) as n → ∞",
        correct: false,
        misconception: {
          id: "missing-root-n",
          description:
            "Drops the √n magnification, so the quantity collapses to the constant 0 in the limit rather than to a distribution.",
          blameConceptId: "modes-of-convergence",
        },
      },
    ],
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["modes-of-convergence", "normal-distribution", "law-of-large-numbers"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "central-limit-theorem--recall-conditions",
    conceptId: "central-limit-theorem",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "Which of these are genuinely required for the classical (Lindeberg–Lévy) central limit theorem? Select all that apply.",
    choices: [
      { id: "a", text: "The observations are independent", correct: true },
      { id: "b", text: "The population has finite variance", correct: true },
      { id: "c", text: "The observations are identically distributed", correct: true },
      {
        id: "d",
        text: "The population is Normally distributed",
        correct: false,
        misconception: {
          id: "clt-needs-normal-population",
          description:
            "Requires the conclusion as a hypothesis. If the population were already Normal, X̄ would be exactly Normal at every n and no limit theorem would be needed.",
          blameConceptId: "central-limit-theorem",
        },
      },
      {
        id: "e",
        text: "n is at least 30",
        correct: false,
        misconception: {
          id: "rule-of-thumb-as-hypothesis",
          description:
            "Promotes a rule of thumb about approximation quality into a hypothesis of the theorem, which is a statement about a limit and names no particular n.",
          blameConceptId: "central-limit-theorem",
        },
      },
      {
        id: "f",
        text: "The population is symmetric",
        correct: false,
        misconception: {
          id: "symmetry-required",
          description:
            "Skewness slows convergence but never blocks it; the exponential distribution is strongly skewed and its sample means are still asymptotically Normal.",
          blameConceptId: "central-limit-theorem",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.5,
    expectedSeconds: 60,
    prereqClosure: ["mutual-independence", "variance", "normal-distribution"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "central-limit-theorem--apply-variance-of-mean",
    conceptId: "central-limit-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A population has mean 50 and variance 100. A sample of n = 64 is drawn. " +
      "By the CLT, X̄ is approximately Normal — what is its variance? Give a decimal to four places.",
    answerKey: 1.5625,
    tolerance: 0.001,
    difficulty: 0.7,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["variance", "expectation"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "central-limit-theorem--apply-tail-of-mean",
    conceptId: "central-limit-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A population has mean 50 and variance 100, and n = 64. Using the CLT approximation, " +
      "what is P(X̄ > 52)? Give a decimal to three places.",
    answerKey: 0.055,
    tolerance: 0.005,
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["normal-distribution", "variance", "cdf"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "central-limit-theorem--apply-sum-not-mean",
    conceptId: "central-limit-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A machine part has a lifetime with mean 3 years and variance 4, independently across parts. " +
      "A depot stocks 100 of them and uses them one after another. Using the CLT, what is the " +
      "probability the 100 parts last more than 320 years in total? Give a decimal to three places.",
    answerKey: 0.159,
    tolerance: 0.005,
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["normal-distribution", "variance", "mutual-independence"],
    source: BLITZSTEIN,
    status: "live",
  },
  {
    id: "central-limit-theorem--explain-root-n",
    conceptId: "central-limit-theorem",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Why does the CLT multiply (X̄ₙ − μ) by √n rather than by n or by nothing at all? " +
      "Say what goes wrong with each of the other two scalings.",
    rubric: {
      elements: [
        {
          id: "no-scaling-collapses",
          description:
            "With no scaling, X̄ₙ − μ → 0 by the law of large numbers, so the limit is the constant 0 and carries no distributional information.",
          weight: 3,
          required: true,
          misconception: {
            id: "missing-root-n",
            description:
              "Does not see that an unscaled deviation vanishes, so treats the CLT as a restatement of the LLN.",
            blameConceptId: "law-of-large-numbers",
          },
        },
        {
          id: "over-scaling-diverges",
          description:
            "With a factor of n, the quantity blows up: SD(X̄ₙ − μ) is σ/√n, so multiplying by n leaves a standard deviation of σ√n → ∞.",
          weight: 3,
          required: true,
        },
        {
          id: "root-n-is-the-balance",
          description:
            "Identifies √n as the unique rate at which the standard deviation stays constant at σ — the deviation neither collapses nor diverges, so a stable limiting shape appears.",
          weight: 2,
          required: true,
        },
        {
          id: "standard-error-link",
          description:
            "Bonus: connects the same √n to the standard error σ/√n, and hence to why quadrupling a sample only halves the uncertainty.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["variance", "law-of-large-numbers", "modes-of-convergence"],
    source: WASSERMAN,
    status: "live",
  },
  {
    id: "central-limit-theorem--explain-mgf-proof",
    conceptId: "central-limit-theorem",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Sketch the MGF proof of the central limit theorem, from the standardised summands through " +
      "to the standard Normal's MGF.",
    rubric: {
      elements: [
        {
          id: "standardise",
          description:
            "Standardises first: Yᵢ = (Xᵢ − μ)/σ, so E[Yᵢ] = 0 and E[Yᵢ²] = 1.",
          weight: 2,
          required: true,
        },
        {
          id: "taylor-expansion",
          description:
            "Expands the single-term MGF near 0 as M_Y(t) = 1 + t²/2 + o(t²), using the two moment facts to kill the linear term and fix the quadratic one.",
          weight: 3,
          required: true,
          misconception: {
            id: "mgf-expansion-skipped",
            description:
              "Asserts the Normal limit without the Taylor expansion, which is the step that shows only the first two moments survive.",
            blameConceptId: "mgf",
          },
        },
        {
          id: "independence-factorisation",
          description:
            "Uses independence to factor the MGF of the sum: M of (1/√n)ΣYᵢ is [M_Y(t/√n)]ⁿ.",
          weight: 3,
          required: true,
          misconception: {
            id: "mgf-product-without-independence",
            description:
              "Multiplies MGFs without noting that the product rule is exactly where independence enters.",
            blameConceptId: "mutual-independence",
          },
        },
        {
          id: "limit",
          description:
            "Takes the limit [1 + t²/(2n) + o(1/n)]ⁿ → e^(t²/2), recognising the (1 + a/n)ⁿ → eᵃ form.",
          weight: 2,
          required: true,
        },
        {
          id: "uniqueness",
          description:
            "Closes by identifying e^(t²/2) as the standard Normal's MGF and invoking the uniqueness/continuity theorem that converts MGF convergence into convergence in distribution.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-limit-without-expansion",
          description:
            "Writes the MGF of the sum and jumps straight to e^(t²/2) with no expansion and no limit argument.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.8,
    expectedSeconds: 300,
    prereqClosure: ["mgf", "mutual-independence", "normal-distribution", "modes-of-convergence"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "central-limit-theorem--transfer-versus-lln",
    conceptId: "central-limit-theorem",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The law of large numbers already says X̄ₙ → μ. What does the central limit theorem add that " +
      "the LLN does not give you, and what could you not build from the LLN alone?",
    rubric: {
      elements: [
        {
          id: "point-versus-distribution",
          description:
            "Contrasts the two: LLN delivers a single point (the limit μ), CLT delivers a whole distribution for the deviation around it.",
          weight: 3,
          required: true,
          misconception: {
            id: "lln-clt-conflated",
            description:
              "Restates both theorems separately without identifying what the second adds, treating them as interchangeable statements about convergence.",
            blameConceptId: "law-of-large-numbers",
          },
        },
        {
          id: "zooming-in",
          description:
            "Frames the CLT as zooming in on the LLN's vanishing error at the √n rate — magnifying it just enough to reveal its shape rather than watching it disappear.",
          weight: 3,
          required: true,
        },
        {
          id: "what-it-buys",
          description:
            "Names something that needs the CLT and not the LLN: a confidence interval's width and its 1.96, a p-value, or any statement about how far X̄ is likely to be from μ at a finite n.",
          weight: 2,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "both-say-it-converges",
          description:
            "Answers only that both theorems are about convergence as n grows, with no account of the difference in what converges or to what.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.9,
    expectedSeconds: 210,
    prereqClosure: ["law-of-large-numbers", "modes-of-convergence", "variance"],
    source: WASSERMAN,
    status: "live",
  },

  // --- Change of Variables (Jacobian) --------------------------------------
  {
    id: "change-of-variables-jacobian--recall-formula",
    conceptId: "change-of-variables-jacobian",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "State the multivariate change-of-variables formula for the density of Y = g(X), and say what " +
      "each factor is.",
    rubric: {
      elements: [
        {
          id: "the-formula",
          description:
            "Gives f_Y(y) = f_X(g⁻¹(y))·|det J(y)|, with J the Jacobian matrix of the inverse map g⁻¹.",
          weight: 3,
          required: true,
        },
        {
          id: "composition-factor",
          description:
            "Explains f_X(g⁻¹(y)) as evaluating the original density at the point that maps to y.",
          weight: 2,
          required: true,
        },
        {
          id: "conditions",
          description:
            "States the hypotheses: g invertible and differentiable with a differentiable inverse, and det J nonzero.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["pdf", "determinant"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--recall-why-determinant",
    conceptId: "change-of-variables-jacobian",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The factor |det J| appears in the change-of-variables formula because it measures:",
    choices: [
      {
        id: "a",
        text: "the local volume-scaling factor of the transformation",
        correct: true,
      },
      {
        id: "b",
        text: "an arbitrary normalising convention, chosen to make the formula tidy",
        correct: false,
        misconception: {
          id: "jacobian-as-convention",
          description:
            "Treats the determinant as bookkeeping rather than as the quantity that makes the transformed density integrate to 1.",
          blameConceptId: "determinant",
        },
      },
      {
        id: "c",
        text: "how far the transformation moves each point",
        correct: false,
        misconception: {
          id: "jacobian-as-displacement",
          description:
            "Confuses displacement with local distortion. A pure translation moves every point and has |det J| = 1, changing no density at all.",
          blameConceptId: "linear-transformations",
        },
      },
      {
        id: "d",
        text: "the probability that Y falls in a small neighbourhood of y",
        correct: false,
        misconception: {
          id: "jacobian-as-probability",
          description:
            "Reads a purely geometric quantity as a probability; the Jacobian depends only on g, never on the distribution of X.",
          blameConceptId: "pdf",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["determinant"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--apply-square-of-uniform",
    conceptId: "change-of-variables-jacobian",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ Uniform(0, 1) and Y = X². Using the change-of-variables formula, evaluate the density of " +
      "Y at y = 0.25. Give a decimal to two places.",
    answerKey: 1.0,
    tolerance: 0.01,
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["pdf", "cdf"],
    source: BLITZSTEIN,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--apply-polar-determinant",
    conceptId: "change-of-variables-jacobian",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For the polar map x = r cos θ, y = r sin θ, compute the Jacobian determinant and evaluate it " +
      "at r = 3, θ = π/4.",
    answerKey: 3,
    tolerance: 0.001,
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["determinant", "matrices"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--apply-one-d-reduction",
    conceptId: "change-of-variables-jacobian",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Show that the multivariate change-of-variables formula reduces exactly to the univariate one " +
      "f_Y(y) = f_X(g⁻¹(y))·|(g⁻¹)′(y)| when n = 1.",
    rubric: {
      elements: [
        {
          id: "jacobian-is-one-by-one",
          description:
            "Observes that for n = 1 the Jacobian matrix is the 1×1 matrix whose single entry is (g⁻¹)′(y).",
          weight: 3,
          required: true,
        },
        {
          id: "determinant-of-scalar",
          description:
            "Notes that the determinant of a 1×1 matrix is its entry, so |det J| = |(g⁻¹)′(y)|.",
          weight: 3,
          required: true,
          misconception: {
            id: "analogy-not-substitution",
            description:
              "Says the two formulas 'look the same' without carrying out the substitution that makes one a special case of the other.",
            blameConceptId: "determinant",
          },
        },
        {
          id: "conclusion",
          description:
            "Concludes explicitly that the univariate formula is the n = 1 instance, not a separate result.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["determinant", "pdf"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--explain-affine-case",
    conceptId: "change-of-variables-jacobian",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Derive the density of Y = AX + b for an invertible matrix A, and say what happens to the " +
      "density when A is orthogonal.",
    rubric: {
      elements: [
        {
          id: "inverse-map",
          description: "Inverts the map: g⁻¹(y) = A⁻¹(y − b).",
          weight: 2,
          required: true,
        },
        {
          id: "constant-jacobian",
          description:
            "Identifies the Jacobian of the inverse as the constant matrix A⁻¹, so the correction factor is the same at every y — the one case where the Jacobian does not vary.",
          weight: 3,
          required: true,
        },
        {
          id: "determinant-reciprocal",
          description:
            "Uses det(A⁻¹) = 1/det(A) to write f_Y(y) = f_X(A⁻¹(y − b))/|det A|.",
          weight: 3,
          required: true,
          misconception: {
            id: "forward-jacobian-used",
            description:
              "Multiplies by |det A| instead of dividing, inverting the correction by using the forward map's Jacobian where the inverse map's is required.",
            blameConceptId: "determinant",
          },
        },
        {
          id: "orthogonal-case",
          description:
            "Notes that |det A| = 1 for orthogonal A, so a rotation or reflection leaves the density's values unchanged — volume is preserved.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 240,
    // Deliberately not tagged with `invertible-matrices`: that concept is not
    // upstream of this one, and adding the edge would push the whole
    // rank/subspaces branch in front of a lesson that only needs the
    // determinant identity det(A⁻¹) = 1/det(A). The stem supplies the
    // invertibility of A as a hypothesis, exactly as the concept's own
    // definition supplies the invertibility of g.
    prereqClosure: ["determinant", "matrix-multiplication", "matrices", "pdf"],
    source: MML,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--explain-why-necessary",
    conceptId: "change-of-variables-jacobian",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Why must a density be multiplied by a volume-scaling factor at all when it is transformed? " +
      "Argue both directions — expansion and contraction.",
    rubric: {
      elements: [
        {
          id: "mass-conserved-volume-not",
          description:
            "States the principle: the probability mass in a small region is preserved by the relabelling, but the region's volume is not, so the density (mass per unit volume) has to absorb the difference.",
          weight: 3,
          required: true,
          misconception: {
            id: "density-moves-unchanged",
            description:
              "Treats a density like a set of point masses that simply move, missing that a density is a rate per unit volume.",
            blameConceptId: "pdf",
          },
        },
        {
          id: "expansion-direction",
          description:
            "Expansion: where |det J| > 1 the same mass is spread over a larger region, so the density there is lower.",
          weight: 2,
          required: true,
        },
        {
          id: "contraction-direction",
          description:
            "Contraction: where |det J| < 1 the same mass is concentrated into a smaller region, so the density there is higher.",
          weight: 2,
          required: true,
        },
        {
          id: "normalisation-check",
          description:
            "Bonus: notes that without the factor the transformed function would not integrate to 1, so it would not be a density at all.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["determinant", "pdf"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--transfer-polar-r",
    conceptId: "change-of-variables-jacobian",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Every calculus course insists that a double integral in polar coordinates is written " +
      "r dr dθ, not dr dθ. Explain where that r comes from, and why it is the same fact as the " +
      "change-of-variables formula for densities.",
    rubric: {
      elements: [
        {
          id: "computes-determinant",
          description:
            "Computes the polar Jacobian determinant explicitly: cos θ · r cos θ − (−r sin θ) · sin θ = r(cos²θ + sin²θ) = r.",
          weight: 3,
          required: true,
          misconception: {
            id: "cites-memorised-rule",
            description:
              "Cites the r dr dθ rule as a remembered fact without computing the determinant that produces it.",
            blameConceptId: "determinant",
          },
        },
        {
          id: "same-object",
          description:
            "Identifies the r as the same Jacobian determinant that appears in the density formula — the area element dx dy equals r dr dθ, so it is one fact wearing two notations.",
          weight: 3,
          required: true,
        },
        {
          id: "geometric-reading",
          description:
            "Bonus: gives the geometry — a cell of angular width dθ subtends an arc of length r dθ, so cells further from the origin are proportionally larger.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-without-computation",
          description:
            "Asserts that the r 'is the Jacobian' with neither the determinant computed nor the geometry given.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["determinant", "matrices", "pdf"],
    source: OCW_18_05,
    status: "live",
  },

  // --- Covariance Matrix ----------------------------------------------------
  {
    id: "covariance-matrix--recall-definition",
    conceptId: "covariance-matrix",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Define the covariance matrix Σ of a random vector X, and say what sits on its diagonal and " +
      "off its diagonal.",
    rubric: {
      elements: [
        {
          id: "definition",
          description:
            "Gives Σ = E[(X − μ)(X − μ)ᵀ], equivalently Σᵢⱼ = Cov(Xᵢ, Xⱼ).",
          weight: 3,
          required: true,
        },
        {
          id: "diagonal",
          description:
            "Identifies the diagonal entries as the variances, since Cov(Xᵢ, Xᵢ) = Var(Xᵢ).",
          weight: 2,
          required: true,
        },
        {
          id: "symmetry",
          description:
            "Notes that Σ is symmetric because Cov(Xᵢ, Xⱼ) = Cov(Xⱼ, Xᵢ).",
          weight: 2,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["covariance", "variance", "expectation"],
    source: MML,
    status: "live",
  },
  {
    id: "covariance-matrix--recall-definiteness",
    conceptId: "covariance-matrix",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A covariance matrix Σ is guaranteed to be:",
    choices: [
      { id: "a", text: "symmetric positive semi-definite", correct: true },
      {
        id: "b",
        text: "symmetric positive definite",
        correct: false,
        misconception: {
          id: "assumes-strict-definiteness",
          description:
            "Rules out the singular case, which occurs exactly when some linear combination of the components is almost surely constant — and which is the norm when there are more features than observations.",
          blameConceptId: "positive-definite-matrices",
        },
      },
      {
        id: "c",
        text: "diagonal",
        correct: false,
        misconception: {
          id: "assumes-uncorrelated",
          description:
            "Assumes the components are uncorrelated. Diagonal Σ is a special case, not a guarantee.",
          blameConceptId: "covariance",
        },
      },
      {
        id: "d",
        text: "invertible",
        correct: false,
        misconception: {
          id: "assumes-invertibility",
          description:
            "Follows from strict definiteness, which is not guaranteed; a singular Σ has no inverse and breaks every method that needs one.",
          blameConceptId: "invertible-matrices",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["positive-definite-matrices", "symmetric-matrices"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "covariance-matrix--apply-determinant",
    conceptId: "covariance-matrix",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Var(X₁) = 4, Var(X₂) = 9, Cov(X₁, X₂) = 3. Write down Σ and compute its determinant.",
    answerKey: 27,
    tolerance: 0.001,
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["covariance", "variance", "determinant"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "covariance-matrix--apply-variance-of-sum",
    conceptId: "covariance-matrix",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With Σ = [[4, 3], [3, 9]], use the quadratic form Var(aᵀX) = aᵀΣa to compute Var(X₁ + X₂).",
    answerKey: 19,
    tolerance: 0.001,
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["covariance", "variance", "matrix-multiplication"],
    source: MML,
    status: "live",
  },
  {
    id: "covariance-matrix--apply-variance-of-difference",
    conceptId: "covariance-matrix",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With the same Σ = [[4, 3], [3, 9]], compute Var(X₁ − X₂). " +
      "(If your answer is larger than Var(X₁ + X₂), check the sign on the cross term.)",
    answerKey: 7,
    tolerance: 0.001,
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["covariance", "variance", "matrix-multiplication"],
    source: MML,
    status: "live",
  },
  {
    id: "covariance-matrix--explain-psd-proof",
    conceptId: "covariance-matrix",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Prove that every covariance matrix is positive semi-definite, and explain why the argument " +
      "does not deliver strict positive definiteness.",
    rubric: {
      elements: [
        {
          id: "quadratic-form-is-a-variance",
          description:
            "Shows that for any fixed a, Var(aᵀX) = aᵀΣa — the quadratic form is not merely analogous to a variance, it is one.",
          weight: 3,
          required: true,
          misconception: {
            id: "psd-asserted",
            description:
              "Asserts positive semi-definiteness as a known property of covariance matrices without deriving it from the non-negativity of variance.",
            blameConceptId: "positive-definite-matrices",
          },
        },
        {
          id: "non-negativity",
          description:
            "Concludes aᵀΣa ≥ 0 for every a because variances cannot be negative, which is the definition of positive semi-definite.",
          weight: 3,
          required: true,
        },
        {
          id: "why-not-strict",
          description:
            "Explains that nothing forbids aᵀΣa = 0 for some a ≠ 0 — a variance can be exactly zero — so the argument stops at semi-definite.",
          weight: 2,
          required: true,
        },
        {
          id: "symmetry",
          description: "Bonus: notes Σ is symmetric, so the spectral theorem applies and all its eigenvalues are real and ≥ 0.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["positive-definite-matrices", "variance", "covariance", "symmetric-matrices"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "covariance-matrix--explain-singular-sigma",
    conceptId: "covariance-matrix",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Suppose Σ is positive semi-definite but singular. What does that say about the components of " +
      "X, concretely?",
    rubric: {
      elements: [
        {
          id: "zero-quadratic-form",
          description:
            "Identifies that singularity means aᵀΣa = 0 for some a ≠ 0, i.e. Var(aᵀX) = 0.",
          weight: 3,
          required: true,
          misconception: {
            id: "singular-means-noisy",
            description:
              "Reads a singular Σ as a sign of noisy or poor data rather than of an exact algebraic relationship among the components.",
            blameConceptId: "positive-definite-matrices",
          },
        },
        {
          id: "almost-surely-constant",
          description:
            "Concludes that a linear combination with zero variance is almost surely constant — an exact linear relationship among the components.",
          weight: 3,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Names a consequence: one component is redundant given the others, and Σ⁻¹ does not exist, so anything requiring it fails.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.8,
    expectedSeconds: 180,
    prereqClosure: ["positive-definite-matrices", "invertible-matrices", "variance"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "covariance-matrix--transfer-p-greater-than-n",
    conceptId: "covariance-matrix",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A genomics dataset has 20,000 measured features and 80 samples. Why is the sample covariance " +
      "matrix guaranteed to be singular here, no matter how clean the measurements are, and what " +
      "breaks as a result?",
    rubric: {
      elements: [
        {
          id: "rank-bound",
          description:
            "Invokes the rank bound: the centred data matrix has rank at most min(n − 1, p) = 79, so the Gram-form sample covariance inherits that rank and cannot reach 20,000.",
          weight: 3,
          required: true,
          misconception: {
            id: "blames-noise",
            description:
              "Attributes the singularity to measurement noise or a bad estimator rather than to a rank bound that holds for any data whatsoever.",
            blameConceptId: "rank",
          },
        },
        {
          id: "not-fixable-by-better-data",
          description:
            "States that this is structural, not statistical: no amount of measurement precision changes a rank bound.",
          weight: 2,
          required: true,
        },
        {
          id: "what-breaks",
          description:
            "Names methods that need Σ⁻¹ and therefore fail: linear discriminant analysis, Mahalanobis distance, generalised least squares, Gaussian graphical models.",
          weight: 2,
          required: true,
        },
        {
          id: "remedies",
          description:
            "Bonus: names a repair — shrinkage toward a diagonal target, a ridge-style Σ + λI, or a sparsity assumption on Σ⁻¹.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.9,
    expectedSeconds: 240,
    prereqClosure: ["rank", "positive-definite-matrices", "invertible-matrices", "covariance"],
    source: MML,
    status: "live",
  },

  // --- Bivariate Normal -----------------------------------------------------
  {
    id: "bivariate-normal--recall-parameters",
    conceptId: "bivariate-normal",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How many parameters fully characterise a bivariate normal distribution, and what are they?",
    choices: [
      { id: "a", text: "Five: two means, two variances, and one correlation", correct: true },
      {
        id: "b",
        text: "Four: two means and two variances",
        correct: false,
        misconception: {
          id: "omits-correlation",
          description:
            "Leaves out ρ, the only parameter that couples the two variables — without it the distribution is forced to be a product of independent marginals.",
          blameConceptId: "covariance",
        },
      },
      {
        id: "c",
        text: "Six: two means, two variances, and both covariances",
        correct: false,
        misconception: {
          id: "double-counts-covariance",
          description:
            "Counts Cov(X, Y) and Cov(Y, X) as separate parameters, missing that Σ is symmetric so they are the same number.",
          blameConceptId: "covariance",
        },
      },
      {
        id: "d",
        text: "Two: a mean vector and a covariance matrix, so two objects",
        correct: false,
        misconception: {
          id: "counts-objects-not-parameters",
          description:
            "Counts the containers rather than the free scalars inside them; the question is about degrees of freedom.",
          blameConceptId: "bivariate-normal",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["normal-distribution", "covariance"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bivariate-normal--recall-zero-correlation",
    conceptId: "bivariate-normal",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For two variables that are jointly bivariate normal, ρ = 0:",
    choices: [
      { id: "a", text: "does imply they are independent", correct: true },
      {
        id: "b",
        text: "never implies independence, for any distribution",
        correct: false,
        misconception: {
          id: "overgeneralises-the-warning",
          description:
            "Applies the general warning that uncorrelated does not mean independent to the one family where the implication genuinely holds.",
          blameConceptId: "bivariate-normal",
        },
      },
      {
        id: "c",
        text: "implies independence whenever X and Y each have a Normal marginal",
        correct: false,
        misconception: {
          id: "marginal-normality-suffices",
          description:
            "Weakens the hypothesis from joint normality to two Normal marginals. Normal marginals with a non-Gaussian coupling are uncorrelated and dependent.",
          blameConceptId: "bivariate-normal",
        },
      },
      {
        id: "d",
        text: "implies the joint density is degenerate",
        correct: false,
        misconception: {
          id: "confuses-rho-zero-with-rho-one",
          description:
            "Confuses ρ = 0 with |ρ| = 1. It is |ρ| → 1 that makes Σ singular and the density degenerate.",
          blameConceptId: "bivariate-normal",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.6,
    expectedSeconds: 45,
    prereqClosure: ["covariance", "joint-distribution", "normal-distribution"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bivariate-normal--apply-conditional-mean",
    conceptId: "bivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "(X, Y) is bivariate normal with μ_X = μ_Y = 0, σ_X = 1, σ_Y = 2, ρ = 0.5. " +
      "Compute E[Y | X = 1].",
    answerKey: 1,
    tolerance: 0.001,
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["normal-distribution", "covariance", "joint-distribution", "expectation"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "bivariate-normal--apply-conditional-variance",
    conceptId: "bivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For the same bivariate normal (μ_X = μ_Y = 0, σ_X = 1, σ_Y = 2, ρ = 0.5), compute " +
      "Var(Y | X = 1). Then note whether your answer would change for X = 3.",
    answerKey: 3,
    tolerance: 0.001,
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["normal-distribution", "covariance", "variance", "joint-distribution"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "bivariate-normal--apply-variance-of-sum",
    conceptId: "bivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With σ_X = 1, σ_Y = 2, ρ = 0.5, compute Var(X + Y).",
    answerKey: 7,
    tolerance: 0.001,
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["variance", "covariance"],
    source: WASSERMAN,
    status: "live",
  },
  {
    id: "bivariate-normal--apply-x-squared-counterexample",
    conceptId: "bivariate-normal",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "X ~ N(0, 1) and Y = X², so Cov(X, Y) = 0 while Y is a deterministic function of X. " +
      "Why does this not contradict the result that ρ = 0 implies independence?",
    rubric: {
      elements: [
        {
          id: "names-missing-condition",
          description:
            "Identifies that the guarantee requires joint normality of the pair, and that (X, X²) is not jointly normal even though X alone is Normal.",
          weight: 3,
          required: true,
          misconception: {
            id: "marginal-normality-suffices",
            description:
              "Applies the ρ = 0 guarantee to any pair involving a Normal variable, without checking the joint distribution.",
            blameConceptId: "bivariate-normal",
          },
        },
        {
          id: "why-not-jointly-normal",
          description:
            "Supports the claim: the support of (X, X²) is a parabola rather than the whole plane, and a linear combination such as X² − X is plainly not Normal.",
          weight: 3,
          required: true,
        },
        {
          id: "general-rule",
          description:
            "States the general position: uncorrelated implies independent only under joint normality; independent implies uncorrelated always.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.8,
    expectedSeconds: 180,
    prereqClosure: ["covariance", "joint-distribution", "normal-distribution", "expectation"],
    source: BLITZSTEIN,
    status: "live",
  },
  {
    id: "bivariate-normal--explain-factorisation",
    conceptId: "bivariate-normal",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Starting from the bivariate normal density, show directly that setting ρ = 0 makes it factor " +
      "into the product of the two univariate Normal marginals.",
    rubric: {
      elements: [
        {
          id: "constant-simplifies",
          description:
            "Notes that √(1 − ρ²) becomes 1 at ρ = 0, so the normalising constant reduces to 1/(2πσ_Xσ_Y).",
          weight: 2,
          required: true,
        },
        {
          id: "cross-term-vanishes",
          description:
            "Shows the cross term −2ρ zₓ z_y drops out of the exponent, and that the 1/(1 − ρ²) prefactor becomes 1.",
          weight: 3,
          required: true,
          misconception: {
            id: "cites-result-without-algebra",
            description:
              "States that the density factors at ρ = 0 without carrying out the exponent simplification that shows it.",
            blameConceptId: "bivariate-normal",
          },
        },
        {
          id: "splits-exponential",
          description:
            "Splits exp(−½(zₓ² + z_y²)) into exp(−½zₓ²)·exp(−½z_y²) and pairs each with one 1/(√(2π)σ) factor.",
          weight: 3,
          required: true,
        },
        {
          id: "concludes-independence",
          description:
            "Concludes that a joint density factoring into the product of the marginals is the definition of independence.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-from-uncorrelatedness",
          description:
            "Argues from 'uncorrelated therefore independent' as a general principle rather than from this density's algebra — the general principle is false.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.8,
    expectedSeconds: 300,
    prereqClosure: ["normal-distribution", "joint-distribution", "pdf", "covariance"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "bivariate-normal--transfer-correlation-as-independence-test",
    conceptId: "bivariate-normal",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An analyst checks whether two variables are independent by computing their correlation and " +
      "finding it near zero. When is that a legitimate test, and when does it fail? Give a case " +
      "where the shortcut would mislead.",
    rubric: {
      elements: [
        {
          id: "condition-for-validity",
          description:
            "States the condition precisely: the shortcut is valid when the pair is at least approximately jointly Normal, because that is exactly the family in which zero correlation forces independence.",
          weight: 3,
          required: true,
          misconception: {
            id: "correlation-as-general-dependence",
            description:
              "Treats correlation as a general dependence measure, so the check is applied without any distributional justification.",
            blameConceptId: "covariance",
          },
        },
        {
          id: "failure-case",
          description:
            "Gives a concrete failure: a quadratic or otherwise symmetric non-monotone relationship, or a heavy-tailed pair whose dependence lives in the tails, both of which register zero correlation while being strongly dependent.",
          weight: 3,
          required: true,
        },
        {
          id: "downstream-consequence",
          description:
            "Connects the gap to a method that needs genuine independence rather than decorrelation — ICA, which cannot stop at what PCA gives it precisely because its sources are non-Gaussian.",
          weight: 2,
          required: true,
        },
        {
          id: "better-tool",
          description:
            "Bonus: names a measure that does characterise independence, such as distance correlation or mutual information.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.9,
    expectedSeconds: 240,
    prereqClosure: ["covariance", "joint-distribution", "normal-distribution"],
    source: BISHOP,
    status: "live",
  },

  // --- Multivariate Normal --------------------------------------------------
  {
    id: "multivariate-normal--recall-density",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem:
      "State the density of a k-dimensional multivariate normal N_k(μ, Σ), and name the univariate " +
      "quantity each factor generalises.",
    rubric: {
      elements: [
        {
          id: "the-density",
          description:
            "Gives f(x) = (2π)^(−k/2)|Σ|^(−1/2) exp(−½(x − μ)ᵀΣ⁻¹(x − μ)).",
          weight: 3,
          required: true,
        },
        {
          id: "quadratic-form",
          description:
            "Identifies (x − μ)ᵀΣ⁻¹(x − μ) as the squared Mahalanobis distance, generalising (x − μ)²/σ².",
          weight: 2,
          required: true,
        },
        {
          id: "determinant-as-scale",
          description:
            "Identifies |Σ|^(−1/2) as the generalisation of 1/σ — a volume rather than a length.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["covariance-matrix", "determinant", "normal-distribution", "pdf"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "multivariate-normal--recall-sigma-requirement",
    conceptId: "multivariate-normal",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For the multivariate normal density to be well defined, Σ must be:",
    choices: [
      { id: "a", text: "symmetric positive definite", correct: true },
      {
        id: "b",
        text: "diagonal",
        correct: false,
        misconception: {
          id: "mvn-sigma-diagonal",
          description:
            "Restricts the family to independent components. Any positive definite Σ is allowed, and the correlated case is the interesting one.",
          blameConceptId: "multivariate-normal",
        },
      },
      {
        id: "c",
        text: "symmetric positive semi-definite",
        correct: false,
        misconception: {
          id: "mvn-allows-singular-sigma",
          description:
            "Permits a singular Σ. The distribution still exists in that case but has no density in ℝᵏ, because the formula needs both Σ⁻¹ and |Σ| > 0.",
          blameConceptId: "positive-definite-matrices",
        },
      },
      {
        id: "d",
        text: "the identity, after standardising",
        correct: false,
        misconception: {
          id: "confuses-standardised-case",
          description:
            "Describes the standardised distribution rather than a requirement on the general one; whitening is a consequence of the definition, not a condition on it.",
          blameConceptId: "multivariate-normal",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.6,
    expectedSeconds: 45,
    prereqClosure: ["positive-definite-matrices", "covariance-matrix", "invertible-matrices"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "multivariate-normal--apply-determinant",
    conceptId: "multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "X ~ N₂(0, Σ) with Σ = [[4, 2], [2, 3]]. Compute |Σ|, the quantity appearing as |Σ|^(−1/2) in " +
      "the density.",
    answerKey: 8,
    tolerance: 0.001,
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["determinant", "covariance-matrix"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "multivariate-normal--apply-linear-combination",
    conceptId: "multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ N₂(0, Σ) with Σ = [[4, 2], [2, 3]]. The random variable X₁ − X₂ is Normal; compute its " +
      "variance.",
    answerKey: 3,
    tolerance: 0.001,
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["covariance-matrix", "variance", "matrix-multiplication"],
    source: MML,
    status: "live",
  },
  {
    id: "multivariate-normal--apply-ellipsoid-axes",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Using the spectral decomposition Σ = QΛQᵀ, explain why the level sets of the multivariate " +
      "normal density are ellipsoids whose axes point along Σ's eigenvectors.",
    rubric: {
      elements: [
        {
          id: "inverse-in-eigenbasis",
          description:
            "Writes Σ⁻¹ = QΛ⁻¹Qᵀ and changes coordinates to u = Qᵀ(x − μ).",
          weight: 3,
          required: true,
        },
        {
          id: "decoupling",
          description:
            "Shows the quadratic form becomes Σᵢ uᵢ²/λᵢ — a plain weighted sum of squares with no cross terms, which is the standard equation of an ellipsoid.",
          weight: 3,
          required: true,
          misconception: {
            id: "asserts-ellipse-shape",
            description:
              "Asserts the level sets are ellipses without the eigenbasis change of coordinates that removes the cross terms.",
            blameConceptId: "eigendecomposition",
          },
        },
        {
          id: "axes-and-lengths",
          description:
            "Concludes the principal axes are Σ's eigenvectors, with half-lengths proportional to √λᵢ — the standard deviations along those directions.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["eigendecomposition", "symmetric-matrices", "covariance-matrix", "determinant"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "multivariate-normal--explain-conditional-variance",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "In the multivariate normal, the conditional covariance of X₁ given X₂ = x₂ is " +
      "Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁ — an expression with no x₂ in it. Say what that means in practice, and " +
      "why it is a substantive claim rather than an algebraic accident.",
    rubric: {
      elements: [
        {
          id: "reads-the-independence",
          description:
            "States the meaning: observing X₂ shifts where you expect X₁ to be, but never changes how uncertain you are about it — the residual uncertainty is the same whether the observation was typical or extreme.",
          weight: 3,
          required: true,
          misconception: {
            id: "expects-heteroskedasticity",
            description:
              "Assumes uncertainty must grow for extreme conditioning values, importing intuition from distributions where it does.",
            blameConceptId: "multivariate-normal",
          },
        },
        {
          id: "substantive",
          description:
            "Argues it is a real property of this family, not a general fact: for most joint distributions the conditional spread does depend on the conditioning value.",
          weight: 3,
          required: true,
        },
        {
          id: "regression-link",
          description:
            "Connects it to regression: homoskedasticity, normally an assumption to be checked, is a theorem under joint normality, and the conditional mean's linearity makes least squares exact rather than approximate.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["covariance-matrix", "bivariate-normal", "joint-distribution", "variance"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "multivariate-normal--explain-whitening",
    conceptId: "multivariate-normal",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Show that Z = Σ^(−1/2)(X − μ) has a standard multivariate normal distribution when " +
      "X ~ N_k(μ, Σ), and connect the construction to univariate standardisation.",
    rubric: {
      elements: [
        {
          id: "defines-matrix-root",
          description:
            "Defines Σ^(−1/2) through the eigendecomposition, Σ^(−1/2) = QΛ^(−1/2)Qᵀ, and notes this needs all eigenvalues strictly positive.",
          weight: 2,
          required: true,
          misconception: {
            id: "matrix-root-undefined",
            description:
              "Uses a matrix square root without saying what it is or why it exists, so the argument rests on an undefined object.",
            blameConceptId: "eigendecomposition",
          },
        },
        {
          id: "covariance-computation",
          description:
            "Computes Cov(Z) = Σ^(−1/2)ΣΣ^(−1/2) = I explicitly, using the affine rule Cov(AX) = AΣAᵀ and the symmetry of Σ^(−1/2).",
          weight: 3,
          required: true,
        },
        {
          id: "mean-zero",
          description: "Notes E[Z] = Σ^(−1/2)(E[X] − μ) = 0.",
          weight: 1,
          required: true,
        },
        {
          id: "still-normal",
          description:
            "Justifies that Z is still multivariate normal, because the family is closed under affine transformation.",
          weight: 2,
          required: true,
        },
        {
          id: "univariate-parallel",
          description:
            "Draws the parallel to z = (X − μ)/σ, with the matrix square root standing in for the scalar one.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.8,
    expectedSeconds: 300,
    prereqClosure: [
      "eigendecomposition",
      "covariance-matrix",
      "positive-definite-matrices",
      "matrix-multiplication",
      "normal-distribution",
    ],
    source: MML,
    status: "live",
  },
  {
    id: "multivariate-normal--transfer-why-it-dominates",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Linear discriminant analysis, MANOVA, Kalman filters, and Gaussian graphical models all " +
      "assume multivariate normality. What property of the family are they actually relying on, and " +
      "why would a generic joint distribution not do?",
    rubric: {
      elements: [
        {
          id: "names-closure",
          description:
            "Names closure specifically: every marginal and every conditional derived from an MVN is itself an MVN, with parameters given by explicit matrix formulas.",
          weight: 3,
          required: true,
          misconception: {
            id: "cites-clt-or-ubiquity",
            description:
              "Answers that Normal data are common or that the CLT makes everything Normal, which explains why the model is plausible but not why it is computationally special.",
            blameConceptId: "multivariate-normal",
          },
        },
        {
          id: "why-those-operations",
          description:
            "Points out that marginalising and conditioning are exactly the operations statistical methods perform, so a family closed under them keeps every intermediate step tractable.",
          weight: 3,
          required: true,
        },
        {
          id: "contrast",
          description:
            "Contrasts with a generic joint distribution, where a conditional is an integral in some other family and each step gets harder rather than staying in place.",
          weight: 2,
          required: true,
        },
        {
          id: "cost",
          description:
            "Bonus: names the price — thin tails, so joint extremes are drastically underestimated, and everything breaks when Σ cannot be inverted.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.9,
    expectedSeconds: 240,
    prereqClosure: ["covariance-matrix", "bivariate-normal", "joint-distribution"],
    source: BISHOP,
    status: "live",
  },

  // --- Pearson Correlation --------------------------------------------------
  {
    id: "pearson-correlation--recall-formula",
    conceptId: "pearson-correlation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten", "spoken"],
    stem: "State the sample Pearson correlation coefficient r, and give its range.",
    rubric: {
      elements: [
        {
          id: "formula",
          description:
            "Gives r = Σ(xᵢ − x̄)(yᵢ − ȳ) / √(Σ(xᵢ − x̄)²·Σ(yᵢ − ȳ)²).",
          weight: 3,
          required: true,
        },
        {
          id: "range",
          description: "States that r always lies in [−1, 1].",
          weight: 2,
          required: true,
        },
        {
          id: "endpoints",
          description:
            "Notes that |r| = 1 happens exactly when the points lie on a straight line.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["correlation", "sample-variance", "sample-mean"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "pearson-correlation--recall-what-it-measures",
    conceptId: "pearson-correlation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The sample Pearson correlation r measures:",
    choices: [
      { id: "a", text: "linear association only", correct: true },
      {
        id: "b",
        text: "any kind of association between the two variables",
        correct: false,
        misconception: {
          id: "r-as-general-dependence",
          description:
            "Carries the limitation of the population ρ over incorrectly; r inherits it exactly. A perfect quadratic relationship with symmetric spread gives r = 0.",
          blameConceptId: "correlation",
        },
      },
      {
        id: "c",
        text: "the slope of the least-squares line",
        correct: false,
        misconception: {
          id: "r-as-slope",
          description:
            "Confuses r with the regression slope. They agree only when both variables are standardised; in general the slope is r·(s_y/s_x).",
          blameConceptId: "correlation",
        },
      },
      {
        id: "d",
        text: "whether changes in x cause changes in y",
        correct: false,
        misconception: {
          id: "r-as-causation",
          description:
            "Reads a symmetric summary of co-movement as a causal claim; r(x, y) = r(y, x), so it cannot distinguish a direction of influence.",
          blameConceptId: "pearson-correlation",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["correlation", "covariance"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "pearson-correlation--apply-invariance",
    conceptId: "pearson-correlation",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A dataset has r = 0.72. Every y value is now replaced by 3y + 7. What is the new r?",
    choices: [
      { id: "a", text: "0.72 — unchanged", correct: true },
      {
        id: "b",
        text: "2.16 — three times as large",
        correct: false,
        misconception: {
          id: "r-scales-with-data",
          description:
            "Scales r with the data, ignoring that the same factor of 3 appears in the numerator and in the denominator's s_y and cancels — and that r can never exceed 1.",
          blameConceptId: "correlation",
        },
      },
      {
        id: "c",
        text: "0.24 — divided by three",
        correct: false,
        misconception: {
          id: "r-inverse-scales",
          description:
            "Applies the scaling in the wrong direction, again treating r as a scale-dependent quantity like covariance.",
          blameConceptId: "covariance",
        },
      },
      {
        id: "d",
        text: "Cannot be determined without the original data",
        correct: false,
        misconception: {
          id: "misses-invariance",
          description:
            "Does not recognise that invariance under positive linear rescaling is a property of r itself, so the original data are not needed.",
          blameConceptId: "pearson-correlation",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.6,
    expectedSeconds: 75,
    prereqClosure: ["correlation", "sample-variance"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "pearson-correlation--apply-compute-positive",
    conceptId: "pearson-correlation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For the four points (1, 2), (2, 4), (3, 5), (4, 8), compute the sample Pearson correlation r. " +
      "Give a decimal to three places.",
    answerKey: 0.981,
    tolerance: 0.005,
    difficulty: 0.8,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["sample-mean", "sample-variance", "correlation"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "pearson-correlation--apply-compute-negative",
    conceptId: "pearson-correlation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For the five points (2, 7), (4, 5), (6, 6), (8, 3), (10, 2), compute r. " +
      "Give a decimal to three places, including the sign.",
    answerKey: -0.915,
    tolerance: 0.005,
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["sample-mean", "sample-variance", "correlation"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "pearson-correlation--explain-sample-analogue",
    conceptId: "pearson-correlation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Show term by term that r is the sample analogue of ρ = Cov(X, Y)/(σ_X σ_Y). Where do the " +
      "1/(n − 1) factors go?",
    rubric: {
      elements: [
        {
          id: "numerator-correspondence",
          description:
            "Matches the numerator Σ(xᵢ − x̄)(yᵢ − ȳ) to Cov(X, Y), as the sample covariance's sum of cross-products.",
          weight: 3,
          required: true,
          misconception: {
            id: "resemblance-not-correspondence",
            description:
              "Says the formulas resemble each other without pairing the individual factors.",
            blameConceptId: "correlation",
          },
        },
        {
          id: "denominator-correspondence",
          description:
            "Matches each √(Σ(xᵢ − x̄)²) to the corresponding population standard deviation.",
          weight: 3,
          required: true,
        },
        {
          id: "cancelling-divisors",
          description:
            "Explains that the 1/(n − 1) in the sample covariance and the two in the sample variances cancel between numerator and denominator, which is why they never appear in r.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["correlation", "covariance", "sample-variance", "sample-mean"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "pearson-correlation--explain-cauchy-schwarz",
    conceptId: "pearson-correlation",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Prove that |r| ≤ 1, and characterise exactly when equality holds.",
    rubric: {
      elements: [
        {
          id: "vector-framing",
          description:
            "Frames the centred deviations as vectors u = (xᵢ − x̄) and v = (yᵢ − ȳ) in ℝⁿ, so that r = ⟨u, v⟩/(‖u‖‖v‖).",
          weight: 3,
          required: true,
        },
        {
          id: "cauchy-schwarz",
          description:
            "Applies Cauchy–Schwarz, |⟨u, v⟩| ≤ ‖u‖‖v‖, which is exactly the statement that the numerator is bounded by the denominator.",
          weight: 3,
          required: true,
          misconception: {
            id: "bound-asserted",
            description:
              "States the bound as a known property of correlation without an argument producing it.",
            blameConceptId: "correlation",
          },
        },
        {
          id: "equality-case",
          description:
            "Characterises equality: it holds exactly when u and v are parallel, which means the points lie exactly on a straight line.",
          weight: 2,
          required: true,
        },
        {
          id: "cosine-reading",
          description:
            "Bonus: reads r as the cosine of the angle between the two centred data vectors, which makes both the bound and the scale-invariance immediate.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["correlation", "covariance", "sample-variance"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "pearson-correlation--transfer-reporting-r-alone",
    conceptId: "pearson-correlation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A colleague reports 'r = 0.98 between the two measures' with no other information, and treats " +
      "it as settled. What are you missing, and why does it matter most for small samples?",
    rubric: {
      elements: [
        {
          id: "statistic-not-parameter",
          description:
            "Frames r as a statistic estimating the parameter ρ, so it carries sampling variability and would differ in another sample from the same population.",
          weight: 3,
          required: true,
          misconception: {
            id: "r-as-parameter",
            description:
              "Reads r as a fixed property of the population rather than as an estimate with a sampling distribution.",
            blameConceptId: "parameter-vs-statistic",
          },
        },
        {
          id: "small-n-effect",
          description:
            "Explains that with few observations a large |r| arises by chance routinely — at n = 5 even |r| = 0.87 is not significant at the 5% level — so an unqualified r overstates the evidence.",
          weight: 3,
          required: true,
        },
        {
          id: "what-to-ask-for",
          description:
            "Says what is missing: the sample size, an interval for ρ, and a scatterplot — since r alone cannot distinguish a linear relationship from a curve, an outlier, or a restricted range.",
          weight: 2,
          required: true,
        },
        {
          id: "large-n-mirror",
          description:
            "Bonus: notes the opposite failure at large n, where a significant r of 0.06 explains a fraction of a percent of the variance and is practically meaningless.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.9,
    expectedSeconds: 240,
    prereqClosure: ["parameter-vs-statistic", "population-vs-sample", "correlation", "sample-variance"],
    source: WASSERMAN,
    status: "live",
  },

  // --- Kullback-Leibler Divergence -----------------------------------------
  {
    id: "kl-divergence--recall-definition",
    conceptId: "kl-divergence",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Define the Kullback–Leibler divergence D_KL(P ‖ Q), and say which distribution the " +
      "expectation is taken under.",
    rubric: {
      elements: [
        {
          id: "formula",
          description:
            "Gives D_KL(P‖Q) = E_P[log(P(X)/Q(X))], equivalently Σₓ P(x)log(P(x)/Q(x)).",
          weight: 3,
          required: true,
        },
        {
          id: "expectation-under-p",
          description:
            "States that the expectation is under P, the first argument — the reference distribution.",
          weight: 3,
          required: true,
          misconception: {
            id: "expectation-under-q",
            description:
              "Averages the log-ratio under Q, which changes the quantity entirely and hides where the asymmetry comes from.",
            blameConceptId: "expectation",
          },
        },
        {
          id: "interpretation",
          description:
            "Gives a reading: the expected extra cost, in nats or bits, of encoding data from P with a code built for Q.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.3,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["expectation", "pmf", "pdf"],
    source: COVER_THOMAS,
    status: "live",
  },
  {
    id: "kl-divergence--recall-asymmetry",
    conceptId: "kl-divergence",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Is D_KL(P ‖ Q) = D_KL(Q ‖ P)?",
    choices: [
      { id: "a", text: "No — KL divergence is asymmetric in general", correct: true },
      {
        id: "b",
        text: "Yes — it is a distance between distributions, so it must be symmetric",
        correct: false,
        misconception: {
          id: "kl-as-metric",
          description:
            "Treats KL as a true distance. It fails symmetry, fails the triangle inequality, and can be infinite — three separate reasons it is not a metric.",
          blameConceptId: "kl-divergence",
        },
      },
      {
        id: "c",
        text: "Yes, whenever both P and Q have the same support",
        correct: false,
        misconception: {
          id: "symmetry-under-shared-support",
          description:
            "Invents a condition under which symmetry holds. Shared support only makes both quantities finite; Bernoulli(0.5) against Bernoulli(0.9) gives 0.511 one way and 0.368 the other.",
          blameConceptId: "kl-divergence",
        },
      },
      {
        id: "d",
        text: "No, and the difference between the two orderings is always exactly zero in the limit",
        correct: false,
        misconception: {
          id: "asymmetry-vanishes",
          description:
            "Concedes the asymmetry but treats it as negligible, missing that the two directions produce genuinely different fits — mass-covering versus mode-seeking.",
          blameConceptId: "kl-divergence",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["expectation"],
    source: COVER_THOMAS,
    status: "live",
  },
  {
    id: "kl-divergence--apply-bernoulli-forward",
    conceptId: "kl-divergence",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "P = Bernoulli(0.5) and Q = Bernoulli(0.9). Compute D_KL(P ‖ Q) in nats (natural log). " +
      "Give a decimal to three places.",
    answerKey: 0.511,
    tolerance: 0.005,
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["expectation", "pmf"],
    source: COVER_THOMAS,
    status: "live",
  },
  {
    id: "kl-divergence--apply-bernoulli-reverse",
    conceptId: "kl-divergence",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With the same P = Bernoulli(0.5) and Q = Bernoulli(0.9), now compute D_KL(Q ‖ P) in nats. " +
      "Give a decimal to three places.",
    answerKey: 0.368,
    tolerance: 0.005,
    difficulty: 0.7,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["expectation", "pmf"],
    source: COVER_THOMAS,
    status: "live",
  },
  {
    id: "kl-divergence--apply-normals",
    conceptId: "kl-divergence",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For two Normals with the same variance, D_KL(N(μ₁, σ²) ‖ N(μ₂, σ²)) = (μ₁ − μ₂)²/(2σ²). " +
      "Compute D_KL(N(0, 1) ‖ N(1, 1)) in nats, to three decimals.",
    answerKey: 0.5,
    tolerance: 0.005,
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["expectation", "pdf"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "kl-divergence--explain-cross-entropy",
    conceptId: "kl-divergence",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Classifiers are trained by minimising cross-entropy, yet the quantity we claim to be " +
      "minimising is a KL divergence. Reconcile the two.",
    rubric: {
      elements: [
        {
          id: "decomposition",
          description:
            "States the identity D_KL(P‖Q) = H(P, Q) − H(P): divergence is cross-entropy minus the entropy of the reference distribution.",
          weight: 3,
          required: true,
          misconception: {
            id: "conflates-the-two",
            description:
              "Treats cross-entropy and KL divergence as the same quantity rather than as differing by H(P).",
            blameConceptId: "kl-divergence",
          },
        },
        {
          id: "constant-term",
          description:
            "Observes that H(P) is fixed by the data and does not depend on the model parameters, so it is a constant in the optimisation.",
          weight: 3,
          required: true,
        },
        {
          id: "same-minimiser",
          description:
            "Concludes that the two objectives differ by a parameter-free constant and therefore have the same minimiser and the same gradients.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["expectation", "pmf"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "kl-divergence--explain-gibbs",
    conceptId: "kl-divergence",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Prove that D_KL(P ‖ Q) ≥ 0 using Jensen's inequality, and identify when equality holds.",
    rubric: {
      elements: [
        {
          id: "rewrite-with-neg-log",
          description:
            "Rewrites the divergence as E_P[−log(Q(X)/P(X))], putting it in a form Jensen can be applied to.",
          weight: 2,
          required: true,
        },
        {
          id: "convexity",
          description:
            "Names −log as convex and applies Jensen in the correct direction: E[−log(W)] ≥ −log(E[W]).",
          weight: 3,
          required: true,
          misconception: {
            id: "jensen-wrong-direction",
            description:
              "Applies Jensen's inequality with the wrong convexity or the wrong direction, which would yield the opposite bound.",
            blameConceptId: "jensen-inequality",
          },
        },
        {
          id: "inner-expectation",
          description:
            "Computes E_P[Q(X)/P(X)] = Σₓ P(x)·Q(x)/P(x) = Σₓ Q(x) over P's support, which is at most 1.",
          weight: 3,
          required: true,
          misconception: {
            id: "sum-step-skipped",
            description:
              "Skips the cancellation and the sum-to-one step, which is the part that pins the bound at exactly zero rather than at some unknown constant.",
            blameConceptId: "pmf",
          },
        },
        {
          id: "conclusion",
          description: "Concludes the bound is −log(1) = 0, so D_KL ≥ 0.",
          weight: 2,
          required: true,
        },
        {
          id: "equality-case",
          description:
            "Characterises equality: Jensen is tight only when Q(x)/P(x) is constant almost surely, and normalisation forces that constant to be 1, so equality holds exactly when P = Q.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.8,
    expectedSeconds: 300,
    prereqClosure: ["jensen-inequality", "expectation", "pmf"],
    source: COVER_THOMAS,
    status: "live",
  },
  {
    id: "kl-divergence--transfer-why-used-despite-asymmetry",
    conceptId: "kl-divergence",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "KL divergence is not a distance — it is asymmetric, violates the triangle inequality, and can " +
      "be infinite. Why is it nevertheless the objective of choice across statistics and machine " +
      "learning? What property is actually being used?",
    rubric: {
      elements: [
        {
          id: "names-the-property",
          description:
            "Names the property that matters for optimisation: D_KL ≥ 0 always, with a minimum of exactly 0 attained exactly at P = Q — a known floor and a known minimiser.",
          weight: 3,
          required: true,
          misconception: {
            id: "cites-convenience",
            description:
              "Answers that KL is convenient, differentiable, or traditional, without naming the non-negative-with-attained-minimum property that makes 'minimise the KL' well posed at all.",
            blameConceptId: "kl-divergence",
          },
        },
        {
          id: "why-metric-axioms-are-irrelevant",
          description:
            "Argues that symmetry and the triangle inequality are what a metric needs for geometry, and an optimisation objective needs neither — nothing in minimising a loss requires it to be symmetric.",
          weight: 3,
          required: true,
        },
        {
          id: "concrete-uses",
          description:
            "Names at least two places the property is cashed in: maximum likelihood as forward KL, the ELBO in variational inference, the VAE's regulariser, t-SNE's loss, or AIC.",
          weight: 2,
          required: true,
        },
        {
          id: "when-it-fails",
          description:
            "Bonus: notes where the missing metric structure does bite — disjoint supports give infinite divergence and useless gradients, which is what Wasserstein-based methods were built to fix.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "restates-the-question",
          description:
            "Lists the ways KL fails to be a metric without ever naming the property that licenses using it anyway.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.9,
    expectedSeconds: 240,
    prereqClosure: ["jensen-inequality", "expectation"],
    source: BISHOP,
    status: "live",
  },

  // =========================================================================
  // Second authoring pass — doubling the pool for every concept above that
  // already had a full 8-item bank, keeping the difficulty spread wide and
  // adding genuine recall where the original pool leaned toward apply/explain.
  // =========================================================================

  // --- Central Limit Theorem (additional items) -----------------------------
  {
    id: "central-limit-theorem--recall-variance-requirement",
    conceptId: "central-limit-theorem",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The classical central limit theorem requires the population to have:",
    choices: [
      { id: "a", text: "finite variance", correct: true },
      {
        id: "b",
        text: "a known variance",
        correct: false,
        misconception: {
          id: "clt-needs-known-variance",
          description: "Confuses needing a finite variance for the theorem to hold with needing to already know its value.",
          blameConceptId: "central-limit-theorem",
        },
      },
      {
        id: "c",
        text: "a symmetric shape",
        correct: false,
        misconception: {
          id: "clt-needs-symmetry",
          description: "Skewness only slows convergence; it does not block the theorem.",
          blameConceptId: "central-limit-theorem",
        },
      },
      {
        id: "d",
        text: "at least 30 observations",
        correct: false,
        misconception: {
          id: "rule-of-thumb-as-hypothesis",
          description: "Promotes a rule of thumb about approximation quality into a hypothesis of the theorem, which is a statement about a limit.",
          blameConceptId: "central-limit-theorem",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["variance"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "central-limit-theorem--recall-what-converges",
    conceptId: "central-limit-theorem",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "State the CLT's conclusion in words: as n grows, what shape does the distribution of the sample " +
      "mean approach, and around what center and spread?",
    rubric: {
      elements: [
        {
          id: "shape",
          description: "States that the (standardized) sample mean's distribution approaches Normal.",
          weight: 3,
          required: true,
        },
        {
          id: "center-and-spread",
          description: "Names the center as μ and the spread as σ/√n (before standardizing).",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["normal-distribution", "variance"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "central-limit-theorem--apply-standard-error",
    conceptId: "central-limit-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A population has standard deviation 40. A sample of n = 25 is drawn. What is the standard error " +
      "of the sample mean X̄?",
    answerKey: 8,
    tolerance: 0.01,
    difficulty: 0.4,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["variance"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "central-limit-theorem--apply-tail-probability",
    conceptId: "central-limit-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A population has mean 10 and standard deviation 5, and n = 49. Using the CLT approximation, what is " +
      "P(X̄ < 9)? Give a decimal to three places.",
    answerKey: 0.081,
    tolerance: 0.005,
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["normal-distribution", "variance", "cdf"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "central-limit-theorem--explain-autocorrelated-data",
    conceptId: "central-limit-theorem",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The CLT requires the Xᵢ to be independent. Explain what specifically fails, and what happens to the " +
      "usual standard-error formula, if the data instead consists of repeated measurements on a single " +
      "individual over time (autocorrelated).",
    rubric: {
      elements: [
        {
          id: "independence-fails",
          description: "Explains that consecutive measurements on the same individual are correlated, so the iid hypothesis is violated.",
          weight: 3,
          required: true,
          misconception: {
            id: "iid-assumed-without-checking",
            description: "Applies the CLT's σ/√n standard error without checking that the observations are actually independent.",
            blameConceptId: "mutual-independence",
          },
        },
        {
          id: "consequence",
          description:
            "States that the effective sample size is smaller than n, so σ/√n underestimates the true standard error and confidence intervals built from it are too narrow.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["mutual-independence", "variance"],
    source: WASSERMAN,
    status: "live",
  },
  {
    id: "central-limit-theorem--explain-skewness-slows-convergence",
    conceptId: "central-limit-theorem",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the CLT approximation for X̄ is worse, at the same n, when the population is heavily " +
      "skewed than when it is symmetric.",
    rubric: {
      elements: [
        {
          id: "berry-esseen-intuition",
          description:
            "Explains that the rate of convergence to Normality depends on higher moments (informally, the Berry–Esseen bound scales with the population's third absolute moment relative to σ³√n).",
          weight: 3,
          required: true,
        },
        {
          id: "skew-has-larger-third-moment",
          description:
            "States that a skewed population has a larger third moment than a symmetric one, so its sample mean's distribution takes larger n to look Normal.",
          weight: 3,
          required: true,
          misconception: {
            id: "n-30-treated-as-universal",
            description: "Treats 'n ≥ 30 is enough' as a universal fact, ignoring that the needed n depends on how skewed the population is.",
            blameConceptId: "central-limit-theorem",
          },
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["variance", "modes-of-convergence"],
    source: WASSERMAN,
    status: "live",
  },
  {
    id: "central-limit-theorem--transfer-small-n-skewed-tail",
    conceptId: "central-limit-theorem",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A quality engineer treats X̄ as exactly Normal for a sample of n = 5 drawn from a heavily " +
      "right-skewed lead-time distribution, in order to set a 99.9% control limit. Explain why this " +
      "application is risky, and what evidence would make it more defensible.",
    rubric: {
      elements: [
        {
          id: "n-too-small-for-skew",
          description:
            "Explains that n = 5 is far too small for the CLT to have taken effect on a heavily skewed population, especially for an extreme (99.9%) quantile that sits deep in the tail where the approximation error is worst.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-clt-always-applies",
            description: "Invokes the CLT as though it applies uniformly well regardless of n, skewness, or how extreme the quantile of interest is.",
            blameConceptId: "central-limit-theorem",
          },
        },
        {
          id: "remedy",
          description:
            "Recommends checking with simulation, bootstrapping, or a larger historical sample rather than trusting the Normal approximation at the tail.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.8,
    expectedSeconds: 180,
    prereqClosure: ["variance", "modes-of-convergence"],
    source: WASSERMAN,
    status: "live",
  },
  {
    id: "central-limit-theorem--transfer-large-n-not-sufficient",
    conceptId: "central-limit-theorem",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Two analysts each build a 95% CI for a mean from n = 10,000 observations. One is averaging iid " +
      "transaction amounts; the other is averaging daily website error counts collected during a period " +
      "when a single outage caused correlated spikes across many days. Explain why the same n offers very " +
      "different protection in the two cases.",
    rubric: {
      elements: [
        {
          id: "independence-not-n-is-the-condition",
          description:
            "States that the CLT's guarantee needs independence, not merely a large n — large n alone does not fix a violated independence assumption.",
          weight: 3,
          required: true,
          misconception: {
            id: "large-n-fixes-all",
            description: "Assumes any sufficiently large n makes the CLT's Normal approximation trustworthy, regardless of whether the data are independent.",
            blameConceptId: "central-limit-theorem",
          },
        },
        {
          id: "effective-n-smaller",
          description:
            "Explains that correlated spikes during the outage mean the second dataset's effective sample size is much smaller than 10,000, so its naive standard error understates the true uncertainty.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["mutual-independence", "modes-of-convergence"],
    source: WASSERMAN,
    status: "live",
  },

  // --- Change of Variables (Jacobian) (additional items) --------------------
  {
    id: "change-of-variables-jacobian--recall-univariate-name",
    conceptId: "change-of-variables-jacobian",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In the one-dimensional change-of-variables formula, the factor |dg⁻¹/dy| is:",
    choices: [
      { id: "a", text: "the derivative of the inverse transformation, evaluated at y", correct: true },
      {
        id: "b",
        text: "the second derivative of g",
        correct: false,
        misconception: {
          id: "confuses-order-of-derivative",
          description: "Names the wrong order of derivative; the formula needs only the first derivative of the inverse map.",
          blameConceptId: "determinant",
        },
      },
      {
        id: "c",
        text: "the integral of g over its domain",
        correct: false,
        misconception: {
          id: "confuses-derivative-with-integral",
          description: "Substitutes an integral for a derivative, which are opposite operations.",
          blameConceptId: "pdf",
        },
      },
      {
        id: "d",
        text: "the inverse function g⁻¹ itself",
        correct: false,
        misconception: {
          id: "confuses-function-with-its-derivative",
          description: "Confuses the transformation with its rate of change.",
          blameConceptId: "determinant",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["determinant"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--recall-three-factors",
    conceptId: "change-of-variables-jacobian",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "In f_Y(y) = f_X(g⁻¹(y))·|det J(y)|, name what each of the three pieces on the right-hand side " +
      "contributes, in one phrase each.",
    rubric: {
      elements: [
        {
          id: "composition",
          description: "f_X(g⁻¹(y)) evaluates the original density at the point that maps to y.",
          weight: 2,
          required: true,
        },
        {
          id: "determinant",
          description: "det J is the local volume-scaling factor of the transformation.",
          weight: 2,
          required: true,
        },
        {
          id: "absolute-value",
          description: "The absolute value keeps the result nonnegative, since a density can never be negative.",
          weight: 2,
        },
      ],
    },
    difficulty: -1.3,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["determinant", "pdf"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--apply-exponential-from-uniform",
    conceptId: "change-of-variables-jacobian",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ Uniform(0, 1) and Y = −ln(X). Using the change-of-variables formula, evaluate the density of Y " +
      "at y = 1. Give a decimal to four places.",
    answerKey: 0.3679,
    tolerance: 0.001,
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["pdf", "cdf"],
    source: BLITZSTEIN,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--apply-linear-map-determinant",
    conceptId: "change-of-variables-jacobian",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For the linear map (x₁, x₂) ↦ (2x₁ + x₂, x₁ + 3x₂), compute the absolute value of the Jacobian " +
      "determinant.",
    answerKey: 5,
    tolerance: 0.001,
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["determinant", "matrices"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--explain-inverse-function-theorem-link",
    conceptId: "change-of-variables-jacobian",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The 1-D formula is sometimes written using g'(x) evaluated at x = g⁻¹(y) instead of (g⁻¹)'(y) " +
      "evaluated at y. Explain why these give the same number.",
    rubric: {
      elements: [
        {
          id: "inverse-function-theorem",
          description: "Invokes (g⁻¹)'(y) = 1/g'(g⁻¹(y)), the inverse function theorem, to relate the two expressions.",
          weight: 3,
          required: true,
        },
        {
          id: "same-value",
          description: "Concludes both expressions, evaluated at their corresponding points, give the identical number — they are two ways of writing the same formula.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-as-two-different-formulas",
            description: "Treats the two expressions as competing formulas rather than as algebraically identical restatements.",
            blameConceptId: "determinant",
          },
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["pdf", "determinant"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--explain-non-injective-failure",
    conceptId: "change-of-variables-jacobian",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the basic change-of-variables formula fails outright — not just becomes harder — when " +
      "g is not injective, using Y = X² for X ranging over all of ℝ as the example.",
    rubric: {
      elements: [
        {
          id: "multiple-preimages",
          description:
            "Explains that a single y > 0 has two preimages (±√y), so probability mass from two different x-regions maps to the same y and must both be counted.",
          weight: 3,
          required: true,
          misconception: {
            id: "applies-single-branch-formula",
            description: "Applies the single-branch change-of-variables formula to a map that is not injective, silently dropping one preimage's contribution.",
            blameConceptId: "pdf",
          },
        },
        {
          id: "corrected-formula",
          description: "States the fix: sum |g'(xᵢ)|⁻¹f_X(xᵢ) over every preimage xᵢ of y, rather than using only one branch.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["pdf", "determinant"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--transfer-inverse-transform-sampling",
    conceptId: "change-of-variables-jacobian",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A simulation library draws U ~ Uniform(0, 1) and returns Y = F_Y⁻¹(U) to sample from a target " +
      "density f_Y. Explain why this is a special case of the change-of-variables formula, and identify " +
      "what plays the role of the Jacobian.",
    rubric: {
      elements: [
        {
          id: "maps-to-the-formula",
          description:
            "Identifies g = F_Y⁻¹ as the transformation, f_U ≡ 1 as the base density, and shows the Jacobian factor is d/du F_Y⁻¹(u) = 1/f_Y(F_Y⁻¹(u)).",
          weight: 3,
          required: true,
        },
        {
          id: "self-consistency",
          description: "Substitutes back into the general formula to show it returns exactly f_Y(y), confirming the technique works for any continuous distribution with an invertible CDF.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-as-unrelated-trick",
            description: "Treats inverse-transform sampling as an unrelated programming trick rather than an instance of the change-of-variables formula.",
            blameConceptId: "pdf",
          },
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["pdf", "determinant"],
    source: BLITZSTEIN,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--transfer-mode-does-not-transform-like-mean",
    conceptId: "change-of-variables-jacobian",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A researcher fits a Normal posterior for log(θ) and reports the posterior mode of θ by simply " +
      "exponentiating the posterior mode of log(θ). Explain what changes about the density (not just the " +
      "point estimate) under this transformation, and why the mode does not transform the same way a " +
      "quantile does.",
    rubric: {
      elements: [
        {
          id: "extra-jacobian-factor",
          description:
            "Applies change-of-variables to show the density of θ is the density of log θ times |d(log θ)/dθ| = 1/θ, an extra factor absent from the log-space density.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-mode-invariant-under-transform",
            description: "Assumes the location of a density's peak transforms the same simple way a quantile does under a monotone reparameterization.",
            blameConceptId: "pdf",
          },
        },
        {
          id: "mode-shifts",
          description:
            "Concludes the extra, non-constant Jacobian factor shifts where the maximum sits, so the mode of θ's density is generally not the exponential of the mode of log θ's density — unlike the median, which is invariant under any monotone transform.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["pdf", "determinant"],
    source: MML,
    status: "live",
  },

  // --- Covariance Matrix (additional items) ---------------------------------
  {
    id: "covariance-matrix--recall-diagonal-is-variance",
    conceptId: "covariance-matrix",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Cov(X, X) equals:",
    choices: [
      { id: "a", text: "Var(X)", correct: true },
      {
        id: "b",
        text: "0",
        correct: false,
        misconception: {
          id: "self-covariance-as-zero",
          description: "Treats covariance of a variable with itself as though it must vanish, like a cross term.",
          blameConceptId: "variance",
        },
      },
      {
        id: "c",
        text: "E[X]",
        correct: false,
        misconception: {
          id: "self-covariance-as-mean",
          description: "Confuses a second-moment quantity (covariance) with a first-moment one (the mean).",
          blameConceptId: "covariance",
        },
      },
      {
        id: "d",
        text: "1",
        correct: false,
        misconception: {
          id: "self-covariance-as-one",
          description: "Confuses covariance with a normalised quantity like correlation, which is 1 for a variable with itself.",
          blameConceptId: "covariance",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 25,
    prereqClosure: ["covariance", "variance"],
    source: MML,
    status: "live",
  },
  {
    id: "covariance-matrix--recall-independence-implies-zero",
    conceptId: "covariance-matrix",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "If X and Y are independent, what is Cov(X, Y)?",
    choices: [
      { id: "a", text: "0", correct: true },
      {
        id: "b",
        text: "Var(X)·Var(Y)",
        correct: false,
        misconception: {
          id: "covariance-as-variance-product",
          description: "Confuses covariance with a product of variances rather than a measure of joint linear co-movement.",
          blameConceptId: "covariance",
        },
      },
      {
        id: "c",
        text: "Cannot be determined without more information",
        correct: false,
        misconception: {
          id: "misses-independence-consequence",
          description: "Independence is a strong enough condition on its own to pin down the covariance exactly.",
          blameConceptId: "covariance",
        },
      },
      {
        id: "d",
        text: "1",
        correct: false,
        misconception: {
          id: "covariance-independence-as-one",
          description: "Confuses independence, which forces zero covariance, with perfect correlation, which is the opposite case.",
          blameConceptId: "covariance",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["covariance"],
    source: MML,
    status: "live",
  },
  {
    id: "covariance-matrix--apply-variance-of-linear-combination",
    conceptId: "covariance-matrix",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Var(X₁) = 9, Var(X₂) = 4, Cov(X₁, X₂) = −2. Using Var(aX₁ + bX₂) = a²Var(X₁) + b²Var(X₂) + " +
      "2ab·Cov(X₁, X₂), compute Var(2X₁ − X₂).",
    answerKey: 48,
    tolerance: 0.01,
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["covariance", "variance", "matrix-multiplication"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "covariance-matrix--apply-correlation-from-sigma",
    conceptId: "covariance-matrix",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Σ = [[4, 2], [2, 4]]. Compute the correlation ρ = Cov(X₁, X₂) / √(Var(X₁)·Var(X₂)).",
    answerKey: 0.5,
    tolerance: 0.01,
    difficulty: 0.7,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["covariance", "variance"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "covariance-matrix--explain-diagonal-iff-uncorrelated",
    conceptId: "covariance-matrix",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why Σ being diagonal is equivalent to the components of X being pairwise uncorrelated, " +
      "directly from the definition of Σ.",
    rubric: {
      elements: [
        {
          id: "off-diagonal-is-covariance",
          description: "States that the off-diagonal entries of Σ are exactly the pairwise covariances Cov(Xᵢ, Xⱼ).",
          weight: 3,
          required: true,
        },
        {
          id: "zero-means-uncorrelated",
          description: "Concludes Σ diagonal ⟺ all these off-diagonal covariances are zero ⟺ pairwise uncorrelated, by definition.",
          weight: 3,
          required: true,
          misconception: {
            id: "diagonal-assumed-independent",
            description: "Concludes a diagonal Σ implies independence, when it only guarantees the weaker property of being uncorrelated.",
            blameConceptId: "covariance",
          },
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["covariance", "variance"],
    source: MML,
    status: "live",
  },
  {
    id: "covariance-matrix--explain-correlation-matrix-is-not-covariance",
    conceptId: "covariance-matrix",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A data scientist standardises every feature to unit variance and then computes the covariance " +
      "matrix of the standardised features, calling the result 'the covariance matrix.' Explain what " +
      "object they have actually computed, and why calling it that is misleading.",
    rubric: {
      elements: [
        {
          id: "it-is-the-correlation-matrix",
          description:
            "Identifies that standardising to unit variance turns Σ into the correlation matrix: diagonal entries become 1 and off-diagonal entries become the pairwise correlations.",
          weight: 3,
          required: true,
          misconception: {
            id: "correlation-and-covariance-conflated",
            description: "Treats the correlation matrix and the covariance matrix of the original variables as the same object.",
            blameConceptId: "covariance-matrix",
          },
        },
        {
          id: "discards-scale",
          description: "Explains that it is a valid positive semi-definite matrix in its own right, but discards the original variables' scales, so it is not the covariance of the data as collected.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["covariance", "variance"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "covariance-matrix--transfer-frequency-mismatch",
    conceptId: "covariance-matrix",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An analyst estimates Σ for three assets from monthly returns, then uses that same Σ directly to " +
      "justify a daily risk decision. What's wrong with this?",
    rubric: {
      elements: [
        {
          id: "frequency-specific",
          description: "Explains that Σ estimated from monthly returns describes the covariation of monthly returns, not daily ones, so it cannot be plugged directly into a daily-horizon decision.",
          weight: 3,
          required: true,
          misconception: {
            id: "sigma-treated-as-frequency-invariant",
            description: "Treats a covariance matrix estimated at one time horizon as directly usable at another without rescaling assumptions.",
            blameConceptId: "covariance-matrix",
          },
        },
        {
          id: "scaling-assumption",
          description: "Notes that converting horizons is not a simple division by the number of days — it implicitly assumes iid returns across days, which volatility clustering typically violates.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["covariance", "variance"],
    source: MML,
    status: "live",
  },
  {
    id: "covariance-matrix--transfer-factor-model-decomposition",
    conceptId: "covariance-matrix",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "In a factor model, returns are X = Bf + ε, where f is a k-dimensional factor vector and ε is " +
      "idiosyncratic noise, uncorrelated with f and across assets. Derive how Σ decomposes, and explain " +
      "why this is useful when the number of assets p is much larger than the number of factors k.",
    rubric: {
      elements: [
        {
          id: "decomposition",
          description: "Derives Σ = B·Cov(f)·Bᵀ + Cov(ε), with Cov(ε) diagonal because idiosyncratic noise is uncorrelated across assets.",
          weight: 3,
          required: true,
          misconception: {
            id: "estimates-sigma-directly-ignoring-structure",
            description: "Estimates the full unstructured Σ directly, ignoring a known factor structure that could regularise the estimate.",
            blameConceptId: "rank",
          },
        },
        {
          id: "parameter-reduction",
          description:
            "Explains that this decomposition needs only about k(k+1)/2 + pk + p parameters instead of p(p+1)/2, dramatically reducing what must be estimated when p ≫ k — directly addressing the p ≫ n singularity problem raised elsewhere.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["covariance", "variance", "matrix-multiplication"],
    source: MML,
    status: "live",
  },

  // --- Bivariate Normal (additional items) ----------------------------------
  {
    id: "bivariate-normal--recall-marginal-is-normal",
    conceptId: "bivariate-normal",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For a bivariate normal pair (X, Y) with correlation ρ, the marginal distribution of X alone is:",
    choices: [
      { id: "a", text: "Normal with mean μ_X and variance σ_X²", correct: true },
      {
        id: "b",
        text: "Not necessarily Normal, since it depends on ρ",
        correct: false,
        misconception: {
          id: "marginal-depends-on-rho",
          description: "Assumes the marginal shape depends on the correlation, when marginalising a bivariate normal always yields a Normal marginal regardless of ρ.",
          blameConceptId: "bivariate-normal",
        },
      },
      {
        id: "c",
        text: "Standard Normal, regardless of σ_X",
        correct: false,
        misconception: {
          id: "marginal-forced-standard",
          description: "Drops the marginal's own mean and variance parameters, replacing them with the standard Normal's.",
          blameConceptId: "normal-distribution",
        },
      },
      {
        id: "d",
        text: "Normal only if ρ = 0",
        correct: false,
        misconception: {
          id: "marginal-normality-tied-to-rho-zero",
          description: "Confuses when the *joint* factors into a product of independent Normals (ρ = 0) with the (always true) Normality of each marginal on its own.",
          blameConceptId: "bivariate-normal",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["normal-distribution", "covariance"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bivariate-normal--recall-five-parameters",
    conceptId: "bivariate-normal",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Write the five numbers that parameterise a bivariate normal distribution, and give the constraint ρ " +
      "must satisfy.",
    rubric: {
      elements: [
        {
          id: "five-parameters",
          description: "Lists μ_X, μ_Y, σ_X², σ_Y², and ρ.",
          weight: 3,
          required: true,
        },
        {
          id: "constraint",
          description: "States that ρ must lie strictly between −1 and 1 for a genuine (non-degenerate) density.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["normal-distribution", "covariance"],
    source: OCW_18_05,
    status: "live",
  },
  {
    id: "bivariate-normal--apply-conditional-mean-general",
    conceptId: "bivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "(X, Y) is bivariate normal with μ_X = 5, μ_Y = 10, σ_X = 2, σ_Y = 3, ρ = 0.6. Compute E[Y | X = 7].",
    answerKey: 11.8,
    tolerance: 0.02,
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["normal-distribution", "covariance", "joint-distribution", "expectation"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "bivariate-normal--apply-conditional-variance-general",
    conceptId: "bivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For the same bivariate normal (μ_X = 5, μ_Y = 10, σ_X = 2, σ_Y = 3, ρ = 0.6), compute Var(Y | X = 7).",
    answerKey: 5.76,
    tolerance: 0.02,
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["normal-distribution", "covariance", "variance", "joint-distribution"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "bivariate-normal--explain-conditional-variance-constant",
    conceptId: "bivariate-normal",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, without computing anything, why Var(Y | X = x) for a bivariate normal does not depend on " +
      "the specific value x.",
    rubric: {
      elements: [
        {
          id: "formula-has-no-x",
          description: "Notes that the formula σ_Y²(1 − ρ²) has no x in it at all — the conditional mean shifts linearly with x, but the spread around it does not.",
          weight: 3,
          required: true,
          misconception: {
            id: "expects-heteroskedasticity",
            description: "Assumes conditional uncertainty must shrink or grow for extreme x, importing intuition from families where it does.",
            blameConceptId: "bivariate-normal",
          },
        },
        {
          id: "contrast",
          description: "Notes this is a special property of joint normality — most joint distributions have a conditional spread that genuinely does depend on x.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["normal-distribution", "covariance", "variance", "joint-distribution"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "bivariate-normal--explain-rho-one-degenerate",
    conceptId: "bivariate-normal",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Show algebraically why ρ = ±1 makes the bivariate normal density degenerate (undefined via the " +
      "usual formula), and say what this means geometrically.",
    rubric: {
      elements: [
        {
          id: "denominator-vanishes",
          description: "Identifies that the factor 1 − ρ² appears in the denominator of the normalising constant and in the exponent, and becomes zero at |ρ| = 1.",
          weight: 3,
          required: true,
        },
        {
          id: "geometric-reading",
          description: "Explains that |ρ| = 1 means Y is an exact linear function of X, so the pair collapses onto a line — a 1-dimensional object with no 2-dimensional density with respect to area on the plane.",
          weight: 3,
          required: true,
          misconception: {
            id: "rho-one-treated-as-strong-correlation",
            description: "Treats |ρ| = 1 as merely 'very strong correlation' rather than as the degenerate boundary case where no genuine joint density exists.",
            blameConceptId: "bivariate-normal",
          },
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["normal-distribution", "covariance", "joint-distribution"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "bivariate-normal--transfer-tail-dependence",
    conceptId: "bivariate-normal",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A financial model assumes two stocks' returns are bivariate normal with ρ = 0.3. During a market " +
      "crash, both stocks are observed to crash together far more often than this model would predict, " +
      "even though the linear correlation over the whole period is still about 0.3. Explain what's " +
      "happening, and why relying on ρ alone understates the joint tail risk.",
    rubric: {
      elements: [
        {
          id: "no-tail-dependence-in-model",
          description: "Explains that the bivariate normal has exactly zero tail dependence regardless of ρ — its joint tails thin out independently — while real returns often show genuine comovement concentrated in the tails.",
          weight: 3,
          required: true,
          misconception: {
            id: "correlation-assumed-to-capture-tail-behavior",
            description: "Treats a single correlation coefficient as capturing all forms of joint dependence, including how the variables behave together in extreme scenarios.",
            blameConceptId: "bivariate-normal",
          },
        },
        {
          id: "consequence",
          description: "Concludes that a model assuming bivariate normality will systematically underestimate the probability of simultaneous extreme losses.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.9,
    expectedSeconds: 210,
    prereqClosure: ["covariance", "joint-distribution", "normal-distribution"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "bivariate-normal--transfer-exact-linearity-justifies-regression",
    conceptId: "bivariate-normal",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Simple linear regression of Y on X assumes E[Y | X = x] is exactly linear in x. Explain the precise " +
      "sense in which the bivariate normal model justifies that assumption, and give a joint distribution " +
      "where it would be wrong to assume linearity.",
    rubric: {
      elements: [
        {
          id: "exact-not-approximate",
          description: "States that under bivariate normality, E[Y | X = x] = μ_Y + ρ(σ_Y/σ_X)(x − μ_X) is the exact conditional mean, not merely a convenient approximation.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-linearity-always-approximate",
            description: "Treats linear regression's straight-line assumption as always just a convenient approximation, missing that under joint normality it is exact.",
            blameConceptId: "bivariate-normal",
          },
        },
        {
          id: "counterexample",
          description: "Gives a joint distribution where the true regression function is curved — for example (X, X²), which is not bivariate normal — so assuming linearity there would be wrong.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.5,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["covariance", "joint-distribution", "normal-distribution"],
    source: BISHOP,
    status: "live",
  },

  // --- Multivariate Normal (additional items) -------------------------------
  {
    id: "multivariate-normal--recall-parameter-count",
    conceptId: "multivariate-normal",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How many free parameters does a k-dimensional multivariate normal N_k(μ, Σ) have?",
    choices: [
      { id: "a", text: "k for the mean, plus k(k + 1)/2 for the symmetric Σ", correct: true },
      {
        id: "b",
        text: "k for the mean and k for the variance only, assuming independent components",
        correct: false,
        misconception: {
          id: "assumes-diagonal-sigma",
          description: "Silently assumes a diagonal Σ rather than allowing the general symmetric positive definite case.",
          blameConceptId: "covariance-matrix",
        },
      },
      {
        id: "c",
        text: "k² for Σ, since it has k rows and k columns",
        correct: false,
        misconception: {
          id: "double-counts-symmetric-entries",
          description: "Counts every entry of Σ separately, double-counting the symmetric off-diagonal pairs.",
          blameConceptId: "covariance-matrix",
        },
      },
      {
        id: "d",
        text: "2k — one mean and one variance per dimension",
        correct: false,
        misconception: {
          id: "ignores-covariances",
          description: "Omits the off-diagonal covariance parameters entirely.",
          blameConceptId: "covariance-matrix",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["covariance-matrix"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "multivariate-normal--recall-linear-combination-distribution",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "If X ~ N_k(μ, Σ), what is the distribution of a linear combination aᵀX for a fixed vector a? Give " +
      "its mean and variance.",
    rubric: {
      elements: [
        {
          id: "univariate-normal",
          description: "States that aᵀX is univariate Normal.",
          weight: 3,
          required: true,
        },
        {
          id: "mean-and-variance",
          description: "Gives mean aᵀμ and variance aᵀΣa.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.3,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["covariance-matrix", "matrix-multiplication"],
    source: MML,
    status: "live",
  },
  {
    id: "multivariate-normal--apply-determinant-2x2",
    conceptId: "multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "X ~ N₂(0, Σ) with Σ = [[6, 1], [1, 2]]. Compute |Σ|.",
    answerKey: 11,
    tolerance: 0.001,
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["determinant", "covariance-matrix"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "multivariate-normal--apply-variance-of-combination",
    conceptId: "multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "X ~ N₂(0, Σ) with Σ = [[6, 1], [1, 2]]. Compute Var(X₁ + 2X₂).",
    answerKey: 18,
    tolerance: 0.001,
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["covariance-matrix", "variance", "matrix-multiplication"],
    source: MML,
    status: "live",
  },
  {
    id: "multivariate-normal--explain-marginalisation-is-free",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why any subset of components of a multivariate normal vector is itself multivariate normal, " +
      "and why finding its parameters needs no integration.",
    rubric: {
      elements: [
        {
          id: "subblock-extraction",
          description: "Explains that the marginal for a subset S is obtained by simply taking the corresponding rows/columns of μ and Σ.",
          weight: 3,
          required: true,
        },
        {
          id: "no-integration-needed",
          description: "Contrasts this with a generic joint distribution, where obtaining a marginal requires integrating out the other variables.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-marginals-always-need-integration",
            description: "Assumes every marginal distribution must be obtained by integrating out the remaining variables, missing the multivariate normal's closure property.",
            blameConceptId: "multivariate-normal",
          },
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["covariance-matrix", "joint-distribution"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "multivariate-normal--explain-spherical-special-case",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the multivariate normal's contours of constant density are always ellipsoids centred at " +
      "μ, and why the special case Σ = σ²I gives spheres.",
    rubric: {
      elements: [
        {
          id: "quadratic-form-is-ellipsoid",
          description: "States that (x − μ)ᵀΣ⁻¹(x − μ) = c traces an ellipsoid whose shape is set by Σ's eigenstructure.",
          weight: 3,
          required: true,
        },
        {
          id: "isotropic-case",
          description: "Explains that when Σ = σ²I every eigenvalue equals σ², so the ellipsoid degenerates to a sphere of radius σ√c.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["eigendecomposition", "covariance-matrix", "determinant"],
    source: STRANG_18_06,
    status: "live",
  },
  {
    id: "multivariate-normal--transfer-p-greater-than-n-mahalanobis",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A dataset has 50 features and only 40 observations. Someone wants to fit a full multivariate " +
      "normal model (unrestricted Σ) to it for anomaly detection via Mahalanobis distance. Explain " +
      "concretely what goes wrong, and name one remedy.",
    rubric: {
      elements: [
        {
          id: "sigma-singular",
          description: "Explains that with p = 50 > n = 40, the sample covariance matrix is singular (rank at most n − 1), so Σ⁻¹, which Mahalanobis distance needs, does not exist.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-mle-sigma-always-usable",
            description: "Assumes the maximum-likelihood covariance estimate is always invertible and usable, regardless of the relationship between p and n.",
            blameConceptId: "covariance-matrix",
          },
        },
        {
          id: "remedy",
          description: "Names a remedy: shrinkage/ridge regularisation of Σ, an assumed factor structure, or dimension reduction (e.g. PCA) before fitting.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.5,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["covariance-matrix", "determinant"],
    source: MML,
    status: "live",
  },
  {
    id: "multivariate-normal--transfer-maximum-entropy",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the multivariate normal is the maximum-entropy distribution among all continuous " +
      "distributions on ℝᵏ with a given mean and covariance, and what this property is used for.",
    rubric: {
      elements: [
        {
          id: "least-additional-assumption",
          description: "States that among all distributions sharing the specified first and second moments, the Gaussian has the highest differential entropy — the 'least additional assumption' choice given only mean and covariance are known.",
          weight: 3,
          required: true,
          misconception: {
            id: "gaussian-always-needs-empirical-justification",
            description: "Assumes a Gaussian model always needs direct empirical justification, missing that it is the natural default under a moment constraint alone.",
            blameConceptId: "multivariate-normal",
          },
        },
        {
          id: "uses",
          description: "Names a use: justifying Gaussian noise models, or Gaussian priors, when only the moments of a quantity are known or specified.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["covariance-matrix", "normal-distribution"],
    source: BISHOP,
    status: "live",
  },

  // --- Pearson Correlation (additional items) -------------------------------
  {
    id: "pearson-correlation--recall-zero-r-not-independence",
    conceptId: "pearson-correlation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "If r = 0 for a dataset, what can you conclude?",
    choices: [
      { id: "a", text: "There is no linear association in the sample; a nonlinear relationship may still exist", correct: true },
      {
        id: "b",
        text: "The variables are independent",
        correct: false,
        misconception: {
          id: "zero-r-as-independence",
          description: "Reads a sample statistic about linear association as a much stronger claim about full statistical independence.",
          blameConceptId: "correlation",
        },
      },
      {
        id: "c",
        text: "The variables are completely unrelated",
        correct: false,
        misconception: {
          id: "zero-r-as-unrelated",
          description: "Overstates the scope of r, which measures only linear co-movement, not any form of relationship.",
          blameConceptId: "pearson-correlation",
        },
      },
      {
        id: "d",
        text: "y does not depend on x at all",
        correct: false,
        misconception: {
          id: "zero-r-as-no-dependence",
          description: "Misses that a strong nonlinear (e.g. quadratic) dependence can still give r = 0.",
          blameConceptId: "pearson-correlation",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["correlation"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "pearson-correlation--recall-symmetry",
    conceptId: "pearson-correlation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "What happens to r if you swap the roles of X and Y — that is, compute the correlation of Y with X " +
      "instead of X with Y?",
    rubric: {
      elements: [
        {
          id: "symmetric",
          description: "States that r is symmetric: r(X, Y) = r(Y, X), because the formula treats the two centred variables identically.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.4,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["correlation"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "pearson-correlation--apply-perfect-line",
    conceptId: "pearson-correlation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "For the three points (1, 1), (2, 2), (3, 3), compute the sample Pearson correlation r.",
    answerKey: 1,
    tolerance: 0.001,
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["sample-mean", "sample-variance", "correlation"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "pearson-correlation--apply-compute-mixed",
    conceptId: "pearson-correlation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For the five points (1, 5), (2, 3), (3, 6), (4, 2), (5, 4), compute r. Give a decimal to two " +
      "places, including the sign.",
    answerKey: -0.3,
    tolerance: 0.02,
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["sample-mean", "sample-variance", "correlation"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "pearson-correlation--explain-standardised-covariance",
    conceptId: "pearson-correlation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why standardising both variables to z-scores before computing their covariance yields r " +
      "directly.",
    rubric: {
      elements: [
        {
          id: "dividing-by-sds",
          description: "Explains that standardising divides each deviation by its own standard deviation — exactly what the correlation formula does term by term in its denominator.",
          weight: 3,
          required: true,
        },
        {
          id: "cov-of-z-is-r",
          description: "Concludes Cov(z_X, z_Y) equals r(X, Y) exactly.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["correlation", "covariance", "sample-variance"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "pearson-correlation--explain-cosine-orthogonality",
    conceptId: "pearson-correlation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "r can be read as the cosine of the angle between the centred data vectors u and v. Explain why " +
      "r = 0 exactly when u and v are orthogonal, and connect this to 'zero linear association.'",
    rubric: {
      elements: [
        {
          id: "orthogonality-iff-zero-inner-product",
          description: "States that cos(θ) = 0 exactly when the vectors are perpendicular, i.e. when their inner product Σ(xᵢ − x̄)(yᵢ − ȳ) is zero.",
          weight: 3,
          required: true,
        },
        {
          id: "geometric-reading",
          description: "Concludes that zero sample covariance — and hence r = 0 — is a literal geometric statement about the two centred vectors, not just a name for 'no linear association.'",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["correlation", "covariance", "sample-variance"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "pearson-correlation--transfer-restriction-of-range",
    conceptId: "pearson-correlation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A study reports r = 0.4 between hours studied and exam score, computed only among students who " +
      "chose to take an optional retake exam. Explain what selection does to this correlation, " +
      "referencing restriction of range.",
    rubric: {
      elements: [
        {
          id: "non-random-subgroup",
          description: "Explains that retake-takers are a non-random, often narrower-scoring subgroup of all students.",
          weight: 3,
          required: true,
          misconception: {
            id: "r-treated-as-invariant-to-subsample",
            description: "Treats r as a fixed property of the relationship that would look the same computed on any subgroup, ignoring how restricting the range changes it.",
            blameConceptId: "pearson-correlation",
          },
        },
        {
          id: "restriction-shrinks-r",
          description: "States that restricting the range of one or both variables systematically shrinks the magnitude of the observed correlation relative to the full population's.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["correlation", "sample-variance"],
    source: WASSERMAN,
    status: "live",
  },
  {
    id: "pearson-correlation--transfer-deterministic-but-uncorrelated",
    conceptId: "pearson-correlation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Describe a pair of variables that are deterministically related but have r ≈ 0, and explain why " +
      "this does not contradict the Cauchy–Schwarz bound |r| ≤ 1.",
    rubric: {
      elements: [
        {
          id: "example",
          description: "Gives an example such as X uniform on (−1, 1) and Y = X²: deterministic, but r ≈ 0 because the symmetric, nonlinear relationship cancels out in the linear covariance term.",
          weight: 3,
          required: true,
        },
        {
          id: "no-contradiction",
          description: "Explains that Cauchy–Schwarz bounds r for the specific linear inner product it measures; it says nothing about nonlinear dependence, so there is no contradiction — the bound concerns what r is measuring, not dependence in general.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["correlation", "covariance", "sample-variance"],
    source: WASSERMAN,
    status: "live",
  },

  // --- Kullback-Leibler Divergence (additional items) -----------------------
  {
    id: "kl-divergence--recall-self-divergence",
    conceptId: "kl-divergence",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is D_KL(P ‖ P), the divergence of a distribution from itself?",
    choices: [
      { id: "a", text: "0", correct: true },
      {
        id: "b",
        text: "1",
        correct: false,
        misconception: {
          id: "self-divergence-as-one",
          description: "Confuses KL divergence with a normalised similarity score that equals 1 for identical distributions.",
          blameConceptId: "kl-divergence",
        },
      },
      {
        id: "c",
        text: "Undefined",
        correct: false,
        misconception: {
          id: "self-divergence-undefined",
          description: "Worries the log(P/P) ratio is problematic, missing that log(1) = 0 is perfectly well defined wherever P(x) > 0.",
          blameConceptId: "kl-divergence",
        },
      },
      {
        id: "d",
        text: "Depends on the distribution",
        correct: false,
        misconception: {
          id: "self-divergence-not-constant",
          description: "Misses that D_KL(P‖P) = 0 identically, for every distribution P, as a direct consequence of the formula.",
          blameConceptId: "kl-divergence",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["expectation"],
    source: COVER_THOMAS,
    status: "live",
  },
  {
    id: "kl-divergence--recall-units",
    conceptId: "kl-divergence",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In what units is KL divergence reported, and what determines which unit is used?",
    rubric: {
      elements: [
        {
          id: "units",
          description: "States nats when using the natural logarithm, and bits when using log base 2.",
          weight: 3,
          required: true,
        },
        {
          id: "conversion",
          description: "Notes the conversion factor between them is ln(2) ≈ 0.693.",
          weight: 2,
        },
      ],
    },
    difficulty: -1.5,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["expectation"],
    source: COVER_THOMAS,
    status: "live",
  },
  {
    id: "kl-divergence--apply-bernoulli-moderate",
    conceptId: "kl-divergence",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "P = Bernoulli(0.3) and Q = Bernoulli(0.5). Compute D_KL(P ‖ Q) in nats. Give a decimal to three " +
      "places.",
    answerKey: 0.082,
    tolerance: 0.003,
    difficulty: 0.2,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["expectation", "pmf"],
    source: COVER_THOMAS,
    status: "live",
  },
  {
    id: "kl-divergence--apply-nats-to-bits",
    conceptId: "kl-divergence",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "D_KL(P ‖ Q) = 0.511 nats. Convert this to bits. Give a decimal to three places.",
    answerKey: 0.737,
    tolerance: 0.005,
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["expectation"],
    source: COVER_THOMAS,
    status: "live",
  },
  {
    id: "kl-divergence--explain-infinite-when-support-mismatched",
    conceptId: "kl-divergence",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why D_KL(P ‖ Q) can be infinite even when D_KL(Q ‖ P) is finite, using a case where Q " +
      "assigns zero probability somewhere P does not.",
    rubric: {
      elements: [
        {
          id: "division-by-zero-inside-log",
          description: "Explains that the term P(x)log(P(x)/Q(x)) blows up to +∞ whenever Q(x) = 0 but P(x) > 0.",
          weight: 3,
          required: true,
          misconception: {
            id: "kl-assumed-always-finite",
            description: "Treats KL divergence as always finite, without checking whether the reference distribution's support covers the other's.",
            blameConceptId: "kl-divergence",
          },
        },
        {
          id: "reverse-direction-condition",
          description: "Notes that the reverse direction D_KL(Q‖P) only requires Q(x) = 0 ⟹ P(x) = 0, a different and here satisfied condition.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["expectation", "pmf"],
    source: COVER_THOMAS,
    status: "live",
  },
  {
    id: "kl-divergence--explain-mode-seeking-vs-mass-covering",
    conceptId: "kl-divergence",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain the mode-seeking versus mass-covering distinction between minimising D_KL(Q ‖ P) and " +
      "D_KL(P ‖ Q) when Q is a simple family (e.g. a single Gaussian) approximating a complex multimodal P.",
    rubric: {
      elements: [
        {
          id: "reverse-kl-mode-seeking",
          description: "Explains that minimising D_KL(Q‖P) (reverse KL) penalises Q for putting mass where P has none, so Q tends to lock onto a single mode of P.",
          weight: 3,
          required: true,
        },
        {
          id: "forward-kl-mass-covering",
          description: "Explains that minimising D_KL(P‖Q) (forward KL, as in maximum likelihood) penalises Q for missing mass where P has some, forcing Q to spread out and cover all of P's modes.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["expectation", "pmf"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "kl-divergence--transfer-elbo-nonnegativity",
    conceptId: "kl-divergence",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The evidence lower bound (ELBO) used in variational inference satisfies log p(x) = ELBO + " +
      "D_KL(q ‖ p_posterior). Explain, using only the non-negativity property of KL divergence, why " +
      "maximising the ELBO is equivalent to minimising that KL term.",
    rubric: {
      elements: [
        {
          id: "lower-bound-from-nonnegativity",
          description: "Explains that D_KL ≥ 0 makes ELBO ≤ log p(x) automatically — a genuine lower bound.",
          weight: 3,
          required: true,
          misconception: {
            id: "elbo-and-kl-treated-as-unrelated",
            description: "Treats maximising the ELBO and minimising the KL term as two separate, unrelated procedures rather than as the same optimisation.",
            blameConceptId: "kl-divergence",
          },
        },
        {
          id: "fixed-log-evidence",
          description: "Notes that log p(x) does not depend on q, so for fixed data, maximising ELBO is exactly equivalent to minimising the gap D_KL(q‖p_posterior).",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.8,
    expectedSeconds: 180,
    prereqClosure: ["jensen-inequality", "expectation"],
    source: BISHOP,
    status: "live",
  },
  {
    id: "kl-divergence--transfer-symmetrised-still-not-a-metric",
    conceptId: "kl-divergence",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An A/B test summarises how different two arms' outcome distributions are using the symmetrised " +
      "Jeffreys divergence ½[D_KL(P‖Q) + D_KL(Q‖P)]. Explain what this symmetrisation buys, and what " +
      "property it still lacks that a true distance would need.",
    rubric: {
      elements: [
        {
          id: "buys-symmetry",
          description: "States that symmetrising removes the order-dependence — which arm is called P versus Q no longer matters.",
          weight: 3,
          required: true,
        },
        {
          id: "still-not-metric",
          description: "Notes it still fails the triangle inequality in general, so it cannot support metric-based reasoning (like ranking by 'distance' across many pairs) without further justification.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["jensen-inequality", "expectation"],
    source: BISHOP,
    status: "live",
  },

  // -------------------------------------------------------------------------
  // Multivariate Probability — the four concepts added in the quadratic-forms
  // sweep (Multivariate MGF, Quadratic Forms, Cochran's Theorem, Distribution
  // of β̂), 8 items each. The seven older concepts of the domain are authored
  // inline above; these are in their own module for the same reason the blocks
  // below are — see items.multivariate-forms.ts for the authoring notes.
  // -------------------------------------------------------------------------
  ...multivariateFormsItems,

  // -------------------------------------------------------------------------
  // Graphical Models & Bayesian ML — all 15 concepts, 8 items each. Kept in its
  // own module so this file stays readable; see items.graphical-models.ts for
  // the authoring notes.
  // -------------------------------------------------------------------------
  ...graphicalModelsItems,

  // -------------------------------------------------------------------------
  // Machine Learning — all 50 concepts, 5 items each, ported from
  // assessments/ml-01…ml-09.md. Kept in its own directory (one module per
  // cluster) for the same reason as the block above: the seed bank at the top
  // of this file is a fixture set for the framework, and this is a curriculum.
  // -------------------------------------------------------------------------
  ...mlItems,

  // -------------------------------------------------------------------------
  // Statistical Inference — the `statistics` domain, 8 items per concept. Split
  // by cluster into its own modules; see those files for the authoring notes.
  // -------------------------------------------------------------------------
  ...statisticsFoundationsItems,
  ...statisticsInferenceItems,
  ...statisticsTestsItems,
  ...statisticsComparisonsItems,
  ...statisticsNonparametricItems,

  // -------------------------------------------------------------------------
  // Python for Data Work — all 8 concepts, 8 items each. Authored directly in
  // typed form rather than ported from markdown; see assessments/python.md for
  // the design record and why that direction was taken.
  // -------------------------------------------------------------------------
  ...pythonItems,

  // -------------------------------------------------------------------------
  // Python fundamentals — variables/types, type conversion, operators, and
  // tuples, inserted as prerequisites ahead of the containers chapter for
  // learners who haven't used Python before. Same 8-live-items-per-concept bar.
  // -------------------------------------------------------------------------
  ...pythonFundamentalsItems,

  // -------------------------------------------------------------------------
  // Control flow — conditionals, while loops, for loops. Sits between
  // operators and the containers chapter.
  // -------------------------------------------------------------------------
  ...pythonControlFlowItems,

  // -------------------------------------------------------------------------
  // Functions — def, parameters, return, and scope. Sits between control
  // flow and the containers chapter.
  // -------------------------------------------------------------------------
  ...pythonFunctionsItems,

  // -------------------------------------------------------------------------
  // The additional items needed to bring python-lists-intro, python-indexing,
  // python-slicing, python-list-operations, python-dictionaries, and
  // python-sets up to 8 live each, after python-lists/python-dicts were split.
  // -------------------------------------------------------------------------
  ...pythonContainersSplitItems,

  // -------------------------------------------------------------------------
  // NumPy expansion — array creation (arange/linspace/zeros/ones/eye),
  // indexing/masking, and matrices (@, transpose, linalg), inserted between
  // numpy-arrays and pandas.
  // -------------------------------------------------------------------------
  ...numpyExpandedItems,

  // -------------------------------------------------------------------------
  // `code`-format items — the learner writes and submits executable Python,
  // graded by running it against codeTests in a sandbox rather than judging
  // free text. See src/lib/assessment/pythonSandbox.ts and codeTests.ts.
  // -------------------------------------------------------------------------
  ...pythonCodeExerciseItems,
];

/**
 * Index of the hand-authored items only. Tools import this synchronously.
 */
export const itemsByConcept = new Map<string, Item[]>();
for (const item of items) {
  const bucket = itemsByConcept.get(item.conceptId);
  if (bucket) bucket.push(item);
  else itemsByConcept.set(item.conceptId, [item]);
}

/**
 * The full bank, loaded on demand.
 *
 * The imported bank is ~1.6 MB of JSON — larger than the entire rest of the
 * application. Importing it statically put every one of 1,300 questions into
 * the main bundle, so a visitor reading the landing page downloaded the whole
 * curriculum's assessments before seeing anything. A dynamic import moves it to
 * its own chunk, fetched the first time someone opens an Assessment tab.
 *
 * The promise is cached, so the fetch happens once per session rather than once
 * per concept.
 */
let fullBank: Promise<Map<string, Item[]>> | null = null;

export function loadItemBank(): Promise<Map<string, Item[]>> {
  fullBank ??= import("./items.generated").then(({ generatedItems }) => {
    const index = new Map<string, Item[]>();
    // Hand-authored items are indexed first, so where both exist for a concept
    // the reviewed ones lead — they carry real multiple-choice distractors that
    // the imported bank could not supply.
    for (const item of [...items, ...generatedItems]) {
      const bucket = index.get(item.conceptId);
      if (bucket) bucket.push(item);
      else index.set(item.conceptId, [item]);
    }
    return index;
  });
  return fullBank;
}
