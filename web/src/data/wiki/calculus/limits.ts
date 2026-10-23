import type { WikiArticle } from "../types";

export const limitsWiki: WikiArticle = {
  conceptId: "limits",

  summary:
    "The limit $\\lim_{x \\to a} f(x) = L$ says that $f(x)$ can be made as close to $L$ as we like by taking $x$ close " +
    "enough to $a$ — without ever caring what happens at $x = a$ itself. Limits are the one new idea in calculus: the " +
    "derivative is a limit of slopes, the integral is a limit of sums, and a series is a limit of partial sums.",

  sections: [
    {
      heading: "The idea",
      blocks: [
        {
          kind: "formula",
          latex: "\\lim_{x \\to a} f(x) = L",
          caption: "“the limit of $f(x)$ as $x$ approaches $a$ is $L$”",
        },
        {
          kind: "prose",
          text:
            "The value $f(a)$ plays no part. The function $f(x) = \\frac{x^{2} - 1}{x - 1}$ is undefined at $x = 1$, but " +
            "for every $x \\ne 1$ it equals $x + 1$, so its values crowd around $2$ and $\\lim_{x \\to 1} f(x) = 2$. A limit " +
            "describes the trend of $f$ near a point, not its behaviour at the point.",
        },
        {
          kind: "table",
          headers: ["$x$", "$0.9$", "$0.99$", "$0.999$", "$1.001$", "$1.01$", "$1.1$"],
          rows: [["$\\frac{x^{2} - 1}{x - 1}$", "$1.9$", "$1.99$", "$1.999$", "$2.001$", "$2.01$", "$2.1$"]],
          caption: "A table suggests the limit; it doesn't prove it",
        },
      ],
    },
    {
      heading: "One-sided limits and limits that fail to exist",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Left-hand limit $\\lim_{x \\to a^{-}} f(x)$", description: "The value approached using only $x < a$." },
            { term: "Right-hand limit $\\lim_{x \\to a^{+}} f(x)$", description: "The value approached using only $x > a$." },
            {
              term: "Two-sided limit",
              description: "$\\lim_{x \\to a} f(x) = L$ exactly when both one-sided limits exist and equal $L$.",
            },
          ],
        },
        {
          kind: "list",
          items: [
            "**Jump.** $\\frac{|x|}{x}$ has left limit $-1$ and right limit $1$ at $0$, so the two-sided limit does not exist.",
            "**Blow-up.** $\\frac{1}{x^{2}} \\to \\infty$ as $x \\to 0$. Writing $\\lim = \\infty$ describes *how* the limit fails to exist; $\\infty$ is not a number.",
            "**Oscillation.** $\\sin\\left(\\frac{1}{x}\\right)$ takes every value in $[-1, 1]$ in every interval around $0$, so it approaches nothing.",
          ],
        },
      ],
    },
    {
      heading: "The precise definition",
      blocks: [
        {
          kind: "formula",
          latex:
            "\\lim_{x \\to a} f(x) = L \\iff \\forall \\varepsilon > 0 \\;\\exists \\delta > 0 : \\; 0 < |x - a| < \\delta \\implies |f(x) - L| < \\varepsilon",
          caption: "The $\\varepsilon$–$\\delta$ definition",
        },
        {
          kind: "prose",
          text:
            "Read it as a game. A challenger names a tolerance $\\varepsilon$ around $L$; you must answer with a window " +
            "$\\delta$ around $a$ inside which every $f(x)$ lands within $\\varepsilon$ of $L$. The condition $0 < |x - a|$ " +
            "excludes $x = a$ itself, which is why $f(a)$ never matters.",
        },
        {
          kind: "example",
          title: "Proving $\\lim_{x \\to 2} (3x - 1) = 5$",
          problem: "Given $\\varepsilon > 0$, find a $\\delta$ that works.",
          steps: [
            "We need $|(3x - 1) - 5| < \\varepsilon$, i.e. $|3x - 6| = 3|x - 2| < \\varepsilon$.",
            "That holds whenever $|x - 2| < \\frac{\\varepsilon}{3}$.",
            "So choose $\\delta = \\frac{\\varepsilon}{3}$.",
          ],
          answer: "$\\delta = \\frac{\\varepsilon}{3}$. For a line of slope $m$, $\\delta = \\frac{\\varepsilon}{|m|}$ always works: steeper lines need narrower windows.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Plugging in is a theorem, not the definition",
          text:
            "For polynomials and other continuous functions, $\\lim_{x \\to a} f(x) = f(a)$, so substitution gives the " +
            "limit. That is a property of continuous functions (next lessons), not what “limit” means — and it is " +
            "exactly what fails at a hole or a jump.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§2.2 The Limit of a Function; §2.4 The Precise Definition of a Limit" },
    { source: "Spivak, Calculus", locator: "Ch. 5, Limits" },
  ],
};
