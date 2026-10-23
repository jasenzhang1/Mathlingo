import type { WikiArticle } from "../types";

export const multipleIntegralsWiki: WikiArticle = {
  conceptId: "multiple-integrals",

  summary:
    "A double integral $\\iint_R f\\,dA$ adds up $f$ over a region of the plane — the volume under a surface, the mass " +
    "of a plate, or a probability under a joint density. It is computed as an iterated integral, one variable at a " +
    "time, with the order chosen to make the region (and the integrand) easy. When the region is round, polar " +
    "coordinates and the Jacobian factor $r$ do the work, and the same ideas extend to triple integrals.",

  sections: [
    {
      heading: "Iterated integrals and Fubini",
      blocks: [
        {
          kind: "formula",
          latex: "\\iint_{[a, b] \\times [c, d]} f(x, y)\\,dA = \\int_a^b \\int_c^d f(x, y)\\,dy\\,dx = \\int_c^d \\int_a^b f(x, y)\\,dx\\,dy",
          caption: "Fubini's theorem: for continuous $f$ on a rectangle, either order gives the same answer",
        },
        {
          kind: "example",
          title: "Over a rectangle",
          problem: "Evaluate $\\iint_R (x + 2y)\\,dA$ with $R = [0, 2] \\times [0, 1]$.",
          steps: [
            "Inner integral in $y$: $\\int_0^{1} (x + 2y)\\,dy = x + 1$.",
            "Outer integral in $x$: $\\int_0^{2} (x + 1)\\,dx = 2 + 2$.",
          ],
          answer: "$4$.",
        },
        {
          kind: "prose",
          text:
            "For a general region, the inner limits depend on the outer variable. A region “between two graphs” " +
            "$g_1(x) \\le y \\le g_2(x)$ for $a \\le x \\le b$ gives $\\int_a^b \\int_{g_1(x)}^{g_2(x)} f\\,dy\\,dx$. The " +
            "outer limits are always constants.",
        },
        {
          kind: "example",
          title: "Over a triangle",
          problem: "Evaluate $\\iint_T xy\\,dA$ where $T$ is the triangle with vertices $(0, 0)$, $(1, 0)$, $(1, 1)$.",
          steps: [
            "$T$ is $0 \\le y \\le x$, $0 \\le x \\le 1$.",
            "$\\int_0^{1} \\int_0^{x} xy\\,dy\\,dx = \\int_0^{1} \\frac{x^{3}}{2}\\,dx$.",
          ],
          answer: "$\\frac{1}{8}$.",
        },
      ],
    },
    {
      heading: "Switching the order",
      blocks: [
        {
          kind: "example",
          title: "An impossible inner integral",
          problem: "Evaluate $\\int_0^{1} \\int_y^{1} e^{x^{2}}\\,dx\\,dy$.",
          steps: [
            "$e^{x^{2}}$ has no elementary antiderivative in $x$, so reverse the order.",
            "The region is $0 \\le y \\le x \\le 1$: as $0 \\le x \\le 1$, $0 \\le y \\le x$.",
            "$\\int_0^{1} \\int_0^{x} e^{x^{2}}\\,dy\\,dx = \\int_0^{1} x e^{x^{2}}\\,dx = \\frac{1}{2}(e - 1)$.",
          ],
          answer: "$\\frac{e - 1}{2} \\approx 0.859$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Redraw the region; don't just swap the limits",
          text:
            "Swapping $dx$ and $dy$ while keeping the same limits is wrong whenever the limits involve variables. Sketch " +
            "the region, then describe it the other way round.",
        },
      ],
    },
    {
      heading: "Polar coordinates and the Jacobian",
      blocks: [
        {
          kind: "formula",
          latex: "x = r\\cos\\theta,\\; y = r\\sin\\theta, \\qquad dA = r\\,dr\\,d\\theta",
          caption: "A polar rectangle of size $dr \\times d\\theta$ has area $r\\,dr\\,d\\theta$",
        },
        {
          kind: "example",
          title: "The Gaussian integral",
          problem: "Show $\\int_{-\\infty}^{\\infty} e^{-x^{2}}\\,dx = \\sqrt{\\pi}$.",
          steps: [
            "Call it $I$. Then $I^{2} = \\iint_{\\mathbb{R}^{2}} e^{-(x^{2} + y^{2})}\\,dA$.",
            "In polar coordinates: $\\int_0^{2\\pi} \\int_0^{\\infty} e^{-r^{2}}\\,r\\,dr\\,d\\theta$ — the factor $r$ makes the inner integral easy.",
            "$\\int_0^{\\infty} r e^{-r^{2}}\\,dr = \\frac{1}{2}$, so $I^{2} = 2\\pi \\cdot \\frac{1}{2} = \\pi$.",
          ],
          answer: "$I = \\sqrt{\\pi}$ — the reason $\\frac{1}{\\sqrt{2\\pi}}$ normalises the normal density.",
        },
        {
          kind: "formula",
          latex: "\\iint_R f(x, y)\\,dx\\,dy = \\iint_S f(x(u, v), y(u, v))\\left|\\frac{\\partial(x, y)}{\\partial(u, v)}\\right| du\\,dv",
          caption: "General change of variables: the absolute Jacobian determinant rescales area",
        },
        {
          kind: "prose",
          text:
            "Triple integrals $\\iiint_E f\\,dV$ work the same way with three nested integrals. In cylindrical coordinates " +
            "$dV = r\\,dz\\,dr\\,d\\theta$; in spherical coordinates $dV = \\rho^{2}\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta$, which " +
            "integrates to $\\frac{4}{3}\\pi R^{3}$ over a ball.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Probability",
          text:
            "For a joint density $f_{X, Y}$, $P((X, Y) \\in R) = \\iint_R f_{X, Y}\\,dA$, a marginal density is an inner " +
            "integral, and the Jacobian is exactly what appears when transforming random vectors.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§15.1–§15.3 (double integrals, general regions, polar coordinates); §15.6–§15.8 (triple integrals); §15.9 Change of Variables" },
    { source: "OpenStax, Calculus Volume 3", locator: "Ch. 5, Multiple Integration" },
  ],
};
