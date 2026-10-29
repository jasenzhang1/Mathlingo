import type { WikiArticle } from "../types";

export const executionLitAndDarkPoolsWiki: WikiArticle = {
  conceptId: "execution-lit-and-dark-pools",

  summary:
    "A dark pool crosses orders at the lit midprice with no impact, but you never know when — or whether — a " +
    "counterparty will arrive. An agent liquidating a position can sell continuously in the lit market, " +
    "paying impact, while resting shares in the dark pool for a chance of a free fill. The optimal policy " +
    "posts everything left in the dark and sells more slowly in the lit market than Almgren–Chriss would, " +
    "because waiting now has a payoff: a dark fill.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "list",
          items: [
            "Lit market: sell at speed $\\nu$ with temporary impact $k\\nu$ (permanent impact ignored for simplicity).",
            "Dark pool: post $y$ shares at the midprice; matching orders arrive as a Poisson process with rate $\\lambda$.",
            "In the base case a match fills the whole posted amount. Posting less than all remaining inventory never helps — a dark fill costs nothing — so $y^{*} = q$.",
            "Running penalty $\\phi q^2$ and terminal penalty $\\alpha q^2$, as before.",
          ],
        },
        {
          kind: "prose",
          text:
            "A dark fill sells everything at $S$, so $H$ jumps from $x + qS + h_2 q^2$ to $x + qS$. The jump term " +
            "of the DPE is therefore $\\lambda[0 - h_2 q^2] = -\\lambda h_2 q^2$, and the Riccati equation picks up an extra term:",
        },
        {
          kind: "formula",
          latex: "\\partial_t h_2 - \\phi - \\lambda h_2 + \\frac{1}{k}h_2^2 = 0, \\qquad h_2(T) = -\\alpha, \\qquad \\nu^{*} = -\\frac{h_2(t)}{k}\\,q",
        },
      ],
    },

    {
      heading: "The steady speed",
      blocks: [
        {
          kind: "prose",
          text:
            "Far from the deadline, $h_2$ settles at the negative root $h_2 = -p$ of $p^2 + \\lambda k p - \\phi k = 0$, so the lit speed per share of inventory is",
        },
        {
          kind: "formula",
          latex: "\\frac{p}{k} = \\frac{1}{2}\\left(\\sqrt{\\lambda^2 + \\frac{4\\phi}{k}} - \\lambda\\right) \\quad\\text{versus}\\quad \\sqrt{\\frac{\\phi}{k}} \\text{ without a dark pool}",
        },
        {
          kind: "example",
          title: "How much does the dark pool slow the lit sales?",
          problem: "Take $\\phi = 0.01$, $k = 0.001$ and dark matches at $\\lambda = 2$ per day. Compare the steady lit speeds with and without the pool, and find the chance of a dark fill within one day.",
          steps: [
            "With the pool: $\\frac{1}{2}(\\sqrt{4 + 40} - 2) = \\frac{1}{2}(6.633 - 2) \\approx 2.32$ per day.",
            "Without: $\\sqrt{0.01/0.001} = \\sqrt{10} \\approx 3.16$ per day.",
            "Dark fill within a day: $1 - e^{-2} \\approx 0.8647$.",
          ],
          answer: "The pool cuts the lit speed by about $27\\%$ (a factor of $0.73$). With an $86\\%$ chance of a free fill, it pays to keep more inventory around to be filled.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Shape of the strategy",
          text:
            "Before a dark fill, inventory decays exponentially at the slower rate, then speeds up near $T$ as " +
            "the terminal penalty bites; at the moment of a dark fill inventory drops to zero. When $\\lambda = 0$ " +
            "the formulas collapse to Almgren–Chriss.",
        },
      ],
    },

    {
      heading: "Extensions and caveats",
      blocks: [
        {
          kind: "list",
          items: [
            "**Partial fills**: if matches have random size $\\xi$ and only $\\min(y, \\xi)$ executes, the jump term becomes $\\lambda\\,\\mathbb{E}[h(t, q - \\min(y, \\xi)) - h(t, q)]$, the quadratic ansatz fails, and the problem is solved numerically.",
            "**Queues**: if other orders are ahead in the dark pool, effective fill rates are lower and the agent should lean more on the lit market.",
            "**Adverse selection**: dark fills that tend to precede adverse lit price moves are less valuable than they look; the strategy should discount them or post less.",
            "**Several pools**: independent pools at rates $\\lambda_1, \\lambda_2$ act like one with rate $\\lambda_1 + \\lambda_2$ — e.g. $1 - e^{-(0.4 + 0.6)} \\approx 0.632$ chance of a fill within a day.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Pinging",
          text:
            "Some traders send small orders into dark pools to detect large resting ones. A large seller can " +
            "protect herself with minimum-fill-size conditions, by posting in pieces, or by choosing pools that " +
            "screen participants.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 7, Optimal Execution with Continuous Trading II (§7.4 Lit and Dark Markets)" },
  ],
};
