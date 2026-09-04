import type { WikiArticle } from "../types";

export const polynomialRegressionWiki: WikiArticle = {
  conceptId: "polynomial-regression",

  summary:
    "Polynomial regression fits a curve by adding powers of a predictor — x², x³, and so on — as extra " +
    "columns of an otherwise ordinary linear model. Nothing about the fitting procedure changes: it is " +
    "still solved by the same normal equations, still has the same geometric picture as a projection, " +
    "and is 'linear regression' in the only sense that matters for that machinery, since it is linear " +
    "in the coefficients. What changes is entirely in how the model is read and how easily it goes " +
    "wrong at the edges of the data.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "Y = β₀ + β₁X + β₂X² + ⋯ + β_d X^d + ε",
          caption: "A degree-d polynomial in X — still linear in the βs.",
        },
        {
          kind: "prose",
          text:
            "Build the design matrix with columns X⁰, X¹, …, X^d and hand it to ordinary least squares. " +
            "The fitting problem does not know or care that the second column happens to be the square " +
            "of the first — XᵀXβ̂ = Xᵀy is solved exactly as before, because the model is linear in β " +
            "even though the fitted curve is not a straight line in x.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "'Linear' constrains the coefficients, not the shape",
          text:
            "This is the same point multiple-linear-regression's opening insight makes, taken to its " +
            "natural conclusion: linearity in the parameters is what licenses the closed-form solution, " +
            "and it says nothing about whether the resulting curve is straight. A cubic through the data " +
            "is exactly as much a linear model as a straight line through it.",
        },
      ],
    },

    {
      heading: "Choosing the degree",
      blocks: [
        {
          kind: "table",
          headers: ["Degree d", "Behaviour"],
          rows: [
            ["1", "Ordinary simple linear regression"],
            ["2", "One bend — a single interior maximum or minimum"],
            ["3", "Up to two bends — an inflection is now possible"],
            ["Large d", "Interpolates the training points almost exactly; wild oscillation between them"],
          ],
        },
        {
          kind: "prose",
          text:
            "Degree is a complexity knob exactly like the number of predictors in any other multiple " +
            "regression, and it is governed by the same forces: SSE can only fall as d rises — the " +
            "degree-(d−1) fit is still reachable by setting the new coefficient to zero — so R² alone " +
            "cannot choose d any more than it can choose which predictors to keep. AIC, BIC, adjusted " +
            "R², or cross-validation are the tools, not raw fit.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Runge's phenomenon: a high-degree fit can get worse, not better",
          text:
            "Past a certain degree, a polynomial forced through evenly spaced points develops large " +
            "oscillations near the edges of the data even as it fits the interior points more and more " +
            "exactly — the classic demonstration is Runge's function, 1/(1 + 25x²), where the error at " +
            "the boundary actually diverges as the degree grows. High-degree polynomial fits are used " +
            "far less than the bias-variance intuition alone would suggest, precisely because of this " +
            "edge instability — which is also why LOESS and splines, which fit many low-degree pieces " +
            "rather than one high-degree curve, are generally preferred once real flexibility is needed.",
        },
      ],
    },

    {
      heading: "Multicollinearity by construction",
      blocks: [
        {
          kind: "prose",
          text:
            "Over any positive range of x, the columns x and x² are strongly correlated — large x values " +
            "produce large x² values too, so the two columns move together even though they carry " +
            "different information. This drives up every VIF in the model even though nothing is wrong " +
            "with the data; it is a direct consequence of how the columns are constructed.",
        },
        {
          kind: "formula",
          latex: "x̃ = x − x̄,   fit β₀ + β₁x̃ + β₂x̃² + ⋯",
          caption: "Centring the predictor before raising it to powers.",
        },
        {
          kind: "prose",
          text:
            "Centring x at its mean before forming the powers removes most of this artificial " +
            "correlation — x̃ and x̃² are far less correlated than x and x² whenever the data does not " +
            "sit entirely on one side of zero — while leaving the fitted values and predictions " +
            "completely unchanged. It is the standard fix, and it is the same remedy vif's own wiki " +
            "recommends for exactly this situation.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Orthogonal polynomials remove the problem outright",
          text:
            "Rather than centring raw powers, some software fits combinations of the columns chosen to " +
            "be exactly uncorrelated with each other (Legendre-style orthogonal polynomials). The fitted " +
            "curve is identical either way — it is the same subspace of ℝⁿ being fitted — but the " +
            "individual coefficients become stable and each term's contribution can be tested one at a " +
            "time without collinearity contaminating the result.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Reading a quadratic fit",
          problem:
            "A fitted model is Ŷ = 10 + 4X − 0.5X². At what value of X is the fitted curve at its maximum, " +
            "and what is the fitted value there?",
          steps: [
            "The vertex of a·X² + b·X + c is at X = −b/(2a); here a = −0.5, b = 4.",
            "X = −4/(2×−0.5) = −4/−1 = 4.",
            "Ŷ(4) = 10 + 4(4) − 0.5(16) = 10 + 16 − 8.",
          ],
          answer: "The curve peaks at X = 4, with a fitted value of 18. Since a = −0.5 < 0, this is a maximum, not a minimum.",
        },
      ],
    },

    {
      heading: "Extrapolation is far more dangerous here than for a line",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "A polynomial's slope keeps changing, even where you have no data",
          text:
            "A fitted straight line extrapolates by continuing at a constant rate — often wrong, but at " +
            "least predictably so. A fitted polynomial's derivative keeps changing outside the observed " +
            "range, and high-order terms that were harmless inside the data can dominate and send " +
            "predictions to implausible extremes just past its edge. This is the single most common " +
            "practical failure of polynomial regression: a model that looked excellent in-sample used " +
            "to predict a case slightly outside the range it was fitted on.",
        },
        {
          kind: "prose",
          text:
            "This is also why polynomial regression is usually a diagnostic tool for interior shape " +
            "rather than a forecasting model: once a nonlinear relationship is found by fitting a low- " +
            "degree polynomial, or by a nonparametric method like LOESS, a mechanistic model grounded in " +
            "subject-matter theory is generally the safer choice for anything beyond the observed range.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§7.1, Polynomial Regression" },
    { source: "NIST/SEMATECH e-Handbook of Statistical Methods", locator: "§4.1.4.1, Polynomial Regression" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§5.1, Basis Expansions" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-04-model-selection-and-regularization.md" },
  ],
};
