import type { WikiArticle } from "../types";

export const fundamentalTheoremOfCalculusWiki: WikiArticle = {
  conceptId: "fundamental-theorem-of-calculus",

  summary:
    "The fundamental theorem says that differentiation and integration are inverse processes. Part 1: the " +
    "accumulated area $\\int_a^x f(t)\\,dt$ changes at rate $f(x)$. Part 2: to compute $\\int_a^b f$, find any " +
    "antiderivative $F$ and subtract, $F(b) - F(a)$. A limit of infinitely many rectangles collapses to evaluating a " +
    "function at two points.",

  sections: [
    {
      heading: "The two parts",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{d}{dx} \\int_a^x f(t)\\,dt = f(x)",
          caption: "Part 1, for $f$ continuous: the area function is an antiderivative of $f$",
        },
        {
          kind: "formula",
          latex: "\\int_a^b f(x)\\,dx = F(b) - F(a) = \\Big[F(x)\\Big]_a^b \\quad \\text{whenever } F' = f",
          caption: "Part 2 (evaluation theorem)",
        },
        {
          kind: "prose",
          text:
            "Why Part 1 holds: increasing $x$ by $h$ adds a thin strip of width $h$ and height about $f(x)$ to the area, " +
            "so $\\frac{A(x + h) - A(x)}{h} \\approx f(x)$, with equality in the limit. Part 2 follows: $A$ and $F$ have " +
            "the same derivative, so by the mean value theorem they differ by a constant, which cancels in $F(b) - F(a)$.",
        },
      ],
    },
    {
      heading: "Antiderivatives",
      blocks: [
        {
          kind: "table",
          headers: ["$f(x)$", "$\\int f(x)\\,dx$"],
          rows: [
            ["$x^{n}$ ($n \\ne -1$)", "$\\frac{x^{n + 1}}{n + 1} + C$"],
            ["$\\frac{1}{x}$", "$\\ln|x| + C$"],
            ["$e^{kx}$", "$\\frac{1}{k}e^{kx} + C$"],
            ["$\\sin x$, $\\cos x$", "$-\\cos x + C$, $\\sin x + C$"],
            ["$\\sec^{2} x$", "$\\tan x + C$"],
            ["$\\frac{1}{1 + x^{2}}$, $\\frac{1}{\\sqrt{1 - x^{2}}}$", "$\\arctan x + C$, $\\arcsin x + C$"],
          ],
          caption: "Every derivative rule read backwards",
        },
        {
          kind: "example",
          title: "Evaluating a definite integral",
          problem: "Compute $\\int_1^{3} (3x^{2} - 2x + 1)\\,dx$.",
          steps: [
            "Antiderivative: $F(x) = x^{3} - x^{2} + x$.",
            "$F(3) = 27 - 9 + 3 = 21$; $F(1) = 1 - 1 + 1 = 1$.",
          ],
          answer: "$21 - 1 = 20$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The $+ C$ and the absolute value",
          text:
            "An indefinite integral is a family: $\\int 2x\\,dx = x^{2} + C$. In a definite integral the $C$ cancels. And " +
            "$\\int \\frac{1}{x}\\,dx = \\ln|x| + C$ — the absolute value makes it valid for $x < 0$ too — but you can " +
            "never integrate $\\frac{1}{x}$ across $0$.",
        },
      ],
    },
    {
      heading: "Differentiating integrals",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{d}{dx} \\int_{a(x)}^{b(x)} f(t)\\,dt = f(b(x))\\,b'(x) - f(a(x))\\,a'(x)",
          caption: "Part 1 with the chain rule",
        },
        {
          kind: "example",
          title: "A variable upper limit",
          problem: "Find $\\frac{d}{dx} \\int_0^{x^{2}} \\cos t\\,dt$.",
          steps: [
            "With $u = x^{2}$, the integral is $G(u) = \\int_0^{u} \\cos t\\,dt$, and $G'(u) = \\cos u$.",
            "Chain rule: $\\cos(x^{2}) \\cdot 2x$.",
          ],
          answer: "$2x\\cos(x^{2})$. (Check: the integral is $\\sin(x^{2})$, whose derivative is the same.)",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Functions defined by integrals",
          text:
            "Part 1 guarantees every continuous $f$ has an antiderivative, even when no formula exists. The normal CDF " +
            "$\\Phi(x) = \\int_{-\\infty}^{x} \\frac{1}{\\sqrt{2\\pi}}e^{-t^{2}/2}\\,dt$ is such a function, and its derivative " +
            "is the density — Part 1 is why a CDF differentiates to a PDF.",
        },
        {
          kind: "prose",
          text:
            "Net change: $\\int_a^b F'(x)\\,dx = F(b) - F(a)$. Integrating a velocity gives displacement; integrating a " +
            "flow rate gives the total that flowed. The **average value** of $f$ on $[a, b]$ is $\\frac{1}{b - a}\\int_a^b f$, " +
            "and the mean value theorem for integrals says $f$ attains it somewhere.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§4.9 Antiderivatives; §5.3 The Fundamental Theorem of Calculus; §5.4 Indefinite Integrals and the Net Change Theorem" },
    { source: "Spivak, Calculus", locator: "Ch. 14, The Fundamental Theorem of Calculus" },
  ],
};
