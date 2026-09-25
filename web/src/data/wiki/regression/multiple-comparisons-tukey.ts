import type { WikiArticle } from "../types";

export const multipleComparisonsTukeyWiki: WikiArticle = {
  conceptId: "multiple-comparisons-tukey",

  summary:
    "After a one-way ANOVA rejects equal means, the natural question is which means differ. With k groups " +
    "there are k(k − 1)/2 pairwise differences, and testing each at 5% inflates the chance of a false " +
    "discovery. Tukey's method gives exact simultaneous intervals for all pairwise differences using the " +
    "studentized range distribution; Scheffé's covers every contrast, at a price; Bonferroni sits between " +
    "them for a short, planned list.",

  sections: [
    {
      heading: "Tukey's honestly significant difference",
      blocks: [
        {
          kind: "formula",
          latex: "ȳᵢ − ȳⱼ ± \\frac{q^α_{k, n−k}}{\\sqrt{2}} \\, s \\sqrt{\\frac{1}{nᵢ} + \\frac{1}{nⱼ}}",
          caption: "q^α_{k,ν} is the upper-α point of the studentized range of k means with ν error df.",
        },
        {
          kind: "prose",
          text:
            "The studentized range is (max ȳᵢ − min ȳᵢ)/(s/√m) for k independent means of m observations each. " +
            "All pairwise intervals cover exactly when the largest standardised difference is below q^α, so " +
            "with equal group sizes the family coverage is exactly 1 − α. With unequal sizes the same formula " +
            "(Tukey–Kramer) is conservative.",
        },
      ],
    },

    {
      heading: "Scheffé for all contrasts",
      blocks: [
        {
          kind: "formula",
          latex: "Σcᵢȳᵢ ± \\sqrt{(k − 1) F^α_{k−1, n−k}} \\; s \\sqrt{Σcᵢ²/nᵢ}",
        },
        {
          kind: "prose",
          text:
            "The contrasts form a (k − 1)-dimensional space, so Scheffé's multiplier uses k − 1 numerator " +
            "degrees of freedom. The one-way F-test rejects exactly when some contrast's Scheffé interval " +
            "excludes zero — though that contrast need not be a pairwise one.",
        },
      ],
    },

    {
      heading: "Comparing multipliers",
      blocks: [
        {
          kind: "example",
          title: "Five groups, 20 error degrees of freedom",
          problem:
            "k = 5, n − k = 20. Use q^{0.05}_{5,20} ≈ 4.23, F^{0.05}_{4,20} ≈ 2.87, and t^{0.05/20}_{20} ≈ 3.15 " +
            "(Bonferroni over the 10 pairs). Compare the multipliers on s√(1/nᵢ + 1/nⱼ).",
          steps: [
            "Tukey: 4.23/√2 ≈ 2.99.",
            "Bonferroni: 3.15.",
            "Scheffé: √(4 × 2.87) = √11.48 ≈ 3.39.",
          ],
          answer: "For all pairwise differences, Tukey (2.99) < Bonferroni (3.15) < Scheffé (3.39).",
        },
        {
          kind: "table",
          headers: ["Family of interest", "Best choice"],
          rows: [
            ["All pairwise differences", "Tukey"],
            ["A few pre-planned comparisons", "Bonferroni (or unadjusted if only one)"],
            ["Every treatment against one control", "Dunnett"],
            ["Any contrast, including ones suggested by the data", "Scheffé"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A significant F does not guarantee a significant pair",
          text:
            "The F-test is dual to Scheffé's family of all contrasts. It can reject because of a contrast " +
            "like (μ₁ + μ₂)/2 − (μ₃ + μ₄)/2 while no single pairwise Tukey interval excludes zero.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.2.2, One-Way Classification: Confidence Intervals" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§5.1, Simultaneous Interval Estimation" },
  ],
};
