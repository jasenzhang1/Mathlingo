import type { WikiArticle } from "../types";

export const equitiesAndStockMarketsWiki: WikiArticle = {
  conceptId: "equities-and-stock-markets",

  summary:
    "A share of stock is a slice of ownership in a firm: a residual claim on its assets and earnings after " +
    "employees, suppliers, lenders and bondholders are paid. Unlike a bond, nothing is promised — dividends " +
    "are discretionary and there is no maturity — so the payoff is uncertain but uncapped. Its value is " +
    "still the present value of what it is expected to pay, which is where the time value of money comes back in.",

  sections: [
    {
      heading: "What a share is",
      blocks: [
        {
          kind: "table",
          headers: ["", "Common stock", "Preferred stock", "Bond"],
          rows: [
            ["Claim", "Residual — whatever is left", "Fixed dividend, ahead of common", "Fixed coupons and principal"],
            ["Priority in bankruptcy", "Last", "Before common, after bonds", "First (by seniority)"],
            ["Voting rights", "Usually yes", "Usually no", "No"],
            ["Upside", "Unlimited", "Capped at the dividend", "Capped at promised payments"],
            ["Missed payment", "No default — dividends are optional", "Dividends accrue (if cumulative)", "Default"],
          ],
        },
        {
          kind: "prose",
          text:
            "Shareholders have **limited liability**: they can lose what they paid for the stock but no more, " +
            "even if the firm's debts exceed its assets. That makes a share's payoff resemble a call option on " +
            "the firm's assets with strike equal to its debt — an observation that links this lesson to options later.",
        },
      ],
    },

    {
      heading: "Returns",
      blocks: [
        {
          kind: "formula",
          latex: "R = \\frac{P_1 - P_0 + D_1}{P_0} = \\underbrace{\\frac{D_1}{P_0}}_{\\text{dividend yield}} + \\underbrace{\\frac{P_1 - P_0}{P_0}}_{\\text{capital gain}}",
          caption: "Holding-period return over one period",
        },
        {
          kind: "example",
          title: "Total return",
          problem: "Buy a share at $\\$50$, receive a $\\$1$ dividend, and sell at $\\$54$. What is the return?",
          steps: ["$R = \\frac{54 - 50 + 1}{50} = \\frac{5}{50}$."],
          answer: "$10\\%$ — a $2\\%$ dividend yield plus an $8\\%$ capital gain.",
        },
      ],
    },

    {
      heading: "Valuation: the dividend discount model",
      blocks: [
        {
          kind: "formula",
          latex: "P_0 = \\sum_{t=1}^{\\infty} \\frac{\\mathbb{E}[D_t]}{(1 + r)^{t}} \\qquad\\xrightarrow{\\;D_t = D_1(1 + g)^{t-1}\\;}\\qquad P_0 = \\frac{D_1}{r - g}",
          caption: "With constant dividend growth $g < r$, the sum is a growing perpetuity — the Gordon growth model",
        },
        {
          kind: "prose",
          text:
            "Here $r$ is the shareholders' required return, higher than a bond's because the cash flows are " +
            "riskier. Selling the stock later does not escape the formula: the sale price is itself the " +
            "present value of the dividends after that date. Rearranged, Gordon gives $r = \\frac{D_1}{P_0} + g$ — " +
            "expected return is dividend yield plus growth.",
        },
        {
          kind: "example",
          title: "Gordon growth",
          problem: "A stock just paid $D_0 = \\$2$. Dividends grow at $4\\%$ and investors require $9\\%$. What is it worth?",
          steps: [
            "Next year's dividend: $D_1 = 2 \\times 1.04 = \\$2.08$.",
            "$P_0 = \\frac{2.08}{0.09 - 0.04} = \\frac{2.08}{0.05}$.",
          ],
          answer: "$P_0 = \\$41.60$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Extremely sensitive to $r - g$",
          text:
            "In the example, raising $g$ from $4\\%$ to $5\\%$ lifts the value to $\\frac{2.10}{0.04} = \\$52.50$, " +
            "a $26\\%$ jump from a one-point change in a long-run assumption. When $g$ approaches $r$ the formula " +
            "explodes, and it is meaningless for $g \\ge r$. Treat it as a way to see what the price implies, " +
            "not as a precise valuation.",
        },
      ],
    },

    {
      heading: "How stocks trade",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Primary market", description: "Where the firm sells new shares and receives the cash — an initial public offering (IPO) or a later seasoned offering." },
            { term: "Secondary market", description: "Investors trading existing shares with each other on exchanges such as the NYSE and Nasdaq. The firm receives nothing from these trades." },
            { term: "Bid and ask", description: "The highest price a buyer is offering and the lowest a seller will accept. The gap, the *bid–ask spread*, is a cost of trading and a measure of liquidity." },
            { term: "Market order", description: "Trade immediately at the best available price. Certain to fill, uncertain price." },
            { term: "Limit order", description: "Trade only at a stated price or better. Certain price, may never fill. Resting limit orders form the *order book*." },
            { term: "Short selling", description: "Borrowing shares, selling them, and buying them back later to return. Profits if the price falls; losses are unlimited if it rises." },
          ],
        },
        {
          kind: "prose",
          text:
            "**Market capitalisation** is share price times shares outstanding — the market's valuation of the " +
            "whole equity. The **price-to-earnings ratio** $\\frac{P}{EPS}$ compares that value with current " +
            "profit; a high P/E signals that the market expects strong growth (a high $g$ in the Gordon model). " +
            "A stock split changes the share count and price proportionally and leaves market cap unchanged.",
        },
      ],
    },
  ],

  references: [
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 3, How Securities Are Traded; Ch. 18, Equity Valuation Models" },
    { source: "Berk & DeMarzo, Corporate Finance", locator: "Ch. 9, Valuing Stocks" },
  ],
};
