import type { WikiArticle } from "../types";

export const pythonSetsWiki: WikiArticle = {
  conceptId: "python-sets",
  summary:
    "A set is a dict with the values thrown away: the same hash-based O(1) membership check, but holding " +
    "only unique keys with no associated value and no guaranteed order. That makes a set the tool for " +
    "'which unique things are present' and for turning an O(n) list scan into an O(1) lookup — at the " +
    "cost of the same hashability constraint a dict's keys carry.",

  sections: [
    {
      heading: "Uniqueness and O(1) membership",
      blocks: [
        {
          kind: "code",
          source: "nums = set([1, 2, 2, 3, 3, 3])\nprint(nums)          # {1, 2, 3}\nprint(3 in nums)     # O(1) average, not a scan",
        },
        {
          kind: "prose",
          text:
            "Checking x in some_list scans every element: O(n). Checking x in some_set hashes x and looks " +
            "in one bucket: O(1) on average. Do that check inside a loop over m items and the difference " +
            "is O(nm) against O(m) — one of the most common asymptotic wins available in everyday Python, " +
            "and it costs one call to set().",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "{} is an empty dict, not an empty set",
          text:
            "Curly braces alone are reserved for dict syntax. An empty set must be written set() " +
            "explicitly; {1, 2, 3} (with commas but no colons) is the set literal form once it's non-empty.",
        },
      ],
    },
    {
      heading: "Set algebra",
      blocks: [
        {
          kind: "table",
          headers: ["Expression", "On a = {1,2,3}, b = {2,3,4}", "Meaning"],
          rows: [
            ["a | b", "{1, 2, 3, 4}", "Union — everything in either set"],
            ["a & b", "{2, 3}", "Intersection — in both"],
            ["a - b", "{1}", "Difference — in a but not b"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Sets carry no ordering guarantee",
          text:
            "Unlike a dict (insertion-ordered since Python 3.7), a set makes no promise about iteration " +
            "order at all. list(set(my_list)) can come back in a different order than my_list — if order " +
            "matters, sort explicitly rather than relying on what a set happens to do today.",
        },
      ],
    },
    {
      heading: "Why keys and set members must be hashable",
      blocks: [
        {
          kind: "prose",
          text:
            "A hash table finds an entry by computing hash(key) and going straight to that bucket. If the " +
            "key could change after insertion, its hash would change with it and the entry would become " +
            "unreachable — so Python only permits hashable values as dict keys or set members, which in " +
            "practice means immutable ones.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Hashable", description: "Has a hash() that never changes, and an == consistent with it. All immutable built-ins qualify." },
            { term: "Usable as a key or set member", description: "str, int, float, bool, tuple (of hashables), frozenset, None." },
            { term: "Not usable", description: "list, dict, set — mutable, so TypeError: unhashable type." },
            { term: "The fix", description: "tuple(my_list) for a sequence, frozenset(my_set) for an unordered one." },
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§4.8 Set Types — set, frozenset" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
