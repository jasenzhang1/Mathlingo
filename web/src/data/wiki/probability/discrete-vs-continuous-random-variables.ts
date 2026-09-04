import type { WikiArticle } from "../types";

export const discreteVsContinuous: WikiArticle = {
  conceptId: "discrete-vs-continuous-random-variables",
  summary:
    "Discrete random variables take countably many values and carry probability at points; continuous ones take uncountably many and carry probability only over intervals. The distinction changes what the describing function *means* — a pmf is a probability, a density is not — and it is the source of most confusion in early probability.",
  sections: [
    {
      heading: "The two types",
      blocks: [
        {
          kind: "table",
          headers: ["", "Discrete", "Continuous"],
          rows: [
            ["Values", "countable: $\\{x_1, x_2, \\ldots\\}$", "uncountable, e.g. an interval"],
            ["Described by", "pmf $p_X(x) = P(X = x)$", "density $f_X(x)$"],
            ["Is that a probability?", "**yes**, in $[0,1]$", "**no** — can exceed 1"],
            ["$P(X = a)$", "$p_X(a)$, often positive", "**always 0**"],
            ["Normalisation", "$\\sum_x p_X(x) = 1$", "$\\int f_X(x)\\,dx = 1$"],
            ["CDF shape", "step function", "continuous"],
            ["$P(a \\le X \\le b)$ vs $P(a < X < b)$", "**differ**", "identical"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The single most common error",
          text: "Treating a density value as a probability. A Uniform$(0, 0.5)$ has $f(x) = 2$ everywhere on its support — not a probability of 2. Density is probability *per unit length*, so only $f(x)\\,dx$, integrated, is a probability. The mirror-image error is forgetting that endpoints matter for discrete variables: $P(X \\le 3)$ and $P(X < 3)$ differ by $p_X(3)$.",
        },
      ],
    },
    {
      heading: "Why continuous variables assign zero to points",
      blocks: [
        {
          kind: "prose",
          text: "There are uncountably many points in an interval. If each carried the same positive probability, the total would be infinite; countable additivity does not extend to uncountable collections, so the only consistent assignment is zero at every point with positive mass spread over intervals.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Probability zero is not impossibility",
          text: "A continuous variable takes *some* value, and whichever value it takes had probability zero beforehand. So \"probability zero\" cannot mean \"cannot happen\" — it means \"happens with vanishing frequency among the alternatives\". The correct reading is: for any $\\varepsilon$, the value lands within $\\varepsilon$ of that point with probability roughly $f(x) \\cdot 2\\varepsilon$, which goes to zero as the window shrinks.",
        },
      ],
    },
    {
      heading: "The unifying view",
      blocks: [
        {
          kind: "formula",
          latex: "F_X(x) = P(X \\le x)",
          caption: "The CDF works for both, and for anything in between",
        },
        {
          kind: "prose",
          text: "This is why the CDF is the fundamental description rather than the pmf or density. It always exists. Its jumps are point masses; its slope is density. A distribution with both — a *mixed* variable — is perfectly ordinary and needs the CDF to describe it.",
        },
        {
          kind: "example",
          title: "A mixed variable",
          problem:
            "Daily rainfall is zero on 60% of days, and Exponential$(1)$ in centimetres otherwise. Describe it, and find $P(X \\le 2)$.",
          steps: [
            "There is an atom at 0: $P(X = 0) = 0.6$ — a genuinely positive probability at a single point.",
            "On $x > 0$ the density is $0.4 \\times e^{-x}$, the exponential density scaled by the 40%.",
            "Neither a pmf nor a density describes this alone; the CDF does.",
            "$P(X \\le 2) = 0.6 + 0.4\\big(1 - e^{-2}\\big) = 0.6 + 0.4(0.8647)$.",
          ],
          answer:
            "$P(X \\le 2) \\approx 0.946$. Rainfall, insurance claims, and time spent on a website are all naturally mixed this way — a spike at zero plus a continuous tail.",
        },
        {
          kind: "prose",
          text: "Everything downstream — expectation, variance, MGFs, independence — is defined analogously in both cases, with $\\sum$ replaced by $\\int$. Measure theory makes that analogy exact by defining a single integral covering both, which is one of the main reasons it is worth the abstraction.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 3.1, 5.1" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.5–1.6" },
    { source: "Wasserman, All of Statistics", locator: "§2.2–2.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/random-variables-and-density.md" },
  ],
};
