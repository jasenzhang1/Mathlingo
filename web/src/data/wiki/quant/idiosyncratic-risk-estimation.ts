import type { WikiArticle } from "../types";

export const idiosyncraticRiskEstimationWiki: WikiArticle = {
  conceptId: "idiosyncratic-risk-estimation",

  summary:
    "What the factors don't explain, the idiosyncratic covariance must. It is estimated from the regression residuals, " +
    "should be diagonal or sparse, and is where stock-specific shocks — earnings, mergers, bad prints — live. This lesson " +
    "covers exponentially weighted residual variances, shrinkage toward peers, short-term updates around earnings, " +
    "handling of linked securities and residual clusters, and the delicate business of outliers: which to fix, which to " +
    "keep and how to winsorize without lying to yourself.",

  sections: [
    {
      heading: "Variances from residuals",
      blocks: [
        {
          kind: "prose",
          text:
            "Collect residuals $\\hat{\\epsilon}_{i,t} = r_{i,t} - [\\mathbf{B}_t\\hat{\\mathbf{f}}_t]_i$ and average their " +
            "squares with exponential weights (a half-life of around six months is a responsive daily choice). The sample " +
            "residual covariance matrix itself is useless as $\\boldsymbol{\\Omega}_\\epsilon$ — with $T < n$ it is neither " +
            "sparse nor positive definite — but setting all off-diagonal terms to zero is a radical shrinkage. **Look at it " +
            "first**: striking patterns reveal missing factors or linked securities.",
        },
        {
          kind: "prose",
          text:
            "**Shrink toward peers.** A single stock's variance estimate is noisy; pulling it toward the average of similar " +
            "stocks (same industry and size) reduces error. With sampling variance $s^{2}$ for the stock's estimate and " +
            "dispersion $\\tau^{2}$ of true variances among peers, the stock gets weight $\\frac{\\tau^{2}}{\\tau^{2} + s^{2}}$ " +
            "— empirical Bayes.",
        },
        {
          kind: "example",
          title: "A noisy estimate pulled to its peers",
          problem: "A stock's sample idiosyncratic variance is $0.10$ (sampling variance $0.0009$); peers average $0.05$, with true variances scattered with variance $0.0003$.",
          steps: [
            "Weight on own estimate: $\\frac{0.0003}{0.0003 + 0.0009} = 0.25$.",
            "Shrunk variance: $0.25 \\times 0.10 + 0.75 \\times 0.05 = 0.0625$.",
          ],
          answer: "Volatility $25\\%$ instead of $31.6\\%$: the extreme estimate was mostly noise.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Earnings: targeted short-term updates",
          text:
            "Stock-specific shocks cluster around earnings. A tent-shaped weight $a_{i,t} \\in [0, 1]$, peaking on the " +
            "earnings date and zero outside a window, switches on a fast (short-half-life) volatility multiplier only " +
            "there: $\\hat{\\sigma}_{i,t}^{2} \\leftarrow \\left(1 - a_{i,t} + a_{i,t}e^{\\hat{x}_t}\\right)\\hat{\\sigma}_{i,t}^{2}$. " +
            "Elsewhere, constant updating would mostly chase noise.",
        },
      ],
    },
    {
      heading: "Linked securities and residual clusters",
      blocks: [
        {
          kind: "list",
          items: [
            "**Same company, several securities**: share classes (BRK.A and BRK.B), mainland and Hong Kong listings (A and H shares). A fundamental strategy should keep one representative (usually the most liquid); a strategy trading their spread must model both and their correlation explicitly.",
            "**Clusters**: threshold the absolute residual correlations (e.g. $0.55$) and inspect the connected groups. A good threshold gives clusters that are stable when it is perturbed, interpretable (same industry, similar styles), and keeps the matrix positive definite and well conditioned.",
          ],
        },
        {
          kind: "example",
          title: "What a diagonal model gets wrong",
          problem: "Two share classes have $20\\%$ idiosyncratic volatility and residual correlation $0.98$. You hold $\\$1$ long one, $\\$1$ short the other.",
          steps: [
            "True variance: $2\\sigma^{2}(1 - \\rho) = 2(0.04)(0.02) = 0.0016$, volatility $4\\%$.",
            "Diagonal model: $2\\sigma^{2} = 0.08$, volatility $28\\%$.",
          ],
          answer: "Risk overstated sevenfold. Five clustered stocks held long with residual correlation $0.5$ show the opposite error: the true variance is three times the diagonal model's.",
        },
      ],
    },
    {
      heading: "Outliers and winsorization",
      blocks: [
        {
          kind: "table",
          headers: ["Source", "Remedy"],
          rows: [
            ["Bad vendor data (unadjusted splits, asynchronous or wrong prices)", "Evaluate vendors; inspect the whole price trace, not just the last print"],
            ["Stray prints in liquid stocks", "Inspect traces; sudden one-day reversals are suspects"],
            ["Illiquid micro-caps; stocks near delisting or in bankruptcy (often OTC)", "Exclude them from the estimation and investment universe"],
            ["Genuine news: earnings, guidance, mergers, accidents", "Keep them — they are real risk"],
          ],
        },
        {
          kind: "prose",
          text:
            "Winsorizing a genuine return distorts more than one number: a factor return is a portfolio's return, and the " +
            "real portfolio earned the unwinsorized return. For the rest, a robust z-score works well enough: divide " +
            "$|\\log(1 + r_{i,t})|$ by the median of the stock's recent absolute log returns, and cap values beyond a " +
            "threshold set by trial and error.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Two rules",
          text:
            "Report every winsorized data point, in backtests and production, and examine each one. And keep the investment " +
            "universe liquid and tradable, so that few outliers remain to be capped. Paleologo's cautionary tale: Enron's " +
            "closing print once jumped from about $\\$86$ to $\\$90$ and reverted the next day — “if traders want to short " +
            "themselves, it's likely an outlier of some kind.”",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 6, §6.4 Estimating the Idiosyncratic Covariance Matrix and §6.5 Winsorization of Returns" },
    { source: "Bickel and Levina, “Covariance regularization by thresholding”, Annals of Statistics (2008)", locator: "Thresholding sparse covariances" },
  ],
};
