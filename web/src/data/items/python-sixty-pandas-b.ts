import type { Item } from "../../lib/assessment/types";
import { code, mcq, num, s, short } from "./python-sixty-shared";

/**
 * Second half of the pandas chapter (apply through rolling windows) brought
 * to 60 questions each. Conventions are those of python-sixty-pandas-a.ts.
 */

const PD = ["pandas"];

// ---------------------------------------------------------------------------
// pandas-apply
// ---------------------------------------------------------------------------
const AP = "pandas-apply";
const apply: Item[] = [
  mcq(s(AP, "recall-map-series", "recall", 1, 15, "What does `s.map(f)` do for a Series `s`?"),
    "Applies `f` to each element and returns a new Series",
    [
      ["Applies `f` to the whole Series once", "map-whole", "That's `s.pipe(f)`."],
      ["Builds a dictionary from `s`", "map-dict", "`map` transforms values."],
      ["Filters `s` with `f`", "map-filters", "Filtering uses a boolean mask."],
    ]),
  mcq(s(AP, "recall-apply-axis", "recall", 1, 15, "In `df.apply(f)` with the default `axis=0`, what does `f` receive?"),
    "Each column, as a Series",
    [
      ["Each row, as a Series", "apply-default-rows", "Rows need `axis=1`."],
      ["Each individual value", "apply-elementwise", "That's `df.map(f)` (formerly `applymap`)."],
      ["The whole DataFrame", "apply-whole", "That's `df.pipe(f)`."],
    ]),
  mcq(s(AP, "recall-vectorised-first", "recall", 2, 20, "Which should you try first to double every value in a numeric column?"),
    "`df[\"x\"] * 2`",
    [
      ["`df[\"x\"].apply(lambda v: v * 2)`", "apply-first", "Works, but calls Python once per value — much slower."],
      ["A `for` loop over `df.iterrows()`", "iterrows-first", "The slowest option."],
      ["`df.map(lambda v: v * 2)` on the whole frame", "map-whole-frame", "That touches every column, not just `x`."],
    ]),
  num(s(AP, "eval-map-dict-sum", "apply", 3, 25, "What is `pd.Series([\"a\", \"b\", \"a\"]).map({\"a\": 1, \"b\": 10}).sum()`?"), 12),
  num(s(AP, "eval-apply-col-sum", "apply", 3, 30, "After `df = pd.DataFrame({\"a\": [1, 2], \"b\": [3, 4]})`, what is `df.apply(sum).tolist()[1]`?"), 7),
  num(s(AP, "eval-apply-row", "apply", 4, 35, "After `df = pd.DataFrame({\"a\": [1, 2], \"b\": [3, 4]})`, what is `df.apply(lambda r: r[\"a\"] * r[\"b\"], axis=1).sum()`?"), 11),
  mcq(s(AP, "eval-map-missing-key", "apply", 4, 35, "What is `pd.Series([\"a\", \"z\"]).map({\"a\": 1}).isna().tolist()`?"),
    "`[False, True]`",
    [
      ["`[False, False]`", "map-keeps-unmatched", "Values missing from the dict become `NaN`."],
      ["`KeyError`", "map-missing-raises", "`map` with a dict never raises for missing keys."],
      ["`[True, True]`", "map-all-nan", "`\"a\"` maps to $1$."],
    ]),
  mcq(s(AP, "eval-replace-keeps", "apply", 5, 40, "What is `pd.Series([\"a\", \"z\"]).replace({\"a\": \"A\"}).tolist()`?"),
    "`['A', 'z']`",
    [
      ["`['A', nan]`", "replace-is-map", "`replace` leaves unmatched values alone, unlike `map`."],
      ["`['a', 'z']`", "replace-noop", "`\"a\"` is replaced."],
      ["`KeyError`", "replace-missing-raises", "Unmatched values are just kept."],
    ]),
  num(s(AP, "eval-cut-codes", "apply", 5, 40, "What is `pd.cut([1, 4, 7, 10], bins=[0, 5, 10]).codes.sum()`?"), 2),
  num(s(AP, "eval-np-select", "apply", 5, 45, "After `x = pd.Series([5, 50, 500])`, what is `np.select([x < 10, x < 100], [1, 2], default=3).sum()`?"), 6),
  short(s(AP, "explain-apply-cost", "explain", 6, 120, "Explain why `df.apply(f, axis=1)` is slow on large frames, mentioning what pandas has to build for each call."),
    [
      ["series-per-row", "It builds a new Series object for every row and calls the Python function on it", 2, true],
      ["no-vectorisation", "So the work runs at Python speed row by row instead of in compiled array code", 2, true],
    ]),
  mcq(s(AP, "transfer-apply-mixed-dtype", "transfer", 7, 60, "A frame has an `int` column and a `str` column. Inside `df.apply(f, axis=1)`, what dtype does each row Series have?"),
    "`object` — a row must hold both kinds of value, so it's upcast to a common type",
    [
      ["`int64`", "row-keeps-first-dtype", "A single Series has one dtype; mixing ints and strings forces `object`."],
      ["Each value keeps its own column dtype", "row-mixed-dtypes", "A Series can't have per-element dtypes."],
      ["`string`", "row-string", "pandas uses `object` for this."],
    ]),
  num(s(AP, "eval-transform-vs-apply", "transfer", 8, 60, "After `s = pd.Series([1, 2, 3])`, what is `s.transform(lambda v: v - v.mean()).abs().sum()`?"), 2),
  num(s(AP, "eval-pipe-chain", "transfer", 8, 60, "After `df = pd.DataFrame({\"x\": [1, 2, 3]})` and `def add(d, k): return d.assign(x=d.x + k)`, what is `df.pipe(add, 10).pipe(add, k=1)[\"x\"].sum()`?"), 39),
  mcq(s(AP, "transfer-apply-returns-series", "transfer", 8, 60, "`df.apply(lambda r: pd.Series({\"lo\": r.min(), \"hi\": r.max()}), axis=1)` returns what shape for a $5$-row frame?"),
    "A DataFrame with $5$ rows and columns `lo` and `hi`",
    [
      ["A Series of $5$ Series", "apply-nested-series", "Returning a Series from each row expands into columns."],
      ["A $2$-row frame", "apply-transposed", "With `axis=1` the result has one row per input row."],
      ["An error", "apply-series-error", "Returning a Series per row is supported."],
    ]),
  short(s(AP, "transfer-vectorise-tax", "transfer", 9, 150, "Rewrite `df[\"band\"] = df.apply(lambda r: \"low\" if r.income < 30000 else (\"mid\" if r.income < 90000 else \"high\"), axis=1)` without `apply`, and say why the rewrite is better."),
    [
      ["vectorised", "Use `pd.cut(df.income, [-np.inf, 30000, 90000, np.inf], labels=[\"low\", \"mid\", \"high\"], right=False)` or `np.select`", 2, true],
      ["why", "It runs in vectorised code over the whole column instead of a Python call per row", 2, true],
    ]),
  num(s(AP, "eval-agg-list", "transfer", 9, 75, "What is `pd.Series([4, 1, 7]).agg([\"min\", \"max\", \"mean\"]).sum()`?"), 12),
  num(s(AP, "eval-cut-right-false", "transfer", 10, 90, "What is `pd.cut([0, 5, 10], bins=[0, 5, 10], right=False).isna().sum() + pd.cut([0, 5, 10], bins=[0, 5, 10]).isna().sum()`?"), 2),
  code(s(AP, "code-grade", "apply", 5, 90, "Write `letter(scores)` mapping a Series of scores to `\"A\"` (≥ 90), `\"B\"` (≥ 80), `\"C\"` (≥ 70) or `\"F\"`, without `apply`. Return a Series of strings."),
    "import numpy as np\nimport pandas as pd\n\ndef letter(scores):\n    pass\n",
    "import numpy as np\nimport pandas as pd\n\ndef letter(scores):\n    out = np.select([scores >= 90, scores >= 80, scores >= 70], [\"A\", \"B\", \"C\"], default=\"F\")\n    return pd.Series(out, index=scores.index)\n",
    [
      ["basic", "import pandas as pd\nresult = list(letter(pd.Series([95, 85, 75, 10])))", "result == [\"A\", \"B\", \"C\", \"F\"]"],
      ["edges", "import pandas as pd\nresult = list(letter(pd.Series([90, 80, 70, 69])))", "result == [\"A\", \"B\", \"C\", \"F\"]"],
    ], PD),
  code(s(AP, "code-lookup-map", "apply", 6, 90, "Write `attach_region(orders, regions)` returning a copy of `orders` with a `region` column, looked up from the dict `regions` by `orders[\"store\"]`; unknown stores get `\"unknown\"`."),
    "import pandas as pd\n\ndef attach_region(orders, regions):\n    pass\n",
    "import pandas as pd\n\ndef attach_region(orders, regions):\n    out = orders.copy()\n    out[\"region\"] = out[\"store\"].map(regions).fillna(\"unknown\")\n    return out\n",
    [
      ["basic", "import pandas as pd\no = pd.DataFrame({\"store\": [1, 2, 9]})\nresult = attach_region(o, {1: \"N\", 2: \"S\"})[\"region\"].tolist()", "result == [\"N\", \"S\", \"unknown\"]"],
    ], PD),
];

