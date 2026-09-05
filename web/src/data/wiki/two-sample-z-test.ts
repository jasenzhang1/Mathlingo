import type { WikiArticle } from "./types";

export const twoSampleZTestWiki: WikiArticle = {
  conceptId: "two-sample-z-test",
  summary:
    "The two-sample z-test compares two population means when both variances are known. Its lasting " +
    "value is the variance rule it makes concrete: for independent samples the variance of a " +
    "difference is the sum of the variances, so standard errors combine in quadrature rather than " +
    "additively. Every two-group comparison in the domain inherits that step.",

  sections: [
    {
      heading: "The test",
      blocks: [
        {
          kind: "formula",
          latex: "Z = (X̄₁ − X̄₂ − δ₀) / √(σ₁²/n₁ + σ₂²/n₂)   ~  N(0, 1) under H₀",
          caption: "δ₀ is the hypothesised difference, usually 0",
        },
        {
          kind: "prose",
          text:
            "The key line is Var(X̄₁ − X̄₂) = Var(X̄₁) + Var(X̄₂), which holds because the samples are " +
            "independent so the covariance term vanishes. Note the plus sign: subtracting the means " +
            "*adds* their variances. Uncertainty about two quantities cannot cancel just because you " +
            "took their difference.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Standard errors add in quadrature",
          text:
            "If both arms have SE = 0.003, the SE of the difference is √(0.003² + 0.003²) ≈ 0.0042, " +
            "not 0.006. That factor of √2 rather than 2 is why comparing two arms costs less precision " +
            "than people expect — and why non-overlapping intervals are a stricter criterion than " +
            "significance.",
        },
      ],
    },

    {
      heading: "Sample sizes and allocation",
      blocks: [
        {
          kind: "prose",
          text:
            "With σ₁ = σ₂ = σ and total budget N = n₁ + n₂ fixed, the SE of the difference is " +
            "minimised by an equal split. The optimum is flat near the middle — a 60/40 split loses " +
            "only about 2% of precision — but degrades sharply at the extremes, so a 90/10 split is a " +
            "real cost. When the variances differ, the optimal allocation is proportional to σ: put " +
            "more units where the noise is.",
        },
        {
          kind: "example",
          title: "Comparing two production lines",
          problem:
            "Two lines have known σ₁ = σ₂ = 5 g. Samples of n₁ = 50 and n₂ = 50 give X̄₁ = 248 g and " +
            "X̄₂ = 251 g. Test for a difference at α = 0.05.",
          steps: [
            "SE = √(25/50 + 25/50) = √1 = 1.",
            "Z = (248 − 251)/1 = −3.0.",
            "|−3.0| > 1.96, so reject; two-sided p ≈ 0.0027.",
          ],
          answer:
            "The lines differ. The 95% interval for μ₁ − μ₂ is −3 ± 1.96 = [−4.96, −1.04] — line 1 " +
            "runs between about 1 and 5 grams lighter.",
        },
      ],
    },

    {
      heading: "When it applies",
      blocks: [
        {
          kind: "prose",
          text:
            "Known variances are rare, so in practice this test is usually replaced by the two-sample " +
            "t-test. It remains directly useful for proportions, where the null hypothesis determines " +
            "the variance, and it is the form most A/B tests actually use: with a pooled p̂ under " +
            "H₀: p₁ = p₂, the statistic is exactly this z with σ² = p̂(1 − p̂).",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Independence between the samples is required",
          text:
            "If the same subjects appear in both groups, the covariance term does not vanish and this " +
            "SE is wrong — usually too large, because the correlation is positive. That case is the " +
            "paired test, and treating it as unpaired discards most of the available power.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Ch. 8, Hypothesis Testing" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Mathlingo assessment bank", locator: "assessments/named-tests-and-resampling.md" },
  ],
};
