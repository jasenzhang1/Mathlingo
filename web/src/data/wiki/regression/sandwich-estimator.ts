import type { WikiArticle } from "../types";

export const sandwichEstimatorWiki: WikiArticle = {
  conceptId: "sandwich-estimator",
  summary:
    "The sandwich estimator gets OLS standard errors right under heteroskedasticity without ever " +
    "specifying *how* the variance depends on x — the opposite trade from `weighted-least-squares`, " +
    "which needs that form to gain efficiency. It leaves the point estimate β̂ untouched and only fixes " +
    "its covariance, which is why it's the default 'robust standard errors' option in every regression " +
    "package.",
  sections: [
    {
      heading: "Where the usual formula breaks",
      blocks: [
        {
          kind: "prose",
          text: "The textbook OLS covariance, σ²(XᵀX)⁻¹, is only valid under `homoskedasticity` — it comes from Var(β̂) = (XᵀX)⁻¹Xᵀ Var(ε) X(XᵀX)⁻¹ collapsing when Var(ε) = σ²I. β̂ itself stays unbiased and consistent under heteroskedasticity (OLS never assumed constant variance to get that far) — only the *sampling variance formula* used to build standard errors and confidence intervals is wrong.",
        },
      ],
    },
    {
      heading: "The sandwich",
      blocks: [
        {
          kind: "formula",
          latex: "\\widehat{\\operatorname{Var}}(\\hat\\beta) = \\underbrace{(X^\\top X)^{-1}}_{\\text{bread}} \\; \\underbrace{X^\\top \\hat\\Omega X}_{\\text{meat}} \\; \\underbrace{(X^\\top X)^{-1}}_{\\text{bread}}",
          caption: "Ω̂ = diag(ê₁², …, êₙ²), the squared OLS residuals — White's (1980) heteroskedasticity-consistent (HC) estimator",
        },
        {
          kind: "prose",
          text: "Two identical 'bread' layers — (XᵀX)⁻¹, the same term the classical formula uses — sandwich a 'meat' layer built from the *actual* squared residuals instead of an assumed constant σ². No functional form for how variance changes with x is ever specified; the data supplies it directly, residual by residual.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Consistent, not necessarily efficient",
          text: "The sandwich estimator is consistent for Var(β̂) under any (finite-variance) error structure, known or not. What it doesn't do is improve β̂'s efficiency the way WLS does when the true variance function actually is known — a well-specified WLS model still has smaller standard errors. The sandwich is insurance against getting the variance function wrong, not a substitute for getting it right when you can.",
        },
      ],
    },
    {
      heading: "In practice",
      blocks: [
        {
          kind: "list",
          items: [
            "Several small-sample corrections exist (HC0 through HC3); HC3 down-weights high-leverage points and is the safer default in small samples.",
            "The same bread-meat-bread construction generalizes to clustered data (grouping the meat by cluster instead of by observation) and is exactly the covariance estimator `generalized-estimating-equations` uses to stay valid even when its working correlation structure is wrong.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Why the correction matters",
          problem:
            "A regression of spending on income has classical (homoskedastic) SE(β̂) = 0.05, but spending variance clearly grows with income (a textbook heteroskedasticity pattern). Is the classical 95% CI for β̂ too narrow, too wide, or still correct?",
          steps: [
            "Growing variance at higher x means large residuals cluster where x is large — exactly the points OLS already weights most heavily via leverage.",
            "The classical formula assumes those large-x residuals have the same variance as everywhere else, understating how much they actually drive the estimate's spread.",
            "The sandwich's meat term XᵀΩ̂X picks up the true (larger) residual variance at high x directly from the data.",
          ],
          answer: "The classical SE is too narrow (this is the typical direction, though not a universal guarantee) — the 95% CI is falsely tight, and a sandwich/robust SE should be used instead.",
        },
      ],
    },
  ],
  references: [
    { source: "White (1980), A Heteroskedasticity-Consistent Covariance Matrix Estimator", locator: "Econometrica 48(4)" },
    { source: "Wooldridge, Introductory Econometrics", locator: "Ch. 8" },
  ],
};
