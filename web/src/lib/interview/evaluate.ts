/**
 * Evaluates what a candidate types as a numeric answer: `252`, `1/14`,
 * `0.0714`, `7.1%`, `C(10,5)`, `10c5`, `(3 - sqrt(3))/2`, `ln(2)/2`, `2^10`,
 * `5!`. Anything else returns null, and the question falls back to the
 * candidate grading themselves against the revealed answer.
 *
 * A small recursive-descent parser rather than `eval`/`Function`: the input is
 * arbitrary user text, and the grammar interviewers actually accept is tiny.
 */

type Tok = { kind: "num"; value: number } | { kind: "id"; value: string } | { kind: "op"; value: string };

function tokenize(src: string): Tok[] | null {
  const out: Tok[] = [];
  const s = src.replace(/\s+/g, "").replace(/×|·/g, "*").replace(/−/g, "-").replace(/,(?=\d{3}\b)/g, "");
  let i = 0;
  while (i < s.length) {
    const rest = s.slice(i);
    const num = rest.match(/^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i);
    if (num) {
      out.push({ kind: "num", value: Number(num[0]) });
      i += num[0].length;
      continue;
    }
    const id = rest.match(/^[a-z]+/i);
    if (id) {
      out.push({ kind: "id", value: id[0].toLowerCase() });
      i += id[0].length;
      continue;
    }
    if ("+-*/^()!%,".includes(s[i])) {
      out.push({ kind: "op", value: s[i] });
      i++;
      continue;
    }
    return null;
  }
  return out;
}

function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0 || n > 170) return NaN;
  let r = 1;
  for (let k = 2; k <= n; k++) r *= k;
  return r;
}

function choose(n: number, k: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(k) || k < 0 || n < 0 || k > n) return k > n ? 0 : NaN;
  let r = 1;
  for (let j = 1; j <= Math.min(k, n - k); j++) r = (r * (n - Math.min(k, n - k) + j)) / j;
  return Math.round(r);
}

const FUNCS: Record<string, (...xs: number[]) => number> = {
  sqrt: Math.sqrt,
  ln: Math.log,
  log: Math.log10,
  exp: Math.exp,
  c: choose,
  choose,
  binom: choose,
  p: (n, k) => factorial(n) / factorial(n - k),
};
const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E };

export function evaluate(src: string): number | null {
  const tokenized = tokenize(src);
  if (!tokenized || tokenized.length === 0) return null;
  const toks: Tok[] = tokenized;
  let pos = 0;
  const peek = () => toks[pos];
  const isOp = (v: string) => peek()?.kind === "op" && peek()!.value === v;
  const fail = (): never => {
    throw new Error("parse");
  };

  // expr := term (('+'|'-') term)*
  function expr(): number {
    let v = term();
    while (isOp("+") || isOp("-")) v = toks[pos++].value === "+" ? v + term() : v - term();
    return v;
  }
  // term := unary (('*'|'/') unary | implicit-multiplication)*
  function term(): number {
    let v = unary();
    for (;;) {
      if (isOp("*") || isOp("/")) v = toks[pos++].value === "*" ? v * unary() : v / unary();
      else if (peek() && (peek()!.kind !== "op" || isOp("("))) v *= unary();
      else return v;
    }
  }
  function unary(): number {
    if (isOp("-")) {
      pos++;
      return -unary();
    }
    if (isOp("+")) {
      pos++;
      return unary();
    }
    return power();
  }
  // power := postfix ('^' unary)?   (right-associative)
  function power(): number {
    const base = postfix();
    if (isOp("^")) {
      pos++;
      return base ** unary();
    }
    return base;
  }
  function postfix(): number {
    let v = atom();
    for (;;) {
      if (isOp("!")) {
        pos++;
        v = factorial(v);
      } else if (isOp("%")) {
        pos++;
        v /= 100;
      } else return v;
    }
  }
  function atom(): number {
    const t = peek() ?? fail();
    if (t.kind === "num") {
      pos++;
      // "10c5" / "10C5" / "10 choose 5"
      const nx = peek();
      if (nx?.kind === "id" && (nx.value === "c" || nx.value === "choose") && toks[pos + 1]?.kind === "num") {
        pos++;
        return choose(t.value, (toks[pos++] as { value: number }).value);
      }
      return t.value;
    }
    if (t.kind === "op" && t.value === "(") {
      pos++;
      const v = expr();
      if (!isOp(")")) fail();
      pos++;
      return v;
    }
    if (t.kind === "id") {
      pos++;
      if (t.value in CONSTS && !isOp("(")) return CONSTS[t.value];
      const fn = FUNCS[t.value] ?? fail();
      if (!isOp("(")) fail();
      pos++;
      const args = [expr()];
      while (isOp(",")) {
        pos++;
        args.push(expr());
      }
      if (!isOp(")")) fail();
      pos++;
      return fn(...args);
    }
    return fail();
  }

  try {
    const v = expr();
    if (pos !== toks.length) return null;
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}
