# Wiki article template

File: `web/src/data/wiki/<area>/<concept-id>.ts`. Export name: camelCase id + `Wiki`.

```ts
import type { WikiArticle } from "../types";

export const conceptIdWiki: WikiArticle = {
  conceptId: "concept-id",

  summary:
    "One paragraph: what the idea is, why it matters, and the one-sentence intuition. " +
    "Inline math in $…$.",

  sections: [
    {
      heading: "Definition",            // or "The algorithm", "The condition", …
      blocks: [
        { kind: "formula", latex: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}", caption: "What the formula is" },
        { kind: "prose", text: "Explain each piece in words." },
        {
          kind: "definitions",
          items: [{ term: "Term", description: "Meaning, with $math$." }],
        },
      ],
    },
    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "Short title",
          problem: "State the problem with concrete numbers.",
          steps: ["Step 1 …", "Step 2 …"],
          answer: "The answer, plus what it shows.",
        },
      ],
    },
    {
      heading: "Pitfalls and connections",
      blocks: [
        { kind: "callout", tone: "warning", title: "A common mistake", text: "…" },
        { kind: "callout", tone: "insight", title: "Where this leads", text: "Link to the next lessons." },
        { kind: "table", headers: ["Case", "Result"], rows: [["…", "…"]] },
        { kind: "list", items: ["…", "…"] },        // ordered: true for algorithms
      ],
    },
  ],

  references: [
    { source: "Author, Book Title", locator: "Ch. N, Chapter Name (§N.M)" },
  ],
};
```

Block kinds: `prose`, `formula`, `code` (verbatim source; don't put code in `formula`), `definitions`, `example`, `callout`, `table`, `list`.

Guidance:

- 3–4 sections; the structure should follow the idea, not a fixed list.
- Every number in a worked example must be recomputed before it lands.
- `formula.latex` is display math rendered by KaTeX; everything else uses inline `$…$`.
- Register the export in the area's `index.ts` array, in teaching order.
