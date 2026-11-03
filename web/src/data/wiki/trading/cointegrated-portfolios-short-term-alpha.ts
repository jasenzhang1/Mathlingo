import type { WikiArticle } from "../types";

export const cointegratedPortfoliosShortTermAlphaWiki: WikiArticle = {
  conceptId: "cointegrated-portfolios-short-term-alpha",

  summary: "With many assets whose log prices share a mean-reverting combination, the deviation acts as short-term alpha in each asset’s drift. An investor with exponential utility who holds continuously adjusted dollar positions solves a Merton-like problem in which the factor is a state variable: the value is quadratic in the factor, and the optimal positions are linear in it, combining a myopic term with an intertemporal hedge against changes in the factor.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "prose",
          text: "Log prices follow correlated diffusions whose drifts include $b_i\\alpha_t$, where $\\alpha_t$ is a linear combination of log prices. Because it is itself a combination of the prices, $\\alpha$ mean-reverts; in discrete time the system is a VAR whose levels matrix is singular with one non-zero eigenvalue, the mean-reversion speed.",
        },
        {
          kind: "formula",
          latex: "H = -\\exp\\left\\{-\\gamma\\left(x + h(t, \\alpha)\\right)\\right\\}, \\quad h = h_0(t) + h_1(t)\\alpha + h_2(t)\\alpha^2, \\quad \\boldsymbol{\\pi}^{*}_t \\text{ linear in } \\alpha_t",
          caption: "Prices drop out of the value function; positions scale with the factor and with $1/\\gamma$.",
        },
      ],
    },
    {
      heading: "Intuition and numbers",
      blocks: [
        {
          kind: "example",
          title: "A myopic position",
          problem: "Two correlated assets with $\\Sigma = \\begin{bmatrix} 0.04 & 0.02 \\\\ 0.02 & 0.04 \\end{bmatrix}$, factor-implied drifts $[0.02, -0.02]$ and $\\gamma = 0.001$.",
          answer: "The full solution adds a hedge term from $\\partial_\\alpha h$, because changes in $\\alpha$ alter future opportunities.",
          steps: [
            "$\\Sigma^{-1}\\boldsymbol{\\mu} = \\frac{1}{0.0012}[0.0012, -0.0012] = [1, -1]$.",
            "Dividing by $\\gamma$: positions of \\$1{,}000 and $-\\$1{,}000$.",
          ],
        },
        {
          kind: "list",
          items: [
            "Positions reverse as $\\alpha$ crosses its mean, earning the reversion.",
            "Doubling $\\gamma$ halves every position.",
            "Without transaction costs the strategy rebalances continuously; with costs a no-trade region appears.",
            "Crowding: many investors on the same factor speed up its reversion and cut profits.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Bands versus continuous positions",
          text: "Section 11.3 decides when to hold a fixed portfolio, with costs; Section 11.4 decides how much to hold at every instant, without costs. Practice sits between them.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 11, §11.4 Co-integrated log prices with short-term alpha" },
  ],
};
