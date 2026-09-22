import type { WikiArticle } from "../types";

export const pythonHigherOrderWiki: WikiArticle = {
  conceptId: "python-higher-order",
  summary: "Functions in Python are ordinary values: they can be assigned, stored in a list, passed as arguments and returned. A function that takes or returns a function is called higher-order, and map and filter are the two best-known examples. Both are lazy in Python 3 — they return iterators, so nothing is computed until you consume them.",

  sections: [
    {
      heading: "A function is a value",
      blocks: [
        {
          kind: "code",
          source: "def shout(text):\n    return text.upper()\n\nf = shout            # no parentheses: the function itself\nf(\"hi\")              # 'HI'\n\nhandlers = {\"loud\": shout, \"quiet\": str.lower}\nhandlers[\"loud\"](\"hi\")",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "shout and shout() are different things",
          text: "shout is the function object; shout() calls it and evaluates to its result. Passing sorted(words, key=len()) instead of key=len is the same slip — it calls len with no arguments and passes the error, rather than passing the function for sorted to call.",
        },
      ],
    },
    {
      heading: "map and filter",
      blocks: [
        {
          kind: "code",
          source: "nums = [1, 2, 3, 4]\n\nlist(map(lambda n: n * 2, nums))        # [2, 4, 6, 8]\nlist(filter(lambda n: n % 2 == 0, nums))  # [2, 4]\n\n# the same two, as comprehensions\n[n * 2 for n in nums]\n[n for n in nums if n % 2 == 0]",
        },
        {
          kind: "definitions",
          items: [
            { term: "map(fn, iterable)", description: "Applies fn to each element. Returns an iterator, not a list — wrap it in list() to see the values." },
            { term: "filter(pred, iterable)", description: "Keeps the elements for which pred returns something truthy. filter(None, xs) drops every falsy element." },
            { term: "Laziness", description: "Both are consumed once. Iterating a map object a second time yields nothing, which is the usual surprise when one is stored in a variable and used twice." },
          ],
        },
        {
          kind: "prose",
          text: "Where a comprehension can express the same thing, it is generally the more readable choice, and the community leans that way. map keeps an edge when the function already exists and needs no lambda — map(str.strip, lines) is tidier than [line.strip() for line in lines] to some eyes — and when laziness over a large source genuinely matters.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§2 Built-in Functions — map, filter" },
    { source: "Python Tutorial", locator: "§5.1.3 List Comprehensions" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
