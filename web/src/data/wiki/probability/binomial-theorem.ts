import type { WikiArticle } from "../types";

export const binomialTheorem: WikiArticle = {
  conceptId: "binomial-theorem",
  summary:
    "The binomial theorem expands $(x+y)^{n}$ into a sum of terms weighted by binomial coefficients. In probability it does two jobs: it explains where the $\\binom{n}{k}$ in the binomial pmf comes from, and it proves that pmf sums to 1.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "(x + y)^{n} = \\sum_{k=0}^{n} \\binom{n}{k} x^{k} y^{n-k}",
          caption: "The binomial theorem",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The coefficient is a count, not an algebraic accident",
          text: "Expanding $(x+y)^{n}$ means choosing $x$ or $y$ from each of $n$ factors and multiplying. A term $x^{k}y^{n-k}$ arises once for every way of picking which $k$ factors contribute an $x$ — and there are $\\binom{n}{k}$ such ways. So the coefficient counts selections, which is precisely why the same number appears in the binomial distribution.",
        },
      ],
    },
    {
      heading: "The connection to the binomial distribution",
      blocks: [
        {
          kind: "formula",
          latex: "\\sum_{k=0}^{n} \\binom{n}{k} p^{k}(1-p)^{n-k} = \\big(p + (1-p)\\big)^{n} = 1^{n} = 1",
          caption: "The binomial pmf sums to 1 — immediately, by the theorem",
        },
        {
          kind: "prose",
          text: "This is not a coincidence of notation. The pmf is the theorem's expansion with $x = p$ and $y = 1-p$: the probability of one particular sequence with $k$ successes is $p^{k}(1-p)^{n-k}$, and $\\binom{n}{k}$ counts the orderings that produce the same total. Dropping the coefficient — a common error — gives the probability of one specific sequence rather than of $k$ successes in any order.",
        },
      ],
    },
    {
      heading: "Identities that follow",
      blocks: [
        {
          kind: "table",
          headers: ["Substitution", "Identity", "Reading"],
          rows: [
            [
              "$x = y = 1$",
              "$\\sum_{k} \\binom{n}{k} = 2^{n}$",
              "an $n$-element set has $2^{n}$ subsets",
            ],
            [
              "$x = 1, y = -1$",
              "$\\sum_{k} (-1)^{k}\\binom{n}{k} = 0$",
              "equally many even- and odd-sized subsets ($n \\ge 1$)",
            ],
            [
              "symmetry",
              "$\\binom{n}{k} = \\binom{n}{n-k}$",
              "choosing what to take = choosing what to leave",
            ],
            [
              "Pascal",
              "$\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$",
              "condition on whether a fixed element is included",
            ],
            [
              "Vandermonde",
              "$\\sum_{j}\\binom{m}{j}\\binom{n}{k-j} = \\binom{m+n}{k}$",
              "split a choice across two groups — the hypergeometric identity",
            ],
          ],
        },
        {
          kind: "prose",
          text: "The alternating-sum identity is what makes inclusion–exclusion work: an outcome in exactly $m$ events is counted $\\sum_{k}(-1)^{k+1}\\binom{m}{k} = 1$ times overall. Vandermonde's identity is what makes the hypergeometric pmf sum to 1, in exactly the way the binomial theorem does for the binomial.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Extracting a coefficient",
          problem: "Find the coefficient of $x^{3}y^{5}$ in $(x+y)^{8}$.",
          steps: [
            "The exponents sum to 8, so this is the $k = 3$ term.",
            "Coefficient is $\\binom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1}$.",
            "$= \\dfrac{336}{6} = 56$.",
            "Check by symmetry: $\\binom{8}{5} = \\binom{8}{3} = 56$. ✓",
          ],
          answer: "$56$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The generalisation to non-integer powers",
          text: "Newton's binomial series extends the theorem to any real exponent: $(1+x)^{\\alpha} = \\sum_{k \\ge 0} \\binom{\\alpha}{k}x^{k}$ for $|x| < 1$, with $\\binom{\\alpha}{k} = \\alpha(\\alpha-1)\\cdots(\\alpha-k+1)/k!$. The sum is now infinite. This is where the *negative* binomial distribution gets its name — its pmf sums to 1 by exactly this series with a negative exponent.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 1.4, 3.4" },
    { source: "Casella & Berger, Statistical Inference", locator: "§3.2.1" },
    { source: "Mathlingo assessment bank", locator: "assessments/foundations-of-probability.md" },
  ],
};
