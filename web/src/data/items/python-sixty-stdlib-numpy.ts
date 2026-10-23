import type { Item } from "../../lib/assessment/types";
import { code, mcq, num, s, short } from "./python-sixty-shared";

/**
 * The standard-library and advanced NumPy lessons (modules through random)
 * brought to 60 questions each. Conventions are those of
 * python-sixty-basics.ts. Random-number questions avoid depending on exact
 * draws, which can differ between NumPy builds; they test seeding, shapes and
 * ranges instead.
 */

const NP = ["numpy"];

// ---------------------------------------------------------------------------
// python-modules
// ---------------------------------------------------------------------------
const MO = "python-modules";
const modules: Item[] = [
  mcq(s(MO, "recall-module-is-file", "recall", 1, 15, "What is a Python module, most simply?"),
    "A `.py` file whose definitions can be imported elsewhere",
    [
      ["A folder of files", "module-is-folder", "A folder of modules is a package."],
      ["A function inside a class", "module-is-method", "That's a method."],
      ["A compiled program", "module-compiled", "A module is ordinary Python source (or an extension)."],
    ]),
  mcq(s(MO, "recall-stdlib", "recall", 1, 15, "Which of these is part of Python's standard library, available without installing anything?"),
    "`json`",
    [
      ["`numpy`", "numpy-stdlib", "NumPy is a third-party package installed with `pip`."],
      ["`pandas`", "pandas-stdlib", "pandas is third-party."],
      ["`requests`", "requests-stdlib", "`requests` is third-party; the standard library has `urllib`."],
    ]),
  mcq(s(MO, "recall-pip", "recall", 2, 20, "What does `pip install requests` do?"),
    "Downloads and installs the third-party `requests` package into the current environment",
    [
      ["Imports `requests` into the running script", "pip-imports", "Installing and importing are separate steps."],
      ["Creates a file called `requests.py`", "pip-creates-file", "It installs a published package."],
      ["Updates Python itself", "pip-updates-python", "`pip` manages packages, not the interpreter."],
    ]),
  num(s(MO, "eval-math-funcs", "apply", 2, 20, "After `import math`, what is `math.ceil(2.1) + math.floor(-2.1)`?"), 0),
  num(s(MO, "eval-from-import", "apply", 3, 25, "After `from math import gcd, lcm`, what is `gcd(12, 18) + lcm(4, 6)`?"), 18),
  mcq(s(MO, "eval-alias", "apply", 3, 25, "After `import statistics as st`, what is `st.median([5, 1, 3])`?"),
    "`3`",
    [
      ["`NameError`", "alias-still-original", "The alias `st` refers to the module."],
      ["`1`", "median-first", "The median of $1$, $3$, $5$ is $3$."],
      ["`3.0`", "median-float", "With an odd count, `median` returns the middle element itself."],
    ]),
  mcq(s(MO, "eval-module-name", "apply", 4, 30, "After `import json`, what is `json.__name__`?"),
    "`'json'`",
    [
      ["`'__main__'`", "imported-main", "Only the script being run is `__main__`."],
      ["`'json.py'`", "module-name-file", "`__name__` is the module name, not the file name."],
      ["`None`", "module-name-none", "Every module has a `__name__`."],
    ]),
  num(s(MO, "eval-sys-modules-cache", "apply", 5, 40, "After `import sys, math`, `import math as m2`, what is `int(m2 is sys.modules[\"math\"])`?"), 1),
  mcq(s(MO, "eval-importlib", "apply", 5, 40, "After `import importlib`, what is `importlib.import_module(\"math\").sqrt(49)`?"),
    "`7.0`",
    [
      ["`7`", "sqrt-int", "`math.sqrt` returns a float."],
      ["`ImportError`", "import-module-error", "`import_module` imports by string name."],
      ["`'math'`", "import-module-name", "It returns the module object."],
    ]),
  short(s(MO, "explain-main-guard", "explain", 6, 120, "Explain what `if __name__ == \"__main__\":` checks and why test or demo code belongs under it."),
    [
      ["check", "`__name__` is `\"__main__\"` only when the file is run directly, and the module's name when imported", 2, true],
      ["why", "So code under the guard runs as a script but not when another module imports this one", 2, true],
    ]),
  mcq(s(MO, "transfer-shadowing", "transfer", 7, 50, "Your project has a file named `json.py`, and `import json` elsewhere in the project gives `AttributeError: module 'json' has no attribute 'loads'`. Why?"),
    "The script's own directory comes first on `sys.path`, so your `json.py` shadows the standard library module",
    [
      ["The standard `json` module is broken", "stdlib-broken", "The wrong `json` is being imported."],
      ["`loads` was removed in recent Python", "loads-removed", "It's still there in the real module."],
      ["You need `from json import loads`", "from-import-fixes", "That would import from the same wrong file."],
    ]),
  mcq(s(MO, "transfer-import-once", "transfer", 8, 60, "A module prints `loading` at top level. It is imported in three places in one program. How many times is `loading` printed?"),
    "Once — later imports find the module already in `sys.modules`",
    [
      ["Three times", "import-reruns", "Module code runs only on the first import."],
      ["Never", "import-silent", "The first import runs the module's code."],
      ["Once per file that imports it, if they're in different folders", "import-per-folder", "The cache is per module name, per process."],
    ]),
  mcq(s(MO, "transfer-from-import-binding", "transfer", 8, 60, "`config.py` has `DEBUG = False`. `main.py` does `from config import DEBUG`, then `import config; config.DEBUG = True`. What does `main.py` see in `DEBUG`?"),
    "`False` — `from ... import` copied the binding at import time; later rebinding in the module isn't seen",
    [
      ["`True`", "from-import-live", "`DEBUG` in `main` is a separate name bound to the old value."],
      ["`NameError`", "from-import-name-error", "`DEBUG` was imported successfully."],
      ["`None`", "from-import-none", "It keeps the value it had when imported."],
    ]),
  num(s(MO, "eval-dir-filter", "transfer", 8, 60, "After `import math`, what is `int(\"pi\" in dir(math)) + int(\"tau\" in vars(math))`?"), 2),
  short(s(MO, "transfer-circular", "transfer", 9, 150, "Module `a` imports `b` at the top, and `b` imports `a` at the top and uses `a.helper` at import time. Explain why this fails and two ways to fix it."),
    [
      ["partial", "When `b` runs, `a` is only partly initialised, so `a.helper` doesn't exist yet (`AttributeError`/`ImportError`)", 2, true],
      ["fixes", "Move the shared code into a third module, import inside the function that needs it, or restructure to remove the cycle", 2, true],
    ]),
  mcq(s(MO, "transfer-dunder-all", "transfer", 9, 75, "A module defines `__all__ = [\"public\"]` and functions `public` and `_helper` and `other`. What does `from mod import *` bring in?"),
    "Only `public`",
    [
      ["`public` and `other`", "all-ignored-star", "With `__all__` defined, `*` imports exactly those names."],
      ["All three", "star-imports-all", "Underscore names are excluded even without `__all__`, and `__all__` limits it further."],
      ["Nothing — `__all__` disables `*`", "all-disables-star", "It defines what `*` imports."],
    ]),
  num(s(MO, "eval-sys-version", "transfer", 10, 90, "After `import sys`, what is `int(sys.version_info >= (3, 8)) + int(isinstance(sys.path, list))`?"), 2),
  code(s(MO, "code-stats-module", "apply", 4, 75, "Write `summary(nums)` returning a tuple `(mean, median, stdev)` using the standard library's `statistics` module (sample standard deviation)."),
    "import statistics\n\ndef summary(nums):\n    pass\n",
    "import statistics\n\ndef summary(nums):\n    return (statistics.mean(nums), statistics.median(nums), statistics.stdev(nums))\n",
    [
      ["basic", "result = summary([2, 4, 4, 4, 5, 5, 7, 9])", "result[0] == 5 and result[1] == 4.5 and abs(result[2] - 2.138089935299395) < 1e-9"],
    ]),
  code(s(MO, "code-lazy-import", "apply", 7, 120, "Write `module_has(name, attr)` that imports a module by its string `name` and returns whether it has attribute `attr`, returning `False` (not raising) if the module doesn't exist."),
    "import importlib\n\ndef module_has(name, attr):\n    pass\n",
    "import importlib\n\ndef module_has(name, attr):\n    try:\n        mod = importlib.import_module(name)\n    except ImportError:\n        return False\n    return hasattr(mod, attr)\n",
    [
      ["yes", "result = module_has(\"math\", \"sqrt\")", "result is True"],
      ["no-attr", "result = module_has(\"math\", \"nope\")", "result is False"],
      ["no-module", "result = (module_has(\"no_such_module_xyz\", \"x\"), module_has(\"json\", \"dumps\"))", "result == (False, True)"],
    ]),
];

