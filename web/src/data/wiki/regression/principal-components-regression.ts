import type { WikiArticle } from "../types";

export const principalComponentsRegressionWiki: WikiArticle = {
  conceptId: "principal-components-regression",

  summary:
    "If collinearity means some directions in predictor space carry almost no variation, one remedy is to " +
    "stop trying to estimate the response's dependence along them. Principal components regression rotates " +
    "the standardised predictors onto their principal axes, regresses y on the leading components only, and " +
    "maps the result back. The discarded near-null directions take their enormous variance with them, at " +
    "the cost of a bias if y actually depended on them.",

  sections: [
    {
      heading: "The method",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Standardise the predictors: Z with ZᵀZ = R = VΛVᵀ.",
            "Form the components W = ZV. Their columns are orthogonal, with Wₖᵀ Wₖ = λₖ.",
            "Regress y on the first m components (largest eigenvalues): α̂ₖ = Wₖᵀy/λₖ, each computed independently.",
            "Transform back: γ̂_PC = V_m α̂_m, where V_m keeps the first m eigenvectors.",
          ],
        },
        {
          kind: "formula",
          latex: "Var(γ̂_{LS}) = σ² Σ_{k=1}^{p} \\frac{vₖvₖᵀ}{λₖ},   Var(γ̂_{PC}) = σ² Σ_{k=1}^{m} \\frac{vₖvₖᵀ}{λₖ}",
          caption: "PCR drops exactly the terms with the smallest λₖ, which dominate the least-squares variance.",
        },
      ],
    },

    {
      heading: "The bias–variance bargain",
      blocks: [
        {
          kind: "prose",
          text:
            "PCR is least squares with the restriction α_{m+1} = ⋯ = α_p = 0. If those true component " +
            "coefficients are near zero, the restriction is nearly true and the variance saving is almost free. " +
            "If the response depends on a low-variance direction, PCR throws that information away and is " +
            "biased no matter how much data you have.",
        },
        {
          kind: "example",
          title: "Variance saved by dropping one component",
          problem:
            "Three standardised predictors have eigenvalues 2.2, 0.75, and 0.05. With σ² = 1, compare the total " +
            "variance Σ Var(γ̂ⱼ) = Σ σ²/λₖ of least squares and of PCR with m = 2.",
          steps: [
            "Least squares: 1/2.2 + 1/0.75 + 1/0.05 ≈ 0.455 + 1.333 + 20 = 21.79.",
            "PCR (m = 2): 0.455 + 1.333 ≈ 1.79.",
          ],
          answer: "Dropping one component cuts total variance from about 21.8 to 1.8 — at the price of bias if α₃ ≠ 0.",
        },
      ],
    },

    {
      heading: "Caveats and relatives",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Components are chosen without looking at y",
          text:
            "The principal components rank directions by how much the predictors vary, not by how well they " +
            "predict y. Nothing prevents the smallest-variance component from being the one that matters. " +
            "Choosing m by cross-validation, or selecting components by their t-statistics, mitigates this; " +
            "partial least squares builds directions that use y from the start.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Ridge is the smooth version",
          text:
            "In the same eigen-coordinates, ridge regression multiplies each component's coefficient by " +
            "λₖ/(λₖ + k) — shrinking the weak directions heavily instead of deleting them. PCR applies a hard " +
            "0-or-1 threshold to the same ranking. Seber & Lee (§10.7.3) present both as remedies for " +
            "collinearity, along with the simplest one: collect data that break the dependency.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.7.3, Remedies for Collinearity" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§12.5.2, Ridge Regression (comparison)" },
  ],
};
