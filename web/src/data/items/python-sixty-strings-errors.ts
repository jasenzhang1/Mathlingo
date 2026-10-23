import type { Item } from "../../lib/assessment/types";
import { code, mcq, num, s, short } from "./python-sixty-shared";

/**
 * Strings, regular expressions and exceptions brought to 60 questions each.
 * Conventions are those of python-sixty-basics.ts; `re` is imported.
 */

// ---------------------------------------------------------------------------
// python-strings
// ---------------------------------------------------------------------------
const S = "python-strings";
const strings: Item[] = [
  mcq(s(S, "recall-quote-styles", "recall", 1, 15, "Are `'cat'` and `\"cat\"` different in Python?"),
    "No — single and double quotes make the same kind of string",
    [
      ["Yes, single quotes make a character", "single-quote-char", "Python has no character type; both are `str`."],
      ["Yes, double quotes allow formatting", "double-quote-format", "Formatting needs an `f` prefix, with either quote."],
      ["Yes, one is bytes", "single-quote-bytes", "Bytes need a `b` prefix."],
    ]),
  mcq(s(S, "recall-triple-quotes", "recall", 1, 15, "What are triple-quoted strings (`\"\"\"...\"\"\"`) mainly used for?"),
    "Strings that span several lines, such as docstrings",
    [
      ["Making strings immutable", "triple-immutable", "All strings are immutable."],
      ["Raw strings that ignore backslashes", "triple-raw", "That's the `r` prefix."],
      ["Comments that Python ignores", "triple-comment", "They're real string objects; a lone one is just unused."],
    ]),
  mcq(s(S, "recall-escape-newline", "recall", 2, 20, "What does `\\n` inside a normal string literal represent?"),
    "A single newline character",
    [
      ["A backslash followed by the letter n", "escape-literal", "That's what a raw string `r\"\\n\"` gives."],
      ["The end of the string", "escape-terminates", "The string continues after it."],
      ["A tab", "newline-is-tab", "Tab is `\\t`."],
    ]),
  num(s(S, "eval-len-escapes", "apply", 3, 25, "What is `len(\"a\\nb\\\\c\")`?"), 5),
  num(s(S, "eval-concat-len", "apply", 2, 20, "What is `len(\"ab\" + \"cd\" * 2)`?"), 6),
  mcq(s(S, "eval-implicit-concat", "apply", 4, 35, "What is `\"ab\" \"cd\"` (two literals side by side, no operator)?"),
    "`'abcd'`",
    [
      ["`SyntaxError`", "adjacent-literals-error", "Adjacent string literals are joined at compile time."],
      ["`('ab', 'cd')`", "adjacent-literals-tuple", "Without a comma there's no tuple."],
      ["`'ab cd'`", "adjacent-literals-space", "No space is inserted."],
    ]),
  num(s(S, "eval-chr-arith", "apply", 4, 30, "What is `ord(\"z\") - ord(\"a\") + 1`?"), 26),
  mcq(s(S, "eval-slice-step-neg", "apply", 4, 35, "What is `\"abcdef\"[::-2]`?"),
    "`'fdb'`",
    [
      ["`'ace'`", "neg-step-from-start", "A negative step starts from the end."],
      ["`'fedcba'`", "neg-two-is-reverse", "Step $-2$ skips every other character."],
      ["`'eca'`", "neg-step-off-by-one", "It starts at the last character, `f`."],
    ]),
  mcq(s(S, "eval-compare-length", "apply", 5, 40, "What is `\"apple\" < \"apples\" < \"b\"`?"),
    "`True`",
    [
      ["`False`, because `apples` is longer than `b`", "string-compare-length", "Strings compare character by character; `a < b` decides the second link."],
      ["`TypeError`", "chain-strings-error", "Strings can be compared and chained."],
      ["`False`, because `apple` equals the start of `apples`", "prefix-not-less", "A proper prefix compares as less."],
    ]),
  num(s(S, "eval-in-count", "apply", 5, 40, "What is `sum(ch in \"aeiou\" for ch in \"education\")`?"), 5),
  short(s(S, "explain-raw-strings", "explain", 6, 120, "What does the `r` prefix change in `r\"C:\\new\\table\"`, and what goes wrong without it?"),
    [
      ["raw", "Backslashes are kept literally instead of starting escape sequences", 2, true],
      ["bug", "Without it, `\\n` and `\\t` become a newline and a tab, corrupting the path", 2, true],
    ]),
  mcq(s(S, "transfer-encode-bytes", "transfer", 7, 50, "What is `len(\"€\".encode(\"utf-8\"))`?"),
    "`3` — the euro sign takes three bytes in UTF-8",
    [
      ["`1`", "encode-one-byte", "Only ASCII characters take one byte in UTF-8."],
      ["`2`", "encode-two-bytes", "Code points from U+0800 to U+FFFF take three bytes."],
      ["`4`", "encode-four-bytes", "Four bytes are for code points beyond U+FFFF, such as many emoji."],
    ]),
  mcq(s(S, "transfer-decode-error", "transfer", 8, 60, "What does `b\"\\xff\".decode(\"utf-8\")` do?"),
    "Raises `UnicodeDecodeError` — `0xFF` is never valid in UTF-8",
    [
      ["Returns `'ÿ'`", "decode-latin1", "That would be the Latin-1 decoding."],
      ["Returns `'\\\\xff'`", "decode-escapes", "Invalid bytes raise unless `errors=` says otherwise."],
      ["Returns `''`", "decode-skips", "Bytes are skipped only with `errors=\"ignore\"`."],
    ]),
  num(s(S, "eval-join-vs-plus", "transfer", 8, 60, "What is `len(\"\".join(str(i) for i in range(12)))`?"), 14),
  mcq(s(S, "transfer-str-vs-repr", "transfer", 8, 60, "What is `repr(\"it's\")`?"),
    "`\"it's\"` shown with double quotes, because the text contains a single quote",
    [
      ["`'it\\'s'`", "repr-escapes-quote", "Python picks double quotes to avoid escaping."],
      ["`it's`", "repr-no-quotes", "That's `str`; `repr` adds quotes."],
      ["`'its'`", "repr-drops-quote", "The apostrophe is kept."],
    ]),
  num(s(S, "eval-unicode-normalise", "transfer", 9, 75, "After `import unicodedata`, `a = \"\\u00e9\"`, `b = \"e\\u0301\"`, what is `(a == b) + (unicodedata.normalize(\"NFC\", a) == unicodedata.normalize(\"NFC\", b)) * 10`?"), 10),
  short(s(S, "transfer-intern", "transfer", 9, 150, "Two equal strings built at run time, e.g. `\"\".join([\"ab\", \"c\"])` and `\"abc\"`, may be different objects. Explain why, and what that means for using `is` to compare strings."),
    [
      ["separate-objects", "Strings created at run time are new objects; only some literals/identifiers are interned (shared) by CPython", 2, true],
      ["use-eq", "So `is` may be `False` for equal strings; always compare with `==`", 2, true],
    ]),
  num(s(S, "eval-casefold-len", "transfer", 10, 90, "What is `len(\"Straße\".casefold())`?"), 7),
  code(s(S, "code-caesar", "apply", 6, 90, "Write `caesar(text, k)` shifting each lowercase letter `k` places through the alphabet (wrapping z → a) and leaving other characters unchanged."),
    "def caesar(text, k):\n    pass\n",
    "def caesar(text, k):\n    out = []\n    for ch in text:\n        if \"a\" <= ch <= \"z\":\n            out.append(chr((ord(ch) - 97 + k) % 26 + 97))\n        else:\n            out.append(ch)\n    return \"\".join(out)\n",
    [
      ["basic", "result = caesar(\"abc\", 1)", "result == \"bcd\""],
      ["wrap", "result = caesar(\"xyz\", 3)", "result == \"abc\""],
      ["other", "result = caesar(\"hi, Bob!\", 2)", "result == \"jk, Bqd!\""],
    ]),
  code(s(S, "code-compress", "apply", 7, 120, "Write `rle(text)` returning a run-length encoding: each run of a repeated character becomes the character followed by the run length. `rle(\"aaabcc\")` is `\"a3b1c2\"`."),
    "def rle(text):\n    pass\n",
    "def rle(text):\n    if not text:\n        return \"\"\n    out = []\n    cur, n = text[0], 1\n    for ch in text[1:]:\n        if ch == cur:\n            n += 1\n        else:\n            out.append(f\"{cur}{n}\")\n            cur, n = ch, 1\n    out.append(f\"{cur}{n}\")\n    return \"\".join(out)\n",
    [
      ["basic", "result = rle(\"aaabcc\")", "result == \"a3b1c2\""],
      ["single", "result = rle(\"z\")", "result == \"z1\""],
      ["empty", "result = (rle(\"\"), rle(\"aa\"))", "result == (\"\", \"a2\")"],
    ]),
];

