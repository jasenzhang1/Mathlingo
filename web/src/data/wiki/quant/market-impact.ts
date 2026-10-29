import type { WikiArticle } from "../types";

export const marketImpactWiki: WikiArticle = {
  conceptId: "market-impact",

  summary:
    "Trading can make money, but it surely costs money — and the largest cost is usually not the commission but the fact " +
    "that our own trades move prices. Market impact can turn a profitable signal into a losing strategy and caps how " +
    "large any strategy can grow. Remarkably, across venues and asset classes the expected cost of a large order follows " +
    "one simple law: it grows like the square root of the order's share of market volume. This lesson describes impact, " +
    "its main models, and how it sets capacity.",

  sections: [
    {
      heading: "What impact is",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{expected cost} = \\text{spread cost} + \\text{temporary impact} + \\text{permanent impact}",
          caption: "Spread cost: crossing half the bid–ask spread. Temporary impact (slippage): the move during and just after execution, which relaxes. Permanent impact: what persists",
        },
        {
          kind: "list",
          items: [
            "**Mechanisms**: inventory depletion; information revealed by trading; mimetic behaviour; strategic traders exploiting predictable order flow.",
            "**Metaorders**: a large parent order is split into child orders over time and venues; participation (POV) is the order's share of market volume.",
            "**Liquidity** has depth (size at the quotes), breadth (many participants) and resiliency (how fast prices recover).",
            "**Execution trade-off**: aggressive orders pay more impact (implementation shortfall: average fill versus arrival price); passive orders risk not completing and paying clean-up costs later. Algorithms such as VWAP, TWAP and POV pick points on this trade-off.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Focus on temporary impact",
          text:
            "For portfolio optimization, temporary impact dominates in magnitude; spread costs are smaller and roughly " +
            "independent per trade, and permanent impact matters more for price formation than for sizing trades.",
        },
      ],
    },
    {
      heading: "Models",
      blocks: [
        {
          kind: "formula",
          latex: "I(T) = \\int_0^{T} f\\left(\\dot{x}(t)\\right)G(T - t)\\,dt",
          caption: "The propagator form: each instant of trading at speed $\\dot{x}$ has instantaneous impact $f$, which decays with kernel $G$",
        },
        {
          kind: "table",
          headers: ["Model", "Impact $f$ and decay $G$", "Unit cost of trading $Q$ over $T$"],
          rows: [
            ["Kyle; Huberman–Stanzl", "Linear, permanent", "Proportional to $Q$ (total cost $\\frac{\\lambda Q^{2}}{2}$)"],
            ["Almgren et al.", "Power law $\\propto \\sigma\\left(\\frac{\\dot{x}}{v}\\right)^{\\beta}$, $\\beta \\approx 0.6$, instantaneous", "$\\propto \\sigma\\left(\\frac{Q}{V}\\right)^{\\beta}$, falls like $T^{-\\beta}$"],
            ["Obizhaeva–Wang", "Linear, exponential decay with resilience time $\\tau$", "Slow execution ($T \\gg \\tau$): $\\propto \\frac{1}{T}$; fast: independent of $T$"],
            ["Gatheral", "Square-root, power-law decay", "$\\approx \\sigma\\sqrt{\\frac{Q}{v}}$, independent of $T$"],
          ],
        },
        {
          kind: "formula",
          latex: "\\frac{\\text{cost}}{Q} \\approx Y\\sigma\\sqrt{\\frac{Q}{V}}",
          caption: "The square-root law, with daily volatility $\\sigma$, daily volume $V$ and a constant $Y$ of order one",
        },
        {
          kind: "prose",
          text:
            "A dimensional argument (Pohl et al.) supports it: if the dimensionless cost depends only on traded value $Q$, " +
            "market volume $V$ and volatility $\\sigma$ (units of $\\text{time}^{-1/2}$), it must be a function of " +
            "$\\sigma\\sqrt{Q/V}$. Total cost then scales like $Q^{3/2}$: doubling an order multiplies its cost by $2.83$.",
        },
        {
          kind: "example",
          title: "Is the alpha worth the trade?",
          problem: "A signal predicts $50$ basis points; the stock's daily volatility is $2\\%$; take $Y = 1$.",
          steps: [
            "At $4\\%$ participation, cost $= 0.02\\sqrt{0.04} = 40$ bp — a thin $10$ bp net.",
            "Cost equals alpha when $\\sqrt{Q/V} = 0.25$, i.e. at $6.25\\%$ of daily volume.",
          ],
          answer: "Beyond about $6\\%$ participation this trade loses money, however good the signal.",
        },
      ],
    },
    {
      heading: "Impact sets capacity",
      blocks: [
        {
          kind: "prose",
          text:
            "Gross alpha PnL grows linearly with size, $aQ$; square-root impact costs grow like $kQ^{3/2}$. Net PnL peaks at " +
            "$Q^{*} = \\left(\\frac{2a}{3k}\\right)^{2}$, where a third of gross alpha is kept and two thirds go to impact. " +
            "Halving the alpha quarters the optimal size. Slow, low-turnover signals support far more capital than fast ones.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Calibrate to yourself",
          text:
            "Impact depends on your execution and on the information in your flow, and it can't be observed in historical " +
            "data. Don't take a vendor model at face value: calibrate $Y$ on your own fills so backtested and live PnL " +
            "agree, and remember that normal-day calibrations understate costs when everyone is exiting the same positions.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 10, §10.1 Market Impact" },
    { source: "Almgren, Thum, Hauptmann and Li, “Direct Estimation of Equity Market Impact”, Risk (2005)", locator: "Power-law impact" },
    { source: "Bouchaud, Bonart, Donier and Gould, Trades, Quotes and Prices", locator: "Ch. 12–13, the square-root law and propagator models" },
    { source: "Pohl, Ristig, Schachermayer and Tangpi, “The amazing power of dimensional analysis…”, Market Microstructure and Liquidity (2017)", locator: "Dimensional argument" },
  ],
};
