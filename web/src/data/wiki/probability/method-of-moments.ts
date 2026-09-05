import type { WikiArticle } from "../types";

export const methodOfMoments: WikiArticle = {
  conceptId: "method-of-moments",
  summary:
    "The method of moments estimates parameters by setting theoretical moments equal to sample moments and solving. It is the oldest estimation method, almost always easier than maximum likelihood, and generally less efficient — which makes it most useful as a starting value for numerical MLE, or when the likelihood is intractable.",
  sections: [
    {
      heading: "The recipe",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[X^{k}] = \\frac{1}{n}\\sum_{i=1}^{n} X_i^{k}, \\qquad k = 1, 2, \\ldots, p",
          caption: "Match as many moments as there are parameters, then solve",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Express the first $p$ theoretical moments in terms of the $p$ unknown parameters.",
            "Set each equal to the corresponding sample moment.",
            "Solve the resulting system for the parameters.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why it works at all",
          text: "The law of large numbers guarantees that sample moments converge to theoretical moments. So if the parameters are a continuous function of the moments, plugging in the sample versions gives a consistent estimator. That argument requires nothing about the likelihood, which is exactly why the method survives where MLE is intractable.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Two parameters, two moments",
          problem:
            "Estimate $\\alpha$ and $\\beta$ for a Gamma$(\\alpha, \\beta)$ distribution, which has mean $\\alpha\\beta$ and variance $\\alpha\\beta^{2}$.",
          steps: [
            "First moment: $\\alpha\\beta = \\bar{X}$.",
            "Second central moment: $\\alpha\\beta^{2} = \\hat{\\sigma}^{2}$, the sample variance.",
            "Divide the second by the first: $\\beta = \\hat{\\sigma}^{2}/\\bar{X}$.",
            "Substitute back: $\\alpha = \\bar{X}/\\beta = \\bar{X}^{2}/\\hat{\\sigma}^{2}$.",
          ],
          answer:
            "$\\hat{\\alpha} = \\bar{X}^{2}/\\hat{\\sigma}^{2}$ and $\\hat{\\beta} = \\hat{\\sigma}^{2}/\\bar{X}$ — closed form, in three lines. The Gamma MLE has no closed form and requires numerical solution of a digamma equation.",
        },
        {
          kind: "example",
          title: "When it agrees with MLE",
          problem: "Estimate $\\lambda$ for a Poisson$(\\lambda)$ sample.",
          steps: [
            "$\\mathbb{E}[X] = \\lambda$, so match: $\\lambda = \\bar{X}$.",
            "The MLE also gives $\\hat{\\lambda} = \\bar{X}$.",
          ],
          answer:
            "$\\hat{\\lambda} = \\bar{X}$ by either route. Agreement is common in exponential-family models where the parameter *is* a moment.",
        },
      ],
    },
    {
      heading: "Comparison with MLE",
      blocks: [
        {
          kind: "table",
          headers: ["", "Method of moments", "Maximum likelihood"],
          rows: [
            ["Difficulty", "usually closed form", "often needs numerical optimisation"],
            ["Consistency", "yes", "yes"],
            ["Efficiency", "generally **not** efficient", "asymptotically efficient"],
            ["Uses", "only the first $p$ moments", "the entire distributional shape"],
            ["Needs the likelihood", "no", "yes"],
            ["Can leave the parameter space", "**yes**", "no"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It can return impossible answers",
          text: "Nothing constrains the solution to be valid. Fitting a Beta distribution by moments can produce negative $\\alpha$; fitting a binomial $n$ can give a non-integer or negative value. MLE cannot do this, because it searches only within the parameter space. When a moment estimate comes out impossible, that is usually a sign the model is wrong — but it still has to be handled.",
        },
        {
          kind: "prose",
          text: "The efficiency loss is the real cost. Moments summarise the data; the likelihood uses all of it. For a Uniform$(0,\\theta)$ sample, the moment estimator is $2\\bar{X}$ while the MLE is $\\max(X_i)$ — and the MLE's variance shrinks like $1/n^{2}$ against the moment estimator's $1/n$. Here the moment estimator can even fall below an observed value, asserting that data you have seen was impossible.",
        },
      ],
    },
    {
      heading: "Why it survives",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Starting values.** Numerical MLE needs an initial guess, and a moment estimate is a cheap, consistent one that usually lands in the right region.",
            "**Intractable likelihoods.** Some models are easy to simulate and hard to write a density for. Matching moments needs no density at all.",
            "**Generalised method of moments (GMM).** The extension to more moment conditions than parameters is a foundation of econometrics, where it handles instrumental variables and dynamic panel models that have no usable likelihood.",
            "**Robustness.** Using only low-order moments makes the estimator less sensitive to misspecification of the distribution's tails than a full likelihood is.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§7.2.1" },
    { source: "Wasserman, All of Statistics", locator: "§9.2" },
    { source: "Hansen, 'Large Sample Properties of Generalized Method of Moments Estimators'", locator: "Econometrica 50(4), 1982" },
    { source: "Mathlingo assessment bank", locator: "assessments/mgf-likelihood-and-estimation.md" },
  ],
};
