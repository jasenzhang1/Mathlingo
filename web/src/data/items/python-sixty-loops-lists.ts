import type { Item } from "../../lib/assessment/types";
import { code, mcq, num, s, short } from "./python-sixty-shared";

/**
 * Loops, functions and list basics brought to 60 questions each. Conventions
 * are those of python-sixty-basics.ts: `eval-` items were run in CPython.
 */

// ---------------------------------------------------------------------------
// python-while-loops
// ---------------------------------------------------------------------------
const W = "python-while-loops";
const whileLoops: Item[] = [
  mcq(s(W, "recall-what-repeats", "recall", 1, 15, "What does a `while` loop repeat?"),
    "Its indented body, for as long as its condition is true",
    [
      ["Its condition, until the body becomes true", "while-repeats-condition", "The body repeats; the condition is checked before each pass."],
      ["The whole program", "while-repeats-program", "Only the loop's own body repeats."],
      ["Its body exactly once", "while-once", "That's an `if`; a `while` repeats."],
    ]),
  mcq(s(W, "recall-infinite-loop", "recall", 1, 15, "What is an infinite loop?"),
    "A loop whose condition never becomes false, so it never stops on its own",
    [
      ["A loop over an infinitely long list", "infinite-is-long-list", "Lists are finite; the problem is a condition that stays true."],
      ["A loop with `break` in it", "break-infinite", "`break` is one way to *stop* a loop."],
      ["Any `while` loop", "every-while-infinite", "A `while` loop ends once its condition is false."],
    ]),
  mcq(s(W, "recall-zero-iterations", "recall", 2, 20, "Can a `while` loop's body run zero times?"),
    "Yes — if the condition is false the first time it is checked",
    [
      ["No, the body always runs at least once", "while-do-while", "Python has no do-while; the condition is checked first."],
      ["Only if it contains `break`", "zero-needs-break", "No `break` is needed; a false initial condition skips the body."],
      ["Only for `while False:`", "zero-only-literal", "Any condition that starts false skips the body."],
    ]),
  num(s(W, "eval-halving-count", "apply", 3, 35, "After `n = 100`, `c = 0`, `while n > 1: n //= 2; c += 1`, what is `c`?"), 6),
  num(s(W, "eval-digit-sum", "apply", 4, 40, "After `n = 4096`, `t = 0`, `while n: t += n % 10; n //= 10`, what is `t`?"), 19),
  num(s(W, "eval-compound-condition", "apply", 5, 45, "After `i = 0`, `while i < 5 and i != 3: i += 1`, what is `i`?"), 3),
  mcq(s(W, "apply-off-by-one", "apply", 4, 40, "`i = 1` then `while i < 10: print(i); i += 1`. Which numbers are printed?"),
    "$1$ through $9$",
    [
      ["$1$ through $10$", "while-lt-inclusive", "`i < 10` is false once `i` reaches $10$, so $10$ isn't printed."],
      ["$0$ through $9$", "while-starts-zero", "`i` starts at $1$."],
      ["$2$ through $10$", "increment-before-print", "The print happens before the increment."],
    ]),
  num(s(W, "eval-gcd-loop", "apply", 5, 50, "Euclid's algorithm: after `a, b = 84, 36`, `while b: a, b = b, a % b`, what is `a`?"), 12),
  short(s(W, "explain-loop-invariant", "explain", 7, 150, "In `lo, hi = 0, len(a)` / `while lo < hi:` binary search, explain why the loop is guaranteed to end, in terms of what changes each iteration."),
    [
      ["shrinks", "Each pass sets `lo = mid + 1` or `hi = mid`, so `hi - lo` strictly decreases", 2, true],
      ["bounded", "`hi - lo` is a non-negative integer, so it can only shrink finitely many times before `lo < hi` fails", 2, true],
    ]),
  mcq(s(W, "explain-while-vs-for", "explain", 6, 45, "Which situation is best written with `while` rather than `for`?"),
    "Repeating until a computed value converges, when the number of passes isn't known in advance",
    [
      ["Visiting every item of a list once", "while-for-lists", "That's exactly what `for` is for."],
      ["Counting from $1$ to $100$", "while-for-range", "A known count fits `for i in range(...)`."],
      ["Visiting every key of a dictionary", "while-for-dict", "Iterating a known collection fits `for`."],
    ]),
  num(s(W, "eval-newton-sqrt", "transfer", 8, 75, "After `x = 10.0`, `while abs(x * x - 2) > 1e-12: x = (x + 2 / x) / 2`, what is `round(x, 6)`?"), 1.414214),
  num(s(W, "eval-collatz-max", "transfer", 8, 75, "After `n, m = 6, 6`, `while n != 1: n = n // 2 if n % 2 == 0 else 3 * n + 1; m = max(m, n)`, what is `m`?"), 16),
  mcq(s(W, "transfer-float-loop-never-ends", "transfer", 9, 75, "Why might `x = 0.0` then `while x != 1.0: x += 0.1` never stop?"),
    "Ten additions of `0.1` give `0.9999999999999999`, so `x` steps past `1.0` without ever equalling it",
    [
      ["It stops after $10$ passes, as expected", "float-sum-exact", "Accumulated float error means `x` is never exactly `1.0`."],
      ["`+=` doesn't work on floats", "iadd-float", "`+=` works; the comparison is the problem."],
      ["`!=` can't compare floats", "neq-float", "It can; exact equality is just the wrong test. Use `while x < 1.0` or count steps."],
    ]),
  mcq(s(W, "transfer-mutating-while-pop", "transfer", 8, 60, "`stack = [1, 2, 3]` then `while stack: print(stack.pop())`. What is printed?"),
    "`3`, `2`, `1` — `.pop()` removes from the end, and the loop stops when the list is empty",
    [
      ["`1`, `2`, `3`", "pop-from-front", "`.pop()` with no argument takes the last item."],
      ["It loops forever", "while-list-never-empty", "Each pass removes an item, so the list empties."],
      ["`IndexError` on the fourth pass", "pop-empty-error", "The condition is checked first, so `.pop()` is never called on an empty list."],
    ]),
  short(s(W, "transfer-retry-backoff", "transfer", 9, 180, "Describe a `while` loop that retries a flaky call with exponential backoff: wait $1$, $2$, $4$, … seconds, give up after $5$ attempts, and stop as soon as one succeeds. Name the loop variable(s) and the exit conditions."),
    [
      ["counter", "Tracks attempts with a counter and stops when it reaches $5$", 1, true],
      ["success-exit", "Breaks (or returns) immediately on success", 1, true],
      ["doubling", "Doubles the delay each failure (e.g. `delay *= 2`) and sleeps before retrying", 1, true],
      ["final-failure", "Raises or reports failure once attempts are exhausted (e.g. via `while`…`else` or a check after the loop)", 1],
    ]),
  mcq(s(W, "transfer-continue-skips-increment", "transfer", 9, 75, "`i = 0` then `while i < 5:` with body `if i == 2: continue` followed by `i += 1`. What happens?"),
    "It loops forever: when `i` is $2$, `continue` jumps back before `i += 1` runs",
    [
      ["It runs $5$ times, skipping $2$", "continue-runs-rest", "`continue` skips the rest of the body, including the increment."],
      ["It runs $4$ times", "continue-counts", "Once `i` reaches $2$ it never changes again."],
      ["`SyntaxError`", "continue-while-invalid", "`continue` is valid in a `while` loop."],
    ]),
  num(s(W, "eval-compound-years", "transfer", 10, 90, "After `b, y = 1000.0, 0`, `while b < 2000: b *= 1.07; y += 1`, what is `y`?"), 11),
  code(s(W, "code-reverse-number", "apply", 5, 90, "Write `reverse_digits(n)` that returns the digits of a non-negative integer in reverse order as an `int`, using a `while` loop and `%`/`//` (not strings). `reverse_digits(1230)` is `321`."),
    "def reverse_digits(n):\n    pass\n",
    "def reverse_digits(n):\n    r = 0\n    while n > 0:\n        r = r * 10 + n % 10\n        n //= 10\n    return r\n",
    [
      ["basic", "result = reverse_digits(123)", "result == 321"],
      ["trailing-zero", "result = reverse_digits(1230)", "result == 321"],
      ["single", "result = reverse_digits(7)", "result == 7"],
      ["zero", "result = reverse_digits(0)", "result == 0"],
    ]),
  code(s(W, "code-first-repeat", "apply", 7, 120, "Write `first_repeat(seq)` that walks the list with a `while` loop and returns the first value that has already appeared earlier, or `None` if all values are distinct."),
    "def first_repeat(seq):\n    pass\n",
    "def first_repeat(seq):\n    seen = set()\n    i = 0\n    while i < len(seq):\n        if seq[i] in seen:\n            return seq[i]\n        seen.add(seq[i])\n        i += 1\n    return None\n",
    [
      ["basic", "result = first_repeat([3, 1, 4, 1, 5, 3])", "result == 1"],
      ["none", "result = (first_repeat([1, 2, 3]), first_repeat([2, 2]))", "result == (None, 2)"],
      ["adjacent", "result = first_repeat([\"a\", \"a\"])", "result == \"a\""],
      ["empty", "result = (first_repeat([]), first_repeat([0, 5, 0]))", "result == (None, 0)"],
    ]),
];

