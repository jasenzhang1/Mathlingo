import type { WikiArticle } from "../types";

export const pythonListOperationsWiki: WikiArticle = {
  conceptId: "python-list-operations",
  summary:
    "A list is mutable: it can be changed after it's built, without creating a new list. That single fact " +
    "is what makes lists useful — and it's the source of a specific, recurring class of bug, because " +
    "b = a shares the same list object rather than copying it, and a method that mutates in place " +
    "(like .sort()) returns None rather than the list itself.",

  sections: [
    {
      heading: "Changing a list in place",
      blocks: [
        {
          kind: "table",
          headers: ["Operation", "Mutates?", "Returns"],
          rows: [
            ["a.append(x)", "yes", "None — adds x to the end"],
            ["a.insert(i, x)", "yes", "None — inserts x at index i"],
            ["a.remove(x)", "yes", "None — deletes the first match by value"],
            ["a.pop()", "yes", "the removed last element"],
            ["a.pop(i)", "yes", "the removed element at index i"],
            ["a[i] = x", "yes", "None — replaces the item at index i"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The methods that return None are the mutating ones",
          text:
            "a.sort() sorts in place and returns None; sorted(a) leaves a alone and returns a new list " +
            "(covered next). Writing a = a.sort() is the single most common way to lose a list, and it " +
            "fails silently — you get None, not an error.",
        },
      ],
    },
    {
      heading: "Aliasing: b = a shares one object",
      blocks: [
        {
          kind: "prose",
          text:
            "b = a does not copy anything — it binds a second name to the exact same list object, so " +
            "b.append(1) changes what a sees too. A slice, by contrast, builds a new list: b = a[:] gives " +
            "an independent copy. The distinction is invisible until something mutates, at which point " +
            "it's the whole story.",
        },
        {
          kind: "example",
          title: "The same list under two names",
          problem: "a = [1, 2, 3]; b = a; c = a[:]; b.append(4); c.append(5). What are a, b, and c?",
          steps: [
            "b = a binds b to the same object as a — one list, two names.",
            "c = a[:] slices, which constructs a new list holding the same elements.",
            "b.append(4) mutates the shared object, so a sees it too.",
            "c.append(5) mutates only c's own object.",
          ],
          answer: "a == [1, 2, 3, 4], b == [1, 2, 3, 4] (the same object as a), c == [1, 2, 3, 5].",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Never mutate the list you're iterating",
          text:
            "Removing items inside a for loop makes the iterator skip elements, because indices shift " +
            "underneath it as items are removed. Build a new list — with a comprehension or a filter — " +
            "and rebind the name instead.",
        },
      ],
    },
    {
      heading: "sorted, count, index, and combining lists",
      blocks: [
        {
          kind: "table",
          headers: ["Call", "Result", "Note"],
          rows: [
            ["sorted(a)", "new sorted list", "leaves a unchanged, unlike a.sort()"],
            ["a.count(x)", "int", "how many times x appears"],
            ["a.index(x)", "int", "position of the first match; ValueError if absent"],
            ["a + b", "new list", "concatenation of two lists"],
            ["a * 3", "new list", "a repeated three times"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "[[0] * 3] * 2 is not a 2x3 grid",
          text:
            "Multiplying a list repeats references, not values. grid = [[0] * 3] * 2 gives two names for " +
            "one inner list, so grid[0][0] = 1 sets grid[1][0] too. Build it with a comprehension instead " +
            "— [[0] * 3 for _ in range(2)] — which evaluates the inner expression once per row.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§4.6 Sequence Types — list, tuple, range" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
