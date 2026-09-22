import type { WikiArticle } from "../types";

export const pandasWindowWiki: WikiArticle = {
  conceptId: "pandas-window",
  summary: "Window operations compute a value from a span of neighbouring rows rather than from one row. rolling takes a fixed-width window, expanding grows from the start, and the cum* family is the shorthand for the common expanding cases. All of them depend on the row order, so sorting first is part of the operation, not a preliminary.",

  sections: [
    {
      heading: "Rolling, expanding, cumulative",
      blocks: [
        {
          kind: "code",
          source: "s.rolling(7).mean()                    # 7-row moving average\ns.rolling(7, min_periods=1).mean()     # emit from the first row instead of NaN\ns.rolling(\"7D\").sum()                  # 7 calendar days, needs a DatetimeIndex\n\ns.expanding().mean()                   # mean of everything so far\ns.cumsum()\ns.cummax()",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The first n-1 rows are NaN",
          text: "A window of 7 has no complete window until the seventh row, so the first six results are NaN by default. That is honest — there genuinely is not a week of history yet — and min_periods is how you say a partial window is acceptable. Dropping those NaNs without deciding is how a chart quietly starts a week late.",
        },
      ],
    },
    {
      heading: "shift, diff, and looking backwards",
      blocks: [
        {
          kind: "code",
          source: "s.shift(1)                     # yesterday's value on today's row\ns.diff()                       # s - s.shift(1)\ns.pct_change()\n\ndf.groupby(\"region\")[\"amount\"].rolling(3).mean()   # per group\ndf.groupby(\"region\")[\"amount\"].shift(1)            # no leakage across groups",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "shift is what keeps a feature honest",
          text: "In any predictive setting, a rolling statistic that includes the current row has used the answer to compute the input. Shifting by one before the window — or after it — is the difference between a feature and a leak, and it is invisible in the numbers until the model meets real data.",
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "Windowing operations" },
    { source: "pandas API", locator: "DataFrame.rolling" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
