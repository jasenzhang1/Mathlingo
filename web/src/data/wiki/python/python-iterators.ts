import type { WikiArticle } from "../types";

export const pythonIteratorsWiki: WikiArticle = {
  conceptId: "python-iterators",
  summary: "A for loop is sugar. Underneath, Python calls iter() on the thing being looped over to get an iterator, then calls next() on that repeatedly until it raises StopIteration. Understanding this explains the behaviour that otherwise looks arbitrary: why a list can be looped twice but a generator or a zip cannot, and why a file object yields nothing the second time round.",

  sections: [
    {
      heading: "What a for loop expands to",
      blocks: [
        {
          kind: "code",
          source: "for x in items:\n    use(x)\n\n# is, near enough:\nit = iter(items)\nwhile True:\n    try:\n        x = next(it)\n    except StopIteration:\n        break\n    use(x)",
        },
        {
          kind: "definitions",
          items: [
            { term: "Iterable", description: "Anything you can call iter() on: a list, a string, a dict, a file. It can produce a fresh iterator on demand, so it can be looped many times." },
            { term: "Iterator", description: "Has __next__ and returns itself from __iter__. It holds the position, so it is consumed as you go and is spent once exhausted." },
            { term: "StopIteration", description: "The signal that there is nothing left. The for loop catches it; calling next() by hand does not, which is why next(it, default) exists." },
          ],
        },
      ],
    },
    {
      heading: "Consumed once",
      blocks: [
        {
          kind: "code",
          source: "nums = [1, 2, 3]\nlist(nums), list(nums)      # ([1,2,3], [1,2,3]) — a list is an iterable\n\nz = zip([1, 2], [3, 4])\nlist(z), list(z)            # ([(1,3),(2,4)], []) — a zip is an iterator",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "An empty second pass is the symptom",
          text: "map, filter, zip, enumerate, reversed and generators all return iterators. Storing one and iterating twice gives you the values and then nothing, with no error. If you need two passes, materialise it with list() first — and accept the memory that costs.",
        },
        {
          kind: "example",
          title: "Why the sum is zero",
          problem: "rows = filter(is_valid, data); total = sum(r.amount for r in rows); count = len(list(rows)) — count is 0.",
          steps: [
            "filter returns an iterator, not a list.",
            "The sum consumed it completely.",
            "By the time list(rows) runs there is nothing left, so count is 0 rather than the number of rows.",
          ],
          answer: "Bind rows = list(filter(...)) if it must be used more than once.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§9.8 Iterators" },
    { source: "Python Reference", locator: "§3.3.5 Emulating container types" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
