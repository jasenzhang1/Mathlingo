import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * `monte-carlo-integration` — the plain sample-mean estimator that importance
 * sampling, MCMC and Gibbs sampling all refine. Eight items, two at each
 * cognitive level. The numeric items are chosen so the arithmetic *is* the
 * lesson: the volume factor in a uniform-draw integral, and the 1/√n rate that
 * makes each extra digit cost 100× the samples.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-compstat",
  tier: "generated",
  title: "Mathlingo authored item (computational statistics)",
};

const CLOSURE = ["monte-carlo-integration", "expectation", "law-of-large-numbers", "central-limit-theorem"];

export const monteCarloIntegrationItems: Item[] = [
  {
    id: "monte-carlo-integration--recall-estimator-and-error",
    conceptId: "monte-carlo-integration",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Write the plain Monte Carlo estimator of $\\mathbb{E}_p[f(X)]$ from $n$ draws, and state its standard error.",
    rubric: {
      elements: [
        { id: "estimator", description: "$\\hat{I}_n = \\frac{1}{n}\\sum_{i=1}^n f(X_i)$ with $X_i$ drawn iid from $p$.", weight: 4, required: true },
        { id: "se", description: "Standard error $\\sigma/\\sqrt{n}$ where $\\sigma^2 = \\operatorname{Var}_p(f(X))$ (estimated by the sample standard deviation of the $f(X_i)$).", weight: 3, required: true },
      ],
    },
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: CLOSURE,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "monte-carlo-integration--recall-dimension-free-rate",
    conceptId: "monte-carlo-integration",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How does the error of plain Monte Carlo integration scale with the number of samples $n$ and the dimension $d$ of $X$?",
    choices: [
      { id: "a", text: "Like $1/\\sqrt{n}$, with no dependence on $d$ beyond the variance of $f(X)$", correct: true },
      {
        id: "b",
        text: "Like $n^{-1/d}$, so it degrades as the dimension grows",
        correct: false,
        misconception: {
          id: "mc-rate-confused-with-grid",
          description: "Transfers the grid-quadrature rate to Monte Carlo; the Monte Carlo error comes from the CLT on an average of scalars, where $d$ never appears.",
          blameConceptId: "monte-carlo-integration",
        },
      },
      {
        id: "c",
        text: "Like $1/n$, the same as averaging deterministic points",
        correct: false,
        misconception: {
          id: "mc-rate-one-over-n",
          description: "Confuses the variance $\\sigma^2/n$ with the standard error $\\sigma/\\sqrt{n}$.",
          blameConceptId: "central-limit-theorem",
        },
      },
      {
        id: "d",
        text: "It does not shrink with $n$; only a better proposal distribution reduces it",
        correct: false,
        misconception: {
          id: "mc-no-convergence",
          description: "Ignores the law of large numbers; more draws always reduce the error of an estimator with finite variance.",
          blameConceptId: "law-of-large-numbers",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: CLOSURE,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "monte-carlo-integration--apply-uniform-volume-factor",
    conceptId: "monte-carlo-integration",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "To estimate $\\int_0^2 x^2\\,dx$ you draw $U_i \\sim \\text{Uniform}(0, 2)$ and get $u = 0.5, 1.0, 1.5, 2.0$. " +
      "Compute the Monte Carlo estimate of the integral from these four draws.",
    answerKey: 3.75,
    tolerance: 0.01,
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: CLOSURE,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "monte-carlo-integration--apply-samples-for-target-se",
    conceptId: "monte-carlo-integration",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A pilot run estimates the standard deviation of $f(X)$ as $\\hat{\\sigma} = 12$. How many draws $n$ are needed " +
      "for the Monte Carlo standard error to be $0.1$? Give a whole number.",
    answerKey: 14400,
    tolerance: 0.001,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: CLOSURE,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "monte-carlo-integration--explain-why-dimension-free",
    conceptId: "monte-carlo-integration",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why Monte Carlo integration beats a grid-based quadrature rule for a $50$-dimensional integral, even " +
      "though a grid is far more accurate in one dimension.",
    rubric: {
      elements: [
        { id: "grid", description: "A grid with $n$ points has only $n^{1/d}$ points per axis, so its error (like $n^{-k/d}$) collapses as $d$ grows — $50$ dimensions leaves almost no resolution per axis.", weight: 3, required: true },
        { id: "mc", description: "The Monte Carlo error $\\sigma/\\sqrt{n}$ comes from the CLT applied to an average of scalar values $f(X_i)$; the dimension of $X$ enters only through $\\operatorname{Var}(f(X))$, not the rate.", weight: 4, required: true },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 120,
    prereqClosure: CLOSURE,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "monte-carlo-integration--explain-cauchy-failure",
    conceptId: "monte-carlo-integration",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "You estimate $\\mathbb{E}[X]$ for a standard Cauchy variable by averaging $10^6$ draws, and the running average " +
      "never settles. Why?",
    choices: [
      { id: "a", text: "$\\mathbb{E}|X| = \\infty$, so the law of large numbers does not apply and there is no value to converge to", correct: true },
      {
        id: "b",
        text: "$10^6$ draws is too few; the average converges, just slowly",
        correct: false,
        misconception: {
          id: "mc-cauchy-just-slow",
          description: "Treats non-convergence as slow convergence; for the Cauchy the mean of $n$ draws is itself Cauchy for every $n$, so it never concentrates.",
          blameConceptId: "law-of-large-numbers",
        },
      },
      {
        id: "c",
        text: "The pseudo-random number generator is biased in the tails",
        correct: false,
        misconception: {
          id: "mc-blames-rng",
          description: "Blames the sampler for a property of the target distribution: the failure is mathematical, not numerical.",
          blameConceptId: "monte-carlo-integration",
        },
      },
      {
        id: "d",
        text: "The variance is infinite, so the average converges but the error bar is wrong",
        correct: false,
        misconception: {
          id: "mc-cauchy-variance-only",
          description: "Describes the finite-mean, infinite-variance case; the Cauchy has no mean at all, which is a stronger failure.",
          blameConceptId: "expectation",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: CLOSURE,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "monte-carlo-integration--transfer-option-pricing",
    conceptId: "monte-carlo-integration",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A call option is priced as $\\mathbb{E}[e^{-rT}\\max(S_T - K, 0)]$ under a model you can simulate but cannot " +
      "integrate in closed form. Describe how to produce a price and a $95\\%$ confidence interval by simulation, " +
      "and name one way to shrink the interval without more simulations.",
    rubric: {
      elements: [
        { id: "estimate", description: "Simulate $n$ independent terminal prices $S_T$, compute each discounted payoff, and average them.", weight: 3, required: true },
        { id: "ci", description: "Report the average $\\pm 1.96\\,\\hat{\\sigma}/\\sqrt{n}$ using the sample standard deviation of the payoffs (justified by the CLT).", weight: 3, required: true },
        { id: "variance-reduction", description: "Names a variance-reduction technique: antithetic paths ($Z$ and $-Z$), a control variate with known mean (e.g. $S_T$ itself, or a closed-form option), or importance sampling toward the in-the-money region.", weight: 2 },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: CLOSURE,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "monte-carlo-integration--transfer-shrink-confidence-interval",
    conceptId: "monte-carlo-integration",
    format: "numeric",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A risk model run with $10{,}000$ simulations reports a loss estimate with a $95\\%$ confidence interval of " +
      "half-width $0.8$. Management wants a half-width of $0.2$. How many simulations are needed, assuming the " +
      "same variance per draw? Give a whole number.",
    answerKey: 160000,
    tolerance: 0.001,
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: CLOSURE,
    source: AUTHORED,
    status: "live",
  },
];
