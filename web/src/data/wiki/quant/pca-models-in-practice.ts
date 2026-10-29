import type { WikiArticle } from "../types";

export const pcaModelsInPracticeWiki: WikiArticle = {
  conceptId: "pca-models-in-practice",

  summary:
    "Real returns are not a textbook spiked model. On ten years of Russell 3000 data, the raw eigenvalue spectrum decays " +
    "gradually, individual eigenfactors churn from period to period, and loadings resist interpretation. Paleologo's " +
    "fixes are practical: normalize returns before PCA, measure and control eigenvector turnover with a free rotation, " +
    "interpret components by clustering and by regression on characteristics, and estimate the model in two stages with " +
    "separate time scales for volatilities and correlations.",

  sections: [
    {
      heading: "Normalize first",
      blocks: [
        {
          kind: "prose",
          text:
            "Compare PCA on raw returns, on returns divided by total volatility (a correlation matrix) and on returns " +
            "divided by idiosyncratic volatility. The last makes the noise roughly equal across stocks — the spiked model's " +
            "assumption — and concentrates variance: in one period, capturing $50\\%$ of variance took $30$ factors on raw " +
            "returns, $20$ on total-vol-normalized and only $10$ on idio-vol-normalized returns. Concentration isn't " +
            "itself a performance metric, but the normalized eigenfactors are also more stable.",
        },
      ],
    },
    {
      heading: "Turnover, signs and rotations",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{turnover}_2(\\mathbf{v}(t)) = \\|\\mathbf{v}(t) - \\mathbf{v}(t - 1)\\|^{2} = 2\\left(1 - |\\cos(\\mathbf{v}(t), \\mathbf{v}(t - 1))|\\right)",
          caption: "For unit-norm eigenportfolios, squared-GMV turnover is a function of cosine similarity — a good proxy for trading cost",
        },
        {
          kind: "list",
          items: [
            "**Signs**: $\\mathbf{u}$ and $-\\mathbf{u}$ are both eigenvectors; flip the new one when its cosine with the old is negative.",
            "**Subspaces are stable even when eigenvectors aren't**: eigenfactors with similar variances rotate among themselves, yet the distance between consecutive top-$8$ subspaces is tiny.",
            "**Why it rarely matters**: if the factor covariance is (nearly) proportional to the identity on a subspace, any basis of it gives the same covariance — volatility forecasts and optimization with total-factor-risk constraints are unaffected. Single-factor attribution is the casualty.",
          ],
        },
        {
          kind: "formula",
          latex: "\\min_{\\mathbf{X}^{\\top}\\mathbf{X} = \\mathbf{I}} \\|\\mathbf{B}_t - \\mathbf{B}_{t+1}\\mathbf{X}\\|_F \\quad\\Longleftrightarrow\\quad \\max_{\\mathbf{X}} \\text{tr}(\\mathbf{A}\\mathbf{X}), \\ \\mathbf{A} = \\mathbf{B}_t^{\\top}\\mathbf{B}_{t+1} = \\mathbf{U}\\mathbf{S}\\mathbf{V}^{\\top} \\quad\\Longrightarrow\\quad \\mathbf{X} = \\mathbf{V}\\mathbf{U}^{\\top}",
          caption: "Orthogonal Procrustes (Wahba's problem): rotate new loadings toward old ones at zero cost, since the covariance is unchanged",
        },
        {
          kind: "example",
          title: "Turnover from a cosine",
          problem: "An eigenportfolio moves from $[0.6, 0.8]$ to $[0.8, 0.6]$.",
          steps: [
            "Cosine $= 0.48 + 0.48 = 0.96$.",
            "Quadratic turnover $= 2(1 - 0.96) = 0.08 = 0.2^{2} + 0.2^{2}$.",
            "Gross-value turnover $= \\frac{0.2 + 0.2}{1.4} \\approx 0.29$.",
          ],
          answer: "Small rotations are cheap; near-degenerate factors can rotate by large angles from one day to the next unless aligned.",
        },
      ],
    },
    {
      heading: "Interpreting components",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Clustering view", description: "K-means with orthonormal cluster-indicator vectors, relaxed to continuous values, is the uncentered PCA problem (Ding and He): loadings are soft cluster memberships. Clustering the loadings of the first few components reveals groups of similar stocks." },
            { term: "Regression view", description: "Regress a component's loadings on stock characteristics. In Paleologo's July 2017 example, PC1 is overwhelmingly the market intercept; PC2 loads on dividend yield and size and negatively on short-term momentum — a defensive “risk-off” factor against a “risk-on” first." },
          ],
        },
      ],
    },
    {
      heading: "Two-stage estimation in production",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Weight observations in time with a **fast** half-life: $\\tilde{\\mathbf{R}} = \\mathbf{R}\\mathbf{W}_f$.",
            "First-stage SVD; remove the top $p$ components (say $5$) and take proxy idiosyncratic variances $\\sigma_i^{2}$ from the residuals ($p = 0$ gives total volatilities, i.e. a correlation-matrix PCA).",
            "Reweight: $\\hat{\\mathbf{R}} = \\mathbf{W}\\mathbf{R}\\mathbf{W}_s$ with $\\mathbf{W} = \\text{diag}(\\sigma_i^{-1})$ and a **slow** half-life $\\mathbf{W}_s$ — volatilities change in days (up to fourfold in a crisis), correlations slowly.",
            "Second-stage SVD and a PPCA-style factor model on the whitened returns, with eigenvalue shrinkage.",
            "Map back: $\\mathbf{B} = \\mathbf{W}^{-1}\\hat{\\mathbf{U}}_m$, idiosyncratic variances $\\bar{\\sigma}^{2}\\mathbf{W}^{-2}$; factor returns by cross-sectional regression each day.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Universe and missing data",
          text:
            "Assets enter and leave the estimation universe; recent additions may have unreliable histories. Stocks with " +
            "good histories but outside the universe get loadings by time-series regression on the factor returns (exact " +
            "for the SVD). IPOs and long-untraded stocks get loadings imputed from characteristics such as industry and " +
            "size.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 7, §7.3–7.5 (Real-Life Behavior of PCA, Interpreting Principal Components, Estimation in Practice)" },
    { source: "Ding and He, “K-means clustering via principal component analysis”, ICML (2004)", locator: "Clustering view of PCA" },
    { source: "Boivin and Ng, “Are more data always better for factor analysis?”, Journal of Econometrics (2006)", locator: "Reweighted PCA" },
  ],
};
