import type { WikiArticle } from "../types";

export const pandasMissingWiki: WikiArticle = {
  conceptId: "pandas-missing",
  summary: "Missing values in pandas are usually NaN, a float that propagates through arithmetic and compares unequal to everything including itself. That last property is why you test for it with isna() rather than == None or == np.nan. Aggregations skip it by default, which is convenient and occasionally hides how little data an average was computed from.",

  sections: [
    {
      heading: "How NaN behaves",
      blocks: [
        {
          kind: "code",
          source: "import numpy as np\n\nnp.nan == np.nan        # False — always\nnp.nan + 1              # nan — it propagates\n\ns.isna()                # the correct test, elementwise\ns.sum()                 # skips NaN by default\ns.sum(skipna=False)     # nan, if any value is missing\ns.mean()                # divides by the count of non-missing values",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A NaN in an int column makes it float",
          text: "NumPy integers have no NaN, so introducing a missing value into an int64 column promotes the whole column to float64 — and IDs start printing as 1001.0. pandas' nullable Int64 dtype (capital I) exists precisely to hold integers and missing values at once.",
        },
      ],
    },
    {
      heading: "Dropping and filling are decisions, not cleanup",
      blocks: [
        {
          kind: "code",
          source: "df.dropna()                       # any row with any NaN, gone\ndf.dropna(subset=[\"amount\"])      # only rows missing that one column\ndf.dropna(axis=1)                 # drop columns instead\n\ndf[\"amount\"].fillna(0)            # a real claim: absent means zero\ndf[\"amount\"].fillna(df[\"amount\"].median())\ndf[\"reading\"].ffill()             # carry the last observation forward",
        },
        {
          kind: "prose",
          text: "Each of these asserts something about why the data is missing. Filling with 0 says an absent sale is a sale of nothing; filling with the median says the row is otherwise typical; ffill says the last known value still holds. Dropping says these rows cannot inform the question — and quietly biases the result if missingness is related to what you are measuring.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Count before you fill",
          text: "df.isna().sum() gives missing values per column in one line. Doing that first turns filling from a reflex into a decision, and occasionally reveals that a column is 90% empty and should not be used at all.",
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "Working with missing data" },
    { source: "pandas User Guide", locator: "Nullable integer data type" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
