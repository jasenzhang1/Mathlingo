import type { Item } from "../../lib/assessment/types";
import { code, mcq, num, s, short } from "./python-sixty-shared";

/**
 * First half of the pandas chapter (I/O through sorting) brought to 60
 * questions each. Conventions are those of python-sixty-basics.ts; `pd`,
 * `np` and `io` are the usual imports. Answers were run against pandas 2.2.
 */

const PD = ["pandas"];

// ---------------------------------------------------------------------------
// pandas-io
// ---------------------------------------------------------------------------
const IO = "pandas-io";
const pandasIo: Item[] = [
  mcq(s(IO, "recall-csv-meaning", "recall", 1, 15, "What does CSV stand for?"),
    "Comma-separated values",
    [
      ["Column-sorted values", "csv-sorted", "Nothing about CSV implies sorting."],
      ["Compressed spreadsheet version", "csv-compressed", "CSV is plain text, not compressed."],
      ["Character-string vector", "csv-vector", "It names the comma-delimited text format."],
    ]),
  mcq(s(IO, "recall-read-excel", "recall", 1, 15, "Which function reads an Excel `.xlsx` sheet into a DataFrame?"),
    "`pd.read_excel`",
    [
      ["`pd.read_csv`", "read-csv-excel", "`read_csv` parses delimited text; `.xlsx` is a zipped XML format."],
      ["`pd.open_excel`", "open-excel", "There's no `open_excel`."],
      ["`pd.load`", "pd-load", "There's no `pd.load`."],
    ]),
  mcq(s(IO, "recall-to-csv-returns", "recall", 2, 20, "What does `df.to_csv()` return when called with no path?"),
    "The CSV text as a string",
    [
      ["`None`, after writing `df.csv`", "to-csv-default-file", "Without a path nothing is written; the text is returned."],
      ["A new DataFrame", "to-csv-frame", "It serialises; it doesn't build a frame."],
      ["It raises `TypeError`", "to-csv-needs-path", "The path argument is optional."],
    ]),
  num(s(IO, "eval-read-shape", "apply", 3, 30, "What is `pd.read_csv(io.StringIO(\"a,b,c\\n1,2,3\\n4,5,6\")).size`?"), 6),
  num(s(IO, "eval-usecols", "apply", 3, 30, "What is `pd.read_csv(io.StringIO(\"a,b,c\\n1,2,3\"), usecols=[\"a\", \"c\"]).sum(axis=1)[0]`?"), 4),
  num(s(IO, "eval-nrows", "apply", 3, 30, "What is `len(pd.read_csv(io.StringIO(\"x\\n1\\n2\\n3\\n4\"), nrows=2))`?"), 2),
  mcq(s(IO, "eval-header-none-columns", "apply", 4, 35, "What is `list(pd.read_csv(io.StringIO(\"1,2\\n3,4\"), header=None).columns)`?"),
    "`[0, 1]`",
    [
      ["`['1', '2']`", "header-none-first-row", "With `header=None` the first row is data, and columns are numbered."],
      ["`['a', 'b']`", "header-none-letters", "pandas numbers unnamed columns from $0$."],
      ["`[1, 2]`", "header-none-one-based", "Column numbers start at $0$."],
    ]),
  num(s(IO, "eval-na-values", "apply", 4, 35, "What is `pd.read_csv(io.StringIO(\"v\\n1\\n-\\n3\"), na_values=\"-\")[\"v\"].sum()`?"), 4),
  num(s(IO, "eval-skiprows", "apply", 5, 40, "What is `pd.read_csv(io.StringIO(\"# note\\nv\\n5\\n7\"), skiprows=1)[\"v\"].mean()`?"), 6),
  mcq(s(IO, "eval-dtype-str", "apply", 5, 40, "What is `pd.read_csv(io.StringIO(\"zip\\n02139\"), dtype={\"zip\": str})[\"zip\"][0]`?"),
    "`'02139'`",
    [
      ["`2139`", "dtype-str-ignored", "`dtype=str` keeps the column as text, preserving the leading zero."],
      ["`'2139'`", "str-after-int", "The text is never parsed as a number, so nothing is lost."],
      ["`2139.0`", "zip-float", "No numeric parsing happens."],
    ]),
  short(s(IO, "explain-round-trip-index", "explain", 6, 120, "A frame saved with `df.to_csv(\"f.csv\")` reloads with an extra `Unnamed: 0` column. Explain why and give two fixes."),
    [
      ["why", "`to_csv` writes the index as the first column by default, and `read_csv` treats it as data", 2, true],
      ["fixes", "Write with `index=False`, or read with `index_col=0`", 2, true],
    ]),
  mcq(s(IO, "transfer-chunksize", "transfer", 7, 50, "What does `pd.read_csv(path, chunksize=100_000)` return?"),
    "An iterator yielding DataFrames of up to $100{,}000$ rows each",
    [
      ["The first $100{,}000$ rows as one DataFrame", "chunksize-is-nrows", "That's `nrows`."],
      ["A DataFrame with $100{,}000$ columns", "chunksize-columns", "Chunks are groups of rows."],
      ["A compressed DataFrame", "chunksize-compress", "It controls reading in pieces, not compression."],
    ]),
  num(s(IO, "eval-thousands", "transfer", 7, 50, "What is `pd.read_csv(io.StringIO('n\\n\"1,234\"\\n\"2,000\"'), thousands=\",\")[\"n\"].sum()`?"), 3234),
  num(s(IO, "eval-decimal-comma", "transfer", 8, 60, "A European export uses semicolons and decimal commas. What is `pd.read_csv(io.StringIO(\"p;q\\n1,5;2\"), sep=\";\", decimal=\",\")[\"p\"][0]`?"), 1.5),
  mcq(s(IO, "transfer-parquet-dtypes", "transfer", 8, 60, "A frame with a `category` column and a `datetime64` column is saved and reloaded. Which format brings both dtypes back unchanged?"),
    "Parquet — it stores a typed schema; CSV stores only text",
    [
      ["CSV", "csv-keeps-dtypes", "CSV has no type information; both come back as `object` unless re-parsed."],
      ["Either; pandas infers them", "infer-category", "Inference can't recover `category`, and dates need `parse_dates`."],
      ["Neither format can", "neither-keeps", "Parquet preserves both."],
    ]),
  mcq(s(IO, "transfer-json-orient", "transfer", 8, 60, "`df.to_json(orient=\"records\")` for a frame with columns `a` and `b` produces what shape of JSON?"),
    "A list of objects, one per row: `[{\"a\": …, \"b\": …}, …]`",
    [
      ["An object of columns, each mapping index to value", "records-is-columns", "That's `orient=\"columns\"`, the default for DataFrames."],
      ["A single object with keys `a` and `b` and list values", "records-is-list-orient", "That's `orient=\"list\"` for `to_dict`."],
      ["A CSV string inside JSON", "records-csv", "It's genuine JSON."],
    ]),
  short(s(IO, "transfer-stream-aggregate", "transfer", 9, 150, "A $40$ GB CSV of transactions has columns `store` and `amount`. Describe how to compute total `amount` per store without loading the whole file into memory."),
    [
      ["chunks", "Read with `chunksize` (and `usecols=[\"store\", \"amount\"]`)", 2, true],
      ["partial", "Group and sum each chunk, accumulating the partial sums", 1, true],
      ["combine", "Combine the partials at the end (e.g. `pd.concat(parts).groupby(level=0).sum()`)", 1],
    ]),
  num(s(IO, "eval-skipfooter-like", "transfer", 9, 75, "What is `len(pd.read_csv(io.StringIO(\"v\\n1\\n2\\n\\n3\\n\"), skip_blank_lines=False))`?"), 4),
  code(s(IO, "code-parse-csv-text", "apply", 4, 75, "Write `column_total(text, col)` that parses CSV `text` with pandas and returns the sum of column `col` as a Python number."),
    "import io\nimport pandas as pd\n\ndef column_total(text, col):\n    pass\n",
    "import io\nimport pandas as pd\n\ndef column_total(text, col):\n    return pd.read_csv(io.StringIO(text))[col].sum().item()\n",
    [
      ["basic", "result = column_total(\"a,b\\n1,2\\n3,4\", \"b\")", "result == 6"],
      ["float", "result = column_total(\"x\\n1.5\\n2.5\", \"x\")", "result == 4.0"],
    ], PD),
  code(s(IO, "code-clean-read", "apply", 7, 120, "Write `read_scores(text)` that parses CSV `text` whose `score` column uses `\"n/a\"` for missing values and `id` column has leading zeros. Return a DataFrame with `id` kept as strings and `score` as floats."),
    "import io\nimport pandas as pd\n\ndef read_scores(text):\n    pass\n",
    "import io\nimport pandas as pd\n\ndef read_scores(text):\n    return pd.read_csv(io.StringIO(text), dtype={\"id\": str}, na_values=[\"n/a\"])\n",
    [
      ["ids", "df = read_scores(\"id,score\\n007,1.5\\n010,n/a\")\nresult = df[\"id\"].tolist()", "result == [\"007\", \"010\"]"],
      ["missing", "df = read_scores(\"id,score\\n007,1.5\\n010,n/a\")\nresult = (float(df[\"score\"].sum()), int(df[\"score\"].isna().sum()))", "result == (1.5, 1)"],
    ], PD),
];

