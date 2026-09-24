import type { WikiArticle } from "../types";

export const pandasApplyWiki: WikiArticle = {
  conceptId: "pandas-apply",
  summary: "There are three ways to transform a column and they differ by an order of magnitude in speed. A vectorised expression operates on the whole array in compiled code. .map applies a Python function per element. .apply does the same on a Series, or per row/column on a DataFrame. Reach for the vectorised form first; apply is the escape hatch, not the default.",

  sections: [
    {
      heading: "The same transformation, three ways",
      blocks: [
        {
          kind: "code",
          source: "df[\"amount\"] * 1.2                      # vectorised — fastest\ndf[\"amount\"].map(lambda x: x * 1.2)      # a Python call per element\ndf[\"amount\"].apply(lambda x: x * 1.2)    # same, on a Series\n\ndf.apply(lambda row: row[\"a\"] + row[\"b\"], axis=1)   # per row — slowest\ndf[\"a\"] + df[\"b\"]                                   # the same thing, vectorised",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "axis is the axis being consumed",
          text: "df.apply(fn, axis=1) hands fn each row, because axis=1 is the column axis and it is the one collapsed to produce each call. The same reading explains df.sum(axis=1) giving row totals — which is the mnemonic worth keeping, since 'axis=1 means rows' and 'axis=1 means columns' are both said and both confusing.",
        },
      ],
    },
    {
      heading: "When apply is genuinely right",
      blocks: [
        {
          kind: "list",
          items: [
            "The operation has no vectorised equivalent — parsing a bespoke string format, calling an external service.",
            "The frame is small enough that clarity beats speed, and the vectorised version would be unreadable.",
            "np.where or np.select can express the branch instead: df['band'] = np.where(df['x'] > 0, 'pos', 'neg') beats an apply with an if.",
          ],
        },
        {
          kind: "definitions",
          items: [
            { term: "Series.map", description: "Elementwise. Also accepts a dict or Series as a lookup table, which is the neat way to recode labels." },
            { term: "Series.apply", description: "Elementwise too, but passes through extra args and is the one that accepts a ufunc." },
            { term: "DataFrame.apply", description: "Per column by default, per row with axis=1. The row form builds a Series per row and is the slow one." },
            { term: "DataFrame.map", description: "Elementwise across every cell — formerly applymap, which is what older code and tutorials call it." },
          ],
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "Function application" },
    { source: "pandas User Guide", locator: "Enhancing performance" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
