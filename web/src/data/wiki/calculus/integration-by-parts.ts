import type { WikiArticle } from "../types";

export const integrationByPartsWiki: WikiArticle = {
  conceptId: "integration-by-parts",

  summary:
    "Integration by parts is the product rule run backwards. It trades the integral of $u\\,dv$ for the integral of " +
    "$v\\,du$, which is worth doing when differentiating $u$ simplifies it and integrating $dv$ doesn't make things " +
    "worse. It handles products such as $x e^{x}$, $x \\sin x$ and $x^{2}\\ln x$, and integrands with no obvious " +
    "product at all, like $\\ln x$ and $\\arctan x$.",

  sections: [
    {
      heading: "The formula",
      blocks: [
        {
          kind: "formula",
          latex: "\\int u\\,dv = uv - \\int v\\,du \\qquad \\int_a^b u\\,dv = \\Big[uv\\Big]_a^b - \\int_a^b v\\,du",
          caption: "From $(uv)' = u'v + uv'$, integrated and rearranged",
        },
        {
          kind: "example",
          title: "A polynomial times an exponential",
          problem: "Find $\\int x e^{x}\\,dx$.",
          steps: [
            "$u = x$ (differentiates to $1$), $dv = e^{x}\\,dx$ (integrates to itself). So $du = dx$, $v = e^{x}$.",
            "$\\int x e^{x}\\,dx = x e^{x} - \\int e^{x}\\,dx$.",
          ],
          answer: "$(x - 1)e^{x} + C$.",
        },
        {
          kind: "example",
          title: "No visible product",
          problem: "Find $\\int \\ln x\\,dx$.",
          steps: [
            "$u = \\ln x$, $dv = dx$; $du = \\frac{1}{x}dx$, $v = x$.",
            "$x\\ln x - \\int x \\cdot \\frac{1}{x}\\,dx = x\\ln x - x + C$.",
          ],
          answer: "$x\\ln x - x + C$. The same trick gives $\\int \\arctan x\\,dx = x\\arctan x - \\frac{1}{2}\\ln(1 + x^{2}) + C$.",
        },
      ],
    },
    {
      heading: "Choosing $u$",
      blocks: [
        {
          kind: "prose",
          text:
            "Pick $u$ to be the factor that gets simpler when differentiated, and $dv$ the factor you can integrate. The " +
            "**LIATE** ordering is a reliable guide for $u$: **L**ogarithms, **I**nverse trig, **A**lgebraic (polynomials), " +
            "**T**rig, **E**xponentials — choose whichever comes first.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A bad choice makes it worse",
          text:
            "In $\\int x e^{x}\\,dx$, choosing $u = e^{x}$, $dv = x\\,dx$ gives $\\frac{x^{2}}{2}e^{x} - \\int \\frac{x^{2}}{2}e^{x}\\,dx$ — " +
            "a harder integral than the one you started with. If the new integral is worse, swap roles.",
        },
        {
          kind: "example",
          title: "Repeated parts and the tabular method",
          problem: "Find $\\int x^{2} e^{x}\\,dx$.",
          steps: [
            "Differentiate $x^{2}$ down to zero: $x^{2}, 2x, 2, 0$. Integrate $e^{x}$ alongside: $e^{x}, e^{x}, e^{x}$.",
            "Multiply diagonally with alternating signs: $+x^{2}e^{x} - 2x e^{x} + 2e^{x}$.",
          ],
          answer: "$(x^{2} - 2x + 2)e^{x} + C$.",
        },
      ],
    },
    {
      heading: "Integrals that come back",
      blocks: [
        {
          kind: "example",
          title: "Solving for the integral",
          problem: "Find $I = \\int e^{x}\\sin x\\,dx$.",
          steps: [
            "Parts with $u = \\sin x$: $I = e^{x}\\sin x - \\int e^{x}\\cos x\\,dx$.",
            "Parts again with $u = \\cos x$: $\\int e^{x}\\cos x\\,dx = e^{x}\\cos x + I$.",
            "So $I = e^{x}\\sin x - e^{x}\\cos x - I$, i.e. $2I = e^{x}(\\sin x - \\cos x)$.",
          ],
          answer: "$I = \\frac{1}{2}e^{x}(\\sin x - \\cos x) + C$. Keep the same type of $u$ (trig) both times, or you undo the first step.",
        },
        {
          kind: "example",
          title: "A definite integral",
          problem: "Evaluate $\\int_0^{1} x e^{-x}\\,dx$.",
          steps: [
            "$u = x$, $dv = e^{-x}dx$, $v = -e^{-x}$.",
            "$\\left[-x e^{-x}\\right]_0^{1} + \\int_0^{1} e^{-x}\\,dx = -e^{-1} + (1 - e^{-1})$.",
          ],
          answer: "$1 - \\frac{2}{e} \\approx 0.2642$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where parts shows up later",
          text:
            "Parts proves $\\Gamma(n + 1) = n\\,\\Gamma(n)$, so $\\int_0^{\\infty} x^{n}e^{-x}\\,dx = n!$; it gives the " +
            "remainder in Taylor's theorem; and moving a derivative from one function to another is the core move in " +
            "the theory of differential equations and in computing expectations like $\\mathbb{E}[X] = \\int_0^{\\infty} P(X > x)\\,dx$.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§7.1 Integration by Parts" },
    { source: "OpenStax, Calculus Volume 2", locator: "§3.1 Integration by Parts" },
  ],
};
