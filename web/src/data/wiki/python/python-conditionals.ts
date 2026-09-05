import type { WikiArticle } from "../types";

export const pythonConditionalsWiki: WikiArticle = {
  conceptId: "python-conditionals",
  summary:
    "if, elif, and else let a program run different code depending on a condition — the first logical " +
    "expression that actually changes what a program does rather than just what value it computes. " +
    "Python has no separate 'switch' statement and no braces: indentation itself marks which lines belong " +
    "to which branch, and exactly one branch of an if/elif/.../else chain ever runs.",

  sections: [
    {
      heading: "if, elif, else",
      blocks: [
        {
          kind: "code",
          source:
            "age = 20\nif age < 13:\n    print(\"child\")\nelif age < 20:\n    print(\"teen\")\nelse:\n    print(\"adult\")",
          caption: "Prints \"adult\" — the first true condition wins, and the rest are skipped entirely.",
        },
        {
          kind: "prose",
          text:
            "Each condition is checked in order, top to bottom. The moment one evaluates to True, its " +
            "block runs and every later elif/else is skipped — even if a later condition would also be " +
            "true. else, when present, catches everything none of the earlier conditions matched, and " +
            "runs no matter what elif conditions look like.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Indentation is the syntax — there are no braces",
          text:
            "The lines indented under if belong to that branch; the first line back at the original " +
            "indent level ends it. Mixing tabs and spaces, or indenting inconsistently, is a syntax " +
            "error in Python — unlike languages where indentation is just a style convention.",
        },
      ],
    },
    {
      heading: "Any expression that's truthy or falsy can be a condition",
      blocks: [
        {
          kind: "code",
          source: "cart = []\nif cart:\n    print(\"has items\")\nelse:\n    print(\"empty\")",
          caption: "Prints \"empty\" — an empty list is falsy, so the condition is False.",
        },
        {
          kind: "prose",
          text:
            "A condition doesn't have to be a comparison. Python implicitly calls bool() on whatever " +
            "follows if, so `if cart:` reads as 'if the cart is truthy' — true for any non-empty " +
            "container, false for an empty one, 0, None, or \"\".",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Multiple elif branches versus nested if",
          text:
            "A chain of elif keeps every branch at the same indentation level and guarantees exactly one " +
            "runs. Nesting an if inside another if's block instead means the inner check only happens at " +
            "all when the outer one was true — a genuinely different structure, worth choosing " +
            "deliberately rather than by habit.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Language Reference", locator: "§8.1 The if statement" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
