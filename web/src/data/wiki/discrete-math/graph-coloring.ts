import type { WikiArticle } from "../types";

export const graphColoring: WikiArticle = {
  conceptId: "graph-coloring",
  summary:
    "A proper coloring assigns a color to every vertex so that no edge joins two vertices of the same color — a way of formalizing \"these things conflict, keep them apart.\" The chromatic number χ(G) is the fewest colors that manage it, and finding it exactly is hard in general, even though simple bounds get you close for free.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Proper coloring",
              description: "An assignment of colors to vertices such that adjacent vertices always receive different colors.",
            },
            {
              term: "k-colorable",
              description: "A graph that admits a proper coloring using at most k colors.",
            },
            {
              term: "Chromatic number, χ(G)",
              description: "The smallest k for which G is k-colorable.",
            },
          ],
        },
        {
          kind: "formula",
          latex: "\\chi(G) \\le \\Delta(G) + 1",
          caption: "Δ(G) is the maximum degree in G — greedy coloring never needs more than one color beyond the busiest vertex's neighbor count.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the greedy bound works",
          text: "Color vertices one at a time. When it's v's turn, at most Δ(G) neighbors have already been colored, so at most Δ(G) colors are forbidden — leaving at least one free color out of Δ(G) + 1 available. No cleverness required, just a large enough palette.",
        },
      ],
    },
    {
      heading: "Landmark facts",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "χ(G) = 1 exactly when G has no edges at all.",
            "χ(G) = 2 exactly when G is bipartite — equivalently, when G has no odd-length cycle.",
            "A complete graph on n vertices, Kₙ, has χ(Kₙ) = n — every vertex is adjacent to every other, so all n colors must differ.",
            "The Four Color Theorem: every planar graph (one drawable without crossing edges) has χ(G) ≤ 4 — famously proved only with computer assistance.",
          ],
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Coloring a cycle",
          problem: "Find χ(C₅), the chromatic number of a 5-vertex cycle.",
          steps: [
            "C₅ is bipartite only if it has no odd cycle — but C₅ *is* a 5-cycle, an odd cycle itself, so it is not bipartite. χ(C₅) ≠ 2.",
            "Try 3 colors around the cycle: 1, 2, 1, 2, 3. Check the wraparound edge between the last vertex (color 3) and the first (color 1): different colors. ✓",
            "Check every other edge: 1–2, 2–1, 1–2, 2–3 — all adjacent pairs differ.",
            "3 colors work, and 2 is impossible, so χ(C₅) = 3.",
          ],
          answer: "χ(C₅) = 3. `[verified: coloring 1,2,1,2,3 has no monochromatic edge, including the wraparound]`",
        },
        {
          kind: "example",
          title: "Using the greedy bound",
          problem: "A graph has maximum degree Δ(G) = 4. What does the greedy bound guarantee about χ(G)?",
          steps: [
            "The greedy bound states χ(G) ≤ Δ(G) + 1.",
            "Substituting Δ(G) = 4: χ(G) ≤ 5.",
          ],
          answer: "χ(G) ≤ 5 — 5 colors always suffice, though the true chromatic number could be lower. `[verified: 4+1=5]`",
        },
      ],
    },
    {
      heading: "Where coloring reasoning goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The greedy bound is an upper bound, not the answer",
          text: "Δ(G) + 1 is always safe but rarely tight. A star graph has Δ(G) equal to the number of leaves, yet χ = 2 — the center gets one color and every leaf, none of which are adjacent to each other, shares the other.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Assuming bipartite means \"exactly 2 colors are needed\" — a graph with no edges at all is also bipartite but only needs 1.",
            "Coloring greedily in a bad vertex order and concluding that number of colors is χ(G) — a different order can do better; only a matching lower bound (e.g. a clique of that size) actually proves optimality.",
            "Confusing edge coloring (colors on edges, adjacent edges differ) with vertex coloring (colors on vertices) — they're related but distinct problems with their own theorems.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§10.8" },
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 4 (Graph Theory)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 5 (Graph Theory)" },
  ],
};
