import type { WikiArticle } from "../types";

export const countRegressionOverdispersionWiki: WikiArticle = {
  conceptId: "count-regression-overdispersion",

  summary:
    "Poisson regression forces the variance of a count to equal its mean. Real counts, such as gym visits or traffic accidents, " +
    "are usually more variable than that, and often have more zeros. Two standard fixes keep the log-linear mean " +
    "$\\mathbb{E}(y \\mid \\mathbf{x}) = e^{\\mathbf{x}^{\\top}\\boldsymbol{\\beta}}$ but change the distribution: the Negative-Binomial, a Poisson " +
    "whose rate is itself Gamma-distributed, and zero-inflated models, which mix a point mass at zero with a count distribution.",

  sections: [
    {
      heading: "Three distributions for counts",
      blocks: [
        {
          kind: "table",
          headers: ["Distribution", "Construction", "Mean", "Variance"],
          rows: [
            ["$\\text{Poisson}(\\lambda)$", "Sum of many rare independent events (Le Cam)", "$\\lambda$", "$\\lambda$"],
            ["$\\text{NB}(\\mu, \\theta)$", "$y \\mid \\lambda \\sim \\text{Poisson}(\\lambda)$, $\\lambda \\sim \\text{Gamma}(\\theta, \\theta/\\mu)$", "$\\mu$", "$\\mu + \\mu^2/\\theta$"],
            ["Zero-inflated Poisson", "$0$ with probability $p$, else $\\text{Poisson}(\\lambda)$", "$(1 - p)\\lambda$", "$(1 - p)\\lambda(1 + p\\lambda)$"],
            ["Zero-inflated NB", "$0$ with probability $p$, else $\\text{NB}(\\mu, \\theta)$", "$(1 - p)\\mu$", "$(1 - p)\\mu(1 + \\mu/\\theta + p\\mu)$"],
          ],
        },
        {
          kind: "prose",
          text:
            "The Negative-Binomial’s extra variance is exactly the variance of the random rate: by the law of total variance, $\\text{Var}(y) = \\mathbb{E}(\\lambda) + \\text{Var}(\\lambda) = \\mu + \\mu^2/\\theta$. " +
            "As $\\theta \\to \\infty$ the rate stops varying and the NB becomes Poisson. Its zero probability, $\\{\\theta/(\\mu + \\theta)\\}^{\\theta}$, is larger than the Poisson’s $e^{-\\mu}$, and its tails are much heavier.",
        },
        {
          kind: "example",
          title: "How many zeros does each model expect?",
          problem: "Counts have mean $2$. Compare $\\Pr(y = 0)$ under $\\text{Poisson}(2)$, under $\\text{NB}(\\mu = 2, \\theta = 1)$, and under a zero-inflated Poisson with $p = 0.2$ and $\\lambda = 2.5$ (also mean $2$).",
          steps: [
            "Poisson: $e^{-2} \\approx 0.1353$.",
            "NB: $\\{1/(2 + 1)\\}^1 = 0.3333$.",
            "ZIP: $0.2 + 0.8e^{-2.5} \\approx 0.2 + 0.8 \\times 0.0821 = 0.2657$.",
          ],
          answer: "Both overdispersed models put far more mass at zero than the Poisson, so a high share of zeros alone does not show that zero inflation is needed.",
        },
      ],
    },
    {
      heading: "The regressions",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Negative-Binomial regression",
              description: "$y_i \\mid \\mathbf{x}_i \\sim \\text{NB}(e^{\\mathbf{x}_i^{\\top}\\boldsymbol{\\beta}}, \\theta)$. The score for $\\boldsymbol{\\beta}$ is $\\sum_i (1 + \\mu_i/\\theta)^{-1}(y_i - \\mu_i)\\mathbf{x}_i$, a Poisson score that down-weights large-mean units. The Fisher information is block diagonal in $(\\boldsymbol{\\beta}, \\theta)$, so the two are asymptotically independent; R’s `glm.nb` alternates between them.",
            },
            {
              term: "Zero-inflated regressions",
              description: "$p_i = \\text{expit}(\\mathbf{x}_i^{\\top}\\boldsymbol{\\gamma})$ for being a structural zero and $\\lambda_i = e^{\\mathbf{x}_i^{\\top}\\boldsymbol{\\beta}}$ for the count part. A covariate can act through both, so its effect on $\\mathbb{E}(y_i \\mid \\mathbf{x}_i) = (1 - p_i)\\lambda_i$ is not a single coefficient.",
            },
            {
              term: "Exposure",
              description: "When units are observed for different lengths of time, $\\log(\\text{exposure}_i)$ enters as an offset with coefficient $1$, and $\\boldsymbol{\\beta}$ describes rates per unit of exposure.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The mean is what makes the estimate consistent",
          text:
            "If $\\mathbb{E}(y \\mid \\mathbf{x}) = e^{\\mathbf{x}^{\\top}\\boldsymbol{\\beta}}$ is right, the Poisson MLE is consistent even for overdispersed data; only its model-based standard errors are wrong. NB regression or sandwich standard errors fix the inference, and NB adds efficiency and full distributional predictions such as $\\Pr(y = 0 \\mid \\mathbf{x})$.",
        },
      ],
    },
    {
      heading: "Choosing a model",
      blocks: [
        {
          kind: "list",
          items: [
            "Start by comparing the sample variance with the mean, and the observed zeros with the zeros each fitted model predicts.",
            "Prefer zero inflation when a never-at-risk group is plausible (people who never go to the gym, diplomats who never drive), and check it with AIC/BIC or a Vuong-type test against plain NB.",
            "Underdispersed counts (variance below the mean) need neither NB nor zero inflation; use quasi-Poisson or a COM-Poisson model.",
            "In a randomised experiment, OLS on the raw count with EHW standard errors estimates the difference in means with no distributional assumption; in Ding’s gym case study the linear, Poisson and NB fits agree in sign and rough size.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Don’t just log the counts",
          text:
            "OLS of $\\log(y + 1)$ avoids negative predictions but models an arbitrary transformed mean, and it cannot predict probabilities such as $\\Pr(y \\ge 3 \\mid \\mathbf{x})$, which count regressions give directly.",
        },
      ],
    },
  ],

  references: [
    { source: "Peng Ding, Linear Model and Extensions", locator: "Ch. 22, Regression Models for Count Outcomes (§22.1–22.3)" },
    { source: "Peng Ding, Linear Model and Extensions", locator: "Ch. 24, §24.3.3 Poisson regression" },
  ],
};
