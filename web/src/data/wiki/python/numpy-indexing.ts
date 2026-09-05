import type { WikiArticle } from "../types";

export const numpyIndexingWiki: WikiArticle = {
  conceptId: "numpy-indexing",
  summary:
    "A NumPy array generalizes list indexing to any number of dimensions, adds two entirely new ways to " +
    "select — a boolean mask and a list of positions — and changes which of those return a view versus a " +
    "copy. Getting comfortable with a[i, j] instead of a[i][j], and with a[a > 0] instead of a loop and an " +
    "if, is most of what 'thinking in NumPy' actually means day to day.",

  sections: [
    {
      heading: "Multi-dimensional indexing and slicing",
      blocks: [
        {
          kind: "code",
          source: "A = np.arange(12).reshape(3, 4)\nA[1, 2]      # 6 — row 1, column 2\nA[1]         # array([4, 5, 6, 7]) — the whole second row\nA[:, 2]      # array([2, 6, 10]) — the whole third column\nA[0:2, 1:3]  # rows 0-1, columns 1-2, as a 2x2 block",
        },
        {
          kind: "prose",
          text:
            "A[i, j] is the idiomatic NumPy form — one pair of brackets, comma-separated indices — rather " +
            "than the nested A[i][j] a list of lists would need. Both can work on a 2-D array, but A[i, j] " +
            "is a single indexing operation rather than two, and it's the only form that extends cleanly " +
            "to slices like A[0:2, 1:3].",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A colon alone means 'every index along this axis'",
          text:
            "A[:, 2] reads as 'every row, column 2' — the lone colon is shorthand for the full a[0:len] " +
            "slice along that axis. This is how you select a whole row or column without spelling out its " +
            "length.",
        },
      ],
    },
    {
      heading: "Boolean masks and np.where",
      blocks: [
        {
          kind: "code",
          source: "a = np.array([3, -1, 4, -1, 5])\nmask = a > 0\nmask          # array([True, False, True, False, True])\na[mask]       # array([3, 4, 5]) — only the positive values\na[a < 0] = 0  # replace every negative value with 0, in place",
        },
        {
          kind: "prose",
          text:
            "a > 0 doesn't filter anything by itself — it produces a same-shaped array of booleans. " +
            "Indexing with that boolean array is what actually selects, and assigning into a masked " +
            "selection (a[a < 0] = 0) mutates exactly those positions and nowhere else, with no loop.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "np.where(cond, x, y) is the vectorized ternary",
          text:
            "np.where(a > 0, a, 0) returns a new array that's a where the condition holds and 0 elsewhere " +
            "— the same idea as a[a < 0] = 0, but non-mutating, and able to pick between two full arrays " +
            "rather than a single fill value.",
        },
      ],
    },
    {
      heading: "Fancy indexing, and what copies versus what doesn't",
      blocks: [
        {
          kind: "code",
          source: "a = np.array([10, 20, 30, 40, 50])\na[[3, 0, 1]]   # array([40, 10, 20]) — by position, in that order, can repeat\nb = a[1:4]     # view — b[0] = 99 also changes a[1]\nc = a[[1,2,3]] # copy — c[0] = 99 leaves a untouched",
        },
        {
          kind: "prose",
          text:
            "Fancy indexing — selecting with a list or array of integer positions — can reorder, repeat, or " +
            "subset elements in any way, which a simple start:stop:step slice can't express. That extra " +
            "flexibility is exactly why it must copy: there's no single stride that describes an arbitrary " +
            "reordering, so NumPy has to gather the values into new memory.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Boolean masking copies too",
          text:
            "Like fancy indexing, a[mask] returns a copy, not a view — the set of True positions isn't a " +
            "regular stride either. Only a plain slice (start:stop:step, on one or more axes) is guaranteed " +
            "to be a view.",
        },
      ],
    },
  ],

  references: [
    { source: "NumPy user guide", locator: "Indexing on ndarrays" },
    { source: "VanderPlas, Python Data Science Handbook", locator: "Ch. 2, Fancy Indexing" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
