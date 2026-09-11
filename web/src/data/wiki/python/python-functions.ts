import type { WikiArticle } from "../types";

export const pythonFunctionsWiki: WikiArticle = {
  conceptId: "python-functions",
  summary:
    "A function packages a computation behind a name: def introduces it, parameters name the inputs, " +
    "and return hands back an output without printing anything. Everything that follows in this " +
    "curriculum — every code exercise you submit — is a function definition, so the rules here (what " +
    "return actually does, how a default parameter is evaluated, and which variables a function can " +
    "see) are the ones that make those submissions behave the way you expect.",

  sections: [
    {
      heading: "Defining and calling a function",
      blocks: [
        {
          kind: "prose",
          text:
            "def introduces a function: a name, a parenthesized list of parameters, and an indented " +
            "body — the same indentation rule that delimits an if block or a loop body. Nothing in " +
            "the body runs when Python reaches the def; it runs only later, once, per call.",
        },
        {
          kind: "code",
          source: "def square(x):\n    return x * x\n\nresult = square(5)  # 25 — the body runs now, not at def time",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "parameter",
              description: "The name in the function's own signature — x in def square(x): ...",
            },
            {
              term: "argument",
              description: "The value supplied at a call site — the 5 in square(5).",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A def with no call is inert",
          text:
            "Defining a function costs nothing and does nothing observable — it just binds the name " +
            "to a function object. A syntax error inside a body you never call still raises at def " +
            "time (Python must parse it), but a name error or a bad calculation inside stays silent " +
            "until something actually calls the function.",
        },
      ],
    },

    {
      heading: "return vs. a bare print — and the function that returns None",
      blocks: [
        {
          kind: "prose",
          text:
            "print writes text to the screen and hands nothing back to the caller. return hands a " +
            "value back to whatever called the function, so that value can be stored, passed to " +
            "another function, or used in an expression. A function that only prints is fine to run " +
            "for its side effect, but result = f(x) captures None if f never executed a return.",
        },
        {
          kind: "code",
          source:
            "def loud_square(x):\n    print(x * x)   # visible on screen, not returned\n\ndef square(x):\n    return x * x   # returned, nothing printed\n\na = loud_square(5)  # prints 25, then a is None\nb = square(5)        # nothing printed, b is 25",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Falling off the end of a function returns None",
          text:
            "A function with no return statement — or a bare return with no value — returns None. " +
            "This is easy to miss because nothing raises: def add(a, b): print(a + b) runs cleanly, " +
            "and add(2, 3) + 1 fails with a TypeError only once someone tries to use the result, far " +
            "from where the mistake actually was.",
        },
        {
          kind: "example",
          title: "return exits immediately",
          problem:
            "def first_negative(nums):\n    for n in nums:\n        if n < 0:\n            return n\n    return None\n" +
            "What does first_negative([3, -1, -2]) return, and why doesn't the loop keep going after -1?",
          steps: [
            "The loop reaches n = 3 first: 3 < 0 is False, so the if body is skipped and the loop continues.",
            "The loop reaches n = -1: -1 < 0 is True, so return n executes.",
            "return exits the function immediately — control never reaches n = -2, and the trailing return None is never evaluated.",
          ],
          answer: "-1. return stops the function at that line, regardless of how much of the loop is left.",
        },
      ],
    },

    {
      heading: "Default and keyword arguments",
      blocks: [
        {
          kind: "prose",
          text:
            "A parameter can carry a default, making it optional at the call site. Arguments can also " +
            "be passed by keyword — name=value — in which case order no longer matters. Positional " +
            "arguments must still come before any keyword arguments in the same call.",
        },
        {
          kind: "code",
          source:
            "def greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"\n\ngreet(\"Ada\")                    # \"Hello, Ada!\" — greeting takes its default\ngreet(\"Ada\", \"Hi\")              # \"Hi, Ada!\"\ngreet(name=\"Ada\", greeting=\"Hi\") # same, by keyword\ngreet(greeting=\"Hi\", name=\"Ada\") # keyword arguments can be reordered",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A mutable default is evaluated once, at def time — not once per call",
          text:
            "def collect(item, bucket=[]): bucket.append(item); return bucket looks like it starts a " +
            "fresh list every call. It does not: the list literal runs once, when the def statement " +
            "executes, and every call that skips the bucket argument shares that same list. " +
            "collect(1) returns [1]; collect(2) then returns [1, 2], not [2] — the previous call's " +
            "items are still there, and nothing raised to reveal it. The fix is a sentinel: default " +
            "to None, and build the fresh list inside the body when the argument is missing.",
        },
        {
          kind: "code",
          source: "def collect(item, bucket=None):\n    if bucket is None:\n        bucket = []\n    bucket.append(item)\n    return bucket",
          caption: "Each call with no bucket argument now gets its own new list.",
        },
      ],
    },

    {
      heading: "Scope: a function body has its own local variables",
      blocks: [
        {
          kind: "prose",
          text:
            "A name assigned inside a function — including a parameter, and including a for loop's " +
            "loop variable — is local to that call: it exists only while the function runs, and it " +
            "does not affect a variable of the same name outside it. Reading a name that isn't local " +
            "falls back to the enclosing (usually global) scope, but assigning to a name inside the " +
            "function always creates a local, even if a global of the same name exists.",
        },
        {
          kind: "example",
          title: "The global variable is untouched",
          problem:
            "total = 0\ndef add_all(nums):\n    total = 0\n    for n in nums:\n        total += n\n    return total\n\n" +
            "print(add_all([1, 2, 3]))\nprint(total)\nWhat prints on the second line, and why doesn't the function change the global total?",
          steps: [
            "Inside add_all, the line total = 0 assigns to total — and any name assigned inside a function is local to that call, so this creates a new local variable, not a write to the global one.",
            "The for loop only ever updates that local total; the global total declared outside is never referenced inside the function body.",
            "add_all([1, 2, 3]) returns its local total, which is 6, printed by the first print.",
            "The global total was never touched, so the second print still sees 0.",
          ],
          answer:
            "0. The parameter, the loop variable, and total inside the function are all local to that " +
            "call — none of it reaches the global total defined outside.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "global is the deliberate opt-out",
          text:
            "Writing global total as the first line of the function's body would make total = 0 and " +
            "total += n inside it refer to the module-level variable instead of creating a local one. " +
            "It's rarely the right call in code you'll want to test or reuse — a function that returns " +
            "its result is easier to reason about than one that mutates a variable somewhere else.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Language Reference", locator: "§7.6 Function definitions" },
    { source: "Python Language Reference", locator: "§4.2.2 Resolution of names" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
