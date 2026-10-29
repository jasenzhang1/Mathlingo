import type { WikiArticle } from "../types";

export const electronicMarketsAndParticipantsWiki: WikiArticle = {
  conceptId: "electronic-markets-and-participants",

  summary:
    "Modern equity trading happens on electronic exchanges, where a matching engine pairs buy and sell orders " +
    "by fixed rules. To design an algorithm you need three things: what is traded (shares, funds, ETFs), who " +
    "else is trading and why (noise, informed and market-making traders), and how the venue decides who trades " +
    "with whom (price–time or pro-rata priority, auctions, dark pools, and the physical race to the matching " +
    "engine that colocation buys).",

  sections: [
    {
      heading: "What is traded",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Ordinary share", description: "A claim on the firm’s profits plus a vote at shareholder meetings; the residual claimant, paid after all debt." },
            { term: "Preferred share", description: "Legally equity, so junior to every bond, but usually with no vote and a pre-arranged dividend — a hybrid of stock and bond." },
            { term: "Open-end fund", description: "Creates and redeems its own shares daily at net asset value (NAV), so its price is NAV by construction." },
            { term: "Closed-end fund", description: "Issues a fixed number of shares once; they then trade on an exchange and can drift far from NAV, since nobody can create or redeem them." },
            { term: "Exchange-traded fund (ETF)", description: "Trades on an exchange all day, but authorised participants can swap the underlying basket for new ETF shares (creation) or the reverse (redemption), which keeps the price close to NAV." },
          ],
        },
        {
          kind: "example",
          title: "ETF creation arbitrage",
          problem:
            "An ETF trades at $\\$50.30$ while its basket is worth $\\$50.20$ per ETF share. Creating a unit of $50{,}000$ shares costs $\\$0.04$ per share in fees and trading costs. What does an authorised participant earn by creating a unit and selling it?",
          steps: [
            "Buy the basket and deliver it for $50{,}000$ new ETF shares; sell them at $\\$50.30$.",
            "Gross edge per share: $50.30 - 50.20 = \\$0.10$. Net of costs: $0.10 - 0.04 = \\$0.06$.",
            "Per unit: $0.06 \\times 50{,}000 = \\$3{,}000$.",
          ],
          answer: "$\\$3{,}000$. The selling pressure from this trade is exactly what pushes the ETF price back toward its NAV.",
        },
      ],
    },

    {
      heading: "Who trades, and why",
      blocks: [
        {
          kind: "table",
          headers: ["Class", "Motive", "What it means for an algorithm"],
          rows: [
            ["Fundamental (noise, liquidity) traders", "Trade for reasons unrelated to short-term price moves: inflows, rebalancing, hedging", "Their orders are roughly uninformative at high frequency — the flow a market maker wants to trade against"],
            ["Informed traders", "Hold information (private, or faster processing of public news) about where prices are going", "Trading against them loses money; their flow is “toxic”"],
            ["Market makers", "Supply liquidity on both sides and earn the spread", "Must manage inventory and avoid being picked off by informed flow"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A trader’s class depends on the time scale",
          text:
            "A pension fund that rebalances after months of fundamental research is informed at the horizon of a " +
            "quarter, yet its orders carry little information about the next few seconds. A high-frequency " +
            "algorithm can sensibly treat that flow as noise. What counts as “informed” depends on the horizon " +
            "over which you are measuring.",
        },
      ],
    },

    {
      heading: "How orders are matched",
      blocks: [
        {
          kind: "prose",
          text:
            "Traders send **limit orders** (LOs), which rest in the book at a chosen price, and **market orders** " +
            "(MOs), which execute immediately against the best resting LOs. When an MO meets several LOs at the " +
            "same price, the venue’s priority rule decides who fills. Under **price–time priority** the best price " +
            "fills first and, at a price, the oldest order first. Under **pro-rata** matching, each order at the " +
            "best price fills in proportion to its size.",
        },
        {
          kind: "example",
          title: "Queue position under two rules",
          problem:
            "At the best bid sit three buy LOs, in arrival order: $1{,}500$, $1{,}500$ and $1{,}000$ shares (the last is yours). A sell MO for $2{,}000$ shares arrives. How much do you fill under each rule?",
          steps: [
            "Price–time: the first order fills $1{,}500$, the second $500$, and yours $0$.",
            "Pro-rata: the MO covers $2{,}000 / 4{,}000 = 50\\%$ of the queue, so each order fills half — yours fills $500$.",
          ],
          answer: "$0$ shares under price–time and $500$ under pro-rata. Price–time rewards being first; pro-rata rewards posting large orders.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Auctions", description: "Orders accumulate and cross at one price, typically at the open and close, concentrating liquidity when information is arriving." },
            { term: "Lit vs dark", description: "Lit venues display their resting orders; dark pools do not, and usually cross trades at the lit midprice, trading execution certainty for less information leakage." },
            { term: "Fragmentation", description: "The same stock trades on many venues; US order-protection (trade-through) rules make an MO that would walk one venue’s book get re-routed to better prices elsewhere." },
            { term: "Colocation", description: "Renting server space beside the matching engine to cut latency. Light in fibre covers about $200{,}000$ km/s, so $1{,}000$ km costs $5$ ms one way." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Know every venue’s rules",
          text:
            "Priority rules, order types, fees and auction schedules differ across venues trading the same " +
            "stock. An algorithm tuned to one venue’s queue dynamics can behave badly on another — the book " +
            "insists that designers know every order type available wherever their asset trades.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 1, Electronic Markets and the Limit Order Book (§1.1–1.3)" },
  ],
};
