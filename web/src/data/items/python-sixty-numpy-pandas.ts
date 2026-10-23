import type { Item } from "../../lib/assessment/types";
import { code, mcq, num, s, short } from "./python-sixty-shared";

/**
 * NumPy and pandas introduction lessons brought to 60 questions each.
 * Conventions are those of python-sixty-basics.ts; `np` and `pd` are the usual
 * aliases in every stem. Multiple-choice `eval-` answers are lists, tuples or
 * arrays rather than NumPy scalars, whose repr changed in NumPy 2.
 */

const NP = ["numpy"];
const PD = ["pandas"];

// ---------------------------------------------------------------------------
// numpy-arrays
// ---------------------------------------------------------------------------
const NA = "numpy-arrays";
const numpyArrays: Item[] = [
  mcq(s(NA, "recall-homogeneous", "recall", 1, 15, "What does it mean that a NumPy array is *homogeneous*?"),
    "Every element has the same dtype",
    [
      ["Every element has the same value", "homogeneous-same-value", "It's about type, not value."],
      ["The array is one-dimensional", "homogeneous-1d", "Arrays of any dimension are homogeneous."],
      ["The array is sorted", "homogeneous-sorted", "Order has nothing to do with it."],
    ]),
  mcq(s(NA, "recall-import-alias", "recall", 1, 15, "What is the conventional way to import NumPy?"),
    "`import numpy as np`",
    [
      ["`import np`", "import-np", "The module is called `numpy`; `np` is an alias you create."],
      ["`from numpy import array as np`", "import-array-as-np", "That would make `np` the `array` function."],
      ["`include numpy`", "include-numpy", "Python uses `import`."],
    ]),
  mcq(s(NA, "recall-size", "recall", 2, 20, "For an array of shape `(3, 4)`, what is `.size`?"),
    "`12`, the total number of elements",
    [
      ["`3`", "size-is-rows", "That's `len(a)`, the length of the first axis."],
      ["`(3, 4)`", "size-is-shape", "That's `.shape`."],
      ["`2`", "size-is-ndim", "That's `.ndim`."],
    ]),
  num(s(NA, "eval-mean", "apply", 2, 20, "What is `np.array([2, 4, 9]).mean()`?"), 5),
  mcq(s(NA, "eval-elementwise-mult", "apply", 3, 25, "What is `np.array([1, 2, 3]) * np.array([4, 5, 6])`?"),
    "`array([ 4, 10, 18])`",
    [
      ["`array(32)`", "star-is-dot", "`*` multiplies element by element; the dot product is `@`."],
      ["`array([1, 2, 3, 4, 5, 6])`", "star-concats", "Concatenation is `np.concatenate`."],
      ["`TypeError`", "array-mult-error", "Same-shaped arrays multiply elementwise."],
    ]),
  num(s(NA, "eval-bool-count", "apply", 3, 30, "What is `(np.array([3, 8, 1, 9, 4]) > 3).sum()`?"), 3),
  mcq(s(NA, "eval-upcast-float", "apply", 4, 30, "What is `np.array([1, 2.5, 3]).dtype.name`?"),
    "`'float64'`",
    [
      ["`'int64'`", "dtype-first-element", "One float forces the whole array to a float dtype."],
      ["`'object'`", "mixed-numbers-object", "Mixed ints and floats upcast to `float64`, not `object`."],
      ["`'mixed'`", "dtype-mixed", "Arrays have a single dtype."],
    ]),
  mcq(s(NA, "eval-string-upcast", "apply", 5, 40, "What is `np.array([1, \"2\"]).tolist()`?"),
    "`['1', '2']`",
    [
      ["`[1, 2]`", "array-parses-strings", "NumPy upcasts to a common type — here a string dtype — rather than parsing."],
      ["`[1, '2']`", "array-keeps-mixed", "An array has one dtype, so the `1` becomes `'1'`."],
      ["`TypeError`", "array-mixed-error", "NumPy finds a common dtype instead of raising."],
    ]),
  num(s(NA, "eval-cumsum-last", "apply", 4, 30, "What is `np.cumsum([1, 2, 3, 4])[-2]`?"), 6),
  mcq(s(NA, "apply-ravel-shape", "apply", 4, 35, "`a` has shape `(2, 3, 4)`. What is `a.ravel().shape`?"),
    "`(24,)`",
    [
      ["`(2, 12)`", "ravel-merges-last", "`ravel` flattens to one dimension."],
      ["`(9,)`", "ravel-sums-dims", "The length is the product of the dimensions."],
      ["`(24, 1)`", "ravel-column", "`ravel` returns a 1-D array."],
    ]),
  short(s(NA, "explain-vectorise-why", "explain", 6, 120, "Explain what *vectorised* means in NumPy, and give the two main reasons vectorised code beats a Python loop."),
    [
      ["definition", "Expressing an operation on whole arrays at once instead of element by element in Python", 2, true],
      ["compiled", "The loop runs in compiled C over contiguous memory", 1],
      ["no-overhead", "Avoids per-element interpreter overhead: type checks, boxing, bytecode dispatch", 1],
    ]),
  mcq(s(NA, "transfer-int-overflow", "transfer", 7, 60, "`a = np.array([200], dtype=np.uint8)`. What is `(a + 100).tolist()`?"),
    "`[44]` — `uint8` arithmetic wraps around modulo $256$",
    [
      ["`[300]`", "uint8-promotes", "Adding a Python int that fits keeps the `uint8` dtype, so the result wraps."],
      ["`[255]`", "uint8-saturates", "NumPy wraps; it doesn't clamp at the maximum."],
      ["`OverflowError`", "uint8-raises", "Array arithmetic wraps silently."],
    ]),
  mcq(s(NA, "transfer-nan-propagation", "transfer", 7, 50, "`a = np.array([1.0, np.nan, 3.0])`. What is `np.nanmean(a)` compared with `a.mean()`?"),
    "`2.0` versus `nan` — `nanmean` skips missing values, `mean` propagates them",
    [
      ["Both are `2.0`", "mean-skips-nan", "Plain `mean` returns `nan` if any element is `nan`."],
      ["Both are `nan`", "nanmean-propagates", "`nanmean` exists to ignore `nan`."],
      ["`1.333...` versus `nan`", "nanmean-divides-all", "`nanmean` divides by the count of non-`nan` values, $2$."],
    ]),
  num(s(NA, "eval-argmax-2d", "transfer", 8, 60, "On a 2-D array, argmax returns an index into the flattened array. What is `np.array([[1, 7], [9, 2]]).argmax()`?"), 2),
  mcq(s(NA, "transfer-equality-any", "transfer", 8, 60, "Which correctly checks that two arrays `a` and `b` of equal shape hold identical values?"),
    "`np.array_equal(a, b)` or `(a == b).all()`",
    [
      ["`a == b`", "eq-single-bool", "That gives an elementwise boolean array."],
      ["`a is b`", "is-value-check", "`is` tests identity, not equal contents."],
      ["`bool(a == b)`", "bool-of-mask", "For more than one element this raises `ValueError`."],
    ]),
  num(s(NA, "eval-std-population", "transfer", 8, 60, "NumPy's standard deviation divides by n unless told otherwise. What is `np.std([2, 4, 4, 4, 5, 5, 7, 9])`?"), 2),
  num(s(NA, "eval-std-ddof", "transfer", 9, 75, "What is `round(float(np.std([1, 2, 3, 4], ddof=1)), 4)`?"), 1.291),
  short(s(NA, "transfer-copy-vs-view", "transfer", 9, 150, "`sub = a[::2]` and `sub2 = a[a > 0]`. One is a view and one is a copy. Say which, explain why NumPy must behave this way, and say how to make the first independent."),
    [
      ["which", "`a[::2]` is a view; boolean (fancy) indexing returns a copy", 2, true],
      ["why", "A regular stride can describe a slice over the same buffer; an arbitrary selection can't be expressed as strides", 1],
      ["fix", "Use `a[::2].copy()`", 1, true],
    ]),
  code(s(NA, "code-zscore", "apply", 5, 90, "Write `zscore(x)` that takes a 1-D array and returns `(x - mean) / std` (population std), without a Python loop."),
    "import numpy as np\n\ndef zscore(x):\n    pass\n",
    "import numpy as np\n\ndef zscore(x):\n    x = np.asarray(x, dtype=float)\n    return (x - x.mean()) / x.std()\n",
    [
      ["mean-zero", "import numpy as np\nresult = abs(float(zscore(np.array([1.0, 2.0, 3.0])).mean()))", "result < 1e-12"],
      ["std-one", "import numpy as np\nresult = float(zscore(np.array([2.0, 4.0, 4.0, 4.0, 5.0, 5.0, 7.0, 9.0])).std())", "abs(result - 1) < 1e-12"],
      ["values", "import numpy as np\nresult = zscore(np.array([1.0, 3.0])).tolist()", "result == [-1.0, 1.0]"],
    ], NP),
  code(s(NA, "code-clip-count", "apply", 6, 90, "Write `clip_count(x, lo, hi)` returning a tuple `(clipped, n)`: the array with values limited to `[lo, hi]`, and how many values were changed. No Python loops."),
    "import numpy as np\n\ndef clip_count(x, lo, hi):\n    pass\n",
    "import numpy as np\n\ndef clip_count(x, lo, hi):\n    x = np.asarray(x)\n    c = np.clip(x, lo, hi)\n    return c, int((c != x).sum())\n",
    [
      ["basic", "import numpy as np\nc, n = clip_count(np.array([-5, 0, 5, 10]), 0, 6)\nresult = (c.tolist(), n)", "result == ([0, 0, 5, 6], 2)"],
      ["none", "import numpy as np\nc, n = clip_count(np.array([1, 2]), 0, 3)\nresult = (c.tolist(), n)", "result == ([1, 2], 0)"],
    ], NP),
];

