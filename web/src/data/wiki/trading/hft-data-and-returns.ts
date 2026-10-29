import type { WikiArticle } from "../types";

export const hftDataAndReturnsWiki: WikiArticle = {
  conceptId: "hft-data-and-returns",

  summary:
    "High-frequency data are messages: every order added, cancelled or executed, time-stamped to the " +
    "millisecond or finer. Replaying them rebuilds the limit order book and recovers market orders and order " +
    "flow. At the daily scale, net order flow helps explain returns; at the one-second scale, returns are " +
    "mostly zero, fat-tailed (power-law tails with exponent near $3$) and negatively autocorrelated — facts " +
    "that a Normal random walk gets badly wrong.",

  sections: [
    {
      heading: "From messages to the book and to order flow",
      blocks: [
        {
          kind: "table",
          headers: ["Message", "Effect on the book"],
          rows: [
            ["Add (with order id, side, price, size)", "Insert a resting LO at its price level"],
            ["Cancel / partial cancel (order id, shares)", "Remove shares from that order — look up its price from the original add"],
            ["Execute (order id, shares)", "Remove shares from a resting order; the aggressor was a market order"],
          ],
          caption: "ITCH-style order-level data",
        },
        {
          kind: "prose",
          text:
            "Market orders never rest, so they appear only through the executions they cause: an execution " +
            "against a resting sell order is a buy MO. Summing aggressive buys minus aggressive sells over an " +
            "interval gives **net order flow**, the main explanatory variable in the chapter’s return regressions. " +
            "Daily regressions of returns on order flow (fitted robustly with Huber’s loss, which downweights " +
            "outliers) find order flow significant but with modest $R^2$ — it matters, but much of the daily " +
            "price move comes from elsewhere.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Use the microprice, not the last trade",
          text:
            "Trade prices bounce between bid and ask, which manufactures volatility and negative " +
            "autocorrelation out of nothing. At one-second frequency the book measures returns on the " +
            "microprice, which moves only when the quotes or their volumes do.",
        },
      ],
    },

    {
      heading: "Fat tails",
      blocks: [
        {
          kind: "formula",
          latex: "\\Pr(X > x) = \\left(\\frac{x_{\\min}}{x}\\right)^{\\alpha - 1}, \\quad x \\ge x_{\\min}, \\qquad \\hat{\\alpha} = 1 + n\\left[\\sum_{i=1}^{n} \\log\\frac{x_i}{x_{\\min}}\\right]^{-1}",
          caption: "Power-law tail and its maximum-likelihood exponent",
        },
        {
          kind: "example",
          title: "Estimating a tail exponent",
          problem: "Four absolute one-second returns above $x_{\\min} = 2$ bps are $[2.5, 4, 5, 10]$ bps. Estimate $\\alpha$.",
          steps: [
            "Log ratios: $\\log 1.25 + \\log 2 + \\log 2.5 + \\log 5 \\approx 0.2231 + 0.6931 + 0.9163 + 1.6094 = 3.4420$.",
            "$\\hat{\\alpha} = 1 + \\frac{4}{3.4420} \\approx 2.16$.",
          ],
          answer: "$\\hat{\\alpha} \\approx 2.16$. Real samples use thousands of tail points; for AAPL the book finds values near $3.35$, so the survival function decays like $x^{-2.35}$ — polynomially, not like $e^{-x^2/2}$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Fit tails by likelihood, not by a log–log line",
          text:
            "Regressing $\\log$ frequency on $\\log x$ gives biased exponents and meaningless standard errors, " +
            "because neighbouring histogram bins are not independent. The MLE above is consistent and comes with " +
            "a proper standard error.",
        },
      ],
    },

    {
      heading: "Autocorrelation and the bid–ask bounce",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{Cov}(\\Delta p_t, \\Delta p_{t-1}) = -\\frac{s^2}{4} \\quad\\Longrightarrow\\quad s = 2\\sqrt{-\\text{Cov}(\\Delta p_t, \\Delta p_{t-1})}",
          caption: "Roll’s model: an efficient random-walk price plus trades at bid or ask with equal probability",
        },
        {
          kind: "example",
          title: "Recovering the spread from trades",
          problem: "Trade-price changes have first-lag autocovariance $-0.0001$ dollars$^2$. What spread does Roll’s model imply?",
          steps: ["$s = 2\\sqrt{0.0001} = 2 \\times 0.01 = \\$0.02$."],
          answer: "A $2$-cent spread, estimated without ever seeing a quote.",
        },
        {
          kind: "list",
          items: [
            "Microprice returns also show a significant negative first-lag autocorrelation, so it is not only the bounce: short-lived overshoots revert.",
            "With $n = 23{,}400$ one-second returns, an autocorrelation outside $\\pm 1.96/\\sqrt{n} \\approx \\pm 0.0128$ is significant — but significance is not profitability, since the reversal is usually smaller than the spread you pay to trade it.",
            "Scaling by $\\sqrt{t}$ assumes independence: one-second volatility of $0.5$ bps would give $0.5\\sqrt{3{,}600} = 30$ bps per hour only if returns were uncorrelated.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 3, Empirical and Statistical Evidence: Prices and Returns (§3.1–3.2)" },
  ],
};
