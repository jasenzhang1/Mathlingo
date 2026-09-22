import type { WikiArticle } from "../types";

export const pandasSortingWiki: WikiArticle = {
  conceptId: "pandas-sorting",
  summary: "sort_values orders rows by one or more columns; sort_index orders by the index. Both return a new frame unless you pass inplace. Missing values go last by default regardless of direction, which is worth knowing before you take the top ten of anything. nlargest is the shortcut for exactly that, and does less work than sorting the whole frame.",

  sections: [
    {
      heading: "Ordering rows",
      blocks: [
        {
          kind: "code",
          source: "df.sort_values(\"amount\")\ndf.sort_values(\"amount\", ascending=False)\ndf.sort_values([\"region\", \"amount\"], ascending=[True, False])\ndf.sort_values(\"amount\", na_position=\"first\")\n\ndf.nlargest(10, \"amount\")     # cheaper than sorting everything\ndf.sort_index()",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Sorting does not renumber the index",
          text: "After sort_values the rows are in a new order but keep their original labels, so the index reads 7, 2, 5. Anything downstream that assumes positional labels needs reset_index(drop=True). Forgetting this is how a sorted frame silently realigns when you assign a column into it, since assignment aligns on the index, not on position.",
        },
      ],
    },
    {
      heading: "Ranking",
      blocks: [
        {
          kind: "code",
          source: "df[\"rank\"] = df[\"amount\"].rank(ascending=False)\ndf[\"rank\"] = df[\"amount\"].rank(method=\"min\", ascending=False)\ndf[\"pct\"] = df[\"amount\"].rank(pct=True)",
        },
        {
          kind: "definitions",
          items: [
            { term: "method='average'", description: "The default. Tied values all receive the mean of the positions they span, so ranks can be 1.5." },
            { term: "method='min'", description: "Competition ranking: two firsts, then third. This is what most leaderboards mean." },
            { term: "method='dense'", description: "Like min but without gaps: two firsts, then second." },
            { term: "method='first'", description: "Breaks ties by order of appearance, giving integer ranks with no duplicates." },
          ],
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "Sorting" },
    { source: "pandas API", locator: "DataFrame.rank" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
