import type { Item } from "../../lib/assessment/types";
import { code, mcq, num, s, short } from "./python-sixty-shared";

/**
 * Iterators, generators, itertools and classes brought to 60 questions each.
 * Conventions are those of python-sixty-basics.ts; itertools names are
 * imported where a stem uses them. Class questions that need several lines are
 * written with ` / ` between lines and were checked by running the full code.
 */

// ---------------------------------------------------------------------------
// python-iterators
// ---------------------------------------------------------------------------
const IT = "python-iterators";
const iterators: Item[] = [
  mcq(s(IT, "recall-iterable-definition", "recall", 1, 15, "What is an *iterable*?"),
    "Any object you can loop over with `for`, such as a list, string or dict",
    [
      ["Only a list", "iterable-list-only", "Strings, tuples, dicts, files and more are iterable too."],
      ["An object that has already been looped over", "iterable-used", "Iterability is about being loopable."],
      ["A number that can be counted", "iterable-number", "Plain numbers aren't iterable."],
    ]),
  mcq(s(IT, "recall-int-not-iterable", "recall", 1, 15, "What does `for x in 5:` do?"),
    "Raises `TypeError: 'int' object is not iterable`",
    [
      ["Loops $5$ times", "int-iterates-range", "Use `range(5)` to loop a number of times."],
      ["Loops once with `x = 5`", "int-iterates-once", "An `int` can't be iterated at all."],
      ["Loops over the digits", "int-iterates-digits", "Use `str(5)` to iterate digits."],
    ]),
  mcq(s(IT, "recall-iter-of-iterator", "recall", 2, 20, "`it = iter([1, 2])`. What is `iter(it) is it`?"),
    "`True` — an iterator's `__iter__` returns itself",
    [
      ["`False` — `iter` always makes a new iterator", "iter-always-new", "Calling `iter` on an iterator returns the same object."],
      ["`TypeError`", "iter-iterator-error", "Iterators are iterable."],
      ["`False` — it returns a copy", "iter-copies", "Iterators can't be copied by `iter`."],
    ]),
  num(s(IT, "eval-next-twice", "apply", 3, 25, "After `it = iter(\"xyz\")`, `next(it)`, `next(it)`, what is `len(list(it))`?"), 1),
  num(s(IT, "eval-sum-partial", "apply", 3, 30, "After `it = iter([4, 5, 6, 7])`, `next(it)`, what is `sum(it)`?"), 18),
  mcq(s(IT, "eval-next-default", "apply", 3, 25, "After `it = iter([1])`, `next(it)`, what is `next(it, None)`?"),
    "`None`",
    [
      ["`StopIteration`", "next-default-ignored", "The default is returned instead of raising."],
      ["`1`", "next-repeats", "The iterator is exhausted."],
      ["`0`", "next-default-zero", "The given default, `None`, is returned."],
    ]),
  num(s(IT, "eval-in-consumes", "apply", 4, 35, "After `it = iter([1, 2, 3, 4])`, `3 in it`, what is `list(it)[0]`?"), 4),
  mcq(s(IT, "eval-enumerate-iterator", "apply", 4, 35, "After `e = enumerate(\"ab\")`, what is `[next(e), next(e)]`?"),
    "`[(0, 'a'), (1, 'b')]`",
    [
      ["`['a', 'b']`", "enumerate-elements", "`enumerate` yields `(index, element)` pairs."],
      ["`[0, 1]`", "enumerate-indices", "Each step yields a pair."],
      ["`TypeError`", "enumerate-not-iterator", "`enumerate` objects are iterators, so `next` works."],
    ]),
  num(s(IT, "eval-iter-sentinel", "apply", 5, 45, "After `nums = [3, 1, 0, 5]`, `pos = iter(nums)`, what is `sum(iter(lambda: next(pos), 0))`?"), 4),
  short(s(IT, "explain-iterator-protocol", "explain", 6, 120, "Describe the two methods of the iterator protocol and what each must do, including how iteration ends."),
    [
      ["iter", "`__iter__` returns the iterator itself", 1, true],
      ["next", "`__next__` returns the next value", 1, true],
      ["stop", "When there are no more values, `__next__` raises `StopIteration`, which `for` catches to end the loop", 2, true],
    ]),
  mcq(s(IT, "transfer-iterator-vs-iterable-class", "transfer", 7, 60, "A class's `__iter__` returns `self` and keeps its position in an attribute. What goes wrong with two nested loops over the same instance?"),
    "They share one position, so the inner loop exhausts the shared state and the outer loop ends early",
    [
      ["Nothing — each loop gets its own iterator", "self-iter-independent", "Returning `self` means there's only one iterator."],
      ["Python raises `RuntimeError`", "nested-iter-error", "It silently misbehaves."],
      ["The inner loop never runs", "inner-skipped", "The inner loop runs; it's the outer loop that's cut short."],
    ]),
  num(s(IT, "eval-zip-same-iterator", "transfer", 8, 60, "After `it = iter([1, 2, 3, 4, 5, 6])`, what is `len(list(zip(it, it)))`?"), 3),
  mcq(s(IT, "transfer-zip-pairs", "transfer", 8, 60, "After `it = iter([1, 2, 3, 4])`, what is `list(zip(it, it))`?"),
    "`[(1, 2), (3, 4)]` — both arguments are the same iterator, so each tuple takes two consecutive items",
    [
      ["`[(1, 1), (2, 2), (3, 3), (4, 4)]`", "zip-copies-iterator", "`zip` pulls from the one shared iterator twice per tuple."],
      ["`[(1, 3), (2, 4)]`", "zip-splits-halves", "Items are taken alternately, not in halves."],
      ["`[]`", "zip-empty", "Both arguments still have items."],
    ]),
  num(s(IT, "eval-map-lazy-side", "transfer", 8, 60, "After `calls = []`, `m = map(calls.append, range(5))`, `next(m)`, `next(m)`, what is `len(calls)`?"), 2),
  short(s(IT, "transfer-generator-pipeline-once", "transfer", 9, 150, "`rows = (parse(l) for l in f)` is passed to a function that calls `max(rows)` and then `min(rows)`. Explain the bug and two fixes."),
    [
      ["exhausted", "The first call exhausts the generator, so the second sees nothing (raising `ValueError` for an empty sequence)", 2, true],
      ["fix", "Materialise once with `list(...)`, compute both in a single pass, or use `itertools.tee`", 2, true],
    ]),
  mcq(s(IT, "transfer-getitem-iteration", "transfer", 9, 75, "A class defines only `__getitem__(self, i)` returning `i * 2` for `i < 3` and raising `IndexError` otherwise. What is `list(obj)`?"),
    "`[0, 2, 4]` — without `__iter__`, Python falls back to calling `__getitem__` with $0$, $1$, $2$, … until `IndexError`",
    [
      ["`TypeError`, because there's no `__iter__`", "getitem-not-iterable", "The legacy sequence protocol still works."],
      ["`[]`", "getitem-empty", "Indices $0$ to $2$ succeed."],
      ["An infinite loop", "getitem-infinite", "The `IndexError` ends it."],
    ]),
  num(s(IT, "eval-islice-consume", "transfer", 10, 90, "After `from itertools import islice`, `it = iter(range(10))`, `list(islice(it, 3))`, what is `next(it)`?"), 3),
  code(s(IT, "code-countdown-class", "apply", 6, 120, "Write a class `Countdown` whose instances iterate from `n` down to $1$. Each `iter()` call should start a fresh countdown, so the same object can be looped over twice."),
    "class Countdown:\n    def __init__(self, n):\n        self.n = n\n",
    "class Countdown:\n    def __init__(self, n):\n        self.n = n\n\n    def __iter__(self):\n        i = self.n\n        while i > 0:\n            yield i\n            i -= 1\n",
    [
      ["basic", "result = list(Countdown(3))", "result == [3, 2, 1]"],
      ["twice", "c = Countdown(2)\nresult = (list(c), list(c))", "result == ([2, 1], [2, 1])"],
    ]),
  code(s(IT, "code-take", "apply", 5, 90, "Write `take(n, iterable)` returning a list of the first `n` items, stopping early if the iterable runs out. It must work on infinite iterators. Use `iter` and `next`, not `itertools`."),
    "def take(n, iterable):\n    pass\n",
    "def take(n, iterable):\n    it = iter(iterable)\n    out = []\n    for _ in range(n):\n        try:\n            out.append(next(it))\n        except StopIteration:\n            break\n    return out\n",
    [
      ["short", "result = take(5, [1, 2])", "result == [1, 2]"],
      ["infinite", "import itertools\nresult = take(3, itertools.count(7))", "result == [7, 8, 9]"],
      ["zero", "result = (take(0, [1]), take(1, \"ab\"))", "result == ([], [\"a\"])"],
    ]),
];

