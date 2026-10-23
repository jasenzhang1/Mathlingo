import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./calc-shared";

/**
 * Calculus course, part 8: the differentiation rules split into their own
 * lessons — linearity, the power rule, and the product and quotient rules
 * (`differentiation-rules`, narrowed; its on-topic items keep their slugs).
 * Forty questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// derivative-linearity
// ---------------------------------------------------------------------------
const LN = "derivative-linearity";
const linearity: Item[] = [
  // level 1
  mcq(m(LN, "recall-constant", "recall", 1, 15, "The derivative of a constant $c$ is:"),
    "$0$",
    [
      ["$c$", "lin-constant-itself", "A constant doesn't change, so its rate of change is $0$."],
      ["$1$", "lin-constant-one", "That's the derivative of $x$."],
      ["$cx$", "lin-constant-antiderivative", "That's an antiderivative of $c$."],
    ]),
  mcq(m(LN, "recall-constant-multiple", "recall", 1, 15, "For a constant $c$, $\\frac{d}{dx}\\left[c f(x)\\right] =$"),
    "$c f'(x)$",
    [
      ["$0 \\cdot f'(x)$", "lin-multiple-zero", "The constant multiplies; it isn't differentiated away."],
      ["$f'(x)$", "lin-multiple-drop", "Scaling $f$ by $c$ scales every slope by $c$."],
      ["$c + f'(x)$", "lin-multiple-add", "The constant multiplies, it doesn't add."],
    ]),
  mcq(m(LN, "recall-sum", "recall", 1, 15, "$\\frac{d}{dx}\\left[f(x) + g(x)\\right] =$"),
    "$f'(x) + g'(x)$",
    [
      ["$f'(x)g'(x)$", "lin-sum-product", "Rates of change add for a sum."],
      ["$f'(x) - g'(x)$", "lin-sum-sign", "A sum gives a sum."],
      ["$f(x)g'(x) + f'(x)g(x)$", "lin-sum-product-rule", "That's the product rule."],
    ]),
  mcq(m(LN, "recall-linear", "recall", 1, 15, "“Differentiation is linear” means that, for constants $a$ and $b$:"),
    "$(af + bg)' = af' + bg'$",
    [
      ["$(fg)' = f'g'$", "lin-means-product", "Linearity says nothing about products — and that formula is false."],
      ["The derivative of every function is a line", "lin-means-line", "“Linear” describes the operation, not its output."],
      ["$f'$ is always a constant", "lin-means-constant", "Only for linear functions $f$."],
    ]),
  // level 2
  num(m(LN, "apply-sum-values", "apply", 2, 20, "If $f'(1) = 3$ and $g'(1) = 4$, find $(f + g)'(1)$."), 7),
  num(m(LN, "apply-multiple-value", "apply", 2, 20, "If $f'(2) = 5$, find the derivative of $3f(x)$ at $x = 2$."), 15),
  num(m(LN, "apply-line", "apply", 2, 20, "Find $\\frac{d}{dx}(7x + 2)$."), 7),
  mcq(m(LN, "apply-added-constant", "apply", 2, 20, "$\\frac{d}{dx}\\left[f(x) + 10\\right] =$"),
    "$f'(x)$",
    [
      ["$f'(x) + 10$", "addconst-keep", "The derivative of $10$ is $0$."],
      ["$10f'(x)$", "addconst-multiply", "$10$ is added, not multiplied."],
      ["$f'(x) + 1$", "addconst-one", "Constants have derivative $0$, not $1$."],
    ]),
  // level 3
  num(m(LN, "apply-combination", "apply", 3, 25, "If $f'(0) = 2$ and $g'(0) = -1$, find the derivative of $4f(x) - 3g(x)$ at $x = 0$."), 11),
  num(m(LN, "apply-quadratic", "apply", 3, 25, "Using $\\frac{d}{dx}x^{2} = 2x$, find the derivative of $5x^{2} - 3x + 1$ at $x = 2$."), 17),
  num(m(LN, "apply-plus-x", "apply", 3, 25, "Let $h(x) = 2f(x) + x$ with $f'(3) = -4$. Find $h'(3)$."), -7),
  mcq(m(LN, "apply-not-linearity", "apply", 3, 25, "Which rule does $\\textbf{NOT}$ follow from linearity alone?"),
    "$(fg)' = f'g + fg'$",
    [
      ["$(f - g)' = f' - g'$", "notlin-difference", "That's linearity with $a = 1$, $b = -1$."],
      ["$(-f)' = -f'$", "notlin-negative", "That's the constant multiple rule with $c = -1$."],
      ["$\\left(\\frac{f}{5}\\right)' = \\frac{f'}{5}$", "notlin-divide", "That's the constant multiple rule with $c = \\frac{1}{5}$."],
    ]),
  // level 4
  num(m(LN, "apply-recover-line", "apply", 4, 30, "$f(x) = ax + b$ has $f'(x) = 3$ for all $x$ and $f(0) = 2$. Find $f(4)$."), 14),
  num(m(LN, "apply-cubic", "apply", 4, 30, "Using $\\frac{d}{dx}x^{3} = 3x^{2}$ and $\\frac{d}{dx}x^{2} = 2x$, find $p'(1)$ for $p(x) = 4x^{3} - 2x^{2} + x - 9$."), 9),
  num(m(LN, "apply-tangent-combination", "apply", 4, 30, "$f(1) = 4$, $f'(1) = 2$, $g(1) = -1$ and $g'(1) = 3$. Find the $y$-intercept of the tangent line to $y = f(x) + 2g(x)$ at $x = 1$."), -6),
  mcq(m(LN, "apply-equal-derivatives", "apply", 4, 30, "If $f'(x) = g'(x)$ on an interval, linearity gives $(f - g)' = 0$ there. So:"),
    "$f - g$ is constant on the interval",
    [
      ["$f = g$", "eqderiv-equal", "$x^{2}$ and $x^{2} + 1$ have the same derivative."],
      ["$f = 2g$", "eqderiv-double", "Nothing suggests a factor of $2$."],
      ["$f' - g'$ is undefined", "eqderiv-undefined", "It's defined and equal to $0$."],
    ]),
  // level 5
  short(m(LN, "explain-sum-proof", "explain", 5, 90, "Prove the sum rule $(f + g)' = f' + g'$ from the limit definition of the derivative."),
    [
      ["quotient", "Writes the difference quotient of $f + g$ as $\\frac{f(x + h) - f(x)}{h} + \\frac{g(x + h) - g(x)}{h}$", 2, true],
      ["limit", "Uses the sum law for limits: since both quotients have limits $f'(x)$ and $g'(x)$, the sum tends to $f'(x) + g'(x)$", 2, true],
    ]),
  mcq(m(LN, "apply-solve-for-g", "apply", 5, 40, "If $(f + g)'(x) = 5$ and $f'(x) = 2$, then $g'(x) =$"),
    "$3$",
    [
      ["$7$", "solveg-add", "$g' = (f + g)' - f'$."],
      ["$2.5$", "solveg-divide", "Subtract, don't divide."],
      ["$10$", "solveg-multiply", "Derivatives of sums add; they don't multiply."],
    ]),
  mcq(m(LN, "apply-constant-factor-right", "apply", 5, 40, "$\\frac{d}{dx}\\left[3f(x)\\right] =$"),
    "$3f'(x)$",
    [
      ["$3f'(x) + f(x)$", "constright-product", "Applying the product rule correctly gives $0 \\cdot f + 3f'$; the constant's derivative is $0$."],
      ["$f'(x)$", "constright-drop", "The factor $3$ stays."],
      ["$0$", "constright-zero", "Only the constant itself has derivative $0$."],
    ]),
  num(m(LN, "apply-combination-formulas", "apply", 5, 40, "$f'(x) = 6x$ and $g'(x) = 2x$. Find the derivative of $f(x) - 2g(x)$ at $x = 3$."), 6),
  // level 6
  short(m(LN, "explain-multiple-proof", "explain", 6, 120, "Prove the constant multiple rule $(cf)' = cf'$ from the limit definition."),
    [
      ["factor", "The difference quotient of $cf$ is $c \\cdot \\frac{f(x + h) - f(x)}{h}$", 2, true],
      ["limit", "A constant factor passes through the limit, giving $c f'(x)$", 2, true],
    ]),
  num(m(LN, "apply-average", "apply", 6, 45, "Let $h(x) = \\frac{f(x) + g(x)}{2}$ with $f'(4) = 10$ and $g'(4) = -2$. Find $h'(4)$."), 4),
  num(m(LN, "apply-velocity", "apply", 6, 45, "A particle's position is $s(t) = 3t^{2} - 4t + 7$. Using $\\frac{d}{dt}t^{2} = 2t$, find its velocity at $t = 5$."), 26),
  mcq(m(LN, "apply-constant-symbols", "apply", 6, 45, "$\\frac{d}{dx}\\left[\\pi^{2}x + e^{3}\\right] =$"),
    "$\\pi^{2}$",
    [
      ["$2\\pi x + 3e^{2}$", "symbols-differentiate", "$\\pi$ and $e$ are constants, not variables."],
      ["$\\pi^{2} + e^{3}$", "symbols-keep", "The constant term $e^{3}$ has derivative $0$."],
      ["$\\pi^{2}x$", "symbols-no-derivative", "Differentiate: $\\frac{d}{dx}(\\pi^{2}x) = \\pi^{2}$."],
    ]),
  // level 7
  short(m(LN, "explain-added-constant", "explain", 7, 120, "Explain, geometrically and algebraically, why adding a constant to a function doesn't change its derivative."),
    [
      ["geometry", "Adding $c$ shifts the graph vertically, which leaves every tangent's slope unchanged", 2, true],
      ["algebra", "In the difference quotient, $(f(x + h) + c) - (f(x) + c) = f(x + h) - f(x)$: the constant cancels (or: sum rule with $c' = 0$)", 2, true],
    ]),
  num(m(LN, "apply-four-terms", "apply", 7, 60, "At $x_0$, $f' = 3$, $g' = -2$ and $h' = 5$. Find the derivative of $2f - g + 4h - 6$ at $x_0$."), 28),
  num(m(LN, "apply-antiderivatives", "apply", 7, 60, "$F' = f$ and $G' = g$, with $f(2) = 3$ and $g(2) = 4$. Find the derivative of $5F - 2G$ at $x = 2$."), 7),
  mcq(m(LN, "transfer-kernel", "transfer", 7, 60, "Viewed as a linear map on differentiable functions on an interval, $\\frac{d}{dx}$ sends exactly which functions to $0$?"),
    "The constant functions",
    [
      ["Only the zero function", "kernel-zero", "Every constant has derivative $0$."],
      ["The linear functions $ax + b$", "kernel-linear", "$ax$ has derivative $a$, which is nonzero unless $a = 0$."],
      ["Functions with $f(0) = 0$", "kernel-root", "$f(x) = x$ has $f(0) = 0$ and $f' = 1$."],
    ]),
  // level 8
  short(m(LN, "transfer-matrix", "transfer", 8, 150, "Write the matrix of $D = \\frac{d}{dx}$ from polynomials of degree at most $3$ to polynomials of degree at most $2$, using the bases $\\lbrace 1, x, x^{2}, x^{3} \\rbrace$ and $\\lbrace 1, x, x^{2} \\rbrace$. Why is $D$ linear?"),
    [
      ["matrix", "$D(1) = 0$, $D(x) = 1$, $D(x^{2}) = 2x$, $D(x^{3}) = 3x^{2}$, giving $\\begin{bmatrix} 0 & 1 & 0 & 0 \\\\ 0 & 0 & 2 & 0 \\\\ 0 & 0 & 0 & 3 \\end{bmatrix}$", 3, true],
      ["linear", "It's linear by the sum and constant multiple rules", 1, true],
    ]),
  num(m(LN, "transfer-rank", "transfer", 8, 75, "$D = \\frac{d}{dx}$ maps polynomials of degree at most $3$ to themselves. What is the rank of $D$?"), 3),
  num(m(LN, "apply-solve-coefficients", "apply", 8, 75, "$f(x) = ax^{2} + bx$ (so $f'(x) = 2ax + b$) has $f'(1) = 7$ and $f'(2) = 11$. Find $a$."), 2),
  mcq(m(LN, "transfer-sum-nondifferentiable", "transfer", 8, 75, "$f$ is differentiable at $a$ but $g$ is not. Then $f + g$ at $a$ is:"),
    "Not differentiable",
    [
      ["Differentiable", "sumnd-differentiable", "If $f + g$ were, then $g = (f + g) - f$ would be too."],
      ["Either, depending on $f$", "sumnd-depends", "Linearity rules it out in every case."],
      ["Differentiable if $f'(a) = 0$", "sumnd-flat", "The value of $f'(a)$ doesn't matter."],
    ]),
  // level 9
  short(m(LN, "transfer-difference-differentiable", "transfer", 9, 180, "Prove that if $f$ and $f + g$ are differentiable at $a$, then so is $g$."),
    [
      ["write", "Writes $g = (f + g) - f$", 2, true],
      ["linearity", "A difference of functions differentiable at $a$ is differentiable at $a$ (difference rule), with $g'(a) = (f + g)'(a) - f'(a)$", 2, true],
    ]),
  short(m(LN, "transfer-sum-smooths", "transfer", 9, 180, "Give functions $f$ and $g$, neither differentiable at $0$, whose sum is differentiable at $0$. Why doesn't this contradict linearity?"),
    [
      ["example", "A valid example, e.g. $f = |x|$ and $g = -|x|$ (sum $0$), or $f = |x| + x$ and $g = -|x|$", 2, true],
      ["why", "Linearity only says sums of differentiable functions are differentiable; it makes no claim when the pieces aren't", 2, true],
    ]),
  num(m(LN, "transfer-functional", "transfer", 9, 90, "Let $L(f) = f'(1) + 2f'(2)$. For $p(x) = x^{3} - x$ (with $(x^{3})' = 3x^{2}$), find $L(p)$."), 24),
  mcq(m(LN, "transfer-superposition", "transfer", 9, 90, "If $y_1$ and $y_2$ both solve $y'' + y = 0$, then for any constants $c_1$, $c_2$:"),
    "$c_1 y_1 + c_2 y_2$ also solves it",
    [
      ["Only $y_1 + y_2$ solves it", "superpos-sum-only", "Linearity allows any constants."],
      ["$y_1 y_2$ solves it", "superpos-product", "Products aren't preserved by linear equations."],
      ["No combination solves it", "superpos-none", "$(c_1y_1 + c_2y_2)'' + (c_1y_1 + c_2y_2) = c_1 \\cdot 0 + c_2 \\cdot 0$."],
    ]),
  // level 10
  short(m(LN, "transfer-finite-sums", "transfer", 10, 180, "Prove by induction that $\\left(\\sum_{k=1}^{n} c_k f_k\\right)' = \\sum_{k=1}^{n} c_k f_k'$ for differentiable $f_k$ and constants $c_k$."),
    [
      ["base", "Base case $n = 1$ is the constant multiple rule", 1, true],
      ["step", "Inductive step: split off the last term, apply the sum rule to $\\sum_{k=1}^{n} c_k f_k + c_{n + 1}f_{n + 1}$, then the hypothesis and the constant multiple rule", 3, true],
    ]),
  short(m(LN, "transfer-homogeneous", "transfer", 10, 180, "Show that linear combinations of solutions of $y'' + 3y' + 2y = 0$ are again solutions, and explain why this fails for $y'' + 3y' + 2y = 1$."),
    [
      ["homogeneous", "By linearity, $L[c_1y_1 + c_2y_2] = c_1L[y_1] + c_2L[y_2] = 0$, where $L[y] = y'' + 3y' + 2y$", 2, true],
      ["inhomogeneous", "For the right side $1$: $L[y_1 + y_2] = 1 + 1 = 2 \\ne 1$, so sums of solutions aren't solutions (differences solve the homogeneous equation instead)", 2, true],
    ]),
  num(m(LN, "transfer-weighted-sum", "transfer", 10, 120, "Let $f(x) = \\sum_{k=1}^{10} kx^{k}$. Using $(x^{k})' = kx^{k - 1}$, find $f'(1)$."), 385),
  mcq(m(LN, "transfer-which-linear", "transfer", 10, 120, "Which operation on differentiable functions is linear?"),
    "$f \\mapsto f' + 2f$",
    [
      ["$f \\mapsto f f'$", "whichlin-product", "Doubling $f$ quadruples $ff'$."],
      ["$f \\mapsto f' + 1$", "whichlin-shift", "It sends $0$ to $1$, so it isn't linear."],
      ["$f \\mapsto (f')^{2}$", "whichlin-square", "Doubling $f$ quadruples the output."],
    ]),
];

// ---------------------------------------------------------------------------
// power-rule
// ---------------------------------------------------------------------------
const PR = "power-rule";
const powerRule: Item[] = [
  // level 1
  mcq(m(PR, "recall-rule", "recall", 1, 15, "The power rule says $\\frac{d}{dx} x^{n} =$"),
    "$nx^{n - 1}$",
    [
      ["$x^{n - 1}$", "power-drop-n", "The exponent comes down as a factor."],
      ["$nx^{n}$", "power-keep-exponent", "The exponent decreases by one."],
      ["$\\frac{x^{n + 1}}{n + 1}$", "power-antiderivative", "That's the antiderivative."],
    ]),
  mcq(m(PR, "recall-root", "recall", 1, 15, "$\\frac{d}{dx}\\sqrt{x} =$"),
    "$\\frac{1}{2\\sqrt{x}}$",
    [
      ["$2\\sqrt{x}$", "root-integrate", "Differentiating lowers the power: $x^{1/2}$ becomes $\\frac{1}{2}x^{-1/2}$."],
      ["$\\frac{1}{\\sqrt{x}}$", "root-no-half", "The exponent $\\frac{1}{2}$ comes down as a factor."],
      ["$\\frac{\\sqrt{x}}{2}$", "root-wrong-power", "The exponent drops to $-\\frac{1}{2}$, putting $\\sqrt{x}$ in the denominator."],
    ]),
  mcq(m(PR, "recall-reciprocal", "recall", 1, 15, "$\\frac{d}{dx}\\frac{1}{x} =$"),
    "$-\\frac{1}{x^{2}}$",
    [
      ["$\\frac{1}{x^{2}}$", "recip-sign", "$x^{-1}$ brings down $-1$."],
      ["$\\ln x$", "recip-antiderivative", "That's an antiderivative."],
      ["$-\\frac{1}{x}$", "recip-exponent", "The exponent drops from $-1$ to $-2$."],
    ]),
  mcq(m(PR, "recall-exponents", "recall", 1, 15, "The power rule $\\frac{d}{dx}x^{n} = nx^{n - 1}$ holds for:"),
    "Every real exponent $n$",
    [
      ["Positive integers only", "exponents-positive", "It covers roots and reciprocals too."],
      ["Integers only", "exponents-integers", "$\\sqrt{x} = x^{1/2}$ follows it."],
      ["$n \\ge 1$ only", "exponents-at-least-one", "$x^{-2}$ and $x^{1/2}$ follow it."],
    ]),
  // level 2
  num(m(PR, "apply-power-at-1", "apply", 2, 20, "Find $\\frac{d}{dx} x^{5}$ at $x = 1$."), 5),
  num(m(PR, "apply-polynomial", "apply", 2, 20, "For $f(x) = 3x^{4} - 2x^{2} + 7$, find $f'(1)$."), 8),
  num(m(PR, "apply-fractional-power", "apply", 2, 20, "For $f(x) = 6x^{1/3}$, find $f'(8)$."), 0.5),
  mcq(m(PR, "apply-negative-power", "apply", 2, 20, "$\\frac{d}{dx} \\frac{1}{x^{3}} =$"),
    "$-3x^{-4}$",
    [
      ["$-3x^{-2}$", "negpower-wrong-exponent", "$x^{-3}$ becomes $x^{-4}$: the exponent goes down by one."],
      ["$\\frac{1}{3x^{2}}$", "negpower-reciprocal", "Differentiate $x^{-3}$; don't differentiate the denominator alone."],
      ["$3x^{-4}$", "negpower-sign", "The exponent $-3$ brings down a negative factor."],
    ]),
  // level 3
  num(m(PR, "apply-root-at-9", "apply", 3, 25, "For $f(x) = \\sqrt{x}$, find $f'(9)$. Give $4$ decimal places."), 0.1667),
  num(m(PR, "apply-inverse-square", "apply", 3, 25, "For $f(x) = x^{-2}$, find $f'(1)$."), -2),
  num(m(PR, "apply-second-derivative", "apply", 3, 25, "For $f(x) = x^{3} - 6x^{2} + 9x$, find $f''(1)$."), -6),
  mcq(m(PR, "apply-two-thirds", "apply", 3, 25, "$\\frac{d}{dx} x^{2/3} =$"),
    "$\\frac{2}{3}x^{-1/3}$",
    [
      ["$\\frac{2}{3}x^{1/3}$", "twothirds-exponent", "$\\frac{2}{3} - 1 = -\\frac{1}{3}$."],
      ["$\\frac{3}{2}x^{1/3}$", "twothirds-inverted", "The exponent itself comes down, not its reciprocal."],
      ["$x^{-1/3}$", "twothirds-factor", "The factor $\\frac{2}{3}$ is missing."],
    ]),
  // level 4
  num(m(PR, "apply-tangent-intercept", "apply", 4, 30, "Find the $y$-intercept of the tangent line to $y = x^{3} - 2x$ at $x = 2$."), -16),
  num(m(PR, "apply-horizontal-tangent", "apply", 4, 30, "At what $x$ is the tangent to $y = x^{2} - 6x + 5$ horizontal?"), 3),
  num(m(PR, "apply-root-tangent", "apply", 4, 30, "Find the $y$-intercept of the tangent line to $y = \\sqrt{x}$ at $x = 4$."), 1),
  mcq(m(PR, "apply-rewrite-first", "apply", 4, 30, "$\\frac{d}{dx}\\frac{x^{2} + 1}{x} =$"),
    "$1 - x^{-2}$",
    [
      ["$\\frac{2x}{1}$", "rewrite-topbottom", "Differentiating top and bottom separately isn't a rule."],
      ["$1 + x^{-2}$", "rewrite-sign", "$\\frac{d}{dx}x^{-1} = -x^{-2}$."],
      ["$2x - 1$", "rewrite-algebra", "First simplify: $\\frac{x^{2} + 1}{x} = x + x^{-1}$."],
    ]),
  // level 5
  short(m(PR, "explain-binomial-proof", "explain", 5, 90, "Prove the power rule for a positive integer $n$ from the limit definition, using the binomial theorem."),
    [
      ["expand", "$(x + h)^{n} - x^{n} = nx^{n - 1}h + \\binom{n}{2}x^{n - 2}h^{2} + \\cdots + h^{n}$", 2, true],
      ["limit", "Dividing by $h$ leaves $nx^{n - 1}$ plus terms containing $h$, which vanish as $h \\to 0$", 2, true],
    ]),
  mcq(m(PR, "apply-high-derivative", "apply", 5, 40, "If $f$ is a polynomial of degree $5$, then $f^{(6)}$ is:"),
    "$0$",
    [
      ["The constant $5!$ times the leading coefficient", "highderiv-fifth", "That's $f^{(5)}$; one more derivative gives $0$."],
      ["A polynomial of degree $1$", "highderiv-degree", "Six derivatives lower the degree by six."],
      ["Undefined", "highderiv-undefined", "Polynomials can be differentiated forever."],
    ]),
  mcq(m(PR, "apply-irrational-exponent", "apply", 5, 40, "$\\frac{d}{dx} x^{\\pi} =$"),
    "$\\pi x^{\\pi - 1}$",
    [
      ["$x^{\\pi}\\ln x$", "irrexp-exponential", "That treats $x$ as the exponent; here the exponent is the constant $\\pi$."],
      ["$\\pi x^{\\pi}$", "irrexp-keep", "The exponent drops by one."],
      ["$0$", "irrexp-constant", "$x^{\\pi}$ isn't constant; only $\\pi^{\\pi}$ would be."],
    ]),
  num(m(PR, "apply-third-derivative", "apply", 5, 40, "For $f(x) = x^{4}$, find $f'''(2)$."), 48),
  // level 6
  short(m(PR, "explain-root-definition", "explain", 6, 120, "Derive $\\frac{d}{dx}\\sqrt{x} = \\frac{1}{2\\sqrt{x}}$ from the limit definition."),
    [
      ["rationalise", "Multiplies $\\frac{\\sqrt{x + h} - \\sqrt{x}}{h}$ by $\\frac{\\sqrt{x + h} + \\sqrt{x}}{\\sqrt{x + h} + \\sqrt{x}}$ to get $\\frac{1}{\\sqrt{x + h} + \\sqrt{x}}$", 3, true],
      ["limit", "Lets $h \\to 0$ to get $\\frac{1}{2\\sqrt{x}}$", 1, true],
    ]),
  num(m(PR, "apply-zero-acceleration", "apply", 6, 45, "A particle has position $s(t) = t^{3} - 6t^{2} + 9t$. At what time $t$ is its acceleration zero?"), 2),
  num(m(PR, "apply-slope-nine", "apply", 6, 45, "At what positive $x$ does the tangent to $y = x^{3} - 3x$ have slope $9$?"), 2),
  mcq(m(PR, "transfer-parallel-tangent", "transfer", 6, 45, "Which line is tangent to $y = x^{2}$ and parallel to $y = 4x + 1$?"),
    "$y = 4x - 4$",
    [
      ["$y = 4x$", "parallel-origin", "It must touch the parabola at $(2, 4)$."],
      ["$y = 4x + 4$", "parallel-sign", "Through $(2, 4)$ with slope $4$: $y = 4 + 4(x - 2)$."],
      ["$y = 2x$", "parallel-slope", "Parallel to $y = 4x + 1$ means slope $4$."],
    ]),
  // level 7
  short(m(PR, "explain-nth-derivative", "explain", 7, 120, "Use the power rule to show that the $n$th derivative of $x^{n}$ is $n!$ (for a positive integer $n$), and that the $(n + 1)$th is $0$."),
    [
      ["iterate", "Each differentiation brings down the current exponent and lowers it by one: $n x^{n - 1}$, $n(n - 1)x^{n - 2}$, …", 2, true],
      ["conclude", "After $n$ steps the exponent is $0$ and the coefficient is $n(n - 1)\\cdots 1 = n!$, a constant, so one more derivative is $0$", 2, true],
    ]),
  num(m(PR, "transfer-tangents-through-point", "transfer", 7, 60, "Two tangent lines to $y = x^{2}$ pass through $(1, -3)$. What is the larger $x$-coordinate of the points of tangency?"), 3),
  num(m(PR, "apply-find-exponent", "apply", 7, 60, "If $f(x) = x^{n}$ and $f'(2) = 80$, find $n$."), 5),
  mcq(m(PR, "apply-hundredth-derivative", "apply", 7, 60, "If $f(x) = x^{100}$, then $f^{(100)}(x) =$"),
    "$100!$",
    [
      ["$100$", "hundredth-n", "Each differentiation brings down a factor: $100 \\cdot 99 \\cdots 1$."],
      ["$0$", "hundredth-zero", "That's $f^{(101)}$."],
      ["$100x$", "hundredth-linear", "After $100$ derivatives no $x$ remains."],
    ]),
  // level 8
  short(m(PR, "transfer-polynomial-conditions", "transfer", 8, 150, "Find the quadratic $p(x)$ with $p(1) = 3$, $p'(1) = 1$ and $p''(1) = 4$, and explain how each condition fixes a coefficient."),
    [
      ["form", "Writes $p(x) = a + b(x - 1) + c(x - 1)^{2}$, so $p(1) = a$, $p'(1) = b$, $p''(1) = 2c$", 2, true],
      ["answer", "Gets $p(x) = 3 + (x - 1) + 2(x - 1)^{2}$ (equivalently $2x^{2} - 3x + 4$)", 2, true],
    ]),
  num(m(PR, "transfer-find-b", "transfer", 8, 75, "$f(x) = x^{3} + ax^{2} + bx$ has a horizontal tangent at $x = 1$ and an inflection point at $x = 2$. Find $b$."), 9),
  num(m(PR, "transfer-normal-line", "transfer", 8, 75, "The normal line to $y = x^{2}$ at $(1, 1)$ (perpendicular to the tangent) meets the parabola again. Find the $x$-coordinate of that second point."), -1.5),
  mcq(m(PR, "apply-cube-root-zero", "apply", 8, 75, "The power rule gives $\\frac{d}{dx}x^{1/3} = \\frac{1}{3}x^{-2/3}$. At $x = 0$:"),
    "The formula is undefined: the graph has a vertical tangent there",
    [
      ["The derivative is $0$", "cuberoot0-zero", "$x^{-2/3}$ blows up at $0$."],
      ["The derivative is $\\frac{1}{3}$", "cuberoot0-coefficient", "$0^{-2/3}$ isn't $1$."],
      ["The function is discontinuous", "cuberoot0-discontinuous", "$x^{1/3}$ is continuous everywhere."],
    ]),
  // level 9
  short(m(PR, "transfer-negative-integers", "transfer", 9, 180, "Prove $\\frac{d}{dx}x^{-n} = -nx^{-n - 1}$ for a positive integer $n$ (and $x \\ne 0$) from the limit definition."),
    [
      ["combine", "Writes $\\frac{(x + h)^{-n} - x^{-n}}{h} = \\frac{x^{n} - (x + h)^{n}}{h\\,x^{n}(x + h)^{n}}$", 2, true],
      ["limit", "The numerator over $h$ tends to $-nx^{n - 1}$ (positive power rule) and the denominator to $x^{2n}$, giving $-nx^{-n - 1}$", 2, true],
    ]),
  short(m(PR, "transfer-power-vs-exponential", "transfer", 9, 180, "Explain why the power rule can't be applied to $2^{x}$ or $x^{x}$, and say what each needs instead."),
    [
      ["why", "The power rule needs a variable base and a fixed exponent; $2^{x}$ has a fixed base and variable exponent, and $x^{x}$ has both varying", 2, true],
      ["instead", "$2^{x}$ uses the exponential rule ($2^{x}\\ln 2$); $x^{x}$ needs logarithmic differentiation ($x^{x}(\\ln x + 1)$)", 2, true],
    ]),
  num(m(PR, "transfer-cubic-tangent-point", "transfer", 9, 90, "A tangent line to $y = x^{3}$ at $x = a \\ne 0$ passes through $(2, 0)$. Find $a$."), 3),
  mcq(m(PR, "transfer-recover-polynomial", "transfer", 9, 90, "A polynomial $p$ has $p'(x) = 3x^{2} + 2x$ and $p(0) = 5$. Then $p(1) =$"),
    "$7$",
    [
      ["$5$", "recover-value", "$p(x) = x^{3} + x^{2} + 5$, so $p(1) = 7$."],
      ["$6$", "recover-half", "Both terms contribute $1$ at $x = 1$."],
      ["$10$", "recover-derivative", "$p'(1) + p(0) = 5 + 5$ adds the slope, not the change."],
    ]),
  // level 10
  short(m(PR, "transfer-polynomial-taylor", "transfer", 10, 180, "Show that a polynomial $p$ of degree $n$ satisfies $p(x) = \\sum_{k=0}^{n} \\frac{p^{(k)}(a)}{k!}(x - a)^{k}$."),
    [
      ["expand", "Writes $p(x) = \\sum c_k (x - a)^{k}$ (any polynomial can be re-expanded about $a$)", 1, true],
      ["coefficients", "Differentiating $k$ times with the power rule and setting $x = a$ kills every term but $k!\\,c_k$, so $c_k = \\frac{p^{(k)}(a)}{k!}$", 3, true],
    ]),
  short(m(PR, "transfer-differentiable-at-zero", "transfer", 10, 180, "For which real $n \\ge 0$ does $x^{n}$ (on $x \\ge 0$) have a finite right-hand derivative at $0$? Explain."),
    [
      ["quotient", "The right-hand quotient is $\\frac{h^{n} - 0^{n}}{h} = h^{n - 1}$ for $n > 0$", 2, true],
      ["answer", "It has a finite limit exactly when $n \\ge 1$ (and trivially for $n = 0$, a constant); for $0 < n < 1$ it blows up — a vertical tangent", 2, true],
    ]),
  num(m(PR, "transfer-tangent-parabola", "transfer", 10, 120, "For which $c$ is the parabola $y = cx^{2}$ tangent to the line $y = 2x - 1$?"), 1),
  mcq(m(PR, "transfer-missing-case", "transfer", 10, 120, "Which function has derivative $x^{-1}$?"),
    "$\\ln|x|$ — no power function $x^{n}$ does",
    [
      ["$\\frac{x^{0}}{0}$", "missing-formula", "The antiderivative formula $\\frac{x^{n + 1}}{n + 1}$ breaks down at $n = -1$."],
      ["$-x^{-2}$", "missing-derivative", "That's the derivative of $x^{-1}$, not a function with derivative $x^{-1}$."],
      ["$x^{0}$", "missing-constant", "$x^{0} = 1$ has derivative $0$."],
    ]),
];

// ---------------------------------------------------------------------------
// differentiation-rules — now the product and quotient rules
// ---------------------------------------------------------------------------
const DR = "differentiation-rules";
const productQuotient: Item[] = [
  // level 1
  mcq(m(DR, "recall-product", "recall", 1, 15, "The product rule says $(fg)' =$"),
    "$f'g + fg'$",
    [
      ["$f'g'$", "product-naive", "The derivative of a product is not the product of derivatives."],
      ["$f'g - fg'$", "product-minus", "That's the quotient rule's numerator."],
      ["$\\frac{f'g + fg'}{g^{2}}$", "product-divide", "There is no denominator in the product rule."],
    ]),
  mcq(m(DR, "recall-quotient", "recall", 1, 15, "The quotient rule says $\\left(\\frac{f}{g}\\right)' =$"),
    "$\\frac{f'g - fg'}{g^{2}}$",
    [
      ["$\\frac{f'}{g'}$", "quotient-naive", "Derivatives of quotients don't split like that."],
      ["$\\frac{fg' - f'g}{g^{2}}$", "quotient-order", "The order is reversed, which flips the sign."],
      ["$\\frac{f'g + fg'}{g^{2}}$", "quotient-plus", "The numerator has a minus sign."],
    ]),
  mcq(m(DR, "recall-reciprocal", "recall", 1, 15, "$\\left(\\frac{1}{g}\\right)' =$"),
    "$-\\frac{g'}{g^{2}}$",
    [
      ["$\\frac{1}{g'}$", "reciprocal-invert", "The quotient rule with $f = 1$ gives $\\frac{0 \\cdot g - 1 \\cdot g'}{g^{2}}$."],
      ["$\\frac{g'}{g^{2}}$", "reciprocal-sign", "A growing denominator makes $\\frac{1}{g}$ shrink."],
      ["$-\\frac{1}{g^{2}}$", "reciprocal-no-inner", "The numerator is $g'$, not $1$."],
    ]),
  mcq(m(DR, "recall-quotient-origin", "recall", 1, 15, "The quotient rule can be derived from:"),
    "The product rule",
    [
      ["The sum rule", "qorigin-sum", "Writing $f = \\frac{f}{g} \\cdot g$ and differentiating needs the product rule."],
      ["The power rule alone", "qorigin-power", "The power rule doesn't handle a general denominator."],
      ["Nothing; it must be assumed", "qorigin-axiom", "It follows from the product rule (or the limit definition)."],
    ]),
  // level 2
  num(m(DR, "apply-product-rule", "apply", 2, 20, "For $f(x) = (x^{2} + 1)(3x - 5)$, find $f'(1)$."), 2),
  num(m(DR, "apply-quotient-at-zero", "apply", 2, 20, "For $f(x) = \\frac{x}{x^{2} + 1}$, find $f'(0)$."), 1),
  num(m(DR, "apply-simple-product", "apply", 2, 20, "Use the product rule on $x(x + 1)$ to find its derivative at $x = 1$."), 3),
  mcq(m(DR, "apply-product-form", "apply", 2, 20, "$\\frac{d}{dx}\\left[x^{2} g(x)\\right] =$"),
    "$2x\\,g(x) + x^{2}g'(x)$",
    [
      ["$2x\\,g'(x)$", "productform-naive", "That multiplies the derivatives."],
      ["$x^{2}g'(x)$", "productform-drop", "The derivative of $x^{2}$ contributes too."],
      ["$2x\\,g(x)$", "productform-constant-g", "$g$ isn't constant, so $g'$ appears."],
    ]),
  // level 3
  num(m(DR, "apply-quotient-linear", "apply", 3, 25, "For $f(x) = \\frac{2x + 1}{x - 3}$, find $f'(4)$."), -7),
  num(m(DR, "apply-quotient-values", "apply", 3, 25, "$f(2) = 3$, $f'(2) = -1$, $g(2) = 4$ and $g'(2) = 5$. Find $\\left(\\frac{f}{g}\\right)'(2)$. Give $4$ decimal places."), -1.1875),
  num(m(DR, "apply-product-cubic", "apply", 3, 25, "Use the product rule to find the derivative of $x^{2}(x - 3)$ at $x = 1$."), -3),
  mcq(m(DR, "apply-product-values", "apply", 3, 25, "If $f(2) = 3$, $f'(2) = -1$, $g(2) = 4$ and $g'(2) = 5$, then $(fg)'(2) =$"),
    "$11$",
    [
      ["$-5$", "values-naive", "$f'(2)g'(2)$ is not the product rule."],
      ["$19$", "values-sign", "$f'(2)g(2) = -4$, not $+4$."],
      ["$7$", "values-sum", "Use $f'g + fg' = -4 + 15$."],
    ]),
  // level 4
  num(m(DR, "apply-quotient-rational", "apply", 4, 30, "For $f(x) = \\frac{x^{2}}{x + 1}$, find $f'(1)$."), 0.75),
  num(m(DR, "apply-quotient-squares", "apply", 4, 30, "For $f(x) = \\frac{x^{2} + 1}{x^{2} - 1}$, find $f'(2)$. Give $3$ decimal places."), -0.889),
  num(m(DR, "apply-horizontal-quotient", "apply", 4, 30, "At what positive $x$ is the tangent to $y = \\frac{x}{x^{2} + 1}$ horizontal?"), 1),
  mcq(m(DR, "apply-simplify-first", "apply", 4, 30, "The quickest way to differentiate $\\frac{x^{3} + 2x}{x}$ is to:"),
    "Simplify to $x^{2} + 2$ first, giving $2x$",
    [
      ["Use the quotient rule, which is required", "simplify-required", "Simplifying first is valid for $x \\ne 0$ and much faster."],
      ["Differentiate top and bottom: $\\frac{3x^{2} + 2}{1}$", "simplify-lhopital", "That's not how quotients differentiate."],
      ["Simplify to $x^{2} + 2x$", "simplify-algebra", "$\\frac{2x}{x} = 2$, not $2x$."],
    ]),
  // level 5
  short(m(DR, "explain-not-product", "explain", 5, 90, "Using $f(x) = g(x) = x$, explain why the derivative of a product is not the product of the derivatives."),
    [
      ["compare", "$(x \\cdot x)' = (x^{2})' = 2x$, while $f'g' = 1 \\cdot 1 = 1$", 2, true],
      ["rule", "The product rule gives $1 \\cdot x + x \\cdot 1 = 2x$, matching the true derivative", 2, true],
    ]),
  mcq(m(DR, "apply-second-product", "apply", 5, 40, "$(fg)'' =$"),
    "$f''g + 2f'g' + fg''$",
    [
      ["$f''g + fg''$", "second-product-missing", "The cross term $f'g'$ appears twice."],
      ["$f''g''$", "second-product-naive", "Derivatives of products don't multiply."],
      ["$f''g + f'g' + fg''$", "second-product-once", "Differentiating $f'g + fg'$ produces $f'g'$ twice."],
    ]),
  mcq(m(DR, "apply-x-times-f", "apply", 5, 40, "If $f(3) = 2$ and $f'(3) = 4$, then the derivative of $x f(x)$ at $x = 3$ is:"),
    "$14$",
    [
      ["$12$", "xf-drop-f", "The product rule adds $1 \\cdot f(3) = 2$."],
      ["$4$", "xf-naive", "$(xf)' = f + xf'$, not $f'$ alone."],
      ["$6$", "xf-swapped", "$f(3) + 3f'(3) = 2 + 12$."],
    ]),
  num(m(DR, "apply-product-power", "apply", 5, 40, "For $f(x) = x^{3}(2x + 1)$, use the product rule to find $f'(1)$."), 11),
  // level 6
  short(m(DR, "explain-quotient-from-product", "explain", 6, 120, "Derive the quotient rule from the product rule."),
    [
      ["setup", "Writes $f = q \\cdot g$ with $q = \\frac{f}{g}$ and differentiates: $f' = q'g + qg'$", 2, true],
      ["solve", "Solves $q' = \\frac{f' - qg'}{g} = \\frac{f'g - fg'}{g^{2}}$", 2, true],
    ]),
  num(m(DR, "apply-quotient-shifted", "apply", 6, 45, "For $f(x) = \\frac{x^{2} + 1}{x - 1}$, find $f'(3)$."), 0.5),
  num(m(DR, "apply-reciprocal-value", "apply", 6, 45, "$g(0) = 2$ and $g'(0) = 6$. Find the derivative of $\\frac{1}{g(x)}$ at $x = 0$."), -1.5),
  mcq(m(DR, "apply-order-mistake", "apply", 6, 45, "Writing the quotient rule's numerator as $fg' - f'g$ instead of $f'g - fg'$ gives:"),
    "The negative of the correct derivative",
    [
      ["The correct derivative", "ordermistake-same", "Subtraction isn't commutative."],
      ["Zero", "ordermistake-zero", "The two terms don't cancel."],
      ["The derivative of $\\frac{g}{f}$", "ordermistake-swap", "That would also change the denominator to $f^{2}$."],
    ]),
  // level 7
  short(m(DR, "explain-prove-product", "explain", 7, 120, "Prove the product rule from the definition of the derivative."),
    [
      ["add-subtract", "Adds and subtracts $f(x + h)g(x)$ in the numerator of the difference quotient", 2, true],
      ["limits", "Splits into $f(x + h)\\frac{g(x + h) - g(x)}{h} + g(x)\\frac{f(x + h) - f(x)}{h}$ and uses continuity of $f$ to get $fg' + gf'$", 2, true],
    ]),
  num(m(DR, "transfer-product-roots", "transfer", 7, 60, "For $f(x) = (x - 1)(x - 2)(x - 3)(x - 4)$, find $f'(1)$."), -6),
  num(m(DR, "apply-second-product-values", "apply", 7, 60, "$f(0) = 1$, $f'(0) = 2$, $f''(0) = 3$, $g(0) = 4$, $g'(0) = 5$ and $g''(0) = 6$. Find $(fg)''(0)$."), 38),
  mcq(m(DR, "apply-triple-product", "apply", 7, 60, "$(fgh)' =$"),
    "$f'gh + fg'h + fgh'$",
    [
      ["$f'g'h'$", "triple-naive", "Derivatives of products don't multiply."],
      ["$f'gh + fg'h$", "triple-missing", "Each factor takes a turn being differentiated."],
      ["$(f'g + fg')h'$", "triple-misgrouped", "Apply the product rule to $(fg) \\cdot h$: $(fg)'h + (fg)h'$."],
    ]),
  // level 8
  short(m(DR, "explain-area-argument", "explain", 8, 150, "Explain the product rule using a rectangle with sides $f(x)$ and $g(x)$. Why does the corner piece not contribute?"),
    [
      ["strips", "Increasing $x$ by $h$ adds strips of area about $\\Delta f \\cdot g$ and $f \\cdot \\Delta g$", 2, true],
      ["corner", "The corner $\\Delta f\\,\\Delta g$ is second order: divided by $h$ it is $\\frac{\\Delta f}{h}\\Delta g \\to f' \\cdot 0 = 0$", 2, true],
    ]),
  num(m(DR, "apply-three-factors", "apply", 8, 75, "Find the derivative of $(x + 1)(x + 2)(x + 3)$ at $x = 0$."), 11),
  num(m(DR, "apply-flat-quotient", "apply", 8, 75, "Find the positive $x$ where $\\frac{x^{2} + 1}{x + 1}$ has a horizontal tangent. Give $3$ decimal places."), 0.414),
  mcq(m(DR, "transfer-reciprocal-pair", "transfer", 8, 75, "$f$ and $g$ are differentiable with $f(x)g(x) = 1$ and $f'(x) = 2f(x)$ for all $x$. Then $g'(x) =$"),
    "$-2g(x)$",
    [
      ["$2g(x)$", "reciprocal-sign", "$g = \\frac{1}{f}$, so $g' = -\\frac{f'}{f^{2}} = -\\frac{2}{f}$."],
      ["$-\\frac{2}{g(x)}$", "reciprocal-invert", "$-\\frac{2}{f} = -2g$, since $\\frac{1}{f} = g$."],
      ["$\\frac{g(x)}{2}$", "reciprocal-half", "Differentiating $fg = 1$ gives $f'g + fg' = 0$, so $g' = -2g$."],
    ]),
  // level 9
  short(m(DR, "transfer-double-root", "transfer", 9, 180, "Show that if $p$ is a polynomial with $p(r) = p'(r) = 0$, then $(x - r)^{2}$ divides $p(x)$."),
    [
      ["factor", "Since $p(r) = 0$, write $p(x) = (x - r)q(x)$ for a polynomial $q$", 1, true],
      ["differentiate", "Then $p'(x) = q(x) + (x - r)q'(x)$, so $p'(r) = q(r) = 0$", 2, true],
      ["conclude", "Hence $(x - r)$ divides $q$, and $(x - r)^{2}$ divides $p$", 1, true],
    ]),
  short(m(DR, "transfer-leibniz-three", "transfer", 9, 180, "Derive $(fg)''' = f'''g + 3f''g' + 3f'g'' + fg'''$ and explain the connection with the binomial theorem."),
    [
      ["derive", "Differentiates $(fg)'' = f''g + 2f'g' + fg''$ once more with the product rule and collects terms", 2, true],
      ["binomial", "The coefficients $1, 3, 3, 1$ are $\\binom{3}{k}$: each differentiation sends one more derivative to either factor, as in $(a + b)^{3}$", 2, true],
    ]),
  num(m(DR, "transfer-leibniz-value", "transfer", 9, 90, "Let $h(x) = x^{2}g(x)$ with $g(0) = 1$, $g'(0) = 2$, $g''(0) = 3$ and $g'''(0) = 4$. Find $h'''(0)$."), 12),
  mcq(m(DR, "transfer-log-derivative-product", "transfer", 9, 90, "For positive differentiable $f$ and $g$, the product rule can be rewritten as:"),
    "$\\frac{(fg)'}{fg} = \\frac{f'}{f} + \\frac{g'}{g}$",
    [
      ["$\\frac{(fg)'}{fg} = \\frac{f'}{f} \\cdot \\frac{g'}{g}$", "logprod-multiply", "Relative rates add for a product."],
      ["$(fg)' = \\frac{f'}{f} + \\frac{g'}{g}$", "logprod-no-divide", "The left side must also be divided by $fg$."],
      ["$\\frac{(fg)'}{fg} = f' + g'$", "logprod-absolute", "Each term is a relative rate, $\\frac{f'}{f}$."],
    ]),
  // level 10
  short(m(DR, "transfer-smooth-join", "transfer", 10, 180, "For which $a$ and $b$ is $f(x) = ax^{2} + b$ for $x \\le 1$ and $f(x) = \\frac{1}{x}$ for $x > 1$ differentiable at $x = 1$?"),
    [
      ["continuity", "Continuity at $1$: $a + b = 1$", 1, true],
      ["slopes", "Matching slopes: $2a = -1$", 1, true],
      ["solve", "Gets $a = -\\frac{1}{2}$, $b = \\frac{3}{2}$", 2, true],
    ]),
  short(m(DR, "transfer-quotient-definition", "transfer", 10, 180, "Prove the quotient rule directly from the limit definition (assume $g(x) \\ne 0$ and $g$ is differentiable)."),
    [
      ["combine", "Writes $\\frac{1}{h}\\left(\\frac{f(x + h)}{g(x + h)} - \\frac{f(x)}{g(x)}\\right) = \\frac{f(x + h)g(x) - f(x)g(x + h)}{h\\,g(x)g(x + h)}$", 2, true],
      ["split", "Adds and subtracts $f(x)g(x)$, splits into $g\\frac{\\Delta f}{h} - f\\frac{\\Delta g}{h}$ over $g(x)g(x + h) \\to g(x)^{2}$, giving $\\frac{f'g - fg'}{g^{2}}$", 2, true],
    ]),
  num(m(DR, "transfer-many-roots", "transfer", 10, 120, "For $f(x) = (x - 1)(x - 2)\\cdots(x - 10)$, find $f'(1)$."), -362880),
  mcq(m(DR, "transfer-constant-ratio", "transfer", 10, 120, "If $\\frac{f}{g}$ is constant on an interval (with $g \\ne 0$), then on that interval:"),
    "$f'g = fg'$",
    [
      ["$f' = g'$", "ratio-equal", "$f = 2g$ has constant ratio but $f' = 2g'$."],
      ["$f'g + fg' = 0$", "ratio-product", "That's the condition for $fg$ to be constant."],
      ["$f' = 0$", "ratio-flat", "$f = 2x$, $g = x$ has constant ratio and $f' = 2$."],
    ]),
];

export const calc08Items: Item[] = [...linearity, ...powerRule, ...productQuotient];
