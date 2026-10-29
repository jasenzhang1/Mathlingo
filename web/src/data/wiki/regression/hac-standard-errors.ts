import type { WikiArticle } from "../types";

export const hacStandardErrorsWiki: WikiArticle = {
  conceptId: "hac-standard-errors",

  summary:
    "With time-series data, errors are usually autocorrelated. OLS stays unbiased, but $\\hat{\\sigma}^2(\\mathbf{X}^T\\mathbf{X})^{-1}$ " +
    "ignores every cross-period covariance, and with persistent regressors and positively correlated errors the reported " +
    "standard errors are far too small. Heteroskedasticity-and-autocorrelation-consistent (HAC) standard errors replace the " +
    "middle of the sandwich with an estimate of the long-run variance; Newey–West is the standard choice.",

  sections: [
    {
      heading: "The long-run variance",
      blocks: [
        {
          kind: "formula",
          latex:
            "\\sqrt{T}(\\hat{\\boldsymbol{\\beta}} - \\boldsymbol{\\beta}) \\to \\mathcal{N}\\left(\\mathbf{0},\\; \\boldsymbol{\\Sigma}_{xx}^{-1}\\boldsymbol{\\Omega}\\boldsymbol{\\Sigma}_{xx}^{-1}\\right), \\qquad " +
            "\\boldsymbol{\\Omega} = \\sum_{h=-\\infty}^{\\infty}\\boldsymbol{\\Gamma}_h, \\quad \\boldsymbol{\\Gamma}_h = \\mathbb{E}\\left[\\mathbf{g}_t\\mathbf{g}_{t-h}^T\\right], \\quad \\mathbf{g}_t = \\mathbf{x}_t\\varepsilon_t",
          caption: "$\\boldsymbol{\\Omega}$ is the variance of $\\frac{1}{\\sqrt{T}}\\sum_t\\mathbf{g}_t$, which counts every autocovariance of the score.",
        },
        {
          kind: "prose",
          text:
            "White's heteroskedasticity-robust estimator keeps only $\\boldsymbol{\\Gamma}_0$. That is right for independent observations " +
            "but not for time series. For estimating a mean with AR(1) errors, $\\boldsymbol{\\Omega}/\\boldsymbol{\\Gamma}_0 = \\frac{1 + \\rho}{1 - \\rho}$: " +
            "with $\\rho = 0.5$ the true variance is $3$ times the naive one, so naive standard errors are $\\sqrt{3} \\approx 1.73$ times too small.",
        },
      ],
    },

    {
      heading: "The Newey–West estimator",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\boldsymbol{\\Omega}}_{NW} = \\hat{\\boldsymbol{\\Gamma}}_0 + \\sum_{h=1}^{m}\\left(1 - \\frac{h}{m + 1}\\right)\\left(\\hat{\\boldsymbol{\\Gamma}}_h + \\hat{\\boldsymbol{\\Gamma}}_h^T\\right), \\qquad \\hat{\\boldsymbol{\\Gamma}}_h = \\frac{1}{T}\\sum_{t=h+1}^{T}\\hat{\\mathbf{g}}_t\\hat{\\mathbf{g}}_{t-h}^T",
          caption: "Bartlett weights decline linearly to zero at lag $m + 1$.",
        },
        {
          kind: "prose",
          text:
            "Simply truncating the sum at lag $m$ (equal weights) can produce a matrix with negative eigenvalues, i.e. negative variances. " +
            "The Bartlett weights make $\\hat{\\boldsymbol{\\Omega}}_{NW}$ positive semidefinite in every sample, because the kernel has a " +
            "nonnegative Fourier transform.",
        },
        {
          kind: "example",
          title: "Truncation bias with a short bandwidth",
          problem:
            "A score has autocorrelations $\\rho_1 = 0.5$, $\\rho_2 = 0.25$, $\\rho_h = 0.5^h$ in general. Compare the Newey–West ratio $\\hat{\\Omega}/\\Gamma_0$ with $m = 2$ to the true long-run ratio.",
          steps: [
            "Weights for $m = 2$: $1 - \\frac{1}{3} = \\frac{2}{3}$ at lag $1$ and $1 - \\frac{2}{3} = \\frac{1}{3}$ at lag $2$.",
            "$\\hat{\\Omega}/\\Gamma_0 = 1 + 2\\cdot\\frac{2}{3}\\cdot 0.5 + 2\\cdot\\frac{1}{3}\\cdot 0.25 \\approx 1.833$.",
            "True: $\\frac{1 + 0.5}{1 - 0.5} = 3$.",
          ],
          answer: "With $m = 2$ the estimate captures only about $61\\%$ of the long-run variance: too small a bandwidth leaves standard errors biased downward.",
        },
      ],
    },

    {
      heading: "Choosing the bandwidth",
      blocks: [
        {
          kind: "prose",
          text:
            "Larger $m$ reduces truncation bias (which is of order $1/m$ for the Bartlett kernel) but adds estimation noise (of order $m/T$). " +
            "Balancing the two gives $m \\propto T^{1/3}$. A common rule of thumb is $m = \\lfloor 4(T/100)^{2/9}\\rfloor$; " +
            "Andrews (1991) and Newey–West (1994) give data-driven choices.",
        },
        {
          kind: "list",
          items: [
            "Overlapping $h$-period returns are mechanically MA($h - 1$): use at least $m = h - 1$.",
            "In small samples HAC $t$-tests over-reject even with a sensible $m$; fixed-$b$ critical values (Kiefer–Vogelsang) correct this.",
            "If the autocorrelation structure is known (e.g. AR(1)), GLS is more efficient; HAC keeps OLS and only fixes the inference.",
            "Fama–MacBeth standard errors on serially correlated slope estimates also need a Newey–West correction.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Same sandwich, different meat",
          text:
            "Classical, White (HC) and Newey–West (HAC) standard errors share the bread $(\\mathbf{X}^T\\mathbf{X})^{-1}$; they differ only in how much of the score's covariance they estimate.",
        },
      ],
    },
  ],

  references: [
    { source: "Newey & West, “A Simple, Positive Semi-Definite, Heteroskedasticity and Autocorrelation Consistent Covariance Matrix”, Econometrica 1987", locator: "The estimator" },
    { source: "Andrews, “Heteroskedasticity and Autocorrelation Consistent Covariance Matrix Estimation”, Econometrica 1991", locator: "Kernels and bandwidth choice" },
    { source: "Hamilton, Time Series Analysis", locator: "Ch. 10, Covariance-Stationary Vector Processes (the long-run variance of a sample mean)" },
  ],
};
