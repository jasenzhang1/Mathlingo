import type { WikiArticle } from "../types";

export const orderImbalanceModelsWiki: WikiArticle = {
  conceptId: "order-imbalance-models",

  summary:
    "Volume imbalance at the touch — how much bigger the bid queue is than the ask queue — is one of the " +
    "most reliable short-term signals in the book. It predicts the sign of the next market order and the " +
    "direction of the next price change. Discretising imbalance into a few regimes and modelling them as a " +
    "Markov chain, in discrete or continuous time, gives a tractable model whose parameters are simple counts.",

  sections: [
    {
      heading: "Measuring imbalance",
      blocks: [
        {
          kind: "formula",
          latex: "\\rho_t = \\frac{V^{b}_t - V^{a}_t}{V^{b}_t + V^{a}_t} \\in [-1, 1]",
          caption: "Positive when the bid queue is heavier; using several levels, sum each side’s volumes first",
        },
        {
          kind: "list",
          items: [
            "Heavy bids mean the thin ask queue is easily depleted by buy MOs, so the next price change is more likely up; heavy bids may also signal buying interest that brings more buy MOs.",
            "Two levels: bids $300 + 400$, asks $200 + 100$ give $\\rho = \\frac{700 - 300}{1{,}000} = 0.4$.",
            "Imbalance is discretised into regimes, e.g. sell-heavy, neutral and buy-heavy.",
            "Treating each day’s curve of MO activity against imbalance as a function, functional PCA shows a few components capture most of the day-to-day variation.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A signal, not a free lunch",
          text:
            "A signal that predicts the next tick $60\\%$ of the time is worth $0.6 - 0.4 = 0.2$ cents per prediction " +
            "with a one-cent tick — far less than the spread an MO pays. Imbalance is valuable for adjusting " +
            "limit-order depths and timing, not for crossing the spread on its own.",
        },
      ],
    },

    {
      heading: "Discrete-time Markov chains",
      blocks: [
        {
          kind: "prose",
          text:
            "Sample the regime every $\\Delta t$ (e.g. $100$ ms). The maximum-likelihood estimate of the transition " +
            "matrix is the observed fraction of moves: $\\hat{P}_{ij} = n_{ij}/n_i$. A regime with stay probability $p_{ii}$ " +
            "lasts on average $1/(1 - p_{ii})$ steps.",
        },
        {
          kind: "example",
          title: "Stationary mix of regimes",
          problem: "A two-regime chain has $\\Pr(1 \\to 2) = 0.1$ and $\\Pr(2 \\to 1) = 0.3$ per $100$ ms step. Find the stationary probability of regime $1$ and its mean duration.",
          steps: [
            "Balance: $\\pi_1 \\times 0.1 = \\pi_2 \\times 0.3$, so $\\pi_1 = \\frac{0.3}{0.1 + 0.3} = 0.75$.",
            "Mean duration in regime $1$: $\\frac{1}{0.1} = 10$ steps $= 1{,}000$ ms.",
          ],
          answer: "Regime $1$ holds $75\\%$ of the time, in spells of about one second.",
        },
      ],
    },

    {
      heading: "Continuous-time chains and MO arrivals",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Generator $\\mathbf{G}$", description: "$G_{ij} \\ge 0$ is the rate of jumping from $i$ to $j$; rows sum to zero. Holding time in $i$ is exponential with mean $1/\\lvert G_{ii} \\rvert$, and the next state is $j$ with probability $G_{ij}/\\lvert G_{ii} \\rvert$." },
            { term: "MLE from continuous data", description: "$\\hat{G}_{ij} = N_{ij}/T_i$: number of $i \\to j$ switches divided by total time spent in $i$. E.g. $1{,}200$ exits over $480$ s give an outflow rate of $2.5$ per second." },
            { term: "From $\\mathbf{P}$ to $\\mathbf{G}$", description: "$\\mathbf{P}(\\Delta t) = e^{\\mathbf{G}\\Delta t}$, so $\\mathbf{G} = \\frac{1}{\\Delta t}\\log\\mathbf{P}$. Pitfall: the matrix log of an estimated $\\mathbf{P}$ need not be a valid generator (negative off-diagonals), and coarse sampling misses quick round-trip switches." },
            { term: "Regime-dependent MOs", description: "Buy and sell MOs arrive as Poisson processes with rates $\\lambda^{\\pm}_k$ in regime $k$, each estimated as count over time spent in $k$; the price-change distribution after an MO also depends on $k$." },
          ],
        },
        {
          kind: "example",
          title: "Expected price move after a buy MO",
          problem: "In the bid-heavy regime, a buy MO is followed by an up-tick with probability $0.6$, no change with $0.3$ and a down-tick with $0.1$. With a one-cent tick, what is the expected price change?",
          steps: ["$0.6 \\times 1 + 0.3 \\times 0 + 0.1 \\times (-1) = 0.5$ cents."],
          answer: "Half a cent — the adverse move a market maker filled on the ask should expect in that regime.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Fitting by likelihood",
          text:
            "In each epoch of length $\\tau$ in a regime with rate $\\lambda$, observing $n$ arrivals contributes " +
            "$n\\ln(\\lambda\\tau) - \\lambda\\tau - \\ln n!$ to the log-likelihood. Summing over epochs and maximising gives " +
            "count over time — but only if regimes are measured without delay; stale regime labels bias the rates toward each other.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 12, Order Imbalance (§12.1–12.3)" },
  ],
};
