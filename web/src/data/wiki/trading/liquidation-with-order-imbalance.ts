import type { WikiArticle } from "../types";

export const liquidationWithOrderImbalanceWiki: WikiArticle = {
  conceptId: "liquidation-with-order-imbalance",

  summary:
    "The limit-order liquidation of Chapter 8 assumed MO arrivals and price moves were the same at all " +
    "times. With order imbalance they are not: in a buy-heavy regime buy MOs come faster and push the price " +
    "up; in a sell-heavy regime the reverse. An agent selling with limit orders conditions her depth on the " +
    "regime — posting deeper when the price is likely to rise and closer, or even crossing, when it is likely to fall.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "list",
          items: [
            "The imbalance regime $Z_t$ is a continuous-time Markov chain with generator $\\mathbf{G}$.",
            "Buy MOs arrive at regime-dependent rate $\\lambda^{+}_{Z}$ and fill her sell LO at depth $\\delta$ with probability $e^{-\\kappa\\delta}$.",
            "After each MO the midprice jumps by a regime-dependent amount: up after buy MOs, down after sell MOs.",
            "Objective as in Chapter 8: maximise cash plus marked-to-market terminal inventory, less penalties.",
          ],
        },
        {
          kind: "formula",
          latex: "\\partial_t h(z, q) + \\sum_{z'} G_{zz'}\\left[h(z', q) - h(z, q)\\right] + q\\,\\mathbb{E}[\\text{drift} \\mid z] + \\lambda^{+}_{z}\\sup_{\\delta}e^{-\\kappa\\delta}\\left(\\delta - \\mathbb{E}[\\varepsilon^{+}_{z}] + h(z, q - 1) - h(z, q)\\right) - \\phi q^2 = 0",
          caption: "One equation per (regime, inventory) pair, coupled through the switching term",
        },
        {
          kind: "prose",
          text:
            "The switching term couples the regimes: the value in one regime depends on where the chain may " +
            "move next. The drift term is the expected revaluation of held inventory from MO-induced jumps, " +
            "$\\lambda^{+}_z\\mathbb{E}[\\varepsilon^{+}_z] - \\lambda^{-}_z\\mathbb{E}[\\varepsilon^{-}_z]$ per share. The system has no closed form; it is " +
            "solved backward in time on the grid of regimes and inventories, all regimes updated together at each step.",
        },
      ],
    },

    {
      heading: "How the depth responds to the regime",
      blocks: [
        {
          kind: "table",
          headers: ["Regime", "What is expected", "Depth"],
          rows: [
            ["Buy-heavy", "More buy MOs, price likely to rise", "Deeper: fills come anyway, and holding inventory is profitable"],
            ["Neutral", "Balanced flow", "Close to the Chapter 8 depth"],
            ["Sell-heavy", "Few buy MOs, price likely to fall", "Closer — possibly negative, signalling an MO"],
          ],
        },
        {
          kind: "example",
          title: "Depths in two regimes",
          problem: "Take $\\kappa = 200$ per dollar, so $1/\\kappa = 0.5$ cents. The value of selling one more share is $h(z, q - 1) - h(z, q) = 0.2$ cents in the sell-heavy regime and $-0.3$ cents in the buy-heavy regime. Ignoring jump corrections, find each depth.",
          steps: [
            "Sell-heavy: $0.5 - 0.2 = 0.3$ cents.",
            "Buy-heavy: $0.5 - (-0.3) = 0.8$ cents.",
          ],
          answer: "She posts $0.5$ cents deeper when buyers dominate. Her share earns $0.8$ cents over the midprice there, though an expected post-fill up-jump of, say, $0.4$ cents leaves her $0.4$ cents ahead of the new midprice.",
        },
        {
          kind: "list",
          items: [
            "Expected fills average over the regimes she will visit: spending $30\\%$, $40\\%$, $30\\%$ of $60$ s in regimes with fill rates $0.15$, $0.3$, $0.6$ per second gives $60(0.045 + 0.12 + 0.18) = 20.7$ fills.",
            "Near $T$, the terminal penalty dominates and regime effects on depth shrink: she must finish whatever the regime.",
            "In simulations the regime-aware strategy beats a regime-blind one by a fraction of a cent per share — small, but on $2$ million shares a day $0.15$ cents is $\\$3{,}000$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Latency makes regimes stale",
          text:
            "If the regime is observed with a $50$ ms delay and regimes last $400$ ms on average, the observed " +
            "regime is out of date about $1 - e^{-50/400} \\approx 11.8\\%$ of the time. Slow observation erodes " +
            "the signal; a model that ignores it will over-react.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 12, Order Imbalance (§12.4 Optimal Liquidation)" },
  ],
};
