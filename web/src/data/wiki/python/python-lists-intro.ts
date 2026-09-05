import type { WikiArticle } from "../types";

export const pythonListsIntroWiki: WikiArticle = {
  conceptId: "python-lists-intro",
  summary:
    "A list holds an ordered, changeable collection of values in one variable, written with square " +
    "brackets: [a, b, c]. It's the default container to reach for when you have several related values " +
    "and don't yet know a more specific structure fits better — everything else about lists (indexing, " +
    "slicing, mutation) builds on this shape.",

  sections: [
    {
      heading: "Building and sizing a list",
      blocks: [
        {
          kind: "code",
          source:
            "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(len(fruits))     # 3\nprint(\"apple\" in fruits)   # True",
        },
        {
          kind: "prose",
          text:
            "Items are comma-separated inside square brackets, and order is preserved exactly as written " +
            "— the first item stays first until something changes that. len() counts the items (the same " +
            "function used on strings), and in checks whether a value is present anywhere in the list, " +
            "returning a bool.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A list can mix types, but usually shouldn't",
          text:
            "[1, \"two\", 3.0] is completely legal — a list places no restriction on the types of its " +
            "items. In practice, most lists hold one consistent type, because code that processes the " +
            "list usually assumes it can treat every item the same way.",
        },
      ],
    },
    {
      heading: "Ordered and mutable — the two words that matter",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Ordered", description: "Each item has a fixed position that persists until something explicitly changes it — this is what makes indexing meaningful." },
            { term: "Mutable", description: "The list can be changed in place after creation — items added, removed, or replaced — unlike a string or tuple." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "An empty list is falsy",
          text:
            "bool([]) is False and bool([\"a\"]) is True — the same truthiness rule that applies to " +
            "strings and dicts. `if cart:` is idiomatic for 'the cart has items.'",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§4.6 Sequence Types — list, tuple, range" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
