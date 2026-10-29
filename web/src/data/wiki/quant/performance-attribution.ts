import type { WikiArticle } from "../types";

export const performanceAttributionWiki: WikiArticle = {
  conceptId: "performance-attribution",

  summary:
    "After the trade comes the reckoning: was it luck or skill, and where did the money come from? Factor-based " +
    "attribution splits PnL into factor, idiosyncratic and trading components, and that split looks precise — but it " +
    "rests on estimated factor returns, and ignoring their error produces genuine paradoxes. This lesson presents the " +
    "basic decomposition, the paradoxes and their resolution through attribution standard errors, and maximal " +
    "attribution, which assigns as much PnL as possible to a chosen set of correlated factors.",

  sections: [
    {
      heading: "The basic decomposition",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{PnL}_t = \\underbrace{\\mathbf{b}_t^{\\top}\\hat{\\mathbf{f}}_t}_{\\text{factor}} + \\underbrace{\\mathbf{w}_t^{\\top}\\hat{\\boldsymbol{\\epsilon}}_t}_{\\text{idiosyncratic}} + \\text{trading PnL}, \\qquad \\mathbf{b}_t = \\mathbf{B}_t^{\\top}\\mathbf{w}_t",
          caption: "Factor plus idiosyncratic is position PnL — what end-of-period holdings would earn with instantaneous, free trading; trading PnL is the rest of accounting PnL",
        },
        {
          kind: "prose",
          text:
            "An idealized high-frequency trader that ends each day flat has zero position PnL: everything it earns is " +
            "trading PnL — intraday alpha, spread captured by passive orders, minus the cost of aggressive ones. Factor PnL " +
            "splits further by factor and group, idiosyncratic PnL by stock. Since attribution is ex post, it can be run under " +
            "several risk models, not only the one used to build the portfolio.",
        },
      ],
    },
    {
      heading: "Two paradoxes and their resolution",
      blocks: [
        {
          kind: "list",
          items: [
            "**FMPs have idiosyncratic risk but no idiosyncratic PnL.** Estimated factor returns are defined as mimicking-portfolio returns, so an FMP's attributed idio PnL is zero every period — even if half its predicted variance is idiosyncratic.",
            "**Hedged portfolios.** A factor-neutral portfolio plus any multiple $\\lambda$ of an FMP has exactly the same attributed idio PnL, yet its idio volatility grows with $\\lambda$. Realized idio volatility can be made arbitrarily different from predicted.",
          ],
        },
        {
          kind: "prose",
          text:
            "The resolution: $\\hat{\\mathbf{f}}_t$ is an estimate, $\\hat{\\mathbf{f}}_t = \\mathbf{f}_t + \\boldsymbol{\\eta}_t$ with " +
            "$\\text{Cov}(\\boldsymbol{\\eta}) = (\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}$. The true split is random:",
        },
        {
          kind: "formula",
          latex: "\\text{true factor PnL} \\sim \\mathcal{N}\\left(\\mathbf{b}_t^{\\top}\\hat{\\mathbf{f}}_t, \\ \\mathbf{b}_t^{\\top}(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}\\mathbf{b}_t\\right), \\qquad \\text{true idio PnL} \\sim \\mathcal{N}\\left(\\mathbf{w}_t^{\\top}\\hat{\\boldsymbol{\\epsilon}}_t, \\ \\mathbf{b}_t^{\\top}(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}\\mathbf{b}_t\\right)",
          caption: "Report these standard errors with every attribution (Insight 13.1); the two estimates are negatively correlated, with covariance $-\\mathbf{b}^{\\top}(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}\\mathbf{b}$",
        },
        {
          kind: "example",
          title: "Is that loss real?",
          problem: "A book has exposure $b = 2$ (millions) to a factor with estimation-error variance $0.0001$, held for $250$ days. Cumulative attributed idio PnL is $-\\$0.5$M.",
          steps: [
            "Per-day error s.d. $= 2 \\times 0.01 = \\$0.02$M; over $250$ days, $0.02\\sqrt{250} \\approx \\$0.32$M.",
            "$95\\%$ interval: $-0.5 \\pm 1.96 \\times 0.32 \\approx [-1.12, 0.12]$.",
          ],
          answer: "Zero is inside: the attribution alone can't say stock selection lost money. For an FMP held $T$ periods, true idio PnL is a zero-mean variable with variance growing like $T$.",
        },
      ],
    },
    {
      heading: "Maximal attribution",
      blocks: [
        {
          kind: "prose",
          text:
            "A PM loses money on momentum, cuts momentum exposure to zero — and loses again in the next momentum crash, " +
            "through correlated factors. Standard attribution assigns that loss elsewhere; z-scoring a beta factor in a model " +
            "with a country factor likewise reshuffles PnL between them without changing anything real. Maximal attribution " +
            "gives a chosen set $S$ all the PnL its returns can explain:",
        },
        {
          kind: "formula",
          latex: "\\text{PnL}_S = \\mathbf{b}^{\\top}\\boldsymbol{\\Omega}_{\\cdot,S}\\boldsymbol{\\Omega}_{SS}^{-1}\\mathbf{f}_S = \\mathbf{b}_S^{\\top}\\mathbf{f}_S + \\mathbf{b}_{\\bar{S}}^{\\top}\\underbrace{\\boldsymbol{\\Omega}_{\\bar{S}S}\\boldsymbol{\\Omega}_{SS}^{-1}\\mathbf{f}_S}_{\\mathbb{E}[\\mathbf{f}_{\\bar{S}} \\mid \\mathbf{f}_S]}",
          caption: "Equivalently: the best cross-sectional explanation of returns by $\\mathbf{f}_S$, the best explanation of factor PnL by $\\mathbf{f}_S$, or a rotation that makes $S$ uncorrelated with the rest",
        },
        {
          kind: "example",
          title: "PnL transmitted by correlation",
          problem: "Two factors with variances $0.04$ and covariance $0.02$; exposures $[1, 1]$; factor 1 returned $10\\%$.",
          steps: [
            "Adjusted beta to factor 1: $1 + 1 \\times \\frac{0.02}{0.04} = 1.5$.",
            "Maximal attribution to factor 1: $1.5 \\times 0.1 = 0.15$, versus $0.10$ under standard attribution.",
            "After rotation the other factor's variance drops to $0.04 - \\frac{0.02^{2}}{0.04} = 0.03$.",
          ],
          answer: "In Paleologo's sector-strategy example, momentum's PnL flips from $+\\$2.6$M to $-\\$5$M under maximal attribution. Nested maximal attribution repeats this over a sequence of factor groups (market, value, sentiment, industries) for an ordered, interpretable story.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 13, §13.1–13.3 (Insight 13.1, Procedures 13.1–13.2)" },
    { source: "Grinold and Kahn, Active Portfolio Management", locator: "Ch. 17, Performance Analysis" },
  ],
};
