import type { WikiArticle } from "../types";

export const eigenvaluesEigenvectors: WikiArticle = {
  conceptId: "eigenvalues-eigenvectors",
  summary:
    "An eigenvector is a direction the matrix does not rotate — it only stretches it, by the eigenvalue. Finding these special directions turns a complicated transformation into independent scalings, which is why repeated application, differential equations, and principal components all become tractable once eigenvectors are known.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "A\\mathbf{v} = \\lambda\\mathbf{v}, \\qquad \\mathbf{v} \\ne \\mathbf{0}",
          caption: "$\\mathbf{v}$ is an eigenvector, $\\lambda$ its eigenvalue",
        },
        {
          kind: "prose",
          text: "The exclusion $\\mathbf{v}\\ne\\mathbf{0}$ matters: $A\\mathbf{0} = \\lambda\\mathbf{0}$ holds for every $\\lambda$, so allowing it would make the definition vacuous. Eigenvalues may be zero — that happens exactly when the matrix is singular — but eigenvectors may not.",
        },
        {
          kind: "formula",
          latex: "\\det(A - \\lambda I) = 0",
          caption: "The characteristic equation — where the eigenvalues come from",
        },
        {
          kind: "prose",
          text: "Rearranging $A\\mathbf{v} = \\lambda\\mathbf{v}$ gives $(A - \\lambda I)\\mathbf{v} = \\mathbf{0}$, which has a non-zero solution exactly when $A - \\lambda I$ is singular. So eigenvalues are the values making the determinant vanish, and each eigenvector is then a null space vector of $A - \\lambda I$.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A $2\\times2$ eigen-problem",
          problem: "Find the eigenvalues and eigenvectors of $A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3\\end{bmatrix}$.",
          steps: [
            "$\\det(A - \\lambda I) = (4-\\lambda)(3-\\lambda) - 2 = \\lambda^{2} - 7\\lambda + 10$.",
            "Factor: $(\\lambda - 5)(\\lambda - 2) = 0$, so $\\lambda = 5, 2$.",
            "For $\\lambda = 5$: $(A - 5I) = \\begin{bmatrix}-1 & 1\\\\ 2 & -2\\end{bmatrix}$, giving $\\mathbf{v} = (1,1)$.",
            "For $\\lambda = 2$: $(A - 2I) = \\begin{bmatrix}2 & 1\\\\ 2 & 1\\end{bmatrix}$, giving $\\mathbf{v} = (1,-2)$.",
            "Check the shortcuts: trace $= 4+3 = 7 = 5+2$ ✓, and $\\det = 12-2 = 10 = 5\\times2$ ✓.",
          ],
          answer: "$\\lambda_1 = 5$ with $(1,1)$; $\\lambda_2 = 2$ with $(1,-2)$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two identities worth using as checks",
          text: "$\\sum_i \\lambda_i = \\operatorname{tr}(A)$ and $\\prod_i \\lambda_i = \\det(A)$, both counting multiplicity. For a $2\\times2$ matrix these two equations *determine* the eigenvalues without expanding a characteristic polynomial, and for any size they are a free consistency check on a computed answer.",
        },
      ],
    },
    {
      heading: "Why they matter",
      blocks: [
        {
          kind: "formula",
          latex: "A = V\\Lambda V^{-1} \\ \\Longrightarrow \\ A^{k} = V\\Lambda^{k}V^{-1}",
          caption: "Diagonalisation turns matrix powers into scalar powers",
        },
        {
          kind: "prose",
          text: "This is the payoff. Computing $A^{100}$ directly is a hundred matrix multiplications; in the eigenbasis it is raising $n$ numbers to the hundredth power. The same move solves linear recurrences and systems of differential equations, where $e^{At} = Ve^{\\Lambda t}V^{-1}$ reduces a coupled system to independent exponentials.",
        },
        {
          kind: "table",
          headers: ["Setting", "What the eigenvalues tell you"],
          rows: [
            ["Repeated application $A^{k}$", "$|\\lambda| > 1$ grows, $|\\lambda| < 1$ decays; the largest dominates"],
            ["Markov chains", "$\\lambda = 1$ gives the stationary distribution; the second largest sets mixing speed"],
            ["PCA", "eigenvalues of the covariance matrix are the variances along each component"],
            ["Optimisation", "eigenvalues of the Hessian: all positive means a minimum, mixed signs a saddle"],
            ["Stability of $\\dot{\\mathbf{x}} = A\\mathbf{x}$", "stable exactly when every eigenvalue has negative real part"],
          ],
        },
      ],
    },
    {
      heading: "Complications",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Not every matrix is diagonalisable",
          text: "$\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$ has $\\lambda = 1$ twice but only a one-dimensional eigenspace — there simply are not two independent eigenvectors, so no eigenbasis exists. Such *defective* matrices need the Jordan form instead. The condition for diagonalisability is that geometric multiplicity matches algebraic multiplicity for every eigenvalue.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Real matrices can have complex eigenvalues.** A rotation has none that are real — no direction survives unrotated — and its eigenvalues are $e^{\\pm i\\theta}$.",
            "**Symmetric matrices are the well-behaved case.** The spectral theorem guarantees real eigenvalues, orthogonal eigenvectors, and diagonalisability, always. Covariance matrices and Hessians are symmetric, which is why PCA and second-order optimisation are on firm ground.",
            "**Eigenvectors are not unique.** Any non-zero multiple is another eigenvector, so they are usually normalised to unit length — and even then the sign is arbitrary, which is why PCA loadings can flip between software packages.",
            "**Numerically, roots of the characteristic polynomial are a bad method.** Polynomial root-finding is ill-conditioned; real algorithms use QR iteration on the matrix directly.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§6.1–6.2" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 5A–5B" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 24–28" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-06-determinants-and-eigenstuff.md" },
  ],
};
