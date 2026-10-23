import type { Item } from "../../lib/assessment/types";
import { mcq, num, s } from "./python-sixty-shared";

/**
 * One item each for the ten lessons the other `python-sixty-*` modules left at
 * 59, so every Python lesson lands on exactly 60. Same conventions.
 */
export const pythonSixtyTopupItems: Item[] = [
  num(s("python-conditionals", "transfer-match-guard", "transfer", 8, 60, "`match (3, 4):` / `case (a, b) if a > b: r = a - b` / `case (a, b): r = a + b`. What is `r`?"), 7),
  num(s("python-while-loops", "eval-collatz-27", "transfer", 7, 60, "After `n, steps = 27, 0`, `while n != 1: n, steps = (n // 2 if n % 2 == 0 else 3 * n + 1), steps + 1`, what is `steps`?"), 111),
  num(s("python-indexing", "eval-index-by-value", "apply", 6, 45, "After `a = [4, 8, 15, 16, 23, 42]`, what is `a[a[0]] - a[-a[0]]`?"), 8),
  mcq(s("python-dictionaries", "eval-max-key-tie", "transfer", 8, 60, "After `d = {}` and `for w in \"to be or not to be\".split(): d[w] = d.get(w, 0) + 1`, what is `max(d, key=d.get)`?"),
    "`'to'`",
    [
      ["`'be'`", "max-tie-last", "On a tie, `max` keeps the first maximal key in iteration (insertion) order."],
      ["`2`", "max-key-returns-count", "`max` returns the key; `d.get` is only used to compare."],
      ["`'or'`", "max-key-alpha", "`or` occurs once; `to` and `be` occur twice."],
    ]),
  mcq(s("numpy-broadcasting", "eval-three-d-shape", "apply", 5, 40, "What is `(np.ones((2, 1, 3)) + np.ones((4, 1))).shape`?"),
    "`(2, 4, 3)`",
    [
      ["`ValueError`", "broadcast-rank-mismatch", "Aligned from the right, `(4, 1)` becomes `(1, 4, 1)`, compatible with `(2, 1, 3)`."],
      ["`(2, 1, 3)`", "broadcast-keeps-left", "The size-$1$ axes stretch."],
      ["`(4, 2, 3)`", "broadcast-left-align", "Shapes align from the trailing end."],
    ]),
  mcq(s("python-scope", "recall-global-variable", "recall", 2, 20, "What is a global variable in Python?"),
    "A name assigned at the top level of a module, readable from any function in that module",
    [
      ["A variable shared by every program on the computer", "global-system-wide", "Globals are per module."],
      ["Any variable written in capital letters", "global-caps", "Capitals are only a naming convention for constants."],
      ["A variable that can't be changed", "global-constant", "Globals can be rebound (with `global` inside functions)."],
    ]),
  mcq(s("pandas-selection", "eval-loc-label-list", "transfer", 7, 50, "After `df = pd.DataFrame({\"a\": [1, 2, 3]}, index=[\"x\", \"y\", \"z\"])`, what is `df.loc[[\"z\", \"x\"], \"a\"].tolist()`?"),
    "`[3, 1]`",
    [
      ["`[1, 3]`", "loc-list-sorted", "Rows come back in the order the labels are listed."],
      ["`[3, 2, 1]`", "loc-list-range", "A list selects exactly those labels, not a range."],
      ["`KeyError`", "loc-list-error", "Both labels exist."],
    ]),
  num(s("python-iterators", "eval-filter-iterator", "apply", 6, 40, "After `it = iter(range(10))`, `next(it)`, `next(it)`, what is `sum(x for x in it if x % 3 == 0)`?"), 18),
  mcq(s("python-modules", "transfer-dash-m", "transfer", 8, 60, "What does `python -m json.tool data.json` do?"),
    "Runs the standard library module `json.tool` as a script, pretty-printing the JSON file",
    [
      ["Installs a package called `json.tool`", "dash-m-installs", "Installing is `pip`'s job; `-m` runs a module."],
      ["Imports `json` and then exits", "dash-m-imports-only", "It executes the module's `__main__` code."],
      ["Converts `data.json` to a Python module", "dash-m-converts", "It reads and reformats the file."],
    ]),
  num(s("numpy-dtypes", "eval-float32-roundtrip", "transfer", 9, 75, "What is `int(np.float64(np.float32(0.1)) == 0.1)`?"), 0),
];
