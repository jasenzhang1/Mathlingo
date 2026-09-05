import type { WikiArticle } from "./types";

export const testStatisticWiki: WikiArticle = {
  conceptId: "test-statistic",
  summary:
    "A test statistic compresses a whole sample into one number whose distribution is known when the " +
    "null hypothesis is true. That known null distribution is the entire point: without it there is " +
    "no scale against which “large” means anything. Most test statistics share one shape — a distance " +
    "between what was observed and what the null predicted, divided by the standard error of that " +
    "distance.",

  sections: [
    {
      heading: "The common form",
      blocks: [
        {
          kind: "formula",
          latex: "T = (estimate − null value) / SE(estimate)",
          caption: "The standardised-distance template behind z, t, and most others",
        },
        {
          kind: "prose",
          text:
            "Read it as a question: how many standard errors away from the null's prediction did we " +
            "land? Dividing by the SE is what makes the answer unit-free and comparable across " +
            "problems — a difference of 3 kg and a difference of 3 seconds become the same number of " +
            "standard errors, and the same tail probability.",
        },
        {
          kind: "table",
          headers: ["Test", "Statistic", "Null distribution"],
          rows: [
            ["One-sample z", "(X̄ − μ₀)/(σ/√n)", "N(0, 1)"],
            ["One-sample t", "(X̄ − μ₀)/(s/√n)", "t with n − 1 df"],
            ["Two-sample t", "(X̄₁ − X̄₂)/SE", "t, Welch df"],
            ["Chi-square", "Σ (O − E)²/E", "χ² with df from the table shape"],
            ["F / ANOVA", "ratio of mean squares", "F with two df parameters"],
          ],
        },
      ],
    },

    {
      heading: "Why the null distribution must be known",
      blocks: [
        {
          kind: "prose",
          text:
            "A raw difference of 2.4 is uninterpretable on its own — it could be overwhelming evidence " +
            "or pure noise depending on how variable the estimate is. The test statistic is " +
            "constructed so that, if H₀ holds, its distribution is one specific known curve. Only then " +
            "can an observed value be converted into a probability, which is what a p-value and a " +
            "rejection region both require.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is why the t-distribution exists at all",
          text:
            "Replacing σ with the random s changes the statistic's null distribution: it is no longer " +
            "N(0,1) but t with n − 1 degrees of freedom, because the denominator now carries its own " +
            "uncertainty. Gosset's contribution was working out that the distribution changes, not " +
            "inventing a new formula.",
        },
        {
          kind: "prose",
          text:
            "The requirement also explains why assumptions matter. If the data are not independent, " +
            "or the variance is not what the formula assumes, the statistic still computes — but its " +
            "null distribution is not the one in the table, so the resulting p-value is answering a " +
            "different question than the one asked.",
        },
      ],
    },

    {
      heading: "Worked example: same data, two statistics",
      blocks: [
        {
          kind: "example",
          title: "Known versus estimated σ",
          problem:
            "n = 16, X̄ = 52, μ₀ = 50. Compute the test statistic when σ = 8 is known, and when " +
            "instead s = 8 was estimated from the sample.",
          steps: [
            "SE is 8/√16 = 2 in both cases, so the arithmetic is identical: (52 − 50)/2 = 1.0.",
            "Known σ: compare 1.0 against N(0,1). Two-sided p ≈ 0.317.",
            "Estimated s: compare 1.0 against t with 15 df. Two-sided p ≈ 0.333.",
          ],
          answer:
            "The statistic is 1.0 either way; only the reference distribution differs, and the t gives " +
            "the larger p-value because its tails are heavier. At n = 16 the gap is small; at n = 5 it " +
            "is substantial.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The statistic alone is not a conclusion",
          text:
            "Reporting “t = 2.1” without its degrees of freedom is incomplete, because the same value " +
            "maps to different tail probabilities under different df. Always carry the null " +
            "distribution alongside the number.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Ch. 8, Hypothesis Testing" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Mathlingo assessment bank", locator: "assessments/hypothesis-testing-machinery.md" },
  ],
};
