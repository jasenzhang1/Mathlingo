import type { WikiArticle } from "../types";

export const tukeyNonadditivityTestWiki: WikiArticle = {
  conceptId: "tukey-nonadditivity-test",

  summary:
    "With a single observation per cell of a two-way layout, the interaction sum of squares is the only " +
    "thing left over after fitting main effects — there is no within-cell replication to estimate pure " +
    "error. So the additive model's residuals are used as error, and interaction cannot be tested in " +
    "general. Tukey's insight was to test one specific, common form of interaction — the product of row " +
    "and column effects — which costs just one degree of freedom.",

  sections: [
    {
      heading: "The problem",
      blocks: [
        {
          kind: "formula",
          latex: "y_{ij} = μ + αᵢ + βⱼ + ε_{ij},   i = 1..a,  j = 1..b",
        },
        {
          kind: "prose",
          text:
            "With one observation per cell there are ab data points and the full interaction model has ab " +
            "parameters: it fits perfectly and leaves no error. Using the additive model's residual mean " +
            "square as σ² is valid only if there is no interaction — and if there is, it inflates the error " +
            "estimate and makes the main-effect tests conservative.",
        },
      ],
    },

    {
      heading: "Tukey's one degree of freedom",
      blocks: [
        {
          kind: "prose",
          text:
            "Suppose the interaction has the multiplicative form γᵢⱼ = λαᵢβⱼ — typical when the effects act " +
            "on a scale where they would be additive after a transformation. Replace αᵢ, βⱼ by their " +
            "estimates and the test of λ = 0 is a regression of the residuals on the products:",
        },
        {
          kind: "formula",
          latex: "SS_N = \\frac{\\left[ΣᵢΣⱼ (ȳᵢ. − ȳ..)(ȳ.ⱼ − ȳ..) y_{ij}\\right]²}{Σᵢ(ȳᵢ. − ȳ..)² \\, Σⱼ(ȳ.ⱼ − ȳ..)²}",
        },
        {
          kind: "formula",
          latex: "F = \\frac{SS_N}{(SS_{res} − SS_N)/[(a − 1)(b − 1) − 1]} ~ F_{1, (a−1)(b−1)−1}",
          caption: "SS_res is the additive model's residual sum of squares.",
        },
        {
          kind: "example",
          title: "Carrying out the test",
          problem:
            "A 4 × 5 layout with one observation per cell has additive-model SS_res = 60 and Tukey's SS_N = 12. Compute F.",
          steps: [
            "Residual df of the additive model: (4 − 1)(5 − 1) = 12.",
            "Remainder: SS = 60 − 12 = 48 on 12 − 1 = 11 df, mean square ≈ 4.364.",
            "F = 12/4.364 ≈ 2.75 on (1, 11) df.",
          ],
          answer: "F ≈ 2.75, below F^{0.05}_{1,11} ≈ 4.84 — no evidence of this kind of nonadditivity.",
        },
      ],
    },

    {
      heading: "What a significant result suggests",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Often a transformation, not an interaction",
          text:
            "Multiplicative nonadditivity is what additive effects look like on the wrong scale. If the " +
            "effects multiply (yᵢⱼ ≈ θρᵢκⱼ), logs make them add. A significant Tukey test is frequently a " +
            "hint to transform y, and the estimated λ even suggests the power (Seber & Lee §8.5.1).",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It only detects one shape",
          text:
            "The test has power against interaction proportional to αᵢβⱼ and almost none against other " +
            "patterns — a single anomalous cell, say. A non-significant result does not establish additivity.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.5, Two-Way Classification (One Observation per Mean)" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§8.5.1, Underlying Assumptions" },
  ],
};
