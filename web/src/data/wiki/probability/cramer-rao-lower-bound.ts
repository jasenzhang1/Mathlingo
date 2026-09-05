import type { WikiArticle } from "../types";

export const cramerRaoLowerBound: WikiArticle = {
  conceptId: "cramer-rao-lower-bound",
  summary:
    "The Cramér–Rao bound says no unbiased estimator can have variance below the reciprocal of the Fisher information. It converts \"is my estimator any good?\" from a comparison against other estimators into a comparison against a hard floor — and tells you when to stop looking for something better.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{Var}(\\hat{\\theta}) \\ \\ge \\ \\frac{1}{I_n(\\theta)} = \\frac{1}{n\\,I_1(\\theta)}",
          caption: "For any unbiased estimator $\\hat{\\theta}$ of $\\theta$, under regularity conditions",
        },
        {
          kind: "prose",
          text: "An unbiased estimator attaining the bound is called *efficient*. For a biased estimator or for a function of $\\theta$, the general form applies:",
        },
        {
          kind: "formula",
          latex: "\\operatorname{Var}\\big(\\hat{g}\\big) \\ \\ge \\ \\frac{\\big[g'(\\theta)\\big]^{2}}{I_n(\\theta)}",
          caption: "The bound for estimating $g(\\theta)$",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where the bound comes from",
          text: "It is the Cauchy–Schwarz inequality applied to the estimator and the score. The correlation between any unbiased estimator and the score is constrained, and unpacking that constraint gives the bound directly. This also identifies when equality holds: precisely when the estimator is a linear function of the score — which is exactly the exponential-family case.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Is the sample proportion efficient?",
          problem:
            "For $n$ Bernoulli$(p)$ trials, compare $\\operatorname{Var}(\\hat{p})$ for $\\hat{p} = \\bar{X}$ against the Cramér–Rao bound.",
          steps: [
            "Fisher information per observation: $I_1(p) = 1/[p(1-p)]$.",
            "So the bound is $1/(nI_1) = p(1-p)/n$.",
            "The sample proportion has $\\operatorname{Var}(\\bar{X}) = \\operatorname{Var}(X)/n = p(1-p)/n$.",
            "The two are equal.",
          ],
          answer:
            "$\\hat{p} = \\bar{X}$ attains the bound exactly — it is efficient, and no unbiased estimator of $p$ can do better at any sample size.",
        },
        {
          kind: "prose",
          text: "That is a strong conclusion and a useful one: it ends the search. Any effort spent looking for a lower-variance unbiased estimator of a Bernoulli proportion is wasted, because the bound proves none exists.",
        },
      ],
    },
    {
      heading: "What the bound does not say",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "It only constrains unbiased estimators",
          text: "Biased estimators routinely have variance below the bound — and can have lower *mean squared error* too. Ridge regression, lasso, and James–Stein all live below the Cramér–Rao floor, which is not a contradiction because they are not unbiased. The bound restricts one class of estimators, not the achievable accuracy.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Regularity conditions can fail, and then the bound fails",
          text: "The derivation needs the support of the distribution to be free of $\\theta$, so that differentiation can pass under the integral. Uniform$(0,\\theta)$ violates this: its MLE $\\max X_i$ has variance of order $1/n^{2}$, far below the $1/n$ scale the bound would imply. This is not a counterexample to the theorem — it is outside its hypotheses. Whenever an estimator appears to beat the bound, check the support before checking the arithmetic.",
        },
        {
          kind: "prose",
          text: "The bound is also not always attainable even when the conditions hold. It is achieved exactly when the model is an exponential family and the parameter is estimated in its natural form. Otherwise there may be a genuine gap between the bound and the best possible unbiased variance, in which case the bound is a valid floor that nothing reaches.",
        },
      ],
    },
    {
      heading: "How it is used",
      blocks: [
        {
          kind: "table",
          headers: ["Use", "How"],
          rows: [
            [
              "Certifying an estimator",
              "If $\\operatorname{Var}(\\hat{\\theta})$ equals the bound, stop — it is optimal among unbiased estimators.",
            ],
            [
              "Defining efficiency",
              "Relative efficiency is the ratio of the bound to the actual variance; $0.8$ means 20% of the information is being wasted.",
            ],
            [
              "Sample size planning",
              "Invert the bound to find the $n$ needed for a target standard error, before collecting data.",
            ],
            [
              "Justifying MLE",
              "The MLE attains the bound asymptotically, which is the precise sense in which it is the default method.",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The asymptotic caveat on MLE",
          text: "\"MLE is efficient\" is an asymptotic statement. In finite samples the MLE can be biased and can have variance above the bound — the normal variance MLE is the standard example. Efficiency is what happens as $n \\to \\infty$, and how large $n$ must be before that description is useful depends entirely on the model.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§7.3.2, Thm 7.3.9" },
    { source: "Wasserman, All of Statistics", locator: "§9.8" },
    { source: "Lehmann & Casella, Theory of Point Estimation", locator: "Ch. 2.6–2.7" },
    { source: "Mathlingo assessment bank", locator: "assessments/estimation-theory.md" },
  ],
};
