import type { Item } from "../../lib/assessment/types";
import { code, mcq, num, s, short } from "./python-sixty-shared";

/**
 * Containers and iteration (list operations through comprehensions) brought
 * to 60 questions each. Conventions are those of python-sixty-basics.ts.
 */

// ---------------------------------------------------------------------------
// python-list-operations
// ---------------------------------------------------------------------------
const LO = "python-list-operations";
const listOperations: Item[] = [
  mcq(s(LO, "recall-pop-default", "recall", 1, 15, "With no argument, which element does `.pop()` remove?"),
    "The last one",
    [
      ["The first one", "pop-first", "`.pop()` defaults to index `-1`; use `.pop(0)` for the first."],
      ["A random one", "pop-random", "List `.pop()` is deterministic; `set.pop()` is the arbitrary one."],
      ["The largest one", "pop-largest", "`.pop()` goes by position, not value."],
    ]),
  mcq(s(LO, "recall-extend", "recall", 1, 15, "What does `a.extend(b)` do?"),
    "Appends each element of `b` to the end of `a`",
    [
      ["Appends `b` as a single element", "extend-is-append", "That is `.append(b)`."],
      ["Returns a new list `a + b`", "extend-returns-new", "`.extend()` mutates `a` and returns `None`."],
      ["Makes `a` as long as `b`", "extend-pads", "It adds all of `b`'s elements."],
    ]),
  mcq(s(LO, "recall-sort-reverse-flag", "recall", 2, 20, "How do you sort `a` in place from largest to smallest?"),
    "`a.sort(reverse=True)`",
    [
      ["`a.sort(desc=True)`", "sort-desc-flag", "The keyword is `reverse`."],
      ["`a.reverse()`", "reverse-sorts", "`.reverse()` only flips the current order; it doesn't sort."],
      ["`a.sort(-1)`", "sort-positional-direction", "`.sort()` takes keyword-only arguments."],
    ]),
  num(s(LO, "eval-pop-index", "apply", 3, 30, "After `a = [5, 6, 7, 8]`, `x = a.pop(1)`, what is `x + len(a)`?"), 9),
  num(s(LO, "eval-remove-first-only", "apply", 3, 30, "After `a = [2, 1, 2, 1]`, `a.remove(1)`, what is `a.index(1)`?"), 2),
  mcq(s(LO, "eval-sorted-strings-case", "apply", 4, 35, "What is `sorted([\"b\", \"A\", \"a\", \"B\"])`?"),
    "`['A', 'B', 'a', 'b']`",
    [
      ["`['A', 'a', 'B', 'b']`", "sort-case-insensitive", "String order is by code point; every uppercase letter sorts before lowercase."],
      ["`['a', 'b', 'A', 'B']`", "lowercase-first", "Uppercase letters have smaller code points."],
      ["`['a', 'A', 'b', 'B']`", "sort-alpha-lower-first", "Use `key=str.lower` to sort case-insensitively."],
    ]),
  num(s(LO, "eval-insert-past-end", "apply", 4, 35, "After `a = [1, 2]`, `a.insert(10, 3)`, what is `a.index(3)`?"), 2),
  mcq(s(LO, "eval-sort-mixed-types", "apply", 5, 40, "What does `sorted([3, \"2\", 1])` do?"),
    "`TypeError`",
    [
      ["`[1, '2', 3]`", "sort-coerces", "Python $3$ won't compare `str` with `int`."],
      ["`[1, 3, '2']`", "sort-numbers-first", "There is no cross-type ordering."],
      ["`['2', 1, 3]`", "sort-strings-first", "Mixed `int`/`str` comparison raises."],
    ]),
  num(s(LO, "eval-del-slice-len", "apply", 5, 40, "After `a = list(range(10))`, `del a[2:8]`, what is `sum(a)`?"), 18),
  short(s(LO, "explain-copy-before-modify", "explain", 6, 120, "A function `def normalise(xs):` divides every element of `xs` by its sum and returns the result, but callers complain their original lists change. Explain the cause and give two fixes."),
    [
      ["cause", "The function mutates the caller's list in place (e.g. `xs[i] = ...`), and the parameter refers to the same object", 2, true],
      ["fix", "Build and return a new list (a comprehension), or copy first with `xs[:]`/`list(xs)`", 2, true],
    ]),
  mcq(s(LO, "transfer-sort-stability", "transfer", 7, 60, "`people = [(\"Bo\", 30), (\"Al\", 25), (\"Cy\", 30)]`. After `people.sort(key=lambda p: p[1])`, which comes first of the two $30$-year-olds?"),
    "`(\"Bo\", 30)` — Python's sort is stable, so equal keys keep their original order",
    [
      ["`(\"Cy\", 30)`", "sort-reverses-ties", "Stability preserves the original relative order of ties."],
      ["It's unpredictable", "sort-unstable", "Timsort is guaranteed stable."],
      ["They're ordered alphabetically", "sort-secondary-key", "Only `p[1]` is compared; ties stay as they were."],
    ]),
  mcq(s(LO, "transfer-multi-key-sort", "transfer", 8, 60, "How do you sort records by score descending, then name ascending, in one call?"),
    "`sorted(rows, key=lambda r: (-r.score, r.name))`",
    [
      ["`sorted(rows, key=lambda r: (r.score, r.name), reverse=True)`", "reverse-whole-tuple", "`reverse` flips both keys, so names would sort descending too."],
      ["`sorted(sorted(rows, key=lambda r: r.score), key=lambda r: r.name)`", "sort-order-reversed", "Chained sorts must apply the *secondary* key first; this makes name the primary key."],
      ["`sorted(rows, key=[-score, name])`", "key-list", "`key` must be a function."],
    ]),
  mcq(s(LO, "transfer-pop0-deque", "transfer", 8, 60, "A breadth-first search does `queue.pop(0)` on a list of millions of items and is slow. What is the standard fix?"),
    "Use `collections.deque` and `popleft()`, which is $O(1)$ instead of $O(n)$",
    [
      ["Use `queue.pop()` instead", "pop-end-same", "That takes from the wrong end, turning the queue into a stack."],
      ["Sort the list first", "sort-speeds-pop", "Sorting doesn't change the cost of shifting every element."],
      ["Use `del queue[0]`", "del-faster", "`del queue[0]` shifts every element too."],
    ]),
  num(s(LO, "eval-reverse-sort-combo", "transfer", 8, 60, "After `a = [4, 1, 3]`, `b = a`, `a.sort()`, `b.reverse()`, what is `a[0]`?"), 4),
  num(s(LO, "eval-extend-self", "transfer", 9, 75, "After `a = [1, 2]`, `a.extend(a)`, `a += a`, what is `len(a)`?"), 8),
  mcq(s(LO, "transfer-iadd-tuple-in-tuple", "transfer", 10, 90, "`t = ([1],)` then `t[0] += [2]` inside `try`/`except TypeError: pass`. What is `t` afterward?"),
    "`([1, 2],)` — the list was extended in place before the failing assignment back into the tuple",
    [
      ["`([1],)` — the operation was rolled back", "iadd-atomic", "`+=` is extend-then-assign; the extend succeeded before the assignment raised."],
      ["`([1], [2])`", "iadd-adds-to-tuple", "Nothing is added to the tuple itself."],
      ["`([2],)`", "iadd-replaces", "The list is extended, not replaced."],
    ]),
  short(s(LO, "transfer-remove-all", "transfer", 9, 150, "Give two correct ways to remove every occurrence of a value `v` from list `a`, and explain why `for x in a: if x == v: a.remove(x)` is not one of them."),
    [
      ["ways", "E.g. `a = [x for x in a if x != v]`, `a[:] = [...]`, or `while v in a: a.remove(v)`", 2, true],
      ["skip", "Removing while iterating shifts later elements left, so the loop skips the element after each removal", 2, true],
    ]),
  num(s(LO, "eval-sorted-key-len-neg", "transfer", 9, 75, "What is `sorted([\"ccc\", \"a\", \"bb\", \"dd\"], key=lambda w: (-len(w), w)).index(\"dd\")`?"), 2),
  code(s(LO, "code-merge-sorted", "apply", 7, 120, "Write `merge(a, b)` that merges two already-sorted lists into one sorted list in linear time, without calling `sort` or `sorted`."),
    "def merge(a, b):\n    pass\n",
    "def merge(a, b):\n    i = j = 0\n    out = []\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i]); i += 1\n        else:\n            out.append(b[j]); j += 1\n    return out + a[i:] + b[j:]\n",
    [
      ["basic", "result = merge([1, 4, 6], [2, 3, 7])", "result == [1, 2, 3, 4, 6, 7]"],
      ["empty", "result = merge([], [1, 2])", "result == [1, 2]"],
      ["dupes", "result = merge([1, 2], [2, 2])", "result == [1, 2, 2, 2]"],
      ["no-sort", "import builtins\n_s = builtins.sorted\nbuiltins.sorted = None\ntry:\n    result = merge([5], [1])\nfinally:\n    builtins.sorted = _s", "result == [1, 5]"],
    ]),
  code(s(LO, "code-move-zeros", "apply", 6, 90, "Write `move_zeros(a)` that moves every `0` to the end of the list *in place*, keeping the other elements in order, and returns the list."),
    "def move_zeros(a):\n    pass\n",
    "def move_zeros(a):\n    nz = [x for x in a if x != 0]\n    a[:] = nz + [0] * (len(a) - len(nz))\n    return a\n",
    [
      ["basic", "result = move_zeros([0, 1, 0, 3, 12])", "result == [1, 3, 12, 0, 0]"],
      ["none", "result = move_zeros([1, 2])", "result == [1, 2]"],
      ["in-place", "x = [0, 5]\nmove_zeros(x)\nresult = x", "result == [5, 0]"],
    ]),
];

