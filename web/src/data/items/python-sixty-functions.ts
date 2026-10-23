import type { Item } from "../../lib/assessment/types";
import { code, mcq, num, s, short } from "./python-sixty-shared";

/**
 * The Functions chapter (arguments through sort keys) brought to 60
 * questions each. These six pools sat entirely at levels 4–7, so the
 * additions are mostly at 1–3 and 8–10. Conventions are those of
 * python-sixty-basics.ts.
 */

// ---------------------------------------------------------------------------
// python-arguments
// ---------------------------------------------------------------------------
const A = "python-arguments";
const args: Item[] = [
  mcq(s(A, "recall-positional", "recall", 1, 15, "In the call `area(3, 4)`, how are `3` and `4` matched to parameters?"),
    "By position: the first argument to the first parameter, the second to the second",
    [
      ["By name", "positional-by-name", "Only `name=value` arguments match by name."],
      ["By size, largest first", "positional-by-size", "Order in the call is all that matters."],
      ["At random", "positional-random", "Matching is deterministic."],
    ]),
  mcq(s(A, "recall-keyword-argument", "recall", 1, 15, "What is a keyword argument?"),
    "An argument passed as `name=value`, matched to the parameter with that name",
    [
      ["An argument that is a Python keyword like `if`", "keyword-is-reserved", "It's named by the parameter, not a reserved word."],
      ["The first argument of any call", "keyword-first", "Position doesn't make an argument a keyword argument."],
      ["An argument with a default value", "keyword-is-default", "Defaults belong to parameters in the definition."],
    ]),
  mcq(s(A, "recall-default-makes-optional", "recall", 1, 15, "`def greet(name, greeting=\"Hi\")`. Which parameter can be left out of a call?"),
    "`greeting`, because it has a default value",
    [
      ["`name`", "first-param-optional", "`name` has no default, so it's required."],
      ["Both", "all-optional", "Only parameters with defaults are optional."],
      ["Neither", "none-optional", "A default makes its parameter optional."],
    ]),
  mcq(s(A, "recall-default-order", "recall", 2, 20, "Why is `def f(a=1, b):` a `SyntaxError`?"),
    "A parameter without a default can't follow one with a default",
    [
      ["Defaults must be strings", "defaults-strings", "Defaults can be any value."],
      ["`a` is a reserved name", "a-reserved", "`a` is an ordinary name."],
      ["Functions can have at most one parameter", "one-param", "Any number is allowed."],
    ]),
  num(s(A, "eval-mixed-call", "apply", 3, 30, "After `def f(a, b=2, c=3): return a * 100 + b * 10 + c`, what is `f(1, c=9)`?"), 129),
  num(s(A, "eval-keyword-reorder", "apply", 3, 30, "After `def f(x, y): return x - y`, what is `f(y=1, x=10)`?"), 9),
  mcq(s(A, "eval-duplicate-arg", "apply", 3, 30, "After `def f(a, b): return a + b`, what does `f(1, a=2)` do?"),
    "`TypeError`",
    [
      ["Returns `3`", "dup-arg-ok", "`a` is already filled by position, so passing it again by name is an error."],
      ["Returns `4`", "keyword-overrides", "Keywords don't override positional arguments."],
      ["`SyntaxError`", "dup-arg-syntax", "It parses fine and fails when called."],
    ]),
  num(s(A, "eval-mutable-default-twice", "apply", 5, 45, "After `def add(x, acc=[]): acc.append(x); return len(acc)` and calls `add(1)`, `add(2)`, what is `add(3)`?"), 3),
  short(s(A, "explain-none-sentinel", "explain", 6, 120, "Rewrite `def add(x, acc=[])` so each call without `acc` gets a fresh list, and explain why `None` is the conventional default."),
    [
      ["rewrite", "`def add(x, acc=None):` then `if acc is None: acc = []`", 2, true],
      ["why", "`None` is immutable, and the new list is created at call time, not once at definition time", 2, true],
    ]),
  mcq(s(A, "transfer-kwonly-error", "transfer", 8, 60, "`def f(a, *, b): ...`. What does `f(1, 2)` do?"),
    "Raises `TypeError` — `b` is keyword-only, so the extra positional argument has nowhere to go",
    [
      ["Binds `b = 2`", "kwonly-positional", "Parameters after `*` can only be passed by name."],
      ["Ignores the `2`", "extra-positional-ignored", "Extra arguments always raise."],
      ["Binds `b` to `(2,)`", "kwonly-collects", "A bare `*` collects nothing."],
    ]),
  mcq(s(A, "transfer-posonly-name-free", "transfer", 8, 60, "`def f(x, /, **kw): return kw`. What is `f(1, x=2)`?"),
    "`{'x': 2}` — `x` is positional-only, so the name `x` is free to appear in `**kw`",
    [
      ["`TypeError` — `x` given twice", "posonly-conflict", "Positional-only parameters can't be matched by name, so `x=2` goes to `kw`."],
      ["`{}`", "kw-empty", "`x=2` doesn't match a parameter, so it lands in `kw`."],
      ["`{'x': 1}`", "kw-gets-positional", "The positional `1` binds the parameter `x`."],
    ]),
  num(s(A, "eval-default-shared-dict", "transfer", 9, 75, "After `def f(k, d={}): d[k] = len(d); return d` and `f(\"a\")`, `f(\"b\")`, what is `f(\"c\")[\"c\"]`?"), 2),
  mcq(s(A, "transfer-default-late-binding", "transfer", 9, 75, "`n = 1`, `def f(x=n): return x`, then `n = 2`. What is `f()`?"),
    "`1` — the default was evaluated when `def` ran",
    [
      ["`2`", "default-reads-current", "Defaults are fixed at definition time, unlike a name read in the body."],
      ["`NameError`", "default-name-error", "`n` existed when `def` ran."],
      ["`None`", "default-none", "The default is `1`."],
    ]),
  short(s(A, "transfer-signature-evolution", "transfer", 9, 150, "`def fetch(url, timeout)` is used everywhere as `fetch(u, 5)`. You need to add `retries`. Explain where to put it, and how to prevent future callers passing it by position."),
    [
      ["append-default", "Add it after the existing parameters with a default, so old calls still work", 2, true],
      ["kwonly", "Put it after a bare `*` (`def fetch(url, timeout, *, retries=3)`) so it must be named", 2, true],
    ]),
  mcq(s(A, "transfer-defaults-attribute", "transfer", 10, 90, "Where can you inspect a function's stored default values at run time?"),
    "`f.__defaults__` (and `f.__kwdefaults__` for keyword-only parameters)",
    [
      ["`f.defaults()`", "defaults-method", "There's no such method; defaults are attributes."],
      ["They aren't stored — they're recomputed each call", "defaults-recomputed", "They're stored once on the function object, which is why mutable defaults persist."],
      ["`globals()[\"defaults\"]`", "defaults-global", "Defaults live on the function object, not in globals."],
    ]),
  num(s(A, "eval-kwdefaults", "transfer", 10, 75, "After `def f(a, b=2, *, c=3): pass`, what is `len(f.__defaults__) + len(f.__kwdefaults__)`?"), 2),
  num(s(A, "eval-arg-evaluated-once", "transfer", 8, 60, "After `calls = []`, `def g(): calls.append(1); return 5`, `def f(x): return x + x`, `r = f(g())`, what is `r + len(calls)`?"), 11),
  mcq(s(A, "transfer-pass-by-assignment", "transfer", 9, 75, "Python is often described as “pass by assignment” (or by object reference). Which observation best shows this?"),
    "A function can mutate a list it receives, but rebinding its parameter never affects the caller's variable",
    [
      ["Integers passed to functions are copied", "ints-copied", "Nothing is copied; ints just can't be mutated."],
      ["Lists passed to functions are copied", "lists-copied", "The function sees the same list object."],
      ["Functions can rebind the caller's variables", "rebind-caller", "Assignment to a parameter rebinds only the local name."],
    ]),
  code(s(A, "code-clamp", "apply", 3, 60, "Write `clamp(x, lo=0, hi=1)` that limits `x` to the range `[lo, hi]`. `clamp(5)` is `1`, `clamp(5, hi=10)` is `5`."),
    "def clamp(x, lo=0, hi=1):\n    pass\n",
    "def clamp(x, lo=0, hi=1):\n    return max(lo, min(x, hi))\n",
    [
      ["default-high", "result = clamp(5)", "result == 1"],
      ["kw-hi", "result = clamp(5, hi=10)", "result == 5"],
      ["low", "result = clamp(-3, -1)", "result == -1"],
    ]),
  code(s(A, "code-append-safe", "apply", 6, 90, "Write `append_to(item, items=None)` that appends `item` to `items` and returns it, creating a *new* list on each call where `items` is omitted."),
    "def append_to(item, items=None):\n    pass\n",
    "def append_to(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\n",
    [
      ["fresh", "a = append_to(1)\nb = append_to(2)\nresult = (a, b)", "result == ([1], [2])"],
      ["given", "x = [0]\nresult = append_to(5, x)\nresult = (result, x)", "result == ([0, 5], [0, 5])"],
    ]),
];

