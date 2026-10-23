import type { WikiArticle } from "../types";

export const implicitDifferentiationWiki: WikiArticle = {
  conceptId: "implicit-differentiation",

  summary:
    "Many curves are given by an equation like $x^{2} + y^{2} = 25$ rather than a formula $y = f(x)$. Implicit " +
    "differentiation finds $\\frac{dy}{dx}$ anyway: differentiate both sides with respect to $x$, treating $y$ as an " +
    "unknown function of $x$ (so every $y$-term picks up a factor $\\frac{dy}{dx}$ by the chain rule), then solve. " +
    "Related rates applies the same idea with time as the variable: an equation linking quantities becomes an " +
    "equation linking their rates.",

  sections: [
    {
      heading: "Implicit differentiation",
      blocks: [
        {
          kind: "example",
          title: "Tangent to a circle",
          problem: "Find $\\frac{dy}{dx}$ on $x^{2} + y^{2} = 25$ and the tangent slope at $(3, 4)$.",
          steps: [
            "Differentiate in $x$: $2x + 2y\\frac{dy}{dx} = 0$ (the chain rule on $y^{2}$).",
            "Solve: $\\frac{dy}{dx} = -\\frac{x}{y}$.",
            "At $(3, 4)$: $-\\frac{3}{4}$.",
          ],
          answer: "$-\\frac{3}{4}$ — perpendicular to the radius, whose slope is $\\frac{4}{3}$, as geometry demands.",
        },
        {
          kind: "example",
          title: "A product in the equation",
          problem: "Find $\\frac{dy}{dx}$ for $x^{3} + xy + y^{3} = 3$ at $(1, 1)$.",
          steps: [
            "Differentiate: $3x^{2} + \\left(y + x\\frac{dy}{dx}\\right) + 3y^{2}\\frac{dy}{dx} = 0$ — the product rule on $xy$.",
            "Collect: $\\frac{dy}{dx}(x + 3y^{2}) = -(3x^{2} + y)$.",
            "At $(1, 1)$: $\\frac{dy}{dx} = -\\frac{4}{4}$.",
          ],
          answer: "$-1$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Every $y$ is a function of $x$",
          text:
            "$\\frac{d}{dx} y^{2} = 2y\\frac{dy}{dx}$, not $2y$; $\\frac{d}{dx} (xy) = y + xy'$, not $y'$. And the derivative " +
            "of the constant on the right is $0$.",
        },
        {
          kind: "prose",
          text:
            "The answer usually involves both $x$ and $y$, because the curve may have several points above one $x$ " +
            "(the circle has $(3, 4)$ and $(3, -4)$) with different slopes. Where the coefficient of $\\frac{dy}{dx}$ " +
            "vanishes, the tangent may be vertical.",
        },
      ],
    },
    {
      heading: "Related rates",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Name the changing quantities and write what's given and wanted as derivatives in $t$.",
            "Write an equation linking the quantities (geometry, Pythagoras, similar triangles), valid at all times.",
            "Differentiate both sides with respect to $t$.",
            "Only now substitute the numbers for the instant asked about, and solve.",
          ],
        },
        {
          kind: "example",
          title: "The sliding ladder",
          problem:
            "A $10$ m ladder leans on a wall. Its foot slides away at $1$ m/s. How fast is the top falling when the foot " +
            "is $6$ m from the wall?",
          steps: [
            "Foot distance $x$, top height $y$: $x^{2} + y^{2} = 100$.",
            "Differentiate in $t$: $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$.",
            "When $x = 6$, $y = 8$. Substitute $\\frac{dx}{dt} = 1$: $12 + 16\\frac{dy}{dt} = 0$.",
          ],
          answer: "$\\frac{dy}{dt} = -\\frac{3}{4}$ m/s: the top falls at $0.75$ m/s.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Don't substitute too early",
          text:
            "Plugging $x = 6$ into the equation before differentiating turns a changing quantity into a constant, and its " +
            "rate into $0$. Differentiate the general relationship first; substitute the snapshot values after.",
        },
        {
          kind: "example",
          title: "Filling a cone",
          problem:
            "Water flows at $2$ cm³/s into an inverted cone with height equal to twice its radius. How fast is the depth " +
            "rising when it is $4$ cm?",
          steps: [
            "Similar triangles: $r = \\frac{h}{2}$, so $V = \\frac{1}{3}\\pi r^{2}h = \\frac{\\pi h^{3}}{12}$.",
            "Differentiate: $\\frac{dV}{dt} = \\frac{\\pi h^{2}}{4}\\frac{dh}{dt}$.",
            "At $h = 4$: $2 = 4\\pi\\frac{dh}{dt}$.",
          ],
          answer: "$\\frac{dh}{dt} = \\frac{1}{2\\pi} \\approx 0.159$ cm/s.",
        },
      ],
    },
    {
      heading: "Where implicit differentiation leads",
      blocks: [
        {
          kind: "formula",
          latex: "F(x, y) = 0 \\;\\implies\\; \\frac{dy}{dx} = -\\frac{F_x}{F_y} \\quad (F_y \\ne 0)",
          caption: "The general pattern, made precise by partial derivatives and the implicit function theorem",
        },
        {
          kind: "prose",
          text:
            "Every example above is this formula in disguise: differentiate each side, collect the $\\frac{dy}{dx}$ terms, " +
            "divide. Where $F_y = 0$ the curve may have a vertical tangent, a cusp or a crossing, and $y$ need not be a " +
            "differentiable function of $x$ there.",
        },
        {
          kind: "list",
          items: [
            "**Inverse functions.** $y = \\arcsin x$ means $\\sin y = x$; differentiating implicitly gives $\\cos y \\cdot y' = 1$, the derivative of $\\arcsin$.",
            "**Rational powers.** $y = x^{p/q}$ means $y^{q} = x^{p}$, and implicit differentiation proves the power rule for rational exponents.",
            "**Logarithmic differentiation.** Taking $\\ln$ of both sides first and then differentiating implicitly handles $x^{x}$ and long products.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§3.5 Implicit Differentiation; §3.9 Related Rates" },
    { source: "OpenStax, Calculus Volume 1", locator: "§3.8 Implicit Differentiation; §4.1 Related Rates" },
  ],
};
