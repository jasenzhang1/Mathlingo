import type { WikiArticle } from "../types";

export const rankNullityTheorem: WikiArticle = {
  conceptId: "rank-nullity-theorem",
  summary:
    "Rank–nullity says the dimensions of the image and the kernel add to the dimension of the domain. It is a conservation law: every input direction either survives the transformation or is destroyed by it, and none does both or neither.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{rank}(A) + \\dim N(A) = n",
          caption: "For $A \\in \\mathbb{R}^{m\\times n}$ — $n$ is the number of *columns*, the input dimension",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It is $n$, not $m$",
          text: "The theorem is about the domain. A $3\\times7$ matrix has $\\operatorname{rank} + \\dim N(A) = 7$, regardless of having only three rows. Substituting the row count is the standard error, and it produces impossible results — such as a rank exceeding the number of columns.",
        },
        {
          kind: "prose",
          text: "The counting argument is immediate from row reduction: each column is either a pivot column or a free column. Pivot columns count toward the rank; free columns each contribute one basis vector to the null space. There are $n$ columns, and every one is exactly one of the two.",
        },
      ],
    },
    {
      heading: "The conservation reading",
      blocks: [
        {
          kind: "prose",
          text: "Think of the $n$ input dimensions as a budget. The transformation spends $r$ of them on directions that survive into the output — the row space, mapped bijectively onto the column space — and annihilates the remaining $n - r$, which form the null space. Nothing is left over and nothing is counted twice.",
        },
        {
          kind: "formula",
          latex: "\\underbrace{n}_{\\text{input dims}} = \\underbrace{r}_{\\text{survive}} + \\underbrace{n-r}_{\\text{destroyed}}",
          caption: "The theorem restated as a budget",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Immediate consequences",
          text: "A map from a higher- to a lower-dimensional space must have a non-trivial null space — $r \\le m < n$ forces $\\dim N(A) \\ge n - m > 0$. So a $2\\times5$ system always has infinitely many solutions when it has any, and five vectors in $\\mathbb{R}^{2}$ are always dependent. Both facts are usually proved separately; both are this theorem.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Deducing the null space dimension",
          problem:
            "A $4\\times6$ matrix has rank 3. What are the dimensions of all four fundamental subspaces?",
          steps: [
            "$n = 6$ columns, $m = 4$ rows, $r = 3$.",
            "$\\dim C(A) = r = 3$, a subspace of $\\mathbb{R}^{4}$.",
            "$\\dim N(A) = n - r = 6 - 3 = 3$, in $\\mathbb{R}^{6}$.",
            "$\\dim C(A^{\\top}) = r = 3$, in $\\mathbb{R}^{6}$. Note $3 + 3 = 6$. ✓",
            "$\\dim N(A^{\\top}) = m - r = 4 - 3 = 1$, in $\\mathbb{R}^{4}$. And $3 + 1 = 4$. ✓",
          ],
          answer:
            "$3, 3, 3, 1$. The system $A\\mathbf{x}=\\mathbf{b}$ is solvable only for $\\mathbf{b}$ in a 3-dimensional slice of $\\mathbb{R}^{4}$, and solutions then form a 3-dimensional family.",
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
            "**Degrees of freedom.** In a regression with $n$ observations and $p$ estimated parameters, residuals lie in an $(n-p)$-dimensional space — which is the $n-p$ in the residual variance denominator and in every $t$ and $F$ test's degrees of freedom.",
            "**Identifiability.** A non-trivial null space in a design matrix means parameters are not identifiable; the dimension of that null space counts how many constraints are needed to pin them down.",
            "**Constraint counting.** Each independent linear constraint on $\\mathbb{R}^{n}$ reduces the solution space by exactly one dimension, because each adds one to the rank.",
            "**Dimensionality reduction.** If data lies in a rank-$r$ subspace of $\\mathbb{R}^{n}$, there are $n-r$ exact linear relationships among the features — the null space directions are the redundancies.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The general version",
          text: "For any linear map $T : V \\to W$ between finite-dimensional spaces, $\\dim\\ker T + \\dim\\operatorname{im} T = \\dim V$. The matrix statement is the special case $V = \\mathbb{R}^{n}$, and the abstract form applies unchanged to polynomials, function spaces, and differential operators — differentiation on polynomials of degree $\\le n$ has a one-dimensional kernel (the constants), so its image has dimension $n$.",
        },
      ],
    },
  ],
  references: [
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 3B, Thm 3.22" },
    { source: "Strang, Introduction to Linear Algebra", locator: "§3.3, §4.1" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-04-four-fundamental-subspaces.md" },
  ],
};