// ---------------------------------------------------------------------------
// python-generators
// ---------------------------------------------------------------------------
const GN = "python-generators";
const generators: Item[] = [
  mcq(s(GN, "recall-lazy", "recall", 1, 15, "What does it mean that a generator is *lazy*?"),
    "It produces each value only when asked for it, rather than all at once",
    [
      ["It runs slowly", "lazy-slow", "Lazy means on demand, not slow."],
      ["It skips some values", "lazy-skips", "Every value is produced, just later."],
      ["It caches all results", "lazy-caches", "Generators don't store past values."],
    ]),
  mcq(s(GN, "recall-generator-memory", "recall", 1, 15, "Why can `(x * x for x in range(10**9))` be created instantly?"),
    "No squares are computed until something iterates over it",
    [
      ["Python precomputes squares very fast", "genexp-precompute", "Nothing is computed at creation."],
      ["It only holds the first $1000$ values", "genexp-buffer", "It holds no values, only its state."],
      ["`range` is compressed", "range-compressed", "The point is that the generator is lazy."],
    ]),
  mcq(s(GN, "recall-yield-pauses", "recall", 2, 20, "What happens to a generator function's local variables at a `yield`?"),
    "They're kept, and execution resumes from the same point on the next `next()`",
    [
      ["They're reset", "yield-resets", "That's what makes generators different from ordinary returns."],
      ["They become globals", "yield-globals", "They stay local to the paused frame."],
      ["They're deleted", "yield-deletes", "They live as long as the generator object."],
    ]),
  num(s(GN, "eval-yield-sum", "apply", 3, 25, "After `def g(): yield 2; yield 3; yield 4`, what is `sum(g())`?"), 9),
  num(s(GN, "eval-genexp-count", "apply", 3, 25, "What is `sum(1 for c in \"mississippi\" if c == \"s\")`?"), 4),
  mcq(s(GN, "eval-gen-type", "apply", 3, 25, "After `def g(): yield 1`, what is `type(g()).__name__`?"),
    "`'generator'`",
    [
      ["`'function'`", "gen-call-function", "Calling a generator function returns a generator object."],
      ["`'int'`", "gen-call-runs", "The body doesn't run until iterated."],
      ["`'list'`", "gen-call-list", "Nothing is collected into a list."],
    ]),
  num(s(GN, "eval-yield-from", "apply", 4, 35, "After `def g(): yield from range(3); yield from \"ab\"`, what is `len(list(g()))`?"), 5),
  num(s(GN, "eval-infinite-islice", "apply", 4, 35, "After `from itertools import islice, count`, what is `sum(islice((n * n for n in count(1)), 4))`?"), 30),
  mcq(s(GN, "apply-return-value-stop", "apply", 5, 40, "After `def g(): yield 1; return 99`, `it = g()`, `next(it)`, what does the second `next(it)` do?"),
    "Raises `StopIteration` whose `.value` is $99$",
    [
      ["Returns `99`", "gen-return-yields", "`return` ends the generator; its value travels on the `StopIteration`."],
      ["Returns `None`", "gen-return-none", "It raises rather than returning."],
      ["Returns `1` again", "gen-restarts", "Generators don't restart."],
    ]),
  num(s(GN, "apply-send", "apply", 6, 50, "`def acc():` / (indented) `total = 0` / `while True:` / (indented twice) `x = yield total` / `total += x`. After `g = acc()`, `next(g)` and `g.send(5)`, what does `g.send(3)` return?"), 8),
  short(s(GN, "explain-generator-vs-list", "explain", 6, 120, "Compare `def read(path): return [l for l in open(path)]` with a generator version using `yield`, for a $50$ GB file."),
    [
      ["memory", "The list version loads every line into memory at once, which may not fit", 2, true],
      ["streaming", "The generator yields one line at a time, so memory stays constant and processing can start immediately", 2, true],
    ]),
  mcq(s(GN, "transfer-generator-close-finally", "transfer", 7, 60, "A generator yields inside `try: ... finally: print(\"closed\")`. A caller takes one value and then drops the generator. When does `closed` print?"),
    "When the generator is closed — explicitly with `.close()`, or when it is garbage-collected (immediately in CPython, once no references remain)",
    [
      ["Never — `finally` only runs if the generator finishes", "gen-finally-never", "Closing raises `GeneratorExit` at the paused `yield`, which runs `finally`."],
      ["Immediately after the first value", "gen-finally-early", "The generator is paused, not finished."],
      ["At program exit only", "gen-finally-exit", "Usually much sooner, when the generator is collected."],
    ]),
  num(s(GN, "eval-pipeline-sum", "transfer", 8, 60, "After `nums = range(1, 11)`, `evens = (n for n in nums if n % 2 == 0)`, `sq = (n * n for n in evens)`, what is `sum(sq)`?"), 220),
  mcq(s(GN, "transfer-stopiteration-inside", "transfer", 8, 60, "Since Python $3.7$, what happens if code inside a generator body accidentally raises `StopIteration` (e.g. an unguarded `next()`)?"),
    "It's converted to `RuntimeError`, so the bug isn't silently mistaken for the generator ending",
    [
      ["The generator quietly ends", "stopiteration-quiet-end", "That was the old behaviour, changed by PEP 479."],
      ["The value is skipped and iteration continues", "stopiteration-skip", "Iteration can't continue past an exception."],
      ["It's ignored", "stopiteration-ignored", "It becomes a `RuntimeError`."],
    ]),
  num(s(GN, "eval-genexp-late-binding", "transfer", 9, 75, "After `data = [1, 2, 3]`, `g = (x * 10 for x in data)`, `data = [7]`, what is `sum(g)`?"), 60),
  mcq(s(GN, "transfer-genexp-first-eager", "transfer", 9, 75, "In `(x for x in a for y in b)`, which iterable is evaluated immediately when the generator expression is created?"),
    "Only `a`, the outermost iterable; `b` is evaluated lazily for each `x`",
    [
      ["Both `a` and `b`", "genexp-all-eager", "Inner iterables are evaluated during iteration."],
      ["Neither", "genexp-none-eager", "The first iterable is evaluated right away, so errors in it surface immediately."],
      ["Only `b`", "genexp-inner-eager", "It's the outermost one."],
    ]),
  short(s(GN, "transfer-coroutine-send", "transfer", 9, 150, "Describe how a running-average generator using `x = yield avg` works with `.send()`, including why the first call must be `next(g)` or `g.send(None)`."),
    [
      ["send", "`g.send(v)` resumes the generator, making the paused `yield` expression evaluate to `v`", 2, true],
      ["prime", "The generator must first run to its first `yield` before it can receive a value, so it's primed with `next(g)`", 2, true],
    ]),
  num(s(GN, "eval-recursive-yield-from", "transfer", 10, 90, "After `def flat(x): yield from ((v for e in x for v in flat(e)) if isinstance(x, list) else [x])`, what is `sum(flat([1, [2, [3, 4]], 5]))`?"), 15),
  code(s(GN, "code-chunks-gen", "apply", 6, 90, "Write a generator `chunks(iterable, n)` yielding lists of `n` consecutive items (the last may be shorter). It must work on iterators, not just lists."),
    "def chunks(iterable, n):\n    pass\n",
    "def chunks(iterable, n):\n    buf = []\n    for x in iterable:\n        buf.append(x)\n        if len(buf) == n:\n            yield buf\n            buf = []\n    if buf:\n        yield buf\n",
    [
      ["basic", "result = list(chunks(range(5), 2))", "result == [[0, 1], [2, 3], [4]]"],
      ["iterator", "result = list(chunks(iter(\"abcd\"), 2))", "result == [[\"a\", \"b\"], [\"c\", \"d\"]]"],
      ["lazy", "import types\nresult = isinstance(chunks([1], 1), types.GeneratorType)", "result is True"],
    ]),
  code(s(GN, "code-fib-gen", "apply", 5, 90, "Write an infinite generator `fibs()` yielding $0$, $1$, $1$, $2$, $3$, $5$, …"),
    "def fibs():\n    pass\n",
    "def fibs():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n",
    [
      ["first", "import itertools\nresult = list(itertools.islice(fibs(), 7))", "result == [0, 1, 1, 2, 3, 5, 8]"],
      ["far", "import itertools\nresult = list(itertools.islice(fibs(), 30, 31))", "result == [832040]"],
    ]),
];

