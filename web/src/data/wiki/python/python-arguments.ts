import type { WikiArticle } from "../types";

export const pythonArgumentsWiki: WikiArticle = {
  conceptId: "python-arguments",
  summary: "Arguments can be passed by position or by name, and parameters can carry defaults that make them optional. The rules are mechanical — positional arguments fill parameters left to right, keyword arguments fill them by name, and no parameter may be filled twice. The one genuine trap is the mutable default: the default object is created once when the function is defined, not once per call, so a default of [] is shared by every call that uses it.",

  sections: [
    {
      heading: "Four ways to make the same call",
      blocks: [
        {
          kind: "code",
          source: "def report(name, count, unit=\"rows\"):\n    return f\"{name}: {count} {unit}\"\n\nreport(\"input\", 3)                       # positional, unit defaulted\nreport(\"input\", 3, \"cols\")               # all positional\nreport(\"input\", count=3, unit=\"cols\")    # keyword\nreport(count=3, name=\"input\")            # keyword, any order",
        },
        {
          kind: "prose",
          text: "Keyword arguments may be given in any order, but every positional argument must come before the first keyword argument in a call — report(name=\"input\", 3) is a SyntaxError. A parameter with a default may be omitted; one without a default must be supplied somehow.",
        },
        {
          kind: "table",
          headers: ["Call", "Result", "Why"],
          rows: [
            ["report(\"a\", 1)", "\"a: 1 rows\"", "unit falls back to its default"],
            ["report(\"a\", 1, \"cols\")", "\"a: 1 cols\"", "third positional fills unit"],
            ["report(\"a\", count=1)", "\"a: 1 rows\"", "mixing is fine, positional first"],
            ["report(count=1, name=\"a\")", "\"a: 1 rows\"", "keywords are order-free"],
            ["report(\"a\", 1, name=\"b\")", "TypeError", "name filled twice"],
          ],
        },
      ],
    },
    {
      heading: "The mutable default argument",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "def f(items=[]) is almost always a bug",
          text: "The default value is evaluated once, when the def statement runs — not on each call. So every call that relies on the default shares one list, and appends accumulate across calls. The fix is the None sentinel: default to None and build a fresh list inside the body.",
        },
        {
          kind: "code",
          source: "def bad(item, bucket=[]):\n    bucket.append(item)\n    return bucket\n\nbad(1)   # [1]\nbad(2)   # [1, 2]  <- the same list, still there\n\ndef good(item, bucket=None):\n    if bucket is None:\n        bucket = []\n    bucket.append(item)\n    return bucket",
        },
        {
          kind: "prose",
          text: "An immutable default — 0, None, \"\", a tuple — is safe for the same reason: sharing one object between calls cannot matter if nothing can change it. The rule of thumb is that a default should be immutable, and None stands in whenever you actually want a fresh container.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§4.8 More on Defining Functions" },
    { source: "Python FAQ", locator: "Why are default values shared between objects?" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
