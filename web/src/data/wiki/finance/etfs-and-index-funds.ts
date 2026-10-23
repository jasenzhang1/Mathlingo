import type { WikiArticle } from "../types";

export const etfsAndIndexFundsWiki: WikiArticle = {
  conceptId: "etfs-and-index-funds",

  summary:
    "An index is a rule for combining many stock prices into one number; an index fund is a portfolio built " +
    "to follow that rule, so its return matches the index's at very low cost. An exchange-traded fund (ETF) " +
    "packages the same idea as a share that trades on an exchange all day, kept close to the value of its " +
    "holdings by an arbitrage mechanism unique to ETFs. Both are the standard tools of passive investing.",

  sections: [
    {
      heading: "How an index is built",
      blocks: [
        {
          kind: "table",
          headers: ["Weighting", "Weight of stock $i$", "Example"],
          rows: [
            ["Capitalisation-weighted", "$w_i = \\dfrac{P_i N_i}{\\sum_j P_j N_j}$", "S&P $500$, Nasdaq-$100$"],
            ["Price-weighted", "$w_i = \\dfrac{P_i}{\\sum_j P_j}$", "Dow Jones Industrial Average"],
            ["Equal-weighted", "$w_i = \\dfrac{1}{n}$, reset at each rebalance", "S&P $500$ Equal Weight"],
          ],
          caption: "$P_i$ is the share price and $N_i$ the shares outstanding (often float-adjusted)",
        },
        {
          kind: "prose",
          text:
            "The index return is the weighted average of its members' returns, $R_{\\text{index}} = \\sum_i w_i R_i$. " +
            "A cap-weighted index needs no trading to stay in line as prices move, because weights drift with " +
            "prices automatically — which is why it is the cheapest kind to track. Price weighting is a " +
            "historical artefact: a $\\$400$ stock counts eight times as much as a $\\$50$ stock regardless of firm size.",
        },
        {
          kind: "example",
          title: "Same move, different indexes",
          problem:
            "Stock A: $\\$10$, $100$ shares. Stock B: $\\$50$, $40$ shares. Stock C: $\\$20$, $50$ shares. B rises $10\\%$; the others are flat. What does each index return?",
          steps: [
            "Market caps: A $\\$1{,}000$, B $\\$2{,}000$, C $\\$1{,}000$, so cap weights are $25\\%$, $50\\%$, $25\\%$. Cap-weighted return: $0.5 \\times 10\\% = 5\\%$.",
            "Price-weighted: prices sum to $80$ and rise to $85$, so $\\frac{85}{80} - 1 = 6.25\\%$.",
            "Equal-weighted: $\\frac{1}{3} \\times 10\\% \\approx 3.33\\%$.",
          ],
          answer: "$5\\%$, $6.25\\%$ and $3.33\\%$ — the same market, three different “market returns.”",
        },
      ],
    },

    {
      heading: "Index funds and ETFs",
      blocks: [
        {
          kind: "table",
          headers: ["", "Traditional index mutual fund", "Index ETF"],
          rows: [
            ["Trading", "Bought from and sold to the fund", "Bought and sold on an exchange, like a stock"],
            ["Price", "NAV, set once a day after the close", "Market price, changing all day"],
            ["Order types", "Dollar amount at the next NAV", "Market, limit, stop orders; can be shorted"],
            ["Minimum", "Often a minimum investment", "One share (or a fraction, at some brokers)"],
            ["Tax efficiency", "Redemptions can force the fund to sell and realise gains", "In-kind redemptions avoid most realised gains"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Creation and redemption keep the price honest",
          text:
            "Large dealers called **authorised participants** can swap a basket of the underlying stocks for " +
            "new ETF shares (*creation*), or hand ETF shares back for the basket (*redemption*). If the ETF " +
            "trades above the value of its holdings, they create shares and sell them, pushing the price " +
            "down; if below, they buy shares and redeem them, pushing it up. This arbitrage is what keeps an " +
            "ETF's market price within a few cents of its intraday NAV for liquid underlying markets.",
        },
      ],
    },

    {
      heading: "Costs and tracking",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Expense ratio", description: "Annual fee as a fraction of assets, deducted continuously from the fund. Broad index funds charge around $0.03\\%$; many active funds charge $0.5\\%$–$1\\%$." },
            { term: "Tracking difference", description: "Fund return minus index return over a period. Usually slightly negative — roughly the expense ratio." },
            { term: "Tracking error", description: "The standard deviation of the return difference, $\\sqrt{\\text{Var}(R_{\\text{fund}} - R_{\\text{index}})}$. Measures how *consistently* the fund follows the index." },
          ],
        },
        {
          kind: "example",
          title: "What a fee compounds to",
          problem:
            "Invest $\\$10{,}000$ for $30$ years at a $7\\%$ gross return. Compare a $0.03\\%$ expense ratio with $1\\%$.",
          steps: [
            "Low cost: $10{,}000 \\times 1.0697^{30} \\approx \\$75{,}500$.",
            "High cost: $10{,}000 \\times 1.06^{30} \\approx \\$57{,}400$.",
          ],
          answer: "The $1\\%$ fee costs about $\\$18{,}000$ — roughly a quarter of the final balance.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Passive is not the same as low-risk",
          text:
            "An index fund removes the risk of picking the wrong stocks, not the risk of the market. A " +
            "cap-weighted fund is also concentrated in whatever is largest at the moment. And niche ETFs — " +
            "leveraged, inverse, or on thinly traded assets — can deviate widely from what their names suggest.",
        },
      ],
    },
  ],

  references: [
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 2, Asset Classes and Financial Instruments; Ch. 4, Mutual Funds and Other Investment Companies" },
    { source: "Malkiel, A Random Walk Down Wall Street", locator: "Part Four, A Practical Guide for Random Walkers" },
  ],
};
