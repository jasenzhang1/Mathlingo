# Python for Data Work

Lists/Indexing/Slicing, Dictionaries and Sets, Loops/enumerate/zip, Comprehensions, NumPy Arrays and
Vectorization, Broadcasting and Axis Reductions, pandas Series and DataFrames, groupby/Merge/Reshape
(8 concepts, 64 items).

**Authorship note — this domain inverts the usual direction**, the way ml-10..12 does. The concepts
did not exist in `concepts.ts` when the markdown clusters were written, and their items were authored
directly in [`web/src/data/items/python.ts`](../web/src/data/items/python.ts). This file is an index
and a design record rather than a transcript — restating 64 items as table rows would duplicate the
source of truth without adding anything a reader could check.

## Why a Python chapter at all

Mathlingo's stated audience is "professionals in ML, AI, quant, and data science", and every one of
those roles reads and writes this code daily. The existing 280 concepts teach what to compute; none
of them teach the tool the computing is done in. The gap showed up in the curriculum's own prose
before it showed up here: `pca-matrix-edition`, `feature-scaling` and `gradient-descent` all discuss
implementation choices with nothing to link to.

The chapter is scoped to the operations that recur regardless of what is being modelled — the two
built-in containers, the loop forms that walk them, and the same work again at array and table scale.
It is not an introduction to programming: functions, classes, modules, exceptions and file I/O are
all deliberately out.

## Graph edges

No edge touches an existing concept in either direction, so no existing concept's ancestor set — and
therefore no shipped item's seeded difficulty — changed. Internally the chain is:

| Edge | Why it is genuine |
|---|---|
| `python-dicts` → `python-lists` | Every dict pattern here (counting, grouping, indexing for a join) produces or consumes a list |
| `python-loops` → `python-lists`, `python-dicts` | The idiom being taught is iterating a container's items; `d.items()` is half the point |
| `python-comprehensions` → `python-loops` | A comprehension is defined by the loop it stands for; the nested-clause item is unreadable without that |
| `numpy-arrays` → `python-lists`, `python-loops` | The concept *is* the contrast: list-vs-array semantics for `+`, and the loop that vectorising deletes |
| `numpy-broadcasting` → `numpy-arrays` | Shapes and dtypes have to exist before alignment rules can |
| `pandas-dataframes` → `numpy-arrays`, `python-dicts` | A DataFrame is a dict of Series over a shared index, and a Series is a labelled array |
| `pandas-groupby` → `pandas-dataframes`, `python-comprehensions` | Split-apply-combine needs the frame; `transform` is the group-wise map a comprehension makes concrete |

The one edge deliberately *not* added is `numpy-arrays` → `python-comprehensions`. Vectorising is
routinely motivated by contrast with a comprehension, but requiring comprehensions first would put an
optional syntax in front of the array chapter for the sake of one rhetorical comparison. The items
frame the contrast against an explicit loop instead, which `numpy-arrays` genuinely depends on.

## Authoring principle: the failures that do not raise

A mathematics item is usually wrong in a way that stops: you cannot invert a singular matrix. Python
items are mostly wrong in a way that *runs*. `zip` truncates to the shorter input, `a.sort()` returns
`None`, an out-of-range slice gives `[]`, an integer array truncates a float on assignment, a merge
on a duplicated key doubles the row count, and `groupby` drops rows whose key is missing. Every one
produces a plausible answer and no traceback.

So the distractors here are overwhelmingly plausible-and-silent rather than syntactically impossible,
and several explain-level rubrics require the learner to say what the failure *looks like* when
nothing raises. Drilling the exception cases teaches nothing the interpreter does not already teach
on the first run.

Three transfer items are built on that principle end to end, each a bug that survives review:

| Item | The bug that survives testing |
|---|---|
| `numpy-broadcasting--transfer-silent-transpose` | A shape error that cannot fail on square input, because a `(n,)` reduction broadcasts against either axis |
| `pandas-groupby--transfer-merge-inflated-total` | Duplicated join keys — every row is individually correct, so only an aggregate reveals it |
| `python-loops--transfer-loop-variable-scope` | A loop variable used after the loop; passes every test with a non-empty input |

## Prerequisite closures

Tight, because the chain is short: `python-lists` may draw only on itself. Two items wanted a
downstream idea — the O(1)-membership argument under `python-lists`, and vectorisation cost under
`python-loops` — and are framed in terms the learner already has rather than widening the graph, with
the formal statement left to the concept that owns it.

## Coverage

8 / 8 concepts, 8 live items each, all clearing `verifyItem` with no blockers and no warnings. Every
pool carries recall, apply, explain and transfer, with a difficulty spread of 2.2 logits or more
(bar: 1.5). Each concept also has a wiki article in
[`web/src/data/wiki/python/`](../web/src/data/wiki/python/).
