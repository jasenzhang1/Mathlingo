import { useMemo } from "react";
import { splitMath } from "../../lib/wiki/inlineMath";
import { InlineMath } from "../wiki/Math";

const TYPESET_STYLE = { fontFamily: "KaTeX_Main, 'Times New Roman', serif", fontSize: "1.21em" } as const;

/**
 * Renders item text containing inline math delimited by single dollar signs
 * (`$p(1-p)$`) and inline code delimited by backticks (`` `a[-1]` ``).
 *
 * Shares its splitter with the wiki's `RichText` (`lib/wiki/inlineMath.ts`) so
 * a stem authored with the same `$...$`/`` `...` `` conventions renders the
 * same way whether it lives in a lesson or a question. `\$` and `` \` ``
 * escape literal characters, so prices and stray backticks still work.
 *
 * `typeset` sets the prose the way a LaTeX document would: in KaTeX_Main
 * (KaTeX's Computer Modern, already loaded for the math) at the same 1.21em
 * KaTeX renders inline math at, so words and formulas share one face and size
 * instead of a sans-serif sentence with slightly larger serif islands in it.
 */
export function CodeText({ text, typeset = false }: { text: string; typeset?: boolean }) {
  const parts = useMemo(() => splitMath(text), [text]);

  return (
    <>
      {parts.map((part, i) => {
        if (part.kind === "math") return <InlineMath key={i} latex={part.text} />;
        if (part.kind === "code") {
          return (
            <code
              key={i}
              className="rounded bg-[var(--paper)] px-1 py-0.5 font-mono text-[0.9em] text-[var(--ink)]"
            >
              {part.text}
            </code>
          );
        }
        return (
          <span key={i} style={typeset ? TYPESET_STYLE : undefined}>
            {part.text}
          </span>
        );
      })}
    </>
  );
}
