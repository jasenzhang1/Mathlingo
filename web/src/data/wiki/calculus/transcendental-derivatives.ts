import type { WikiArticle } from "../types";

export const transcendentalDerivativesWiki: WikiArticle = {
  conceptId: "transcendental-derivatives",

  summary:
    "Reflecting a graph in the line $y = x$ swaps rise and run, so it turns a slope $m$ into $\\frac{1}{m}$. That is the " +
    "whole content of the inverse function rule, $(f^{-1})'(y) = \\frac{1}{f'(f^{-1}(y))}$. It gives the derivative of " +
    "$\\ln$ from $e^{x}$, of roots from powers, and — most usefully — of the inverse trig functions, whose derivatives " +
    "turn out to be algebraic.",

  sections: [
    {
      heading: "The inverse function rule",
      blocks: [
        {
          kind: "formula",
          latex: "(f^{-1})'(y) = \\frac{1}{f'(f^{-1}(y))} \\qquad \\text{equivalently} \\qquad \\frac{dx}{dy} = \\frac{1}{dy/dx}",
          caption: "Valid where $f$ is differentiable and one-to-one with $f'(f^{-1}(y)) \\ne 0$",
        },
        {
          kind: "prose",
          text:
            "Proof: differentiate $f(f^{-1}(y)) = y$ with the chain rule to get $f'(f^{-1}(y)) \\cdot (f^{-1})'(y) = 1$. The " +
            "rule is most useful at a single point: you rarely need a formula for $f^{-1}$, only the input $x$ with " +
            "$f(x) = y$.",
        },
        {
          kind: "example",
          title: "Without a formula for the inverse",
          problem: "Let $f(x) = x^{3} + x$ and $g = f^{-1}$. Find $g'(2)$.",
          steps: [
            "Find the input: $f(1) = 2$, so $g(2) = 1$.",
            "$f'(x) = 3x^{2} + 1$, so $f'(1) = 4$.",
          ],
          answer: "$g'(2) = \\frac{1}{4}$, though solving $x^{3} + x = y$ for $x$ would be painful.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Evaluate at the right point",
          text:
            "$(f^{-1})'(y)$ uses $f'$ at $f^{-1}(y)$, not at $y$. In the example, $f'(2) = 13$ is irrelevant; the slope of " +
            "$f$ at $x = 1$ is what matters.",
        },
      ],
    },
    {
      heading: "Inverse trigonometric functions",
      blocks: [
        {
          kind: "table",
          headers: ["$f(x)$", "Domain", "$f'(x)$"],
          rows: [
            ["$\\arcsin x$", "$[-1, 1]$", "$\\frac{1}{\\sqrt{1 - x^{2}}}$"],
            ["$\\arccos x$", "$[-1, 1]$", "$-\\frac{1}{\\sqrt{1 - x^{2}}}$"],
            ["$\\arctan x$", "$\\mathbb{R}$", "$\\frac{1}{1 + x^{2}}$"],
          ],
          caption: "Differentiable on the open intervals; the derivatives of $\\arcsin$ and $\\arccos$ blow up at $\\pm 1$",
        },
        {
          kind: "example",
          title: "Deriving $\\arcsin'$",
          problem: "Find $\\frac{d}{dx}\\arcsin x$.",
          steps: [
            "Let $y = \\arcsin x$, so $\\sin y = x$ with $y \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$.",
            "Differentiate: $\\cos y \\cdot y' = 1$, so $y' = \\frac{1}{\\cos y}$.",
            "On that interval $\\cos y \\ge 0$, so $\\cos y = \\sqrt{1 - \\sin^{2} y} = \\sqrt{1 - x^{2}}$.",
          ],
          answer: "$\\frac{1}{\\sqrt{1 - x^{2}}}$. The restricted range is what fixes the sign of the root.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why $\\arccos' = -\\arcsin'$",
          text:
            "$\\arcsin x + \\arccos x = \\frac{\\pi}{2}$ for every $x \\in [-1, 1]$, so their derivatives add to $0$. Likewise " +
            "$\\arctan x + \\arctan\\frac{1}{x} = \\frac{\\pi}{2}$ for $x > 0$.",
        },
      ],
    },
    {
      heading: "With the chain rule",
      blocks: [
        {
          kind: "list",
          items: [
            "$\\frac{d}{dx}\\arctan(2x) = \\frac{2}{1 + 4x^{2}}$.",
            "$\\frac{d}{dx}\\arcsin\\frac{x}{a} = \\frac{1}{\\sqrt{a^{2} - x^{2}}}$ for $a > 0$.",
            "$\\frac{d}{dx}\\arctan(e^{x}) = \\frac{e^{x}}{1 + e^{2x}}$.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Algebra from transcendental functions",
          text:
            "The inverse trig derivatives are algebraic, so read backwards they give antiderivatives that no polynomial " +
            "rule can: $\\int \\frac{dx}{1 + x^{2}} = \\arctan x + C$ and $\\int \\frac{dx}{\\sqrt{1 - x^{2}}} = \\arcsin x + C$.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§1.5 Inverse Functions and Logarithms; §3.5 (derivatives of inverse trigonometric functions)" },
    { source: "OpenStax, Calculus Volume 1", locator: "§3.7 Derivatives of Inverse Functions" },
  ],
};
