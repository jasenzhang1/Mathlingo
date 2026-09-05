import type { Item, ParamSpec } from "./types";

/**
 * Turns a parameterised template into a concrete question.
 *
 * `types.ts` has always described this ("`paramSpec` describes the sampling
 * domain and `answerKey` is *computed* from the drawn parameters"), and
 * `sourcing.ts` validates that a parameterised item names a solver — but nothing
 * ever *ran* one. The result was that a templated item was served with its
 * placeholders intact and graded against `answerKey: undefined`, so the learner
 * saw "{n} first serves" and was told the answer was NaN.
 *
 * Everything here exists to make that state unreachable: `instantiate` is the
 * only way an item reaches a learner, and it throws rather than emitting a stem
 * that still contains a placeholder.
 */

export type ParamValues = Record<string, number>;
export type Solver = (params: ParamValues) => number;

const PLACEHOLDER = /\{([A-Za-z_]\w*)\}/g;

/** Exact binomial coefficient via the multiplicative formula. */
function choose(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  const j = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= j; i++) result = (result * (n - j + i)) / i;
  return Math.round(result);
}

/**
 * Registered solvers, keyed by the `solver` name an item declares.
 *
 * Deliberately small. `sourcing.ts` requires two independent solvers to agree
 * before an item goes live, so each entry added here is a commitment to verify
 * it — an unverified solver silently produces wrong answer keys for every
 * instance of every item that names it, which is worse than having no template.
 */
export const SOLVERS: Record<string, Solver> = {
  /** P(X = k) for X ~ Binomial(n, p). */
  binomialPmf: ({ n, k, p }) => choose(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k),
};

/**
 * Evaluates a constraint like "k <= n" against drawn values.
 *
 * Hand-parsed rather than `eval`ed: item definitions are data, and data should
 * never become executable code. Anything this parser does not recognise throws,
 * so a malformed constraint fails loudly instead of being treated as satisfied.
 */
const COMPARISON =
  /^\s*(-?\d+(?:\.\d+)?|[A-Za-z_]\w*)\s*(<=|>=|==|!=|<|>)\s*(-?\d+(?:\.\d+)?|[A-Za-z_]\w*)\s*$/;

function operandValue(token: string, values: ParamValues): number {
  if (/^-?\d/.test(token)) return Number(token);
  const value = values[token];
  if (value === undefined) {
    throw new Error(`Constraint refers to unknown parameter "${token}".`);
  }
  return value;
}

export function satisfiesConstraint(constraint: string, values: ParamValues): boolean {
  const parsed = COMPARISON.exec(constraint);
  if (!parsed) throw new Error(`Unparseable constraint: "${constraint}".`);

  const left = operandValue(parsed[1]!, values);
  const right = operandValue(parsed[3]!, values);

  switch (parsed[2]!) {
    case "<=":
      return left <= right;
    case ">=":
      return left >= right;
    case "==":
      return left === right;
    case "!=":
      return left !== right;
    case "<":
      return left < right;
    default:
      return left > right;
  }
}

/**
 * Draws one admissible parameter tuple.
 *
 * Constraints are checked against the *whole* tuple after every parameter is
 * drawn, rather than as each one is drawn, so a constraint may refer forward to
 * a parameter declared later without the author having to order them by hand.
 */
export function sampleParams(specs: ParamSpec[], rng: () => number = Math.random): ParamValues {
  const constraints = specs.flatMap((spec) => spec.constraints ?? []);

  for (let attempt = 0; attempt < 200; attempt++) {
    const values: ParamValues = {};

    for (const spec of specs) {
      if (spec.choices?.length) {
        const picked = spec.choices[Math.floor(rng() * spec.choices.length)]!;
        if (typeof picked !== "number") {
          throw new Error(`Parameter "${spec.name}" has a non-numeric choice; solvers take numbers.`);
        }
        values[spec.name] = picked;
      } else if (spec.range) {
        const [low, high] = spec.range;
        // Ranges are inclusive integer ranges unless explicitly marked otherwise.
        values[spec.name] =
          spec.integer === false
            ? low + rng() * (high - low)
            : Math.floor(low + rng() * (high - low + 1));
      } else {
        throw new Error(`Parameter "${spec.name}" declares neither a range nor choices.`);
      }
    }

    if (constraints.every((c) => satisfiesConstraint(c, values))) return values;
  }

  throw new Error(
    `Could not satisfy constraints [${constraints.join("; ")}] in 200 draws — the ranges are probably incompatible.`,
  );
}

export function renderStem(stem: string, values: ParamValues): string {
  return stem.replace(PLACEHOLDER, (_match, name: string) => {
    const value = values[name];
    if (value === undefined) {
      throw new Error(`Stem references "{${name}}", which is not a declared parameter.`);
    }
    // Trim floating-point noise from computed values without touching integers.
    return String(Number(value.toFixed(6)));
  });
}

export function hasPlaceholders(stem: string): boolean {
  PLACEHOLDER.lastIndex = 0;
  return PLACEHOLDER.test(stem);
}

/**
 * True if this item can actually be served. Used to filter a pool *before*
 * selection, so a broken template is skipped rather than picked and then thrown.
 */
export function canInstantiate(item: Item): boolean {
  if (item.params?.length) {
    return Boolean(item.solver && SOLVERS[item.solver]);
  }
  // A non-parameterised item must not contain placeholders — there is nothing
  // to substitute them with.
  return !hasPlaceholders(item.stem);
}

/**
 * Produces the concrete item a learner sees. Safe to call on non-templated
 * items, which are returned unchanged after the same placeholder check.
 */
export function instantiate(item: Item, rng: () => number = Math.random): Item {
  if (!item.params?.length) {
    if (hasPlaceholders(item.stem)) {
      throw new Error(`Item ${item.id} has placeholders but declares no parameters.`);
    }
    return item;
  }

  const solver = item.solver ? SOLVERS[item.solver] : undefined;
  if (!solver) {
    throw new Error(
      `Item ${item.id} declares solver "${item.solver ?? "(none)"}", which is not registered.`,
    );
  }

  const values = sampleParams(item.params, rng);
  const stem = renderStem(item.stem, values);
  const answerKey = solver(values);

  if (!Number.isFinite(answerKey)) {
    throw new Error(`Solver "${item.solver}" returned ${answerKey} for ${item.id}.`);
  }
  if (hasPlaceholders(stem)) {
    throw new Error(`Item ${item.id} still has placeholders after substitution.`);
  }

  // `params` is cleared so the returned value is unambiguously a concrete
  // instance, not another template waiting to be filled in.
  return { ...item, stem, answerKey, params: undefined };
}