// ---------------------------------------------------------------------------
// python-collections
// ---------------------------------------------------------------------------
const CO = "python-collections";
const collectionsItems: Item[] = [
  mcq(s(CO, "recall-counter-dict", "recall", 1, 15, "What kind of object is a `Counter`?"),
    "A dict subclass mapping each element to its count",
    [
      ["A list of counts in order", "counter-list", "It's a mapping from item to count."],
      ["An integer", "counter-int", "It holds many counts."],
      ["A set", "counter-set", "Sets don't store counts."],
    ]),
  mcq(s(CO, "recall-deque-meaning", "recall", 1, 15, "What does `deque` stand for?"),
    "Double-ended queue",
    [
      ["Dequeue, i.e. remove", "deque-remove", "It's a container, named for adding and removing at both ends."],
      ["Decimal queue", "deque-decimal", "It holds any objects."],
      ["Default queue", "deque-default", "It's double-ended."],
    ]),
  mcq(s(CO, "recall-ordereddict-now", "recall", 2, 20, "Since Python $3.7$, regular dicts keep insertion order. Name one thing `OrderedDict` still offers."),
    "`move_to_end()` and order-sensitive equality (useful for LRU caches)",
    [
      ["Faster lookups than `dict`", "ordereddict-faster", "Plain dicts are as fast or faster."],
      ["Sorted keys", "ordereddict-sorted", "It keeps insertion order, not sorted order."],
      ["Nothing at all", "ordereddict-obsolete", "It still has extra methods and semantics."],
    ]),
  num(s(CO, "eval-counter-total", "apply", 3, 25, "After `from collections import Counter`, what is `sum(Counter(\"hello world\").values())`?"), 11),
  num(s(CO, "eval-counter-most", "apply", 3, 25, "After `from collections import Counter`, what is `Counter(\"abracadabra\").most_common(1)[0][1]`?"), 5),
  num(s(CO, "eval-defaultdict-int", "apply", 3, 30, "After `from collections import defaultdict`, `d = defaultdict(int)`, `for w in \"a b a c a\".split(): d[w] += 1`, what is `d[\"a\"] + d[\"z\"]`?"), 3),
  num(s(CO, "eval-defaultdict-len-after-read", "apply", 4, 35, "After `from collections import defaultdict`, `d = defaultdict(list)`, `x = d[\"k\"]`, what is `len(d)`?"), 1),
  mcq(s(CO, "eval-deque-appendleft", "apply", 4, 35, "After `from collections import deque`, `d = deque([2, 3])`, `d.appendleft(1)`, `d.append(4)`, what is `list(d)`?"),
    "`[1, 2, 3, 4]`",
    [
      ["`[2, 3, 1, 4]`", "appendleft-end", "`appendleft` adds at the front."],
      ["`[4, 1, 2, 3]`", "append-front", "`append` adds at the back."],
      ["`[1, 4, 2, 3]`", "deque-mixed", "Each operation works on its own end."],
    ]),
  num(s(CO, "eval-deque-maxlen", "apply", 4, 35, "After `from collections import deque`, `d = deque(maxlen=3)`, `for i in range(6): d.append(i)`, what is `sum(d)`?"), 12),
  mcq(s(CO, "eval-namedtuple-replace", "apply", 5, 40, "After `from collections import namedtuple`, `P = namedtuple(\"P\", \"x y\")`, `p = P(1, 2)`, what is `p._replace(y=9)`?"),
    "`P(x=1, y=9)`",
    [
      ["`P(x=1, y=2)`", "replace-in-place", "`_replace` returns a new tuple; this shows that new one."],
      ["`AttributeError`", "replace-not-namedtuple", "Named tuples provide `_replace`."],
      ["`(1, 9)`", "replace-plain-tuple", "The result is still a named tuple."],
    ]),
  num(s(CO, "eval-counter-subtract", "apply", 5, 40, "After `from collections import Counter`, what is `sum((Counter(\"aaabb\") - Counter(\"abbbc\")).values())`?"), 2),
  short(s(CO, "explain-defaultdict-trap", "explain", 6, 120, "Why can merely *reading* `d[\"missing\"]` from a `defaultdict` cause bugs, and how do you check for a key without that side effect?"),
    [
      ["inserts", "Reading a missing key inserts it with the default value, growing the dict", 2, true],
      ["check", "Use `\"missing\" in d` or `d.get(\"missing\")`, which don't insert", 2, true],
    ]),
  mcq(s(CO, "transfer-chainmap", "transfer", 7, 50, "After `from collections import ChainMap`, `cfg = ChainMap({\"color\": \"red\"}, {\"color\": \"blue\", \"size\": 3})`, what is `(cfg[\"color\"], cfg[\"size\"])`?"),
    "`('red', 3)`",
    [
      ["`('blue', 3)`", "chainmap-last-wins", "Lookups search the maps in order; the first one wins."],
      ["`KeyError` for `size`", "chainmap-first-only", "Missing keys fall through to later maps."],
      ["`(['red', 'blue'], 3)`", "chainmap-collects", "Only the first match is returned."],
    ]),
  num(s(CO, "eval-deque-rotate", "transfer", 8, 60, "After `from collections import deque`, `d = deque(range(5))`, `d.rotate(-2)`, what is `d[0] * 10 + d[-1]`?"), 21),
  num(s(CO, "eval-counter-and-or", "transfer", 8, 60, "After `from collections import Counter`, `a, b = Counter(x=3, y=1), Counter(x=1, y=2)`, what is `sum((a & b).values()) * 10 + sum((a | b).values())`?"), 25),
  mcq(s(CO, "transfer-ordereddict-lru", "transfer", 8, 60, "In an LRU cache built on `OrderedDict`, what happens on a cache hit for key `k`?"),
    "`move_to_end(k)` marks it most recently used; eviction pops from the front with `popitem(last=False)`",
    [
      ["Nothing — order only matters on insert", "lru-no-update", "Recency must be updated on every access."],
      ["The key is deleted and reinserted at the front", "lru-front", "Most recent goes to the end, so the front holds the oldest."],
      ["The whole dict is re-sorted", "lru-sort", "Only that one key moves."],
    ]),
  num(s(CO, "eval-counter-elements", "transfer", 9, 75, "After `from collections import Counter`, what is `len(list(Counter(a=2, b=0, c=-1, d=1).elements()))`?"), 3),
  short(s(CO, "transfer-stream-topk", "transfer", 9, 150, "You need the $10$ most common words in a $50$ GB text file. Describe an approach with `Counter` that doesn't load the file at once, and its memory cost."),
    [
      ["stream", "Read the file line by line and `update` a `Counter` with each line's words", 2, true],
      ["topk", "Then call `most_common(10)`", 1, true],
      ["memory", "Memory grows with the number of distinct words, not the file size", 1],
    ]),
  code(s(CO, "code-anagram-groups", "apply", 5, 90, "Write `anagram_groups(words)` returning a list of groups (lists) of words that are anagrams of each other, using `defaultdict`. Keep words in input order within a group, and groups in order of first appearance."),
    "from collections import defaultdict\n\ndef anagram_groups(words):\n    pass\n",
    "from collections import defaultdict\n\ndef anagram_groups(words):\n    groups = defaultdict(list)\n    for w in words:\n        groups[\"\".join(sorted(w))].append(w)\n    return list(groups.values())\n",
    [
      ["basic", "result = anagram_groups([\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"])", "result == [[\"eat\", \"tea\", \"ate\"], [\"tan\", \"nat\"], [\"bat\"]]"],
    ]),
  code(s(CO, "code-recent", "apply", 6, 90, "Write a class `Recent` holding the last `n` items added with `add(x)`, and a method `items()` returning them oldest first. Use a `deque` with `maxlen`."),
    "from collections import deque\n\nclass Recent:\n    def __init__(self, n):\n        pass\n",
    "from collections import deque\n\nclass Recent:\n    def __init__(self, n):\n        self._d = deque(maxlen=n)\n\n    def add(self, x):\n        self._d.append(x)\n\n    def items(self):\n        return list(self._d)\n",
    [
      ["window", "r = Recent(3)\nfor i in range(5):\n    r.add(i)\nresult = r.items()", "result == [2, 3, 4]"],
      ["partial", "r = Recent(3)\nr.add(\"a\")\nresult = r.items()", "result == [\"a\"]"],
    ]),
];

