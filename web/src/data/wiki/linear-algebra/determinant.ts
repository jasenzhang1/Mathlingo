import type { WikiArticle } from "../types";

export const determinant: WikiArticle = {
  conceptId: "determinant",
  summary:
    "The determinant is the factor by which a matrix scales volume, carrying a sign for orientation. Everything it is used for follows from that: zero determinant means the transformation flattens space and cannot be inverted, and the product rule $\\det(AB) = \\det A \\det B$ is just the statement that scaling factors multiply under composition.",
  sections: [
    {
      heading: "What it measures",
      blocks: [
        {
          kind: "prose",
          text: "Apply $A$ to the unit square (or cube, or $n$-cube). The image is a parallelogram whose area is $|\\det A|$, and the sign records whether orientation was preserved or flipped.",
        },
        {
          kind: "formula",
          latex: "\\det\\begin{bmatrix} a & b \\\\ c & d\\end{bmatrix} = ad - bc",
          caption: "The $2\\times2$ case — the signed area of the parallelogram spanned by the columns",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Zero determinant means collapse",
          text: "If $\\det A = 0$, the unit cube is squashed into something of lower dimension — a plane, a line, a point — with zero volume. Information is irrecoverably lost, so no inverse can exist. This single picture explains why $\\det A = 0$, \"$A$ is singular\", \"columns are dependent\", \"$N(A) \\ne \\{\\mathbf{0}\\}$\", and \"0 is an eigenvalue\" are all the same statement.",
        },
      ],
    },
    {
      heading: "Properties",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Statement", "Why"],
          rows: [
            ["Product", "$\\det(AB) = \\det A \\cdot \\det B$", "volume scalings compose multiplicatively"],
            ["Transpose", "$\\det A^{\\top} = \\det A$", "row rank = column rank, in effect"],
            ["Inverse", "$\\det(A^{-1}) = 1/\\det A$", "undoing a scaling by $k$ scales by $1/k$"],
            ["Scaling", "$\\det(cA) = c^{n}\\det A$", "**note the $n$** — scaling all $n$ directions"],
            ["Triangular", "product of the diagonal", "no mixing between directions"],
            ["Row swap", "flips the sign", "orientation reverses"],
            ["Row addition", "unchanged", "shearing preserves volume"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$\\det(A+B) \\ne \\det A + \\det B$",
          text: "The determinant is multiplicative, never additive. It is also not linear in the matrix as a whole — though it *is* linear in each row separately, which is what makes cofactor expansion work. Assuming additivity is the most common error with determinants, and the $c^{n}$ in the scaling rule is the second.",
        },
      ],
    },
    {
      heading: "Computing it",
      blocks: [
        {
          kind: "example",
          title: "Two routes to the same answer",
          problem:
            "Compute $\\det\\begin{bmatrix} 2 & 1 & 0 \\\\ 1 & 3 & 1 \\\\ 0 & 1 & 2\\end{bmatrix}$.",
          steps: [
            "Cofactor along the first row: $2\\det\\begin{bmatrix}3&1\\\\1&2\\end{bmatrix} - 1\\det\\begin{bmatrix}1&1\\\\0&2\\end{bmatrix} + 0$.",
            "$= 2(6-1) - 1(2-0) = 10 - 2 = 8$.",
            "By elimination: $R_2 - \\tfrac{1}{2}R_1$ gives pivot $2.5$; then $R_3 - 0.4R_2$ gives pivot $1.6$.",
            "Product of pivots: $2 \\times 2.5 \\times 1.6 = 8$. ✓",
          ],
          answer: "$\\det = 8$, so the transformation multiplies volumes by 8 and preserves orientation.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Cofactor expansion is unusable beyond small matrices",
          text: "It costs $O(n!)$ operations — a $20\\times20$ determinant would need more arithmetic than there are atoms in a person. Elimination to triangular form costs $O(n^{3})$ and is what every library actually does. Determinants also overflow badly: a $1000\\times1000$ matrix with entries around 2 has a determinant near $2^{1000}$, so software returns the *log* determinant instead.",
        },
      ],
    },
    {
      heading: "Where it appears",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Change of variables.** The Jacobian determinant is the local volume-scaling factor, which is exactly what a density must be divided by when transforming variables.",
            "**Multivariate normal.** $\\det\\Sigma$ appears in the normalising constant, and $\\log\\det\\Sigma$ in the log-likelihood — a direct measure of how much volume the distribution occupies.",
            "**Eigenvalues.** $\\det(A - \\lambda I) = 0$ is the characteristic equation, and $\\det A = \\prod\\lambda_i$.",
            "**Invertibility tests** — though numerically the condition number is a far better diagnostic than a determinant near zero, since determinant magnitude confounds scale with singularity.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A near-zero determinant does not mean ill-conditioned",
          text: "The matrix $0.001 \\times I_{100}$ has determinant $10^{-300}$ and is perfectly conditioned — it just scales everything down uniformly. Conversely a matrix with determinant 1 can be catastrophically ill-conditioned. Use the ratio of largest to smallest singular value, not the determinant, to judge numerical trouble.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "Ch. 5" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 10B" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lecture 12" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-06-determinants-and-eigenstuff.md" },
  ],
};
