import type { WikiArticle } from "./types";

export const monteCarloIntegrationWiki: WikiArticle = {
  conceptId: "monte-carlo-integration",
  summary:
    "Monte Carlo sampling replaces an integral you cannot do with an average you can: draw $X_1, \\ldots, X_n$ " +
    "from $p$, average $f(X_i)$, and the law of large numbers guarantees you converge to $\\mathbb{E}_p[f(X)]$. " +
    "The central limit theorem then tells you how wrong you are — the error shrinks like $\\sigma/\\sqrt{n}$, " +
    "and, remarkably, that rate does not depend on the dimension of $X$. Importance sampling, MCMC and Gibbs " +
    "sampling are all refinements of this one idea.",
  sections: [
    {
      heading: "The estimator",
      blocks: [
        {
          kind: "formula",
          latex: "I = \\mathbb{E}_p[f(X)] = \\int f(x)\\,p(x)\\,dx \\qquad \\hat{I}_n = \\frac{1}{n}\\sum_{i=1}^{n} f(X_i), \\quad X_i \\overset{\\text{iid}}{\\sim} p",
          caption: "Any integral that can be written as an expectation can be estimated by a sample mean",
        },
        {
          kind: "list",
          items: [
            "Unbiased: $\\mathbb{E}[\\hat{I}_n] = I$ for every $n$, by linearity of expectation.",
            "Consistent: $\\hat{I}_n \\to I$ almost surely as $n \\to \\infty$, by the strong law of large numbers — as long as $\\mathbb{E}_p|f(X)| < \\infty$.",
            "Error bar: if $\\sigma^2 = \\operatorname{Var}_p(f(X)) < \\infty$, then $\\operatorname{Var}(\\hat{I}_n) = \\sigma^2/n$, so the standard error is $\\sigma/\\sqrt{n}$, and by the CLT $\\hat{I}_n \\pm 1.96\\,\\hat{\\sigma}/\\sqrt{n}$ is an approximate $95\\%$ confidence interval.",
          ],
        },
        {
          kind: "prose",
          text: "An integral over a region that is not already an expectation becomes one by choosing a density: $\\int_a^b g(x)\\,dx = (b-a)\\,\\mathbb{E}[g(U)]$ with $U \\sim \\text{Uniform}(a, b)$. Forgetting the factor $(b-a)$ — the volume of the region — is the most common slip.",
        },
      ],
    },
    {
      heading: "Why the rate doesn't care about dimension",
      blocks: [
        {
          kind: "prose",
          text: "A grid-based rule with $n$ points in $d$ dimensions has only $n^{1/d}$ points per axis, so its error decays like $n^{-k/d}$ for some smoothness order $k$ — hopeless once $d$ is in the tens. The Monte Carlo error $\\sigma/\\sqrt{n}$ comes from the CLT applied to an average of iid numbers; the dimension of $X$ never enters, only the variance of the scalar $f(X)$. That is why every high-dimensional integral in Bayesian statistics, physics and finance is done by sampling.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The price of $\\sqrt{n}$",
          text: "Dimension-free is not the same as fast. Halving the error costs $4\\times$ the samples; one more decimal digit costs $100\\times$. So after the method works, all the effort goes into shrinking $\\sigma$ — variance reduction — rather than into raising $n$.",
        },
      ],
    },
    {
      heading: "Variance reduction, briefly",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Antithetic variates", description: "Pair each draw $U$ with $1-U$ (or $Z$ with $-Z$). If $f$ is monotone the pair is negatively correlated, so their average has smaller variance than two independent draws." },
            { term: "Control variates", description: "Subtract $c\\,(h(X) - \\mathbb{E}[h(X)])$ for some $h$ whose mean you know exactly and which is correlated with $f$; the optimal $c$ removes the fraction $\\rho^2$ of the variance." },
            { term: "Importance sampling", description: "Draw from a different density $q$ that puts more samples where $|f|\\,p$ is large, and reweight by $p/q$. The next lesson." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Estimating $\\pi$ by throwing darts",
          problem:
            "Draw $n = 10{,}000$ points uniformly in the unit square and count the fraction $\\hat{p}$ that land inside the quarter-circle $x^2 + y^2 \\le 1$. Estimate $\\pi$ and its standard error.",
          steps: [
            "The quarter-circle has area $\\pi/4$, so $p = P(\\text{inside}) = \\pi/4 \\approx 0.785$ and $\\pi = 4p$.",
            "$\\hat{p}$ is a mean of indicators, so its standard error is $\\sqrt{p(1-p)/n} = \\sqrt{0.785 \\times 0.215 / 10{,}000} \\approx 0.0130$.",
            "The estimator $4\\hat{p}$ has standard error $4 \\times 0.0130 \\approx 0.052$.",
          ],
          answer: "$\\hat{\\pi} = 4\\hat{p}$, typically within about $\\pm 0.10$ ($95\\%$) of $\\pi$ at $n = 10{,}000$ — only one reliable decimal place, which is the $\\sqrt{n}$ rate in action.",
        },
      ],
    },
    {
      heading: "When it breaks",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Infinite variance hides in plain sight",
          text: "If $\\operatorname{Var}(f(X)) = \\infty$ the estimator may still converge (slowly), but the $\\sigma/\\sqrt{n}$ error bar is meaningless and the sample variance will look deceptively finite until a huge draw arrives. If $\\mathbb{E}|f(X)| = \\infty$ — the mean of a Cauchy variable, say — there is nothing to converge to at all, and the running average wanders forever.",
        },
      ],
    },
  ],
  references: [
    { source: "Owen, Monte Carlo Theory, Methods and Examples", locator: "Ch. 2, Simple Monte Carlo" },
    { source: "Robert & Casella, Monte Carlo Statistical Methods", locator: "Ch. 3" },
  ],
};
