import type { WikiArticle } from "../types";

export const evaluatingRiskModelsWiki: WikiArticle = {
  conceptId: "evaluating-risk-models",

  summary:
    "A risk model is used in two ways: to forecast volatility, and — through its inverse, the precision matrix — to " +
    "build portfolios. Each use needs its own tests. Volatility forecasts are scored with losses that are robust to " +
    "noisy proxies, QLIKE and MSE, on portfolios that matter. The precision matrix is scored by the realized variance of " +
    "minimum-variance portfolios and by how well it whitens returns (Mahalanobis distances). Ancillary checks cover " +
    "turnover and predicted betas. And the most popular statistic, cross-sectional $R^{2}$, turns out to be nearly " +
    "useless for choosing a model. It draws on the Precision Matrix lesson and on volatility proxies from earlier.",

  sections: [
    {
      heading: "Volatility: robust losses",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{QLIKE}(\\hat{\\sigma}^{2}, \\tilde{\\sigma}^{2}) = \\frac{\\tilde{\\sigma}^{2}}{\\hat{\\sigma}^{2}} - \\log\\frac{\\tilde{\\sigma}^{2}}{\\hat{\\sigma}^{2}} - 1, \\qquad \\text{MSE}(\\hat{\\sigma}^{2}, \\tilde{\\sigma}^{2}) = \\left(\\tilde{\\sigma}^{2} - \\hat{\\sigma}^{2}\\right)^{2}",
          caption: "$\\hat{\\sigma}^{2}$ is the forecast, $\\tilde{\\sigma}^{2}$ an unbiased proxy such as realized variance",
        },
        {
          kind: "prose",
          text:
            "True volatility is never observed, so forecasts are scored against a noisy proxy. A loss is **rank-robust** " +
            "if ranking forecasters with the proxy gives the same order as ranking with the truth; Patton showed QLIKE and " +
            "MSE are (essentially) the robust choices, and they are replacing the old bias statistic (the standard " +
            "deviation of returns divided by forecast volatility), which checks only average calibration. QLIKE is the " +
            "Gaussian negative log-likelihood up to constants and is asymmetric: a realized variance twice the forecast " +
            "costs $0.307$, half the forecast only $0.193$ — under-prediction hurts more.",
        },
        {
          kind: "table",
          headers: ["Which portfolios?", "Pros", "Cons"],
          rows: [
            ["Production strategies, end to end", "Measures what matters", "Must build portfolios with the model being tested — optimizing with A and scoring with B is biased"],
            ["Random portfolios / eigenportfolios (average case)", "Simple, model-agnostic", "Result depends on the arbitrary portfolio distribution or basis; expensive"],
            ["Worst case over unit-norm portfolios", "Finds blind spots", "Non-convex, intractable for many assets"],
            ["MVO on realized leading returns (plus noise)", "Tests the portfolios an alpha-driven strategy would hold", "Uses future returns deliberately — for testing only"],
          ],
        },
        {
          kind: "prose",
          text:
            "A portfolio-free alternative is the multivariate Gaussian negative log-likelihood, " +
            "$\\mathbf{r}_t^{\\top}\\hat{\\boldsymbol{\\Omega}}_t^{-1}\\mathbf{r}_t + \\log|\\hat{\\boldsymbol{\\Omega}}_t|$, " +
            "which tests both shape and scale (but is sensitive to heavy tails).",
        },
      ],
    },
    {
      heading: "The precision matrix",
      blocks: [
        {
          kind: "prose",
          text:
            "**Minimum-variance test.** Solve $\\min_{\\mathbf{w}} \\mathbf{w}^{\\top}\\hat{\\boldsymbol{\\Omega}}\\mathbf{w}$ " +
            "subject to $\\mathbf{b}^{\\top}\\mathbf{w} = 1$, so $\\mathbf{w} \\propto \\hat{\\boldsymbol{\\Omega}}^{-1}\\mathbf{b}$. " +
            "Its realized variance under the true covariance is at least that of the portfolio built from the true " +
            "covariance, with equality only if $\\hat{\\boldsymbol{\\Omega}} \\propto \\boldsymbol{\\Omega}$. Lower realized " +
            "variance means a better precision matrix. With $\\mathbf{b} = \\mathbb{E}[\\mathbf{r}]$ the same logic says the " +
            "correct model maximizes realized Sharpe.",
        },
        {
          kind: "example",
          title: "What a wrong covariance costs",
          problem: "Two uncorrelated assets have true variances $0.04$ and $0.09$. Model A knows this; model B thinks both are $0.04$. Compare their fully invested minimum-variance portfolios.",
          steps: [
            "Model A: $w_1 = \\frac{1/0.04}{1/0.04 + 1/0.09} = 0.692$; realized variance $\\frac{1}{25 + 11.1} = 0.0277$.",
            "Model B: equal weights; realized variance $0.25(0.04) + 0.25(0.09) = 0.0325$.",
          ],
          answer: "B's portfolio is $17\\%$ riskier than necessary — the test ranks A above B.",
        },
        {
          kind: "formula",
          latex: "d_t^{2} = \\mathbf{r}_t^{\\top}\\hat{\\boldsymbol{\\Omega}}_t^{-1}\\mathbf{r}_t \\sim \\chi^{2}_{n} \\text{ if correct}, \\qquad \\frac{d_t^{2}}{n} \\text{ has mean } 1 \\text{ and standard deviation } \\sqrt{\\tfrac{2}{n}}",
          caption: "Mahalanobis test: the dispersion of $\\frac{d_t^{2}}{n}$ over time should be close to $\\sqrt{2/n}$",
        },
        {
          kind: "prose",
          text:
            "Small dispersion means $\\hat{\\boldsymbol{\\Omega}}^{-1/2}$ whitens returns well — the quantity that also " +
            "controls the Sharpe loss from risk-model error later in the course. The test ignores an overall scale factor, " +
            "which the volatility tests cover.",
        },
      ],
    },
    {
      heading: "Ancillary tests, and the trouble with $R^{2}$",
      blocks: [
        {
          kind: "list",
          items: [
            "**Turnover**: factor-mimicking portfolios $\\mathbf{P}_t = \\boldsymbol{\\Omega}_{\\epsilon,t}^{-1}\\mathbf{B}_t(\\mathbf{B}_t^{\\top}\\boldsymbol{\\Omega}_{\\epsilon,t}^{-1}\\mathbf{B}_t)^{-1}$ must be traded to hold constant factor exposures; the average $\\|\\mathbf{P}_t - \\mathbf{P}_{t-1}\\|_F$ measures how much the model itself makes you trade.",
            "**Betas**: compare predicted betas to a reference (market, factor-mimicking or thematic) portfolio, $\\frac{\\hat{\\boldsymbol{\\Omega}}\\mathbf{w}}{\\mathbf{w}^{\\top}\\hat{\\boldsymbol{\\Omega}}\\mathbf{w}}$, with realized ones — this is what hedging relies on.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Why not $R^{2}$?",
          text:
            "Average cross-sectional $R^{2}$ has no out-of-sample version (factor returns are refitted every period), always " +
            "rises when factors are added, and ignores rotations. Paleologo's example: flip each factor's sign at random " +
            "every period. Fitted values, $R^{2}$, AIC and BIC are all unchanged, but the estimated factor returns become " +
            "decorrelated and the factor covariance is wrong. Use the tests above instead; heuristics such as how often each " +
            "factor's $t$-statistic exceeds $2$ can supplement them.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "No single best model",
          text:
            "Models are judged on several metrics and rarely win on all. Pick the metrics closest to how the model will be " +
            "used — for an optimizer, the precision-matrix tests come first.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 5, Evaluating Risk (§5.1–5.3) and Ch. 14, §14.1" },
    { source: "Patton, “Volatility forecast comparison using imperfect volatility proxies”, Journal of Econometrics (2011)", locator: "Robust loss functions" },
    { source: "Hansen and Lunde, “Consistent ranking of volatility models”, Journal of Econometrics (2006)", locator: "Rank robustness" },
  ],
};
