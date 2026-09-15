/**
 * Splits item text into prose and inline-code segments, `` `like this` ``.
 *
 * Mirrors `splitMath` (`lib/wiki/inlineMath.ts`) but for backtick-delimited
 * code rather than dollar-delimited LaTeX — the two live in separate modules
 * because assessment stems need code spans and wiki prose needs maths, and
 * neither domain currently needs the other's delimiter.
 */

export interface CodeSegment {
  text: string;
  code: boolean;
}

export function splitCode(text: string): CodeSegment[] {
  const segments: CodeSegment[] = [];
  let buffer = "";
  let index = 0;

  while (index < text.length) {
    const char = text[index]!;

    // \` is a literal backtick, so prose about the character itself survives.
    if (char === "\\" && text[index + 1] === "`") {
      buffer += "`";
      index += 2;
      continue;
    }

    if (char === "`") {
      const end = text.indexOf("`", index + 1);

      // An unclosed delimiter is far more likely to be a stray backtick than
      // a span running to the end of the sentence, so treat it as text rather
      // than swallowing the rest of the stem into code.
      if (end === -1) {
        buffer += text.slice(index);
        break;
      }

      if (buffer) segments.push({ text: buffer, code: false });
      buffer = "";
      segments.push({ text: text.slice(index + 1, end), code: true });
      index = end + 1;
      continue;
    }

    buffer += char;
    index++;
  }

  if (buffer) segments.push({ text: buffer, code: false });
  return segments;
}
