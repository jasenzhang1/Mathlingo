import type { WikiArticle } from "../types";

export const steinShrinkageWiki: WikiArticle = {
  conceptId: "stein-shrinkage",

  summary:
    "Least squares is unbiased and, among unbiased linear estimators, best. It is also inadmissible: in " +
    "three or more dimensions there is an estimator with smaller total mean squared error for every " +
    "possible β. Stein's discovery is that shrinking all coefficients toward a common point by a data-" +
    "dependent amount always helps on average. The non-negative garrote applies the same idea one " +
    "coefficient at a time, shrinking some and zeroing others.",

  sections: [
    {
      heading: "The James–Stein estimator",
      blocks: [
        {
          kind: "prose",
          text:
            "Work in canonical form: rotate so that the estimates z = (z₁, …, z_p) are independent N(θⱼ, σ²) — " +
            "an orthonormal design. Least squares estimates θ by z itself, with total MSE pσ².",
        },
        {
          kind: "formula",
          latex: "θ̂_{JS} = \\left(1 − \\frac{(p − 2)σ²}{‖z‖²}\\right) z",
        },
        {
          kind: "formula",
          latex: "E‖θ̂_{JS} − θ‖² = pσ² − (p − 2)²σ⁴ \\, E\\left(\\frac{1}{‖z‖²}\\right) < pσ²   \\text{for all θ, when } p ≥ 3",
        },
        {
          kind: "prose",
          text:
            "The improvement is largest when θ is near the shrinkage target (here 0) and vanishes as ‖θ‖ → ∞, " +
            "but it is never negative. The positive-part version, which replaces a negative shrinkage factor " +
            "by 0, is better still. In a regression with non-orthogonal X, the same shrinkage is applied in the " +
            "metric of XᵀX, and σ² is replaced by s².",
        },
        {
          kind: "example",
          title: "Computing the shrinkage factor",
          problem: "p = 6 estimates with σ² = 1 have ‖z‖² = 20. What factor multiplies each estimate?",
          steps: ["1 − (6 − 2)(1)/20 = 1 − 4/20 = 0.8."],
          answer: "Every estimate is shrunk by 20% toward zero.",
        },
      ],
    },

    {
      heading: "Why it is paradoxical, and why it is not",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Borrowing strength",
          text:
            "Shrinking the estimate of θ₁ by an amount that depends on z₂, …, z_p looks absurd when the " +
            "coordinates are unrelated. The resolution is that the guarantee is about total squared error: " +
            "‖z‖² is systematically larger than ‖θ‖² (by pσ² on average), so pulling the whole vector in " +
            "reduces the sum of errors even though any single coordinate may be made worse. The Bayesian " +
            "reading is empirical Bayes: the data estimate how spread out the θⱼ are, and shrink accordingly.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Admissibility is not about individual coefficients",
          text:
            "If one coefficient matters more than the others, total MSE is the wrong loss, and James–Stein " +
            "may do worse for it. Shrinkage is a tool for many parameters estimated together, not a free lunch " +
            "for each.",
        },
      ],
    },

    {
      heading: "The non-negative garrote",
      blocks: [
        {
          kind: "formula",
          latex: "\\min_c Σᵢ \\left(yᵢ − Σⱼ cⱼ β̂ⱼ x_{ij}\\right)²  \\text{ subject to } cⱼ ≥ 0,\\; Σⱼ cⱼ ≤ s",
        },
        {
          kind: "prose",
          text:
            "Breiman's garrote starts from the least-squares estimates and shrinks each by its own factor cⱼ, " +
            "with a total budget s. Small budgets force some cⱼ to exactly zero, so it selects variables as " +
            "well as shrinking them — the direct ancestor of the lasso. In an orthonormal design the solution is " +
            "cⱼ = (1 − λ/β̂ⱼ²)₊: large coefficients are shrunk little, small ones are killed.",
        },
        {
          kind: "table",
          headers: ["Method", "Shrinks", "Selects", "Depends on least squares first?"],
          rows: [
            ["James–Stein", "All coefficients by one common factor", "No", "Yes"],
            ["Ridge", "Smoothly, most in weak directions", "No", "No"],
            ["Garrote", "Each coefficient by its own factor", "Yes", "Yes"],
            ["Lasso", "By soft-thresholding", "Yes", "No"],
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§12.5.1, Stein Shrinkage" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§12.5.3, Garrote and Lasso Estimates" },
  ],
};
