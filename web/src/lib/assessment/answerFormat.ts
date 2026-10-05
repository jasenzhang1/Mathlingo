import type { Item } from "./types";

/**
 * What a numeric answer box should look like, so the learner can see the
 * expected format before typing: a label such as "$k$ =" in front of the box
 * when the question asks for one named unknown, and a faint placeholder whose
 * shape is the format wanted — "12" for a whole number, "1.23" for two
 * decimal places.
 *
 * Read off the stem rather than authored per item, so the whole bank gets it.
 * An item can still set `answerLabel` explicitly. The placeholder never shows
 * the actual key: its digits are a fixed pattern, nudged if they collide.
 */
export interface NumericAnswerFormat {
  /** LaTeX-in-$…$ text shown before the box, e.g. "$k$ =". */
  label?: string;
  placeholder: string;
  hint: string;
}

const WORD_DECIMALS: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5 };
const NEAREST: [RegExp, number][] = [
  [/nearest (?:whole number|integer)/, 0],
  [/nearest tenth/, 1],
  [/nearest hundredth/, 2],
  [/nearest thousandth/, 3],
  [/nearest ten-thousandth/, 4],
];

/** Decimal places the stem asks for, or undefined if it doesn't say. */
export function requestedDecimals(stem: string): number | undefined {
  const plain = stem.replace(/\$/g, "").toLowerCase();
  const places = /\b(\d+|one|two|three|four|five)\s+decimal places?\b/.exec(plain);
  if (places) return WORD_DECIMALS[places[1]] ?? Number(places[1]);
  if (/\bone decimal\b/.test(plain)) return 1;
  for (const [pattern, n] of NEAREST) if (pattern.test(plain)) return n;
  return undefined;
}

/**
 * The unknown the question asks for, when it names exactly one: "For which $k$…",
 * "Find $x$…", "Solve for $t$", "For what constant $c$…".
 */
export function askedUnknown(stem: string): string | undefined {
  const match =
    /\b(?:for which|for what(?: value of| values of| constant| number)?|what value of|what is the value of|find(?: the value of| the constant)?|solve for|determine(?: the value of)?)\s+\$([A-Za-z](?:_\{?[A-Za-z0-9]+\}?)?)\$/i.exec(
      stem,
    );
  return match?.[1];
}

function samplePattern(decimals: number, key: number): string {
  const make = (lead: string) => (decimals === 0 ? lead : `${lead[0]}.${"23456789".slice(0, decimals)}`);
  let sample = make("12");
  // Never let the format example be the answer itself.
  if (Number.isFinite(key) && Math.abs(Number(sample) - key) < 1e-9) sample = make("34");
  return sample;
}

export function numericAnswerFormat(item: Item): NumericAnswerFormat {
  const key = typeof item.answerKey === "number" ? item.answerKey : Number(item.answerKey);
  const unknown = item.answerLabel ? undefined : askedUnknown(item.stem);
  const label = item.answerLabel ?? (unknown ? `$${unknown}$ =` : undefined);

  const decimals = requestedDecimals(item.stem);
  if (decimals !== undefined) {
    return {
      label,
      placeholder: samplePattern(decimals, key),
      hint:
        decimals === 0
          ? "Round to the nearest whole number."
          : `Round to ${decimals} decimal place${decimals === 1 ? "" : "s"}, like the gray example.`,
    };
  }
  if (Number.isInteger(key)) {
    return { label, placeholder: samplePattern(0, key), hint: "The answer is a whole number." };
  }
  return {
    label,
    placeholder: "e.g. 0.4545, 45%, or 5/11",
    hint: "Decimals, percentages, and fractions are all accepted.",
  };
}
