import type { WikiArticle } from "../types";

export const multivariableExtremaWiki: WikiArticle = {
  conceptId: "multivariable-extrema",

  summary:
    "Finding the highest and lowest points of a surface $z = f(x, y)$ follows the one-variable playbook. Local extrema " +
    "occur where the gradient vanishes; the second derivative test, now built from the Hessian matrix, sorts those " +
    "critical points into minima, maxima and the new possibility in two dimensions — the saddle point. On a closed, " +
    "bounded region the absolute extrema exist and are found by also checking the boundary.",

  sections: [
    {
      heading: "Critical points",
      blocks: [
        {
          kind: "prose",
          text:
            "If $f$ has a local extremum at an interior point where its partials exist, then $\\nabla f = \\mathbf{0}$ " +
            "there: each one-variable slice through the point has an extremum, so each partial is zero. Points with " +
            "$\\nabla f = \\mathbf{0}$ (or where a partial doesn't exist) are **critical points**.",
        },
        {
          kind: "example",
          title: "Solving $\\nabla f = \\mathbf{0}$",
          problem: "Find the critical points of $f(x, y) = x^{3} - 3x + y^{2} - 4y$.",
          steps: [
            "$f_x = 3x^{2} - 3 = 0$ gives $x = \\pm 1$.",
            "$f_y = 2y - 4 = 0$ gives $y = 2$.",
          ],
          answer: "$(1, 2)$ and $(-1, 2)$.",
        },
      ],
    },
    {
      heading: "The second derivative test",
      blocks: [
        {
          kind: "formula",
          latex: "D = f_{xx}f_{yy} - f_{xy}^{2} = \\det \\mathbf{H}, \\qquad \\mathbf{H} = \\begin{bmatrix} f_{xx} & f_{xy} \\\\ f_{xy} & f_{yy} \\end{bmatrix}",
          caption: "Evaluated at the critical point",
        },
        {
          kind: "table",
          headers: ["Condition", "Conclusion"],
          rows: [
            ["$D > 0$, $f_{xx} > 0$", "local minimum"],
            ["$D > 0$, $f_{xx} < 0$", "local maximum"],
            ["$D < 0$", "saddle point"],
            ["$D = 0$", "inconclusive"],
          ],
        },
        {
          kind: "example",
          title: "Classifying",
          problem: "Classify the critical points of $f(x, y) = x^{3} - 3x + y^{2} - 4y$.",
          steps: [
            "$f_{xx} = 6x$, $f_{yy} = 2$, $f_{xy} = 0$, so $D = 12x$.",
            "At $(1, 2)$: $D = 12 > 0$, $f_{xx} = 6 > 0$ — local min, $f = 1 - 3 + 4 - 8 = -6$.",
            "At $(-1, 2)$: $D = -12 < 0$ — saddle.",
          ],
          answer: "Local minimum $-6$ at $(1, 2)$; saddle at $(-1, 2)$. The minimum isn't global: $f \\to -\\infty$ as $x \\to -\\infty$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the determinant",
          text:
            "Near a critical point, $f \\approx f(\\mathbf{p}) + \\frac{1}{2}\\mathbf{h}^{\\top}\\mathbf{H}\\mathbf{h}$. The shape is " +
            "decided by the eigenvalues of $\\mathbf{H}$: both positive (a bowl), both negative (a cap), or opposite signs " +
            "(a saddle). $D$ is their product and $f_{xx}$ fixes the sign when $D > 0$. The saddle $x^{2} - y^{2}$ curves " +
            "up along one axis and down along the other.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$D = 0$ means look harder",
          text:
            "$x^{4} + y^{4}$, $-(x^{4} + y^{4})$ and $x^{4} - y^{4}$ all have $D = 0$ at the origin — a min, a max and a saddle. " +
            "The test gives no information; examine $f$ directly along lines through the point.",
        },
      ],
    },
    {
      heading: "Absolute extrema on a closed region",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Find the values of $f$ at critical points inside the region.",
            "Find the extreme values of $f$ on the boundary — parametrise each edge and reduce to one-variable problems.",
            "The largest and smallest of all these values are the absolute max and min.",
          ],
        },
        {
          kind: "example",
          title: "On a square",
          problem: "Find the absolute extrema of $f(x, y) = x^{2} + y^{2} - 2x$ on the square $0 \\le x \\le 2$, $0 \\le y \\le 2$.",
          steps: [
            "Interior: $\\nabla f = [2x - 2, 2y] = \\mathbf{0}$ at $(1, 0)$ — on the boundary, so check it there.",
            "Edge $y = 0$: $x^{2} - 2x$ on $[0, 2]$, min $-1$ at $x = 1$, max $0$. Edge $y = 2$: $x^{2} - 2x + 4$, min $3$, max $4$.",
            "Edges $x = 0$ and $x = 2$: $y^{2}$ on $[0, 2]$, values $0$ to $4$.",
          ],
          answer: "Absolute min $-1$ at $(1, 0)$; absolute max $4$ at $(0, 2)$ and $(2, 2)$.",
        },
        {
          kind: "prose",
          text:
            "When the boundary is a curve $g(x, y) = c$ that is awkward to parametrise, the method of Lagrange multipliers " +
            "(solve $\\nabla f = \\lambda\\nabla g$) handles it — see the Lagrange Multipliers lesson in the Optimization course.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§14.7 Maximum and Minimum Values" },
    { source: "OpenStax, Calculus Volume 3", locator: "§4.7 Maxima/Minima Problems" },
  ],
};
