import type { WikiArticle } from "../types";

export const numericalAccuracyLeastSquaresWiki: WikiArticle = {
  conceptId: "numerical-accuracy-least-squares",

  summary:
    "Every least-squares algorithm gives the same answer in exact arithmetic and a different one in floating " +
    "point. How far the computed β̂ is from the true least-squares solution depends on the problem's " +
    "condition number and on how the algorithm treats it. Methods that form XᵀX square the condition " +
    "number; orthogonal methods do not. For well-conditioned problems the difference is invisible; for " +
    "ill-conditioned ones it is the difference between several correct digits and none.",

  sections: [
    {
      heading: "Condition numbers",
      blocks: [
        {
          kind: "formula",
          latex: "κ(X) = \\frac{d_{max}}{d_{min}},   \\frac{‖δβ̂‖}{‖β̂‖} ≲ κ(X) \\frac{‖δX‖}{‖X‖} + κ(X)² \\frac{‖e‖}{‖X‖‖β̂‖}\\frac{‖δX‖}{‖X‖}",
          caption: "Sensitivity of the exact least-squares solution to perturbations: a κ term, and a κ² term weighted by the residual size.",
        },
        {
          kind: "prose",
          text:
            "Even a perfect algorithm cannot beat the problem's inherent sensitivity. A stable algorithm " +
            "(Householder QR) achieves roughly that bound; the normal equations have error proportional to " +
            "κ² even when the residuals are small, because forming XᵀX has already squared κ.",
        },
        {
          kind: "table",
          headers: ["κ(X)", "Digits lost, QR (small residuals)", "Digits lost, normal equations"],
          rows: [["10²", "≈ 2", "≈ 4"], ["10⁴", "≈ 4", "≈ 8"], ["10⁶", "≈ 6", "≈ 12"], ["10⁸", "≈ 8", "all 16 — may fail outright"]],
          caption: "Rough guide in double precision (about 16 significant digits).",
        },
      ],
    },

    {
      heading: "Where ill-conditioning comes from",
      blocks: [
        {
          kind: "list",
          items: [
            "Collinearity among predictors — the statistical near-dependencies of Chapter 9.",
            "Columns with very different scales (e.g. income in dollars next to a proportion).",
            "A predictor far from zero relative to its spread, nearly collinear with the intercept column.",
            "Polynomial terms in an uncentred x.",
          ],
        },
        {
          kind: "example",
          title: "Centering a year variable",
          problem:
            "x = year takes values 2001 to 2010 in a model with an intercept. Why does centering help numerically, and what does it change statistically?",
          steps: [
            "Uncentred, the x column is almost 2005 times the intercept column: nearly collinear, so κ(X) is huge (over a million).",
            "Centred, x − 2005.5 is orthogonal to the intercept column, and κ drops to near 3.",
            "Statistically nothing changes: same fit, same slope, and the intercept is just reparametrised.",
          ],
          answer: "Centering removes a purely numerical ill-conditioning without changing the model.",
        },
      ],
    },

    {
      heading: "Comparing the methods",
      blocks: [
        {
          kind: "table",
          headers: ["Method", "Flops (n ≫ p)", "Accuracy", "Use when"],
          rows: [
            ["Cholesky on XᵀX", "≈ np²", "κ² sensitivity", "Well-conditioned, very large n, streaming data"],
            ["Householder QR", "≈ 2np²", "κ (plus κ² × residual term)", "The general-purpose default"],
            ["SVD", "≈ 2np² + O(p³) and more", "Like QR, plus rank information", "Rank deficiency or near-deficiency matters"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Accurate data make accuracy matter less",
          text:
            "Seber & Lee (§11.8.3) point out that if the data are only good to three or four significant " +
            "figures, the statistical uncertainty in β̂ from that measurement error dwarfs any rounding error " +
            "an algorithm introduces, unless the problem is badly conditioned. Numerical accuracy matters " +
            "precisely in the ill-conditioned cases where the statistics are also fragile.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.7, Centering the Data" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§11.8, Comparing Methods (resources, efficiency, accuracy)" },
  ],
};
