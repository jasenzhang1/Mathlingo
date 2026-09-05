import type { Lesson } from "../types";

const UNIT = "py-u1-variables-types";

export const unit1Lessons: Lesson[] = [
  {
    id: "py-variables",
    unitId: UNIT,
    order: 1,
    title: "What Is a Variable?",
    summary: "Give a value a name so you can use it later.",
    explanation: [
      "A variable is a name that points to a value stored in memory. In Python you create one just by assigning a value to a name with `=` — there's no separate declaration step like in some other languages.",
      "The name goes on the left, the value goes on the right: `age = 25` creates a variable called `age` that points to the number 25. From then on, writing `age` anywhere in your code is the same as writing `25`.",
      "Variable names can contain letters, digits, and underscores, but can't start with a digit, and are case-sensitive (`age` and `Age` are different names). Python convention is `snake_case` — lowercase words separated by underscores, like `first_name`.",
      "A variable can be reassigned at any time, and the new value doesn't need to be the same type as the old one — Python figures out the type from the value itself, not from the variable name.",
    ],
    codeExample: {
      code:
        "age = 25\nprint(age)\n\nage = 26\nprint(age)\n\nfirst_name = \"Ada\"\nprint(first_name)",
      output: "25\n26\nAda",
    },
    keyPoints: [
      "`name = value` creates or updates a variable — no declaration keyword needed.",
      "Names are case-sensitive and conventionally written in snake_case.",
      "Reassigning a variable can change both its value and its type.",
    ],
    practice: [
      {
        id: "py-variables-q1",
        type: "predict-output",
        prompt: "What does this code print?",
        code: "score = 10\nscore = score + 5\nprint(score)",
        answer: "15",
        explanation:
          "`score = score + 5` reads the current value of `score` (10), adds 5, and stores the result (15) back into `score`.",
      },
      {
        id: "py-variables-q2",
        type: "multiple-choice",
        prompt: "Which of these is a valid Python variable name?",
        choices: ["2nd_place", "total_score", "total-score", "class"],
        answer: "total_score",
        explanation:
          "Names can't start with a digit (`2nd_place`) or contain hyphens (`total-score`), and `class` is a reserved keyword. `total_score` follows the rules.",
      },
      {
        id: "py-variables-q3",
        type: "true-false",
        prompt: "In Python, a variable's type is fixed forever once it's created.",
        choices: ["True", "False"],
        answer: "False",
        explanation:
          "A variable can be reassigned to a value of a completely different type — Python has no fixed type per variable name.",
      },
    ],
    xp: 10,
  },
  {
    id: "py-int-float",
    unitId: UNIT,
    order: 2,
    title: "Numbers: int and float",
    summary: "Python's two core numeric types, and how they behave differently.",
    explanation: [
      "Python has two main numeric types: `int` for whole numbers (like `7` or `-3`) and `float` for numbers with a decimal point (like `3.14` or `-0.5`), including numbers written in scientific notation like `2e3`.",
      "Whether a number is an int or a float is decided by how you write it — `4` is an int, `4.0` is a float, even though they represent the same value mathematically.",
      "Mixing the two types in an arithmetic expression automatically produces a float: `4 + 1.0` gives `5.0`, not `5`. This is Python 'promoting' the result to the more general type.",
      "One operator always returns a float regardless of its inputs: division with `/`. So `10 / 2` is `5.0`, not `5`. Floor division with `//` and the modulo operator `%` behave differently and are covered later with arithmetic operators.",
    ],
    codeExample: {
      code:
        "whole = 7\ndecimal = 3.5\ncombined = whole + decimal\n\nprint(whole, decimal, combined)\nprint(10 / 2)",
      output: "7 3.5 10.5\n5.0",
    },
    keyPoints: [
      "`int` is for whole numbers, `float` is for numbers with a decimal point.",
      "An expression mixing int and float always produces a float.",
      "`/` (true division) always returns a float, even when the result is a whole number.",
    ],
    practice: [
      {
        id: "py-int-float-q1",
        type: "multiple-choice",
        prompt: "What type is the result of `9 / 3`?",
        choices: ["int", "float", "str", "It errors"],
        answer: "float",
        explanation:
          "The `/` operator always returns a float in Python 3, so `9 / 3` is `3.0`, not `3`.",
      },
      {
        id: "py-int-float-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "x = 2\ny = 0.5\nprint(x + y)",
        answer: "2.5",
        explanation: "Adding an int and a float promotes the result to a float: `2 + 0.5 = 2.5`.",
      },
    ],
    xp: 10,
  },
  {
    id: "py-strings",
    unitId: UNIT,
    order: 3,
    title: "Strings: Working with Text",
    summary: "The `str` type, for representing and storing text.",
    explanation: [
      "A string (`str`) is a sequence of characters used to represent text. You create one by wrapping characters in either single quotes (`'hello'`) or double quotes (`\"hello\"`) — Python treats them identically, so pick one style and stay consistent.",
      "Quoting with the other style lets you include a quote character in the text without extra work: `\"it's fine\"` avoids needing to escape the apostrophe. You can also escape a quote with a backslash, like `'it\\'s fine'`.",
      "Strings can be joined with `+` and repeated with `*` — both are covered in more depth in a later lesson. For multi-line text, triple quotes (`'''...'''` or `\"\"\"...\"\"\"`) let the string span several lines.",
      "The `len()` function returns how many characters are in a string, counting spaces and punctuation: `len(\"hi!\")` is `3`.",
    ],
    codeExample: {
      code:
        "greeting = \"Hello, world!\"\nname = 'Ada'\n\nprint(greeting)\nprint(len(greeting))",
      output: "Hello, world!\n13",
    },
    keyPoints: [
      "Strings are text, wrapped in single or double quotes — Python treats both the same.",
      "Use the other quote style (or a backslash) to include a quote character inside the string.",
      "`len(some_string)` counts the characters in it.",
    ],
    practice: [
      {
        id: "py-strings-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "message = \"I love Python\"\nprint(len(message))",
        answer: "13",
        explanation:
          "\"I love Python\" has 13 characters total, including the two spaces.",
      },
      {
        id: "py-strings-q2",
        type: "multiple-choice",
        prompt: "Which line correctly stores the text `don't stop`?",
        choices: [
          "x = 'don't stop'",
          "x = \"don't stop\"",
          "x = don't stop",
          "x = (don't stop)",
        ],
        answer: "x = \"don't stop\"",
        explanation:
          "Using double quotes around the string lets the apostrophe in \"don't\" appear without being escaped.",
      },
    ],
    xp: 10,
  },
  {
    id: "py-booleans",
    unitId: UNIT,
    order: 4,
    title: "Booleans: True and False",
    summary: "The `bool` type, used for yes/no, on/off, true/false values.",
    explanation: [
      "A boolean (`bool`) has exactly two possible values: `True` or `False` — capitalized, and without quotes (they're not strings). Booleans represent logical states: is this switched on? Did that check pass?",
      "Booleans are usually produced by comparisons rather than typed directly. Writing `5 > 3` doesn't print anything by itself, but it evaluates to `True`, and that result can be stored in a variable: `is_bigger = 5 > 3`.",
      "Under the hood, `bool` is actually a subtype of `int`: `True` behaves like `1` and `False` behaves like `0` in arithmetic. So `True + True` evaluates to `2`. This is a quirk worth knowing, not something you'll rely on often.",
      "Booleans control the flow of a program — they're what `if` statements and `while` loops check to decide what to do next, which you'll see in later lessons.",
    ],
    codeExample: {
      code:
        "is_raining = True\nis_sunny = False\n\nprint(is_raining)\nprint(5 > 3)\nprint(True + True)",
      output: "True\nTrue\n2",
    },
    keyPoints: [
      "`bool` has only two values: `True` and `False` (capitalized, no quotes).",
      "Comparisons like `5 > 3` produce booleans.",
      "`True` and `False` behave like `1` and `0` in arithmetic.",
    ],
    practice: [
      {
        id: "py-booleans-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "result = 10 == 10\nprint(result)",
        answer: "True",
        explanation: "`==` checks equality; since 10 equals 10, the expression evaluates to `True`.",
      },
      {
        id: "py-booleans-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "print(False + 3)",
        answer: "3",
        explanation: "`False` behaves like `0` in arithmetic, so `False + 3` is `0 + 3 = 3`.",
      },
    ],
    xp: 10,
  },
  {
    id: "py-type-function",
    unitId: UNIT,
    order: 5,
    title: "Checking Types with type()",
    summary: "Ask Python what kind of value a variable holds.",
    explanation: [
      "Since Python doesn't require you to declare a variable's type up front, it's often useful to ask what type a value actually is. The built-in `type()` function does exactly that: `type(5)` returns `<class 'int'>`.",
      "This is especially useful while learning, or while debugging: if code isn't behaving as expected, printing `type(some_variable)` quickly confirms whether you're working with the type you think you are.",
      "`type()` works on any value or variable: `type(\"hi\")` is `<class 'str'>`, `type(3.0)` is `<class 'float'>`, and `type(True)` is `<class 'bool'>`.",
      "You can compare a type directly using `==`, like `type(x) == int`, though the more idiomatic way to check types in real code uses `isinstance()` — a function you'll encounter later on.",
    ],
    codeExample: {
      code: "x = 5\ny = 5.0\nz = \"5\"\n\nprint(type(x))\nprint(type(y))\nprint(type(z))",
      output: "<class 'int'>\n<class 'float'>\n<class 'str'>",
    },
    keyPoints: [
      "`type(value)` tells you exactly what type a value is.",
      "It's the fastest way to debug 'why isn't this working' type confusion.",
      "Numbers, strings, and booleans all report distinct types even when they look similar.",
    ],
    practice: [
      {
        id: "py-type-function-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "value = 3.0\nprint(type(value))",
        answer: "<class 'float'>",
        explanation: "`3.0` has a decimal point, so Python stores it as a float.",
      },
      {
        id: "py-type-function-q2",
        type: "multiple-choice",
        prompt: "What is `type(\"42\")`?",
        choices: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'bool'>"],
        answer: "<class 'str'>",
        explanation:
          "Because `\"42\"` is wrapped in quotes, it's text, not a number — its type is `str` even though it looks like a number.",
      },
    ],
    xp: 10,
  },
  {
    id: "py-type-conversion",
    unitId: UNIT,
    order: 6,
    title: "Converting Between Types",
    summary: "Turn an int into a string, a string into a float, and so on.",
    explanation: [
      "Python lets you convert a value from one type to another using built-in functions named after the target type: `int()`, `float()`, `str()`, and `bool()`.",
      "`int(\"42\")` converts the string `\"42\"` into the number `42`. `float(\"3.5\")` converts text into a float. `str(42)` goes the other way, turning the number `42` into the text `\"42\"` — useful when you want to join a number into a message with `+`.",
      "Conversion isn't always possible: `int(\"hello\")` raises a `ValueError` because `\"hello\"` isn't a valid whole number. Converting a float to an int, like `int(3.9)`, truncates the decimal part rather than rounding — the result is `3`, not `4`.",
      "`bool()` follows a simple rule: `0`, `0.0`, `\"\"` (empty string), and a few other 'empty' values convert to `False`; virtually everything else converts to `True`. So `bool(\"0\")` is actually `True`, because a non-empty string is truthy even if its text looks like zero.",
    ],
    codeExample: {
      code:
        "age_text = \"25\"\nage_number = int(age_text)\nprint(age_number + 1)\n\nprint(str(100) + \" points\")\nprint(int(3.9))",
      output: "26\n100 points\n3",
    },
    keyPoints: [
      "`int()`, `float()`, `str()`, and `bool()` convert a value to that type.",
      "Converting text that isn't a valid number raises a `ValueError`.",
      "Converting a float to an int truncates it — it does not round.",
    ],
    practice: [
      {
        id: "py-type-conversion-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "price = \"19\"\ntotal = int(price) * 2\nprint(total)",
        answer: "38",
        explanation: "`int(\"19\")` converts the string to the number 19, and `19 * 2` is 38.",
      },
      {
        id: "py-type-conversion-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "print(int(7.8))",
        answer: "7",
        explanation: "`int()` on a float truncates toward zero rather than rounding, so 7.8 becomes 7.",
      },
      {
        id: "py-type-conversion-q3",
        type: "multiple-choice",
        prompt: "What happens when you run `int(\"twelve\")`?",
        choices: [
          "It returns 12",
          "It returns 0",
          "It raises a ValueError",
          "It returns the string unchanged",
        ],
        answer: "It raises a ValueError",
        explanation:
          "`int()` can only convert text that looks like a valid whole number. \"twelve\" is a word, not digits, so Python raises a `ValueError`.",
      },
    ],
    xp: 15,
  },
  {
    id: "py-none",
    unitId: UNIT,
    order: 7,
    title: "None: The Absence of a Value",
    summary: "Python's way of representing 'nothing here.'",
    explanation: [
      "`None` is a special built-in value that represents the absence of a value — not zero, not an empty string, but literally 'nothing was set here.' It has its own type, `NoneType`.",
      "You'll see `None` show up as the default result of things that don't explicitly produce a value. For example, a function that has no `return` statement returns `None` automatically (functions are covered in a later lesson).",
      "`None` is often used as a placeholder for a variable that will get a real value later: `result = None` before a loop that might or might not find something, so you can check afterward whether it was ever set.",
      "To check whether something is `None`, use `is None` rather than `== None` — this is the idiomatic way and avoids subtle bugs, though both usually work the same in practice.",
    ],
    codeExample: {
      code:
        "found_user = None\nprint(found_user)\nprint(type(found_user))\n\nprint(found_user is None)",
      output: "None\n<class 'NoneType'>\nTrue",
    },
    keyPoints: [
      "`None` means 'no value,' distinct from `0`, `\"\"`, or `False`.",
      "Its type is `NoneType`, and it's the default return value of functions with no `return`.",
      "Check for it with `is None`, not `== None`.",
    ],
    practice: [
      {
        id: "py-none-q1",
        type: "true-false",
        prompt: "`None` is the same as the number `0`.",
        choices: ["True", "False"],
        answer: "False",
        explanation:
          "`None` represents the absence of a value entirely — it's a different type from `int` and isn't equal to `0`.",
      },
      {
        id: "py-none-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "answer = None\nprint(answer is None)",
        answer: "True",
        explanation: "`answer` was set to `None`, so `answer is None` evaluates to `True`.",
      },
    ],
    xp: 10,
  },
];
