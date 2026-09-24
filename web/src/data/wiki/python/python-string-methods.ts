import type { WikiArticle } from "../types";

export const pythonStringMethodsWiki: WikiArticle = {
  conceptId: "python-string-methods",
  summary: "Four methods carry most text work: split turns a string into a list, join turns a list back into a string, strip removes surrounding whitespace, and replace substitutes. All four return a new string or list and change nothing in place. join is the one whose signature surprises people — it is a method on the separator, not on the list.",

  sections: [
    {
      heading: "The core four",
      blocks: [
        {
          kind: "code",
          source: "\"a,b,c\".split(\",\")          # ['a', 'b', 'c']\n\"a b  c\".split()            # ['a', 'b', 'c'] — any run of whitespace\n\"a,b,c\".split(\",\", 1)       # ['a', 'b,c'] — at most one split\n\n\",\".join([\"a\", \"b\"])        # 'a,b'  — the separator owns the method\n\"\".join(parts)              # concatenate with nothing between\n\n\"  hi  \".strip()            # 'hi'\n\"xxhixx\".strip(\"x\")         # 'hi' — strips any of the given characters\n\n\"a-b\".replace(\"-\", \"_\")     # 'a_b'",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "join is a method on the separator",
          text: "It reads backwards the first few times: \",\".join(items), not items.join(\",\"). The reason is that join works on any iterable of strings, so it belongs to the separator rather than to one particular container type. It also requires every element to already be a string — join over a list of ints raises TypeError, so map(str, ...) first.",
        },
        {
          kind: "table",
          headers: ["Method", "Returns", "Common slip"],
          rows: [
            ["split(sep)", "list of strings", "split() with no argument also collapses runs of whitespace; split(\" \") does not"],
            ["join(iterable)", "one string", "called on the separator, and every element must be a string"],
            ["strip()", "new string", "strips from both ends only, never from the middle"],
            ["replace(a, b)", "new string", "replaces every occurrence unless a count is given"],
            ["startswith / endswith", "bool", "accepts a tuple to test several prefixes at once"],
          ],
        },
      ],
    },
    {
      heading: "Case, search, and testing",
      blocks: [
        {
          kind: "code",
          source: "\"Hi\".lower()             # 'hi'\n\"hi\".capitalize()        # 'Hi'\n\n\"hello\".find(\"l\")        # 2, or -1 if absent\n\"hello\".index(\"l\")       # 2, or raises ValueError if absent\n\"hello\".count(\"l\")       # 2\n\n\"42\".isdigit()           # True\n\"abc\".isalpha()          # True",
        },
        {
          kind: "prose",
          text: "find and index differ only in how they fail: find returns -1, index raises. Prefer index when absence is a genuine error and you want it to stop the program, and find when absence is expected — but remember that -1 is a valid index, so `if s.find(x):` is wrong for a match at position 0. Compare against -1 explicitly, or just use `in`.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§4.7.1 String Methods" },
    { source: "Python Tutorial", locator: "§7.1 Fancier Output Formatting" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
