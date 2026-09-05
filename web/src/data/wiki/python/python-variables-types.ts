import type { WikiArticle } from "../types";

export const pythonVariablesTypesWiki: WikiArticle = {
  conceptId: "python-variables-types",
  summary:
    "A variable is a name bound to a value, created with = and requiring no declaration. Every value " +
    "carries its own type — int, float, str, bool, or None — and Python decides that type from how the " +
    "value is written, not from the name it's bound to. The same name can be rebound to a value of a " +
    "completely different type at any point, which is both the language's flexibility and, when it's " +
    "unintentional, the source of a real class of bugs.",

  sections: [
    {
      heading: "Binding, not declaring",
      blocks: [
        {
          kind: "prose",
          text:
            "score = 10 does not declare a box called score that only ever holds integers. It binds the " +
            "name score to the integer object 10. A later score = \"ten\" is not a type error — it simply " +
            "rebinds score to a different object, of a different type. Nothing checks that the new value " +
            "is compatible with the old one, because there is no per-name type to be compatible with.",
        },
        {
          kind: "code",
          source: "score = 10\nscore = \"ten\"   # legal: rebinds the name, not a type mismatch",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Naming rules",
              description:
                "Letters, digits, and underscores; cannot start with a digit; case-sensitive (score and Score are different names).",
            },
            {
              term: "Convention",
              description:
                "snake_case for variables and functions — first_name, not firstName or FirstName.",
            },
            {
              term: "type(value)",
              description:
                "Returns the type of any value or variable, e.g. type(10) is <class 'int'> — the fastest way to check what you're actually holding.",
            },
          ],
        },
      ],
    },
    {
      heading: "The four core types",
      blocks: [
        {
          kind: "table",
          headers: ["Type", "Example literal", "Written with"],
          rows: [
            ["int", "42, -7", "digits, no decimal point"],
            ["float", "3.14, -0.5, 2e3", "a decimal point or exponent"],
            ["str", "\"hi\", 'hi'", "single or double quotes"],
            ["bool", "True, False", "capitalized, no quotes"],
          ],
        },
        {
          kind: "prose",
          text:
            "The type is decided entirely by how the literal is written: 4 is an int, 4.0 is a float, " +
            "even though they're mathematically the same number. bool is technically a subtype of int — " +
            "True behaves like 1 and False like 0 in arithmetic, so True + True evaluates to 2. This is " +
            "worth knowing so it doesn't surprise you, not something to lean on in real code.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "None is a fifth, special citizen",
          text:
            "None represents the deliberate absence of a value — not 0, not \"\", not False. It has its " +
            "own type, NoneType, and is what a function with no return statement produces. Check for it " +
            "with `is None` rather than `== None`.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A quoted number is not a number",
          text:
            "\"42\" is a str, full stop — it happens to look like a number, but 5 == \"5\" is False, and " +
            "\"3\" + \"4\" concatenates to \"34\" rather than adding to 7. Whether something is text or a " +
            "number depends only on whether it was written inside quotes.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Language Reference", locator: "§6.2 Naming and binding" },
    { source: "Python Standard Library", locator: "§4.11 Boolean Operations, §4 Built-in Types" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
