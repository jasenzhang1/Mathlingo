import type { WikiArticle } from "../types";

export const factorMimickingPortfoliosWiki: WikiArticle = {
  conceptId: "factor-mimicking-portfolios",

  summary:
    "Many useful hedges are not equity factors at all: crude oil and gas futures for an energy book, Treasury futures " +
    "for rate-sensitive stocks. Their betas are estimated by time-series regression, with error — and hedging with a " +
    "noisy beta can leave a portfolio riskier than not hedging. The fix is a shrinkage factor driven by the betas' " +
    "noise-to-signal ratio and the portfolio's concentration. The same tools build tradable portfolios that mimic " +
    "non-tradable time series such as economic indicators or “themes”. Simple Linear Regression is the prerequisite.",

  sections: [
    {
      heading: "When hedging hurts",
      blocks: [
        {
          kind: "prose",
          text:
            "Stocks' betas to the hedge instrument are estimated as $\\hat{\\boldsymbol{\\beta}} = \\boldsymbol{\\beta} + " +
            "\\boldsymbol{\\eta}$, with error covariance $\\boldsymbol{\\Sigma}$ (from standard errors). Hedging the full " +
            "estimated exposure, $x_h = -\\hat{\\boldsymbol{\\beta}}^{\\top}\\mathbf{w}$, gives expected variance",
        },
        {
          kind: "formula",
          latex: "\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w} - \\sigma_h^{2}(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2} + \\sigma_h^{2}\\,\\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}",
          caption: "Worse than no hedge whenever $\\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w} > (\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2}$: the error in the hedge size outweighs the exposure removed",
        },
      ],
    },
    {
      heading: "Shrinking the hedge",
      blocks: [
        {
          kind: "formula",
          latex: "x_h = -y\\,\\hat{\\boldsymbol{\\beta}}^{\\top}\\mathbf{w}, \\qquad y^{*} = \\frac{(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2}}{(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2} + \\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}} \\ \\approx \\ \\left(1 - \\frac{\\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}}{(\\hat{\\boldsymbol{\\beta}}^{\\top}\\mathbf{w})^{2}}\\right)^{+}",
          caption: "Minimizing expected variance over $y$; the plug-in replaces the unknown $(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2}$ by its unbiased estimate and floors at zero",
        },
        {
          kind: "list",
          items: [
            "Scale-free: a portfolio ten times larger gets the same $y$ and a ten-times hedge.",
            "No estimation error: $y = 1$. Large errors: small $y$.",
            "True betas zero: the plug-in gives $y \\approx 0$ — don't hedge noise.",
            "Correlated errors (common in stress) raise $\\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}$ and shrink the hedge; test sensitivity with a constant error correlation.",
          ],
        },
        {
          kind: "formula",
          latex: "y \\approx 1 - \\frac{\\sigma_\\beta^{2}}{\\beta^{2}}H(\\mathbf{w}), \\qquad H(\\mathbf{w}) = \\frac{\\|\\mathbf{w}\\|_2^{2}}{\\|\\mathbf{w}\\|_1^{2}}",
          caption: "Identical betas, long-only book, independent errors: shrinkage depends on the betas' noise-to-signal ratio and the book's Herfindahl concentration ($\\frac{1}{n}$ for $n$ equal positions)",
        },
        {
          kind: "example",
          title: "An energy book hedged with oil futures",
          problem: "$\\$1$M in each of three stocks with oil betas $0.5$, $0.3$, $0.1$, each with standard error $0.2$.",
          steps: [
            "Estimated exposure $\\hat{\\boldsymbol{\\beta}}^{\\top}\\mathbf{w} = 0.9$; error variance $3 \\times 0.04 = 0.12$.",
            "$y = 1 - \\frac{0.12}{0.81} \\approx 0.85$.",
            "Hedge: short about $\\$0.77$M of oil futures instead of $\\$0.9$M.",
          ],
          answer: "A diversified book of weak betas only becomes worth hedging once it is large: with true betas $0.1$ and errors $0.5$, the full hedge helps only beyond $25$ equal positions, since exposure grows like $n$ and error like $\\sqrt{n}$.",
        },
      ],
    },
    {
      heading: "Mimicking a non-tradable series",
      blocks: [
        {
          kind: "prose",
          text:
            "To track a series $r_h$ (an economic indicator, a “theme”) with tradable assets, minimize the tracking error " +
            "$\\mathbb{E}[(\\mathbf{r}^{\\top}\\mathbf{w} - r_h)^{2}]$ given estimated betas. With no beta error and a " +
            "zero-mean series, the solution is $\\mathbf{w} = \\sigma_h^{2}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\beta}$; " +
            "estimation error enters as a regularizer, $\\mathbf{w} = \\sigma_h^{2}(\\boldsymbol{\\Omega} + \\sigma_h^{2}\\boldsymbol{\\Sigma})^{-1}\\boldsymbol{\\beta}$, " +
            "shrinking extreme positions — more so when the series has a large expected return.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Uses — and a test for themes",
          text:
            "Mimicking portfolios hedge exposure to the series, let a macro investor trade a view systematically, and test " +
            "whether a pitched theme is really tradable. Orthogonalize against the existing equity factors first, so the " +
            "hedge doesn't double-count them. Themes that no portfolio can track are, in Paleologo's words, “full of sound " +
            "and fury, usually signifying sell-side research fees.”",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 11, §11.3 Hedging Tradable Factors with Time-Series Betas and §11.4 Factor-Mimicking Portfolios of Time Series" },
    { source: "Lamont, “Economic tracking portfolios”, Journal of Econometrics (2001)", locator: "Mimicking portfolios for economic series" },
  ],
};
