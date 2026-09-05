import type { WikiArticle } from "../types";

export const pandasDataframesWiki: WikiArticle = {
  conceptId: "pandas-dataframes",
  summary:
    "A Series is a NumPy array with labels; a DataFrame is a dict of Series sharing one index. The " +
    "index is not decoration — it is what makes alignment automatic, so adding two Series matches " +
    "them by label rather than by position. That single behaviour explains most of what surprises " +
    "people about pandas, including why .loc and .iloc are separate methods and why an operation " +
    "can produce NaNs out of two complete inputs.",

  sections: [
    {
      heading: "The index does the work",
      blocks: [
        {
          kind: "prose",
          text:
            "When two Series are combined, pandas takes the union of their indexes, lines the values " +
            "up by label, and fills anything unmatched with NaN. Nothing is matched by position. This " +
            "is the feature — it means a reindexed, filtered, or reordered Series still adds " +
            "correctly — and it is the trap, because two Series of the same length can add to " +
            "something longer than either.",
        },
        {
          kind: "example",
          title: "Two complete Series, an answer full of NaN",
          problem:
            "s1 has index ['a', 'b', 'c'] and s2 has index ['b', 'c', 'd']. Both have three values " +
            "and no missing data. What is s1 + s2?",
          steps: [
            "The result index is the union: ['a', 'b', 'c', 'd'] — four labels.",
            "'b' and 'c' appear in both, so those sum normally.",
            "'a' is missing from s2 and 'd' from s1; each becomes NaN.",
            "s1.add(s2, fill_value=0) treats a missing label as 0 instead.",
          ],
          answer:
            "A four-element Series with two real sums and two NaNs. Nothing was missing in the " +
            "inputs — the NaNs come from alignment, not from the data.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "df['col'] is a Series; df[['col']] is a DataFrame",
          text:
            "One set of brackets selects a column and gives you a 1-D Series. Two sets pass a list " +
            "of column names and give you a DataFrame with one column. Code that then calls .mean() " +
            "gets a scalar in the first case and a Series in the second.",
        },
      ],
    },

    {
      heading: ".loc and .iloc are not interchangeable",
      blocks: [
        {
          kind: "table",
          headers: ["", ".loc", ".iloc"],
          rows: [
            ["Selects by", "Label", "Integer position"],
            ["Slice endpoint", "Inclusive — df.loc['a':'c'] includes 'c'", "Exclusive, like every other Python slice"],
            ["Boolean mask", "Yes", "Only as a plain array, not a labelled Series"],
            ["On a default RangeIndex", "Looks identical to .iloc — until the frame is filtered or sorted", "Always positional"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The inclusive .loc slice is deliberate, and it catches everyone",
          text:
            "df.loc['2024-01':'2024-03'] includes March, because with labels there is no defined " +
            "\"one past the end\" to stop before. .iloc keeps the ordinary half-open rule. Mixing the " +
            "two conventions up shifts a range by exactly one row, which is precisely the error size " +
            "least likely to be noticed.",
        },
        {
          kind: "prose",
          text:
            "After filtering, the index keeps the original labels: rows 0, 4 and 9 of the source stay " +
            "labelled 0, 4 and 9. So .iloc[0] and .loc[0] now mean different rows, and .iloc[4] may " +
            "not exist at all. reset_index(drop=True) renumbers when you genuinely want positions.",
        },
      ],
    },

    {
      heading: "Views, copies, and SettingWithCopyWarning",
      blocks: [
        {
          kind: "prose",
          text:
            "Chained indexing — df[df.x > 0]['y'] = 1 — asks pandas for a subset and then writes to " +
            "it. Whether that write reaches the original frame depends on whether the subset was a " +
            "view or a copy, which pandas does not promise. The warning is telling you the assignment " +
            "may have gone nowhere. Do the selection in one .loc call, where the target is unambiguous.",
        },
        {
          kind: "code",
          source: "df[df.x > 0]['y'] = 1        # may silently do nothing\ndf.loc[df.x > 0, 'y'] = 1    # one indexing operation, always writes",
          caption: "One bracket pair, not two: the rule that makes the warning go away for the right reason.",
        },
        {
          kind: "definitions",
          items: [
            { term: "NaN", description: "Missing, not zero. It propagates through arithmetic and compares unequal to everything, including itself." },
            { term: "Skipped by default", description: "df.mean() and friends drop NaN, so a column's mean may be over fewer rows than len(df). Pass skipna=False to see it." },
            { term: "dtype object", description: "Usually means a column of strings, or of mixed types. Arithmetic on it falls back to slow per-element Python." },
            { term: "df.copy()", description: "An explicit deep copy. The cure for ambiguity about whether you hold a view." },
          ],
        },
      ],
    },
  ],

  references: [
    { source: "pandas user guide", locator: "Indexing and selecting data; Intro to data structures" },
    { source: "McKinney, Python for Data Analysis", locator: "Ch. 5, Getting Started with pandas" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
