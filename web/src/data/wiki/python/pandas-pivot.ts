import type { WikiArticle } from "../types";

export const pandasPivotWiki: WikiArticle = {
  conceptId: "pandas-pivot",
  summary: "A pivot turns long data — one row per observation — into wide data, one row per subject and one column per category. pivot only reshapes and fails on duplicate index/column pairs; pivot_table aggregates them, which is why it is the one that usually works on real data. melt is the inverse.",

  sections: [
    {
      heading: "pivot, pivot_table, and melt",
      blocks: [
        {
          kind: "code",
          source: "long.pivot(index=\"date\", columns=\"region\", values=\"amount\")\n\nlong.pivot_table(\n    index=\"date\", columns=\"region\", values=\"amount\",\n    aggfunc=\"sum\", fill_value=0,\n)\n\nwide.melt(id_vars=\"date\", var_name=\"region\", value_name=\"amount\")\n\npd.crosstab(df[\"region\"], df[\"channel\"])            # counts\npd.crosstab(df[\"region\"], df[\"channel\"], normalize=\"index\")  # row proportions",
        },
        {
          kind: "table",
          headers: ["", "pivot", "pivot_table"],
          rows: [
            ["Duplicate index/column pair", "raises ValueError", "aggregated with aggfunc"],
            ["Default aggregation", "none — pure reshape", "mean"],
            ["Missing combinations", "NaN", "NaN, or fill_value"],
            ["Multiple value columns", "yes", "yes"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The duplicate error is information",
          text: "pivot raising on duplicates is telling you the data has more than one row per index/column pair — two sales for the same region on the same day. Switching to pivot_table answers 'what should happen to those two rows'; reaching for it without noticing means the question got answered as 'average them' by default.",
        },
      ],
    },
    {
      heading: "Long and wide are for different jobs",
      blocks: [
        {
          kind: "list",
          items: [
            "Long is what groupby, plotting libraries, and most statistical models want: one row per observation, variables in columns.",
            "Wide is what a human reads in a table and what a spreadsheet expects: one row per subject, one column per measurement.",
            "melt goes long, pivot goes wide, and a pipeline usually ends in one melt-pivot round trip near the report.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "Reshaping and pivot tables" },
    { source: "pandas API", locator: "pandas.crosstab" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
