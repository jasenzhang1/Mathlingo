import type { WikiArticle } from "../types";

export const determinantProperties: WikiArticle = {
  conceptId: "determinant-properties",
  summary:
    "The determinant's algebraic rules all fall out of one fact: it is a volume-scaling factor, so composing transformations multiplies scaling factors, undoing a transformation inverts the factor, and transposing or reordering a product never changes the aggregate scalar even though it changes the matrices themselves.",
  sections: [
    {
      heading: "The core identities",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Statement", "Why"],
          rows: [
            ["Product", "$\\det(\\mathbf{A}\\mathbf{B}) = \\det \\mathbf{A} \\cdot \\det \\mathbf{B}$", "volume scalings compose multiplicatively"],
            ["Transpose", "$\\det \\mathbf{A}^{\\top} = \\det \\mathbf{A}$", "row expansion and column expansion give the same sum"],
            ["Inverse", "$\\det(\\mathbf{A}^{-1}) = 1/\\det \\mathbf{A}$", "from $\\mathbf{A} \\mathbf{A}^{-1} = I$ and the product rule"],
            ["Global scaling", "$\\det(cA) = c^{n}\\det \\mathbf{A}$", "**every one of the $n$ rows** picks up a factor of $c$"],
            ["Single-row scaling", "scales det by $c$ (not $c^n$)", "linearity holds in one row at a time"],
            ["Row swap", "flips the sign", "orientation reverses"],
            ["Row addition", "unchanged", "a shear preserves volume"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The two most common errors",
          text: "Forgetting the exponent in $\\det(cA) = c^n \\det \\mathbf{A}$ — scaling the *whole matrix* by $c$ touches every one of its $n$ rows, so the factor appears $n$ times. And confusing that with scaling a *single* row, which only multiplies the determinant by $c$ once, since the determinant is linear in each row separately, not in the matrix as a single object.",
        },
      ],
    },
    {
      heading: "Why the product rule holds",
      blocks: [
        {
          kind: "prose",
          text: "Think of $\\mathbf{A}$ and $\\mathbf{B}$ as transformations. Applying $\\mathbf{B}$ first scales volume by $\\det \\mathbf{B}$; then applying $\\mathbf{A}$ scales the already-transformed volume by $\\det \\mathbf{A}$. The composed transformation $\\mathbf{A}\\mathbf{B}$ (apply $\\mathbf{B}$, then $\\mathbf{A}$) scales volume by the product of the two individual factors — that is exactly $\\det(\\mathbf{A}\\mathbf{B}) = \\det \\mathbf{A} \\cdot \\det \\mathbf{B}$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "$\\det(\\mathbf{A}\\mathbf{B}) = \\det(\\mathbf{B}\\mathbf{A})$, even though $\\mathbf{A}\\mathbf{B} \\ne \\mathbf{B}\\mathbf{A}$",
          text: "This surprises people the first time they see it. $\\det(\\mathbf{A}\\mathbf{B})$ and $\\det(\\mathbf{B}\\mathbf{A})$ are both just the *scalar* $\\det \\mathbf{A} \\cdot \\det \\mathbf{B}$, and scalar multiplication commutes no matter what the underlying matrices do. But $\\mathbf{A}\\mathbf{B}$ and $\\mathbf{B}\\mathbf{A}$ can be completely different matrices — acting differently on individual vectors — while still sharing this one aggregate number. Equal determinants never imply equal matrices.",
        },
        {
          kind: "example",
          title: "Inverse from the product rule",
          problem: "Show that $\\det(\\mathbf{A}^{-1}) = 1/\\det \\mathbf{A}$ for invertible $\\mathbf{A}$.",
          steps: [
            "Start from $\\mathbf{A} \\mathbf{A}^{-1} = I$.",
            "Apply the product rule: $\\det(\\mathbf{A} \\mathbf{A}^{-1}) = \\det \\mathbf{A} \\cdot \\det(\\mathbf{A}^{-1})$.",
            "The left side is $\\det I = 1$, so $\\det \\mathbf{A} \\cdot \\det(\\mathbf{A}^{-1}) = 1$.",
            "Divide by $\\det \\mathbf{A}$ (nonzero, since $\\mathbf{A}$ is invertible): $\\det(\\mathbf{A}^{-1}) = 1/\\det \\mathbf{A}$.",
          ],
          answer: "$\\det(\\mathbf{A}^{-1}) = 1/\\det \\mathbf{A}$ — undoing a scaling by $k$ scales by $1/k$.",
        },
      ],
    },
    {
      heading: "Transpose, scaling, and the zero cases",
      blocks: [
        {
          kind: "prose",
          text: "$\\det \\mathbf{A}^{\\top} = \\det \\mathbf{A}$ holds because cofactor expansion along a row of $\\mathbf{A}$ produces exactly the same sum of signed products as expansion along the corresponding column of $\\mathbf{A}^{\\top}$ — transposing only relabels which index is called “row” and which is called “column,” it does not change which entry-products appear or their signs.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "det(A) = 0",
              description:
                "singular: the transformation collapses volume to zero. A matrix with an all-zero row, a repeated row, or dependent columns always has determinant 0.",
            },
            {
              term: "$\\det(c\\mathbf{A})$ for $n \\times n$ $\\mathbf{A}$",
              description:
                "$c^n \\det \\mathbf{A}$ — every one of the $n$ rows contributes a factor of $c$, by $n$ applications of linearity in each row.",
            },
          ],
        },
        {
          kind: "example",
          title: "Composed transformation",
          problem:
            "A transformation is a rotation ($\\det = 1$) composed with a reflection ($\\det = -1$) composed with a uniform scaling by 3 in 3 dimensions ($\\det = 3^3 = 27$). Find the determinant of the full composition and interpret it.",
          steps: [
            "Multiply the three factors: $\\det = 1 \\cdot (-1) \\cdot 27 = -27$.",
          ],
          answer:
            "The negative sign means orientation is flipped overall; the magnitude 27 means volumes are scaled up by a factor of 27.",
        },
      ],
    },
    {
      heading: "Where the properties matter",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Change of variables.** The Jacobian determinant is a *local, position-dependent* scaling factor for a nonlinear map — $\\det(cA) = c^n \\det \\mathbf{A}$ only describes a single global linear rescaling, which is why a nonlinear coordinate change (e.g. to spherical coordinates) needs a Jacobian determinant that varies from point to point.",
            "**Log-determinants.** Because $\\det(\\mathbf{A}\\mathbf{B}) = \\det \\mathbf{A} \\det \\mathbf{B}$, a determinant built from many factors (like the pivots of an LU decomposition) is computed as a *sum of logs*, not a product followed by a log — this avoids the overflow that direct multiplication of many pivots would cause.",
            "**Eigenvalues.** $\\det \\mathbf{A} = \\prod_i \\lambda_i$ and $\\det(\\mathbf{A}^{-1}) = \\prod_i 1/\\lambda_i$ are direct restatements of the inverse rule in terms of eigenvalues.",
            "**Positive-definiteness checks.** $\\det(cA) = c^n \\det \\mathbf{A}$ means scaling a covariance matrix by a positive constant never flips whether it's singular, but it does rescale how its determinant compares across different-sized problems.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Multiplication order still matters for the matrices",
          text: "det(AB) = det(BA) is a statement about one scalar, not a license to swap matrix products around. If a computation needs the actual matrix $\\mathbf{A}\\mathbf{B}$ — its action on a specific vector, its eigenvalues, its rows — order matters exactly as much as it always does for matrix multiplication. Only the aggregate volume-scaling number is order-independent.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "Ch. 5" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 10B" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lecture 12" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-06-determinants-and-eigenstuff.md" },
  ],
};