// ---------------------------------------------------------------------------
// pandas-selection
// ---------------------------------------------------------------------------
const SE = "pandas-selection";
const FR = "pd.DataFrame({\"a\": [1, 2, 3], \"b\": [4, 5, 6], \"c\": [7, 8, 9]}, index=[\"x\", \"y\", \"z\"])";
const selection: Item[] = [
  mcq(s(SE, "recall-bracket-column", "recall", 1, 15, "What does `df[\"price\"]` select?"),
    "The column named `price`",
    [
      ["The row labelled `price`", "bracket-row", "Plain brackets with a label select a column; rows use `.loc`."],
      ["Every cell equal to `\"price\"`", "bracket-value", "That would need a comparison."],
      ["The first row", "bracket-first-row", "Use `.iloc[0]` for that."],
    ]),
  mcq(s(SE, "recall-iloc-last-row", "recall", 1, 15, "Which selects the last row of `df` by position?"),
    "`df.iloc[-1]`",
    [
      ["`df.loc[-1]`", "loc-negative", "`.loc` looks for a label `-1`, which usually doesn't exist."],
      ["`df[-1]`", "bracket-negative-row", "Plain brackets look for a *column* labelled `-1`."],
      ["`df.last()`", "df-last-row", "`last` is for time-based offsets, not the final row."],
    ]),
  mcq(s(SE, "recall-at-iat", "recall", 2, 20, "What are `.at` and `.iat` for?"),
    "Fast access to a single scalar, by label (`at`) or position (`iat`)",
    [
      ["Selecting whole columns", "at-columns", "They return one value, not a column."],
      ["Time-based selection", "at-time", "`at` isn't about time."],
      ["Appending rows", "at-append", "They read or set one cell."],
    ]),
  num(s(SE, "eval-loc-scalar", "apply", 3, 25, `After \`df = ${FR}\`, what is \`df.loc["y", "c"]\`?`), 8),
  num(s(SE, "eval-iloc-scalar", "apply", 3, 25, `After \`df = ${FR}\`, what is \`df.iloc[2, 0]\`?`), 3),
  num(s(SE, "eval-loc-slice-inclusive", "apply", 4, 35, `After \`df = ${FR}\`, what is \`df.loc["x":"y", "b"].sum()\`?`), 9),
  num(s(SE, "eval-iloc-slice-exclusive", "apply", 4, 35, `After \`df = ${FR}\`, what is \`df.iloc[0:1, 1:3].sum().sum()\`?`), 11),
  mcq(s(SE, "eval-column-list", "apply", 4, 35, `After \`df = ${FR}\`, what is \`df[["c", "a"]].columns.tolist()\`?`),
    "`['c', 'a']`",
    [
      ["`['a', 'c']`", "column-list-sorted", "Columns come out in the order you list them."],
      ["`['a', 'b', 'c']`", "column-list-all", "Only the listed columns are selected."],
      ["`KeyError`", "column-list-error", "Both columns exist."],
    ]),
  num(s(SE, "eval-loc-mask-col", "apply", 5, 40, `After \`df = ${FR}\`, what is \`df.loc[df["a"] > 1, "c"].sum()\`?`), 17),
  mcq(s(SE, "eval-iloc-list", "apply", 5, 40, `After \`df = ${FR}\`, what is \`df.iloc[[2, 0]].index.tolist()\`?`),
    "`['z', 'x']`",
    [
      ["`[2, 0]`", "iloc-returns-positions", "The result keeps the original labels."],
      ["`['x', 'z']`", "iloc-list-sorted", "Rows come out in the order requested."],
      ["`['z']`", "iloc-list-first", "Both positions are selected."],
    ]),
  short(s(SE, "explain-loc-iloc-int-index", "explain", 6, 120, "`df` has index `[10, 20, 30]`. Explain why `df.loc[0]` raises while `df.iloc[0]` works, and what `df.loc[10:20]` returns."),
    [
      ["loc-label", "`.loc` uses labels and there's no label `0`, so it raises `KeyError`", 2, true],
      ["iloc-position", "`.iloc[0]` is the first row by position", 1],
      ["inclusive", "`df.loc[10:20]` returns the rows labelled $10$ and $20$ — label slices include the end", 1],
    ]),
  mcq(s(SE, "transfer-loc-set-new-col", "transfer", 7, 50, `After \`df = ${FR}\` and \`df.loc["y", "d"] = 1\`, what is \`df["d"].isna().sum()\`?`),
    "`2` — assigning to a new column through `.loc` creates it, filling the other rows with `NaN`",
    [
      ["`0`", "loc-new-col-fills", "Only row `y` receives a value."],
      ["`KeyError`", "loc-new-col-error", "`.loc` can enlarge the frame with a new column."],
      ["`3`", "loc-new-col-missing", "Row `y` holds `1`."],
    ]),
  num(s(SE, "eval-xs-like", "transfer", 8, 60, `After \`df = ${FR}\`, what is \`df.loc[:, "b":].iloc[-1].sum()\`?`), 15),
  num(s(SE, "eval-get-default", "transfer", 8, 60, `After \`df = ${FR}\`, what is \`df.get("zz", default=pd.Series([0])).sum() + df.get("a").sum()\`?`), 6),
  mcq(s(SE, "transfer-multiindex-loc", "transfer", 9, 75, "`s = pd.Series([1, 2, 3, 4], index=pd.MultiIndex.from_tuples([(\"a\", 1), (\"a\", 2), (\"b\", 1), (\"b\", 2)]))`. What is `s.loc[\"a\"].tolist()`?"),
    "`[1, 2]` — selecting the outer level returns everything under it",
    [
      ["`[1]`", "multiindex-first-only", "All entries with outer label `a` are returned."],
      ["`KeyError`", "multiindex-needs-tuple", "A partial key on the outer level is allowed."],
      ["`[1, 3]`", "multiindex-inner", "That would select inner label $1$, e.g. with `s.xs(1, level=1)`."],
    ]),
  num(s(SE, "eval-xs-inner", "transfer", 9, 75, "After `s = pd.Series([1, 2, 3, 4], index=pd.MultiIndex.from_tuples([(\"a\", 1), (\"a\", 2), (\"b\", 1), (\"b\", 2)]))`, what is `s.xs(2, level=1).sum()`?"), 6),
  short(s(SE, "transfer-copy-on-write", "transfer", 10, 180, "Under pandas copy-on-write (default from pandas $3.0$), what happens with `sub = df[df.a > 0]` followed by `sub[\"b\"] = 0`, and how does that differ from the older behaviour that produced `SettingWithCopyWarning`?"),
    [
      ["cow", "`sub` behaves as an independent copy: modifying it never changes `df`", 2, true],
      ["old", "Previously it was ambiguous whether `sub` was a view or a copy, so pandas warned that `df` might or might not change", 1, true],
      ["correct-way", "To change `df`, use `df.loc[df.a > 0, \"b\"] = 0`", 1],
    ]),
  code(s(SE, "code-select-block", "apply", 4, 75, "Write `corner(df, n)` returning the top-left `n` × `n` block of a DataFrame by position."),
    "import pandas as pd\n\ndef corner(df, n):\n    pass\n",
    "import pandas as pd\n\ndef corner(df, n):\n    return df.iloc[:n, :n]\n",
    [
      ["two", "import pandas as pd\nd = pd.DataFrame({\"a\": [1, 2, 3], \"b\": [4, 5, 6], \"c\": [7, 8, 9]})\nresult = corner(d, 2).values.tolist()", "result == [[1, 4], [2, 5]]"],
      ["one", "import pandas as pd\nd = pd.DataFrame({\"a\": [1, 2], \"b\": [3, 4]})\nresult = corner(d, 1).values.tolist()", "result == [[1]]"],
    ], PD),
  code(s(SE, "code-set-flag", "apply", 6, 90, "Write `flag_high(df, col, cutoff)` that returns a copy of `df` with a new boolean column `high`, `True` where `df[col] > cutoff`, using `.loc` or vectorised assignment. Don't modify the input."),
    "import pandas as pd\n\ndef flag_high(df, col, cutoff):\n    pass\n",
    "import pandas as pd\n\ndef flag_high(df, col, cutoff):\n    out = df.copy()\n    out[\"high\"] = out[col] > cutoff\n    return out\n",
    [
      ["values", "import pandas as pd\nd = pd.DataFrame({\"v\": [1, 5, 9]})\nresult = flag_high(d, \"v\", 4)[\"high\"].tolist()", "result == [False, True, True]"],
      ["no-mutate", "import pandas as pd\nd = pd.DataFrame({\"v\": [1]})\nr = flag_high(d, \"v\", 0)\nresult = (list(d.columns), bool(r[\"high\"][0]))", "result == ([\"v\"], True)"],
    ], PD),
];

