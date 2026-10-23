import type { WikiArticle } from "../types";

export const kktConditionsWiki: WikiArticle = {
  conceptId: "kkt-conditions",

  summary:
    "The Karush–Kuhn–Tucker (KKT) conditions extend Lagrange multipliers to inequality constraints. A multiplier " +
    "$\\mu_i$ is attached to each constraint $g_i(\\mathbf{x}) \\le 0$; it must be nonnegative, and it can be nonzero " +
    "only if the constraint is active (holds with equality). For convex problems the KKT conditions are both " +
    "necessary (under mild regularity) and sufficient — they characterise the solution completely, and most " +
    "constrained algorithms are ways of solving them.",

  sections: [
    {
      heading: "The four conditions",
      blocks: [
        {
          kind: "formula",
          latex: "\\min f(\\mathbf{x}) \\;\\; \\text{s.t.} \\;\\; g_i(\\mathbf{x}) \\le 0,\\; h_j(\\mathbf{x}) = 0; \\qquad \\mathcal{L} = f + \\sum_i \\mu_i g_i + \\sum_j \\lambda_j h_j",
        },
        {
          kind: "definitions",
          items: [
            { term: "Stationarity", description: "$\\nabla f(\\mathbf{x}^{*}) + \\sum_i \\mu_i\\nabla g_i(\\mathbf{x}^{*}) + \\sum_j \\lambda_j\\nabla h_j(\\mathbf{x}^{*}) = \\mathbf{0}$" },
            { term: "Primal feasibility", description: "$g_i(\\mathbf{x}^{*}) \\le 0$ and $h_j(\\mathbf{x}^{*}) = 0$" },
            { term: "Dual feasibility", description: "$\\mu_i \\ge 0$ — the multipliers of inequality constraints can only push outward" },
            { term: "Complementary slackness", description: "$\\mu_i g_i(\\mathbf{x}^{*}) = 0$ for every $i$: either the constraint is active or its multiplier is zero" },
          ],
        },
        {
          kind: "prose",
          text:
            "Geometrically, at the optimum $-\\nabla f$ is a nonnegative combination of the gradients of the active " +
            "constraints: the objective would like to move further, but only in directions the constraints block. " +
            "Complementary slackness says an inactive constraint plays no role at all.",
        },
      ],
    },

    {
      heading: "Working through an example",
      blocks: [
        {
          kind: "example",
          title: "One inequality, two cases",
          problem: "Minimise $(x - 2)^{2}$ subject to $x \\le 1$.",
          steps: [
            "$\\mathcal{L} = (x - 2)^{2} + \\mu(x - 1)$, so stationarity is $2(x - 2) + \\mu = 0$.",
            "Case $\\mu = 0$ (constraint inactive): $x = 2$, which violates $x \\le 1$. Reject.",
            "Case $x = 1$ (constraint active): $\\mu = -2(1 - 2) = 2 \\ge 0$. All four conditions hold.",
          ],
          answer: "$x^{*} = 1$ with $\\mu^{*} = 2$. Relaxing the bound to $x \\le 1 + \\delta$ would lower the optimum by about $2\\delta$.",
        },
        {
          kind: "prose",
          text:
            "The case analysis — guess which constraints are active, solve, check signs — is how small problems are " +
            "solved by hand, and is what *active-set* methods for quadratic programming automate. Had the constraint " +
            "been $x \\le 3$, the unconstrained minimiser $x = 2$ would be feasible, the constraint inactive, and $\\mu = 0$.",
        },
      ],
    },

    {
      heading: "When the conditions hold and when they suffice",
      blocks: [
        {
          kind: "table",
          headers: ["Setting", "What KKT tells you"],
          rows: [
            ["General smooth problem with a constraint qualification (e.g. LICQ: active constraint gradients independent)", "Necessary: every local minimiser has multipliers satisfying KKT"],
            ["Convex problem ($f$, $g_i$ convex; $h_j$ affine)", "Sufficient: any KKT point is a global minimiser"],
            ["Convex problem satisfying Slater's condition (a strictly feasible point exists)", "Necessary and sufficient, and the multipliers solve the dual problem"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Constraint qualifications matter",
          text:
            "Minimise $x$ subject to $x^{2} \\le 0$. The only feasible point, $x = 0$, is optimal, but stationarity " +
            "$1 + 2\\mu x = 0$ has no solution there: the constraint gradient vanishes. KKT can fail at a minimiser " +
            "when constraints are degenerate.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "KKT everywhere",
          text:
            "The support vectors of an SVM are the training points whose multipliers are positive — complementary " +
            "slackness in action. Water-filling in information theory, the lasso's optimality conditions, and portfolio " +
            "optimisation all come from writing down KKT conditions.",
        },
      ],
    },
  ],

  references: [
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§5.5, Optimality conditions (§5.5.3, KKT optimality conditions)" },
    { source: "Nocedal & Wright, Numerical Optimization", locator: "§12.3, First-order optimality conditions; §12.6, Constraint qualifications" },
  ],
};