// ---------------------------------------------------------------------------
// python-tuples
// ---------------------------------------------------------------------------
const TU = "python-tuples";
const tuples: Item[] = [
  mcq(s(TU, "recall-immutable", "recall", 1, 15, "What is the main difference between a tuple and a list?"),
    "A tuple can't be changed after it is created; a list can",
    [
      ["A tuple can hold only numbers", "tuple-numbers-only", "Tuples hold any objects."],
      ["A tuple is unordered", "tuple-unordered", "Tuples are ordered and indexable."],
      ["A tuple can't contain duplicates", "tuple-no-dupes", "That's a set; tuples allow duplicates."],
    ]),
  mcq(s(TU, "recall-comma-makes-tuple", "recall", 2, 20, "What actually makes `x = 1,` a tuple?"),
    "The comma",
    [
      ["The parentheses", "parens-make-tuple", "`(1)` is just `1`; the comma makes the tuple."],
      ["The variable name", "name-makes-tuple", "Names have no type."],
      ["It's a syntax error", "trailing-comma-error", "A trailing comma creates a one-element tuple."],
    ]),
  mcq(s(TU, "recall-tuple-methods", "recall", 2, 20, "Which two methods do tuples have?"),
    "`.count()` and `.index()`",
    [
      ["`.append()` and `.pop()`", "tuple-mutators", "Tuples are immutable, so they have no mutating methods."],
      ["`.sort()` and `.reverse()`", "tuple-sort", "Those mutate in place, so only lists have them."],
      ["`.keys()` and `.values()`", "tuple-dict-methods", "Those are dict methods."],
    ]),
  num(s(TU, "eval-tuple-repeat", "apply", 3, 25, "What is `len((0, 1) * 3)`?"), 6),
  num(s(TU, "eval-tuple-count", "apply", 3, 25, "What is `(1, 2, 1, 3, 1).count(1)`?"), 3),
  mcq(s(TU, "eval-star-unpack-middle", "apply", 4, 35, "After `first, *mid, last = (1, 2, 3, 4)`, what is `mid`?"),
    "`[2, 3]`",
    [
      ["`(2, 3)`", "star-unpack-tuple", "A starred target always collects into a list."],
      ["`2`", "star-takes-one", "`*mid` takes everything not claimed by the other names."],
      ["`[1, 2, 3]`", "star-greedy-front", "`first` takes `1` first."],
    ]),
  mcq(s(TU, "eval-tuple-compare", "apply", 4, 35, "What is `(1, 9) < (2, 0)`?"),
    "`True`",
    [
      ["`False`", "tuple-compare-sum", "Tuples compare element by element from the left; `1 < 2` decides it."],
      ["`TypeError`", "tuple-lt-error", "Tuples of comparable values support `<`."],
      ["`(True, False)`", "tuple-compare-elementwise", "Comparison gives a single `bool`."],
    ]),
  num(s(TU, "eval-nested-unpack", "apply", 5, 40, "After `(a, b), c = (1, 2), 3`, what is `a * 100 + b * 10 + c`?"), 123),
  mcq(s(TU, "apply-unpack-mismatch", "apply", 5, 40, "What does `a, b = (1, 2, 3)` do?"),
    "Raises `ValueError: too many values to unpack`",
    [
      ["Sets `a = 1` and `b = (2, 3)`", "unpack-rest-to-last", "Only a starred name absorbs extras."],
      ["Sets `a = 1`, `b = 2` and drops `3`", "unpack-truncates", "Unpacking requires an exact count."],
      ["Raises `TypeError`", "unpack-typeerror", "The error type is `ValueError`."],
    ]),
  mcq(s(TU, "apply-namedtuple", "apply", 6, 45, "`Point = namedtuple(\"Point\", \"x y\")` and `p = Point(3, 4)`. What is `p.x + p[1]`?"),
    "`7` — a named tuple supports both attribute access and indexing",
    [
      ["`AttributeError`", "namedtuple-no-attr", "Named fields are accessible as attributes."],
      ["`TypeError`", "namedtuple-no-index", "A named tuple is still a tuple, so indexing works."],
      ["`6`", "namedtuple-index-is-x", "`p[1]` is the second field, `y = 4`."],
    ]),
  short(s(TU, "explain-tuple-hashable", "explain", 7, 120, "Why can `(1, 2)` be a dictionary key while `[1, 2]` cannot, and why is `(1, [2])` also rejected?"),
    [
      ["hash-needs-stability", "Keys must be hashable, meaning their hash can't change while stored", 2, true],
      ["list-mutable", "Lists are mutable, so they aren't hashable", 1],
      ["contents-matter", "A tuple is hashable only if all its elements are; the inner list makes `(1, [2])` unhashable", 1, true],
    ]),
  mcq(s(TU, "transfer-tuple-plus-equals", "transfer", 8, 60, "`t = (1, 2); u = t; t += (3,)`. What is `u`?"),
    "`(1, 2)` — tuples are immutable, so `+=` builds a new tuple and rebinds only `t`",
    [
      ["`(1, 2, 3)`", "tuple-iadd-in-place", "There's no in-place add for tuples."],
      ["`TypeError`", "tuple-iadd-error", "`t += (3,)` is legal; it rebinds `t`."],
      ["`(3,)`", "tuple-iadd-replaces", "`t` becomes the concatenation; `u` is untouched."],
    ]),
  mcq(s(TU, "transfer-generator-not-tuple", "transfer", 8, 60, "What is `type((x for x in range(3)))`?"),
    "`<class 'generator'>`",
    [
      ["`<class 'tuple'>`", "paren-comprehension-tuple", "Parentheses around a comprehension make a generator; use `tuple(...)`."],
      ["`<class 'list'>`", "paren-comprehension-list", "Lists need square brackets."],
      ["`<class 'range'>`", "genexp-is-range", "The comprehension wraps a range but is itself a generator."],
    ]),
  num(s(TU, "eval-swap-via-tuple", "transfer", 8, 60, "After `a = [1, 2, 3]`, `a[0], a[2] = a[2], a[0]`, what is `a[0] * 10 + a[2]`?"), 31),
  mcq(s(TU, "eval-sort-tuples", "transfer", 9, 75, "What is `sorted([(2, \"b\"), (1, \"z\"), (2, \"a\")])[1]`?"),
    "`(2, 'a')`",
    [
      ["`(2, 'b')`", "sort-tuples-first-only", "Ties on the first element are broken by the second, and `'a' < 'b'`."],
      ["`(1, 'z')`", "sort-tuples-by-last", "`(1, 'z')` sorts first, at index $0$."],
      ["`TypeError`", "sort-tuples-error", "Tuples of comparable values sort lexicographically."],
    ]),
  mcq(s(TU, "transfer-hash-of-tuple-with-list", "transfer", 9, 75, "What does `hash((1, (2, 3)))` do, and what does `hash((1, [2, 3]))` do?"),
    "The first returns an integer; the second raises `TypeError: unhashable type: 'list'`",
    [
      ["Both return integers", "tuple-always-hashable", "A tuple's hash combines its elements' hashes, so an unhashable element makes it fail."],
      ["Both raise `TypeError`", "nested-tuple-unhashable", "Nested tuples of hashables are hashable."],
      ["The second returns the hash of `(1,)`", "hash-skips-unhashable", "Hashing doesn't skip elements."],
    ]),
  short(s(TU, "transfer-return-tuple-api", "transfer", 9, 150, "A function returns `(mean, std, n)` and has dozens of callers doing `m, s, n = stats(x)`. You now need to add a median. Explain the problem with appending it to the tuple, and suggest a design that avoids it."),
    [
      ["breaks-unpacking", "Every caller unpacking three values would now raise `ValueError`", 2, true],
      ["named-alternative", "Return a named tuple, dataclass or dict so callers access fields by name", 2, true],
    ]),
  num(s(TU, "eval-zip-transpose", "transfer", 10, 90, "After `pairs = [(1, 4), (2, 5), (3, 6)]`, `xs, ys = zip(*pairs)`, what is `sum(ys) - sum(xs)`?"), 9),
  code(s(TU, "code-min-max", "apply", 4, 75, "Write `min_max(nums)` returning a tuple `(smallest, largest)` in a single pass, without calling `min` or `max`. Assume `nums` is non-empty."),
    "def min_max(nums):\n    pass\n",
    "def min_max(nums):\n    lo = hi = nums[0]\n    for x in nums[1:]:\n        if x < lo:\n            lo = x\n        if x > hi:\n            hi = x\n    return (lo, hi)\n",
    [
      ["basic", "result = min_max([3, 1, 4, 1, 5])", "result == (1, 5)"],
      ["single", "result = min_max([7])", "result == (7, 7)"],
      ["negative", "result = min_max([-1, -9, -3])", "result == (-9, -1)"],
    ]),
  code(s(TU, "code-closest-pair", "apply", 7, 120, "Write `closest(points)` that returns the pair of `(x, y)` tuples with the smallest squared distance, as a tuple of the two points in their original order. Assume at least two points."),
    "def closest(points):\n    pass\n",
    "def closest(points):\n    best = None\n    for i in range(len(points)):\n        for j in range(i + 1, len(points)):\n            (x1, y1), (x2, y2) = points[i], points[j]\n            d = (x1 - x2) ** 2 + (y1 - y2) ** 2\n            if best is None or d < best[0]:\n                best = (d, (points[i], points[j]))\n    return best[1]\n",
    [
      ["basic", "result = closest([(0, 0), (5, 5), (1, 1)])", "result == ((0, 0), (1, 1))"],
      ["two", "result = closest([(2, 3), (4, 7)])", "result == ((2, 3), (4, 7))"],
      ["later", "result = closest([(0, 0), (10, 0), (10, 1)])", "result == ((10, 0), (10, 1))"],
    ]),
];

