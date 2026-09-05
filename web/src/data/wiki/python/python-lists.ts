import type { WikiArticle } from "../types";

export const pythonListsWiki: WikiArticle = {
  conceptId: "python-lists",
  summary:
    "A list is an ordered, mutable sequence, and almost every bug people hit with one traces back " +
    "to those two words. Ordered means position is meaningful and slicing is the vocabulary for " +
    "talking about ranges of positions. Mutable means a list can be changed after it is made — " +
    "which is what makes it useful, and also why a list handed to a function can come back different, " +
    "and why a slice and an assignment behave differently even when they look alike.",

  sections: [
    {
      heading: "Indexing, and the half-open convention",
      blocks: [
        {
          kind: "prose",
          text:
            "Indices count from 0, and negative indices count back from the end, so a[-1] is the " +
            "last element without needing len(a). A slice a[i:j] takes everything from i up to but " +
            "not including j. That exclusive right endpoint looks arbitrary until you notice what it " +
            "buys: the length of a[i:j] is exactly j - i, and a[:k] + a[k:] reconstructs the original " +
            "list for every k. Adjacent slices tile the list with no overlap and no gap.",
        },
        {
          kind: "code",
          source: "a[:k] + a[k:] == a        len(a[i:j]) == j - i",
          caption: "The two identities the half-open convention exists to make true.",
        },
        {
          kind: "table",
          headers: ["Expression", "On a = [10, 20, 30, 40, 50]", "Note"],
          rows: [
            ["a[0]", "10", "First element"],
            ["a[-1]", "50", "Last element, no len() needed"],
            ["a[1:4]", "[20, 30, 40]", "Stops before index 4"],
            ["a[:3]", "[10, 20, 30]", "Omitted start means 0"],
            ["a[3:]", "[40, 50]", "Omitted stop means len(a)"],
            ["a[::2]", "[10, 30, 50]", "Step of 2"],
            ["a[::-1]", "[50, 40, 30, 20, 10]", "Reversed copy"],
            ["a[10:20]", "[]", "Out-of-range slice is empty, not an error"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A slice forgives what an index will not",
          text:
            "a[10] on a five-element list raises IndexError. a[10:20] returns []. Slicing clamps to " +
            "the ends silently, which is convenient in a pipeline and lethal in a loop — an empty " +
            "result can mean “nothing matched” or “your bounds were nonsense”, and the slice will " +
            "not tell you which.",
        },
      ],
    },

    {
      heading: "Mutability, and the aliasing it creates",
      blocks: [
        {
          kind: "prose",
          text:
            "b = a does not copy anything. It binds a second name to the same list object, so " +
            "b.append(1) changes what a sees. A slice, by contrast, builds a new list: b = a[:] " +
            "gives you an independent copy of the top level. The distinction is invisible until " +
            "something mutates, at which point it is the whole story.",
        },
        {
          kind: "example",
          title: "The same list under two names",
          problem:
            "a = [1, 2, 3]; b = a; c = a[:]; b.append(4); c.append(5). What are a, b and c?",
          steps: [
            "b = a binds b to the same object as a — one list, two names.",
            "c = a[:] slices, which constructs a new list holding the same elements.",
            "b.append(4) mutates the shared object, so a sees it too.",
            "c.append(5) mutates only c's own object.",
          ],
          answer: "a == [1, 2, 3, 4], b == [1, 2, 3, 4] (the same object), c == [1, 2, 3, 5].",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "[[0] * 3] * 2 is not a 2x3 grid",
          text:
            "Multiplying a list repeats references, not values. grid = [[0] * 3] * 2 gives two names " +
            "for one inner list, so grid[0][0] = 1 sets grid[1][0] too. Build it with a comprehension " +
            "— [[0] * 3 for _ in range(2)] — which evaluates the inner expression once per row.",
        },
      ],
    },

    {
      heading: "The operations worth knowing cold",
      blocks: [
        {
          kind: "table",
          headers: ["Operation", "Cost", "Mutates?", "Returns"],
          rows: [
            ["a[i]", "O(1)", "no", "the element"],
            ["a.append(x)", "O(1) amortised", "yes", "None"],
            ["a.pop()", "O(1)", "yes", "the removed element"],
            ["a.pop(0)", "O(n)", "yes", "the removed element"],
            ["x in a", "O(n)", "no", "bool — use a set if this is hot"],
            ["a.sort()", "O(n log n)", "yes", "None"],
            ["sorted(a)", "O(n log n)", "no", "a new sorted list"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The methods that return None are the mutating ones",
          text:
            "a.sort() sorts in place and returns None; sorted(a) leaves a alone and returns the new " +
            "list. The same split runs through the language — reverse() vs reversed(), a.append(x) " +
            "vs a + [x]. Writing a = a.sort() is the single most common way to lose a list, and it " +
            "fails silently: you get None, not an error.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Never mutate the list you are iterating",
          text:
            "Removing items inside a for loop makes the iterator skip elements, because the indices " +
            "shift underneath it. Build a new list — with a comprehension or a filter — and rebind " +
            "the name.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Language Reference", locator: "§6.3 Primaries — subscriptions and slicings" },
    { source: "Python Standard Library", locator: "§4.6 Sequence Types — list, tuple, range" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