// ---------------------------------------------------------------------------
// python-string-methods
// ---------------------------------------------------------------------------
const SM = "python-string-methods";
const stringMethods: Item[] = [
  mcq(s(SM, "recall-lower", "recall", 1, 15, "What does `\"HeLLo\".lower()` return?"),
    "`'hello'`",
    [
      ["`'HELLO'`", "lower-is-upper", "`lower` converts to lowercase."],
      ["`'Hello'`", "lower-is-capitalize", "That's `capitalize`."],
      ["`None`", "lower-in-place", "String methods return new strings."],
    ]),
  mcq(s(SM, "recall-startswith-tuple", "recall", 2, 20, "What does `name.endswith((\".jpg\", \".png\"))` check?"),
    "Whether `name` ends with either suffix",
    [
      ["Whether `name` ends with both", "endswith-all", "A tuple means “any of these.”"],
      ["It raises — only one suffix is allowed", "endswith-one", "`endswith` accepts a tuple of options."],
      ["Whether `name` contains them anywhere", "endswith-contains", "Only the end is checked."],
    ]),
  mcq(s(SM, "recall-isdigit", "recall", 2, 20, "What is `\"123\".isdigit()` and `\"12.3\".isdigit()`?"),
    "`True` and `False` — the dot is not a digit",
    [
      ["Both `True`", "isdigit-floats", "`isdigit` checks every character is a digit."],
      ["Both `False`", "isdigit-false", "`\"123\"` is all digits."],
      ["`True` and an error", "isdigit-error", "`isdigit` never raises; it returns a `bool`."],
    ]),
  mcq(s(SM, "eval-split-maxsplit", "apply", 3, 25, "What is `\"k=v=w\".split(\"=\", 1)`?"),
    "`['k', 'v=w']`",
    [
      ["`['k', 'v', 'w']`", "maxsplit-ignored", "`1` limits it to one split."],
      ["`['k=v', 'w']`", "maxsplit-from-right", "Splitting starts from the left; `rsplit` starts from the right."],
      ["`['k']`", "maxsplit-truncates", "The rest of the string is kept as the last piece."],
    ]),
  mcq(s(SM, "eval-rsplit", "apply", 4, 30, "What is `\"a.b.c.txt\".rsplit(\".\", 1)`?"),
    "`['a.b.c', 'txt']`",
    [
      ["`['a', 'b.c.txt']`", "rsplit-left", "`rsplit` splits from the right."],
      ["`['a', 'b', 'c', 'txt']`", "rsplit-maxsplit-ignored", "`1` allows a single split."],
      ["`['txt', 'a.b.c']`", "rsplit-reversed", "Pieces stay in their original order."],
    ]),
  num(s(SM, "eval-count-overlap", "apply", 4, 30, "What is `\"aaaa\".count(\"aa\")`?"), 2),
  mcq(s(SM, "eval-zfill-neg", "apply", 4, 35, "What is `\"-42\".zfill(5)`?"),
    "`'-0042'`",
    [
      ["`'00-42'`", "zfill-before-sign", "`zfill` keeps a leading sign in front."],
      ["`'-42'`", "zfill-noop", "It pads to width $5$."],
      ["`'0-042'`", "zfill-mid", "Padding goes after the sign."],
    ]),
  mcq(s(SM, "eval-removeprefix", "apply", 5, 40, "What is `\"test_data\".removeprefix(\"test_\")`?"),
    "`'data'`",
    [
      ["`'a'`", "removeprefix-is-lstrip", "`lstrip(\"test_\")` strips those *characters*; `removeprefix` removes the exact prefix."],
      ["`'test_data'`", "removeprefix-noop", "The prefix is present, so it's removed."],
      ["`'_data'`", "removeprefix-partial", "The whole prefix `test_` is removed."],
    ]),
  num(s(SM, "eval-translate", "apply", 5, 40, "What is `len(\"h.e,l!l?o\".translate(str.maketrans(\"\", \"\", \".,!?\")))`?"), 5),
  num(s(SM, "eval-find-start", "apply", 5, 40, "What is `\"abcabc\".find(\"b\", 2)`?"), 4),
  short(s(SM, "explain-split-none", "explain", 6, 120, "Explain how `\"  a  b \".split()` differs from `\"  a  b \".split(\" \")`, giving both results."),
    [
      ["no-arg", "`split()` splits on runs of whitespace and drops empty strings: `['a', 'b']`", 2, true],
      ["space-arg", "`split(\" \")` splits on every single space, keeping empty strings: `['', '', 'a', '', 'b', '']`", 2, true],
    ]),
  mcq(s(SM, "transfer-isnumeric-family", "transfer", 7, 60, "Which is `True` for `\"½\"`?"),
    "`\"½\".isnumeric()`",
    [
      ["`\"½\".isdigit()`", "isdigit-fraction", "Vulgar fractions are numeric but not digits."],
      ["`\"½\".isdecimal()`", "isdecimal-fraction", "`isdecimal` is the strictest: only `0`–`9`-style decimal digits."],
      ["None of them", "fraction-not-numeric", "`isnumeric` accepts it."],
    ]),
  num(s(SM, "eval-expandtabs", "transfer", 8, 60, "What is `len(\"a\\tb\".expandtabs(4))`?"), 5),
  mcq(s(SM, "transfer-splitlines", "transfer", 8, 60, "What is `\"a\\r\\nb\\n\".splitlines()`?"),
    "`['a', 'b']`",
    [
      ["`['a\\r', 'b', '']`", "splitlines-is-split-n", "That's `split(\"\\n\")`; `splitlines` understands `\\r\\n` and drops the trailing empty piece."],
      ["`['a', '', 'b']`", "splitlines-cr-separate", "`\\r\\n` counts as a single line break."],
      ["`['a\\r\\nb']`", "splitlines-noop", "Both line breaks split."],
    ]),
  num(s(SM, "eval-partition-tuple", "transfer", 8, 60, "What is `len(\"key: value: x\".partition(\": \")[2])`?"), 8),
  mcq(s(SM, "transfer-format-map", "transfer", 9, 75, "Which is safe for a template supplied by users, where `\"{0.__class__}\"`-style tricks must not run?"),
    "`string.Template(\"Hi $name\").safe_substitute(name=n)`",
    [
      ["`user_template.format(**data)`", "format-user-safe", "`str.format` allows attribute and index access, which can leak internals."],
      ["`eval(\"f'\" + user_template + \"'\")`", "eval-fstring", "That executes arbitrary code."],
      ["`user_template % data`", "percent-safe", "`%` formatting is also driven by the template, and still risky with arbitrary input."],
    ]),
  num(s(SM, "eval-title-apostrophe", "transfer", 9, 75, "What is `sum(c.isupper() for c in \"they're bill's\".title())`?"), 4),
  short(s(SM, "transfer-parse-kv", "transfer", 9, 150, "Lines look like `\"  Name :  Ada Lovelace  \"`. Describe a robust way to split each into a stripped key and value, keeping colons that appear inside the value."),
    [
      ["partition", "Use `partition(\":\")` or `split(\":\", 1)` so only the first colon splits", 2, true],
      ["strip", "Strip both key and value afterwards", 1, true],
      ["missing", "Handle lines with no colon (partition's separator comes back empty)", 1],
    ]),
  code(s(SM, "code-acronym", "apply", 4, 75, "Write `acronym(phrase)` returning the uppercase first letters of each word, treating hyphens as spaces. `acronym(\"portable network-graphics\")` is `\"PNG\"`."),
    "def acronym(phrase):\n    pass\n",
    "def acronym(phrase):\n    return \"\".join(w[0].upper() for w in phrase.replace(\"-\", \" \").split())\n",
    [
      ["basic", "result = acronym(\"portable network-graphics\")", "result == \"PNG\""],
      ["spaces", "result = acronym(\"  as soon  as possible \")", "result == \"ASAP\""],
    ]),
  code(s(SM, "code-slugify", "apply", 6, 90, "Write `slugify(title)` that lowercases, keeps only letters, digits and spaces, then joins words with single hyphens. `slugify(\"Hello, World! 2024\")` is `\"hello-world-2024\"`."),
    "def slugify(title):\n    pass\n",
    "def slugify(title):\n    kept = \"\".join(c for c in title.lower() if c.isalnum() or c == \" \")\n    return \"-\".join(kept.split())\n",
    [
      ["basic", "result = slugify(\"Hello, World! 2024\")", "result == \"hello-world-2024\""],
      ["spaces", "result = slugify(\"  Many   Spaces  \")", "result == \"many-spaces\""],
    ]),
];

