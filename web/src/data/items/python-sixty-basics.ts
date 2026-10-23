import type { Item } from "../../lib/assessment/types";
import { code, mcq, num, s, short } from "./python-sixty-shared";

/**
 * Brings every Python lesson to 60 questions (see the other `python-sixty-*`
 * modules for the later chapters). The pools these join sat almost entirely
 * at levels 4–6, so the additions lean on the two empty ends of the scale:
 * one-step definitions at 1–3 and multi-idea or unfamiliar-setting questions
 * at 8–10.
 *
 * Slugs starting `eval-` are output-prediction items written to one
 * convention: every backtick span in the stem but the last is a statement,
 * the last is an expression, and the key (or the correct choice, as a
 * `repr`) is what CPython evaluates it to. They were all run, not read.
 */


// ---------------------------------------------------------------------------
// python-variables-types
// ---------------------------------------------------------------------------
const V = "python-variables-types";
const variables: Item[] = [
  mcq(s(V, "recall-assignment-direction", "recall", 1, 15, "In the statement `count = 7`, which side names the variable?"),
    "The left side, `count`",
    [
      ["The right side, `7`", "assign-direction-reversed", "Assignment binds the name on the left to the value on the right."],
      ["Both sides are variables", "assign-symmetric", "`=` is not an equation; only the left side is a name being bound."],
      ["Neither — `=` compares the two sides", "assign-is-compare", "Comparison is `==`; a single `=` assigns."],
    ]),
  mcq(s(V, "recall-four-basic-types", "recall", 1, 15, "Which built-in type would Python give the literal `\"7\"`?"),
    "`str`",
    [
      ["`int`", "quoted-number-is-int", "Quotes make a string literal, whatever characters are inside."],
      ["`float`", "quoted-number-is-float", "Quotes make a string literal; there is no decimal point either."],
      ["`char`", "char-type-exists", "Python has no separate character type — a single character is a `str` of length $1$."],
    ]),
  mcq(s(V, "recall-case-sensitive", "recall", 2, 20, "`Total = 1` and then `total = 2`. How many variables exist?"),
    "Two — names are case-sensitive, so `Total` and `total` are different",
    [
      ["One, now equal to `2`", "names-case-insensitive", "Python distinguishes upper and lower case in identifiers."],
      ["One, still equal to `1`", "first-binding-wins", "Rebinding is allowed, and anyway these are two different names."],
      ["None — it is a syntax error to reuse a name", "no-rebinding", "Names can be rebound freely; these are also distinct names."],
    ]),
  num(s(V, "eval-augmented-chain", "apply", 3, 30, "After `x = 4`, `x *= 3`, `x -= 2`, what is `x`?"), 10),
  num(s(V, "eval-int-float-sum-type", "apply", 3, 30, "After `a = 7`, `b = 2.0`, what is `a // b`?"), 3),
  mcq(s(V, "eval-type-of-division", "apply", 3, 25, "What is `type(8 / 4)`?"),
    "`<class 'float'>`",
    [
      ["`<class 'int'>`", "true-div-int-when-exact", "`/` always produces a `float`, even when the division is exact."],
      ["`<class 'number'>`", "number-type-exists", "There is no `number` class; it is `float`."],
      ["`<class 'fraction'>`", "div-gives-fraction", "Fractions come from the `fractions` module, not `/`."],
    ]),
  mcq(s(V, "eval-int-plus-bool", "apply", 4, 30, "What is `type(3 + True)`?"),
    "`<class 'int'>`",
    [
      ["`<class 'bool'>`", "bool-dominates", "`bool` is a subclass of `int`; arithmetic on them gives a plain `int`."],
      ["`TypeError`", "bool-not-numeric", "Booleans are integers with values $0$ and $1$, so addition works."],
      ["`<class 'float'>`", "mixed-gives-float", "Only mixing in a `float` gives a `float`."],
    ]),
  num(s(V, "eval-multiple-target-swap-three", "apply", 4, 40, "After `a, b, c = 5, 6, 7`, `a, b, c = b, c, a`, what is `c`?"), 5),
  mcq(s(V, "apply-id-after-rebind", "apply", 5, 45, "`x = [1]`, then `y = x`, then `x = x + [2]`. Which is true afterward?"),
    "`y` is still `[1]`, because `x + [2]` built a new list and rebound only `x`",
    [
      ["`y` is `[1, 2]`, because `y` and `x` share the list", "plus-mutates-in-place", "`+` builds a new list; `x` is rebound to it and `y` keeps the old one."],
      ["`x` is `[1]`, because lists are immutable", "lists-immutable", "Lists are mutable, but here nothing was mutated — `x` was rebound."],
      ["Both are `[1, 2]`", "rebind-propagates", "Rebinding a name never changes other names."],
    ]),
  mcq(s(V, "apply-plus-equals-list-alias", "apply", 6, 50, "`x = [1]`, then `y = x`, then `x += [2]`. What is `y`?"),
    "`[1, 2]` — for a list, `+=` extends the existing object in place",
    [
      ["`[1]` — `+=` always makes a new object", "augassign-always-rebinds", "For mutable types `+=` calls `__iadd__`, which mutates in place; `y` sees the change."],
      ["`[1, [2]]`", "iadd-appends-list", "`+=` with a list extends by its elements, like `.extend`."],
      ["`TypeError`", "iadd-list-error", "Lists support `+=`."],
    ]),
  short(s(V, "explain-dynamic-names", "explain", 6, 120, "`x = 5` and later `x = \"five\"` both run without error. Explain what this shows about where type information lives in Python."),
    [
      ["values-have-types", "Types belong to the objects/values, not to the names", 2, true],
      ["names-are-labels", "A name is just a reference that can be rebound to any object", 1],
      ["no-declaration", "There is no declared type to violate, so rebinding to a `str` is legal", 1],
    ]),
  short(s(V, "explain-mutable-default-trap", "explain", 8, 150, "`a = [[0] * 2] * 2` then `a[0][0] = 9` makes `a` equal `[[9, 0], [9, 0]]`. Explain why, in terms of names and objects."),
    [
      ["outer-star-copies-refs", "`* 2` on the outer list repeats references to the same inner list rather than copying it", 2, true],
      ["one-inner-object", "Both rows are the same object, so mutating it through either row shows in both", 1],
      ["fix", "Mentions a fix such as `[[0] * 2 for _ in range(2)]`", 1],
    ]),
  mcq(s(V, "transfer-is-vs-eq-none", "transfer", 7, 45, "Why does style guidance say to write `if x is None:` rather than `if x == None:`?"),
    "`None` is a single object, so identity is exact, while `==` can be overridden by a class to say anything",
    [
      ["`== None` raises a `TypeError`", "eq-none-error", "`x == None` is legal; it is just less reliable."],
      ["`is` is faster because it converts `x` to a `bool` first", "is-converts-bool", "`is` compares identities; it does not convert anything."],
      ["They are identical in every case", "is-eq-same", "A custom `__eq__` can make `x == None` true for a non-`None` object."],
    ]),
  mcq(s(V, "transfer-float-precision-big", "transfer", 8, 60, "What is `2**53 + 1 == float(2**53 + 1)`?"),
    "`False` — a `float` has a $53$-bit significand, so `2**53 + 1` rounds to `2**53`",
    [
      ["`True` — `float` stores any integer exactly", "float-exact-ints", "Floats are exact only up to $2^{53}$."],
      ["`OverflowError`", "float-overflow-small", "$2^{53}$ is far below the float range; the issue is precision, not range."],
      ["`True` — Python `int` and `float` share a representation", "int-float-same", "`int` is arbitrary precision; `float` is IEEE double."],
    ]),
  num(s(V, "eval-big-int-exact", "transfer", 8, 50, "Python integers have unlimited precision. What is `len(str(2 ** 100))`?"), 31),
  mcq(s(V, "transfer-tuple-of-list-mutation", "transfer", 9, 75, "`t = ([1], 2)`. What happens on `t[0].append(3)`?"),
    "It works: `t` becomes `([1, 3], 2)` — the tuple is immutable, but the list inside it is not",
    [
      ["`TypeError`, because tuples are immutable", "tuple-deep-immutable", "Immutability means the tuple's slots can't be rebound; the objects in them may still mutate."],
      ["It works, but `t` is unchanged because the tuple holds a copy", "tuple-copies-contents", "Tuples hold references, not copies."],
      ["`AttributeError`", "tuple-elem-no-methods", "`t[0]` is a list, which has `.append`."],
    ]),
  short(s(V, "transfer-small-int-cache", "transfer", 9, 150, "`a = 256; b = 256; a is b` is `True` in CPython, but `a = 257; b = 257` can give `False` in some contexts. Explain what is going on and what rule a programmer should follow."),
    [
      ["caching", "CPython caches small integers (about $-5$ to $256$) so they are shared objects", 2, true],
      ["implementation-detail", "This is an implementation detail, not a language guarantee", 1],
      ["rule", "Compare values with `==`; reserve `is` for identity checks such as `None`", 1, true],
    ]),
  mcq(s(V, "transfer-del-shared", "transfer", 10, 75, "`a = [1, 2]; b = a; del a`. What is `b`?"),
    "`[1, 2]` — `del` removes the name `a`, and the list survives because `b` still refers to it",
    [
      ["`NameError` — the list was deleted", "del-destroys-object", "`del` unbinds a name; an object is freed only when nothing refers to it."],
      ["`[]` — `del` empties the list", "del-clears", "Clearing is `a.clear()`; `del a` touches only the name."],
      ["`None`", "del-sets-none", "No name is set to `None`; `a` simply ceases to exist."],
    ]),
  code(s(V, "code-describe", "apply", 4, 90, "Write `describe(x)` that returns `\"<type name>:<value>\"`, e.g. `describe(3)` is `\"int:3\"` and `describe(\"a\")` is `\"str:a\"`."),
    "def describe(x):\n    pass\n",
    "def describe(x):\n    return f\"{type(x).__name__}:{x}\"\n",
    [
      ["int", "result = describe(3)", "result == \"int:3\""],
      ["str", "result = describe(\"a\")", "result == \"str:a\""],
      ["float", "result = describe(2.5)", "result == \"float:2.5\""],
      ["bool", "result = describe(True)", "result == \"bool:True\""],
    ]),
  code(s(V, "code-rotate-three", "apply", 5, 90, "Write `rotate(a, b, c)` returning a tuple with each value moved one place left: `rotate(1, 2, 3)` is `(2, 3, 1)`. Use tuple unpacking, not temporary variables."),
    "def rotate(a, b, c):\n    pass\n",
    "def rotate(a, b, c):\n    a, b, c = b, c, a\n    return (a, b, c)\n",
    [
      ["ints", "result = rotate(1, 2, 3)", "result == (2, 3, 1)"],
      ["strs", "result = rotate(\"x\", \"y\", \"z\")", "result == (\"y\", \"z\", \"x\")"],
      ["mixed", "result = rotate(0, None, 2.5)", "result == (None, 2.5, 0)"],
    ]),
];

