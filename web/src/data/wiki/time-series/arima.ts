import type { WikiArticle } from "../types";

export const arimaWiki: WikiArticle = {
  conceptId: "arima",

  summary:
    "ARIMA(p, d, q) is ARMA(p, q) applied not to the raw series but to its d-th difference — the " +
    "standard fix for a stochastic trend (a unit root) rather than a deterministic one. The 'I' stands " +
    "for integrated: a series that needs differencing to become stationary is called integrated of " +
    "order d, written I(d), and the whole point of ARIMA is to difference exactly enough to reach I(0) " +
    "and then let ARMA machinery do the rest.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "(1 − L)ᵈXₜ = c + φ₁(1−L)ᵈXₜ₋₁ + ⋯ + εₜ + θ₁εₜ₋₁ + ⋯,   L Xₜ ≡ Xₜ₋₁",
          caption: "ARIMA(p, d, q): apply the difference operator (1−L) d times, then fit ARMA(p, q) to what's left.",
        },
        {
          kind: "prose",
          text:
            "d = 0 is ordinary ARMA. d = 1 — first differencing, ΔXₜ = Xₜ − Xₜ₋₁ — is by far the most " +
            "common case in practice: most economic and financial series that trend are I(1), meaning " +
            "one difference is enough to make them stationary. d = 2 (differencing a series that is " +
            "already trending in its rate of change) is used, but rarely more than that.",
        },
      ],
    },

    {
      heading: "Unit roots: what differencing is actually fixing",
      blocks: [
        {
          kind: "prose",
          text:
            "Recall AR(1)'s boundary case: φ = 1 gives Xₜ = Xₜ₋₁ + εₜ, the random walk, whose " +
            "characteristic root z = 1/φ sits exactly on the unit circle — a unit root. A unit-root " +
            "process is non-stationary (its variance grows with t and shocks never decay) but it is a " +
            "qualitatively different kind of non-stationarity from a deterministic trend, and the two " +
            "need different fixes.",
        },
        {
          kind: "table",
          headers: ["", "Deterministic trend (trend-stationary)", "Stochastic trend / unit root (difference-stationary)"],
          rows: [
            ["Model", "Xₜ = α + βt + (stationary AR/MA part)", "Xₜ = Xₜ₋₁ + (stationary AR/MA part)"],
            ["Correct fix", "Subtract the fitted trend line, then model the residual", "Difference the series (Xₜ − Xₜ₋₁), then model that"],
            ["Effect of a shock", "Temporary — the series reverts to the trend line", "Permanent — a shock shifts the whole future path"],
            ["Symptom if wrong fix applied", "Detrending a unit-root series leaves residual non-stationarity; differencing a trend-stationary series over-differences and induces spurious MA structure", "—"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Getting this distinction wrong is a classic time-series error",
          text:
            "The two kinds of non-stationarity can look similar on a plot — both show a persistent " +
            "upward drift — but they demand different treatment. An Augmented Dickey–Fuller (ADF) test " +
            "is the standard formal check: its null hypothesis is that a unit root is present, so a " +
            "small p-value is evidence against a unit root, i.e. evidence that differencing was not " +
            "the right fix and the trend is more likely deterministic.",
        },
      ],
    },

    {
      heading: "Choosing d, and the cost of over-differencing",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Run an ADF (or similar) test on the raw series. Fail to reject 'has a unit root' → difference once.",
            "Re-test the differenced series. Repeat until the test rejects the unit-root null — that count of differences is d.",
            "Stop as soon as the test rejects; do not difference 'to be safe.'",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Over-differencing introduces structure that wasn't there",
          text:
            "Differencing an already-stationary series introduces a spurious, strong negative " +
            "autocorrelation at lag 1 (differencing white noise εₜ produces εₜ − εₜ₋₁, which has " +
            "ρ(1) = −0.5 by construction) and inflates the variance. A telltale sign of over-" +
            "differencing is an ACF/PACF that shows a large negative spike at lag 1 that wasn't present, " +
            "or wasn't that strong, before differencing.",
        },
        {
          kind: "example",
          title: "Reading ADF results into a choice of d",
          problem:
            "ADF on the raw series: p = 0.62 (fail to reject unit root). ADF on the once-differenced " +
            "series: p = 0.01 (reject unit root). What is d, and what should ACF/PACF identification be applied to?",
          steps: [
            "Raw series: cannot reject a unit root, so it is non-stationary as is.",
            "Once differenced: unit root rejected, so one difference is enough — d = 1.",
            "ACF/PACF for choosing p and q should be computed on the differenced series, not the raw one.",
          ],
          answer: "d = 1; fit ARMA(p, q) — equivalently ARIMA(p, 1, q) — to the differenced series ΔXₜ, identifying p and q from its ACF/PACF.",
        },
      ],
    },

    {
      heading: "Forecasting in levels",
      blocks: [
        {
          kind: "prose",
          text:
            "Forecasts are produced on the differenced scale and then integrated back up (cumulatively " +
            "summed, d times) to give a forecast in the original units — the inverse of differencing. " +
            "A practical consequence of d ≥ 1: forecast intervals widen without bound as the horizon " +
            "grows, because a unit-root process has unbounded variance in the long run, unlike a " +
            "stationary ARMA forecast whose interval eventually settles at the unconditional variance.",
        },
      ],
    },
  ],

  references: [
    { source: "Box, Jenkins, Reinsel & Ljung, Time Series Analysis: Forecasting and Control", locator: "Ch. 4, Linear Nonstationary Models" },
    { source: "Hamilton, Time Series Analysis", locator: "Ch. 15, Unit Root Tests" },
    { source: "Hyndman & Athanasopoulos, Forecasting: Principles and Practice", locator: "§9.5–9.7, ARIMA Models and Unit Root Tests" },
  ],
};
