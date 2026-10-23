import type { WikiArticle } from "../types";

export const gradientAndDirectionalDerivativesWiki: WikiArticle = {
  conceptId: "gradient-and-directional-derivatives",

  summary:
    "Partial derivatives measure change along the axes; the directional derivative measures it in any direction " +
    "$\\mathbf{u}$. All of them are packed into one vector, the gradient $\\nabla f$, through the formula " +
    "$D_{\\mathbf{u}}f = \\nabla f \\cdot \\mathbf{u}$. That dot product explains the gradient's two geometric facts: it " +
    "points in the direction of steepest ascent, and it is perpendicular to level curves — the reason gradient descent " +
    "steps along $-\\nabla f$.",

  sections: [
    {
      heading: "The gradient and directional derivatives",
      blocks: [
        {
          kind: "formula",
          latex: "\\nabla f = \\left[\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right], \\qquad D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u} \\quad (\\|\\mathbf{u}\\| = 1)",
          caption: "The gradient vector, and the rate of change in the unit direction $\\mathbf{u}$",
        },
        {
          kind: "example",
          title: "A directional derivative",
          problem: "Find the rate of change of $f(x, y) = x^{2}y + y^{3}$ at $(1, 2)$ in the direction of $\\mathbf{v} = [3, 4]$.",
          steps: [
            "$\\nabla f = [2xy, x^{2} + 3y^{2}] = [4, 13]$ at $(1, 2)$.",
            "Normalise: $\\|\\mathbf{v}\\| = 5$, so $\\mathbf{u} = \\left[\\frac{3}{5}, \\frac{4}{5}\\right]$.",
            "$D_{\\mathbf{u}}f = \\frac{12}{5} + \\frac{52}{5} = \\frac{64}{5}$.",
          ],
          answer: "$12.8$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Use a unit vector",
          text:
            "With $\\mathbf{v} = [3, 4]$ un-normalised, $\\nabla f \\cdot \\mathbf{v} = 64$ — five times too large. The " +
            "directional derivative is a rate per unit distance, so the direction must have length $1$.",
        },
      ],
    },
    {
      heading: "Steepest ascent",
      blocks: [
        {
          kind: "formula",
          latex: "D_{\\mathbf{u}} f = \\|\\nabla f\\|\\cos\\theta",
          caption: "$\\theta$ is the angle between $\\nabla f$ and $\\mathbf{u}$",
        },
        {
          kind: "list",
          items: [
            "Maximised at $\\theta = 0$: $f$ increases fastest in the direction of $\\nabla f$, at rate $\\|\\nabla f\\|$.",
            "Minimised at $\\theta = \\pi$: fastest decrease along $-\\nabla f$, at rate $-\\|\\nabla f\\|$.",
            "Zero at $\\theta = \\frac{\\pi}{2}$: moving perpendicular to $\\nabla f$ keeps $f$ constant, to first order.",
          ],
        },
        {
          kind: "example",
          title: "Fastest climb",
          problem: "On the hill $h(x, y) = 100 - x^{2} - 2y^{2}$, at $(3, 1)$, which way is steepest uphill, and how steep?",
          steps: [
            "$\\nabla h = [-2x, -4y] = [-6, -4]$.",
            "Steepest ascent is along $[-6, -4]$, i.e. towards the summit at the origin.",
            "Slope $\\|\\nabla h\\| = \\sqrt{36 + 16} = \\sqrt{52}$.",
          ],
          answer: "Direction $[-6, -4]$ (unit vector $\\frac{1}{\\sqrt{52}}[-6, -4]$), slope $\\sqrt{52} \\approx 7.21$.",
        },
      ],
    },
    {
      heading: "Level sets and tangent planes",
      blocks: [
        {
          kind: "prose",
          text:
            "Along a level curve $f(x, y) = c$ the value doesn't change, so the directional derivative along the curve is " +
            "$0$: $\\nabla f$ is **perpendicular to level curves**. In three variables, $\\nabla F$ is normal to the level " +
            "surface $F(x, y, z) = c$, which gives tangent planes to implicitly defined surfaces:",
        },
        {
          kind: "formula",
          latex: "F_x(\\mathbf{p})(x - x_0) + F_y(\\mathbf{p})(y - y_0) + F_z(\\mathbf{p})(z - z_0) = 0",
          caption: "Tangent plane to $F = c$ at $\\mathbf{p} = (x_0, y_0, z_0)$",
        },
        {
          kind: "example",
          title: "Tangent plane to a sphere",
          problem: "Find the tangent plane to $x^{2} + y^{2} + z^{2} = 14$ at $(1, 2, 3)$.",
          steps: [
            "$\\nabla F = [2x, 2y, 2z] = [2, 4, 6]$.",
            "$2(x - 1) + 4(y - 2) + 6(z - 3) = 0$.",
          ],
          answer: "$x + 2y + 3z = 14$ — normal along the radius, as it should be.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Gradient descent",
          text:
            "To minimise a loss $L(\\mathbf{w})$, step against the gradient: $\\mathbf{w} \\leftarrow \\mathbf{w} - \\eta\\nabla L(\\mathbf{w})$. " +
            "For small steps this is the locally steepest way down — and on a contour map, each step crosses the " +
            "contours at right angles.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§14.6 Directional Derivatives and the Gradient Vector" },
    { source: "OpenStax, Calculus Volume 3", locator: "§4.6 Directional Derivatives and the Gradient" },
  ],
};
