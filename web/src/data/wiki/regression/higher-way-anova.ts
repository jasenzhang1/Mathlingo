import type { WikiArticle } from "../types";

export const higherWayAnovaWiki: WikiArticle = {
  conceptId: "higher-way-anova",

  summary:
    "With three or more factors, the balanced two-way machinery extends directly: every subset of factors " +
    "gets its own effect, main effects for single factors, two-factor interactions for pairs, and so on up " +
    "to the interaction of all of them. Interactions are defined by contrasts of contrasts, degrees of " +
    "freedom multiply, and with equal replication everything stays orthogonal. The new practical problems " +
    "are interpreting high-order interactions and coping when an observation is missing.",

  sections: [
    {
      heading: "Three-factor model",
      blocks: [
        {
          kind: "formula",
          latex: "y_{ijkl} = μ + αᵢ + βⱼ + γₖ + (αβ)_{ij} + (αγ)_{ik} + (βγ)_{jk} + (αβγ)_{ijk} + ε_{ijkl}",
        },
        {
          kind: "table",
          headers: ["Effect", "df (levels a, b, c; m replicates)"],
          rows: [
            ["A", "a − 1"],
            ["AB", "(a − 1)(b − 1)"],
            ["ABC", "(a − 1)(b − 1)(c − 1)"],
            ["Error", "abc(m − 1)"],
          ],
          caption: "The df for an effect are the product of (levels − 1) over the factors it involves.",
        },
        {
          kind: "prose",
          text:
            "The ABC interaction means the AB interaction itself changes with the level of C. In a 2 × 2 × 2 " +
            "design it is the single contrast (μ₁₁₁ − μ₁₂₁ − μ₂₁₁ + μ₂₂₁) − (μ₁₁₂ − μ₁₂₂ − μ₂₁₂ + μ₂₂₂): the " +
            "difference between the AB interaction contrasts at the two levels of C.",
        },
      ],
    },

    {
      heading: "Model building",
      blocks: [
        {
          kind: "list",
          items: [
            "Hierarchy: keep a lower-order term whenever a higher-order term containing it is kept. An AB interaction without the A and B main effects is rarely interpretable.",
            "Test from the top: examine the highest-order interaction first, and pool negligible high-order terms into error only with care (it biases the error estimate if they are not negligible).",
            "In unreplicated 2^k factorials there is no pure error; high-order interactions are assumed negligible and used as error, or effects are judged on a normal probability plot.",
          ],
        },
        {
          kind: "example",
          title: "Counting df",
          problem: "A 2 × 3 × 4 factorial with m = 2 replicates. Find the df for the three-factor interaction and for error.",
          steps: [
            "ABC: (2 − 1)(3 − 1)(4 − 1) = 6.",
            "Error: abc(m − 1) = 24 × 1 = 24.",
          ],
          answer: "6 and 24.",
        },
      ],
    },

    {
      heading: "Missing observations",
      blocks: [
        {
          kind: "prose",
          text:
            "A single missing value destroys balance, and with it the simple formulas. Seber & Lee (§8.6.3) " +
            "describe the classical fix: choose the missing value to minimise the residual sum of squares of " +
            "the full model, insert it, and analyse as if balanced — with one degree of freedom subtracted from " +
            "error. For a randomized block design with t treatments and b blocks the estimate is " +
            "(tT + bB − G)/((t − 1)(b − 1)), where T, B, G are the treatment, block, and grand totals of the " +
            "observed values.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The treatment sum of squares is slightly biased upward",
          text:
            "Least-squares estimates of the effects are exact after filling in, but the treatment sum of " +
            "squares computed from the filled-in table is biased upward. Modern practice simply fits the " +
            "unbalanced model directly as a regression.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.6, Higher-Way Classifications with Equal Numbers per Mean" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.6.3, Missing Observations" },
  ],
};
