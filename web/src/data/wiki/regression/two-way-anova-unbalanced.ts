import type { WikiArticle } from "../types";

export const twoWayAnovaUnbalancedWiki: WikiArticle = {
  conceptId: "two-way-anova-unbalanced",

  summary:
    "When the cells of a two-way layout have different numbers of observations, the columns for A and B " +
    "are no longer orthogonal. The sum of squares for A then depends on what else is already in the model, " +
    "and statistical software offers three answers — Types I, II, and III. They are not three estimates of " +
    "one thing; each tests a different hypothesis about the cell means, and choosing among them is choosing " +
    "the question.",

  sections: [
    {
      heading: "Why order starts to matter",
      blocks: [
        {
          kind: "prose",
          text:
            "Write R(B | μ, A) for the reduction in RSS from adding B to a model that already has μ and A — " +
            "an extra-sum-of-squares, computed by partitioned regression. With balanced data R(B | μ, A) = " +
            "R(B | μ): A and B are orthogonal, so fitting A first changes nothing. With unbalanced data, " +
            "levels of A are over-represented at some levels of B, the two sets of columns are correlated, and " +
            "the two reductions differ.",
        },
      ],
    },

    {
      heading: "Three types of sums of squares",
      blocks: [
        {
          kind: "table",
          headers: ["Type", "SS for A", "SS for B", "SS for AB"],
          rows: [
            ["I (sequential)", "R(A | μ)", "R(B | μ, A)", "R(AB | μ, A, B)"],
            ["II (hierarchical)", "R(A | μ, B)", "R(B | μ, A)", "R(AB | μ, A, B)"],
            ["III (fully adjusted)", "R(A | μ, B, AB)*", "R(B | μ, A, AB)*", "R(AB | μ, A, B)"],
          ],
          caption: "* computed under sum-to-zero constraints, so that the reduction is well defined.",
        },
        {
          kind: "list",
          items: [
            "Type I for A tests equality of the row means weighted by the cell counts — a hypothesis that depends on the sample sizes, which is rarely what is wanted.",
            "Type II for A tests A adjusted for B, assuming no interaction; it is the most powerful choice when the interaction is absent.",
            "Type III for A tests equality of the unweighted row averages of the cell means, (1/b)Σⱼμᵢⱼ — meaningful even with interaction, but only as a statement about those averages.",
            "All three agree on the highest-order term (AB), and all three agree on everything when the design is balanced.",
          ],
        },
      ],
    },

    {
      heading: "A small illustration",
      blocks: [
        {
          kind: "example",
          title: "Order matters",
          problem:
            "In an unbalanced 2 × 2 layout, R(A | μ) = 30, R(B | μ) = 20, and R(μ, A, B) − R(μ) = 38 (the reduction " +
            "from fitting both main effects). Give the Type I SS for B (A first) and the Type II SS for A and B.",
          steps: [
            "Type I for B, entered after A: R(B | μ, A) = 38 − 30 = 8.",
            "Type II for A: R(A | μ, B) = 38 − 20 = 18.",
            "Type II for B: R(B | μ, A) = 8, the same as Type I for the second-entered factor.",
            "Note 18 + 8 ≠ 38: with correlated factors the adjusted sums of squares do not add up.",
          ],
          answer: "Type I SS(B) = 8; Type II SS(A) = 18 and SS(B) = 8.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Empty cells change everything",
          text:
            "If some cell has no observations, even Type III hypotheses stop being about simple averages of " +
            "cell means, because some μᵢⱼ are not estimable. Seber & Lee's §8.3 discusses what remains " +
            "testable; the safe route is to write the hypothesis you want as estimable contrasts and test it " +
            "directly as a general linear hypothesis.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.3, Two-Way Classification (Unbalanced)" },
  ],
};
