import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Seed bank for `sandwich-estimator` and `generalized-estimating-equations`,
 * added to the `regression` domain's "Extensions" cluster.
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-robust-regression",
  tier: "generated",
  title: "Mathlingo authored item (robust regression)",
};

export const robustRegressionItems: Item[] = [
  // --- sandwich-estimator ---
  {
    id: "sandwich-estimator--recall-structure",
    conceptId: "sandwich-estimator",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the 'bread' and the 'meat' of the sandwich estimator, and what goes into each.",
    rubric: {
      elements: [
        { id: "bread", description: "Identifies the bread as (XᵀX)⁻¹, the same term appearing in the classical OLS covariance formula.", weight: 3, required: true },
        { id: "meat", description: "Identifies the meat as XᵀΩ̂X, with Ω̂ built from the actual squared OLS residuals rather than an assumed constant σ².", weight: 3, required: true },
      ],
    },
    difficulty: 0,
    discrimination: 1.2,
    expectedSeconds: 65,
    prereqClosure: ["sandwich-estimator", "homoskedasticity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sandwich-estimator--explain-consistency-not-efficiency",
    conceptId: "sandwich-estimator",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "The true variance function is known and used correctly in WLS. Compared to OLS with sandwich standard errors on the same data, WLS will typically:",
    choices: [
      { id: "a", text: "Give more efficient (smaller-variance) estimates, since it correctly uses the known variance structure", correct: true },
      {
        id: "b",
        text: "Give invalid standard errors, since OLS with a sandwich estimator is always superior",
        correct: false,
        misconception: {
          id: "sandwich-always-better",
          description: "The sandwich estimator buys robustness to an unknown variance structure, not superiority over a correctly-specified WLS model — when the variance function truly is known, WLS is more efficient.",
          blameConceptId: "sandwich-estimator",
        },
      },
      {
        id: "c",
        text: "Give identical results, since both correct for heteroskedasticity",
        correct: false,
        misconception: {
          id: "sandwich-wls-equivalent",
          description: "The two methods use heteroskedasticity information in different ways — WLS reweights the point estimate itself, while the sandwich estimator leaves β̂ untouched and only fixes its standard errors — so they generally differ.",
          blameConceptId: "sandwich-estimator",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["sandwich-estimator"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sandwich-estimator--transfer-beta-unchanged",
    conceptId: "sandwich-estimator",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Does switching from classical to sandwich standard errors change the point estimate β̂ itself? Explain why or why not.",
    rubric: {
      elements: [
        { id: "unchanged", description: "States that β̂ is unchanged — the sandwich estimator only replaces the covariance formula, not the fitting procedure.", weight: 3, required: true },
        { id: "why", description: "Explains that OLS never assumed homoskedasticity to produce a consistent β̂ in the first place; only the classical variance formula (used to build standard errors) required it.", weight: 3 },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["sandwich-estimator", "ols-properties"],
    source: AUTHORED,
    status: "live",
  },

  // --- generalized-estimating-equations ---
  {
    id: "gee--recall-working-correlation",
    conceptId: "generalized-estimating-equations",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is a 'working correlation matrix' in GEE, and name two common choices.",
    rubric: {
      elements: [
        { id: "definition", description: "Defines it as a guessed structure for how observations within a cluster correlate with each other.", weight: 3, required: true },
        { id: "examples", description: "Names two of: independence, exchangeable, AR(1) (or another valid structure).", weight: 3 },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.2,
    expectedSeconds: 65,
    prereqClosure: ["generalized-estimating-equations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gee--explain-consistency-under-misspecification",
    conceptId: "generalized-estimating-equations",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "The true within-cluster correlation is AR(1), but the analyst fits GEE with an independence working correlation. What happens to β̂?",
    choices: [
      { id: "a", text: "β̂ stays consistent, though possibly less efficient than with the correct working correlation", correct: true },
      {
        id: "b",
        text: "β̂ becomes inconsistent, since the working correlation was misspecified",
        correct: false,
        misconception: {
          id: "gee-misspec-inconsistent",
          description: "GEE's whole design point is that β̂ stays consistent for any working correlation choice — misspecification costs efficiency, not consistency, because the sandwich estimator handles the standard-error side separately.",
          blameConceptId: "generalized-estimating-equations",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 85,
    prereqClosure: ["generalized-estimating-equations", "sandwich-estimator"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gee--transfer-vs-mixed-effects",
    conceptId: "generalized-estimating-equations",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "How does GEE's target of inference differ from a mixed-effects model's, for a nonlinear link like logistic?",
    rubric: {
      elements: [
        {
          id: "distinction",
          description: "Explains that GEE targets the population-average effect (the same β applies to every cluster), while a mixed-effects model targets subject-specific effects via random effects, and that for a nonlinear link these two are generally different numbers even fit to identical data.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["generalized-estimating-equations"],
    source: AUTHORED,
    status: "live",
  },
];
