import type { WikiArticle } from "./types";

export const permutationTestWiki: WikiArticle = {
  conceptId: "permutation-test",
  summary:
    "If the null says the group labels are arbitrary, then shuffling them should change nothing. A " +
    "permutation test builds the null distribution by doing exactly that — reassigning labels many " +
    "times and recomputing the statistic — so it needs no distributional assumption and works for " +
    "any statistic you can compute, including ones with no analytic sampling theory at all.",

  sections: [
    {
      heading: "The procedure",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Compute the statistic on the real data — a difference of means, of medians, of " +
              "trimmed means, or anything else.",
            "Pool all observations, reassign the group labels at random, and recompute the statistic.",
            "Repeat many times to trace out the null distribution.",
            "The p-value is the proportion of shuffles giving a statistic at least as extreme as the observed one.",
          ],
        },
        {
          kind: "prose",
          text:
            "The logic is exchangeability. Under H₀ the two groups are draws from the same " +
            "distribution, so which label an observation carries is irrelevant, and every " +
            "relabelling is equally likely. The set of statistics produced by all relabellings *is* " +
            "the null distribution — not an approximation to it.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Include the observed value in the count",
          text:
            "The standard estimator is (1 + #{shuffles at least as extreme}) / (1 + B). Adding one " +
            "to both counts keeps the test valid — it prevents a p-value of exactly 0, which would " +
            "claim more certainty than B shuffles can support.",
        },
      ],
    },

    {
      heading: "Permutation versus bootstrap",
      blocks: [
        {
          kind: "table",
          headers: ["", "Permutation test", "Bootstrap"],
          rows: [
            ["Resamples", "Without replacement — relabels", "With replacement"],
            ["Answers", "Is there an effect? (a test)", "How precise is the estimate? (an interval)"],
            ["Assumes", "Exchangeability under H₀", "The sample represents the population"],
            ["Null distribution", "Exact, by enumeration or sampling", "Not what it estimates"],
          ],
        },
        {
          kind: "prose",
          text:
            "They are siblings and frequently confused. The permutation test shuffles labels while " +
            "keeping the pooled data fixed, which is why it produces a null distribution. The " +
            "bootstrap resamples observations to estimate a sampling distribution, which is why it " +
            "produces intervals. Use the permutation test to ask whether groups differ; use the " +
            "bootstrap to say how large the difference is and how well pinned down.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A tiny exact permutation test",
          problem:
            "Group A: 1, 2. Group B: 5, 6. Test whether the group means differ, using the difference " +
            "of means, one-sided against B being larger. Enumerate all relabellings.",
          steps: [
            "There are C(4,2) = 6 ways to choose which two of the four values are labelled A.",
            "The splits and their B − A mean differences: {1,2}|{5,6} → +4; {1,5}|{2,6} → +1; " +
              "{1,6}|{2,5} → 0; {2,5}|{1,6} → 0; {2,6}|{1,5} → −1; {5,6}|{1,2} → −4.",
            "The observed split is the first, giving +4 — the largest of the six.",
            "With every relabelling enumerated there is no sampling error, so the p-value is the " +
              "exact fraction at least as extreme: 1 of 6.",
          ],
          answer:
            "p = 1/6 ≈ 0.167. With two observations per group the most extreme possible outcome " +
            "cannot reach 0.05 — the design has too few distinct relabellings to produce a small " +
            "p-value at all, which is a genuine limit of the method at tiny n.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Small samples cap the achievable p-value",
          text:
            "With n₁ = n₂ = 2 there are only 6 relabellings, so the smallest one-sided p is 1/6. " +
            "Significance at 0.05 requires at least 20 distinct arrangements, which needs a larger " +
            "design. This is the same discreteness that makes Fisher's exact test conservative.",
        },
      ],
    },

    {
      heading: "When to reach for it",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "The statistic has no tractable sampling distribution — a difference of medians, a " +
              "trimmed mean, a ratio, a custom business metric.",
            "The sample is small and you do not trust a normal approximation.",
            "You want an assumption-light check on a parametric result before believing it.",
          ],
        },
        {
          kind: "prose",
          text:
            "The main limitation is what exchangeability requires. It is exactly right for a " +
            "randomised experiment, where the labels genuinely were assigned by a coin flip. It is " +
            "an assumption in observational data, and it fails outright for dependent data — time " +
            "series and clustered designs need permutation schemes that respect the structure, " +
            "shuffling whole blocks rather than individual observations.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Givens & Hoeting, Computational Statistics", locator: "Ch. 9, resampling methods" },
    { source: "Mathlingo assessment bank", locator: "assessments/distribution-free-methods.md" },
  ],
};
