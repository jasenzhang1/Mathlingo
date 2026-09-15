import type { WikiArticle } from "../types";

export const armaWiki: WikiArticle = {
  conceptId: "arma",

  summary:
    "ARMA(p, q) combines an AR(p) and an MA(q) term in one equation. The point is parsimony: a process " +
    "whose true MA(∞) weights decay in a way that would need a large pure MA or a large pure AR to " +
    "capture can often be matched almost exactly by a small ARMA model with both kinds of term. Box–" +
    "Jenkins identification — read the shape, fit candidates, check the residuals — is the standard " +
    "workflow for choosing (p, q) in practice.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "Xₜ = c + φ₁Xₜ₋₁ + ⋯ + φₚXₜ₋ₚ + εₜ + θ₁εₜ₋₁ + ⋯ + θ_qεₜ₋q",
          caption: "ARMA(p, q): p autoregressive terms and q moving-average terms in the same equation.",
        },
        {
          kind: "prose",
          text:
            "Stationarity depends only on the AR side — the same characteristic-equation condition " +
            "(roots of 1 − φ₁z − ⋯ − φₚzᵖ outside the unit circle) as pure AR(p), unaffected by the MA " +
            "terms. Invertibility depends only on the MA side — the same condition as pure MA(q). The " +
            "two conditions are independent of each other, which is part of why ARMA is easy to reason " +
            "about despite mixing the two model families.",
        },
      ],
    },

    {
      heading: "Why bother mixing, if Wold says pure MA(∞) always exists",
      blocks: [
        {
          kind: "example",
          title: "A process AR(1) alone cannot match, but ARMA(1,1) can",
          problem:
            "A process has ψⱼ (Wold weights) that decay geometrically after an unusually large jump at " +
            "lag 1 — a shape neither pure AR(1) (whose ψⱼ = φʲ decays smoothly from the start) nor a " +
            "short pure MA can reproduce exactly. What does ARMA(1,1) buy here?",
          steps: [
            "ARMA(1,1)'s implied ψⱼ = φʲ⁻¹(φ + θ) for j ≥ 1, which is still geometric decay but with an adjustable first-lag jump set by θ, independent of the decay rate φ.",
            "A pure AR(1) ties the first-lag weight and the decay rate together (both governed by φ alone); ARMA(1,1) decouples them with one extra parameter.",
            "So ARMA(1,1) can match this shape with 2 parameters where a pure AR or MA model might need 4+ terms to approximate the same curve.",
          ],
          answer:
            "The MA term gives ARMA an extra degree of freedom to set the initial jump independently of the decay rate — often the difference between a 2-parameter exact fit and a 6-parameter approximate one.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Parsimony is the entire justification",
          text:
            "This is the direct payoff of Wold's theorem: since every stationary process already has a " +
            "(possibly infinite) MA(∞) representation, the only remaining question is how few parameters " +
            "can represent it well. ARMA typically wins that comparison whenever the true process has " +
            "both a persistent decay and some short-run structure that decay rate alone can't capture.",
        },
      ],
    },

    {
      heading: "Identifying (p, q) in practice",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Confirm stationarity first (ACF should decay to near-zero rather than staying near 1 for many lags); difference the series if not, moving into ARIMA territory.",
            "If ACF cuts off and PACF tails off, or vice versa, the pure-AR or pure-MA row of the identification table applies and (p, q) is close to unambiguous.",
            "If both ACF and PACF tail off, both p ≥ 1 and q ≥ 1 are likely needed, but their exact values are not readable off the plots directly.",
            "Fit a small grid of candidate (p, q) pairs and compare by AIC/BIC — the standard resolution when the plots underdetermine the order.",
            "Check residuals of the chosen model with a Ljung–Box test: if residual autocorrelation remains, the order was too small somewhere.",
          ],
        },
        {
          kind: "table",
          headers: ["Symptom after fitting", "Likely fix"],
          rows: [
            ["Residuals still autocorrelated at low lags", "Increase p or q by one and refit"],
            ["Two candidate models fit about equally well by AIC", "Prefer the smaller one (fewer parameters, same information content) — this is exactly what the AIC penalty is for"],
            ["Estimated φ and θ roots nearly cancel (close to a common factor)", "The model is over-parametrised — a smaller (p, q) likely fits just as well"],
          ],
        },
      ],
    },

    {
      heading: "Common misconception: ARMA fixes non-stationarity",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "ARMA still requires stationarity",
          text:
            "Adding MA terms to an AR model does not relax the stationarity requirement — that condition " +
            "is entirely about the AR side's characteristic roots, independent of q. A trending series " +
            "fit with ARMA(p, q) for any q is just as misspecified as one fit with pure AR(p); the fix is " +
            "always differencing (ARIMA), not adding MA terms.",
        },
      ],
    },
  ],

  references: [
    { source: "Box, Jenkins, Reinsel & Ljung, Time Series Analysis: Forecasting and Control", locator: "Ch. 3, Linear Stationary Models — the ARMA process" },
    { source: "Hamilton, Time Series Analysis", locator: "§3.4, Autoregressive Moving Average Processes" },
    { source: "Shumway & Stoffer, Time Series Analysis and Its Applications", locator: "§3.3, Autoregressive Moving Average Models" },
  ],
};
