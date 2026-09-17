import type { WikiArticle } from "../types";

export const cointegrationWiki: WikiArticle = {
  conceptId: "cointegration",

  summary:
    "Two I(1) series are cointegrated if some linear combination of them is stationary — they can each " +
    "wander without bound individually, yet a specific combination of the two does not. That is a " +
    "genuine economic or physical relationship (a spread that reverts, two prices tied by arbitrage), " +
    "and it is also the escape hatch from spurious regression: regressing one non-stationary series on " +
    "an unrelated one produces significant-looking coefficients purely from the shared trending, unless " +
    "the two happen to be cointegrated.",

  sections: [
    {
      heading: "Spurious regression: the problem first",
      blocks: [
        {
          kind: "prose",
          text:
            "Regress one independent random walk on another independent random walk — two I(1) series " +
            "with no real relationship — and OLS routinely reports a highly significant slope, an R² " +
            "that can exceed 0.5, and residuals that are themselves non-stationary and strongly " +
            "autocorrelated. This is the Granger–Newbold result: the usual t and F statistics are not " +
            "valid here because their derivation assumes stationary regressors, and two unrelated " +
            "trending series simply drift together often enough, over any finite sample, to look " +
            "related.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A high R² between two trending series proves almost nothing by itself",
          text:
            "Ice-cream sales and drownings both trend with summer; two unrelated random walks trend " +
            "together for the same structural reason no causal story is needed. Before trusting a " +
            "regression between two series that are each non-stationary, check whether they are " +
            "cointegrated — that is the formal version of asking whether the relationship is real or an " +
            "artefact of both series happening to drift.",
        },
      ],
    },

    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "Xₜ, Yₜ both I(1);  Zₜ = Yₜ − βXₜ is I(0) for some β ≠ 0  ⟹  Xₜ, Yₜ are cointegrated",
          caption: "Two non-stationary series are cointegrated if a specific linear combination of them is stationary.",
        },
        {
          kind: "prose",
          text:
            "β is the cointegrating coefficient and Zₜ is the equilibrium error — how far the pair sits " +
            "from its long-run relationship at time t. Zₜ being stationary means deviations from that " +
            "relationship are temporary: whenever the pair drifts apart, some force pulls them back " +
            "together. Spot prices for the same commodity in two markets, a stock and its futures " +
            "contract, or short- and long-term interest rates are classic examples — arbitrage or " +
            "economic mechanism is the 'force' behind the reversion.",
        },
        {
          kind: "example",
          title: "Testing a candidate cointegrating relationship",
          problem:
            "Two stock prices Pₜ and Qₜ each fail an ADF test for stationarity (as expected for prices). " +
            "OLS regression gives Qₜ = 1.5Pₜ + Zₜ, and an ADF test on the residual series Ẑₜ rejects the " +
            "unit-root null. What does this imply?",
          steps: [
            "Both raw price series are I(1) — individually non-stationary, consistent with typical price behaviour.",
            "The residual Ẑₜ from regressing one on the other is found to be stationary (ADF rejects a unit root in the residuals).",
            "This is exactly the definition above, with β ≈ 1.5.",
          ],
          answer: "The two series are cointegrated with cointegrating coefficient ≈ 1.5 — the spread Qₜ − 1.5Pₜ is mean-reverting, even though each price wanders on its own.",
        },
      ],
    },

    {
      heading: "Testing for cointegration",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Engle–Granger two-step method",
              description: "(1) Regress one series on the other by OLS. (2) Run an ADF test on the residuals, using critical values adjusted for the fact that the residuals come from an estimated regression rather than being observed directly. Simple, but only handles one cointegrating relationship between exactly two series.",
            },
            {
              term: "Johansen test",
              description: "A multivariate procedure that can detect multiple cointegrating relationships among more than two series simultaneously, via the rank of a matrix built from the series' levels and differences. The standard choice once more than two series are involved.",
            },
          ],
        },
      ],
    },

    {
      heading: "Modelling cointegrated series: the error-correction model",
      blocks: [
        {
          kind: "formula",
          latex: "ΔYₜ = α(Yₜ₋₁ − βXₜ₋₁) + (lagged ΔX, ΔY terms) + εₜ",
          caption: "The error-correction representation: today's change responds partly to how far the pair was from equilibrium yesterday.",
        },
        {
          kind: "prose",
          text:
            "This is the Granger representation theorem's payoff: cointegrated I(1) series are always " +
            "representable as an error-correction model (ECM), which models the short-run dynamics " +
            "(ΔX, ΔY — both stationary, since differencing an I(1) series gives I(0)) while α pulls the " +
            "level back toward the long-run relationship whenever it drifts away. α < 0 is the " +
            "reversion condition: a positive gap this period predicts a corrective negative change next " +
            "period.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Cointegration is what tells you not to just difference and use ARIMA",
          text:
            "Differencing each series separately (the ARIMA fix for non-stationarity) discards the " +
            "long-run relationship between them entirely — a model of ΔXₜ and ΔYₜ separately never " +
            "learns that the levels are tied together. The ECM is the specific tool that keeps both the " +
            "short-run (differenced, stationary) dynamics and the long-run equilibrium relationship in " +
            "one model, which is exactly what pure ARIMA on each series individually throws away.",
        },
      ],
    },
  ],

  references: [
    { source: "Engle & Granger, \"Co-integration and Error Correction\", Econometrica 1987", locator: "The founding paper" },
    { source: "Granger & Newbold, \"Spurious Regressions in Econometrics\", Journal of Econometrics 1974", locator: "The spurious-regression result" },
    { source: "Hamilton, Time Series Analysis", locator: "Ch. 19–20, Cointegration and Error-Correction Models" },
  ],
};
