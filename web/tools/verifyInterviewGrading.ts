/**
 * Checks the interview auto-grader: the five-decimal numeric rule, the
 * "more places, please" prompt, and formula answers read at sample points.
 *
 *   npm run verify:interview
 */
import { readFileSync } from "node:fs";
import { evaluate, variablesOf } from "../src/lib/interview/evaluate";
import { autoGrade, expressionMatches } from "../src/lib/interview/scoring";
import type { InterviewQuestion } from "../src/lib/interview/types";

const questions = JSON.parse(readFileSync("src/data/interview/questions.json", "utf8")) as InterviewQuestion[];
const byId = new Map(questions.map((q) => [q.id, q]));
let failures = 0;

function expect(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) failures++;
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label}: got ${JSON.stringify(got)}${ok ? "" : `, want ${JSON.stringify(want)}`}`);
}
const kind = (id: string, input: string) => autoGrade(byId.get(id)!, input).kind;

console.log("numeric — five decimal places or exact");
// iq-0038: ln(2)/2 = 0.346573590…
expect("exact form ln(2)/2", kind("iq-0038", "ln(2)/2"), "correct");
expect("5 places 0.34657", kind("iq-0038", "0.34657"), "correct");
expect("5 places, wrong last digit 0.34659", kind("iq-0038", "0.34659"), "incorrect");
expect("3 places 0.347 asks for more", kind("iq-0038", "0.347"), "imprecise");
expect("2 places, right as far as it goes 0.35", kind("iq-0038", "0.35"), "imprecise");
expect("2 places, wrong 0.34", kind("iq-0038", "0.34"), "incorrect");
// iq-0004: 3/4
expect("exact decimal 0.75", kind("iq-0004", "0.75"), "correct");
expect("fraction 3/4", kind("iq-0004", "3/4"), "correct");
// iq-0006: 217/2592 = 8.3719…%, a percentage key
expect("percent 8.37191%", kind("iq-0006", "8.37191%"), "correct");
expect("percent without sign 8.37191", kind("iq-0006", "8.37191"), "correct");
expect("percent 8.4% asks for more", kind("iq-0006", "8.4%"), "imprecise");
expect("fraction 217/2592", kind("iq-0006", "217/2592"), "correct");
// A question that asks for 3 places (iq-1211: sqrt 5)
expect("stated precision 2.236", kind("iq-1211", "2.236"), "correct");
expect("stated precision, 5 places 2.23607", kind("iq-1211", "2.23607"), "correct");
// Integer keys
expect("integer 252 as C(10,5)", kind(questions.find((q) => q.numericAnswer === 252)!.id, "C(10,5)"), "correct");

console.log("\nformula answers");
expect("iq-0317 [(n+1)/n]^(n-1)", kind("iq-0317", "[(n+1)/n]^(n-1)"), "correct");
expect("iq-0317 (1+1/n)^(n-1)", kind("iq-0317", "(1+1/n)^(n-1)"), "correct");
expect("iq-0317 ((n+1)^(n-1))/n^(n-1)", kind("iq-0317", "((n+1)^(n-1))/n^(n-1)"), "correct");
expect("iq-0317 wrong exponent (1+1/n)^n", kind("iq-0317", "(1+1/n)^n"), "incorrect");
expect("iq-0317 unreadable", kind("iq-0317", "about e"), "unparsed");
expect("iq-0215 n(n-1)/4", kind("iq-0215", "n(n-1)/4"), "correct");
expect("iq-0215 (n^2-n)/4", kind("iq-0215", "(n^2-n)/4"), "correct");
expect("iq-0215 n^2/4", kind("iq-0215", "n^2/4"), "incorrect");
expect("iq-0131 C(n,2)/3 - n/3", kind("iq-0131", "C(n,2)/3 - n/3"), "correct");
expect("iq-0131 n(n-3)/6", kind("iq-0131", "n(n-3)/6"), "correct");
expect("iq-0189 1/(2-p)", kind("iq-0189", "1/(2-p)"), "correct");
expect("iq-0941 1+p/q", kind("iq-0941", "1+p/q"), "correct");
expect("iq-0263 f(x) = 2x", kind("iq-0263", "f(x) = 2x"), "correct");
expect("iq-0899 m^2 (1-1/m)^m", kind("iq-0899", "m^2 (1-1/m)^m"), "correct");
expect("iq-0975 pi/4 (1-pi/4)/N", kind("iq-0975", "pi/4 (1-pi/4)/N"), "correct");
expect("iq-0148 2N/2^N", kind("iq-0148", "2N/2^N"), "correct");

console.log("\nevery formula key is readable and self-consistent");
for (const q of questions) {
  if (q.expressionAnswer === undefined) continue;
  const vars = variablesOf(q.expressionAnswer);
  const ok = !!vars && vars.length > 0 && expressionMatches(q.expressionAnswer, q.expressionAnswer) === true;
  if (!ok) {
    failures++;
    console.log(`  FAIL ${q.id}: ${q.expressionAnswer}`);
  }
}
console.log(`  checked ${questions.filter((q) => q.expressionAnswer).length} formula keys`);

console.log("\nevaluator still reads plain numbers without variables");
expect("10c5", evaluate("10c5"), 252);
expect("n without env is unreadable", evaluate("n+1"), null);

console.log(failures ? `\n${failures} FAILURE(S).` : "\nAll checks passed.");
process.exit(failures ? 1 : 0);