// ---------------------------------------------------------------------------
// python-fstrings
// ---------------------------------------------------------------------------
const FS = "python-fstrings";
const fstrings: Item[] = [
  mcq(s(FS, "recall-prefix", "recall", 1, 15, "What makes `f\"Hi {name.title()}\"` evaluate `name.title()` and insert the result?"),
    "The `f` prefix before the opening quote",
    [
      ["The curly braces alone", "braces-alone", "Without the `f`, braces are just characters."],
      ["Calling `.format()` afterward", "fstring-needs-format", "An f-string substitutes immediately."],
      ["Double quotes", "double-quotes-format", "Quote style doesn't matter."],
    ]),
  mcq(s(FS, "recall-expression", "recall", 1, 15, "`a = 2`, `b = 3`. What is `f\"{a * b}\"`?"),
    "`'6'`",
    [
      ["`'a * b'`", "fstring-literal-expr", "The braces evaluate the expression."],
      ["`'2 * 3'`", "fstring-substitute-names", "The whole expression is evaluated."],
      ["`6`", "fstring-returns-int", "An f-string always produces a `str`."],
    ]),
  mcq(s(FS, "recall-format-spec-colon", "recall", 2, 20, "In `f\"{price:.2f}\"`, what does the part after the colon control?"),
    "How the value is formatted — here, two decimal places",
    [
      ["Which variable to use", "colon-picks-variable", "The variable is before the colon."],
      ["A default if `price` is missing", "colon-default", "Format specs don't supply defaults."],
      ["A type conversion of `price` to `str` in place", "colon-converts-in-place", "`price` itself is unchanged."],
    ]),
  mcq(s(FS, "eval-left-align", "apply", 3, 25, "What is `f\"{'ab':<5}|\"`?"),
    "`'ab   |'`",
    [
      ["`'   ab|'`", "left-is-right", "`<` left-aligns, padding on the right."],
      ["`'ab|'`", "align-noop", "The width is $5$."],
      ["`' ab  |'`", "left-is-center", "That's centring (`^`)."],
    ]),
  mcq(s(FS, "eval-thousands-underscore", "apply", 3, 25, "What is `f\"{1234567:_}\"`?"),
    "`'1_234_567'`",
    [
      ["`'1,234,567'`", "underscore-is-comma", "`_` uses underscores as the grouping character."],
      ["`'1234567'`", "underscore-noop", "Grouping is applied."],
      ["`ValueError`", "underscore-invalid", "`_` is a valid grouping option."],
    ]),
  num(s(FS, "eval-width-len", "apply", 3, 25, "What is `len(f\"{7:>6}\")`?"), 6),
  mcq(s(FS, "eval-octal", "apply", 4, 30, "What is `f\"{8:o}\"`?"),
    "`'10'`",
    [
      ["`'8'`", "octal-noop", "`o` formats in base $8$."],
      ["`'1000'`", "octal-is-binary", "That's binary."],
      ["`'0o10'`", "octal-prefix", "The `0o` prefix needs the `#` option."],
    ]),
  mcq(s(FS, "eval-nested-quotes", "apply", 4, 35, "`d = {\"k\": 5}`. What is `f\"{d['k'] * 2}\"`?"),
    "`'10'`",
    [
      ["`SyntaxError`", "fstring-quote-clash", "Different inner quotes are fine (and from Python $3.12$ even the same quotes are)."],
      ["`'55'`", "fstring-str-mult", "`d['k']` is the integer $5$."],
      ["`\"d['k'] * 2\"`", "fstring-not-evaluated", "The expression is evaluated."],
    ]),
  mcq(s(FS, "eval-percent", "apply", 5, 40, "What is `f\"{0.075:.0%}\"`?"),
    "`'8%'`",
    [
      ["`'7%'`", "percent-truncates", "The value $7.5\\%$ is rounded, not truncated."],
      ["`'0%'`", "percent-no-scale", "`%` multiplies by $100$ first."],
      ["`'7.5%'`", "percent-ignores-precision", "`.0` means no decimal places."],
    ]),
  mcq(s(FS, "eval-sign-space", "apply", 5, 40, "What is `f\"{5: d}|{-5: d}\"`?"),
    "`' 5|-5'`",
    [
      ["`'5|-5'`", "space-sign-ignored", "A space option puts a space where a plus sign would go."],
      ["`'+5|-5'`", "space-is-plus", "That's the `+` option."],
      ["`' 5| -5'`", "space-before-minus", "Negative numbers still show just `-`."],
    ]),
  short(s(FS, "explain-repr-conversion", "explain", 6, 120, "What do `!r` and `!s` do in an f-string, and when is `f\"{value!r}\"` more useful than `f\"{value!s}\"`?"),
    [
      ["conversions", "`!r` formats with `repr()`, `!s` with `str()` (the default)", 2, true],
      ["use", "In debugging/log messages, `repr` shows quotes, escapes and type hints, e.g. distinguishing `'5'` from `5` or revealing trailing spaces", 2],
    ]),
  mcq(s(FS, "transfer-debug-spec", "transfer", 7, 50, "`x = 3.14159`. What is `f\"{x=:.2f}\"`?"),
    "`'x=3.14'`",
    [
      ["`'3.14'`", "debug-drops-name", "The `=` adds the expression text."],
      ["`'x=3.14159'`", "debug-ignores-spec", "The format spec still applies."],
      ["`SyntaxError`", "debug-spec-invalid", "`=` can be combined with a format spec."],
    ]),
  mcq(s(FS, "transfer-date-format", "transfer", 8, 60, "`from datetime import date`, `d = date(2024, 3, 5)`. What is `f\"{d:%d %b %Y}\"`?"),
    "`'05 Mar 2024'`",
    [
      ["`'2024-03-05'`", "date-spec-ignored", "Objects can define their own format specs; dates use `strftime` codes."],
      ["`'5 March 2024'`", "date-full-month", "`%b` is the abbreviated month and `%d` is zero-padded."],
      ["`ValueError`", "date-spec-invalid", "`date.__format__` accepts `strftime` codes."],
    ]),
  num(s(FS, "eval-nested-width", "transfer", 8, 60, "After `w, p = 4, 4`, what is `len(f\"{2/3:{2 * w}.{p - 1}f}\")`?"), 8),
  mcq(s(FS, "transfer-bankers-display", "transfer", 9, 75, "Why is `f\"{0.125:.2f}\"` `'0.12'` but `f\"{0.375:.2f}\"` `'0.38'`?"),
    "Both are exact in binary, so ties round half to even: $0.125 \\to 0.12$ and $0.375 \\to 0.38$",
    [
      ["Formatting always rounds down", "format-rounds-down", "$0.375$ rounded up."],
      ["Binary error makes $0.125$ slightly smaller", "binary-error-125", "$0.125 = 2^{-3}$ is exact; it's a true tie."],
      ["It depends on the platform", "format-platform", "Python formatting is deterministic."],
    ]),
  num(s(FS, "eval-format-builtin", "transfer", 9, 75, "The built-in `format` applies a spec directly. What is `len(format(1234.5678, \",.2f\"))`?"), 8),
  short(s(FS, "transfer-sql-injection", "transfer", 10, 180, "Explain why `cur.execute(\"SELECT * FROM users WHERE name = '\" + name + \"'\")` (or the same query built with an f-string) is dangerous and show the safe alternative."),
    [
      ["injection", "A crafted `name` like `x' OR '1'='1` changes the query's meaning (SQL injection)", 2, true],
      ["params", "Pass values separately as parameters, e.g. `cur.execute(\"... WHERE name = ?\", (name,))`, so the driver handles quoting", 2, true],
    ]),
  num(s(FS, "eval-general-format", "transfer", 10, 90, "What is `len(f\"{123456789:.3g}\")`?"), 8),
  code(s(FS, "code-receipt-line", "apply", 5, 90, "Write `line(item, price)` returning the item left-aligned in $10$ characters followed by the price right-aligned in $8$ characters with $2$ decimals. `line(\"tea\", 3.5)` is `\"tea           3.50\"`."),
    "def line(item, price):\n    pass\n",
    "def line(item, price):\n    return f\"{item:<10}{price:>8.2f}\"\n",
    [
      ["basic", "result = line(\"tea\", 3.5)", "result == \"tea           3.50\""],
      ["length", "result = len(line(\"coffee\", 12))", "result == 18"],
    ]),
  code(s(FS, "code-human-bytes", "apply", 7, 120, "Write `human(n)` formatting a byte count with one decimal and the largest fitting unit among `B`, `KB`, `MB`, `GB` (powers of $1024$). `human(1536)` is `\"1.5 KB\"`, `human(500)` is `\"500.0 B\"`."),
    "def human(n):\n    pass\n",
    "def human(n):\n    for unit in [\"B\", \"KB\", \"MB\"]:\n        if n < 1024:\n            return f\"{n:.1f} {unit}\"\n        n /= 1024\n    return f\"{n:.1f} GB\"\n",
    [
      ["kb", "result = human(1536)", "result == \"1.5 KB\""],
      ["b", "result = human(500)", "result == \"500.0 B\""],
      ["gb", "result = human(3 * 1024 ** 3)", "result == \"3.0 GB\""],
    ]),
];

