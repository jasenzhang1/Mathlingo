import type { WikiArticle } from "../types";

export const pythonIndexingWiki: WikiArticle = {
  conceptId: "python-indexing",
  summary:
    "Indexing reaches into a sequence and pulls out one item by its position. Python counts positions " +
    "from 0, and also lets you count backward from the end with negative numbers — so a[-1] is always " +
    "the last item, with no need to know the sequence's length first.",

  sections: [
    {
      heading: "Zero-based, and counting from both ends",
      blocks: [
        {
          kind: "table",
          headers: ["Expression", "On a = [10, 20, 30, 40, 50]", "Note"],
          rows: [
            ["a[0]", "10", "First element — indexing starts at 0, not 1"],
            ["a[2]", "30", "Third element"],
            ["a[-1]", "50", "Last element, no len(a) needed"],
            ["a[-2]", "40", "Second-to-last"],
          ],
        },
        {
          kind: "prose",
          text:
            "For a list of length n, positive indices run 0 through n-1 and negative indices run -1 " +
            "through -n — the same n positions, described from opposite ends. Index -k is always " +
            "equivalent to positive index n - k.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Indexing is strict",
          text:
            "a[10] on a five-element list raises IndexError immediately — there is no wraparound and no " +
            "silent fallback. This is different from slicing, which clamps out-of-range bounds instead " +
            "of raising (covered next).",
        },
      ],
    },
    {
      heading: "The same rules apply to strings",
      blocks: [
        {
          kind: "code",
          source: "word = \"python\"\nprint(word[0])    # 'p'\nprint(word[-1])   # 'n'",
        },
        {
          kind: "prose",
          text:
            "A string is a sequence of characters, so everything about indexing — zero-based counting, " +
            "negative indices, the strict out-of-range behavior — carries over unchanged. This is the " +
            "same reason string slicing (in the next lesson) works identically to list slicing too.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Language Reference", locator: "§6.3 Primaries — subscriptions" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
