import type { WikiArticle } from "../types";

export const pigeonholePrinciple: WikiArticle = {
  conceptId: "pigeonhole-principle",
  summary:
    "If you stuff more pigeons than holes into a set of holes, some hole ends up with at least two pigeons. That single obvious-sounding sentence proves surprisingly strong facts — that two people in a crowd have the same number of Instagram followers, or that some digit repeats infinitely often in the decimal expansion of a fraction — without ever saying which hole gets crowded.",
  sections: [
    {
      heading: "The basic principle",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Pigeonhole principle",
              description:
                "If n items are placed into k containers and n > k, then at least one container holds more than one item.",
            },
            {
              term: "Generalized pigeonhole principle",
              description:
                "If n items are placed into k containers, some container holds at least ⌈n/k⌉ items (the ceiling of n/k).",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It proves existence, not identity",
          text: "The principle never says *which* hole is crowded, or *which* two pigeons share it — only that at least one collision exists somewhere. That is exactly what makes it useful: it settles \"does a collision have to happen\" without the much harder job of constructing one.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Shared birth months",
          problem: "Show that among any 13 people, two must have been born in the same month.",
          steps: [
            "There are 12 possible birth months — the 12 holes.",
            "There are 13 people — the 13 pigeons.",
            "13 > 12, so by the basic pigeonhole principle, some month (hole) contains at least two people.",
          ],
          answer: "Two of the 13 people share a birth month. `[verified]`",
        },
        {
          kind: "example",
          title: "Forcing three, not just two",
          problem: "How many people are needed to guarantee that three of them share a birth month?",
          steps: [
            "With the generalized principle, n people and 12 months guarantee a month with ⌈n/12⌉ people.",
            "We need ⌈n/12⌉ ≥ 3, i.e. n/12 > 2, i.e. n ≥ 25.",
            "Check n = 24 is not enough: 24 people could be spread exactly 2 per month (24 = 12 × 2), so no month is forced above 2.",
            "Check n = 25 works: 25 people into 12 months forces some month to ⌈25/12⌉ = 3.",
          ],
          answer: "25 people are needed; 24 is not enough. `[verified: 24=12×2, ⌈25/12⌉=3]`",
        },
      ],
    },
    {
      heading: "Where pigeonhole goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Forgetting the ceiling",
          text: "The generalized bound is ⌈n/k⌉, not n/k. With 100 items in 9 containers, n/k ≈ 11.1, but the guaranteed minimum is ⌈100/9⌉ = 12, not 11 — and 9 × 11 = 99 < 100 confirms 11 is not enough to hold everything, so some container must reach 12.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Picking the wrong set of holes — the principle only bites once you have fixed a finite partition that every pigeon must land in.",
            "Applying it to conclude something quantitative beyond existence — it never tells you how many holes are crowded, only that at least one is.",
            "Forgetting it needs `n > k` (or `n > k·m` for the generalized form) — with n ≤ k, every pigeon can have its own hole and nothing is forced.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3 (Counting), Pigeonhole Principle" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 14 (Counting)" },
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§6.2" },
  ],
};
