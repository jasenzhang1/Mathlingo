import type { WikiArticle } from "../types";

export const pythonRegexWiki: WikiArticle = {
  conceptId: "python-regex",
  summary: "A regular expression describes a pattern of text. The re module compiles one and applies it: search finds it anywhere, match only at the start, findall returns every occurrence, and sub replaces. The power is real and so is the cost — a regex is write-once, read-never unless you keep it small, and for fixed text a plain string method is faster and clearer.",

  sections: [
    {
      heading: "The functions that matter",
      blocks: [
        {
          kind: "code",
          source: "import re\n\nre.search(r\"\\d+\", \"abc 42\")      # a match object, or None\nre.match(r\"\\d+\", \"abc 42\")       # None — match anchors at the start\nre.findall(r\"\\d+\", \"1 and 22\")   # ['1', '22']\nre.sub(r\"\\s+\", \" \", messy)       # collapse runs of whitespace\nre.split(r\"[,;]\", \"a,b;c\")        # ['a', 'b', 'c']\n\nm = re.search(r\"(\\w+)@(\\w+)\", text)\nif m:\n    m.group(0)   # the whole match\n    m.group(1)   # first capture group",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Always use a raw string for the pattern",
          text: "\"\\d\" is not a recognised Python escape, so it happens to survive as a backslash and a d — but \"\\b\" is a backspace character, and the regex never matches. r\"\\d\" and r\"\\b\" pass the backslash through untouched, which is what the regex engine needs to see.",
        },
      ],
    },
    {
      heading: "Greedy by default, and when not to reach for regex",
      blocks: [
        {
          kind: "code",
          source: "re.search(r\"<.*>\", \"<a><b>\").group()    # '<a><b>' — greedy\nre.search(r\"<.*?>\", \"<a><b>\").group()   # '<a>'    — lazy\n\n# a plain method is better here:\nif line.startswith(\"ERROR\"):  ...      # not re.match(r'^ERROR', line)",
        },
        {
          kind: "list",
          items: [
            "Fixed substring, prefix or suffix — use in, startswith, endswith. Faster and self-explanatory.",
            "Splitting on one separator — use split. Reach for re.split only when there are several.",
            "Nested or recursive structure — HTML, JSON, source code — use a real parser. Regex cannot express nesting.",
            "A pattern longer than a line — use re.VERBOSE and comment it, or reconsider the approach.",
          ],
        },
        {
          kind: "definitions",
          items: [
            { term: "\\d \\w \\s", description: "Digit, word character, whitespace. Capitalised negates: \\D is any non-digit." },
            { term: "+ * ?", description: "One or more, zero or more, zero or one. Append ? to any of them to make it lazy." },
            { term: "^ $", description: "Start and end of the string — or of each line, under re.MULTILINE." },
            { term: "(...)", description: "A capture group, retrievable with .group(n). (?:...) groups without capturing." },
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Python HOWTO", locator: "Regular Expression HOWTO" },
    { source: "Python Standard Library", locator: "§6.2 re — Regular expression operations" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
