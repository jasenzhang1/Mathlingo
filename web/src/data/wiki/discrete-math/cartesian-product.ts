import type { WikiArticle } from "../types";

export const cartesianProduct: WikiArticle = {
  conceptId: "cartesian-product",
  summary:
    "The Cartesian product pairs every element of one set with every element of another, keeping track of *order*. It is the construction that turns two separate sets into coordinates — the plane $\\mathbb{R} \\times \\mathbb{R}$, a chessboard square, a database row — and it is the object every relation and function in this cluster is secretly a subset of.",
  sections: [
    {
      heading: "The definition",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Cartesian product $A \\times B$",
              description:
                "$A \\times B = \\{(a, b) : a \\in A, b \\in B\\}$ — the set of all *ordered pairs* with first coordinate from $A$ and second from $B$.",
            },
            {
              term: "Ordered pair $(a, b)$",
              description:
                "Distinct from the set $\\{a, b\\}$: order matters, so $(1, 2) \\neq (2, 1)$, while $\\{1,2\\} = \\{2,1\\}$.",
            },
            {
              term: "$A \\times A$",
              description:
                "The product of a set with itself, e.g. $\\mathbb{R} \\times \\mathbb{R} = \\mathbb{R}^2$, the Cartesian plane this construction is named for.",
            },
          ],
        },
        {
          kind: "example",
          title: "Worked example",
          problem: "A = {1, 2}, B = {x, y, z}. List A × B and find |A × B|.",
          steps: [
            "Pair 1 with every element of B: (1,x), (1,y), (1,z).",
            "Pair 2 with every element of B: (2,x), (2,y), (2,z).",
            "Count: 2 choices for the first coordinate × 3 choices for the second.",
          ],
          answer: "A × B = {(1,x),(1,y),(1,z),(2,x),(2,y),(2,z)}; |A×B| = 2·3 = 6.",
        },
      ],
    },
    {
      heading: "Counting: the rule of product",
      blocks: [
        {
          kind: "prose",
          text: "For finite sets, $|A \\times B| = |A| \\cdot |B|$. The argument is the same one behind \"outfits = shirts × pants\": for each of the $|A|$ choices of first coordinate, there are $|B|$ independent choices of second coordinate to pair with it, and because coordinates are ordered, no pair gets produced twice.",
        },
        {
          kind: "formula",
          latex: "|A \\times B| = |A| \\cdot |B|",
          caption: "The rule of product, specialized to two ordered coordinates.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Everything with two independent coordinates is a Cartesian product",
          text: "A chessboard square (file, rank), an RGB pixel value (row, column), a table row identified by (primary key, column name) — anywhere two independent pieces of information jointly pick out one object, that object lives in a Cartesian product, whether or not anyone writes the × sign.",
        },
      ],
    },
    {
      heading: "Not commutative, not associative-looking",
      blocks: [
        {
          kind: "table",
          headers: ["Claim", "True for ∪, ∩?", "True for ×?"],
          rows: [
            ["Commutative: $X \\circ Y = Y \\circ X$", "yes", "no — $A \\times B \\neq B \\times A$ unless $A = B$ (or one is empty)"],
            ["$|X \\circ Y|$ for finite sets", "$|X \\cup Y| = |X|+|Y|-|X\\cap Y|$", "$|A \\times B| = |A|\\cdot|B|$, always, no overlap correction"],
            ["Result type", "a set of the same kind of elements", "a set of *pairs* — a new kind of element"],
          ],
          caption: "The Cartesian product behaves nothing like the operations from `set-theory`, even though the same infix-operator intuition tempts a reader to expect it to.",
        },
        {
          kind: "prose",
          text: "This is *because* it produces a different kind of object. $A \\cup B$ still lives inside the same universe as $A$ and $B$; $A \\times B$'s elements are pairs, which is a genuinely new kind of thing built from the old.",
        },
      ],
    },
    {
      heading: "Where this goes wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Assuming order doesn't matter",
          text: "The single most common slip is writing $A \\times B$ and reasoning about it as if it were $\\{ \\{a,b\\} : a \\in A, b \\in B\\}$ — unordered pairs. Swap the labels of two elements in an ordered pair and it's a different element of $A \\times B$; do the same to an unordered pair and nothing changes.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Believing $A \\times B = B \\times A$ — false in general, true only when $A = B$ or one side is empty.",
            "Treating $(a,b)$ and $\\{a,b\\}$ as interchangeable notation for \"the same two things.\"",
            "Forgetting that $A \\times \\varnothing = \\varnothing$ — pairing with nothing produces nothing, however large $A$ is.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Levin, Discrete Mathematics: An Open Introduction", locator: "Ch. 0 (Sets, Cartesian products)" },
    { source: "Rosen, Discrete Mathematics and Its Applications", locator: "§2.1 (Sets), §2.3 (Functions)" },
    { source: "MIT 6.042J, Mathematics for Computer Science", locator: "Ch. 4 (Sets and Relations)" },
  ],
};
