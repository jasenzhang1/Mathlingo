import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Servable items for the three control-flow concepts (`python-conditionals`,
 * `python-while-loops`, `python-for-loops`) inserted between the operators
 * concept and the containers chapter — the "logical expressions" gap the
 * fundamentals track had before this file existed. Same 8-live bar as the
 * rest of the domain: recall/apply/explain/transfer coverage, 1.5-logit
 * difficulty spread.
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

export const pythonControlFlowItems: Item[] = [
  // =========================================================================
  // Conditionals: if, elif, else
  // =========================================================================
  {
    id: "python-conditionals--recall-exactly-one-branch",
    conceptId: "python-conditionals",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In an if/elif/elif/else chain, how many branches run when the first elif's condition is True?",
    choices: [
      { id: "a", text: "Exactly one — the first elif, and nothing after it", correct: true },
      {
        id: "b",
        text: "Every branch whose condition is True",
        correct: false,
        misconception: {
          id: "assumes-all-true-branches-run",
          description: "An if/elif chain stops at the first True condition — later elif/else branches are skipped even if their conditions would also be true.",
          blameConceptId: "python-conditionals",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 15,
    prereqClosure: ["python-conditionals"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-conditionals--recall-else-always-runs-if-reached",
    conceptId: "python-conditionals",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "When does the else block of an if/else statement run?",
    choices: [
      { id: "a", text: "Whenever none of the preceding if/elif conditions were True", correct: true },
      {
        id: "b",
        text: "Only when explicitly called",
        correct: false,
        misconception: {
          id: "treats-else-as-optional-call",
          description: "else is not a separate callable block — it runs automatically whenever no earlier condition in the chain matched.",
          blameConceptId: "python-conditionals",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 0.9,
    expectedSeconds: 15,
    prereqClosure: ["python-conditionals"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-conditionals--recall-indentation-required",
    conceptId: "python-conditionals",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What marks which lines belong to an if statement's body in Python?",
    choices: [
      { id: "a", text: "Indentation", correct: true },
      {
        id: "b",
        text: "Curly braces `{ }`",
        correct: false,
        misconception: {
          id: "expects-braces",
          description: "Python uses indentation, not braces, to delimit blocks — inconsistent indentation is a syntax error.",
          blameConceptId: "python-conditionals",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 0.8,
    expectedSeconds: 10,
    prereqClosure: ["python-conditionals"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-conditionals--apply-trace-chain",
    conceptId: "python-conditionals",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "`age = 20\nif age < 13:\n    print(\"child\")\nelif age < 20:\n    print(\"teen\")\nelse:\n    print(\"adult\")`\nWhat gets printed?",
    rubric: {
      elements: [
        { id: "correct-output", description: "States that \"adult\" is printed, since age < 13 and age < 20 are both False for age = 20.", weight: 3, required: true },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-conditionals"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-conditionals--apply-truthy-condition",
    conceptId: "python-conditionals",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`cart = []`. What does `if cart: print(\"has items\") else: print(\"empty\")` print?",
    choices: [
      { id: "a", text: "empty", correct: true },
      {
        id: "b",
        text: "has items",
        correct: false,
        misconception: {
          id: "assumes-container-always-truthy",
          description: "An empty list is falsy — if implicitly calls bool() on the condition, and bool([]) is False.",
          blameConceptId: "python-conditionals",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.4,
    expectedSeconds: 20,
    prereqClosure: ["python-conditionals", "python-type-conversion"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-conditionals--apply-nested-vs-elif",
    conceptId: "python-conditionals",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`x = 5`. Given `if x > 0:` with a nested `if x > 10: print('big')` inside it (no else anywhere), what prints?",
    choices: [
      { id: "a", text: "Nothing", correct: true },
      {
        id: "b",
        text: "`'big'`",
        correct: false,
        misconception: {
          id: "assumes-outer-true-implies-print",
          description: "The outer condition being true only allows the inner check to run — the inner condition (`x > 10`) still has to hold, and it doesn't for `x = 5`.",
          blameConceptId: "python-conditionals",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["python-conditionals"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-conditionals--explain-elif-vs-separate-ifs",
    conceptId: "python-conditionals",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain the behavioral difference between a chain of elif branches and a sequence of separate, independent if statements testing similar conditions.",
    rubric: {
      elements: [
        { id: "elif-exclusive", description: "States that an if/elif chain runs at most one branch — once a condition matches, the rest are skipped.", weight: 3, required: true },
        { id: "separate-ifs-independent", description: "States that separate if statements are each evaluated independently, so more than one of their bodies can run in sequence if more than one condition is true.", weight: 3, required: true },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["python-conditionals"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-conditionals--transfer-condition-is-any-expression",
    conceptId: "python-conditionals",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "`count = 0`. What does `if count:` evaluate as?",
    choices: [
      { id: "a", text: "False — the branch is skipped", correct: true },
      {
        id: "b",
        text: "A syntax error — a condition must be a comparison",
        correct: false,
        misconception: {
          id: "assumes-condition-must-be-comparison",
          description: "Any expression can be a condition; Python calls `bool()` on it. `bool(0)` is `False`, so the branch is simply skipped, not an error.",
          blameConceptId: "python-conditionals",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 20,
    prereqClosure: ["python-conditionals", "python-type-conversion"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // while Loops
  // =========================================================================
  {
    id: "python-while-loops--recall-checks-before-each-run",
    conceptId: "python-while-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "When is a while loop's condition checked?",
    choices: [
      { id: "a", text: "Before every iteration, including the first", correct: true },
      {
        id: "b",
        text: "Only once, before the loop starts",
        correct: false,
        misconception: {
          id: "assumes-condition-checked-once",
          description: "The condition is re-evaluated before every single iteration, not just once at the start — that's what lets the loop body change something the condition depends on.",
          blameConceptId: "python-while-loops",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.0,
    expectedSeconds: 15,
    prereqClosure: ["python-while-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-while-loops--recall-zero-iterations-possible",
    conceptId: "python-while-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`x = 10`. How many times does `while x < 5: print(x)` run its body?",
    choices: [
      { id: "a", text: "Zero times", correct: true },
      {
        id: "b",
        text: "At least once, since the loop always runs first", correct: false,
        misconception: {
          id: "assumes-loop-runs-at-least-once",
          description: "A while loop checks its condition before the first run too — if it's already False, the body never executes.",
          blameConceptId: "python-while-loops",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.2,
    expectedSeconds: 15,
    prereqClosure: ["python-while-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-while-loops--recall-break-exits",
    conceptId: "python-while-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `break` do inside a while loop?",
    choices: [
      { id: "a", text: "Exits the loop immediately", correct: true },
      {
        id: "b",
        text: "Skips to the next iteration",
        correct: false,
        misconception: {
          id: "confuses-break-with-continue",
          description: "That's what `continue` does. `break` exits the loop entirely; `continue` just skips the rest of the current iteration.",
          blameConceptId: "python-while-loops",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 0.9,
    expectedSeconds: 10,
    prereqClosure: ["python-while-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-while-loops--apply-trace-count",
    conceptId: "python-while-loops",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`count = 0\nwhile count < 3:\n    print(count)\n    count += 1`\nWhat gets printed, in order?",
    rubric: {
      elements: [
        { id: "correct-sequence", description: "States 0, 1, 2 are printed in that order, and 3 is never printed because the loop stops once count < 3 is False.", weight: 3, required: true },
      ],
    },
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-while-loops--apply-spot-infinite-loop",
    conceptId: "python-while-loops",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`count = 0\nwhile count < 3:\n    print(count)`\nWhat happens when this runs?",
    choices: [
      { id: "a", text: "It loops forever, printing 0 repeatedly", correct: true },
      {
        id: "b",
        text: "It prints 0, 1, 2 and stops",
        correct: false,
        misconception: {
          id: "assumes-loop-var-auto-increments",
          description: "Nothing inside the body changes `count`, so `count < 3` stays `True` forever — the loop variable does not update itself.",
          blameConceptId: "python-while-loops",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 25,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-while-loops--apply-continue-skips-body",
    conceptId: "python-while-loops",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`n = 0\nwhile n < 4:\n    n += 1\n    if n == 2:\n        continue\n    print(n)`\nWhat gets printed?",
    rubric: {
      elements: [
        { id: "correct-output", description: "States 1, 3, 4 are printed — when n == 2, continue skips the print(n) call for that iteration only.", weight: 3, required: true },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 40,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-while-loops--explain-while-true-needs-break",
    conceptId: "python-while-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why `while True:` is a legitimate pattern despite its condition never becoming `False` on its own, and what must be true of the loop body for it to actually terminate.",
    rubric: {
      elements: [
        { id: "legitimate-use", description: "Names a legitimate use case, e.g. repeatedly prompting for input until a valid or 'quit' value is seen.", weight: 3, required: true },
        { id: "requires-break", description: "States that some path through the body must execute break (or return/raise) or the loop runs forever.", weight: 3, required: true },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-while-loops--transfer-choose-while-over-for",
    conceptId: "python-while-loops",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "You need to keep drawing random numbers until one is greater than 0.9 — you don't know in advance how many draws that will take. while or for?",
    choices: [
      { id: "a", text: "while — the number of iterations isn't known ahead of time", correct: true },
      {
        id: "b",
        text: "for — you're repeating an action",
        correct: false,
        misconception: {
          id: "picks-for-by-default",
          description: "A for loop needs a sequence with a fixed length to walk; here the number of draws depends on the random outcome, which is exactly what a while loop's condition-based repetition is for.",
          blameConceptId: "python-while-loops",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // for Loops and range
  // =========================================================================
  {
    id: "python-for-loops--recall-range-exclusive-stop",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How many values does `range(5)` produce?",
    rubric: {
      elements: [{ id: "correct", description: "States 5 — the values 0, 1, 2, 3, 4 (stop is exclusive).", weight: 3, required: true }],
    },
    difficulty: -1.6,
    discrimination: 1.0,
    expectedSeconds: 15,
    prereqClosure: ["python-for-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-for-loops--recall-loop-var-rebinds",
    conceptId: "python-for-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`for fruit in [\"apple\", \"banana\"]: print(fruit)`. What is `fruit` each time through the loop?",
    choices: [
      { id: "a", text: "It's rebound to the next item in the list on each pass", correct: true },
      {
        id: "b",
        text: "It's a fixed reference to the whole list",
        correct: false,
        misconception: {
          id: "assumes-loop-var-is-the-collection",
          description: "The loop variable is bound to one element at a time, not to the collection being iterated.",
          blameConceptId: "python-for-loops",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 0.9,
    expectedSeconds: 15,
    prereqClosure: ["python-for-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-for-loops--recall-range-with-start",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the first value produced by `range(2, 5)`?",
    rubric: {
      elements: [{ id: "correct", description: "States 2 — range(start, stop) begins at start.", weight: 3, required: true }],
    },
    difficulty: -1.3,
    discrimination: 0.9,
    expectedSeconds: 15,
    prereqClosure: ["python-for-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-for-loops--apply-trace-squares",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`for i in range(4):\n    print(i * i)`\nWhat gets printed, in order?",
    rubric: {
      elements: [{ id: "correct", description: "States 0, 1, 4, 9 — the squares of 0, 1, 2, 3.", weight: 3, required: true }],
    },
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-for-loops--apply-step-range",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem: "List the values produced by `range(1, 10, 3)`.",
    rubric: {
      elements: [{ id: "correct", description: "States 1, 4, 7 — starting at 1, stepping by 3, stopping before 10.", weight: 3, required: true }],
    },
    difficulty: -0.1,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-for-loops--apply-loop-var-survives",
    conceptId: "python-for-loops",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`for x in [10, 20, 30]:\n    pass\nprint(x)`\nWhat gets printed, right after the loop?",
    choices: [
      { id: "a", text: "`30`", correct: true },
      {
        id: "b",
        text: "Nothing prints — `x` doesn't exist outside the loop",
        correct: false,
        misconception: {
          id: "assumes-loop-var-scoped-to-body",
          description: "Python's for loops don't create a new scope — the loop variable keeps whatever value it last held once the loop ends.",
          blameConceptId: "python-for-loops",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.3,
    expectedSeconds: 25,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-for-loops--explain-iterate-items-vs-indices",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why `for fruit in fruits:` is generally preferred over `for i in range(len(fruits)): fruit = fruits[i]`, given that both produce the same sequence of fruit values.",
    rubric: {
      elements: [
        { id: "clarity", description: "States that iterating items directly says what you're doing (processing each fruit) rather than how (via a manually tracked index), which is clearer to read.", weight: 3, required: true },
        { id: "when-index-needed", description: "Notes that the index-based form is still appropriate when the position itself is actually needed, not just the value.", weight: 3, required: true },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-for-loops--transfer-for-over-while-fixed-length",
    conceptId: "python-for-loops",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "You need to print every item in a list of known length exactly once. for or while?",
    choices: [
      { id: "a", text: "for — the number of iterations is fixed by the list's length", correct: true },
      {
        id: "b",
        text: "while — either works equally well, so it doesn't matter",
        correct: false,
        misconception: {
          id: "treats-for-and-while-as-interchangeable",
          description: "Both can accomplish this, but a for loop states the fixed-length iteration directly and can't accidentally run the wrong number of times the way a hand-tracked while-loop counter can.",
          blameConceptId: "python-for-loops",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Doubling pass — additional items per concept
  // =========================================================================

  // --- Conditionals: if, elif, else ----------------------------------------
  {
    id: "python-conditionals--recall-else-elif-optional",
    conceptId: "python-conditionals",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Can an `if` statement appear with no `else` and no `elif` at all?",
    choices: [
      { id: "a", text: "Yes — `else` and `elif` are both optional", correct: true },
      {
        id: "b",
        text: "No — every `if` must have a matching `else`",
        correct: false,
        misconception: {
          id: "else-assumed-mandatory",
          description: "`else` is entirely optional. An `if` with no matching branch simply does nothing when its condition is False.",
          blameConceptId: "python-conditionals",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 0.8,
    expectedSeconds: 10,
    prereqClosure: ["python-conditionals"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-conditionals--recall-condition-any-value",
    conceptId: "python-conditionals",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What type of value must the expression after `if` evaluate to?",
    choices: [
      { id: "a", text: "Any value — Python calls bool() on it automatically", correct: true },
      {
        id: "b",
        text: "A `bool` value only — anything else is a syntax error",
        correct: false,
        misconception: {
          id: "condition-assumed-must-be-bool",
          description: "Python accepts any expression as a condition and converts it with bool(); it is not restricted to values already of type bool.",
          blameConceptId: "python-conditionals",
        },
      },
    ],
    difficulty: -1.9,
    discrimination: 0.8,
    expectedSeconds: 10,
    prereqClosure: ["python-conditionals"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-conditionals--apply-negative-branch",
    conceptId: "python-conditionals",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`x = -5`. What does `if x >= 0:\\n    print('non-negative')\\nelif x < 0:\\n    print('negative')` print?",
    choices: [
      { id: "a", text: "negative", correct: true },
      {
        id: "b",
        text: "non-negative",
        correct: false,
        misconception: {
          id: "assumes-first-branch-matches",
          description: "`-5 >= 0` is False, so the first branch is skipped and the elif (which is True) runs instead.",
          blameConceptId: "python-conditionals",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["python-conditionals"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-conditionals--apply-grade-chain",
    conceptId: "python-conditionals",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "`grade = 85`\\nif grade >= 90:\\n    letter = 'A'\\nelif grade >= 80:\\n    letter = 'B'\\nelif grade >= 70:\\n    letter = 'C'\\nelse:\\n    letter = 'F'\\nWhat is `letter`?",
    rubric: {
      elements: [{ id: "correct-output", description: "States 'B' — grade is less than 90 but at least 80.", weight: 3, required: true }],
    },
    difficulty: -0.7,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["python-conditionals"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-conditionals--explain-if-true-antipattern",
    conceptId: "python-conditionals",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why writing `if x == True:` instead of `if x:` is usually considered bad style, given what each actually checks.",
    rubric: {
      elements: [
        {
          id: "difference-in-what-is-checked",
          description:
            "`if x:` calls bool(x), accepting any truthy or falsy value; `if x == True:` specifically compares x to the boolean True, which behaves oddly for other truthy values and is simply redundant when x is already boolean.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["python-conditionals"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-conditionals--explain-guard-clause",
    conceptId: "python-conditionals",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain what a 'guard clause' (an early `if ...: return` at the top of a function) accomplishes compared to wrapping the rest of the function body in a large `if`/`else`.",
    rubric: {
      elements: [
        {
          id: "guard-clause-benefit",
          description:
            "A guard clause handles an edge case and exits immediately, so the rest of the function can be written at a lower indentation level without being nested inside an else branch, which is usually easier to read for the common case.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["python-conditionals"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-conditionals--transfer-branch-order-bug",
    conceptId: "python-conditionals",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A chain checks `if score >= 60: result = 'pass'` then `elif score >= 90: result = 'honors'`. A score of " +
      "95 is reported as 'pass', never 'honors'. Diagnose the bug and state the fix.",
    rubric: {
      elements: [
        {
          id: "diagnosis",
          description: "Diagnoses that the first, broader condition (score >= 60) is checked first and matches 95, so the chain stops there and the narrower elif is never reached.",
          weight: 4,
          required: true,
        },
        {
          id: "fix",
          description: "Fix: order the branches from most specific/narrowest condition to broadest (check score >= 90 before score >= 60).",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["python-conditionals"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-conditionals--transfer-independent-conditions-not-elif",
    conceptId: "python-conditionals",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "You are translating a rule table with four independent yes/no conditions (16 possible combinations) into " +
      "code. Explain why a single if/elif chain becomes awkward here, and what alternative structure handles " +
      "independent boolean conditions more cleanly.",
    rubric: {
      elements: [
        {
          id: "elif-forces-mutual-exclusivity",
          description:
            "An if/elif chain forces the conditions into one mutually-exclusive ordered sequence, but here the four conditions are independent and can combine in any of 16 ways, so expressing every combination as ordered elif branches requires repeating compound conditions and is easy to get wrong or leave gaps in.",
          weight: 4,
          required: true,
        },
        {
          id: "alternative-structure",
          description:
            "A cleaner alternative: evaluate the four booleans individually (each with its own if, since they are not mutually exclusive), or combine them into a single composite key and dispatch on that, rather than forcing them into one ordered chain.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["python-conditionals"],
    source: AUTHORED,
    status: "live",
  },

  // --- while Loops -----------------------------------------------------------
  {
    id: "python-while-loops--recall-unknown-iteration-count",
    conceptId: "python-while-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which loop is a better fit when the number of iterations is not known in advance?",
    choices: [
      { id: "a", text: "while", correct: true },
      {
        id: "b",
        text: "for, since for loops can also be given a condition",
        correct: false,
        misconception: {
          id: "for-loop-assumed-condition-based",
          description: "A Python for loop iterates over a sequence, not over a condition — while loops are the ones built around a condition that decides when to stop.",
          blameConceptId: "python-while-loops",
        },
      },
    ],
    difficulty: -1.9,
    discrimination: 0.8,
    expectedSeconds: 10,
    prereqClosure: ["python-while-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-while-loops--recall-condition-must-become-false",
    conceptId: "python-while-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What must eventually happen to the condition in `while condition:` for a well-behaved loop to terminate?",
    choices: [
      { id: "a", text: "The condition must eventually become False", correct: true },
      {
        id: "b",
        text: "The loop body must run a fixed number of times",
        correct: false,
        misconception: {
          id: "while-loop-confused-with-fixed-count",
          description: "A while loop has no built-in fixed count; it only stops once its condition evaluates to False, however many iterations that takes.",
          blameConceptId: "python-while-loops",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 0.8,
    expectedSeconds: 10,
    prereqClosure: ["python-while-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-while-loops--apply-decrement-trace",
    conceptId: "python-while-loops",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`n = 5\\nwhile n > 0:\\n    n -= 2\\nprint(n)`\\nWhat gets printed?",
    rubric: {
      elements: [
        {
          id: "correct-output",
          description: "States -1 — n goes 5, 3, 1, -1, and the loop checks n > 0 before each iteration; -1 is not > 0 so the loop stops.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-while-loops--apply-accumulate-total",
    conceptId: "python-while-loops",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`total = 0\\ni = 1\\nwhile i <= 3:\\n    total += i\\n    i += 1`\\nWhat is `total` after the loop?",
    choices: [
      { id: "a", text: "6", correct: true },
      {
        id: "b",
        text: "3",
        correct: false,
        misconception: {
          id: "assumes-only-final-value-added",
          description: "`total` accumulates across every iteration (1 + 2 + 3), not just the final value of `i`.",
          blameConceptId: "python-while-loops",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-while-loops--explain-unconditional-loop-risk",
    conceptId: "python-while-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why a `while` loop whose condition never actually changes based on anything in the body is a bug " +
      "waiting to happen, in terms of what the interpreter actually does.",
    rubric: {
      elements: [
        {
          id: "interpreter-just-rechecks-literally",
          description:
            "The interpreter has no way to know the programmer's intent — it simply re-checks the literal condition every pass, so if nothing in the body can ever make it False (or trigger a break), the loop runs forever exactly as written.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-while-loops--explain-manual-counter-vs-range",
    conceptId: "python-while-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Compare a `while` loop with a counter you increment manually to a `for i in range(n):` loop that does " +
      "the same number of iterations. What class of bug is possible with the first but not the second?",
    rubric: {
      elements: [
        {
          id: "manual-increment-bug",
          description: "Forgetting to increment the counter (or incrementing it in the wrong place or branch) causes an infinite loop or a wrong iteration count with the manual while-loop version.",
          weight: 4,
          required: true,
        },
        {
          id: "range-guarantees-count",
          description: "`range(n)` guarantees exactly n iterations by construction, since Python itself advances the implicit counter — there is no manual increment step to forget.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-while-loops--transfer-validate-input-structure",
    conceptId: "python-while-loops",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "You are validating user input: keep asking until the user types a number between 1 and 10. Sketch the " +
      "while-loop structure (in words, not code) and identify what plays the role of the loop's condition.",
    rubric: {
      elements: [
        {
          id: "structure",
          description: "Structure: read input, then loop while the input is not yet a valid number in [1, 10], re-prompting and re-reading inside the loop body each time.",
          weight: 4,
          required: true,
        },
        {
          id: "condition-role",
          description: "The condition is a validity check on the most recently read input, which is exactly why this needs while rather than a fixed-count for loop.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-while-loops--transfer-compound-interest-simulation",
    conceptId: "python-while-loops",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A `while` loop simulates a bank balance that grows by 5% interest each year until it exceeds $10,000, " +
      "starting from $1,000. Explain why this is naturally a while loop and not a for loop, and identify " +
      "precisely what changes each iteration versus what the loop condition checks.",
    rubric: {
      elements: [
        {
          id: "why-while",
          description: "It's a while loop because the number of years needed depends on the data (the growth rate and target), not a value known in advance the way range(n) requires.",
          weight: 4,
          required: true,
        },
        {
          id: "what-changes-vs-what-is-checked",
          description:
            "Each iteration multiplies the balance by 1.05; the condition re-checks whether the (updated) balance has yet exceeded 10,000, so the same variable updated in the body is what the condition tests.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },

  // --- for Loops and range -----------------------------------------------------
  {
    id: "python-for-loops--recall-iterable-requirement",
    conceptId: "python-for-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `for item in some_list:` require of `some_list`?",
    choices: [
      { id: "a", text: "That it be iterable — something Python can step through in order, one element at a time", correct: true },
      {
        id: "b",
        text: "That it be exactly a list, not any other collection",
        correct: false,
        misconception: {
          id: "for-loop-assumed-list-only",
          description: "`for` works on any iterable — tuples, strings, dicts, sets, generators — not only lists.",
          blameConceptId: "python-for-loops",
        },
      },
    ],
    difficulty: -1.9,
    discrimination: 0.8,
    expectedSeconds: 10,
    prereqClosure: ["python-for-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-for-loops--recall-range-vs-list-of-range",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the difference between `range(5)` and `list(range(5))`?",
    rubric: {
      elements: [
        {
          id: "difference",
          description: "`range(5)` is a lazy range object producing values 0-4 on demand without storing them all; `list(range(5))` eagerly builds an actual list `[0,1,2,3,4]` in memory.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -1.5,
    discrimination: 0.9,
    expectedSeconds: 30,
    prereqClosure: ["python-for-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-for-loops--apply-string-iteration",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`for letter in 'cat':\\n    print(letter)`\\nWhat gets printed, in order?",
    rubric: {
      elements: [{ id: "correct", description: "States c, a, t — a for loop iterates a string one character at a time.", weight: 3, required: true }],
    },
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-for-loops--apply-sum-list",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`total = 0\\nfor n in [3, 6, 9]:\\n    total += n\\nprint(total)`\\nWhat gets printed?",
    rubric: {
      elements: [{ id: "correct", description: "States 18 — 3 + 6 + 9.", weight: 3, required: true }],
    },
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-for-loops--explain-enumerate-vs-index-loop",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why `for i in range(len(some_list)):` combined with `some_list[i]` is functionally equivalent to " +
      "`for item in some_list:`, and name the built-in that lets you get both the index and the item together " +
      "without either awkward form.",
    rubric: {
      elements: [
        {
          id: "equivalence",
          description: "Both visit every element of the list in the same order — one by looking up each index, the other by iterating the elements directly — processing identical data.",
          weight: 3,
          required: true,
        },
        {
          id: "enumerate",
          description: "Names `enumerate(some_list)`, which yields (index, item) pairs directly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-for-loops--explain-mutating-while-iterating",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why modifying a list's length while iterating over it with a `for` loop (e.g. removing an " +
      "element inside the loop body) is a common source of bugs, in terms of how the iteration keeps track of " +
      "position.",
    rubric: {
      elements: [
        {
          id: "shifting-positions-skip-elements",
          description:
            "Python's iteration walks the list by position under the hood, so removing an element shifts every later element one position earlier — the next iteration then skips over whichever element slid into the position just vacated, silently missing elements.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-for-loops--transfer-zip-two-sequences",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "You need to process two lists of equal length in lockstep — say, names and their corresponding scores — " +
      "printing each name with its score. Explain why a plain `for name in names:` loop alone cannot do this, " +
      "and name the built-in that solves it cleanly.",
    rubric: {
      elements: [
        {
          id: "plain-loop-loses-pairing",
          description: "A loop over just names gives access to each name but has no way to also reach the corresponding score without separately tracking a position.",
          weight: 4,
          required: true,
        },
        {
          id: "zip",
          description: "Names `zip(names, scores)`, which pairs up corresponding elements from both sequences so a single loop over the pairs visits matched pairs directly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-for-loops--transfer-nested-loop-quadratic-cost",
    conceptId: "python-for-loops",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A nested loop `for i in range(n): for j in range(n): ...` runs the inner body n² times. Explain why " +
      "simply replacing the outer `range(n)` with a smaller range does not, by itself, generally fix a " +
      "performance problem caused by this quadratic structure, and describe what actually would.",
    rubric: {
      elements: [
        {
          id: "shrinking-one-range-does-not-fix-structure",
          description:
            "Shrinking one range only reduces the count linearly, while the structure remains quadratic in whatever dimension is not touched — for the same n it does not change the fundamental n² relationship, only shifts where on that curve the runtime falls.",
          weight: 4,
          required: true,
        },
        {
          id: "actual-fix",
          description: "An actual fix changes the algorithm's structure — e.g. replacing the inner linear scan with a lookup in a set or dictionary built once beforehand, turning O(n²) into O(n) with O(1) lookups.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
];
