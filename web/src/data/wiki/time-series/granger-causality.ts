import type { WikiArticle } from "../types";

export const grangerCausalityWiki: WikiArticle = {
  conceptId: "granger-causality",

  summary:
    "$X$ Granger-causes $Y$ if the past of $X$ improves forecasts of $Y$ beyond what the past of $Y$ already gives. " +
    "It is a statement about incremental predictability, tested with an $F$-test on the lagged $X$ terms of a vector " +
    "autoregression. The name oversells it: Granger causality is neither necessary nor sufficient for $X$ actually causing $Y$.",

  sections: [
    {
      heading: "The test",
      blocks: [
        {
          kind: "formula",
          latex:
            "Y_t = c + \\sum_{j=1}^{k}a_j Y_{t-j} + \\sum_{j=1}^{k}\\delta_j X_{t-j} + e_t, \\qquad H_0: \\delta_1 = \\dots = \\delta_k = 0",
          caption: "The $Y$ equation of a bivariate VAR($k$). Rejecting $H_0$ means $X$ Granger-causes $Y$.",
        },
        {
          kind: "formula",
          latex: "F = \\frac{(\\text{SSE}_R - \\text{SSE}_U)/k}{\\text{SSE}_U/(T - 2k - 1)} \\approx F_{k,\\, T - 2k - 1}",
          caption: "$\\text{SSE}_R$ drops the lagged $X$'s; $\\text{SSE}_U$ keeps them. Valid for stationary series.",
        },
        {
          kind: "prose",
          text:
            "Choose $k$ by AIC or BIC on the unrestricted VAR; too few lags can create spurious Granger causality when $Y$'s own dynamics are under-modelled. " +
            "Test the reverse direction as well: feedback in both directions is common.",
        },
        {
          kind: "example",
          title: "Reading the F-test",
          problem:
            "With $T = 200$ and $k = 2$ lags, the restricted model has $\\text{SSE}_R = 150$ and the unrestricted $\\text{SSE}_U = 140$. Does $X$ Granger-cause $Y$ at $5\\%$ ($F_{2,195,0.95} \\approx 3.04$)?",
          steps: [
            "Numerator: $(150 - 140)/2 = 5$.",
            "Denominator: $140/(200 - 5) \\approx 0.718$.",
            "$F \\approx 6.96 > 3.04$.",
          ],
          answer: "Yes: the lags of $X$ add significant forecasting power for $Y$.",
        },
      ],
    },

    {
      heading: "Prediction is not causation",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Granger causality without causation", description: "A common driver $Z$ hits $X$ before $Y$. Leading economic indicators Granger-cause GDP because they react to the same cycle sooner, not because they drive it. Faster reporting of $X$ produces the same effect." },
            { term: "Causation without Granger causality", description: "Effects that land within the sampling interval are invisible to lags, and feedback (a central bank offsetting shocks) can cancel the predictive signature. Forward-looking prices respond to news before the news “happens”." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Omitted variables again",
          text:
            "A bivariate Granger test is a regression with an omitted-variable problem. Adding plausible common drivers to the VAR (conditional Granger causality) is the minimum check before reading anything causal into the result.",
        },
      ],
    },

    {
      heading: "Nonstationary and cointegrated series",
      blocks: [
        {
          kind: "prose",
          text:
            "If $X$ and $Y$ are $I(1)$, the $F$-test in levels has nonstandard limits (Sims, Stock & Watson 1990). If they are not cointegrated, test in differences. " +
            "If they are cointegrated, use the error-correction form $\\Delta Y_t = \\alpha_Y(Y_{t-1} - \\beta X_{t-1}) + \\sum_j(\\phi_j\\Delta Y_{t-j} + \\psi_j\\Delta X_{t-j}) + e_t$: " +
            "$X$ fails to Granger-cause $Y$ only if $\\alpha_Y = 0$ and all $\\psi_j = 0$. Cointegration implies Granger causality in at least one direction. " +
            "Toda–Yamamoto offers a shortcut: fit a levels VAR with $k + d_{\\max}$ lags and test only the first $k$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Term-structure example",
          text:
            "Under the expectations hypothesis, long yields embed expected future short rates, so the long–short spread should forecast changes in short rates: long rates Granger-cause short rates. Departures from the implied coefficients point to time-varying term premia.",
        },
      ],
    },
  ],

  references: [
    { source: "Granger, “Investigating Causal Relations by Econometric Models and Cross-Spectral Methods”, Econometrica 1969", locator: "The definition" },
    { source: "Hamilton, Time Series Analysis", locator: "§11.2, Bivariate Granger Causality Tests" },
    { source: "Shumway & Stoffer, Time Series Analysis and Its Applications (4th ed.)", locator: "§5.6, Multivariate ARMAX Models" },
  ],
};
