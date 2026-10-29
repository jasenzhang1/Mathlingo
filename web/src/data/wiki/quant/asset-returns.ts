import type { WikiArticle } from "../types";

export const assetReturnsWiki: WikiArticle = {
  conceptId: "asset-returns",

  summary:
    "Everything in quantitative investing is built on returns. A simple return is the percentage change in price plus any " +
    "dividend; it adds up across assets, so a portfolio's profit is just $\\mathbf{w}^{\\top}\\mathbf{r}$. A log return, " +
    "$\\log(1 + r)$, adds up across time instead, which makes multi-period analysis tractable. For daily equity returns the " +
    "two are nearly equal. The book works with excess returns — returns minus the risk-free rate — because every position " +
    "is financed, and it treats observed prices as noisy measurements of a true price.",

  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "formula",
          latex: "r_i(1) = \\frac{P_i(1) + D_i(1) - P_i(0)}{P_i(0)} \\qquad \\tilde{r}_i(1) = \\log\\left(1 + r_i(1)\\right)",
          caption: "Dividend-adjusted simple return and log return of asset $i$ from day $0$ to day $1$",
        },
        {
          kind: "prose",
          text:
            "If $w_i$ is the dollar amount held in asset $i$, the position holds $\\frac{w_i}{P_i(0)}$ shares, so its " +
            "profit is $w_i r_i$ and the portfolio's profit and loss is $\\mathbf{w}^{\\top}\\mathbf{r}$. Throughout the " +
            "course, $\\mathbf{w}$ is in dollars, not percentages.",
        },
        {
          kind: "formula",
          latex: "\\sum_i w_i r_i - \\left(\\sum_i w_i\\right) r_f = \\sum_i w_i \\left(r_i - r_f\\right)",
          caption: "Financing the net market value at the risk-free rate turns every return into an excess return",
        },
        {
          kind: "prose",
          text:
            "Longs pay interest on the cash they use and shorts earn it on their proceeds, so subtracting $r_f$ asset by " +
            "asset accounts for financing exactly. A dollar-neutral book ($\\sum_i w_i = 0$) has the same PnL whether you " +
            "use raw or excess returns. In the US the reference rate is an overnight rate such as SOFR.",
        },
      ],
    },
    {
      heading: "Compounding: simple versus log",
      blocks: [
        {
          kind: "formula",
          latex: "r(1{:}T) = \\prod_{t=1}^{T} \\left(1 + r(t)\\right) - 1 \\qquad \\tilde{r}(1{:}T) = \\sum_{t=1}^{T} \\tilde{r}(t)",
          caption: "Simple returns multiply over time; log returns add",
        },
        {
          kind: "prose",
          text:
            "If daily log returns are independent Gaussians, the $T$-day log return is Gaussian with variance " +
            "$T\\sigma^{2}$ — volatility grows like $\\sqrt{T}$. Simple returns are not so kind: a product of Gaussians " +
            "is not Gaussian, and its variance depends on the means as well. Because $\\log(1 + x) \\approx x$ for small " +
            "$x$, the two are interchangeable for daily equity returns; always check before relying on it at long " +
            "horizons or for volatile assets.",
        },
        {
          kind: "example",
          title: "Up ten, down ten",
          problem: "A stock gains $10\\%$ then loses $10\\%$. Compare the sum of simple returns, the exact return and the log return.",
          steps: [
            "Sum of simple returns: $0.10 - 0.10 = 0$.",
            "Exact: $1.1 \\times 0.9 - 1 = -0.01$, a $1\\%$ loss.",
            "Log: $\\log 1.1 + \\log 0.9 = 0.0953 - 0.1054 = -0.0101$, and $e^{-0.0101} - 1 = -0.01$.",
          ],
          answer: "Log returns add exactly; summing simple returns misses the $1\\%$ loss — the volatility drag $\\approx \\frac{\\sigma^{2}}{2}$ per period.",
        },
      ],
    },
    {
      heading: "Prices are measured with error",
      blocks: [
        {
          kind: "prose",
          text:
            "Trades print at the bid or the ask, venues disagree, and timestamps are integrated differently, so the " +
            "observed price is a noisy reading of the true one. The **Roll model** makes this precise: the true price " +
            "$m_t$ is a random walk and we observe $p_t = m_t + \\epsilon_t$.",
        },
        {
          kind: "formula",
          latex: "m_{t+1} = m_t + \\eta_{t+1}, \\quad p_t = m_t + \\epsilon_t \\quad\\Longrightarrow\\quad \\text{Cov}(\\Delta p_{t+1}, \\Delta p_t) = -\\sigma_\\epsilon^{2}",
          caption: "Bid–ask bounce makes consecutive price changes negatively correlated; changes further apart are uncorrelated",
        },
        {
          kind: "example",
          title: "Reading noise from autocorrelation",
          problem: "With $\\sigma_\\eta = 0.01$ and $\\sigma_\\epsilon = 0.02$, what is the lag-one autocorrelation of price changes?",
          steps: [
            "$\\text{Var}(\\Delta p) = \\sigma_\\eta^{2} + 2\\sigma_\\epsilon^{2} = 0.0001 + 0.0008 = 0.0009$.",
            "$\\text{Cov} = -\\sigma_\\epsilon^{2} = -0.0004$.",
          ],
          answer: "$\\frac{-0.0004}{0.0009} = -0.444$. Turned around, an observed lag-one autocovariance estimates the noise; large autocorrelations at longer lags signal genuine dynamics the model misses.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Filtering the price",
          text:
            "The optimal estimate of $m_t$ is a Kalman filter, which here is an exponentially weighted moving average of " +
            "observed prices: $\\hat{m}_{t+1|t} = (1 - K)\\hat{m}_{t|t-1} + K p_t$. So a smoothed average of recent " +
            "intraday prices can beat the last print as a “close”. The catch: consecutive smoothed prices share data, so " +
            "returns built from them are spuriously correlated unless $(1 - K)^{T} \\ll 1$ over the return interval $T$. " +
            "See the Kalman Filter and Exponential Smoothing lessons for the machinery.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 2, §2.1.1–2.1.4 Returns" },
    { source: "Ruppert and Matteson, Statistics and Data Analysis for Financial Engineering", locator: "Ch. 2, Returns" },
    { source: "Hasbrouck, Empirical Market Microstructure", locator: "Ch. 3, The Roll Model" },
  ],
};
