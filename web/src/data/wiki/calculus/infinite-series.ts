import type { WikiArticle } from "../types";

export const infiniteSeriesWiki: WikiArticle = {
  conceptId: "infinite-series",

  summary:
    "An infinite series $\\sum_{n=1}^{\\infty} a_n$ is defined as the limit of its partial sums $S_N = a_1 + \\cdots + a_N$. " +
    "Only a few series can be summed exactly — geometric and telescoping ones — so most of the work is deciding " +
    "*whether* a series converges, with a toolkit of tests: divergence, integral, comparison, ratio and alternating " +
    "series.",

  sections: [
    {
      heading: "Series you can sum",
      blocks: [
        {
          kind: "formula",
          latex: "\\sum_{n=0}^{\\infty} a r^{n} = \\frac{a}{1 - r} \\quad (|r| < 1)",
          caption: "Geometric series: diverges for $|r| \\ge 1$",
        },
        {
          kind: "example",
          title: "A repeating decimal",
          problem: "Write $0.\\overline{36}$ as a fraction.",
          steps: [
            "$0.3636\\ldots = \\frac{36}{100} + \\frac{36}{100^{2}} + \\cdots$, geometric with $a = \\frac{36}{100}$, $r = \\frac{1}{100}$.",
            "Sum $= \\frac{36/100}{99/100} = \\frac{36}{99}$.",
          ],
          answer: "$\\frac{4}{11}$.",
        },
        {
          kind: "example",
          title: "Telescoping",
          problem: "Sum $\\sum_{n=1}^{\\infty} \\frac{1}{n(n + 1)}$.",
          steps: [
            "$\\frac{1}{n(n + 1)} = \\frac{1}{n} - \\frac{1}{n + 1}$, so $S_N = 1 - \\frac{1}{N + 1}$ after cancellation.",
            "$S_N \\to 1$.",
          ],
          answer: "$1$.",
        },
      ],
    },
    {
      heading: "The convergence tests",
      blocks: [
        {
          kind: "table",
          headers: ["Test", "Statement", "Use when"],
          rows: [
            ["Divergence ($n$th term)", "$a_n \\not\\to 0 \\implies$ diverges", "always check first"],
            ["Integral", "$a_n = f(n)$, $f$ positive decreasing: $\\sum a_n$ and $\\int_1^{\\infty} f$ converge together", "$f$ is easy to integrate"],
            ["$p$-series", "$\\sum \\frac{1}{n^{p}}$ converges $\\iff p > 1$", "a benchmark for comparison"],
            ["Comparison / limit comparison", "compare with a known series of positive terms", "rational or algebraic terms"],
            ["Ratio", "$\\left|\\frac{a_{n+1}}{a_n}\\right| \\to L$: $L < 1$ converges absolutely, $L > 1$ diverges, $L = 1$ no information", "factorials, exponentials"],
            ["Alternating series", "$\\sum (-1)^{n} b_n$ with $b_n$ decreasing to $0$ converges", "signs alternate"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$a_n \\to 0$ is necessary, not sufficient",
          text:
            "The harmonic series $\\sum \\frac{1}{n}$ has terms tending to $0$ but diverges: grouping $\\frac{1}{3} + \\frac{1}{4} > \\frac{1}{2}$, " +
            "$\\frac{1}{5} + \\cdots + \\frac{1}{8} > \\frac{1}{2}$, and so on adds infinitely many halves. Its partial sums grow like $\\ln N$.",
        },
        {
          kind: "example",
          title: "Ratio test",
          problem: "Does $\\sum_{n=1}^{\\infty} \\frac{n^{2}}{2^{n}}$ converge?",
          steps: [
            "$\\frac{a_{n+1}}{a_n} = \\frac{(n + 1)^{2}}{2^{n + 1}} \\cdot \\frac{2^{n}}{n^{2}} = \\frac{1}{2}\\left(\\frac{n + 1}{n}\\right)^{2} \\to \\frac{1}{2}$.",
          ],
          answer: "$L = \\frac{1}{2} < 1$: converges (in fact to $6$).",
        },
        {
          kind: "example",
          title: "Limit comparison",
          problem: "Does $\\sum \\frac{n + 1}{n^{3} + 2}$ converge?",
          steps: [
            "For large $n$ the terms look like $\\frac{n}{n^{3}} = \\frac{1}{n^{2}}$.",
            "$\\frac{(n + 1)/(n^{3} + 2)}{1/n^{2}} \\to 1$, a positive finite limit, and $\\sum \\frac{1}{n^{2}}$ converges.",
          ],
          answer: "Converges.",
        },
      ],
    },
    {
      heading: "Absolute and conditional convergence",
      blocks: [
        {
          kind: "prose",
          text:
            "$\\sum a_n$ converges **absolutely** if $\\sum |a_n|$ converges; absolute convergence implies convergence. A " +
            "series that converges but not absolutely converges **conditionally**. The alternating harmonic series " +
            "$1 - \\frac{1}{2} + \\frac{1}{3} - \\cdots = \\ln 2$ is the standard example.",
        },
        {
          kind: "formula",
          latex: "\\left| S - S_N \\right| \\le b_{N + 1}",
          caption: "Alternating series estimate: the error is at most the first omitted term",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Rearrangements",
          text:
            "Absolutely convergent series can be reordered freely. Conditionally convergent ones cannot: Riemann proved " +
            "their terms can be rearranged to sum to any number at all. Order matters when cancellation is doing the work.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§11.2 Series; §11.3–§11.7 (integral, comparison, alternating, ratio and root tests; strategy)" },
    { source: "OpenStax, Calculus Volume 2", locator: "Ch. 5, Sequences and Series" },
  ],
};
