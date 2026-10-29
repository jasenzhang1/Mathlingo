import type { WikiArticle } from "../types";

export const meanVarianceOptimizationWiki: WikiArticle = {
  conceptId: "mean-variance-optimization",

  summary:
    "Given expected returns $\\boldsymbol{\\alpha}$ and a covariance $\\boldsymbol{\\Omega}$ from a factor model, " +
    "mean-variance optimization turns them into a portfolio: maximize expected PnL subject to a volatility budget. The " +
    "answer is strikingly simple — $\\mathbf{w} \\propto \\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}$, with Sharpe ratio " +
    "$\\sqrt{\\boldsymbol{\\alpha}^{\\top}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}}$ — and almost everything in " +
    "portfolio construction is a variation on it. It rests on Lagrange Multipliers and Positive Definite Matrices.",

  sections: [
    {
      heading: "Why mean and variance",
      blocks: [
        {
          kind: "prose",
          text:
            "Expand a concave, increasing utility to second order around current wealth: expected utility is approximately " +
            "$V'(W_0)\\,\\boldsymbol{\\alpha}^{\\top}\\mathbf{w} + \\frac{V''(W_0)}{2}\\,\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}$ " +
            "— a trade-off between mean and variance with risk aversion $\\lambda = -\\frac{V''}{V'}$. Exponential utility " +
            "has constant $\\lambda$; log utility has $\\lambda = \\frac{1}{W_0}$, so positions grow with wealth. Conversely, " +
            "choosing on mean and variance alone implies quadratic utility, which is unsatisfying globally but fine as a " +
            "local approximation — and higher moments can't be estimated well anyway.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why single-period",
          text:
            "Practitioners overwhelmingly optimize one period at a time: it is interpretable, solvable in seconds, matches " +
            "short horizons, and multi-period theory offers few strong results. The exception — trading costs and decaying " +
            "alphas — gets its own lesson later.",
        },
      ],
    },
    {
      heading: "The solution",
      blocks: [
        {
          kind: "formula",
          latex: "\\max_{\\mathbf{w}} \\boldsymbol{\\alpha}^{\\top}\\mathbf{w} \\ \\text{s.t.} \\ \\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w} \\le \\sigma^{2} \\quad\\Longrightarrow\\quad \\mathbf{w}^{*} = \\frac{\\sigma}{\\sqrt{\\boldsymbol{\\alpha}^{\\top}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}}}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}, \\quad \\text{SR}^{*} = \\sqrt{\\boldsymbol{\\alpha}^{\\top}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}}",
          caption: "Expected PnL $\\sigma\\,\\text{SR}^{*}$; the volatility constraint always binds",
        },
        {
          kind: "list",
          items: [
            "**Scale-free in alpha**: doubling every alpha gives the same portfolio. With a good risk model and accurate relative alphas, miscalibrating their overall size is not catastrophic.",
            "**Equivalent forms**: maximize $\\boldsymbol{\\alpha}^{\\top}\\mathbf{w} - \\frac{\\lambda}{2}\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}$ (solution $\\frac{1}{\\lambda}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}$, matching the budget when $\\lambda = \\frac{\\text{SR}^{*}}{\\sigma}$), or minimize variance subject to a return target. A penalty equal to a constraint's shadow price reproduces the constrained solution.",
            "**Maximizing Sharpe directly** is ill-posed: $\\text{SR}(t\\mathbf{w}) = \\text{SR}(\\mathbf{w})$, so the size must be pinned by a budget.",
          ],
        },
        {
          kind: "formula",
          latex: "\\boldsymbol{\\Omega} = \\mathbf{V}\\mathbf{C}\\mathbf{V} \\quad\\Longrightarrow\\quad \\mathbf{v} = \\mathbf{V}\\mathbf{w}^{*} \\propto \\mathbf{C}^{-1}\\mathbf{s}, \\qquad \\text{SR}^{*} = \\sqrt{\\mathbf{s}^{\\top}\\mathbf{C}^{-1}\\mathbf{s}}",
          caption: "In dollar volatilities $\\mathbf{v}$: allocate by asset Sharpe ratios $\\mathbf{s}$ and correlations $\\mathbf{C}$ — for uncorrelated assets, in proportion to Sharpe",
        },
        {
          kind: "example",
          title: "Two correlated assets",
          problem: "Unit volatilities, Sharpe ratios $0.5$ and $0.2$, correlation $0.6$.",
          steps: [
            "$\\mathbf{v} \\propto \\frac{1}{1 - \\rho^{2}}[s_1 - \\rho s_2, \\ s_2 - \\rho s_1] = \\frac{1}{0.64}[0.38, -0.10]$.",
            "Asset 2 is shorted although its Sharpe is positive: since $\\frac{s_2}{s_1} = 0.4 < \\rho = 0.6$, it is worth more as a hedge than as a bet.",
            "$\\text{SR}^{*} = \\sqrt{\\frac{s_1^{2} + s_2^{2} - 2\\rho s_1 s_2}{1 - \\rho^{2}}} = \\sqrt{\\frac{0.17}{0.64}} \\approx 0.515$.",
          ],
          answer: "Slightly better than holding asset 1 alone ($0.5$) — and fragile, as the next lessons show.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Reading the precision matrix",
          text:
            "Off-diagonal entries of $\\boldsymbol{\\Omega}^{-1}$ are proportional to minus the partial correlations. A stock's " +
            "position is its own alpha, reduced by the alphas of stocks it is partially correlated with: correlated alphas " +
            "partly duplicate each other.",
        },
      ],
    },
    {
      heading: "Trading in factor space and idio space",
      blocks: [
        {
          kind: "prose",
          text:
            "Factor-mimicking portfolios $\\mathbf{P} = \\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B}(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}$ " +
            "minimize tracking error to each factor; their expected returns are the factor premia. Ignoring their small " +
            "idiosyncratic risk, factor investing is an $m$-asset MVO: $\\mathbf{w}_f \\propto \\boldsymbol{\\Omega}_f^{-1}\\boldsymbol{\\mu}_f$. " +
            "To harvest only orthogonal alpha — “the golden currency” — maximize return under a volatility budget with " +
            "$\\mathbf{B}^{\\top}\\mathbf{w} = \\mathbf{0}$, or simply hold a portfolio proportional to $\\boldsymbol{\\Omega}_\\epsilon^{-1}\\boldsymbol{\\alpha}_\\perp$.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 8, §8.1–8.4 and §8.7 Appendix (convex optimization, duality, shadow prices)" },
    { source: "Grinold and Kahn, Active Portfolio Management", locator: "Ch. 14, Portfolio Construction" },
    { source: "Boyd and Vandenberghe, Convex Optimization", locator: "Ch. 4.4 (quadratic programs) and Ch. 5 (duality)" },
  ],
};
