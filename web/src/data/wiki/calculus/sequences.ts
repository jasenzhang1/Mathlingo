import type { WikiArticle } from "../types";

export const sequencesWiki: WikiArticle = {
  conceptId: "sequences",

  summary:
    "A sequence $a_1, a_2, a_3, \\ldots$ is a function on the positive integers. It converges to $L$ if its terms " +
    "eventually stay as close to $L$ as we like. Sequences are the scaffolding for series (whose sums are limits of " +
    "sequences of partial sums), for iterative algorithms (whose outputs form a sequence that should converge), and " +
    "for the number $e = \\lim \\left(1 + \\frac{1}{n}\\right)^{n}$.",

  sections: [
    {
      heading: "Convergence",
      blocks: [
        {
          kind: "formula",
          latex: "\\lim_{n \\to \\infty} a_n = L \\iff \\forall \\varepsilon > 0 \\;\\exists N : \\; n > N \\implies |a_n - L| < \\varepsilon",
        },
        {
          kind: "prose",
          text:
            "A sequence that doesn't converge **diverges** — to $\\pm\\infty$, or by oscillating like $(-1)^{n}$. The limit " +
            "laws and the squeeze theorem carry over from functions. And if $a_n = f(n)$ for a function with " +
            "$\\lim_{x \\to \\infty} f(x) = L$, then $a_n \\to L$ too — so L'Hôpital's rule can be used on $f$.",
        },
        {
          kind: "example",
          title: "Using the function",
          problem: "Find $\\lim_{n \\to \\infty} \\frac{\\ln n}{n}$.",
          steps: [
            "Consider $f(x) = \\frac{\\ln x}{x}$, an $\\frac{\\infty}{\\infty}$ form.",
            "L'Hôpital: $\\frac{1/x}{1} \\to 0$.",
          ],
          answer: "$0$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The converse direction fails",
          text:
            "$\\sin(\\pi n) = 0$ for every integer $n$, so the sequence converges to $0$ — but $\\sin(\\pi x)$ has no limit " +
            "as $x \\to \\infty$. A function limit implies the sequence limit, not the other way round.",
        },
      ],
    },
    {
      heading: "Standard limits",
      blocks: [
        {
          kind: "table",
          headers: ["Sequence", "Limit"],
          rows: [
            ["$r^{n}$", "$0$ if $|r| < 1$; $1$ if $r = 1$; diverges otherwise"],
            ["$\\sqrt[n]{n}$", "$1$"],
            ["$\\left(1 + \\frac{x}{n}\\right)^{n}$", "$e^{x}$"],
            ["$\\frac{n^{p}}{a^{n}}$ ($a > 1$)", "$0$"],
            ["$\\frac{a^{n}}{n!}$", "$0$"],
            ["$\\frac{n!}{n^{n}}$", "$0$"],
          ],
        },
        {
          kind: "example",
          title: "Compound interest",
          problem: "$\\$1{,}000$ earns $6\\%$ annual interest compounded $n$ times a year. What is it worth after a year as $n \\to \\infty$?",
          steps: [
            "Value $1000\\left(1 + \\frac{0.06}{n}\\right)^{n}$.",
            "The limit is $1000e^{0.06}$.",
          ],
          answer: "$\\$1{,}061.84$, versus $\\$1{,}060$ with annual compounding.",
        },
      ],
    },
    {
      heading: "Monotone and bounded sequences",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{bounded} \\;+\\; \\text{monotone} \\;\\implies\\; \\text{convergent}",
          caption: "Monotone convergence theorem — a consequence of the completeness of $\\mathbb{R}$",
        },
        {
          kind: "example",
          title: "A recursively defined sequence",
          problem: "Let $a_1 = 1$ and $a_{n + 1} = \\sqrt{2 + a_n}$. Find the limit.",
          steps: [
            "By induction, $a_n < 2$ (if $a_n < 2$ then $a_{n+1} < \\sqrt{4} = 2$) and $a_{n+1} > a_n$ (since $2 + a_n > a_n^{2}$ for $0 < a_n < 2$).",
            "So the sequence is increasing and bounded, hence converges to some $L$.",
            "Pass to the limit in the recursion: $L = \\sqrt{2 + L}$, so $L^{2} - L - 2 = 0$, $L = 2$ or $L = -1$.",
          ],
          answer: "$L = 2$ (the terms are positive). Existence must be shown first — solving $L = \\sqrt{2 + L}$ assumes a limit exists.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Convergent implies bounded",
          text:
            "Every convergent sequence is bounded, but not conversely: $(-1)^{n}$ is bounded and diverges. Monotonicity is " +
            "what rules out the oscillation.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§11.1 Sequences" },
    { source: "Spivak, Calculus", locator: "Ch. 22, Infinite Sequences" },
  ],
};
