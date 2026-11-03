import type { WikiArticle } from "../types";

export const limitOrderBookWiki: WikiArticle = {
  conceptId: "limit-order-book",

  summary: "The limit order book (LOB) collects all resting limit orders on a grid of prices one tick apart. Its best bid and ask define the quoted spread and the midprice; the queue sizes at the touch define depth and the microprice; and a market order larger than the depth at the best price walks the book, paying progressively worse prices. Exchanges add many order types (IOC, fill-or-kill, iceberg, hidden, pegged) and charge maker–taker fees, which change the net price traders actually get.",

  sections: [
    {
      heading: "Reading the book",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{spread}_t = P^{a}_t - P^{b}_t, \\qquad S_t = \\tfrac{1}{2}(P^{a}_t + P^{b}_t), \\qquad S^{\\mu}_t = \\frac{V^{b}_tP^{a}_t + V^{a}_tP^{b}_t}{V^{b}_t + V^{a}_t}",
          caption: "Quoted spread, midprice and microprice; the microprice leans toward the side with the thinner queue.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Tick", description: "The minimum price increment, one cent for US stocks above \\$1; one tick is about $0.22$ bps for a \\$450 stock but $5$ bps for a \\$20 stock." },
            { term: "Depth", description: "Volume available at a price level; at the touch it is the size an MO can trade without moving price." },
            { term: "Locked market", description: "Bid equals ask; it rarely lasts." },
          ],
        },
      ],
    },
    {
      heading: "Walking the book",
      blocks: [
        {
          kind: "example",
          title: "Average price of a large MO",
          problem: "The ask side has $200$ shares at \\$50.00, $200$ at \\$50.01 and $300$ at \\$50.02, with the bid at \\$49.99. A buy MO for $500$ shares arrives.",
          answer: "Walking the book makes the average cost grow with size, which is the temporary impact the execution chapters model as $k\\nu$.",
          steps: [
            "It takes $200$ at \\$50.00, $200$ at \\$50.01 and the last $100$ at \\$50.02.",
            "Average price: $(10{,}000 + 10{,}002 + 5{,}002)/500 = \\$50.008$.",
            "The midprice is \\$49.995, so the premium over the mid is $1.3$ cents per share.",
          ],
        },
        {
          kind: "prose",
          text: "With a block-shaped book of depth $D$ per tick, a buy of $Q$ shares pays roughly $\\frac{Q}{2D}$ ticks above the best ask on average, so total walking cost grows like $Q^2$. Splitting the order and letting the book refill is cheaper, which is the starting point of optimal execution.",
        },
      ],
    },
    {
      heading: "Order types and fees",
      blocks: [
        {
          kind: "table",
          headers: ["Order type","Behaviour"],
          rows: [
            ["Immediate-or-cancel","Executes what it can at the best price, cancels the rest"],
            ["Fill-or-kill","Executes in full at the best price or not at all"],
            ["Iceberg","Shows only part of its size, replenishing it"],
            ["Hidden","Shows nothing; may fill ahead of displayed orders at the same or better price"],
            ["Pegged / discretionary","Moves with the midpoint or best price, or trades at a better hidden price, inside the matching engine"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Quoted prices are not net prices",
          text: "Under maker–taker fees the taker pays a fee and the maker earns a rebate, so a one-cent spread plus a $0.3$-cent taker fee on each leg costs a round-tripping taker $1.6$ cents per share. Algorithms must optimise net prices.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 1, §1.3.4–1.4 Extended order types, exchange fees and the limit order book" },
  ],
};
