import type { WikiArticle } from "../types";

export const partialDerivativesWiki: WikiArticle = {
  conceptId: "partial-derivatives",

  summary:
    "A function of several variables, such as $f(x, y)$, has a rate of change in each coordinate direction. The " +
    "partial derivative $\\frac{\\partial f}{\\partial x}$ is the ordinary derivative in $x$ with $y$ held fixed — the " +
    "slope of the surface along a slice parallel to the $x$-axis. Partial derivatives give tangent planes, linear " +
    "approximations and a chain rule, and they are the entries of the gradient and the Hessian used throughout " +
    "optimisation and machine learning.",

  sections: [
    {
      heading: "Definition and computation",
      blocks: [
        {
          kind: "formula",
          latex: "f_x(a, b) = \\frac{\\partial f}{\\partial x}(a, b) = \\lim_{h \\to 0} \\frac{f(a + h, b) - f(a, b)}{h}",
          caption: "Vary $x$ only; $f_y$ is defined the same way",
        },
        {
          kind: "example",
          title: "Treat the other variable as a constant",
          problem: "Find $f_x$ and $f_y$ for $f(x, y) = x^{3}y^{2} + \\sin(xy)$.",
          steps: [
            "In $x$, $y$ is a constant: $f_x = 3x^{2}y^{2} + y\\cos(xy)$.",
            "In $y$, $x$ is a constant: $f_y = 2x^{3}y + x\\cos(xy)$.",
          ],
          answer: "$f_x = 3x^{2}y^{2} + y\\cos(xy)$, $f_y = 2x^{3}y + x\\cos(xy)$.",
        },
        {
          kind: "prose",
          text:
            "Second-order partials: $f_{xx}$, $f_{yy}$ and the mixed partials $f_{xy} = (f_x)_y$ and $f_{yx}$. **Clairaut's " +
            "theorem**: if the mixed partials are continuous, they are equal, $f_{xy} = f_{yx}$. For the example, both equal " +
            "$6x^{2}y + \\cos(xy) - xy\\sin(xy)$.",
        },
      ],
    },
    {
      heading: "Tangent planes and linear approximation",
      blocks: [
        {
          kind: "formula",
          latex: "z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)",
          caption: "Tangent plane to $z = f(x, y)$ at $(a, b)$, and the linearisation $L(x, y)$",
        },
        {
          kind: "example",
          title: "Approximating a value",
          problem: "Estimate $f(1.1, 1.95)$ for $f(x, y) = x^{2}y$, using the point $(1, 2)$.",
          steps: [
            "$f(1, 2) = 2$, $f_x = 2xy = 4$, $f_y = x^{2} = 1$ at $(1, 2)$.",
            "$L = 2 + 4(0.1) + 1(-0.05) = 2.35$.",
          ],
          answer: "$\\approx 2.35$ (exact $1.21 \\times 1.95 = 2.3595$).",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Partials existing isn't differentiability",
          text:
            "$f(x, y) = \\frac{xy}{x^{2} + y^{2}}$ (with $f(0, 0) = 0$) has $f_x(0, 0) = f_y(0, 0) = 0$, yet it isn't even " +
            "continuous at the origin — along $y = x$ it equals $\\frac{1}{2}$. Continuous partials guarantee " +
            "differentiability; existence alone does not.",
        },
      ],
    },
    {
      heading: "The multivariable chain rule",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial z}{\\partial y}\\frac{dy}{dt}",
          caption: "For $z = f(x(t), y(t))$: add the contributions of every path from $t$ to $z$",
        },
        {
          kind: "example",
          title: "Along a curve",
          problem: "$z = x^{2} + y^{2}$ with $x = \\cos t$, $y = 2\\sin t$. Find $\\frac{dz}{dt}$ at $t = \\frac{\\pi}{4}$.",
          steps: [
            "$\\frac{dz}{dt} = 2x(-\\sin t) + 2y(2\\cos t) = -2\\cos t\\sin t + 8\\sin t\\cos t = 6\\sin t\\cos t$.",
            "At $t = \\frac{\\pi}{4}$: $6 \\cdot \\frac{1}{2}$.",
          ],
          answer: "$3$. (Directly: $z = \\cos^{2} t + 4\\sin^{2} t = 1 + 3\\sin^{2} t$, with derivative $6\\sin t\\cos t$.)",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Implicit differentiation, revisited",
          text:
            "If $F(x, y) = 0$ defines $y$ as a function of $x$, the chain rule gives $F_x + F_y\\frac{dy}{dx} = 0$, so " +
            "$\\frac{dy}{dx} = -\\frac{F_x}{F_y}$. For $x^{2} + y^{2} = 25$ that is $-\\frac{x}{y}$, as before.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§14.3 Partial Derivatives; §14.4 Tangent Planes and Linear Approximations; §14.5 The Chain Rule" },
    { source: "OpenStax, Calculus Volume 3", locator: "§4.3–§4.5" },
  ],
};