// ---------------------------------------------------------------------------
// python-datetime
// ---------------------------------------------------------------------------
const DT = "python-datetime";
const datetimeItems: Item[] = [
  mcq(s(DT, "recall-timedelta", "recall", 1, 15, "What does a `timedelta` represent?"),
    "A duration — a difference between two dates or times",
    [
      ["A specific moment", "timedelta-moment", "That's a `datetime`."],
      ["A time zone", "timedelta-tz", "Time zones are `tzinfo` objects."],
      ["A calendar month", "timedelta-month", "`timedelta` has no months, since month lengths vary."],
    ]),
  mcq(s(DT, "recall-today", "recall", 1, 15, "Which gives today's date (no time) in local time?"),
    "`date.today()`",
    [
      ["`datetime.date()`", "datetime-date-today", "`.date()` is a method on a `datetime` instance."],
      ["`date.now()`", "date-now", "`date` has `today()`; `datetime` has `now()`."],
      ["`time.today()`", "time-today", "`time` objects hold a time of day, not dates."],
    ]),
  mcq(s(DT, "recall-strftime-vs-strptime", "recall", 2, 20, "Which turns a `datetime` into text, `strftime` or `strptime`?"),
    "`strftime` — “f” for format; `strptime` parses text into a `datetime`",
    [
      ["`strptime`", "strptime-formats", "`p` is for parse."],
      ["Both do", "both-format", "They go in opposite directions."],
      ["Neither; use `str()` only", "str-only", "`str()` gives ISO-like text, but `strftime` controls the format."],
    ]),
  num(s(DT, "eval-weekday", "apply", 3, 25, "After `from datetime import date`, what is `date(2024, 7, 4).weekday()`? (Monday is $0$; it was a Thursday.)"), 3),
  num(s(DT, "eval-days-between", "apply", 3, 25, "After `from datetime import date`, what is `(date(2024, 3, 1) - date(2024, 2, 1)).days`?"), 29),
  mcq(s(DT, "eval-add-days", "apply", 3, 30, "After `from datetime import date, timedelta`, what is `(date(2024, 12, 30) + timedelta(days=3)).isoformat()`?"),
    "`'2025-01-02'`",
    [
      ["`'2024-12-33'`", "date-no-rollover", "Dates roll over into the next month and year."],
      ["`'2025-01-03'`", "add-days-off-by-one", "December $30$ plus $3$ days is January $2$."],
      ["`'2024-01-02'`", "year-not-incremented", "The year advances too."],
    ]),
  num(s(DT, "eval-timedelta-seconds", "apply", 4, 30, "After `from datetime import timedelta`, what is `timedelta(minutes=90).seconds`?"), 5400),
  mcq(s(DT, "eval-strftime", "apply", 4, 35, "After `from datetime import datetime`, what is `datetime(2024, 3, 5, 14, 7).strftime(\"%H:%M on %d/%m\")`?"),
    "`'14:07 on 05/03'`",
    [
      ["`'2:07 on 5/3'`", "strftime-no-pad", "`%H`, `%M`, `%d` and `%m` are zero-padded, and `%H` is $24$-hour."],
      ["`'14:07 on 03/05'`", "strftime-month-day", "`%d` is the day and `%m` the month."],
      ["`'02:07 on 05/03'`", "strftime-12h", "`%I` would give the $12$-hour clock."],
    ]),
  num(s(DT, "eval-strptime-month", "apply", 4, 35, "After `from datetime import datetime`, what is `datetime.strptime(\"15 Aug 2023\", \"%d %b %Y\").month`?"), 8),
  num(s(DT, "eval-timedelta-div", "apply", 5, 40, "After `from datetime import timedelta`, what is `timedelta(days=2) // timedelta(hours=5)`?"), 9),
  short(s(DT, "explain-naive-aware", "explain", 6, 120, "Explain the difference between a naive and an aware `datetime`, and why servers usually store aware UTC times."),
    [
      ["definitions", "An aware datetime carries a `tzinfo` (a UTC offset/zone); a naive one doesn't, so its meaning depends on assumptions", 2, true],
      ["utc", "Storing UTC avoids ambiguity from local zones and daylight saving; convert to local time only for display", 2, true],
    ]),
  num(s(DT, "eval-isocalendar", "transfer", 7, 50, "After `from datetime import date`, what is `date(2024, 1, 1).isocalendar().week + date(2023, 1, 1).isocalendar().week`?"), 53),
  num(s(DT, "eval-tz-offset", "transfer", 8, 60, "After `from datetime import datetime, timezone, timedelta`, `t = datetime(2024, 1, 1, 12, tzinfo=timezone.utc)`, what is `t.astimezone(timezone(timedelta(hours=-5))).hour`?"), 7),
  mcq(s(DT, "transfer-month-add", "transfer", 8, 60, "Why does adding “one month” to `date(2024, 1, 31)` have no single correct answer, and how do libraries handle it?"),
    "February has no $31$st, so you must choose a rule — e.g. clamp to the last day (`2024-02-29`), as `dateutil.relativedelta` does",
    [
      ["`timedelta(days=30)` is exactly one month", "month-is-30-days", "That gives March $1$ here; months vary in length."],
      ["It raises in every library", "month-add-raises", "Libraries pick a clamping rule."],
      ["The result is always `2024-02-31`", "invalid-date", "That date doesn't exist."],
    ]),
  num(s(DT, "eval-calendar-leap", "transfer", 8, 60, "After `import calendar`, what is `calendar.isleap(1900) + calendar.isleap(2000) + calendar.monthrange(2024, 2)[1]`?"), 30),
  mcq(s(DT, "transfer-compare-naive-aware", "transfer", 9, 75, "What does `datetime(2024, 1, 1) < datetime(2024, 1, 1, tzinfo=timezone.utc)` do?"),
    "Raises `TypeError: can't compare offset-naive and offset-aware datetimes`",
    [
      ["Returns `False`", "naive-aware-equal", "The comparison is refused."],
      ["Treats the naive one as UTC", "naive-assumed-utc", "Python doesn't assume a zone."],
      ["Treats the naive one as local time", "naive-assumed-local", "Python doesn't assume a zone."],
    ]),
  short(s(DT, "transfer-monotonic", "transfer", 9, 150, "Why should elapsed time be measured with `time.monotonic()` (or `perf_counter()`) rather than subtracting two `datetime.now()` values?"),
    [
      ["wall-clock", "The wall clock can jump — NTP corrections, manual changes, daylight-saving shifts — giving wrong or negative durations", 2, true],
      ["monotonic", "A monotonic clock only moves forward at a steady rate, so differences are reliable", 2, true],
    ]),
  num(s(DT, "eval-fromtimestamp", "transfer", 10, 90, "After `from datetime import datetime, timezone`, what is `datetime.fromtimestamp(86400 * 365, tz=timezone.utc).year`?"), 1971),
  code(s(DT, "code-age", "apply", 5, 90, "Write `age_on(birth, on)` returning someone's age in whole years on date `on`, given `date` objects. Birthdays later in the year haven't happened yet."),
    "from datetime import date\n\ndef age_on(birth, on):\n    pass\n",
    "from datetime import date\n\ndef age_on(birth, on):\n    years = on.year - birth.year\n    if (on.month, on.day) < (birth.month, birth.day):\n        years -= 1\n    return years\n",
    [
      ["before", "from datetime import date\nresult = age_on(date(2000, 6, 15), date(2024, 6, 14))", "result == 23"],
      ["on", "from datetime import date\nresult = age_on(date(2000, 6, 15), date(2024, 6, 15))", "result == 24"],
    ]),
  code(s(DT, "code-business-days", "apply", 7, 120, "Write `business_days(start, end)` counting weekdays (Monday–Friday) from `start` up to and including `end`, both `date` objects."),
    "from datetime import date, timedelta\n\ndef business_days(start, end):\n    pass\n",
    "from datetime import date, timedelta\n\ndef business_days(start, end):\n    n = 0\n    d = start\n    while d <= end:\n        if d.weekday() < 5:\n            n += 1\n        d += timedelta(days=1)\n    return n\n",
    [
      ["week", "from datetime import date\nresult = business_days(date(2024, 3, 4), date(2024, 3, 10))", "result == 5"],
      ["weekend", "from datetime import date\nresult = (business_days(date(2024, 3, 9), date(2024, 3, 10)), business_days(date(2024, 3, 8), date(2024, 3, 11)))", "result == (0, 2)"],
    ]),
];

