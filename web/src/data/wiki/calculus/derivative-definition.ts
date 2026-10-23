import type { WikiArticle } from "../types";

export const derivativeDefinitionWiki: WikiArticle = {
  conceptId: "derivative-definition",

  summary:
    "The derivative $f'(a)$ is the slope of the graph of $f$ at $a$: the limit of slopes of secant lines through " +
    "$(a, f(a))$ as the second point slides in. Physically it is an instantaneous rate of change — velocity is the " +
    "derivative of position. Everything else in differential calculus is either a rule for computing this limit " +
    "quickly or a consequence of knowing it.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "f'(a) = \\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h} = \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}",
          caption: "The derivative of $f$ at $a$, as a limit of difference quotients",
        },
        {
          kind: "prose",
          text:
            "The difference quotient $\\frac{f(a + h) - f(a)}{h}$ is the slope of the secant line from $a$ to $a + h$, " +
            "or the average rate of change over that interval. Letting $h \\to 0$ turns an average into an instantaneous " +
            "rate. The tangent line at $a$ is the line through $(a, f(a))$ with that slope:",
        },
        {
          kind: "formula",
          latex: "y = f(a) + f'(a)(x - a)",
          caption: "Tangent line at $x = a$",
        },
        {
          kind: "definitions",
          items: [
            { term: "$f'(x)$, $\\frac{df}{dx}$, $\\frac{d}{dx} f(x)$, $Df$", description: "Notations for the derivative function, which assigns to each $x$ the slope there." },
            { term: "Differentiable at $a$", description: "The limit defining $f'(a)$ exists (and is finite)." },
          ],
        },
      ],
    },
    {
      heading: "Computing from the definition",
      blocks: [
        {
          kind: "example",
          title: "The derivative of $x^{2}$",
          problem: "Use the definition to find $f'(x)$ for $f(x) = x^{2}$.",
          steps: [
            "$f(x + h) - f(x) = x^{2} + 2xh + h^{2} - x^{2} = 2xh + h^{2}$.",
            "Divide by $h$: $2x + h$ (valid for $h \\ne 0$).",
            "Let $h \\to 0$: $2x$.",
          ],
          answer: "$f'(x) = 2x$. At $x = 3$ the tangent slope is $6$, and the tangent line is $y = 9 + 6(x - 3)$.",
        },
        {
          kind: "example",
          title: "The derivative of $\\frac{1}{x}$",
          problem: "Find $f'(x)$ for $f(x) = \\frac{1}{x}$.",
          steps: [
            "$\\frac{1}{x + h} - \\frac{1}{x} = \\frac{x - (x + h)}{x(x + h)} = \\frac{-h}{x(x + h)}$.",
            "Divide by $h$: $\\frac{-1}{x(x + h)}$.",
            "Let $h \\to 0$: $-\\frac{1}{x^{2}}$.",
          ],
          answer: "$f'(x) = -\\frac{1}{x^{2}}$ — always negative, matching the always-falling graph.",
        },
      ],
    },
    {
      heading: "Differentiability and continuity",
      blocks: [
        {
          kind: "formula",
          latex: "f \\text{ differentiable at } a \\;\\implies\\; f \\text{ continuous at } a",
          caption: "Because $f(a + h) - f(a) = \\frac{f(a + h) - f(a)}{h} \\cdot h \\to f'(a) \\cdot 0 = 0$",
        },
        {
          kind: "prose",
          text: "The converse is false. A continuous function can fail to be differentiable at:",
        },
        {
          kind: "list",
          items: [
            "**A corner**: $|x|$ at $0$ has left slope $-1$ and right slope $1$.",
            "**A vertical tangent**: $x^{1/3}$ at $0$, where the difference quotient $h^{-2/3} \\to \\infty$.",
            "**A cusp**: $x^{2/3}$ at $0$, with one-sided slopes $\\pm\\infty$.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Reading $f'$ from the graph",
          text:
            "$f' > 0$ where $f$ rises, $f' < 0$ where it falls, and $f' = 0$ at flat spots (peaks, troughs, plateaus). " +
            "Sketching $f'$ from a graph of $f$ is the fastest check that you understand what the derivative measures.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Units",
          text:
            "$f'$ carries units of output per unit of input. If $s(t)$ is metres after $t$ seconds, $s'(t)$ is in metres " +
            "per second; if $C(q)$ is dollars for $q$ items, $C'(q)$ — the marginal cost — is dollars per item.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§2.7 Derivatives and Rates of Change; §2.8 The Derivative as a Function" },
    { source: "Spivak, Calculus", locator: "Ch. 9, Derivatives" },
  ],
};