// ---------------------------------------------------------------------------
// python-type-conversion
// ---------------------------------------------------------------------------
const TC = "python-type-conversion";
const typeConversion: Item[] = [
  mcq(s(TC, "recall-what-is-casting", "recall", 1, 15, "What does it mean to “convert” `\"5\"` with `int(\"5\")`?"),
    "Build a new `int` object from the text — the original string is unchanged",
    [
      ["Change the string's type in place", "convert-in-place", "Objects never change type; `int()` returns a new object."],
      ["Check whether the string is a number", "convert-is-check", "Checking would be something like `str.isdigit()`; `int()` produces a value or raises."],
      ["Round the string", "convert-rounds", "There is nothing to round; it parses digits."],
    ]),
  mcq(s(TC, "recall-float-from-string", "recall", 1, 15, "What is `float(\"2.5\")`?"),
    "`2.5`",
    [
      ["`\"2.5\"`", "float-returns-str", "`float()` returns a number, not text."],
      ["`2`", "float-truncates", "Truncation is what `int()` does to floats."],
      ["`ValueError`", "float-rejects-decimal", "`\"2.5\"` is valid float text."],
    ]),
  mcq(s(TC, "recall-input-returns-str", "recall", 2, 20, "What type does `input()` always return?"),
    "`str`",
    [
      ["Whatever type the user typed", "input-infers-type", "`input()` never parses; it returns the raw text."],
      ["`int` if the user typed digits", "input-digits-int", "Digits still come back as a string; convert with `int()`."],
      ["`bytes`", "input-bytes", "Python $3$'s `input()` returns `str`."],
    ]),
  num(s(TC, "eval-int-base-two", "apply", 3, 30, "`int()` takes an optional base. What is `int(\"101\", 2)`?"), 5),
  num(s(TC, "eval-int-hex", "apply", 4, 30, "What is `int(\"ff\", 16)`?"), 255),
  mcq(s(TC, "eval-str-of-float", "apply", 3, 25, "What is `str(1/4)`?"),
    "`'0.25'`",
    [
      ["`'1/4'`", "str-keeps-expression", "The expression is evaluated first; `str` sees only `0.25`."],
      ["`'0'`", "str-int-div", "`/` is true division, giving `0.25`."],
      ["`0.25`", "str-noop", "`str` returns text, shown in quotes."],
    ]),
  mcq(s(TC, "eval-bool-of-zero-float", "apply", 3, 25, "What is `bool(0.0)`?"),
    "`False`",
    [
      ["`True`", "nonempty-float-true", "Any numeric zero, including `0.0`, is falsy."],
      ["`ValueError`", "bool-float-error", "`bool()` accepts any object."],
      ["`0`", "bool-returns-int", "`bool()` returns `True` or `False`."],
    ]),
  num(s(TC, "eval-round-ndigits", "apply", 4, 30, "What is `round(3.14159, 2)`?"), 3.14),
  mcq(s(TC, "eval-tuple-from-string", "apply", 4, 30, "What is `tuple(\"hi\")`?"),
    "`('h', 'i')`",
    [
      ["`('hi',)`", "tuple-wraps-string", "`tuple()` iterates its argument, one element per character."],
      ["`TypeError`", "tuple-rejects-str", "Strings are iterable, so `tuple()` accepts them."],
      ["`['h', 'i']`", "tuple-gives-list", "`tuple()` returns a tuple."],
    ]),
  mcq(s(TC, "eval-int-of-float-string-sci", "apply", 5, 40, "What is `int(float(\"1e3\"))`?"),
    "`1000`",
    [
      ["`ValueError`", "float-rejects-sci", "`float()` accepts scientific notation."],
      ["`1`", "sci-truncates-at-e", "`1e3` means $1 \\times 10^{3}$."],
      ["`1000.0`", "int-keeps-float", "`int()` returns an integer."],
    ]),
  short(s(TC, "explain-implicit-vs-explicit", "explain", 6, 120, "`3 + 2.5` works without any conversion call, but `3 + \"2\"` does not. Explain which conversions Python does implicitly and why it refuses the second."),
    [
      ["numeric-widening", "Python implicitly widens within the numeric tower (`bool` → `int` → `float` → `complex`)", 2, true],
      ["no-str-coercion", "It never implicitly converts between strings and numbers; that would be ambiguous (add or concatenate?)", 2, true],
      ["strong-typing", "Connects this to strong typing / explicit conversion via `int()` or `str()`", 1],
    ]),
  mcq(s(TC, "apply-sum-of-strings", "apply", 6, 45, "`nums = [\"3\", \"4\"]`. Which expression gives the number `7`?"),
    "`sum(int(n) for n in nums)`",
    [
      ["`sum(nums)`", "sum-strings", "`sum` starts from $0$ and adds `0 + \"3\"`, a `TypeError`."],
      ["`int(nums)`", "int-of-list", "`int()` can't convert a list."],
      ["`int(\"\".join(nums))`", "join-then-int", "That gives $34$, not $7$."],
    ]),
  mcq(s(TC, "transfer-float-string-round-trip", "transfer", 7, 50, "What is `float(str(0.1 + 0.2)) == 0.1 + 0.2`?"),
    "`True` — `repr` of a float is the shortest string that round-trips to the same value",
    [
      ["`False`, because `str` rounds to `0.3`", "str-rounds-float", "`str(0.1 + 0.2)` is `'0.30000000000000004'`, which converts back exactly."],
      ["`ValueError`", "float-str-too-long", "That string is valid float text."],
      ["`False`, because floats never compare equal", "floats-never-equal", "Identical floats compare equal; the problem is only with values that differ slightly."],
    ]),
  mcq(s(TC, "transfer-bool-of-string-false", "transfer", 7, 45, "A config file stores `\"False\"`. Why is `bool(\"False\")` a bug waiting to happen?"),
    "It is `True` — any non-empty string is truthy, regardless of its text",
    [
      ["It raises `ValueError`", "bool-parses-text", "`bool()` never parses; it only checks emptiness for strings."],
      ["It is `False`, which is fine", "bool-reads-word", "`bool` doesn't read the word; the string is non-empty, so it's `True`."],
      ["It returns `None` for unknown text", "bool-returns-none", "`bool()` always returns `True` or `False`."],
    ]),
  num(s(TC, "eval-int-of-negative-string-float", "transfer", 8, 60, "What is `int(-0.5) + round(-0.5) + round(1.5)`?"), 2),
  mcq(s(TC, "transfer-chr-ord", "transfer", 8, 45, "`ord` converts a character to its code point and `chr` goes back. What is `chr(ord(\"a\") + 2)`?"),
    "`'c'`",
    [
      ["`'a2'`", "chr-concats", "`ord(\"a\") + 2` is integer arithmetic ($97 + 2 = 99$)."],
      ["`99`", "chr-returns-int", "`chr` returns a one-character string."],
      ["`TypeError`", "ord-plus-int-error", "`ord` returns an `int`, so `+ 2` is fine."],
    ]),
  short(s(TC, "transfer-parse-safely", "transfer", 9, 150, "A function receives user text that should be a whole number between $1$ and $10$. Describe a robust conversion strategy, naming the error you must handle and two kinds of bad input it should reject."),
    [
      ["try-int", "Use `int(text.strip())` inside `try`/`except ValueError`", 2, true],
      ["range-check", "Check the converted value is in range after conversion", 1, true],
      ["bad-inputs", "Names at least two bad inputs, e.g. `\"abc\"`, `\"3.5\"`, `\"\"`, `\"11\"`", 1],
    ]),
  mcq(s(TC, "transfer-decimal-vs-float", "transfer", 10, 75, "Why is `Decimal(\"0.1\")` exact but `Decimal(0.1)` is `Decimal('0.1000000000000000055511151231257827...')`?"),
    "`0.1` is already a binary float before `Decimal` sees it; the string is parsed directly in base ten",
    [
      ["`Decimal` has a bug with floats", "decimal-bug", "It faithfully converts the float's true binary value."],
      ["The string version is rounded for display", "decimal-str-rounded", "`Decimal(\"0.1\")` is exactly one tenth, not a rounded display."],
      ["They are equal; only `repr` differs", "decimal-equal", "`Decimal(\"0.1\") == Decimal(0.1)` is `False`."],
    ]),
  code(s(TC, "code-parse-bool", "apply", 5, 90, "Write `parse_bool(text)` that returns `True` for `\"true\"`, `\"yes\"` or `\"1\"` and `False` for `\"false\"`, `\"no\"` or `\"0\"`, ignoring case and surrounding spaces. Raise `ValueError` for anything else."),
    "def parse_bool(text):\n    pass\n",
    "def parse_bool(text):\n    t = text.strip().lower()\n    if t in (\"true\", \"yes\", \"1\"):\n        return True\n    if t in (\"false\", \"no\", \"0\"):\n        return False\n    raise ValueError(text)\n",
    [
      ["true", "result = parse_bool(\" TRUE \")", "result is True"],
      ["no", "result = parse_bool(\"no\")", "result is False"],
      ["zero", "result = parse_bool(\"0\")", "result is False"],
      ["bad", "try:\n    parse_bool(\"maybe\")\n    result = 'no error'\nexcept ValueError:\n    result = 'ValueError'", "result == 'ValueError'"],
    ]),
  code(s(TC, "code-cents", "apply", 6, 90, "Write `to_cents(text)` that turns a price string like `\"12.34\"` or `\"$5\"` into whole cents as an `int` (`1234`, `500`). Avoid float rounding errors."),
    "def to_cents(text):\n    pass\n",
    "def to_cents(text):\n    t = text.strip().lstrip(\"$\")\n    if \".\" in t:\n        whole, frac = t.split(\".\")\n        frac = (frac + \"00\")[:2]\n    else:\n        whole, frac = t, \"00\"\n    return int(whole or \"0\") * 100 + int(frac)\n",
    [
      ["decimal", "result = to_cents(\"12.34\")", "result == 1234"],
      ["dollar", "result = to_cents(\"$5\")", "result == 500"],
      ["one-place", "result = to_cents(\"0.5\")", "result == 50"],
      ["float-trap", "result = to_cents(\"4.35\")", "result == 435"],
    ]),
];

