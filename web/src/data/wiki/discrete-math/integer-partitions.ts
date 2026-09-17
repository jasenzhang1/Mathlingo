import type { WikiArticle } from "../types";

export const integerPartitions: WikiArticle = {
  conceptId: "integer-partitions",
  summary:
    "An integer partition of n is a way of writing n as a sum of positive integers where order doesn't matter — 4 = 3+1 and 4 = 1+3 are the same partition. That single word 'unlabeled' is the entire difference from `stars-and-bars`, and it is enough to destroy the clean closed-form formula that concept enjoyed.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Partition of n",
              description:
                "A multiset of positive integers (the 'parts') that sum to n, listed in nonincreasing order by convention so each partition has one canonical written form.",
            },
            {
              term: "p(n)",
              description: "The number of distinct partitions of n.",
            },
          ],
        },
        {
          kind: "table",
          headers: ["n", "Partitions", "p(n)"],
          rows: [
            ["1", "1", "1"],
            ["2", "2, 1+1", "2"],
            ["3", "3, 2+1, 1+1+1", "3"],
            ["4", "4, 3+1, 2+2, 2+1+1, 1+1+1+1", "5"],
            ["5", "5, 4+1, 3+2, 3+1+1, 2+2+1, 2+1+1+1, 1+1+1+1+1", "7"],
            ["6", "6, 5+1, 4+2, 4+1+1, 3+3, 3+2+1, 3+1+1+1, 2+2+2, 2+2+1+1, 2+1+1+1+1, 1×6", "11"],
          ],
          caption: "`[verified: each row enumerated by hand]`",
        },
      ],
    },
    {
      heading: "Labeled vs. unlabeled: the contrast with stars and bars",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "The one distinction that decides which formula to use",
          text: "Splitting n identical items into k *distinguishable* groups (child A's candies vs. child B's) is `stars-and-bars`, and it has a clean formula because the groups' labels let you always say 'this many went to group 1'. Splitting n into k *indistinguishable* groups — or equivalently, into a sum with no group labels at all — is a partition, and there is no simple closed-form for p(n); it is computed recursively or via generating functions.",
        },
        {
          kind: "example",
          title: "Same n, two very different counts",
          problem: "Split 5 identical items into 3 groups. Compare the labeled count (stars and bars) to the unlabeled count (partitions into at most 3 parts).",
          steps: [
            "Labeled (groups are distinct, empty allowed): $\\binom{n+k-1}{k-1} = \\binom{5+3-1}{3-1} = \\binom{7}{2} = 21$.",
            "Unlabeled: list partitions of 5 with at most 3 parts — 5; 4+1; 3+2; 3+1+1; 2+2+1. That is 5 partitions (2+1+1+1 and 1+1+1+1+1 are excluded — they use 4 and 5 parts).",
            "21 labeled outcomes collapse down to just 5 unlabeled ones — many different (group 1, group 2, group 3) assignments are 'the same partition' once the group labels are erased.",
          ],
          answer: "21 labeled ways vs. 5 unlabeled partitions. `[verified: C(7,2)=21; direct enumeration gives 5 partitions of 5 with ≤3 parts]`",
        },
      ],
    },
    {
      heading: "How p(n) is actually computed",
      blocks: [
        {
          kind: "prose",
          text: "There is no formula for p(n) as clean as $\\binom{n+k-1}{k-1}$. In practice p(n) is built up recursively (partitions of n either use a copy of the largest allowed part or don't, giving a recurrence on the largest part size) or read off the coefficients of the generating function below. Both routes agree with the table above — p(5) = 7, p(6) = 11 — but neither is a one-line plug-in-the-numbers formula.",
        },
        {
          kind: "formula",
          latex: "\\sum_{n \\ge 0} p(n)\\,x^{n} = \\prod_{i \\ge 1} \\frac{1}{1 - x^{i}}",
          caption: "The generating function for p(n) (Euler)",
        },
      ],
    },
    {
      heading: "Where integer partitions go wrong",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Reaching for the stars-and-bars formula $\\binom{n+k-1}{k-1}$ on a partition problem — it overcounts, because it silently treats the groups as labeled.",
            "Listing the same partition twice with parts in a different order (3+1+1 and 1+3+1) — the nonincreasing convention exists precisely to give each partition one canonical form and avoid this.",
            "Confusing 'partitions of n' with 'partitions of n into exactly k parts' — the table's p(n) sums over every part count from 1 up to n; a fixed-k version is a narrower, smaller count.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.6 (Advanced Counting Using Generating Functions)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 15.3 (Generating Functions)" },
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§8.4 (Generating Functions)" },
  ],
};
