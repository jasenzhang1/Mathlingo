import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./calc-shared";

/**
 * Calculus course, part 5: partial fractions, improper integrals, and
 * applications of integration (area, volume, average value, work). Forty
 * questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// partial-fractions
// ---------------------------------------------------------------------------
const PF = "partial-fractions";
const partialFractions: Item[] = [
  // level 1
  mcq(m(PF, "recall-applies-to", "recall", 1, 15, "Partial fraction decomposition applies to:"),
    "Rational functions $\\frac{P(x)}{Q(x)}$",
    [
      ["Products of trig functions", "pf-trig", "Those need trig identities."],
      ["Any function with a denominator", "pf-any", "Numerator and denominator must be polynomials."],
      ["Exponentials", "pf-exp", "$e^{x}$ isn't a polynomial."],
    ]),
  mcq(m(PF, "recall-long-division", "recall", 1, 15, "If $\\deg P \\ge \\deg Q$, the first step is to:"),
    "Divide, writing $\\frac{P}{Q} = S(x) + \\frac{R(x)}{Q(x)}$ with $\\deg R < \\deg Q$",
    [
      ["Factor $P$", "longdiv-factor-p", "The denominator's factors set up the decomposition."],
      ["Integrate directly", "longdiv-integrate", "The proper part still needs decomposing."],
      ["Use the cover-up method immediately", "longdiv-coverup", "The decomposition only works for proper fractions."],
    ]),
  mcq(m(PF, "recall-repeated", "recall", 1, 15, "A repeated factor $(x - a)^{2}$ in the denominator contributes the terms:"),
    "$\\frac{A}{x - a} + \\frac{B}{(x - a)^{2}}$",
    [
      ["$\\frac{A}{(x - a)^{2}}$ only", "repeated-top-only", "Every power up to the multiplicity is needed."],
      ["$\\frac{Ax + B}{(x - a)^{2}}$", "repeated-linear-numerator", "That's equivalent but not the standard form; the standard form uses constant numerators."],
      ["$\\frac{A}{x - a}$ only", "repeated-bottom-only", "The squared factor needs its own term."],
    ]),
  mcq(m(PF, "recall-quadratic", "recall", 1, 15, "An irreducible quadratic factor $x^{2} + 1$ contributes the term:"),
    "$\\frac{Bx + C}{x^{2} + 1}$",
    [
      ["$\\frac{B}{x^{2} + 1}$", "quadratic-constant", "A quadratic denominator needs a linear numerator."],
      ["$\\frac{B}{x + 1} + \\frac{C}{x - 1}$", "quadratic-factor", "$x^{2} + 1$ doesn't factor over $\\mathbb{R}$."],
      ["$\\frac{Bx^{2} + C}{x^{2} + 1}$", "quadratic-degree", "The numerator's degree must be lower."],
    ]),
  // level 2
  num(m(PF, "apply-coefficient-a", "apply", 2, 20, "Write $\\frac{1}{(x - 1)(x + 1)} = \\frac{A}{x - 1} + \\frac{B}{x + 1}$. Find $A$."), 0.5),
  num(m(PF, "apply-coverup-a", "apply", 2, 20, "Write $\\frac{3x + 1}{(x - 1)(x + 1)} = \\frac{A}{x - 1} + \\frac{B}{x + 1}$. Find $A$."), 2),
  num(m(PF, "apply-coverup-b", "apply", 2, 20, "Write $\\frac{3x + 1}{(x - 1)(x + 1)} = \\frac{A}{x - 1} + \\frac{B}{x + 1}$. Find $B$."), 1),
  mcq(m(PF, "apply-difference-squares", "apply", 2, 20, "$\\frac{1}{x^{2} - 4} =$"),
    "$\\frac{1}{4}\\left(\\frac{1}{x - 2} - \\frac{1}{x + 2}\\right)$",
    [
      ["$\\frac{1}{x - 2} - \\frac{1}{x + 2}$", "diffsq-factor", "That equals $\\frac{4}{x^{2} - 4}$."],
      ["$\\frac{1}{x - 2} + \\frac{1}{x + 2}$", "diffsq-sign", "That equals $\\frac{2x}{x^{2} - 4}$."],
      ["$\\frac{1}{4}\\left(\\frac{1}{x + 2} - \\frac{1}{x - 2}\\right)$", "diffsq-order", "That has the wrong sign."],
    ]),
  // level 3
  num(m(PF, "apply-integral-squares", "apply", 3, 25, "Evaluate $\\int_2^{3} \\frac{dx}{x^{2} - 1}$. Give $3$ decimal places."), 0.203),
  num(m(PF, "apply-integral-consecutive", "apply", 3, 25, "Evaluate $\\int_0^{1} \\frac{dx}{(x + 1)(x + 2)}$. Give $3$ decimal places."), 0.288),
  num(m(PF, "apply-log-derivative", "apply", 3, 25, "Evaluate $\\int_0^{1} \\frac{2x}{x^{2} + 1}\\,dx$. Give $3$ decimal places."), 0.693),
  mcq(m(PF, "apply-linear-term", "apply", 3, 25, "$\\int \\frac{A}{x - a}\\,dx =$"),
    "$A\\ln|x - a| + C$",
    [
      ["$\\frac{A}{(x - a)^{2}} + C$", "linterm-derivative", "That's (minus) a derivative, not an antiderivative."],
      ["$A\\ln|x| - a + C$", "linterm-split", "The shift stays inside the logarithm."],
      ["$-\\frac{A}{x - a} + C$", "linterm-power", "That's $\\int \\frac{A}{(x - a)^{2}}\\,dx$."],
    ]),
  // level 4
  num(m(PF, "apply-integral-mixed", "apply", 4, 30, "Evaluate $\\int_1^{2} \\frac{x + 3}{x(x + 1)}\\,dx$. Give $3$ decimal places."), 1.269),
  num(m(PF, "apply-log-plus-arctan", "apply", 4, 30, "Evaluate $\\int_0^{1} \\frac{2x + 3}{x^{2} + 1}\\,dx$. Give $3$ decimal places."), 3.049),
  num(m(PF, "apply-long-division", "apply", 4, 30, "Evaluate $\\int_0^{1} \\frac{x^{2}}{x + 1}\\,dx$. Give $3$ decimal places."), 0.193),
  mcq(m(PF, "apply-setup-repeated", "apply", 4, 30, "The correct form for decomposing $\\frac{1}{x^{2}(x + 1)}$ is:"),
    "$\\frac{A}{x} + \\frac{B}{x^{2}} + \\frac{C}{x + 1}$",
    [
      ["$\\frac{A}{x^{2}} + \\frac{B}{x + 1}$", "setup-missing", "The lower power $\\frac{A}{x}$ is required."],
      ["$\\frac{Ax + B}{x^{2}} + \\frac{C}{x + 1}$", "setup-nonstandard", "Equivalent, but the standard form splits it into constant numerators."],
      ["$\\frac{A}{x} + \\frac{B}{x + 1}$", "setup-repeated-once", "The square needs its own term."],
    ]),
  // level 5
  short(m(PF, "explain-coverup", "explain", 5, 90, "Explain why the cover-up method works for distinct linear factors, using $\\frac{P(x)}{(x - a)(x - b)} = \\frac{A}{x - a} + \\frac{B}{x - b}$."),
    [
      ["multiply", "Multiplying by $(x - a)$ gives $\\frac{P(x)}{x - b} = A + \\frac{B(x - a)}{x - b}$", 2, true],
      ["substitute", "Setting $x = a$ kills the $B$ term, so $A = \\frac{P(a)}{a - b}$ — the original with $(x - a)$ “covered”", 2, true],
    ]),
  mcq(m(PF, "apply-improper-first", "apply", 5, 40, "Before decomposing $\\frac{x^{3} + 1}{x^{2} - 1}$, you must:"),
    "Divide, since the numerator's degree is not lower than the denominator's",
    [
      ["Factor the numerator and stop", "improper-factor", "Factoring helps, but the fraction is still improper."],
      ["Write $\\frac{A}{x - 1} + \\frac{B}{x + 1}$ directly", "improper-direct", "That can only represent proper fractions."],
      ["Complete the square", "improper-square", "That's for irreducible quadratics."],
    ]),
  mcq(m(PF, "apply-arctan-scale", "apply", 5, 40, "$\\int \\frac{dx}{x^{2} + 4} =$"),
    "$\\frac{1}{2}\\arctan\\frac{x}{2} + C$",
    [
      ["$\\arctan\\frac{x}{2} + C$", "arctan4-factor", "Substituting $x = 2u$ leaves a factor $\\frac{1}{2}$."],
      ["$\\frac{1}{4}\\arctan\\frac{x}{2} + C$", "arctan4-quarter", "The factor is $\\frac{1}{a} = \\frac{1}{2}$."],
      ["$\\ln(x^{2} + 4) + C$", "arctan4-log", "That needs a numerator $2x$."],
    ]),
  num(m(PF, "apply-integral-repeated", "apply", 5, 40, "Evaluate $\\int_1^{2} \\frac{dx}{x^{2}(x + 1)}$. Give $4$ decimal places."), 0.2123),
  // level 6
  short(m(PF, "explain-both-powers", "explain", 6, 120, "Decompose $\\frac{1}{x^{2}(x + 1)}$ and explain why both $\\frac{A}{x}$ and $\\frac{B}{x^{2}}$ are needed."),
    [
      ["decomposition", "Gets $-\\frac{1}{x} + \\frac{1}{x^{2}} + \\frac{1}{x + 1}$", 2, true],
      ["why", "With only $\\frac{B}{x^{2}} + \\frac{C}{x + 1}$ there are too few unknowns: matching coefficients of $1 = B(x + 1) + Cx^{2}$ is inconsistent", 2, true],
    ]),
  num(m(PF, "apply-complete-square", "apply", 6, 45, "Evaluate $\\int_0^{1} \\frac{dx}{x^{2} + 2x + 2}$. Give $4$ decimal places."), 0.3218),
  num(m(PF, "apply-mixed-coefficient", "apply", 6, 45, "Write $\\frac{x^{2} + 2}{(x - 1)(x^{2} + 1)} = \\frac{A}{x - 1} + \\frac{Bx + C}{x^{2} + 1}$. Find $A$."), 1.5),
  mcq(m(PF, "apply-count-unknowns", "apply", 6, 45, "How many unknown constants appear in the decomposition of $\\frac{1}{(x - 1)^{3}(x^{2} + 1)}$?"),
    "$5$",
    [
      ["$2$", "unknowns-two", "The cube needs three terms and the quadratic needs two constants."],
      ["$4$", "unknowns-four", "The quadratic term has two constants, $B$ and $C$."],
      ["$3$", "unknowns-three", "Add the two constants of the quadratic term."],
    ]),
  // level 7
  short(m(PF, "explain-logistic", "explain", 7, 120, "Solve the logistic equation $\\frac{dP}{dt} = P(1 - P)$ using partial fractions."),
    [
      ["separate", "Separates: $\\int \\frac{dP}{P(1 - P)} = \\int dt$, with $\\frac{1}{P(1 - P)} = \\frac{1}{P} + \\frac{1}{1 - P}$", 2, true],
      ["solve", "Gets $\\ln\\left|\\frac{P}{1 - P}\\right| = t + C$, so $P = \\frac{1}{1 + Ke^{-t}}$", 2, true],
    ]),
  num(m(PF, "apply-mixed-c", "apply", 7, 60, "Write $\\frac{x^{2} + 2}{(x - 1)(x^{2} + 1)} = \\frac{A}{x - 1} + \\frac{Bx + C}{x^{2} + 1}$. Find $C$."), -0.5),
  num(m(PF, "apply-integral-shifted", "apply", 7, 60, "Evaluate $\\int_3^{5} \\frac{dx}{x^{2} - 2x}$. Give $3$ decimal places."), 0.294),
  mcq(m(PF, "transfer-telescoping", "transfer", 7, 60, "$\\sum_{n=1}^{\\infty} \\frac{1}{n(n + 2)} =$"),
    "$\\frac{3}{4}$",
    [
      ["$1$", "telescope-one", "$\\frac{1}{n(n + 2)} = \\frac{1}{2}\\left(\\frac{1}{n} - \\frac{1}{n + 2}\\right)$; two terms survive: $\\frac{1}{2}\\left(1 + \\frac{1}{2}\\right)$."],
      ["$\\frac{1}{2}$", "telescope-half", "Two leading terms survive, not one."],
      ["$\\frac{3}{2}$", "telescope-no-half", "Don't forget the factor $\\frac{1}{2}$."],
    ]),
  // level 8
  short(m(PF, "explain-divide-then-split", "explain", 8, 150, "Evaluate $\\int \\frac{x^{3}}{x^{2} - 1}\\,dx$, explaining each step."),
    [
      ["divide", "Long division: $\\frac{x^{3}}{x^{2} - 1} = x + \\frac{x}{x^{2} - 1}$", 2, true],
      ["integrate", "Gets $\\frac{x^{2}}{2} + \\frac{1}{2}\\ln|x^{2} - 1| + C$ (by substitution or by partial fractions)", 2, true],
    ]),
  num(m(PF, "apply-cubic-over-quadratic", "apply", 8, 75, "Evaluate $\\int_0^{1} \\frac{x^{3}}{x^{2} + 1}\\,dx$. Give $3$ decimal places."), 0.153),
  num(m(PF, "apply-improper-ratio", "apply", 8, 75, "Evaluate $\\int_2^{3} \\frac{x^{2} + 1}{x^{2} - 1}\\,dx$. Give $3$ decimal places."), 1.405),
  mcq(m(PF, "apply-square-completion", "apply", 8, 75, "$\\int \\frac{dx}{x^{2} + 6x + 13} =$"),
    "$\\frac{1}{2}\\arctan\\frac{x + 3}{2} + C$",
    [
      ["$\\arctan(x + 3) + C$", "complete-no-scale", "$x^{2} + 6x + 13 = (x + 3)^{2} + 4$, so the scale is $2$."],
      ["$\\ln(x^{2} + 6x + 13) + C$", "complete-log", "That needs a numerator $2x + 6$."],
      ["$\\frac{1}{2}\\arctan\\frac{x - 3}{2} + C$", "complete-sign", "Completing the square gives $(x + 3)^{2}$."],
    ]),
  // level 9
  short(m(PF, "transfer-quartic", "transfer", 9, 180, "Show that $\\int \\frac{dx}{x^{4} - 1} = \\frac{1}{4}\\ln\\left|\\frac{x - 1}{x + 1}\\right| - \\frac{1}{2}\\arctan x + C$."),
    [
      ["split", "Writes $\\frac{1}{x^{4} - 1} = \\frac{1}{2}\\left(\\frac{1}{x^{2} - 1} - \\frac{1}{x^{2} + 1}\\right)$", 2, true],
      ["integrate", "Uses $\\int \\frac{dx}{x^{2} - 1} = \\frac{1}{2}\\ln\\left|\\frac{x - 1}{x + 1}\\right|$ and $\\int \\frac{dx}{x^{2} + 1} = \\arctan x$", 2, true],
    ]),
  short(m(PF, "transfer-coverup-repeated", "transfer", 9, 180, "For a repeated factor, e.g. $\\frac{P(x)}{(x - a)^{2}(x - b)}$, which coefficient does the cover-up method give directly, and how are the others found?"),
    [
      ["top", "Covering $(x - a)^{2}$ and setting $x = a$ gives the coefficient of $\\frac{1}{(x - a)^{2}}$ (and covering $(x - b)$ gives that term's)", 2, true],
      ["others", "The coefficient of $\\frac{1}{x - a}$ needs another method: comparing coefficients, substituting another $x$, or differentiating", 2, true],
    ]),
  num(m(PF, "apply-quartic-definite", "apply", 9, 90, "Evaluate $\\int_2^{3} \\frac{dx}{x^{4} - 1}$. Give $4$ decimal places."), 0.0304),
  mcq(m(PF, "recall-real-factorisation", "recall", 9, 90, "Why does partial fractions always work over $\\mathbb{R}$?"),
    "Every real polynomial factors into real linear and irreducible quadratic factors",
    [
      ["Every polynomial factors into linear factors over $\\mathbb{R}$", "factor-linear-only", "$x^{2} + 1$ has no real roots."],
      ["Every rational function is a polynomial", "factor-polynomial", "Most aren't."],
      ["The denominator can always be cancelled", "factor-cancel", "Cancellation is rare."],
    ]),
  // level 10
  short(m(PF, "transfer-existence", "transfer", 10, 180, "Prove that for $a \\ne b$ and any linear $P(x) = px + q$, there are unique constants $A$, $B$ with $\\frac{P(x)}{(x - a)(x - b)} = \\frac{A}{x - a} + \\frac{B}{x - b}$."),
    [
      ["system", "Clearing denominators: $px + q = A(x - b) + B(x - a)$ gives $A + B = p$ and $-Ab - Ba = q$", 2, true],
      ["unique", "The system's determinant is $b - a \\ne 0$ (up to sign), so the solution exists and is unique (equivalently $A = \\frac{P(a)}{a - b}$, $B = \\frac{P(b)}{b - a}$)", 2, true],
    ]),
  short(m(PF, "transfer-series-sum", "transfer", 10, 180, "Evaluate $\\sum_{n=2}^{\\infty} \\frac{1}{n^{2} - 1}$."),
    [
      ["split", "$\\frac{1}{n^{2} - 1} = \\frac{1}{2}\\left(\\frac{1}{n - 1} - \\frac{1}{n + 1}\\right)$", 2, true],
      ["telescope", "Partial sums telescope to $\\frac{1}{2}\\left(1 + \\frac{1}{2} - \\frac{1}{N} - \\frac{1}{N + 1}\\right) \\to \\frac{3}{4}$", 2, true],
    ]),
  num(m(PF, "transfer-cubic-denominator", "transfer", 10, 120, "Evaluate $\\int_0^{1} \\frac{dx}{x^{3} + 1}$. Give $4$ decimal places."), 0.8356),
  mcq(m(PF, "transfer-residue-formula", "transfer", 10, 120, "If $Q$ has distinct roots and $\\deg P < \\deg Q$, the coefficient of $\\frac{1}{x - a}$ in $\\frac{P}{Q}$ (for a root $a$) is:"),
    "$\\frac{P(a)}{Q'(a)}$",
    [
      ["$\\frac{P'(a)}{Q'(a)}$", "residue-lhopital", "Only $Q$ is differentiated: $\\lim (x - a)\\frac{P}{Q} = \\frac{P(a)}{Q'(a)}$."],
      ["$\\frac{P(a)}{Q(a)}$", "residue-value", "$Q(a) = 0$."],
      ["$P(a)Q'(a)$", "residue-product", "It's a ratio."],
    ]),
];

// ---------------------------------------------------------------------------
// improper-integrals
// ---------------------------------------------------------------------------
const II = "improper-integrals";
const improperIntegrals: Item[] = [
  // level 1
  mcq(m(II, "recall-definition", "recall", 1, 15, "$\\int_a^{\\infty} f(x)\\,dx$ is defined as:"),
    "$\\lim_{t \\to \\infty} \\int_a^{t} f(x)\\,dx$",
    [
      ["$F(\\infty) - F(a)$", "improper-plug-infinity", "$\\infty$ can't be substituted; a limit is needed."],
      ["$\\int_a^{N} f(x)\\,dx$ for a large $N$", "improper-finite", "That's an approximation."],
      ["$\\lim_{x \\to \\infty} f(x)$", "improper-integrand-limit", "That's the limit of the integrand, not the integral."],
    ]),
  mcq(m(II, "recall-converges", "recall", 1, 15, "An improper integral converges when:"),
    "The defining limit exists and is finite",
    [
      ["The integrand tends to $0$", "converge-integrand", "$\\frac{1}{x} \\to 0$ but $\\int_1^{\\infty} \\frac{dx}{x}$ diverges."],
      ["The integrand is positive", "converge-positive", "Positivity says nothing about size."],
      ["An antiderivative exists", "converge-antiderivative", "$\\ln x$ exists but $\\int_1^{\\infty} \\frac{dx}{x}$ diverges."],
    ]),
  mcq(m(II, "recall-p-infinity", "recall", 1, 15, "$\\int_1^{\\infty} \\frac{dx}{x^{p}}$ converges exactly when:"),
    "$p > 1$",
    [
      ["$p \\ge 1$", "pinf-include", "$p = 1$ gives $\\ln x$, which diverges."],
      ["$p < 1$", "pinf-reversed", "That's the condition near $0$."],
      ["$p > 0$", "pinf-positive", "$p = \\frac{1}{2}$ diverges at infinity."],
    ]),
  mcq(m(II, "recall-p-zero", "recall", 1, 15, "$\\int_0^{1} \\frac{dx}{x^{p}}$ converges exactly when:"),
    "$p < 1$",
    [
      ["$p > 1$", "pzero-reversed", "That's the condition at infinity."],
      ["$p \\le 1$", "pzero-include", "$p = 1$ gives $\\ln x \\to -\\infty$."],
      ["Every $p$", "pzero-all", "$p = 2$ diverges at $0$."],
    ]),
  // level 2
  num(m(II, "apply-inverse-square", "apply", 2, 20, "Evaluate $\\int_1^{\\infty} \\frac{dx}{x^{2}}$."), 1),
  num(m(II, "apply-exp-3x", "apply", 2, 20, "Evaluate $\\int_0^{\\infty} e^{-3x}\\,dx$. Give $4$ decimal places."), 0.3333),
  num(m(II, "apply-root-singularity", "apply", 2, 20, "Evaluate $\\int_0^{1} \\frac{dx}{\\sqrt{x}}$."), 2),
  mcq(m(II, "apply-harmonic-integral", "apply", 2, 20, "$\\int_1^{\\infty} \\frac{dx}{x}$:"),
    "Diverges",
    [
      ["Equals $1$", "harmonic-one", "$\\ln t \\to \\infty$."],
      ["Equals $0$", "harmonic-zero", "The integrand is positive."],
      ["Converges because $\\frac{1}{x} \\to 0$", "harmonic-terms", "Tending to $0$ isn't enough."],
    ]),
  // level 3
  num(m(II, "apply-inverse-cube", "apply", 3, 25, "Evaluate $\\int_1^{\\infty} \\frac{dx}{x^{3}}$."), 0.5),
  num(m(II, "apply-cube-root-singularity", "apply", 3, 25, "Evaluate $\\int_0^{8} x^{-1/3}\\,dx$."), 6),
  num(m(II, "apply-arctan-infinity", "apply", 3, 25, "Evaluate $\\int_0^{\\infty} \\frac{dx}{1 + x^{2}}$. Give $3$ decimal places."), 1.571),
  mcq(m(II, "apply-hidden", "apply", 3, 25, "$\\int_{-1}^{1} \\frac{dx}{x^{2}}$:"),
    "Diverges, because of the singularity at $0$",
    [
      ["Equals $-2$", "hidden-ftc", "The FTC doesn't apply across a singularity."],
      ["Equals $2$", "hidden-two", "Each half is infinite."],
      ["Equals $0$", "hidden-zero", "The integrand is even and positive."],
    ]),
  // level 4
  num(m(II, "apply-x-exp", "apply", 4, 30, "Evaluate $\\int_0^{\\infty} xe^{-x}\\,dx$."), 1),
  num(m(II, "apply-log-squared", "apply", 4, 30, "Evaluate $\\int_2^{\\infty} \\frac{dx}{x(\\ln x)^{2}}$. Give $3$ decimal places."), 1.443),
  num(m(II, "apply-three-halves", "apply", 4, 30, "Evaluate $\\int_1^{\\infty} x^{-3/2}\\,dx$."), 2),
  mcq(m(II, "apply-two-sided", "apply", 4, 30, "$\\int_{-\\infty}^{\\infty} x\\,dx$:"),
    "Diverges, even though $\\int_{-t}^{t} x\\,dx = 0$ for every $t$",
    [
      ["Equals $0$ by symmetry", "twosided-symmetric", "Each half must converge separately."],
      ["Equals $\\infty$", "twosided-infinite", "It has no value at all: $\\infty - \\infty$."],
      ["Converges conditionally", "twosided-conditional", "The two-sided definition requires both tails to converge."],
    ]),
  // level 5
  short(m(II, "explain-not-minus-two", "explain", 5, 90, "Explain why $\\int_{-1}^{1} \\frac{dx}{x^{2}}$ is not equal to $\\left[-\\frac{1}{x}\\right]_{-1}^{1} = -2$."),
    [
      ["singularity", "The integrand is unbounded at $0$, inside the interval, so the FTC can't be applied across it", 2, true],
      ["diverge", "Splitting at $0$, $\\int_0^{1} \\frac{dx}{x^{2}} = \\infty$, so the integral diverges (a positive integrand can't give $-2$)", 2, true],
    ]),
  mcq(m(II, "apply-gaussian-comparison", "apply", 5, 40, "$\\int_1^{\\infty} e^{-x^{2}}\\,dx$:"),
    "Converges, by comparison with $\\int_1^{\\infty} e^{-x}\\,dx$",
    [
      ["Diverges, since there's no antiderivative", "gausscomp-no-formula", "Convergence doesn't need a formula."],
      ["Converges, by comparison with $\\int_1^{\\infty} \\frac{dx}{x}$", "gausscomp-wrong-bound", "Being below a divergent integral proves nothing."],
      ["Diverges by comparison with $e^{-x}$", "gausscomp-direction", "$e^{-x^{2}} \\le e^{-x}$, and the larger one converges."],
    ]),
  mcq(m(II, "apply-limit-comparison", "apply", 5, 40, "$\\int_1^{\\infty} \\frac{x}{x^{3} + 5}\\,dx$:"),
    "Converges, since the integrand behaves like $\\frac{1}{x^{2}}$",
    [
      ["Diverges, since it behaves like $\\frac{1}{x}$", "limcomp-wrong-power", "$\\frac{x}{x^{3}} = \\frac{1}{x^{2}}$."],
      ["Diverges, since the numerator grows", "limcomp-numerator", "The denominator grows faster."],
      ["Can't be decided without an antiderivative", "limcomp-undecidable", "Comparison decides it."],
    ]),
  num(m(II, "apply-log-singularity", "apply", 5, 40, "Evaluate $\\int_0^{1} \\ln x\\,dx$."), -1),
  // level 6
  short(m(II, "explain-p-test", "explain", 6, 120, "State and justify the $p$-test for $\\int_1^{\\infty} \\frac{dx}{x^{p}}$."),
    [
      ["compute", "For $p \\ne 1$: $\\int_1^{t} x^{-p}\\,dx = \\frac{t^{1 - p} - 1}{1 - p}$, which has a finite limit iff $p > 1$ (value $\\frac{1}{p - 1}$)", 3, true],
      ["p-one", "For $p = 1$: $\\ln t \\to \\infty$, so it diverges", 1, true],
    ]),
  num(m(II, "apply-gaussian-pair", "apply", 6, 45, "Evaluate $\\int_0^{\\infty} 2xe^{-x^{2}}\\,dx$."), 1),
  num(m(II, "apply-arcsin-singularity", "apply", 6, 45, "Evaluate $\\int_0^{2} \\frac{dx}{\\sqrt{4 - x^{2}}}$. Give $3$ decimal places."), 1.571),
  mcq(m(II, "apply-sine-square-tail", "apply", 6, 45, "$\\int_1^{\\infty} \\frac{\\sin^{2} x}{x^{2}}\\,dx$:"),
    "Converges, since $0 \\le \\frac{\\sin^{2} x}{x^{2}} \\le \\frac{1}{x^{2}}$",
    [
      ["Diverges, since $\\sin^{2} x$ doesn't tend to $0$", "sinsq-numerator", "The $\\frac{1}{x^{2}}$ factor controls it."],
      ["Diverges by comparison with $\\frac{1}{x}$", "sinsq-wrong-comparison", "Being below $\\frac{1}{x}$ proves nothing."],
      ["Equals $0$", "sinsq-zero", "The integrand is nonnegative and not identically $0$."],
    ]),
  // level 7
  short(m(II, "explain-comparison-choice", "explain", 7, 120, "Decide whether $\\int_1^{\\infty} \\frac{dx}{\\sqrt{x} + x^{2}}$ converges, justifying with a comparison."),
    [
      ["bound", "For $x \\ge 1$, $\\frac{1}{\\sqrt{x} + x^{2}} \\le \\frac{1}{x^{2}}$", 2, true],
      ["conclude", "$\\int_1^{\\infty} \\frac{dx}{x^{2}}$ converges ($p = 2 > 1$), so the integral converges", 2, true],
    ]),
  num(m(II, "apply-x2-exp", "apply", 7, 60, "Evaluate $\\int_0^{\\infty} x^{2}e^{-x}\\,dx$."), 2),
  num(m(II, "apply-log-cubed", "apply", 7, 60, "Evaluate $\\int_e^{\\infty} \\frac{dx}{x(\\ln x)^{3}}$."), 0.5),
  mcq(m(II, "apply-both-ends", "apply", 7, 60, "$\\int_0^{\\infty} \\frac{dx}{x^{2} + x}$:"),
    "Diverges, because of the behaviour near $0$",
    [
      ["Converges to $\\ln 2$", "bothends-log", "Near $0$ the integrand is about $\\frac{1}{x}$."],
      ["Converges to $1$", "bothends-one", "The singularity at $0$ is not integrable."],
      ["Diverges because of the tail at infinity", "bothends-tail", "The tail behaves like $\\frac{1}{x^{2}}$, which is fine."],
    ]),
  // level 8
  short(m(II, "explain-exponential-density", "explain", 8, 150, "Show that $f(x) = \\lambda e^{-\\lambda x}$ (for $x \\ge 0$, $\\lambda > 0$) integrates to $1$, and compute its mean $\\int_0^{\\infty} x f(x)\\,dx$."),
    [
      ["total", "$\\int_0^{t} \\lambda e^{-\\lambda x}\\,dx = 1 - e^{-\\lambda t} \\to 1$", 2, true],
      ["mean", "By parts, $\\int_0^{\\infty} x\\lambda e^{-\\lambda x}\\,dx = \\frac{1}{\\lambda}$", 2, true],
    ]),
  num(m(II, "apply-exp-sin", "apply", 8, 75, "Evaluate $\\int_0^{\\infty} e^{-x}\\sin x\\,dx$."), 0.5),
  num(m(II, "apply-x-log", "apply", 8, 75, "Evaluate $\\int_0^{1} x\\ln x\\,dx$."), -0.25),
  mcq(m(II, "apply-no-p", "apply", 8, 75, "For which $p$ does $\\int_0^{\\infty} \\frac{dx}{x^{p}}$ converge?"),
    "No value of $p$",
    [
      ["$p > 1$", "nop-tail", "Then the part near $0$ diverges."],
      ["$p < 1$", "nop-head", "Then the tail at infinity diverges."],
      ["$p = 1$", "nop-one", "Both ends diverge for $p = 1$."],
    ]),
  // level 9
  short(m(II, "transfer-gamma-factorial", "transfer", 9, 180, "Prove $\\int_0^{\\infty} x^{n}e^{-x}\\,dx = n!$ for nonnegative integers $n$ by induction."),
    [
      ["base", "Base case: $\\int_0^{\\infty} e^{-x}\\,dx = 1 = 0!$", 1, true],
      ["step", "Parts: $\\int_0^{\\infty} x^{n}e^{-x}\\,dx = \\left[-x^{n}e^{-x}\\right]_0^{\\infty} + n\\int_0^{\\infty} x^{n - 1}e^{-x}\\,dx = n \\cdot (n - 1)!$, the boundary term vanishing", 3, true],
    ]),
  short(m(II, "transfer-dirichlet-integral", "transfer", 9, 180, "Show that $\\int_1^{\\infty} \\frac{\\sin x}{x}\\,dx$ converges, using integration by parts."),
    [
      ["parts", "Parts with $u = \\frac{1}{x}$, $dv = \\sin x\\,dx$: $\\left[-\\frac{\\cos x}{x}\\right]_1^{t} - \\int_1^{t} \\frac{\\cos x}{x^{2}}\\,dx$", 2, true],
      ["conclude", "The boundary term has a limit, and $\\int_1^{\\infty} \\frac{\\cos x}{x^{2}}$ converges absolutely (compare $\\frac{1}{x^{2}}$)", 2, true],
    ]),
  num(m(II, "apply-partial-fraction-tail", "apply", 9, 90, "Evaluate $\\int_0^{\\infty} \\frac{dx}{(x + 1)(x + 2)}$. Give $3$ decimal places."), 0.693),
  mcq(m(II, "recall-gamma-half", "recall", 9, 90, "$\\Gamma\\left(\\frac{1}{2}\\right) = \\int_0^{\\infty} x^{-1/2}e^{-x}\\,dx$ equals:"),
    "$\\sqrt{\\pi}$",
    [
      ["$\\frac{1}{2}$", "gammahalf-half", "Substituting $x = u^{2}$ gives $2\\int_0^{\\infty} e^{-u^{2}}\\,du = \\sqrt{\\pi}$."],
      ["$1$", "gammahalf-one", "That's $\\Gamma(1)$."],
      ["$\\infty$", "gammahalf-diverges", "Near $0$ the integrand is like $x^{-1/2}$, which is integrable."],
    ]),
  // level 10
  short(m(II, "transfer-gamma-converges", "transfer", 10, 180, "Show that $\\Gamma(s) = \\int_0^{\\infty} x^{s - 1}e^{-x}\\,dx$ converges for every $s > 0$."),
    [
      ["head", "On $(0, 1]$: $x^{s - 1}e^{-x} \\le x^{s - 1}$, integrable since $1 - s < 1$", 2, true],
      ["tail", "On $[1, \\infty)$: $x^{s - 1}e^{-x} \\le \\frac{C}{x^{2}}$ for large $x$ (exponentials beat powers), so the tail converges", 2, true],
    ]),
  short(m(II, "transfer-abs-sinc", "transfer", 10, 180, "Show that $\\int_0^{\\infty} \\frac{|\\sin x|}{x}\\,dx$ diverges."),
    [
      ["block", "On $[k\\pi, (k + 1)\\pi]$, $\\frac{|\\sin x|}{x} \\ge \\frac{|\\sin x|}{(k + 1)\\pi}$, whose integral is $\\frac{2}{(k + 1)\\pi}$", 2, true],
      ["harmonic", "Summing over $k$ gives a multiple of the harmonic series, which diverges", 2, true],
    ]),
  num(m(II, "transfer-half-gaussian", "transfer", 10, 120, "Evaluate $\\int_0^{\\infty} e^{-x^{2}}\\,dx$. Give $3$ decimal places."), 0.886),
  mcq(m(II, "transfer-fresnel", "transfer", 10, 120, "$\\int_0^{\\infty} \\sin(x^{2})\\,dx$:"),
    "Converges, even though $\\sin(x^{2})$ does not tend to $0$",
    [
      ["Diverges, because the integrand doesn't tend to $0$", "fresnel-terms", "Faster and faster oscillation makes the areas cancel."],
      ["Diverges, because $|\\sin(x^{2})|$ isn't integrable", "fresnel-absolute", "Conditional convergence is still convergence."],
      ["Equals $0$", "fresnel-zero", "Its value is $\\frac{1}{2}\\sqrt{\\frac{\\pi}{2}}$."],
    ]),
];

// ---------------------------------------------------------------------------
// applications-of-integration
// ---------------------------------------------------------------------------
const AI = "applications-of-integration";
const applicationsOfIntegration: Item[] = [
  // level 1
  mcq(m(AI, "recall-area-between", "recall", 1, 15, "If $f \\ge g$ on $[a, b]$, the area between their graphs is:"),
    "$\\int_a^b (f(x) - g(x))\\,dx$",
    [
      ["$\\int_a^b f(x)g(x)\\,dx$", "areabetween-product", "Strips have height $f - g$."],
      ["$\\int_a^b f(x)\\,dx \\cdot \\int_a^b g(x)\\,dx$", "areabetween-multiply", "Areas subtract, they don't multiply."],
      ["$\\int_a^b (g(x) - f(x))\\,dx$", "areabetween-reversed", "That's negative when $f \\ge g$."],
    ]),
  mcq(m(AI, "recall-disc", "recall", 1, 15, "Rotating the region under $y = R(x) \\ge 0$, $a \\le x \\le b$, about the $x$-axis gives volume:"),
    "$\\int_a^b \\pi R(x)^{2}\\,dx$",
    [
      ["$\\int_a^b 2\\pi R(x)\\,dx$", "disc-circumference", "Discs have area $\\pi R^{2}$, not circumference $2\\pi R$."],
      ["$\\pi\\left(\\int_a^b R(x)\\,dx\\right)^{2}$", "disc-square-outside", "Square inside the integral."],
      ["$\\int_a^b R(x)^{2}\\,dx$", "disc-no-pi", "Each disc's area has a factor $\\pi$."],
    ]),
  mcq(m(AI, "recall-shell", "recall", 1, 15, "The shell method computes volume as:"),
    "$\\int 2\\pi\\,(\\text{radius})(\\text{height})\\,dx$",
    [
      ["$\\int \\pi\\,(\\text{radius})^{2}\\,dx$", "shell-disc", "That's the disc method."],
      ["$\\int 2\\pi\\,(\\text{radius})^{2}\\,dx$", "shell-squared", "A shell is a thin cylinder: circumference times height times thickness."],
      ["$\\int (\\text{radius})(\\text{height})\\,dx$", "shell-no-2pi", "Unrolled, the shell's length is $2\\pi r$."],
    ]),
  mcq(m(AI, "recall-average", "recall", 1, 15, "The average value of $f$ on $[a, b]$ is:"),
    "$\\frac{1}{b - a}\\int_a^b f(x)\\,dx$",
    [
      ["$\\frac{f(a) + f(b)}{2}$", "average-endpoints", "That ignores everything between the endpoints."],
      ["$\\int_a^b f(x)\\,dx$", "average-no-length", "Divide by the interval's length."],
      ["$\\frac{\\max f + \\min f}{2}$", "average-midrange", "That's the midrange."],
    ]),
  // level 2
  num(m(AI, "apply-line-parabola", "apply", 2, 20, "Find the area between $y = x$ and $y = x^{2}$. Give $4$ decimal places."), 0.1667),
  num(m(AI, "apply-average-linear", "apply", 2, 20, "Find the average value of $f(x) = 2x$ on $[0, 3]$."), 3),
  num(m(AI, "apply-cone-disc", "apply", 2, 20, "Rotate the region under $y = x$, $0 \\le x \\le 1$, about the $x$-axis. Find the volume. Give $3$ decimal places."), 1.047),
  mcq(m(AI, "apply-crossing", "apply", 2, 20, "To find the area between two curves that cross inside $[a, b]$:"),
    "Split at each crossing (or integrate $|f - g|$)",
    [
      ["Integrate $f - g$ straight through", "crossing-straight", "Pieces of opposite sign cancel."],
      ["Integrate $f + g$", "crossing-sum", "That's not an area between curves."],
      ["Take the larger of $\\int f$ and $\\int g$", "crossing-max", "The region's height is $|f - g|$."],
    ]),
  // level 3
  num(m(AI, "apply-parabola-area", "apply", 3, 25, "Find the area between $y = 4 - x^{2}$ and the $x$-axis. Give $3$ decimal places."), 10.667),
  num(m(AI, "apply-root-disc", "apply", 3, 25, "Rotate the region under $y = \\sqrt{x}$, $0 \\le x \\le 4$, about the $x$-axis. Find the volume. Give $3$ decimal places."), 25.133),
  num(m(AI, "apply-average-sine", "apply", 3, 25, "Find the average value of $\\sin x$ on $[0, \\pi]$. Give $3$ decimal places."), 0.637),
  mcq(m(AI, "apply-shell-y-axis", "apply", 3, 25, "Rotating the region under $y = f(x) \\ge 0$, $0 \\le a \\le x \\le b$, about the $y$-axis, the shell method gives:"),
    "$\\int_a^b 2\\pi x f(x)\\,dx$",
    [
      ["$\\int_a^b \\pi f(x)^{2}\\,dx$", "shelly-disc-x", "That's rotation about the $x$-axis."],
      ["$\\int_a^b 2\\pi f(x)\\,dx$", "shelly-no-radius", "The radius of a shell at $x$ is $x$."],
      ["$\\int_a^b \\pi x^{2}f(x)\\,dx$", "shelly-squared", "A shell's volume is $2\\pi r h\\,dr$."],
    ]),
  // level 4
  num(m(AI, "apply-parabola-line-area", "apply", 4, 30, "Find the area between $y = x^{2}$ and $y = 2x$. Give $4$ decimal places."), 1.3333),
  num(m(AI, "apply-washer", "apply", 4, 30, "Rotate the region between $y = x$ and $y = x^{2}$ about the $x$-axis. Find the volume. Give $3$ decimal places."), 0.419),
  num(m(AI, "apply-shell", "apply", 4, 30, "Rotate the region under $y = x - x^{2}$, $0 \\le x \\le 1$, about the $y$-axis. Find the volume. Give $3$ decimal places."), 0.524),
  mcq(m(AI, "apply-spring-work", "apply", 4, 30, "A spring with force $F(x) = kx$ is stretched from $0$ to $d$. The work done is:"),
    "$\\frac{1}{2}kd^{2}$",
    [
      ["$kd$", "spring-force", "That's the final force."],
      ["$kd^{2}$", "spring-no-half", "$\\int_0^{d} kx\\,dx = \\frac{kd^{2}}{2}$."],
      ["$\\frac{1}{2}kd$", "spring-wrong-power", "Integrate $kx$, which gives a square."],
    ]),
  // level 5
  short(m(AI, "explain-cone-volume", "explain", 5, 90, "Use the slice–approximate–integrate method to derive the volume of a cone of radius $r$ and height $h$."),
    [
      ["slice", "Slices perpendicular to the axis are discs of radius $\\frac{r}{h}x$ at distance $x$ from the apex, with volume about $\\pi\\left(\\frac{rx}{h}\\right)^{2}dx$", 2, true],
      ["integrate", "$\\int_0^{h} \\pi\\frac{r^{2}x^{2}}{h^{2}}\\,dx = \\frac{1}{3}\\pi r^{2}h$", 2, true],
    ]),
  mcq(m(AI, "apply-horizontal-strips", "apply", 5, 40, "For the region bounded by $x = y^{2}$ and $x = 4$, the area is easiest to compute with:"),
    "Horizontal strips, integrating $(4 - y^{2})$ in $y$ from $-2$ to $2$",
    [
      ["Vertical strips from $x = 0$ to $4$, height $\\sqrt{x}$", "strips-half", "That gets only the upper half."],
      ["Discs", "strips-discs", "That's for volumes."],
      ["It can't be done with integrals", "strips-impossible", "Integrating in $y$ is straightforward."],
    ]),
  mcq(m(AI, "apply-square-sections", "apply", 5, 40, "A solid has square cross-sections perpendicular to the $x$-axis with side $s(x)$, for $a \\le x \\le b$. Its volume is:"),
    "$\\int_a^b s(x)^{2}\\,dx$",
    [
      ["$\\int_a^b \\pi s(x)^{2}\\,dx$", "square-pi", "Squares, not discs: no factor $\\pi$."],
      ["$\\int_a^b 4s(x)\\,dx$", "square-perimeter", "That's the perimeter, not the area."],
      ["$\\left(\\int_a^b s(x)\\,dx\\right)^{2}$", "square-outside", "Each slice contributes $s^{2}\\,dx$."],
    ]),
  num(m(AI, "apply-spring-joules", "apply", 5, 40, "A spring with constant $k = 50$ N/m is stretched $0.2$ m from rest. How much work is done (J)?"), 1),
  // level 6
  short(m(AI, "explain-sphere", "explain", 6, 120, "Derive the volume of a sphere of radius $r$ using discs."),
    [
      ["setup", "Rotates $y = \\sqrt{r^{2} - x^{2}}$ on $[-r, r]$: $V = \\int_{-r}^{r} \\pi(r^{2} - x^{2})\\,dx$", 2, true],
      ["evaluate", "$\\pi\\left[r^{2}x - \\frac{x^{3}}{3}\\right]_{-r}^{r} = \\frac{4}{3}\\pi r^{3}$", 2, true],
    ]),
  num(m(AI, "apply-cubic-line-area", "apply", 6, 45, "Find the total area enclosed by $y = x^{3}$ and $y = x$."), 0.5),
  num(m(AI, "apply-cone-numbers", "apply", 6, 45, "Use discs to find the volume of a cone of radius $2$ and height $3$. Give $3$ decimal places."), 12.566),
  mcq(m(AI, "apply-signed-vs-total", "apply", 6, 45, "$\\int_0^{2\\pi} \\sin x\\,dx = 0$. The total area between $y = \\sin x$ and the $x$-axis on $[0, 2\\pi]$ is:"),
    "$4$",
    [
      ["$0$", "signedtotal-zero", "Area below the axis counts positively for total area."],
      ["$2$", "signedtotal-two", "Each arch has area $2$, and there are two."],
      ["$2\\pi$", "signedtotal-length", "That's the length of the interval."],
    ]),
  // level 7
  short(m(AI, "explain-two-methods", "explain", 7, 120, "The region between $y = x^{2}$ and $y = 4$ (for $x \\ge 0$) is rotated about the $y$-axis. Set up the volume with discs and with shells, and evaluate."),
    [
      ["discs", "Discs in $y$: $\\int_0^{4} \\pi y\\,dy = 8\\pi$", 2, true],
      ["shells", "Shells in $x$: $\\int_0^{2} 2\\pi x(4 - x^{2})\\,dx = 8\\pi$", 2, true],
    ]),
  num(m(AI, "apply-centroid", "apply", 7, 60, "Find the $x$-coordinate of the centroid of the region under $y = x^{2}$, $0 \\le x \\le 1$."), 0.75),
  num(m(AI, "apply-average-exp", "apply", 7, 60, "Find the average value of $e^{x}$ on $[0, 1]$. Give $3$ decimal places."), 1.718),
  mcq(m(AI, "apply-rod-mass", "apply", 7, 60, "A rod on $[0, 2]$ (metres) has density $\\rho(x) = 1 + x$ kg/m. Its mass is:"),
    "$4$ kg",
    [
      ["$3$ kg", "rod-endpoint", "That's the density at $x = 2$."],
      ["$2$ kg", "rod-length", "Integrate the density, don't just use the length."],
      ["$6$ kg", "rod-wrong-integral", "$\\int_0^{2} (1 + x)\\,dx = 2 + 2$."],
    ]),
  // level 8
  short(m(AI, "explain-torus", "explain", 8, 150, "Find the volume of the torus formed by rotating the disc $(x - R)^{2} + y^{2} \\le r^{2}$ (with $R > r$) about the $y$-axis."),
    [
      ["setup", "Shells: $V = \\int_{R - r}^{R + r} 2\\pi x \\cdot 2\\sqrt{r^{2} - (x - R)^{2}}\\,dx$ (or Pappus: area $\\pi r^{2}$ times the distance $2\\pi R$ travelled by the centroid)", 2, true],
      ["value", "$V = 2\\pi^{2}Rr^{2}$", 2, true],
    ]),
  num(m(AI, "apply-torus-numbers", "apply", 8, 75, "Find the volume of the torus with $R = 3$ and $r = 1$. Give $3$ decimal places."), 59.218),
  num(m(AI, "apply-pump-work", "apply", 8, 75, "A cylindrical tank of radius $1$ m and height $2$ m is full of water (density $1000$ kg/m³, $g = 9.8$ m/s²). How much work is needed to pump all the water out over the top, in kilojoules? Give $2$ decimal places."), 61.58),
  mcq(m(AI, "recall-arc-length", "recall", 8, 75, "The arc length of $y = f(x)$ for $a \\le x \\le b$ is:"),
    "$\\int_a^b \\sqrt{1 + f'(x)^{2}}\\,dx$",
    [
      ["$\\int_a^b f(x)\\,dx$", "arc-area", "That's the area under the curve."],
      ["$\\int_a^b \\sqrt{1 + f(x)^{2}}\\,dx$", "arc-no-derivative", "The slope $f'$, not the height, enters."],
      ["$\\int_a^b (1 + f'(x))\\,dx$", "arc-no-root", "Each small piece has length $\\sqrt{dx^{2} + dy^{2}}$."],
    ]),
  // level 9
  short(m(AI, "transfer-arc-length", "transfer", 9, 180, "Find the arc length of $y = \\frac{2}{3}x^{3/2}$ for $0 \\le x \\le 3$."),
    [
      ["integrand", "$y' = x^{1/2}$, so $\\sqrt{1 + y'^{2}} = \\sqrt{1 + x}$", 2, true],
      ["value", "$\\int_0^{3} \\sqrt{1 + x}\\,dx = \\frac{2}{3}(8 - 1) = \\frac{14}{3}$", 2, true],
    ]),
  short(m(AI, "transfer-uniform-centre", "transfer", 9, 180, "Interpret the mean of a random variable with density $f$ as a centre of mass, and use it to find the mean of the uniform distribution on $[a, b]$."),
    [
      ["interpret", "$\\mathbb{E}[X] = \\int xf(x)\\,dx$ is the balance point of a rod with density $f$ and total mass $1$", 2, true],
      ["uniform", "$\\int_a^b \\frac{x}{b - a}\\,dx = \\frac{a + b}{2}$", 2, true],
    ]),
  num(m(AI, "apply-catenary-length", "apply", 9, 90, "Find the arc length of $y = \\cosh x = \\frac{e^{x} + e^{-x}}{2}$ for $0 \\le x \\le 1$. Give $3$ decimal places."), 1.175),
  mcq(m(AI, "transfer-gabriel", "transfer", 9, 90, "Rotating $y = \\frac{1}{x}$, $x \\ge 1$, about the $x$-axis gives Gabriel's horn, which has:"),
    "Finite volume $\\pi$ but infinite surface area",
    [
      ["Infinite volume and infinite surface area", "gabriel-both-infinite", "$\\int_1^{\\infty} \\frac{\\pi}{x^{2}}\\,dx = \\pi$."],
      ["Finite volume and finite surface area", "gabriel-both-finite", "The area integral is at least $\\int_1^{\\infty} \\frac{2\\pi}{x}\\,dx$, which diverges."],
      ["Infinite volume but finite surface area", "gabriel-swapped", "It's the other way round."],
    ]),
  // level 10
  short(m(AI, "transfer-steinmetz", "transfer", 10, 180, "Find the volume common to the cylinders $x^{2} + y^{2} \\le 1$ and $x^{2} + z^{2} \\le 1$."),
    [
      ["section", "Cross-sections perpendicular to the $x$-axis are squares with side $2\\sqrt{1 - x^{2}}$", 2, true],
      ["integrate", "$V = \\int_{-1}^{1} 4(1 - x^{2})\\,dx = \\frac{16}{3}$", 2, true],
    ]),
  short(m(AI, "transfer-derive-shell", "transfer", 10, 180, "Derive the shell formula $V = \\int_a^b 2\\pi x f(x)\\,dx$ by approximating the volume of a thin cylindrical shell."),
    [
      ["shell", "A shell with radii $x$ and $x + \\Delta x$ and height $f(x)$ has volume $\\pi\\left((x + \\Delta x)^{2} - x^{2}\\right)f(x) = \\pi(2x\\Delta x + \\Delta x^{2})f(x) \\approx 2\\pi x f(x)\\Delta x$", 3, true],
      ["sum", "Summing the shells and letting $\\Delta x \\to 0$ gives the integral", 1, true],
    ]),
  num(m(AI, "transfer-steinmetz-value", "transfer", 10, 120, "Find the volume common to the cylinders $x^{2} + y^{2} \\le 1$ and $x^{2} + z^{2} \\le 1$. Give $3$ decimal places."), 5.333),
  mcq(m(AI, "transfer-root-horn", "transfer", 10, 120, "Rotating $y = \\frac{1}{\\sqrt{x}}$, $x \\ge 1$, about the $x$-axis gives a solid whose volume is:"),
    "Infinite, since $\\pi\\int_1^{\\infty} \\frac{dx}{x}$ diverges",
    [
      ["$\\pi$", "roothorn-pi", "That's for $y = \\frac{1}{x}$, where the integrand is $\\frac{\\pi}{x^{2}}$."],
      ["$2\\pi$", "roothorn-two-pi", "The integrand $\\frac{\\pi}{x}$ isn't integrable at infinity."],
      ["Finite, because $\\frac{1}{\\sqrt{x}} \\to 0$", "roothorn-terms", "Tending to $0$ isn't enough."],
    ]),
];

export const calc05Items: Item[] = [...partialFractions, ...improperIntegrals, ...applicationsOfIntegration];