// ---------------------------------------------------------------------------
// numpy-array-creation
// ---------------------------------------------------------------------------
const AC = "numpy-array-creation";
const arrayCreation: Item[] = [
  mcq(s(AC, "recall-zeros-shape-arg", "recall", 1, 15, "To make a $2 \\times 3$ array of zeros, what do you pass to `np.zeros`?"),
    "The shape as a tuple: `np.zeros((2, 3))`",
    [
      ["Two separate arguments: `np.zeros(2, 3)`", "zeros-two-args", "The second positional argument is the dtype, so this fails."],
      ["A list of zeros", "zeros-list", "You pass a shape; NumPy fills in the zeros."],
      ["The number of zeros: `np.zeros(6)`", "zeros-count", "That makes a 1-D array of length $6$."],
    ]),
  mcq(s(AC, "recall-linspace-vs-arange", "recall", 2, 20, "What do you specify with `np.linspace` that you don't with `np.arange`?"),
    "The number of points, rather than the step size",
    [
      ["The dtype", "linspace-dtype", "Both accept `dtype`."],
      ["The start value", "linspace-start", "Both take a start."],
      ["Whether to sort", "linspace-sort", "Both produce ordered values."],
    ]),
  mcq(s(AC, "recall-array-copy", "recall", 2, 20, "`a = np.array(lst)` where `lst` is a Python list. Does changing `a[0]` change `lst`?"),
    "No — `np.array` copies the data into a new buffer",
    [
      ["Yes, they share memory", "array-shares-list", "A list's elements are Python objects; the array holds its own typed copy."],
      ["Only for integer lists", "array-shares-ints", "The data is always copied from a list."],
      ["Only until the list is modified", "array-copy-on-write", "They're independent from the start."],
    ]),
  num(s(AC, "eval-linspace-step", "apply", 3, 30, "What is `np.linspace(0, 1, 5)[1]`?"), 0.25),
  num(s(AC, "eval-arange-len", "apply", 3, 30, "What is `len(np.arange(3, 20, 4))`?"), 5),
  mcq(s(AC, "eval-eye-sum", "apply", 3, 25, "What is `np.eye(3).sum(axis=0).tolist()`?"),
    "`[1.0, 1.0, 1.0]`",
    [
      ["`[3.0, 3.0, 3.0]`", "eye-all-ones", "Each column of the identity has a single $1$."],
      ["`3.0`", "axis-ignored", "`axis=0` sums each column separately."],
      ["`[1, 1, 1]`", "eye-int", "`np.eye` is `float64` by default."],
    ]),
  mcq(s(AC, "apply-full-like", "apply", 4, 35, "What is `np.full_like(np.array([1, 2, 3]), 2.7).tolist()`?"),
    "`[2, 2, 2]` — `full_like` keeps the integer dtype of its template, so $2.7$ is truncated",
    [
      ["`[2.7, 2.7, 2.7]`", "full-like-float", "The `_like` functions copy the template's dtype."],
      ["`[3, 3, 3]`", "full-like-rounds", "Casting float to int truncates."],
      ["`TypeError`", "full-like-error", "The value is cast silently."],
    ]),
  num(s(AC, "eval-tile-repeat", "apply", 5, 40, "What is `np.tile([1, 2], 3).sum() + np.repeat([1, 2], 3).sum()`?"), 18),
  mcq(s(AC, "eval-repeat-vs-tile", "apply", 5, 40, "What is `np.repeat([1, 2], 2).tolist()`?"),
    "`[1, 1, 2, 2]`",
    [
      ["`[1, 2, 1, 2]`", "repeat-is-tile", "That's `np.tile`; `repeat` repeats each element in place."],
      ["`[2, 4]`", "repeat-multiplies", "`repeat` duplicates, it doesn't multiply."],
      ["`[[1, 2], [1, 2]]`", "repeat-stacks", "The result is 1-D."],
    ]),
  num(s(AC, "eval-reshape-minus-one", "apply", 4, 35, "What is `np.arange(12).reshape(3, -1).shape[1]`?"), 4),
  short(s(AC, "explain-preallocate", "explain", 6, 120, "You will compute $10{,}000$ values in a loop. Compare growing an array with `np.append` each step to preallocating with `np.empty(10000)` and filling by index."),
    [
      ["append-copies", "`np.append` returns a new array each time, copying everything — quadratic overall", 2, true],
      ["prealloc", "Preallocating allocates once; each step just writes one slot", 1, true],
      ["alt", "Mentions collecting into a list then converting once as another good option", 1],
    ]),
  mcq(s(AC, "transfer-arange-float-endpoint", "transfer", 7, 60, "`np.arange(1, 1.3, 0.1)` returns `[1.0, 1.1, 1.2, 1.3]` — four values, though the stop is meant to be excluded. Why?"),
    "Floating-point rounding makes the computed length $\\lceil (1.3 - 1)/0.1 \\rceil$ come out as $4$; prefer `linspace` for float grids",
    [
      ["`arange` includes the stop for floats", "arange-float-inclusive", "The stop is never meant to be included; this is a rounding artefact."],
      ["The step is rounded up to $0.15$", "arange-step-rounded", "The step is used as given."],
      ["It's a NumPy bug fixed in recent versions", "arange-bug", "It's inherent to binary floating point."],
    ]),
  mcq(s(AC, "transfer-meshgrid", "transfer", 8, 60, "`X, Y = np.meshgrid(np.arange(3), np.arange(2))`. What is `X.shape`?"),
    "`(2, 3)` — rows follow the second (y) input and columns the first (x) input",
    [
      ["`(3, 2)`", "meshgrid-xy-order", "With the default `indexing=\"xy\"`, the output shape is `(len(y), len(x))`."],
      ["`(6,)`", "meshgrid-flat", "`meshgrid` returns 2-D coordinate grids."],
      ["`(3,)`", "meshgrid-no-change", "`X` is broadcast across all rows."],
    ]),
  num(s(AC, "eval-identity-trace", "transfer", 8, 60, "What is `np.trace(np.eye(4, k=1) + 2 * np.eye(4))`?"), 8),
  num(s(AC, "eval-diag-from-vector", "transfer", 8, 60, "What is `np.diag([1, 2, 3]).sum() + np.diag(np.arange(9).reshape(3, 3)).sum()`?"), 18),
  mcq(s(AC, "transfer-asarray-no-copy", "transfer", 9, 75, "`a = np.arange(3)`; `b = np.asarray(a)`; `c = np.array(a)`; then `a[0] = 99`. What are `b[0]` and `c[0]`?"),
    "`99` and `0` — `asarray` returns its input unchanged when it's already an array; `np.array` copies by default",
    [
      ["Both `99`", "array-no-copy", "`np.array` copies unless `copy=False` is given."],
      ["Both `0`", "asarray-copies", "`asarray` avoids copying when it can."],
      ["`0` and `99`", "asarray-array-swapped", "It's the other way around."],
    ]),
  num(s(AC, "eval-logspace", "transfer", 9, 75, "logspace spaces points evenly in the exponent of $10$. What is `np.logspace(0, 3, 4)[2]`?"), 100),
  short(s(AC, "transfer-seeded-generator", "transfer", 9, 150, "Why is `rng = np.random.default_rng(42)` then `rng.normal(size=5)` preferred in modern NumPy over `np.random.seed(42)` then `np.random.normal(size=5)`?"),
    [
      ["local-state", "The `Generator` object holds its own state rather than a hidden global one", 2, true],
      ["isolation", "So different parts of a program (or libraries) can't disturb each other's random streams", 1],
      ["better-algo", "It uses a newer default bit generator (PCG64) with better statistical properties", 1],
    ]),
  code(s(AC, "code-checkerboard", "apply", 5, 90, "Write `checkerboard(n)` returning an `n` × `n` integer array of $0$s and $1$s with `0` in the top-left corner and alternating along rows and columns. Use `np.indices` or `np.arange`, not loops."),
    "import numpy as np\n\ndef checkerboard(n):\n    pass\n",
    "import numpy as np\n\ndef checkerboard(n):\n    i, j = np.indices((n, n))\n    return (i + j) % 2\n",
    [
      ["two", "result = checkerboard(2).tolist()", "result == [[0, 1], [1, 0]]"],
      ["three", "result = checkerboard(3).tolist()", "result == [[0, 1, 0], [1, 0, 1], [0, 1, 0]]"],
      ["shape", "result = checkerboard(5).shape", "result == (5, 5)"],
    ], NP),
  code(s(AC, "code-grid-points", "apply", 7, 120, "Write `grid_points(n)` returning an `(n*n, 2)` array of every `(x, y)` with `x` and `y` in `np.linspace(0, 1, n)`, with `x` varying fastest. `grid_points(2)` is `[[0, 0], [1, 0], [0, 1], [1, 1]]`."),
    "import numpy as np\n\ndef grid_points(n):\n    pass\n",
    "import numpy as np\n\ndef grid_points(n):\n    t = np.linspace(0, 1, n)\n    X, Y = np.meshgrid(t, t)\n    return np.column_stack([X.ravel(), Y.ravel()])\n",
    [
      ["two", "result = grid_points(2).tolist()", "result == [[0.0, 0.0], [1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]"],
      ["shape", "result = grid_points(3).shape", "result == (9, 2)"],
      ["middle", "result = grid_points(3)[4].tolist()", "result == [0.5, 0.5]"],
    ], NP),
];

