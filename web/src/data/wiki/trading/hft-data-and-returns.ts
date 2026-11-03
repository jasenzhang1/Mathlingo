import type { WikiArticle } from "../types";

export const hftDataAndReturnsWiki: WikiArticle = {
  conceptId: "hft-data-and-returns",

  summary: "High-frequency analysis starts from message data: every posted, cancelled and executed limit order with its ID, price, size and millisecond timestamp, from which the full book can be rebuilt and market orders inferred. Daily regressions show that order flow, net aggressive buying, moves with returns, as microstructure theory predicts. At one-second resolution returns look nothing like a Normal distribution: a third are exactly zero, the tails follow a power law with exponent near $3.35$, and the first autocorrelation is negative.",

  sections: [
    {
      heading: "From messages to a book",
      blocks: [
        {
          kind: "prose",
          text: "Messages record LO posts (B, S), cancellations (C, D) and executions (E, F). Processing them in time order rebuilds the book at any instant; cancellations and executions are matched to their original order IDs to recover price and size. Market orders never appear directly: they are inferred from the executions they trigger, and signing them correctly is what makes order flow measurable.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Order flow and returns",
          text: "In robust (Huber-loss) regressions of daily open-to-close returns, NASDAQ order flow is significant and positive for every liquid stock, consistent with Kyle and Glosten–Milgrom: net demand carries information. The constant and the lagged return are mostly insignificant, as efficiency predicts.",
        },
      ],
    },
    {
      heading: "One-second returns",
      blocks: [
        {
          kind: "list",
          items: [
            "Returns computed from the microprice avoid bid–ask bounce; for AAPL a one-bp move is about $4.5$ cents and one tick is $0.22$ bps.",
            "About $33\\%$ of one-second returns are exactly zero, so continuous models fit poorly at this scale.",
            "Tails follow a power law, $\\Pr(X > x) \\propto x^{-(\\alpha - 1)}$ with $\\hat{\\alpha} \\approx 3.35$, far heavier than Normal.",
            "The first-lag autocorrelation is significantly negative, a short-horizon mean-reversion that Roll’s bid–ask-bounce model also produces in trade prices.",
          ],
        },
        {
          kind: "example",
          title: "A power-law tail estimate",
          problem: "Tail returns above $x_{\\min} = 2$ bps are $[2, 3, 4, 8]$. Estimate the tail exponent by maximum likelihood.",
          answer: "Use the MLE, not a log–log regression, which is biased; its standard error is about $(\\hat{\\alpha} - 1)/\\sqrt{n}$.",
          steps: [
            "$\\hat{\\alpha} = 1 + n\\left[\\sum\\log(x_i/x_{\\min})\\right]^{-1}$.",
            "The logs are $0$, $0.405$, $0.693$ and $1.386$, summing to $2.485$.",
            "$\\hat{\\alpha} = 1 + 4/2.485 \\approx 2.61$.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 3, §3.1–3.2 The data, daily and intraday prices and returns" },
  ],
};
