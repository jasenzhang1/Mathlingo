import type { WikiArticle } from "../types";

export const optimalStoppingVariationalInequalitiesWiki: WikiArticle = {
  conceptId: "optimal-stopping-variational-inequalities",

  summary: "Optimal stopping asks when to act: exercise an option, exit a pairs trade, cross the spread. The value function dominates the reward of stopping now and, where waiting is better, evolves as a martingale; together these give a variational inequality whose two regions are separated by an optimal boundary, typically pinned down by value matching and smooth pasting. Combining stopping with continuous control gives the quasi-variational inequalities of Chapter 8.",

  sections: [
    {
      heading: "The variational inequality",
      blocks: [
        {
          kind: "formula",
          latex: "\\max\\left\\{\\partial_t H + \\mathcal{L}H,\\; G - H\\right\\} = 0",
          caption: "Either continue ($H > G$, the value is a martingale) or stop ($H = G$, continuing would make it a supermartingale).",
        },
        {
          kind: "definitions",
          items: [
            { term: "Continuation region", description: "Where $H > G$ and $\\partial_t H + \\mathcal{L}H = 0$." },
            { term: "Stopping region", description: "Where $H = G$; the first entry time is the optimal stopping time." },
            { term: "Snell envelope", description: "In discrete time, $V_n = \\max\\{G_n, \\mathbb{E}[V_{n+1} \\mid \\mathcal{F}_n]\\}$, the smallest supermartingale above $G$." },
            { term: "Smooth pasting", description: "For diffusions, the value meets the reward with matching slope at the boundary, which identifies the optimal threshold." },
          ],
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "A two-period American put",
          problem: "$S_0 = 100$, up factor $1.2$, down $0.8$, risk-neutral up probability $0.5$, no discounting, strike $110$.",
          answer: "The value is $18.5$, with exercise optimal at the down node.",
          steps: [
            "At $t = 2$ the payoffs are $0$, $14$ and $46$ at $144$, $96$ and $64$.",
            "At $t = 1$, up ($120$): continue $7$ versus exercise $0$, so $7$; down ($80$): continue $30$ versus exercise $30$, so $30$.",
            "At $t = 0$: continue $(7 + 30)/2 = 18.5$ versus exercise $10$.",
          ],
        },
        {
          kind: "example",
          title: "A perpetual threshold",
          problem: "Stop a driftless Brownian motion $X$ (volatility $\\sigma$) for reward $X - c$, discounting at rate $\\rho$.",
          answer: "Higher impatience $\\rho$ lowers the threshold; the same structure gives the pairs-trading exit rule.",
          steps: [
            "Below the threshold, $H = Ae^{\\theta x}$ with $\\theta = \\sqrt{2\\rho}/\\sigma$.",
            "Value matching and smooth pasting give $b - c = 1/\\theta$.",
            "With $c = 1$, $\\sigma = 0.5$ and $\\rho = 0.125$, $b = 1 + 0.5/0.5 = 2$.",
          ],
        },
      ],
    },
    {
      heading: "Stopping and control together",
      blocks: [
        {
          kind: "formula",
          latex: "\\max\\left\\{\\partial_t H + \\sup_u\\left(\\mathcal{L}^{u}H + F\\right),\\; \\mathcal{M}H - H\\right\\} = 0",
          caption: "A quasi-variational inequality: continue optimally, or intervene (for example with a market order) at value $\\mathcal{M}H$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Impulses in trading",
          text: "Sending a market order is an impulse that jumps cash and inventory. In the limit-and-market-order execution problem, the QVI’s intervention region is where crossing the spread beats waiting for a fill.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 5, §5.5–5.6 Optimal stopping and combined stopping and control" },
  ],
};
