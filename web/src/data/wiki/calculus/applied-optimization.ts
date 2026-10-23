import type { WikiArticle } from "../types";

export const appliedOptimizationWiki: WikiArticle = {
  conceptId: "applied-optimization",

  summary:
    "Applied optimization is curve sketching with a story attached: the hard part is building the function. Name " +
    "the quantity to be optimised, use the constraint to write it in terms of a single variable, note the variable's " +
    "allowed range, and then find the absolute extremum with the tools from the previous lesson — not forgetting to " +
    "check that what you found really is the best.",

  sections: [
    {
      heading: "The method",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Draw a picture and name the variables.",
            "Write the **objective** (what to maximise or minimise) as a formula.",
            "Use the **constraint** to eliminate all but one variable.",
            "State the **domain** of that variable from the physical setting.",
            "Find critical points; compare with endpoints, or use the first/second derivative test.",
            "Answer the question actually asked (the dimensions? the maximum area? the cost?).",
          ],
        },
        {
          kind: "example",
          title: "The fence against a river",
          problem: "A farmer has $1{,}200$ m of fence to enclose a rectangle along a straight river (no fence on the river side). What is the largest area?",
          steps: [
            "Width $x$ (two sides perpendicular to the river), length $y$: constraint $2x + y = 1200$.",
            "Area $A = xy = x(1200 - 2x) = 1200x - 2x^{2}$, for $0 \\le x \\le 600$.",
            "$A'(x) = 1200 - 4x = 0$ at $x = 300$; $A'' = -4 < 0$, so a maximum. Endpoints give $A = 0$.",
            "$y = 600$, $A = 300 \\cdot 600$.",
          ],
          answer: "$180{,}000$ m², with the side along the river twice as long as each other side.",
        },
      ],
    },
    {
      heading: "More examples",
      blocks: [
        {
          kind: "example",
          title: "The open box",
          problem: "Squares of side $x$ are cut from the corners of a $12 \\times 12$ cm sheet, and the sides folded up. Which $x$ maximises the volume?",
          steps: [
            "$V(x) = x(12 - 2x)^{2}$ for $0 \\le x \\le 6$.",
            "$V'(x) = (12 - 2x)^{2} - 4x(12 - 2x) = (12 - 2x)(12 - 6x)$.",
            "Critical points: $x = 6$ (an endpoint, $V = 0$) and $x = 2$.",
          ],
          answer: "$x = 2$ cm, giving $V = 2 \\cdot 8^{2} = 128$ cm³.",
        },
        {
          kind: "example",
          title: "The cheapest can",
          problem: "A closed cylinder must hold volume $V$. Which shape uses the least material?",
          steps: [
            "Surface $S = 2\\pi r^{2} + 2\\pi r h$ with $\\pi r^{2} h = V$, so $h = \\frac{V}{\\pi r^{2}}$.",
            "$S(r) = 2\\pi r^{2} + \\frac{2V}{r}$ for $r > 0$; $S'(r) = 4\\pi r - \\frac{2V}{r^{2}} = 0$ gives $r^{3} = \\frac{V}{2\\pi}$.",
            "Then $h = \\frac{V}{\\pi r^{2}} = \\frac{2\\pi r^{3}}{\\pi r^{2}} = 2r$.",
          ],
          answer: "Height equal to the diameter. $S \\to \\infty$ at both ends of $(0, \\infty)$, so the one critical point is the global minimum.",
        },
      ],
    },
    {
      heading: "Certifying the answer",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "A critical point is a candidate, not an answer",
          text:
            "On a closed interval, compare against the endpoints. On an open interval such as $r > 0$, argue that $f$ " +
            "grows without bound (or falls) at both ends, or that the critical point is the only one and the second " +
            "derivative has a fixed sign — then a single local min is the global min.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Snell's law from a stopwatch",
          text:
            "Minimising the travel time of light crossing from one medium to another gives $\\frac{\\sin\\theta_1}{v_1} = \\frac{\\sin\\theta_2}{v_2}$. " +
            "The same lifeguard problem — run along the beach, then swim — has the same answer. Optimisation is how " +
            "nature's “laws” often turn out to be best choices.",
        },
        {
          kind: "prose",
          text:
            "Functions of several variables with constraints (maximise $f(x, y)$ subject to $g(x, y) = c$) are handled in " +
            "the multivariable lessons and by Lagrange multipliers in the Optimization course.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§4.7 Optimization Problems" },
    { source: "OpenStax, Calculus Volume 1", locator: "§4.7 Applied Optimization Problems" },
  ],
};
