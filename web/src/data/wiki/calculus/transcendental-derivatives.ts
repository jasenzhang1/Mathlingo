import type { WikiArticle } from "../types";

export const transcendentalDerivativesWiki: WikiArticle = {
  conceptId: "transcendental-derivatives",

  summary:
    "Beyond polynomials, three families appear everywhere: exponentials, logarithms and trigonometric functions. " +
    "Their derivatives come from two limits — $\\lim_{h \\to 0} \\frac{e^{h} - 1}{h} = 1$ and " +
    "$\\lim_{h \\to 0} \\frac{\\sin h}{h} = 1$ — and from the rule for differentiating an inverse function. With the chain " +
    "rule, these give the derivative of almost any formula you will meet.",

  sections: [
    {
      heading: "The table",
      blocks: [
        {
          kind: "table",
          headers: ["$f(x)$", "$f'(x)$", "$f(x)$", "$f'(x)$"],
          rows: [
            ["$e^{x}$", "$e^{x}$", "$\\sin x$", "$\\cos x$"],
            ["$a^{x}$", "$a^{x} \\ln a$", "$\\cos x$", "$-\\sin x$"],
            ["$\\ln x$", "$\\frac{1}{x}$", "$\\tan x$", "$\\sec^{2} x$"],
            ["$\\log_a x$", "$\\frac{1}{x \\ln a}$", "$\\arcsin x$", "$\\frac{1}{\\sqrt{1 - x^{2}}}$"],
            ["$\\ln |x|$", "$\\frac{1}{x}$", "$\\arctan x$", "$\\frac{1}{1 + x^{2}}$"],
          ],
          caption: "Angles in radians — the trig formulas are false in degrees",
        },
        {
          kind: "prose",
          text:
            "$e$ is defined as the base for which $\\frac{e^{h} - 1}{h} \\to 1$, i.e. the exponential whose slope at $0$ is " +
            "$1$. Then $\\frac{e^{x + h} - e^{x}}{h} = e^{x} \\cdot \\frac{e^{h} - 1}{h} \\to e^{x}$: $e^{x}$ is its own derivative. " +
            "Any other base is $a^{x} = e^{x \\ln a}$, and the chain rule gives the factor $\\ln a$.",
        },
      ],
    },
    {
      heading: "Inverse functions",
      blocks: [
        {
          kind: "formula",
          latex: "(f^{-1})'(y) = \\frac{1}{f'(f^{-1}(y))}",
          caption: "Reflecting a graph in $y = x$ turns a slope $m$ into $\\frac{1}{m}$",
        },
        {
          kind: "example",
          title: "The derivative of $\\ln x$",
          problem: "Derive $\\frac{d}{dx} \\ln x$ from $e^{\\ln x} = x$.",
          steps: [
            "Differentiate both sides with the chain rule: $e^{\\ln x} \\cdot \\frac{d}{dx}\\ln x = 1$.",
            "But $e^{\\ln x} = x$, so $x \\cdot \\frac{d}{dx}\\ln x = 1$.",
          ],
          answer: "$\\frac{d}{dx}\\ln x = \\frac{1}{x}$. The same trick on $\\sin(\\arcsin x) = x$ gives $\\frac{1}{\\cos(\\arcsin x)} = \\frac{1}{\\sqrt{1 - x^{2}}}$.",
        },
      ],
    },
    {
      heading: "Combining with the chain rule",
      blocks: [
        {
          kind: "list",
          items: [
            "$\\frac{d}{dx} e^{g(x)} = e^{g(x)} g'(x)$ — e.g. $\\frac{d}{dx} e^{-x^{2}} = -2x e^{-x^{2}}$.",
            "$\\frac{d}{dx} \\ln g(x) = \\frac{g'(x)}{g(x)}$, the **logarithmic derivative** — e.g. $\\frac{d}{dx} \\ln(x^{2} + 1) = \\frac{2x}{x^{2} + 1}$.",
            "$\\frac{d}{dx} \\sin(kx) = k\\cos(kx)$, and $\\frac{d}{dx} \\sin^{2} x = 2\\sin x \\cos x = \\sin 2x$.",
          ],
        },
        {
          kind: "example",
          title: "Logarithmic differentiation",
          problem: "Differentiate $y = x^{x}$ for $x > 0$.",
          steps: [
            "Neither the power rule (variable exponent) nor the exponential rule (variable base) applies.",
            "Take logs: $\\ln y = x \\ln x$.",
            "Differentiate: $\\frac{y'}{y} = \\ln x + 1$.",
          ],
          answer: "$y' = x^{x}(\\ln x + 1)$. At $x = 1$, the slope is $1$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Power rule versus exponential rule",
          text:
            "$\\frac{d}{dx} x^{3} = 3x^{2}$ (variable base, fixed exponent), but $\\frac{d}{dx} 3^{x} = 3^{x}\\ln 3$ " +
            "(fixed base, variable exponent). Applying the power rule to $3^{x}$ to get $x \\cdot 3^{x - 1}$ is wrong.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Growth proportional to size",
          text:
            "$y' = ky$ says the rate of change is proportional to the current amount; its solutions are exactly " +
            "$y = Ce^{kt}$. That is why exponentials model populations, compound interest and radioactive decay.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§3.1 (exponentials); §3.3 Derivatives of Trigonometric Functions; §3.6 Derivatives of Logarithmic Functions; §3.5 (inverse trig)" },
    { source: "OpenStax, Calculus Volume 1", locator: "§3.5, §3.7, §3.9" },
  ],
};
