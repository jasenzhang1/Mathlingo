import type { WikiArticle } from "../types";

export const matrixNorms: WikiArticle = {
  conceptId: "matrix-norms",
  summary:
    "A matrix norm measures a matrix's size, but the useful ones measure how much it can stretch a vector. The spectral norm gives the worst-case amplification, the Frobenius norm gives the total, and the nuclear norm gives the convex relaxation of rank — three different questions with three different answers.",
  sections: [
    {
      heading: "The three that matter",
      blocks: [
        {
          kind: "table",
          headers: ["Norm", "Definition", "In singular values", "Answers"],
          rows: [
            [
              "Spectral $\\|A\\|_2$",
              "$\\max_{\\mathbf{x}\\ne 0}\\dfrac{\\|A\\mathbf{x}\\|}{\\|\\mathbf{x}\\|}$",
              "$\\sigma_1$",
              "worst-case stretch",
            ],
            [
              "Frobenius $\\|A\\|_F$",
              "$\\sqrt{\\sum_{ij}a_{ij}^{2}}$",
              "$\\sqrt{\\sum_i\\sigma_i^{2}}$",
              "total size",
            ],
            [
              "Nuclear $\\|A\\|_*$",
              "—",
              "$\\sum_i \\sigma_i$",
              "convex surrogate for rank",
            ],
          ],
        },
        {
          kind: "prose",
          text: "The Frobenius norm treats the matrix as a long vector and applies the Euclidean norm — it is the one with an inner product behind it, $\\langle A,B\\rangle = \\operatorname{tr}(A^{\\top}B)$, which is why least-squares problems on matrices use it.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The spectral norm is an *operator* norm",
          text: "It is defined by what the matrix does, not by its entries: the largest factor by which any vector's length can grow. That definition makes $\\|A\\mathbf{x}\\| \\le \\|A\\|_2\\|\\mathbf{x}\\|$ true by construction, and it is the property every error-propagation argument in numerical analysis relies on. The identity $\\|A\\|_2 = \\sigma_1$ then says the largest singular value *is* the worst-case stretch.",
        },
      ],
    },
    {
      heading: "Submultiplicativity",
      blocks: [
        {
          kind: "formula",
          latex: "\\|AB\\| \\le \\|A\\|\\,\\|B\\|",
          caption: "Holds for the spectral and Frobenius norms — the property that makes norms useful",
        },
        {
          kind: "prose",
          text: "This is what lets errors be bounded through a chain of operations: composing transformations can amplify by at most the product of their individual amplifications. It is also why the *max-entry* norm $\\max_{ij}|a_{ij}|$ is rarely used — it fails this inequality, so it cannot bound anything downstream.",
        },
        {
          kind: "example",
          title: "Comparing the norms",
          problem:
            "For $A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 4\\end{bmatrix}$, compute all three norms.",
          steps: [
            "Diagonal, so the singular values are $|3|$ and $|4|$, i.e. $\\sigma_1 = 4$, $\\sigma_2 = 3$.",
            "$\\|A\\|_2 = \\sigma_1 = 4$ — the most any vector can be stretched.",
            "$\\|A\\|_F = \\sqrt{9+16} = 5$.",
            "$\\|A\\|_* = 4 + 3 = 7$.",
          ],
          answer:
            "$4$, $5$, $7$. In general $\\|A\\|_2 \\le \\|A\\|_F \\le \\|A\\|_*$, with equality throughout only for rank-one matrices.",
        },
      ],
    },
    {
      heading: "The condition number",
      blocks: [
        {
          kind: "formula",
          latex: "\\kappa(A) = \\|A\\|\\,\\|A^{-1}\\| = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}}",
          caption: "How much relative error can be amplified when solving $A\\mathbf{x}=\\mathbf{b}$",
        },
        {
          kind: "prose",
          text: "A relative perturbation of size $\\varepsilon$ in the data can produce one of size $\\kappa\\varepsilon$ in the solution. With double precision supplying about 16 digits, a matrix with $\\kappa = 10^{10}$ leaves roughly 6 — and $\\kappa = 10^{16}$ leaves none. This single number predicts whether a computation is trustworthy far better than the determinant does.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Conditioning is a property of the problem, not the algorithm",
          text: "No algorithm can solve an ill-conditioned system accurately — the sensitivity is in the matrix itself. A *stable* algorithm achieves accuracy proportional to $\\kappa$; an unstable one does worse. This is why forming $A^{\\top}A$ is criticised: it squares $\\kappa$, converting a hard-but-solvable problem into an unsolvable one, and no amount of care afterwards recovers the lost digits.",
        },
      ],
    },
    {
      heading: "Where each is used",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Spectral norm** — Lipschitz constants, gradient-explosion analysis in deep networks, and spectral normalisation in GANs, which divides weights by $\\sigma_1$ to control amplification.",
            "**Frobenius norm** — the objective in matrix least squares, PCA reconstruction error, and the natural loss for matrix completion.",
            "**Nuclear norm** — minimised in low-rank recovery, exactly as $\\ell_1$ is minimised for sparse vectors. It is the convex envelope of rank, which is what makes the problem tractable.",
            "**Unitary invariance.** All three are unchanged by orthogonal transformations, $\\|QAZ\\| = \\|A\\|$ — which is why they are expressible in singular values, and why Eckart–Young holds for spectral and Frobenius simultaneously.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 3, 12" },
    { source: "Horn & Johnson, Matrix Analysis", locator: "Ch. 5" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§A.1.5" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-08-svd-and-applications.md" },
  ],
};
