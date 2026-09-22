import type { WikiArticle } from "../types";

export const eulerianHamiltonianPaths: WikiArticle = {
  conceptId: "eulerian-hamiltonian-paths",
  summary:
    "Two classic ways to tour a graph: an Eulerian path crosses every *edge* exactly once, a Hamiltonian path visits every *vertex* exactly once. They sound like mirror images, but one has a clean, checkable test — a leftover from Euler settling the Königsberg bridge problem in 1736 — and the other has no known efficient test at all.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Eulerian path",
              description: "A walk that uses every edge of the graph exactly once (vertices may repeat).",
            },
            {
              term: "Eulerian circuit",
              description: "An Eulerian path that starts and ends at the same vertex.",
            },
            {
              term: "Hamiltonian path",
              description: "A path that visits every vertex of the graph exactly once (edges may be skipped).",
            },
            {
              term: "Hamiltonian circuit",
              description: "A Hamiltonian path that returns to its starting vertex.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Edges vs. vertices — the axis they differ on",
          text: "Euler's condition counts degrees, a purely local, easy-to-check property. No analogous local test is known for Hamiltonian paths — deciding whether one exists is NP-complete, so in general the only sure method is some form of exhaustive search.",
        },
      ],
    },
    {
      heading: "Euler's theorem",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "A connected graph has an Eulerian **circuit** if and only if every vertex has even degree.",
            "A connected graph has an Eulerian **path** (not necessarily a circuit) if and only if it has exactly 0 or exactly 2 vertices of odd degree — if 2, the path must start at one and end at the other.",
          ],
        },
        {
          kind: "prose",
          text: "The Königsberg bridge problem asked for a walk crossing each of the city's 7 bridges exactly once. Euler modeled the four landmasses as vertices and the bridges as edges, found every vertex had odd degree, and concluded no such walk exists — since more than 2 odd-degree vertices rules out both an Eulerian path and circuit.",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "Testing for an Eulerian circuit",
          problem: "A connected graph has degree sequence 4, 2, 4, 2, 2. Does it have an Eulerian circuit?",
          steps: [
            "Check each degree for parity: 4 (even), 2 (even), 4 (even), 2 (even), 2 (even).",
            "Every vertex has even degree, and the graph is connected.",
            "By Euler's theorem, an Eulerian circuit exists.",
          ],
          answer: "Yes. `[verified: all five degrees are even]`",
        },
        {
          kind: "example",
          title: "Eulerian path, not circuit",
          problem: "A connected graph has degree sequence 3, 3, 2, 2, 2. Does it have an Eulerian path? A circuit?",
          steps: [
            "Odd-degree vertices: the two vertices of degree 3. That's exactly 2 odd-degree vertices.",
            "Exactly 2 odd-degree vertices means an Eulerian path exists, starting at one degree-3 vertex and ending at the other.",
            "A circuit requires 0 odd-degree vertices, but there are 2 — no Eulerian circuit.",
          ],
          answer: "Eulerian path: yes. Eulerian circuit: no. `[verified: exactly 2 odd-degree vertices — 3 and 3]`",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Confusing the two traversal types",
          text: "It's easy to reach for the even-degree test when the question was actually about a Hamiltonian path (or vice versa). Euler's theorem is a statement about edges and degrees; it says nothing about whether a vertex-covering tour exists, and no similarly simple test does.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Applying Euler's theorem to a disconnected graph — connectivity is a hypothesis of the theorem, not something it checks for you.",
            "Assuming a graph with 2 odd-degree vertices has an Eulerian circuit — it has a path, and only a path, between exactly those two vertices.",
            "Assuming Hamiltonian existence follows from a graph 'looking dense enough' — sufficient conditions exist (e.g. Dirac's theorem: min degree ≥ n/2 guarantees one), but no degree count alone is both necessary and sufficient the way it is for Eulerian paths.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Rosen, Discrete Mathematics and Its Applications, 7th ed.", locator: "§10.5" },
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 4 (Graph Theory)" },
    { source: "MIT 6.042J Mathematics for Computer Science", locator: "Ch. 5 (Graph Theory)" },
  ],
};
