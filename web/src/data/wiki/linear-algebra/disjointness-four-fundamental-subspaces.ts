import type { WikiArticle } from "../types";

export const disjointnessFourFundamentalSubspaces: WikiArticle = {
  conceptId: "disjointness-four-fundamental-subspaces",
  summary:
    "Row space and null space are not just disjoint (sharing only the zero vector) — they are full orthogonal complements of each other in ℝⁿ. Column space and left null space are the same kind of pair in ℝᵐ. Together the four subspaces cut the domain and codomain each into two perpendicular halves.",
  sections: [
    {
      heading: "Orthogonal complements, not merely disjoint",
      blocks: [
        {
          kind: "formula",
          latex: "C(A^{\\top}) \\perp N(A), \\qquad C(A^{\\top})^{\\perp} = N(A) \\ \\text{inside } \\mathbb{R}^{n}",
          caption: "The domain-side pair: row space and null space",
        },
        {
          kind: "formula",
          latex: "C(A) \\perp N(A^{\\top}), \\qquad C(A)^{\\perp} = N(A^{\\top}) \\ \\text{inside } \\mathbb{R}^{m}",
          caption: "The codomain-side pair: column space and left null space",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "\"Only share the zero vector\" is a strictly weaker claim",
          text: "Two subspaces can intersect only at the origin without being orthogonal complements: they might sit at a 30° angle to each other, or their dimensions might not even add up to fill the ambient space. Being orthogonal complements requires two extra things — (1) every vector in one is perpendicular to every vector in the other, and (2) their dimensions sum to the full ambient dimension, so together they span it entirely. Row space and null space satisfy both, which is a much stronger and more useful fact than trivial intersection alone.",
        },
      ],
    },
    {
      heading: "The proof is just Ax = 0, read carefully",
      blocks: [
        {
          kind: "prose",
          text: "Nothing exotic is needed. Write out $A\\mathbf{x} = \\mathbf{0}$ one entry at a time: each entry of the output is the dot product of one row of $A$ with $\\mathbf{x}$. So $A\\mathbf{x}=\\mathbf{0}$ says, simultaneously, that $\\mathbf{x}$ is orthogonal to row 1, orthogonal to row 2, ..., orthogonal to every row of $A$.",
        },
        {
          kind: "example",
          title: "From \"orthogonal to every row\" to \"orthogonal to the row space\"",
          problem:
            "Prove $N(A) \\perp C(A^{\\top})$ directly from the definition of $N(A)$.",
          steps: [
            "Let $\\mathbf{x} \\in N(A)$, so $A\\mathbf{x} = \\mathbf{0}$.",
            "Entry $i$ of $A\\mathbf{x}$ is $(\\text{row}_i \\cdot \\mathbf{x})$, so $\\text{row}_i \\cdot \\mathbf{x} = 0$ for every $i$.",
            "$\\mathbf{x}$ is therefore orthogonal to every individual row, hence to any linear combination of the rows.",
            "The row space is exactly the set of all such combinations, so $\\mathbf{x} \\perp C(A^{\\top})$.",
          ],
          answer:
            "Every $\\mathbf{x} \\in N(A)$ is orthogonal to the entire row space — the orthogonality is forced by the entrywise meaning of $A\\mathbf{x}=\\mathbf{0}$, not an extra fact to prove separately.",
        },
        {
          kind: "prose",
          text: "The dimension count closes the argument: $\\dim C(A^{\\top}) + \\dim N(A) = \\operatorname{rank}(A) + (n - \\operatorname{rank}(A)) = n$. Orthogonal subspaces whose dimensions add to the whole ambient space are exactly orthogonal complements — the intersection being trivial then follows automatically, rather than needing to be checked separately.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The column-space / left-null-space pair mirrors this exactly",
          text: "Apply the identical argument to $A^{\\top}$: $A^{\\top}\\mathbf{y} = \\mathbf{0}$ says $\\mathbf{y}$ is orthogonal to every column of $A$ (since $A^{\\top}\\mathbf{y}$'s entries are columns of $A$ dotted with $\\mathbf{y}$), hence orthogonal to $C(A)$. No new proof technique is required — it is the same statement, one transpose over.",
        },
      ],
    },
    {
      heading: "Two orthogonal decompositions, one for each side",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{R}^{n} = C(A^{\\top}) \\oplus N(A), \\qquad \\mathbb{R}^{m} = C(A) \\oplus N(A^{\\top})",
          caption: "The domain splits into row space and null space; the codomain splits into column space and left null space",
        },
        {
          kind: "table",
          headers: ["Question about Ax = b", "Answered by"],
          rows: [
            ["Is b solvable at all?", "whether b's component in $N(A^{\\top})$ is zero — equivalently, whether $\\mathbf{b} \\in C(A)$"],
            ["If solvable, how many solutions?", "the full solution set is one point plus all of $N(A)$ — infinite unless $N(A)=\\{\\mathbf{0}\\}$"],
            ["Which x actually matters?", "only $\\mathbf{x}$'s component in $C(A^{\\top})$; the $N(A)$ component is invisible to $A$"],
          ],
        },
        {
          kind: "prose",
          text: "This is why the four subspaces, taken together as two orthogonal decompositions rather than four separate objects, give a *complete* geometric answer to what $A\\mathbf{x}=\\mathbf{b}$ can and cannot do — not just a dimension count, but the exact solvability condition and the exact shape of the solution set.",
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
            "**Network flow.** Circulations ($N(A)$, flow with zero net effect at every node) are orthogonal to the row space (the constraints actually determining node balances) — a genuine physical separation between internal recirculation and net transport, not merely an algebraic coincidence.",
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
