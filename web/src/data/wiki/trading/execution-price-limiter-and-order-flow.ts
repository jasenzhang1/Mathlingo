import type { WikiArticle } from "../types";

export const executionPriceLimiterAndOrderFlowWiki: WikiArticle = {
  conceptId: "execution-price-limiter-and-order-flow",

  summary: "Two ways execution must react to the market. With a price limiter, an agent acquiring shares buys the remainder in one costly block if the price hits a cap, so she accelerates as the price approaches it, and more so in volatile markets. With informative order flow, other traders’ net buying or selling shifts the midprice drift; a liquidating agent then slows down when flow is buy-heavy and speeds up when it is sell-heavy, around the Almgren–Chriss schedule.",

  sections: [
    {
      heading: "Acquisition with a price limiter",
      blocks: [
        {
          kind: "prose",
          text: "The agent stops when she reaches her target, when time runs out, or when the midprice hits the cap $\\bar{S}$; in the last two cases she buys the remainder at $S + \\alpha Y$ per share. Ignoring permanent impact, the value separates as $y^2h(t, S)$, and $h$ solves a Fisher-type PDE in $(t, S)$ with $h = \\alpha$ on the cap.",
        },
        {
          kind: "list",
          items: [
            "A maximum principle bounds the solution and shows she trades at least as fast as without the cap at every inventory.",
            "Far below the cap she trades like the no-limit agent; near it her speed rises sharply.",
            "Higher volatility raises the chance of hitting the cap, so she acquires faster, unlike the Almgren–Chriss case where volatility does not enter without a penalty.",
          ],
        },
      ],
    },
    {
      heading: "Informative order flow",
      blocks: [
        {
          kind: "formula",
          latex: "d\\mu^{\\pm}_t = -\\kappa\\mu^{\\pm}_t dt + \\eta\\,dL^{\\pm}_t, \\qquad dS_t = b(\\mu^{+}_t - \\mu^{-}_t - \\nu_t)dt + \\sigma dW_t",
          caption: "Buy and sell order flow jump at MO arrivals and decay; their difference pushes the midprice drift.",
        },
        {
          kind: "formula",
          latex: "\\nu^{*}_t = \\nu^{\\text{AC}}_t - \\frac{b}{2k}\\int_t^T\\frac{\\sinh(\\gamma(T - u))}{\\sinh(\\gamma(T - t))}\\mathbb{E}_t[\\mu_u]\\,du",
          caption: "With full liquidation, the speed is the AC speed adjusted by a weighted average of expected future net flow.",
        },
        {
          kind: "example",
          title: "Size of the adjustment",
          problem: "Suppose the weighted integral of expected net flow is $400$ shares, $b = 10^{-5}$ and $k = 5 \\times 10^{-5}$.",
          answer: "She sells into others’ selling, both to beat the trend and to hide her orders.",
          steps: [
            "The adjustment is $-\\frac{10^{-5}}{10^{-4}} \\times 400 = -40$ shares per unit time.",
            "Buy-heavy flow ($\\mu > 0$) lowers her selling speed; sell-heavy flow raises it.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Predictability invites speculation",
          text: "Unconstrained, the strategy may buy while liquidating or overshoot to negative inventory; the book imposes $\\nu \\ge 0$ and stops at zero inventory, a practical approximation.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 7, §7.2 Acquisition with a price limiter, §7.3 Incorporating order flow" },
  ],
};
