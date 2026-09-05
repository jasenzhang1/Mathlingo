import type { WikiArticle } from "../types";

export const pythonOperatorsWiki: WikiArticle = {
  conceptId: "python-operators",
  summary:
    "Arithmetic operators compute values; comparison operators compare them and always produce a bool; " +
    "and and/or/not combine booleans, short-circuiting so the right side is only evaluated when it can " +
    "still change the answer. Two arithmetic operators — // and % — and one string-building idiom, the " +
    "f-string, are worth knowing cold, because loops, conditionals, and formatted output all lean on them " +
    "constantly.",

  sections: [
    {
      heading: "Arithmetic: // and % are the ones worth memorising",
      blocks: [
        {
          kind: "table",
          headers: ["Expression", "Result", "Note"],
          rows: [
            ["7 / 2", "3.5", "True division always returns a float"],
            ["7 // 2", "3", "Floor division: divide, then round down"],
            ["7 % 2", "1", "Modulo: the remainder left over"],
            ["-7 // 2", "-4", "Floor division rounds down, not toward zero"],
            ["2 ** 3", "8", "Exponentiation"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "% is the standard evenness check",
          text:
            "n % 2 == 0 is idiomatic for 'n is even'. More generally, x % k == 0 tests divisibility by k, " +
            "and is the basis of most cyclic logic (wrapping an index, alternating rows, and so on).",
        },
      ],
    },
    {
      heading: "Comparisons, booleans, and short-circuiting",
      blocks: [
        {
          kind: "prose",
          text:
            "== compares values; = assigns one. Mixing them up is the single most common typo among " +
            "people new to the language, and Python won't catch it for you inside an expression context " +
            "where both would be syntactically odd but not always invalid. Ordering operators (<, >, <=, " +
            "  >=) work on numbers as expected and on strings alphabetically. Comparing across types, like " +
            "5 == \"5\", is legal and simply evaluates to False.",
        },
        {
          kind: "code",
          source: "age = 20\nhas_id = True\nprint(age >= 18 and has_id)   # True\nprint(0 < age < 30)           # chained comparison, True",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "and / or short-circuit — the right side may never run",
          text:
            "In `a and b`, if a is already False the result is False and b is never evaluated. In `a or " +
            "b`, if a is already True, b is never evaluated. This matters the moment b has a side effect " +
            "or is expensive: `cache.get(key) or compute_and_store(key)` relies on exactly this behaviour.",
        },
      ],
    },
    {
      heading: "f-strings: building text from values",
      blocks: [
        {
          kind: "prose",
          text:
            "Prefixing a string literal with f lets you embed {expression} directly inside the text — " +
            "Python evaluates the expression and converts it to text automatically, with no explicit " +
            "str() call needed. Anything valid in Python can go inside the braces, including arithmetic " +
            "and a format spec after a colon for controlling decimal places.",
        },
        {
          kind: "code",
          source: "price = 2\nqty = 3\nprint(f\"Total: {price * qty}\")     # Total: 6\nprint(f\"{3.14159:.2f}\")           # 3.14",
        },
      ],
    },
  ],

  references: [
    { source: "Python Language Reference", locator: "§6.7 Binary arithmetic, §6.10 Comparisons" },
    { source: "Python Standard Library", locator: "§7.1.1 Format String Syntax" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
