import type { WikiArticle } from "../types";

export const leastAngleRegressionWiki: WikiArticle = {
  conceptId: "least-angle-regression",

  summary:
    "Forward stepwise selection adds a variable and jumps straight to its least-squares fit; forward stagewise inches " +
    "forward in tiny steps. Least angle regression (LARS) is the efficient middle way: it moves the fit toward the " +
    "most correlated predictor only until another predictor is equally correlated with the residual, then moves along " +
    "the direction that keeps them tied. With one extra rule it traces the whole lasso path in about as many steps as there are variables.",

  sections: [
    {
      heading: "The algorithm",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Standardize the columns ($\\lVert\\mathbf{X}_j\\rVert = 1$), centre $Y$, start at $\\hat{\\boldsymbol{\\beta}} = \\mathbf{0}$.",
            "Compute correlations with the residual, $c_j = \\mathbf{X}_j^T\\mathbf{e}$. The active set $A$ holds the predictors with the largest $|c_j|$.",
            "Move the fit along the equiangular unit vector $\\mathbf{u}_A \\propto \\mathbf{X}_A(\\mathbf{X}_A^T\\mathbf{X}_A)^{-1}\\mathbf{s}_A$ ($\\mathbf{s}_A$ the signs), which lowers every active $|c_j|$ at the same rate.",
            "Stop when an inactive predictor's $|c_j|$ catches up; add it to $A$ and recompute the direction.",
            "After $\\min(p, n - 1)$ steps the fit reaches least squares.",
          ],
        },
        {
          kind: "formula",
          latex: "\\hat{\\gamma} = \\min_{j \\notin A}{}^{+}\\left\\lbrace\\frac{C - c_j}{A_A - a_j},\\; \\frac{C + c_j}{A_A + a_j}\\right\\rbrace, \\qquad a_j = \\mathbf{X}_j^T\\mathbf{u}_A",
          caption: "$C$ is the common active correlation, $A_A$ the rate at which it falls; $\\min^+$ takes the smallest positive value.",
        },
      ],
    },

    {
      heading: "A two-predictor example",
      blocks: [
        {
          kind: "example",
          title: "LARS with two correlated predictors",
          problem:
            "Unit-norm predictors have $\\mathbf{X}_1^T\\mathbf{X}_2 = 0.5$, and $\\mathbf{X}^T Y = [0.8, 0.6]$. Trace LARS.",
          steps: [
            "$X_1$ has the larger correlation and enters. Moving $\\beta_1$ by $\\gamma$ changes the correlations to $c_1 = 0.8 - \\gamma$ and $c_2 = 0.6 - 0.5\\gamma$.",
            "They tie when $0.8 - \\gamma = 0.6 - 0.5\\gamma$, i.e. $\\gamma = 0.4$: $\\hat{\\boldsymbol{\\beta}} = [0.4, 0]$ with common correlation $0.4$.",
            "With $\\mathbf{s} = [1, 1]$ and a symmetric Gram matrix, the equiangular move raises both coefficients equally, ending at OLS: $\\hat{\\boldsymbol{\\beta}}_{OLS} = \\frac{1}{0.75}\\begin{bmatrix}1 & -0.5 \\\\ -0.5 & 1\\end{bmatrix}\\begin{bmatrix}0.8 \\\\ 0.6\\end{bmatrix} \\approx [0.667, 0.267]$.",
          ],
          answer:
            "The path runs straight from $[0, 0]$ to $[0.4, 0]$, then straight to $[0.667, 0.267]$. The kink is where $X_2$ enters; the lasso with $\\lambda/2 = 0.4$ is exactly $[0.4, 0]$.",
        },
      ],
    },

    {
      heading: "Lasso and stagewise connections",
      blocks: [
        {
          kind: "prose",
          text:
            "The lasso's KKT conditions say every active predictor has $|\\mathbf{X}_j^T\\mathbf{e}| = \\lambda/2$, with $\\text{sign}(\\hat{\\beta}_j)$ equal to the sign of its correlation, " +
            "and every inactive one has $|\\mathbf{X}_j^T\\mathbf{e}| \\le \\lambda/2$. LARS maintains the equal-correlation part automatically. " +
            "The one modification: if an active coefficient would cross zero before the next entry, stop there, drop it from $A$ and continue. " +
            "The result is the entire piecewise-linear lasso path.",
        },
        {
          kind: "prose",
          text:
            "Forward stagewise with a tiny step $\\eta$ repeatedly nudges the most correlated coefficient by $\\pm\\eta$. When several predictors tie, " +
            "the nudges alternate between them and approximate an equiangular move. As $\\eta \\to 0$ stagewise traces a monotone version of the lasso path, " +
            "identical to it when no lasso coefficient ever shrinks back toward zero. Gradient boosting with linear base learners and a small learning rate is the same algorithm.",
        },
        {
          kind: "table",
          headers: ["Method", "Step", "Path"],
          rows: [
            ["Forward stepwise", "Add a variable, refit fully", "Jumps; nested models"],
            ["Forward stagewise", "Tiny step on the most correlated coefficient", "Smooth staircase; implicit $\\ell_1$ penalty"],
            ["LARS", "Equiangular move until the next tie", "Piecewise linear"],
            ["LARS–lasso", "LARS plus drop when a coefficient hits zero", "Exact lasso path"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Correlated predictors make selection unstable",
          text:
            "When two predictors are nearly collinear their residual correlations are nearly equal, so which one enters first can flip with small data changes. The fit is stable; the selected set is not.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning (2nd ed.)", locator: "§3.4.4, Least Angle Regression; §3.8.1, Incremental Forward Stagewise Regression" },
    { source: "Efron, Hastie, Johnstone & Tibshirani, “Least Angle Regression”, Annals of Statistics 2004", locator: "The algorithm and the lasso modification" },
  ],
};
