import type { WikiArticle } from "../types";

export const statisticalFactorModelsWiki: WikiArticle = {
  conceptId: "statistical-factor-models",

  summary:
    "A statistical factor model assumes nothing but returns: loadings and factor returns are both estimated, by " +
    "principal component analysis. It is useful when characteristics are missing or uninformative (other asset classes, " +
    "intraday horizons), as a check on fundamental models, and sometimes simply because it performs better. Three views " +
    "of the same computation tie it together — the best low-rank fit to the return matrix (Eckart–Young), the " +
    "maximum-variance portfolios (PCA), and the maximum-likelihood Gaussian factor model (probabilistic PCA). The " +
    "prerequisites are the SVD, PCA and Eckart–Young lessons in Linear Algebra.",

  sections: [
    {
      heading: "Best low-rank fit",
      blocks: [
        {
          kind: "formula",
          latex: "\\min_{\\mathbf{B}, \\mathbf{F}} \\|\\mathbf{R} - \\mathbf{B}\\mathbf{F}\\|_F \\quad\\Longrightarrow\\quad \\hat{\\mathbf{R}} = \\mathbf{U}_m\\mathbf{S}_m\\mathbf{V}_m^{\\top}, \\quad \\mathbf{B} = \\mathbf{U}_m, \\ \\mathbf{F} = \\mathbf{S}_m\\mathbf{V}_m^{\\top}",
          caption: "With $\\mathbf{R} \\in \\mathbb{R}^{n \\times T}$ and SVD $\\mathbf{R} = \\mathbf{U}\\mathbf{S}\\mathbf{V}^{\\top}$, keep the $m$ largest singular values (any unitarily invariant norm)",
        },
        {
          kind: "prose",
          text:
            "Any $\\tilde{\\mathbf{B}} = \\mathbf{B}\\mathbf{C}$, $\\tilde{\\mathbf{F}} = \\mathbf{C}^{-1}\\mathbf{F}$ fits equally " +
            "well; the SVD choice has orthonormal loadings and in-sample uncorrelated factors. It is also self-consistent: " +
            "regressing returns cross-sectionally on $\\mathbf{U}_m$ gives back $\\mathbf{S}_m\\mathbf{V}_m^{\\top}$, and " +
            "regressing each stock's returns over time on those factor returns gives back $\\mathbf{U}_m$ — the only " +
            "factorization with both properties. That is what lets you impute loadings for stocks outside the estimation " +
            "universe.",
        },
        {
          kind: "example",
          title: "How much does rank $2$ capture?",
          problem: "A return matrix has singular values $20$, $10$, $3$, $2$.",
          steps: [
            "Total sum of squares: $400 + 100 + 9 + 4 = 513$.",
            "Rank-$2$ error: $9 + 4 = 13$; captured fraction $\\frac{500}{513} \\approx 97.5\\%$.",
          ],
          answer: "Two factors explain almost everything here — real equity returns are far less concentrated.",
        },
      ],
    },
    {
      heading: "Maximum-variance portfolios",
      blocks: [
        {
          kind: "prose",
          text:
            "PCA asks for the unit-norm portfolio with the largest variance, $\\max_{\\|\\mathbf{w}\\| \\le 1} " +
            "\\mathbf{w}^{\\top}\\hat{\\boldsymbol{\\Omega}}\\mathbf{w}$. The Lagrangian condition is the eigenvalue equation, " +
            "so the answer is the top eigenvector and the maximum is the top eigenvalue; the next component maximizes " +
            "variance orthogonally to the first, and so on. With $\\hat{\\boldsymbol{\\Omega}} = \\frac{1}{T}\\mathbf{R}\\mathbf{R}^{\\top}$ " +
            "(uncentered — daily means are negligible), the components are the columns of $\\mathbf{U}$ and their variances " +
            "are $\\frac{s_i^{2}}{T}$. With equal eigenvalues, eigenvectors are unique only up to rotation within their plane.",
        },
      ],
    },
    {
      heading: "Probabilistic PCA",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{r} = \\mathbf{B}\\mathbf{f} + \\boldsymbol{\\epsilon}, \\ \\mathbf{f} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I}_m), \\ \\boldsymbol{\\epsilon} \\sim \\mathcal{N}(\\mathbf{0}, \\sigma^{2}\\mathbf{I}_n) \\quad\\Longrightarrow\\quad \\hat{\\mathbf{B}} = \\mathbf{U}_m\\left(\\boldsymbol{\\Lambda}_m - \\hat{\\sigma}^{2}\\mathbf{I}\\right)^{1/2}, \\ \\hat{\\sigma}^{2} = \\bar{\\lambda}_{m+1:n}",
          caption: "Tipping and Bishop's maximum-likelihood solution: factor variances are the sample eigenvalues minus the average discarded eigenvalue",
        },
        {
          kind: "example",
          title: "Shrinking eigenvalues by the noise level",
          problem: "Sample eigenvalues $10$, $4$, $1.2$, $0.9$, $0.9$ and $m = 2$.",
          steps: [
            "$\\hat{\\sigma}^{2} = \\frac{1.2 + 0.9 + 0.9}{3} = 1$.",
            "Factor variances: $10 - 1 = 9$ and $4 - 1 = 3$.",
          ],
          answer: "PCA is the limit $\\hat{\\sigma}^{2} \\to 0$. Simulations show sample eigenvalues are biased up and PPCA's are biased down by a non-constant amount — the cue for the next lesson's shrinkage theory.",
        },
      ],
    },
    {
      heading: "Pervasive factors",
      blocks: [
        {
          kind: "prose",
          text:
            "If stocks' loading vectors are drawn from a common distribution, $\\mathbf{B}^{\\top}\\mathbf{B} \\approx " +
            "n\\,\\mathbb{E}[\\mathbf{b}\\mathbf{b}^{\\top}]$: factor eigenvalues grow linearly in $n$ while idiosyncratic ones " +
            "stay bounded, so a gap opens (Chamberlain–Rothschild). The factor-mimicking portfolio " +
            "$\\mathbf{w}_i = \\mathbf{B}(\\mathbf{B}^{\\top}\\mathbf{B})^{-1}\\mathbf{e}_i$ then has unit factor variance and " +
            "idiosyncratic variance at most about $\\frac{1}{Cn}$ — it tracks its factor almost perfectly in a large universe.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Interpretation is possible",
          text:
            "The first statistical factor is nearly always the market. Bond yields' first three are level, slope and " +
            "curvature (Litterman–Scheinkman). For the rest, see Statistical Models in Practice.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 7, §7.1 Statistical Models: The Basics" },
    { source: "Tipping and Bishop, “Probabilistic Principal Component Analysis”, JRSS B (1999)", locator: "PPCA" },
    { source: "Chamberlain and Rothschild, “Arbitrage, Factor Structure, and Mean-Variance Analysis…”, Econometrica (1983)", locator: "Pervasive factors" },
  ],
};
