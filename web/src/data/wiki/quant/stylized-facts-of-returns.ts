import type { WikiArticle } from "../types";

export const stylizedFactsOfReturnsWiki: WikiArticle = {
  conceptId: "stylized-facts-of-returns",

  summary:
    "Before building models, look at the bricks. Daily stock returns share a handful of “stylized facts” across stocks, " +
    "markets and decades: they are nearly uncorrelated over time, heavy-tailed, and their magnitudes are strongly " +
    "autocorrelated — calm and turbulent periods cluster. Over longer horizons they become more Gaussian. Geometric " +
    "Brownian motion, the textbook price model, gets most of this wrong, which is why the next lessons model volatility " +
    "directly.",

  sections: [
    {
      heading: "The four facts",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "**Absence of autocorrelation.** Lagged autocorrelations of returns are small, except at intraday scales where microstructure (bid–ask bounce) matters.",
            "**Heavy tails.** Large moves are far more frequent than a Gaussian allows. Sample kurtosis of daily log returns (2001–2017): AAPL $5.7$, IBM $7.1$, SPY $11.4$, NRG $14.3$, WAT $29.8$ — against $3$ for a Gaussian.",
            "**Autocorrelation of absolute and squared returns.** $|r_t|$ and $r_t^{2}$ are strongly and persistently autocorrelated (volatility clustering); the autocorrelation of $|r_t|$ is the largest — the **Taylor effect**.",
            "**Aggregational Gaussianity.** Weekly and monthly returns are closer to Gaussian than daily ones.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Uncorrelated is not independent",
          text:
            "Facts 1 and 3 together say returns are uncorrelated but dependent. The classic example is $X \\sim " +
            "\\mathcal{N}(0, 1)$ and $Y = X^{2}$: $\\text{Cov}(X, Y) = \\mathbb{E}[X^{3}] = 0$, yet $Y$ is a function of " +
            "$X$. For returns, $r_t = \\sigma_t z_t$ with $\\sigma_t$ driven by past moves has $\\mathbb{E}[r_t r_s] = 0$ " +
            "but predictable $r_t^{2}$. And returns are predictable from other variables — just not trivially.",
        },
        {
          kind: "prose",
          text:
            "Paleologo deliberately omits the **leverage effect** (volatility rising after losses) from the list: it was " +
            "well documented historically but is weak in recent data.",
        },
      ],
    },
    {
      heading: "How heavy are the tails?",
      blocks: [
        {
          kind: "formula",
          latex: "\\bar{F}(x) := P(r > x) = C x^{-\\alpha} \\qquad\\text{versus}\\qquad P(Z > x) \\approx \\frac{1}{x\\sqrt{2\\pi}} e^{-x^{2}/2}",
          caption: "Power-law tails decay polynomially; Gaussian tails decay like $e^{-x^{2}/2}$",
        },
        {
          kind: "prose",
          text:
            "A power-tailed variable with exponent $\\alpha$ has finite moments only of order below $\\alpha$, and its " +
            "extreme quantiles grow like $p^{-1/\\alpha}$, whereas Gaussian quantiles grow only like " +
            "$\\sqrt{2\\log(1/p)}$. For stocks the exponent appears to be around $4$ (estimates mostly between $3$ and " +
            "$6$). That is borderline for risk estimation: the sample variance $\\frac{1}{T}\\sum_t r_t^{2}$ obeys a CLT " +
            "only if $r_t^{2}$ has finite variance, i.e. if the **fourth** moment is finite.",
        },
        {
          kind: "example",
          title: "A one-in-ten-thousand day",
          problem: "In standard-deviation units, suppose $P(r > x) = 0.2x^{-4}$ in the tail. How large is the move exceeded with probability $10^{-4}$, compared with a Gaussian?",
          steps: [
            "Solve $0.2x^{-4} = 10^{-4}$: $x = (2000)^{1/4} \\approx 6.69$.",
            "The Gaussian $10^{-4}$ quantile is $3.72$.",
          ],
          answer: "About $1.8$ times larger. A Gaussian risk limit at this level would be breached far more often than designed.",
        },
      ],
    },
    {
      heading: "Clustering creates the tails",
      blocks: [
        {
          kind: "prose",
          text:
            "Much of the unconditional heavy-tailedness comes from mixing: if returns are Gaussian **given** today's " +
            "volatility but volatility varies, the unconditional distribution is a mixture of Gaussians, and " +
            "$\\mathbb{E}[r^{4}] = 3\\mathbb{E}[\\sigma^{4}] \\ge 3\\left(\\mathbb{E}[\\sigma^{2}]\\right)^{2}$ by Jensen's inequality. " +
            "Returns standardised by a good volatility forecast have much lighter tails, though usually still heavier " +
            "than Gaussian.",
        },
        {
          kind: "example",
          title: "Calm days and stressed days",
          problem: "Returns are $\\mathcal{N}(0, 1)$ with probability $0.8$ and $\\mathcal{N}(0, 9)$ with probability $0.2$. What is the kurtosis?",
          steps: [
            "$\\mathbb{E}[r^{2}] = 0.8(1) + 0.2(9) = 2.6$.",
            "$\\mathbb{E}[r^{4}] = 3\\left(0.8(1) + 0.2(81)\\right) = 51$.",
          ],
          answer: "Kurtosis $= \\frac{51}{2.6^{2}} \\approx 7.54$, from two perfectly Gaussian regimes.",
        },
        {
          kind: "table",
          headers: ["Fact", "Geometric Brownian motion", "GARCH(1,1)"],
          rows: [
            ["No autocorrelation of returns", "Yes", "Yes"],
            ["Heavy tails", "No — Gaussian log returns", "Yes, unconditionally (Pareto tails)"],
            ["Clustering of $|r_t|$, $r_t^{2}$", "No — constant volatility", "Yes, though often too strong for the observed kurtosis"],
            ["Aggregational Gaussianity", "Trivially", "In simulations"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Next",
          text:
            "Volatility is the thing that clusters, so the next two lessons forecast it: GARCH and realized volatility, " +
            "then the EWMA estimator and its state-space justification. The autocorrelation function and the Student $t$ " +
            "distribution are covered in the Time Series and Probability courses.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 2, §2.1.5 Stylized Facts" },
    { source: "Cont, “Empirical properties of asset returns: stylized facts and statistical issues”, Quantitative Finance (2001)", locator: "The standard survey" },
    { source: "Clauset, Shalizi and Newman, “Power-law distributions in empirical data”, SIAM Review (2009)", locator: "Maximum-likelihood tail estimation" },
  ],
};
