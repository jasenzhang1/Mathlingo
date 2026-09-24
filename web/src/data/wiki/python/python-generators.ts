import type { WikiArticle } from "../types";

export const pythonGeneratorsWiki: WikiArticle = {
  conceptId: "python-generators",
  summary: "A generator function contains yield instead of return. Calling it runs none of the body — it hands back a generator object. Each next() runs the body until the next yield, produces that value, and freezes the function exactly where it stood, locals intact. That is what lets a generator describe a sequence larger than memory, or one with no end at all.",

  sections: [
    {
      heading: "yield pauses; it does not exit",
      blocks: [
        {
          kind: "code",
          source: "def countdown(n):\n    while n > 0:\n        yield n          # hand back n, then freeze here\n        n -= 1           # resumes here on the next next()\n\ng = countdown(3)         # nothing has run yet\nnext(g)                  # 3\nnext(g)                  # 2\nlist(g)                  # [1] — only what is left",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Calling it runs nothing",
          text: "countdown(3) does not execute the loop; it builds a generator object. This is why a bad argument to a generator function raises when you first iterate rather than when you call it — the validation you wrote at the top of the body has not run yet. Wrapping the body in an ordinary function that validates and then returns the generator is the usual fix.",
        },
      ],
    },
    {
      heading: "Generator expressions, and when to use which",
      blocks: [
        {
          kind: "code",
          source: "squares = [n * n for n in range(1_000_000)]   # builds the whole list\nsquares = (n * n for n in range(1_000_000))   # builds nothing yet\n\nsum(n * n for n in range(1_000_000))          # parentheses optional as a sole argument\n\ndef read_records(path):\n    with open(path) as f:\n        for line in f:\n            yield parse(line)                 # one record in memory at a time",
        },
        {
          kind: "table",
          headers: ["", "List comprehension", "Generator"],
          rows: [
            ["Memory", "holds every element", "one at a time"],
            ["Reusable", "yes", "no — consumed once"],
            ["len()", "yes", "no"],
            ["Indexable", "yes", "no"],
            ["Can be infinite", "no", "yes"],
            ["Best when", "you need the whole thing, more than once", "you stream it, or it is huge"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "return inside a generator does not return a value",
          text: "A return in a generator body ends the iteration — it raises StopIteration rather than handing a value to the caller. The value is tucked into the exception and is only visible via yield from, which is not what most people writing it intended.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§9.9 Generators" },
    { source: "PEP 255", locator: "Simple Generators" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