// ---------------------------------------------------------------------------
// python-files
// ---------------------------------------------------------------------------
const FL = "python-files";
const files: Item[] = [
  mcq(s(FL, "recall-close", "recall", 1, 15, "Why must a file be closed after use?"),
    "To flush buffered writes to disk and release the operating system's file handle",
    [
      ["To delete it", "close-deletes", "Closing doesn't delete anything."],
      ["To make it read-only", "close-readonly", "Closing ends access; it doesn't change permissions."],
      ["It doesn't matter", "close-irrelevant", "Unflushed data can be lost and handles can run out."],
    ]),
  mcq(s(FL, "recall-text-vs-binary", "recall", 1, 15, "What is the difference between modes `\"r\"` and `\"rb\"`?"),
    "`\"r\"` decodes bytes into `str`; `\"rb\"` returns raw `bytes`",
    [
      ["`\"rb\"` reads backwards", "rb-backwards", "The `b` stands for binary."],
      ["`\"rb\"` reads and writes", "rb-read-write", "Read-write is `\"r+\"`."],
      ["No difference", "rb-same", "Text mode decodes and translates newlines."],
    ]),
  mcq(s(FL, "recall-pathlib-read", "recall", 2, 20, "Which reads a whole text file in one call with `pathlib`?"),
    "`Path(\"notes.txt\").read_text(encoding=\"utf-8\")`",
    [
      ["`Path(\"notes.txt\").open()`", "path-open-reads", "`open()` returns a file object; you still have to read it."],
      ["`Path.read(\"notes.txt\")`", "path-read-static", "The method is `read_text` on a `Path` instance."],
      ["`Path(\"notes.txt\").text`", "path-text-attr", "There's no `.text` attribute."],
    ]),
  num(s(FL, "eval-stringio-lines", "apply", 3, 25, "After `import io`, `f = io.StringIO(\"a\\nb\\nc\\n\")`, what is `len(f.readlines())`?"), 3),
  mcq(s(FL, "eval-readline", "apply", 3, 25, "After `import io`, `f = io.StringIO(\"one\\ntwo\\n\")`, `f.readline()`, what is `f.readline()`?"),
    "`'two\\n'`",
    [
      ["`'two'`", "readline-strips", "`readline` keeps the trailing newline."],
      ["`'one\\n'`", "readline-repeats", "The position advanced past the first line."],
      ["`''`", "readline-eof", "There's still one line to read."],
    ]),
  num(s(FL, "eval-write-return", "apply", 3, 25, "After `import io`, `f = io.StringIO()`, what is `f.write(\"hello\\n\")`?"), 6),
  mcq(s(FL, "eval-path-parts", "apply", 4, 30, "After `from pathlib import PurePosixPath as P`, what is `P(\"/data/raw/file.csv\").parent.name`?"),
    "`'raw'`",
    [
      ["`'data'`", "parent-is-root", "The parent of `file.csv` is `/data/raw`, whose name is `raw`."],
      ["`'file.csv'`", "parent-name-is-name", "That's `.name` of the path itself."],
      ["`'/data/raw'`", "parent-name-full", "`.name` is just the final component."],
    ]),
  mcq(s(FL, "eval-with-suffix", "apply", 4, 30, "After `from pathlib import PurePosixPath as P`, what is `str(P(\"a/report.txt\").with_suffix(\".md\"))`?"),
    "`'a/report.md'`",
    [
      ["`'a/report.txt.md'`", "with-suffix-appends", "`with_suffix` replaces the existing suffix."],
      ["`'a/.md'`", "with-suffix-replaces-name", "Only the suffix changes."],
      ["`'report.md'`", "with-suffix-drops-dir", "The directory is kept."],
    ]),
  num(s(FL, "eval-seek-tell", "apply", 5, 40, "After `import io`, `f = io.StringIO(\"abcdef\")`, `f.read(4)`, `f.seek(1)`, what is `len(f.read())`?"), 5),
  num(s(FL, "eval-iterate-strip", "apply", 5, 40, "After `import io`, what is `sum(len(line.rstrip(\"\\n\")) for line in io.StringIO(\"ab\\ncde\\n\\nf\"))`?"), 6),
  short(s(FL, "explain-with", "explain", 6, 120, "What does `with open(path) as f:` guarantee that `f = open(path)` followed by `f.close()` at the end does not?"),
    [
      ["exception", "The file is closed even if an exception is raised inside the block", 2, true],
      ["mechanism", "Via the context-manager protocol: `__exit__` runs however the block is left (return, break, exception)", 2],
    ]),
  mcq(s(FL, "transfer-w-truncates", "transfer", 7, 50, "A script opens `results.txt` with mode `\"w\"` to add one line at the end. What happens to the old contents?"),
    "They're erased — `\"w\"` truncates the file on open; use `\"a\"` to append",
    [
      ["The line is added after them", "w-appends", "That's mode `\"a\"`."],
      ["The line overwrites only the first line", "w-overwrites-line", "The entire file is truncated first."],
      ["`FileExistsError` is raised", "w-exists-error", "That's mode `\"x\"`."],
    ]),
  mcq(s(FL, "transfer-atomic-write", "transfer", 8, 60, "Why do careful programs write a new config to a temporary file and then `os.replace` it over the old one?"),
    "So a crash mid-write never leaves a half-written config; the replace is atomic on the same filesystem",
    [
      ["Because `open(..., \"w\")` can't overwrite files", "w-cant-overwrite", "It can — that's exactly the risk."],
      ["To make the file read-only", "replace-readonly", "Permissions aren't the point."],
      ["Because temporary files are faster to write", "temp-faster", "Speed isn't the point; atomicity is."],
    ]),
  num(s(FL, "eval-bytesio", "transfer", 8, 60, "After `import io`, `b = io.BytesIO()`, `b.write(\"é\".encode(\"utf-8\"))`, what is `len(b.getvalue())`?"), 2),
  mcq(s(FL, "transfer-encoding-default", "transfer", 8, 60, "A script reads a UTF-8 file fine on macOS but raises `UnicodeDecodeError` on a Windows machine. What's the likely cause?"),
    "`open()` without `encoding=` uses the platform's default encoding, which on Windows may be a legacy code page",
    [
      ["Windows can't read UTF-8", "windows-no-utf8", "It can, if you specify the encoding."],
      ["The file is corrupted by copying", "file-corrupted", "The bytes are the same; the decoding differs."],
      ["Windows needs binary mode", "windows-binary", "Text mode works with the right `encoding`."],
    ]),
  num(s(FL, "eval-newline-translation", "transfer", 9, 75, "After `import io`, what is `len(io.StringIO(\"a\\r\\nb\", newline=None).read())`?"), 3),
  short(s(FL, "transfer-huge-file", "transfer", 9, 150, "You must count lines containing `ERROR` in a $200$ GB log. Explain why `f.read().splitlines()` is wrong and what to write instead."),
    [
      ["memory", "`read()` loads the entire file into memory, which won't fit", 2, true],
      ["iterate", "Iterate the file object line by line: `sum(\"ERROR\" in line for line in f)`, which streams with constant memory", 2, true],
    ]),
  num(s(FL, "eval-glob-like", "transfer", 10, 90, "After `from pathlib import PurePosixPath as P`, what is `sum(P(n).match(\"*.csv\") for n in [\"a.csv\", \"b.CSV\", \"c.csv.bak\", \"d/e.csv\"])`?"), 2),
  code(s(FL, "code-word-count-file", "apply", 5, 90, "Write `count_words(f)` that takes an open text file object and returns the total number of whitespace-separated words, reading line by line."),
    "def count_words(f):\n    pass\n",
    "def count_words(f):\n    return sum(len(line.split()) for line in f)\n",
    [
      ["basic", "import io\nresult = count_words(io.StringIO(\"a b\\nc d e\\n\\n f \"))", "result == 6"],
      ["empty", "import io\nresult = (count_words(io.StringIO(\"\")), count_words(io.StringIO(\"x\")))", "result == (0, 1)"],
    ]),
  code(s(FL, "code-round-trip", "apply", 7, 120, "Write `save_and_load(lines, path)` that writes each string in `lines` on its own line to `path` (UTF-8, using `with`), then reads the file back and returns the list of lines without newlines."),
    "def save_and_load(lines, path):\n    pass\n",
    "def save_and_load(lines, path):\n    with open(path, \"w\", encoding=\"utf-8\") as f:\n        for line in lines:\n            f.write(line + \"\\n\")\n    with open(path, encoding=\"utf-8\") as f:\n        return [l.rstrip(\"\\n\") for l in f]\n",
    [
      ["round-trip", "import tempfile, os\np = os.path.join(tempfile.mkdtemp(), \"t.txt\")\nresult = save_and_load([\"héllo\", \"world\"], p)", "result == [\"héllo\", \"world\"]"],
      ["empty", "import tempfile, os\np = os.path.join(tempfile.mkdtemp(), \"t.txt\")\nresult = (save_and_load([], p), save_and_load([\"\"], p))", "result == ([], [\"\"])"],
    ]),
];

