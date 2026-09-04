import type { WikiArticle } from "../types";

export const rSquaredWiki: WikiArticle = {
  conceptId: "r-squared",

  summary:
    "R² is the fraction of the response's total variation that the model accounts for: SSR/SST, " +
    "equivalently 1 − SSE/SST. In simple linear regression it is exactly the squared Pearson " +
    "correlation, which is where the name comes from. Its one structural flaw drives most of the " +
    "rest of this domain: R² can never decrease when a predictor is added, so it cannot be used to " +
    "choose between models of different sizes — which is why adjusted R², AIC, BIC and " +
    "cross-validation exist.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "R² = SSR/SST = 1 − SSE/SST",
          caption: "The two forms are identical because SST = SSR + SSE.",
        },
        {
          kind: "prose",
          text:
            "The denominator is the variation of y around its own mean — the error a model that " +
            "ignored the predictors entirely and always predicted ȳ would make. R² therefore " +
            "measures improvement over that baseline. R² = 0 means the model does no better than " +
            "the mean; R² = 1 means every residual is zero.",
        },
        {
          kind: "definitions",
          items: [
            { term: "R² = 0.0", description: "The predictors explain nothing beyond the mean. Fitted values are flat." },
            { term: "R² = 0.64", description: "64% of the variance in y is accounted for; in simple regression this is r = ±0.8." },
            { term: "R² = 1.0", description: "A perfect in-sample fit. With p + 1 = n this is automatic and carries no information." },
            { term: "R² < 0", description: "Only possible without an intercept, or when evaluating a fitted model on new data — it means doing worse than predicting the mean." },
          ],
        },
      ],
    },

    {
      heading: "Why R² equals r² in simple regression",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "In simple regression ŷᵢ − ȳ = β̂₁(xᵢ − x̄), because the fitted line passes through (x̄, ȳ).",
            "So SSR = β̂₁²Σ(xᵢ − x̄)².",
            "Substitute β̂₁ = r·(s_Y/s_X): SSR = r²(s_Y²/s_X²)·Σ(xᵢ − x̄)².",
            "But Σ(xᵢ − x̄)² = (n − 1)s_X², so the s_X² cancels, leaving SSR = r²(n − 1)s_Y².",
            "And SST = (n − 1)s_Y², so R² = SSR/SST = r².",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The identity is specific to one predictor",
          text:
            "With several predictors R² equals the squared correlation between y and ŷ — the " +
            "multiple correlation coefficient — not the squared correlation with any individual " +
            "predictor. Squaring also destroys the sign: R² = 0.64 is consistent with r = +0.8 and " +
            "with r = −0.8, so a strongly negative relationship and a strongly positive one look " +
            "identical through R² alone.",
        },
        {
          kind: "example",
          title: "From correlation to R² and back",
          problem: "A simple regression reports r = 0.8. What is R²? A different one reports R² = 0.49 with a negative slope. What is r?",
          steps: [
            "R² = r² = 0.8² = 0.64.",
            "r = ±√0.49 = ±0.7, and the sign of r matches the sign of the slope.",
          ],
          answer: "R² = 0.64; r = −0.7.",
        },
      ],
    },

    {
      heading: "R² never decreases when a predictor is added",
      blocks: [
        {
          kind: "prose",
          text:
            "Adding a column to X enlarges the column space C(X). The old fit is still available in " +
            "the enlarged space — set the new coefficient to zero — and OLS chooses the point of " +
            "the space closest to y. A larger set of candidates cannot contain a worse best element, " +
            "so SSE cannot increase, so R² cannot decrease.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "This holds for pure noise too",
          text:
            "Add a column of random numbers with no relationship to y and R² still rises, typically " +
            "by about 1/(n − p − 1). Add n − 1 such columns and R² reaches exactly 1: the model " +
            "interpolates every point and explains 100% of the variance while knowing nothing. R² " +
            "measures how much flexibility the model had, not how much signal it found — which is " +
            "the precise sense in which comparing raw R² across models of different sizes is not a " +
            "comparison at all.",
        },
        {
          kind: "formula",
          latex: "R²_adj = 1 − [SSE/(n − p − 1)] / [SST/(n − 1)]",
          caption: "Adjusted R²: the same ratio, with each sum of squares divided by its degrees of freedom.",
        },
        {
          kind: "prose",
          text:
            "The adjustment compares mean squares rather than sums of squares, so adding a predictor " +
            "raises adjusted R² only if the reduction in SSE outweighs the cost of the lost degree " +
            "of freedom. A useless predictor therefore lowers it. Adjusted R² is always less than or " +
            "equal to R², can be negative, and — unlike R² — is at least a legitimate basis for " +
            "comparing nested models, though AIC and BIC rest on firmer theory.",
        },
      ],
    },

    {
      heading: "What R² does not tell you",
      blocks: [
        {
          kind: "table",
          headers: ["Question", "Does R² answer it?"],
          rows: [
            ["How much of y's variation does the model account for, in this sample?", "Yes — that is exactly its definition"],
            ["Is the linear model the right shape?", "No — a curved relationship can give a high R²"],
            ["Will the model predict new data well?", "No — that is test error, and R² is a training-set quantity"],
            ["Are the coefficients unbiased?", "No — R² is unaffected by omitted variable bias"],
            ["Is the relationship causal?", "No, and no statistic computed from this data can be"],
            ["Is the model useful?", "Not by itself — the acceptable range is entirely field-dependent"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "There is no universal threshold",
          text:
            "R² = 0.05 is a strong result in cross-sectional social science, where individual " +
            "behaviour is mostly idiosyncratic; R² = 0.95 can signal a serious problem in physics " +
            "or engineering, where it might mean a variable has leaked into the model. In finance, " +
            "predicting 1% of the variance in returns is a business. 'Is this R² good?' has no " +
            "answer that does not name a field and a purpose.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The out-of-sample version is the honest one",
          text:
            "Compute 1 − SSE/SST on held-out data and the guarantees disappear: the quantity can be " +
            "negative, and it drops as soon as extra predictors start fitting noise. That is the " +
            "measure to report when the question is predictive, and its divergence from training R² " +
            "is a direct read on overfitting.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.1.3 and §6.1.3, R² and Adjusted R²" },
    { source: "Wasserman, All of Statistics", locator: "§13.2, The Coefficient of Determination" },
    { source: "NIST/SEMATECH e-Handbook of Statistical Methods", locator: "§4.4.4, Assessing Model Adequacy" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-03-model-fit-and-diagnostics.md" },
  ],
};
