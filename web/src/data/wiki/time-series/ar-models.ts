import type { WikiArticle } from "../types";

export const arModelsWiki: WikiArticle = {
  conceptId: "ar-models",

  summary:
    "An autoregressive model of order p, AR(p), predicts Xₜ as a linear combination of its own last p " +
    "values plus fresh noise. It is regression with the predictors and the response drawn from the " +
    "same series at different times, and the entire theory of when it behaves — stationarity, decaying " +
    "ACF, an explosive random walk as the boundary case — comes from one question: do repeated " +
    "applications of the AR recursion shrink a disturbance back toward zero, or blow it up?",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "Xₜ = c + φ₁Xₜ₋₁ + φ₂Xₜ₋₂ + ⋯ + φₚXₜ₋ₚ + εₜ,   εₜ ~ WN(0, σ²)",
          caption: "AR(p): today's value as a weighted sum of the last p values, plus a fresh shock.",
        },
        {
          kind: "prose",
          text:
            "εₜ is assumed uncorrelated with Xₜ₋₁, Xₜ₋₂, … — the shock at time t is genuinely new " +
            "information, not something already implicit in the past. This is what makes it a well-" +
            "posed forecasting model: everything predictable about Xₜ from its own history is captured " +
            "by the φ terms, and εₜ is exactly the part that is not.",
        },
      ],
    },

    {
      heading: "AR(1): the case worth understanding completely",
      blocks: [
        {
          kind: "formula",
          latex: "Xₜ = c + φXₜ₋₁ + εₜ",
          caption: "The simplest nontrivial case — and the same recursion an eigenvalue argument was applied to for Markov chains.",
        },
        {
          kind: "table",
          headers: ["φ", "Behaviour"],
          rows: [
            ["|φ| < 1", "Stationary — shocks decay geometrically; the process has a well-defined constant mean and variance"],
            ["φ = 1", "Random walk — non-stationary; variance grows linearly with t, shocks never decay (a unit root)"],
            ["|φ| > 1", "Explosive — deviations from the mean grow without bound"],
            ["φ < 0", "Stationary if |φ| < 1, but oscillates in sign lag to lag"],
          ],
        },
        {
          kind: "formula",
          latex: "E[Xₜ] = c/(1 − φ),   Var(Xₜ) = σ²/(1 − φ²),   ρ(h) = φ^h",
          caption: "Under |φ| < 1: constant mean and variance (stationary), and ACF that decays geometrically at rate φ.",
        },
        {
          kind: "prose",
          text:
            "Unrolling the recursion makes the |φ| < 1 condition transparent: Xₜ = c/(1−φ) + " +
            "Σⱼ₌₀^∞ φʲεₜ₋ⱼ (a moving average of infinite length — the Wold representation of AR(1)). " +
            "Each old shock's weight is φʲ, which vanishes as j grows only when |φ| < 1. That is the " +
            "same 'does a repeated multiplier shrink to zero' question that governed the Markov chain's " +
            "mixing rate through |λ₂| < 1, and it is no accident that both conditions have the same " +
            "shape.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "ACF decays geometrically at exactly rate φ",
          text:
            "ρ(h) = φʰ is not an approximation — it is exact for AR(1), and it is the cleanest instance " +
            "of the 'ACF tails off' row in the ACF/PACF identification table. A steeper decay (φ close " +
            "to 0) means short memory; a slow decay (φ close to 1) means long memory and a process that " +
            "is getting close to the non-stationary boundary.",
        },
      ],
    },

    {
      heading: "AR(p): stationarity via the characteristic equation",
      blocks: [
        {
          kind: "formula",
          latex: "1 − φ₁z − φ₂z² − ⋯ − φₚzᵖ = 0",
          caption: "The characteristic equation of AR(p). The process is stationary iff every root z lies outside the unit circle (|z| > 1).",
        },
        {
          kind: "prose",
          text:
            "For AR(1) this equation is 1 − φz = 0, with root z = 1/φ — stationary exactly when |1/φ| " +
            "> 1, i.e. |φ| < 1, matching the table above. For general p the condition is the same " +
            "statement about all p roots at once, and it is the AR analogue of requiring every " +
            "eigenvalue of a linear system to sit inside the unit circle for stability.",
        },
        {
          kind: "example",
          title: "Checking stationarity of an AR(2)",
          problem: "Xₜ = 0.5Xₜ₋₁ + 0.2Xₜ₋₂ + εₜ. Is this process stationary?",
          steps: [
            "Characteristic equation: 1 − 0.5z − 0.2z² = 0.",
            "Multiply by −5: z² + 2.5z − 5 = 0.",
            "z = [−2.5 ± √(6.25 + 20)]/2 = [−2.5 ± √26.25]/2 ≈ [−2.5 ± 5.12]/2.",
            "Roots ≈ 1.31 and ≈ −3.81, both with |z| > 1.",
          ],
          answer: "Both roots lie outside the unit circle, so the process is stationary.",
        },
      ],
    },

    {
      heading: "Fitting and forecasting",
      blocks: [
        {
          kind: "list",
          items: [
            "Order p is typically read off a PACF plot (its clean cutoff at lag p) and confirmed against AIC/BIC across candidate orders.",
            "Given p, the φ coefficients are estimated by ordinary least squares (the Yule–Walker equations give an equivalent, moment-based estimator) — this is literally a regression of Xₜ on its own p lags.",
            "The h-step-ahead forecast is computed by iterating the fitted recursion forward, replacing unknown future εₜ with its expectation, zero.",
            "Forecast uncertainty compounds with horizon: variance of the h-step forecast error grows with h and approaches the unconditional variance σ²/(1−φ²) as h → ∞ for AR(1) — the forecast 'forgets' the starting point.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Fitting AR by OLS on trending data silently biases φ̂ toward 1",
          text:
            "If the series is not actually stationary, the least-squares estimate of φ is biased upward " +
            "and can sit near or above 1 even when the truth is less persistent — differencing first " +
            "(ARIMA) is the standard fix, not a larger sample.",
        },
      ],
    },
  ],

  references: [
    { source: "Hamilton, Time Series Analysis", locator: "Ch. 3, Stationary ARMA Processes" },
    { source: "Shumway & Stoffer, Time Series Analysis and Its Applications", locator: "§3.3, Autoregressive Models" },
    { source: "Box, Jenkins, Reinsel & Ljung, Time Series Analysis: Forecasting and Control", locator: "Ch. 3, Linear Stationary Models" },
  ],
};
