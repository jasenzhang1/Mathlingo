import type { WikiArticle } from "../types";

export const styleFactorsWiki: WikiArticle = {
  conceptId: "style-factors",

  summary:
    "The factors in a fundamental model double as the most famous strategies in quantitative investing. Market, country " +
    "and industry factors capture broad co-movement. Style factors — momentum, value, low beta, and their relatives size " +
    "and quality — are characteristics whose long-short portfolios have historically earned premia. This lesson tours " +
    "them: how each loading is built, the competing stories for why it pays, and how to be sceptical in a literature with " +
    "hundreds of published “factors”. Paleologo's own tour is brief; the details here come from the papers he cites.",

  sections: [
    {
      heading: "Broad factors",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Market", description: "By far the most pervasive factor. Loadings are either all ones (a country intercept: every stock moves with the market equally, and a beta style captures the differences) or stocks' estimated betas to an index such as the S&P 500 or Russell 3000." },
            { term: "Countries and industries", description: "$0/1$ membership dummies summing to one per stock. How much of returns is country versus industry has long been studied (Heston and Rouwenhorst); in the regression they need constraints to resolve rank deficiency." },
          ],
        },
      ],
    },
    {
      heading: "The classic styles",
      blocks: [
        {
          kind: "table",
          headers: ["Factor", "Loading", "Main stories for the premium"],
          rows: [
            ["Momentum (Jegadeesh and Titman, 1993)", "Return over the past $12$ months skipping the latest one ($12$–$1$); the skip avoids short-term reversal", "Underreaction to news (behavioural, informational); compensation for severe crash risk"],
            ["Value (Fama and French)", "Book-to-price, earnings-to-price, cash-flow-to-price", "Distress risk in bad times; overreaction to bad news"],
            ["Low beta / low volatility (Frazzini and Pedersen, 2014)", "Estimated beta or volatility, with the long side in low-beta stocks", "Leverage constraints: investors who can't borrow buy high-beta stocks, overpricing them — a funding source"],
            ["Size", "Log market capitalization", "Liquidity and risk; weak and unstable after publication"],
            ["Quality (Asness, Frazzini and Pedersen, 2019)", "Profitability, growth, safety, payout", "Investors underpay for quality; theory-guided by a valuation model"],
          ],
        },
        {
          kind: "example",
          title: "Building a momentum loading",
          problem: "A stock traded at $\\$50$ twelve months ago and $\\$70$ one month ago. The cross-section's $12$–$1$ momentum has mean $0.10$ and standard deviation $0.20$.",
          steps: [
            "Raw momentum: $\\frac{70}{50} - 1 = 0.40$.",
            "Z-scored loading: $\\frac{0.40 - 0.10}{0.20} = 1.5$.",
          ],
          answer: "A loading of $1.5$; with a market or full industry set in the model, centring like this is a harmless rotation.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Momentum crashes",
          text:
            "After sharp market declines, the losers a momentum portfolio is short are often the most beaten-down, " +
            "high-beta stocks; when the market rebounds they rocket. Long $\\$50$M winners ($+5\\%$) and short $\\$50$M " +
            "losers ($+30\\%$) loses $\\$12.5$M in one move. The premium's risk story rests on episodes like this.",
        },
      ],
    },
    {
      heading: "Why these belong in a risk model — and in a portfolio",
      blocks: [
        {
          kind: "list",
          items: [
            "**Risk**: stocks with similar loadings co-move, so leaving a style out leaves correlated residuals and understated risk.",
            "**Exposure control**: a stock picker can measure, hedge and attribute unintended style tilts.",
            "**Premia**: “smart beta” products sell factor exposure itself — spanned alpha, with its factor risk.",
            "**Diversification**: value and momentum are negatively correlated. Two factors with Sharpe $0.4$ and correlation $-0.5$ combine to Sharpe $\\frac{0.8}{\\sqrt{2 - 1}} = 0.8$; three uncorrelated ones to $0.4\\sqrt{3} \\approx 0.69$.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Crowding",
          text:
            "In August 2007 many quant equity funds held similar factor positions; forced deleveraging by some produced " +
            "simultaneous losses for all, then a rebound. Factor strategies carry liquidity and crowding risk that their " +
            "historical returns don't show.",
        },
      ],
    },
    {
      heading: "The factor zoo",
      blocks: [
        {
          kind: "prose",
          text:
            "Hundreds of factors have been published, mostly found by searching the same US data. Harvey, Liu and Zhu argue " +
            "that, after accounting for all that testing, a new factor should clear a $t$-statistic of about $3$, not $2$. " +
            "Post-publication returns are typically lower — partly because some anomalies were data-mined, partly because " +
            "investors arbitrage the real ones.",
        },
        {
          kind: "example",
          title: "How long to be sure?",
          problem: "A factor's annual Sharpe ratio is $0.3$. How many years does its mean return need to reach $t = 3$?",
          steps: [
            "$t = \\text{SR}\\sqrt{Y}$, so $Y = \\left(\\frac{3}{0.3}\\right)^{2}$.",
          ],
          answer: "$100$ years. A $30$-year history of a Sharpe-$0.4$ factor gives only $t \\approx 2.2$ — which is why theory, out-of-sample and out-of-market evidence, and spanning tests against known factors matter so much.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where the edge comes from",
          text:
            "In the language of the first lesson: value is largely risk (plus behaviour), momentum is behavioural " +
            "information plus crash risk, and low beta is a funding constraint on other investors. Backtesting Best " +
            "Practices and the Rademacher Anti-Serum give the tools to test new ones honestly.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 6, §6.8 A Tour of Factors and §6.9 Further Reading" },
    { source: "Jegadeesh and Titman, “Returns to Buying Winners and Selling Losers”, Journal of Finance (1993)", locator: "Momentum" },
    { source: "Frazzini and Pedersen, “Betting Against Beta”, Journal of Financial Economics (2014)", locator: "Low beta" },
    { source: "Asness, Frazzini and Pedersen, “Quality Minus Junk”, Review of Accounting Studies (2019)", locator: "Quality" },
    { source: "Harvey, Liu and Zhu, “… and the Cross-Section of Expected Returns”, Review of Financial Studies (2016)", locator: "Multiple testing of factors" },
    { source: "Ilmanen, Expected Returns", locator: "Surveys of value, momentum and other premia" },
  ],
};
