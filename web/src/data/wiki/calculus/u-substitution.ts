import type { WikiArticle } from "../types";

export const uSubstitutionWiki: WikiArticle = {
  conceptId: "u-substitution",

  summary:
    "Substitution is the chain rule run backwards. Because $\\frac{d}{dx} F(g(x)) = f(g(x))\\,g'(x)$ when $F' = f$, any " +
    "integrand of the form $f(g(x))\\,g'(x)$ integrates to $F(g(x))$. In practice: spot an inner function $u = g(x)$ " +
    "whose derivative also appears, rewrite everything in $u$, integrate, and translate back — or change the limits " +
    "and never translate back at all.",

  sections: [
    {
      heading: "The method",
      blocks: [
        {
          kind: "formula",
          latex: "\\int f(g(x))\\,g'(x)\\,dx = \\int f(u)\\,du, \\qquad u = g(x),\\; du = g'(x)\\,dx",
        },
        {
          kind: "example",
          title: "The derivative is right there",
          problem: "Find $\\int 2x(x^{2} + 1)^{5}\\,dx$.",
          steps: [
            "Let $u = x^{2} + 1$, so $du = 2x\\,dx$.",
            "$\\int u^{5}\\,du = \\frac{u^{6}}{6} + C$.",
          ],
          answer: "$\\frac{(x^{2} + 1)^{6}}{6} + C$. Differentiate to check: $(x^{2} + 1)^{5} \\cdot 2x$.",
        },
        {
          kind: "example",
          title: "Off by a constant",
          problem: "Find $\\int x\\,e^{-x^{2}}\\,dx$.",
          steps: [
            "Let $u = -x^{2}$, $du = -2x\\,dx$, so $x\\,dx = -\\frac{1}{2}du$.",
            "$-\\frac{1}{2}\\int e^{u}\\,du = -\\frac{1}{2}e^{u} + C$.",
          ],
          answer: "$-\\frac{1}{2}e^{-x^{2}} + C$. Constant factors can be fixed; missing powers of $x$ cannot.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Only constants can be adjusted",
          text:
            "$\\int e^{-x^{2}}\\,dx$ has no $x$ to pair with $du = -2x\\,dx$, and you may not divide by $x$ to manufacture " +
            "one — the substitution has to remove every $x$. (That integral has no elementary antiderivative at all.)",
        },
      ],
    },
    {
      heading: "Definite integrals: change the limits",
      blocks: [
        {
          kind: "formula",
          latex: "\\int_a^b f(g(x))\\,g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du",
        },
        {
          kind: "example",
          title: "New limits, no back-substitution",
          problem: "Evaluate $\\int_0^{\\pi/2} \\sin^{3} x \\cos x\\,dx$.",
          steps: [
            "$u = \\sin x$, $du = \\cos x\\,dx$; $x = 0 \\mapsto u = 0$ and $x = \\frac{\\pi}{2} \\mapsto u = 1$.",
            "$\\int_0^{1} u^{3}\\,du = \\frac{1}{4}$.",
          ],
          answer: "$\\frac{1}{4}$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Mixing variables",
          text:
            "Either convert the limits to $u$ values or substitute back to $x$ before using the old limits — never " +
            "evaluate a $u$-antiderivative at $x$-limits.",
        },
      ],
    },
    {
      heading: "Patterns worth recognising",
      blocks: [
        {
          kind: "list",
          items: [
            "$\\int \\frac{g'(x)}{g(x)}\\,dx = \\ln|g(x)| + C$ — e.g. $\\int \\tan x\\,dx = -\\ln|\\cos x| + C$ and $\\int \\frac{2x}{x^{2} + 4}\\,dx = \\ln(x^{2} + 4) + C$.",
            "Linear inner functions: $\\int f(ax + b)\\,dx = \\frac{1}{a}F(ax + b) + C$, e.g. $\\int \\cos(3x)\\,dx = \\frac{1}{3}\\sin 3x + C$.",
            "$\\int \\frac{dx}{a^{2} + x^{2}} = \\frac{1}{a}\\arctan\\frac{x}{a} + C$ (substitute $x = au$).",
            "Leftover $x$: in $\\int x\\sqrt{x + 1}\\,dx$, let $u = x + 1$ and write $x = u - 1$.",
          ],
        },
        {
          kind: "example",
          title: "Solving for the leftover $x$",
          problem: "Evaluate $\\int_0^{3} x\\sqrt{x + 1}\\,dx$.",
          steps: [
            "$u = x + 1$, $x = u - 1$, $dx = du$; limits $1$ to $4$.",
            "$\\int_1^{4} (u - 1)u^{1/2}\\,du = \\int_1^{4} (u^{3/2} - u^{1/2})\\,du = \\left[\\frac{2}{5}u^{5/2} - \\frac{2}{3}u^{3/2}\\right]_1^{4}$.",
            "At $4$: $\\frac{64}{5} - \\frac{16}{3} = \\frac{112}{15}$. At $1$: $\\frac{2}{5} - \\frac{2}{3} = -\\frac{4}{15}$.",
          ],
          answer: "$\\frac{116}{15} \\approx 7.733$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Symmetry",
          text:
            "Substituting $u = -x$ proves that $\\int_{-a}^{a} f = 0$ for odd $f$ and $\\int_{-a}^{a} f = 2\\int_0^{a} f$ for even $f$.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§5.5 The Substitution Rule" },
    { source: "OpenStax, Calculus Volume 1", locator: "§5.5 Substitution" },
  ],
};
