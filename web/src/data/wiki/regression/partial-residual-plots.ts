import type { WikiArticle } from "../types";

export const partialResidualPlotsWiki: WikiArticle = {
  conceptId: "partial-residual-plots",

  summary:
    "A scatterplot of y against one predictor in a multiple regression is misleading: it shows the " +
    "predictor's total association, contaminated by everything correlated with it. Two plots isolate the " +
    "predictor's role in the fitted model. The added-variable plot shows what the predictor adds after the " +
    "others, and is exact for the coefficient and for influence. The component-plus-residual plot keeps " +
    "the predictor on its original scale, which makes it the better tool for spotting curvature.",

  sections: [
    {
      heading: "Added-variable (partial regression) plot",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{plot } M_{(j)}y \\text{ against } M_{(j)}xⱼ",
          caption: "M₍ⱼ₎ residualises on every column except xⱼ.",
        },
        {
          kind: "list",
          items: [
            "Its least-squares slope through the origin is exactly β̂ⱼ from the full model (Frisch–Waugh–Lovell).",
            "Its residuals are exactly the full model's residuals.",
            "Points far out on the horizontal axis have high leverage for β̂ⱼ specifically, so the plot shows which cases drive that coefficient.",
            "A tight cloud with no slope means xⱼ adds nothing once the others are in, however strongly it correlates with y marginally.",
          ],
        },
      ],
    },

    {
      heading: "Component-plus-residual (partial residual) plot",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{plot } e + β̂ⱼxⱼ \\text{ against } xⱼ",
        },
        {
          kind: "prose",
          text:
            "The vertical axis adds the fitted linear component of xⱼ back to the residuals. The least-squares " +
            "slope of the plot is again β̂ⱼ, but the horizontal axis is xⱼ itself rather than a residualised " +
            "version, so a curved relationship between y and xⱼ shows up as curvature against the actual " +
            "scale of xⱼ — exactly what you need to choose a transformation of xⱼ.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Collinearity can distort both",
          text:
            "When xⱼ is highly correlated with other predictors, M₍ⱼ₎xⱼ has little spread and the added-variable " +
            "plot compresses; and curvature in another, correlated predictor can leak into a component-plus-" +
            "residual plot. Refinements such as CERES plots (Seber & Lee §10.3.1) adjust for the leakage.",
        },
      ],
    },

    {
      heading: "Choosing between them",
      blocks: [
        {
          kind: "table",
          headers: ["Question", "Better plot"],
          rows: [
            ["Does xⱼ belong in the model at all?", "Added-variable"],
            ["Which cases drive β̂ⱼ?", "Added-variable"],
            ["Is the effect of xⱼ linear? What transformation?", "Component-plus-residual"],
            ["What is the partial slope?", "Either — both have slope β̂ⱼ"],
          ],
        },
        {
          kind: "example",
          title: "Reading off the slope",
          problem:
            "In an added-variable plot for x₂, Σ(M₍₂₎x₂)ᵢ(M₍₂₎y)ᵢ = 24 and Σ(M₍₂₎x₂)ᵢ² = 8. What is β̂₂ in the full model?",
          steps: ["β̂₂ = 24/8 = 3, the slope through the origin of the plot."],
          answer: "β̂₂ = 3.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.3.1, Visualizing Regression Surfaces" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§10.3.2–10.3.3, Transforming to Remove Curvature; Adding and Deleting Variables" },
  ],
};
