import type { WikiArticle } from "../types";

export const effectOfAddingAnotherVariableWiki: WikiArticle = {
  conceptId: "effect-of-adding-another-variable",

  summary:
    "Adding a predictor to a regression has four separate consequences, and confusing them causes " +
    "most bad model-building. R² can only go up, always, even for pure noise. Adjusted R² can go " +
    "down. The existing coefficients change whenever the new predictor is correlated with them. " +
    "And the standard errors of those coefficients inflate. Deciding whether to add a variable " +
    "means weighing a guaranteed gain in fit against a real loss in precision — and, if the model " +
    "is meant to be interpreted, against whether the variable belongs there causally at all.",

  sections: [
    {
      heading: "The four consequences",
      blocks: [
        {
          kind: "table",
          headers: ["Quantity", "Effect of adding a predictor", "Guaranteed?"],
          rows: [
            ["SSE", "Decreases or stays the same", "Yes, always"],
            ["R²", "Increases or stays the same", "Yes, always"],
            ["Adjusted R²", "Up or down", "No — down when the gain is small"],
            ["Other coefficients β̂ⱼ", "Change unless the new column is orthogonal to Xⱼ", "No"],
            ["SE(β̂ⱼ)", "Inflates by √VIFⱼ", "Effectively yes, unless orthogonal"],
            ["Residual degrees of freedom", "Falls by one", "Yes, always"],
          ],
        },
        {
          kind: "prose",
          text:
            "The first two follow from the geometry: the new column enlarges C(X), the old fit " +
            "remains available inside the larger space, and OLS picks the closest point — so the " +
            "distance to y cannot grow. The rest depend entirely on the correlation between the new " +
            "predictor and the ones already present.",
        },
      ],
    },

    {
      heading: "Adjusted R² and why it can fall",
      blocks: [
        {
          kind: "formula",
          latex: "R²_adj = 1 − (SSE/(n − p − 1)) / (SST/(n − 1))",
          caption: "Each sum of squares divided by its own degrees of freedom before the ratio is taken.",
        },
        {
          kind: "prose",
          text:
            "Adding a predictor shrinks SSE in the numerator but also shrinks n − p − 1 in its " +
            "denominator. Whether the ratio SSE/(n − p − 1) falls depends on which shrinks " +
            "proportionally more — so a predictor earns its place only if the fit improvement " +
            "exceeds what a degree of freedom costs.",
        },
        {
          kind: "example",
          title: "A predictor that fails to pay for itself",
          problem:
            "n = 100, SST = 1000. A 3-predictor model has SSE = 400. Adding a fourth predictor takes " +
            "SSE to 397. Compare R² and adjusted R².",
          steps: [
            "Before: R² = 1 − 400/1000 = 0.600. After: R² = 1 − 397/1000 = 0.603 — an increase, as guaranteed.",
            "SST/(n − 1) = 1000/99 ≈ 10.101, the same for both models.",
            "Before: SSE/(n − p − 1) = 400/96 ≈ 4.167, so R²_adj = 1 − 4.167/10.101 ≈ 0.5875.",
            "After: 397/95 ≈ 4.179, so R²_adj = 1 − 4.179/10.101 ≈ 0.5863.",
          ],
          answer:
            "R² rose from 0.600 to 0.603 while adjusted R² fell from 0.5875 to 0.5863. The 3-point drop in SSE was not worth the degree of freedom — R² says add it, adjusted R² says do not.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Adjusted R² is a weak penalty",
          text:
            "Its penalty corresponds roughly to keeping any predictor whose t-statistic exceeds 1 — " +
            "far more permissive than a significance test, and more permissive than AIC or BIC. It " +
            "is a fix for R²'s worst flaw, not a good model-selection criterion in its own right.",
        },
      ],
    },

    {
      heading: "The partial F-test",
      blocks: [
        {
          kind: "prose",
          text:
            "The formal way to ask whether a group of predictors earns its place is to compare " +
            "nested models directly: does the reduction in SSE exceed what chance alone would give?",
        },
        {
          kind: "formula",
          latex: "F = [(SSE_red − SSE_full) / (p_full − p_red)] / [SSE_full / (n − p_full − 1)]",
          caption: "Under H₀ (the extra coefficients are all zero) this follows F(p_full − p_red, n − p_full − 1).",
        },
        {
          kind: "list",
          items: [
            "With one extra predictor the statistic equals the square of that coefficient's t-statistic — the two tests are identical.",
            "With p_red = 0 it reduces to the overall ANOVA F-test.",
            "The models must be nested: the reduced model's predictors must be a subset of the full model's. Comparing non-nested models needs AIC, BIC or cross-validation instead.",
            "Both models must be fitted on exactly the same rows. Dropping a predictor that had missing values silently changes the sample and invalidates the comparison.",
          ],
        },
      ],
    },

    {
      heading: "Significant F, insignificant t",
      blocks: [
        {
          kind: "prose",
          text:
            "A characteristic and initially baffling output: the overall F-test is highly " +
            "significant, R² is respectable, and not one individual coefficient reaches " +
            "significance. Nothing is broken — this is what multicollinearity looks like.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The model knows something the coefficients cannot say",
          text:
            "The F-test asks whether the predictors collectively explain variation in y — and " +
            "correlated predictors collectively explain a great deal. Each t-test asks whether one " +
            "predictor explains variation the others do not, and with predictors that move together " +
            "there is almost no such unique variation left. The standard errors inflate accordingly. " +
            "The joint signal is real; its attribution to individual variables is what the data " +
            "cannot support. VIF quantifies exactly this, and ridge regression is the standard " +
            "response.",
        },
      ],
    },

    {
      heading: "Adding a variable for prediction versus for explanation",
      blocks: [
        {
          kind: "table",
          headers: ["", "Prediction", "Explanation"],
          rows: [
            ["Criterion", "Does held-out error fall?", "Does the causal structure require it?"],
            ["Correlated predictors", "Harmless — often helpful", "Dangerous — coefficients become hard to read"],
            ["A downstream variable (a mediator)", "Often helps", "Blocks the effect you were trying to measure"],
            ["A common effect of X and Y (a collider)", "May help", "Creates bias where there was none"],
            ["Too many predictors", "Overfitting; caught by cross-validation", "Each addition changes what the others mean"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "More controls is not more careful",
          text:
            "'Controlling for' a variable is a causal claim, and it can create bias rather than " +
            "remove it. Conditioning on a mediator removes exactly the effect you set out to " +
            "estimate. Conditioning on a collider — a variable both X and Y influence — induces a " +
            "spurious association between them where none existed. Neither shows up as a worse fit, " +
            "so no regression diagnostic will warn you. Which variables belong in the model is a " +
            "question the data cannot answer.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.2.2, Some Important Questions" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.3, Subset Selection" },
    { source: "Wasserman, All of Statistics", locator: "§13.6, Model Selection" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-03-model-fit-and-diagnostics.md" },
  ],
};
