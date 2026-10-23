import type { WikiArticle } from "../types";

export const derivativeLinearityWiki: WikiArticle = {
  conceptId: "derivative-linearity",

  summary:
    "Differentiation is linear: the derivative of a sum is the sum of the derivatives, and a constant factor passes " +
    "straight through. Together with the fact that constants have derivative $0$, linearity means you never " +
    "differentiate a complicated sum all at once — you differentiate each piece and add. It is the first rule every " +
    "other rule leans on, and the reason the derivative is a linear operator in the sense of linear algebra.",

  sections: [
    {
      heading: "The three rules",
      blocks: [
        {
          kind: "table",
          headers: ["Rule", "Formula", "In words"],
          rows: [
            ["Constant", "$\\frac{d}{dx} c = 0$", "a flat line has slope $0$"],
            ["Constant multiple", "$\\frac{d}{dx}\\left[c f(x)\\right] = c f'(x)$", "stretching a graph vertically stretches its slopes"],
            ["Sum and difference", "$\\frac{d}{dx}\\left[f(x) \\pm g(x)\\right] = f'(x) \\pm g'(x)$", "rates of change add"],
          ],
        },
        {
          kind: "formula",
          latex: "\\frac{d}{dx}\\left[a f(x) + b g(x)\\right] = a f'(x) + b g'(x)",
          caption: "Linearity in one line: derivatives respect linear combinations",
        },
        {
          kind: "prose",
          text:
            "Each rule comes straight from the limit definition. For the sum rule, the difference quotient of $f + g$ is " +
            "$\\frac{f(x + h) - f(x)}{h} + \\frac{g(x + h) - g(x)}{h}$, and the limit of a sum is the sum of the limits. " +
            "For the constant multiple rule, $c$ factors out of the difference quotient and out of the limit.",
        },
      ],
    },
    {
      heading: "Using linearity",
      blocks: [
        {
          kind: "example",
          title: "Values from a table",
          problem: "If $f'(2) = 5$ and $g'(2) = -3$, find the derivative of $h(x) = 4f(x) - 2g(x) + 7$ at $x = 2$.",
          steps: [
            "By linearity, $h'(x) = 4f'(x) - 2g'(x) + 0$.",
            "$h'(2) = 4(5) - 2(-3) = 20 + 6$.",
          ],
          answer: "$h'(2) = 26$. The constant $7$ shifts the graph up and doesn't change any slope.",
        },
        {
          kind: "example",
          title: "A polynomial, piece by piece",
          problem: "Differentiate $p(x) = 3x^{2} - 5x + 8$, using $\\frac{d}{dx}x^{2} = 2x$ and $\\frac{d}{dx}x = 1$.",
          steps: [
            "Split by the sum rule: $\\frac{d}{dx}(3x^{2}) - \\frac{d}{dx}(5x) + \\frac{d}{dx}(8)$.",
            "Pull out constants: $3 \\cdot 2x - 5 \\cdot 1 + 0$.",
          ],
          answer: "$p'(x) = 6x - 5$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A linear operator",
          text:
            "In linear-algebra language, $D = \\frac{d}{dx}$ is a linear map on differentiable functions: " +
            "$D(af + bg) = aDf + bDg$. Its kernel — the functions it sends to $0$ — is exactly the constant functions " +
            "(on an interval), which is why antiderivatives are only determined up to “$+ C$”.",
        },
      ],
    },
    {
      heading: "Where linearity stops",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Products and quotients are not linear",
          text:
            "Linearity covers sums and constant multiples only. $\\frac{d}{dx}(x \\cdot x) = 2x$, not " +
            "$\\left(\\frac{d}{dx}x\\right)\\left(\\frac{d}{dx}x\\right) = 1$. Products need the product rule, quotients the " +
            "quotient rule, and compositions the chain rule.",
        },
        {
          kind: "list",
          items: [
            "A constant **added** disappears: $(f + c)' = f'$.",
            "A constant **multiplied** survives: $(cf)' = cf'$.",
            "A constant **inside** a function is not a constant multiple: $\\frac{d}{dx}f(3x) \\ne 3f'(x)$ in general — that's the chain rule, giving $3f'(3x)$.",
            "Linearity extends to any finite sum: $\\left(\\sum_{k} c_k f_k\\right)' = \\sum_{k} c_k f_k'$.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§3.1 Derivatives of Polynomials and Exponential Functions (constant, constant multiple, sum and difference rules)" },
    { source: "OpenStax, Calculus Volume 1", locator: "§3.3 Differentiation Rules" },
  ],
};
