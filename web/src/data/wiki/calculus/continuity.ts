import type { WikiArticle } from "../types";

export const continuityWiki: WikiArticle = {
  conceptId: "continuity",

  summary:
    "A function is continuous at $a$ when its limit there equals its value: $\\lim_{x \\to a} f(x) = f(a)$. " +
    "Informally the graph has no break at $a$. Continuity is what licenses plugging in to compute limits, and on a " +
    "closed interval it buys two big theorems: the intermediate value theorem (no values are skipped) and the extreme " +
    "value theorem (a maximum and minimum are attained).",

  sections: [
    {
      heading: "Definition and the three ways to fail",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "$f(a)$ is defined;",
            "$\\lim_{x \\to a} f(x)$ exists;",
            "the two are equal.",
          ],
        },
        {
          kind: "table",
          headers: ["Discontinuity", "What happens", "Example at $x = 0$"],
          rows: [
            ["Removable", "the limit exists but $\\ne f(a)$ or $f(a)$ undefined", "$\\frac{\\sin x}{x}$"],
            ["Jump", "one-sided limits exist but differ", "$\\frac{|x|}{x}$"],
            ["Infinite", "a one-sided limit is $\\pm\\infty$", "$\\frac{1}{x}$"],
            ["Oscillating", "no one-sided limit", "$\\sin\\left(\\frac{1}{x}\\right)$"],
          ],
        },
        {
          kind: "prose",
          text:
            "A removable discontinuity can be repaired by redefining one value: setting $f(0) = 1$ makes $\\frac{\\sin x}{x}$ " +
            "continuous. Jumps and blow-ups can't be fixed that way.",
        },
        {
          kind: "example",
          title: "Choosing a constant to glue two pieces",
          problem: "For which $c$ is $f(x) = cx + 1$ for $x < 2$ and $f(x) = x^{2} - c$ for $x \\ge 2$ continuous?",
          steps: [
            "Both pieces are polynomials, so the only question is $x = 2$.",
            "Left limit: $2c + 1$. Right limit and value: $4 - c$.",
            "Set equal: $2c + 1 = 4 - c$, so $3c = 3$.",
          ],
          answer: "$c = 1$.",
        },
      ],
    },
    {
      heading: "Which functions are continuous",
      blocks: [
        {
          kind: "prose",
          text:
            "Polynomials, rational functions (where defined), roots, exponentials, logarithms and trig functions are " +
            "continuous on their domains. Sums, products, quotients (nonzero denominator) and compositions of " +
            "continuous functions are continuous. The composition rule is the one used most:",
        },
        {
          kind: "formula",
          latex: "g \\text{ continuous at } L = \\lim_{x \\to a} f(x) \\;\\implies\\; \\lim_{x \\to a} g(f(x)) = g\\left(\\lim_{x \\to a} f(x)\\right)",
          caption: "A continuous function can be pulled through a limit",
        },
      ],
    },
    {
      heading: "The intermediate and extreme value theorems",
      blocks: [
        {
          kind: "formula",
          latex: "f \\text{ continuous on } [a, b],\\; N \\text{ between } f(a) \\text{ and } f(b) \\;\\implies\\; \\exists\\, c \\in (a, b): f(c) = N",
          caption: "Intermediate value theorem (IVT)",
        },
        {
          kind: "example",
          title: "Locating a root",
          problem: "Show $x^{3} + x - 1 = 0$ has a root in $(0, 1)$.",
          steps: [
            "$f(x) = x^{3} + x - 1$ is a polynomial, so continuous on $[0, 1]$.",
            "$f(0) = -1 < 0$ and $f(1) = 1 > 0$.",
            "$0$ lies between them, so the IVT gives $c \\in (0, 1)$ with $f(c) = 0$.",
          ],
          answer: "A root exists in $(0, 1)$ (numerically $c \\approx 0.682$). Repeatedly halving the interval is the bisection method.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Existence, not location or uniqueness",
          text:
            "The IVT says some $c$ exists — not where, and not that there is only one. And every hypothesis matters: " +
            "$\\frac{1}{x}$ changes sign on $[-1, 1]$ but never equals $0$, because it isn't continuous there.",
        },
        {
          kind: "prose",
          text:
            "The **extreme value theorem**: a continuous function on a closed, bounded interval $[a, b]$ attains an " +
            "absolute maximum and an absolute minimum. Drop “closed” and it can fail ($x$ on $(0, 1)$ has no max); drop " +
            "“continuous” and it can fail too.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§2.5 Continuity; §4.1 (Extreme Value Theorem)" },
    { source: "Spivak, Calculus", locator: "Ch. 6 Continuous Functions; Ch. 7 Three Hard Theorems" },
  ],
};
