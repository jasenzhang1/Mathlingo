import type { WikiArticle } from "../types";

export const pythonScopeWiki: WikiArticle = {
  conceptId: "python-scope",
  summary: "A bare name is looked up in four scopes in order: Local, Enclosing, Global, Built-in — LEGB. Reading a name searches outward until it is found. Assigning a name is different: assigning anywhere in a function makes that name local for the whole function, which is why a function that reads a global and later assigns it raises UnboundLocalError on the read.",

  sections: [
    {
      heading: "The four scopes",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Local", description: "Names assigned inside the current function, including its parameters. Created on call, discarded on return." },
            { term: "Enclosing", description: "Locals of a function that lexically contains this one. This is what a closure captures." },
            { term: "Global", description: "Names at the top level of the module. Not 'global to the program' — global to the file." },
            { term: "Built-in", description: "Names Python provides everywhere: len, print, sum, range. Shadowing one with your own list = [...] is legal and occasionally the bug." },
          ],
        },
        {
          kind: "code",
          source: "rate = 0.2                 # global\n\ndef outer():\n    bonus = 5              # enclosing, from inner's point of view\n    def inner(n):\n        return n * rate + bonus   # local n, enclosing bonus, global rate\n    return inner",
        },
      ],
    },
    {
      heading: "Assignment makes a local, everywhere in the function",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "UnboundLocalError",
          text: "Python decides at compile time whether a name is local, by looking for any assignment to it anywhere in the body. A function containing count = count + 1 has a local count from its first line, so the read on the right-hand side finds an unassigned local, not the global — and raises UnboundLocalError rather than reading the outer value.",
        },
        {
          kind: "code",
          source: "count = 0\n\ndef broken():\n    count = count + 1      # UnboundLocalError\n\ndef fixed_global():\n    global count           # assignments here target the module-level name\n    count = count + 1\n\ndef counter():\n    n = 0\n    def bump():\n        nonlocal n         # target the enclosing function's n\n        n += 1\n        return n\n    return bump",
        },
        {
          kind: "prose",
          text: "global targets the module level; nonlocal targets the nearest enclosing function scope. Both are rarely the right answer — returning a value, or holding state in an object, usually reads better than reaching out to rebind a name someone else owns. Mutating a global list with .append() needs neither keyword, because that is a method call, not an assignment.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§9.2 Python Scopes and Namespaces" },
    { source: "Python Language Reference", locator: "§4.2 Naming and binding" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