// ---------------------------------------------------------------------------
// python-regex
// ---------------------------------------------------------------------------
const RX = "python-regex";
const regex: Item[] = [
  mcq(s(RX, "recall-dot", "recall", 1, 15, "In a regex, what does `.` match by default?"),
    "Any single character except a newline",
    [
      ["A literal full stop only", "dot-literal", "That needs escaping: `\\.`."],
      ["Any number of characters", "dot-many", "`.` is one character; `.*` is many."],
      ["The end of the string", "dot-end", "That's `$`."],
    ]),
  mcq(s(RX, "recall-anchors", "recall", 1, 15, "What do `^` and `$` mean outside square brackets?"),
    "Start and end of the string (or line, with `re.MULTILINE`)",
    [
      ["Power and currency", "anchors-symbols", "In regex they're anchors."],
      ["Optional and required", "anchors-optional", "Optional is `?`."],
      ["Group start and end", "anchors-groups", "Groups use parentheses."],
    ]),
  mcq(s(RX, "recall-question-mark", "recall", 2, 20, "What does `colou?r` match?"),
    "Both `color` and `colour`",
    [
      ["Only `colour`", "qmark-required", "`?` makes the preceding `u` optional."],
      ["`colo` followed by any character and `r`", "qmark-any", "That would be `colo.r`."],
      ["`colour` repeated", "qmark-repeat", "`?` means zero or one."],
    ]),
  num(s(RX, "eval-findall-words", "apply", 3, 25, "What is `len(re.findall(r\"\\w+\", \"hi, you two!\"))`?"), 3),
  mcq(s(RX, "eval-sub-digits", "apply", 3, 25, "What is `re.sub(r\"\\d\", \"#\", \"a1b22\")`?"),
    "`'a#b##'`",
    [
      ["`'a#b#'`", "sub-digit-runs", "`\\d` matches one digit at a time; `\\d+` would collapse runs."],
      ["`'#'`", "sub-whole", "Only the digits are replaced."],
      ["`'a1b22'`", "sub-noop", "There are digits to replace."],
    ]),
  mcq(s(RX, "eval-char-class", "apply", 4, 30, "What is `re.findall(r\"[aeiou]\", \"regex\")`?"),
    "`['e', 'e']`",
    [
      ["`['e']`", "findall-first-only", "`findall` returns every match."],
      ["`'ee'`", "findall-joins", "`findall` returns a list."],
      ["`['r', 'g', 'x']`", "class-is-negated", "`[aeiou]` matches vowels; `[^aeiou]` would match the rest."],
    ]),
  num(s(RX, "eval-quantifier-range", "apply", 4, 30, "What is `len(re.findall(r\"\\d{2,3}\", \"1 12 123 1234\"))`?"), 3),
  mcq(s(RX, "eval-group-access", "apply", 4, 35, "What is `re.search(r\"(\\d+)-(\\d+)\", \"pages 10-25\").group(2)`?"),
    "`'25'`",
    [
      ["`'10'`", "group-two-is-first", "Group numbering starts at $1$; group $2$ is the second pair of parentheses."],
      ["`25`", "group-int", "Groups are strings."],
      ["`'10-25'`", "group-two-whole", "The whole match is `group(0)`."],
    ]),
  mcq(s(RX, "eval-non-greedy", "apply", 5, 40, "What is `re.findall(r\"<.*?>\", \"<a><b>\")`?"),
    "`['<a>', '<b>']`",
    [
      ["`['<a><b>']`", "lazy-is-greedy", "`*?` is lazy: it stops at the first `>`."],
      ["`['a', 'b']`", "lazy-no-brackets", "Without a group, the whole match is returned."],
      ["`[]`", "lazy-no-match", "Each tag matches."],
    ]),
  num(s(RX, "eval-split-maxsplit", "apply", 5, 40, "What is `len(re.split(r\"\\s+\", \"a  b   c d\", maxsplit=2))`?"), 3),
  short(s(RX, "explain-compile", "explain", 6, 120, "When is `pat = re.compile(r\"...\")` worth it, and what readability benefit does `re.VERBOSE` add for a long pattern?"),
    [
      ["compile", "Compiling gives a reusable pattern object, useful when the same pattern is used repeatedly (and as a named, documented constant)", 2, true],
      ["verbose", "`re.VERBOSE` lets you split the pattern over lines with whitespace and `#` comments", 2],
    ]),
  num(s(RX, "eval-named-group", "transfer", 7, 50, "What is `int(re.search(r\"(?P<y>\\d{4})-(?P<m>\\d\\d)\", \"on 2024-07\").group(\"m\"))`?"), 7),
  mcq(s(RX, "transfer-backreference", "transfer", 8, 60, "What does `re.findall(r\"\\b(\\w+) \\1\\b\", \"the the cat sat sat\")` return?"),
    "`['the', 'sat']` — `\\1` requires the same text the first group matched",
    [
      ["`['the the', 'sat sat']`", "backref-full-match", "With one group, `findall` returns just the group."],
      ["`[]`", "backref-unsupported", "Back-references are supported."],
      ["`['the', 'cat', 'sat']`", "backref-any-word", "Only repeated words match."],
    ]),
  num(s(RX, "eval-lookahead", "transfer", 8, 60, "What is `len(re.findall(r\"\\d+(?=px)\", \"10px 20em 30px\"))`?"), 2),
  mcq(s(RX, "transfer-multiline-flag", "transfer", 8, 60, "What is `re.findall(r\"^\\d\", \"1a\\n2b\")` versus the same with `re.M`?"),
    "`['1']` versus `['1', '2']` — without `re.M`, `^` matches only at the very start",
    [
      ["Both `['1', '2']`", "caret-always-lines", "`^` is string-start unless `re.MULTILINE` is set."],
      ["Both `['1']`", "multiline-noop", "`re.M` makes `^` match after each newline."],
      ["`[]` versus `['1', '2']`", "caret-none", "The first character is a digit, so `^\\d` matches it."],
    ]),
  num(s(RX, "eval-sub-callable", "transfer", 9, 75, "What is `re.sub(r\"\\d+\", lambda m: str(int(m.group()) * 2), \"a5b10\").count(\"0\")`?"), 2),
  mcq(s(RX, "transfer-findall-groups", "transfer", 9, 75, "Why does `re.findall(r\"(\\d)+\", \"123 45\")` return `['3', '5']`?"),
    "A repeated group keeps only its last repetition, and `findall` returns the group rather than the whole match",
    [
      ["`findall` returns the last digit of each number by design", "findall-last-digit", "It's the repeated *group* that keeps only its last match."],
      ["`+` applies only to the last digit", "plus-last", "`+` repeats the group; each repetition overwrites the capture."],
      ["It's a bug in `re`", "re-bug", "It's documented behaviour; use `(\\d+)` or `(?:\\d)+`."],
    ]),
  short(s(RX, "transfer-redos", "transfer", 10, 180, "A sign-up form validates emails with a regex that occasionally pins the CPU for minutes. Explain the likely cause and two mitigations."),
    [
      ["backtracking", "Catastrophic backtracking from nested or overlapping quantifiers (e.g. `(\\w+)+@`) on adversarial input", 2, true],
      ["mitigation", "Rewrite without ambiguous nesting, cap input length, use timeouts or a linear-time engine", 2, true],
    ]),
  code(s(RX, "code-extract-hashtags", "apply", 5, 90, "Write `hashtags(text)` returning the lowercased hashtags (without `#`) in order of appearance. A hashtag is `#` followed by letters, digits or underscores."),
    "import re\n\ndef hashtags(text):\n    pass\n",
    "import re\n\ndef hashtags(text):\n    return [t.lower() for t in re.findall(r\"#(\\w+)\", text)]\n",
    [
      ["basic", "result = hashtags(\"Love #Python and #data_science!\")", "result == [\"python\", \"data_science\"]"],
      ["none", "result = (hashtags(\"no tags\"), hashtags(\"#A1\"))", "result == ([], [\"a1\"])"],
    ]),
  code(s(RX, "code-iso-dates", "apply", 7, 120, "Write `to_iso(text)` replacing every date written `DD/MM/YYYY` with `YYYY-MM-DD`, leaving the rest of the text unchanged."),
    "import re\n\ndef to_iso(text):\n    pass\n",
    "import re\n\ndef to_iso(text):\n    return re.sub(r\"\\b(\\d{2})/(\\d{2})/(\\d{4})\\b\", r\"\\3-\\2-\\1\", text)\n",
    [
      ["one", "result = to_iso(\"Due 05/03/2024.\")", "result == \"Due 2024-03-05.\""],
      ["two", "result = to_iso(\"01/01/2020 to 31/12/2021\")", "result == \"2020-01-01 to 2021-12-31\""],
    ]),
];