// ---------------------------------------------------------------------------
// numpy-indexing
// ---------------------------------------------------------------------------
const NI = "numpy-indexing";
const numpyIndexing: Item[] = [
  mcq(s(NI, "recall-comma-index", "recall", 1, 15, "For a 2-D array `A`, what does `A[2, 3]` select?"),
    "The element in row $2$, column $3$",
    [
      ["Rows $2$ through $3$", "comma-is-range", "A range uses a colon; a comma separates axes."],
      ["Elements $2$ and $3$ of the flattened array", "comma-is-list", "Each comma-separated index applies to one axis."],
      ["Column $2$, row $3$", "comma-col-first", "The first index is the row (axis $0$)."],
    ]),
  mcq(s(NI, "recall-boolean-mask", "recall", 2, 20, "What is a boolean mask?"),
    "An array of `True`/`False` the same shape as the data, used to select the `True` positions",
    [
      ["A function that hides an array's values", "mask-hides", "Indexing with a mask selects values; it doesn't hide them."],
      ["A list of indices", "mask-is-indices", "Index lists are integer (fancy) indexing."],
      ["An array of all `True`", "mask-all-true", "A mask can have any mix of values."],
    ]),
  mcq(s(NI, "eval-column-slice", "apply", 3, 25, "What is `np.arange(6).reshape(2, 3)[:, 1].tolist()`?"),
    "`[1, 4]`",
    [
      ["`[3, 4, 5]`", "colon-first-is-col", "`[:, 1]` takes column $1$ from every row."],
      ["`[[1], [4]]`", "int-index-keeps-dim", "An integer index drops that axis, giving a 1-D result."],
      ["`[0, 1, 2]`", "col-is-row", "That's row $0$."],
    ]),
  num(s(NI, "eval-mask-sum", "apply", 3, 30, "What is `np.array([4, -2, 7, -5, 1])[np.array([4, -2, 7, -5, 1]) < 0].sum()`?"), -7),
  mcq(s(NI, "eval-fancy-repeat", "apply", 4, 35, "What is `np.array([10, 20, 30])[[2, 2, 0]].tolist()`?"),
    "`[30, 30, 10]`",
    [
      ["`[30, 10]`", "fancy-dedupes", "Fancy indexing keeps repeated indices."],
      ["`IndexError`", "fancy-repeat-error", "Repeated indices are allowed."],
      ["`[10, 20, 30]`", "fancy-sorts", "The output follows the index order."],
    ]),
  mcq(s(NI, "eval-combined-mask", "apply", 4, 35, "After `a = np.arange(10)`, what is `a[(a > 2) & (a % 2 == 0)].tolist()`?"),
    "`[4, 6, 8]`",
    [
      ["`[2, 4, 6, 8]`", "gt-is-ge", "`a > 2` excludes $2$."],
      ["`[3, 4, 5, 6, 7, 8, 9]`", "and-ignored", "Both conditions must hold."],
      ["`ValueError`", "ampersand-error", "`&` combines masks elementwise, which is correct here."],
    ]),
  num(s(NI, "eval-where-count", "apply", 4, 35, "What is `len(np.where(np.array([0, 3, 0, 5, 6]) > 0)[0])`?"), 3),
  mcq(s(NI, "eval-np-where-three-arg", "apply", 5, 40, "What is `np.where(np.array([1, -2, 3]) > 0, 1, 0).tolist()`?"),
    "`[1, 0, 1]`",
    [
      ["`[0, 2]`", "where-indices", "With three arguments `np.where` picks values, not indices."],
      ["`[1, 3]`", "where-filters", "Every position gets a value, either $1$ or $0$."],
      ["`[1, -2, 3]`", "where-unchanged", "The original values aren't kept here."],
    ]),
  num(s(NI, "eval-mask-assign", "apply", 5, 40, "After `a = np.array([5, -1, 3, -4])`, `a[a < 0] = 0`, what is `a.sum()`?"), 8),
  mcq(s(NI, "apply-row-vs-col-shape", "apply", 5, 40, "`A` has shape `(4, 5)`. What are the shapes of `A[1]`, `A[1:2]` and `A[:, 1:2]`?"),
    "`(5,)`, `(1, 5)` and `(4, 1)`",
    [
      ["`(5,)`, `(5,)` and `(4,)`", "slice-drops-dim", "A slice keeps its axis, even with length $1$."],
      ["`(1, 5)`, `(1, 5)` and `(4, 1)`", "int-keeps-dim", "An integer index removes its axis."],
      ["`(4,)`, `(1, 4)` and `(5, 1)`", "row-is-col", "`A[1]` is a row of length $5$."],
    ]),
  short(s(NI, "explain-and-vs-ampersand", "explain", 6, 120, "Why must NumPy masks be combined with `&` and `|` (with parentheses), rather than `and` and `or`?"),
    [
      ["and-needs-bool", "`and`/`or` ask for one truth value of the whole array, which is ambiguous and raises", 2, true],
      ["elementwise", "`&`/`|` combine the masks element by element", 1, true],
      ["precedence", "Parentheses are needed because `&` binds tighter than comparisons like `>`", 1],
    ]),
  mcq(s(NI, "transfer-fancy-2d-pairs", "transfer", 8, 60, "After `A = np.arange(9).reshape(3, 3)`, what is `A[[0, 2], [1, 0]].tolist()`?"),
    "`[1, 6]` — the index lists are paired up, selecting `(0, 1)` and `(2, 0)`",
    [
      ["`[[1, 0], [7, 6]]`", "fancy-cross-product", "Paired fancy indices don't form a sub-grid; use `np.ix_` for that."],
      ["`[0, 2, 1, 0]`", "fancy-returns-indices", "It returns elements of `A`."],
      ["`[1, 0]`", "fancy-row-zero", "Each pair is one row-column position."],
    ]),
  mcq(s(NI, "transfer-ix", "transfer", 8, 60, "After `A = np.arange(9).reshape(3, 3)`, what is `A[np.ix_([0, 2], [1, 0])].tolist()`?"),
    "`[[1, 0], [7, 6]]`",
    [
      ["`[1, 6]`", "ix-pairs", "`np.ix_` builds the cross product of the index lists."],
      ["`[[0, 1], [6, 7]]`", "ix-sorts-cols", "Columns come out in the order given, `[1, 0]`."],
      ["`[[1, 7], [0, 6]]`", "ix-transposed", "Rows follow the first list."],
    ]),
  num(s(NI, "eval-fancy-assign-dupes", "transfer", 9, 75, "After `a = np.zeros(3)`, `a[[0, 0, 1]] += 1`, what is `a.sum()`?"), 2),
  num(s(NI, "eval-add-at", "transfer", 9, 75, "After `a = np.zeros(3)`, `np.add.at(a, [0, 0, 1], 1)`, what is `a[0]`?"), 2),
  mcq(s(NI, "transfer-ellipsis", "transfer", 8, 60, "`X` has shape `(10, 32, 32, 3)`. What is the shape of `X[..., 0]`?"),
    "`(10, 32, 32)`",
    [
      ["`(32, 32, 3)`", "ellipsis-first-axis", "`...` fills the leading axes; `0` indexes the last one."],
      ["`(10,)`", "ellipsis-drops-all", "Only the last axis is removed."],
      ["`(10, 32, 32, 1)`", "int-keeps-axis", "An integer index removes its axis."],
    ]),
  short(s(NI, "transfer-chained-assign", "transfer", 10, 180, "`a[a > 0][0] = 99` leaves `a` unchanged, while `a[a > 0] = 99` changes it. Explain the difference."),
    [
      ["copy", "`a[a > 0]` on the right of further indexing produces a copy", 2, true],
      ["assign-to-copy", "So `[0] = 99` writes into that temporary copy, which is then discarded", 1, true],
      ["setitem", "Whereas `a[mask] = 99` calls `__setitem__` on `a` itself, writing in place", 1],
    ]),
  num(s(NI, "eval-argsort-index", "transfer", 9, 75, "After `a = np.array([30, 10, 20])`, what is `a[np.argsort(a)][-1] - a[np.argsort(a)[0]]`?"), 20),
  code(s(NI, "code-replace-outliers", "apply", 6, 90, "Write `cap_outliers(x, k)` returning a copy of the 1-D array where values more than `k` standard deviations from the mean are replaced by the mean. Don't modify the input."),
    "import numpy as np\n\ndef cap_outliers(x, k):\n    pass\n",
    "import numpy as np\n\ndef cap_outliers(x, k):\n    x = np.asarray(x, dtype=float)\n    m, s = x.mean(), x.std()\n    out = x.copy()\n    out[np.abs(x - m) > k * s] = m\n    return out\n",
    [
      ["basic", "import numpy as np\nresult = cap_outliers(np.array([1.0, 1.0, 1.0, 1.0, 100.0]), 1.5).tolist()", "result == [1.0, 1.0, 1.0, 1.0, 20.8]"],
      ["none", "import numpy as np\nresult = cap_outliers(np.array([1.0, 2.0, 3.0]), 3).tolist()", "result == [1.0, 2.0, 3.0]"],
      ["no-mutate", "import numpy as np\nx = np.array([0.0, 0.0, 0.0, 9.0])\nr = cap_outliers(x, 1)\nresult = (x.tolist(), r.tolist())", "result == ([0.0, 0.0, 0.0, 9.0], [0.0, 0.0, 0.0, 2.25])"],
    ], NP),
  code(s(NI, "code-top-k", "apply", 7, 120, "Write `top_k_rows(A, k)` that returns the `k` rows of a 2-D array with the largest row sums, ordered from largest sum to smallest. Use `argsort`, not loops."),
    "import numpy as np\n\ndef top_k_rows(A, k):\n    pass\n",
    "import numpy as np\n\ndef top_k_rows(A, k):\n    order = np.argsort(A.sum(axis=1))[::-1]\n    return A[order[:k]]\n",
    [
      ["basic", "import numpy as np\nresult = top_k_rows(np.array([[1, 1], [5, 5], [3, 0]]), 2).tolist()", "result == [[5, 5], [3, 0]]"],
      ["one", "import numpy as np\nresult = top_k_rows(np.array([[0, 9], [1, 1]]), 1).tolist()", "result == [[0, 9]]"],
    ], NP),
];

