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
