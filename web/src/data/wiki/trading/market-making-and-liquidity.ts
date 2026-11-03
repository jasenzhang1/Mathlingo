import type { WikiArticle } from "../types";

export const marketMakingAndLiquidityWiki: WikiArticle = {
  conceptId: "market-making-and-liquidity",

  summary: "Market makers sell immediacy: they absorb the order of an impatient trader and hold the inventory until an offsetting trader arrives. In the Grossman–Miller model, risk-averse market makers demand a liquidity discount for bearing that inventory risk, which grows with volatility, risk aversion and order size and shrinks with competition. The same logic gives two empirical liquidity measures, price impact and negatively autocorrelated price changes, and a simple static model shows how a market maker chooses how deep to post her limit orders.",

  sections: [
    {
      heading: "The Grossman–Miller liquidity discount",
      blocks: [
        {
          kind: "formula",
          latex: "S_1 = \\mu - \\gamma\\sigma^2\\frac{i}{n + 1}, \\qquad q^{j}_1 = \\frac{i}{n + 1}\\text{ for every participant}",
          caption: "A liquidity trader selling $i$ shares to $n$ CARA market makers; $\\gamma$ is risk aversion and $\\sigma^2$ the variance of the next price shock.",
        },
        {
          kind: "prose",
          text: "At $t = 2$ the offsetting trader arrives and the price returns to the efficient value. At $t = 1$ the first trader and the market makers share the risk equally, so she sells only $\\frac{n}{n + 1}i$ shares at a discount. Writing $S_1 = \\mu - \\lambda q$ with $q$ the shares sold gives a price-impact coefficient $\\lambda = \\gamma\\sigma^2/n$.",
        },
        {
          kind: "example",
          title: "Discount and competition",
          problem: "A trader sells $i = 900$ shares with $\\gamma\\sigma^2 = 0.08$.",
          answer: "Competition drives the price toward the efficient level and lets the trader sell almost all her shares immediately.",
          steps: [
            "With $n = 8$ market makers each holds $100$ shares and the discount is $0.08 \\times 900/9 = \\$8$ per share.",
            "With $n = 89$ the discount falls to $0.08 \\times 900/90 = \\$0.80$.",
          ],
        },
      ],
    },
    {
      heading: "Fees, participation and liquidity measures",
      blocks: [
        {
          kind: "list",
          items: [
            "**Participation costs** reduce the number of market makers and so raise the discount.",
            "**Per-share fees** are mostly borne by the liquidity trader: $S_1$ falls by an extra $\\frac{2n}{n + 1}\\eta$.",
            "**Price impact** $\\lambda$ measures how far prices move per share traded.",
            "**Autocovariance of price changes** is $-\\lambda^2\\text{Var}(q)$: temporary discounts reverse, so illiquid markets show negative autocorrelation.",
          ],
        },
      ],
    },
    {
      heading: "Where to post a limit order",
      blocks: [
        {
          kind: "formula",
          latex: "\\max_{\\delta}\\; \\delta\\,e^{-\\kappa\\delta} \\;\\Longrightarrow\\; \\delta^{*} = \\frac{1}{\\kappa}",
          caption: "A risk-neutral market maker trades profit per fill against the fill probability $e^{-\\kappa\\delta}$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The seed of Chapter 10",
          text: "The static answer $1/\\kappa$ ignores inventory, time and adverse selection. The dynamic market-making models add exactly these, skewing depths around $1/\\kappa$.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 2, §2.1 Market making (Grossman–Miller, trading costs, measuring liquidity, limit-order placement)" },
  ],
};
