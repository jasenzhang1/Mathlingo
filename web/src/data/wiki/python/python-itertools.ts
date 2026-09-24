import type { WikiArticle } from "../types";

export const pythonItertoolsWiki: WikiArticle = {
  conceptId: "python-itertools",
  summary: "itertools is a set of iterator building blocks written in C. Most of it replaces a loop you would otherwise write by hand, lazily and without intermediate lists. The four worth knowing first are chain for flattening, islice for taking a slice of any iterator, groupby for runs of equal elements, and the combinatorics family for enumerating pairs and orderings.",

  sections: [
    {
      heading: "The everyday ones",
      blocks: [
        {
          kind: "code",
          source: "from itertools import chain, islice, groupby, count, cycle\n\nlist(chain([1, 2], [3]))            # [1, 2, 3]\nlist(chain.from_iterable(lists))     # flatten one level\n\nlist(islice(some_iterator, 5))       # first 5 — a slice for things you cannot subscript\nlist(islice(count(), 3))             # [0, 1, 2] from an infinite counter\n\nfor key, group in groupby(sorted(rows, key=f), key=f):\n    ...                              # runs of equal key",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "groupby only groups adjacent equal keys",
          text: "Unlike SQL's GROUP BY or pandas' groupby, itertools.groupby starts a new group every time the key changes as it walks along. Unsorted input therefore produces the same key several times. Sort by the same key first, or you get silently fragmented groups. The group is also an iterator that is invalidated once you advance to the next one.",
        },
      ],
    },
    {
      heading: "Combinatorics",
      blocks: [
        {
          kind: "code",
          source: "from itertools import combinations, permutations, product\n\nlist(combinations(\"abc\", 2))    # [('a','b'), ('a','c'), ('b','c')] — order irrelevant\nlist(permutations(\"abc\", 2))    # 6 pairs — order matters\nlist(product([1, 2], \"ab\"))     # the 4 pairs — a nested loop, flattened\nlist(product([0, 1], repeat=3)) # every 3-bit pattern",
        },
        {
          kind: "definitions",
          items: [
            { term: "product", description: "The nested for loop written as one call. repeat=n is the same iterable crossed with itself n times." },
            { term: "combinations", description: "Subsets of a given size, in input order, no repeats. n choose k of them." },
            { term: "permutations", description: "Orderings of a given size. Grows factorially — a list() over one is a common way to exhaust memory by accident." },
            { term: "accumulate", description: "Running totals, or any running fold, without a manual loop variable." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Lazy means you can bound the cost",
          text: "permutations of twelve items is nearly half a billion tuples, so list() over it will not finish. Because it is lazy you can wrap it in islice, or break out of the loop when you find what you need, and never pay for the rest.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§10.1 itertools" },
    { source: "Python Standard Library", locator: "itertools Recipes" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
