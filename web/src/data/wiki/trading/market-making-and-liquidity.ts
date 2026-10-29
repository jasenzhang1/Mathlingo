import type { WikiArticle } from "../types";

export const marketMakingAndLiquidityWiki: WikiArticle = {
  conceptId: "market-making-and-liquidity",

  summary:
    "Liquidity is the ability to trade now rather than wait for a natural counterparty. The Grossman–Miller " +
    "model explains its price: risk-averse market makers absorb a liquidity trader’s order and hold the " +
    "inventory until the other side arrives, and they charge a discount for bearing that risk. More market " +
    "makers share the risk and shrink the discount; fees and participation costs widen it. A second, static " +
    "model shows the trade-off in placing one limit order: post deeper and you earn more per fill but fill less often.",

  sections: [
    {
      heading: "The Grossman–Miller model",
      blocks: [
        {
          kind: "prose",
          text:
            "There are three dates. At $t = 1$ a liquidity trader arrives wanting to sell $i$ shares; at $t = 2$ a " +
            "second one arrives wanting to buy them; at $t = 3$ the asset pays $S_3 = \\mu + \\epsilon_2 + " +
            "\\epsilon_3$ with independent Normal shocks. $n$ identical market makers with CARA risk aversion " +
            "$\\gamma$ trade at $t = 1$ and $t = 2$. Each agent’s demand is (expected gain) / ($\\gamma \\times$ " +
            "variance), and market clearing at $t = 1$ gives",
        },
        {
          kind: "formula",
          latex: "S_1 = \\mu - \\gamma\\sigma^2\\,\\frac{i}{n + 1}",
          caption: "The discount for immediacy, shared among $n$ market makers and the liquidity trader herself",
        },
        {
          kind: "prose",
          text:
            "The risk of holding $i$ shares is split $n + 1$ ways: the liquidity trader sells only $\\frac{n}{n + 1}i$ " +
            "now and keeps $\\frac{i}{n + 1}$ until $t = 2$, when the price returns to $\\mu$. Writing the price as " +
            "$S_1 = \\mu - \\lambda q$ with $q = \\frac{n}{n + 1}i$ gives a price-impact coefficient $\\lambda = " +
            "\\gamma\\sigma^2/n$.",
        },
        {
          kind: "example",
          title: "Competition shrinks the discount",
          problem:
            "Take $\\gamma = 0.01$, $\\sigma^2 = 2$ and $i = 1{,}000$ shares. Compute the discount with $n = 4$ and with $n = 19$ market makers.",
          steps: [
            "$\\gamma\\sigma^2 = 0.02$.",
            "$n = 4$: discount $= 0.02 \\times \\frac{1{,}000}{5} = \\$4.00$ per share.",
            "$n = 19$: discount $= 0.02 \\times \\frac{1{,}000}{20} = \\$1.00$ per share.",
          ],
          answer: "Quadrupling the number of risk bearers (from $5$ to $20$, counting the trader) cuts the discount by a factor of four.",
        },
      ],
    },

    {
      heading: "Fees, participation and measuring liquidity",
      blocks: [
        {
          kind: "formula",
          latex: "S_1 = \\mu - \\gamma\\sigma^2\\,\\frac{i}{n + 1} - \\frac{2n}{n + 1}\\,\\eta",
          caption: "With a per-share fee $\\eta$ on each trade, almost all of the market makers’ fees pass to the liquidity trader",
        },
        {
          kind: "list",
          items: [
            "**Per-share fees** act on every trade, so they widen the discount directly; a trader with a small enough order may choose not to trade at all.",
            "**Participation costs** act on the decision to be a market maker. Each one earns a certainty-equivalent $\\frac{\\gamma\\sigma^2}{2}\\left(\\frac{i}{n + 1}\\right)^2$ per episode, so entry stops when that falls below the cost — $n$ is determined in equilibrium.",
            "**Measuring liquidity**: the model suggests price impact ($\\lambda$, the price move per share traded) and the negative autocovariance of price changes, $\\text{Cov}(\\Delta_1, \\Delta_2) = -\\lambda^2\\,\\text{Var}(q)$, since the discount at $t = 1$ reverses at $t = 2$.",
          ],
        },
      ],
    },

    {
      heading: "Placing a single limit order",
      blocks: [
        {
          kind: "prose",
          text:
            "A risk-neutral market maker posts a sell LO at depth $\\delta$ above the midprice. Each arriving buy MO " +
            "fills it with probability $e^{-\\kappa\\delta}$, so the expected profit per arrival is $\\delta e^{-\\kappa\\delta}$. " +
            "Setting the derivative $e^{-\\kappa\\delta}(1 - \\kappa\\delta)$ to zero gives",
        },
        {
          kind: "formula",
          latex: "\\delta^{*} = \\frac{1}{\\kappa}, \\qquad \\delta^{*}e^{-\\kappa\\delta^{*}} = \\frac{1}{\\kappa e}",
        },
        {
          kind: "example",
          title: "Optimal depth",
          problem: "With $\\kappa = 50$ per dollar, find the optimal depth and the expected profit per MO arrival.",
          steps: [
            "$\\delta^{*} = 1/50 = \\$0.02$, i.e. $2$ cents from the midprice.",
            "Fill probability $e^{-1} \\approx 0.368$; expected profit $0.02 \\times 0.368 \\approx \\$0.00736$, about $0.74$ cents.",
          ],
          answer: "Post $2$ cents away and earn about $0.74$ cents per arriving MO. A thinner book (smaller $\\kappa$) means posting deeper.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "What the static model leaves out",
          text:
            "The depth $1/\\kappa$ does not depend on inventory, time left, or whether the MO carries " +
            "information. Chapter 10 adds all three: a market maker long inventory posts its sell order closer " +
            "and its buy order deeper, more so as the horizon nears.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 2, A Primer on the Microstructure of Financial Markets (§2.1 Market Making)" },
  ],
};
