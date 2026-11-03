import type { WikiArticle } from "../types";

export const liquidationWithOrderImbalanceWiki: WikiArticle = {
  conceptId: "liquidation-with-order-imbalance",

  summary: "The final model combines limit-order execution with the imbalance regimes. Buy-MO arrival rates and price jumps depend on the regime, which switches as a Markov chain, so the agent’s value and optimal depth depend on time, inventory and the current regime. A seller posts deeper when the book is buy-heavy, since buyers are plentiful and prices tend to rise, and closer to the mid when it is sell-heavy.",

  sections: [
    {
      heading: "The DPE",
      blocks: [
        {
          kind: "prose",
          text: "The value $H(t, x, S, z, q) = x + qS + h(t, z, q)$ changes when her LO fills, when MOs that do not reach her depth move the price, when the price jumps exogenously, and when the regime switches. The switching term $\\sum_j G_{zj}[h(t, j, q) - h(t, z, q)]$ couples the equations across regimes.",
        },
        {
          kind: "formula",
          latex: "\\delta^{*}(t, z, q) = \\frac{1}{\\kappa} - \\left[h(t, z, q - 1) - h(t, z, q)\\right] + \\text{(expected-jump correction)}",
          caption: "The same structure as Chapter 8, now regime by regime.",
        },
      ],
    },
    {
      heading: "What the regime changes",
      blocks: [
        {
          kind: "example",
          title: "Fill rates by regime",
          problem: "Buy MOs arrive at $2$ per second in the buy-heavy regime and $0.5$ in the sell-heavy regime, and she posts at $\\kappa\\delta = 1$.",
          answer: "With more buyers and up-jumps expected, she can ask more; in a sell-heavy book she lowers her ask before prices fall.",
          steps: [
            "Fill rates are $2e^{-1} \\approx 0.74$ and $0.5e^{-1} \\approx 0.18$ per second.",
            "She is four times as likely to be filled in the buy-heavy book.",
          ],
        },
        {
          kind: "list",
          items: [
            "Her value is highest in the buy-heavy regime for the same inventory and time.",
            "Near $T$ the deadline dominates and depths fall in every regime.",
            "Negative depths in a sell-heavy book near $T$ signal that an MO is needed (the Section 8.4 extension).",
            "The system has (regimes) $\\times$ (inventory levels) ODEs, solved backwards from $h(T, z, q) = -\\alpha q^2$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Signals degrade",
          text: "The regime is observed with latency and can be spoofed; if regimes last about $400$ ms and data are $50$ ms old, the observed regime is stale about $12\\%$ of the time. Validate out of sample with realistic latency and queues.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 12, §12.4 Optimal liquidation with order imbalance" },
  ],
};
