import type { WikiArticle } from "../types";

export const conjugateGradientMethodWiki: WikiArticle = {
  conceptId: "conjugate-gradient-method",

  summary:
    "The conjugate gradient (CG) method minimises a strictly convex quadratic $\\frac{1}{2}\\mathbf{x}^{\\top}A\\mathbf{x} - \\mathbf{b}^{\\top}\\mathbf{x}$ " +
    "— equivalently, solves $A\\mathbf{x} = \\mathbf{b}$ for symmetric positive definite $A$ — by searching along " +
    "directions that are mutually conjugate, $\\mathbf{p}_i^{\\top}A\\mathbf{p}_j = 0$. Each direction is minimised " +
    "over once and never needs revisiting, so in exact arithmetic CG finishes in at most $n$ steps, using only " +
    "matrix–vector products. It is the method of choice for large sparse systems.",

  sections: [
    {
      heading: "The algorithm",
      blocks: [
        {
          kind: "formula",
          latex:
            "\\alpha_k = \\frac{\\mathbf{r}_k^{\\top}\\mathbf{r}_k}{\\mathbf{p}_k^{\\top}A\\mathbf{p}_k}, \\quad \\mathbf{x}_{k+1} = \\mathbf{x}_k + \\alpha_k\\mathbf{p}_k, \\quad \\mathbf{r}_{k+1} = \\mathbf{r}_k - \\alpha_k A\\mathbf{p}_k, \\quad \\beta_k = \\frac{\\mathbf{r}_{k+1}^{\\top}\\mathbf{r}_{k+1}}{\\mathbf{r}_k^{\\top}\\mathbf{r}_k}, \\quad \\mathbf{p}_{k+1} = \\mathbf{r}_{k+1} + \\beta_k\\mathbf{p}_k",
          caption: "Start with $\\mathbf{r}_0 = \\mathbf{b} - A\\mathbf{x}_0$ (the negative gradient) and $\\mathbf{p}_0 = \\mathbf{r}_0$",
        },
        {
          kind: "prose",
          text:
            "Each iteration needs one product $A\\mathbf{p}_k$ and a few vector operations, so $A$ never has to be stored " +
            "as a dense matrix — only applied. The new direction is the residual made conjugate to the previous " +
            "direction, and a short recurrence makes it conjugate to *all* earlier ones automatically.",
        },
        {
          kind: "example",
          title: "A $2 \\times 2$ system in two steps",
          problem: "Solve $\\begin{bmatrix} 4 & 1 \\\\ 1 & 3 \\end{bmatrix}\\mathbf{x} = \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}$ by CG from $\\mathbf{x}_0 = \\mathbf{0}$.",
          steps: [
            "$\\mathbf{r}_0 = \\mathbf{p}_0 = (1, 2)$, $A\\mathbf{p}_0 = (6, 7)$, so $\\alpha_0 = \\frac{5}{20} = 0.25$ and $\\mathbf{x}_1 = (0.25, 0.5)$.",
            "$\\mathbf{r}_1 = (1, 2) - 0.25(6, 7) = (-0.5, 0.25)$ and $\\beta_0 = \\frac{0.3125}{5} = 0.0625$, so $\\mathbf{p}_1 = (-0.4375, 0.375)$.",
            "$A\\mathbf{p}_1 = (-1.375, 0.6875)$ and $\\mathbf{p}_1^{\\top}A\\mathbf{p}_1 = 0.859375$, so $\\alpha_1 = \\frac{0.3125}{0.859375} \\approx 0.3636$.",
            "$\\mathbf{x}_2 = (0.25, 0.5) + 0.3636(-0.4375, 0.375) = (0.0909, 0.6364)$.",
          ],
          answer: "$\\mathbf{x}_2 = \\left(\\frac{1}{11}, \\frac{7}{11}\\right)$, the exact solution, after $n = 2$ steps.",
        },
      ],
    },

    {
      heading: "Convergence",
      blocks: [
        {
          kind: "formula",
          latex: "\\|\\mathbf{x}_k - \\mathbf{x}^{*}\\|_A \\le 2\\left(\\frac{\\sqrt{\\kappa} - 1}{\\sqrt{\\kappa} + 1}\\right)^{k}\\|\\mathbf{x}_0 - \\mathbf{x}^{*}\\|_A",
          caption: "Error in the $A$-norm $\\|\\mathbf{e}\\|_A = \\sqrt{\\mathbf{e}^{\\top}A\\mathbf{e}}$, with $\\kappa$ the condition number of $A$",
        },
        {
          kind: "prose",
          text:
            "CG's iterate $\\mathbf{x}_k$ is the best point in the Krylov subspace $\\operatorname{span}\\{\\mathbf{r}_0, A\\mathbf{r}_0, \\ldots, A^{k-1}\\mathbf{r}_0\\}$ " +
            "(in the $A$-norm). That optimality gives the $\\sqrt{\\kappa}$ dependence — the same as accelerated gradient, " +
            "but with no parameters to tune. It also means that if $A$ has only $m$ distinct eigenvalues, CG converges in " +
            "at most $m$ steps; clustered eigenvalues make it fast.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Preconditioning",
          text:
            "Running CG on $M^{-1}A$ for a cheap approximation $M \\approx A$ (diagonal/Jacobi, incomplete Cholesky) " +
            "shrinks the effective condition number or clusters eigenvalues. A good preconditioner is usually the " +
            "difference between CG taking thousands of iterations and dozens.",
        },
      ],
    },

    {
      heading: "Beyond linear systems",
      blocks: [
        {
          kind: "list",
          items: [
            "**Nonlinear CG** (Fletcher–Reeves, Polak–Ribière) applies the same direction recurrence to general $f$, with a line search replacing the exact $\\alpha_k$ and periodic restarts.",
            "**Inexact (truncated) Newton** solves the Newton system $\\nabla^{2} f\\,\\mathbf{p} = -\\nabla f$ approximately with a few CG iterations, needing only Hessian–vector products.",
            "**Least squares**: CG on the normal equations (CGLS/LSQR) solves $\\min\\|A\\mathbf{x} - \\mathbf{b}\\|$ without forming $A^{\\top}A$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Finite precision",
          text:
            "In floating point, conjugacy is gradually lost, so CG may need more than $n$ iterations and is used as an " +
            "iterative method that stops on a small residual, not as a direct solver. It also requires $A$ to be " +
            "symmetric positive definite; for other systems use GMRES or MINRES.",
        },
      ],
    },
  ],

  references: [
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 5, Conjugate Gradient Methods" },
    { source: "Shewchuk, An Introduction to the Conjugate Gradient Method Without the Agonizing Pain", locator: "§§7–10" },
  ],
};
