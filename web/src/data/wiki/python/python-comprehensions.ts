import type { WikiArticle } from "../types";

export const pythonComprehensionsWiki: WikiArticle = {
  conceptId: "python-comprehensions",
  summary:
    "A comprehension is a loop that builds a container, written as one expression. [f(x) for x in " +
    "xs if p(x)] is exactly the append-in-a-loop you would otherwise write, with the accumulator " +
    "and the append made implicit. The value is not brevity for its own sake: the shape of the " +
    "result is visible in the first two tokens, so a reader knows what comes out before reading how.",

  sections: [
    {
      heading: "The three forms, and the one that is not a comprehension",
      blocks: [
        {
          kind: "table",
          headers: ["Written as", "Produces", "Equivalent loop"],
          rows: [
            ["[f(x) for x in xs]", "list", "out = []; for x in xs: out.append(f(x))"],
            ["{k(x): v(x) for x in xs}", "dict", "out = {}; for x in xs: out[k(x)] = v(x)"],
            ["{f(x) for x in xs}", "set", "out = set(); for x in xs: out.add(f(x))"],
            ["(f(x) for x in xs)", "generator — lazy, not a tuple", "a function with yield"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Parentheses give a generator, not a tuple",
          text:
            "(x for x in xs) is a lazy generator: it computes nothing until iterated, and it is " +
            "exhausted after one pass. A second loop over it sees nothing, and len() on it is a " +
            "TypeError. For a tuple, write tuple(x for x in xs).",
        },
      ],
    },

    {
      heading: "Filtering, and where the if goes",
      blocks: [
        {
          kind: "prose",
          text:
            "A trailing if filters: elements failing the test never reach the output, so the result " +
            "is shorter than the input. A conditional expression before the for maps: every element " +
            "produces an output, chosen between two branches. The two read similarly and do entirely " +
            "different things, and the giveaway is whether there is an else.",
        },
        {
          kind: "code",
          source: "[x for x in xs if x > 0]        # filter -> len <= len(xs)\n[x if x > 0 else 0 for x in xs] # map    -> len == len(xs)",
          caption: "A filtering if follows the for. A mapping if...else precedes it, and needs the else.",
        },
        {
          kind: "example",
          title: "Reading a nested comprehension",
          problem: "What does [x for row in grid for x in row] do, and what does the order of the two fors mean?",
          steps: [
            "Nested fors read left to right, in the same order as the nested loops they stand for.",
            "So the outer loop is `for row in grid` and the inner is `for x in row`.",
            "Each x is appended as it is reached, so rows come out in order, elements within a row in order.",
            "Reversing the two clauses is a NameError: `row` would be used before it is bound.",
          ],
          answer:
            "It flattens one level of nesting. The clause order matches the loop nesting order — " +
            "outermost first — which is the opposite of how the output expression reads.",
        },
      ],
    },

    {
      heading: "When not to use one",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "When the body has side effects. A comprehension whose result you discard is a loop wearing a disguise — write the loop.",
            "When it needs more than one filter and a nested for at once. Past two clauses, a reader has to simulate it mentally.",
            "When you need try/except, or an early break. Neither is expressible in a comprehension.",
            "When the input is large and you only need one pass — a generator expression avoids materialising the whole list.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The loop variable does not leak",
          text:
            "Unlike a for statement, a comprehension runs in its own scope: after [x for x in xs], " +
            "the name x is unchanged outside — and unbound if it never existed. This is the reverse " +
            "of the for-loop rule, and it is deliberate, so a comprehension cannot clobber a variable " +
            "you were using.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Language Reference", locator: "§6.2.4 Displays for lists, sets and dictionaries" },
    { source: "Python Language Reference", locator: "§6.2.8 Generator expressions" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
