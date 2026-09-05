import type { WikiArticle } from "../types";

export const gramSchmidt: WikiArticle = {
  conceptId: "gram-schmidt",
  summary:
    "Gram–Schmidt converts any independent set into an orthonormal one spanning the same subspace. Each new vector has its components along the previous directions subtracted off, leaving only what is genuinely new — and the leftovers, recorded, are exactly the $R$ of a QR decomposition.",
  sections: [
    {
      heading: "The procedure",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{w}_k = \\mathbf{v}_k - \\sum_{j<k} (\\mathbf{v}_k \\cdot \\mathbf{q}_j)\\,\\mathbf{q}_j, \\qquad \\mathbf{q}_k = \\frac{\\mathbf{w}_k}{\\|\\mathbf{w}_k\\|}",
          caption: "Subtract the projections onto everything already built, then normalise",
        },
        {
          kind: "prose",
          text: "The first vector is simply normalised. Each subsequent one has its projection onto every earlier $\\mathbf{q}_j$ removed, which by construction leaves a remainder orthogonal to all of them. Normalising gives the next member of the orthonormal set.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the span is preserved",
          text: "Each $\\mathbf{q}_k$ is a combination of $\\mathbf{v}_1,\\ldots,\\mathbf{v}_k$, and conversely each $\\mathbf{v}_k$ is a combination of $\\mathbf{q}_1,\\ldots,\\mathbf{q}_k$ — the process is invertible at every step. So the first $k$ vectors of either set span the same subspace, for every $k$. That nested property is what makes the resulting $R$ upper triangular.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Orthonormalising two vectors",
          problem:
            "Apply Gram–Schmidt to $\\mathbf{v}_1 = (1,1,0)$ and $\\mathbf{v}_2 = (1,0,1)$.",
          steps: [
            "$\\|\\mathbf{v}_1\\| = \\sqrt{2}$, so $\\mathbf{q}_1 = \\tfrac{1}{\\sqrt{2}}(1,1,0)$.",
            "$\\mathbf{v}_2 \\cdot \\mathbf{q}_1 = (1 + 0 + 0)/\\sqrt{2} = 1/\\sqrt{2}$.",
            "$\\mathbf{w}_2 = (1,0,1) - \\tfrac{1}{\\sqrt{2}}\\cdot\\tfrac{1}{\\sqrt{2}}(1,1,0) = (1,0,1) - (0.5,0.5,0) = (0.5,-0.5,1)$.",
            "$\\|\\mathbf{w}_2\\| = \\sqrt{0.25+0.25+1} = \\sqrt{1.5}$.",
            "$\\mathbf{q}_2 = \\tfrac{1}{\\sqrt{1.5}}(0.5,-0.5,1)$.",
            "Check: $\\mathbf{q}_1\\cdot\\mathbf{q}_2 \\propto (0.5 - 0.5 + 0) = 0$. ✓",
          ],
          answer:
            "$\\mathbf{q}_1 = \\tfrac{1}{\\sqrt2}(1,1,0)$ and $\\mathbf{q}_2 = \\tfrac{1}{\\sqrt{1.5}}(0.5,-0.5,1)$, spanning the same plane.",
        },
      ],
    },
    {
      heading: "The QR connection",
      blocks: [
        {
          kind: "formula",
          latex: "A = QR, \\qquad R_{jk} = \\mathbf{v}_k \\cdot \\mathbf{q}_j \\ (j \\le k)",
          caption: "The coefficients discarded during orthogonalisation are the entries of $R$",
        },
        {
          kind: "prose",
          text: "Gram–Schmidt does not throw the projection coefficients away — collecting them gives an upper triangular $R$ such that $A = QR$. Upper triangular because $\\mathbf{v}_k$ involves only $\\mathbf{q}_1,\\ldots,\\mathbf{q}_k$, never later ones. This is the constructive proof that every full-column-rank matrix has a QR decomposition.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this makes least squares stable",
          text: "Substituting $A = QR$ into the normal equations gives $R\\boldsymbol{\\beta} = Q^{\\top}\\mathbf{b}$ — a triangular system solved by back-substitution, with no need to form $A^{\\top}A$. That matters because forming $A^{\\top}A$ squares the condition number, so a problem workable in double precision can become unsolvable. QR is what numerical libraries actually use for regression.",
        },
      ],
    },
    {
      heading: "Numerical caution",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Classical Gram–Schmidt loses orthogonality",
          text: "In floating point, rounding errors accumulate and the computed vectors drift away from orthogonality — badly, when the input vectors are nearly dependent. *Modified* Gram–Schmidt subtracts each projection immediately rather than all at once, which is mathematically identical and numerically far better. Householder reflections are better still and are what LAPACK uses. Classical Gram–Schmidt is for understanding; it should not be implemented.",
        },
        {
          kind: "prose",
          text: "The procedure generalises to any inner product space. Applied to $1, x, x^{2}, \\ldots$ under $\\langle f,g\\rangle = \\int_{-1}^{1} fg$, it produces the Legendre polynomials; other weight functions give Hermite and Chebyshev. Orthogonal polynomial families are Gram–Schmidt applied to monomials, which is why they all satisfy three-term recurrences — that is the nested-span property showing through.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§4.4" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 7–8, 10" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-05-rank-and-orthogonalization.md" },
  ],
};
