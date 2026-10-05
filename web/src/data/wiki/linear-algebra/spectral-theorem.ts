import type { WikiArticle } from "../types";

export const spectralTheorem: WikiArticle = {
  conceptId: "spectral-theorem",
  summary:
    "The spectral theorem says every real symmetric matrix can be written as $\\mathbf{Q}\\boldsymbol{\\Lambda} \\mathbf{Q}^{\\top}$ with $\\mathbf{Q}$ orthogonal and $\\boldsymbol{\\Lambda}$ real diagonal. It is the strongest structural result in linear algebra, and it is what makes PCA, quadratic forms, and second-order optimisation work without caveats.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{A} = \\mathbf{A}^{\\top} \\ \\Longrightarrow \\ \\mathbf{A} = \\mathbf{Q}\\boldsymbol{\\Lambda} \\mathbf{Q}^{\\top} = \\sum_{i=1}^{n} \\lambda_i\\,\\mathbf{q}_i\\mathbf{q}_i^{\\top}",
          caption: "Real eigenvalues in $\\boldsymbol{\\Lambda}$, orthonormal eigenvectors in $\\mathbf{Q}$",
        },
        {
          kind: "prose",
          text: "The rank-one expansion on the right is the useful form. It decomposes the matrix into orthogonal directions, each scaled independently — so applying $\\mathbf{A}$ means projecting onto each $\\mathbf{q}_i$, scaling by $\\lambda_i$, and adding the pieces back.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What makes it strong",
          text: "General matrices may have complex eigenvalues, non-orthogonal eigenvectors, or too few eigenvectors to form a basis at all. Symmetry rules out all three failures simultaneously — and unconditionally, with no genericity assumption. There is no symmetric matrix for which this fails, which is unusual for a theorem this powerful.",
        },
      ],
    },
    {
      heading: "Geometric reading",
      blocks: [
        {
          kind: "prose",
          text: "$\\mathbf{Q}^{\\top}$ rotates into the eigenbasis, $\\boldsymbol{\\Lambda}$ scales each axis independently, and $\\mathbf{Q}$ rotates back. So a symmetric transformation is a pure stretch along $n$ perpendicular axes — no shearing, no rotation. That is why the level sets of $\\mathbf{x}^{\\top}\\mathbf{A}\\mathbf{x}$ are ellipsoids with axes along the eigenvectors and lengths set by the eigenvalues.",
        },
        {
          kind: "formula",
          latex: "\\mathbf{x}^{\\top}\\mathbf{A}\\mathbf{x} = \\sum_{i=1}^{n} \\lambda_i\\,(\\mathbf{q}_i \\cdot \\mathbf{x})^{2}",
          caption: "In the eigenbasis a quadratic form is a weighted sum of squares",
        },
        {
          kind: "prose",
          text: "Definiteness follows immediately: the form is positive for all non-zero $\\mathbf{x}$ exactly when every $\\lambda_i > 0$. This is the link between the eigenvalue test for positive definiteness and the quadratic-form definition — they are the same statement viewed in two bases.",
        },
      ],
    },
    {
      heading: "What it powers",
      blocks: [
        {
          kind: "table",
          headers: ["Application", "The symmetric matrix", "What the decomposition gives"],
          rows: [
            ["PCA", "covariance $\\boldsymbol{\\Sigma}$", "orthogonal components; $\\lambda_i$ is the variance along each"],
            ["Optimisation", "Hessian", "eigenvalue signs classify minima, maxima, saddles"],
            ["Spectral clustering", "graph Laplacian", "eigenvectors reveal community structure"],
            ["Matrix functions", "any symmetric $\\mathbf{A}$", "$f(\\mathbf{A}) = \\mathbf{Q}f(\\boldsymbol{\\Lambda})\\mathbf{Q}^{\\top}$ — apply $f$ to the eigenvalues"],
            ["Multivariate normal", "$\\boldsymbol{\\Sigma}^{-1}$", "the Mahalanobis distance's principal axes"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Matrix square roots and the whitening transform",
          text: "$\\mathbf{A}^{1/2} = \\mathbf{Q}\\boldsymbol{\\Lambda}^{1/2}\\mathbf{Q}^{\\top}$ makes sense precisely because the eigenvalues are real and non-negative for a positive semidefinite $\\mathbf{A}$. This is how correlated Gaussian samples are generated — multiply independent standard normals by $\\boldsymbol{\\Sigma}^{1/2}$ — and how data is whitened, by multiplying by $\\boldsymbol{\\Sigma}^{-1/2}$ to make the covariance the identity.",
        },
        {
          kind: "example",
          title: "Reading a quadratic form",
          problem:
            "Classify the critical point of $f(x,y) = 2x^{2} + 2xy + 2y^{2}$ at the origin.",
          steps: [
            "The Hessian is $H = \\begin{bmatrix} 4 & 2 \\\\ 2 & 4\\end{bmatrix}$, symmetric as always.",
            "Eigenvalues: $\\lambda = 6$ (eigenvector $[1, 1]$) and $\\lambda = 2$ (eigenvector $[1, -1]$).",
            "Both positive, so $H$ is positive definite.",
            "Level sets are ellipses with axes along $[1, 1]$ and $[1, -1]$, three times steeper along the first.",
          ],
          answer:
            "A strict local minimum. The spectral theorem guarantees the axes are perpendicular, which is why the ellipse has no tilt-induced cross terms in the eigenbasis.",
        },
      ],
    },
    {
      heading: "Boundaries",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Non-symmetric matrices** need Schur decomposition ($\\mathbf{A} = QTQ^{\\top}$ with $T$ upper triangular) or the Jordan form — both weaker, and the latter numerically unusable.",
            "**Complex matrices** use the Hermitian condition $\\mathbf{A}^{*} = \\mathbf{A}$ instead, with $\\mathbf{Q}$ unitary. The theorem and its proof carry over unchanged.",
            "**Infinite dimensions** require compactness or boundedness assumptions; the spectral theorem for self-adjoint operators is the foundation of quantum mechanics and of kernel methods via Mercer's theorem.",
            "**Repeated eigenvalues** do not break it — an orthonormal basis for each eigenspace can always be chosen, though the individual eigenvectors are then not unique.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Non-uniqueness with repeated eigenvalues",
          text: "If $\\lambda$ has multiplicity 2, any orthonormal pair spanning its eigenspace works — so different software returns different $\\mathbf{Q}$. In PCA this shows up as unstable component directions when two eigenvalues are nearly equal: the *subspace* is well determined but the individual axes within it are not, and interpreting those axes is then meaningless.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§6.4" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 7B, Thm 7.29" },
    { source: "Horn & Johnson, Matrix Analysis", locator: "§4.1" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-07-spectral-theory-and-special-matrices.md" },
  ],
};