// ---------------------------------------------------------------------------
// python-args-kwargs
// ---------------------------------------------------------------------------
const K = "python-args-kwargs";
const argsKwargs: Item[] = [
  mcq(s(K, "recall-star-args-collects", "recall", 1, 15, "In `def f(*args):`, what does `*args` collect?"),
    "Any extra positional arguments, as a tuple",
    [
      ["Keyword arguments, as a dict", "args-collects-kwargs", "That's `**kwargs`."],
      ["Exactly one argument", "args-one", "It collects zero or more."],
      ["All arguments as a list", "args-list", "It's a tuple, and only positional extras."],
    ]),
  mcq(s(K, "recall-kwargs-collects", "recall", 1, 15, "In `def f(**kwargs):`, what does `kwargs` hold?"),
    "A dict of the keyword arguments that didn't match other parameters",
    [
      ["A tuple of positional arguments", "kwargs-tuple", "That's `*args`."],
      ["The function's default values", "kwargs-defaults", "Defaults are separate."],
      ["Only arguments named `kwargs`", "kwargs-literal-name", "It collects every unmatched keyword."],
    ]),
  mcq(s(K, "recall-unpack-call", "recall", 2, 20, "`nums = [3, 4]`. What does `f(*nums)` pass to `f`?"),
    "Two positional arguments, `3` and `4`",
    [
      ["One argument, the list `[3, 4]`", "star-call-no-unpack", "The `*` spreads the list into separate arguments."],
      ["A pointer to `nums`", "star-pointer", "Python's `*` here means unpacking, not pointers."],
      ["Keyword arguments `0=3, 1=4`", "star-keywords", "`*` gives positional arguments; `**` gives keywords."],
    ]),
  num(s(K, "eval-count-args", "apply", 3, 30, "After `def f(*a, **k): return len(a) * 10 + len(k)`, what is `f(1, 2, 3, x=4)`?"), 31),
  num(s(K, "eval-star-call", "apply", 3, 30, "After `def f(a, b, c): return a * b - c`, what is `f(*[3, 4], c=2)`?"), 10),
  mcq(s(K, "eval-kwargs-order", "apply", 4, 35, "After `def f(**k): return list(k)`, what is `f(z=1, a=2)`?"),
    "`['z', 'a']`",
    [
      ["`['a', 'z']`", "kwargs-sorted", "Since Python $3.6$, `**kwargs` preserves the call's order."],
      ["`[1, 2]`", "list-of-dict-values", "Iterating a dict gives its keys."],
      ["`TypeError`", "list-of-dict-error", "`list(dict)` is fine."],
    ]),
  mcq(s(K, "eval-dict-merge-unpack", "apply", 4, 35, "What is `{**{\"a\": 1}, \"a\": 2, **{\"b\": 3}}`?"),
    "`{'a': 2, 'b': 3}`",
    [
      ["`{'a': 1, 'b': 3}`", "merge-first-wins", "Later entries override earlier ones."],
      ["`TypeError`", "merge-dup-error", "Duplicate keys in a dict display are allowed; the last wins."],
      ["`{'a': [1, 2], 'b': 3}`", "merge-collects", "Values are replaced, not collected."],
    ]),
  num(s(K, "eval-forward-wrapper", "apply", 5, 45, "After `def g(a, b=0): return a + b` and `def w(*args, **kw): return g(*args, **kw) * 2`, what is `w(3, b=4)`?"), 14),
  mcq(s(K, "apply-dup-kw-unpack", "apply", 5, 40, "After `def f(**k): return k`, what does `f(a=1, **{\"a\": 2})` do?"),
    "`TypeError: got multiple values for keyword argument 'a'`",
    [
      ["Returns `{'a': 2}`", "call-unpack-overrides", "In a call, duplicate keywords are an error, unlike in a dict display."],
      ["Returns `{'a': 1}`", "call-first-wins", "The call fails rather than choosing one."],
      ["Returns `{'a': [1, 2]}`", "call-collects", "Nothing is collected."],
    ]),
  short(s(K, "explain-wrapper", "explain", 6, 120, "Why does almost every decorator's inner function take `*args, **kwargs` and call `func(*args, **kwargs)`?"),
    [
      ["generic", "So the wrapper accepts whatever arguments the wrapped function accepts, without knowing its signature", 2, true],
      ["forward", "And forwards them unchanged, positional and keyword alike", 2, true],
    ]),
  mcq(s(K, "transfer-args-after-star", "transfer", 8, 60, "`def f(a, *args, b=0, **kw): return (a, args, b, kw)`. What is `f(1, 2, 3, b=4, c=5)`?"),
    "`(1, (2, 3), 4, {'c': 5})`",
    [
      ["`(1, (2, 3, 4), 0, {'c': 5})`", "kwonly-in-args", "`b=4` is a keyword, so it binds `b`."],
      ["`(1, [2, 3], 4, {'c': 5})`", "args-as-list", "`args` is a tuple."],
      ["`(1, (2, 3), 4, {'b': 4, 'c': 5})`", "kw-includes-matched", "`kw` gets only keywords that matched no parameter."],
    ]),
  num(s(K, "eval-zip-star-transpose", "transfer", 8, 60, "What is `sum(map(sum, zip(*[[1, 2], [3, 4], [5, 6]])))`?"), 21),
  mcq(s(K, "transfer-star-unpack-strings", "transfer", 8, 60, "What is `[*\"ab\", *range(2)]`?"),
    "`['a', 'b', 0, 1]`",
    [
      ["`['ab', range(0, 2)]`", "star-no-unpack-literal", "`*` inside a list display unpacks each iterable."],
      ["`SyntaxError`", "star-list-invalid", "Unpacking in displays is valid since Python $3.5$."],
      ["`['a', 'b', 'range']`", "star-range-name", "A range unpacks to its numbers."],
    ]),
  num(s(K, "eval-starred-assign-empty", "transfer", 9, 75, "After `a, *b, c = [1, 2]`, what is `len(b) + a + c`?"), 3),
  short(s(K, "transfer-kwargs-typos", "transfer", 9, 150, "A plotting helper takes `**options` and passes them through. A caller writes `colour=\"red\"` instead of `color=\"red\"`. Explain what can happen and one design that catches the mistake."),
    [
      ["silent", "The misspelled key is collected silently and may be ignored or fail far from the call", 2, true],
      ["fix", "Declare explicit keyword-only parameters (or validate the keys against an allowed set and raise)", 2, true],
    ]),
  mcq(s(K, "transfer-inspect-signature", "transfer", 10, 90, "A decorator's wrapper is `def wrapper(*args, **kwargs)`. Why do IDEs and `help()` then show the wrong signature, and what fixes it?"),
    "The wrapper replaces the original function; `@functools.wraps(func)` copies the name, docstring and a `__wrapped__` link so tools find the real signature",
    [
      ["Nothing can fix it; decorators always hide signatures", "decorators-hide-forever", "`functools.wraps` exists for exactly this."],
      ["Adding a docstring to the wrapper", "wrapper-docstring", "That documents the wrapper, not the original."],
      ["Using `**kwargs` only, without `*args`", "drop-args", "That breaks positional calls and doesn't fix introspection."],
    ]),
  num(s(K, "eval-kwargs-defaults-merge", "transfer", 9, 75, "After `def cfg(**kw): return {\"size\": 10, \"color\": 0, **kw}`, what is `sum(cfg(size=3, extra=5).values())`?"), 8),
  num(s(K, "eval-star-print-sep", "transfer", 10, 90, "After `import io, contextlib`, `buf = io.StringIO()`, `with contextlib.redirect_stdout(buf): print(*range(4), sep=\"\")`, what is `int(buf.getvalue())`?"), 123),
  code(s(K, "code-mean-of-all", "apply", 4, 75, "Write `mean_all(*nums)` returning the average of any number of numbers, or `0.0` if none are given."),
    "def mean_all(*nums):\n    pass\n",
    "def mean_all(*nums):\n    return sum(nums) / len(nums) if nums else 0.0\n",
    [
      ["three", "result = mean_all(1, 2, 3)", "result == 2"],
      ["one", "result = mean_all(5)", "result == 5"],
      ["none", "result = (mean_all(), mean_all(4, 6))", "result == (0.0, 5)"],
    ]),
  code(s(K, "code-build-query", "apply", 7, 120, "Write `query(table, **where)` returning a string like `\"SELECT * FROM users WHERE age=30 AND city=LA\"`, with conditions in the order given; with no conditions, omit the `WHERE` part."),
    "def query(table, **where):\n    pass\n",
    "def query(table, **where):\n    q = f\"SELECT * FROM {table}\"\n    if where:\n        q += \" WHERE \" + \" AND \".join(f\"{k}={v}\" for k, v in where.items())\n    return q\n",
    [
      ["two", "result = query(\"users\", age=30, city=\"LA\")", "result == \"SELECT * FROM users WHERE age=30 AND city=LA\""],
      ["none", "result = query(\"t\")", "result == \"SELECT * FROM t\""],
      ["order", "result = query(\"t\", b=1, a=2)", "result == \"SELECT * FROM t WHERE b=1 AND a=2\""],
    ]),
];

