import type { WikiArticle } from "../types";

export const pythonDictionariesWiki: WikiArticle = {
  conceptId: "python-dictionaries",
  summary:
    "A dict maps keys to values with O(1) average lookup — checking or retrieving by key doesn't scan " +
    "the whole collection the way a list does. That single property is what turns counting, grouping, " +
    "and joining from quadratic loops into linear ones, and it costs one constraint: keys must be " +
    "hashable, which in practice means immutable.",

  sections: [
    {
      heading: "Lookup by key, not by position",
      blocks: [
        {
          kind: "code",
          source: "person = {\"name\": \"Ada\", \"age\": 36}\nprint(person[\"name\"])   # Ada\nperson[\"age\"] = 37       # update\nperson[\"job\"] = \"Engineer\"   # add a new key",
        },
        {
          kind: "table",
          headers: ["Task", "With a list", "With a dict"],
          rows: [
            ["Look up by name", "Scan for a match — O(n)", "person[\"age\"] — O(1) average"],
            ["Count occurrences", "O(n²) with .count() in a loop", "counts[k] = counts.get(k, 0) + 1 — O(n) one pass"],
            ["Join two tables on a key", "O(nm) nested loop", "O(n + m) via a lookup dict"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "d[k] raises, d.get(k) does not",
          text:
            "d[k] on a missing key raises KeyError; d.get(k) returns None, and d.get(k, default) returns " +
            "your default. Reach for .get() when absence is expected and has a sensible fallback, and " +
            "for d[k] when a missing key is a bug you want to hear about immediately.",
        },
      ],
    },
    {
      heading: "Count, group, and invert — the three patterns worth memorising",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Count: counts[k] = counts.get(k, 0) + 1, or collections.Counter(items).",
            "Group: groups.setdefault(k, []).append(v), or collections.defaultdict(list).",
            "Invert: {v: k for k, v in d.items()} — safe only if the values are unique.",
          ],
        },
        {
          kind: "example",
          title: "Grouping words by their first letter",
          problem:
            "Given words = ['apple', 'avocado', 'beet', 'cherry'], build " +
            "{'a': ['apple', 'avocado'], 'b': ['beet'], 'c': ['cherry']} in one pass.",
          steps: [
            "Iterate the words once; the key is w[0].",
            "groups.setdefault(w[0], []) returns the existing list, or inserts [] and returns that.",
            "Append w to whichever list came back.",
          ],
          answer:
            "groups = {}; for w in words: groups.setdefault(w[0], []).append(w) — one pass, O(n).",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Iteration order is insertion order, and that's a promise",
          text:
            "Since Python 3.7, iterating a dict yields keys in the order they were first inserted — a " +
            "language guarantee, not an implementation accident. (Sets carry no such promise — see the " +
            "next lesson.)",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§4.10 Mapping Types — dict" },
    { source: "Python Standard Library", locator: "collections — Counter, defaultdict" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
