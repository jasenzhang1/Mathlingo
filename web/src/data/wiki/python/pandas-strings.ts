import type { WikiArticle } from "../types";

export const pandasStringsWiki: WikiArticle = {
  conceptId: "pandas-strings",
  summary: "The .str accessor applies string methods down a Series without a Python-level loop. The methods mirror the built-in string methods, with two differences worth internalising: missing values stay missing rather than raising, and several methods can return a DataFrame rather than a Series.",

  sections: [
    {
      heading: "Vectorised string work",
      blocks: [
        {
          kind: "code",
          source: "s.str.lower()\ns.str.strip()\ns.str.replace(\"-\", \"_\", regex=False)\ns.str.contains(\"north\", case=False, na=False)\ns.str.startswith(\"A\")\ns.str.len()\ns.str[0:3]                       # slicing works too\n\ns.str.split(\"-\")                  # a Series of lists\ns.str.split(\"-\", expand=True)     # a DataFrame, one column per piece\ns.str.extract(r\"(\\d+)\")           # capture groups become columns",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A NaN in a boolean mask is not False",
          text: "s.str.contains(\"x\") returns NaN wherever the value was missing, and a mask containing NaN raises when used to index. Passing na=False makes missing values count as non-matching, which is nearly always what a filter wants.",
        },
      ],
    },
    {
      heading: "Regex on by default, sometimes",
      blocks: [
        {
          kind: "prose",
          text: "str.contains and str.extract treat the pattern as a regular expression. str.replace switched to requiring regex to be stated explicitly, because silently treating \".\" as 'any character' when the caller meant a literal dot caused real damage. Say regex=True or regex=False and the code stops depending on which pandas version is installed.",
        },
        {
          kind: "example",
          title: "Splitting a name column into two",
          problem: "A \"name\" column holds \"Ada Lovelace\". You want first and last as separate columns.",
          steps: [
            "parts = df[\"name\"].str.split(\" \", n=1, expand=True)",
            "df[\"first\"] = parts[0] and df[\"last\"] = parts[1]",
            "n=1 limits the split, so a middle name stays attached to the last rather than creating a third column that misaligns everything.",
          ],
          answer: "expand=True is what turns the Series of lists into assignable columns.",
        },
      ],
    },
  ],

  references: [
    { source: "pandas User Guide", locator: "Working with text data" },
    { source: "pandas API", locator: "Series.str" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
