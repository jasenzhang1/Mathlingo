import type { WikiArticle } from "../types";

export const vectorSpaces: WikiArticle = {
  conceptId: "vector-spaces",
  summary:
    "A vector space is any set that supports addition and scalar multiplication obeying eight axioms. The abstraction pays off immediately: polynomials, functions, matrices, and random variables all qualify, so every theorem proved about $\\mathbb{R}^{n}$ applies to them unchanged.",
  sections: [
    {
      heading: "The axioms",
      blocks: [
        {
          kind: "prose",
          text: "A set $V$ with an addition and a scalar multiplication is a vector space over $\\mathbb{R}$ when, for all $\\mathbf{u},\\mathbf{v},\\mathbf{w} \\in V$ and scalars $c,d$:",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "**Closure.** $\\mathbf{u}+\\mathbf{v} \\in V$ and $c\\mathbf{u} \\in V$.",
            "**Commutativity and associativity** of addition.",
            "**Zero.** There is $\\mathbf{0} \\in V$ with $\\mathbf{v}+\\mathbf{0} = \\mathbf{v}$.",
            "**Negatives.** Each $\\mathbf{v}$ has $-\\mathbf{v}$ with $\\mathbf{v}+(-\\mathbf{v}) = \\mathbf{0}$.",
            "**Distributivity.** $c(\\mathbf{u}+\\mathbf{v}) = c\\mathbf{u}+c\\mathbf{v}$ and $(c+d)\\mathbf{v} = c\\mathbf{v}+d\\mathbf{v}$.",
            "**Compatibility.** $c(d\\mathbf{v}) = (cd)\\mathbf{v}$ and $1\\mathbf{v} = \\mathbf{v}$.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "In practice only closure needs checking",
          text: "For any subset of a known vector space, the arithmetic axioms are inherited automatically — associativity of addition does not stop holding for a smaller set. So verifying a subspace means checking three things: it contains $\\mathbf{0}$, it is closed under addition, and it is closed under scaling. Everything else comes free.",
        },
      ],
    },
    {
      heading: "Spaces that are not $\\mathbb{R}^{n}$",
      blocks: [
        {
          kind: "table",
          headers: ["Space", "Vectors are", "Dimension"],
          rows: [
            ["$\\mathbb{R}^{n}$", "$n$-tuples", "$n$"],
            ["$\\mathbb{P}_n$", "polynomials of degree $\\le n$", "$n+1$"],
            ["$\\mathbb{R}^{m\\times n}$", "matrices", "$mn$"],
            ["$C[a,b]$", "continuous functions on $[a,b]$", "infinite"],
            ["Solutions of $A\\mathbf{x} = \\mathbf{0}$", "vectors in the null space", "$n - \\operatorname{rank}(A)$"],
            ["$L^{2}$ random variables", "variables with finite variance", "infinite"],
          ],
        },
        {
          kind: "prose",
          text: "The last row is why probability and linear algebra keep converging. With $\\langle X,Y\\rangle = \\mathbb{E}[XY]$, centred random variables form an inner product space in which uncorrelated means orthogonal, standard deviation is a norm, and $\\operatorname{Var}(X+Y) = \\operatorname{Var}(X)+\\operatorname{Var}(Y)$ for uncorrelated variables is Pythagoras. Conditional expectation is orthogonal projection, and least squares regression is projection onto a subspace — the same theorem in two subjects.",
        },
      ],
    },
    {
      heading: "Subspaces",
      blocks: [
        {
          kind: "formula",
          latex: "W \\subseteq V \\text{ is a subspace} \\iff \\mathbf{0} \\in W,\\ \\text{ and } W \\text{ is closed under } + \\text{ and scaling}",
          caption: "The three-part test",
        },
        {
          kind: "example",
          title: "Two candidate subsets of $\\mathbb{R}^{2}$",
          problem:
            "Is the line $y = 2x$ a subspace? Is the line $y = 2x + 1$?",
          steps: [
            "$y = 2x$: contains $(0,0)$. ✓",
            "Adding $(1,2)$ and $(3,6)$ gives $(4,8)$, still on the line. Scaling likewise. ✓ Subspace.",
            "$y = 2x+1$: does it contain $(0,0)$? $0 \\ne 1$. ✗",
            "Also fails closure: $(0,1)$ and $(1,3)$ sum to $(1,4)$, which is not on the line.",
          ],
          answer:
            "The first is a subspace, the second is not — it is an affine set. Every subspace must pass through the origin, because scaling by 0 has to stay inside.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Unions of subspaces usually are not subspaces",
          text: "Take the $x$-axis and the $y$-axis in $\\mathbb{R}^{2}$. Each is a subspace, but their union is not: $(1,0)$ and $(0,1)$ both lie in it while $(1,1)$ does not. Intersections *are* always subspaces, and the correct way to combine two is the sum $W_1 + W_2 = \\{\\mathbf{w}_1+\\mathbf{w}_2\\}$, which is the smallest subspace containing both.",
        },
      ],
    },
    {
      heading: "Why abstract at all",
      blocks: [
        {
          kind: "prose",
          text: "Because the theorems transfer. Prove that every finite-dimensional space has a basis, and you have proved it for polynomials and matrices. Prove Gram–Schmidt once, and you get orthogonal polynomials — Legendre, Hermite, Chebyshev — as instances. Prove the projection theorem, and you simultaneously get least squares, Fourier coefficients, and conditional expectation.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Coordinates make any finite-dimensional space $\\mathbb{R}^{n}$",
          text: "Choosing a basis for an $n$-dimensional space gives a one-to-one correspondence with $\\mathbb{R}^{n}$ preserving all the structure. So there is really only *one* $n$-dimensional real vector space, viewed through different labels. The abstraction is not adding new objects; it is recognising familiar ones as the same object.",
        },
      ],
    },
  ],
  references: [
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 1B–1C" },
    { source: "Strang, Introduction to Linear Algebra", locator: "§3.1" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-03-vector-spaces-and-bases.md" },
  ],
};
