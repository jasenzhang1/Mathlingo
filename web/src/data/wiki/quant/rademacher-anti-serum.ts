import type { WikiArticle } from "../types";

export const rademacherAntiSerumWiki: WikiArticle = {
  conceptId: "rademacher-anti-serum",

  summary:
    "The Rademacher Anti-Serum (RAS) is Paleologo's protocol for trusting backtests when you have tried a great many " +
    "strategies. Run every candidate walk-forward, collect their performance in a $T \\times N$ matrix, and subtract from " +
    "each strategy's estimated Sharpe ratio (or information coefficient) a single haircut. The haircut has a " +
    "data-snooping part — twice the Rademacher complexity of the strategy set — and an estimation part that shrinks " +
    "with $T$. The result is a lower bound on every strategy's true performance, holding simultaneously with high " +
    "probability, for finite samples, and it automatically accounts for how correlated the strategies are. The theory " +
    "is in the Rademacher Complexity lesson.",

  sections: [
    {
      heading: "Setup",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "$\\mathbf{X} \\in \\mathbb{R}^{T \\times N}$", description: "Walk-forward performance: for strategies, each period's return divided by its predicted volatility (so a column's mean is its empirical Sharpe); for signals, each period's information coefficient." },
            { term: "$\\hat{\\theta}_n$", description: "The column mean: strategy $n$'s empirical performance. Its true counterpart is $\\theta_n$." },
            { term: "Assumption", description: "Rows are i.i.d. If a column is autocorrelated up to lag $s$, replace it by non-overlapping averages over blocks of length $s$." },
          ],
        },
        {
          kind: "formula",
          latex: "\\hat{R} = \\mathbb{E}_{\\boldsymbol{\\epsilon}}\\left[\\sup_{n} \\frac{1}{T}\\sum_{t=1}^{T}\\epsilon_t x_{t,n}\\right]",
          caption: "Empirical Rademacher complexity of the strategy set, with $\\boldsymbol{\\epsilon}$ a random $\\pm 1$ vector",
        },
      ],
    },
    {
      heading: "Three readings of $\\hat{R}$",
      blocks: [
        {
          kind: "list",
          items: [
            "**Covariance with noise**: the expected best covariance between any strategy and a random sign series. If some strategy always matches the noise, the set “can do no wrong” — and its good backtests are suspect.",
            "**Generalized two-way cross-validation**: with about half the signs positive, $\\frac{1}{T}\\sum_t \\epsilon_t x_{t,n}$ is half the gap between strategy $n$'s performance on two random halves of history. A large $\\hat{R}$ means some strategy is always inconsistent across halves.",
            "**Span**: strategy columns are vectors of norm about $\\sqrt{T}$; $\\hat{R}$ is the expected best cosine with a random direction. Copies of one strategy span almost nothing; many orthogonal strategies span a lot.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Dependence is built in",
          text:
            "A billion identical strategies have the same $\\hat{R}$ as one. Bonferroni would charge for a billion tests; " +
            "RAS charges only for genuine diversity.",
        },
      ],
    },
    {
      heading: "The bounds",
      blocks: [
        {
          kind: "formula",
          latex: "\\theta_n \\ge \\hat{\\theta}_n - 2\\hat{R} - 3\\sqrt{\\frac{2\\log(2/\\delta)}{T}} - \\sqrt{\\frac{2\\log(2N/\\delta)}{T}} \\quad \\text{for all } n, \\text{ with probability} \\ge 1 - \\delta",
          caption: "Sharpe ratios (sub-Gaussian standardized returns), in per-period units",
        },
        {
          kind: "prose",
          text:
            "For signals the ICs are bounded ($|x_{t,n}| \\le 1$, being correlations), so the extra $\\log N$ term " +
            "disappears and the estimation term is of order $\\sqrt{\\frac{2\\log(2/\\delta)}{T}}$, scaled down further " +
            "by any tighter bound $\\kappa$ on the ICs: with $\\kappa = 0.02$, $\\delta = 0.01$ and $T = 2{,}500$ it is " +
            "only about $0.001$–$0.002$.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Data-snooping term $2\\hat{R}$", description: "Grows with the number and diversity of strategies; does not vanish as $T \\to \\infty$." },
            { term: "Estimation term", description: "The unavoidable sampling error of an average, of order $\\frac{1}{\\sqrt{T}}$; vanishes as $T \\to \\infty$." },
          ],
        },
        {
          kind: "example",
          title: "A million strategies, ten years",
          problem: "Take $\\delta = 0.01$, $T = 2{,}500$ days and $N = 10^{6}$ strategies. How large is the estimation part of the Sharpe haircut?",
          steps: [
            "$\\sqrt{\\frac{2\\log 200}{2{,}500}} = 0.0651$, times $3$: $0.195$.",
            "$\\sqrt{\\frac{2\\log(2 \\times 10^{8})}{2{,}500}} = 0.124$.",
            "Total $\\approx 0.32$ per day, or about $5$ annualised (multiply by $\\sqrt{252}$).",
          ],
          answer: "A loose bound — Lo's standard error for a single strategy with Sharpe $3$ is about $1.7$ at a comparable confidence — but one that holds uniformly over a million selections.",
        },
      ],
    },
    {
      heading: "Using it",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Backtest **every** candidate walk-forward, with parameters tuned only on the past. Leaving out variants you tried shrinks $\\hat{R}$ dishonestly.",
            "Form $\\mathbf{X}$; check autocorrelation and block if needed.",
            "Compute $\\hat{\\boldsymbol{\\theta}}$ and estimate $\\hat{R}$ by Monte Carlo over random sign vectors — cheap even for tens of millions of strategies.",
            "Subtract the haircut. A negative lower bound means the data cannot rule out zero true performance at confidence $1 - \\delta$, not that the strategy is worthless.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A screen, not a forecast",
          text:
            "The bound is conservative, especially for Sharpe ratios. Use it to screen candidates and compare strategy " +
            "sets, keep the candidate set theory-driven so $\\hat{R}$ stays small, and let live, out-of-sample performance " +
            "accumulate.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 4, §4.3 The Rademacher Anti-Serum and §4.4 Appendix (Theorems 4.3–4.4)" },
    { source: "Lo, “The Statistics of Sharpe Ratios”, Financial Analysts Journal (2002)", locator: "Standard error of the Sharpe ratio" },
  ],
};
