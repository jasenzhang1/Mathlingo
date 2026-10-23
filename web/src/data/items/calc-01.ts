import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./calc-shared";

/**
 * Calculus course, part 1: limits, evaluating limits, limits at infinity and
 * continuity. Forty questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// limits
// ---------------------------------------------------------------------------
const LM = "limits";
const limits: Item[] = [
  // level 1
  mcq(m(LM, "recall-meaning", "recall", 1, 15, "$\\lim_{x \\to a} f(x) = L$ means:"),
    "$f(x)$ gets arbitrarily close to $L$ as $x$ gets close to $a$ (with $x \\ne a$)",
    [
      ["$f(a) = L$", "limit-is-value", "The limit ignores the value at $a$; $f(a)$ may differ or be undefined."],
      ["$f(x) = L$ for some $x$ near $a$", "limit-attained", "Hitting $L$ once is neither necessary nor sufficient."],
      ["$f(x) \\le L$ for every $x$ near $a$", "limit-bound", "That describes an upper bound, not a limit."],
    ]),
  mcq(m(LM, "recall-two-sided", "recall", 1, 15, "The two-sided limit $\\lim_{x \\to a} f(x)$ exists exactly when:"),
    "Both one-sided limits exist and are equal",
    [
      ["$f(a)$ is defined", "two-sided-value", "The value at $a$ is irrelevant to the limit."],
      ["At least one one-sided limit exists", "two-sided-one", "Both sides are needed, and they must agree."],
      ["Both one-sided limits exist, possibly different", "two-sided-differ", "Different one-sided limits mean a jump: no two-sided limit."],
    ]),
  mcq(m(LM, "recall-left-notation", "recall", 1, 15, "$\\lim_{x \\to a^{-}} f(x)$ is the limit as $x$ approaches $a$:"),
    "Through values less than $a$",
    [
      ["Through values greater than $a$", "left-right-swap", "That's $a^{+}$, the right-hand limit."],
      ["Through negative values of $x$", "left-negative", "The minus sign refers to the side of $a$, not the sign of $x$."],
      ["Of the function $-f(x)$", "left-negate-f", "The superscript modifies $a$, not $f$."],
    ]),
  mcq(m(LM, "recall-delta-role", "recall", 1, 15, "In the $\\varepsilon$–$\\delta$ definition of $\\lim_{x \\to a} f(x) = L$, the number $\\delta$ controls:"),
    "How close $x$ must be to $a$",
    [
      ["How close $f(x)$ must be to $L$", "delta-epsilon-swap", "That's the role of $\\varepsilon$."],
      ["The gap between $f(a)$ and $L$", "delta-gap", "$f(a)$ doesn't appear in the definition."],
      ["The slope of $f$ near $a$", "delta-slope", "Slopes aren't part of the definition of a limit."],
    ]),
  // level 2
  num(m(LM, "apply-polynomial", "apply", 2, 20, "Find $\\lim_{x \\to 2} (x^{2} + 3x)$."), 10),
  num(m(LM, "apply-hole", "apply", 2, 20, "Find $\\lim_{x \\to 1} \\frac{x^{2} - 1}{x - 1}$."), 2),
  num(m(LM, "apply-left-piece", "apply", 2, 20, "Let $f(x) = 2x + 1$ for $x < 3$ and $f(x) = x^{2}$ for $x \\ge 3$. Find $\\lim_{x \\to 3^{-}} f(x)$."), 7),
  mcq(m(LM, "apply-value-irrelevant", "apply", 2, 20, "Let $f(x) = x + 1$ for $x \\ne 2$ and $f(2) = 10$. Then $\\lim_{x \\to 2} f(x)$ is:"),
    "$3$",
    [
      ["$10$", "value-not-limit", "$f(2)$ plays no part in the limit."],
      ["It does not exist", "dne-isolated-point", "One redefined point doesn't stop the nearby values approaching $3$."],
      ["$\\frac{13}{2}$", "average-limit-value", "There's no averaging; the nearby values approach $3$."],
    ]),
  // level 3
  num(m(LM, "apply-right-piece", "apply", 3, 25, "Let $f(x) = 2x + 1$ for $x < 3$ and $f(x) = x^{2}$ for $x \\ge 3$. Find $\\lim_{x \\to 3^{+}} f(x)$."), 9),
  mcq(m(LM, "apply-jump-dne", "apply", 3, 25, "Let $f(x) = 2x + 1$ for $x < 3$ and $f(x) = x^{2}$ for $x \\ge 3$. Then $\\lim_{x \\to 3} f(x)$:"),
    "Does not exist, since the one-sided limits $7$ and $9$ differ",
    [
      ["Equals $9$, because $f(3) = 9$", "jump-use-value", "The value at $3$ doesn't decide the limit."],
      ["Equals $8$, the average of the one-sided limits", "jump-average", "Disagreeing one-sided limits aren't averaged."],
      ["Equals $7$, the left-hand limit", "jump-pick-side", "A two-sided limit needs both sides to agree."],
    ]),
  num(m(LM, "apply-abs-right", "apply", 3, 25, "Find $\\lim_{x \\to 0^{+}} \\frac{|x|}{x}$."), 1),
  num(m(LM, "apply-factor-quadratic", "apply", 3, 25, "Find $\\lim_{x \\to -1} \\frac{x^{2} + 3x + 2}{x + 1}$."), 1),
  // level 4
  num(m(LM, "apply-delta-linear", "apply", 4, 30, "For $\\lim_{x \\to 2} (3x - 1) = 5$ and $\\varepsilon = 0.6$, what is the largest $\\delta$ such that $0 < |x - 2| < \\delta$ guarantees $|(3x - 1) - 5| < \\varepsilon$?"), 0.2),
  num(m(LM, "apply-delta-linear-2", "apply", 4, 30, "For $\\lim_{x \\to 1} (5x + 2) = 7$ and $\\varepsilon = 0.05$, what is the largest $\\delta$ that works?"), 0.01),
  num(m(LM, "apply-match-pieces", "apply", 4, 30, "Let $f(x) = x^{2} + k$ for $x < 1$ and $f(x) = 3x$ for $x \\ge 1$. For which $k$ does $\\lim_{x \\to 1} f(x)$ exist?"), 2),
  mcq(m(LM, "apply-which-dne", "apply", 4, 30, "Which limit does $\\textbf{NOT}$ exist?"),
    "$\\lim_{x \\to 0} \\sin\\left(\\frac{1}{x}\\right)$",
    [
      ["$\\lim_{x \\to 0} x\\sin\\left(\\frac{1}{x}\\right)$", "dne-damped", "The factor $x$ squeezes it to $0$."],
      ["$\\lim_{x \\to 0} \\frac{x^{2}}{x}$", "dne-undefined-at-point", "It equals $x$ away from $0$, so the limit is $0$."],
      ["$\\lim_{x \\to 1} \\frac{x^{2} - 1}{x - 1}$", "dne-zero-over-zero", "A $\\frac{0}{0}$ form can still have a limit; this one is $2$."],
    ]),
  // level 5
  short(m(LM, "explain-value-irrelevant", "explain", 5, 90, "Explain why the value $f(a)$ plays no role in whether $\\lim_{x \\to a} f(x)$ exists. Give an example."),
    [
      ["definition", "The definition only considers $x$ near $a$ with $x \\ne a$ (the condition $0 < |x - a|$), so $f(a)$ never enters", 2, true],
      ["example", "Gives an example such as a function with a hole or a single redefined point, whose limit exists but differs from (or exists without) $f(a)$", 1, false],
    ]),
  mcq(m(LM, "apply-infinite-meaning", "apply", 5, 40, "Writing $\\lim_{x \\to 0} \\frac{1}{x^{2}} = \\infty$ means:"),
    "The limit does not exist as a number, because $\\frac{1}{x^{2}}$ grows without bound",
    [
      ["The limit exists and equals the number $\\infty$", "infinity-number", "$\\infty$ is not a real number; the notation records how the limit fails."],
      ["$\\frac{1}{x^{2}}$ equals $\\infty$ at $x = 0$", "infinity-value", "The function is undefined at $0$."],
      ["Nothing can be said, since the function is undefined at $0$", "infinity-nothing", "Behaviour near $0$ is perfectly describable."],
    ]),
  mcq(m(LM, "apply-misleading-table", "apply", 5, 40, "A table of $\\sin\\left(\\frac{\\pi}{x}\\right)$ at $x = 0.1, 0.01, 0.001$ shows $0, 0, 0$. What is $\\lim_{x \\to 0} \\sin\\left(\\frac{\\pi}{x}\\right)$?"),
    "It does not exist: for example, at $x = \\frac{2}{4k + 1}$ the value is $1$",
    [
      ["$0$", "table-trust", "The sample points happen to hit zeros; others give $1$ or $-1$."],
      ["$1$", "table-pick-other", "The function keeps taking both $1$ and $-1$ arbitrarily close to $0$."],
      ["$\\pi$", "table-argument", "That's the numerator inside the sine, not a limit."],
    ]),
  num(m(LM, "apply-delta-quadratic", "apply", 5, 40, "To prove $\\lim_{x \\to 3} x^{2} = 9$, a standard proof takes $\\delta = \\min\\left(1, \\frac{\\varepsilon}{7}\\right)$. What $\\delta$ does it give for $\\varepsilon = 0.7$?"), 0.1),
  // level 6
  short(m(LM, "explain-prove-linear", "explain", 6, 120, "Prove from the $\\varepsilon$–$\\delta$ definition that $\\lim_{x \\to 4} (2x + 3) = 11$."),
    [
      ["setup", "Rewrites $|(2x + 3) - 11| = 2|x - 4|$", 2, true],
      ["choice", "Chooses $\\delta = \\frac{\\varepsilon}{2}$ (or smaller) and shows $0 < |x - 4| < \\delta$ gives $|f(x) - 11| < \\varepsilon$", 2, true],
    ]),
  num(m(LM, "apply-floor-left", "apply", 6, 45, "Let $\\lfloor x \\rfloor$ denote the greatest integer $\\le x$. Find $\\lim_{x \\to 2^{-}} \\lfloor x \\rfloor$."), 1),
  num(m(LM, "apply-fill-hole", "apply", 6, 45, "Let $g(x) = \\frac{x^{2} - 5x + 6}{x - 2}$ for $x \\ne 2$. What value should $g(2)$ be given so that $g(2) = \\lim_{x \\to 2} g(x)$?"), -1),
  mcq(m(LM, "apply-sign-near", "apply", 6, 45, "If $\\lim_{x \\to a} f(x) = 3$, which statement must be true?"),
    "$f(x) > 2$ for all $x \\ne a$ sufficiently close to $a$",
    [
      ["$f(a) = 3$", "sign-value", "The limit says nothing about $f(a)$."],
      ["$f(x) < 3$ for all $x$ near $a$", "sign-below", "$f$ may approach $3$ from above, or from both sides."],
      ["$f$ is defined at $a$", "sign-defined", "$f$ may be undefined at $a$."],
    ]),
  // level 7
  short(m(LM, "explain-abs-dne", "explain", 7, 120, "Show that $\\lim_{x \\to 0} \\frac{|x|}{x}$ does not exist."),
    [
      ["one-sided", "Computes the one-sided limits: $1$ from the right (where $|x| = x$) and $-1$ from the left (where $|x| = -x$)", 2, true],
      ["conclusion", "Concludes that since they differ, no single $L$ works (e.g. with $\\varepsilon < 1$ no $L$ is within $\\varepsilon$ of both $1$ and $-1$)", 2, true],
    ]),
  num(m(LM, "apply-largest-delta-square", "apply", 7, 60, "Find the largest $\\delta$ such that $|x - 2| < \\delta$ implies $|x^{2} - 4| < 0.5$. Give $3$ decimal places."), 0.121),
  num(m(LM, "transfer-find-a", "transfer", 7, 60, "Let $f(x) = \\frac{x^{2} + ax - 6}{x - 2}$. For which $a$ does $\\lim_{x \\to 2} f(x)$ exist?"), 1),
  mcq(m(LM, "transfer-rational-irrational", "transfer", 7, 60, "Let $f(x) = x$ for rational $x$ and $f(x) = 0$ for irrational $x$. Which statement is true?"),
    "$\\lim_{x \\to 0} f(x) = 0$, but $\\lim_{x \\to 1} f(x)$ does not exist",
    [
      ["No limit exists anywhere", "dirichlet-nowhere", "At $0$ both pieces approach $0$, so the limit is $0$."],
      ["The limit exists everywhere", "dirichlet-everywhere", "Near $1$, rationals give values near $1$ and irrationals give $0$."],
      ["$\\lim_{x \\to 1} f(x) = 1$ because $f(1) = 1$", "dirichlet-value", "The value at $1$ doesn't determine the limit."],
    ]),
  // level 8
  short(m(LM, "explain-prove-quadratic", "explain", 8, 150, "Prove from the $\\varepsilon$–$\\delta$ definition that $\\lim_{x \\to 3} x^{2} = 9$."),
    [
      ["factor", "Writes $|x^{2} - 9| = |x - 3|\\,|x + 3|$", 1, true],
      ["bound", "Restricts to $|x - 3| < 1$ so that $|x + 3| < 7$", 2, true],
      ["choice", "Chooses $\\delta = \\min\\left(1, \\frac{\\varepsilon}{7}\\right)$ and concludes $|x^{2} - 9| < 7\\delta \\le \\varepsilon$", 2, true],
    ]),
  num(m(LM, "apply-largest-delta-root", "apply", 8, 75, "For $\\lim_{x \\to 9} \\sqrt{x} = 3$ and $\\varepsilon = 1$, find the largest $\\delta$ such that $0 < |x - 9| < \\delta$ guarantees $|\\sqrt{x} - 3| < 1$."), 5),
  num(m(LM, "apply-root-difference", "apply", 8, 75, "Find $\\lim_{x \\to 0} \\frac{\\sqrt{1 + x} - \\sqrt{1 - x}}{x}$."), 1),
  mcq(m(LM, "recall-negation", "recall", 8, 75, "$\\lim_{x \\to a} f(x) \\ne L$ means:"),
    "There is an $\\varepsilon > 0$ such that for every $\\delta > 0$, some $x$ with $0 < |x - a| < \\delta$ has $|f(x) - L| \\ge \\varepsilon$",
    [
      ["For every $\\varepsilon > 0$ there is a $\\delta > 0$ with $|f(x) - L| \\ge \\varepsilon$ whenever $0 < |x - a| < \\delta$", "negation-keep-order", "Negation swaps the quantifiers: “for all $\\varepsilon$” becomes “there exists $\\varepsilon$”."],
      ["For every $\\varepsilon > 0$ and $\\delta > 0$, every $x$ with $0 < |x - a| < \\delta$ has $|f(x) - L| \\ge \\varepsilon$", "negation-all-x", "One bad $x$ per window is enough; not every $x$ must be bad."],
      ["$f(a) \\ne L$", "negation-value", "The limit can equal $L$ even when $f(a) \\ne L$."],
    ]),
  // level 9
  short(m(LM, "explain-uniqueness", "explain", 9, 180, "Prove that a limit, if it exists, is unique: if $\\lim_{x \\to a} f(x) = L$ and $\\lim_{x \\to a} f(x) = M$, then $L = M$."),
    [
      ["assume", "Assumes $L \\ne M$ and takes $\\varepsilon = \\frac{|L - M|}{2}$", 2, true],
      ["triangle", "For $x$ close enough to $a$ (within the smaller $\\delta$), $|L - M| \\le |L - f(x)| + |f(x) - M| < 2\\varepsilon = |L - M|$, a contradiction", 2, true],
    ]),
  short(m(LM, "explain-prove-reciprocal", "explain", 9, 180, "Prove from the $\\varepsilon$–$\\delta$ definition that $\\lim_{x \\to 2} \\frac{1}{x} = \\frac{1}{2}$."),
    [
      ["rewrite", "Writes $\\left|\\frac{1}{x} - \\frac{1}{2}\\right| = \\frac{|x - 2|}{2|x|}$", 1, true],
      ["bound", "Restricts to $|x - 2| < 1$ so that $|x| > 1$ and the expression is below $\\frac{|x - 2|}{2}$", 2, true],
      ["choice", "Chooses $\\delta = \\min(1, 2\\varepsilon)$ and concludes", 2, true],
    ]),
  num(m(LM, "transfer-root-ratio", "transfer", 9, 90, "Find $\\lim_{x \\to 1} \\frac{\\sqrt[3]{\\,x} - 1}{\\sqrt{x} - 1}$. Give $2$ decimal places."), 0.67),
  mcq(m(LM, "transfer-sum-exists", "transfer", 9, 90, "If $\\lim_{x \\to a} [f(x) + g(x)]$ exists, which must be true?"),
    "Neither $\\lim_{x \\to a} f(x)$ nor $\\lim_{x \\to a} g(x)$ need exist",
    [
      ["Both $\\lim f$ and $\\lim g$ exist", "sum-both", "$f = \\frac{1}{x}$, $g = -\\frac{1}{x}$ at $0$: the sum is $0$, neither piece has a limit."],
      ["At least one of $\\lim f$, $\\lim g$ exists", "sum-one", "If one existed, the other would too (as a difference); the example has neither."],
      ["$f$ and $g$ are both continuous at $a$", "sum-continuous", "Continuity is much stronger and not implied."],
    ]),
  // level 10
  short(m(LM, "transfer-plus-minus-x", "transfer", 10, 180, "Let $f(x) = x$ if $x$ is rational and $f(x) = -x$ if $x$ is irrational. At which points $a$ does $\\lim_{x \\to a} f(x)$ exist? Prove your answer."),
    [
      ["zero", "At $a = 0$ the limit is $0$, since $|f(x)| = |x|$ and squeezing gives $f(x) \\to 0$", 2, true],
      ["elsewhere", "At $a \\ne 0$ there are rationals near $a$ (values near $a$) and irrationals near $a$ (values near $-a$), and $a \\ne -a$, so no limit exists", 2, true],
    ]),
  short(m(LM, "transfer-sign-preservation", "transfer", 10, 180, "Prove that if $\\lim_{x \\to a} f(x) = L > 0$, then $f(x) > \\frac{L}{2}$ for all $x \\ne a$ sufficiently close to $a$. Why is this useful?"),
    [
      ["proof", "Takes $\\varepsilon = \\frac{L}{2}$: there is a $\\delta$ with $|f(x) - L| < \\frac{L}{2}$, hence $f(x) > \\frac{L}{2}$, whenever $0 < |x - a| < \\delta$", 3, true],
      ["use", "Notes a use, e.g. it keeps a denominator away from $0$ in the quotient law, or shows a positive limit forces positive values nearby", 1, false],
    ]),
  num(m(LM, "transfer-largest-delta-reciprocal", "transfer", 10, 120, "Find the largest $\\delta$ such that $0 < |x - 1| < \\delta$ implies $\\left|\\frac{1}{x} - 1\\right| < 0.5$. Give $3$ decimal places."), 0.333),
  mcq(m(LM, "transfer-swapped-quantifiers", "transfer", 10, 120, "Suppose the definition were changed to: “there is a $\\delta > 0$ such that for every $\\varepsilon > 0$, $0 < |x - a| < \\delta$ implies $|f(x) - L| < \\varepsilon$.” What would this condition say?"),
    "$f(x) = L$ for every $x$ in some punctured neighbourhood of $a$",
    [
      ["The same as the usual definition", "swap-same", "Quantifier order matters: one $\\delta$ for every $\\varepsilon$ forces $|f(x) - L| = 0$."],
      ["$f$ is continuous at $a$", "swap-continuous", "It says nothing about $f(a)$ and much more about nearby values."],
      ["$f$ is bounded near $a$", "swap-bounded", "It forces $f$ to be exactly constant near $a$, far stronger than boundedness."],
    ]),
];

// ---------------------------------------------------------------------------
// evaluating-limits
// ---------------------------------------------------------------------------
const EL = "evaluating-limits";
const evaluatingLimits: Item[] = [
  // level 1
  mcq(m(EL, "recall-product-law", "recall", 1, 15, "If $\\lim_{x \\to a} f(x) = L$ and $\\lim_{x \\to a} g(x) = M$, then $\\lim_{x \\to a} f(x)g(x)$ equals:"),
    "$LM$",
    [
      ["$L + M$", "product-sum", "That's the sum law."],
      ["$LM$, but only for polynomials", "product-polynomial", "The law holds for any $f, g$ whose limits exist."],
      ["$f(a)g(a)$", "product-value", "Values at $a$ needn't equal the limits."],
    ]),
  mcq(m(EL, "recall-zero-over-zero", "recall", 1, 15, "When direct substitution into a limit gives $\\frac{0}{0}$:"),
    "The form is indeterminate, and more work is needed",
    [
      ["The limit is $0$", "zoz-zero", "$\\frac{x^{2}}{x}$ and $\\frac{x}{x}$ both give $\\frac{0}{0}$, with limits $0$ and $1$."],
      ["The limit is $1$", "zoz-one", "$\\frac{0}{0}$ is not a number and doesn't simplify to $1$."],
      ["The limit does not exist", "zoz-dne", "Many $\\frac{0}{0}$ limits exist."],
    ]),
  mcq(m(EL, "recall-squeeze", "recall", 1, 15, "The squeeze theorem concludes $\\lim_{x \\to a} f(x) = L$ from:"),
    "$g(x) \\le f(x) \\le h(x)$ near $a$, with $\\lim g = \\lim h = L$",
    [
      ["$g(x) \\le f(x)$ near $a$ with $\\lim g = L$", "squeeze-one-side", "A lower bound alone doesn't pin $f$ down."],
      ["$f$ is bounded near $a$", "squeeze-bounded", "Bounded functions like $\\sin\\left(\\frac{1}{x}\\right)$ can fail to have limits."],
      ["$g(x) \\le f(x) \\le h(x)$ with $\\lim g \\ne \\lim h$", "squeeze-different", "The bounds must meet at the same limit."],
    ]),
  mcq(m(EL, "recall-sin-limit", "recall", 1, 15, "With $x$ in radians, $\\lim_{x \\to 0} \\frac{\\sin x}{x}$ equals:"),
    "$1$",
    [
      ["$0$", "sinx-zero", "Both top and bottom go to $0$, but their ratio goes to $1$."],
      ["It does not exist", "sinx-dne", "The squeeze theorem shows it is $1$."],
      ["$\\frac{\\pi}{180}$", "sinx-degrees", "That would be the answer in degrees, not radians."],
    ]),
  // level 2
  num(m(EL, "apply-factor-squares", "apply", 2, 20, "Find $\\lim_{x \\to 4} \\frac{x^{2} - 16}{x - 4}$."), 8),
  num(m(EL, "apply-substitute", "apply", 2, 20, "Find $\\lim_{x \\to 2} \\frac{x^{3} - 2x}{x + 2}$."), 1),
  num(m(EL, "apply-sin-scaled", "apply", 2, 20, "Find $\\lim_{x \\to 0} \\frac{\\sin(5x)}{x}$."), 5),
  mcq(m(EL, "apply-nonzero-over-zero", "apply", 2, 20, "Direct substitution in $\\lim_{x \\to 1} \\frac{x + 1}{x - 1}$ gives $\\frac{2}{0}$. The limit:"),
    "Does not exist: the one-sided limits are $-\\infty$ and $+\\infty$",
    [
      ["Is $0$", "nz-zero", "A nonzero numerator over a vanishing denominator blows up."],
      ["Is $2$", "nz-numerator", "The denominator can't be ignored."],
      ["Is indeterminate, so factor and cancel", "nz-indeterminate", "$\\frac{2}{0}$ is not indeterminate; there is nothing to cancel."],
    ]),
  // level 3
  num(m(EL, "apply-factor-both", "apply", 3, 25, "Find $\\lim_{x \\to -2} \\frac{x^{2} + 5x + 6}{x^{2} - 4}$."), -0.25),
  num(m(EL, "apply-rationalise", "apply", 3, 25, "Find $\\lim_{x \\to 0} \\frac{\\sqrt{x + 1} - 1}{x}$."), 0.5),
  num(m(EL, "apply-sin-ratio", "apply", 3, 25, "Find $\\lim_{x \\to 0} \\frac{\\sin(3x)}{\\sin(2x)}$."), 1.5),
  mcq(m(EL, "apply-squeeze-cos", "apply", 3, 25, "$\\lim_{x \\to 0} x^{2}\\cos\\left(\\frac{1}{x}\\right)$ equals:"),
    "$0$, by squeezing between $-x^{2}$ and $x^{2}$",
    [
      ["It does not exist, because $\\cos\\left(\\frac{1}{x}\\right)$ oscillates", "squeeze-oscillation", "The factor $x^{2}$ damps the oscillation to $0$."],
      ["$1$", "squeeze-cos-one", "$\\cos\\left(\\frac{1}{x}\\right)$ has no limit, and the product goes to $0$."],
      ["$0$, because the expression equals $0$ at $x = 0$", "squeeze-value", "The expression is undefined at $0$."],
    ]),
  // level 4
  num(m(EL, "apply-compound-fraction", "apply", 4, 30, "Find $\\lim_{x \\to 2} \\frac{\\frac{1}{x} - \\frac{1}{2}}{x - 2}$."), -0.25),
  num(m(EL, "apply-cubic-over-quadratic", "apply", 4, 30, "Find $\\lim_{x \\to 1} \\frac{x^{3} - 1}{x^{2} - 1}$."), 1.5),
  num(m(EL, "apply-limit-laws", "apply", 4, 30, "If $\\lim_{x \\to 2} f(x) = 3$ and $\\lim_{x \\to 2} g(x) = -1$, find $\\lim_{x \\to 2} \\frac{f(x)^{2}}{g(x) + 2}$."), 9),
  mcq(m(EL, "apply-invalid-split", "apply", 4, 30, "A student writes $\\lim_{x \\to 0} x \\cdot \\frac{1}{x} = \\left(\\lim_{x \\to 0} x\\right)\\left(\\lim_{x \\to 0} \\frac{1}{x}\\right) = 0$. What is wrong?"),
    "The product law needs both limits to exist, and $\\lim_{x \\to 0} \\frac{1}{x}$ does not",
    [
      ["Nothing; the answer $0$ is correct", "split-correct", "$x \\cdot \\frac{1}{x} = 1$ for $x \\ne 0$, so the limit is $1$."],
      ["The product law only applies to polynomials", "split-polynomial", "It applies to any functions whose limits exist."],
      ["$\\lim_{x \\to 0} x$ is not $0$", "split-x-limit", "$\\lim_{x \\to 0} x = 0$ is fine; the other factor is the problem."],
    ]),
  // level 5
  short(m(EL, "explain-cancel", "explain", 5, 90, "Explain why cancelling $(x - 3)$ in $\\frac{x^{2} - 9}{x - 3}$ is legitimate when computing $\\lim_{x \\to 3}$, even though dividing by $x - 3$ is not allowed at $x = 3$."),
    [
      ["agree", "The two expressions agree for every $x \\ne 3$, which is where cancelling is valid", 2, true],
      ["limit", "A limit only depends on values with $x \\ne 3$, so functions that agree away from $3$ have the same limit there", 2, true],
    ]),
  mcq(m(EL, "apply-squeeze-bounds", "apply", 5, 40, "Which bounds work in the squeeze theorem to show $\\lim_{x \\to 0} x\\sin\\left(\\frac{1}{x}\\right) = 0$?"),
    "$-|x| \\le x\\sin\\left(\\frac{1}{x}\\right) \\le |x|$",
    [
      ["$-x \\le x\\sin\\left(\\frac{1}{x}\\right) \\le x$", "bounds-sign", "For $x < 0$ these bounds are in the wrong order."],
      ["$-1 \\le x\\sin\\left(\\frac{1}{x}\\right) \\le 1$", "bounds-unequal", "The bounds have different limits, so nothing is squeezed."],
      ["$0 \\le x\\sin\\left(\\frac{1}{x}\\right) \\le x^{2}$", "bounds-false", "The expression takes negative values, so the lower bound fails."],
    ]),
  mcq(m(EL, "apply-tan-limit", "apply", 5, 40, "$\\lim_{x \\to 0} \\frac{\\tan x}{x}$ equals:"),
    "$1$",
    [
      ["$0$", "tan-zero", "$\\frac{\\tan x}{x} = \\frac{\\sin x}{x} \\cdot \\frac{1}{\\cos x} \\to 1 \\cdot 1$."],
      ["$\\infty$", "tan-infinite", "$\\tan x$ blows up at $\\frac{\\pi}{2}$, not at $0$."],
      ["It does not exist", "tan-dne", "Both one-sided limits are $1$."],
    ]),
  num(m(EL, "apply-one-minus-cos", "apply", 5, 40, "Find $\\lim_{x \\to 0} \\frac{1 - \\cos(4x)}{x^{2}}$."), 8),
  // level 6
  short(m(EL, "explain-sin-squeeze", "explain", 6, 120, "Explain how the squeeze theorem shows $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$."),
    [
      ["inequality", "States the inequality $\\cos x \\le \\frac{\\sin x}{x} \\le 1$ near $0$ (from comparing areas of triangles and a sector)", 2, true],
      ["squeeze", "Both bounds tend to $1$, so the middle does too", 2, true],
    ]),
  num(m(EL, "apply-root-denominator", "apply", 6, 45, "Find $\\lim_{x \\to 4} \\frac{x - 4}{\\sqrt{x} - 2}$."), 4),
  num(m(EL, "apply-expand-square", "apply", 6, 45, "Find $\\lim_{h \\to 0} \\frac{(3 + h)^{2} - 9}{h}$."), 6),
  mcq(m(EL, "apply-forced-limit", "apply", 6, 45, "Suppose $\\lim_{x \\to 1} \\frac{f(x) - 5}{x - 1} = 2$. Then $\\lim_{x \\to 1} f(x)$ is:"),
    "$5$",
    [
      ["$2$", "forced-ratio", "$2$ is the limit of the ratio, not of $f$."],
      ["$7$", "forced-add", "$f(x) - 5 = (x - 1) \\cdot \\frac{f(x) - 5}{x - 1} \\to 0 \\cdot 2 = 0$."],
      ["It cannot be determined", "forced-unknown", "The numerator must tend to $0$ for the ratio to have a finite limit."],
    ]),
  // level 7
  short(m(EL, "explain-sin-ratio", "explain", 7, 120, "Evaluate $\\lim_{x \\to 0} \\frac{\\sin(7x)}{\\sin(3x)}$, justifying each step."),
    [
      ["rewrite", "Rewrites as $\\frac{7}{3} \\cdot \\frac{\\sin 7x}{7x} \\cdot \\frac{3x}{\\sin 3x}$", 2, true],
      ["limits", "Uses $\\frac{\\sin u}{u} \\to 1$ for each factor and the product law to get $\\frac{7}{3}$", 2, true],
    ]),
  num(m(EL, "apply-rationalise-shift", "apply", 7, 60, "Find $\\lim_{x \\to 1} \\frac{\\sqrt{x + 3} - 2}{x - 1}$."), 0.25),
  num(m(EL, "apply-square-over-cos", "apply", 7, 60, "Find $\\lim_{x \\to 0} \\frac{x^{2}}{1 - \\cos x}$."), 2),
  mcq(m(EL, "transfer-squeeze-polys", "transfer", 7, 60, "Suppose $2x \\le f(x) \\le x^{2} + 1$ for all $x$. What is $\\lim_{x \\to 1} f(x)$?"),
    "$2$",
    [
      ["It cannot be determined without a formula for $f$", "squeeze-need-formula", "Both bounds tend to $2$, which forces $f$ to $2$."],
      ["$1$", "squeeze-wrong-eval", "Both bounds equal $2$ at $x = 1$."],
      ["Any value in $[2, 2.5]$", "squeeze-range", "The bounds meet, so the limit is exactly $2$."],
    ]),
  // level 8
  short(m(EL, "explain-bounded-times-zero", "explain", 8, 150, "Prove that if $\\lim_{x \\to a} f(x) = 0$ and $|g(x)| \\le M$ near $a$, then $\\lim_{x \\to a} f(x)g(x) = 0$."),
    [
      ["bound", "Notes $0 \\le |f(x)g(x)| \\le M|f(x)|$ (or $-M|f| \\le fg \\le M|f|$)", 2, true],
      ["squeeze", "Since $|f(x)| \\to 0$, the bound tends to $0$ and the squeeze theorem gives $f(x)g(x) \\to 0$", 2, true],
    ]),
  num(m(EL, "apply-tan-minus-sin", "apply", 8, 75, "Find $\\lim_{x \\to 0} \\frac{\\tan x - \\sin x}{x^{3}}$."), 0.5),
  num(m(EL, "apply-cube-root", "apply", 8, 75, "Find $\\lim_{x \\to 8} \\frac{\\sqrt[3]{\\,x} - 2}{x - 8}$. Give $4$ decimal places."), 0.0833),
  mcq(m(EL, "apply-abs-rational", "apply", 8, 75, "$\\lim_{x \\to 0} \\frac{|x|}{x^{2} + x}$:"),
    "Does not exist: the one-sided limits are $1$ and $-1$",
    [
      ["Equals $1$", "abs-right-only", "That is only the right-hand limit."],
      ["Equals $0$", "abs-zero", "Cancelling $x$ leaves $\\frac{\\pm 1}{x + 1}$, which tends to $\\pm 1$."],
      ["Is $\\infty$", "abs-infinite", "The common factor $x$ cancels, so there's no blow-up."],
    ]),
  // level 9
  short(m(EL, "explain-cos-limit", "explain", 9, 180, "Using $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$, prove that $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0$."),
    [
      ["conjugate", "Multiplies by $1 + \\cos x$ to get $\\frac{\\sin^{2} x}{x(1 + \\cos x)}$", 2, true],
      ["split", "Writes it as $\\frac{\\sin x}{x} \\cdot \\frac{\\sin x}{1 + \\cos x} \\to 1 \\cdot \\frac{0}{2} = 0$", 2, true],
    ]),
  short(m(EL, "explain-root-continuity", "explain", 9, 180, "Explain why $\\lim_{x \\to a} \\sqrt{f(x)} = \\sqrt{\\lim_{x \\to a} f(x)}$ when the limit $L$ of $f$ is positive. What property of the square root is being used?"),
    [
      ["continuity", "The square root is continuous at $L > 0$", 2, true],
      ["composition", "A continuous outer function can be moved through the limit: $\\lim g(f(x)) = g(\\lim f(x))$", 2, true],
    ]),
  num(m(EL, "transfer-power-ratio", "transfer", 9, 90, "Find $\\lim_{x \\to 1} \\frac{x^{10} - 1}{x^{4} - 1}$."), 2.5),
  mcq(m(EL, "transfer-rescale", "transfer", 9, 90, "Suppose $\\lim_{x \\to 0} \\frac{f(x)}{x} = 3$. What is $\\lim_{x \\to 0} \\frac{f(2x)}{x}$?"),
    "$6$",
    [
      ["$3$", "rescale-same", "$\\frac{f(2x)}{x} = 2 \\cdot \\frac{f(2x)}{2x}$, and the second factor tends to $3$."],
      ["$\\frac{3}{2}$", "rescale-divide", "The factor $2$ multiplies, it doesn't divide."],
      ["$12$", "rescale-square", "Only one factor of $2$ appears."],
    ]),
  // level 10
  short(m(EL, "transfer-prove-sin-limit", "transfer", 10, 180, "Prove $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$, including where the key inequality comes from and how negative $x$ is handled."),
    [
      ["geometry", "For $0 < x < \\frac{\\pi}{2}$, compares a triangle, a sector and a larger triangle in the unit circle to get $\\sin x \\le x \\le \\tan x$", 2, true],
      ["invert", "Rearranges to $\\cos x \\le \\frac{\\sin x}{x} \\le 1$ and squeezes", 1, true],
      ["negative", "Handles $x < 0$ by evenness: $\\frac{\\sin(-x)}{-x} = \\frac{\\sin x}{x}$", 1, true],
    ]),
  short(m(EL, "transfer-laws-hypotheses", "transfer", 10, 180, "The limit laws require each individual limit to exist. Give an example where $\\lim (f + g)$ exists but neither $\\lim f$ nor $\\lim g$ does, and one where splitting a quotient gives a wrong answer."),
    [
      ["sum", "A valid sum example, e.g. $f = \\frac{1}{x}$, $g = -\\frac{1}{x}$ at $0$, or $\\sin\\frac{1}{x}$ and $-\\sin\\frac{1}{x}$", 2, true],
      ["quotient", "A valid quotient example, e.g. $\\frac{x}{x}$ where both limits are $0$ and $\\frac{0}{0}$ is meaningless, though the limit is $1$", 2, true],
    ]),
  num(m(EL, "transfer-root-tan-sin", "transfer", 10, 120, "Find $\\lim_{x \\to 0} \\frac{\\sqrt{1 + \\tan x} - \\sqrt{1 + \\sin x}}{x^{3}}$."), 0.25),
  mcq(m(EL, "transfer-not-always", "transfer", 10, 120, "Assume all the limits written exist. Which statement is $\\textbf{NOT}$ always true?"),
    "$\\lim \\frac{f}{g} = \\frac{\\lim f}{\\lim g}$",
    [
      ["$\\lim |f| = \\left|\\lim f\\right|$", "nat-abs", "True: $|\\cdot|$ is continuous."],
      ["If $\\lim |f| = 0$ then $\\lim f = 0$", "nat-abs-zero", "True, by squeezing $-|f| \\le f \\le |f|$."],
      ["If $f \\le g$ near $a$ then $\\lim f \\le \\lim g$", "nat-order", "True: limits preserve non-strict inequalities."],
    ]),
];

// ---------------------------------------------------------------------------
// limits-at-infinity
// ---------------------------------------------------------------------------
const LI = "limits-at-infinity";
const limitsAtInfinity: Item[] = [
  // level 1
  mcq(m(LI, "recall-meaning", "recall", 1, 15, "$\\lim_{x \\to \\infty} f(x) = L$ means:"),
    "$f(x)$ approaches $L$ as $x$ grows without bound",
    [
      ["$f(\\infty) = L$", "inf-evaluate", "$\\infty$ isn't in the domain; the limit describes a trend."],
      ["$f(x) = L$ for all large $x$", "inf-eventually-equal", "$f$ need only get close to $L$, not equal it."],
      ["$L$ is the largest value of $f$", "inf-maximum", "End behaviour is unrelated to the maximum."],
    ]),
  mcq(m(LI, "recall-horizontal", "recall", 1, 15, "The line $y = L$ is a horizontal asymptote of $f$ when:"),
    "$\\lim_{x \\to \\infty} f(x) = L$ or $\\lim_{x \\to -\\infty} f(x) = L$",
    [
      ["$f(x)$ never equals $L$", "ha-never-cross", "Graphs can cross horizontal asymptotes."],
      ["$f(x) \\to \\infty$ as $x \\to L$", "ha-vertical", "That's a vertical asymptote at $x = L$."],
      ["The denominator of $f$ is zero at $L$", "ha-denominator", "That locates vertical asymptotes."],
    ]),
  mcq(m(LI, "recall-vertical", "recall", 1, 15, "The line $x = a$ is a vertical asymptote of $f$ when:"),
    "$f(x) \\to \\pm\\infty$ as $x \\to a^{-}$ or $x \\to a^{+}$",
    [
      ["$f(a) = 0$", "va-root", "A zero of $f$ is an intercept."],
      ["$f$ is undefined at $a$", "va-undefined", "An undefined point may be a hole."],
      ["$\\lim_{x \\to \\infty} f(x) = a$", "va-horizontal", "That gives a horizontal asymptote."],
    ]),
  mcq(m(LI, "recall-fastest", "recall", 1, 15, "Which grows fastest as $x \\to \\infty$?"),
    "$e^{x}$",
    [
      ["$x^{100}$", "growth-power", "Every power eventually loses to an exponential."],
      ["$\\ln x$", "growth-log", "Logarithms grow slowest of all."],
      ["$x\\ln x$", "growth-xlogx", "That grows only a little faster than $x$."],
    ]),
  // level 2
  num(m(LI, "apply-equal-degree", "apply", 2, 20, "Find $\\lim_{x \\to \\infty} \\frac{4x^{2} + 1}{2x^{2} - 3x}$."), 2),
  num(m(LI, "apply-lower-degree", "apply", 2, 20, "Find $\\lim_{x \\to \\infty} \\frac{5x + 2}{x^{2} + 1}$."), 0),
  num(m(LI, "apply-minus-infinity", "apply", 2, 20, "Find $\\lim_{x \\to -\\infty} \\frac{6x^{3} + x}{2x^{3} - 5}$."), 3),
  mcq(m(LI, "apply-asymptote", "apply", 2, 20, "The horizontal asymptote of $\\frac{2x + 1}{x - 3}$ is:"),
    "$y = 2$",
    [
      ["$x = 3$", "asym-vertical", "That's the vertical asymptote."],
      ["$y = -\\frac{1}{3}$", "asym-constants", "Use the leading coefficients, not the constant terms."],
      ["There is none", "asym-none", "Equal degrees give a horizontal asymptote."],
    ]),
  // level 3
  num(m(LI, "apply-vertical-location", "apply", 3, 25, "The function $\\frac{x + 1}{x - 4}$ has a vertical asymptote $x = a$. Find $a$."), 4),
  num(m(LI, "apply-vertical-after-cancel", "apply", 3, 25, "The function $\\frac{x^{2} - 9}{x^{2} - 2x - 3}$ has one vertical asymptote $x = a$. Find $a$."), -1),
  num(m(LI, "apply-hole-value", "apply", 3, 25, "The function $\\frac{x^{2} - 9}{x^{2} - 2x - 3}$ has a hole at $x = 3$. What value does it approach there?"), 1.5),
  mcq(m(LI, "apply-one-sided-blowup", "apply", 3, 25, "As $x \\to 2^{+}$, $\\frac{1}{x - 2}$:"),
    "Increases without bound ($+\\infty$)",
    [
      ["Decreases without bound ($-\\infty$)", "blowup-sign", "For $x > 2$ the denominator is a small positive number."],
      ["Approaches $0$", "blowup-zero", "A small denominator makes the fraction large."],
      ["Approaches $\\frac{1}{2}$", "blowup-substitute", "Substituting $2$ into the denominator gives $0$, not $2$."],
    ]),
  // level 4
  num(m(LI, "apply-conjugate", "apply", 4, 30, "Find $\\lim_{x \\to \\infty} \\left(\\sqrt{x^{2} + 4x} - x\\right)$."), 2),
  num(m(LI, "apply-root-plus", "apply", 4, 30, "Find $\\lim_{x \\to \\infty} \\frac{\\sqrt{9x^{2} + 1}}{x + 2}$."), 3),
  num(m(LI, "apply-root-minus", "apply", 4, 30, "Find $\\lim_{x \\to -\\infty} \\frac{\\sqrt{9x^{2} + 1}}{x + 2}$."), -3),
  mcq(m(LI, "apply-slant", "apply", 4, 30, "As $x \\to \\infty$, the graph of $\\frac{x^{3} + 1}{x^{2}}$:"),
    "Approaches the slant asymptote $y = x$",
    [
      ["Approaches the horizontal asymptote $y = 1$", "slant-ratio", "The numerator has higher degree, so the ratio grows."],
      ["Approaches $y = 0$", "slant-zero", "$\\frac{x^{3} + 1}{x^{2}} = x + \\frac{1}{x^{2}}$ grows like $x$."],
      ["Approaches no line", "slant-none", "It approaches $y = x$, since the difference $\\frac{1}{x^{2}} \\to 0$."],
    ]),
  // level 5
  short(m(LI, "explain-divide-top-power", "explain", 5, 90, "Explain why dividing numerator and denominator by the highest power of $x$ in the denominator reveals $\\lim_{x \\to \\infty}$ of a rational function."),
    [
      ["vanish", "After dividing, each term of the form $\\frac{c}{x^{k}}$ with $k > 0$ tends to $0$", 2, true],
      ["dominant", "What remains are the leading terms, so the leading terms decide the limit; the expression's value is unchanged by the division", 2, true],
    ]),
  mcq(m(LI, "apply-cross-asymptote", "apply", 5, 40, "Can a graph cross its horizontal asymptote?"),
    "Yes — $\\frac{\\sin x}{x}$ crosses $y = 0$ infinitely often",
    [
      ["No, never", "cross-never", "That rule applies to nothing; vertical asymptotes can't be crossed, horizontal ones can."],
      ["Only once", "cross-once", "$\\frac{\\sin x}{x}$ crosses infinitely many times."],
      ["Only if $f$ is a polynomial", "cross-polynomial", "Non-constant polynomials have no horizontal asymptotes."],
    ]),
  mcq(m(LI, "apply-power-vs-exp", "apply", 5, 40, "$\\lim_{x \\to \\infty} \\frac{x^{50}}{1.01^{x}}$ equals:"),
    "$0$",
    [
      ["$\\infty$", "power-exp-infinite", "Any exponential with base $> 1$ eventually beats any power."],
      ["$1$", "power-exp-one", "The ratio doesn't level off at $1$."],
      ["It does not exist", "power-exp-dne", "The ratio decreases to $0$ for large $x$."],
    ]),
  num(m(LI, "apply-x-sin-reciprocal", "apply", 5, 40, "Find $\\lim_{x \\to \\infty} x\\sin\\left(\\frac{1}{x}\\right)$."), 1),
  // level 6
  short(m(LI, "explain-infinity-minus-infinity", "explain", 6, 120, "Why does $\\lim_{x \\to \\infty} \\left(\\sqrt{x^{2} + x} - x\\right)$ need algebraic manipulation, and what is its value?"),
    [
      ["indeterminate", "It is an $\\infty - \\infty$ form, which is indeterminate", 1, true],
      ["conjugate", "Multiplies by the conjugate to get $\\frac{x}{\\sqrt{x^{2} + x} + x}$, then divides by $x$", 2, true],
      ["value", "Gets $\\frac{1}{2}$", 1, true],
    ]),
  num(m(LI, "apply-exponential-ratio", "apply", 6, 45, "Find $\\lim_{x \\to \\infty} \\frac{5 \\cdot 3^{x} + 2^{x}}{3^{x} + 7}$."), 5),
  num(m(LI, "apply-squeeze-sin", "apply", 6, 45, "Find $\\lim_{x \\to \\infty} \\frac{x + \\sin x}{x}$."), 1),
  mcq(m(LI, "apply-damped-cos", "apply", 6, 45, "$\\lim_{x \\to \\infty} e^{-x}\\cos x$:"),
    "Equals $0$",
    [
      ["Does not exist, because $\\cos x$ oscillates", "damped-dne", "$|e^{-x}\\cos x| \\le e^{-x} \\to 0$."],
      ["Equals $1$", "damped-one", "The decaying factor wins."],
      ["Equals $-1$", "damped-minus-one", "The decaying factor wins."],
    ]),
  // level 7
  short(m(LI, "explain-two-asymptotes", "explain", 7, 120, "A function can have two different horizontal asymptotes. Give an example and explain how this is possible."),
    [
      ["both-ends", "The limits as $x \\to \\infty$ and $x \\to -\\infty$ are separate and can differ", 2, true],
      ["example", "A valid example, e.g. $\\arctan x$ ($\\pm\\frac{\\pi}{2}$), $\\frac{\\sqrt{x^{2} + 1}}{x}$ ($\\pm 1$) or $\\frac{|x|}{x + 1}$", 2, true],
    ]),
  num(m(LI, "apply-log-difference", "apply", 7, 60, "Find $\\lim_{x \\to \\infty} \\left[\\ln(3x + 1) - \\ln x\\right]$. Give $3$ decimal places."), 1.099),
  num(m(LI, "apply-x-times-conjugate", "apply", 7, 60, "Find $\\lim_{x \\to \\infty} x\\left(\\sqrt{x^{2} + 1} - x\\right)$."), 0.5),
  mcq(m(LI, "transfer-one-sided-asymptote", "transfer", 7, 60, "Which function has $y = 0$ as a horizontal asymptote as $x \\to \\infty$ but $\\textbf{NOT}$ as $x \\to -\\infty$?"),
    "$e^{-x}$",
    [
      ["$\\frac{1}{x}$", "one-sided-both", "$\\frac{1}{x} \\to 0$ at both ends."],
      ["$\\arctan x$", "one-sided-arctan", "$\\arctan x \\to \\frac{\\pi}{2}$, not $0$, as $x \\to \\infty$."],
      ["$xe^{x}$", "one-sided-reversed", "$xe^{x} \\to 0$ only as $x \\to -\\infty$ — the opposite end."],
    ]),
  // level 8
  short(m(LI, "explain-rank-growth", "explain", 8, 150, "Rank $(\\ln x)^{5}$, $x^{0.1}$, $1.001^{x}$ and $x^{x}$ from slowest to fastest growth as $x \\to \\infty$, and justify each comparison."),
    [
      ["order", "Gives the order $(\\ln x)^{5} \\ll x^{0.1} \\ll 1.001^{x} \\ll x^{x}$", 2, true],
      ["justify", "Justifies with ratios tending to $0$ or by comparing logarithms (e.g. $5\\ln\\ln x$ vs $0.1\\ln x$ vs $x\\ln 1.001$ vs $x\\ln x$)", 2, true],
    ]),
  num(m(LI, "apply-compound-limit", "apply", 8, 75, "Find $\\lim_{x \\to \\infty} \\left(1 + \\frac{2}{x}\\right)^{x}$. Give $3$ decimal places."), 7.389),
  num(m(LI, "apply-exp-minus-infinity", "apply", 8, 75, "Find $\\lim_{x \\to -\\infty} \\frac{2e^{x} + 3}{e^{x} - 1}$."), -3),
  mcq(m(LI, "apply-slant-division", "apply", 8, 75, "The slant asymptote of $f(x) = \\frac{x^{2} + 1}{x - 1}$ is:"),
    "$y = x + 1$",
    [
      ["$y = x$", "slant-leading-only", "Long division gives $x + 1 + \\frac{2}{x - 1}$; the $+1$ matters."],
      ["$y = x - 1$", "slant-sign", "Dividing by $x - 1$ produces $+1$, not $-1$."],
      ["$y = 1$", "slant-horizontal", "The degree of the numerator is one higher, so the asymptote is slanted."],
    ]),
  // level 9
  short(m(LI, "explain-prove-infinity", "explain", 9, 180, "Prove from the definition ($\\forall \\varepsilon > 0\\; \\exists N$ such that $x > N$ implies $|f(x) - L| < \\varepsilon$) that $\\lim_{x \\to \\infty} \\frac{2x}{x + 1} = 2$."),
    [
      ["rewrite", "Computes $\\left|\\frac{2x}{x + 1} - 2\\right| = \\frac{2}{x + 1}$ for $x > -1$", 2, true],
      ["choose", "Chooses $N = \\frac{2}{\\varepsilon} - 1$ (or larger), so $x > N$ gives $\\frac{2}{x + 1} < \\varepsilon$", 2, true],
    ]),
  short(m(LI, "explain-sin-vs-sinc", "explain", 9, 180, "Explain why $\\lim_{x \\to \\infty} \\sin x$ does not exist but $\\lim_{x \\to \\infty} \\frac{\\sin x}{x} = 0$."),
    [
      ["oscillation", "$\\sin x$ keeps taking the values $1$ and $-1$ for arbitrarily large $x$, so it approaches no single number", 2, true],
      ["squeeze", "$-\\frac{1}{x} \\le \\frac{\\sin x}{x} \\le \\frac{1}{x}$ for $x > 0$, and both bounds tend to $0$", 2, true],
    ]),
  num(m(LI, "transfer-root-difference", "transfer", 9, 90, "Find $\\lim_{x \\to \\infty} \\left(\\sqrt{x^{2} + 5x} - \\sqrt{x^{2} + x}\\right)$."), 2),
  mcq(m(LI, "transfer-which-vertical", "transfer", 9, 90, "Which function has a vertical asymptote at $x = 0$?"),
    "$\\frac{\\sin x}{x^{2}}$",
    [
      ["$\\frac{\\sin x}{x}$", "va-removable", "That tends to $1$: a removable discontinuity."],
      ["$\\frac{1 - \\cos x}{x^{2}}$", "va-half", "That tends to $\\frac{1}{2}$."],
      ["$x\\ln|x|$", "va-xlogx", "That tends to $0$: $x$ beats $\\ln|x|$."],
    ]),
  // level 10
  short(m(LI, "transfer-all-asymptotes", "transfer", 10, 180, "Find all horizontal and vertical asymptotes of $f(x) = \\frac{\\sqrt{4x^{2} + x}}{x - 1}$, justifying the signs."),
    [
      ["vertical", "Vertical asymptote $x = 1$, since the numerator is $\\sqrt{5} \\ne 0$ there", 1, true],
      ["plus", "As $x \\to \\infty$, $\\sqrt{4x^{2} + x} \\approx 2x$, so $f \\to 2$", 1, true],
      ["minus", "As $x \\to -\\infty$, $\\sqrt{4x^{2} + x} \\approx 2|x| = -2x$, so $f \\to -2$", 2, true],
    ]),
  short(m(LI, "transfer-exp-beats-power", "transfer", 10, 180, "Using the inequality $e^{x} > \\frac{x^{n + 1}}{(n + 1)!}$ for $x > 0$, prove that $\\lim_{x \\to \\infty} \\frac{x^{n}}{e^{x}} = 0$."),
    [
      ["bound", "Gets $0 < \\frac{x^{n}}{e^{x}} < \\frac{(n + 1)!}{x}$ for $x > 0$", 2, true],
      ["squeeze", "The upper bound tends to $0$, so the squeeze theorem finishes the proof", 2, true],
    ]),
  num(m(LI, "transfer-one-minus-cos", "transfer", 10, 120, "Find $\\lim_{x \\to \\infty} x^{2}\\left(1 - \\cos\\frac{1}{x}\\right)$."), 0.5),
  mcq(m(LI, "transfer-x-root-x", "transfer", 10, 120, "$\\lim_{x \\to \\infty} x^{1/x}$ equals:"),
    "$1$",
    [
      ["$\\infty$", "xroot-infinite", "The exponent $\\frac{1}{x} \\to 0$ shrinks faster than $x$ grows: $\\ln(x^{1/x}) = \\frac{\\ln x}{x} \\to 0$."],
      ["$0$", "xroot-zero", "The base is greater than $1$, so the power is at least $1$."],
      ["$e$", "xroot-e", "$\\frac{\\ln x}{x} \\to 0$, so the limit is $e^{0}$."],
    ]),
];

// ---------------------------------------------------------------------------
// continuity
// ---------------------------------------------------------------------------
const CT = "continuity";
const continuity: Item[] = [
  // level 1
  mcq(m(CT, "recall-definition", "recall", 1, 15, "$f$ is continuous at $a$ if:"),
    "$\\lim_{x \\to a} f(x) = f(a)$",
    [
      ["$f(a)$ is defined", "cont-defined", "Being defined is only one of three conditions."],
      ["$\\lim_{x \\to a} f(x)$ exists", "cont-limit", "The limit must also equal $f(a)$."],
      ["$f$ is differentiable at $a$", "cont-differentiable", "Differentiability implies continuity, but isn't the definition."],
    ]),
  mcq(m(CT, "recall-removable", "recall", 1, 15, "A removable discontinuity at $a$ is one where:"),
    "The limit exists but $f(a)$ is undefined or different from it",
    [
      ["The one-sided limits differ", "removable-jump", "That's a jump discontinuity."],
      ["$f(x) \\to \\infty$ as $x \\to a$", "removable-infinite", "That's an infinite discontinuity."],
      ["$f$ is continuous on both sides of $a$", "removable-sides", "That doesn't describe what happens at $a$."],
    ]),
  mcq(m(CT, "recall-ivt", "recall", 1, 15, "The intermediate value theorem says a continuous $f$ on $[a, b]$:"),
    "Takes every value between $f(a)$ and $f(b)$",
    [
      ["Has a maximum and a minimum", "ivt-evt", "That's the extreme value theorem."],
      ["Has a root in $(a, b)$", "ivt-root", "Only if $f(a)$ and $f(b)$ have opposite signs."],
      ["Is differentiable on $(a, b)$", "ivt-differentiable", "Continuity doesn't give differentiability."],
    ]),
  mcq(m(CT, "recall-evt", "recall", 1, 15, "The extreme value theorem requires $f$ to be:"),
    "Continuous on a closed, bounded interval",
    [
      ["Differentiable on an open interval", "evt-open", "$x$ on $(0, 1)$ has no maximum."],
      ["Increasing", "evt-increasing", "Monotonicity isn't needed."],
      ["Bounded", "evt-bounded", "Bounded functions may not attain their bounds."],
    ]),
  // level 2
  num(m(CT, "apply-glue-constant", "apply", 2, 20, "For which $c$ is $f(x) = cx$ for $x < 3$ and $f(x) = x^{2} - 3$ for $x \\ge 3$ continuous?"), 2),
  num(m(CT, "apply-remove-sin", "apply", 2, 20, "What value of $f(0)$ makes $f(x) = \\frac{\\sin(2x)}{x}$ continuous at $0$?"), 2),
  num(m(CT, "apply-remove-squares", "apply", 2, 20, "What value of $f(5)$ makes $f(x) = \\frac{x^{2} - 25}{x - 5}$ continuous at $5$?"), 10),
  mcq(m(CT, "apply-where-discontinuous", "apply", 2, 20, "Where is $f(x) = \\frac{1}{x^{2} - 4}$ discontinuous?"),
    "At $x = \\pm 2$",
    [
      ["At $x = 4$", "where-four", "Set the denominator $x^{2} - 4$ to zero, not $x - 4$."],
      ["At $x = 2$ only", "where-one-root", "$x^{2} = 4$ has two roots."],
      ["Nowhere", "where-nowhere", "The function is undefined where the denominator vanishes."],
    ]),
  // level 3
  num(m(CT, "apply-count-discontinuities", "apply", 3, 25, "How many points of discontinuity does $\\frac{x}{x^{2} - 5x + 6}$ have?"), 2),
  num(m(CT, "apply-ivt-count", "apply", 3, 25, "$f$ is continuous on $[1, 4]$ with $f(1) = -3$ and $f(4) = 5$. How many of the values $-4$, $0$, $2$, $6$ is $f$ guaranteed by the IVT to take on $(1, 4)$?"), 2),
  num(m(CT, "apply-continuous-substitute", "apply", 3, 25, "Find $\\lim_{x \\to 1} \\sqrt{x^{2} + 8}$."), 3),
  mcq(m(CT, "apply-classify-jump", "apply", 3, 25, "At $x = 1$, $f(x) = \\frac{|x - 1|}{x - 1}$ has:"),
    "A jump discontinuity",
    [
      ["A removable discontinuity", "classify-removable", "The one-sided limits are $-1$ and $1$, so no single value repairs it."],
      ["An infinite discontinuity", "classify-infinite", "The function only takes the values $\\pm 1$."],
      ["No discontinuity", "classify-none", "$f(1)$ is undefined, and the one-sided limits differ."],
    ]),
  // level 4
  num(m(CT, "apply-two-parameters", "apply", 4, 30, "$f(x) = x + 1$ for $x < 1$, $f(x) = ax + b$ for $1 \\le x < 2$, and $f(x) = 3x$ for $x \\ge 2$. If $f$ is continuous, find $a$."), 4),
  num(m(CT, "apply-bisection-two-steps", "apply", 4, 30, "Bisection is applied to $f(x) = x^{3} - 2x - 5$ on $[2, 3]$, where $f(2) < 0 < f(3)$. After two halvings, what is the midpoint of the remaining interval? Give $3$ decimal places."), 2.125),
  num(m(CT, "apply-composition", "apply", 4, 30, "Find $\\lim_{x \\to 0} \\cos\\left(\\frac{\\pi x}{x^{2} + x}\\right)$."), -1),
  mcq(m(CT, "apply-continuous-everywhere", "apply", 4, 30, "Which function is continuous on all of $\\mathbb{R}$?"),
    "$\\frac{1}{x^{2} + 1}$",
    [
      ["$\\tan x$", "everywhere-tan", "$\\tan x$ blows up at odd multiples of $\\frac{\\pi}{2}$."],
      ["$\\frac{1}{x}$", "everywhere-reciprocal", "Undefined at $0$."],
      ["$\\ln|x|$", "everywhere-log", "Undefined at $0$."],
    ]),
  // level 5
  short(m(CT, "explain-ivt-hypothesis", "explain", 5, 90, "$f(x) = \\frac{1}{x}$ changes sign on $[-1, 1]$ but has no root. Explain why this doesn't contradict the intermediate value theorem."),
    [
      ["hypothesis", "The IVT requires continuity on the whole closed interval", 2, true],
      ["failure", "$\\frac{1}{x}$ is not continuous on $[-1, 1]$ (it is undefined and blows up at $0$), so the theorem doesn't apply", 2, true],
    ]),
  mcq(m(CT, "apply-ivt-must", "apply", 5, 40, "$f$ is continuous on $[0, 1]$ with $f(0) = 2$ and $f(1) = 5$. Which must be true?"),
    "$f(c) = 3$ for some $c \\in (0, 1)$",
    [
      ["$f$ is increasing", "must-increasing", "$f$ may rise and fall in between."],
      ["The maximum of $f$ on $[0, 1]$ is $5$", "must-max", "$f$ may exceed $5$ inside the interval."],
      ["$f(0.5) = 3.5$", "must-midpoint", "The IVT says nothing about specific points."],
    ]),
  mcq(m(CT, "apply-which-removable", "apply", 5, 40, "Which discontinuity can be removed by redefining a single value?"),
    "$\\frac{x^{2} - 1}{x - 1}$ at $x = 1$",
    [
      ["$\\frac{1}{x}$ at $x = 0$", "which-infinite", "An infinite discontinuity can't be repaired."],
      ["$\\frac{|x|}{x}$ at $x = 0$", "which-jump", "A jump can't be repaired by one value."],
      ["$\\sin\\left(\\frac{1}{x}\\right)$ at $x = 0$", "which-oscillating", "There's no limit to fill the hole with."],
    ]),
  num(m(CT, "apply-fill-value", "apply", 5, 40, "Let $f(x) = \\frac{x^{2} + x - 2}{x - 1}$ for $x \\ne 1$ and $f(1) = k$. For which $k$ is $f$ continuous?"), 3),
  // level 6
  short(m(CT, "explain-cos-fixed", "explain", 6, 120, "Show that $\\cos x = x$ has a solution in $\\left(0, \\frac{\\pi}{2}\\right)$."),
    [
      ["function", "Defines $g(x) = \\cos x - x$, which is continuous", 1, true],
      ["signs", "Checks $g(0) = 1 > 0$ and $g\\left(\\frac{\\pi}{2}\\right) = -\\frac{\\pi}{2} < 0$", 2, true],
      ["ivt", "Applies the IVT to get $c$ with $g(c) = 0$, i.e. $\\cos c = c$", 1, true],
    ]),
  num(m(CT, "apply-glue-quadratic", "apply", 6, 45, "For which $k$ is $f(x) = kx^{2}$ for $x \\le 2$ and $f(x) = 3x + k$ for $x > 2$ continuous?"), 2),
  num(m(CT, "apply-exp-composition", "apply", 6, 45, "Find $\\lim_{x \\to 0} e^{\\sin x / x}$. Give $3$ decimal places."), 2.718),
  mcq(m(CT, "apply-may-fail", "apply", 6, 45, "If $f$ and $g$ are continuous at $a$, which combination may fail to be continuous at $a$?"),
    "$\\frac{f}{g}$",
    [
      ["$f + g$", "fail-sum", "Sums of continuous functions are continuous."],
      ["$fg$", "fail-product", "Products of continuous functions are continuous."],
      ["$3f - g$", "fail-linear", "Linear combinations are continuous."],
    ]),
  // level 7
  short(m(CT, "explain-interval-continuity", "explain", 7, 120, "What does it mean for $f$ to be continuous on a closed interval $[a, b]$? How do the endpoints differ from interior points?"),
    [
      ["interior", "At interior points, the two-sided limit equals the value", 2, true],
      ["endpoints", "At $a$ and $b$ only one-sided continuity is required: $\\lim_{x \\to a^{+}} f = f(a)$ and $\\lim_{x \\to b^{-}} f = f(b)$", 2, true],
    ]),
  num(m(CT, "apply-remove-cubic", "apply", 7, 60, "$f(x) = \\frac{x^{3} - 8}{x^{2} - 4}$ has a removable discontinuity at $x = 2$. What value removes it?"), 3),
  num(m(CT, "transfer-count-roots", "transfer", 7, 60, "Judging from the signs of $p(-2)$, $p(0)$, $p(1)$ and $p(2)$, how many real roots must $p(x) = x^{3} - 3x + 1$ have?"), 3),
  mcq(m(CT, "apply-damped-continuous", "apply", 7, 60, "Let $f(x) = x\\sin\\left(\\frac{1}{x}\\right)$ for $x \\ne 0$ and $f(0) = 0$. At $x = 0$, $f$:"),
    "Is continuous",
    [
      ["Has a removable discontinuity", "damped-removable", "The limit is $0 = f(0)$, so nothing needs removing."],
      ["Has an oscillating discontinuity", "damped-oscillating", "The factor $x$ squeezes the oscillation to $0$."],
      ["Has a jump", "damped-jump", "Both one-sided limits are $0$."],
    ]),
  // level 8
  short(m(CT, "explain-odd-degree", "explain", 8, 150, "Prove that every polynomial of odd degree has at least one real root."),
    [
      ["ends", "For odd degree with positive leading coefficient, $p(x) \\to \\infty$ as $x \\to \\infty$ and $p(x) \\to -\\infty$ as $x \\to -\\infty$ (reversed if negative)", 2, true],
      ["ivt", "So some $p(-N) < 0 < p(N)$, and the IVT on $[-N, N]$ gives a root since polynomials are continuous", 2, true],
    ]),
  num(m(CT, "apply-find-c", "apply", 8, 75, "For which $c$ does $\\lim_{x \\to 0} \\frac{\\sqrt{x + c} - 2}{x}$ exist?"), 4),
  num(m(CT, "apply-extension-value", "apply", 8, 75, "With $c = 4$, what value of $f(0)$ makes $f(x) = \\frac{\\sqrt{x + c} - 2}{x}$ continuous at $0$?"), 0.25),
  mcq(m(CT, "apply-dirichlet", "apply", 8, 75, "$f(x) = 1$ for rational $x$ and $f(x) = 0$ for irrational $x$ is continuous:"),
    "Nowhere",
    [
      ["At every rational", "dirichlet-rationals", "Irrationals arbitrarily close give value $0 \\ne 1$."],
      ["At every irrational", "dirichlet-irrationals", "Rationals arbitrarily close give value $1 \\ne 0$."],
      ["Everywhere except $0$", "dirichlet-except-zero", "Every interval contains both kinds of number."],
    ]),
  // level 9
  short(m(CT, "transfer-monk", "transfer", 9, 180, "A monk walks up a mountain path from 6 a.m. to 6 p.m. one day and walks down the same path from 6 a.m. to 6 p.m. the next day. Prove there is a time of day at which he is at the same spot on both days."),
    [
      ["difference", "Defines a continuous function such as $h(t) = \\text{up}(t) - \\text{down}(t)$ (height or distance along the path)", 2, true],
      ["signs", "$h \\le 0$ at 6 a.m. and $h \\ge 0$ at 6 p.m., so the IVT gives a time with $h = 0$", 2, true],
    ]),
  short(m(CT, "transfer-fixed-point", "transfer", 9, 180, "Prove that every continuous $f: [0, 1] \\to [0, 1]$ has a fixed point, i.e. some $c$ with $f(c) = c$."),
    [
      ["function", "Defines $g(x) = f(x) - x$, continuous on $[0, 1]$", 1, true],
      ["signs", "$g(0) = f(0) \\ge 0$ and $g(1) = f(1) - 1 \\le 0$", 2, true],
      ["ivt", "The IVT gives $c$ with $g(c) = 0$ (including the cases where an endpoint is already a zero)", 1, true],
    ]),
  num(m(CT, "transfer-bisection-steps", "transfer", 9, 90, "Bisection on $[0, 1]$: after $n$ halvings the midpoint is within $\\frac{1}{2^{n + 1}}$ of the root. What is the smallest $n$ that guarantees an error of at most $0.001$?"), 9),
  mcq(m(CT, "transfer-evt-closed", "transfer", 9, 90, "Which example shows that the extreme value theorem needs a closed interval?"),
    "$f(x) = x$ on $(0, 1)$",
    [
      ["$f(x) = x$ on $[0, 1]$", "evt-example-closed", "On a closed interval it attains $0$ and $1$."],
      ["$f(x) = \\frac{1}{x}$ on $[1, 2]$", "evt-example-continuous", "That's continuous on a closed interval, so it attains both extremes."],
      ["$f(x) = x^{2}$ on $[-1, 1]$", "evt-example-attains", "It attains $0$ and $1$."],
    ]),
  // level 10
  short(m(CT, "transfer-antipodal", "transfer", 10, 180, "Assume temperature varies continuously around the equator. Prove that at any moment there are two diametrically opposite points on the equator with the same temperature."),
    [
      ["function", "Parametrises by angle and defines $g(\\theta) = T(\\theta) - T(\\theta + \\pi)$, which is continuous", 2, true],
      ["sign-flip", "Notes $g(\\theta + \\pi) = -g(\\theta)$, so $g$ takes opposite signs (or is $0$) at $0$ and $\\pi$; the IVT gives a zero", 2, true],
    ]),
  short(m(CT, "transfer-darboux-not-continuous", "transfer", 10, 180, "Give an example of a function on $[0, 1]$ that takes every value between any two of its values (the intermediate value property) but is not continuous. Explain."),
    [
      ["example", "A valid example such as $f(x) = \\sin\\left(\\frac{1}{x}\\right)$ for $x > 0$ with $f(0) = 0$", 2, true],
      ["why", "Explains that it has the intermediate value property (it sweeps all of $[-1, 1]$ in every interval near $0$) but has no limit at $0$, so it isn't continuous there", 2, true],
    ]),
  num(m(CT, "transfer-limit-function", "transfer", 10, 120, "Let $f(x) = \\lim_{n \\to \\infty} \\frac{x^{2n}}{1 + x^{2n}}$. How many points of discontinuity does $f$ have?"), 2),
  mcq(m(CT, "transfer-square-one", "transfer", 10, 120, "$f$ is continuous on $\\mathbb{R}$ and $f(x)^{2} = 1$ for every $x$. Then:"),
    "$f$ is constant, equal to $1$ everywhere or to $-1$ everywhere",
    [
      ["$f$ may switch between $1$ and $-1$", "square-switch", "Switching would skip the values in between, contradicting the IVT."],
      ["$f(x) = 1$ for all $x$", "square-only-one", "$f(x) = -1$ everywhere also works."],
      ["$f(x) = \\frac{|x|}{x}$", "square-sign", "That's undefined at $0$ and not continuous."],
    ]),
];

export const calc01Items: Item[] = [...limits, ...evaluatingLimits, ...limitsAtInfinity, ...continuity];
