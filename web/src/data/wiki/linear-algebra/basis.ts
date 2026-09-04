import type { WikiArticle } from "../types";

export const basis: WikiArticle = {
  conceptId: "basis",
  summary:
    "A basis is a set of vectors that is independent and spans the space — enough to reach everything, with nothing redundant. Its purpose is to make coordinates well defined: relative to a basis, every vector has exactly one list of coefficients, and that uniqueness is what turns geometry into arithmetic.",
  sections: [
    {
      heading: "Definition and uniqueness",
      blocks: [
        {
          kind: "formula",
          latex: "\\{\\mathbf{v}_1,\\ldots,\\mathbf{v}_n\\} \\text{ is a basis} \\iff \\text{independent and spanning}",
          caption: "Two conditions, pulling in opposite directions",
        },
        {
          kind: "prose",
          text: "Spanning demands enough vectors; independence forbids too many. A basis is the exact balance point, and that is why every basis of a given space has the same number of elements — that number is the *dimension*.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Independence is precisely what makes coordinates unique",
          text: "If $\\mathbf{v} = \\sum c_i\\mathbf{v}_i$ and also $\\mathbf{v} = \\sum d_i\\mathbf{v}_i$, subtracting gives $\\sum(c_i - d_i)\\mathbf{v}_i = \\mathbf{0}$. Independence forces every $c_i - d_i = 0$, so the two representations coincide. Without independence a vector would have many coordinate lists and \"the coordinates of $\\mathbf{v}$\" would be meaningless.",
        },
      ],
    },
    {
      heading: "Bases are not unique",
      blocks: [
        {
          kind: "prose",
          text: "A space has infinitely many bases, all of the same size. $\\{(1,0),(0,1)\\}$ and $\\{(1,1),(1,-1)\\}$ both work for $\\mathbb{R}^{2}$, and choosing between them is choosing a coordinate system — the vectors themselves are unchanged.",
        },
        {
          kind: "table",
          headers: ["Space", "A standard basis", "Dimension"],
          rows: [
            ["$\\mathbb{R}^{n}$", "$\\mathbf{e}_1,\\ldots,\\mathbf{e}_n$", "$n$"],
            ["$\\mathbb{P}_2$ (degree $\\le 2$)", "$1,\\ x,\\ x^{2}$", "3"],
            ["$\\mathbb{R}^{2\\times2}$", "the four single-1 matrices", "4"],
            ["Symmetric $2\\times2$", "three matrices", "3"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Choosing the basis is the whole game",
          text: "Most of applied linear algebra is finding a basis in which a problem becomes easy. Diagonalisation finds a basis of eigenvectors, in which a matrix acts by independent scaling. PCA finds an orthonormal basis ordered by variance. The Fourier basis turns convolution into multiplication. In each case the underlying object is untouched — only the description changes, and the right description makes the computation trivial.",
        },
      ],
    },
    {
      heading: "Orthonormal bases",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{v} = \\sum_{i} (\\mathbf{v}\\cdot\\mathbf{q}_i)\\,\\mathbf{q}_i",
          caption: "Coordinates by dot product — no system to solve",
        },
        {
          kind: "prose",
          text: "In a general basis, finding coordinates means solving $A\\mathbf{c} = \\mathbf{v}$. In an orthonormal basis each coefficient is a single dot product, because every other basis vector contributes nothing. This is why Gram–Schmidt and QR exist: converting to an orthonormal basis converts an expensive, potentially ill-conditioned solve into $n$ independent projections.",
        },
        {
          kind: "example",
          title: "Coordinates in a non-standard basis",
          problem:
            "Express $\\mathbf{v} = (3,1)$ in the basis $\\mathbf{b}_1 = (1,1)$, $\\mathbf{b}_2 = (1,-1)$.",
          steps: [
            "Solve $c_1(1,1) + c_2(1,-1) = (3,1)$.",
            "$c_1 + c_2 = 3$ and $c_1 - c_2 = 1$.",
            "Adding: $2c_1 = 4$, so $c_1 = 2$ and $c_2 = 1$.",
            "This basis happens to be orthogonal, so the shortcut also works: $c_1 = \\dfrac{\\mathbf{v}\\cdot\\mathbf{b}_1}{\\|\\mathbf{b}_1\\|^{2}} = \\dfrac{4}{2} = 2$. ✓",
          ],
          answer:
            "$\\mathbf{v}$ has coordinates $(2,1)$ in this basis, and $(3,1)$ in the standard one — the same vector, two descriptions.",
        },
      ],
    },
    {
      heading: "Existence and extension",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Every finite-dimensional space has a basis.** Start with a spanning set and discard redundant vectors until independence is reached.",
            "**Every independent set extends to a basis.** Keep adding vectors outside the current span until it fills the space.",
            "**Every basis has the same size.** This is what makes dimension well defined, and it is the substantive theorem here — the others are constructions.",
            "**$n$ vectors in an $n$-dimensional space** form a basis as soon as they are independent *or* spanning; at the critical size, either implies the other.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Numerically, near-dependence behaves like dependence",
          text: "A basis whose vectors are nearly parallel is technically valid and practically useless: coordinates become enormous and unstable, and small perturbations in $\\mathbf{v}$ produce large swings in its coefficients. This is the condition number of the basis matrix, and it is why orthonormal bases are preferred wherever there is a choice.",
        },
      ],
    },
  ],
  references: [
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 2B–2C" },
    { source: "Strang, Introduction to Linear Algebra", locator: "§3.4–3.5" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-03-vector-spaces-and-bases.md" },
  ],
};
