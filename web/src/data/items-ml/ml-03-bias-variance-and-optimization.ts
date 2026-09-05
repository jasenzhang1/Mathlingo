import type { Item } from "../../lib/assessment/types";
import { ML_03 } from "./sources";

/**
 * Cluster 3 — bias-variance and optimization. Ported from
 * `assessments/ml-03-bias-variance-and-optimization.md`.
 *
 * Three items name a downstream concept in the markdown that is not upstream of
 * the concept under test, so the stem now supplies what the item needs rather
 * than assuming it: `law-of-total-variance` (bias-variance T1) and `sample-mean`
 * (overfitting T1) are stated inline and argued through `variance`, which is an
 * ancestor of both; `mle` (cross-entropy R2/T1) is reached through
 * `likelihood-vs-probability`, which is the prerequisite the graph actually has.
 */
export const ml03Items: Item[] = [
  // --- Bias-Variance Tradeoff ----------------------------------------------
  {
    id: "bias-variance-tradeoff--recall-decomposition",
    conceptId: "bias-variance-tradeoff",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the bias–variance decomposition of expected test error.",
    rubric: {
      elements: [
        {
          id: "three-terms",
          description: "Expected error = bias² + variance + irreducible error.",
          weight: 4,
          required: true,
        },
        {
          id: "squared-bias",
          description: "Bias appears squared, not linearly.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.18,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["bias-variance-tradeoff", "loss-functions", "variance"],
    source: ML_03,
    status: "live",
  },
  {
    id: "bias-variance-tradeoff--recall-high-bias",
    conceptId: "bias-variance-tradeoff",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A high-bias model typically:",
    choices: [
      {
        id: "a",
        text: "is too rigid to represent the pattern, so it systematically misses it — it underfits",
        correct: true,
      },
      {
        id: "b",
        text: "fits the training data too closely",
        correct: false,
        misconception: {
          id: "bias-confused-with-variance",
          description:
            "Describes high variance. Bias is error from the model's *form* being too rigid; variance is error from the fit moving with the sample.",
          blameConceptId: "bias-variance-tradeoff",
        },
      },
      {
        id: "c",
        text: "changes a lot when the training set is resampled",
        correct: false,
        misconception: {
          id: "bias-confused-with-instability",
          description:
            "Instability across resamples is precisely the definition of variance. A high-bias model is typically very stable — consistently wrong in the same way.",
          blameConceptId: "bias-variance-tradeoff",
        },
      },
      {
        id: "d",
        text: "has error below the irreducible noise level",
        correct: false,
        misconception: {
          id: "ignores-irreducible-floor",
          description:
            "No model can beat σ² on held-out data. A held-out score below it indicates a leak, not a good model.",
          blameConceptId: "bias-variance-tradeoff",
        },
      },
    ],
    difficulty: 0.12,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["bias-variance-tradeoff"],
    source: ML_03,
    status: "live",
  },
  {
    id: "bias-variance-tradeoff--apply-attribute-two-fits",
    conceptId: "bias-variance-tradeoff",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Which term dominates in each case, and why? (a) a straight line fitted to genuinely curved data; (b) a degree-15 polynomial fitted to 20 points.",
    rubric: {
      elements: [
        {
          id: "linear-is-high-bias",
          description:
            "(a) high bias — the model's form is too rigid to represent a curve, and no amount of data changes that.",
          weight: 3,
          required: true,
        },
        {
          id: "polynomial-is-high-variance",
          description:
            "(b) high variance — flexible enough to chase this sample's noise, so the fit swings wildly across resamples.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "swaps-the-two",
          description:
            "Calls the rigid linear fit 'high variance' or the wiggly polynomial 'high bias' — the diagnosis and therefore the remedy are then both wrong.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.62,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["bias-variance-tradeoff"],
    source: ML_03,
    status: "live",
  },
  {
    id: "bias-variance-tradeoff--explain-why-they-trade-off",
    conceptId: "bias-variance-tradeoff",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why do bias and variance move in opposite directions as model complexity increases?",
    rubric: {
      elements: [
        {
          id: "bias-falls",
          description:
            "More flexibility lets the model class represent more of the true pattern, so bias falls.",
          weight: 3,
          required: true,
        },
        {
          id: "variance-rises",
          description:
            "More flexibility also makes the fit more sensitive to the particular noise in this training sample, so variance rises.",
          weight: 3,
          required: true,
        },
        {
          id: "tied-to-decomposition",
          description:
            "Ties both back to the decomposition: the two non-negative terms move oppositely, so the sum is minimised somewhere in between rather than at either extreme.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.32,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["bias-variance-tradeoff", "variance"],
    source: ML_03,
    status: "live",
  },
  {
    id: "bias-variance-tradeoff--transfer-decomposition-as-a-move",
    conceptId: "bias-variance-tradeoff",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Statistics has a companion identity that splits a total variance into a within-group part and a between-group part. What structural move do that identity and the bias–variance decomposition have in common, and why is that move worth making?",
    rubric: {
      elements: [
        {
          id: "shared-structure",
          description:
            "Names the shared structure: one aggregate quantity is split into interpretable, additive components.",
          weight: 4,
          required: true,
        },
        {
          id: "separately-actionable",
          description:
            "Says why it pays off: the components have different causes and different remedies, so knowing which one dominates tells you what to do — more data for variance, a richer model class for bias.",
          weight: 4,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "surface-analogy-only",
          description:
            "Notes only that both formulas 'have several terms', without identifying decomposition-into-actionable-causes as the shared move.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.82,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["bias-variance-tradeoff", "variance", "expectation"],
    source: ML_03,
    status: "live",
  },


  {
    id: "bias-variance-tradeoff--apply-compute-decomposition",
    conceptId: "bias-variance-tradeoff",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "At a point x, a model's expected squared error decomposes as bias² + variance + σ². The bias is 0.4, the variance is 0.25, and the irreducible noise variance is 0.1. What is the expected squared error?",
    answerKey: 0.51,
    tolerance: 0.005,
    difficulty: 0.35,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["bias-variance-tradeoff", "variance"],
    source: ML_03,
    status: "live",
  },
  {
    id: "bias-variance-tradeoff--explain-which-lever-for-which-term",
    conceptId: "bias-variance-tradeoff",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Collecting more data reduces one term of the decomposition and leaves another untouched. Say which is which, and what that implies about when a data-collection budget is worth spending.",
    rubric: {
      elements: [
        {
          id: "data-reduces-variance-only",
          description:
            "More data shrinks the variance term and leaves bias alone, since bias is a property of the model class rather than of the sample.",
          weight: 4,
          required: true,
        },
        {
          id: "implication-for-spending",
          description:
            "So a high-variance model is the one worth buying data for; on a high-bias model the same spend converges to the same wrong answer with tighter intervals, and a richer model class is what is actually needed.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["bias-variance-tradeoff", "variance"],
    source: ML_03,
    status: "live",
  },
  {
    id: "bias-variance-tradeoff--transfer-scope-of-the-decomposition",
    conceptId: "bias-variance-tradeoff",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "The clean additive decomposition into bias², variance and noise is specific to squared-error loss. What survives the move to 0–1 classification loss and what does not?",
    rubric: {
      elements: [
        {
          id: "algebra-does-not-transfer",
          description:
            "The exact additive identity does not: analogues for 0–1 loss exist but the terms do not simply add, and definitions of them disagree between authors.",
          weight: 4,
          required: true,
        },
        {
          id: "intuition-does",
          description:
            "The intuition does: too rigid a model misses the pattern systematically, too flexible a model chases the sample, and the best complexity sits between.",
          weight: 4,
          required: true,
        },
        {
          id: "concrete-difference",
          description:
            "Bonus: notes a concrete difference — under 0–1 loss a change in the estimated probability that does not cross the threshold changes nothing at all, which has no analogue under squared error.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["bias-variance-tradeoff", "loss-functions"],
    source: ML_03,
    status: "live",
  },

  // --- Overfitting and Underfitting ----------------------------------------
  {
    id: "overfitting-underfitting--recall-definitions",
    conceptId: "overfitting-underfitting",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define overfitting and underfitting in bias–variance terms.",
    rubric: {
      elements: [
        {
          id: "overfitting",
          description:
            "Overfitting: fits the training data including its noise, generalises poorly — high variance.",
          weight: 3,
          required: true,
        },
        {
          id: "underfitting",
          description:
            "Underfitting: too rigid to capture the pattern even in the training data — high bias.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.15,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["overfitting-underfitting", "bias-variance-tradeoff"],
    source: ML_03,
    status: "live",
  },
  {
    id: "overfitting-underfitting--recall-symptom",
    conceptId: "overfitting-underfitting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The classic symptom of overfitting is:",
    choices: [
      {
        id: "a",
        text: "low training error alongside high validation error — a large gap between them",
        correct: true,
      },
      {
        id: "b",
        text: "high error on both training and validation data",
        correct: false,
        misconception: {
          id: "describes-underfitting",
          description:
            "That is underfitting. The level of the error diagnoses bias; the gap between the two diagnoses variance.",
          blameConceptId: "overfitting-underfitting",
        },
      },
      {
        id: "c",
        text: "validation error below training error",
        correct: false,
        misconception: {
          id: "reversed-gap-called-overfitting",
          description:
            "That pattern is rare and normally signals a broken split, a leaky feature, or regularisation applied only during training — not overfitting.",
          blameConceptId: "data-leakage",
        },
      },
      {
        id: "d",
        text: "training error that stops decreasing",
        correct: false,
        misconception: {
          id: "plateau-called-overfitting",
          description:
            "A training-loss plateau is an optimisation observation and says nothing on its own about generalisation.",
          blameConceptId: "overfitting-underfitting",
        },
      },
    ],
    difficulty: 0.15,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["overfitting-underfitting"],
    source: ML_03,
    status: "live",
  },
  {
    id: "overfitting-underfitting--apply-diagnose-two",
    conceptId: "overfitting-underfitting",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Diagnose each: (a) 99% training accuracy, 60% test accuracy; (b) 55% training accuracy, 54% test accuracy.",
    rubric: {
      elements: [
        {
          id: "a-overfitting",
          description: "(a) overfitting — a large train/test gap.",
          weight: 3,
          required: true,
        },
        {
          id: "b-underfitting",
          description:
            "(b) underfitting — both low and close together, so the model is not capturing patterns present even in the training data.",
          weight: 3,
          required: true,
        },
        {
          id: "reads-gap-and-level",
          description:
            "Bonus: makes the general rule explicit — the level judges bias, the gap judges variance.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.65,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["overfitting-underfitting"],
    source: ML_03,
    status: "live",
  },
  {
    id: "overfitting-underfitting--explain-regularisation-adds-bias",
    conceptId: "overfitting-underfitting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Regularisation combats overfitting by deliberately *increasing* bias. Why can that lower total error?",
    rubric: {
      elements: [
        {
          id: "constrains-flexibility",
          description:
            "Regularisation constrains the effective flexibility of the model, which raises bias.",
          weight: 3,
          required: true,
        },
        {
          id: "explicit-trade-via-decomposition",
          description:
            "Frames it through the decomposition: a small increase in bias² buys a larger reduction in variance, so the sum falls even though one term rose.",
          weight: 5,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "says-simpler-is-better",
          description:
            "Answers only that 'simpler models generalise better', with no account of why the total can fall while one component rises.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["overfitting-underfitting", "bias-variance-tradeoff"],
    source: ML_03,
    status: "live",
  },
  {
    id: "overfitting-underfitting--transfer-more-data-asymmetry",
    conceptId: "overfitting-underfitting",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why does collecting more training data generally fix overfitting but do very little for underfitting?",
    rubric: {
      elements: [
        {
          id: "more-data-reduces-variance",
          description:
            "More data lets a flexible model average out sample noise, and the variance of an average falls with sample size — so the variance term shrinks.",
          weight: 4,
          required: true,
        },
        {
          id: "form-limitation-unchanged",
          description:
            "Names the asymmetry: bias comes from the model's *form*, which more data does not change. A line fitted to a parabola converges — to the best line.",
          weight: 4,
          required: true,
        },
        {
          id: "diagnose-before-spending",
          description:
            "Bonus: draws the practical conclusion — diagnose which failure you have before paying for more data.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["overfitting-underfitting", "bias-variance-tradeoff", "variance"],
    source: ML_03,
    status: "live",
  },


  {
    id: "overfitting-underfitting--apply-diagnose-four-cases",
    conceptId: "overfitting-underfitting",
    format: "multi-select",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Select every train/validation error pair that indicates overfitting.",
    choices: [
      { id: "a", text: "training 2%, validation 24%", correct: true },
      { id: "b", text: "training 0%, validation 18%", correct: true },
      {
        id: "c",
        text: "training 31%, validation 33%",
        correct: false,
        misconception: {
          id: "high-level-small-gap-called-overfitting",
          description:
            "Both errors are high and close together — that is underfitting. The level judges bias; only the gap judges variance.",
          blameConceptId: "overfitting-underfitting",
        },
      },
      {
        id: "d",
        text: "training 12%, validation 4%",
        correct: false,
        misconception: {
          id: "reversed-gap-called-overfitting",
          description:
            "Validation below training is rare and normally signals a broken split, a leaky feature, or regularisation applied only at training time — not overfitting.",
          blameConceptId: "data-leakage",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 100,
    prereqClosure: ["overfitting-underfitting"],
    source: ML_03,
    status: "live",
  },
  {
    id: "overfitting-underfitting--explain-interpolation-is-not-learning",
    conceptId: "overfitting-underfitting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A depth-unlimited decision tree reaches 100% training accuracy on 1,000 rows. Explain what it has actually stored, and why the optimiser could not have avoided this on its own.",
    rubric: {
      elements: [
        {
          id: "what-it-stored",
          description:
            "It grew leaves until each held rows of a single class — in the limit one row per leaf — so a leaf encodes a specific training row rather than a rule, mislabelled rows included.",
          weight: 4,
          required: true,
        },
        {
          id: "why-the-optimiser-cannot-tell",
          description:
            "The training objective cannot distinguish noise from signal: both are just numbers that reduce the loss, so capacity spent on noise is indistinguishable from capacity spent well until unseen data arrives.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["overfitting-underfitting"],
    source: ML_03,
    status: "live",
  },
  {
    id: "overfitting-underfitting--transfer-early-stopping-as-regularisation",
    conceptId: "overfitting-underfitting",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Early stopping adds no penalty term and changes no architecture, yet it is described as a regularisation technique. Justify that description.",
    rubric: {
      elements: [
        {
          id: "limits-effective-capacity",
          description:
            "Halting before convergence limits how far the parameters travel from their initialisation, so the model never reaches the most flexible fit it is capable of — effective capacity is constrained even though nominal capacity is not.",
          weight: 5,
          required: true,
        },
        {
          id: "same-bias-variance-trade",
          description:
            "The trade is the familiar one: accepting some systematic error to stop the fit tracking the sample's noise.",
          weight: 3,
          required: true,
        },
        {
          id: "the-formal-link",
          description:
            "Bonus: notes that for gradient descent on a linear model the correspondence is close to exact — stopping early approximates an L2 penalty whose strength falls as training proceeds.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["overfitting-underfitting", "bias-variance-tradeoff"],
    source: ML_03,
    status: "live",
  },

  // --- Gradient Descent -----------------------------------------------------
  {
    id: "gradient-descent--recall-update-rule",
    conceptId: "gradient-descent",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "State the gradient descent update rule and identify η.",
    rubric: {
      elements: [
        {
          id: "rule",
          description: "θ ← θ − η∇L(θ).",
          weight: 4,
          required: true,
        },
        {
          id: "eta",
          description: "η is the learning rate, controlling the step size.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.3,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["gradient-descent", "loss-functions", "matrix-calculus"],
    source: ML_03,
    status: "live",
  },
  {
    id: "gradient-descent--recall-large-eta",
    conceptId: "gradient-descent",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "If the learning rate η is set too large, gradient descent may:",
    choices: [
      {
        id: "a",
        text: "overshoot the minimum and oscillate or diverge",
        correct: true,
      },
      {
        id: "b",
        text: "converge faster with no downside",
        correct: false,
        misconception: {
          id: "large-eta-free-speed",
          description:
            "Treats step size as free speed. Beyond a stability threshold set by the curvature, each step overshoots by more than it gained and the iteration amplifies.",
          blameConceptId: "gradient-descent",
        },
      },
      {
        id: "c",
        text: "get stuck at the starting point",
        correct: false,
        misconception: {
          id: "large-eta-thought-to-freeze",
          description:
            "That is the symptom of η too small (or a zero gradient), not too large.",
          blameConceptId: "gradient-descent",
        },
      },
      {
        id: "d",
        text: "find the global minimum of any loss surface",
        correct: false,
        misconception: {
          id: "large-eta-thought-to-escape-to-global",
          description:
            "Larger steps can escape some shallow basins, but nothing about step size makes a non-convex problem globally solvable.",
          blameConceptId: "gradient-descent",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["gradient-descent"],
    source: ML_03,
    status: "live",
  },
  {
    id: "gradient-descent--apply-one-step",
    conceptId: "gradient-descent",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For L(θ) = (θ − 3)², so ∇L(θ) = 2(θ − 3), start at θ = 0 with η = 0.1. What is θ after one gradient descent step?",
    answerKey: 0.6,
    tolerance: 0.005,
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["gradient-descent", "matrix-calculus"],
    source: ML_03,
    status: "live",
  },
  {
    id: "gradient-descent--explain-why-subtract",
    conceptId: "gradient-descent",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "The gradient points in the direction of steepest ascent. Use that to explain why the update rule subtracts η∇L(θ) rather than adding it.",
    rubric: {
      elements: [
        {
          id: "reuses-steepest-ascent",
          description:
            "Reuses the fact directly: ∇L points where L increases fastest, so −∇L points where it decreases fastest.",
          weight: 4,
          required: true,
        },
        {
          id: "minimising-requires-descent",
          description:
            "Concludes that minimising L requires moving in the descent direction, which is what the minus sign encodes.",
          weight: 3,
          required: true,
        },
        {
          id: "magnitude-carries-information",
          description:
            "Bonus: notes the gradient's magnitude matters too — big steps on steep terrain, small ones near a flat optimum.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["gradient-descent", "matrix-calculus"],
    source: ML_03,
    status: "live",
  },
  {
    id: "gradient-descent--transfer-why-stochastic",
    conceptId: "gradient-descent",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Stochastic gradient descent computes each gradient from one example or a small minibatch, giving a noisier estimate every step. Why is that preferred on very large datasets?",
    rubric: {
      elements: [
        {
          id: "cost-per-step",
          description:
            "Each step is dramatically cheaper, so far more steps fit into the same compute budget — progress per unit of compute is what matters, not accuracy per step.",
          weight: 4,
          required: true,
        },
        {
          id: "noise-can-help",
          description:
            "The gradient noise itself can help, letting the iterates escape shallow local minima and saddle points that full-batch descent would settle into.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["gradient-descent"],
    source: ML_03,
    status: "live",
  },


  {
    id: "gradient-descent--apply-two-steps",
    conceptId: "gradient-descent",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For L(θ) = (θ − 3)² with ∇L(θ) = 2(θ − 3), start at θ = 0 with η = 0.1. What is θ after two gradient descent steps?",
    answerKey: 1.08,
    tolerance: 0.005,
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["gradient-descent", "matrix-calculus"],
    source: ML_03,
    status: "live",
  },
  {
    id: "gradient-descent--explain-scaling-is-a-conditioning-fix",
    conceptId: "gradient-descent",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "One feature ranges over [0, 1] and another over [0, 100000]. Explain why this slows gradient descent badly, and why trees are unaffected by the same data.",
    rubric: {
      elements: [
        {
          id: "elongated-loss-surface",
          description:
            "The loss surface becomes a long narrow valley: curvature is enormous in one direction and tiny in another.",
          weight: 4,
          required: true,
        },
        {
          id: "step-size-set-by-the-wrong-direction",
          description:
            "The usable step size is capped by the steepest direction, while progress is needed along the shallowest — so the iterates zig-zag and convergence takes far more steps than the problem warrants.",
          weight: 4,
          required: true,
        },
        {
          id: "why-trees-are-immune",
          description:
            "Trees never combine features into one number — each split compares values within a single feature — so no shared step size exists to be mis-set.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["gradient-descent", "loss-functions"],
    source: ML_03,
    status: "live",
  },
  {
    id: "gradient-descent--transfer-convexity-and-guarantees",
    conceptId: "gradient-descent",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "On a convex loss, gradient descent with a suitable step size finds the global minimum. Neural network losses are not convex. Why does that trouble theory more than practice?",
    rubric: {
      elements: [
        {
          id: "what-is-actually-lost",
          description:
            "Without convexity the guarantee weakens to converging to *a* stationary point rather than *the* minimum, and which one depends on initialisation.",
          weight: 4,
          required: true,
        },
        {
          id: "why-practice-copes",
          description:
            "In large networks the many minima reached tend to be of comparable quality, and the stochastic noise in mini-batch gradients helps escape poor basins and saddle points, so the distinction rarely decides the outcome.",
          weight: 4,
          required: true,
        },
        {
          id: "honest-caveat",
          description:
            "Bonus: notes this is an empirical observation about the loss landscapes that arise in practice, not a theorem.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["gradient-descent", "loss-functions"],
    source: ML_03,
    status: "live",
  },

  // --- Cross Entropy Loss ---------------------------------------------------
  {
    id: "cross-entropy-loss--recall-binary-form",
    conceptId: "cross-entropy-loss",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "State binary cross-entropy loss, defining each symbol.",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "L = −[y log ŷ + (1 − y) log(1 − ŷ)].",
          weight: 4,
          required: true,
        },
        {
          id: "symbols",
          description: "y is the true 0/1 label and ŷ the predicted probability of class 1.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.22,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["cross-entropy-loss", "loss-functions", "likelihood-vs-probability"],
    source: ML_03,
    status: "live",
  },
  {
    id: "cross-entropy-loss--recall-nll-identity",
    conceptId: "cross-entropy-loss",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the relationship between cross-entropy loss and the likelihood of the observed labels?",
    choices: [
      {
        id: "a",
        text: "Cross-entropy is exactly the negative log-likelihood, so minimising it is maximising likelihood",
        correct: true,
      },
      {
        id: "b",
        text: "They resemble each other but the connection is a loose analogy",
        correct: false,
        misconception: {
          id: "identity-treated-as-analogy",
          description:
            "Downgrades an algebraic identity to a resemblance. Taking −log of the likelihood product gives the cross-entropy sum term for term.",
          blameConceptId: "cross-entropy-loss",
        },
      },
      {
        id: "c",
        text: "They are unrelated — one is a loss, the other a probability",
        correct: false,
        misconception: {
          id: "no-connection-claimed",
          description:
            "Misses that a loss can be *defined* as a transformed likelihood, which is exactly what cross-entropy is.",
          blameConceptId: "likelihood-vs-probability",
        },
      },
      {
        id: "d",
        text: "Cross-entropy is the likelihood itself, without a logarithm",
        correct: false,
        misconception: {
          id: "log-dropped",
          description:
            "Drops the logarithm that turns the product into a sum. Without it there is nothing to add up across examples and the values underflow.",
          blameConceptId: "cross-entropy-loss",
        },
      },
    ],
    difficulty: 0.08,
    discrimination: 1.4,
    expectedSeconds: 40,
    prereqClosure: ["cross-entropy-loss", "likelihood-vs-probability"],
    source: ML_03,
    status: "live",
  },
  {
    id: "cross-entropy-loss--apply-confident-wrong",
    conceptId: "cross-entropy-loss",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "The true label is y = 1 and the model predicts ŷ = 0.1. Compute the binary cross-entropy loss using natural logarithms, to three decimal places. (For comparison, ŷ = 0.9 gives 0.105.)",
    answerKey: 2.303,
    tolerance: 0.005,
    difficulty: 0.58,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["cross-entropy-loss"],
    source: ML_03,
    status: "live",
  },
  {
    id: "cross-entropy-loss--explain-unbounded-penalty",
    conceptId: "cross-entropy-loss",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "With y = 1, why does cross-entropy tend to infinity as ŷ → 0, and why is that unbounded penalty a desirable design choice rather than a defect?",
    rubric: {
      elements: [
        {
          id: "limit-argument",
          description: "States the limit: the loss is −log ŷ, and −log ŷ → ∞ as ŷ → 0.",
          weight: 3,
          required: true,
        },
        {
          id: "why-desirable",
          description:
            "Explains the design: being wrong *and* confident is far worse than being wrong and uncertain, and an unbounded penalty is what encodes that difference. A bounded loss like squared error treats the two almost the same.",
          weight: 4,
          required: true,
        },
        {
          id: "numerical-caveat",
          description:
            "Bonus: notes that implementations must therefore clip or work in log-space to avoid taking log of exactly 0.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.28,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["cross-entropy-loss"],
    source: ML_03,
    status: "live",
  },
  {
    id: "cross-entropy-loss--transfer-mle-identity",
    conceptId: "cross-entropy-loss",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem: "Show that minimising summed cross-entropy over n independent Bernoulli-labelled examples is exactly maximising their likelihood, and say what that means for a classifier trained by gradient descent.",
    rubric: {
      elements: [
        {
          id: "writes-the-likelihood",
          description:
            "Writes the likelihood as ∏ᵢ ŷᵢ^{yᵢ}(1 − ŷᵢ)^{1−yᵢ} for independent Bernoulli observations.",
          weight: 3,
          required: true,
        },
        {
          id: "takes-negative-log",
          description:
            "Takes the negative logarithm and obtains Σᵢ −[yᵢ log ŷᵢ + (1 − yᵢ) log(1 − ŷᵢ)] — the per-example cross-entropy terms, summed.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Draws the consequence: a classifier trained by minimising this sum is literally computing a maximum likelihood estimate, so it inherits maximum likelihood's properties.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-relationship-without-algebra",
          description:
            "Asserts the two are 'related' or 'equivalent' without carrying out the log-of-a-product step that makes it an identity.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.78,
    discrimination: 1.7,
    expectedSeconds: 300,
    prereqClosure: ["cross-entropy-loss", "likelihood-vs-probability"],
    source: ML_03,
    status: "live",
  },

  {
    id: "cross-entropy-loss--apply-compare-two-predictions",
    conceptId: "cross-entropy-loss",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "With y = 0 and a predicted probability of class 1 equal to ŷ = 0.25, compute the binary cross-entropy loss using natural logarithms, to three decimal places.",
    answerKey: 0.288,
    tolerance: 0.005,
    difficulty: 0.85,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["cross-entropy-loss"],
    source: ML_03,
    status: "live",
  },
  {
    id: "cross-entropy-loss--explain-gradient-cancellation",
    conceptId: "cross-entropy-loss",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Pairing a sigmoid output with cross-entropy gives a gradient of exactly (p̂ − y) with respect to the pre-activation score. Pairing it with squared error does not. Why does that difference matter most in precisely the worst case?",
    rubric: {
      elements: [
        {
          id: "squared-error-stalls",
          description:
            "Under squared error the gradient carries a factor of the sigmoid's derivative, which is near zero when the model is confidently wrong — so learning is slowest exactly where the error is largest.",
          weight: 4,
          required: true,
        },
        {
          id: "cross-entropy-cancels-it",
          description:
            "Under cross-entropy that factor cancels, leaving a gradient proportional to how wrong the prediction is — the more wrong, the larger the update.",
          weight: 4,
          required: true,
        },
        {
          id: "pairing-is-deliberate",
          description:
            "Bonus: notes the pairing is a design choice rather than a coincidence, which is why frameworks fuse the two into one operator.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["cross-entropy-loss", "loss-functions"],
    source: ML_03,
    status: "live",
  },
  {
    id: "cross-entropy-loss--transfer-accuracy-and-loss-can-diverge",
    conceptId: "cross-entropy-loss",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Over a training run, validation accuracy improves while validation cross-entropy gets worse. Explain how both can happen at once, and how you would decide which to act on.",
    rubric: {
      elements: [
        {
          id: "different-quantities",
          description:
            "Accuracy depends only on which class scores highest, while cross-entropy depends on the whole probability vector — so a model can fix a few borderline cases while growing overconfident on the rest.",
          weight: 4,
          required: true,
        },
        {
          id: "how-to-decide",
          description:
            "Which to act on follows from the use: a downstream expected-cost or thresholding decision needs trustworthy probabilities and should track cross-entropy; a pure top-1 decision can follow accuracy.",
          weight: 4,
          required: true,
        },
        {
          id: "calibration-remedies",
          description:
            "Bonus: names a remedy if probabilities matter — temperature scaling, or label smoothing to cap how confident the optimiser may become.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["cross-entropy-loss", "loss-functions"],
    source: ML_03,
    status: "live",
  },

];
