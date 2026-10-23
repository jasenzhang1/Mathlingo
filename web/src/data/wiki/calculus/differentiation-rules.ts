import type { WikiArticle } from "../types";

export const differentiationRulesWiki: WikiArticle = {
  conceptId: "differentiation-rules",

  summary:
    "Linearity handles sums; the product and quotient rules handle the other two ways of combining functions. The " +
    "derivative of a product is $\\textbf{NOT}$ the product of the derivatives: $(fg)' = f'g + fg'$, one term for each " +
    "factor taking its turn to change. The quotient rule follows from it. With the power rule, these two differentiate " +
    "every rational function.",

  sections: [
    {
      heading: "The rules",
      blocks: [
        {
          kind: "formula",
          latex: "(fg)' = f'g + fg' \\qquad \\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^{2}}",
          caption: "Product rule and quotient rule (where $g \\ne 0$)",
        },
        {
          kind: "prose",
          text:
            "Think of $f(x)g(x)$ as the area of a rectangle with sides $f$ and $g$. Nudge $x$ by $h$: the sides grow by " +
            "$\\Delta f$ and $\\Delta g$, and the area grows by $\\Delta f \\cdot g + f \\cdot \\Delta g + \\Delta f\\,\\Delta g$. " +
            "Divide by $h$ and let $h \\to 0$: the two strips give $f'g + fg'$, and the corner $\\Delta f\\,\\Delta g$ is " +
            "second-order small and vanishes.",
        },
        {
          kind: "prose",
          text:
            "The quotient rule comes from the product rule: write $f = q \\cdot g$ with $q = \\frac{f}{g}$, differentiate to " +
            "get $f' = q'g + qg'$, and solve for $q'$.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
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
        {
          kind: "example",
          title: "From values alone",
          problem: "$f(2) = 3$, $f'(2) = -1$, $g(2) = 4$, $g'(2) = 5$. Find $(fg)'(2)$ and $\\left(\\frac{f}{g}\\right)'(2)$.",
          steps: [
            "$(fg)'(2) = (-1)(4) + (3)(5) = 11$.",
            "$\\left(\\frac{f}{g}\\right)'(2) = \\frac{(-1)(4) - (3)(5)}{4^{2}} = -\\frac{19}{16}$.",
          ],
          answer: "$11$ and $-\\frac{19}{16}$.",
        },
      ],
    },
    {
      heading: "Pitfalls and extensions",
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
          kind: "list",
          items: [
            "Three factors: $(fgh)' = f'gh + fg'h + fgh'$ — each factor takes one turn.",
            "Reciprocal rule: $\\left(\\frac{1}{g}\\right)' = -\\frac{g'}{g^{2}}$, the quotient rule with $f = 1$.",
            "Second derivative of a product: $(fg)'' = f''g + 2f'g' + fg''$, the start of Leibniz's rule $(fg)^{(n)} = \\sum_{k} \\binom{n}{k} f^{(k)}g^{(n - k)}$.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§3.2 The Product and Quotient Rules" },
    { source: "OpenStax, Calculus Volume 1", locator: "§3.3 Differentiation Rules" },
  ],
};
