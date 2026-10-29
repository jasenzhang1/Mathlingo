import type { WikiArticle } from "../types";

export const ewmaVolatilityWiki: WikiArticle = {
  conceptId: "ewma-volatility",

  summary:
    "The workhorse volatility estimator in industry is not GARCH but its simpler cousin: an exponentially weighted moving " +
    "average of squared returns. It is GARCH(1,1) with the long-run anchor removed. More importantly, it has a model " +
    "behind it: if the variance follows a random walk and each squared return is a noisy reading of it, the Kalman filter " +
    "is exactly this EWMA. The state-space view tells you how to set the half-life, what changes with mean reversion, and " +
    "how to repair the model's flaws — for instance by filtering log squared returns so volatility stays positive. " +
    "This lesson builds on Exponential Smoothing and the Kalman Filter.",

  sections: [
    {
      heading: "The estimator",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\sigma}_t^{2} = \\lambda\\hat{\\sigma}_{t-1}^{2} + (1 - \\lambda)\\, r_{t-1}^{2} \\qquad\\Longleftrightarrow\\qquad \\text{GARCH}(1,1) \\text{ with } \\alpha_0 = 0,\\ \\alpha_1 = 1 - \\lambda,\\ \\beta_1 = \\lambda",
          caption: "Uncentered: the mean daily return is tiny relative to volatility, so it is ignored",
        },
        {
          kind: "prose",
          text:
            "RiskMetrics popularised $\\lambda = 0.94$ for daily data (a half-life of about $11$ days). Commercial factor " +
            "models use longer half-lives for stability. The offset $\\alpha_0$ is what separates GARCH from the EWMA: it " +
            "pulls forecasts back to a long-run variance. An EWMA forecasts every future day at today's estimate.",
        },
        {
          kind: "example",
          title: "One bad day",
          problem: "Yesterday's estimate was $1\\%$ daily vol ($\\hat{\\sigma}^{2} = 10^{-4}$) and the stock fell $3\\%$. With $\\lambda = 0.94$, what is today's estimate?",
          steps: [
            "$\\hat{\\sigma}^{2} = 0.94 \\times 10^{-4} + 0.06 \\times 9 \\times 10^{-4} = 1.48 \\times 10^{-4}$.",
            "$\\hat{\\sigma} = \\sqrt{1.48 \\times 10^{-4}} \\approx 1.22\\%$.",
          ],
          answer: "A single $3\\sigma$ day lifts the estimate by $22\\%$, and the effect halves every $11$ days.",
        },
      ],
    },
    {
      heading: "Muth's model: why an EWMA",
      blocks: [
        {
          kind: "formula",
          latex: "x_{t+1} = x_t + \\eta_{t+1}, \\qquad y_t = r_t^{2} = x_t + \\epsilon_t",
          caption: "The variance $x_t$ random-walks; the squared return is an unbiased but noisy measurement of it",
        },
        {
          kind: "prose",
          text:
            "This is the local-level model from Exponential Smoothing, so the steady-state Kalman filter is " +
            "$\\hat{x}_{t+1|t} = (1 - K)\\hat{x}_{t|t-1} + K y_t$ — an EWMA with $\\lambda = 1 - K$. The gain depends on " +
            "the noise ratio $\\kappa = \\frac{\\sigma_\\epsilon}{\\sigma_\\eta}$: when the measurement is much noisier than " +
            "the period-to-period change of the variance, $K \\approx \\frac{1}{\\kappa + 1}$ is small and the half-life is " +
            "long. Squared returns are very noisy measurements — for Gaussian returns $\\text{sd}(r_t^{2}) = \\sqrt{2}\\sigma_t^{2}$ " +
            "— so long half-lives are the norm.",
        },
        {
          kind: "example",
          title: "Reading the noise ratio off $\\lambda$",
          problem: "If $\\lambda = 0.94$ is optimal in Muth's model, how much noisier is the measurement than the state?",
          steps: [
            "$K = 0.06$. The steady-state gain satisfies $\\frac{K^{2}}{1 - K} = \\frac{\\sigma_\\eta^{2}}{\\sigma_\\epsilon^{2}}$.",
            "$\\frac{0.0036}{0.94} \\approx 0.00383$, so $\\frac{\\sigma_\\epsilon^{2}}{\\sigma_\\eta^{2}} \\approx 261$.",
          ],
          answer: "$\\kappa \\approx 16$: each squared return is about $16$ times noisier than a day's genuine change in variance.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "What Muth's model gets wrong",
          text:
            "A Gaussian random walk can go negative and wanders without bound — its spread grows like $\\sqrt{t}$ — while " +
            "real volatility mean-reverts. And $r_t^{2} - \\sigma_t^{2}$ is skewed and heavy-tailed, not Gaussian. The " +
            "Kalman filter tolerates moderate non-normality, but the other two flaws call for better state equations.",
        },
      ],
    },
    {
      heading: "Better state equations",
      blocks: [
        {
          kind: "prose",
          text:
            "**Mean reversion.** Let $x_{t+1} = x_t - \\kappa(x_t - \\mu) + \\eta_{t+1}$, stationary with standard deviation " +
            "$\\frac{\\sigma_\\eta}{\\sqrt{2\\kappa - \\kappa^{2}}}$. The optimal filter is still an EWMA (of deviations from " +
            "$\\mu$), but with a **smaller** gain: a concentrated variance makes old data more informative. With " +
            "$\\sigma_\\epsilon^{2} = 81\\sigma_\\eta^{2}$, the gain falls from $0.105$ (random walk) to $0.071$ at AR " +
            "coefficient $0.95$ and $0.051$ at $0.9$.",
        },
        {
          kind: "prose",
          text:
            "**Harvey–Shephard.** Write the demeaned log return as $u_t = e^{x_t/2}\\epsilon_t$. Squaring and taking logs " +
            "makes it linear in the log-variance: $\\log u_t^{2} = x_t + \\log\\epsilon_t^{2}$. For standard normal " +
            "$\\epsilon_t$, $\\log\\epsilon_t^{2}$ has mean $\\approx -1.27$ and standard deviation $\\frac{\\pi}{\\sqrt{2}} " +
            "\\approx 2.22$. Filter $y_t = \\log u_t^{2} + 1.27$ with an AR(1) state, then report $\\hat{\\sigma} = " +
            "e^{\\hat{x}/2}$ — positive by construction, log-normally distributed and right-skewed, as volatility should be.",
        },
        {
          kind: "formula",
          latex: "\\hat{x}_{t+1|t} = (1 - K)\\hat{x}_{t|t-1} + K\\left(\\log r_t^{2} + 1.27\\right), \\qquad \\hat{\\sigma}_{t+1|t} = e^{\\hat{x}_{t+1|t}/2}",
          caption: "The simplified Harvey–Shephard filter: an EWMA of log squared returns",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why practitioners like it",
          text:
            "One parameter with an interpretation, no per-asset likelihood that can fail, trivial to update, and it extends " +
            "unchanged to covariance matrices — which is how it enters the factor-covariance and idiosyncratic-risk " +
            "lessons later in the course. Choose the half-life by out-of-sample evaluation with a robust loss, not by " +
            "in-sample fit.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 2, §2.3 State-Space Estimation of Variance and §2.4 Appendix (Kalman filter examples)" },
    { source: "Muth, “Optimal Properties of Exponentially Weighted Forecasts”, JASA (1960)", locator: "The local-level model" },
    { source: "Harvey and Shephard, “Estimation of an Asymmetric Stochastic Volatility Model for Asset Returns”, JBES (1996)", locator: "Log-squared-return state-space model" },
    { source: "J.P. Morgan/Reuters, RiskMetrics Technical Document (1996)", locator: "EWMA volatility with λ = 0.94" },
  ],
};
