import type { WikiArticle } from "../types";

export const regressionThroughTheOriginWiki: WikiArticle = {
  conceptId: "regression-through-the-origin",

  summary:
    "When theory says y must be zero when x is zero — distance travelled at zero time, cost of zero units — " +
    "it is tempting to drop the intercept. The model y = βx + ε has a one-line estimator and one more " +
    "residual degree of freedom, but it gives up guarantees the intercept was quietly providing: residuals " +
    "no longer sum to zero, and the R² software prints is measured against a different baseline and cannot " +
    "be compared with the usual one.",

  sections: [
    {
      heading: "The estimator",
      blocks: [
        {
          kind: "formula",
          latex: "β̂ = \\frac{Σxᵢyᵢ}{Σxᵢ²},   Var(β̂) = \\frac{σ²}{Σxᵢ²},   s² = \\frac{Σ(yᵢ − β̂xᵢ)²}{n − 1}",
        },
        {
          kind: "prose",
          text:
            "Note the uncentred sums: Σxᵢ², not Σ(xᵢ − x̄)². Since Σxᵢ² ≥ Σ(xᵢ − x̄)², the slope through the " +
            "origin is estimated more precisely than the slope of a line with an intercept — if the no-" +
            "intercept model is right. If it is wrong, β̂ is biased, because it is forced to bend the line " +
            "toward the origin.",
        },
      ],
    },

    {
      heading: "What the intercept was doing for you",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "With intercept", "Through the origin"],
          rows: [
            ["Σeᵢ = 0", "Always", "Not in general — only Σxᵢeᵢ = 0"],
            ["Fitted line passes through (x̄, ȳ)", "Always", "Not in general"],
            ["R² baseline", "Σ(yᵢ − ȳ)² (centred)", "Σyᵢ² (uncentred)"],
            ["Residual df", "n − 2", "n − 1"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The no-intercept R² is not comparable",
          text:
            "Software typically reports R² = Σŷᵢ²/Σyᵢ² for a no-intercept fit, which compares the model with " +
            "predicting zero rather than predicting ȳ. When the y values are far from zero this is close to 1 " +
            "almost automatically, and it can be higher than the R² of a model with an intercept that fits " +
            "strictly better. Compare the two models by their residual sums of squares instead.",
        },
      ],
    },

    {
      heading: "Should you drop the intercept?",
      blocks: [
        {
          kind: "list",
          items: [
            "Fit the model with an intercept first and test β₀ = 0; drop it only if theory and data agree.",
            "Even when y = 0 at x = 0 physically, the relationship may not be linear all the way down; if the data are far from the origin, an intercept is a local-linearity device, not a claim about x = 0.",
            "In a ratio setting (y proportional to x with variance proportional to x), weighted least squares through the origin gives the ratio estimator Σyᵢ/Σxᵢ (Seber & Lee §6.3).",
          ],
        },
        {
          kind: "example",
          title: "Fitting through the origin",
          problem: "Three points (1, 2), (2, 5), (3, 5). Fit y = βx and compute the residual sum.",
          steps: [
            "Σxᵢyᵢ = 2 + 10 + 15 = 27; Σxᵢ² = 1 + 4 + 9 = 14.",
            "β̂ = 27/14 ≈ 1.929.",
            "Residuals: 2 − 1.929 = 0.071, 5 − 3.857 = 1.143, 5 − 5.786 = −0.786; their sum is ≈ 0.429, not zero.",
          ],
          answer: "β̂ = 27/14 ≈ 1.93, and the residuals do not sum to zero.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§6.2, Straight Line through the Origin" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§6.3, Weighted Least Squares for the Straight Line" },
  ],
};
