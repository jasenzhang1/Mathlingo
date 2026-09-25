import type { WikiArticle } from "../types";

export const collinearityEigenanalysisWiki: WikiArticle = {
  conceptId: "collinearity-eigenanalysis",

  summary:
    "VIFs say which coefficients are inflated; the eigenstructure of the scaled XᵀX says why. Each small " +
    "eigenvalue is a near-dependency among the predictors, its eigenvector names the variables involved, " +
    "and the variance of every coefficient is a sum of contributions 1/λ from each dependency. Condition " +
    "indices and variance-decomposition proportions turn that into a diagnostic that can separate two " +
    "independent collinearities — something a list of VIFs cannot do.",

  sections: [
    {
      heading: "Variances in terms of eigenvalues",
      blocks: [
        {
          kind: "prose",
          text:
            "Centre and scale the predictors so that ZᵀZ = R, the correlation matrix, and write R = VΛVᵀ " +
            "with eigenvalues λ₁ ≥ ⋯ ≥ λₖ > 0 and eigenvectors vₖ (the columns of V).",
        },
        {
          kind: "formula",
          latex: "Var(γ̂ⱼ) = σ² (R⁻¹)ⱼⱼ = σ² Σₖ \\frac{v_{jk}²}{λₖ},   VIFⱼ = Σₖ \\frac{v_{jk}²}{λₖ}",
        },
        {
          kind: "formula",
          latex: "Σⱼ VIFⱼ = tr(R⁻¹) = Σₖ \\frac{1}{λₖ}",
          caption: "The total variance of the scaled coefficients is the sum of reciprocal eigenvalues.",
        },
        {
          kind: "prose",
          text:
            "A near-zero λₖ means Zvₖ ≈ 0: the combination of predictors with weights vₖ is almost constant " +
            "across the data. Every coefficient with a large weight vⱼₖ in that eigenvector inherits a huge " +
            "variance term v²ⱼₖ/λₖ.",
        },
      ],
    },

    {
      heading: "Condition indices and variance decomposition",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Condition index ηₖ = √(λ₁/λₖ)",
              description: "One per eigenvalue. Values above about 30 (Belsley) signal a dependency strong enough to degrade estimates; the largest is the condition number.",
            },
            {
              term: "Variance-decomposition proportion πⱼₖ = (v²ⱼₖ/λₖ)/VIFⱼ",
              description: "The share of coefficient j's variance coming from dependency k. Two or more coefficients with large proportions (say > 0.5) on the same high-index dependency are the variables involved in it.",
            },
          ],
        },
        {
          kind: "example",
          title: "Two predictors",
          problem:
            "Two standardised predictors have correlation r = 0.98. Find the eigenvalues of R, the condition " +
            "number, and the VIF.",
          steps: [
            "Eigenvalues of [[1, r], [r, 1]] are 1 + r = 1.98 and 1 − r = 0.02.",
            "Condition number √(1.98/0.02) = √99 ≈ 9.95.",
            "VIF = 1/(1 − r²) = 1/0.0396 ≈ 25.3 for each coefficient.",
          ],
          answer: "Eigenvalues 1.98 and 0.02; condition number ≈ 9.95; VIF ≈ 25.3.",
        },
      ],
    },

    {
      heading: "Collinearity and prediction",
      blocks: [
        {
          kind: "prose",
          text:
            "Collinearity inflates the variance of β̂ in the weak directions vₖ, but a prediction x₀ᵀβ̂ at a " +
            "point x₀ that follows the same pattern as the data has almost no component along those directions. " +
            "So predictions inside the data's pattern are precise even when individual coefficients are " +
            "wildly uncertain; predictions at an x₀ that breaks the pattern — extrapolation off the data's " +
            "low-dimensional shape — are not.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Perturbation view",
          text:
            "Seber & Lee's §9.7.4 makes the same point from numerical analysis: small relative changes in X or " +
            "y can change β̂ by up to the condition number times as much. Collinearity is sensitivity, and the " +
            "condition number is its amplification factor.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Include the intercept when diagnosing",
          text:
            "Diagnostics on centred data cannot see a dependency between a predictor and the constant. " +
            "Belsley's recommendation is to scale — but not centre — the columns including the intercept " +
            "when the intercept itself matters.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§9.7, Collinearity (variances, VIFs, eigenvalues, perturbation theory, prediction)" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.7.1–10.7.2, Diagnosing Collinearity" },
  ],
};