// ---------------------------------------------------------------------------
// python-json
// ---------------------------------------------------------------------------
const JS = "python-json";
const jsonItems: Item[] = [
  mcq(s(JS, "recall-json-text", "recall", 1, 15, "What is JSON?"),
    "A text format for structured data — objects, arrays, strings, numbers, booleans and null",
    [
      ["A Python data type", "json-python-type", "JSON is a language-independent text format."],
      ["A database", "json-database", "It's a serialization format."],
      ["A binary file format", "json-binary", "It's plain text."],
    ]),
  mcq(s(JS, "recall-array-list", "recall", 1, 15, "What Python type does a JSON array become with `json.loads`?"),
    "`list`",
    [
      ["`tuple`", "array-tuple", "Arrays decode to lists."],
      ["`set`", "array-set", "JSON arrays allow duplicates and order, so they become lists."],
      ["`array.array`", "array-module", "The standard decoder produces lists."],
    ]),
  mcq(s(JS, "recall-true-lowercase", "recall", 2, 20, "How is the boolean true written in JSON text?"),
    "`true`, all lowercase",
    [
      ["`True`", "json-true-capital", "That's Python; JSON is lowercase."],
      ["`1`", "json-true-one", "JSON has a real boolean."],
      ["`\"true\"`", "json-true-string", "That's a string, not a boolean."],
    ]),
  num(s(JS, "eval-loads-sum", "apply", 3, 25, "After `import json`, what is `sum(json.loads(\"[1, 2, 3.5]\"))`?"), 6.5),
  mcq(s(JS, "eval-dumps-dict", "apply", 3, 25, "After `import json`, what is `json.dumps({\"a\": None, \"b\": False})`?"),
    "`'{\"a\": null, \"b\": false}'`",
    [
      ["`\"{'a': None, 'b': False}\"`", "dumps-is-repr", "`dumps` writes JSON, not Python syntax."],
      ["`'{\"a\": \"None\", \"b\": \"False\"}'`", "dumps-stringifies", "`None` and `False` map to `null` and `false`."],
      ["`'{a: null, b: false}'`", "dumps-unquoted-keys", "JSON keys are always quoted strings."],
    ]),
  num(s(JS, "eval-nested", "apply", 4, 30, "After `import json`, `d = json.loads('{\"users\": [{\"age\": 30}, {\"age\": 25}]}')`, what is `d[\"users\"][1][\"age\"]`?"), 25),
  mcq(s(JS, "eval-sort-keys", "apply", 4, 30, "After `import json`, what is `json.dumps({\"b\": 1, \"a\": 2}, sort_keys=True)`?"),
    "`'{\"a\": 2, \"b\": 1}'`",
    [
      ["`'{\"b\": 1, \"a\": 2}'`", "sort-keys-ignored", "`sort_keys=True` orders keys alphabetically."],
      ["`'{\"a\": 1, \"b\": 2}'`", "sort-keys-values", "Values stay with their keys."],
      ["`'[\"a\", \"b\"]'`", "sort-keys-list", "The whole object is still written."],
    ]),
  num(s(JS, "eval-separators", "apply", 5, 40, "After `import json`, what is `len(json.dumps({\"a\": [1, 2]}, separators=(\",\", \":\")))`?"), 11),
  mcq(s(JS, "eval-tuple-roundtrip", "apply", 5, 40, "After `import json`, what is `json.loads(json.dumps((1, 2)))`?"),
    "`[1, 2]`",
    [
      ["`(1, 2)`", "tuple-survives", "Tuples are written as arrays and come back as lists."],
      ["`'(1, 2)'`", "tuple-string", "Tuples become JSON arrays, not strings."],
      ["`TypeError`", "tuple-not-serializable", "Tuples serialize fine."],
    ]),
  short(s(JS, "explain-json-vs-pickle", "explain", 6, 120, "Why is JSON preferred to `pickle` for data received from other systems or users?"),
    [
      ["safety", "Unpickling untrusted data can execute arbitrary code; parsing JSON can't", 2, true],
      ["interop", "JSON is a language-neutral, human-readable text format", 2],
    ]),
  mcq(s(JS, "transfer-int-keys", "transfer", 7, 50, "After `import json`, what is `json.loads(json.dumps({1: \"a\"}))`?"),
    "`{'1': 'a'}` — JSON object keys are always strings",
    [
      ["`{1: 'a'}`", "int-keys-survive", "Integer keys are converted to strings on the way out."],
      ["`TypeError`", "int-keys-error", "`dumps` converts int keys rather than failing."],
      ["`[1, 'a']`", "dict-to-list", "The object stays an object."],
    ]),
  num(s(JS, "eval-default-hook", "transfer", 8, 60, "After `import json` and `from datetime import date`, what is `len(json.dumps({\"d\": date(2024, 3, 5)}, default=str))`?"), 19),
  num(s(JS, "eval-object-hook", "transfer", 8, 60, "After `import json`, what is `json.loads('{\"a\": 1, \"b\": 2}', object_hook=lambda d: sum(d.values()))`?"), 3),
  mcq(s(JS, "transfer-nan", "transfer", 8, 60, "What does `json.dumps(float(\"nan\"))` produce by default, and why is that a problem?"),
    "`'NaN'` — not valid JSON, so strict parsers in other languages reject it; `allow_nan=False` makes Python raise instead",
    [
      ["`'null'`", "nan-to-null", "Python writes `NaN` unless told otherwise."],
      ["`ValueError`", "nan-raises-default", "Only with `allow_nan=False`."],
      ["`'\"nan\"'`", "nan-string", "It isn't quoted."],
    ]),
  num(s(JS, "eval-duplicate-key", "transfer", 9, 75, "After `import json`, what is `json.loads('{\"k\": 1, \"k\": 2}')[\"k\"]`?"), 2),
  short(s(JS, "transfer-big-ints", "transfer", 9, 150, "A Python service returns IDs like `9007199254740993` in JSON, and a JavaScript client sees `9007199254740992`. Explain why and how to fix the API."),
    [
      ["precision", "JavaScript numbers are doubles, exact only up to $2^{53}$, so larger integers are rounded when parsed", 2, true],
      ["fix", "Send such IDs as strings (or use a big-int-aware parser on the client)", 2, true],
    ]),
  num(s(JS, "eval-jsonl", "transfer", 10, 90, "After `import json`, `text = '{\"v\": 1}\\n{\"v\": 4}\\n{\"v\": 9}\\n'`, what is `sum(json.loads(line)[\"v\"] for line in text.splitlines())`?"), 14),
  num(s(JS, "eval-parse-float", "transfer", 10, 90, "After `import json` and `from decimal import Decimal`, what is `int(json.loads(\"0.1\", parse_float=Decimal) * 3 == Decimal(\"0.3\"))`?"), 1),
  code(s(JS, "code-config-merge", "apply", 5, 90, "Write `merged(defaults_json, overrides_json)` that parses two JSON object strings and returns the merged dict, with overrides winning."),
    "import json\n\ndef merged(defaults_json, overrides_json):\n    pass\n",
    "import json\n\ndef merged(defaults_json, overrides_json):\n    return {**json.loads(defaults_json), **json.loads(overrides_json)}\n",
    [
      ["basic", "result = merged('{\"a\": 1, \"b\": 2}', '{\"b\": 3}')", "result == {\"a\": 1, \"b\": 3}"],
      ["new-key", "result = merged('{}', '{\"x\": null}')", "result == {\"x\": None}"],
    ]),
  code(s(JS, "code-serialize-dates", "apply", 7, 120, "Write `to_json(obj)` that serializes `obj` with `json.dumps`, converting any `date` or `datetime` to its ISO string and any `set` to a sorted list, with sorted keys."),
    "import json\nfrom datetime import date, datetime\n\ndef to_json(obj):\n    pass\n",
    "import json\nfrom datetime import date, datetime\n\ndef to_json(obj):\n    def default(o):\n        if isinstance(o, (date, datetime)):\n            return o.isoformat()\n        if isinstance(o, set):\n            return sorted(o)\n        raise TypeError(type(o).__name__)\n    return json.dumps(obj, default=default, sort_keys=True)\n",
    [
      ["mixed", "from datetime import date\nresult = to_json({\"when\": date(2024, 3, 5), \"tags\": {\"b\", \"a\"}})", "result == '{\"tags\": [\"a\", \"b\"], \"when\": \"2024-03-05\"}'"],
    ]),
];

// ---------------------------------------------------------------------------
// numpy-dtypes
// ---------------------------------------------------------------------------
const ND = "numpy-dtypes";
const numpyDtypes: Item[] = [
  mcq(s(ND, "recall-itemsize", "recall", 1, 15, "What does `a.itemsize` tell you?"),
    "How many bytes each element occupies",
    [
      ["How many elements the array has", "itemsize-is-size", "That's `a.size`."],
      ["The largest value in the array", "itemsize-max", "That's `a.max()`."],
      ["The number of dimensions", "itemsize-ndim", "That's `a.ndim`."],
    ]),
  mcq(s(ND, "recall-float32", "recall", 1, 15, "Compared with `float64`, a `float32` array uses…"),
    "Half the memory, with less precision (about $7$ significant digits instead of about $16$)",
    [
      ["Twice the memory", "float32-bigger", "The number is the bit width: $32$ bits is $4$ bytes."],
      ["The same memory but runs faster", "float32-same-size", "It uses half the memory."],
      ["Integers only", "float32-ints", "It's a floating-point type."],
    ]),
  mcq(s(ND, "recall-object-dtype", "recall", 2, 20, "What is the dtype of `np.array([1, \"a\", None])`?"),
    "`object`",
    [
      ["`int64`", "mixed-int", "Mixed types with `None` force an `object` array."],
      ["`<U1`", "mixed-string", "`None` can't be stored as a fixed-width string."],
      ["`float64`", "mixed-float", "`\"a\"` can't be a float."],
    ]),
  num(s(ND, "eval-nbytes", "apply", 3, 25, "What is `np.zeros(10, dtype=np.int32).nbytes`?"), 40),
  num(s(ND, "eval-itemsize-complex", "apply", 3, 25, "What is `np.array([1 + 2j]).itemsize`?"), 16),
  mcq(s(ND, "eval-astype-uint8", "apply", 4, 35, "What is `np.array([300, -1]).astype(np.uint8).tolist()`?"),
    "`[44, 255]`",
    [
      ["`[255, 0]`", "astype-clips", "Integer casts wrap around modulo $256$; they don't clip."],
      ["`[300, -1]`", "astype-noop", "`uint8` can't hold those values."],
      ["`OverflowError`", "astype-raises", "`astype` wraps silently."],
    ]),
  num(s(ND, "eval-iinfo", "apply", 4, 30, "What is `int(np.iinfo(np.int8).min) + int(np.iinfo(np.uint8).max)`?"), 127),
  mcq(s(ND, "eval-bool-sum-dtype", "apply", 4, 35, "What is `np.array([True, True, False]).sum().item()`?"),
    "`2`",
    [
      ["`True`", "bool-sum-or", "`sum` adds booleans as integers."],
      ["`1`", "bool-sum-any", "Two `True` values give $2$."],
      ["`3`", "bool-sum-len", "`False` counts as $0$."],
    ]),
  num(s(ND, "eval-int-div-float", "apply", 5, 40, "What is `(np.array([7, 8]) / 2).dtype.itemsize`?"), 8),
  mcq(s(ND, "apply-string-dtype-truncate", "apply", 5, 40, "After `a = np.array([\"ab\", \"cd\"])` and `a[0] = \"xyz\"`, what is `a.tolist()`?"),
    "`['xy', 'cd']` — the array's fixed width is $2$ characters, so longer strings are truncated",
    [
      ["`['xyz', 'cd']`", "string-dtype-grows", "NumPy string arrays have a fixed width set at creation."],
      ["`ValueError`", "string-dtype-raises", "It truncates silently."],
      ["`['ab', 'cd']`", "string-assign-ignored", "The assignment happens, truncated."],
    ]),
  short(s(ND, "explain-choose-dtype", "explain", 6, 120, "You store $10^8$ pixel brightness values from $0$ to $255$. Which dtype would you choose, how much memory does it save over the default, and what must you watch out for when doing arithmetic?"),
    [
      ["uint8", "`uint8`: $1$ byte per value instead of $8$ for `int64`/`float64` — about $100$ MB instead of $800$ MB", 2, true],
      ["overflow", "Arithmetic can wrap around (e.g. adding two pixels), so convert to a wider type before summing or averaging", 2, true],
    ]),
  mcq(s(ND, "transfer-float32-compare", "transfer", 7, 50, "What is `np.float32(0.1) == 0.1`?"),
    "`False` — the two types round one tenth differently",
    [
      ["`True`", "float32-equals-float64", "`float32` keeps fewer bits, so its nearest value to $0.1$ differs."],
      ["`TypeError`", "mixed-float-compare", "Comparison between float types is allowed."],
      ["`nan`", "float-compare-nan", "Comparisons return booleans."],
    ]),
  num(s(ND, "eval-float16-limit", "transfer", 8, 60, "Half precision represents integers exactly only up to $2048$. What is `int(np.float16(2049))`?"), 2048),
  mcq(s(ND, "transfer-inplace-cast", "transfer", 8, 60, "`a = np.array([1, 2])` (integers), then `a += 0.5`. What happens?"),
    "`UFuncTypeError` — an in-place operation can't change `a`'s integer dtype to hold floats",
    [
      ["`a` becomes `[1.5, 2.5]`", "inplace-upcasts", "In-place results must fit the existing dtype."],
      ["`a` becomes `[1, 2]` silently", "inplace-truncates", "NumPy refuses the unsafe cast rather than truncating."],
      ["`a` becomes `[2, 3]` by rounding", "inplace-rounds", "No rounding is done; it raises."],
    ]),
  num(s(ND, "eval-view-reinterpret", "transfer", 9, 75, "What is `np.array([1], dtype=np.int32).view(np.uint8).tolist()[0]` on a little-endian machine (all common PCs)?"), 1),
  mcq(s(ND, "transfer-nan-to-int", "transfer", 9, 75, "Why is `np.array([1.5, np.nan]).astype(int)` dangerous?"),
    "`NaN` has no integer value, so the cast gives an arbitrary platform-dependent number (often a huge negative) instead of an error",
    [
      ["It raises `ValueError`", "nan-int-raises", "NumPy casts silently (at most with a warning)."],
      ["`NaN` becomes $0$", "nan-int-zero", "There's no defined result; it's garbage."],
      ["`NaN` stays `NaN`", "nan-int-nan", "Integer arrays can't hold `NaN`."],
    ]),
  num(s(ND, "eval-structured", "transfer", 10, 90, "After `a = np.array([(\"x\", 1.5), (\"y\", 2.5)], dtype=[(\"name\", \"U1\"), (\"val\", \"f8\")])`, what is `a[\"val\"].sum() + a.itemsize`?"), 16),
  code(s(ND, "code-safe-mean", "apply", 5, 90, "Write `safe_mean(pixels)` returning the mean of a `uint8` array as a float, computed without overflow even for large arrays (cast before summing)."),
    "import numpy as np\n\ndef safe_mean(pixels):\n    pass\n",
    "import numpy as np\n\ndef safe_mean(pixels):\n    return float(pixels.astype(np.int64).sum() / pixels.size)\n",
    [
      ["basic", "import numpy as np\nresult = safe_mean(np.array([250, 250, 10], dtype=np.uint8))", "abs(result - 170.0) < 1e-12"],
      ["large", "import numpy as np\nresult = safe_mean(np.full(100000, 200, dtype=np.uint8))", "result == 200.0"],
    ], NP),
  code(s(ND, "code-smallest-int", "apply", 7, 120, "Write `smallest_int_dtype(a)` returning the name of the smallest signed integer dtype among `int8`, `int16`, `int32`, `int64` that can hold every value of the integer array `a`."),
    "import numpy as np\n\ndef smallest_int_dtype(a):\n    pass\n",
    "import numpy as np\n\ndef smallest_int_dtype(a):\n    lo, hi = int(a.min()), int(a.max())\n    for t in (np.int8, np.int16, np.int32, np.int64):\n        info = np.iinfo(t)\n        if info.min <= lo and hi <= info.max:\n            return np.dtype(t).name\n",
    [
      ["int8", "import numpy as np\nresult = smallest_int_dtype(np.array([-5, 100]))", "result == \"int8\""],
      ["int16", "import numpy as np\nresult = smallest_int_dtype(np.array([0, 200]))", "result == \"int16\""],
      ["int32", "import numpy as np\nresult = smallest_int_dtype(np.array([-40000, 1]))", "result == \"int32\""],
    ], NP),
];

