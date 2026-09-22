import type { WikiArticle } from "../types";

export const pandasSelectionWiki: WikiArticle = {
  conceptId: "pandas-selection",
  summary: "df[...] is convenient and ambiguous; loc and iloc are explicit and worth the extra characters. loc selects by label and includes the endpoint of a slice; iloc selects by position and excludes it, like every other Python slice. Both take a row selector and an optional column selector, which is what makes them able to assign safely where chained brackets cannot.",

  sections: [
    {
      heading: "loc, iloc, and plain brackets",
      blocks: [
        {
          kind: "code",
          source: "df[\"amount\"]          # one column, as a Series\ndf[[\"a\", \"b\"]]        # two columns, as a DataFrame\ndf[0:3]               # rows by position — brackets mean rows for a slice\n\ndf.loc[3, \"amount\"]           # row label 3, column \"amount\"\ndf.loc[:, \"a\":\"c\"]            # all rows, columns a through c INCLUSIVE\ndf.iloc[0, 2]                 # first row, third column, by position\ndf.iloc[0:3]                  # first three rows, endpoint EXCLUDED",
        },
        {
          kind: "table",
          headers: ["", "loc", "iloc"],
          rows: [
            ["Selects by", "label", "integer position"],
            ["Slice endpoint", "included", "excluded"],
            ["Boolean mask", "yes", "only as a raw array"],
            ["Safe to assign through", "yes", "yes"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A label can be an integer",
          text: "If the index is 10, 20, 30 then df.loc[10] is the first row and df.iloc[10] is out of bounds. An integer index is where confusing the two stops being harmless — this is the argument for always saying which one you mean.",
        },
      ],
    },
    {
      heading: "Chained indexing and SettingWithCopyWarning",
      blocks: [
        {
          kind: "code",
          source: "df[df[\"amount\"] > 100][\"flag\"] = True   # may silently do nothing\n\ndf.loc[df[\"amount\"] > 100, \"flag\"] = True   # one operation, always works",
        },
        {
          kind: "prose",
          text: "The first line is two operations. df[mask] produces something pandas may treat as a copy, and the assignment then lands on that temporary rather than on df. Whether it works depends on memory layout, which is why the symptom is intermittent and the warning is worded so cautiously. The single-call .loc form has no intermediate object to lose the write to.",
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "Indexing and selecting data" },
    { source: "pandas User Guide", locator: "Returning a view versus a copy" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
