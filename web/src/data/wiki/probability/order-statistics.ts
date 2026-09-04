import type { WikiArticle } from "../types";

export const orderStatistics: WikiArticle = {
  conceptId: "order-statistics",
  summary:
    "Order statistics are the sample values sorted from smallest to largest. They are the basis of medians, quantiles, ranges, and every non-parametric method — and their distributions are derived not by manipulating densities but by translating \"the $k$th smallest exceeds $x$\" into a statement about counts.",
  sections: [
    {
      heading: "Definition and the key trick",
      blocks: [
        {
          kind: "formula",
          latex: "X_{(1)} \\le X_{(2)} \\le \\cdots \\le X_{(n)}",
          caption: "The sample sorted; $X_{(1)}$ is the minimum and $X_{(n)}$ the maximum",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Turn an ordering question into a counting question",
          text: "The event $\\{X_{(k)} \\le x\\}$ says the $k$th smallest is at most $x$ — which happens exactly when *at least $k$ of the $n$ observations* are at most $x$. Each observation independently falls below $x$ with probability $F(x)$, so that count is Binomial$(n, F(x))$. Every order-statistic distribution follows from this translation.",
        },
        {
          kind: "formula",
          latex: "F_{X_{(k)}}(x) = \\sum_{j=k}^{n} \\binom{n}{j} F(x)^{j}\\big[1 - F(x)\\big]^{n-j}",
          caption: "The CDF of the $k$th order statistic",
        },
      ],
    },
    {
      heading: "Extremes",
      blocks: [
        {
          kind: "formula",
          latex: "F_{X_{(n)}}(x) = F(x)^{n}, \\qquad F_{X_{(1)}}(x) = 1 - \\big[1 - F(x)\\big]^{n}",
          caption: "Maximum and minimum — the two easiest cases",
        },
        {
          kind: "prose",
          text: "Both come straight from independence. The maximum is at most $x$ precisely when *all* observations are, giving $F(x)^{n}$. The minimum exceeds $x$ precisely when all do, giving $[1-F(x)]^{n}$ for the survival function. No binomial sum is needed for these two.",
        },
        {
          kind: "example",
          title: "Minimum of exponentials",
          problem:
            "$X_1, \\ldots, X_n$ are i.i.d. Exponential$(\\lambda)$. Find the distribution of the minimum.",
          steps: [
            "$P(X_{(1)} > x) = \\prod_{i=1}^{n} P(X_i > x) = \\big(e^{-\\lambda x}\\big)^{n}$.",
            "$= e^{-n\\lambda x}$.",
            "That is the survival function of an Exponential$(n\\lambda)$.",
          ],
          answer:
            "$X_{(1)} \\sim \\text{Exponential}(n\\lambda)$, with mean $1/(n\\lambda)$. With $n$ independent Poisson processes running, the wait for the first event anywhere is $n$ times shorter — the standard competing-risks result.",
        },
      ],
    },
    {
      heading: "Densities and the uniform case",
      blocks: [
        {
          kind: "formula",
          latex: "f_{X_{(k)}}(x) = \\frac{n!}{(k-1)!\\,(n-k)!}\\,F(x)^{k-1}\\big[1-F(x)\\big]^{n-k} f(x)",
          caption: "Density of the $k$th order statistic",
        },
        {
          kind: "prose",
          text: "The combinatorial factor counts arrangements: choose which $k-1$ observations fall below, which one sits at $x$, and which $n-k$ lie above.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Uniform order statistics are Beta",
          text: "For i.i.d. Uniform$(0,1)$ data, $F(x) = x$ and the density above becomes exactly Beta$(k,\\ n-k+1)$. So $\\mathbb{E}[X_{(k)}] = k/(n+1)$ — the order statistics divide $[0,1]$ into $n+1$ equal expected gaps. Combined with the probability integral transform, this handles any continuous distribution: transform to uniforms, use the beta result, transform back. It is also why Q–Q plots use plotting positions of the form $k/(n+1)$.",
        },
      ],
    },
    {
      heading: "Why they matter",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Robustness.** The median is an order statistic and has a breakdown point of 50% — half the data can be arbitrarily corrupted before it moves. The mean's breakdown point is 0: one bad value moves it anywhere.",
            "**Non-parametric inference.** Rank-based tests, the sign test, and distribution-free confidence intervals for quantiles are all built from order statistics, and they require no distributional assumption at all.",
            "**Extreme value theory.** The maximum's limiting distribution, suitably normalised, is one of only three types — Gumbel, Fréchet, or Weibull. This is the extremal analogue of the CLT, and it governs flood levels, insurance losses, and structural loads.",
            "**Estimating a bound.** For Uniform$(0,\\theta)$ the MLE is $X_{(n)}$, and its variance shrinks like $1/n^{2}$ rather than the usual $1/n$ — one of the few settings where estimation is faster than the root-$n$ rate.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Order statistics are dependent, always",
          text: "Even when the underlying sample is independent, the sorted values are not: $X_{(1)} \\le X_{(2)}$ by construction. Any argument requiring independence — a product likelihood, a variance sum — is invalid applied to them, and their joint density needs the full $n!\\prod f(x_i)$ form on the ordered region.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§5.4" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 8.6" },
    { source: "David & Nagaraja, Order Statistics", locator: "Ch. 2" },
    { source: "Mathlingo assessment bank", locator: "assessments/estimation-theory.md" },
  ],
};
