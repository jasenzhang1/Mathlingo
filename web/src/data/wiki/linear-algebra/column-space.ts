import type { WikiArticle } from "../types";

export const columnSpace: WikiArticle = {
  conceptId: "column-space",
  summary:
    "The column space $C(\\mathbf{A})$ is the span of $\\mathbf{A}$'s columns — every output the transformation can produce. It answers the solvability question directly: $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ has a solution exactly when $\\mathbf{b}$ lies in it, and least squares exists because usually it does not.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "C(\\mathbf{A}) = \\{\\mathbf{A}\\mathbf{x} : \\mathbf{x} \\in \\mathbb{R}^{n}\\} = \\operatorname{span}\\{\\text{columns of } \\mathbf{A}\\} \\subseteq \\mathbb{R}^{m}",
          caption: "The image of the transformation — a subspace of the output space",
        },
        {
          kind: "prose",
          text: "The two descriptions agree because $\\mathbf{A}\\mathbf{x}$ *is* a linear combination of the columns weighted by $\\mathbf{x}$. Note the column space lives in $\\mathbb{R}^{m}$, the output space, while $\\mathbf{x}$ lives in $\\mathbb{R}^{n}$ — a common source of dimension confusion.",
        },
        {
          kind: "formula",
          latex: "\\dim C(\\mathbf{A}) = \\operatorname{rank}(\\mathbf{A})",
          caption: "Rank is the dimension of the column space",
        },
      ],
    },
    {
      heading: "Finding it",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Use the *original* columns, not the reduced ones",
          text: "Row reduction identifies which columns are pivot columns, but it changes the column space — row operations mix rows and therefore move the columns. So the algorithm is: reduce to find the pivot positions, then take those columns *from the original matrix*. Taking them from the reduced form gives the wrong subspace. Row reduction preserves the row space and the null space; the column space is the one it destroys.",
        },
        {
          kind: "example",
          title: "A basis for the column space",
          problem:
            "Find $C(\\mathbf{A})$ for $\\mathbf{A} = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 7 \\\\ 3 & 6 & 10 \\end{bmatrix}$.",
          steps: [
            "Column 2 is $2\\times$ column 1, so it adds nothing.",
            "Row reduce: pivots appear in columns 1 and 3.",
            "Take those columns from the original $\\mathbf{A}$: $[1, 2, 3]$ and $[3, 7, 10]$.",
            "Rank is 2, so $C(\\mathbf{A})$ is a plane in $\\mathbb{R}^{3}$, not all of it.",
          ],
          answer:
            "$C(\\mathbf{A}) = \\operatorname{span}\\{[1, 2, 3],\\ [3, 7, 10]\\}$ — a 2-dimensional subspace of $\\mathbb{R}^{3}$.",
        },
      ],
    },
    {
      heading: "Why it is the space that matters for regression",
      blocks: [
        {
          kind: "prose",
          text: "In least squares, $C(\\mathbf{X})$ is the set of all fitted values the model can produce. The observed $\\mathbf{y}$ almost never lies in it — real data has noise off the model's reach — so the system $\\mathbf{X}\\boldsymbol{\\beta} = \\mathbf{y}$ is inconsistent. Projecting $\\mathbf{y}$ onto $C(\\mathbf{X})$ gives the closest achievable prediction, and the residual is the part of $\\mathbf{y}$ orthogonal to the column space.",
        },
        {
          kind: "formula",
          latex: "\\hat{\\mathbf{y}} = \\mathbf{P}\\mathbf{y} \\in C(\\mathbf{X}), \\qquad \\mathbf{y} - \\hat{\\mathbf{y}} \\perp C(\\mathbf{X})",
          caption: "Fitted values live in the column space; residuals live in its orthogonal complement",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Adding a predictor enlarges the column space",
          text: "This is why $\\mathbf{R}^{2}$ can never decrease when a variable is added: the new column space contains the old one, so the projection can only get closer to $\\mathbf{y}$. It is also why $\\mathbf{R}^{2}$ is a poor model-selection criterion — it rewards enlarging the space regardless of whether the extra direction is real signal. Adjusted $\\mathbf{R}^{2}$, AIC, and cross-validation all exist to penalise that.",
        },
      ],
    },
    {
      heading: "Relations to the other subspaces",
      blocks: [
        {
          kind: "table",
          headers: ["Fact", "Statement"],
          rows: [
            ["Dimension", "$\\dim C(\\mathbf{A}) = \\operatorname{rank}(\\mathbf{A}) = \\dim C(\\mathbf{A}^{\\top})$"],
            ["Orthogonal complement", "$C(\\mathbf{A})^{\\perp} = N(\\mathbf{A}^{\\top})$, the left null space"],
            ["Full column rank", "columns independent $\\Rightarrow$ $N(\\mathbf{A}) = \\{\\mathbf{0}\\}$, solutions unique when they exist"],
            ["Full row rank", "$C(\\mathbf{A}) = \\mathbb{R}^{m}$ $\\Rightarrow$ solutions always exist"],
            ["Both", "square and invertible — exactly one solution for every $\\mathbf{b}$"],
          ],
        },
        {
          kind: "prose",
          text: "The equality $\\dim C(\\mathbf{A}) = \\dim C(\\mathbf{A}^{\\top})$ — row rank equals column rank — is one of the genuinely surprising results in the subject. The two spaces live in different ambient dimensions and generally contain entirely different vectors, yet they always have the same dimension.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§3.1, §4.1" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lectures 5–10" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-04-four-fundamental-subspaces.md" },
  ],
};
