import type { WikiArticle } from "../types";

export const performanceMetricsWiki: WikiArticle = {
  conceptId: "performance-metrics",

  summary:
    "A quant strategy is judged by a few numbers: expected return, volatility, their ratio — the Sharpe ratio — and " +
    "capacity, how much capital it can absorb before the Sharpe ratio collapses. Each is easy to define and easy to " +
    "misuse. This lesson covers their dimensions and annualization, how precisely a Sharpe ratio can be estimated, a " +
    "distribution-free bound on large losses, and the trade-off between Sharpe and size. Standard Error is the " +
    "statistical prerequisite.",

  sections: [
    {
      heading: "Return, volatility, Sharpe",
      blocks: [
        {
          kind: "list",
          items: [
            "**Expected return** is PnL over assets under management — stationary and independent of size, so comparable across periods and funds.",
            "**Volatility** is the standard deviation of returns. It is a justified risk measure under a quadratic (mean-variance) approximation of utility or elliptical returns; with fat tails it is a convenient but incomplete proxy.",
            "**The Sharpe ratio** is expected excess return over volatility. For i.i.d. returns, $\\widehat{\\text{SR}}\\sqrt{T}$ is the $t$-statistic of the mean.",
          ],
        },
        {
          kind: "formula",
          latex: "\\text{SR}_{\\text{annual}} = \\sqrt{252}\\,\\text{SR}_{\\text{daily}} = \\sqrt{12}\\,\\text{SR}_{\\text{monthly}}",
          caption: "Returns and variances scale with time, volatility with its square root, so Sharpe has dimension $[\\text{time}]^{-1/2}$ (for serially uncorrelated returns)",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Two flaws",
          text:
            "The Sharpe ratio ranks losers oddly: $-5\\%$ at $5\\%$ volatility ($-1$) looks worse than $-5\\%$ at $10\\%$ " +
            "volatility ($-0.5$). And it inherits volatility's blindness to tails, skew and drawdowns. Smoothed returns " +
            "(stale marks on illiquid assets) create positive autocorrelation that understates volatility and inflates it.",
        },
      ],
    },
    {
      heading: "How precise is a Sharpe ratio?",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{SE}\\left(\\widehat{\\text{SR}}\\right) \\approx \\sqrt{\\frac{1 + \\text{SR}^{2}/2}{T}}",
          caption: "Lo (2002), i.i.d. returns: the $1$ is from estimating the mean, $\\frac{\\text{SR}^{2}}{2}$ from estimating the volatility",
        },
        {
          kind: "example",
          title: "Three good years",
          problem: "A manager shows an annual Sharpe of $2$ over $3$ years. Is the true Sharpe above $1$?",
          steps: [
            "$\\text{SE} \\approx \\sqrt{\\frac{1 + 2}{3}} = 1$.",
            "The estimate is one standard error above $1$.",
          ],
          answer: "Weak evidence — before even accounting for survivorship (you only see the managers who did well). Distinguishing a Sharpe of $1$ from $0.5$ at two standard errors takes about $16$ years.",
        },
      ],
    },
    {
      heading: "Tail losses without normality",
      blocks: [
        {
          kind: "formula",
          latex: "P\\left(\\text{return} < -L\\sigma\\right) \\le \\frac{1}{1 + (L + \\text{SR})^{2}}",
          caption: "Cantelli's inequality: valid for any distribution with the given Sharpe ratio",
        },
        {
          kind: "example",
          title: "How likely is a two-sigma annual loss?",
          problem: "A strategy has annual Sharpe $3$ and annual volatility $\\$50$M. Bound the probability of losing $\\$100$M in a year.",
          steps: [
            "$L = 2$: bound $= \\frac{1}{1 + 25} \\approx 3.8\\%$.",
            "Under normality the loss is $5$ standard deviations below the mean: probability $\\approx 2.9 \\times 10^{-7}$.",
          ],
          answer: "Normality can understate the chance of a large loss by five orders of magnitude; the distribution-free bound is conservative but honest.",
        },
      ],
    },
    {
      heading: "Capacity",
      blocks: [
        {
          kind: "prose",
          text:
            "If Sharpe were independent of size, you'd run every strategy at infinite volatility. It isn't: trading costs " +
            "grow with size, so Sharpe falls and eventually hits zero. Capacity is the largest expected PnL achievable while " +
            "the Sharpe ratio (or the return on GMV) stays above an acceptable level.",
        },
        {
          kind: "example",
          title: "Where PnL peaks",
          problem: "Sharpe falls with dollar volatility $v$ (millions) as $\\text{SR}(v) = 2 - 0.02v$.",
          steps: [
            "Expected PnL $v(2 - 0.02v)$ is maximized at $v = 50$, giving $\\$50$M with Sharpe $1$.",
            "If the firm requires Sharpe $\\ge 1.5$, the strategy can run only to $v = 25$ (PnL $\\$37.5$M).",
          ],
          answer: "Sharpe and size trade off; the right point depends on the fund's objectives.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 8, §8.6 Investment Performance Metrics (FAQ 8.1–8.2)" },
    { source: "Lo, “The Statistics of Sharpe Ratios”, Financial Analysts Journal (2002)", locator: "Standard errors and autocorrelation" },
    { source: "Pav, The Sharpe Ratio: Statistics and Applications (2021)", locator: "Comprehensive treatment" },
  ],
};
