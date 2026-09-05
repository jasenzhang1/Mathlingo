import type { WikiArticle } from "./types";

export const sampleMeanWiki: WikiArticle = {
  conceptId: "sample-mean",
  summary:
    "The sample mean X̄ = (1/n)ΣXᵢ estimates the population mean μ. It is the most-used statistic in " +
    "the subject, and it earns that place for reasons worth knowing precisely: it is unbiased, its " +
    "variance falls like σ²/n, it is the least-squares fit to the data, and under normality it is the " +
    "maximum-likelihood estimator. Its one real weakness — total lack of robustness — follows from " +
    "the same algebra that gives it those strengths.",

  sections: [
    {
      heading: "Definition and its two moments",
      blocks: [
        { kind: "formula", latex: "X̄ = (1/n) Σᵢ₌₁ⁿ Xᵢ", caption: "The sample mean" },
        {
          kind: "prose",
          text:
            "For an i.i.d. sample with E[Xᵢ] = μ and Var(Xᵢ) = σ², two results follow immediately and " +
            "carry most of the weight of what comes later.",
        },
        {
          kind: "formula",
          latex: "E[X̄] = μ        Var(X̄) = σ²/n",
          caption: "Unbiased, with variance shrinking in n",
        },
        {
          kind: "prose",
          text:
            "The first uses only linearity of expectation, so it needs no independence. The second " +
            "does need it: Var(ΣXᵢ) = Σ Var(Xᵢ) only when the covariances vanish. Dividing by n² " +
            "leaves σ²/n. That single expression is why more data helps, and exactly how much.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The √n tax",
          text:
            "The standard deviation of X̄ is σ/√n, not σ/n. Halving the uncertainty costs four times " +
            "the data; cutting it to a tenth costs a hundred times. This is the fundamental economics " +
            "of sample size, and it does not negotiate.",
        },
      ],
    },

    {
      heading: "Three other characterisations",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Least squares: X̄ is the unique c minimising Σ(Xᵢ − c)². Differentiating gives " +
              "−2Σ(Xᵢ − c) = 0, so c = X̄. This is why the residuals from the mean always sum to zero.",
            "Maximum likelihood: for a normal sample with either σ known or unknown, the MLE of μ is X̄.",
            "Centre of mass: X̄ is the balance point of the data placed as equal masses on a line.",
          ],
        },
        {
          kind: "prose",
          text:
            "The least-squares characterisation is the one that keeps reappearing. It is the reason " +
            "the sample variance divides by n − 1, the reason regression's normal equations look the " +
            "way they do, and the reason a squared-error loss in machine learning is estimating a " +
            "conditional mean rather than anything else.",
        },
      ],
    },

    {
      heading: "The cost of that algebra: no robustness",
      blocks: [
        {
          kind: "prose",
          text:
            "Because every observation enters linearly with weight 1/n, a single arbitrarily large " +
            "value drags X̄ arbitrarily far. The breakdown point of the mean is 0 — one bad " +
            "observation out of any n suffices. The median's breakdown point is 50%.",
        },
        {
          kind: "example",
          title: "One outlier, two summaries",
          problem: "Incomes (in thousands): 40, 45, 48, 52, 55. Then a sixth person earns 5,000.",
          steps: [
            "Original: X̄ = 48, median = 50.",
            "With the sixth value: X̄ = (240 + 5000)/6 = 873.3.",
            "Median moves from 50 to 51.5.",
          ],
          answer:
            "The mean rises to a value larger than five of the six observations. It remains the correct " +
            "answer to “what is the average,” and the wrong answer to “what does a typical person earn.”",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Choose by the question, not by the skew",
          text:
            "Use the mean when totals matter — total payroll is n·X̄, and no median gives you that. " +
            "Use the median when a typical case matters. Skewness is a hint, not the criterion.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§5.2, Sums of Random Variables from a Random Sample" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 6, Models, Statistical Inference and Learning" },
    { source: "Mathlingo assessment bank", locator: "assessments/statistics-foundations.md" },
  ],
};
