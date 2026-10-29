import type { WikiArticle } from "../types";

export const crossSectionalFactorRegressionWiki: WikiArticle = {
  conceptId: "cross-sectional-factor-regression",

  summary:
    "Fundamental (characteristic) factor models are the industry standard: interpretable, refined since the 1970s, and " +
    "the workhorse of alpha research. Their loadings are known characteristics — industry membership, value, momentum, " +
    "size — and each period the factor returns are estimated by a weighted cross-sectional regression of that day's " +
    "returns on the loadings. The regression's weights, its frequent rank deficiency, and the factor-mimicking portfolios " +
    "it implicitly builds are the subject of this lesson. It builds on Weighted Least Squares, Restricted Least Squares " +
    "and Fama–MacBeth Regression.",

  sections: [
    {
      heading: "The process",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "**Ingest data**: check types, coverage, missingness and outliers against the previous period.",
            "**Winsorize returns** (next lessons) — carefully.",
            "**Generate loadings** $\\mathbf{B}_t$ by transforming and combining raw characteristics (typically standardized styles plus $0/1$ industry and country dummies, often with an all-ones country column).",
            "**Select the estimation universe**: tradable, with well-discovered prices, and relevant to the strategies that will use the model.",
            "**Regress** $\\mathbf{r}_t$ on $\\mathbf{B}_t$ each period to get $\\hat{\\mathbf{f}}_t$ and residuals $\\hat{\\boldsymbol{\\epsilon}}_t$.",
            "**Estimate covariances** of factor and idiosyncratic returns from those time series.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Which price?",
          text:
            "Returns must be computed from prices at which you could actually have traded. Many exchanges replace the " +
            "order book with a closing auction; at shorter periodicities you must decide bid, ask or mid and how to treat " +
            "noise. The less liquid the universe, the longer the period should be.",
        },
      ],
    },
    {
      heading: "Weighted least squares",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\mathbf{f}}_t = \\arg\\min_{\\mathbf{f}} (\\mathbf{r}_t - \\mathbf{B}_t\\mathbf{f})^{\\top}\\mathbf{W}(\\mathbf{r}_t - \\mathbf{B}_t\\mathbf{f}) = (\\mathbf{B}_t^{\\top}\\mathbf{W}\\mathbf{B}_t)^{-1}\\mathbf{B}_t^{\\top}\\mathbf{W}\\mathbf{r}_t, \\qquad \\mathbf{W} = \\boldsymbol{\\Omega}_\\epsilon^{-1}",
          caption: "Weighting by inverse idiosyncratic variance makes the residuals homoskedastic — the GLS/BLUE choice",
        },
        {
          kind: "prose",
          text:
            "Least squares is unbiased, and unbiasedness matters: small biases in factor (hence residual) returns compound " +
            "in multi-period attribution. The estimates have covariance $(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}$. " +
            "Each row of $(\\mathbf{B}^{\\top}\\mathbf{W}\\mathbf{B})^{-1}\\mathbf{B}^{\\top}\\mathbf{W}$ is a **factor-mimicking " +
            "portfolio**: an investable portfolio whose return is exactly the estimated factor return. In practice " +
            "$\\boldsymbol{\\Omega}_\\epsilon$ is unknown in advance, and $\\sqrt{\\text{market cap}}$ is a common proxy weight.",
        },
        {
          kind: "example",
          title: "A tiny regression",
          problem: "Three stocks with returns $[0.03, 0.01, 0.02]$, country loadings $[1, 1, 1]$, a style with loadings $[1, 0, -1]$, equal weights.",
          steps: [
            "The columns are orthogonal, so each coefficient is a separate projection.",
            "Country: $\\frac{0.03 + 0.01 + 0.02}{3} = 0.02$. Style: $\\frac{0.03 - 0.02}{2} = 0.005$.",
            "Fitted: $[0.025, 0.02, 0.015]$; residuals $[0.005, -0.01, 0.005]$.",
          ],
          answer: "$\\hat{\\mathbf{f}} = [0.02, 0.005]$. With unequal residual variances, the noisier stocks would count for less.",
        },
      ],
    },
    {
      heading: "Rank-deficient loadings",
      blocks: [
        {
          kind: "prose",
          text:
            "If every stock belongs to exactly one industry, the industry dummies sum to the country column of ones: " +
            "$\\mathbf{B}\\mathbf{v} = \\mathbf{0}$ for $\\mathbf{v} = [1, -1, \\dots, -1]$. Likewise industries and countries " +
            "in a global model. $\\mathbf{B}^{\\top}\\mathbf{W}\\mathbf{B}$ is singular and factor returns are not identified.",
        },
        {
          kind: "table",
          headers: ["Fix", "Pros", "Cons"],
          rows: [
            ["Drop a factor", "Familiar formula", "Lose interpretability — the PM whose industry was dropped will tell you"],
            ["Ridge penalty $\\lambda\\|\\mathbf{f}\\|^{2}$", "Simple", "Factor returns become biased"],
            ["Constraints $\\mathbf{C}\\mathbf{f} = \\mathbf{a}$ (Heston–Rouwenhorst)", "Keeps every factor; meaningful returns, e.g. cap-weighted industry returns sum to zero", "Slightly more complex"],
          ],
        },
        {
          kind: "formula",
          latex: "\\mathbf{f} = \\left(\\mathbf{I} - \\mathbf{V}(\\mathbf{C}\\mathbf{V})^{-1}\\mathbf{C}\\right)\\mathbf{f}^{*} + \\mathbf{V}(\\mathbf{C}\\mathbf{V})^{-1}\\mathbf{a}",
          caption: "The constrained solution, from the minimum-norm solution $\\mathbf{f}^{*}$ and a null-space basis $\\mathbf{V}$; requires $\\mathbf{C}\\mathbf{V}$ invertible",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Constraints don't change risk",
          text:
            "Different valid constraints change the factor returns by a null-space vector: $\\mathbf{f} = \\mathbf{H}\\mathbf{f}^{*} + " +
            "\\text{const}$ with $\\mathbf{B}\\mathbf{H} = \\mathbf{B}$. So $\\mathbf{B}\\mathbf{f}$ — and every portfolio's " +
            "factor variance $\\mathbf{w}^{\\top}\\mathbf{B}\\mathbf{H}\\hat{\\boldsymbol{\\Omega}}_f\\mathbf{H}^{\\top}\\mathbf{B}^{\\top}\\mathbf{w}$ " +
            "— is unchanged. Pick the constraint that makes factor returns easiest to read.",
        },
        {
          kind: "example",
          title: "Two stocks, two industries, one country",
          problem: "Stock 1 (industry A) returns $3\\%$, stock 2 (industry B) returns $1\\%$. Impose equal-weighted industry returns summing to zero.",
          steps: [
            "Model: $0.03 = c + a$, $0.01 = c + b$, with $a + b = 0$.",
            "Adding: $0.04 = 2c$, so $c = 0.02$; then $a = 0.01$, $b = -0.01$.",
          ],
          answer: "The country factor carries the average move; industries carry deviations from it.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 6, §6.1 The Inputs and the Process and §6.2 Cross-Sectional Regression" },
    { source: "Heston and Rouwenhorst, “Does industrial structure explain the benefits of international diversification?”, JFE (1994)", locator: "Constrained country–industry regressions" },
    { source: "Menchero, Orr and Wang, “The Barra US Equity Model (USE4)”, MSCI methodology notes (2011)", locator: "Cross-sectional regression with constraints" },
  ],
};
