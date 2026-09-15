import type { WikiArticle } from "../types";

export const acfWiki: WikiArticle = {
  conceptId: "acf",

  summary:
    "The autocorrelation function measures how correlated a stationary series is with a lagged copy " +
    "of itself, as a function of the lag h. Plotted against h, its shape is the single most useful " +
    "diagnostic in time series analysis: a slow geometric decay says 'AR,' a hard cutoff after lag q " +
    "says 'MA(q),' and a persistent near-1 value at every lag says 'this series probably isn't even " +
    "stationary yet.'",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "ρ(h) = γ(h)/γ(0) = Corr(Xₜ, Xₜ₊ₕ)",
          caption: "The autocovariance at lag h, normalised by the variance — so ρ(0) = 1 and |ρ(h)| ≤ 1.",
        },
        {
          kind: "formula",
          latex: "ρ̂(h) = [Σₜ₌₁ⁿ⁻ʰ (xₜ − x̄)(xₜ₊ₕ − x̄)] / [Σₜ₌₁ⁿ (xₜ − x̄)²]",
          caption: "The sample ACF: both numerator and denominator use the same estimated mean x̄, and the denominator sums over all n points regardless of h.",
        },
        {
          kind: "prose",
          text:
            "The sample ACF is a single-path estimate of the population ρ(h), and it is only meaningful " +
            "under stationarity — ρ(h) is not even well-defined for a non-stationary process, since " +
            "Corr(Xₜ, Xₜ₊ₕ) would then depend on t as well as h. This is the direct payoff of the " +
            "previous concept: no stationarity, no ACF.",
        },
      ],
    },

    {
      heading: "Reading the shape",
      blocks: [
        {
          kind: "table",
          headers: ["ACF shape", "Typical cause"],
          rows: [
            ["Cuts off sharply to ~0 after lag q", "MA(q) — by construction, an MA(q) process has zero autocorrelation beyond lag q"],
            ["Decays geometrically (tails off), never exactly zero", "AR(p) — an AR process has autocorrelation at every lag, shrinking toward 0"],
            ["Decays very slowly, still large at lag 20+", "Likely non-stationary (a unit root or trend) — difference before modelling further"],
            ["Sinusoidal, damped oscillation", "AR with complex roots — cyclical behaviour, e.g. business-cycle-like series"],
            ["Essentially zero at every lag beyond 0", "White noise — no linear structure left to model"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "ACF alone can't separate two AR processes from an ARMA process",
          text:
            "Both AR(1) and AR(2) show geometric decay; so does any ARMA process with an MA component " +
            "mixed in. ACF shape narrows things to 'has an AR component,' but pinning down the order — " +
            "and telling an AR process apart from one with an MA part too — needs PACF alongside it.",
        },
      ],
    },

    {
      heading: "Is a given ρ̂(h) distinguishable from zero?",
      blocks: [
        {
          kind: "formula",
          latex: "SE(ρ̂(h)) ≈ 1/√n   (Bartlett's approximation, for h beyond any true dependence)",
          caption: "The usual ±1.96/√n band drawn on an ACF plot — approximately a 95% interval for 'this lag is not significant.'",
        },
        {
          kind: "prose",
          text:
            "Because ρ̂(h) is estimated from a single path, sampling noise alone produces small nonzero " +
            "values at every lag, even for true white noise. Bartlett's formula gives the approximate " +
            "standard error of ρ̂(h) under the null that the true process is white noise beyond the lags " +
            "already accounted for, which is what software draws as the dashed confidence band. A bar " +
            "poking outside the band at one isolated lag, in an otherwise flat plot, is exactly what " +
            "chance alone predicts about 5% of the time — it is not automatically evidence of structure.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Eyeballing individual bars inflates false positives",
          text:
            "Checking 20 lags at a 5% significance level each gives roughly a 64% chance that at least " +
            "one bar crosses the band by chance alone. The Ljung–Box test addresses this properly by " +
            "testing a whole block of lags jointly, rather than lag-by-lag.",
        },
        {
          kind: "example",
          title: "Reading a Bartlett band",
          problem: "n = 100. Is ρ̂(1) = 0.22 distinguishable from zero at roughly the 95% level?",
          steps: [
            "SE ≈ 1/√n = 1/√100 = 0.1.",
            "95% band ≈ ±1.96 × 0.1 ≈ ±0.196.",
            "0.22 > 0.196.",
          ],
          answer: "Yes — 0.22 sits just outside the ±0.196 band, so lag 1 shows detectable autocorrelation at roughly the 5% level.",
        },
      ],
    },

    {
      heading: "The Ljung–Box test",
      blocks: [
        {
          kind: "formula",
          latex: "Q = n(n+2) Σₕ₌₁ᵐ ρ̂(h)² / (n − h)   ~   χ²ₘ  under H₀: ρ(1) = ⋯ = ρ(m) = 0",
          caption: "A joint test that the first m autocorrelations are all zero — the standard residual-diagnostic check.",
        },
        {
          kind: "prose",
          text:
            "Applied to raw data, Ljung–Box tests whether the series has any linear autocorrelation " +
            "worth modelling at all. Applied to the residuals of a fitted AR/MA/ARMA model — with degrees " +
            "of freedom reduced by the number of fitted parameters — it is the standard adequacy check: " +
            "a small p-value there means the model left autocorrelation on the table.",
        },
      ],
    },
  ],

  references: [
    { source: "Box, Jenkins, Reinsel & Ljung, Time Series Analysis: Forecasting and Control", locator: "Ch. 2, Autocorrelation Function and Spectrum" },
    { source: "Shumway & Stoffer, Time Series Analysis and Its Applications", locator: "§1.4, Estimation of Correlation" },
    { source: "Hyndman & Athanasopoulos, Forecasting: Principles and Practice", locator: "§2.8, Autocorrelation" },
  ],
};