// ---------------------------------------------------------------------------
// python-exceptions
// ---------------------------------------------------------------------------
const EX = "python-exceptions";
const exceptions: Item[] = [
  mcq(s(EX, "recall-traceback", "recall", 1, 15, "What is a traceback?"),
    "The report Python prints for an uncaught exception, showing the chain of calls and the error",
    [
      ["A way to undo the last statement", "traceback-undo", "It's a diagnostic report."],
      ["A log of every line executed", "traceback-full-log", "It shows only the call stack at the error."],
      ["A built-in debugger", "traceback-debugger", "Debuggers like `pdb` are separate."],
    ]),
  mcq(s(EX, "recall-uncaught", "recall", 1, 15, "What happens when an exception is raised and nothing catches it?"),
    "The program stops and prints a traceback",
    [
      ["Python skips the bad line and continues", "uncaught-skips", "An uncaught exception ends the program."],
      ["The value becomes `None`", "uncaught-none", "Nothing is substituted."],
      ["Python retries the line", "uncaught-retries", "There's no automatic retry."],
    ]),
  mcq(s(EX, "recall-specific-first", "recall", 2, 20, "With several `except` clauses, which one runs?"),
    "The first one, top to bottom, whose type matches the exception",
    [
      ["The most specific one, wherever it is", "except-most-specific", "Order decides; put specific types first."],
      ["All matching ones", "except-all-match", "Only one handler runs."],
      ["The last one", "except-last", "They're checked from the top."],
    ]),
  mcq(s(EX, "eval-type-error-add", "apply", 3, 25, "What exception does `[1] + (2,)` raise?"),
    "`TypeError`",
    [
      ["`ValueError`", "list-tuple-valueerror", "Mixing incompatible types is a `TypeError`."],
      ["`AttributeError`", "list-tuple-attribute", "No attribute is looked up."],
      ["None; it gives `[1, 2]`", "list-tuple-concat", "Lists only concatenate with lists."],
    ]),
  mcq(s(EX, "eval-attribute-error", "apply", 3, 25, "What exception does `(5).append(1)` raise?"),
    "`AttributeError`",
    [
      ["`TypeError`", "int-append-type", "Looking up a missing method raises `AttributeError`."],
      ["`NameError`", "int-append-name", "`append` is looked up as an attribute, not a name."],
      ["`ValueError`", "int-append-value", "The problem is a missing attribute."],
    ]),
  num(s(EX, "apply-try-sum", "apply", 4, 35, "`t = 0` / `for x in [\"3\", \"x\", \"4\", None]:` / (indented) `try: t += int(x)` / `except (ValueError, TypeError): t += 100`. What is `t` afterward?"), 207),
  mcq(s(EX, "eval-stop-iteration", "apply", 4, 30, "What does `next(iter([]))` raise?"),
    "`StopIteration`",
    [
      ["`IndexError`", "next-indexerror", "Iterators signal the end with `StopIteration`."],
      ["`ValueError`", "next-valueerror", "The end of iteration is `StopIteration`."],
      ["Nothing; it returns `None`", "next-none", "Use `next(it, default)` to avoid the exception."],
    ]),
  mcq(s(EX, "apply-recursion-error-base", "apply", 5, 40, "Which built-in class is `RecursionError` a subclass of?"),
    "`RuntimeError`",
    [
      ["`MemoryError`", "recursion-memory", "It derives from `RuntimeError`."],
      ["`ValueError`", "recursion-value", "It derives from `RuntimeError`."],
      ["`StackError`", "recursion-stack", "There is no `StackError` built-in."],
    ]),
  mcq(s(EX, "apply-lookup-catch", "apply", 5, 40, "Does `except LookupError:` catch `{}[\"k\"]`?"),
    "Yes — `KeyError` is a subclass of `LookupError`",
    [
      ["No, only `except KeyError:` does", "except-exact-type", "`except` matches subclasses too."],
      ["Only if the dict is empty", "lookup-empty-dict", "Any missing key raises `KeyError`."],
      ["No, `LookupError` is for lists only", "lookup-lists", "It's the base of both `KeyError` and `IndexError`."],
    ]),
  short(s(EX, "explain-else-finally", "explain", 6, 120, "In `try`/`except`/`else`/`finally`, describe exactly when the `else` and the `finally` blocks run, and why code goes in `else` rather than at the end of `try`."),
    [
      ["else", "`else` runs only if the `try` body raised no exception", 1, true],
      ["finally", "`finally` always runs — after success, after a handled or unhandled exception, even after `return`", 1, true],
      ["why-else", "Code in `else` isn't protected by the `except`, so its own errors aren't accidentally caught and misattributed", 2],
    ]),
  mcq(s(EX, "transfer-finally-return", "transfer", 7, 60, "What does `def f():` / `try: return \"try\"` / `finally: print(\"cleanup\")` do when called?"),
    "Prints `cleanup`, then returns `\"try\"`",
    [
      ["Returns `\"try\"` without printing", "finally-skipped-on-return", "`finally` runs even when the `try` returns."],
      ["Prints `cleanup` and returns `None`", "finally-overrides-none", "Only a `return` inside `finally` would override."],
      ["Raises `SyntaxError`", "return-in-try-error", "`return` inside `try` is allowed."],
    ]),
  num(s(EX, "eval-suppress", "transfer", 8, 60, "After `import contextlib`, `r = 0`, `with contextlib.suppress(ZeroDivisionError): r = 1 / 0`, what is `r`?"), 0),
  mcq(s(EX, "transfer-keyboard-interrupt", "transfer", 8, 60, "Why does `except Exception:` not catch Ctrl-C, while a bare `except:` does?"),
    "`KeyboardInterrupt` derives from `BaseException`, not `Exception`",
    [
      ["Ctrl-C isn't an exception", "ctrl-c-not-exception", "It raises `KeyboardInterrupt`."],
      ["`except Exception` catches it too", "exception-catches-interrupt", "It deliberately doesn't."],
      ["Ctrl-C can't be caught at all", "ctrl-c-uncatchable", "A bare `except` or `except BaseException` catches it."],
    ]),
  mcq(s(EX, "transfer-exception-group", "transfer", 9, 75, "With `except* ValueError:` handling an `ExceptionGroup` of a `ValueError` and a `TypeError`, what happens to the `TypeError`?"),
    "It is re-raised (in a new group) because no `except*` clause handled it",
    [
      ["It's silently dropped", "except-star-drops", "Unhandled members propagate."],
      ["The `ValueError` handler also handles it", "except-star-all", "`except*` handles only matching members."],
      ["`except*` raises `SyntaxError`", "except-star-invalid", "It's valid from Python $3.11$."],
    ]),
  num(s(EX, "eval-mro-catch", "transfer", 9, 75, "What is `len(ZeroDivisionError.__mro__)`?"), 5),
  short(s(EX, "transfer-retry-loop", "transfer", 9, 150, "Write or describe a loop that calls `fetch()` up to $3$ times, retrying only on `ConnectionError`, re-raising the last error if all attempts fail, and letting any other exception propagate immediately."),
    [
      ["catch-specific", "Catches only `ConnectionError` in the `try`", 1, true],
      ["return-on-success", "Returns as soon as `fetch()` succeeds", 1, true],
      ["reraise", "After the final failed attempt, re-raises (bare `raise` on the last iteration, or raise the saved error)", 2, true],
    ]),
  mcq(s(EX, "transfer-exception-in-handler", "transfer", 10, 90, "An exception is raised inside an `except` block. What does the traceback show?"),
    "Both: the original exception, then “During handling of the above exception, another exception occurred”, then the new one",
    [
      ["Only the new exception", "handler-hides-original", "The original is kept as `__context__` and shown."],
      ["Only the original exception", "handler-hides-new", "The new exception is the one propagating."],
      ["Neither — exceptions in handlers are ignored", "handler-ignored", "They propagate like any other."],
    ]),
  num(s(EX, "transfer-finally-order", "transfer", 10, 90, "`log = []` / `def f():` / (indented) `try: log.append(1); return 2` / `finally: log.append(3)`. After `r = f()`, what is `r * 10 + log[-1]`?"), 23),
  code(s(EX, "code-safe-div", "apply", 4, 75, "Write `safe_div(a, b)` returning `a / b`, or `None` if `b` is zero. Use `try`/`except`, not an `if`."),
    "def safe_div(a, b):\n    pass\n",
    "def safe_div(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n",
    [
      ["normal", "result = safe_div(6, 3)", "result == 2"],
      ["zero", "result = (safe_div(1, 0), safe_div(1, 4))", "result == (None, 0.25)"],
    ]),
  code(s(EX, "code-parse-all", "apply", 6, 90, "Write `parse_all(items)` returning a tuple `(numbers, bad)`: the items that convert with `int()` as ints, and the items that don't, both in order."),
    "def parse_all(items):\n    pass\n",
    "def parse_all(items):\n    good, bad = [], []\n    for x in items:\n        try:\n            good.append(int(x))\n        except (ValueError, TypeError):\n            bad.append(x)\n    return good, bad\n",
    [
      ["mixed", "result = parse_all([\"1\", \"x\", \" 2 \", None])", "result == ([1, 2], [\"x\", None])"],
      ["all-good", "result = parse_all([\"7\"])", "result == ([7], [])"],
    ]),
];

