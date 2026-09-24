import type { WikiArticle } from "../types";

export const numpyAggregationsWiki: WikiArticle = {
  conceptId: "numpy-aggregations",
  summary: "sum, mean, min, max, std and the arg* family reduce an array to fewer numbers. The axis argument names the dimension being collapsed, which is the single thing worth getting straight: axis=0 collapses rows and leaves one value per column, axis=1 collapses columns and leaves one per row.",

  sections: [
    {
      heading: "axis, precisely",
      blocks: [
        {
          kind: "code",
          source: "import numpy as np\nm = np.array([[1, 2, 3],\n              [4, 5, 6]])        # shape (2, 3)\n\nm.sum()                          # 21 — everything\nm.sum(axis=0)                    # [5 7 9]  — one per column\nm.sum(axis=1)                    # [6 15]   — one per row\nm.sum(axis=0).shape              # (3,) — the axis-0 dimension is gone\n\nm.sum(axis=1, keepdims=True)     # shape (2, 1), so it broadcasts back",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "axis names what disappears",
          text: "The shape is (2, 3). Summing with axis=0 removes the 2 and leaves (3,); axis=1 removes the 3 and leaves (2,). Reading it as 'which dimension gets collapsed' is reliable, where 'axis=0 means rows' invites exactly the off-by-one-axis bug it is meant to prevent.",
        },
        {
          kind: "table",
          headers: ["Call", "Gives"],
          rows: [
            ["argmax()", "the index of the largest value, in the flattened array"],
            ["argmax(axis=1)", "the index of the largest value within each row"],
            ["argsort()", "the indices that would sort the array"],
            ["cumsum()", "a running total, same shape as the input"],
            ["std(ddof=1)", "the sample standard deviation; the default ddof=0 is the population one"],
            ["nanmean()", "the mean ignoring NaN, where mean() would return NaN"],
          ],
        },
      ],
    },
    {
      heading: "NaN, and the ddof trap",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "np.mean and np.std differ from pandas by default",
          text: "A NaN anywhere makes np.mean return NaN, where a pandas Series skips it. And np.std uses ddof=0 — the population formula — while pandas Series.std uses ddof=1. Two lines that look the same across the two libraries can therefore disagree, which is a genuinely nasty source of mismatched numbers in a report.",
        },
        {
          kind: "code",
          source: "a = np.array([1.0, np.nan, 3.0])\n\na.mean()            # nan\nnp.nanmean(a)       # 2.0\n\nnp.std([1, 2, 3])            # 0.816...  (ddof=0)\nnp.std([1, 2, 3], ddof=1)    # 1.0       (matches pandas)",
        },
      ],
    },
  ],

  references: [
    { source: "NumPy User Guide", locator: "Statistics routines" },
    { source: "NumPy API", locator: "numpy.sum — the axis argument" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
