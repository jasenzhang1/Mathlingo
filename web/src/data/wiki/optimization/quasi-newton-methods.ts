import type { WikiArticle } from "../types";

export const quasiNewtonMethodsWiki: WikiArticle = {
  conceptId: "quasi-newton-methods",

  summary:
    "Quasi-Newton methods keep most of Newton's speed without computing second derivatives. They maintain an " +
    "approximation $B_k$ to the Hessian (or $H_k$ to its inverse) and update it after every step using only the change " +
    "in gradient, so that it satisfies the secant condition. BFGS is the most successful such update; its " +
    "limited-memory form, L-BFGS, stores just a few recent vector pairs and is the default method for large smooth " +
    "unconstrained problems.",

  sections: [
    {
      heading: "The secant condition",
      blocks: [
        {
          kind: "formula",
          latex: "B_{k+1}\\mathbf{s}_k = \\mathbf{y}_k, \\qquad \\mathbf{s}_k = \\mathbf{x}_{k+1} - \\mathbf{x}_k, \\quad \\mathbf{y}_k = \\nabla f(\\mathbf{x}_{k+1}) - \\nabla f(\\mathbf{x}_k)",
          caption: "The new approximation must reproduce the observed change in gradient along the last step",
        },
        {
          kind: "prose",
          text:
            "By Taylor's theorem, $\\mathbf{y}_k \\approx \\nabla^{2} f\\,\\mathbf{s}_k$, so the condition asks $B_{k+1}$ to act like the true " +
            "Hessian in the direction just explored. In one dimension it determines $B_{k+1} = \\frac{y_k}{s_k}$ — the " +
            "secant slope of $f'$ — and the method reduces to the secant method applied to $f' = 0$. In $n$ dimensions " +
            "it leaves many choices; each quasi-Newton method picks the update closest to $B_k$ in some sense.",
        },
        {
          kind: "example",
          title: "Learning the curvature of a parabola",
          problem: "For $f(x) = x^{2}$, iterates $x_0 = 2$ and $x_1 = 1$ are known. Use the secant condition to estimate $f''$ and take a quasi-Newton step.",
          steps: [
            "$s_0 = 1 - 2 = -1$ and $y_0 = f'(1) - f'(2) = 2 - 4 = -2$.",
            "$B_1 = \\frac{y_0}{s_0} = 2$, which equals the true $f''$.",
            "$x_2 = x_1 - \\frac{f'(x_1)}{B_1} = 1 - \\frac{2}{2} = 0$.",
          ],
          answer: "$x_2 = 0$, the exact minimiser: on a quadratic, the secant estimate of curvature is exact.",
        },
      ],
    },

    {
      heading: "The BFGS update",
      blocks: [
        {
          kind: "formula",
          latex: "H_{k+1} = (I - \\rho_k\\mathbf{s}_k\\mathbf{y}_k^{\\top})\\,H_k\\,(I - \\rho_k\\mathbf{y}_k\\mathbf{s}_k^{\\top}) + \\rho_k\\mathbf{s}_k\\mathbf{s}_k^{\\top}, \\qquad \\rho_k = \\frac{1}{\\mathbf{y}_k^{\\top}\\mathbf{s}_k}",
          caption: "BFGS update of the inverse-Hessian approximation; the step is $\\mathbf{p}_k = -H_k\\nabla f(\\mathbf{x}_k)$",
        },
        {
          kind: "list",
          items: [
            "It is a rank-two update, so each iteration costs $O(n^{2})$ — no linear solve, since $H_k$ approximates the inverse directly.",
            "If $H_k \\succ 0$ and the **curvature condition** $\\mathbf{y}_k^{\\top}\\mathbf{s}_k > 0$ holds, then $H_{k+1} \\succ 0$, so every step is a descent direction. A Wolfe line search guarantees the curvature condition.",
            "Under standard assumptions BFGS converges **superlinearly**: $\\frac{\\|\\mathbf{x}_{k+1} - \\mathbf{x}^{*}\\|}{\\|\\mathbf{x}_k - \\mathbf{x}^{*}\\|} \\to 0$.",
            "A common start is $H_0 = \\gamma I$ with $\\gamma = \\frac{\\mathbf{s}^{\\top}\\mathbf{y}}{\\mathbf{y}^{\\top}\\mathbf{y}}$ after the first step, which gives the right scale.",
          ],
        },
        {
          kind: "table",
          headers: ["Update", "Notes"],
          rows: [
            ["BFGS", "Rank two, preserves positive definiteness, self-correcting; the standard choice"],
            ["DFP", "The dual of BFGS (roles of $B$ and $H$ swapped); historically first, less robust"],
            ["SR1", "Symmetric rank one; can approximate indefinite Hessians, useful with trust regions, but may break down"],
            ["Broyden", "Non-symmetric rank-one update for solving nonlinear systems $\\mathbf{F}(\\mathbf{x}) = \\mathbf{0}$"],
          ],
        },
      ],
    },

    {
      heading: "L-BFGS",
      blocks: [
        {
          kind: "prose",
          text:
            "Storing an $n \\times n$ matrix is impossible when $n$ is in the millions. L-BFGS never forms $H_k$: it keeps " +
            "only the last $m$ pairs $(\\mathbf{s}_i, \\mathbf{y}_i)$, typically $m$ between $5$ and $20$, and computes " +
            "$H_k\\nabla f$ with the **two-loop recursion** in $O(mn)$ operations. Memory drops from $n^{2}$ numbers to " +
            "$2mn$. Convergence is linear rather than superlinear in theory, but in practice it is often nearly as fast as " +
            "full BFGS.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where you meet it",
          text:
            "L-BFGS is the default solver for logistic regression in scikit-learn, for maximum-likelihood fitting in many " +
            "statistics packages, and for full-batch problems in scientific computing. For large stochastic problems " +
            "(deep learning), noisy gradients break the secant information, so first-order methods like Adam are used instead.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Skip bad pairs",
          text:
            "Without a Wolfe line search (or on non-convex $f$) a step can give $\\mathbf{y}^{\\top}\\mathbf{s} \\le 0$. Using that " +
            "pair would destroy positive definiteness, so implementations skip or damp the update (Powell damping).",
        },
      ],
    },
  ],

  references: [
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 6, Quasi-Newton Methods; §7.2, Limited-memory quasi-Newton methods" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§9.5 and Ch. 9 notes on quasi-Newton methods" },
  ],
};
