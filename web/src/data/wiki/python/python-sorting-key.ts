import type { WikiArticle } from "../types";

export const pythonSortingKeyWiki: WikiArticle = {
  conceptId: "python-sorting-key",
  summary: "sorted(xs) returns a new sorted list; xs.sort() sorts in place and returns None. Both take a key function that maps each element to the value to compare, and reverse=True to invert the order. Python's sort is stable, which is what makes sorting by two criteria possible in two passes — or in one, by returning a tuple from key.",

  sections: [
    {
      heading: "sorted versus .sort",
      blocks: [
        {
          kind: "code",
          source: "xs = [3, 1, 2]\n\nys = sorted(xs)      # ys == [1, 2, 3], xs unchanged\nxs.sort()            # xs == [1, 2, 3], returns None\n\nordered = xs.sort()  # ordered is None — the classic slip",
        },
        {
          kind: "callout",
          tone: "warning",
          title: ".sort() returns None",
          text: "Every in-place list method returns None — sort, reverse, append, extend. Assigning the result silently gives you None rather than the list. sorted() is the one that hands back a new list, and it works on any iterable, not just lists.",
        },
      ],
    },
    {
      heading: "key decides what 'in order' means",
      blocks: [
        {
          kind: "code",
          source: "words = [\"pear\", \"fig\", \"apple\"]\n\nsorted(words)                        # ['apple', 'fig', 'pear'] — alphabetical\nsorted(words, key=len)               # ['fig', 'pear', 'apple'] — by length\nsorted(words, key=str.lower)         # case-insensitive\nsorted(words, key=len, reverse=True) # longest first\n\npeople = [(\"Ada\", 36), (\"Bo\", 36), (\"Cy\", 24)]\nsorted(people, key=lambda p: (-p[1], p[0]))   # age desc, then name asc",
        },
        {
          kind: "prose",
          text: "key is called once per element and the results are compared — so an expensive key is computed n times, not n log n times. Returning a tuple sorts by the first component, then the second as a tiebreak, and so on. Negating a number flips just that component, which is how a mixed ascending/descending sort is done in one pass.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Stability is a feature you can build on",
          text: "A stable sort leaves elements that compare equal in their original relative order. So sorting by name and then by age gives you age-major, name-minor order — the second sort preserves the first's arrangement within each age. Sort by the least significant criterion first.",
        },
      ],
    },
  ],

  references: [
    { source: "Python HOWTO", locator: "Sorting Techniques" },
    { source: "Python Standard Library", locator: "§4.6.4 list.sort and sorted" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