// ---------------------------------------------------------------------------
// python-dictionaries
// ---------------------------------------------------------------------------
const D = "python-dictionaries";
const dictionaries: Item[] = [
  mcq(s(D, "recall-key-value", "recall", 1, 15, "In `{\"apple\": 3}`, which part is the key?"),
    "`\"apple\"`",
    [
      ["`3`", "key-is-value", "The value comes after the colon."],
      ["The colon", "colon-is-key", "The colon separates a key from its value."],
      ["The whole dict", "dict-is-key", "A dict holds key–value pairs."],
    ]),
  mcq(s(D, "recall-lookup-syntax", "recall", 1, 15, "How do you read the value stored under key `\"x\"` in dict `d`?"),
    "`d[\"x\"]`",
    [
      ["`d.x`", "dict-attr", "Dict keys aren't attributes."],
      ["`d(\"x\")`", "dict-call", "Dicts aren't callable."],
      ["`d[0]`", "dict-position", "Dicts are looked up by key, not position."],
    ]),
  mcq(s(D, "recall-unique-keys", "recall", 2, 20, "Can a dict have two entries with the same key?"),
    "No — assigning to an existing key replaces its value",
    [
      ["Yes, both are kept", "dict-dup-keys", "Keys are unique."],
      ["Yes, and lookup returns a list of both", "dict-multi-value", "Each key maps to exactly one value; use a list as the value for several."],
      ["Only if the values differ", "dup-keys-diff-values", "Keys must be unique regardless of values."],
    ]),
  num(s(D, "eval-setdefault", "apply", 4, 35, "After `d = {}`, `d.setdefault(\"a\", []).append(1)`, `d.setdefault(\"a\", []).append(2)`, what is `len(d[\"a\"])`?"), 2),
  mcq(s(D, "eval-merge-operator", "apply", 4, 35, "What is `{\"a\": 1, \"b\": 2} | {\"b\": 9}`?"),
    "`{'a': 1, 'b': 9}`",
    [
      ["`{'a': 1, 'b': 2}`", "merge-left-wins", "In `|`, the right operand's values win on shared keys."],
      ["`TypeError`", "dict-no-or", "Dicts support `|` from Python $3.9$."],
      ["`{'a': 1, 'b': [2, 9]}`", "merge-collects", "Merging replaces values; it doesn't collect them."],
    ]),
  num(s(D, "eval-get-chain", "apply", 3, 30, "After `d = {\"x\": 5}`, what is `d.get(\"x\", 0) + d.get(\"y\", 10)`?"), 15),
  mcq(s(D, "eval-fromkeys", "apply", 5, 40, "What is `dict.fromkeys(\"aba\", 0)`?"),
    "`{'a': 0, 'b': 0}`",
    [
      ["`{'a': 0, 'b': 0, 'a': 0}`", "fromkeys-dupes", "Keys are unique; the repeated `'a'` collapses."],
      ["`{'aba': 0}`", "fromkeys-whole-string", "`fromkeys` iterates its first argument."],
      ["`{0: 'aba'}`", "fromkeys-swapped", "The iterable supplies keys; `0` is every value."],
    ]),
  num(s(D, "eval-count-letters", "apply", 5, 45, "After `c = {}`, `for ch in \"banana\": c[ch] = c.get(ch, 0) + 1`, what is `c[\"a\"] * 10 + c[\"n\"]`?"), 32),
  mcq(s(D, "eval-invert", "apply", 5, 40, "What is `{v: k for k, v in {\"a\": 1, \"b\": 1}.items()}`?"),
    "`{1: 'b'}`",
    [
      ["`{1: 'a'}`", "invert-first-wins", "Later pairs overwrite earlier ones on the same new key."],
      ["`{1: ['a', 'b']}`", "invert-collects", "A comprehension assigns, it doesn't collect."],
      ["`ValueError`", "invert-duplicate-error", "Duplicate keys in a comprehension silently overwrite."],
    ]),
  short(s(D, "explain-views", "explain", 6, 120, "`ks = d.keys()` is taken, then a key is added to `d`. Does `ks` show the new key? Explain what kind of object `.keys()` returns."),
    [
      ["view", "`.keys()` returns a dynamic view, not a copy", 2, true],
      ["reflects", "So `ks` reflects later changes and includes the new key; `list(d)` would snapshot", 2, true],
    ]),
  mcq(s(D, "transfer-defaultdict", "transfer", 7, 50, "`from collections import defaultdict`; `g = defaultdict(list)`; `g[\"x\"].append(1)`. Why does this not raise `KeyError`?"),
    "A missing key is created on first access with `list()` as its value",
    [
      ["`defaultdict` ignores missing keys and returns `None`", "defaultdict-none", "It inserts a fresh default, which `.append` then modifies."],
      ["`append` creates the key", "append-creates-key", "The lookup creates it before `append` runs."],
      ["It does raise; you need `.get()`", "defaultdict-raises", "`defaultdict` exists precisely to avoid this."],
    ]),
  mcq(s(D, "transfer-key-equality-hash", "transfer", 8, 60, "What is `len({1: \"a\", True: \"b\", 1.0: \"c\"})`, and what is the stored key?"),
    "$1$ entry, key `1` with value `'c'` — `1 == True == 1.0` and they hash alike, so later pairs overwrite the value but the first key object stays",
    [
      ["$3$ entries", "dict-type-keys", "Keys are compared by equality and hash, not type."],
      ["$1$ entry, key `1.0` with value `'c'`", "dict-last-key-wins", "The value is replaced but the original key object is kept."],
      ["$2$ entries, `1` and `1.0`", "bool-separate", "`True == 1` too."],
    ]),
  mcq(s(D, "transfer-mutate-during-iter", "transfer", 8, 60, "Which safely deletes every key whose value is `0` from `d`?"),
    "`for k in list(d): if d[k] == 0: del d[k]`",
    [
      ["`for k in d: if d[k] == 0: del d[k]`", "del-during-iteration", "Changing a dict's size while iterating it raises `RuntimeError`."],
      ["`for k, v in d.items(): if v == 0: d.pop(k)`", "pop-during-items", "Same problem: the dict changes size mid-iteration."],
      ["`d.remove(0)`", "dict-remove", "Dicts have no `.remove` method."],
    ]),
  num(s(D, "eval-nested-get", "transfer", 8, 60, "After `cfg = {\"db\": {\"port\": 5432}}`, what is `cfg.get(\"db\", {}).get(\"port\", 0) + cfg.get(\"cache\", {}).get(\"port\", 1)`?"), 5433),
  num(s(D, "eval-insertion-order-update", "transfer", 9, 75, "After `d = {\"a\": 1, \"b\": 2}`, `d[\"a\"] = 3`, `del d[\"b\"]`, `d[\"b\"] = 4`, what is `list(d).index(\"b\")`?"), 1),
  mcq(s(D, "transfer-unhashable-key-fix", "transfer", 9, 75, "A cache keys results by a function's list argument and fails with `unhashable type: 'list'`. Which key is correct?"),
    "`tuple(args)` — it is hashable, and two equal lists always give equal tuples",
    [
      ["`frozenset(args)` is always right", "frozenset-key", "It drops order and duplicates, so `[1, 2]` and `[2, 1, 1]` would collide."],
      ["`id(args)` works", "id-key", "Equal lists built separately have different ids, so the cache never hits."],
      ["`hash(args)`", "hash-list-key", "Lists can't be hashed at all."],
    ]),
  short(s(D, "transfer-group-by", "transfer", 9, 150, "You have a list of `(city, temperature)` pairs. Describe, in code or words, how to build a dict mapping each city to the average of its temperatures in one pass plus a final step."),
    [
      ["accumulate", "Accumulate per-city sums and counts (or lists) in a dict, e.g. with `setdefault` or `defaultdict`", 2, true],
      ["divide", "Then compute `sum / count` for each city in a final dict comprehension", 2, true],
    ]),
  code(s(D, "code-word-freq", "apply", 5, 90, "Write `top_word(text)` returning the most frequent word in a space-separated string, lowercasing first; break ties by the word that appears first in the text."),
    "def top_word(text):\n    pass\n",
    "def top_word(text):\n    counts = {}\n    for w in text.lower().split():\n        counts[w] = counts.get(w, 0) + 1\n    best = max(counts.values())\n    for w in counts:\n        if counts[w] == best:\n            return w\n",
    [
      ["basic", "result = top_word(\"a b a c\")", "result == \"a\""],
      ["case", "result = top_word(\"Dog cat dog\")", "result == \"dog\""],
      ["tie", "result = top_word(\"x y y x\")", "result == \"x\""],
    ]),
  code(s(D, "code-invert-multi", "apply", 7, 120, "Write `invert(d)` that maps each value to a *sorted list* of the keys that had it. `invert({\"a\": 1, \"b\": 2, \"c\": 1})` is `{1: [\"a\", \"c\"], 2: [\"b\"]}`."),
    "def invert(d):\n    pass\n",
    "def invert(d):\n    out = {}\n    for k, v in d.items():\n        out.setdefault(v, []).append(k)\n    return {v: sorted(ks) for v, ks in out.items()}\n",
    [
      ["basic", "result = invert({\"a\": 1, \"b\": 2, \"c\": 1})", "result == {1: [\"a\", \"c\"], 2: [\"b\"]}"],
      ["order", "result = invert({\"z\": 0, \"y\": 0})", "result == {0: [\"y\", \"z\"]}"],
      ["empty", "result = (invert({}), invert({1: 1}))", "result == ({}, {1: [1]})"],
    ]),
];

