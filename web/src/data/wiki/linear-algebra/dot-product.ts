import type { WikiArticle } from "../types";

export const dotProduct: WikiArticle = {
  conceptId: "dot-product",
  summary:
    "The dot product multiplies two vectors into a single number. It has an algebraic definition — sum of component products — and a geometric one involving lengths and the angle between them, and the fact that these coincide is what lets algebra answer geometric questions in dimensions no one can picture.",
  sections: [
    {
      heading: "Two definitions, one quantity",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^{n} u_i v_i = \\mathbf{u}^{\\top}\\mathbf{v}",
          caption: "The algebraic definition",
        },
        {
          kind: "formula",
          latex: "\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|\\cos\\theta",
          caption: "The geometric definition, with $\\theta$ the angle between them",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The equivalence is the useful part",
          text: "The first formula is computable in any dimension; the second is meaningful only if \"angle\" makes sense. Because they agree, the algebraic version *defines* angle in $\\mathbb{R}^{784}$ — and questions like \"are these two documents similar in direction?\" become arithmetic. Nearly every application of the dot product is this trade: compute algebraically, interpret geometrically.",
        },
      ],
    },
    {
      heading: "What the sign tells you",
      blocks: [
        {
          kind: "table",
          headers: ["$\\mathbf{u}\\cdot\\mathbf{v}$", "Angle", "Reading"],
          rows: [
            ["$> 0$", "$\\theta < 90°$", "pointing broadly the same way"],
            ["$= 0$", "$\\theta = 90°$", "**orthogonal** — no shared direction"],
            ["$< 0$", "$\\theta > 90°$", "pointing broadly opposite"],
            ["$= \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$", "$\\theta = 0$", "parallel, same direction"],
          ],
        },
        {
          kind: "prose",
          text: "Orthogonality is the case that does the most work. It is defined *as* a zero dot product, which extends the idea of perpendicularity to spaces where drawing a right angle is impossible — and it is the condition behind least squares, Fourier decomposition, and principal components.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The zero vector is orthogonal to everything",
          text: "$\\mathbf{0} \\cdot \\mathbf{v} = 0$ for every $\\mathbf{v}$, including itself. This is a convention that keeps theorems clean, but it means \"orthogonal\" does not imply \"geometrically perpendicular\" without also assuming both vectors are non-zero. Proofs about orthogonal sets almost always exclude $\\mathbf{0}$ for this reason.",
        },
      ],
    },
    {
      heading: "Properties",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Statement"],
          rows: [
            ["Commutative", "$\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{v}\\cdot\\mathbf{u}$"],
            ["Distributive", "$\\mathbf{u}\\cdot(\\mathbf{v}+\\mathbf{w}) = \\mathbf{u}\\cdot\\mathbf{v} + \\mathbf{u}\\cdot\\mathbf{w}$"],
            ["Scalars pull out", "$(c\\mathbf{u})\\cdot\\mathbf{v} = c(\\mathbf{u}\\cdot\\mathbf{v})$"],
            ["Positive definite", "$\\mathbf{v}\\cdot\\mathbf{v} = \\|\\mathbf{v}\\|^{2} \\ge 0$, zero only for $\\mathbf{v} = \\mathbf{0}$"],
          ],
        },
        {
          kind: "prose",
          text: "The last row is why the dot product defines length: $\\|\\mathbf{v}\\| = \\sqrt{\\mathbf{v}\\cdot\\mathbf{v}}$. Norm, angle, and orthogonality all derive from this one operation, which is why generalising it — to an *inner product* — carries all of that geometry into function spaces and beyond.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "There is no associativity to appeal to",
          text: "$(\\mathbf{u}\\cdot\\mathbf{v})\\mathbf{w}$ and $\\mathbf{u}(\\mathbf{v}\\cdot\\mathbf{w})$ are both defined but are different vectors — the first points along $\\mathbf{w}$, the second along $\\mathbf{u}$. The dot product takes two vectors to a scalar, so it cannot be chained, and no cancellation law holds either: $\\mathbf{u}\\cdot\\mathbf{v} = \\mathbf{u}\\cdot\\mathbf{w}$ does not give $\\mathbf{v} = \\mathbf{w}$.",
        },
      ],
    },
    {
      heading: "Where it appears",
      blocks: [
        {
          kind: "example",
          title: "Computing an angle",
          problem: "Find the angle between $\\mathbf{u} = (1, 2, 2)$ and $\\mathbf{v} = (3, 0, 4)$.",
          steps: [
            "$\\mathbf{u}\\cdot\\mathbf{v} = 3 + 0 + 8 = 11$.",
            "$\\|\\mathbf{u}\\| = \\sqrt{1+4+4} = 3$, $\\|\\mathbf{v}\\| = \\sqrt{9+0+16} = 5$.",
            "$\\cos\\theta = 11/15 \\approx 0.7333$.",
            "$\\theta = \\arccos(0.7333) \\approx 42.8°$.",
          ],
          answer: "About $42.8°$.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Cosine similarity** in search and recommendation is $\\cos\\theta$ directly — comparing direction while ignoring magnitude, so a long document is not favoured over a short one.",
            "**A neuron's pre-activation** is $\\mathbf{w}\\cdot\\mathbf{x} + b$: the dot product measures how much the input aligns with the learned weight direction.",
            "**Work in physics** is force dotted with displacement — only the component of force along the motion contributes.",
            "**Every matrix product** is a grid of dot products between rows and columns.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§1.2" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 6A" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-01-vectors-and-operations.md" },
  ],
};
