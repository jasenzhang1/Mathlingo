import type { WikiArticle } from "../types";

export const partialFractionsWiki: WikiArticle = {
  conceptId: "partial-fractions",

  summary:
    "Adding fractions is easy; partial fractions runs it in reverse. A rational function $\\frac{P(x)}{Q(x)}$ is split " +
    "into a sum of simple fractions, one family per factor of $Q$, each of which integrates to a logarithm, a power or " +
    "an arctangent. The method is pure algebra followed by the most basic integrals.",

  sections: [
    {
      heading: "Setting up the decomposition",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "If $\\deg P \\ge \\deg Q$, first do polynomial long division: $\\frac{P}{Q} = S(x) + \\frac{R(x)}{Q(x)}$ with $\\deg R < \\deg Q$.",
            "Factor $Q$ into linear factors and irreducible quadratics.",
            "Write one term for each factor according to the table below.",
            "Solve for the constants, then integrate term by term.",
          ],
        },
        {
          kind: "table",
          headers: ["Factor of $Q$", "Terms"],
          rows: [
            ["$(x - a)$", "$\\frac{A}{x - a}$"],
            ["$(x - a)^{k}$", "$\\frac{A_1}{x - a} + \\frac{A_2}{(x - a)^{2}} + \\cdots + \\frac{A_k}{(x - a)^{k}}$"],
            ["$x^{2} + bx + c$ (irreducible)", "$\\frac{Bx + C}{x^{2} + bx + c}$"],
          ],
        },
      ],
    },
    {
      heading: "Finding the constants",
      blocks: [
        {
          kind: "example",
          title: "Distinct linear factors (cover-up)",
          problem: "Find $\\int \\frac{5x - 1}{(x - 1)(x + 2)}\\,dx$.",
          steps: [
            "Write $\\frac{5x - 1}{(x - 1)(x + 2)} = \\frac{A}{x - 1} + \\frac{B}{x + 2}$, so $5x - 1 = A(x + 2) + B(x - 1)$.",
            "$x = 1$: $4 = 3A$, so $A = \\frac{4}{3}$. $x = -2$: $-11 = -3B$, so $B = \\frac{11}{3}$.",
            "Integrate: $\\frac{4}{3}\\ln|x - 1| + \\frac{11}{3}\\ln|x + 2| + C$.",
          ],
          answer: "$\\frac{4}{3}\\ln|x - 1| + \\frac{11}{3}\\ln|x + 2| + C$. Check: $A + B = 5$ matches the coefficient of $x$.",
        },
        {
          kind: "example",
          title: "A repeated factor",
          problem: "Decompose $\\frac{1}{x^{2}(x + 1)}$.",
          steps: [
            "$\\frac{1}{x^{2}(x + 1)} = \\frac{A}{x} + \\frac{B}{x^{2}} + \\frac{C}{x + 1}$, so $1 = Ax(x + 1) + B(x + 1) + Cx^{2}$.",
            "$x = 0$: $B = 1$. $x = -1$: $C = 1$. Coefficient of $x^{2}$: $A + C = 0$, so $A = -1$.",
          ],
          answer: "$-\\frac{1}{x} + \\frac{1}{x^{2}} + \\frac{1}{x + 1}$, which integrates to $-\\ln|x| - \\frac{1}{x} + \\ln|x + 1| + C$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Every power of a repeated factor",
          text:
            "$\\frac{1}{x^{2}(x + 1)}$ needs both $\\frac{A}{x}$ and $\\frac{B}{x^{2}}$. Leaving out the lower power leaves too " +
            "few unknowns, and the equations become inconsistent.",
        },
      ],
    },
    {
      heading: "Quadratic factors and the payoff",
      blocks: [
        {
          kind: "example",
          title: "An irreducible quadratic",
          problem: "Find $\\int \\frac{2x + 3}{x^{2} + 1}\\,dx$.",
          steps: [
            "Already a single quadratic term; split it: $\\frac{2x}{x^{2} + 1} + \\frac{3}{x^{2} + 1}$.",
            "The first is $\\frac{g'}{g}$: $\\ln(x^{2} + 1)$. The second is $3\\arctan x$.",
          ],
          answer: "$\\ln(x^{2} + 1) + 3\\arctan x + C$.",
        },
        {
          kind: "example",
          title: "A definite integral",
          problem: "Evaluate $\\int_2^{3} \\frac{dx}{x^{2} - 1}$.",
          steps: [
            "$\\frac{1}{x^{2} - 1} = \\frac{1}{2}\\left(\\frac{1}{x - 1} - \\frac{1}{x + 1}\\right)$.",
            "Antiderivative $\\frac{1}{2}\\ln\\left|\\frac{x - 1}{x + 1}\\right|$.",
            "$\\frac{1}{2}\\left(\\ln\\frac{2}{4} - \\ln\\frac{1}{3}\\right) = \\frac{1}{2}\\ln\\frac{3}{2}$.",
          ],
          answer: "$\\frac{1}{2}\\ln\\frac{3}{2} \\approx 0.2027$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Telescoping series and the logistic curve",
          text:
            "The same decomposition $\\frac{1}{n(n + 1)} = \\frac{1}{n} - \\frac{1}{n + 1}$ makes $\\sum \\frac{1}{n(n + 1)}$ " +
            "telescope to $1$, and $\\frac{1}{P(1 - P)} = \\frac{1}{P} + \\frac{1}{1 - P}$ is how the logistic growth " +
            "equation is solved.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§7.4 Integration of Rational Functions by Partial Fractions" },
    { source: "OpenStax, Calculus Volume 2", locator: "§3.4 Partial Fractions" },
  ],
};
