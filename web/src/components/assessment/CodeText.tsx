import { useMemo } from "react";
import { splitCode } from "../../lib/assessment/inlineCode";

/**
 * Renders item text containing inline code delimited by single backticks.
 *
 * Authoring a stem as `` `a[-1]` evaluates to `` keeps the source readable
 * and tells the learner, visually, that what follows is code rather than
 * prose — important in this domain, where distractors often hinge on a
 * single character (`a.sort()` vs `sorted(a)`). A `\`` escapes a literal
 * backtick.
 */
export function CodeText({ text }: { text: string }) {
  const parts = useMemo(() => splitCode(text), [text]);

  return (
    <>
      {parts.map((part, i) =>
        part.code ? (
          <code
            key={i}
            className="rounded bg-[var(--paper)] px-1 py-0.5 font-mono text-[0.9em] text-[var(--ink)]"
          >
            {part.text}
          </code>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}