// ---------------------------------------------------------------------------
// pandas-strings
// ---------------------------------------------------------------------------
const ST = "pandas-strings";
const strs: Item[] = [
  mcq(s(ST, "recall-str-needed", "recall", 1, 15, "Why do you write `s.str.upper()` rather than `s.upper()` for a Series of strings?"),
    "String methods live on the `.str` accessor; a Series itself has no `upper` method",
    [
      ["`s.upper()` works too", "series-upper", "Series has no `upper` method; it raises `AttributeError`."],
      ["`.str` converts numbers to strings first", "str-converts", "`.str` only gives access to vectorised string methods."],
      ["`.str` makes it run in place", "str-in-place", "It returns a new Series."],
    ]),
  mcq(s(ST, "recall-str-startswith", "recall", 1, 15, "What does `s.str.startswith(\"Dr\")` return?"),
    "A boolean Series: `True` where the string begins with `\"Dr\"`",
    [
      ["The strings with `\"Dr\"` removed", "startswith-strips", "That would be `str.removeprefix`."],
      ["The position of `\"Dr\"`", "startswith-position", "That's `str.find`."],
      ["Only the matching strings", "startswith-filters", "It returns a mask; index with it to filter."],
    ]),
  mcq(s(ST, "recall-str-replace-regex", "recall", 2, 20, "In pandas $2$, does `s.str.replace(\".\", \"\")` treat `\".\"` as a regex by default?"),
    "No — the default is `regex=False`, so it removes literal dots",
    [
      ["Yes, so it removes every character", "replace-regex-default", "The default changed to literal matching in pandas $2.0$."],
      ["It raises unless `regex` is given", "replace-needs-regex", "`regex` defaults to `False`."],
      ["It replaces only the first dot", "replace-first-only", "All occurrences are replaced."],
    ]),
  num(s(ST, "eval-str-len-sum", "apply", 2, 20, "What is `pd.Series([\"ab\", \"cde\", \"\"]).str.len().sum()`?"), 5),
  mcq(s(ST, "eval-str-title", "apply", 3, 25, "What is `pd.Series([\"new york\"]).str.title()[0]`?"),
    "`'New York'`",
    [
      ["`'New york'`", "title-is-capitalize", "`title` capitalises every word; `capitalize` only the first."],
      ["`'NEW YORK'`", "title-is-upper", "That's `upper`."],
      ["`'new york'`", "title-noop", "`title` changes case."],
    ]),
  num(s(ST, "eval-str-count", "apply", 3, 30, "What is `pd.Series([\"banana\", \"apple\"]).str.count(\"a\").sum()`?"), 4),
  mcq(s(ST, "eval-str-slice", "apply", 4, 30, "What is `pd.Series([\"2024-03-15\"]).str[:4].tolist()`?"),
    "`['2024']`",
    [
      ["`['2024-']`", "slice-includes-stop", "The stop index $4$ is excluded."],
      ["`[2024]`", "str-slice-int", "Slicing strings returns strings."],
      ["`['03-15']`", "slice-from-end", "`[:4]` takes the first four characters."],
    ]),
  num(s(ST, "eval-extract-sum", "apply", 4, 35, "What is `pd.Series([\"id12\", \"id7\"]).str.extract(r\"(\\d+)\")[0].astype(int).sum()`?"), 19),
  mcq(s(ST, "eval-split-get", "apply", 5, 40, "What is `pd.Series([\"a b c\", \"d e\"]).str.split().str[-1].tolist()`?"),
    "`['c', 'e']`",
    [
      ["`['a', 'd']`", "split-get-first", "`-1` takes the last piece."],
      ["`[['a', 'b', 'c'], ['d', 'e']]`", "split-no-get", "`.str[-1]` indexes into each list."],
      ["`['c', nan]`", "split-short-nan", "`\"d e\"` has a last element, `\"e\"`."],
    ]),
  num(s(ST, "eval-split-expand", "apply", 5, 40, "What is `pd.Series([\"a,b,c\", \"d\"]).str.split(\",\", expand=True).shape[1]`?"), 3),
  short(s(ST, "explain-normalise-join", "explain", 6, 120, "Two tables should join on `name`, but only $60\\%$ of rows match. Give three normalisations to apply to both columns before joining."),
    [
      ["case", "Lowercase (or casefold) both", 1, true],
      ["whitespace", "Strip leading/trailing spaces and collapse inner whitespace", 1, true],
      ["other", "Remove punctuation/accents or unify abbreviations (e.g. `St.` → `Street`)", 1],
    ]),
  mcq(s(ST, "transfer-contains-regex-special", "transfer", 7, 50, "`s = pd.Series([\"a+b\", \"ab\"])`. What is `s.str.contains(\"a+b\").tolist()`?"),
    "`[False, True]` — `contains` uses regex by default, where `a+b` means one or more `a`s followed by `b`",
    [
      ["`[True, False]`", "contains-literal-default", "Unlike `replace`, `contains` defaults to `regex=True`."],
      ["`[True, True]`", "contains-both", "The literal `\"a+b\"` contains no `a` directly followed by `b`."],
      ["An error for the `+`", "contains-plus-error", "`a+b` is a valid regex."],
    ]),
  num(s(ST, "eval-contains-literal", "transfer", 7, 50, "What is `pd.Series([\"a+b\", \"ab\"]).str.contains(\"a+b\", regex=False).sum()`?"), 1),
  num(s(ST, "eval-extract-groups", "transfer", 8, 60, "What is `pd.Series([\"3x4\", \"10x2\"]).str.extract(r\"(\\d+)x(\\d+)\").astype(int).prod(axis=1).sum()`?"), 32),
  mcq(s(ST, "transfer-cat-nan", "transfer", 8, 60, "`first = pd.Series([\"Ada\", None])` and `last = pd.Series([\"L\", \"H\"])`. What is `(first + \" \" + last).isna().tolist()`?"),
    "`[False, True]` — any missing piece makes the whole concatenation missing",
    [
      ["`[False, False]`", "concat-none-string", "`None` isn't turned into text; it propagates as missing."],
      ["`TypeError`", "concat-none-error", "pandas handles the missing value without raising."],
      ["`[True, True]`", "concat-all-nan", "Only the second row has a missing part."],
    ]),
  num(s(ST, "eval-extractall", "transfer", 9, 75, "What is `len(pd.Series([\"a1b2c3\", \"d4\"]).str.extractall(r\"(\\d)\"))`?"), 4),
  mcq(s(ST, "transfer-catastrophic-backtracking", "transfer", 9, 75, "Why can `s.str.contains(r\"(a+)+$\")` hang on a string of many `a`s ending in `b`?"),
    "Nested quantifiers make the regex engine try exponentially many ways to split the `a`s before failing",
    [
      ["pandas loops over characters in Python", "pandas-char-loop", "The cost is in the regex engine's backtracking."],
      ["`$` isn't supported", "dollar-unsupported", "`$` is supported."],
      ["The string is too long for pandas", "string-too-long", "Length alone isn't the issue; the pattern is."],
    ]),
  short(s(ST, "transfer-str-on-mixed", "transfer", 9, 150, "An `object` column holds strings and a few integers. What does `s.str.lower()` produce for the integers, and how would you make every value lowercase text?"),
    [
      ["nan", "Non-string values become `NaN`", 2, true],
      ["fix", "Convert first with `s.astype(str).str.lower()` (or the `string` dtype)", 2, true],
    ]),
  code(s(ST, "code-emails-domain", "apply", 5, 90, "Write `domains(emails)` returning a Series of the lowercased domain part (after `@`) of each email in a Series."),
    "import pandas as pd\n\ndef domains(emails):\n    pass\n",
    "import pandas as pd\n\ndef domains(emails):\n    return emails.str.split(\"@\").str[-1].str.lower()\n",
    [
      ["basic", "import pandas as pd\nresult = domains(pd.Series([\"a@X.com\", \"b@y.org\"])).tolist()", "result == [\"x.com\", \"y.org\"]"],
    ], PD),
  code(s(ST, "code-clean-names", "apply", 6, 90, "Write `clean(names)` that strips whitespace, collapses runs of inner spaces to one, and title-cases each name in a Series."),
    "import pandas as pd\n\ndef clean(names):\n    pass\n",
    "import pandas as pd\n\ndef clean(names):\n    return names.str.strip().str.replace(r\"\\s+\", \" \", regex=True).str.title()\n",
    [
      ["basic", "import pandas as pd\nresult = clean(pd.Series([\"  ada   lovelace \", \"ALAN turing\"])).tolist()", "result == [\"Ada Lovelace\", \"Alan Turing\"]"],
    ], PD),
];

