import type { WikiArticle } from "../types";

export const unbiasedEstimator: WikiArticle = {
  conceptId: "unbiased-estimator",
  summary:
    "An estimator is unbiased when its expected value equals the parameter it estimates — it is right *on average* across repeated samples. That is a weaker guarantee than it sounds: unbiasedness says nothing about the spread of individual estimates, does not survive non-linear transformation, and is frequently worth trading away for lower variance.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{Bias}(\\hat{\\theta}) = \\mathbb{E}[\\hat{\\theta}] - \\theta, \\qquad \\hat{\\theta} \\text{ unbiased} \\iff \\mathbb{E}[\\hat{\\theta}] = \\theta \\ \\text{ for every } \\theta",
          caption: "Bias, and unbiasedness",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Unbiased does not mean accurate",
          text: "It is a statement about the long-run average of the estimator across hypothetical repeated samples, not about the one estimate you have. An estimator that returns $\\theta + 1000$ or $\\theta - 1000$ with equal probability is perfectly unbiased and useless. You only ever get one sample, so variance matters at least as much as bias.",
        },
      ],
    },
    {
      heading: "The $n-1$ in the sample variance",
      blocks: [
        {
          kind: "formula",
          latex: "s^{2} = \\frac{1}{n-1}\\sum_{i=1}^{n}(x_i - \\bar{x})^{2}, \\qquad \\mathbb{E}[s^{2}] = \\sigma^{2}",
          caption: "Bessel's correction",
        },
        {
          kind: "prose",
          text: "Dividing by $n$ would give the MLE, which systematically underestimates $\\sigma^{2}$. The reason is that deviations are measured from $\\bar{x}$ rather than the true $\\mu$, and $\\bar{x}$ is by construction the value minimising the sum of squared deviations for *this* sample. Squared distances from the sample mean are therefore always at least as small as from the true mean.",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}\\!\\left[\\sum_{i=1}^{n}(X_i - \\bar{X})^{2}\\right] = (n-1)\\sigma^{2}",
          caption: "One degree of freedom is consumed by estimating the mean",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$s$ is still biased for $\\sigma$",
          text: "Correcting the variance does not correct the standard deviation. Since $\\sqrt{\\cdot}$ is concave, Jensen gives $\\mathbb{E}[s] = \\mathbb{E}[\\sqrt{s^{2}}] \\le \\sqrt{\\mathbb{E}[s^{2}]} = \\sigma$ — so $s$ underestimates $\\sigma$ on average. This is the general lesson: unbiasedness is not preserved under non-linear transformation, so there is no such thing as an estimator that is simultaneously unbiased for a parameter and for every function of it.",
        },
      ],
    },
    {
      heading: "The bias–variance tradeoff",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{MSE}(\\hat{\\theta}) = \\mathbb{E}\\big[(\\hat{\\theta} - \\theta)^{2}\\big] = \\operatorname{Var}(\\hat{\\theta}) + \\big[\\operatorname{Bias}(\\hat{\\theta})\\big]^{2}",
          caption: "Mean squared error decomposes into variance and squared bias",
        },
        {
          kind: "prose",
          text: "Since only the total matters for accuracy, a biased estimator with much smaller variance can beat an unbiased one. This is not a technicality — it is the justification for most of modern statistics and machine learning.",
        },
        {
          kind: "table",
          headers: ["Method", "Bias introduced", "Why it wins"],
          rows: [
            [
              "Ridge regression",
              "shrinks coefficients toward zero",
              "large variance reduction when predictors are collinear",
            ],
            [
              "Lasso",
              "shrinks and zeroes coefficients",
              "variance reduction plus variable selection",
            ],
            [
              "James–Stein",
              "shrinks toward a common mean",
              "strictly beats the sample mean in MSE for $\\ge 3$ dimensions",
            ],
            [
              "Regularised / smoothed estimates",
              "pulls toward a prior or a smoother",
              "prevents wild estimates from small samples",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Stein's paradox",
          text: "For estimating three or more independent normal means simultaneously, the obvious unbiased estimator — use each sample mean — is *inadmissible*: the James–Stein estimator has lower MSE for every true parameter value. This astonished statisticians in 1961 and settled the question of whether unbiasedness is a requirement. It is not.",
        },
      ],
    },
    {
      heading: "Where unbiasedness still matters",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**When estimates get aggregated.** Averaging many unbiased estimates converges to the truth; averaging many biased ones converges to the wrong number, and more data does not help.",
            "**In sampling design.** Survey weights exist to make estimators unbiased for the population quantity, because systematic error there is not fixable downstream.",
            "**As a baseline.** The best unbiased estimator (UMVUE) is a well-defined target, and the Cramér–Rao bound says how good any unbiased estimator can possibly be.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Consistency is usually the more important property",
          text: "An estimator is consistent if it converges to $\\theta$ as $n \\to \\infty$. Unbiased-but-inconsistent estimators exist and are nearly useless — \"use only the first observation\" is unbiased for a mean and never improves. Biased-but-consistent estimators are everywhere and are fine, since the bias vanishes with more data. If you have to choose one, choose consistency.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§7.3.1–7.3.2" },
    { source: "Wasserman, All of Statistics", locator: "§6.3, §9.4" },
    { source: "Efron & Hastie, Computer Age Statistical Inference", locator: "Ch. 7 (James–Stein)" },
    { source: "Mathlingo assessment bank", locator: "assessments/estimation-theory.md" },
  ],
};
