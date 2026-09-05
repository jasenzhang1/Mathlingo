import type { WikiArticle } from "../types";

export const pythonTuplesWiki: WikiArticle = {
  conceptId: "python-tuples",
  summary:
    "A tuple is an ordered sequence, indexed and sliced exactly like a list, with one deliberate " +
    "restriction: once built, it cannot be changed. That immutability is not a missing feature — it's " +
    "the signal a tuple exists to send, that a fixed-size, fixed-meaning group of values (a coordinate, " +
    "a row, a function's multiple return values) should not be mutated by whoever receives it.",

  sections: [
    {
      heading: "Fixed, ordered, and positional",
      blocks: [
        {
          kind: "code",
          source: "point = (3, 4)\nprint(point[0], point[1])   # 3 4\nname, age = (\"Ada\", 36)     # unpacking",
        },
        {
          kind: "prose",
          text:
            "Indexing, negative indexing, and slicing all work on a tuple exactly as they do on a list — " +
            "point[-1], point[0:1], the whole vocabulary transfers unchanged. What doesn't transfer is any " +
            "operation that would mutate: point[0] = 5 raises a TypeError, and there is no .append() or " +
            "  .sort() method, because both would require changing the tuple after creation.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A one-item tuple needs a trailing comma",
          text:
            "(5) is just the number 5 in parentheses — grouping, not tuple syntax. (5,) is a one-element " +
            "tuple. The comma is what actually builds the tuple; the parentheses are optional in most " +
            "contexts and only there for readability (a, b = b, a is already tuple packing and unpacking).",
        },
      ],
    },
    {
      heading: "Why immutability is the point",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Signals fixed structure",
              description: "(x, y) or (name, age, job) tells a reader the shape and meaning of each position are fixed and won't drift.",
            },
            {
              term: "Safe to share",
              description: "Handing a tuple to another function guarantees that function cannot alter your data, unlike a list passed by reference.",
            },
            {
              term: "Hashable",
              description: "A tuple of hashable elements can be used as a dict key or set member — a list cannot, precisely because a list can change after being hashed.",
            },
          ],
        },
        {
          kind: "example",
          title: "Choosing list vs. tuple",
          problem: "You're returning a fixed (row, column) pair from a function that will never need to grow, shrink, or be reordered. List or tuple?",
          steps: [
            "The pair has a fixed size (2) and each position has a specific meaning.",
            "Nothing about the pair should be mutated by the caller.",
            "A tuple communicates both the fixed size and the intent not to mutate; a list would (incorrectly) suggest either might change.",
          ],
          answer: "A tuple — (row, column).",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§4.6 Sequence Types — list, tuple, range" },
    { source: "Python Language Reference", locator: "§6.2.3 Tuple displays" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
