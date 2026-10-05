import type { WikiArticle } from "../types";

export const matrixMultiplication: WikiArticle = {
  conceptId: "matrix-multiplication",
  summary:
    "Matrix multiplication looks like an arbitrary rule until you see what it encodes: the product $\\mathbf{A}\\mathbf{B}$ is the matrix of the composed transformation “do $\\mathbf{B}$, then $\\mathbf{A}$”. Every property that seems strange — non-commutativity, the dimension requirement, the order reversal under transpose — follows directly from that.",
  sections: [
    {
      heading: "The definition, four ways",
      blocks: [
        {
          kind: "formula",
          latex: "(\\mathbf{A}\\mathbf{B})_{ij} = \\sum_{k} \\mathbf{A}_{ik}\\mathbf{B}_{kj}",
          caption: "Entry $(i,j)$ is row $i$ of $\\mathbf{A}$ dotted with column $j$ of $\\mathbf{B}$",
        },
        {
          kind: "table",
          headers: ["View", "Reading", "Useful for"],
          rows: [
            ["Dot products", "$(\\mathbf{A}\\mathbf{B})_{ij} = \\text{row}_i(\\mathbf{A})\\cdot\\text{col}_j(\\mathbf{B})$", "computing by hand"],
            [
              "Columns",
              "column $j$ of $\\mathbf{A}\\mathbf{B}$ is $\\mathbf{A}\\,\\text{col}_j(\\mathbf{B})$",
              "seeing that $\\mathbf{A}\\mathbf{B}$'s columns live in $C(\\mathbf{A})$",
            ],
            [
              "Rows",
              "row $i$ of $\\mathbf{A}\\mathbf{B}$ is $\\text{row}_i(\\mathbf{A})\\,\\mathbf{B}$",
              "seeing that $\\mathbf{A}\\mathbf{B}$'s rows live in the row space of $\\mathbf{B}$",
            ],
            [
              "Outer products",
              "$\\mathbf{A}\\mathbf{B} = \\sum_k \\text{col}_k(\\mathbf{A})\\,\\text{row}_k(\\mathbf{B})$",
              "low-rank structure, SVD",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The column view explains the shape rule",
          text: "$\\mathbf{A}\\mathbf{x}$ is a linear combination of $\\mathbf{A}$'s columns with weights $\\mathbf{x}$ — so there must be as many weights as columns. Hence $\\mathbf{A}$ being $m\\times n$ forces $\\mathbf{B}$ to be $n\\times p$: each column of $\\mathbf{B}$ supplies weights for $\\mathbf{A}$'s $n$ columns. The dimension requirement is not bookkeeping, it is the statement that the combination has to make sense.",
        },
      ],
    },
    {
      heading: "Composition",
      blocks: [
        {
          kind: "formula",
          latex: "(\\mathbf{A}\\mathbf{B})\\mathbf{x} = A(\\mathbf{B}\\mathbf{x})",
          caption: "$\\mathbf{A}\\mathbf{B}$ is the matrix of “apply $\\mathbf{B}$, then apply $\\mathbf{A}$”",
        },
        {
          kind: "prose",
          text: "This is the whole reason for the definition. Matrices represent linear transformations, and the product is defined so that multiplying matrices corresponds to composing the transformations they represent. Right-to-left order matches function notation $f(g(x))$, which is why $\\mathbf{A}\\mathbf{B}$ means $\\mathbf{B}$ first.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$\\mathbf{A}\\mathbf{B} \\neq \\mathbf{B}\\mathbf{A}$, and the reason is geometric",
          text: "Rotating 90° then reflecting is not the same as reflecting then rotating — the operations genuinely happen in an order. Non-commutativity is not an algebraic defect; it is the correct encoding of the fact that composition is order-dependent. In some cases the shapes do not even allow both products.",
        },
      ],
    },
    {
      heading: "Properties",
      blocks: [
        {
          kind: "table",
          headers: ["Holds", "Fails"],
          rows: [
            ["Associative: $(\\mathbf{A}\\mathbf{B})\\mathbf{C} = A(\\mathbf{B}\\mathbf{C})$", "Commutative: $\\mathbf{A}\\mathbf{B} \\ne \\mathbf{B}\\mathbf{A}$"],
            ["Distributive: $A(\\mathbf{B}+\\mathbf{C}) = \\mathbf{A}\\mathbf{B} + \\mathbf{A}\\mathbf{C}$", "Cancellation: $\\mathbf{A}\\mathbf{B} = \\mathbf{A}\\mathbf{C} \\not\\Rightarrow \\mathbf{B} = \\mathbf{C}$"],
            ["$(\\mathbf{A}\\mathbf{B})^{\\top} = \\mathbf{B}^{\\top}\\mathbf{A}^{\\top}$", "Zero divisors: $\\mathbf{A}\\mathbf{B} = 0$ with $\\mathbf{A},\\mathbf{B} \\ne 0$"],
            ["$(\\mathbf{A}\\mathbf{B})^{-1} = \\mathbf{B}^{-1}\\mathbf{A}^{-1}$", "$(\\mathbf{A}+\\mathbf{B})^{2} = \\mathbf{A}^{2} + 2\\mathbf{A}\\mathbf{B} + \\mathbf{B}^{2}$"],
          ],
        },
        {
          kind: "prose",
          text: "The order reversal in the transpose and inverse rules is the same fact twice: undoing “do $\\mathbf{B}$, then $\\mathbf{A}$” means undoing $\\mathbf{A}$ first. The failure of $(\\mathbf{A}+\\mathbf{B})^{2}$ to expand as usual is non-commutativity — the correct expansion is $\\mathbf{A}^{2} + \\mathbf{A}\\mathbf{B} + \\mathbf{B}\\mathbf{A} + \\mathbf{B}^{2}$, and the cross terms do not combine.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Associativity is worth exploiting",
          text: "Computing $A(\\mathbf{B}\\mathbf{C})$ versus $(\\mathbf{A}\\mathbf{B})\\mathbf{C}$ gives the same answer at very different cost. For $\\mathbf{A}$ of size $1000\\times1$, $\\mathbf{B}$ of $1\\times1000$, and $\\mathbf{C}$ of $1000\\times1$: $(\\mathbf{A}\\mathbf{B})\\mathbf{C}$ builds a $1000\\times1000$ matrix first — about $10^{6}$ multiplications — while $A(\\mathbf{B}\\mathbf{C})$ computes a scalar first, at about $2000$. Reassociating is a standard optimisation in deep learning and in matrix chain problems.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "By hand, and by the column view",
          problem:
            "$\\mathbf{A} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $\\mathbf{B} = \\begin{bmatrix} 0 & 1 \\\\ 1 & 1 \\end{bmatrix}$. Compute $\\mathbf{A}\\mathbf{B}$ and $\\mathbf{B}\\mathbf{A}$.",
          steps: [
            "$(\\mathbf{A}\\mathbf{B})_{11} = 1(0) + 2(1) = 2$; $(\\mathbf{A}\\mathbf{B})_{12} = 1(1) + 2(1) = 3$.",
            "$(\\mathbf{A}\\mathbf{B})_{21} = 3(0) + 4(1) = 4$; $(\\mathbf{A}\\mathbf{B})_{22} = 3(1) + 4(1) = 7$.",
            "$\\mathbf{A}\\mathbf{B} = \\begin{bmatrix} 2 & 3 \\\\ 4 & 7\\end{bmatrix}$.",
            "$\\mathbf{B}\\mathbf{A} = \\begin{bmatrix} 3 & 4 \\\\ 4 & 6\\end{bmatrix}$ by the same computation.",
          ],
          answer: "$\\mathbf{A}\\mathbf{B} \\neq \\mathbf{B}\\mathbf{A}$ — different matrices entirely, from the same two factors.",
        },
        {
          kind: "prose",
          text: "The outer-product view is the one to carry forward. Writing $\\mathbf{A}\\mathbf{B} = \\sum_k \\mathbf{a}_k\\mathbf{b}_k^{\\top}$ as a sum of rank-1 matrices is exactly the form the SVD produces, and it is why truncating that sum gives the best low-rank approximation.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§2.4" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 3C" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lectures 1–3" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-02-matrices-and-structure.md" },
  ],
};
