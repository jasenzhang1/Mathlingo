import type { WikiArticle } from "../types";

export const dummyVariablesComparingLinesWiki: WikiArticle = {
  conceptId: "dummy-variables-comparing-lines",

  summary:
    "Several groups each have their own straight line. Are the lines the same? Do they share a slope? Do " +
    "they meet at a common point? Indicator (dummy) variables put all the groups into one regression, and " +
    "each of these questions becomes a general linear hypothesis on the dummy coefficients — one F-test " +
    "per question, all using the pooled error estimate.",

  sections: [
    {
      heading: "Coding groups with indicators",
      blocks: [
        {
          kind: "formula",
          latex: "y = β₀ + β₁x + γd + δ(d·x) + ε,   d = 1 \\text{ for group B}, 0 \\text{ for group A}",
          caption: "Group A's line is β₀ + β₁x; group B's is (β₀ + γ) + (β₁ + δ)x.",
        },
        {
          kind: "prose",
          text:
            "γ is the difference in intercepts and δ the difference in slopes. With k groups, use k − 1 " +
            "indicators and k − 1 interaction columns; the omitted group is the baseline. Including an " +
            "indicator for every group as well as the intercept makes X rank-deficient — the dummy-variable " +
            "trap, which is the less-than-full-rank problem in its most common form.",
        },
      ],
    },

    {
      heading: "The three standard hypotheses",
      blocks: [
        {
          kind: "table",
          headers: ["Question", "Hypothesis (two groups)", "Restrictions q (k groups)"],
          rows: [
            ["Coincident — one line for all?", "γ = δ = 0", "2(k − 1)"],
            ["Parallel — common slope?", "δ = 0", "k − 1"],
            ["Common intercept?", "γ = 0", "k − 1"],
            ["Concurrent at a known x = c?", "γ + δc = 0", "k − 1"],
          ],
        },
        {
          kind: "prose",
          text:
            "Each is tested with F = [(RSS_H − RSS)/q] / [RSS/(n − 2k)], where RSS is from the full model " +
            "with a separate line per group (2k parameters). Fitting the lines in one model rather than " +
            "separately is what lets the error variance be pooled across groups — valid if the groups share σ².",
        },
        {
          kind: "example",
          title: "Testing parallelism",
          problem:
            "Three groups, n = 36 in total. Separate lines give RSS = 132; lines forced to share a slope give " +
            "RSS_H = 150. Test for parallelism.",
          steps: [
            "Full model: 2k = 6 parameters, so n − 6 = 30 residual df and s² = 132/30 = 4.4.",
            "q = k − 1 = 2 restrictions (two slope differences set to zero).",
            "F = [(150 − 132)/2]/4.4 = 9/4.4 ≈ 2.05 on (2, 30) df.",
          ],
          answer: "F ≈ 2.05, below F^{0.05}_{2,30} ≈ 3.32: no evidence against parallel lines.",
        },
      ],
    },

    {
      heading: "Interpretation",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Parallel lines make 'the group effect' well defined",
          text:
            "If the lines are parallel, the vertical gap between groups is the same at every x, so a single " +
            "number describes the group difference — the analysis-of-covariance setting. If they are not, " +
            "the group difference depends on x and must be reported as a function of it.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Test the interaction before the main effect",
          text:
            "When δ ≠ 0, γ is the group difference at x = 0 only, which may be far outside the data. Testing " +
            "γ = 0 in a model with a significant interaction answers a question nobody asked.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§6.4.1, Comparing Straight Lines: General Model" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§6.4.2, Use of Dummy Explanatory Variables" },
  ],
};
