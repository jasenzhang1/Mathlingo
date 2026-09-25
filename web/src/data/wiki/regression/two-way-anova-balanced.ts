import type { WikiArticle } from "../types";

export const twoWayAnovaBalancedWiki: WikiArticle = {
  conceptId: "two-way-anova-balanced",

  summary:
    "Two factors, A with a levels and B with b levels, every combination observed the same number of times " +
    "m. The model splits each cell mean into an overall level, a row effect, a column effect, and an " +
    "interaction — the part that is not additive. Balance makes the design's columns orthogonal, so the " +
    "sums of squares for A, B, and AB are independent and do not depend on the order in which they are " +
    "fitted.",

  sections: [
    {
      heading: "The model and interaction",
      blocks: [
        {
          kind: "formula",
          latex: "y_{ijk} = μ + αᵢ + βⱼ + γ_{ij} + ε_{ijk},   k = 1, …, m",
        },
        {
          kind: "prose",
          text:
            "The interaction γᵢⱼ is whatever of the cell mean μᵢⱼ is not explained additively. No interaction " +
            "means that the difference between any two levels of A is the same at every level of B: the " +
            "profiles in an interaction plot are parallel. Interaction is defined through contrasts such as " +
            "μ₁₁ − μ₁₂ − μ₂₁ + μ₂₂, which are estimable even though the individual γᵢⱼ are not.",
        },
      ],
    },

    {
      heading: "The balanced ANOVA table",
      blocks: [
        {
          kind: "table",
          headers: ["Source", "Sum of squares", "df"],
          rows: [
            ["A", "bm Σᵢ(ȳᵢ.. − ȳ...)²", "a − 1"],
            ["B", "am Σⱼ(ȳ.ⱼ. − ȳ...)²", "b − 1"],
            ["AB", "m ΣᵢΣⱼ(ȳᵢⱼ. − ȳᵢ.. − ȳ.ⱼ. + ȳ...)²", "(a − 1)(b − 1)"],
            ["Error", "ΣᵢΣⱼΣₖ(yᵢⱼₖ − ȳᵢⱼ.)²", "ab(m − 1)"],
            ["Total", "ΣΣΣ(yᵢⱼₖ − ȳ...)²", "abm − 1"],
          ],
        },
        {
          kind: "prose",
          text:
            "Each effect is tested with F = (its mean square)/(error mean square). Because the effect spaces " +
            "are mutually orthogonal under balance, the four sums of squares add exactly to the total and " +
            "each is the same whether computed first, last, or adjusted for the others.",
        },
        {
          kind: "example",
          title: "Degrees of freedom",
          problem: "A 3 × 4 factorial with m = 2 replicates per cell. Give the df for A, B, AB, and error.",
          steps: [
            "A: 3 − 1 = 2; B: 4 − 1 = 3; AB: 2 × 3 = 6.",
            "Error: ab(m − 1) = 12 × 1 = 12. Total: 24 − 1 = 23 = 2 + 3 + 6 + 12.",
          ],
          answer: "2, 3, 6, and 12.",
        },
      ],
    },

    {
      heading: "Reading the results",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Main effects are averages when there is interaction",
          text:
            "The A main effect compares row means averaged over the levels of B. If the interaction is large, " +
            "that average may describe no actual level of B — A could help at one level and hurt at another. " +
            "Test and interpret the interaction first; if it is important, report simple effects (A within " +
            "each level of B) instead.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Replication is what makes interaction testable",
          text:
            "The error sum of squares comes from variation within cells. With m = 1 there is none, the AB " +
            "sum of squares is all that remains, and interaction cannot be tested against pure error — the " +
            "situation Tukey's one-degree-of-freedom test was invented for.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.4, Two-Way Classification (Balanced)" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.6.1, Definition of Interactions" },
  ],
};
