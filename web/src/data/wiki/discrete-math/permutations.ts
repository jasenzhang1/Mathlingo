import type { WikiArticle } from "../types";

export const permutations: WikiArticle = {
  conceptId: "permutations",
  summary:
    "A permutation is an ordered selection of $k$ objects from a pool of $n$ distinct objects, with no repeats. $P(n,k) = n!/(n-k)!$ is exactly the arrangement count from `factorials`, stopped early — you only fill $k$ of the $n$ slots instead of all of them.",
  sections: [
    {
      heading: "Formula",
      blocks: [
        {
          kind: "formula",
          latex: "P(n,k) = \\frac{n!}{(n-k)!} = n \\times (n-1) \\times \\cdots \\times (n-k+1)",
          caption: "The number of ordered selections of $k$ objects from $n$, $0 \\le k \\le n$",
        },
        {
          kind: "prose",
          text: "Read it directly from the multiplication principle: $n$ choices for the first slot, $n-1$ for the second (one object is now used up), down to $n-k+1$ for the $k$-th slot — $k$ factors in total. The $n!/(n-k)!$ form is the same count written as a ratio: build the full arrangement of all $n$ objects, then divide out the $(n-k)!$ orderings of the objects you never placed, since they don't affect the first $k$ slots.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two special cases worth recognizing on sight",
          text: "$P(n,n) = n!/0! = n!$ — permuting all $n$ objects is the ordinary factorial. $P(n,1) = n!/(n-1)! = n$ — choosing 1 object 'in order' is just choosing it, n ways.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Podium finishes",
          problem: "8 runners compete in a race. In how many ways can gold, silver, and bronze be awarded?",
          steps: [
            "The three medals are distinct roles and no runner can hold two, so this is an ordered selection of 3 from 8 — a permutation.",
            "P(8,3) = 8 × 7 × 6.",
            "= 336.",
          ],
          answer: "336 ways. `[verified: 8×7×6=336]`",
        },
        {
          kind: "example",
          title: "Solving for k",
          problem: "P(6,k) = 120. Find k.",
          steps: [
            "Try k = 3: P(6,3) = 6 × 5 × 4 = 120. That matches on the first try, but check it's the unique answer.",
            "P(6,k) is strictly increasing in k for 0 ≤ k ≤ 6 (each extra factor is ≥ 1), so no other k gives 120.",
          ],
          answer: "k = 3. `[verified: 6×5×4=120]`",
        },
      ],
    },
    {
      heading: "Permutations vs. combinations",
      blocks: [
        {
          kind: "table",
          headers: ["Question", "Order matters?", "Formula"],
          rows: [
            ["Who wins gold/silver/bronze among 8 runners?", "Yes — roles differ", "P(8,3) = 336"],
            ["Which 3 of 8 runners make the podium at all (no medal distinction)?", "No — same 3 people either way", "C(8,3) = 56"],
          ],
          caption: "`[verified: C(8,3)=8·7·6/3!=336/6=56]`",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The giveaway question to ask",
          text: "\"If I swap two of my chosen items, is that a different outcome?\" If yes, it's a permutation problem. If the swap changes nothing, it's a combination — see `combinations` for the division by $k!$ that removes exactly those swaps.",
        },
      ],
    },
    {
      heading: "Where permutations go wrong",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Using P(n,k) when the roles are actually interchangeable — this overcounts by k!, since it separately counts every reordering of the same selected set.",
            "Applying the no-repetition formula to a situation where repetition is allowed (e.g. a 4-digit PIN can reuse digits — that's $n^k$, not P(n,k)).",
            "Losing track of which number is n and which is k — P(n,k) always has exactly k factors, starting at n and counting down.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.2 (Permutations)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 14.2 (Permutations)" },
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§6.3" },
  ],
};
