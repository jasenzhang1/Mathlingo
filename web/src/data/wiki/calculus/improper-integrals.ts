import type { WikiArticle } from "../types";

export const improperIntegralsWiki: WikiArticle = {
  conceptId: "improper-integrals",

  summary:
    "A Riemann integral needs a bounded interval and a bounded function. Improper integrals relax both by taking a " +
    "limit: integrate up to a finite cutoff, then let the cutoff run off to infinity or up to the singularity. If the " +
    "limit is finite the integral converges. These integrals are everywhere in probability — every density integrates " +
    "to $1$ over an infinite range.",

  sections: [
    {
      heading: "Two kinds",
      blocks: [
        {
          kind: "formula",
          latex: "\\int_a^{\\infty} f(x)\\,dx = \\lim_{t \\to \\infty} \\int_a^{t} f(x)\\,dx \\qquad \\int_a^{b} f(x)\\,dx = \\lim_{t \\to a^{+}} \\int_t^{b} f(x)\\,dx",
          caption: "Type 1: infinite interval. Type 2: $f$ blows up at the endpoint $a$.",
        },
        {
          kind: "example",
          title: "An infinite interval",
          problem: "Evaluate $\\int_0^{\\infty} e^{-2x}\\,dx$.",
          steps: [
            "$\\int_0^{t} e^{-2x}\\,dx = \\frac{1}{2}(1 - e^{-2t})$.",
            "As $t \\to \\infty$, $e^{-2t} \\to 0$.",
          ],
          answer: "$\\frac{1}{2}$ — so $2e^{-2x}$ is a probability density on $[0, \\infty)$ (the exponential with rate $2$).",
        },
        {
          kind: "example",
          title: "A singularity",
          problem: "Evaluate $\\int_0^{4} \\frac{dx}{\\sqrt{x}}$.",
          steps: [
            "$\\int_t^{4} x^{-1/2}\\,dx = \\left[2\\sqrt{x}\\right]_t^{4} = 4 - 2\\sqrt{t}$.",
            "As $t \\to 0^{+}$ this tends to $4$.",
          ],
          answer: "$4$ — an infinitely tall region with finite area.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Hidden singularities and two-sided limits",
          text:
            "$\\int_{-1}^{1} \\frac{dx}{x^{2}}$ is not $\\left[-\\frac{1}{x}\\right]_{-1}^{1} = -2$ (a positive function can't have " +
            "negative area): the integrand blows up at $0$, and both halves diverge. Likewise $\\int_{-\\infty}^{\\infty} f$ " +
            "must be split at a point and each half must converge on its own — $\\int_{-\\infty}^{\\infty} x\\,dx$ diverges " +
            "even though $\\int_{-t}^{t} x\\,dx = 0$.",
        },
      ],
    },
    {
      heading: "The $p$-integrals",
      blocks: [
        {
          kind: "table",
          headers: ["Integral", "Converges when", "Value"],
          rows: [
            ["$\\int_1^{\\infty} \\frac{dx}{x^{p}}$", "$p > 1$", "$\\frac{1}{p - 1}$"],
            ["$\\int_0^{1} \\frac{dx}{x^{p}}$", "$p < 1$", "$\\frac{1}{1 - p}$"],
          ],
          caption: "$p = 1$ diverges in both cases, because $\\ln x$ is unbounded at both $0$ and $\\infty$",
        },
        {
          kind: "prose",
          text:
            "These are the benchmarks. A tail must thin out faster than $\\frac{1}{x}$ to have finite area; a spike must " +
            "be gentler than $\\frac{1}{x}$.",
        },
      ],
    },
    {
      heading: "Comparison",
      blocks: [
        {
          kind: "prose",
          text:
            "Often the integral can't be computed but its convergence can be decided. If $0 \\le f \\le g$ on $[a, \\infty)$: " +
            "$\\int g$ converging forces $\\int f$ to converge, and $\\int f$ diverging forces $\\int g$ to diverge.",
        },
        {
          kind: "example",
          title: "The Gaussian tail",
          problem: "Show $\\int_1^{\\infty} e^{-x^{2}}\\,dx$ converges.",
          steps: [
            "For $x \\ge 1$, $x^{2} \\ge x$, so $e^{-x^{2}} \\le e^{-x}$.",
            "$\\int_1^{\\infty} e^{-x}\\,dx = e^{-1}$ is finite.",
          ],
          answer: "Converges, with value less than $\\frac{1}{e}$. (The full integral $\\int_{-\\infty}^{\\infty} e^{-x^{2}}\\,dx = \\sqrt{\\pi}$, found with polar coordinates.)",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Limit comparison",
          text:
            "If $\\frac{f(x)}{g(x)} \\to L$ with $0 < L < \\infty$, the two integrals converge or diverge together. So " +
            "$\\int_1^{\\infty} \\frac{x}{x^{3} + 5}\\,dx$ behaves like $\\int_1^{\\infty} \\frac{1}{x^{2}}\\,dx$: it converges.",
        },
        {
          kind: "example",
          title: "Integration by parts on an infinite interval",
          problem: "Evaluate $\\int_0^{\\infty} x e^{-x}\\,dx$.",
          steps: [
            "Parts: $\\left[-x e^{-x}\\right]_0^{t} + \\int_0^{t} e^{-x}\\,dx = -t e^{-t} + 1 - e^{-t}$.",
            "$t e^{-t} \\to 0$ (exponentials beat powers).",
          ],
          answer: "$1$ — the mean of an exponential distribution with rate $1$.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§7.8 Improper Integrals" },
    { source: "OpenStax, Calculus Volume 2", locator: "§3.7 Improper Integrals" },
  ],
};
