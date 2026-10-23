import type { WikiArticle } from "../types";

export const predictionPoweredInferenceWiki: WikiArticle = {
  conceptId: "prediction-powered-inference",

  summary:
    "Gold-standard labels are expensive; machine-learning predictions are cheap but biased. Prediction-powered inference (PPI) " +
    "combines a small labeled set of $n$ pairs $(X_i, Y_i)$ with a large unlabeled set of $N$ inputs $\\tilde{X}_j$. It uses the " +
    "model's predictions on the big set to estimate the quantity, then uses the labeled set to measure and subtract the model's " +
    "average error — the rectifier. The result is unbiased whatever the model's quality, and its confidence interval is narrower " +
    "than the classical one whenever the predictions track the labels.",

  sections: [
    {
      heading: "The estimator for a mean",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\theta}^{\\text{PP}} = \\underbrace{\\frac{1}{N}\\sum_{j=1}^{N} f(\\tilde{X}_j)}_{\\text{prediction estimate}} \\; - \\; \\underbrace{\\frac{1}{n}\\sum_{i=1}^{n} \\left( f(X_i) - Y_i \\right)}_{\\text{rectifier } \\hat{\\Delta}}",
        },
        {
          kind: "prose",
          text:
            "The first term alone estimates $\\mathbb{E}[f(X)]$, which is off from $\\theta = \\mathbb{E}[Y]$ by the model's bias " +
            "$\\Delta = \\mathbb{E}[f(X) - Y]$. The rectifier estimates that bias from labeled data, so " +
            "$\\mathbb{E}\\left[\\hat{\\theta}^{\\text{PP}}\\right] = \\mathbb{E}[f(X)] - \\Delta = \\theta$. The model is never trusted, only measured.",
        },
        {
          kind: "formula",
          latex: "\\text{Var}\\left(\\hat{\\theta}^{\\text{PP}}\\right) = \\frac{\\sigma^{2}_{f}}{N} + \\frac{\\sigma^{2}_{f - Y}}{n} \\qquad \\text{vs.} \\qquad \\text{Var}\\left(\\bar{Y}\\right) = \\frac{\\sigma^{2}_{Y}}{n}",
          caption: "The two samples are independent, so the variances add",
        },
        {
          kind: "formula",
          latex: "\\hat{\\theta}^{\\text{PP}} \\pm z_{1-\\alpha/2} \\sqrt{\\frac{\\hat{\\sigma}^{2}_{f}}{N} + \\frac{\\hat{\\sigma}^{2}_{f - Y}}{n}}",
          caption: "Prediction-powered confidence interval",
        },
        {
          kind: "prose",
          text:
            "With $N \\gg n$ the first term is negligible, so PPI wins whenever $\\text{Var}(f(X) - Y) < \\text{Var}(Y)$: the residuals of a " +
            "good model vary less than the outcome itself. A perfect model makes the interval collapse to the width allowed by $N$; a " +
            "useless model gives an interval about as wide as (and can be wider than) the classical one — but still valid.",
        },
      ],
    },

    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "Estimating a share with a classifier",
          problem:
            "A classifier scores $N = 10{,}000$ unlabeled documents with mean prediction $0.62$. On $n = 100$ hand-labeled documents the " +
            "mean prediction is $0.60$ and the mean label is $0.55$. Take $\\hat{\\sigma}^{2}_{f} = 0.04$, $\\hat{\\sigma}^{2}_{f-Y} = 0.01$ and $\\hat{\\sigma}^{2}_{Y} = 0.09$.",
          steps: [
            "Rectifier: $\\hat{\\Delta} = 0.60 - 0.55 = 0.05$, so $\\hat{\\theta}^{\\text{PP}} = 0.62 - 0.05 = 0.57$.",
            "$\\text{SE} = \\sqrt{\\frac{0.04}{10{,}000} + \\frac{0.01}{100}} = \\sqrt{0.000104} \\approx 0.0102$.",
            "$95\\%$ PPI interval: $0.57 \\pm 1.96 \\times 0.0102 = [0.550, 0.590]$.",
            "Classical: $\\text{SE} = \\sqrt{\\frac{0.09}{100}} = 0.03$, interval $0.55 \\pm 0.0588$.",
          ],
          answer: "The PPI interval is about $2.9$ times narrower — the classical estimator would need roughly $8.7$ times as many labels to match it.",
        },
      ],
    },

    {
      heading: "Beyond means: PPI++ and M-estimation",
      blocks: [
        {
          kind: "prose",
          text:
            "PPI++ adds a tuning weight $\\lambda$ so the method can never do worse than the classical estimator:",
        },
        {
          kind: "formula",
          latex: "\\hat{\\theta}_{\\lambda} = \\bar{Y} + \\lambda\\left( \\frac{1}{N}\\sum_{j} f(\\tilde{X}_j) - \\frac{1}{n}\\sum_{i} f(X_i) \\right), \\qquad \\lambda^{*} = \\frac{\\text{Cov}(Y, f(X))}{\\left(1 + \\frac{n}{N}\\right)\\text{Var}(f(X))}",
        },
        {
          kind: "prose",
          text:
            "$\\lambda = 0$ is the classical estimator, $\\lambda = 1$ is plain PPI. The bracket has mean zero, so every $\\lambda$ is " +
            "unbiased; $\\lambda^{*}$ minimises variance, exactly like a control variate. For a parameter defined by a convex loss " +
            "$\\theta = \\arg\\min \\mathbb{E}[\\ell_{\\theta}(X, Y)]$ — a quantile, a regression coefficient — PPI minimises the rectified loss " +
            "$\\frac{1}{N}\\sum_j \\ell_{\\theta}(\\tilde{X}_j, f(\\tilde{X}_j)) - \\frac{1}{n}\\sum_i \\left[\\ell_{\\theta}(X_i, f(X_i)) - \\ell_{\\theta}(X_i, Y_i)\\right]$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The labeled set must be a random sample",
          text:
            "The rectifier estimates the model's bias on the whole population only if the labeled $X_i$ are drawn from the same distribution " +
            "as the unlabeled $\\tilde{X}_j$. If labels were collected where the model looked shaky, use inverse probability weights — that is " +
            "active statistical inference.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why statisticians care",
          text:
            "Using predictions as if they were data (“imputing” labels with AlphaFold structures, LLM annotations or satellite land-cover maps) " +
            "gives tight but wrong intervals. Using only labeled data gives right but wide ones. PPI is the principled middle.",
        },
      ],
    },
  ],

  references: [
    { source: "Angelopoulos, Bates, Fannjiang, Jordan, Zrnic, Prediction-Powered Inference (Science 2023)", locator: "§2, mean estimation; §3, convex M-estimation" },
    { source: "Angelopoulos, Duchi, Zrnic, PPI++: Efficient Prediction-Powered Inference (2023)", locator: "§2, power tuning" },
    { source: "Robert, Casella, Monte Carlo Statistical Methods", locator: "Ch. 4, Controlling Monte Carlo Variance (control variates)" },
  ],
};
