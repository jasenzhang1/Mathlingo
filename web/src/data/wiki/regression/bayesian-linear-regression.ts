import type { WikiArticle } from "../types";

export const bayesianLinearRegressionWiki: WikiArticle = {
  conceptId: "bayesian-linear-regression",

  summary:
    "Put a prior on β and σ², combine it with the normal likelihood, and the posterior for β is again " +
    "normal (given σ²) with a mean that is a precision-weighted average of the prior mean and the least-" +
    "squares estimate. The conjugate normal–inverse-gamma family makes every step closed-form. Two " +
    "limits frame it: a flat prior gives back least squares, and a zero-centred prior with spherical " +
    "covariance gives back ridge regression.",

  sections: [
    {
      heading: "The conjugate model",
      blocks: [
        {
          kind: "formula",
          latex: "y | β, σ² ~ Nₙ(Xβ, σ²I),   β | σ² ~ N_p(m, σ²V),   σ² ~ Inverse-Gamma(a, b)",
        },
        {
          kind: "formula",
          latex: "β | y, σ² ~ N_p(m*, σ²V*),   V* = (V⁻¹ + XᵀX)⁻¹,   m* = V*(V⁻¹m + Xᵀy)",
          caption: "Precisions add; the posterior mean weights prior and data by their precisions.",
        },
        {
          kind: "prose",
          text:
            "Writing Xᵀy = XᵀXβ̂ shows the posterior mean is a matrix-weighted average: m* = V*(V⁻¹m + XᵀXβ̂). " +
            "Where the data are informative (large XᵀX in some direction) m* follows β̂; where they are weak " +
            "it stays near the prior mean m. The marginal posterior of β, integrating out σ², is a " +
            "multivariate t.",
        },
      ],
    },

    {
      heading: "Two limits worth knowing",
      blocks: [
        {
          kind: "table",
          headers: ["Prior", "Posterior mean", "Frequentist twin"],
          rows: [
            ["V⁻¹ → 0 (flat prior on β)", "β̂ = (XᵀX)⁻¹Xᵀy", "Ordinary least squares"],
            ["m = 0, V = (1/k)I", "(XᵀX + kI)⁻¹Xᵀy", "Ridge regression with penalty k"],
            ["m = 0, V = g(XᵀX)⁻¹ (Zellner's g-prior)", "g/(1 + g) · β̂", "Uniform shrinkage of β̂ toward 0"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A penalty is a prior",
          text:
            "Ridge's penalty k‖β‖² is −2σ² times the log of an N(0, (σ²/k)I) prior, so the ridge estimate " +
            "is a posterior mode. The Bayesian reading explains the one thing the penalty view leaves " +
            "arbitrary: k is the ratio of noise variance to prior variance, i.e. how strongly you believed " +
            "the coefficients were small before seeing the data.",
        },
      ],
    },

    {
      heading: "A one-parameter example",
      blocks: [
        {
          kind: "example",
          title: "Shrinking a slope toward a prior guess",
          problem:
            "Regression through the origin with Σxᵢ² = 36 and Σxᵢyᵢ = 72, so the least-squares slope is 2. " +
            "With σ² known, the prior is β ~ N(0.5, σ²/4) (so V = 1/4). Find the posterior mean.",
          steps: [
            "Prior precision (in units of 1/σ²) is V⁻¹ = 4; data precision is Σxᵢ² = 36.",
            "m* = (4·0.5 + 72)/(4 + 36) = 74/40 = 1.85.",
            "Equivalently, a weighted average: (4·0.5 + 36·2)/40 = 1.85.",
          ],
          answer: "The posterior mean is 1.85 — 90% of the way from the prior guess to the least-squares slope.",
        },
      ],
    },

    {
      heading: "Estimating σ² and predicting",
      blocks: [
        {
          kind: "prose",
          text:
            "Under the conjugate prior the posterior for σ² is again inverse-gamma, with the shape increased " +
            "by n/2 and the scale increased by half of a residual-plus-prior-discrepancy sum of squares. " +
            "Predictions for a new x₀ come from the posterior predictive distribution — a t distribution " +
            "centred at x₀ᵀm* whose spread includes both σ² and the posterior uncertainty in β. Chapter 12 " +
            "reuses these predictive densities to compare and average whole models.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.12, Bayesian Estimation" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§12.6.1, Predictive Densities" },
  ],
};
