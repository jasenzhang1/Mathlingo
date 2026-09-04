import type { WikiArticle } from "../types";

export const pcaMatrixEdition: WikiArticle = {
  conceptId: "pca-matrix-edition",
  summary:
    "PCA is the SVD of a centred data matrix. Framing it that way makes its properties consequences rather than assertions: components are orthogonal because the covariance matrix is symmetric, ordered because singular values are, and optimal for reconstruction because of Eckart–Young.",
  sections: [
    {
      heading: "Two derivations, one answer",
      blocks: [
        {
          kind: "formula",
          latex: "X_c = U\\Sigma V^{\\top}, \\qquad \\Sigma_{\\text{cov}} = \\frac{X_c^{\\top}X_c}{n-1} = V\\frac{\\Sigma^{2}}{n-1}V^{\\top}",
          caption: "SVD of the centred data; $V$ holds the principal directions",
        },
        {
          kind: "table",
          headers: ["Route", "Objective", "Answer"],
          rows: [
            [
              "Maximise variance",
              "$\\max_{\\|\\mathbf{w}\\|=1} \\mathbf{w}^{\\top}\\Sigma_{\\text{cov}}\\mathbf{w}$",
              "top eigenvector of the covariance",
            ],
            [
              "Minimise reconstruction error",
              "$\\min_{\\operatorname{rank} k}\\|X_c - \\hat{X}\\|_F$",
              "top $k$ right singular vectors",
            ],
          ],
          caption:
            "The first is the Rayleigh quotient; the second is Eckart–Young. They give the same subspace, which is why PCA can be motivated either way.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the two objectives coincide",
          text: "Total variance is fixed. By Pythagoras, variance retained in the projection plus variance lost in the residual equals the total — so maximising what is kept is identical to minimising what is discarded. This is the same orthogonal decomposition that makes least squares work, applied to the data matrix instead of a response vector.",
        },
      ],
    },
    {
      heading: "The quantities that come out",
      blocks: [
        {
          kind: "formula",
          latex: "\\lambda_k = \\frac{\\sigma_k^{2}}{n-1}, \\qquad \\text{explained variance ratio} = \\frac{\\sigma_k^{2}}{\\sum_j \\sigma_j^{2}}",
          caption: "Eigenvalues of the covariance are scaled squared singular values",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Loadings** — columns of $V$, giving each original variable's contribution to a component.",
            "**Scores** — $X_cV = U\\Sigma$, the data in the new coordinates.",
            "**Whitening** — $U$ alone, or $X_cV\\Sigma^{-1}$, produces uncorrelated unit-variance components.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Compute the SVD of $X_c$, not the eigendecomposition of $X_c^{\\top}X_c$",
          text: "Forming the covariance matrix squares the condition number, so small components are lost to rounding — the same argument as for the normal equations. Every serious PCA implementation runs the SVD on the centred data directly. It is also cheaper when $n \\gg p$ or $p \\gg n$, since only the smaller dimension's decomposition is needed.",
        },
      ],
    },
    {
      heading: "Preprocessing is not optional",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Centring is required; scaling is a judgement call",
          text: "Without centring, the first component points at the mean rather than the direction of greatest spread, and the result is not PCA. Scaling is different: PCA maximises variance, so a variable measured in grams dominates one measured in kilograms purely through units. Standardising each variable first — equivalent to using the correlation matrix — is right when units are arbitrary, and wrong when the relative scales are meaningful.",
        },
        {
          kind: "example",
          title: "Choosing the number of components",
          problem:
            "Singular values are $40, 25, 8, 3, 1$. How many components retain 90% of the variance?",
          steps: [
            "Squares: $1600, 625, 64, 9, 1$; total $2299$.",
            "$k=1$: $69.6\\%$.",
            "$k=2$: $2225/2299 = 96.8\\%$. ✓",
            "The gap between 25 and 8 is the elbow, suggesting $k=2$ independently of the threshold.",
          ],
          answer: "Two components.",
        },
      ],
    },
    {
      heading: "Limits",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Linear only.** PCA finds a linear subspace; data on a curved manifold is poorly summarised by one. Kernel PCA, t-SNE, and UMAP exist for that case.",
            "**Variance is not importance.** A low-variance direction can carry the entire signal — PCA is unsupervised and does not know what you are predicting. Discarding components before a regression can discard exactly the useful ones.",
            "**Components are rarely interpretable.** A loading spreading across twenty variables usually has no meaning, and naming it invites over-reading.",
            "**Signs are arbitrary.** Flipping $\\mathbf{u}_k$ and $\\mathbf{v}_k$ together leaves everything unchanged, so component orientation differs between libraries and is not interpretable.",
            "**Near-equal eigenvalues make directions unstable.** The subspace is well determined, the individual axes within it are not — so interpreting them is meaningless there.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§7.3" },
    { source: "Hastie, Tibshirani & Friedman, Elements of Statistical Learning", locator: "§14.5" },
    { source: "Jolliffe & Cadima, 'Principal component analysis: a review'", locator: "Phil. Trans. R. Soc. A 374, 2016" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-08-svd-and-applications.md" },
  ],
};
