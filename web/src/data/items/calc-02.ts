import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./calc-shared";

/**
 * Calculus course, part 2: the derivative, differentiation rules, the chain
 * rule, exponential/log/trig derivatives, and implicit differentiation with
 * related rates. Forty questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// derivative-definition
// ---------------------------------------------------------------------------
const DD = "derivative-definition";
const derivativeDefinition: Item[] = [
  // level 1
  mcq(m(DD, "recall-definition", "recall", 1, 15, "The derivative $f'(a)$ is defined as:"),
    "$\\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}$",
    [
      ["$\\frac{f(a + h) - f(a)}{h}$ for a small $h$", "def-no-limit", "Without the limit this is only a secant slope."],
      ["$\\lim_{h \\to 0} \\frac{f(a + h)}{h}$", "def-no-subtract", "The change $f(a + h) - f(a)$ is what's divided by $h$."],
      ["$\\lim_{h \\to 0} \\left(f(a + h) - f(a)\\right)$", "def-no-divide", "That limit is $0$ for any continuous $f$."],
    ]),
  mcq(m(DD, "recall-geometric", "recall", 1, 15, "Geometrically, $f'(a)$ is:"),
    "The slope of the tangent line at $(a, f(a))$",
    [
      ["The $y$-intercept of the tangent line", "geom-intercept", "The derivative is a slope, not an intercept."],
      ["The area under $f$ up to $a$", "geom-area", "That's an integral."],
      ["The height $f(a)$", "geom-value", "That's the value, not the rate of change."],
    ]),
  mcq(m(DD, "recall-diff-implies-cont", "recall", 1, 15, "Which statement is true?"),
    "Differentiable at $a$ implies continuous at $a$",
    [
      ["Continuous at $a$ implies differentiable at $a$", "cont-implies-diff", "$|x|$ is continuous but not differentiable at $0$."],
      ["Continuity and differentiability are equivalent", "cont-diff-equivalent", "Only one direction holds."],
      ["Neither implies the other", "cont-diff-neither", "Differentiability does imply continuity."],
    ]),
  mcq(m(DD, "recall-secant", "recall", 1, 15, "The difference quotient $\\frac{f(a + h) - f(a)}{h}$ is the slope of:"),
    "The secant line through $(a, f(a))$ and $(a + h, f(a + h))$",
    [
      ["The tangent line at $a$", "secant-tangent", "Only its limit as $h \\to 0$ is the tangent slope."],
      ["The normal line at $a$", "secant-normal", "The normal is perpendicular to the tangent."],
      ["The tangent line at $a + h$", "secant-shifted", "It joins two points; it isn't tangent anywhere in general."],
    ]),
  // level 2
  num(m(DD, "apply-square-at-3", "apply", 2, 20, "For $f(x) = x^{2}$, find $f'(3)$."), 6),
  num(m(DD, "apply-secant-slope", "apply", 2, 20, "Find the slope of the secant line to $y = x^{2}$ from $x = 1$ to $x = 3$."), 4),
  num(m(DD, "apply-tangent-intercept", "apply", 2, 20, "What is the $y$-intercept of the tangent line to $y = x^{2}$ at $x = 3$?"), -9),
  mcq(m(DD, "apply-units", "apply", 2, 20, "If $s(t)$ is position in metres after $t$ seconds, $s'(t)$ is measured in:"),
    "Metres per second",
    [
      ["Metres", "units-same", "A rate divides by the input's units."],
      ["Seconds per metre", "units-inverted", "Output units over input units, not the reverse."],
      ["Metres per second squared", "units-acceleration", "That's $s''(t)$."],
    ]),
  // level 3
  num(m(DD, "apply-definition-quadratic", "apply", 3, 25, "Use the definition to find $f'(2)$ for $f(x) = 3x^{2} - x$."), 11),
  num(m(DD, "apply-reciprocal", "apply", 3, 25, "For $f(x) = \\frac{1}{x}$, find $f'(2)$."), -0.25),
  num(m(DD, "apply-average-rate", "apply", 3, 25, "Find the average rate of change of $f(x) = x^{3}$ on $[1, 2]$."), 7),
  mcq(m(DD, "apply-abs-corner", "apply", 3, 25, "Where is $f(x) = |x|$ not differentiable?"),
    "At $x = 0$ only",
    [
      ["Everywhere", "corner-everywhere", "Away from $0$ it is a line with slope $\\pm 1$."],
      ["Nowhere", "corner-nowhere", "The left and right slopes at $0$ differ."],
      ["For all $x < 0$", "corner-negative", "Negative $x$ gives slope $-1$, which exists."],
    ]),
  // level 4
  num(m(DD, "apply-sqrt-definition", "apply", 4, 30, "Use the definition to find $f'(4)$ for $f(x) = \\sqrt{x}$."), 0.25),
  num(m(DD, "apply-recognise-cube", "apply", 4, 30, "Evaluate $\\lim_{h \\to 0} \\frac{(2 + h)^{3} - 8}{h}$."), 12),
  num(m(DD, "apply-tangent-root", "apply", 4, 30, "The tangent line to $y = \\frac{1}{x}$ at $x = 1$ crosses the $x$-axis at $x = k$. Find $k$."), 2),
  mcq(m(DD, "apply-identify-limit", "apply", 4, 30, "$\\lim_{h \\to 0} \\frac{\\sqrt{9 + h} - 3}{h}$ equals $f'(a)$ for:"),
    "$f(x) = \\sqrt{x}$ and $a = 9$",
    [
      ["$f(x) = \\sqrt{x}$ and $a = 3$", "identify-output", "$3 = f(9)$ is the output, not the input."],
      ["$f(x) = x^{2}$ and $a = 3$", "identify-inverse", "That's the inverse function."],
      ["$f(x) = \\sqrt{x}$ and $a = 0$", "identify-zero", "The quotient compares $\\sqrt{9 + h}$ with $\\sqrt{9}$."],
    ]),
  // level 5
  short(m(DD, "explain-diff-continuous", "explain", 5, 90, "Explain why a function that is differentiable at $a$ must be continuous at $a$."),
    [
      ["rewrite", "Writes $f(a + h) - f(a) = \\frac{f(a + h) - f(a)}{h} \\cdot h$", 2, true],
      ["limit", "As $h \\to 0$ this tends to $f'(a) \\cdot 0 = 0$, so $f(a + h) \\to f(a)$", 2, true],
    ]),
  mcq(m(DD, "apply-nondifferentiable-feature", "apply", 5, 40, "Which feature of a graph means $f'(a)$ does not exist?"),
    "A corner at $a$, like $|x|$ at $0$",
    [
      ["A horizontal tangent at $a$", "feature-horizontal", "A horizontal tangent means $f'(a) = 0$."],
      ["$f(a) = 0$", "feature-root", "Roots can be perfectly smooth."],
      ["An inflection point at $a$", "feature-inflection", "$x^{3}$ has an inflection at $0$ and $f'(0) = 0$."],
    ]),
  mcq(m(DD, "apply-cube-root", "apply", 5, 40, "At $x = 0$, $f(x) = x^{1/3}$:"),
    "Is continuous but has a vertical tangent, so it is not differentiable",
    [
      ["Is differentiable with $f'(0) = 0$", "cuberoot-zero", "The difference quotient $h^{-2/3}$ blows up."],
      ["Is discontinuous", "cuberoot-discontinuous", "Cube roots are continuous."],
      ["Has a corner", "cuberoot-corner", "Both one-sided slopes are $+\\infty$: a vertical tangent, not a corner."],
    ]),
  num(m(DD, "apply-velocity", "apply", 5, 40, "A ball's height is $h(t) = 20t - 5t^{2}$ metres. Find its instantaneous velocity at $t = 1$ (in m/s)."), 10),
  // level 6
  short(m(DD, "explain-cube-definition", "explain", 6, 120, "Use the definition to find $f'(x)$ for $f(x) = x^{3}$."),
    [
      ["expand", "Expands $(x + h)^{3} - x^{3} = 3x^{2}h + 3xh^{2} + h^{3}$", 2, true],
      ["limit", "Divides by $h$ to get $3x^{2} + 3xh + h^{2}$ and lets $h \\to 0$ to get $3x^{2}$", 2, true],
    ]),
  num(m(DD, "apply-smooth-join-a", "apply", 6, 45, "$f(x) = x^{2}$ for $x \\le 1$ and $f(x) = ax + b$ for $x > 1$ is differentiable at $x = 1$. Find $a$."), 2),
  num(m(DD, "apply-smooth-join-b", "apply", 6, 45, "$f(x) = x^{2}$ for $x \\le 1$ and $f(x) = ax + b$ for $x > 1$ is differentiable at $x = 1$. Find $b$."), -1),
  mcq(m(DD, "apply-tangent-line", "apply", 6, 45, "If $f(2) = 5$ and $f'(2) = 3$, the tangent line at $x = 2$ is:"),
    "$y = 3x - 1$",
    [
      ["$y = 5x + 3$", "tangent-swap", "The slope is $f'(2) = 3$, not $f(2)$."],
      ["$y = 3x + 5$", "tangent-intercept", "The line must pass through $(2, 5)$, not $(0, 5)$."],
      ["$y = 3x - 6$", "tangent-shift", "$y = 5 + 3(x - 2) = 3x - 1$."],
    ]),
  // level 7
  short(m(DD, "explain-abs-quotients", "explain", 7, 120, "Use one-sided difference quotients to show $f(x) = |x|$ is not differentiable at $0$."),
    [
      ["right", "For $h > 0$: $\\frac{|h|}{h} = 1$, so the right-hand limit is $1$", 1, true],
      ["left", "For $h < 0$: $\\frac{|h|}{h} = -1$, so the left-hand limit is $-1$", 1, true],
      ["conclude", "The one-sided limits differ, so the derivative limit does not exist", 2, true],
    ]),
  num(m(DD, "apply-scaled-quotient", "apply", 7, 60, "If $f'(1) = 4$, find $\\lim_{h \\to 0} \\frac{f(1 + 2h) - f(1)}{h}$."), 8),
  num(m(DD, "apply-inverse-square", "apply", 7, 60, "Use the definition to find $f'(1)$ for $f(x) = \\frac{1}{x^{2}}$."), -2),
  mcq(m(DD, "transfer-x2-sin", "transfer", 7, 60, "Let $f(x) = x^{2}\\sin\\left(\\frac{1}{x}\\right)$ for $x \\ne 0$ and $f(0) = 0$. Then $f'(0)$:"),
    "Equals $0$",
    [
      ["Does not exist, since $\\sin\\left(\\frac{1}{x}\\right)$ oscillates", "x2sin-dne", "The quotient $h\\sin\\left(\\frac{1}{h}\\right)$ is squeezed to $0$."],
      ["Equals $1$", "x2sin-one", "The quotient is at most $|h|$ in size."],
      ["Is infinite", "x2sin-infinite", "The quotient is bounded by $|h|$."],
    ]),
  // level 8
  short(m(DD, "explain-x-abs-x", "explain", 8, 150, "Is $f(x) = x|x|$ differentiable at $0$? Find $f'(x)$ for every $x$."),
    [
      ["at-zero", "$\\frac{f(h) - f(0)}{h} = |h| \\to 0$, so $f'(0) = 0$", 2, true],
      ["everywhere", "$f = x^{2}$ for $x > 0$ and $-x^{2}$ for $x < 0$, so $f'(x) = 2|x|$ for all $x$", 2, true],
    ]),
  num(m(DD, "apply-symmetric-estimate", "apply", 8, 75, "Estimate $f'(2)$ for $f(x) = 2^{x}$ using $\\frac{f(2.01) - f(1.99)}{0.02}$. Give $4$ decimal places."), 2.7726),
  num(m(DD, "transfer-tangent-through-point", "transfer", 8, 75, "The tangent line to $y = x^{2}$ at $x = a$ passes through $(0, -4)$. Find the positive value of $a$."), 2),
  mcq(m(DD, "apply-symmetric-limit", "apply", 8, 75, "If $f$ is differentiable at $a$, then $\\lim_{h \\to 0} \\frac{f(a + h) - f(a - h)}{2h}$ equals:"),
    "$f'(a)$",
    [
      ["$2f'(a)$", "symmetric-double", "The $2h$ in the denominator accounts for the double step."],
      ["$\\frac{f'(a)}{2}$", "symmetric-half", "Each half contributes $\\frac{f'(a)}{2}$, and they add."],
      ["$0$", "symmetric-zero", "The two sides don't cancel; they add."],
    ]),
  // level 9
  short(m(DD, "transfer-many-corners", "transfer", 9, 180, "Give an example of a function that is continuous everywhere but not differentiable at infinitely many points, and explain why."),
    [
      ["example", "A valid example, e.g. $|\\sin x|$ or the distance from $x$ to the nearest integer", 2, true],
      ["why", "Explains the corners (left and right slopes differ) at infinitely many points, e.g. multiples of $\\pi$ or the half-integers", 2, true],
    ]),
  short(m(DD, "transfer-positive-derivative", "transfer", 9, 180, "Prove that if $f'(a) > 0$, then $f(a + h) > f(a)$ for all sufficiently small $h > 0$."),
    [
      ["limit", "The difference quotient tends to $f'(a) > 0$, so it is positive for all small enough $h \\ne 0$", 2, true],
      ["sign", "For $h > 0$, a positive quotient means $f(a + h) - f(a) > 0$", 2, true],
    ]),
  num(m(DD, "transfer-rational-square", "transfer", 9, 90, "Let $f(x) = x^{2}$ for rational $x$ and $f(x) = 0$ for irrational $x$. Find $f'(0)$."), 0),
  mcq(m(DD, "transfer-symmetric-trap", "transfer", 9, 90, "The symmetric quotient $\\frac{f(a + h) - f(a - h)}{2h}$ can have a limit where $f$ is not differentiable. Which is an example?"),
    "$|x|$ at $0$, where the symmetric limit is $0$",
    [
      ["$x^{2}$ at $0$", "symmetric-trap-smooth", "$x^{2}$ is differentiable at $0$."],
      ["$\\frac{1}{x}$ at $0$", "symmetric-trap-undefined", "$f(0)$ isn't even defined; the quotient is $\\frac{1}{h^{2}}$, which blows up."],
      ["$\\sqrt{x}$ at $1$", "symmetric-trap-root", "$\\sqrt{x}$ is differentiable at $1$."],
    ]),
  // level 10
  short(m(DD, "transfer-exponential-equation", "transfer", 10, 180, "Suppose $f(x + y) = f(x)f(y)$ for all $x, y$, $f(0) = 1$ and $f'(0) = k$. Show that $f'(x) = k f(x)$ for every $x$."),
    [
      ["quotient", "Writes $\\frac{f(x + h) - f(x)}{h} = f(x) \\cdot \\frac{f(h) - 1}{h}$", 2, true],
      ["limit", "Recognises $\\frac{f(h) - f(0)}{h} \\to f'(0) = k$, so $f'(x) = k f(x)$", 2, true],
    ]),
  short(m(DD, "transfer-even-odd", "transfer", 10, 180, "Prove from the definition that the derivative of a differentiable even function is odd."),
    [
      ["setup", "Uses $f(-x) = f(x)$ to write $f'(-x) = \\lim_{h \\to 0} \\frac{f(x - h) - f(x)}{h}$", 2, true],
      ["substitute", "Substitutes $k = -h$ to get $-\\lim_{k \\to 0} \\frac{f(x + k) - f(x)}{k} = -f'(x)$", 2, true],
    ]),
  num(m(DD, "transfer-mixed-limit", "transfer", 10, 120, "$f$ is differentiable with $f(2) = 3$ and $f'(2) = 5$. Find $\\lim_{x \\to 2} \\frac{x f(2) - 2 f(x)}{x - 2}$."), -7),
  mcq(m(DD, "transfer-derivative-limit", "transfer", 10, 120, "If $f'(a)$ exists, must $\\lim_{x \\to a} f'(x)$ exist?"),
    "No: $x^{2}\\sin\\left(\\frac{1}{x}\\right)$ (with $f(0) = 0$) has $f'(0) = 0$, but $f'(x)$ oscillates near $0$",
    [
      ["Yes, derivatives are always continuous", "derivlimit-continuous", "Derivatives can be discontinuous (though they can't have jumps)."],
      ["Yes, as long as $f$ is continuous", "derivlimit-f-continuous", "Continuity of $f$ says nothing about the continuity of $f'$."],
      ["No, because a derivative is never continuous", "derivlimit-never", "Most derivatives you meet are continuous."],
    ]),
];

// ---------------------------------------------------------------------------
// differentiation-rules
// ---------------------------------------------------------------------------
const DR = "differentiation-rules";
const differentiationRules: Item[] = [
  // level 1
  mcq(m(DR, "recall-power", "recall", 1, 15, "The power rule says $\\frac{d}{dx} x^{n} =$"),
    "$nx^{n - 1}$",
    [
      ["$x^{n - 1}$", "power-drop-n", "The exponent comes down as a factor."],
      ["$nx^{n}$", "power-keep-exponent", "The exponent decreases by one."],
      ["$\\frac{x^{n + 1}}{n + 1}$", "power-antiderivative", "That's the antiderivative."],
    ]),
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
  mcq(m(DR, "recall-constant", "recall", 1, 15, "The derivative of a constant $c$ is:"),
    "$0$",
    [
      ["$c$", "constant-itself", "A constant doesn't change, so its rate of change is $0$."],
      ["$1$", "constant-one", "That's the derivative of $x$."],
      ["$cx$", "constant-antiderivative", "That's an antiderivative of $c$."],
    ]),
  // level 2
  num(m(DR, "apply-power-at-1", "apply", 2, 20, "Find $\\frac{d}{dx} x^{5}$ at $x = 1$."), 5),
  num(m(DR, "apply-polynomial", "apply", 2, 20, "For $f(x) = 3x^{4} - 2x^{2} + 7$, find $f'(1)$."), 8),
  num(m(DR, "apply-fractional-power", "apply", 2, 20, "For $f(x) = 6x^{1/3}$, find $f'(8)$."), 0.5),
  mcq(m(DR, "apply-negative-power", "apply", 2, 20, "$\\frac{d}{dx} \\frac{1}{x^{3}} =$"),
    "$-3x^{-4}$",
    [
      ["$-3x^{-2}$", "negpower-wrong-exponent", "$x^{-3}$ becomes $x^{-4}$: the exponent goes down by one."],
      ["$\\frac{1}{3x^{2}}$", "negpower-reciprocal", "Differentiate $x^{-3}$; don't differentiate the denominator alone."],
      ["$3x^{-4}$", "negpower-sign", "The exponent $-3$ brings down a negative factor."],
    ]),
  // level 3
  num(m(DR, "apply-product-rule", "apply", 3, 25, "For $f(x) = (x^{2} + 1)(3x - 5)$, find $f'(1)$."), 2),
  num(m(DR, "apply-quotient-at-zero", "apply", 3, 25, "For $f(x) = \\frac{x}{x^{2} + 1}$, find $f'(0)$."), 1),
  num(m(DR, "apply-second-derivative", "apply", 3, 25, "For $f(x) = x^{3} - 6x^{2} + 9x$, find $f''(1)$."), -6),
  mcq(m(DR, "apply-product-form", "apply", 3, 25, "$\\frac{d}{dx}\\left[x^{2} g(x)\\right] =$"),
    "$2x\\,g(x) + x^{2}g'(x)$",
    [
      ["$2x\\,g'(x)$", "productform-naive", "That multiplies the derivatives."],
      ["$x^{2}g'(x)$", "productform-drop", "The derivative of $x^{2}$ contributes too."],
      ["$2x\\,g(x)$", "productform-constant-g", "$g$ isn't constant, so $g'$ appears."],
    ]),
  // level 4
  num(m(DR, "apply-quotient-linear", "apply", 4, 30, "For $f(x) = \\frac{2x + 1}{x - 3}$, find $f'(4)$."), -7),
  num(m(DR, "apply-tangent-intercept", "apply", 4, 30, "Find the $y$-intercept of the tangent line to $y = x^{3} - 2x$ at $x = 2$."), -16),
  num(m(DR, "apply-horizontal-tangent", "apply", 4, 30, "At what $x$ is the tangent to $y = x^{2} - 6x + 5$ horizontal?"), 3),
  mcq(m(DR, "apply-product-values", "apply", 4, 30, "If $f(2) = 3$, $f'(2) = -1$, $g(2) = 4$ and $g'(2) = 5$, then $(fg)'(2) =$"),
    "$11$",
    [
      ["$-5$", "values-naive", "$f'(2)g'(2)$ is not the product rule."],
      ["$19$", "values-sign", "$f'(2)g(2) = -4$, not $+4$."],
      ["$7$", "values-sum", "Use $f'g + fg' = -4 + 15$."],
    ]),
  // level 5
  short(m(DR, "explain-not-product", "explain", 5, 90, "Using $f(x) = g(x) = x$, explain why the derivative of a product is not the product of the derivatives."),
    [
      ["compare", "$(x \\cdot x)' = (x^{2})' = 2x$, while $f'g' = 1 \\cdot 1 = 1$", 2, true],
      ["rule", "The product rule gives $1 \\cdot x + x \\cdot 1 = 2x$, matching the true derivative", 2, true],
    ]),
  mcq(m(DR, "apply-simplify-first", "apply", 5, 40, "The quickest way to differentiate $\\frac{x^{3} + 2x}{x}$ is to:"),
    "Simplify to $x^{2} + 2$ first, giving $2x$",
    [
      ["Use the quotient rule, which is required", "simplify-required", "Simplifying first is valid for $x \\ne 0$ and much faster."],
      ["Differentiate top and bottom: $\\frac{3x^{2} + 2}{1}$", "simplify-lhopital", "That's not how quotients differentiate."],
      ["Simplify to $x^{2} + 2x$", "simplify-algebra", "$\\frac{2x}{x} = 2$, not $2x$."],
    ]),
  mcq(m(DR, "apply-high-derivative", "apply", 5, 40, "If $f$ is a polynomial of degree $5$, then $f^{(6)}$ is:"),
    "$0$",
    [
      ["The constant $5!$ times the leading coefficient", "highderiv-fifth", "That's $f^{(5)}$; one more derivative gives $0$."],
      ["A polynomial of degree $1$", "highderiv-degree", "Six derivatives lower the degree by six."],
      ["Undefined", "highderiv-undefined", "Polynomials can be differentiated forever."],
    ]),
  num(m(DR, "apply-third-derivative", "apply", 5, 40, "For $f(x) = x^{4}$, find $f'''(2)$."), 48),
  // level 6
  short(m(DR, "explain-quotient-from-product", "explain", 6, 120, "Derive the quotient rule from the product rule."),
    [
      ["setup", "Writes $f = q \\cdot g$ with $q = \\frac{f}{g}$ and differentiates: $f' = q'g + qg'$", 2, true],
      ["solve", "Solves $q' = \\frac{f' - qg'}{g} = \\frac{f'g - fg'}{g^{2}}$", 2, true],
    ]),
  num(m(DR, "apply-quotient-rational", "apply", 6, 45, "For $f(x) = \\frac{x^{2}}{x + 1}$, find $f'(1)$."), 0.75),
  num(m(DR, "apply-zero-acceleration", "apply", 6, 45, "A particle has position $s(t) = t^{3} - 6t^{2} + 9t$. At what time $t$ is its acceleration zero?"), 2),
  mcq(m(DR, "apply-second-product", "apply", 6, 45, "$(fg)'' =$"),
    "$f''g + 2f'g' + fg''$",
    [
      ["$f''g + fg''$", "second-product-missing", "The cross term $f'g'$ appears twice."],
      ["$f''g''$", "second-product-naive", "Derivatives of products don't multiply."],
      ["$f''g + f'g' + fg''$", "second-product-once", "Differentiating $f'g + fg'$ produces $f'g'$ twice."],
    ]),
  // level 7
  short(m(DR, "explain-prove-product", "explain", 7, 120, "Prove the product rule from the definition of the derivative."),
    [
      ["add-subtract", "Adds and subtracts $f(x + h)g(x)$ in the numerator of the difference quotient", 2, true],
      ["limits", "Splits into $f(x + h)\\frac{g(x + h) - g(x)}{h} + g(x)\\frac{f(x + h) - f(x)}{h}$ and uses continuity of $f$ to get $fg' + gf'$", 2, true],
    ]),
  num(m(DR, "apply-slope-nine", "apply", 7, 60, "At what positive $x$ does the tangent to $y = x^{3} - 3x$ have slope $9$?"), 2),
  num(m(DR, "apply-quotient-squares", "apply", 7, 60, "For $f(x) = \\frac{x^{2} + 1}{x^{2} - 1}$, find $f'(2)$. Give $3$ decimal places."), -0.889),
  mcq(m(DR, "transfer-parallel-tangent", "transfer", 7, 60, "Which line is tangent to $y = x^{2}$ and parallel to $y = 4x + 1$?"),
    "$y = 4x - 4$",
    [
      ["$y = 4x$", "parallel-origin", "It must touch the parabola at $(2, 4)$."],
      ["$y = 4x + 4$", "parallel-sign", "Through $(2, 4)$ with slope $4$: $y = 4 + 4(x - 2)$."],
      ["$y = 2x$", "parallel-slope", "Parallel to $y = 4x + 1$ means slope $4$."],
    ]),
  // level 8
  short(m(DR, "explain-induction-power", "explain", 8, 150, "Prove the power rule $\\frac{d}{dx} x^{n} = nx^{n - 1}$ for positive integers $n$ by induction, using the product rule."),
    [
      ["base", "Base case $n = 1$: $\\frac{d}{dx} x = 1$", 1, true],
      ["step", "Inductive step: $x^{n + 1} = x \\cdot x^{n}$, so the derivative is $x^{n} + x \\cdot nx^{n - 1} = (n + 1)x^{n}$", 3, true],
    ]),
  num(m(DR, "transfer-tangents-through-point", "transfer", 8, 75, "Two tangent lines to $y = x^{2}$ pass through $(1, -3)$. What is the larger $x$-coordinate of the points of tangency?"), 3),
  num(m(DR, "apply-find-exponent", "apply", 8, 75, "If $f(x) = x^{n}$ and $f'(2) = 80$, find $n$."), 5),
  mcq(m(DR, "apply-triple-product", "apply", 8, 75, "$(fgh)' =$"),
    "$f'gh + fg'h + fgh'$",
    [
      ["$f'g'h'$", "triple-naive", "Derivatives of products don't multiply."],
      ["$f'gh + fg'h$", "triple-missing", "Each factor takes a turn being differentiated."],
      ["$(f'g + fg')h'$", "triple-misgrouped", "Apply the product rule to $(fg) \\cdot h$: $(fg)'h + (fg)h'$."],
    ]),
  // level 9
  short(m(DR, "explain-area-argument", "explain", 9, 180, "Explain the product rule using a rectangle with sides $f(x)$ and $g(x)$. Why does the corner piece not contribute?"),
    [
      ["strips", "Increasing $x$ by $h$ adds strips of area about $\\Delta f \\cdot g$ and $f \\cdot \\Delta g$", 2, true],
      ["corner", "The corner $\\Delta f\\,\\Delta g$ is second order: divided by $h$ it is $\\frac{\\Delta f}{h}\\Delta g \\to f' \\cdot 0 = 0$", 2, true],
    ]),
  short(m(DR, "transfer-polynomial-conditions", "transfer", 9, 180, "Find the quadratic $p(x)$ with $p(1) = 3$, $p'(1) = 1$ and $p''(1) = 4$, and explain how each condition fixes a coefficient."),
    [
      ["form", "Writes $p(x) = a + b(x - 1) + c(x - 1)^{2}$, so $p(1) = a$, $p'(1) = b$, $p''(1) = 2c$", 2, true],
      ["answer", "Gets $p(x) = 3 + (x - 1) + 2(x - 1)^{2}$ (equivalently $2x^{2} - 3x + 4$)", 2, true],
    ]),
  num(m(DR, "transfer-product-roots", "transfer", 9, 90, "For $f(x) = (x - 1)(x - 2)(x - 3)(x - 4)$, find $f'(1)$."), -6),
  mcq(m(DR, "apply-hundredth-derivative", "apply", 9, 90, "If $f(x) = x^{100}$, then $f^{(100)}(x) =$"),
    "$100!$",
    [
      ["$100$", "hundredth-n", "Each differentiation brings down a factor: $100 \\cdot 99 \\cdots 1$."],
      ["$0$", "hundredth-zero", "That's $f^{(101)}$."],
      ["$100x$", "hundredth-linear", "After $100$ derivatives no $x$ remains."],
    ]),
  // level 10
  short(m(DR, "transfer-smooth-join", "transfer", 10, 180, "For which $a$ and $b$ is $f(x) = ax^{2} + b$ for $x \\le 1$ and $f(x) = \\frac{1}{x}$ for $x > 1$ differentiable at $x = 1$?"),
    [
      ["continuity", "Continuity at $1$: $a + b = 1$", 1, true],
      ["slopes", "Matching slopes: $2a = -1$", 1, true],
      ["solve", "Gets $a = -\\frac{1}{2}$, $b = \\frac{3}{2}$", 2, true],
    ]),
  short(m(DR, "transfer-double-root", "transfer", 10, 180, "Show that if $p$ is a polynomial with $p(r) = p'(r) = 0$, then $(x - r)^{2}$ divides $p(x)$."),
    [
      ["factor", "Since $p(r) = 0$, write $p(x) = (x - r)q(x)$ for a polynomial $q$", 1, true],
      ["differentiate", "Then $p'(x) = q(x) + (x - r)q'(x)$, so $p'(r) = q(r) = 0$", 2, true],
      ["conclude", "Hence $(x - r)$ divides $q$, and $(x - r)^{2}$ divides $p$", 1, true],
    ]),
  num(m(DR, "transfer-find-b", "transfer", 10, 120, "$f(x) = x^{3} + ax^{2} + bx$ has a horizontal tangent at $x = 1$ and an inflection point at $x = 2$. Find $b$."), 9),
  mcq(m(DR, "transfer-reciprocal-pair", "transfer", 10, 120, "$f$ and $g$ are differentiable with $f(x)g(x) = 1$ and $f'(x) = 2f(x)$ for all $x$. Then $g'(x) =$"),
    "$-2g(x)$",
    [
      ["$2g(x)$", "reciprocal-sign", "$g = \\frac{1}{f}$, so $g' = -\\frac{f'}{f^{2}} = -\\frac{2}{f}$."],
      ["$-\\frac{2}{g(x)}$", "reciprocal-invert", "$-\\frac{2}{f} = -2g$, since $\\frac{1}{f} = g$."],
      ["$\\frac{g(x)}{2}$", "reciprocal-half", "Differentiating $fg = 1$ gives $f'g + fg' = 0$, so $g' = -2g$."],
    ]),
];

// ---------------------------------------------------------------------------
// chain-rule
// ---------------------------------------------------------------------------
const CR = "chain-rule";
const chainRule: Item[] = [
  // level 1
  mcq(m(CR, "recall-rule", "recall", 1, 15, "The chain rule says $\\frac{d}{dx} f(g(x)) =$"),
    "$f'(g(x))\\,g'(x)$",
    [
      ["$f'(x)\\,g'(x)$", "chain-wrong-point", "$f'$ must be evaluated at $g(x)$, not $x$."],
      ["$f'(g'(x))$", "chain-compose-derivatives", "Derivatives multiply; they don't compose."],
      ["$f(g'(x))$", "chain-inner-only", "The outer function must be differentiated too."],
    ]),
  mcq(m(CR, "recall-rates-multiply", "recall", 1, 15, "In $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$, the rates along the chain:"),
    "Multiply",
    [
      ["Add", "rates-add", "If $u$ moves $3$ times as fast as $x$ and $y$ twice as fast as $u$, $y$ moves $6$ times as fast as $x$."],
      ["Divide", "rates-divide", "They multiply."],
      ["Subtract", "rates-subtract", "They multiply."],
    ]),
  mcq(m(CR, "recall-inner", "recall", 1, 15, "For $y = (3x + 1)^{4}$, the inner function is:"),
    "$3x + 1$",
    [
      ["$u^{4}$", "inner-outer", "That's the outer function."],
      ["$4$", "inner-exponent", "The exponent belongs to the outer function."],
      ["$x$", "inner-x", "The inner function is what the power is applied to."],
    ]),
  mcq(m(CR, "recall-needs-chain", "recall", 1, 15, "Which function needs the chain rule to differentiate?"),
    "$\\sqrt{x^{2} + 1}$",
    [
      ["$x^{2} + 1$", "needs-polynomial", "A polynomial differentiates term by term."],
      ["$3x^{5}$", "needs-monomial", "The power rule with a constant multiple suffices."],
      ["$\\frac{x}{2}$", "needs-linear", "That's a constant times $x$."],
    ]),
  // level 2
  num(m(CR, "apply-linear-cube", "apply", 2, 20, "For $y = (2x + 1)^{3}$, find $y'(0)$."), 6),
  num(m(CR, "apply-square-of-quadratic", "apply", 2, 20, "For $y = (x^{2} + 1)^{2}$, find $y'(1)$."), 8),
  num(m(CR, "apply-root", "apply", 2, 20, "For $y = \\sqrt{x^{2} + 9}$, find $y'(4)$."), 0.8),
  mcq(m(CR, "apply-inner-factor", "apply", 2, 20, "$\\frac{d}{dx}(3x + 1)^{4} =$"),
    "$12(3x + 1)^{3}$",
    [
      ["$4(3x + 1)^{3}$", "inner-factor-missing", "The inner derivative $3$ is missing."],
      ["$12x^{3}$", "inner-factor-lost", "The inner function must stay inside."],
      ["$4 \\cdot 3^{3}$", "inner-factor-differentiate-inner", "Differentiate the outer power, keep the inner function, then multiply by its derivative."],
    ]),
  // level 3
  num(m(CR, "apply-fifth-power", "apply", 3, 25, "For $y = (x^{2} + 3x)^{5}$, find $y'(1)$."), 6400),
  num(m(CR, "apply-reciprocal-quadratic", "apply", 3, 25, "For $y = \\frac{1}{x^{2} + 1}$, find $y'(1)$."), -0.5),
  num(m(CR, "apply-values", "apply", 3, 25, "If $g(1) = 3$, $g'(1) = 4$ and $f'(3) = 2$, find $(f \\circ g)'(1)$."), 8),
  mcq(m(CR, "apply-values-trap", "apply", 3, 25, "Let $h(x) = f(g(x))$ with $g(2) = 5$, $g'(2) = -1$, $f'(2) = 7$ and $f'(5) = 3$. Then $h'(2) =$"),
    "$-3$",
    [
      ["$-7$", "trap-wrong-point", "Evaluate $f'$ at $g(2) = 5$, not at $2$."],
      ["$3$", "trap-drop-inner", "Multiply by $g'(2) = -1$."],
      ["$-21$", "trap-multiply-all", "Only $f'(g(2))$ and $g'(2)$ are multiplied."],
    ]),
  // level 4
  num(m(CR, "apply-product-chain", "apply", 4, 30, "For $y = x^{2}(1 - x)^{3}$, find $y'(2)$."), -16),
  num(m(CR, "apply-nested-root", "apply", 4, 30, "For $y = \\sqrt{1 + \\sqrt{x}}$, find $y'(4)$. Give $4$ decimal places."), 0.0722),
  num(m(CR, "apply-quotient-squared", "apply", 4, 30, "For $y = \\left(\\frac{x + 1}{x - 1}\\right)^{2}$, find $y'(2)$."), -12),
  mcq(m(CR, "apply-f-of-square", "apply", 4, 30, "$\\frac{d}{dx} f(x^{2}) =$"),
    "$2x\\,f'(x^{2})$",
    [
      ["$f'(x^{2})$", "fsq-missing-inner", "Multiply by the derivative of $x^{2}$."],
      ["$f'(2x)$", "fsq-wrong-argument", "$f'$ is evaluated at the inner function $x^{2}$."],
      ["$2x\\,f'(x)$", "fsq-wrong-point", "$f'$ is evaluated at $x^{2}$, not $x$."],
    ]),
  // level 5
  short(m(CR, "explain-why-multiply", "explain", 5, 90, "Explain in terms of rates why the chain rule multiplies derivatives. Use an example."),
    [
      ["rates", "If $u$ changes $g'(x)$ times as fast as $x$ and $y$ changes $f'(u)$ times as fast as $u$, then $y$ changes $f'(u) \\cdot g'(x)$ times as fast as $x$", 3, true],
      ["example", "Gives a concrete example (e.g. unit conversions, gears, or a specific composition)", 1, false],
    ]),
  mcq(m(CR, "apply-leibniz-form", "apply", 5, 40, "If $y = u^{3}$ and $u = 2x + 1$, what is $\\frac{dy}{dx}$ at $x = 1$?"),
    "$54$",
    [
      ["$27$", "leibniz-missing-inner", "Multiply by $\\frac{du}{dx} = 2$."],
      ["$18$", "leibniz-u-wrong", "At $x = 1$, $u = 3$, so $3u^{2} = 27$."],
      ["$6$", "leibniz-x-instead", "Evaluate $3u^{2}$ at $u = 3$, not $3x^{2}$ at $x = 1$."],
    ]),
  mcq(m(CR, "apply-general-power", "apply", 5, 40, "$\\frac{d}{dx}[f(x)]^{n} =$"),
    "$n[f(x)]^{n - 1} f'(x)$",
    [
      ["$n[f(x)]^{n - 1}$", "genpower-missing", "Multiply by the inner derivative $f'(x)$."],
      ["$n[f'(x)]^{n - 1}$", "genpower-replace", "Keep $f$ inside the power; multiply by $f'$."],
      ["$[f'(x)]^{n}$", "genpower-naive", "The power rule applies to the outer function."],
    ]),
  num(m(CR, "apply-three-halves", "apply", 5, 40, "For $f(x) = (x^{2} + 5)^{3/2}$, find $f'(2)$."), 18),
  // level 6
  short(m(CR, "explain-factor", "explain", 6, 120, "Differentiate $y = x^{2}(1 - x)^{3}$ and factor the result completely."),
    [
      ["rules", "Uses the product rule with the chain rule: $2x(1 - x)^{3} - 3x^{2}(1 - x)^{2}$", 2, true],
      ["factor", "Factors to $x(1 - x)^{2}(2 - 5x)$", 2, true],
    ]),
  num(m(CR, "apply-linear-inside", "apply", 6, 45, "If $g(x) = f(3x - 1)$ and $f'(5) = 4$, find $g'(2)$."), 12),
  num(m(CR, "apply-big-product", "apply", 6, 45, "For $f(x) = (2x - 3)^{4}(x^{2} + x + 1)^{5}$, find $f'(1)$."), -729),
  mcq(m(CR, "apply-root-of-f", "apply", 6, 45, "If $h(x) = \\sqrt{f(x)}$, $f(3) = 16$ and $f'(3) = 8$, then $h'(3) =$"),
    "$1$",
    [
      ["$4$", "rootf-value", "That's $h(3)$."],
      ["$2$", "rootf-sqrt-derivative", "$h' = \\frac{f'}{2\\sqrt{f}} = \\frac{8}{8}$."],
      ["$\\frac{1}{8}$", "rootf-invert", "$\\frac{f'}{2\\sqrt{f}}$, not $\\frac{1}{2\\sqrt{f}}$ alone."],
    ]),
  // level 7
  short(m(CR, "explain-odd-even", "explain", 7, 120, "Use the chain rule to show that the derivative of a differentiable odd function is even."),
    [
      ["differentiate", "Differentiates $f(-x) = -f(x)$ to get $-f'(-x) = -f'(x)$", 3, true],
      ["conclude", "So $f'(-x) = f'(x)$: $f'$ is even", 1, true],
    ]),
  num(m(CR, "apply-three-layers", "apply", 7, 60, "For $y = \\left((x^{2} + 1)^{3} + 1\\right)^{2}$, find $y'(1)$."), 432),
  num(m(CR, "apply-self-composition", "apply", 7, 60, "Let $F(x) = f(f(x))$, with $f(1) = 2$, $f(2) = 3$, $f'(1) = 4$ and $f'(2) = 5$. Find $F'(1)$."), 20),
  mcq(m(CR, "apply-flat-inner", "apply", 7, 60, "If $y = f(g(x))$ and $g'(x_0) = 0$, then at $x_0$, $\\frac{dy}{dx}$ is:"),
    "$0$",
    [
      ["$f'(g(x_0))$", "flat-outer-only", "It's multiplied by $g'(x_0) = 0$."],
      ["Undefined", "flat-undefined", "A zero factor makes it $0$, not undefined."],
      ["$1$", "flat-one", "The product is $f'(g(x_0)) \\cdot 0 = 0$."],
    ]),
  // level 8
  short(m(CR, "explain-proof", "explain", 8, 150, "Prove the chain rule at $a$ in the case where $g(a + h) \\ne g(a)$ for all small $h \\ne 0$."),
    [
      ["split", "Writes $\\frac{f(g(a + h)) - f(g(a))}{h} = \\frac{f(g(a + h)) - f(g(a))}{g(a + h) - g(a)} \\cdot \\frac{g(a + h) - g(a)}{h}$", 2, true],
      ["limits", "As $h \\to 0$, $g(a + h) \\to g(a)$ by continuity, so the first factor tends to $f'(g(a))$ and the second to $g'(a)$", 2, true],
    ]),
  num(m(CR, "transfer-functional-equation", "transfer", 8, 75, "$f$ is differentiable with $f(2x) = 3f(x)$ for all $x$ and $f'(1) = 4$. Find $f'(2)$."), 6),
  num(m(CR, "apply-root-sum-power", "apply", 8, 75, "For $y = \\left(x + \\sqrt{x^{2} + 1}\\right)^{3}$, find $y'(0)$."), 3),
  mcq(m(CR, "transfer-backprop", "transfer", 8, 75, "Backpropagation computes the gradient of a neural network's loss by:"),
    "Applying the chain rule layer by layer, from the output back to the inputs",
    [
      ["Applying the quotient rule", "backprop-quotient", "A network is a composition, so the chain rule is the tool."],
      ["Using finite differences for each weight", "backprop-finite", "That would need one evaluation per weight and is only an approximation."],
      ["Using the product rule alone", "backprop-product", "Products appear, but the structure is composition."],
    ]),
  // level 9
  short(m(CR, "transfer-inverse-derivative", "transfer", 9, 180, "If $f(g(x)) = x$, use the chain rule to derive $g'(x) = \\frac{1}{f'(g(x))}$. Apply it to $f(x) = x^{3} + x$ at $x = 2$."),
    [
      ["derive", "Differentiates $f(g(x)) = x$ to get $f'(g(x))g'(x) = 1$", 2, true],
      ["apply", "Notes $g(2) = 1$ (since $f(1) = 2$) and $f'(1) = 4$, so $g'(2) = \\frac{1}{4}$", 2, true],
    ]),
  short(m(CR, "transfer-naive-proof", "transfer", 9, 180, "The quick “proof” $\\frac{\\Delta y}{\\Delta x} = \\frac{\\Delta y}{\\Delta u} \\cdot \\frac{\\Delta u}{\\Delta x}$ has a gap. What is it, and for which kind of inner function does it occur?"),
    [
      ["gap", "$\\Delta u$ can equal $0$ for arbitrarily small $\\Delta x$, so dividing by $\\Delta u$ is invalid", 2, true],
      ["example", "Example: an inner function that keeps returning to its value, such as $g(x) = x^{2}\\sin\\left(\\frac{1}{x}\\right)$ near $0$ (or a constant inner function)", 2, true],
    ]),
  num(m(CR, "transfer-inverse-value", "transfer", 9, 90, "Let $f(x) = x^{5} + 2x + 1$ and $g = f^{-1}$. Find $g'(4)$. Give $3$ decimal places."), 0.143),
  mcq(m(CR, "transfer-even-inner", "transfer", 9, 90, "For any differentiable $f$, let $h(x) = f(x^{2} - 1)$. Then $h'(0)$ is:"),
    "$0$",
    [
      ["$f'(-1)$", "even-inner-outer", "$h'(x) = 2x\\,f'(x^{2} - 1)$, which carries a factor $2x = 0$."],
      ["$f'(0)$", "even-inner-point", "The inner function is $-1$ at $x = 0$, and the factor $2x$ is $0$ anyway."],
      ["$-2f'(-1)$", "even-inner-sign", "The inner derivative at $0$ is $0$, not $-2$."],
    ]),
  // level 10
  short(m(CR, "transfer-abs-composition", "transfer", 10, 180, "Show that $\\frac{d}{dx}|f(x)| = \\frac{f(x)}{|f(x)|}f'(x)$ wherever $f(x) \\ne 0$. What can happen where $f(x) = 0$?"),
    [
      ["derive", "Uses $\\frac{d}{du}|u| = \\frac{u}{|u|}$ for $u \\ne 0$ with the chain rule (or $|f| = \\sqrt{f^{2}}$)", 2, true],
      ["zeros", "At a zero of $f$, $|f|$ may fail to be differentiable (e.g. $|x|$ at $0$ when $f'(0) \\ne 0$), or may be differentiable (e.g. $f = x^{2}$)", 2, true],
    ]),
  short(m(CR, "transfer-ode-derivatives", "transfer", 10, 180, "A function satisfies $g'(x) = g(x)^{2}$ and $g(0) = 1$. Use the chain rule to find $g''(0)$ and $g'''(0)$."),
    [
      ["second", "$g'' = 2g\\,g' = 2g^{3}$, so $g''(0) = 2$", 2, true],
      ["third", "$g''' = 6g^{2}g' = 6g^{4}$, so $g'''(0) = 6$", 2, true],
    ]),
  num(m(CR, "transfer-second-derivative", "transfer", 10, 120, "For $f(x) = (x^{2} + 1)^{10}$, find $f''(0)$."), 20),
  mcq(m(CR, "transfer-log-like", "transfer", 10, 120, "Suppose $f'(x) = \\frac{1}{x}$ for $x > 0$, and $g(x) = f(x^{3})$. Then $g'(x) =$"),
    "$\\frac{3}{x}$",
    [
      ["$\\frac{1}{x^{3}}$", "loglike-missing", "Multiply by the inner derivative $3x^{2}$."],
      ["$\\frac{1}{3x}$", "loglike-invert", "$3x^{2} \\cdot \\frac{1}{x^{3}} = \\frac{3}{x}$."],
      ["$3x^{2}$", "loglike-outer", "Multiply $3x^{2}$ by $f'(x^{3}) = \\frac{1}{x^{3}}$."],
    ]),
];

// ---------------------------------------------------------------------------
// transcendental-derivatives
// ---------------------------------------------------------------------------
const TD = "transcendental-derivatives";
const transcendentalDerivatives: Item[] = [
  // level 1
  mcq(m(TD, "recall-exp", "recall", 1, 15, "$\\frac{d}{dx} e^{x} =$"),
    "$e^{x}$",
    [
      ["$xe^{x - 1}$", "exp-power-rule", "The power rule applies to $x^{n}$, not to $e^{x}$."],
      ["$e^{x - 1}$", "exp-shift", "$e^{x}$ is its own derivative."],
      ["$e$", "exp-constant", "$e^{x}$ is not a constant."],
    ]),
  mcq(m(TD, "recall-log", "recall", 1, 15, "$\\frac{d}{dx} \\ln x =$"),
    "$\\frac{1}{x}$",
    [
      ["$\\frac{\\ln x}{x}$", "log-extra", "No $\\ln x$ remains."],
      ["$e^{x}$", "log-inverse", "That's the inverse function, not the derivative."],
      ["$\\frac{1}{\\ln x}$", "log-reciprocal", "The derivative is the reciprocal of $x$."],
    ]),
  mcq(m(TD, "recall-sin", "recall", 1, 15, "$\\frac{d}{dx} \\sin x =$"),
    "$\\cos x$",
    [
      ["$-\\cos x$", "sin-sign", "The minus sign belongs to the derivative of $\\cos x$."],
      ["$\\sin x$", "sin-same", "Only $e^{x}$ is its own derivative."],
      ["$-\\sin x$", "sin-cos-confusion", "That's the derivative of $\\cos x$."],
    ]),
  mcq(m(TD, "recall-cos", "recall", 1, 15, "$\\frac{d}{dx} \\cos x =$"),
    "$-\\sin x$",
    [
      ["$\\sin x$", "cos-sign", "Cosine decreases on $\\left(0, \\frac{\\pi}{2}\\right)$, so its derivative is negative there."],
      ["$\\cos x$", "cos-same", "Cosine is not its own derivative."],
      ["$-\\cos x$", "cos-second", "That's the second derivative."],
    ]),
  // level 2
  num(m(TD, "apply-exp-3x", "apply", 2, 20, "Find $\\frac{d}{dx} e^{3x}$ at $x = 0$."), 3),
  num(m(TD, "apply-log-quadratic", "apply", 2, 20, "Find $\\frac{d}{dx} \\ln(x^{2} + 1)$ at $x = 1$."), 1),
  num(m(TD, "apply-sin-2x", "apply", 2, 20, "Find $\\frac{d}{dx} \\sin(2x)$ at $x = 0$."), 2),
  mcq(m(TD, "apply-base-3", "apply", 2, 20, "$\\frac{d}{dx} 3^{x} =$"),
    "$3^{x}\\ln 3$",
    [
      ["$x \\cdot 3^{x - 1}$", "base-power-rule", "The power rule needs a variable base and a fixed exponent."],
      ["$3^{x}$", "base-like-e", "Only base $e$ gives itself; other bases add $\\ln a$."],
      ["$\\frac{3^{x}}{\\ln 3}$", "base-divide", "$3^{x} = e^{x\\ln 3}$, so the factor $\\ln 3$ multiplies."],
    ]),
  // level 3
  num(m(TD, "apply-x-exp", "apply", 3, 25, "For $f(x) = xe^{x}$, find $f'(0)$."), 1),
  num(m(TD, "apply-log-3x", "apply", 3, 25, "For $f(x) = \\ln(3x)$, find $f'(2)$."), 0.5),
  num(m(TD, "apply-tan", "apply", 3, 25, "For $f(x) = \\tan x$, find $f'\\left(\\frac{\\pi}{4}\\right)$."), 2),
  mcq(m(TD, "apply-arctan", "apply", 3, 25, "$\\frac{d}{dx} \\arctan x =$"),
    "$\\frac{1}{1 + x^{2}}$",
    [
      ["$\\sec^{2} x$", "arctan-tan", "That's the derivative of $\\tan x$."],
      ["$-\\frac{1}{1 + x^{2}}$", "arctan-sign", "$\\arctan$ is increasing."],
      ["$\\frac{1}{\\sqrt{1 - x^{2}}}$", "arctan-arcsin", "That's the derivative of $\\arcsin x$."],
    ]),
  // level 4
  num(m(TD, "apply-gaussian", "apply", 4, 30, "For $f(x) = e^{-x^{2}}$, find $f'(1)$. Give $3$ decimal places."), -0.736),
  num(m(TD, "apply-x2-log", "apply", 4, 30, "For $f(x) = x^{2}\\ln x$, find $f'(e)$. Give $3$ decimal places."), 8.155),
  num(m(TD, "apply-sin-squared", "apply", 4, 30, "For $f(x) = \\sin^{2} x$, find $f'\\left(\\frac{\\pi}{4}\\right)$."), 1),
  mcq(m(TD, "apply-log-abs", "apply", 4, 30, "For $x < 0$, $\\frac{d}{dx} \\ln|x| =$"),
    "$\\frac{1}{x}$",
    [
      ["$-\\frac{1}{x}$", "logabs-sign", "$\\ln|x| = \\ln(-x)$ has derivative $\\frac{-1}{-x} = \\frac{1}{x}$."],
      ["$\\frac{1}{|x|}$", "logabs-abs", "That would be positive, but $\\ln|x|$ decreases for $x < 0$."],
      ["It is undefined", "logabs-undefined", "$\\ln|x|$ is defined and differentiable for $x < 0$."],
    ]),
  // level 5
  short(m(TD, "explain-exp-own-derivative", "explain", 5, 90, "Explain why $e^{x}$ is its own derivative, starting from $\\lim_{h \\to 0} \\frac{e^{h} - 1}{h} = 1$."),
    [
      ["factor", "Writes $\\frac{e^{x + h} - e^{x}}{h} = e^{x} \\cdot \\frac{e^{h} - 1}{h}$", 2, true],
      ["limit", "The second factor tends to $1$, so the derivative is $e^{x}$", 2, true],
    ]),
  mcq(m(TD, "apply-own-derivative", "apply", 5, 40, "Which function equals its own derivative and has value $5$ at $x = 0$?"),
    "$5e^{x}$",
    [
      ["$e^{5x}$", "own-rate", "Its derivative is $5e^{5x}$, and its value at $0$ is $1$."],
      ["$e^{x} + 4$", "own-shift", "Its derivative is $e^{x}$, which isn't $e^{x} + 4$."],
      ["$5^{x}$", "own-base", "Its derivative is $5^{x}\\ln 5$."],
    ]),
  mcq(m(TD, "apply-x-to-x", "apply", 5, 40, "$\\frac{d}{dx} x^{x}$ (for $x > 0$) is:"),
    "$x^{x}(\\ln x + 1)$",
    [
      ["$x \\cdot x^{x - 1}$", "xx-power", "The power rule needs a fixed exponent."],
      ["$x^{x}\\ln x$", "xx-exponential", "Treating the base as fixed misses the $+1$."],
      ["$x^{x}$", "xx-same", "Use logarithmic differentiation: $\\ln y = x\\ln x$."],
    ]),
  num(m(TD, "apply-log-base-2", "apply", 5, 40, "For $f(x) = \\log_{2} x$, find $f'(1)$. Give $3$ decimal places."), 1.443),
  // level 6
  short(m(TD, "explain-derive-log", "explain", 6, 120, "Derive $\\frac{d}{dx} \\ln x = \\frac{1}{x}$ from the identity $e^{\\ln x} = x$."),
    [
      ["differentiate", "Differentiates both sides with the chain rule: $e^{\\ln x} \\cdot \\frac{d}{dx}\\ln x = 1$", 2, true],
      ["simplify", "Uses $e^{\\ln x} = x$ to get $\\frac{d}{dx}\\ln x = \\frac{1}{x}$", 2, true],
    ]),
  num(m(TD, "apply-arcsin", "apply", 6, 45, "Find $\\frac{d}{dx} \\arcsin x$ at $x = 0.6$."), 1.25),
  num(m(TD, "apply-exp-sin-product", "apply", 6, 45, "For $f(x) = e^{x}\\sin x$, find $f'\\left(\\frac{\\pi}{2}\\right)$. Give $2$ decimal places."), 4.81),
  mcq(m(TD, "apply-sin-cycle", "apply", 6, 45, "The successive derivatives of $\\sin x$ repeat with period:"),
    "$4$",
    [
      ["$2$", "cycle-two", "After two derivatives you get $-\\sin x$, not $\\sin x$."],
      ["$1$", "cycle-one", "$\\sin x$ is not its own derivative."],
      ["They never repeat", "cycle-never", "$\\sin \\to \\cos \\to -\\sin \\to -\\cos \\to \\sin$."],
    ]),
  // level 7
  short(m(TD, "explain-tan", "explain", 7, 120, "Show that $\\frac{d}{dx} \\tan x = \\sec^{2} x$."),
    [
      ["quotient", "Writes $\\tan x = \\frac{\\sin x}{\\cos x}$ and applies the quotient rule: $\\frac{\\cos^{2} x + \\sin^{2} x}{\\cos^{2} x}$", 2, true],
      ["identity", "Uses $\\sin^{2} x + \\cos^{2} x = 1$ to get $\\frac{1}{\\cos^{2} x} = \\sec^{2} x$", 2, true],
    ]),
  num(m(TD, "apply-log-diff-sin", "apply", 7, 60, "For $y = x^{\\sin x}$ ($x > 0$), find $y'\\left(\\frac{\\pi}{2}\\right)$."), 1),
  num(m(TD, "apply-log-derivative", "apply", 7, 60, "For $y = \\frac{(x^{2} + 1)^{3}(x - 1)^{2}}{x^{4}}$, find $\\frac{y'}{y}$ at $x = 2$."), 2.4),
  mcq(m(TD, "apply-growth-equation", "apply", 7, 60, "If $y' = 3y$ and $y(0) = 2$, then $y =$"),
    "$2e^{3x}$",
    [
      ["$3e^{2x}$", "growth-swap", "The rate goes in the exponent; the initial value multiplies."],
      ["$e^{3x} + 1$", "growth-shift", "Its derivative is $3e^{3x}$, not $3(e^{3x} + 1)$."],
      ["$2 + 3x$", "growth-linear", "That has constant slope $3$, not slope $3y$."],
    ]),
  // level 8
  short(m(TD, "explain-arcsin", "explain", 8, 150, "Derive $\\frac{d}{dx} \\arcsin x = \\frac{1}{\\sqrt{1 - x^{2}}}$ and explain why the positive square root is correct."),
    [
      ["implicit", "With $y = \\arcsin x$, $\\sin y = x$, so $\\cos y \\cdot y' = 1$", 2, true],
      ["root", "$\\cos y = \\sqrt{1 - x^{2}}$ with the positive root because $y \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$, where $\\cos y \\ge 0$", 2, true],
    ]),
  num(m(TD, "apply-inverse-exp-plus-x", "apply", 8, 75, "Let $f(x) = e^{x} + x$ and $g = f^{-1}$. Find $g'(1)$."), 0.5),
  num(m(TD, "transfer-tangent-through-origin", "transfer", 8, 75, "The tangent line to $y = \\ln x$ at $x = a$ passes through the origin. Find $a$. Give $3$ decimal places."), 2.718),
  mcq(m(TD, "apply-degrees", "apply", 8, 75, "If $x$ is measured in degrees, $\\frac{d}{dx} \\sin(x^{\\circ}) =$"),
    "$\\frac{\\pi}{180}\\cos(x^{\\circ})$",
    [
      ["$\\cos(x^{\\circ})$", "degrees-ignore", "$\\sin(x^{\\circ}) = \\sin\\left(\\frac{\\pi x}{180}\\right)$, so the chain rule adds a factor."],
      ["$\\frac{180}{\\pi}\\cos(x^{\\circ})$", "degrees-invert", "The inner derivative is $\\frac{\\pi}{180}$."],
      ["$-\\cos(x^{\\circ})$", "degrees-sign", "There's no sign change."],
    ]),
  // level 9
  short(m(TD, "explain-general-base", "explain", 9, 180, "Prove that $\\frac{d}{dx} a^{x} = a^{x}\\ln a$ for $a > 0$."),
    [
      ["rewrite", "Writes $a^{x} = e^{x\\ln a}$", 2, true],
      ["chain", "The chain rule gives $e^{x\\ln a} \\cdot \\ln a = a^{x}\\ln a$", 2, true],
    ]),
  short(m(TD, "explain-log-differentiation", "explain", 9, 180, "Why does logarithmic differentiation handle $y = x^{x}$ when neither the power rule nor the exponential rule applies? Carry it out."),
    [
      ["why", "The base and exponent both vary; taking $\\ln$ turns the exponent into a product, $\\ln y = x\\ln x$", 2, true],
      ["carry-out", "Differentiates implicitly: $\\frac{y'}{y} = \\ln x + 1$, so $y' = x^{x}(\\ln x + 1)$", 2, true],
    ]),
  num(m(TD, "apply-log-sec-tan", "apply", 9, 90, "For $f(x) = \\ln(\\sec x + \\tan x)$, find $f'\\left(\\frac{\\pi}{4}\\right)$. Give $3$ decimal places."), 1.414),
  mcq(m(TD, "transfer-arctan-reciprocal", "transfer", 9, 90, "For $x > 0$, $\\frac{d}{dx} \\arctan\\left(\\frac{1}{x}\\right)$ equals:"),
    "$-\\frac{1}{1 + x^{2}}$, so $\\arctan x + \\arctan\\frac{1}{x}$ is constant",
    [
      ["$\\frac{1}{1 + x^{2}}$", "arctanrec-sign", "The inner derivative $-\\frac{1}{x^{2}}$ brings a minus sign."],
      ["$-\\frac{1}{x^{2}}$", "arctanrec-inner-only", "Multiply by the outer derivative $\\frac{1}{1 + x^{-2}}$."],
      ["$\\frac{1}{x^{2} + x^{-2}}$", "arctanrec-no-inner", "Missing the chain-rule factor and its sign."],
    ]),
  // level 10
  short(m(TD, "transfer-damped-oscillation", "transfer", 10, 180, "Show that $y = e^{-x}(A\\cos x + B\\sin x)$ satisfies $y'' + 2y' + 2y = 0$ for all constants $A$ and $B$."),
    [
      ["first", "Computes $y' = e^{-x}\\left((B - A)\\cos x - (A + B)\\sin x\\right)$", 2, true],
      ["second", "Computes $y'' = e^{-x}(-2B\\cos x + 2A\\sin x)$ and checks the combination is $0$", 2, true],
    ]),
  short(m(TD, "transfer-derive-sin", "transfer", 10, 180, "Using only $\\lim_{h \\to 0} \\frac{\\sin h}{h} = 1$ and $\\lim_{h \\to 0} \\frac{\\cos h - 1}{h} = 0$, derive $\\frac{d}{dx}\\sin x = \\cos x$."),
    [
      ["addition", "Uses $\\sin(x + h) = \\sin x\\cos h + \\cos x\\sin h$", 2, true],
      ["split", "Splits the quotient into $\\sin x \\cdot \\frac{\\cos h - 1}{h} + \\cos x \\cdot \\frac{\\sin h}{h} \\to \\cos x$", 2, true],
    ]),
  num(m(TD, "transfer-min-x-to-x", "transfer", 10, 120, "At what $x > 0$ is the derivative of $x^{x}$ equal to $0$? Give $3$ decimal places."), 0.368),
  mcq(m(TD, "transfer-nth-derivative", "transfer", 10, 120, "The $n$th derivative of $xe^{x}$ is:"),
    "$(x + n)e^{x}$",
    [
      ["$nxe^{x}$", "nth-multiply", "Each derivative adds one $e^{x}$, it doesn't multiply."],
      ["$xe^{x} + e^{x}$", "nth-first", "That's only the first derivative."],
      ["$(x + 1)^{n}e^{x}$", "nth-power", "The count grows linearly: $(x + 1)e^{x}$, $(x + 2)e^{x}$, …"],
    ]),
];

// ---------------------------------------------------------------------------
// implicit-differentiation
// ---------------------------------------------------------------------------
const ID = "implicit-differentiation";
const implicitDifferentiation: Item[] = [
  // level 1
  mcq(m(ID, "recall-y-squared", "recall", 1, 15, "In implicit differentiation with respect to $x$, $\\frac{d}{dx}(y^{2}) =$"),
    "$2y\\frac{dy}{dx}$",
    [
      ["$2y$", "ysq-no-chain", "$y$ depends on $x$, so the chain rule adds $\\frac{dy}{dx}$."],
      ["$2x$", "ysq-swap", "Differentiate $y^{2}$, not $x^{2}$."],
      ["$y^{2}\\frac{dy}{dx}$", "ysq-no-power", "The power rule still brings down the $2$."],
    ]),
  mcq(m(ID, "recall-xy", "recall", 1, 15, "$\\frac{d}{dx}(xy) =$"),
    "$y + x\\frac{dy}{dx}$",
    [
      ["$\\frac{dy}{dx}$", "xy-no-product", "$xy$ is a product: use the product rule."],
      ["$x + y\\frac{dy}{dx}$", "xy-swapped", "Differentiate $x$ to $1$ (times $y$) and $y$ to $\\frac{dy}{dx}$ (times $x$)."],
      ["$y\\frac{dy}{dx}$", "xy-mixed", "That drops the $y \\cdot 1$ term."],
    ]),
  mcq(m(ID, "recall-related-rates", "recall", 1, 15, "A related-rates problem:"),
    "Links the rates of change of quantities that are tied together by an equation",
    [
      ["Finds where a function is zero", "related-roots", "That's root finding."],
      ["Computes an area", "related-area", "That's integration."],
      ["Requires solving for $y$ explicitly first", "related-explicit", "Implicit differentiation avoids that."],
    ]),
  mcq(m(ID, "recall-when-substitute", "recall", 1, 15, "In a related-rates problem, when should the values for the given instant be substituted?"),
    "After differentiating",
    [
      ["Before differentiating", "substitute-early", "That freezes changing quantities into constants with zero rate."],
      ["Never", "substitute-never", "You need the values to get a number."],
      ["It doesn't matter", "substitute-any", "Substituting first gives the wrong derivative."],
    ]),
  // level 2
  num(m(ID, "apply-circle-slope", "apply", 2, 20, "Find $\\frac{dy}{dx}$ on $x^{2} + y^{2} = 25$ at $(3, 4)$."), -0.75),
  num(m(ID, "apply-hyperbola-slope", "apply", 2, 20, "Find $\\frac{dy}{dx}$ on $xy = 6$ at $(2, 3)$."), -1.5),
  num(m(ID, "apply-circle-rate", "apply", 2, 20, "A point moves on $x^{2} + y^{2} = 25$. At $(3, 4)$, $\\frac{dx}{dt} = 3$. Find $\\frac{dy}{dt}$."), -2.25),
  mcq(m(ID, "apply-circle-formula", "apply", 2, 20, "On the circle $x^{2} + y^{2} = r^{2}$, $\\frac{dy}{dx} =$"),
    "$-\\frac{x}{y}$",
    [
      ["$\\frac{x}{y}$", "circle-sign", "$2x + 2yy' = 0$ gives a minus sign."],
      ["$-\\frac{y}{x}$", "circle-inverted", "Solve $2x + 2yy' = 0$ for $y'$."],
      ["$2x$", "circle-explicit", "That ignores the $y$ term."],
    ]),
  // level 3
  num(m(ID, "apply-area-rate", "apply", 3, 25, "A circle's radius grows at $2$ cm/s. How fast is its area growing when the radius is $5$ cm (cm²/s)? Give $2$ decimal places."), 62.83),
  num(m(ID, "apply-cubic-implicit", "apply", 3, 25, "Find $\\frac{dy}{dx}$ on $y^{3} + x = 9$ at $(1, 2)$. Give $4$ decimal places."), -0.0833),
  num(m(ID, "apply-ellipse-slope", "apply", 3, 25, "Find $\\frac{dy}{dx}$ on $x^{2} + xy + y^{2} = 7$ at $(1, 2)$."), -0.8),
  mcq(m(ID, "apply-square-area", "apply", 3, 25, "A square's side grows at $3$ cm/s. When the side is $10$ cm, the area grows at:"),
    "$60$ cm²/s",
    [
      ["$9$ cm²/s", "square-rate-squared", "$\\frac{dA}{dt} = 2s\\frac{ds}{dt}$, not $\\left(\\frac{ds}{dt}\\right)^{2}$."],
      ["$30$ cm²/s", "square-missing-2", "The power rule gives $2s$."],
      ["$100$ cm²/s", "square-area", "That's the area, not its rate."],
    ]),
  // level 4
  num(m(ID, "apply-ladder", "apply", 4, 30, "A $13$ m ladder leans on a wall. Its foot slides away at $2$ m/s. How fast is the top moving (in m/s, negative if falling) when the foot is $5$ m from the wall? Give $3$ decimal places."), -0.833),
  num(m(ID, "apply-folium-like", "apply", 4, 30, "Find $\\frac{dy}{dx}$ on $x^{3} + xy + y^{3} = 3$ at $(1, 1)$."), -1),
  num(m(ID, "apply-sphere-radius-rate", "apply", 4, 30, "Air is pumped into a sphere at $100$ cm³/s. How fast is the radius increasing when it is $5$ cm (cm/s)? Give $3$ decimal places."), 0.318),
  mcq(m(ID, "apply-tangent-circle", "apply", 4, 30, "The tangent line to $x^{2} + y^{2} = 25$ at $(3, 4)$ is:"),
    "$3x + 4y = 25$",
    [
      ["$4x + 3y = 25$", "tangentcircle-swap", "That line doesn't pass through $(3, 4)$."],
      ["$y = -\\frac{3}{4}x$", "tangentcircle-origin", "That has the right slope but goes through the origin."],
      ["$3x - 4y = 25$", "tangentcircle-sign", "The slope is $-\\frac{3}{4}$."],
    ]),
  // level 5
  short(m(ID, "explain-chain-factor", "explain", 5, 90, "Why must $\\frac{dy}{dx}$ appear when differentiating $y^{2}$ with respect to $x$?"),
    [
      ["function", "$y$ is (implicitly) a function of $x$, so $y^{2}$ is a composition", 2, true],
      ["chain", "The chain rule gives $\\frac{d}{dx}y^{2} = 2y \\cdot \\frac{dy}{dx}$", 2, true],
    ]),
  mcq(m(ID, "apply-vertical-tangent", "apply", 5, 40, "Where does the circle $x^{2} + y^{2} = 25$ have vertical tangents?"),
    "At $(\\pm 5, 0)$",
    [
      ["At $(0, \\pm 5)$", "vertical-horizontal", "Those are the horizontal tangents."],
      ["At $(3, 4)$", "vertical-point", "The slope there is $-\\frac{3}{4}$."],
      ["Nowhere", "vertical-none", "$-\\frac{x}{y}$ blows up where $y = 0$."],
    ]),
  mcq(m(ID, "apply-balloon", "apply", 5, 40, "Air is pumped into a spherical balloon at a constant rate. As it grows, its radius increases:"),
    "More and more slowly",
    [
      ["At a constant rate", "balloon-constant", "$\\frac{dr}{dt} = \\frac{1}{4\\pi r^{2}}\\frac{dV}{dt}$ shrinks as $r$ grows."],
      ["Faster and faster", "balloon-faster", "The same volume spreads over a larger surface."],
      ["At the same rate as the volume", "balloon-same", "Volume and radius have different units and rates."],
    ]),
  num(m(ID, "apply-second-implicit", "apply", 5, 40, "Find $\\frac{d^{2}y}{dx^{2}}$ on $x^{2} + y^{2} = 25$ at $(3, 4)$. Give $4$ decimal places."), -0.3906),
  // level 6
  short(m(ID, "explain-cone", "explain", 6, 120, "Water flows at $2$ cm³/s into an inverted cone whose height is twice its radius. Find how fast the depth is rising when it is $4$ cm deep, and explain why similar triangles are needed."),
    [
      ["eliminate", "Uses similar triangles, $r = \\frac{h}{2}$, to write $V = \\frac{\\pi h^{3}}{12}$ in terms of $h$ alone", 2, true],
      ["answer", "Differentiates: $\\frac{dV}{dt} = \\frac{\\pi h^{2}}{4}\\frac{dh}{dt}$, so $\\frac{dh}{dt} = \\frac{1}{2\\pi} \\approx 0.159$ cm/s", 2, true],
    ]),
  num(m(ID, "apply-shadow-length", "apply", 6, 45, "A $6$ ft person walks away from a $15$ ft lamppost at $5$ ft/s. How fast is their shadow lengthening (ft/s)? Give $2$ decimal places."), 3.33),
  num(m(ID, "apply-shadow-tip", "apply", 6, 45, "In the same setting (a $6$ ft person walking at $5$ ft/s from a $15$ ft lamppost), how fast is the tip of the shadow moving away from the post (ft/s)? Give $2$ decimal places."), 8.33),
  mcq(m(ID, "apply-two-cars", "apply", 6, 45, "Two cars leave an intersection at the same time, one north at $30$ mph and one east at $40$ mph. The distance between them grows at:"),
    "$50$ mph, at every moment",
    [
      ["$70$ mph", "cars-add", "The speeds are perpendicular; they combine by Pythagoras."],
      ["$10$ mph", "cars-subtract", "Perpendicular rates don't subtract."],
      ["A rate that changes over time", "cars-varies", "The distance is $50t$, which grows at a constant rate."],
    ]),
  // level 7
  short(m(ID, "explain-radar", "explain", 7, 120, "A plane flies horizontally at altitude $6$ km and $500$ km/h, passing directly over a radar station. How fast is its distance from the station increasing when that distance is $10$ km? Explain each step."),
    [
      ["relation", "Sets up $D^{2} = x^{2} + 36$ and finds $x = 8$ when $D = 10$", 2, true],
      ["rate", "Differentiates: $D\\frac{dD}{dt} = x\\frac{dx}{dt}$, so $\\frac{dD}{dt} = \\frac{8}{10} \\cdot 500 = 400$ km/h", 2, true],
    ]),
  num(m(ID, "apply-mixed-implicit", "apply", 7, 60, "Find $\\frac{dy}{dx}$ on $x^{2}y + y^{3} = 10$ at $(3, 1)$."), -0.5),
  num(m(ID, "apply-rocket-angle", "apply", 7, 60, "A rocket rises vertically at $300$ m/s, watched from $4{,}000$ m away. How fast is the angle of elevation increasing (rad/s) when the rocket is $3{,}000$ m high? Give $3$ decimal places."), 0.048),
  mcq(m(ID, "apply-cube-root-implicit", "apply", 7, 60, "Differentiating $y^{3} = x$ implicitly gives:"),
    "$\\frac{dy}{dx} = \\frac{1}{3y^{2}} = \\frac{1}{3}x^{-2/3}$",
    [
      ["$\\frac{dy}{dx} = 3y^{2}$", "cuberoot-inverse", "That's $\\frac{dx}{dy}$."],
      ["$\\frac{dy}{dx} = \\frac{1}{3x^{2}}$", "cuberoot-wrong-variable", "Solve $3y^{2}y' = 1$ for $y'$, in terms of $y$."],
      ["$\\frac{dy}{dx} = \\frac{x^{2/3}}{3}$", "cuberoot-exponent", "$y^{2} = x^{2/3}$ sits in the denominator."],
    ]),
  // level 8
  short(m(ID, "transfer-orthogonal", "transfer", 8, 150, "Show that the curves $x^{2} - y^{2} = a$ and $xy = b$ (with $a, b \\ne 0$) cross at right angles wherever they meet."),
    [
      ["slopes", "Finds the slopes: $\\frac{x}{y}$ on the first curve and $-\\frac{y}{x}$ on the second", 2, true],
      ["product", "Their product is $-1$, so the tangent lines are perpendicular", 2, true],
    ]),
  num(m(ID, "apply-folium", "apply", 8, 75, "Find the slope of the folium $x^{3} + y^{3} = 6xy$ at $(3, 3)$."), -1),
  num(m(ID, "apply-sand-cone", "apply", 8, 75, "Sand pours at $10$ m³/min, forming a cone whose height equals its radius. How fast is the height rising when it is $5$ m (m/min)? Give $3$ decimal places."), 0.127),
  mcq(m(ID, "explain-why-y-appears", "explain", 8, 75, "On $x^{2} + y^{2} = 25$, why does $\\frac{dy}{dx} = -\\frac{x}{y}$ involve $y$ as well as $x$?"),
    "Each $x$ can correspond to two points (such as $(3, 4)$ and $(3, -4)$) with different slopes",
    [
      ["Implicit differentiation is only approximate", "why-y-approximate", "It's exact."],
      ["The answer must always be rewritten without $y$", "why-y-eliminate", "Leaving $y$ in is correct and often necessary."],
      ["It's a mistake; the slope depends only on $x$", "why-y-mistake", "$(3, 4)$ and $(3, -4)$ have slopes $-\\frac{3}{4}$ and $\\frac{3}{4}$."],
    ]),
  // level 9
  short(m(ID, "transfer-rational-power", "transfer", 9, 180, "Use implicit differentiation to prove $\\frac{d}{dx}x^{p/q} = \\frac{p}{q}x^{p/q - 1}$ for integers $p$, $q$ (with $q > 0$, $x > 0$)."),
    [
      ["setup", "Sets $y = x^{p/q}$, so $y^{q} = x^{p}$, and differentiates: $qy^{q - 1}y' = px^{p - 1}$", 2, true],
      ["simplify", "Solves $y' = \\frac{p}{q}\\frac{x^{p - 1}}{y^{q - 1}}$ and simplifies using $y^{q - 1} = x^{p - p/q}$", 2, true],
    ]),
  short(m(ID, "transfer-kite", "transfer", 9, 180, "A kite is $100$ m high and drifts horizontally away at $8$ m/s. How fast must string be let out when $200$ m of string is out? Explain."),
    [
      ["relation", "Uses $s^{2} = x^{2} + 100^{2}$, giving $x = \\sqrt{30{,}000} \\approx 173.2$ m when $s = 200$", 2, true],
      ["rate", "$\\frac{ds}{dt} = \\frac{x}{s}\\frac{dx}{dt} \\approx \\frac{173.2}{200} \\cdot 8 \\approx 6.93$ m/s", 2, true],
    ]),
  num(m(ID, "apply-ellipse-particle", "apply", 9, 90, "A particle moves on $\\frac{x^{2}}{4} + \\frac{y^{2}}{9} = 1$ with $\\frac{dx}{dt} = 1$. Find $\\frac{dy}{dt}$ at $\\left(1, \\frac{3\\sqrt{3}}{2}\\right)$. Give $3$ decimal places."), -0.866),
  mcq(m(ID, "transfer-ellipse-tangent", "transfer", 9, 90, "The tangent line to $\\frac{x^{2}}{a^{2}} + \\frac{y^{2}}{b^{2}} = 1$ at the point $(x_0, y_0)$ on it is:"),
    "$\\frac{x x_0}{a^{2}} + \\frac{y y_0}{b^{2}} = 1$",
    [
      ["$\\frac{x}{x_0} + \\frac{y}{y_0} = 1$", "ellipsetan-intercepts", "That line's intercepts are $x_0$ and $y_0$; its slope is wrong."],
      ["$x x_0 + y y_0 = 1$", "ellipsetan-circle", "That's only right for the unit circle."],
      ["$\\frac{x - x_0}{a^{2}} + \\frac{y - y_0}{b^{2}} = 0$", "ellipsetan-normal", "The coefficients must be $\\frac{x_0}{a^{2}}$ and $\\frac{y_0}{b^{2}}$."],
    ]),
  // level 10
  short(m(ID, "transfer-lighthouse", "transfer", 10, 180, "A lighthouse $1$ km off a straight shore turns at $2$ revolutions per minute. How fast does its beam move along the shore at a point $2$ km from the nearest point of the shore? Explain."),
    [
      ["relation", "Sets up $x = \\tan\\theta$ (in km) and differentiates: $\\frac{dx}{dt} = \\sec^{2}\\theta\\,\\frac{d\\theta}{dt}$", 2, true],
      ["values", "Uses $\\frac{d\\theta}{dt} = 4\\pi$ rad/min and $\\sec^{2}\\theta = 1 + x^{2} = 5$ to get $20\\pi \\approx 62.8$ km/min", 2, true],
    ]),
  short(m(ID, "transfer-horizontal-points", "transfer", 10, 180, "Find the points on $x^{2} - xy + y^{2} = 3$ where the tangent line is horizontal."),
    [
      ["slope", "Differentiates to $y' = \\frac{y - 2x}{2y - x}$; horizontal means $y = 2x$", 2, true],
      ["points", "Substitutes into the curve: $3x^{2} = 3$, giving $(1, 2)$ and $(-1, -2)$", 2, true],
    ]),
  num(m(ID, "transfer-bowl", "transfer", 10, 120, "Water drains from a hemispherical bowl of radius $10$ cm at $5$ cm³/s. The volume at depth $h$ is $V = \\frac{\\pi h^{2}(30 - h)}{3}$. Find $\\frac{dh}{dt}$ (cm/s) when $h = 5$ cm. Give $4$ decimal places."), -0.0212),
  mcq(m(ID, "transfer-cusp", "transfer", 10, 120, "On the curve $y^{2} = x^{3}$, implicit differentiation gives $\\frac{dy}{dx} = \\frac{3x^{2}}{2y}$. At the origin this formula:"),
    "Breaks down as $\\frac{0}{0}$: the origin is a cusp, where the branches $y = \\pm x^{3/2}$ meet",
    [
      ["Gives the slope once $(0, 0)$ is substituted", "cusp-substitute", "Substituting gives $\\frac{0}{0}$, which is not a slope."],
      ["Gives slope $\\frac{3}{2}$", "cusp-coefficients", "Coefficients alone don't give a slope."],
      ["Shows the tangent is vertical", "cusp-vertical", "A zero denominator alone would suggest that, but here the numerator vanishes too."],
    ]),
];

export const calc02Items: Item[] = [
  ...derivativeDefinition,
  ...differentiationRules,
  ...chainRule,
  ...transcendentalDerivatives,
  ...implicitDifferentiation,
];
