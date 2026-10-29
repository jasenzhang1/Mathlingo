import type { WikiArticle } from "../types";

export const partialLeastSquaresWiki: WikiArticle = {
  conceptId: "partial-least-squares",

  summary:
    "Principal components regression compresses the predictors into a few directions of maximum variance, chosen " +
    "without looking at $Y$, so it can throw away exactly the direction that predicts. Partial least squares (PLS) " +
    "builds its components from the covariance with $Y$: each new component is the combination of predictors most " +
    "covariant with what is still unexplained. It usually needs fewer components than PCR and sits between OLS and PCR.",

  sections: [
    {
      heading: "The algorithm",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Standardize the columns of $\\mathbf{X}$ and centre $Y$. Set $\\tilde{\\mathbf{X}}^{(0)} = \\mathbf{X}$.",
            "Weights: $\\boldsymbol{\\phi}_m \\propto \\tilde{\\mathbf{X}}^{(m-1)T}Y$ (each predictor weighted by its covariance with $Y$), normalized to unit length.",
            "Component: $\\mathbf{z}_m = \\tilde{\\mathbf{X}}^{(m-1)}\\boldsymbol{\\phi}_m$; regress $Y$ on $\\mathbf{z}_m$ to get $\\hat{\\theta}_m = \\frac{\\mathbf{z}_m^T Y}{\\mathbf{z}_m^T\\mathbf{z}_m}$.",
            "Deflate: replace each column of $\\tilde{\\mathbf{X}}$ by its residual after regressing on $\\mathbf{z}_m$, so later components are orthogonal to $\\mathbf{z}_m$.",
            "Stop after $M$ components (chosen by cross-validation): $\\hat{Y} = \\sum_{m \\le M}\\hat{\\theta}_m\\mathbf{z}_m$.",
          ],
        },
        {
          kind: "formula",
          latex: "\\boldsymbol{\\phi}_m = \\arg\\max_{\\lVert\\boldsymbol{\\phi}\\rVert = 1}\\text{Cov}^2(\\mathbf{X}\\boldsymbol{\\phi}, Y) \\quad\\text{vs.}\\quad \\mathbf{v}_m = \\arg\\max_{\\lVert\\mathbf{v}\\rVert = 1}\\text{Var}(\\mathbf{X}\\mathbf{v})",
          caption: "PLS (left) versus PCR (right), each subject to orthogonality with the earlier components.",
        },
        {
          kind: "prose",
          text:
            "Since $\\text{Cov}^2(\\mathbf{X}\\boldsymbol{\\phi}, Y) = \\text{Corr}^2(\\mathbf{X}\\boldsymbol{\\phi}, Y)\\,\\text{Var}(\\mathbf{X}\\boldsymbol{\\phi})\\,\\text{Var}(Y)$, " +
            "PLS balances predictiveness (what OLS maximizes) against variance (what PCR maximizes).",
        },
      ],
    },

    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "One PLS component with orthogonal predictors",
          problem:
            "Two standardized, uncorrelated predictors have $\\text{Corr}(x_1, y) = 0.6$ and $\\text{Corr}(x_2, y) = 0.2$ (with $\\text{Var}(y) = 1$). Find the first PLS component, its coefficient and the implied $\\boldsymbol{\\beta}$.",
          steps: [
            "Weights $\\propto [0.6, 0.2]$; normalized $\\boldsymbol{\\phi}_1 \\approx [0.949, 0.316]$.",
            "$\\text{Var}(z_1) = 0.949^2 + 0.316^2 = 1$ (orthogonal unit-variance predictors) and $\\text{Cov}(z_1, y) = 0.949 \\cdot 0.6 + 0.316 \\cdot 0.2 \\approx 0.632$.",
            "$\\hat{\\theta}_1 \\approx 0.632$, so $\\boldsymbol{\\beta} = \\hat{\\theta}_1\\boldsymbol{\\phi}_1 \\approx [0.6, 0.2]$ and $R^2 = 0.632^2 = 0.4$.",
          ],
          answer:
            "One component already equals the OLS fit, because with $\\mathbf{X}^T\\mathbf{X} \\propto \\mathbf{I}$ the OLS direction is $\\mathbf{X}^T Y$ itself. PCR would face a tie (equal variances) and could pick either axis.",
        },
      ],
    },

    {
      heading: "Shrinkage, Krylov subspaces and caveats",
      blocks: [
        {
          kind: "prose",
          text:
            "The $M$-component PLS fit is OLS restricted to the Krylov subspace " +
            "$\\text{span}\\lbrace\\mathbf{X}^T Y, (\\mathbf{X}^T\\mathbf{X})\\mathbf{X}^T Y, \\dots, (\\mathbf{X}^T\\mathbf{X})^{M-1}\\mathbf{X}^T Y\\rbrace$; " +
            "it equals $M$ steps of conjugate gradient on the normal equations, and with $M = \\text{rank}(\\mathbf{X})$ it is OLS. " +
            "Like ridge and PCR it shrinks the OLS coefficients along the principal directions, but its shrinkage factors depend on $Y$, " +
            "are not monotone, and can exceed $1$ (PLS can expand some directions).",
        },
        {
          kind: "table",
          headers: ["Method", "Directions chosen using", "Shrinkage of principal direction k"],
          rows: [
            ["OLS", "—", "none ($1$)"],
            ["Ridge", "$\\mathbf{X}$ only", "$\\frac{d_k^2}{d_k^2 + \\lambda}$, smooth"],
            ["PCR", "$\\mathbf{X}$ only", "$1$ for the top $M$, else $0$"],
            ["PLS", "$\\mathbf{X}$ and $Y$", "data-dependent polynomial in $d_k^2$"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Degrees of freedom are more than M",
          text:
            "Because the components are chosen using $Y$, an $M$-component PLS fit uses more than $M$ effective degrees of freedom; naive $F$-tests and $C_p$ with $p = M$ are optimistic. Use cross-validation to choose $M$.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning (2nd ed.)", locator: "§3.5.2, Partial Least Squares; §3.6, Discussion: A Comparison of the Selection and Shrinkage Methods" },
    { source: "Frank & Friedman, “A Statistical View of Some Chemometrics Regression Tools”, Technometrics 1993", locator: "PLS versus ridge and PCR" },
  ],
};
