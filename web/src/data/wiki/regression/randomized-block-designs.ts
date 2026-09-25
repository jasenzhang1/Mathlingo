import type { WikiArticle } from "../types";

export const randomizedBlockDesignsWiki: WikiArticle = {
  conceptId: "randomized-block-designs",

  summary:
    "Blocking groups experimental units that are alike — plots in the same field, measurements on the same " +
    "day, the same patient — and randomises treatments within each group. Variation between blocks is then " +
    "removed from the error term instead of inflating it. The analysis is a two-way ANOVA without " +
    "interaction; the Latin square does the same with two blocking factors at once.",

  sections: [
    {
      heading: "Randomized complete block design",
      blocks: [
        {
          kind: "formula",
          latex: "y_{ij} = μ + τᵢ + βⱼ + ε_{ij},   i = 1..t \\text{ treatments},  j = 1..b \\text{ blocks}",
        },
        {
          kind: "table",
          headers: ["Source", "df"],
          rows: [
            ["Treatments", "t − 1"],
            ["Blocks", "b − 1"],
            ["Error", "(t − 1)(b − 1)"],
            ["Total", "tb − 1"],
          ],
        },
        {
          kind: "prose",
          text:
            "Every treatment appears once in every block, so the design is balanced and treatment and block " +
            "sums of squares are orthogonal. The treatment F-test uses the error mean square, from which " +
            "block-to-block differences have been removed. Treatment × block interaction is assumed absent; " +
            "with one observation per cell it is not separately estimable (it is what the error term is).",
        },
      ],
    },

    {
      heading: "Why blocking helps",
      blocks: [
        {
          kind: "prose",
          text:
            "Had the same units been assigned completely at random, the block sum of squares would have ended " +
            "up in the error. Blocking costs b − 1 error degrees of freedom and gains a smaller error mean " +
            "square — a good trade whenever blocks genuinely differ.",
        },
        {
          kind: "example",
          title: "What blocking removed",
          problem:
            "A randomized block experiment with t = 4 treatments and b = 6 blocks has SS_blocks = 90 and " +
            "SS_error = 45. Compare the error mean square with what a completely randomised analysis would give.",
          steps: [
            "Blocked: error df = 3 × 5 = 15; MSE = 45/15 = 3.",
            "Ignoring blocks: error SS = 45 + 90 = 135 on 15 + 5 = 20 df; MSE = 6.75.",
          ],
          answer: "Blocking cut the error mean square from 6.75 to 3, making the treatment F more than twice as large.",
        },
      ],
    },

    {
      heading: "Latin squares",
      blocks: [
        {
          kind: "prose",
          text:
            "When there are two nuisance factors — rows and columns, say day and machine — a t × t Latin " +
            "square assigns t treatments so that each appears exactly once in every row and every column. " +
            "Three factors are balanced against each other in only t² runs.",
        },
        {
          kind: "table",
          headers: ["Source", "df (t × t Latin square)"],
          rows: [["Rows", "t − 1"], ["Columns", "t − 1"], ["Treatments", "t − 1"], ["Error", "(t − 1)(t − 2)"]],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Small squares have little error",
          text:
            "A 3 × 3 Latin square leaves only 2 error degrees of freedom and a 4 × 4 only 6, so tests have " +
            "little power. Replicating the square is the usual remedy.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Randomisation still matters",
          text:
            "Blocking controls known nuisance factors; randomisation within blocks protects against unknown " +
            "ones and justifies the error model. Seber & Lee's 'simple block structure' is exactly the class " +
            "of designs where both ideas combine cleanly into orthogonal strata.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.7, Designs with Simple Block Structure" },
  ],
};
