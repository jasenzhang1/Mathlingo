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
          latex: "A = V\\Lambda V^{-1}, \\qquad V = [\\mathbf{v}_1 \\cdots \\mathbf{v}_n], \\quad \\Lambda = \\operatorname{diag}(\\lambda_1,\\ldots,\\lambda_n)",
          caption: "Eigenvectors as columns of $V$; eigenvalues on the diagonal of $\\Lambda$",
        },
        {
          kind: "prose",
          text: "The identity is just $A\\mathbf{v}_i = \\lambda_i\\mathbf{v}_i$ collected across all $i$: $AV = V\\Lambda$. Multiplying on the right by $V^{-1}$ requires $V$ to be invertible — which is exactly the requirement that the eigenvectors be independent.",
        },
        {
          kind: "formula",
          latex: "A^{k} = V\\Lambda^{k}V^{-1}",
          caption: "The payoff: the $V^{-1}V$ pairs cancel, leaving only scalar powers",
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
            ["Symmetric (real)", "**yes** — with orthogonal $V$, by the spectral theorem"],
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
          text: "Defective matrices need the Jordan form $A = VJV^{-1}$, where $J$ is block-diagonal with 1s just above the diagonal in each block. It is theoretically complete and numerically unusable: the block structure is discontinuous in the matrix entries, so arbitrarily small perturbations change it. Schur decomposition — $A = QTQ^{\\top}$ with $T$ triangular and $Q$ orthogonal — always exists and is what numerical software actually computes.",
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
            "For $A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3\\end{bmatrix}$ with eigenpairs $(5, (1,1))$ and $(2, (1,-2))$, describe $A^{k}$ for large $k$.",
          steps: [
            "$V = \\begin{bmatrix} 1 & 1 \\\\ 1 & -2\\end{bmatrix}$, $\\Lambda = \\operatorname{diag}(5,2)$.",
            "$A^{k} = V\\begin{bmatrix} 5^{k} & 0 \\\\ 0 & 2^{k}\\end{bmatrix}V^{-1}$.",
            "Factor out the dominant term: $A^{k} = 5^{k}V\\begin{bmatrix} 1 & 0 \\\\ 0 & (2/5)^{k}\\end{bmatrix}V^{-1}$.",
            "$(2/5)^{k} \\to 0$, so for large $k$ the second term is negligible.",
          ],
          answer:
            "$A^{k} \\approx 5^{k}\\,\\mathbf{v}_1\\mathbf{w}_1^{\\top}$ — growth governed entirely by the largest eigenvalue, with every starting vector aligning toward $(1,1)$. This is the power method, and it is why the dominant eigenvector describes long-run behaviour.",
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
            "**Differential equations.** $\\dot{\\mathbf{x}} = A\\mathbf{x}$ has solution $e^{At}\\mathbf{x}_0 = Ve^{\\Lambda t}V^{-1}\\mathbf{x}_0$, decoupling a system into independent exponentials.",
            "**Markov chains.** The eigenvalue 1 gives the stationary distribution; the second-largest modulus sets the mixing rate.",
            "**Matrix functions generally.** $f(A) = Vf(\\Lambda)V^{-1}$ defines $\\sqrt{A}$, $\\log A$, $e^{A}$ by applying $f$ to the eigenvalues.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Near-defective matrices are numerically hazardous",
          text: "If eigenvectors are nearly dependent, $V$ is ill-conditioned and $V^{-1}$ amplifies error enormously — the decomposition exists but is useless in floating point. Symmetric matrices avoid this entirely, since $V$ is orthogonal and perfectly conditioned. For non-symmetric problems, prefer the Schur form or the SVD, and treat a computed eigendecomposition with suspicion when $\\kappa(V)$ is large.",
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