// ---------------------------------------------------------------------------
// python-operators
// ---------------------------------------------------------------------------
const OP = "python-operators";
const operators: Item[] = [
  mcq(s(OP, "recall-true-division", "recall", 1, 15, "Which operator divides and always returns a `float`?"),
    "`/`",
    [
      ["`//`", "floordiv-is-true-div", "`//` is floor division."],
      ["`%`", "mod-is-division", "`%` gives the remainder."],
      ["`\\\\`", "backslash-division", "Backslash is not an arithmetic operator in Python."],
    ]),
  mcq(s(OP, "recall-modulo-meaning", "recall", 1, 15, "What does `a % b` compute?"),
    "The remainder after dividing `a` by `b`",
    [
      ["`a` as a percentage of `b`", "mod-is-percent", "`%` is the modulo operator, not percent."],
      ["The quotient rounded down", "mod-is-floordiv", "That is `//`."],
      ["`a` divided by `100`", "mod-divides-hundred", "`%` has nothing to do with $100$."],
    ]),
  num(s(OP, "eval-mod-even-check", "apply", 2, 20, "What is `14 % 2`?"), 0),
  num(s(OP, "eval-power-right-assoc", "apply", 4, 40, "Exponentiation groups right to left. What is `2 ** 3 ** 2`?"), 512),
  num(s(OP, "eval-neg-power", "apply", 5, 40, "Unary minus binds more loosely than exponentiation. What is `-2 ** 2`?"), -4),
  num(s(OP, "eval-negative-mod", "apply", 5, 40, "What is `-13 % 4`?"), 3),
  mcq(s(OP, "eval-or-returns-operand", "apply", 4, 30, "What is `[] or [0]`?"),
    "`[0]`",
    [
      ["`True`", "or-returns-bool", "`or` returns one of its operands, not a `bool`."],
      ["`[]`", "or-returns-first", "`or` returns the first *truthy* operand; `[]` is falsy."],
      ["`False`", "or-false", "`[0]` is a non-empty list and so truthy."],
    ]),
  mcq(s(OP, "eval-and-chain", "apply", 5, 35, "What is `1 and \"\" and 3`?"),
    "`''`",
    [
      ["`3`", "and-returns-last", "`and` stops at the first falsy operand, the empty string."],
      ["`False`", "and-returns-bool", "`and` returns an operand, not a `bool`."],
      ["`1`", "and-returns-first", "`1` is truthy, so evaluation continues."],
    ]),
  mcq(s(OP, "apply-not-precedence", "apply", 5, 35, "What is `not 1 == 2`?"),
    "`True` — `==` binds tighter than `not`, so this is `not (1 == 2)`",
    [
      ["`False` — it is `(not 1) == 2`", "not-binds-tight", "`not` has lower precedence than comparisons."],
      ["`SyntaxError`", "not-syntax", "This is valid syntax."],
      ["`2`", "not-arith", "`not` returns a `bool`."],
    ]),
  mcq(s(OP, "eval-in-string", "apply", 3, 25, "What is `\"ell\" in \"hello\"`?"),
    "`True`",
    [
      ["`False` — `in` checks single characters only", "in-single-char", "For strings, `in` tests for a substring."],
      ["`1`", "in-returns-index", "`in` returns a `bool`; `.find` returns a position."],
      ["`TypeError`", "in-str-error", "Strings support `in`."],
    ]),
  num(s(OP, "eval-divmod", "apply", 4, 30, "The built-in divmod returns the floor quotient and remainder as a pair. What is `sum(divmod(29, 6))`?"), 9),
  short(s(OP, "explain-floor-mod-identity", "explain", 7, 120, "For integers, Python guarantees `(a // b) * b + a % b == a`. Use this to explain why `-7 % 3` is `2`, not `-1`."),
    [
      ["floor", "`-7 // 3` is `-3` because `//` floors toward negative infinity", 2, true],
      ["solve", "Then `-7 % 3 = -7 - (-3)(3) = 2`", 2, true],
      ["sign-of-divisor", "Notes the remainder takes the sign of the divisor", 1],
    ]),
  mcq(s(OP, "transfer-chained-not-transitive", "transfer", 7, 50, "What is `1 < 3 > 2`?"),
    "`True` — it means `1 < 3 and 3 > 2`",
    [
      ["`False` — it means `(1 < 3) > 2`", "chain-left-to-right", "Chained comparisons are joined with `and`, not evaluated left to right."],
      ["`SyntaxError`", "chain-mixed-invalid", "Mixing `<` and `>` in a chain is legal."],
      ["`True` — but only because `True > 2`", "bool-compare", "`True > 2` would be `False`; the chain is not grouped that way."],
    ]),
  mcq(s(OP, "transfer-eq-chain-trap", "transfer", 8, 60, "What is `(1 == 1) in [1]`, and why?"),
    "`True` — `1 == 1` is `True`, which equals `1`",
    [
      ["`False` — `True` is not in `[1]`", "true-not-one", "`True == 1`, so membership succeeds."],
      ["`TypeError`", "in-bool-error", "`in` accepts any value on the left."],
      ["`1`", "in-returns-elem", "`in` returns a `bool`."],
    ]),
  mcq(s(OP, "transfer-chain-in-gotcha", "transfer", 9, 75, "What is `1 == 1 in [1]` (no parentheses)?"),
    "`True` — `in` and `==` are both comparisons, so it chains as `1 == 1 and 1 in [1]`",
    [
      ["`False`", "chain-in-false", "Both links of the chain, `1 == 1` and `1 in [1]`, are true."],
      ["`TypeError`", "chain-in-error", "This is valid syntax."],
      ["It is `(1 == 1) in [1]`", "chain-groups-left", "Comparisons never group left; they chain with `and`."],
    ]),
  num(s(OP, "eval-bitwise-and", "transfer", 8, 60, "The ampersand operator is bitwise AND on integers. What is `12 & 10`?"), 8),
  mcq(s(OP, "transfer-bitwise-vs-logical", "transfer", 9, 75, "A pandas filter is written `df[df.a > 0 and df.b > 0]` and raises `ValueError: The truth value of a Series is ambiguous`. What is the fix and why?"),
    "Use `(df.a > 0) & (df.b > 0)` — `and` needs one `bool`, while `&` combines element by element",
    [
      ["Use `df.a > 0 and df.b > 0 == True`", "and-with-true", "Any use of `and` still asks the Series for a single truth value."],
      ["Use `df.a and df.b > 0`", "and-reorder", "Reordering doesn't remove `and`'s need for a single `bool`."],
      ["Wrap it in `bool(...)`", "bool-wrap", "`bool()` of a multi-element Series raises the same error."],
    ]),
  mcq(s(OP, "transfer-float-floordiv", "transfer", 10, 75, "What is `0.3 // 0.1`?"),
    "`2.0` — `0.1` is stored slightly above one tenth and `0.3` slightly below three tenths",
    [
      ["`3.0`", "floordiv-exact-decimal", "Binary floats can't represent these values exactly; the quotient is just under $3$."],
      ["`3`", "floordiv-int", "With float operands `//` returns a `float`, and here it floors to $2$."],
      ["`ZeroDivisionError`", "floordiv-zero", "`0.1` is not zero."],
    ]),
  code(s(OP, "code-is-leap", "apply", 5, 90, "Write `is_leap(year)`: a year is a leap year if divisible by $4$, except century years, which must be divisible by $400$. Use `%` and boolean operators in one expression."),
    "def is_leap(year):\n    pass\n",
    "def is_leap(year):\n    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)\n",
    [
      ["2024", "result = is_leap(2024)", "result is True"],
      ["1900", "result = is_leap(1900)", "result is False"],
      ["2000", "result = is_leap(2000)", "result is True"],
      ["2023", "result = is_leap(2023)", "result is False"],
    ]),
  code(s(OP, "code-split-minutes", "apply", 4, 75, "Write `hm(minutes)` returning a tuple `(hours, minutes)` for a whole number of minutes, using `//` and `%`. `hm(135)` is `(2, 15)`."),
    "def hm(minutes):\n    pass\n",
    "def hm(minutes):\n    return (minutes // 60, minutes % 60)\n",
    [
      ["135", "result = hm(135)", "result == (2, 15)"],
      ["59", "result = hm(59)", "result == (0, 59)"],
      ["120", "result = hm(120)", "result == (2, 0)"],
    ]),
];

