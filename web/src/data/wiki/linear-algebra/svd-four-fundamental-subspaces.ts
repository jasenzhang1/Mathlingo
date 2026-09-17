import type { WikiArticle } from "../types";

export const svdFourFundamentalSubspaces: WikiArticle = {
  conceptId: "svd-four-fundamental-subspaces",
  summary:
    "A single SVD hands you orthonormal bases for all four fundamental subspaces at once. The columns of U and V split automatically, by whether their singular value is nonzero or zero, into the column space, the left null space, the row space, and the null space — with rank r = rank(A) determining exactly where the split falls.",
  sections: [
    {
      heading: "The split",
      blocks: [
        {
          kind: "formula",
          latex: "A = U\\Sigma V^{\\top}, \\qquad r = \\operatorname{rank}(A)",
          caption: "$U$ is $m\\times m$, $V$ is $n\\times n$, both orthogonal",
        },
        {
          kind: "table",
          headers: ["Subspace", "Basis", "Dimension"],
          rows: [
            ["Column space $C(A)$", "first $r$ columns of $U$", "$r$"],
            ["Left null space $N(A^{\\top})$", "last $m-r$ columns of $U$", "$m-r$"],
            ["Row space $C(A^{\\top})$", "first $r$ columns of $V$", "$r$"],
            ["Null space $N(A)$", "last $n-r$ columns of $V$", "$n-r$"],
          ],
        },
        {
          kind: "prose",
          text: "The split falls exactly where $\\sigma_i$ stops being nonzero. For $i \\le r$, $A\\mathbf{v}_i = \\sigma_i\\mathbf{u}_i \\ne \\mathbf{0}$, so $\\mathbf{v}_i$ contributes to the row space and $\\mathbf{u}_i$ to the column space. For $i > r$, $\\sigma_i = 0$, so $A\\mathbf{v}_i = \\mathbf{0}$ — $\\mathbf{v}_i$ is, by definition, in the null space. The left null space columns of $U$ arise symmetrically from $A^{\\top}\\mathbf{u}_i = \\mathbf{0}$ for $i > r$.",
        },
      ],
    },
    {
      heading: "Why the orthogonality is automatic",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "No separate proof needed",
          text: "Row space ⊥ null space and column space ⊥ left null space are usually proved abstractly (e.g. via $Ax = 0 \\Leftrightarrow x \\perp$ every row of $A$). SVD makes this concrete for free: $V$ is an orthogonal matrix, so *all* of its columns are mutually orthonormal regardless of which group — row space or null space — they end up assigned to. The orthogonal-complement relationship isn't proved after the fact; it's built into $V$ being orthogonal in the first place. The same argument, applied to $U$, gives $C(A) \\perp N(A^{\\top})$.",
        },
        {
          kind: "prose",
          text: "Rank–nullity falls out the same way: $V$ has exactly $n$ orthonormal columns total, and the split assigns $r$ to the row space and $n-r$ to the null space, exhausting all of them. The dimensions must add to $n$ because the split is a partition of a fixed $n$-column basis, not two independently sized bases that happen to add up.",
        },
        {
          kind: "example",
          title: "Reading off all four subspaces directly",
          problem:
            "A = [[1, 0], [0, 0]] (already diagonal, rank 1). Identify all four fundamental subspaces from its SVD.",
          steps: [
            "$A^{\\top}A = \\mathrm{diag}(1,0)$: eigenvalues 1 and 0, so singular values 1 and 0, $r=1$.",
            "$\\mathbf{v}_1 = \\mathbf{e}_1$ (row space), $\\mathbf{v}_2 = \\mathbf{e}_2$ (null space) — matches $A\\mathbf{e}_2 = \\mathbf{0}$ directly.",
            "$\\mathbf{u}_1 = A\\mathbf{v}_1/\\sigma_1 = \\mathbf{e}_1$ (column space), $\\mathbf{u}_2 = \\mathbf{e}_2$ (left null space).",
          ],
          answer:
            "$C(A) = \\mathrm{span}(\\mathbf{e}_1)$, $N(A^{\\top}) = \\mathrm{span}(\\mathbf{e}_2)$, $C(A^{\\top}) = \\mathrm{span}(\\mathbf{e}_1)$, $N(A) = \\mathrm{span}(\\mathbf{e}_2)$ — each read directly off which standard basis vector $A$ kills or preserves.",
        },
      ],
    },
    {
      heading: "Solvability and the Fredholm alternative",
      blocks: [
        {
          kind: "prose",
          text: "The system $A\\mathbf{x} = \\mathbf{b}$ has a solution exactly when $\\mathbf{b} \\in C(A)$ — i.e. when $\\mathbf{b}$ has zero component along the last $m-r$ columns of $U$. Those columns of $U$, spanning $N(A^{\\top})$, are precisely the directions a right-hand side must avoid for the system to be consistent. SVD turns \"is this system solvable\" from an abstract question into a concrete projection check.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Numerical rank is a judgement call",
          text: "In floating point, $\\sigma_i$ is rarely exactly zero even when the true rank is deficient — rounding leaves a tiny nonzero residue. Practical rank (and hence the subspace split) is determined by thresholding the singular values against a tolerance, not by testing for exact zero. This matters directly in control theory, where the observable or controllable subspace of a system is identified the same way: from singular values that are small, not zero.",
        },
      ],
    },
    {
      heading: "Practical notes",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**One decomposition, four subspaces.** Row reduction gives the null space and (with more work) the row space, but the column space and left null space need a second computation on $A^{\\top}$. SVD produces all four simultaneously.",
            "**rank(A) = rank(Aᵀ) is immediate.** $A$ and $A^{\\top}$ share the same nonzero singular values (just with $U$ and $V$ swapped), so the count of nonzero singular values — the rank — is manifestly identical for both.",
            "**N(A) = N(AᵀA) exactly.** For $i \\le r$, $A^{\\top}A\\mathbf{v}_i = \\sigma_i^2\\mathbf{v}_i \\ne \\mathbf{0}$; for $i>r$, both are zero. The null space is the same $n-r$ dimensional subspace either way.",
            "**Truncated bases approximate subspaces for incomplete data.** In recommender systems, the top singular vectors of a (completed) ratings matrix approximate a low-dimensional 'preference subspace,' even though the true four subspaces of the underlying full matrix are never observed directly.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§7.3" },
    { source: "Strang, Linear Algebra and Its Applications", locator: "§3.6 (Four Fundamental Subspaces)" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lecture 4" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-08-svd-and-applications.md" },
  ],
};
