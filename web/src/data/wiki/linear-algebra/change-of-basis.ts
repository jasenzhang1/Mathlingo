import type { WikiArticle } from "../types";

export const changeOfBasis: WikiArticle = {
  conceptId: "change-of-basis",
  summary:
    "A vector is not its coordinates — the coordinates depend on the basis chosen. Changing basis re-labels the same object, and a matrix representing a transformation changes by a similarity transformation $P^{-1}AP$. Most of applied linear algebra is finding the basis that makes a problem easy.",
  sections: [
    {
      heading: "Coordinates depend on the basis",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{x} = P[\\mathbf{x}]_B, \\qquad [\\mathbf{x}]_B = P^{-1}\\mathbf{x}",
          caption: "$P$ has the new basis vectors as columns; $[\\mathbf{x}]_B$ holds coordinates in that basis",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "$P$ converts *to* standard coordinates, not from",
          text: "This is the direction people reverse. $P$'s columns are the new basis vectors written in standard coordinates, so multiplying by $P$ takes new coordinates and produces standard ones. Going the other way needs $P^{-1}$. Checking against a basis vector settles it: $[\\mathbf{b}_1]_B = \\mathbf{e}_1$, and $P\\mathbf{e}_1$ is indeed the first column, $\\mathbf{b}_1$. ✓",
        },
        {
          kind: "example",
          title: "Same vector, two coordinate lists",
          problem:
            "$\\mathbf{v} = (3,1)$ in standard coordinates. What are its coordinates in the basis $\\mathbf{b}_1 = (1,1)$, $\\mathbf{b}_2 = (1,-1)$?",
          steps: [
            "$P = \\begin{bmatrix}1 & 1\\\\ 1 & -1\\end{bmatrix}$, with $\\det P = -2$.",
            "$P^{-1} = \\tfrac{1}{2}\\begin{bmatrix}1 & 1\\\\ 1 & -1\\end{bmatrix}$.",
            "$[\\mathbf{v}]_B = P^{-1}(3,1)^{\\top} = \\tfrac{1}{2}(4, 2)^{\\top} = (2,1)$.",
            "Check: $2(1,1) + 1(1,-1) = (3,1)$. ✓",
          ],
          answer:
            "$(2,1)$ in the new basis, $(3,1)$ in the standard one — one arrow, two descriptions.",
        },
      ],
    },
    {
      heading: "How matrices transform",
      blocks: [
        {
          kind: "formula",
          latex: "[T]_B = P^{-1}AP",
          caption: "Similarity transformation — the same map, expressed in the new basis",
        },
        {
          kind: "prose",
          text: "Read it right to left as a sequence: $P$ converts new coordinates to standard, $A$ applies the transformation there, and $P^{-1}$ converts back. Two matrices related this way are *similar*, and they represent the same underlying transformation.",
        },
        {
          kind: "table",
          headers: ["Preserved under similarity", "Not preserved"],
          rows: [
            ["Eigenvalues", "Individual entries"],
            ["Determinant", "Symmetry (unless $P$ is orthogonal)"],
            ["Trace", "Sparsity"],
            ["Rank", "Being diagonal or triangular"],
            ["Characteristic polynomial", "Norms (unless $P$ is orthogonal)"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is why trace and determinant are meaningful",
          text: "They are invariants — properties of the transformation, not of the arbitrary basis used to write it down. Individual matrix entries carry no such meaning, which is worth remembering when interpreting a coefficient: it is a coordinate, and coordinates depend on choices.",
        },
      ],
    },
    {
      heading: "Choosing a good basis",
      blocks: [
        {
          kind: "prose",
          text: "Every major decomposition is a change of basis chosen to simplify. Diagonalisation picks the eigenvector basis, in which the matrix acts by independent scaling. The spectral theorem does the same with an *orthogonal* $P$, so the change of basis is a rotation and nothing is distorted. The SVD uses two different bases — one for the input space, one for the output — which is exactly the extra freedom that makes it universal.",
        },
        {
          kind: "table",
          headers: ["Decomposition", "New basis", "Matrix becomes"],
          rows: [
            ["Diagonalisation $V\\Lambda V^{-1}$", "eigenvectors", "diagonal"],
            ["Spectral $Q\\Lambda Q^{\\top}$", "orthonormal eigenvectors", "diagonal, with $P^{-1} = P^{\\top}$"],
            ["SVD $U\\Sigma V^{\\top}$", "two bases", "diagonal, non-square allowed"],
            ["Schur $QTQ^{\\top}$", "orthonormal", "triangular — always exists"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "An orthogonal change of basis is the safe one",
          text: "When $P$ is orthogonal, $P^{-1} = P^{\\top}$ and the transformation is a rotation — lengths, angles, and conditioning are all preserved. A general $P$ can be badly conditioned, in which case $P^{-1}AP$ is computed with large error even though it is mathematically exact. This is why symmetric problems, which admit orthogonal $P$, are numerically comfortable and general eigendecompositions are not.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§8.2" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 3C, 5C" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-03-vector-spaces-and-bases.md" },
  ],
};
