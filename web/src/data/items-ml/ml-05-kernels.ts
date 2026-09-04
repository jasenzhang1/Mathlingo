import type { Item } from "../../lib/assessment/types";
import { ML_05 } from "./sources";

/**
 * Cluster 5 — kernels. Ported from `assessments/ml-05-kernels.md`.
 *
 * `kernel` sits early in the graph (its only ancestors are `dot-product` and the
 * vector concepts beneath it), so items that motivate kernels through the SVM
 * describe the SVM in the stem rather than assuming it. `rbf`'s bandwidth item
 * likewise states the k-NN comparison it draws on, since `knn` is not upstream
 * of `rbf`. `mercers-theorem` genuinely does depend on
 * `positive-definite-matrices`, and declares it.
 */
export const ml05Items: Item[] = [
  // --- Kernel ---------------------------------------------------------------
  {
    id: "kernel--recall-definition",
    conceptId: "kernel",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define a kernel function.",
    rubric: {
      elements: [
        {
          id: "inner-product-in-feature-space",
          description:
            "A function K(x, z) that equals a dot product in some — possibly high- or infinite-dimensional — feature space.",
          weight: 4,
          required: true,
        },
        {
          id: "without-the-mapping",
          description:
            "Computed without ever forming the feature mapping φ explicitly.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.81,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "kernel--recall-the-trick",
    conceptId: "kernel",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The kernel trick lets a dot-product-based algorithm operate in a high-dimensional feature space:",
    choices: [
      {
        id: "a",
        text: "without ever transforming the data — each dot product is simply replaced by a kernel evaluation",
        correct: true,
      },
      {
        id: "b",
        text: "by explicitly transforming every data point into that space first",
        correct: false,
        misconception: {
          id: "trick-thought-to-materialise-features",
          description:
            "Describes the very computation the trick exists to avoid — and one that is impossible outright when the feature space is infinite-dimensional.",
          blameConceptId: "kernel",
        },
      },
      {
        id: "c",
        text: "by reducing the data to fewer dimensions first",
        correct: false,
        misconception: {
          id: "trick-confused-with-dimension-reduction",
          description:
            "Reverses the direction. Kernels give access to a *richer* implied space, not a smaller one.",
          blameConceptId: "kernel",
        },
      },
      {
        id: "d",
        text: "by approximating the dot product with a faster but less accurate formula",
        correct: false,
        misconception: {
          id: "trick-thought-approximate",
          description:
            "The kernel evaluation is exact — it equals the feature-space inner product, not an approximation of it.",
          blameConceptId: "kernel",
        },
      },
    ],
    difficulty: -0.55,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["kernel"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "kernel--apply-polynomial-cost",
    conceptId: "kernel",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "The polynomial kernel K(x, z) = (x·z + 1)² implicitly includes every squared and cross term of the original features. Why does forming those terms explicitly get expensive as the feature count grows, while evaluating (x·z + 1)² does not?",
    rubric: {
      elements: [
        {
          id: "explicit-terms-blow-up",
          description:
            "The number of squared and cross terms grows quadratically in d at degree 2, and faster at higher degrees.",
          weight: 4,
          required: true,
        },
        {
          id: "kernel-cost-is-fixed",
          description:
            "The kernel is always one d-dimensional dot product, plus a constant, squared — its cost does not depend on how many implicit features it stands for.",
          weight: 4,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-faster-without-comparison",
          description:
            "Says the kernel is 'more efficient' without contrasting the growing explicit cost against the fixed kernel cost.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "kernel--explain-infinite-dimensional-case",
    conceptId: "kernel",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is the kernel trick more than a speed-up when the implied feature space is infinite-dimensional?",
    rubric: {
      elements: [
        {
          id: "explicit-route-impossible",
          description:
            "Forming an infinite-dimensional feature vector is not slow — it is impossible, so there is no explicit route to optimise.",
          weight: 4,
          required: true,
        },
        {
          id: "kernel-still-finite",
          description:
            "The kernel itself still evaluates to an ordinary finite number, so the algorithm proceeds normally.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.69,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["kernel"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "kernel--transfer-kernelisation-condition",
    conceptId: "kernel",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "What condition must an algorithm satisfy to be 'kernelised', and why does that condition suffice?",
    rubric: {
      elements: [
        {
          id: "condition",
          description:
            "The raw feature vectors must appear nowhere except inside dot products between pairs of data points.",
          weight: 5,
          required: true,
        },
        {
          id: "why-it-suffices",
          description:
            "If that holds, every dot product can be swapped for a kernel evaluation without changing the algorithm's structure at all — the nonlinearity comes for free.",
          weight: 4,
          required: true,
        },
        {
          id: "examples",
          description:
            "Bonus: names algorithms with this property — maximum-margin classifiers, ridge regression, PCA, k-means.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.19,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "shadow",
  },

  // --- Mercer's Theorem -----------------------------------------------------
  {
    id: "mercers-theorem--recall-statement",
    conceptId: "mercers-theorem",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State Mercer's theorem informally.",
    rubric: {
      elements: [
        {
          id: "iff-psd",
          description:
            "A symmetric K is a valid kernel — it equals a dot product in some feature space — if and only if the matrix of K(xᵢ, xⱼ) values is positive semidefinite for every finite set of points.",
          weight: 5,
          required: true,
        },
        {
          id: "both-directions",
          description: "States it as an equivalence, not only one direction.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.05,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["mercers-theorem", "kernel", "positive-definite-matrices"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "mercers-theorem--recall-what-it-buys",
    conceptId: "mercers-theorem",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Mercer's theorem is useful because it:",
    choices: [
      {
        id: "a",
        text: "lets you verify that a proposed function is a legitimate kernel without ever constructing the feature mapping",
        correct: true,
      },
      {
        id: "b",
        text: "lets you compute the explicit feature mapping for any kernel",
        correct: false,
        misconception: {
          id: "mercer-thought-to-produce-phi",
          description:
            "Reverses the theorem's value. Its proof constructs a feature space in principle, but the point in practice is that you never need one.",
          blameConceptId: "mercers-theorem",
        },
      },
      {
        id: "c",
        text: "guarantees a kernel will give good predictive accuracy",
        correct: false,
        misconception: {
          id: "validity-confused-with-quality",
          description:
            "Confuses validity with usefulness. A valid kernel can still encode a similarity that is wrong for your data.",
          blameConceptId: "mercers-theorem",
        },
      },
      {
        id: "d",
        text: "shows every symmetric function is a kernel",
        correct: false,
        misconception: {
          id: "symmetry-thought-sufficient",
          description:
            "Symmetry is necessary but nowhere near sufficient — the sigmoid kernel is symmetric and not positive semidefinite for most parameter settings.",
          blameConceptId: "mercers-theorem",
        },
      },
    ],
    difficulty: 0.25,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["mercers-theorem"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "mercers-theorem--apply-why-check-the-matrix",
    conceptId: "mercers-theorem",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Why is checking positive semidefiniteness of the kernel matrix a more practical verification than constructing the feature mapping?",
    rubric: {
      elements: [
        {
          id: "matrix-check-is-finite",
          description:
            "The matrix check is a finite, directly computable test on the data points you actually have.",
          weight: 4,
          required: true,
        },
        {
          id: "mapping-may-not-exist-computably",
          description:
            "Constructing the mapping may be impossible — an infinite-dimensional feature space cannot be written down — so the matrix test is often the only available route.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["mercers-theorem", "positive-definite-matrices"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "mercers-theorem--explain-same-condition",
    conceptId: "mercers-theorem",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "How does Mercer's kernel-matrix condition relate to the positive-semidefiniteness condition you met in linear algebra — is it an analogy or the same test?",
    rubric: {
      elements: [
        {
          id: "identical-condition",
          description:
            "States that it is the identical condition, cᵀMc ≥ 0 for all c, applied to a matrix whose entries happen to be kernel evaluations.",
          weight: 5,
          required: true,
        },
        {
          id: "not-an-analogy",
          description:
            "Explicitly rejects the 'similar idea' framing — nothing is being transferred by analogy, the same definition is being reused.",
          weight: 3,
          required: true,
        },
        {
          id: "necessity-in-one-line",
          description:
            "Bonus: gives the one-line necessity proof — ΣᵢΣⱼ cᵢcⱼ⟨φ(xᵢ), φ(xⱼ)⟩ = ‖Σᵢcᵢφ(xᵢ)‖² ≥ 0.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.45,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["mercers-theorem", "positive-definite-matrices", "symmetric-matrices"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "mercers-theorem--transfer-custom-kernel-risk",
    conceptId: "mercers-theorem",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Someone invents a custom similarity function for comparing DNA sequences and wants to use it as a kernel in a maximum-margin classifier, whose training solves a quadratic optimisation problem built from the kernel matrix. Why must they check Mercer's condition first?",
    rubric: {
      elements: [
        {
          id: "no-feature-space",
          description:
            "A function failing the condition corresponds to no dot product in any feature space, so the geometric story the method rests on does not hold.",
          weight: 4,
          required: true,
        },
        {
          id: "optimisation-validity",
          description:
            "Names the concrete risk: the quadratic programme is convex only when the matrix is positive semidefinite, so an indefinite kernel makes the optimisation ill-posed — no unique solution, results depending on the solver's starting point.",
          weight: 5,
          required: true,
        },
        {
          id: "fails-silently",
          description:
            "Bonus: notes that this often fails silently rather than erroring, which is worse.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["mercers-theorem", "kernel", "positive-definite-matrices"],
    source: ML_05,
    status: "shadow",
  },

  // --- Radial Basis Function ------------------------------------------------
  {
    id: "rbf--recall-formula",
    conceptId: "rbf",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "State the RBF (Gaussian) kernel formula and say what it depends on.",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "K(x, z) = exp(−‖x − z‖² / (2σ²)), equivalently exp(−γ‖x − z‖²).",
          weight: 4,
          required: true,
        },
        {
          id: "depends-only-on-distance",
          description:
            "It depends on x and z only through the distance between them — that is what 'radial' means.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["rbf", "kernel"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "rbf--recall-when-largest",
    conceptId: "rbf",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The RBF kernel's value is largest when:",
    choices: [
      {
        id: "a",
        text: "x and z coincide — distance 0, giving K = 1",
        correct: true,
      },
      {
        id: "b",
        text: "x and z are far apart",
        correct: false,
        misconception: {
          id: "rbf-decay-inverted",
          description:
            "Reads the decay backwards. exp(−γ‖x − z‖²) falls towards 0 as the distance grows, never rises.",
          blameConceptId: "rbf",
        },
      },
      {
        id: "c",
        text: "x and z are orthogonal",
        correct: false,
        misconception: {
          id: "rbf-confused-with-linear",
          description:
            "Orthogonality is what the *linear* kernel responds to. The RBF kernel never looks at direction, only at distance.",
          blameConceptId: "rbf",
        },
      },
      {
        id: "d",
        text: "γ is very large",
        correct: false,
        misconception: {
          id: "gamma-confused-with-value",
          description:
            "γ controls how fast the kernel decays with distance; it does not by itself raise the kernel's value, and a large γ in fact drives most values towards 0.",
          blameConceptId: "rbf",
        },
      },
    ],
    difficulty: -0.45,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["rbf"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "rbf--apply-evaluate",
    conceptId: "rbf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For the RBF kernel exp(−‖x − z‖²/(2σ²)) with σ = 1 and ‖x − z‖² = 2, compute K(x, z) to three decimal places.",
    answerKey: 0.368,
    tolerance: 0.005,
    difficulty: 0.1,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["rbf", "kernel"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "rbf--explain-bandwidth-role",
    conceptId: "rbf",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain the role of σ in the RBF kernel. A nearest-neighbour method with a small neighbourhood gives a jagged, sample-sensitive fit, and with a large one gives a smooth, rigid fit — say which end of σ corresponds to which, and why.",
    rubric: {
      elements: [
        {
          id: "small-sigma",
          description:
            "Small σ: influence dies off quickly with distance, so each point affects only its immediate surroundings — the flexible, sample-sensitive end, like a small neighbourhood.",
          weight: 4,
          required: true,
        },
        {
          id: "large-sigma",
          description:
            "Large σ: influence extends far, so the fitted function is smooth and global — the rigid, stable end, like a large neighbourhood.",
          weight: 4,
          required: true,
        },
        {
          id: "why-the-parallel-holds",
          description:
            "Bonus: notes both parameters are doing the same job — setting how much of the data counts as 'nearby'.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["rbf", "kernel"],
    source: ML_05,
    status: "shadow",
  },
  {
    id: "rbf--transfer-infinite-dimensional",
    conceptId: "rbf",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why does the RBF kernel correspond to an infinite-dimensional feature space while the degree-p polynomial kernel does not, and what does that imply — and fail to imply — about the flexibility of a model using it?",
    rubric: {
      elements: [
        {
          id: "series-expansion",
          description:
            "Names the mechanism: expanding the exponential as a power series gives infinitely many polynomial terms of increasing degree, whereas the polynomial kernel stops at degree p.",
          weight: 4,
          required: true,
        },
        {
          id: "flexibility-in-principle",
          description:
            "In principle the model can fit an arbitrarily flexible boundary.",
          weight: 3,
          required: true,
        },
        {
          id: "practical-constraints-remain",
          description:
            "But σ and the regularisation strength still bound what is actually fitted — infinite capacity is not the same as unconstrained fitting, and treating it as such is how RBF models get overfitted.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["rbf", "kernel"],
    source: ML_05,
    status: "shadow",
  },
];
