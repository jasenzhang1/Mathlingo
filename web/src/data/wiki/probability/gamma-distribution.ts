import type { WikiArticle } from "../types";

export const gammaDistribution: WikiArticle = {
  conceptId: "gamma-distribution",
  summary:
    "The gamma distribution models the waiting time until the $k$th event in a Poisson process. It generalises the exponential — which is the $k = 1$ case — and contains the chi-square as a special case, making it the connective tissue between waiting times, sums, and the sampling distribution of variances.",
  sections: [
    {
      heading: "Density and parameters",
      blocks: [
        {
          kind: "formula",
          latex: "f_X(x) = \\frac{\\lambda^{\\alpha}}{\\Gamma(\\alpha)}\\,x^{\\alpha - 1}e^{-\\lambda x}, \\qquad x > 0",
          caption: "Gamma$(\\alpha, \\lambda)$ in the shape–rate parameterisation",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\frac{\\alpha}{\\lambda}, \\qquad \\operatorname{Var}(X) = \\frac{\\alpha}{\\lambda^{2}}",
          caption: "Mean and variance",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Rate or scale — the recurring parameterisation trap",
          text: "Gamma is written with a *rate* $\\lambda$ or a *scale* $\\theta = 1/\\lambda$, and both are standard. R's `dgamma` accepts either but defaults to rate; many textbooks and the chi-square identity below use scale. Mean is $\\alpha/\\lambda$ under rate and $\\alpha\\theta$ under scale — inverted, and silently so. Check before trusting any gamma computation you did not set up yourself.",
        },
        {
          kind: "prose",
          text: "The shape $\\alpha$ controls the form: $\\alpha < 1$ gives a density diverging at the origin, $\\alpha = 1$ gives the exponential, and $\\alpha > 1$ gives a unimodal right-skewed curve whose peak moves right and whose skew diminishes as $\\alpha$ grows. For large $\\alpha$ it approaches a normal, by the CLT applied to the sum below.",
        },
      ],
    },
    {
      heading: "Where it comes from",
      blocks: [
        {
          kind: "formula",
          latex: "X_1, \\ldots, X_k \\ \\text{i.i.d.} \\ \\text{Exponential}(\\lambda) \\ \\Longrightarrow \\ \\sum_{i=1}^{k} X_i \\sim \\text{Gamma}(k, \\lambda)",
          caption: "A sum of independent exponentials — the wait for the $k$th event",
        },
        {
          kind: "prose",
          text: "This is the interpretation to hold onto. If events arrive as a Poisson process at rate $\\lambda$, each inter-arrival gap is Exponential$(\\lambda)$, and the total wait for $k$ of them is their sum. The integer-shape case is sometimes called the Erlang distribution.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the density is zero at the origin for $\\alpha > 1$",
          text: "The exponential's density is *maximal* at zero — the most likely wait for one event is a very short one. But the wait for two events cannot be near zero, because both gaps would have to be tiny simultaneously. The $x^{\\alpha-1}$ factor is exactly this suppression, and it is why gamma is a better model than exponential for anything requiring several stages to complete.",
        },
        {
          kind: "formula",
          latex: "X \\sim \\text{Gamma}(\\alpha_1, \\lambda),\\ Y \\sim \\text{Gamma}(\\alpha_2, \\lambda),\\ X \\perp\\!\\!\\!\\perp Y \\ \\Longrightarrow \\ X + Y \\sim \\text{Gamma}(\\alpha_1 + \\alpha_2, \\lambda)",
          caption: "Shapes add — but only when the rate is shared",
        },
      ],
    },
    {
      heading: "Special cases and relatives",
      blocks: [
        {
          kind: "table",
          headers: ["Distribution", "As a gamma", "Note"],
          rows: [
            ["Exponential$(\\lambda)$", "Gamma$(1, \\lambda)$", "one event"],
            ["Erlang$(k, \\lambda)$", "Gamma with integer $\\alpha$", "$k$ events"],
            ["$\\chi^{2}_{k}$", "Gamma$(k/2,\\ \\tfrac{1}{2})$ in rate form", "why $\\Gamma(k/2)$ appears in its density"],
            ["Inverse gamma", "distribution of $1/X$", "conjugate prior for a normal variance"],
          ],
        },
        {
          kind: "prose",
          text: "The chi-square connection is the reason gamma turns up in inference rather than only in queueing. Since $(n-1)s^{2}/\\sigma^{2} \\sim \\chi^{2}_{n-1}$, the sampling distribution of a variance is a gamma, and the conjugate prior for a normal precision is a gamma too — which is what makes Bayesian normal models tractable in closed form.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Waiting for the third call",
          problem:
            "Calls arrive as a Poisson process at 4 per hour. What is the expected wait for the third call, and its standard deviation?",
          steps: [
            "Wait $\\sim$ Gamma$(3, 4)$ with rate $\\lambda = 4$ per hour.",
            "$\\mathbb{E}[X] = 3/4 = 0.75$ hours, i.e. 45 minutes.",
            "$\\operatorname{Var}(X) = 3/16 = 0.1875$, so SD $= \\sqrt{0.1875} \\approx 0.433$ hours, about 26 minutes.",
            "Compare a single exponential wait: mean 15 minutes, SD 15 minutes.",
          ],
          answer:
            "45 minutes expected, SD about 26 minutes. Note the SD grows like $\\sqrt{k}$ while the mean grows like $k$ — the relative variability falls, which is the CLT taking hold.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Estimating $\\alpha$ has no closed form",
          text: "The MLE for the shape parameter requires solving a digamma equation numerically. The method-of-moments estimators $\\hat{\\alpha} = \\bar{X}^{2}/\\hat{\\sigma}^{2}$ and $\\hat{\\lambda} = \\bar{X}/\\hat{\\sigma}^{2}$ are closed-form and make good starting values — a concrete instance of why the method of moments survives alongside maximum likelihood.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§3.3.1" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 8.4, 13.2" },
    { source: "Wasserman, All of Statistics", locator: "§2.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/continuous-distributions.md" },
  ],
};
