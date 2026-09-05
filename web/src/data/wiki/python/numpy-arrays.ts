import type { WikiArticle } from "../types";

export const numpyArraysWiki: WikiArticle = {
  conceptId: "numpy-arrays",
  summary:
    "A Python list holds pointers to arbitrary objects. A NumPy array holds raw values of one dtype " +
    "in one contiguous block of memory. Everything else about NumPy follows from that: elementwise " +
    "arithmetic can run as a single compiled loop over the block rather than a Python loop chasing " +
    "pointers, which is worth one to two orders of magnitude — and it is why the correct way to " +
    "speed up numerical Python is almost always to delete the loop, not to optimise it.",

  sections: [
    {
      heading: "One dtype, one block",
      blocks: [
        {
          kind: "table",
          headers: ["", "list", "ndarray"],
          rows: [
            ["Element types", "Anything, mixed", "One dtype for the whole array"],
            ["Memory layout", "Pointers to boxed objects", "Contiguous raw values"],
            ["a + b", "Concatenates", "Adds elementwise"],
            ["a * 2", "Repeats the list", "Doubles every element"],
            ["Growth", "append is O(1) amortised", "Fixed size; append reallocates and copies"],
            ["Arithmetic loop runs in", "Python", "C"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "+ and * mean different things on the two types",
          text:
            "[1, 2] + [3] is [1, 2, 3]; np.array([1, 2]) + np.array([3, 3]) is array([4, 5]). This " +
            "is the most common porting bug when a list gets replaced by an array halfway through a " +
            "function — the code still runs, and every number is wrong.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The dtype is fixed at creation and will silently truncate",
          text:
            "np.array([1, 2, 3]) has dtype int64. Assigning a[0] = 2.7 stores 2, with no warning. " +
            "Mixing a float into the constructor promotes the whole array to float64 instead. If a " +
            "computation must be floating point, say so — np.array([1, 2, 3], dtype=float).",
        },
      ],
    },

    {
      heading: "Vectorization",
      blocks: [
        {
          kind: "prose",
          text:
            "Vectorizing means expressing an operation over a whole array at once so the iteration " +
            "happens inside NumPy rather than in Python. The gain is not that C loops are magic — it " +
            "is that a Python-level loop pays interpreter overhead, type dispatch, and an object " +
            "unbox per element, and the vectorized form pays each of those once for the entire array.",
        },
        {
          kind: "example",
          title: "The same sum of squares, three ways",
          problem: "Compute the sum of squares of a million values.",
          steps: [
            "Loop: total = 0; for x in a: total += x * x — a million interpreted iterations.",
            "Comprehension: sum(x * x for x in a) — the same million, slightly tidier.",
            "Vectorized: np.sum(a ** 2) — one call; the loop runs in compiled code over a contiguous block.",
            "Better still: a @ a, which uses the BLAS dot product and never materialises the squares.",
          ],
          answer:
            "All three give the same number. The last two are typically 10-100x faster, and a @ a " +
            "also allocates nothing beyond the scalar result.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Universal function (ufunc)", description: "An elementwise operation compiled for every dtype — np.exp, np.sqrt, +, *, >." },
            { term: "Boolean mask", description: "a[a > 0] selects with a boolean array. It is a filter with no loop and no if." },
            { term: "np.where(cond, x, y)", description: "The elementwise conditional expression — the vectorized `x if cond else y`." },
            { term: "Fancy indexing", description: "a[[3, 1, 4]] selects by an array of positions, in that order, and returns a copy." },
          ],
        },
      ],
    },

    {
      heading: "Views and copies",
      blocks: [
        {
          kind: "prose",
          text:
            "A basic slice of an array is a view: it shares the underlying buffer, so writing through " +
            "it changes the original. This is the opposite of list slicing, which copies. Fancy " +
            "indexing and boolean masking do copy. The rule of thumb is that anything expressible as " +
            "a start/stop/step over the existing memory is a view, and anything requiring a gather is " +
            "a copy.",
        },
        {
          kind: "code",
          source: "b = a[1:4]   # view  -> b[0] = 99 changes a[1]\nb = a[[1,2,3]] # copy  -> b[0] = 99 leaves a alone",
          caption: "Same three elements, opposite aliasing behaviour.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Reshape is free; transpose is too",
          text:
            "a.reshape(...) and a.T normally return views — they change how the same bytes are " +
            "interpreted, not the bytes. That is why reshaping a large array costs nothing, and also " +
            "why a write to the reshaped array is a write to the original.",
        },
      ],
    },
  ],

  references: [
    { source: "NumPy user guide", locator: "Array fundamentals; Copies and views" },
    { source: "VanderPlas, Python Data Science Handbook", locator: "Ch. 2, Introduction to NumPy" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
