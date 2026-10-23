import type { WikiArticle } from "../types";

export const trigDerivativesWiki: WikiArticle = {
  conceptId: "trig-derivatives",

  summary:
    "Two limits, $\\lim_{h \\to 0}\\frac{\\sin h}{h} = 1$ and $\\lim_{h \\to 0}\\frac{\\cos h - 1}{h} = 0$, give the derivatives of " +
    "sine and cosine; the quotient rule then gives the other four trig functions. The derivatives of $\\sin$ and " +
    "$\\cos$ chase each other in a four-step cycle, which is why they model anything that oscillates — and every " +
    "formula here assumes angles in radians.",

  sections: [
    {
      heading: "Sine and cosine",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{d}{dx}\\sin x = \\cos x \\qquad \\frac{d}{dx}\\cos x = -\\sin x",
        },
        {
          kind: "example",
          title: "Deriving $\\sin' = \\cos$",
          problem: "Use the angle-addition formula and the two limits.",
          steps: [
            "$\\sin(x + h) = \\sin x\\cos h + \\cos x\\sin h$.",
            "So the difference quotient is $\\sin x \\cdot \\frac{\\cos h - 1}{h} + \\cos x \\cdot \\frac{\\sin h}{h}$.",
            "As $h \\to 0$ this tends to $\\sin x \\cdot 0 + \\cos x \\cdot 1$.",
          ],
          answer: "$\\cos x$. The same method gives $\\cos' = -\\sin$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The four-step cycle",
          text:
            "$\\sin \\to \\cos \\to -\\sin \\to -\\cos \\to \\sin$. So $\\frac{d^{n}}{dx^{n}}\\sin x$ depends only on $n \\bmod 4$, " +
            "and $y = \\sin x$ and $y = \\cos x$ both satisfy $y'' = -y$ — the equation of simple harmonic motion.",
        },
      ],
    },
    {
      heading: "The other four",
      blocks: [
        {
          kind: "table",
          headers: ["$f(x)$", "$f'(x)$"],
          rows: [
            ["$\\tan x$", "$\\sec^{2} x$"],
            ["$\\cot x$", "$-\\csc^{2} x$"],
            ["$\\sec x$", "$\\sec x\\tan x$"],
            ["$\\csc x$", "$-\\csc x\\cot x$"],
          ],
          caption: "Each comes from writing the function in terms of $\\sin$ and $\\cos$ and using the quotient rule; the “co-” functions carry a minus sign",
        },
        {
          kind: "example",
          title: "Tangent",
          problem: "Show $\\frac{d}{dx}\\tan x = \\sec^{2} x$.",
          steps: [
            "$\\tan x = \\frac{\\sin x}{\\cos x}$; quotient rule: $\\frac{\\cos x \\cdot \\cos x - \\sin x \\cdot (-\\sin x)}{\\cos^{2} x}$.",
            "The numerator is $\\cos^{2} x + \\sin^{2} x = 1$.",
          ],
          answer: "$\\frac{1}{\\cos^{2} x} = \\sec^{2} x$, always positive: $\\tan$ increases on each branch.",
        },
      ],
    },
    {
      heading: "With the chain rule, and why radians",
      blocks: [
        {
          kind: "list",
          items: [
            "$\\frac{d}{dx}\\sin(kx) = k\\cos(kx)$: a faster oscillation has proportionally steeper slopes.",
            "$\\frac{d}{dx}\\sin^{2} x = 2\\sin x\\cos x = \\sin 2x$.",
            "$\\frac{d}{dx}\\cos(x^{2}) = -2x\\sin(x^{2})$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Degrees break the formulas",
          text:
            "In degrees, $\\sin(x^{\\circ}) = \\sin\\left(\\frac{\\pi x}{180}\\right)$, so its derivative is $\\frac{\\pi}{180}\\cos(x^{\\circ})$. " +
            "The clean formulas — and $\\frac{\\sin h}{h} \\to 1$ — hold only in radians, which is why calculus always uses them.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§3.3 Derivatives of Trigonometric Functions" },
    { source: "OpenStax, Calculus Volume 1", locator: "§3.5 Derivatives of Trigonometric Functions" },
  ],
};
