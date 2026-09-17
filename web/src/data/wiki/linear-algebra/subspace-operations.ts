import type { WikiArticle } from "../types";

export const subspaceOperations: WikiArticle = {
  conceptId: "subspace-operations",
  summary:
    "Subspaces combine in two natural ways: the sum $U+W$ (everything reachable by adding a piece of each) and the intersection $U\\cap W$ (what they share). Both are always subspaces, but their union almost never is. A dimension formula ties the two operations together, and the special case where $U$ and $W$ overlap only at the origin — a direct sum — is what makes decomposing a vector uniquely into pieces possible.",
  sections: [
    {
      heading: "The sum and the intersection",
      blocks: [
        {
          kind: "formula",
          latex: "U + W = \\{\\, \\mathbf{u} + \\mathbf{w} \\ :\\ \\mathbf{u}\\in U,\\ \\mathbf{w}\\in W \\,\\}, \\qquad U \\cap W = \\{\\, \\mathbf{v} \\ :\\ \\mathbf{v}\\in U \\text{ and } \\mathbf{v}\\in W \\,\\}",
          caption: "Two ways to combine subspaces of the same ambient space",
        },
        {
          kind: "prose",
          text: "Both constructions are themselves subspaces. For the intersection, if $\\mathbf{x},\\mathbf{y} \\in U\\cap W$, then both lie in $U$, so $\\mathbf{x}+\\mathbf{y}\\in U$ by $U$'s closure, and both lie in $W$, so $\\mathbf{x}+\\mathbf{y}\\in W$ — hence the sum is back in $U\\cap W$. The same argument handles scalar multiples, and $\\mathbf{0}$ lies in both since each is a subspace. The sum $U+W$ is a subspace for a similar reason: it contains $\\mathbf{0}=\\mathbf{0}+\\mathbf{0}$, and adding or scaling elements of the form $\\mathbf{u}+\\mathbf{w}$ keeps that form, using closure of $U$ and $W$ individually.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "$U+W$ is the smallest subspace containing both",
          text: "Any subspace containing $U$ and $W$ must, by closure under addition, contain every sum $\\mathbf{u}+\\mathbf{w}$ — that is exactly $U+W$. So $U+W$ sits inside every subspace that contains both $U$ and $W$, which is precisely the sense in which it is the *smallest* combination — the same role span plays for a set of vectors, one level up.",
        },
      ],
    },
    {
      heading: "Why the union is usually not a subspace",
      blocks: [
        {
          kind: "example",
          title: "Two axes in $\\mathbb{R}^2$",
          problem:
            "Let $U$ be the $x$-axis and $W$ be the $y$-axis in $\\mathbb{R}^2$. Is $U \\cup W$ a subspace?",
          steps: [
            "$(1,0) \\in U \\subseteq U\\cup W$ and $(0,1) \\in W \\subseteq U\\cup W$.",
            "Their sum is $(1,0)+(0,1) = (1,1)$.",
            "$(1,1)$ lies on neither axis, so it is not in $U \\cup W$.",
          ],
          answer:
            "$U \\cup W$ fails closure under addition, so it is not a subspace — even though $U$ and $W$ individually are. The correct way to combine them is the *sum* $U+W$, which in this case is all of $\\mathbb{R}^2$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Union combines elements; sum combines subspaces",
          text: "A union only ever contains vectors that were already in $U$ or already in $W$ — it adds nothing new, which is exactly why it typically breaks closure. The sum $U+W$ is what you get by *closing* the union under addition: it is the union together with every combination the union's closure demands. $U \\subseteq U+W$ and $W \\subseteq U+W$ always, and $U+W = U \\cup W$ only in the degenerate case where one subspace already contains the other.",
        },
      ],
    },
    {
      heading: "The dimension formula",
      blocks: [
        {
          kind: "formula",
          latex: "\\dim(U+W) = \\dim(U) + \\dim(W) - \\dim(U \\cap W)",
          caption: "Adding dimensions double-counts the overlap, so it must be subtracted back out",
        },
        {
          kind: "prose",
          text: "The proof extends a basis: start with a basis of $U\\cap W$ (say $k$ vectors), extend it to a basis of $U$ by adding $\\dim(U)-k$ more vectors, and separately extend it to a basis of $W$ by adding $\\dim(W)-k$ more. The union of all three groups spans $U+W$ and turns out to be independent, for a total of $k + (\\dim(U)-k) + (\\dim(W)-k) = \\dim(U)+\\dim(W)-k$ vectors — exactly the formula, with $k=\\dim(U\\cap W)$ the piece that would otherwise be counted twice.",
        },
        {
          kind: "example",
          title: "Two planes through the origin in $\\mathbb{R}^3$",
          problem:
            "$U$ is the $xy$-plane and $W$ is the $xz$-plane, both subspaces of $\\mathbb{R}^3$. Find $\\dim(U+W)$ and $\\dim(U\\cap W)$.",
          steps: [
            "$U \\cap W$ consists of points with $z=0$ (in $U$) and $y=0$ (in $W$): the $x$-axis, so $\\dim(U\\cap W)=1$.",
            "$\\dim(U) = 2$ and $\\dim(W) = 2$.",
            "By the formula, $\\dim(U+W) = 2 + 2 - 1 = 3$.",
          ],
          answer:
            "$U+W = \\mathbb{R}^3$ — two distinct planes through the origin always span the whole space, and the formula confirms it without having to check spanning directly.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Two subspaces of a small ambient space can't avoid overlapping",
          text: "The formula also bounds intersections from below: since $\\dim(U+W)$ can never exceed the ambient dimension $n$, rearranging gives $\\dim(U\\cap W) \\ge \\dim(U)+\\dim(W)-n$. Two 3-dimensional subspaces of $\\mathbb{R}^5$, for instance, must share at least a 1-dimensional intersection — there is no way to choose them to meet only at the origin.",
        },
      ],
    },
    {
      heading: "Direct sums: when the overlap vanishes",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Direct sum $U \\oplus W$", description: "the sum $U+W$ in the special case where $U \\cap W = \\{\\mathbf{0}\\}$" },
            { term: "Unique decomposition", description: "in a direct sum, every $\\mathbf{v} \\in U+W$ can be written as $\\mathbf{u}+\\mathbf{w}$ ($\\mathbf{u}\\in U$, $\\mathbf{w}\\in W$) in exactly one way" },
          ],
        },
        {
          kind: "prose",
          text: "Trivial intersection is exactly what makes the decomposition unique. If $\\mathbf{v} = \\mathbf{u}_1+\\mathbf{w}_1 = \\mathbf{u}_2+\\mathbf{w}_2$, rearranging gives $\\mathbf{u}_1-\\mathbf{u}_2 = \\mathbf{w}_2-\\mathbf{w}_1$; the left side is in $U$, the right side is in $W$, so both sides lie in $U\\cap W=\\{\\mathbf{0}\\}$, forcing $\\mathbf{u}_1=\\mathbf{u}_2$ and $\\mathbf{w}_1=\\mathbf{w}_2$. When the intersection is not trivial, this argument breaks down and a vector can be split into signal-and-noise, or row-space-and-null-space-style pieces, in more than one way.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Trivial intersection alone doesn't guarantee $U+W$ is everything",
          text: "Two distinct lines through the origin in $\\mathbb{R}^3$ intersect only at $\\mathbf{0}$, so their sum is a direct sum — but that sum is still just a plane, not all of $\\mathbb{R}^3$. $U\\cap W=\\{\\mathbf{0}\\}$ guarantees uniqueness of decomposition; it says nothing about whether $U$ and $W$ together have enough dimension to reach every vector in the ambient space.",
        },
      ],
    },
    {
      heading: "Application: the four fundamental subspaces",
      blocks: [
        {
          kind: "prose",
          text: "For an $m\\times n$ matrix $A$ of rank $r$, the row space and null space are complementary subspaces of $\\mathbb{R}^n$, and the column space and left null space are complementary subspaces of $\\mathbb{R}^m$. Both pairs are not just direct sums but *orthogonal* direct sums — a much stronger relationship than merely intersecting trivially.",
        },
        {
          kind: "formula",
          latex: "\\underbrace{C(A^{\\mathsf T})}_{\\text{row space}} \\ \\oplus_{\\perp}\\ \\underbrace{N(A)}_{\\text{null space}} = \\mathbb{R}^n, \\qquad \\dim(\\text{row space}) + \\dim(\\text{null space}) = r + (n-r) = n",
          caption: "Rank–nullity is the dimension formula for this pair, with zero overlap already built in",
        },
        {
          kind: "prose",
          text: "Because the row space and null space are orthogonal complements, they intersect only at $\\mathbf{0}$ (an orthogonal vector to itself must be zero), so the general dimension formula $\\dim(U+W)=\\dim(U)+\\dim(W)-\\dim(U\\cap W)$ collapses to plain addition — which is exactly the rank–nullity theorem. Every vector $\\mathbf{x}\\in\\mathbb{R}^n$ splits uniquely into a row-space component and a null-space component, and this decomposition is the engine behind least-squares projection: the part of a vector already reachable by $A^{\\mathsf T}$'s rows is kept, and the part in the null space is exactly what gets discarded with no effect on $A\\mathbf{x}$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Orthogonal complements are direct sums with a bonus",
          text: "Trivial intersection alone (a direct sum) guarantees unique decomposition but not that the pieces are perpendicular, nor that they cover the whole space. Orthogonal complements guarantee all three at once: trivial intersection, full spanning of the ambient space, and perpendicularity between every vector in one and every vector in the other. That combination is what makes the four fundamental subspaces such a clean picture of a matrix's action.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§3.1, §4.1" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 1C" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-03-vector-spaces-and-bases.md" },
  ],
};
