import type { WikiArticle } from "../types";

export const pythonMethodsWiki: WikiArticle = {
  conceptId: "python-methods",
  summary: "An attribute assigned inside __init__ with self.x belongs to that instance. An attribute assigned in the class body belongs to the class and is shared by every instance. Reading falls back from instance to class, so a shared default looks like an instance attribute until someone mutates it — at which point every instance sees the change.",

  sections: [
    {
      heading: "Instance state versus class state",
      blocks: [
        {
          kind: "code",
          source: "class Dog:\n    species = \"canis\"        # class attribute — one, shared\n    tricks = []              # shared and mutable: a bug waiting\n\n    def __init__(self, name):\n        self.name = name     # instance attribute — one per dog\n\na, b = Dog(\"Rex\"), Dog(\"Fido\")\na.tricks.append(\"sit\")\nb.tricks                     # ['sit'] — the same list",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The mutable class attribute",
          text: "It is the same trap as the mutable default argument, in another costume: one object, created once, shared by everyone. Mutating it through any instance changes it for all of them. The fix is identical — create the list inside __init__, so each instance gets its own.",
        },
        {
          kind: "prose",
          text: "Assignment behaves differently from mutation. a.tricks.append(...) mutates the shared list, but a.tricks = [] creates a new instance attribute that shadows the class one for a alone. That asymmetry is why the bug is confusing: some operations look like they isolate an instance and others do not.",
        },
      ],
    },
    {
      heading: "The three kinds of method",
      blocks: [
        {
          kind: "code",
          source: "class Temperature:\n    def celsius(self):                     # instance method\n        return self.value\n\n    @classmethod\n    def from_fahrenheit(cls, f):           # gets the class, not an instance\n        return cls((f - 32) / 1.8)\n\n    @staticmethod\n    def is_valid(v):                       # gets neither; just namespaced\n        return v > -273.15",
        },
        {
          kind: "table",
          headers: ["Kind", "First argument", "Typical use"],
          rows: [
            ["instance method", "self", "anything that reads or changes this instance"],
            ["classmethod", "cls", "an alternative constructor — returns cls(...) so subclasses work"],
            ["staticmethod", "none", "a helper that belongs here conceptually but touches no state"],
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§9.3.5 Class and Instance Variables" },
    { source: "Python Standard Library", locator: "§2 Built-in Functions — classmethod, staticmethod" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