// ---------------------------------------------------------------------------
// python-for-loops
// ---------------------------------------------------------------------------
const F = "python-for-loops";
const forLoops: Item[] = [
  mcq(s(F, "recall-loop-variable", "recall", 1, 15, "In `for item in cart:`, what is `item`?"),
    "A name bound to each element of `cart` in turn",
    [
      ["The index of each element", "for-gives-index", "`for` gives elements; use `enumerate` for indices."],
      ["The whole `cart` list", "for-var-is-list", "The loop variable takes one element per pass."],
      ["A keyword", "item-keyword", "`item` is an ordinary variable name you chose."],
    ]),
  mcq(s(F, "recall-range-stop-exclusive", "recall", 1, 15, "Does `range(1, 4)` include $4$?"),
    "No — it produces $1$, $2$, $3$",
    [
      ["Yes — it produces $1$ through $4$", "range-inclusive", "The stop value is excluded."],
      ["It produces only $4$", "range-single", "`range(1, 4)` has three values."],
      ["It produces $0$ through $4$", "range-from-zero", "The start is $1$ here."],
    ]),
  mcq(s(F, "recall-range-step", "recall", 2, 20, "What is the third argument of `range(0, 10, 2)`?"),
    "The step — the gap between consecutive values",
    [
      ["The number of values to produce", "step-is-count", "That would be $2$ values; the step is the increment."],
      ["The number of times to repeat the range", "step-repeats", "`range` doesn't repeat."],
      ["The starting value", "step-is-start", "The start is the first argument."],
    ]),
  num(s(F, "eval-sum-range-step", "apply", 3, 30, "What is `sum(range(0, 20, 5))`?"), 30),
  num(s(F, "eval-len-range-neg", "apply", 4, 35, "What is `len(range(10, 0, -3))`?"), 4),
  num(s(F, "apply-nested-count", "apply", 4, 40, "`c = 0` / `for i in range(4):` / (indented) `for j in range(i):` / (indented twice) `c += 1`. What is `c` afterward?"), 6),
  mcq(s(F, "eval-enumerate-start", "apply", 4, 35, "What is `list(enumerate(\"ab\", start=1))`?"),
    "`[(1, 'a'), (2, 'b')]`",
    [
      ["`[(0, 'a'), (1, 'b')]`", "enumerate-ignores-start", "`start=1` makes the counter begin at $1$."],
      ["`[('a', 1), ('b', 2)]`", "enumerate-order", "`enumerate` yields `(index, value)`."],
      ["`[1, 2]`", "enumerate-indices-only", "`enumerate` pairs each index with its element."],
    ]),
  mcq(s(F, "eval-zip-uneven", "apply", 5, 40, "What is `list(zip([1, 2, 3], \"ab\"))`?"),
    "`[(1, 'a'), (2, 'b')]`",
    [
      ["`[(1, 'a'), (2, 'b'), (3, None)]`", "zip-pads", "`zip` stops at the shortest input; `itertools.zip_longest` pads."],
      ["`ValueError`", "zip-uneven-error", "By default `zip` silently truncates; only `strict=True` raises."],
      ["`[1, 'a', 2, 'b']`", "zip-flattens", "`zip` yields tuples."],
    ]),
  num(s(F, "apply-for-else-found", "apply", 5, 50, "`for i, v in enumerate([4, 7, 9]):` / (indented) `if v > 5: r = i; break` / then `else: r = 99` attached to the `for`. What is `r` afterward?"), 1),
  mcq(s(F, "apply-loop-var-after", "apply", 5, 40, "After `for i in range(3): pass`, what is `i`?"),
    "`2` — the loop variable keeps its last value after the loop",
    [
      ["`3`", "loop-var-past-end", "`range(3)` stops at $2$; the variable is never set to $3$."],
      ["`NameError` — loop variables are local to the loop", "loop-var-scoped", "Python loops don't create a new scope."],
      ["`None`", "loop-var-reset", "Nothing resets it."],
    ]),
  short(s(F, "explain-reversed-vs-slice", "explain", 6, 120, "Compare `for x in reversed(a):` with `for x in a[::-1]:` for a large list. Which uses less memory, and why?"),
    [
      ["reversed-lazy", "`reversed()` returns an iterator that walks the list backward without copying it", 2, true],
      ["slice-copies", "`a[::-1]` builds a whole reversed copy first, using memory proportional to the list", 2, true],
    ]),
  mcq(s(F, "explain-dict-items-loop", "explain", 6, 45, "Which loop visits each key and its value of `d` most directly?"),
    "`for k, v in d.items():`",
    [
      ["`for k, v in d:`", "dict-iter-pairs", "Iterating a dict yields only keys; unpacking each key into two names fails."],
      ["`for k in d.values():`", "values-gives-keys", "`.values()` yields values, not keys."],
      ["`for k, v in enumerate(d):`", "enumerate-dict-values", "That pairs a counter with each key, not with its value."],
    ]),
  mcq(s(F, "transfer-modify-during-iteration", "transfer", 8, 75, "`a = [1, 2, 2, 3]` then `for x in a:` with body `if x == 2: a.remove(x)`. What is `a` afterward?"),
    "`[1, 2, 3]` — removing shifts the next `2` into the slot the loop has already passed",
    [
      ["`[1, 3]`", "remove-during-loop-safe", "The iterator's index skips the element that slid into the removed slot."],
      ["`RuntimeError`", "list-mutation-error", "Lists don't detect this (dicts and sets do); it silently skips."],
      ["`[1, 2, 2, 3]`", "loop-copy", "The loop iterates the live list, and one removal does happen."],
    ]),
  mcq(s(F, "transfer-dict-size-change", "transfer", 8, 60, "What happens on `for k in d: d[k + \"!\"] = 0` when `d` is a non-empty dict?"),
    "`RuntimeError: dictionary changed size during iteration`",
    [
      ["It doubles the dict and stops", "dict-loop-snapshot", "A dict loop does not iterate over a snapshot of the keys."],
      ["It loops forever adding keys", "dict-loop-infinite", "Python detects the size change and raises."],
      ["`KeyError`", "dict-new-key-error", "Assigning a new key is fine; changing size mid-iteration is not."],
    ]),
  num(s(F, "eval-late-binding", "transfer", 9, 75, "After `fs = [lambda: i for i in range(3)]`, what is `sum(f() for f in fs)`?"), 6),
  num(s(F, "eval-default-arg-capture", "transfer", 9, 75, "After `fs = [lambda i=i: i for i in range(3)]`, what is `sum(f() for f in fs)`?"), 3),
  mcq(s(F, "transfer-exhausted-iterator", "transfer", 9, 75, "`z = zip([1, 2], [3, 4])`. The first `for p in z:` loop prints two pairs. What does a second `for p in z:` loop print?"),
    "Nothing — `zip` returns a one-shot iterator that the first loop used up",
    [
      ["The same two pairs again", "zip-reusable", "Iterators can't be rewound; a list could be looped again."],
      ["`StopIteration` is raised", "for-raises-stop", "`for` catches `StopIteration` and simply doesn't run."],
      ["The pairs in reverse", "zip-reverses", "An exhausted iterator yields nothing."],
    ]),
  num(s(F, "eval-matrix-trace", "transfer", 10, 90, "After `m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`, `t = 0`, `for i, row in enumerate(m): t += row[i] - row[-1 - i]`, what is `t`?"), 0),
  code(s(F, "code-running-max", "apply", 5, 90, "Write `running_max(nums)` returning a list where each position holds the largest value seen so far. `running_max([3, 1, 4, 1, 5])` is `[3, 3, 4, 4, 5]`."),
    "def running_max(nums):\n    pass\n",
    "def running_max(nums):\n    out = []\n    best = None\n    for x in nums:\n        best = x if best is None or x > best else best\n        out.append(best)\n    return out\n",
    [
      ["basic", "result = running_max([3, 1, 4, 1, 5])", "result == [3, 3, 4, 4, 5]"],
      ["decreasing", "result = running_max([5, 4, 3])", "result == [5, 5, 5]"],
      ["negative", "result = running_max([-2, -5, -1])", "result == [-2, -2, -1]"],
      ["empty", "result = running_max([])", "result == []"],
    ]),
  code(s(F, "code-pairs-summing", "apply", 7, 120, "Write `pairs_summing(nums, target)` returning every index pair `(i, j)` with `i < j` and `nums[i] + nums[j] == target`, in increasing order of `i` then `j`. Use nested `for` loops."),
    "def pairs_summing(nums, target):\n    pass\n",
    "def pairs_summing(nums, target):\n    out = []\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                out.append((i, j))\n    return out\n",
    [
      ["basic", "result = pairs_summing([1, 2, 3, 4], 5)", "result == [(0, 3), (1, 2)]"],
      ["dupes", "result = pairs_summing([2, 2, 2], 4)", "result == [(0, 1), (0, 2), (1, 2)]"],
      ["none", "result = pairs_summing([1, 1], 5)", "result == []"],
    ]),
];

