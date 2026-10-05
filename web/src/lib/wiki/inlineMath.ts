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

export interface EmphasisRun {
  style: "plain" | "em" | "strong";
  segments: Segment[];
}

const EMPHASIS =
  /(?<![\p{L}\p{N})\]}*])(?:\*\*(?=\S)([\s\S]*?\S)\*\*|\*(?=[^\s*])([^*]*?[^\s*])\*)(?![\p{L}\p{N}*])/gu;

/**
 * Groups segments into runs of plain, `*emphasised*` and `**strong**` prose.
 *
 * Maths and code are masked out before matching, so a star inside them
 * (`$Q^*$`, `` `*args` ``) is never a delimiter, while an emphasised phrase may
 * still contain them (`*the $x$ value*`). A delimiter must hug its text and
 * sit at a word boundary, so `2 * 3 * 4`, starred notation such as `m*` or
 * `K**`, and a lone footnote `*` all stay literal.
 */
export function splitEmphasis(segments: Segment[]): EmphasisRun[] {
  const masked = segments
    .map((s, i) => (s.kind === "text" ? s.text : `${i}`))
    .join("");

  const restore = (chunk: string): Segment[] => {
    const out: Segment[] = [];
    for (const [j, piece] of chunk.split(/(\d+)/).entries()) {
      if (j % 2 === 1) out.push(segments[Number(piece)]!);
      else if (piece) out.push({ text: piece, kind: "text" });
    }
    return out;
  };

  const runs: EmphasisRun[] = [];
  let last = 0;
  for (const match of masked.matchAll(EMPHASIS)) {
    const start = match.index ?? 0;
    if (start > last) runs.push({ style: "plain", segments: restore(masked.slice(last, start)) });
    runs.push(
      match[1] !== undefined
        ? { style: "strong", segments: restore(match[1]) }
        : { style: "em", segments: restore(match[2]!) },
    );
    last = start + match[0].length;
  }
  if (last < masked.length) runs.push({ style: "plain", segments: restore(masked.slice(last)) });
  return runs;
}
