import type { WikiArticle } from "../types";

export const qrDecomposition: WikiArticle = {
  conceptId: "qr-decomposition",
  summary:
    "QR factors a matrix into an orthogonal $\\mathbf{Q}$ and an upper triangular $\\mathbf{R}$. It is the numerically sound way to solve least squares, because it never forms $\\mathbf{A}^{\\top}\\mathbf{A}$ — and forming that product squares the condition number, destroying half the available precision.",
  sections: [
    {
      heading: "The factorisation",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{A} = \\mathbf{Q}\\mathbf{R}, \\qquad \\mathbf{Q}^{\\top}\\mathbf{Q} = \\mathbf{I}, \\qquad \\mathbf{R} \\text{ upper triangular}",
          caption: "For $\\mathbf{A} \\in \\mathbb{R}^{m\\times n}$ with $m \\ge n$ and independent columns",
        },
        {
          kind: "prose",
          text: "$\\mathbf{Q}$'s columns are an orthonormal basis for the column space of $\\mathbf{A}$, built in the same order. $\\mathbf{R}$ records how each original column is expressed in that basis — upper triangular because column $k$ of $\\mathbf{A}$ involves only the first $k$ orthonormal vectors.",
        },
        {
          kind: "table",
          headers: ["Form", "Shapes", "When"],
          rows: [
            ["Reduced (thin)", "$\\mathbf{Q}$ is $m\\times n$, $\\mathbf{R}$ is $n\\times n$", "the usual choice for least squares"],
            ["Full", "$\\mathbf{Q}$ is $m\\times m$, $\\mathbf{R}$ is $m\\times n$", "when a basis for $N(\\mathbf{A}^{\\top})$ is also wanted"],
          ],
        },
      ],
    },
    {
      heading: "Why it matters for least squares",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{A}^{\\top}\\mathbf{A}\\boldsymbol{\\beta} = \\mathbf{A}^{\\top}\\mathbf{b} \\ \\longrightarrow \\ \\mathbf{R}\\boldsymbol{\\beta} = \\mathbf{Q}^{\\top}\\mathbf{b}",
          caption: "Substituting $\\mathbf{A} = \\mathbf{Q}\\mathbf{R}$ collapses the normal equations to a triangular solve",
        },
        {
          kind: "prose",
          text: "Substituting and using $\\mathbf{Q}^{\\top}\\mathbf{Q} = \\mathbf{I}$ turns $\\mathbf{R}^{\\top}\\mathbf{Q}^{\\top}\\mathbf{Q}\\mathbf{R}\\boldsymbol{\\beta} = \\mathbf{R}^{\\top}\\mathbf{Q}^{\\top}\\mathbf{b}$ into $\\mathbf{R}\\boldsymbol{\\beta} = \\mathbf{Q}^{\\top}\\mathbf{b}$, since $\\mathbf{R}^{\\top}$ cancels from both sides when $\\mathbf{A}$ has full column rank. Back-substitution then finishes it in $O(n^{2})$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The conditioning argument, concretely",
          text: "$\\kappa(\\mathbf{A}^{\\top}\\mathbf{A}) = \\kappa(\\mathbf{A})^{2}$. A matrix with $\\kappa(\\mathbf{A}) = 10^{8}$ — not unusual for a design matrix with correlated predictors — gives $\\kappa(\\mathbf{A}^{\\top}\\mathbf{A}) = 10^{16}$, which exhausts double precision entirely. QR works with $\\kappa(\\mathbf{A})$ directly, so the same problem retains about eight digits. This is why every serious regression implementation uses QR (or SVD) rather than solving the normal equations literally.",
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
          text: "Householder is what LAPACK uses. Instead of building $\\mathbf{Q}$ column by column, it applies a sequence of reflections that zero out everything below each diagonal entry, and $\\mathbf{Q}$ emerges as the product of those reflections. Because each reflection is exactly orthogonal, errors do not accumulate the way they do in Gram–Schmidt.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "$\\mathbf{Q}$ is often never formed",
          text: "For least squares only $\\mathbf{Q}^{\\top}\\mathbf{b}$ is needed, and that can be computed by applying the stored reflections to $\\mathbf{b}$ directly — cheaper than assembling the $m\\times n$ matrix. This is why LAPACK returns the reflectors rather than $\\mathbf{Q}$ itself, and why extracting $\\mathbf{Q}$ explicitly is a separate call.",
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
            "Factor $\\mathbf{A} = \\begin{bmatrix} 1 & 1 \\\\ 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$.",
          steps: [
            "$\\mathbf{a}_1 = [1, 1, 0]$, $\\|\\mathbf{a}_1\\| = \\sqrt2$, so $\\mathbf{q}_1 = \\tfrac{1}{\\sqrt2}(1,1,0)$ and $\\mathbf{R}_{11} = \\sqrt2$.",
            "$\\mathbf{R}_{12} = \\mathbf{a}_2\\cdot\\mathbf{q}_1 = (1+0+0)/\\sqrt2 = 1/\\sqrt2$.",
            "$\\mathbf{w} = [1, 0, 1] - \\tfrac{1}{\\sqrt2}\\mathbf{q}_1 = [0.5, -0.5, 1]$, with $\\|\\mathbf{w}\\| = \\sqrt{1.5}$.",
            "$\\mathbf{q}_2 = \\tfrac{1}{\\sqrt{1.5}}(0.5,-0.5,1)$ and $\\mathbf{R}_{22} = \\sqrt{1.5}$.",
          ],
          answer:
            "$\\mathbf{R} = \\begin{bmatrix} \\sqrt2 & 1/\\sqrt2 \\\\ 0 & \\sqrt{1.5}\\end{bmatrix}$, with $\\mathbf{Q}$ holding $\\mathbf{q}_1,\\mathbf{q}_2$.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**The QR algorithm** for eigenvalues repeatedly factors and re-multiplies as $\\mathbf{A}_{k+1} = \\mathbf{R}_k\\mathbf{Q}_k$; the iterates converge to triangular form, revealing the eigenvalues. This is how eigenvalues are actually computed — not by root-finding on the characteristic polynomial.",
            "**Rank-revealing QR** with column pivoting detects numerical rank more cheaply than an SVD.",
            "**Updating.** Adding or removing a row of $\\mathbf{A}$ updates $\\mathbf{Q}\\mathbf{R}$ in $O(mn)$ rather than refactoring — useful for online and sliding-window regression.",
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
