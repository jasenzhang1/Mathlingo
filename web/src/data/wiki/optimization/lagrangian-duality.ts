import type { WikiArticle } from "../types";

export const lagrangianDualityWiki: WikiArticle = {
  conceptId: "lagrangian-duality",

  summary:
    "Every constrained minimisation problem has a companion maximisation problem built from its Lagrangian. The dual " +
    "function — the Lagrangian minimised over $\\mathbf{x}$ — gives a lower bound on the optimal value for every choice " +
    "of multipliers, and the dual problem looks for the best such bound. The bound is always valid (weak duality); for " +
    "convex problems that satisfy Slater's condition it is tight (strong duality), and the optimal multipliers become " +
    "certificates of optimality and sensitivities.",

  sections: [
    {
      heading: "The dual function and dual problem",
      blocks: [
        {
          kind: "formula",
          latex: "g(\\boldsymbol{\\mu}, \\boldsymbol{\\lambda}) = \\inf_{\\mathbf{x}}\\; \\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\mu}, \\boldsymbol{\\lambda}), \\qquad d^{*} = \\max_{\\boldsymbol{\\mu} \\ge \\mathbf{0},\\, \\boldsymbol{\\lambda}} g(\\boldsymbol{\\mu}, \\boldsymbol{\\lambda})",
          caption: "The dual function is a pointwise infimum of affine functions of the multipliers, so it is always concave",
        },
        {
          kind: "formula",
          latex: "g(\\boldsymbol{\\mu}, \\boldsymbol{\\lambda}) \\le p^{*} \\;\\text{ for all } \\boldsymbol{\\mu} \\ge \\mathbf{0} \\quad\\Longrightarrow\\quad d^{*} \\le p^{*}",
          caption: "Weak duality, which holds for any problem, convex or not",
        },
        {
          kind: "prose",
          text:
            "Proof in one line: for feasible $\\mathbf{x}$ and $\\boldsymbol{\\mu} \\ge \\mathbf{0}$, the penalty terms $\\mu_i g_i(\\mathbf{x}) \\le 0$ " +
            "and $\\lambda_j h_j(\\mathbf{x}) = 0$, so $g(\\boldsymbol{\\mu}, \\boldsymbol{\\lambda}) \\le \\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\mu}, \\boldsymbol{\\lambda}) \\le f(\\mathbf{x})$. " +
            "The difference $p^{*} - d^{*} \\ge 0$ is the **duality gap**.",
        },
        {
          kind: "example",
          title: "A one-dimensional dual",
          problem: "Find the dual of $\\min x^{2}$ subject to $x \\ge 1$ (written $1 - x \\le 0$).",
          steps: [
            "$\\mathcal{L} = x^{2} + \\mu(1 - x)$. Minimising over $x$: $2x - \\mu = 0$, so $x = \\frac{\\mu}{2}$.",
            "$g(\\mu) = \\frac{\\mu^{2}}{4} + \\mu - \\frac{\\mu^{2}}{2} = \\mu - \\frac{\\mu^{2}}{4}$, concave as promised.",
            "Maximise over $\\mu \\ge 0$: $g'(\\mu) = 1 - \\frac{\\mu}{2} = 0$ gives $\\mu^{*} = 2$ and $d^{*} = 1$.",
          ],
          answer: "$d^{*} = 1 = p^{*}$ (attained at $x^{*} = 1$): zero duality gap, and $\\mu^{*} = 2$ matches the KKT multiplier.",
        },
      ],
    },

    {
      heading: "Strong duality",
      blocks: [
        {
          kind: "prose",
          text:
            "**Slater's condition**: if the problem is convex and some point is strictly feasible ($g_i(\\mathbf{x}) < 0$ for " +
            "all $i$, equalities satisfied), then $d^{*} = p^{*}$ and the dual optimum is attained. Linear programs need " +
            "only feasibility. Non-convex problems typically have a positive gap — yet their duals still give useful lower " +
            "bounds, which is how branch-and-bound and semidefinite relaxations certify quality.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Strong duality is equivalent to KKT",
          text:
            "If strong duality holds, any primal optimum $\\mathbf{x}^{*}$ and dual optimum $(\\boldsymbol{\\mu}^{*}, \\boldsymbol{\\lambda}^{*})$ " +
            "satisfy the KKT conditions; for convex problems, conversely, any KKT point gives a primal–dual optimal " +
            "pair. A feasible primal–dual pair with zero gap is a *certificate* that both are optimal.",
        },
      ],
    },

    {
      heading: "Why duals are useful",
      blocks: [
        {
          kind: "table",
          headers: ["Use", "How"],
          rows: [
            ["Lower bounds and stopping rules", "Any dual feasible point bounds $p^{*}$; stop when the gap $f(\\mathbf{x}) - g(\\boldsymbol{\\mu})$ is small"],
            ["Sensitivity", "$\\mu_i^{*}$ measures how fast $p^{*}$ falls as constraint $i$ is relaxed"],
            ["Easier problems", "The SVM dual depends on data only through inner products (enabling kernels); LP duals swap constraints for variables"],
            ["Decomposition", "If $f$ is separable and constraints couple blocks, the dual function splits into independent subproblems (dual decomposition)"],
          ],
        },
        {
          kind: "prose",
          text:
            "Dual decomposition maximises $g$ by (sub)gradient ascent: given multipliers, each block minimises its own " +
            "part of the Lagrangian in parallel, and the constraint violation is a (sub)gradient of $g$ for updating the " +
            "multipliers. This is the ancestor of the augmented Lagrangian method and ADMM.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Sign conventions",
          text:
            "Multipliers of inequality constraints written as $g_i(\\mathbf{x}) \\le 0$ must be nonnegative. If you write a " +
            "constraint as $\\ge 0$ instead, flip its sign first, or the dual will come out wrong.",
        },
      ],
    },
  ],

  references: [
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "Ch. 5, Duality (§5.1–5.3, §5.5, §5.6 Perturbation and sensitivity)" },
    { source: "Boyd et al., Distributed Optimization and Statistical Learning via ADMM", locator: "§2.1, Dual ascent; §2.2, Dual decomposition" },
  ],
};
