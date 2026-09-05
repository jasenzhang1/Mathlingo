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
    stem: "For a non-empty list a, what does a[-1] evaluate to?",
    choices: [
      { id: "a", text: "The last element", correct: true },
      {
        id: "b",
        text: "The first element",
        correct: false,
        misconception: {
          id: "negative-wraps-to-front",
          description:
            "Reads -1 as 'one before the start'. Negative indices count backwards from the end, so -1 is the last element and -len(a) is the first.",
          blameConceptId: "python-indexing",
        },
      },
      {
        id: "c",
        text: "IndexError — indices cannot be negative",
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
    stem: "After running a = [3, 1, 2]; a = a.sort(), what is a?",
    choices: [
      { id: "a", text: "None", correct: true },
      {
        id: "b",
        text: "[1, 2, 3]",
        correct: false,
        misconception: {
          id: "sort-returns-list",
          description:
            "Assumes sort() returns the sorted list. It sorts in place and returns None, so rebinding the name discards the list entirely — and no error is raised.",
          blameConceptId: "python-list-operations",
        },
      },
      {
        id: "c",
        text: "[3, 1, 2]",
        correct: false,
        misconception: {
          id: "sort-is-pure",
          description:
            "Assumes sort() leaves a alone, as sorted() would. It mutates — but the assignment then overwrites the name with the return value anyway.",
          blameConceptId: "python-list-operations",
        },
      },
      {
        id: "d",
        text: "A TypeError is raised",
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
      "a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]. How many elements are in a[3:8]?",
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
    stem: "a has five elements. What do a[10] and a[10:20] each produce?",
    choices: [
      { id: "a", text: "a[10] raises IndexError; a[10:20] returns []", correct: true },
      {
        id: "b",
        text: "Both raise IndexError",
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
        text: "Both return None",
        correct: false,
        misconception: {
          id: "out-of-range-is-none",
          description:
            "Imports a lookup-with-default convention from dicts or from other languages. Neither expression returns None.",
          blameConceptId: "python-slicing",
        },
      },
      {
        id: "d",
        text: "a[10] returns None; a[10:20] raises IndexError",
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
      "a = [1, 2, 3]; b = a; c = a[:]; b.append(4); c.append(5). State the final value of a, b and c, and say why b and c behaved differently.",
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
              "Believes assignment copies the value. In Python, assignment binds a name to an existing object; only an explicit slice, copy() or constructor makes a new one.",
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
      "grid = [[0] * 3] * 2, then grid[0][0] = 1. What is grid?",
    choices: [
      { id: "a", text: "[[1, 0, 0], [1, 0, 0]]", correct: true },
      {
        id: "b",
        text: "[[1, 0, 0], [0, 0, 0]]",
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
        text: "[[1, 1, 1], [1, 1, 1]]",
        correct: false,
        misconception: {
          id: "inner-multiply-shares",
          description:
            "Attributes the sharing to the inner [0] * 3. Repeating immutable ints is harmless; it is repeating the mutable list that aliases.",
          blameConceptId: "python-list-operations",
        },
      },
      {
        id: "d",
        text: "TypeError — a list of lists cannot be multiplied",
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
      "Python slices exclude their right endpoint: a[1:4] returns three elements, not four. Give two concrete properties this convention buys, and explain what would break if the endpoint were inclusive.",
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
      "A colleague removes items inside a loop: for x in a: if bad(x): a.remove(x). On a = [1, 1, 2, 1] with bad(x) meaning x == 1, this leaves [1, 2] rather than [2]. Explain the mechanism, say why no exception is raised, and give a correct rewrite.",
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
    stem: "d is a dict with no key 'z'. What do d['z'] and d.get('z') each do?",
    choices: [
      { id: "a", text: "d['z'] raises KeyError; d.get('z') returns None", correct: true },
      {
        id: "b",
        text: "Both return None",
        correct: false,
        misconception: {
          id: "subscript-is-lenient",
          description:
            "Assumes subscripting has a default. It does not — the strictness of d[k] is the point of having .get() as a separate method.",
          blameConceptId: "python-dictionaries",
        },
      },
      {
        id: "c",
        text: "Both raise KeyError",
        correct: false,
        misconception: {
          id: "get-is-strict",
          description:
            "Treats .get() as a synonym for subscripting. Its whole purpose is to return a default instead of raising.",
          blameConceptId: "python-dictionaries",
        },
      },
      {
        id: "d",
        text: "d['z'] inserts 'z' with value None and returns it",
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
        text: "None",
        correct: false,
        misconception: {
          id: "none-unhashable",
          description:
            "None is a perfectly ordinary hashable singleton and is legal as a key.",
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
      "words = ['ox', 'ant', 'ox', 'bee', 'ant', 'ox']. How many entries does the dict produced by counting occurrences of each word have?",
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
              "Scans the whole input once per distinct key, or calls .count() inside the loop, turning a linear job into a quadratic one.",
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
        text: "A KeyError is raised on the duplicate",
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
            "Treats enumerate as range(len(a)). It yields both parts, which is the entire reason it exists.",
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
            "Guesses values. The default is keys — d.values() is the explicit way to ask for values, and d.items() for both.",
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
            "Assumes iteration means .items(). Unpacking the result as `for k, v in d` then fails, or worse, unpacks a two-character string key into two names.",
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
      "names has 7 entries and scores has 5. How many pairs does zip(names, scores) yield?",
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
      "a = ['p', 'q', 'r']. What does `for i, x in enumerate(a, 1)` produce on its first step, and what happens if the body evaluates a[i]?",
    choices: [
      {
        id: "a",
        text: "i = 1, x = 'p'; a[i] reads 'q' — one element past x, and the last step raises IndexError",
        correct: true,
      },
      {
        id: "b",
        text: "i = 1, x = 'q'; enumerate skips the first element",
        correct: false,
        misconception: {
          id: "start-skips-element",
          description:
            "Believes start advances the position read. It only renumbers the label; iteration still begins at a[0].",
          blameConceptId: "python-loops",
        },
      },
      {
        id: "c",
        text: "i = 1, x = 'p'; a[i] reads 'p', since the numbering was adjusted to match",
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
        text: "TypeError — enumerate takes only one argument",
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
      "rows = [[1, 2, 3], [4, 5, 6]]. State what zip(*rows) yields, and explain what the * is doing.",
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
      "A function loops `for row in rows:` and afterwards uses `row` to build its return value. It works in testing and raises NameError in production. Explain what input triggers it, why the code passed testing, and what the loop-variable rule is.",
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
            "Reasons by analogy from [] giving a list. Parentheses around a comprehension give a lazy generator; a tuple needs tuple(...) explicitly.",
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
      "For a list a of length n, compare the lengths of [x for x in a if x > 0] and [x if x > 0 else 0 for x in a].",
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
      "a = [-3, 0, 2, -1, 5, 4]. How many elements are in [x * x for x in a if x > 0]?",
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
      "grid = [[1, 2], [3, 4]]. State the output of [x for row in grid for x in row], and say what would happen if the two for clauses were written in the opposite order.",
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
      "g = (x for x in [1, 2, 3]). A script calls sum(g), then sum(g) again. What are the two results?",
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
        text: "6, then a StopIteration is raised",
        correct: false,
        misconception: {
          id: "exhaustion-raises",
          description:
            "Expects exhaustion to surface as an exception. sum() absorbs StopIteration and returns its start value, so the second call succeeds with a wrong-looking 0.",
          blameConceptId: "python-comprehensions",
        },
      },
      {
        id: "d",
        text: "A TypeError on the first call — a generator has no length",
        correct: false,
        misconception: {
          id: "sum-needs-length",
          description:
            "sum() iterates and needs no length. It is len(g) that would be a TypeError.",
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
      "For lists a = [1, 2] and b = [3, 4], a + b is [1, 2, 3, 4]. What is np.array(a) + np.array(b)?",
    choices: [
      { id: "a", text: "array([4, 6])", correct: true },
      {
        id: "b",
        text: "array([1, 2, 3, 4])",
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
            "Confuses an elementwise operation with a reduction. + preserves shape; np.sum collapses it.",
          blameConceptId: "numpy-arrays",
        },
      },
      {
        id: "d",
        text: "A ValueError — arrays cannot be added",
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
      "a = np.array([1, 2, 3]) has dtype int64. What does a[0] = 2.7 leave in a[0]?",
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
        text: "A TypeError is raised",
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
      "a = np.array([-2, 0, 3, 7, -1, 4]). How many elements does a[a > 0] contain?",
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
      "a = np.arange(10). Compare b = a[2:5] with c = a[[2, 3, 4]]. Writing b[0] = 99 and c[1] = 88 — which writes reach a?",
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
              "Assumes boolean indexing keeps the original length. It selects, so the result is generally shorter — which is why np.where and a mask are not interchangeable.",
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
      "A pipeline stores counts in an integer array, then normalises in place with counts /= counts.sum(). In one version this raises; in another it silently produces all zeros. Explain both outcomes and give a fix.",
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
            "Reverses the rule. Left-alignment would make a (3,) vector broadcast down the rows of a (3, 4) matrix; the actual right-alignment makes it broadcast across the columns, which is why (3, 4) with (3,) is an error.",
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
    stem: "A has shape (3, 4). What is the shape of A.sum(axis=0)?",
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
        text: "(3, 1) — the axis is kept with length 1",
        correct: false,
        misconception: {
          id: "keepdims-is-default",
          description:
            "Describes keepdims=True, which is not the default. Without it the axis is dropped entirely.",
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
            "Describes A.sum() with no axis. Supplying an axis reduces along that one axis only.",
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
      "Give the broadcast result shape, or say why it fails, for each pair: (3, 4) with (4,); (3, 4) with (3,); (3, 1) with (1, 4); (5, 1, 3) with (4, 3).",
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
              "Accepts (3, 4) with (3,) because 3 appears in both shapes. Broadcasting compares aligned positions, not the multiset of lengths.",
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
      "A has shape (3, 4). Which expression subtracts each row's own mean from that row?",
    choices: [
      { id: "a", text: "A - A.mean(axis=1, keepdims=True)", correct: true },
      {
        id: "b",
        text: "A - A.mean(axis=1)",
        correct: false,
        misconception: {
          id: "forgot-keepdims",
          description:
            "The means have shape (3,), which right-aligns against the 4 columns and raises. The fix is keepdims=True, or an explicit [:, None].",
          blameConceptId: "numpy-broadcasting",
        },
      },
      {
        id: "c",
        text: "A - A.mean(axis=0)",
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
        text: "A - A.mean()",
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
      "x has shape (1000,). How many elements does x[:, None] - x[None, :] contain?",
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
      "Why does keepdims=True exist, when the reduced axis has length 1 and carries no information?",
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
    stem: "What is the difference between df['x'] and df[['x']]?",
    choices: [
      { id: "a", text: "The first is a Series; the second is a one-column DataFrame", correct: true },
      {
        id: "b",
        text: "Nothing — both select the column x",
        correct: false,
        misconception: {
          id: "brackets-equivalent",
          description:
            "Both do select x, but they return different types, so a downstream .mean() gives a scalar in one case and a Series in the other.",
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
        text: "The second raises KeyError unless x is a MultiIndex level",
        correct: false,
        misconception: {
          id: "list-selection-needs-multiindex",
          description:
            "List-of-columns selection is the ordinary way to take a subset of columns and needs no MultiIndex.",
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
      "s has index ['a', 'b', 'c', 'd']. How many elements do s.loc['a':'c'] and s.iloc[0:2] return?",
    choices: [
      { id: "a", text: "3 and 2 — .loc includes its endpoint, .iloc does not", correct: true },
      {
        id: "b",
        text: "2 and 2 — both follow Python's half-open rule",
        correct: false,
        misconception: {
          id: "loc-is-half-open",
          description:
            "Applies the standard slice convention to label slicing. With labels there is no defined 'one past the end' to stop before, so .loc includes the endpoint — the one place pandas breaks the Python rule.",
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
            ".iloc is positional and keeps the ordinary half-open rule. Only label-based slicing is inclusive.",
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
      "s1 has index ['a', 'b', 'c'] and s2 has index ['b', 'c', 'd'], both complete with no missing values. How many entries does s1 + s2 have?",
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
      "Using the two Series above, state which entries of s1 + s2 are NaN and why, and give the call that would treat a missing label as zero instead.",
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
              "Assumes two equal-length Series add position by position. They do not — which is why a filtered or reordered Series still adds correctly, and why two complete inputs can produce NaNs.",
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
      "df has a default RangeIndex of 0..99. After sub = df[df.x > 0] keeps rows 5, 12 and 40, what does sub.loc[0] do?",
    choices: [
      { id: "a", text: "Raises KeyError — label 0 is not in the filtered index", correct: true },
      {
        id: "b",
        text: "Returns the first row of sub, which was row 5 of df",
        correct: false,
        misconception: {
          id: "loc-is-positional",
          description:
            "Treats .loc as positional. Filtering keeps the original labels, so sub's index is [5, 12, 40] and 0 is simply absent. .iloc[0] is the positional request.",
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
        text: "Returns NaN",
        correct: false,
        misconception: {
          id: "missing-label-gives-nan",
          description:
            "Confuses lookup with alignment. Alignment fills unmatched labels with NaN; a direct .loc lookup of an absent label raises.",
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
      "A Series is often described as 'a NumPy array with an index'. Explain what the index buys that the array alone does not, and one thing it costs.",
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
              "Treats the index as decoration on top of an array. It changes the semantics of arithmetic, which is why the same code on arrays and on Series can give different-length answers.",
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
      "Explain what SettingWithCopyWarning is telling you when df[df.x > 0]['y'] = 1 triggers it, and why df.loc[df.x > 0, 'y'] = 1 is not merely a stylistic improvement.",
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
      "A report divides df['revenue'].sum() by len(df) to get an average, while a colleague uses df['revenue'].mean(). The two disagree. Explain why, say which is right, and describe how you would decide.",
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
              "Assumes NaN behaves as 0. It is skipped, not zeroed — which changes the denominator, not just the numerator, and is why the two calculations differ.",
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
      "df has 500 rows and 12 distinct values of the column k. How many rows does df.groupby('k')['v'].mean() return?",
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
      { id: "a", text: "df['v'] - df.groupby('k')['v'].transform('mean')", correct: true },
      {
        id: "b",
        text: "df['v'] - df.groupby('k')['v'].mean()",
        correct: false,
        misconception: {
          id: "agg-then-subtract",
          description:
            "The aggregation is indexed by k, not by df's index, so alignment matches group labels against row labels and yields a mostly-NaN result of the wrong length — a silent failure, not an error.",
          blameConceptId: "pandas-groupby",
        },
      },
      {
        id: "c",
        text: "df.groupby('k')['v'].apply(lambda s: s - s.mean()).reset_index(drop=True)",
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
        text: "df['v'] - df['v'].mean()",
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
];
