import type { WikiArticle } from "../types";

export const leftNullSpace: WikiArticle = {
  conceptId: "left-null-space",
  summary:
    "The left null space is everything the matrix cannot reach — the orthogonal complement of the column space. It is where least-squares residuals live, and its dimension counts the redundant equations in a system.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "N(A^{\\top}) = \\{\\mathbf{y} \\in \\mathbb{R}^{m} : A^{\\top}\\mathbf{y} = \\mathbf{0}\\} = \\{\\mathbf{y} : \\mathbf{y}^{\\top}A = \\mathbf{0}^{\\top}\\}",
          caption: "The 'left' refers to $\\mathbf{y}$ multiplying $A$ from the left",
        },
        {
          kind: "formula",
          latex: "N(A^{\\top}) = C(A)^{\\perp}, \\qquad \\dim N(A^{\\top}) = m - r",
          caption: "Orthogonal complement of the column space, inside the output space $\\mathbb{R}^{m}$",
        },
        {
          kind: "prose",
          text: "The orthogonality is again a restatement: $A^{\\top}\\mathbf{y} = \\mathbf{0}$ says $\\mathbf{y}$ has zero dot product with every column of $A$, hence with their span. This is the mirror of the row space / null space relationship, one space over.",
        },
      ],
    },
    {
      heading: "It contains the residuals",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{y} - \\hat{\\mathbf{y}} \\in N(X^{\\top}) \\iff X^{\\top}(\\mathbf{y} - X\\boldsymbol{\\beta}) = \\mathbf{0}",
          caption: "The normal equations, read as a statement about the left null space",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Least squares splits $\\mathbf{y}$ across the two output subspaces",
          text: "$\\mathbb{R}^{m}$ decomposes into $C(X)$, everything the model can produce, and $N(X^{\\top})$, everything it cannot. The observed $\\mathbf{y}$ splits uniquely into a fitted part in the first and a residual in the second. \"Residuals are orthogonal to the predictors\" is not an extra condition imposed on the fit — it is the definition of that decomposition, and it is why residual plots showing structure indicate a mis-specified model rather than a computational error.",
        },
        {
          kind: "prose",
          text: "The dimension $m - r$ is also the residual degrees of freedom. With $n$ observations and $p$ independent predictors, residuals live in an $(n-p)$-dimensional space — which is exactly the $n-p$ appearing in $s^{2} = \\text{RSS}/(n-p)$ and in every associated $t$ and $F$ test.",
        },
      ],
    },
    {
      heading: "Detecting redundancy",
      blocks: [
        {
          kind: "prose",
          text: "A vector in the left null space is a linear combination of the *equations* that produces $0 = 0$. If such a combination applied to $\\mathbf{b}$ gives something non-zero, the system is inconsistent — the equations contradict each other.",
        },
        {
          kind: "example",
          title: "Finding an inconsistency",
          problem:
            "Why is the system $x + y = 1$, $2x + 2y = 3$ inconsistent, expressed via the left null space?",
          steps: [
            "$A = \\begin{bmatrix}1&1\\\\2&2\\end{bmatrix}$, rank 1, so $\\dim N(A^{\\top}) = 2 - 1 = 1$.",
            "Solve $A^{\\top}\\mathbf{y} = \\mathbf{0}$: $y_1 + 2y_2 = 0$, giving $\\mathbf{y} = (2,-1)$.",
            "This says $2\\times(\\text{row }1) - 1\\times(\\text{row }2) = \\mathbf{0}$ — the equations are dependent.",
            "Apply the same combination to the right side: $2(1) - 1(3) = -1 \\ne 0$.",
          ],
          answer:
            "Inconsistent. Solvability requires $\\mathbf{y}^{\\top}\\mathbf{b} = 0$ for every $\\mathbf{y}$ in the left null space — the Fredholm alternative, and the precise condition for $\\mathbf{b} \\in C(A)$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Conservation laws are left null space vectors",
          text: "In a network flow or chemical reaction system, a vector $\\mathbf{y}$ with $A^{\\top}\\mathbf{y} = \\mathbf{0}$ identifies a quantity conserved by every possible process. In electrical circuits these are Kirchhoff's loop laws; in metabolic networks they are the conserved moieties. The left null space is where a system's invariants are found.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§4.1" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lectures 10, 14–15" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-04-four-fundamental-subspaces.md" },
  ],
};
