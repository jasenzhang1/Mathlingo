import type { WikiArticle } from "../types";

export const matrixMultiplication: WikiArticle = {
  conceptId: "matrix-multiplication",
  summary:
    "Matrix multiplication looks like an arbitrary rule until you see what it encodes: the product $AB$ is the matrix of the composed transformation \"do $B$, then $A$\". Every property that seems strange — non-commutativity, the dimension requirement, the order reversal under transpose — follows directly from that.",
  sections: [
    {
      heading: "The definition, four ways",
      blocks: [
        {
          kind: "formula",
          latex: "(AB)_{ij} = \\sum_{k} A_{ik}B_{kj}",
          caption: "Entry $(i,j)$ is row $i$ of $A$ dotted with column $j$ of $B$",
        },
        {
          kind: "table",
          headers: ["View", "Reading", "Useful for"],
          rows: [
            ["Dot products", "$(AB)_{ij} = \\text{row}_i(A)\\cdot\\text{col}_j(B)$", "computing by hand"],
            [
              "Columns",
              "column $j$ of $AB$ is $A\\,\\text{col}_j(B)$",
              "seeing that $AB$'s columns live in $C(A)$",
            ],
            [
              "Rows",
              "row $i$ of $AB$ is $\\text{row}_i(A)\\,B$",
              "seeing that $AB$'s rows live in the row space of $B$",
            ],
            [
              "Outer products",
              "$AB = \\sum_k \\text{col}_k(A)\\,\\text{row}_k(B)$",
              "low-rank structure, SVD",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The column view explains the shape rule",
          text: "$A\\mathbf{x}$ is a linear combination of $A$'s columns with weights $\\mathbf{x}$ — so there must be as many weights as columns. Hence $A$ being $m\\times n$ forces $B$ to be $n\\times p$: each column of $B$ supplies weights for $A$'s $n$ columns. The dimension requirement is not bookkeeping, it is the statement that the combination has to make sense.",
        },
      ],
    },
    {
      heading: "Composition",
      blocks: [
        {
          kind: "formula",
          latex: "(AB)\\mathbf{x} = A(B\\mathbf{x})",
          caption: "$AB$ is the matrix of \"apply $B$, then apply $A$\"",
        },
        {
          kind: "prose",
          text: "This is the whole reason for the definition. Matrices represent linear transformations, and the product is defined so that multiplying matrices corresponds to composing the transformations they represent. Right-to-left order matches function notation $f(g(x))$, which is why $AB$ means $B$ first.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$AB \\neq BA$, and the reason is geometric",
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
            ["Associative: $(AB)C = A(BC)$", "Commutative: $AB \\ne BA$"],
            ["Distributive: $A(B+C) = AB + AC$", "Cancellation: $AB = AC \\not\\Rightarrow B = C$"],
            ["$(AB)^{\\top} = B^{\\top}A^{\\top}$", "Zero divisors: $AB = 0$ with $A,B \\ne 0$"],
            ["$(AB)^{-1} = B^{-1}A^{-1}$", "$(A+B)^{2} = A^{2} + 2AB + B^{2}$"],
          ],
        },
        {
          kind: "prose",
          text: "The order reversal in the transpose and inverse rules is the same fact twice: undoing \"do $B$, then $A$\" means undoing $A$ first. The failure of $(A+B)^{2}$ to expand as usual is non-commutativity — the correct expansion is $A^{2} + AB + BA + B^{2}$, and the cross terms do not combine.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Associativity is worth exploiting",
          text: "Computing $A(BC)$ versus $(AB)C$ gives the same answer at very different cost. For $A$ of size $1000\\times1$, $B$ of $1\\times1000$, and $C$ of $1000\\times1$: $(AB)C$ builds a $1000\\times1000$ matrix first — about $10^{6}$ multiplications — while $A(BC)$ computes a scalar first, at about $2000$. Reassociating is a standard optimisation in deep learning and in matrix chain problems.",
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
            "$A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, $B = \\begin{bmatrix} 0 & 1 \\\\ 1 & 1 \\end{bmatrix}$. Compute $AB$ and $BA$.",
          steps: [
            "$(AB)_{11} = 1(0) + 2(1) = 2$; $(AB)_{12} = 1(1) + 2(1) = 3$.",
            "$(AB)_{21} = 3(0) + 4(1) = 4$; $(AB)_{22} = 3(1) + 4(1) = 7$.",
            "$AB = \\begin{bmatrix} 2 & 3 \\\\ 4 & 7\\end{bmatrix}$.",
            "$BA = \\begin{bmatrix} 3 & 4 \\\\ 4 & 6\\end{bmatrix}$ by the same computation.",
          ],
          answer: "$AB \\neq BA$ — different matrices entirely, from the same two factors.",
        },
        {
          kind: "prose",
          text: "The outer-product view is the one to carry forward. Writing $AB = \\sum_k \\mathbf{a}_k\\mathbf{b}_k^{\\top}$ as a sum of rank-1 matrices is exactly the form the SVD produces, and it is why truncating that sum gives the best low-rank approximation.",
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
