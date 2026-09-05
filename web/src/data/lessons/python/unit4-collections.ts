import type { Lesson } from "../types";

const UNIT = "py-u4-collections";

export const unit4Lessons: Lesson[] = [
  {
    id: "py-tuples",
    unitId: UNIT,
    order: 1,
    title: "Tuples: Immutable Sequences",
    summary: "Like a list, but locked once created.",
    explanation: [
      "A tuple is an ordered collection, written with parentheses instead of square brackets: `point = (3, 4)`. Like lists, tuples support indexing and slicing exactly the same way — `point[0]` is `3`.",
      "The key difference is that tuples are immutable: once created, you can't change, add, or remove items. `point[0] = 5` raises a `TypeError`. This isn't a limitation so much as a signal — a tuple communicates 'this data shouldn't change.'",
      "A common use is representing a fixed, related group of values, like coordinates `(x, y)` or a database record `(\"Ada\", 36, \"Engineer\")`. Because the structure is fixed, tuples are often unpacked directly into named variables: `name, age, job = (\"Ada\", 36, \"Engineer\")`.",
      "A one-item tuple needs a trailing comma to be recognized as a tuple: `(5,)` is a tuple, but `(5)` is just the number 5 in parentheses. This is a common gotcha worth remembering.",
    ],
    codeExample: {
      code:
        "point = (3, 4)\nprint(point[0], point[1])\n\nname, age = (\"Ada\", 36)\nprint(name, age)",
      output: "3 4\nAda 36",
    },
    keyPoints: [
      "Tuples use parentheses and support indexing/slicing like lists.",
      "Tuples are immutable — they can't be changed after creation.",
      "A single-item tuple needs a trailing comma: `(5,)`.",
    ],
    practice: [
      {
        id: "py-tuples-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "coords = (10, 20, 30)\nprint(coords[1])",
        answer: "20",
        explanation: "Tuples are indexed the same way as lists — index 1 is the second item, 20.",
      },
      {
        id: "py-tuples-q2",
        type: "multiple-choice",
        prompt: "What happens when you run `coords = (1, 2); coords[0] = 5`?",
        choices: [
          "coords becomes (5, 2)",
          "It raises a TypeError",
          "It raises an IndexError",
          "Nothing happens",
        ],
        answer: "It raises a TypeError",
        explanation: "Tuples are immutable, so trying to assign to an index raises a `TypeError`.",
      },
    ],
    xp: 15,
  },
  {
    id: "py-dictionaries",
    unitId: UNIT,
    order: 2,
    title: "Dictionaries: Key-Value Pairs",
    summary: "Look values up by name instead of by position.",
    explanation: [
      "A dictionary (`dict`) stores data as key-value pairs instead of a plain ordered sequence. You create one with curly braces: `person = {\"name\": \"Ada\", \"age\": 36}`. Each key maps to a value, and keys must be unique.",
      "You access a value by its key, not by position: `person[\"name\"]` returns `\"Ada\"`. Looking up a key that doesn't exist raises a `KeyError` — to avoid that, `.get(\"name\")` returns `None` (or a default you specify) instead of erroring.",
      "Dictionaries are mutable: `person[\"age\"] = 37` updates an existing key, and `person[\"job\"] = \"Engineer\"` adds a new key-value pair if `\"job\"` wasn't there before. `del person[\"age\"]` removes a key entirely.",
      "`.keys()`, `.values()`, and `.items()` give you the dictionary's keys, values, or key-value pairs respectively — most often used to loop over a dictionary's contents (loops are covered in a later lesson).",
    ],
    codeExample: {
      code:
        "person = {\"name\": \"Ada\", \"age\": 36}\nprint(person[\"name\"])\n\nperson[\"age\"] = 37\nperson[\"job\"] = \"Engineer\"\nprint(person)\n\nprint(person.get(\"email\"))",
      output: "Ada\n{'name': 'Ada', 'age': 37, 'job': 'Engineer'}\nNone",
    },
    keyPoints: [
      "A dict maps unique keys to values: `{\"key\": value}`.",
      "`dict[key]` raises `KeyError` if missing; `.get(key)` returns `None` instead.",
      "Dictionaries are mutable — assign to a key to add or update it.",
    ],
    practice: [
      {
        id: "py-dictionaries-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "scores = {\"Ada\": 90, \"Grace\": 85}\nprint(scores[\"Grace\"])",
        answer: "85",
        explanation: "Looking up the key \"Grace\" returns its associated value, 85.",
      },
      {
        id: "py-dictionaries-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "scores = {\"Ada\": 90}\nprint(scores.get(\"Grace\"))",
        answer: "None",
        explanation: "\"Grace\" isn't a key in the dictionary, and `.get()` returns `None` instead of raising an error.",
      },
      {
        id: "py-dictionaries-q3",
        type: "multiple-choice",
        prompt: "What happens when you run `scores[\"Grace\"]` if `\"Grace\"` isn't a key?",
        choices: ["Returns None", "Returns 0", "Raises a KeyError", "Adds Grace automatically"],
        answer: "Raises a KeyError",
        explanation:
          "Direct bracket access requires the key to exist; a missing key raises a `KeyError`, unlike `.get()`.",
      },
    ],
    xp: 15,
  },
  {
    id: "py-sets",
    unitId: UNIT,
    order: 3,
    title: "Sets: Unique Collections",
    summary: "An unordered collection that automatically drops duplicates.",
    explanation: [
      "A set is a collection of unique values with no guaranteed order, written with curly braces (like a dict, but without keys): `nums = {1, 2, 3}`. Adding a duplicate value has no effect, since duplicates aren't allowed.",
      "Sets are especially useful for removing duplicates from a list: `unique = set([1, 2, 2, 3, 3, 3])` produces `{1, 2, 3}`. Convert back to a list with `list(unique)` if order or indexing matters afterward.",
      "Because sets are unordered, you can't index into one (`my_set[0]` doesn't work). What sets excel at is fast membership checks (`item in my_set`) and set algebra: `a | b` (union), `a & b` (intersection), and `a - b` (difference).",
      "`.add(item)` adds a single item, and `.remove(item)` removes one, raising a `KeyError` if it isn't present (`.discard(item)` removes without erroring if missing). An empty `{}` creates a dict, not a set — use `set()` to create an empty set.",
    ],
    codeExample: {
      code:
        "nums = {1, 2, 2, 3, 3, 3}\nprint(nums)\n\na = {1, 2, 3}\nb = {2, 3, 4}\nprint(a | b)\nprint(a & b)",
      output: "{1, 2, 3}\n{1, 2, 3, 4}\n{2, 3}",
    },
    keyPoints: [
      "A set holds only unique values and has no fixed order — no indexing.",
      "`set(some_list)` is a quick way to remove duplicates.",
      "`|` is union, `&` is intersection, `-` is difference.",
    ],
    practice: [
      {
        id: "py-sets-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "letters = set([\"a\", \"b\", \"a\", \"c\", \"b\"])\nprint(len(letters))",
        answer: "3",
        explanation: "The set drops duplicates, leaving {\"a\", \"b\", \"c\"} — three unique items.",
      },
      {
        id: "py-sets-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "a = {1, 2, 3}\nb = {3, 4, 5}\nprint(a - b)",
        answer: "{1, 2}",
        explanation: "Set difference `a - b` keeps items in `a` that are not also in `b`: 1 and 2.",
      },
    ],
    xp: 15,
  },
  {
    id: "py-choosing-structure",
    unitId: UNIT,
    order: 4,
    title: "Choosing the Right Data Structure",
    summary: "List, tuple, dict, or set — how to decide.",
    explanation: [
      "With four collection types now in hand, the practical question is which one to reach for. Start with what your data actually needs: order, uniqueness, lookups by key, and whether it should be changeable.",
      "Use a **list** when you have an ordered collection that may change over time — a shopping cart, a queue of tasks, scores as they come in. It's the default choice for 'a bunch of things.'",
      "Use a **tuple** when you have a fixed, ordered group of values that shouldn't change, especially when the position of each item has a specific meaning, like `(latitude, longitude)` or a row of fixed fields returned from a function.",
      "Use a **dict** when you need to look values up by a meaningful name instead of a position — a user's profile fields, a word-to-definition mapping, counts keyed by category. Use a **set** when all you care about is which unique items are present and you need fast membership checks or set operations like union and intersection, and you don't care about order.",
    ],
    codeExample: {
      code:
        "# List: ordered, changeable\ncart = [\"apple\", \"bread\"]\n\n# Tuple: fixed, position has meaning\nlocation = (34.05, -118.24)\n\n# Dict: look up by name\nuser = {\"name\": \"Ada\", \"age\": 36}\n\n# Set: unique items, fast membership checks\ntags = {\"python\", \"beginner\"}\nprint(\"python\" in tags)",
      output: "True",
    },
    keyPoints: [
      "List: ordered and changeable — the general-purpose default.",
      "Tuple: ordered and fixed — for values that shouldn't change or have positional meaning.",
      "Dict: lookup by key; Set: unique items with fast membership checks, no order.",
    ],
    practice: [
      {
        id: "py-choosing-structure-q1",
        type: "multiple-choice",
        prompt: "You need to store a user's profile (name, age, email) and look up fields by name. What's the best fit?",
        choices: ["list", "tuple", "dict", "set"],
        answer: "dict",
        explanation:
          "A dict lets you look up `profile[\"email\"]` by meaningful key name, which fits a profile far better than a position-based structure.",
      },
      {
        id: "py-choosing-structure-q2",
        type: "multiple-choice",
        prompt: "You want to track which usernames have already registered, and quickly check if a new one is taken. What's the best fit?",
        choices: ["list", "tuple", "dict", "set"],
        answer: "set",
        explanation:
          "Membership checks (`username in usernames`) are what sets are optimized for, and duplicates aren't meaningful here anyway.",
      },
      {
        id: "py-choosing-structure-q3",
        type: "multiple-choice",
        prompt: "You want to store a fixed (x, y) coordinate that should never change. What's the best fit?",
        choices: ["list", "tuple", "dict", "set"],
        answer: "tuple",
        explanation:
          "The values are fixed, ordered, and positional — exactly what a tuple is for.",
      },
    ],
    xp: 15,
  },
];
