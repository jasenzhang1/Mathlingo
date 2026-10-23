import type { WikiArticle } from "../types";

export const newtonMethodOptimizationWiki: WikiArticle = {
  conceptId: "newton-method-optimization",

  summary:
    "Newton's method for minimisation fits a quadratic model to $f$ at the current point — using the gradient and " +
    "the Hessian — and jumps to that model's minimiser. Equivalently, it is Newton–Raphson applied to the equation " +
    "$\\nabla f(\\mathbf{x}) = \\mathbf{0}$. Near a minimiser with a positive definite Hessian it converges " +
    "quadratically and is unaffected by bad scaling, but each step needs second derivatives and a linear solve, and " +
    "far from the solution it must be safeguarded.",

  sections: [
    {
      heading: "The Newton step",
      blocks: [
        {
          kind: "formula",
          latex: "\\nabla^{2} f(\\mathbf{x}_k)\\,\\mathbf{p}_k = -\\nabla f(\\mathbf{x}_k), \\qquad \\mathbf{x}_{k+1} = \\mathbf{x}_k + \\alpha_k\\mathbf{p}_k",
          caption: "$\\alpha_k = 1$ is the pure Newton step; a line search chooses $\\alpha_k \\le 1$ far from the solution",
        },
        {
          kind: "prose",
          text:
            "The quadratic model is $m(\\mathbf{p}) = f(\\mathbf{x}_k) + \\nabla f(\\mathbf{x}_k)^{\\top}\\mathbf{p} + \\tfrac{1}{2}\\mathbf{p}^{\\top}\\nabla^{2} f(\\mathbf{x}_k)\\mathbf{p}$. " +
            "Setting its gradient to zero gives the Newton equations above. In one dimension the step is simply " +
            "$x_{k+1} = x_k - \\frac{f'(x_k)}{f''(x_k)}$. On a strictly convex quadratic, the model is exact, so a single " +
            "Newton step lands on the minimiser from anywhere.",
        },
        {
          kind: "example",
          title: "A one-dimensional minimisation",
          problem: "Minimise $f(x) = x - \\ln x$ on $x > 0$ by Newton's method from $x_0 = 0.5$.",
          steps: [
            "$f'(x) = 1 - \\frac{1}{x}$ and $f''(x) = \\frac{1}{x^{2}}$, so $x_{k+1} = x_k - \\left(1 - \\frac{1}{x_k}\\right)x_k^{2} = 2x_k - x_k^{2}$.",
            "$x_1 = 1 - 0.25 = 0.75$, $x_2 = 1.5 - 0.5625 = 0.9375$, $x_3 = 0.99609$, $x_4 = 0.999985$.",
            "The error $1 - x_k$ goes $0.5, 0.25, 0.0625, 0.0039, 0.000015$: exactly squared each step.",
          ],
          answer: "The minimiser is $x^{*} = 1$ (where $f' = 0$ and $f'' = 1 > 0$), reached to five digits in four steps.",
        },
      ],
    },

    {
      heading: "Strengths",
      blocks: [
        {
          kind: "list",
          items: [
            "**Quadratic local convergence** when $\\nabla^{2} f(\\mathbf{x}^{*}) \\succ 0$ and the Hessian is Lipschitz.",
            "**Affine invariance**: changing variables $\\mathbf{x} = A\\mathbf{y}$ doesn't change the iterates (mapped back). Gradient descent, by contrast, is badly hurt by poor scaling.",
            "**A natural stopping test**: the Newton decrement $\\lambda(\\mathbf{x})^{2} = \\nabla f^{\\top}(\\nabla^{2} f)^{-1}\\nabla f$ estimates $2(f(\\mathbf{x}) - f^{*})$ near the solution.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two phases",
          text:
            "With a backtracking line search on a strongly convex function, damped Newton runs in two phases: a " +
            "*damped* phase where steps are shortened and $f$ falls by at least a fixed amount per step, then a " +
            "*quadratically convergent* phase where full steps are accepted. The second phase typically needs only a " +
            "handful of iterations — which is why interior-point methods, built on Newton steps, need so few.",
        },
      ],
    },

    {
      heading: "Weaknesses and fixes",
      blocks: [
        {
          kind: "table",
          headers: ["Problem", "Remedy"],
          rows: [
            ["Hessian not positive definite (non-convex region): $\\mathbf{p}_k$ may point uphill or toward a saddle", "Modify the Hessian (add $\\tau I$, or modified Cholesky) or use a trust region"],
            ["Full step overshoots far from the solution", "Backtracking line search on $\\alpha_k$ (damped Newton)"],
            ["Forming and factoring $\\nabla^{2} f$ costs $O(n^{2})$ memory and $O(n^{3})$ time", "Quasi-Newton (BFGS, L-BFGS) or inexact Newton with conjugate gradients"],
            ["Second derivatives unavailable", "Finite differences, automatic differentiation or quasi-Newton updates"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Newton is attracted to any stationary point",
          text:
            "The pure Newton iteration solves $\\nabla f = \\mathbf{0}$, so it is equally happy to converge to a maximum or a " +
            "saddle. On $f(x) = x^{3}$ from $x_0 = 1$ it heads for the inflection point at $0$. Descent safeguards — " +
            "checking $\\nabla f^{\\top}\\mathbf{p} < 0$ and that $f$ actually decreases — are what make it a minimisation method.",
        },
      ],
    },
  ],

  references: [
    { source: "Nocedal & Wright, Numerical Optimization", locator: "§3.3, Newton's method with Hessian modification; §2.2, Overview of algorithms" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§9.5, Newton's method" },
  ],
};
