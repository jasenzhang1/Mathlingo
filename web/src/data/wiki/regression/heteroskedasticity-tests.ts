import type { WikiArticle } from "../types";

export const heteroskedasticityTestsWiki: WikiArticle = {
  conceptId: "heteroskedasticity-tests",

  summary:
    "Non-constant error variance is usually spotted first in a plot — residuals fanning out as the fitted " +
    "values grow — and confirmed with a score test that regresses squared residuals on candidate variables. " +
    "Once detected, it can be modelled: estimate how the variance depends on the mean or on x, and either " +
    "weight by the inverse of that variance function or transform y so the variance becomes constant.",

  sections: [
    {
      heading: "Looking",
      blocks: [
        {
          kind: "list",
          items: [
            "Plot studentized residuals against fitted values: a funnel (spread growing with ŷ) is the classic signature.",
            "Plot them against each predictor and against time or order, which can reveal variance tied to a specific variable.",
            "Plot |rᵢ| or rᵢ² against ŷ with a smoother; a rising trend is easier to see than a funnel.",
          ],
        },
      ],
    },

    {
      heading: "The Breusch–Pagan / Cook–Weisberg score test",
      blocks: [
        {
          kind: "formula",
          latex: "Var(εᵢ) = σ² h(zᵢᵀθ),   H₀: θ = 0",
          caption: "z holds q candidate variables — often the predictors, or ŷ alone.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Fit the model by OLS and compute uᵢ = eᵢ²/σ̂², with σ̂² = RSS/n.",
            "Regress u on an intercept and z.",
            "Score statistic: half the regression sum of squares of that auxiliary regression, referred to χ²_q.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The original version assumes normal errors",
          text:
            "Half the regression SS is χ²_q only under normality. Koenker's studentized version, n·R² from the " +
            "regression of eᵢ² on z, is robust to non-normal errors and is what most software now reports.",
        },
        {
          kind: "example",
          title: "Computing the robust version",
          problem: "The auxiliary regression of eᵢ² on two predictors, with n = 80, has R² = 0.09. Compute Koenker's statistic.",
          steps: ["n·R² = 80 × 0.09 = 7.2.", "Compare with χ²₂: the 5% point is 5.99."],
          answer: "7.2 > 5.99, so reject constant variance at 5%.",
        },
      ],
    },

    {
      heading: "Estimating a variance function",
      blocks: [
        {
          kind: "prose",
          text:
            "A common parametric form is Var(εᵢ) = σ²μᵢ^{2θ}: θ = 0 is constant variance, θ = ½ Poisson-like, " +
            "θ = 1 constant coefficient of variation. Regressing log|eᵢ| on log ŷᵢ gives a slope estimating θ. " +
            "With the variance function estimated, weighted least squares with wᵢ = 1/ŷᵢ^{2θ̂} restores " +
            "efficiency (Seber & Lee §10.4.2).",
        },
        {
          kind: "table",
          headers: ["Variance proportional to", "Variance-stabilising transformation"],
          rows: [["μ", "√y"], ["μ²", "log y"], ["μ⁴", "1/y"], ["μ(1 − μ), for proportions", "arcsin √y"]],
          caption: "If Var(y) ∝ μ^{2θ}, the power y^{1−θ} (log when θ = 1) roughly stabilises the variance.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Weighting keeps the mean model; transforming changes it",
          text:
            "Transforming y fixes the variance but also changes the shape of the mean relationship, which may " +
            "or may not be welcome. Weighting leaves the mean model alone. When the mean model is right on the " +
            "original scale, weight; when both variance and mean are nonlinear, a transformation may fix both.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.4.1, Detecting Nonconstant Variance" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.4.2–10.4.3, Estimating Variance Functions; Transforming to Equalize Variances" },
  ],
};
