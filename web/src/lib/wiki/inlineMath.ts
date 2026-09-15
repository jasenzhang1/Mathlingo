/**
 * Splits prose into text, inline-maths (`$like this$`), and inline-code
 * (`` `like this` ``) segments.
 *
 * Kept as a pure module, separate from the React component that renders it, so
 * it can be unit-tested in Node — the component pulls in KaTeX's stylesheet,
 * which a Node test runner cannot import.
 */

export interface Segment {
  text: string;
  kind: "text" | "math" | "code";
}

const DELIMITERS: Record<"$" | "`", Segment["kind"]> = {
  $: "math",
  "`": "code",
};

export function splitMath(text: string): Segment[] {
  const segments: Segment[] = [];
  let buffer = "";
  let index = 0;

  while (index < text.length) {
    const char = text[index]!;

    // \$ and \` are literal characters, so currency and shell backticks survive.
    if (char === "\\" && (text[index + 1] === "$" || text[index + 1] === "`")) {
      buffer += text[index + 1];
      index += 2;
      continue;
    }

    if (char === "$" || char === "`") {
      const kind = DELIMITERS[char];
      let end = index + 1;
      while (end < text.length && !(text[end] === char && text[end - 1] !== "\\")) end++;

      // An unclosed delimiter is far more likely to be a stray character than
      // one running to the end of the paragraph, so treat it as text rather
      // than swallowing the rest of the sentence.
      if (end >= text.length) {
        buffer += text.slice(index);
        break;
      }

      if (buffer) segments.push({ text: buffer, kind: "text" });
      buffer = "";
      segments.push({ text: text.slice(index + 1, end), kind });
      index = end + 1;
      continue;
    }

    buffer += char;
    index++;
  }

  if (buffer) segments.push({ text: buffer, kind: "text" });
  return segments;
}
