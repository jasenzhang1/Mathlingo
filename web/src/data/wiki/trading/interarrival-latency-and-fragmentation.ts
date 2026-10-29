import type { WikiArticle } from "../types";

export const interarrivalLatencyAndFragmentationWiki: WikiArticle = {
  conceptId: "interarrival-latency-and-fragmentation",

  summary:
    "Events in the book arrive in bursts: interarrival times are mostly a few milliseconds, with tails far " +
    "heavier than an exponential. That clustering sets how much latency costs — a quote that is $100$ ms old " +
    "is usually still valid, but not when activity is surging. Price changes tend to reverse, the tick is often " +
    "binding, and trading is spread across many venues. The chapter ends with the empirics of a cointegrated " +
    "pair, the raw material of statistical arbitrage.",

  sections: [
    {
      heading: "Interarrival times and latency",
      blocks: [
        {
          kind: "prose",
          text:
            "If quote changes followed a Poisson process with mean gap $m$, the chance of at least one change " +
            "during a delay $\\tau$ would be $1 - e^{-\\tau/m}$. The data reject this: median gaps are a few " +
            "milliseconds, yet over a $100$ ms window the bid usually does not change at all. Both hold because " +
            "events arrive in clusters separated by long calm spells.",
        },
        {
          kind: "example",
          title: "Mixtures make heavy tails",
          problem:
            "Gaps are exponential with mean $2$ ms during bursts ($80\\%$ of events) and mean $40$ ms during calm spells ($20\\%$). What fraction of gaps exceed $50$ ms? Compare with a single exponential of the same overall mean, $9.6$ ms.",
          steps: [
            "Mixture: $0.8e^{-50/2} + 0.2e^{-50/40} \\approx 0 + 0.2 \\times 0.2865 = 0.0573$.",
            "Single exponential: $e^{-50/9.6} \\approx 0.0055$.",
          ],
          answer: "About $5.7\\%$ versus $0.55\\%$ — ten times more long gaps. Self-exciting (Hawkes) processes generate such clustering from within: with baseline rate $\\mu$ and branching ratio $n < 1$ the long-run rate is $\\mu/(1 - n)$, so $\\mu = 20$ per second and $n = 0.75$ give $80$ per second.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Who pays for latency",
          text:
            "Latency matters most for strategies that must react to every update: an MO strategy in a liquid " +
            "stock, or a market maker whose quotes go stale. Microwave links beat fibre from Chicago to New " +
            "Jersey by $2$–$3$ ms; whoever sees futures prices first can pick off slower market makers’ stale quotes.",
        },
      ],
    },

    {
      heading: "Price reversals and the tick",
      blocks: [
        {
          kind: "prose",
          text:
            "Treat each change of the bid as up or down. If an uptick is followed by a downtick with probability " +
            "$q_{\\downarrow\\mid\\uparrow}$ and a downtick by an uptick with $q_{\\uparrow\\mid\\downarrow}$, the two-state Markov chain spends a long-run fraction",
        },
        {
          kind: "formula",
          latex: "\\pi_{\\uparrow} = \\frac{q_{\\uparrow\\mid\\downarrow}}{q_{\\uparrow\\mid\\downarrow} + q_{\\downarrow\\mid\\uparrow}}",
          caption: "of its changes as upticks",
        },
        {
          kind: "prose",
          text:
            "For AAPL’s bid, $q_{\\downarrow\\mid\\uparrow} = 0.635$ and $q_{\\uparrow\\mid\\downarrow} = 0.553$, so " +
            "$\\pi_{\\uparrow} = 0.553 / 1.188 \\approx 0.4655$. Both conditional probabilities exceed $\\frac{1}{2}$: changes " +
            "tend to reverse. Conditioning on the last two changes shifts the probabilities again, so a one-step chain is only an approximation.",
        },
        {
          kind: "list",
          items: [
            "When the spread is one tick almost all the time, the tick is binding: competition would narrow the spread further if it could.",
            "A binding tick creates long queues at the best prices, rewarding whoever is fastest to the front of them.",
            "Widening the tick for a stock whose natural spread is below it makes queues longer and quoted spreads wider.",
          ],
        },
      ],
    },

    {
      heading: "Fragmentation and a cointegrated pair",
      blocks: [
        {
          kind: "prose",
          text:
            "In 2014 NASDAQ handled about $20\\%$ of US equity trading; the rest was split across other exchanges " +
            "and off-exchange venues. An algorithm watching one venue sees a fraction of the order flow, and a " +
            "large order routed venue by venue lets fast traders see it coming — routers often send all child " +
            "orders so they arrive at every venue at once.",
        },
        {
          kind: "prose",
          text:
            "INTC and the semiconductor ETF SMH are cointegrated: a linear combination $c_t = A S^{\\text{INTC}}_t + B S^{\\text{SMH}}_t$ " +
            "is stationary. The book estimates the relation through a vector autoregression and uses deviations of " +
            "$c_t$ from its mean as a trading signal.",
        },
        {
          kind: "example",
          title: "Half-life of the spread",
          problem: "At one-second steps the factor follows $c_t = 0.995c_{t-1} + \\varepsilon_t$. How long does a deviation take to halve?",
          steps: ["Solve $0.995^{h} = 0.5$: $h = \\frac{\\ln 0.5}{\\ln 0.995} \\approx 138.3$ seconds."],
          answer: "About $2.3$ minutes — fast enough to trade intraday, slow enough that the spread cost can be recovered.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Check the relation before trading it",
          text:
            "Cointegration estimated on one sample can break. Test stability across subperiods, estimate on one " +
            "window and test on the next, and confirm the half-life is long relative to latency and short " +
            "relative to the holding period you can afford.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 3, Empirical and Statistical Evidence: Prices and Returns (§3.3–3.7)" },
  ],
};
