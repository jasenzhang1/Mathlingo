import type { WikiArticle } from "../types";

export const pandasConcatWiki: WikiArticle = {
  conceptId: "pandas-concat",
  summary: "concat glues frames together along an axis: stacked by row for more observations, side by side for more columns. It aligns on the other axis, so stacking two frames with different columns gives the union with NaN in the gaps — usually helpful, occasionally the sign of a typo in a column name.",

  sections: [
    {
      heading: "Stacking and aligning",
      blocks: [
        {
          kind: "code",
          source: "pd.concat([jan, feb])                       # rows, index labels repeat\npd.concat([jan, feb], ignore_index=True)    # rows, renumbered 0..n-1\npd.concat([left, right], axis=1)            # columns, aligned on the index\npd.concat([jan, feb], keys=[\"jan\", \"feb\"])  # keep the source as an index level\npd.concat([a, b], join=\"inner\")             # only the columns both have",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Duplicate index labels after a row concat",
          text: "Two frames each indexed 0, 1, 2 concat to an index of 0, 1, 2, 0, 1, 2. Later .loc[0] then returns two rows instead of one, and joins misbehave. ignore_index=True renumbers, and is what you want unless the original labels carry meaning.",
        },
      ],
    },
    {
      heading: "concat versus merge",
      blocks: [
        {
          kind: "prose",
          text: "They answer different questions. concat is positional assembly — put these frames next to each other, aligning on the index. merge is a relational join — match rows by the values in a key column, the way SQL does. If you are pairing rows because they share an id, you want merge; if you are appending this month's rows to last month's, you want concat.",
        },
        {
          kind: "table",
          headers: ["Task", "Tool"],
          rows: [
            ["Append monthly files into one frame", "concat, ignore_index=True"],
            ["Attach customer details by customer_id", "merge on that column"],
            ["Put two same-length columns side by side", "concat axis=1, or just assign"],
            ["Combine overlapping frames, preferring one", "combine_first"],
          ],
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "Merge, join, concatenate and compare" },
    { source: "pandas API", locator: "pandas.concat" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