// ---------------------------------------------------------------------------
// numpy-broadcasting
// ---------------------------------------------------------------------------
const NB = "numpy-broadcasting";
const broadcasting: Item[] = [
  mcq(s(NB, "recall-what-is", "recall", 1, 15, "What is broadcasting?"),
    "NumPy's rule for combining arrays of different shapes by stretching size-$1$ (or missing) axes to match",
    [
      ["Sending an array to several functions at once", "broadcast-messaging", "It's about shapes in arithmetic."],
      ["Copying an array to every CPU core", "broadcast-parallel", "It's a shape rule, not parallelism."],
      ["Converting an array to a list", "broadcast-tolist", "That's `.tolist()`."],
    ]),
  mcq(s(NB, "recall-scalar", "recall", 1, 15, "`np.array([1, 2, 3]) + 10` works. What is this an example of?"),
    "Broadcasting a scalar across every element",
    [
      ["Concatenation", "plus-concat", "`+` on arrays adds; it never appends."],
      ["A type error that NumPy ignores", "scalar-error-ignored", "This is defined, intended behaviour."],
      ["Matrix multiplication", "plus-matmul", "Matrix multiplication is `@`."],
    ]),
  mcq(s(NB, "recall-compatible-rule", "recall", 2, 20, "Two dimensions are compatible under broadcasting when they are…"),
    "Equal, or one of them is $1$",
    [
      ["Both even", "broadcast-even", "Parity doesn't matter."],
      ["Any sizes at all", "broadcast-any", "Sizes like $3$ and $4$ conflict."],
      ["Equal only", "broadcast-equal-only", "A size of $1$ also stretches to match."],
    ]),
  mcq(s(NB, "eval-shape-outer", "apply", 3, 30, "What is `(np.ones((4, 1)) * np.ones(3)).shape`?"),
    "`(4, 3)`",
    [
      ["`(4, 1)`", "broadcast-keeps-left", "The size-$1$ axis stretches to $3$."],
      ["`(3, 4)`", "broadcast-swaps", "Shapes align from the right: `(4, 1)` with `(3,)` gives `(4, 3)`."],
      ["`ValueError`", "broadcast-fails", "These shapes are compatible."],
    ]),
  num(s(NB, "eval-outer-sum", "apply", 4, 35, "What is `(np.arange(3)[:, None] + np.arange(4)).sum()`?"), 30),
  mcq(s(NB, "eval-center-columns", "apply", 4, 40, "After `X = np.array([[1, 10], [3, 30]])`, what is `(X - X.mean(axis=0)).tolist()`?"),
    "`[[-1.0, -10.0], [1.0, 10.0]]`",
    [
      ["`[[-4.5, 4.5], [-13.5, 13.5]]`", "center-rows", "That subtracts row means; `axis=0` gives column means."],
      ["`[[0.0, 0.0], [0.0, 0.0]]`", "center-all-zero", "Each column has two different values."],
      ["`ValueError`", "center-shape-error", "A `(2,)` row of means broadcasts against `(2, 2)`."],
    ]),
  mcq(s(NB, "apply-fail-case", "apply", 4, 35, "Which pair of shapes does **not** broadcast?"),
    "`(3, 4)` and `(3,)`",
    [
      ["`(3, 4)` and `(4,)`", "trailing-match-fails", "The trailing $4$s match."],
      ["`(3, 4)` and `(3, 1)`", "size-one-fails", "The $1$ stretches to $4$."],
      ["`(5, 1, 4)` and `(3, 1)`", "3d-fails", "Aligned from the right: `(5, 1, 4)` vs `(1, 3, 1)` gives `(5, 3, 4)`."],
    ]),
  num(s(NB, "eval-pairwise-dist", "apply", 5, 45, "After `x = np.array([0, 3, 7])`, what is `np.abs(x[:, None] - x[None, :]).max()`?"), 7),
  num(s(NB, "eval-row-normalise", "apply", 5, 45, "After `A = np.array([[1.0, 3.0], [2.0, 2.0]])`, what is `(A / A.sum(axis=1, keepdims=True))[0, 1]`?"), 0.75),
  short(s(NB, "explain-keepdims", "explain", 6, 120, "`A` has shape `(3, 4)`. Explain why `A / A.sum(axis=1)` fails but `A / A.sum(axis=1, keepdims=True)` works."),
    [
      ["shapes", "`A.sum(axis=1)` has shape `(3,)`, which aligns with the trailing $4$ and conflicts", 2, true],
      ["keepdims", "With `keepdims=True` the shape is `(3, 1)`, which stretches across the $4$ columns", 2, true],
    ]),
  mcq(s(NB, "transfer-silent-bug", "transfer", 8, 60, "`y` has shape `(100,)` and `pred` has shape `(100, 1)`. What does `((y - pred) ** 2).mean()` silently compute?"),
    "The mean over a `(100, 100)` matrix of every pairing of `y` with `pred`, not the MSE",
    [
      ["The correct mean squared error", "broadcast-mse-ok", "`(100,)` and `(100, 1)` broadcast to `(100, 100)`."],
      ["A `ValueError`", "broadcast-mse-error", "The shapes are compatible, which is why the bug is silent."],
      ["The MSE of only the first element", "broadcast-first", "Every pair is computed."],
    ]),
  num(s(NB, "eval-gram-broadcast", "transfer", 8, 60, "After `X = np.array([[1, 0], [0, 1], [1, 1]])`, what is `((X[:, None, :] - X[None, :, :]) ** 2).sum(axis=-1).sum()`?"), 8),
  mcq(s(NB, "transfer-3d-broadcast", "transfer", 8, 60, "Images have shape `(N, H, W, 3)` and `mean` has shape `(3,)`. What does `images - mean` do?"),
    "Subtracts the per-channel mean from every pixel of every image",
    [
      ["Raises because the ranks differ", "rank-mismatch", "Missing leading axes are treated as size $1$."],
      ["Subtracts from the first three images only", "broadcast-first-axis", "Alignment is from the trailing axis — the channels."],
      ["Subtracts from the first three rows", "broadcast-rows", "The trailing axis is channels, not rows."],
    ]),
  mcq(s(NB, "transfer-memory-blowup", "transfer", 9, 75, "Pairwise distances via `X[:, None, :] - X[None, :, :]` for $50{,}000$ points in $100$ dimensions runs out of memory. Why?"),
    "The intermediate has shape `(50000, 50000, 100)`, which is $2.5 \\times 10^{11}$ floats",
    [
      ["Broadcasting always copies both inputs", "broadcast-copies-inputs", "The inputs aren't copied; the *result* is enormous."],
      ["NumPy can't broadcast more than two axes", "broadcast-max-2d", "Any number of axes works."],
      ["Subtraction is computed in Python", "broadcast-python", "It's compiled; the problem is the output size."],
    ]),
  num(s(NB, "eval-softmax-stable", "transfer", 9, 75, "Softmax is stabilised by subtracting the row max. After `z = np.array([[1000.0, 1000.0]])`, `e = np.exp(z - z.max(axis=1, keepdims=True))`, what is `(e / e.sum(axis=1, keepdims=True))[0, 0]`?"), 0.5),
  short(s(NB, "transfer-broadcast-to-view", "transfer", 9, 150, "`b = np.broadcast_to(np.arange(3), (1000, 3))` uses almost no memory, but `b[0, 0] = 5` raises an error. Explain both facts."),
    [
      ["stride-zero", "The result is a view with stride $0$ along the new axis, so every row reuses the same $3$ values", 2, true],
      ["read-only", "Because writes would change every row at once, the view is read-only", 2, true],
    ]),
  num(s(NB, "eval-standardize-cols", "transfer", 10, 90, "After `X = np.array([[1.0, 2.0], [3.0, 6.0], [5.0, 10.0]])`, `Z = (X - X.mean(0)) / X.std(0)`, what is `round(float((Z[:, 0] * Z[:, 1]).mean()), 6)`?"), 1),
  code(s(NB, "code-min-max-scale", "apply", 5, 90, "Write `minmax_cols(X)` scaling each column of a 2-D array to the range `[0, 1]` using broadcasting (column minimum to $0$, maximum to $1$)."),
    "import numpy as np\n\ndef minmax_cols(X):\n    pass\n",
    "import numpy as np\n\ndef minmax_cols(X):\n    X = np.asarray(X, dtype=float)\n    lo, hi = X.min(axis=0), X.max(axis=0)\n    return (X - lo) / (hi - lo)\n",
    [
      ["basic", "import numpy as np\nresult = minmax_cols(np.array([[0, 10], [5, 20], [10, 30]])).tolist()", "result == [[0.0, 0.0], [0.5, 0.5], [1.0, 1.0]]"],
      ["shape", "import numpy as np\nresult = minmax_cols(np.array([[1, 2, 3], [4, 6, 8]])).shape", "result == (2, 3)"],
    ], NP),
  code(s(NB, "code-nearest", "apply", 7, 120, "Write `nearest(points, queries)` returning, for each query row, the index of the closest point row (Euclidean). Both are 2-D arrays with the same number of columns. Use broadcasting, not loops."),
    "import numpy as np\n\ndef nearest(points, queries):\n    pass\n",
    "import numpy as np\n\ndef nearest(points, queries):\n    d = ((queries[:, None, :] - points[None, :, :]) ** 2).sum(axis=-1)\n    return d.argmin(axis=1)\n",
    [
      ["basic", "import numpy as np\nP = np.array([[0, 0], [10, 10], [0, 10]])\nQ = np.array([[1, 1], [9, 8], [1, 9]])\nresult = nearest(P, Q).tolist()", "result == [0, 1, 2]"],
      ["1d-feature", "import numpy as np\nresult = nearest(np.array([[0], [5]]), np.array([[4], [1]])).tolist()", "result == [1, 0]"],
    ], NP),
];

