import type { WikiArticle } from "../types";

export const trees: WikiArticle = {
  conceptId: "trees",
  summary:
    "A tree is the leanest kind of connected graph possible: connected, but with no cycles at all, so removing any single edge disconnects it and adding any single edge creates a cycle. That rigidity forces a precise relationship between vertex count and edge count, which is what makes trees so useful as a scaffold — file systems, decision trees, and spanning networks all lean on it.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Tree",
              description: "A connected graph with no cycles.",
            },
            {
              term: "Forest",
              description: "A graph with no cycles, but not necessarily connected — a disjoint union of trees.",
            },
            {
              term: "Leaf",
              description: "A vertex of degree 1 in a tree.",
            },
            {
              term: "Spanning tree of G",
              description: "A subgraph of G that includes every vertex of G, uses only edges from G, and is itself a tree.",
            },
          ],
        },
        {
          kind: "formula",
          latex: "|E| = |V| - 1",
          caption: "Every tree on n vertices has exactly n − 1 edges — never more, never fewer.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Three equivalent definitions",
          text: "Any two of the following imply the third, and all three hold simultaneously for a tree on n vertices: (1) connected, (2) acyclic, (3) exactly n − 1 edges. A connected graph with n − 1 edges is automatically acyclic, and an acyclic graph with n − 1 edges is automatically connected.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Checking the edge count",
          problem: "A graph has 9 vertices and 8 edges, and is known to be connected. Must it be a tree?",
          steps: [
            "A connected graph on n vertices needs at least n − 1 = 8 edges to reach every vertex.",
            "It has exactly 8 edges — the minimum possible for connectivity.",
            "A connected graph with exactly n − 1 edges has no \"extra\" edges to spare for a cycle, so it must be acyclic.",
          ],
          answer: "Yes — connected with exactly n − 1 edges forces it to be a tree. `[verified: n=9, n−1=8 matches the given edge count]`",
        },
        {
          kind: "example",
          title: "Finding a spanning tree",
          problem: "G has vertices {a,b,c,d} and edges {a,b}, {b,c}, {c,d}, {d,a}, {a,c} (a 4-cycle plus a diagonal). Find a spanning tree of G.",
          steps: [
            "A spanning tree needs all 4 vertices and exactly 4 − 1 = 3 edges, with no cycle.",
            "G has 5 edges, so exactly 2 must be removed — but removing 2 wrong edges could disconnect a vertex.",
            "Remove {a,c} (breaks the diagonal) and {c,d} (breaks the remaining cycle a–b–c–d–a): left with {a,b}, {b,c}, {d,a}.",
            "Check: 4 vertices, 3 edges, every vertex still reachable — a, b, c, d all connected via b–a–d and b–c.",
          ],
          answer: "One valid spanning tree: {a,b}, {b,c}, {d,a}. `[verified: 3 edges = 4−1, all 4 vertices reachable, no cycle]`",
        },
      ],
    },
    {
      heading: "Where tree reasoning goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "n − 1 edges alone doesn't guarantee a tree",
          text: "A graph can have exactly n − 1 edges and still fail to be a tree — if it's disconnected, some component has a cycle while another is left short of edges entirely. The n − 1 count only forces a tree once connectedness (or acyclicity) is already established separately.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Assuming a graph's spanning tree is unique — most connected graphs with cycles have many different spanning trees, one for each way of breaking the cycles.",
            "Forgetting a spanning tree must include every vertex of G, not just be some tree found inside G's edges.",
            "Treating \"acyclic\" and \"tree\" as synonyms — an acyclic graph that isn't connected is a forest, not a (single) tree.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§11.1" },
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 4 (Graph Theory)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 5 (Graph Theory)" },
  ],
};
