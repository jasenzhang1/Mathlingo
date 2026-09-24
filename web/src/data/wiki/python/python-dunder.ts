import type { WikiArticle } from "../types";

export const pythonDunderWiki: WikiArticle = {
  conceptId: "python-dunder",
  summary: "Dunder methods are how an object plugs into Python's own syntax. Define __len__ and len() works; define __eq__ and == works; define __iter__ and a for loop works. The two most valuable in practice are __repr__, which decides what you see in a traceback or debugger, and __eq__, which decides what equality means — and which drags __hash__ along with it.",

  sections: [
    {
      heading: "The ones worth defining first",
      blocks: [
        {
          kind: "code",
          source: "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\n    def __repr__(self):\n        return f\"Point({self.x}, {self.y})\"      # unambiguous, for developers\n\n    def __eq__(self, other):\n        if not isinstance(other, Point):\n            return NotImplemented\n        return (self.x, self.y) == (other.x, other.y)\n\n    def __hash__(self):\n        return hash((self.x, self.y))            # required if __eq__ is defined",
        },
        {
          kind: "definitions",
          items: [
            { term: "__repr__", description: "What the debugger, the REPL and a list of your objects show. Aim for something that could be pasted back as code." },
            { term: "__str__", description: "The human-facing rendering used by print and str(). Falls back to __repr__ if absent, which is why __repr__ is the one to write first." },
            { term: "__eq__", description: "Defines ==. Return NotImplemented for unrelated types so Python can try the other operand's version." },
            { term: "__len__", description: "Makes len() work — and makes the object falsy when empty, since truthiness falls back to __len__." },
          ],
        },
      ],
    },
    {
      heading: "__eq__ and __hash__ travel together",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Defining __eq__ makes your class unhashable",
          text: "Python sets __hash__ to None when you define __eq__ without it, so instances can no longer go in a set or be dict keys. This is deliberate: two objects that compare equal must hash equal, and the default identity hash would break that. Define __hash__ over the same fields, or accept that the type is unhashable.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "dataclasses write most of this for you",
          text: "@dataclass generates __init__, __repr__ and __eq__ from the annotated fields, and @dataclass(frozen=True) adds __hash__ and makes instances immutable. For a class that is mostly fields, this is the right default — hand-writing the same four methods is churn.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Reference", locator: "§3.3 Special method names" },
    { source: "Python Standard Library", locator: "§30.6 dataclasses" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
