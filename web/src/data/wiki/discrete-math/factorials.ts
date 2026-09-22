import type { WikiArticle } from "../types";

export const factorials: WikiArticle = {
  conceptId: "factorials",
  summary:
    "$n!$ counts the number of ways to arrange $n$ distinct objects in a row: $n$ choices for the first slot, $n-1$ for the second (one object is used up), and so on down to $1$ for the last. Every other counting formula in this cluster — permutations, combinations, stars and bars — is built by dividing or multiplying factorials together.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "n! = n \\times (n-1) \\times (n-2) \\times \\cdots \\times 2 \\times 1, \\qquad 0! = 1",
          caption: "The factorial of a nonnegative integer $n$",
        },
        {
          kind: "prose",
          text: "Equivalently, $n!$ is defined recursively: $n! = n \\cdot (n-1)!$ for $n \\ge 1$, with the base case $0! = 1$. The recursive form is what makes the multiplication-principle argument precise: arranging $n$ objects is choosing an object for the first slot ($n$ ways) and then arranging the remaining $n-1$ objects in the rest ($(n-1)!$ ways).",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why $0! = 1$, not $0$",
          text: "There is exactly one way to arrange zero objects: do nothing. It is also the value that keeps the recursion $n! = n \\cdot (n-1)!$ consistent at $n = 1$: $1! = 1 \\cdot 0! = 1$. Formulas such as $\\binom{n}{0} = \\dfrac{n!}{0!\\,n!} = 1$ only come out right because $0! = 1$, not $0$.",
        },
      ],
    },
    {
      heading: "Small values and growth",
      blocks: [
        {
          kind: "table",
          headers: ["n", "n!"],
          rows: [
            ["0", "1"],
            ["1", "1"],
            ["2", "2"],
            ["3", "6"],
            ["4", "24"],
            ["5", "120"],
            ["6", "720"],
            ["7", "5040"],
          ],
          caption: "`[verified: each row is n × previous row]`",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Factorials grow faster than exponentials",
          text: "$10! = 3{,}628{,}800$ — already larger than $2^{20} \\approx 1{,}048{,}576$. Past a modest $n$, $n!$ dwarfs any fixed exponential $c^n$, because the factor being multiplied in keeps growing while $c$ stays fixed. This is why brute-force \"try every ordering\" algorithms become impossible almost immediately as $n$ grows.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Arranging a bookshelf",
          problem: "In how many orders can 5 distinct books be arranged on a shelf?",
          steps: [
            "This is exactly the arrangement problem the factorial answers: 5 objects, all distinct, order matters.",
            "5! = 5 × 4 × 3 × 2 × 1.",
            "= 120.",
          ],
          answer: "120 orders. `[verified: 5×4×3×2×1=120]`",
        },
        {
          kind: "example",
          title: "A ratio of factorials",
          problem: "Simplify 7! / 5! without computing either factorial in full.",
          steps: [
            "7! = 7 × 6 × 5! (the recursive definition, applied twice).",
            "So 7!/5! = 7 × 6 × 5!/5! = 7 × 6.",
            "= 42.",
          ],
          answer: "42. `[verified: 7!=5040, 5!=120, 5040/120=42]`",
        },
      ],
    },
    {
      heading: "Where factorials go wrong",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Computing a large factorial in full instead of cancelling — 7!/5! is 7×6, not (5040)/(120) recomputed from scratch; the recursive form is what makes ratios of factorials tractable by hand.",
            "Forgetting 0! = 1 and treating it as 0, which silently zeroes out formulas like $\\binom{n}{0}$ or $P(n,n)$ that should equal 1.",
            "Assuming n! is defined for negative integers — it is not, without extending to the Gamma function, which is out of scope here.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.1 (Basic Counting)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 14.1 (Counting Rules)" },
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§6.1, §6.3" },
  ],
};
