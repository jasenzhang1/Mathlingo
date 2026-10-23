import type { WikiArticle } from "../types";

export const lhopitalsRuleWiki: WikiArticle = {
  conceptId: "lhopitals-rule",

  summary:
    "When a quotient's limit takes the form $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$, L'Hôpital's rule replaces it by " +
    "the limit of the ratio of derivatives. Near the point both functions behave like their tangent lines, and the " +
    "ratio of two lines through the origin is the ratio of their slopes. Other indeterminate forms — $0 \\cdot \\infty$, " +
    "$\\infty - \\infty$, $1^{\\infty}$, $0^{0}$, $\\infty^{0}$ — are first rewritten into one of these two.",

  sections: [
    {
      heading: "The rule",
      blocks: [
        {
          kind: "formula",
          latex: "\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}",
          caption: "Valid when the left side is $\\frac{0}{0}$ or $\\frac{\\pm\\infty}{\\pm\\infty}$, $g' \\ne 0$ near $a$, and the right-hand limit exists (or is $\\pm\\infty$). Also for $a = \\pm\\infty$ and one-sided limits.",
        },
        {
          kind: "example",
          title: "A $\\frac{0}{0}$ form",
          problem: "Find $\\lim_{x \\to 0} \\frac{e^{x} - 1 - x}{x^{2}}$.",
          steps: [
            "At $0$: $\\frac{0}{0}$. Differentiate top and bottom: $\\frac{e^{x} - 1}{2x}$ — still $\\frac{0}{0}$.",
            "Again: $\\frac{e^{x}}{2} \\to \\frac{1}{2}$.",
          ],
          answer: "$\\frac{1}{2}$ — the coefficient of $x^{2}$ in the Taylor series of $e^{x}$.",
        },
        {
          kind: "example",
          title: "Growth rates",
          problem: "Show $\\lim_{x \\to \\infty} \\frac{x^{3}}{e^{x}} = 0$.",
          steps: [
            "$\\frac{\\infty}{\\infty}$; apply the rule three times: $\\frac{3x^{2}}{e^{x}} \\to \\frac{6x}{e^{x}} \\to \\frac{6}{e^{x}}$.",
            "$\\frac{6}{e^{x}} \\to 0$.",
          ],
          answer: "$0$. Any power loses to $e^{x}$; similarly $\\frac{\\ln x}{x^{p}} \\to 0$ for every $p > 0$.",
        },
      ],
    },
    {
      heading: "Other indeterminate forms",
      blocks: [
        {
          kind: "table",
          headers: ["Form", "Rewrite"],
          rows: [
            ["$0 \\cdot \\infty$", "$fg = \\frac{f}{1/g}$ or $\\frac{g}{1/f}$"],
            ["$\\infty - \\infty$", "combine into one fraction, or factor"],
            ["$1^{\\infty}$, $0^{0}$, $\\infty^{0}$", "take logs: $\\ln(f^{g}) = g \\ln f$, find that limit $L$, answer $e^{L}$"],
          ],
        },
        {
          kind: "example",
          title: "$0 \\cdot \\infty$",
          problem: "Find $\\lim_{x \\to 0^{+}} x \\ln x$.",
          steps: [
            "Write as $\\frac{\\ln x}{1/x}$, a $\\frac{-\\infty}{\\infty}$ form.",
            "Differentiate: $\\frac{1/x}{-1/x^{2}} = -x \\to 0$.",
          ],
          answer: "$0$.",
        },
        {
          kind: "example",
          title: "$1^{\\infty}$: the limit that defines $e$",
          problem: "Find $\\lim_{x \\to \\infty} \\left(1 + \\frac{a}{x}\\right)^{x}$.",
          steps: [
            "Let $y$ be the expression; $\\ln y = x \\ln\\left(1 + \\frac{a}{x}\\right) = \\frac{\\ln(1 + a/x)}{1/x}$, a $\\frac{0}{0}$ form.",
            "Differentiate: $\\frac{\\frac{-a/x^{2}}{1 + a/x}}{-1/x^{2}} = \\frac{a}{1 + a/x} \\to a$.",
          ],
          answer: "$e^{a}$ — the continuous-compounding limit.",
        },
      ],
    },
    {
      heading: "When not to use it",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Check the form first",
          text:
            "$\\lim_{x \\to 0} \\frac{x + 1}{x + 2} = \\frac{1}{2}$ by substitution, but blindly differentiating gives " +
            "$\\frac{1}{1} = 1$ — wrong. The rule only applies to $\\frac{0}{0}$ and $\\frac{\\infty}{\\infty}$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It is not the quotient rule",
          text: "You differentiate numerator and denominator separately: $\\frac{f'}{g'}$, not $\\left(\\frac{f}{g}\\right)'$.",
        },
        {
          kind: "list",
          items: [
            "If $\\frac{f'}{g'}$ has no limit, the rule says nothing: $\\frac{x + \\sin x}{x} \\to 1$ as $x \\to \\infty$, but $\\frac{1 + \\cos x}{1}$ oscillates.",
            "It can cycle: $\\frac{\\sqrt{x^{2} + 1}}{x}$ turns into $\\frac{x}{\\sqrt{x^{2} + 1}}$ and back. Divide by $x$ instead.",
            "Often algebra or a known limit is faster: $\\frac{\\sin 5x}{x} \\to 5$ needs no derivatives.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§4.4 Indeterminate Forms and l'Hospital's Rule" },
    { source: "Spivak, Calculus", locator: "Ch. 11 (Cauchy mean value theorem and l'Hôpital's rule)" },
  ],
};
