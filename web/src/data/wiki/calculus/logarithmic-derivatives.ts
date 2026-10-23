import type { WikiArticle } from "../types";

export const logarithmicDerivativesWiki: WikiArticle = {
  conceptId: "logarithmic-derivatives",

  summary:
    "The natural logarithm undoes $e^{x}$, and differentiating that relationship gives $\\frac{d}{dx}\\ln x = \\frac{1}{x}$. " +
    "With the chain rule this becomes the logarithmic derivative $\\frac{d}{dx}\\ln g = \\frac{g'}{g}$, the relative rate " +
    "of change of $g$. Turning the idea around gives logarithmic differentiation: take logs to convert products, " +
    "quotients and variable exponents into sums before differentiating.",

  sections: [
    {
      heading: "The derivative of $\\ln x$",
      blocks: [
        {
          kind: "example",
          title: "From $e^{\\ln x} = x$",
          problem: "Derive $\\frac{d}{dx}\\ln x$.",
          steps: [
            "Differentiate both sides of $e^{\\ln x} = x$ with the chain rule: $e^{\\ln x} \\cdot \\frac{d}{dx}\\ln x = 1$.",
            "Since $e^{\\ln x} = x$: $x \\cdot \\frac{d}{dx}\\ln x = 1$.",
          ],
          answer: "$\\frac{d}{dx}\\ln x = \\frac{1}{x}$ for $x > 0$.",
        },
        {
          kind: "table",
          headers: ["$f(x)$", "$f'(x)$"],
          rows: [
            ["$\\ln x$", "$\\frac{1}{x}$"],
            ["$\\ln|x|$", "$\\frac{1}{x}$ (for $x \\ne 0$)"],
            ["$\\log_a x$", "$\\frac{1}{x\\ln a}$"],
            ["$\\ln g(x)$", "$\\frac{g'(x)}{g(x)}$"],
          ],
          caption: "$\\log_a x = \\frac{\\ln x}{\\ln a}$ explains the third row",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Simplify with log laws first",
          text:
            "$\\ln(3x)$ has derivative $\\frac{1}{x}$, not $\\frac{1}{3x}$: $\\ln(3x) = \\ln 3 + \\ln x$, and the constant $\\ln 3$ " +
            "vanishes. Likewise $\\ln(x^{5}) = 5\\ln x$ has derivative $\\frac{5}{x}$.",
        },
      ],
    },
    {
      heading: "The logarithmic derivative",
      blocks: [
        {
          kind: "prose",
          text:
            "$\\frac{g'}{g}$ is the rate of change of $g$ per unit of $g$ — its percentage growth rate. For $g = Ce^{kx}$ it is " +
            "the constant $k$. And because $\\ln$ turns products into sums, the logarithmic derivative of a product is the " +
            "sum of the logarithmic derivatives: $\\frac{(fg)'}{fg} = \\frac{f'}{f} + \\frac{g'}{g}$.",
        },
        {
          kind: "example",
          title: "A chain-rule log",
          problem: "Differentiate $y = \\ln(x^{2} + 1)$.",
          steps: ["$y' = \\frac{2x}{x^{2} + 1}$ by the rule $\\frac{g'}{g}$."],
          answer: "$\\frac{2x}{x^{2} + 1}$, which is $0$ at $x = 0$ and positive for $x > 0$.",
        },
      ],
    },
    {
      heading: "Logarithmic differentiation",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Take $\\ln$ of both sides of $y = f(x)$ (use $\\ln|y|$ if $y$ can be negative).",
            "Simplify with log laws: products become sums, powers become multiples.",
            "Differentiate implicitly: the left side gives $\\frac{y'}{y}$.",
            "Multiply through by $y$.",
          ],
        },
        {
          kind: "example",
          title: "A variable base and exponent",
          problem: "Differentiate $y = x^{x}$ for $x > 0$.",
          steps: [
            "$\\ln y = x\\ln x$.",
            "$\\frac{y'}{y} = \\ln x + 1$.",
          ],
          answer: "$y' = x^{x}(\\ln x + 1)$; neither the power rule nor the exponential rule applies directly.",
        },
        {
          kind: "example",
          title: "A long product",
          problem: "Find $\\frac{y'}{y}$ for $y = \\frac{(x^{2} + 1)^{3}(x - 1)^{2}}{x^{4}}$.",
          steps: [
            "$\\ln y = 3\\ln(x^{2} + 1) + 2\\ln(x - 1) - 4\\ln x$.",
            "Differentiate term by term.",
          ],
          answer: "$\\frac{y'}{y} = \\frac{6x}{x^{2} + 1} + \\frac{2}{x - 1} - \\frac{4}{x}$ — no quotient rule needed.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§3.6 Derivatives of Logarithmic Functions (and logarithmic differentiation)" },
    { source: "OpenStax, Calculus Volume 1", locator: "§3.9 Derivatives of Exponential and Logarithmic Functions" },
  ],
};
