import type { WikiArticle } from "../types";

export const marketsAndParticipantsWiki: WikiArticle = {
  conceptId: "markets-and-participants",

  summary:
    "Quantitative investing works with standardized, liquid contracts — stocks and ETFs, futures, bonds, vanilla options, " +
    "interest rate swaps and credit default swaps. They change hands on exchanges, over the counter through dealers, or in " +
    "dark pools, and the people on the other side of your trade have their own motives: dealers and brokers on the sell " +
    "side; indexers, hedgers, active managers, asset allocators, informed traders and retail investors on the buy side. Your " +
    "excess returns are the outcome of interacting with them, so it pays to know who they are and how they get paid.",

  sections: [
    {
      heading: "Standardized and liquid",
      blocks: [
        {
          kind: "prose",
          text:
            "A **liquid** contract can be bought and sold in size, quickly, without a transaction cost so high that the " +
            "strategy stops being worth running. Standardization and liquidity reinforce each other: when every unit of a " +
            "contract is interchangeable (each of Apple's $15.4$ billion shares is identical), demand concentrates in it, " +
            "bargaining disappears and no single trader can move the price much. A house is the opposite — every one is " +
            "unique, so each sale is a negotiation with a handful of buyers.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Standardization has a price",
          text:
            "Before 2008 credit default swaps came in many bespoke flavours. The ISDA “Big Bang” of April 2009 fixed coupons " +
            "at $100$ or $500$ basis points and introduced standard upfront payments. Liquidity and confidence returned, but " +
            "buyers lost the ability to tailor terms. Where to sit between customization and liquidity is an ongoing trade-off.",
        },
      ],
    },
    {
      heading: "Three ways to trade",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Exchange", description: "Anonymous orders (size, direction, price) rest in a **limit-order book**; a matching engine pairs buys with sells by priority rules. Only members trade directly. Stocks, listed options and futures trade here." },
            { term: "Over the counter (OTC)", description: "Clients trade through broker-dealers who quote prices and connect to each other. Bonds, swaps, CDS and spot currencies trade OTC — and currencies are among the most liquid markets in the world." },
            { term: "Dark pool", description: "An alternative trading system that hides its order book and reports trades only after execution, so institutions can trade size without revealing intent. About $16\\%$ of US share volume (2024)." },
          ],
        },
        {
          kind: "prose",
          text:
            "The **bid** is the highest price a buyer has posted, the **ask** the lowest price a seller has posted; the gap is " +
            "the **bid–ask spread**. A market order crosses the spread, paying roughly half of it relative to the mid price. " +
            "Exchange listing is neither necessary nor sufficient for liquidity: some listed stocks barely trade, while OTC " +
            "currency markets are enormous.",
        },
        {
          kind: "example",
          title: "What crossing the spread costs",
          problem: "A stock is quoted $\\$99.98$ bid, $\\$100.02$ ask. You buy $1{,}000$ shares with a market order and sell them a minute later, also with a market order, at unchanged quotes.",
          steps: [
            "Mid price $= \\$100.00$; quoted spread $= \\$0.04$, i.e. $\\frac{0.04}{100} = 4$ basis points of the mid.",
            "Buying at the ask costs $\\$0.02$ per share above mid; selling at the bid gives up another $\\$0.02$.",
            "Round trip: $1{,}000 \\times \\$0.04 = \\$40$.",
          ],
          answer: "$\\$40$, a full spread for the round trip — half a spread per leg.",
        },
      ],
    },
    {
      heading: "The sell side",
      blocks: [
        {
          kind: "table",
          headers: ["Role", "What it does", "How it is paid"],
          rows: [
            ["Dealer", "Takes the other side of client trades and holds inventory; makes markets by quoting bid and ask", "The realized spread, plus information gleaned from client order flow"],
            ["Broker", "Executes on the client's behalf without holding positions: splits and routes orders, clears and settles, provides custody, margin loans, short locates, research and capital introductions", "Commissions, interest on cash and loans, payment for order flow"],
            ["Broker-dealer", "Both roles in one firm", "Both — with a conflict of interest (front-running client orders) policed by the Securities Exchange Act of 1934"],
          ],
        },
        {
          kind: "prose",
          text:
            "Dealers are passive: they respond to clients rather than choosing their trades. That exposes them to " +
            "**adverse selection** — a client who knows more will trade exactly when the dealer's quote is stale. The " +
            "**realized spread** a dealer actually earns is usually below the quoted spread for this reason. Retail flow is " +
            "prized because it is uninformed; wholesalers pay brokers to route it to them (**payment for order flow**).",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Shorting runs through the broker",
          text:
            "To short, the broker locates and lends you shares, you sell them, and later buy them back. The broker invests " +
            "the cash proceeds at about SOFR plus a spread and pays you SOFR minus a spread (the rebate). Scarce shares carry " +
            "a borrow fee that can exceed any plausible profit — a theme that returns when we ask why mispricings persist.",
        },
      ],
    },
    {
      heading: "The buy side",
      blocks: [
        {
          kind: "list",
          items: [
            "**Indexers** replicate benchmarks (MSCI, S&P, Russell, CRSP, …) — over $37\\%$ of US market capitalization by 2020.",
            "**Hedgers** trade mainly to offset risk from their core business, like an airline buying fuel futures.",
            "**Institutional active managers** try to beat a benchmark. Their portfolio is the benchmark plus a tracking portfolio, whose volatility is the **tracking error**; a small tracking error makes a fund an “index hugger”.",
            "**Asset allocators** hold slowly changing mixes of asset classes, plus alternatives such as private equity and hedge funds.",
            "**Informed traders** — hedge funds and principal trading firms — seek absolute returns. They drive **price discovery** (trading mispricings toward fair value) and **liquidity provision** (meeting predictable demand).",
            "**Retail investors** trade through retail brokers — about $20\\%$ of US volume in 2020 — and are, on average, consistently unprofitable.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this matters for a quant",
          text:
            "Every strategy's profit is someone else's cost or risk transfer. Knowing who is forced to trade, who is " +
            "uninformed and who is constrained tells you where an edge can come from — the subject of the next lesson.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 1, The Map and the Territory (§1.1–1.3)" },
    { source: "Harris, Trading and Exchanges: Market Microstructure for Practitioners", locator: "Ch. 7 (Brokers) and Ch. 13 (Dealers)" },
  ],
};
