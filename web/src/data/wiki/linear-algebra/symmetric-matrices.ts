import type { WikiArticle } from "../types";

export const symmetricMatrices: WikiArticle = {
  conceptId: "symmetric-matrices",
  summary:
    "A symmetric matrix equals its own transpose. That one condition forces real eigenvalues, orthogonal eigenvectors, and guaranteed diagonalisability — none of which hold for general matrices. Covariance matrices, Gram matrices, Hessians, and graph Laplacians are all symmetric, which is why so much of statistics and optimisation rests on this case.",
  sections: [
    {
      heading: "Definition and sources",
      blocks: [
        {
          kind: "formula",
          latex: "A^{\\top} = A \\iff a_{ij} = a_{ji} \\ \\text{ for all } i,j",
          caption: "Symmetric across the main diagonal",
        },
        {
          kind: "table",
          headers: ["Matrix", "Why symmetric", "Where it appears"],
          rows: [
            ["$A^{\\top}A$", "$(A^{\\top}A)^{\\top} = A^{\\top}A$", "normal equations, SVD"],
            ["Covariance $\\Sigma$", "$\\operatorname{Cov}(X_i,X_j) = \\operatorname{Cov}(X_j,X_i)$", "PCA, multivariate normal"],
            ["Hessian", "mixed partials commute (Clairaut)", "second-order optimisation"],
            ["Graph Laplacian", "undirected edges have no direction", "spectral clustering"],
            ["Projection $P$", "orthogonal projections are self-adjoint", "least squares"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Symmetry is a statement about the inner product",
          text: "$A$ is symmetric exactly when $\\langle A\\mathbf{x},\\mathbf{y}\\rangle = \\langle \\mathbf{x},A\\mathbf{y}\\rangle$ for all vectors — it can be moved across the inner product unchanged. This *self-adjointness* is the property the good behaviour actually follows from, and it is why the results below transfer to infinite-dimensional operators.",
        },
      ],
    },
    {
      heading: "What symmetry guarantees",
      blocks: [
        {
          kind: "formula",
          latex: "A = Q\\Lambda Q^{\\top}, \\qquad Q^{\\top}Q = I",
          caption: "The spectral theorem — orthogonal eigenvectors, real eigenvalues, always",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "**Real eigenvalues.** No complex arithmetic, even though the characteristic polynomial could in principle produce complex roots.",
            "**Orthogonal eigenvectors** for distinct eigenvalues — and an orthogonal basis can always be chosen even when eigenvalues repeat.",
            "**Always diagonalisable.** Symmetric matrices are never defective, so the Jordan form is never needed.",
            "**$Q^{-1} = Q^{\\top}$**, so the decomposition is computable and numerically stable.",
          ],
        },
        {
          kind: "prose",
          text: "Real eigenvalues have a two-line proof worth knowing. If $A\\mathbf{v} = \\lambda\\mathbf{v}$, take the conjugate transpose: $\\bar{\\mathbf{v}}^{\\top}A = \\bar{\\lambda}\\bar{\\mathbf{v}}^{\\top}$ using $A^{\\top} = A$ and $A$ real. Multiplying by $\\mathbf{v}$ gives $\\lambda\\|\\mathbf{v}\\|^{2} = \\bar{\\lambda}\\|\\mathbf{v}\\|^{2}$, so $\\lambda = \\bar{\\lambda}$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Orthogonality of eigenvectors, in one line",
          text: "For $A\\mathbf{u} = \\lambda\\mathbf{u}$ and $A\\mathbf{v} = \\mu\\mathbf{v}$ with $\\lambda \\ne \\mu$: $\\lambda(\\mathbf{u}\\cdot\\mathbf{v}) = (A\\mathbf{u})\\cdot\\mathbf{v} = \\mathbf{u}\\cdot(A\\mathbf{v}) = \\mu(\\mathbf{u}\\cdot\\mathbf{v})$, using symmetry in the middle step. Since $\\lambda \\ne \\mu$, the dot product must vanish. This is why principal components are orthogonal — it is forced by the covariance matrix being symmetric, not imposed by the algorithm.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Diagonalising a symmetric matrix",
          problem: "Diagonalise $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$.",
          steps: [
            "$\\det(A-\\lambda I) = (2-\\lambda)^{2} - 1 = \\lambda^{2} - 4\\lambda + 3$.",
            "Roots: $\\lambda = 3, 1$ — both real, as guaranteed.",
            "$\\lambda = 3$: $(A - 3I)\\mathbf{v} = 0$ gives $\\mathbf{v} = (1,1)$.",
            "$\\lambda = 1$: gives $\\mathbf{v} = (1,-1)$.",
            "$(1,1)\\cdot(1,-1) = 0$ ✓ — orthogonal, as guaranteed.",
            "Normalise: $Q = \\tfrac{1}{\\sqrt2}\\begin{bmatrix}1 & 1\\\\ 1 & -1\\end{bmatrix}$, $\\Lambda = \\operatorname{diag}(3,1)$.",
          ],
          answer: "$A = Q\\Lambda Q^{\\top}$ with orthonormal $Q$.",
        },
      ],
    },
    {
      heading: "Consequences worth carrying",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**The quadratic form** $\\mathbf{x}^{\\top}A\\mathbf{x}$ becomes $\\sum_i \\lambda_i y_i^{2}$ in the eigenbasis — a sum of independent squared terms, which is what makes definiteness a question about the signs of eigenvalues.",
            "**Rayleigh quotient bounds.** $\\lambda_{\\min} \\le \\dfrac{\\mathbf{x}^{\\top}A\\mathbf{x}}{\\mathbf{x}^{\\top}\\mathbf{x}} \\le \\lambda_{\\max}$, with the extremes attained at the corresponding eigenvectors — the basis of PCA's optimality.",
            "**Matrix functions are easy.** $A^{k} = Q\\Lambda^{k}Q^{\\top}$, and likewise $A^{1/2}$, $e^{A}$, $\\log A$ — apply the function to the eigenvalues.",
            "**Numerically excellent.** Symmetric eigensolvers are faster and far more stable than general ones, and small perturbations move eigenvalues by at most the perturbation size (Weyl's inequality).",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Symmetry is fragile in floating point",
          text: "A matrix that should be symmetric often is not exactly, after arithmetic — $A^{\\top}A$ computed naively can differ in the last bits across the diagonal. General eigensolvers then return slightly complex eigenvalues for what should be a symmetric problem. The fix is to symmetrise explicitly, $\\tfrac{1}{2}(A + A^{\\top})$, and call the symmetric routine.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§6.4" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 7A–7B" },
    { source: "Horn & Johnson, Matrix Analysis", locator: "Ch. 4" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-07-spectral-theory-and-special-matrices.md" },
  ],
};