// ---------------------------------------------------------------------------
// python-sets
// ---------------------------------------------------------------------------
const ST = "python-sets";
const sets: Item[] = [
  mcq(s(ST, "recall-empty-set", "recall", 1, 15, "How do you create an empty set?"),
    "`set()`",
    [
      ["`{}`", "braces-empty-set", "`{}` is an empty dict."],
      ["`[]`", "brackets-set", "That's an empty list."],
      ["`set[]`", "set-brackets", "Call the constructor with parentheses."],
    ]),
  mcq(s(ST, "recall-no-index", "recall", 2, 20, "`s = {10, 20}`. What does `s[0]` do?"),
    "Raises `TypeError` — sets are unordered and don't support indexing",
    [
      ["Returns `10`", "set-indexable", "Sets have no positions."],
      ["Returns the smallest element", "set-index-min", "Indexing isn't defined for sets; use `min(s)`."],
      ["Raises `IndexError`", "set-indexerror", "It's a `TypeError`: the operation isn't supported at all."],
    ]),
  mcq(s(ST, "recall-discard", "recall", 2, 20, "Which method removes an element from a set without raising if it's missing?"),
    "`.discard()`",
    [
      ["`.remove()`", "remove-safe", "`.remove()` raises `KeyError` if the element is missing."],
      ["`.pop()`", "pop-specific", "`set.pop()` removes an arbitrary element."],
      ["`.delete()`", "set-delete", "There's no `.delete()` method."],
    ]),
  num(s(ST, "eval-union-len", "apply", 3, 25, "What is `len({1, 2, 3} | {3, 4})`?"), 4),
  num(s(ST, "eval-difference-sum", "apply", 3, 25, "What is `sum({1, 2, 3, 4} - {2, 4, 6})`?"), 4),
  mcq(s(ST, "eval-subset-operator", "apply", 4, 30, "What is `{1, 2} <= {1, 2}`?"),
    "`True`",
    [
      ["`False`", "subset-strict", "`<=` is subset-or-equal; `<` is the strict version."],
      ["`TypeError`", "set-le-error", "Sets overload `<=` as the subset test."],
      ["`{1, 2}`", "set-le-returns-set", "Comparison returns a `bool`."],
    ]),
  num(s(ST, "eval-set-comprehension-len", "apply", 4, 35, "What is `len({x % 4 for x in range(100)})`?"), 4),
  mcq(s(ST, "eval-isdisjoint", "apply", 4, 30, "What is `{1, 2}.isdisjoint([3, 4])`?"),
    "`True`",
    [
      ["`False`", "disjoint-means-overlap", "Disjoint means no elements in common."],
      ["`TypeError`", "isdisjoint-needs-set", "Set methods accept any iterable; only the operators require sets."],
      ["`set()`", "isdisjoint-returns-set", "It returns a `bool`."],
    ]),
  num(s(ST, "eval-symmetric-update", "apply", 5, 40, "After `a = {1, 2, 3}`, `a ^= {2, 5}`, what is `sum(a)`?"), 9),
  short(s(ST, "explain-set-membership-speed", "explain", 6, 120, "Explain why `x in s` for a set is fast regardless of size, while `x in lst` for a list slows down as the list grows."),
    [
      ["hash", "A set hashes `x` to find the one bucket where it could be, average $O(1)$", 2, true],
      ["scan", "A list must compare `x` with elements one by one, $O(n)$", 2, true],
    ]),
  mcq(s(ST, "transfer-operator-vs-method", "transfer", 7, 50, "`{1, 2}.union([3])` works, but `{1, 2} | [3]` raises `TypeError`. Why?"),
    "The methods accept any iterable; the operators require both operands to be sets",
    [
      ["`|` is bitwise OR and doesn't apply to sets", "pipe-not-set", "`|` is the set union operator, but only between sets."],
      ["Lists can't hold numbers", "list-numbers", "The issue is the operand type."],
      ["`.union` converts the result to a list", "union-returns-list", "Both would return sets; only the operator is strict about input."],
    ]),
  mcq(s(ST, "transfer-set-of-floats", "transfer", 8, 60, "What is `len({0.1 + 0.2, 0.3})`?"),
    "`2` — `0.1 + 0.2` is `0.30000000000000004`, a different float from `0.3`",
    [
      ["`1`", "float-set-dedupe", "Floats are deduplicated by exact equality; these differ."],
      ["`TypeError`", "float-unhashable", "Floats are hashable."],
      ["`3`", "set-counts-terms", "The expression is evaluated first."],
    ]),
  mcq(s(ST, "transfer-frozenset-key", "transfer", 8, 60, "You want a dict keyed by *unordered pairs*, so `(\"a\", \"b\")` and `(\"b\", \"a\")` are the same key. Which key type works?"),
    "`frozenset({\"a\", \"b\"})`",
    [
      ["`{\"a\", \"b\"}`", "set-as-key", "A plain set is mutable and unhashable."],
      ["`(\"a\", \"b\")`", "tuple-unordered", "Tuples are ordered, so the two orders are different keys."],
      ["`[\"a\", \"b\"]`", "list-key", "Lists are unhashable."],
    ]),
  num(s(ST, "eval-jaccard", "transfer", 8, 60, "The Jaccard similarity of two sets is the size of their intersection over the size of their union. After `a = set(\"night\")`, `b = set(\"thing\")`, what is `len(a & b) / len(a | b)`?"), 1),
  mcq(s(ST, "transfer-set-mutation-in-loop", "transfer", 9, 75, "What happens on `for x in s: s.add(x + 100)` for a non-empty set `s`?"),
    "`RuntimeError: Set changed size during iteration`",
    [
      ["It adds one shifted copy of each element", "set-loop-snapshot", "Set iteration isn't over a snapshot."],
      ["It loops forever", "set-loop-infinite", "Python detects the size change and raises."],
      ["Nothing — `add` is ignored during iteration", "add-ignored", "The first `add` changes the size, triggering the error."],
    ]),
  num(s(ST, "eval-inclusion-exclusion", "transfer", 9, 75, "After `a = set(range(0, 30, 2))` and `b = set(range(0, 30, 3))`, what is `len(a | b)`?"), 20),
  short(s(ST, "transfer-find-missing", "transfer", 9, 150, "Given a list of IDs that should be exactly `1` to `n` but has some missing and some duplicated, describe a set-based way to report both the missing and the duplicated IDs."),
    [
      ["missing", "Missing: `set(range(1, n + 1)) - set(ids)`", 2, true],
      ["dupes", "Duplicates: track a `seen` set while scanning and collect values already in it (or compare counts)", 2, true],
    ]),
  mcq(s(ST, "transfer-set-pop-arbitrary", "transfer", 10, 90, "Why should code never rely on which element `s.pop()` returns, even if it looks consistent in tests?"),
    "Which element is returned depends on hash layout, which can change with insertion history, set size, and (for strings) per-process hash randomisation",
    [
      ["It always returns the smallest element", "set-pop-min", "That's an accident of small integer hashes, not a guarantee."],
      ["It returns the most recently added element", "set-pop-lifo", "Sets don't track insertion order."],
      ["It returns the first element added", "set-pop-fifo", "Sets don't track insertion order."],
    ]),
  code(s(ST, "code-common-all", "apply", 5, 90, "Write `common(lists)` returning a sorted list of the values that appear in *every* list. `common([[1, 2, 3], [2, 3, 4], [3, 2]])` is `[2, 3]`. An empty input returns `[]`."),
    "def common(lists):\n    pass\n",
    "def common(lists):\n    if not lists:\n        return []\n    shared = set(lists[0])\n    for l in lists[1:]:\n        shared &= set(l)\n    return sorted(shared)\n",
    [
      ["basic", "result = common([[1, 2, 3], [2, 3, 4], [3, 2]])", "result == [2, 3]"],
      ["none", "result = common([[1], [2]])", "result == []"],
      ["single", "result = common([[3, 1, 3]])", "result == [1, 3]"],
      ["empty", "result = (common([]), common([[5], [5]]))", "result == ([], [5])"],
    ]),
  code(s(ST, "code-has-pair", "apply", 6, 90, "Write `has_pair_sum(nums, target)` returning `True` if two different positions hold values summing to `target`, in one pass using a set."),
    "def has_pair_sum(nums, target):\n    pass\n",
    "def has_pair_sum(nums, target):\n    seen = set()\n    for x in nums:\n        if target - x in seen:\n            return True\n        seen.add(x)\n    return False\n",
    [
      ["yes", "result = has_pair_sum([1, 4, 6], 10)", "result is True"],
      ["no", "result = has_pair_sum([1, 2, 3], 7)", "result is False"],
      ["same-value", "result = (has_pair_sum([5], 10), has_pair_sum([5, 5], 10))", "result == (False, True)"],
    ]),
];

