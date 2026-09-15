import type { WikiArticle } from "../types";

export const pacfWiki: WikiArticle = {
  conceptId: "pacf",

  summary:
    "The partial autocorrelation function measures the correlation between Xₜ and Xₜ₊ₕ after netting " +
    "out the linear effect of everything in between — the same move that separates a partial-" +
    "regression coefficient from a marginal one. It is ACF's complement: where ACF cannot tell an " +
    "AR(1) from an AR(2) apart, PACF cuts off sharply at exactly the true AR order and does not decay " +
    "further, which is precisely the identification power ACF lacks.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "φ_{hh} = Corr(Xₜ, Xₜ₊ₕ | Xₜ₊₁, …, Xₜ₊ₕ₋₁)",
          caption: "The correlation between Xₜ and Xₜ₊ₕ, with the intermediate lags regressed out of both.",
        },
        {
          kind: "prose",
          text:
            "Concretely, φ_{hh} is the coefficient on Xₜ₊ₕ in a regression of Xₜ on Xₜ₊₁, …, Xₜ₊ₕ — the " +
            "coefficient a lag receives once every shorter lag has already claimed whatever predictive " +
            "power it can. This is exactly the effect-of-adding-another-variable logic from multiple " +
            "regression, run down a time axis: PACF at lag h is 'how much does adding lag h help, given " +
            "that lags 1 through h−1 are already in the model.'",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "PACF as the last coefficient in a growing AR fit",
          text:
            "An equivalent and more computational definition: fit an AR(h) model by least squares, and " +
            "φ_{hh} is the coefficient on the hth lag in that fit. Fitting AR(1), then AR(2), then " +
            "AR(3), … and reading off the last coefficient each time traces out the whole PACF. In " +
            "practice the Durbin–Levinson recursion computes all of φ_{11}, φ_{22}, … efficiently " +
            "without refitting from scratch at every h.",
        },
      ],
    },

    {
      heading: "Reading ACF and PACF together",
      blocks: [
        {
          kind: "table",
          headers: ["Process", "ACF", "PACF"],
          rows: [
            ["AR(p)", "Tails off — geometric or damped-sinusoidal decay", "Cuts off after lag p"],
            ["MA(q)", "Cuts off after lag q", "Tails off — geometric or damped-sinusoidal decay"],
            ["ARMA(p, q), both p, q > 0", "Tails off", "Tails off"],
            ["White noise", "≈ 0 at every lag > 0", "≈ 0 at every lag > 0"],
          ],
          caption: "The identification rule Box–Jenkins is built on: whichever of the two cuts off sharply names the order of that side of the model.",
        },
        {
          kind: "prose",
          text:
            "The AR and MA rows are mirror images of each other precisely because of how each process is " +
            "defined: an AR(p) process has a finite footprint in its own coefficients (only p lags enter " +
            "the defining equation) but an infinite one in raw correlation, while an MA(q) process is the " +
            "reverse — finite raw correlation, infinite AR footprint. The ARMA(p, q) row — both tailing " +
            "off — is why ARMA order identification from ACF/PACF alone is harder than the pure cases, " +
            "and why AIC/BIC comparison across candidate (p, q) pairs supplements the plots in practice.",
        },
        {
          kind: "example",
          title: "Identifying an order from a PACF plot",
          problem:
            "A series' ACF decays geometrically with no sharp cutoff. Its PACF has two bars clearly " +
            "outside the confidence band, at lags 1 and 2, and nothing significant afterward. What model " +
            "does this suggest?",
          steps: [
            "ACF tails off, PACF cuts off — the AR row of the table applies, not the MA row.",
            "PACF is significant through lag 2 and negligible after: the cutoff is at p = 2.",
          ],
          answer: "AR(2) is the natural first candidate — confirm by fitting it and checking that the residuals look like white noise.",
        },
      ],
    },

    {
      heading: "Significance bands",
      blocks: [
        {
          kind: "prose",
          text:
            "Under the null that the true process is AR(p) for some p < h, φ_{hh} for h beyond p has the " +
            "same approximate standard error 1/√n that Bartlett's formula gives the ACF, and the same " +
            "±1.96/√n band is the usual visual cutoff rule. The same caution applies here as for ACF: one " +
            "isolated bar crossing the band among many lags is expected under pure noise, and shape — a " +
            "clean cutoff versus scattered noise — is more informative than any single bar.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "PACF assumes the series is already stationary",
          text:
            "Feeding a trending or unit-root series into a PACF plot typically produces a large " +
            "significant spike at lag 1 that looks like clean AR(1) structure but is really an artefact " +
            "of non-stationarity — another reason the stationarity check and differencing (see ARIMA) " +
            "come before ACF/PACF-based identification, not after.",
        },
      ],
    },
  ],

  references: [
    { source: "Box, Jenkins, Reinsel & Ljung, Time Series Analysis: Forecasting and Control", locator: "Ch. 3, Identification of ARMA Models" },
    { source: "Shumway & Stoffer, Time Series Analysis and Its Applications", locator: "§3.4, Partial Autocorrelation" },
    { source: "Hamilton, Time Series Analysis", locator: "§3.4, The Autocovariance-Generating Function and PACF" },
  ],
};
