import type { WikiArticle } from "../types";

export const robustnessOfFTestWiki: WikiArticle = {
  conceptId: "robustness-of-f-test",

  summary:
    "The exact F distribution rests on normal errors. How much does that matter? For tests about the " +
    "regression coefficients, surprisingly little in most designs: the numerator and denominator are " +
    "averages of many squared components, and the central limit theorem pulls them toward what normal " +
    "theory predicts. For tests about variances the opposite holds — they are badly affected by heavy " +
    "tails. The design matters too: the F-test is most robust when no observation has high leverage.",

  sections: [
    {
      heading: "Why tests on β are robust",
      blocks: [
        {
          kind: "prose",
          text:
            "β̂ = (XᵀX)⁻¹Xᵀy is a weighted sum of the observations. As long as no single weight dominates — " +
            "no observation has large leverage hᵢᵢ — the central limit theorem makes β̂ approximately normal " +
            "whatever the error distribution, and s² converges to σ². The t- and F-statistics are then " +
            "approximately t and F.",
        },
        {
          kind: "formula",
          latex: "\\max_i hᵢᵢ → 0  ⟹  \\text{F-test for β asymptotically valid for any error distribution with finite variance}",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Kurtosis enters through the leverages",
          text:
            "The first-order correction to the F distribution under non-normal errors involves the excess " +
            "kurtosis γ₂ multiplied by a term measuring how unequal the diagonal elements of the projection " +
            "matrices are. Seber & Lee call a test quadratically balanced when those diagonals are constant — " +
            "as in balanced ANOVA — and for such tests the kurtosis term vanishes. Balanced designs are " +
            "robust by construction.",
        },
      ],
    },

    {
      heading: "Why tests on σ² are not",
      blocks: [
        {
          kind: "formula",
          latex: "Var(s²) ≈ σ⁴\\left(\\frac{2}{n − p} + \\frac{γ₂}{n}\\right)",
          caption: "Under normality γ₂ = 0; heavy tails (γ₂ > 0) inflate the variance of s² and the χ² reference is wrong.",
        },
        {
          kind: "prose",
          text:
            "A χ² interval for σ², or an F-test comparing two variances (including Bartlett's test for equal " +
            "group variances), uses the normal-theory variance of s². Heavy-tailed errors make s² far more " +
            "variable than that, and the tests reject far too often. This non-robustness does not shrink " +
            "as n grows: the γ₂/n term is of the same order as 2/(n − p).",
        },
      ],
    },

    {
      heading: "Practical summary",
      blocks: [
        {
          kind: "table",
          headers: ["Procedure", "Sensitivity to non-normal errors"],
          rows: [
            ["t- and F-tests for β, balanced design", "Low"],
            ["t- and F-tests for β, a few high-leverage points", "Moderate — those points' errors are not averaged away"],
            ["Prediction intervals for a new y", "High — they depend on the error distribution itself, not an average"],
            ["χ² tests and intervals for σ²; tests of equal variances", "High, and not cured by large n"],
          ],
        },
        {
          kind: "example",
          title: "How much wider does s² vary?",
          problem:
            "With n − p ≈ n = 50 and errors with excess kurtosis γ₂ = 3 (e.g. a t distribution with 6 df), " +
            "compare Var(s²)/σ⁴ with its normal-theory value.",
          steps: [
            "Normal theory: 2/50 = 0.04.",
            "With γ₂ = 3: 0.04 + 3/50 = 0.10.",
            "The ratio is 2.5: s² is 2.5 times as variable as a χ² test assumes.",
          ],
          answer: "Var(s²)/σ⁴ ≈ 0.10 versus 0.04 — tests about σ² are badly miscalibrated.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Prediction intervals need the error distribution",
          text:
            "A prediction interval for one new observation is dominated by that observation's own error, " +
            "which no averaging protects. With skewed or heavy-tailed errors, normal-theory prediction " +
            "intervals can have poor coverage in any sample size.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§9.5, Robustness of the F-Test to Nonnormality" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§9.5.2, Quadratically Balanced F-Tests" },
  ],
};
