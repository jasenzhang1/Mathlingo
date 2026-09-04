import type { Item } from "../../lib/assessment/types";
import { ML_09 } from "./sources";

/**
 * Cluster 9 — Gaussian processes. Ported from
 * `assessments/ml-09-gaussian-processes.md`.
 *
 * `gp-regression` genuinely sits downstream of `multivariate-normal` and
 * `kernel`, and `gp-classification` of `logistic-regression` and `mle`, so those
 * items lean on them directly. The Schur complement, the Laplace approximation
 * and hyperparameter tuning are named in the stems where the markdown cited
 * concepts that are not upstream of these two.
 */
export const ml09Items: Item[] = [
  // --- GP Regression --------------------------------------------------------
  {
    id: "gp-regression--recall-describe",
    conceptId: "gp-regression",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe a Gaussian process.",
    rubric: {
      elements: [
        {
          id: "distribution-over-functions",
          description:
            "A distribution over functions such that any finite collection of function values is jointly multivariate normal.",
          weight: 4,
          required: true,
        },
        {
          id: "mean-and-covariance-function",
          description:
            "Specified by a mean function and a covariance (kernel) function.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.32,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["gp-regression", "multivariate-normal", "kernel"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-regression--recall-kernel-role",
    conceptId: "gp-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The kernel function in a Gaussian process determines:",
    choices: [
      {
        id: "a",
        text: "how correlated the function's values are at nearby versus distant inputs — and therefore how smooth the sampled functions are",
        correct: true,
      },
      {
        id: "b",
        text: "the random seed used to draw samples",
        correct: false,
        misconception: {
          id: "kernel-confused-with-randomness-source",
          description:
            "Confuses the structure of the prior with the mechanics of sampling from it. The kernel is what makes one function more probable than another.",
          blameConceptId: "gp-regression",
        },
      },
      {
        id: "c",
        text: "the number of training points that can be used",
        correct: false,
        misconception: {
          id: "kernel-confused-with-capacity",
          description:
            "The sample size is limited by the O(n³) cost of the linear algebra, not by the choice of kernel.",
          blameConceptId: "gp-regression",
        },
      },
      {
        id: "d",
        text: "the mean of the predictive distribution, independently of the data",
        correct: false,
        misconception: {
          id: "kernel-confused-with-mean-function",
          description:
            "The mean function is a separate component, usually taken as zero. The kernel supplies covariance, and the predictive mean depends on the observed y.",
          blameConceptId: "gp-regression",
        },
      },
    ],
    difficulty: 0.62,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["gp-regression", "kernel"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-regression--apply-uncertainty-from-conditioning",
    conceptId: "gp-regression",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Why do GP predictions come with a variance rather than only a point estimate? Conditioning a joint Gaussian on part of itself yields another Gaussian whose covariance is the Schur complement of the observed block — use that.",
    rubric: {
      elements: [
        {
          id: "prediction-is-conditioning",
          description:
            "Predicting at a new input is conditioning the joint Gaussian over function values on the observed ones — not a separate fitting step.",
          weight: 4,
          required: true,
        },
        {
          id: "conditional-yields-both",
          description:
            "The conditional Gaussian's formulas deliver a mean *and* a covariance together, the latter being the Schur complement — so the uncertainty is a property of the multivariate normal, not an extra estimator bolted on.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.12,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["gp-regression", "multivariate-normal", "covariance-matrix"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-regression--explain-error-bars-widen",
    conceptId: "gp-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is GP predictive uncertainty small near training points and large far from them? Trace the chain from the kernel to the variance.",
    rubric: {
      elements: [
        {
          id: "kernel-decays",
          description:
            "A decaying kernel means a far-away point is only weakly correlated with every observation.",
          weight: 3,
          required: true,
        },
        {
          id: "weak-correlation-means-little-subtracted",
          description:
            "The posterior variance subtracts a term built from those correlations, so with weak correlation almost nothing is subtracted and the variance returns to the prior.",
          weight: 4,
          required: true,
        },
        {
          id: "near-points-pinned-down",
          description:
            "Near an observation the correlation is strong, the subtraction is large, and the variance collapses towards the noise level.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-without-the-chain",
          description:
            "States that GPs are 'less certain far from data' without tracing kernel decay → weak correlation → little variance reduction.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.82,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["gp-regression", "kernel", "multivariate-normal"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-regression--transfer-bayesian-optimisation",
    conceptId: "gp-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Tuning a model's settings can require a multi-hour training run per candidate, so only a handful can ever be tried. Why are Gaussian processes especially valued for choosing where to spend the next run?",
    rubric: {
      elements: [
        {
          id: "exploitation",
          description:
            "Names exploitation explicitly: trying points near where the GP's mean predicts a good outcome.",
          weight: 3,
          required: true,
        },
        {
          id: "exploration",
          description:
            "Names exploration explicitly: trying points where the GP's variance is large and a surprise is still possible.",
          weight: 3,
          required: true,
        },
        {
          id: "uncertainty-enables-the-balance",
          description:
            "Ties both to the predictive variance: it is having calibrated uncertainty, not just a point prediction, that makes the balance computable at all.",
          weight: 4,
          required: true,
        },
        {
          id: "small-n-regime",
          description:
            "Bonus: notes the fit with the GP's O(n³) cost — this is exactly the small-n, expensive-observation regime where that cost is irrelevant.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.32,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["gp-regression", "multivariate-normal"],
    source: ML_09,
    status: "live",
  },


  {
    id: "gp-regression--apply-cost-scaling",
    conceptId: "gp-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Exact GP inference costs O(n³). If fitting 1,000 training points takes 2 seconds, roughly how many seconds should 4,000 points take, assuming the cubic term dominates?",
    answerKey: 128,
    tolerance: 1,
    difficulty: 1.5,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["gp-regression"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-regression--explain-variance-ignores-y",
    conceptId: "gp-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "The GP predictive variance K** − K*ᵀ(K + σ²I)⁻¹K* contains no y at all. State what that means operationally, and why it is a limitation worth knowing before relying on GP error bars.",
    rubric: {
      elements: [
        {
          id: "depends-on-where-not-what",
          description:
            "Uncertainty depends only on *where* you observed, not on what you saw there — the error bars are fixed by the design of the inputs once the kernel is chosen.",
          weight: 4,
          required: true,
        },
        {
          id: "the-limitation",
          description:
            "So surprising or badly fitting observations do not widen the interval: a region densely sampled but poorly explained still reports high confidence, and only a misfit kernel or a re-estimated noise term can reflect it.",
          weight: 5,
          required: true,
        },
        {
          id: "consequence-of-the-gaussian-assumption",
          description:
            "Bonus: attributes this to the Gaussian assumption itself, where the conditional covariance never involves the conditioning values.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.7,
    expectedSeconds: 230,
    prereqClosure: ["gp-regression", "multivariate-normal", "covariance-matrix"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-regression--transfer-kernel-encodes-beliefs",
    conceptId: "gp-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Kernels can be added and multiplied to give new kernels. How would you build a covariance function for a signal that repeats yearly while drifting slowly upward, and what does that show about where a GP's assumptions live?",
    rubric: {
      elements: [
        {
          id: "composition",
          description:
            "Add a periodic kernel with a one-year period to a smooth long-length-scale kernel, so the sum expresses both the repetition and the drift.",
          weight: 4,
          required: true,
        },
        {
          id: "assumptions-live-in-the-kernel",
          description:
            "Shows that a GP's modelling assumptions live entirely in the covariance function rather than in a parametric form — you state what kind of function you expect, not how many coefficients it has.",
          weight: 4,
          required: true,
        },
        {
          id: "still-must-be-valid",
          description:
            "Bonus: notes the composed kernel is automatically valid because sums and products of kernels are kernels.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["gp-regression", "kernel"],
    source: ML_09,
    status: "live",
  },

  // --- GP Classification ----------------------------------------------------
  {
    id: "gp-classification--recall-challenge-and-fix",
    conceptId: "gp-classification",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is the key obstacle in extending GP regression to classification, and what is the standard fix?",
    rubric: {
      elements: [
        {
          id: "unbounded-output",
          description:
            "A GP's output is an unbounded real number, while classification needs a probability in [0, 1].",
          weight: 3,
          required: true,
        },
        {
          id: "link-function",
          description:
            "The fix is a squashing link — the sigmoid — applied to a latent GP, mapping the score to a valid probability.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.52,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["gp-classification", "gp-regression", "logistic-regression"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-classification--recall-tractability",
    conceptId: "gp-classification",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Once the latent GP is passed through a sigmoid, exact Bayesian inference becomes:",
    choices: [
      {
        id: "a",
        text: "generally intractable in closed form, so approximation methods are required",
        correct: true,
      },
      {
        id: "b",
        text: "exactly as closed-form as GP regression",
        correct: false,
        misconception: {
          id: "gp-classification-thought-closed-form",
          description:
            "The nonlinearity destroys conjugacy: a Gaussian prior with a Bernoulli likelihood does not give a Gaussian posterior, so the normalising integral has no analytic solution.",
          blameConceptId: "gp-classification",
        },
      },
      {
        id: "c",
        text: "impossible — GPs cannot be used for classification",
        correct: false,
        misconception: {
          id: "intractable-read-as-impossible",
          description:
            "Confuses 'no closed form' with 'no method'. Laplace, expectation propagation, variational inference and MCMC all work.",
          blameConceptId: "gp-classification",
        },
      },
      {
        id: "d",
        text: "tractable, but only for two classes",
        correct: false,
        misconception: {
          id: "intractability-thought-class-count-dependent",
          description:
            "Even the two-class case is intractable. Adding classes multiplies the cost; it is not what causes the difficulty.",
          blameConceptId: "gp-classification",
        },
      },
    ],
    difficulty: 0.82,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["gp-classification", "gp-regression"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-classification--apply-why-closed-form-breaks",
    conceptId: "gp-classification",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "GP regression has a closed-form posterior and GP classification does not. Identify precisely what breaks, given that the prior is the same in both.",
    rubric: {
      elements: [
        {
          id: "regression-conjugacy",
          description:
            "In regression, a Gaussian prior with a Gaussian likelihood gives a Gaussian posterior — conjugacy is what supplies the closed form.",
          weight: 3,
          required: true,
        },
        {
          id: "sigmoid-breaks-it",
          description:
            "Names the sigmoid's nonlinearity as specifically what breaks it: the Bernoulli likelihood is not Gaussian in the latent value, so the product of prior and likelihood is not Gaussian and the normalising integral has no analytic form.",
          weight: 5,
          required: true,
        },
        {
          id: "prior-unchanged",
          description:
            "Bonus: notes explicitly that nothing about the prior changed — the likelihood did.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.32,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["gp-classification", "gp-regression", "multivariate-normal"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-classification--explain-shared-sigmoid",
    conceptId: "gp-classification",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "What role does the sigmoid play in GP classification, and what exactly does that share with logistic regression?",
    rubric: {
      elements: [
        {
          id: "same-conversion-job",
          description:
            "In both, the sigmoid converts an unbounded real-valued score into a probability in [0, 1] — the same function doing the same job.",
          weight: 4,
          required: true,
        },
        {
          id: "what-differs-underneath",
          description:
            "What differs is what produces the score: a linear combination wᵀx in logistic regression, a function value drawn from the GP prior here.",
          weight: 4,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "both-use-sigmoid",
          description:
            "Answers only that 'both use a sigmoid' without naming the shared purpose or what differs beneath it.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.02,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["gp-classification", "logistic-regression"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-classification--transfer-generalises-logistic-regression",
    conceptId: "gp-classification",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Describe GP classification as a generalisation of logistic regression, and state what that generalisation costs.",
    rubric: {
      elements: [
        {
          id: "the-generalisation",
          description:
            "It drops logistic regression's assumption that the latent score is a linear function of the inputs, letting it be any function drawn from a flexible GP prior — a nonparametric, effectively infinite-dimensional version of the same model.",
          weight: 4,
          required: true,
        },
        {
          id: "the-cost",
          description:
            "Names the cost: inference is no longer exact, so an approximation must be chosen, and the O(n³) linear algebra bounds the sample size.",
          weight: 4,
          required: true,
        },
        {
          id: "approximation-matters",
          description:
            "Bonus: notes that if calibrated probabilities were the reason for choosing a GP, the choice of approximation is not an implementation detail — a mode-fitting approximation is known to be over-confident.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.52,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["gp-classification", "gp-regression", "logistic-regression", "mle"],
    source: ML_09,
    status: "live",
  },

  {
    id: "gp-classification--apply-pick-an-approximation",
    conceptId: "gp-classification",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "A team needs calibrated class probabilities from a GP classifier and has found the cheapest approximation over-confident. Which description best explains why?",
    choices: [
      {
        id: "a",
        text: "Fitting a Gaussian at the posterior's mode using local curvature ignores the tails, so a skewed posterior is represented as narrower than it is",
        correct: true,
      },
      {
        id: "b",
        text: "The approximation uses too few training points",
        correct: false,
        misconception: {
          id: "approximation-error-blamed-on-sample-size",
          description:
            "The over-confidence is a property of fitting a Gaussian to a non-Gaussian posterior; it does not go away with more data.",
          blameConceptId: "gp-classification",
        },
      },
      {
        id: "c",
        text: "The sigmoid link saturates, so all probabilities are pushed to 0.5",
        correct: false,
        misconception: {
          id: "over-confidence-inverted",
          description:
            "Describes the opposite symptom. Over-confidence means probabilities pushed toward 0 and 1, not toward the middle.",
          blameConceptId: "gp-classification",
        },
      },
      {
        id: "d",
        text: "The kernel is not positive semidefinite",
        correct: false,
        misconception: {
          id: "calibration-blamed-on-kernel-validity",
          description:
            "An invalid kernel breaks the model outright rather than producing a well-behaved but over-confident posterior.",
          blameConceptId: "mercers-theorem",
        },
      },
    ],
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 80,
    prereqClosure: ["gp-classification", "gp-regression"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-classification--explain-cost-of-multiclass",
    conceptId: "gp-classification",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Extending GP classification from two classes to K replaces the sigmoid with a softmax over K latent processes. What does that change, and what does it leave exactly as it was?",
    rubric: {
      elements: [
        {
          id: "what-changes",
          description:
            "The cost: K latent GPs must be inferred rather than one, multiplying both the linear algebra and the approximation work by K.",
          weight: 4,
          required: true,
        },
        {
          id: "what-does-not",
          description:
            "The intractability is unchanged in kind — a softmax likelihood is no more conjugate to a Gaussian prior than a sigmoid one, so the same families of approximation are still required.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["gp-classification", "gp-regression"],
    source: ML_09,
    status: "live",
  },
  {
    id: "gp-classification--transfer-when-not-to-use-it",
    conceptId: "gp-classification",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Name a setting where GP classification is the right tool and one where it clearly is not, and justify both from its properties rather than from convention.",
    rubric: {
      elements: [
        {
          id: "right-setting",
          description:
            "Right where n is small, each label is expensive, and calibrated uncertainty drives a decision — a clinical or experimental-design setting, where the O(n³) cost is irrelevant and the posterior is the product.",
          weight: 4,
          required: true,
        },
        {
          id: "wrong-setting",
          description:
            "Wrong at large n with cheap labels and a top-1 decision — the cubic cost is prohibitive, approximate inference erodes the calibration that was the reason to choose it, and a discriminative model gets the argmax for far less.",
          weight: 4,
          required: true,
        },
        {
          id: "justified-from-properties",
          description:
            "Both justifications reference the model's actual properties — cost, calibration, approximation — rather than appeals to what is commonly used.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.75,
    discrimination: 1.5,
    expectedSeconds: 250,
    prereqClosure: ["gp-classification", "gp-regression", "logistic-regression"],
    source: ML_09,
    status: "live",
  },

];