// ---------------------------------------------------------------------------
// python-itertools
// ---------------------------------------------------------------------------
const IX = "python-itertools";
const itertoolsItems: Item[] = [
  mcq(s(IX, "recall-count", "recall", 1, 15, "What does `itertools.count(5)` produce?"),
    "$5$, $6$, $7$, … forever",
    [
      ["The number $5$", "count-is-len", "It's an infinite counter starting at $5$."],
      ["$0$ to $4$", "count-is-range", "That's `range(5)`."],
      ["How many items are in a list", "count-counts", "Use `len` or `list.count` for counting."],
    ]),
  mcq(s(IX, "recall-repeat", "recall", 1, 15, "What does `itertools.repeat(\"x\", 3)` produce?"),
    "`\"x\"`, `\"x\"`, `\"x\"`",
    [
      ["`\"xxx\"`", "repeat-joins", "It yields the object repeatedly; it doesn't join."],
      ["`\"x\"` forever", "repeat-infinite", "With a count of $3$ it stops after three."],
      ["`[\"x\"] * 3` as one list", "repeat-list", "It yields items one at a time."],
    ]),
  mcq(s(IX, "recall-combinations-order", "recall", 2, 20, "Do `combinations` care about order, e.g. is `(\"a\", \"b\")` different from `(\"b\", \"a\")`?"),
    "No — each unordered selection appears once; `permutations` lists every ordering",
    [
      ["Yes, both appear", "combinations-ordered", "That's `permutations`."],
      ["Only for strings", "combinations-strings", "Element type doesn't matter."],
      ["`combinations` includes repeats like `(\"a\", \"a\")`", "combinations-repeats", "That's `combinations_with_replacement`."],
    ]),
  num(s(IX, "eval-combinations-count", "apply", 3, 25, "After `from itertools import combinations`, what is `len(list(combinations(range(6), 2)))`?"), 15),
  num(s(IX, "eval-permutations-count", "apply", 3, 25, "After `from itertools import permutations`, what is `len(list(permutations(\"abcd\", 2)))`?"), 12),
  mcq(s(IX, "eval-chain-from-iterable", "apply", 4, 30, "After `from itertools import chain`, what is `list(chain.from_iterable([[1], [2, 3], []]))`?"),
    "`[1, 2, 3]`",
    [
      ["`[[1], [2, 3], []]`", "chain-no-flatten", "`from_iterable` flattens one level."],
      ["`[1, 2, 3, None]`", "chain-empty-none", "An empty list contributes nothing."],
      ["`TypeError`", "chain-from-iterable-error", "A list of lists is exactly what it expects."],
    ]),
  num(s(IX, "eval-accumulate-mul", "apply", 4, 35, "After `from itertools import accumulate` and `import operator`, what is `list(accumulate([1, 2, 3, 4], operator.mul))[-1]`?"), 24),
  mcq(s(IX, "eval-groupby-runs", "apply", 4, 35, "After `from itertools import groupby`, what is `[(k, len(list(g))) for k, g in groupby(\"aaabbc\")]`?"),
    "`[('a', 3), ('b', 2), ('c', 1)]`",
    [
      ["`[('a', 1), ('b', 1), ('c', 1)]`", "groupby-unique", "Each group contains the whole run."],
      ["`[('aaa', 3), ('bb', 2), ('c', 1)]`", "groupby-key-run", "The key is the element, not the run."],
      ["`{'a': 3, 'b': 2, 'c': 1}`", "groupby-dict", "This builds a list of tuples."],
    ]),
  num(s(IX, "eval-takewhile", "apply", 5, 40, "After `from itertools import takewhile`, what is `sum(takewhile(lambda x: x < 5, [1, 3, 6, 2, 4]))`?"), 4),
  short(s(IX, "explain-groupby-sorted", "explain", 6, 120, "Why does `groupby(\"abab\")` give four groups, and what must you do to group every `a` together?"),
    [
      ["runs", "`groupby` groups only consecutive equal elements (runs), so `a`, `b`, `a`, `b` are four runs", 2, true],
      ["sort", "Sort by the same key first (`groupby(sorted(data))`), or use a dict/`Counter` instead", 2, true],
    ]),
  num(s(IX, "eval-combinations-replacement", "transfer", 7, 50, "After `from itertools import combinations_with_replacement`, what is `len(list(combinations_with_replacement(range(3), 2)))`?"), 6),
  num(s(IX, "eval-zip-longest-fill", "transfer", 7, 50, "After `from itertools import zip_longest`, what is `sum(a * b for a, b in zip_longest([1, 2, 3], [4], fillvalue=1))`?"), 9),
  mcq(s(IX, "transfer-groupby-consumed", "transfer", 8, 60, "After `from itertools import groupby`, what is `[list(g) for k, g in list(groupby(\"aabb\"))]`?"),
    "`[[], ['b']]` — each group shares the underlying iterator, so materialising the outer list first exhausts the earlier groups",
    [
      ["`[['a', 'a'], ['b', 'b']]`", "groupby-groups-independent", "Groups are views on one iterator; advancing `groupby` invalidates earlier groups."],
      ["`[['a'], ['b']]`", "groupby-one-each", "The first group is empty by the time it's read."],
      ["`[]`", "groupby-all-empty", "The last group still has its final item."],
    ]),
  num(s(IX, "eval-pairwise-sum", "transfer", 8, 60, "After `from itertools import pairwise`, what is `sum(b - a for a, b in pairwise([1, 4, 9, 16]))`?"), 15),
  num(s(IX, "eval-compress", "transfer", 8, 60, "After `from itertools import compress`, what is `sum(compress(range(10), [i % 3 == 0 for i in range(10)]))`?"), 18),
  mcq(s(IX, "transfer-product-infinite", "transfer", 9, 75, "Why does `next(product(count(), repeat=2))` hang instead of returning `(0, 0)`?"),
    "`product` first converts each input to a tuple, and `count()` never ends",
    [
      ["`product` doesn't support `repeat`", "product-no-repeat", "`repeat` is supported."],
      ["`(0, 0)` is skipped", "product-skips", "It never gets to produce anything."],
      ["`count` must be given a stop value", "count-needs-stop", "`count` is meant to be infinite; `product` just can't consume it lazily."],
    ]),
  num(s(IX, "eval-tee", "transfer", 9, 75, "After `from itertools import tee`, `a, b = tee(iter([1, 2, 3]))`, `next(a)`, what is `sum(b) + sum(a)`?"), 11),
  num(s(IX, "eval-batched", "transfer", 10, 90, "Python $3.12$ added batching. After `from itertools import batched`, what is `len(list(batched(range(10), 4)))`?"), 3),
  code(s(IX, "code-sliding-window", "apply", 6, 90, "Write `windows(seq, n)` returning a list of tuples of every `n` consecutive items, using `itertools` (`tee`/`islice` or similar). `windows([1, 2, 3, 4], 3)` is `[(1, 2, 3), (2, 3, 4)]`."),
    "import itertools\n\ndef windows(seq, n):\n    pass\n",
    "import itertools\n\ndef windows(seq, n):\n    its = itertools.tee(seq, n)\n    for i, it in enumerate(its):\n        for _ in range(i):\n            next(it, None)\n    return list(zip(*its))\n",
    [
      ["three", "result = windows([1, 2, 3, 4], 3)", "result == [(1, 2, 3), (2, 3, 4)]"],
      ["short", "result = (windows([1], 2), windows(\"abc\", 1))", "result == ([], [(\"a\",), (\"b\",), (\"c\",)])"],
    ]),
  code(s(IX, "code-run-lengths", "apply", 5, 90, "Write `runs(seq)` returning a list of `(value, length)` for each run of equal consecutive values, using `itertools.groupby`."),
    "import itertools\n\ndef runs(seq):\n    pass\n",
    "import itertools\n\ndef runs(seq):\n    return [(k, len(list(g))) for k, g in itertools.groupby(seq)]\n",
    [
      ["basic", "result = runs([1, 1, 2, 1])", "result == [(1, 2), (2, 1), (1, 1)]"],
      ["empty", "result = (runs([]), runs(\"zz\"))", "result == ([], [(\"z\", 2)])"],
    ]),
];

