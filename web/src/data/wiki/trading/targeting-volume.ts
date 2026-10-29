import type { WikiArticle } from "../types";

export const targetingVolumeWiki: WikiArticle = {
  conceptId: "targeting-volume",

  summary:
    "Many execution benchmarks are defined by the market’s own volume. A percentage-of-volume (POV) " +
    "strategy trades a fixed fraction $\\rho$ of what everyone else trades; a VWAP strategy aims for an " +
    "average price equal to the volume-weighted average price of the period. Since market volume is random, " +
    "the optimal strategy blends tracking the current rate with a TWAP-like term that guarantees the order " +
    "is completed.",

  sections: [
    {
      heading: "Benchmarks",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "VWAP", description: "$\\frac{\\sum_j p_j v_j}{\\sum_j v_j}$ over all trades in the period. Trading in proportion to market volume earns roughly this price." },
            { term: "POV", description: "Trade at rate $\\nu_t = \\rho \\times$ (market rate). If the market rate includes her own trades, $\\nu = \\rho(\\mu + \\nu)$, so $\\nu = \\frac{\\rho}{1 - \\rho}\\mu$." },
            { term: "POCV", description: "Percentage of cumulative volume: aim for a fraction $\\rho$ of the total volume over the horizon, adjusting as volume forecasts change." },
          ],
        },
        {
          kind: "example",
          title: "Why proportional trading tracks VWAP",
          problem: "The market trades $30{,}000$ shares at $\\$20.00$, then $10{,}000$ at $\\$20.20$. A buyer trades $2{,}000$ shares in each period. Another trades $10\\%$ of each period’s volume. Compare each with VWAP.",
          steps: [
            "VWAP $= \\frac{600{,}000 + 202{,}000}{40{,}000} = \\$20.05$.",
            "Equal split: average $\\$20.10$, $5$ cents worse than VWAP.",
            "Proportional ($3{,}000$ then $1{,}000$): $\\frac{60{,}000 + 20{,}200}{4{,}000} = \\$20.05$, exactly VWAP.",
          ],
          answer: "Matching the market’s volume pattern matches its average price. A TWAP-like schedule over-trades in quiet periods and under-trades in busy ones.",
        },
      ],
    },

    {
      heading: "The optimal volume-tracking strategy",
      blocks: [
        {
          kind: "prose",
          text:
            "Let the market trading rate $\\mu_t$ be random (for example mean-reverting, or driven by compound Poisson " +
            "trades). The agent penalises deviations of her speed from $\\rho\\mu_t$ and inventory left at $T$. In the limit " +
            "of strong penalties the solution is",
        },
        {
          kind: "formula",
          latex: "\\nu_t^{*} = \\rho\\left[\\mu_t - \\frac{1}{T - t}\\int_t^T \\mathbb{E}_t[\\mu_u]\\,du\\right] + \\frac{Q_t}{T - t}",
          caption: "A TWAP term that finishes the order, plus a correction for whether the market is busier than expected",
        },
        {
          kind: "example",
          title: "Speeding up in a busy market",
          problem: "$\\rho = 0.1$, the market is trading $\\mu_t = 5{,}000$ shares per minute against an expected average of $4{,}000$ over the remaining $60$ minutes, and she has $Q_t = 30{,}000$ shares left. Find $\\nu_t^{*}$.",
          steps: [
            "Correction: $0.1 \\times (5{,}000 - 4{,}000) = 100$ shares per minute.",
            "TWAP term: $30{,}000/60 = 500$ shares per minute.",
          ],
          answer: "$600$ shares per minute. When volume is above what is expected for the rest of the period, she trades more now — and correspondingly less later.",
        },
        {
          kind: "list",
          items: [
            "With mean-reverting volume, $\\mathbb{E}[\\mu_u] = \\bar{\\mu} + (\\mu_t - \\bar{\\mu})e^{-\\kappa(u - t)}$, so a spike above $\\bar{\\mu}$ is expected to fade and the correction is positive.",
            "Near $T$ the TWAP term dominates: whatever the volume, the order must be finished.",
            "The intraday U-shape of volume means the strategy trades more at the open and close.",
            "With exponential utility, risk aversion pulls the strategy toward finishing earlier, trading off volume tracking against price risk.",
          ],
        },
      ],
    },

    {
      heading: "Practical issues",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Pure POV may never finish",
          text:
            "If volume turns out low, $\\rho$ of it may not be enough to complete the order by $T$ — which is why " +
            "the optimal strategy carries the $Q_t/(T - t)$ term. And if her own trades are a large part of volume, " +
            "she partly targets herself; including her trades in the market rate is what gives $\\frac{\\rho}{1 - \\rho}$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Detectability and benchmark choice",
          text:
            "Trading exactly $10\\%$ of every print is easy to spot and front-run; randomising child-order timing " +
            "and size around the target helps. A VWAP benchmark also suits patient orders: a manager whose " +
            "information decays quickly should prefer an arrival-price (implementation shortfall) benchmark instead.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 9, Targeting Volume" },
  ],
};