// ---------------------------------------------------------------------------
// numpy-matrices
// ---------------------------------------------------------------------------
const NM = "numpy-matrices";
const matrices: Item[] = [
  mcq(s(NM, "recall-transpose", "recall", 1, 15, "What does `A.T` give for a 2-D array `A`?"),
    "The transpose: rows become columns",
    [
      ["The total of all elements", "t-is-total", "That's `A.sum()`."],
      ["The inverse of `A`", "t-is-inverse", "The inverse is `np.linalg.inv(A)`."],
      ["The trace of `A`", "t-is-trace", "The trace is `np.trace(A)`."],
    ]),
  mcq(s(NM, "recall-linalg", "recall", 2, 20, "Which submodule holds NumPy's matrix routines like `solve`, `inv` and `eig`?"),
    "`np.linalg`",
    [
      ["`np.matrix`", "np-matrix-module", "`np.matrix` is a deprecated class, not the routines module."],
      ["`np.math`", "np-math", "That isn't where linear algebra lives."],
      ["`np.random`", "np-random-linalg", "That's random number generation."],
    ]),
  num(s(NM, "eval-matvec", "apply", 3, 30, "What is `(np.array([[2, 0], [1, 3]]) @ np.array([1, 2]))[1]`?"), 7),
  num(s(NM, "eval-det", "apply", 3, 30, "What is `round(float(np.linalg.det(np.array([[4, 2], [3, 5]]))), 6)`?"), 14),
  mcq(s(NM, "eval-matmul-shape", "apply", 3, 30, "What is `(np.ones((2, 5)) @ np.ones((5, 3))).shape`?"),
    "`(2, 3)`",
    [
      ["`(5, 5)`", "matmul-inner-shape", "The inner dimensions are consumed; the outer ones remain."],
      ["`(2, 5, 3)`", "matmul-stacks", "Matrix multiplication contracts the shared axis."],
      ["`ValueError`", "matmul-shape-error", "Inner dimensions $5$ and $5$ match."],
    ]),
  num(s(NM, "eval-dot-1d", "apply", 3, 25, "What is `np.array([1, 2, 3]) @ np.array([4, 5, 6])`?"), 32),
  mcq(s(NM, "eval-solve", "apply", 4, 40, "What is `np.linalg.solve(np.array([[2.0, 1.0], [1.0, 3.0]]), np.array([3.0, 5.0])).round(6).tolist()`?"),
    "`[0.8, 1.4]`",
    [
      ["`[1.0, 1.0]`", "solve-guess", "Check: $2(0.8) + 1.4 = 3$ and $0.8 + 3(1.4) = 5$."],
      ["`[1.4, 0.8]`", "solve-swapped", "The first unknown is $0.8$."],
      ["`[1.5, 1.67]`", "solve-diagonal-only", "The off-diagonal terms couple the equations."],
    ]),
  num(s(NM, "eval-trace-product", "apply", 4, 35, "What is `np.trace(np.array([[1, 2], [3, 4]]) @ np.array([[0, 1], [1, 0]]))`?"), 5),
  num(s(NM, "eval-inv-entry", "apply", 5, 40, "What is `round(float(np.linalg.inv(np.array([[2.0, 0.0], [0.0, 4.0]]))[1, 1]), 6)`?"), 0.25),
  short(s(NM, "explain-star-vs-at", "explain", 5, 120, "Explain the difference between `A * B` and `A @ B` for two `(2, 2)` arrays, and why the first is sometimes a silent bug."),
    [
      ["elementwise", "`*` multiplies matching entries (Hadamard product)", 1, true],
      ["matmul", "`@` is matrix multiplication: row-by-column sums", 1, true],
      ["silent", "Both succeed for same-shaped square arrays, so using `*` by mistake gives wrong numbers without an error", 2],
    ]),
  mcq(s(NM, "transfer-1d-transpose", "transfer", 7, 50, "`v = np.array([1, 2, 3])`. What is `v.T.shape`?"),
    "`(3,)` — transposing a 1-D array does nothing; use `v[:, None]` or `v.reshape(-1, 1)` for a column",
    [
      ["`(3, 1)`", "1d-transpose-column", "1-D arrays have no second axis to swap."],
      ["`(1, 3)`", "1d-transpose-row", "There is only one axis."],
      ["`ValueError`", "1d-transpose-error", "It's allowed; it just returns the same shape."],
    ]),
  mcq(s(NM, "transfer-outer", "transfer", 7, 50, "What is `np.outer([1, 2], [3, 4]).tolist()`?"),
    "`[[3, 4], [6, 8]]`",
    [
      ["`11`", "outer-is-inner", "That's the dot product."],
      ["`[3, 8]`", "outer-elementwise", "That's elementwise multiplication."],
      ["`[[3, 6], [4, 8]]`", "outer-transposed", "Row $i$ is the first vector's element $i$ times the second vector."],
    ]),
  num(s(NM, "eval-eig-sum", "transfer", 8, 60, "The eigenvalues of a matrix sum to its trace. What is `round(float(np.linalg.eigvals(np.array([[4.0, 1.0], [2.0, 3.0]])).sum()), 6)`?"), 7),
  num(s(NM, "eval-eig-max", "transfer", 8, 60, "What is `round(float(np.linalg.eigvals(np.array([[4.0, 1.0], [2.0, 3.0]])).max()), 6)`?"), 5),
  num(s(NM, "eval-lstsq-slope", "transfer", 9, 75, "Fitting the line $y = mx + c$ by least squares: after `x = np.array([0.0, 1.0, 2.0])`, `y = np.array([1.0, 3.0, 5.0])`, `A = np.column_stack([x, np.ones(3)])`, what is `round(float(np.linalg.lstsq(A, y, rcond=None)[0][0]), 6)`?"), 2),
  mcq(s(NM, "transfer-batched-matmul", "transfer", 8, 60, "`A` has shape `(10, 3, 4)` and `B` has shape `(10, 4, 2)`. What is `(A @ B).shape`?"),
    "`(10, 3, 2)` — `@` treats leading axes as a batch and multiplies the last two",
    [
      ["`ValueError`", "matmul-2d-only", "`@` supports stacks of matrices."],
      ["`(3, 2)`", "matmul-sums-batch", "Each of the $10$ pairs is multiplied separately."],
      ["`(10, 10, 3, 2)`", "matmul-batch-outer", "Batch axes are matched, not crossed."],
    ]),
  short(s(NM, "transfer-condition-number", "transfer", 9, 150, "`np.linalg.solve(A, b)` returns an answer without error, yet tiny changes in `b` change `x` enormously. What property of `A` explains this, and how can you check it?"),
    [
      ["ill-conditioned", "`A` is ill-conditioned (nearly singular)", 2, true],
      ["check", "Check `np.linalg.cond(A)`; a large condition number means amplified errors", 2, true],
    ]),
  mcq(s(NM, "transfer-symmetric-gram", "transfer", 10, 90, "For any real matrix `X`, why is `X.T @ X` guaranteed symmetric with non-negative eigenvalues?"),
    "$(\\mathbf{X}^{T}\\mathbf{X})^{T} = \\mathbf{X}^{T}\\mathbf{X}$, and $\\mathbf{v}^{T}\\mathbf{X}^{T}\\mathbf{X}\\mathbf{v} = \\|\\mathbf{X}\\mathbf{v}\\|^{2} \\ge 0$",
    [
      ["Because `X` must itself be symmetric", "gram-needs-symmetric", "No assumption on `X` is needed."],
      ["Only if `X` is square", "gram-square", "`X` can be any shape."],
      ["Because NumPy symmetrises results", "numpy-symmetrises", "It's a mathematical identity, not NumPy behaviour."],
    ]),
  code(s(NM, "code-rotate-points", "apply", 6, 90, "Write `rotate90(P)` that rotates 2-D points (rows of an `(n, 2)` array) $90°$ counter-clockwise about the origin, using a rotation matrix and `@`."),
    "import numpy as np\n\ndef rotate90(P):\n    pass\n",
    "import numpy as np\n\ndef rotate90(P):\n    R = np.array([[0, -1], [1, 0]])\n    return P @ R.T\n",
    [
      ["basic", "import numpy as np\nresult = rotate90(np.array([[1, 0], [0, 1]])).tolist()", "result == [[0, 1], [-1, 0]]"],
      ["point", "import numpy as np\nresult = rotate90(np.array([[2, 3]])).tolist()", "result == [[-3, 2]]"],
    ], NP),
  code(s(NM, "code-ols", "apply", 8, 150, "Write `ols(X, y)` returning the least-squares coefficients for `y ≈ X @ beta` with an intercept added as the *first* coefficient. Use `np.linalg.lstsq` (or solve the normal equations)."),
    "import numpy as np\n\ndef ols(X, y):\n    pass\n",
    "import numpy as np\n\ndef ols(X, y):\n    X = np.asarray(X, dtype=float)\n    if X.ndim == 1:\n        X = X[:, None]\n    A = np.column_stack([np.ones(len(X)), X])\n    return np.linalg.lstsq(A, y, rcond=None)[0]\n",
    [
      ["line", "import numpy as np\nresult = np.round(ols(np.array([[0.0], [1.0], [2.0]]), np.array([1.0, 3.0, 5.0])), 6).tolist()", "result == [1.0, 2.0]"],
      ["two-features", "import numpy as np\nX = np.array([[1.0, 0.0], [0.0, 1.0], [1.0, 1.0], [2.0, 1.0]])\ny = 3 + 2 * X[:, 0] - X[:, 1]\nresult = np.round(ols(X, y), 6).tolist()", "result == [3.0, 2.0, -1.0]"],
    ], NP),
];

