import type { WikiArticle } from "../types";

export const factorCovarianceEstimationWiki: WikiArticle = {
  conceptId: "factor-covariance-estimation",

  summary:
    "The cross-sectional regressions produce a time series of estimated factor returns; the factor covariance " +
    "$\\boldsymbol{\\Omega}_f$ is estimated from it. With tens of factors and a few hundred days the sample covariance is " +
    "a reasonable start, but four problems need fixing: estimation noise inflates it, $m$ is not tiny relative to $T$, " +
    "volatility jumps faster than long-memory averages can follow, and factor returns are mildly autocorrelated. The " +
    "remedies — debiasing, shrinkage, separate volatility and correlation half-lives, short-term updating and " +
    "Newey–West — draw on the Covariance Shrinkage, EWMA & State-Space Volatility and Newey–West lessons.",

  sections: [
    {
      heading: "Debiasing and shrinkage",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{Cov}(\\hat{\\mathbf{f}}_t) = \\boldsymbol{\\Omega}_f + (\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1} \\quad\\Longrightarrow\\quad \\hat{\\boldsymbol{\\Omega}}_f = \\widehat{\\text{Var}}(\\hat{\\mathbf{f}}_t) - (\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}",
          caption: "Each estimated factor return is its mimicking portfolio's return: the true factor return plus that portfolio's idiosyncratic noise",
        },
        {
          kind: "prose",
          text:
            "Factor volatilities estimated from $T$ observations have relative standard error about $\\sqrt{\\frac{2}{T}}$ " +
            "(for the variance), and with $m$ up to $100$ and $T$ between $126$ and $500$ days we are not in the " +
            "$m \\ll T$ regime. Ledoit–Wolf shrinkage of the debiased matrix helps:",
        },
        {
          kind: "formula",
          latex: "\\hat{\\boldsymbol{\\Omega}}_f^{\\text{shrink}} = (1 - \\rho)\\left(\\widehat{\\text{Var}}(\\hat{\\mathbf{f}}) - (\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}\\right) + \\rho\\,\\frac{\\text{tr}(\\cdot)}{m}\\mathbf{I}",
          caption: "Debias, then shrink toward a scaled identity (or shrink the correlation matrix toward the identity, keeping volatilities)",
        },
        {
          kind: "example",
          title: "How much does debiasing matter?",
          problem: "A thin style factor's estimated returns have daily variance $0.0005$; its regression's estimation-error variance is $0.0001$.",
          steps: [
            "Corrected variance: $0.0005 - 0.0001 = 0.0004$.",
            "Volatility: $2.24\\%$ uncorrected versus $2\\%$ corrected.",
          ],
          answer: "A $12\\%$ overstatement of the factor's volatility, purely from regression noise — larger for factors with few or noisy constituents.",
        },
      ],
    },
    {
      heading: "Volatility, correlation and fast regimes",
      blocks: [
        {
          kind: "formula",
          latex: "\\boldsymbol{\\Omega}_f = \\mathbf{V}\\mathbf{C}\\mathbf{V}, \\qquad \\mathbf{V} = \\text{diag}(\\sigma_1, \\dots, \\sigma_m)",
          caption: "Estimate volatilities and correlations separately, each with its own exponential half-life",
        },
        {
          kind: "prose",
          text:
            "Following Bollerslev's constant-correlation idea, practitioners use a shorter half-life for volatilities and " +
            "a longer one for correlations, which need more data; typical daily-model half-lives run from about three " +
            "months to a year. Dynamic conditional correlation (DCC) lets the correlations move too.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Regimes switch faster than EWMAs",
          text:
            "Factor volatility often jumps discontinuously. A long-half-life EWMA understates risk at the onset of a " +
            "crisis — exactly when it matters most — and stays too high after it. **Short-term factor updating** scales " +
            "factor returns by a latent multiplier $e^{x_t/2}$, filters $x_t$ from log squared volatility-standardized " +
            "returns (the Harvey–Shephard trick) with a $10$–$20$ day half-life, and multiplies the covariance by about " +
            "$e^{\\hat{x}_t}$. If recent standardized returns have mean square $2.25$, volatilities rise by a factor $1.5$.",
        },
      ],
    },
    {
      heading: "Autocorrelation and linked models",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\boldsymbol{\\Omega}}_f^{\\text{NW}} = \\mathbf{C}_0 + \\sum_{l=1}^{L}\\left(1 - \\frac{l}{L + 1}\\right)\\left(\\mathbf{C}_l + \\mathbf{C}_l^{\\top}\\right), \\qquad [\\mathbf{C}_l]_{ij} = \\text{Cov}(f_{t,i}, f_{t-l,j})",
          caption: "Newey–West: lagged covariances with Bartlett weights, keeping the estimate positive semidefinite",
        },
        {
          kind: "example",
          title: "Autocorrelation and annual risk",
          problem: "A factor has $1\\%$ daily volatility and lag-one autocorrelation $0.15$. What is its annual volatility?",
          steps: [
            "Long-run variance per day: $\\sigma^{2}(1 + 2\\rho) = 10^{-4} \\times 1.3$.",
            "Annual: $\\sqrt{252 \\times 1.3 \\times 10^{-4}} \\approx 18.1\\%$, against $15.9\\%$ if autocorrelation is ignored.",
          ],
          answer: "Daily covariances understate longer-horizon risk by $14\\%$ in volatility.",
        },
        {
          kind: "prose",
          text:
            "**Global models.** Markets close at different times, so same-day returns are asynchronous: contemporaneous " +
            "correlations are understated and lagged ones appear (aggregate over several days or apply Newey–West). " +
            "Holidays leave gaps; pairwise estimates may not be positive definite. To link separately built local models, " +
            "rotate each diagonal block of an integrated covariance to match the local model, " +
            "$\\mathbf{C}^{(i)} = \\mathbf{V}_{ii}^{-1/2}\\left(\\hat{\\boldsymbol{\\Omega}}_f^{(i)}\\right)^{1/2}$, apply the same " +
            "rotations to the cross-blocks, and optionally shrink them.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 6, §6.3 Estimating the Factor Covariance Matrix and §6.7.1 Linking Models" },
    { source: "Ledoit and Wolf, “Honey, I Shrunk the Sample Covariance Matrix”, Journal of Portfolio Management (2004)", locator: "Linear shrinkage" },
    { source: "Newey and West, “A Simple, Positive Semi-definite, Heteroskedasticity and Autocorrelation Consistent Covariance Matrix”, Econometrica (1987)", locator: "HAC estimator" },
  ],
};
