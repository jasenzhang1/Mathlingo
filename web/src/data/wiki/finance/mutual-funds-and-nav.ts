import type { WikiArticle } from "../types";

export const mutualFundsAndNavWiki: WikiArticle = {
  conceptId: "mutual-funds-and-nav",

  summary:
    "A mutual fund pools many investors' money into one portfolio and issues shares in it. Its price is not " +
    "set by trading but computed: the net asset value, total assets minus liabilities divided by shares " +
    "outstanding, calculated once a day after markets close. Every buy and sell order placed during the day " +
    "is filled at that next NAV, which is the defining mechanical difference from an ETF.",

  sections: [
    {
      heading: "Net asset value",
      blocks: [
        {
          kind: "formula",
          latex: "NAV = \\frac{\\text{market value of assets} - \\text{liabilities}}{\\text{shares outstanding}}",
        },
        {
          kind: "prose",
          text:
            "Assets are the securities at their closing prices plus cash; liabilities include accrued fees " +
            "and amounts owed for pending trades. When an investor buys in, the fund issues new shares at NAV " +
            "and adds the cash; when one redeems, it cancels shares and pays NAV. Either way existing holders " +
            "are unaffected, so NAV per share changes only when the *holdings* change in value.",
        },
        {
          kind: "example",
          title: "Computing NAV",
          problem:
            "A fund holds $\\$52$ million of securities and $\\$1$ million in cash, owes $\\$0.5$ million, and has $2.5$ million shares outstanding. What is its NAV?",
          steps: ["$NAV = \\frac{52 + 1 - 0.5}{2.5} = \\frac{52.5}{2.5}$ (in millions)."],
          answer: "$NAV = \\$21.00$ per share.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Forward pricing",
          text:
            "An order placed at $11$ a.m. does not get the $11$ a.m. value — it gets the NAV computed after the " +
            "$4$ p.m. Eastern close. This *forward pricing* rule stops investors from trading on stale prices " +
            "that already reflect news. Its cost is that you never know your exact price when you place the order.",
        },
      ],
    },

    {
      heading: "Distributions and total return",
      blocks: [
        {
          kind: "prose",
          text:
            "Funds must pass dividends and realised capital gains through to shareholders. Paying a " +
            "distribution moves cash out of the fund, so NAV drops by exactly the amount paid on the " +
            "ex-dividend date. The shareholder's wealth is unchanged before tax; the money has simply moved from " +
            "inside the fund to their account. Performance must therefore be measured as **total return**, " +
            "including distributions, never by the change in NAV alone.",
        },
        {
          kind: "example",
          title: "A distribution is not a loss",
          problem: "A fund starts the year at NAV $\\$22$, pays a $\\$2$ distribution during the year, and ends at NAV $\\$24.50$. What was the return?",
          steps: [
            "NAV change alone: $\\frac{24.50 - 22}{22} \\approx 11.4\\%$.",
            "Total return: $\\frac{24.50 - 22 + 2}{22} = \\frac{4.50}{22} \\approx 20.5\\%$.",
          ],
          answer: "About $20.5\\%$. Looking at NAV alone would understate it by nine points.",
        },
      ],
    },

    {
      heading: "Fees",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Expense ratio", description: "Annual operating cost as a fraction of assets, taken out of NAV daily. Includes the management fee." },
            { term: "Front-end load", description: "A sales charge deducted from the money invested. The *offering price* is $\\frac{NAV}{1 - \\text{load}}$." },
            { term: "Back-end load", description: "A charge on redemption, typically declining the longer the shares are held." },
            { term: "$12$b-$1$ fee", description: "An annual charge for marketing and distribution, counted inside the expense ratio and capped at $1\\%$." },
          ],
        },
        {
          kind: "example",
          title: "Front-end load",
          problem: "Invest $\\$10{,}000$ in a fund with NAV $\\$20$ and a $5\\%$ front-end load. How many shares do you get?",
          steps: [
            "Load: $0.05 \\times 10{,}000 = \\$500$, leaving $\\$9{,}500$ invested.",
            "Shares: $\\frac{9{,}500}{20} = 475$. Equivalently, the offering price is $\\frac{20}{0.95} \\approx \\$21.05$.",
          ],
          answer: "$475$ shares. The fund must return over $5\\%$ just to get back to $\\$10{,}000$.",
        },
      ],
    },

    {
      heading: "Kinds of pooled fund",
      blocks: [
        {
          kind: "table",
          headers: ["", "Open-end mutual fund", "Closed-end fund", "ETF"],
          rows: [
            ["Shares outstanding", "Change daily as investors buy and redeem", "Fixed after the offering", "Change via creation and redemption"],
            ["How you buy and sell", "With the fund, at NAV", "On an exchange", "On an exchange"],
            ["Price vs. NAV", "Always equal", "Can sit at a large premium or discount", "Kept close by arbitrage"],
            ["Price set", "Once daily", "Continuously", "Continuously"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Active vs. passive is a separate question",
          text:
            "“Mutual fund” describes the legal and pricing structure, not the strategy. There are index mutual " +
            "funds and actively managed ETFs. Over long horizons, most actively managed funds have trailed " +
            "their benchmark index after fees — the main argument for low-cost index funds of either structure.",
        },
      ],
    },
  ],

  references: [
    { source: "Bodie, Kane & Marcus, Investments", locator: "Ch. 4, Mutual Funds and Other Investment Companies" },
    { source: "U.S. Securities and Exchange Commission, Mutual Funds and ETFs: A Guide for Investors", locator: "Fees and Expenses; Buying and Selling Shares" },
  ],
};
