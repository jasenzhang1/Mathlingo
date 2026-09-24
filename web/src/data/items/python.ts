import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Servable items for the `python` domain — eight concepts, eight live items
 * each, authored directly in typed form (the direction ml-10..12 established;
 * see `assessments/README.md` for why that is recorded rather than hidden).
 *
 * Eight per concept is `auditCoverage`'s bar: at least 8 live, live coverage at
 * recall/apply/explain, and a difficulty spread of 1.5 logits or more. Every
 * pool below clears all three, and each carries at least one `transfer` item.
 *
 * Authoring principle for this domain. A maths item is usually wrong in a way
 * that raises: you cannot half-invert a singular matrix. A Python item is
 * usually wrong in a way that *runs* — zip truncates, a merge duplicates rows,
 * `a.sort()` returns None, a slice past the end gives []. So the distractors
 * here are overwhelmingly plausible-and-silent rather than syntactically
 * impossible, and several explain-level rubrics require the learner to name
 * what the failure looks like when nothing raises. Drilling the exceptions
 * teaches nothing; the interpreter already teaches those.
 *
 * Prerequisite closures are kept tight — an item draws only on its own concept
 * and named ancestors. Where an item genuinely wants a downstream idea (the
 * O(1) membership argument under `python-list-operations`, say) it is framed
 * in terms the learner already has, and the formal statement is left to the
 * concept that owns it.
 *
 * The original `python-lists` and `python-dicts` concepts have since been
 * split into finer ones (`python-lists-intro`, `python-indexing`,
 * `python-slicing`, `python-list-operations`, `python-dictionaries`,
 * `python-sets` — see `items/python-containers-split.ts`); the items below
 * that predate the split were reassigned to whichever of those concepts they
 * actually test, in place.
 */

/** Authored from the concept and its prerequisites, with no external seed. */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-python",
  tier: "generated",
  title: "Mathlingo authored item (Python sweep)",
};

const PYTHON_DOCS: SourceRef = {
  id: "python-docs",
  tier: "open",
  title: "The Python Language Reference and Standard Library documentation",
  url: "https://docs.python.org/3/",
  license: "PSF-2.0",
};

const NUMPY_DOCS: SourceRef = {
  id: "numpy-docs",
  tier: "open",
  title: "NumPy user guide",
  url: "https://numpy.org/doc/stable/user/",
  license: "BSD-3-Clause",
};

const PANDAS_DOCS: SourceRef = {
  id: "pandas-docs",
  tier: "open",
  title: "pandas user guide",
  url: "https://pandas.pydata.org/docs/user_guide/",
  license: "BSD-3-Clause",
};