// ---------------------------------------------------------------------------
// pandas-filtering
// ---------------------------------------------------------------------------
const FI = "pandas-filtering";
const AGE = "pd.Series([25, 35, 45, 55, 65])";
const filtering: Item[] = [
  mcq(s(FI, "recall-mask-length", "recall", 1, 15, "A boolean mask used to filter `df`'s rows must have…"),
    "One `True`/`False` per row, aligned with `df`'s index",
    [
      ["One value per column", "mask-per-column", "A row filter needs one value per row."],
      ["Only `True` values", "mask-all-true", "The `False` entries are what get dropped."],
      ["Exactly as many values as rows to keep", "mask-keep-count", "The mask covers every row."],
    ]),
  mcq(s(FI, "recall-tilde", "recall", 2, 20, "What does `df[~mask]` return?"),
    "The rows where `mask` is `False`",
    [
      ["The rows where `mask` is `True`", "tilde-noop", "`~` negates the mask."],
      ["Approximately matching rows", "tilde-approx", "`~` is logical NOT on boolean Series."],
      ["An error; use `not mask`", "tilde-error", "`not` needs a single truth value; `~` works elementwise."],
    ]),
  mcq(s(FI, "recall-between", "recall", 2, 20, "By default, does `s.between(10, 20)` include $10$ and $20$?"),
    "Yes — both ends are inclusive by default",
    [
      ["No, both ends are excluded", "between-exclusive", "The default is `inclusive=\"both\"`."],
      ["Only $10$, like `range`", "between-like-range", "Both are included unless you change `inclusive`."],
      ["Only $20$", "between-right", "Both are included by default."],
    ]),
  num(s(FI, "eval-mask-count", "apply", 3, 25, `After \`s = ${AGE}\`, what is \`(s > 40).sum()\`?`), 3),
  num(s(FI, "eval-between-sum", "apply", 3, 30, `After \`s = ${AGE}\`, what is \`s[s.between(35, 55)].sum()\`?`), 135),
  num(s(FI, "eval-isin-count", "apply", 3, 30, "What is `pd.Series([\"NY\", \"LA\", \"SF\", \"NY\"]).isin([\"NY\", \"SF\"]).sum()`?"), 3),
  num(s(FI, "eval-or-mask", "apply", 4, 35, `After \`s = ${AGE}\`, what is \`s[(s < 30) | (s > 60)].sum()\`?`), 90),
  num(s(FI, "eval-query", "apply", 4, 35, "After `df = pd.DataFrame({\"a\": [1, 5, 9], \"b\": [3, 3, 3]})`, what is `df.query(\"a > b\")[\"a\"].sum()`?"), 14),
  num(s(FI, "eval-query-at", "apply", 5, 40, "After `df = pd.DataFrame({\"a\": [1, 5, 9]})` and `lim = 4`, what is `len(df.query(\"a > @lim\"))`?"), 2),
  mcq(s(FI, "eval-mask-nan", "apply", 5, 40, "What is `(pd.Series([1.0, np.nan, 3.0]) > 2).tolist()`?"),
    "`[False, False, True]`",
    [
      ["`[False, nan, True]`", "nan-compare-nan", "Comparisons with `NaN` give `False` in a float Series."],
      ["`[False, True, True]`", "nan-greater", "`NaN > 2` is `False`."],
      ["`TypeError`", "nan-compare-error", "Comparing with `NaN` doesn't raise."],
    ]),
  short(s(FI, "explain-precedence", "explain", 6, 120, "Why does `df[df.a > 1 & df.b < 5]` fail, and what is the corrected expression?"),
    [
      ["precedence", "`&` binds tighter than `>` and `<`, so Python reads `df.a > (1 & df.b) < 5`, a chained comparison that needs a single `bool`", 2, true],
      ["fix", "`df[(df.a > 1) & (df.b < 5)]`", 2, true],
    ]),
  mcq(s(FI, "transfer-str-contains-na", "transfer", 7, 50, "`s = pd.Series([\"apple\", None, \"grape\"])`. Why does `s[s.str.contains(\"ap\")]` raise, and what fixes it?"),
    "The mask contains a missing value, which can't be used to index; pass `na=False`",
    [
      ["`.str` doesn't work on object columns", "str-object", "`.str` works on object columns of strings."],
      ["`contains` needs a regex flag", "contains-regex-flag", "The missing value is the issue, not the pattern."],
      ["`None` is converted to `\"None\"` and matches", "none-to-string", "Missing values stay missing in the mask."],
    ]),
  num(s(FI, "eval-drop-duplicates", "transfer", 7, 50, "After `df = pd.DataFrame({\"k\": [1, 1, 2, 2, 3], \"v\": [9, 9, 8, 7, 6]})`, what is `len(df.drop_duplicates())`?"), 4),
  num(s(FI, "eval-drop-dup-subset", "transfer", 8, 60, "After `df = pd.DataFrame({\"k\": [1, 1, 2, 2, 3], \"v\": [9, 9, 8, 7, 6]})`, what is `df.drop_duplicates(subset=\"k\", keep=\"last\")[\"v\"].sum()`?"), 22),
  num(s(FI, "eval-anti-join", "transfer", 8, 60, "After `a = pd.DataFrame({\"id\": [1, 2, 3, 4]})` and `b = pd.DataFrame({\"id\": [2, 4]})`, what is `a[~a[\"id\"].isin(b[\"id\"])][\"id\"].sum()`?"), 4),
  mcq(s(FI, "transfer-where-vs-filter", "transfer", 8, 60, "`s = pd.Series([3, -1, 4])`. How do `s[s > 0]` and `s.where(s > 0)` differ?"),
    "`s[s > 0]` has $2$ elements; `s.where(s > 0)` keeps all $3$ positions, with `NaN` where the condition fails",
    [
      ["They're identical", "where-is-filter", "`where` keeps the shape and masks out values."],
      ["`where` drops the rows and `[...]` keeps `NaN`", "where-filter-swapped", "It's the other way round."],
      ["`where` replaces failing values with $0$", "where-zero", "The default replacement is `NaN`."],
    ]),
  mcq(s(FI, "transfer-mask-alignment", "transfer", 9, 75, "Filtering `df` with a boolean Series built from a *different* frame raises `IndexingError: Unalignable boolean Series`. Why?"),
    "Boolean masks are aligned on index labels, and the other frame's index doesn't match `df`'s",
    [
      ["Masks must be NumPy arrays", "mask-numpy-only", "Series masks are fine when their index matches."],
      ["The mask has `True` and `False` mixed", "mask-mixed", "Mixed values are normal."],
      ["`df` must be sorted first", "mask-sort", "Sorting isn't the issue; label alignment is."],
    ]),
  num(s(FI, "eval-nlargest-filter", "transfer", 9, 75, "After `df = pd.DataFrame({\"g\": [\"a\", \"a\", \"b\", \"b\"], \"v\": [1, 4, 2, 8]})`, what is `df[df[\"v\"] > df.groupby(\"g\")[\"v\"].transform(\"mean\")][\"v\"].sum()`?"), 12),
  code(s(FI, "code-filter-range", "apply", 4, 75, "Write `in_range(df, col, lo, hi)` returning the rows where `lo <= df[col] <= hi`."),
    "import pandas as pd\n\ndef in_range(df, col, lo, hi):\n    pass\n",
    "import pandas as pd\n\ndef in_range(df, col, lo, hi):\n    return df[df[col].between(lo, hi)]\n",
    [
      ["basic", "import pandas as pd\nd = pd.DataFrame({\"x\": [1, 5, 10, 15]})\nresult = in_range(d, \"x\", 5, 10)[\"x\"].tolist()", "result == [5, 10]"],
      ["none", "import pandas as pd\nd = pd.DataFrame({\"x\": [1, 2]})\nresult = len(in_range(d, \"x\", 5, 9))", "result == 0"],
    ], PD),
  code(s(FI, "code-multi-filter", "apply", 6, 90, "Write `active_adults(df)` returning rows where `age >= 18`, `status` is either `\"active\"` or `\"trial\"`, and `email` is not missing."),
    "import pandas as pd\n\ndef active_adults(df):\n    pass\n",
    "import pandas as pd\n\ndef active_adults(df):\n    m = (df[\"age\"] >= 18) & df[\"status\"].isin([\"active\", \"trial\"]) & df[\"email\"].notna()\n    return df[m]\n",
    [
      ["basic", "import pandas as pd\nd = pd.DataFrame({\"age\": [17, 20, 30, 40], \"status\": [\"active\", \"trial\", \"closed\", \"active\"], \"email\": [\"a\", \"b\", \"c\", None]})\nresult = active_adults(d)[\"age\"].tolist()", "result == [20]"],
    ], PD),
];

