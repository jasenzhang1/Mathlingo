import type { WikiArticle } from "../types";

export const starsAndBars: WikiArticle = {
  conceptId: "stars-and-bars",
  summary:
    "Stars and bars counts the ways to split n identical items into k labeled groups (some groups may be empty). Draw the n items as n stars in a row; a placement of k − 1 bars among them marks off the k groups. Counting placements of bars is a `combinations` problem in disguise.",
  sections: [
    {
      heading: "The picture and the formula",
      blocks: [
        {
          kind: "prose",
          text: "Line up n identical stars: ★★★★★. To split them into k groups, insert k − 1 bars into the gaps around and between the stars (bars can sit next to each other, giving an empty group). The whole arrangement — n stars and k − 1 bars — has n + k − 1 symbols total, and the arrangement is completely determined by which of those n + k − 1 positions hold the k − 1 bars (equivalently, which hold the n stars).",
        },
        {
          kind: "formula",
          latex: "\\binom{n+k-1}{k-1} = \\binom{n+k-1}{n}",
          caption: "Ways to split n identical items into k labeled groups, empty groups allowed",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It's a combinations problem wearing a disguise",
          text: "There is nothing new here beyond `combinations`: choosing where the k − 1 bars go among n + k − 1 slots is exactly $\\binom{n+k-1}{k-1}$. Stars and bars is a picture that turns an unfamiliar-looking distribution problem into a familiar 'choose positions' problem.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Distributing candies",
          problem: "In how many ways can 10 identical candies be distributed among 3 children (a child may get none)?",
          steps: [
            "n = 10 candies, k = 3 children (labeled groups, since the children are distinct).",
            "The count is $\\binom{n+k-1}{k-1} = \\binom{10+3-1}{3-1} = \\binom{12}{2}$.",
            "$\\binom{12}{2} = (12 \\times 11)/2 = 66$.",
            "Sanity check on a tiny case: 2 candies among 2 children gives $\\binom{2+2-1}{2-1}=\\binom{3}{1}=3$ — matching the direct list (0,2), (1,1), (2,0). ✓",
          ],
          answer: "66 ways. `[verified: C(12,2)=66; small case (0,2)/(1,1)/(2,0) confirms the formula]`",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "When every group must get at least one",
          text: "If each of the k groups needs at least one item, first hand out 1 item to each group (using up k of the n items), then distribute the remaining n − k items freely: $\\binom{(n-k)+k-1}{k-1} = \\binom{n-1}{k-1}$. Forgetting this pre-distribution step is the most common error in this concept — it silently allows empty groups when the problem forbids them.",
        },
      ],
    },
    {
      heading: "Where stars and bars goes wrong",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Treating the k groups as unlabeled — stars and bars assumes the groups are distinguishable (child A vs. child B). If the groups are *not* labeled, this is `integer-partitions` instead, and the count is smaller and has no closed formula.",
            "Using $\\binom{n+k-1}{k}$ instead of $\\binom{n+k-1}{k-1}$ — both are legitimate binomial coefficients, but only $\\binom{n+k-1}{k-1} = \\binom{n+k-1}{n}$ counts this problem; double-check by re-deriving on a tiny case like n = k = 2 rather than trusting which index 'looks right'.",
            "Forgetting the +1-per-group adjustment when groups must be nonempty, and reporting $\\binom{n+k-1}{k-1}$ when the problem actually required $\\binom{n-1}{k-1}$.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 3.5 (Combinations with Repetition)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 15.2 (Sets and Sequences)" },
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§6.5" },
  ],
};
