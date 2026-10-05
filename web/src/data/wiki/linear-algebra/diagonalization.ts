import type { WikiArticle } from "../types";

export const diagonalization: WikiArticle = {
  conceptId: "diagonalization",
  summary:
    "Diagonalising a matrix means finding a basis of eigenvectors in which it acts by independent scaling. When it works, matrix powers, exponentials, and dynamical systems all become scalar computations — and the condition for it working is having enough independent eigenvectors, which not every matrix does.",
  sections: [
    {
      heading: "The factorisation",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{A} = \\mathbf{V}\\boldsymbol{\\Lambda} \\mathbf{V}^{-1}, \\qquad \\mathbf{V} = [\\mathbf{v}_1 \\cdots \\mathbf{v}_n], \\quad \\boldsymbol{\\Lambda} = \\operatorname{diag}(\\lambda_1,\\ldots,\\lambda_n)",
          caption: "Eigenvectors as columns of $\\mathbf{V}$; eigenvalues on the diagonal of $\\boldsymbol{\\Lambda}$",
        },
        {
          kind: "prose",
          text: "The identity is just $\\mathbf{A}\\mathbf{v}_i = \\lambda_i\\mathbf{v}_i$ collected across all $i$: $\\mathbf{A}\\mathbf{V} = \\mathbf{V}\\boldsymbol{\\Lambda}$. Multiplying on the right by $\\mathbf{V}^{-1}$ requires $\\mathbf{V}$ to be invertible — which is exactly the requirement that the eigenvectors be independent.",
        },
        {
          kind: "formula",
          latex: "\\mathbf{A}^{k} = \\mathbf{V}\\boldsymbol{\\Lambda}^{k}\\mathbf{V}^{-1}",
          caption: "The payoff: the $\\mathbf{V}^{-1}\\mathbf{V}$ pairs cancel, leaving only scalar powers",
        },
      ],
    },
    {
      heading: "When it is possible",
      blocks: [
        {
          kind: "table",
          headers: ["Condition", "Diagonalisable?"],
          rows: [
            ["$n$ distinct eigenvalues", "**yes** — always"],
            ["Symmetric (real)", "**yes** — with orthogonal $\\mathbf{V}$, by the spectral theorem"],
            ["Repeated eigenvalue with a full eigenspace", "yes"],
            ["Repeated eigenvalue with a deficient eigenspace", "**no** — defective"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Repeated eigenvalues are the danger, not a guarantee of failure",
          text: "The identity matrix has $\\lambda = 1$ with multiplicity $n$ and is already diagonal. But $\\begin{bmatrix}1&1\\\\0&1\\end{bmatrix}$ has the same eigenvalue twice and only a one-dimensional eigenspace — there is no second independent eigenvector, so no eigenbasis exists. The test is whether *geometric* multiplicity (eigenspace dimension) matches *algebraic* multiplicity (root multiplicity) for every eigenvalue.",
        },
        {
          kind: "prose",
          text: "Defective matrices need the Jordan form $\\mathbf{A} = \\mathbf{V}\\mathbf{J}\\mathbf{V}^{-1}$, where $\\mathbf{J}$ is block-diagonal with 1s just above the diagonal in each block. It is theoretically complete and numerically unusable: the block structure is discontinuous in the matrix entries, so arbitrarily small perturbations change it. Schur decomposition — $\\mathbf{A} = QTQ^{\\top}$ with $T$ triangular and $\\mathbf{Q}$ orthogonal — always exists and is what numerical software actually computes.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Powers via diagonalisation",
          problem:
            "For $\\mathbf{A} = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3\\end{bmatrix}$ with eigenpairs $(5, [1, 1])$ and $(2, [1, -2])$, describe $\\mathbf{A}^{k}$ for large $k$.",
          steps: [
            "$\\mathbf{V} = \\begin{bmatrix} 1 & 1 \\\\ 1 & -2\\end{bmatrix}$, $\\boldsymbol{\\Lambda} = \\operatorname{diag}(5,2)$.",
            "$\\mathbf{A}^{k} = \\mathbf{V}\\begin{bmatrix} 5^{k} & 0 \\\\ 0 & 2^{k}\\end{bmatrix}\\mathbf{V}^{-1}$.",
            "Factor out the dominant term: $\\mathbf{A}^{k} = 5^{k}\\mathbf{V}\\begin{bmatrix} 1 & 0 \\\\ 0 & (2/5)^{k}\\end{bmatrix}\\mathbf{V}^{-1}$.",
            "$(2/5)^{k} \\to 0$, so for large $k$ the second term is negligible.",
          ],
          answer:
            "$\\mathbf{A}^{k} \\approx 5^{k}\\,\\mathbf{v}_1\\mathbf{w}_1^{\\top}$ — growth governed entirely by the largest eigenvalue, with every starting vector aligning toward $[1, 1]$. This is the power method, and it is why the dominant eigenvector describes long-run behaviour.",
        },
      ],
    },
    {
      heading: "Where it is used",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Linear recurrences.** Fibonacci's closed form comes from diagonalising $\\begin{bmatrix}1&1\\\\1&0\\end{bmatrix}$; the golden ratio is its dominant eigenvalue.",
            "**Differential equations.** $\\dot{\\mathbf{x}} = \\mathbf{A}\\mathbf{x}$ has solution $e^{At}\\mathbf{x}_0 = \\mathbf{V}e^{\\boldsymbol{\\Lambda} t}\\mathbf{V}^{-1}\\mathbf{x}_0$, decoupling a system into independent exponentials.",
            "**Markov chains.** The eigenvalue 1 gives the stationary distribution; the second-largest modulus sets the mixing rate.",
            "**Matrix functions generally.** $f(\\mathbf{A}) = \\mathbf{V}f(\\boldsymbol{\\Lambda})\\mathbf{V}^{-1}$ defines $\\sqrt{\\mathbf{A}}$, $\\log \\mathbf{A}$, $e^{A}$ by applying $f$ to the eigenvalues.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Near-defective matrices are numerically hazardous",
          text: "If eigenvectors are nearly dependent, $\\mathbf{V}$ is ill-conditioned and $\\mathbf{V}^{-1}$ amplifies error enormously — the decomposition exists but is useless in floating point. Symmetric matrices avoid this entirely, since $\\mathbf{V}$ is orthogonal and perfectly conditioned. For non-symmetric problems, prefer the Schur form or the SVD, and treat a computed eigendecomposition with suspicion when $\\kappa(\\mathbf{V})$ is large.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§6.2" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 5C, 8D" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 24–25" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-06-determinants-and-eigenstuff.md" },
  ],
};
