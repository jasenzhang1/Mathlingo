import type { WikiArticle } from "../types";

export const disjointnessFourFundamentalSubspaces: WikiArticle = {
  conceptId: "disjointness-four-fundamental-subspaces",
  summary:
    "Row space and null space are not just disjoint (sharing only the zero vector) — they are full orthogonal complements of each other in $\\mathbb{R}$ⁿ. Column space and left null space are the same kind of pair in $\\mathbb{R}$ᵐ. Together the four subspaces cut the domain and codomain each into two perpendicular halves.",
  sections: [
    {
      heading: "Orthogonal complements, not merely disjoint",
      blocks: [
        {
          kind: "formula",
          latex: "C(\\mathbf{A}^{\\top}) \\perp N(\\mathbf{A}), \\qquad C(\\mathbf{A}^{\\top})^{\\perp} = N(\\mathbf{A}) \\ \\text{inside } \\mathbb{R}^{n}",
          caption: "The domain-side pair: row space and null space",
        },
        {
          kind: "formula",
          latex: "C(\\mathbf{A}) \\perp N(\\mathbf{A}^{\\top}), \\qquad C(\\mathbf{A})^{\\perp} = N(\\mathbf{A}^{\\top}) \\ \\text{inside } \\mathbb{R}^{m}",
          caption: "The codomain-side pair: column space and left null space",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "“Only share the zero vector” is a strictly weaker claim",
          text: "Two subspaces can intersect only at the origin without being orthogonal complements: they might sit at a 30° angle to each other, or their dimensions might not even add up to fill the ambient space. Being orthogonal complements requires two extra things — (1) every vector in one is perpendicular to every vector in the other, and (2) their dimensions sum to the full ambient dimension, so together they span it entirely. Row space and null space satisfy both, which is a much stronger and more useful fact than trivial intersection alone.",
        },
      ],
    },
    {
      heading: "The proof is just Ax = 0, read carefully",
      blocks: [
        {
          kind: "prose",
          text: "Nothing exotic is needed. Write out $\\mathbf{A}\\mathbf{x} = \\mathbf{0}$ one entry at a time: each entry of the output is the dot product of one row of $\\mathbf{A}$ with $\\mathbf{x}$. So $\\mathbf{A}\\mathbf{x}=\\mathbf{0}$ says, simultaneously, that $\\mathbf{x}$ is orthogonal to row 1, orthogonal to row 2, ..., orthogonal to every row of $\\mathbf{A}$.",
        },
        {
          kind: "example",
          title: "From “orthogonal to every row” to “orthogonal to the row space”",
          problem:
            "Prove $N(\\mathbf{A}) \\perp C(\\mathbf{A}^{\\top})$ directly from the definition of $N(\\mathbf{A})$.",
          steps: [
            "Let $\\mathbf{x} \\in N(\\mathbf{A})$, so $\\mathbf{A}\\mathbf{x} = \\mathbf{0}$.",
            "Entry $i$ of $\\mathbf{A}\\mathbf{x}$ is $(\\text{row}_i \\cdot \\mathbf{x})$, so $\\text{row}_i \\cdot \\mathbf{x} = 0$ for every $i$.",
            "$\\mathbf{x}$ is therefore orthogonal to every individual row, hence to any linear combination of the rows.",
            "The row space is exactly the set of all such combinations, so $\\mathbf{x} \\perp C(\\mathbf{A}^{\\top})$.",
          ],
          answer:
            "Every $\\mathbf{x} \\in N(\\mathbf{A})$ is orthogonal to the entire row space — the orthogonality is forced by the entrywise meaning of $\\mathbf{A}\\mathbf{x}=\\mathbf{0}$, not an extra fact to prove separately.",
        },
        {
          kind: "prose",
          text: "The dimension count closes the argument: $\\dim C(\\mathbf{A}^{\\top}) + \\dim N(\\mathbf{A}) = \\operatorname{rank}(\\mathbf{A}) + (n - \\operatorname{rank}(\\mathbf{A})) = n$. Orthogonal subspaces whose dimensions add to the whole ambient space are exactly orthogonal complements — the intersection being trivial then follows automatically, rather than needing to be checked separately.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The column-space / left-null-space pair mirrors this exactly",
          text: "Apply the identical argument to $\\mathbf{A}^{\\top}$: $\\mathbf{A}^{\\top}\\mathbf{y} = \\mathbf{0}$ says $\\mathbf{y}$ is orthogonal to every column of $\\mathbf{A}$ (since $\\mathbf{A}^{\\top}\\mathbf{y}$'s entries are columns of $\\mathbf{A}$ dotted with $\\mathbf{y}$), hence orthogonal to $C(\\mathbf{A})$. No new proof technique is required — it is the same statement, one transpose over.",
        },
      ],
    },
    {
      heading: "Two orthogonal decompositions, one for each side",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{R}^{n} = C(\\mathbf{A}^{\\top}) \\oplus N(\\mathbf{A}), \\qquad \\mathbb{R}^{m} = C(\\mathbf{A}) \\oplus N(\\mathbf{A}^{\\top})",
          caption: "The domain splits into row space and null space; the codomain splits into column space and left null space",
        },
        {
          kind: "table",
          headers: ["Question about Ax = b", "Answered by"],
          rows: [
            ["Is b solvable at all?", "whether b's component in $N(\\mathbf{A}^{\\top})$ is zero — equivalently, whether $\\mathbf{b} \\in C(\\mathbf{A})$"],
            ["If solvable, how many solutions?", "the full solution set is one point plus all of $N(\\mathbf{A})$ — infinite unless $N(\\mathbf{A})=\\{\\mathbf{0}\\}$"],
            ["Which x actually matters?", "only $\\mathbf{x}$'s component in $C(\\mathbf{A}^{\\top})$; the $N(\\mathbf{A})$ component is invisible to $\\mathbf{A}$"],
          ],
        },
        {
          kind: "prose",
          text: "This is why the four subspaces, taken together as two orthogonal decompositions rather than four separate objects, give a *complete* geometric answer to what $\\mathbf{A}\\mathbf{x}=\\mathbf{b}$ can and cannot do — not just a dimension count, but the exact solvability condition and the exact shape of the solution set.",
        },
      ],
    },
    {
      heading: "Where the orthogonality does real work",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Least squares.** Fitted values $\\hat{\\mathbf{y}} \\in C(X)$ and residuals $\\mathbf{y}-\\hat{\\mathbf{y}} \\in N(X^{\\top})$ are automatically orthogonal — not an assumption, but a forced consequence of this complement relationship, which is why residual-predictor orthogonality needs no separate proof once the projection is defined this way.",
            "**Network flow.** Circulations ($N(\\mathbf{A})$, flow with zero net effect at every node) are orthogonal to the row space (the constraints actually determining node balances) — a genuine physical separation between internal recirculation and net transport, not merely an algebraic coincidence.",
            "**Conservation laws.** In chemical reaction networks and electrical circuits, the same complement structure identifies conserved quantities (left null space) as everything orthogonal to what the system can actually produce (column space).",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§4.1" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lecture 10" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-04-four-fundamental-subspaces.md" },
  ],
};
