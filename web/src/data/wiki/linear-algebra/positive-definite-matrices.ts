import type { WikiArticle } from "../types";

export const positiveDefiniteMatrices: WikiArticle = {
  conceptId: "positive-definite-matrices",
  summary:
    "A symmetric matrix is positive definite when its quadratic form is strictly positive for every non-zero vector. It is the matrix analogue of a positive number, and it is the condition that makes a critical point a minimum, a covariance matrix valid, and a Cholesky factorisation exist.",
  sections: [
    {
      heading: "Definition and equivalents",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{x}^{\\top}A\\mathbf{x} > 0 \\quad \\text{for all } \\mathbf{x} \\ne \\mathbf{0}",
          caption: "Positive definite (symmetric $A$ assumed throughout)",
        },
        {
          kind: "table",
          headers: ["Equivalent test", "Condition", "Practicality"],
          rows: [
            ["Eigenvalues", "all $\\lambda_i > 0$", "conceptually clearest"],
            ["Pivots", "all pivots in elimination positive", "$O(n^{3})$, cheap"],
            ["Leading minors", "every upper-left $\\det > 0$", "Sylvester's criterion; fine for small $n$"],
            ["Cholesky", "$A = LL^{\\top}$ exists with positive diagonal", "**the practical test**"],
            ["Factorisation", "$A = B^{\\top}B$ with $B$ of full column rank", "how they arise"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The Cholesky test is the one to use",
          text: "Attempting a Cholesky factorisation either succeeds — proving positive definiteness — or fails at the first non-positive pivot, and it costs about half a standard elimination. Computing all eigenvalues to check their signs is several times more expensive and less numerically direct. Every library's `is_positive_definite` does this.",
        },
      ],
    },
    {
      heading: "Semidefinite, and why the distinction matters",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{x}^{\\top}A\\mathbf{x} \\ge 0 \\quad \\text{for all } \\mathbf{x} \\qquad (\\text{positive } \\textit{semi}\\text{definite})",
          caption: "Allows zero — so some eigenvalue may be 0, and $A$ may be singular",
        },
        {
          kind: "prose",
          text: "$A^{\\top}A$ is always at least semidefinite, since $\\mathbf{x}^{\\top}A^{\\top}A\\mathbf{x} = \\|A\\mathbf{x}\\|^{2} \\ge 0$. It is *definite* exactly when $A$ has independent columns, because only then is $A\\mathbf{x} = \\mathbf{0}$ impossible for non-zero $\\mathbf{x}$. This is precisely the collinearity condition in regression: independent predictors give a positive definite $X^{\\top}X$ and a unique solution; collinear ones give a singular, merely semidefinite matrix.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Sample covariance matrices are often only semidefinite",
          text: "With $n$ observations and $p > n$ variables, the sample covariance has rank at most $n-1$ and is therefore singular — it cannot be inverted, so Gaussian likelihoods, Mahalanobis distances, and linear discriminant analysis all break. Shrinkage estimators such as $\\hat{\\Sigma} + \\alpha I$ exist to push the eigenvalues back above zero, which is the same device as ridge regression.",
        },
      ],
    },
    {
      heading: "Where it decides things",
      blocks: [
        {
          kind: "table",
          headers: ["Setting", "Positive definite means"],
          rows: [
            ["Hessian at a critical point", "a strict local **minimum**"],
            ["Hessian negative definite", "a local maximum"],
            ["Hessian indefinite (mixed signs)", "a saddle point"],
            ["Covariance matrix", "no variable is an exact linear combination of others"],
            ["Kernel/Gram matrix", "the kernel is valid (Mercer's condition)"],
            ["$X^{\\top}X$ in regression", "coefficients are identifiable and unique"],
          ],
        },
        {
          kind: "prose",
          text: "The optimisation row explains why second-order methods care. Newton's method solves $H\\Delta = -\\nabla f$; if $H$ is positive definite the step heads downhill, and if it is not the step may head uphill or diverge. This is why practical implementations modify the Hessian — adding $\\lambda I$ until it becomes definite — which is exactly the Levenberg–Marquardt and trust-region idea.",
        },
        {
          kind: "example",
          title: "Testing a matrix",
          problem:
            "Is $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2\\end{bmatrix}$ positive definite? What about $B = \\begin{bmatrix} 1 & 2 \\\\ 2 & 1\\end{bmatrix}$?",
          steps: [
            "$A$: leading minors are $2 > 0$ and $\\det = 4 - 1 = 3 > 0$. ✓ Positive definite.",
            "Its eigenvalues are $3$ and $1$ — both positive, consistent.",
            "$B$: first minor $1 > 0$, but $\\det = 1 - 4 = -3 < 0$. ✗",
            "Eigenvalues are $3$ and $-1$ — indefinite, so the quadratic form is a saddle.",
          ],
          answer:
            "$A$ is positive definite; $B$ is indefinite. Note both have the same diagonal — definiteness depends on the off-diagonal terms, not on the diagonal being positive.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A positive diagonal is not enough",
          text: "Every diagonal entry of a positive definite matrix must be positive — put $\\mathbf{x} = \\mathbf{e}_i$ — but the converse fails, as $B$ above shows. Similarly, all entries being positive neither implies nor is implied by definiteness. The condition is genuinely about the whole matrix.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§6.5" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§A.5.5, §9.5" },
    { source: "Horn & Johnson, Matrix Analysis", locator: "Ch. 7" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-07-spectral-theory-and-special-matrices.md" },
  ],
};
