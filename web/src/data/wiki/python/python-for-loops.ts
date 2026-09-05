import type { WikiArticle } from "../types";

export const pythonForLoopsWiki: WikiArticle = {
  conceptId: "python-for-loops",
  summary:
    "A for loop walks through an iterable one item at a time, binding each item to a name in turn — it's " +
    "the natural way to repeat something a known number of times, or once per element of a sequence. " +
    "Unlike a while loop, a for loop's number of iterations is fixed by what it's iterating over, not by " +
    "a condition re-checked each time.",

  sections: [
    {
      heading: "for item in iterable",
      blocks: [
        {
          kind: "code",
          source: "fruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(fruit)",
          caption: "Prints each fruit on its own line — fruit is rebound to the next item on every pass.",
        },
        {
          kind: "prose",
          text:
            "for reads almost like English: 'for [each] fruit in fruits.' The loop variable (fruit here) " +
            "is just a regular variable, freely named, that gets reassigned to the next item automatically " +
            "— there's no manual index tracking or bounds checking to get wrong.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The loop variable survives the loop",
          text:
            "After a for loop finishes normally, its loop variable still holds the last value it was " +
            "bound to — it isn't scoped to the loop body and doesn't disappear. Relying on that leftover " +
            "value is usually a sign the logic should be restructured, since it silently depends on the " +
            "loop having run at least once.",
        },
      ],
    },
    {
      heading: "range(): looping a fixed number of times",
      blocks: [
        {
          kind: "table",
          headers: ["Call", "Produces", "Note"],
          rows: [
            ["range(5)", "0, 1, 2, 3, 4", "Stops before 5 — same half-open convention as slicing"],
            ["range(2, 5)", "2, 3, 4", "Starts at 2 instead of 0"],
            ["range(0, 10, 2)", "0, 2, 4, 6, 8", "Step of 2"],
          ],
        },
        {
          kind: "code",
          source: "for i in range(5):\n    print(i * i)",
          caption: "Prints 0, 1, 4, 9, 16 — range(5) gives five values, 0 through 4.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Iterate the items, not the indices, when you can",
          text:
            "for fruit in fruits: is preferred over for i in range(len(fruits)): print(fruits[i]) — it " +
            "says directly what you're doing (walking the items) instead of what you're doing it with " +
            "(an index). Reach for range(len(...)) only when you genuinely need the position too, and " +
            "prefer enumerate() for that case once you've met it.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Language Reference", locator: "§8.3 The for statement" },
    { source: "Python Standard Library", locator: "§4.6.1 Ranges" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
