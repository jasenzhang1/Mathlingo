import type { WikiArticle } from "../types";

export const pairsTradingOptimalBandsWiki: WikiArticle = {
  conceptId: "pairs-trading-optimal-bands",

  summary: "Pairs trading bets that a stationary combination of two prices, the cointegration factor, returns to its mean. The simplest rule enters at bands one standard deviation away and exits at the mean, earning roughly the band width per trade. Modelling the factor as an Ornstein–Uhlenbeck process turns exit and entry into optimal stopping problems whose solutions are thresholds that depend on transaction costs, impatience and the speed of mean reversion.",

  sections: [
    {
      heading: "The factor and ad hoc bands",
      blocks: [
        {
          kind: "formula",
          latex: "\\varepsilon_t = AS^{(1)}_t + BS^{(2)}_t, \\qquad d\\varepsilon_t = \\kappa(\\theta - \\varepsilon_t)dt + \\sigma dW_t",
          caption: "Stationary standard deviation $\\sigma/\\sqrt{2\\kappa}$; half-life $\\ln 2/\\kappa$.",
        },
        {
          kind: "prose",
          text: "Ad hoc bands go long the portfolio when it is cheap (below $\\theta$ minus one standard deviation) and short when rich, closing at the mean. P&L clusters at multiples of the band width; wider bands earn more per trade but trade less and are more often left open at the end, so the Sharpe ratio first rises then falls with the band.",
        },
      ],
    },
    {
      heading: "Optimal exit and entry",
      blocks: [
        {
          kind: "formula",
          latex: "H_{+}(\\varepsilon) = \\sup_\\tau\\mathbb{E}\\left[e^{-\\rho\\tau}(\\varepsilon_\\tau - c)\\right], \\qquad G_{+}(\\varepsilon) = \\sup_\\tau\\mathbb{E}\\left[e^{-\\rho\\tau}\\left(H_{+}(\\varepsilon_\\tau) - \\varepsilon_\\tau - c\\right)\\right]",
          caption: "Exit is solved first; its value is the payoff of the entry problem.",
        },
        {
          kind: "prose",
          text: "Each value function solves $\\rho H = \\kappa(\\theta - \\varepsilon)H' + \\tfrac{1}{2}\\sigma^2H''$ in its continuation region, with value matching and smooth pasting at the threshold, so $F(\\varepsilon^{*}) = (\\varepsilon^{*} - c)F'(\\varepsilon^{*})$ for the increasing solution $F$.",
        },
        {
          kind: "example",
          title: "A threshold without mean reversion",
          problem: "If $\\kappa \\to 0$, the exit threshold is $\\varepsilon^{*} = c + \\sigma/\\sqrt{2\\rho}$. With $c = 0.01$, $\\sigma = 0.2$ and $\\rho = 2$:",
          answer: "Mean reversion lowers the threshold (high levels do not persist), as does impatience.",
          steps: [
            "$\\sigma/\\sqrt{2\\rho} = 0.2/2 = 0.1$.",
            "$\\varepsilon^{*} = 0.11$.",
          ],
        },
        {
          kind: "list",
          items: [
            "Entry triggers sit further from the mean than exits because costs are paid on both legs.",
            "The double-sided problem has long and short entry triggers with a no-trade band between, and each entry trigger mirrors an exit of the opposite trade.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Breaks",
          text: "The model assumes the relationship persists. Structural breaks, parameter instability and leg risk at high frequency are the real dangers; use stop-losses, holding limits and rolling re-estimation.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 11, §11.1–11.3 Ad hoc bands and optimal band selection" },
  ],
};
