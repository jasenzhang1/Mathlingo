import type { WikiArticle } from "../types";

export const numpyDtypesWiki: WikiArticle = {
  conceptId: "numpy-dtypes",
  summary: "A NumPy array has one dtype for every element, which is what makes it fast and what makes it behave unlike a Python list. Integers are fixed-width and wrap silently on overflow rather than growing; a slice is a view sharing memory with its parent, so writing through it changes the original.",

  sections: [
    {
      heading: "Fixed-width types",
      blocks: [
        {
          kind: "code",
          source: "import numpy as np\n\na = np.array([1, 2, 3])          # int64 inferred\na.dtype                          # dtype('int64')\nnp.array([1, 2], dtype=np.float32)\na.astype(float)                  # a new array, converted\n\nsmall = np.array([120], dtype=np.int8)\nsmall + 10                       # -126 — wrapped, no warning\n\nnp.array([1, \"a\"])                # everything becomes a string",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Integer overflow is silent",
          text: "A Python int grows without limit; a NumPy int8 holds -128 to 127 and wraps past the end. Nothing raises. This is the price of a packed, fast array, and it is why a sum over a large int32 column can come back negative — accumulate in int64 or float, or set the dtype deliberately.",
        },
      ],
    },
    {
      heading: "Views and copies",
      blocks: [
        {
          kind: "code",
          source: "a = np.array([1, 2, 3, 4])\npart = a[1:3]                    # a VIEW — shares memory\npart[0] = 99\na                                # array([ 1, 99,  3,  4])\n\npart = a[1:3].copy()             # an independent copy\npart = a[[1, 2]]                 # fancy indexing always copies\npart = a[a > 2]                  # boolean masks copy too\n\npart.base is a                   # True for a view, None for a copy",
        },
        {
          kind: "prose",
          text: "This is the sharpest difference from Python lists, where a slice is always a copy. A NumPy slice shares the buffer, which is what makes slicing free — no data is moved. The rule worth memorising: basic slicing gives a view; fancy indexing and boolean masks give copies. When unsure, check .base or call .copy() and stop worrying.",
        },
      ],
    },
  ],

  references: [
    { source: "NumPy User Guide", locator: "Data types" },
    { source: "NumPy User Guide", locator: "Copies and views" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
