import type { WikiArticle } from "../types";

export const combinations: WikiArticle = {
  conceptId: "combinations",
  summary:
    "A combination is an unordered selection of $k$ objects from a pool of $n$ distinct objects — a subset, not a list. $\\binom{n}{k} = P(n,k)/k!$: start from the ordered count `permutations` gives, then divide out the $k!$ ways each subset was ordered.",
  sections: [
    {
      heading: "Formula",
      blocks: [
        {
          kind: "formula",
          latex: "\\binom{n}{k} = \\frac{P(n,k)}{k!} = \\frac{n!}{k!\\,(n-k)!}",
          caption: "The number of $k$-element subsets of an $n$-element set, $0 \\le k \\le n$",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Count with order, then divide by the overcounting",
          text: "P(n,k) counts every ordered list of k objects. Each unordered subset of k objects corresponds to exactly k! of those lists — one for every way of ordering the same k objects. Dividing by k! collapses those k! duplicates back down to a single count per subset.",
        },
      ],
    },
    {
      heading: "Identities",
      blocks: [
        {
          kind: "formula",
          latex: "\\binom{n}{k} = \\binom{n}{n-k}, \\qquad \\binom{n}{0} = \\binom{n}{n} = 1, \\qquad \\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}",
          caption: "Symmetry, the boundary cases, and Pascal's rule",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Symmetry.** Choosing which k elements to take is the same act as choosing which n − k elements to leave behind.",
            "**Boundary cases.** There is exactly one way to choose nothing, and exactly one way to choose everything.",
            "**Pascal's rule.** Fix one element. Every k-subset either includes it (choose k − 1 more from the remaining n − 1) or excludes it (choose all k from the remaining n − 1) — disjoint, exhaustive cases.",
          ],
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Committee selection",
          problem: "From 8 employees, how many different 3-person committees can be formed (no roles, just membership)?",
          steps: [
            "Membership on a committee is a set — swapping two members doesn't change the committee, so order does not matter.",
            "C(8,3) = 8!/(3!·5!) = (8·7·6)/(3·2·1).",
            "= 336/6 = 56.",
          ],
          answer: "56 committees. `[verified: 336/6=56]`",
        },
        {
          kind: "example",
          title: "Using Pascal's rule",
          problem: "Given C(5,2) = 10 and C(5,3) = 10, find C(6,3) without recomputing a full factorial ratio.",
          steps: [
            "Pascal's rule: C(6,3) = C(5,2) + C(5,3).",
            "= 10 + 10 = 20.",
            "Check directly: C(6,3) = 6!/(3!·3!) = 720/(6·6) = 720/36 = 20. ✓",
          ],
          answer: "20. `[verified: both routes give 20]`",
        },
      ],
    },
    {
      heading: "Where combinations go wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Forgetting the division by k!",
          text: "The single most common combinatorics slip is computing P(n,k) — an ordered count — for a problem where order plainly does not matter (or vice versa). A committee of {Ana, Ben, Cy} is the *same* committee no matter which name is listed first; a permutation formula would count it 3! = 6 times over.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Applying C(n,k) when repetition is allowed — that changes the problem to stars and bars, C(n+k−1,k−1), not C(n,k).",
            "Mixing up n and k, especially after using the symmetry identity — C(n,k) and C(n,n−k) are equal in value but easy to typo as different formulas.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.3 (Combinations)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 14.3 (Combinations)" },
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§6.3" },
  ],
};
