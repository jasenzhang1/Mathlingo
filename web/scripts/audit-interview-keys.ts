/**
 * Audits interview answer keys for the five-decimal grading rule.
 *
 *   npx tsx scripts/audit-interview-keys.ts            # report
 *   npx tsx scripts/audit-interview-keys.ts --write    # apply exact-value upgrades
 *   npx tsx scripts/audit-interview-keys.ts --suggest  # list self-graded formula answers
 *
 * For each `numericAnswer`, every `=`-separated form in the LaTeX `answer`
 * that evaluates (`\tfrac{217}{2592}`, `\dfrac{\ln 2}{2}`) is compared with
 * the key. A key that is a rounded copy of an exact form is replaced by the
 * exact value, so a candidate who answers exactly or to five places passes.
 * Keys with no exact form and fewer than five decimals are listed for review.
 * Every `expressionAnswer` is checked against the LaTeX answer at sample points.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { evaluate, variablesOf } from "../src/lib/interview/evaluate";
import { expressionMatches } from "../src/lib/interview/scoring";
import type { InterviewQuestion } from "../src/lib/interview/types";

const PATH = "src/data/interview/questions.json";

/** Replaces `\cmd{a}{b}` (brace-matched) via `fn(a, b)`. */
function replaceTwoArg(s: string, cmd: RegExp, fn: (a: string, b: string) => string): string {
  for (;;) {
    const m = cmd.exec(s);
    if (!m) return s;
    const a = group(s, m.index + m[0].length);
    if (!a) return s;
    const b = group(s, a.end);
    if (!b) return s;
    s = s.slice(0, m.index) + fn(a.body, b.body) + s.slice(b.end);
    cmd.lastIndex = 0;
  }
}
function replaceOneArg(s: string, cmd: RegExp, fn: (a: string) => string): string {
  for (;;) {
    const m = cmd.exec(s);
    if (!m) return s;
    const a = group(s, m.index + m[0].length);
    if (!a) return s;
    s = s.slice(0, m.index) + fn(a.body) + s.slice(a.end);
    cmd.lastIndex = 0;
  }
}
/** The `{…}` group starting at `i` (after optional spaces). */
function group(s: string, i: number): { body: string; end: number } | null {
  while (s[i] === " ") i++;
  if (s[i] !== "{") return null;
  let depth = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === "{") depth++;
    else if (s[j] === "}" && --depth === 0) return { body: s.slice(i + 1, j), end: j + 1 };
  }
  return null;
}

/** LaTeX math → the plain grammar `evaluate` reads. Best effort. */
export function latexToPlain(tex: string): string {
  let s = tex.replace(/\$/g, " ").replace(/\{,\}/g, "");
  s = s.replace(/\\left|\\right|\\big|\\Big|\\displaystyle|\\,|\\;|\\!|\\ /g, "");
  s = replaceTwoArg(s, /\\[dt]?frac/, (a, b) => `((${a})/(${b}))`);
  s = replaceTwoArg(s, /\\binom/, (a, b) => `C(${a},${b})`);
  s = replaceOneArg(s, /\\sqrt/, (a) => `sqrt(${a})`);
  s = s.replace(/\^\s*\{/g, "^(");
  s = s
    .replace(/\\cdot|\\times/g, "*")
    .replace(/\\pi/g, "pi")
    .replace(/\\ln\s*([0-9]+|[a-z])\b/gi, "ln($1)")
    .replace(/\\ln/g, "ln")
    .replace(/\\log/g, "log")
    .replace(/\\exp/g, "exp")
    .replace(/\\%/g, "%");
  // Remaining braces were groups (exponents opened above close here).
  s = s.replace(/\{/g, "(").replace(/\}/g, ")");
  return s.trim();
}

function forms(answer: string): string[] {
  return answer
    .split(/=|\\approx|≈/)
    .map((part) => latexToPlain(part))
    .filter((p) => p.length > 0);
}

function decimals(x: number): number {
  const s = String(x);
  return s.includes(".") && !s.includes("e") ? s.split(".")[1].length : 0;
}

const write = process.argv.includes("--write");
const questions = JSON.parse(readFileSync(PATH, "utf8")) as InterviewQuestion[];
const upgrades: string[] = [];
const review: string[] = [];
let changed = 0;
const suggest = process.argv.includes("--suggest");
const failures: string[] = [];
const suggestions: string[] = [];
let formulaOk = 0;

for (const q of questions) {
  if (q.numericAnswer !== undefined) {
    const key = q.numericAnswer;
    const values = forms(q.answer)
      .map((f) => ({ f, v: evaluate(f) }))
      .filter((x): x is { f: string; v: number } => x.v !== null);
    // An exact form: anything that isn't just a short decimal like the key.
    const exact = values.filter((x) => !/^\s*-?\d*\.?\d+\s*%?\s*$/.test(x.f));
    const scaled = (v: number) => (q.answer.includes("%") && Math.abs(v - key * 100) < Math.abs(v - key) ? v / 100 : v);
    const better = exact
      .map((x) => ({ ...x, v: scaled(x.v) }))
      .find((x) => Math.abs(x.v - key) > 5e-6 * (1 + 1e-9) && Math.abs(x.v - key) <= 0.005 * Math.max(1, Math.abs(key)));
    if (better) {
      upgrades.push(`${q.id}: ${key} -> ${better.v}   (from ${better.f})`);
      if (write) {
        q.numericAnswer = better.v;
        changed++;
      }
    } else if (exact.length === 0 && !Number.isInteger(key) && decimals(key) < 5 && q.numericPrecision === undefined) {
      review.push(`${q.id}: key ${key} | ${q.answer.replace(/\n/g, " ").slice(0, 90)}`);
    }
  }
  if (q.expressionAnswer !== undefined) {
    // The plain-text key must agree with some form of the LaTeX answer.
    const vars = variablesOf(q.expressionAnswer);
    const tex = forms(q.answer).find((f) => expressionMatches(f, q.expressionAnswer!) === true);
    if (!tex) failures.push(`${q.id}: key ${q.expressionAnswer} (vars ${vars?.join(",")}) matches no form of ${q.answer.replace(/\n/g, " ").slice(0, 80)}`);
    else formulaOk++;
  } else if (suggest && q.numericAnswer === undefined && q.status !== "draft" && !/Part|\n/.test(q.answer)) {
    // A self-graded answer that reads as one formula is a candidate for `expressionAnswer`.
    const f = forms(q.answer).find((x) => (variablesOf(x)?.length ?? 0) > 0 && expressionMatches(x, x) === true);
    if (f) suggestions.push(`${q.id}: ${f}   | ${q.answer.replace(/\n/g, " ").slice(0, 70)}`);
  }
}

console.log(`${formulaOk} formula key(s) agree with their LaTeX answer; ${failures.length} do not:`);
failures.forEach((f) => console.log("  " + f));
if (suggest) {
  console.log(`\n${suggestions.length} self-graded question(s) whose answer reads as one formula:`);
  suggestions.forEach((s) => console.log("  " + s));
}

console.log(`\n${upgrades.length} key(s) are rounded copies of an exact form:`);
upgrades.forEach((u) => console.log("  " + u));
console.log(`\n${review.length} key(s) with < 5 decimals and no exact form (review):`);
review.forEach((r) => console.log("  " + r));
if (write && changed) {
  writeFileSync(PATH, JSON.stringify(questions, null, 1) + "\n");
  console.log(`\nwrote ${changed} upgrade(s) to ${PATH}`);
}
