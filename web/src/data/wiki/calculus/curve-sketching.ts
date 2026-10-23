import type { WikiArticle } from "../types";

export const curveSketchingWiki: WikiArticle = {
  conceptId: "curve-sketching",

  summary:
    "The first derivative tells you where a function rises and falls; the second tells you which way it bends. " +
    "Together they locate and classify the peaks and troughs (extrema) and the points where the bending switches " +
    "(inflection points) — enough to sketch a graph by hand and, more importantly, to find a function's largest and " +
    "smallest values with a guarantee.",

  sections: [
    {
      heading: "Critical points and the first derivative test",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Critical point", description: "An interior $c$ where $f'(c) = 0$ or $f'(c)$ does not exist." },
            { term: "Fermat's theorem", description: "If $f$ has a local extremum at an interior $c$ and $f'(c)$ exists, then $f'(c) = 0$. So local extrema occur only at critical points." },
          ],
        },
        {
          kind: "prose",
          text:
            "**First derivative test.** If $f'$ changes from $+$ to $-$ at $c$, $f$ has a local maximum there; from $-$ to " +
            "$+$, a local minimum; no sign change, neither (like $x^{3}$ at $0$).",
        },
        {
          kind: "example",
          title: "A cubic",
          problem: "Find and classify the critical points of $f(x) = x^{3} - 3x^{2} - 9x + 5$.",
          steps: [
            "$f'(x) = 3x^{2} - 6x - 9 = 3(x - 3)(x + 1)$, zero at $x = -1$ and $x = 3$.",
            "Sign of $f'$: $+$ on $(-\\infty, -1)$, $-$ on $(-1, 3)$, $+$ on $(3, \\infty)$.",
            "$f(-1) = -1 - 3 + 9 + 5 = 10$; $f(3) = 27 - 27 - 27 + 5 = -22$.",
          ],
          answer: "Local max $10$ at $x = -1$; local min $-22$ at $x = 3$.",
        },
      ],
    },
    {
      heading: "Concavity and the second derivative test",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Concave up", description: "$f'' > 0$: slopes increase, the graph bends like a cup and lies above its tangents." },
            { term: "Concave down", description: "$f'' < 0$: slopes decrease, the graph bends like a cap." },
            { term: "Inflection point", description: "A point where concavity changes sign. $f'' = 0$ is necessary (if $f''$ exists) but not sufficient: $x^{4}$ has $f''(0) = 0$ and no inflection." },
          ],
        },
        {
          kind: "prose",
          text:
            "**Second derivative test.** At a critical point with $f'(c) = 0$: $f''(c) > 0$ gives a local minimum, " +
            "$f''(c) < 0$ a local maximum, and $f''(c) = 0$ is inconclusive — fall back to the first derivative test. " +
            "For the cubic above, $f''(x) = 6x - 6$: $f''(-1) = -12 < 0$ (max), $f''(3) = 12 > 0$ (min), and the inflection " +
            "point is at $x = 1$.",
        },
      ],
    },
    {
      heading: "Absolute extrema on a closed interval",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Find the critical points of $f$ inside $(a, b)$.",
            "Evaluate $f$ at each critical point and at both endpoints $a$ and $b$.",
            "The largest value is the absolute max; the smallest is the absolute min.",
          ],
        },
        {
          kind: "example",
          title: "Closed-interval method",
          problem: "Find the absolute extrema of $f(x) = x^{3} - 3x^{2} - 9x + 5$ on $[-2, 4]$.",
          steps: [
            "Critical points in the interval: $-1$ and $3$.",
            "$f(-2) = -8 - 12 + 18 + 5 = 3$; $f(-1) = 10$; $f(3) = -22$; $f(4) = 64 - 48 - 36 + 5 = -15$.",
          ],
          answer: "Absolute max $10$ at $x = -1$; absolute min $-22$ at $x = 3$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Don't forget the endpoints",
          text:
            "On $[0, 5]$ the same cubic has $f(5) = 125 - 75 - 45 + 5 = 10$ — tying the interior local max. On $[0, 6]$, " +
            "$f(6) = 59$ wins outright. A local max need not be the absolute max.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A checklist for sketching",
          text:
            "Domain and intercepts; symmetry; asymptotes (limits at infinity and blow-ups); intervals of increase and " +
            "decrease from $f'$; local extrema; concavity and inflection points from $f''$. Plot the special points and join them.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§4.1 Maximum and Minimum Values; §4.3 How Derivatives Affect the Shape of a Graph; §4.5 Summary of Curve Sketching" },
    { source: "OpenStax, Calculus Volume 1", locator: "§4.3–§4.5" },
  ],
};
