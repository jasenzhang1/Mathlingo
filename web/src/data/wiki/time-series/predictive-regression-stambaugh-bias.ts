import type { WikiArticle } from "../types";

export const predictiveRegressionStambaughBiasWiki: WikiArticle = {
  conceptId: "predictive-regression-stambaugh-bias",

  summary:
    "Predictive regressions forecast next period's return with today's value of a slow-moving variable such as the " +
    "dividend yield. The predictor is predetermined but not exogenous: its own shocks are correlated with return shocks. " +
    "Combined with the downward bias in estimating a persistent AR(1), that correlation biases the OLS slope, usually " +
    "toward finding predictability. Stambaugh (1999) quantified the bias; it is often as large as the estimate itself.",

  sections: [
    {
      heading: "The setup and the bias",
      blocks: [
        {
          kind: "formula",
          latex: "r_{t+1} = \\alpha + \\beta x_t + \\varepsilon_{t+1}, \\qquad x_{t+1} = \\mu + \\phi x_t + \\eta_{t+1}, \\qquad \\text{Cov}(\\varepsilon_t, \\eta_t) = \\sigma_{\\varepsilon\\eta}",
          caption: "A persistent predictor ($\\phi$ near $1$) whose innovations are correlated with return innovations.",
        },
        {
          kind: "prose",
          text:
            "Project the return shock on the predictor shock: $\\varepsilon_{t+1} = \\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}\\eta_{t+1} + v_{t+1}$. " +
            "Both regressions use the same regressor $x_t$, so $\\hat{\\beta} - \\beta = \\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}(\\hat{\\phi} - \\phi) + (\\text{noise with mean } 0)$. " +
            "Any bias in $\\hat{\\phi}$ is passed straight into $\\hat{\\beta}$, and $\\hat{\\phi}$ is biased down (Kendall): $\\mathbb{E}[\\hat{\\phi} - \\phi] \\approx -\\frac{1 + 3\\phi}{T}$.",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[\\hat{\\beta} - \\beta] \\approx -\\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}\\cdot\\frac{1 + 3\\phi}{T}",
          caption: "Stambaugh bias: of order $1/T$, with the sign of $-\\sigma_{\\varepsilon\\eta}$.",
        },
        {
          kind: "prose",
          text:
            "For valuation ratios the sign is predictable. A positive return shock raises the price and so lowers the dividend yield: " +
            "$\\sigma_{\\varepsilon\\eta} < 0$, and the bias in $\\hat{\\beta}$ is upward, exactly in the direction of “finding” predictability.",
        },
      ],
    },

    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "How big is the bias?",
          problem:
            "Annual data, $T = 60$. The dividend yield has $\\phi = 0.95$, innovation SD $\\sigma_\\eta = 0.004$; returns have innovation SD $\\sigma_\\varepsilon = 0.15$; the shocks have correlation $-0.9$. Approximate the bias in $\\hat{\\beta}$.",
          steps: [
            "$\\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2} = \\rho\\frac{\\sigma_\\varepsilon}{\\sigma_\\eta} = -0.9 \\times \\frac{0.15}{0.004} = -33.75$.",
            "$\\frac{1 + 3\\phi}{T} = \\frac{3.85}{60} \\approx 0.0642$.",
            "Bias $\\approx 33.75 \\times 0.0642 \\approx 2.17$.",
          ],
          answer: "About $2.2$: the same order as the slopes reported in classic dividend-yield regressions, so much of the apparent predictability can be bias.",
        },
      ],
    },

    {
      heading: "Corrections and robust inference",
      blocks: [
        {
          kind: "list",
          items: [
            "Stambaugh correction: subtract the estimated bias, $\\hat{\\beta}_{\\text{adj}} = \\hat{\\beta} + \\frac{\\hat{\\sigma}_{\\varepsilon\\eta}}{\\hat{\\sigma}_\\eta^2}\\cdot\\frac{1 + 3\\hat{\\phi}}{T}$, with an adjusted standard error.",
            "Lewellen (2004): if $\\phi$ is known to be below $1$, assume it is just below $1$ (the worst case for the bias) and use $\\hat{\\beta} - \\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}(\\hat{\\phi} - \\phi)$; this gains power when $\\hat{\\phi}$ is close to $1$.",
            "Near a unit root, conventional $t$-tests are not even asymptotically valid: use local-to-unity methods (Campbell–Yogo Bonferroni Q-test) or IVX instruments.",
            "Overlapping long-horizon returns compound the problem; their standard errors need HAC corrections and still over-reject.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Out-of-sample checks",
          text:
            "Goyal and Welch (2008) found most predictors that look significant in sample fail to beat the historical mean out of sample. Report out-of-sample $R^2$ against a fixed benchmark alongside any in-sample slope.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A general lesson",
          text:
            "Whenever a regressor is predetermined (set before the error) but its own innovations correlate with the error, OLS is consistent but biased in finite samples, and the bias scales with how persistent the regressor is.",
        },
      ],
    },
  ],

  references: [
    { source: "Stambaugh, “Predictive Regressions”, Journal of Financial Economics 1999", locator: "The bias formula" },
    { source: "Lewellen, “Predicting Returns with Financial Ratios”, Journal of Financial Economics 2004", locator: "The conservative test" },
    { source: "Campbell & Yogo, “Efficient Tests of Stock Return Predictability”, Journal of Financial Economics 2006", locator: "Local-to-unity inference" },
  ],
};
