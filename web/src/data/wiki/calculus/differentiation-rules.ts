import type { WikiArticle } from "../types";

export const differentiationRulesWiki: WikiArticle = {
  conceptId: "differentiation-rules",

  summary:
    "A handful of rules, each proved once from the limit definition, differentiate every polynomial and rational " +
    "function mechanically: the power rule for $x^{n}$, linearity for sums and constant multiples, and the product and " +
    "quotient rules for products and ratios. The product rule is the one people get wrong — the derivative of a " +
    "product is $\\textbf{NOT}$ the product of the derivatives.",

  sections: [
    {
      heading: "The rules",
      blocks: [
        {
          kind: "table",
          headers: ["Rule", "Formula"],
          rows: [
            ["Constant", "$\\frac{d}{dx} c = 0$"],
            ["Power", "$\\frac{d}{dx} x^{n} = n x^{n - 1}$ (any real $n$)"],
            ["Constant multiple", "$(cf)' = c f'$"],
            ["Sum", "$(f + g)' = f' + g'$"],
            ["Product", "$(fg)' = f'g + fg'$"],
            ["Quotient", "$\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^{2}}$"],
          ],
        },
        {
          kind: "prose",
          text:
            "The power rule holds for every real exponent, which covers roots and reciprocals once they are rewritten: " +
            "$\\sqrt{x} = x^{1/2}$ has derivative $\\frac{1}{2}x^{-1/2}$, and $\\frac{1}{x^{3}} = x^{-3}$ has derivative $-3x^{-4}$.",
        },
      ],
    },
    {
      heading: "Why the product rule looks the way it does",
      blocks: [
        {
          kind: "prose",
          text:
            "Think of $f(x)g(x)$ as the area of a rectangle with sides $f$ and $g$. Nudge $x$ by $h$: the sides grow by " +
            "$\\Delta f$ and $\\Delta g$, and the area grows by $\\Delta f \\cdot g + f \\cdot \\Delta g + \\Delta f \\, \\Delta g$. " +
            "Divide by $h$ and let $h \\to 0$: the first two strips give $f'g + fg'$, and the corner $\\Delta f \\, \\Delta g$ " +
            "is second-order small and vanishes.",
        },
        {
          kind: "example",
          title: "Product rule",
          problem: "Differentiate $y = (x^{2} + 1)(3x - 5)$.",
          steps: [
            "$f = x^{2} + 1$, $f' = 2x$; $g = 3x - 5$, $g' = 3$.",
            "$y' = 2x(3x - 5) + 3(x^{2} + 1) = 6x^{2} - 10x + 3x^{2} + 3$.",
          ],
          answer: "$y' = 9x^{2} - 10x + 3$ (expanding first, $3x^{3} - 5x^{2} + 3x - 5$, gives the same).",
        },
        {
          kind: "example",
          title: "Quotient rule",
          problem: "Differentiate $y = \\frac{x}{x^{2} + 1}$ and find where the tangent is horizontal.",
          steps: [
            "$f = x$, $f' = 1$; $g = x^{2} + 1$, $g' = 2x$.",
            "$y' = \\frac{(x^{2} + 1) - x \\cdot 2x}{(x^{2} + 1)^{2}} = \\frac{1 - x^{2}}{(x^{2} + 1)^{2}}$.",
            "$y' = 0$ when $1 - x^{2} = 0$.",
          ],
          answer: "$y' = \\frac{1 - x^{2}}{(x^{2} + 1)^{2}}$, horizontal at $x = \\pm 1$.",
        },
      ],
    },
    {
      heading: "Pitfalls and higher derivatives",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Order matters in the quotient rule",
          text:
            "The numerator is $f'g - fg'$ — “low d-high minus high d-low”. Swapping the terms flips the sign of the " +
            "answer. When the denominator is a constant or a single power, skip the rule: $\\frac{x^{3} + 1}{x} = x^{2} + x^{-1}$.",
        },
        {
          kind: "prose",
          text:
            "Differentiating again gives the **second derivative** $f''$ (acceleration, if $f$ is position), then " +
            "$f'''$ and $f^{(n)}$. A polynomial of degree $n$ has $f^{(n)}$ constant ($n!$ times the leading " +
            "coefficient) and $f^{(n + 1)} = 0$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Leibniz's rule",
          text:
            "The product rule iterates like the binomial theorem: $(fg)^{(n)} = \\sum_{k=0}^{n} \\binom{n}{k} f^{(k)} g^{(n - k)}$. " +
            "For $n = 2$: $(fg)'' = f''g + 2f'g' + fg''$.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§3.1 Derivatives of Polynomials and Exponential Functions; §3.2 The Product and Quotient Rules" },
    { source: "OpenStax, Calculus Volume 1", locator: "§3.3 Differentiation Rules" },
  ],
};
