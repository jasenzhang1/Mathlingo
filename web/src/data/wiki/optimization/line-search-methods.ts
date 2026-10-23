import type { WikiArticle } from "../types";

export const lineSearchMethodsWiki: WikiArticle = {
  conceptId: "line-search-methods",

  summary:
    "A line search method picks a descent direction $\\mathbf{p}_k$ and then decides how far to move along it. " +
    "Minimising exactly along the line is rarely worth the cost; instead, practical methods accept any step that " +
    "decreases $f$ *enough* (the Armijo condition) and isn't uselessly short (the curvature condition). Together these " +
    "are the Wolfe conditions, and they are what make gradient, Newton and quasi-Newton methods globally convergent.",

  sections: [
    {
      heading: "Descent directions",
      blocks: [
        {
          kind: "prose",
          text:
            "A direction $\\mathbf{p}$ is a **descent direction** at $\\mathbf{x}$ if $\\nabla f(\\mathbf{x})^{\\top}\\mathbf{p} < 0$: for small " +
            "enough $\\alpha > 0$, $f(\\mathbf{x} + \\alpha\\mathbf{p}) < f(\\mathbf{x})$. The steepest descent direction " +
            "$-\\nabla f$, the Newton direction (when the Hessian is positive definite) and quasi-Newton directions all " +
            "qualify. The line search then studies the one-dimensional function $\\phi(\\alpha) = f(\\mathbf{x}_k + \\alpha\\mathbf{p}_k)$, " +
            "whose slope at $0$ is $\\phi'(0) = \\nabla f(\\mathbf{x}_k)^{\\top}\\mathbf{p}_k < 0$.",
        },
      ],
    },

    {
      heading: "The Wolfe conditions",
      blocks: [
        {
          kind: "formula",
          latex: "f(\\mathbf{x}_k + \\alpha\\mathbf{p}_k) \\le f(\\mathbf{x}_k) + c_1\\alpha\\,\\nabla f(\\mathbf{x}_k)^{\\top}\\mathbf{p}_k",
          caption: "Sufficient decrease (Armijo), with $0 < c_1 < 1$, typically $c_1 = 10^{-4}$",
        },
        {
          kind: "formula",
          latex: "\\nabla f(\\mathbf{x}_k + \\alpha\\mathbf{p}_k)^{\\top}\\mathbf{p}_k \\ge c_2\\,\\nabla f(\\mathbf{x}_k)^{\\top}\\mathbf{p}_k",
          caption: "Curvature condition, with $c_1 < c_2 < 1$ ($c_2 = 0.9$ for Newton/quasi-Newton, $0.1$ for conjugate gradients)",
        },
        {
          kind: "prose",
          text:
            "Armijo asks the actual decrease to be at least a fraction $c_1$ of what the tangent line predicts; it rules " +
            "out steps that are too long. The curvature condition asks the slope to have flattened enough; it rules out " +
            "steps that are too short. The **strong Wolfe** conditions replace the curvature condition with " +
            "$|\\phi'(\\alpha)| \\le c_2|\\phi'(0)|$, which also forbids landing where the slope is steeply positive.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why quasi-Newton needs the curvature condition",
          text:
            "The curvature condition guarantees $\\mathbf{s}_k^{\\top}\\mathbf{y}_k > 0$, where $\\mathbf{s}_k$ is the step and $\\mathbf{y}_k$ the " +
            "change in gradient. That positivity is exactly what keeps BFGS's Hessian approximation positive definite.",
        },
      ],
    },

    {
      heading: "Backtracking",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Start from an initial guess, $\\alpha = 1$ for Newton-type methods.",
            "While the Armijo condition fails, shrink: $\\alpha \\leftarrow \\rho\\alpha$ with $\\rho \\in (0, 1)$, e.g. $\\rho = 0.5$.",
            "Accept the first $\\alpha$ that passes.",
          ],
        },
        {
          kind: "prose",
          text:
            "Backtracking checks only sufficient decrease. Starting from a reasonable $\\alpha$ and shrinking by a " +
            "constant factor means the accepted step can't be absurdly short, so it is enough for Newton's method and " +
            "gradient descent. Quasi-Newton codes use a bracketing-and-zoom search that enforces the full Wolfe conditions.",
        },
        {
          kind: "example",
          title: "Backtracking on a parabola",
          problem: "Minimise $f(x) = x^{2}$ from $x = 1$ along the steepest descent direction, with $c_1 = 0.1$ and $\\rho = 0.5$, starting from $\\alpha = 1$.",
          steps: [
            "$f'(1) = 2$, so $p = -2$ and $\\phi'(0) = f'(1)p = -4$.",
            "$\\alpha = 1$: $x + \\alpha p = -1$ and $f = 1$, but Armijo needs $f \\le 1 + 0.1(1)(-4) = 0.6$. Reject.",
            "$\\alpha = 0.5$: $x + \\alpha p = 0$ and $f = 0 \\le 1 + 0.1(0.5)(-4) = 0.8$. Accept.",
          ],
          answer: "The accepted step $\\alpha = 0.5$ lands exactly on the minimiser $x = 0$.",
        },
      ],
    },

    {
      heading: "Global convergence",
      blocks: [
        {
          kind: "prose",
          text:
            "**Zoutendijk's theorem** says: if $f$ is bounded below with a Lipschitz gradient, and every step satisfies " +
            "the Wolfe conditions, then $\\sum_k \\cos^{2}\\theta_k\\,\\|\\nabla f(\\mathbf{x}_k)\\|^{2} < \\infty$, where $\\theta_k$ is " +
            "the angle between $\\mathbf{p}_k$ and $-\\nabla f(\\mathbf{x}_k)$. So as long as directions stay bounded away " +
            "from orthogonal to the gradient, $\\|\\nabla f(\\mathbf{x}_k)\\| \\to 0$ from any starting point.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A constant step is not a line search",
          text:
            "Fixed step sizes work when you know a Lipschitz constant (step $\\frac{1}{L}$ for gradient descent), but a " +
            "step too large for the local curvature can make $f$ increase or diverge. A line search adapts to the " +
            "curvature actually encountered.",
        },
      ],
    },
  ],

  references: [
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 3, Line Search Methods (§3.1 Step length, §3.2 Convergence of line search methods, §3.5 Step-length selection algorithms)" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§9.2, Descent methods (backtracking line search)" },
  ],
};