// ---------------------------------------------------------------------------
// pandas-missing
// ---------------------------------------------------------------------------
const MI = "pandas-missing";
const S3 = "pd.Series([1.0, np.nan, 3.0, np.nan, 5.0])";
const missing: Item[] = [
  mcq(s(MI, "recall-notna", "recall", 1, 15, "Which method marks values that are **not** missing?"),
    "`.notna()`",
    [
      ["`.isna()`", "isna-is-notna", "`.isna()` marks the missing ones."],
      ["`.dropna()`", "dropna-marks", "`.dropna()` removes missing values rather than marking them."],
      ["`.valid()`", "valid-method", "There's no `.valid()` method."],
    ]),
  mcq(s(MI, "recall-fillna-returns", "recall", 1, 15, "Does `df.fillna(0)` change `df` in place?"),
    "No — it returns a new object; assign it back to keep the result",
    [
      ["Yes, always", "fillna-in-place", "Most pandas methods return new objects."],
      ["Only for numeric columns", "fillna-numeric-in-place", "No column type changes this."],
      ["Yes, and it returns `None`", "fillna-returns-none", "It returns the filled copy."],
    ]),
  mcq(s(MI, "recall-count-vs-len", "recall", 2, 20, "How do `s.count()` and `len(s)` differ?"),
    "`count` excludes missing values; `len` counts every position",
    [
      ["They're the same", "count-len-same", "`count` skips `NaN`."],
      ["`count` counts unique values", "count-unique", "That's `nunique`."],
      ["`len` excludes missing values", "len-skips-nan", "`len` counts everything."],
    ]),
  num(s(MI, "eval-isna-sum", "apply", 2, 20, `After \`s = ${S3}\`, what is \`s.isna().sum()\`?`), 2),
  num(s(MI, "eval-mean-skips", "apply", 3, 25, `After \`s = ${S3}\`, what is \`s.mean()\`?`), 3),
  num(s(MI, "eval-ffill-sum", "apply", 4, 35, `After \`s = ${S3}\`, what is \`s.ffill().sum()\`?`), 13),
  num(s(MI, "eval-interpolate", "apply", 4, 35, `After \`s = ${S3}\`, what is \`s.interpolate().iloc[3]\`?`), 4),
  num(s(MI, "eval-fillna-mean", "apply", 4, 35, `After \`s = ${S3}\`, what is \`s.fillna(s.mean()).sum()\`?`), 15),
  mcq(s(MI, "eval-dropna-how-all", "apply", 5, 40, "After `df = pd.DataFrame({\"a\": [1, None, None], \"b\": [2, 3, None]})`, what is `df.dropna(how=\"all\").index.tolist()`?"),
    "`[0, 1]`",
    [
      ["`[0]`", "how-all-is-any", "`how=\"all\"` drops only rows where every value is missing."],
      ["`[0, 1, 2]`", "how-all-keeps-all", "Row $2$ is entirely missing and is dropped."],
      ["`[2]`", "how-all-inverted", "It keeps rows with at least one value."],
    ]),
  num(s(MI, "eval-fillna-dict", "apply", 5, 40, "After `df = pd.DataFrame({\"a\": [1, None], \"b\": [None, 4]})`, what is `df.fillna({\"a\": 10, \"b\": 20}).sum().sum()`?"), 35),
  short(s(MI, "explain-missing-mechanisms", "explain", 7, 150, "Explain the difference between data missing completely at random and data missing for reasons related to the missing value itself, and why it matters for dropping rows."),
    [
      ["mcar", "Missing completely at random: missingness is unrelated to any values, so dropping rows loses data but doesn't bias estimates", 2, true],
      ["mnar", "Missing not at random: e.g. high earners skip an income question, so dropping or mean-filling biases results", 2, true],
    ]),
  mcq(s(MI, "transfer-sum-all-nan", "transfer", 7, 50, "What is `pd.Series([np.nan, np.nan]).sum()`?"),
    "`0.0` — by default an all-missing sum is the empty sum; `min_count=1` would make it `NaN`",
    [
      ["`nan`", "sum-all-nan-nan", "`min_count` defaults to $0$, so the sum is $0$."],
      ["`TypeError`", "sum-nan-error", "Summing `NaN`s is allowed."],
      ["`None`", "sum-none", "The result is a float."],
    ]),
  num(s(MI, "eval-groupby-fill", "transfer", 8, 60, "After `df = pd.DataFrame({\"g\": [\"a\", \"a\", \"b\", \"b\"], \"v\": [1.0, np.nan, 10.0, np.nan]})`, what is `df[\"v\"].fillna(df.groupby(\"g\")[\"v\"].transform(\"mean\")).sum()`?"), 22),
  num(s(MI, "eval-ffill-limit", "transfer", 8, 60, "What is `pd.Series([1.0, np.nan, np.nan, np.nan]).ffill(limit=2).isna().sum()`?"), 1),
  mcq(s(MI, "transfer-pd-na-logic", "transfer", 9, 75, "What is `pd.NA & False`?"),
    "`False` — whatever the missing value is, AND with `False` is `False` (three-valued logic)",
    [
      ["`<NA>`", "na-and-propagates", "When the result is determined regardless of the unknown, it's returned."],
      ["`True`", "na-truthy", "`pd.NA` isn't treated as `True`."],
      ["`TypeError`", "na-and-error", "Logical operations on `pd.NA` are defined."],
    ]),
  mcq(s(MI, "transfer-nan-equality-filter", "transfer", 8, 60, "Why does `df[df[\"x\"] == np.nan]` always return an empty frame?"),
    "`NaN` never equals anything, including `NaN`; use `df[df[\"x\"].isna()]`",
    [
      ["Because `==` is not supported on Series", "eq-series-unsupported", "It is supported; it just never matches `NaN`."],
      ["Because missing values are stored as `None`", "nan-stored-none", "In a float column they're `NaN`, which still doesn't equal itself."],
      ["It returns all rows", "nan-matches-all", "No comparison with `NaN` is ever `True`."],
    ]),
  short(s(MI, "transfer-leakage", "transfer", 10, 180, "A modeller fills missing values with the column mean computed over the full dataset, then splits into train and test. Explain why this is a problem and how to do it correctly."),
    [
      ["leakage", "The mean includes test rows, leaking test information into training (optimistic evaluation)", 2, true],
      ["fix", "Split first; compute fill values from the training set only and apply them to the test set (e.g. inside a pipeline)", 2, true],
    ]),
  num(s(MI, "eval-mean-two-step", "transfer", 9, 75, "After `df = pd.DataFrame({\"a\": [1, np.nan, 3], \"b\": [np.nan, np.nan, 6]})`, what is `df.mean().sum() + df.isna().sum().sum()`?"), 11),
  code(s(MI, "code-missing-report", "apply", 4, 75, "Write `missing_share(df)` returning a dict from each column name to the fraction of its values that are missing."),
    "import pandas as pd\n\ndef missing_share(df):\n    pass\n",
    "import pandas as pd\n\ndef missing_share(df):\n    return df.isna().mean().to_dict()\n",
    [
      ["basic", "import pandas as pd\nd = pd.DataFrame({\"a\": [1, None, 3, None], \"b\": [1, 2, 3, 4]})\nresult = missing_share(d)", "result == {\"a\": 0.5, \"b\": 0.0}"],
    ], PD),
  code(s(MI, "code-fill-by-group", "apply", 7, 120, "Write `fill_group_median(df, key, col)` returning a copy where missing values in `col` are filled with the median of `col` within the same `key` group."),
    "import pandas as pd\n\ndef fill_group_median(df, key, col):\n    pass\n",
    "import pandas as pd\n\ndef fill_group_median(df, key, col):\n    out = df.copy()\n    out[col] = out[col].fillna(out.groupby(key)[col].transform(\"median\"))\n    return out\n",
    [
      ["basic", "import pandas as pd\nd = pd.DataFrame({\"g\": [\"a\", \"a\", \"a\", \"b\", \"b\"], \"v\": [1.0, 3.0, None, 10.0, None]})\nresult = fill_group_median(d, \"g\", \"v\")[\"v\"].tolist()", "result == [1.0, 3.0, 2.0, 10.0, 10.0]"],
      ["no-mutate", "import pandas as pd\nd = pd.DataFrame({\"g\": [\"a\", \"a\"], \"v\": [1.0, None]})\nr = fill_group_median(d, \"g\", \"v\")\nresult = (int(d[\"v\"].isna().sum()), r[\"v\"].tolist())", "result == (1, [1.0, 1.0])"],
    ], PD),
];

