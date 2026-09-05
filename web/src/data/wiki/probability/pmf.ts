import type { WikiArticle } from "../types";

export const pmf: WikiArticle = {
  conceptId: "pmf",
  summary:
    "A probability mass function assigns to each value of a discrete random variable the probability of taking exactly that value. Unlike a density, a pmf *is* a probability — $p_X(x) = P(X = x)$ — which is why it can be read directly off a table and why it must never exceed 1.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "p_X(x) = P(X = x)",
          caption: "The probability mass function of a discrete random variable",
        },
        {
          kind: "prose",
          text: "A function is a valid pmf exactly when it satisfies two conditions. Any function meeting both is the pmf of some random variable, so checking them is how you verify a candidate.",
        },
        {
          kind: "formula",
          latex: "p_X(x) \\ge 0 \\ \\text{ for all } x, \\qquad \\sum_{x} p_X(x) = 1",
          caption: "Non-negativity and normalisation",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The normalisation condition does real work",
          text: "It is not a formality — it is how unknown constants get pinned down. Given $p_X(x) = c\\,x$ for $x \\in \\{1,2,3,4\\}$, summing gives $10c = 1$, so $c = 1/10$. The same move determines normalising constants for densities, posterior distributions, and partition functions in statistical physics.",
        },
      ],
    },
    {
      heading: "Relationship to the CDF",
      blocks: [
        {
          kind: "formula",
          latex: "F_X(x) = \\sum_{t \\le x} p_X(t), \\qquad p_X(x) = F_X(x) - F_X(x^{-})",
          caption: "The CDF accumulates the mass; the mass is the size of the jump",
        },
        {
          kind: "prose",
          text: "For a discrete variable the CDF is a step function, flat between the values $X$ can take and jumping at each of them. The height of the jump at $x$ is exactly $p_X(x)$, which is why a discrete CDF is a picture of its pmf.",
        },
      ],
    },
    {
      heading: "Common discrete pmfs",
      blocks: [
        {
          kind: "table",
          headers: ["Distribution", "pmf", "Mean", "Variance"],
          rows: [
            [
              "Bernoulli$(p)$",
              "$p^{x}(1-p)^{1-x}$, $x \\in \\{0,1\\}$",
              "$p$",
              "$p(1-p)$",
            ],
            [
              "Binomial$(n,p)$",
              "$\\binom{n}{k}p^{k}(1-p)^{n-k}$",
              "$np$",
              "$np(1-p)$",
            ],
            [
              "Geometric$(p)$",
              "$(1-p)^{k-1}p$, $k \\ge 1$",
              "$1/p$",
              "$(1-p)/p^{2}$",
            ],
            [
              "Poisson$(\\lambda)$",
              "$e^{-\\lambda}\\lambda^{k}/k!$",
              "$\\lambda$",
              "$\\lambda$",
            ],
            [
              "Uniform on $\\{1,\\ldots,n\\}$",
              "$1/n$",
              "$(n+1)/2$",
              "$(n^{2}-1)/12$",
            ],
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Finding a constant and using the pmf",
          problem:
            "$X$ has pmf $p_X(x) = c/2^{x}$ for $x = 1, 2, 3, \\ldots$. Find $c$, then $P(X \\ge 3)$.",
          steps: [
            "Normalisation: $\\sum_{x=1}^{\\infty} c/2^{x} = c \\sum_{x=1}^{\\infty} (1/2)^{x} = c \\cdot 1 = 1$, using the geometric series $\\sum_{x \\ge 1} r^{x} = r/(1-r)$ with $r = 1/2$.",
            "So $c = 1$ and $p_X(x) = 2^{-x}$.",
            "$P(X \\ge 3) = 1 - P(X = 1) - P(X = 2) = 1 - 1/2 - 1/4$.",
            "Or directly: $\\sum_{x \\ge 3} 2^{-x} = (1/8)/(1 - 1/2) = 1/4$. ✓",
          ],
          answer: "$c = 1$, and $P(X \\ge 3) = 1/4$.",
        },
      ],
    },
    {
      heading: "Where it goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "A pmf is a probability; a density is not",
          text: "$p_X(x)$ must lie in $[0,1]$ — a pmf value above 1 is always an error. A density $f_X(x)$ has no such bound and routinely exceeds 1: a Uniform$(0, 0.5)$ has $f = 2$ everywhere on its support. Densities are probability *per unit length*, and only integrate to a probability. Carrying pmf intuition into the continuous case is the single most common confusion in this part of the subject.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Forgetting to check the support — a formula that is a valid pmf on $\\{1,2,3\\}$ says nothing about other values, which must have mass zero.",
            "Summing over the wrong range, particularly with off-by-one errors on geometric-type distributions defined from 0 versus from 1.",
            "Confusing $P(X = k)$ with $P(X \\le k)$ when reading tables or software output.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 3.2–3.4" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.6, §3.2" },
    { source: "Mathlingo assessment bank", locator: "assessments/random-variables-and-density.md" },
  ],
};
