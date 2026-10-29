import type { WikiArticle } from "../types";

export const fractionalKellyAndDrawdownsWiki: WikiArticle = {
  conceptId: "fractional-kelly-and-drawdowns",

  summary:
    "Full Kelly maximizes growth but brings brutal volatility and drawdowns, and it is fragile to an overestimated Sharpe " +
    "ratio. Betting a fixed fraction of Kelly gives up surprisingly little growth for a large cut in risk; drawdown-based " +
    "rules such as Grossman and Zhou's go further, guaranteeing wealth never falls more than a set percentage below its " +
    "peak. This lesson quantifies both and connects them to log-return mean-variance optimization. Geometric Brownian " +
    "Motion supplies the continuous-time picture.",

  sections: [
    {
      heading: "Fractional Kelly",
      blocks: [
        {
          kind: "formula",
          latex: "x = f\\,x^{*} \\quad\\Longrightarrow\\quad g(f) = g^{*}(2f - f^{2}), \\qquad \\sigma(f) = f\\,\\sigma^{*}",
          caption: "Growth falls quadratically, volatility only linearly",
        },
        {
          kind: "table",
          headers: ["Fraction of Kelly", "Growth (share of max)", "Volatility (share)", "P(ever losing half)"],
          rows: [
            ["$1$", "$100\\%$", "$100\\%$", "$50\\%$"],
            ["$\\frac{1}{2}$", "$75\\%$", "$50\\%$", "$12.5\\%$"],
            ["$\\frac{1}{4}$", "$44\\%$", "$25\\%$", "$0.8\\%$"],
          ],
          caption: "The last column uses $P = c^{(2 - f)/f}$ for falling by a factor $c = \\frac{1}{2}$ under geometric Brownian motion",
        },
        {
          kind: "example",
          title: "Robustness to an optimistic Sharpe",
          problem: "You estimate Sharpe $1$; the truth is $0.7$. Compare betting your full estimated Kelly with half of it.",
          steps: [
            "Full estimated Kelly is $\\frac{1}{0.7} \\approx 1.43$ times true Kelly: growth share $2(1.43) - 1.43^{2} \\approx 0.82$.",
            "Half is $0.71$ times true Kelly: growth share $\\approx 0.92$ — with half the volatility.",
          ],
          answer: "Under-betting is cheap insurance. Since estimated Sharpe ratios are usually biased upward by selection, a fraction of Kelly is the practical norm.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A principled reason",
          text:
            "Maximize expected log return subject to a bound on the variance of log returns — a Sharpe ratio for log returns, " +
            "as advocated by Luenberger. The solution has Kelly's relative weights scaled down by a factor set by the " +
            "constraint: fractional Kelly falls out of a mean-variance problem on log wealth.",
        },
      ],
    },
    {
      heading: "Drawdown control: Grossman–Zhou",
      blocks: [
        {
          kind: "prose",
          text:
            "Let $M_t$ be the high watermark and $d_t = 1 - \\frac{W_t}{M_t}$ the current drawdown. To maximize long-run growth " +
            "while never letting $d_t$ exceed $D$, treat only the cushion above the floor $(1 - D)M_t$ as risk capital and " +
            "bet Kelly on it:",
        },
        {
          kind: "formula",
          latex: "x_t = x^{*}\\left(1 - \\frac{1 - D}{1 - d_t}\\right)",
          caption: "At a new high ($d_t = 0$) invest $D$ times Kelly; scale toward zero as the drawdown approaches $D$; with $D = 1$ this is plain Kelly",
        },
        {
          kind: "example",
          title: "Trading the cushion",
          problem: "High watermark $\\$150$M, $D = 0.2$, wealth $\\$130$M, Kelly fraction $1.5$.",
          steps: [
            "Floor $= 0.8 \\times 150 = \\$120$M; cushion $= \\$10$M.",
            "Risky position $= 1.5 \\times 10 = \\$15$M, i.e. $x^{*}\\left(1 - \\frac{0.8}{0.867}\\right) \\approx 0.115$ of wealth.",
          ],
          answer: "Losses shrink the cushion and the position together, so wealth never breaches the floor; a new high lifts the floor.",
        },
        {
          kind: "prose",
          text:
            "In Paleologo's simulations, at matched expected log return, fractional Kelly has lower volatility while " +
            "Grossman–Zhou has smaller maximum drawdowns — each wins on its own measure. Grossman–Zhou is path dependent and " +
            "pro-cyclical: it cuts risk after losses, which, if many funds do it at once, can feed a deleveraging spiral.",
        },
      ],
    },
    {
      heading: "Real-world variants",
      blocks: [
        {
          kind: "prose",
          text:
            "Investors evaluate funds over finite horizons and often measure drawdowns from a reference date, and every " +
            "rebalance costs money. The problem becomes a stochastic dynamic program over wealth, the current invested " +
            "fraction and time, maximizing terminal log wealth with a penalty for breaching the drawdown limit and " +
            "superlinear costs such as $c(x) \\propto |x|^{3/2}$. It has no closed form, but its numerical policy tolerates " +
            "deviations from target to save costs and de-risks as the horizon and the drawdown limit approach.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 12, §12.2–12.4 (log-return MVO, fractional Kelly, drawdown control, variants)" },
    { source: "Grossman and Zhou, “Optimal Investment Strategies for Controlling Drawdowns”, Mathematical Finance (1993)", locator: "Drawdown-constrained growth" },
    { source: "Luenberger, Investment Science", locator: "Log-optimal pricing and growth-volatility trade-offs" },
  ],
};
