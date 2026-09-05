import type { WikiArticle } from "./types";

export const rejectionRegionWiki: WikiArticle = {
  conceptId: "rejection-region",
  summary:
    "The rejection region is the set of test-statistic values that lead you to reject H₀. It is " +
    "chosen before seeing the data, and it is chosen so that the probability of landing in it when " +
    "H₀ is true equals α. That construction is what makes α the false-positive rate rather than an " +
    "arbitrary number, and it is why the region's boundaries — the critical values — come from the " +
    "null distribution rather than from the data.",

  sections: [
    {
      heading: "Construction",
      blocks: [
        {
          kind: "prose",
          text:
            "Fix α. Find the values of the test statistic that are least consistent with H₀ and most " +
            "consistent with H₁, and take the most extreme α of the null distribution's probability in " +
            "that direction. The cut points are the critical values.",
        },
        {
          kind: "table",
          headers: ["Alternative", "Rejection region", "Critical values at α = 0.05 (z)"],
          rows: [
            ["Two-sided, μ ≠ μ₀", "|Z| > z_{α/2}", "|Z| > 1.96"],
            ["Right-tailed, μ > μ₀", "Z > z_α", "Z > 1.645"],
            ["Left-tailed, μ < μ₀", "Z < −z_α", "Z < −1.645"],
          ],
        },
        {
          kind: "prose",
          text:
            "A two-sided test splits α between the tails, so each tail gets α/2 and the critical value " +
            "moves further out. A one-sided test spends all of α in one direction, which is why it has " +
            "more power against alternatives in that direction — and no power at all against the other.",
        },
      ],
    },

    {
      heading: "The direction must be chosen in advance",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Choosing one-sided after seeing the data doubles your error rate",
          text:
            "Looking at the data, noting the effect went up, and then running a right-tailed test is " +
            "not a one-sided test — it is a two-sided test with the p-value halved by fiat. The real " +
            "Type I error rate is 2α, because you would have flipped direction had the effect gone the " +
            "other way.",
        },
        {
          kind: "prose",
          text:
            "A one-sided test is legitimate when the opposite direction is genuinely irrelevant to the " +
            "decision — testing whether a new drug is worse than placebo may have no action attached " +
            "to it. It is illegitimate when the other direction would have interested you.",
        },
      ],
    },

    {
      heading: "Equivalence with the p-value rule",
      blocks: [
        {
          kind: "prose",
          text:
            "“Reject when the statistic falls in the rejection region” and “reject when p ≤ α” are the " +
            "same rule stated two ways. The rejection region fixes a threshold on the statistic's " +
            "scale; the p-value maps the statistic onto the probability scale and compares there. The " +
            "region approach makes the fixed error rate visible; the p-value approach reports how far " +
            "past the boundary you landed.",
        },
        {
          kind: "example",
          title: "Both routes, one decision",
          problem: "Two-sided test at α = 0.05, observed z = 2.30.",
          steps: [
            "Region route: the region is |Z| > 1.96; 2.30 exceeds 1.96, so reject.",
            "p-value route: p = 2 × P(Z > 2.30) ≈ 2 × 0.0107 = 0.0214.",
            "0.0214 ≤ 0.05, so reject.",
          ],
          answer:
            "Identical conclusions, necessarily. The p-value adds information the region does not: " +
            "0.0214 says we cleared the bar comfortably, where 0.049 would say we barely did.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "And a third equivalent route",
          text:
            "A two-sided test rejects μ₀ exactly when μ₀ falls outside the corresponding 1 − α " +
            "confidence interval. Region, p-value, and interval are three views of one decision rule.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§8.3, Methods of Evaluating Tests" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Mathlingo assessment bank", locator: "assessments/hypothesis-testing-machinery.md" },
  ],
};
