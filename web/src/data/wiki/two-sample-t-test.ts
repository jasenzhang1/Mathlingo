import type { WikiArticle } from "./types";

export const twoSampleTTestWiki: WikiArticle = {
  conceptId: "two-sample-t-test",
  summary:
    "The two-sample t-test compares two independent group means with variances estimated from the " +
    "data. It comes in two versions — pooled (Student's), which assumes equal variances, and Welch's, " +
    "which does not. Welch's should be the default: it costs almost nothing when the variances are " +
    "in fact equal and is markedly more reliable when they are not.",

  sections: [
    {
      heading: "Two versions",
      blocks: [
        {
          kind: "formula",
          latex: "T = (X̄₁ − X̄₂) / SE,   with SE depending on the version",
        },
        {
          kind: "table",
          headers: ["", "Pooled (Student's)", "Welch's"],
          rows: [
            ["Assumes σ₁ = σ₂", "Yes", "No"],
            ["SE", "s_p·√(1/n₁ + 1/n₂)", "√(s₁²/n₁ + s₂²/n₂)"],
            ["Degrees of freedom", "n₁ + n₂ − 2", "Welch–Satterthwaite (fractional)"],
            ["When variances differ", "Error rate can be badly off", "Holds up well"],
          ],
        },
        {
          kind: "prose",
          text:
            "The pooled variance s_p² = ((n₁ − 1)s₁² + (n₂ − 1)s₂²)/(n₁ + n₂ − 2) is a weighted " +
            "average of the two sample variances, weighted by degrees of freedom. It is the right " +
            "estimate only if there is a single common σ to estimate.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why Welch's is the safe default",
          text:
            "When variances are equal, Welch's is very slightly less powerful than pooled — a " +
            "negligible cost. When they are unequal and group sizes differ, pooled can have a true " +
            "Type I error rate far from α: too high when the smaller group has the larger variance, " +
            "too low when it has the smaller. Welch's avoids the whole problem, so most statistical " +
            "software now defaults to it.",
        },
      ],
    },

    {
      heading: "Do not pre-test for equal variances",
      blocks: [
        {
          kind: "prose",
          text:
            "A common workflow runs an F-test or Levene's test for equal variances, then picks pooled " +
            "or Welch based on the result. This is worse than simply always using Welch. The " +
            "pre-test is itself a hypothesis test with its own error rate, its outcome is correlated " +
            "with the data being analysed, and conditioning the choice of test on it distorts the " +
            "final error rate in ways that are hard to characterise. Since Welch's costs almost " +
            "nothing when variances are equal, there is no gain to offset the distortion.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Independence is still assumed",
          text:
            "Both versions assume the two samples are independent. Measurements on the same subjects " +
            "before and after require the paired test — treating them as independent inflates the " +
            "standard error by ignoring the positive correlation, and throws away most of the power.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Unequal variances, unequal sizes",
          problem:
            "Group 1: n₁ = 10, X̄₁ = 20, s₁ = 2. Group 2: n₂ = 30, X̄₂ = 22, s₂ = 6. Compare with Welch's.",
          steps: [
            "s₁²/n₁ = 4/10 = 0.4;  s₂²/n₂ = 36/30 = 1.2.",
            "SE = √(0.4 + 1.2) = √1.6 = 1.265.",
            "T = (20 − 22)/1.265 = −1.58.",
            "Welch df ≈ (1.6)²/[(0.4²/9) + (1.2²/29)] = 2.56/(0.01778 + 0.04966) ≈ 38.0.",
            "Critical value t_{38, 0.025} ≈ 2.024; |−1.58| < 2.024, so fail to reject (p ≈ 0.12).",
          ],
          answer:
            "No significant difference. Note the configuration — the smaller group has the smaller " +
            "variance — is exactly the one where the pooled test would have been anti-conservative, " +
            "returning a smaller p-value than it should.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.2, Comparing Two Treatments" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Mathlingo assessment bank", locator: "assessments/named-tests-and-resampling.md" },
  ],
};
