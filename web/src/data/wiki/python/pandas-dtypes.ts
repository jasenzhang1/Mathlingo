import type { WikiArticle } from "../types";

export const pandasDtypesWiki: WikiArticle = {
  conceptId: "pandas-dtypes",
  summary: "A column's dtype decides what operations are available and how much memory it costs. The dtype to be suspicious of is object, which usually means 'Python objects, probably strings' and is what you get when a numeric column contains one stray value that would not parse. Converting with astype is strict; to_numeric with errors='coerce' is the forgiving version.",

  sections: [
    {
      heading: "Seeing and changing types",
      blocks: [
        {
          kind: "code",
          source: "df.dtypes                      # per column\ndf.info()                      # dtypes, non-null counts, memory\n\ndf[\"n\"].astype(int)            # strict: raises on anything that will not convert\npd.to_numeric(df[\"n\"], errors=\"coerce\")   # unparseable values become NaN\ndf[\"flag\"].astype(bool)\ndf[\"when\"] = pd.to_datetime(df[\"when\"])",
        },
        {
          kind: "table",
          headers: ["dtype", "Holds", "Note"],
          rows: [
            ["int64", "whole numbers", "cannot hold NaN"],
            ["float64", "reals", "NaN lives here"],
            ["bool", "True/False", "cannot hold NaN"],
            ["object", "arbitrary Python objects", "usually strings; the catch-all"],
            ["category", "a fixed set of labels", "large memory win, ordered comparisons possible"],
            ["datetime64[ns]", "timestamps", "required for .dt and resample"],
            ["Int64", "whole numbers or missing", "nullable; note the capital I"],
          ],
        },
      ],
    },
    {
      heading: "Why category is worth reaching for",
      blocks: [
        {
          kind: "prose",
          text: "A category column stores each distinct label once and keeps an array of small integer codes. For a column of a million rows drawn from five regions, that is a large memory saving and faster groupby. It also lets you declare an order — small < medium < large — so comparisons and sorting follow the meaning rather than the alphabet.",
        },
        {
          kind: "code",
          source: "df[\"region\"] = df[\"region\"].astype(\"category\")\n\nsizes = pd.CategoricalDtype([\"small\", \"medium\", \"large\"], ordered=True)\ndf[\"size\"] = df[\"size\"].astype(sizes)\ndf[df[\"size\"] > \"small\"]      # meaningful now",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Assigning an unseen category gives NaN",
          text: "A categorical only accepts labels in its category list. Writing a new label into one produces NaN rather than an error in some paths, so add it with .cat.add_categories first.",
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "Essential basic functionality — dtypes" },
    { source: "pandas User Guide", locator: "Categorical data" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
