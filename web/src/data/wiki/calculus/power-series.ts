import type { WikiArticle } from "../types";

export const powerSeriesWiki: WikiArticle = {
  conceptId: "power-series",

  summary:
    "A power series $\\sum c_n (x - a)^{n}$ is a polynomial of infinite degree. For each $x$ it is a numerical series " +
    "that may or may not converge; the set where it does is always an interval centred at $a$, with a radius $R$ found " +
    "by the ratio test. Inside that interval a power series behaves like a polynomial: it can be differentiated and " +
    "integrated term by term, which turns the geometric series into series for $\\ln(1 + x)$, $\\arctan x$ and more.",

  sections: [
    {
      heading: "Radius and interval of convergence",
      blocks: [
        {
          kind: "prose",
          text:
            "Every power series has a **radius of convergence** $R \\in [0, \\infty]$: it converges absolutely for " +
            "$|x - a| < R$ and diverges for $|x - a| > R$. At the two endpoints $x = a \\pm R$ anything can happen, and each " +
            "must be checked separately.",
        },
        {
          kind: "example",
          title: "Ratio test for the radius",
          problem: "Find the interval of convergence of $\\sum_{n=1}^{\\infty} \\frac{(x - 3)^{n}}{n\\,2^{n}}$.",
          steps: [
            "$\\left|\\frac{a_{n+1}}{a_n}\\right| = \\frac{|x - 3|}{2} \\cdot \\frac{n}{n + 1} \\to \\frac{|x - 3|}{2}$.",
            "Converges when $|x - 3| < 2$, so $R = 2$ and the open interval is $(1, 5)$.",
            "At $x = 5$: $\\sum \\frac{1}{n}$, diverges. At $x = 1$: $\\sum \\frac{(-1)^{n}}{n}$, converges (alternating).",
          ],
          answer: "$[1, 5)$.",
        },
        {
          kind: "table",
          headers: ["Series", "$R$"],
          rows: [
            ["$\\sum x^{n}$", "$1$"],
            ["$\\sum \\frac{x^{n}}{n!}$", "$\\infty$"],
            ["$\\sum n!\\,x^{n}$", "$0$ (converges only at $x = 0$)"],
            ["$\\sum \\frac{x^{n}}{3^{n}}$", "$3$"],
          ],
        },
      ],
    },
    {
      heading: "Building series from the geometric series",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{1}{1 - x} = \\sum_{n=0}^{\\infty} x^{n} = 1 + x + x^{2} + \\cdots, \\qquad |x| < 1",
        },
        {
          kind: "list",
          items: [
            "**Substitute**: $\\frac{1}{1 + x^{2}} = \\sum (-1)^{n}x^{2n}$ (replace $x$ by $-x^{2}$), valid for $|x| < 1$.",
            "**Multiply**: $\\frac{x}{1 - x} = \\sum_{n=1}^{\\infty} x^{n}$.",
            "**Rescale**: $\\frac{1}{2 - x} = \\frac{1}{2} \\cdot \\frac{1}{1 - x/2} = \\sum \\frac{x^{n}}{2^{n + 1}}$, with $R = 2$.",
          ],
        },
        {
          kind: "formula",
          latex:
            "\\frac{d}{dx}\\sum c_n x^{n} = \\sum n c_n x^{n - 1}, \\qquad \\int \\sum c_n x^{n}\\,dx = C + \\sum \\frac{c_n}{n + 1}x^{n + 1}",
          caption: "Term-by-term calculus, valid inside the radius (which doesn't change; endpoints may)",
        },
        {
          kind: "example",
          title: "A series for $\\ln(1 + x)$",
          problem: "Find a power series for $\\ln(1 + x)$.",
          steps: [
            "$\\frac{1}{1 + x} = \\sum (-1)^{n}x^{n}$ for $|x| < 1$.",
            "Integrate from $0$: $\\ln(1 + x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^{n}x^{n + 1}}{n + 1} = x - \\frac{x^{2}}{2} + \\frac{x^{3}}{3} - \\cdots$.",
          ],
          answer: "Valid on $(-1, 1]$; at $x = 1$ it gives $\\ln 2 = 1 - \\frac{1}{2} + \\frac{1}{3} - \\cdots$.",
        },
      ],
    },
    {
      heading: "Using power series",
      blocks: [
        {
          kind: "example",
          title: "Summing a series by differentiating",
          problem: "Find $\\sum_{n=1}^{\\infty} \\frac{n}{2^{n}}$.",
          steps: [
            "Differentiate $\\sum x^{n} = \\frac{1}{1 - x}$: $\\sum n x^{n - 1} = \\frac{1}{(1 - x)^{2}}$.",
            "Multiply by $x$: $\\sum n x^{n} = \\frac{x}{(1 - x)^{2}}$.",
            "At $x = \\frac{1}{2}$: $\\frac{1/2}{1/4}$.",
          ],
          answer: "$2$ — the expected number of tosses to get the first head with a fair coin.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Generating functions",
          text:
            "Packaging a sequence as the coefficients of a power series turns sequence questions into function " +
            "questions. Probability-generating and moment-generating functions are exactly this trick.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The radius comes from the nearest problem",
          text:
            "$\\frac{1}{1 + x^{2}}$ is perfectly smooth on all of $\\mathbb{R}$, yet its series has $R = 1$. The obstruction " +
            "is in the complex plane, at $x = \\pm i$. A finite radius doesn't always mean a visible singularity.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§11.8 Power Series; §11.9 Representations of Functions as Power Series" },
    { source: "OpenStax, Calculus Volume 2", locator: "§6.1 Power Series and Functions; §6.2 Properties of Power Series" },
  ],
};
