/**
 * Splits prose into text and inline-maths segments, `$like this$`.
 *
 * Kept as a pure module, separate from the React component that renders it, so
 * it can be unit-tested in Node — the component pulls in KaTeX's stylesheet,
 * which a Node test runner cannot import.
 */

export interface Segment {
  text: string;
  math: boolean;
}

export function splitMath(text: string): Segment[] {
  const segments: Segment[] = [];
  let buffer = "";
  let index = 0;

  while (index < text.length) {
    const char = text[index]!;

    // \$ is a literal dollar sign, so currency survives.
    if (char === "\\" && text[index + 1] === "$") {
      buffer += "$";
      index += 2;
      continue;
    }

    if (char === "$") {
      let end = index + 1;
      while (end < text.length && !(text[end] === "$" && text[end - 1] !== "\\")) end++;

      // An unclosed delimiter is far more likely to be a stray dollar sign than
      // a formula running to the end of the paragraph, so treat it as text
      // rather than swallowing the rest of the sentence into maths.
      if (end >= text.length) {
        buffer += text.slice(index);
        break;
      }

      if (buffer) segments.push({ text: buffer, math: false });
      buffer = "";
      segments.push({ text: text.slice(index + 1, end), math: true });
      index = end + 1;
      continue;
    }

    buffer += char;
    index++;
  }

  if (buffer) segments.push({ text: buffer, math: false });
  return segments;
}
