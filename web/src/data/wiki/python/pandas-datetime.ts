import type { WikiArticle } from "../types";

export const pandasDatetimeWiki: WikiArticle = {
  conceptId: "pandas-datetime",
  summary: "A datetime64 column unlocks a whole vocabulary: the .dt accessor for components, comparison against date strings, and — once it is the index — resampling to any frequency. Getting there is one call to to_datetime, and skipping it is why so much time-series code is doing string comparisons that only accidentally work.",

  sections: [
    {
      heading: "Parsing and components",
      blocks: [
        {
          kind: "code",
          source: "df[\"when\"] = pd.to_datetime(df[\"when\"])\npd.to_datetime(df[\"when\"], format=\"%d/%m/%Y\")   # explicit is faster and safer\npd.to_datetime(df[\"when\"], errors=\"coerce\")      # unparseable becomes NaT\n\ndf[\"when\"].dt.year\ndf[\"when\"].dt.month\ndf[\"when\"].dt.day_name()\ndf[\"when\"].dt.dayofweek        # Monday is 0\n\ndf[df[\"when\"] > \"2024-01-01\"]  # string compares against a datetime column",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Ambiguous day/month order",
          text: "01/02/2024 is January 2nd in the United States and February 1st nearly everywhere else. Inference guesses per file and can guess differently for two files in the same pipeline. Passing format= removes the guess entirely, and is substantially faster on large columns.",
        },
      ],
    },
    {
      heading: "Resampling",
      blocks: [
        {
          kind: "code",
          source: "ts = df.set_index(\"when\")\n\nts[\"amount\"].resample(\"D\").sum()      # daily totals\nts[\"amount\"].resample(\"ME\").mean()    # month-end averages\nts.loc[\"2024-03\"]                     # a whole month, by partial string",
        },
        {
          kind: "prose",
          text: "resample is groupby for time: it buckets rows by a calendar frequency and aggregates each bucket. It requires a DatetimeIndex, which is the practical reason to set_index on the time column. Unlike groupby it emits empty buckets too, so a day with no rows appears as 0 or NaN rather than vanishing — which is exactly what you want in a chart.",
        },
        {
          kind: "definitions",
          items: [
            { term: "NaT", description: "Not-a-Time — the datetime equivalent of NaN, and detected by the same isna()." },
            { term: "Timedelta", description: "The result of subtracting two datetimes; .dt.days pulls the whole days out." },
            { term: "tz-aware vs naive", description: "Comparing an aware timestamp with a naive one raises. Pick one convention per pipeline and convert at the boundary." },
          ],
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "Time series / date functionality" },
    { source: "pandas API", locator: "pandas.to_datetime" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
