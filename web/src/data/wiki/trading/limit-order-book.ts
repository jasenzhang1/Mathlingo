import type { WikiArticle } from "../types";

export const limitOrderBookWiki: WikiArticle = {
  conceptId: "limit-order-book",

  summary:
    "The limit order book (LOB) is the list of every resting buy and sell limit order, sorted by price. Its " +
    "top — the best bid and best ask — defines the spread and the midprice; the volumes behind them define " +
    "depth and the microprice. A market order consumes the book from the top down, so a large one “walks the " +
    "book” and pays more than the spread. Fees, hidden orders and the tick size all shape what the visible book " +
    "really tells you.",

  sections: [
    {
      heading: "Reading the book",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Best bid $P^{b}$, best ask $P^{a}$", description: "The highest resting buy price and the lowest resting sell price." },
            { term: "Quoted spread", description: "$P^{a} - P^{b}$, often quoted in basis points of the midprice." },
            { term: "Midprice", description: "$S = \\frac{1}{2}(P^{a} + P^{b})$, the usual reference price." },
            { term: "Depth", description: "The volume available at (or near) the best quotes, in shares or dollars." },
            { term: "Tick", description: "The minimum price increment, usually one cent in US equities — large relative to a $\\$20$ stock’s price, tiny for a $\\$450$ one." },
          ],
        },
        {
          kind: "formula",
          latex: "S^{\\mu} = \\frac{V^{b}P^{a} + V^{a}P^{b}}{V^{b} + V^{a}} = P^{b} + I\\,(P^{a} - P^{b}), \\qquad I = \\frac{V^{b}}{V^{b} + V^{a}}",
          caption: "The microprice weights each quote by the volume on the opposite side",
        },
        {
          kind: "prose",
          text:
            "When the bid queue $V^{b}$ is much larger than the ask queue $V^{a}$, the ask is more likely to be " +
            "depleted first and the price to tick up, so the microprice sits closer to the ask. It is a better " +
            "short-horizon estimate of the “true” price than the midprice, which ignores volume entirely.",
        },
      ],
    },

    {
      heading: "Walking the book",
      blocks: [
        {
          kind: "example",
          title: "The cost of a large market order",
          problem:
            "The ask side holds $300$ shares at $\\$25.00$, $400$ at $\\$25.01$ and $500$ at $\\$25.02$; the best bid is $\\$24.98$ with $600$ shares. A buy MO for $1{,}000$ shares arrives. Find its average price, its cost relative to the midprice, and the microprice before the trade.",
          steps: [
            "Fill $300$ at $25.00$, $400$ at $25.01$ and the remaining $300$ at $25.02$: $7{,}500 + 10{,}004 + 7{,}506 = \\$25{,}010$.",
            "Average price $25{,}010 / 1{,}000 = \\$25.010$. The midprice is $\\frac{1}{2}(24.98 + 25.00) = \\$24.99$, so the MO pays $2.0$ cents per share above it — twice the half-spread of $1$ cent.",
            "Microprice: $\\frac{600 \\times 25.00 + 300 \\times 24.98}{900} = \\frac{22{,}494}{900} \\approx \\$24.9933$, above the midprice because the bid queue is twice the ask queue.",
          ],
          answer: "Average price $\\$25.010$, a cost of $2$ cents per share over the midprice. Splitting the order into child orders that let the book refill would cost less.",
        },
      ],
    },

    {
      heading: "Order types, fees and what the book hides",
      blocks: [
        {
          kind: "table",
          headers: ["Feature", "What it does", "Why it matters"],
          rows: [
            ["Maker–taker fees", "The taker (MO) pays a fee, e.g. $0.30$ cents per share; the maker (LO) receives a rebate, e.g. $0.20$ cents", "The economic spread differs from the quoted one: across a one-cent spread, a taker’s round trip of two MOs costs $1 + 2(0.30) = 1.6$ cents"],
            ["Inverted (taker–maker) venues", "Pay takers and charge makers", "Attract traders who want to cross the spread cheaply, or to jump a long queue"],
            ["Hidden and iceberg orders", "Rest in the book without displaying all (or any) of their size", "Visible depth understates true depth; an MO may fill more than it could see"],
            ["Pegged and discretionary orders", "Track a reference price (e.g. the midprice) inside the matching engine", "Re-price faster than any order sent from outside the exchange"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Rebuilding the book from messages",
          text:
            "Order-level message data records every submission, cancellation and execution. Replaying them in " +
            "order reconstructs the full book at every instant. Market orders never appear as resting entries: " +
            "they show up only as executions that remove volume from the opposite side.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Equal price does not mean equal value",
          text:
            "Every order at the best bid trades at the same price, yet the order at the front of the queue " +
            "fills first and fills more often when the next move is favourable. Orders at the back fill mostly " +
            "when an informed MO is about to push the price through them. Queue position is worth money.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 1, Electronic Markets and the Limit Order Book (§1.3–1.4)" },
  ],
};
