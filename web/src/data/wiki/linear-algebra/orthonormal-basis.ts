import type { WikiArticle } from "../types";

export const orthonormalBasis: WikiArticle = {
  conceptId: "orthonormal-basis",
  summary:
    "An orthonormal basis is a basis of mutually orthogonal unit vectors. It is worth the effort of constructing because coordinates become dot products rather than a linear solve, the change-of-basis matrix inverts by transposition, and nothing is distorted numerically.",
  sections: [
    {
      heading: "Definition and the payoff",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{q}_i\\cdot\\mathbf{q}_j = \\delta_{ij}, \\qquad \\mathbf{v} = \\sum_{i}(\\mathbf{v}\\cdot\\mathbf{q}_i)\\,\\mathbf{q}_i",
          caption: "Coordinates are projections — no system to solve",
        },
        {
          kind: "prose",
          text: "In a general basis, finding coordinates means solving $A\\mathbf{c} = \\mathbf{v}$ at $O(n^{3})$ cost. In an orthonormal basis each coefficient is one dot product, at $O(n)$ each — because dotting the expansion with $\\mathbf{q}_j$ annihilates every term but one.",
        },
        {
          kind: "formula",
          latex: "\\|\\mathbf{v}\\|^{2} = \\sum_i (\\mathbf{v}\\cdot\\mathbf{q}_i)^{2}",
          caption: "Parseval's identity — length is recoverable from the coordinates",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this identity matters beyond bookkeeping",
          text: "It says the coordinate representation preserves geometry exactly: no information about length or angle is lost in the change of basis. In Fourier analysis it becomes \"energy in the signal equals energy in the spectrum\"; in PCA it is why the explained-variance ratios sum to one. Both are Pythagoras applied along orthogonal directions.",
        },
      ],
    },
    {
      heading: "Constructing one",
      blocks: [
        {
          kind: "table",
          headers: ["Method", "Input", "Note"],
          rows: [
            ["Gram–Schmidt", "any independent set", "constructive; use the modified variant"],
            ["Householder QR", "any matrix", "the numerically preferred route"],
            ["Spectral theorem", "a symmetric matrix", "eigenvectors are orthogonal automatically"],
            ["SVD", "any matrix", "gives orthonormal bases for all four subspaces at once"],
          ],
        },
        {
          kind: "prose",
          text: "A square matrix $Q$ with orthonormal columns is an orthogonal matrix, so $Q^{-1} = Q^{\\top}$. Change of basis then costs a transpose instead of an inversion — and because orthogonal matrices have condition number 1, that change introduces no numerical error at all.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Coordinates the easy way",
          problem:
            "Express $\\mathbf{v} = (3,1)$ in the orthonormal basis $\\mathbf{q}_1 = \\tfrac{1}{\\sqrt2}(1,1)$, $\\mathbf{q}_2 = \\tfrac{1}{\\sqrt2}(1,-1)$.",
          steps: [
            "$c_1 = \\mathbf{v}\\cdot\\mathbf{q}_1 = (3+1)/\\sqrt2 = 4/\\sqrt2 = 2\\sqrt2$.",
            "$c_2 = \\mathbf{v}\\cdot\\mathbf{q}_2 = (3-1)/\\sqrt2 = 2/\\sqrt2 = \\sqrt2$.",
            "Check by Parseval: $c_1^{2} + c_2^{2} = 8 + 2 = 10 = 3^{2}+1^{2}$. ✓",
            "Reconstruct: $2\\sqrt2\\,\\mathbf{q}_1 + \\sqrt2\\,\\mathbf{q}_2 = (2,2) + (1,-1) = (3,1)$. ✓",
          ],
          answer:
            "$(2\\sqrt2,\\ \\sqrt2)$ — obtained by two dot products, with no linear system anywhere.",
        },
      ],
    },
    {
      heading: "Beyond $\\mathbb{R}^{n}$",
      blocks: [
        {
          kind: "prose",
          text: "The idea transfers to any inner product space. Under $\\langle f,g\\rangle = \\int fg$, the functions $\\{1, \\cos x, \\sin x, \\cos 2x, \\ldots\\}$ are orthogonal on $[-\\pi,\\pi]$, and Fourier coefficients are exactly the projections $\\langle f, \\mathbf{q}_i\\rangle$. Legendre, Hermite, and Chebyshev polynomials are Gram–Schmidt applied to $1, x, x^{2},\\ldots$ under different weights.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Orthogonality is relative to an inner product",
          text: "Two vectors orthogonal under the standard dot product need not be under a weighted one, $\\langle\\mathbf{x},\\mathbf{y}\\rangle_W = \\mathbf{x}^{\\top}W\\mathbf{y}$. This matters in generalised least squares and in generalised eigenvalue problems, where the relevant orthogonality is with respect to a covariance or mass matrix rather than the identity. Stating which inner product is in play is part of stating the result.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§4.4" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 6B" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-05-rank-and-orthogonalization.md" },
  ],
};
