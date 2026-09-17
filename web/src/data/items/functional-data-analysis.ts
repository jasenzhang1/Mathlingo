import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Seed bank for `hilbert-space` and `functional-data-analysis`, the two new
 * concepts anchoring the "Functional Data Analysis" cluster in `graphical-models`.
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-fda",
  tier: "generated",
  title: "Mathlingo authored item (functional data analysis)",
};

export const functionalDataAnalysisItems: Item[] = [
  // --- hilbert-space ---
  {
    id: "hilbert-space--recall-three-ingredients",
    conceptId: "hilbert-space",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What three ingredients make a vector space a Hilbert space?",
    rubric: {
      elements: [
        { id: "vector-space", description: "Names being a vector space (closed under addition and scaling).", weight: 2 },
        { id: "inner-product", description: "Names having an inner product, which induces a norm and a notion of angle.", weight: 3, required: true },
        { id: "complete", description: "Names completeness: every Cauchy sequence converges to a point inside the space.", weight: 3, required: true },
      ],
    },
    difficulty: -0.1,
    discrimination: 1.2,
    expectedSeconds: 65,
    prereqClosure: ["hilbert-space"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hilbert-space--explain-incompleteness-example",
    conceptId: "hilbert-space",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Why is ℚ (the rationals) with the usual absolute-value norm not a Hilbert space, even though ℝⁿ is?",
    choices: [
      { id: "a", text: "ℚ isn't complete — a Cauchy sequence of rationals (e.g. decimal truncations of √2) can converge to a limit outside ℚ", correct: true },
      {
        id: "b",
        text: "ℚ has no inner product defined on it",
        correct: false,
        misconception: {
          id: "hilbert-space-inner-product-confusion",
          description: "ℚ inherits the same inner product (ordinary multiplication) as ℝ — what it lacks is completeness, not an inner product.",
          blameConceptId: "hilbert-space",
        },
      },
      {
        id: "c",
        text: "ℚ is not a vector space, since it isn't closed under multiplication by irrational scalars",
        correct: false,
        misconception: {
          id: "hilbert-space-scalar-field-confusion",
          description: "As a vector space over ℚ itself (scalars restricted to ℚ), it is closed under scaling — the actual obstruction is completeness, not the vector-space axioms.",
          blameConceptId: "hilbert-space",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.3,
    expectedSeconds: 85,
    prereqClosure: ["hilbert-space"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "hilbert-space--transfer-function-inner-product",
    conceptId: "hilbert-space",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "For L²[a, b], the space of square-integrable functions on [a, b], write the inner product of two functions f and g, and identify what plays the role of ℝⁿ's dot product Σᵢxᵢyᵢ.",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "Writes ⟨f, g⟩ = ∫ₐᵇ f(t)g(t) dt, identifying the integral as the function-space analogue of the finite sum in the ordinary dot product.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["hilbert-space", "dot-product"],
    source: AUTHORED,
    status: "live",
  },

  // --- functional-data-analysis ---
  {
    id: "fda--recall-core-move",
    conceptId: "functional-data-analysis",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is the core move that lets functional data analysis apply ordinary multivariate tools (distances, means, PCA) to data that is really a curve?",
    rubric: {
      elements: [
        {
          id: "move",
          description: "States that each curve is treated as a single point in a Hilbert space of functions, so 'vector' operations (distances, means, PCA) carry over with 'coordinate' reinterpreted as 'value of the function.'",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["functional-data-analysis", "hilbert-space"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "fda--explain-why-not-discretize",
    conceptId: "functional-data-analysis",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Why does treating a densely-sampled curve as an ordinary p-dimensional feature vector (one feature per time point) lose something a functional treatment keeps?",
    choices: [
      { id: "a", text: "It discards the smoothness and strong correlation between adjacent time points, which a functional (curve-based) treatment preserves", correct: true },
      {
        id: "b",
        text: "It uses too few features to represent the curve accurately",
        correct: false,
        misconception: {
          id: "fda-feature-count-confusion",
          description: "The problem with the discretized approach isn't too few features — dense sampling can use hundreds — it's that treating those features as unstructured and exchangeable throws away the ordering and smoothness that make them a curve in the first place.",
          blameConceptId: "functional-data-analysis",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.2,
    expectedSeconds: 85,
    prereqClosure: ["functional-data-analysis"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "fda--transfer-two-tools",
    conceptId: "functional-data-analysis",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Name the two Hilbert-space-based tools functional data analysis draws on, and in one sentence each, what different job each one does.",
    rubric: {
      elements: [
        {
          id: "kl-pca",
          description: "Names functional PCA / the Karhunen-Loève expansion as summarizing the *covariance* of the random functions themselves, finding an orthogonal basis ordered by variance explained.",
          weight: 3,
          required: true,
        },
        {
          id: "rkhs",
          description: "Names RKHS-based kernel methods as concerning a *kernel chosen by the modeler* to make function evaluation well-behaved for regression or classification, a different (though related) use of the same Hilbert-space machinery.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["functional-data-analysis", "hilbert-space"],
    source: AUTHORED,
    status: "live",
  },
];