// ---------------------------------------------------------------------------
// python-raising
// ---------------------------------------------------------------------------
const RA = "python-raising";
const raising: Item[] = [
  mcq(s(RA, "recall-raise-keyword", "recall", 1, 15, "Which keyword signals an error deliberately?"),
    "`raise`",
    [
      ["`throw`", "throw-keyword", "Python uses `raise`; `throw` is Java/JavaScript."],
      ["`error`", "error-keyword", "There's no `error` keyword."],
      ["`except`", "except-raises", "`except` catches; it doesn't raise."],
    ]),
  mcq(s(RA, "recall-message", "recall", 1, 15, "In `raise ValueError(\"age must be positive\")`, what is the string for?"),
    "A message explaining the error, shown in the traceback and available via `str(e)`",
    [
      ["It's the exception's name", "message-is-name", "The name is the class, `ValueError`."],
      ["It's code that runs on error", "message-runs", "It's just text."],
      ["It's required by the syntax", "message-required", "The message is optional."],
    ]),
  mcq(s(RA, "recall-which-type", "recall", 2, 20, "A function gets the right type but an unacceptable value, like a negative length. Which built-in exception fits best?"),
    "`ValueError`",
    [
      ["`TypeError`", "type-for-value", "`TypeError` is for the wrong *type*."],
      ["`KeyError`", "key-for-value", "`KeyError` is for missing mapping keys."],
      ["`SyntaxError`", "syntax-for-value", "That's for invalid code."],
    ]),
  mcq(s(RA, "eval-str-of-error", "apply", 3, 25, "What is `str(ValueError(\"bad input\"))`?"),
    "`'bad input'`",
    [
      ["`'ValueError: bad input'`", "str-includes-class", "`str()` gives just the message; the traceback adds the class name."],
      ["`\"ValueError('bad input')\"`", "str-is-repr", "That's `repr()`."],
      ["`''`", "str-empty", "The message is kept."],
    ]),
  mcq(s(RA, "eval-repr-of-error", "apply", 3, 25, "What is `repr(KeyError(\"k\"))`?"),
    "`\"KeyError('k')\"`",
    [
      ["`\"'k'\"`", "repr-is-str", "That's `str()` of a `KeyError`."],
      ["`'k'`", "repr-bare", "`repr` includes the class name."],
      ["`'KeyError'`", "repr-class-only", "The arguments are included too."],
    ]),
  mcq(s(RA, "eval-custom-isinstance", "apply", 4, 35, "After `class AppError(Exception): pass` and `class DbError(AppError): pass`, what is `isinstance(DbError(), Exception)`?"),
    "`True`",
    [
      ["`False`", "subclass-not-instance", "`DbError` inherits from `AppError`, which inherits from `Exception`."],
      ["`TypeError`", "isinstance-error", "`isinstance` works with any classes."],
      ["Only `True` if the instance is raised", "isinstance-raised", "Being raised doesn't affect its type."],
    ]),
  num(s(RA, "eval-args-len", "apply", 4, 30, "What is `len(OSError(2, \"No such file\").args)`?"), 2),
  num(s(RA, "eval-oserror-errno", "apply", 5, 40, "What is `OSError(2, \"No such file\").errno`?"), 2),
  mcq(s(RA, "eval-oserror-subclass", "apply", 5, 40, "What is `type(OSError(2, \"No such file\")).__name__`?"),
    "`'FileNotFoundError'`",
    [
      ["`'OSError'`", "oserror-stays-base", "`OSError` picks a subclass from the errno; $2$ is ENOENT."],
      ["`'IOError'`", "oserror-is-ioerror", "`IOError` is just an alias of `OSError`."],
      ["`'ValueError'`", "oserror-value", "It's an OS error subclass."],
    ]),
  short(s(RA, "explain-raise-vs-return", "explain", 6, 120, "Why is raising an exception usually better than returning `None` or `-1` to signal that a function failed?"),
    [
      ["unignorable", "An exception can't be silently ignored — it propagates until handled", 2, true],
      ["sentinel-collision", "Sentinels can collide with valid results (e.g. `-1` or `None` as real data) and push checks onto every caller", 1],
      ["info", "Exceptions carry a type and message describing what went wrong", 1],
    ]),
  mcq(s(RA, "transfer-from-none", "transfer", 7, 50, "What does `raise KeyError(k) from None` inside an `except` block change?"),
    "It suppresses the “During handling…” context in the traceback, showing only the new error",
    [
      ["It raises `None` instead of `KeyError`", "from-none-raises-none", "The `KeyError` is raised; only the chaining is hidden."],
      ["It catches the original exception again", "from-none-catches", "It affects only how chaining is displayed."],
      ["It's a syntax error", "from-none-invalid", "It's valid syntax."],
    ]),
  num(s(RA, "eval-cause-set", "transfer", 8, 60, "After `e = ValueError(\"new\")`, `e.__cause__ = KeyError(\"old\")`, what is `len(str(e.__cause__))`?"), 5),
  mcq(s(RA, "transfer-custom-init", "transfer", 8, 60, "`class HttpError(Exception):` with `def __init__(self, status): self.status = status`. What is `str(HttpError(404))`?"),
    "`'404'` — `BaseException.__new__` stores the constructor arguments in `args`, even though `__init__` never called `super().__init__`",
    [
      ["`''`", "custom-init-empty", "`args` is filled from the constructor call before `__init__` runs."],
      ["`'HttpError'`", "custom-init-classname", "`str()` of an exception is its message, not its class."],
      ["`AttributeError`", "custom-init-error", "Creating and printing it works."],
    ]),
  num(s(RA, "transfer-custom-attr", "transfer", 8, 60, "`class E(Exception):` / (indented) `def __init__(self, code):` / (indented twice) `super().__init__(f\"code {code:d}\"); self.code = code`. What is `E(7).code + len(str(E(7)))`?"), 13),
  mcq(s(RA, "transfer-not-implemented", "transfer", 8, 60, "A base class method that subclasses must override should do what?"),
    "`raise NotImplementedError`",
    [
      ["`return NotImplemented`", "return-notimplemented", "`NotImplemented` is a special value for binary operators, not an exception."],
      ["`pass`", "abstract-pass", "Silently returning `None` hides the missing override."],
      ["`raise TypeError`", "abstract-typeerror", "`NotImplementedError` states the intent precisely."],
    ]),
  short(s(RA, "transfer-library-hierarchy", "transfer", 9, 150, "You maintain a payments library. Describe an exception hierarchy that lets callers catch everything from your library, or just specific failures, and say what extra information the exceptions should carry."),
    [
      ["base", "One base class (e.g. `PaymentError(Exception)`) that every library exception inherits from", 2, true],
      ["specific", "Specific subclasses such as `CardDeclined`, `NetworkError`, `InvalidAmount`", 1, true],
      ["data", "Attributes like error codes, the offending value, or whether retrying is safe", 1],
    ]),
  mcq(s(RA, "transfer-assert-optimised", "transfer", 9, 75, "Why is `assert amount > 0, \"bad amount\"` the wrong way to validate user input in production code?"),
    "Assertions are removed when Python runs with `-O`, so the check silently disappears",
    [
      ["`assert` raises `ValueError`, which is too general", "assert-valueerror", "It raises `AssertionError` — and only when assertions are enabled."],
      ["`assert` can't have a message", "assert-no-message", "It can, as shown."],
      ["`assert` is slower than `if`", "assert-slow", "Speed isn't the issue."],
    ]),
  num(s(RA, "eval-exception-notes", "transfer", 10, 90, "Python $3.11$ added notes. After `e = ValueError(\"x\")`, `e.add_note(\"row 5\")`, `e.add_note(\"file a.csv\")`, what is `len(e.__notes__)`?"), 2),
  code(s(RA, "code-validate-age", "apply", 4, 75, "Write `check_age(age)` that returns `age` if it's an `int` from $0$ to $150$, raises `TypeError` if it isn't an `int` (booleans count as invalid), and raises `ValueError` if it's out of range."),
    "def check_age(age):\n    pass\n",
    "def check_age(age):\n    if not isinstance(age, int) or isinstance(age, bool):\n        raise TypeError(\"age must be an int\")\n    if not 0 <= age <= 150:\n        raise ValueError(\"age out of range\")\n    return age\n",
    [
      ["ok", "result = check_age(30)", "result == 30"],
      ["type", "try:\n    check_age(\"30\")\n    result = 'none'\nexcept TypeError:\n    result = 'TypeError'", "result == 'TypeError'"],
      ["range", "try:\n    check_age(200)\n    result = 'none'\nexcept ValueError:\n    result = 'ValueError'", "result == 'ValueError'"],
      ["bool", "try:\n    check_age(True)\n    result = 'none'\nexcept TypeError:\n    result = 'TypeError'", "result == 'TypeError'"],
    ]),
  code(s(RA, "code-insufficient-funds", "apply", 7, 120, "Define `InsufficientFunds(Exception)` storing `balance` and `amount` attributes with message `\"need X, have Y\"`, and a function `withdraw(balance, amount)` that returns the new balance or raises it."),
    "class InsufficientFunds(Exception):\n    pass\n\ndef withdraw(balance, amount):\n    pass\n",
    "class InsufficientFunds(Exception):\n    def __init__(self, balance, amount):\n        super().__init__(f\"need {amount}, have {balance}\")\n        self.balance = balance\n        self.amount = amount\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFunds(balance, amount)\n    return balance - amount\n",
    [
      ["ok", "result = withdraw(10, 3)", "result == 7"],
      ["raises", "try:\n    withdraw(5, 8)\n    result = None\nexcept InsufficientFunds as e:\n    result = (str(e), e.balance, e.amount)", "result == (\"need 8, have 5\", 5, 8)"],
    ]),
];

export const pythonSixtyStringsErrorsItems: Item[] = [...strings, ...stringMethods, ...fstrings, ...regex, ...exceptions, ...raising];
