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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "kernel--apply-polynomial-value",
    conceptId: "kernel",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For the polynomial kernel K(x, z) = (x·z + 1)², compute K(x, z) with x = (1, 2) and z = (3, 1).",
    answerKey: 36,
    tolerance: 0.001,
    difficulty: 0.19,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "live",
  },
  {
    id: "kernel--explain-similarity-reading",
    conceptId: "kernel",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A kernel is often described as a similarity measure. Why is that a fair reading, and what stops any similarity function you invent from being usable as one?",
    rubric: {
      elements: [
        {
          id: "similarity-reading",
          description:
            "K(x, z) says how alike two points are, and it is a fair reading because an inner product is large for aligned vectors and small for unrelated ones.",
          weight: 3,
          required: true,
        },
        {
          id: "not-any-function",
          description:
            "Not every similarity function qualifies: it must correspond to an actual inner product in some space, or the geometry the kernelised algorithm assumes does not exist.",
          weight: 4,
          required: true,
        },
        {
          id: "names-the-test",
          description:
            "Bonus: names the checkable condition — every matrix of pairwise kernel values must be positive semidefinite.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "live",
  },
  {
    id: "kernel--transfer-non-vector-objects",
    conceptId: "kernel",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Kernels exist for strings, graphs and trees — objects with no natural coordinate representation. Why is that possible, and what does it let an otherwise vector-only algorithm do?",
    rubric: {
      elements: [
        {
          id: "only-pairwise-similarity-needed",
          description:
            "A kernelised algorithm never touches coordinates — it needs only a number for each pair of objects, so anything that can supply a valid pairwise similarity can be its input.",
          weight: 5,
          required: true,
        },
        {
          id: "concrete-consequence",
          description:
            "So a maximum-margin classifier or a clustering method can run directly on DNA sequences or molecule graphs without anyone inventing a feature vector for them.",
          weight: 3,
          required: true,
        },
        {
          id: "validity-still-required",
          description:
            "Bonus: notes the similarity must still be a valid kernel, which is the practical burden in designing one.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "mercers-theorem--apply-closure-properties",
    conceptId: "mercers-theorem",
    format: "multi-select",
    cognitive: "apply",
    channels: ["typed"],
    stem: "K₁ and K₂ are valid kernels and c > 0 is a constant. Select every expression that is guaranteed to be a valid kernel.",
    choices: [
      { id: "a", text: "K₁ + K₂", correct: true },
      { id: "b", text: "c · K₁", correct: true },
      { id: "c", text: "K₁ · K₂ (pointwise product)", correct: true },
      {
        id: "d",
        text: "K₁ − K₂",
        correct: false,
        misconception: {
          id: "difference-assumed-closed",
          description:
            "Subtraction is not among the closure properties, and for good reason: a difference of positive semidefinite matrices can easily have a negative eigenvalue.",
          blameConceptId: "positive-definite-matrices",
        },
      },
      {
        id: "e",
        text: "−K₁",
        correct: false,
        misconception: {
          id: "negation-assumed-closed",
          description:
            "Negating flips every eigenvalue's sign, so a positive semidefinite matrix becomes negative semidefinite — the condition fails outright.",
          blameConceptId: "mercers-theorem",
        },
      },
    ],
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["mercers-theorem", "positive-definite-matrices"],
    source: ML_05,
    status: "live",
  },
  {
    id: "mercers-theorem--explain-necessity-direction",
    conceptId: "mercers-theorem",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem: "Prove the easy direction: if K(x, z) = ⟨φ(x), φ(z)⟩ for some feature map φ, then every kernel matrix it produces is positive semidefinite.",
    rubric: {
      elements: [
        {
          id: "sets-up-the-quadratic-form",
          description:
            "Writes ΣᵢΣⱼ cᵢcⱼK(xᵢ, xⱼ) = ΣᵢΣⱼ cᵢcⱼ⟨φ(xᵢ), φ(xⱼ)⟩ for arbitrary coefficients c.",
          weight: 3,
          required: true,
        },
        {
          id: "pulls-out-the-norm",
          description:
            "Uses bilinearity of the inner product to recognise the double sum as ‖Σᵢ cᵢφ(xᵢ)‖².",
          weight: 4,
          required: true,
        },
        {
          id: "concludes",
          description:
            "Concludes it is ≥ 0 because a squared norm cannot be negative, which is the definition of positive semidefinite.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-without-bilinearity",
          description:
            "Jumps straight to the squared norm without the bilinearity step that produces it.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 260,
    prereqClosure: ["mercers-theorem", "dot-product", "positive-definite-matrices"],
    source: ML_05,
    status: "live",
  },
  {
    id: "mercers-theorem--transfer-covariance-connection",
    conceptId: "mercers-theorem",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A covariance matrix must be positive semidefinite, because a variance cannot be negative. What does that tell you about using a kernel as the covariance function of a random process?",
    rubric: {
      elements: [
        {
          id: "same-condition-again",
          description:
            "It is the same condition once more: the matrix of pairwise covariances the kernel generates must be a valid covariance matrix, which is exactly Mercer's requirement.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence-of-violating-it",
          description:
            "An invalid kernel would imply some linear combination of the process's values has negative variance — an incoherent model, not merely a poorly performing one.",
          weight: 4,
          required: true,
        },
        {
          id: "so-the-same-kernels-transfer",
          description:
            "Bonus: notes this is why the same kernel catalogue serves margin classifiers and Gaussian processes alike.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["mercers-theorem", "positive-definite-matrices", "symmetric-matrices"],
    source: ML_05,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },

  {
    id: "rbf--apply-gamma-form",
    conceptId: "rbf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For the RBF kernel written as exp(−γ‖x − z‖²) with γ = 0.5 and ‖x − z‖² = 4, compute K(x, z) to three decimal places.",
    answerKey: 0.135,
    tolerance: 0.005,
    difficulty: 0.4,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["rbf", "kernel"],
    source: ML_05,
    status: "live",
  },
  {
    id: "rbf--explain-scaling-requirement",
    conceptId: "rbf",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is a single γ meaningless unless the features have been put on a common scale?",
    rubric: {
      elements: [
        {
          id: "distance-sums-across-features",
          description:
            "‖x − z‖² sums squared differences across all features, so a feature measured in the thousands contributes vastly more to that sum than one measured in units.",
          weight: 4,
          required: true,
        },
        {
          id: "one-gamma-cannot-fit-all",
          description:
            "A single γ then sets an appropriate bandwidth for the dominant feature and an absurd one for the rest — the units, not the modeller, decide which features the kernel is sensitive to.",
          weight: 4,
          required: true,
        },
        {
          id: "practical-note",
          description:
            "Bonus: notes that the common default γ = 1/(d · Var(X)) only makes sense once the data is standardised.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["rbf", "kernel", "vector-operations"],
    source: ML_05,
    status: "live",
  },
  {
    id: "rbf--transfer-limits-of-gamma",
    conceptId: "rbf",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Describe what the RBF kernel matrix approaches as γ → 0 and as γ → ∞, and what each limit does to a model built on it.",
    rubric: {
      elements: [
        {
          id: "gamma-to-zero",
          description:
            "γ → 0: every entry tends to 1, so all points look identical and the model can no longer distinguish them — an effectively constant, maximally rigid fit.",
          weight: 4,
          required: true,
        },
        {
          id: "gamma-to-infinity",
          description:
            "γ → ∞: off-diagonal entries tend to 0 and the matrix approaches the identity, so each training point is similar only to itself — the model memorises the training set and generalises to nothing.",
          weight: 4,
          required: true,
        },
        {
          id: "reading-the-two-limits",
          description:
            "Bonus: identifies these as the two failure modes γ interpolates between, which is why it must be tuned jointly with the regularisation strength.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["rbf", "kernel"],
    source: ML_05,
    status: "live",
  },

  // --- Kernel (added: doubling sweep) ---------------------------------------
  {
    id: "kernel--recall-symmetry",
    conceptId: "kernel",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For any kernel K built as an inner product in a feature space, what is true of K(x, z) and K(z, x)?",
    choices: [
      { id: "a", text: "They are always equal: K(x, z) = K(z, x)", correct: true },
      {
        id: "b",
        text: "They are equal only when x = z",
        correct: false,
        misconception: {
          id: "symmetry-thought-conditional",
          description:
            "An inner product is symmetric for every pair of vectors, not only when the two coincide — φ(x)·φ(z) and φ(z)·φ(x) are the same real number by definition of the dot product.",
          blameConceptId: "kernel",
        },
      },
      {
        id: "c",
        text: "They differ by a factor depending on ‖x‖ and ‖z‖",
        correct: false,
        misconception: {
          id: "symmetry-thought-scaled",
          description:
            "Invents a correction factor. There is none: swapping the arguments of a dot product changes nothing.",
          blameConceptId: "kernel",
        },
      },
      {
        id: "d",
        text: "Nothing can be said without knowing the feature map φ",
        correct: false,
        misconception: {
          id: "symmetry-thought-map-dependent",
          description:
            "Symmetry follows from the dot product's own definition, for every choice of φ — it needs no case analysis on which feature map is in play.",
          blameConceptId: "kernel",
        },
      },
    ],
    difficulty: -1.9,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "live",
  },
  {
    id: "kernel--recall-linear-kernel-map",
    conceptId: "kernel",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The simplest kernel, K(x, z) = x·z, is called the linear kernel. Which feature map φ does it correspond to?",
    choices: [
      { id: "a", text: "φ(x) = x — the identity, no transformation at all", correct: true },
      {
        id: "b",
        text: "φ(x) = x², elementwise",
        correct: false,
        misconception: {
          id: "linear-kernel-thought-quadratic-map",
          description:
            "Confuses the linear kernel with a polynomial kernel of degree 2. Squaring the coordinates would change the dot product's value on almost every pair.",
          blameConceptId: "kernel",
        },
      },
      {
        id: "c",
        text: "There is no feature map — the linear kernel is a special case with none",
        correct: false,
        misconception: {
          id: "linear-kernel-thought-mapless",
          description:
            "Every valid kernel corresponds to some feature map; the linear kernel's map is simply the identity, which is still a map, not the absence of one.",
          blameConceptId: "kernel",
        },
      },
      {
        id: "d",
        text: "φ(x) = ‖x‖, the scalar norm of x",
        correct: false,
        misconception: {
          id: "linear-kernel-thought-scalar-map",
          description:
            "A feature map into a scalar would lose direction entirely, so K(x, z) would depend only on the two norms and never on the angle between x and z — but x·z plainly does.",
          blameConceptId: "kernel",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "live",
  },
  {
    id: "kernel--apply-sum-of-kernels",
    conceptId: "kernel",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "K1(x, z) = x·z and K2(x, z) = 1 are both valid kernels. For x = (2, 3), z = (1, 4), compute K1(x, z) + K2(x, z).",
    answerKey: 15,
    tolerance: 0.001,
    difficulty: -0.3,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "live",
  },
  {
    id: "kernel--apply-homogeneous-quadratic-value",
    conceptId: "kernel",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For the homogeneous polynomial kernel K(x, z) = (x·z)², compute K(x, z) with x = (1, 1) and z = (2, 3).",
    answerKey: 25,
    tolerance: 0.001,
    difficulty: 0.05,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "live",
  },
  {
    id: "kernel--explain-self-similarity-nonnegative",
    conceptId: "kernel",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why must K(x, x) ≥ 0 for every valid kernel, no matter what feature map it corresponds to?",
    rubric: {
      elements: [
        {
          id: "self-similarity-is-squared-norm",
          description: "K(x, x) = φ(x)·φ(x) = ‖φ(x)‖², a squared norm.",
          weight: 4,
          required: true,
        },
        {
          id: "squared-norm-never-negative",
          description:
            "A squared norm can never be negative, so the bound holds regardless of what φ actually is.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "live",
  },
  {
    id: "kernel--explain-not-a-distance-in-general",
    conceptId: "kernel",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A learner claims that for every kernel, a larger K(x, z) always means x and z are closer together, the way it does for the RBF kernel. Explain what breaks for the linear kernel.",
    rubric: {
      elements: [
        {
          id: "linear-kernel-not-distance-based",
          description:
            "For the linear kernel K(x, z) = x·z, two points that are far apart but point the same way can give a large K, while two nearby points can give a small or even negative K if their coordinates have opposite signs — K tracks alignment and magnitude, not proximity.",
          weight: 4,
          required: true,
          misconception: {
            id: "assumes-every-kernel-is-distance-based",
            description: "Generalises the RBF kernel's distance-decreasing property to kernels generally, when it is a property of that specific construction.",
            blameConceptId: "kernel",
          },
        },
        {
          id: "rbf-is-the-special-case",
          description:
            "Notes that only a kernel explicitly built as a decreasing function of distance, like RBF, has 'larger K means closer' as a guaranteed reading.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "live",
  },
  {
    id: "kernel--transfer-kernel-ridge-eligibility",
    conceptId: "kernel",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Ridge regression's solution can be rewritten in a 'dual' form that uses only dot products between pairs of data points. Explain what this lets you do with a kernel, and why the usual (primal) closed form β̂ = (XᵀX + λI)⁻¹Xᵀy does not make the same option obvious.",
    rubric: {
      elements: [
        {
          id: "dual-form-kernelisable",
          description:
            "Because the dual form only needs dot products among data points, replacing every dot product with K(x, z) kernelises ridge regression for free — kernel ridge regression.",
          weight: 4,
          required: true,
        },
        {
          id: "primal-hides-it",
          description:
            "The primal formula manipulates raw feature matrices directly (XᵀX, Xᵀy) rather than pairwise dot products, so the substitution point is invisible until the problem is rewritten in the dual.",
          weight: 4,
          required: true,
        },
        {
          id: "same-condition",
          description:
            "Bonus: names this as the same eligibility condition as the kernel trick generally — feature vectors appear only inside dot products.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "live",
  },
  {
    id: "kernel--transfer-averaging-in-feature-space",
    conceptId: "kernel",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "The 'kernel mean' of points x₁, …, xₙ is defined, for any query x, as (1/n)Σᵢ K(x, xᵢ) — without ever forming (1/n)Σᵢφ(xᵢ) explicitly. Explain why this equals K evaluated against the average feature vector, and why that average feature vector can be entirely inaccessible even though the kernel mean is easy to compute.",
    rubric: {
      elements: [
        {
          id: "linearity-of-dot-product",
          description:
            "K(x, xᵢ) = φ(x)·φ(xᵢ), and the dot product is linear in its second argument, so averaging over i gives φ(x)·[(1/n)Σᵢφ(xᵢ)] — exactly K(x, ·) evaluated at the mean feature vector.",
          weight: 4,
          required: true,
        },
        {
          id: "mean-feature-inaccessible",
          description:
            "When φ maps into an infinite-dimensional space, that mean feature vector is a genuine point there that can never be written down — it can only be queried indirectly, one K evaluation at a time.",
          weight: 4,
          required: true,
        },
        {
          id: "used-in-mmd",
          description: "Bonus: names this as the mechanism behind kernel mean embeddings and maximum mean discrepancy.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["kernel", "dot-product"],
    source: ML_05,
    status: "live",
  },

  // --- Mercer's Theorem (added: doubling sweep) -----------------------------
  {
    id: "mercers-theorem--recall-symmetric-necessary",
    conceptId: "mercers-theorem",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A necessary (but not sufficient) condition for K to satisfy Mercer's theorem is that K is:",
    choices: [
      { id: "a", text: "symmetric: K(x, z) = K(z, x)", correct: true },
      {
        id: "b",
        text: "positive at every pair of inputs",
        correct: false,
        misconception: {
          id: "confuses-pointwise-positive-with-psd",
          description:
            "Confuses positivity of individual values with positive semidefiniteness of the matrix they form — a matrix of all-positive entries can still have a negative eigenvalue.",
          blameConceptId: "mercers-theorem",
        },
      },
      {
        id: "c",
        text: "linear in its first argument",
        correct: false,
        misconception: {
          id: "requires-linearity",
          description: "Mercer's theorem places no linearity requirement on K; the RBF and polynomial kernels are both nonlinear in x and both valid.",
          blameConceptId: "mercers-theorem",
        },
      },
      {
        id: "d",
        text: "bounded above by 1",
        correct: false,
        misconception: {
          id: "requires-bounded-by-one",
          description: "No such bound is required — the linear kernel x·z is unbounded and still a valid kernel.",
          blameConceptId: "mercers-theorem",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["mercers-theorem", "kernel"],
    source: ML_05,
    status: "live",
  },
  {
    id: "mercers-theorem--recall-finite-sets",
    conceptId: "mercers-theorem",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Mercer's positive-semidefinite condition must hold for the kernel matrix built from:",
    choices: [
      { id: "a", text: "every finite set of points, of every size", correct: true },
      {
        id: "b",
        text: "only pairs of points (every 2×2 kernel matrix)",
        correct: false,
        misconception: {
          id: "checks-pairs-only",
          description:
            "Positive semidefiniteness of every 2×2 submatrix does not guarantee it for larger matrices — the condition genuinely strengthens as the set grows, so pairwise checks are not enough.",
          blameConceptId: "mercers-theorem",
        },
      },
      {
        id: "c",
        text: "the whole (possibly infinite) input space at once",
        correct: false,
        misconception: {
          id: "requires-infinite-check",
          description:
            "Mercer's theorem is stated over finite subsets precisely because that is the only form of the condition that can actually be checked.",
          blameConceptId: "mercers-theorem",
        },
      },
      {
        id: "d",
        text: "a single point at a time",
        correct: false,
        misconception: {
          id: "checks-single-point",
          description: "A 1×1 matrix K(x, x) is trivially non-negative for any reasonable K and carries no information about cross terms between points.",
          blameConceptId: "mercers-theorem",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["mercers-theorem"],
    source: ML_05,
    status: "live",
  },
  {
    id: "mercers-theorem--apply-2x2-determinant-check",
    conceptId: "mercers-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A candidate K gives K(x₁, x₁) = 1, K(x₂, x₂) = 1, K(x₁, x₂) = K(x₂, x₁) = 2. A 2×2 symmetric matrix is positive semidefinite only if its determinant is ≥ 0. Compute the determinant of this kernel matrix.",
    answerKey: -3,
    tolerance: 0.01,
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["mercers-theorem", "positive-definite-matrices"],
    source: ML_05,
    status: "live",
  },
  {
    id: "mercers-theorem--apply-scaling-preserves-validity",
    conceptId: "mercers-theorem",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "K is a valid kernel. Is 3K also guaranteed to be a valid kernel?",
    choices: [
      { id: "a", text: "Yes — scaling by a positive constant preserves positive semidefiniteness", correct: true },
      {
        id: "b",
        text: "No — scaling changes which points count as similar",
        correct: false,
        misconception: {
          id: "scaling-thought-to-invalidate",
          description: "Scaling a kernel by a positive constant multiplies every eigenvalue of the kernel matrix by that same positive constant, which cannot turn a non-negative eigenvalue negative.",
          blameConceptId: "mercers-theorem",
        },
      },
      {
        id: "c",
        text: "Only if the constant is at most 1",
        correct: false,
        misconception: {
          id: "invents-constant-bound",
          description: "No such bound exists — the argument for closure under positive scaling works identically for 3 and for 300.",
          blameConceptId: "positive-definite-matrices",
        },
      },
      {
        id: "d",
        text: "Only if K is already normalised to values in [0, 1]",
        correct: false,
        misconception: {
          id: "invents-normalisation-requirement",
          description: "Positive semidefiniteness is a property of eigenvalue signs, not of the numeric range of the entries.",
          blameConceptId: "mercers-theorem",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["mercers-theorem", "positive-definite-matrices"],
    source: ML_05,
    status: "live",
  },
  {
    id: "mercers-theorem--explain-symmetry-alone-insufficient",
    conceptId: "mercers-theorem",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why checking that K is symmetric is not enough to guarantee it can serve as a kernel, and give a form a symmetric-but-invalid function can take.",
    rubric: {
      elements: [
        {
          id: "symmetric-insufficient",
          description:
            "Symmetry alone says nothing about the sign structure of the quadratic form cᵀKc; a symmetric matrix can still have negative eigenvalues.",
          weight: 4,
          required: true,
          misconception: {
            id: "symmetry-alone-insufficient-explain",
            description: "Treats symmetry as sufficient on its own for Mercer's condition, when it is only one of two requirements.",
            blameConceptId: "mercers-theorem",
          },
        },
        {
          id: "example",
          description: "Gives an example: K(x, z) = tanh(a·x·z + b) is symmetric for standard parameter choices, yet fails to be positive semidefinite for most a, b.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["mercers-theorem", "positive-definite-matrices"],
    source: ML_05,
    status: "live",
  },
  {
    id: "mercers-theorem--explain-role-of-finite-subsets",
    conceptId: "mercers-theorem",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Mercer's theorem is stated over every finite subset of points, not the whole (possibly infinite) input space at once. Explain why checking finite subsets suffices for the way K will actually be used.",
    rubric: {
      elements: [
        {
          id: "algorithms-see-finite-data",
          description:
            "Any run of a kernel method evaluates K only on the finitely many training and test points actually present, so validity on the relevant finite set is exactly what the optimisation needs.",
          weight: 4,
          required: true,
        },
        {
          id: "cannot-check-infinite-directly",
          description: "No procedure can literally test every value on an infinite space, so the finite formulation is also the only one that is checkable at all.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["mercers-theorem"],
    source: ML_05,
    status: "live",
  },
  {
    id: "mercers-theorem--transfer-string-kernel-validity",
    conceptId: "mercers-theorem",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A researcher defines a string kernel K(s, t) = the number of length-3 substrings shared by strings s and t. Sketch why this construction is automatically a valid kernel, without checking any matrix by hand.",
    rubric: {
      elements: [
        {
          id: "counts-are-inner-products",
          description:
            "A 'count of shared X' kernel can be written as φ(s)·φ(t), where φ(s) is the vector of counts of each possible length-3 substring in s — an explicit, if huge, feature map, so it is a real dot product by construction.",
          weight: 4,
          required: true,
        },
        {
          id: "construction-guarantees-mercer",
          description:
            "Exhibiting an explicit feature map guarantees Mercer's condition rather than requiring it to be checked separately — the same shortcut that certifies the polynomial and RBF kernels.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["mercers-theorem", "kernel"],
    source: ML_05,
    status: "live",
  },
  {
    id: "mercers-theorem--transfer-numerical-jitter",
    conceptId: "mercers-theorem",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A kernel matrix computed from floating-point data is theoretically positive semidefinite but comes back with one eigenvalue of −1e-12. What does Mercer's theorem say about the true object, and what should a practitioner do about the numerical artefact rather than concluding the kernel is invalid?",
    rubric: {
      elements: [
        {
          id: "true-object-is-fine",
          description:
            "The true kernel matrix is exactly positive semidefinite by Mercer's theorem; the negative eigenvalue is rounding error at machine-precision scale, not evidence the kernel fails the condition.",
          weight: 4,
          required: true,
          misconception: {
            id: "distrusts-a-provably-valid-kernel",
            description: "Concludes a kernel is invalid from a numerically negative eigenvalue at machine-precision scale, rather than recognising floating-point rounding.",
            blameConceptId: "mercers-theorem",
          },
        },
        {
          id: "clip-or-jitter",
          description: "The standard fix is to clip tiny negative eigenvalues to zero, or add a small positive multiple of the identity ('jitter') before use, rather than discarding the kernel.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["mercers-theorem", "positive-definite-matrices"],
    source: ML_05,
    status: "live",
  },

  // --- Radial Basis Function (added: doubling sweep) ------------------------
  {
    id: "rbf--recall-value-range",
    conceptId: "rbf",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For any x, z, what range of values can the RBF kernel exp(−γ‖x − z‖²) take?",
    choices: [
      { id: "a", text: "(0, 1] — strictly positive, reaching 1 only at distance 0", correct: true },
      {
        id: "b",
        text: "[−1, 1]",
        correct: false,
        misconception: {
          id: "confuses-rbf-with-cosine-similarity",
          description: "Confuses the RBF kernel with cosine similarity. An exponential of a non-positive real number is always in (0, 1], never negative.",
          blameConceptId: "rbf",
        },
      },
      {
        id: "c",
        text: "[0, ∞)",
        correct: false,
        misconception: {
          id: "confuses-rbf-with-squared-distance",
          description: "Describes ‖x − z‖² itself, the quantity inside the exponential, not the kernel's own value after the exponential is applied.",
          blameConceptId: "rbf",
        },
      },
      {
        id: "d",
        text: "Exactly {0, 1}",
        correct: false,
        misconception: {
          id: "thinks-rbf-is-binary",
          description: "The RBF kernel varies continuously with distance; it is not a threshold function.",
          blameConceptId: "rbf",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["rbf"],
    source: ML_05,
    status: "live",
  },
  {
    id: "rbf--recall-name-radial",
    conceptId: "rbf",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why is exp(−γ‖x − z‖²) called a 'radial' basis function?",
    choices: [
      { id: "a", text: "Because its value depends on x and z only through the distance (radius) between them", correct: true },
      {
        id: "b",
        text: "Because it is only defined in 2D, where 'radial' makes sense",
        correct: false,
        misconception: {
          id: "thinks-radial-means-2d",
          description: "The RBF kernel is defined for vectors of any dimension; ‖x − z‖² is an ordinary Euclidean norm in ℝᵈ for any d.",
          blameConceptId: "rbf",
        },
      },
      {
        id: "c",
        text: "Because γ itself must be chosen as a radius",
        correct: false,
        misconception: {
          id: "confuses-gamma-with-a-radius",
          description: "γ is a bandwidth parameter controlling decay rate, not a literal distance.",
          blameConceptId: "rbf",
        },
      },
      {
        id: "d",
        text: "Because it decays along some directions faster than others",
        correct: false,
        misconception: {
          id: "thinks-rbf-is-anisotropic",
          description: "The standard RBF kernel is isotropic: it decays identically in every direction, which is exactly what depending only on distance means.",
          blameConceptId: "rbf",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["rbf"],
    source: ML_05,
    status: "live",
  },
  {
    id: "rbf--apply-distance-from-value",
    conceptId: "rbf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For the RBF kernel exp(−γ‖x − z‖²) with γ = 1, K(x, z) = e⁻⁴. What is ‖x − z‖²?",
    answerKey: 4,
    tolerance: 0.01,
    difficulty: -0.1,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["rbf"],
    source: ML_05,
    status: "live",
  },
  {
    id: "rbf--apply-sigma-to-gamma-conversion",
    conceptId: "rbf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Convert σ = 2 to the γ parameterisation exp(−γ‖x − z‖²), using γ = 1/(2σ²). Give three decimal places.",
    answerKey: 0.125,
    tolerance: 0.002,
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["rbf"],
    source: ML_05,
    status: "live",
  },
  {
    id: "rbf--explain-self-similarity-always-one",
    conceptId: "rbf",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why K(x, x) = 1 for every x under the RBF kernel, and why this is a stronger property than the general kernel fact that K(x, x) ≥ 0.",
    rubric: {
      elements: [
        {
          id: "distance-zero",
          description: "‖x − x‖² = 0 for every x, so exp(0) = 1 exactly, independent of where x sits in the input space.",
          weight: 4,
          required: true,
        },
        {
          id: "stronger-than-general",
          description:
            "A general kernel only guarantees K(x, x) is a non-negative squared norm, whose magnitude can vary from point to point (e.g. the polynomial kernel's K(x, x) grows with ‖x‖); the RBF kernel pins every self-similarity to exactly 1, which is what lets 1 − K(x, z) serve directly as a normalised dissimilarity.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["rbf", "kernel"],
    source: ML_05,
    status: "live",
  },
  {
    id: "rbf--explain-why-helps-with-nonseparable-data",
    conceptId: "rbf",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "The RBF kernel is often reached for specifically when data is not linearly separable in the input space. Explain the property of its feature space that makes this plausible, beyond simply being high-dimensional.",
    rubric: {
      elements: [
        {
          id: "locality-not-just-dimension",
          description:
            "The RBF's implicit feature map places points that are close in input space close in feature space and points that are far apart nearly orthogonal, so points sharing a class tend to cluster together in feature space in a way sheer dimensionality does not guarantee.",
          weight: 4,
          required: true,
        },
        {
          id: "not-a-guarantee",
          description: "Notes this tends to help rather than guarantees separability — it does not resolve classes that are locally interleaved for every choice of bandwidth.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["rbf", "kernel"],
    source: ML_05,
    status: "live",
  },
  {
    id: "rbf--transfer-relationship-to-knn",
    conceptId: "rbf",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "As γ → ∞, RBF-based prediction behaves like 1-nearest-neighbour classification, and as γ → 0 it behaves like predicting the majority class regardless of input. Explain the mechanism linking γ to this spectrum.",
    rubric: {
      elements: [
        {
          id: "gamma-large-mechanism",
          description:
            "At large γ, K(x, z) is essentially 0 for every training point except the nearest one, so the prediction is dominated entirely by that single closest neighbour — exactly 1-NN's rule.",
          weight: 4,
          required: true,
        },
        {
          id: "gamma-small-mechanism",
          description:
            "At small γ every K(x, z) is close to 1 regardless of distance, so every training point contributes almost equally and the prediction collapses to an average over the whole training set, ignoring x's location.",
          weight: 4,
          required: true,
        },
        {
          id: "same-tradeoff-as-k",
          description: "Bonus: identifies this as the same bias–variance spectrum k controls in k-NN, run through a continuous knob instead of a discrete one.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["rbf", "kernel"],
    source: ML_05,
    status: "live",
  },
  {
    id: "rbf--transfer-anisotropic-generalisation",
    conceptId: "rbf",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A dataset has one feature that is far more informative than the rest. Explain why replacing the single γ with a separate γⱼ per feature, exp(−Σⱼ γⱼ(xⱼ − zⱼ)²), could help, and what it costs to tune.",
    rubric: {
      elements: [
        {
          id: "per-feature-bandwidth",
          description:
            "A per-feature γⱼ lets the kernel shrink the distance contribution of uninformative features (small γⱼ) while keeping the informative feature's differences influential (large γⱼ), rather than forcing one bandwidth to serve every feature at once.",
          weight: 4,
          required: true,
          misconception: {
            id: "single-gamma-always-enough",
            description: "Assumes one shared γ is without loss of generality once features are standardised, missing that informativeness — not just scale — can differ across features.",
            blameConceptId: "rbf",
          },
        },
        {
          id: "cost",
          description: "The cost is a parameter per feature instead of one, so grid search becomes exponential in the number of features and gradient-based or Bayesian tuning is needed instead.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["rbf", "kernel"],
    source: ML_05,
    status: "live",
  },

];