// ---------------------------------------------------------------------------
// python-loops
// ---------------------------------------------------------------------------
const LP = "python-loops";
const loops: Item[] = [
  mcq(s(LP, "recall-enumerate-purpose", "recall", 1, 15, "What does `enumerate` add to a loop?"),
    "A running index alongside each element",
    [
      ["Sorting", "enumerate-sorts", "`enumerate` preserves order."],
      ["A count of the total number of elements", "enumerate-counts", "That's `len`; `enumerate` numbers each element."],
      ["Removal of duplicates", "enumerate-dedupes", "It yields every element."],
    ]),
  mcq(s(LP, "recall-zip-purpose", "recall", 1, 15, "What does `zip(a, b)` let a loop do?"),
    "Walk two sequences in step, one pair at a time",
    [
      ["Compress the data", "zip-compresses", "Despite the name, `zip` pairs elements; it doesn't compress."],
      ["Join `a` and `b` end to end", "zip-concat", "That's `a + b` or `itertools.chain`."],
      ["Sort both together", "zip-sorts", "`zip` keeps the original order."],
    ]),
  mcq(s(LP, "recall-any-all", "recall", 2, 20, "What does `any(x > 10 for x in nums)` return?"),
    "`True` if at least one element is greater than $10$",
    [
      ["`True` only if every element is greater than $10$", "any-is-all", "That's `all`."],
      ["The first element greater than $10$", "any-returns-elem", "`any` returns a `bool`."],
      ["The number of elements greater than $10$", "any-counts", "Counting would be `sum(x > 10 for x in nums)`."],
    ]),
  num(s(LP, "eval-enumerate-sum-index", "apply", 3, 30, "What is `sum(i for i, ch in enumerate(\"hello\") if ch == \"l\")`?"), 5),
  num(s(LP, "eval-zip-dot", "apply", 4, 35, "What is `sum(x * y for x, y in zip([1, 2, 3], [4, 5, 6]))`?"), 32),
  mcq(s(LP, "eval-all-empty", "apply", 4, 30, "What is `all([])`?"),
    "`True`",
    [
      ["`False`", "all-empty-false", "`all` is true unless some element is falsy; an empty list has none (vacuous truth)."],
      ["`None`", "all-empty-none", "`all` always returns a `bool`."],
      ["`ValueError`", "all-empty-error", "Empty iterables are fine."],
    ]),
  num(s(LP, "eval-sum-bools", "apply", 4, 35, "What is `sum(c.isupper() for c in \"Hello World\")`?"), 2),
  mcq(s(LP, "apply-zip-strict", "apply", 5, 40, "What does `list(zip([1, 2], [3], strict=True))` do (Python $3.10$+)?"),
    "Raises `ValueError` because the inputs have different lengths",
    [
      ["`[(1, 3)]`", "strict-ignored", "`strict=True` turns silent truncation into an error."],
      ["`[(1, 3), (2, None)]`", "strict-pads", "Nothing is padded."],
      ["`TypeError`", "strict-unknown", "`strict` is a valid keyword from $3.10$."],
    ]),
  num(s(LP, "eval-reversed-enumerate", "apply", 5, 40, "What is `[i for i, _ in reversed(list(enumerate(\"abc\")))][0]`?"), 2),
  short(s(LP, "explain-break-nested-flag", "explain", 6, 120, "Describe two ways to exit *both* loops of a nested `for` as soon as a match is found."),
    [
      ["function-return", "Put the loops in a function and `return` from the inner loop", 2],
      ["flag", "Set a `found` flag, `break` the inner loop, and check the flag to `break` the outer", 2],
      ["for-else", "Or use `for`…`else: continue` followed by `break` in the outer loop", 1],
    ]),
  mcq(s(LP, "transfer-zip-longest", "transfer", 7, 50, "Which call pairs `[1, 2, 3]` with `\"ab\"` and fills the missing slot with `\"-\"`?"),
    "`itertools.zip_longest([1, 2, 3], \"ab\", fillvalue=\"-\")`",
    [
      ["`zip([1, 2, 3], \"ab\", fill=\"-\")`", "zip-fill", "Plain `zip` has no fill option."],
      ["`zip([1, 2, 3], \"ab-\")`", "zip-pad-manually", "That works only by hand-padding this one case."],
      ["`enumerate([1, 2, 3], \"ab\")`", "enumerate-pairs", "`enumerate`'s second argument is the start number."],
    ]),
  mcq(s(LP, "transfer-dict-zip", "transfer", 7, 50, "What is `dict(zip([\"a\", \"b\"], [1, 2]))`?"),
    "`{'a': 1, 'b': 2}`",
    [
      ["`{('a', 1): ('b', 2)}`", "dict-zip-nest", "`dict` treats each pair as a key and value."],
      ["`[('a', 1), ('b', 2)]`", "dict-zip-list", "`dict(...)` returns a dict."],
      ["`TypeError`", "dict-zip-error", "`dict` accepts any iterable of pairs."],
    ]),
  num(s(LP, "eval-pairwise-diffs", "transfer", 8, 60, "Consecutive pairs come from zipping a list with itself shifted. After `a = [3, 8, 6, 12]`, what is `max(b - a_ for a_, b in zip(a, a[1:]))`?"), 6),
  mcq(s(LP, "transfer-any-short-circuit", "transfer", 8, 60, "`any(slow_check(x) for x in items)`. If the second item passes, how many times is `slow_check` called?"),
    "Twice — `any` stops at the first `True` and the generator produces values only on demand",
    [
      ["Once per item", "any-evaluates-all", "With a generator, unneeded checks never run."],
      ["Once", "any-checks-first-only", "The first item failed, so the second had to be checked."],
      ["Twice, but only because the list has two items", "any-list-length", "The length doesn't matter; `any` stops early."],
    ]),
  mcq(s(LP, "transfer-any-list-vs-gen", "transfer", 9, 75, "Why can `any([slow_check(x) for x in items])` be far slower than `any(slow_check(x) for x in items)`?"),
    "The square brackets build the whole list first, calling `slow_check` on every item before `any` sees one",
    [
      ["List comprehensions are slower to iterate", "list-iter-slower", "Iteration speed is similar; the cost is the eager calls."],
      ["`any` can't short-circuit lists", "any-list-no-short", "It does stop early on lists — but the list was already fully computed."],
      ["They behave identically", "any-gen-same", "Only the generator avoids unnecessary calls."],
    ]),
  num(s(LP, "eval-unzip-max", "transfer", 9, 75, "After `scores = [(\"a\", 3), (\"b\", 9), (\"c\", 5)]`, `names, vals = zip(*scores)`, what is `vals.index(max(vals))`?"), 1),
  short(s(LP, "transfer-loop-to-vectorised", "transfer", 9, 150, "A loop computes `out[i] = a[i] * w + b[i]` over two lists of a million floats. Explain how the NumPy version would look and why it is much faster."),
    [
      ["vector-form", "`out = a * w + b` on NumPy arrays (one expression)", 2, true],
      ["why", "The loop runs in compiled code over contiguous typed memory, avoiding Python-level iteration and object overhead per element", 2, true],
    ]),
  num(s(LP, "eval-running-total-enumerate", "transfer", 10, 90, "After `a = [5, 1, 4, 2]`, what is `sum(i * x for i, x in enumerate(sorted(a), start=1))`?"), 37),
  code(s(LP, "code-index-of-max", "apply", 4, 75, "Write `argmax(nums)` returning the index of the largest value (the first one, on ties) using `enumerate`. Assume `nums` is non-empty."),
    "def argmax(nums):\n    pass\n",
    "def argmax(nums):\n    best = 0\n    for i, x in enumerate(nums):\n        if x > nums[best]:\n            best = i\n    return best\n",
    [
      ["basic", "result = argmax([3, 9, 2])", "result == 1"],
      ["tie", "result = argmax([7, 7, 1])", "result == 0"],
      ["last", "result = (argmax([1, 2, 5]), argmax([4]))", "result == (2, 0)"],
    ]),
  code(s(LP, "code-interleave", "apply", 6, 90, "Write `interleave(a, b)` that alternates elements from two lists, then appends whatever remains of the longer one. `interleave([1, 2, 3], [\"x\"])` is `[1, \"x\", 2, 3]`."),
    "def interleave(a, b):\n    pass\n",
    "def interleave(a, b):\n    out = []\n    for x, y in zip(a, b):\n        out += [x, y]\n    n = min(len(a), len(b))\n    return out + a[n:] + b[n:]\n",
    [
      ["uneven", "result = interleave([1, 2, 3], [\"x\"])", "result == [1, \"x\", 2, 3]"],
      ["even", "result = interleave([1, 2], [3, 4])", "result == [1, 3, 2, 4]"],
      ["b-longer", "result = interleave([], [5, 6])", "result == [5, 6]"],
    ]),
];

