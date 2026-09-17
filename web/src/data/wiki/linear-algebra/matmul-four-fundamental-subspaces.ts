import type { WikiArticle } from "../types";

export const matmulFourFundamentalSubspaces: WikiArticle = {
  conceptId: "matmul-four-fundamental-subspaces",
  summary:
    "Multiplying by A does two very different things to a vector depending on where that vector sits: it annihilates the null-space part and it maps the row-space part invertibly onto the column space. That single split is the hidden 'invertible core' inside every non-invertible matrix, and the reason row rank always equals column rank.",
  sections: [
    {
      heading: "Every input splits, and A treats the two halves differently",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{x} = \\mathbf{x}_{\\text{row}} + \\mathbf{x}_{\\text{null}}, \\qquad \\mathbf{x}_{\\text{row}} \\in C(A^{\\top}),\\ \\mathbf{x}_{\\text{null}} \\in N(A)",
          caption: "Every $\\mathbf{x} \\in \\mathbb{R}^{n}$ decomposes uniquely, since row space and null space are orthogonal complements",
        },
        {
          kind: "formula",
          latex: "A\\mathbf{x} = A\\mathbf{x}_{\\text{row}} + A\\mathbf{x}_{\\text{null}} = A\\mathbf{x}_{\\text{row}} + \\mathbf{0}",
          caption: "The null-space part vanishes; only the row-space part survives into the output",
        },
        {
          kind: "prose",
          text: "This is not an approximation or a special case — it is exactly what the definitions of $N(A)$ and $C(A^{\\top})$ force. Two vectors that differ only by something in $N(A)$ produce identical outputs, so as far as $A$ is concerned, the null-space component of any input might as well not exist.",
        },
      ],
    },
    {
      heading: "The row space maps invertibly onto the column space",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "A hidden bijection inside a singular matrix",
          text: "Restrict $A$'s domain to the row space alone. No nonzero vector there is sent to $\\mathbf{0}$ — those live in $N(A)$, which meets the row space only at the origin. So distinct row-space vectors always produce distinct outputs (injective), and every output in $C(A)$ is reached by definition (surjective onto $C(A)$). The restriction $A\\big|_{C(A^{\\top})} : C(A^{\\top}) \\to C(A)$ is therefore a genuine linear bijection — invertible — even when $A$ itself, acting on all of $\\mathbb{R}^{n}$, is singular.",
        },
        {
          kind: "example",
          title: "Watching the bijection in a singular matrix",
          problem:
            "For $A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$ (row space $\\operatorname{span}\\{(1,1)\\}$, null space $\\operatorname{span}\\{(1,-1)\\}$), track what happens to $\\mathbf{x} = (3,1)$.",
          steps: [
            "Decompose: $(3,1) = 2(1,1) + 1(1,-1)$ — a row-space part and a null-space part.",
            "$A(1,-1) = (1-1,\\, 1-1) = (0,0)$ — the null-space part vanishes, as it must.",
            "$A(2,2) = (4,4)$ — the row-space part is what survives.",
            "$A(3,1) = (4,4)$ directly, confirming only the row-space component mattered.",
          ],
          answer:
            "$A(3,1) = (4,4)$, exactly the image of the row-space component alone — the null-space component contributed nothing, no matter how large it was.",
        },
      ],
    },
    {
      heading: "Why this forces row rank to equal column rank",
      blocks: [
        {
          kind: "prose",
          text: "A bijection between two spaces requires them to have the same dimension. Since $A$ restricted to the row space is a bijection onto the column space, $\\dim C(A^{\\top}) = \\dim C(A)$ — row rank equals column rank. This is often presented as a mysterious coincidence between two spaces that live in entirely different ambient dimensions ($\\mathbb{R}^{n}$ versus $\\mathbb{R}^{m}$); the matmul picture shows it is really just a statement that a bijection preserves dimension.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Row-space part of $\\mathbf{x}$", description: "the unique component of $\\mathbf{x}$ lying in $C(A^{\\top})$; this is the only part $A$ 'sees.'" },
            { term: "Null-space part of $\\mathbf{x}$", description: "the unique component of $\\mathbf{x}$ lying in $N(A)$; $A$ discards it entirely." },
            { term: "Invertible core", description: "the restriction $A\\big|_{C(A^{\\top})}: C(A^{\\top}) \\to C(A)$, always a bijection regardless of whether $A$ itself is square or invertible." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A preview of the SVD",
          text: "The singular value decomposition makes this bijection completely explicit and orthonormal: $A$ sends an orthonormal basis of the row space to a scaled orthonormal basis of the column space, one singular value at a time, while the null space and left null space contribute nothing. Everything here is the coordinate-free version of that picture.",
        },
      ],
    },
    {
      heading: "Where this shows up",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Regression.** $X\\boldsymbol{\\beta}$ depends only on the row-space component of $\\boldsymbol{\\beta}$; the null-space component (collinear directions) is invisible to every fitted value, however large its coefficients are.",
            "**Network flow.** Only the row-space component of an edge-flow vector affects node balances $A\\mathbf{x}$; the null-space component is a pure circulation, added freely with zero measurable effect.",
            "**Signal recovery.** Measurements $A\\mathbf{x}$ depend only on the row-space part of the true signal; the null-space part leaves no trace and is lost regardless of how sophisticated the reconstruction algorithm is.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§7.1 (foreshadowing the SVD)" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lecture 14" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-04-four-fundamental-subspaces.md" },
  ],
};
