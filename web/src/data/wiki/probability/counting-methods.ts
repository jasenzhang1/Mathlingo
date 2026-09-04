import type { WikiArticle } from "../types";

export const countingMethods: WikiArticle = {
  conceptId: "counting-methods",
  summary:
    "When every outcome is equally likely, probability reduces to counting: how many outcomes are favourable, out of how many total. The whole subject rests on two questions asked of every problem — does order matter, and can items repeat — and the four standard formulas are just the four answers.",
  sections: [
    {
      heading: "The multiplication principle",
      blocks: [
        {
          kind: "prose",
          text: "If a process has $k$ stages with $n_1, n_2, \\ldots, n_k$ choices at each, and the number of choices at each stage does not depend on the earlier picks, the total is the product. Everything below is a consequence.",
        },
        {
          kind: "formula",
          latex: "N = n_1 \\times n_2 \\times \\cdots \\times n_k",
          caption: "The multiplication principle",
        },
      ],
    },
    {
      heading: "The four cases",
      blocks: [
        {
          kind: "table",
          headers: ["", "Order matters", "Order does not matter"],
          rows: [
            [
              "**No repetition**",
              "Permutations: $P(n,k) = \\dfrac{n!}{(n-k)!}$",
              "Combinations: $\\dbinom{n}{k} = \\dfrac{n!}{k!\\,(n-k)!}$",
            ],
            [
              "**Repetition allowed**",
              "$n^{k}$",
              "Stars and bars: $\\dbinom{n+k-1}{k}$",
            ],
          ],
          caption:
            "Decide these two questions before reaching for a formula. Most counting errors are a misclassification here, not an arithmetic slip.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why combinations divide by $k!$",
          text: "Choosing $k$ items in order gives $P(n,k)$ arrangements, but each unordered set of $k$ items has been counted once for every way of ordering it — that is $k!$ times. Dividing removes the overcount. This is the single most useful sentence in combinatorics: nearly every formula is 'count with order, then divide by the overcounting'.",
        },
      ],
    },
    {
      heading: "Binomial coefficients",
      blocks: [
        {
          kind: "formula",
          latex: "\\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!}, \\qquad 0 \\le k \\le n",
          caption: "$\\binom{n}{k}$ — the number of $k$-element subsets of an $n$-element set",
        },
        {
          kind: "prose",
          text: "Two identities are worth knowing by sight, because both have one-line combinatorial proofs that are more memorable than the algebra:",
        },
        {
          kind: "formula",
          latex: "\\binom{n}{k} = \\binom{n}{n-k}, \\qquad \\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}",
          caption: "Symmetry, and Pascal's rule",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Symmetry.** Choosing which $k$ items to take is the same act as choosing which $n-k$ to leave. The two sides count the same objects by describing them differently — no algebra required.",
            "**Pascal's rule.** Fix one particular element. Every $k$-subset either contains it (choose $k-1$ from the remaining $n-1$) or does not (choose $k$ from the remaining $n-1$). Those cases are disjoint and exhaustive.",
          ],
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Order matters or not?",
          problem:
            "From 10 people: (a) how many ways to choose a committee of 3? (b) how many ways to choose a president, secretary, and treasurer?",
          steps: [
            "(a) A committee is a set — swapping two members gives the same committee. Order does not matter.",
            "$\\binom{10}{3} = \\frac{10 \\cdot 9 \\cdot 8}{3 \\cdot 2 \\cdot 1} = 120$.",
            "(b) The roles are distinct, so the same three people in different roles is a different outcome. Order matters.",
            "$P(10,3) = 10 \\cdot 9 \\cdot 8 = 720$.",
            "The ratio is $3! = 6$, exactly the number of ways to assign three roles among three fixed people.",
          ],
          answer: "(a) $120$ committees. (b) $720$ role assignments.",
        },
        {
          kind: "example",
          title: "Counting a probability",
          problem:
            "Five cards are dealt from a standard deck. What is the probability of exactly two hearts?",
          steps: [
            "All $\\binom{52}{5}$ hands are equally likely — this is what licenses counting.",
            "Favourable hands: choose 2 of the 13 hearts, and 3 of the 39 non-hearts.",
            "$\\binom{13}{2}\\binom{39}{3} = 78 \\times 9139 = 712{,}842$.",
            "$\\binom{52}{5} = 2{,}598{,}960$.",
            "$712{,}842 / 2{,}598{,}960 \\approx 0.2743$.",
          ],
          answer: "About $0.274$.",
        },
      ],
    },
    {
      heading: "Where counting goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Equally likely outcomes is an assumption, not a default",
          text: "Counting gives probability only when every outcome in the denominator is equally likely. \"The sum of two dice\" has 11 possible values, but they are not equally likely — there is one way to make 2 and six ways to make 7. Count the 36 equally likely *ordered pairs* instead. Choosing the wrong sample space is a more damaging error than miscounting within the right one.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Double-counting by treating identical items as distinguishable, or the reverse.",
            "Multiplying when the stages are not independent — if the number of options at stage 2 depends on what happened at stage 1, the multiplication principle does not apply directly.",
            "Adding overlapping cases without inclusion–exclusion.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 1.4" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.2.3" },
    { source: "Mathlingo assessment bank", locator: "assessments/foundations-of-probability.md" },
  ],
};
