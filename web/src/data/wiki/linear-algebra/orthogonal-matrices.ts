import type { WikiArticle } from "../types";

export const orthogonalMatrices: WikiArticle = {
  conceptId: "orthogonal-matrices",
  summary:
    "An orthogonal matrix has orthonormal columns, so its inverse is its transpose. Geometrically it is a rigid motion — a rotation or reflection — preserving every length and angle. That is why numerical algorithms are built from them: they cannot amplify error.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "Q^{\\top}Q = QQ^{\\top} = I \\iff Q^{-1} = Q^{\\top}",
          caption: "Orthonormal columns — and therefore orthonormal rows too",
        },
        {
          kind: "prose",
          text: "The condition $Q^{\\top}Q = I$ says each column has unit length and any two are orthogonal. For square $Q$ this also forces $QQ^{\\top} = I$, so the rows are orthonormal as well — a symmetry that fails for rectangular matrices with orthonormal columns, where only one of the two products is the identity.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The name is a historical misnomer",
          text: "\"Orthogonal matrix\" requires *orthonormal* columns, not merely orthogonal ones. A matrix with perpendicular but non-unit columns is not orthogonal in this sense, and its inverse is not its transpose. The terminology is entrenched but genuinely misleading.",
        },
      ],
    },
    {
      heading: "What is preserved",
      blocks: [
        {
          kind: "formula",
          latex: "\\|Q\\mathbf{x}\\| = \\|\\mathbf{x}\\|, \\qquad (Q\\mathbf{x})\\cdot(Q\\mathbf{y}) = \\mathbf{x}\\cdot\\mathbf{y}",
          caption: "Lengths and angles are unchanged",
        },
        {
          kind: "prose",
          text: "The proof is one line: $\\|Q\\mathbf{x}\\|^{2} = \\mathbf{x}^{\\top}Q^{\\top}Q\\mathbf{x} = \\mathbf{x}^{\\top}\\mathbf{x}$. Since both length and inner product survive, so does everything defined from them — distances, angles, orthogonality, and volumes.",
        },
        {
          kind: "table",
          headers: ["Quantity", "Value for orthogonal $Q$"],
          rows: [
            ["$\\det Q$", "$+1$ (rotation) or $-1$ (reflection)"],
            ["Eigenvalues", "all have $|\\lambda| = 1$; may be complex"],
            ["Singular values", "all exactly 1"],
            ["Condition number", "$\\kappa(Q) = 1$ — the best possible"],
            ["$\\|QA\\|$, $\\|AQ\\|$", "equal to $\\|A\\|$ in the 2-norm and Frobenius norm"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Condition number 1 is why algorithms use them",
          text: "Multiplying by an orthogonal matrix neither amplifies nor damps error — relative errors pass through unchanged. That is precisely why QR, Householder reflections, Givens rotations, and the SVD are built from orthogonal transformations, while Gaussian elimination without pivoting is not. Numerical stability in linear algebra largely means \"expressed via orthogonal operations\".",
        },
      ],
    },
    {
      heading: "Examples",
      blocks: [
        {
          kind: "example",
          title: "Rotation and reflection",
          problem:
            "Verify that $R(\\theta) = \\begin{bmatrix}\\cos\\theta & -\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta\\end{bmatrix}$ is orthogonal, and identify its determinant.",
          steps: [
            "Column 1 has length $\\sqrt{\\cos^{2}\\theta + \\sin^{2}\\theta} = 1$; likewise column 2.",
            "Their dot product: $-\\cos\\theta\\sin\\theta + \\sin\\theta\\cos\\theta = 0$. ✓",
            "$\\det = \\cos^{2}\\theta + \\sin^{2}\\theta = 1$, so this is a rotation.",
            "$R(\\theta)^{-1} = R(\\theta)^{\\top} = R(-\\theta)$ — rotating back, as expected.",
          ],
          answer:
            "Orthogonal with $\\det = +1$. A reflection such as $\\begin{bmatrix}1&0\\\\0&-1\\end{bmatrix}$ is also orthogonal but has $\\det = -1$, flipping orientation.",
        },
        {
          kind: "prose",
          text: "The determinant splits orthogonal matrices into two families. Those with $\\det = +1$ form the rotation group $SO(n)$ and are connected — any rotation can be reached continuously from the identity. Those with $\\det = -1$ reverse orientation and cannot; a reflection is not a limit of rotations.",
        },
      ],
    },
    {
      heading: "Where they appear",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**QR and SVD** both produce orthogonal factors, which is the source of their stability.",
            "**The spectral theorem** gives an orthogonal eigenvector matrix for symmetric input, so $A = Q\\Lambda Q^{\\top}$ needs no inverse.",
            "**PCA** rotates data into an orthogonal basis — distances between points are preserved exactly, which is why PCA does not distort the geometry it summarises.",
            "**Graphics and robotics.** Rigid-body motions are orthogonal matrices plus a translation, and re-orthogonalising a drifting rotation matrix is a routine maintenance step.",
            "**Orthogonal weight initialisation** in deep networks keeps signal magnitudes stable across layers, for the same condition-number reason.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Orthogonality drifts under repeated arithmetic",
          text: "Composing many rotations in floating point accumulates error until the product is no longer quite orthogonal — determinants creep away from 1 and lengths distort. Long-running simulations periodically re-orthogonalise, typically by taking the $Q$ from a QR factorisation or the orthogonal factor from a polar decomposition.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§4.4, §6.4" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 10, 16" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-07-spectral-theory-and-special-matrices.md" },
  ],
};