// ---------------------------------------------------------------------------
// python-scope
// ---------------------------------------------------------------------------
const SC = "python-scope";
const scope: Item[] = [
  mcq(s(SC, "recall-scope-definition", "recall", 1, 15, "What is a variable's *scope*?"),
    "The region of code where that name can be used",
    [
      ["How long the program runs", "scope-runtime", "Scope is about visibility of names."],
      ["The variable's data type", "scope-type", "Type belongs to the value, not the name's scope."],
      ["The size of the value in memory", "scope-memory", "Scope concerns where a name is visible."],
    ]),
  mcq(s(SC, "recall-local-vanishes", "recall", 1, 15, "A variable assigned inside a function: can code outside the function use it after the call?"),
    "No — it is local to that call",
    [
      ["Yes, once the function has run", "local-persists", "Local names disappear when the call ends."],
      ["Yes, if it has the same name as a global", "local-shadows-global", "Sharing a name doesn't make them the same variable."],
      ["Only if the function returned it", "return-exposes-name", "Returning gives the caller the *value*, not the local name."],
    ]),
  mcq(s(SC, "recall-global-readable", "recall", 2, 20, "Can a function *read* a module-level variable without declaring `global`?"),
    "Yes — `global` is needed only to *assign* to it",
    [
      ["No, `global` is always required", "global-to-read", "Reading falls back through LEGB to the global scope."],
      ["Only for constants in capitals", "global-caps", "Naming convention has no effect on scope."],
      ["Only if the module imports itself", "global-import-self", "Module globals are visible to its functions directly."],
    ]),
  num(s(SC, "eval-shadow", "apply", 3, 30, "After `x = 1` and `def f(): x = 5; return x`, what is `f() + x`?"), 6),
  num(s(SC, "eval-global-bump", "apply", 4, 35, "After `n = 0`, `def inc(): global n; n += 1`, `inc()`, `inc()`, `inc()`, what is `n`?"), 3),
  mcq(s(SC, "apply-unbound-local", "apply", 5, 40, "After `x = 1` and `def f(): print(x); x = 2`, what does calling `f()` raise?"),
    "`UnboundLocalError` — the assignment makes `x` local for the whole function body, so the `print` reads it before it is set",
    [
      ["Nothing; it prints `1`", "local-after-read", "Locality is decided for the whole function at compile time."],
      ["`NameError`", "nameerror-not-unbound", "It's the more specific `UnboundLocalError` (a subclass of `NameError`)."],
      ["Nothing; it prints `2`", "assign-hoisted", "The assignment hasn't run when `print` executes."],
    ]),
  num(s(SC, "eval-closure-reads-latest", "apply", 5, 40, "After `def outer(): v = 1; g = lambda: v; v = 2; return g` and `h = outer()`, what is `h()`?"), 2),
  mcq(s(SC, "apply-comprehension-isolated", "apply", 4, 35, "After `i = 99` and `[i for i in range(3)]`, what is `i`?"),
    "`99`",
    [
      ["`2`", "comp-leaks-var", "Comprehension variables don't leak in Python $3$."],
      ["`3`", "comp-past-end", "The comprehension has its own scope; the outer `i` is untouched."],
      ["`NameError`", "comp-deletes", "The outer `i` still exists."],
    ]),
  short(s(SC, "explain-legb", "explain", 6, 120, "Walk through how Python resolves the name `len` inside a nested function that never assigns it, naming each scope checked."),
    [
      ["order", "Local, then Enclosing functions, then Global (module), then Built-in", 2, true],
      ["found-builtin", "`len` is found in the built-in scope, since no earlier scope binds it", 1, true],
      ["shadow-note", "Notes that defining `len` in any earlier scope would shadow the built-in", 1],
    ]),
  mcq(s(SC, "transfer-nonlocal-vs-global", "transfer", 8, 60, "Inside `inner`, nested in `outer`, which statement lets `inner` rebind a variable defined in `outer`?"),
    "`nonlocal v`",
    [
      ["`global v`", "global-for-enclosing", "`global` refers to module scope and would skip `outer`."],
      ["No statement is needed", "rebind-free", "Without `nonlocal`, assigning makes a new local in `inner`."],
      ["`outer.v = ...`", "attribute-local", "Locals aren't attributes of the function object."],
    ]),
  mcq(s(SC, "transfer-nonlocal-needs-binding", "transfer", 8, 60, "What happens when you compile `def f():` containing `def g(): nonlocal z; z = 1`, where no enclosing function binds `z`?"),
    "`SyntaxError: no binding for nonlocal 'z' found`",
    [
      ["`z` becomes a global", "nonlocal-falls-back", "`nonlocal` never falls back to globals."],
      ["`z` becomes local to `g`", "nonlocal-ignored", "The declaration must refer to an enclosing function's variable."],
      ["It works; `z` is created in `f`", "nonlocal-creates", "`nonlocal` can't create a binding."],
    ]),
  num(s(SC, "eval-counter-factory", "transfer", 8, 60, "After `def mk(): c = [0]; return lambda: c.append(1) or len(c) - 1` and `a, b = mk(), mk()`, `a()`, `a()`, `b()`, what is `a()`?"), 3),
  mcq(s(SC, "transfer-mutate-vs-rebind", "transfer", 9, 75, "With `log = []` at module level, why does `def add(m): log.append(m)` work without `global`, while `def reset(): log = []` silently fails to clear it?"),
    "`append` only *reads* the name `log` and mutates the object; `log = []` assigns, which creates a new local `log`",
    [
      ["`append` is a special case that ignores scope", "append-special", "No method is special; reading a name never needs `global`."],
      ["`reset` raises `UnboundLocalError`", "reset-raises", "Assigning without reading first just creates a local."],
      ["Lists are always global", "lists-global", "Scope is about names, not types."],
    ]),
  num(s(SC, "eval-builtin-shadow", "transfer", 9, 75, "After `sum = 10` and `def f(xs): return len(xs) + sum`, what is `f([1, 2])`?"), 12),
  short(s(SC, "transfer-late-binding-fix", "transfer", 9, 150, "`callbacks = [lambda: print(i) for i in range(3)]` prints $2$ three times. Explain why, and give two fixes."),
    [
      ["why", "Each lambda looks up `i` when called, and by then the loop has finished with `i == 2`", 2, true],
      ["fix-default", "Bind the current value with a default: `lambda i=i: print(i)`", 1],
      ["fix-partial", "Or use `functools.partial(print, i)` / a factory function", 1],
    ]),
  mcq(s(SC, "transfer-except-var-deleted", "transfer", 10, 90, "`e = \"before\"` then `try: 1 / 0` / `except ZeroDivisionError as e: pass`. What is the state of `e` afterward?"),
    "It no longer exists — Python deletes the `except ... as` name at the end of the handler, so using `e` raises `NameError`",
    [
      ["`\"before\"`", "except-var-restored", "The handler rebound `e` and then deleted it."],
      ["The `ZeroDivisionError` instance", "except-var-kept", "It's deleted to avoid a reference cycle through the traceback."],
      ["`None`", "except-var-none", "It's unbound, not `None`."],
    ]),
  num(s(SC, "eval-class-scope-skip", "transfer", 10, 90, "After `x = 1` and `class C: x = 2; get = staticmethod(lambda: x)`, what is `C.get()`?"), 1),
  code(s(SC, "code-make-counter", "apply", 6, 90, "Write `make_counter(start=0)` returning a function that, each time it's called, returns the next integer starting at `start`. Use a closure with `nonlocal`."),
    "def make_counter(start=0):\n    pass\n",
    "def make_counter(start=0):\n    n = start - 1\n    def next_value():\n        nonlocal n\n        n += 1\n        return n\n    return next_value\n",
    [
      ["sequence", "c = make_counter()\nresult = [c(), c(), c()]", "result == [0, 1, 2]"],
      ["start", "c = make_counter(10)\nresult = [c(), c()]", "result == [10, 11]"],
      ["independent", "a = make_counter()\nb = make_counter()\na(); a()\nresult = (a(), b())", "result == (2, 0)"],
    ]),
  code(s(SC, "code-make-accumulator", "apply", 7, 120, "Write `make_averager()` returning a function `avg(x)` that records `x` and returns the mean of every value passed so far."),
    "def make_averager():\n    pass\n",
    "def make_averager():\n    total = 0\n    count = 0\n    def avg(x):\n        nonlocal total, count\n        total += x\n        count += 1\n        return total / count\n    return avg\n",
    [
      ["running", "a = make_averager()\nresult = [a(10), a(20), a(0)]", "result == [10, 15, 10]"],
      ["separate", "a = make_averager()\nb = make_averager()\na(4)\nresult = (b(2), a(6))", "result == (2, 5)"],
    ]),
];

