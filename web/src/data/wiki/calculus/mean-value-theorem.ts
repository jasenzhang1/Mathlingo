import type { WikiArticle } from "../types";

export const meanValueTheoremWiki: WikiArticle = {
  conceptId: "mean-value-theorem",

  summary:
    "If a car averages $60$ mph over a trip, at some instant the speedometer read exactly $60$. That is the mean value " +
    "theorem: a smooth function's instantaneous rate somewhere equals its average rate over an interval. It looks " +
    "modest, but it is the bridge from information about $f'$ to information about $f$ — it proves that $f' > 0$ " +
    "means increasing, that $f' = 0$ means constant, and it underlies the fundamental theorem of calculus and " +
    "Taylor's theorem.",

  sections: [
    {
      heading: "Rolle's theorem and the MVT",
      blocks: [
        {
          kind: "formula",
          latex: "f \\text{ continuous on } [a, b], \\text{ differentiable on } (a, b) \\;\\implies\\; \\exists\\, c \\in (a, b): \\; f'(c) = \\frac{f(b) - f(a)}{b - a}",
          caption: "Mean value theorem: some tangent is parallel to the secant from $a$ to $b$",
        },
        {
          kind: "prose",
          text:
            "**Rolle's theorem** is the special case $f(a) = f(b)$: then some $c$ has $f'(c) = 0$. Proof sketch: by the " +
            "extreme value theorem $f$ has a max and a min on $[a, b]$; if both are at the endpoints $f$ is constant, " +
            "otherwise one is interior and the derivative vanishes there. The MVT follows by applying Rolle to $f$ minus " +
            "its secant line.",
        },
        {
          kind: "example",
          title: "Finding the promised $c$",
          problem: "Find $c$ in $(0, 2)$ satisfying the MVT for $f(x) = x^{3} - x$.",
          steps: [
            "Average rate: $\\frac{f(2) - f(0)}{2 - 0} = \\frac{6 - 0}{2} = 3$.",
            "Solve $f'(c) = 3c^{2} - 1 = 3$: $c^{2} = \\frac{4}{3}$.",
            "Keep the root in $(0, 2)$: $c = \\frac{2}{\\sqrt{3}}$.",
          ],
          answer: "$c = \\frac{2}{\\sqrt{3}} \\approx 1.155$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The hypotheses are needed",
          text:
            "$f(x) = |x|$ on $[-1, 1]$ has $f(-1) = f(1)$ but no point with $f'(c) = 0$ — it isn't differentiable at $0$. " +
            "A function with a jump can likewise break the conclusion.",
        },
      ],
    },
    {
      heading: "What the MVT proves",
      blocks: [
        {
          kind: "list",
          items: [
            "**Zero derivative means constant.** If $f' = 0$ on an interval, any two values satisfy $f(b) - f(a) = f'(c)(b - a) = 0$.",
            "**Same derivative means differ by a constant.** If $f' = g'$, then $(f - g)' = 0$, so $f = g + C$ — the reason every antiderivative has a “$+ C$”.",
            "**Sign of $f'$ gives monotonicity.** If $f' > 0$ on an interval, $b > a$ gives $f(b) - f(a) = f'(c)(b - a) > 0$.",
            "**Bounds on $f'$ bound $f$.** If $|f'| \\le M$, then $|f(b) - f(a)| \\le M|b - a|$ ($f$ is Lipschitz).",
          ],
        },
        {
          kind: "example",
          title: "A bound from a derivative bound",
          problem: "If $f(1) = 10$ and $2 \\le f'(x) \\le 5$ for all $x$, how large can $f(4)$ be?",
          steps: [
            "$f(4) - f(1) = f'(c) \\cdot 3$ for some $c \\in (1, 4)$.",
            "$f'(c) \\le 5$, so $f(4) \\le 10 + 15$.",
          ],
          answer: "At most $25$ (and at least $16$).",
        },
        {
          kind: "example",
          title: "An inequality",
          problem: "Show $|\\sin a - \\sin b| \\le |a - b|$ for all $a, b$.",
          steps: [
            "By the MVT, $\\sin a - \\sin b = \\cos c \\, (a - b)$ for some $c$ between them.",
            "$|\\cos c| \\le 1$.",
          ],
          answer: "$|\\sin a - \\sin b| \\le |a - b|$; with $b = 0$ this is $|\\sin a| \\le |a|$.",
        },
      ],
    },
    {
      heading: "Counting roots",
      blocks: [
        {
          kind: "prose",
          text:
            "Rolle's theorem limits how many roots a function can have: between two roots of $f$ lies a root of $f'$. " +
            "So if $f'$ is never $0$, $f$ has at most one root. Combined with the IVT, this proves exactly one.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Exactly one root",
          text:
            "$f(x) = x^{3} + 3x + 1$: $f(-1) = -3 < 0 < 1 = f(0)$, so the IVT gives a root; $f'(x) = 3x^{2} + 3 > 0$, so " +
            "Rolle forbids a second one. Existence from the IVT, uniqueness from the MVT is a pattern worth remembering.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§4.2 The Mean Value Theorem" },
    { source: "Spivak, Calculus", locator: "Ch. 11, Significance of the Derivative" },
  ],
};
