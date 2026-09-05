import type { WikiArticle } from "../types";

export const vectorOperations: WikiArticle = {
  conceptId: "vector-operations",
  summary:
    "Addition and scalar multiplication are the only two operations a vector space provides. Everything else — spans, bases, matrix products, least squares — is built from repeated application of these two, combined into linear combinations.",
  sections: [
    {
      heading: "The operations",
      blocks: [
        {
          kind: "formula",
          latex: "(\\mathbf{u} + \\mathbf{v})_i = u_i + v_i, \\qquad (c\\mathbf{u})_i = c\\,u_i",
          caption: "Both act component-wise",
        },
        {
          kind: "prose",
          text: "Scalar multiplication by $c > 1$ stretches, $0 < c < 1$ shrinks, and $c < 0$ additionally reverses direction. The direction flip is the part most often dropped when the rule is stated as \"changes the magnitude\".",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Closure is the point",
          text: "Adding two $n$-tuples or scaling one produces another $n$-tuple — the result never leaves $\\mathbb{R}^{n}$. That is closure, and it is what `vector-spaces` will later take as an axiom. It is also why a subset of $\\mathbb{R}^{n}$ is only a subspace if it is closed under both: a plane through the origin qualifies, a plane not through the origin does not, because scaling by zero must land inside.",
        },
      ],
    },
    {
      heading: "Linear combinations",
      blocks: [
        {
          kind: "formula",
          latex: "c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + \\cdots + c_k\\mathbf{v}_k",
          caption: "Scale, then add — the fundamental operation of the subject",
        },
        {
          kind: "prose",
          text: "Almost every question in linear algebra is a question about linear combinations. *Span*: which vectors are reachable? *Independence*: is any combination redundant? *Matrix–vector product*: $A\\mathbf{x}$ is a linear combination of $A$'s columns weighted by $\\mathbf{x}$. *Solving $A\\mathbf{x} = \\mathbf{b}$*: can $\\mathbf{b}$ be written as such a combination?",
        },
        {
          kind: "example",
          title: "Combining",
          problem: "$\\mathbf{u} = (2,-1,3)$, $\\mathbf{v} = (0,4,-2)$. Compute $2\\mathbf{u} - 3\\mathbf{v}$.",
          steps: [
            "$2\\mathbf{u} = (4,-2,6)$.",
            "$3\\mathbf{v} = (0,12,-6)$.",
            "Subtract: $(4-0,\\ -2-12,\\ 6+6)$.",
          ],
          answer: "$(4,-14,12)$.",
        },
      ],
    },
    {
      heading: "The algebraic rules",
      blocks: [
        {
          kind: "table",
          headers: ["Rule", "Statement"],
          rows: [
            ["Commutative", "$\\mathbf{u}+\\mathbf{v} = \\mathbf{v}+\\mathbf{u}$"],
            ["Associative", "$(\\mathbf{u}+\\mathbf{v})+\\mathbf{w} = \\mathbf{u}+(\\mathbf{v}+\\mathbf{w})$"],
            ["Identity", "$\\mathbf{v} + \\mathbf{0} = \\mathbf{v}$"],
            ["Inverse", "$\\mathbf{v} + (-\\mathbf{v}) = \\mathbf{0}$"],
            ["Distributive over vectors", "$c(\\mathbf{u}+\\mathbf{v}) = c\\mathbf{u} + c\\mathbf{v}$"],
            ["Distributive over scalars", "$(c+d)\\mathbf{v} = c\\mathbf{v} + d\\mathbf{v}$"],
          ],
          caption:
            "These eight rules (with $1\\mathbf{v} = \\mathbf{v}$ and $c(d\\mathbf{v}) = (cd)\\mathbf{v}$) are exactly the vector space axioms — $\\mathbb{R}^{n}$ is the model they were abstracted from.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Component-wise multiplication is not a vector operation",
          text: "$(u_1v_1,\\ u_2v_2, \\ldots)$ — the Hadamard product — is a perfectly useful array operation and appears constantly in neural network code, but it is not part of the vector space structure and has no geometric meaning. Vectors have addition and scaling; multiplying two vectors *together* requires extra structure, and the dot product is one such choice.",
        },
      ],
    },
    {
      heading: "Why it generalises",
      blocks: [
        {
          kind: "prose",
          text: "Anything supporting these two operations with these rules is a vector space, and every theorem proved from them applies. Polynomials, continuous functions, matrices, and random variables with finite variance all qualify — which is why Fourier series, least squares, and principal components turn out to be the same construction in different spaces.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The programming payoff",
          text: "Writing an update as one vector equation — $\\text{position} \\mathrel{+}= \\text{velocity} \\times dt$ — rather than three scalar ones is not just terser. It is dimension-independent, so the same line works in 2D or 3D or 100D, and it makes the operation's meaning explicit: a scalar multiplication followed by a vector addition.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§1.1" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 1B" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-01-vectors-and-operations.md" },
  ],
};
