import type { WikiArticle } from "../types";

export const orthogonalVectors: WikiArticle = {
  conceptId: "orthogonal-vectors",
  summary:
    "Two vectors are orthogonal when their dot product is zero. The definition is algebraic so that it survives into dimensions where \"perpendicular\" cannot be drawn — and orthogonality is the single most useful structural property in the subject, because it makes components independent and computations decouple.",
  sections: [
    {
      heading: "Definition and consequences",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{u} \\perp \\mathbf{v} \\iff \\mathbf{u}\\cdot\\mathbf{v} = 0",
          caption: "Orthogonality",
        },
        {
          kind: "formula",
          latex: "\\mathbf{u} \\perp \\mathbf{v} \\ \\Longrightarrow \\ \\|\\mathbf{u} + \\mathbf{v}\\|^{2} = \\|\\mathbf{u}\\|^{2} + \\|\\mathbf{v}\\|^{2}",
          caption: "The Pythagorean theorem, in $n$ dimensions",
        },
        {
          kind: "prose",
          text: "The proof is immediate: expanding $\\|\\mathbf{u}+\\mathbf{v}\\|^{2} = \\|\\mathbf{u}\\|^{2} + 2(\\mathbf{u}\\cdot\\mathbf{v}) + \\|\\mathbf{v}\\|^{2}$, the cross term vanishes precisely when the vectors are orthogonal. Pythagoras and orthogonality are the same statement.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Orthogonal implies independent",
          text: "Any set of non-zero, pairwise orthogonal vectors is linearly independent. Dotting the relation $\\sum_i c_i\\mathbf{v}_i = \\mathbf{0}$ with $\\mathbf{v}_j$ kills every term but one, leaving $c_j\\|\\mathbf{v}_j\\|^{2} = 0$, so $c_j = 0$. This is why orthogonality is worth engineering: it delivers independence for free, and independence is harder to check directly.",
        },
      ],
    },
    {
      heading: "Orthonormal sets",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{q}_i \\cdot \\mathbf{q}_j = \\begin{cases} 1 & i = j \\\\ 0 & i \\ne j \\end{cases}",
          caption: "Orthonormal — mutually orthogonal and each of unit length",
        },
        {
          kind: "prose",
          text: "Orthonormality is what makes coordinates trivial to find. In a general basis, expressing $\\mathbf{v}$ requires solving a linear system; in an orthonormal one, the $i$th coordinate is just $\\mathbf{v}\\cdot\\mathbf{q}_i$ — a single dot product, because every other basis vector contributes nothing.",
        },
        {
          kind: "formula",
          latex: "\\mathbf{v} = \\sum_{i} (\\mathbf{v}\\cdot\\mathbf{q}_i)\\,\\mathbf{q}_i",
          caption: "Expansion in an orthonormal basis — no system to solve",
        },
        {
          kind: "prose",
          text: "A square matrix $Q$ with orthonormal columns satisfies $Q^{\\top}Q = I$, so $Q^{-1} = Q^{\\top}$ — inversion becomes transposition. Such matrices preserve lengths and angles, which is why they represent rotations and reflections, and why numerical algorithms prefer them: they cannot amplify error.",
        },
      ],
    },
    {
      heading: "Orthogonal complements",
      blocks: [
        {
          kind: "formula",
          latex: "V^{\\perp} = \\{\\mathbf{x} : \\mathbf{x}\\cdot\\mathbf{v} = 0 \\text{ for all } \\mathbf{v} \\in V\\}",
          caption: "Everything orthogonal to every vector in $V$",
        },
        {
          kind: "prose",
          text: "Any vector splits uniquely into a part in $V$ and a part in $V^{\\perp}$, and $\\dim V + \\dim V^{\\perp} = n$. This decomposition is what projection computes, and it is the structure behind the four fundamental subspaces: the null space is the orthogonal complement of the row space, and the left null space of the column space.",
        },
        {
          kind: "example",
          title: "Checking orthogonality",
          problem:
            "Are $\\mathbf{u} = (1,2,-1)$ and $\\mathbf{v} = (3,-1,1)$ orthogonal? What about $\\mathbf{w} = (2,0,2)$?",
          steps: [
            "$\\mathbf{u}\\cdot\\mathbf{v} = 3 - 2 - 1 = 0$. ✓ Orthogonal.",
            "$\\mathbf{u}\\cdot\\mathbf{w} = 2 + 0 - 2 = 0$. ✓ Also orthogonal.",
            "$\\mathbf{v}\\cdot\\mathbf{w} = 6 + 0 + 2 = 8 \\ne 0$.",
          ],
          answer:
            "$\\mathbf{u}$ is orthogonal to both, but $\\mathbf{v}$ and $\\mathbf{w}$ are not orthogonal to each other — so the three do not form an orthogonal set.",
        },
      ],
    },
    {
      heading: "Why it is worth engineering",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Least squares.** The residual is orthogonal to the column space — that condition *is* the normal equations.",
            "**Gram–Schmidt and QR.** Converting an arbitrary basis into an orthonormal one turns an ill-conditioned system into a stable one.",
            "**PCA.** Principal components are orthogonal by construction, so each explains a distinct, non-overlapping portion of variance.",
            "**Fourier analysis.** Sines and cosines are orthogonal under the integral inner product, which is why each coefficient is an independent projection.",
            "**Statistics.** Uncorrelated random variables are orthogonal under $\\langle X,Y\\rangle = \\mathbb{E}[XY]$ after centring — and $\\operatorname{Var}(X+Y) = \\operatorname{Var}(X)+\\operatorname{Var}(Y)$ is Pythagoras.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The zero vector is orthogonal to everything",
          text: "Including itself. So \"orthogonal\" alone does not mean \"at right angles\" — statements about orthogonal sets almost always require the vectors to be non-zero, and the independence result above fails without that hypothesis.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§4.1, §4.4" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 6B" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-01-vectors-and-operations.md" },
  ],
};
