import type { WikiArticle } from "../types";

export const pandasIoWiki: WikiArticle = {
  conceptId: "pandas-io",
  summary: "Almost every analysis starts with read_csv, and a surprising share of analysis bugs start there too. The defaults are good but not psychic: pandas infers dtypes from the data it sees, treats a fixed list of strings as missing, and will happily read an ID column of zero-padded digits as integers and destroy the padding. Being explicit at read time is far cheaper than repairing a frame afterwards.",

  sections: [
    {
      heading: "read_csv and the arguments worth knowing",
      blocks: [
        {
          kind: "code",
          source: "import pandas as pd\n\ndf = pd.read_csv(\"sales.csv\")\n\ndf = pd.read_csv(\n    \"sales.csv\",\n    usecols=[\"date\", \"region\", \"amount\"],  # read only what you need\n    dtype={\"zip\": str},                     # keep the leading zeros\n    parse_dates=[\"date\"],                   # real timestamps, not strings\n    na_values=[\"\", \"NA\", \"missing\"],        # what counts as absent here\n)",
        },
        {
          kind: "table",
          headers: ["Argument", "What it fixes"],
          rows: [
            ["dtype", "Stops inference from turning IDs into ints or mixing types in one column."],
            ["parse_dates", "Gives a datetime64 column, so .dt and resampling work at all."],
            ["usecols", "Reads fewer columns — often the single biggest memory win."],
            ["na_values", "Declares the sentinels this file actually uses for missing."],
            ["index_col", "Sets the index at read time instead of a separate set_index."],
            ["nrows", "Reads a sample first, so you can inspect before committing to the full file."],
          ],
        },
      ],
    },
    {
      heading: "Writing back out",
      blocks: [
        {
          kind: "code",
          source: "df.to_csv(\"out.csv\", index=False)   # index=False is nearly always what you want\ndf.to_parquet(\"out.parquet\")        # keeps dtypes; CSV does not",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "to_csv writes the index by default",
          text: "Without index=False you get a nameless first column of 0, 1, 2, … Read that file back and it becomes a real column called \"Unnamed: 0\". Round-tripping a frame through CSV a few times this way accumulates one such column per trip.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "CSV has no types",
          text: "A CSV stores text. Every dtype you carefully set is inferred again on the next read, which is why a pipeline that writes intermediate CSVs keeps rediscovering the same dtype problems. Parquet stores the schema alongside the data and skips the whole class of bug.",
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "IO tools — read_csv, to_csv" },
    { source: "pandas API", locator: "pandas.read_csv" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
