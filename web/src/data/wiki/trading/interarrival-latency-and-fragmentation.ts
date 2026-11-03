import type { WikiArticle } from "../types";

export const interarrivalLatencyAndFragmentationWiki: WikiArticle = {
  conceptId: "interarrival-latency-and-fragmentation",

  summary: "At millisecond resolution, the times between quote changes are not exponential: they have power-law tails and cluster, with bursts of activity separated by long calm spells. Latency, the delay between sending an order and its processing, therefore matters most in bursts, and the race between fibre and microwave links is a race to act before quotes go stale. Price changes tend to reverse and are not first-order Markov, US trading is split across many venues, and a cointegrated pair such as INTC and SMH gives the first glimpse of statistical arbitrage.",

  sections: [
    {
      heading: "Event timing and latency",
      blocks: [
        {
          kind: "list",
          items: [
            "AAPL bid/ask changes have mean interarrival $10.4$ ms but median $3$ ms, with a power-law tail (MLE exponent about $3.1$) and strong positive autocorrelation: clustering.",
            "A Poisson model with the mean rate badly overstates how often a $100$ ms window contains a change; in reality most of the clock time is calm.",
            "Chicago-to-New Jersey latency is about $7$ ms over fibre and $4.2$–$5.2$ ms over microwave, a gap that lets fast traders pick off stale quotes.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Models that cluster",
          text: "Self-exciting (Hawkes) or doubly stochastic Poisson processes reproduce clustering and heavy-tailed waiting times; a Hawkes process with baseline $\\mu$ and branching ratio $n$ has long-run rate $\\mu/(1 - n)$.",
        },
      ],
    },
    {
      heading: "Reversals, ticks and venues",
      blocks: [
        {
          kind: "example",
          title: "Long-run share of upticks",
          problem: "For AAPL’s bid, an uptick is followed by a downtick $63.5\\%$ of the time and a downtick by an uptick $55.3\\%$ of the time. Treat the signs as a two-state Markov chain.",
          answer: "Reversal is strong at one step, but conditioning on two past changes alters the probabilities again, so price changes are not first-order Markov.",
          steps: [
            "The stationary probability of an uptick is $\\frac{0.553}{0.553 + 0.635}$.",
            "That is $0.4655$.",
          ],
        },
        {
          kind: "list",
          items: [
            "A one-cent tick binds for liquid low-priced stocks, keeping spreads at one tick and making queue position valuable.",
            "Around 2014 NASDAQ handled about $20\\%$ of US equity volume across $11$ exchanges and $45$ alternative venues; one venue’s data is a partial view.",
            "A VAR on INTC and SMH prices yields a stationary combination $c_t = 0.95S^{\\text{INTC}}_t - 0.63S^{\\text{SMH}}_t$, the cointegration factor traded in Chapter 11.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 3, §3.3–3.7 Interarrival times, latency and tick size, non-Markovian price changes, fragmentation, pairs trading" },
  ],
};
