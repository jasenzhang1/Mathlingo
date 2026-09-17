import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Seed bank for the four concepts added to buff up `stochastic-processes` past
 * its original two-concept skeleton: `poisson-process`,
 * `continuous-time-markov-chains`, `kalman-filter`, and
 * `karhunen-loeve-expansion`. Three items per concept — below the 8-per-concept
 * bar `auditCoverage` wants for a fully mature pool, but enough to make each
 * lesson drillable rather than empty while the pool grows.
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-sp-buffup",
  tier: "generated",
  title: "Mathlingo authored item (stochastic processes buff-up)",
};

export const stochasticProcessesBuffupItems: Item[] = [
  // --- poisson-process ---
  {
    id: "poisson-process--recall-two-definitions",
    conceptId: "poisson-process",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Give the two equivalent ways to define a Poisson process with rate λ.",
    rubric: {
      elements: [
        {
          id: "counting",
          description: "States the counting definition: independent, stationary increments, with N(t) − N(s) ~ Poisson(λ(t−s)).",
          weight: 3,
          required: true,
        },
        {
          id: "waiting-time",
          description: "States the waiting-time definition: i.i.d. Exponential(λ) gaps between consecutive events.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.4,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["poisson-process"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "poisson-process--apply-thinning",
    conceptId: "poisson-process",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Emails arrive as a Poisson process at 20/hour. 10% are spam. What is the expected number of spam " +
      "emails in a 3-hour window?",
    answerKey: 6,
    tolerance: 0.01,
    difficulty: 0,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["poisson-process"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "poisson-process--explain-memorylessness",
    conceptId: "poisson-process",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "You have waited 10 minutes with no event yet, for a Poisson process with rate λ. What is the expected additional wait for the next event?",
    choices: [
      { id: "a", text: "1/λ — the same as if you had just started watching", correct: true },
      {
        id: "b",
        text: "Less than 1/λ, since an event is 'due' after waiting this long",
        correct: false,
        misconception: {
          id: "gamblers-fallacy",
          description: "Treats the Exponential gap as if it remembers elapsed waiting time, like a fair coin being 'due' for tails.",
          blameConceptId: "poisson-process",
        },
      },
      {
        id: "c",
        text: "More than 1/λ, since no event yet suggests a slower-than-average period",
        correct: false,
        misconception: {
          id: "inferred-slow-period",
          description: "Assumes the process's rate itself can drift based on a quiet stretch, contradicting the constant-rate assumption.",
          blameConceptId: "poisson-process",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["poisson-process"],
    source: AUTHORED,
    status: "live",
  },

  // --- continuous-time-markov-chains ---
  {
    id: "ctmc--recall-generator",
    conceptId: "continuous-time-markov-chains",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What must the rows of a continuous-time Markov chain's generator matrix Q sum to, and why?",
    rubric: {
      elements: [
        { id: "zero", description: "States that every row sums to zero.", weight: 3, required: true },
        {
          id: "why",
          description: "Explains that the diagonal entry qᵢᵢ is defined as minus the sum of the other rates out of state i, so the row necessarily cancels.",
          weight: 3,
        },
      ],
    },
    difficulty: -0.3,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["continuous-time-markov-chains"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ctmc--apply-stationary-two-state",
    conceptId: "continuous-time-markov-chains",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A server is Idle or Busy. From Idle it becomes Busy at rate 3/hour; from Busy it returns to Idle " +
      "at rate 1/hour. Find the long-run fraction of time Idle.",
    answerKey: 0.25,
    tolerance: 0.01,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 100,
    prereqClosure: ["continuous-time-markov-chains"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ctmc--transfer-poisson-as-ctmc",
    conceptId: "continuous-time-markov-chains",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A Poisson process with rate λ can be viewed as a CTMC on states {0, 1, 2, …}. Which generator entries are nonzero?",
    choices: [
      { id: "a", text: "qₙ,ₙ₊₁ = λ for every n, and all other off-diagonal entries are zero", correct: true },
      {
        id: "b",
        text: "qₙ,ₙ₋₁ = λ for every n ≥ 1, since the count can also decrease",
        correct: false,
        misconception: {
          id: "poisson-decreasing",
          description: "A Poisson process's count never decreases — it only jumps up by one at each event.",
          blameConceptId: "poisson-process",
        },
      },
      {
        id: "c",
        text: "qₙ,ₘ = λ for every pair of states, since any count could follow any other",
        correct: false,
        misconception: {
          id: "ctmc-fully-connected",
          description: "Confuses 'a Markov chain can in principle jump anywhere' with the specific structure of a counting process, which only ever moves up by exactly one.",
          blameConceptId: "continuous-time-markov-chains",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["continuous-time-markov-chains", "poisson-process"],
    source: AUTHORED,
    status: "live",
  },

  // --- kalman-filter ---
  {
    id: "kalman-filter--recall-two-steps",
    conceptId: "kalman-filter",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the Kalman filter's two recursive steps and what each one does.",
    rubric: {
      elements: [
        { id: "predict", description: "Predict: push the previous Gaussian belief forward through the transition model, before seeing new data.", weight: 3, required: true },
        { id: "update", description: "Update: condition the predicted belief on the new observation using the conditional-Gaussian formulas, producing the Kalman gain.", weight: 3, required: true },
      ],
    },
    difficulty: -0.2,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["kalman-filter"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "kalman-filter--apply-scalar-update",
    conceptId: "kalman-filter",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Predicted belief about a stationary quantity: mean 5, variance 9. A sensor reads 8 with observation " +
      "variance R = 3. Find the Kalman gain K = Var_pred / (Var_pred + R).",
    answerKey: 0.75,
    tolerance: 0.01,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["kalman-filter"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "kalman-filter--explain-gain-interpretation",
    conceptId: "kalman-filter",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "If the observation noise R is much larger than the predicted variance, what does the Kalman gain do?",
    choices: [
      { id: "a", text: "K is close to 0 — the update barely moves the belief toward the noisy observation", correct: true },
      {
        id: "b",
        text: "K is close to 1 — the filter should trust the new reading fully",
        correct: false,
        misconception: {
          id: "gain-inverted",
          description: "Gets the direction backwards: large R (noisy sensor) should make the filter trust the observation *less*, not more.",
          blameConceptId: "kalman-filter",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["kalman-filter"],
    source: AUTHORED,
    status: "live",
  },

  // --- karhunen-loeve-expansion ---
  {
    id: "kl-expansion--recall-structure",
    conceptId: "karhunen-loeve-expansion",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In the Karhunen-Loève expansion X(t) = μ(t) + Σₖ √λₖ Zₖ φₖ(t), what is random and what is fixed?",
    rubric: {
      elements: [
        { id: "fixed", description: "States that the eigenfunctions φₖ and eigenvalues λₖ are fixed, determined entirely by the process's covariance function.", weight: 3, required: true },
        { id: "random", description: "States that the coefficients Zₖ are the only random part, uncorrelated across k.", weight: 3, required: true },
      ],
    },
    difficulty: 0,
    discrimination: 1.2,
    expectedSeconds: 65,
    prereqClosure: ["karhunen-loeve-expansion"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "kl-expansion--apply-variance-fraction",
    conceptId: "karhunen-loeve-expansion",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "KL eigenvalues are λ₁ = 9, λ₂ = 3, λ₃ = 1, λ₄ = 1 (φₖ(t)² = 1 for all k at the point of interest). " +
      "What fraction of the total variance is captured by the first two terms? Give a decimal to two places.",
    answerKey: 0.86,
    tolerance: 0.01,
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 100,
    prereqClosure: ["karhunen-loeve-expansion"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "kl-expansion--transfer-mercer-link",
    conceptId: "karhunen-loeve-expansion",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Which theorem guarantees the Karhunen-Loève expansion exists, and what does it say about the covariance function?",
    rubric: {
      elements: [
        { id: "mercer", description: "Names Mercer's theorem.", weight: 2, required: true },
        {
          id: "kernel-view",
          description: "Explains that a covariance function K(s,t) is itself a valid (symmetric, positive semi-definite) kernel, so it admits an eigenfunction expansion K(s,t) = Σ λₖφₖ(s)φₖ(t) just like any other Mercer kernel.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["karhunen-loeve-expansion", "mercers-theorem"],
    source: AUTHORED,
    status: "live",
  },
];
