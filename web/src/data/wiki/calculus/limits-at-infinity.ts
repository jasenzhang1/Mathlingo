import type { WikiArticle } from "../types";

export const limitsAtInfinityWiki: WikiArticle = {
  conceptId: "limits-at-infinity",

  summary:
    "$\\lim_{x \\to \\infty} f(x) = L$ describes where $f$ settles as $x$ grows without bound — its end behaviour. " +
    "The working principle is dominance: in a sum, the fastest-growing term decides everything, and the growth ladder " +
    "$\\ln x \\ll x^{p} \\ll e^{x}$ ranks the usual suspects. Limits at infinity give horizontal asymptotes; infinite " +
    "limits at a finite point give vertical ones.",

  sections: [
    {
      heading: "Rational functions: divide by the top power",
      blocks: [
        {
          kind: "prose",
          text:
            "Divide numerator and denominator by the highest power of $x$ in the denominator; every term with $x$ left " +
            "in its denominator goes to $0$ because $\\lim_{x \\to \\infty} \\frac{1}{x^{p}} = 0$ for $p > 0$.",
        },
        {
          kind: "example",
          title: "Equal degrees",
          problem: "Find $\\lim_{x \\to \\infty} \\frac{3x^{2} - x + 5}{2x^{2} + 7}$.",
          steps: [
            "Divide by $x^{2}$: $\\frac{3 - \\frac{1}{x} + \\frac{5}{x^{2}}}{2 + \\frac{7}{x^{2}}}$.",
            "Every fraction with $x$ downstairs tends to $0$.",
          ],
          answer: "$\\frac{3}{2}$ — the ratio of leading coefficients. The line $y = \\frac{3}{2}$ is a horizontal asymptote.",
        },
        {
          kind: "table",
          headers: ["Degrees of $\\frac{p(x)}{q(x)}$", "$\\lim_{x \\to \\pm\\infty}$"],
          rows: [
            ["$\\deg p < \\deg q$", "$0$"],
            ["$\\deg p = \\deg q$", "ratio of leading coefficients"],
            ["$\\deg p > \\deg q$", "$\\pm\\infty$ (no horizontal asymptote; if $\\deg p = \\deg q + 1$, a slant asymptote)"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Square roots and $x \\to -\\infty$",
          text:
            "$\\sqrt{x^{2}} = |x|$, which is $-x$ when $x < 0$. So $\\lim_{x \\to -\\infty} \\frac{\\sqrt{4x^{2} + 1}}{x} = -2$, " +
            "while the limit at $+\\infty$ is $2$. A function can have two different horizontal asymptotes.",
        },
      ],
    },
    {
      heading: "The growth ladder",
      blocks: [
        {
          kind: "formula",
          latex: "\\ln x \\;\\ll\\; x^{p} \\;\\ll\\; a^{x} \\;\\ll\\; x! \\;\\ll\\; x^{x} \\qquad (p > 0,\\; a > 1)",
          caption: "Each eventually dwarfs everything to its left: the ratio of left to right tends to $0$",
        },
        {
          kind: "prose",
          text:
            "So $\\frac{x^{100}}{e^{x}} \\to 0$ and $\\frac{\\ln x}{\\sqrt{x}} \\to 0$, however lopsided they look for moderate " +
            "$x$. (L'Hôpital's rule, later, proves these.) In a sum such as $e^{x} + x^{5}$, the exponential is the " +
            "dominant term and controls the limit of any ratio it appears in.",
        },
        {
          kind: "example",
          title: "Conjugates for $\\infty - \\infty$",
          problem: "Find $\\lim_{x \\to \\infty} \\left(\\sqrt{x^{2} + 6x} - x\\right)$.",
          steps: [
            "Multiply and divide by $\\sqrt{x^{2} + 6x} + x$: the numerator becomes $x^{2} + 6x - x^{2} = 6x$.",
            "Divide top and bottom by $x$: $\\frac{6}{\\sqrt{1 + \\frac{6}{x}} + 1}$.",
            "Let $x \\to \\infty$: $\\frac{6}{1 + 1}$.",
          ],
          answer: "$3$. “$\\infty - \\infty$” is indeterminate: here two huge quantities differ by a finite amount.",
        },
      ],
    },
    {
      heading: "Vertical asymptotes",
      blocks: [
        {
          kind: "prose",
          text:
            "The line $x = a$ is a **vertical asymptote** if $f(x) \\to \\pm\\infty$ as $x \\to a^{-}$ or $x \\to a^{+}$. For a " +
            "rational function in lowest terms, these are the zeros of the denominator. A zero that cancels with the " +
            "numerator gives a hole instead.",
        },
        {
          kind: "example",
          title: "Hole versus asymptote",
          problem: "Find the vertical asymptotes of $f(x) = \\frac{x - 2}{x^{2} - 4}$.",
          steps: [
            "$x^{2} - 4 = (x - 2)(x + 2)$, so $f(x) = \\frac{1}{x + 2}$ for $x \\ne 2$.",
            "At $x = 2$ the factor cancels: $f \\to \\frac{1}{4}$, a hole.",
            "At $x = -2$: $f \\to -\\infty$ from the left and $+\\infty$ from the right.",
          ],
          answer: "Only $x = -2$.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§2.2 (infinite limits); §2.6 Limits at Infinity; Horizontal Asymptotes" },
    { source: "OpenStax, Calculus Volume 1", locator: "§4.6 Limits at Infinity and Asymptotes" },
  ],
};
