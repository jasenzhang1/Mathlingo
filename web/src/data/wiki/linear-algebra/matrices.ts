import type { WikiArticle } from "../types";

export const matrices: WikiArticle = {
  conceptId: "matrices",
  summary:
    "A matrix is a rectangular array of numbers, and simultaneously a linear transformation, and simultaneously a collection of column vectors. Which reading you adopt determines what a computation *means* — and switching between them fluently is most of what it takes to see linear algebra as geometry rather than bookkeeping.",
  sections: [
    {
      heading: "Three readings",
      blocks: [
        {
          kind: "formula",
          latex: "A = \\begin{bmatrix} a_{11} & \\cdots & a_{1n} \\\\ \\vdots & \\ddots & \\vdots \\\\ a_{m1} & \\cdots & a_{mn} \\end{bmatrix} \\in \\mathbb{R}^{m \\times n}",
          caption: "$m$ rows, $n$ columns — $a_{ij}$ is row $i$, column $j$",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "As data",
              description:
                "A table: rows are observations, columns are features. This is the reading behind a design matrix in regression.",
            },
            {
              term: "As a transformation",
              description:
                "A function $\\mathbb{R}^{n} \\to \\mathbb{R}^{m}$ sending $\\mathbf{x} \\mapsto A\\mathbf{x}$. The dimensions say the map takes $n$-vectors to $m$-vectors.",
            },
            {
              term: "As columns",
              description:
                "$n$ vectors in $\\mathbb{R}^{m}$. $A\\mathbf{x}$ is then a linear combination of them, weighted by $\\mathbf{x}$ — the reading that makes column space and rank obvious.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The columns are the images of the basis vectors",
          text: "$A\\mathbf{e}_j$ picks out column $j$. So a matrix is completely determined by where it sends the standard basis — record those images as columns and you have the matrix. This is why building a rotation or projection matrix is a matter of asking where $\\mathbf{e}_1$ and $\\mathbf{e}_2$ go, not of memorising a formula.",
        },
      ],
    },
    {
      heading: "Shapes that matter",
      blocks: [
        {
          kind: "table",
          headers: ["Type", "Condition", "Significance"],
          rows: [
            ["Square", "$m = n$", "domain and codomain match; invertibility is possible"],
            ["Symmetric", "$A^{\\top} = A$", "real eigenvalues, orthogonal eigenvectors — the spectral theorem"],
            ["Diagonal", "$a_{ij} = 0$ for $i \\ne j$", "acts by independent scaling on each axis"],
            ["Identity $I$", "diagonal of ones", "$IA = AI = A$"],
            ["Orthogonal", "$Q^{\\top}Q = I$", "preserves lengths and angles; $Q^{-1} = Q^{\\top}$"],
            ["Triangular", "zeros above or below the diagonal", "systems solve by substitution; eigenvalues on the diagonal"],
          ],
        },
        {
          kind: "prose",
          text: "Symmetric matrices deserve special attention because they arise constantly and behave far better than general ones. Covariance matrices, Gram matrices $A^{\\top}A$, Hessians, and graph Laplacians are all symmetric, which is why the spectral theorem underwrites so much of statistics and optimisation.",
        },
      ],
    },
    {
      heading: "The transpose",
      blocks: [
        {
          kind: "formula",
          latex: "(A^{\\top})_{ij} = a_{ji}, \\qquad (AB)^{\\top} = B^{\\top}A^{\\top}, \\qquad (A^{\\top})^{\\top} = A",
          caption: "Reflection across the diagonal, with order reversal under products",
        },
        {
          kind: "prose",
          text: "The order reversal is not a quirk. The transpose is the *adjoint*: it satisfies $\\langle A\\mathbf{x}, \\mathbf{y}\\rangle = \\langle \\mathbf{x}, A^{\\top}\\mathbf{y}\\rangle$, so moving a matrix across an inner product transposes it. Reversing composition follows immediately from applying that identity twice.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "$A^{\\top}A$ is always symmetric and positive semidefinite",
          text: "Symmetric because $(A^{\\top}A)^{\\top} = A^{\\top}A$; positive semidefinite because $\\mathbf{x}^{\\top}A^{\\top}A\\mathbf{x} = \\|A\\mathbf{x}\\|^{2} \\ge 0$. This is why the normal equations $A^{\\top}A\\boldsymbol{\\beta} = A^{\\top}\\mathbf{b}$ are well behaved, why covariance matrices have non-negative eigenvalues, and why the SVD exists — all three rest on this one construction.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Reading a matrix as a transformation",
          problem:
            "What does $A = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$ do to vectors in $\\mathbb{R}^{2}$?",
          steps: [
            "Column 1 is $A\\mathbf{e}_1 = (0,1)$ — so $\\mathbf{e}_1 = (1,0)$ maps to $(0,1)$.",
            "Column 2 is $A\\mathbf{e}_2 = (-1,0)$ — so $\\mathbf{e}_2 = (0,1)$ maps to $(-1,0)$.",
            "Both basis vectors rotate a quarter turn anticlockwise.",
            "Check: $A^{\\top}A = I$, so it is orthogonal — lengths are preserved, as a rotation must.",
          ],
          answer:
            "A 90° anticlockwise rotation. Reading off the columns identifies it in two steps, without computing a general formula.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§2.1–2.3" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 3C" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lectures 1–3" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-02-matrices-and-structure.md" },
  ],
};
