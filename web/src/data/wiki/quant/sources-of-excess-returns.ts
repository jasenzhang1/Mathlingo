import type { WikiArticle } from "../types";

export const sourcesOfExcessReturnsWiki: WikiArticle = {
  conceptId: "sources-of-excess-returns",

  summary:
    "An excess return is a return above what risk-free cash earns. Markets can be predictable and still be efficient, " +
    "because knowing something is not the same as being able to profit from it: risk, illiquidity and funding limits stop " +
    "traders from pushing prices all the way. Paleologo names five broad sources of excess returns — risk, liquidity, " +
    "funding constraints, predictable flows and informational advantage — plus the rare case of pure arbitrage. Every " +
    "strategy in this course is a way of harvesting one or more of them, through a pipeline that runs from data to risk " +
    "and alpha models, to portfolio construction, to attribution.",

  sections: [
    {
      heading: "Efficiency and its limits",
      blocks: [
        {
          kind: "prose",
          text:
            "Malkiel's definition: a market is efficient with respect to an information set $\\Theta$ if prices would be " +
            "unaffected by revealing $\\Theta$ to all participants — and so nobody can make economic profits trading on " +
            "$\\Theta$. The set might be past prices, all public information, or everything any investor knows. The " +
            "definition does **not** say $\\Theta$ is useless for prediction. It says traders won't trade on it until the " +
            "opportunity disappears.",
        },
        {
          kind: "example",
          title: "A forecast you shouldn't bet everything on",
          problem: "You expect the market to return $8\\%$ next year and cash $2\\%$. Market volatility is $20\\%$. You maximise $f\\mu - \\frac{\\lambda}{2}f^{2}\\sigma^{2}$ with risk aversion $\\lambda = 3$. What fraction $f$ goes into the market?",
          steps: [
            "Expected excess return $\\mu = 8\\% - 2\\% = 0.06$; variance $\\sigma^{2} = 0.04$.",
            "Setting the derivative to zero: $\\mu - \\lambda f \\sigma^{2} = 0$, so $f = \\frac{\\mu}{\\lambda\\sigma^{2}} = \\frac{0.06}{3 \\times 0.04}$.",
          ],
          answer: "$f = 0.5$. Even a correct forecast justifies only a partial position, because of risk — the first reason predictability survives.",
        },
      ],
    },
    {
      heading: "Five sources, and pure arbitrage",
      blocks: [
        {
          kind: "table",
          headers: ["Source", "Mechanism", "Example"],
          rows: [
            ["Risk", "Investors are paid for holding risks others dislike", "The equity premium; factor premia such as value"],
            ["Liquidity", "Assets that are hard or costly to trade can stay mispriced", "3Com–Palm, 2000: Palm shares couldn't be borrowed cheaply"],
            ["Funding", "Capital-constrained traders can't buy what they know is cheap", "Small funds unable to buy after a deleveraging spiral"],
            ["Predictable flows", "Institutions trade known securities on known dates; others provide liquidity beforehand", "Index reconstitution: TSLA joined the NASDAQ 100 on July 15, 2013"],
            ["Information", "Better or faster predictions than competitors (“statistical arbitrage”)", "Alternative data, superior models"],
            ["Pure arbitrage", "The same thing at two prices at once", "Cross-exchange price gaps, competed away by low-latency traders"],
          ],
        },
        {
          kind: "example",
          title: "The negative stub",
          problem: "After Palm's IPO, Palm was worth $\\$54$ billion and 3Com — which still owned $95\\%$ of Palm — was worth $\\$28$ billion. What did the market implicitly value 3Com's other businesses at?",
          steps: [
            "3Com's Palm stake was worth $0.95 \\times 54 = \\$51.3$ billion.",
            "Everything else: $28 - 51.3 = -\\$23.3$ billion (Paleologo quotes about $-\\$22$ billion using exact share counts), for a company with no debt, $\\$1$ billion of cash and positive cash flow.",
          ],
          answer: "A deeply negative stub. The obvious trade — long 3Com, short Palm — was blocked because Palm shares were nearly impossible to borrow: a liquidity limit, not a lack of information.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Flow provision is not front-running",
          text:
            "Buying ahead of an index addition uses public, rule-based information about future demand. Front-running " +
            "uses non-public knowledge of a client's order. The first is legitimate liquidity provision — and it is not " +
            "riskless: the stock can fall for its own reasons, or the reconstitution can be postponed.",
        },
        {
          kind: "prose",
          text:
            "These categories overlap. Flow predictability and liquidity are related, and whether a strategy is paid for " +
            "bearing risk or for knowing more is usually unclear. They are still useful for asking the most important " +
            "question about any strategy: **what is its edge, and who is on the other side?**",
        },
      ],
    },
    {
      heading: "The elements of the investment process",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "**Data**: prices and volumes; characteristics (per-security descriptors such as free cash flow over market cap, or six-month return); time series that aren't tied to one security (CPI, the 10-year yield, the VIX); and unstructured data (transcripts, news, satellite images).",
            "**Before the trade**: a risk model (portfolio volatility as the risk proxy), expected-return models (often thousands of signals) and transaction-cost and market-impact models.",
            "**During the trade**: portfolio construction — risk constraints or penalties, signal aggregation and hedging decisions — producing the trades.",
            "**After the trade**: performance attribution (what worked, and do we size bets well?) and intertemporal risk allocation and leverage (gross market value over assets under management).",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The map of this course",
          text:
            "The course follows this pipeline. Returns, volatility and factor models come first, then backtesting, then " +
            "mean-variance portfolios, market impact and hedging, and finally Kelly sizing and attribution. The underlying " +
            "mathematics — Kalman filters, GARCH, PCA, convex optimization, dynamic programming — is taught in the math " +
            "courses; each lesson lists the ones it builds on.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 1, §1.4 Where Do Excess Returns Come From? and §1.5 The Elements of Quantitative Investing" },
    { source: "Malkiel, “Efficient Market Hypothesis”, The New Palgrave Dictionary of Economics (1987)", locator: "Definition of efficiency" },
    { source: "Pedersen, Efficiently Inefficient", locator: "Ch. 1–3, on how active investors earn returns" },
  ],
};