// ---------------------------------------------------------------------------
// pandas-datetime
// ---------------------------------------------------------------------------
const DTM = "pandas-datetime";
const datetime: Item[] = [
  mcq(s(DTM, "recall-timestamp", "recall", 1, 15, "What is a pandas `Timestamp`?"),
    "A single point in time, pandas' version of Python's `datetime`",
    [
      ["A length of time", "timestamp-duration", "A length of time is a `Timedelta`."],
      ["A string in date format", "timestamp-string", "It's a real datetime object, not text."],
      ["A column of dates", "timestamp-column", "A column of them is a `datetime64` Series."],
    ]),
  mcq(s(DTM, "recall-timedelta", "recall", 1, 15, "What do you get from subtracting one `Timestamp` from another?"),
    "A `Timedelta`",
    [
      ["A `Timestamp`", "subtract-timestamp", "The difference between two points in time is a duration."],
      ["A number of seconds as an `int`", "subtract-int", "It's a `Timedelta`; use `.total_seconds()` for a number."],
      ["An error", "subtract-error", "Subtracting timestamps is defined."],
    ]),
  mcq(s(DTM, "recall-dt-year", "recall", 2, 20, "For a `datetime64` Series `s`, how do you get the year of each value?"),
    "`s.dt.year`",
    [
      ["`s.year`", "series-year", "Datetime components are on the `.dt` accessor."],
      ["`s.str[:4]`", "str-year", "That works on text, not datetimes, and returns strings."],
      ["`s.dt.year()`", "dt-year-call", "`year` is an attribute, not a method."],
    ]),
  num(s(DTM, "eval-day", "apply", 2, 20, "What is `pd.Timestamp(\"2024-07-04\").day`?"), 4),
  num(s(DTM, "eval-delta-days", "apply", 3, 25, "What is `(pd.Timestamp(\"2024-03-10\") - pd.Timestamp(\"2024-02-25\")).days`?"), 14),
  num(s(DTM, "eval-dayofweek", "apply", 3, 30, "Monday is $0$. $4$ July $2024$ was a Thursday. What is `pd.Timestamp(\"2024-07-04\").dayofweek`?"), 3),
  num(s(DTM, "eval-date-range-len", "apply", 3, 30, "What is `len(pd.date_range(\"2024-01-01\", \"2024-01-31\", freq=\"7D\"))`?"), 5),
  mcq(s(DTM, "eval-day-name", "apply", 4, 30, "What is `pd.Timestamp(\"2024-12-25\").day_name()`?"),
    "`'Wednesday'`",
    [
      ["`'Tuesday'`", "xmas-tuesday", "$25$ December $2024$ fell on a Wednesday."],
      ["`'Thursday'`", "xmas-thursday", "It was a Wednesday."],
      ["`2`", "day-name-number", "`day_name()` returns text; `dayofweek` returns the number."],
    ]),
  num(s(DTM, "eval-month-end", "apply", 4, 35, "What is `(pd.Timestamp(\"2024-02-10\") + pd.offsets.MonthEnd()).day`?"), 29),
  num(s(DTM, "eval-resample-sum", "apply", 5, 45, "After `s = pd.Series(range(10), index=pd.date_range(\"2024-01-01\", periods=10, freq=\"D\"))`, what is `s.resample(\"5D\").sum().iloc[1]`?"), 35),
  short(s(DTM, "explain-dayfirst", "explain", 6, 120, "Why is `\"03/04/2024\"` dangerous to parse without `format=` or `dayfirst=`, and how should a pipeline handle it?"),
    [
      ["ambiguous", "It could be $4$ March or $3$ April depending on convention", 2, true],
      ["fix", "Pass an explicit `format=\"%d/%m/%Y\"` (or `dayfirst=True`) so parsing is unambiguous and consistent", 2, true],
    ]),
  mcq(s(DTM, "transfer-to-datetime-unit", "transfer", 7, 50, "A column holds Unix timestamps in seconds, such as `1700000000`. Which converts it correctly?"),
    "`pd.to_datetime(s, unit=\"s\")`",
    [
      ["`pd.to_datetime(s)`", "unix-default-ns", "Without `unit`, integers are read as nanoseconds — giving dates in $1970$."],
      ["`pd.to_datetime(s.astype(str))`", "unix-as-string", "The digits aren't a date format."],
      ["`s.astype(\"datetime64[D]\")`", "unix-days", "That reads the numbers as days."],
    ]),
  num(s(DTM, "eval-unix-year", "transfer", 7, 50, "What is `pd.to_datetime(1700000000, unit=\"s\").year`?"), 2023),
  num(s(DTM, "eval-bdate-range", "transfer", 8, 60, "$1$ March $2024$ was a Friday. What is `len(pd.bdate_range(\"2024-03-01\", \"2024-03-10\"))`?"), 6),
  num(s(DTM, "eval-tz-convert", "transfer", 8, 60, "What is `pd.Timestamp(\"2024-01-15 12:00\", tz=\"UTC\").tz_convert(\"Asia/Tokyo\").hour`?"), 21),
  mcq(s(DTM, "transfer-naive-vs-aware", "transfer", 8, 60, "What happens when you compare a time-zone-aware `Timestamp` with a naive one?"),
    "`TypeError` — pandas refuses to guess which time zone the naive one is in",
    [
      ["The naive one is assumed to be UTC", "naive-utc", "No assumption is made; the comparison raises."],
      ["The naive one is assumed to be local time", "naive-local", "pandas doesn't guess."],
      ["The comparison is always `False`", "naive-false", "It raises rather than returning a value."],
    ]),
  num(s(DTM, "eval-period-days", "transfer", 9, 75, "What is `pd.Period(\"2024-02\", freq=\"M\").days_in_month + pd.Period(\"2023-02\", freq=\"M\").days_in_month`?"), 57),
  short(s(DTM, "transfer-dst-gap", "transfer", 10, 180, "`pd.date_range(\"2024-03-10 01:00\", periods=3, freq=\"h\", tz=\"US/Eastern\")` skips from $1$ a.m. to $3$ a.m. Explain why, and why that matters when aggregating hourly data by local time."),
    [
      ["dst", "Clocks spring forward for daylight saving time, so $2$ a.m. local time doesn't exist that day", 2, true],
      ["aggregation", "Local-time days can have $23$ or $25$ hours, so hourly counts per local day differ; aggregate in UTC or account for it", 2, true],
    ]),
  code(s(DTM, "code-weekday-share", "apply", 5, 90, "Write `weekend_share(dates)` taking a Series of date strings and returning the fraction that fall on Saturday or Sunday."),
    "import pandas as pd\n\ndef weekend_share(dates):\n    pass\n",
    "import pandas as pd\n\ndef weekend_share(dates):\n    d = pd.to_datetime(dates)\n    return float((d.dt.dayofweek >= 5).mean())\n",
    [
      ["basic", "import pandas as pd\nresult = weekend_share(pd.Series([\"2024-03-09\", \"2024-03-10\", \"2024-03-11\", \"2024-03-12\"]))", "result == 0.5"],
    ], PD),
  code(s(DTM, "code-monthly-total", "apply", 7, 120, "Write `monthly(df)` taking columns `date` (strings) and `amount`, and returning a Series of total `amount` per calendar month, indexed by month-start timestamps."),
    "import pandas as pd\n\ndef monthly(df):\n    pass\n",
    "import pandas as pd\n\ndef monthly(df):\n    s = df.set_index(pd.to_datetime(df[\"date\"]))[\"amount\"]\n    return s.resample(\"MS\").sum()\n",
    [
      ["totals", "import pandas as pd\nd = pd.DataFrame({\"date\": [\"2024-01-05\", \"2024-01-20\", \"2024-02-01\"], \"amount\": [10, 5, 7]})\nresult = monthly(d).tolist()", "result == [15, 7]"],
      ["index", "import pandas as pd\nd = pd.DataFrame({\"date\": [\"2024-01-05\", \"2024-02-01\"], \"amount\": [1, 2]})\nresult = str(monthly(d).index[1].date())", "result == \"2024-02-01\""],
    ], PD),
];