// ---------------------------------------------------------------------------
// python-functions (49 → 60)
// ---------------------------------------------------------------------------
const FN = "python-functions";
const functions: Item[] = [
  mcq(s(FN, "recall-parameter-vs-argument", "recall", 1, 15, "In `def area(w, h):` and the call `area(3, 4)`, which are the arguments?"),
    "`3` and `4`, the values passed in the call",
    [
      ["`w` and `h`", "args-are-params", "`w` and `h` are parameters, the names in the definition."],
      ["`area`", "arg-is-name", "`area` is the function's name."],
      ["The returned value", "arg-is-return", "Arguments go in; the return value comes out."],
    ]),
  mcq(s(FN, "recall-call-syntax", "recall", 1, 15, "What makes `greet` run, as opposed to just naming it?"),
    "Parentheses: `greet()`",
    [
      ["Writing `greet` on its own line", "bare-name-calls", "A bare name evaluates to the function object without calling it."],
      ["`run greet`", "run-keyword", "Python has no `run` keyword."],
      ["`def greet`", "def-calls", "`def` defines; it doesn't call."],
    ]),
  num(s(FN, "eval-recursive-sum", "apply", 4, 45, "After `def f(n): return 0 if n == 0 else n + f(n - 1)`, what is `f(10)`?"), 55),
  num(s(FN, "eval-multiple-returns", "apply", 4, 40, "After `def mm(a): return min(a), max(a)` and `lo, hi = mm([4, 9, 1])`, what is `hi - lo`?"), 8),
  mcq(s(FN, "eval-return-none-print", "apply", 3, 30, "After `def f(): x = 1`, what is `f()`?"),
    "`None`",
    [
      ["`1`", "last-expr-returned", "Python doesn't return the last value automatically; there's no `return`."],
      ["`NameError`", "f-undefined", "`f` is defined; it just returns nothing."],
      ["`0`", "default-return-zero", "The implicit return value is `None`."],
    ]),
  num(s(FN, "eval-fib-recursive", "apply", 5, 50, "After `def fib(n): return n if n < 2 else fib(n - 1) + fib(n - 2)`, what is `fib(10)`?"), 55),
  short(s(FN, "explain-pure-function", "explain", 6, 120, "What is a *pure* function, and why is a pure function easier to test than one that reads and updates a global variable?"),
    [
      ["definition", "Same inputs always give the same output, with no side effects", 2, true],
      ["testing", "A test only needs to supply arguments and check the return value; no hidden state to set up or reset", 2, true],
    ]),
  mcq(s(FN, "transfer-recursion-limit", "transfer", 8, 60, "`def f(n): return 0 if n == 0 else 1 + f(n - 1)`. What does `f(100000)` do in CPython with default settings?"),
    "Raises `RecursionError` — the default limit is about $1{,}000$ frames",
    [
      ["Returns `100000`", "deep-recursion-ok", "Python doesn't optimise tail calls, so each call adds a frame."],
      ["Runs forever", "recursion-infinite", "The base case would be reached; the stack runs out first."],
      ["Returns `0`", "recursion-base-only", "Each level adds $1$, if it can complete."],
    ]),
  mcq(s(FN, "transfer-default-evaluated-once", "transfer", 9, 75, "`import time` and `def stamp(t=time.time()): return t`. Two calls a second apart both return the same number. Why?"),
    "Default values are evaluated once, when `def` runs, not on each call",
    [
      ["`time.time()` is cached by the `time` module", "time-cached", "`time.time()` changes; it just wasn't called again."],
      ["The two calls happened in the same clock tick", "same-tick", "They're a second apart."],
      ["Functions memoise their results", "auto-memoise", "Python doesn't memoise automatically."],
    ]),
  num(s(FN, "transfer-closure-counter", "transfer", 9, 75, "`def make():` / (indented) `n = 0` / `def inc():` / (indented twice) `nonlocal n; n += 1; return n` / back in `make`: `return inc`. After `c = make()` and two calls `c()`, what does a third `c()` return?"), 3),
  code(s(FN, "code-memo-fib", "apply", 8, 150, "Write `fib(n)` returning the $n$th Fibonacci number (`fib(0) == 0`, `fib(1) == 1`) that is fast for `n = 200`. Recursion with a cache dictionary, or a loop, both work."),
    "def fib(n):\n    pass\n",
    "def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n",
    [
      ["zero", "result = fib(0)", "result == 0"],
      ["ten", "result = fib(10)", "result == 55"],
      ["big", "result = fib(200)", "result == 280571172992510140037611932413038677189525"],
    ]),
];

