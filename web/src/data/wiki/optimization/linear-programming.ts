import type { WikiArticle } from "../types";

export const linearProgrammingWiki: WikiArticle = {
  conceptId: "linear-programming",

  summary:
    "A linear program optimises a linear objective subject to linear equality and inequality constraints. The " +
    "feasible set is a polyhedron, and if an optimum exists, one is attained at a vertex. The simplex method walks " +
    "from vertex to adjacent vertex, improving the objective each time; interior-point methods cut through the " +
    "middle. LP duality pairs every LP with another whose optimal value is the same, and is the cleanest instance " +
    "of Lagrangian duality.",

  sections: [
    {
      heading: "Forms and geometry",
      blocks: [
        {
          kind: "formula",
          latex: "\\min_{\\mathbf{x}} \\mathbf{c}^{\\top}\\mathbf{x} \\quad \\text{s.t.} \\quad A\\mathbf{x} = \\mathbf{b},\\; \\mathbf{x} \\ge \\mathbf{0}",
          caption: "Standard form; any LP can be converted to it with slack variables and by splitting free variables",
        },
        {
          kind: "prose",
          text:
            "An inequality $\\mathbf{a}^{\\top}\\mathbf{x} \\le b$ becomes $\\mathbf{a}^{\\top}\\mathbf{x} + s = b$ with slack $s \\ge 0$. The " +
            "feasible set is a polyhedron; its vertices are the **basic feasible solutions**, where $m$ chosen columns of " +
            "$A$ (the basis) determine the basic variables and the rest are zero. An LP is either infeasible, unbounded, " +
            "or has an optimal vertex — possibly a whole optimal edge or face.",
        },
        {
          kind: "example",
          title: "Checking the vertices",
          problem: "Maximise $3x + 2y$ subject to $x + y \\le 4$, $x + 3y \\le 6$, $x, y \\ge 0$.",
          steps: [
            "The vertices are $(0, 0)$, $(4, 0)$, $(0, 2)$, and the intersection of $x + y = 4$ and $x + 3y = 6$, which is $(3, 1)$.",
            "Objective values: $0$, $12$, $4$ and $11$.",
          ],
          answer: "The maximum $12$ is at $(4, 0)$. Enumerating vertices works here, but there can be exponentially many — hence simplex.",
        },
      ],
    },

    {
      heading: "The simplex method",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Start at a basic feasible solution (finding one may need a Phase I problem).",
            "Compute reduced costs $\\bar{c}_j = c_j - \\mathbf{c}_B^{\\top}B^{-1}\\mathbf{a}_j$ for the nonbasic variables. If all are $\\ge 0$, the vertex is optimal (for minimisation).",
            "Otherwise pick an entering variable with $\\bar{c}_j < 0$ and increase it, moving along an edge of the polyhedron.",
            "The ratio test finds the first basic variable to hit zero; it leaves the basis. If none does, the LP is unbounded.",
            "Update the basis and repeat.",
          ],
        },
        {
          kind: "prose",
          text:
            "Each pivot moves to an adjacent vertex with an objective at least as good. In practice simplex needs a " +
            "number of pivots roughly linear in the number of constraints, but Klee and Minty built examples where it " +
            "visits exponentially many vertices. Degenerate vertices can cause cycling, which anti-cycling rules (Bland's " +
            "rule) prevent.",
        },
      ],
    },

    {
      heading: "LP duality",
      blocks: [
        {
          kind: "formula",
          latex: "\\max_{\\mathbf{x}} \\mathbf{c}^{\\top}\\mathbf{x} \\;\\text{ s.t. }\\; A\\mathbf{x} \\le \\mathbf{b},\\, \\mathbf{x} \\ge \\mathbf{0} \\quad\\longleftrightarrow\\quad \\min_{\\mathbf{y}} \\mathbf{b}^{\\top}\\mathbf{y} \\;\\text{ s.t. }\\; A^{\\top}\\mathbf{y} \\ge \\mathbf{c},\\, \\mathbf{y} \\ge \\mathbf{0}",
          caption: "Primal and dual: one variable of each per constraint of the other",
        },
        {
          kind: "list",
          items: [
            "**Weak duality**: $\\mathbf{c}^{\\top}\\mathbf{x} \\le \\mathbf{b}^{\\top}\\mathbf{y}$ for any feasible pair.",
            "**Strong duality**: if either has an optimum, both do and the values are equal.",
            "**Complementary slackness**: $y_i > 0$ only if primal constraint $i$ is tight, and $x_j > 0$ only if dual constraint $j$ is tight.",
          ],
        },
        {
          kind: "example",
          title: "The dual of the example",
          problem: "Write and solve the dual of the LP above.",
          steps: [
            "Dual: minimise $4y_1 + 6y_2$ subject to $y_1 + y_2 \\ge 3$, $y_1 + 3y_2 \\ge 2$, $\\mathbf{y} \\ge \\mathbf{0}$.",
            "At the primal optimum $(4, 0)$, constraint $x + 3y \\le 6$ is slack ($4 < 6$), so $y_2 = 0$.",
            "Since $x > 0$, the first dual constraint is tight: $y_1 + y_2 = 3$, so $y_1 = 3$.",
          ],
          answer: "$\\mathbf{y}^{*} = (3, 0)$ with dual value $12$, equal to the primal optimum. $y_1 = 3$ is the value of one more unit of the first resource.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "LPs in data science",
          text:
            "Least absolute deviation regression, quantile regression, optimal transport between discrete " +
            "distributions, and many scheduling and allocation problems are LPs. Modern solvers combine simplex (good " +
            "for warm starts) with interior-point methods (polynomial-time and fast on large sparse problems).",
        },
      ],
    },
  ],

  references: [
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 13, Linear Programming: The Simplex Method" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§4.3, Linear optimization problems; §5.2.1, LP duality" },
    { source: "Bertsimas & Tsitsiklis, Introduction to Linear Optimization", locator: "Ch. 3, The Simplex Method; Ch. 4, Duality Theory" },
  ],
};
