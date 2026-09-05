import type { WikiArticle } from "../types";

export const fourFundamentalSubspaces: WikiArticle = {
  conceptId: "four-fundamental-subspaces",
  summary:
    "Every matrix has four subspaces: two in the input space and two in the output space, each pair orthogonal complements of the other. Together they say exactly what a transformation keeps, what it destroys, what it can reach, and what it cannot — and their dimensions are fixed by a single number, the rank.",
  sections: [
    {
      heading: "The four",
      blocks: [
        {
          kind: "table",
          headers: ["Subspace", "Definition", "Lives in", "Dimension"],
          rows: [
            ["Column space $C(A)$", "span of the columns", "$\\mathbb{R}^{m}$", "$r$"],
            ["Left null space $N(A^{\\top})$", "$\\{\\mathbf{y} : A^{\\top}\\mathbf{y} = \\mathbf{0}\\}$", "$\\mathbb{R}^{m}$", "$m - r$"],
            ["Row space $C(A^{\\top})$", "span of the rows", "$\\mathbb{R}^{n}$", "$r$"],
            ["Null space $N(A)$", "$\\{\\mathbf{x} : A\\mathbf{x} = \\mathbf{0}\\}$", "$\\mathbb{R}^{n}$", "$n - r$"],
          ],
          caption: "$r = \\operatorname{rank}(A)$. All four dimensions follow from it.",
        },
        {
          kind: "formula",
          latex: "C(A^{\\top}) \\oplus N(A) = \\mathbb{R}^{n}, \\qquad C(A) \\oplus N(A^{\\top}) = \\mathbb{R}^{m}",
          caption: "Each space splits into two orthogonal complements",
        },
      ],
    },
    {
      heading: "Why the pairs are orthogonal",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "The null space is orthogonal to the row space — by definition",
          text: "$A\\mathbf{x} = \\mathbf{0}$ says every *row* of $A$ has zero dot product with $\\mathbf{x}$. So $\\mathbf{x}$ is orthogonal to each row, hence to their whole span. That is the entire proof — the orthogonality is not a coincidence to be verified, it is a restatement of what the equation says. Applying the same reasoning to $A^{\\top}$ gives the other pair.",
        },
        {
          kind: "prose",
          text: "The dimensions then have to add to $n$ and $m$ respectively, because orthogonal complements always do. That is where rank–nullity comes from: $r + (n-r) = n$ is not an extra theorem but the complement relation in the input space.",
        },
      ],
    },
    {
      heading: "The picture",
      blocks: [
        {
          kind: "prose",
          text: "Strang's diagram is worth reconstructing from memory. The input space $\\mathbb{R}^{n}$ splits into the row space and the null space. The matrix maps the row space *one-to-one onto* the column space — no information lost there — and crushes the null space to a single point. The output space $\\mathbb{R}^{m}$ splits into the column space, which is reachable, and the left null space, which is not.",
        },
        {
          kind: "formula",
          latex: "A : \\underbrace{C(A^{\\top})}_{\\dim r} \\ \\xrightarrow{\\ \\text{bijection}\\ } \\ \\underbrace{C(A)}_{\\dim r}, \\qquad A : \\underbrace{N(A)}_{\\dim n-r} \\ \\longrightarrow \\ \\{\\mathbf{0}\\}",
          caption: "The row space carries all the surviving information",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is why row rank equals column rank",
          text: "The matrix is a bijection between the row space and the column space, so they must have the same dimension. What looks like a surprising coincidence — two subspaces in different ambient spaces sharing a dimension — is forced by the transformation setting up a one-to-one correspondence between them.",
        },
      ],
    },
    {
      heading: "What each answers",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**$C(A)$** — is $A\\mathbf{x} = \\mathbf{b}$ solvable? Only if $\\mathbf{b}$ lies here.",
            "**$N(A)$** — is the solution unique? Only if this is trivial. Otherwise the solution set is $\\mathbf{x}_0 + N(A)$.",
            "**$C(A^{\\top})$** — where the *minimum-norm* solution lives; the pseudoinverse returns the one in the row space, since any null space component only adds length.",
            "**$N(A^{\\top})$** — where residuals live. In least squares, $\\mathbf{y} - \\hat{\\mathbf{y}}$ sits here, orthogonal to every column, which *is* the normal equations.",
          ],
        },
        {
          kind: "example",
          title: "All four for one matrix",
          problem:
            "Describe the four subspaces of $A = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}$.",
          steps: [
            "Row 2 is twice row 1, so $r = 1$.",
            "$C(A) = \\operatorname{span}\\{(1,2)\\}$ — a line in $\\mathbb{R}^{2}$.",
            "$N(A^{\\top}) = \\operatorname{span}\\{(2,-1)\\}$ — the perpendicular line. Indeed $(1,2)\\cdot(2,-1) = 0$. ✓",
            "$C(A^{\\top}) = \\operatorname{span}\\{(1,2)\\}$ — here it coincides with $C(A)$, because $A$ is symmetric.",
            "$N(A) = \\operatorname{span}\\{(2,-1)\\}$, since $(1,2)\\cdot(2,-1) = 0$.",
          ],
          answer:
            "Two orthogonal lines in each copy of $\\mathbb{R}^{2}$: $1 + 1 = 2$ on both sides. The matrix flattens the whole plane onto one line.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Row space and column space are usually different",
          text: "They coincide here only because the matrix is symmetric. In general they are subspaces of different-sized spaces and share nothing but their dimension. Assuming a vector in the column space is also in the row space is a common and consequential error.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§4.1, and the 'big picture' diagram" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lectures 10, 14" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-04-four-fundamental-subspaces.md" },
  ],
};
