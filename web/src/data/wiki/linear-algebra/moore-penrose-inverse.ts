import type { WikiArticle } from "../types";

export const moorePenroseInverse: WikiArticle = {
  conceptId: "moore-penrose-inverse",
  summary:
    "The pseudoinverse $A^{+}$ extends matrix inversion to every matrix — rectangular, rank-deficient, or singular. It returns the least-squares solution when the system has none, and the minimum-norm solution when it has many, reducing to $A^{-1}$ exactly when that exists.",
  sections: [
    {
      heading: "Definition via the SVD",
      blocks: [
        {
          kind: "formula",
          latex: "A = U\\Sigma V^{\\top} \\ \\Longrightarrow \\ A^{+} = V\\Sigma^{+}U^{\\top}",
          caption: "$\\Sigma^{+}$ inverts each non-zero singular value and transposes the shape",
        },
        {
          kind: "prose",
          text: "The construction is exactly as constrained as it can be: invert what is invertible, leave alone what is not. Directions with $\\sigma_k > 0$ get $1/\\sigma_k$; directions the matrix destroyed get zero, since there is nothing to undo.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What $A^{+}$ returns in each case",
          text: "For an *overdetermined* inconsistent system, $A^{+}\\mathbf{b}$ is the least-squares solution — the $\\mathbf{x}$ minimising $\\|A\\mathbf{x}-\\mathbf{b}\\|$. For an *underdetermined* system with infinitely many solutions, it returns the one of smallest norm. When both apply, it gives the minimum-norm least-squares solution, which is unique even when neither condition alone determines an answer.",
        },
      ],
    },
    {
      heading: "Special cases",
      blocks: [
        {
          kind: "table",
          headers: ["Situation", "$A^{+}$ equals", "Interpretation"],
          rows: [
            ["$A$ square, invertible", "$A^{-1}$", "the pseudoinverse generalises, not replaces"],
            ["Full column rank", "$(A^{\\top}A)^{-1}A^{\\top}$", "the least-squares formula"],
            ["Full row rank", "$A^{\\top}(AA^{\\top})^{-1}$", "the minimum-norm formula"],
            ["Rank deficient", "only via the SVD", "neither product is invertible"],
          ],
        },
        {
          kind: "prose",
          text: "The full-column-rank row is worth recognising: $(A^{\\top}A)^{-1}A^{\\top}$ is the ordinary least squares estimator. So OLS is the pseudoinverse in the case where predictors are independent — and when they are not, the pseudoinverse still returns an answer while OLS breaks down.",
        },
      ],
    },
    {
      heading: "Minimum norm, and why it is the sensible default",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{x}^{+} = A^{+}\\mathbf{b} \\in C(A^{\\top}), \\qquad \\text{all solutions} = \\mathbf{x}^{+} + N(A)",
          caption: "The pseudoinverse solution lies in the row space, with no null space component",
        },
        {
          kind: "prose",
          text: "Adding any null space vector gives another exact solution but strictly increases the norm, by Pythagoras — the added component is orthogonal to the row space. So the pseudoinverse's answer is the unique one with nothing wasted, and it is a continuous function of $\\mathbf{b}$ where an arbitrary choice among solutions would not be.",
        },
        {
          kind: "example",
          title: "An underdetermined system",
          problem: "Solve $x_1 + x_2 = 2$ for the minimum-norm solution.",
          steps: [
            "$A = [1 \\ \\ 1]$, a $1\\times2$ matrix of full row rank.",
            "$AA^{\\top} = 2$, so $A^{+} = A^{\\top}(AA^{\\top})^{-1} = \\tfrac{1}{2}(1,1)^{\\top}$.",
            "$\\mathbf{x}^{+} = A^{+}\\cdot 2 = (1,1)$.",
            "Every $(1+t,\\ 1-t)$ solves the equation; its norm is $\\sqrt{2 + 2t^{2}}$, minimised at $t = 0$. ✓",
          ],
          answer:
            "$(1,1)$ — the point on the solution line closest to the origin, which is the perpendicular foot.",
        },
      ],
    },
    {
      heading: "Practical cautions",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Tiny singular values must be truncated, not inverted",
          text: "Inverting $\\sigma = 10^{-16}$ produces $10^{16}$, amplifying whatever noise sits in that direction into a dominant, meaningless component. Every implementation therefore treats singular values below a tolerance as zero. That tolerance is a modelling choice, not a detail — set it too low and noise is amplified, too high and real signal is discarded. This *truncated* SVD is regularisation by another name, closely related to ridge regression, which shrinks rather than truncates.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**The four Penrose conditions** — $AA^{+}A = A$, $A^{+}AA^{+} = A^{+}$, and both $AA^{+}$ and $A^{+}A$ symmetric — characterise $A^{+}$ uniquely, and are how it is defined without reference to the SVD.",
            "$AA^{+}$ and $A^{+}A$ are the orthogonal projections onto $C(A)$ and $C(A^{\\top})$ respectively.",
            "$(A^{+})^{+} = A$, but **$(AB)^{+} \\ne B^{+}A^{+}$** in general — the reversal rule for inverses does not survive.",
            "**Use `lstsq`, not `pinv(A) @ b`.** Forming the pseudoinverse explicitly is more expensive and less accurate than solving directly, for the same reason as with ordinary inverses.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§7.4" },
    { source: "Golub & Van Loan, Matrix Computations", locator: "§5.5" },
    { source: "Penrose, 'A generalized inverse for matrices'", locator: "Math. Proc. Camb. Phil. Soc. 51(3), 1955" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-08-svd-and-applications.md" },
  ],
};
