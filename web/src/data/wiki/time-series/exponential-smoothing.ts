import type { WikiArticle } from "../types";

export const exponentialSmoothingWiki: WikiArticle = {
  conceptId: "exponential-smoothing",

  summary:
    "An exponentially weighted moving average (EWMA) averages a series with weights that decay geometrically into the " +
    "past. It needs one number of memory and one line of code, and its single parameter has a readable meaning: the " +
    "half-life. It is not just a heuristic — it is exactly the Kalman filter for a random walk observed with noise, and " +
    "the optimal forecaster for an ARIMA$(0, 1, 1)$ process. That is why it appears everywhere from demand forecasting " +
    "to the volatility estimates inside commercial risk models.",

  sections: [
    {
      heading: "The recursion and its weights",
      blocks: [
        {
          kind: "formula",
          latex: "s_t = \\lambda s_{t-1} + (1 - \\lambda) x_t = (1 - \\lambda)\\sum_{k=0}^{t-1} \\lambda^{k} x_{t-k} + \\lambda^{t} s_0",
          caption: "Unrolling the update: the observation $k$ steps back gets weight $(1 - \\lambda)\\lambda^{k}$",
        },
        {
          kind: "definitions",
          items: [
            { term: "Decay $\\lambda \\in (0, 1)$", description: "Larger $\\lambda$ means longer memory and a smoother, slower average. Some texts write the update with the gain $K = 1 - \\lambda$ (or $\\alpha$) on the new observation." },
            { term: "Half-life $h$", description: "The lag at which weights halve: $\\lambda^{h} = \\frac{1}{2}$, so $h = \\frac{\\log 0.5}{\\log \\lambda}$ and $\\lambda = 0.5^{1/h}$." },
            { term: "Average age", description: "$\\sum_k k(1 - \\lambda)\\lambda^{k} = \\frac{\\lambda}{1 - \\lambda}$ — also the steady-state lag behind a linear trend of slope $1$." },
            { term: "Effective sample size", description: "For i.i.d. data the EWMA's variance is $\\frac{1 - \\lambda}{1 + \\lambda}\\sigma^{2}$, the same as an equal-weighted mean of $\\frac{1 + \\lambda}{1 - \\lambda}$ points." },
          ],
        },
        {
          kind: "example",
          title: "From half-life to decay",
          problem: "A risk model uses a half-life of $20$ days. What are $\\lambda$, the average age of its data, and its effective sample size?",
          steps: [
            "$\\lambda = 0.5^{1/20} \\approx 0.9659$.",
            "Average age $= \\frac{0.9659}{0.0341} \\approx 28.4$ days.",
            "Effective sample size $= \\frac{1.9659}{0.0341} \\approx 57.7$ observations.",
          ],
          answer: "$\\lambda \\approx 0.966$: a $20$-day half-life behaves like an equal-weighted window of about $58$ days, with the newest data weighted most.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Start-up bias",
          text:
            "Starting at $s_0 = 0$ leaves weight $\\lambda^{t}$ on the zero, so early values are biased toward it by the " +
            "factor $1 - \\lambda^{t}$. Initialise with the first observation or a short sample mean, or divide by " +
            "$1 - \\lambda^{t}$ (the correction used in the Adam optimiser).",
        },
      ],
    },
    {
      heading: "Why it is optimal: the local-level model",
      blocks: [
        {
          kind: "formula",
          latex: "x_{t+1} = x_t + \\eta_{t+1}, \\quad y_t = x_t + \\epsilon_t, \\quad \\eta \\sim \\mathcal{N}(0, q), \\ \\epsilon \\sim \\mathcal{N}(0, r)",
          caption: "A hidden level that random-walks, read through noise (Muth, 1960)",
        },
        {
          kind: "prose",
          text:
            "This is a linear-Gaussian state-space model, so the Kalman filter is the optimal estimator. Its gain " +
            "converges to a constant $K$, found from the steady-state Riccati equation for the prior variance $P$:",
        },
        {
          kind: "formula",
          latex: "P^{2} - qP - qr = 0, \\qquad K = \\frac{P}{P + r}, \\qquad \\hat{x}_{t+1|t} = (1 - K)\\hat{x}_{t|t-1} + K y_t",
          caption: "With constant gain, the Kalman filter is an EWMA with $\\lambda = 1 - K$",
        },
        {
          kind: "prose",
          text:
            "The gain depends only on the noise-to-signal ratio $\\frac{r}{q}$ (equivalently $\\frac{K^{2}}{1 - K} = " +
            "\\frac{q}{r}$). Noisy observations ($r \\gg q$) call for a small gain — long memory; $K \\approx \\sqrt{q/r}$. " +
            "A fast-moving level ($q \\gg r$) pushes $K$ toward $1$ — trust the latest reading.",
        },
        {
          kind: "example",
          title: "Computing the optimal gain",
          problem: "Take $q = 1$, $r = 4$. Find the steady-state gain and the corresponding EWMA decay.",
          steps: [
            "$P = \\frac{q + \\sqrt{q^{2} + 4qr}}{2} = \\frac{1 + \\sqrt{17}}{2} \\approx 2.562$.",
            "$K = \\frac{2.562}{2.562 + 4} \\approx 0.390$.",
            "Posterior variance after the update: $P_{t|t} = (1 - K)P = rK \\approx 1.562$.",
          ],
          answer: "$K \\approx 0.39$, i.e. $\\lambda \\approx 0.61$ — a half-life of about $1.4$ periods.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Mean reversion lengthens memory",
          text:
            "If the level mean-reverts ($x_{t+1} = a x_t + \\eta_{t+1}$ with $|a| < 1$) the filter is still an EWMA of " +
            "deviations from the mean, but with a **smaller** gain: the level stays concentrated, so old observations stay " +
            "informative. With $q = 1$, $r = 81$, the gain falls from $0.105$ at $a = 1$ to $0.051$ at $a = 0.9$.",
        },
      ],
    },
    {
      heading: "Forecasting and its limits",
      blocks: [
        {
          kind: "prose",
          text:
            "Simple exponential smoothing forecasts every future value at the current level — a flat line. That is " +
            "optimal for ARIMA$(0, 1, 1)$, $x_t - x_{t-1} = \\varepsilon_t - \\theta\\varepsilon_{t-1}$ with $\\theta = " +
            "\\lambda$, whose one-step forecast errors are then white noise.",
        },
        {
          kind: "table",
          headers: ["Series has…", "SES does…", "Use instead"],
          rows: [
            ["A trend", "Lags by $\\frac{\\lambda}{1 - \\lambda}$ times the slope", "Holt's linear method (smoothed level and slope)"],
            ["Seasonality", "Smears the seasonal pattern", "Holt–Winters or a seasonal state-space model"],
            ["Mean reversion", "Ignores the pull to the mean", "An AR model or an AR-state Kalman filter"],
            ["Heavy-tailed noise", "Jumps after a single outlier", "Winsorize inputs or use a robust filter"],
          ],
        },
        {
          kind: "example",
          title: "One Holt update",
          problem: "Holt's method with $\\alpha = 0.5$, $\\beta = 0.2$: level $\\ell_{t-1} = 10$, slope $b_{t-1} = 1$, new observation $x_t = 13$. Forecast two steps ahead.",
          steps: [
            "$\\ell_t = 0.5(13) + 0.5(10 + 1) = 12$.",
            "$b_t = 0.2(12 - 10) + 0.8(1) = 1.2$.",
          ],
          answer: "$\\ell_t + 2b_t = 14.4$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where this shows up",
          text:
            "Applied to squared returns, the EWMA becomes the industry-standard volatility estimator; applied to " +
            "intraday prices, it filters bid–ask noise. Both appear in the Quantitative Investing course, which builds on " +
            "this lesson and on the Kalman Filter lesson.",
        },
      ],
    },
  ],

  references: [
    { source: "Hyndman and Athanasopoulos, Forecasting: Principles and Practice (3rd ed.)", locator: "Ch. 8, Exponential Smoothing (§8.1 Simple exponential smoothing, §8.2 Methods with trend)" },
    { source: "Muth, “Optimal Properties of Exponentially Weighted Forecasts”, JASA (1960)", locator: "The local-level model" },
    { source: "Harvey, Forecasting, Structural Time Series Models and the Kalman Filter", locator: "Ch. 2 and 4, the local level model" },
  ],
};
