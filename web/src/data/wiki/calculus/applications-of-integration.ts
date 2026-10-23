import type { WikiArticle } from "../types";

export const applicationsOfIntegrationWiki: WikiArticle = {
  conceptId: "applications-of-integration",

  summary:
    "Every application of the integral follows one recipe: slice the quantity into thin pieces, approximate one piece " +
    "by something simple (a rectangle, a disc, a cylindrical shell), and add the pieces with an integral. Areas " +
    "between curves, volumes of solids of revolution, average values, work and mass all come from the same three " +
    "steps — slice, approximate, integrate.",

  sections: [
    {
      heading: "Area between curves",
      blocks: [
        {
          kind: "formula",
          latex: "A = \\int_a^b \\big(\\text{top}(x) - \\text{bottom}(x)\\big)\\,dx",
          caption: "Vertical strips of height top minus bottom",
        },
        {
          kind: "example",
          title: "A parabola and a line",
          problem: "Find the area between $y = x$ and $y = x^{2}$.",
          steps: [
            "They meet where $x^{2} = x$: $x = 0$ and $x = 1$. On $(0, 1)$, $x > x^{2}$.",
            "$A = \\int_0^{1} (x - x^{2})\\,dx = \\frac{1}{2} - \\frac{1}{3}$.",
          ],
          answer: "$\\frac{1}{6}$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Curves that cross",
          text:
            "If the top and bottom curves swap, split the integral at each crossing — or integrate $|f - g|$. Integrating " +
            "$f - g$ straight through lets the pieces cancel.",
        },
        {
          kind: "prose",
          text:
            "Sometimes horizontal strips are easier: $A = \\int_c^d (\\text{right}(y) - \\text{left}(y))\\,dy$, which avoids " +
            "splitting when a region is bounded by a curve like $x = y^{2}$.",
        },
      ],
    },
    {
      heading: "Volumes of revolution",
      blocks: [
        {
          kind: "table",
          headers: ["Method", "Slice", "Volume"],
          rows: [
            ["Disc", "perpendicular to the axis, solid", "$\\int_a^b \\pi R(x)^{2}\\,dx$"],
            ["Washer", "perpendicular, with a hole", "$\\int_a^b \\pi \\left(R(x)^{2} - r(x)^{2}\\right)dx$"],
            ["Shell", "parallel to the axis", "$\\int_a^b 2\\pi \\cdot (\\text{radius}) \\cdot (\\text{height})\\,dx$"],
          ],
          caption: "For rotation about the $x$-axis (discs/washers) or $y$-axis (shells)",
        },
        {
          kind: "example",
          title: "The volume of a sphere",
          problem: "Rotate $y = \\sqrt{r^{2} - x^{2}}$, $-r \\le x \\le r$, about the $x$-axis.",
          steps: [
            "Discs of radius $\\sqrt{r^{2} - x^{2}}$: $V = \\int_{-r}^{r} \\pi(r^{2} - x^{2})\\,dx$.",
            "$= \\pi\\left[r^{2}x - \\frac{x^{3}}{3}\\right]_{-r}^{r} = \\pi\\left(2r^{3} - \\frac{2r^{3}}{3}\\right)$.",
          ],
          answer: "$\\frac{4}{3}\\pi r^{3}$.",
        },
        {
          kind: "example",
          title: "Shells",
          problem: "Rotate the region under $y = x - x^{2}$ on $[0, 1]$ about the $y$-axis.",
          steps: [
            "A shell at $x$ has radius $x$, height $x - x^{2}$, thickness $dx$.",
            "$V = \\int_0^{1} 2\\pi x(x - x^{2})\\,dx = 2\\pi\\left(\\frac{1}{3} - \\frac{1}{4}\\right)$.",
          ],
          answer: "$\\frac{\\pi}{6} \\approx 0.524$. Discs would need $x$ as a function of $y$ — two branches — so shells are easier here.",
        },
      ],
    },
    {
      heading: "Average value and other totals",
      blocks: [
        {
          kind: "formula",
          latex: "f_{\\text{avg}} = \\frac{1}{b - a}\\int_a^b f(x)\\,dx",
          caption: "The height of the rectangle with the same area as the region under $f$",
        },
        {
          kind: "example",
          title: "Average of a sine arch",
          problem: "Find the average value of $\\sin x$ on $[0, \\pi]$.",
          steps: ["$\\int_0^{\\pi} \\sin x\\,dx = 2$.", "Divide by the length $\\pi$."],
          answer: "$\\frac{2}{\\pi} \\approx 0.637$.",
        },
        {
          kind: "list",
          items: [
            "**Work**: a variable force $F(x)$ over $[a, b]$ does work $\\int_a^b F(x)\\,dx$; stretching a spring with $F = kx$ from $0$ to $d$ takes $\\frac{1}{2}kd^{2}$.",
            "**Mass**: a rod with density $\\rho(x)$ has mass $\\int_a^b \\rho(x)\\,dx$ and centre of mass $\\frac{\\int x\\rho}{\\int \\rho}$.",
            "**Probability**: $\\mathbb{E}[X] = \\int x f(x)\\,dx$ is the centre of mass of a density.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Always the same move",
          text:
            "Write the contribution of one thin slice — area $\\approx (\\text{top} - \\text{bottom})\\,dx$, volume $\\approx \\pi R^{2}\\,dx$, " +
            "work $\\approx F\\,dx$ — and the integral is the sum of the slices. Memorising formulas is optional once you can do that.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§6.1 Areas Between Curves; §6.2 Volumes; §6.3 Volumes by Cylindrical Shells; §6.4 Work; §6.5 Average Value of a Function" },
    { source: "OpenStax, Calculus Volume 1", locator: "Ch. 6, Applications of Integration" },
  ],
};
