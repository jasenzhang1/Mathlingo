import type { WikiArticle } from "../types";

export const intradayActivityPatternsWiki: WikiArticle = {
  conceptId: "intraday-activity-patterns",

  summary: "Volume and volatility move together and are persistent, so anything correlated with one helps forecast the other. Within the day, volume follows a U-shape, highest at the open and especially the close, while volatility is highest at the open and plateaus from midday. Within each second, volume spikes at the instants when timer-driven algorithms fire, and transaction prices cluster at whole and half dollars. These regularities are the raw material for volume forecasts and VWAP-style execution.",

  sections: [
    {
      heading: "Volume and volatility",
      blocks: [
        {
          kind: "prose",
          text: "Andersen and Bondarenko’s observation sets the tone: because volume and volatility are highly correlated and persistent, spreads, quote intensity and volume all forecast volatility. A mixture-of-distributions story explains it: a common rate of information arrival drives both, and conditioning on that rate makes returns closer to Normal.",
        },
        {
          kind: "formula",
          latex: "\\text{RV}_t = \\sqrt{\\sum_j r_{t,j}^2}",
          caption: "Realised volatility over a window from intraday returns $r_{t,j}$; microstructure noise biases it upward by about $2n\\omega^2$ for $n$ returns with noise variance $\\omega^2$.",
        },
      ],
    },
    {
      heading: "Intraday and intrasecond shapes",
      blocks: [
        {
          kind: "list",
          items: [
            "**U-shaped volume**: overnight news at the open; deadlines, index tracking and the closing auction at the close.",
            "**Declining volatility**: uncertainty is resolved through the morning while depth builds and spreads narrow.",
            "**Intrasecond spikes**: algorithms on timers send orders at round milliseconds; execution algorithms should randomise timing.",
            "**Round-number clustering**: liquidity providers prefer round prices (perhaps stop-loss and momentum orders), so trades and depth concentrate there.",
          ],
        },
        {
          kind: "example",
          title: "Allocating an order by the volume curve",
          problem: "A volume profile puts $12\\%$ of the day’s volume in the first half hour, $5\\%$ in each of eight midday half hours, and the rest equally in the last four. How much of a $250{,}000$-share order belongs in the first half hour, and what share goes to each closing half hour?",
          answer: "Trading in proportion to expected volume is the basis of VWAP execution (Chapter 9).",
          steps: [
            "First half hour: $0.12 \\times 250{,}000 = 30{,}000$ shares.",
            "Remaining share: $100 - 12 - 40 = 48\\%$ over four half hours, $12\\%$ each.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 4, §4.1–4.2 Daily volume and volatility, intraday and intrasecond patterns, price patterns" },
  ],
};
