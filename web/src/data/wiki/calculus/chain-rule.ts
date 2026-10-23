import type { WikiArticle } from "../types";

export const chainRuleWiki: WikiArticle = {
  conceptId: "chain-rule",

  summary:
    "The chain rule differentiates compositions. If $y$ depends on $u$ and $u$ depends on $x$, then the rate of $y$ " +
    "with respect to $x$ is the product of the two rates: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$. It is " +
    "the most-used rule in calculus — every function built by nesting needs it — and it is exactly the rule that " +
    "backpropagation applies through a neural network.",

  sections: [
    {
      heading: "The rule",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{d}{dx} f(g(x)) = f'(g(x)) \\cdot g'(x) \\qquad \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}",
          caption: "Derivative of the outer function, evaluated at the inner one, times the derivative of the inner function",
        },
        {
          kind: "prose",
          text:
            "Rates multiply along a chain: if $u$ changes $3$ times as fast as $x$, and $y$ changes $2$ times as fast as " +
            "$u$, then $y$ changes $6$ times as fast as $x$. The key detail is *where* $f'$ is evaluated — at $g(x)$, " +
            "not at $x$.",
        },
        {
          kind: "example",
          title: "A power of a polynomial",
          problem: "Differentiate $y = (x^{2} + 3x)^{5}$.",
          steps: [
            "Outer $f(u) = u^{5}$, $f'(u) = 5u^{4}$. Inner $u = x^{2} + 3x$, $u' = 2x + 3$.",
            "$y' = 5(x^{2} + 3x)^{4} \\cdot (2x + 3)$.",
          ],
          answer: "$y' = 5(2x + 3)(x^{2} + 3x)^{4}$ — no need to expand the fifth power.",
        },
        {
          kind: "example",
          title: "A square root",
          problem: "Find the slope of $y = \\sqrt{x^{2} + 9}$ at $x = 4$.",
          steps: [
            "$y = u^{1/2}$ with $u = x^{2} + 9$: $y' = \\frac{1}{2}u^{-1/2} \\cdot 2x = \\frac{x}{\\sqrt{x^{2} + 9}}$.",
            "At $x = 4$: $\\frac{4}{\\sqrt{25}}$.",
          ],
          answer: "$\\frac{4}{5} = 0.8$.",
        },
      ],
    },
    {
      heading: "Longer chains and combinations",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{d}{dx} f(g(h(x))) = f'(g(h(x))) \\cdot g'(h(x)) \\cdot h'(x)",
          caption: "Work from the outside in, one layer at a time",
        },
        {
          kind: "prose",
          text:
            "The chain rule combines with the product and quotient rules: differentiate the overall structure first, " +
            "and apply the chain rule to each piece that is itself a composition. For $y = x^{2}(1 - x)^{3}$: " +
            "$y' = 2x(1 - x)^{3} + x^{2} \\cdot 3(1 - x)^{2} \\cdot (-1) = x(1 - x)^{2}(2 - 5x)$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The forgotten inner derivative",
          text:
            "The commonest error is writing $\\frac{d}{dx}(3x + 1)^{4} = 4(3x + 1)^{3}$ and dropping the factor $3$. " +
            "Quick check: if the inner function were just $x$, would your answer still be right? If the inner function " +
            "is not $x$, there must be an extra factor.",
        },
      ],
    },
    {
      heading: "Why it is true",
      blocks: [
        {
          kind: "prose",
          text:
            "Write $\\Delta u = g(x + h) - g(x)$. Then $\\frac{\\Delta y}{h} = \\frac{\\Delta y}{\\Delta u} \\cdot \\frac{\\Delta u}{h}$, " +
            "and as $h \\to 0$ continuity gives $\\Delta u \\to 0$, so the two factors tend to $f'(g(x))$ and $g'(x)$. " +
            "(The careful proof handles the case where $\\Delta u = 0$ for small $h$, which the cancellation glosses over.)",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Linearisations compose",
          text:
            "Near $x$, $g$ acts like multiplication by $g'(x)$ and, near $g(x)$, $f$ acts like multiplication by " +
            "$f'(g(x))$. Composing two linear maps multiplies their slopes. In several variables the slopes become " +
            "Jacobian matrices and the product becomes matrix multiplication.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§3.4 The Chain Rule" },
    { source: "Spivak, Calculus", locator: "Ch. 10, Differentiation (Theorem 9)" },
  ],
};
