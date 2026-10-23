import type { WikiArticle } from "../types";

export const evaluatingLimitsWiki: WikiArticle = {
  conceptId: "evaluating-limits",

  summary:
    "Most limits are computed, not guessed. The limit laws let a limit pass through sums, products and quotients; " +
    "when direct substitution gives the indeterminate form $\\frac{0}{0}$, algebra — factoring, rationalising, " +
    "combining fractions — rewrites the expression into one that agrees with it away from the point and can be " +
    "substituted into. When algebra fails, the squeeze theorem traps a limit between two simpler ones.",

  sections: [
    {
      heading: "The limit laws",
      blocks: [
        {
          kind: "prose",
          text: "If $\\lim_{x \\to a} f(x) = L$ and $\\lim_{x \\to a} g(x) = M$ both exist, then:",
        },
        {
          kind: "formula",
          latex:
            "\\lim (f \\pm g) = L \\pm M, \\quad \\lim (fg) = LM, \\quad \\lim \\frac{f}{g} = \\frac{L}{M} \\;(M \\ne 0), \\quad \\lim f^{n} = L^{n}",
          caption: "Each limit taken as $x \\to a$",
        },
        {
          kind: "prose",
          text:
            "Together with $\\lim_{x \\to a} x = a$ and $\\lim_{x \\to a} c = c$, these give **direct substitution**: for " +
            "any polynomial $p$, $\\lim_{x \\to a} p(x) = p(a)$, and for a rational function the same holds wherever the " +
            "denominator is nonzero.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The laws need the pieces to exist",
          text:
            "$\\lim_{x \\to 0} x \\cdot \\frac{1}{x} = 1$, but you cannot split it as $\\left(\\lim x\\right)\\left(\\lim \\frac{1}{x}\\right)$ " +
            "because the second limit doesn't exist. Check the hypotheses before applying a law.",
        },
      ],
    },
    {
      heading: "Resolving $\\frac{0}{0}$",
      blocks: [
        {
          kind: "prose",
          text:
            "A $\\frac{0}{0}$ from substitution is not an answer — it says numerator and denominator share a factor that " +
            "vanishes at $a$. Cancel it, then substitute.",
        },
        {
          kind: "example",
          title: "Factoring",
          problem: "Find $\\lim_{x \\to 3} \\frac{x^{2} - 9}{x - 3}$.",
          steps: [
            "Substitution gives $\\frac{0}{0}$.",
            "$x^{2} - 9 = (x - 3)(x + 3)$, so for $x \\ne 3$ the quotient equals $x + 3$.",
            "$\\lim_{x \\to 3} (x + 3) = 6$.",
          ],
          answer: "$6$.",
        },
        {
          kind: "example",
          title: "Rationalising",
          problem: "Find $\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$.",
          steps: [
            "Multiply top and bottom by the conjugate $\\sqrt{x + 4} + 2$.",
            "The numerator becomes $(x + 4) - 4 = x$, so the quotient is $\\frac{1}{\\sqrt{x + 4} + 2}$ for $x \\ne 0$.",
            "Substitute: $\\frac{1}{2 + 2} = \\frac{1}{4}$.",
          ],
          answer: "$\\frac{1}{4}$.",
        },
        {
          kind: "list",
          items: [
            "**Compound fractions**: combine over a common denominator, e.g. $\\frac{\\frac{1}{x} - \\frac{1}{2}}{x - 2} = \\frac{-1}{2x} \\to -\\frac{1}{4}$.",
            "**Nonzero over zero** ($\\frac{5}{0}$) is not indeterminate: the limit is infinite or fails to exist — check the signs of the one-sided limits.",
          ],
        },
      ],
    },
    {
      heading: "The squeeze theorem",
      blocks: [
        {
          kind: "formula",
          latex: "g(x) \\le f(x) \\le h(x) \\text{ near } a, \\quad \\lim_{x \\to a} g = \\lim_{x \\to a} h = L \\;\\implies\\; \\lim_{x \\to a} f = L",
        },
        {
          kind: "example",
          title: "A wildly oscillating factor",
          problem: "Find $\\lim_{x \\to 0} x^{2} \\sin\\left(\\frac{1}{x}\\right)$.",
          steps: [
            "$\\sin$ is bounded: $-1 \\le \\sin\\left(\\frac{1}{x}\\right) \\le 1$.",
            "Multiply by $x^{2} \\ge 0$: $-x^{2} \\le x^{2}\\sin\\left(\\frac{1}{x}\\right) \\le x^{2}$.",
            "Both bounds tend to $0$.",
          ],
          answer: "$0$. Bounded times something tending to $0$ tends to $0$.",
        },
        {
          kind: "formula",
          latex: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\qquad \\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0",
          caption: "The two trigonometric limits, proved by squeezing $\\cos x \\le \\frac{\\sin x}{x} \\le 1$ (angles in radians)",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Scaling the angle",
          text:
            "$\\lim_{x \\to 0} \\frac{\\sin(kx)}{x} = k$: write it as $k \\cdot \\frac{\\sin(kx)}{kx}$ and let $u = kx \\to 0$. " +
            "These limits are exactly the derivatives of $\\sin$ and $\\cos$ at $0$, which is where the trig derivative rules come from.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§2.3 Calculating Limits Using the Limit Laws; §3.3 (the limit of sin θ / θ)" },
    { source: "OpenStax, Calculus Volume 1", locator: "§2.3 The Limit Laws" },
  ],
};