// ---------------------------------------------------------------------------
// pandas-pivot
// ---------------------------------------------------------------------------
const PV = "pandas-pivot";
const LONG = "pd.DataFrame({\"g\": [\"a\", \"a\", \"b\", \"b\", \"a\"], \"k\": [\"x\", \"y\", \"x\", \"y\", \"x\"], \"v\": [1, 2, 3, 4, 5]})";
const pivot: Item[] = [
  mcq(s(PV, "recall-wide-long", "recall", 1, 15, "In *long* format, each row holds…"),
    "One observation: an identifier, a variable name and a value",
    [
      ["One subject with every variable as its own column", "long-is-wide", "That's wide format."],
      ["A summary of many rows", "long-is-summary", "Long format is the unsummarised, tidy layout."],
      ["Only numbers", "long-numbers", "Long rows can hold any types."],
    ]),
  mcq(s(PV, "recall-melt-direction", "recall", 1, 15, "Which direction does `melt` reshape?"),
    "Wide to long",
    [
      ["Long to wide", "melt-long-to-wide", "That's `pivot` / `pivot_table`."],
      ["Rows to a single cell", "melt-collapse", "`melt` stacks columns into rows."],
      ["It sorts columns", "melt-sorts", "It reshapes."],
    ]),
  mcq(s(PV, "recall-crosstab-counts", "recall", 2, 20, "What does `pd.crosstab(df.a, df.b)` show by default?"),
    "How many rows have each combination of `a` and `b`",
    [
      ["The mean of `a` for each `b`", "crosstab-mean", "Counts are the default; means need `values` and `aggfunc`."],
      ["The correlation of `a` and `b`", "crosstab-corr", "It's a frequency table."],
      ["The rows where `a == b`", "crosstab-filter", "It tabulates every combination."],
    ]),
  num(s(PV, "eval-pivot-mean", "apply", 3, 30, `After \`df = ${LONG}\`, what is \`df.pivot_table(index="g", columns="k", values="v").loc["a", "x"]\`?`), 3),
  num(s(PV, "eval-pivot-sum", "apply", 3, 30, `After \`df = ${LONG}\`, what is \`df.pivot_table(index="g", columns="k", values="v", aggfunc="sum").loc["a", "x"]\`?`), 6),
  num(s(PV, "eval-crosstab-cell", "apply", 3, 30, `After \`df = ${LONG}\`, what is \`pd.crosstab(df.g, df.k).loc["a", "x"]\`?`), 2),
  num(s(PV, "eval-margins", "apply", 4, 35, `After \`df = ${LONG}\`, what is \`pd.crosstab(df.g, df.k, margins=True).loc["All", "All"]\`?`), 5),
  mcq(s(PV, "eval-pivot-dup-error", "apply", 4, 35, `After \`df = ${LONG}\`, what does \`df.pivot(index="g", columns="k", values="v")\` do?`),
    "`ValueError`",
    [
      ["Returns the mean for `(a, x)`", "pivot-averages", "`pivot` doesn't aggregate; duplicate `(a, x)` pairs make it raise."],
      ["Keeps the first value for `(a, x)`", "pivot-first", "It refuses rather than choosing."],
      ["Keeps the last value for `(a, x)`", "pivot-last", "It refuses rather than choosing."],
    ]),
  num(s(PV, "eval-melt-len", "apply", 4, 35, "After `w = pd.DataFrame({\"id\": [1, 2], \"q1\": [5, 6], \"q2\": [7, 8], \"q3\": [9, 0]})`, what is `len(w.melt(id_vars=\"id\"))`?"), 6),
  num(s(PV, "eval-normalize-index", "apply", 5, 40, `After \`df = ${LONG}\`, what is \`pd.crosstab(df.g, df.k, normalize="index").loc["a", "x"].round(4)\`?`), 0.6667),
  short(s(PV, "explain-pivot-vs-pivot-table", "explain", 6, 120, "Explain when `pivot` raises and `pivot_table` doesn't, and what `pivot_table` does differently."),
    [
      ["duplicates", "`pivot` raises when an index/column pair appears more than once", 2, true],
      ["aggregate", "`pivot_table` aggregates duplicates (mean by default, or a chosen `aggfunc`)", 2, true],
    ]),
  mcq(s(PV, "transfer-unstack-stack", "transfer", 7, 50, "A Series indexed by `(g, k)` pairs is `.unstack()`ed. What happens?"),
    "The inner level `k` becomes columns, giving a `g` × `k` table",
    [
      ["The outer level `g` becomes columns", "unstack-outer", "By default the innermost level is moved."],
      ["The index is dropped", "unstack-drops", "Index levels move to columns; nothing is lost."],
      ["It's converted to a list of tuples", "unstack-tuples", "It reshapes into a DataFrame."],
    ]),
  num(s(PV, "eval-groupby-unstack", "transfer", 8, 60, `After \`df = ${LONG}\`, what is \`df.groupby(["g", "k"])["v"].sum().unstack().loc["b"].sum()\`?`), 7),
  num(s(PV, "eval-fill-value", "transfer", 8, 60, "After `d = pd.DataFrame({\"g\": [\"a\", \"b\"], \"k\": [\"x\", \"y\"], \"v\": [1, 2]})`, what is `d.pivot_table(index=\"g\", columns=\"k\", values=\"v\", fill_value=0).values.sum()`?"), 3),
  mcq(s(PV, "transfer-wide-to-long-names", "transfer", 8, 60, "Columns are `id, sales_2023, sales_2024`. After `melt(id_vars=\"id\", var_name=\"year\")`, what does the `year` column contain?"),
    "The strings `\"sales_2023\"` and `\"sales_2024\"` — extract the year with `.str[-4:]` afterwards (or use `pd.wide_to_long`)",
    [
      ["The integers $2023$ and $2024$", "melt-parses-years", "`melt` copies column names as they are."],
      ["The sales values", "melt-var-is-value", "Values go to the `value` column."],
      ["The `id` values", "melt-var-is-id", "`id` stays in its own column."],
    ]),
  num(s(PV, "eval-pivot-multi-agg", "transfer", 9, 75, `After \`df = ${LONG}\`, what is \`df.pivot_table(index="g", values="v", aggfunc=["min", "max"]).values.sum()\`?`), 13),
  short(s(PV, "transfer-simpsons", "transfer", 9, 150, "A crosstab shows treatment A has a higher overall recovery rate than B, yet B is better within every severity group. Explain how this can happen and what table you should look at."),
    [
      ["confounder", "Simpson's paradox: severity is related to both treatment choice and outcome (e.g. A was given mostly to mild cases)", 2, true],
      ["stratify", "Compare within each severity stratum (a three-way table / pivot with severity) rather than the pooled crosstab", 2, true],
    ]),
  num(s(PV, "eval-margins-mean", "transfer", 10, 90, `After \`df = ${LONG}\`, what is \`df.pivot_table(index="g", columns="k", values="v", margins=True).loc["All", "x"]\`?`), 3),
  code(s(PV, "code-to-wide", "apply", 5, 90, "Write `to_wide(df)` that takes long data with columns `store`, `month` and `sales` and returns a table with one row per store, one column per month, summing duplicates and filling missing combinations with $0$."),
    "import pandas as pd\n\ndef to_wide(df):\n    pass\n",
    "import pandas as pd\n\ndef to_wide(df):\n    return df.pivot_table(index=\"store\", columns=\"month\", values=\"sales\", aggfunc=\"sum\", fill_value=0)\n",
    [
      ["values", "import pandas as pd\nd = pd.DataFrame({\"store\": [\"A\", \"A\", \"B\"], \"month\": [\"jan\", \"jan\", \"feb\"], \"sales\": [1, 2, 5]})\nw = to_wide(d)\nresult = (int(w.loc[\"A\", \"jan\"]), int(w.loc[\"A\", \"feb\"]), int(w.loc[\"B\", \"feb\"]))", "result == (3, 0, 5)"],
    ], PD),
  code(s(PV, "code-to-long", "apply", 6, 90, "Write `to_long(df)` that turns columns `id, q1, q2, …` into rows with columns `id`, `quarter` (e.g. `\"q1\"`) and `value`, sorted by `id` then `quarter`, with a fresh index."),
    "import pandas as pd\n\ndef to_long(df):\n    pass\n",
    "import pandas as pd\n\ndef to_long(df):\n    out = df.melt(id_vars=\"id\", var_name=\"quarter\", value_name=\"value\")\n    return out.sort_values([\"id\", \"quarter\"]).reset_index(drop=True)\n",
    [
      ["shape", "import pandas as pd\nd = pd.DataFrame({\"id\": [2, 1], \"q1\": [5, 6], \"q2\": [7, 8]})\nr = to_long(d)\nresult = (list(r.columns), r.shape)", "result == ([\"id\", \"quarter\", \"value\"], (4, 3))"],
      ["order", "import pandas as pd\nd = pd.DataFrame({\"id\": [2, 1], \"q1\": [5, 6], \"q2\": [7, 8]})\nresult = to_long(d)[\"value\"].tolist()", "result == [6, 8, 5, 7]"],
    ], PD),
];