// ---------------------------------------------------------------------------
// pandas-dtypes
// ---------------------------------------------------------------------------
const DT = "pandas-dtypes";
const dtypes: Item[] = [
  mcq(s(DT, "recall-dtype-meaning", "recall", 1, 15, "What is a column's dtype?"),
    "The type of data stored in it, such as `int64`, `float64` or `object`",
    [
      ["The column's name", "dtype-name", "That's the column label."],
      ["The number of distinct values", "dtype-nunique", "That's `nunique()`."],
      ["Whether the column is sorted", "dtype-sorted", "Dtype says nothing about order."],
    ]),
  mcq(s(DT, "recall-astype", "recall", 1, 15, "Which method converts a Series to another dtype?"),
    "`.astype()`",
    [
      ["`.dtype()`", "dtype-method", "`.dtype` is an attribute that reports the type."],
      ["`.convert()`", "convert-method", "There's no `.convert()`."],
      ["`.cast()`", "cast-method", "pandas uses `astype`."],
    ]),
  mcq(s(DT, "recall-bool-dtype", "recall", 2, 20, "What is the dtype of `pd.Series([True, False])`?"),
    "`bool`",
    [
      ["`object`", "bool-object", "Pure booleans get the `bool` dtype."],
      ["`int64`", "bool-int", "Booleans keep their own dtype."],
      ["`category`", "bool-category", "Categories are only used when requested."],
    ]),
  mcq(s(DT, "eval-dtype-name-int", "apply", 3, 25, "What is `pd.Series([1, 2]).astype(float).dtype.name`?"),
    "`'float64'`",
    [
      ["`'float32'`", "astype-float32", "`float` maps to `float64`."],
      ["`'int64'`", "astype-ignored", "`astype` returned a converted Series."],
      ["`'float'`", "dtype-name-float", "The dtype name includes the bit width."],
    ]),
  num(s(DT, "eval-to-numeric-coerce", "apply", 3, 30, "What is `pd.to_numeric(pd.Series([\"1\", \"x\", \"3\"]), errors=\"coerce\").sum()`?"), 4),
  num(s(DT, "eval-category-codes", "apply", 4, 35, "What is `pd.Series([\"lo\", \"hi\", \"lo\"]).astype(\"category\").cat.codes.sum()`?"), 2),
  num(s(DT, "eval-astype-int-truncate", "apply", 4, 30, "What is `pd.Series([2.9, -2.9]).astype(int).sum()`?"), 0),
  mcq(s(DT, "eval-select-dtypes", "apply", 4, 35, "After `df = pd.DataFrame({\"a\": [1], \"b\": [\"x\"], \"c\": [2.5]})`, what is `df.select_dtypes(\"number\").columns.tolist()`?"),
    "`['a', 'c']`",
    [
      ["`['a']`", "number-int-only", "`\"number\"` includes floats."],
      ["`['b']`", "number-inverted", "`b` is text."],
      ["`['a', 'b', 'c']`", "number-all", "Strings aren't numbers."],
    ]),
  num(s(DT, "eval-nullable-int", "apply", 5, 40, "What is `pd.Series([1, None, 3], dtype=\"Int64\").sum()`?"), 4),
  mcq(s(DT, "eval-nullable-dtype-name", "apply", 5, 40, "What is `str(pd.Series([1, None, 3], dtype=\"Int64\").dtype)`?"),
    "`'Int64'`",
    [
      ["`'float64'`", "nullable-to-float", "The nullable `Int64` (capital I) holds missing values without converting to float."],
      ["`'int64'`", "nullable-lowercase", "`Int64` is distinct from NumPy's `int64`."],
      ["`'object'`", "nullable-object", "It's a dedicated extension dtype."],
    ]),
  short(s(DT, "explain-category-when", "explain", 6, 120, "When does converting a text column to `category` save a lot of memory, and when does it not help?"),
    [
      ["low-cardinality", "When there are few distinct values repeated many times — each row stores a small integer code", 2, true],
      ["high-cardinality", "Not when nearly every value is unique; the category table is as big as the data", 2, true],
    ]),
  mcq(s(DT, "transfer-object-sum", "transfer", 7, 50, "A price column has dtype `object` with values `\"10\"`, `\"20\"`. What is `df[\"price\"].sum()`?"),
    "`'1020'` — summing strings concatenates them",
    [
      ["`30`", "object-sum-numeric", "The values are strings, so `+` joins them."],
      ["`TypeError`", "object-sum-error", "Strings can be added, so `sum` succeeds."],
      ["`nan`", "object-sum-nan", "No missing values are involved."],
    ]),
  num(s(DT, "eval-ordered-category", "transfer", 8, 60, "After `s = pd.Series(pd.Categorical([\"M\", \"S\", \"L\", \"M\"], categories=[\"S\", \"M\", \"L\"], ordered=True))`, what is `(s > \"S\").sum()`?"), 3),
  mcq(s(DT, "transfer-ordered-max", "transfer", 8, 60, "Same ordered categorical `[\"M\", \"S\", \"L\", \"M\"]` with order `S < M < L`. What is `s.max()`?"),
    "`'L'` — the order of the categories, not the alphabet, decides",
    [
      ["`'S'`", "ordered-max-alpha", "Alphabetically `S` is last, but the declared order puts `L` highest."],
      ["`'M'`", "ordered-max-mode", "`max` isn't the most frequent value."],
      ["`TypeError`", "categorical-max-error", "Ordered categoricals support `max`."],
    ]),
  num(s(DT, "eval-memory-category", "transfer", 8, 60, "What is `int(pd.Series([\"aa\"] * 1000).astype(\"category\").cat.codes.dtype.itemsize)`?"), 1),
  mcq(s(DT, "transfer-big-id-float", "transfer", 9, 75, "A column of $19$-digit IDs gains one missing value and becomes `float64`. Why is that destructive, and what should the dtype be?"),
    "`float64` holds only about $15$–$16$ significant digits, so IDs get rounded; use `Int64` or `string`",
    [
      ["It isn't — floats store integers exactly", "float-exact-ids", "Only integers up to $2^{53}$ are exact."],
      ["Only the missing value is affected", "float-only-missing", "Every large ID is rounded."],
      ["Use `float32` for more precision", "float32-precise", "`float32` is even less precise."],
    ]),
  num(s(DT, "eval-bool-astype-string", "transfer", 9, 75, "What is `pd.Series([\"True\", \"False\", \"\"]).astype(bool).sum()`?"), 2),
  short(s(DT, "transfer-stray-value", "transfer", 9, 150, "One row of a numeric CSV column contains `\"n.a.\"`. Explain what dtype the column gets, what goes wrong downstream, and how to fix it at read time or after."),
    [
      ["object", "The whole column becomes `object` (strings)", 1, true],
      ["downstream", "Arithmetic fails or concatenates, sums and means break or slow down", 1],
      ["fix", "Use `na_values=[\"n.a.\"]` in `read_csv`, or `pd.to_numeric(..., errors=\"coerce\")` afterwards", 2, true],
    ]),
  code(s(DT, "code-shrink", "apply", 6, 90, "Write `shrink(df)` returning a copy where every `object` column with fewer than $50\\%$ distinct values (relative to its length) is converted to `category`."),
    "import pandas as pd\n\ndef shrink(df):\n    pass\n",
    "import pandas as pd\n\ndef shrink(df):\n    out = df.copy()\n    for c in out.select_dtypes(\"object\").columns:\n        if out[c].nunique() < 0.5 * len(out):\n            out[c] = out[c].astype(\"category\")\n    return out\n",
    [
      ["converts", "import pandas as pd\nd = pd.DataFrame({\"r\": [\"n\", \"s\", \"n\", \"n\", \"s\"], \"u\": list(\"abcde\"), \"x\": [1, 2, 3, 4, 5]})\nr = shrink(d)\nresult = [str(t) for t in r.dtypes]", "result == [\"category\", \"object\", \"int64\"]"],
    ], PD),
  code(s(DT, "code-clean-prices", "apply", 5, 90, "Write `to_price(s)` converting a Series of strings like `\"$1,200\"` and `\"$35\"` to floats, with anything unparseable becoming `NaN`."),
    "import pandas as pd\n\ndef to_price(s):\n    pass\n",
    "import pandas as pd\n\ndef to_price(s):\n    cleaned = s.str.replace(\"$\", \"\", regex=False).str.replace(\",\", \"\", regex=False)\n    return pd.to_numeric(cleaned, errors=\"coerce\")\n",
    [
      ["basic", "import pandas as pd\nresult = to_price(pd.Series([\"$1,200\", \"$35\"])).tolist()", "result == [1200.0, 35.0]"],
      ["bad", "import pandas as pd\nr = to_price(pd.Series([\"$5\", \"free\"]))\nresult = (float(r[0]), bool(r.isna()[1]))", "result == (5.0, True)"],
    ], PD),
];

