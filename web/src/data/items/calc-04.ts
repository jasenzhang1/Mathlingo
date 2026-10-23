import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./calc-shared";

/**
 * Calculus course, part 4: Riemann sums and the definite integral, the
 * fundamental theorem, substitution, and integration by parts. Forty questions
 * per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// riemann-sums
// ---------------------------------------------------------------------------
const RS = "riemann-sums";
const riemannSums: Item[] = [
  // level 1
  mcq(m(RS, "recall-delta-x", "recall", 1, 15, "With $n$ equal subintervals of $[a, b]$, the width $\\Delta x$ is:"),
    "$\\frac{b - a}{n}$",
    [
      ["$\\frac{n}{b - a}$", "deltax-inverted", "That's the number of strips per unit length."],
      ["$b - a$", "deltax-whole", "That's the whole interval."],
      ["$\\frac{b + a}{n}$", "deltax-sum", "The width depends on the length $b - a$."],
    ]),
  mcq(m(RS, "recall-definition", "recall", 1, 15, "The definite integral $\\int_a^b f(x)\\,dx$ is defined as:"),
    "The limit of Riemann sums as the number of subintervals tends to infinity",
    [
      ["A Riemann sum with a large $n$", "intdef-finite", "Any finite sum is only an approximation."],
      ["An antiderivative of $f$", "intdef-antiderivative", "The FTC links them, but the integral is defined as a limit of sums."],
      ["The maximum of $f$ times $b - a$", "intdef-max", "That's an upper bound."],
    ]),
  mcq(m(RS, "recall-signed", "recall", 1, 15, "Where $f(x) < 0$, the definite integral counts the area between the graph and the $x$-axis:"),
    "Negatively",
    [
      ["Positively", "signed-positive", "Rectangles below the axis have negative height."],
      ["Not at all", "signed-ignored", "Those regions contribute with a minus sign."],
      ["Twice", "signed-double", "Each region counts once, with its sign."],
    ]),
  mcq(m(RS, "recall-right-sum", "recall", 1, 15, "A right Riemann sum uses rectangle heights equal to:"),
    "The value of $f$ at the right endpoint of each subinterval",
    [
      ["The value at the left endpoint", "rightsum-left", "That's the left sum."],
      ["The value at the midpoint", "rightsum-mid", "That's the midpoint sum."],
      ["The largest value on the subinterval", "rightsum-upper", "That's an upper sum."],
    ]),
  // level 2
  num(m(RS, "apply-width", "apply", 2, 20, "Find $\\Delta x$ for $8$ equal subintervals of $[1, 5]$."), 0.5),
  num(m(RS, "apply-right-two", "apply", 2, 20, "Compute the right Riemann sum $R_2$ for $f(x) = x^{2}$ on $[0, 2]$."), 5),
  num(m(RS, "apply-rectangle", "apply", 2, 20, "Evaluate $\\int_0^{3} 2\\,dx$ as an area."), 6),
  mcq(m(RS, "apply-zero-width", "apply", 2, 20, "$\\int_a^a f(x)\\,dx =$"),
    "$0$",
    [
      ["$f(a)$", "zerowidth-value", "A strip of zero width has zero area."],
      ["$1$", "zerowidth-one", "There's no width at all."],
      ["It is undefined", "zerowidth-undefined", "It's defined and equals $0$."],
    ]),
  // level 3
  num(m(RS, "apply-midpoint-two", "apply", 3, 25, "Compute the midpoint sum $M_2$ for $f(x) = x^{2}$ on $[0, 2]$."), 2.5),
  num(m(RS, "apply-odd-symmetry", "apply", 3, 25, "Evaluate $\\int_{-2}^{2} x^{3}\\,dx$."), 0),
  num(m(RS, "apply-geometry-abs", "apply", 3, 25, "Evaluate $\\int_0^{4} |x - 2|\\,dx$ using geometry."), 4),
  mcq(m(RS, "apply-reverse", "apply", 3, 25, "$\\int_b^a f(x)\\,dx =$"),
    "$-\\int_a^b f(x)\\,dx$",
    [
      ["$\\int_a^b f(x)\\,dx$", "reverse-same", "Reversing the limits flips the sign."],
      ["$0$", "reverse-zero", "Only when $a = b$ or the integral is $0$."],
      ["$\\int_a^b -f(-x)\\,dx$", "reverse-reflect", "That changes the integrand, not just the direction."],
    ]),
  // level 4
  num(m(RS, "apply-left-reciprocal", "apply", 4, 30, "Compute the left sum $L_4$ for $f(x) = \\frac{1}{x}$ on $[1, 3]$. Give $4$ decimal places."), 1.2833),
  num(m(RS, "apply-quarter-circle", "apply", 4, 30, "Evaluate $\\int_0^{2} \\sqrt{4 - x^{2}}\\,dx$ using geometry. Give $2$ decimal places."), 3.14),
  num(m(RS, "apply-additivity", "apply", 4, 30, "If $\\int_0^{5} f = 7$ and $\\int_0^{2} f = 3$, find $\\int_2^{5} f$."), 4),
  mcq(m(RS, "apply-increasing-left", "apply", 4, 30, "For an increasing function, the left Riemann sum is:"),
    "An underestimate of the integral",
    [
      ["An overestimate", "incleft-over", "Left endpoints are the lowest points of each strip."],
      ["Exact", "incleft-exact", "Only for constant functions."],
      ["Sometimes over, sometimes under", "incleft-mixed", "For increasing $f$ it always underestimates."],
    ]),
  // level 5
  short(m(RS, "explain-left-under", "explain", 5, 90, "Explain why the left Riemann sum underestimates $\\int_a^b f$ when $f$ is increasing."),
    [
      ["heights", "On each subinterval the left endpoint gives the smallest value of an increasing $f$", 2, true],
      ["below", "So each rectangle lies under the graph, and their total area is less than the integral", 2, true],
    ]),
  mcq(m(RS, "apply-identify-sum", "apply", 5, 40, "$\\sum_{i=1}^{n} \\left(1 + \\frac{i}{n}\\right)^{2} \\cdot \\frac{1}{n}$ is:"),
    "The right Riemann sum of $x^{2}$ on $[1, 2]$",
    [
      ["The left Riemann sum of $x^{2}$ on $[1, 2]$", "identify-left", "$i$ runs from $1$ to $n$, so the sample points are right endpoints."],
      ["The right Riemann sum of $x^{2}$ on $[0, 1]$", "identify-interval", "The points $1 + \\frac{i}{n}$ lie in $[1, 2]$."],
      ["The right Riemann sum of $(1 + x)^{2}$ on $[1, 2]$", "identify-shift", "That would need points $1 + \\left(1 + \\frac{i}{n}\\right)$."],
    ]),
  mcq(m(RS, "apply-bounds", "apply", 5, 40, "If $1 \\le f(x) \\le 3$ on $[0, 2]$, then $\\int_0^{2} f(x)\\,dx$ lies in:"),
    "$[2, 6]$",
    [
      ["$[1, 3]$", "bounds-no-length", "Multiply the bounds by the length $2$."],
      ["$[0, 6]$", "bounds-loose", "The lower bound is $1 \\cdot 2 = 2$."],
      ["$[2, 3]$", "bounds-half", "The upper bound is $3 \\cdot 2 = 6$."],
    ]),
  num(m(RS, "apply-trapezoid", "apply", 5, 40, "Compute the trapezoid estimate $T_4$ for $\\int_0^{2} x^{2}\\,dx$."), 2.75),
  // level 6
  short(m(RS, "explain-velocity", "explain", 6, 120, "If $v(t)$ is a velocity, what does $\\int_0^{10} v(t)\\,dt$ measure? When is it different from the total distance travelled?"),
    [
      ["displacement", "It's the net change in position (displacement)", 2, true],
      ["distance", "It differs from distance when $v$ changes sign; distance is $\\int |v(t)|\\,dt$", 2, true],
    ]),
  num(m(RS, "apply-limit-to-integral", "apply", 6, 45, "Evaluate $\\lim_{n \\to \\infty} \\sum_{i=1}^{n} \\frac{3}{n}\\left(\\frac{3i}{n}\\right)^{2}$ by recognising it as an integral."), 9),
  num(m(RS, "apply-symmetric-integrand", "apply", 6, 45, "Evaluate $\\int_{-1}^{1} (x^{5} + 3)\\,dx$."), 6),
  mcq(m(RS, "apply-not-integrable", "apply", 6, 45, "Which function is $\\textbf{NOT}$ Riemann integrable on $[0, 1]$?"),
    "$f(x) = 1$ for rational $x$, $0$ for irrational $x$",
    [
      ["A step function with finitely many jumps", "integrable-step", "Finitely many jumps don't stop the sums converging."],
      ["$\\sin\\left(\\frac{1}{x}\\right)$ with $f(0) = 0$", "integrable-oscillating", "It's bounded with a single bad point, so it is integrable."],
      ["$\\left|x - \\frac{1}{2}\\right|$", "integrable-abs", "It's continuous."],
    ]),
  // level 7
  short(m(RS, "explain-limit-linear", "explain", 7, 120, "Compute $\\int_0^{1} x\\,dx$ as the limit of right Riemann sums."),
    [
      ["sum", "$R_n = \\sum_{i=1}^{n} \\frac{i}{n} \\cdot \\frac{1}{n} = \\frac{1}{n^{2}}\\sum_{i=1}^{n} i = \\frac{n + 1}{2n}$", 2, true],
      ["limit", "As $n \\to \\infty$, $R_n \\to \\frac{1}{2}$", 2, true],
    ]),
  num(m(RS, "apply-limit-quadratic", "apply", 7, 60, "Evaluate $\\lim_{n \\to \\infty} R_n$ for $\\int_0^{2} x^{2}\\,dx$. Give $4$ decimal places."), 2.6667),
  num(m(RS, "apply-midpoint-error", "apply", 7, 60, "Find $\\left|M_2 - \\int_0^{2} x^{2}\\,dx\\right|$, the error of the two-strip midpoint rule. Give $4$ decimal places."), 0.1667),
  mcq(m(RS, "apply-error-rate", "apply", 7, 60, "For smooth $f$, the errors of the midpoint and trapezoid rules shrink like:"),
    "$\\frac{1}{n^{2}}$",
    [
      ["$\\frac{1}{n}$", "rate-linear", "That's the rate for left and right sums."],
      ["$\\frac{1}{n^{4}}$", "rate-simpson", "That's Simpson's rule."],
      ["$e^{-n}$", "rate-exponential", "Polynomial-order rules converge polynomially."],
    ]),
  // level 8
  short(m(RS, "explain-limit-cubic-area", "explain", 8, 150, "Show that the limit of right Riemann sums for $\\int_0^{b} x^{2}\\,dx$ is $\\frac{b^{3}}{3}$."),
    [
      ["sum", "$R_n = \\sum_{i=1}^{n} \\left(\\frac{bi}{n}\\right)^{2}\\frac{b}{n} = \\frac{b^{3}}{n^{3}}\\sum i^{2} = \\frac{b^{3}(n + 1)(2n + 1)}{6n^{2}}$", 2, true],
      ["limit", "The fraction $\\frac{(n + 1)(2n + 1)}{n^{2}} \\to 2$, giving $\\frac{b^{3}}{3}$", 2, true],
    ]),
  num(m(RS, "apply-quarter-unit-circle", "apply", 8, 75, "Evaluate $\\int_0^{1} \\sqrt{1 - x^{2}}\\,dx$. Give $4$ decimal places."), 0.7854),
  num(m(RS, "apply-right-minus-left", "apply", 8, 75, "For $f(x) = x^{3}$ on $[0, 2]$ with $n = 100$, compute $R_n - L_n$."), 0.16),
  mcq(m(RS, "recall-sum-squares", "recall", 8, 75, "$\\sum_{i=1}^{n} i^{2} =$"),
    "$\\frac{n(n + 1)(2n + 1)}{6}$",
    [
      ["$\\frac{n(n + 1)}{2}$", "sumsq-linear", "That's $\\sum i$."],
      ["$\\left(\\frac{n(n + 1)}{2}\\right)^{2}$", "sumsq-cubes", "That's $\\sum i^{3}$."],
      ["$\\frac{n^{3}}{3}$", "sumsq-leading", "That's only the leading term."],
    ]),
  // level 9
  short(m(RS, "transfer-monotone-gap", "transfer", 9, 180, "For monotone $f$ on $[a, b]$, show that $|R_n - L_n| = |f(b) - f(a)|\\,\\Delta x$. What does this imply about convergence?"),
    [
      ["telescope", "$R_n - L_n = \\Delta x \\sum (f(x_i) - f(x_{i - 1})) = \\Delta x(f(b) - f(a))$ by telescoping", 2, true],
      ["implication", "The integral lies between $L_n$ and $R_n$, and the gap shrinks like $\\frac{1}{n}$, so both converge to it", 2, true],
    ]),
  short(m(RS, "transfer-exact-linear", "transfer", 9, 180, "Show that the trapezoid rule is exact for linear functions, and explain why the midpoint rule is too."),
    [
      ["trapezoid", "Under a line, each strip is exactly a trapezoid, so the trapezoid area is the exact area", 2, true],
      ["midpoint", "For a line, the midpoint height equals the average of the endpoint heights (the triangles above and below cancel), so the midpoint rule gives the same exact value", 2, true],
    ]),
  num(m(RS, "transfer-exp-sum", "transfer", 9, 90, "Evaluate $\\lim_{n \\to \\infty} \\frac{1}{n}\\sum_{i=1}^{n} e^{i/n}$. Give $3$ decimal places."), 1.718),
  mcq(m(RS, "transfer-arctan-sum", "transfer", 9, 90, "$\\lim_{n \\to \\infty} \\sum_{i=1}^{n} \\frac{n}{n^{2} + i^{2}} =$"),
    "$\\frac{\\pi}{4}$",
    [
      ["$1$", "arctansum-one", "It's $\\int_0^{1} \\frac{dx}{1 + x^{2}}$."],
      ["$\\ln 2$", "arctansum-log", "That would be $\\int_0^{1} \\frac{dx}{1 + x}$."],
      ["$\\frac{\\pi}{2}$", "arctansum-half", "$\\arctan 1 = \\frac{\\pi}{4}$."],
    ]),
  // level 10
  short(m(RS, "transfer-zero-integral", "transfer", 10, 180, "Prove that if $f$ is continuous and nonnegative on $[a, b]$ and $\\int_a^b f = 0$, then $f(x) = 0$ for every $x$."),
    [
      ["suppose", "Suppose $f(c) > 0$; by continuity $f > \\frac{f(c)}{2}$ on some interval of length $\\delta > 0$ around $c$", 2, true],
      ["contradiction", "Then $\\int_a^b f \\ge \\frac{f(c)}{2}\\delta > 0$ (since $f \\ge 0$ elsewhere), a contradiction", 2, true],
    ]),
  short(m(RS, "transfer-product-limit", "transfer", 10, 180, "Find $\\lim_{n \\to \\infty} \\left(\\prod_{i=1}^{n}\\left(1 + \\frac{i}{n}\\right)\\right)^{1/n}$ by taking logarithms."),
    [
      ["log", "The logarithm is $\\frac{1}{n}\\sum \\ln\\left(1 + \\frac{i}{n}\\right) \\to \\int_0^{1} \\ln(1 + x)\\,dx$", 2, true],
      ["value", "$\\int_0^{1} \\ln(1 + x)\\,dx = 2\\ln 2 - 1$, so the limit is $e^{2\\ln 2 - 1} = \\frac{4}{e}$", 2, true],
    ]),
  num(m(RS, "transfer-product-value", "transfer", 10, 120, "Evaluate $\\lim_{n \\to \\infty} \\left(\\prod_{i=1}^{n}\\left(1 + \\frac{i}{n}\\right)\\right)^{1/n}$. Give $3$ decimal places."), 1.472),
  mcq(m(RS, "transfer-harmonic-tail", "transfer", 10, 120, "$\\lim_{n \\to \\infty} \\sum_{i = n + 1}^{2n} \\frac{1}{i} =$"),
    "$\\ln 2$",
    [
      ["$1$", "tail-one", "There are $n$ terms, each between $\\frac{1}{2n}$ and $\\frac{1}{n}$; the sum tends to $\\int_1^{2}\\frac{dx}{x}$."],
      ["$\\frac{1}{2}$", "tail-half", "That's only the lower bound."],
      ["$\\infty$", "tail-infinite", "Each term is at most $\\frac{1}{n}$ and there are $n$ of them."],
    ]),
];

// ---------------------------------------------------------------------------
// fundamental-theorem-of-calculus
// ---------------------------------------------------------------------------
const FT = "fundamental-theorem-of-calculus";
const fundamentalTheorem: Item[] = [
  // level 1
  mcq(m(FT, "recall-part-one", "recall", 1, 15, "For continuous $f$, $\\frac{d}{dx}\\int_a^x f(t)\\,dt =$"),
    "$f(x)$",
    [
      ["$F(x)$", "partone-antiderivative", "Differentiating the area function returns the integrand."],
      ["$f(x) - f(a)$", "partone-subtract", "The lower limit is a constant and drops out."],
      ["$f'(x)$", "partone-derivative", "Integration and differentiation undo each other; no extra derivative appears."],
    ]),
  mcq(m(FT, "recall-part-two", "recall", 1, 15, "$\\int_a^b f(x)\\,dx = F(b) - F(a)$ holds when:"),
    "$F' = f$ on $[a, b]$",
    [
      ["$F = f'$", "parttwo-reversed", "$F$ must be an antiderivative of $f$."],
      ["$F(a) = 0$", "parttwo-zero", "Any antiderivative works; the constant cancels."],
      ["$f$ is a polynomial", "parttwo-polynomial", "Any continuous $f$ with antiderivative $F$ works."],
    ]),
  mcq(m(FT, "recall-antiderivative", "recall", 1, 15, "Which is an antiderivative of $2x$?"),
    "$x^{2} + 7$",
    [
      ["$2$", "anti-derivative", "That's the derivative."],
      ["$2x^{2}$", "anti-no-divide", "Its derivative is $4x$."],
      ["$\\frac{x^{2}}{2}$", "anti-wrong-coefficient", "Its derivative is $x$."],
    ]),
  mcq(m(FT, "recall-log-antiderivative", "recall", 1, 15, "$\\int \\frac{1}{x}\\,dx =$"),
    "$\\ln|x| + C$",
    [
      ["$\\frac{x^{0}}{0} + C$", "log-power-rule", "The power rule fails at $n = -1$."],
      ["$-\\frac{1}{x^{2}} + C$", "log-derivative", "That's the derivative of $\\frac{1}{x}$."],
      ["$\\frac{1}{x^{2}} + C$", "log-guess", "Its derivative is $-\\frac{2}{x^{3}}$."],
    ]),
  // level 2
  num(m(FT, "apply-cubic", "apply", 2, 20, "Evaluate $\\int_0^{2} 3x^{2}\\,dx$."), 8),
  num(m(FT, "apply-linear", "apply", 2, 20, "Evaluate $\\int_1^{3} (2x + 1)\\,dx$."), 10),
  num(m(FT, "apply-sine-arch", "apply", 2, 20, "Evaluate $\\int_0^{\\pi} \\sin x\\,dx$."), 2),
  mcq(m(FT, "apply-power-antiderivative", "apply", 2, 20, "For $n \\ne -1$, $\\int x^{n}\\,dx =$"),
    "$\\frac{x^{n + 1}}{n + 1} + C$",
    [
      ["$nx^{n - 1} + C$", "power-derivative", "That's the derivative."],
      ["$\\frac{x^{n + 1}}{n} + C$", "power-wrong-divisor", "Divide by the new exponent $n + 1$."],
      ["$x^{n + 1} + C$", "power-no-divide", "Its derivative is $(n + 1)x^{n}$."],
    ]),
  // level 3
  num(m(FT, "apply-sqrt", "apply", 3, 25, "Evaluate $\\int_1^{4} \\sqrt{x}\\,dx$. Give $3$ decimal places."), 4.667),
  num(m(FT, "apply-exp", "apply", 3, 25, "Evaluate $\\int_0^{1} e^{x}\\,dx$. Give $3$ decimal places."), 1.718),
  num(m(FT, "apply-part-one", "apply", 3, 25, "Let $F(x) = \\int_0^{x} t^{3}\\,dt$. Find $F'(2)$."), 8),
  mcq(m(FT, "apply-average-formula", "apply", 3, 25, "The average value of $f$ on $[a, b]$ is:"),
    "$\\frac{1}{b - a}\\int_a^b f(x)\\,dx$",
    [
      ["$\\frac{f(a) + f(b)}{2}$", "average-endpoints", "That only uses two values."],
      ["$\\int_a^b f(x)\\,dx$", "average-no-divide", "Divide by the length of the interval."],
      ["$\\frac{f(b) - f(a)}{b - a}$", "average-slope", "That's the average rate of change."],
    ]),
  // level 4
  num(m(FT, "apply-log-integral", "apply", 4, 30, "Evaluate $\\int_1^{e} \\frac{1}{x}\\,dx$."), 1),
  num(m(FT, "apply-variable-limit", "apply", 4, 30, "Let $G(x) = \\int_0^{x^{2}} \\cos t\\,dt$. Find $G'\\left(\\sqrt{\\pi}\\right)$. Give $3$ decimal places."), -3.545),
  num(m(FT, "apply-average-square", "apply", 4, 30, "Find the average value of $f(x) = x^{2}$ on $[0, 3]$."), 3),
  mcq(m(FT, "apply-hidden-singularity", "apply", 4, 30, "A student writes $\\int_{-1}^{1} \\frac{1}{x^{2}}\\,dx = \\left[-\\frac{1}{x}\\right]_{-1}^{1} = -2$. The correct statement is:"),
    "The integral diverges: $\\frac{1}{x^{2}}$ is unbounded at $0$, so the FTC doesn't apply",
    [
      ["The answer $-2$ is correct", "hidden-correct", "A positive integrand can't have a negative integral."],
      ["The answer is $2$", "hidden-two", "Both halves diverge."],
      ["The answer is $0$ by symmetry", "hidden-symmetry", "The integrand is even, not odd, and unbounded."],
    ]),
  // level 5
  short(m(FT, "explain-plus-c", "explain", 5, 90, "Use the mean value theorem to explain why any two antiderivatives of $f$ on an interval differ by a constant."),
    [
      ["difference", "If $F' = G' = f$, then $(F - G)' = 0$ on the interval", 2, true],
      ["mvt", "By the MVT a function with zero derivative is constant, so $F = G + C$", 2, true],
    ]),
  mcq(m(FT, "apply-critical-area-function", "apply", 5, 40, "$F(x) = \\int_2^{x} (t^{2} - 4)\\,dt$ has $F'(x) = 0$ at:"),
    "$x = \\pm 2$",
    [
      ["$x = 2$ only", "areacrit-one-root", "$x^{2} - 4 = 0$ also at $x = -2$."],
      ["$x = 0$", "areacrit-zero", "$F'(x) = x^{2} - 4$, which is $-4$ at $0$."],
      ["$x = 4$", "areacrit-four", "Solve $x^{2} = 4$."],
    ]),
  mcq(m(FT, "apply-net-change", "apply", 5, 40, "If $v(t)$ is velocity, $\\int_a^b v(t)\\,dt$ is:"),
    "The displacement between times $a$ and $b$",
    [
      ["The total distance travelled", "netchange-distance", "Distance needs $|v|$."],
      ["The average velocity", "netchange-average", "Divide by $b - a$ for that."],
      ["The acceleration", "netchange-acceleration", "Acceleration is $v'$."],
    ]),
  num(m(FT, "apply-displacement", "apply", 5, 40, "A particle has velocity $v(t) = t^{2} - 4t$. Find its displacement from $t = 0$ to $t = 6$."), 0),
  // level 6
  short(m(FT, "explain-strip-argument", "explain", 6, 120, "Explain Part 1 of the fundamental theorem — why $\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$ — using a thin strip."),
    [
      ["strip", "$A(x + h) - A(x)$ is the area of a thin strip of width $h$ and height about $f(x)$", 2, true],
      ["limit", "So $\\frac{A(x + h) - A(x)}{h} \\approx f(x)$, with equality in the limit by continuity", 2, true],
    ]),
  num(m(FT, "apply-distance", "apply", 6, 45, "A particle has velocity $v(t) = t^{2} - 4t$. Find the total distance travelled from $t = 0$ to $t = 6$. Give $2$ decimal places."), 21.33),
  num(m(FT, "apply-second-derivative-area", "apply", 6, 45, "Let $F(x) = \\int_0^{x} e^{-t^{2}}\\,dt$. Find $F''(1)$. Give $3$ decimal places."), -0.736),
  mcq(m(FT, "apply-area-function-max", "apply", 6, 45, "Where does $F(x) = \\int_0^{x} (t - 1)(t - 3)\\,dt$ have a local maximum?"),
    "$x = 1$",
    [
      ["$x = 3$", "areamax-min", "$F'$ goes from negative to positive at $3$: a local minimum."],
      ["$x = 0$", "areamax-zero", "$F'(0) = 3 \\ne 0$."],
      ["$x = 2$", "areamax-midpoint", "$F'(2) = -1 \\ne 0$."],
    ]),
  // level 7
  short(m(FT, "explain-log-across-zero", "explain", 7, 120, "A student computes $\\int_{-1}^{2} \\frac{1}{x}\\,dx = \\ln 2 - \\ln 1 = \\ln 2$. Explain what is wrong."),
    [
      ["singularity", "$\\frac{1}{x}$ is unbounded at $0$, which lies inside $[-1, 2]$, so the FTC doesn't apply", 2, true],
      ["divergence", "The integral is improper and diverges (each piece $\\int_{-1}^{0}$ and $\\int_0^{2}$ diverges)", 2, true],
    ]),
  num(m(FT, "apply-both-limits", "apply", 7, 60, "Let $G(x) = \\int_x^{x^{2}} \\frac{1}{t}\\,dt$. Find $G'(2)$."), 0.5),
  num(m(FT, "apply-recover-f", "apply", 7, 60, "$f$ is continuous and $\\int_0^{x} f(t)\\,dt = x^{2}\\sin(\\pi x)$ for all $x$. Find $f\\left(\\frac{1}{2}\\right)$."), 1),
  mcq(m(FT, "apply-flow", "apply", 7, 60, "Water flows into a tank at $r(t)$ litres per minute. $\\int_0^{10} r(t)\\,dt$ is:"),
    "The change in the volume of water over the first $10$ minutes",
    [
      ["The volume of water in the tank at $t = 10$", "flow-total", "Only if the tank started empty."],
      ["The flow rate at $t = 10$", "flow-rate", "That's $r(10)$."],
      ["The average flow rate", "flow-average", "Divide by $10$ for that."],
    ]),
  // level 8
  short(m(FT, "explain-part-two-proof", "explain", 8, 150, "Prove Part 2 of the fundamental theorem from Part 1."),
    [
      ["area", "Let $A(x) = \\int_a^x f$; by Part 1, $A' = f$", 1, true],
      ["constant", "If $F' = f$ too, then $F = A + C$ (equal derivatives)", 2, true],
      ["evaluate", "So $F(b) - F(a) = A(b) - A(a) = \\int_a^b f - 0$", 1, true],
    ]),
  num(m(FT, "apply-solve-limit", "apply", 8, 75, "Find $a > 0$ such that $\\int_0^{a} x^{2}\\,dx = 9$."), 3),
  num(m(FT, "apply-limit-average", "apply", 8, 75, "Find $\\lim_{h \\to 0} \\frac{1}{h}\\int_2^{2 + h} e^{t^{2}}\\,dt$. Give $2$ decimal places."), 54.6),
  mcq(m(FT, "apply-abs-area-function", "apply", 8, 75, "$\\int_0^{x} |t|\\,dt =$"),
    "$\\frac{x|x|}{2}$",
    [
      ["$\\frac{x^{2}}{2}$", "absarea-square", "For $x < 0$ the integral from $0$ to $x$ is negative."],
      ["$|x|$", "absarea-abs", "That's the derivative's absolute value, not the integral."],
      ["$-\\frac{x^{2}}{2}$ for all $x$", "absarea-negative", "For $x > 0$ it's positive."],
    ]),
  // level 9
  short(m(FT, "transfer-mvt-integrals", "transfer", 9, 180, "Prove the mean value theorem for integrals: if $f$ is continuous on $[a, b]$, then $f(c) = \\frac{1}{b - a}\\int_a^b f$ for some $c \\in [a, b]$."),
    [
      ["bounds", "With $m$ and $M$ the min and max of $f$ (extreme value theorem), $m \\le \\frac{1}{b - a}\\int_a^b f \\le M$", 2, true],
      ["ivt", "$f$ takes every value between $m$ and $M$ (IVT), so it takes the average value", 2, true],
    ]),
  short(m(FT, "transfer-log-product", "transfer", 9, 180, "Define $L(x) = \\int_1^{x} \\frac{dt}{t}$ for $x > 0$. Use the FTC to prove $L(ab) = L(a) + L(b)$."),
    [
      ["derivative", "$\\frac{d}{dx}L(ax) = \\frac{a}{ax} = \\frac{1}{x} = L'(x)$", 2, true],
      ["constant", "So $L(ax) - L(x)$ is constant; at $x = 1$ it equals $L(a)$, giving $L(ab) = L(a) + L(b)$", 2, true],
    ]),
  num(m(FT, "transfer-recover-composite", "transfer", 9, 90, "$f$ is continuous and $\\int_0^{x^{2}} f(t)\\,dt = x^{3}$ for $x > 0$. Find $f(4)$."), 3),
  mcq(m(FT, "transfer-odd-area", "transfer", 9, 90, "$F(x) = \\int_0^{x} \\sin(t^{2})\\,dt$ is:"),
    "An odd function",
    [
      ["An even function", "oddarea-even", "The integrand is even, so its integral from $0$ is odd."],
      ["Periodic", "oddarea-periodic", "$\\sin(t^{2})$ is not periodic in $t$."],
      ["Unbounded", "oddarea-unbounded", "It converges as $x \\to \\infty$ (a Fresnel integral)."],
    ]),
  // level 10
  short(m(FT, "transfer-integral-equation", "transfer", 10, 180, "Find all continuous $f$ with $f(x) = 1 + \\int_0^{x} f(t)\\,dt$ for all $x$."),
    [
      ["differentiate", "The right side is differentiable, so $f$ is, with $f' = f$; also $f(0) = 1$", 2, true],
      ["solve", "So $f(x) = e^{x}$ (e.g. $(fe^{-x})' = 0$), and it is the only solution", 2, true],
    ]),
  short(m(FT, "transfer-nonelementary", "transfer", 10, 180, "$\\int e^{-t^{2}}\\,dt$ has no elementary formula. Explain why $\\Phi(x) = \\int_{-\\infty}^{x} \\frac{1}{\\sqrt{2\\pi}}e^{-t^{2}/2}\\,dt$ is still a well-defined differentiable function, and find $\\Phi'(x)$."),
    [
      ["exists", "The integrand is continuous, so the area function exists (the improper part converges) — no formula is needed", 2, true],
      ["derivative", "By Part 1, $\\Phi'(x) = \\frac{1}{\\sqrt{2\\pi}}e^{-x^{2}/2}$, the normal density", 2, true],
    ]),
  num(m(FT, "transfer-integral-equation-value", "transfer", 10, 120, "$f$ is continuous and $f(x) = 3 + 2\\int_0^{x} f(t)\\,dt$ for all $x$. Find $f(1)$. Give $3$ decimal places."), 22.167),
  mcq(m(FT, "transfer-floor-area", "transfer", 10, 120, "Let $g(x) = \\int_0^{x} \\lfloor t \\rfloor\\,dt$. Then $g$ is:"),
    "Continuous everywhere and differentiable except at the integers",
    [
      ["Discontinuous at the integers", "floorarea-discontinuous", "Integrals of bounded functions are continuous."],
      ["Differentiable everywhere", "floorarea-differentiable", "At an integer the left and right slopes differ by $1$."],
      ["Constant between integers", "floorarea-constant", "Its slope there is $\\lfloor x \\rfloor$, usually nonzero."],
    ]),
];

// ---------------------------------------------------------------------------
// u-substitution
// ---------------------------------------------------------------------------
const US = "u-substitution";
const uSubstitution: Item[] = [
  // level 1
  mcq(m(US, "recall-reverses", "recall", 1, 15, "Substitution in integrals reverses:"),
    "The chain rule",
    [
      ["The product rule", "reverses-product", "That's integration by parts."],
      ["The quotient rule", "reverses-quotient", "Substitution undoes compositions."],
      ["The power rule", "reverses-power", "Substitution handles nested functions."],
    ]),
  mcq(m(US, "recall-choose-u", "recall", 1, 15, "For $\\int 2x(x^{2} + 1)^{5}\\,dx$, the natural choice is $u =$"),
    "$x^{2} + 1$",
    [
      ["$2x$", "chooseu-derivative", "$2x\\,dx$ is the $du$ that comes with $u = x^{2} + 1$."],
      ["$(x^{2} + 1)^{5}$", "chooseu-whole", "Then $du$ is messier than the original."],
      ["$x$", "chooseu-x", "That changes nothing."],
    ]),
  mcq(m(US, "recall-du", "recall", 1, 15, "If $u = g(x)$, then $du =$"),
    "$g'(x)\\,dx$",
    [
      ["$g(x)\\,dx$", "du-value", "$du$ uses the derivative."],
      ["$\\frac{dx}{g'(x)}$", "du-inverted", "$\\frac{du}{dx} = g'(x)$."],
      ["$dx$", "du-same", "Only if $g'(x) = 1$."],
    ]),
  mcq(m(US, "recall-limits", "recall", 1, 15, "When substituting in a definite integral, you must:"),
    "Change the limits to $u$-values, or substitute back to $x$ before evaluating",
    [
      ["Keep the $x$-limits with the $u$-antiderivative", "limits-mix", "That mixes variables and gives wrong answers."],
      ["Drop the limits", "limits-drop", "A definite integral needs them."],
      ["Double the limits", "limits-double", "The limits transform by $u = g(x)$."],
    ]),
  // level 2
  num(m(US, "apply-power-inner", "apply", 2, 20, "Evaluate $\\int_0^{1} 2x(x^{2} + 1)^{3}\\,dx$."), 3.75),
  num(m(US, "apply-sin-cos", "apply", 2, 20, "Evaluate $\\int_0^{\\pi/2} \\sin x\\cos x\\,dx$."), 0.5),
  num(m(US, "apply-linear-inner", "apply", 2, 20, "Evaluate $\\int_0^{1} (2x + 1)^{2}\\,dx$. Give $3$ decimal places."), 4.333),
  mcq(m(US, "apply-cos-3x", "apply", 2, 20, "$\\int \\cos(3x)\\,dx =$"),
    "$\\frac{1}{3}\\sin 3x + C$",
    [
      ["$3\\sin 3x + C$", "cos3x-multiply", "Differentiating $3\\sin 3x$ gives $9\\cos 3x$."],
      ["$\\sin 3x + C$", "cos3x-forget", "Its derivative is $3\\cos 3x$."],
      ["$-\\frac{1}{3}\\sin 3x + C$", "cos3x-sign", "$\\cos$ integrates to $+\\sin$."],
    ]),
  // level 3
  num(m(US, "apply-log-quotient", "apply", 3, 25, "Evaluate $\\int_0^{1} \\frac{x}{x^{2} + 1}\\,dx$. Give $3$ decimal places."), 0.347),
  num(m(US, "apply-log-over-x", "apply", 3, 25, "Evaluate $\\int_1^{e} \\frac{\\ln x}{x}\\,dx$."), 0.5),
  num(m(US, "apply-half-angle", "apply", 3, 25, "Evaluate $\\int_0^{\\pi} \\sin\\frac{x}{2}\\,dx$."), 2),
  mcq(m(US, "apply-gaussian-pair", "apply", 3, 25, "$\\int xe^{-x^{2}}\\,dx =$"),
    "$-\\frac{1}{2}e^{-x^{2}} + C$",
    [
      ["$\\frac{1}{2}e^{-x^{2}} + C$", "gauss-sign", "$du = -2x\\,dx$ brings a minus sign."],
      ["$-2e^{-x^{2}} + C$", "gauss-factor", "Divide by $-2$, don't multiply."],
      ["$\\frac{x^{2}}{2}e^{-x^{2}} + C$", "gauss-product", "Substitution, not a product of antiderivatives."],
    ]),
  // level 4
  num(m(US, "apply-leftover-x", "apply", 4, 30, "Evaluate $\\int_0^{3} x\\sqrt{x + 1}\\,dx$. Give $3$ decimal places."), 7.733),
  num(m(US, "apply-tan", "apply", 4, 30, "Evaluate $\\int_0^{\\pi/3} \\tan x\\,dx$. Give $3$ decimal places."), 0.693),
  num(m(US, "apply-cubic-root", "apply", 4, 30, "Evaluate $\\int_0^{1} x^{2}\\sqrt{x^{3} + 1}\\,dx$. Give $4$ decimal places."), 0.4063),
  mcq(m(US, "apply-impossible", "apply", 4, 30, "Can $\\int e^{-x^{2}}\\,dx$ be done by substituting $u = -x^{2}$?"),
    "No: there's no factor $x$ to supply $du$, and the integral has no elementary antiderivative",
    [
      ["Yes, giving $-\\frac{1}{2x}e^{-x^{2}} + C$", "impossible-divide", "Dividing by $x$ inside the integral isn't allowed: the derivative of that answer isn't $e^{-x^{2}}$."],
      ["Yes, giving $e^{-x^{2}} + C$", "impossible-ignore", "Its derivative is $-2xe^{-x^{2}}$."],
      ["Yes, after squaring both sides", "impossible-square", "Nothing like that applies."],
    ]),
  // level 5
  short(m(US, "explain-no-divide", "explain", 5, 90, "In $\\int e^{x^{2}}\\,dx$, why can't you set $u = x^{2}$ and simply divide by $2x$ to make up for the missing factor?"),
    [
      ["variable", "$x$ is a variable, not a constant: dividing by $2x$ leaves $x$ inside a $u$-integral, so the substitution hasn't removed $x$", 2, true],
      ["check", "Only constant factors can be adjusted; differentiating any such “answer” doesn't give back $e^{x^{2}}$", 2, true],
    ]),
  mcq(m(US, "apply-odd-integral", "apply", 5, 40, "If $f$ is odd, then $\\int_{-a}^{a} f(x)\\,dx =$"),
    "$0$",
    [
      ["$2\\int_0^{a} f$", "odd-even-rule", "That's for even functions."],
      ["$\\int_0^{a} f$", "odd-half", "The negative half cancels the positive half."],
      ["$f(a) - f(-a)$", "odd-endpoints", "That's $2f(a)$, not the integral."],
    ]),
  mcq(m(US, "apply-log-log", "apply", 5, 40, "$\\int \\frac{dx}{x\\ln x} =$"),
    "$\\ln|\\ln x| + C$",
    [
      ["$\\frac{(\\ln x)^{2}}{2} + C$", "loglog-power", "That's $\\int \\frac{\\ln x}{x}\\,dx$."],
      ["$\\ln|x\\ln x| + C$", "loglog-whole", "Its derivative is $\\frac{\\ln x + 1}{x\\ln x}$."],
      ["$\\frac{1}{\\ln x} + C$", "loglog-reciprocal", "Its derivative is $-\\frac{1}{x(\\ln x)^{2}}$."],
    ]),
  num(m(US, "apply-arctan-scaled", "apply", 5, 40, "Evaluate $\\int_0^{3} \\frac{dx}{9 + x^{2}}$. Give $4$ decimal places."), 0.2618),
  // level 6
  short(m(US, "explain-change-limits", "explain", 6, 120, "Explain why $\\int_a^b f(g(x))g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du$, using the fundamental theorem."),
    [
      ["chain", "If $F' = f$, then $(F \\circ g)' = f(g(x))g'(x)$ by the chain rule", 2, true],
      ["evaluate", "So the left side is $F(g(b)) - F(g(a))$, which equals the right side by the FTC", 2, true],
    ]),
  num(m(US, "apply-sin-square-arg", "apply", 6, 45, "Evaluate $\\int_0^{\\sqrt{\\pi}} x\\sin(x^{2})\\,dx$."), 1),
  num(m(US, "apply-exp-ratio", "apply", 6, 45, "Evaluate $\\int_0^{\\ln 2} \\frac{e^{x}}{1 + e^{x}}\\,dx$. Give $3$ decimal places."), 0.405),
  mcq(m(US, "apply-scaled-argument", "apply", 6, 45, "If $\\int_0^{4} f(x)\\,dx = 10$, then $\\int_0^{2} f(2x)\\,dx =$"),
    "$5$",
    [
      ["$10$", "scaled-same", "With $u = 2x$, $dx = \\frac{du}{2}$."],
      ["$20$", "scaled-double", "The factor is $\\frac{1}{2}$, not $2$."],
      ["$2.5$", "scaled-quarter", "The limits $0$ to $2$ become $0$ to $4$, so the factor is just $\\frac{1}{2}$."],
    ]),
  // level 7
  short(m(US, "explain-even-rule", "explain", 7, 120, "Prove that $\\int_{-a}^{a} f = 2\\int_0^{a} f$ for an even function $f$."),
    [
      ["split", "Splits $\\int_{-a}^{a} = \\int_{-a}^{0} + \\int_0^{a}$", 1, true],
      ["substitute", "Substitutes $u = -x$ in the first: $\\int_{-a}^{0} f(x)\\,dx = \\int_0^{a} f(-u)\\,du = \\int_0^{a} f(u)\\,du$", 3, true],
    ]),
  num(m(US, "apply-root-nested", "apply", 7, 60, "Evaluate $\\int_1^{4} \\frac{dx}{\\sqrt{x}\\left(1 + \\sqrt{x}\\right)}$. Give $3$ decimal places."), 0.811),
  num(m(US, "apply-cos-cubed", "apply", 7, 60, "Evaluate $\\int_0^{\\pi/2} \\cos^{3} x\\,dx$. Give $4$ decimal places."), 0.6667),
  mcq(m(US, "apply-same-limits", "apply", 7, 60, "$\\int_0^{\\pi} \\sin^{5} x\\cos x\\,dx =$"),
    "$0$",
    [
      ["$\\frac{1}{6}$", "samelim-sixth", "With $u = \\sin x$, both limits become $u = 0$."],
      ["$\\frac{1}{3}$", "samelim-third", "The $u$-limits are $0$ and $0$."],
      ["$\\frac{\\pi}{6}$", "samelim-pi", "No $\\pi$ survives the substitution."],
    ]),
  // level 8
  short(m(US, "explain-arcsin-scaled", "explain", 8, 150, "Evaluate $\\int \\frac{dx}{\\sqrt{4 - x^{2}}}$, explaining the substitution."),
    [
      ["substitute", "Factors out $4$ and sets $u = \\frac{x}{2}$, $dx = 2\\,du$: $\\int \\frac{2\\,du}{2\\sqrt{1 - u^{2}}}$", 2, true],
      ["answer", "Gets $\\arcsin\\frac{x}{2} + C$", 2, true],
    ]),
  num(m(US, "apply-cube-root-half", "apply", 8, 75, "Evaluate $\\int_0^{1} x^{3}\\sqrt{1 - x^{2}}\\,dx$. Give $4$ decimal places."), 0.1333),
  num(m(US, "apply-log-squared", "apply", 8, 75, "Evaluate $\\int_1^{2} \\frac{(\\ln x)^{2}}{x}\\,dx$. Give $3$ decimal places."), 0.111),
  mcq(m(US, "apply-sec-tan", "apply", 8, 75, "$\\int \\sec^{2} x\\tan x\\,dx =$"),
    "$\\frac{1}{2}\\tan^{2} x + C$ (equivalently $\\frac{1}{2}\\sec^{2} x + C$)",
    [
      ["$\\tan x\\sec x + C$", "sectan-product", "Its derivative isn't $\\sec^{2} x\\tan x$."],
      ["$\\frac{1}{3}\\sec^{3} x + C$", "sectan-power", "Its derivative is $\\sec^{3} x\\tan x$."],
      ["$\\ln|\\sec x| + C$", "sectan-log", "That's $\\int \\tan x\\,dx$."],
    ]),
  // level 9
  short(m(US, "transfer-sin-cos-powers", "transfer", 9, 180, "Show that $\\int_0^{\\pi/2} \\sin^{n} x\\,dx = \\int_0^{\\pi/2} \\cos^{n} x\\,dx$ for every $n$."),
    [
      ["substitute", "Substitutes $u = \\frac{\\pi}{2} - x$, so $\\sin x = \\cos u$ and $dx = -du$", 2, true],
      ["limits", "The limits swap ($0 \\leftrightarrow \\frac{\\pi}{2}$), and the minus sign flips them back", 2, true],
    ]),
  short(m(US, "transfer-reflection-trick", "transfer", 9, 180, "Use the substitution $x = \\pi - u$ to evaluate $I = \\int_0^{\\pi} \\frac{x\\sin x}{1 + \\cos^{2} x}\\,dx$."),
    [
      ["reflect", "The substitution gives $I = \\int_0^{\\pi} \\frac{(\\pi - u)\\sin u}{1 + \\cos^{2} u}\\,du$, so $2I = \\pi\\int_0^{\\pi} \\frac{\\sin u}{1 + \\cos^{2} u}\\,du$", 2, true],
      ["finish", "With $w = \\cos u$ the last integral is $\\int_{-1}^{1} \\frac{dw}{1 + w^{2}} = \\frac{\\pi}{2}$, so $I = \\frac{\\pi^{2}}{4}$", 2, true],
    ]),
  num(m(US, "transfer-reflection-value", "transfer", 9, 90, "Evaluate $\\int_0^{\\pi} \\frac{x\\sin x}{1 + \\cos^{2} x}\\,dx$. Give $3$ decimal places."), 2.467),
  mcq(m(US, "transfer-periodic", "transfer", 9, 90, "If $f$ is continuous with period $T$, then $\\int_a^{a + T} f(x)\\,dx$:"),
    "Is the same for every $a$",
    [
      ["Is $0$", "periodic-zero", "$\\sin^{2} x$ has period $\\pi$ and positive integral."],
      ["Depends on $a$", "periodic-depends", "Shifting a full period just rearranges the same area."],
      ["Equals $T f(a)$", "periodic-rectangle", "That's a one-rectangle estimate."],
    ]),
  // level 10
  short(m(US, "transfer-beta-symmetry", "transfer", 10, 180, "Prove that $\\int_0^{1} x^{m}(1 - x)^{n}\\,dx = \\int_0^{1} x^{n}(1 - x)^{m}\\,dx$."),
    [
      ["substitute", "Substitutes $u = 1 - x$, $dx = -du$, swapping the roles of $x$ and $1 - x$", 2, true],
      ["limits", "The limits $0 \\to 1$ become $1 \\to 0$, and the minus sign restores them", 2, true],
    ]),
  short(m(US, "transfer-kings-rule", "transfer", 10, 180, "Evaluate $I = \\int_0^{\\pi/2} \\frac{\\sin x}{\\sin x + \\cos x}\\,dx$ using the substitution $u = \\frac{\\pi}{2} - x$."),
    [
      ["swap", "The substitution turns $I$ into $J = \\int_0^{\\pi/2} \\frac{\\cos x}{\\sin x + \\cos x}\\,dx$, so $I = J$", 2, true],
      ["add", "$I + J = \\int_0^{\\pi/2} 1\\,dx = \\frac{\\pi}{2}$, so $I = \\frac{\\pi}{4}$", 2, true],
    ]),
  num(m(US, "transfer-log-arctan", "transfer", 10, 120, "Evaluate $\\int_0^{1} \\frac{\\ln(1 + x)}{1 + x^{2}}\\,dx$. Give $3$ decimal places."), 0.272),
  mcq(m(US, "transfer-pairing", "transfer", 10, 120, "$\\int_{-1}^{1} \\frac{dx}{1 + e^{x}} =$"),
    "$1$",
    [
      ["$\\ln 2$", "pairing-log", "Pair $x$ with $-x$: $\\frac{1}{1 + e^{x}} + \\frac{1}{1 + e^{-x}} = 1$, so the integral is half of $\\int_{-1}^{1} 1$."],
      ["$0$", "pairing-zero", "The integrand is positive."],
      ["$2$", "pairing-two", "The integrand is below $1$ everywhere."],
    ]),
];

// ---------------------------------------------------------------------------
// integration-by-parts
// ---------------------------------------------------------------------------
const IP = "integration-by-parts";
const integrationByParts: Item[] = [
  // level 1
  mcq(m(IP, "recall-formula", "recall", 1, 15, "Integration by parts says $\\int u\\,dv =$"),
    "$uv - \\int v\\,du$",
    [
      ["$uv + \\int v\\,du$", "parts-sign", "The second term is subtracted."],
      ["$\\int u\\,du \\cdot \\int v\\,dv$", "parts-product", "Integrals of products don't split like that."],
      ["$u'v - \\int v\\,du$", "parts-derivative", "The boundary term is $uv$."],
    ]),
  mcq(m(IP, "recall-origin", "recall", 1, 15, "Integration by parts comes from:"),
    "The product rule",
    [
      ["The chain rule", "origin-chain", "That gives substitution."],
      ["The quotient rule", "origin-quotient", "Parts integrates $(uv)' = u'v + uv'$."],
      ["The mean value theorem", "origin-mvt", "It's a differentiation rule run backwards."],
    ]),
  mcq(m(IP, "recall-liate", "recall", 1, 15, "For $\\int xe^{x}\\,dx$, the LIATE guideline suggests $u =$"),
    "$x$",
    [
      ["$e^{x}$", "liate-exp", "Exponentials come last in LIATE; choosing it makes the integral harder."],
      ["$xe^{x}$", "liate-whole", "Then $dv = dx$ and nothing simplifies."],
      ["$1$", "liate-one", "$u$ should be a factor that simplifies when differentiated."],
    ]),
  mcq(m(IP, "recall-log", "recall", 1, 15, "To integrate $\\ln x$ by parts, take:"),
    "$u = \\ln x$, $dv = dx$",
    [
      ["$u = 1$, $dv = \\ln x\\,dx$", "log-swap", "Then you need $\\int \\ln x$ to find $v$ — the original problem."],
      ["$u = x$, $dv = \\ln x\\,dx$", "log-x", "There's no factor $x$ in the integrand."],
      ["$u = \\frac{1}{x}$, $dv = dx$", "log-derivative", "$\\frac{1}{x}$ isn't a factor of $\\ln x$."],
    ]),
  // level 2
  num(m(IP, "apply-x-exp", "apply", 2, 20, "Evaluate $\\int_0^{1} xe^{x}\\,dx$."), 1),
  num(m(IP, "apply-x-sin", "apply", 2, 20, "Evaluate $\\int_0^{\\pi} x\\sin x\\,dx$. Give $3$ decimal places."), 3.142),
  num(m(IP, "apply-log", "apply", 2, 20, "Evaluate $\\int_1^{e} \\ln x\\,dx$."), 1),
  mcq(m(IP, "apply-x-cos", "apply", 2, 20, "$\\int x\\cos x\\,dx =$"),
    "$x\\sin x + \\cos x + C$",
    [
      ["$x\\sin x - \\cos x + C$", "xcos-sign", "$-\\int \\sin x\\,dx = +\\cos x$."],
      ["$\\frac{x^{2}}{2}\\sin x + C$", "xcos-product", "Integrals of products aren't products of integrals."],
      ["$-x\\sin x + \\cos x + C$", "xcos-first", "$v = \\sin x$, so the boundary term is $+x\\sin x$."],
    ]),
  // level 3
  num(m(IP, "apply-x-exp-neg", "apply", 3, 25, "Evaluate $\\int_0^{1} xe^{-x}\\,dx$. Give $3$ decimal places."), 0.264),
  num(m(IP, "apply-x-log", "apply", 3, 25, "Evaluate $\\int_1^{2} x\\ln x\\,dx$. Give $3$ decimal places."), 0.636),
  num(m(IP, "apply-x-cos-def", "apply", 3, 25, "Evaluate $\\int_0^{\\pi/2} x\\cos x\\,dx$. Give $3$ decimal places."), 0.571),
  mcq(m(IP, "apply-bad-choice", "apply", 3, 25, "In $\\int xe^{x}\\,dx$, choosing $u = e^{x}$ and $dv = x\\,dx$ leads to:"),
    "A harder integral, $\\int \\frac{x^{2}}{2}e^{x}\\,dx$",
    [
      ["The answer directly", "badchoice-works", "The power of $x$ goes up, not down."],
      ["The same integral again", "badchoice-same", "It produces $x^{2}e^{x}$, worse than $xe^{x}$."],
      ["An integral of $e^{x}$ alone", "badchoice-simple", "That needs $u = x$."],
    ]),
  // level 4
  num(m(IP, "apply-x2-exp", "apply", 4, 30, "Evaluate $\\int_0^{1} x^{2}e^{x}\\,dx$. Give $3$ decimal places."), 0.718),
  num(m(IP, "apply-arctan", "apply", 4, 30, "Evaluate $\\int_0^{1} \\arctan x\\,dx$. Give $4$ decimal places."), 0.4388),
  num(m(IP, "apply-exp-sin", "apply", 4, 30, "Evaluate $\\int_0^{\\pi} e^{x}\\sin x\\,dx$. Give $3$ decimal places."), 12.07),
  mcq(m(IP, "apply-tabular-stops", "apply", 4, 30, "In the tabular method for $\\int x^{3}e^{2x}\\,dx$, the table stops because:"),
    "Repeated derivatives of $x^{3}$ reach $0$",
    [
      ["Repeated integrals of $e^{2x}$ reach $0$", "tabular-integrals", "$e^{2x}$ never integrates to $0$."],
      ["The signs alternate", "tabular-signs", "Alternating signs don't end the table."],
      ["It never stops", "tabular-never", "After four rows the polynomial column is $0$."],
    ]),
  // level 5
  short(m(IP, "explain-choose-u", "explain", 5, 90, "How should $u$ and $dv$ be chosen in integration by parts? Explain the LIATE guideline and the reasoning behind it."),
    [
      ["principle", "Choose $u$ to simplify when differentiated and $dv$ to be easy to integrate, so $\\int v\\,du$ is simpler than the original", 2, true],
      ["liate", "LIATE (logarithmic, inverse trig, algebraic, trig, exponential) orders candidates for $u$: logs and inverse trig simplify most when differentiated, exponentials least", 2, true],
    ]),
  mcq(m(IP, "apply-solve-for-integral", "apply", 5, 40, "Parts twice on $I = \\int e^{x}\\cos x\\,dx$ gives $I = e^{x}\\cos x + e^{x}\\sin x - I$. So $I =$"),
    "$\\frac{1}{2}e^{x}(\\sin x + \\cos x) + C$",
    [
      ["$e^{x}(\\sin x + \\cos x) + C$", "solvefor-no-half", "Solve $2I = \\ldots$ for $I$."],
      ["$0$", "solvefor-zero", "$I$ appears on both sides with opposite signs, so it doesn't cancel."],
      ["$\\frac{1}{2}e^{x}(\\sin x - \\cos x) + C$", "solvefor-sign", "That's $\\int e^{x}\\sin x\\,dx$."],
    ]),
  mcq(m(IP, "apply-power-log", "apply", 5, 40, "For $\\int x^{n}\\ln x\\,dx$, choose:"),
    "$u = \\ln x$, $dv = x^{n}\\,dx$",
    [
      ["$u = x^{n}$, $dv = \\ln x\\,dx$", "powerlog-swap", "You'd need $\\int \\ln x$ first, and the power of $x$ grows."],
      ["$u = x^{n}\\ln x$, $dv = dx$", "powerlog-whole", "That makes $du$ messier."],
      ["Substitution with $u = \\ln x$", "powerlog-sub", "$x^{n}\\,dx$ isn't $\\frac{dx}{x}$ unless $n = -1$."],
    ]),
  num(m(IP, "apply-x2-log", "apply", 5, 40, "Evaluate $\\int_1^{e} x^{2}\\ln x\\,dx$. Give $3$ decimal places."), 4.575),
  // level 6
  short(m(IP, "explain-derive", "explain", 6, 120, "Derive the integration-by-parts formula from the product rule."),
    [
      ["product", "Starts from $(uv)' = u'v + uv'$", 1, true],
      ["integrate", "Integrates: $uv = \\int v\\,du + \\int u\\,dv$, and rearranges to $\\int u\\,dv = uv - \\int v\\,du$", 3, true],
    ]),
  num(m(IP, "apply-x2-sin", "apply", 6, 45, "Evaluate $\\int_0^{\\pi/2} x^{2}\\sin x\\,dx$. Give $3$ decimal places."), 1.142),
  num(m(IP, "apply-log-over-root", "apply", 6, 45, "Evaluate $\\int_1^{4} \\frac{\\ln x}{\\sqrt{x}}\\,dx$. Give $3$ decimal places."), 1.545),
  mcq(m(IP, "apply-sin-log", "apply", 6, 45, "$\\int \\sin(\\ln x)\\,dx$ is best done by:"),
    "Parts twice, then solving for the integral",
    [
      ["One substitution $u = \\ln x$ and nothing else", "sinlog-sub", "That gives $\\int e^{u}\\sin u\\,du$, which still needs parts twice."],
      ["The power rule", "sinlog-power", "No power of $x$ is involved."],
      ["Partial fractions", "sinlog-pf", "It isn't a rational function."],
    ]),
  // level 7
  short(m(IP, "explain-returns", "explain", 7, 120, "Evaluate $\\int e^{x}\\sin x\\,dx$ and explain why the integral “comes back”."),
    [
      ["twice", "Parts twice (keeping the trig factor as $u$ both times) gives $I = e^{x}\\sin x - e^{x}\\cos x - I$", 2, true],
      ["solve", "The derivatives of $\\sin$ cycle back, so $I$ reappears; solving gives $I = \\frac{1}{2}e^{x}(\\sin x - \\cos x) + C$", 2, true],
    ]),
  num(m(IP, "apply-x3-exp", "apply", 7, 60, "Evaluate $\\int_0^{1} x^{3}e^{x}\\,dx$. Give $3$ decimal places."), 0.563),
  num(m(IP, "apply-log-one-plus", "apply", 7, 60, "Evaluate $\\int_0^{1} \\ln(1 + x)\\,dx$. Give $3$ decimal places."), 0.386),
  mcq(m(IP, "apply-gamma-integer", "apply", 7, 60, "From the reduction formula $\\int x^{n}e^{-x}\\,dx = -x^{n}e^{-x} + n\\int x^{n - 1}e^{-x}\\,dx$, $\\int_0^{\\infty} x^{n}e^{-x}\\,dx =$"),
    "$n!$",
    [
      ["$n$", "gamma-n", "The factor $n$ multiplies the previous integral, which is $(n - 1)!$."],
      ["$1$", "gamma-one", "That's only for $n = 0$ or $1$."],
      ["$(n + 1)!$", "gamma-shift", "$\\Gamma(n + 1) = n!$."],
    ]),
  // level 8
  short(m(IP, "explain-sec-cubed", "explain", 8, 150, "Show that $\\int \\sec^{3} x\\,dx = \\frac{1}{2}\\left(\\sec x\\tan x + \\ln|\\sec x + \\tan x|\\right) + C$."),
    [
      ["parts", "Parts with $u = \\sec x$, $dv = \\sec^{2} x\\,dx$: $I = \\sec x\\tan x - \\int \\sec x\\tan^{2} x\\,dx$", 2, true],
      ["solve", "Uses $\\tan^{2} = \\sec^{2} - 1$ to get $I = \\sec x\\tan x - I + \\int \\sec x\\,dx$ and solves", 2, true],
    ]),
  num(m(IP, "apply-x-exp-2x", "apply", 8, 75, "Evaluate $\\int_0^{1} xe^{2x}\\,dx$. Give $3$ decimal places."), 2.097),
  num(m(IP, "apply-x2-cos", "apply", 8, 75, "Evaluate $\\int_0^{\\pi} x^{2}\\cos x\\,dx$. Give $3$ decimal places."), -6.283),
  mcq(m(IP, "transfer-move-derivative", "transfer", 8, 75, "If $f(0) = f(1) = 0$ and $f'$ is continuous, then $\\int_0^{1} xf'(x)\\,dx =$"),
    "$-\\int_0^{1} f(x)\\,dx$",
    [
      ["$\\int_0^{1} f(x)\\,dx$", "move-sign", "$\\left[xf\\right]_0^{1} - \\int f = 0 - \\int f$."],
      ["$0$", "move-zero", "The boundary term vanishes, but $\\int f$ needn't."],
      ["$f(1)$", "move-boundary", "The boundary term is $1 \\cdot f(1) - 0 = 0$."],
    ]),
  // level 9
  short(m(IP, "transfer-tail-expectation", "transfer", 9, 180, "For a nonnegative random variable $X$ with density $f$ and survival function $S(x) = P(X > x)$, use integration by parts to show $\\mathbb{E}[X] = \\int_0^{\\infty} S(x)\\,dx$ (assume the boundary term vanishes)."),
    [
      ["parts", "Writes $\\mathbb{E}[X] = \\int_0^{\\infty} xf(x)\\,dx$ with $u = x$, $dv = f\\,dx = -dS$, so $v = -S$", 2, true],
      ["result", "Gets $\\left[-xS(x)\\right]_0^{\\infty} + \\int_0^{\\infty} S(x)\\,dx = \\int_0^{\\infty} S(x)\\,dx$", 2, true],
    ]),
  short(m(IP, "transfer-wallis-reduction", "transfer", 9, 180, "Let $I_n = \\int_0^{\\pi/2} \\sin^{n} x\\,dx$. Derive $I_n = \\frac{n - 1}{n}I_{n - 2}$ for $n \\ge 2$."),
    [
      ["parts", "Parts with $u = \\sin^{n - 1} x$, $dv = \\sin x\\,dx$; the boundary term vanishes, leaving $(n - 1)\\int \\sin^{n - 2} x\\cos^{2} x\\,dx$", 2, true],
      ["solve", "Uses $\\cos^{2} = 1 - \\sin^{2}$: $I_n = (n - 1)(I_{n - 2} - I_n)$, so $I_n = \\frac{n - 1}{n}I_{n - 2}$", 2, true],
    ]),
  num(m(IP, "apply-wallis-four", "apply", 9, 90, "Evaluate $\\int_0^{\\pi/2} \\sin^{4} x\\,dx$. Give $3$ decimal places."), 0.589),
  mcq(m(IP, "transfer-gamma-recurrence", "transfer", 9, 90, "The identity $\\Gamma(s + 1) = s\\,\\Gamma(s)$, with $\\Gamma(s) = \\int_0^{\\infty} x^{s - 1}e^{-x}\\,dx$, follows from parts with:"),
    "$u = x^{s}$, $dv = e^{-x}\\,dx$",
    [
      ["$u = e^{-x}$, $dv = x^{s}\\,dx$", "gammarec-swap", "That raises the power of $x$."],
      ["$u = x^{s}e^{-x}$, $dv = dx$", "gammarec-whole", "That doesn't separate the factors."],
      ["Substitution $u = x^{s}$", "gammarec-sub", "No $du$ factor is present."],
    ]),
  // level 10
  short(m(IP, "transfer-log-power-moments", "transfer", 10, 180, "Show that $\\int_0^{1} x^{m}(\\ln x)^{n}\\,dx = \\frac{(-1)^{n}n!}{(m + 1)^{n + 1}}$ for integers $m, n \\ge 0$."),
    [
      ["reduce", "Parts with $u = (\\ln x)^{n}$, $dv = x^{m}\\,dx$ gives $J_n = -\\frac{n}{m + 1}J_{n - 1}$ (the boundary terms vanish)", 2, true],
      ["iterate", "With $J_0 = \\frac{1}{m + 1}$, iterating gives $\\frac{(-1)^{n}n!}{(m + 1)^{n + 1}}$", 2, true],
    ]),
  short(m(IP, "transfer-taylor-remainder", "transfer", 10, 180, "Use integration by parts to prove $f(x) = f(a) + f'(a)(x - a) + \\int_a^x (x - t)f''(t)\\,dt$ (assume $f''$ is continuous)."),
    [
      ["start", "Starts from $f(x) - f(a) = \\int_a^x f'(t)\\,dt$", 1, true],
      ["parts", "Parts with $u = f'(t)$, $dv = dt$ and $v = -(x - t)$: $\\left[-(x - t)f'(t)\\right]_a^x + \\int_a^x (x - t)f''(t)\\,dt = (x - a)f'(a) + \\int_a^x (x - t)f''(t)\\,dt$", 3, true],
    ]),
  num(m(IP, "transfer-log-moment", "transfer", 10, 120, "Evaluate $\\int_0^{1} x^{2}(\\ln x)^{2}\\,dx$. Give $4$ decimal places."), 0.0741),
  mcq(m(IP, "transfer-wallis-odd", "transfer", 10, 120, "Using $I_n = \\frac{n - 1}{n}I_{n - 2}$ with $I_1 = 1$, $\\int_0^{\\pi/2} \\sin^{5} x\\,dx =$"),
    "$\\frac{8}{15}$",
    [
      ["$\\frac{3\\pi}{16}$", "wallisodd-even", "That's $I_4$; odd powers give rational answers."],
      ["$\\frac{4}{5}$", "wallisodd-one-step", "$I_5 = \\frac{4}{5}I_3 = \\frac{4}{5} \\cdot \\frac{2}{3}$."],
      ["$\\frac{2}{3}$", "wallisodd-three", "That's $I_3$."],
    ]),
];

export const calc04Items: Item[] = [...riemannSums, ...fundamentalTheorem, ...uSubstitution, ...integrationByParts];