// ---------------------------------------------------------------------------
// numpy-reshaping
// ---------------------------------------------------------------------------
const RS = "numpy-reshaping";
const reshaping: Item[] = [
  mcq(s(RS, "recall-reshape-same-size", "recall", 1, 15, "What must stay the same when you reshape an array?"),
    "The total number of elements",
    [
      ["The number of dimensions", "reshape-same-ndim", "Reshaping can add or remove dimensions."],
      ["The shape of the first axis", "reshape-first-axis", "Every axis can change."],
      ["Nothing", "reshape-anything", "The element count must match."],
    ]),
  mcq(s(RS, "recall-flatten", "recall", 1, 15, "What does `a.flatten()` return for a 2-D array?"),
    "A 1-D copy of all its elements, row by row",
    [
      ["The first row", "flatten-first-row", "It includes every element."],
      ["A sorted 1-D array", "flatten-sorts", "Order is preserved, not sorted."],
      ["A view that shares memory", "flatten-view", "`flatten` always copies; `ravel` returns a view when it can."],
    ]),
  mcq(s(RS, "recall-transpose-shape", "recall", 2, 20, "An array has shape `(3, 5)`. What is the shape of its transpose?"),
    "`(5, 3)`",
    [
      ["`(3, 5)`", "transpose-same", "Transposing swaps the axes."],
      ["`(15,)`", "transpose-flattens", "Transposing keeps two dimensions."],
      ["`(1, 15)`", "transpose-row", "The axes are swapped, not merged."],
    ]),
  num(s(RS, "eval-reshape-entry", "apply", 3, 25, "What is `np.arange(12).reshape(3, 4)[2, 1]`?"), 9),
  mcq(s(RS, "eval-stack-shape", "apply", 3, 30, "What is `np.stack([np.zeros(3), np.ones(3)]).shape`?"),
    "`(2, 3)`",
    [
      ["`(6,)`", "stack-is-concat", "`stack` adds a new axis; `concatenate` would give `(6,)`."],
      ["`(3, 2)`", "stack-axis-last", "The default new axis is the first."],
      ["`(2,)`", "stack-drops", "Each input contributes a full row."],
    ]),
  num(s(RS, "eval-concat-axis1", "apply", 4, 35, "What is `np.concatenate([np.ones((2, 3)), np.zeros((2, 2))], axis=1).shape[1]`?"), 5),
  mcq(s(RS, "eval-column-stack", "apply", 4, 35, "What is `np.column_stack([[1, 2], [3, 4]]).tolist()`?"),
    "`[[1, 3], [2, 4]]`",
    [
      ["`[[1, 2], [3, 4]]`", "column-stack-rows", "Each input becomes a column."],
      ["`[1, 2, 3, 4]`", "column-stack-flat", "The result is 2-D."],
      ["`[[1, 2, 3, 4]]`", "column-stack-one-row", "There are two columns, two rows."],
    ]),
  num(s(RS, "eval-swapaxes", "apply", 4, 35, "What is `np.zeros((2, 3, 4)).swapaxes(0, 2).shape[0]`?"), 4),
  num(s(RS, "eval-newaxis-size", "apply", 5, 40, "What is `(np.arange(3)[:, None] * np.arange(4)[None, :]).shape[0] * 10 + np.arange(3)[None].ndim`?"), 32),
  mcq(s(RS, "eval-order-f", "apply", 5, 40, "What is `np.arange(6).reshape(2, 3, order=\"F\").tolist()`?"),
    "`[[0, 2, 4], [1, 3, 5]]`",
    [
      ["`[[0, 1, 2], [3, 4, 5]]`", "order-f-ignored", "`order=\"F\"` fills column by column."],
      ["`[[0, 3], [1, 4], [2, 5]]`", "order-f-shape", "The shape is still `(2, 3)`."],
      ["`[[5, 4, 3], [2, 1, 0]]`", "order-f-reverse", "Column order isn't reversal."],
    ]),
  short(s(RS, "explain-view-or-copy", "explain", 6, 120, "Explain why `a.reshape(...)` usually returns a view, and give a case where it must copy."),
    [
      ["view", "Reshaping only changes shape/strides metadata over the same buffer when the data is contiguous in the needed order", 2, true],
      ["copy", "After an operation like `.T` or a stepped slice, the elements aren't laid out contiguously, so reshape must copy", 2, true],
    ]),
  mcq(s(RS, "transfer-reshape-vs-transpose", "transfer", 7, 60, "`a` has shape `(2, 3)`. Why is `a.reshape(3, 2)` different from `a.T`?"),
    "`reshape` refills the same element order into the new shape; `.T` swaps rows and columns",
    [
      ["They're identical", "reshape-is-transpose", "Same shape, different element arrangement."],
      ["`reshape` sorts the elements", "reshape-sorts", "It keeps row-major order."],
      ["`.T` copies and `reshape` doesn't", "transpose-copies", "`.T` is a view too; the difference is the arrangement."],
    ]),
  num(s(RS, "eval-reshape-vs-T", "transfer", 8, 60, "After `a = np.arange(6).reshape(2, 3)`, what is `int((a.reshape(3, 2) == a.T).sum())`?"), 2),
  num(s(RS, "eval-split-sizes", "transfer", 8, 60, "What is `[len(p) for p in np.array_split(np.arange(10), 3)][0]`?"), 4),
  mcq(s(RS, "transfer-images-channels", "transfer", 8, 60, "A batch of images has shape `(N, H, W, C)`. Which converts it to `(N, C, H, W)`?"),
    "`x.transpose(0, 3, 1, 2)`",
    [
      ["`x.reshape(N, C, H, W)`", "reshape-reorders-axes", "Reshape keeps memory order, scrambling pixels across channels."],
      ["`x.T`", "full-transpose", "That reverses all axes, giving `(C, W, H, N)`."],
      ["`x.swapaxes(1, 3)`", "swap-one-pair", "That gives `(N, C, W, H)` — height and width swapped."],
    ]),
  num(s(RS, "eval-sliding-window", "transfer", 9, 75, "After `from numpy.lib.stride_tricks import sliding_window_view`, what is `sliding_window_view(np.arange(6), 3).sum(axis=1)[-1]`?"), 12),
  short(s(RS, "transfer-collect-then-stack", "transfer", 9, 150, "Why is `out = np.concatenate([out, row])` inside a loop of $n$ rows slow, and what's the standard fix?"),
    [
      ["quadratic", "Each concatenate copies everything so far, so total work grows like $n^2$", 2, true],
      ["fix", "Append rows to a Python list and call `np.stack`/`np.concatenate` once at the end (or preallocate)", 2, true],
    ]),
  num(s(RS, "eval-einsum-like", "transfer", 10, 90, "What is `np.arange(24).reshape(2, 3, 4).transpose(1, 0, 2).reshape(3, -1)[1, 5]`?"), 17),
  code(s(RS, "code-images-to-rows", "apply", 5, 90, "Write `to_rows(images)` turning an array of shape `(N, H, W)` into shape `(N, H*W)`, one flattened image per row."),
    "import numpy as np\n\ndef to_rows(images):\n    pass\n",
    "import numpy as np\n\ndef to_rows(images):\n    return images.reshape(len(images), -1)\n",
    [
      ["shape", "import numpy as np\nresult = to_rows(np.zeros((5, 4, 3))).shape", "result == (5, 12)"],
      ["order", "import numpy as np\nresult = to_rows(np.arange(8).reshape(2, 2, 2)).tolist()", "result == [[0, 1, 2, 3], [4, 5, 6, 7]]"],
    ], NP),
  code(s(RS, "code-tile-blocks", "apply", 7, 120, "Write `blocks(a, k)` splitting a 2-D array of shape `(n, n)` (with `n` divisible by `k`) into non-overlapping `k` × `k` blocks, returned as shape `(n//k, n//k, k, k)`, using reshape and transpose only."),
    "import numpy as np\n\ndef blocks(a, k):\n    pass\n",
    "import numpy as np\n\ndef blocks(a, k):\n    n = a.shape[0]\n    return a.reshape(n // k, k, n // k, k).transpose(0, 2, 1, 3)\n",
    [
      ["shape", "import numpy as np\nresult = blocks(np.zeros((4, 4)), 2).shape", "result == (2, 2, 2, 2)"],
      ["content", "import numpy as np\nb = blocks(np.arange(16).reshape(4, 4), 2)\nresult = b[0, 1].tolist()", "result == [[2, 3], [6, 7]]"],
    ], NP),
];

