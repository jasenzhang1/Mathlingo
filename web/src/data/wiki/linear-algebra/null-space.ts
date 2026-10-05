import type { WikiArticle } from "../types";

export const nullSpace: WikiArticle = {
  conceptId: "null-space",
  summary:
    "The null space $N(\\mathbf{A})$ is every vector the matrix sends to zero — the information the transformation destroys. It determines whether solutions are unique, and it is why collinear predictors leave regression coefficients undetermined while leaving predictions perfectly fine.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "N(\\mathbf{A}) = \\{\\mathbf{x} \\in \\mathbb{R}^{n} : \\mathbf{A}\\mathbf{x} = \\mathbf{0}\\}",
          caption: "The kernel — a subspace of the *input* space",
        },
        {
          kind: "prose",
          text: "It is always a subspace: it contains $\\mathbf{0}$, and if $\\mathbf{A}\\mathbf{x} = \\mathbf{A}\\mathbf{y} = \\mathbf{0}$ then $A(c\\mathbf{x}+d\\mathbf{y}) = \\mathbf{0}$ too. Note it lives in $\\mathbb{R}^{n}$ while the column space lives in $\\mathbb{R}^{m}$ — they are subspaces of different spaces and cannot be compared directly.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The null space is exactly the ambiguity in a solution",
          text: "If $\\mathbf{A}\\mathbf{x}_0 = \\mathbf{b}$ and $\\mathbf{n} \\in N(\\mathbf{A})$, then $A(\\mathbf{x}_0 + \\mathbf{n}) = \\mathbf{b}$ as well. So the full solution set is $\\mathbf{x}_0 + N(\\mathbf{A})$ — one particular solution plus the entire null space. Solutions are unique precisely when $N(\\mathbf{A}) = \\{\\mathbf{0}\\}$, and otherwise there are infinitely many.",
        },
      ],
    },
    {
      heading: "Computing it",
      blocks: [
        {
          kind: "example",
          title: "Free variables give basis vectors",
          problem:
            "Find $N(\\mathbf{A})$ for $\\mathbf{A} = \\begin{bmatrix} 1 & 2 & 1 \\\\ 2 & 4 & 3 \\end{bmatrix}$.",
          steps: [
            "Row reduce: $R_2 - 2R_1$ gives $\\begin{bmatrix} 1 & 2 & 1 \\\\ 0 & 0 & 1\\end{bmatrix}$.",
            "Pivots in columns 1 and 3; column 2 is free.",
            "Set $x_2 = 1$. Row 2 gives $x_3 = 0$; row 1 gives $x_1 + 2 + 0 = 0$, so $x_1 = -2$.",
            "One free variable, so the null space is one-dimensional.",
          ],
          answer:
            "$N(\\mathbf{A}) = \\operatorname{span}\\{[-2, 1, 0]\\}$. Check: $A(-2,1,0)^{\\top} = (-2+2+0,\\ -4+4+0) = [0, 0]$. ✓",
        },
        {
          kind: "prose",
          text: "The recipe is general: each free variable contributes one basis vector, obtained by setting that variable to 1 and the other free variables to 0, then back-substituting. Hence $\\dim N(\\mathbf{A})$ equals the number of free variables, which is $n - \\operatorname{rank}(\\mathbf{A})$ — the rank–nullity theorem.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Row reduction preserves the null space, not the column space",
          text: "Row operations are invertible combinations of equations, so they leave the solution set of $\\mathbf{A}\\mathbf{x}=\\mathbf{0}$ unchanged — the null space and row space survive. The column space does not: the columns get mixed. This is the reverse of the situation for $C(\\mathbf{A})$, and getting it backwards is the most common error in this material.",
        },
      ],
    },
    {
      heading: "What it means in practice",
      blocks: [
        {
          kind: "prose",
          text: "A non-trivial null space means the transformation loses information — distinct inputs map to the same output, so it cannot be inverted. Geometrically, an entire subspace is crushed to the origin.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Collinearity is a null space",
          text: "If a design matrix has height in centimetres and in inches as two columns, then $2.54\\,\\mathbf{x}_{\\text{in}} - \\mathbf{x}_{\\text{cm}}$ is in the null space. Adding any multiple of that vector to $\\boldsymbol{\\beta}$ leaves every fitted value unchanged, so the coefficients are not identifiable while the *predictions* are perfectly well determined. This is the precise sense in which collinearity harms interpretation but not prediction — and why the pseudoinverse picks the minimum-norm solution to make a choice.",
        },
        {
          kind: "table",
          headers: ["$N(\\mathbf{A})$", "Consequence"],
          rows: [
            ["$\\{\\mathbf{0}\\}$ only", "columns independent; solutions unique when they exist"],
            ["non-trivial", "infinitely many solutions, or none"],
            ["$\\dim N(\\mathbf{A}) = n - \\operatorname{rank}(\\mathbf{A})$", "rank–nullity: dimensions are conserved"],
            ["$N(\\mathbf{A}) = C(\\mathbf{A}^{\\top})^{\\perp}$", "orthogonal to every row — since $\\mathbf{A}\\mathbf{x}=\\mathbf{0}$ means each row dots to zero"],
          ],
        },
        {
          kind: "prose",
          text: "That last identity is worth seeing directly. $\\mathbf{A}\\mathbf{x} = \\mathbf{0}$ says every row of $\\mathbf{A}$ has zero dot product with $\\mathbf{x}$ — so $\\mathbf{x}$ is orthogonal to all rows, hence to their span. The null space and row space are orthogonal complements inside $\\mathbb{R}^{n}$, which is half of the four-subspace picture.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§3.2–3.3" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lectures 6–8" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-04-four-fundamental-subspaces.md" },
  ],
};
