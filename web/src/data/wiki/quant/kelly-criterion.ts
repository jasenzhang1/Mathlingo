import type { WikiArticle } from "../types";

export const kellyCriterionWiki: WikiArticle = {
  conceptId: "kelly-criterion",

  summary:
    "Single-period optimization says how to combine bets; it says nothing about how much to bet over time. Picking a " +
    "high-Sharpe portfolio every period is necessary but not sufficient for long-run success — sizing matters as much. " +
    "The Kelly criterion answers: bet the fraction of current capital that maximizes the expected log growth rate. That " +
    "strategy beats any other with probability one in the long run and reaches any wealth target fastest. It also bets " +
    "aggressively enough that almost nobody uses it at full strength. Jensen's Inequality and the Law of Large Numbers " +
    "are the prerequisites.",

  sections: [
    {
      heading: "A coin that doubles or halves",
      blocks: [
        {
          kind: "prose",
          text:
            "An asset returns $+100\\%$ or $-50\\%$ with equal probability: expected return $25\\%$, volatility $75\\%$. " +
            "Compare investing a constant dollar amount each period, investing once and letting it ride, and rebalancing " +
            "to a constant fraction $x$ of current capital. Every per-period portfolio has the same Sharpe ratio, yet the " +
            "outcomes differ enormously: letting it ride does badly (the asset's own log growth is " +
            "$\\frac{1}{2}\\log 2 + \\frac{1}{2}\\log\\frac{1}{2} = 0$), and the dynamic strategy's growth peaks at an interior $x$.",
        },
        {
          kind: "formula",
          latex: "\\max_x \\ \\mathbb{E}\\left[\\log(1 + xr)\\right] = \\tfrac{1}{2}\\log(1 + x) + \\tfrac{1}{2}\\log\\left(1 - \\tfrac{x}{2}\\right) \\quad\\Longrightarrow\\quad x^{*} = \\tfrac{1}{2}",
          caption: "Growth $\\frac{1}{2}\\log 1.125 \\approx 5.9\\%$ per period; betting $x = 1$, which maximizes expected return, gives zero growth",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Mean versus growth",
          text:
            "Long-run wealth is a product of gross returns, so its typical behaviour is governed by the average log return. " +
            "Maximizing expected wealth bets on rare lucky paths while the median path shrinks; maximizing expected log " +
            "wealth (log utility) maximizes almost-sure growth.",
        },
      ],
    },
    {
      heading: "The Kelly fraction",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[\\log(1 + xr)] \\approx x\\mu - \\tfrac{x^{2}}{2}(\\sigma^{2} + \\mu^{2}) \\quad\\Longrightarrow\\quad x^{*} \\approx \\frac{\\mu}{\\sigma^{2}}, \\qquad g^{*} \\approx \\frac{\\text{SR}^{2}}{2}",
          caption: "Accurate for daily Sharpe ratios up to about $0.1$; for many assets, $\\mathbf{x}^{*} = \\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\mu}$ — mean-variance with unit risk aversion per unit of wealth",
        },
        {
          kind: "list",
          items: [
            "**Volatility-to-capital** at Kelly equals the Sharpe ratio: $\\$1$B of capital and an annual Sharpe of $2$ calls for $\\$2$B of dollar volatility.",
            "**Expected return** at Kelly is $\\text{SR}^{2}$: $25\\%$ a year for a Sharpe of $0.5$.",
            "**The US market** (1926–2018, Sharpe $0.44$, volatility $18.3\\%$): $x^{*} \\approx \\frac{0.44}{0.183} \\approx 2.4$; the historically best leverage was $2.2$, for $9.7\\%$ annual growth.",
            "**Growth is a parabola in $x$**: $g(x) = x\\mu - \\frac{x^{2}\\sigma^{2}}{2}$. Betting $1.5\\times$ Kelly keeps $75\\%$ of the growth; $2\\times$ Kelly keeps none.",
          ],
        },
        {
          kind: "example",
          title: "Sizing one asset",
          problem: "An asset has expected excess return $6\\%$ and volatility $20\\%$ a year (Sharpe $0.3$). What does Kelly prescribe, and what growth does it deliver?",
          steps: [
            "$x^{*} = \\frac{0.06}{0.04} = 1.5$: lever to $150\\%$ of capital.",
            "Growth $g = 1.5(0.06) - \\frac{1.5^{2}(0.04)}{2} = 0.09 - 0.045 = 4.5\\%$, which equals $\\frac{0.3^{2}}{2}$.",
            "Doubling time $\\approx \\frac{\\log 2}{0.045} \\approx 15.4$ years.",
          ],
          answer: "Portfolio volatility $1.5 \\times 20\\% = 30\\%$ — equal to the Sharpe ratio in units of capital, as always at Kelly.",
        },
      ],
    },
    {
      heading: "Why Kelly, and why not",
      blocks: [
        {
          kind: "list",
          items: [
            "**Breiman**: the log-optimal strategy ends with more wealth than any strategy with lower expected growth, with probability one.",
            "**Sign of growth decides fate**: $g > 0$ sends wealth to infinity, $g < 0$ to zero, almost surely — even with a positive expected return.",
            "**Fastest to a target**: log wealth is roughly Brownian motion with drift $g$, so the expected time to multiply wealth by $C$ is $\\frac{\\log C}{g}$, minimized by Kelly. At Sharpe $1$, doubling takes about $1.4$ years and a tenfold gain $4.6$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "What Kelly doesn't promise",
          text:
            "It does not maximize Sharpe and gives no drawdown protection: at full Kelly the chance of ever losing half your " +
            "peak wealth is about $50\\%$. And it assumes you know the Sharpe ratio. If you think it is $1$ but it is $0.5$, " +
            "you bet twice the true Kelly and your growth is zero. These are the reasons for the next lesson.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 12, §12.1 The Kelly Criterion (Examples 12.1–12.3, Theorem 12.1)" },
    { source: "Kelly, “A New Interpretation of Information Rate”, Bell System Technical Journal (1956)", locator: "The original paper" },
    { source: "Breiman, “Optimal Gambling Systems for Favorable Games”, Berkeley Symposium (1961)", locator: "Optimality theorems" },
    { source: "MacLean, Thorp and Ziemba (eds.), The Kelly Capital Growth Investment Criterion", locator: "Survey of theory and practice" },
  ],
};
