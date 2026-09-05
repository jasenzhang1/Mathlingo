import type { WikiArticle } from "../types";

export const pythonTypeConversionWiki: WikiArticle = {
  conceptId: "python-type-conversion",
  summary:
    "Python converts explicitly, on request, via functions named after the target type: int(), float(), " +
    "str(), bool(). Conversion can fail loudly (int(\"abc\") raises ValueError), truncate silently " +
    "(int(3.9) is 3, not 4), or follow a truthiness rule that surprises people the first time they meet " +
    "it (bool(\"0\") is True). Knowing exactly which of the three applies to a given conversion is what " +
    "separates code that fails fast from code that produces a plausible wrong answer.",

  sections: [
    {
      heading: "Converting between types",
      blocks: [
        {
          kind: "code",
          source:
            "int(\"42\")     # 42\nfloat(\"3.5\")   # 3.5\nstr(42)        # \"42\"\nint(3.9)       # 3  (truncates toward zero, does not round)",
        },
        {
          kind: "table",
          headers: ["Call", "Result", "Note"],
          rows: [
            ["int(\"42\")", "42", "Text of a valid whole number converts cleanly"],
            ["int(\"abc\")", "ValueError", "Not a valid integer literal — fails loudly"],
            ["int(3.9)", "3", "Truncates toward zero; does not round"],
            ["int(-3.9)", "-3", "Truncation moves toward zero, not down"],
            ["str(42)", "\"42\"", "Any value can be turned into its text form"],
            ["float(\"3\")", "3.0", "Whole-number text still becomes a float"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "int() on a float truncates — it is not round()",
          text:
            "int(3.9) is 3 and int(-3.9) is -3: the fractional part is simply discarded, chopping toward " +
            "zero rather than down. If you actually want nearest-integer rounding, use round(), which " +
            "follows banker's rounding on exact .5 ties rather than always rounding up.",
        },
      ],
    },
    {
      heading: "bool() and truthiness",
      blocks: [
        {
          kind: "prose",
          text:
            "bool() follows a specific rule rather than looking at what a value 'means': 0, 0.0, the " +
            "empty string \"\", the empty list [], and None all convert to False. Every other value — " +
            "including any non-empty string, even \"False\" or \"0\" — converts to True.",
        },
        {
          kind: "example",
          title: "A string that looks false is still truthy",
          problem: "What does bool(\"0\") evaluate to, and why?",
          steps: [
            "\"0\" is a string, not the number 0.",
            "Truthiness for strings only checks whether the string is empty.",
            "\"0\" has one character, so it is not empty.",
          ],
          answer: "True — any non-empty string is truthy, regardless of what text it contains.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Truthiness is what if and while actually check",
          text:
            "if some_value: implicitly calls bool(some_value). Knowing the truthiness rule (empty/zero-ish " +
            "is False, everything else is True) explains why `if my_list:` is idiomatic for 'the list has " +
            "items' instead of the more verbose `if len(my_list) > 0:`.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§4 Built-in Types — Truth Value Testing" },
    { source: "Python Language Reference", locator: "§6.12 The int, float, str, bool constructors" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
