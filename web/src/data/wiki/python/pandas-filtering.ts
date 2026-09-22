import type { WikiArticle } from "../types";

export const pandasFilteringWiki: WikiArticle = {
  conceptId: "pandas-filtering",
  summary: "Filtering is selection with a boolean Series. The mechanics are simple; the two things that trip people are the operators — & and | rather than and/or, with parentheses around each comparison — and remembering that a filtered frame is a view onto the same rows, keeping the original index.",

  sections: [
    {
      heading: "Masks and combining them",
      blocks: [
        {
          kind: "code",
          source: "df[df[\"amount\"] > 100]\ndf[(df[\"amount\"] > 100) & (df[\"region\"] == \"north\")]\ndf[df[\"region\"].isin([\"north\", \"south\"])]\ndf[~df[\"amount\"].isna()]\n\ndf.query(\"amount > 100 and region == 'north'\")",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "and/or raise; & and | need parentheses",
          text: "and and or try to reduce each Series to a single True or False and raise ValueError: The truth value of a Series is ambiguous. Their elementwise counterparts are & and |. Those bind tighter than the comparison operators, so df[\"a\"] > 1 & df[\"b\"] > 2 parses as df[\"a\"] > (1 & df[\"b\"]) > 2 — wrap every comparison in parentheses.",
        },
        {
          kind: "definitions",
          items: [
            { term: "isin(values)", description: "Membership against a collection — far clearer than chaining several == comparisons with |." },
            { term: "between(a, b)", description: "Inclusive on both ends by default; pass inclusive= to change that." },
            { term: "~mask", description: "Elementwise not. The Python keyword not has the same ambiguity problem as and/or." },
            { term: "query(expr)", description: "The mask written as a string. Avoids the parenthesis noise and can reference locals with @name, at the cost of losing editor and type checking." },
          ],
        },
      ],
    },
    {
      heading: "What comes back",
      blocks: [
        {
          kind: "prose",
          text: "A filtered frame keeps the original index labels, so the rows may be 0, 3, 7 rather than 0, 1, 2. That is usually a feature — you can trace a row back to the source — but it surprises code that then uses iloc or zips against a fresh range. reset_index(drop=True) renumbers when you genuinely want a standalone frame.",
        },
        {
          kind: "example",
          title: "Counting matches without materialising them",
          problem: "How many rows have amount over 100?",
          steps: [
            "len(df[df['amount'] > 100]) builds the filtered frame first.",
            "(df['amount'] > 100).sum() adds up the booleans directly — True counts as 1.",
            "Both give the same number; the second does not copy the rows.",
          ],
          answer: "Summing the mask is the idiomatic count.",
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "Boolean indexing" },
    { source: "pandas API", locator: "DataFrame.query" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
