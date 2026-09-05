import type { WikiArticle } from "./types";

export const wilcoxonSignedRankTestWiki: WikiArticle = {
  conceptId: "wilcoxon-signed-rank-test",
  summary:
    "The signed-rank test is to the paired t-test what the rank-sum test is to the two-sample t: it " +
    "keeps the pairing but replaces the values with ranks. Crucially it ranks the *magnitudes* of " +
    "the within-pair differences and then reattaches their signs, which is what lets it use more " +
    "information than a plain count of which direction each pair moved.",

  sections: [
    {
      heading: "The procedure",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Form the within-pair differences dᵢ, and discard any that are exactly zero.",
            "Rank the absolute values |dᵢ| from smallest to largest, averaging ranks across ties.",
            "Reattach the original signs to those ranks.",
            "Sum the positive ranks — that is W⁺, the test statistic.",
          ],
        },
        {
          kind: "formula",
          latex: "E[W⁺] = n(n + 1)/4,    Var(W⁺) = n(n + 1)(2n + 1)/24",
          caption: "Null moments after dropping zero differences; n is the number remaining",
        },
        {
          kind: "prose",
          text:
            "Under the null of a symmetric distribution centred at zero, each difference is equally " +
            "likely to be positive or negative regardless of its magnitude. So every assignment of " +
            "signs to the ranks is equally likely, and the null distribution follows from counting — " +
            "no distributional assumption enters.",
        },
      ],
    },

    {
      heading: "Where it sits between two other tests",
      blocks: [
        {
          kind: "table",
          headers: ["Test", "Uses", "Assumes"],
          rows: [
            ["Paired t", "The actual differences", "Differences approximately normal"],
            ["Signed-rank", "Ranks of |d|, plus signs", "Differences symmetric about the null value"],
            ["Sign test", "Only the signs", "Nothing beyond independence"],
          ],
        },
        {
          kind: "prose",
          text:
            "The three form a ladder of decreasing assumptions and decreasing power. The sign test " +
            "throws away magnitude entirely and merely counts how many pairs improved; it survives " +
            "anything but is weak. The signed-rank test recovers much of that lost power by using " +
            "the *order* of the magnitudes, at the cost of assuming symmetry.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Symmetry is a real assumption, and it is often forgotten",
          text:
            "The signed-rank test is frequently described as assumption-free. It is not: ranking " +
            "magnitudes and treating positive and negative ranks interchangeably requires the " +
            "differences to be symmetrically distributed. For strongly skewed differences the sign " +
            "test is the honest fallback.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Six paired measurements",
          problem:
            "Before-and-after differences are +3, −1, +4, +2, −2, +6. Compute W⁺.",
          steps: [
            "Absolute values: 3, 1, 4, 2, 2, 6.",
            "Ranks of |d|, averaging the tie at 2: 1 → rank 1; the two 2s → ranks 2 and 3, averaged to 2.5 each; 3 → rank 4; 4 → rank 5; 6 → rank 6.",
            "Signed: +4 (from +3), −1 (from −1), +5 (from +4), +2.5 (from +2), −2.5 (from −2), +6 (from +6).",
            "W⁺ = 4 + 5 + 2.5 + 6 = 17.5.",
          ],
          answer:
            "W⁺ = 17.5, against a null mean of n(n+1)/4 = 6(7)/4 = 10.5. The positive ranks carry " +
            "more weight than chance would suggest, in the direction of an increase.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why rank the magnitudes rather than the raw differences",
          text:
            "Ranking |d| and reattaching signs means a large positive difference contributes a large " +
            "positive rank, so magnitude still matters — just its order rather than its size. That " +
            "is what makes the test robust to an extreme value while remaining far more powerful " +
            "than simply counting signs.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Ch. 8, hypothesis testing" },
    { source: "Mathlingo assessment bank", locator: "assessments/distribution-free-methods.md" },
  ],
};