// ---------------------------------------------------------------------------
// python-conditionals
// ---------------------------------------------------------------------------
const CO = "python-conditionals";
const conditionals: Item[] = [
  mcq(s(CO, "recall-colon", "recall", 1, 15, "What punctuation must end the line `if x > 0`?"),
    "A colon, `:`",
    [
      ["A semicolon, `;`", "if-semicolon", "Python block headers end with `:`."],
      ["Nothing", "if-no-colon", "Omitting the colon is a `SyntaxError`."],
      ["An opening brace, `{`", "if-brace", "Python uses indentation, not braces."],
    ]),
  mcq(s(CO, "recall-elif-order", "recall", 2, 20, "In an `if`/`elif`/`else` chain, in what order are conditions checked?"),
    "Top to bottom, stopping at the first true one",
    [
      ["All of them, then the last true one runs", "elif-last-wins", "Only the first true branch runs; later ones aren't checked."],
      ["In random order", "elif-random", "The order is always top to bottom."],
      ["`else` first, then the others", "else-first", "`else` runs only if every condition above it was false."],
    ]),
  mcq(s(CO, "eval-ternary-nested", "apply", 4, 35, "After `x = 0`, what is `\"pos\" if x > 0 else \"neg\" if x < 0 else \"zero\"`?"),
    "`'zero'`",
    [
      ["`'neg'`", "ternary-nest-misread", "Neither `x > 0` nor `x < 0` holds, so the final `else` is chosen."],
      ["`'pos'`", "ternary-first", "`x > 0` is false."],
      ["`SyntaxError`", "ternary-no-nest", "Conditional expressions can be nested."],
    ]),
  mcq(s(CO, "apply-ternary-in-expr", "apply", 5, 40, "After `n = 4`, what is `n * 2 if n > 3 else 0 + 1`?"),
    "`8` — the conditional expression has the lowest precedence, so it is `(n * 2) if n > 3 else (0 + 1)`",
    [
      ["`9`", "ternary-binds-tight", "`+ 1` belongs only to the `else` branch."],
      ["`1`", "ternary-cond-false", "`n > 3` is true."],
      ["`SyntaxError`", "ternary-arith", "Arithmetic inside a conditional expression is fine."],
    ]),
  num(s(CO, "eval-bool-sum-conditions", "apply", 4, 35, "After `x = 7`, what is `(x > 5) + (x % 2 == 0) + (x < 10)`?"), 2),
  mcq(s(CO, "apply-unreachable-branch", "apply", 5, 45, "`if x > 10: ...` `elif x > 20: ...` Which inputs reach the `elif` body?"),
    "None — any `x > 20` is also `> 10` and is caught by the first branch",
    [
      ["Every `x > 20`", "elif-independent", "Branches are tried in order; the `if` grabs those first."],
      ["Every `x` between $10$ and $20$", "elif-range", "Those fail `x > 20`."],
      ["Every `x <= 10`", "elif-else", "Those fail `x > 20` too."],
    ]),
  mcq(s(CO, "apply-match-wildcard", "apply", 6, 45, "In a `match` statement, what does `case _:` do?"),
    "Matches anything, acting as the default branch",
    [
      ["Matches only `None`", "underscore-none", "`_` is a wildcard pattern."],
      ["Binds the subject to a variable named `_`", "underscore-binds", "The wildcard `_` never binds."],
      ["Matches nothing; it is a placeholder", "underscore-placeholder", "It matches every value."],
    ]),
  mcq(s(CO, "apply-match-literal", "apply", 6, 50, "`match 3:` with `case 1 | 2: r = \"low\"`, `case 3 | 4: r = \"mid\"`, `case _: r = \"high\"`. What is `r`?"),
    "`'mid'`",
    [
      ["`'low'`", "or-pattern-misread", "`3` matches the `3 | 4` alternative."],
      ["`'high'`", "match-falls-through", "The first matching case wins; `3 | 4` matches."],
      ["`SyntaxError`", "or-pattern-invalid", "`|` combines alternatives in a pattern."],
    ]),
  short(s(CO, "explain-flatten-nesting", "explain", 6, 120, "Rewrite this nested logic as one flat chain and explain why it is equivalent: `if a:` → (`if b: f()` else `g()`) else `h()`."),
    [
      ["flat", "`if a and b: f()` / `elif a: g()` / `else: h()`", 2, true],
      ["reason", "Explains that the `elif a` branch is reached only when `a and b` failed, i.e. `a` and not `b`", 2, true],
    ]),
  short(s(CO, "explain-short-circuit-guard", "explain", 7, 120, "Why is `if items and items[0] == target:` safe for an empty list, while `if items[0] == target and items:` is not?"),
    [
      ["short-circuit", "`and` stops evaluating when the left side is false", 2, true],
      ["order", "With `items` first, the index is never attempted on an empty list; reversed, `items[0]` raises `IndexError` first", 2, true],
    ]),
  mcq(s(CO, "transfer-truthy-numpy", "transfer", 8, 60, "Why does `if np.array([1, 2]):` raise `ValueError`?"),
    "An array of more than one element has no single truth value; use `.any()` or `.all()` to say which you mean",
    [
      ["Arrays are always falsy", "array-falsy", "It raises rather than returning either answer."],
      ["`if` needs a `bool` and arrays can't convert to anything", "array-no-bool", "A one-element array does convert; the issue is ambiguity with several."],
      ["NumPy disallows arrays in `if` statements entirely", "numpy-if-banned", "Size-one arrays work; multi-element ones are ambiguous."],
    ]),
  mcq(s(CO, "transfer-walrus", "transfer", 8, 60, "What does `if (n := len(data)) > 10: print(n)` do?"),
    "Assigns `len(data)` to `n` inside the condition, then uses it in the body",
    [
      ["Compares `n` with `len(data)`", "walrus-compare", "`:=` assigns; it does not compare."],
      ["`SyntaxError`", "walrus-invalid", "The assignment expression is valid from Python $3.8$."],
      ["Creates `n` only if the condition is true", "walrus-conditional-bind", "The assignment happens whenever the condition is evaluated."],
    ]),
  mcq(s(CO, "transfer-match-capture", "transfer", 9, 75, "`color = \"red\"`, then `match \"blue\":` with `case color: r = 1`. What happens?"),
    "The case matches and rebinds `color` to `\"blue\"` — a bare name is a capture pattern, not a comparison",
    [
      ["It doesn't match, because `\"blue\" != \"red\"`", "capture-compares", "Bare names capture; compare against a constant with a dotted name like `Colors.RED`."],
      ["`NameError`", "capture-undefined", "Capture patterns bind; they don't read the variable."],
      ["It matches but leaves `color` as `\"red\"`", "capture-no-bind", "The capture binds the subject to the name."],
    ]),
  mcq(s(CO, "transfer-match-sequence", "transfer", 9, 75, "`match [1, 2, 3]:` with `case [first, *rest]: r = rest`. What is `r`?"),
    "`[2, 3]`",
    [
      ["`(2, 3)`", "star-rest-tuple", "A starred capture in a sequence pattern collects a list."],
      ["`3`", "star-rest-last", "`*rest` collects everything after `first`."],
      ["No match — the lengths differ", "seq-pattern-exact-length", "The starred name absorbs any number of items."],
    ]),
  short(s(CO, "transfer-dispatch-dict", "transfer", 8, 150, "A long `if`/`elif` chain maps command strings to functions (`\"add\"` → `add()`, `\"del\"` → `delete()`, …). Explain how a dictionary can replace it and what the replacement does for an unknown command."),
    [
      ["dict-map", "Map each string to the function object, e.g. `{\"add\": add, \"del\": delete}`", 2, true],
      ["lookup-call", "Look up and call: `handlers[cmd]()`", 1],
      ["default", "Handles unknown commands with `.get(cmd, default)` or a `KeyError` check", 1, true],
    ]),
  mcq(s(CO, "transfer-float-equality-branch", "transfer", 10, 90, "`x = 0.1 * 3` and the code tests `if x == 0.3: ...` `elif x > 0.3: ...` `else: ...`. Which branch runs?"),
    "The `elif` — `0.1 * 3` is `0.30000000000000004`, slightly above `0.3`",
    [
      ["The `if`", "float-mult-exact", "Floating-point multiplication isn't exact here."],
      ["The `else`", "float-below", "The rounding error is upward in this case."],
      ["None of them", "float-no-branch", "Exactly one branch of an `if`/`elif`/`else` always runs."],
    ]),
  mcq(s(CO, "recall-indentation-error", "recall", 2, 20, "An `if` body is indented with $4$ spaces on one line and $2$ on the next. What happens?"),
    "An `IndentationError` — every line of a block must use the same indentation",
    [
      ["Python averages the indentation", "indent-average", "Indentation is exact; inconsistency is an error."],
      ["The $2$-space line runs after the `if`", "indent-dedent-ok", "A dedent must return to an enclosing level; $2$ spaces matches none."],
      ["It runs normally", "indent-ignored", "Indentation is syntax in Python."],
    ]),
  code(s(CO, "code-triangle-kind", "apply", 5, 90, "Write `triangle(a, b, c)` returning `\"invalid\"` if the sides can't form a triangle (some side ≥ the sum of the other two), else `\"equilateral\"`, `\"isosceles\"` or `\"scalene\"`."),
    "def triangle(a, b, c):\n    pass\n",
    "def triangle(a, b, c):\n    if a >= b + c or b >= a + c or c >= a + b:\n        return \"invalid\"\n    if a == b == c:\n        return \"equilateral\"\n    if a == b or b == c or a == c:\n        return \"isosceles\"\n    return \"scalene\"\n",
    [
      ["equi", "result = triangle(2, 2, 2)", "result == \"equilateral\""],
      ["iso", "result = triangle(3, 3, 5)", "result == \"isosceles\""],
      ["scalene", "result = triangle(3, 4, 5)", "result == \"scalene\""],
      ["invalid", "result = triangle(1, 2, 3)", "result == \"invalid\""],
    ]),
  code(s(CO, "code-shipping", "apply", 6, 90, "Write `shipping(total, member)`: members always ship free; others ship free on orders of $50$ or more, pay $5$ for orders of at least $20$, and pay $8$ otherwise."),
    "def shipping(total, member):\n    pass\n",
    "def shipping(total, member):\n    if member or total >= 50:\n        return 0\n    elif total >= 20:\n        return 5\n    return 8\n",
    [
      ["member", "result = shipping(5, True)", "result == 0"],
      ["big", "result = shipping(50, False)", "result == 0"],
      ["mid", "result = shipping(20, False)", "result == 5"],
      ["small", "result = shipping(19.99, False)", "result == 8"],
    ]),
];

export const pythonSixtyBasicsItems: Item[] = [...variables, ...typeConversion, ...operators, ...conditionals];
