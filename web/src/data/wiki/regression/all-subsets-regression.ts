import type { WikiArticle } from "../types";

export const allSubsetsRegressionWiki: WikiArticle = {
  conceptId: "all-subsets-regression",

  summary:
    "With k candidate predictors there are 2ᵏ subsets — about a million for k = 20. Stepwise methods " +
    "examine a tiny path through them and can miss the best. All-subsets regression finds, for each size, " +
    "the subsets with the smallest residual sum of squares, and it does so without fitting every one: " +
    "cheap sweep or QR updates move between neighbouring subsets, and a branch-and-bound argument prunes " +
    "whole families of subsets that cannot possibly win.",

  sections: [
    {
      heading: "Enumerating cheaply",
      blocks: [
        {
          kind: "prose",
          text:
            "If consecutive subsets differ by one variable, each fit is a single sweep (or a single QR update) " +
            "from the last, costing O(k²) instead of a full refit. Orderings such as a binary Gray code visit all " +
            "2ᵏ subsets so that each differs from its predecessor by adding or dropping exactly one variable.",
        },
        {
          kind: "example",
          title: "How many subsets of each size?",
          problem: "With k = 10 candidates (intercept always included), how many subsets of exactly 3 predictors are there, and how many in total?",
          steps: ["C(10, 3) = 120 of size 3.", "2¹⁰ = 1024 subsets in total."],
          answer: "120 of size 3, 1024 overall.",
        },
      ],
    },

    {
      heading: "Branch and bound (leaps and bounds)",
      blocks: [
        {
          kind: "formula",
          latex: "S ⊆ T  ⟹  RSS(S) ≥ RSS(T)",
          caption: "Adding variables never increases RSS. This monotonicity is the whole trick.",
        },
        {
          kind: "prose",
          text:
            "Suppose the best subset of size m found so far has RSS = 50. Consider a family of subsets that are " +
            "all contained in some set T. If RSS(T) — the best any member of the family could possibly do — is " +
            "already above 50, no size-m subset inside T can beat the current best, and the whole family is " +
            "skipped without being fitted. Furnival and Wilson's 'leaps and bounds' algorithm organises this " +
            "pruning into a tree and makes best-subset search feasible for k up to about 30–40.",
        },
        {
          kind: "example",
          title: "A pruning decision",
          problem:
            "The best 2-variable subset found so far has RSS = 120. The 4-variable set T = {x₁, x₂, x₅, x₇} has RSS(T) = 135. Do any 2-variable subsets of T need to be fitted?",
          steps: [
            "Every 2-variable subset S of T has RSS(S) ≥ RSS(T) = 135.",
            "135 > 120, so none of them can beat the current best.",
          ],
          answer: "No — all C(4, 2) = 6 of them are pruned.",
        },
      ],
    },

    {
      heading: "Using the output",
      blocks: [
        {
          kind: "list",
          items: [
            "Report the best few subsets of each size, not only the single winner: several often fit almost equally well and differ in interpretability or cost.",
            "Apply a size-penalising criterion (Cp, AIC, BIC, PRESS) across sizes to choose among them — within one size, all are ranked by RSS.",
            "Seber & Lee (§12.8.3) show the same search organised through QR updates for better numerical accuracy.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Exhaustive search maximises selection bias",
          text:
            "Searching a million subsets finds the one that best fits this sample's noise as well as its " +
            "signal. The more thorough the search, the more optimistic the winner's apparent fit — see " +
            "inference after model selection.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§12.8, Computational Considerations (all possible subsets, generating the best regressions, QR)" },
  ],
};
