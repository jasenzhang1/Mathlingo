import type { WikiArticle } from "../types";

export const executionLitAndDarkPoolsWiki: WikiArticle = {
  conceptId: "execution-lit-and-dark-pools",

  summary: "A dark pool crosses orders at the lit midprice with no impact, but a matching order may never come. The agent posts her whole remaining inventory in the dark pool, where matches arrive at Poisson times, while trading continuously in the lit market with temporary impact. When the dark pool fills in full, the problem has a closed form: she initially trades slower than Almgren–Chriss in the lit market, waiting for a free fill, and speeds up above it if none arrives.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "prose",
          text: "Lit trading at speed $\\nu$ earns $S - k\\nu$ per share; dark matches arrive at rate $\\lambda$ with random size $\\xi$, and fill $\\min(y, \\xi)$ at the midprice. Because dark execution has no cost or impact, posting all remaining inventory $y = q$ is optimal.",
        },
        {
          kind: "formula",
          latex: "\\partial_t h_2 - \\phi - \\lambda h_2 + \\frac{1}{k}h_2^2 = 0, \\qquad h_2(T) = -\\alpha, \\qquad \\nu^{*}_t = -\\frac{h_2(t)}{k}Q_t",
          caption: "With full execution, a dark fill removes all inventory, contributing $\\lambda[0 - h_2q^2]$ to the equation.",
        },
      ],
    },
    {
      heading: "How the dark pool changes the lit speed",
      blocks: [
        {
          kind: "example",
          title: "Steady speeds",
          problem: "Take $\\phi = 0.01$, $k = 0.001$ and $\\lambda = 2$ dark matches per day.",
          answer: "As the deadline nears without a dark fill, the terminal penalty dominates and her lit speed rises above Almgren–Chriss to finish.",
          steps: [
            "Without the dark pool, the steady speed per share is $\\sqrt{\\phi/k} = 3.16$ per day.",
            "With it, $h_2 \\to -p$ with $p = \\frac{k}{2}\\left(\\sqrt{\\lambda^2 + 4\\phi/k} - \\lambda\\right) \\approx 0.00232$, a speed of $p/k \\approx 2.32$ per day.",
            "So far from the deadline she trades about $27\\%$ slower in the lit market.",
          ],
        },
        {
          kind: "list",
          items: [
            "With $\\lambda = 0$ the strategy is exactly Almgren–Chriss.",
            "The probability of at least one match by $T$ is $1 - e^{-\\lambda T}$.",
            "The inventory path before a dark fill can be convex or concave, unlike the AC path.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "What the model leaves out",
          text: "Real dark fills can be adversely selected (they happen before the price moves against you), queues ahead of you reduce fills, and probing orders can detect large resting orders; each makes dark posting less attractive than the model suggests.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 7, §7.4 Optimal liquidation in lit and dark markets" },
  ],
};