// ---------------------------------------------------------------------------
// python-classes
// ---------------------------------------------------------------------------
const CL = "python-classes";
const classes: Item[] = [
  mcq(s(CL, "recall-object-instance", "recall", 1, 15, "What is the relationship between a class and an instance?"),
    "A class is a blueprint; an instance is one object built from it",
    [
      ["They're two words for the same thing", "class-is-instance", "A class can make many distinct instances."],
      ["An instance is a smaller class", "instance-subclass", "Subclasses are classes; instances are objects."],
      ["A class is a list of instances", "class-is-list", "A class defines structure and behaviour."],
    ]),
  mcq(s(CL, "recall-attribute-access", "recall", 1, 15, "How do you read the `name` attribute of an object `p`?"),
    "`p.name`",
    [
      ["`p[\"name\"]`", "attr-subscript", "Subscripting is for containers; attributes use a dot."],
      ["`p->name`", "attr-arrow", "That's C/C++ syntax."],
      ["`name(p)`", "attr-call", "That calls a function named `name`."],
    ]),
  mcq(s(CL, "recall-class-naming", "recall", 1, 15, "By PEP 8 convention, how are class names written?"),
    "`CapWords`, e.g. `BankAccount`",
    [
      ["`snake_case`, e.g. `bank_account`", "class-snake", "That's for functions and variables."],
      ["`ALL_CAPS`, e.g. `BANK_ACCOUNT`", "class-caps", "That's for constants."],
      ["Any style; there's no convention", "class-no-convention", "PEP 8 recommends CapWords."],
    ]),
  num(s(CL, "eval-class-attr-shared", "apply", 3, 30, "After `class C: n = 5` and `a, b = C(), C()`, what is `a.n + b.n`?"), 10),
  num(s(CL, "eval-instance-shadows", "apply", 4, 35, "After `class C: n = 5`, `a, b = C(), C()`, `a.n = 1`, what is `a.n + b.n + C.n`?"), 11),
  mcq(s(CL, "eval-type-name", "apply", 3, 25, "After `class Point: pass` and `p = Point()`, what is `type(p).__name__`?"),
    "`'Point'`",
    [
      ["`'object'`", "type-is-object", "`type(p)` is the class `p` was made from."],
      ["`'p'`", "type-is-variable", "Variable names aren't part of the type."],
      ["`'instance'`", "type-instance", "Python $3$ reports the actual class."],
    ]),
  mcq(s(CL, "apply-dataclass-repr", "apply", 4, 35, "After `from dataclasses import dataclass` and a class `@dataclass class P: x: int; y: int = 0`, what is `repr(P(3))`?"),
    "`'P(x=3, y=0)'`",
    [
      ["`'<P object at 0x...>'`", "dataclass-no-repr", "`@dataclass` generates a readable `__repr__`."],
      ["`'P(3)'`", "dataclass-repr-positional", "The generated repr names every field."],
      ["`'P(x=3)'`", "dataclass-repr-skips-default", "Fields with defaults are included too."],
    ]),
  num(s(CL, "eval-vars-len", "apply", 4, 35, "After `class P: pass`, `p = P()`, `p.a = 1`, `p.b = 2`, what is `len(vars(p))`?"), 2),
  num(s(CL, "eval-setattr", "apply", 5, 40, "After `class P: pass`, `p = P()`, `setattr(p, \"score\", 9)`, what is `getattr(p, \"score\", 0) + getattr(p, \"bonus\", 1)`?"), 10),
  mcq(s(CL, "apply-dataclass-eq", "apply", 5, 40, "After `from dataclasses import dataclass` and `@dataclass class P: x: int`, what is `P(1) == P(1)`?"),
    "`True` — `@dataclass` generates an `__eq__` comparing fields",
    [
      ["`False`, because they're different objects", "dataclass-identity-eq", "Plain classes compare by identity; dataclasses compare fields."],
      ["`TypeError`", "dataclass-eq-error", "Equality is defined."],
      ["`None`", "dataclass-eq-none", "`==` returns a `bool`."],
    ]),
  short(s(CL, "explain-init-vs-class-attr", "explain", 6, 120, "Why is `items = []` written inside `__init__` as `self.items = []` rather than as a class attribute `items = []`?"),
    [
      ["shared", "A class attribute is one object shared by every instance, so appending through one instance changes all of them", 2, true],
      ["per-instance", "Assigning in `__init__` gives each instance its own list", 2, true],
    ]),
  mcq(s(CL, "transfer-mutable-class-attr", "transfer", 7, 60, "`class Bag:` / (indented) `items = []` / `def add(self, x): self.items.append(x)`. After `a, b = Bag(), Bag()` and `a.add(1)`, what is `b.items`?"),
    "`[1]` — both instances share the one class-level list",
    [
      ["`[]`", "class-list-per-instance", "`self.items` finds the class attribute, and `append` mutates that shared list."],
      ["`AttributeError`", "class-attr-hidden", "Instances can read class attributes."],
      ["`[1, 1]`", "class-list-doubled", "Only one append happened."],
    ]),
  num(s(CL, "eval-counter-class-attr", "transfer", 8, 60, "After `class C: made = 0`, then three objects created via `c = [C() for _ in range(3)]` and `C.made += len(c)`, what is `c[0].made`?"), 3),
  mcq(s(CL, "transfer-frozen-dataclass", "transfer", 8, 60, "`@dataclass(frozen=True) class P: x: int`. What does `P(1).x = 2` do?"),
    "Raises `FrozenInstanceError` (a subclass of `AttributeError`)",
    [
      ["Sets `x` to $2$", "frozen-ignored", "Frozen dataclasses block assignment."],
      ["Returns a new `P(2)`", "frozen-returns-new", "Use `dataclasses.replace` to make a modified copy."],
      ["Silently does nothing", "frozen-silent", "It raises."],
    ]),
  mcq(s(CL, "transfer-default-factory", "transfer", 8, 60, "Why does `@dataclass class B: items: list = []` raise `ValueError`, and what's the fix?"),
    "A mutable default would be shared by every instance; use `field(default_factory=list)`",
    [
      ["Lists can't be dataclass fields", "dataclass-no-list", "They can, with a factory default."],
      ["Defaults must be `None`", "dataclass-default-none", "Immutable defaults like `0` are fine."],
      ["The type hint should be `List`", "dataclass-hint-list", "The hint isn't the problem."],
    ]),
  num(s(CL, "eval-slots-error", "transfer", 9, 75, "After `class P: __slots__ = (\"x\",)` and `p = P()`, `p.x = 1`, what is `hasattr(p, \"__dict__\") + p.x`?"), 1),
  short(s(CL, "transfer-class-or-dict", "transfer", 9, 150, "A codebase passes the same `{\"lat\": ..., \"lon\": ..., \"alt\": ...}` dicts through many functions, and bugs come from misspelled keys. Argue for replacing them with a dataclass, naming two concrete benefits."),
    [
      ["typos", "Misspelled attribute names fail loudly (or are caught by type checkers/IDEs) instead of silently creating or missing keys", 2, true],
      ["other", "Documented fields with types, defaults, generated `__init__`/`__repr__`/`__eq__`, and a place for methods/validation", 2],
    ]),
  num(s(CL, "apply-dataclass-order", "transfer", 10, 90, "After `from dataclasses import dataclass`, a class `@dataclass(order=True) class V: major: int; minor: int` (fields declared in that order), what is `max([V(1, 9), V(2, 0), V(1, 10)]).minor`?"), 0),
  code(s(CL, "code-bank-account", "apply", 5, 90, "Write a class `Account` with `__init__(self, owner, balance=0)`, a `deposit(amount)` method that adds to the balance, and a `withdraw(amount)` method that raises `ValueError` if funds are insufficient."),
    "class Account:\n    pass\n",
    "class Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            raise ValueError(\"insufficient funds\")\n        self.balance -= amount\n",
    [
      ["deposit", "a = Account(\"ann\")\na.deposit(50)\nresult = (a.owner, a.balance)", "result == (\"ann\", 50)"],
      ["withdraw", "a = Account(\"bo\", 20)\na.withdraw(5)\nresult = a.balance", "result == 15"],
      ["overdraw", "a = Account(\"cy\", 10)\ntry:\n    a.withdraw(11)\n    result = 'none'\nexcept ValueError:\n    result = a.balance", "result == 10"],
    ]),
  code(s(CL, "code-dataclass-point", "apply", 6, 90, "Using `@dataclass`, write `Point` with float fields `x` and `y` (default $0$) and a method `dist(self, other)` returning the Euclidean distance."),
    "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    pass\n",
    "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float = 0.0\n    y: float = 0.0\n\n    def dist(self, other):\n        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5\n",
    [
      ["dist", "result = Point(0, 0).dist(Point(3, 4))", "result == 5"],
      ["eq-default", "result = (Point() == Point(0, 0), Point(1).y)", "result == (True, 0)"],
    ]),
];

