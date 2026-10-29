import type { WikiArticle } from "../types";

export const marketQualityAndPriceImpactWiki: WikiArticle = {
  conceptId: "market-quality-and-price-impact",

  summary:
    "Market quality is measured along several dimensions: what it costs to trade (quoted and effective " +
    "spreads), how much can be traded (depth), and how much the price moves when you trade (price impact). " +
    "Impact splits into a temporary part, paid while walking the book and gone once it refills, and a " +
    "permanent part, a lasting move of the midprice. These two coefficients, $k$ and $b$, are exactly the " +
    "inputs of the optimal execution models that follow.",

  sections: [
    {
      heading: "Spreads and depth",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Quoted spread", description: "$P^{a} - P^{b}$ at a moment in time." },
            { term: "Effective spread", description: "$2\\lvert p - m_t \\rvert$ for a trade at price $p$ when the midprice is $m_t$: what traders actually paid, including price improvement and walking the book." },
            { term: "Realised spread", description: "$2(p - m_{t + 5})$ for a buy (sign flipped for a sell): what the liquidity provider kept after the price moved over the next five minutes." },
            { term: "Price impact", description: "$2(m_{t + 5} - m_t)$ for a buy: what the provider lost to the information in the trade. Effective spread $=$ realised spread $+$ price impact." },
            { term: "Depth", description: "Shares or dollars at the touch; an imperfect guide to impact because it ignores deeper levels, hidden orders and fast cancellations." },
          ],
        },
        {
          kind: "example",
          title: "Decomposing the spread",
          problem: "A buy MO executes at $\\$20.03$ when the midprice is $\\$20.01$; five minutes later the midprice is $\\$20.02$. Compute the effective spread, realised spread and price impact.",
          steps: [
            "Effective: $2(20.03 - 20.01) = 4$ cents.",
            "Realised: $2(20.03 - 20.02) = 2$ cents.",
            "Impact: $2(20.02 - 20.01) = 2$ cents; $2 + 2 = 4$ ✓.",
          ],
          answer: "Half of what the buyer paid went to the liquidity provider; the other half compensated her for the information the trade carried.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Effective spreads are usually smaller",
          text:
            "MOs tend to arrive when spreads are narrow, and some execute inside the quotes against hidden orders. " +
            "So the average effective spread is smaller and less volatile than the average quoted spread.",
        },
      ],
    },

    {
      heading: "Temporary and permanent impact",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{S}(q) - S = \\frac{\\Delta}{2} + k\\,q, \\qquad \\Delta S_{\\text{5 min}} = b\\,\\mu + \\varepsilon",
          caption: "Left: average price of an MO of $q$ shares over the midprice. Right: midprice change regressed on net order flow $\\mu$.",
        },
        {
          kind: "list",
          items: [
            "**Temporary impact $k$**: at each LOB snapshot, compute the average price of hypothetical MOs of several sizes walking the book; regress the premium on size with intercept fixed at the half-spread. Estimate every second and average.",
            "**Permanent impact $b$**: regress five-minute midprice changes on five-minute net order flow.",
            "Both vary through the day — $k$ is highest in the morning, when books are thin, and lowest near the close.",
          ],
        },
        {
          kind: "example",
          title: "Which impact dominates?",
          problem: "With $k = 2.5 \\times 10^{-7}$ and $b = 6.15 \\times 10^{-7}$ dollars per share, compare the immediate premium $kq$ and the permanent move $bq$ for $q = 40{,}000$ shares.",
          steps: [
            "$kq = 2.5 \\times 10^{-7} \\times 40{,}000 = \\$0.01$, i.e. $1$ cent.",
            "$bq = 6.15 \\times 10^{-7} \\times 40{,}000 = \\$0.0246$, about $2.46$ cents.",
          ],
          answer: "The permanent move is about $2.5$ times the temporary premium. The ratio $b/k$ matters because only temporary impact can be reduced by trading more slowly.",
        },
      ],
    },

    {
      heading: "Cancellations, hidden orders and order flow",
      blocks: [
        {
          kind: "list",
          items: [
            "Most posted LOs are cancelled rather than executed: traders constantly revise quotes as information arrives, so displayed depth is fleeting.",
            "The fraction of LOs executed falls roughly exponentially with distance from the midprice, $e^{-\\kappa d}$ — the shape that the market-making and limit-order execution models assume.",
            "A noticeable share of volume executes against hidden orders, so visible depth understates true depth.",
            "Large MOs are followed by more MOs on the same side far more often than by opposite ones: order flow is autocorrelated, partly because large parents are split into many children.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Estimating your own impact",
          text:
            "Regressing price changes on your own trades is biased: you tend to trade when prices are already " +
            "moving, and the market’s other flow is correlated with yours. Control for market-wide order flow " +
            "and returns, or use randomised trade timing, before reading the slope as your impact.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 4, Empirical and Statistical Evidence: Activity and Market Quality (§4.3–4.5)" },
  ],
};
