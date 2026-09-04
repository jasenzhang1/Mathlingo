import type { WikiArticle } from "../types";

export const qrDecomposition: WikiArticle = {
  conceptId: "qr-decomposition",
  summary:
    "QR factors a matrix into an orthogonal $Q$ and an upper triangular $R$. It is the numerically sound way to solve least squares, because it never forms $A^{\\top}A$ — and forming that product squares the condition number, destroying half the available precision.",
  sections: [
    {
      heading: "The factorisation",
      blocks: [
        {
          kind: "formula",
          latex: "A = QR, \\qquad Q^{\\top}Q = I, \\qquad R \\text{ upper triangular}",
          caption: "For $A \\in \\mathbb{R}^{m\\times n}$ with $m \\ge n$ and independent columns",
        },
        {
          kind: "prose",
          text: "$Q$'s columns are an orthonormal basis for the column space of $A$, built in the same order. $R$ records how each original column is expressed in that basis — upper triangular because column $k$ of $A$ involves only the first $k$ orthonormal vectors.",
        },
        {
          kind: "table",
          headers: ["Form", "Shapes", "When"],
          rows: [
            ["Reduced (thin)", "$Q$ is $m\\times n$, $R$ is $n\\times n$", "the usual choice for least squares"],
            ["Full", "$Q$ is $m\\times m$, $R$ is $m\\times n$", "when a basis for $N(A^{\\top})$ is also wanted"],
          ],
        },
      ],
    },
    {
      heading: "Why it matters for least squares",
      blocks: [
        {
          kind: "formula",
          latex: "A^{\\top}A\\boldsymbol{\\beta} = A^{\\top}\\mathbf{b} \\ \\longrightarrow \\ R\\boldsymbol{\\beta} = Q^{\\top}\\mathbf{b}",
          caption: "Substituting $A = QR$ collapses the normal equations to a triangular solve",
        },
        {
          kind: "prose",
          text: "Substituting and using $Q^{\\top}Q = I$ turns $R^{\\top}Q^{\\top}QR\\boldsymbol{\\beta} = R^{\\top}Q^{\\top}\\mathbf{b}$ into $R\\boldsymbol{\\beta} = Q^{\\top}\\mathbf{b}$, since $R^{\\top}$ cancels from both sides when $A$ has full column rank. Back-substitution then finishes it in $O(n^{2})$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The conditioning argument, concretely",
          text: "$\\kappa(A^{\\top}A) = \\kappa(A)^{2}$. A matrix with $\\kappa(A) = 10^{8}$ — not unusual for a design matrix with correlated predictors — gives $\\kappa(A^{\\top}A) = 10^{16}$, which exhausts double precision entirely. QR works with $\\kappa(A)$ directly, so the same problem retains about eight digits. This is why every serious regression implementation uses QR (or SVD) rather than solving the normal equations literally.",
        },
      ],
    },
    {
      heading: "How it is computed",
      blocks: [
        {
          kind: "table",
          headers: ["Method", "Cost", "Stability"],
          rows: [
            ["Classical Gram–Schmidt", "$2mn^{2}$", "**poor** — orthogonality is lost"],
            ["Modified Gram–Schmidt", "$2mn^{2}$", "acceptable"],
            ["Householder reflections", "$2mn^{2} - \\tfrac{2}{3}n^{3}$", "**excellent** — the standard"],
            ["Givens rotations", "higher", "excellent; good for sparse or updating problems"],
          ],
        },
        {
          kind: "prose",
          text: "Householder is what LAPACK uses. Instead of building $Q$ column by column, it applies a sequence of reflections that zero out everything below each diagonal entry, and $Q$ emerges as the product of those reflections. Because each reflection is exactly orthogonal, errors do not accumulate the way they do in Gram–Schmidt.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "$Q$ is often never formed",
          text: "For least squares only $Q^{\\top}\\mathbf{b}$ is needed, and that can be computed by applying the stored reflections to $\\mathbf{b}$ directly — cheaper than assembling the $m\\times n$ matrix. This is why LAPACK returns the reflectors rather than $Q$ itself, and why extracting $Q$ explicitly is a separate call.",
        },
      ],
    },
    {
      heading: "Other uses",
      blocks: [
        {
          kind: "example",
          title: "A small QR",
          problem:
            "Factor $A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$.",
          steps: [
            "$\\mathbf{a}_1 = (1,1,0)$, $\\|\\mathbf{a}_1\\| = \\sqrt2$, so $\\mathbf{q}_1 = \\tfrac{1}{\\sqrt2}(1,1,0)$ and $R_{11} = \\sqrt2$.",
            "$R_{12} = \\mathbf{a}_2\\cdot\\mathbf{q}_1 = (1+0+0)/\\sqrt2 = 1/\\sqrt2$.",
            "$\\mathbf{w} = (1,0,1) - \\tfrac{1}{\\sqrt2}\\mathbf{q}_1 = (0.5,-0.5,1)$, with $\\|\\mathbf{w}\\| = \\sqrt{1.5}$.",
            "$\\mathbf{q}_2 = \\tfrac{1}{\\sqrt{1.5}}(0.5,-0.5,1)$ and $R_{22} = \\sqrt{1.5}$.",
          ],
          answer:
            "$R = \\begin{bmatrix} \\sqrt2 & 1/\\sqrt2 \\\\ 0 & \\sqrt{1.5}\\end{bmatrix}$, with $Q$ holding $\\mathbf{q}_1,\\mathbf{q}_2$.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**The QR algorithm** for eigenvalues repeatedly factors and re-multiplies as $A_{k+1} = R_kQ_k$; the iterates converge to triangular form, revealing the eigenvalues. This is how eigenvalues are actually computed — not by root-finding on the characteristic polynomial.",
            "**Rank-revealing QR** with column pivoting detects numerical rank more cheaply than an SVD.",
            "**Updating.** Adding or removing a row of $A$ updates $QR$ in $O(mn)$ rather than refactoring — useful for online and sliding-window regression.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 7–11, 28–29" },
    { source: "Strang, Introduction to Linear Algebra", locator: "§4.4" },
    { source: "Golub & Van Loan, Matrix Computations", locator: "Ch. 5" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-05-rank-and-orthogonalization.md" },
  ],
};
