import type { WikiArticle } from "../types";

export const targetingVolumeWiki: WikiArticle = {
  conceptId: "targeting-volume",

  summary: "Many execution mandates are benchmarked to the market’s own volume: trade a fixed percentage of volume (POV), a percentage of cumulative volume (POCV), or match the volume-weighted average price (VWAP). The book poses these as control problems that penalise deviations from the target rate and leftover inventory. The optimal speed combines a TWAP-like completion term with a correction that trades more when the market is busier than expected and less when it is quieter.",

  sections: [
    {
      heading: "Benchmarks",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "VWAP", description: "$\\sum_i p_iv_i/\\sum_i v_i$ over the period; trading a constant fraction of the market at every instant reproduces it, apart from impact." },
            { term: "POV", description: "Trade at $\\rho\\mu_t$, a fraction of the market’s current rate; it follows liquidity but may not complete the order." },
            { term: "POCV", description: "Trade a fraction $\\rho$ of the total volume over the horizon, which is unknown in advance." },
          ],
        },
      ],
    },
    {
      heading: "The optimal POV strategy",
      blocks: [
        {
          kind: "formula",
          latex: "\\nu^{*}_t = \\rho\\left[\\mu_t - \\frac{1}{T - t}\\int_t^T\\mathbb{E}_t[\\mu_u]\\,du\\right] + \\frac{Q_t}{T - t}",
          caption: "The double limit of strong tracking and full completion: a TWAP term plus trading in proportion to how far current volume is above its expected average.",
        },
        {
          kind: "example",
          title: "A busy moment",
          problem: "With $\\rho = 0.1$, current market rate $5{,}000$ shares per minute, expected average future rate $4{,}000$, $Q_t = 30{,}000$ and $60$ minutes left:",
          answer: "With a mean-reverting market rate, $\\mathbb{E}[\\mu_u] = \\bar{\\mu} + (\\mu_t - \\bar{\\mu})e^{-\\kappa(u - t)}$, and the integral has a closed form.",
          steps: [
            "TWAP term: $30{,}000/60 = 500$ shares per minute.",
            "Correction: $0.1 \\times (5{,}000 - 4{,}000) = 100$.",
            "Speed: $600$ shares per minute.",
          ],
        },
        {
          kind: "list",
          items: [
            "Near $T$ the completion term dominates and the volume target is ignored.",
            "Including her own trades in market volume scales her rate by $1/(1 - \\rho)$.",
            "Other traders’ flow also moves the price, so the strategy adjusts as in the order-flow model.",
            "Exponential utility adds a $\\tfrac{1}{2}\\gamma\\sigma^2$ penalty and front-loads trading.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Predictable participation",
          text: "A strategy that trades exactly $10\\%$ of every print is easy to detect and trade ahead of; randomise participation and venues.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 9, Targeting volume (POV, POCV, impact of other traders, utility)" },
  ],
};