// ---------------------------------------------------------------------------
// python-lambda
// ---------------------------------------------------------------------------
const L = "python-lambda";
const lambdas: Item[] = [
  mcq(s(L, "recall-lambda-is-function", "recall", 1, 15, "What does a `lambda` expression produce?"),
    "A function object",
    [
      ["A list", "lambda-list", "It produces a callable function."],
      ["The result of calling a function", "lambda-calls", "It defines a function; it doesn't call it."],
      ["A string of code", "lambda-string", "It's a real function, not text."],
    ]),
  mcq(s(L, "recall-implicit-return", "recall", 1, 15, "In `lambda x: x + 1`, what is returned?"),
    "The value of `x + 1`, implicitly",
    [
      ["Nothing — a lambda needs `return`", "lambda-needs-return", "A lambda's body is one expression whose value is returned; `return` isn't allowed."],
      ["`x`", "lambda-returns-arg", "The whole expression after the colon is the result."],
      ["`None`", "lambda-returns-none", "It returns the expression's value."],
    ]),
  mcq(s(L, "recall-lambda-one-expression", "recall", 2, 20, "Which is **not** allowed in a lambda body?"),
    "An assignment statement like `y = x + 1`",
    [
      ["A conditional expression `a if c else b`", "lambda-no-ternary", "Conditional expressions are expressions, so they're allowed."],
      ["A function call", "lambda-no-call", "Calls are expressions."],
      ["Arithmetic", "lambda-no-arith", "Any expression is fine."],
    ]),
  num(s(L, "eval-immediate-call", "apply", 2, 20, "What is `(lambda a, b: a * b)(6, 7)`?"), 42),
  num(s(L, "eval-lambda-default", "apply", 3, 25, "What is `(lambda x, n=2: x ** n)(3) + (lambda x, n=2: x ** n)(2, 3)`?"), 17),
  mcq(s(L, "eval-sorted-lambda-last-char", "apply", 4, 35, "What is `sorted([\"cab\", \"abc\", \"bca\"], key=lambda w: w[-1])`?"),
    "`['bca', 'cab', 'abc']`",
    [
      ["`['abc', 'bca', 'cab']`", "key-ignored", "The key sorts by last letter: `a`, `b`, `c`."],
      ["`['cab', 'abc', 'bca']`", "key-unsorted", "The original order isn't kept."],
      ["`['abc', 'cab', 'bca']`", "key-first-char", "The key uses `w[-1]`, the last character."],
    ]),
  num(s(L, "eval-max-key-lambda", "apply", 4, 35, "What is `max([(1, 9), (3, 2), (2, 5)], key=lambda p: p[1])[0]`?"), 1),
  num(s(L, "eval-curried", "apply", 5, 40, "What is `(lambda x: lambda y: x - y)(10)(3)`?"), 7),
  short(s(L, "explain-lambda-vs-def", "explain", 6, 120, "Give one case where a lambda is the better choice than `def`, and one where `def` is clearly better."),
    [
      ["lambda-case", "Short throwaway functions passed inline, e.g. a sort `key=`", 2, true],
      ["def-case", "Anything reused, multi-step, needing statements, a docstring, or a useful name in tracebacks", 2, true],
    ]),
  mcq(s(L, "transfer-lambda-name", "transfer", 7, 50, "`square = lambda x: x * x`. What is `square.__name__`?"),
    "`'<lambda>'` — assigning a lambda to a name doesn't give it that name",
    [
      ["`'square'`", "lambda-takes-name", "Only `def` sets `__name__` from the definition."],
      ["`''`", "lambda-empty-name", "It's the literal string `'<lambda>'`."],
      ["`AttributeError`", "lambda-no-name", "Lambdas are functions and have `__name__`."],
    ]),
  mcq(s(L, "transfer-lambda-in-loop-binding", "transfer", 8, 60, "What is `[f(10) for f in [lambda x: x + k for k in range(3)]]`?"),
    "`[12, 12, 12]` — every lambda looks up `k` when called, after the comprehension finished",
    [
      ["`[10, 11, 12]`", "lambda-captures-value", "Lambdas capture the variable, not its value at creation."],
      ["`[10, 10, 10]`", "k-zero", "`k` ends at $2$."],
      ["`NameError`", "k-out-of-scope", "The closure keeps `k`'s cell alive."],
    ]),
  num(s(L, "eval-compose", "transfer", 8, 60, "After `compose = lambda f, g: lambda x: f(g(x))`, what is `compose(lambda x: x * 3, lambda x: x + 1)(4)`?"), 15),
  mcq(s(L, "transfer-lambda-side-effect", "transfer", 8, 60, "What is `(lambda: [].append(1))()`?"),
    "`None` — the lambda returns whatever `append` returns",
    [
      ["`[1]`", "lambda-returns-list", "`.append()` returns `None`, and that's what the lambda returns."],
      ["`1`", "lambda-returns-arg", "The appended value isn't returned."],
      ["`SyntaxError`", "lambda-method-call", "Method calls are expressions, so this is legal."],
    ]),
  num(s(L, "eval-y-combinator-fact", "transfer", 10, 90, "Anonymous recursion: what is `(lambda f, n: f(f, n))(lambda self, n: 1 if n <= 1 else n * self(self, n - 1), 5)`?"), 120),
  mcq(s(L, "transfer-pickle-lambda", "transfer", 9, 75, "Why does sending a lambda to a process pool (`ProcessPoolExecutor.map(lambda x: x * 2, data)`) fail?"),
    "Work is sent to other processes by pickling, and pickle stores functions by importable name — a lambda has none",
    [
      ["Lambdas can't take arguments in other processes", "lambda-args-process", "The problem is transferring the function itself."],
      ["Process pools only accept built-in functions", "pool-builtins-only", "Any module-level `def` function works."],
      ["Lambdas are too slow for parallel work", "lambda-slow", "Speed isn't the issue; serialisation is."],
    ]),
  short(s(L, "transfer-itemgetter", "transfer", 9, 150, "Compare `key=lambda r: (r[2], r[0])` with `key=operator.itemgetter(2, 0)`. Do they sort the same way, and why might you prefer the second?"),
    [
      ["same", "Both produce the tuple `(r[2], r[0])`, so the order is identical", 2, true],
      ["prefer", "`itemgetter` is implemented in C (slightly faster), picklable, and states the intent directly", 2],
    ]),
  num(s(L, "eval-map-lambda-two", "transfer", 9, 75, "What is `sum(map(lambda a, b: a * b, range(1, 4), range(4, 7)))`?"), 32),
  num(s(L, "eval-defaultdict-lambda", "transfer", 10, 90, "After `from collections import defaultdict`, `d = defaultdict(lambda: 5)`, `d[\"a\"] += 1`, `d[\"b\"]`, what is `sum(d.values())`?"), 11),
  code(s(L, "code-sort-by-length-then-alpha", "apply", 4, 75, "Write `tidy(words)` returning the words sorted by length, ties alphabetically ignoring case, using a lambda key."),
    "def tidy(words):\n    pass\n",
    "def tidy(words):\n    return sorted(words, key=lambda w: (len(w), w.lower()))\n",
    [
      ["basic", "result = tidy([\"pear\", \"Fig\", \"apple\", \"date\"])", "result == [\"Fig\", \"date\", \"pear\", \"apple\"]"],
      ["case", "result = tidy([\"b\", \"A\", \"c\"])", "result == [\"A\", \"b\", \"c\"]"],
    ]),
  code(s(L, "code-make-ops", "apply", 6, 90, "Write `ops()` returning a dict mapping `\"+\"`, `\"-\"`, `\"*\"` and `\"/\"` to lambdas of two arguments. Then `ops()[\"*\"](3, 4)` is `12`."),
    "def ops():\n    pass\n",
    "def ops():\n    return {\"+\": lambda a, b: a + b, \"-\": lambda a, b: a - b, \"*\": lambda a, b: a * b, \"/\": lambda a, b: a / b}\n",
    [
      ["mult", "result = ops()[\"*\"](3, 4)", "result == 12"],
      ["minus-div", "o = ops()\nresult = (o[\"-\"](10, 4), o[\"/\"](9, 2))", "result == (6, 4.5)"],
      ["keys", "result = sorted(ops())", "result == [\"*\", \"+\", \"-\", \"/\"]"],
    ]),
];

