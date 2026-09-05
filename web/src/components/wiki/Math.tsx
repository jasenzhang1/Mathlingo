import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";
import { splitMath } from "../../lib/wiki/inlineMath";

/**
 * LaTeX rendering for wiki content.
 *
 * Mathematics written as `p^k(1-p)^(n-k)` is readable to someone who already
 * knows the formula and noise to someone learning it — the exponents are the
 * whole point and plain text puts them inline with the base. KaTeX renders it
 * properly and synchronously, which matters here: MathJax's async typesetting
 * makes every formula visibly reflow after paint.
 *
 * `throwOnError: false` means a malformed expression renders in red rather than
 * blanking the page. An article with one broken formula is still worth reading,
 * and the red is a legible bug report.
 */

export function BlockMath({ latex }: { latex: string }) {
  const html = useMemo(
    () =>
      katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
        errorColor: "#c0392b",
        strict: false,
      }),
    [latex],
  );

  return (
    <div
      className="overflow-x-auto py-1 text-[var(--ink)]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function InlineMath({ latex }: { latex: string }) {
  const html = useMemo(
    () =>
      katex.renderToString(latex, {
        displayMode: false,
        throwOnError: false,
        errorColor: "#c0392b",
        strict: false,
      }),
    [latex],
  );

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Renders prose containing inline math delimited by single dollar signs.
 *
 * Authoring maths inside sentences as `$np(1-p)$` keeps the article source
 * readable, which matters when there are hundreds of them to write and review.
 * A `\$` escapes a literal dollar sign, so prices and currency still work.
 */
export function RichText({ text }: { text: string }) {
  const parts = useMemo(() => splitMath(text), [text]);

  return (
    <>
      {parts.map((part, i) =>
        part.math ? (
          <InlineMath key={i} latex={part.text} />
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}
