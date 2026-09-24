import type { WikiArticle } from "../types";

export const pythonDatetimeWiki: WikiArticle = {
  conceptId: "python-datetime",
  summary: "date is a calendar day, time is a clock reading, datetime is both, and timedelta is the difference between two of them. Subtracting datetimes gives a timedelta; adding a timedelta gives a datetime. The persistent trap is the naive timestamp — one with no timezone — which compares fine with other naive ones and raises against aware ones.",

  sections: [
    {
      heading: "The four types",
      blocks: [
        {
          kind: "code",
          source: "from datetime import date, datetime, timedelta, timezone\n\ndate(2024, 3, 5)\ndatetime(2024, 3, 5, 14, 30)\ndatetime.now()                          # naive — no timezone attached\ndatetime.now(timezone.utc)              # aware\n\nlater = now + timedelta(days=7, hours=3)\ngap = later - now                       # a timedelta\ngap.days, gap.total_seconds()",
        },
        {
          kind: "definitions",
          items: [
            { term: "strptime", description: "Text to datetime, given a format: datetime.strptime(s, \"%Y-%m-%d\")." },
            { term: "strftime", description: "datetime to text, the other direction. The two names are easy to swap; the p is for parse." },
            { term: "isoformat / fromisoformat", description: "The round trip worth defaulting to — unambiguous, sortable as text, and no format string to get wrong." },
            { term: "timedelta.days", description: "Whole days only. A gap of 36 hours has .days == 1; total_seconds() is what you want for a real duration." },
          ],
        },
      ],
    },
    {
      heading: "Naive and aware",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Comparing naive with aware raises",
          text: "datetime.now() has no timezone; datetime.now(timezone.utc) does. Comparing or subtracting one from the other raises TypeError: can't compare offset-naive and offset-aware datetimes. Python refuses rather than guessing a zone, which is the right call and still a surprise.",
        },
        {
          kind: "prose",
          text: "The practical rule for anything that crosses a machine boundary: store and compute in UTC with aware datetimes, and convert to local time only at the edge where a human reads it. A naive timestamp is fine inside one process that never compares it with anything external — and that condition is easier to break than to keep.",
        },
        {
          kind: "example",
          title: "Why the nightly report shifted by an hour",
          problem: "A job bucketing events by day produced different totals after the clocks changed.",
          steps: [
            "The timestamps were naive and interpreted in the server's local zone.",
            "A daylight-saving transition moved local midnight relative to UTC.",
            "Events near midnight landed in a different bucket than before.",
          ],
          answer: "Bucket in UTC, or in a fixed named zone, and convert only for display.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§8.1 datetime" },
    { source: "Python Standard Library", locator: "strftime and strptime format codes" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
