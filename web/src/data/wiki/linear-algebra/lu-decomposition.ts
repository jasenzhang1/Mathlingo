import type { WikiArticle } from "../types";

export const luDecomposition: WikiArticle = {
  conceptId: "lu-decomposition",
  summary:
    "LU factors a square matrix into a lower and an upper triangular matrix — it is Gaussian elimination, with the steps recorded rather than discarded. Keeping them turns each additional right-hand side from an $O(n^{3})$ solve into an $O(n^{2})$ one, which is why it is the default for square systems.",
  sections: [
    {
      heading: "The factorisation",
      blocks: [
        {
          kind: "formula",
          latex: "PA = LU",
          caption: "$L$ unit lower triangular, $U$ upper triangular, $P$ a permutation for pivoting",
        },
        {
          kind: "prose",
          text: "$U$ is what elimination leaves behind. $L$ holds the multipliers used along the way — the number subtracted from each row, stored in the position it was used to zero out. Nothing is computed twice: the factorisation is elimination with bookkeeping.",
        },
        {
          kind: "formula",
          latex: "A\\mathbf{x} = \\mathbf{b} \\ \\longrightarrow \\ L\\mathbf{y} = P\\mathbf{b}, \\ \\text{ then } \\ U\\mathbf{x} = \\mathbf{y}",
          caption: "Forward substitution, then back substitution — two $O(n^{2})$ passes",
        },
      ],
    },
    {
      heading: "Why record the steps",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "The economics of repeated solves",
          text: "Factoring costs about $\\tfrac{2}{3}n^{3}$ operations; each subsequent solve costs $2n^{2}$. For $n = 1000$ that is roughly $7\\times10^{8}$ once, then $2\\times10^{6}$ per right-hand side — a factor of 300. Any setting with a fixed matrix and many right-hand sides (time-stepping a PDE, Newton iterations with a held Jacobian, computing many columns of an inverse) is exactly the case LU is designed for.",
        },
        {
          kind: "prose",
          text: "It also gives the determinant nearly free: $\\det A = \\pm\\prod_i u_{ii}$, with the sign from the number of row swaps in $P$. That is how determinants are computed in practice — cofactor expansion is $O(n!)$ and unusable.",
        },
      ],
    },
    {
      heading: "Pivoting",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Without pivoting, LU can fail or be wildly inaccurate",
          text: "A zero pivot stops elimination outright — $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$ has no LU factorisation without a row swap, despite being perfectly invertible. Worse is a *small* pivot: dividing by it produces enormous multipliers that amplify rounding error catastrophically. Partial pivoting swaps in the largest available entry at each step, bounding the multipliers by 1 and making the algorithm reliable in practice.",
        },
        {
          kind: "example",
          title: "Why a small pivot is dangerous",
          problem:
            "Solve $\\begin{bmatrix} 10^{-20} & 1 \\\\ 1 & 1\\end{bmatrix}\\mathbf{x} = \\begin{bmatrix}1\\\\2\\end{bmatrix}$ without pivoting, in floating point.",
          steps: [
            "Multiplier: $1/10^{-20} = 10^{20}$.",
            "Row 2 becomes $1 - 10^{20}$ in the second entry, and $2 - 10^{20}$ on the right.",
            "In double precision both round to $-10^{20}$ — the original $1$ and $2$ are lost entirely.",
            "Back-substitution then gives $x_2 = 1$ and $x_1 = 0$, whereas the true answer is close to $x_1 = x_2 = 1$.",
          ],
          answer:
            "A completely wrong $x_1$, from a well-conditioned system. Swapping the rows first makes the multiplier $10^{-20}$ and the answer accurate — the problem was the algorithm, not the matrix.",
        },
      ],
    },
    {
      heading: "Variants and limits",
      blocks: [
        {
          kind: "table",
          headers: ["Situation", "Factorisation", "Cost"],
          rows: [
            ["General square", "$PA = LU$", "$\\tfrac{2}{3}n^{3}$"],
            ["Symmetric positive definite", "$A = LL^{\\top}$ (Cholesky)", "$\\tfrac{1}{3}n^{3}$ — half"],
            ["Symmetric indefinite", "$A = LDL^{\\top}$", "$\\tfrac{1}{3}n^{3}$"],
            ["Rectangular / least squares", "QR instead", "$2mn^{2}$"],
            ["Banded or sparse", "sparse LU with reordering", "far less"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Fill-in is the sparse-matrix problem",
          text: "Elimination on a sparse matrix creates non-zeros where there were none, and a poor ordering can turn a matrix with $10^{6}$ non-zeros into factors with $10^{9}$. Reordering algorithms — approximate minimum degree, nested dissection — exist entirely to limit this, and choosing one is often the difference between a solve that fits in memory and one that does not.",
        },
        {
          kind: "prose",
          text: "LU is for square systems. For rectangular problems the right tool is QR, and for rank-deficient or badly conditioned ones it is the SVD. Attempting LU on a singular matrix produces a zero pivot, which is a detection mechanism rather than a solution.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§2.6" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 20–22" },
    { source: "Golub & Van Loan, Matrix Computations", locator: "Ch. 3" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-05-rank-and-orthogonalization.md" },
  ],
};