// ---------------------------------------------------------------------------
// python-methods
// ---------------------------------------------------------------------------
const ME = "python-methods";
const methods: Item[] = [
  mcq(s(ME, "recall-method-is-function", "recall", 1, 15, "What is a method?"),
    "A function defined inside a class, called on its instances",
    [
      ["Any built-in function", "method-builtin", "Built-ins like `len` aren't methods."],
      ["A variable stored on an object", "method-attribute", "That's a data attribute."],
      ["A way to import a module", "method-import", "Methods are functions attached to classes."],
    ]),
  mcq(s(ME, "recall-self-not-passed", "recall", 1, 15, "In `acct.deposit(50)`, how many arguments do you write, and how many does `deposit` receive?"),
    "You write one; it receives two, because `acct` is passed automatically as `self`",
    [
      ["One and one", "self-not-passed", "The instance is passed as the first argument."],
      ["Two and two", "self-explicit", "You don't pass `self` yourself."],
      ["Zero and one", "self-only", "`50` is passed explicitly."],
    ]),
  mcq(s(ME, "recall-property-call", "recall", 2, 20, "`area` is a `@property` on `Circle`. How do you read it?"),
    "`c.area`, with no parentheses",
    [
      ["`c.area()`", "property-call", "A property is accessed like an attribute; calling the result fails unless it's callable."],
      ["`Circle.area(c)`", "property-class-call", "Through the class you'd get the property object itself."],
      ["`c[\"area\"]`", "property-subscript", "Attributes use a dot."],
    ]),
  num(s(ME, "eval-classmethod-count", "apply", 3, 30, "After `class C: n = 0; bump = classmethod(lambda cls: setattr(cls, \"n\", cls.n + 1))`, `C.bump()`, `C().bump()`, what is `C.n`?"), 2),
  num(s(ME, "eval-staticmethod", "apply", 3, 30, "After `class M: add = staticmethod(lambda a, b: a + b)`, what is `M.add(2, 3) + M().add(1, 1)`?"), 7),
  mcq(s(ME, "apply-bound-method", "apply", 4, 35, "After `class A: f = lambda self: 1`, `a = A()`, what is `a.f.__self__ is a`?"),
    "`True` — a bound method remembers the instance it came from",
    [
      ["`False`", "bound-no-self", "Bound methods store the instance in `__self__`."],
      ["`AttributeError`", "bound-no-attr", "Bound methods have `__self__`."],
      ["`None`", "bound-self-none", "It's the instance `a`."],
    ]),
  num(s(ME, "eval-property-computed", "apply", 4, 35, "After `class R: w, h = 3, 4; area = property(lambda self: self.w * self.h)`, `r = R()`, `r.w = 5`, what is `r.area`?"), 20),
  mcq(s(ME, "apply-property-no-setter", "apply", 5, 40, "After `class R: area = property(lambda self: 12)` and `r = R()`, what does `r.area = 5` do?"),
    "Raises `AttributeError` — a property with no setter is read-only",
    [
      ["Sets `area` to $5$", "property-assignable", "Without a setter, assignment is refused."],
      ["Replaces the property for every instance", "property-assign-class", "Instance assignment can't override a data descriptor."],
      ["Silently does nothing", "property-silent", "It raises."],
    ]),
  num(s(ME, "eval-name-mangling", "apply", 5, 45, "After `class A: __secret = 7`, what is `A._A__secret`?"), 7),
  short(s(ME, "explain-classmethod-factory", "explain", 6, 120, "Why are alternative constructors like `Date.from_string(\"2024-03-05\")` written as `@classmethod` rather than `@staticmethod`?"),
    [
      ["cls", "A classmethod receives `cls`, so it can call `cls(...)` to build the instance", 2, true],
      ["subclass", "Called on a subclass, `cls` is that subclass, so the factory returns the right type (a staticmethod hard-coding `Date(...)` wouldn't)", 2, true],
    ]),
  mcq(s(ME, "transfer-property-setter-validate", "transfer", 7, 60, "Why might you turn a public attribute `temp` into a property with a setter, without changing any calling code?"),
    "To add validation or conversion on assignment while keeping `obj.temp = x` syntax",
    [
      ["Properties are faster than attributes", "property-faster", "They add a small overhead."],
      ["Properties make values private", "property-private", "Python has no true privacy; properties control access."],
      ["Attributes can't hold floats", "attribute-no-float", "They can hold anything."],
    ]),
  num(s(ME, "eval-cached-property", "transfer", 8, 60, "After `from functools import cached_property`, `calls = []`, `class C: v = cached_property(lambda self: calls.append(1) or 42)`, then `c = C()`, `c.v`, `c.v`, what is `c.v + len(calls)`?"), 43),
  mcq(s(ME, "transfer-method-unbound", "transfer", 8, 60, "`class A:` / (indented) `def f(self): return \"hi\"`. What is `A.f()` (called on the class, with no instance)?"),
    "`TypeError: A.f() missing 1 required positional argument: 'self'`",
    [
      ["`'hi'`", "class-call-binds", "Accessed through the class, `f` is a plain function; nothing fills `self`."],
      ["`None`", "class-call-none", "It raises before running."],
      ["`AttributeError`", "class-call-attr", "`A.f` exists; the call lacks an argument."],
    ]),
  num(s(ME, "eval-method-as-value", "transfer", 8, 60, "After `nums = [3, 1, 2]`, `push = nums.append`, `push(9)`, `push(0)`, what is `len(nums) + nums[-2]`?"), 14),
  mcq(s(ME, "transfer-getattr-fallback", "transfer", 9, 75, "A class defines `__getattr__(self, name)` returning `name.upper()`. For an instance with a real attribute `x = 1`, what are `obj.x` and `obj.y`?"),
    "`1` and `'Y'` — `__getattr__` is called only when normal lookup fails",
    [
      ["`'X'` and `'Y'`", "getattr-always", "That would be `__getattribute__`, which intercepts every lookup."],
      ["`1` and `AttributeError`", "getattr-ignored", "`__getattr__` handles the missing `y`."],
      ["`'X'` and `AttributeError`", "getattr-inverted", "Existing attributes are found normally."],
    ]),
  short(s(ME, "transfer-descriptor", "transfer", 10, 180, "Explain how `@property` works under the hood: what kind of object is stored on the class, and why can't an instance attribute of the same name override it?"),
    [
      ["descriptor", "`property` creates a descriptor object on the class with `__get__` (and `__set__`/`__delete__`)", 2, true],
      ["data-descriptor", "Because it defines `__set__`, it's a data descriptor, which takes precedence over the instance `__dict__` during lookup", 2, true],
    ]),
  num(s(ME, "eval-classmethod-subclass", "transfer", 9, 75, "After `class A: make = classmethod(lambda cls: cls())` and `class B(A): pass`, what is `type(B.make()) is B`, as an integer via `int(type(B.make()) is B)`?"), 1),
  num(s(ME, "eval-instance-counter", "transfer", 9, 75, "After `class P: count = 0; __init__ = lambda self: setattr(P, \"count\", P.count + 1)`, `ps = [P() for _ in range(4)]`, what is `P.count`?"), 4),
  code(s(ME, "code-temperature", "apply", 6, 120, "Write a class `Temp` storing Celsius in `self._c`, with a property `celsius` (getter and setter that raises `ValueError` below $-273.15$) and a read-only property `fahrenheit`."),
    "class Temp:\n    def __init__(self, c):\n        self._c = c\n",
    "class Temp:\n    def __init__(self, c):\n        self.celsius = c\n\n    @property\n    def celsius(self):\n        return self._c\n\n    @celsius.setter\n    def celsius(self, v):\n        if v < -273.15:\n            raise ValueError(\"below absolute zero\")\n        self._c = v\n\n    @property\n    def fahrenheit(self):\n        return self._c * 9 / 5 + 32\n",
    [
      ["get", "t = Temp(100)\nresult = (t.celsius, t.fahrenheit)", "result == (100, 212.0)"],
      ["set", "t = Temp(0)\nt.celsius = 10\nresult = t.fahrenheit", "result == 50.0"],
      ["invalid", "t = Temp(0)\ntry:\n    t.celsius = -300\n    result = 'none'\nexcept ValueError:\n    result = t.celsius", "result == 0"],
    ]),
  code(s(ME, "code-from-string", "apply", 7, 120, "Write a class `Date` with `__init__(self, y, m, d)` storing `y`, `m`, `d`, and a classmethod `from_iso(cls, s)` parsing `\"YYYY-MM-DD\"`. Subclasses calling `from_iso` must get instances of the subclass."),
    "class Date:\n    def __init__(self, y, m, d):\n        self.y, self.m, self.d = y, m, d\n",
    "class Date:\n    def __init__(self, y, m, d):\n        self.y, self.m, self.d = y, m, d\n\n    @classmethod\n    def from_iso(cls, s):\n        y, m, d = (int(p) for p in s.split(\"-\"))\n        return cls(y, m, d)\n",
    [
      ["parse", "x = Date.from_iso(\"2024-03-05\")\nresult = (x.y, x.m, x.d)", "result == (2024, 3, 5)"],
      ["subclass", "class Holiday(Date):\n    pass\nresult = type(Holiday.from_iso(\"2024-12-25\")).__name__", "result == \"Holiday\""],
    ]),
];

