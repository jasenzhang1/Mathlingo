import type { WikiArticle } from "../types";

export const pairsTradingOptimalBandsWiki: WikiArticle = {
  conceptId: "pairs-trading-optimal-bands",

  summary:
    "When two assets are cointegrated, a linear combination of their prices — the cointegration factor — " +
    "mean-reverts. A pairs trader buys the combination when it is unusually low and sells when it has " +
    "recovered. The simple version uses ad hoc bands one standard deviation from the mean. The optimal " +
    "version treats exit and entry as optimal stopping problems: exit first, then entry, with transaction " +
    "costs pushing both triggers further from the mean.",

  sections: [
    {
      heading: "The cointegration factor",
      blocks: [
        {
          kind: "formula",
          latex: "\\varepsilon_t = a\\,S_t^{(1)} + b\\,S_t^{(2)}, \\qquad d\\varepsilon_t = \\kappa(\\theta - \\varepsilon_t)\\,dt + \\sigma\\,dW_t",
          caption: "The portfolio of the two assets follows an Ornstein–Uhlenbeck process",
        },
        {
          kind: "list",
          items: [
            "Estimate the weights $a, b$ by regressing one price on the other (or from a VAR), then test the residual for stationarity.",
            "Fit an AR(1) $\\varepsilon_{t+1} = c + \\beta\\varepsilon_t + e_t$ at step $\\Delta t$; then $\\kappa = -\\ln\\beta/\\Delta t$, $\\theta = c/(1 - \\beta)$ and $\\sigma = s_e\\sqrt{2\\kappa/(1 - \\beta^2)}$.",
            "The stationary standard deviation is $\\sigma/\\sqrt{2\\kappa}$, the natural unit for band widths.",
          ],
        },
        {
          kind: "example",
          title: "From minute data to a daily speed",
          problem: "An AR(1) at one-minute steps gives $\\beta = 0.99$. With $390$ minutes per trading day, what is $\\kappa$ per day and the half-life?",
          steps: [
            "$\\kappa = -\\ln 0.99 \\times 390 = 0.01005 \\times 390 \\approx 3.920$ per day.",
            "Half-life: $\\ln 2/\\kappa \\approx 0.177$ days, about $69$ minutes.",
          ],
          answer: "Deviations halve in about an hour — fast enough for several round trips a day.",
        },
      ],
    },

    {
      heading: "Ad hoc bands",
      blocks: [
        {
          kind: "prose",
          text:
            "Enter long when $\\varepsilon_t$ falls to $\\theta - m s$ ($s$ the stationary standard deviation), exit at " +
            "$\\theta$, and mirror this for shorts. Narrow bands trade often but earn little per trade, and costs eat " +
            "them; wide bands earn more per trade but trade rarely. The Sharpe ratio as a function of band width " +
            "therefore rises and then falls.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Costs on both legs",
          text:
            "A round trip pays costs at entry and at exit. Entering at $\\theta - 0.1$ and exiting at $\\theta$ with a " +
            "cost of $0.01$ per leg earns $0.1 - 0.02 = 0.08$ per unit, not $0.1$.",
        },
      ],
    },

    {
      heading: "Optimal exit and entry",
      blocks: [
        {
          kind: "prose",
          text:
            "**Exit.** Holding the long portfolio, the agent chooses when to sell it for $\\varepsilon_\\tau - c$:",
        },
        {
          kind: "formula",
          latex: "H^{+}(\\varepsilon) = \\sup_{\\tau}\\mathbb{E}\\left[e^{-\\rho\\tau}(\\varepsilon_\\tau - c)\\right], \\qquad \\rho F = \\kappa(\\theta - \\varepsilon)F' + \\tfrac{1}{2}\\sigma^2 F''",
          caption: "In the continuation region $H^{+} = A\\,F(\\varepsilon)$, with $F$ the increasing solution",
        },
        {
          kind: "prose",
          text:
            "Value matching and smooth pasting at the threshold $\\varepsilon^{*}$ give $AF(\\varepsilon^{*}) = \\varepsilon^{*} - c$ " +
            "and $AF'(\\varepsilon^{*}) = 1$, so $\\varepsilon^{*} - c = F(\\varepsilon^{*})/F'(\\varepsilon^{*})$ — solved " +
            "numerically. With no mean reversion ($\\kappa \\to 0$), $F$ is exponential and $\\varepsilon^{*} = c + \\sigma/\\sqrt{2\\rho}$.",
        },
        {
          kind: "prose",
          text:
            "**Entry.** Buying the portfolio costs $\\varepsilon + c$ and delivers the exit problem’s value, so the entry " +
            "reward is $H^{+}(\\varepsilon) - \\varepsilon - c$. That is why exit is solved first. The entry problem has " +
            "the same structure, with the decreasing solution $G$ of the ODE and a trigger $\\varepsilon_{*}$ below $\\theta$.",
        },
        {
          kind: "example",
          title: "Profit per round trip",
          problem: "With $\\theta = 0$, optimal triggers are $\\varepsilon_{*} = -0.08$ (enter long) and $\\varepsilon^{*} = 0.06$ (exit), with $c = 0.01$ per leg. Round trips take $0.5$ days on average. What is the expected profit per $21$-day month?",
          steps: [
            "Per round trip: $0.06 - (-0.08) - 2 \\times 0.01 = 0.12$.",
            "Round trips per month: $21/0.5 = 42$, so about $42 \\times 0.12 = 5.04$.",
          ],
          answer: "About $5.04$ per unit of the portfolio. Note the exit is *above* the mean: with costs and discounting, it pays to wait for an overshoot.",
        },
        {
          kind: "table",
          headers: ["Parameter up", "Effect"],
          rows: [
            ["Discount rate $\\rho$ (impatience)", "Triggers move toward the mean: take profits sooner"],
            ["Mean-reversion speed $\\kappa$", "Exit threshold falls: the factor returns quickly, so there is less to wait for"],
            ["Transaction cost $c$", "Entry moves further from the mean and exit further beyond it"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "When the ad hoc rule wins",
          text:
            "Optimal triggers are sensitive to $\\kappa$ and $\\sigma$. If those are poorly estimated or unstable, " +
            "simple bands can be more robust. Either way, add stop-losses and a maximum holding time in case the " +
            "cointegration relation breaks.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 11, Pairs Trading and Statistical Arbitrage Strategies (§11.1–11.3)" },
  ],
};