// ---------------------------------------------------------------------------
// python-comprehensions
// ---------------------------------------------------------------------------
const CM = "python-comprehensions";
const comprehensions: Item[] = [
  mcq(s(CM, "recall-what-is", "recall", 1, 15, "What does a list comprehension do?"),
    "Builds a new list by applying an expression to each item of an iterable, optionally filtering",
    [
      ["Sorts a list in place", "comp-sorts", "Comprehensions build new lists; they don't sort."],
      ["Compresses a list to save memory", "comp-compresses", "Nothing is compressed."],
      ["Checks whether a list is valid", "comp-validates", "It constructs a list."],
    ]),
  mcq(s(CM, "recall-filter-position", "recall", 2, 20, "Where does a filtering `if` go in a list comprehension?"),
    "After the `for` clause: `[x for x in a if x > 0]`",
    [
      ["Before the `for`: `[x if x > 0 for x in a]`", "filter-before-for", "An `if` before `for` must have an `else` — it's a conditional expression, not a filter."],
      ["Outside the brackets", "filter-outside", "The filter is part of the comprehension."],
      ["Comprehensions can't filter", "comp-no-filter", "A trailing `if` clause filters."],
    ]),
  num(s(CM, "eval-squares-even", "apply", 3, 30, "What is `sum([x * x for x in range(6) if x % 2 == 0])`?"), 20),
  num(s(CM, "eval-nested-flatten", "apply", 4, 35, "What is `len([c for w in [\"ab\", \"cde\"] for c in w])`?"), 5),
  mcq(s(CM, "eval-conditional-expr", "apply", 4, 35, "What is `[\"even\" if n % 2 == 0 else \"odd\" for n in range(3)]`?"),
    "`['even', 'odd', 'even']`",
    [
      ["`['even', 'even']`", "cond-expr-filters", "A conditional expression maps every item; it doesn't filter."],
      ["`['odd', 'even', 'odd']`", "range-starts-one", "`range(3)` starts at $0$, which is even."],
      ["`SyntaxError`", "cond-expr-invalid", "`a if c else b` is valid as the output expression."],
    ]),
  mcq(s(CM, "eval-dict-comp-filter", "apply", 4, 35, "What is `{k: v for k, v in {\"a\": 1, \"b\": 5, \"c\": 3}.items() if v > 2}`?"),
    "`{'b': 5, 'c': 3}`",
    [
      ["`{'a': 1}`", "dict-filter-inverted", "The filter keeps values greater than $2$."],
      ["`[5, 3]`", "dict-comp-list", "Braces with `k: v` make a dict."],
      ["`{5, 3}`", "dict-comp-set", "`k: v` makes a dict; a single expression would make a set."],
    ]),
  num(s(CM, "eval-nested-pairs", "apply", 5, 40, "What is `len([(i, j) for i in range(4) for j in range(4) if i < j])`?"), 6),
  mcq(s(CM, "eval-matrix-transpose", "apply", 5, 45, "After `m = [[1, 2, 3], [4, 5, 6]]`, what is `[[row[i] for row in m] for i in range(3)]`?"),
    "`[[1, 4], [2, 5], [3, 6]]`",
    [
      ["`[[1, 2, 3], [4, 5, 6]]`", "transpose-identity", "The outer loop is over columns, so rows and columns swap."],
      ["`[1, 4, 2, 5, 3, 6]`", "transpose-flat", "The nested comprehension produces nested lists."],
      ["`IndexError`", "transpose-index", "Each row has three elements, so `row[0]` to `row[2]` exist."],
    ]),
  num(s(CM, "eval-set-comp-len", "apply", 5, 40, "What is `len({w[0] for w in [\"apple\", \"avocado\", \"banana\", \"cherry\", \"blueberry\"]})`?"), 3),
  short(s(CM, "explain-clause-order", "explain", 6, 120, "In `[x * y for x in xs for y in ys]`, which loop is the outer one? Explain by writing the equivalent nested `for` loops."),
    [
      ["outer", "The first `for` (`x in xs`) is the outer loop", 2, true],
      ["equivalent", "Writes `for x in xs:` / `for y in ys:` / `result.append(x * y)`", 2, true],
    ]),
  mcq(s(CM, "transfer-walrus-in-comp", "transfer", 8, 60, "What does `[y for x in data if (y := f(x)) > 0]` achieve over `[f(x) for x in data if f(x) > 0]`?"),
    "It calls `f` once per item instead of twice, reusing the result in the output",
    [
      ["It sorts the results", "walrus-sorts", "Nothing is sorted."],
      ["It's a syntax error", "walrus-comp-invalid", "Assignment expressions are allowed in comprehension conditions."],
      ["It calls `f` only for positive items", "walrus-skips-calls", "`f` must still be called on each item to test it."],
    ]),
  mcq(s(CM, "transfer-comp-scope", "transfer", 8, 60, "After `x = 10` and `ys = [x for x in range(3)]`, what is `x`?"),
    "`10` — a comprehension's loop variable lives in its own scope in Python $3$",
    [
      ["`2`", "comp-var-leaks", "Leaking happened in Python $2$; Python $3$ isolates it."],
      ["`NameError`", "comp-deletes-var", "The outer `x` is untouched."],
      ["`[0, 1, 2]`", "comp-assigns-var", "`ys` holds the list."],
    ]),
  num(s(CM, "eval-primes-comp", "transfer", 9, 75, "What is `len([n for n in range(2, 50) if all(n % d for d in range(2, int(n ** 0.5) + 1))])`?"), 15),
  mcq(s(CM, "transfer-generator-reuse", "transfer", 8, 60, "`g = (x * x for x in range(4))`. What is `[sum(g), sum(g)]`?"),
    "`[14, 0]` — the generator is exhausted by the first `sum`",
    [
      ["`[14, 14]`", "genexp-reusable", "Generator expressions run once; use a list to reuse."],
      ["`[14, None]`", "exhausted-none", "An exhausted generator yields nothing, and `sum` of nothing is $0$."],
      ["`StopIteration`", "sum-exhausted-raises", "`sum` handles the end of iteration normally."],
    ]),
  num(s(CM, "eval-pythagorean", "transfer", 9, 75, "What is `len([(a, b, c) for c in range(1, 21) for b in range(1, c) for a in range(1, b) if a * a + b * b == c * c])`?"), 6),
  short(s(CM, "transfer-comprehension-side-effects", "transfer", 9, 150, "Why is `[db.save(r) for r in records]` considered poor style even though it works, and what should replace it?"),
    [
      ["purpose", "A comprehension is for building a list; here the list of `None`s is thrown away and the point is the side effect", 2, true],
      ["waste", "It allocates a useless list and misleads readers", 1],
      ["fix", "Use a plain `for r in records: db.save(r)` loop", 1, true],
    ]),
  mcq(s(CM, "transfer-class-scope", "transfer", 10, 90, "`class C:` with `n = 2` then `xs = [i * n for i in range(3)]` in the class body raises `NameError: name 'n' is not defined`. Why?"),
    "Class bodies don't create an enclosing scope for nested functions, and a comprehension's body runs in its own function scope",
    [
      ["`n` must be defined after `xs`", "class-order", "`n` is defined first; the issue is scope, not order."],
      ["Comprehensions can't use any outside names", "comp-no-outside", "They can read globals and enclosing function locals — just not class-level names."],
      ["Class attributes need `self.n`", "class-needs-self", "There is no `self` in a class body."],
    ]),
  num(s(CM, "eval-dict-comp-word-lengths", "transfer", 8, 60, "What is `sum({w: len(w) for w in \"the cat the hat\".split()}.values())`?"), 9),
  code(s(CM, "code-flatten-filter", "apply", 5, 90, "Write `positives(rows)` returning a flat list of every positive number in a list of lists, in order, using a single comprehension."),
    "def positives(rows):\n    pass\n",
    "def positives(rows):\n    return [x for row in rows for x in row if x > 0]\n",
    [
      ["basic", "result = positives([[1, -2], [3, 0, 4]])", "result == [1, 3, 4]"],
      ["empty-rows", "result = positives([[], [-1], [2]])", "result == [2]"],
      ["none", "result = (positives([]), positives([[5]]))", "result == ([], [5])"],
    ]),
  code(s(CM, "code-char-positions", "apply", 7, 120, "Write `positions(text)` returning a dict mapping each distinct character to a list of the indices where it occurs, using comprehensions. `positions(\"aba\")` is `{\"a\": [0, 2], \"b\": [1]}`."),
    "def positions(text):\n    pass\n",
    "def positions(text):\n    return {c: [i for i, ch in enumerate(text) if ch == c] for c in dict.fromkeys(text)}\n",
    [
      ["basic", "result = positions(\"aba\")", "result == {\"a\": [0, 2], \"b\": [1]}"],
      ["single", "result = positions(\"zz\")", "result == {\"z\": [0, 1]}"],
      ["empty", "result = (positions(\"\"), positions(\"x\"))", "result == ({}, {\"x\": [0]})"],
    ]),
];

export const pythonSixtyContainersItems: Item[] = [...listOperations, ...tuples, ...dictionaries, ...sets, ...loops, ...comprehensions];
