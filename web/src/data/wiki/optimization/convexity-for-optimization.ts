import type { WikiArticle } from "../types";

export const convexityForOptimizationWiki: WikiArticle = {
  conceptId: "convexity-for-optimization",

  summary:
    "A function is convex when the chord between any two points on its graph lies on or above the graph. For " +
    "optimisation this is the single most useful property a problem can have: every local minimum of a convex " +
    "function over a convex set is a global minimum, and $\\nabla f(\\mathbf{x}^{*}) = \\mathbf{0}$ becomes a " +
    "certificate of optimality. Two quantitative refinements, smoothness and strong convexity, then control how " +
    "fast algorithms converge.",

  sections: [
    {
      heading: "Convex sets and convex functions",
      blocks: [
        {
          kind: "formula",
          latex: "f(\\theta\\mathbf{x} + (1 - \\theta)\\mathbf{y}) \\le \\theta f(\\mathbf{x}) + (1 - \\theta) f(\\mathbf{y}), \\quad \\theta \\in [0, 1]",
          caption: "Convexity of $f$ on a convex domain",
        },
        {
          kind: "definitions",
          items: [
            { term: "Convex set", description: "A set $C$ containing the whole segment between any two of its points. Half-spaces, balls, polyhedra and the set of positive semidefinite matrices are convex; a ring (annulus) is not." },
            { term: "First-order condition", description: "A differentiable $f$ is convex iff $f(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^{\\top}(\\mathbf{y} - \\mathbf{x})$ for all $\\mathbf{x}, \\mathbf{y}$: every tangent plane is a global under-estimator." },
            { term: "Second-order condition", description: "A twice-differentiable $f$ is convex iff $\\nabla^{2} f(\\mathbf{x}) \\succeq 0$ everywhere." },
          ],
        },
        {
          kind: "prose",
          text:
            "The first-order condition is why convexity matters: if $\\nabla f(\\mathbf{x}^{*}) = \\mathbf{0}$, it gives " +
            "$f(\\mathbf{y}) \\ge f(\\mathbf{x}^{*})$ for every $\\mathbf{y}$. A stationary point of a convex function is a " +
            "global minimiser, and the set of minimisers is itself convex.",
        },
      ],
    },

    {
      heading: "Recognising convexity",
      blocks: [
        {
          kind: "table",
          headers: ["Operation", "Preserves convexity?"],
          rows: [
            ["Nonnegative weighted sum $\\sum w_i f_i$, $w_i \\ge 0$", "Yes"],
            ["Composition with an affine map $f(A\\mathbf{x} + \\mathbf{b})$", "Yes"],
            ["Pointwise maximum $\\max_i f_i(\\mathbf{x})$", "Yes"],
            ["Product of two convex functions", "Not in general ($x \\cdot x^{2}$ is not convex on $\\mathbb{R}$)"],
            ["Intersection of convex sets", "Yes"],
            ["Union of convex sets", "No"],
          ],
        },
        {
          kind: "prose",
          text:
            "Standard building blocks: affine functions, $e^{ax}$, $|x|^{p}$ for $p \\ge 1$, $-\\ln x$ on $x > 0$, every norm, " +
            "and the quadratic $\\tfrac{1}{2}\\mathbf{x}^{\\top}Q\\mathbf{x}$ when $Q \\succeq 0$. So least squares " +
            "$\\|A\\mathbf{x} - \\mathbf{b}\\|^{2}$, logistic loss and the lasso penalty $\\lambda\\|\\mathbf{x}\\|_1$ are all convex.",
        },
        {
          kind: "example",
          title: "Checking a quadratic",
          problem: "Is $f(x, y) = 2x^{2} + 2xy + y^{2}$ convex? Is $g(x, y) = x^{2} + 4xy + y^{2}$?",
          steps: [
            "$\\nabla^{2} f = \\begin{bmatrix} 4 & 2 \\\\ 2 & 2 \\end{bmatrix}$: trace $6 > 0$ and determinant $8 - 4 = 4 > 0$, so it is positive definite.",
            "$\\nabla^{2} g = \\begin{bmatrix} 2 & 4 \\\\ 4 & 2 \\end{bmatrix}$: determinant $4 - 16 = -12 < 0$, so its eigenvalues ($6$ and $-2$) have opposite signs.",
          ],
          answer: "$f$ is (strictly) convex; $g$ is not — it is a saddle, decreasing along $(1, -1)$.",
        },
      ],
    },

    {
      heading: "Smoothness and strong convexity",
      blocks: [
        {
          kind: "formula",
          latex: "\\mu I \\preceq \\nabla^{2} f(\\mathbf{x}) \\preceq L I",
          caption: "$\\mu$-strong convexity (lower bound) and $L$-smoothness (upper bound), for twice-differentiable $f$",
        },
        {
          kind: "prose",
          text:
            "**$L$-smoothness** means the gradient is $L$-Lipschitz: $f$ curves upward no faster than the quadratic " +
            "$\\tfrac{L}{2}\\|\\mathbf{x}\\|^{2}$. It tells an algorithm how large a step is safe. **$\\mu$-strong convexity** " +
            "means $f$ curves upward at least as fast as $\\tfrac{\\mu}{2}\\|\\mathbf{x}\\|^{2}$, guaranteeing a unique minimiser. " +
            "Their ratio $\\kappa = L/\\mu$, the **condition number**, governs the speed of first-order methods: for a " +
            "quadratic, $L$ and $\\mu$ are the largest and smallest Hessian eigenvalues.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the condition number matters",
          text:
            "A large $\\kappa$ means long, narrow valleys. The gradient points mostly across the valley rather than along " +
            "it, so gradient descent zig-zags. Much of the rest of this chapter — momentum, conjugate gradients, Newton " +
            "and quasi-Newton methods, preconditioning — is about removing or reducing the dependence on $\\kappa$.",
        },
      ],
    },
  ],

  references: [
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "Ch. 2, Convex Sets; Ch. 3, Convex Functions; §9.1, Strong convexity" },
    { source: "Nesterov, Lectures on Convex Optimization", locator: "Ch. 2, Smooth Convex Optimization (§2.1)" },
  ],
};
