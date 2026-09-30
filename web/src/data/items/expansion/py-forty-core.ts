import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Python 40-pass for the core lessons at 38: one very easy item and one hard item each. */
const { mcq, short, num } = makeBuilders(EXPANSION);

export const pyFortyCoreItems: Item[] = [
  // --- python-variables-types ---------------------------------------------
  mcq({ concept: "python-variables-types", slug: "x4-recall-type", cognitive: "recall", level: 1, seconds: 10,
    stem: "What does `type(3.0)` return?" },
    "`<class 'float'>`",
    [["`<class 'int'>`", "vt4-type-int", "The decimal point makes it a float."],
     ["`<class 'str'>`", "vt4-type-str", "No quotes, so not a string."],
     ["`3.0`", "vt4-type-value", "`type` returns the class, not the value."]]),
  short({ concept: "python-variables-types", slug: "x4-transfer-float-repr", cognitive: "transfer", level: 9, seconds: 300,
    stem: "Why is `0.1 + 0.2 == 0.3` `False` in Python, and how should floats be compared or represented when exactness matters?" },
    [["binary", "Floats are IEEE-754 binary doubles; $0.1$, $0.2$ and $0.3$ have no exact binary representation, so the rounded sum differs from the rounded $0.3$ in the last bit.", 5, true],
     ["fix", "Compare with a tolerance (`math.isclose`), or use `decimal.Decimal` (exact decimal arithmetic) or `fractions.Fraction` (exact rationals) when exactness matters, e.g. money.", 4, true]]),

  // --- python-type-conversion ---------------------------------------------
  num({ concept: "python-type-conversion", slug: "x4-apply-int", cognitive: "apply", level: 1, seconds: 10,
    stem: "What is `int('42') + 1`?" }, 43, 0.001),
  short({ concept: "python-type-conversion", slug: "x4-transfer-round", cognitive: "transfer", level: 9, seconds: 300,
    stem: "`round(2.5)` is `2` and `round(3.5)` is `4`, while `int(-2.5)` is `-2`. Explain each rule and when it matters." },
    [["banker", "`round` uses round-half-to-even (banker's rounding): ties go to the even integer, which avoids systematic upward bias when summing many rounded values.", 5, true],
     ["trunc", "`int()` truncates toward zero; `math.floor` rounds down (so `floor(-2.5)` is `-3`); for money use `Decimal.quantize` with an explicit rounding mode.", 4, true]]),

  // --- python-operators ---------------------------------------------------
  num({ concept: "python-operators", slug: "x4-apply-mod", cognitive: "apply", level: 1, seconds: 10,
    stem: "What is `17 % 5`?" }, 2, 0.001),
  short({ concept: "python-operators", slug: "x4-transfer-floor-neg", cognitive: "transfer", level: 9, seconds: 300,
    stem: "Why is `-7 // 2` equal to `-4` and `-7 % 2` equal to `1` in Python (unlike C, where they're $-3$ and $-1$)? What invariant ties them together?" },
    [["floor", "Python's `//` rounds toward negative infinity (floor division), so $-3.5$ becomes $-4$.", 4, true],
     ["invariant", "The invariant `a == (a // b) * b + a % b` then forces `a % b` to take the sign of `b` ($-7 = -4 \\cdot 2 + 1$); this makes `%` convenient for wrapping indices and clock arithmetic.", 5, true]]),

  // --- python-conditionals ------------------------------------------------
  mcq({ concept: "python-conditionals", slug: "x4-recall-else", cognitive: "recall", level: 1, seconds: 10,
    stem: "`x = 5`, then `if x > 3: print('big')` / `else: print('small')`. What is printed?" },
    "`big`",
    [["`small`", "cd4-else-small", "$5 > 3$ is true."],
     ["Both", "cd4-else-both", "Exactly one branch runs."],
     ["Nothing", "cd4-else-none", "The `if` branch runs."]]),
  short({ concept: "python-conditionals", slug: "x4-transfer-match", cognitive: "transfer", level: 9, seconds: 300,
    stem: "How does structural pattern matching (`match`/`case`, Python $3.10$) differ from an `if`/`elif` chain, and what common pitfall does `case NAME:` introduce?" },
    [["destructure", "`match` compares the structure of a value against patterns — sequences, mappings, class patterns with attributes — binding variables as it destructures, with optional guards (`case Point(x, y) if x > 0`).", 5, true],
     ["pitfall", "A bare name like `case RED:` is a capture pattern that always matches and binds `RED`; to compare against a constant you need a dotted name (`case Color.RED:`) or a literal.", 4, true]]),

  // --- python-while-loops -------------------------------------------------
  num({ concept: "python-while-loops", slug: "x4-apply-count", cognitive: "apply", level: 1.5, seconds: 20,
    stem: "`n = 0` / `while n < 3: n += 1`. What is `n` after the loop?" }, 3, 0.001),
  short({ concept: "python-while-loops", slug: "x4-transfer-else", cognitive: "transfer", level: 9, seconds: 300,
    stem: "Python loops can have an `else` clause. When does it run, and give a use where it's clearer than a flag variable." },
    [["when", "The `else` block runs when the loop ends normally (the condition becomes false or the iterable is exhausted), but not when it exits via `break`.", 5, true],
     ["use", "Searching: `for x in items: if match(x): break` / `else: raise NotFound` — the `else` handles “not found” without a `found = False` flag.", 4, true]]),

  // --- python-for-loops ---------------------------------------------------
  num({ concept: "python-for-loops", slug: "x4-apply-range", cognitive: "apply", level: 1, seconds: 10,
    stem: "How many times does `for i in range(5):` run its body?" }, 5, 0.001),
  short({ concept: "python-for-loops", slug: "x4-transfer-closure", cognitive: "transfer", level: 9, seconds: 300,
    stem: "`fns = []` / `for i in range(3): fns.append(lambda: i)`. Why does `[f() for f in fns]` give `[2, 2, 2]`, and how do you fix it?" },
    [["late", "The lambdas close over the variable `i`, not its value at creation; the `for` loop reuses one variable, which is $2$ when the lambdas are finally called.", 5, true],
     ["fix", "Bind the current value: `lambda i=i: i`, or use `functools.partial`, or create the function in a helper whose parameter captures each value.", 4, true]]),

  // --- python-lists-intro -------------------------------------------------
  num({ concept: "python-lists-intro", slug: "x4-apply-len", cognitive: "apply", level: 1, seconds: 10,
    stem: "What is `len([1, 2, 3, 4])`?" }, 4, 0.001),
  short({ concept: "python-lists-intro", slug: "x4-transfer-append-cost", cognitive: "transfer", level: 9, seconds: 300,
    stem: "Why is `list.append` amortised $O(1)$ while `list.insert(0, x)` is $O(n)$? What structure would you use for fast operations at both ends?" },
    [["array", "A list is a dynamic array of pointers; appending usually writes into spare capacity, and when full it over-allocates proportionally, so the occasional $O(n)$ copy averages out to $O(1)$.", 5, true],
     ["insert", "Inserting at the front shifts every element right, costing $O(n)$; `collections.deque` supports $O(1)$ appends and pops at both ends.", 4, true]]),

  // --- python-indexing ----------------------------------------------------
  num({ concept: "python-indexing", slug: "x4-apply-index", cognitive: "apply", level: 1, seconds: 10,
    stem: "`a = [10, 20, 30]`. What is `a[1]`?" }, 20, 0.001),
  short({ concept: "python-indexing", slug: "x4-transfer-nested", cognitive: "transfer", level: 9, seconds: 300,
    stem: "`grid = [[0] * 3] * 3; grid[0][0] = 1`. Why does every row change, and how do you build the grid correctly?" },
    [["alias", "`[row] * 3` repeats a reference to the same inner list three times, so all “rows” are one object; mutating it shows up everywhere.", 5, true],
     ["fix", "Create independent rows: `[[0] * 3 for _ in range(3)]` (the inner `[0] * 3` is fine because integers are immutable).", 4, true]]),

  // --- python-slicing -----------------------------------------------------
  mcq({ concept: "python-slicing", slug: "x4-apply-first-two", cognitive: "apply", level: 1, seconds: 10,
    stem: "`a = [1, 2, 3, 4]`. What is `a[:2]`?" },
    "`[1, 2]`",
    [["`[1, 2, 3]`", "sl4-ft-incl", "The end index is excluded."],
     ["`[3, 4]`", "sl4-ft-last", "That's `a[2:]`."],
     ["`2`", "sl4-ft-elem", "A slice returns a list."]]),
  short({ concept: "python-slicing", slug: "x4-transfer-slice-assign", cognitive: "transfer", level: 9, seconds: 300,
    stem: "What do `a[1:3] = [9, 9, 9, 9]` and `a[::2] = [0, 0]` do to a list `a = [1, 2, 3, 4, 5]`, and why do they behave differently?" },
    [["contiguous", "Assigning to a contiguous slice replaces that section with any number of elements: `[1, 9, 9, 9, 9, 4, 5]` — the list can grow or shrink.", 5, true],
     ["extended", "An extended slice (with a step) must receive exactly as many elements as it selects; `a[::2]` selects $3$ elements, so assigning $2$ raises `ValueError`.", 4, true]]),

  // --- python-list-operations ---------------------------------------------
  mcq({ concept: "python-list-operations", slug: "x4-recall-append", cognitive: "recall", level: 1, seconds: 10,
    stem: "What does `a.append(4)` return?" },
    "`None` — it modifies `a` in place",
    [["The new list", "lo4-app-list", "Mutating methods return `None`."],
     ["`4`", "lo4-app-value", "No."],
     ["The new length", "lo4-app-len", "No."]]),
  short({ concept: "python-list-operations", slug: "x4-transfer-iadd", cognitive: "transfer", level: 9, seconds: 300,
    stem: "`t = ([1],)` then `t[0] += [2]` raises `TypeError`, yet afterwards `t` is `([1, 2],)`. Explain." },
    [["steps", "`t[0] += [2]` first calls `t[0].__iadd__([2])`, which extends the list in place (succeeds), then tries to assign the result back with `t[0] = ...`.", 5, true],
     ["tuple", "The assignment fails because tuples don't support item assignment — but the list was already mutated, so the error and the change both happen.", 4, true]]),

  // --- python-tuples ------------------------------------------------------
  num({ concept: "python-tuples", slug: "x4-apply-len", cognitive: "apply", level: 1, seconds: 10,
    stem: "What is `len((1, 2, 3))`?" }, 3, 0.001),
  short({ concept: "python-tuples", slug: "x4-transfer-hashable", cognitive: "transfer", level: 9, seconds: 300,
    stem: "Tuples can be dict keys, but `{(1, [2]): 'x'}` raises `TypeError`. Why, and what does this reveal about hashability?" },
    [["hash", "A tuple's hash is computed from its elements' hashes; a list inside has no hash (it's mutable), so the tuple is unhashable.", 5, true],
     ["reveal", "Hashability requires the value to be deeply immutable where it matters for equality; immutability of the container alone isn't enough.", 4, true]]),

  // --- python-dictionaries ------------------------------------------------
  num({ concept: "python-dictionaries", slug: "x4-apply-get", cognitive: "apply", level: 1, seconds: 10,
    stem: "`d = {'a': 1}`. What is `d.get('b', 0)`?" }, 0, 0.001),
  short({ concept: "python-dictionaries", slug: "x4-transfer-hash-collide", cognitive: "transfer", level: 9, seconds: 300,
    stem: "`{1: 'a', 1.0: 'b', True: 'c'}` has one key. Why, and what is the key and value?" },
    [["equal", "`1 == 1.0 == True` and they hash equally, so dict treats them as the same key; later assignments overwrite the value.", 5, true],
     ["result", "The first key inserted is kept (`1`), with the last value `'c'`: the dict is `{1: 'c'}`.", 4, true]]),

  // --- python-sets --------------------------------------------------------
  num({ concept: "python-sets", slug: "x4-apply-len", cognitive: "apply", level: 1, seconds: 10,
    stem: "What is `len({1, 2, 2, 3})`?" }, 3, 0.001),
  short({ concept: "python-sets", slug: "x4-transfer-frozenset", cognitive: "transfer", level: 9, seconds: 300,
    stem: "You need a set of sets (e.g. to deduplicate groupings regardless of order). Why does `{ {1, 2} }` fail, and what's the idiom?" },
    [["unhashable", "Sets are mutable and unhashable, so they can't be elements of a set or dict keys.", 4, true],
     ["frozenset", "Use `frozenset`: `{frozenset({1, 2}), frozenset({2, 1})}` has one element, since frozensets are immutable, hashable and compare by contents.", 5, true]]),

  // --- python-loops -------------------------------------------------------
  mcq({ concept: "python-loops", slug: "x4-apply-enumerate", cognitive: "apply", level: 1.5, seconds: 15,
    stem: "What is `list(enumerate(['a', 'b']))`?" },
    "`[(0, 'a'), (1, 'b')]`",
    [["`[(1, 'a'), (2, 'b')]`", "lp4-en-one", "Counting starts at $0$ by default."],
     ["`['a', 'b']`", "lp4-en-plain", "`enumerate` pairs indices with items."],
     ["`[0, 1]`", "lp4-en-idx", "It keeps the items too."]]),
  short({ concept: "python-loops", slug: "x4-transfer-zip-strict", cognitive: "transfer", level: 9, seconds: 300,
    stem: "`zip` silently stops at the shortest input. Why can this hide bugs, and what are the alternatives?" },
    [["bug", "If two lists that should be parallel have different lengths (a dropped record), `zip` truncates without error, silently losing data.", 5, true],
     ["alt", "Use `zip(a, b, strict=True)` (Python $3.10$+) to raise on mismatch, or `itertools.zip_longest` to pad when unequal lengths are expected.", 4, true]]),

  // --- python-comprehensions ----------------------------------------------
  num({ concept: "python-comprehensions", slug: "x4-apply-sum", cognitive: "apply", level: 1.5, seconds: 15,
    stem: "What is `sum([x for x in range(4)])`?" }, 6, 0.001),
  short({ concept: "python-comprehensions", slug: "x4-transfer-scope", cognitive: "transfer", level: 9, seconds: 300,
    stem: "Inside a class body, `class C: xs = [1, 2]; ys = [x * n for x in xs for n in range(len(xs))]` works for `xs` in the first `for`, but a reference to a class variable in the inner `for` or condition raises `NameError`. Why?" },
    [["scope", "A comprehension runs in its own function-like scope; only the first iterable is evaluated in the enclosing (class) scope, and class bodies aren't enclosing scopes for nested functions.", 5, true],
     ["fix", "So later clauses can't see class-level names; compute the needed values beforehand, or move the logic into a method/staticmethod or module-level function.", 4, true]]),

  // --- numpy-arrays -------------------------------------------------------
  num({ concept: "numpy-arrays", slug: "x4-apply-sum", cognitive: "apply", level: 1, seconds: 10,
    stem: "What is `(np.array([1, 2, 3]) * 2).sum()`?" }, 12, 0.001),
  short({ concept: "numpy-arrays", slug: "x4-transfer-vectorise", cognitive: "transfer", level: 9, seconds: 300,
    stem: "Vectorised NumPy is usually far faster than a Python loop. Give two situations where vectorisation doesn't help or even hurts." },
    [["sequential", "Recurrences where each step depends on the previous result (e.g. an IIR filter or path simulation with branching) can't be expressed as one elementwise operation; use Numba/Cython or `ufunc.accumulate` where applicable.", 5, true],
     ["memory", "Broadcasting can create huge temporaries (e.g. $n \\times n$ pairwise matrices) that exceed cache or RAM; chunking or a compiled loop can then be faster.", 4, true]]),

  // --- numpy-array-creation -----------------------------------------------
  num({ concept: "numpy-array-creation", slug: "x4-apply-arange", cognitive: "apply", level: 1, seconds: 10,
    stem: "What is `len(np.arange(5))`?" }, 5, 0.001),
  short({ concept: "numpy-array-creation", slug: "x4-transfer-linspace", cognitive: "transfer", level: 9, seconds: 300,
    stem: "Why is `np.arange(0, 1, 0.1)` risky for generating a grid, and what should be used instead?" },
    [["float", "With a floating-point step, rounding can make the number of elements unpredictable (an extra or missing endpoint), and accumulated error shifts the values.", 5, true],
     ["linspace", "Use `np.linspace(0, 1, 11)` (specifying the count, with `endpoint` control), or integer `arange` scaled afterwards.", 4, true]]),

  // --- numpy-indexing -----------------------------------------------------
  num({ concept: "numpy-indexing", slug: "x4-apply-bool", cognitive: "apply", level: 1.5, seconds: 15,
    stem: "`a = np.array([1, 5, 3])`. What is `a[a > 2].sum()`?" }, 8, 0.001),
  short({ concept: "numpy-indexing", slug: "x4-transfer-ix", cognitive: "transfer", level: 9, seconds: 300,
    stem: "For a $4 \\times 4$ array `a`, why does `a[[0, 2], [1, 3]]` return $2$ elements rather than a $2 \\times 2$ block, and how do you get the block?" },
    [["pairwise", "Integer array indices are broadcast together and paired elementwise: it selects `a[0, 1]` and `a[2, 3]`.", 5, true],
     ["block", "Use `a[np.ix_([0, 2], [1, 3])]` (open mesh), or `a[[0, 2]][:, [1, 3]]`, to get the $2 \\times 2$ submatrix.", 4, true]]),

  // --- numpy-broadcasting -------------------------------------------------
  mcq({ concept: "numpy-broadcasting", slug: "x4-apply-shape", cognitive: "apply", level: 1.5, seconds: 15,
    stem: "What is the shape of `np.ones((3, 1)) + np.ones((1, 4))`?" },
    "`(3, 4)`",
    [["`(3, 1)`", "bc4-sh-left", "Both length-$1$ axes stretch."],
     ["`(1, 4)`", "bc4-sh-right", "Both stretch."],
     ["An error", "bc4-sh-error", "Length-$1$ axes are compatible."]]),
  short({ concept: "numpy-broadcasting", slug: "x4-transfer-silent", cognitive: "transfer", level: 9, seconds: 300,
    stem: "`y` has shape `(100,)` and `yhat` has shape `(100, 1)`. `((y - yhat)**2).mean()` runs without error but gives a wrong MSE. Explain." },
    [["broadcast", "`y - yhat` broadcasts to shape `(100, 100)` — every prediction minus every target — so the mean is over $10{,}000$ pairwise differences.", 5, true],
     ["fix", "Flatten or reshape to matching shapes (`yhat.ravel()`), and assert shapes in numeric code; silent broadcasting is a common source of plausible-looking wrong answers.", 4, true]]),

  // --- numpy-matrices -----------------------------------------------------
  num({ concept: "numpy-matrices", slug: "x4-apply-matmul", cognitive: "apply", level: 1.5, seconds: 15,
    stem: "What is `(np.array([[1, 2], [3, 4]]) @ np.array([1, 1]))[1]`?" }, 7, 0.001),
  short({ concept: "numpy-matrices", slug: "x4-transfer-solve", cognitive: "transfer", level: 9, seconds: 300,
    stem: "Why is `np.linalg.solve(A, b)` preferred to `np.linalg.inv(A) @ b`?" },
    [["accuracy", "`solve` uses an LU factorisation with pivoting and back-substitution, which is more numerically accurate than forming the inverse, especially for ill-conditioned $A$.", 5, true],
     ["cost", "It also costs less (no full inverse), and the factorisation can be reused for several right-hand sides (e.g. `scipy.linalg.lu_factor`).", 4, true]]),

  // --- pandas-dataframes --------------------------------------------------
  num({ concept: "pandas-dataframes", slug: "x4-apply-shape", cognitive: "apply", level: 1, seconds: 10,
    stem: "`df = pd.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})`. What is `df.shape[1]`?" }, 2, 0.001),
  short({ concept: "pandas-dataframes", slug: "x4-transfer-align", cognitive: "transfer", level: 9, seconds: 300,
    stem: "`df['c'] = other_series` sometimes fills `c` with NaNs even though `other_series` has the right length. Why?" },
    [["align", "Assigning a Series aligns on the index, not on position; if `other_series` has a different index (e.g. after filtering or `reset_index`), labels don't match and missing ones become NaN.", 5, true],
     ["fix", "Align the indexes deliberately, or assign `.to_numpy()` when positions truly correspond.", 4, true]]),

  // --- pandas-groupby -----------------------------------------------------
  num({ concept: "pandas-groupby", slug: "x4-apply-sum", cognitive: "apply", level: 1.5, seconds: 20,
    stem: "`df = pd.DataFrame({'g': ['a', 'a', 'b'], 'v': [1, 2, 3]})`. What is `df.groupby('g')['v'].sum()['a']`?" }, 3, 0.001),
  short({ concept: "pandas-groupby", slug: "x4-transfer-transform", cognitive: "transfer", level: 9, seconds: 300,
    stem: "Contrast `groupby(...).agg`, `.transform` and `.apply`, and say which to use to add a column with each group's mean." },
    [["agg", "`agg` reduces each group to one row (output indexed by group); `transform` returns an object aligned to the original rows (same length); `apply` calls a function on each group DataFrame and concatenates whatever it returns (flexible but slow).", 5, true],
     ["use", "For a group-mean column: `df['m'] = df.groupby('g')['v'].transform('mean')` — vectorised and index-aligned.", 4, true]]),
];
