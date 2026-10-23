import type { WikiArticle } from "../types";

export const interiorPointMethodsWiki: WikiArticle = {
  conceptId: "interior-point-methods",

  summary:
    "Interior-point methods handle inequality constraints by never touching them. A logarithmic barrier that blows " +
    "up at the boundary is added to the objective, and the resulting smooth problem is minimised with Newton's " +
    "method. As the barrier's weight shrinks, the minimisers trace the central path toward the true optimum. These " +
    "methods solve linear, quadratic, second-order cone and semidefinite programs in a few dozen Newton steps, with " +
    "polynomial worst-case guarantees.",

  sections: [
    {
      heading: "The log barrier and the central path",
      blocks: [
        {
          kind: "formula",
          latex: "\\min_{\\mathbf{x}}\\; t f_0(\\mathbf{x}) + \\phi(\\mathbf{x}), \\qquad \\phi(\\mathbf{x}) = -\\sum_{i=1}^{m}\\ln\\big(-f_i(\\mathbf{x})\\big)",
          caption: "For constraints $f_i(\\mathbf{x}) \\le 0$; $\\phi$ is finite only on the strict interior and $\\to \\infty$ at the boundary",
        },
        {
          kind: "prose",
          text:
            "For each $t > 0$ the barrier problem has a minimiser $\\mathbf{x}^{*}(t)$; the curve they trace is the " +
            "**central path**. Larger $t$ means the barrier matters less, and $\\mathbf{x}^{*}(t)$ approaches the constrained " +
            "optimum. Remarkably, each central point comes with dual multipliers $\\mu_i = -\\frac{1}{t f_i(\\mathbf{x}^{*}(t))}$ that " +
            "are dual feasible, so the gap is known exactly.",
        },
        {
          kind: "formula",
          latex: "f_0(\\mathbf{x}^{*}(t)) - p^{*} \\le \\frac{m}{t}",
          caption: "The duality gap on the central path: $m$ constraints, barrier parameter $t$",
        },
        {
          kind: "example",
          title: "The central path of a tiny problem",
          problem: "Minimise $x$ subject to $x \\ge 1$ with the log barrier.",
          steps: [
            "Barrier problem: minimise $tx - \\ln(x - 1)$ over $x > 1$.",
            "Setting the derivative to zero: $t - \\frac{1}{x - 1} = 0$, so $x^{*}(t) = 1 + \\frac{1}{t}$.",
            "The suboptimality is $x^{*}(t) - 1 = \\frac{1}{t} = \\frac{m}{t}$ with $m = 1$.",
          ],
          answer: "$x^{*}(t) \\to 1$ as $t \\to \\infty$, approaching the boundary from the inside; at $t = 100$ the point $1.01$ is within $0.01$ of optimal.",
        },
      ],
    },

    {
      heading: "The barrier method",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Start from a strictly feasible $\\mathbf{x}$ and some $t > 0$.",
            "**Centering**: minimise $tf_0 + \\phi$ by Newton's method, starting from the current $\\mathbf{x}$.",
            "Stop if $\\frac{m}{t} < \\varepsilon$; otherwise increase $t \\leftarrow \\mu t$ (e.g. $\\mu = 10$) and repeat.",
          ],
        },
        {
          kind: "prose",
          text:
            "Each centering is warm-started from the previous central point, so it takes only a few Newton steps. " +
            "Reducing the gap from $\\frac{m}{t_0}$ to $\\varepsilon$ takes $\\frac{\\ln(m/(t_0\\varepsilon))}{\\ln\\mu}$ outer " +
            "iterations; in practice the total is typically $20$–$60$ Newton steps almost regardless of problem size. " +
            "Finding the first strictly feasible point is itself a *Phase I* problem.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Self-concordance",
          text:
            "Classical Newton analysis depends on unknown constants, but the log barrier is *self-concordant*: its " +
            "third derivative is bounded by its second. Nesterov and Nemirovski showed this gives Newton step counts " +
            "independent of the problem's conditioning, and a worst-case bound of $O(\\sqrt{m}\\ln\\frac{1}{\\varepsilon})$ " +
            "steps — polynomial time for LP, unlike simplex.",
        },
      ],
    },

    {
      heading: "Primal–dual interior-point methods",
      blocks: [
        {
          kind: "prose",
          text:
            "Modern solvers apply Newton's method directly to the KKT conditions with complementary slackness relaxed " +
            "to $\\mu_i f_i(\\mathbf{x}) = -\\frac{1}{t}$, updating primal and dual variables together. They don't need " +
            "exact centering, allow infeasible starting points, and with predictor–corrector steps (Mehrotra) typically " +
            "converge in under $50$ iterations.",
        },
        {
          kind: "table",
          headers: ["", "Simplex", "Interior point"],
          rows: [
            ["Path", "Vertex to vertex along edges", "Through the interior along the central path"],
            ["Worst case", "Exponential", "Polynomial"],
            ["Typical iterations", "Grows with problem size", "Tens, nearly size-independent (each iteration costlier)"],
            ["Warm starts", "Excellent", "Poor"],
            ["Generality", "LP (and QP variants)", "LP, QP, SOCP, SDP, general convex"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Each step is a big linear solve",
          text:
            "Every Newton step solves a KKT system whose size grows with the number of variables and constraints. " +
            "Exploiting its sparsity is what makes interior-point solvers fast; when even one solve is too expensive " +
            "(very large problems), first-order splitting methods like ADMM take over.",
        },
      ],
    },
  ],

  references: [
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "Ch. 11, Interior-Point Methods (§11.2 Logarithmic barrier and central path, §11.3 The barrier method, §11.7 Primal–dual methods)" },
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 14, Linear Programming: Interior-Point Methods; Ch. 19, Interior-Point Methods for Nonlinear Programming" },
  ],
};
