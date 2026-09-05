import type { WikiArticle } from "../types";

export const pythonDictsWiki: WikiArticle = {
  conceptId: "python-dicts",
  summary:
    "A dict maps keys to values with O(1) average lookup, and a set is the same machinery with the " +
    "values thrown away. That single property — constant-time membership and retrieval — is what " +
    "turns quadratic loops into linear ones, and it is the reason counting, grouping, deduplicating " +
    "and joining are all one-pass problems in Python. The cost is a constraint: keys must be " +
    "hashable, which in practice means immutable.",

  sections: [
    {
      heading: "Lookup is the whole point",
      blocks: [
        {
          kind: "prose",
          text:
            "Checking x in some_list scans every element: O(n). Checking x in some_set hashes x and " +
            "looks in one bucket: O(1) on average. Do that check inside a loop over m items and the " +
            "difference is O(nm) against O(m). This is the most common asymptotic win available in " +
            "everyday Python, and it costs one call to set().",
        },
        {
          kind: "table",
          headers: ["Task", "With a list", "With a dict or set"],
          rows: [
            ["Membership test", "O(n) scan", "O(1) average"],
            ["Deduplicate n items", "O(n²)", "O(n) — set(items)"],
            ["Count occurrences", "O(n²) with .count()", "O(n) one pass"],
            ["Join two tables on a key", "O(nm) nested loop", "O(n + m) via a lookup dict"],
          ],
        },
      ],
    },

    {
      heading: "The four patterns",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Count: counts[k] = counts.get(k, 0) + 1, or collections.Counter(items).",
            "Group: groups.setdefault(k, []).append(v), or collections.defaultdict(list).",
            "Invert: {v: k for k, v in d.items()} — safe only if the values are unique.",
            "Index for joining: by_id = {row['id']: row for row in rows}, then look up in O(1).",
          ],
        },
        {
          kind: "example",
          title: "Grouping words by their first letter",
          problem:
            "Given words = ['apple', 'avocado', 'beet', 'cherry'], build {'a': ['apple', 'avocado'], " +
            "'b': ['beet'], 'c': ['cherry']} in one pass.",
          steps: [
            "Iterate the words once; the key is w[0].",
            "groups.setdefault(w[0], []) returns the existing list, or inserts [] and returns that.",
            "Append w to whichever list came back.",
            "defaultdict(list) does the same thing without the setdefault call, at the cost of a dict that grows on any read.",
          ],
          answer:
            "groups = {}; for w in words: groups.setdefault(w[0], []).append(w) — one pass, O(n).",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "d[k] raises, d.get(k) does not",
          text:
            "d[k] on a missing key raises KeyError; d.get(k) returns None and d.get(k, default) " +
            "returns your default. Neither is right in general — reach for .get() when absence is " +
            "expected and has a sensible fallback, and for d[k] when a missing key is a bug you want " +
            "to hear about immediately.",
        },
      ],
    },

    {
      heading: "Keys must be hashable",
      blocks: [
        {
          kind: "prose",
          text:
            "A hash table finds a key by computing hash(key) and going straight to that bucket. If " +
            "the key could change after insertion, its hash would change with it and the entry would " +
            "become unreachable — so Python only permits keys whose value cannot change. Strings, " +
            "numbers, and tuples of hashable things qualify. Lists, dicts, and sets do not.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Hashable", description: "Has a hash() that never changes, and an == consistent with it. All immutable built-ins qualify." },
            { term: "Usable as a key", description: "str, int, float, bool, tuple (of hashables), frozenset, None." },
            { term: "Not usable as a key", description: "list, dict, set — mutable, so TypeError: unhashable type." },
            { term: "The fix", description: "tuple(my_list) for a sequence key, frozenset(my_set) for an unordered one." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Iteration order is insertion order, and that is a promise",
          text:
            "Since Python 3.7, iterating a dict yields keys in the order they were first inserted — " +
            "a guarantee, not an implementation accident. Sets carry no such promise: their iteration " +
            "order is unspecified and can differ between runs. If output order matters, sort " +
            "explicitly rather than relying on what a set happens to do today.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§4.10 Mapping Types — dict; §4.8 Set Types" },
    { source: "Python Standard Library", locator: "collections — Counter, defaultdict" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
