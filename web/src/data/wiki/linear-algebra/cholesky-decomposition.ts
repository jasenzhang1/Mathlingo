import type { WikiArticle } from "../types";

export const choleskyDecomposition: WikiArticle = {
  conceptId: "cholesky-decomposition",
  summary:
    "Cholesky factors a symmetric positive definite matrix as $LL^{\\top}$ — the matrix square root of a positive number, generalised. It costs half of a general LU, needs no pivoting, and doubles as the cheapest reliable test for positive definiteness.",
  sections: [
    {
      heading: "The factorisation",
      blocks: [
        {
          kind: "formula",
          latex: "A = LL^{\\top}, \\qquad L \\text{ lower triangular with positive diagonal}",
          caption: "Exists and is unique exactly when $A$ is symmetric positive definite",
        },
        {
          kind: "prose",
          text: "It is LU specialised to the symmetric positive definite case: since $A$ is symmetric, the upper factor is determined by the lower one, and only half the arithmetic and half the storage are needed. The cost is $\\tfrac{1}{3}n^{3}$ against LU's $\\tfrac{2}{3}n^{3}$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "No pivoting is required, and that is unusual",
          text: "General LU needs row swaps for stability. Positive definiteness guarantees every pivot is positive without any searching, so Cholesky is unconditionally stable as written — no permutation matrix, no branching, and a memory access pattern that vectorises well. This is why it is the workhorse in Gaussian process regression and Kalman filtering, where the same structure appears repeatedly.",
        },
      ],
    },
    {
      heading: "As a definiteness test",
      blocks: [
        {
          kind: "prose",
          text: "The algorithm computes $\\ell_{jj} = \\sqrt{a_{jj} - \\sum_{k<j}\\ell_{jk}^{2}}$ at each step. If that quantity is not positive, the square root fails — and that failure is exactly the proof that $A$ is not positive definite.",
        },
        {
          kind: "table",
          headers: ["Test for positive definiteness", "Cost"],
          rows: [
            ["All eigenvalues positive", "$O(n^{3})$ with a large constant"],
            ["All leading minors positive", "$n$ determinants — expensive and unstable"],
            ["**Cholesky succeeds**", "$\\tfrac{1}{3}n^{3}$ — the cheapest, and definitive"],
          ],
        },
        {
          kind: "example",
          title: "Factoring by hand",
          problem: "Find the Cholesky factor of $A = \\begin{bmatrix} 4 & 2 \\\\ 2 & 5\\end{bmatrix}$.",
          steps: [
            "$\\ell_{11} = \\sqrt{4} = 2$.",
            "$\\ell_{21} = a_{21}/\\ell_{11} = 2/2 = 1$.",
            "$\\ell_{22} = \\sqrt{a_{22} - \\ell_{21}^{2}} = \\sqrt{5 - 1} = 2$.",
            "Check: $LL^{\\top} = \\begin{bmatrix}2&0\\\\1&2\\end{bmatrix}\\begin{bmatrix}2&1\\\\0&2\\end{bmatrix} = \\begin{bmatrix}4&2\\\\2&5\\end{bmatrix}$. ✓",
          ],
          answer:
            "$L = \\begin{bmatrix} 2 & 0 \\\\ 1 & 2\\end{bmatrix}$. Both diagonal entries are positive, confirming $A$ is positive definite.",
        },
      ],
    },
    {
      heading: "Where it appears",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Sampling correlated Gaussians.** If $\\mathbf{z} \\sim \\mathcal{N}(\\mathbf{0},I)$ then $L\\mathbf{z} \\sim \\mathcal{N}(\\mathbf{0},\\Sigma)$, since $\\operatorname{Cov}(L\\mathbf{z}) = LL^{\\top} = \\Sigma$. This is how multivariate normal samples are generated.",
            "**Gaussian log-likelihood.** Both $\\log\\det\\Sigma = 2\\sum_i\\log\\ell_{ii}$ and the quadratic form $\\mathbf{x}^{\\top}\\Sigma^{-1}\\mathbf{x} = \\|L^{-1}\\mathbf{x}\\|^{2}$ come from one factorisation, computed stably and without forming $\\Sigma^{-1}$.",
            "**Gaussian processes.** Every GP prediction is a Cholesky solve against the kernel matrix; it dominates the $O(n^{3})$ cost that limits GPs to moderate $n$.",
            "**Normal equations**, when $X^{\\top}X$ is well conditioned — though QR on $X$ directly is safer when it is not.",
            "**Whitening.** $L^{-1}$ transforms correlated data to have identity covariance.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Failure usually means the matrix is only semidefinite",
          text: "A sample covariance with more variables than observations is singular, so Cholesky fails — correctly. In floating point a mathematically semidefinite matrix can also produce a tiny negative pivot from rounding alone. The standard remedy is *jitter*: factor $\\Sigma + \\varepsilon I$ for a small $\\varepsilon$, which is the same shrinkage idea as ridge regression and is routine in Gaussian process implementations.",
        },
        {
          kind: "prose",
          text: "For symmetric matrices that are *not* positive definite, the $LDL^{\\top}$ factorisation applies instead — it avoids square roots by pulling the diagonal out separately, allowing negative entries in $D$. It keeps the symmetry advantage while handling indefinite cases, at the cost of needing pivoting again.",
        },
      ],
    },
  ],
  references: [
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lecture 23" },
    { source: "Golub & Van Loan, Matrix Computations", locator: "§4.2" },
    { source: "Rasmussen & Williams, Gaussian Processes for Machine Learning", locator: "Appendix A.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-07-spectral-theory-and-special-matrices.md" },
  ],
};