// ---------------------------------------------------------------------------
// python-dunder
// ---------------------------------------------------------------------------
const DU = "python-dunder";
const dunder: Item[] = [
  mcq(s(DU, "recall-dunder-name", "recall", 1, 15, "Why are methods like `__init__` called “dunder” methods?"),
    "Their names start and end with **d**ouble **under**scores",
    [
      ["They're “done under” the hood by the compiler", "dunder-backronym", "It's short for double underscore."],
      ["They're deprecated", "dunder-deprecated", "They're core, current Python."],
      ["They can only be called by Python itself", "dunder-uncallable", "You can call them directly, though you usually let Python do it."],
    ]),
  mcq(s(DU, "recall-operator-mapping", "recall", 1, 15, "Which method does `a * b` call first?"),
    "`a.__mul__(b)`",
    [
      ["`a.__times__(b)`", "dunder-times", "Multiplication is `__mul__`."],
      ["`b.__mul__(a)`", "dunder-right-first", "The left operand is tried first; `__rmul__` on `b` is the fallback."],
      ["`a.__pow__(b)`", "dunder-pow", "`__pow__` is `**`."],
    ]),
  mcq(s(DU, "recall-bool-fallback", "recall", 2, 20, "If a class defines no `__bool__` but defines `__len__`, when is an instance falsy?"),
    "When `__len__` returns $0$",
    [
      ["Never — objects are always truthy", "object-always-true", "Without `__bool__`, Python uses `__len__`."],
      ["Always", "object-always-false", "Only a length of $0$ is falsy."],
      ["When `__len__` raises", "len-raises-false", "An exception propagates."],
    ]),
  num(s(DU, "eval-len-dunder", "apply", 3, 25, "After `class Box: __len__ = lambda self: 7`, what is `len(Box()) + bool(Box())`?"), 8),
  mcq(s(DU, "eval-default-repr", "apply", 3, 30, "After `class P: __repr__ = lambda self: \"P()\"`, what is `str([P(), P()])`?"),
    "`'[P(), P()]'`",
    [
      ["`'[<P object>, <P object>]'`", "list-str-ignores-repr", "Containers show their elements using `repr`."],
      ["`'P() P()'`", "list-str-joins", "A list's string keeps its brackets and commas."],
      ["`'[]'`", "list-str-empty", "The list has two elements."],
    ]),
  num(s(DU, "eval-add-dunder", "apply", 4, 35, "After `class N: __init__ = lambda self, v: setattr(self, \"v\", v); __add__ = lambda self, o: N(self.v + o.v)`, what is `(N(2) + N(5) + N(1)).v`?"), 8),
  mcq(s(DU, "eval-contains-dunder", "apply", 4, 35, "After `class Evens: __contains__ = lambda self, x: x % 2 == 0`, what is `[4 in Evens(), 5 in Evens()]`?"),
    "`[True, False]`",
    [
      ["`[False, False]`", "contains-needs-iter", "`in` calls `__contains__` directly."],
      ["`TypeError`", "contains-not-iterable", "`__contains__` alone supports `in`."],
      ["`[True, True]`", "contains-always-true", "`5 % 2 == 0` is `False`."],
    ]),
  num(s(DU, "eval-getitem-dunder", "apply", 4, 35, "After `class Sq: __getitem__ = lambda self, i: i * i`, what is `Sq()[7] - Sq()[3]`?"), 40),
  num(s(DU, "eval-call-dunder", "apply", 5, 40, "After `class Mul: __init__ = lambda self, k: setattr(self, \"k\", k); __call__ = lambda self, x: self.k * x`, `triple = Mul(3)`, what is `triple(5) + triple(triple(1))`?"), 24),
  short(s(DU, "explain-repr-vs-str", "explain", 6, 120, "Explain who `__repr__` and `__str__` are each written for, and what a good `__repr__` looks like."),
    [
      ["audiences", "`__repr__` is for developers (debugging, logs, the REPL); `__str__` is for end users", 2, true],
      ["good-repr", "A good `__repr__` is unambiguous and, ideally, looks like code that recreates the object, e.g. `Point(x=1, y=2)`", 2],
    ]),
  mcq(s(DU, "transfer-radd-sum", "transfer", 7, 60, "`sum([V(1), V(2)])` raises `TypeError` even though `V` defines `__add__`. Why, and what fixes it?"),
    "`sum` starts from `0`, so it first computes `0 + V(1)`; define `__radd__` (handling `0`), or call `sum(vs, V(0))`",
    [
      ["`sum` only works with numbers", "sum-numbers-only", "It works with anything that supports `+` from its start value."],
      ["`__add__` must be a classmethod", "add-classmethod", "It's an ordinary instance method."],
      ["Lists of objects can't be summed", "sum-objects", "They can, with `__radd__` or a start value."],
    ]),
  num(s(DU, "eval-eq-hash-none", "transfer", 8, 60, "After `class E: __eq__ = lambda self, o: True`, what is `int(E.__hash__ is None)`?"), 1),
  mcq(s(DU, "transfer-notimplemented", "transfer", 8, 60, "`V.__add__` returns `NotImplemented` when `other` isn't a `V`. What does `V(1) + \"x\"` do?"),
    "Python tries `str.__radd__`, which doesn't exist, so it raises `TypeError`",
    [
      ["Returns `NotImplemented`", "notimplemented-returned", "The interpreter interprets it as “try the other side,” then raises if nothing works."],
      ["Returns `None`", "notimplemented-none", "It raises `TypeError`."],
      ["Raises `NotImplementedError`", "notimplemented-is-error", "`NotImplemented` (a value) is different from `NotImplementedError` (an exception)."],
    ]),
  num(s(DU, "eval-total-ordering", "transfer", 8, 60, "After `from functools import total_ordering`, a class built as `V = total_ordering(type(\"V\", (), {\"__init__\": lambda s, x: setattr(s, \"x\", x), \"__eq__\": lambda s, o: s.x == o.x, \"__lt__\": lambda s, o: s.x < o.x}))`, what is `int(V(3) >= V(2)) + int(V(1) > V(2))`?"), 1),
  mcq(s(DU, "transfer-iter-dunder", "transfer", 9, 75, "A class defines `__iter__` as a generator yielding $1$, $2$, $3$, but no `__contains__`. What does `2 in obj` do?"),
    "Returns `True` — `in` falls back to iterating with `__iter__`",
    [
      ["Raises `TypeError`", "in-needs-contains", "Iteration is the fallback for membership."],
      ["Returns `False`", "in-false-without-contains", "The fallback finds `2` by iterating."],
      ["Calls `__getitem__`", "in-getitem-first", "`__iter__` is tried before `__getitem__`."],
    ]),
  short(s(DU, "transfer-eq-hash-contract", "transfer", 9, 150, "State the contract between `__eq__` and `__hash__`, and describe the bug that occurs if a mutable object's hash depends on a field that changes after it's been added to a set."),
    [
      ["contract", "Objects that compare equal must have equal hashes", 2, true],
      ["bug", "If the field changes, the object sits in the wrong hash bucket, so `obj in s` can return `False` and duplicates can creep in", 2, true],
    ]),
  num(s(DU, "eval-bool-overrides-len", "transfer", 10, 90, "After `class T: __len__ = lambda self: 0; __bool__ = lambda self: True`, what is `int(bool(T())) * 10 + len(T())`?"), 10),
  num(s(DU, "eval-slice-getitem", "transfer", 10, 90, "After `class S: __getitem__ = lambda self, k: (k.start, k.stop, k.step)`, what is `sum(x or 0 for x in S()[2:9])`?"), 11),
  code(s(DU, "code-vector", "apply", 6, 120, "Write a class `Vec` with `__init__(self, x, y)`, `__add__` returning a new `Vec`, `__eq__` comparing coordinates, `__abs__` returning the length, and `__repr__` giving `Vec(x, y)`."),
    "class Vec:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n",
    "class Vec:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\n    def __add__(self, o):\n        return Vec(self.x + o.x, self.y + o.y)\n\n    def __eq__(self, o):\n        return isinstance(o, Vec) and (self.x, self.y) == (o.x, o.y)\n\n    def __abs__(self):\n        return (self.x ** 2 + self.y ** 2) ** 0.5\n\n    def __repr__(self):\n        return f\"Vec({self.x}, {self.y})\"\n",
    [
      ["add-eq", "result = Vec(1, 2) + Vec(3, 4) == Vec(4, 6)", "result is True"],
      ["abs-repr", "result = (abs(Vec(3, 4)), repr(Vec(1, 2)))", "result == (5.0, \"Vec(1, 2)\")"],
    ]),
  code(s(DU, "code-polynomial-call", "apply", 7, 120, "Write a class `Poly` built from a list of coefficients (constant first), with `__call__(x)` evaluating the polynomial and `__len__` giving the number of coefficients. `Poly([1, 0, 2])(3)` is `19`."),
    "class Poly:\n    def __init__(self, coeffs):\n        self.coeffs = list(coeffs)\n",
    "class Poly:\n    def __init__(self, coeffs):\n        self.coeffs = list(coeffs)\n\n    def __call__(self, x):\n        return sum(c * x ** i for i, c in enumerate(self.coeffs))\n\n    def __len__(self):\n        return len(self.coeffs)\n",
    [
      ["call", "result = Poly([1, 0, 2])(3)", "result == 19"],
      ["len", "result = (len(Poly([5, 4])), Poly([7])(100))", "result == (2, 7)"],
    ]),
];

