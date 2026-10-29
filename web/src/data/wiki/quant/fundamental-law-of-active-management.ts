import type { WikiArticle } from "../types";

export const fundamentalLawWiki: WikiArticle = {
  conceptId: "fundamental-law-of-active-management",

  summary:
    "What makes a strategy good? Grinold's fundamental law answers in one line: the information ratio is the information " +
    "coefficient — a correlation measuring forecasting skill — times the square root of breadth, the number of " +
    "independent bets. Small but consistent skill applied to thousands of stocks many times a year beats occasional " +
    "brilliance. The law follows directly from mean-variance optimization with an accurate risk model, and it links an " +
    "ex-ante quantity (IR) to an interpretable ex-post one (IC). Correlation and Mean-Variance Optimization are the " +
    "prerequisites.",

  sections: [
    {
      heading: "The law",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{IR} \\approx \\text{IC} \\times \\sqrt{N}, \\qquad \\text{IR}_{\\text{annual}} \\approx \\text{IC} \\times \\sqrt{N T}",
          caption: "$N$ independent forecasts per period, $T$ periods per year",
        },
        {
          kind: "definitions",
          items: [
            { term: "Information coefficient (IC)", description: "The cross-sectional correlation between forecasts and realized returns, both standardized (whitened by the covariance, or in practice divided by idiosyncratic volatility)." },
            { term: "Breadth $N$", description: "The number of independent bets per period. Forecasts that all express one sector view have far less breadth than their count." },
            { term: "Idea velocity $T$", description: "Independent forecasting periods per year; more frequent independent forecasts raise annual IR by $\\sqrt{T}$." },
          ],
        },
        {
          kind: "example",
          title: "A small edge, a big IR",
          problem: "A daily signal has IC $0.01$ on $1{,}000$ stocks. What annual IR does the law predict?",
          steps: [
            "$\\text{IR} \\approx 0.01 \\times \\sqrt{1{,}000 \\times 252} = 0.01 \\times 502$.",
          ],
          answer: "About $5$ — before costs. A correlation of one percent is worthless on one stock and enormous across a broad universe traded daily, which is why costs and capacity, not the law, usually bind.",
        },
      ],
    },
    {
      heading: "Where it comes from",
      blocks: [
        {
          kind: "prose",
          text:
            "Hold $\\mathbf{w} \\propto \\boldsymbol{\\Omega}^{-1}\\hat{\\boldsymbol{\\alpha}}$ with an accurate $\\boldsymbol{\\Omega}$. " +
            "Its realized expected return over its volatility is $\\frac{\\mathbb{E}[\\mathbf{r}^{\\top}\\boldsymbol{\\Omega}^{-1}\\hat{\\boldsymbol{\\alpha}}]}" +
            "{\\sqrt{\\hat{\\boldsymbol{\\alpha}}^{\\top}\\boldsymbol{\\Omega}^{-1}\\hat{\\boldsymbol{\\alpha}}}}$. Whiten: " +
            "$\\tilde{\\mathbf{r}} = \\boldsymbol{\\Omega}^{-1/2}\\mathbf{r}$, $\\tilde{\\boldsymbol{\\alpha}} = \\boldsymbol{\\Omega}^{-1/2}\\hat{\\boldsymbol{\\alpha}}$. " +
            "The ratio becomes the uncentered correlation $\\frac{\\tilde{\\mathbf{r}}^{\\top}\\tilde{\\boldsymbol{\\alpha}}}{\\|\\tilde{\\mathbf{r}}\\|\\|\\tilde{\\boldsymbol{\\alpha}}\\|}$ " +
            "times $\\|\\tilde{\\mathbf{r}}\\|$, and $\\mathbb{E}\\|\\tilde{\\mathbf{r}}\\|^{2} = n$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "IC as a predictive regression",
          text:
            "Regress standardized residual returns on standardized alphas across stocks each period. Being a correlation, " +
            "IC gives an expected $R^{2} \\approx \\text{IC}^{2}$, so annual $\\text{IR} \\approx \\sqrt{R^{2} N T}$. Good signals " +
            "have tiny $R^{2}$ — $0.0001$ on $2{,}000$ stocks daily is an IR of about $7$.",
        },
      ],
    },
    {
      heading: "Using it, and its limits",
      blocks: [
        {
          kind: "list",
          items: [
            "**Skill versus breadth**: doubling IC doubles IR; doubling breadth multiplies it by only $\\sqrt{2}$ — but breadth is often easier to find.",
            "**Combining signals**: uncorrelated signals combine to IC $\\approx \\sqrt{\\sum_k \\text{IC}_k^{2}}$ — the arithmetic behind multi-signal quant funds.",
            "**Breadth isn't free**: extending a forecast to more stocks almost always lowers IC. From $400$ stocks at IC $0.04$ to $1{,}600$ at IC $0.025$ raises IR only by $25\\%$.",
            "**Constraints**: long-only and other limits reduce the correlation between actual and optimal weights (the transfer coefficient), scaling IR down.",
            "**Assumptions**: an accurate risk model, independent bets, unconstrained optimization, no costs. The law overstates achievable IR; treat it as a planning guide.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 8, §8.5 Drivers of Information Ratio (Insight 8.3)" },
    { source: "Grinold, “The Fundamental Law of Active Management”, Journal of Portfolio Management (1989)", locator: "The original paper" },
    { source: "Clarke, de Silva and Thorley, “Portfolio Constraints and the Fundamental Law”, Financial Analysts Journal (2002)", locator: "The transfer coefficient" },
  ],
};
