import type { WikiArticle } from "../types";

export const rowSpace: WikiArticle = {
  conceptId: "row-space",
  summary:
    "The row space is the span of a matrix's rows — equivalently, the column space of its transpose. It is the orthogonal complement of the null space, it survives row reduction unchanged, and it is where the minimum-norm solution to an underdetermined system lives.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "C(A^{\\top}) = \\operatorname{span}\\{\\text{rows of } A\\} \\subseteq \\mathbb{R}^{n}",
          caption: "A subspace of the *input* space, alongside the null space",
        },
        {
          kind: "formula",
          latex: "C(A^{\\top}) \\perp N(A), \\qquad \\dim C(A^{\\top}) + \\dim N(A) = n",
          caption: "The two together fill $\\mathbb{R}^{n}$ as orthogonal complements",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The orthogonality is a restatement of $A\\mathbf{x} = \\mathbf{0}$",
          text: "That equation says every row of $A$ has zero dot product with $\\mathbf{x}$. So null space vectors are orthogonal to all rows, hence to the entire row space. Nothing needs proving — the two subspaces are complements because the equation defining one says exactly that.",
        },
      ],
    },
    {
      heading: "Row reduction preserves it",
      blocks: [
        {
          kind: "prose",
          text: "Row operations replace rows with linear combinations of rows, which cannot leave their span. So the row space of the reduced form equals that of the original — and the non-zero rows of the reduced row echelon form are a basis for it.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "This is the opposite of the column space",
          text: "For a basis of the *row* space, take rows from the **reduced** matrix. For a basis of the *column* space, take columns from the **original**. Row reduction preserves the row space and the null space while destroying the column space, and swapping the two recipes is the standard error in this material.",
        },
        {
          kind: "example",
          title: "Finding a basis",
          problem:
            "Find the row space of $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 7 \\\\ 3 & 6 & 10\\end{bmatrix}$.",
          steps: [
            "$R_2 - 2R_1$ gives $(0,0,1)$; $R_3 - 3R_1$ gives $(0,0,1)$.",
            "$R_3 - R_2$ then gives a zero row.",
            "Reduced form has non-zero rows $(1,2,3)$ and $(0,0,1)$ — and further reduction gives $(1,2,0)$ and $(0,0,1)$.",
            "Rank is 2, so $\\dim N(A) = 3 - 2 = 1$.",
          ],
          answer:
            "$C(A^{\\top}) = \\operatorname{span}\\{(1,2,0),\\ (0,0,1)\\}$ — a plane in $\\mathbb{R}^{3}$. The null space is the perpendicular line, spanned by $(2,-1,0)$, which is indeed orthogonal to both. ✓",
        },
      ],
    },
    {
      heading: "Why it matters",
      blocks: [
        {
          kind: "prose",
          text: "The matrix maps the row space one-to-one onto the column space. Everything the transformation retains is carried by the row space; everything it discards lies in the null space. That is why the two have complementary dimensions, and why row rank must equal column rank — the bijection forces it.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Minimum-norm solutions.** Any solution of $A\\mathbf{x}=\\mathbf{b}$ splits into a row space part and a null space part; the null space part adds length without changing $A\\mathbf{x}$. The pseudoinverse returns the purely row-space solution, which is the shortest one.",
            "**Constraints.** Each row of $A$ is a linear constraint on $\\mathbf{x}$. The row space is the space of all constraints implied by the system, and its dimension counts how many are genuinely independent.",
            "**Identifiability.** In regression, only the component of $\\boldsymbol{\\beta}$ in the row space of $X$ affects predictions. Collinearity means a non-trivial null space, so part of $\\boldsymbol{\\beta}$ is invisible to the data.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Row space and column space are usually unrelated",
          text: "They have equal dimension but live in $\\mathbb{R}^{n}$ and $\\mathbb{R}^{m}$ respectively, so for a non-square matrix they cannot even be compared. Even for a square matrix they generally contain different vectors; they coincide only in special cases, notably when $A$ is symmetric.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§3.5, §4.1" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lectures 6, 10" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-04-four-fundamental-subspaces.md" },
  ],
};
