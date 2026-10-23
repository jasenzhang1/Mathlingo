import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./calc-shared";

/**
 * Calculus course, part 3: the mean value theorem, extrema and curve
 * sketching, applied optimization, L'Hôpital's rule, and linear
 * approximation. Forty questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// mean-value-theorem
// ---------------------------------------------------------------------------
const MV = "mean-value-theorem";
const meanValueTheorem: Item[] = [
  // level 1
  mcq(m(MV, "recall-conclusion", "recall", 1, 15, "The mean value theorem concludes that for some $c \\in (a, b)$:"),
    "$f'(c) = \\frac{f(b) - f(a)}{b - a}$",
    [
      ["$f(c) = \\frac{f(a) + f(b)}{2}$", "mvt-average-value", "The MVT is about slopes, not average heights."],
      ["$f'(c) = 0$", "mvt-rolle", "That's Rolle's theorem, which needs $f(a) = f(b)$."],
      ["$f'(a) = f'(b)$", "mvt-endpoints", "The theorem says nothing about derivatives at the endpoints."],
    ]),
  mcq(m(MV, "recall-rolle", "recall", 1, 15, "Rolle's theorem is the special case of the MVT in which:"),
    "$f(a) = f(b)$",
    [
      ["$f'(a) = 0$", "rolle-derivative", "The extra hypothesis is about values, not derivatives."],
      ["$f$ is increasing", "rolle-increasing", "An increasing function can't have $f(a) = f(b)$ unless constant."],
      ["$f(a) = f(b) = 0$", "rolle-zero", "Equal values suffice; they needn't be zero."],
    ]),
  mcq(m(MV, "recall-hypotheses", "recall", 1, 15, "The MVT requires $f$ to be:"),
    "Continuous on $[a, b]$ and differentiable on $(a, b)$",
    [
      ["Differentiable at $a$ and $b$ only", "hyp-endpoints", "The interior is what matters."],
      ["Increasing on $[a, b]$", "hyp-increasing", "No monotonicity is needed."],
      ["A polynomial", "hyp-polynomial", "Any function meeting the two conditions works."],
    ]),
  mcq(m(MV, "recall-zero-derivative", "recall", 1, 15, "If $f'(x) = 0$ for every $x$ in an interval, then on that interval $f$ is:"),
    "Constant",
    [
      ["Zero", "zero-deriv-zero", "$f = 5$ has $f' = 0$ too."],
      ["Linear with nonzero slope", "zero-deriv-linear", "A nonzero slope means $f' \\ne 0$."],
      ["Increasing", "zero-deriv-increasing", "Zero slope means no change."],
    ]),
  // level 2
  num(m(MV, "apply-square", "apply", 2, 20, "Find the number $c$ given by the MVT for $f(x) = x^{2}$ on $[1, 3]$."), 2),
  num(m(MV, "apply-average-rate", "apply", 2, 20, "Find the average rate of change of $f(x) = x^{3} - x$ on $[0, 2]$."), 3),
  num(m(MV, "apply-rolle-quadratic", "apply", 2, 20, "Find the $c$ given by Rolle's theorem for $f(x) = x^{2} - 4x + 3$ on $[1, 3]$."), 2),
  mcq(m(MV, "apply-abs-fails", "apply", 2, 20, "$f(x) = |x|$ on $[-1, 1]$ has $f(-1) = f(1)$, yet no $c$ has $f'(c) = 0$. Why doesn't this contradict Rolle's theorem?"),
    "$|x|$ is not differentiable at $0$",
    [
      ["$f(-1) \\ne f(1)$", "abs-values", "Both values are $1$."],
      ["$|x|$ is not continuous", "abs-continuous", "$|x|$ is continuous everywhere."],
      ["It does contradict it; Rolle's theorem is false", "abs-false", "The theorem's hypotheses aren't met."],
    ]),
  // level 3
  num(m(MV, "apply-sqrt", "apply", 3, 25, "Find the $c$ given by the MVT for $f(x) = \\sqrt{x}$ on $[0, 4]$."), 1),
  num(m(MV, "apply-reciprocal", "apply", 3, 25, "Find the $c$ given by the MVT for $f(x) = \\frac{1}{x}$ on $[1, 4]$."), 2),
  num(m(MV, "apply-cubic", "apply", 3, 25, "Find the $c$ given by the MVT for $f(x) = x^{3} - x$ on $[-1, 2]$."), 1),
  mcq(m(MV, "apply-promised-slope", "apply", 3, 25, "$f$ is differentiable with $f(0) = 1$ and $f(3) = 7$. The MVT guarantees that somewhere $f'$ equals:"),
    "$2$",
    [
      ["$6$", "promised-difference", "Divide the rise by the run of $3$."],
      ["$\\frac{7}{3}$", "promised-ratio", "Use $\\frac{f(3) - f(0)}{3 - 0}$, not $\\frac{f(3)}{3}$."],
      ["$\\frac{8}{3}$", "promised-sum", "The rise is $7 - 1 = 6$."],
    ]),
  // level 4
  num(m(MV, "apply-upper-bound", "apply", 4, 30, "$f$ is differentiable with $f(0) = -3$ and $f'(x) \\le 5$ for all $x$. What is the largest possible value of $f(2)$?"), 7),
  num(m(MV, "apply-lower-bound", "apply", 4, 30, "$f$ is differentiable with $f(0) = -3$ and $f'(x) \\ge 1$ for all $x$. What is the smallest possible value of $f(2)$?"), -1),
  num(m(MV, "apply-rolle-count", "apply", 4, 30, "$f(x) = x(x - 1)(x - 2)$ has three roots. How many zeros of $f'$ does Rolle's theorem guarantee?"), 2),
  mcq(m(MV, "apply-same-derivative", "apply", 4, 30, "If $f'(x) = g'(x)$ for every $x$ in an interval, then on that interval:"),
    "$f(x) = g(x) + C$ for some constant $C$",
    [
      ["$f(x) = g(x)$", "same-equal", "$x^{2}$ and $x^{2} + 1$ have the same derivative."],
      ["$f'(x) = 0$", "same-zero", "Only $(f - g)' = 0$."],
      ["$f(x) = Cg(x)$", "same-multiple", "A constant multiple changes the derivative."],
    ]),
  // level 5
  short(m(MV, "explain-zero-constant", "explain", 5, 90, "Use the MVT to explain why $f'(x) = 0$ on an interval forces $f$ to be constant there."),
    [
      ["mvt", "For any $a < b$ in the interval, $f(b) - f(a) = f'(c)(b - a)$ for some $c$ between them", 2, true],
      ["conclude", "Since $f'(c) = 0$, $f(b) = f(a)$ for every pair, so $f$ is constant", 2, true],
    ]),
  mcq(m(MV, "apply-which-satisfies", "apply", 5, 40, "Which function satisfies the hypotheses of the MVT on $[0, 2]$?"),
    "$x^{3} - 2x$",
    [
      ["$|x - 1|$", "satisfies-corner", "Not differentiable at $x = 1$."],
      ["$\\frac{1}{x - 1}$", "satisfies-blowup", "Not even defined at $x = 1$."],
      ["$\\lfloor x \\rfloor$", "satisfies-jump", "Discontinuous at $x = 1$."],
    ]),
  mcq(m(MV, "apply-speedometer", "apply", 5, 40, "A car travels $120$ miles in $2$ hours. The MVT implies that:"),
    "At some instant its speed was exactly $60$ mph",
    [
      ["Its speed was $60$ mph throughout", "speed-constant", "It could have varied."],
      ["Its maximum speed was $60$ mph", "speed-max", "The maximum could be higher."],
      ["At some instant its speed exceeded $60$ mph", "speed-exceed", "It may have driven at exactly $60$ the whole way."],
    ]),
  num(m(MV, "apply-lipschitz-bound", "apply", 5, 40, "$f$ is differentiable with $f(1) = 2$ and $|f'(x)| \\le 3$ for all $x$. What is the largest possible value of $f(5)$?"), 14),
  // level 6
  short(m(MV, "explain-exactly-one-root", "explain", 6, 120, "Show that $x^{3} + 3x + 1 = 0$ has exactly one real root."),
    [
      ["existence", "Existence by the IVT, e.g. $f(-1) = -3 < 0 < 1 = f(0)$", 2, true],
      ["uniqueness", "Uniqueness: $f'(x) = 3x^{2} + 3 > 0$, so by Rolle's theorem two roots would force a zero of $f'$", 2, true],
    ]),
  num(m(MV, "apply-quadratic-midpoint", "apply", 6, 45, "For $f(x) = 3x^{2} - x + 1$ on $[2, 8]$, find the $c$ given by the MVT."), 5),
  num(m(MV, "apply-constant-slope", "apply", 6, 45, "If $f(2) = 5$ and $f'(x) = 3$ for every $x$, find $f(7)$."), 20),
  mcq(m(MV, "apply-sine-inequality", "apply", 6, 45, "The MVT applied to $\\sin x$ shows that for all real $a$ and $b$, $|\\sin a - \\sin b| \\le$"),
    "$|a - b|$",
    [
      ["$\\frac{|a - b|}{2}$", "sineq-half", "$|\\cos c|$ can be as large as $1$."],
      ["$1$", "sineq-one", "The difference can be as large as $2$."],
      ["$|a^{2} - b^{2}|$", "sineq-squares", "The bound comes from $|\\cos c| \\le 1$."],
    ]),
  // level 7
  short(m(MV, "explain-increasing", "explain", 7, 120, "Prove that if $f'(x) > 0$ on an interval, then $f$ is increasing on that interval."),
    [
      ["mvt", "For $a < b$ in the interval, $f(b) - f(a) = f'(c)(b - a)$ for some $c \\in (a, b)$", 2, true],
      ["sign", "Both factors are positive, so $f(b) > f(a)$", 2, true],
    ]),
  num(m(MV, "apply-root-bound", "apply", 7, 60, "Apply the MVT to $\\sqrt{x}$ on $[100, 101]$, using $f'(c) \\le \\frac{1}{2\\sqrt{100}}$. What upper bound does this give for $\\sqrt{101} - 10$?"), 0.05),
  num(m(MV, "apply-exp-point", "apply", 7, 60, "Find the $c$ given by the MVT for $f(x) = e^{x}$ on $[0, 1]$. Give $3$ decimal places."), 0.541),
  mcq(m(MV, "transfer-three-zeros", "transfer", 7, 60, "$f$ is twice differentiable with $f(0) = f(1) = f(2) = 0$. Then $f''$ must:"),
    "Vanish somewhere in $(0, 2)$",
    [
      ["Be zero everywhere", "threezeros-everywhere", "$x(x - 1)(x - 2)$ has $f'' = 6x - 6$, not identically zero."],
      ["Be positive somewhere", "threezeros-positive", "The theorem gives a zero, not a sign."],
      ["Vanish at $x = 1$", "threezeros-location", "Rolle gives existence, not the location."],
    ]),
  // level 8
  short(m(MV, "explain-log-inequality", "explain", 8, 150, "Use the MVT to prove $\\ln(1 + x) < x$ for $x > 0$."),
    [
      ["mvt", "Applies the MVT to $\\ln(1 + t)$ on $[0, x]$: $\\ln(1 + x) - 0 = \\frac{x}{1 + c}$ for some $c \\in (0, x)$", 2, true],
      ["bound", "Since $1 + c > 1$, $\\frac{x}{1 + c} < x$", 2, true],
    ]),
  num(m(MV, "apply-cos-bound", "apply", 8, 75, "The MVT gives $|\\cos 0.5 - \\cos 0.3| \\le k \\cdot 0.2$, where $k$ is the largest value of $|\\sin t|$ on $[0.3, 0.5]$. Find $k$. Give $3$ decimal places."), 0.479),
  num(m(MV, "apply-cauchy", "apply", 8, 75, "Cauchy's MVT for $f(x) = x^{3}$ and $g(x) = x^{2}$ on $[1, 2]$ gives $c$ with $\\frac{f(2) - f(1)}{g(2) - g(1)} = \\frac{f'(c)}{g'(c)}$. Find $c$. Give $3$ decimal places."), 1.556),
  mcq(m(MV, "transfer-fixed-points", "transfer", 8, 75, "$f$ is differentiable on $\\mathbb{R}$ and $f'(x) \\ne 1$ for every $x$. Then the equation $f(x) = x$ has:"),
    "At most one solution",
    [
      ["Exactly one solution", "fixedpts-exactly", "$f(x) = x + e^{x}$ has $f' = 1 + e^{x} \\ne 1$, yet $f(x) = x$ has no solution."],
      ["No solutions", "fixedpts-none", "$f(x) = 2x$ has the solution $x = 0$."],
      ["Infinitely many solutions", "fixedpts-many", "Two solutions would give $f'(c) = 1$ between them, by the MVT."],
    ]),
  // level 9
  short(m(MV, "transfer-root-count", "transfer", 9, 180, "Use Rolle's theorem to prove that a polynomial of degree $n \\ge 1$ has at most $n$ real roots."),
    [
      ["induction", "Argues by induction on the degree (or directly)", 1, true],
      ["rolle", "If $p$ had $n + 1$ roots, Rolle gives $n$ roots of $p'$ between consecutive ones; $p'$ has degree $n - 1$, contradicting the inductive hypothesis", 3, true],
    ]),
  short(m(MV, "transfer-speed-camera", "transfer", 9, 180, "A car passes two cameras $10$ km apart, $5$ minutes apart, on a road with a $100$ km/h limit. Explain why the MVT justifies a speeding ticket."),
    [
      ["average", "The average speed is $\\frac{10}{5/60} = 120$ km/h", 2, true],
      ["mvt", "Position is differentiable in time, so by the MVT the instantaneous speed was exactly $120$ km/h at some moment, above the limit", 2, true],
    ]),
  num(m(MV, "transfer-second-derivative-bound", "transfer", 9, 90, "$f$ is twice differentiable with $f(0) = 0$, $f'(0) = 0$ and $f''(x) \\ge 2$ for all $x$. What is the smallest possible value of $f(3)$?"), 9),
  mcq(m(MV, "transfer-darboux", "transfer", 9, 90, "Derivatives have the intermediate value property (Darboux's theorem). Which function can $\\textbf{NOT}$ be the derivative of any function on $\\mathbb{R}$?"),
    "The sign function: $-1$ for $x < 0$, $0$ at $0$, $1$ for $x > 0$",
    [
      ["$|x|$", "darboux-abs", "$|x|$ is the derivative of $\\frac{x|x|}{2}$."],
      ["$\\cos x$", "darboux-cos", "$\\cos x$ is the derivative of $\\sin x$."],
      ["$2x\\sin\\frac{1}{x} - \\cos\\frac{1}{x}$ (with value $0$ at $0$)", "darboux-oscillating", "That is the derivative of $x^{2}\\sin\\frac{1}{x}$, discontinuous but a genuine derivative."],
    ]),
  // level 10
  short(m(MV, "transfer-square-bound", "transfer", 10, 180, "Suppose $|f(x) - f(y)| \\le (x - y)^{2}$ for all real $x$ and $y$. Prove that $f$ is constant."),
    [
      ["derivative", "Divides by $|x - y|$: $\\left|\\frac{f(x) - f(y)}{x - y}\\right| \\le |x - y| \\to 0$, so $f'(y) = 0$ for every $y$", 3, true],
      ["constant", "A function with zero derivative everywhere is constant (by the MVT)", 1, true],
    ]),
  short(m(MV, "transfer-cauchy-proof", "transfer", 10, 180, "Prove Cauchy's mean value theorem: if $f$ and $g$ are continuous on $[a, b]$ and differentiable on $(a, b)$, then some $c$ has $(f(b) - f(a))g'(c) = (g(b) - g(a))f'(c)$."),
    [
      ["auxiliary", "Defines $h(x) = (f(b) - f(a))g(x) - (g(b) - g(a))f(x)$", 2, true],
      ["rolle", "Checks $h(a) = h(b)$ and applies Rolle's theorem to get $h'(c) = 0$, which is the claim", 2, true],
    ]),
  num(m(MV, "transfer-mvt-point-ratio", "transfer", 10, 120, "For $f(x) = x^{3}$ on $[0, t]$ ($t > 0$), the MVT point is $c(t)$. Find $\\frac{c(t)}{t}$. Give $3$ decimal places."), 0.577),
  mcq(m(MV, "transfer-derivative-to-zero", "transfer", 10, 120, "$f$ is differentiable on $(0, \\infty)$ with $\\lim_{x \\to \\infty} f'(x) = 0$. Which must be true?"),
    "$\\lim_{x \\to \\infty} \\left(f(x + 1) - f(x)\\right) = 0$",
    [
      ["$\\lim_{x \\to \\infty} f(x)$ exists", "derivzero-limit", "$f = \\ln x$ has $f' \\to 0$ and $f \\to \\infty$."],
      ["$f$ is bounded", "derivzero-bounded", "$\\ln x$ is unbounded."],
      ["$\\lim_{x \\to \\infty} f(x) = 0$", "derivzero-zero", "$f = 5$ has $f' = 0$ and limit $5$."],
    ]),
];

// ---------------------------------------------------------------------------
// curve-sketching
// ---------------------------------------------------------------------------
const CS = "curve-sketching";
const curveSketching: Item[] = [
  // level 1
  mcq(m(CS, "recall-critical", "recall", 1, 15, "A critical point of $f$ is an interior point $c$ where:"),
    "$f'(c) = 0$ or $f'(c)$ does not exist",
    [
      ["$f(c) = 0$", "critical-root", "That's a root of $f$."],
      ["$f''(c) = 0$", "critical-second", "That's a candidate inflection point."],
      ["$f$ has its maximum", "critical-max", "Critical points include minima and non-extrema too."],
    ]),
  mcq(m(CS, "recall-first-test", "recall", 1, 15, "If $f'$ changes from positive to negative at $c$, then $f$ has at $c$:"),
    "A local maximum",
    [
      ["A local minimum", "firsttest-min", "Rising then falling makes a peak."],
      ["An inflection point", "firsttest-inflection", "That's about $f''$ changing sign."],
      ["Neither", "firsttest-neither", "A sign change in $f'$ gives an extremum."],
    ]),
  mcq(m(CS, "recall-concave-up", "recall", 1, 15, "$f'' > 0$ on an interval means $f$ is:"),
    "Concave up there",
    [
      ["Increasing there", "concave-increasing", "That's $f' > 0$."],
      ["Concave down there", "concave-down", "Concave down is $f'' < 0$."],
      ["Positive there", "concave-positive", "That's $f > 0$."],
    ]),
  mcq(m(CS, "recall-inflection", "recall", 1, 15, "An inflection point is where:"),
    "The concavity changes",
    [
      ["$f' = 0$", "inflection-critical", "That's a critical point."],
      ["$f = 0$", "inflection-root", "That's a root."],
      ["$f$ is undefined", "inflection-undefined", "An inflection point is on the graph."],
    ]),
  // level 2
  num(m(CS, "apply-critical-quadratic", "apply", 2, 20, "Find the critical point of $f(x) = x^{2} - 8x + 3$."), 4),
  num(m(CS, "apply-local-min-value", "apply", 2, 20, "What is the local minimum value of $f(x) = x^{3} - 12x$?"), -16),
  num(m(CS, "apply-inflection-x", "apply", 2, 20, "At what $x$ does $f(x) = x^{3} - 6x^{2} + 1$ have its inflection point?"), 2),
  mcq(m(CS, "apply-second-test", "apply", 2, 20, "At a critical point $c$ with $f'(c) = 0$ and $f''(c) > 0$, $f$ has:"),
    "A local minimum",
    [
      ["A local maximum", "secondtest-max", "Concave up at a flat point means a trough."],
      ["An inflection point", "secondtest-inflection", "$f''(c) \\ne 0$, so concavity isn't changing there."],
      ["Nothing can be concluded", "secondtest-inconclusive", "Only $f''(c) = 0$ is inconclusive."],
    ]),
  // level 3
  num(m(CS, "apply-abs-max-square", "apply", 3, 25, "Find the absolute maximum value of $f(x) = x^{2}$ on $[-1, 3]$."), 9),
  num(m(CS, "apply-abs-min-cubic", "apply", 3, 25, "Find the absolute minimum value of $f(x) = x^{3} - 3x$ on $[0, 3]$."), -2),
  num(m(CS, "apply-count-critical", "apply", 3, 25, "How many critical points does $f(x) = x^{4} - 2x^{2}$ have?"), 3),
  mcq(m(CS, "apply-cubic-flat", "apply", 3, 25, "At $x = 0$, $f(x) = x^{3}$ has:"),
    "A critical point that is not an extremum",
    [
      ["A local minimum", "cubicflat-min", "$f < 0$ to the left of $0$."],
      ["A local maximum", "cubicflat-max", "$f > 0$ to the right of $0$."],
      ["No critical point", "cubicflat-none", "$f'(0) = 0$."],
    ]),
  // level 4
  num(m(CS, "apply-abs-max-interval", "apply", 4, 30, "Find the absolute maximum value of $f(x) = x^{3} - 3x^{2} - 9x + 5$ on $[-2, 6]$."), 59),
  num(m(CS, "apply-max-xexp", "apply", 4, 30, "Find the maximum value of $f(x) = xe^{-x}$. Give $3$ decimal places."), 0.368),
  num(m(CS, "apply-decreasing-interval", "apply", 4, 30, "$f(x) = x^{3} - 3x^{2}$ is decreasing exactly on $(0, k)$. Find $k$."), 2),
  mcq(m(CS, "apply-inconclusive", "apply", 4, 30, "If $f'(c) = 0$ and $f''(c) = 0$, the second derivative test:"),
    "Is inconclusive",
    [
      ["Gives a local minimum", "inconclusive-min", "$-x^{4}$ has a maximum with $f'' = 0$."],
      ["Gives a local maximum", "inconclusive-max", "$x^{4}$ has a minimum with $f'' = 0$."],
      ["Gives an inflection point", "inconclusive-inflection", "$x^{4}$ has no inflection at $0$."],
    ]),
  // level 5
  short(m(CS, "explain-not-inflection", "explain", 5, 90, "Explain why $f''(c) = 0$ does not guarantee an inflection point at $c$, with an example."),
    [
      ["concept", "An inflection point needs the concavity (sign of $f''$) to change; $f'' = 0$ alone doesn't ensure a sign change", 2, true],
      ["example", "Example: $f(x) = x^{4}$ has $f''(0) = 0$ but is concave up on both sides", 2, true],
    ]),
  mcq(m(CS, "apply-double-root-derivative", "apply", 5, 40, "$f'(x) = (x - 1)^{2}(x + 2)$. At $x = 1$, $f$ has:"),
    "Neither a maximum nor a minimum, because $f'$ doesn't change sign",
    [
      ["A local minimum, since $f'(1) = 0$", "doubleroot-min", "$f' > 0$ on both sides of $1$."],
      ["A local maximum", "doubleroot-max", "$f$ keeps increasing through $1$."],
      ["A local minimum, since $f'$ has a double root", "doubleroot-even", "An even-power factor means no sign change, hence no extremum."],
    ]),
  mcq(m(CS, "apply-concave-down", "apply", 5, 40, "Which function is concave down on all of $\\mathbb{R}$?"),
    "$-x^{2} + 3x$",
    [
      ["$e^{x}$", "concavedown-exp", "$e^{x}$ has $f'' = e^{x} > 0$."],
      ["$x^{3}$", "concavedown-cubic", "Its concavity changes at $0$."],
      ["$x^{4}$", "concavedown-quartic", "$f'' = 12x^{2} \\ge 0$."],
    ]),
  num(m(CS, "apply-count-inflections", "apply", 5, 40, "How many inflection points does $f(x) = x^{4} - 4x^{3}$ have?"), 2),
  // level 6
  short(m(CS, "explain-closed-interval", "explain", 6, 120, "Describe the closed-interval method for finding absolute extrema, and explain why the endpoints must be checked."),
    [
      ["method", "Evaluate $f$ at the critical points inside $(a, b)$ and at $a$ and $b$; the largest and smallest values are the absolute extrema", 2, true],
      ["endpoints", "An extremum can occur at an endpoint where $f' \\ne 0$, e.g. $f(x) = x$ on $[0, 1]$", 2, true],
    ]),
  num(m(CS, "apply-global-min-open", "apply", 6, 45, "Find the minimum value of $f(x) = x + \\frac{4}{x}$ for $x > 0$."), 4),
  num(m(CS, "apply-critical-cusp", "apply", 6, 45, "How many critical points does $f(x) = x^{2/3}(x - 5)$ have?"), 2),
  mcq(m(CS, "apply-corner-max", "apply", 6, 45, "$f$ is continuous, $f'(x) > 0$ for $x < 1$, $f'(x) < 0$ for $x > 1$, and $f'(1)$ does not exist. At $x = 1$, $f$ has:"),
    "A local maximum",
    [
      ["No extremum, since $f'(1)$ doesn't exist", "corner-no-derivative", "The first derivative test still applies: rising then falling."],
      ["A local minimum", "corner-min", "Rising then falling makes a peak."],
      ["An inflection point", "corner-inflection", "The sign of $f'$, not $f''$, changes."],
    ]),
  // level 7
  short(m(CS, "explain-sign-chart", "explain", 7, 120, "Given $f'(x) = x(x - 3)^{2}$, describe where $f$ increases and decreases and classify its critical points."),
    [
      ["intervals", "$f' < 0$ for $x < 0$ and $f' > 0$ for $x > 0$ (except $f'(3) = 0$)", 2, true],
      ["classify", "Local minimum at $x = 0$; no extremum at $x = 3$, where $f'$ doesn't change sign", 2, true],
    ]),
  num(m(CS, "apply-trig-max", "apply", 7, 60, "Find the absolute maximum value of $f(x) = \\sin x + \\cos x$ on $[0, \\pi]$. Give $3$ decimal places."), 1.414),
  num(m(CS, "apply-log-over-x", "apply", 7, 60, "At what $x$ does $f(x) = \\frac{\\ln x}{x}$ attain its maximum? Give $3$ decimal places."), 2.718),
  mcq(m(CS, "apply-xexp-min", "apply", 7, 60, "$f(x) = xe^{x}$ has its global minimum at:"),
    "$x = -1$",
    [
      ["$x = 0$", "xexp-root", "That's where $f = 0$; $f'(0) = 1$."],
      ["$x = 1$", "xexp-sign", "$f'(x) = (x + 1)e^{x}$ vanishes at $-1$."],
      ["There is no global minimum", "xexp-none", "$f \\to 0$ as $x \\to -\\infty$, and $f(-1) = -\\frac{1}{e} < 0$ is lowest."],
    ]),
  // level 8
  short(m(CS, "explain-prove-second-test", "explain", 8, 150, "Prove the second derivative test: if $f'(c) = 0$ and $f''(c) > 0$, then $f$ has a local minimum at $c$."),
    [
      ["sign", "$f''(c) = \\lim_{h \\to 0} \\frac{f'(c + h)}{h} > 0$, so for small $h$, $f'(c + h)$ has the same sign as $h$", 2, true],
      ["first-test", "So $f' < 0$ just left of $c$ and $f' > 0$ just right; the first derivative test gives a local minimum", 2, true],
    ]),
  num(m(CS, "apply-parameter-critical", "apply", 8, 75, "$f(x) = x^{3} + kx$ has a critical point exactly when $k \\le k_{\\max}$. Find $k_{\\max}$."), 0),
  num(m(CS, "apply-quartic-min", "apply", 8, 75, "Find the absolute minimum value of $f(x) = x^{4} - 8x^{2} + 3$ on $[-1, 3]$."), -13),
  mcq(m(CS, "apply-quartic-inflections", "apply", 8, 75, "A polynomial of degree $4$ can have at most how many inflection points?"),
    "$2$",
    [
      ["$3$", "quartic-three", "$f''$ has degree $2$, so at most two sign changes."],
      ["$4$", "quartic-four", "Inflections come from roots of $f''$, which has degree $2$."],
      ["$1$", "quartic-one", "$x^{4} - 6x^{2}$ has two."],
    ]),
  // level 9
  short(m(CS, "transfer-single-critical", "transfer", 9, 180, "$f$ is differentiable on $\\mathbb{R}$ and has exactly one critical point $c$, which is a local minimum. Explain why $f(c)$ is the global minimum."),
    [
      ["suppose", "If some $f(d) < f(c)$, then on the interval between $c$ and $d$, $f$ rises from $c$ and later falls to $d$", 2, true],
      ["contradiction", "So $f$ has a local maximum strictly between them, a second critical point — contradiction", 2, true],
    ]),
  short(m(CS, "transfer-root-count", "transfer", 9, 180, "For which $k$ does $x^{3} - 3x + k = 0$ have three distinct real roots? Explain using the local extrema."),
    [
      ["extrema", "Local max at $x = -1$ with value $2 + k$; local min at $x = 1$ with value $k - 2$", 2, true],
      ["condition", "Three roots exactly when the max is above $0$ and the min below: $-2 < k < 2$", 2, true],
    ]),
  num(m(CS, "transfer-integer-k", "transfer", 9, 90, "For how many integers $k$ does $x^{3} - 3x + k = 0$ have three distinct real roots?"), 3),
  mcq(m(CS, "transfer-convex-critical", "transfer", 9, 90, "If $f'' > 0$ everywhere, how many critical points can $f$ have?"),
    "At most one",
    [
      ["Exactly one", "convex-exactly", "$e^{x}$ has $f'' > 0$ and no critical points."],
      ["None", "convex-none", "$x^{2}$ has one."],
      ["Any number", "convex-any", "$f'$ is strictly increasing, so it vanishes at most once."],
    ]),
  // level 10
  short(m(CS, "transfer-above-tangents", "transfer", 10, 180, "Prove that if $f'' > 0$ everywhere, the graph of $f$ lies above each of its tangent lines (touching only at the point of tangency)."),
    [
      ["setup", "Lets $g(x) = f(x) - [f(a) + f'(a)(x - a)]$, so $g(a) = 0$, $g'(a) = 0$ and $g'' = f'' > 0$", 2, true],
      ["argue", "$g'$ is increasing, so $g' < 0$ left of $a$ and $g' > 0$ right of $a$; hence $g$ has its minimum $0$ at $a$ and $g > 0$ elsewhere", 2, true],
    ]),
  short(m(CS, "transfer-increasing-cubic", "transfer", 10, 180, "Find all $a$ for which $f(x) = x^{3} + ax^{2} + 3x$ is increasing on all of $\\mathbb{R}$. Justify."),
    [
      ["condition", "Needs $f'(x) = 3x^{2} + 2ax + 3 \\ge 0$ for all $x$", 1, true],
      ["discriminant", "The quadratic is nonnegative iff its discriminant $4a^{2} - 36 \\le 0$", 2, true],
      ["answer", "So $-3 \\le a \\le 3$ (at $a = \\pm 3$, $f'$ vanishes at one point but $f$ is still increasing)", 1, true],
    ]),
  num(m(CS, "transfer-cubic-coefficient", "transfer", 10, 120, "The cubic $x^{3} + bx^{2} + cx + d$ has local extrema at $x = 1$ and $x = 3$. Find $b$."), -6),
  mcq(m(CS, "transfer-third-derivative", "transfer", 10, 120, "If $f'(c) = 0$, $f''(c) = 0$ and $f'''(c) \\ne 0$, then $c$ is:"),
    "An inflection point, not an extremum",
    [
      ["A local minimum", "third-min", "Near $c$, $f - f(c)$ behaves like a cubic, which changes sign."],
      ["A local maximum", "third-max", "The odd-order term makes $f$ cross its tangent."],
      ["A max or a min depending on the sign of $f'''(c)$", "third-depends", "The sign of $f'''$ only decides which way the graph crosses."],
    ]),
];

// ---------------------------------------------------------------------------
// applied-optimization
// ---------------------------------------------------------------------------
const AO = "applied-optimization";
const appliedOptimization: Item[] = [
  // level 1
  mcq(m(AO, "recall-constraint", "recall", 1, 15, "In an applied optimization problem, the constraint is used to:"),
    "Eliminate variables so the objective depends on just one",
    [
      ["Decide whether to maximise or minimise", "constraint-direction", "The question decides that."],
      ["Replace the objective", "constraint-replace", "It's used alongside the objective."],
      ["Find the second derivative", "constraint-second", "It relates the variables."],
    ]),
  mcq(m(AO, "recall-objective", "recall", 1, 15, "The objective function is:"),
    "The quantity being maximised or minimised",
    [
      ["The equation linking the variables", "objective-constraint", "That's the constraint."],
      ["The allowed range of the variable", "objective-domain", "That's the domain."],
      ["The derivative of the quantity", "objective-derivative", "The derivative is used to find the optimum."],
    ]),
  mcq(m(AO, "recall-verify", "recall", 1, 15, "After finding a critical point, you should:"),
    "Check it really gives the absolute optimum (endpoints, sign changes or the second derivative)",
    [
      ["Report it immediately", "verify-skip", "A critical point may be a min when you want a max, or beaten by an endpoint."],
      ["Differentiate the constraint", "verify-constraint", "The constraint has already been used."],
      ["Discard it if $f'' = 0$", "verify-discard", "Inconclusive isn't the same as wrong."],
    ]),
  mcq(m(AO, "recall-square", "recall", 1, 15, "Of all rectangles with a fixed perimeter, the one with the largest area is:"),
    "A square",
    [
      ["The longest, thinnest one", "square-thin", "Thin rectangles have area close to $0$."],
      ["Any of them; the area is fixed", "square-fixed", "Perimeter doesn't fix area."],
      ["One with sides in ratio $2 : 1$", "square-ratio", "That's the river-fence answer, where one side is free."],
    ]),
  // level 2
  num(m(AO, "apply-max-product", "apply", 2, 20, "Two positive numbers sum to $20$. What is the largest possible product?"), 100),
  num(m(AO, "apply-perimeter-area", "apply", 2, 20, "A rectangle has perimeter $40$. What is its largest possible area?"), 100),
  num(m(AO, "apply-min-sum", "apply", 2, 20, "Find the minimum value of $x + \\frac{9}{x}$ for $x > 0$."), 6),
  mcq(m(AO, "apply-min-perimeter", "apply", 2, 20, "A rectangle of area $64$ with the smallest perimeter has side length:"),
    "$8$",
    [
      ["$16$", "minperim-16", "$16 \\times 4$ has perimeter $40 > 32$."],
      ["$4$", "minperim-4", "That's the other side of the $16 \\times 4$ rectangle."],
      ["$32$", "minperim-32", "That's the minimum perimeter, not a side."],
    ]),
  // level 3
  num(m(AO, "apply-river-fence", "apply", 3, 25, "A farmer has $800$ m of fence to enclose a rectangle along a river (no fence on the river side). What is the largest area (m²)?"), 80000),
  num(m(AO, "apply-open-box", "apply", 3, 25, "Squares are cut from the corners of an $18 \\times 18$ cm sheet and the sides folded up into an open box. What is the largest possible volume (cm³)?"), 432),
  num(m(AO, "apply-closest-point", "apply", 3, 25, "Find the $y$-coordinate of the points on $y = x^{2}$ closest to $(0, 2)$."), 1.5),
  mcq(m(AO, "apply-endpoints-zero", "apply", 3, 25, "To maximise $f(x) = x(10 - x)$ on $[0, 10]$, the endpoints give $f = 0$. So the maximum is:"),
    "At the critical point $x = 5$, with value $25$",
    [
      ["At an endpoint", "endzero-endpoint", "The endpoints give the minimum $0$."],
      ["$10$", "endzero-ten", "$f(5) = 25$."],
      ["It doesn't exist", "endzero-none", "A continuous function on a closed interval has a maximum."],
    ]),
  // level 4
  num(m(AO, "apply-can-radius", "apply", 4, 30, "A closed cylindrical can must hold $16\\pi$ cm³. What radius minimises its surface area (cm)?"), 2),
  num(m(AO, "apply-semicircle-rectangle", "apply", 4, 30, "A rectangle is inscribed in a semicircle of radius $5$ with its base on the diameter. What is its largest possible area?"), 25),
  num(m(AO, "apply-max-profit", "apply", 4, 30, "Profit is $P(q) = -2q^{2} + 80q - 300$. What is the maximum profit?"), 500),
  mcq(m(AO, "apply-square-distance", "apply", 4, 30, "To find the point on a curve closest to a given point, minimising $D^{2}$ instead of $D$ is valid because:"),
    "Squaring is increasing on $D \\ge 0$, so $D$ and $D^{2}$ have the same minimiser",
    [
      ["$D^{2}$ and $D$ have the same minimum value", "distsq-value", "The values differ; the location is the same."],
      ["It's only an approximation", "distsq-approx", "It's exact."],
      ["Square roots can't be differentiated", "distsq-cant", "They can; it's just messier."],
    ]),
  // level 5
  short(m(AO, "explain-distance-squared", "explain", 5, 90, "Explain why you may minimise the squared distance instead of the distance, and why it helps."),
    [
      ["monotone", "$t \\mapsto t^{2}$ is increasing for $t \\ge 0$, so the same point minimises both", 2, true],
      ["helps", "It removes the square root, making the derivative simpler", 2, true],
    ]),
  mcq(m(AO, "apply-open-domain", "apply", 5, 40, "$C(x) = 5x + \\frac{500}{x}$ on $(0, \\infty)$ has exactly one critical point. Why is it the global minimum?"),
    "$C \\to \\infty$ at both ends of $(0, \\infty)$, and there is only one critical point",
    [
      ["Every critical point is a global minimum", "open-every", "$x^{3} - 3x$ has a critical point that is a local max."],
      ["Because $C$ is positive", "open-positive", "Positivity doesn't locate the minimum."],
      ["Because $C'' < 0$", "open-concave", "$C'' = \\frac{1000}{x^{3}} > 0$, and concave down would mean a maximum."],
    ]),
  mcq(m(AO, "apply-circle-rectangle", "apply", 5, 40, "The rectangle of largest area inscribed in a circle is:"),
    "A square",
    [
      ["A $2 : 1$ rectangle", "circlerect-ratio", "By symmetry the optimum has equal sides."],
      ["Any inscribed rectangle", "circlerect-any", "Thin rectangles have small area."],
      ["A degenerate line segment", "circlerect-line", "That has area $0$."],
    ]),
  num(m(AO, "apply-circle-rectangle-area", "apply", 5, 40, "What is the largest area of a rectangle inscribed in a circle of radius $3$?"), 18),
  // level 6
  short(m(AO, "explain-lifeguard", "explain", 6, 120, "A lifeguard at distance $a$ from the water runs along the beach and then swims to a swimmer at distance $b$ out, a horizontal distance $d$ away. Set up the time to minimise and state the condition at the optimum."),
    [
      ["setup", "With $x$ the point where they enter the water: $T(x) = \\frac{\\sqrt{a^{2} + x^{2}}}{v_1} + \\frac{\\sqrt{b^{2} + (d - x)^{2}}}{v_2}$", 2, true],
      ["condition", "$T'(x) = 0$ gives $\\frac{\\sin\\theta_1}{v_1} = \\frac{\\sin\\theta_2}{v_2}$ (Snell's law), with the angles measured from the normal", 2, true],
    ]),
  num(m(AO, "apply-norman-window", "apply", 6, 45, "A window is a rectangle topped by a semicircle, with total perimeter $10$ m. What is the largest possible area (m²)? Give $3$ decimal places."), 7.001),
  num(m(AO, "apply-line-closest", "apply", 6, 45, "Find the $x$-coordinate of the point on $y = 2x + 1$ closest to the origin."), -0.4),
  mcq(m(AO, "apply-revenue", "apply", 6, 45, "Demand is $q = 100 - 2p$. Which price maximises revenue $R = pq$?"),
    "$p = 25$",
    [
      ["$p = 50$", "revenue-zero-demand", "At $p = 50$ demand is $0$."],
      ["$p = 100$", "revenue-intercept", "Demand would be negative."],
      ["$p = 12.5$", "revenue-half", "$R' = 100 - 4p = 0$ gives $p = 25$."],
    ]),
  // level 7
  short(m(AO, "explain-box-material", "explain", 7, 120, "An open-top box with a square base must hold $32{,}000$ cm³. Find the dimensions that use the least material, and justify that it is a minimum."),
    [
      ["objective", "With base $x$ and height $h$: $x^{2}h = 32{,}000$, so $S = x^{2} + \\frac{128{,}000}{x}$", 2, true],
      ["solve", "$S' = 2x - \\frac{128{,}000}{x^{2}} = 0$ gives $x = 40$, $h = 20$; $S'' > 0$ (or $S \\to \\infty$ at both ends) confirms the minimum", 2, true],
    ]),
  num(m(AO, "apply-rope-stake", "apply", 7, 60, "Posts of height $12$ m and $28$ m stand $30$ m apart. A rope runs from the top of one post to a stake on the ground between them and up to the top of the other. How far from the shorter post should the stake be to minimise the rope length (m)?"), 9),
  num(m(AO, "apply-rope-length", "apply", 7, 60, "In the same setting (posts of $12$ m and $28$ m, $30$ m apart), what is the minimum rope length (m)?"), 50),
  mcq(m(AO, "apply-marginal", "apply", 7, 60, "Profit $P(q) = R(q) - C(q)$ is maximised at an interior point where:"),
    "Marginal revenue equals marginal cost, $R'(q) = C'(q)$",
    [
      ["Revenue equals cost", "marginal-breakeven", "That's the break-even point, where profit is $0$."],
      ["Average cost is smallest", "marginal-average", "That minimises cost per unit, not profit."],
      ["Price is $0$", "marginal-price", "That gives no revenue."],
    ]),
  // level 8
  short(m(AO, "explain-cylinder", "explain", 8, 150, "Show that a closed cylinder of fixed volume $V$ has the least surface area when its height equals its diameter."),
    [
      ["reduce", "Uses $h = \\frac{V}{\\pi r^{2}}$ to get $S(r) = 2\\pi r^{2} + \\frac{2V}{r}$", 2, true],
      ["solve", "$S' = 0$ gives $r^{3} = \\frac{V}{2\\pi}$, hence $h = \\frac{V}{\\pi r^{2}} = 2r$; $S \\to \\infty$ at both ends, so it's the minimum", 2, true],
    ]),
  num(m(AO, "apply-poster", "apply", 8, 75, "A poster has $384$ cm² of print, with $4$ cm margins at top and bottom and $3$ cm margins at the sides. What total width minimises the poster's area (cm)? Give $2$ decimal places."), 22.97),
  num(m(AO, "apply-ladder-fence", "apply", 8, 75, "An $8$ ft fence stands $1$ ft from a tall wall. What is the shortest ladder that reaches from the ground, over the fence, to the wall (ft)? Give $2$ decimal places."), 11.18),
  mcq(m(AO, "apply-critical-outside", "apply", 8, 75, "If the only critical point lies outside the allowed interval $[a, b]$, the optimum is:"),
    "At an endpoint",
    [
      ["At the critical point anyway", "outside-use", "It isn't feasible."],
      ["Nowhere: it doesn't exist", "outside-none", "A continuous function on $[a, b]$ attains its extrema."],
      ["At the midpoint of $[a, b]$", "outside-midpoint", "With no interior critical point, $f$ is monotone on $[a, b]$."],
    ]),
  // level 9
  short(m(AO, "transfer-snell", "transfer", 9, 180, "Light travels from $A$ (speed $v_1$) to $B$ (speed $v_2$) across a flat boundary. Show that the travel time is minimised when $\\frac{\\sin\\theta_1}{v_1} = \\frac{\\sin\\theta_2}{v_2}$."),
    [
      ["time", "Writes $T(x) = \\frac{\\sqrt{a^{2} + x^{2}}}{v_1} + \\frac{\\sqrt{b^{2} + (d - x)^{2}}}{v_2}$", 2, true],
      ["derivative", "$T'(x) = \\frac{x}{v_1\\sqrt{a^{2} + x^{2}}} - \\frac{d - x}{v_2\\sqrt{b^{2} + (d - x)^{2}}}$, and the fractions are $\\frac{\\sin\\theta_1}{v_1}$ and $\\frac{\\sin\\theta_2}{v_2}$", 2, true],
    ]),
  short(m(AO, "transfer-certify", "transfer", 9, 180, "How do you certify that a critical point is a global optimum when the domain is an open interval? Give an example where skipping this step gives a wrong answer."),
    [
      ["methods", "Shows the function tends to $+\\infty$ (for a min) at both ends, or that the critical point is unique with a fixed-sign second derivative, or compares with limiting values", 2, true],
      ["example", "A valid failure example, e.g. a local min that is not global, or a critical point that is a maximum when a minimum was wanted", 2, true],
    ]),
  num(m(AO, "apply-wire-square", "apply", 9, 90, "A $10$ m wire is cut in two; one piece forms a square, the other a circle. How much wire should go to the square to minimise the total area (m)? Give $3$ decimal places."), 5.601),
  mcq(m(AO, "transfer-wire-max", "transfer", 9, 90, "In the same wire problem, to maximise the total area you should:"),
    "Use all the wire for the circle",
    [
      ["Use all the wire for the square", "wire-square", "A circle encloses more area for a given perimeter."],
      ["Split it equally", "wire-equal", "The area function is concave up, so its maximum is at an endpoint."],
      ["Use the critical point", "wire-critical", "The critical point is the minimum."],
    ]),
  // level 10
  short(m(AO, "transfer-divided-field", "transfer", 10, 180, "A rectangular field of area $A$ is split into $n$ equal plots by $n - 1$ fences parallel to one side. Minimise the total length of fencing."),
    [
      ["objective", "With sides $x$ and $y$ (dividers parallel to $y$): $xy = A$ and $L = 2x + (n + 1)y$", 2, true],
      ["optimum", "Minimised when $2x = (n + 1)y$, giving $L = 2\\sqrt{2(n + 1)A}$", 2, true],
    ]),
  short(m(AO, "transfer-cone-in-sphere", "transfer", 10, 180, "A right circular cone is inscribed in a sphere of radius $R$. Find the height of the cone with the largest volume."),
    [
      ["constraint", "With height $h$ and base radius $r$: $r^{2} = h(2R - h)$, so $V = \\frac{\\pi}{3}(2Rh^{2} - h^{3})$", 2, true],
      ["solve", "$V'(h) = 0$ gives $h = \\frac{4R}{3}$", 2, true],
    ]),
  num(m(AO, "transfer-cone-fraction", "transfer", 10, 120, "What fraction of the sphere's volume does the largest inscribed cone occupy? Give $3$ decimal places."), 0.296),
  mcq(m(AO, "transfer-x-root-x", "transfer", 10, 120, "For $x > 0$, $f(x) = x^{1/x}$ is largest at:"),
    "$x = e$",
    [
      ["$x = 1$", "xroot-one", "$f(1) = 1 < f(2) = \\sqrt{2}$."],
      ["$x = 2$", "xroot-two", "$f(3) = 3^{1/3} \\approx 1.442 > \\sqrt{2} \\approx 1.414$."],
      ["As $x \\to \\infty$", "xroot-infinity", "$f(x) \\to 1$."],
    ]),
];

// ---------------------------------------------------------------------------
// lhopitals-rule
// ---------------------------------------------------------------------------
const LH = "lhopitals-rule";
const lhopitalsRule: Item[] = [
  // level 1
  mcq(m(LH, "recall-forms", "recall", 1, 15, "L'Hôpital's rule applies directly to limits of the form:"),
    "$\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$",
    [
      ["Any quotient", "forms-any", "A determinate quotient like $\\frac{1}{2}$ gives wrong answers."],
      ["$\\frac{1}{0}$", "forms-nonzero", "That's an infinite limit, not indeterminate."],
      ["$0 \\cdot \\infty$, without rewriting", "forms-product", "Products must be rewritten as quotients first."],
    ]),
  mcq(m(LH, "recall-replacement", "recall", 1, 15, "L'Hôpital's rule replaces $\\lim \\frac{f}{g}$ with:"),
    "$\\lim \\frac{f'}{g'}$",
    [
      ["$\\lim \\left(\\frac{f}{g}\\right)'$", "replace-quotient", "It's not the derivative of the quotient."],
      ["$\\lim \\frac{f'g - fg'}{g^{2}}$", "replace-quotient-rule", "That's the quotient rule."],
      ["$\\lim \\frac{f'}{g}$", "replace-top", "Both top and bottom are differentiated."],
    ]),
  mcq(m(LH, "recall-not-indeterminate", "recall", 1, 15, "Which of these forms is $\\textbf{NOT}$ indeterminate?"),
    "$\\infty + \\infty$",
    [
      ["$0 \\cdot \\infty$", "notind-product", "$x \\cdot \\frac{1}{x}$ and $x^{2} \\cdot \\frac{1}{x}$ give different answers."],
      ["$\\infty - \\infty$", "notind-difference", "$(x + 1) - x$ and $x^{2} - x$ differ."],
      ["$1^{\\infty}$", "notind-power", "$\\left(1 + \\frac{1}{x}\\right)^{x} \\to e$, not $1$."],
    ]),
  mcq(m(LH, "recall-power-forms", "recall", 1, 15, "For the forms $1^{\\infty}$, $0^{0}$ and $\\infty^{0}$, the usual first step is to:"),
    "Take logarithms to turn the power into a product",
    [
      ["Apply L'Hôpital's rule directly", "power-direct", "There's no quotient yet."],
      ["Conclude the limit is $1$", "power-one", "These forms are indeterminate."],
      ["Square the expression", "power-square", "That doesn't help."],
    ]),
  // level 2
  num(m(LH, "apply-sin-3x", "apply", 2, 20, "Use L'Hôpital's rule to find $\\lim_{x \\to 0} \\frac{\\sin 3x}{x}$."), 3),
  num(m(LH, "apply-exp-minus-one", "apply", 2, 20, "Find $\\lim_{x \\to 0} \\frac{e^{x} - 1}{x}$."), 1),
  num(m(LH, "apply-polynomial-ratio", "apply", 2, 20, "Find $\\lim_{x \\to 2} \\frac{x^{2} - 4}{x - 2}$ with L'Hôpital's rule."), 4),
  mcq(m(LH, "apply-log-over-x", "apply", 2, 20, "$\\lim_{x \\to \\infty} \\frac{\\ln x}{x} =$"),
    "$0$",
    [
      ["$1$", "logx-one", "After the rule: $\\frac{1/x}{1} \\to 0$."],
      ["$\\infty$", "logx-infinite", "$\\ln x$ grows much more slowly than $x$."],
      ["It does not exist", "logx-dne", "The rule gives $0$."],
    ]),
  // level 3
  num(m(LH, "apply-exp-over-sin", "apply", 3, 25, "Find $\\lim_{x \\to 0} \\frac{e^{2x} - 1}{\\sin x}$."), 2),
  num(m(LH, "apply-cos-square", "apply", 3, 25, "Find $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^{2}}$."), 0.5),
  num(m(LH, "apply-infinity-ratio", "apply", 3, 25, "Find $\\lim_{x \\to \\infty} \\frac{3x^{2} + 1}{5x^{2} - x}$."), 0.6),
  mcq(m(LH, "apply-check-form", "apply", 3, 25, "Can L'Hôpital's rule be used on $\\lim_{x \\to 0} \\frac{x + 1}{x + 2}$?"),
    "No — substitution gives $\\frac{1}{2}$, which is not indeterminate",
    [
      ["Yes, giving $1$", "checkform-yes", "Using it here gives the wrong answer $1$."],
      ["Yes, it works for any quotient", "checkform-any", "Only $\\frac{0}{0}$ and $\\frac{\\infty}{\\infty}$."],
      ["No, because the limit doesn't exist", "checkform-dne", "The limit exists: it's $\\frac{1}{2}$."],
    ]),
  // level 4
  num(m(LH, "apply-x-log-x", "apply", 4, 30, "Find $\\lim_{x \\to 0^{+}} x\\ln x$."), 0),
  num(m(LH, "apply-x-minus-sin", "apply", 4, 30, "Find $\\lim_{x \\to 0} \\frac{x - \\sin x}{x^{3}}$. Give $4$ decimal places."), 0.1667),
  num(m(LH, "apply-square-over-exp", "apply", 4, 30, "Find $\\lim_{x \\to \\infty} \\frac{x^{2}}{e^{x}}$."), 0),
  mcq(m(LH, "apply-e-limit", "apply", 4, 30, "$\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^{x} =$"),
    "$e$",
    [
      ["$1$", "elimit-one", "$1^{\\infty}$ is indeterminate; the logarithm tends to $1$, so the limit is $e^{1}$."],
      ["$\\infty$", "elimit-infinite", "The base approaches $1$ fast enough to keep it finite."],
      ["$0$", "elimit-zero", "The base is greater than $1$."],
    ]),
  // level 5
  short(m(LH, "explain-misuse", "explain", 5, 90, "A student applies L'Hôpital's rule to $\\lim_{x \\to 0} \\frac{x + 1}{x + 2}$ and gets $1$. Explain the mistake and give the correct value."),
    [
      ["hypothesis", "The rule only applies to $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$; this limit is $\\frac{1}{2}$ by substitution", 2, true],
      ["consequence", "Applying it outside its hypotheses can give a wrong answer, as here", 2, true],
    ]),
  mcq(m(LH, "apply-oscillating-ratio", "apply", 5, 40, "For $\\lim_{x \\to \\infty} \\frac{x + \\sin x}{x}$, L'Hôpital gives $\\frac{1 + \\cos x}{1}$, which has no limit. What follows?"),
    "The rule is inconclusive; dividing by $x$ shows the limit is $1$",
    [
      ["The original limit does not exist", "oscratio-dne", "The rule says nothing when $\\frac{f'}{g'}$ has no limit."],
      ["The limit is $2$", "oscratio-two", "$\\frac{\\sin x}{x} \\to 0$, so the limit is $1$."],
      ["The limit is $0$", "oscratio-zero", "The leading term is $\\frac{x}{x} = 1$."],
    ]),
  mcq(m(LH, "apply-x-to-x", "apply", 5, 40, "$\\lim_{x \\to 0^{+}} x^{x} =$"),
    "$1$",
    [
      ["$0$", "xtox-zero", "$\\ln(x^{x}) = x\\ln x \\to 0$, so $x^{x} \\to e^{0} = 1$."],
      ["$e$", "xtox-e", "The logarithm tends to $0$, not $1$."],
      ["$\\infty$", "xtox-infinite", "The logarithm tends to $0$."],
    ]),
  num(m(LH, "apply-tan-minus-x", "apply", 5, 40, "Find $\\lim_{x \\to 0} \\frac{\\tan x - x}{x^{3}}$. Give $4$ decimal places."), 0.3333),
  // level 6
  short(m(LH, "explain-zero-times-infinity", "explain", 6, 120, "Evaluate $\\lim_{x \\to \\infty} x\\sin\\frac{1}{x}$, explaining how the $0 \\cdot \\infty$ form is handled."),
    [
      ["rewrite", "Rewrites as $\\frac{\\sin(1/x)}{1/x}$, a $\\frac{0}{0}$ form (or substitutes $u = \\frac{1}{x} \\to 0^{+}$)", 2, true],
      ["value", "Applies L'Hôpital or $\\frac{\\sin u}{u} \\to 1$ to get $1$", 2, true],
    ]),
  num(m(LH, "apply-reciprocal-difference", "apply", 6, 45, "Find $\\lim_{x \\to 0} \\left(\\frac{1}{x} - \\frac{1}{\\sin x}\\right)$."), 0),
  num(m(LH, "apply-compound-power", "apply", 6, 45, "Find $\\lim_{x \\to \\infty} \\left(1 + \\frac{3}{x}\\right)^{2x}$. Give $2$ decimal places."), 403.43),
  mcq(m(LH, "apply-sin-to-x", "apply", 6, 45, "$\\lim_{x \\to 0^{+}} (\\sin x)^{x} =$"),
    "$1$",
    [
      ["$0$", "sintox-zero", "$x\\ln\\sin x \\approx x\\ln x \\to 0$, so the limit is $e^{0}$."],
      ["$e$", "sintox-e", "The logarithm tends to $0$."],
      ["It does not exist", "sintox-dne", "The one-sided limit exists."],
    ]),
  // level 7
  short(m(LH, "explain-log-power", "explain", 7, 120, "Show that $\\lim_{x \\to \\infty} \\frac{(\\ln x)^{n}}{x} = 0$ for every positive integer $n$."),
    [
      ["step", "One application gives $\\frac{n(\\ln x)^{n - 1}}{x}$, lowering the power of $\\ln x$ by one", 2, true],
      ["finish", "After $n$ applications the limit is $\\frac{n!}{x} \\to 0$ (or substitute $x = e^{u}$ to get $\\frac{u^{n}}{e^{u}}$)", 2, true],
    ]),
  num(m(LH, "apply-sinh-like", "apply", 7, 60, "Find $\\lim_{x \\to 0} \\frac{e^{x} - e^{-x} - 2x}{x - \\sin x}$."), 2),
  num(m(LH, "apply-fourth-order", "apply", 7, 60, "Find $\\lim_{x \\to 0} \\frac{\\cos x - 1 + \\frac{x^{2}}{2}}{x^{4}}$. Give $4$ decimal places."), 0.0417),
  mcq(m(LH, "apply-one-to-infinity", "apply", 7, 60, "$\\lim_{x \\to 0} (1 + \\sin x)^{1/x} =$"),
    "$e$",
    [
      ["$1$", "oneinf-one", "$1^{\\infty}$ is indeterminate: the logarithm $\\frac{\\ln(1 + \\sin x)}{x} \\to 1$."],
      ["$\\infty$", "oneinf-infinite", "The logarithm has a finite limit."],
      ["$0$", "oneinf-zero", "The base is near $1$, and the logarithm tends to $1$."],
    ]),
  // level 8
  short(m(LH, "explain-cycling", "explain", 8, 150, "Explain why repeatedly applying L'Hôpital's rule to $\\lim_{x \\to \\infty} \\frac{\\sqrt{x^{2} + 1}}{x}$ gets nowhere, and find the limit another way."),
    [
      ["cycle", "One application gives $\\frac{x}{\\sqrt{x^{2} + 1}}$, the reciprocal; another returns the original, so it cycles", 2, true],
      ["alternative", "Dividing by $x$ gives $\\sqrt{1 + \\frac{1}{x^{2}}} \\to 1$", 2, true],
    ]),
  num(m(LH, "apply-root-of-two", "apply", 8, 75, "Find $\\lim_{x \\to \\infty} x\\left(2^{1/x} - 1\\right)$. Give $3$ decimal places."), 0.693),
  num(m(LH, "apply-x-to-sin", "apply", 8, 75, "Find $\\lim_{x \\to 0^{+}} x^{\\sin x}$."), 1),
  mcq(m(LH, "apply-second-application", "apply", 8, 75, "For $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^{2}}$, one application gives $\\frac{\\sin x}{2x}$; a student applies the rule again to get $\\frac{\\cos x}{2} \\to \\frac{1}{2}$. Was the second application valid?"),
    "Yes, because $\\frac{\\sin x}{2x}$ is still a $\\frac{0}{0}$ form",
    [
      ["No, the rule may only be used once", "second-once", "It may be repeated while the form stays indeterminate."],
      ["No, and the true limit is $0$", "second-zero", "The limit is $\\frac{1}{2}$."],
      ["Yes, but the limit is $1$", "second-one", "$\\frac{\\cos 0}{2} = \\frac{1}{2}$."],
    ]),
  // level 9
  short(m(LH, "transfer-prove-simple", "transfer", 9, 180, "Prove L'Hôpital's rule in the simple case $f(a) = g(a) = 0$, with $f'$ and $g'$ continuous at $a$ and $g'(a) \\ne 0$."),
    [
      ["rewrite", "Writes $\\frac{f(x)}{g(x)} = \\frac{(f(x) - f(a))/(x - a)}{(g(x) - g(a))/(x - a)}$", 2, true],
      ["limit", "The difference quotients tend to $f'(a)$ and $g'(a) \\ne 0$, so the ratio tends to $\\frac{f'(a)}{g'(a)} = \\lim \\frac{f'}{g'}$", 2, true],
    ]),
  short(m(LH, "transfer-sinc-power", "transfer", 9, 180, "Find $\\lim_{x \\to 0} \\left(\\frac{\\sin x}{x}\\right)^{1/x^{2}}$."),
    [
      ["log", "Takes logs: $\\frac{\\ln(\\sin x / x)}{x^{2}}$, a $\\frac{0}{0}$ form", 2, true],
      ["value", "Shows it tends to $-\\frac{1}{6}$ (e.g. $\\ln\\frac{\\sin x}{x} \\approx -\\frac{x^{2}}{6}$), so the limit is $e^{-1/6}$", 2, true],
    ]),
  num(m(LH, "apply-cos-power", "apply", 9, 90, "Find $\\lim_{x \\to 0} (\\cos x)^{1/x^{2}}$. Give $3$ decimal places."), 0.607),
  mcq(m(LH, "transfer-needs-rewrite", "transfer", 9, 90, "Which limit must be rewritten before L'Hôpital's rule can be applied?"),
    "$\\lim_{x \\to 0^{+}} x\\ln x$",
    [
      ["$\\lim_{x \\to 0} \\frac{\\sin x}{x}$", "rewrite-sin", "That's already $\\frac{0}{0}$."],
      ["$\\lim_{x \\to 0} \\frac{e^{x} - 1}{x}$", "rewrite-exp", "That's already $\\frac{0}{0}$."],
      ["$\\lim_{x \\to \\infty} \\frac{\\ln x}{x}$", "rewrite-log", "That's already $\\frac{\\infty}{\\infty}$."],
    ]),
  // level 10
  short(m(LH, "transfer-silent-not-dne", "transfer", 10, 180, "Explain why “$\\lim \\frac{f'}{g'}$ does not exist” does not imply “$\\lim \\frac{f}{g}$ does not exist”. Give an example."),
    [
      ["logic", "The rule is a one-way implication requiring $\\lim \\frac{f'}{g'}$ to exist; when it doesn't, the rule gives no information", 2, true],
      ["example", "Example: $\\frac{x + \\sin x}{x} \\to 1$ while $\\frac{1 + \\cos x}{1}$ oscillates (or $\\frac{x^{2}\\sin(1/x)}{x}$ at $0$)", 2, true],
    ]),
  short(m(LH, "transfer-second-difference", "transfer", 10, 180, "Use L'Hôpital's rule to show that $\\lim_{h \\to 0} \\frac{f(a + h) - 2f(a) + f(a - h)}{h^{2}} = f''(a)$ when $f''$ is continuous."),
    [
      ["first", "One application in $h$ gives $\\frac{f'(a + h) - f'(a - h)}{2h}$, still $\\frac{0}{0}$", 2, true],
      ["second", "Another gives $\\frac{f''(a + h) + f''(a - h)}{2} \\to f''(a)$", 2, true],
    ]),
  num(m(LH, "transfer-reciprocal-squares", "transfer", 10, 120, "Find $\\lim_{x \\to 0} \\left(\\frac{1}{x^{2}} - \\frac{1}{\\sin^{2} x}\\right)$. Give $4$ decimal places."), -0.3333),
  mcq(m(LH, "transfer-growth", "transfer", 10, 120, "$\\lim_{x \\to \\infty} \\frac{x^{1000}}{1.0001^{x}} =$"),
    "$0$",
    [
      ["$\\infty$", "growth-power-wins", "After $1000$ applications the numerator is a constant and the denominator still grows."],
      ["$1$", "growth-one", "Exponentials eventually dominate powers."],
      ["It depends on how large $x$ is", "growth-depends", "A limit doesn't depend on $x$; for moderate $x$ the ratio is huge, but it tends to $0$."],
    ]),
];

// ---------------------------------------------------------------------------
// linear-approximation
// ---------------------------------------------------------------------------
const LA = "linear-approximation";
const linearApproximation: Item[] = [
  // level 1
  mcq(m(LA, "recall-linearisation", "recall", 1, 15, "The linearisation of $f$ at $a$ is:"),
    "$L(x) = f(a) + f'(a)(x - a)$",
    [
      ["$L(x) = f'(a)x$", "lin-no-intercept", "The line must pass through $(a, f(a))$."],
      ["$L(x) = f(a) + f'(x)(x - a)$", "lin-wrong-point", "The slope is fixed at $f'(a)$."],
      ["$L(x) = f(x) + f'(a)$", "lin-shift", "That isn't a line."],
    ]),
  mcq(m(LA, "recall-differential", "recall", 1, 15, "The differential $dy$ of $y = f(x)$ is:"),
    "$f'(x)\\,dx$",
    [
      ["$f(x + dx) - f(x)$", "diff-exact", "That's $\\Delta y$, which $dy$ approximates."],
      ["$f(x)\\,dx$", "diff-no-derivative", "The derivative, not the function, multiplies $dx$."],
      ["$\\frac{dx}{f'(x)}$", "diff-inverted", "That's the change in $x$ for a given change in $y$."],
    ]),
  mcq(m(LA, "recall-accuracy", "recall", 1, 15, "A linear approximation $f(x) \\approx L(x)$ is most accurate:"),
    "For $x$ near $a$",
    [
      ["For large $x$", "accuracy-large", "The error grows with distance from $a$."],
      ["Everywhere equally", "accuracy-everywhere", "Only lines equal their own linearisation everywhere."],
      ["Where $f$ is largest", "accuracy-max", "Closeness to $a$ is what matters."],
    ]),
  mcq(m(LA, "recall-sin-x", "recall", 1, 15, "The approximation $\\sin x \\approx x$ is the linearisation of $\\sin x$ at:"),
    "$x = 0$",
    [
      ["$x = \\frac{\\pi}{2}$", "sinx-peak", "At $\\frac{\\pi}{2}$ the tangent is horizontal: $\\sin x \\approx 1$."],
      ["$x = \\pi$", "sinx-pi", "At $\\pi$ the linearisation is $\\pi - x$."],
      ["Every $x$", "sinx-everywhere", "It's only accurate near $0$."],
    ]),
  // level 2
  num(m(LA, "apply-sqrt-estimate", "apply", 2, 20, "Use the linearisation of $\\sqrt{x}$ at $4$ to estimate $\\sqrt{4.1}$. Give $3$ decimal places."), 2.025),
  num(m(LA, "apply-square-estimate", "apply", 2, 20, "Use the linearisation of $x^{2}$ at $3$ to estimate $3.1^{2}$."), 9.6),
  num(m(LA, "apply-exp-estimate", "apply", 2, 20, "Use the linearisation of $e^{x}$ at $0$ to estimate $e^{0.1}$."), 1.1),
  mcq(m(LA, "apply-binomial", "apply", 2, 20, "For small $x$, $(1 + x)^{k} \\approx$"),
    "$1 + kx$",
    [
      ["$1 + x^{k}$", "binom-power", "The linear term comes from the derivative $k$ at $0$."],
      ["$k + x$", "binom-swap", "At $x = 0$ the value is $1$."],
      ["$1 + \\frac{x}{k}$", "binom-divide", "The slope at $0$ is $k$."],
    ]),
  // level 3
  num(m(LA, "apply-cube-root-estimate", "apply", 3, 25, "Use a linear approximation at $8$ to estimate $\\sqrt[3]{8.12}$."), 2.01),
  num(m(LA, "apply-log-estimate", "apply", 3, 25, "Use a linear approximation at $1$ to estimate $\\ln 1.05$."), 0.05),
  num(m(LA, "apply-differential", "apply", 3, 25, "For $y = x^{3}$, find $dy$ when $x = 2$ and $dx = 0.1$."), 1.2),
  mcq(m(LA, "apply-concave-over", "apply", 3, 25, "The linear estimate $\\sqrt{4.1} \\approx 2.025$ is:"),
    "An overestimate, because $\\sqrt{x}$ is concave down",
    [
      ["An underestimate, because $\\sqrt{x}$ is increasing", "concave-increasing", "Concavity, not monotonicity, decides the direction."],
      ["Exact", "concave-exact", "$2.025^{2} = 4.100625 \\ne 4.1$."],
      ["An underestimate, because $\\sqrt{x}$ is concave down", "concave-direction", "Concave-down graphs lie below their tangents, so the tangent overestimates."],
    ]),
  // level 4
  num(m(LA, "apply-sphere-volume-error", "apply", 4, 30, "A sphere's radius is $10$ cm with possible error $0.05$ cm. Estimate the possible error in its volume (cm³). Give $2$ decimal places."), 62.83),
  num(m(LA, "apply-relative-volume", "apply", 4, 30, "A sphere's radius has a relative error of $0.5\\%$. Estimate the relative error in its volume, in percent."), 1.5),
  num(m(LA, "apply-reciprocal-estimate", "apply", 4, 30, "Use a linear approximation at $1$ to estimate $\\frac{1}{1.02}$."), 0.98),
  mcq(m(LA, "apply-square-relative", "apply", 4, 30, "If $x$ has a relative error of $2\\%$, then $x^{2}$ has a relative error of about:"),
    "$4\\%$",
    [
      ["$2\\%$", "relsq-same", "$\\frac{d(x^{2})}{x^{2}} = 2\\frac{dx}{x}$."],
      ["$0.04\\%$", "relsq-square", "Relative errors multiply by the exponent, not square."],
      ["$1\\%$", "relsq-half", "That's for $\\sqrt{x}$."],
    ]),
  // level 5
  short(m(LA, "explain-exp-under", "explain", 5, 90, "Explain why the approximation $e^{x} \\approx 1 + x$ underestimates $e^{x}$ for every $x \\ne 0$."),
    [
      ["concavity", "$e^{x}$ is concave up ($f'' = e^{x} > 0$) everywhere", 2, true],
      ["tangent", "A concave-up graph lies above its tangent lines, so $e^{x} > 1 + x$ for $x \\ne 0$", 2, true],
    ]),
  mcq(m(LA, "apply-error-order", "apply", 5, 40, "The error $f(x) - L(x)$ of the linearisation at $a$ shrinks like:"),
    "$(x - a)^{2}$",
    [
      ["$x - a$", "errorder-linear", "The tangent matches the first-order behaviour, so the error is second order."],
      ["A constant", "errorder-constant", "The error goes to $0$ at $a$."],
      ["$(x - a)^{3}$", "errorder-cubic", "Only if $f''(a) = 0$."],
    ]),
  mcq(m(LA, "apply-square-area-error", "apply", 5, 40, "A square's side is $10 \\pm 0.1$ cm. The error in its area is about:"),
    "$\\pm 2$ cm²",
    [
      ["$\\pm 0.01$ cm²", "sqerr-square", "$dA = 2s\\,ds = 2 \\cdot 10 \\cdot 0.1$."],
      ["$\\pm 0.2$ cm²", "sqerr-missing-2", "The power rule gives $2s$."],
      ["$\\pm 20$ cm²", "sqerr-big", "Multiply by $ds = 0.1$."],
    ]),
  num(m(LA, "apply-tan-estimate", "apply", 5, 40, "Use the linearisation of $\\tan x$ at $\\frac{\\pi}{4}$ to estimate $\\tan 0.8$. Give $4$ decimal places."), 1.0292),
  // level 6
  short(m(LA, "explain-error-bound", "explain", 6, 120, "Use the error formula $|f(x) - L(x)| \\le \\frac{M}{2}(x - a)^{2}$, with $M$ a bound on $|f''|$, to bound the error in $\\sqrt{4.1} \\approx 2.025$."),
    [
      ["bound-M", "$f''(x) = -\\frac{1}{4}x^{-3/2}$, so $|f''| \\le \\frac{1}{32}$ on $[4, 4.1]$", 2, true],
      ["result", "Error $\\le \\frac{1}{64}(0.1)^{2} \\approx 0.00016$", 2, true],
    ]),
  num(m(LA, "apply-power-estimate", "apply", 6, 45, "Use a linear approximation to estimate $(1.01)^{10}$."), 1.1),
  num(m(LA, "apply-pendulum", "apply", 6, 45, "A pendulum's period is $T = 2\\pi\\sqrt{\\frac{L}{g}}$. If $L$ increases by $1\\%$, by about what percent does $T$ increase?"), 0.5),
  mcq(m(LA, "apply-far-away", "apply", 6, 45, "Using $\\sin x \\approx x$ at $x = 3$ is:"),
    "Poor: the error grows with distance from $0$ ($\\sin 3 \\approx 0.14$)",
    [
      ["Excellent, as at every $x$", "far-excellent", "It's only good near $0$."],
      ["Exact, since $\\sin$ is periodic", "far-periodic", "Periodicity doesn't make it linear."],
      ["Good, because $3$ is close to $\\pi$", "far-pi", "Near $\\pi$, $\\sin x \\approx \\pi - x$, not $x$."],
    ]),
  // level 7
  short(m(LA, "explain-cube-error", "explain", 7, 120, "A cube's edge is measured as $30 \\pm 0.1$ cm. Use differentials to estimate the maximum error in its volume and the relative error."),
    [
      ["absolute", "$dV = 3x^{2}\\,dx = 3 \\cdot 900 \\cdot 0.1 = 270$ cm³", 2, true],
      ["relative", "$\\frac{dV}{V} = 3\\frac{dx}{x} = 3 \\cdot \\frac{0.1}{30} = 1\\%$", 2, true],
    ]),
  num(m(LA, "apply-newton-one", "apply", 7, 60, "Apply one Newton step to $f(x) = x^{2} - 2$ from $x_0 = 1$."), 1.5),
  num(m(LA, "apply-newton-two", "apply", 7, 60, "Apply a second Newton step to $f(x) = x^{2} - 2$, from $x_1 = 1.5$. Give $4$ decimal places."), 1.4167),
  mcq(m(LA, "apply-log-below-one", "apply", 7, 60, "The linearisation of $\\ln x$ at $x = 1$ estimates $\\ln 0.9$ as:"),
    "$-0.1$",
    [
      ["$0.9$", "logbelow-value", "$L(x) = x - 1$, so $L(0.9) = -0.1$."],
      ["$0.1$", "logbelow-sign", "$\\ln$ of a number below $1$ is negative."],
      ["$-0.9$", "logbelow-shift", "$L(0.9) = 0.9 - 1$."],
    ]),
  // level 8
  short(m(LA, "explain-best-linear", "explain", 8, 150, "In what sense is the tangent line the best linear approximation at $a$? Why does no other line through $(a, f(a))$ do as well?"),
    [
      ["property", "For the tangent, $\\frac{f(x) - L(x)}{x - a} \\to 0$ as $x \\to a$", 2, true],
      ["others", "For a line with slope $m \\ne f'(a)$, that ratio tends to $f'(a) - m \\ne 0$, so its error is first order, not second", 2, true],
    ]),
  num(m(LA, "apply-root-below", "apply", 8, 75, "Use a linear approximation at $100$ to estimate $\\sqrt{99.8}$."), 9.99),
  num(m(LA, "apply-shell-volume", "apply", 8, 75, "Use differentials to estimate the volume of a thin spherical shell with inner radius $5$ cm and thickness $0.1$ cm (cm³). Give $2$ decimal places."), 31.42),
  mcq(m(LA, "transfer-concave-bound", "transfer", 8, 75, "$f(2) = 3$, $f'(2) = -1$ and $f''(x) > 0$ everywhere. Then $f(2.1)$ is:"),
    "Greater than $2.9$",
    [
      ["Less than $2.9$", "concavebound-less", "Concave up means the graph lies above its tangent line $L(2.1) = 2.9$."],
      ["Exactly $2.9$", "concavebound-exact", "Only a linear $f$ matches its tangent exactly."],
      ["Impossible to compare with $2.9$", "concavebound-unknown", "The sign of $f''$ decides it."],
    ]),
  // level 9
  short(m(LA, "transfer-relativity", "transfer", 9, 180, "Derive the binomial approximation $(1 + x)^{k} \\approx 1 + kx$ and use it to show the relativistic factor $\\gamma = \\left(1 - \\frac{v^{2}}{c^{2}}\\right)^{-1/2} \\approx 1 + \\frac{v^{2}}{2c^{2}}$ for $v \\ll c$."),
    [
      ["derive", "Linearises $(1 + x)^{k}$ at $0$: value $1$, slope $k$", 2, true],
      ["apply", "Sets $x = -\\frac{v^{2}}{c^{2}}$ and $k = -\\frac{1}{2}$ to get $1 + \\frac{v^{2}}{2c^{2}}$", 2, true],
    ]),
  short(m(LA, "transfer-product-error", "transfer", 9, 180, "If $z = xy$, show that $\\frac{dz}{z} = \\frac{dx}{x} + \\frac{dy}{y}$ and interpret the result."),
    [
      ["derive", "$dz = y\\,dx + x\\,dy$; dividing by $z = xy$ gives the formula", 2, true],
      ["interpret", "Relative errors add (to first order) when quantities are multiplied", 2, true],
    ]),
  num(m(LA, "apply-triangle-angle-error", "apply", 9, 90, "A triangle has sides $a = 10$, $b = 8$ and included angle $C = 30^{\\circ}$, so its area is $\\frac{1}{2}ab\\sin C$. If $C$ is off by $1^{\\circ}$, estimate the error in the area. Give $3$ decimal places."), 0.605),
  mcq(m(LA, "transfer-newton-meaning", "transfer", 9, 90, "In Newton's method, $x_1 = x_0 - \\frac{f(x_0)}{f'(x_0)}$ is:"),
    "The root of the linearisation of $f$ at $x_0$",
    [
      ["The midpoint of a bracketing interval", "newton-bisection", "That's bisection."],
      ["The minimiser of $f$", "newton-minimum", "This version finds roots, not minima."],
      ["The point where $f'$ vanishes", "newton-critical", "It solves $L(x) = 0$, not $f'(x) = 0$."],
    ]),
  // level 10
  short(m(LA, "transfer-error-formula", "transfer", 10, 180, "Show that the error of the tangent-line approximation is $f(x) - L(x) = \\frac{f''(c)}{2}(x - a)^{2}$ for some $c$ between $a$ and $x$ (assume $f''$ exists)."),
    [
      ["auxiliary", "Builds an auxiliary function, e.g. $g(t) = f(t) - L(t) - K(t - a)^{2}$ with $K$ chosen so $g(x) = 0$", 2, true],
      ["rolle", "Applies Rolle twice (using $g(a) = g'(a) = 0$) to get $g''(c) = f''(c) - 2K = 0$", 2, true],
    ]),
  short(m(LA, "transfer-newton-quadratic", "transfer", 10, 180, "Explain, using the linearisation error, why Newton's method converges quadratically near a simple root."),
    [
      ["error", "Taylor at $x_n$: $0 = f(r) = f(x_n) + f'(x_n)(r - x_n) + \\frac{f''(c)}{2}(r - x_n)^{2}$", 2, true],
      ["conclude", "Subtracting the Newton update gives $r - x_{n + 1} = -\\frac{f''(c)}{2f'(x_n)}(r - x_n)^{2}$, so the error is squared each step", 2, true],
    ]),
  num(m(LA, "transfer-newton-cube-root", "transfer", 10, 120, "Apply two Newton steps to $f(x) = x^{3} - 2$ from $x_0 = 1$. What is $x_2$? Give $4$ decimal places."), 1.2639),
  mcq(m(LA, "transfer-newton-diverges", "transfer", 10, 120, "For $f(x) = x^{1/3}$, Newton's method from any $x_0 \\ne 0$:"),
    "Diverges, since $x_{n + 1} = -2x_n$",
    [
      ["Converges quadratically to $0$", "newtondiv-quadratic", "$f'$ blows up at the root, which breaks the usual analysis."],
      ["Converges in one step", "newtondiv-one-step", "The step overshoots to $-2x_0$."],
      ["Converges linearly", "newtondiv-linear", "The iterates double in size each step."],
    ]),
];

export const calc03Items: Item[] = [
  ...meanValueTheorem,
  ...curveSketching,
  ...appliedOptimization,
  ...lhopitalsRule,
  ...linearApproximation,
];
