import type { WikiArticle } from "./types";

export const wilcoxonRankSumTestWiki: WikiArticle = {
  conceptId: "wilcoxon-rank-sum-test",
  summary:
    "The Wilcoxon rank-sum test — equivalently the Mann–Whitney U test — compares two independent " +
    "groups using only the ranks of the pooled observations. Discarding the actual values buys " +
    "robustness to outliers and freedom from the normality assumption, at the cost of testing a " +
    "subtly different hypothesis than the t-test does.",

  sections: [
    {
      heading: "The procedure",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Pool both samples and rank all n₁ + n₂ observations from smallest to largest.",
            "Assign tied observations the average of the ranks they span.",
            "Sum the ranks belonging to group 1; call it W.",
            "Compare W to its null distribution — tabulated exactly for small samples, normal " +
              "approximation for large ones.",
          ],
        },
        {
          kind: "formula",
          latex: "E[W] = n₁(n₁ + n₂ + 1)/2,    Var(W) = n₁n₂(n₁ + n₂ + 1)/12",
          caption: "Null moments, from which the large-sample z follows",
        },
        {
          kind: "prose",
          text:
            "Under H₀ the group labels are exchangeable, so every assignment of ranks to groups is " +
            "equally likely — which is what makes the null distribution computable from combinatorics " +
            "alone, with no assumption about the shape of the underlying population.",
        },
      ],
    },

    {
      heading: "What it actually tests",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "It is not a test of medians in general",
          text:
            "The general null is that a random draw from one group is equally likely to exceed a draw " +
            "from the other — P(X > Y) = ½ — which is a statement about stochastic ordering, not " +
            "medians. It becomes a test of medians only under the additional assumption that the two " +
            "distributions have the same shape and differ by a location shift.",
        },
        {
          kind: "prose",
          text:
            "The distinction has teeth: two distributions can have identical medians and still give a " +
            "significant Wilcoxon result if their shapes differ, and a significant result does not by " +
            "itself license the claim that one median exceeds the other.",
        },
      ],
    },

    {
      heading: "Versus the t-test",
      blocks: [
        {
          kind: "table",
          headers: ["", "t-test", "Wilcoxon rank-sum"],
          rows: [
            ["Uses", "Actual values", "Ranks only"],
            ["Assumes normality", "Yes (matters at small n)", "No"],
            ["Outlier sensitivity", "High — one value moves X̄ and inflates s", "Low — an outlier is just the top rank"],
            ["Relative efficiency, normal data", "1.00", "≈ 0.955"],
            ["Heavy-tailed data", "Can be far worse", "Often much better"],
          ],
        },
        {
          kind: "prose",
          text:
            "The 0.955 figure is the striking one: on perfectly normal data, where the t-test is " +
            "optimal, Wilcoxon needs only about 5% more observations to match it. On heavy-tailed or " +
            "contaminated data it can be arbitrarily more efficient. That asymmetry — a small bounded " +
            "loss against a potentially unbounded gain — is the standard argument for using it as a " +
            "default when normality is doubtful.",
        },
        {
          kind: "example",
          title: "One outlier, two conclusions",
          problem:
            "Group A: 1, 2, 3, 4, 5. Group B: 6, 7, 8, 9, 1000. Does the extreme value change the story?",
          steps: [
            "Ranks: A takes 1–5, B takes 6–10, regardless of whether B's last value is 10 or 1000.",
            "W for A = 1+2+3+4+5 = 15, the minimum possible — maximally separated.",
            "A t-test on the raw values sees X̄_B ≈ 206 with an enormous s, so the standard error " +
              "swamps the difference and the test loses power.",
          ],
          answer:
            "Wilcoxon detects the complete separation the data plainly shows; the t-test is defeated " +
            "by the single extreme value it is obliged to take at face value.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Ch. 8, Hypothesis Testing" },
    { source: "Mathlingo assessment bank", locator: "assessments/named-tests-and-resampling.md" },
  ],
};
