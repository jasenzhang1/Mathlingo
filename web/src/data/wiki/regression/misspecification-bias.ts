import type { WikiArticle } from "../types";

export const misspecificationBiasWiki: WikiArticle = {
  conceptId: "misspecification-bias",

  summary:
    "Every model is fitted without knowing exactly which predictors belong in it. The two possible mistakes " +
    "are not symmetric. Leave out a predictor that matters and the coefficients of every correlated " +
    "predictor you kept are biased, and s² overestimates σ². Put in a predictor that does not matter and " +
    "nothing is biased — you only pay in variance. That asymmetry, and the bias–variance trade it sets up " +
    "for prediction, is the foundation of Chapter 12's model selection.",

  sections: [
    {
      heading: "Underfitting",
      blocks: [
        {
          kind: "prose",
          text: "The truth is y = X₁β₁ + X₂β₂ + ε, but only X₁ (p₁ columns) is fitted.",
        },
        {
          kind: "formula",
          latex: "E(β̂₁) = β₁ + Aβ₂,   A = (X₁ᵀX₁)⁻¹X₁ᵀX₂",
          caption: "A is the alias matrix: row j says how much of each omitted variable is absorbed by β̂ⱼ.",
        },
        {
          kind: "formula",
          latex: "E(s²) = σ² + \\frac{β₂ᵀX₂ᵀM₁X₂β₂}{n − p₁}",
          caption: "The omitted signal that X₁ cannot mimic ends up in the residuals, inflating s².",
        },
        {
          kind: "prose",
          text:
            "The bias vanishes only if X₁ᵀX₂ = 0 (the omitted variables are orthogonal to the included ones) " +
            "or β₂ = 0. In observational data neither is usually true — which is the whole problem of " +
            "confounding, in matrix form.",
        },
      ],
    },

    {
      heading: "Overfitting",
      blocks: [
        {
          kind: "prose",
          text:
            "If the truth is y = X₁β₁ + ε and you fit [X₁, X₂], the estimate of β₁ remains unbiased (the " +
            "larger model contains the truth, with β₂ = 0), and s² remains unbiased. But Var(β̂₁) is larger: " +
            "by partitioned regression, the extra columns absorb some of X₁'s variation, leaving less to " +
            "estimate β₁ from.",
        },
        {
          kind: "formula",
          latex: "Var(β̂₁^{big}) − Var(β̂₁^{small}) = σ² A(X₂ᵀM₁X₂)⁻¹Aᵀ ⪰ 0",
        },
      ],
    },

    {
      heading: "The prediction trade-off",
      blocks: [
        {
          kind: "prose",
          text:
            "For prediction, the right question is mean squared error, bias² + variance. Omitting a genuinely " +
            "relevant but weak predictor adds a little bias and removes some variance, and can reduce MSE. " +
            "For a single omitted variable, dropping it improves the MSE of the fitted values when its true " +
            "coefficient is smaller than its standard error — when |β₂|/sd(β̂₂) < 1.",
        },
        {
          kind: "example",
          title: "Bias from an omitted variable",
          problem:
            "In the true model y = 2 + 3x₁ + 4x₂ + ε, the least-squares regression of x₂ on x₁ has slope 0.5. " +
            "What slope do you expect when regressing y on x₁ alone?",
          steps: [
            "The alias coefficient for x₁ is the slope of x₂ on x₁: 0.5.",
            "E(β̂₁) = β₁ + 0.5·β₂ = 3 + 0.5·4 = 5.",
          ],
          answer: "About 5 — the fitted 'effect' of x₁ includes 2 units borrowed from the omitted x₂.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The asymmetry in one line",
          text:
            "Underfitting biases the estimates and the error variance; overfitting only inflates variances. " +
            "When interpretation of a coefficient is the goal, err on the side of including plausible " +
            "confounders; when prediction is the goal, trade the two off explicitly.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§9.2, Bias (underfitting and overfitting)" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§5.4, Enlarging the Regression Matrix; §12.2, Why Select?" },
  ],
};
