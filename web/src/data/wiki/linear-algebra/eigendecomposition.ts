import type { WikiArticle } from "../types";

export const eigendecomposition: WikiArticle = {
  conceptId: "eigendecomposition",
  summary:
    "Eigendecomposition writes a matrix as $\\mathbf{V}\\boldsymbol{\\Lambda} \\mathbf{V}^{-1}$ — a change into the eigenvector basis, a scaling, and a change back. It is the tool for anything involving repeated application, and its main limitation is that it does not always exist, which is precisely what the SVD was built to fix.",
  sections: [
    {
      heading: "The factorisation",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{A} = \\mathbf{V}\\boldsymbol{\\Lambda} \\mathbf{V}^{-1}, \\qquad \\mathbf{A}^{k} = \\mathbf{V}\\boldsymbol{\\Lambda}^{k}\\mathbf{V}^{-1}, \\qquad f(\\mathbf{A}) = \\mathbf{V}f(\\boldsymbol{\\Lambda})\\mathbf{V}^{-1}",
          caption: "Matrix functions reduce to functions of the eigenvalues",
        },
        {
          kind: "prose",
          text: "The last identity is the reason the decomposition is worth computing. $e^{A}$, $\\mathbf{A}^{1/2}$, $\\log \\mathbf{A}$, and $\\mathbf{A}^{-1}$ are all obtained by applying the scalar function to each $\\lambda_i$ — no matrix-level definition needed, because in the eigenbasis the matrix is diagonal and diagonal matrices act independently on each coordinate.",
        },
        {
          kind: "table",
          headers: ["Version", "Requires", "$\\mathbf{V}$ is"],
          rows: [
            ["General $\\mathbf{A} = \\mathbf{V}\\boldsymbol{\\Lambda} \\mathbf{V}^{-1}$", "$n$ independent eigenvectors", "invertible, possibly ill-conditioned"],
            ["Symmetric $\\mathbf{A} = \\mathbf{Q}\\boldsymbol{\\Lambda} \\mathbf{Q}^{\\top}$", "$\\mathbf{A} = \\mathbf{A}^{\\top}$", "orthogonal — always well conditioned"],
            ["Schur $\\mathbf{A} = QTQ^{\\top}$", "nothing", "orthogonal, but $T$ only triangular"],
            ["Jordan $\\mathbf{A} = VJV^{-1}$", "nothing", "invertible; $J$ nearly diagonal"],
          ],
        },
      ],
    },
    {
      heading: "Compared with the SVD",
      blocks: [
        {
          kind: "table",
          headers: ["", "Eigendecomposition", "SVD"],
          rows: [
            ["Exists for", "square, non-defective", "**every** matrix"],
            ["Bases", "one, for input and output", "two, one for each"],
            ["Values", "may be complex or negative", "real, non-negative"],
            ["$\\mathbf{V}$ orthogonal?", "only when $\\mathbf{A}$ is symmetric", "always"],
            ["Best used for", "$\\mathbf{A}^{k}$, dynamics, $e^{At}$", "rank, approximation, pseudoinverse"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "They coincide for symmetric positive semidefinite matrices",
          text: "There the eigenvalues are non-negative and the eigenvectors orthogonal, so $\\mathbf{Q}\\boldsymbol{\\Lambda} \\mathbf{Q}^{\\top}$ *is* the SVD with $\\mathbf{U} = \\mathbf{V} = \\mathbf{Q}$ and $\\boldsymbol{\\Sigma} = \\boldsymbol{\\Lambda}$. This is why PCA can be described either as an eigendecomposition of the covariance matrix or an SVD of the data — for that particular matrix the two constructions agree.",
        },
      ],
    },
    {
      heading: "Practical use",
      blocks: [
        {
          kind: "example",
          title: "A matrix exponential",
          problem:
            "Solve $\\dot{\\mathbf{x}} = \\mathbf{A}\\mathbf{x}$ where $\\mathbf{A}$ has eigenpairs $(-1, \\mathbf{v}_1)$ and $(-3, \\mathbf{v}_2)$.",
          steps: [
            "The solution is $\\mathbf{x}(t) = e^{At}\\mathbf{x}_0 = \\mathbf{V}e^{\\boldsymbol{\\Lambda} t}\\mathbf{V}^{-1}\\mathbf{x}_0$.",
            "$e^{\\boldsymbol{\\Lambda} t} = \\operatorname{diag}(e^{-t}, e^{-3t})$ — the coupled system decouples entirely.",
            "Writing $\\mathbf{x}_0 = c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2$ gives $\\mathbf{x}(t) = c_1e^{-t}\\mathbf{v}_1 + c_2e^{-3t}\\mathbf{v}_2$.",
            "Both exponents are negative, so every trajectory decays to the origin.",
          ],
          answer:
            "Stable, with the slow mode $e^{-t}$ dominating for large $t$. Stability of a linear system is exactly the sign of the eigenvalues' real parts.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Do not compute $e^{A}$ this way in floating point",
          text: "If $\\mathbf{V}$ is ill-conditioned, $\\mathbf{V}^{-1}$ amplifies error catastrophically — and near-defective matrices are common. The scaling-and-squaring method with Padé approximants is what libraries use, and it never forms an eigendecomposition. Moler and Van Loan's paper on this is titled 'Nineteen Dubious Ways to Compute the Exponential of a Matrix' for good reason.",
        },
        {
          kind: "prose",
          text: "The general lesson: eigendecomposition is the right *conceptual* tool for dynamics and matrix functions, and often the wrong computational one. When the matrix is symmetric it is both, because $\\mathbf{Q}$ is orthogonal and perfectly conditioned. When it is not, prefer the Schur form or a purpose-built algorithm.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§6.2, §6.4" },
    { source: "Moler & Van Loan, 'Nineteen Dubious Ways to Compute the Exponential of a Matrix'", locator: "SIAM Review 45(1), 2003" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 24–26" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-06-determinants-and-eigenstuff.md" },
  ],
};
