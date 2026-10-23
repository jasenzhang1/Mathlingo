import type { WikiArticle } from "../types";

export const powerRuleWiki: WikiArticle = {
  conceptId: "power-rule",

  summary:
    "The power rule, $\\frac{d}{dx}x^{n} = nx^{n - 1}$, says: bring the exponent down as a factor and lower it by one. " +
    "It holds for every real exponent, so once roots and reciprocals are rewritten as powers it covers $\\sqrt{x}$, " +
    "$\\frac{1}{x^{3}}$ and $x^{\\pi}$ alike. With linearity it differentiates every polynomial on sight.",

  sections: [
    {
      heading: "The rule and why it holds",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{d}{dx}x^{n} = nx^{n - 1}",
          caption: "For every real $n$ (on the domain where $x^{n}$ is defined)",
        },
        {
          kind: "prose",
          text:
            "For a positive integer $n$, expand with the binomial theorem: $(x + h)^{n} = x^{n} + nx^{n - 1}h + " +
            "\\binom{n}{2}x^{n - 2}h^{2} + \\cdots$. Subtracting $x^{n}$ and dividing by $h$ leaves $nx^{n - 1}$ plus terms that " +
            "still contain $h$, which vanish in the limit. Negative and fractional exponents follow from the quotient " +
            "rule and implicit differentiation, and real exponents from $x^{n} = e^{n\\ln x}$.",
        },
        {
          kind: "table",
          headers: ["Function", "Rewrite", "Derivative"],
          rows: [
            ["$\\sqrt{x}$", "$x^{1/2}$", "$\\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$"],
            ["$\\frac{1}{x}$", "$x^{-1}$", "$-x^{-2} = -\\frac{1}{x^{2}}$"],
            ["$\\frac{1}{x^{3}}$", "$x^{-3}$", "$-3x^{-4}$"],
            ["$\\sqrt[3]{x^{2}}$", "$x^{2/3}$", "$\\frac{2}{3}x^{-1/3}$"],
            ["$x$", "$x^{1}$", "$1$"],
          ],
        },
      ],
    },
    {
      heading: "Polynomials and tangent lines",
      blocks: [
        {
          kind: "example",
          title: "A polynomial",
          problem: "Differentiate $p(x) = 2x^{5} - 4x^{3} + x - 9$.",
          steps: [
            "Linearity lets each term be differentiated separately.",
            "Power rule on each: $2 \\cdot 5x^{4} - 4 \\cdot 3x^{2} + 1 - 0$.",
          ],
          answer: "$p'(x) = 10x^{4} - 12x^{2} + 1$.",
        },
        {
          kind: "example",
          title: "A tangent line",
          problem: "Find the tangent line to $y = \\sqrt{x}$ at $x = 4$.",
          steps: [
            "$y' = \\frac{1}{2\\sqrt{x}}$, so the slope at $4$ is $\\frac{1}{4}$.",
            "The point is $(4, 2)$: $y = 2 + \\frac{1}{4}(x - 4)$.",
          ],
          answer: "$y = \\frac{x}{4} + 1$.",
        },
        {
          kind: "prose",
          text:
            "Differentiating again gives higher derivatives. A polynomial of degree $n$ has $p^{(n)}$ equal to $n!$ times " +
            "its leading coefficient and $p^{(n + 1)} = 0$; for example $\\frac{d^{3}}{dx^{3}}x^{3} = 6$ and " +
            "$\\frac{d^{4}}{dx^{4}}x^{3} = 0$.",
        },
      ],
    },
    {
      heading: "Pitfalls",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Rewrite before differentiating",
          text:
            "$\\frac{1}{x^{3}}$ is not $\\frac{1}{3x^{2}}$ after differentiating: rewrite it as $x^{-3}$ first, and remember " +
            "the exponent goes from $-3$ down to $-4$, not up to $-2$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Variable base, fixed exponent only",
          text:
            "The power rule needs the exponent fixed. $\\frac{d}{dx}2^{x} \\ne x \\cdot 2^{x - 1}$ — that's an exponential, " +
            "with derivative $2^{x}\\ln 2$ — and $x^{x}$ needs logarithmic differentiation.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The one gap: $n = -1$ in reverse",
          text:
            "Read backwards, the power rule gives antiderivatives $\\int x^{n}\\,dx = \\frac{x^{n + 1}}{n + 1} + C$ for every " +
            "$n \\ne -1$. The missing case $\\int \\frac{dx}{x}$ is filled by $\\ln|x|$, which is why logarithms appear.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§3.1 Derivatives of Polynomials and Exponential Functions (the power rule)" },
    { source: "Spivak, Calculus", locator: "Ch. 10, Differentiation" },
  ],
};
