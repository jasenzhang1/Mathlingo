import type { WikiArticle } from "../types";

export const riemannSumsWiki: WikiArticle = {
  conceptId: "riemann-sums",

  summary:
    "To find the area under a curve, chop the interval into thin strips, approximate each strip by a rectangle, and " +
    "add. As the strips get thinner the sum converges, and its limit is the definite integral $\\int_a^b f(x)\\,dx$. " +
    "The integral is a limit of sums in exactly the way the derivative is a limit of quotients — and the same idea " +
    "turns distance from velocity, mass from density and total probability from a density curve.",

  sections: [
    {
      heading: "Riemann sums",
      blocks: [
        {
          kind: "formula",
          latex: "\\Delta x = \\frac{b - a}{n}, \\quad x_i = a + i\\,\\Delta x, \\qquad R_n = \\sum_{i=1}^{n} f(x_i)\\,\\Delta x",
          caption: "A right-endpoint Riemann sum with $n$ equal subintervals",
        },
        {
          kind: "definitions",
          items: [
            { term: "Left sum $L_n$", description: "Heights $f(x_{i - 1})$, the left end of each strip." },
            { term: "Right sum $R_n$", description: "Heights $f(x_i)$, the right end." },
            { term: "Midpoint sum $M_n$", description: "Heights $f\\left(\\frac{x_{i-1} + x_i}{2}\\right)$ — usually much more accurate." },
          ],
        },
        {
          kind: "example",
          title: "Four rectangles under $x^{2}$",
          problem: "Compute $L_4$ and $R_4$ for $f(x) = x^{2}$ on $[0, 2]$.",
          steps: [
            "$\\Delta x = 0.5$; the points are $0, 0.5, 1, 1.5, 2$ with $f$ values $0, 0.25, 1, 2.25, 4$.",
            "$L_4 = 0.5(0 + 0.25 + 1 + 2.25) = 1.75$.",
            "$R_4 = 0.5(0.25 + 1 + 2.25 + 4) = 3.75$.",
          ],
          answer: "$L_4 = 1.75$, $R_4 = 3.75$. The true area is $\\frac{8}{3} \\approx 2.667$, between them because $x^{2}$ is increasing on $[0, 2]$.",
        },
      ],
    },
    {
      heading: "The definite integral",
      blocks: [
        {
          kind: "formula",
          latex: "\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^{*})\\,\\Delta x",
          caption: "The limit exists, and is the same for any choice of sample points $x_i^{*}$, whenever $f$ is continuous on $[a, b]$",
        },
        {
          kind: "example",
          title: "The limit by hand",
          problem: "Evaluate $\\int_0^{2} x^{2}\\,dx$ as a limit of $R_n$.",
          steps: [
            "$\\Delta x = \\frac{2}{n}$, $x_i = \\frac{2i}{n}$, so $R_n = \\sum_{i=1}^{n} \\frac{4i^{2}}{n^{2}} \\cdot \\frac{2}{n} = \\frac{8}{n^{3}} \\sum_{i=1}^{n} i^{2}$.",
            "$\\sum_{i=1}^{n} i^{2} = \\frac{n(n + 1)(2n + 1)}{6}$, so $R_n = \\frac{8(n + 1)(2n + 1)}{6n^{2}}$.",
            "As $n \\to \\infty$, $\\frac{(n + 1)(2n + 1)}{n^{2}} \\to 2$.",
          ],
          answer: "$\\frac{16}{6} = \\frac{8}{3}$. The fundamental theorem (next lesson) gets this in one line.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Signed area",
          text:
            "Where $f < 0$ the rectangles have negative height, so the integral counts area below the axis negatively: " +
            "$\\int_0^{2\\pi} \\sin x\\,dx = 0$. For total (unsigned) area integrate $|f|$.",
        },
      ],
    },
    {
      heading: "Properties",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Statement"],
          rows: [
            ["Linearity", "$\\int_a^b (cf + g) = c\\int_a^b f + \\int_a^b g$"],
            ["Additivity", "$\\int_a^b f + \\int_b^c f = \\int_a^c f$"],
            ["Reversal", "$\\int_b^a f = -\\int_a^b f$, and $\\int_a^a f = 0$"],
            ["Comparison", "$f \\le g$ on $[a, b]$ $\\implies$ $\\int_a^b f \\le \\int_a^b g$"],
            ["Bounds", "$m \\le f \\le M$ $\\implies$ $m(b - a) \\le \\int_a^b f \\le M(b - a)$"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Geometry first",
          text:
            "Many integrals are areas you already know. $\\int_{-3}^{3} \\sqrt{9 - x^{2}}\\,dx$ is a half-disc of radius $3$, " +
            "so it equals $\\frac{9\\pi}{2}$. And the integral of an odd function over $[-a, a]$ is $0$ by symmetry.",
        },
        {
          kind: "prose",
          text:
            "The **trapezoid rule** averages the left and right sums, $T_n = \\frac{L_n + R_n}{2}$; for the example above, " +
            "$T_4 = 2.75$. Its error, like the midpoint rule's, shrinks like $\\frac{1}{n^{2}}$, while left and right sums " +
            "improve only like $\\frac{1}{n}$.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§5.1 Areas and Distances; §5.2 The Definite Integral; §7.7 Approximate Integration" },
    { source: "OpenStax, Calculus Volume 1", locator: "§5.1 Approximating Areas; §5.2 The Definite Integral" },
  ],
};
