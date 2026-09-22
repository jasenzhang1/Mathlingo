import type { WikiArticle } from "../types";

export const graphPathsConnectivity: WikiArticle = {
  conceptId: "graph-paths-connectivity",
  summary:
    "Once vertices and edges are on the table, the next question is always \"can I get from here to there?\" Walks, paths, and cycles are three increasingly strict ways of moving through a graph, and connectivity asks whether every vertex can reach every other one at all.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Walk",
              description: "A sequence of vertices v₀, v₁, …, vₖ where consecutive vertices are adjacent. Vertices and edges may repeat freely.",
            },
            {
              term: "Path",
              description: "A walk that never repeats a vertex. Its length is the number of edges it uses.",
            },
            {
              term: "Cycle",
              description: "A path that returns to its starting vertex (v₀ = vₖ), with no other repeated vertex, and length at least 3 in a simple graph.",
            },
            {
              term: "Connected graph",
              description: "A graph where a path exists between every pair of vertices.",
            },
            {
              term: "Connected component",
              description: "A maximal connected subgraph — one of the disjoint \"islands\" a disconnected graph splits into.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Every path is a walk, not the reverse",
          text: "The three definitions nest: every path is a walk (just one that happens not to repeat vertices), and every cycle is built from a path. When a proof only needs *some* route between two vertices, a walk suffices; when it needs the route to be efficient or simple, reach for a path.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Walk that isn't a path",
          problem: "In a graph with edges {a,b}, {b,c}, {c,a}, {c,d}, is a–b–c–a–d a walk, a path, or neither?",
          steps: [
            "Check each consecutive pair is an edge: {a,b} ✓, {b,c} ✓, {c,a} ✓, {a,d}? — a and d are not adjacent, so this fails.",
            "Since a–d is not an edge, a–b–c–a–d is not even a walk.",
            "A valid walk covering similar ground would be a–b–c–a followed by a different route to d, e.g. a–b–c–d, using edge {c,d}.",
          ],
          answer: "Neither — a–d is not an edge, so the sequence fails to be a walk at all. `[verified against the given edge set]`",
        },
        {
          kind: "example",
          title: "Counting components",
          problem: "G has vertices {1,2,3,4,5,6} and edges {1,2}, {2,3}, {4,5}. How many connected components does G have, and what are they?",
          steps: [
            "1, 2, 3 are mutually reachable via edges {1,2} and {2,3}: one component {1,2,3}.",
            "4, 5 are reachable via {4,5}: one component {4,5}.",
            "6 has no edges at all: an isolated vertex is its own component, {6}.",
          ],
          answer: "3 components: {1,2,3}, {4,5}, {6}. `[verified: every vertex assigned to exactly one component]`",
        },
      ],
    },
    {
      heading: "Where connectivity reasoning goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "\"Connected\" is a property of the whole graph, not a vertex",
          text: "A single vertex is never \"connected\" or \"disconnected\" on its own — connectivity is a claim about every pair of vertices in the graph simultaneously. One isolated vertex is enough to make the whole graph disconnected, even if the rest of it is densely linked.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Treating a walk that revisits a vertex as automatically a cycle — a cycle specifically returns to its start with no other repeats; a walk that loops back and forth is neither a path nor a cycle.",
            "Assuming a path exists just because a walk does, without checking whether the walk's repeated vertices can be trimmed out (they always can, but the argument still needs to be made in a proof).",
            "Forgetting that connectivity in a digraph splits into two different notions — reachable following edge directions (strongly connected) versus reachable ignoring them (weakly connected).",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§10.4" },
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 4 (Graph Theory)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 5 (Graph Theory)" },
  ],
};