// ---------------------------------------------------------------------------
// python-lists-intro
// ---------------------------------------------------------------------------
const L = "python-lists-intro";
const listsIntro: Item[] = [
  mcq(s(L, "recall-brackets", "recall", 1, 15, "Which brackets write a list literal?"),
    "Square brackets, `[1, 2]`",
    [
      ["Parentheses, `(1, 2)`", "parens-list", "Parentheses make a tuple."],
      ["Braces, `{1, 2}`", "braces-list", "Braces make a set (or a dict with `key: value`)."],
      ["Angle brackets, `<1, 2>`", "angle-list", "Angle brackets aren't a Python literal."],
    ]),
  mcq(s(L, "recall-append", "recall", 1, 15, "Which method adds one item to the end of a list?"),
    "`.append()`",
    [
      ["`.add()`", "list-add", "`.add()` is for sets."],
      ["`.push()`", "list-push", "Python lists use `.append()`; `push` is JavaScript."],
      ["`.insert()` with no index", "insert-no-index", "`.insert()` needs a position as its first argument."],
    ]),
  num(s(L, "eval-len-nested", "apply", 2, 25, "What is `len([[1, 2, 3], [], [4]])`?"), 3),
  num(s(L, "eval-count", "apply", 3, 25, "What is `[1, 2, 1, 1, 3].count(1)`?"), 3),
  num(s(L, "eval-index-method", "apply", 3, 25, "What is `[\"x\", \"y\", \"z\", \"y\"].index(\"y\")`?"), 1),
  mcq(s(L, "eval-list-equality-order", "apply", 3, 25, "What is `[1, 2] == [2, 1]`?"),
    "`False`",
    [
      ["`True`", "list-eq-unordered", "Lists are ordered; equality compares position by position."],
      ["`TypeError`", "list-eq-error", "Lists support `==`."],
      ["`[False, False]`", "list-eq-elementwise", "Plain lists return a single `bool`; elementwise results are a NumPy thing."],
    ]),
  mcq(s(L, "apply-list-comparison", "apply", 5, 40, "What is `[1, 2, 3] < [1, 3]`?"),
    "`True` — lists compare lexicographically, and at the first difference `2 < 3`",
    [
      ["`False`, because the first list is longer", "list-compare-length", "Length matters only if one list is a prefix of the other."],
      ["`TypeError`", "list-lt-error", "Lists of comparable elements support `<`."],
      ["`False`, because `sum` is larger", "list-compare-sum", "Comparison is item by item, not by total."],
    ]),
  num(s(L, "eval-min-max-strings", "apply", 4, 30, "What is `len(max([\"pear\", \"fig\", \"banana\"]))`?"), 4),
  mcq(s(L, "apply-append-vs-extend", "apply", 5, 40, "`a = [1, 2]` then `a.append([3, 4])`. What is `len(a)`?"),
    "`3` — the whole list `[3, 4]` becomes one element",
    [
      ["`4`", "append-extends", "`.extend()` adds elements one by one; `.append()` adds one object."],
      ["`2`", "append-returns-new", "`.append()` mutates `a` in place."],
      ["`TypeError`", "append-list-error", "Any object, including a list, can be appended."],
    ]),
  mcq(s(L, "apply-append-returns-none", "apply", 5, 40, "`a = [1]` then `a = a.append(2)`. What is `a`?"),
    "`None` — `.append()` mutates in place and returns `None`, which is then assigned to `a`",
    [
      ["`[1, 2]`", "append-returns-list", "In-place list methods return `None`."],
      ["`[1]`", "append-no-effect", "The append happened, but the list was then replaced by `None`."],
      ["`2`", "append-returns-item", "`.append()` returns `None`, not the item."],
    ]),
  short(s(L, "explain-list-vs-array", "explain", 7, 120, "A Python list of a million floats and a NumPy array of a million floats store the same numbers. Explain how their memory layout differs and one consequence for speed."),
    [
      ["list-pointers", "A list stores pointers to separate float objects scattered in memory", 2, true],
      ["array-contiguous", "An array stores raw $8$-byte values contiguously with one dtype", 1, true],
      ["consequence", "So array operations can run in compiled loops without per-element object handling, making them much faster (and smaller)", 1],
    ]),
  mcq(s(L, "transfer-sort-vs-sorted", "transfer", 7, 50, "`a = [3, 1, 2]`. What do `b = sorted(a)` and `c = a.sort()` leave in `b` and `c`?"),
    "`b` is `[1, 2, 3]` and `c` is `None`; `a` is also sorted by the second call",
    [
      ["Both are `[1, 2, 3]`", "sort-returns-list", "`.sort()` sorts in place and returns `None`."],
      ["`b` is `None` and `c` is `[1, 2, 3]`", "sorted-in-place", "`sorted()` returns a new list; `.sort()` returns `None`."],
      ["Both are `None`", "sorted-returns-none", "`sorted()` returns the new list."],
    ]),
  mcq(s(L, "transfer-in-cost", "transfer", 8, 60, "Checking `x in big_list` inside a loop over another big list is slow. What change typically fixes it, and why?"),
    "Convert `big_list` to a `set` once — set membership is a hash lookup, about $O(1)$, versus an $O(n)$ scan",
    [
      ["Sort the list first", "sort-speeds-in", "`in` on a sorted list still scans linearly; only `bisect` would exploit order."],
      ["Use `big_list.index(x)` instead", "index-faster", "`.index()` is also a linear scan, and raises if missing."],
      ["Use a tuple instead", "tuple-faster-in", "Tuple membership is also a linear scan."],
    ]),
  mcq(s(L, "transfer-list-multiplication-aliasing", "transfer", 9, 75, "Which correctly makes three *independent* empty lists?"),
    "`[[] for _ in range(3)]`",
    [
      ["`[[]] * 3`", "star-copies", "`* 3` repeats a reference to one inner list three times."],
      ["`[[]] + [[]] * 2`", "plus-star-copies", "The last two are still the same object."],
      ["`list([]) * 3`", "list-star-empty", "That is `[]` repeated, which is just `[]`."],
    ]),
  num(s(L, "eval-shallow-copy-nested", "transfer", 9, 75, "After `a = [[1], [2]]`, `b = a.copy()`, `b[0].append(9)`, `b[1] = [7]`, what is `len(a[0]) + a[1][0]`?"), 4),
  mcq(s(L, "transfer-clear-vs-rebind", "transfer", 8, 60, "`a = [1, 2]; b = a`. What is the difference between `a.clear()` and `a = []` as far as `b` is concerned?"),
    "`a.clear()` empties the shared list, so `b` becomes `[]`; `a = []` rebinds only `a`, leaving `b` as `[1, 2]`",
    [
      ["No difference — `b` becomes `[]` either way", "rebind-clears", "Rebinding never affects other names."],
      ["No difference — `b` stays `[1, 2]` either way", "clear-copies", "`.clear()` mutates the one list both names refer to."],
      ["`a.clear()` raises because `b` also refers to it", "clear-shared-error", "Shared lists can be mutated freely."],
    ]),
  mcq(s(L, "transfer-sum-of-lists", "transfer", 10, 90, "What is `sum([[1], [2, 3]], [])`?"),
    "`[1, 2, 3]` — the start value `[]` makes `sum` concatenate (correct, but quadratic for many lists)",
    [
      ["`TypeError`", "sum-lists-error", "With a list start value `sum` uses `+`, which concatenates."],
      ["`6`", "sum-flattens-numbers", "`sum` adds the lists, it doesn't add their numbers."],
      ["`[[1], [2, 3]]`", "sum-no-op", "Each list is added to the running result."],
    ]),
  num(s(L, "eval-insert-negative", "transfer", 8, 60, "After `a = [1, 2, 3]`, `a.insert(-1, 9)`, what is `a.index(9)`?"), 2),
  code(s(L, "code-dedupe-keep-order", "apply", 6, 90, "Write `dedupe(items)` returning a new list with duplicates removed, keeping the first occurrence of each value in its original order."),
    "def dedupe(items):\n    pass\n",
    "def dedupe(items):\n    seen = set()\n    out = []\n    for x in items:\n        if x not in seen:\n            seen.add(x)\n            out.append(x)\n    return out\n",
    [
      ["basic", "result = dedupe([3, 1, 3, 2, 1])", "result == [3, 1, 2]"],
      ["strings", "result = dedupe([\"b\", \"a\", \"b\"])", "result == [\"b\", \"a\"]"],
      ["empty", "result = dedupe([])", "result == []"],
      ["no-mutate", "x = [1, 1]\nresult = (dedupe(x), x)", "result == ([1], [1, 1])"],
    ]),
  code(s(L, "code-chunk", "apply", 7, 120, "Write `chunk(items, size)` that splits a list into consecutive sublists of length `size`; the last may be shorter. `chunk([1, 2, 3, 4, 5], 2)` is `[[1, 2], [3, 4], [5]]`."),
    "def chunk(items, size):\n    pass\n",
    "def chunk(items, size):\n    return [items[i:i + size] for i in range(0, len(items), size)]\n",
    [
      ["uneven", "result = chunk([1, 2, 3, 4, 5], 2)", "result == [[1, 2], [3, 4], [5]]"],
      ["even", "result = chunk([1, 2, 3, 4], 2)", "result == [[1, 2], [3, 4]]"],
      ["big", "result = chunk([1, 2], 5)", "result == [[1, 2]]"],
      ["empty", "result = chunk([], 3)", "result == []"],
    ]),
];

