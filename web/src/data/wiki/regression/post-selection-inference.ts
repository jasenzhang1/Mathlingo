import type { WikiArticle } from "../types";

export const postSelectionInferenceWiki: WikiArticle = {
  conceptId: "post-selection-inference",

  summary:
    "The t-tests, intervals and R² printed for a model assume the model was fixed before the data were seen. " +
    "When the data chose the model, those numbers are conditional on having survived the selection, and " +
    "the conditioning distorts them in a predictable direction: coefficients of selected variables are " +
    "biased away from zero, standard errors are too small, p-values are too small, and fit looks better " +
    "than it will on new data.",

  sections: [
    {
      heading: "Why selection biases estimates",
      blocks: [
        {
          kind: "prose",
          text:
            "A variable is kept when its estimate happens to be large relative to its standard error. For a " +
            "variable with a modest true effect, the samples in which it is selected are disproportionately " +
            "those where noise pushed β̂ⱼ up. Conditional on selection, E(β̂ⱼ | selected) is therefore larger in " +
            "magnitude than βⱼ — the winner's curse. Seber & Lee (§12.7) study these conditional " +
            "distributions directly.",
        },
        {
          kind: "example",
          title: "Freedman's paradox",
          problem:
            "Fifty pure-noise predictors are screened against a pure-noise response with n = 100, keeping those with p < 0.25, and the model is refitted with the survivors. What happens?",
          steps: [
            "About 50 × 0.25 ≈ 12 variables survive the screen by chance.",
            "In the refitted model, several of them typically look individually significant at 5%, and the overall F-test is often significant.",
            "Every one of those apparent effects is an artefact of selection.",
          ],
          answer: "A 'significant' model built entirely from noise — the standard illustration that post-selection p-values mean little.",
        },
      ],
    },

    {
      heading: "What goes wrong, item by item",
      blocks: [
        {
          kind: "table",
          headers: ["Quantity", "Effect of data-driven selection"],
          rows: [
            ["Selected coefficients", "Biased away from zero"],
            ["Standard errors", "Too small — they ignore selection variability"],
            ["p-values and confidence intervals", "Too small / too narrow; coverage below nominal"],
            ["R², s², Cp of the chosen model", "Optimistic"],
            ["Prediction error on new data", "Larger than the selected model's fit suggests"],
          ],
        },
      ],
    },

    {
      heading: "Remedies",
      blocks: [
        {
          kind: "list",
          items: [
            "Sample splitting: select on one part of the data, estimate and test on the other. Valid, at the cost of efficiency.",
            "Pre-specify the model, or the analysis plan, for the questions that require formal inference.",
            "Selective inference: compute p-values and intervals from the distribution conditional on the selection event, available in closed form for the lasso and stepwise procedures.",
            "Assess the whole procedure, not the final model: bootstrap the entire selection-plus-fit pipeline, or estimate prediction error by cross-validation that repeats the selection within each fold.",
            "For prediction, averaging over models (Bayesian model averaging, bagging) or shrinkage avoids committing to one selection.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Comparing methods honestly",
          text:
            "Seber & Lee's closing comparison (§12.9) judges selection methods by the prediction error of the " +
            "final model on new data, averaged over the randomness of the selection — never by the fit " +
            "statistics the procedure reports about itself.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§12.7, Effect of Model Selection on Inference" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§12.9, Comparison of Methods" },
  ],
};
