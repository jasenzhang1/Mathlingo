import type { WikiArticle } from "../types";

export const span: WikiArticle = {
  conceptId: "span",
  summary:
    "The span of a set of vectors is everything reachable by linear combination of them. It is always a subspace, it is the smallest subspace containing the vectors, and asking whether $A\\mathbf{x} = \\mathbf{b}$ is solvable is exactly asking whether $\\mathbf{b}$ lies in the span of $A$'s columns.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{span}\\{\\mathbf{v}_1,\\ldots,\\mathbf{v}_k\\} = \\left\\{ c_1\\mathbf{v}_1 + \\cdots + c_k\\mathbf{v}_k \\ :\\ c_i \\in \\mathbb{R} \\right\\}",
          caption: "Every linear combination, with no restriction on the coefficients",
        },
        {
          kind: "prose",
          text: "A span is automatically a subspace: it contains $\\mathbf{0}$ (take all $c_i = 0$), and sums and scalar multiples of linear combinations are again linear combinations. It is also the *smallest* subspace containing the vectors — any subspace holding them must, by closure, hold all their combinations.",
        },
        {
          kind: "table",
          headers: ["Vectors in $\\mathbb{R}^{3}$", "Span", "Dimension"],
          rows: [
            ["none, or only $\\mathbf{0}$", "the origin", "0"],
            ["one non-zero vector", "a line through the origin", "1"],
            ["two independent vectors", "a plane through the origin", "2"],
            ["two vectors, one a multiple of the other", "still a line", "1"],
            ["three independent vectors", "all of $\\mathbb{R}^{3}$", "3"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Adding vectors need not enlarge the span",
          text: "A vector already in the span contributes nothing — $\\operatorname{span}\\{(1,0),(2,0)\\}$ is the same line as $\\operatorname{span}\\{(1,0)\\}$. The span grows only when the new vector is independent of the existing ones, which is exactly the relationship between spanning and independence: a basis is a set that spans with nothing to spare.",
        },
      ],
    },
    {
      heading: "Why it answers solvability",
      blocks: [
        {
          kind: "formula",
          latex: "A\\mathbf{x} = \\mathbf{b} \\text{ has a solution} \\iff \\mathbf{b} \\in \\operatorname{span}\\{\\text{columns of } A\\} = C(A)",
          caption: "The column space is a span, and solvability is membership in it",
        },
        {
          kind: "prose",
          text: "This follows from reading $A\\mathbf{x}$ as a linear combination of columns weighted by $\\mathbf{x}$. Solving the system means finding weights producing $\\mathbf{b}$; if no weights work, $\\mathbf{b}$ lies outside the span and the system is inconsistent. Least squares is the response: when $\\mathbf{b} \\notin C(A)$, project it onto $C(A)$ and solve for the closest reachable point instead.",
        },
        {
          kind: "example",
          title: "Testing membership",
          problem:
            "Is $\\mathbf{b} = (3,5,7)$ in the span of $(1,1,1)$ and $(1,2,3)$?",
          steps: [
            "Seek $c_1, c_2$ with $c_1(1,1,1) + c_2(1,2,3) = (3,5,7)$.",
            "First coordinate: $c_1 + c_2 = 3$. Second: $c_1 + 2c_2 = 5$.",
            "Subtracting: $c_2 = 2$, hence $c_1 = 1$.",
            "Check the third coordinate: $1 + 3(2) = 7$. ✓",
          ],
          answer:
            "Yes, $\\mathbf{b} = 1\\cdot(1,1,1) + 2\\cdot(1,2,3)$. Had the third coordinate disagreed, $\\mathbf{b}$ would lie off the plane spanned by the two.",
        },
      ],
    },
    {
      heading: "Spanning sets and bases",
      blocks: [
        {
          kind: "prose",
          text: "A set *spans* $V$ if its span is all of $V$. Spanning sets can be wastefully large — $\\mathbb{R}^{2}$ is spanned by a hundred vectors — and a basis is a spanning set that is also independent, hence minimal. Every spanning set contains a basis, obtained by discarding redundant vectors.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A counting bound worth knowing",
          text: "Any spanning set of an $n$-dimensional space has at least $n$ vectors; any independent set has at most $n$. A set of exactly $n$ vectors is a basis if it satisfies *either* condition — spanning and independence come together at that size. This halves the work when checking whether $n$ candidate vectors form a basis for $\\mathbb{R}^{n}$.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§3.1, §3.4" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 2A" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-03-vector-spaces-and-bases.md" },
  ],
};