// ---------------------------------------------------------------------------
// python-higher-order
// ---------------------------------------------------------------------------
const H = "python-higher-order";
const higherOrder: Item[] = [
  mcq(s(H, "recall-pass-function", "recall", 1, 15, "Can a Python function be passed as an argument to another function?"),
    "Yes — functions are values like any other",
    [
      ["No, only its return value can", "pass-result-only", "Writing the name without `()` passes the function itself."],
      ["Only built-in functions", "builtins-only", "Any function can be passed."],
      ["Only lambdas", "lambdas-only", "`def` functions are just as passable."],
    ]),
  mcq(s(H, "recall-map-purpose", "recall", 1, 15, "What does `map(f, xs)` do?"),
    "Applies `f` to each element of `xs`, lazily",
    [
      ["Keeps the elements for which `f` is true", "map-is-filter", "That's `filter`."],
      ["Combines all elements into one value", "map-is-reduce", "That's `reduce`."],
      ["Builds a dictionary", "map-builds-dict", "`map` has nothing to do with dict mapping."],
    ]),
  mcq(s(H, "recall-return-function", "recall", 2, 20, "`def make(): def g(): return 1; return g`. What does `make()` return?"),
    "The function `g` itself, which can be called later",
    [
      ["`1`", "returns-called", "`return g` returns the function; `g()` would return $1$."],
      ["`None`", "nested-returns-none", "It returns `g`."],
      ["An error, since `g` is local", "local-function-error", "Returning a local function is fine."],
    ]),
  num(s(H, "eval-map-sum", "apply", 3, 25, "What is `sum(map(abs, [-3, 1, -2]))`?"), 6),
  mcq(s(H, "eval-filter-list", "apply", 3, 25, "What is `list(filter(lambda s: len(s) > 2, [\"a\", \"abc\", \"de\", \"fghi\"]))`?"),
    "`['abc', 'fghi']`",
    [
      ["`[False, True, False, True]`", "filter-returns-bools", "`filter` keeps the elements themselves."],
      ["`['a', 'de']`", "filter-inverted", "It keeps elements where the function is true."],
      ["`[3, 4]`", "filter-returns-lengths", "The lengths are only used to decide."],
    ]),
  num(s(H, "eval-reduce-product", "apply", 4, 35, "After `from functools import reduce`, what is `reduce(lambda a, b: a * b, [1, 2, 3, 4], 10)`?"), 240),
  num(s(H, "eval-partial", "apply", 4, 35, "After `from functools import partial`, `p = partial(pow, 2)`, what is `p(5)`?"), 32),
  mcq(s(H, "eval-map-lazy", "apply", 5, 40, "After `m = map(str, [1, 2])`, what is `[list(m), list(m)]`?"),
    "`[['1', '2'], []]`",
    [
      ["`[['1', '2'], ['1', '2']]`", "map-reusable", "A `map` object is a one-shot iterator."],
      ["`[[1, 2], []]`", "map-str-ignored", "`str` converts each number."],
      ["`TypeError`", "map-list-twice-error", "Exhausted iterators just yield nothing."],
    ]),
  num(s(H, "eval-accumulate-max", "apply", 5, 40, "After `from itertools import accumulate`, what is `list(accumulate([3, 1, 4, 1, 5], max))[3]`?"), 4),
  short(s(H, "explain-decorator", "explain", 6, 120, "Explain what `@timer` above `def work(): ...` does, in terms of functions taking and returning functions."),
    [
      ["sugar", "It means `work = timer(work)`", 2, true],
      ["wrapper", "`timer` returns a new wrapper function that adds behaviour and calls the original", 2, true],
    ]),
  mcq(s(H, "transfer-decorator-order", "transfer", 8, 60, "`@a` above `@b` above `def f(): ...`. Which is equivalent?"),
    "`f = a(b(f))`",
    [
      ["`f = b(a(f))`", "decorators-top-first", "The decorator nearest the function is applied first."],
      ["`f = a(f); f = b(f)` with both applied to the original `f`", "decorators-independent", "Each decorator wraps the result of the one below."],
      ["`f = a(f) + b(f)`", "decorators-combine", "Decorators compose; they don't add."],
    ]),
  num(s(H, "eval-decorator-count", "transfer", 8, 60, "After `def twice(f): return lambda x: f(f(x))` and `inc = twice(twice(lambda x: x + 1))`, what is `inc(0)`?"), 4),
  mcq(s(H, "transfer-filter-none", "transfer", 8, 60, "What is `list(filter(None, [0, 1, \"\", \"x\", None, [], [0]]))`?"),
    "`[1, 'x', [0]]`",
    [
      ["`[0, 1, '', 'x', [], [0]]`", "filter-none-drops-none-only", "`filter(None, ...)` drops every falsy value, not just `None`."],
      ["`[1, 'x']`", "list-zero-falsy", "`[0]` is a non-empty list, so it's truthy."],
      ["`[]`", "filter-none-drops-all", "`None` as the function means “keep truthy items.”"],
    ]),
  num(s(H, "eval-reduce-no-init", "transfer", 9, 75, "After `from functools import reduce`, what is `reduce(lambda acc, x: acc * 10 + x, [4, 0, 2])`?"), 402),
  mcq(s(H, "transfer-reduce-empty", "transfer", 9, 75, "What does `functools.reduce(lambda a, b: a + b, [])` do?"),
    "Raises `TypeError` — with no initial value there is nothing to return for an empty sequence",
    [
      ["Returns `0`", "reduce-empty-zero", "`reduce` doesn't know the identity of your operation; pass an initial value."],
      ["Returns `None`", "reduce-empty-none", "It raises instead."],
      ["Returns `[]`", "reduce-empty-input", "It raises instead."],
    ]),
  short(s(H, "transfer-memoize", "transfer", 9, 150, "Write or describe a `memoize(f)` higher-order function, and state one condition `f` must satisfy for it to be correct."),
    [
      ["cache", "Returns a wrapper that keeps a dict from arguments to results and calls `f` only on a miss", 2, true],
      ["condition", "`f` must be pure (same output for same input, no needed side effects) and its arguments hashable", 2, true],
    ]),
  num(s(H, "eval-pipeline", "transfer", 10, 90, "After `from functools import reduce`, `pipe = lambda *fs: lambda x: reduce(lambda acc, f: f(acc), fs, x)`, what is `pipe(lambda x: x + 2, lambda x: x * 5, lambda x: x - 1)(1)`?"), 14),
  num(s(H, "eval-starmap", "transfer", 9, 75, "After `from itertools import starmap`, what is `sum(starmap(pow, [(2, 3), (3, 2), (10, 0)]))`?"), 18),
  code(s(H, "code-apply-n", "apply", 5, 90, "Write `apply_n(f, n, x)` that applies the function `f` to `x` repeatedly, `n` times, and returns the result. `apply_n(lambda v: v * 2, 3, 1)` is `8`."),
    "def apply_n(f, n, x):\n    pass\n",
    "def apply_n(f, n, x):\n    for _ in range(n):\n        x = f(x)\n    return x\n",
    [
      ["double", "result = apply_n(lambda v: v * 2, 3, 1)", "result == 8"],
      ["zero", "result = apply_n(lambda v: v + 1, 0, 5)", "result == 5"],
      ["strings", "result = apply_n(lambda s: s + \"!\", 2, \"hi\")", "result == \"hi!!\""],
    ]),
  code(s(H, "code-count-calls", "apply", 7, 120, "Write a decorator `counted(f)` returning a wrapper that calls `f` with any arguments and records how many times it has been called in an attribute `wrapper.calls`."),
    "def counted(f):\n    pass\n",
    "def counted(f):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return f(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n",
    [
      ["count", "@counted\ndef add(a, b=0):\n    return a + b\nadd(1); add(2, b=3)\nresult = add.calls", "result == 2"],
      ["value", "@counted\ndef add(a, b=0):\n    return a + b\nresult = (add(2, b=3), add.calls)", "result == (5, 1)"],
    ]),
];

