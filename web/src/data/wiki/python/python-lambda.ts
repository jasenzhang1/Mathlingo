import type { WikiArticle } from "../types";

export const pythonLambdaWiki: WikiArticle = {
  conceptId: "python-lambda",
  summary: "lambda builds a function as an expression: lambda params: expression. It has no name, no statements, and no return keyword — the single expression is the return value. It exists for the moments when a function is needed as an argument and naming it would add nothing, most often as the key to sorted or as a small callback.",

  sections: [
    {
      heading: "The syntax, and its exact equivalent",
      blocks: [
        {
          kind: "code",
          source: "double = lambda n: n * 2\n\n# identical in behaviour to:\ndef double(n):\n    return n * 2\n\n(lambda a, b: a + b)(3, 4)      # 7 — defined and called at once\nlambda: 42                      # no parameters is fine",
        },
        {
          kind: "prose",
          text: "Everything after the colon is a single expression, evaluated when the lambda is called and returned automatically. A lambda is a perfectly ordinary function object — it can be stored, passed, and called like any other; the only differences are that it is anonymous and that its body cannot contain statements.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "No statements inside a lambda",
          text: "lambda n: return n * 2 is a SyntaxError — return is a statement and the body is already an expression. So are assignment, if/else as a statement, for, while, and try. A conditional expression is allowed, because it is an expression: lambda n: \"even\" if n % 2 == 0 else \"odd\".",
        },
      ],
    },
    {
      heading: "Where a lambda earns its place",
      blocks: [
        {
          kind: "code",
          source: "people = [(\"Ada\", 36), (\"Bo\", 24), (\"Cy\", 41)]\n\nsorted(people, key=lambda person: person[1])     # by age\nmax(people, key=lambda person: person[1])        # oldest\nsorted(words, key=lambda w: (len(w), w))         # length, then alphabetical",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "If you name it, use def",
          text: "double = lambda n: n * 2 assigns a lambda to a name, which is what def already does — and def gives the function a real __name__ for tracebacks and a place to put a docstring. PEP 8 says so explicitly. The honest use of lambda is the unnamed one: passed straight to sorted, max, filter, or a callback, and never referred to again.",
        },
        {
          kind: "example",
          title: "Choosing between lambda and a comprehension",
          problem: "You want the squares of a list of numbers. lambda, or a comprehension?",
          steps: [
            "list(map(lambda n: n ** 2, numbers)) works.",
            "[n ** 2 for n in numbers] does the same thing with less machinery.",
            "The comprehension wins here: there is no function to pass anywhere, so wrapping the expression in a lambda only to hand it to map is a detour.",
          ],
          answer: "Reach for lambda when something else demands a function; reach for a comprehension when you are just transforming a sequence.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§4.8.6 Lambda Expressions" },
    { source: "PEP 8", locator: "Programming Recommendations — do not assign a lambda to a name" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
