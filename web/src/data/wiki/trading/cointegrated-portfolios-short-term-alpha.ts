import type { WikiArticle } from "../types";

export const cointegratedPortfoliosShortTermAlphaWiki: WikiArticle = {
  conceptId: "cointegrated-portfolios-short-term-alpha",

  summary:
    "Pairs trading with bands takes all-or-nothing positions. A smoother approach holds continuously " +
    "adjusted positions in many assets whose log prices share a mean-reverting factor $\\alpha_t$. The factor " +
    "acts as short-term alpha: it sets each asset’s expected return. An exponential-utility investor’s " +
    "optimal dollar positions are linear in $\\alpha_t$ — a Merton-style term $\\frac{1}{\\gamma}\\Sigma^{-1}(\\text{drift})$ " +
    "plus a hedge against future changes in the factor.",

  sections: [
    {
      heading: "Setup",
      blocks: [
        {
          kind: "list",
          items: [
            "Log prices of $n$ assets are cointegrated: a combination, such as $\\alpha_t = \\log Y^{(1)}_t - 0.8\\log Y^{(2)}_t$, is stationary.",
            "Each asset’s drift depends on the factor through loadings $\\mathbf{b}$: when $\\alpha$ is far from its mean, the assets are expected to move so as to close the gap (error correction).",
            "The factor itself follows an OU process; with rate $\\kappa$ and volatility $\\eta$ its stationary variance is $\\eta^2/(2\\kappa)$ — e.g. $0.01/10 = 0.001$ for $\\kappa = 5$, $\\eta = 0.1$.",
            "The investor holds dollar positions $\\boldsymbol{\\pi}_t$ and maximises $\\mathbb{E}[-e^{-\\gamma X_T}]$, ignoring transaction costs.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Trading the factor, not the prices",
          text:
            "To hold the factor $\\log Y^{(1)} - 0.8\\log Y^{(2)}$ with $\\$1{,}000$ of exposure to the first asset, short " +
            "$\\$800$ of the second: dollar positions proportional to the weights expose you to the factor only, since " +
            "$\\$1$ in an asset is (to first order) a unit exposure to its log price.",
        },
      ],
    },

    {
      heading: "The optimal positions",
      blocks: [
        {
          kind: "prose",
          text:
            "With $H = -\\exp\\lbrace -\\gamma(x + h(t, \\alpha))\\rbrace$, the HJB separates. The supremum over $\\boldsymbol{\\pi}$ " +
            "is a concave quadratic, as in Merton, but the drift now depends on $\\alpha$ and $h$ depends on $\\alpha$ too:",
        },
        {
          kind: "formula",
          latex: "\\boldsymbol{\\pi}^{*}(t, \\alpha) = \\frac{1}{\\gamma}\\,\\Sigma^{-1}\\left(\\mathbf{b}\\,\\alpha + \\text{correction from } \\partial_\\alpha h\\right)",
          caption: "Linear in $\\alpha$, with time-dependent coefficients",
        },
        {
          kind: "list",
          items: [
            "The first part is Merton applied to the current expected returns.",
            "The correction hedges changes in $\\alpha$: holdings that gain when $\\alpha$ moves adversely are worth more. Because it depends on the time left, positions change over time even for a fixed $\\alpha$.",
            "$h$ is quadratic in $\\alpha$; the book solves its PDE through a change of measure under which the factor’s dynamics simplify, reducing it to Riccati-type ODEs.",
            "Doubling $\\gamma$ halves every position.",
          ],
        },
        {
          kind: "example",
          title: "The Merton part for two correlated assets",
          problem: "$\\Sigma = \\begin{bmatrix} 0.04 & 0.02 \\\\ 0.02 & 0.04 \\end{bmatrix}$, current drifts $\\boldsymbol{\\mu} = [0.02, -0.02]$ from the factor, and $\\gamma = 0.001$. Find $\\frac{1}{\\gamma}\\Sigma^{-1}\\boldsymbol{\\mu}$.",
          steps: [
            "$\\det\\Sigma = 0.0016 - 0.0004 = 0.0012$, so $\\Sigma^{-1} = \\frac{1}{0.0012}\\begin{bmatrix} 0.04 & -0.02 \\\\ -0.02 & 0.04 \\end{bmatrix}$.",
            "$\\Sigma^{-1}\\boldsymbol{\\mu} = \\frac{1}{0.0012}[0.0008 + 0.0004,\\; -0.0004 - 0.0008] = [1, -1]$.",
            "Divide by $\\gamma$: $[\\$1{,}000, -\\$1{,}000]$.",
          ],
          answer: "Long $\\$1{,}000$ of asset $1$ and short $\\$1{,}000$ of asset $2$. Their positive correlation makes the long–short pair cheap in risk, so the positions are larger than each asset alone would justify ($0.02/(0.001 \\times 0.04) = \\$500$).",
        },
      ],
    },

    {
      heading: "Compared with bands, and what is missing",
      blocks: [
        {
          kind: "table",
          headers: ["", "Optimal bands (§11.3)", "Continuous positions (§11.4)"],
          rows: [
            ["Position", "All in or all out", "Scales continuously with $\\alpha$"],
            ["Costs", "Built into triggers", "Ignored"],
            ["Assets", "Two", "Many, sharing the factor"],
            ["Decision", "Optimal stopping", "Stochastic control (Merton with a factor)"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Ignoring costs means trading too much",
          text:
            "Because positions track $\\alpha$ continuously, the strategy trades all the time. Spreads and impact can " +
            "erase a small expected edge. If profit is $1.5E - 0.2E^2$ (exposure $E$ in millions, impact growing with " +
            "size), it peaks at $E = 1.5/0.4 = 3.75$ million — capacity is limited. Parameters are also unstable over " +
            "long horizons, so estimate them on rolling windows.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 11, Pairs Trading and Statistical Arbitrage Strategies (§11.4)" },
  ],
};
