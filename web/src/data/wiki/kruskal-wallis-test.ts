import type { WikiArticle } from "./types";

export const kruskalWallisTestWiki: WikiArticle = {
  conceptId: "kruskal-wallis-test",
  summary:
    "Kruskal-Wallis extends the rank-sum test from two groups to any number. Pool everything, rank " +
    "it, and ask whether the average rank differs across groups more than chance allows. Its null " +
    "distribution is approximately chi-square with k − 1 degrees of freedom, which is where the " +
    "chi-square family reappears in a setting with no counts anywhere in sight.",

  sections: [
    {
      heading: "The statistic",
      blocks: [
        {
          kind: "formula",
          latex: "H = [ 12 / (N(N + 1)) ] · Σⱼ ( Rⱼ² / nⱼ )  −  3(N + 1)",
          caption: "Rⱼ is the rank sum of group j, nⱼ its size, N the total",
        },
        {
          kind: "prose",
          text:
            "Read past the constants and H is measuring how far each group's rank sum sits from what " +
            "equal treatment would give. Under the null every group is a random slice of the pooled " +
            "ranks, so each should have an average rank near (N + 1)/2; H grows as they diverge. " +
            "Under H₀ it is approximately χ² with k − 1 degrees of freedom, the approximation " +
            "improving with group sizes.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "With k = 2 it reduces to the rank-sum test",
          text:
            "Kruskal-Wallis on two groups is algebraically equivalent to the Wilcoxon rank-sum test, " +
            "with H equal to the squared standardised rank-sum statistic. The relationship mirrors " +
            "the one between a 2×2 chi-square and a two-proportion z — the same test, squared.",
        },
      ],
    },

    {
      heading: "What it does and does not tell you",
      blocks: [
        {
          kind: "prose",
          text:
            "H is an omnibus statistic. A significant result says the groups are not all alike; it " +
            "does not say which differ, or in what direction. That is the same limitation ANOVA has " +
            "in the parametric world, and it calls for the same follow-up: pairwise comparisons with " +
            "a multiplicity correction, since running all k(k−1)/2 of them uncorrected reintroduces " +
            "exactly the error inflation the omnibus test was there to avoid.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Not a test of medians unless the shapes match",
          text:
            "Like the rank-sum test, the general null is about stochastic ordering rather than " +
            "medians. It becomes a statement about medians only under the added assumption that the " +
            "groups share a distributional shape and differ by location.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Three groups of three",
          problem:
            "Group A: 1, 2, 3. Group B: 4, 5, 6. Group C: 7, 8, 9. Compute H.",
          steps: [
            "Pooled ranks are 1…9, so R_A = 1+2+3 = 6, R_B = 4+5+6 = 15, R_C = 7+8+9 = 24.",
            "N = 9, each nⱼ = 3. Σ Rⱼ²/nⱼ = (36 + 225 + 576)/3 = 837/3 = 279.",
            "H = [12/(9×10)]×279 − 3×10 = (12/90)(279) − 30 = 37.2 − 30 = 7.2.",
            "Compare to χ² with k − 1 = 2 df; the 0.05 critical value is 5.99.",
          ],
          answer:
            "H = 7.2 > 5.99, so the groups differ. This is the most extreme possible arrangement — " +
            "perfectly separated groups — and it only just clears the threshold, which shows how " +
            "little power three observations per group provides.",
        },
        {
          kind: "prose",
          text:
            "That last point is worth dwelling on. With complete separation and still only marginal " +
            "significance, a non-significant Kruskal-Wallis on small groups tells you almost nothing " +
            "— the test simply cannot resolve anything less than total separation at that size.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Ch. 8 and 11, testing and comparing treatments" },
    { source: "Mathlingo assessment bank", locator: "assessments/distribution-free-methods.md" },
  ],
};
