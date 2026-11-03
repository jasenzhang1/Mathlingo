import type { WikiArticle } from "../types";

export const orderImbalanceModelsWiki: WikiArticle = {
  conceptId: "order-imbalance-models",

  summary: "The imbalance between bid and ask queue sizes is one of the most useful high-frequency signals: a heavy bid predicts buy market orders and up-moves. Chapter 12 discretises imbalance into regimes and models them as a Markov chain, first in discrete time with transition probabilities estimated by counting, then in continuous time with a generator, joint with regime-dependent market-order arrivals and price jumps, and finally at daily scale with functional data analysis.",

  sections: [
    {
      heading: "Imbalance and its regimes",
      blocks: [
        {
          kind: "formula",
          latex: "\\rho_t = \\frac{V^{b}_t - V^{a}_t}{V^{b}_t + V^{a}_t} \\in [-1, 1]",
          caption: "Volume imbalance at the touch (or over the best few levels).",
        },
        {
          kind: "list",
          items: [
            "Buy MOs arrive more often when $\\rho$ is near $+1$, sell MOs near $-1$.",
            "Imbalance is positively correlated with subsequent price changes.",
            "Regimes are buckets of $[-1, 1]$; the chain mostly moves between neighbours.",
          ],
        },
      ],
    },
    {
      heading: "Estimation",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Discrete-time MLE", description: "$\\hat{A}_{ij} = n_{ij}/\\sum_k n_{ik}$, the fraction of transitions from $i$ that go to $j$." },
            { term: "Continuous time", description: "$P(\\Delta t) = e^{G\\Delta t}$, so $G = \\frac{1}{\\Delta t}\\log P$; the expected holding time in $i$ is $1/|G_{ii}|$. The matrix log may not give a valid generator." },
            { term: "Joint with MOs", description: "Within regime $k$, buy and sell MOs arrive as Poisson with rates $\\lambda^{\\pm}_k$; MLEs are counts over time spent, and generator entries are switch counts over time spent." },
          ],
        },
        {
          kind: "example",
          title: "A two-regime chain",
          problem: "Over $100$ ms steps, $\\Pr(1 \\to 2) = 0.1$ and $\\Pr(2 \\to 1) = 0.3$.",
          answer: "The discrete probabilities convert to rates usable in continuous-time trading models.",
          steps: [
            "Stationary probability of regime $1$: $0.3/(0.1 + 0.3) = 0.75$.",
            "Generator rate out of regime $1$: $\\frac{-\\ln(1 - 0.4)}{0.4 \\times 0.1} \\times 0.1 \\approx 1.277$ per second.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Daily features",
          text: "Treating each day’s curve of MO activity versus imbalance as a function, functional PCA summarises day-to-day variation in a few coefficients, used to adjust the intraday model.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 12, §12.1–12.3 Intraday and daily features of order imbalance" },
  ],
};
