import type { WikiArticle } from "../types";

export const vectors: WikiArticle = {
  conceptId: "vectors",
  summary:
    "A vector is an ordered list of numbers, and simultaneously an arrow with direction and magnitude, and simultaneously a point in space. These are three readings of one object, and fluency means switching between them without noticing — the list makes computation possible, the arrow makes geometry visible, and the point makes data natural.",
  sections: [
    {
      heading: "Three readings",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\\\ \\vdots \\\\ v_n \\end{bmatrix} \\in \\mathbb{R}^{n}",
          caption: "A vector in $\\mathbb{R}^{n}$ — $n$ is the dimension, the number of components",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "As a list",
              description:
                "$n$ real numbers in a fixed order. Order matters: $(1,2) \\ne (2,1)$. This is what a computer stores.",
            },
            {
              term: "As an arrow",
              description:
                "A displacement with direction and length, free to be drawn from anywhere. This is what makes addition and projection geometrically meaningful.",
            },
            {
              term: "As a point",
              description:
                "The location reached from the origin. This is the reading used when a vector holds a data record — one person's height, weight, and age.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why dimension is not spatial",
          text: "A vector in $\\mathbb{R}^{784}$ is a $28 \\times 28$ image flattened; one in $\\mathbb{R}^{50000}$ is a document's word counts. There is nothing to visualise and nothing needs visualising — the algebra is identical to $\\mathbb{R}^{2}$, and every result proved in two dimensions holds unchanged. Dimension counts *degrees of freedom*, not directions in physical space.",
        },
      ],
    },
    {
      heading: "The two operations",
      blocks: [
        {
          kind: "formula",
          latex: "(\\mathbf{u} + \\mathbf{v})_i = u_i + v_i, \\qquad (c\\mathbf{u})_i = c\\,u_i",
          caption: "Addition and scalar multiplication, both component-wise",
        },
        {
          kind: "prose",
          text: "Component-wise addition is not an arbitrary choice — it is exactly the tip-to-tail construction. Place the tail of $\\mathbf{v}$ at the tip of $\\mathbf{u}$; the arrow from the start to the finish has components $u_i + v_i$. The definition is chosen to make the algebra agree with the picture.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Averaging magnitudes is not averaging vectors",
          text: "Two winds of equal speed in opposite directions average to zero, not to that speed. Averaging the *lengths* gives a moderate wind that does not exist; averaging component-wise correctly captures the cancellation. Any quantity with direction — velocity, force, displacement — must be combined as a vector, and this is the most common modelling error involving them.",
        },
        {
          kind: "prose",
          text: "$\\mathbb{R}^{n}$ is *closed* under both operations: adding two $n$-tuples or scaling one produces another $n$-tuple, never leaving the space. Closure is the property that `vector-spaces` will later promote to an axiom.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Combining vectors",
          problem:
            "$\\mathbf{u} = (2, -1, 3)$ and $\\mathbf{v} = (0, 4, -2)$. Compute $2\\mathbf{u} - 3\\mathbf{v}$.",
          steps: [
            "$2\\mathbf{u} = (4, -2, 6)$ — scale each component.",
            "$3\\mathbf{v} = (0, 12, -6)$.",
            "Subtract component-wise: $(4 - 0,\\ -2 - 12,\\ 6 - (-6))$.",
          ],
          answer: "$(4, -14, 12)$.",
        },
        {
          kind: "prose",
          text: "This pattern — scale, then add — is a *linear combination*, and it is the single most important operation in the subject. Spans, bases, matrix–vector products, and least squares are all statements about which vectors can be written as linear combinations of which others.",
        },
      ],
    },
    {
      heading: "Notation",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Column by default.** Vectors are columns unless stated otherwise, so $\\mathbf{v} \\in \\mathbb{R}^{n}$ is $n \\times 1$ and $\\mathbf{v}^{\\top}$ is a row. This convention makes $A\\mathbf{v}$ the natural product and is assumed throughout.",
            "**The zero vector $\\mathbf{0}$** has every component zero. It is the only vector with no direction, and the additive identity.",
            "**Standard basis vectors $\\mathbf{e}_i$** have a 1 in position $i$ and zeros elsewhere. Every vector is $\\sum_i v_i \\mathbf{e}_i$ — which is what \"components\" means.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§1.1" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 1A" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lecture 1" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-01-vectors-and-operations.md" },
  ],
};
