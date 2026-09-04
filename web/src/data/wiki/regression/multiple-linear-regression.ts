import type { WikiArticle } from "../types";

export const multipleLinearRegressionWiki: WikiArticle = {
  conceptId: "multiple-linear-regression",

  summary:
    "Multiple linear regression puts several predictors in the model at once. Mechanically nothing " +
    "changes — the normal equations XᵀXβ̂ = Xᵀy are already written for any number of columns. " +
    "What changes is interpretation: a coefficient now measures a partial effect, the contribution " +
    "of one predictor after the others have had their say. That single shift explains why " +
    "coefficients move, and sometimes flip sign, when a predictor is added.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "Yᵢ = β₀ + β₁X_{i1} + β₂X_{i2} + ⋯ + β_p X_{ip} + εᵢ",
          caption: "One intercept, p slopes, and the same mean-zero error assumption as before.",
        },
        {
          kind: "formula",
          latex: "y = Xβ + ε,   β̂ = (XᵀX)⁻¹Xᵀy",
          caption: "In matrix form the model and its solution are identical to the simple case.",
        },
        {
          kind: "prose",
          text:
            "Geometrically, C(X) is now a (p+1)-dimensional subspace rather than a plane, and OLS " +
            "still projects y onto it. Nothing about the projection argument cared how many columns " +
            "X had, which is why the whole apparatus generalises for free.",
        },
      ],
    },

    {
      heading: "What a coefficient means now",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "βⱼ in simple regression",
              description:
                "The average change in Y per unit of Xⱼ, over the whole population — everything else moves as it naturally does.",
            },
            {
              term: "βⱼ in multiple regression",
              description:
                "The average change in Y per unit of Xⱼ among units identical in every other predictor in the model. The partial effect.",
            },
          ],
        },
        {
          kind: "prose",
          text:
            "These agree only when Xⱼ is uncorrelated with every other predictor. In observational " +
            "data that essentially never happens, so the two numbers are generally different — and " +
            "reporting one while describing the other is a common and consequential error.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Regression by residuals: what 'partial' literally means",
          text:
            "β̂ⱼ can be computed in three steps without ever fitting the full model. Regress Xⱼ on " +
            "all the other predictors and keep the residuals — the part of Xⱼ nothing else explains. " +
            "Regress y on those same other predictors and keep its residuals. Then regress the " +
            "second set of residuals on the first: the slope is exactly β̂ⱼ. This is the " +
            "Frisch–Waugh–Lovell theorem, and it makes 'controlling for the other variables' " +
            "concrete: only the variation in Xⱼ that is orthogonal to the others is used at all.",
        },
      ],
    },

    {
      heading: "Why adding a predictor moves the others",
      blocks: [
        {
          kind: "prose",
          text:
            "When predictors are correlated they compete to explain the same variation in Y. Adding " +
            "a new correlated predictor changes how that shared variation is attributed, so every " +
            "existing coefficient can move — not because the data changed, but because the question " +
            "each coefficient answers changed. β̂₁ went from 'holding nothing fixed' to 'holding " +
            "the new variable fixed'.",
        },
        {
          kind: "example",
          title: "A coefficient that flips sign",
          problem:
            "Regressing ice-cream sales on the number of lifeguards on duty gives a strong positive " +
            "slope. Adding daily temperature to the model drives the lifeguard coefficient to " +
            "roughly zero and can push it slightly negative. What happened?",
          steps: [
            "Temperature drives both lifeguard staffing and ice-cream sales — it is a common cause of the two.",
            "In the simple regression, the lifeguard coefficient absorbs temperature's effect, because lifeguards proxy for hot days.",
            "Once temperature is in the model, the lifeguard coefficient uses only the variation in staffing that is orthogonal to temperature — extra guards on a day no hotter than average.",
            "That residual variation carries little or no signal about sales, so the coefficient collapses toward zero and its sign becomes noise.",
          ],
          answer:
            "The simple-regression slope was confounded. Neither number is 'wrong' — they answer different questions — but only the second is a candidate for a causal reading, and only if temperature was the only confounder.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Simpson's paradox is this effect at full strength",
          text:
            "A relationship positive in every subgroup can be negative in the pooled data, or vice " +
            "versa. Berkeley's 1973 admissions data showed a lower overall admission rate for women " +
            "than men while most individual departments favoured women — women applied " +
            "disproportionately to the most competitive departments. Adding department to the model " +
            "reverses the sign. Which model is right is a question about causal structure, not about " +
            "fit statistics: no goodness-of-fit measure can settle it.",
        },
      ],
    },

    {
      heading: "Multicollinearity",
      blocks: [
        {
          kind: "prose",
          text:
            "When predictors are strongly correlated with each other, the data contain little " +
            "information about their separate effects. The model as a whole may predict superbly " +
            "while every individual coefficient is unstable — a pattern with a distinctive " +
            "signature.",
        },
        {
          kind: "table",
          headers: ["Symptom", "What it looks like"],
          rows: [
            ["Inflated standard errors", "Wide confidence intervals on individually important-looking variables"],
            ["Insignificant t-tests, significant F-test", "No single predictor 'matters' but collectively they clearly do"],
            ["Unstable signs", "Coefficients flip when one observation is added or removed"],
            ["Implausible magnitudes", "Coefficients far larger than any subject-matter reasoning supports"],
            ["High VIF", "1/(1 − R²ⱼ) above 5 or 10 for the affected predictors"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Collinearity does not bias anything",
          text:
            "OLS remains unbiased under multicollinearity, and the model's predictions within the " +
            "observed range of X stay perfectly good. What suffers is the precision of individual " +
            "coefficients — Var(β̂) = σ²(XᵀX)⁻¹ blows up as XᵀX approaches singularity. So " +
            "collinearity is a problem for explanation and essentially not one for prediction, " +
            "which is why it can be safely ignored in some applications and not others.",
        },
      ],
    },

    {
      heading: "Categorical predictors and interactions",
      blocks: [
        {
          kind: "prose",
          text:
            "A categorical predictor with k levels enters as k − 1 indicator columns, one level held " +
            "out as the baseline. Each coefficient is then the difference in mean response between " +
            "that level and the baseline, holding the other predictors fixed. Including all k " +
            "indicators alongside an intercept makes the columns sum to the intercept column, " +
            "rendering XᵀX singular — the dummy-variable trap.",
        },
        {
          kind: "formula",
          latex: "Y = β₀ + β₁X₁ + β₂X₂ + β₃(X₁·X₂) + ε",
          caption: "An interaction term: the effect of X₁ now depends on the level of X₂.",
        },
        {
          kind: "prose",
          text:
            "The model is still linear in β, so nothing about the fitting changes. But " +
            "interpretation does: ∂E[Y]/∂X₁ = β₁ + β₃X₂, so β₁ alone is the effect of X₁ only at " +
            "X₂ = 0. Reading β₁ as 'the effect of X₁' in a model containing an interaction is a " +
            "standard mistake, and it is why interaction models are usually centred first — so that " +
            "X₂ = 0 means 'at the average', which is at least a real place.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.2–3.3, Multiple Linear Regression and Other Considerations" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.2.3, Multiple Regression from Simple Univariate Regression" },
    { source: "Wasserman, All of Statistics", locator: "§13.3, Multiple Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-02-ols-geometry-and-multiple-regression.md" },
  ],
};