// ---------------------------------------------------------------------------
// python-inheritance
// ---------------------------------------------------------------------------
const IN = "python-inheritance";
const inheritance: Item[] = [
  mcq(s(IN, "recall-is-a", "recall", 1, 15, "Inheritance models which kind of relationship?"),
    "“is a” — a `Dog` is an `Animal`",
    [
      ["“has a” — a `Car` has an `Engine`", "inheritance-has-a", "“Has a” is composition."],
      ["“uses a”", "inheritance-uses-a", "Using another object is a dependency, not inheritance."],
      ["“equals”", "inheritance-equals", "Inheritance is about types, not equality."],
    ]),
  mcq(s(IN, "recall-inherited-methods", "recall", 1, 15, "`class B(A): pass`. Can a `B` instance call methods defined only in `A`?"),
    "Yes — `B` inherits them",
    [
      ["No, they must be copied into `B`", "methods-not-inherited", "Lookup falls back to the parent class."],
      ["Only `__init__`", "only-init-inherited", "All of `A`'s methods are available."],
      ["Only if `B` calls `super()`", "inherit-needs-super", "`super()` is for extending, not for inheriting."],
    ]),
  mcq(s(IN, "recall-base-object", "recall", 2, 20, "What is the parent of `class A:` when no base is listed?"),
    "`object`",
    [
      ["Nothing", "no-base", "In Python $3$ every class implicitly inherits from `object`."],
      ["`type`", "base-type", "`type` is the metaclass, not the base class."],
      ["`Exception`", "base-exception", "Only exception classes inherit from that."],
    ]),
  num(s(IN, "eval-override", "apply", 3, 30, "After `class A: f = lambda self: 1` and `class B(A): f = lambda self: 2`, what is `A().f() + B().f()`?"), 3),
  num(s(IN, "eval-inherit-attr", "apply", 3, 25, "After `class A: x = 10` and `class B(A): y = 5`, what is `B().x + B.y`?"), 15),
  num(s(IN, "eval-super-call", "apply", 4, 35, "After `class A: f = lambda self: 10` and `class B(A): f = lambda self: super(B, self).f() + 1`, what is `B().f()`?"), 11),
  mcq(s(IN, "eval-issubclass-chain", "apply", 4, 30, "After `class A: pass`, `class B(A): pass`, `class C(B): pass`, what is `[issubclass(C, A), issubclass(A, C)]`?"),
    "`[True, False]`",
    [
      ["`[False, False]`", "subclass-direct-only", "Subclassing is transitive."],
      ["`[True, True]`", "subclass-symmetric", "A parent isn't a subclass of its child."],
      ["`[False, True]`", "subclass-inverted", "`C` derives from `A`, not the reverse."],
    ]),
  mcq(s(IN, "eval-mro-names", "apply", 5, 40, "After `class A: pass`, `class B(A): pass`, `class C(A): pass`, `class D(B, C): pass`, what is `[k.__name__ for k in D.__mro__]`?"),
    "`['D', 'B', 'C', 'A', 'object']`",
    [
      ["`['D', 'B', 'A', 'C', 'object']`", "mro-depth-first", "C3 linearisation puts `A` after both `B` and `C`."],
      ["`['D', 'C', 'B', 'A', 'object']`", "mro-reversed-bases", "Bases are searched in the order listed: `B` then `C`."],
      ["`['D', 'A', 'B', 'C', 'object']`", "mro-base-first", "A class always comes before its parents."],
    ]),
  num(s(IN, "eval-isinstance-tuple", "apply", 5, 40, "After `class A: pass` and `class B(A): pass`, what is `isinstance(B(), (int, A)) + isinstance(A(), B)`?"), 1),
  short(s(IN, "explain-super-init", "explain", 6, 120, "A subclass defines its own `__init__` but forgets to call `super().__init__(...)`. What breaks, and why?"),
    [
      ["not-run", "The parent's `__init__` never runs, because the subclass's `__init__` replaces it", 2, true],
      ["consequence", "Attributes the parent sets up are missing, so inherited methods fail with `AttributeError`", 2, true],
    ]),
  mcq(s(IN, "transfer-composition-choice", "transfer", 7, 60, "A `Stack` should support only `push`, `pop` and `peek`. Why is holding a list (`self._items = []`) better than `class Stack(list)`?"),
    "Inheriting from `list` exposes every list method — `insert`, `sort`, indexing — letting callers break the stack's rules",
    [
      ["Subclassing `list` isn't allowed", "list-final", "You can subclass `list`."],
      ["Composition is always faster", "composition-faster", "Speed isn't the reason."],
      ["`list` methods can't be overridden", "list-no-override", "They can, but you'd have to block dozens of them."],
    ]),
  num(s(IN, "eval-super-chain", "transfer", 8, 60, "After `class A: f = lambda self: [\"A\"]`, `class B(A): f = lambda self: [\"B\"] + super(B, self).f()`, `class C(A): f = lambda self: [\"C\"] + super(C, self).f()`, `class D(B, C): f = lambda self: [\"D\"] + super(D, self).f()`, what is `len(D().f())`?"), 4),
  mcq(s(IN, "transfer-super-cooperative", "transfer", 8, 60, "In the diamond `D(B, C)` where `B` and `C` both inherit from `A` and every method calls `super()`, what does `D().f()` return if each prepends its class name to the parent's list?"),
    "`['D', 'B', 'C', 'A']` — `super()` follows the MRO, so `B`'s `super()` reaches `C`, not `A`",
    [
      ["`['D', 'B', 'A']`", "super-means-parent", "`super()` means “next in the MRO,” not “my parent.”"],
      ["`['D', 'B', 'A', 'C', 'A']`", "super-visits-twice", "Each class appears once in the MRO, so `A` runs once."],
      ["`['D']`", "super-stops", "Every class forwards with `super()`."],
    ]),
  mcq(s(IN, "transfer-abc-instantiate", "transfer", 8, 60, "`class Shape(ABC):` with `@abstractmethod def area(self)`, and `class Sq(Shape): pass`. What does `Sq()` do?"),
    "Raises `TypeError` — `Sq` hasn't implemented the abstract `area`",
    [
      ["Works; `area` returns `None`", "abc-default-none", "Abstract methods block instantiation until overridden."],
      ["Raises `NotImplementedError`", "abc-notimplemented", "The check happens at instantiation, as `TypeError`."],
      ["Works only if `area` is never called", "abc-lazy-check", "The check is eager."],
    ]),
  num(s(IN, "eval-bool-subclass", "transfer", 8, 60, "What is `True + True * 2 + isinstance(False, int)`?"), 4),
  short(s(IN, "transfer-lsp", "transfer", 9, 150, "`Square` inherits from `Rectangle` and overrides `set_width` to also change the height. Explain which principle this violates, with an example of code that breaks."),
    [
      ["lsp", "The Liskov substitution principle: a subclass should work anywhere its parent is expected", 2, true],
      ["example", "E.g. code that sets width $5$ and height $4$ on a rectangle and expects area $20$ gets $16$ with a `Square`", 2, true],
    ]),
  mcq(s(IN, "transfer-mixin-order", "transfer", 9, 75, "Why are mixins conventionally listed before the main base, as in `class View(LoggingMixin, BaseView)`?"),
    "The MRO checks bases left to right, so the mixin's methods run first and can wrap the base's behaviour via `super()`",
    [
      ["Python requires mixins first", "mixin-required-first", "It's a convention, chosen because of MRO order."],
      ["Mixins can't be listed last", "mixin-last-error", "It's allowed, but the mixin would then be shadowed by the base."],
      ["It makes the class faster", "mixin-speed", "Order affects lookup, not speed."],
    ]),
  num(s(IN, "eval-mro-len", "transfer", 10, 90, "After `class A: pass`, `class B(A): pass`, `class C(A): pass`, `class D(B, C): pass`, `class E(D, C): pass`, what is `len(E.__mro__)`?"), 6),
  code(s(IN, "code-shapes", "apply", 5, 90, "Write a base class `Shape` with `area()` raising `NotImplementedError` and a method `describe()` returning the class name, then \" with area \", then the area — e.g. `Square(3).describe()` is `\"Square with area 9\"`. Write `Circle(r)` and `Square(s)` subclasses implementing `area`."),
    "import math\n\nclass Shape:\n    pass\n",
    "import math\n\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n\n    def describe(self):\n        return f\"{type(self).__name__} with area {self.area()}\"\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n\n    def area(self):\n        return math.pi * self.r ** 2\n\nclass Square(Shape):\n    def __init__(self, s):\n        self.s = s\n\n    def area(self):\n        return self.s ** 2\n",
    [
      ["square", "result = Square(3).describe()", "result == \"Square with area 9\""],
      ["circle", "import math\nresult = abs(Circle(1).area() - math.pi) < 1e-12", "result is True"],
      ["base", "try:\n    Shape().area()\n    result = 'none'\nexcept NotImplementedError:\n    result = 'raised'", "result == 'raised'"],
    ]),
  code(s(IN, "code-extend-init", "apply", 6, 90, "Given `class Employee` with `__init__(self, name, salary)`, write `Manager(Employee)` whose `__init__(self, name, salary, reports)` calls `super().__init__` and stores `reports` as a list, plus `team_size()` returning its length."),
    "class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\nclass Manager(Employee):\n    pass\n",
    "class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\nclass Manager(Employee):\n    def __init__(self, name, salary, reports):\n        super().__init__(name, salary)\n        self.reports = list(reports)\n\n    def team_size(self):\n        return len(self.reports)\n",
    [
      ["fields", "m = Manager(\"ann\", 100, [\"bo\", \"cy\"])\nresult = (m.name, m.salary, m.team_size())", "result == (\"ann\", 100, 2)"],
      ["isinstance", "m = Manager(\"x\", 1, [])\nresult = (isinstance(m, Employee), m.team_size())", "result == (True, 0)"],
    ]),
];

export const pythonSixtyIterationClassesItems: Item[] = [
  ...iterators,
  ...generators,
  ...itertoolsItems,
  ...classes,
  ...methods,
  ...dunder,
  ...inheritance,
];
