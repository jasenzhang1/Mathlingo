import type { WikiArticle } from "../types";

export const invertibleMatrices: WikiArticle = {
  conceptId: "invertible-matrices",
  summary:
    "A square matrix is invertible when its transformation loses no information — nothing is crushed, everything is reachable. A dozen apparently different conditions all detect this same property, and knowing they are equivalent means any one of them can be checked, whichever is cheapest.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{A}\\mathbf{A}^{-1} = \\mathbf{A}^{-1}\\mathbf{A} = \\mathbf{I}",
          caption: "The inverse undoes the transformation, from either side",
        },
        {
          kind: "prose",
          text: "Only square matrices can be invertible. A non-square matrix changes the dimension, so it either crushes something (if $n > m$) or cannot reach everything (if $m > n$) — one-sided inverses may exist, but not a genuine two-sided one.",
        },
      ],
    },
    {
      heading: "The equivalences",
      blocks: [
        {
          kind: "prose",
          text: "For a square $n\\times n$ matrix $\\mathbf{A}$, all of the following are equivalent. Any one implies all the others.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "$\\mathbf{A}^{-1}$ exists.",
            "$\\det \\mathbf{A} \\ne 0$.",
            "$\\operatorname{rank}(\\mathbf{A}) = n$ — full rank.",
            "$N(\\mathbf{A}) = \\{\\mathbf{0}\\}$ — nothing is crushed to zero.",
            "$C(\\mathbf{A}) = \\mathbb{R}^{n}$ — everything is reachable.",
            "The columns are linearly independent; likewise the rows.",
            "$\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ has exactly one solution, for every $\\mathbf{b}$.",
            "0 is not an eigenvalue.",
            "All $n$ pivots are non-zero.",
            "$\\mathbf{A}^{\\top}\\mathbf{A}$ is positive definite.",
            "All singular values are positive.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "They are all the same fact",
          text: "Each says the transformation is a bijection. A non-trivial null space means two inputs share an output, so inversion is ambiguous; a deficient column space means some output is unreachable, so inversion is undefined there. For square matrices these fail together — rank–nullity forces it — which is why one list covers both.",
        },
      ],
    },
    {
      heading: "Computing with inverses",
      blocks: [
        {
          kind: "table",
          headers: ["Rule", "Statement"],
          rows: [
            ["Product", "$(\\mathbf{A}\\mathbf{B})^{-1} = \\mathbf{B}^{-1}\\mathbf{A}^{-1}$ — order reverses"],
            ["Transpose", "$(\\mathbf{A}^{\\top})^{-1} = (\\mathbf{A}^{-1})^{\\top}$"],
            ["Determinant", "$\\det(\\mathbf{A}^{-1}) = 1/\\det \\mathbf{A}$"],
            ["Eigenvalues", "those of $\\mathbf{A}^{-1}$ are $1/\\lambda_i$, with the same eigenvectors"],
            ["Orthogonal", "$Q^{-1} = Q^{\\top}$ — inversion is free"],
            ["Diagonal", "invert each diagonal entry"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Never compute an inverse to solve a system",
          text: "$\\mathbf{x} = \\mathbf{A}^{-1}\\mathbf{b}$ is correct mathematics and poor computation. Forming $\\mathbf{A}^{-1}$ costs about three times as much as an LU factorisation, and it is less accurate — the explicit inverse amplifies rounding error. Use `solve(A, b)`, never `inv(A) @ b`. The only good reasons to form an inverse explicitly are when its individual entries are the quantity of interest, as with the covariance matrix of regression coefficients.",
        },
        {
          kind: "formula",
          latex: "\\kappa(\\mathbf{A}) = \\|\\mathbf{A}\\|\\,\\|\\mathbf{A}^{-1}\\| = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}}",
          caption: "The condition number — how much the inverse can amplify error",
        },
        {
          kind: "prose",
          text: "Invertibility is binary; conditioning is a matter of degree, and in practice it is the one that matters. A matrix with $\\kappa = 10^{10}$ is invertible and effectively useless: relative errors in $\\mathbf{b}$ are magnified tenfold-billion in $\\mathbf{x}$, so roughly ten of the sixteen digits of double precision are destroyed.",
        },
      ],
    },
    {
      heading: "When there is no inverse",
      blocks: [
        {
          kind: "example",
          title: "The $2\\times2$ formula, and its failure",
          problem:
            "Invert $\\mathbf{A} = \\begin{bmatrix} 3 & 1 \\\\ 2 & 4\\end{bmatrix}$. Then attempt $\\mathbf{B} = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4\\end{bmatrix}$.",
          steps: [
            "$\\det \\mathbf{A} = 12 - 2 = 10 \\ne 0$, so $\\mathbf{A}$ is invertible.",
            "$\\mathbf{A}^{-1} = \\tfrac{1}{10}\\begin{bmatrix} 4 & -1 \\\\ -2 & 3\\end{bmatrix}$ — swap the diagonal, negate the off-diagonal, divide by the determinant.",
            "$\\det \\mathbf{B} = 4 - 4 = 0$, so no inverse exists.",
            "Indeed row 2 is twice row 1: $\\mathbf{B}$ collapses $\\mathbb{R}^{2}$ onto a line, and $[2, -1]$ lies in its null space.",
          ],
          answer:
            "$\\mathbf{A}^{-1}$ as above; $\\mathbf{B}$ is singular, with the redundancy visible as a dependent row.",
        },
        {
          kind: "prose",
          text: "When no inverse exists the pseudoinverse $\\mathbf{A}^{+}$ takes over. It returns the least-squares solution when the system is inconsistent, and the minimum-norm solution when there are many — reducing to $\\mathbf{A}^{-1}$ exactly when that exists. It is built from the SVD by inverting the non-zero singular values, which also makes it the natural tool for near-singular matrices where a true inverse would be numerically worthless.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§2.5, §3.3" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 12, 20–22" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-05-rank-and-orthogonalization.md" },
  ],
};
