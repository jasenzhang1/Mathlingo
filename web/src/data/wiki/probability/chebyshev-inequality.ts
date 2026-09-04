import type { WikiArticle } from "../types";

export const chebyshevInequality: WikiArticle = {
  conceptId: "chebyshev-inequality",
  summary:
    "Chebyshev's inequality bounds how far a random variable can stray from its mean, using only the variance. It applies to *every* distribution with finite variance — no normality, no symmetry, no independence — which makes it loose for any particular distribution and invaluable when the distribution is unknown.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "P\\big(|X - \\mu| \\ge k\\sigma\\big) \\le \\frac{1}{k^{2}}, \\qquad k > 0",
          caption: "Chebyshev's inequality, in standard-deviation units",
        },
        {
          kind: "formula",
          latex: "P\\big(|X - \\mu| \\ge a\\big) \\le \\frac{\\sigma^{2}}{a^{2}}, \\qquad a > 0",
          caption: "The same statement in absolute units",
        },
        {
          kind: "prose",
          text: "It follows from Markov's inequality in one step. The variable $(X - \\mu)^{2}$ is non-negative, so Markov applies to it, and its mean is exactly $\\sigma^{2}$:",
        },
        {
          kind: "formula",
          latex: "P\\big(|X - \\mu| \\ge a\\big) = P\\big((X-\\mu)^{2} \\ge a^{2}\\big) \\le \\frac{\\mathbb{E}[(X-\\mu)^{2}]}{a^{2}} = \\frac{\\sigma^{2}}{a^{2}}",
          caption: "Squaring turns a two-sided deviation into a non-negative variable Markov can bound",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why squaring is the right move",
          text: "The event $|X - \\mu| \\ge a$ is two-sided, and Markov only handles upper tails of non-negative variables. Squaring accomplishes both things at once: it makes the quantity non-negative, and it maps both tails onto the same upper tail. This is the standard way to convert a two-sided question into a form the one-sided machinery can answer.",
        },
      ],
    },
    {
      heading: "How loose is it?",
      blocks: [
        {
          kind: "table",
          headers: ["$k$", "Chebyshev bound", "Actual, if normal", "Ratio"],
          rows: [
            ["2", "$\\le 25\\%$", "$4.6\\%$", "5×"],
            ["3", "$\\le 11.1\\%$", "$0.27\\%$", "41×"],
            ["4", "$\\le 6.25\\%$", "$0.0063\\%$", "≈1000×"],
          ],
          caption:
            "For a normal distribution Chebyshev overstates the tail by orders of magnitude — the price of a bound that holds for every distribution, including much heavier-tailed ones.",
        },
        {
          kind: "prose",
          text: "The bound is nevertheless tight in the sense that matters: there exist distributions attaining it. Put mass $1/(2k^2)$ at $\\mu \\pm k\\sigma$ and the rest at $\\mu$; this has standard deviation $\\sigma$ and hits the bound exactly. So $1/k^{2}$ cannot be improved without assuming more than a variance.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It says nothing for $k \\le 1$",
          text: "At $k = 1$ the bound is $P(|X - \\mu| \\ge \\sigma) \\le 1$, which is true of every event. Any $k < 1$ gives a bound above 1. Chebyshev only becomes informative beyond one standard deviation, and only becomes useful somewhat beyond that.",
        },
      ],
    },
    {
      heading: "What it is used for",
      blocks: [
        {
          kind: "example",
          title: "A distribution-free guarantee",
          problem:
            "A process has mean 100 and standard deviation 5, with unknown shape. At least what fraction of output lies within 85 to 115?",
          steps: [
            "The interval is $\\mu \\pm 15 = \\mu \\pm 3\\sigma$, so $k = 3$.",
            "$P(|X - 100| \\ge 15) \\le 1/9 \\approx 0.111$.",
            "So $P(85 < X < 115) \\ge 1 - 1/9 = 8/9 \\approx 0.889$.",
            "If the process were known to be normal the answer would be about $0.9973$ — but that assumption has not been made.",
          ],
          answer: "At least $88.9\\%$, whatever the distribution.",
        },
        {
          kind: "prose",
          text: "Its most important theoretical use is proving the weak law of large numbers. Applied to the sample mean, whose variance is $\\sigma^{2}/n$, it gives $P(|\\bar{X}_n - \\mu| > \\varepsilon) \\le \\sigma^{2}/(n\\varepsilon^{2})$, which tends to zero — the whole proof in one line. Chebyshev is what converts \"averaging shrinks variance\" into \"averaging concentrates at the mean\".",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**When the distribution is unknown** and you need a guarantee rather than an estimate.",
            "**As a sanity check** — if a claimed result violates Chebyshev, the claim or the moments are wrong.",
            "**In proofs**, where a crude bound that always holds beats a sharp one that needs assumptions.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "One-sided version",
          text: "Cantelli's inequality sharpens the one-sided case to $P(X - \\mu \\ge a) \\le \\sigma^{2}/(\\sigma^{2} + a^{2})$, which is strictly better than halving Chebyshev's two-sided bound. Worth knowing when only one direction of deviation matters — a shortfall in capacity, say, rather than an excess.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 10.1" },
    { source: "Casella & Berger, Statistical Inference", locator: "§3.6, §5.5.1" },
    { source: "Wasserman, All of Statistics", locator: "§4.1–4.2" },
    { source: "Mathlingo assessment bank", locator: "assessments/inequalities-and-convergence.md" },
  ],
};
