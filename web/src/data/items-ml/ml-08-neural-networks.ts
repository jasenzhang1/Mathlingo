import type { Item } from "../../lib/assessment/types";
import { ML_08 } from "./sources";

/**
 * Cluster 8 — neural networks. Ported from `assessments/ml-08-neural-networks.md`.
 *
 * `perceptron` sits four concepts deep and has neither `logistic-regression` nor
 * `svm` upstream, so its transfer item describes both training rules in the stem
 * rather than assuming them. `neural-networks` genuinely depends on
 * `matrix-multiplication` and `matrix-calculus`, and `backpropagation` on
 * `gradient-descent`; those are declared.
 */
export const ml08Items: Item[] = [
  // --- Perceptron -----------------------------------------------------------
  {
    id: "perceptron--recall-describe",
    conceptId: "perceptron",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the perceptron.",
    rubric: {
      elements: [
        {
          id: "weighted-sum-plus-bias",
          description: "A weighted sum of the inputs plus a bias term.",
          weight: 3,
          required: true,
        },
        {
          id: "threshold-output",
          description:
            "Passed through a threshold (step) function to produce a binary classification.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["perceptron", "classification-vs-regression"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "perceptron--recall-learning-rule",
    conceptId: "perceptron",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The perceptron's original learning rule updates the weights by:",
    choices: [
      {
        id: "a",
        text: "a mistake-driven nudge: when a point is misclassified, move the weights toward classifying it correctly, and do nothing otherwise",
        correct: true,
      },
      {
        id: "b",
        text: "differentiating the output and following the gradient, as modern methods do",
        correct: false,
        misconception: {
          id: "perceptron-rule-thought-gradient-based",
          description:
            "The step function has zero derivative wherever it is differentiable, so there is no gradient to follow. The rule predates gradient methods and is related only in spirit.",
          blameConceptId: "perceptron",
        },
      },
      {
        id: "c",
        text: "averaging the weights over all training points at once",
        correct: false,
        misconception: {
          id: "perceptron-thought-batch-averaged",
          description:
            "The rule is online and per-example; correctly classified points contribute nothing at all.",
          blameConceptId: "perceptron",
        },
      },
      {
        id: "d",
        text: "solving a system of linear equations in closed form",
        correct: false,
        misconception: {
          id: "perceptron-thought-closed-form",
          description:
            "It is an iterative procedure with no closed form — and its answer depends on the order the examples arrived in.",
          blameConceptId: "perceptron",
        },
      },
    ],
    difficulty: -0.45,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["perceptron"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "perceptron--apply-classify-point",
    conceptId: "perceptron",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A perceptron has w = (1, −1) and b = 0. Compute the score w·x + b for x = (2, 3).",
    answerKey: -1,
    tolerance: 0.001,
    difficulty: 0.1,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["perceptron"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "perceptron--explain-xor",
    conceptId: "perceptron",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Describe the perceptron's XOR limitation and its historical consequence.",
    rubric: {
      elements: [
        {
          id: "xor-not-linearly-separable",
          description:
            "Names XOR specifically: no single straight line separates {(0,1), (1,0)} from {(0,0), (1,1)}, and a perceptron is exactly a line.",
          weight: 4,
          required: true,
        },
        {
          id: "historical-consequence",
          description:
            "Notes the consequence: the 1969 demonstration of this contributed to a long decline in neural-network research, until multi-layer networks and a way to train them were shown to overcome it.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["perceptron"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "perceptron--transfer-same-boundary-different-training",
    conceptId: "perceptron",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Three methods produce a boundary of the form sign(wᵀx + b): the perceptron; one that fits w by maximising the likelihood of the labels under a logistic model; and one that picks the w whose boundary sits furthest from the nearest points of either class. What do they share, and what actually distinguishes them?",
    rubric: {
      elements: [
        {
          id: "same-hypothesis-class",
          description:
            "All three search the same hypothesis class — a linear separating hyperplane — so the *form* of the boundary is identical.",
          weight: 4,
          required: true,
        },
        {
          id: "different-criteria",
          description:
            "What differs is how w is chosen: mistake-driven updates, likelihood maximisation, and margin maximisation — three different criteria over the same set of candidates.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Bonus: notes the consequence — the perceptron stops at *any* separator, which is exactly the gap the margin criterion closes.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["perceptron", "classification-vs-regression"],
    source: ML_08,
    status: "shadow",
  },

  // --- Neural Networks ------------------------------------------------------
  {
    id: "neural-networks--recall-describe",
    conceptId: "neural-networks",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe a feedforward neural network.",
    rubric: {
      elements: [
        {
          id: "layers-of-units",
          description:
            "Layers of perceptron-like units, each computing a weighted sum plus a bias.",
          weight: 3,
          required: true,
        },
        {
          id: "nonlinearity-between-layers",
          description:
            "Each layer's output passes through a *nonlinear* activation before feeding the next.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.18,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["neural-networks", "perceptron", "matrix-calculus"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "neural-networks--recall-linear-collapse",
    conceptId: "neural-networks",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Without a nonlinear activation between them, a stack of linear layers is:",
    choices: [
      {
        id: "a",
        text: "mathematically equivalent to a single linear layer",
        correct: true,
      },
      {
        id: "b",
        text: "more expressive than a single layer",
        correct: false,
        misconception: {
          id: "linear-stack-thought-expressive",
          description:
            "Composing linear maps only ever yields another linear map. A hundred such layers have exactly the representational power of one.",
          blameConceptId: "neural-networks",
        },
      },
      {
        id: "c",
        text: "unable to make predictions at all",
        correct: false,
        misconception: {
          id: "linear-stack-thought-broken",
          description:
            "It predicts perfectly well — as a linear model. The problem is that the extra layers buy nothing, not that it fails.",
          blameConceptId: "neural-networks",
        },
      },
      {
        id: "d",
        text: "equivalent to a single layer only when all the weight matrices are square",
        correct: false,
        misconception: {
          id: "collapse-thought-shape-dependent",
          description:
            "The composition W₃W₂W₁ is a single matrix whatever the intermediate shapes, provided they conform.",
          blameConceptId: "matrix-multiplication",
        },
      },
    ],
    difficulty: 0.12,
    discrimination: 1.4,
    expectedSeconds: 35,
    prereqClosure: ["neural-networks"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "neural-networks--apply-composition-derivation",
    conceptId: "neural-networks",
    format: "derivation",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Show that two layers with weight matrices W₁ then W₂ and no activation between them are equivalent to one layer with weight matrix W₂W₁.",
    rubric: {
      elements: [
        {
          id: "the-derivation",
          description:
            "Applies the layers in order: W₂(W₁x) = (W₂W₁)x, by associativity of matrix multiplication.",
          weight: 4,
          required: true,
        },
        {
          id: "names-the-underlying-fact",
          description:
            "Identifies this as the composition-of-linear-transformations fact from linear algebra, reused rather than re-derived.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.62,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["neural-networks", "matrix-multiplication", "linear-transformations"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "neural-networks--explain-depth-vs-width",
    conceptId: "neural-networks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "State the universal approximation theorem informally, then explain why deep networks are usually preferred over wide shallow ones despite it.",
    rubric: {
      elements: [
        {
          id: "theorem",
          description:
            "A sufficiently wide single hidden layer with a nonlinear activation can approximate any continuous function on a compact set arbitrarily well.",
          weight: 3,
          required: true,
        },
        {
          id: "efficiency-argument",
          description:
            "Depth is about parameter efficiency: some functions need exponentially many units shallow and only polynomially many deep, because a deep network reuses intermediate features rather than re-deriving them.",
          weight: 4,
          required: true,
        },
        {
          id: "theorem-is-silent-on-learning",
          description:
            "Bonus: notes the theorem says nothing about whether gradient descent can find those weights from finite data.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.32,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["neural-networks", "perceptron"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "neural-networks--transfer-hidden-layer-solves-xor",
    conceptId: "neural-networks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "How does adding one hidden layer let a small network solve XOR, which a single perceptron cannot?",
    rubric: {
      elements: [
        {
          id: "hidden-units-build-features",
          description:
            "Each hidden unit computes its own linear function of the input — for XOR, something like (x₁ OR x₂) and (x₁ AND x₂) — each of which *is* linearly separable.",
          weight: 4,
          required: true,
        },
        {
          id: "output-layer-combines",
          description:
            "The output layer then applies a linear rule to those intermediate results, and the composition represents a function that is nonlinear in the original inputs.",
          weight: 4,
          required: true,
        },
        {
          id: "nonlinearity-required",
          description:
            "Bonus: notes this only works because of the nonlinearity between the layers — without it the whole thing collapses back to one line.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.82,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["neural-networks", "perceptron"],
    source: ML_08,
    status: "shadow",
  },

  // --- Backpropagation ------------------------------------------------------
  {
    id: "backpropagation--recall-describe",
    conceptId: "backpropagation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe backpropagation.",
    rubric: {
      elements: [
        {
          id: "computes-gradients",
          description:
            "An algorithm computing the gradient of the loss with respect to every weight.",
          weight: 3,
          required: true,
        },
        {
          id: "chain-rule-backwards",
          description:
            "By applying the chain rule, propagating an error signal backwards from the output layer towards the input.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.08,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["backpropagation", "neural-networks", "gradient-descent"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "backpropagation--recall-what-it-is-not",
    conceptId: "backpropagation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Backpropagation is:",
    choices: [
      {
        id: "a",
        text: "the method that computes the gradients which an optimiser then uses to update the weights",
        correct: true,
      },
      {
        id: "b",
        text: "an alternative to gradient descent",
        correct: false,
        misconception: {
          id: "backprop-confused-with-optimiser",
          description:
            "The two are complementary, not competing: one computes derivatives, the other consumes them. Any gradient-consuming optimiser can be swapped in unchanged.",
          blameConceptId: "backpropagation",
        },
      },
      {
        id: "c",
        text: "a regularisation technique",
        correct: false,
        misconception: {
          id: "backprop-confused-with-regularisation",
          description:
            "It has no effect on generalisation at all — it computes an exact quantity that would be the same however it were obtained.",
          blameConceptId: "backpropagation",
        },
      },
      {
        id: "d",
        text: "a numerical approximation to the true gradient",
        correct: false,
        misconception: {
          id: "backprop-thought-approximate",
          description:
            "Backpropagation is exact to floating-point precision. It is *finite differences* that approximates, and that is what backpropagation replaces.",
          blameConceptId: "backpropagation",
        },
      },
    ],
    difficulty: 0.22,
    discrimination: 1.4,
    expectedSeconds: 35,
    prereqClosure: ["backpropagation"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "backpropagation--apply-early-layer-chain",
    conceptId: "backpropagation",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Why does computing the gradient for a weight in an early layer require the chain rule applied through every subsequent layer?",
    rubric: {
      elements: [
        {
          id: "effect-is-mediated",
          description:
            "That weight affects the loss only through what happens to its output as it passes through every later layer.",
          weight: 4,
          required: true,
        },
        {
          id: "chain-rule-composes-locals",
          description:
            "The chain rule composes each layer's local derivative to trace that whole path, which is why the product runs over all the layers in between.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.72,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["backpropagation", "matrix-calculus", "neural-networks"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "backpropagation--explain-efficiency",
    conceptId: "backpropagation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A network has a million parameters. Compare the cost of getting its gradient by backpropagation with the cost of perturbing each weight and re-running the network.",
    rubric: {
      elements: [
        {
          id: "finite-differences-cost",
          description:
            "Perturbation needs one full forward pass per parameter — a million passes for one gradient, and the result is still only approximate.",
          weight: 4,
          required: true,
        },
        {
          id: "backprop-cost",
          description:
            "Backpropagation gets all of them for roughly the cost of one forward pass plus one backward pass, by reusing intermediate quantities.",
          weight: 4,
          required: true,
        },
        {
          id: "why-this-direction",
          description:
            "Bonus: notes the asymmetry that makes the backward direction the right one — many inputs, one scalar loss.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.42,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["backpropagation", "neural-networks"],
    source: ML_08,
    status: "shadow",
  },
  {
    id: "backpropagation--transfer-vanishing-gradients",
    conceptId: "backpropagation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Describe the vanishing gradient problem, why it makes the early layers of a deep network learn slowly, and name at least one mitigation.",
    rubric: {
      elements: [
        {
          id: "exponential-product",
          description:
            "Names the mechanism: the chain rule multiplies one factor per layer, and if each has magnitude below 1 the product shrinks exponentially with depth — the sigmoid's derivative peaks at 0.25, so ten such layers scale the signal by at most 0.25¹⁰.",
          weight: 5,
          required: true,
        },
        {
          id: "consequence-for-early-layers",
          description:
            "Early-layer gradients therefore arrive near zero and their weights barely move.",
          weight: 3,
          required: true,
        },
        {
          id: "mitigation",
          description:
            "Names at least one mitigation: ReLU (derivative 1 for positive inputs), residual connections, careful initialisation, or normalisation layers.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.92,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["backpropagation", "neural-networks", "gradient-descent"],
    source: ML_08,
    status: "shadow",
  },
];
