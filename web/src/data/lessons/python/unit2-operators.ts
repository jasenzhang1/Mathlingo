import type { Lesson } from "../types";

const UNIT = "py-u2-operators";

export const unit2Lessons: Lesson[] = [
  {
    id: "py-arithmetic",
    unitId: UNIT,
    order: 1,
    title: "Arithmetic Operators",
    summary: "Add, subtract, multiply, divide — and two operators unique to Python.",
    explanation: [
      "Python supports the arithmetic operators you'd expect: `+` (add), `-` (subtract), `*` (multiply), and `/` (divide, always returning a float, as covered earlier).",
      "Two operators are less familiar if you're new to programming. `//` is floor division: it divides and then rounds *down* to the nearest whole number, discarding any remainder. `7 // 2` is `3`, and `-7 // 2` is `-4` (rounding down, not toward zero).",
      "`%` is the modulo operator: it returns the remainder left over from division. `7 % 2` is `1`, because 7 divided by 2 is 3 with 1 left over. Modulo is the standard way to check things like 'is this number even?' (`n % 2 == 0`).",
      "`**` is exponentiation: `2 ** 3` is `2` raised to the power of `3`, which is `8`. Python also respects the usual order of operations (parentheses, then `**`, then `*`/`/`/`//`/`%`, then `+`/`-`), left to right within a level.",
    ],
    codeExample: {
      code:
        "print(7 / 2)\nprint(7 // 2)\nprint(7 % 2)\nprint(2 ** 3)",
      output: "3.5\n3\n1\n8",
    },
    keyPoints: [
      "`//` divides and rounds down to a whole number (floor division).",
      "`%` gives the remainder after division — the classic tool for checking evenness.",
      "`**` is exponentiation, and normal order-of-operations rules apply.",
    ],
    practice: [
      {
        id: "py-arithmetic-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "print(17 // 5)\nprint(17 % 5)",
        answer: "3\n2",
        explanation: "17 divided by 5 is 3 with a remainder of 2, so floor division gives 3 and modulo gives 2.",
      },
      {
        id: "py-arithmetic-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "print(3 + 2 * 4)",
        answer: "11",
        explanation: "Multiplication happens before addition: `2 * 4 = 8`, then `3 + 8 = 11`.",
      },
      {
        id: "py-arithmetic-q3",
        type: "multiple-choice",
        prompt: "Which expression checks whether a number `n` is even?",
        choices: ["n // 2 == 0", "n % 2 == 0", "n ** 2 == 0", "n / 2 == 1"],
        answer: "n % 2 == 0",
        explanation:
          "A number is even exactly when dividing it by 2 leaves no remainder, which is what `n % 2 == 0` checks.",
      },
    ],
    xp: 15,
  },
  {
    id: "py-string-concat",
    unitId: UNIT,
    order: 2,
    title: "Combining and Repeating Strings",
    summary: "Use + and * to build strings out of other strings.",
    explanation: [
      "The `+` operator joins (concatenates) two strings into one: `\"Py\" + \"thon\"` produces `\"Python\"`. Note that `+` does not add a space — if you want one, you have to include it yourself: `\"Hello\" + \" \" + \"world\"`.",
      "`+` only works between strings and other strings — you can't concatenate a string and a number directly. `\"Score: \" + 10` raises a `TypeError`; you need `\"Score: \" + str(10)` to convert the number first.",
      "The `*` operator repeats a string a given number of times: `\"ab\" * 3` produces `\"ababab\"`. This is handy for building separators, like `\"-\" * 20` for a 20-character dashed line.",
      "Strings also support `+=`, a shorthand for 'take the current value and append to it': `message += \"!\"` is equivalent to `message = message + \"!\"`.",
    ],
    codeExample: {
      code:
        "first = \"Hello\"\nsecond = \"world\"\ngreeting = first + \", \" + second + \"!\"\nprint(greeting)\n\nprint(\"=\" * 10)",
      output: "Hello, world!\n==========",
    },
    keyPoints: [
      "`+` joins strings together — it doesn't add spaces automatically.",
      "Mixing a string and a number with `+` raises a `TypeError`; convert the number with `str()` first.",
      "`*` repeats a string a given number of times.",
    ],
    practice: [
      {
        id: "py-string-concat-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "word = \"ha\"\nprint(word * 3)",
        answer: "hahaha",
        explanation: "`*` repeats the string, so `\"ha\" * 3` produces `\"hahaha\"`.",
      },
      {
        id: "py-string-concat-q2",
        type: "multiple-choice",
        prompt: "What happens when you run `\"Total: \" + 5`?",
        choices: [
          "It prints 'Total: 5'",
          "It raises a TypeError",
          "It prints 'Total: ' with 5 ignored",
          "It prints '5'",
        ],
        answer: "It raises a TypeError",
        explanation:
          "`+` between a `str` and an `int` isn't allowed. You'd need `\"Total: \" + str(5)`.",
      },
    ],
    xp: 10,
  },
  {
    id: "py-fstrings",
    unitId: UNIT,
    order: 3,
    title: "String Formatting with f-strings",
    summary: "Embed variables and expressions directly inside a string.",
    explanation: [
      "Manually concatenating strings and numbers with `+` and `str()` gets clunky fast. Python's f-strings solve this: put an `f` right before the opening quote, and write `{expression}` anywhere inside the string to embed a value.",
      "`f\"Score: {score}\"` automatically converts `score` to text and inserts it — no `str()` call needed. Any valid expression works inside the braces, not just variable names: `f\"Total: {price * quantity}\"` computes the multiplication and inserts the result.",
      "You can format numbers inside an f-string using a colon followed by a format spec. `f\"{pi:.2f}\"` rounds `pi` to 2 decimal places. This is the standard way to control how many decimals a float displays.",
      "f-strings were introduced in Python 3.6 and are now the preferred way to build strings with embedded values — you may also see the older `.format()` method or `%` formatting in existing code, but f-strings are what to reach for in new code.",
    ],
    codeExample: {
      code:
        "name = \"Ada\"\nscore = 95\npi = 3.14159\n\nprint(f\"{name} scored {score} points\")\nprint(f\"Pi rounded: {pi:.2f}\")",
      output: "Ada scored 95 points\nPi rounded: 3.14",
    },
    keyPoints: [
      "An f-string is written `f\"...\"` and lets you embed `{expression}` directly in the text.",
      "Anything valid in Python can go inside the braces, including arithmetic.",
      "`{value:.2f}` formats a float to a fixed number of decimal places.",
    ],
    practice: [
      {
        id: "py-fstrings-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "item = \"pen\"\nprice = 2\nprint(f\"1 {item} costs ${price}\")",
        answer: "1 pen costs $2",
        explanation: "The f-string inserts the values of `item` and `price` directly into the text.",
      },
      {
        id: "py-fstrings-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "a = 4\nb = 3\nprint(f\"{a} times {b} is {a * b}\")",
        answer: "4 times 3 is 12",
        explanation: "`{a * b}` evaluates the expression `4 * 3` and inserts `12` into the string.",
      },
    ],
    xp: 15,
  },
  {
    id: "py-comparison",
    unitId: UNIT,
    order: 4,
    title: "Comparison Operators",
    summary: "Ask whether two values are equal, greater, or less than each other.",
    explanation: [
      "Comparison operators compare two values and always produce a boolean. `==` checks equality and `!=` checks inequality. Note the double equals sign: `=` assigns a value, while `==` compares two values — mixing them up is one of the most common beginner mistakes.",
      "The ordering operators `<`, `>`, `<=`, and `>=` work as expected on numbers: `5 < 10` is `True`. They also work on strings, comparing them alphabetically (technically, by character codes): `\"apple\" < \"banana\"` is `True`.",
      "Comparing values of very different types, like `5 == \"5\"`, doesn't raise an error — it simply evaluates to `False`, because an `int` and a `str` are never considered equal even if they 'look the same.'",
      "Comparisons can be chained in Python in a way that reads naturally: `0 < x < 10` checks that `x` is between 0 and 10, equivalent to `0 < x and x < 10`.",
    ],
    codeExample: {
      code:
        "print(5 == 5)\nprint(5 != 3)\nprint(5 == \"5\")\nprint(3 < 7 <= 7)",
      output: "True\nTrue\nFalse\nTrue",
    },
    keyPoints: [
      "`==` compares values; `=` assigns a value — never confuse the two.",
      "Comparing values of different types (like int vs str) is valid and simply returns `False`.",
      "Comparisons can be chained: `0 < x < 10`.",
    ],
    practice: [
      {
        id: "py-comparison-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "print(10 != 10)",
        answer: "False",
        explanation: "10 does equal 10, so `!=` (not equal) evaluates to `False`.",
      },
      {
        id: "py-comparison-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "print(\"apple\" < \"banana\")",
        answer: "True",
        explanation: "Strings compare alphabetically, and \"apple\" comes before \"banana\".",
      },
      {
        id: "py-comparison-q3",
        type: "true-false",
        prompt: "`7 == \"7\"` evaluates to `True`.",
        choices: ["True", "False"],
        answer: "False",
        explanation:
          "An `int` and a `str` are never equal in Python, regardless of how they look, so this is `False`.",
      },
    ],
    xp: 15,
  },
  {
    id: "py-boolean-ops",
    unitId: UNIT,
    order: 5,
    title: "Boolean Operators: and, or, not",
    summary: "Combine multiple true/false conditions into one.",
    explanation: [
      "Boolean operators combine or invert boolean values. `and` returns `True` only if both sides are `True`. `or` returns `True` if at least one side is `True`. `not` flips a single boolean: `not True` is `False`.",
      "These are typically used to combine comparisons: `age >= 18 and has_id` is `True` only when both conditions hold — useful for expressing 'both of these must be true.'",
      "Python evaluates `and`/`or` with short-circuiting: in `a and b`, if `a` is already `False`, Python never even evaluates `b`, since the result must be `False` regardless. Similarly, `a or b` skips evaluating `b` if `a` is already `True`. This matters when `b` is an expensive check or has side effects.",
      "Watch operator precedence: `not` binds tighter than `and`, which binds tighter than `or`. When conditions get complex, use parentheses to make the intended grouping explicit rather than relying on memorized precedence rules.",
    ],
    codeExample: {
      code:
        "age = 20\nhas_id = True\n\nprint(age >= 18 and has_id)\nprint(age < 18 or has_id)\nprint(not has_id)",
      output: "True\nTrue\nFalse",
    },
    keyPoints: [
      "`and` needs both sides true; `or` needs at least one; `not` flips a boolean.",
      "Python short-circuits: it skips evaluating the right side when the result is already determined.",
      "Use parentheses to make grouping explicit in complex conditions.",
    ],
    practice: [
      {
        id: "py-boolean-ops-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "print(True and False)\nprint(True or False)",
        answer: "False\nTrue",
        explanation: "`and` requires both to be true (fails here), `or` only needs one (succeeds here).",
      },
      {
        id: "py-boolean-ops-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "temp = 15\nprint(temp > 10 and temp < 30)",
        answer: "True",
        explanation: "15 is greater than 10 and less than 30, so both sides are `True`, making the `and` result `True`.",
      },
    ],
    xp: 15,
  },
];
