import type { WikiArticle } from "../types";

export const pandasGroupbyWiki: WikiArticle = {
  conceptId: "pandas-groupby",
  summary:
    "Three operations cover most of what anyone does to a table: summarise within groups, bring two " +
    "tables together, and change which facts are rows and which are columns. groupby is " +
    "split-apply-combine; merge is a database join with all of a join's ability to change your row " +
    "count without saying so; pivot and melt move information between the row axis and the column " +
    "axis. Knowing what each does to the shape is most of knowing how to use them.",

  sections: [
    {
      heading: "groupby: split, apply, combine",
      blocks: [
        {
          kind: "prose",
          text:
            "df.groupby('k') splits the frame into one sub-frame per distinct value of k, applies a " +
            "function to each, and stitches the results back together. What comes out depends on what " +
            "the function returns: one number per group gives a summary with one row per group, and a " +
            "value per input row gives something the same length as the original.",
        },
        {
          kind: "table",
          headers: ["Call", "Function returns", "Output rows", "Typical use"],
          rows: [
            ["g.agg('mean')", "one scalar per group", "one per group", "Summary table"],
            ["g.transform('mean')", "one value per input row", "same as input", "Group mean broadcast back for centring"],
            ["g.filter(fn)", "a bool per group", "the rows of kept groups", "Drop groups with fewer than n rows"],
            ["g.apply(fn)", "anything", "depends — slowest path", "When nothing above fits"],
          ],
        },
        {
          kind: "example",
          title: "Centring a value within its group",
          problem: "Subtract each row's group mean from its value, keeping one row per original row.",
          steps: [
            "agg gives one row per group, so it cannot be subtracted from the original frame directly.",
            "transform runs the same aggregation but broadcasts the result back to the group's rows.",
            "The output is index-aligned with df, so ordinary subtraction lines up correctly.",
            "This is the tabular twin of keepdims=True in a NumPy reduction — same problem, same fix.",
          ],
          answer: "df['v'] - df.groupby('k')['v'].transform('mean')",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "groupby drops NaN keys by default",
          text:
            "Rows whose grouping key is missing vanish from the result entirely, so the group sizes " +
            "can sum to less than len(df) with no error. Pass dropna=False to keep them as their own " +
            "group, and check the totals when the key comes from a join.",
        },
      ],
    },

    {
      heading: "merge: the row count is the thing to watch",
      blocks: [
        {
          kind: "table",
          headers: ["how=", "Keeps", "Row-count risk"],
          rows: [
            ["inner (default)", "Keys in both frames", "Silently drops non-matching rows"],
            ["left", "All left rows", "Unmatched right columns become NaN"],
            ["outer", "All keys from both", "NaN on both sides"],
            ["Any of them, duplicate keys", "Every matching pair", "Rows multiply — the many-to-many blow-up"],
          ],
        },
        {
          kind: "prose",
          text:
            "A join on a key that repeats on both sides produces the cross product within each key, " +
            "so three left rows and two right rows for the same key give six. Nothing warns you: the " +
            "frame is simply larger, and every subsequent sum is inflated. pandas will check the " +
            "assumption for you if you state it — pass validate='one_to_one' or 'one_to_many' and a " +
            "violated expectation raises instead of silently multiplying.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Check len(df) before and after every merge",
          text:
            "It is one line, it costs nothing, and it catches both failure modes at once — an inner " +
            "join that quietly dropped a third of the data, and a duplicate key that quietly doubled " +
            "it. indicator=True adds a column saying which side each row came from.",
        },
      ],
    },

    {
      heading: "Long and wide",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Long (tidy)", description: "One row per observation, with variable names in a column. What groupby, plotting, and modelling all want." },
            { term: "Wide", description: "One row per subject, with a column per variable or time point. What people want to read." },
            { term: "pivot / pivot_table", description: "Long to wide. pivot requires unique index/column pairs; pivot_table aggregates duplicates instead of raising." },
            { term: "melt", description: "Wide to long — the inverse. Column names become values in a variable column." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "pivot raises on duplicates; pivot_table averages them",
          text:
            "If two rows share the same index and column, pivot cannot decide which value belongs in " +
            "the cell and raises ValueError. pivot_table quietly applies its default aggfunc, 'mean'. " +
            "The exception is usually the more useful answer: it tells you the key you thought was " +
            "unique is not.",
        },
      ],
    },
  ],

  references: [
    { source: "pandas user guide", locator: "Group by: split-apply-combine; Merge, join, concatenate; Reshaping" },
    { source: "McKinney, Python for Data Analysis", locator: "Ch. 8, Data Wrangling; Ch. 10, Data Aggregation and Group Operations" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
