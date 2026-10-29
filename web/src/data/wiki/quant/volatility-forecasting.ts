import type { WikiArticle } from "../types";

export const volatilityForecastingWiki: WikiArticle = {
  conceptId: "volatility-forecasting",

  summary:
    "Volatility is the risk measure used throughout this course, and it moves: it clusters, spikes and decays. There " +
    "are two practical ways to forecast it. GARCH(1,1) treats tomorrow's variance as a hidden state updated from " +
    "yesterday's squared return; it needs only daily data and reproduces most stylized facts. Realized variance " +
    "measures today's variance directly by summing squared intraday returns; it needs high-frequency data and care with " +
    "microstructure noise. The two can be combined. The mechanics of ARCH and GARCH are in the Time Series course; this " +
    "lesson is about using them on returns.",

  sections: [
    {
      heading: "GARCH(1,1) on returns",
      blocks: [
        {
          kind: "formula",
          latex: "r_t = h_t\\epsilon_t, \\quad \\epsilon_t \\sim \\mathcal{N}(0, 1), \\qquad h_t^{2} = \\alpha_0 + \\alpha_1 r_{t-1}^{2} + \\beta_1 h_{t-1}^{2}",
          caption: "The variance is part of the state of the process: a big return today raises tomorrow's variance",
        },
        {
          kind: "definitions",
          items: [
            { term: "Long-run variance", description: "$\\bar{\\sigma}^{2} = \\frac{\\alpha_0}{1 - \\alpha_1 - \\beta_1}$, finite only when $\\alpha_1 + \\beta_1 < 1$." },
            { term: "Persistence", description: "$\\alpha_1 + \\beta_1$, typically $0.95$–$0.99$ for daily data; shocks to the forecast decay like $(\\alpha_1 + \\beta_1)^{k}$, a half-life of $\\frac{\\log 0.5}{\\log(\\alpha_1 + \\beta_1)}$ days." },
            { term: "$k$-step forecast", description: "$\\mathbb{E}[h_{t+k}^{2}] = \\bar{\\sigma}^{2} + (\\alpha_1 + \\beta_1)^{k-1}\\left(h_{t+1}^{2} - \\bar{\\sigma}^{2}\\right)$ — forecasts revert to the long-run level." },
            { term: "Estimation", description: "Given $\\theta = (\\alpha_0, \\alpha_1, \\beta_1)$ and a start value, the recursion reconstructs every $h_t$, so the Gaussian log-likelihood $-\\frac{1}{2}\\sum_t \\left(\\log h_t^{2} + \\frac{r_t^{2}}{h_t^{2}}\\right)$ can be maximised numerically." },
          ],
        },
        {
          kind: "example",
          title: "A volatility spike, ten days on",
          problem: "Long-run daily variance $\\bar{\\sigma}^{2} = 10^{-4}$ ($1\\%$ vol), persistence $0.95$, and after a shock the next-day forecast is $h_{t+1}^{2} = 4 \\times 10^{-4}$ ($2\\%$ vol). What is the forecast for day $t + 10$?",
          steps: [
            "Excess over the long run: $3 \\times 10^{-4}$.",
            "Decay over $9$ steps: $0.95^{9} \\approx 0.630$.",
            "$\\mathbb{E}[h_{t+10}^{2}] = 10^{-4} + 0.630 \\times 3 \\times 10^{-4} \\approx 2.89 \\times 10^{-4}$.",
          ],
          answer: "About $1.7\\%$ daily vol: still well above normal after two weeks — the half-life is $13.5$ days.",
        },
      ],
    },
    {
      heading: "How GARCH matches the stylized facts",
      blocks: [
        {
          kind: "list",
          items: [
            "**No autocorrelation of returns**: satisfied, since $\\mathbb{E}[r_t r_s] = 0$.",
            "**Heavy tails**: unconditional kurtosis $\\frac{3\\left(1 - (\\alpha_1 + \\beta_1)^{2}\\right)}{1 - (\\alpha_1 + \\beta_1)^{2} - 2\\alpha_1^{2}} > 3$ whenever $\\alpha_1 > 0$; in fact the tails are Pareto.",
            "**Clustering**: squared returns are positively autocorrelated, decaying like $(\\alpha_1 + \\beta_1)^{k}$ — though for indices the autocorrelation implied by the observed kurtosis is too high.",
            "**Aggregational Gaussianity**: observed in simulations.",
            "**Not captured**: skewness (GARCH returns are symmetric) and asymmetric response to falls, which need GJR-GARCH or EGARCH.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A random multiplicative recursion",
          text:
            "Write $h_t^{2} = a_t h_{t-1}^{2} + \\alpha_0$ with i.i.d. $a_t = \\alpha_1\\epsilon_{t-1}^{2} + \\beta_1$. The " +
            "variance is an AR(1) with random coefficients. It has a stationary distribution when $\\mathbb{E}[\\log a_t] < 0$ " +
            "— weaker than $\\mathbb{E}[a_t] = \\alpha_1 + \\beta_1 < 1$ — and occasional runs of $a_t > 1$ compound into " +
            "power-law tails. Gaussian innovations, fat-tailed returns.",
        },
      ],
    },
    {
      heading: "Realized variance",
      blocks: [
        {
          kind: "prose",
          text:
            "Split the day into $n$ intervals and let $r(j)$ be the log return over interval $j$. Under " +
            "$dp = \\mu\\, dt + \\sigma\\, dW$ (see Quadratic Variation), the realized variance $\\sum_j r(j)^{2}$ estimates " +
            "$\\sigma^{2}$ with a bias of order $\\frac{1}{n}$ and a standard deviation of about $\\sigma^{2}\\sqrt{\\frac{2}{n}}$ " +
            "— it gets better the more finely you sample. The drift is the opposite: its best estimate is $p(1) - p(0)$ " +
            "whatever $n$ is, with error $\\sigma$. High-frequency data reveal risk, not expected returns.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Where realized variance breaks",
          text:
            "Bid–ask bounce adds noise $\\epsilon_j$ to every price, inflating realized variance by about " +
            "$2n\\sigma_\\epsilon^{2}$ — worse at finer sampling. Thinly traded stocks have stale prices. Volatility is not " +
            "constant within the day (the open is wild), and the close-to-open return, often news-driven, is missed entirely. " +
            "Across many assets, plain $5$-minute realized variance is hard to beat; finer sampling helps only with " +
            "subsampling or kernel estimators.",
        },
        {
          kind: "example",
          title: "How much noise is too much?",
          problem: "A day has $390$ one-minute returns, true daily variance $10^{-4}$, and price noise $\\sigma_\\epsilon = 0.0005$ ($5$ bp). What is the bias of one-minute realized variance?",
          steps: [
            "Bias $\\approx 2n\\sigma_\\epsilon^{2} = 2 \\times 390 \\times 2.5 \\times 10^{-7} = 1.95 \\times 10^{-4}$.",
          ],
          answer: "Nearly twice the true variance. With $5$-minute returns ($n = 78$) the bias falls to $0.39 \\times 10^{-4}$ — still material, which is why noise-robust estimators exist.",
        },
      ],
    },
    {
      heading: "Combining them",
      blocks: [
        {
          kind: "formula",
          latex: "h_t^{2} = \\alpha_0 + \\beta_1 h_{t-1}^{2} + \\gamma x_{t-1}, \\qquad x_t = \\xi + \\varphi h_t^{2} + u_t",
          caption: "RealGARCH(1,1): yesterday's realized variance $x_{t-1}$ replaces the noisy $r_{t-1}^{2}$, and a measurement equation links it to the latent variance",
        },
        {
          kind: "prose",
          text:
            "When realized variance is the better measurement — liquid names with clean intraday data — RealGARCH " +
            "outperforms GARCH. A simpler alternative is to model the realized series directly, e.g. an AR(1) on " +
            "realized volatility, which also gives forecast error bars.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 2, §2.2 Conditional Heteroscedastic Models (§2.2.1–2.2.5)" },
    { source: "Andersen, Bollerslev, Christoffersen and Diebold, “Volatility and Correlation Forecasting”, Handbook of Economic Forecasting (2006)", locator: "Survey of GARCH and realized volatility" },
    { source: "Liu, Patton and Sheppard, “Does anything beat 5-minute RV?”, Journal of Econometrics (2015)", locator: "Comparison of realized measures" },
    { source: "Hansen, Huang and Shek, “Realized GARCH”, Journal of Applied Econometrics (2012)", locator: "The RealGARCH model" },
  ],
};
