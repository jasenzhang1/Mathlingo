import type { Lesson } from "../types";

const UNIT = "py-u3-lists";

export const unit3Lessons: Lesson[] = [
  {
    id: "py-lists-intro",
    unitId: UNIT,
    order: 1,
    title: "Introduction to Lists",
    summary: "Store multiple values, in order, in a single variable.",
    explanation: [
      "So far, every variable has held one value. A list lets a single variable hold many values, in a specific order. You create one with square brackets, separating items with commas: `fruits = [\"apple\", \"banana\", \"cherry\"]`.",
      "A list can hold any type of value, and can even mix types in the same list: `[1, \"two\", 3.0, True]` is perfectly valid, though in practice most lists hold items of one consistent type.",
      "`len(fruits)` tells you how many items are in the list — the same `len()` function you already used on strings. `len([\"apple\", \"banana\", \"cherry\"])` is `3`.",
      "Lists are one of Python's most-used data structures because they're ordered (items keep the position you put them in) and mutable (you can change them after creating them) — mutability is covered in the 'Modifying Lists' lesson.",
    ],
    codeExample: {
      code:
        "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(fruits)\nprint(len(fruits))\n\nmixed = [1, \"two\", 3.0]\nprint(mixed)",
      output: "['apple', 'banana', 'cherry']\n3\n[1, 'two', 3.0]",
    },
    keyPoints: [
      "A list is written with square brackets and comma-separated items: `[a, b, c]`.",
      "Lists keep items in order and can hold mixed types.",
      "`len(some_list)` returns the number of items in it.",
    ],
    practice: [
      {
        id: "py-lists-intro-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "colors = [\"red\", \"green\", \"blue\", \"yellow\"]\nprint(len(colors))",
        answer: "4",
        explanation: "The list has four items, so `len(colors)` is 4.",
      },
      {
        id: "py-lists-intro-q2",
        type: "true-false",
        prompt: "A single Python list can contain both numbers and strings at the same time.",
        choices: ["True", "False"],
        answer: "True",
        explanation:
          "Python lists don't enforce a single type — `[1, \"two\", 3.0]` is a valid list mixing int, str, and float.",
      },
    ],
    xp: 10,
  },
  {
    id: "py-indexing",
    unitId: UNIT,
    order: 2,
    title: "Indexing: Accessing List Items",
    summary: "Reach into a list and grab one item by its position.",
    explanation: [
      "Every item in a list has a position, called its index. Crucially, Python indexing starts at 0, not 1 — the first item is at index `0`, the second at index `1`, and so on. You access an item with square brackets: `fruits[0]` gets the first item.",
      "This off-by-one-from-everyday-counting habit trips up a lot of beginners, so it's worth internalizing early: for a list of length `n`, valid indexes run from `0` to `n - 1`.",
      "Trying to access an index that doesn't exist raises an `IndexError`. For `fruits = [\"apple\", \"banana\", \"cherry\"]` (length 3), `fruits[3]` fails, because valid indexes are only `0`, `1`, and `2`.",
      "Indexing also works on strings, since a string is really a sequence of characters: `\"hello\"[0]` is `\"h\"`. Everything you learn about list indexing applies to strings too.",
    ],
    codeExample: {
      code:
        "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(fruits[0])\nprint(fruits[1])\nprint(fruits[2])",
      output: "apple\nbanana\ncherry",
    },
    keyPoints: [
      "Indexing starts at 0 — `fruits[0]` is the first item, not the second.",
      "For a list of length `n`, valid indexes are `0` through `n - 1`.",
      "Accessing an out-of-range index raises an `IndexError`.",
    ],
    practice: [
      {
        id: "py-indexing-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "letters = [\"a\", \"b\", \"c\", \"d\"]\nprint(letters[2])",
        answer: "c",
        explanation: "Index 0 is \"a\", index 1 is \"b\", index 2 is \"c\".",
      },
      {
        id: "py-indexing-q2",
        type: "multiple-choice",
        prompt: "For `nums = [10, 20, 30]`, what does `nums[3]` do?",
        choices: ["Returns 30", "Returns None", "Raises an IndexError", "Returns 10"],
        answer: "Raises an IndexError",
        explanation:
          "The list has indexes 0, 1, and 2 only (length 3). Index 3 is out of range, so Python raises an `IndexError`.",
      },
      {
        id: "py-indexing-q3",
        type: "predict-output",
        prompt: "What does this print?",
        code: "word = \"python\"\nprint(word[0])",
        answer: "p",
        explanation: "Strings are indexed the same way as lists; index 0 of \"python\" is \"p\".",
      },
    ],
    xp: 15,
  },
  {
    id: "py-negative-indexing",
    unitId: UNIT,
    order: 3,
    title: "Negative Indexing",
    summary: "Count from the end of a list instead of the beginning.",
    explanation: [
      "Python lets you index from the end of a sequence using negative numbers. `fruits[-1]` is the last item, `fruits[-2]` is the second-to-last, and so on.",
      "This is genuinely useful, not just a curiosity: grabbing the last item without needing to know the list's length (`fruits[-1]` instead of `fruits[len(fruits) - 1]`) is a common and idiomatic pattern.",
      "Negative indexing follows the same out-of-range rules as positive indexing — for a list of length `n`, valid negative indexes run from `-1` to `-n`. Going further out of range, like `-4` on a 3-item list, raises an `IndexError`.",
      "It helps to picture indexes as running in both directions at once: for `[\"a\", \"b\", \"c\"]`, position `\"a\"` is both index `0` and index `-3`; `\"c\"` is both index `2` and index `-1`.",
    ],
    codeExample: {
      code:
        "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(fruits[-1])\nprint(fruits[-2])",
      output: "cherry\nbanana",
    },
    keyPoints: [
      "`list[-1]` is the last item, `list[-2]` is second-to-last, and so on.",
      "Negative indexing is the idiomatic way to grab items from the end without knowing the length.",
      "For a list of length `n`, valid negative indexes go from `-1` down to `-n`.",
    ],
    practice: [
      {
        id: "py-negative-indexing-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "nums = [10, 20, 30, 40, 50]\nprint(nums[-1])",
        answer: "50",
        explanation: "`-1` refers to the last item in the list, which is 50.",
      },
      {
        id: "py-negative-indexing-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "nums = [10, 20, 30, 40, 50]\nprint(nums[-3])",
        answer: "30",
        explanation: "Counting from the end: -1 is 50, -2 is 40, -3 is 30.",
      },
    ],
    xp: 10,
  },
  {
    id: "py-slicing",
    unitId: UNIT,
    order: 4,
    title: "Slicing: Getting Sublists",
    summary: "Pull out a range of items at once instead of just one.",
    explanation: [
      "While indexing grabs a single item, slicing grabs a range of items and returns them as a new list. The syntax is `list[start:stop]`, where `start` is the index to begin at (inclusive) and `stop` is the index to end before (exclusive).",
      "That 'stop is exclusive' rule is the single most important thing to remember about slicing: `fruits[1:3]` returns items at index 1 and 2 — not index 3. Think of it as 'up to, but not including.'",
      "Either side can be omitted. `fruits[:2]` means 'from the start up through index 1' (i.e., default `start` is 0). `fruits[2:]` means 'from index 2 to the end' (default `stop` is the list's length). `fruits[:]` copies the whole list.",
      "A third, optional number sets the step: `list[start:stop:step]`. `numbers[::2]` takes every second item across the whole list. A negative step reverses direction, and `numbers[::-1]` is a common idiom for reversing a whole list.",
    ],
    codeExample: {
      code:
        "fruits = [\"apple\", \"banana\", \"cherry\", \"date\", \"elderberry\"]\nprint(fruits[1:3])\nprint(fruits[:2])\nprint(fruits[2:])\nprint(fruits[::-1])",
      output:
        "['banana', 'cherry']\n['apple', 'banana']\n['cherry', 'date', 'elderberry']\n['elderberry', 'date', 'cherry', 'banana', 'apple']",
    },
    keyPoints: [
      "`list[start:stop]` includes `start` but excludes `stop`.",
      "Omitting `start` defaults to the beginning; omitting `stop` defaults to the end.",
      "`list[::-1]` reverses a list using a negative step.",
    ],
    practice: [
      {
        id: "py-slicing-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "nums = [0, 1, 2, 3, 4, 5]\nprint(nums[1:4])",
        answer: "[1, 2, 3]",
        explanation: "The slice includes index 1 up to, but not including, index 4 — so items 1, 2, and 3.",
      },
      {
        id: "py-slicing-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "letters = [\"a\", \"b\", \"c\", \"d\", \"e\"]\nprint(letters[:3])",
        answer: "['a', 'b', 'c']",
        explanation: "With no `start`, the slice begins at index 0 and stops before index 3.",
      },
      {
        id: "py-slicing-q3",
        type: "predict-output",
        prompt: "What does this print?",
        code: "nums = [10, 20, 30, 40]\nprint(nums[::2])",
        answer: "[10, 30]",
        explanation: "A step of 2 takes every second item starting from index 0: indexes 0 and 2.",
      },
    ],
    xp: 15,
  },
  {
    id: "py-list-modify",
    unitId: UNIT,
    order: 5,
    title: "Modifying Lists",
    summary: "Lists can change after they're created — add, remove, and update items.",
    explanation: [
      "Unlike strings, lists are mutable: you can change them in place after creating them, without needing to create a new list. Assigning to an index updates that item: `fruits[0] = \"apricot\"` replaces the first item.",
      "`.append(item)` adds a single item to the end of the list. `.insert(index, item)` adds an item at a specific position, shifting everything after it over by one.",
      "`.remove(item)` deletes the first matching item by value. `.pop(index)` removes and returns the item at a given index (defaulting to the last item if no index is given) — useful when you need the removed value, not just to discard it. The `del` keyword, like `del fruits[0]`, also removes by index without returning the value.",
      "Because lists are mutable, assigning one list variable to another (`b = a`) does *not* create a copy — both names point to the same underlying list, so changing `b` also changes what you see through `a`. To get an independent copy, use `a.copy()` or `a[:]`.",
    ],
    codeExample: {
      code:
        "fruits = [\"apple\", \"banana\"]\nfruits.append(\"cherry\")\nprint(fruits)\n\nfruits[0] = \"apricot\"\nprint(fruits)\n\nremoved = fruits.pop()\nprint(removed, fruits)",
      output:
        "['apple', 'banana', 'cherry']\n['apricot', 'banana', 'cherry']\ncherry ['apricot', 'banana']",
    },
    keyPoints: [
      "Lists are mutable — `.append()`, `.insert()`, `.remove()`, and `.pop()` change them in place.",
      "`.pop()` removes and returns an item; `del` and `.remove()` just remove.",
      "`b = a` doesn't copy a list — both names refer to the same list in memory.",
    ],
    practice: [
      {
        id: "py-list-modify-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "nums = [1, 2, 3]\nnums.append(4)\nprint(nums)",
        answer: "[1, 2, 3, 4]",
        explanation: "`.append(4)` adds 4 to the end of the list.",
      },
      {
        id: "py-list-modify-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "nums = [10, 20, 30]\nx = nums.pop(0)\nprint(x)\nprint(nums)",
        answer: "10\n[20, 30]",
        explanation: "`.pop(0)` removes and returns the item at index 0 (10), leaving [20, 30] behind.",
      },
      {
        id: "py-list-modify-q3",
        type: "true-false",
        prompt: "After `b = a` (where `a` is a list), changing `b` also changes `a`.",
        choices: ["True", "False"],
        answer: "True",
        explanation: "`b = a` makes both names point to the same list object, so mutating one affects the other.",
      },
    ],
    xp: 15,
  },
  {
    id: "py-list-methods",
    unitId: UNIT,
    order: 6,
    title: "Useful List Methods",
    summary: "Common built-in tools for searching, sorting, and combining lists.",
    explanation: [
      "`in` checks membership: `\"apple\" in fruits` returns `True` if `\"apple\"` is somewhere in the list. `.index(item)` finds the position of the first matching item, raising a `ValueError` if it isn't found.",
      "`.sort()` sorts a list in place (changing the original list and returning `None`), while `sorted(list)` returns a new sorted list and leaves the original untouched. Both accept `reverse=True` to sort descending.",
      "`.count(item)` tells you how many times a value appears in the list. `.reverse()` reverses a list in place, similar to how `[::-1]` creates a reversed copy without a slice.",
      "The `+` operator concatenates two lists into a new one, and `*` repeats a list, mirroring how those operators work on strings: `[1, 2] + [3, 4]` is `[1, 2, 3, 4]`, and `[0] * 3` is `[0, 0, 0]`.",
    ],
    codeExample: {
      code:
        "nums = [4, 1, 3, 1, 2]\nprint(3 in nums)\nprint(nums.count(1))\n\nnums.sort()\nprint(nums)\n\nprint(sorted(nums, reverse=True))",
      output: "True\n2\n[1, 1, 2, 3, 4]\n[4, 3, 2, 1, 1]",
    },
    keyPoints: [
      "`in` checks membership; `.count()` counts occurrences; `.index()` finds a position.",
      "`.sort()` mutates the list in place; `sorted()` returns a new sorted list.",
      "`+` concatenates lists and `*` repeats a list, just like with strings.",
    ],
    practice: [
      {
        id: "py-list-methods-q1",
        type: "predict-output",
        prompt: "What does this print?",
        code: "nums = [5, 3, 8, 1]\nprint(sorted(nums))\nprint(nums)",
        answer: "[1, 3, 5, 8]\n[5, 3, 8, 1]",
        explanation: "`sorted()` returns a new sorted list without changing the original `nums`.",
      },
      {
        id: "py-list-methods-q2",
        type: "predict-output",
        prompt: "What does this print?",
        code: "letters = [\"a\", \"b\", \"c\"]\nprint(\"z\" in letters)",
        answer: "False",
        explanation: "\"z\" is not one of the items in the list, so `in` returns `False`.",
      },
    ],
    xp: 15,
  },
];
