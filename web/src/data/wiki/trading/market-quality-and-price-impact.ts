import type { WikiArticle } from "../types";

export const marketQualityAndPriceImpactWiki: WikiArticle = {
  conceptId: "market-quality-and-price-impact",

  summary: "Market quality has several dimensions: spreads (the cost of small trades), volatility, depth (how much trades without moving price) and price impact (how much large orders move it). Effective spreads, measured at the moment of trade, are smaller and steadier than quoted spreads because traders time their orders and hidden orders trade inside the quotes. Temporary impact can be estimated from the cost of walking snapshots of the book, permanent impact from the regression of price changes on net order flow, and both feed directly into the execution models.",

  sections: [
    {
      heading: "Spreads and depth",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Quoted spread", description: "Ask minus bid; median relative spreads range from $2.9$ bps for AAPL to over $400$ bps for a rarely traded stock." },
            { term: "Effective spread", description: "$2|p - m|$ at the time of the trade; negative when a trade gets price improvement, for example from hidden orders." },
            { term: "Realised spread and price impact", description: "Effective spread $=$ realised spread ($2(p - m_{t+\\Delta})$) $+$ price impact ($2(m_{t+\\Delta} - m_t)$), separating the liquidity provider’s profit from her loss to information." },
            { term: "Depth at the touch", description: "Volume at the best quotes, often small (a few hundred shares for AAPL) relative to institutional orders." },
          ],
        },
      ],
    },
    {
      heading: "Estimating impact",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{S} - S^{\\text{best}} = \\tfrac{\\Delta}{2} + k\\,q, \\qquad \\Delta S = b\\,\\mu + \\varepsilon",
          caption: "Temporary impact $k$ from walking the book with MOs of size $q$; permanent impact $b$ from five-minute price changes on net order flow $\\mu$.",
        },
        {
          kind: "example",
          title: "Two impact channels",
          problem: "With $k = 3 \\times 10^{-6}$, $b = 6 \\times 10^{-6}$ dollars per share and a half-spread of $0.5$ cents, a seller sends one $10{,}000$-share MO and still holds $50{,}000$ shares.",
          answer: "Total \\$3{,}350: the permanent part, paid on the whole remaining position, can dominate.",
          steps: [
            "Immediate cost: $(0.005 + 3 \\times 10^{-6} \\times 10{,}000) \\times 10{,}000 = \\$350$.",
            "Permanent shift: $6 \\times 10^{-6} \\times 10{,}000 = 0.06$ per share on the remaining $50{,}000$, a further \\$3{,}000.",
          ],
        },
        {
          kind: "prose",
          text: "Table 4.13 reports $b/k$ from about $1$ to over $7$ across stocks. The ratio decides how much a trader gains by slowing down, since temporary impact punishes speed while permanent impact is paid regardless of timing.",
        },
      ],
    },
    {
      heading: "Cancellations and hidden liquidity",
      blocks: [
        {
          kind: "list",
          items: [
            "Most posted LOs are cancelled: low-latency providers constantly reposition as information arrives, so displayed depth is fleeting.",
            "The fraction of LOs that execute falls roughly exponentially with distance from the mid, the empirical basis for the fill model $e^{-\\kappa\\delta}$.",
            "Large MOs are followed by same-side MOs (order splitting and herding), and MOs arrive when spreads are narrow.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Impact models explain little variance",
          text: "Linear impact regressions often have $R^2$ below $5\\%$; that reflects how noisy prices are, not that impact is negligible. Validate models on realised execution costs.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 4, §4.3–4.5 Spreads, volatility, depth, price impact, walking the book, cancellations and hidden orders" },
  ],
};