// ---------------------------------------------------------------------------
// pandas-concat
// ---------------------------------------------------------------------------
const CC = "pandas-concat";
const A2 = "pd.DataFrame({\"k\": [1, 2], \"a\": [10, 20]})";
const B2 = "pd.DataFrame({\"k\": [2, 3], \"b\": [200, 300]})";
const concat: Item[] = [
  mcq(s(CC, "recall-concat-stack", "recall", 1, 15, "What does `pd.concat([df1, df2])` do by default?"),
    "Stacks the rows of `df2` below the rows of `df1`",
    [
      ["Joins them side by side on a key", "concat-is-merge", "Key-based joining is `merge`."],
      ["Adds the values element by element", "concat-adds", "Values aren't combined arithmetically."],
      ["Keeps only rows present in both", "concat-intersects", "Rows are stacked, not intersected."],
    ]),
  mcq(s(CC, "recall-merge-key", "recall", 1, 15, "What does `pd.merge(a, b, on=\"id\")` match rows by?"),
    "Equal values in the `id` column",
    [
      ["Row position", "merge-position", "Matching is by key values."],
      ["The index", "merge-index", "Index joins need `left_index`/`right_index` or `.join`."],
      ["All columns with equal names", "merge-all-cols", "With `on=\"id\"` only `id` is the key."],
    ]),
  mcq(s(CC, "recall-ignore-index", "recall", 2, 20, "What does `ignore_index=True` do in `pd.concat`?"),
    "Gives the result a fresh `0..n-1` index instead of keeping the originals",
    [
      ["Drops the index column from the output", "ignore-index-drops", "The result still has an index, just renumbered."],
      ["Ignores rows whose index repeats", "ignore-index-dedupes", "No rows are dropped."],
      ["Sorts by the index", "ignore-index-sorts", "Nothing is sorted."],
    ]),
  num(s(CC, "eval-concat-len", "apply", 2, 20, `After \`a = ${A2}\` and \`b = ${B2}\`, what is \`len(pd.concat([a, b]))\`?`), 4),
  num(s(CC, "eval-concat-cols", "apply", 3, 30, `After \`a = ${A2}\` and \`b = ${B2}\`, what is \`pd.concat([a, b]).shape[1]\`?`), 3),
  num(s(CC, "eval-concat-nan", "apply", 3, 30, `After \`a = ${A2}\` and \`b = ${B2}\`, what is \`pd.concat([a, b]).isna().sum().sum()\`?`), 4),
  num(s(CC, "eval-merge-inner", "apply", 3, 30, `After \`a = ${A2}\` and \`b = ${B2}\`, what is \`len(pd.merge(a, b, on="k"))\`?`), 1),
  num(s(CC, "eval-merge-outer", "apply", 4, 35, `After \`a = ${A2}\` and \`b = ${B2}\`, what is \`len(pd.merge(a, b, on="k", how="outer"))\`?`), 3),
  num(s(CC, "eval-merge-left-nan", "apply", 4, 35, `After \`a = ${A2}\` and \`b = ${B2}\`, what is \`pd.merge(a, b, on="k", how="left")["b"].isna().sum()\`?`), 1),
  mcq(s(CC, "eval-concat-inner", "apply", 5, 40, `After \`a = ${A2}\` and \`b = ${B2}\`, what is \`pd.concat([a, b], join="inner").columns.tolist()\`?`),
    "`['k']`",
    [
      ["`['k', 'a', 'b']`", "inner-is-outer", "`join=\"inner\"` keeps only columns shared by every frame."],
      ["`[]`", "inner-empty", "`k` is in both."],
      ["`['a', 'b']`", "inner-unshared", "It keeps the shared columns."],
    ]),
  short(s(CC, "explain-concat-vs-merge", "explain", 6, 120, "When do you use `pd.concat` and when `pd.merge`? Give an example of each."),
    [
      ["concat", "`concat` stacks frames with the same kind of rows (e.g. twelve monthly files) or glues columns by index", 2, true],
      ["merge", "`merge` joins different tables on key columns (e.g. orders with customer details by `customer_id`)", 2, true],
    ]),
  mcq(s(CC, "transfer-merge-suffixes", "transfer", 7, 50, "Both frames have a non-key column `price`. After `pd.merge(a, b, on=\"id\")`, what are the price columns called?"),
    "`price_x` and `price_y`",
    [
      ["`price` (from the left frame only)", "merge-left-only", "Both are kept, disambiguated with suffixes."],
      ["`price` and `price.1`", "merge-dot-suffix", "That's `read_csv`'s convention for duplicate headers."],
      ["`ValueError`", "merge-dup-col-error", "pandas adds suffixes rather than raising."],
    ]),
  num(s(CC, "eval-many-to-many", "transfer", 8, 60, "After `l = pd.DataFrame({\"k\": [1, 1, 2]})` and `r = pd.DataFrame({\"k\": [1, 1, 1, 2]})`, what is `len(pd.merge(l, r, on=\"k\"))`?"), 7),
  mcq(s(CC, "transfer-validate", "transfer", 8, 60, "What does `pd.merge(orders, customers, on=\"cid\", validate=\"many_to_one\")` add?"),
    "It raises if `cid` is not unique in `customers`, catching accidental row duplication",
    [
      ["It removes duplicate orders", "validate-dedupes", "It only checks; it doesn't change data."],
      ["It checks every order has a customer", "validate-coverage", "That's what `indicator=True` helps with; `validate` checks key uniqueness."],
      ["It speeds up the merge", "validate-speed", "It's a correctness check."],
    ]),
  num(s(CC, "eval-indicator", "transfer", 8, 60, `After \`a = ${A2}\` and \`b = ${B2}\`, what is \`(pd.merge(a, b, on="k", how="outer", indicator=True)["_merge"] == "both").sum()\`?`), 1),
  mcq(s(CC, "transfer-concat-int-float", "transfer", 8, 60, "Concatenating twelve monthly frames turns an `int64` `qty` column into `float64`. What is the most likely cause?"),
    "At least one frame is missing the `qty` column (or has a missing value), so `NaN`s were introduced",
    [
      ["`concat` always converts to float", "concat-always-float", "Matching int columns stay `int64`."],
      ["The frames had different index types", "concat-index-float", "The index doesn't change column dtypes."],
      ["`ignore_index=True` changes dtypes", "ignore-index-dtype", "It only renumbers rows."],
    ]),
  short(s(CC, "transfer-row-explosion", "transfer", 9, 150, "A left merge of $10{,}000$ orders onto a product table returns $10{,}450$ rows. Explain the cause and how to diagnose and prevent it."),
    [
      ["duplicate-keys", "The product table has duplicate keys, so some orders matched several products", 2, true],
      ["diagnose", "Check `products[key].duplicated().sum()` / `value_counts()`", 1],
      ["prevent", "Deduplicate the lookup table and use `validate=\"many_to_one\"`", 1, true],
    ]),
  num(s(CC, "eval-concat-keys", "transfer", 9, 75, `After \`a = ${A2}\` and \`b = ${B2}\`, what is \`pd.concat([a, b], keys=["x", "y"]).loc["y", "k"].sum()\`?`), 5),
  code(s(CC, "code-stack-files", "apply", 5, 90, "Write `stack(frames)` that concatenates a list of DataFrames row-wise with a fresh index and adds a `source` column holding each row's position in the list ($0$, $1$, …)."),
    "import pandas as pd\n\ndef stack(frames):\n    pass\n",
    "import pandas as pd\n\ndef stack(frames):\n    return pd.concat([f.assign(source=i) for i, f in enumerate(frames)], ignore_index=True)\n",
    [
      ["source", "import pandas as pd\nr = stack([pd.DataFrame({\"v\": [1, 2]}), pd.DataFrame({\"v\": [3]})])\nresult = (r[\"source\"].tolist(), list(r.index))", "result == ([0, 0, 1], [0, 1, 2])"],
    ], PD),
  code(s(CC, "code-enrich", "apply", 7, 120, "Write `enrich(orders, customers)` returning `orders` with the customer `name` attached by `cid`, keeping every order (missing customers get `NaN`), and raising if a `cid` appears more than once in `customers`."),
    "import pandas as pd\n\ndef enrich(orders, customers):\n    pass\n",
    "import pandas as pd\n\ndef enrich(orders, customers):\n    return orders.merge(customers[[\"cid\", \"name\"]], on=\"cid\", how=\"left\", validate=\"many_to_one\")\n",
    [
      ["left", "import pandas as pd\no = pd.DataFrame({\"oid\": [1, 2, 3], \"cid\": [10, 20, 99]})\nc = pd.DataFrame({\"cid\": [10, 20], \"name\": [\"a\", \"b\"]})\nr = enrich(o, c)\nresult = (len(r), r[\"name\"].tolist()[:2], bool(r[\"name\"].isna().iloc[2]))", "result == (3, [\"a\", \"b\"], True)"],
      ["dupes", "import pandas as pd\no = pd.DataFrame({\"oid\": [1], \"cid\": [10]})\nc = pd.DataFrame({\"cid\": [10, 10], \"name\": [\"a\", \"b\"]})\ntry:\n    enrich(o, c)\n    result = \"no error\"\nexcept Exception:\n    result = \"raised\"", "result == \"raised\""],
    ], PD),
];

