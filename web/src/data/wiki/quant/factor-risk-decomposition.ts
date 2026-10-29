import type { WikiArticle } from "../types";

export const factorRiskDecompositionWiki: WikiArticle = {
  conceptId: "factor-risk-decomposition",

  summary:
    "A factor model turns a portfolio into a short list of exposures. Profit splits into factor PnL and idiosyncratic " +
    "PnL; variance splits into factor and idiosyncratic variance, and further into groups such as styles and industries; " +
    "marginal contributions tell you which trades add or remove risk. The same model feeds portfolio construction (through " +
    "its invertible covariance) and alpha research (by separating factor premia from stock-specific alpha). This lesson " +
    "also maps the three families of models — characteristic, statistical and macroeconomic — covered later.",

  sections: [
    {
      heading: "Profit and loss",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{w}_t^{\\top}\\mathbf{r}_t = \\mathbf{b}_t^{\\top}\\mathbf{f}_t + \\mathbf{w}_t^{\\top}\\left(\\boldsymbol{\\alpha} + \\boldsymbol{\\epsilon}_t\\right), \\qquad \\mathbf{b}_t = \\mathbf{B}_t^{\\top}\\mathbf{w}_t",
          caption: "Factor PnL plus idiosyncratic PnL; $[\\mathbf{b}_t]_j$ is the holdings-weighted sum of loadings on factor $j$",
        },
        {
          kind: "prose",
          text:
            "Summed over time, total PnL $= \\sum_j (\\text{factor } j \\text{ PnL}) + \\sum_i (\\text{stock } i \\text{ residual PnL})$, " +
            "and factors or stocks can be grouped — styles, industries, a sector of names. This is the seed of ex-post " +
            "performance attribution, developed at the end of the course.",
        },
      ],
    },
    {
      heading: "Variance and its decomposition",
      blocks: [
        {
          kind: "formula",
          latex: "\\sigma^{2} = \\mathbf{w}^{\\top}\\boldsymbol{\\Omega}_r\\mathbf{w} = \\underbrace{\\mathbf{b}^{\\top}\\boldsymbol{\\Omega}_f\\mathbf{b}}_{\\text{factor}} + \\underbrace{\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}_\\epsilon\\mathbf{w}}_{\\text{idiosyncratic}}",
          caption: "Ex-ante variance; the percentage of idiosyncratic variance is a standard statistic for a strategy",
        },
        {
          kind: "example",
          title: "A two-stock book",
          problem: "A book holds $\\$2$M and $-\\$1$M in two stocks. Its factor exposures are $\\mathbf{b} = [2, 1]$ (in millions), $\\boldsymbol{\\Omega}_f = \\text{diag}(0.04, 0.01)$, and the stocks' idiosyncratic variances are $0.09$ and $0.04$.",
          steps: [
            "Factor variance: $4(0.04) + 1(0.01) = 0.17$.",
            "Idiosyncratic variance: $4(0.09) + 1(0.04) = 0.40$.",
            "Total $0.57$, volatility $\\$0.755$M; idiosyncratic share $\\frac{0.40}{0.57} = 70.2\\%$.",
          ],
          answer: "A stock-picking book with most of its risk where the manager intends it.",
        },
        {
          kind: "prose",
          text:
            "**Group shares.** Partition the PnL into groups $X_1, \\dots, X_k$ with total $P$. Giving each group its own " +
            "variance plus half of every covariance it shares, its share is $p_i = \\frac{\\text{Cov}(X_i, P)}{\\text{Var}(P)}$ " +
            "— the beta of the group to the portfolio — and the shares sum to one. Groups can be single factors, factor " +
            "families, or single stocks.",
        },
        {
          kind: "prose",
          text:
            "**Marginal contribution to risk.** $\\frac{\\partial\\sigma}{\\partial w_i} = \\frac{(\\boldsymbol{\\Omega}\\mathbf{w})_i}{\\sigma}$ " +
            "is the change in volatility per dollar added to position $i$. By Euler's theorem the contributions " +
            "$w_i\\frac{\\partial\\sigma}{\\partial w_i}$ sum to $\\sigma$. A negative contribution marks a hedge.",
        },
        {
          kind: "prose",
          text:
            "**Sharpe sensitivity.** Scaling group $i$ up adds $\\mu_i$ to expected PnL and about $p_i\\sigma$ to volatility, " +
            "so the Sharpe ratio rises exactly when $\\mu_i > p_i\\mu$: the group's share of expected profit exceeds its " +
            "share of risk.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Rotations move single-factor numbers",
          text:
            "Rotating the model leaves total factor and idiosyncratic variance unchanged, but the variance attributed to " +
            "individual factors changes. That is a feature — choose the representation that is meaningful — but never " +
            "compare single-factor attributions across vendors or rotations.",
        },
      ],
    },
    {
      heading: "Uses and model families",
      blocks: [
        {
          kind: "list",
          items: [
            "**Risk management**: ex-ante volatility, factor versus idiosyncratic risk, risk by group.",
            "**Portfolio management**: a well-conditioned, cheaply inverted covariance (the precision matrix drives mean-variance optimization), and a split of expected returns into factor premia $\\mathbf{B}\\boldsymbol{\\mu}_f$ and orthogonal alpha.",
            "**Alpha research**: separate priced from unpriced factors and test whether a signal is more than repackaged factor exposure. (Strategies that sell factor exposure alone are marketed as “smart beta”.)",
            "**Attribution**: what made money, and was it skill.",
          ],
        },
        {
          kind: "table",
          headers: ["Family", "Given", "Estimated", "Lesson"],
          rows: [
            ["Characteristic (fundamental)", "Returns $\\mathbf{r}_t$ and characteristics as loadings $\\mathbf{B}_t$", "Factor and idiosyncratic returns", "Fundamental Factor Models"],
            ["Statistical", "Returns only", "$\\mathbf{B}$, $\\mathbf{f}_t$ and $\\boldsymbol{\\epsilon}_t$", "Statistical Factor Models & PCA"],
            ["Macroeconomic", "Returns and macro series $\\mathbf{f}_t$", "Loadings and residuals", "—"],
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 3, §3.5 Applications and §3.6 Factor Model Types; FAQ 3.3" },
    { source: "Grinold and Kahn, Active Portfolio Management", locator: "Ch. 3, Risk (marginal contributions and decompositions)" },
  ],
};
