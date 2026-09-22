import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Servable items for `python-functions`, inserted between the control-flow
 * concepts and the containers chapter — see `assessments/python.md` for why
 * functions were added after the domain's original scope note excluded them
 * (code items throughout the domain already assume `def`, so the gap was
 * real). Same 8-live bar as the rest of the domain: recall/apply/explain/
 * transfer coverage, 1.5-logit difficulty spread. The three `code`-format
 * items for this concept live in `python-code-exercises.ts` alongside every
 * other concept's, not here.
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-python",
  tier: "generated",
  title: "Mathlingo authored item (Python sweep)",
};

const PYTHON_DOCS: SourceRef = {
  id: "python-docs",
  tier: "open",
  title: "The Python Language Reference and Standard Library documentation",
  url: "https://docs.python.org/3/",
  license: "PSF-2.0",
};

export const pythonFunctionsItems: Item[] = [
  {
    id: "python-functions--recall-def-keyword",
    conceptId: "python-functions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which keyword begins a function definition in Python?",
    choices: [
      { id: "a", text: "`def`", correct: true },
      {
        id: "b",
        text: "`function`",
        correct: false,
        misconception: {
          id: "expects-function-keyword",
          description: "Python defines a function with `def`, not a `function` keyword borrowed from another language.",
          blameConceptId: "python-functions",
        },
      },
      {
        id: "c",
        text: "`func`",
        correct: false,
        misconception: {
          id: "expects-func-keyword",
          description: "`func` is not a Python keyword; the function-defining keyword is `def`.",
          blameConceptId: "python-functions",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 0.9,
    expectedSeconds: 10,
    prereqClosure: ["python-functions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-functions--recall-no-return-gives-none",
    conceptId: "python-functions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`def add(a, b):\n    print(a + b)\n\nresult = add(2, 3)`\nWhat is `result`?",
    choices: [
      { id: "a", text: "`None`", correct: true },
      {
        id: "b",
        text: "`5`",
        correct: false,
        misconception: {
          id: "conflates-print-and-return",
          description: "`print` displays a value to the screen; it does not hand a value back to the caller. Without a `return` statement the function returns `None` regardless of what it printed.",
          blameConceptId: "python-functions",
        },
      },
      {
        id: "c",
        text: "Raises an error",
        correct: false,
        misconception: {
          id: "expects-error-on-missing-return",
          description: "A function with no `return` statement runs cleanly and returns `None` — nothing raises.",
          blameConceptId: "python-functions",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.2,
    expectedSeconds: 20,
    prereqClosure: ["python-functions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-functions--recall-parameter-vs-argument",
    conceptId: "python-functions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "`def greet(name):\n    return \"Hi, \" + name\ngreet(\"Ada\")`\nWhat is `name` called, and what is `\"Ada\"` called?",
    choices: [
      { id: "a", text: "`name` is a parameter; `\"Ada\"` is an argument", correct: true },
      {
        id: "b",
        text: "`name` is an argument; `\"Ada\"` is a parameter",
        correct: false,
        misconception: {
          id: "swaps-parameter-and-argument",
          description: "The name in the function's own signature is the parameter; the value supplied at the call site is the argument — this reverses the two.",
          blameConceptId: "python-functions",
        },
      },
      {
        id: "c",
        text: "Both are called arguments",
        correct: false,
        misconception: {
          id: "conflates-parameter-and-argument",
          description: "The signature name and the call-site value are distinct: parameter for the former, argument for the latter.",
          blameConceptId: "python-functions",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 0.8,
    expectedSeconds: 20,
    prereqClosure: ["python-functions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-functions--apply-trace-default-argument",
    conceptId: "python-functions",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "`def greet(name, greeting=\"Hello\"):\n    return greeting + \", \" + name + \"!\"\nprint(greet(\"Ada\"))\nprint(greet(\"Ada\", \"Hi\"))`\nWhat gets printed, on each of the two lines?",
    rubric: {
      elements: [
        {
          id: "first-line",
          description: "States that the first print is \"Hello, Ada!\" — greeting takes its default value since no second argument was passed.",
          weight: 2,
          required: true,
        },
        {
          id: "second-line",
          description: "States that the second print is \"Hi, Ada!\" — the supplied argument overrides the default.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["python-functions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-functions--apply-keyword-argument-order",
    conceptId: "python-functions",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`def subtract(a, b):\n    return a - b\nprint(subtract(b=2, a=5))`\nWhat prints?",
    choices: [
      { id: "a", text: "`3`", correct: true },
      {
        id: "b",
        text: "`-3`",
        correct: false,
        misconception: {
          id: "treats-keywords-as-positional",
          description: "Keyword arguments bind by name, not by the order they are written in — `b=2, a=5` sets `a` to 5 and `b` to 2 regardless of which is written first.",
          blameConceptId: "python-functions",
        },
      },
      {
        id: "c",
        text: "Raises a `TypeError`",
        correct: false,
        misconception: {
          id: "expects-error-on-reordered-keywords",
          description: "Keyword arguments can be given in any order at the call site; only positional arguments are position-sensitive.",
          blameConceptId: "python-functions",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 25,
    prereqClosure: ["python-functions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-functions--apply-mutable-default-shared",
    conceptId: "python-functions",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "`def collect(item, bucket=[]):\n    bucket.append(item)\n    return bucket\ncollect(1)\nprint(collect(2))`\nWhat prints?",
    choices: [
      { id: "a", text: "`[1, 2]`", correct: true },
      {
        id: "b",
        text: "`[2]`",
        correct: false,
        misconception: {
          id: "assumes-fresh-default-each-call",
          description: "A mutable default value is evaluated once, when the `def` statement runs — not fresh on every call. Every call that omits `bucket` shares that same list, so the item from the first call is still there.",
          blameConceptId: "python-functions",
        },
      },
      {
        id: "c",
        text: "Raises an error, since bucket already has an item in it",
        correct: false,
        misconception: {
          id: "expects-error-on-reused-default",
          description: "Reusing the shared default list is not an error — `append` just runs on whatever the list already holds. That is exactly what makes the bug silent.",
          blameConceptId: "python-functions",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.5,
    expectedSeconds: 40,
    prereqClosure: ["python-functions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-functions--explain-mutable-default-fix",
    conceptId: "python-functions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "`def collect(item, bucket=[]):\n    bucket.append(item)\n    return bucket`\nExplain why a third call, `collect(3)`, does not return a list containing only 3, and rewrite the signature and body so it would.",
    rubric: {
      elements: [
        {
          id: "why",
          description: "States that the default list literal is evaluated once, at def time, and every call that omits bucket shares that one object rather than getting a fresh list.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-fresh-default-each-call",
            description: "Believes each call with no `bucket` argument starts a new empty list, when in fact all such calls share the single list object created when the function was defined.",
            blameConceptId: "python-functions",
          },
        },
        {
          id: "fix",
          description: "Rewrites using a None sentinel: bucket=None as the default, then bucket = [] inside the body when bucket is None, before appending.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["python-functions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-functions--transfer-local-shadows-global",
    conceptId: "python-functions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "`total = 0\ndef add_all(nums):\n    total = 0\n    for n in nums:\n        total += n\n    return total\n\nprint(add_all([1, 2, 3]))\nprint(total)`\nWhat prints on each line, and why doesn't the function's loop change the global `total`?",
    rubric: {
      elements: [
        {
          id: "first-line",
          description: "States the first print is 6 — the sum computed by the for loop inside the function.",
          weight: 2,
          required: true,
        },
        {
          id: "second-line",
          description: "States the second print is still 0.",
          weight: 2,
          required: true,
        },
        {
          id: "why",
          description:
            "Explains that total = 0 inside the function creates a new local variable, because any name assigned inside a function body is local to that call — the for loop's total += n only ever updates that local, and the global total outside is never referenced.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-function-mutates-outer-variable",
            description: "Believes an assignment inside a function writes through to a same-named variable in the enclosing scope. In Python, assigning to a name inside a function makes it local unless the name is declared `global` first.",
            blameConceptId: "python-functions",
          },
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.6,
    expectedSeconds: 90,
    prereqClosure: ["python-functions", "python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-functions--recall-return-statement",
    conceptId: "python-functions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does a `return` statement do inside a function?",
    choices: [
      { id: "a", text: "Ends the function immediately and hands the given value back to the caller", correct: true },
      {
        id: "b",
        text: "Prints the value to the console",
        correct: false,
        misconception: {
          id: "conflates-return-and-print",
          description: "`return` hands a value back to the code that called the function; it produces no visible output by itself. That is `print`'s job.",
          blameConceptId: "python-functions",
        },
      },
      {
        id: "c",
        text: "Only works if it is the last line of the function",
        correct: false,
        misconception: {
          id: "assumes-return-must-be-last-line",
          description: "`return` can appear anywhere in a function body, including inside a branch or loop, and exits as soon as it runs — code after it in that call never executes.",
          blameConceptId: "python-functions",
        },
      },
    ],
    difficulty: -2.4,
    discrimination: 0.8,
    expectedSeconds: 12,
    prereqClosure: ["python-functions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-functions--recall-args-collects-tuple",
    conceptId: "python-functions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a function signature written as `def f(*args):`, what type of object does `args` hold inside the function body?",
    choices: [
      { id: "a", text: "A tuple of the extra positional arguments", correct: true },
      {
        id: "b",
        text: "A list of the extra positional arguments",
        correct: false,
        misconception: {
          id: "args-thought-to-be-list",
          description: "`*args` packs the extra positional arguments into a tuple, not a list — it supports indexing and iteration but not `.append`.",
          blameConceptId: "python-functions",
        },
      },
      {
        id: "c",
        text: "A dictionary mapping parameter names to values",
        correct: false,
        misconception: {
          id: "args-confused-with-kwargs",
          description: "A dictionary of names to values is what `**kwargs` collects; `*args` is for extra positional arguments, which have no names to key by.",
          blameConceptId: "python-functions",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 15,
    prereqClosure: ["python-functions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-functions--apply-args-sum",
    conceptId: "python-functions",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`def total(*args):\n    return sum(args)\nprint(total(1, 2, 3, 4))`\nWhat prints?",
    choices: [
      { id: "a", text: "`10`", correct: true },
      {
        id: "b",
        text: "`(1, 2, 3, 4)`",
        correct: false,
        misconception: {
          id: "expects-args-printed-as-tuple",
          description: "The function returns `sum(args)`, the total of the collected values, not the tuple `args` itself.",
          blameConceptId: "python-functions",
        },
      },
      {
        id: "c",
        text: "Raises a `TypeError` because `sum` cannot take a tuple",
        correct: false,
        misconception: {
          id: "assumes-sum-rejects-tuples",
          description: "`sum` accepts any iterable, including a tuple — this is exactly what makes `*args` usable inside the body without unpacking it further.",
          blameConceptId: "python-functions",
        },
      },
    ],
    difficulty: -0.1,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["python-functions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-functions--apply-recursive-countdown",
    conceptId: "python-functions",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "`def countdown(n):\n    if n <= 0:\n        print(\"done\")\n        return\n    print(n)\n    countdown(n - 1)\ncountdown(3)`\nList everything printed, in order.",
    rubric: {
      elements: [
        {
          id: "sequence",
          description: "States the printed sequence as 3, then 2, then 1, then \"done\" — each recursive call prints its own n before recursing, and the n <= 0 branch fires and prints \"done\" once n reaches 0.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["python-functions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-functions--explain-first-class-functions",
    conceptId: "python-functions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem: "Explain what it means to say functions are \"first-class objects\" in Python, and give an example of passing one as an argument to another function.",
    rubric: {
      elements: [
        {
          id: "definition",
          description: "States that a function can be assigned to a variable, stored in a data structure, passed as an argument, and returned from another function — treated like any other value rather than a special kind of statement.",
          weight: 4,
          required: true,
        },
        {
          id: "example",
          description: "Gives a concrete example, e.g. passing `str.upper` or a custom function as the `key=` argument to `sorted(...)` so it is called on each element without the caller writing a loop.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["python-functions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-functions--explain-pass-by-object-reference",
    conceptId: "python-functions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "`def modify(lst):\n    lst.append(4)\n    lst = [99]\nnums = [1, 2, 3]\nmodify(nums)\nprint(nums)`\nWhat prints, and why does the reassignment `lst = [99]` not affect it?",
    rubric: {
      elements: [
        {
          id: "the-output",
          description: "States the output is `[1, 2, 3, 4]` — the append is visible, the reassignment is not.",
          weight: 3,
          required: true,
        },
        {
          id: "the-mechanism",
          description: "Explains that `lst` and `nums` start out as two names for the same list object, so `lst.append(4)` mutates that shared object and is visible through `nums` too; `lst = [99]` instead rebinds the local name `lst` to a brand-new list, leaving `nums` pointing at the original, now-mutated one.",
          weight: 4,
          required: true,
          misconception: {
            id: "assumes-reassignment-mutates-caller",
            description: "Believes reassigning a parameter inside a function changes what the caller's variable refers to. Reassignment only rebinds the local name; it never reaches back to the caller's variable the way mutating the shared object does.",
            blameConceptId: "python-functions",
          },
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 100,
    prereqClosure: ["python-functions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-functions--transfer-closure-captures-variable",
    conceptId: "python-functions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "`def make_multiplier(n):\n    def multiply(x):\n        return x * n\n    return multiply\ntriple = make_multiplier(3)\nprint(triple(5))`\nWhat prints, and how does `multiply` still have access to `n` after `make_multiplier` has already returned?",
    rubric: {
      elements: [
        {
          id: "the-output",
          description: "States the output is `15`.",
          weight: 3,
          required: true,
        },
        {
          id: "closure",
          description: "Names the mechanism as a closure: the inner function `multiply` captures a reference to the enclosing scope's variable `n` at definition time, and that reference is kept alive for as long as `multiply` itself exists, even though `make_multiplier`'s own call frame has finished.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.5,
    expectedSeconds: 110,
    prereqClosure: ["python-functions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-functions--transfer-recursion-depth-limit",
    conceptId: "python-functions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A recursive `factorial(n)` function is mathematically correct, but calling `factorial(5000)` raises `RecursionError: maximum recursion depth exceeded`. Explain why the error happens, and give a fix that doesn't just raise Python's recursion limit.",
    rubric: {
      elements: [
        {
          id: "why-it-happens",
          description: "Explains that each recursive call pushes a new frame onto the call stack, and Python enforces a maximum stack depth (a few thousand frames by default) precisely to fail loudly instead of crashing the interpreter when recursion runs unbounded.",
          weight: 4,
          required: true,
        },
        {
          id: "the-fix",
          description: "Proposes rewriting the computation iteratively (a loop accumulating the product) or using an explicit stack, rather than raising `sys.setrecursionlimit`, which just delays the same crash at a larger n and risks a genuine interpreter stack overflow.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["python-functions"],
    source: AUTHORED,
    status: "live",
  },
];
