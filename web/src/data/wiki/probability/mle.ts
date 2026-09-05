import type { WikiArticle } from "../types";

export const mle: WikiArticle = {
  conceptId: "mle",
  summary:
    "Maximum likelihood estimation picks the parameter value under which the data you actually observed would have been most probable. It is the default estimation method across statistics and machine learning — least squares and logistic regression are both special cases — because its large-sample behaviour is excellent and its recipe is mechanical.",
  sections: [
    {
      heading: "The likelihood function",
      blocks: [
        {
          kind: "formula",
          latex: "L(\\theta) = \\prod_{i=1}^{n} f(x_i \\mid \\theta), \\qquad \\ell(\\theta) = \\log L(\\theta) = \\sum_{i=1}^{n} \\log f(x_i \\mid \\theta)",
          caption: "Likelihood and log-likelihood, for independent observations",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Likelihood is not a probability of $\\theta$",
          text: "$L(\\theta)$ is the density of the *data*, read as a function of the parameter with the data held fixed. It does not integrate to 1 over $\\theta$ and is not a distribution over parameters. Saying \"the likelihood that $\\theta = 0.6$\" is a category error — that would be a posterior, which requires a prior and Bayes' rule.",
        },
        {
          kind: "prose",
          text: "Maximising the log rather than the product is not a mathematical necessity but is universal practice: logs turn products into sums, which differentiate cleanly, and they prevent the numerical underflow that multiplying thousands of small densities would otherwise cause. Since $\\log$ is strictly increasing, the maximiser is unchanged.",
        },
      ],
    },
    {
      heading: "The recipe",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Write the likelihood $L(\\theta) = \\prod_i f(x_i \\mid \\theta)$.",
            "Take logs to get $\\ell(\\theta)$.",
            "Differentiate and set to zero: $\\ell'(\\theta) = 0$. This is the *score equation*.",
            "Solve for $\\theta$.",
            "Check it is a maximum — $\\ell''(\\hat{\\theta}) < 0$ — and check the boundary of the parameter space.",
          ],
        },
        {
          kind: "example",
          title: "MLE for a Bernoulli proportion",
          problem:
            "$n$ independent Bernoulli$(p)$ trials produce $k$ successes. Find $\\hat{p}_{\\text{MLE}}$.",
          steps: [
            "$L(p) = p^{k}(1-p)^{n-k}$.",
            "$\\ell(p) = k\\log p + (n-k)\\log(1-p)$.",
            "$\\ell'(p) = \\dfrac{k}{p} - \\dfrac{n-k}{1-p} = 0$.",
            "Cross-multiplying: $k(1-p) = (n-k)p \\Rightarrow k = np$.",
            "$\\ell''(p) = -k/p^{2} - (n-k)/(1-p)^{2} < 0$, so it is a maximum. ✓",
          ],
          answer: "$\\hat{p} = k/n$ — the sample proportion, as intuition demands.",
        },
      ],
    },
    {
      heading: "Why it is the default",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "What it says"],
          rows: [
            [
              "Consistency",
              "$\\hat{\\theta}_n \\to \\theta_0$ as $n \\to \\infty$ — with enough data you converge on the truth.",
            ],
            [
              "Asymptotic normality",
              "$\\sqrt{n}(\\hat{\\theta}_n - \\theta_0) \\to \\mathcal{N}\\!\\big(0,\\ I(\\theta_0)^{-1}\\big)$, which is where standard errors come from.",
            ],
            [
              "Asymptotic efficiency",
              "It attains the Cramér–Rao lower bound — no consistent estimator has smaller asymptotic variance.",
            ],
            [
              "Invariance",
              "If $\\hat{\\theta}$ is the MLE of $\\theta$, then $g(\\hat{\\theta})$ is the MLE of $g(\\theta)$, for any $g$.",
            ],
          ],
        },
        {
          kind: "prose",
          text: "Invariance is the property that saves the most work in practice. Having found $\\hat{p}$, the MLE of the odds $p/(1-p)$ is just $\\hat{p}/(1-\\hat{p})$ — no re-derivation. Note this holds for the *estimator*, not for its expectation: unbiasedness is emphatically not invariant under transformation.",
        },
      ],
    },
    {
      heading: "Where it goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "MLE is often biased",
          text: "The classic case is the normal variance: $\\hat{\\sigma}^{2}_{\\text{MLE}} = \\frac{1}{n}\\sum (x_i - \\bar{x})^{2}$, which systematically underestimates $\\sigma^{2}$ because it measures spread around the *estimated* mean rather than the true one. The unbiased version divides by $n-1$. The bias vanishes as $n$ grows, which is why the properties above are all asymptotic.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**The maximum can sit on a boundary**, where the derivative is not zero. For Uniform$(0,\\theta)$ the likelihood increases up to $\\theta = \\max(x_i)$ and drops to zero after — calculus finds nothing, and the answer is the sample maximum.",
            "**Small samples can give degenerate answers.** Observing zero successes in ten trials gives $\\hat{p} = 0$, asserting the event is impossible. Regularisation or a prior fixes this; likelihood alone does not.",
            "**Model misspecification.** All the good properties assume the model is correct. Under a wrong model, MLE converges to the parameter minimising KL divergence from the truth — a well-defined answer to the wrong question.",
            "**Multiple local maxima.** For mixtures and neural networks the likelihood is not concave, so numerical optimisation finds a local maximum whose identity depends on initialisation.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§7.2.2, §10.1" },
    { source: "Wasserman, All of Statistics", locator: "§9.3–9.6" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 8.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/mgf-likelihood-and-estimation.md" },
  ],
};
