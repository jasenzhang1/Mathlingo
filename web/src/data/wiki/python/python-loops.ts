import type { WikiArticle } from "../types";

export const pythonLoopsWiki: WikiArticle = {
  conceptId: "python-loops",
  summary:
    "Python's for loop iterates over the elements of a container, not over a range of indices. That " +
    "is the idiom, and enumerate and zip exist so you rarely have to leave it: enumerate when you " +
    "need the position alongside the element, zip when you need to walk two sequences in step. " +
    "Reaching for range(len(x)) is almost always a sign that one of those two is the tool you wanted.",

  sections: [
    {
      heading: "Iterate over items, not indices",
      blocks: [
        {
          kind: "table",
          headers: ["What you need", "Idiomatic", "Not"],
          rows: [
            ["Each element", "for x in a:", "for i in range(len(a)): x = a[i]"],
            ["Index and element", "for i, x in enumerate(a):", "for i in range(len(a)):"],
            ["Two sequences in step", "for x, y in zip(a, b):", "for i in range(len(a)):"],
            ["Key and value", "for k, v in d.items():", "for k in d: v = d[k]"],
            ["A counted repeat", "for _ in range(n):", "—"],
          ],
        },
        {
          kind: "prose",
          text:
            "The index-free forms are not merely shorter. range(len(a)) hard-codes the assumption " +
            "that a supports len() and integer indexing, which rules out generators, file handles, " +
            "and every other lazily produced sequence. The item form works on anything iterable, so " +
            "the loop keeps working when the data source changes.",
        },
      ],
    },

    {
      heading: "enumerate",
      blocks: [
        {
          kind: "prose",
          text:
            "enumerate(iterable, start=0) yields (index, element) pairs. The optional start shifts " +
            "only the number reported, not the position read — enumerate(a, 1) still begins at a[0], " +
            "it just calls it 1. That is exactly what you want for human-facing output like line " +
            "numbers or rankings, and exactly what you must not use for indexing back into a.",
        },
        {
          kind: "code",
          source: "enumerate(['a','b','c'], start=1)  ->  (1,'a'), (2,'b'), (3,'c')",
          caption: "start renumbers the labels; it does not skip an element.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The off-by-one that start=1 invites",
          text:
            "for i, x in enumerate(a, 1): a[i] reads one past every element and raises IndexError on " +
            "the last. If you need both a human-readable rank and a real index, keep enumerate at its " +
            "default and add one only where you print.",
        },
      ],
    },

    {
      heading: "zip",
      blocks: [
        {
          kind: "prose",
          text:
            "zip walks several iterables in lockstep and yields tuples. It stops at the shortest one " +
            "— silently. That truncation is the single most common source of quietly wrong results " +
            "in code that pairs two columns, because nothing raises: you simply get fewer rows than " +
            "you had, and a mean computed over the wrong denominator.",
        },
        {
          kind: "example",
          title: "Silent truncation",
          problem:
            "names has 5 entries, scores has 4 because one row failed to parse. What does " +
            "dict(zip(names, scores)) give?",
          steps: [
            "zip yields pairs until the shorter iterable is exhausted — 4 pairs.",
            "The fifth name is dropped with no warning and no exception.",
            "dict() of 4 pairs is a 4-key dict, so downstream len() looks plausible.",
            "zip(names, scores, strict=True) raises ValueError instead (Python 3.10+).",
          ],
          answer:
            "A 4-entry dict, missing the last name entirely. Pass strict=True when the lengths are " +
            "supposed to match — a loud failure beats a quiet one.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "zip(*rows) transposes",
          text:
            "Unpacking a list of rows into zip pairs up the first element of each row, then the " +
            "second, and so on — turning rows into columns. zip(*zip(*rows)) gets you back, up to " +
            "tuples replacing lists.",
        },
      ],
    },

    {
      heading: "Loop control",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "break", description: "Leaves the innermost loop immediately, skipping any else clause attached to it." },
            { term: "continue", description: "Skips to the next iteration; the loop keeps going." },
            { term: "for ... else", description: "The else block runs only if the loop finished without break — the 'searched and found nothing' branch." },
            { term: "The loop variable outlives the loop", description: "After for x in a, x is still bound to the last element. On an empty a it is never bound at all, and referencing it raises NameError." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "while True needs an exit you can point at",
          text:
            "Every while loop needs a condition that provably becomes false, or a break that provably " +
            "fires. If you cannot name the line that ends the loop, it does not end.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Language Reference", locator: "§8.3 The for statement; §8.2 The while statement" },
    { source: "Python Standard Library", locator: "Built-in Functions — enumerate, zip, range" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
