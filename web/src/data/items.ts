import type { Item, SourceRef } from "../lib/assessment/types";
import { graphicalModelsItems } from "./items.graphical-models";
import { statisticsFoundationsItems } from "./items.statistics-foundations";
import { statisticsInferenceItems } from "./items.statistics-inference";
import { statisticsTestsItems } from "./items.statistics-tests";
import { mlItems } from "./items-ml";
import { regressionDiagnosticsItems } from "./items/regression-diagnostics";
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

  // --- Regression -----------------------------------------------------------
  // Authored from assessments/reg-01..reg-05; see web/src/data/items/ for the
  // per-cluster files and the shared source registry.
  ...regressionFoundationsItems,
  ...regressionGeometryItems,
  ...regressionDiagnosticsItems,
  ...regressionSelectionItems,
  ...regressionGeneralizedItems,

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
];

export const itemsByConcept = new Map<string, Item[]>();
for (const item of items) {
  const bucket = itemsByConcept.get(item.conceptId);
  if (bucket) bucket.push(item);
  else itemsByConcept.set(item.conceptId, [item]);
}