export const pythonItems: Item[] = [
  // =========================================================================
  // Lists (split across python-indexing / python-slicing / python-list-operations
  // — see the header comment above)
  // =========================================================================
  {
    id: "python-indexing--recall-negative-index",
    conceptId: "python-indexing",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For a non-empty list a, what does `a[-1]` evaluate to?",
    choices: [
      { id: "a", text: "The last element", correct: true },
      {
        id: "b",
        text: "The first element",
        correct: false,
        misconception: {
          id: "negative-wraps-to-front",
          description:
            "Reads `-1` as 'one before the start'. Negative indices count backwards from the end, so `-1` is the last element and `-len(a)` is the first.",
          blameConceptId: "python-indexing",
        },
      },
      {
        id: "c",
        text: "`IndexError` — indices cannot be negative",
        correct: false,
        misconception: {
          id: "negative-is-error",
          description:
            "Imports the C convention, where a negative index is a memory bug. Python defines negative indexing as part of the sequence protocol.",
          blameConceptId: "python-indexing",
        },
      },
      {
        id: "d",
        text: "The element one position before the current one",
        correct: false,
        misconception: {
          id: "index-is-relative",
          description:
            "Treats indexing as relative to some cursor. There is no cursor — an index is always absolute, measured from the start or, if negative, from the end.",
          blameConceptId: "python-indexing",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.0,
    expectedSeconds: 15,
    prereqClosure: ["python-indexing"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-list-operations--recall-sort-returns",
    conceptId: "python-list-operations",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "After running a = `[3, 1, 2]`; a = `a.sort()`, what is a?",
    choices: [
      { id: "a", text: "`None`", correct: true },
      {
        id: "b",
        text: "`[1, 2, 3]`",
        correct: false,
        misconception: {
          id: "sort-returns-list",
          description:
            "Assumes `sort()` returns the sorted list. It sorts in place and returns `None`, so rebinding the name discards the list entirely — and no error is raised.",
          blameConceptId: "python-list-operations",
        },
      },
      {
        id: "c",
        text: "`[3, 1, 2]`",
        correct: false,
        misconception: {
          id: "sort-is-pure",
          description:
            "Assumes `sort()` leaves a alone, as `sorted()` would. It mutates — but the assignment then overwrites the name with the return value anyway.",
          blameConceptId: "python-list-operations",
        },
      },
      {
        id: "d",
        text: "A `TypeError` is raised",
        correct: false,
        misconception: {
          id: "sort-assignment-errors",
          description:
            "Expects the language to catch the mistake. Nothing is ill-typed here; the failure is silent, which is exactly what makes it worth memorising.",
          blameConceptId: "python-list-operations",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.4,
    expectedSeconds: 25,
    prereqClosure: ["python-list-operations"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-slicing--apply-slice-length",
    conceptId: "python-slicing",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "a = `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`. How many elements are in `a[3:8]`?",
    answerKey: 5,
    tolerance: 0,
    difficulty: -1.1,
    discrimination: 1.2,
    expectedSeconds: 20,
    prereqClosure: ["python-slicing"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-slicing--apply-out-of-range-slice",
    conceptId: "python-slicing",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "a has five elements. What do `a[10]` and `a[10:20]` each produce?",
    choices: [
      { id: "a", text: "`a[10]` raises `IndexError`; `a[10:20]` returns `[]`", correct: true },
      {
        id: "b",
        text: "Both raise `IndexError`",
        correct: false,
        misconception: {
          id: "slice-raises-too",
          description:
            "Applies the indexing rule to slicing. A slice clamps to the ends and returns whatever is in range — possibly nothing — rather than raising.",
          blameConceptId: "python-slicing",
        },
      },
      {
        id: "c",
        text: "Both return `None`",
        correct: false,
        misconception: {
          id: "out-of-range-is-none",
          description:
            "Imports a lookup-with-default convention from dicts or from other languages. Neither expression returns `None`.",
          blameConceptId: "python-slicing",
        },
      },
      {
        id: "d",
        text: "`a[10]` returns `None`; `a[10:20]` raises `IndexError`",
        correct: false,
        misconception: {
          id: "rules-reversed",
          description:
            "Has both rules, and has them backwards. Indexing is strict; slicing is forgiving.",
          blameConceptId: "python-slicing",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.5,
    expectedSeconds: 35,
    prereqClosure: ["python-slicing"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-list-operations--apply-aliasing",
    conceptId: "python-list-operations",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "a = `[1, 2, 3]`; b = a; c = `a[:]`; `b.append(4)`; `c.append(5)`. State the final value of a, b and c, and say why b and c behaved differently.",
    rubric: {
      elements: [
        {
          id: "values",
          description:
            "Gives a == [1, 2, 3, 4], b == [1, 2, 3, 4], c == [1, 2, 3, 5].",
          weight: 3,
          required: true,
        },
        {
          id: "binding-vs-copy",
          description:
            "Says that b = a binds a second name to the same list object, whereas a[:] constructs a new list — so the two appends target different objects.",
          weight: 3,
          required: true,
          misconception: {
            id: "assignment-copies",
            description:
              "Believes assignment copies the value. In Python, assignment binds a name to an existing object; only an explicit slice, `copy()` or constructor makes a new one.",
            blameConceptId: "python-list-operations",
          },
        },
        {
          id: "identity",
          description:
            "Bonus: notes that a is b is True while a is c is False, and that equality would not have distinguished them before the appends.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.7,
    expectedSeconds: 90,
    prereqClosure: ["python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-list-operations--apply-repeated-inner-list",
    conceptId: "python-list-operations",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "grid = `[[0] * 3]` * 2, then `grid[0][0]` = 1. What is grid?",
    choices: [
      { id: "a", text: "`[[1, 0, 0], [1, 0, 0]]`", correct: true },
      {
        id: "b",
        text: "`[[1, 0, 0], [0, 0, 0]]`",
        correct: false,
        misconception: {
          id: "outer-multiply-copies",
          description:
            "Assumes the outer * 2 duplicated the inner list. It repeated the reference, so both rows are the same object and one assignment shows up twice.",
          blameConceptId: "python-list-operations",
        },
      },
      {
        id: "c",
        text: "`[[1, 1, 1], [1, 1, 1]]`",
        correct: false,
        misconception: {
          id: "inner-multiply-shares",
          description:
            "Attributes the sharing to the inner `[0]` * 3. Repeating immutable ints is harmless; it is repeating the mutable list that aliases.",
          blameConceptId: "python-list-operations",
        },
      },
      {
        id: "d",
        text: "`TypeError` — a list of lists cannot be multiplied",
        correct: false,
        misconception: {
          id: "nested-multiply-errors",
          description:
            "Expects the construction to be rejected. It is perfectly legal, which is why the bug survives to run time.",
          blameConceptId: "python-list-operations",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.6,
    expectedSeconds: 45,
    prereqClosure: ["python-list-operations"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-slicing--explain-half-open",
    conceptId: "python-slicing",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Python slices exclude their right endpoint: `a[1:4]` returns three elements, not four. Give two concrete properties this convention buys, and explain what would break if the endpoint were inclusive.",
    rubric: {
      elements: [
        {
          id: "length",
          description: "States that len(a[i:j]) == j - i, so a slice's length is readable off its bounds with no adjustment.",
          weight: 3,
          required: true,
        },
        {
          id: "tiling",
          description:
            "States that a[:k] + a[k:] reconstructs a for every k, so adjacent slices tile the list with no overlap and no gap — the property that makes splitting at an index safe.",
          weight: 3,
          required: true,
        },
        {
          id: "what-breaks",
          description:
            "Says that under an inclusive endpoint every split would need a ±1, and a[k:k] would no longer be the natural empty slice — so off-by-one errors would move from a convention you learn once into every call site.",
          weight: 2,
        },
        {
          id: "range-consistency",
          description:
            "Bonus: notes that range(n) and enumerate follow the same half-open convention, so indices and slices agree.",
          weight: 1,
        },
      ],
      forbiddenMoves: [
        {
          id: "restates-rule",
          description: "Restates that the endpoint is excluded without naming a property that follows from it.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.8,
    expectedSeconds: 150,
    prereqClosure: ["python-slicing"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-list-operations--transfer-mutate-while-iterating",
    conceptId: "python-list-operations",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A colleague removes items inside a loop: for x in a: if `bad(x)`: `a.remove(x)`. On a = `[1, 1, 2, 1]` with `bad(x)` meaning x == 1, this leaves `[1, 2]` rather than `[2]`. Explain the mechanism, say why no exception is raised, and give a correct rewrite.",
    rubric: {
      elements: [
        {
          id: "mechanism",
          description:
            "Explains that the loop advances an internal position while remove() shifts the remaining elements down, so each removal makes the iterator skip the element that moved into the vacated slot.",
          weight: 3,
          required: true,
          misconception: {
            id: "iteration-is-by-value",
            description:
              "Believes the loop holds a snapshot of the elements. It holds a position into the live list, which is why mutation during iteration changes what is visited.",
            blameConceptId: "python-list-operations",
          },
        },
        {
          id: "silent",
          description:
            "Says that shortening the list only ends the loop early, so the result is a plausible wrong list rather than an error — the failure mode is silent.",
          weight: 2,
          required: true,
        },
        {
          id: "fix",
          description:
            "Gives a rewrite that does not mutate during iteration: build a new list and rebind (a = [x for x in a if not bad(x)]), or iterate over a copy (for x in a[:]).",
          weight: 3,
          required: true,
        },
        {
          id: "trace",
          description: "Bonus: traces the given example, showing which index is skipped and when the loop stops.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.9,
    expectedSeconds: 180,
    prereqClosure: ["python-list-operations"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Dictionaries and Sets (split across python-dictionaries / python-sets)
  // =========================================================================
  {
    id: "python-dictionaries--recall-missing-key",
    conceptId: "python-dictionaries",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "d is a dict with no key 'z'. What do `d['z']` and `d.get('z')` each do?",
    choices: [
      { id: "a", text: "`d['z']` raises `KeyError`; `d.get('z')` returns `None`", correct: true },
      {
        id: "b",
        text: "Both return `None`",
        correct: false,
        misconception: {
          id: "subscript-is-lenient",
          description:
            "Assumes subscripting has a default. It does not — the strictness of `d[k]` is the point of having `.get()` as a separate method.",
          blameConceptId: "python-dictionaries",
        },
      },
      {
        id: "c",
        text: "Both raise `KeyError`",
        correct: false,
        misconception: {
          id: "get-is-strict",
          description:
            "Treats `.get()` as a synonym for subscripting. Its whole purpose is to return a default instead of raising.",
          blameConceptId: "python-dictionaries",
        },
      },
      {
        id: "d",
        text: "`d['z']` inserts 'z' with value `None` and returns it",
        correct: false,
        misconception: {
          id: "read-inserts",
          description:
            "Describes defaultdict, not dict. A plain dict never grows on a read; only defaultdict inserts on a missing lookup.",
          blameConceptId: "python-dictionaries",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["python-dictionaries"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-dictionaries--recall-hashable-keys",
    conceptId: "python-dictionaries",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of these cannot be used as a dictionary key?",
    choices: [
      { id: "a", text: "A list", correct: true },
      {
        id: "b",
        text: "A tuple of two integers",
        correct: false,
        misconception: {
          id: "tuple-unhashable",
          description:
            "Assumes any container is unhashable. A tuple of hashable elements is itself hashable, which is why coordinate pairs make good keys.",
          blameConceptId: "python-dictionaries",
        },
      },
      {
        id: "c",
        text: "A string",
        correct: false,
        misconception: {
          id: "string-unhashable",
          description:
            "Strings are immutable and hashable — the most common key type there is.",
          blameConceptId: "python-dictionaries",
        },
      },
      {
        id: "d",
        text: "`None`",
        correct: false,
        misconception: {
          id: "none-unhashable",
          description:
            "`None` is a perfectly ordinary hashable singleton and is legal as a key.",
          blameConceptId: "python-dictionaries",
        },
      },
    ],
    difficulty: -0.8,
    discrimination: 1.3,
    expectedSeconds: 25,
    prereqClosure: ["python-dictionaries"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-sets--apply-dedup-count",
    conceptId: "python-sets",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "words = `['ox', 'ant', 'ox', 'bee', 'ant', 'ox']`. How many entries does the dict produced by counting occurrences of each word have?",
    answerKey: 3,
    tolerance: 0,
    difficulty: -1.0,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["python-sets", "python-sets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-dictionaries--apply-grouping-pattern",
    conceptId: "python-dictionaries",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Given a list of words, build a dict mapping each first letter to the list of words starting with it, in one pass. Write the loop and say what setdefault returns.",
    rubric: {
      elements: [
        {
          id: "one-pass",
          description:
            "Gives a single loop over the words — no repeated scan of the input and no nested loop over the keys already seen.",
          weight: 3,
          required: true,
          misconception: {
            id: "quadratic-grouping",
            description:
              "Scans the whole input once per distinct key, or calls `.count()` inside the loop, turning a linear job into a quadratic one.",
            blameConceptId: "python-dictionaries",
          },
        },
        {
          id: "setdefault",
          description:
            "Says that setdefault(k, []) returns the existing list if k is present, and otherwise inserts the empty list and returns that — so the append always targets a real list.",
          weight: 3,
          required: true,
        },
        {
          id: "alternative",
          description:
            "Bonus: names defaultdict(list) as the equivalent, and notes the difference — a defaultdict also inserts on a plain read.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["python-dictionaries", "python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-dictionaries--apply-invert-collision",
    conceptId: "python-dictionaries",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "d maps four distinct keys to values, but two of the keys share the same value. Inverting d with a dict comprehension that swaps keys and values gives a result with how many entries, and why?",
    choices: [
      {
        id: "a",
        text: "Three — the later of the two colliding pairs overwrites the earlier",
        correct: true,
      },
      {
        id: "b",
        text: "Four — every original pair is preserved",
        correct: false,
        misconception: {
          id: "inversion-is-lossless",
          description:
            "Assumes inversion is a bijection. It is only lossless when the values are distinct; duplicated values collapse, silently.",
          blameConceptId: "python-dictionaries",
        },
      },
      {
        id: "c",
        text: "Four — the colliding key maps to a list of both originals",
        correct: false,
        misconception: {
          id: "collision-collects",
          description:
            "Expects dict assignment to accumulate. It replaces. Collecting requires setdefault or a defaultdict, written deliberately.",
          blameConceptId: "python-dictionaries",
        },
      },
      {
        id: "d",
        text: "A `KeyError` is raised on the duplicate",
        correct: false,
        misconception: {
          id: "duplicate-raises",
          description:
            "Expects a duplicate key to be rejected. Assignment to an existing key is the ordinary update path and never raises.",
          blameConceptId: "python-dictionaries",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 50,
    prereqClosure: ["python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-sets--explain-set-membership",
    conceptId: "python-sets",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "A function checks each of m query values for membership in a collection of n stored values. Explain how the cost changes when the collection is a set rather than a list, and what property of the data structure is responsible.",
    rubric: {
      elements: [
        {
          id: "costs",
          description:
            "States that a list membership test scans, costing O(n) per query and O(nm) overall, while a set test is O(1) on average, giving O(m) overall (plus O(n) to build the set).",
          weight: 3,
          required: true,
        },
        {
          id: "mechanism",
          description:
            "Attributes the difference to hashing: the set computes hash(x) and inspects one bucket, so the number of comparisons does not grow with n, whereas the list has no structure to exploit and must compare against each element.",
          weight: 3,
          required: true,
          misconception: {
            id: "set-is-just-faster",
            description:
              "Asserts a set is faster without naming hashing. Without the mechanism the claim does not predict when it fails — an unhashable element, or a pathological hash.",
            blameConceptId: "python-sets",
          },
        },
        {
          id: "when-not-worth-it",
          description:
            "Bonus: notes that building the set costs O(n), so a single lookup against a list is not worth converting; the win needs m to be large enough to amortise it.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "claims-guaranteed-o1",
          description:
            "Claims O(1) worst case. Hash lookup is O(1) on average; adversarial or degenerate hashing degrades it.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.8,
    expectedSeconds: 150,
    prereqClosure: ["python-sets", "python-sets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-sets--explain-why-hashable",
    conceptId: "python-sets",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Why does Python refuse to let a list be a dictionary key, when a tuple of the same elements is allowed?",
    rubric: {
      elements: [
        {
          id: "hash-location",
          description:
            "Explains that a dict locates an entry by its key's hash, so the hash must not change while the entry is stored.",
          weight: 3,
          required: true,
        },
        {
          id: "mutation-breaks-it",
          description:
            "Says that mutating a key would change its hash and leave the entry in a bucket where no lookup would ever look — the entry becomes unreachable rather than merely stale. Forbidding mutable keys is what prevents this.",
          weight: 3,
          required: true,
          misconception: {
            id: "arbitrary-restriction",
            description:
              "Treats the rule as an arbitrary language restriction rather than a consequence of how hash tables find things.",
            blameConceptId: "python-sets",
          },
        },
        {
          id: "tuple-contrast",
          description:
            "Notes that a tuple is immutable so its hash is stable — and that a tuple containing a list is itself unhashable, which shows the rule is about reachable mutability, not about the outer type's name.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.7,
    expectedSeconds: 150,
    prereqClosure: ["python-sets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-dictionaries--transfer-join-two-tables",
    conceptId: "python-dictionaries",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Two lists of records, of length n and m, each have an 'id' field. A colleague pairs them with a nested loop over both lists. Describe the cost, give a dict-based rewrite, and state the assumption the rewrite makes that the nested loop did not.",
    rubric: {
      elements: [
        {
          id: "cost",
          description: "States the nested loop is O(nm) and the rewrite is O(n + m).",
          weight: 2,
          required: true,
        },
        {
          id: "rewrite",
          description:
            "Builds a lookup dict keyed by id from one list in a single pass, then walks the other list doing O(1) lookups.",
          weight: 3,
          required: true,
        },
        {
          id: "assumption",
          description:
            "Names the assumption the dict version smuggles in: ids must be unique in the indexed list, since a repeated id overwrites. The nested loop would have emitted every matching pair. Keeping that behaviour means a dict of lists, not a dict of records.",
          weight: 3,
          required: true,
          misconception: {
            id: "index-loses-duplicates",
            description:
              "Replaces a many-to-many pairing with a one-to-one lookup and silently drops matches. This is the same failure a pandas merge makes visible as a changed row count.",
            blameConceptId: "python-dictionaries",
          },
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.9,
    expectedSeconds: 200,
    prereqClosure: ["python-dictionaries", "python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Loops, enumerate, and zip
  // =========================================================================
  {
    id: "python-loops--recall-enumerate-yields",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does each step of `for t in enumerate(a)` bind t to?",
    choices: [
      { id: "a", text: "A tuple of (index, element)", correct: true },
      {
        id: "b",
        text: "A tuple of (element, index)",
        correct: false,
        misconception: {
          id: "enumerate-order-reversed",
          description:
            "Has the pair the wrong way round. Unpacking it as `for i, x in ...` would then put the element in i and the index in x — and both names would still be bound, so nothing raises until the values are used.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "c",
        text: "Just the index",
        correct: false,
        misconception: {
          id: "enumerate-is-range",
          description:
            "Treats enumerate as `range(len(a))`. It yields both parts, which is the entire reason it exists.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "d",
        text: "Just the element, with the index available as t.index",
        correct: false,
        misconception: {
          id: "enumerate-attribute",
          description:
            "Invents an attribute. enumerate yields plain tuples with no extra structure.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["python-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-dict-iteration",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Iterating a dict directly, as in `for x in d`, yields what?",
    choices: [
      { id: "a", text: "The keys", correct: true },
      {
        id: "b",
        text: "The values",
        correct: false,
        misconception: {
          id: "iterates-values",
          description:
            "Guesses values. The default is keys — `d.values()` is the explicit way to ask for values, and `d.items()` for both.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "c",
        text: "(key, value) pairs",
        correct: false,
        misconception: {
          id: "iterates-items",
          description:
            "Assumes iteration means `.items()`. Unpacking the result as `for k, v in d` then fails, or worse, unpacks a two-character string key into two names.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "d",
        text: "Nothing — a dict is not iterable",
        correct: false,
        misconception: {
          id: "dict-not-iterable",
          description: "A dict is iterable; its iterator is over the keys.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -1.1,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["python-loops", "python-dictionaries"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--apply-zip-truncation-count",
    conceptId: "python-loops",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "names has 7 entries and scores has 5. How many pairs does `zip(names, scores)` yield?",
    answerKey: 5,
    tolerance: 0,
    difficulty: -0.7,
    discrimination: 1.4,
    expectedSeconds: 25,
    prereqClosure: ["python-loops", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--apply-enumerate-start",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "a = `['p', 'q', 'r']`. What does `for i, x in enumerate(a, 1)` produce on its first step, and what happens if the body evaluates `a[i]`?",
    choices: [
      {
        id: "a",
        text: "i = 1, x = 'p'; `a[i]` reads 'q' — one element past x, and the last step raises `IndexError`",
        correct: true,
      },
      {
        id: "b",
        text: "i = 1, x = 'q'; enumerate skips the first element",
        correct: false,
        misconception: {
          id: "start-skips-element",
          description:
            "Believes start advances the position read. It only renumbers the label; iteration still begins at `a[0]`.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "c",
        text: "i = 1, x = 'p'; `a[i]` reads 'p', since the numbering was adjusted to match",
        correct: false,
        misconception: {
          id: "start-reindexes-container",
          description:
            "Assumes the container is renumbered too. Nothing about a changes; only the counter enumerate reports does.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "d",
        text: "`TypeError` — enumerate takes only one argument",
        correct: false,
        misconception: {
          id: "no-start-argument",
          description: "enumerate accepts an optional start; the two-argument form is standard.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.6,
    expectedSeconds: 60,
    prereqClosure: ["python-loops", "python-list-operations"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--apply-transpose-with-zip",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "rows = `[[1, 2, 3], [4, 5, 6]]`. State what `zip(*rows)` yields, and explain what the * is doing.",
    rubric: {
      elements: [
        {
          id: "result",
          description: "Says it yields (1, 4), (2, 5), (3, 6) — the columns, as tuples.",
          weight: 3,
          required: true,
        },
        {
          id: "unpacking",
          description:
            "Explains that * unpacks the list of rows into separate arguments, so zip receives the two rows as two iterables rather than one list of lists.",
          weight: 3,
          required: true,
          misconception: {
            id: "star-is-an-operator",
            description:
              "Reads * as arithmetic or as a wildcard. In a call it is argument unpacking, which is what turns a container of iterables into zip's several parameters.",
            blameConceptId: "python-loops",
          },
        },
        {
          id: "tuples-not-lists",
          description:
            "Bonus: notes that the results are tuples, not lists, and that ragged rows would be truncated to the shortest.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["python-loops", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--explain-why-not-range-len",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Idiomatic Python prefers `for x in a` over `for i in range(len(a))`. Beyond brevity, give a substantive reason, and name the case where an index is genuinely needed and what to reach for instead.",
    rubric: {
      elements: [
        {
          id: "generality",
          description:
            "Says the item form works on anything iterable, while range(len(a)) requires the object to support len() and integer indexing — ruling out generators, files, and other lazily produced sequences.",
          weight: 3,
          required: true,
          misconception: {
            id: "only-style",
            description:
              "Treats the preference as purely cosmetic. It is a difference in what the loop will accept as input, which is why the index form breaks when a list is later replaced by a stream.",
            blameConceptId: "python-loops",
          },
        },
        {
          id: "enumerate-zip",
          description:
            "Names enumerate for when the position is genuinely needed, and zip for walking two sequences in step — the two cases range(len(...)) is usually standing in for.",
          weight: 3,
          required: true,
        },
        {
          id: "off-by-one",
          description:
            "Bonus: notes that the index form reintroduces bounds arithmetic the item form has no way to get wrong.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.7,
    expectedSeconds: 150,
    prereqClosure: ["python-loops", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--explain-zip-silence",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "A parser drops one malformed row, so a names column has 5,000 entries and a scores column has 4,999. The pipeline pairs them with zip and reports a mean score. Explain what goes wrong, why nothing raises, and how to make the failure loud.",
    rubric: {
      elements: [
        {
          id: "truncation",
          description:
            "States that zip stops at the shorter iterable, so one name is silently dropped and the pairing after the missing row may be shifted if the omission was not at the end.",
          weight: 3,
          required: true,
        },
        {
          id: "why-silent",
          description:
            "Explains that stopping early is zip's defined behaviour, not an error condition, so the result is a shorter but perfectly well-formed sequence — the mean is computed over the wrong rows and looks entirely reasonable.",
          weight: 3,
          required: true,
          misconception: {
            id: "expects-length-check",
            description:
              "Assumes zip validates lengths. Nothing in the language checks that two columns describe the same rows; that invariant is the caller's to assert.",
            blameConceptId: "python-loops",
          },
        },
        {
          id: "fix",
          description:
            "Gives a loud alternative: zip(..., strict=True) to raise on a length mismatch, or an explicit assert len(names) == len(scores) before pairing.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "pad-instead",
          description:
            "Proposes padding the short column (or zip_longest) as the fix, which manufactures data to hide a parse failure rather than surfacing it.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.9,
    expectedSeconds: 180,
    prereqClosure: ["python-loops", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--transfer-loop-variable-scope",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A function loops `for row in rows:` and afterwards uses `row` to build its return value. It works in testing and raises `NameError` in production. Explain what input triggers it, why the code passed testing, and what the loop-variable rule is.",
    rubric: {
      elements: [
        {
          id: "empty-input",
          description: "Identifies an empty rows as the trigger: the body never runs, so row is never bound.",
          weight: 3,
          required: true,
        },
        {
          id: "rule",
          description:
            "States the rule: a for statement's loop variable is an ordinary local that survives the loop, holding the last element — it is not scoped to the loop body, and it is not initialised if the loop does not run.",
          weight: 3,
          required: true,
          misconception: {
            id: "loop-var-scoped",
            description:
              "Believes the loop variable is scoped to the loop, as in many other languages. In Python it leaks — which is what makes the after-the-loop usage look reasonable in the first place.",
            blameConceptId: "python-loops",
          },
        },
        {
          id: "testing",
          description:
            "Explains that tests exercised non-empty inputs, where the last element happened to be the right one, so the latent dependence on a non-empty loop was invisible.",
          weight: 2,
        },
        {
          id: "contrast",
          description:
            "Bonus: contrasts with a comprehension, whose loop variable does not leak, so the same mistake is impossible there.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.8,
    expectedSeconds: 180,
    prereqClosure: ["python-loops", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },

  {
    id: "python-loops--recall-enumerate-default-start",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`for i, x in enumerate(['a', 'b']):` — what is `i` on the first pass, by default?",
    choices: [
      { id: "a", text: "`0`", correct: true },
      {
        id: "b",
        text: "`1`",
        correct: false,
        misconception: {
          id: "assumes-enumerate-defaults-to-one",
          description: "`enumerate`'s default starting count is `0`, matching Python's usual zero-based indexing — an explicit `start=1` is needed to begin counting from `1`.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 0.9,
    expectedSeconds: 15,
    prereqClosure: ["python-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-zip-needs-multiple-iterables",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `zip(a, b)` produce, for two lists `a` and `b` of the same length?",
    choices: [
      { id: "a", text: "An iterator of paired tuples: `(a[0], b[0]), (a[1], b[1]), ...`", correct: true },
      {
        id: "b",
        text: "A single flattened list combining both, like `a + b`",
        correct: false,
        misconception: {
          id: "confuses-zip-with-concatenation",
          description: "`zip` pairs up corresponding elements from each iterable into tuples — it doesn't concatenate the inputs end-to-end.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["python-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-enumerate-needs-unpacking",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`for pair in enumerate(['a', 'b']):` (no unpacking into two names). What is `pair` on the first pass?",
    choices: [
      { id: "a", text: "The tuple `(0, 'a')`", correct: true },
      {
        id: "b",
        text: "Just `'a'`, with the index discarded",
        correct: false,
        misconception: {
          id: "assumes-enumerate-drops-index-without-unpacking",
          description: "`enumerate` always yields `(index, value)` tuples — if you don't unpack into two names, you simply get the whole tuple bound to one name instead.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["python-loops", "python-tuples"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-zip-with-three-iterables",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Can `zip` take more than two iterables, like `zip(a, b, c)`?",
    choices: [
      { id: "a", text: "Yes — `zip` accepts any number of iterables and pairs them up positionally into tuples", correct: true },
      {
        id: "b",
        text: "No — `zip` is limited to exactly two iterables",
        correct: false,
        misconception: {
          id: "assumes-zip-limited-to-two",
          description: "`zip` isn't limited to two arguments — it can take any number of iterables and produces one tuple per position combining an element from each.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["python-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-break-applies-to-nearest-loop",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Inside a `for` loop nested inside a `while` loop, does `break` exit just the `for`, or both loops?",
    choices: [
      { id: "a", text: "Just the `for` — the nearest enclosing loop only", correct: true },
      {
        id: "b",
        text: "Both — `break` exits every loop it's nested inside",
        correct: false,
        misconception: {
          id: "assumes-break-exits-all-nesting-levels",
          description: "`break` (like `continue`) only affects the single nearest enclosing loop, regardless of the loop type — the outer loop keeps running.",
          blameConceptId: "python-for-loops",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["python-loops", "python-for-loops", "python-while-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-items-unpacks-key-value",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`d = {\"a\": 1, \"b\": 2}`. What does `for k, v in d.items():` bind on its first pass?",
    choices: [
      { id: "a", text: "`k = \"a\"`, `v = 1`", correct: true },
      {
        id: "b",
        text: "`k` and `v` both to the tuple `(\"a\", 1)`",
        correct: false,
        misconception: {
          id: "assumes-items-loop-doesnt-unpack",
          description: "Naming two variables before `in` unpacks each `(key, value)` tuple `.items()` yields — `k` gets the key, `v` gets the value, not the whole pair duplicated into both.",
          blameConceptId: "python-dictionaries",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["python-loops", "python-dictionaries"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-enumerate-works-on-any-iterable",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Does `enumerate()` only work on lists, or can it wrap any iterable (a string, a set, a `range`, ...)?",
    choices: [
      { id: "a", text: "Any iterable — `enumerate` isn't restricted to lists", correct: true },
      {
        id: "b",
        text: "Only lists — other iterables raise a `TypeError`",
        correct: false,
        misconception: {
          id: "restricts-enumerate-to-lists",
          description: "`enumerate()` accepts any iterable — strings, sets, ranges, generators, and more all work fine.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -1.1,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["python-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-loop-variable-name-arbitrary",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`for banana in [1, 2, 3]: print(banana)`. Is `banana` a special keyword here, or just an ordinary chosen variable name?",
    choices: [
      { id: "a", text: "An ordinary variable name — any legal identifier works as the loop variable", correct: true },
      {
        id: "b",
        text: "It must match the name of the iterable's elements in some way",
        correct: false,
        misconception: {
          id: "assumes-loop-var-name-must-relate-to-elements",
          description: "The loop variable's name has no required relationship to what it holds — it's chosen freely by the programmer, like any other variable name.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 0.9,
    expectedSeconds: 15,
    prereqClosure: ["python-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-zip-star-unzip",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`pairs = [(1, 'a'), (2, 'b')]`. What does `zip(*pairs)` do?",
    choices: [
      { id: "a", text: "'Unzips' the pairs into separate groups: `(1, 2)` and `('a', 'b')`", correct: true },
      {
        id: "b",
        text: "Raises a `TypeError` — `zip` can't take a single list argument this way",
        correct: false,
        misconception: {
          id: "assumes-star-unpack-invalid-for-zip",
          description: "`*pairs` unpacks the list into separate positional arguments to `zip`, which then re-groups by position across them — a legal and common 'unzip' idiom.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-loops", "python-list-operations"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-for-continue-vs-while-continue-same-meaning",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Does `continue` mean something different inside a `for` loop compared to a `while` loop?",
    choices: [
      { id: "a", text: "No — in both, it skips the rest of the current iteration's body and moves on", correct: true },
      {
        id: "b",
        text: "Yes — inside a `for` loop, `continue` skips two iterations instead of one",
        correct: false,
        misconception: {
          id: "invents-for-specific-continue-behavior",
          description: "`continue` behaves identically in `for` and `while` loops — it always just skips to the next iteration, one step at a time.",
          blameConceptId: "python-for-loops",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.0,
    expectedSeconds: 15,
    prereqClosure: ["python-loops", "python-for-loops", "python-while-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-nested-loop-total-iterations",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`for i in range(3):\n    for j in range(4):\n        ...`\nHow many times does the innermost line run in total?",
    choices: [
      { id: "a", text: "`12` — 3 times 4", correct: true },
      {
        id: "b",
        text: "`7` — 3 plus 4",
        correct: false,
        misconception: {
          id: "adds-instead-of-multiplies-nested-iterations",
          description: "Nested loops multiply, not add — the inner loop runs its full 4 passes for *each* of the outer loop's 3 passes, giving 12 total.",
          blameConceptId: "python-for-loops",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-loops", "python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--recall-reversed-builtin",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `reversed([1, 2, 3])` produce?",
    choices: [
      { id: "a", text: "An iterator that yields `3, 2, 1`", correct: true },
      {
        id: "b",
        text: "The same list, `[1, 2, 3]`, unchanged, since `reversed` only works on strings",
        correct: false,
        misconception: {
          id: "assumes-reversed-only-for-strings",
          description: "`reversed()` works on any sequence, lists included, and produces an iterator walking it back to front — it doesn't return the original unchanged.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["python-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-sorted-with-key-function",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`words = [\"bb\", \"a\", \"ccc\"]`. What does `sorted(words, key=len)` sort by?",
    choices: [
      { id: "a", text: "Each word's length, not its alphabetical order", correct: true },
      {
        id: "b",
        text: "Alphabetical order, with `key=len` ignored",
        correct: false,
        misconception: {
          id: "ignores-key-argument",
          description: "The `key` argument tells `sorted` what to compute from each element to sort *by* — here, each word's length rather than the word's own alphabetical value.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-loops", "python-functions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-any-all-builtins",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`nums = [2, 4, 6]`. What does `all(n % 2 == 0 for n in nums)` evaluate to?",
    choices: [
      { id: "a", text: "`True` — every element satisfies the condition", correct: true },
      {
        id: "b",
        text: "`False`, since `all` requires every element to be exactly equal",
        correct: false,
        misconception: {
          id: "misreads-all-semantics",
          description: "`all(...)` returns `True` exactly when every element of the given iterable of booleans is truthy — here, every number is even, so the condition holds for all of them.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-loops", "python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--explain-enumerate-vs-manual-counter-again",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Rewrite `i = 0\nfor x in items:\n    print(i, x)\n    i += 1` using `enumerate`, and state precisely what bug class this rewrite eliminates.",
    rubric: {
      elements: [
        {
          id: "rewrite",
          description: "Gives for i, x in enumerate(items): print(i, x).",
          weight: 2,
          required: true,
        },
        {
          id: "bug-class",
          description: "Explains it eliminates the possibility of the counter drifting out of sync with the actual loop position — e.g. forgetting the increment, incrementing in the wrong place relative to a continue, or incrementing twice — since enumerate maintains the count correctly by construction.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-rewrite-as-purely-cosmetic",
            description: "Treats the enumerate rewrite as purely a style preference with no correctness benefit over the hand-tracked counter.",
            blameConceptId: "python-loops",
          },
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["python-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--explain-nested-loop-vs-single-loop-over-product",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "`for i in range(3): for j in range(4): ...` and `for i, j in itertools.product(range(3), range(4)): ...` both visit the same 12 (i, j) pairs. Explain what changes about the code's shape between the two, and one situation where the nested form is still preferable.",
    rubric: {
      elements: [
        {
          id: "shape-difference",
          description: "Explains the itertools.product form flattens two levels of nested indentation into a single loop with a paired loop variable, which reads as 'iterate over these 12 combinations' directly rather than making the reader mentally multiply out two nested ranges.",
          weight: 3,
          required: true,
        },
        {
          id: "nested-still-preferable-case",
          description: "Names a case where nesting is still preferable: when the inner loop's range or behavior actually depends on the outer variable (e.g. a triangular iteration where j only goes up to i), which a flat product over independent ranges can't express directly.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-flattening-always-strictly-better",
            description: "Assumes the flattened product form is strictly superior in every case, missing that it only applies cleanly when the two loop ranges are independent of each other.",
            blameConceptId: "python-loops",
          },
        },
      ],
    },
    difficulty: 0.55,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["python-loops", "python-for-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--explain-early-exit-vs-filter-comprehension",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A search loop uses `break` to stop as soon as it finds a match. Explain why this early exit can be more efficient than building a full list with a comprehension and then taking its first element, and name the situation where the difference doesn't matter.",
    rubric: {
      elements: [
        {
          id: "efficiency-argument",
          description: "Explains break stops the loop the moment a match is found, doing no further work, whereas [x for x in a if matches(x)][0] would (unless a generator or similar is used) walk and test every single element to build the whole list before ever looking at the first result.",
          weight: 3,
          required: true,
        },
        {
          id: "when-it-doesnt-matter",
          description: "Names a case where the difference is negligible: a small collection, or one where the match is expected near the very end anyway, so the wasted work is trivial regardless of approach.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-comprehension-always-lazy",
            description: "Assumes a list comprehension short-circuits the way break does, missing that it must be fully evaluated (unless replaced with a generator expression and next()) before any element of the result is available.",
            blameConceptId: "python-comprehensions",
          },
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["python-loops", "python-comprehensions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--transfer-numpy-loop-becomes-vectorized-op",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "`for i in range(len(a)): c[i] = a[i] + b[i]`, over equal-length NumPy arrays `a`, `b`, `c`. What single vectorized expression replaces this entire loop?",
    choices: [
      { id: "a", text: "`c = a + b`", correct: true },
      {
        id: "b",
        text: "There's no way to avoid the explicit loop for elementwise combination of two arrays",
        correct: false,
        misconception: {
          id: "assumes-elementwise-combination-requires-loop",
          description: "Elementwise combination across two same-shaped arrays is exactly what NumPy's operator overloading is for — `a + b` performs the whole loop's worth of additions in one vectorized call.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["python-loops", "numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--transfer-groupby-is-a-structured-loop",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A pandas `df.groupby(\"category\")` followed by `.sum()` accomplishes what a `for` loop with a dict accumulator (grouping rows by category, summing a column per group) would do by hand. Explain the correspondence, and name one thing `groupby` handles automatically that the hand-written loop would need to manage explicitly.",
    rubric: {
      elements: [
        {
          id: "correspondence",
          description: "Explains groupby(\"category\") is conceptually the same operation as looping over rows and bucketing each one into a dict keyed by its category value, with .sum() playing the role of accumulating a running total per bucket.",
          weight: 3,
          required: true,
        },
        {
          id: "handled-automatically",
          description: "Names something groupby manages that the manual loop wouldn't get for free, e.g. initializing a new accumulator the first time a previously-unseen category is encountered (equivalent to setdefault/defaultdict), aligning columns correctly across groups, or producing a nicely indexed result at the end.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-groupby-as-unrelated-magic",
            description: "Treats groupby as an unrelated black-box operation rather than recognizing it as a structured, optimized version of the same group-and-accumulate loop pattern.",
            blameConceptId: "pandas-groupby",
          },
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["python-loops", "pandas-groupby"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Comprehensions
  // =========================================================================
  {
    id: "python-comprehensions--recall-paren-form",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the type of (x * 2 for x in a)?",
    choices: [
      { id: "a", text: "A generator", correct: true },
      {
        id: "b",
        text: "A tuple",
        correct: false,
        misconception: {
          id: "parens-make-tuple",
          description:
            "Reasons by analogy from `[]` giving a list. Parentheses around a comprehension give a lazy generator; a tuple needs `tuple(...)` explicitly.",
          blameConceptId: "python-comprehensions",
        },
      },
      {
        id: "c",
        text: "A list",
        correct: false,
        misconception: {
          id: "parens-are-grouping",
          description:
            "Reads the parentheses as mere grouping. They select the generator form, whose behaviour differs from a list in two ways that matter: it is lazy, and it can be consumed only once.",
          blameConceptId: "python-comprehensions",
        },
      },
      {
        id: "d",
        text: "A set",
        correct: false,
        misconception: {
          id: "parens-make-set",
          description: "Braces give a set. Parentheses give a generator.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.3,
    expectedSeconds: 25,
    prereqClosure: ["python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-filter-length",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "For a list a of length n, compare the lengths of `[x for x in a if x > 0]` and `[x if x > 0 else 0 for x in a]`.",
    choices: [
      { id: "a", text: "The first is at most n; the second is exactly n", correct: true },
      {
        id: "b",
        text: "Both are exactly n",
        correct: false,
        misconception: {
          id: "trailing-if-maps",
          description:
            "Treats the trailing if as a mapping condition. A trailing if filters: elements failing it produce no output at all.",
          blameConceptId: "python-comprehensions",
        },
      },
      {
        id: "c",
        text: "Both are at most n",
        correct: false,
        misconception: {
          id: "leading-if-filters",
          description:
            "Treats the leading if...else as a filter. It is a conditional expression choosing between two outputs, so every element still yields exactly one.",
          blameConceptId: "python-comprehensions",
        },
      },
      {
        id: "d",
        text: "The first is exactly n; the second is at most n",
        correct: false,
        misconception: {
          id: "roles-reversed",
          description: "Has both rules and has them backwards — the position of the if is the tell, and so is the presence of an else.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["python-comprehensions", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--apply-count-output",
    conceptId: "python-comprehensions",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "a = `[-3, 0, 2, -1, 5, 4]`. How many elements are in `[x * x for x in a if x > 0]`?",
    answerKey: 3,
    tolerance: 0,
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-comprehensions", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--apply-nested-order",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "grid = `[[1, 2], [3, 4]]`. State the output of `[x for row in grid for x in row]`, and say what would happen if the two for clauses were written in the opposite order.",
    rubric: {
      elements: [
        {
          id: "output",
          description: "Gives [1, 2, 3, 4] — one level of nesting flattened, in row-major order.",
          weight: 3,
          required: true,
        },
        {
          id: "clause-order",
          description:
            "Explains that the for clauses read left to right as outer-to-inner loops, so reversing them uses `row` before it is bound and raises NameError.",
          weight: 3,
          required: true,
          misconception: {
            id: "reads-right-to-left",
            description:
              "Reads the clauses right to left, by analogy with the output expression sitting at the front. The clause order matches ordinary nested-loop order; only the output expression is displaced.",
            blameConceptId: "python-comprehensions",
          },
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["python-comprehensions", "python-loops", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--apply-generator-exhaustion",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "g = (x for x in `[1, 2, 3]`). A script calls `sum(g)`, then `sum(g)` again. What are the two results?",
    choices: [
      { id: "a", text: "6, then 0", correct: true },
      {
        id: "b",
        text: "6, then 6",
        correct: false,
        misconception: {
          id: "generator-rewinds",
          description:
            "Treats the generator as a container that can be re-iterated. It is a one-pass iterator: once consumed it yields nothing, and sum of nothing is 0.",
          blameConceptId: "python-comprehensions",
        },
      },
      {
        id: "c",
        text: "6, then a `StopIteration` is raised",
        correct: false,
        misconception: {
          id: "exhaustion-raises",
          description:
            "Expects exhaustion to surface as an exception. `sum()` absorbs `StopIteration` and returns its start value, so the second call succeeds with a wrong-looking 0.",
          blameConceptId: "python-comprehensions",
        },
      },
      {
        id: "d",
        text: "A `TypeError` on the first call — a generator has no length",
        correct: false,
        misconception: {
          id: "sum-needs-length",
          description:
            "`sum()` iterates and needs no length. It is `len(g)` that would be a `TypeError`.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.7,
    expectedSeconds: 60,
    prereqClosure: ["python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--explain-when-not-to",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Give two situations where an explicit for loop is the better choice than a comprehension, and justify each in terms of what a comprehension cannot express or cannot communicate.",
    rubric: {
      elements: [
        {
          id: "cannot-express",
          description:
            "Names something a comprehension genuinely cannot contain — try/except, an early break, or a statement such as an assignment or a log call.",
          weight: 3,
          required: true,
        },
        {
          id: "cannot-communicate",
          description:
            "Names a case where it is expressible but unreadable: several filters plus a nested for, or a body whose purpose is a side effect, where a comprehension whose result is discarded misleads the reader about what the line is for.",
          weight: 3,
          required: true,
          misconception: {
            id: "comprehension-always-better",
            description:
              "Treats the comprehension as strictly superior. Its advantage is that the result's shape is visible up front; where there is no result being built, that advantage does not apply.",
            blameConceptId: "python-comprehensions",
          },
        },
        {
          id: "memory",
          description:
            "Bonus: notes that a list comprehension materialises everything, so for a large input consumed once a generator expression or a plain loop avoids the allocation.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.7,
    expectedSeconds: 150,
    prereqClosure: ["python-comprehensions", "python-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--explain-scope",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "A for statement leaves its loop variable bound after the loop; a comprehension does not. Explain the difference and why the comprehension's behaviour is the safer default.",
    rubric: {
      elements: [
        {
          id: "own-scope",
          description:
            "States that a comprehension executes in its own implicit scope, so its loop variable is local to it and any outer binding of the same name is untouched.",
          weight: 3,
          required: true,
        },
        {
          id: "why-safer",
          description:
            "Argues that a comprehension is an expression appearing anywhere an expression may appear, so leaking would let an innocuous-looking subexpression silently clobber a caller's variable.",
          weight: 3,
          required: true,
          misconception: {
            id: "same-scoping",
            description:
              "Assumes both forms scope alike. They differ, and the difference is why a comprehension is safe to drop into an argument list and a for statement is not.",
            blameConceptId: "python-comprehensions",
          },
        },
        {
          id: "consequence",
          description:
            "Bonus: notes the practical consequence — code relying on the loop variable after a for statement cannot be converted to a comprehension without restructuring.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["python-comprehensions", "python-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--transfer-rewrite-mutating-loop",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Rewrite `for x in a: if bad(x): a.remove(x)` as a comprehension, and explain why the comprehension form cannot exhibit the skipped-element bug the original has.",
    rubric: {
      elements: [
        {
          id: "rewrite",
          description: "Gives a = [x for x in a if not bad(x)].",
          weight: 3,
          required: true,
        },
        {
          id: "why-safe",
          description:
            "Explains that the comprehension reads the original list once, building a separate list, and only rebinds the name afterwards — so nothing is mutated while it is being iterated and no position can shift underneath the iterator.",
          weight: 3,
          required: true,
          misconception: {
            id: "comprehension-mutates-in-place",
            description:
              "Believes the comprehension edits the list in place. It constructs a new list; the in-place appearance comes entirely from rebinding the same name.",
            blameConceptId: "python-comprehensions",
          },
        },
        {
          id: "aliasing-caveat",
          description:
            "Notes the one behavioural difference that matters: because it rebinds rather than mutating, any other name still pointing at the original list will not see the change — a[:] = [...] preserves the original in-place semantics if that is required.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.9,
    expectedSeconds: 200,
    prereqClosure: ["python-comprehensions", "python-loops", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },

  {
    id: "python-comprehensions--recall-list-comprehension-brackets",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which brackets does a list comprehension use?",
    choices: [
      { id: "a", text: "Square brackets: `[x for x in a]`", correct: true },
      {
        id: "b",
        text: "Curly braces: `{x for x in a}`",
        correct: false,
        misconception: {
          id: "confuses-list-comp-brackets-with-set",
          description: "Curly braces with no colon build a *set* comprehension — a list comprehension uses square brackets.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 0.9,
    expectedSeconds: 10,
    prereqClosure: ["python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-dict-comprehension-brackets",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which syntax builds a dict comprehension?",
    choices: [
      { id: "a", text: "`{k: v for k, v in pairs}` — curly braces with a `key: value` pair", correct: true },
      {
        id: "b",
        text: "`[k: v for k, v in pairs]` — square brackets with a `key: value` pair",
        correct: false,
        misconception: {
          id: "uses-square-brackets-for-dict-comp",
          description: "A dict comprehension needs curly braces — square brackets build a list, and a colon inside square brackets isn't valid comprehension syntax at all.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["python-comprehensions", "python-dictionaries"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-comprehension-produces-eager-list",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Is a list comprehension's result computed immediately (all at once), or lazily as it's consumed?",
    choices: [
      { id: "a", text: "Immediately — a list comprehension builds the entire list right away", correct: true },
      {
        id: "b",
        text: "Lazily — elements are computed one at a time only as they're accessed",
        correct: false,
        misconception: {
          id: "confuses-list-comp-with-generator-laziness",
          description: "Laziness is what a *generator expression* (parentheses instead of brackets) gives you — a list comprehension is eager and materializes the whole list up front.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-output-expression-position",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In `[x * 2 for x in a]`, which part is the 'output expression' — what gets computed and collected for each element?",
    choices: [
      { id: "a", text: "`x * 2`, at the very front", correct: true },
      {
        id: "b",
        text: "`x`, right after `for`",
        correct: false,
        misconception: {
          id: "misidentifies-output-expression-position",
          description: "The expression right after `for` is just the loop variable's name — the output expression, the thing actually collected into the result, sits at the front of the comprehension.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-comprehension-can-nest-loops",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Can a single comprehension have more than one `for` clause, like `[x for row in grid for x in row]`?",
    choices: [
      { id: "a", text: "Yes — multiple `for` clauses express nested loops in one comprehension", correct: true },
      {
        id: "b",
        text: "No — a comprehension is limited to exactly one `for` clause",
        correct: false,
        misconception: {
          id: "assumes-comprehension-limited-to-one-for",
          description: "A comprehension can chain as many `for` clauses as needed, each one nesting inside the previous — this is exactly how flattening a nested list is written as a single comprehension.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-set-comprehension-dedupes",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`{x % 3 for x in range(6)}`. Does the resulting set contain duplicate remainders?",
    choices: [
      { id: "a", text: "No — a set comprehension automatically collapses duplicate results into one entry", correct: true },
      {
        id: "b",
        text: "Yes — set comprehensions preserve every computed value, including repeats",
        correct: false,
        misconception: {
          id: "assumes-set-comp-keeps-duplicates",
          description: "The result is a `set`, so duplicate values collapse to a single entry, exactly as adding the same element to a set twice has no additional effect.",
          blameConceptId: "python-sets",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["python-comprehensions", "python-sets"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-comprehension-can-call-functions",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Can the output expression of a comprehension call a function, like `[str(x) for x in a]`?",
    choices: [
      { id: "a", text: "Yes — the output expression can be any valid expression, including a function call", correct: true },
      {
        id: "b",
        text: "No — comprehensions can only contain arithmetic on the loop variable",
        correct: false,
        misconception: {
          id: "restricts-comprehension-output-to-arithmetic",
          description: "The output expression of a comprehension is any ordinary Python expression — arithmetic, a function call, a method call, an f-string, anything.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["python-comprehensions", "python-functions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-generator-expression-no-brackets-needed-in-call",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`sum(x * x for x in range(4))` — no extra parentheses around the generator expression, unlike `sum((x * x for x in range(4)))`. Is the first form legal?",
    choices: [
      { id: "a", text: "Yes — when a generator expression is the sole argument to a function call, the call's own parentheses double as the generator's, and the extra pair is optional", correct: true },
      {
        id: "b",
        text: "No — a generator expression always needs its own explicit parentheses, even as a lone function argument",
        correct: false,
        misconception: {
          id: "assumes-generator-always-needs-own-parens",
          description: "Python allows dropping the generator's own parentheses specifically when it is the single argument to a call — `sum(x for x in a)` and `sum((x for x in a))` are both legal and equivalent.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-comprehension-scope-isolated",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`x = \"outer\"; squares = [x * x for x in range(3)]`. After this line, is `x` still `\"outer\"`, or has it been overwritten by the comprehension's loop variable?",
    choices: [
      { id: "a", text: "Still `\"outer\"` — the comprehension's `x` is local to the comprehension and doesn't leak out", correct: true },
      {
        id: "b",
        text: "Overwritten — `x` is now the last value the comprehension's loop variable took, `2`",
        correct: false,
        misconception: {
          id: "assumes-comprehension-var-leaks-like-for-loop",
          description: "Unlike a `for` statement, a comprehension runs in its own implicit scope — its loop variable never leaks into (or overwrites) an outer variable of the same name.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-tuple-comprehension-does-not-exist",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Does `(x for x in a)` create a tuple?",
    choices: [
      { id: "a", text: "No — it creates a generator; there's no such thing as a 'tuple comprehension'", correct: true },
      {
        id: "b",
        text: "Yes — parentheses select the tuple form of comprehension",
        correct: false,
        misconception: {
          id: "assumes-parens-build-tuple-comprehension",
          description: "Parentheses around a comprehension-like expression always produce a generator, never a tuple — to actually get a tuple you'd wrap it explicitly: `tuple(x for x in a)`.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 25,
    prereqClosure: ["python-comprehensions", "python-tuples"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-conditional-expression-in-output",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`[x if x > 0 else -x for x in a]`. What is this computing for each `x`?",
    choices: [
      { id: "a", text: "The absolute value of `x`, via a conditional expression in the output position", correct: true },
      {
        id: "b",
        text: "Only the positive elements of `a`, filtering out the rest",
        correct: false,
        misconception: {
          id: "confuses-leading-if-else-with-filter",
          description: "A leading `if...else` in the output position is a conditional *expression* choosing between two values for every element — it doesn't filter anything out, unlike a trailing `if` with no `else`.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-comprehensions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-list-comp-vs-map-filter",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`[x * 2 for x in a if x > 0]` and `map(lambda x: x * 2, filter(lambda x: x > 0, a))` — do these compute the same list of values?",
    choices: [
      { id: "a", text: "Yes — a comprehension with a filter is equivalent to composing `filter` and `map`, just in one more readable expression", correct: true },
      {
        id: "b",
        text: "No — comprehensions can't express both a transformation and a filter together",
        correct: false,
        misconception: {
          id: "assumes-comprehension-cannot-combine-filter-and-map",
          description: "A comprehension's output expression (the transform) and trailing `if` (the filter) can be combined freely in a single comprehension — that's exactly what replaces a `map`/`filter` composition.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: 0.35,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-nested-comprehension-builds-nested-list",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`[[x for x in range(2)] for row in range(3)]`. What is the outer shape of the result?",
    choices: [
      { id: "a", text: "A list of 3 lists, each `[0, 1]`", correct: true },
      {
        id: "b",
        text: "A single flat list of 6 numbers",
        correct: false,
        misconception: {
          id: "confuses-nested-comprehension-with-flattening",
          description: "This is a comprehension *inside* another comprehension's output expression (not a flattening double `for`), so each outer pass produces one whole inner list as its element — the result stays nested.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["python-comprehensions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-set-vs-list-comprehension-order",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`{x for x in [3, 1, 2]}`, a set comprehension. Is the resulting set's iteration order guaranteed to be `3, 1, 2` (the original order)?",
    choices: [
      { id: "a", text: "No — a set carries no ordering guarantee, same as any other way of building one", correct: true },
      {
        id: "b",
        text: "Yes — a comprehension always preserves the original iteration order, set or not",
        correct: false,
        misconception: {
          id: "assumes-set-comprehension-preserves-order",
          description: "Building a set via a comprehension doesn't change the fact that sets have no ordering guarantee — only list and dict comprehensions preserve the source order (dicts since 3.7).",
          blameConceptId: "python-sets",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["python-comprehensions", "python-sets"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--explain-readability-threshold",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Give a concrete rule of thumb for when a comprehension has become too complex and should be rewritten as an explicit `for` loop instead, illustrated with a made-up example that crosses the line.",
    rubric: {
      elements: [
        {
          id: "rule-of-thumb",
          description: "States a concrete threshold, e.g. more than one nested for clause combined with more than one filtering if, or an output expression that itself needs a helper comment to explain — at that point the single-line form stops being faster to read than an explicit loop.",
          weight: 3,
          required: true,
        },
        {
          id: "example",
          description: "Gives a plausible example that crosses the line, e.g. a triple-nested comprehension with two conditions filtering on different variables, and notes it would read more clearly unrolled into a few lines of explicit for/if.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-comprehensions-always-preferred",
            description: "Assumes a comprehension is always more readable than the equivalent loop regardless of how much logic it packs in.",
            blameConceptId: "python-comprehensions",
          },
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["python-comprehensions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--explain-list-vs-generator-memory-tradeoff",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "`sum([x * x for x in range(10**7)])` and `sum(x * x for x in range(10**7))` (brackets vs. parentheses) compute the same total. Explain the memory difference between them and why it matters here specifically.",
    rubric: {
      elements: [
        {
          id: "memory-difference",
          description: "Explains the bracketed form builds and holds the entire ten-million-element list in memory before sum() ever starts adding, while the parenthesized generator expression produces one value at a time, which sum() consumes and discards immediately, so only a small constant amount of memory is needed regardless of how many elements there are.",
          weight: 3,
          required: true,
        },
        {
          id: "why-it-matters-here",
          description: "Notes that since the list itself is thrown away right after being summed — nothing needs random access into it or reuse of it — there's no benefit to materializing it at all, making the generator form strictly better for this particular use.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-brackets-and-parens-always-interchangeable",
            description: "Assumes switching between [...] and (...) in a comprehension never has any real consequence, missing the memory and laziness difference.",
            blameConceptId: "python-comprehensions",
          },
        },
      ],
    },
    difficulty: 0.65,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["python-comprehensions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--explain-comprehension-cannot-express-side-effects-cleanly",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A colleague writes `[print(x) for x in items]` purely to print each item, discarding the resulting list entirely. Explain why this is considered poor style even though it runs correctly.",
    rubric: {
      elements: [
        {
          id: "misleading-intent",
          description: "Explains a comprehension's whole purpose, as a piece of code a reader recognizes on sight, is to build a collection — writing one purely for its side effects (and throwing away the built list) misleads a reader into looking for what that list is used for, when the real point was just the printing.",
          weight: 3,
          required: true,
        },
        {
          id: "correct-alternative",
          description: "Names the appropriate alternative: an explicit for loop (for x in items: print(x)), which states the intent (do this for each item) directly with no discarded return value to explain away.",
          weight: 3,
          required: true,
          misconception: {
            id: "judges-only-by-correctness",
            description: "Judges the comprehension purely by whether it runs and produces the right side effects, without considering what it communicates to a future reader.",
            blameConceptId: "python-comprehensions",
          },
        },
      ],
    },
    difficulty: 0.55,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["python-comprehensions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--transfer-numpy-boolean-mask-replaces-comprehension",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "`[x for x in a if x > 0]` filters a plain Python list. For a NumPy array `arr`, what's the vectorized equivalent that avoids a Python-level comprehension entirely?",
    choices: [
      { id: "a", text: "`arr[arr > 0]` — boolean mask indexing", correct: true },
      {
        id: "b",
        text: "There's no vectorized equivalent; NumPy still requires an explicit comprehension to filter",
        correct: false,
        misconception: {
          id: "assumes-numpy-cannot-filter-without-comprehension",
          description: "Boolean mask indexing (`arr[condition]`) is precisely NumPy's vectorized answer to filtering — it evaluates the condition and selects matching elements without any Python-level loop or comprehension.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["python-comprehensions", "numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--transfer-dict-comprehension-for-lookup-table",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "You have a list of `(word, frequency)` tuples and want an O(1)-lookup structure mapping word to frequency. Write the dict comprehension that builds it, and explain why building it this way is preferable to writing an explicit `for` loop with `d[word] = freq`.",
    rubric: {
      elements: [
        {
          id: "comprehension",
          description: "Gives {word: freq for word, freq in pairs}.",
          weight: 3,
          required: true,
        },
        {
          id: "why-preferable",
          description: "Explains the comprehension states the whole transformation — 'build this dict from these pairs' — in one expression that assigns directly to a name, whereas the explicit loop needs a separately pre-declared empty dict and a mutating assignment line, adding ceremony without adding clarity for this simple, one-shot build-a-mapping case.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-no-real-difference",
            description: "Assumes there's no meaningful readability difference between the comprehension and the equivalent explicit loop for this simple case.",
            blameConceptId: "python-dictionaries",
          },
        },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["python-comprehensions", "python-dictionaries", "python-tuples"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // NumPy Arrays and Vectorization
  // =========================================================================
  {
    id: "numpy-arrays--recall-plus-semantics",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "For lists a = `[1, 2]` and b = `[3, 4]`, a + b is `[1, 2, 3, 4]`. What is `np.array(a)` + `np.array(b)`?",
    choices: [
      { id: "a", text: "`array([4, 6])`", correct: true },
      {
        id: "b",
        text: "`array([1, 2, 3, 4])`",
        correct: false,
        misconception: {
          id: "array-plus-concatenates",
          description:
            "Carries the list meaning of + across to arrays. On an ndarray, + is elementwise addition; concatenation needs np.concatenate.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "c",
        text: "10 — the sum of all elements",
        correct: false,
        misconception: {
          id: "plus-reduces",
          description:
            "Confuses an elementwise operation with a reduction. `+` preserves shape; `np.sum` collapses it.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "d",
        text: "A `ValueError` — arrays cannot be added",
        correct: false,
        misconception: {
          id: "addition-invalid",
          description:
            "Elementwise addition of equal-shaped arrays is the core operation NumPy exists to provide.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.3,
    expectedSeconds: 25,
    prereqClosure: ["numpy-arrays", "python-list-operations"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-dtype-fixed",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "a = `np.array([1, 2, 3])` has dtype int64. What does `a[0]` = 2.7 leave in `a[0]`?",
    choices: [
      { id: "a", text: "2 — the value is truncated to the array's dtype", correct: true },
      {
        id: "b",
        text: "2.7 — the array promotes to float64",
        correct: false,
        misconception: {
          id: "assignment-promotes",
          description:
            "Expects assignment to widen the dtype. An array's dtype is fixed at creation; assignment casts the incoming value to fit, it does not reallocate the array.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "c",
        text: "3 — the value is rounded",
        correct: false,
        misconception: {
          id: "cast-rounds",
          description:
            "The integer cast truncates toward zero rather than rounding, so 2.7 becomes 2 and -2.7 becomes -2.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "d",
        text: "A `TypeError` is raised",
        correct: false,
        misconception: {
          id: "dtype-mismatch-raises",
          description:
            "Expects the mismatch to be rejected. It is silently cast, which is exactly why an integer array holding what should be fractions is such a durable bug.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -0.1,
    discrimination: 1.6,
    expectedSeconds: 40,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--apply-mask-count",
    conceptId: "numpy-arrays",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "a = `np.array([-2, 0, 3, 7, -1, 4])`. How many elements does `a[a > 0]` contain?",
    answerKey: 3,
    tolerance: 0,
    difficulty: -0.6,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-arrays--apply-view-vs-copy",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "a = `np.arange(10)`. Compare b = `a[2:5]` with c = `a[[2, 3, 4]]`. Writing `b[0]` = 99 and `c[1]` = 88 — which writes reach a?",
    choices: [
      { id: "a", text: "Only b's write; c is a copy", correct: true },
      {
        id: "b",
        text: "Both writes reach a",
        correct: false,
        misconception: {
          id: "fancy-index-is-view",
          description:
            "Assumes every form of indexing gives a view. Fancy indexing gathers arbitrary positions, which cannot be described by a stride over the existing buffer, so it must copy.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "c",
        text: "Neither; both are copies, as with list slicing",
        correct: false,
        misconception: {
          id: "array-slice-copies",
          description:
            "Carries the list rule across. A basic array slice is a view — the opposite of list slicing, and the single most consequential difference between the two types.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "d",
        text: "Only c's write; a basic slice is read-only",
        correct: false,
        misconception: {
          id: "slice-readonly",
          description:
            "Basic slices are writable views. It is precisely their writability that makes the aliasing matter.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.7,
    expectedSeconds: 60,
    prereqClosure: ["numpy-arrays", "python-list-operations"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--apply-vectorize-a-loop",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Rewrite `total = 0` followed by `for x in a: if x > 0: total += x * x` as a single vectorized NumPy expression, and say what shape each intermediate has.",
    rubric: {
      elements: [
        {
          id: "expression",
          description:
            "Gives a correct vectorized form, e.g. np.sum(a[a > 0] ** 2), or equivalently np.sum(np.where(a > 0, a, 0) ** 2).",
          weight: 3,
          required: true,
        },
        {
          id: "shapes",
          description:
            "Tracks the shapes: a > 0 is a boolean array of a's shape, the mask selects a shorter 1-D array, squaring preserves that shape, and np.sum collapses it to a scalar.",
          weight: 3,
          required: true,
          misconception: {
            id: "mask-preserves-length",
            description:
              "Assumes boolean indexing keeps the original length. It selects, so the result is generally shorter — which is why `np.where` and a mask are not interchangeable.",
            blameConceptId: "numpy-arrays",
          },
        },
        {
          id: "why-faster",
          description:
            "Bonus: notes the loop runs in compiled code over one contiguous block, so per-element interpreter overhead is paid once rather than n times.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["numpy-arrays", "python-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-arrays--explain-why-vectorization-wins",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Vectorized NumPy code is routinely 10-100x faster than the equivalent Python loop over the same values. Explain where the time goes in the loop version, and name a case where vectorizing does not help.",
    rubric: {
      elements: [
        {
          id: "overhead",
          description:
            "Identifies the per-element costs a Python loop pays: bytecode dispatch, dynamic type lookup, and unboxing a heap object per element — none of which depend on the arithmetic being done.",
          weight: 3,
          required: true,
        },
        {
          id: "layout",
          description:
            "Says the array's single dtype and contiguous buffer are what let one compiled loop do the whole job, with the type resolved once instead of per element — and that contiguity also makes the access cache-friendly.",
          weight: 3,
          required: true,
          misconception: {
            id: "c-is-just-faster",
            description:
              "Attributes the win to 'C is faster' with no mechanism. Without naming the per-element overhead and the fixed dtype, the claim cannot predict the cases where vectorizing gains nothing.",
            blameConceptId: "numpy-arrays",
          },
        },
        {
          id: "when-it-fails",
          description:
            "Names a genuine limit: an inherently sequential recurrence, an operation on object-dtype arrays (which loops in Python anyway), or a vectorized form whose temporaries no longer fit in memory.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-always-faster",
          description: "Claims vectorized code is always faster, with no case where the intermediate arrays cost more than the loop saved.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.8,
    expectedSeconds: 180,
    prereqClosure: ["numpy-arrays", "python-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-arrays--explain-list-vs-array",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Describe how a Python list and a NumPy array differ in memory, and derive two user-visible consequences from that difference alone.",
    rubric: {
      elements: [
        {
          id: "memory",
          description:
            "States that a list stores pointers to independently allocated objects of any type, while an array stores raw values of one dtype in a single contiguous block.",
          weight: 3,
          required: true,
        },
        {
          id: "consequences",
          description:
            "Derives at least two consequences: elementwise arithmetic is possible at all (one known type), appending is cheap for a list and expensive for an array (fixed-size buffer), and mixing types is fine in a list but forces a promotion or a cast in an array.",
          weight: 3,
          required: true,
          misconception: {
            id: "array-is-fast-list",
            description:
              "Treats an array as a list with better performance. The constraints — one dtype, fixed size — are the source of the performance, not an incidental limitation.",
            blameConceptId: "numpy-arrays",
          },
        },
        {
          id: "slicing",
          description:
            "Bonus: derives the view/copy difference from the same fact — a stride over a contiguous block can describe a slice without copying, and a list of pointers has no such structure to share.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["numpy-arrays", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-arrays--transfer-silent-integer-division",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A pipeline stores counts in an integer array, then normalises in place with counts /= `counts.sum()`. In one version this raises; in another it silently produces all zeros. Explain both outcomes and give a fix.",
    rubric: {
      elements: [
        {
          id: "in-place-cast",
          description:
            "Identifies that /= is an in-place operation on an integer array being handed a float result, so NumPy must cast the float back to int to store it — modern versions refuse with a UFuncTypeError, older ones truncated.",
          weight: 3,
          required: true,
        },
        {
          id: "all-zeros",
          description:
            "Explains the silent case: every ratio is below 1 in magnitude, and truncation toward zero sends all of them to 0 — a whole array of zeros with no error and no NaN to notice.",
          weight: 3,
          required: true,
          misconception: {
            id: "division-always-floats",
            description:
              "Assumes true division always yields floats. It does — but an in-place assignment must store the result in the existing dtype, which is where the float is lost.",
            blameConceptId: "numpy-arrays",
          },
        },
        {
          id: "fix",
          description:
            "Gives a fix that changes the dtype rather than the arithmetic: rebind with counts = counts / counts.sum(), or build the array as float from the start.",
          weight: 3,
          required: true,
        },
        {
          id: "generalisation",
          description:
            "Bonus: generalises to the rule that in-place operators never change an array's dtype, so any in-place op that widens the value range is suspect.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.9,
    expectedSeconds: 210,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },

  {
    id: "numpy-arrays--recall-array-constructor",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which function builds a NumPy array from a Python list?",
    choices: [
      { id: "a", text: "`np.array([1, 2, 3])`", correct: true },
      {
        id: "b",
        text: "`np.list([1, 2, 3])`",
        correct: false,
        misconception: {
          id: "invents-np-list-function",
          description: "There's no `np.list` function — the constructor for building an `ndarray` from a Python sequence is `np.array`.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 0.8,
    expectedSeconds: 10,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-shape-attribute",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a = np.array([[1, 2, 3], [4, 5, 6]])`. What is `a.shape`?",
    choices: [
      { id: "a", text: "`(2, 3)`", correct: true },
      {
        id: "b",
        text: "`6`",
        correct: false,
        misconception: {
          id: "confuses-shape-with-size",
          description: "`.shape` is a tuple giving the length along each axis — `(2, 3)` here — while `6` (the total element count) is what `.size` gives instead.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-dtype-attribute",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a = np.array([1, 2, 3])`. What does `a.dtype` tell you?",
    choices: [
      { id: "a", text: "The single data type every element of the array is stored as", correct: true },
      {
        id: "b",
        text: "The Python type of the `a` variable itself (`ndarray`)",
        correct: false,
        misconception: {
          id: "confuses-dtype-with-variable-type",
          description: "`.dtype` describes the type of the *elements* stored inside the array (e.g. `int64`), not the type of the array object as a whole (which is always `numpy.ndarray`).",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-ndim-attribute",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a = np.array([[1, 2], [3, 4]])`. What is `a.ndim`?",
    choices: [
      { id: "a", text: "`2` — a 2-D array", correct: true },
      {
        id: "b",
        text: "`4` — the total number of elements",
        correct: false,
        misconception: {
          id: "confuses-ndim-with-element-count",
          description: "`.ndim` counts the number of *axes* (dimensions) — `2` here, for rows and columns — not the number of elements, which `.size` gives.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-arange-basic",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `np.arange(5)` produce?",
    choices: [
      { id: "a", text: "`array([0, 1, 2, 3, 4])`", correct: true },
      {
        id: "b",
        text: "`array([1, 2, 3, 4, 5])`",
        correct: false,
        misconception: {
          id: "assumes-arange-starts-at-one",
          description: "`np.arange`, like `range`, defaults its start to `0` and excludes the stop value — `np.arange(5)` gives `0` through `4`.",
          blameConceptId: "numpy-array-creation",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["numpy-arrays", "numpy-array-creation"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-elementwise-multiply-not-matrix",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a = np.array([1, 2, 3]); b = np.array([4, 5, 6])`. What does `a * b` compute?",
    choices: [
      { id: "a", text: "Elementwise product: `array([4, 10, 18])`", correct: true },
      {
        id: "b",
        text: "The dot product, a single scalar `32`",
        correct: false,
        misconception: {
          id: "confuses-star-with-dot-product",
          description: "`*` between two arrays is always elementwise — the dot product needs `np.dot(a, b)`, `a @ b`, or `.sum()` of the elementwise product.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-scalar-broadcast-basic",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a = np.array([1, 2, 3])`. What does `a * 10` evaluate to?",
    choices: [
      { id: "a", text: "`array([10, 20, 30])`", correct: true },
      {
        id: "b",
        text: "`array([1, 2, 3, 1, 2, 3, ...])`, the array repeated 10 times",
        correct: false,
        misconception: {
          id: "carries-list-repeat-semantics-to-array",
          description: "List repetition (`[1,2,3] * 10`) is a different operation from array scalar multiplication — for an `ndarray`, `*` with a scalar multiplies every element by that scalar.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 20,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-array-comparison-elementwise",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a = np.array([1, 5, 2])`. What does `a > 2` evaluate to?",
    choices: [
      { id: "a", text: "`array([False, True, False])` — an elementwise boolean array", correct: true },
      {
        id: "b",
        text: "A single `True` or `False`, summarizing the whole array",
        correct: false,
        misconception: {
          id: "assumes-array-comparison-collapses-to-scalar",
          description: "Comparing an array to a scalar is elementwise, like every other NumPy operator — it produces a same-shape boolean array, not a single collapsed boolean.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-tolist-method",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a = np.array([1, 2, 3])`. What does `a.tolist()` return?",
    choices: [
      { id: "a", text: "An ordinary Python `list`: `[1, 2, 3]`", correct: true },
      {
        id: "b",
        text: "The same NumPy array, unchanged",
        correct: false,
        misconception: {
          id: "assumes-tolist-is-noop",
          description: "`.tolist()` genuinely converts to a plain Python `list` of native Python numbers — the result is no longer a NumPy array at all.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["numpy-arrays", "python-lists-intro"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-reshape-preserves-elements",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a = np.arange(6)`. What does `a.reshape(2, 3)` produce?",
    choices: [
      { id: "a", text: "A `(2, 3)` array holding the same 6 values, rearranged into 2 rows of 3", correct: true },
      {
        id: "b",
        text: "A `(2, 3)` array filled with zeros, discarding `a`'s original values",
        correct: false,
        misconception: {
          id: "assumes-reshape-discards-values",
          description: "`.reshape()` rearranges the *existing* elements into a new shape — it doesn't discard or reinitialize them, and the total element count must match (2 x 3 = 6).",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-array-equal-vs-python-equal",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a = np.array([1, 2, 3])`. What does `a == [1, 2, 3]` (comparing to a plain Python list) evaluate to?",
    choices: [
      { id: "a", text: "`array([True, True, True])` — an elementwise boolean array", correct: true },
      {
        id: "b",
        text: "`True` — a single boolean, as it would be for two plain lists",
        correct: false,
        misconception: {
          id: "assumes-array-equality-returns-single-bool",
          description: "NumPy overrides `==` to be elementwise even against a plain list on the right — the result is a boolean array, not the single `True`/`False` that comparing two ordinary lists would give.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-negative-indexing-works-on-arrays",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a = np.array([10, 20, 30])`. What is `a[-1]`?",
    choices: [
      { id: "a", text: "`30`", correct: true },
      {
        id: "b",
        text: "Raises an error, since negative indices aren't supported for arrays",
        correct: false,
        misconception: {
          id: "assumes-arrays-reject-negative-index",
          description: "NumPy arrays support negative indexing exactly like Python lists do — `a[-1]` is the last element.",
          blameConceptId: "numpy-indexing",
        },
      },
    ],
    difficulty: -1.1,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["numpy-arrays", "numpy-indexing"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-array-of-strings-allowed",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Can a NumPy array hold strings, e.g. `np.array([\"a\", \"bb\", \"ccc\"])`?",
    choices: [
      { id: "a", text: "Yes — it creates a fixed-width string dtype array", correct: true },
      {
        id: "b",
        text: "No — NumPy arrays can only hold numeric data",
        correct: false,
        misconception: {
          id: "assumes-arrays-numeric-only",
          description: "NumPy arrays aren't restricted to numbers — string dtypes exist too, though (unlike a numeric dtype) most arithmetic operators don't apply to them.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-in-place-operator-mutates",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a = np.array([1, 2, 3]); a += 1`. Does this mutate `a` in place, or rebind `a` to a new array?",
    choices: [
      { id: "a", text: "Mutates `a`'s existing buffer in place", correct: true },
      {
        id: "b",
        text: "Rebinds `a` to a brand-new array object, leaving the original buffer untouched",
        correct: false,
        misconception: {
          id: "assumes-augmented-assign-always-rebinds",
          description: "For a NumPy array, `+=` calls the in-place addition operator, modifying the existing buffer directly — this is why it can silently truncate results that don't fit the array's dtype, unlike plain `a = a + 1`.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--explain-array-single-dtype-tradeoff",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain the tradeoff a NumPy array makes by requiring one dtype for the whole array — what it gains, and what genuinely can't be represented as a result.",
    rubric: {
      elements: [
        {
          id: "gain",
          description: "Explains a single fixed dtype lets NumPy store elements as raw contiguous bytes with a known, uniform size, which is what enables fast vectorized C-level loops and predictable memory usage.",
          weight: 3,
          required: true,
        },
        {
          id: "limitation",
          description: "Gives a genuine limitation: an array can't natively mix an int, a string, and a custom object the way a Python list can — mixed data has to either be cast to a common dtype (often 'object', which loses most of the performance benefit) or kept in separate arrays.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-single-dtype-as-strictly-worse",
            description: "Treats the single-dtype restriction as a pure downside, without recognizing it's the source of the performance and memory-layout benefits.",
            blameConceptId: "numpy-arrays",
          },
        },
      ],
    },
    difficulty: 0.55,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["numpy-arrays", "python-lists-intro"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-arrays--explain-fixed-size-vs-growable",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why appending to a NumPy array repeatedly inside a loop (`arr = np.append(arr, x)`) is a performance anti-pattern, connecting it to what `.reshape()` and fixed dtype tell you about how an array's memory is laid out.",
    rubric: {
      elements: [
        {
          id: "no-in-place-growth",
          description: "Explains an array's buffer is allocated once at a fixed size — there's no spare capacity to grow into the way a list keeps some, so 'appending' actually means allocating an entirely new, larger buffer and copying every existing element into it.",
          weight: 3,
          required: true,
        },
        {
          id: "quadratic-cost",
          description: "Explains doing this once per loop iteration means the total copying work across n appends grows roughly quadratically (each append re-copies everything seen so far), unlike a Python list's amortized O(1) append.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-np-append-is-cheap-like-list-append",
            description: "Assumes np.append behaves like list.append — an efficient in-place growth operation — rather than a full reallocation-and-copy every single call.",
            blameConceptId: "python-list-operations",
          },
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["numpy-arrays", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-arrays--explain-dtype-promotion-rules",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "`np.array([1, 2, 3])` has an int dtype, but `np.array([1, 2, 3.0])` has a float dtype. Explain the rule NumPy follows when it has to pick a single dtype for a mix of Python values, and why it errs toward the 'wider' type.",
    rubric: {
      elements: [
        {
          id: "promotion-rule",
          description: "States NumPy picks the dtype that can represent every value in the input without losing information — when values of different numeric types are mixed, it promotes to the more general one (here, float, since an int can be represented exactly as a float but not vice versa in general).",
          weight: 3,
          required: true,
        },
        {
          id: "why-not-narrower",
          description: "Explains choosing the narrower type (int) would lose the fractional part of the float value silently, whereas the wider type preserves every input value exactly — safety over compactness.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-dtype-decided-by-majority-type",
            description: "Assumes NumPy picks whichever type appears most often among the input values, rather than the type that can losslessly represent all of them.",
            blameConceptId: "numpy-arrays",
          },
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--transfer-array-vs-list-type-check",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A function needs to know whether it was passed a plain Python list or a NumPy array, since it will behave differently for each. Which check correctly distinguishes them?",
    choices: [
      { id: "a", text: "`isinstance(x, np.ndarray)`", correct: true },
      {
        id: "b",
        text: "`type(x) == list` returning `False` is sufficient on its own to conclude `x` is a NumPy array",
        correct: false,
        misconception: {
          id: "assumes-not-a-list-implies-array",
          description: "Failing a list check only tells you `x` isn't a `list` — it could be a tuple, a set, a dict, or anything else. The reliable way to confirm it's specifically a NumPy array is `isinstance(x, np.ndarray)`.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["numpy-arrays", "python-variables-types"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-arrays--transfer-pandas-column-is-backed-by-array",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A pandas `Series` (a DataFrame column) is internally backed by a NumPy array (`series.values` or `series.to_numpy()` exposes it). Explain what this means for why arithmetic on a pandas column, like `df[\"price\"] * 1.1`, is fast and elementwise, connecting it to what you know about NumPy array operators.",
    rubric: {
      elements: [
        {
          id: "same-mechanism",
          description: "Explains that since the Series' data lives in a contiguous, single-dtype NumPy array under the hood, an operation like * 1.1 dispatches to the exact same vectorized elementwise multiplication NumPy provides for a plain ndarray — there's no per-row Python loop happening.",
          weight: 3,
          required: true,
        },
        {
          id: "consequence",
          description: "Draws the consequence that pandas' performance for numeric column operations is essentially inherited from NumPy's — the DataFrame/Series layer mostly adds labeled indexing and alignment on top of arrays that already do the fast numeric work.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-pandas-arithmetic-as-independently-implemented",
            description: "Assumes pandas implements its own separate, unrelated arithmetic engine for Series operations rather than delegating to the underlying NumPy array.",
            blameConceptId: "pandas-dataframes",
          },
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["numpy-arrays", "pandas-dataframes"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Broadcasting and Axis Reductions
  // =========================================================================
  {
    id: "numpy-broadcasting--recall-alignment-direction",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "When NumPy broadcasts two shapes, from which end are the axes aligned?",
    choices: [
      { id: "a", text: "From the trailing (rightmost) axis, padding the shorter shape with leading 1s", correct: true },
      {
        id: "b",
        text: "From the leading (leftmost) axis, padding with trailing 1s",
        correct: false,
        misconception: {
          id: "aligns-from-left",
          description:
            "Reverses the rule. Left-alignment would make a (3,) vector broadcast down the rows of a `(3, 4)` matrix; the actual right-alignment makes it broadcast across the columns, which is why `(3, 4)` with (3,) is an error.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "c",
        text: "From whichever end produces a valid result",
        correct: false,
        misconception: {
          id: "alignment-is-adaptive",
          description:
            "Assumes NumPy searches for an interpretation that works. The rule is fixed and syntactic, which is what makes the outcome predictable — and what makes an explicit reshape necessary when it does not match your intent.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "d",
        text: "Axes are matched by size, in any order",
        correct: false,
        misconception: {
          id: "matches-by-size",
          description:
            "Would make broadcasting order-insensitive and ambiguous for square arrays. Position, not size, determines which axes are compared.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.5,
    expectedSeconds: 35,
    prereqClosure: ["numpy-broadcasting"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-axis-meaning",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A has shape `(3, 4)`. What is the shape of `A.sum(axis=0)`?",
    choices: [
      { id: "a", text: "(4,) — axis 0 is collapsed, leaving the column sums", correct: true },
      {
        id: "b",
        text: "(3,) — axis 0 is kept, giving the row sums",
        correct: false,
        misconception: {
          id: "axis-is-kept",
          description:
            "Reads axis= as the axis retained. It names the axis consumed, so the named axis is the one missing from the output shape.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "c",
        text: "`(3, 1)` — the axis is kept with length 1",
        correct: false,
        misconception: {
          id: "keepdims-is-default",
          description:
            "Describes keepdims=`True`, which is not the default. Without it the axis is dropped entirely.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "d",
        text: "() — a scalar",
        correct: false,
        misconception: {
          id: "axis-ignored",
          description:
            "Describes `A.sum()` with no axis. Supplying an axis reduces along that one axis only.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.6,
    expectedSeconds: 35,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--apply-result-shape",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Give the broadcast result shape, or say why it fails, for each pair: `(3, 4)` with (4,); `(3, 4)` with (3,); `(3, 1)` with `(1, 4)`; `(5, 1, 3)` with `(4, 3)`.",
    rubric: {
      elements: [
        {
          id: "answers",
          description:
            "Gives (3, 4); an error; (3, 4); and (5, 4, 3), in that order.",
          weight: 3,
          required: true,
        },
        {
          id: "reasoning",
          description:
            "Justifies each by right-aligning and checking equal-or-1 per axis — in particular that (3,) pads to (1, 3) and its trailing 3 cannot meet the 4.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-length-match-suffices",
            description:
              "Accepts `(3, 4)` with (3,) because 3 appears in both shapes. Broadcasting compares aligned positions, not the multiset of lengths.",
            blameConceptId: "numpy-broadcasting",
          },
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.7,
    expectedSeconds: 150,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--apply-row-centering",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A has shape `(3, 4)`. Which expression subtracts each row's own mean from that row?",
    choices: [
      { id: "a", text: "A - `A.mean(axis=1, keepdims=True)`", correct: true },
      {
        id: "b",
        text: "A - `A.mean(axis=1)`",
        correct: false,
        misconception: {
          id: "forgot-keepdims",
          description:
            "The means have shape (3,), which right-aligns against the 4 columns and raises. The fix is keepdims=`True`, or an explicit `[:, None]`.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "c",
        text: "A - `A.mean(axis=0)`",
        correct: false,
        misconception: {
          id: "wrong-axis",
          description:
            "Collapses axis 0, giving column means of shape (4,). That broadcasts cleanly — and centres the columns, not the rows, so it runs and answers a different question.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "d",
        text: "A - `A.mean()`",
        correct: false,
        misconception: {
          id: "global-mean",
          description:
            "Subtracts one scalar from everything, centring the matrix as a whole rather than each row.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: 0.7,
    discrimination: 1.8,
    expectedSeconds: 60,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--apply-outer-difference-size",
    conceptId: "numpy-broadcasting",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "x has shape (1000,). How many elements does `x[:, None]` - `x[None, :]` contain?",
    answerKey: 1000000,
    tolerance: 0,
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-broadcasting--explain-keepdims",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Why does keepdims=`True` exist, when the reduced axis has length 1 and carries no information?",
    rubric: {
      elements: [
        {
          id: "broadcast-back",
          description:
            "Says a length-1 axis is exactly what broadcasting stretches, so keeping it lets the reduction's result be combined with the original array without any reshaping.",
          weight: 3,
          required: true,
        },
        {
          id: "otherwise",
          description:
            "Explains what happens without it: the axis is dropped, the remaining shape right-aligns against the wrong axis, and the operation either raises or — worse, when the two axis lengths happen to match — silently computes a transposed answer.",
          weight: 3,
          required: true,
          misconception: {
            id: "keepdims-cosmetic",
            description:
              "Treats keepdims as formatting. It is a shape contract: it makes the reduction's output compatible with the input it came from.",
            blameConceptId: "numpy-broadcasting",
          },
        },
        {
          id: "examples",
          description:
            "Bonus: names operations built on it — centring, per-row normalisation, softmax's subtract-the-max — all of which reduce and then broadcast back.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.8,
    expectedSeconds: 170,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-broadcasting--explain-memory-cost",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Broadcasting is often described as avoiding copies. Explain precisely what it avoids copying, and why a broadcast expression can still exhaust memory.",
    rubric: {
      elements: [
        {
          id: "no-operand-copy",
          description:
            "States that the stretched operand is not materialised — the length-1 axis is traversed with a stride of zero, re-reading the same memory rather than duplicating it.",
          weight: 3,
          required: true,
        },
        {
          id: "output-is-real",
          description:
            "States that the result is a full, ordinary array of the broadcast shape, so the memory cost is the output's, not the inputs'.",
          weight: 3,
          required: true,
          misconception: {
            id: "broadcasting-is-free",
            description:
              "Concludes that broadcasting is free in general. Only the operand is free; an outer-product-shaped result is quadratic in the input size.",
            blameConceptId: "numpy-broadcasting",
          },
        },
        {
          id: "quantified",
          description:
            "Bonus: quantifies an instance — an all-pairs difference over 10,000 values is 10^8 float64 entries, about 800 MB.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--transfer-silent-transpose",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Code that normalises a (n, n) matrix by its row sums is tested on a square matrix and later fails a review because the results are transposed. Explain how a shape bug can survive testing on a square input, and give a habit that would have caught it.",
    rubric: {
      elements: [
        {
          id: "square-hides-it",
          description:
            "Explains that with n rows and n columns, a reduction result of shape (n,) broadcasts successfully against either axis — so the wrong axis produces a well-formed array of the right shape rather than an error.",
          weight: 3,
          required: true,
          misconception: {
            id: "success-implies-correct",
            description:
              "Treats a broadcast that does not raise as a broadcast that is right. Shape compatibility is necessary, never sufficient — and squareness removes the only signal that would have distinguished them.",
            blameConceptId: "numpy-broadcasting",
          },
        },
        {
          id: "consequence",
          description:
            "Says the result is the transpose of what was intended — each column divided by a row sum — which is numerically plausible and passes any test that only checks shape or finiteness.",
          weight: 2,
          required: true,
        },
        {
          id: "habit",
          description:
            "Gives a habit that would catch it: test on a deliberately non-square shape, assert the intermediate shape explicitly, or write the alignment out with keepdims / [:, None] so the intent is in the code rather than in the reader's head.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.9,
    expectedSeconds: 210,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },

  {
    id: "numpy-broadcasting--recall-same-shape-no-broadcast-needed",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Two arrays both have shape `(3, 4)`. Is broadcasting needed to add them?",
    choices: [
      { id: "a", text: "No — operating on two identically-shaped arrays is direct elementwise arithmetic, with no stretching involved", correct: true },
      {
        id: "b",
        text: "Yes — broadcasting rules always apply to every operation between two arrays",
        correct: false,
        misconception: {
          id: "assumes-broadcasting-always-invoked",
          description: "Broadcasting is the mechanism for handling *mismatched* shapes — when the shapes already match exactly, the operation is just ordinary elementwise arithmetic with nothing to stretch.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 0.9,
    expectedSeconds: 15,
    prereqClosure: ["numpy-broadcasting"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-scalar-broadcasts-against-any-shape",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Does a scalar (like `5`) broadcast successfully against an array of any shape?",
    choices: [
      { id: "a", text: "Yes — a scalar broadcasts against any array shape", correct: true },
      {
        id: "b",
        text: "No — a scalar can only broadcast against a 1-D array",
        correct: false,
        misconception: {
          id: "restricts-scalar-broadcast-to-1d",
          description: "A scalar is treated as having an empty shape that trivially aligns with any shape — it broadcasts against arrays of any dimensionality.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["numpy-broadcasting"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-shape-1-stretches",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Under broadcasting, what does an axis of length `1` do when paired against an axis of length `5`?",
    choices: [
      { id: "a", text: "It's conceptually stretched to length `5`, repeating its single value", correct: true },
      {
        id: "b",
        text: "It causes an error, since `1 != 5`",
        correct: false,
        misconception: {
          id: "assumes-mismatched-lengths-always-error",
          description: "An axis length of exactly `1` is the specific case broadcasting is built to handle — it's compatible with any other length along that axis and gets stretched to match.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["numpy-broadcasting"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-mismatched-non-one-lengths-error",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Two arrays have shapes `(4,)` and `(3,)`. Do they broadcast together?",
    choices: [
      { id: "a", text: "No — `4` and `3` are both greater than `1` and unequal, so this raises a `ValueError`", correct: true },
      {
        id: "b",
        text: "Yes — NumPy pads the shorter one with zeros to make the lengths match",
        correct: false,
        misconception: {
          id: "invents-zero-padding-for-mismatched-lengths",
          description: "NumPy never pads array *values* to force a shape match — broadcasting compatibility requires each aligned pair of axis lengths to be equal or one of them to be `1`; neither holds for `4` vs `3`.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["numpy-broadcasting"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-axis-argument-purpose",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does passing `axis=1` to `A.sum()` tell NumPy to do, for a 2-D array `A`?",
    choices: [
      { id: "a", text: "Sum along axis 1 (across the columns, within each row), collapsing that axis", correct: true },
      {
        id: "b",
        text: "Sum only the elements at index 1 of every row",
        correct: false,
        misconception: {
          id: "confuses-axis-argument-with-single-index",
          description: "`axis=1` doesn't select a single position — it names *which entire axis* gets collapsed by the reduction, summing across all its values.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-none-adds-axis",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a` has shape `(5,)`. What is the shape of `a[:, None]`?",
    choices: [
      { id: "a", text: "`(5, 1)`", correct: true },
      {
        id: "b",
        text: "`(1, 5)`",
        correct: false,
        misconception: {
          id: "misplaces-new-axis-position",
          description: "`a[:, None]` inserts the new length-1 axis in the *second* position (after the existing axis), giving `(5, 1)` — `a[None, :]` is the one that would give `(1, 5)`.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-broadcasting-error-name",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What exception does NumPy raise when two shapes cannot be broadcast together?",
    choices: [
      { id: "a", text: "`ValueError`", correct: true },
      {
        id: "b",
        text: "`BroadcastError`",
        correct: false,
        misconception: {
          id: "invents-broadcasterror-exception",
          description: "NumPy has no dedicated `BroadcastError` type — an incompatible shape combination raises the ordinary `ValueError`, with a message naming the mismatched shapes.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["numpy-broadcasting"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-scalar-plus-1d-shape",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a` has shape `(4,)`. What is the shape of `a + 5`?",
    choices: [
      { id: "a", text: "`(4,)`, unchanged — the scalar broadcasts to match `a`'s shape", correct: true },
      {
        id: "b",
        text: "`(5,)`",
        correct: false,
        misconception: {
          id: "confuses-scalar-value-with-shape-length",
          description: "The scalar's numeric *value* (`5`) has nothing to do with the result's shape — broadcasting a scalar against a `(4,)` array just gives back a `(4,)` result.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["numpy-broadcasting"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-2d-plus-1d-row-broadcast",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`A` has shape `(3, 4)`; `v` has shape `(4,)`. What does `A + v` do?",
    choices: [
      { id: "a", text: "Adds `v` to every row of `A` — `v` broadcasts across the 3 rows", correct: true },
      {
        id: "b",
        text: "Raises a `ValueError`, since `A` is 2-D and `v` is 1-D",
        correct: false,
        misconception: {
          id: "assumes-different-ndim-always-fails",
          description: "Different numbers of dimensions don't automatically fail — `v`'s shape is right-aligned against `A`'s trailing axis (`4` matches `4`), and the missing leading axis is treated as size `1` and stretched to `3`.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-sum-with-no-axis-collapses-all",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`A` has shape `(3, 4)`. What is the shape of `A.sum()` with no `axis` argument at all?",
    choices: [
      { id: "a", text: "`()` — a 0-D scalar, the sum of every element", correct: true },
      {
        id: "b",
        text: "`(3, 4)`, unchanged",
        correct: false,
        misconception: {
          id: "assumes-sum-without-axis-is-noop",
          description: "With no `axis` given, `.sum()` reduces over *every* axis at once, collapsing the whole array down to a single scalar total — it doesn't leave the shape unchanged.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-broadcasting-does-not-modify-inputs",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a` has shape `(3,)`; `b` has shape `(1,)`. After computing `a + b`, does `b` itself get physically resized to shape `(3,)`?",
    choices: [
      { id: "a", text: "No — `b` is left exactly as it was; only the result of the operation has the broadcast shape", correct: true },
      {
        id: "b",
        text: "Yes — broadcasting permanently changes `b`'s own shape to match `a`",
        correct: false,
        misconception: {
          id: "assumes-broadcasting-mutates-operand-shape",
          description: "Broadcasting only affects how the operands are treated *during* this one operation — neither original array is resized or mutated; a fresh result array is produced instead.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["numpy-broadcasting"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-column-vector-vs-row-vector-shapes",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For an array to broadcast as a 'column vector' against a `(3, 4)` matrix (varying down the rows, constant across columns), what shape should it have?",
    choices: [
      { id: "a", text: "`(3, 1)`", correct: true },
      {
        id: "b",
        text: "`(1, 3)`",
        correct: false,
        misconception: {
          id: "confuses-column-and-row-vector-shape",
          description: "`(1, 3)` would broadcast as a row that repeats across all 3 rows — it's `(3, 1)` (matching the 3 rows, with a length-1 trailing axis to stretch across the 4 columns) that behaves as a column vector here.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["numpy-broadcasting", "numpy-matrices"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-broadcasting-avoids-explicit-loop",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`prices = np.array([10, 20, 30]); tax_rate = 1.08`. What does `prices * tax_rate` compute, without writing an explicit loop?",
    choices: [
      { id: "a", text: "Each price multiplied by the tax rate, elementwise: `array([10.8, 21.6, 32.4])`", correct: true },
      {
        id: "b",
        text: "A `TypeError`, since you can't multiply an array by a plain float directly",
        correct: false,
        misconception: {
          id: "assumes-array-scalar-multiply-invalid",
          description: "Multiplying an array by a plain Python scalar is exactly what broadcasting is for — it's legal and applies the multiplication to every element.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["numpy-broadcasting"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-two-column-vectors-broadcast-to-matrix",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`a` has shape `(3, 1)`; `b` has shape `(1, 4)`. What is the shape of `a + b`?",
    choices: [
      { id: "a", text: "`(3, 4)` — both axes stretch independently to fill the other's size", correct: true },
      {
        id: "b",
        text: "Raises a `ValueError`, since neither shape matches the other",
        correct: false,
        misconception: {
          id: "assumes-broadcast-needs-a-matching-axis",
          description: "Broadcasting doesn't require one shape to already match the other outright — each axis is checked independently, and here both are compatible (one side is `1` in each position), producing a `(3, 4)` outer-product-like result.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--explain-broadcasting-as-implicit-loop",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain broadcasting as 'the loop you didn't have to write' — connect `A + v` (shapes `(3, 4)` and `(4,)`) to the explicit nested loop it replaces.",
    rubric: {
      elements: [
        {
          id: "equivalent-loop",
          description: "Gives the equivalent explicit loop: for i in range(3): for j in range(4): result[i, j] = A[i, j] + v[j] — showing v[j] is reused across every row i.",
          weight: 3,
          required: true,
        },
        {
          id: "what-broadcasting-buys",
          description: "Explains broadcasting lets you write A + v directly instead of that nested loop, with the interpretation ('v's value is reused for every row') implicit in the shapes rather than spelled out in loop bounds — and it runs as one vectorized operation rather than 12 individual Python-level additions.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-broadcasting--explain-why-trailing-alignment-not-leading",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Broadcasting aligns shapes from the trailing (rightmost) axis. Explain why this specific choice — rather than aligning from the left — makes 'a scalar per row' and 'a scalar per column' naturally distinguishable by shape alone.",
    rubric: {
      elements: [
        {
          id: "trailing-alignment-mechanism",
          description: "Restates that shapes are compared axis by axis starting from the end, with missing leading axes treated as size 1.",
          weight: 2,
          required: true,
        },
        {
          id: "distinguishing-power",
          description: "Explains that with trailing alignment, a (3,) vector automatically means 'align with the last axis' (the columns of a (3,4)... actually varies per row would need (3,1)) — the key point being that the convention makes shape (n,) mean 'one value per element along the last axis', so a genuinely different shape, like (n, 1), is required to mean 'one value per row' instead — the two roles get different, unambiguous shapes rather than colliding.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-alignment-direction-arbitrary",
            description: "Assumes trailing vs. leading alignment is an arbitrary convention with no consequence for which broadcasts are expressible without ambiguity.",
            blameConceptId: "numpy-broadcasting",
          },
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["numpy-broadcasting"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-broadcasting--explain-broadcast-error-message-reading",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A broadcasting error message reads something like `operands could not be broadcast together with shapes (3,4) (3,)`. Explain how to read this message to diagnose the fix, without just re-running code with trial-and-error reshapes.",
    rubric: {
      elements: [
        {
          id: "reading-the-shapes",
          description: "Explains the message names the two operands' actual shapes as NumPy saw them; the fix requires right-aligning them mentally — (3,4) vs (3,) pads the second to (1,3), and comparing trailing axes, 4 vs 3, are unequal and neither is 1, which is exactly why it failed.",
          weight: 3,
          required: true,
        },
        {
          id: "actionable-fix",
          description: "Names the actual fix implied by the diagnosis: the (3,) array was probably meant to align with the first axis (the 3 rows) rather than the last, so it needs to become (3, 1) via reshape or [:, None] before the operation.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-error-as-opaque",
            description: "Treats the broadcasting error message as an opaque failure to be worked around by guessing, rather than a precise, decodable statement of which axes failed to align.",
            blameConceptId: "numpy-broadcasting",
          },
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["numpy-broadcasting"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-broadcasting--transfer-pandas-column-minus-scalar",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "`df[\"price\"] - df[\"price\"].mean()` centers a pandas column around its own mean. What NumPy concept makes subtracting a single scalar (the mean) from an entire column work elementwise?",
    choices: [
      { id: "a", text: "Broadcasting — the same mechanism that lets a NumPy array be combined with a scalar applies here, since a pandas Series is backed by a NumPy array", correct: true },
      {
        id: "b",
        text: "Nothing from NumPy is involved — pandas implements this subtraction independently",
        correct: false,
        misconception: {
          id: "assumes-pandas-arithmetic-unrelated-to-numpy",
          description: "A pandas Series' numeric operations are built on top of the same NumPy array machinery — subtracting a scalar from a Series broadcasts exactly the way it would for the Series' underlying NumPy array.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: 0.55,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["numpy-broadcasting", "pandas-dataframes"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-broadcasting--transfer-pairwise-distance-matrix",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "`x` is a 1-D array of `n` points. Using broadcasting (via `x[:, None]` and `x[None, :]`), write the expression for the `n x n` matrix of pairwise absolute differences, and explain why this is a genuine use of broadcasting rather than just elementwise arithmetic.",
    rubric: {
      elements: [
        {
          id: "expression",
          description: "Gives np.abs(x[:, None] - x[None, :]) (or equivalent), producing an (n, n) matrix.",
          weight: 3,
          required: true,
        },
        {
          id: "why-broadcasting-not-just-elementwise",
          description: "Explains the two operands have different shapes ((n, 1) and (1, n)) rather than matching shapes — this is exactly the case where broadcasting does real work stretching both operands along complementary axes to produce a larger (n, n) result, unlike ordinary elementwise arithmetic between two arrays that already share a shape.",
          weight: 3,
          required: true,
          misconception: {
            id: "confuses-outer-broadcast-with-elementwise-op",
            description: "Treats this as an ordinary same-shape elementwise operation, missing that the two operands have different shapes and the broadcast genuinely expands the result to a larger shape than either input.",
            blameConceptId: "numpy-matrices",
          },
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["numpy-broadcasting", "numpy-matrices"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // pandas Series and DataFrames
  // =========================================================================
  {
    id: "pandas-dataframes--recall-single-vs-double-brackets",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the difference between `df['x']` and `df[['x']]`?",
    choices: [
      { id: "a", text: "The first is a `Series`; the second is a one-column `DataFrame`", correct: true },
      {
        id: "b",
        text: "Nothing — both select the column x",
        correct: false,
        misconception: {
          id: "brackets-equivalent",
          description:
            "Both do select x, but they return different types, so a downstream `.mean()` gives a scalar in one case and a `Series` in the other.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "c",
        text: "The second selects the first row of column x",
        correct: false,
        misconception: {
          id: "double-bracket-indexes-rows",
          description:
            "Reads the inner brackets as a second indexing step. They are a list literal — a list of column names, which happens to have one entry.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "d",
        text: "The second raises `KeyError` unless x is a `MultiIndex` level",
        correct: false,
        misconception: {
          id: "list-selection-needs-multiindex",
          description:
            "List-of-columns selection is the ordinary way to take a subset of columns and needs no `MultiIndex`.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-loc-slice-inclusive",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "s has index `['a', 'b', 'c', 'd']`. How many elements do `s.loc['a':'c']` and `s.iloc[0:2]` return?",
    choices: [
      { id: "a", text: "3 and 2 — `.loc` includes its endpoint, `.iloc` does not", correct: true },
      {
        id: "b",
        text: "2 and 2 — both follow Python's half-open rule",
        correct: false,
        misconception: {
          id: "loc-is-half-open",
          description:
            "Applies the standard slice convention to label slicing. With labels there is no defined 'one past the end' to stop before, so `.loc` includes the endpoint — the one place pandas breaks the Python rule.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "c",
        text: "3 and 3 — both are inclusive",
        correct: false,
        misconception: {
          id: "iloc-is-inclusive",
          description:
            "`.iloc` is positional and keeps the ordinary half-open rule. Only label-based slicing is inclusive.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "d",
        text: "3 and 2, but only because the index happens to be sorted",
        correct: false,
        misconception: {
          id: "requires-sorted-index",
          description:
            "Sortedness affects whether a label slice is well-defined on a non-unique index, not whether the endpoint is included.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.7,
    expectedSeconds: 45,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--apply-alignment-length",
    conceptId: "pandas-dataframes",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "s1 has index `['a', 'b', 'c']` and s2 has index `['b', 'c', 'd']`, both complete with no missing values. How many entries does s1 + s2 have?",
    answerKey: 4,
    tolerance: 0,
    difficulty: 0.2,
    discrimination: 1.6,
    expectedSeconds: 45,
    prereqClosure: ["pandas-dataframes"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-dataframes--apply-alignment-nans",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Using the two `Series` above, state which entries of s1 + s2 are `NaN` and why, and give the call that would treat a missing label as zero instead.",
    rubric: {
      elements: [
        {
          id: "which",
          description:
            "Says 'a' and 'd' are NaN — each appears in only one operand — while 'b' and 'c' sum normally.",
          weight: 3,
          required: true,
        },
        {
          id: "mechanism",
          description:
            "Explains that pandas aligns on the union of the two indexes and matches by label, never by position, so an unmatched label yields NaN even though neither input was missing anything.",
          weight: 3,
          required: true,
          misconception: {
            id: "aligns-by-position",
            description:
              "Assumes two equal-length `Series` add position by position. They do not — which is why a filtered or reordered `Series` still adds correctly, and why two complete inputs can produce NaNs.",
            blameConceptId: "pandas-dataframes",
          },
        },
        {
          id: "fill-value",
          description: "Gives s1.add(s2, fill_value=0).",
          weight: 2,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.7,
    expectedSeconds: 150,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--apply-index-after-filter",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "df has a default `RangeIndex` of 0..99. After sub = `df[df.x > 0]` keeps rows 5, 12 and 40, what does `sub.loc[0]` do?",
    choices: [
      { id: "a", text: "Raises `KeyError` — label 0 is not in the filtered index", correct: true },
      {
        id: "b",
        text: "Returns the first row of sub, which was row 5 of df",
        correct: false,
        misconception: {
          id: "loc-is-positional",
          description:
            "Treats `.loc` as positional. Filtering keeps the original labels, so sub's index is `[5, 12, 40]` and 0 is simply absent. `.iloc[0]` is the positional request.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "c",
        text: "Returns row 0 of the original df",
        correct: false,
        misconception: {
          id: "filter-keeps-parent",
          description:
            "Assumes the filtered frame can still reach rows it excluded. It holds only the three surviving rows; the label just happens to remember where they came from.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "d",
        text: "Returns `NaN`",
        correct: false,
        misconception: {
          id: "missing-label-gives-nan",
          description:
            "Confuses lookup with alignment. Alignment fills unmatched labels with `NaN`; a direct .loc lookup of an absent label raises.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.8,
    expectedSeconds: 60,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--explain-why-index-exists",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "A `Series` is often described as 'a NumPy array with an index'. Explain what the index buys that the array alone does not, and one thing it costs.",
    rubric: {
      elements: [
        {
          id: "alignment",
          description:
            "Says the index makes operations align by label, so Series that have been filtered, reordered or reindexed still combine correctly without the caller tracking positions.",
          weight: 3,
          required: true,
        },
        {
          id: "lookup",
          description:
            "Notes the index is also a lookup structure — label-based selection, joins, and time-based slicing all rest on it.",
          weight: 2,
        },
        {
          id: "cost",
          description:
            "Names a real cost: results can grow to the union of two indexes and acquire NaNs, positional intuition stops holding after a filter, and every operation carries alignment overhead a bare array does not.",
          weight: 3,
          required: true,
          misconception: {
            id: "index-is-free-labelling",
            description:
              "Treats the index as decoration on top of an array. It changes the semantics of arithmetic, which is why the same code on arrays and on `Series` can give different-length answers.",
            blameConceptId: "pandas-dataframes",
          },
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.7,
    expectedSeconds: 170,
    prereqClosure: ["pandas-dataframes", "numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-dataframes--explain-chained-assignment",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Explain what `SettingWithCopyWarning` is telling you when `df[df.x > 0]['y']` = 1 triggers it, and why `df.loc[df.x > 0, 'y']` = 1 is not merely a stylistic improvement.",
    rubric: {
      elements: [
        {
          id: "two-operations",
          description:
            "Identifies that the first form is two separate indexing operations: one produces an intermediate object, and the assignment then targets that intermediate rather than df.",
          weight: 3,
          required: true,
        },
        {
          id: "view-or-copy",
          description:
            "Says whether the intermediate is a view or a copy is not guaranteed, so the write may or may not reach df — the warning exists precisely because the outcome cannot be determined from the code.",
          weight: 3,
          required: true,
          misconception: {
            id: "warning-is-noise",
            description:
              "Treats the warning as a lint nit to be silenced. It reports a real ambiguity about whether the assignment took effect, and silencing it does not resolve the ambiguity.",
            blameConceptId: "pandas-dataframes",
          },
        },
        {
          id: "loc-fix",
          description:
            "Explains that the .loc form is a single indexing operation naming both rows and column, so pandas can write straight into df with no intermediate to be ambiguous about.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "suppress",
          description: "Recommends suppressing the warning, or calling .copy() on the intermediate, as the fix — neither makes the assignment reach df.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.8,
    expectedSeconds: 190,
    prereqClosure: ["pandas-dataframes", "numpy-arrays"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--transfer-nan-mean-denominator",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A report divides `df['revenue'].sum()` by `len(df)` to get an average, while a colleague uses `df['revenue'].mean()`. The two disagree. Explain why, say which is right, and describe how you would decide.",
    rubric: {
      elements: [
        {
          id: "cause",
          description:
            "Identifies missing values: .sum() and .mean() skip NaN by default, so .mean() divides by the count of non-missing entries while len(df) counts every row.",
          weight: 3,
          required: true,
          misconception: {
            id: "nan-is-zero",
            description:
              "Assumes `NaN` behaves as 0. It is skipped, not zeroed — which changes the denominator, not just the numerator, and is why the two calculations differ.",
            blameConceptId: "pandas-dataframes",
          },
        },
        {
          id: "neither-is-automatically-right",
          description:
            "Says neither is right in the abstract: the question is whether a missing revenue means 'no revenue' (denominator should be all rows) or 'unknown' (denominator should exclude it), which is a fact about the data, not about pandas.",
          weight: 3,
          required: true,
        },
        {
          id: "how-to-decide",
          description:
            "Gives a concrete way to decide and to make the choice explicit: check df['revenue'].isna().sum(), then either fillna(0) deliberately or use .mean() and report the n it was computed over. skipna=False is the way to make the missingness impossible to ignore.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.9,
    expectedSeconds: 200,
    prereqClosure: ["pandas-dataframes"],
    source: AUTHORED,
    status: "live",
  },

  {
    id: "pandas-dataframes--recall-read-csv-function",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which pandas function loads a CSV file into a DataFrame?",
    choices: [
      { id: "a", text: "`pd.read_csv(\"file.csv\")`", correct: true },
      {
        id: "b",
        text: "`pd.load_csv(\"file.csv\")`",
        correct: false,
        misconception: {
          id: "invents-load-csv-function",
          description: "pandas has no `load_csv` function — the CSV-reading function is named `read_csv`.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 0.8,
    expectedSeconds: 10,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-head-method",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `df.head()` return, with no argument?",
    choices: [
      { id: "a", text: "The first 5 rows of `df`", correct: true },
      {
        id: "b",
        text: "The column names only, with no row data",
        correct: false,
        misconception: {
          id: "confuses-head-with-columns-attribute",
          description: "`.head()` previews actual rows of data (the first 5 by default) — `df.columns` is the separate attribute that lists just the column names.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 0.9,
    expectedSeconds: 15,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-shape-attribute",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`df` has 100 rows and 5 columns. What is `df.shape`?",
    choices: [
      { id: "a", text: "`(100, 5)`", correct: true },
      {
        id: "b",
        text: "`500`, the total number of cells",
        correct: false,
        misconception: {
          id: "confuses-dataframe-shape-with-cell-count",
          description: "`.shape` is a `(rows, columns)` tuple, mirroring a NumPy array's `.shape` — it isn't a single number of cells.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["pandas-dataframes", "numpy-arrays"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-columns-attribute",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `df.columns` give you?",
    choices: [
      { id: "a", text: "The DataFrame's column labels, as an `Index`-like sequence", correct: true },
      {
        id: "b",
        text: "The number of columns, as an int",
        correct: false,
        misconception: {
          id: "confuses-columns-attribute-with-count",
          description: "`.columns` is the collection of column *names* themselves — for the count, you'd use `len(df.columns)` or `df.shape[1]`.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-column-selection-syntax",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How do you select the `\"age\"` column from `df` as a Series?",
    choices: [
      { id: "a", text: "`df[\"age\"]`", correct: true },
      {
        id: "b",
        text: "`df.get_column(\"age\")`",
        correct: false,
        misconception: {
          id: "invents-get-column-method",
          description: "There's no `get_column` method — a single column is selected with `df[\"age\"]` (or the attribute form `df.age`, when the name is a valid identifier).",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -1.1,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-boolean-mask-filtering",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which expression filters `df` down to rows where the `\"age\"` column is over 30?",
    choices: [
      { id: "a", text: "`df[df[\"age\"] > 30]`", correct: true },
      {
        id: "b",
        text: "`df.filter(age > 30)`",
        correct: false,
        misconception: {
          id: "invents-filter-with-bare-condition",
          description: "The idiomatic way to filter rows is boolean-mask indexing: build a boolean Series (`df[\"age\"] > 30`) and index the DataFrame with it — `.filter()` exists but selects by label pattern, not by a row condition like this.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["pandas-dataframes", "numpy-arrays"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-dropna-method",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `df.dropna()` do?",
    choices: [
      { id: "a", text: "Returns a new DataFrame with rows containing any missing values removed", correct: true },
      {
        id: "b",
        text: "Replaces every missing value with `0`",
        correct: false,
        misconception: {
          id: "confuses-dropna-with-fillna",
          description: "`.dropna()` removes rows (or columns, with `axis=1`) that contain missing values — `.fillna()` is the method that replaces them with a given value instead.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-isna-method",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `df.isna()` return?",
    choices: [
      { id: "a", text: "A same-shape DataFrame of `True`/`False`, marking which cells are missing", correct: true },
      {
        id: "b",
        text: "A single boolean: whether the DataFrame has any missing values at all",
        correct: false,
        misconception: {
          id: "confuses-isna-with-any-missing-check",
          description: "`.isna()` is elementwise, giving a full boolean DataFrame the same shape as the original — `df.isna().any().any()` (or similar) is what you'd chain on top to get a single summary boolean.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-sort-values-method",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which method sorts a DataFrame's rows by the values in a given column?",
    choices: [
      { id: "a", text: "`df.sort_values(\"age\")`", correct: true },
      {
        id: "b",
        text: "`df.sort(\"age\")`",
        correct: false,
        misconception: {
          id: "uses-removed-sort-method-name",
          description: "`.sort()` was removed from pandas long ago — the current method for sorting by column values is `.sort_values()`.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-loc-vs-iloc",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What's the core difference between `df.loc[...]` and `df.iloc[...]`?",
    choices: [
      { id: "a", text: "`.loc` selects by label (index/column names); `.iloc` selects by integer position", correct: true },
      {
        id: "b",
        text: "They're interchangeable aliases for the same thing",
        correct: false,
        misconception: {
          id: "assumes-loc-iloc-interchangeable",
          description: "The two select along genuinely different axes of meaning — `.loc` looks up by the actual label (which might not be a small integer at all), `.iloc` always by 0-based position, regardless of what the labels are.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-new-column-assignment",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`df[\"total\"] = df[\"price\"] * df[\"qty\"]`. What does this do?",
    choices: [
      { id: "a", text: "Adds a new column `\"total\"` to `df`, computed elementwise from the other two columns", correct: true },
      {
        id: "b",
        text: "Raises an error, since `\"total\"` doesn't already exist as a column",
        correct: false,
        misconception: {
          id: "assumes-column-must-preexist",
          description: "Assigning to a bracket key that isn't yet a column name creates a brand-new column — it doesn't require the column to already exist, unlike item assignment on some other structures.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["pandas-dataframes", "numpy-broadcasting"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-describe-method",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `df.describe()` give you?",
    choices: [
      { id: "a", text: "Summary statistics (count, mean, std, min, quartiles, max) for each numeric column", correct: true },
      {
        id: "b",
        text: "A plain-English description of the DataFrame's contents",
        correct: false,
        misconception: {
          id: "assumes-describe-gives-english-summary",
          description: "`.describe()` computes numeric summary statistics per column, not a natural-language description — it returns another DataFrame of numbers.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-merge-function",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which function joins two DataFrames together on a shared key column, similar to a SQL join?",
    choices: [
      { id: "a", text: "`pd.merge(df1, df2, on=\"id\")`", correct: true },
      {
        id: "b",
        text: "`pd.zip(df1, df2)`",
        correct: false,
        misconception: {
          id: "confuses-merge-with-zip",
          description: "There's no `pd.zip` function — joining two DataFrames on a common key uses `pd.merge()` (or the equivalent `.merge()` method), which matches rows by key value rather than simply pairing them up by position.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["pandas-dataframes", "python-loops"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-series-vs-dataframe",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is a single column of a DataFrame, considered on its own?",
    choices: [
      { id: "a", text: "A `Series`", correct: true },
      {
        id: "b",
        text: "A `DataFrame` with exactly one column, always",
        correct: false,
        misconception: {
          id: "conflates-series-with-single-column-dataframe",
          description: "`df[\"col\"]` (single brackets) gives you a `Series`, a distinct one-dimensional type — `df[[\"col\"]]` (double brackets) is what gives back a one-column `DataFrame` instead.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--explain-dataframe-as-dict-of-columns",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain the mental model 'a DataFrame is like a dict of equal-length Series, one per column,' and use it to explain why `df[\"new_col\"] = some_series` is a natural, cheap operation.",
    rubric: {
      elements: [
        {
          id: "model",
          description: "Explains each column is conceptually its own Series (a labeled 1-D array), and the DataFrame is the structure that holds several of them together, aligned by a shared row index — much like a dict mapping column name to its Series.",
          weight: 3,
          required: true,
        },
        {
          id: "why-assignment-natural",
          description: "Explains that under this model, adding a column is just adding one more entry to that dict-like structure — no need to touch or copy the existing columns, which is why assigning a new column is comparatively cheap and doesn't require rebuilding the whole table.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-dataframe-is-fundamentally-row-oriented",
            description: "Assumes a DataFrame is fundamentally stored row by row (like a list of records), missing that operations are naturally column-oriented, which is why per-column arithmetic is fast and adding a column is cheap.",
            blameConceptId: "pandas-dataframes",
          },
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["pandas-dataframes", "python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-dataframes--explain-index-alignment",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Two Series with different (but overlapping) indexes are added together: `s1 + s2`. Explain how pandas decides which values get added to which, and what happens for an index label that's present in only one of the two.",
    rubric: {
      elements: [
        {
          id: "alignment-by-label",
          description: "Explains pandas aligns the two Series by their index labels before adding — values are combined only when they share the same label, not by raw position the way two plain NumPy arrays would be.",
          weight: 3,
          required: true,
        },
        {
          id: "unmatched-label-becomes-nan",
          description: "Explains a label present in only one Series produces NaN in the result at that position, since there's no matching value from the other side to combine it with.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-series-add-by-position",
            description: "Assumes s1 + s2 combines values purely by their position (like zip would), ignoring that pandas actually aligns by index label first.",
            blameConceptId: "numpy-arrays",
          },
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["pandas-dataframes", "numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-dataframes--explain-chained-indexing-warning",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "`df[df[\"age\"] > 30][\"score\"] = 0` sometimes raises a `SettingWithCopyWarning` and may not actually modify `df`. Explain why chaining two bracket operations like this is risky, and give a safer alternative.",
    rubric: {
      elements: [
        {
          id: "why-risky",
          description: "Explains the first bracket operation may return either a view or a copy of the underlying data (pandas doesn't guarantee which), so the second assignment might silently modify a throwaway copy rather than the original df — the warning exists because pandas itself can't always tell you which case you're in.",
          weight: 3,
          required: true,
        },
        {
          id: "safer-alternative",
          description: "Gives the safer form using a single .loc call: df.loc[df[\"age\"] > 30, \"score\"] = 0, which combines the row filter and column selection into one indexing operation pandas can reason about unambiguously.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-chained-brackets-always-equivalent-to-loc",
            description: "Assumes df[mask][\"col\"] = value is just a stylistic variant of df.loc[mask, \"col\"] = value with identical, reliable behavior.",
            blameConceptId: "pandas-dataframes",
          },
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--transfer-dataframe-column-arithmetic-is-vectorized",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "`df[\"total\"] = df[\"price\"] * df[\"qty\"]` computes a new column for every row with no explicit Python loop. What NumPy concept is directly responsible for this being both concise and fast?",
    choices: [
      { id: "a", text: "Vectorization / elementwise array operations — each column is array-backed, so `*` applies across every row at once in compiled code", correct: true },
      {
        id: "b",
        text: "pandas re-implements arithmetic independently of NumPy specifically to support this syntax",
        correct: false,
        misconception: {
          id: "assumes-pandas-arithmetic-independent-of-numpy",
          description: "This is the same elementwise vectorization NumPy arrays provide — pandas Series are array-backed, so column arithmetic inherits NumPy's fast, loop-free elementwise operators rather than reimplementing them.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: 0.55,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["pandas-dataframes", "numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-dataframes--transfer-dataframe-as-nested-dict-relationship",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A DataFrame can be constructed from a dict of lists: `pd.DataFrame({\"name\": [\"Ada\", \"Grace\"], \"age\": [36, 34]})`. Explain the correspondence between this dict's structure and the resulting DataFrame's shape, and why the lists must all be the same length.",
    rubric: {
      elements: [
        {
          id: "correspondence",
          description: "Explains each dict key becomes a column name and its list becomes that column's values, row by row in list order — so the dict's keys line up with df.columns and each list's position i lines up with row i.",
          weight: 3,
          required: true,
        },
        {
          id: "why-equal-length-required",
          description: "Explains every column must supply exactly one value per row, so if the lists had different lengths there would be no well-defined number of rows for the table — pandas raises an error rather than silently padding shorter lists or truncating longer ones.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-mismatched-list-lengths-tolerated",
            description: "Assumes pandas would pad shorter lists with NaN or truncate longer ones automatically when building a DataFrame from mismatched-length lists.",
            blameConceptId: "python-dictionaries",
          },
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["pandas-dataframes", "python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // groupby, Merge, and Reshape
  // =========================================================================
  {
    id: "pandas-groupby--recall-agg-output-rows",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "df has 500 rows and 12 distinct values of the column k. How many rows does `df.groupby('k')['v'].mean()` return?",
    choices: [
      { id: "a", text: "12 — one per group", correct: true },
      {
        id: "b",
        text: "500 — the group mean is attached to each row",
        correct: false,
        misconception: {
          id: "agg-broadcasts",
          description:
            "Describes transform, not agg. An aggregation returns one row per group; transform is what broadcasts the group's value back over its rows.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "c",
        text: "1 — the overall mean",
        correct: false,
        misconception: {
          id: "groupby-ignored",
          description:
            "Ignores the split entirely. Grouping is what makes the aggregation per-key rather than global.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "d",
        text: "12 rows and 500 columns",
        correct: false,
        misconception: {
          id: "confuses-with-pivot",
          description:
            "Describes a reshaping operation. A groupby aggregation reduces rows; it does not spread values across columns unless you pivot or unstack.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.4,
    expectedSeconds: 30,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-merge-default-how",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the default how= for pd.merge, and what does it do to non-matching rows?",
    choices: [
      { id: "a", text: "inner — rows whose key is absent from either frame are dropped", correct: true },
      {
        id: "b",
        text: "left — every row of the left frame is kept",
        correct: false,
        misconception: {
          id: "default-is-left",
          description:
            "Assumes the SQL habit of writing LEFT JOIN carries over as the default. pandas defaults to inner, so an unmatched left row disappears rather than gaining NaNs.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "c",
        text: "outer — every key from both frames is kept",
        correct: false,
        misconception: {
          id: "default-is-outer",
          description:
            "The most conservative option is not the default. Choosing outer is a deliberate act.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "d",
        text: "There is no default; how= is required",
        correct: false,
        misconception: {
          id: "how-required",
          description:
            "It is optional, which is precisely why the silent row loss is so easy to ship.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.4,
    expectedSeconds: 30,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--apply-many-to-many-rows",
    conceptId: "pandas-groupby",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "Left and right frames are merged on 'id'. Both contain only id = 7: the left has 3 such rows and the right has 2. How many rows does the inner merge produce?",
    answerKey: 6,
    tolerance: 0,
    difficulty: 0.5,
    discrimination: 1.7,
    expectedSeconds: 50,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-groupby--apply-transform-vs-agg",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Which expression subtracts each row's group mean from its own value, leaving one row per original row?",
    choices: [
      { id: "a", text: "`df['v']` - `df.groupby('k')['v'].transform('mean')`", correct: true },
      {
        id: "b",
        text: "`df['v']` - `df.groupby('k')['v'].mean()`",
        correct: false,
        misconception: {
          id: "agg-then-subtract",
          description:
            "The aggregation is indexed by k, not by df's index, so alignment matches group labels against row labels and yields a mostly-`NaN` result of the wrong length — a silent failure, not an error.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "c",
        text: "`df.groupby('k')['v'].apply(lambda s: s - s.mean()).reset_index(drop=True)`",
        correct: false,
        misconception: {
          id: "apply-then-drop-index",
          description:
            "Computes the right values but discards the index that would align them, so the rows come back in group order rather than original order — correct numbers, wrong rows.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "d",
        text: "`df['v']` - `df['v'].mean()`",
        correct: false,
        misconception: {
          id: "global-mean",
          description: "Centres against the overall mean, ignoring the grouping entirely.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.8,
    expectedSeconds: 70,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--apply-pivot-vs-pivot-table",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Two rows share the same index and column values. State what pivot does and what pivot_table does, and argue which behaviour you would rather have when the duplication was unexpected.",
    rubric: {
      elements: [
        {
          id: "behaviours",
          description:
            "Says pivot raises ValueError because the cell is ambiguous, while pivot_table applies its default aggfunc — 'mean' — and produces a value.",
          weight: 3,
          required: true,
        },
        {
          id: "preference",
          description:
            "Argues for the exception when the duplication was not expected: it reports that a key you believed unique is not, whereas the averaged cell hides a data-quality problem behind a plausible number.",
          weight: 3,
          required: true,
          misconception: {
            id: "prefers-the-one-that-runs",
            description:
              "Prefers pivot_table because it does not fail. Not failing is only an advantage when duplicates are expected and averaging them is the intended summary.",
            blameConceptId: "pandas-groupby",
          },
        },
        {
          id: "when-table-is-right",
          description:
            "Bonus: notes pivot_table is the right tool when duplicates are expected and an explicit aggfunc states how they should be combined.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.7,
    expectedSeconds: 160,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--explain-split-apply-combine",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "agg, transform and filter are all groupby operations that differ mainly in what the applied function returns. Explain the correspondence between what the function returns and the shape of the result, for each of the three.",
    rubric: {
      elements: [
        {
          id: "agg",
          description:
            "agg: the function returns one scalar per group, so the result has one row per group and is indexed by the grouping key.",
          weight: 3,
          required: true,
        },
        {
          id: "transform",
          description:
            "transform: the function returns something the same length as the group, so the result is the same length as the input and carries the original index — which is what lets it be combined with the original frame directly.",
          weight: 3,
          required: true,
          misconception: {
            id: "transform-aggregates",
            description:
              "Believes transform returns one row per group like agg. Its defining property is preserving the input's length and index.",
            blameConceptId: "pandas-groupby",
          },
        },
        {
          id: "filter",
          description:
            "filter: the function returns a single boolean per group, and the result is the original rows of the groups that passed — whole groups are kept or dropped, never individual rows.",
          weight: 3,
          required: true,
        },
        {
          id: "connection",
          description:
            "Bonus: connects transform to keepdims in a NumPy reduction — both keep a reduced quantity in a shape that can be combined back with what it was reduced from.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.8,
    expectedSeconds: 200,
    prereqClosure: ["pandas-groupby", "pandas-dataframes", "numpy-arrays"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--explain-long-vs-wide",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Explain the difference between long and wide layouts of the same data, and why analysis code generally wants long while a reader generally wants wide.",
    rubric: {
      elements: [
        {
          id: "definitions",
          description:
            "Long: one row per observation, with variable names appearing as values in a column. Wide: one row per subject, with a column per variable or time point.",
          weight: 3,
          required: true,
        },
        {
          id: "why-long-for-code",
          description:
            "Explains that in long form the variable is data, so grouping, filtering, faceting and modelling can all address it uniformly — whereas in wide form the variable is encoded in the column name, which code has to parse or hard-code.",
          weight: 3,
          required: true,
          misconception: {
            id: "long-is-just-a-convention",
            description:
              "Treats the preference as taste. It follows from where the variable lives: as a value it is addressable, as a column name it is metadata that every operation must special-case.",
            blameConceptId: "pandas-groupby",
          },
        },
        {
          id: "why-wide-for-readers",
          description:
            "Notes that wide form puts one subject on one line and makes comparison across columns visual, which is what a table is for.",
          weight: 2,
        },
        {
          id: "operations",
          description: "Names pivot/pivot_table as long-to-wide and melt as its inverse.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--transfer-merge-inflated-total",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "After joining an orders table to a customers table on customer_id, total revenue comes out roughly double. Nothing raised, and no row looks wrong. Diagnose the likely cause, explain why the totals inflate rather than the row values, and give two checks that would have caught it before the total was reported.",
    rubric: {
      elements: [
        {
          id: "duplicate-keys",
          description:
            "Diagnoses a duplicated key on the customers side — two rows per customer_id, so each order matches twice and the join emits the cross product within each key.",
          weight: 3,
          required: true,
          misconception: {
            id: "blames-the-values",
            description:
              "Looks for wrong numbers in the revenue column. Every individual value is correct; the total is wrong because rows were duplicated, which is why inspecting rows finds nothing.",
            blameConceptId: "pandas-groupby",
          },
        },
        {
          id: "why-totals-only",
          description:
            "Explains that duplication is invisible per row — each copy is a faithful copy — and only shows up in anything that aggregates, so a sum doubles while a spot-check of ten rows looks perfect.",
          weight: 3,
          required: true,
        },
        {
          id: "checks",
          description:
            "Gives two concrete checks: compare len(df) before and after the merge, and assert the key's uniqueness — customers['customer_id'].is_unique, or pass validate='one_to_many' so a violation raises at the merge itself. indicator=True to see which side rows came from also counts.",
          weight: 3,
          required: true,
        },
        {
          id: "fix",
          description:
            "Bonus: says the fix is to deduplicate or aggregate the customers side to one row per key before joining, rather than deduplicating after the fact.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "drop-duplicates-blindly",
          description:
            "Proposes calling drop_duplicates() on the merged result, which removes legitimately identical order rows along with the spurious ones.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 2.0,
    expectedSeconds: 240,
    prereqClosure: ["pandas-groupby", "pandas-dataframes", "python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },

  {
    id: "pandas-groupby--recall-groupby-basic-syntax",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which call groups `df`'s rows by the `\"category\"` column?",
    choices: [
      { id: "a", text: "`df.groupby(\"category\")`", correct: true },
      {
        id: "b",
        text: "`df.group(\"category\")`",
        correct: false,
        misconception: {
          id: "misnames-groupby-method",
          description: "The method is named `groupby`, not `group` — omitting the `by` is a plain `AttributeError`.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 0.9,
    expectedSeconds: 10,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-groupby-alone-not-final-result",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`df.groupby(\"category\")` by itself, with no aggregation chained after it — what does this return?",
    choices: [
      { id: "a", text: "A `GroupBy` object describing the grouping, not a finished table of results", correct: true },
      {
        id: "b",
        text: "A DataFrame with one row per group, already summarized",
        correct: false,
        misconception: {
          id: "assumes-groupby-alone-produces-summary",
          description: "`.groupby()` alone just sets up the grouping — it's lazy until you chain an aggregation like `.sum()`, `.mean()`, or `.agg()` to actually compute per-group results.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-groupby-sum-aggregation",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`df.groupby(\"category\")[\"sales\"].sum()`. What does this compute?",
    choices: [
      { id: "a", text: "The total of the `\"sales\"` column, separately for each distinct value of `\"category\"`", correct: true },
      {
        id: "b",
        text: "The overall total of `\"sales\"` across the whole DataFrame, ignoring `\"category\"`",
        correct: false,
        misconception: {
          id: "ignores-groupby-grouping-effect",
          description: "Chaining `.sum()` after `.groupby(\"category\")` computes one sum *per group*, not a single grand total — the whole point of `groupby` is to compute the aggregation separately within each group.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-groupby-result-index-is-group-keys",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`df.groupby(\"category\")[\"sales\"].sum()`. What forms the index of the resulting Series?",
    choices: [
      { id: "a", text: "The distinct values of `\"category\"`", correct: true },
      {
        id: "b",
        text: "The original row numbers of `df`",
        correct: false,
        misconception: {
          id: "assumes-groupby-result-keeps-original-row-index",
          description: "Aggregating collapses many original rows into one row per group — the result's index is naturally the group keys (the distinct category values), not the original per-row index.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-groupby-multiple-columns",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Can you group by more than one column at once, like `df.groupby([\"region\", \"category\"])`?",
    choices: [
      { id: "a", text: "Yes — grouping by a list of column names groups by every combination of their values", correct: true },
      {
        id: "b",
        text: "No — `groupby` accepts exactly one column name",
        correct: false,
        misconception: {
          id: "assumes-groupby-single-column-only",
          description: "Passing a list of column names groups by the combination of those columns together — one group per distinct (region, category) pair, not a restriction to a single column.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-agg-method-multiple-functions",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `.agg([\"mean\", \"max\"])` chained after a groupby let you do that a single `.mean()` call can't?",
    choices: [
      { id: "a", text: "Compute several different aggregation functions on the same grouped column at once", correct: true },
      {
        id: "b",
        text: "Nothing different — `.agg([\"mean\", \"max\"])` and `.mean()` compute the exact same thing",
        correct: false,
        misconception: {
          id: "assumes-agg-list-same-as-single-agg",
          description: "`.agg()` with a list of function names computes each one and returns them side by side as separate columns — a single `.mean()` call only ever gives you the mean.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-groupby-count-vs-size",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What's the key difference between `.groupby(\"category\").size()` and `.groupby(\"category\").count()`?",
    choices: [
      { id: "a", text: "`.size()` counts all rows per group (including missing values); `.count()` counts non-missing values per group, per column", correct: true },
      {
        id: "b",
        text: "They're exact synonyms — either can be used interchangeably",
        correct: false,
        misconception: {
          id: "assumes-size-and-count-identical",
          description: "They behave the same only when there are no missing values — `.count()` is computed per column and excludes NaNs, while `.size()` just reports the row count per group with no column-by-column breakdown.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-groupby-preserves-other-columns-via-agg-dict",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`df.groupby(\"category\").agg({\"sales\": \"sum\", \"units\": \"mean\"})`. What does the dict argument to `.agg()` specify?",
    choices: [
      { id: "a", text: "Which aggregation function to apply to each named column, individually", correct: true },
      {
        id: "b",
        text: "A dict of the resulting values, to be inserted directly with no computation",
        correct: false,
        misconception: {
          id: "misreads-agg-dict-as-literal-output",
          description: "The dict passed to `.agg()` is a *specification* — for each key (column name), it names the aggregation function to compute — not the literal result values themselves.",
          blameConceptId: "python-dictionaries",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["pandas-groupby", "python-dictionaries"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-groupby-reset-index",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "After `result = df.groupby(\"category\")[\"sales\"].sum()`, `\"category\"` ends up as the *index*, not a regular column. Which method turns it back into an ordinary column?",
    choices: [
      { id: "a", text: "`result.reset_index()`", correct: true },
      {
        id: "b",
        text: "`result.set_index()`",
        correct: false,
        misconception: {
          id: "confuses-set-index-with-reset-index",
          description: "`.set_index()` does the opposite — it *moves a column into* the index. `.reset_index()` is what moves the current index back out into an ordinary column.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: 0.15,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-groupby-apply-vs-agg",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "When would you reach for `.groupby(...).apply(custom_fn)` rather than `.groupby(...).agg(\"mean\")`?",
    choices: [
      { id: "a", text: "When the per-group computation is a custom function that isn't one of the built-in aggregation names", correct: true },
      {
        id: "b",
        text: "Never — `.apply()` and `.agg()` are strictly identical and interchangeable everywhere",
        correct: false,
        misconception: {
          id: "assumes-apply-and-agg-always-identical",
          description: "`.agg()` is for naming a known aggregation (built-in or a simple function reducing each group to one value); `.apply()` is more general and can run any custom function on each group's sub-DataFrame, including ones producing more complex, non-scalar results.",
          blameConceptId: "python-functions",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["pandas-groupby", "python-functions"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-groupby-does-not-mutate-original",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`result = df.groupby(\"category\").sum()`. Does this change `df` itself?",
    choices: [
      { id: "a", text: "No — `df` is left completely unchanged; `result` is a new object", correct: true },
      {
        id: "b",
        text: "Yes — `df`'s rows are collapsed down to one per group in place",
        correct: false,
        misconception: {
          id: "assumes-groupby-mutates-original-dataframe",
          description: "Like almost all pandas operations, `groupby` followed by an aggregation returns a *new* result object — it never rewrites `df` in place.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-groupby-key-not-required-to-be-column",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Can you group by something other than an existing column, like a Series computed from `df` (e.g. `df[\"age\"] // 10 * 10` to bucket into decades)?",
    choices: [
      { id: "a", text: "Yes — `groupby` accepts any array-like of the same length as `df`, not just an existing column name", correct: true },
      {
        id: "b",
        text: "No — the argument to `groupby` must be an existing column's name",
        correct: false,
        misconception: {
          id: "restricts-groupby-to-existing-column-name",
          description: "`groupby()` accepts any grouping key of matching length, including a computed Series that isn't (yet) a column of `df` — it doesn't have to already exist as one of `df`'s columns.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-value-counts-relates-to-groupby",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`df[\"category\"].value_counts()` gives the count of each distinct category value. Which `groupby` expression computes the same thing?",
    choices: [
      { id: "a", text: "`df.groupby(\"category\").size()`", correct: true },
      {
        id: "b",
        text: "`df.groupby(\"category\").mean()`",
        correct: false,
        misconception: {
          id: "confuses-mean-aggregation-with-count",
          description: "`.mean()` averages a numeric column per group — it doesn't count how many rows fall in each group. `.size()` is the aggregation that answers 'how many rows per group.'",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: 0.05,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-groupby-sort-default",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "By default, does `df.groupby(\"category\")` return groups in sorted order of the category values?",
    choices: [
      { id: "a", text: "Yes — `groupby` sorts the group keys by default (`sort=True`)", correct: true },
      {
        id: "b",
        text: "No — groups always appear in the order they first appeared in `df`, with no way to change that",
        correct: false,
        misconception: {
          id: "assumes-groupby-order-fixed-to-appearance",
          description: "The default is to sort group keys, but this is configurable — passing `sort=False` gives groups in first-appearance order instead, so it isn't a fixed, unchangeable behavior.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -0.1,
    discrimination: 1.2,
    expectedSeconds: 25,
    prereqClosure: ["pandas-groupby"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--explain-split-apply-combine-steps",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain the 'split-apply-combine' framing of `groupby`, naming what happens in each of the three named steps for `df.groupby(\"category\")[\"sales\"].sum()`.",
    rubric: {
      elements: [
        {
          id: "split",
          description: "Explains 'split' divides df's rows into separate groups, one per distinct category value.",
          weight: 2,
          required: true,
        },
        {
          id: "apply",
          description: "Explains 'apply' runs the aggregation (sum) independently within each of those groups, producing one result per group.",
          weight: 2,
          required: true,
        },
        {
          id: "combine",
          description: "Explains 'combine' assembles the per-group results back into a single Series/DataFrame, indexed by the group keys.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["pandas-groupby"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-groupby--explain-groupby-vs-manual-loop",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why `df.groupby(\"category\")[\"sales\"].sum()` is preferable to a hand-written loop that builds a dict of running sums keyed by category, beyond it just being fewer lines.",
    rubric: {
      elements: [
        {
          id: "correctness-details",
          description: "Explains groupby handles the fiddly correctness details automatically — creating a new bucket for a first-seen category, handling missing/NaN values consistently, and producing a properly labeled, sorted result — all of which a hand-rolled loop has to get right on its own.",
          weight: 3,
          required: true,
        },
        {
          id: "performance",
          description: "Explains groupby's aggregation runs as a vectorized operation over the underlying array data rather than an interpreted Python loop incrementing a dict entry per row, so it scales far better on large DataFrames.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-groupby-as-purely-syntactic-sugar",
            description: "Treats groupby as merely a shorter way to spell the same loop, missing the correctness and performance differences.",
            blameConceptId: "python-dictionaries",
          },
        },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["pandas-groupby", "python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-groupby--explain-choosing-single-vs-multi-column-groupby",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain the difference in the resulting index structure between `df.groupby(\"region\")[\"sales\"].sum()` and `df.groupby([\"region\", \"category\"])[\"sales\"].sum()`, and what determines which one is the right tool for a given question.",
    rubric: {
      elements: [
        {
          id: "index-structure-difference",
          description: "Explains grouping by a single column gives a result indexed by that column's distinct values, while grouping by a list of columns gives a result with a MultiIndex — one level per grouping column, covering every combination actually present in the data.",
          weight: 3,
          required: true,
        },
        {
          id: "choice-criterion",
          description: "Explains the right choice follows directly from the granularity of the question being asked: 'total sales per region' needs one grouping column, while 'total sales per region and category combination' genuinely needs both columns in the groupby.",
          weight: 3,
          required: true,
          misconception: {
            id: "picks-groupby-columns-arbitrarily",
            description: "Chooses how many columns to group by without connecting it to what granularity the question actually requires.",
            blameConceptId: "pandas-groupby",
          },
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["pandas-groupby"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-groupby--transfer-sql-group-by-analogy",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A SQL query uses `GROUP BY category` followed by `SUM(sales)`. Which pandas call is the direct analogue?",
    choices: [
      { id: "a", text: "`df.groupby(\"category\")[\"sales\"].sum()`", correct: true },
      {
        id: "b",
        text: "`df.sort_values(\"category\")`",
        correct: false,
        misconception: {
          id: "confuses-sorting-with-grouping",
          description: "Sorting only reorders the rows — it doesn't aggregate anything within each category. `groupby` followed by an aggregation is the actual analogue of SQL's `GROUP BY` + aggregate function.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["pandas-groupby"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-groupby--transfer-groupby-connects-to-dict-of-lists-idea",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Explain how `df.groupby(\"category\")[\"sales\"].apply(list)` (collecting each group's sales values into a Python list) is essentially the same problem as building a dict that maps first-letter to a list of matching words in one pass, from earlier in the domain. Name what plays the role of 'the key' and 'the accumulating list' in each case.",
    rubric: {
      elements: [
        {
          id: "correspondence",
          description: "Explains both tasks bucket individual items (rows, or words) by some derived key (category, or first letter) and accumulate the associated values per bucket into a list — the same grouping structure, just expressed through groupby.apply rather than a hand-written loop with setdefault/defaultdict.",
          weight: 3,
          required: true,
        },
        {
          id: "role-mapping",
          description: "Explicitly maps roles: the groupby key (category) plays the role of the dict key (first letter), and the collected sales values per group play the role of the accumulated list of words per letter.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-groupby-as-unrelated-to-dict-grouping-pattern",
            description: "Treats pandas groupby as a completely separate concept from the manual dict-based grouping pattern, rather than recognizing it as the same idea applied to tabular data.",
            blameConceptId: "python-dictionaries",
          },
        },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["pandas-groupby", "python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Doubling batch (see doubling-spec): new items appended below, grouped by
  // concept, without touching anything above.
  // =========================================================================

  // -- python-indexing --------------------------------------------------
  {
    id: "python-indexing--transfer-index-error-guard",
    conceptId: "python-indexing",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A function reads the most recent value as a[-1], and is later called on user input that may be an empty list. Explain exactly what error results and why, then give a guard that fixes it without swallowing a genuinely empty-input bug elsewhere.",
    rubric: {
      elements: [
        {
          id: "error",
          description:
            "States that a[-1] on an empty list raises IndexError: list index out of range — there is no element to count backwards from.",
          weight: 3,
          required: true,
        },
        {
          id: "why-not-none",
          description:
            "Explains that list indexing is strict: it either returns the element or raises, with no built-in default the way dict.get has one.",
          weight: 3,
          required: true,
          misconception: {
            id: "expects-lenient-indexing",
            description:
              "Expects a[-1] on an empty list to return None or some sentinel. Indexing never falls back to a default; that behaviour belongs to dict.get, not to list indexing.",
            blameConceptId: "python-indexing",
          },
        },
        {
          id: "fix",
          description:
            "Gives a guard that checks first, e.g. `last = a[-1] if a else default`, rather than catching IndexError broadly and hiding an unrelated bug.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["python-indexing"],
    source: AUTHORED,
    status: "live",
  },

  // -- python-slicing -----------------------------------------------------
  {
    id: "python-slicing--recall-slice-returns-new-list",
    conceptId: "python-slicing",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For a list a, what does a[1:3] return?",
    choices: [
      { id: "a", text: "A new list containing the selected elements", correct: true },
      {
        id: "b",
        text: "A view sharing memory with a",
        correct: false,
        misconception: {
          id: "slice-is-view",
          description:
            "Carries NumPy's view semantics over to plain lists. A list slice always builds a new list; there is no shared-buffer view for the built-in list type.",
          blameConceptId: "python-slicing",
        },
      },
      {
        id: "c",
        text: "A tuple of the selected elements",
        correct: false,
        misconception: {
          id: "slice-changes-type",
          description: "Slicing preserves the container type. Slicing a list gives a list; slicing a tuple gives a tuple.",
          blameConceptId: "python-slicing",
        },
      },
      {
        id: "d",
        text: "The original list a, mutated to drop the excluded elements",
        correct: false,
        misconception: {
          id: "slice-mutates",
          description: "Slicing reads; it never mutates a. Only slice assignment (a[1:3] = ...) changes a in place.",
          blameConceptId: "python-slicing",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["python-slicing"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-slicing--explain-slice-defensive-copy",
    conceptId: "python-slicing",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Explain why `b = a[:]` is a common way to avoid two names sharing one list, and why this technique stops helping once a's own elements are themselves mutable.",
    rubric: {
      elements: [
        {
          id: "copy",
          description:
            "Says a[:] constructs a genuinely new list object holding the same elements, so b and a no longer share identity and mutating b's own structure (append, sort, etc.) never touches a.",
          weight: 3,
          required: true,
        },
        {
          id: "shallow",
          description:
            "Explains it is a shallow copy: the elements inside are the same objects as before, so if a holds mutable elements (e.g. a list of lists), mutating one of those inner elements through b is still visible through a.",
          weight: 3,
          required: true,
          misconception: {
            id: "slice-copies-deeply",
            description:
              "Assumes a[:] recursively copies everything a contains. It copies one level; nested mutable structure is still shared.",
            blameConceptId: "python-slicing",
          },
        },
        {
          id: "when-enough",
          description: "Bonus: notes a shallow copy is sufficient whenever the elements themselves are immutable.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 140,
    prereqClosure: ["python-slicing"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-slicing--transfer-slice-assignment-resize",
    conceptId: "python-slicing",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "a = `[1, 2, 3, 4, 5]`. Predict the value and length of a after `a[1:3] = [9, 9, 9, 9]`, and explain why slice assignment can change a list's length while ordinary index assignment (a[i] = x) never can.",
    rubric: {
      elements: [
        {
          id: "result",
          description: "States a becomes [1, 9, 9, 9, 9, 4, 5], length 7.",
          weight: 3,
          required: true,
        },
        {
          id: "mechanism",
          description:
            "Explains that slice assignment splices: it removes the whole span a[1:3] and inserts the entire right-hand sequence in its place, regardless of whether the lengths match — the effective result is a[:1] + [9,9,9,9] + a[3:].",
          weight: 3,
          required: true,
          misconception: {
            id: "expects-element-by-element",
            description:
              "Assumes slice assignment pairs elements one-to-one like zip, so a length mismatch would error. It splices the spans together instead, which is exactly what lets the list grow or shrink.",
            blameConceptId: "python-slicing",
          },
        },
        {
          id: "contrast",
          description: "Contrasts with a[i] = x, which only ever overwrites one existing slot and so can never change length.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["python-slicing"],
    source: PYTHON_DOCS,
    status: "live",
  },

  // -- python-list-operations ----------------------------------------------
  {
    id: "python-list-operations--recall-append-vs-extend",
    conceptId: "python-list-operations",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "a = `[1, 2]`. Compare `a.append([3, 4])` with `a.extend([3, 4])`.",
    choices: [
      { id: "a", text: "append leaves `[1, 2, [3, 4]]`; extend leaves `[1, 2, 3, 4]`", correct: true },
      {
        id: "b",
        text: "Both leave `[1, 2, 3, 4]`",
        correct: false,
        misconception: {
          id: "append-flattens",
          description:
            "Assumes append flattens its argument. append always adds exactly one element, whatever it is; extend is the one that unpacks an iterable's items.",
          blameConceptId: "python-list-operations",
        },
      },
      {
        id: "c",
        text: "Both leave `[1, 2, [3, 4]]`",
        correct: false,
        misconception: {
          id: "extend-nests",
          description: "extend iterates its argument and adds each item individually, so it never nests a sub-list the way append does.",
          blameConceptId: "python-list-operations",
        },
      },
      {
        id: "d",
        text: "extend raises `TypeError` because its argument is not a single value",
        correct: false,
        misconception: {
          id: "extend-needs-scalar",
          description: "extend specifically requires an iterable; a list argument is the ordinary case, not an error.",
          blameConceptId: "python-list-operations",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["python-list-operations"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-list-operations--explain-mutable-default-argument",
    conceptId: "python-list-operations",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "`def f(x, acc=[]): acc.append(x); return acc`. Calling `f(1)` then `f(2)`, both with no second argument, returns `[1]` then `[1, 2]` — not `[2]`. Explain why, in terms of when default argument values are created.",
    rubric: {
      elements: [
        {
          id: "timing",
          description:
            "States that a default argument's value is evaluated once, at function-definition time, not freshly at each call — so every call that omits it shares the same object.",
          weight: 3,
          required: true,
          misconception: {
            id: "expects-fresh-default",
            description:
              "Assumes a default argument is recreated on every call, the way a body-local variable would be. It is evaluated once at def time; mutable defaults therefore persist and accumulate.",
            blameConceptId: "python-list-operations",
          },
        },
        {
          id: "consequence",
          description:
            "Explains that because lists are mutable, each call's append mutates that one shared object in place, so state silently accumulates across unrelated calls.",
          weight: 3,
          required: true,
        },
        {
          id: "fix",
          description: "Bonus: gives the standard fix — default to None, and create a fresh list inside the body when it is None.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.7,
    expectedSeconds: 160,
    prereqClosure: ["python-list-operations"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-list-operations--explain-pop-front-cost",
    conceptId: "python-list-operations",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Explain why repeatedly calling `a.pop(0)` in a loop is much slower than repeatedly calling `a.pop()` on a large list, and name the data structure that fixes it.",
    rubric: {
      elements: [
        {
          id: "cost",
          description:
            "Explains that pop(0) removes the first element, so every remaining element must shift down one slot to keep the list contiguous — O(n) per call, O(n^2) over n calls — while pop() removes the last element with no shifting, O(1).",
          weight: 3,
          required: true,
          misconception: {
            id: "all-pops-are-o1",
            description:
              "Assumes every removal from a list costs the same. Only removing from the end is O(1); removing from the front or middle shifts every following element.",
            blameConceptId: "python-list-operations",
          },
        },
        {
          id: "fix",
          description: "Names collections.deque, which supports O(1) pops (and appends) from both ends.",
          weight: 3,
          required: true,
        },
        {
          id: "when-fine",
          description: "Bonus: notes a plain list is fine when only ever popping from the end.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-list-operations--transfer-shallow-copy-nested-list",
    conceptId: "python-list-operations",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A function defensively copies a caller's matrix (a list of row-lists) with `safe = list(matrix)` before sorting each row in place, intending not to affect the caller's data. The caller's rows come back sorted anyway. Diagnose the bug and give a fix.",
    rubric: {
      elements: [
        {
          id: "diagnosis",
          description:
            "Explains that list(matrix) makes a new outer list but copies references to the same inner row lists, so safe and matrix share every row object — sorting a row in place mutates the object both names see.",
          weight: 3,
          required: true,
          misconception: {
            id: "list-constructor-deep-copies",
            description:
              "Assumes list(x) recursively copies everything x contains. It copies exactly one level: a new outer list of the same inner references.",
            blameConceptId: "python-list-operations",
          },
        },
        {
          id: "fix",
          description:
            "Gives a fix: copy.deepcopy(matrix), or `[row[:] for row in matrix]`, or building a new sorted row with sorted(row) rather than mutating in place.",
          weight: 3,
          required: true,
        },
        {
          id: "generalization",
          description: "Bonus: ties this to a[:] being shallow for the same reason — copying goes exactly as deep as one explicit copy call.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.8,
    expectedSeconds: 190,
    prereqClosure: ["python-list-operations"],
    source: AUTHORED,
    status: "live",
  },

  // -- python-dictionaries --------------------------------------------------
  {
    id: "python-dictionaries--recall-insertion-order",
    conceptId: "python-dictionaries",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In current Python, does iterating a dict's keys() follow insertion order, sorted order, or an unspecified order?",
    choices: [
      { id: "a", text: "Insertion order — guaranteed since Python 3.7", correct: true },
      {
        id: "b",
        text: "Sorted by key",
        correct: false,
        misconception: {
          id: "dict-sorts-keys",
          description:
            "Confuses dict with a sorted structure. Iteration order tracks insertion, not any ordering of the keys' values.",
          blameConceptId: "python-dictionaries",
        },
      },
      {
        id: "c",
        text: "Unspecified, exactly as in older Python versions",
        correct: false,
        misconception: {
          id: "still-unordered",
          description: "Was true before 3.7. Insertion-order iteration has been a language guarantee, not an implementation accident, since then.",
          blameConceptId: "python-dictionaries",
        },
      },
      {
        id: "d",
        text: "Sorted by each key's hash value",
        correct: false,
        misconception: {
          id: "sorted-by-hash",
          description: "Hash values determine bucket placement internally, not the order iteration reports to the caller.",
          blameConceptId: "python-dictionaries",
        },
      },
    ],
    difficulty: -2.1,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["python-dictionaries"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-dictionaries--apply-update-key-count",
    conceptId: "python-dictionaries",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "d = `{'a': 1, 'b': 2}`; d.update(`{'b': 3, 'c': 4}`). How many keys does d have afterward?",
    answerKey: 3,
    tolerance: 0,
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-dictionaries--explain-why-hash-table",
    conceptId: "python-dictionaries",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Explain why dict lookup, insertion and deletion are all O(1) on average, and name the property a key must have for this to hold.",
    rubric: {
      elements: [
        {
          id: "mechanism",
          description:
            "Explains that a dict is backed by a hash table: a key's hash locates its bucket directly, so lookup does not scan the existing entries — cost does not grow with how many keys are stored.",
          weight: 3,
          required: true,
          misconception: {
            id: "expects-scan",
            description:
              "Assumes lookup compares against every stored key, as a list membership test would. A hash table computes one hash and jumps to the corresponding bucket.",
            blameConceptId: "python-dictionaries",
          },
        },
        {
          id: "requirement",
          description:
            "States the key must be hashable, with a hash that stays constant for as long as it is stored — exactly why a list cannot be a key while a tuple can.",
          weight: 3,
          required: true,
        },
        {
          id: "average-not-worst",
          description: "Bonus: notes 'average' matters — pathological hash collisions degrade lookup to O(n) worst case.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["python-dictionaries"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-dictionaries--explain-get-vs-try-except",
    conceptId: "python-dictionaries",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "For a lookup that is often missing, compare `d.get(k, default)` with a try/except `KeyError` around `d[k]`. Explain what should actually decide between them.",
    rubric: {
      elements: [
        {
          id: "get-uniform",
          description: ".get() always does one lookup and returns a default with no exception machinery, so its cost is uniform whether the key is present or not.",
          weight: 2,
        },
        {
          id: "readability",
          description:
            "Argues the deciding factor is normally intent, not speed: .get() reads as 'this default is expected', while try/except reads as 'this failure is exceptional and I have real recovery logic for it'.",
          weight: 3,
          required: true,
          misconception: {
            id: "perf-always-decides",
            description:
              "Assumes the faster option is always the right one. For a single dict lookup the constant-factor difference rarely matters; what should decide is which form communicates the caller's actual intent.",
            blameConceptId: "python-dictionaries",
          },
        },
        {
          id: "cost-nuance",
          description:
            "Bonus: notes try/except is cheap while the key is present and only pays overhead when the exception actually fires, so it is not simply 'the slow option'.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["python-dictionaries"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-dictionaries--transfer-unhashable-cache-key",
    conceptId: "python-dictionaries",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A memoization cache keys results by a list of arguments built at call time: `cache[args] = result`. This raises `TypeError`. Explain why, and give two fixes with a note on when each applies.",
    rubric: {
      elements: [
        {
          id: "why",
          description:
            "Explains that a list is unhashable (mutable, with no stable hash), and a dict key must be hashable, so using one directly as a key raises TypeError: unhashable type: 'list'.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-any-collection-is-key",
            description: "Treats any way of grouping arguments together as fair game for a dict key. Only hashable, effectively-immutable objects qualify.",
            blameConceptId: "python-dictionaries",
          },
        },
        {
          id: "fix-tuple",
          description: "Gives tuple(args) as a fix, when the arguments are themselves hashable and their order carries meaning.",
          weight: 3,
          required: true,
        },
        {
          id: "fix-kwargs",
          description:
            "Gives a second fix for keyword arguments: a tuple of the sorted (key, value) pairs, so equal argument sets hash equally regardless of the order they were supplied in — noting this still requires every value to be hashable.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.8,
    expectedSeconds: 190,
    prereqClosure: ["python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },

  // -- python-sets -----------------------------------------------------
  {
    id: "python-sets--recall-empty-braces-is-dict",
    conceptId: "python-sets",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `{}` evaluate to?",
    choices: [
      { id: "a", text: "An empty dict — `set()` is required for an empty set", correct: true },
      {
        id: "b",
        text: "An empty set",
        correct: false,
        misconception: {
          id: "braces-default-to-set",
          description: "The bare `{}` literal is reserved for dict; an empty set has no literal form and must be written set().",
          blameConceptId: "python-sets",
        },
      },
      {
        id: "c",
        text: "A `TypeError` — an empty container needs an explicit type",
        correct: false,
        misconception: {
          id: "empty-braces-error",
          description: "`{}` is perfectly legal Python; it is simply the dict literal, not an error.",
          blameConceptId: "python-sets",
        },
      },
      {
        id: "d",
        text: "Both a dict and a set share the `{}` literal, and Python infers which from later use",
        correct: false,
        misconception: {
          id: "literal-inferred-later",
          description: "The type of a literal is fixed the moment it is evaluated; nothing later in the program changes what `{}` already produced.",
          blameConceptId: "python-sets",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["python-sets"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-sets--apply-symmetric-difference-count",
    conceptId: "python-sets",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "a = `{1, 2, 3, 4}`; b = `{3, 4, 5, 6}`. How many elements are in `a ^ b`?",
    answerKey: 4,
    tolerance: 0,
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["python-sets"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-sets--transfer-set-order-nondeterminism",
    conceptId: "python-sets",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A test asserts `list(some_set) == [3, 1, 2]` and fails intermittently across runs, even though the set's contents never change. Explain why, and give a fix that keeps the test meaningful.",
    rubric: {
      elements: [
        {
          id: "no-order",
          description:
            "States that a set makes no ordering guarantee at all; its iteration order depends on hash values and history, not on anything the caller controls.",
          weight: 3,
          required: true,
          misconception: {
            id: "sets-are-ordered",
            description:
              "Assumes a set remembers something like insertion order, the way a dict now does. A set makes no ordering promise whatsoever.",
            blameConceptId: "python-sets",
          },
        },
        {
          id: "why-intermittent",
          description:
            "Explains the observable order can differ across runs, interpreter versions, or with hash randomization, even though membership never changes — so an order-dependent assertion is testing an accident, not a guarantee.",
          weight: 3,
          required: true,
        },
        {
          id: "fix",
          description: "Gives a fix: compare as sets directly, or sort before comparing, so the test checks values rather than incidental order.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 170,
    prereqClosure: ["python-sets"],
    source: AUTHORED,
    status: "live",
  },

  // -- python-loops ------------------------------------------------------
  {
    id: "python-loops--recall-while-vs-for-stop-condition",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What decides when a while loop stops, compared with a for loop over a sequence?",
    choices: [
      { id: "a", text: "while stops when its condition, re-checked each iteration, becomes false; for stops when the iterator is exhausted", correct: true },
      {
        id: "b",
        text: "They stop the same way; the choice between them is purely style",
        correct: false,
        misconception: {
          id: "loops-are-interchangeable",
          description: "A for loop's stopping point is fixed by the iterable up front; a while loop's condition can depend on anything and change unpredictably.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "c",
        text: "A while loop always requires an explicit counter variable",
        correct: false,
        misconception: {
          id: "while-needs-counter",
          description: "A while loop's condition can test anything at all — a flag, a queue's emptiness, user input — with no counter required.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "d",
        text: "A for loop's iteration count must be decided before the loop starts",
        correct: false,
        misconception: {
          id: "for-count-fixed-upfront",
          description: "A for loop over a lazily-produced iterable (a generator, a file) does not know its count in advance either — it just keeps going until exhaustion.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -2.2,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["python-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--recall-break-vs-continue",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Inside a loop body, what is the difference between break and continue?",
    choices: [
      { id: "a", text: "break exits the loop entirely; continue skips ahead to the next iteration", correct: true },
      {
        id: "b",
        text: "break skips to the next iteration; continue exits the loop",
        correct: false,
        misconception: {
          id: "break-continue-reversed",
          description: "Has the two backwards. break terminates the loop; continue only ends the current pass through the body.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "c",
        text: "Both exit the loop; break does so immediately, continue after running the loop's else clause",
        correct: false,
        misconception: {
          id: "continue-runs-else",
          description: "continue does not touch the else clause at all; it only affects whether the *current* iteration continues.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "d",
        text: "continue exits only the innermost loop; break exits every enclosing loop",
        correct: false,
        misconception: {
          id: "break-exits-all-enclosing",
          description: "break, like continue, affects only the loop whose body it appears directly in — neither one unwinds an enclosing loop.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -1.9,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["python-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--apply-for-else-no-break",
    conceptId: "python-loops",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "`for x in a: if x == target: break else: print('not found')`. Under what condition does 'not found' print?",
    choices: [
      { id: "a", text: "Whenever the loop completes without ever hitting break — including when a is empty", correct: true },
      {
        id: "b",
        text: "Only when a is empty",
        correct: false,
        misconception: {
          id: "for-else-only-empty",
          description: "The else also runs on a non-empty a that simply never matches target — emptiness is one way to reach it, not the only way.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "c",
        text: "Whenever break does execute",
        correct: false,
        misconception: {
          id: "for-else-fires-on-break",
          description: "A for loop's else is the opposite: it is skipped whenever break runs, and executes only when the loop finishes normally.",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "d",
        text: "Never — else after a for loop is a syntax error",
        correct: false,
        misconception: {
          id: "for-else-invalid",
          description: "for...else is valid Python syntax; its else clause runs exactly when the loop exits without breaking.",
          blameConceptId: "python-loops",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.4,
    expectedSeconds: 35,
    prereqClosure: ["python-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--apply-nested-loop-break-count",
    conceptId: "python-loops",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "`for i in range(3): for j in range(3): if j == 1: break`. Across all values of i, how many times does the inner loop's body execute in total?",
    answerKey: 6,
    tolerance: 0,
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 45,
    prereqClosure: ["python-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--explain-break-only-innermost",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem: "Explain why break only exits the innermost enclosing loop, and what pattern is needed to exit two nested loops at once.",
    rubric: {
      elements: [
        {
          id: "scope",
          description:
            "Explains that break terminates exactly the loop whose body it appears in; control resumes with the code after that loop, not any loop enclosing it.",
          weight: 3,
          required: true,
          misconception: {
            id: "break-exits-all",
            description: "Assumes break unwinds every enclosing loop. It affects only the loop whose body it appears directly in.",
            blameConceptId: "python-loops",
          },
        },
        {
          id: "pattern",
          description:
            "Gives a pattern to exit both: a flag the outer loop also checks, wrapping the loops in a function and returning, or raising and catching a sentinel exception.",
          weight: 3,
          required: true,
        },
        {
          id: "no-labeled-break",
          description: "Bonus: notes Python has no labeled break/goto, unlike some languages, which is why these workarounds exist.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.6,
    expectedSeconds: 140,
    prereqClosure: ["python-loops"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-loops--explain-generator-laziness-in-loop",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "A for loop over a generator expression processes one element at a time, rather than building a full list first. Explain what this buys when a is very large, and one thing it costs.",
    rubric: {
      elements: [
        {
          id: "memory",
          description:
            "Explains that a generator produces values on demand, so the loop never holds more than one element (plus whatever state it needs) in memory, unlike a list comprehension that materializes everything up front.",
          weight: 3,
          required: true,
        },
        {
          id: "tradeoff",
          description:
            "Names what is given up: no indexing, no len(), and no second pass — a generator is exhausted after one loop over it.",
          weight: 3,
          required: true,
          misconception: {
            id: "generator-is-reusable",
            description:
              "Assumes a generator can be iterated a second time like a list. It is a one-pass iterator; a second for loop over an exhausted one runs zero times, silently.",
            blameConceptId: "python-loops",
          },
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["python-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--transfer-mutating-shared-list-in-loop",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A function keeps a running window and appends it after each step: `window = []; results = []`, then per x in rows: `window.append(x)`; if `len(window) > 3`: `window.pop(0)`; `results.append(window)`. After the loop, every entry of results is identical, equal to the final window. Diagnose the bug and give a fix.",
    rubric: {
      elements: [
        {
          id: "diagnosis",
          description:
            "Explains that results.append(window) stores a reference to the same window object each time rather than a snapshot of its current contents, so later mutations (append, pop) to window are visible through every previously stored reference.",
          weight: 3,
          required: true,
          misconception: {
            id: "append-stores-snapshot",
            description:
              "Assumes appending a mutable object captures its value at that moment, the way appending an int or string would. Appending a list stores a reference; later mutation is visible everywhere that reference was stored.",
            blameConceptId: "python-list-operations",
          },
        },
        {
          id: "fix",
          description: "Gives a fix: results.append(window[:]) or results.append(list(window)), storing a copy at that point rather than a live reference.",
          weight: 3,
          required: true,
        },
        {
          id: "contrast",
          description:
            "Bonus: notes that if window were rebuilt fresh each iteration instead of mutated in place, no object would ever be shared across appends and the bug could not occur.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.8,
    expectedSeconds: 190,
    prereqClosure: ["python-loops", "python-list-operations"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-loops--transfer-mutate-dict-while-iterating",
    conceptId: "python-loops",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A cache-eviction routine does `for k in cache: if is_stale(k): del cache[k]`, and it raises `RuntimeError: dictionary changed size during iteration`. Explain why this differs from the silent skipped-element bug that mutating a list during iteration causes, and give a correct rewrite.",
    rubric: {
      elements: [
        {
          id: "why-differs",
          description:
            "Explains that a dict's iterator detects a size change during iteration and raises immediately, rather than silently desynchronizing the way a list's position-based iteration does.",
          weight: 3,
          required: true,
          misconception: {
            id: "dict-mutation-silent-too",
            description:
              "Assumes mutating any container during iteration fails the same way. Lists desynchronize silently; dicts detect the size change and raise loudly.",
            blameConceptId: "python-loops",
          },
        },
        {
          id: "rewrite",
          description: "Gives a fix: iterate over a snapshot of the keys, e.g. `for k in list(cache): if is_stale(k): del cache[k]`.",
          weight: 3,
          required: true,
        },
        {
          id: "generalization",
          description: "Bonus: names the general pattern — collect what to remove first, then remove it in a second pass.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 170,
    prereqClosure: ["python-loops", "python-dictionaries"],
    source: PYTHON_DOCS,
    status: "live",
  },

  // -- python-comprehensions ------------------------------------------------
  {
    id: "python-comprehensions--recall-dict-comprehension-syntax",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "pairs is a list of two-tuples. What does `{k: v for k, v in pairs}` produce?",
    choices: [
      { id: "a", text: "A dict mapping each k to its v", correct: true },
      {
        id: "b",
        text: "A set of the tuples",
        correct: false,
        misconception: {
          id: "colon-form-is-set",
          description: "The colon inside the braces is what marks this as a dict comprehension, not a set comprehension.",
          blameConceptId: "python-comprehensions",
        },
      },
      {
        id: "c",
        text: "A list of one-entry dicts, one per pair",
        correct: false,
        misconception: {
          id: "dict-comp-produces-list-of-dicts",
          description: "A dict comprehension builds a single dict by evaluating k: v once per iteration and inserting each into the same result.",
          blameConceptId: "python-comprehensions",
        },
      },
      {
        id: "d",
        text: "A generator of (k, v) tuples",
        correct: false,
        misconception: {
          id: "braces-are-generator",
          description: "Parentheses give a generator; braces with a colon give a dict, built eagerly.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--recall-set-comprehension-braces",
    conceptId: "python-comprehensions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the type of `{x % 3 for x in range(10)}`?",
    choices: [
      { id: "a", text: "A set", correct: true },
      {
        id: "b",
        text: "A dict — braces always build key-value pairs",
        correct: false,
        misconception: {
          id: "braces-always-dict",
          description: "Braces build a dict only when the body has a colon (key: value). With no colon, braces build a set.",
          blameConceptId: "python-comprehensions",
        },
      },
      {
        id: "c",
        text: "A list",
        correct: false,
        misconception: {
          id: "expects-brackets",
          description: "Square brackets give a list; braces with no colon give a set.",
          blameConceptId: "python-comprehensions",
        },
      },
      {
        id: "d",
        text: "A generator",
        correct: false,
        misconception: {
          id: "braces-are-lazy",
          description: "A set comprehension is built eagerly, like a list comprehension; only parentheses give a lazy generator.",
          blameConceptId: "python-comprehensions",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["python-comprehensions"],
    source: PYTHON_DOCS,
    status: "live",
  },
  {
    id: "python-comprehensions--apply-two-filter-clauses",
    conceptId: "python-comprehensions",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "a = `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`. How many elements are in `[x for x in a if x % 2 == 0 if x % 3 == 0]`?",
    answerKey: 1,
    tolerance: 0,
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["python-comprehensions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--apply-dict-comprehension-transform",
    conceptId: "python-comprehensions",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "prices = `{'a': 10, 'b': 20, 'c': 5}`. discounted = `{k: v * 0.9 for k, v in prices.items()}`. What is discounted['b']?",
    answerKey: 18,
    tolerance: 0.01,
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["python-comprehensions", "python-dictionaries"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--explain-side-effect-antipattern",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "A colleague writes `[print(x) for x in a]` purely to print each element, discarding the resulting list. Explain what is wrong with this beyond wasted memory, and rewrite it appropriately.",
    rubric: {
      elements: [
        {
          id: "misleads",
          description:
            "Explains that a comprehension signals 'this builds and keeps a value from the iteration'; using it purely for a side effect fights that meaning and misleads a reader looking for what the value is used for.",
          weight: 3,
          required: true,
          misconception: {
            id: "comprehension-just-terser-loop",
            description:
              "Treats a comprehension as simply a shorter for loop, appropriate wherever a loop would do. Its idiomatic meaning is 'this produces a value I keep' — using it for a pure side effect fights that.",
            blameConceptId: "python-comprehensions",
          },
        },
        {
          id: "rewrite",
          description: "Gives the plain loop `for x in a: print(x)` as the correct form.",
          weight: 3,
          required: true,
        },
        {
          id: "memory",
          description: "Bonus: notes it also builds a full list of Nones (print's return value) for no reason.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["python-comprehensions", "python-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--explain-readability-limit",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "A triple-nested comprehension with two filter clauses replaces a 15-line loop and technically works. Explain the case against using it, appealing to something other than personal taste.",
    rubric: {
      elements: [
        {
          id: "cognitive-load",
          description:
            "Explains that stacking several for and if clauses in one expression forces a reader to hold several loop variables and conditions in mind at once, with no intermediate names to anchor on, unlike the equivalent nested loop.",
          weight: 3,
          required: true,
        },
        {
          id: "debuggability",
          description:
            "Notes a comprehension is one expression, so there is no natural place to set a breakpoint or print an intermediate state, while the loop form gives one at every nesting level.",
          weight: 3,
          required: true,
          misconception: {
            id: "shorter-is-always-clearer",
            description:
              "Equates fewer lines with more readable code. Past some nesting depth, compressing a loop into one expression removes exactly the structure a reader would use to follow it.",
            blameConceptId: "python-comprehensions",
          },
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["python-comprehensions", "python-loops"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--transfer-none-sentinel-collision",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A pipeline replaces `for x in a: if valid(x): results.append(transform(x))` with `results = [transform(x) if valid(x) else None for x in a]`, then filters out the Nones afterward. Explain the one case where this is not equivalent to the original, and give a fix.",
    rubric: {
      elements: [
        {
          id: "placeholder",
          description:
            "Explains that the rewritten form produces an explicit None placeholder for every invalid x (instead of nothing at all), which must be filtered out in a separate pass.",
          weight: 2,
        },
        {
          id: "collision",
          description:
            "Explains that if transform can itself legitimately return None for a valid input, the post-hoc filter cannot distinguish that genuine result from an invalid-input placeholder — a real result silently disappears the same way a skipped invalid one does.",
          weight: 3,
          required: true,
          misconception: {
            id: "none-is-a-safe-sentinel",
            description:
              "Uses None as a filter sentinel without checking whether the wrapped function can itself produce None. When it can, the sentinel and a genuine result become indistinguishable.",
            blameConceptId: "python-comprehensions",
          },
        },
        {
          id: "fix",
          description:
            "Gives a fix: use a private sentinel object instead of None, or keep the original filter-then-transform form, which never manufactures placeholders at all.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.8,
    expectedSeconds: 190,
    prereqClosure: ["python-comprehensions"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "python-comprehensions--transfer-genexpr-vs-list-error-timing",
    conceptId: "python-comprehensions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "`sum(1 / x for x in values)` raises `ZeroDivisionError` partway through a 10,000-entry values list where only the 9,000th entry is zero. A colleague expects `sum([1 / x for x in values])` to behave identically. Explain the one real difference between the two, and whether it changes correctness.",
    rubric: {
      elements: [
        {
          id: "same-element",
          description: "States both forms fail at the same offending element — laziness does not change which value causes the error.",
          weight: 2,
        },
        {
          id: "memory-difference",
          description:
            "Explains the eager list form must first build a 9,000-element list before sum is even invoked, briefly holding that whole list in memory, while the generator form consumes and discards one value at a time.",
          weight: 3,
          required: true,
          misconception: {
            id: "raises-earlier-for-genexpr",
            description:
              "Assumes laziness changes when an error occurs relative to which element caused it. Both forms fail at the same offending element; laziness changes how much has been materialized, not which element is reached first.",
            blameConceptId: "python-comprehensions",
          },
        },
        {
          id: "no-partial-result",
          description: "States neither form returns a partial sum on failure — the exception propagates out of sum() with no value either way.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["python-comprehensions"],
    source: AUTHORED,
    status: "live",
  },

  // -- numpy-arrays -------------------------------------------------------
  {
    id: "numpy-arrays--recall-shape-attribute",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "a = `np.array([[1, 2, 3], [4, 5, 6]])`. What does a.shape return?",
    choices: [
      { id: "a", text: "(2, 3)", correct: true },
      {
        id: "b",
        text: "(3, 2)",
        correct: false,
        misconception: {
          id: "shape-order-reversed",
          description: "Shape lists axes outer-to-inner: 2 rows, then 3 columns — not columns first.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "c",
        text: "6",
        correct: false,
        misconception: {
          id: "shape-is-size",
          description: "Confuses shape with the total element count. a.size is 6; a.shape describes the axis lengths.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "d",
        text: "[2, 3], a list",
        correct: false,
        misconception: {
          id: "shape-is-list",
          description: "shape is a tuple, not a list — a small distinction that matters because tuples are immutable and hashable.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--recall-arange-vs-linspace-length",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the length of `np.arange(0, 10, 2)`, and of `np.linspace(0, 10, 2)`?",
    choices: [
      { id: "a", text: "5, and 2", correct: true },
      {
        id: "b",
        text: "5, and 5",
        correct: false,
        misconception: {
          id: "linspace-uses-step",
          description: "linspace's second numeric argument after the count is the *number of points*, not a step size — with num=2 it returns exactly [0, 10].",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "c",
        text: "2, and 5",
        correct: false,
        misconception: {
          id: "arange-linspace-swapped",
          description: "Has the two functions' behavior swapped. arange steps by the given increment; linspace returns exactly the given count of points.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "d",
        text: "5, and 11",
        correct: false,
        misconception: {
          id: "linspace-default-num",
          description: "linspace's count is whatever is explicitly passed — here 2 — not its default of 50 or any other fixed value.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--apply-fancy-index-repeats",
    conceptId: "numpy-arrays",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "a = `np.array([10, 20, 30, 40, 50])`. What does `a[[3, 0, 3]]` return?",
    choices: [
      { id: "a", text: "`array([40, 10, 40])`", correct: true },
      {
        id: "b",
        text: "`array([10, 30, 40])`",
        correct: false,
        misconception: {
          id: "fancy-index-sorts",
          description: "Fancy indexing returns elements in exactly the order the index array names them, not sorted by position.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "c",
        text: "`array([40, 10])`",
        correct: false,
        misconception: {
          id: "fancy-index-dedups",
          description: "Fancy indexing has no set-like deduplication; a repeated index simply produces a repeated output element.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "d",
        text: "`IndexError` — an index cannot repeat",
        correct: false,
        misconception: {
          id: "fancy-index-no-repeats",
          description: "Repeating an index is legal and common — it is exactly how fancy indexing builds a resampled or reordered array.",
          blameConceptId: "numpy-arrays",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.4,
    expectedSeconds: 35,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--apply-combined-boolean-mask-count",
    conceptId: "numpy-arrays",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "a = `np.array([1, 5, 3, 8, 2, 9, 4])`. How many elements satisfy `(a > 3) & (a < 9)`?",
    answerKey: 3,
    tolerance: 0,
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 40,
    prereqClosure: ["numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-arrays--explain-boolean-vs-fancy-index-length",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Both `a[mask]` (a boolean array) and `a[idx]` (an integer array) select a subset of a. Explain what determines the result's length in each case, and why boolean indexing can never produce an array longer than a while fancy indexing can.",
    rubric: {
      elements: [
        {
          id: "boolean",
          description:
            "Explains a boolean mask must be exactly the same length as a, one flag per element, and its True count fixes the output length — so it can only ever select, never exceed, a's length.",
          weight: 3,
          required: true,
          misconception: {
            id: "bool-mask-any-length",
            description: "Assumes a boolean mask can be any length or repeat entries the way an index array can. It must exactly match a's length, one flag per element.",
            blameConceptId: "numpy-arrays",
          },
        },
        {
          id: "fancy",
          description:
            "Explains an integer index array has no length constraint relative to a and can repeat any index any number of times, so the output length equals the index array's own length — including longer than a.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--explain-nan-comparison",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem: "a contains a NaN. Explain why `a == a` is False at that position, and what the correct way to test for NaN is.",
    rubric: {
      elements: [
        {
          id: "ieee",
          description:
            "Explains that IEEE 754 defines NaN to compare unequal to everything, including itself, so no ordinary comparison ever returns True at a NaN position.",
          weight: 3,
          required: true,
          misconception: {
            id: "nan-equals-itself",
            description: "Assumes NaN behaves like an ordinary value under ==. By definition it compares unequal to every value, itself included.",
            blameConceptId: "numpy-arrays",
          },
        },
        {
          id: "fix",
          description: "Gives the fix: np.isnan(a), rather than `a == np.nan` or `a == a`, both of which are silently always False.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--transfer-narrow-accumulator-overflow",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A per-bucket histogram is stored as an int8 array (no bucket's true count exceeds 100). A colleague sums it manually with a running scalar: `total = np.int8(0)`, then `for c in counts: total += c`. Across 500 buckets this reports a small or negative total, not the true sum. Diagnose the bug and give a fix.",
    rubric: {
      elements: [
        {
          id: "overflow",
          description:
            "Explains that total is an actual np.int8 scalar whose arithmetic wraps within its signed 8-bit range rather than growing; accumulating hundreds of positive counts into it overflows and wraps repeatedly, so the final value bears no relation to the true sum.",
          weight: 3,
          required: true,
          misconception: {
            id: "numpy-ints-check-overflow",
            description: "Assumes fixed-width NumPy integer arithmetic is checked and would raise on overflow. It wraps silently — a sum exceeding the dtype's range comes back wrong with no warning.",
            blameConceptId: "numpy-arrays",
          },
        },
        {
          id: "fix",
          description: "Gives a fix: start the accumulator at a wide dtype (np.int64 or a plain Python int), or vectorize with counts.sum().",
          weight: 3,
          required: true,
        },
        {
          id: "generalization",
          description:
            "Bonus: notes NumPy's own sum() upcasts small integer dtypes to at least the platform integer by default for exactly this reason — the array can stay int8 for storage, but a manual accumulator does not get that protection.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-arrays--transfer-view-belief-from-lists",
    conceptId: "numpy-arrays",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A function takes `sub = arr[2:5]`, computes statistics on sub, and — believing slicing always copies as it does for Python lists — later does `sub[0] = 0` to zero out a value for a separate, supposedly local computation. The caller's original array changes too. Diagnose the bug, and give the one-line fix that keeps the zeroing local.",
    rubric: {
      elements: [
        {
          id: "diagnosis",
          description:
            "Explains that a basic (non-fancy) NumPy slice is a view sharing the same underlying buffer as arr, unlike a Python list slice which copies; writing to sub therefore writes into arr at the corresponding positions.",
          weight: 3,
          required: true,
          misconception: {
            id: "array-slice-copies-like-list",
            description: "Carries the Python list rule — slicing copies — over to NumPy arrays. A basic array slice is a view; only fancy (integer-array or boolean) indexing copies.",
            blameConceptId: "numpy-arrays",
          },
        },
        {
          id: "fix",
          description: "Gives the fix: take an explicit copy before mutating locally, `sub = arr[2:5].copy()`.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["numpy-arrays", "python-list-operations"],
    source: NUMPY_DOCS,
    status: "live",
  },

  // -- numpy-broadcasting --------------------------------------------------
  {
    id: "numpy-broadcasting--recall-scalar-broadcast-shape",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A has shape `(3, 4)`. What is the shape of `A + 5`?",
    choices: [
      { id: "a", text: "(3, 4) — a scalar broadcasts against every element", correct: true },
      {
        id: "b",
        text: "(1,) — the scalar dominates",
        correct: false,
        misconception: {
          id: "scalar-dominates-shape",
          description: "A scalar has no shape of its own to impose; it stretches to match whatever it is combined with.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "c",
        text: "An error — shapes must match exactly",
        correct: false,
        misconception: {
          id: "scalar-shape-mismatch",
          description: "A scalar broadcasts against any shape; exact shape matching is only required when neither operand is a scalar or length-1 axis.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "d",
        text: "(4, 3) — broadcasting also transposes",
        correct: false,
        misconception: {
          id: "broadcast-transposes",
          description: "Broadcasting never reorders axes; it only stretches length-1 axes. A's shape is unaffected.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["numpy-broadcasting"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--recall-equal-shapes-need-no-broadcast",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "If two arrays already have identical shapes, does any broadcasting occur when they are combined elementwise?",
    choices: [
      { id: "a", text: "No — broadcasting only matters when shapes differ", correct: true },
      {
        id: "b",
        text: "Yes, broadcasting always applies to any elementwise operation",
        correct: false,
        misconception: {
          id: "broadcast-always-applies",
          description: "Broadcasting is the rule for reconciling *different* shapes. Identical shapes combine directly, element for element.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "c",
        text: "Only if the shape has more than one dimension",
        correct: false,
        misconception: {
          id: "broadcast-needs-2d",
          description: "Dimensionality is irrelevant; what matters is whether the two shapes already agree, at any number of axes.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "d",
        text: "Only for addition and subtraction, not multiplication",
        correct: false,
        misconception: {
          id: "broadcast-op-specific",
          description: "Broadcasting is a shape rule applied uniformly across every elementwise operation, not a special case of certain operators.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["numpy-broadcasting"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--apply-column-vector-shape",
    conceptId: "numpy-broadcasting",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "v has shape `(5, 1)` and M has shape `(5, 3)`. What is the shape of `v * M`?",
    choices: [
      { id: "a", text: "(5, 3)", correct: true },
      {
        id: "b",
        text: "(5, 1)",
        correct: false,
        misconception: {
          id: "keeps-smaller-shape",
          description: "The result takes the larger, broadcast-compatible size at each axis, not the smaller operand's shape.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "c",
        text: "An error — the second axes don't match",
        correct: false,
        misconception: {
          id: "one-fails-compatibility",
          description: "An axis of length 1 is exactly the case broadcasting stretches; it is compatible with any length on that axis, not a mismatch.",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "d",
        text: "(1, 3)",
        correct: false,
        misconception: {
          id: "drops-first-axis",
          description: "Both axes of length 5 are equal and simply kept; no axis is dropped by broadcasting.",
          blameConceptId: "numpy-broadcasting",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--apply-mean-axis0-length",
    conceptId: "numpy-broadcasting",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A has shape `(100, 20)`. How many elements does `A.mean(axis=0)` have?",
    answerKey: 20,
    tolerance: 0,
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-broadcasting--explain-outer-product-via-broadcasting",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Explain how `a[:, None] * b[None, :]` computes an outer product for 1-D a and b, connecting the shapes produced to the definition of broadcasting.",
    rubric: {
      elements: [
        {
          id: "shapes",
          description:
            "Explains that a[:, None] reshapes a to (n, 1) and b[None, :] reshapes b to (1, m); broadcasting then stretches each operand's length-1 axis against the other's real axis, giving an (n, m) result.",
          weight: 3,
          required: true,
        },
        {
          id: "meaning",
          description:
            "Explains that element (i, j) of the result equals a[i] * b[j] — exactly the outer product's definition, computed without an explicit double loop.",
          weight: 3,
          required: true,
          misconception: {
            id: "outer-needs-explicit-loop",
            description: "Assumes an outer product needs np.outer or a nested loop. Reshaping to expose a length-1 axis and letting broadcasting stretch it computes the same thing.",
            blameConceptId: "numpy-broadcasting",
          },
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--explain-error-message-axis-check",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "NumPy raises `ValueError: operands could not be broadcast together with shapes (3,4) (5,)` for `A + v`. Explain exactly which comparison failed, without just restating that the shapes 'don't match'.",
    rubric: {
      elements: [
        {
          id: "alignment",
          description: "Explains that right-aligning (3,4) with (5,) pads the shorter shape to (1, 5), then compares trailing axes first: 4 vs 5.",
          weight: 3,
          required: true,
        },
        {
          id: "why-fails",
          description:
            "Explains that neither 4 nor 5 is 1 and they are unequal, so the compatibility rule (equal, or one of them 1) fails at that axis — the comparison never even reaches the leading 3 vs the padded 1.",
          weight: 3,
          required: true,
          misconception: {
            id: "shapes-compared-by-total-size",
            description:
              "Treats the error as 'total sizes disagree' rather than a per-axis check. The comparison runs axis by axis from the right and stops at the first axis that fails.",
            blameConceptId: "numpy-broadcasting",
          },
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["numpy-broadcasting"],
    source: NUMPY_DOCS,
    status: "live",
  },
  {
    id: "numpy-broadcasting--transfer-1d-input-breaks-batched-code",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A softmax implementation computes `exp(x) / exp(x).sum(axis=1, keepdims=True)` for x of shape (batch, classes), but a colleague passes a single 1-D example of shape (classes,) for a quick check and gets `IndexError: axis 1 is out of bounds`. Explain why the 2-D-only code fails loudly rather than silently doing something wrong, and what that tells you about testing shape-sensitive code.",
    rubric: {
      elements: [
        {
          id: "why-raises",
          description: "Explains a 1-D array has only axis 0, so axis=1 does not exist and NumPy raises immediately rather than guessing a fallback axis.",
          weight: 3,
          required: true,
        },
        {
          id: "lesson",
          description:
            "Draws the lesson that shape bugs are caught loudly when the requested axis does not exist at all, but can be caught silently, or not at all, when it exists and simply means something different — the more dangerous case, and the one worth testing for deliberately.",
          weight: 3,
          required: true,
          misconception: {
            id: "any-shape-error-is-a-bug-in-code",
            description:
              "Treats any shape-related exception as proof the implementation is wrong. Here the implementation is fine; it was written for batched (2-D) input and called outside its contract.",
            blameConceptId: "numpy-broadcasting",
          },
        },
        {
          id: "fix",
          description: "Bonus: names the actual fix — reshape the 1-D input to (1, classes) before calling, or have the function branch on x.ndim.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.8,
    expectedSeconds: 180,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "numpy-broadcasting--transfer-batch-mean-needs-keepdims",
    conceptId: "numpy-broadcasting",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "X holds 10,000 images, each `(64, 64)`, as a `(10000, 64, 64)` array. Per-image centering is attempted with `X - X.mean(axis=(1, 2))`, which raises a broadcasting error instead of centering each image. Diagnose the shape mismatch, and give the fix using keepdims.",
    rubric: {
      elements: [
        {
          id: "diagnosis",
          description:
            "Explains that X.mean(axis=(1,2)) has shape (10000,), which right-aligns against the *last* axis of X (also length 64, not 10000) — so 64 is compared against 10000, which fails (or, worse, silently succeeds against the wrong axis if the sizes happened to coincide).",
          weight: 3,
          required: true,
          misconception: {
            id: "reduced-axis-stays-aligned-to-original-position",
            description:
              "Assumes the result of reducing axis k stays associated with axis k when combined with the original array. Broadcasting only ever looks at position from the right, with no memory of which axis was reduced.",
            blameConceptId: "numpy-broadcasting",
          },
        },
        {
          id: "fix",
          description: "Gives the fix: `X - X.mean(axis=(1, 2), keepdims=True)`, giving the mean shape (10000, 1, 1), which aligns correctly against (10000, 64, 64).",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.7,
    expectedSeconds: 170,
    prereqClosure: ["numpy-broadcasting", "numpy-arrays"],
    source: NUMPY_DOCS,
    status: "live",
  },

  // -- pandas-dataframes ---------------------------------------------------
  {
    id: "pandas-dataframes--recall-head-default-count",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "By default, how many rows does `df.head()` return?",
    choices: [
      { id: "a", text: "5", correct: true },
      {
        id: "b",
        text: "10",
        correct: false,
        misconception: {
          id: "head-default-ten",
          description: "head()'s default n is 5; 10 is a common but wrong guess by analogy with other tools.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "c",
        text: "All rows",
        correct: false,
        misconception: {
          id: "head-shows-all",
          description: "head() exists specifically to show a small preview, not the whole frame; that is what printing df itself (or df.to_string()) would do.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "d",
        text: "1",
        correct: false,
        misconception: {
          id: "head-default-one",
          description: "A single row is what df.iloc[0] or df.head(1) gives; the bare default is 5.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -2.1,
    discrimination: 0.9,
    expectedSeconds: 15,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--recall-one-dtype-per-column",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Within one DataFrame column (a Series), can different rows hold different dtypes the way a Python list can hold mixed types?",
    choices: [
      { id: "a", text: "No — a Series has one dtype for the whole column; mixed types get stored as generic 'object'", correct: true },
      {
        id: "b",
        text: "Yes, each cell tracks its own type independently",
        correct: false,
        misconception: {
          id: "per-cell-dtype",
          description: "A Series is backed by one homogeneous (or object) array, not a per-cell tagged type the way a Python list of mixed objects is.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "c",
        text: "Only for string columns",
        correct: false,
        misconception: {
          id: "mixed-types-string-only",
          description: "The single-dtype-per-column rule applies to every column, not just string-typed ones.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "d",
        text: "Only if the DataFrame has a MultiIndex",
        correct: false,
        misconception: {
          id: "mixed-types-needs-multiindex",
          description: "The dtype of a column has nothing to do with what kind of index the DataFrame has.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--apply-combined-boolean-mask-rows",
    conceptId: "pandas-dataframes",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "df has 200 rows. `df.x > 0` is True for 60 of them, `df.y < 5` is True for 90 of them, and 30 rows satisfy both. How many rows does `df[(df.x > 0) & (df.y < 5)]` return?",
    answerKey: 30,
    tolerance: 0,
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["pandas-dataframes"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-dataframes--apply-bitwise-vs-python-and",
    conceptId: "pandas-dataframes",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Why does `df[df.x > 0 and df.y < 5]` raise an error, while `df[(df.x > 0) & (df.y < 5)]` works?",
    choices: [
      {
        id: "a",
        text: "`and` calls bool() on each full Series to combine them, and a Series with more than one element has an ambiguous truth value; `&` is the elementwise operator pandas overloads for this",
        correct: true,
      },
      {
        id: "b",
        text: "`and` is reserved and cannot appear inside square brackets at all",
        correct: false,
        misconception: {
          id: "and-forbidden-in-brackets",
          description: "`and` is ordinary Python and legal inside brackets; the failure is about what it does to a multi-element Series, not where it appears.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "c",
        text: "`and` only combines exactly two conditions, while `&` supports any number",
        correct: false,
        misconception: {
          id: "and-arity-limited",
          description: "Both operators are binary. The failure is about ambiguous truth value on a multi-element Series, not arity.",
          blameConceptId: "pandas-dataframes",
        },
      },
      {
        id: "d",
        text: "`and` short-circuits so it never evaluates `df.y < 5`, while `&` evaluates both",
        correct: false,
        misconception: {
          id: "and-short-circuit-explains-error",
          description: "Short-circuiting is real but not why this raises — the error fires while trying to interpret df.x > 0 itself as a single boolean.",
          blameConceptId: "pandas-dataframes",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 60,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--explain-copy-vs-view-not-guaranteed",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Explain why pandas says whether `df[...]` returns a view or a copy is 'not guaranteed' and can depend on the DataFrame's internal memory layout, unlike NumPy's clear rule for basic array slices.",
    rubric: {
      elements: [
        {
          id: "internal-layout",
          description:
            "Explains that a DataFrame can consolidate same-dtype columns into shared internal blocks, so whether a given selection can be expressed as a view depends on how it lines up with that block structure — something the caller's code does not control or see.",
          weight: 3,
          required: true,
          misconception: {
            id: "pandas-follows-numpy-slice-rule",
            description: "Assumes pandas selection follows NumPy's clean view-for-basic-slice rule. Pandas' block-based storage means the same-looking selection can be a view in one frame and a copy in another.",
            blameConceptId: "pandas-dataframes",
          },
        },
        {
          id: "practical",
          description: "Explains this is why relying on the result being a view is fragile, and why single-operation .loc assignment on the original frame is the recommended pattern.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--explain-object-dtype-cost",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "A column of strings has dtype 'object'. Explain what pandas actually stores in that case, and why operations on it are slower than on a numeric column of the same length.",
    rubric: {
      elements: [
        {
          id: "storage",
          description:
            "Explains that an object-dtype column stores an array of pointers to ordinary Python objects scattered in memory, like a Python list, rather than packed contiguous values of one fixed width the way int64 or float64 columns are.",
          weight: 3,
          required: true,
          misconception: {
            id: "object-dtype-is-still-vectorized",
            description: "Assumes an object column gets the same vectorized, contiguous-buffer treatment as a numeric column simply for being in a DataFrame. Object dtype behaves like a Python list of pointers under the hood.",
            blameConceptId: "pandas-dataframes",
          },
        },
        {
          id: "cost",
          description:
            "Explains that operations on it fall back to iterating in Python, dereferencing each pointer and calling Python-level methods, paying the same per-element overhead a Python loop would rather than running as one compiled pass.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["pandas-dataframes", "numpy-arrays"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--transfer-nan-forces-float-dtype",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Two DataFrames each have an int64 'id' column. After `pd.concat` with a third source where some 'id' values are missing, the merged column's dtype silently becomes float64, and equality checks against integers start behaving oddly. Diagnose why, and give a fix.",
    rubric: {
      elements: [
        {
          id: "why",
          description:
            "Explains that a plain int64 column has no way to represent a missing value (NaN is a float), so the moment one is needed the whole column is upcast to float64 to make room for it — every existing integer is now stored as, e.g., 3.0.",
          weight: 3,
          required: true,
          misconception: {
            id: "missing-value-doesnt-affect-dtype",
            description: "Assumes adding rows with a missing id only affects those rows. Because int64 cannot represent NaN at all, its presence forces the entire column to a float dtype.",
            blameConceptId: "pandas-dataframes",
          },
        },
        {
          id: "fix",
          description:
            "Gives a fix: use pandas' nullable integer dtype (Int64, capital I), which supports pd.NA without falling back to float; or resolve the missing ids explicitly before concatenation.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["pandas-dataframes", "numpy-arrays"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-dataframes--transfer-positional-array-assignment-after-filter",
    conceptId: "pandas-dataframes",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A function computes `adjustments = compute_stuff(df)` over the full df, then later filters `filtered = df[df.flag]` and assigns `filtered['adj'] = adjustments`. It looks correct when tested on the whole DataFrame, but silently lands on the wrong rows once an upstream filter is applied first. Diagnose the bug and give a fix.",
    rubric: {
      elements: [
        {
          id: "diagnosis",
          description:
            "Explains that assigning a bare NumPy array or list to a column is positional, aligning with filtered's own row order — it happened to look right only because, unfiltered, filtered's row order equals df's from position 0; once filtered has fewer or reordered rows, adjustments (computed against df's original rows) lines up with the wrong ones.",
          weight: 3,
          required: true,
          misconception: {
            id: "array-assignment-preserves-source-alignment",
            description: "Assumes assigning a plain array remembers which original rows its values were computed for. Positional assignment carries no label information; only a pandas Series, matched by index, does.",
            blameConceptId: "pandas-dataframes",
          },
        },
        {
          id: "fix",
          description:
            "Gives the fix: compute adjustments as a pd.Series carrying the same index as its source (e.g. `pd.Series(values, index=df.index)`), then assign it — pandas aligns by label rather than position, landing on the correct rows regardless of filtering.",
          weight: 3,
          required: true,
        },
        {
          id: "general-rule",
          description: "Bonus: states the general habit — compute any per-row derived value with the same index as its source, not as a bare array.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.8,
    expectedSeconds: 200,
    prereqClosure: ["pandas-dataframes"],
    source: AUTHORED,
    status: "live",
  },

  // -- pandas-groupby -------------------------------------------------------
  {
    id: "pandas-groupby--recall-groupby-is-lazy",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does `df.groupby('k')` return by itself, before any aggregation is applied?",
    choices: [
      { id: "a", text: "A GroupBy object — grouping metadata, computed lazily until an aggregation is requested", correct: true },
      {
        id: "b",
        text: "A dict mapping each key to its subset DataFrame, already computed",
        correct: false,
        misconception: {
          id: "groupby-returns-dict",
          description: "groupby returns a lazy GroupBy object; the per-group split is not materialized until an aggregation, iteration, or .get_group() forces it.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "c",
        text: "A new DataFrame sorted by k",
        correct: false,
        misconception: {
          id: "groupby-returns-sorted-df",
          description: "Sorting by k happens inside the eventual aggregation's grouping logic, not as a visible standalone DataFrame returned by groupby() itself.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "d",
        text: "A list of the distinct values of k",
        correct: false,
        misconception: {
          id: "groupby-returns-keys-list",
          description: "That is closer to df['k'].unique(); groupby() returns an object that knows how to split and later combine, not just the key list.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--recall-merge-on-requires-shared-column",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "`pd.merge(left, right, on='id')` requires what of 'id'?",
    choices: [
      { id: "a", text: "That both left and right have a column named 'id' to join on", correct: true },
      {
        id: "b",
        text: "That 'id' is set as the index of both frames first",
        correct: false,
        misconception: {
          id: "on-requires-index",
          description: "on= names an ordinary column in each frame; joining on the index instead uses left_index/right_index=True.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "c",
        text: "That 'id' contains only unique values in both frames",
        correct: false,
        misconception: {
          id: "on-requires-uniqueness",
          description: "merge does not require uniqueness on the join key; duplicated keys are legal and produce a many-to-many cross product within the key.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "d",
        text: "Nothing — on= is optional documentation and merge always joins on the index",
        correct: false,
        misconception: {
          id: "on-is-cosmetic",
          description: "on= determines which columns are actually used to match rows; without it merge falls back to matching on columns common to both frames, not the index.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--apply-multi-agg-shape",
    conceptId: "pandas-groupby",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "df has 500 rows and 12 distinct values of k. `df.groupby('k')['v'].agg(['mean', 'max'])` produces a result with how many rows and how many columns?",
    choices: [
      { id: "a", text: "12 rows and 2 columns — one row per group, one column per aggregation function", correct: true },
      {
        id: "b",
        text: "500 rows and 2 columns",
        correct: false,
        misconception: {
          id: "agg-keeps-all-rows",
          description: "An aggregation always collapses to one row per group, regardless of how many named functions are applied.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "c",
        text: "12 rows and 12 columns",
        correct: false,
        misconception: {
          id: "agg-columns-match-groups",
          description: "The column count comes from the number of aggregation functions requested, not from the number of groups.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "d",
        text: "1 row and 2 columns",
        correct: false,
        misconception: {
          id: "agg-ignores-groups",
          description: "Grouping is what makes the aggregation per-key; ignoring it would only make sense with no groupby at all.",
          blameConceptId: "pandas-groupby",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--apply-left-merge-row-count",
    conceptId: "pandas-groupby",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "left has 100 rows with a key column; right has a matching row for 80 of those keys and no duplicate keys on either side. How many rows does `pd.merge(left, right, how='left')` produce?",
    answerKey: 100,
    tolerance: 0,
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pandas-groupby--explain-groupby-sort-default",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "By default, `df.groupby('k')` sorts its result by the group key. Explain why this default can be surprising for a categorical column, and how to preserve the original category order instead.",
    rubric: {
      elements: [
        {
          id: "default",
          description:
            "Explains that groupby sorts group keys by default (sort=True), so the output order need not match first-appearance order or any meaningful domain order — 'low', 'medium', 'high' would sort alphabetically as 'high', 'low', 'medium'.",
          weight: 3,
          required: true,
          misconception: {
            id: "groupby-preserves-appearance-order",
            description: "Assumes group order in the output matches first-appearance order in the data. The default sorts by key value; appearance order requires sort=False or an ordered Categorical.",
            blameConceptId: "pandas-groupby",
          },
        },
        {
          id: "fix",
          description: "Gives the fix: pass sort=False for first-appearance order, or make the column an ordered Categorical with the domain-meaningful category list.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 140,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--explain-merge-suffixes",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken", "handwritten"],
    stem:
      "Left and right both have a non-key column named 'value'. Explain what pd.merge does about the collision by default, and why silently picking one side's column would be worse.",
    rubric: {
      elements: [
        {
          id: "default",
          description: "Explains pandas renames both to value_x and value_y (configurable via suffixes=) rather than dropping either.",
          weight: 3,
          required: true,
          misconception: {
            id: "merge-drops-duplicate-columns",
            description: "Assumes a merge keeps only one side's column when names collide, silently discarding the other. Both are kept, renamed with suffixes, specifically so nothing is silently lost.",
            blameConceptId: "pandas-groupby",
          },
        },
        {
          id: "why-worse",
          description: "Explains that silently keeping only one side would give a caller who wanted the other side's 'value' wrong numbers with no warning, whereas the suffix forces an explicit choice.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--transfer-apply-inconsistent-return-shape",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "`df.groupby('k').apply(f)` works fine when f returns a scalar per group. A colleague changes f to sometimes return a whole DataFrame (for groups meeting some condition) and a scalar otherwise, and the result becomes an inconsistent, hard-to-use object. Explain why apply's output shape depends on what f returns, and the right way to make behavior deterministic per group.",
    rubric: {
      elements: [
        {
          id: "apply-is-polymorphic",
          description:
            "Explains that unlike agg/transform/filter, whose output shape is fixed by contract, apply infers its output shape from what f actually returns per group — consistent scalars stitch into a Series, consistent same-shaped frames stitch into a bigger frame, but mixed return shapes give pandas no consistent way to combine them.",
          weight: 3,
          required: true,
          misconception: {
            id: "apply-output-shape-is-fixed",
            description: "Treats groupby.apply like agg or transform, with one guaranteed output shape. apply's output shape is inferred from f's actual return values and can vary if f is inconsistent across groups.",
            blameConceptId: "pandas-groupby",
          },
        },
        {
          id: "fix",
          description:
            "Gives a fix: make f return the same shape for every group (e.g. always a Series with the same keys, filled with NaN where a branch doesn't apply), or split into two separate groupby calls, one per case, each with a uniform return type.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.8,
    expectedSeconds: 190,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
  {
    id: "pandas-groupby--transfer-merge-dtype-mismatch-empty-result",
    conceptId: "pandas-groupby",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Two tables are merged on a customer id stored as the string '00123' in one table and the integer 123 in the other. The merge returns zero matching rows and no error. Diagnose why, and give the fix.",
    rubric: {
      elements: [
        {
          id: "diagnosis",
          description:
            "Explains that merge matches keys by equality, and the string '00123' never compares equal to the integer 123 — every row fails to match, so an inner merge on a total type mismatch produces an empty, well-formed result with no error, which is easy to misread as 'no overlap in the data'.",
          weight: 3,
          required: true,
          misconception: {
            id: "merge-coerces-types-to-match",
            description: "Assumes pandas coerces '00123' and 123 to compare equal because they represent the same id conceptually. Merge compares as-is; type differences are the caller's to reconcile first.",
            blameConceptId: "pandas-groupby",
          },
        },
        {
          id: "checks",
          description: "Names a concrete check that would catch it before merging: comparing left['id'].dtype and right['id'].dtype, or checking the key sets intersect at all.",
          weight: 2,
        },
        {
          id: "fix",
          description:
            "Gives the fix: cast both key columns to the same explicit type before merging (e.g. both to string, preserving any leading zeros — never a bare int cast if leading zeros carry meaning).",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["pandas-groupby", "pandas-dataframes"],
    source: PANDAS_DOCS,
    status: "live",
  },
];
