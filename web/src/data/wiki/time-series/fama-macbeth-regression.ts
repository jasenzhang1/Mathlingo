import type { WikiArticle } from "../types";

export const famaMacbethRegressionWiki: WikiArticle = {
  conceptId: "fama-macbeth-regression",

  summary:
    "Asset pricing asks whether exposure to a characteristic or factor earns a premium. Fama and MacBeth (1973) " +
    "answer it in two passes: run a cross-sectional regression of returns on exposures every period, then average the " +
    "slopes over time. The trick is the standard error: it comes from the time-series variation of the slopes, which " +
    "automatically absorbs the strong cross-sectional correlation of returns that ruins pooled OLS standard errors.",

  sections: [
    {
      heading: "The procedure",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "First pass (if exposures are estimated): for each asset, estimate betas $\\hat{\\beta}_i$ from a time-series regression of its returns on the factors, often on a rolling window.",
            "Second pass: each period $t$, regress the cross-section of returns on exposures: $r_{i,t} = \\lambda_{0,t} + \\lambda_{1,t}\\hat{\\beta}_{i,t-1} + e_{i,t}$.",
            "Average: $\\hat{\\lambda}_1 = \\frac{1}{T}\\sum_t\\hat{\\lambda}_{1,t}$.",
            "Standard error: $\\text{se}(\\hat{\\lambda}_1) = \\frac{s_\\lambda}{\\sqrt{T}}$, with $s_\\lambda$ the sample standard deviation of the $\\hat{\\lambda}_{1,t}$.",
          ],
        },
        {
          kind: "prose",
          text:
            "Each period's slope is a portfolio return: $\\hat{\\lambda}_{1,t}$ is the return on a zero-cost portfolio with unit exposure. " +
            "Treating the $T$ slopes as $T$ observations makes cross-sectional dependence harmless, since it lives inside each $\\hat{\\lambda}_{1,t}$. " +
            "Pooled OLS over all $NT$ observations would treat thousands of correlated returns as independent and report standard errors that are far too small.",
        },
        {
          kind: "example",
          title: "A Fama–MacBeth t-statistic",
          problem:
            "Over $T = 120$ months the monthly slopes average $0.5\\%$ with standard deviation $4\\%$. Find the standard error and $t$-statistic.",
          steps: [
            "$\\text{se} = 4\\%/\\sqrt{120} \\approx 0.365\\%$.",
            "$t = 0.5/0.365 \\approx 1.37$.",
          ],
          answer: "Not significant at conventional levels, even though a $0.5\\%$ monthly premium ($6\\%$ a year) is economically large: slopes are noisy month to month.",
        },
      ],
    },

    {
      heading: "Errors in variables and portfolios",
      blocks: [
        {
          kind: "prose",
          text:
            "Estimated betas are measured with error, $\\hat{\\beta}_i = \\beta_i + \\xi_i$, which attenuates $\\hat{\\lambda}_1$ toward zero " +
            "by the reliability ratio $\\frac{\\text{Var}(\\beta)}{\\text{Var}(\\beta) + \\text{Var}(\\xi)}$ and biases the intercept up. " +
            "The classic fix (Black–Jensen–Scholes, Fama–MacBeth) sorts stocks into portfolios by pre-ranking beta and uses portfolio betas, " +
            "whose estimation noise is averaged away, at the cost of fewer cross-sectional observations.",
        },
        {
          kind: "prose",
          text:
            "The Fama–MacBeth standard error also ignores that the betas were estimated. Shanken (1992) inflates the variance by " +
            "$1 + \\boldsymbol{\\lambda}^T\\boldsymbol{\\Sigma}_f^{-1}\\boldsymbol{\\lambda}$ (one plus the factors' squared Sharpe ratio) and adds the factor-mean variance term; " +
            "the correction matters most for factors with high Sharpe ratios.",
        },
      ],
    },

    {
      heading: "What it does and does not fix",
      blocks: [
        {
          kind: "table",
          headers: ["Problem", "Fama–MacBeth handles it?", "Remedy if not"],
          rows: [
            ["Cross-sectional correlation of residuals", "Yes", "—"],
            ["Autocorrelated slopes (persistent characteristics, overlapping returns)", "No", "Newey–West on the $\\hat{\\lambda}_{1,t}$"],
            ["Firm effects (a firm's residuals correlated over time)", "No", "Cluster by firm, or two-way clustering"],
            ["Estimated betas", "No", "Portfolios; Shanken correction"],
            ["Survivorship (only surviving stocks)", "No", "Use the full point-in-time universe with delisting returns"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Equivalent to pooled OLS in one case",
          text:
            "If the exposures do not change over time, every period's slope is the same linear function of that period's returns, so the average of the slopes equals the pooled OLS slope. Only the standard errors differ.",
        },
      ],
    },
  ],

  references: [
    { source: "Fama & MacBeth, “Risk, Return, and Equilibrium: Empirical Tests”, Journal of Political Economy 1973", locator: "The two-pass procedure" },
    { source: "Cochrane, Asset Pricing (rev. ed.)", locator: "Ch. 12, Regression-Based Tests of Linear Factor Models" },
    { source: "Shanken, “On the Estimation of Beta-Pricing Models”, Review of Financial Studies 1992", locator: "The errors-in-variables correction" },
  ],
};
