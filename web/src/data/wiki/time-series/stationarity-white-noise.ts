import type { WikiArticle } from "../types";

export const stationarityWhiteNoiseWiki: WikiArticle = {
  conceptId: "stationarity-white-noise",

  summary:
    "Stationarity is the assumption that makes one observed sample path informative about the process " +
    "that generated it: the process's statistics do not depend on when you look. Without it, a " +
    "single mean or a single autocorrelation computed from the data is an average over a moving " +
    "target. White noise is the simplest stationary process there is — uncorrelated shocks with " +
    "constant variance — and it is the raw material every model in this unit is built from.",

  sections: [
    {
      heading: "Weak (covariance) stationarity",
      blocks: [
        {
          kind: "formula",
          latex: "E[Xₜ] = μ (constant),   Cov(Xₜ, Xₜ₊ₕ) = γ(h)  depends only on the lag h, not on t",
          caption: "Constant mean, and an autocovariance that depends only on how far apart two times are.",
        },
        {
          kind: "prose",
          text:
            "This is weaker than strict stationarity, which requires the entire joint distribution of " +
            "any collection of time points to be invariant to shifting all the times by the same amount. " +
            "Weak stationarity only pins down the first two moments — but that is exactly what ACF, " +
            "AR, MA, and ARMA machinery needs, since all of it is built from means and covariances. " +
            "Strict stationarity plus finite variance implies weak stationarity; the converse is false.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Autocovariance function γ(h)",
              description: "γ(h) = Cov(Xₜ, Xₜ₊ₕ) = E[(Xₜ − μ)(Xₜ₊ₕ − μ)]. Under stationarity this is a function of h alone, and γ(0) = Var(Xₜ).",
            },
            {
              term: "Trend-stationary vs. difference-stationary",
              description: "Two different repairs for non-stationarity that look similar but are not: removing a deterministic trend versus differencing away a stochastic (unit-root) trend. Conflating them is a classic error — see ARIMA.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A trending or seasonal series is not stationary",
          text:
            "GDP with a rising mean, or retail sales with a December spike every year, both violate " +
            "'constant mean.' Fitting ACF/AR/MA/ARMA machinery to such a series directly produces " +
            "autocorrelations and coefficients that mix the trend or seasonal pattern with the genuine " +
            "short-run dynamics — the trend has to be removed (by differencing or detrending) first.",
        },
      ],
    },

    {
      heading: "White noise",
      blocks: [
        {
          kind: "formula",
          latex: "εₜ ~ WN(0, σ²):  E[εₜ] = 0,  Var(εₜ) = σ²,  Cov(εₜ, εₛ) = 0 for t ≠ s",
          caption: "Zero mean, constant variance, and no autocorrelation at any lag.",
        },
        {
          kind: "prose",
          text:
            "White noise is trivially stationary — γ(0) = σ² and γ(h) = 0 for h ≠ 0, both constant in t " +
            "— and it is unpredictable from its own past in the sense that no linear combination of " +
            "earlier εₛ improves on the unconditional mean 0. It is deliberately weaker than i.i.d. " +
            "noise: white noise forbids correlation, not dependence, so a process with zero " +
            "autocorrelation but time-varying conditional variance (exactly what GARCH models) is " +
            "white noise without being i.i.d.",
        },
        {
          kind: "table",
          headers: ["", "White noise", "i.i.d. noise", "Gaussian white noise"],
          rows: [
            ["Zero mean, constant variance", "Yes", "Yes", "Yes"],
            ["Uncorrelated (Cov = 0)", "Yes", "Yes", "Yes"],
            ["Independent", "Not required", "Yes", "Yes"],
            ["Normally distributed", "Not required", "Not required", "Yes"],
          ],
          caption: "Each column is a strictly stronger assumption than the one to its left.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "White noise is the null hypothesis for 'nothing left to model'",
          text:
            "Every model in this unit — AR, MA, ARMA, ARIMA — is judged by whether its residuals look " +
            "like white noise. If a residual series still has significant autocorrelation at some lag, " +
            "the model left structure on the table; the Ljung–Box test formalises this check by testing " +
            "whether a whole block of residual autocorrelations is jointly zero.",
        },
      ],
    },

    {
      heading: "Why stationarity is what licenses estimation from one path",
      blocks: [
        {
          kind: "prose",
          text:
            "The sample mean X̄ and the sample autocovariance γ̂(h) are both time-averages over the one " +
            "observed path. For those time-averages to estimate the true μ and γ(h) — quantities " +
            "defined as averages over the ensemble of all possible paths — the process needs an ergodic " +
            "theorem, the same kind of result that licensed using one Markov chain's long run to learn " +
            "its stationary distribution π. Stationarity is the necessary setup; ergodicity (a slightly " +
            "stronger condition, automatic for most models in this unit) is what completes the argument.",
        },
        {
          kind: "example",
          title: "Spotting non-stationarity from summary statistics",
          problem:
            "A series is split into an early half and a late half. The early half has mean 12.1 and " +
            "variance 4.0; the late half has mean 31.6 and variance 4.2. Is weak stationarity plausible?",
          steps: [
            "Weak stationarity requires a constant mean across the whole series.",
            "12.1 versus 31.6 is a large, systematic shift, not sampling noise around one shared mean.",
            "The variances agree closely (4.0 vs. 4.2), so the instability is specifically in the mean — consistent with a trend, not a variance-clustering effect like GARCH would produce.",
          ],
          answer:
            "Not stationary — the mean has clearly shifted. This is exactly the pattern differencing (see ARIMA) is designed to remove before fitting ARMA-type structure.",
        },
      ],
    },
  ],

  references: [
    { source: "Shumway & Stoffer, Time Series Analysis and Its Applications", locator: "§1.5–1.6, Stationary Time Series" },
    { source: "Hamilton, Time Series Analysis", locator: "Ch. 3, Stationary ARMA Processes" },
    { source: "Hyndman & Athanasopoulos, Forecasting: Principles and Practice", locator: "§9.1, Stationarity and Differencing" },
  ],
};
