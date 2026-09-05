import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * `code`-format items: the learner writes actual Python, and the grader runs
 * it against `codeTests` in a sandboxed interpreter (Pyodide in the browser,
 * a real CPython subprocess in `tools/verifyTemplates.ts` at authoring time)
 * rather than judging free text or matching a multiple-choice key.
 *
 * Each item carries a `referenceSolution` — never shipped to the client —
 * that `verify:items` runs against the item's own `codeTests` to confirm they
 * are actually satisfiable before the item ever reaches `status: "live"`.
 * These sit alongside the multiple-choice/short-answer pools for their
 * concept rather than replacing them: writing code is a different skill from
 * recognizing the right answer, worth its own item type, not a substitute.
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-python",
  tier: "generated",
  title: "Mathlingo authored item (Python sweep)",
};

export const pythonCodeExerciseItems: Item[] = [
  {
    id: "python-conditionals--code-classify-sign",
    conceptId: "python-conditionals",
    format: "code",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Write a function classify_sign(n) that returns the string \"negative\" if n < 0, " +
      "\"zero\" if n == 0, and \"positive\" if n > 0.",
    starterCode: "def classify_sign(n):\n    pass\n",
    referenceSolution:
      "def classify_sign(n):\n    if n < 0:\n        return \"negative\"\n    elif n == 0:\n        return \"zero\"\n    else:\n        return \"positive\"\n",
    codeTests: [
      { id: "negative", description: "classify_sign(-5) == \"negative\"", run: "result = classify_sign(-5)", check: "result == \"negative\"" },
      { id: "zero", description: "classify_sign(0) == \"zero\"", run: "result = classify_sign(0)", check: "result == \"zero\"" },
      { id: "positive", description: "classify_sign(7) == \"positive\"", run: "result = classify_sign(7)", check: "result == \"positive\"" },
      { id: "small-negative", description: "classify_sign(-1) == \"negative\"", run: "result = classify_sign(-1)", check: "result == \"negative\"" },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["python-conditionals"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-while-loops--code-count-digits",
    conceptId: "python-while-loops",
    format: "code",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Write a function count_digits(n) that returns how many digits are in the non-negative " +
      "integer n, using a while loop (not str(n)). count_digits(0) should return 1.",
    starterCode: "def count_digits(n):\n    pass\n",
    referenceSolution:
      "def count_digits(n):\n    if n == 0:\n        return 1\n    count = 0\n    while n > 0:\n        n //= 10\n        count += 1\n    return count\n",
    codeTests: [
      { id: "zero", description: "count_digits(0) == 1", run: "result = count_digits(0)", check: "result == 1" },
      { id: "single", description: "count_digits(7) == 1", run: "result = count_digits(7)", check: "result == 1" },
      { id: "three-digit", description: "count_digits(482) == 3", run: "result = count_digits(482)", check: "result == 3" },
      { id: "large", description: "count_digits(1000000) == 7", run: "result = count_digits(1000000)", check: "result == 7" },
    ],
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["python-while-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-for-loops--code-sum-of-squares",
    conceptId: "python-for-loops",
    format: "code",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Write a function sum_of_squares(n) that returns 1² + 2² + ... + n², using a for loop over " +
      "range(). sum_of_squares(0) should return 0.",
    starterCode: "def sum_of_squares(n):\n    pass\n",
    referenceSolution:
      "def sum_of_squares(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i * i\n    return total\n",
    codeTests: [
      { id: "zero", description: "sum_of_squares(0) == 0", run: "result = sum_of_squares(0)", check: "result == 0" },
      { id: "one", description: "sum_of_squares(1) == 1", run: "result = sum_of_squares(1)", check: "result == 1" },
      { id: "three", description: "sum_of_squares(3) == 14", run: "result = sum_of_squares(3)", check: "result == 14" },
      { id: "five", description: "sum_of_squares(5) == 55", run: "result = sum_of_squares(5)", check: "result == 55" },
    ],
    difficulty: -0.2,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-indexing--code-second-item",
    conceptId: "python-indexing",
    format: "code",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Write a function second_item(lst) that returns the second element of lst.",
    starterCode: "def second_item(lst):\n    pass\n",
    referenceSolution: "def second_item(lst):\n    return lst[1]\n",
    codeTests: [
      { id: "basic", description: "second_item([10, 20, 30]) == 20", run: "result = second_item([10, 20, 30])", check: "result == 20" },
      { id: "strings", description: "second_item([\"a\", \"b\", \"c\"]) == \"b\"", run: "result = second_item([\"a\", \"b\", \"c\"])", check: "result == \"b\"" },
      { id: "exactly-two", description: "second_item([1, 2]) == 2", run: "result = second_item([1, 2])", check: "result == 2" },
    ],
    difficulty: -1.3,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["python-indexing"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-slicing--code-last-n",
    conceptId: "python-slicing",
    format: "code",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Write a function last_n(lst, n) that returns the last n elements of lst, as a list, " +
      "using slicing (not a loop).",
    starterCode: "def last_n(lst, n):\n    pass\n",
    referenceSolution: "def last_n(lst, n):\n    return lst[-n:]\n",
    codeTests: [
      { id: "basic", description: "last_n([1, 2, 3, 4, 5], 2) == [4, 5]", run: "result = last_n([1, 2, 3, 4, 5], 2)", check: "result == [4, 5]" },
      { id: "whole-list", description: "last_n([1, 2, 3], 3) == [1, 2, 3]", run: "result = last_n([1, 2, 3], 3)", check: "result == [1, 2, 3]" },
      { id: "one", description: "last_n([\"x\", \"y\", \"z\"], 1) == [\"z\"]", run: "result = last_n([\"x\", \"y\", \"z\"], 1)", check: "result == [\"z\"]" },
    ],
    difficulty: -0.4,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["python-slicing"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-list-operations--code-append-and-sort",
    conceptId: "python-list-operations",
    format: "code",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Write a function append_and_sort(lst, x) that returns a NEW sorted list containing every " +
      "element of lst plus x, without modifying lst itself.",
    starterCode: "def append_and_sort(lst, x):\n    pass\n",
    referenceSolution: "def append_and_sort(lst, x):\n    return sorted(lst + [x])\n",
    codeTests: [
      { id: "basic", description: "append_and_sort([3, 1, 2], 0) == [0, 1, 2, 3]", run: "result = append_and_sort([3, 1, 2], 0)", check: "result == [0, 1, 2, 3]" },
      { id: "middle", description: "append_and_sort([1, 5, 9], 4) == [1, 4, 5, 9]", run: "result = append_and_sort([1, 5, 9], 4)", check: "result == [1, 4, 5, 9]" },
      {
        id: "original-unchanged",
        description: "The original list passed in is not modified",
        run: "original = [3, 1, 2]\nappend_and_sort(original, 0)",
        check: "original == [3, 1, 2]",
      },
    ],
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 75,
    prereqClosure: ["python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-dictionaries--code-count-letters",
    conceptId: "python-dictionaries",
    format: "code",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Write a function count_letters(word) that returns a dict mapping each character in word " +
      "to how many times it appears.",
    starterCode: "def count_letters(word):\n    pass\n",
    referenceSolution:
      "def count_letters(word):\n    counts = {}\n    for ch in word:\n        counts[ch] = counts.get(ch, 0) + 1\n    return counts\n",
    codeTests: [
      { id: "basic", description: "count_letters(\"aab\") == {\"a\": 2, \"b\": 1}", run: "result = count_letters(\"aab\")", check: "result == {\"a\": 2, \"b\": 1}" },
      { id: "all-unique", description: "count_letters(\"cat\") == {\"c\": 1, \"a\": 1, \"t\": 1}", run: "result = count_letters(\"cat\")", check: "result == {\"c\": 1, \"a\": 1, \"t\": 1}" },
      { id: "single-char", description: "count_letters(\"zzzz\") == {\"z\": 4}", run: "result = count_letters(\"zzzz\")", check: "result == {\"z\": 4}" },
    ],
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-operators--code-to-fahrenheit",
    conceptId: "python-operators",
    format: "code",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Write a function to_fahrenheit(celsius) that converts a Celsius temperature to Fahrenheit: " +
      "F = C * 9/5 + 32. Return a float.",
    starterCode: "def to_fahrenheit(celsius):\n    pass\n",
    referenceSolution: "def to_fahrenheit(celsius):\n    return celsius * 9 / 5 + 32\n",
    codeTests: [
      { id: "freezing", description: "to_fahrenheit(0) == 32", run: "result = to_fahrenheit(0)", check: "result == 32" },
      { id: "boiling", description: "to_fahrenheit(100) == 212", run: "result = to_fahrenheit(100)", check: "result == 212" },
      { id: "negative", description: "to_fahrenheit(-40) == -40", run: "result = to_fahrenheit(-40)", check: "result == -40" },
    ],
    difficulty: -0.7,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["python-operators"],
    source: AUTHORED,
    status: "live",
  },
];
