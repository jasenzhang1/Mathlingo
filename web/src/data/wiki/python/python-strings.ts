import type { WikiArticle } from "../types";

export const pythonStringsWiki: WikiArticle = {
  conceptId: "python-strings",
  summary: "A string is an immutable sequence of characters. Everything you know about indexing and slicing a list applies unchanged; what does not apply is mutation. s[0] = \"X\" raises, and every method that appears to modify a string in fact returns a new one. That single fact explains most string bugs: the return value was discarded.",

  sections: [
    {
      heading: "A sequence, with the usual vocabulary",
      blocks: [
        {
          kind: "code",
          source: "s = \"python\"\n\ns[0]         # 'p'\ns[-1]        # 'n'\ns[0:3]       # 'pyt'\ns[::-1]      # 'nohtyp'\nlen(s)       # 6\n\"th\" in s    # True\n\nfor ch in s:\n    ...      # iterates character by character",
        },
        {
          kind: "prose",
          text: "Indexing a string gives a one-character string — Python has no separate character type, so s[0] is itself a string of length 1. Slicing follows the same rules as a list: the start is included, the stop excluded, and a negative step walks backwards.",
        },
      ],
    },
    {
      heading: "Immutability, and what follows from it",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Methods return; they do not modify",
          text: "s.upper() evaluates to a new uppercase string and leaves s untouched. Writing s.upper() as a statement on its own line does nothing observable. You have to write s = s.upper(), which is the opposite of the list convention where xs.sort() works in place and returns None.",
        },
        {
          kind: "code",
          source: "s = \"hi\"\ns.upper()          # evaluates to 'HI' — and is discarded\nprint(s)           # 'hi'\n\ns = s.upper()      # now s is 'HI'\n\ns[0] = \"X\"         # TypeError: 'str' object does not support item assignment",
        },
        {
          kind: "definitions",
          items: [
            { term: "Safe to share", description: "An immutable string handed to a function cannot be changed underneath you, so no defensive copy is needed." },
            { term: "Hashable", description: "Strings can be dict keys and set members precisely because they cannot change after hashing." },
            { term: "Concatenation costs", description: "s += x in a loop builds a new string each time, which is quadratic. Collect the pieces in a list and \"\".join them instead." },
          ],
        },
        {
          kind: "example",
          title: "Building a string in a loop",
          problem: "You need to assemble 100,000 fragments into one string.",
          steps: [
            "out = \"\"; for f in fragments: out += f  — allocates a new string per iteration.",
            "Each allocation copies everything accumulated so far, so the total work grows with the square of the count.",
            "parts = list(fragments); out = \"\".join(parts) — one allocation, one pass.",
          ],
          answer: "join is not merely tidier; it is a different complexity class.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§3.1.2 Strings" },
    { source: "Python Standard Library", locator: "§4.7 Text Sequence Type — str" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
