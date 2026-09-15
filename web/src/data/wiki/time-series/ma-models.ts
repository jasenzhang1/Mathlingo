import type { WikiArticle } from "../types";

export const maModelsWiki: WikiArticle = {
  conceptId: "ma-models",

  summary:
    "A moving-average model of order q, MA(q), writes Xₜ as a weighted sum of the current and last q " +
    "noise shocks — not past levels of X itself. That single design choice flips every property AR " +
    "models have: MA(q) is stationary automatically for any coefficients, its ACF cuts off sharply " +
    "after lag q instead of decaying, and its PACF is the one that tails off. It is the mirror image " +
    "of AR, and the two together are the alphabet Wold's theorem says every stationary process is " +
    "written in.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "Xₜ = μ + εₜ + θ₁εₜ₋₁ + θ₂εₜ₋₂ + ⋯ + θ_qεₜ₋q,   εₜ ~ WN(0, σ²)",
          caption: "MA(q): a weighted sum of the current shock and the last q shocks, none of them observed directly — only inferred from the fitted model.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "'Moving average' is a slightly misleading name",
          text:
            "This is not the running average of the raw series a chart-reader means by 'moving " +
            "average' — the εₜ₋ⱼ here are unobserved shocks, not past values of Xₜ. The name survives " +
            "for historical reasons; what matters is that Xₜ is built from the innovation process, not " +
            "from its own lagged levels.",
        },
      ],
    },

    {
      heading: "MA(1): stationarity is automatic, invertibility is not",
      blocks: [
        {
          kind: "formula",
          latex: "Xₜ = μ + εₜ + θεₜ₋₁",
          caption: "The simplest MA process.",
        },
        {
          kind: "formula",
          latex: "Var(Xₜ) = σ²(1 + θ²),   ρ(1) = θ/(1 + θ²),   ρ(h) = 0 for h ≥ 2",
          caption: "Constant variance for any θ (so MA(1) is stationary for every value of θ), and ACF that vanishes after lag 1.",
        },
        {
          kind: "prose",
          text:
            "Var(Xₜ) does not depend on t for any θ, so unlike AR there is no stability condition needed " +
            "for stationarity — a finite MA is always stationary, since it is only a finite linear " +
            "combination of already-stationary white noise terms. What θ does control is invertibility: " +
            "whether the model can be rewritten as an (infinite) AR process in Xₜ, which is what a " +
            "forecasting algorithm actually needs in order to express εₜ in terms of observed past X's.",
        },
        {
          kind: "formula",
          latex: "εₜ = Xₜ − μ − θεₜ₋₁ = (Xₜ − μ) − θ(Xₜ₋₁ − μ) + θ²(Xₜ₋₂ − μ) − ⋯",
          caption: "Invertible representation of MA(1), valid when |θ| < 1 — expressing the unobserved shock as an infinite AR in the observed series.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "θ and 1/θ give the same ACF — invertibility picks the unique one",
          text:
            "Swap θ for 1/θ in ρ(1) = θ/(1+θ²) and the value is unchanged, so autocorrelation alone " +
            "cannot distinguish an MA(1) with θ = 2 from one with θ = 0.5 — they generate identically-" +
            "correlated data. The invertibility restriction |θ| < 1 is what selects a single, well-" +
            "behaved representation (the one expressible as a convergent AR(∞)) out of the two " +
            "observationally equivalent options, and estimation software enforces it by construction.",
        },
      ],
    },

    {
      heading: "MA(q): invertibility in general",
      blocks: [
        {
          kind: "formula",
          latex: "1 + θ₁z + θ₂z² + ⋯ + θ_qz^q = 0",
          caption: "Invertible iff every root lies outside the unit circle — the same test as AR's characteristic equation, applied to the θ's instead of the φ's.",
        },
        {
          kind: "table",
          headers: ["", "AR(p)", "MA(q)"],
          rows: [
            ["Automatically stationary?", "No — needs roots of φ-equation outside the unit circle", "Yes — always, for any finite q and any coefficients"],
            ["Needs an invertibility condition?", "No", "Yes — needs roots of θ-equation outside the unit circle, to get a unique AR(∞) representation"],
            ["ACF", "Tails off (decays)", "Cuts off sharply after lag q"],
            ["PACF", "Cuts off sharply after lag p", "Tails off (decays)"],
          ],
          caption: "AR and MA are dual: what's automatic for one needs a condition for the other, and their ACF/PACF signatures swap.",
        },
      ],
    },

    {
      heading: "Fitting",
      blocks: [
        {
          kind: "prose",
          text:
            "Unlike AR, MA cannot be fit by ordinary least squares on observed lags, because the " +
            "regressors (past εₜ's) are unobserved. Estimation is by maximum likelihood or (equivalently, " +
            "asymptotically) by minimising the sum of squared one-step-ahead prediction errors, both of " +
            "which require iterating: guess starting values, compute implied residuals recursively, " +
            "update the θ's, repeat.",
        },
        {
          kind: "example",
          title: "Reading an ACF for MA order",
          problem:
            "A series' ACF is significant at lags 1 and 2, essentially zero from lag 3 onward, and its " +
            "PACF tails off gradually with no sharp cutoff. What model is suggested?",
          steps: [
            "ACF cuts off sharply — after the MA/AR duality table, that is the MA signature, not the AR one.",
            "The cutoff is after lag 2.",
            "PACF tailing off (not cutting off) is consistent with MA rather than AR, confirming the read.",
          ],
          answer: "MA(2) is the natural first candidate.",
        },
      ],
    },
  ],

  references: [
    { source: "Hamilton, Time Series Analysis", locator: "§3.2–3.3, Moving Average and Invertibility" },
    { source: "Shumway & Stoffer, Time Series Analysis and Its Applications", locator: "§3.2, Moving Average Models" },
    { source: "Box, Jenkins, Reinsel & Ljung, Time Series Analysis: Forecasting and Control", locator: "Ch. 3, Linear Stationary Models" },
  ],
};