// ---------------------------------------------------------------------------
// python-sorting-key
// ---------------------------------------------------------------------------
const SK = "python-sorting-key";
const sortingKey: Item[] = [
  mcq(s(SK, "recall-sorted-new-list", "recall", 1, 15, "Does `sorted(xs)` change `xs`?"),
    "No — it returns a new sorted list",
    [
      ["Yes, it sorts `xs` in place", "sorted-in-place", "That's `xs.sort()`."],
      ["Only if `xs` is a list", "sorted-mutates-lists", "`sorted` never mutates its input."],
      ["It deletes `xs`", "sorted-deletes", "The original is untouched."],
    ]),
  mcq(s(SK, "recall-default-order", "recall", 1, 15, "By default, in what order does `sorted([3, 1, 2])` arrange numbers?"),
    "Ascending: `[1, 2, 3]`",
    [
      ["Descending: `[3, 2, 1]`", "default-descending", "Use `reverse=True` for descending."],
      ["Original order", "default-unchanged", "`sorted` reorders."],
      ["Random", "default-random", "Sorting is deterministic."],
    ]),
  mcq(s(SK, "recall-key-purpose", "recall", 2, 20, "What does `key=len` tell `sorted`?"),
    "Compare elements by their lengths instead of by the elements themselves",
    [
      ["Return only the lengths", "key-returns-keys", "The key is used for comparing; the original elements are returned."],
      ["Sort only the first `len` elements", "key-limits", "`key` doesn't limit anything."],
      ["Use lengths as dictionary keys", "key-dict", "Here `key` just means “sort key.”"],
    ]),
  mcq(s(SK, "eval-sorted-reverse-len", "apply", 3, 25, "What is `sorted([\"bb\", \"a\", \"dddd\", \"ccc\"], key=len, reverse=True)`?"),
    "`['dddd', 'ccc', 'bb', 'a']`",
    [
      ["`['a', 'bb', 'ccc', 'dddd']`", "reverse-ignored", "`reverse=True` puts the longest first."],
      ["`[4, 3, 2, 1]`", "sorted-returns-keys", "The words are returned, not their lengths."],
      ["`['dddd', 'ccc', 'a', 'bb']`", "reverse-partial", "Every element is placed by length."],
    ]),
  num(s(SK, "eval-sorted-abs", "apply", 3, 25, "What is `sorted([-5, 3, -1, 4], key=abs)[1]`?"), 3),
  mcq(s(SK, "eval-sort-dict-by-value", "apply", 4, 35, "What is `sorted({\"a\": 3, \"b\": 1, \"c\": 2}, key=lambda k: {\"a\": 3, \"b\": 1, \"c\": 2}[k])`?"),
    "`['b', 'c', 'a']`",
    [
      ["`['a', 'b', 'c']`", "sort-dict-keys-alpha", "The key looks up each value, so `b` (1) comes first."],
      ["`[1, 2, 3]`", "sort-dict-returns-values", "Iterating a dict gives keys; the keys are returned."],
      ["`['a', 'c', 'b']`", "sort-dict-desc", "The order is ascending by value."],
    ]),
  num(s(SK, "eval-min-key", "apply", 4, 30, "What is `min([\"kiwi\", \"fig\", \"banana\"], key=len).count(\"i\")`?"), 1),
  mcq(s(SK, "eval-negate-key", "apply", 5, 40, "What is `sorted([(\"a\", 2), (\"b\", 3), (\"c\", 2)], key=lambda t: (-t[1], t[0]))`?"),
    "`[('b', 3), ('a', 2), ('c', 2)]`",
    [
      ["`[('a', 2), ('c', 2), ('b', 3)]`", "negate-ignored", "Negating the number sorts it descending."],
      ["`[('b', 3), ('c', 2), ('a', 2)]`", "tie-desc", "Ties sort by name ascending."],
      ["`TypeError`", "negate-tuple-error", "The key is a tuple of numbers and strings, compared item by item."],
    ]),
  mcq(s(SK, "eval-sort-numeric-strings", "apply", 5, 40, "What is `sorted([\"10\", \"9\", \"100\"], key=int)`?"),
    "`['9', '10', '100']`",
    [
      ["`['10', '100', '9']`", "key-int-ignored", "That's the plain text order; `key=int` compares the numbers."],
      ["`[9, 10, 100]`", "key-converts-output", "The key affects comparison only; the strings are returned."],
      ["`['100', '10', '9']`", "key-int-desc", "The order is ascending."],
    ]),
  short(s(SK, "explain-key-vs-cmp", "explain", 6, 120, "Why does Python's `sorted` take a `key` function that's called once per element, rather than a comparison function called for every pair?"),
    [
      ["calls", "The key is computed $n$ times, while a comparison would be called $O(n \\log n)$ times", 2, true],
      ["simple", "Keys are simpler to write and compose (tuples give multi-level sorts); `functools.cmp_to_key` covers the rare comparison case", 2],
    ]),
  mcq(s(SK, "transfer-natural-sort", "transfer", 8, 60, "Filenames `\"img10.png\"`, `\"img2.png\"`, `\"img1.png\"` sort as `img1`, `img10`, `img2`. Which key gives `img1`, `img2`, `img10`?"),
    "`key=lambda f: int(f[3:-4])`",
    [
      ["`key=len`", "natural-len", "That works here by accident but fails for names with different prefixes."],
      ["`key=str.lower`", "natural-lower", "Case isn't the problem; digits compare as text."],
      ["`reverse=True`", "natural-reverse", "That just flips the wrong order."],
    ]),
  mcq(s(SK, "transfer-none-key", "transfer", 8, 60, "`sorted([3, None, 1])` raises `TypeError`. Which key sorts the numbers ascending with `None` last?"),
    "`key=lambda x: (x is None, x if x is not None else 0)`",
    [
      ["`key=lambda x: x or 0`", "none-or-zero", "That sorts `None` as $0$, putting it first, and conflates it with real zeros."],
      ["`key=str`", "none-str", "Sorting numbers as text puts `\"10\"` before `\"9\"`."],
      ["`key=lambda x: x is None`", "none-only-flag", "That moves `None` last but leaves the numbers unsorted relative to each other."],
    ]),
  num(s(SK, "eval-version-sort", "transfer", 8, 60, "What is `sorted([\"1.10.0\", \"1.9.2\", \"1.2.0\"], key=lambda v: tuple(map(int, v.split(\".\"))))[-1].count(\"1\")`?"), 2),
  mcq(s(SK, "transfer-stable-two-pass", "transfer", 9, 75, "To sort by department ascending, then salary descending, using two `sort` calls, which order is correct?"),
    "First `rows.sort(key=salary, reverse=True)`, then `rows.sort(key=dept)` — stability keeps the salary order within each department",
    [
      ["First by department, then by salary", "two-pass-primary-first", "The last sort becomes the primary key, so sort by the secondary key first."],
      ["The order doesn't matter", "two-pass-any-order", "Only the secondary-first order works."],
      ["Two passes can't work; you need one tuple key", "two-pass-impossible", "Stable sorting makes multi-pass sorts correct."],
    ]),
  num(s(SK, "eval-cmp-to-key", "transfer", 9, 75, "After `from functools import cmp_to_key`, `cmp = lambda a, b: (a % 3 - b % 3) or (a - b)`, what is `sorted([5, 3, 4, 6, 1], key=cmp_to_key(cmp))[2]`?"), 1),
  short(s(SK, "transfer-heapq", "transfer", 9, 150, "You need the $5$ largest of $10$ million numbers. Compare `sorted(xs)[-5:]` with `heapq.nlargest(5, xs)` in time and memory."),
    [
      ["sorted-cost", "`sorted` is $O(n \\log n)$ and builds a full copy of all $10$ million items", 2, true],
      ["heap-cost", "`nlargest` keeps a heap of $5$, about $O(n \\log k)$ time and $O(k)$ extra memory", 2, true],
    ]),
  mcq(s(SK, "transfer-nan-sort", "transfer", 10, 90, "Why can `sorted([3.0, float(\"nan\"), 1.0, 2.0])` return an incorrectly ordered list?"),
    "Every comparison with `nan` is `False`, which breaks the consistent ordering the sort relies on",
    [
      ["`nan` always sorts to the end", "nan-sorts-last", "No guarantee — the result depends on where `nan` sits."],
      ["Python raises for `nan`", "nan-raises", "It doesn't raise; that's what makes it dangerous."],
      ["`nan` is converted to $0$", "nan-zero", "No conversion happens."],
    ]),
  num(s(SK, "eval-sort-by-count", "transfer", 10, 90, "What is `\"\".join(sorted(\"mississippi\", key=lambda c: (-\"mississippi\".count(c), c)))[:4].count(\"i\")`?"), 4),
  code(s(SK, "code-sort-records", "apply", 5, 90, "Write `rank(people)` that takes `(name, score)` tuples and returns the names ordered by score descending, then name ascending."),
    "def rank(people):\n    pass\n",
    "def rank(people):\n    return [n for n, s in sorted(people, key=lambda p: (-p[1], p[0]))]\n",
    [
      ["basic", "result = rank([(\"bo\", 3), (\"al\", 5), (\"cy\", 3)])", "result == [\"al\", \"bo\", \"cy\"]"],
      ["single", "result = rank([(\"x\", 0)])", "result == [\"x\"]"],
    ]),
  code(s(SK, "code-sort-dates", "apply", 7, 120, "Write `sort_dates(ds)` that sorts date strings in `\"DD/MM/YYYY\"` form chronologically, returning them in the same format."),
    "def sort_dates(ds):\n    pass\n",
    "def sort_dates(ds):\n    def key(d):\n        dd, mm, yy = d.split(\"/\")\n        return (int(yy), int(mm), int(dd))\n    return sorted(ds, key=key)\n",
    [
      ["years", "result = sort_dates([\"01/01/2024\", \"31/12/2023\"])", "result == [\"31/12/2023\", \"01/01/2024\"]"],
      ["months", "result = sort_dates([\"05/03/2020\", \"20/02/2020\", \"01/03/2020\"])", "result == [\"20/02/2020\", \"01/03/2020\", \"05/03/2020\"]"],
    ]),
];

export const pythonSixtyFunctionsItems: Item[] = [...args, ...argsKwargs, ...scope, ...lambdas, ...higherOrder, ...sortingKey];
