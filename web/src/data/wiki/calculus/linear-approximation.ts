import type { WikiArticle } from "../types";

export const linearApproximationWiki: WikiArticle = {
  conceptId: "linear-approximation",

  summary:
    "Zoom in far enough on a differentiable function and its graph looks like its tangent line. Linear approximation " +
    "uses that line as a stand-in: $f(x) \\approx f(a) + f'(a)(x - a)$ near $a$. It gives quick estimates of values " +
    "like $\\sqrt{4.1}$, tells you how errors in a measurement propagate into a computed quantity, and is the first " +
    "step toward Taylor polynomials and Newton's method.",

  sections: [
    {
      heading: "The linearisation",
      blocks: [
        {
          kind: "formula",
          latex: "L(x) = f(a) + f'(a)(x - a), \\qquad f(x) \\approx L(x) \\text{ for } x \\text{ near } a",
          caption: "The linearisation of $f$ at $a$",
        },
        {
          kind: "example",
          title: "Estimating a square root",
          problem: "Estimate $\\sqrt{4.1}$.",
          steps: [
            "Use $f(x) = \\sqrt{x}$ at $a = 4$, where everything is easy: $f(4) = 2$, $f'(x) = \\frac{1}{2\\sqrt{x}}$, so $f'(4) = \\frac{1}{4}$.",
            "$L(4.1) = 2 + \\frac{1}{4}(0.1) = 2.025$.",
          ],
          answer: "$\\sqrt{4.1} \\approx 2.025$ (true value $2.02485\\ldots$), an overestimate because $\\sqrt{x}$ is concave down and lies below its tangents.",
        },
        {
          kind: "table",
          headers: ["Near $x = 0$", "Linear approximation"],
          rows: [
            ["$\\sin x$", "$x$"],
            ["$\\tan x$", "$x$"],
            ["$e^{x}$", "$1 + x$"],
            ["$\\ln(1 + x)$", "$x$"],
            ["$(1 + x)^{k}$", "$1 + kx$"],
          ],
          caption: "Workhorse approximations; $(1 + x)^{k} \\approx 1 + kx$ is the binomial approximation",
        },
      ],
    },
    {
      heading: "Differentials and error propagation",
      blocks: [
        {
          kind: "formula",
          latex: "dy = f'(x)\\,dx, \\qquad \\Delta y \\approx dy",
          caption: "The differential: the change along the tangent line",
        },
        {
          kind: "example",
          title: "Measurement error",
          problem: "A sphere's radius is measured as $10$ cm with a possible error of $0.05$ cm. Estimate the error in its computed volume.",
          steps: [
            "$V = \\frac{4}{3}\\pi r^{3}$, so $dV = 4\\pi r^{2} \\, dr$.",
            "$dV = 4\\pi (100)(0.05) = 20\\pi$.",
            "Relative error: $\\frac{dV}{V} = 3\\frac{dr}{r} = 3(0.005) = 0.015$.",
          ],
          answer: "About $20\\pi \\approx 62.8$ cm³, or $1.5\\%$ — three times the $0.5\\%$ relative error in $r$, because volume scales as $r^{3}$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Relative errors and powers",
          text:
            "For $y = x^{k}$, $\\frac{dy}{y} = k\\frac{dx}{x}$: a power multiplies relative error by its exponent. Squaring " +
            "doubles the percentage error; a square root halves it.",
        },
      ],
    },
    {
      heading: "How good is the approximation?",
      blocks: [
        {
          kind: "formula",
          latex: "f(x) - L(x) = \\frac{f''(c)}{2}(x - a)^{2} \\text{ for some } c \\text{ between } a \\text{ and } x",
          caption: "The error is second order: halving the distance roughly quarters it",
        },
        {
          kind: "prose",
          text:
            "So if $|f''| \\le M$ near $a$, the error is at most $\\frac{M}{2}(x - a)^{2}$. The sign of $f''$ decides the " +
            "direction: concave up means the tangent line underestimates, concave down means it overestimates. For " +
            "$\\sqrt{4.1}$, $|f''| \\le \\frac{1}{32}$ near $4$, so the error is at most $\\frac{1}{64}(0.01) \\approx 0.00016$ — " +
            "consistent with the true error of $0.00015$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Only near $a$",
          text:
            "$\\sin x \\approx x$ is excellent at $x = 0.1$ (error about $0.00017$) and useless at $x = 3$. The approximation " +
            "is local; the error grows like the square of the distance.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Newton's method",
          text:
            "To solve $f(x) = 0$, replace $f$ by its linearisation and solve that instead: $x_{1} = x_{0} - \\frac{f(x_{0})}{f'(x_{0})}$. " +
            "Repeating this is Newton's method, covered in the Optimization course.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§3.10 Linear Approximations and Differentials" },
    { source: "OpenStax, Calculus Volume 1", locator: "§4.2 Linear Approximations and Differentials" },
  ],
};
