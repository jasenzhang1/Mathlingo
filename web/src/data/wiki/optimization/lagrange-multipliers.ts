import type { WikiArticle } from "../types";

export const lagrangeMultipliersWiki: WikiArticle = {
  conceptId: "lagrange-multipliers",

  summary:
    "To minimise $f(\\mathbf{x})$ subject to equality constraints $h_j(\\mathbf{x}) = 0$, Lagrange's insight is " +
    "geometric: at a constrained optimum you can't decrease $f$ while staying on the constraint surface, so " +
    "$\\nabla f$ must be perpendicular to that surface — a combination of the constraint gradients. The weights in that " +
    "combination, the Lagrange multipliers, turn out to measure how much the optimal value would change if the " +
    "constraints were relaxed.",

  sections: [
    {
      heading: "The condition",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\lambda}) = f(\\mathbf{x}) + \\sum_j \\lambda_j h_j(\\mathbf{x}), \\qquad \\nabla_{\\mathbf{x}}\\mathcal{L} = \\mathbf{0}, \\;\\; h_j(\\mathbf{x}) = 0",
          caption: "The Lagrangian and the first-order conditions: $n + m$ equations in $n + m$ unknowns",
        },
        {
          kind: "prose",
          text:
            "The stationarity condition reads $\\nabla f(\\mathbf{x}^{*}) = -\\sum_j\\lambda_j\\nabla h_j(\\mathbf{x}^{*})$. With one " +
            "constraint in two dimensions, it says the level curve of $f$ is tangent to the constraint curve. The " +
            "condition is necessary provided the constraint gradients are linearly independent at $\\mathbf{x}^{*}$ " +
            "(a *constraint qualification*); it is not sufficient — like $\\nabla f = \\mathbf{0}$, it also finds maxima and saddles.",
        },
        {
          kind: "example",
          title: "Closest point on a line",
          problem: "Minimise $x^{2} + y^{2}$ subject to $x + 2y = 5$.",
          steps: [
            "$\\mathcal{L} = x^{2} + y^{2} + \\lambda(x + 2y - 5)$.",
            "$\\partial_x\\mathcal{L} = 2x + \\lambda = 0$ and $\\partial_y\\mathcal{L} = 2y + 2\\lambda = 0$, so $x = -\\frac{\\lambda}{2}$ and $y = -\\lambda$.",
            "Substituting into the constraint: $-\\frac{\\lambda}{2} - 2\\lambda = 5$, so $\\lambda = -2$, giving $(x, y) = (1, 2)$.",
          ],
          answer: "The minimiser is $(1, 2)$ with value $5$ — the foot of the perpendicular from the origin to the line.",
        },
      ],
    },

    {
      heading: "What the multiplier means",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{d p^{*}(c)}{d c} = -\\lambda^{*} \\quad \\text{for the problem } \\min f(\\mathbf{x}) \\text{ s.t. } h(\\mathbf{x}) = c",
          caption: "With the sign convention $\\mathcal{L} = f + \\lambda(h - c)$, the multiplier is minus the sensitivity of the optimal value",
        },
        {
          kind: "example",
          title: "A fence and a shadow price",
          problem: "Maximise the area $xy$ of a rectangle with perimeter constraint $x + y = c$ (half-perimeter), at $c = 10$. Interpret the multiplier.",
          steps: [
            "Stationarity of $xy - \\lambda(x + y - c)$: $y = \\lambda$ and $x = \\lambda$, so $x = y = \\frac{c}{2} = 5$ and $\\lambda = 5$.",
            "The optimal area is $A^{*}(c) = \\frac{c^{2}}{4}$, so $\\frac{dA^{*}}{dc} = \\frac{c}{2} = 5$.",
          ],
          answer: "A $5 \\times 5$ square with area $25$; the multiplier $\\lambda = 5$ is the extra area gained per unit of extra half-perimeter.",
        },
        {
          kind: "prose",
          text:
            "In economics this is the *shadow price* of a resource. In statistics, the multiplier attached to a " +
            "constraint like $\\sum_i \\pi_i = 1$ in maximum-likelihood problems is what makes estimates like " +
            "$\\hat{\\pi}_i = \\frac{n_i}{n}$ fall out.",
        },
      ],
    },

    {
      heading: "Second-order check and beyond",
      blocks: [
        {
          kind: "prose",
          text:
            "To confirm a minimum, the Hessian of the Lagrangian must be positive definite on the tangent space of the " +
            "constraints — the directions $\\mathbf{d}$ with $\\nabla h_j(\\mathbf{x}^{*})^{\\top}\\mathbf{d} = 0$ — not on all of " +
            "$\\mathbb{R}^{n}$. (The bordered Hessian packages this test.) When $f$ is convex and the constraints are affine, " +
            "the first-order conditions are already sufficient.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Equality-constrained quadratic programs",
          text:
            "For $\\min\\frac{1}{2}\\mathbf{x}^{\\top}Q\\mathbf{x} + \\mathbf{c}^{\\top}\\mathbf{x}$ subject to $A\\mathbf{x} = \\mathbf{b}$, the " +
            "Lagrange conditions are one linear system, the KKT system $\\begin{bmatrix} Q & A^{\\top} \\\\ A & 0 \\end{bmatrix}\\begin{bmatrix} \\mathbf{x} \\\\ \\boldsymbol{\\lambda} \\end{bmatrix} = \\begin{bmatrix} -\\mathbf{c} \\\\ \\mathbf{b} \\end{bmatrix}$. " +
            "Newton's method for equality-constrained problems solves one such system per step.",
        },
        {
          kind: "prose",
          text:
            "Inequality constraints need more: a multiplier can only push one way, and inactive constraints shouldn't " +
            "matter at all. That extension is the KKT conditions.",
        },
      ],
    },
  ],

  references: [
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 12, Theory of Constrained Optimization (§12.1, Examples; §12.3, First-order optimality conditions)" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§5.1, The Lagrange dual function; §10.1, Equality constrained minimization" },
  ],
};