// ---------------------------------------------------------------------------
// pandas-dataframes
// ---------------------------------------------------------------------------
const DF = "pandas-dataframes";
const dataframes: Item[] = [
  mcq(s(DF, "recall-index-role", "recall", 1, 15, "What is a DataFrame's *index*?"),
    "The row labels",
    [
      ["The column names", "index-is-columns", "Column labels are `df.columns`."],
      ["A sorted copy of the data", "index-is-sorted", "The index labels rows; it isn't a copy."],
      ["The number of rows", "index-is-len", "That's `len(df)`."],
    ]),
  mcq(s(DF, "recall-import", "recall", 1, 15, "What is the conventional pandas import?"),
    "`import pandas as pd`",
    [
      ["`import pd`", "import-pd", "The module is `pandas`; `pd` is an alias."],
      ["`import pandas as pa`", "import-pa", "The near-universal convention is `pd`."],
      ["`from pandas import *`", "import-star", "Star imports pollute the namespace and aren't the convention."],
    ]),
  mcq(s(DF, "recall-dtypes", "recall", 2, 20, "Which attribute shows the dtype of every column?"),
    "`df.dtypes`",
    [
      ["`df.dtype`", "df-dtype-singular", "A DataFrame has per-column dtypes; `.dtype` is a Series attribute."],
      ["`df.types`", "df-types", "There is no `.types`."],
      ["`df.info`", "df-info-attribute", "`df.info()` is a method that prints a summary including dtypes."],
    ]),
  num(s(DF, "eval-shape-product", "apply", 2, 25, "After `df = pd.DataFrame({\"a\": [1, 2, 3], \"b\": [4, 5, 6]})`, what is `df.shape[0] * df.shape[1]`?"), 6),
  num(s(DF, "eval-column-sum", "apply", 3, 30, "After `df = pd.DataFrame({\"x\": [1, 2, 3], \"y\": [10, 20, 30]})`, what is `df[\"y\"].sum() - df[\"x\"].sum()`?"), 54),
  mcq(s(DF, "eval-columns-list", "apply", 3, 25, "After `df = pd.DataFrame({\"b\": [1], \"a\": [2]})`, what is `list(df.columns)`?"),
    "`['b', 'a']`",
    [
      ["`['a', 'b']`", "columns-sorted", "Columns keep the dict's insertion order."],
      ["`[0, 1]`", "columns-numeric", "Dict keys become the column labels."],
      ["`['b', 'a', 'index']`", "columns-include-index", "The index isn't a column."],
    ]),
  num(s(DF, "eval-filter-len", "apply", 4, 35, "After `df = pd.DataFrame({\"age\": [15, 22, 31, 40, 17]})`, what is `len(df[df[\"age\"] >= 18])`?"), 3),
  num(s(DF, "eval-new-column", "apply", 4, 35, "After `df = pd.DataFrame({\"p\": [2, 3], \"q\": [5, 4]})`, `df[\"t\"] = df[\"p\"] * df[\"q\"]`, what is `df[\"t\"].max()`?"), 12),
  mcq(s(DF, "eval-loc-vs-iloc", "apply", 5, 45, "After `df = pd.DataFrame({\"v\": [10, 20, 30]}, index=[2, 0, 1])`, what is `[int(df.loc[0, \"v\"]), int(df.iloc[0, 0])]`?"),
    "`[20, 10]`",
    [
      ["`[10, 10]`", "loc-is-position", "`.loc` uses labels; label `0` is the second row."],
      ["`[10, 20]`", "loc-iloc-swapped", "`.iloc[0, 0]` is the first row by position."],
      ["`[20, 20]`", "iloc-is-label", "`.iloc` uses integer positions."],
    ]),
  num(s(DF, "eval-mean-skipna", "apply", 5, 40, "After `s = pd.Series([1.0, None, 3.0])`, what is `s.mean() + s.count()`?"), 4),
  short(s(DF, "explain-alignment", "explain", 6, 120, "`s1 = pd.Series([1, 2], index=[\"a\", \"b\"])` and `s2 = pd.Series([10, 20], index=[\"b\", \"c\"])`. Predict `s1 + s2` and explain the rule."),
    [
      ["result", "`a: NaN, b: 12, c: NaN`", 2, true],
      ["rule", "Arithmetic aligns on index labels; labels present in only one Series give `NaN`", 2, true],
    ]),
  mcq(s(DF, "transfer-chained-indexing", "transfer", 7, 60, "Which reliably sets `score` to $0$ for rows where `age > 30`?"),
    "`df.loc[df[\"age\"] > 30, \"score\"] = 0`",
    [
      ["`df[df[\"age\"] > 30][\"score\"] = 0`", "chained-assign-works", "Chained indexing may write into a temporary copy, leaving `df` unchanged."],
      ["`df[\"score\"][df[\"age\"] > 30] == 0`", "double-equals-assign", "`==` compares; it doesn't assign."],
      ["`df.score.where(df.age > 30) = 0`", "assign-to-call", "You can't assign to a method call."],
    ]),
  mcq(s(DF, "transfer-and-operator", "transfer", 7, 50, "Which filter keeps rows where `a > 0` and `b < 5`?"),
    "`df[(df.a > 0) & (df.b < 5)]`",
    [
      ["`df[df.a > 0 and df.b < 5]`", "and-for-series", "`and` needs a single truth value and raises for a Series."],
      ["`df[df.a > 0 & df.b < 5]`", "missing-parens", "Without parentheses `&` binds first, giving `df.a > (0 & df.b) < 5`."],
      ["`df[(df.a > 0) + (df.b < 5)]`", "plus-is-and", "Adding booleans gives counts, not a logical AND."],
    ]),
  num(s(DF, "eval-value-counts-top", "transfer", 8, 60, "After `s = pd.Series([\"a\", \"b\", \"a\", \"c\", \"a\", \"b\"])`, what is `s.value_counts().iloc[0] * 10 + s.nunique()`?"), 33),
  num(s(DF, "eval-assign-chain", "transfer", 8, 60, "After `df = pd.DataFrame({\"x\": [1, 2, 3]})`, what is `df.assign(y=lambda d: d.x * 2).assign(z=lambda d: d.y + 1)[\"z\"].sum()`?"), 15),
  mcq(s(DF, "transfer-int-to-float-nan", "transfer", 8, 60, "After `df = pd.DataFrame({\"a\": [1, 2]})` and `df = df.reindex([0, 1, 2])`, what is `df[\"a\"].dtype.name`?"),
    "`'float64'` — the new row is `NaN`, which classic NumPy-backed integer columns can't hold",
    [
      ["`'int64'`", "int-holds-nan", "A default `int64` column can't represent missing values."],
      ["`'object'`", "nan-to-object", "pandas upcasts to `float64`, not `object`."],
      ["`'Int64'`", "auto-nullable", "The nullable `Int64` type is only used if you ask for it."],
    ]),
  short(s(DF, "transfer-apply-vs-vectorised", "transfer", 9, 150, "`df[\"bmi\"] = df.apply(lambda r: r.weight / r.height ** 2, axis=1)` is slow on a million rows. Rewrite it and explain the speedup."),
    [
      ["rewrite", "`df[\"bmi\"] = df.weight / df.height ** 2`", 2, true],
      ["why", "Row-wise `apply` calls a Python function per row; column arithmetic runs vectorised in NumPy", 2, true],
    ]),
  num(s(DF, "eval-idxmax", "transfer", 9, 75, "After `df = pd.DataFrame({\"n\": [\"a\", \"b\", \"c\"], \"v\": [5, 9, 7]}).set_index(\"n\")`, what is `len(df[\"v\"].idxmax()) + int(df.loc[\"c\", \"v\"])`?"), 8),
  code(s(DF, "code-add-total", "apply", 5, 90, "Write `with_total(df)` returning a *new* DataFrame with a `total` column equal to `price * qty`, keeping the original unchanged."),
    "import pandas as pd\n\ndef with_total(df):\n    pass\n",
    "import pandas as pd\n\ndef with_total(df):\n    return df.assign(total=df[\"price\"] * df[\"qty\"])\n",
    [
      ["values", "import pandas as pd\nd = pd.DataFrame({\"price\": [2, 5], \"qty\": [3, 1]})\nresult = with_total(d)[\"total\"].tolist()", "result == [6, 5]"],
      ["no-mutate", "import pandas as pd\nd = pd.DataFrame({\"price\": [1], \"qty\": [1]})\nr = with_total(d)\nresult = (list(d.columns), list(r.columns))", "result == ([\"price\", \"qty\"], [\"price\", \"qty\", \"total\"])"],
    ], PD),
  code(s(DF, "code-top-n", "apply", 6, 90, "Write `top_n(df, col, n)` returning the `n` rows with the largest values in `col`, largest first, with a fresh `0..n-1` index."),
    "import pandas as pd\n\ndef top_n(df, col, n):\n    pass\n",
    "import pandas as pd\n\ndef top_n(df, col, n):\n    return df.sort_values(col, ascending=False).head(n).reset_index(drop=True)\n",
    [
      ["basic", "import pandas as pd\nd = pd.DataFrame({\"k\": [\"a\", \"b\", \"c\"], \"v\": [3, 9, 5]})\nresult = top_n(d, \"v\", 2)[\"k\"].tolist()", "result == [\"b\", \"c\"]"],
      ["index", "import pandas as pd\nd = pd.DataFrame({\"v\": [1, 2, 3]})\nresult = list(top_n(d, \"v\", 2).index)", "result == [0, 1]"],
    ], PD),
];

