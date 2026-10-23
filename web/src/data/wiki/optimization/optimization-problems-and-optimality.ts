import type { WikiArticle } from "../types";

export const optimizationProblemsAndOptimalityWiki: WikiArticle = {
  conceptId: "optimization-problems-and-optimality",

  summary:
    "An optimisation problem asks for the point $\\mathbf{x}$ that makes an objective $f(\\mathbf{x})$ as small as " +
    "possible, possibly subject to constraints. Before any algorithm, we need to know what a solution looks like: " +
    "at an interior minimum of a smooth function the gradient vanishes, and the Hessian is positive semidefinite. " +
    "These first- and second-order conditions are what every method in this chapter is trying to satisfy.",

  sections: [
    {
      heading: "The standard form",
      blocks: [
        {
          kind: "formula",
          latex:
            "\\min_{\\mathbf{x} \\in \\mathbb{R}^{n}} f(\\mathbf{x}) \\quad \\text{subject to} \\quad g_i(\\mathbf{x}) \\le 0,\\; h_j(\\mathbf{x}) = 0",
          caption: "Objective $f$, inequality constraints $g_i$, equality constraints $h_j$",
        },
        {
          kind: "definitions",
          items: [
            { term: "Feasible set", description: "All $\\mathbf{x}$ satisfying every constraint. With no constraints it is all of $\\mathbb{R}^{n}$." },
            { term: "Global minimiser", description: "A feasible $\\mathbf{x}^{*}$ with $f(\\mathbf{x}^{*}) \\le f(\\mathbf{x})$ for every feasible $\\mathbf{x}$." },
            { term: "Local minimiser", description: "A feasible $\\mathbf{x}^{*}$ with $f(\\mathbf{x}^{*}) \\le f(\\mathbf{x})$ for every feasible $\\mathbf{x}$ in some neighbourhood of $\\mathbf{x}^{*}$." },
            { term: "Stationary point", description: "A point where $\\nabla f(\\mathbf{x}) = \\mathbf{0}$: a minimum, a maximum or a saddle." },
          ],
        },
        {
          kind: "prose",
          text:
            "Maximising $f$ is the same as minimising $-f$, so the convention of writing every problem as a minimisation " +
            "loses nothing. A problem may have no minimiser at all ($f(x) = e^{x}$ on $\\mathbb{R}$ approaches $0$ but never " +
            "reaches it); a continuous $f$ on a closed, bounded feasible set always has one (Weierstrass).",
        },
      ],
    },

    {
      heading: "First- and second-order conditions",
      blocks: [
        {
          kind: "formula",
          latex: "\\nabla f(\\mathbf{x}^{*}) = \\mathbf{0}, \\qquad \\nabla^{2} f(\\mathbf{x}^{*}) \\succeq 0",
          caption: "Necessary conditions for an unconstrained local minimiser of a twice-differentiable $f$",
        },
        {
          kind: "prose",
          text:
            "Both come from Taylor's theorem. Near $\\mathbf{x}^{*}$, " +
            "$f(\\mathbf{x}^{*} + \\mathbf{d}) \\approx f(\\mathbf{x}^{*}) + \\nabla f(\\mathbf{x}^{*})^{\\top}\\mathbf{d} + \\tfrac{1}{2}\\mathbf{d}^{\\top}\\nabla^{2} f(\\mathbf{x}^{*})\\mathbf{d}$. " +
            "If the gradient were nonzero, stepping along $-\\nabla f$ would lower $f$; if the Hessian had a negative " +
            "eigenvalue, stepping along its eigenvector would. The **sufficient** condition strengthens the second " +
            "one: a stationary point with $\\nabla^{2} f(\\mathbf{x}^{*}) \\succ 0$ (positive definite) is a strict local minimiser.",
        },
        {
          kind: "table",
          headers: ["Hessian at a stationary point", "Conclusion"],
          rows: [
            ["Positive definite", "Strict local minimum"],
            ["Negative definite", "Strict local maximum"],
            ["Indefinite (eigenvalues of both signs)", "Saddle point"],
            ["Semidefinite with a zero eigenvalue", "Inconclusive — look at higher-order terms"],
          ],
        },
        {
          kind: "example",
          title: "Classifying stationary points",
          problem: "Find and classify the stationary points of $f(x, y) = x^{3} - 3x + y^{2}$.",
          steps: [
            "$\\nabla f = (3x^{2} - 3,\\; 2y)$, which vanishes at $(1, 0)$ and $(-1, 0)$.",
            "$\\nabla^{2} f = \\begin{bmatrix} 6x & 0 \\\\ 0 & 2 \\end{bmatrix}$.",
            "At $(1, 0)$ the Hessian is $\\operatorname{diag}(6, 2) \\succ 0$; at $(-1, 0)$ it is $\\operatorname{diag}(-6, 2)$, indefinite.",
          ],
          answer: "$(1, 0)$ is a strict local minimum (with $f = -2$) and $(-1, 0)$ is a saddle. Neither is global: $f \\to -\\infty$ as $x \\to -\\infty$.",
        },
      ],
    },

    {
      heading: "How algorithms use these conditions",
      blocks: [
        {
          kind: "prose",
          text:
            "Almost every method in this chapter is iterative: from a current point $\\mathbf{x}_k$ it chooses a " +
            "direction $\\mathbf{p}_k$ and a step length $\\alpha_k$, and sets $\\mathbf{x}_{k+1} = \\mathbf{x}_k + \\alpha_k\\mathbf{p}_k$. " +
            "Methods differ in how they pick $\\mathbf{p}_k$ — the negative gradient, a Newton step from the Hessian, a " +
            "quasi-Newton approximation — and they stop when $\\|\\nabla f(\\mathbf{x}_k)\\|$ is small, i.e. when the " +
            "first-order condition is nearly met.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Stationary is not the same as optimal",
          text:
            "A small gradient certifies only that you are near *some* stationary point. Without convexity it could be a " +
            "saddle or a poor local minimum. Convexity (next lesson) is exactly the property that makes the first-order " +
            "condition sufficient for a global minimum.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Rates of convergence",
          text:
            "With error $e_k = \\|\\mathbf{x}_k - \\mathbf{x}^{*}\\|$, a method converges **linearly** if $e_{k+1} \\le c\\,e_k$ " +
            "with $c < 1$, **superlinearly** if $e_{k+1}/e_k \\to 0$, and **quadratically** if $e_{k+1} \\le M e_k^{2}$. " +
            "Quadratic convergence roughly doubles the number of correct digits every step.",
        },
      ],
    },
  ],

  references: [
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 1, Introduction; Ch. 2, Fundamentals of Unconstrained Optimization" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "Ch. 4, Convex Optimization Problems (§4.1)" },
  ],
};