// ---------------------------------------------------------------------------
// numpy-aggregations
// ---------------------------------------------------------------------------
const AG = "numpy-aggregations";
const M = "np.array([[1, 5, 2], [4, 0, 6]])";
const aggregations: Item[] = [
  mcq(s(AG, "recall-aggregation", "recall", 1, 15, "What does an aggregation like `sum` or `mean` do to an array?"),
    "Reduces many values to fewer — one per group along an axis, or a single number",
    [
      ["Adds a new axis", "aggregation-adds-axis", "Aggregations remove the axis they reduce over."],
      ["Sorts the values", "aggregation-sorts", "Sorting rearranges; aggregating summarises."],
      ["Copies the array", "aggregation-copies", "The output is smaller than the input."],
    ]),
  mcq(s(AG, "recall-axis-one", "recall", 1, 15, "For a 2-D array, which axis do you pass to get one result per **row**?"),
    "`axis=1`",
    [
      ["`axis=0`", "axis-zero-rows", "`axis=0` collapses rows, giving one result per column."],
      ["`axis=-2`", "axis-neg-two", "For 2-D, `-2` is the same as `0`."],
      ["`axis=None`", "axis-none-rows", "That reduces everything to a single value."],
    ]),
  mcq(s(AG, "recall-argmin", "recall", 2, 20, "What does `np.argmin(a)` return for a 1-D array?"),
    "The index of the smallest value",
    [
      ["The smallest value", "argmin-value", "That's `np.min`."],
      ["How many minima there are", "argmin-count", "It returns one index — the first minimum."],
      ["A sorted copy", "argmin-sort", "That's `np.sort`."],
    ]),
  num(s(AG, "eval-sum-all", "apply", 2, 20, `What is \`${M}.sum()\`?`), 18),
  mcq(s(AG, "eval-sum-axis0", "apply", 3, 25, `What is \`${M}.sum(axis=0).tolist()\`?`),
    "`[5, 5, 8]`",
    [
      ["`[8, 10]`", "axis0-is-rows", "That's `axis=1`, the row sums."],
      ["`18`", "axis-ignored", "`axis=0` gives one sum per column."],
      ["`[1, 5, 2]`", "axis0-first-row", "Each column's two values are added."],
    ]),
  mcq(s(AG, "eval-max-axis1", "apply", 3, 25, `What is \`${M}.max(axis=1).tolist()\`?`),
    "`[5, 6]`",
    [
      ["`[4, 5, 6]`", "axis1-is-columns", "That's the column maxima, `axis=0`."],
      ["`6`", "max-axis-ignored", "`axis=1` gives one per row."],
      ["`[2, 1]`", "max-is-argmax", "That would be the indices, `argmax`."],
    ]),
  num(s(AG, "eval-argmax-axis0", "apply", 4, 30, `What is \`${M}.argmax(axis=0).sum()\`?`), 2),
  num(s(AG, "eval-mean-axis1", "apply", 4, 30, `What is \`${M}.mean(axis=1)[1]\`?`), 3.3333333333333335),
  num(s(AG, "eval-count-nonzero", "apply", 5, 40, `What is \`np.count_nonzero(${M} > 1, axis=1).tolist()[0]\`?`), 2),
  short(s(AG, "explain-axis-rule", "explain", 6, 120, "State a reliable rule for predicting the output shape of `a.sum(axis=k)`, and apply it to an array of shape `(4, 5, 6)` with `axis=1`."),
    [
      ["rule", "The reduced axis disappears from the shape (unless `keepdims=True`, which leaves it as size $1$)", 2, true],
      ["apply", "`(4, 5, 6)` with `axis=1` gives `(4, 6)`", 2, true],
    ]),
  num(s(AG, "eval-multi-axis", "transfer", 7, 50, "What is `np.arange(24).reshape(2, 3, 4).sum(axis=(0, 2))[0]`?"), 60),
  num(s(AG, "eval-cumsum-axis", "transfer", 7, 50, `What is \`np.cumsum(${M}, axis=1)[1, -1]\`?`), 10),
  mcq(s(AG, "transfer-nan-aggregate", "transfer", 8, 60, "`a = np.array([2.0, np.nan, 4.0])`. What are `a.max()` and `np.nanmax(a)`?"),
    "`nan` and `4.0`",
    [
      ["`4.0` and `4.0`", "max-skips-nan", "Plain `max` propagates `nan`."],
      ["`nan` and `nan`", "nanmax-propagates", "`nanmax` ignores `nan`."],
      ["`ValueError` and `4.0`", "max-nan-raises", "No error; `max` returns `nan`."],
    ]),
  num(s(AG, "eval-weighted-average", "transfer", 8, 60, "What is `np.average([1, 2, 3], weights=[3, 1, 0])`?"), 1.25),
  num(s(AG, "eval-quantile", "transfer", 8, 60, "What is `np.quantile([1, 2, 3, 4, 5, 6, 7, 8, 9], 0.25)`?"), 3),
  mcq(s(AG, "transfer-float32-sum", "transfer", 9, 75, "Why can `np.ones(10**8, dtype=np.float32).sum()` come out exactly $10^8$ while a naive running total in `float32` would stall near $1.68 \\times 10^{7}$?"),
    "NumPy sums with pairwise (tree) summation, keeping partial sums small; a naive running total stops changing once it's too large for `+1` to register in `float32`",
    [
      ["NumPy converts to `float64` automatically", "sum-auto-upcast", "The accumulator stays `float32`; the algorithm is what helps."],
      ["`float32` can store any integer", "float32-exact", "It's exact only up to $2^{24} \\approx 1.68 \\times 10^{7}$."],
      ["NumPy counts the ones instead of adding", "sum-counts", "It does add — pairwise."],
    ]),
  num(s(AG, "eval-drawdown", "transfer", 9, 75, "After `p = np.array([100.0, 120.0, 90.0, 130.0, 104.0])`, what is `(1 - p / np.maximum.accumulate(p)).max()`?"), 0.25),
  num(s(AG, "eval-bincount", "transfer", 10, 90, "What is `np.bincount([0, 2, 2, 5], weights=[1.0, 2.0, 3.0, 4.0])[2]`?"), 5),
  code(s(AG, "code-col-zscore", "apply", 5, 90, "Write `standardise(X)` returning `X` with each column centred to mean $0$ and scaled to population standard deviation $1$, using axis-aware aggregations."),
    "import numpy as np\n\ndef standardise(X):\n    pass\n",
    "import numpy as np\n\ndef standardise(X):\n    X = np.asarray(X, dtype=float)\n    return (X - X.mean(axis=0)) / X.std(axis=0)\n",
    [
      ["means", "import numpy as np\nZ = standardise(np.array([[1, 10], [3, 30], [5, 50]]))\nresult = np.allclose(Z.mean(axis=0), 0) and np.allclose(Z.std(axis=0), 1)", "result == True"],
      ["values", "import numpy as np\nresult = standardise(np.array([[0.0], [2.0]])).ravel().tolist()", "result == [-1.0, 1.0]"],
    ], NP),
  code(s(AG, "code-group-sums", "apply", 7, 120, "Write `group_sums(labels, values)` returning a dict from each label to the sum of its values, using `np.unique(..., return_inverse=True)` and `np.bincount` rather than a Python loop over the data."),
    "import numpy as np\n\ndef group_sums(labels, values):\n    pass\n",
    "import numpy as np\n\ndef group_sums(labels, values):\n    keys, inv = np.unique(labels, return_inverse=True)\n    sums = np.bincount(inv.ravel(), weights=values)\n    return {k.item(): s.item() for k, s in zip(keys, sums)}\n",
    [
      ["basic", "import numpy as np\nresult = group_sums(np.array([\"a\", \"b\", \"a\"]), np.array([1.0, 2.0, 3.0]))", "result == {\"a\": 4.0, \"b\": 2.0}"],
    ], NP),
];

