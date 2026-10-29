import type { WikiArticle } from "../types";

export const factorHedgingWiki: WikiArticle = {
  conceptId: "factor-hedging",

  summary:
    "Hedging adds positions negatively correlated with a portfolio to cut its risk. The textbook beta hedge — short " +
    "beta times the core in an index future — is simple, widely used, and optimal only in a world with no costs, no " +
    "factor premia and a perfect hedge instrument. Hedging factor exposures with factor-mimicking portfolios brings " +
    "those complications in: the hedge adds idiosyncratic risk, costs money, may give up a premium and may cancel the " +
    "core's own alpha. The optimal hedge is therefore partial, and the risk-aversion parameter decides how partial.",

  sections: [
    {
      heading: "The beta hedge",
      blocks: [
        {
          kind: "formula",
          latex: "x_h = -\\beta x_c, \\qquad \\beta = \\rho\\frac{\\sigma_c}{\\sigma_h}, \\qquad \\sigma^{2}_{\\text{hedged}} = (1 - \\rho^{2})\\sigma_c^{2}x_c^{2}, \\qquad \\frac{\\text{SR}_{\\text{hedged}}}{\\text{SR}} = \\frac{1}{\\sqrt{1 - \\rho^{2}}}",
          caption: "Core $c$, hedge $h$ with zero expected return and correlation $\\rho$; maximizing Sharpe is the two-asset MVO with one position fixed",
        },
        {
          kind: "example",
          title: "Hedging with an index future",
          problem: "A core with $20\\%$ volatility, correlation $0.8$ with a future of $16\\%$ volatility.",
          steps: [
            "$\\beta = 0.8 \\times \\frac{0.20}{0.16} = 1$: short $\\$1$ of future per $\\$1$ of core.",
            "Hedged volatility $0.2\\sqrt{1 - 0.64} = 12\\%$; Sharpe rises by $\\frac{1}{0.6} \\approx 1.67$.",
          ],
          answer: "Beta comes from a time-series regression or a risk model, $\\beta = \\frac{\\mathbf{w}_h^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}_c}{\\mathbf{w}_h^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}_h}$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Hidden assumptions",
          text:
            "Accurate beta, a single instrument, negligible trading costs, and a hedge with negligible expected return. " +
            "The rest of this lesson and the next relax them.",
        },
      ],
    },
    {
      heading: "Hedging factor exposures",
      blocks: [
        {
          kind: "prose",
          text:
            "Sometimes the core portfolio is outside your control — say, the sum of many discretionary pods — and its factor " +
            "exposures $\\mathbf{b}_c$ must be managed centrally. The naive procedure buys $-\\mathbf{P}\\mathbf{b}_c$ of the " +
            "factor-mimicking portfolios $\\mathbf{P}$, zeroing every exposure. But each FMP carries idiosyncratic risk " +
            "$\\mathbf{M} = (\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}$ per unit of exposure.",
        },
        {
          kind: "formula",
          latex: "\\min_{\\mathbf{x}} (\\mathbf{b}_c + \\mathbf{x})^{\\top}\\boldsymbol{\\Omega}_f(\\mathbf{b}_c + \\mathbf{x}) + \\mathbf{x}^{\\top}\\mathbf{M}\\mathbf{x} \\quad\\Longrightarrow\\quad \\mathbf{x}^{*} = -(\\boldsymbol{\\Omega}_f + \\mathbf{M})^{-1}\\boldsymbol{\\Omega}_f\\mathbf{b}_c",
          caption: "Zero premia, no costs: the optimal hedge shrinks the full hedge $-\\mathbf{b}_c$, approaching it as the FMPs become well diversified",
        },
        {
          kind: "example",
          title: "One factor, partial hedge",
          problem: "Exposure $b = 1$, factor variance $0.04$, FMP idiosyncratic variance $m = 0.01$.",
          steps: [
            "Hedge fraction $\\frac{0.04}{0.04 + 0.01} = 0.8$.",
            "Remaining variance $\\frac{0.04 \\times 0.01}{0.05} = 0.008$, versus $0.01$ for a full hedge and $0.04$ unhedged.",
          ],
          answer: "Stopping at $80\\%$ beats full neutralization: the last fifth of exposure costs more idio risk than it removes.",
        },
      ],
    },
    {
      heading: "The realistic problem",
      blocks: [
        {
          kind: "list",
          items: [
            "**Priced factors**: hedging a factor with premium $\\mu$ gives up $\\mu$ per unit of exposure; with risk aversion $\\lambda$ the optimal residual exposure is $\\frac{\\mu}{\\lambda\\sigma_f^{2}}$, not zero. Unpriced factors are the natural ones to hedge.",
            "**Orthogonal alpha**: the hedge holds stocks and may short the very names whose idiosyncratic alpha the strategy lives on.",
            "**Trading costs**: include impact (square-root or quadratic); with quadratic costs the hedge becomes a multiperiod, LQR-type problem with partial adjustment.",
            "**Risk aversion matters**: in the simple beta hedge, variance reduction was free; here hedging trades volatility against expected PnL, and risk aversion picks the point.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A sensible policy",
          text:
            "Hedge large unpriced exposures with liquid instruments or FMPs, tolerate small or priced ones, bound factor risk " +
            "rather than forcing exact neutrality, and rebalance with a cost-aware rule.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 11, §11.1–11.2 (Procedures 11.1–11.2, Exercises 11.1–11.3)" },
    { source: "Grinold and Kahn, Active Portfolio Management", locator: "Ch. 3 and 14, beta and factor neutrality" },
  ],
};
