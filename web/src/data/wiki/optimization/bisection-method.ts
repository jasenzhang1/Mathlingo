import type { WikiArticle } from "../types";

export const bisectionMethodWiki: WikiArticle = {
  conceptId: "bisection-method",

  summary:
    "To solve $f(x) = 0$, the bisection method starts from an interval $[a, b]$ on which $f$ changes sign, so a root " +
    "must lie inside it. It evaluates $f$ at the midpoint, keeps whichever half still has a sign change, and repeats. " +
    "Each step halves the interval, so convergence is slow but completely reliable — the method needs nothing but " +
    "continuity and a starting bracket.",

  sections: [
    {
      heading: "The algorithm",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Start with $a < b$ and $f(a)f(b) < 0$. By the intermediate value theorem, a continuous $f$ has a root in $(a, b)$.",
            "Compute the midpoint $m = \\frac{a + b}{2}$ and $f(m)$.",
            "If $f(a)f(m) < 0$, the root is in $[a, m]$: set $b = m$. Otherwise set $a = m$ (or stop if $f(m) = 0$).",
            "Repeat until $b - a$ is below the tolerance; return the midpoint.",
          ],
        },
        {
          kind: "example",
          title: "Approximating $\\sqrt{2}$",
          problem: "Apply three bisection steps to $f(x) = x^{2} - 2$ on $[1, 2]$.",
          steps: [
            "$f(1) = -1 < 0$ and $f(2) = 2 > 0$, so $[1, 2]$ brackets a root.",
            "$m = 1.5$: $f(1.5) = 0.25 > 0$, so keep $[1, 1.5]$.",
            "$m = 1.25$: $f(1.25) = -0.4375 < 0$, so keep $[1.25, 1.5]$.",
            "$m = 1.375$: $f(1.375) = -0.109375 < 0$, so keep $[1.375, 1.5]$.",
          ],
          answer: "The root ($\\sqrt{2} \\approx 1.4142$) is in $[1.375, 1.5]$; the midpoint $1.4375$ is within $0.0625$ of it.",
        },
      ],
    },

    {
      heading: "Convergence",
      blocks: [
        {
          kind: "formula",
          latex: "|x_n - x^{*}| \\le \\frac{b - a}{2^{n + 1}} \\qquad n \\ge \\log_2\\!\\left(\\frac{b - a}{\\varepsilon}\\right) - 1",
          caption: "Error of the midpoint after $n$ halvings, and the steps needed for tolerance $\\varepsilon$",
        },
        {
          kind: "prose",
          text:
            "The bound depends only on the starting width, not on $f$. Each step gains one binary digit, about $0.3$ " +
            "decimal digits, so ten steps shrink the interval about a thousandfold. This is **linear convergence** with " +
            "rate $\\frac{1}{2}$ — slow next to Newton's method, but the guarantee never fails.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Bracketing as a safety net",
          text:
            "Practical root finders such as Brent's method combine bisection with faster interpolation steps (secant, " +
            "inverse quadratic). They take the fast step when it stays inside the bracket and shrinks it enough, and fall " +
            "back to bisection otherwise — speed when things go well, bisection's guarantee when they don't.",
        },
      ],
    },

    {
      heading: "Limitations",
      blocks: [
        {
          kind: "list",
          items: [
            "It needs a sign change. A double root such as $f(x) = (x - 1)^{2}$ touches zero without crossing, so no bracket exists.",
            "With several roots in $[a, b]$, it finds one of them, with no control over which.",
            "It doesn't generalise to systems of equations in several variables, where there is no notion of a bracket.",
            "A discontinuity can masquerade as a root: $f(x) = 1/x$ changes sign on $[-1, 1]$ but has no root.",
          ],
        },
        {
          kind: "prose",
          text:
            "For minimising a one-dimensional unimodal function, the analogous bracketing method is **golden-section " +
            "search**, which shrinks the interval by a factor of about $0.618$ per function evaluation. Applying " +
            "bisection to $f'$ also works when the derivative is available.",
        },
      ],
    },
  ],

  references: [
    { source: "Burden & Faires, Numerical Analysis", locator: "§2.1, The Bisection Method" },
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 11, Nonlinear Equations (§11.1)" },
  ],
};
