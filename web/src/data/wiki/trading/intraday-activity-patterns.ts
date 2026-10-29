import type { WikiArticle } from "../types";

export const intradayActivityPatternsWiki: WikiArticle = {
  conceptId: "intraday-activity-patterns",

  summary:
    "Trading activity is not spread evenly over the day. Volume is high at the open, sags at midday and peaks " +
    "into the close; volatility is highest in the first minutes and then settles. The two move together. Trades " +
    "also cluster at round prices. Execution algorithms rely on these regularities: a VWAP order trades along " +
    "the expected volume curve, and a risk-aware schedule avoids the most volatile minutes.",

  sections: [
    {
      heading: "Volume and volatility through the day",
      blocks: [
        {
          kind: "table",
          headers: ["Time", "Volume", "Volatility", "Why"],
          rows: [
            ["Open", "High", "Highest", "Overnight news is incorporated; uncertainty about the price is greatest"],
            ["Midday", "Low", "Plateau", "Little new information; patient traders wait"],
            ["Close", "Highest, including the closing auction", "Modest", "Urgency: positions must be done by the close, and index funds trade at the closing price"],
          ],
        },
        {
          kind: "formula",
          latex: "\\text{RV} = \\sqrt{\\sum_{j=1}^{n} r_j^2}",
          caption: "Realised volatility over a window, from $n$ intra-window returns",
        },
        {
          kind: "example",
          title: "Realised volatility and noise",
          problem:
            "Over $5$ minutes, the one-minute returns are $2$, $-3$, $1$, $4$ and $0$ bps. Compute the realised volatility. Separately, if a day’s RV uses $n = 390$ one-minute returns and microstructure noise has standard deviation $\\omega = 0.5$ bps, how much does noise inflate realised variance?",
          steps: [
            "$\\sum r_j^2 = 4 + 9 + 1 + 16 + 0 = 30$ bps$^2$, so $\\text{RV} = \\sqrt{30} \\approx 5.48$ bps.",
            "Noise bias $\\approx 2n\\omega^2 = 2 \\times 390 \\times 0.25 = 195$ bps$^2$.",
          ],
          answer: "$5.48$ bps; and a $195$ bps$^2$ bias, which grows with $n$. That is why practitioners often sample every five minutes rather than every second.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why volume and volatility move together",
          text:
            "In a mixture-of-distributions view, both are driven by the same latent rate of information " +
            "arrival. When news flows fast, prices move more and more traders rebalance. Information arrival " +
            "explains the morning volatility; urgency interacting with market quality explains the close — " +
            "liquidity attracts traders, who in turn supply more liquidity.",
        },
      ],
    },

    {
      heading: "Using the volume curve",
      blocks: [
        {
          kind: "example",
          title: "Planning a VWAP order",
          problem:
            "The day has $13$ half hours. The expected profile puts $12\\%$ of volume in the first, $5\\%$ in each of the next eight, and splits the rest equally across the last four. You must buy $250{,}000$ shares. How many should you plan for the first and last half hours?",
          steps: [
            "Remaining share for the last four: $100 - 12 - 8 \\times 5 = 48\\%$, i.e. $12\\%$ each.",
            "First half hour: $0.12 \\times 250{,}000 = 30{,}000$ shares; same for each of the last four.",
            "Each midday half hour: $0.05 \\times 250{,}000 = 12{,}500$ shares.",
          ],
          answer: "$30{,}000$ shares in each of the first and last half hours. Trading in proportion to expected volume keeps your participation rate — and your impact — roughly constant.",
        },
        {
          kind: "list",
          items: [
            "Daily volume itself is persistent: log volume is well described by an AR(1) around its mean, which gives the forecast of the day’s total.",
            "Plotting every day’s profile as a curve (a functional data view) shows how much the shape varies day to day, not just its average.",
            "If volume runs far above forecast, a volume-tracking algorithm should speed up with it rather than stick to the static plan.",
          ],
        },
      ],
    },

    {
      heading: "Round prices",
      blocks: [
        {
          kind: "prose",
          text:
            "If prices ended uniformly in each of the $100$ cent values, $1\\%$ of trades would print at a whole " +
            "dollar. Far more do — around five times as many in the book’s data — with smaller spikes at $50$, " +
            "$25$ and multiples of $10$ cents. Because trades happen against resting limit orders, the clustering " +
            "reveals a preference for *providing liquidity* at round prices: people post limit orders there.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Round numbers are where the depth is",
          text:
            "A seller who needs liquidity can expect thicker books just at round prices, and a buyer posting at " +
            "$\\$50.00$ joins a long queue. Posting one tick inside a round price can jump that queue.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 4, Empirical and Statistical Evidence: Activity and Market Quality (§4.1–4.2)" },
  ],
};
