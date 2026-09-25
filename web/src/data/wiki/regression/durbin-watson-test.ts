import type { WikiArticle } from "../types";

export const durbinWatsonTestWiki: WikiArticle = {
  conceptId: "durbin-watson-test",

  summary:
    "When observations are taken in time order, successive errors are often correlated — yesterday's " +
    "unexplained shock lingers into today. OLS stays unbiased, but its standard errors are wrong, usually " +
    "too small. The Durbin–Watson statistic checks the residuals of an ordered fit for first-order " +
    "autocorrelation, and generalised least squares with an AR(1) covariance is the standard remedy.",

  sections: [
    {
      heading: "The statistic",
      blocks: [
        {
          kind: "formula",
          latex: "d = \\frac{Σ_{t=2}^{n}(eₜ − eₜ₋₁)²}{Σ_{t=1}^{n} eₜ²} ≈ 2(1 − ρ̂)",
          caption: "ρ̂ is the lag-1 autocorrelation of the residuals.",
        },
        {
          kind: "table",
          headers: ["d", "Suggests"],
          rows: [
            ["near 2", "No first-order autocorrelation"],
            ["well below 2 (toward 0)", "Positive autocorrelation — residuals run in streaks"],
            ["well above 2 (toward 4)", "Negative autocorrelation — residuals alternate in sign"],
          ],
        },
      ],
    },

    {
      heading: "The bounds test",
      blocks: [
        {
          kind: "prose",
          text:
            "The null distribution of d depends on X, so Durbin and Watson tabulated bounds d_L and d_U that " +
            "hold for every design with n observations and p columns. For testing positive autocorrelation: " +
            "reject if d < d_L, do not reject if d > d_U, and the test is inconclusive in between. Modern " +
            "software computes the exact p-value for the actual X instead.",
        },
        {
          kind: "example",
          title: "Reading d",
          problem:
            "A time-ordered regression has residual lag-1 autocorrelation ρ̂ = 0.6. Approximate d, and decide given d_L = 1.20 and d_U = 1.41.",
          steps: ["d ≈ 2(1 − 0.6) = 0.8.", "0.8 < d_L = 1.20, so reject: there is positive autocorrelation."],
          answer: "d ≈ 0.8: strong evidence of positive first-order autocorrelation.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Not valid with a lagged response as a predictor",
          text:
            "If yₜ₋₁ is one of the predictors, d is biased toward 2 and the test loses its power. Durbin's h " +
            "or a Breusch–Godfrey test are used instead.",
        },
      ],
    },

    {
      heading: "What autocorrelation does, and remedies",
      blocks: [
        {
          kind: "prose",
          text:
            "With AR(1) errors εₜ = ρεₜ₋₁ + aₜ and a smoothly varying regressor, the true variance of the OLS " +
            "slope exceeds σ²(XᵀX)⁻¹ by a factor of roughly (1 + ρ)/(1 − ρ) — 4 for ρ = 0.6 — so reported " +
            "standard errors can be half their true size. The residual pattern can also be a symptom of a " +
            "missing time-varying predictor or wrong functional form, which should be checked first.",
        },
        {
          kind: "list",
          items: [
            "GLS with AR(1) covariance: regress yₜ − ρyₜ₋₁ on xₜ − ρxₜ₋₁ (and treat the first observation specially).",
            "Feasible GLS (Cochrane–Orcutt, Prais–Winsten): estimate ρ from residuals, transform, refit, iterate.",
            "Keep OLS estimates but use autocorrelation-consistent (Newey–West) standard errors.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.4.4, Serial Correlation and the Durbin–Watson Test" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.10, Generalized Least Squares" },
  ],
};
