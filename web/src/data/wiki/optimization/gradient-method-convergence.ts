import type { WikiArticle } from "../types";

export const gradientMethodConvergenceWiki: WikiArticle = {
  conceptId: "gradient-method-convergence",

  summary:
    "Gradient descent steps along the negative gradient, $\\mathbf{x}_{k+1} = \\mathbf{x}_k - \\alpha\\nabla f(\\mathbf{x}_k)$. " +
    "How well that works is governed by two numbers: the smoothness constant $L$, which sets a safe step size, and " +
    "the strong convexity constant $\\mu$. For smooth convex functions the error in $f$ falls like $\\frac{1}{k}$; " +
    "with strong convexity it falls geometrically, at a rate set by the condition number $\\kappa = \\frac{L}{\\mu}$.",

  sections: [
    {
      heading: "The descent lemma and the step size",
      blocks: [
        {
          kind: "formula",
          latex: "f(\\mathbf{y}) \\le f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^{\\top}(\\mathbf{y} - \\mathbf{x}) + \\frac{L}{2}\\|\\mathbf{y} - \\mathbf{x}\\|^{2}",
          caption: "Holds for any $L$-smooth $f$ (gradient Lipschitz with constant $L$)",
        },
        {
          kind: "prose",
          text:
            "Plugging in a gradient step $\\mathbf{y} = \\mathbf{x} - \\alpha\\nabla f(\\mathbf{x})$ gives " +
            "$f(\\mathbf{y}) \\le f(\\mathbf{x}) - \\alpha\\left(1 - \\tfrac{L\\alpha}{2}\\right)\\|\\nabla f(\\mathbf{x})\\|^{2}$. Any step " +
            "$0 < \\alpha < \\frac{2}{L}$ decreases $f$, and $\\alpha = \\frac{1}{L}$ maximises the guaranteed decrease, " +
            "$\\frac{1}{2L}\\|\\nabla f(\\mathbf{x})\\|^{2}$. When $L$ is unknown, backtracking finds a suitable step automatically.",
        },
      ],
    },

    {
      heading: "Convergence rates",
      blocks: [
        {
          kind: "table",
          headers: ["Assumptions", "Step", "Guarantee"],
          rows: [
            ["$L$-smooth, non-convex", "$\\frac{1}{L}$", "$\\min_{i < k}\\|\\nabla f(\\mathbf{x}_i)\\|^{2} \\le \\frac{2L(f(\\mathbf{x}_0) - f^{*})}{k}$"],
            ["$L$-smooth, convex", "$\\frac{1}{L}$", "$f(\\mathbf{x}_k) - f^{*} \\le \\frac{L\\|\\mathbf{x}_0 - \\mathbf{x}^{*}\\|^{2}}{2k}$ (sublinear)"],
            ["$L$-smooth, $\\mu$-strongly convex", "$\\frac{1}{L}$", "$\\|\\mathbf{x}_k - \\mathbf{x}^{*}\\|^{2} \\le \\left(1 - \\frac{1}{\\kappa}\\right)^{k}\\|\\mathbf{x}_0 - \\mathbf{x}^{*}\\|^{2}$ (linear)"],
            ["Strongly convex quadratic", "$\\frac{2}{L + \\mu}$", "$\\|\\mathbf{x}_k - \\mathbf{x}^{*}\\| \\le \\left(\\frac{\\kappa - 1}{\\kappa + 1}\\right)^{k}\\|\\mathbf{x}_0 - \\mathbf{x}^{*}\\|$"],
          ],
        },
        {
          kind: "prose",
          text:
            "Linear convergence with factor $1 - \\frac{1}{\\kappa}$ means reaching accuracy $\\varepsilon$ takes about " +
            "$\\kappa\\ln\\frac{1}{\\varepsilon}$ iterations. Doubling the condition number roughly doubles the work. The " +
            "sublinear $\\frac{1}{k}$ rate is much worse: halving the error needs twice as many iterations.",
        },
        {
          kind: "example",
          title: "An ill-conditioned quadratic",
          problem: "Gradient descent on $f(x, y) = \\frac{1}{2}(x^{2} + 10y^{2})$ with step $\\frac{1}{L}$. How fast does the $x$-error shrink, and how many steps reduce it by $10^{6}$?",
          steps: [
            "The Hessian is $\\operatorname{diag}(1, 10)$, so $\\mu = 1$, $L = 10$ and $\\kappa = 10$.",
            "With $\\alpha = \\frac{1}{10}$: $x_{k+1} = x_k - 0.1x_k = 0.9x_k$ and $y_{k+1} = y_k - y_k = 0$.",
            "The slow direction shrinks by $0.9$ per step, so we need $0.9^{k} \\le 10^{-6}$, i.e. $k \\ge \\frac{6\\ln 10}{-\\ln 0.9} \\approx 131.1$.",
          ],
          answer: "The $y$-error vanishes in one step but the $x$-error needs $132$ steps: the flat direction (smallest eigenvalue) limits the method.",
        },
      ],
    },

    {
      heading: "Why it zig-zags, and what helps",
      blocks: [
        {
          kind: "prose",
          text:
            "In a narrow valley the gradient is dominated by the steep direction. A step large enough to make progress " +
            "along the valley floor overshoots across it, so iterates bounce between the walls. With exact line search on " +
            "a quadratic, successive gradients are orthogonal — the classic zig-zag picture.",
        },
        {
          kind: "list",
          items: [
            "**Preconditioning**: change variables (or scale the gradient by $P^{-1}$) so the problem looks round, reducing $\\kappa$.",
            "**Momentum and acceleration**: reduce the dependence from $\\kappa$ to $\\sqrt{\\kappa}$.",
            "**Conjugate gradients**: for quadratics, avoid revisiting directions altogether.",
            "**Newton and quasi-Newton**: use curvature to remove the dependence on $\\kappa$ near the solution.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Lower bounds",
          text:
            "No method that only combines gradients can beat $O\\!\\left(\\frac{1}{k^{2}}\\right)$ on smooth convex problems or a " +
            "factor $1 - \\frac{c}{\\sqrt{\\kappa}}$ per step on strongly convex ones (Nemirovski–Yudin, Nesterov). Gradient " +
            "descent falls short of both bounds; Nesterov's accelerated method meets them.",
        },
      ],
    },
  ],

  references: [
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§9.3, Gradient descent method" },
    { source: "Nesterov, Lectures on Convex Optimization", locator: "§2.1, Minimization of smooth functions; §2.1.5, Gradient method" },
    { source: "Nocedal & Wright, Numerical Optimization", locator: "§3.3, Rate of convergence (steepest descent)" },
  ],
};