// ---------------------------------------------------------------------------
// python-indexing
// ---------------------------------------------------------------------------
const IX = "python-indexing";
const indexing: Item[] = [
  mcq(s(IX, "recall-index-definition", "recall", 1, 15, "What is an index?"),
    "A whole number giving an element's position in a sequence, counting from $0$",
    [
      ["The value stored at a position", "index-is-value", "The index is the position; the element is the value there."],
      ["A sorted copy of the list", "index-is-sorted", "Indexing reads one position; nothing is sorted."],
      ["The number of elements", "index-is-length", "That's the length, `len(a)`."],
    ]),
  mcq(s(IX, "recall-last-valid-index", "recall", 2, 20, "A list has $8$ elements. What is the largest valid non-negative index?"),
    "`7`",
    [
      ["`8`", "last-index-is-len", "Indices start at $0$, so the last is `len - 1`."],
      ["`9`", "last-index-plus-one", "Valid indices are $0$ to $7$."],
      ["`-1`", "largest-is-negative", "`-1` is valid but is not a non-negative index."],
    ]),
  mcq(s(IX, "recall-index-string-immutable", "recall", 2, 20, "`s = \"cat\"`. What does `s[0] = \"b\"` do?"),
    "Raises `TypeError` — strings are immutable",
    [
      ["Makes `s` equal `\"bat\"`", "str-item-assign", "Strings can't be changed in place; build a new one, e.g. `\"b\" + s[1:]`."],
      ["Raises `IndexError`", "str-assign-index", "Index $0$ is valid; assignment is what's not allowed."],
      ["Creates a new variable `s[0]`", "subscript-new-var", "Subscript assignment targets the object, not a new name."],
    ]),
  num(s(IX, "eval-negative-index-arith", "apply", 3, 30, "After `a = [5, 10, 15, 20]`, what is `a[-1] - a[-4]`?"), 15),
  mcq(s(IX, "eval-string-negative", "apply", 3, 25, "What is `\"python\"[-3]`?"),
    "`'h'`",
    [
      ["`'t'`", "neg-index-off-by-one", "`-1` is `'n'`, `-2` is `'o'`, `-3` is `'h'`."],
      ["`'o'`", "neg-index-from-minus-two", "Count back three from the end: `n`, `o`, `h`."],
      ["`'hon'`", "neg-index-slice", "A single index returns one character."],
    ]),
  num(s(IX, "eval-nested-negative", "apply", 4, 35, "After `g = [[1, 2, 3], [4, 5, 6]]`, what is `g[-1][-2]`?"), 5),
  num(s(IX, "eval-index-computed", "apply", 4, 35, "After `a = [10, 20, 30, 40, 50]`, what is `a[len(a) // 2]`?"), 30),
  mcq(s(IX, "eval-index-dict-in-list", "apply", 5, 40, "After `rows = [{\"n\": 1}, {\"n\": 2}]`, what is `rows[1][\"n\"] + rows[0][\"n\"]`?"),
    "`3`",
    [
      ["`'21'`", "dict-values-str", "The values are integers, so `+` adds."],
      ["`KeyError`", "nested-key-error", "Each dict has the key `\"n\"`."],
      ["`TypeError`", "list-str-index", "`rows[1]` is a dict, which is indexed by key."],
    ]),
  mcq(s(IX, "apply-index-assignment-neg", "apply", 4, 35, "After `a = [1, 2, 3]` and `a[-1] = a[0]`, what is `a`?"),
    "`[1, 2, 1]`",
    [
      ["`[3, 2, 3]`", "assign-direction-swap", "The right side, `a[0]` which is $1$, is written into the last slot."],
      ["`[1, 2, 3, 1]`", "neg-assign-appends", "Assignment replaces; it doesn't append."],
      ["`[1, 1, 3]`", "neg-one-is-second", "`a[-1]` is the last element."],
    ]),
  short(s(IX, "explain-index-error-vs-none", "explain", 6, 120, "Some languages return `undefined` for an out-of-range index. Explain the debugging advantage of Python raising `IndexError` instead."),
    [
      ["fail-fast", "The error appears at the exact line where the bad index is used", 2, true],
      ["no-silent-propagation", "A sentinel like `None` would flow onward and cause a confusing failure later, far from the cause", 2],
    ]),
  mcq(s(IX, "transfer-index-tuple-key", "transfer", 7, 50, "`grid` is a list of lists. Why does `grid[1, 2]` raise `TypeError` when `grid[1][2]` works?"),
    "`grid[1, 2]` passes the tuple `(1, 2)` as one index, and lists accept only integers or slices",
    [
      ["Commas aren't allowed in brackets", "comma-index-syntax", "It's valid syntax — NumPy arrays accept exactly this form."],
      ["The grid is too small", "grid-size", "`grid[1][2]` works, so the position exists."],
      ["`grid[1, 2]` means rows $1$ to $2$", "comma-is-slice", "A comma builds a tuple; a range would be `1:2`."],
    ]),
  mcq(s(IX, "transfer-bool-index", "transfer", 8, 60, "What is `[\"no\", \"yes\"][3 > 2]`?"),
    "`'yes'` — `True` is the integer $1$, so it works as an index",
    [
      ["`TypeError`", "bool-not-index", "`bool` is a subclass of `int`, so lists accept it."],
      ["`'no'`", "true-is-zero", "`True == 1`."],
      ["`['yes']`", "bool-index-filters", "A single `bool` is an integer index, not a filter (that's NumPy's boolean masks)."],
    ]),
  num(s(IX, "eval-index-wrap-mod", "transfer", 8, 60, "Circular buffers wrap with modulo. After `a = [3, 6, 9, 12]`, what is `a[(2 + 7) % len(a)]`?"), 6),
  mcq(s(IX, "transfer-neg-index-empty-check", "transfer", 9, 75, "`latest = readings[-1] if readings else None`. Why is the conditional needed?"),
    "`readings[-1]` raises `IndexError` on an empty list; negative indices don't make an empty list safe",
    [
      ["Negative indices are slow without it", "neg-index-slow", "Negative indexing is constant time; the issue is emptiness."],
      ["`readings[-1]` returns the first item on short lists", "neg-short-list", "On any non-empty list `-1` is the last item."],
      ["It isn't needed — `[-1]` of an empty list is `None`", "neg-empty-none", "It raises `IndexError`."],
    ]),
  num(s(IX, "eval-chained-assign-index", "transfer", 9, 75, "After `i = 0`, `a = [0, 0]`, `i = a[i] = 1`, what is `a[0] * 10 + a[1]`?"), 1),
  short(s(IX, "transfer-index-ownership", "transfer", 10, 180, "`x = 0; a = [10, 20]; x, a[x] = 1, 99`. After this line `a` is `[10, 99]`, not `[99, 20]`. Explain why, describing the order in which Python performs the assignments."),
    [
      ["rhs-first", "The right side `(1, 99)` is evaluated first", 1, true],
      ["left-to-right", "Targets are assigned left to right: `x = 1` happens before `a[x]` is evaluated", 2, true],
      ["consequence", "So `a[x]` uses the new `x` of $1$ and sets `a[1] = 99`", 1, true],
    ]),
  num(s(IX, "eval-string-index-ord", "transfer", 10, 75, "After `w = \"python\"`, what is `sum(1 for i in range(len(w)) if w[i] > w[-1 - i])`?"), 3),
  code(s(IX, "code-swap-ends", "apply", 4, 75, "Write `swap_ends(a)` that swaps the first and last elements of a list in place and returns the list. Lists of length $0$ or $1$ are returned unchanged."),
    "def swap_ends(a):\n    pass\n",
    "def swap_ends(a):\n    if len(a) > 1:\n        a[0], a[-1] = a[-1], a[0]\n    return a\n",
    [
      ["basic", "result = swap_ends([1, 2, 3])", "result == [3, 2, 1]"],
      ["two", "result = swap_ends([\"a\", \"b\"])", "result == [\"b\", \"a\"]"],
      ["one", "result = swap_ends([5])", "result == [5]"],
      ["in-place", "x = [1, 2, 3, 4]\nswap_ends(x)\nresult = x", "result == [4, 2, 3, 1]"],
    ]),
  code(s(IX, "code-diagonal", "apply", 6, 90, "Write `anti_diagonal(m)` that returns the elements from the top-right to the bottom-left corner of a square list of lists. For `[[1, 2], [3, 4]]` that is `[2, 3]`."),
    "def anti_diagonal(m):\n    pass\n",
    "def anti_diagonal(m):\n    n = len(m)\n    return [m[i][n - 1 - i] for i in range(n)]\n",
    [
      ["two", "result = anti_diagonal([[1, 2], [3, 4]])", "result == [2, 3]"],
      ["three", "result = anti_diagonal([[1, 2, 3], [4, 5, 6], [7, 8, 9]])", "result == [3, 5, 7]"],
      ["one", "result = anti_diagonal([[7]])", "result == [7]"],
    ]),
];