// ---------------------------------------------------------------------------
// pandas-groupby
// ---------------------------------------------------------------------------
const GB = "pandas-groupby";
const SALES = "pd.DataFrame({\"g\": [\"a\", \"b\", \"a\", \"b\", \"a\"], \"v\": [1, 2, 3, 4, 5]})";
const groupby: Item[] = [
  mcq(s(GB, "recall-split-apply-combine", "recall", 1, 15, "What are the three steps of split-apply-combine?"),
    "Split rows into groups, apply a function to each group, combine the results",
    [
      ["Sort, filter, merge", "sac-sort-filter", "Those are separate operations."],
      ["Split columns, apply dtypes, combine files", "sac-columns", "Groupby splits rows by key values."],
      ["Select, aggregate, concatenate", "sac-select", "The middle step can be any function, not only aggregation."],
    ]),
  mcq(s(GB, "recall-size", "recall", 2, 20, "Which gives the number of rows in each group?"),
    "`df.groupby(\"k\").size()`",
    [
      ["`df.groupby(\"k\").len()`", "groupby-len", "Groupby objects have `.size()`, not `.len()`."],
      ["`len(df.groupby(\"k\"))`", "len-groupby-rows", "That gives the number of *groups*."],
      ["`df.groupby(\"k\").shape`", "groupby-shape", "Groupby objects have no `.shape`."],
    ]),
  num(s(GB, "eval-group-sum", "apply", 3, 30, `After \`df = ${SALES}\`, what is \`df.groupby("g")["v"].sum()["a"]\`?`), 9),
  num(s(GB, "eval-group-mean", "apply", 3, 30, `After \`df = ${SALES}\`, what is \`df.groupby("g")["v"].mean()["b"]\`?`), 3),
  num(s(GB, "eval-ngroups", "apply", 3, 25, `After \`df = ${SALES}\`, what is \`df.groupby("g").ngroups\`?`), 2),
  mcq(s(GB, "eval-group-index", "apply", 4, 35, `After \`df = ${SALES}\`, what is \`df.groupby("g")["v"].max().index.tolist()\`?`),
    "`['a', 'b']`",
    [
      ["`[0, 1]`", "groupby-default-index", "The group keys become the index."],
      ["`['a', 'b', 'a', 'b', 'a']`", "groupby-keeps-rows", "An aggregation returns one row per group."],
      ["`[5, 4]`", "index-is-values", "Those are the maxima, not the index."],
    ]),
  mcq(s(GB, "eval-transform-shape", "apply", 5, 40, `After \`df = ${SALES}\`, what is \`df.groupby("g")["v"].transform("sum").tolist()\`?`),
    "`[9, 6, 9, 6, 9]`",
    [
      ["`[9, 6]`", "transform-aggregates", "`transform` returns a value for every original row."],
      ["`[1, 2, 4, 6, 9]`", "transform-cumsum", "That would be `cumsum`."],
      ["`[6, 9, 6, 9, 6]`", "transform-swapped", "Rows with `g == \"a\"` get the `a` total, $9$."],
    ]),
  num(s(GB, "eval-cumcount", "apply", 5, 40, `After \`df = ${SALES}\`, what is \`df.groupby("g").cumcount().tolist()[-1]\`?`), 2),
  num(s(GB, "eval-agg-dict", "apply", 5, 45, `After \`df = ${SALES}\`, what is \`df.groupby("g").agg(total=("v", "sum"), n=("v", "size")).loc["a"].sum()\`?`), 12),
  short(s(GB, "explain-as-index", "explain", 6, 120, "After `df.groupby(\"k\")[\"v\"].sum()`, the group keys are in the index. Give two ways to get them back as an ordinary column, and say why you might want that."),
    [
      ["ways", "`.reset_index()` afterward, or `groupby(\"k\", as_index=False)`", 2, true],
      ["why", "E.g. to merge on the key, plot it, or export a flat table", 1],
    ]),
  mcq(s(GB, "transfer-filter-groups", "transfer", 7, 60, `After \`df = ${SALES}\`, what is \`df.groupby("g").filter(lambda d: d["v"].sum() > 7)["v"].tolist()\`?`),
    "`[1, 3, 5]`",
    [
      ["`[9]`", "filter-aggregates", "`filter` keeps or drops whole groups, returning their original rows."],
      ["`[5]`", "filter-rows", "The condition applies to each group, not each row."],
      ["`[2, 4]`", "filter-inverted", "Group `a` sums to $9 > 7$ and is kept."],
    ]),
  num(s(GB, "eval-rank-within", "transfer", 8, 60, `After \`df = ${SALES}\`, what is \`df.groupby("g")["v"].rank(ascending=False).tolist()[0]\`?`), 3),
  mcq(s(GB, "transfer-dropna-keys", "transfer", 8, 60, "Rows whose group key is `NaN` disappear from `df.groupby(\"k\").sum()`. Why, and how do you keep them?"),
    "`groupby` drops missing keys by default; pass `dropna=False` to keep a `NaN` group",
    [
      ["They're merged into the first group", "nan-merged", "They're excluded, not merged."],
      ["`sum` skips rows containing `NaN`", "sum-skips-rows", "It's the key that's missing, not the values."],
      ["It's a bug; use `fillna` first", "groupby-nan-bug", "It's documented default behaviour, controlled by `dropna`."],
    ]),
  num(s(GB, "eval-pct-of-group", "transfer", 8, 60, `After \`df = ${SALES}\`, what is \`round(float((df["v"] / df.groupby("g")["v"].transform("sum")).iloc[4]), 6)\`?`), 0.555556),
  mcq(s(GB, "transfer-observed-categorical", "transfer", 9, 75, "Grouping by two categorical columns produces many empty rows, one for every combination of categories. What controls this?"),
    "The `observed` argument: `observed=True` keeps only combinations that actually occur",
    [
      ["`dropna=True`", "dropna-empty-combos", "`dropna` concerns missing keys, not unseen combinations."],
      ["`sort=False`", "sort-empty-combos", "Sorting changes order, not which groups appear."],
      ["Nothing — categoricals always show every combination", "categorical-always", "`observed` exists to control it."],
    ]),
  short(s(GB, "transfer-apply-pitfalls", "transfer", 9, 150, "Why is `df.groupby(\"k\").apply(f)` usually slower than built-in aggregations like `.agg(\"mean\")`, and when is `apply` still the right tool?"),
    [
      ["python-per-group", "`apply` calls a Python function once per group, building intermediate DataFrames, while built-ins run in optimised Cython", 2, true],
      ["when", "Use it when the per-group logic can't be expressed with `agg`/`transform`/`filter`, e.g. returning a reshaped frame per group", 2],
    ]),
  num(s(GB, "eval-shift-within", "transfer", 10, 90, `After \`df = ${SALES}\`, what is \`df.groupby("g")["v"].diff().fillna(0).sum()\`?`), 6),
  num(s(GB, "eval-two-keys", "transfer", 9, 75, "After `df = pd.DataFrame({\"a\": [1, 1, 2, 2], \"b\": [\"x\", \"y\", \"x\", \"x\"], \"v\": [1, 2, 3, 4]})`, what is `len(df.groupby([\"a\", \"b\"])[\"v\"].sum())`?"), 3),
  code(s(GB, "code-group-share", "apply", 6, 90, "Write `share(df, key, col)` returning a Series (aligned to `df`'s rows) of each row's `col` value divided by its group's total."),
    "import pandas as pd\n\ndef share(df, key, col):\n    pass\n",
    "import pandas as pd\n\ndef share(df, key, col):\n    return df[col] / df.groupby(key)[col].transform(\"sum\")\n",
    [
      ["basic", "import pandas as pd\nd = pd.DataFrame({\"g\": [\"a\", \"a\", \"b\"], \"v\": [1, 3, 5]})\nresult = share(d, \"g\", \"v\").tolist()", "result == [0.25, 0.75, 1.0]"],
      ["aligned", "import pandas as pd\nd = pd.DataFrame({\"g\": [\"x\", \"y\", \"x\"], \"v\": [2, 4, 2]})\nresult = share(d, \"g\", \"v\").tolist()", "result == [0.5, 1.0, 0.5]"],
    ], PD),
  code(s(GB, "code-summary", "apply", 7, 120, "Write `summary(df)` that groups by column `\"team\"` and returns a DataFrame indexed by team with columns `games` (row count) and `avg` (mean of `\"pts\"`), sorted by `avg` descending."),
    "import pandas as pd\n\ndef summary(df):\n    pass\n",
    "import pandas as pd\n\ndef summary(df):\n    out = df.groupby(\"team\").agg(games=(\"pts\", \"size\"), avg=(\"pts\", \"mean\"))\n    return out.sort_values(\"avg\", ascending=False)\n",
    [
      ["order", "import pandas as pd\nd = pd.DataFrame({\"team\": [\"x\", \"y\", \"x\"], \"pts\": [1, 10, 3]})\nresult = list(summary(d).index)", "result == [\"y\", \"x\"]"],
      ["values", "import pandas as pd\nd = pd.DataFrame({\"team\": [\"x\", \"y\", \"x\"], \"pts\": [1, 10, 3]})\nr = summary(d)\nresult = (int(r.loc[\"x\", \"games\"]), float(r.loc[\"x\", \"avg\"]))", "result == (2, 2.0)"],
    ], PD),
];

export const pythonSixtyNumpyPandasItems: Item[] = [
  ...numpyArrays,
  ...arrayCreation,
  ...numpyIndexing,
  ...broadcasting,
  ...matrices,
  ...dataframes,
  ...groupby,
];