// ---------------------------------------------------------------------------
// pandas-sorting
// ---------------------------------------------------------------------------
const SO = "pandas-sorting";
const SC = "pd.Series([40, 10, 30, 20], index=[\"d\", \"a\", \"c\", \"b\"])";
const sorting: Item[] = [
  mcq(s(SO, "recall-sort-index", "recall", 1, 15, "Which method sorts a DataFrame by its row labels?"),
    "`df.sort_index()`",
    [
      ["`df.sort_values()`", "sort-values-index", "`sort_values` sorts by column values."],
      ["`df.sort()`", "df-sort", "DataFrames have no `.sort()` method."],
      ["`df.reindex()`", "reindex-sorts", "`reindex` conforms to given labels; it doesn't sort."],
    ]),
  mcq(s(SO, "recall-ascending-flag", "recall", 1, 15, "Which argument makes `sort_values` sort from largest to smallest?"),
    "`ascending=False`",
    [
      ["`reverse=True`", "pandas-reverse", "That's Python's `sorted`; pandas uses `ascending`."],
      ["`descending=True`", "descending-flag", "The parameter is `ascending`."],
      ["`order=\"desc\"`", "order-desc", "There's no `order` parameter."],
    ]),
  mcq(s(SO, "recall-index-travels", "recall", 2, 20, "After `df.sort_values(\"x\")`, what happens to the index labels?"),
    "Each row keeps its original label, so the index comes out shuffled",
    [
      ["They're renumbered from $0$", "sort-renumbers", "Use `ignore_index=True` or `reset_index(drop=True)` to renumber."],
      ["They're sorted too", "index-sorted-too", "Labels move with their rows."],
      ["They're dropped", "index-dropped", "The index is always kept."],
    ]),
  num(s(SO, "eval-sort-values-first", "apply", 3, 25, `After \`s = ${SC}\`, what is \`s.sort_values().iloc[0]\`?`), 10),
  mcq(s(SO, "eval-sort-values-index", "apply", 3, 30, `After \`s = ${SC}\`, what is \`s.sort_values().index.tolist()\`?`),
    "`['a', 'b', 'c', 'd']`",
    [
      ["`[0, 1, 2, 3]`", "sort-resets-index", "Labels travel with their values."],
      ["`['d', 'a', 'c', 'b']`", "sort-index-unchanged", "The labels are reordered with the values."],
      ["`['d', 'c', 'b', 'a']`", "sort-desc-index", "The default sort is ascending."],
    ]),
  num(s(SO, "eval-sort-index-first", "apply", 3, 25, `After \`s = ${SC}\`, what is \`s.sort_index().iloc[-1]\`?`), 40),
  num(s(SO, "eval-nsmallest", "apply", 4, 30, `After \`s = ${SC}\`, what is \`s.nsmallest(2).sum()\`?`), 30),
  num(s(SO, "eval-rank-max", "apply", 4, 35, "What is `pd.Series([7, 7, 3, 9]).rank(method=\"max\").tolist()[0]`?"), 3),
  mcq(s(SO, "eval-multi-sort", "apply", 5, 40, "After `df = pd.DataFrame({\"d\": [\"x\", \"y\", \"x\"], \"s\": [1, 5, 3]})`, what is `df.sort_values([\"d\", \"s\"], ascending=[True, False])[\"s\"].tolist()`?"),
    "`[3, 1, 5]`",
    [
      ["`[1, 3, 5]`", "multi-sort-asc-both", "Within `d == \"x\"`, `s` is sorted descending."],
      ["`[5, 3, 1]`", "multi-sort-s-only", "`d` is the primary key."],
      ["`[1, 5, 3]`", "multi-sort-ignored", "The rows are reordered."],
    ]),
  num(s(SO, "eval-na-position", "apply", 5, 40, "What is `pd.Series([2.0, np.nan, 1.0]).sort_values(na_position=\"first\").iloc[1]`?"), 1),
  short(s(SO, "explain-reset-index", "explain", 6, 120, "After sorting, a teammate assigns `df[\"rank\"] = range(1, len(df) + 1)` and it works, but `df[\"prev\"] = other_series` gives misaligned values. Explain why the two behave differently."),
    [
      ["positional", "A `range`/list has no index, so it's assigned by position in the current row order", 2, true],
      ["aligned", "A Series is aligned on index labels, so it matches original labels, not the sorted positions", 2, true],
    ]),
  mcq(s(SO, "transfer-sort-key", "transfer", 7, 50, "Which sorts a column of names case-insensitively?"),
    "`df.sort_values(\"name\", key=lambda s: s.str.lower())`",
    [
      ["`df.sort_values(\"name\", key=str.lower)`", "key-per-element", "pandas' `key` receives the whole Series, not each element."],
      ["`df.sort_values(\"name\".lower())`", "lower-column-name", "That lowercases the column *name*, not the values."],
      ["`df.sort_values(\"name\", case=False)`", "case-flag", "There's no `case` parameter."],
    ]),
  num(s(SO, "eval-rank-dense-max", "transfer", 8, 60, "What is `pd.Series([10, 20, 20, 30, 30, 30]).rank(method=\"dense\").max()`?"), 3),
  num(s(SO, "eval-rank-average", "transfer", 8, 60, "What is `pd.Series([10, 20, 20, 30]).rank().iloc[1]`?"), 2.5),
  mcq(s(SO, "transfer-categorical-sort", "transfer", 8, 60, "A `size` column holds `S`, `M`, `L`, `XL` as text and sorts as `L, M, S, XL`. What gives the natural order?"),
    "Convert it to an ordered categorical with categories `[\"S\", \"M\", \"L\", \"XL\"]` and sort",
    [
      ["`sort_values(ascending=False)`", "reverse-fixes-order", "Reversing alphabetical order gives `XL, S, M, L`."],
      ["Sort by string length", "sort-by-length", "`S`, `M` and `L` all have length $1$, so their order is undefined."],
      ["`sort_index()`", "sort-index-size", "That sorts by row labels, not sizes."],
    ]),
  num(s(SO, "eval-top-per-group", "transfer", 9, 75, "After `df = pd.DataFrame({\"g\": [\"a\", \"a\", \"a\", \"b\", \"b\"], \"v\": [5, 9, 7, 1, 3]})`, what is `df.sort_values(\"v\", ascending=False).groupby(\"g\").head(2)[\"v\"].sum()`?"), 20),
  num(s(SO, "eval-group-rank", "transfer", 9, 75, "After `df = pd.DataFrame({\"g\": [\"a\", \"a\", \"b\", \"b\"], \"v\": [3, 8, 2, 1]})`, what is `df.groupby(\"g\")[\"v\"].rank(ascending=False).sum()`?"), 6),
  short(s(SO, "transfer-stable-kind", "transfer", 10, 150, "Rows are sorted by `date` and then by `priority` with a second `sort_values` call. Explain why `kind=\"stable\"` (or `\"mergesort\"`) matters for the second call."),
    [
      ["stable", "A stable sort keeps rows with equal `priority` in their existing order — here, by date", 2, true],
      ["default", "The default quicksort isn't stable for a single column, so ties could be reordered and the date order lost", 2, true],
    ]),
  code(s(SO, "code-leaderboard", "apply", 5, 90, "Write `leaderboard(df)` returning rows sorted by `score` descending then `name` ascending, with a fresh `0..n-1` index."),
    "import pandas as pd\n\ndef leaderboard(df):\n    pass\n",
    "import pandas as pd\n\ndef leaderboard(df):\n    return df.sort_values([\"score\", \"name\"], ascending=[False, True]).reset_index(drop=True)\n",
    [
      ["order", "import pandas as pd\nd = pd.DataFrame({\"name\": [\"cy\", \"al\", \"bo\"], \"score\": [5, 9, 5]})\nresult = leaderboard(d)[\"name\"].tolist()", "result == [\"al\", \"bo\", \"cy\"]"],
      ["index", "import pandas as pd\nd = pd.DataFrame({\"name\": [\"a\", \"b\"], \"score\": [1, 2]})\nresult = list(leaderboard(d).index)", "result == [0, 1]"],
    ], PD),
  code(s(SO, "code-rank-col", "apply", 6, 90, "Write `with_rank(df)` returning a copy with an integer column `rank` where the highest `pts` gets $1$, and ties share the smallest rank (`method=\"min\"`)."),
    "import pandas as pd\n\ndef with_rank(df):\n    pass\n",
    "import pandas as pd\n\ndef with_rank(df):\n    out = df.copy()\n    out[\"rank\"] = out[\"pts\"].rank(method=\"min\", ascending=False).astype(int)\n    return out\n",
    [
      ["ties", "import pandas as pd\nd = pd.DataFrame({\"pts\": [10, 30, 30, 20]})\nresult = with_rank(d)[\"rank\"].tolist()", "result == [4, 1, 1, 3]"],
    ], PD),
];

export const pythonSixtyPandasAItems: Item[] = [...pandasIo, ...selection, ...filtering, ...missing, ...dtypes, ...sorting];
