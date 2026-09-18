import type { WikiArticle } from "../types";

export const graphBasics: WikiArticle = {
  conceptId: "graph-basics",
  summary:
    "A graph is nothing more than a set of vertices and a set of edges pairing them up — a picture of *which things relate to which*, with no notion of distance or position built in. That bare structure turns out to model roads, friendships, circuits, and dependencies equally well, which is why graph theory shows up everywhere once you start looking for it.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Graph G = (V, E)",
              description: "A set of vertices V (also called nodes) together with a set of edges E, each edge joining two vertices.",
            },
            {
              term: "Simple graph",
              description: "A graph with no loops (an edge from a vertex to itself) and no multi-edges (more than one edge between the same pair). Unless stated otherwise, \"graph\" means simple graph.",
            },
            {
              term: "Directed vs. undirected",
              description: "In an undirected graph, edge {u, v} runs both ways. In a directed graph (digraph), edge (u, v) points from u to v only, and (v, u) is a different edge.",
            },
            {
              term: "Adjacent / neighbor",
              description: "Two vertices are adjacent if an edge joins them; the set of a vertex's neighbors is written N(v).",
            },
            {
              term: "Degree, deg(v)",
              description: "The number of edges incident to v — equivalently, |N(v)| in a simple graph. In a digraph, in-degree and out-degree are counted separately.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "No positions, only connections",
          text: "How a graph is drawn — where the dots sit, whether edges cross — carries no mathematical meaning. Only the pairing of vertices to edges matters, so two very different-looking drawings can be the exact same graph.",
        },
      ],
    },
    {
      heading: "The handshake lemma",
      blocks: [
        {
          kind: "formula",
          latex: "\\sum_{v \\in V} \\deg(v) = 2|E|",
          caption: "Every edge contributes exactly 2 to the total degree — one at each endpoint.",
        },
        {
          kind: "prose",
          text: "Named for the party trick: sum everyone's handshake count, and each handshake got counted twice, once per hand. A graph is no different — an edge {u, v} adds 1 to deg(u) and 1 to deg(v), so summing every degree counts every edge exactly twice.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The corollary everyone forgets to state",
          text: "Since 2|E| is even, the sum of all degrees is always even — which forces the number of odd-degree vertices to be even too. A graph can never have exactly one, or exactly three, vertices of odd degree.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Degree sequence from edges",
          problem: "G has vertices {a, b, c, d} and edges {a,b}, {a,c}, {a,d}, {b,c}. List the degree of each vertex, and check the handshake lemma.",
          steps: [
            "a appears in 3 edges: deg(a) = 3.",
            "b appears in {a,b} and {b,c}: deg(b) = 2.",
            "c appears in {a,c} and {b,c}: deg(c) = 2.",
            "d appears in {a,d} only: deg(d) = 1.",
            "Sum of degrees: 3+2+2+1 = 8. There are 4 edges, and 2×4 = 8. ✓",
          ],
          answer: "deg(a)=3, deg(b)=2, deg(c)=2, deg(d)=1. `[verified: 3+2+2+1=8=2×4]`",
        },
        {
          kind: "example",
          title: "Recovering the edge count",
          problem: "A simple graph has 6 vertices, each of degree 3. How many edges does it have?",
          steps: [
            "Sum of degrees = 6 × 3 = 18.",
            "By the handshake lemma, 2|E| = 18.",
            "|E| = 9.",
          ],
          answer: "9 edges. `[verified: 2×9=18=6×3]`",
        },
      ],
    },
    {
      heading: "Where degree counting goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Directed degree isn't one number",
          text: "In a digraph, \"the degree of v\" is ambiguous — in-degree (edges pointing in) and out-degree (edges pointing out) can differ, and the handshake lemma splits into Σ in-degree = Σ out-degree = |E|, not 2|E|.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Trying to build a simple graph with an odd number of odd-degree vertices — the handshake lemma rules it out before you draw a single edge.",
            "Forgetting that a loop (edge from v to itself) adds 2 to deg(v), not 1 — both ends of the loop are at v.",
            "Confusing |V| (vertex count) with degree — a vertex's degree can be far smaller than |V| − 1 if it isn't adjacent to everyone.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§10.1–10.2" },
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 4 (Graph Theory)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 5 (Graph Theory)" },
  ],
};