// ---------------------------------------------------------------------------
// python-slicing
// ---------------------------------------------------------------------------
const SL = "python-slicing";
const slicing: Item[] = [
  mcq(s(SL, "recall-slice-returns", "recall", 1, 15, "What does slicing a list return?"),
    "A new list containing a range of its elements",
    [
      ["A single element", "slice-single", "That is indexing; slicing returns a sequence."],
      ["The original list, shortened in place", "slice-mutates", "Slicing (on the right of `=`) never changes the original."],
      ["The indices of the elements", "slice-indices", "It returns elements, not positions."],
    ]),
  mcq(s(SL, "recall-omitted-start", "recall", 1, 15, "In `a[:4]`, what does the omitted start mean?"),
    "Start from the beginning, index $0$",
    [
      ["Start from index $1$", "omit-start-one", "An omitted start is $0$ for a positive step."],
      ["Start from the end", "omit-start-end", "That's the default only for a negative step."],
      ["It's a syntax error", "omit-start-invalid", "Omitting parts of a slice is allowed."],
    ]),
  num(s(SL, "eval-slice-len", "apply", 2, 25, "What is `len(\"abcdefgh\"[2:6])`?"), 4),
  mcq(s(SL, "eval-slice-neg-start", "apply", 3, 25, "What is `[1, 2, 3, 4, 5][-2:]`?"),
    "`[4, 5]`",
    [
      ["`[5]`", "neg-start-last-only", "`-2:` starts two from the end and runs to the end."],
      ["`[1, 2, 3]`", "neg-slice-front", "That would be `[:-2]`."],
      ["`[4]`", "neg-start-one-item", "The stop is omitted, so it runs to the end."],
    ]),
  mcq(s(SL, "eval-slice-step-three", "apply", 3, 30, "What is `\"abcdefg\"[::3]`?"),
    "`'adg'`",
    [
      ["`'cf'`", "step-starts-at-step", "The start defaults to $0$, so the first character is taken."],
      ["`'abc'`", "step-is-stop", "The third part is the step."],
      ["`'ad'`", "step-excludes-last", "Index $6$ (`'g'`) is within range and is taken."],
    ]),
  mcq(s(SL, "eval-slice-start-past-stop", "apply", 4, 35, "What is `[1, 2, 3, 4][3:1]`?"),
    "`[]`",
    [
      ["`[4, 3]`", "slice-auto-reverse", "With a positive step, a start past the stop gives an empty slice; reversing needs a negative step."],
      ["`IndexError`", "slice-bad-order-error", "Slices never raise for out-of-order bounds."],
      ["`[2, 3, 4]`", "slice-swaps-bounds", "Python doesn't swap the bounds."],
    ]),
  mcq(s(SL, "eval-reverse-partial", "apply", 5, 40, "What is `\"abcdef\"[-1:-4:-1]`?"),
    "`'fed'`",
    [
      ["`'cde'`", "neg-step-forward", "A negative step walks backward from the start index."],
      ["`'fedc'`", "neg-stop-inclusive", "The stop `-4` (`'c'`) is excluded."],
      ["`''`", "neg-step-empty", "Start `-1` is after stop `-4`, which is correct for a negative step."],
    ]),
  num(s(SL, "eval-slice-assign-grow", "apply", 5, 45, "After `a = [1, 2, 3]`, `a[1:2] = [7, 8, 9]`, what is `len(a)`?"), 5),
  mcq(s(SL, "eval-del-slice", "apply", 5, 40, "After `a = list(range(6))` and `del a[::2]`, what is `a`?"),
    "`[1, 3, 5]`",
    [
      ["`[0, 2, 4]`", "del-keeps-slice", "`del` removes the selected elements, the even positions."],
      ["`[]`", "del-slice-all", "Only every second element is removed."],
      ["`TypeError`", "del-slice-error", "`del` works on slices, including stepped ones."],
    ]),
  short(s(SL, "explain-half-open", "explain", 6, 120, "Explain two practical benefits of slices being half-open (`a[i:j]` includes `i` but not `j`)."),
    [
      ["length", "The length is simply `j - i`", 1],
      ["split", "`a[:k] + a[k:]` rebuilds `a` exactly, with no overlap or gap", 2, true],
      ["empty", "`a[i:i]` is naturally empty, which suits insertion via slice assignment", 1],
    ]),
  mcq(s(SL, "transfer-extended-slice-assign-size", "transfer", 8, 60, "`a = [0, 1, 2, 3, 4, 5]`. What does `a[::2] = [9, 9]` do?"),
    "Raises `ValueError` — an extended slice (step not $1$) needs a replacement of exactly the same length, here $3$",
    [
      ["Replaces the first two even positions", "extended-slice-partial", "Extended slice assignment must match the selected count."],
      ["Shrinks `a` to $5$ elements", "extended-slice-resize", "Only step-$1$ slices can change the list's length."],
      ["Makes `a` equal `[9, 9]`", "slice-assign-replaces-all", "Assignment targets only the selected positions."],
    ]),
  mcq(s(SL, "transfer-slice-insert", "transfer", 8, 60, "`a = [1, 4]`. Which statement inserts `2, 3` between the two elements?"),
    "`a[1:1] = [2, 3]`",
    [
      ["`a[1] = [2, 3]`", "index-assign-inserts", "That replaces the element `4` with a nested list."],
      ["`a[1:2] = [2, 3]`", "slice-replace-is-insert", "That replaces `4`, giving `[1, 2, 3]`."],
      ["`a.insert(1, [2, 3])`", "insert-list-splices", "`insert` puts the whole list in as one element."],
    ]),
  mcq(s(SL, "transfer-slice-object", "transfer", 9, 75, "`first3 = slice(0, 3)`. What is `\"abcdef\"[first3]`?"),
    "`'abc'` — `a[0:3]` is shorthand for `a[slice(0, 3)]`",
    [
      ["`TypeError`", "slice-object-invalid", "Sequences accept `slice` objects as indices."],
      ["`'abcd'`", "slice-object-inclusive", "A `slice` object follows the same half-open rule."],
      ["`slice(0, 3, None)`", "slice-not-applied", "Indexing with it applies the slice."],
    ]),
  num(s(SL, "eval-slice-indices", "transfer", 9, 75, "A slice object's indices method normalises it for a given length. What is `sum(slice(-3, None).indices(10))`?"), 18),
  mcq(s(SL, "transfer-numpy-view-trap", "transfer", 9, 75, "`a = np.arange(5)`, `b = a[1:3]`, `b[0] = 99`. What is `a[1]`?"),
    "`99` — NumPy basic slices are views that share memory with the original",
    [
      ["`1`, because slices are copies", "numpy-slice-copy", "List slices copy; NumPy slices don't."],
      ["`IndexError`", "numpy-view-index", "Index $1$ is valid."],
      ["`0`", "numpy-view-reset", "Nothing resets; the view wrote into `a`'s memory."],
    ]),
  num(s(SL, "eval-palindrome-slices", "transfer", 10, 90, "After `w = \"racecar\"`, what is `sum(w[i:] == w[i:][::-1] for i in range(len(w)))`?"), 2),
  num(s(SL, "eval-rotate-slices", "transfer", 8, 60, "Rotating a list left by k places is a[k:] + a[:k]. After `a = [1, 2, 3, 4, 5]` and `k = 7 % len(a)`, what is `(a[k:] + a[:k])[0]`?"), 3),
  short(s(SL, "transfer-copy-depth", "transfer", 9, 150, "`b = a[:]` is called a *shallow* copy. Give an example where changing `b` still changes `a`, and say what would avoid it."),
    [
      ["nested-example", "An example with nested mutable elements, e.g. `a = [[1]]`, `b = a[:]`, `b[0].append(2)` changes `a[0]`", 2, true],
      ["reason", "The outer list is new, but its elements are the same objects", 1, true],
      ["fix", "`copy.deepcopy(a)` (or rebuilding the inner lists)", 1],
    ]),
  code(s(SL, "code-rotate", "apply", 5, 90, "Write `rotate(a, k)` that returns a new list rotated left by `k` places using slicing; `k` may exceed the length. `rotate([1, 2, 3, 4], 1)` is `[2, 3, 4, 1]`. An empty list returns `[]`."),
    "def rotate(a, k):\n    pass\n",
    "def rotate(a, k):\n    if not a:\n        return []\n    k %= len(a)\n    return a[k:] + a[:k]\n",
    [
      ["one", "result = rotate([1, 2, 3, 4], 1)", "result == [2, 3, 4, 1]"],
      ["wrap", "result = rotate([1, 2, 3], 5)", "result == [3, 1, 2]"],
      ["zero", "result = rotate([1, 2], 0)", "result == [1, 2]"],
      ["empty", "result = rotate([], 3)", "result == []"],
    ]),
  code(s(SL, "code-is-palindrome", "apply", 4, 75, "Write `is_palindrome(text)` that returns `True` if the text reads the same backward, ignoring case and spaces. Use a slice to reverse."),
    "def is_palindrome(text):\n    pass\n",
    "def is_palindrome(text):\n    t = text.replace(\" \", \"\").lower()\n    return t == t[::-1]\n",
    [
      ["simple", "result = is_palindrome(\"level\")", "result is True"],
      ["spaces-case", "result = is_palindrome(\"Never odd or even\")", "result is True"],
      ["no", "result = is_palindrome(\"python\")", "result is False"],
    ]),
];

export const pythonSixtyLoopsListsItems: Item[] = [...whileLoops, ...forLoops, ...functions, ...listsIntro, ...indexing, ...slicing];