// ---------------------------------------------------------------------------
// pandas-window
// ---------------------------------------------------------------------------
const WN = "pandas-window";
const W5 = "pd.Series([2, 4, 6, 8, 10])";
const windowItems: Item[] = [
  mcq(s(WN, "recall-rolling-meaning", "recall", 1, 15, "What is a rolling (moving) window?"),
    "A fixed-size block of consecutive rows that slides along the data, with a statistic computed at each step",
    [
      ["All rows up to the current one", "rolling-is-expanding", "That's an expanding window."],
      ["A random sample of rows", "rolling-random", "Windows are consecutive."],
      ["The rows of one group", "rolling-is-group", "That's `groupby`."],
    ]),
  mcq(s(WN, "recall-cumsum", "recall", 1, 15, "What is `cumsum` short for?"),
    "Cumulative sum: the running total",
    [
      ["Cumulative summary", "cumsum-summary", "It's specifically a running sum."],
      ["Column sum", "cumsum-column", "That's `sum()`."],
      ["Cumulative sample", "cumsum-sample", "It computes running totals."],
    ]),
  mcq(s(WN, "recall-shift-direction", "recall", 2, 20, "After `s.shift(1)`, what value sits at position $5$?"),
    "The value that was at position $4$",
    [
      ["The value that was at position $6$", "shift-forward-is-next", "`shift(1)` moves values *down*, so each row sees the previous one; `shift(-1)` shows the next."],
      ["The original value at $5$ plus one", "shift-adds", "`shift` moves values; it doesn't add."],
      ["`NaN`", "shift-all-nan", "Only the first position becomes `NaN`."],
    ]),
  num(s(WN, "eval-rolling-mean-last", "apply", 3, 25, `After \`s = ${W5}\`, what is \`s.rolling(2).mean().iloc[-1]\`?`), 9),
  num(s(WN, "eval-cumsum-last", "apply", 2, 20, `After \`s = ${W5}\`, what is \`s.cumsum().iloc[-1]\`?`), 30),
  num(s(WN, "eval-rolling-nan", "apply", 3, 25, `After \`s = ${W5}\`, what is \`s.rolling(4).sum().isna().sum()\`?`), 3),
  num(s(WN, "eval-diff-sum", "apply", 3, 30, `After \`s = ${W5}\`, what is \`s.diff().sum()\`?`), 8),
  num(s(WN, "eval-pct-change", "apply", 4, 35, `After \`s = ${W5}\`, what is \`s.pct_change().iloc[1]\`?`), 1),
  num(s(WN, "eval-min-periods", "apply", 4, 35, `After \`s = ${W5}\`, what is \`s.rolling(3, min_periods=1).mean().iloc[1]\`?`), 3),
  num(s(WN, "eval-expanding-max", "apply", 4, 35, "What is `pd.Series([3, 1, 4, 1, 5]).expanding().max().tolist()[3]`?"), 4),
  num(s(WN, "eval-centered", "apply", 5, 40, `After \`s = ${W5}\`, what is \`s.rolling(3, center=True).mean().iloc[1]\`?`), 4),
  short(s(WN, "explain-lookahead", "explain", 6, 120, "A model predicts each day's sales, using as a feature `sales.rolling(7).mean()` computed on the same row. Why does this leak the target, and how do you fix it?"),
    [
      ["includes-current", "The rolling mean at row $t$ includes day $t$'s sales — the very value being predicted", 2, true],
      ["shift", "Shift so each row uses only past values, e.g. `sales.shift(1).rolling(7).mean()`", 2, true],
    ]),
  mcq(s(WN, "transfer-ewm-weights", "transfer", 7, 50, "How does `s.ewm(alpha=0.5).mean()` weight past values compared with `s.rolling(3).mean()`?"),
    "Exponentially decaying weights on *all* past values, versus equal weights on the last $3$ only",
    [
      ["Equal weights on all past values", "ewm-equal", "That's an expanding mean."],
      ["Equal weights on the last two values", "ewm-window-two", "EWM has no hard cut-off."],
      ["Larger weights on older values", "ewm-old-heavier", "Recent values weigh most."],
    ]),
  num(s(WN, "eval-ewm-adjust-false", "transfer", 8, 60, "What is `pd.Series([0.0, 10.0, 10.0]).ewm(alpha=0.5, adjust=False).mean().iloc[-1]`?"), 7.5),
  num(s(WN, "eval-group-rolling", "transfer", 8, 60, "After `df = pd.DataFrame({\"g\": [\"a\", \"a\", \"a\", \"b\", \"b\"], \"v\": [1, 2, 3, 10, 20]})`, what is `df.groupby(\"g\")[\"v\"].rolling(2).sum().dropna().sum()`?"), 38),
  num(s(WN, "eval-time-rolling", "transfer", 9, 75, "After `s = pd.Series([1, 2, 4], index=pd.to_datetime([\"2024-01-01\", \"2024-01-02\", \"2024-01-05\"]))`, what is `s.rolling(\"3D\").sum().iloc[-1]`?"), 4),
  mcq(s(WN, "transfer-order-matters", "transfer", 8, 60, "Daily data arrives unsorted by date. What goes wrong with `df[\"ma\"] = df[\"price\"].rolling(5).mean()`?"),
    "Windows are taken over row order, so each average mixes unrelated dates; sort by date first",
    [
      ["pandas sorts by date automatically", "rolling-auto-sort", "Rolling uses positional order."],
      ["It raises an error", "rolling-unsorted-error", "Only time-based windows on a non-monotonic index raise; this runs silently."],
      ["Nothing — order doesn't matter for means", "order-irrelevant", "Which rows share a window depends on order."],
    ]),
  short(s(WN, "transfer-rolling-apply-cost", "transfer", 10, 150, "`s.rolling(50).apply(f)` with a Python function `f` takes minutes on $10^6$ rows. Explain why, and two ways to speed it up."),
    [
      ["why", "It calls Python `f` about a million times, each on a $50$-element window", 2, true],
      ["builtin", "Use a built-in rolling method (`mean`, `std`, `quantile`…) or express `f` through them", 1],
      ["raw-numba", "Pass `raw=True` (NumPy arrays, not Series) and/or `engine=\"numba\"`", 1],
    ]),
  code(s(WN, "code-moving-average", "apply", 4, 75, "Write `ma(s, n)` returning the `n`-period rolling mean of a Series, using only past and current values, with the first `n - 1` entries as `NaN`."),
    "import pandas as pd\n\ndef ma(s, n):\n    pass\n",
    "import pandas as pd\n\ndef ma(s, n):\n    return s.rolling(n).mean()\n",
    [
      ["basic", "import pandas as pd\nr = ma(pd.Series([1.0, 2.0, 3.0, 4.0]), 2)\nresult = (bool(r.isna()[0]), r.tolist()[1:])", "result == (True, [1.5, 2.5, 3.5])"],
    ], PD),
  code(s(WN, "code-drawdown", "apply", 7, 120, "Write `max_drawdown(prices)` returning the largest fractional drop from a running peak, as a positive number. For `[100, 120, 90, 130]` the answer is `0.25` (from $120$ to $90$)."),
    "import pandas as pd\n\ndef max_drawdown(prices):\n    pass\n",
    "import pandas as pd\n\ndef max_drawdown(prices):\n    p = pd.Series(prices, dtype=float)\n    return float((1 - p / p.cummax()).max())\n",
    [
      ["basic", "result = max_drawdown([100, 120, 90, 130])", "abs(result - 0.25) < 1e-12"],
      ["rising", "result = max_drawdown([1, 2, 3])", "result == 0.0"],
    ], PD),
];

export const pythonSixtyPandasBItems: Item[] = [...apply, ...strs, ...datetime, ...pivot, ...concat, ...windowItems];
