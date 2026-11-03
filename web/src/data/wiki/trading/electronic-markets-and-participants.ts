import type { WikiArticle } from "../types";

export const electronicMarketsAndParticipantsWiki: WikiArticle = {
  conceptId: "electronic-markets-and-participants",

  summary: "Electronic markets match people who want to buy with people who want to sell. To design a trading algorithm you need to know what is traded (shares, funds, ETFs), who trades and why (fundamental or noise traders, informed traders, market makers), and how the matching engine decides who trades with whom: price–time priority or pro-rata, lit or dark, with auctions at the open and close, and with colocated servers that trade fastest.",

  sections: [
    {
      heading: "What is traded and who trades",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Ordinary shares", description: "Claims on a firm’s profits with voting rights; preferred stock trades the vote for a pre-arranged but junior income." },
            { term: "Closed-end funds, open-end funds and ETFs", description: "Closed-end funds issue shares once and trade freely, possibly away from NAV; open-end funds create and redeem daily at NAV; ETFs trade intraday and are kept near NAV by in-kind creation and redemption of large creation units." },
            { term: "Fundamental, noise or liquidity traders", description: "Trade for reasons outside the exchange (rebalancing, cash needs), carrying little short-term price information." },
            { term: "Informed traders", description: "Trade on information not yet in prices; arbitrageurs are folded into this class." },
            { term: "Market makers", description: "Profit from facilitating trade, quoting both sides and managing inventory." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Market making is not the same as liquidity provision",
          text: "Market makers sometimes take liquidity, and informed traders sometimes post passive orders. Classify traders by why they trade, not by order type.",
        },
      ],
    },
    {
      heading: "How orders are matched",
      blocks: [
        {
          kind: "prose",
          text: "Market orders (MOs) execute immediately at the best available prices; limit orders (LOs) rest in the book at a chosen price until filled or cancelled. Under **price–time priority**, an incoming buy MO trades first against the lowest ask, and among orders at that price, the oldest. Under **pro-rata**, it is split among resting orders in proportion to their size. Auctions are used at the open, the close and after halts.",
        },
        {
          kind: "example",
          title: "Price–time versus pro-rata",
          problem: "Three sell LOs of $200$, $400$ and $600$ shares rest at the best ask, in that arrival order. A buy MO for $300$ shares arrives. How much does each fill?",
          answer: "Price–time rewards being early; pro-rata rewards posting size, which encourages oversized quotes.",
          steps: [
            "Price–time: the first LO fills $200$, the second fills the remaining $100$, the third fills nothing.",
            "Pro-rata: each fills $300 \\times$ its share of the $1{,}200$ posted: $50$, $100$ and $150$.",
          ],
        },
      ],
    },
    {
      heading: "Transparency, speed and fragmentation",
      blocks: [
        {
          kind: "list",
          items: [
            "**Lit and dark**: lit venues display their books; dark pools do not, and typically cross orders at the lit midprice.",
            "**Order-based versus level-book data**: order IDs let you follow each LO to its cancellation or execution; level books only report price-level totals.",
            "**Colocation**: renting space next to the matching engine gives uniform, fastest access, and a permanent advantage over everyone else.",
            "**Fragmentation**: around 2014 US equities traded on about a dozen lit exchanges and over $40$ dark venues, with trade-through rules re-routing orders to the best displayed prices.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this matters for algorithms",
          text: "Queue rules decide who fills, transparency decides what can be learned from the book, and latency decides who sees and acts first. Every algorithm in later chapters is a response to these institutional details.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 1, §1.1–1.3.3 Electronic markets, participants, orders and exchange structures" },
  ],
};