// ---------------------------------------------------------------------------
// numpy-random
// ---------------------------------------------------------------------------
const RN = "numpy-random";
const randomItems: Item[] = [
  mcq(s(RN, "recall-pseudo", "recall", 1, 15, "Why are NumPy's random numbers called *pseudo*-random?"),
    "They come from a deterministic algorithm: the same seed always gives the same sequence",
    [
      ["They aren't uniformly distributed", "pseudo-biased", "Good generators pass strict statistical tests."],
      ["They repeat after a few values", "pseudo-short-period", "Modern generators have astronomically long periods."],
      ["They come from hardware noise", "pseudo-hardware", "That would be true randomness."],
    ]),
  mcq(s(RN, "recall-normal-params", "recall", 1, 15, "In `rng.normal(loc=10, scale=2, size=100)`, what are `loc` and `scale`?"),
    "The mean and the standard deviation",
    [
      ["The minimum and maximum", "normal-min-max", "Normal values have no hard bounds."],
      ["The mean and the variance", "scale-is-variance", "`scale` is the standard deviation; the variance would be $4$."],
      ["The location in memory and a multiplier", "loc-memory", "They're distribution parameters."],
    ]),
  mcq(s(RN, "recall-integers-exclusive", "recall", 2, 20, "Can `rng.integers(0, 10)` return $10$?"),
    "No — the upper bound is exclusive unless `endpoint=True`",
    [
      ["Yes, both ends are included", "integers-inclusive", "By default the high end is excluded."],
      ["Only with a seed", "integers-seed", "Seeding doesn't change the range."],
      ["Yes, but rarely", "integers-rare", "It's never returned unless `endpoint=True`."],
    ]),
  mcq(s(RN, "eval-shape", "apply", 2, 20, "After `rng = np.random.default_rng(0)`, what is `rng.random((2, 5)).shape`?"),
    "`(2, 5)`",
    [
      ["`(10,)`", "random-flat", "The `size` tuple sets the output shape."],
      ["`(5, 2)`", "random-transposed", "The shape is exactly what you pass."],
      ["`()`", "random-scalar", "A size argument makes an array."],
    ]),
  num(s(RN, "eval-same-seed", "apply", 3, 25, "After `a = np.random.default_rng(42).integers(0, 100, 5)` and `b = np.random.default_rng(42).integers(0, 100, 5)`, what is `int((a == b).sum())`?"), 5),
  num(s(RN, "eval-range-check", "apply", 3, 30, "After `rng = np.random.default_rng(1)`, `x = rng.integers(1, 7, 1000)`, what is `int(x.min() >= 1) + int(x.max() <= 6)`?"), 2),
  num(s(RN, "eval-choice-unique", "apply", 4, 35, "After `rng = np.random.default_rng(3)`, what is `len(set(rng.choice(10, size=10, replace=False).tolist()))`?"), 10),
  num(s(RN, "eval-permutation-sorted", "apply", 4, 35, "After `rng = np.random.default_rng(5)`, what is `int((np.sort(rng.permutation(8)) == np.arange(8)).all())`?"), 1),
  mcq(s(RN, "apply-shuffle-returns", "apply", 4, 35, "After `rng = np.random.default_rng(0)` and `a = np.arange(5)`, what is `rng.shuffle(a)`?"),
    "`None` — `shuffle` reorders `a` in place",
    [
      ["A shuffled copy of `a`", "shuffle-returns-copy", "That's `rng.permutation(a)`."],
      ["`a` itself", "shuffle-returns-self", "It returns `None`."],
      ["`TypeError`", "shuffle-error", "Shuffling an array works."],
    ]),
  num(s(RN, "apply-expected-uniform", "apply", 5, 40, "What is the expected value of `rng.uniform(2, 8)`?"), 5),
  short(s(RN, "explain-seed-reproducibility", "explain", 6, 120, "Why should a simulation in a research paper be run with a fixed seed, and why should you still report results over several seeds?"),
    [
      ["reproducible", "A fixed seed makes the exact run reproducible for others and for debugging", 2, true],
      ["variability", "One seed is one sample; results over several seeds show the variability, so conclusions don't hinge on a lucky draw", 2, true],
    ]),
  num(s(RN, "transfer-binomial-mean", "transfer", 7, 50, "What is the expected value of `rng.binomial(20, 0.3)`?"), 6),
  num(s(RN, "transfer-exponential-mean", "transfer", 7, 50, "In NumPy, `rng.exponential(scale)` has mean equal to `scale`. What is the variance of `rng.exponential(3)`?"), 9),
  mcq(s(RN, "transfer-spawn", "transfer", 8, 60, "Eight worker processes each need an independent random stream. What is the recommended approach?"),
    "Create child generators from one `SeedSequence` (e.g. `SeedSequence(42).spawn(8)` or `rng.spawn(8)`)",
    [
      ["Seed each worker with the same number", "same-seed-workers", "Identical seeds give identical streams."],
      ["Seed workers with $1$, $2$, …, $8$", "consecutive-seeds", "Hand-picked seeds aren't guaranteed independent; spawning is designed for this."],
      ["Share one global generator across processes", "shared-global", "Processes get copies of the state, so streams can repeat."],
    ]),
  num(s(RN, "transfer-mc-pi-bound", "transfer", 8, 60, "Estimating $\\pi$ as $4 \\times$ the fraction of $n$ uniform points in the unit square that land in the quarter circle has standard error $4\\sqrt{p(1-p)/n}$, where $p = \\pi/4$. What is it for $n = 10{,}000$, to three decimal places?"), 0.016),
  mcq(s(RN, "transfer-common-random-numbers", "transfer", 9, 75, "When comparing two policies by simulation, why reuse the same random draws for both?"),
    "Common random numbers make the noise in both runs correlated, so their *difference* has much lower variance",
    [
      ["It makes each policy's estimate unbiased", "crn-unbiased", "Each estimate is unbiased either way; CRN reduces the variance of the comparison."],
      ["It's required for the code to run", "crn-required", "It's a variance-reduction technique, not a requirement."],
      ["It makes the simulation faster", "crn-faster", "Speed isn't the main benefit."],
    ]),
  num(s(RN, "transfer-bootstrap-unique", "transfer", 9, 75, "In a bootstrap resample of size $n$, each original point is left out with probability $\\left(1 - \\frac{1}{n}\\right)^{n}$. What is this for $n = 1000$, to three decimal places?"), 0.368),
  short(s(RN, "transfer-sampling-weighted", "transfer", 10, 150, "`rng.choice(3, p=[1, 1, 2])` raises `ValueError`. Explain why, and how to sample index $2$ twice as often as each of the others."),
    [
      ["sum-to-one", "The probabilities must sum to $1$; these sum to $4$", 2, true],
      ["normalise", "Normalise the weights: `p = w / w.sum()`, giving `[0.25, 0.25, 0.5]`", 2, true],
    ]),
  code(s(RN, "code-simulate-dice", "apply", 5, 90, "Write `dice_freq(n, seed)` that rolls two six-sided dice `n` times using `np.random.default_rng(seed)` and returns the fraction of rolls whose total is $7$."),
    "import numpy as np\n\ndef dice_freq(n, seed):\n    pass\n",
    "import numpy as np\n\ndef dice_freq(n, seed):\n    rng = np.random.default_rng(seed)\n    rolls = rng.integers(1, 7, size=(n, 2))\n    return float((rolls.sum(axis=1) == 7).mean())\n",
    [
      ["close", "result = dice_freq(200000, 0)", "abs(result - 1 / 6) < 0.01"],
      ["reproducible", "r = dice_freq(1000, 5)\nresult = (r == dice_freq(1000, 5), 0 < r < 1)", "result == (True, True)"],
    ], NP),
  code(s(RN, "code-bootstrap-ci", "apply", 8, 150, "Write `bootstrap_mean_ci(x, B, seed)` returning a tuple `(lo, hi)`: the $2.5$th and $97.5$th percentiles of the means of `B` bootstrap resamples of the 1-D array `x`, using `np.random.default_rng(seed)`."),
    "import numpy as np\n\ndef bootstrap_mean_ci(x, B, seed):\n    pass\n",
    "import numpy as np\n\ndef bootstrap_mean_ci(x, B, seed):\n    rng = np.random.default_rng(seed)\n    idx = rng.integers(0, len(x), size=(B, len(x)))\n    means = x[idx].mean(axis=1)\n    lo, hi = np.percentile(means, [2.5, 97.5])\n    return float(lo), float(hi)\n",
    [
      ["contains", "import numpy as np\nx = np.arange(100, dtype=float)\nlo, hi = bootstrap_mean_ci(x, 2000, 1)\nresult = lo < 49.5 < hi and hi - lo < 15", "result == True"],
      ["constant", "import numpy as np\nresult = bootstrap_mean_ci(np.full(10, 3.0), 100, 0)", "result == (3.0, 3.0)"],
    ], NP),
];

export const pythonSixtyStdlibNumpyItems: Item[] = [
  ...modules,
  ...collectionsItems,
  ...datetimeItems,
  ...files,
  ...jsonItems,
  ...numpyDtypes,
  ...reshaping,
  ...aggregations,
  ...randomItems,
];
