import type { WikiArticle } from "../types";

export const activeStatisticalInferenceWiki: WikiArticle = {
  conceptId: "active-statistical-inference",

  summary:
    "Prediction-powered inference labels a uniformly random subset. Active statistical inference asks: if you can choose which points " +
    "to label, why not label where the model is least sure? Each point $i$ is labeled with a probability $\\pi(X_i)$ that grows with the " +
    "model's uncertainty, and the correction for the model's error is weighted by $\\frac{1}{\\pi(X_i)}$. Because the analyst sets " +
    "$\\pi$, the weights are known exactly and the estimate stays unbiased; because the budget is spent where errors are large, the " +
    "confidence interval is narrower than with uniform labeling for the same number of labels.",

  sections: [
    {
      heading: "The estimator",
      blocks: [
        {
          kind: "prose",
          text:
            "Start with $N$ unlabeled points and a model $f$. For each point flip a coin $\\xi_i \\sim \\text{Bernoulli}(\\pi(X_i))$ and request the " +
            "label $Y_i$ only if $\\xi_i = 1$. The budget is respected on average when $\\mathbb{E}[\\pi(X)] = \\frac{n_b}{N}$.",
        },
        {
          kind: "formula",
          latex: "\\hat{\\theta} = \\frac{1}{N}\\sum_{i=1}^{N} \\left[ f(X_i) + \\left( Y_i - f(X_i) \\right) \\frac{\\xi_i}{\\pi(X_i)} \\right]",
          caption: "Active estimator of $\\theta = \\mathbb{E}[Y]$; the term in brackets is computable because $Y_i$ is needed only when $\\xi_i = 1$",
        },
        {
          kind: "prose",
          text:
            "Unbiased because $\\mathbb{E}\\left[\\frac{\\xi_i}{\\pi(X_i)} \\,\\middle|\\, X_i, Y_i\\right] = 1$: the weighted correction averages to the " +
            "true error $Y_i - f(X_i)$. This is the inverse probability weighting of selection bias, with the selection probabilities known by design.",
        },
        {
          kind: "formula",
          latex: "N \\cdot \\text{Var}(\\hat{\\theta}) = \\text{Var}(Y) + \\mathbb{E}\\left[ \\left( Y - f(X) \\right)^{2} \\left( \\frac{1}{\\pi(X)} - 1 \\right) \\right]",
          caption: "The second term is the price of labeling only part of the data",
        },
      ],
    },

    {
      heading: "Where to spend the budget",
      blocks: [
        {
          kind: "prose",
          text:
            "Minimising the extra variance subject to $\\mathbb{E}[\\pi(X)] = \\frac{n_b}{N}$ (a Lagrangian exercise) gives the optimal rule:",
        },
        {
          kind: "formula",
          latex: "\\pi^{*}(x) \\;\\propto\\; \\sqrt{\\mathbb{E}\\left[ \\left( Y - f(X) \\right)^{2} \\mid X = x \\right]}",
          caption: "Label in proportion to the model's root-mean-square error at $x$ (capped at $1$)",
        },
        {
          kind: "prose",
          text:
            "The conditional error is unknown, so in practice it is replaced by an uncertainty score $u(x)$: for a classifier with predicted " +
            "probability $p$, $u(x) = \\sqrt{p(1-p)}$ is natural; for a language model it can be its own confidence. Mixing with the uniform rule, " +
            "$\\pi = (1 - \\tau)\\pi_u + \\tau \\frac{n_b}{N}$, guards against a badly calibrated $u$ and keeps $\\pi$ away from $0$.",
        },
        {
          kind: "example",
          title: "Easy points and hard points",
          problem:
            "Half the points are easy, with $\\mathbb{E}[(Y - f)^{2} \\mid X] = 0.01$; half are hard, with $0.09$. The budget allows labeling $20\\%$ " +
            "of points. Compare the extra variance term under uniform and optimal labeling.",
          steps: [
            "Uniform $\\pi = 0.2$: $0.5 \\times 0.01 \\times 4 + 0.5 \\times 0.09 \\times 4 = 0.02 + 0.18 = 0.2$.",
            "Optimal $\\pi \\propto \\sqrt{\\text{error}}$: ratio $0.1 : 0.3 = 1 : 3$. With mean $0.2$: $\\pi_{\\text{easy}} = 0.1$, $\\pi_{\\text{hard}} = 0.3$.",
            "Extra term: $0.5 \\times 0.01 \\times 9 + 0.5 \\times 0.09 \\times \\frac{7}{3} = 0.045 + 0.105 = 0.15$.",
          ],
          answer: "The extra variance drops from $0.2$ to $0.15$, a $25\\%$ cut, with the same expected number of labels.",
        },
      ],
    },

    {
      heading: "Variants and cautions",
      blocks: [
        {
          kind: "list",
          items: [
            "Inference: a CLT for $\\hat{\\theta}$ gives $\\hat{\\theta} \\pm z_{1-\\alpha/2}\\frac{\\hat{\\sigma}}{\\sqrt{N}}$, with $\\hat{\\sigma}^{2}$ the sample variance of the bracketed terms.",
            "Sequential version: the model and $\\pi$ can be updated as labels arrive, provided each $\\pi_t$ depends only on the past; a martingale CLT then applies.",
            "General targets: replace the mean by any convex M-estimation problem, weighting the label-dependent part of the loss by $\\frac{\\xi_i}{\\pi(X_i)}$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Never let $\\pi$ reach $0$",
          text:
            "A point with $\\pi(x) = 0$ can never have its error measured, and as $\\pi \\to 0$ the term $\\frac{1}{\\pi} - 1$ explodes. Validity " +
            "needs positivity; efficiency needs $\\pi$ bounded away from zero. The uniform mixture is the standard safeguard.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Not the same as active learning",
          text:
            "Active learning picks points to improve the model. Active inference picks points to shrink the confidence interval for a fixed " +
            "target, and its weights make the selection harmless to validity — a selected sample without selection bias.",
        },
      ],
    },
  ],

  references: [
    { source: "Zrnic, Candès, Active Statistical Inference (ICML 2024)", locator: "§2, the estimator; §3, optimal sampling rule" },
    { source: "Angelopoulos, Bates, Fannjiang, Jordan, Zrnic, Prediction-Powered Inference (Science 2023)", locator: "§2" },
    { source: "Horvitz, Thompson, A Generalization of Sampling Without Replacement from a Finite Universe (JASA 1952)", locator: "inverse probability weighting" },
  ],
};
