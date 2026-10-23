import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./calc-shared";

/**
 * Calculus course, part 9: derivatives of exponential, logarithmic and
 * trigonometric functions, and of inverse functions (`transcendental-derivatives`,
 * narrowed; its on-topic items keep their slugs). Forty questions per lesson,
 * four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// exponential-derivatives
// ---------------------------------------------------------------------------
const EX = "exponential-derivatives";
const exponential: Item[] = [
  // level 1
  mcq(m(EX, "recall-exp", "recall", 1, 15, "$\\frac{d}{dx} e^{x} =$"),
    "$e^{x}$",
    [
      ["$xe^{x - 1}$", "exp-power-rule", "The power rule applies to $x^{n}$, not to $e^{x}$."],
      ["$e^{x - 1}$", "exp-shift", "$e^{x}$ is its own derivative."],
      ["$e$", "exp-constant", "$e^{x}$ is not a constant."],
    ]),
  mcq(m(EX, "recall-base", "recall", 1, 15, "For $a > 0$, $\\frac{d}{dx} a^{x} =$"),
    "$a^{x}\\ln a$",
    [
      ["$xa^{x - 1}$", "base-power-rule", "The power rule needs a fixed exponent."],
      ["$a^{x}$", "base-like-e", "Only base $e$ gives itself; other bases add $\\ln a$."],
      ["$\\frac{a^{x}}{\\ln a}$", "base-divide", "$a^{x} = e^{x\\ln a}$, so the factor $\\ln a$ multiplies."],
    ]),
  mcq(m(EX, "recall-e-definition", "recall", 1, 15, "The number $e$ is the base $a$ for which:"),
    "The slope of $a^{x}$ at $x = 0$ is exactly $1$",
    [
      ["$a^{x}$ passes through $(0, 1)$", "edef-intercept", "Every exponential $a^{x}$ passes through $(0, 1)$."],
      ["$a^{x}$ grows fastest", "edef-fastest", "Larger bases grow faster than $e^{x}$."],
      ["$a^{1} = 1$", "edef-value", "That would make $a = 1$."],
    ]),
  mcq(m(EX, "recall-growth-equation", "recall", 1, 15, "The differentiable solutions of $y' = ky$ are:"),
    "$y = Ce^{kx}$",
    [
      ["$y = kx + C$", "growth-linear", "That has constant slope $k$, not slope $ky$."],
      ["$y = Ce^{x} + k$", "growth-shift", "Its derivative is $Ce^{x}$, not $k$ times itself."],
      ["$y = x^{k}$", "growth-power", "$(x^{k})' = kx^{k - 1}$, not $kx^{k}$."],
    ]),
  // level 2
  num(m(EX, "apply-exp-3x", "apply", 2, 20, "Find $\\frac{d}{dx} e^{3x}$ at $x = 0$."), 3),
  num(m(EX, "apply-multiple", "apply", 2, 20, "Find $\\frac{d}{dx} 5e^{x}$ at $x = 0$."), 5),
  num(m(EX, "apply-shifted", "apply", 2, 20, "Find $\\frac{d}{dx} e^{x + 2}$ at $x = -2$."), 1),
  mcq(m(EX, "apply-base-3", "apply", 2, 20, "$\\frac{d}{dx} 3^{x} =$"),
    "$3^{x}\\ln 3$",
    [
      ["$x \\cdot 3^{x - 1}$", "base3-power-rule", "The power rule needs a variable base and a fixed exponent."],
      ["$3^{x}$", "base3-like-e", "Only base $e$ gives itself."],
      ["$\\frac{3^{x}}{\\ln 3}$", "base3-divide", "$3^{x} = e^{x\\ln 3}$, so $\\ln 3$ multiplies."],
    ]),
  // level 3
  num(m(EX, "apply-x-exp", "apply", 3, 25, "For $f(x) = xe^{x}$, find $f'(0)$."), 1),
  num(m(EX, "apply-gaussian", "apply", 3, 25, "For $f(x) = e^{-x^{2}}$, find $f'(1)$. Give $3$ decimal places."), -0.736),
  num(m(EX, "apply-base-2-slope", "apply", 3, 25, "Find the slope of $y = 2^{x}$ at $x = 0$. Give $3$ decimal places."), 0.693),
  mcq(m(EX, "apply-second-derivative", "apply", 3, 25, "$\\frac{d^{2}}{dx^{2}} e^{2x} =$"),
    "$4e^{2x}$",
    [
      ["$2e^{2x}$", "exp2-first", "That's the first derivative."],
      ["$e^{2x}$", "exp2-same", "Each derivative brings down a factor $2$."],
      ["$4xe^{2x}$", "exp2-x", "No factor of $x$ appears."],
    ]),
  // level 4
  num(m(EX, "apply-product-exp", "apply", 4, 30, "For $f(x) = x^{2}e^{3x}$, find $f'(1)$. Give $2$ decimal places."), 100.43),
  num(m(EX, "apply-logistic-slope", "apply", 4, 30, "For $f(x) = \\frac{e^{x}}{1 + e^{x}}$, find $f'(0)$."), 0.25),
  num(m(EX, "apply-doubling-time", "apply", 4, 30, "A quantity grows as $e^{0.05t}$. Find its doubling time. Give $2$ decimal places."), 13.86),
  mcq(m(EX, "apply-own-derivative", "apply", 4, 30, "Which function equals its own derivative and has value $5$ at $x = 0$?"),
    "$5e^{x}$",
    [
      ["$e^{5x}$", "own-rate", "Its derivative is $5e^{5x}$, and its value at $0$ is $1$."],
      ["$e^{x} + 4$", "own-shift", "Its derivative is $e^{x}$, which isn't $e^{x} + 4$."],
      ["$5^{x}$", "own-base", "Its derivative is $5^{x}\\ln 5$."],
    ]),
  // level 5
  short(m(EX, "explain-own-derivative", "explain", 5, 90, "Explain why $e^{x}$ is its own derivative, starting from $\\lim_{h \\to 0} \\frac{e^{h} - 1}{h} = 1$."),
    [
      ["factor", "Writes $\\frac{e^{x + h} - e^{x}}{h} = e^{x} \\cdot \\frac{e^{h} - 1}{h}$", 2, true],
      ["limit", "The second factor tends to $1$, so the derivative is $e^{x}$", 2, true],
    ]),
  mcq(m(EX, "apply-exp-square", "apply", 5, 40, "$\\frac{d}{dx} e^{x^{2}} =$"),
    "$2xe^{x^{2}}$",
    [
      ["$e^{x^{2}}$", "expsq-no-chain", "The chain rule multiplies by the inner derivative $2x$."],
      ["$x^{2}e^{x^{2} - 1}$", "expsq-power", "The power rule doesn't apply to an exponential."],
      ["$e^{2x}$", "expsq-inner", "Differentiate the outer function, not just the exponent."],
    ]),
  mcq(m(EX, "apply-decay", "apply", 5, 40, "$y = e^{kx}$ decreases for all $x$ when:"),
    "$k < 0$",
    [
      ["$k > 0$", "decay-positive", "Then $y' = ky > 0$."],
      ["$k = 0$", "decay-zero", "Then $y = 1$ is constant."],
      ["$|k| < 1$", "decay-small", "The sign of $k$ decides, not its size."],
    ]),
  num(m(EX, "apply-base-3-slope", "apply", 5, 40, "Find the slope of $y = 3^{x}$ at $x = 0$. Give $3$ decimal places."), 1.099),
  // level 6
  short(m(EX, "explain-uniqueness", "explain", 6, 120, "Show that every differentiable solution of $y' = ky$ has the form $y = Ce^{kx}$."),
    [
      ["auxiliary", "Considers $u(x) = y(x)e^{-kx}$ and computes $u' = y'e^{-kx} - kye^{-kx} = 0$", 3, true],
      ["conclude", "So $u$ is constant, $u = C$, giving $y = Ce^{kx}$", 1, true],
    ]),
  num(m(EX, "apply-population-rate", "apply", 6, 45, "A population is $P(t) = 100e^{0.02t}$. Find its growth rate $P'(10)$. Give $3$ decimal places."), 2.443),
  num(m(EX, "apply-tangent-origin", "apply", 6, 45, "The tangent line to $y = e^{x}$ at $x = a$ passes through the origin. Find $a$."), 1),
  mcq(m(EX, "apply-hyperbolic", "apply", 6, 45, "With $\\sinh x = \\frac{e^{x} - e^{-x}}{2}$ and $\\cosh x = \\frac{e^{x} + e^{-x}}{2}$, $\\frac{d}{dx}\\sinh x =$"),
    "$\\cosh x$",
    [
      ["$-\\cosh x$", "sinh-sign", "$\\frac{d}{dx}e^{-x} = -e^{-x}$, which turns the minus into a plus."],
      ["$\\sinh x$", "sinh-same", "Differentiating flips the sign of the $e^{-x}$ term."],
      ["$-\\sinh x$", "sinh-trig", "Unlike $\\sin$, no minus sign appears."],
    ]),
  // level 7
  short(m(EX, "explain-beats-polynomials", "explain", 7, 120, "Explain why $e^{x}$ eventually exceeds every polynomial, in terms of what happens when you differentiate each repeatedly."),
    [
      ["polynomial", "Differentiating a polynomial of degree $n$ $(n + 1)$ times gives $0$; its growth rate keeps weakening", 2, true],
      ["exponential", "$e^{x}$ reproduces itself under every differentiation, so its growth never weakens; e.g. $\\frac{x^{n}}{e^{x}} \\to 0$ (by repeated L'Hôpital, or the series $e^{x} > \\frac{x^{n + 1}}{(n + 1)!}$)", 2, true],
    ]),
  num(m(EX, "apply-half-life", "apply", 7, 60, "A substance decays as $e^{-0.1t}$. Find its half-life. Give $2$ decimal places."), 6.93),
  num(m(EX, "apply-double-exp", "apply", 7, 60, "Find $\\frac{d}{dx} e^{e^{x}}$ at $x = 0$. Give $3$ decimal places."), 2.718),
  mcq(m(EX, "transfer-nth-derivative", "transfer", 7, 60, "The $n$th derivative of $xe^{x}$ is:"),
    "$(x + n)e^{x}$",
    [
      ["$nxe^{x}$", "nth-multiply", "Each derivative adds one $e^{x}$, it doesn't multiply."],
      ["$xe^{x} + e^{x}$", "nth-first", "That's only the first derivative."],
      ["$(x + 1)^{n}e^{x}$", "nth-power", "The count grows linearly: $(x + 1)e^{x}$, $(x + 2)e^{x}$, …"],
    ]),
  // level 8
  short(m(EX, "explain-general-base", "explain", 8, 150, "Prove that $\\frac{d}{dx} a^{x} = a^{x}\\ln a$ for $a > 0$."),
    [
      ["rewrite", "Writes $a^{x} = e^{x\\ln a}$", 2, true],
      ["chain", "The chain rule gives $e^{x\\ln a} \\cdot \\ln a = a^{x}\\ln a$", 2, true],
    ]),
  num(m(EX, "apply-max-location", "apply", 8, 75, "At what $x > 0$ does $f(x) = x^{2}e^{-x}$ have a horizontal tangent?"), 2),
  num(m(EX, "apply-cooling", "apply", 8, 75, "A cup of coffee has temperature $T(t) = 20 + 70e^{-0.1t}$ (°C, minutes). Find $T'(0)$."), -7),
  mcq(m(EX, "recall-slope-at-zero", "recall", 8, 75, "$\\lim_{h \\to 0}\\frac{2^{h} - 1}{h} =$"),
    "$\\ln 2$",
    [
      ["$1$", "slope0-one", "That's the limit for base $e$."],
      ["$2$", "slope0-two", "It's the slope of $2^{x}$ at $0$, which is about $0.693$."],
      ["$0$", "slope0-zero", "Both top and bottom tend to $0$, but the ratio doesn't."],
    ]),
  // level 9
  short(m(EX, "transfer-product-law", "transfer", 9, 180, "Use derivatives to prove $e^{a}e^{b} = e^{a + b}$: consider $f(x) = e^{x}e^{c - x}$ for a constant $c$."),
    [
      ["derivative", "$f'(x) = e^{x}e^{c - x} - e^{x}e^{c - x} = 0$, so $f$ is constant", 2, true],
      ["evaluate", "$f(0) = e^{c}$, so $e^{x}e^{c - x} = e^{c}$; with $x = a$ and $c = a + b$ this is $e^{a}e^{b} = e^{a + b}$", 2, true],
    ]),
  short(m(EX, "transfer-continuous-compounding", "transfer", 9, 180, "Explain how continuous compounding at rate $r$ leads to $y' = ry$, and why the balance after one year is $e^{r}$ times the principal."),
    [
      ["ode", "Interest accrues at a rate proportional to the current balance: $\\frac{dy}{dt} = ry$, so $y = y_0e^{rt}$", 2, true],
      ["limit", "Equivalently, compounding $n$ times a year gives $\\left(1 + \\frac{r}{n}\\right)^{n} \\to e^{r}$", 2, true],
    ]),
  num(m(EX, "transfer-characteristic", "transfer", 9, 90, "$y = e^{kx}$ solves $y'' - 5y' + 6y = 0$ for two values of $k$. Find the larger."), 3),
  mcq(m(EX, "transfer-zero-solution", "transfer", 9, 90, "If $f' = f$ everywhere and $f(0) = 0$, then:"),
    "$f(x) = 0$ for every $x$",
    [
      ["$f(x) = e^{x}$", "zerosol-exp", "$e^{0} = 1 \\ne 0$; the solution is $Ce^{x}$ with $C = f(0) = 0$."],
      ["$f(x) = e^{x} - 1$", "zerosol-shift", "Its derivative is $e^{x}$, not $e^{x} - 1$."],
      ["$f$ can be any solution", "zerosol-any", "The initial value fixes $C$."],
    ]),
  // level 10
  short(m(EX, "transfer-tangent-inequality", "transfer", 10, 180, "Prove that $e^{x} \\ge 1 + x$ for every real $x$."),
    [
      ["function", "Lets $g(x) = e^{x} - 1 - x$, with $g'(x) = e^{x} - 1$", 2, true],
      ["minimum", "$g' < 0$ for $x < 0$ and $g' > 0$ for $x > 0$, so $g$ has its minimum $g(0) = 0$; hence $g \\ge 0$ (equivalently, $e^{x}$ is convex and lies above its tangent at $0$)", 2, true],
    ]),
  short(m(EX, "transfer-limit-equivalence", "transfer", 10, 180, "Sketch why $\\lim_{h \\to 0}\\frac{e^{h} - 1}{h} = 1$ is consistent with $e = \\lim_{n \\to \\infty}\\left(1 + \\frac{1}{n}\\right)^{n}$."),
    [
      ["small", "The slope condition says $e^{h} \\approx 1 + h$ for small $h$", 2, true],
      ["power", "With $h = \\frac{1}{n}$: $e^{1/n} \\approx 1 + \\frac{1}{n}$, so $e = \\left(e^{1/n}\\right)^{n} \\approx \\left(1 + \\frac{1}{n}\\right)^{n}$, with the error vanishing as $n \\to \\infty$", 2, true],
    ]),
  num(m(EX, "transfer-check-solution", "transfer", 10, 120, "Let $y = e^{2x} + e^{3x}$. Compute $y''(0) - 5y'(0) + 6y(0)$."), 0),
  mcq(m(EX, "transfer-second-order", "transfer", 10, 120, "The differentiable solutions of $y'' = y$ are:"),
    "$c_1e^{x} + c_2e^{-x}$",
    [
      ["$ce^{x}$ only", "secondorder-one", "$e^{-x}$ also satisfies $y'' = y$."],
      ["$c_1\\sin x + c_2\\cos x$", "secondorder-trig", "Those solve $y'' = -y$."],
      ["$cx^{2}$", "secondorder-power", "$(cx^{2})'' = 2c \\ne cx^{2}$."],
    ]),
];

// ---------------------------------------------------------------------------
// logarithmic-derivatives
// ---------------------------------------------------------------------------
const LG = "logarithmic-derivatives";
const logarithmic: Item[] = [
  // level 1
  mcq(m(LG, "recall-log", "recall", 1, 15, "$\\frac{d}{dx} \\ln x =$"),
    "$\\frac{1}{x}$",
    [
      ["$\\frac{\\ln x}{x}$", "log-extra", "No $\\ln x$ remains."],
      ["$e^{x}$", "log-inverse", "That's the inverse function, not the derivative."],
      ["$\\frac{1}{\\ln x}$", "log-reciprocal", "The derivative is the reciprocal of $x$."],
    ]),
  mcq(m(LG, "recall-log-base", "recall", 1, 15, "$\\frac{d}{dx}\\log_a x =$"),
    "$\\frac{1}{x\\ln a}$",
    [
      ["$\\frac{\\ln a}{x}$", "logbase-multiply", "$\\log_a x = \\frac{\\ln x}{\\ln a}$, so $\\ln a$ divides."],
      ["$\\frac{1}{x}$", "logbase-natural", "That's only for base $e$."],
      ["$\\frac{a}{x}$", "logbase-a", "The base enters through $\\ln a$."],
    ]),
  mcq(m(LG, "recall-log-derivative", "recall", 1, 15, "For positive differentiable $g$, $\\frac{d}{dx}\\ln g(x) =$"),
    "$\\frac{g'(x)}{g(x)}$",
    [
      ["$\\frac{1}{g(x)}$", "logderiv-no-chain", "The chain rule multiplies by $g'$."],
      ["$\\frac{1}{g'(x)}$", "logderiv-inverted", "It's $g'$ over $g$."],
      ["$\\ln g'(x)$", "logderiv-inside", "Differentiate the logarithm, not its argument alone."],
    ]),
  mcq(m(LG, "recall-log-abs", "recall", 1, 15, "For $x < 0$, $\\frac{d}{dx} \\ln|x| =$"),
    "$\\frac{1}{x}$",
    [
      ["$-\\frac{1}{x}$", "logabs-sign", "$\\ln|x| = \\ln(-x)$ has derivative $\\frac{-1}{-x} = \\frac{1}{x}$."],
      ["$\\frac{1}{|x|}$", "logabs-abs", "That would be positive, but $\\ln|x|$ decreases for $x < 0$."],
      ["It is undefined", "logabs-undefined", "$\\ln|x|$ is defined and differentiable for $x < 0$."],
    ]),
  // level 2
  num(m(LG, "apply-log-quadratic", "apply", 2, 20, "Find $\\frac{d}{dx} \\ln(x^{2} + 1)$ at $x = 1$."), 1),
  num(m(LG, "apply-log-3x", "apply", 2, 20, "For $f(x) = \\ln(3x)$, find $f'(2)$."), 0.5),
  num(m(LG, "apply-log-at-4", "apply", 2, 20, "For $f(x) = \\ln x$, find $f'(4)$."), 0.25),
  mcq(m(LG, "apply-log-power", "apply", 2, 20, "$\\frac{d}{dx}\\ln(x^{5}) =$"),
    "$\\frac{5}{x}$",
    [
      ["$\\frac{1}{x^{5}}$", "logpow-no-chain", "$\\ln(x^{5}) = 5\\ln x$."],
      ["$\\frac{5}{x^{5}}$", "logpow-mixed", "The $x^{4}$ from the chain rule cancels: $\\frac{5x^{4}}{x^{5}} = \\frac{5}{x}$."],
      ["$5\\ln x$", "logpow-rewrite", "That's the function rewritten, not its derivative."],
    ]),
  // level 3
  num(m(LG, "apply-x-log", "apply", 3, 25, "For $f(x) = x\\ln x$, find $f'(e)$."), 2),
  num(m(LG, "apply-log-base-2", "apply", 3, 25, "For $f(x) = \\log_{2} x$, find $f'(1)$. Give $3$ decimal places."), 1.443),
  num(m(LG, "apply-log-sum", "apply", 3, 25, "Find $\\frac{d}{dx}\\ln(x^{2} + 3x)$ at $x = 1$."), 1.25),
  mcq(m(LG, "apply-log-simplify", "apply", 3, 25, "$\\frac{d}{dx}\\ln\\left(\\frac{x}{7}\\right) =$"),
    "$\\frac{1}{x}$",
    [
      ["$\\frac{7}{x}$", "logsimp-multiply", "$\\ln\\frac{x}{7} = \\ln x - \\ln 7$; the constant vanishes."],
      ["$\\frac{1}{7x}$", "logsimp-divide", "The chain-rule factor $\\frac{1}{7}$ cancels with the $7$ in $\\frac{7}{x}$."],
      ["$\\frac{x}{7}$", "logsimp-argument", "That's the argument, not the derivative."],
    ]),
  // level 4
  num(m(LG, "apply-x2-log", "apply", 4, 30, "For $f(x) = x^{2}\\ln x$, find $f'(e)$. Give $3$ decimal places."), 8.155),
  num(m(LG, "apply-log-log", "apply", 4, 30, "For $f(x) = \\ln(\\ln x)$, find $f'(e)$. Give $3$ decimal places."), 0.368),
  num(m(LG, "apply-log-root", "apply", 4, 30, "Find $\\frac{d}{dx}\\ln\\sqrt{x^{2} + 1}$ at $x = 1$."), 0.5),
  mcq(m(LG, "apply-log-over-x", "apply", 4, 30, "$\\frac{d}{dx}\\frac{\\ln x}{x} =$"),
    "$\\frac{1 - \\ln x}{x^{2}}$",
    [
      ["$\\frac{\\ln x - 1}{x^{2}}$", "logoverx-sign", "Quotient rule: $\\frac{\\frac{1}{x} \\cdot x - \\ln x \\cdot 1}{x^{2}}$."],
      ["$\\frac{1}{x^{2}}$", "logoverx-naive", "Differentiating top and bottom separately isn't a rule."],
      ["$\\frac{1 + \\ln x}{x^{2}}$", "logoverx-plus", "The quotient rule subtracts."],
    ]),
  // level 5
  short(m(LG, "explain-derive-log", "explain", 5, 90, "Derive $\\frac{d}{dx} \\ln x = \\frac{1}{x}$ from the identity $e^{\\ln x} = x$."),
    [
      ["differentiate", "Differentiates both sides with the chain rule: $e^{\\ln x} \\cdot \\frac{d}{dx}\\ln x = 1$", 2, true],
      ["simplify", "Uses $e^{\\ln x} = x$ to get $\\frac{d}{dx}\\ln x = \\frac{1}{x}$", 2, true],
    ]),
  mcq(m(LG, "apply-x-to-x", "apply", 5, 40, "$\\frac{d}{dx} x^{x}$ (for $x > 0$) is:"),
    "$x^{x}(\\ln x + 1)$",
    [
      ["$x \\cdot x^{x - 1}$", "xx-power", "The power rule needs a fixed exponent."],
      ["$x^{x}\\ln x$", "xx-exponential", "Treating the base as fixed misses the $+1$."],
      ["$x^{x}$", "xx-same", "Use logarithmic differentiation: $\\ln y = x\\ln x$."],
    ]),
  mcq(m(LG, "apply-relative-rate", "apply", 5, 40, "The logarithmic derivative $\\frac{g'}{g}$ of $g(x) = 3e^{2x}$ is:"),
    "$2$",
    [
      ["$6$", "relrate-absolute", "$g' = 6e^{2x}$, but dividing by $g = 3e^{2x}$ leaves $2$."],
      ["$3$", "relrate-coefficient", "The constant $3$ cancels in $\\frac{g'}{g}$."],
      ["$2x$", "relrate-x", "$\\ln g = \\ln 3 + 2x$, whose derivative is the constant $2$."],
    ]),
  num(m(LG, "apply-log-base-10", "apply", 5, 40, "For $f(x) = \\log_{10} x$, find $f'(10)$. Give $4$ decimal places."), 0.0434),
  // level 6
  short(m(LG, "explain-procedure", "explain", 6, 120, "Describe the steps of logarithmic differentiation, and explain why it simplifies differentiating products, quotients and powers."),
    [
      ["steps", "Take $\\ln$ of both sides, simplify with log laws, differentiate implicitly (the left side gives $\\frac{y'}{y}$), then multiply by $y$", 2, true],
      ["why", "Log laws turn products and quotients into sums and differences, and powers into multiples, which are easier to differentiate", 2, true],
    ]),
  num(m(LG, "apply-x-to-x-at-1", "apply", 6, 45, "For $y = x^{x}$, find $y'(1)$."), 1),
  num(m(LG, "apply-log-derivative", "apply", 6, 45, "For $y = \\frac{(x^{2} + 1)^{3}(x - 1)^{2}}{x^{4}}$, find $\\frac{y'}{y}$ at $x = 2$."), 2.4),
  mcq(m(LG, "apply-growth-rate", "apply", 6, 45, "The relative growth rate $\\frac{P'}{P}$ of $P(t) = 500e^{0.03t}$ is:"),
    "$0.03$, for every $t$",
    [
      ["$15e^{0.03t}$", "growthrate-absolute", "That's $P'$; dividing by $P$ leaves $0.03$."],
      ["$500$", "growthrate-initial", "That's the initial value."],
      ["$0.03t$", "growthrate-t", "$\\ln P = \\ln 500 + 0.03t$ has constant derivative."],
    ]),
  // level 7
  short(m(LG, "explain-x-to-x", "explain", 7, 120, "Why can't $y = x^{x}$ be differentiated with the power rule or the exponential rule? Carry out logarithmic differentiation."),
    [
      ["why", "Both the base and the exponent vary, so neither rule applies", 2, true],
      ["carry-out", "$\\ln y = x\\ln x$, so $\\frac{y'}{y} = \\ln x + 1$ and $y' = x^{x}(\\ln x + 1)$", 2, true],
    ]),
  num(m(LG, "apply-x-root-x", "apply", 7, 60, "For $y = x^{1/x}$ ($x > 0$), find $y'(1)$."), 1),
  num(m(LG, "transfer-tangent-through-origin", "transfer", 7, 60, "The tangent line to $y = \\ln x$ at $x = a$ passes through the origin. Find $a$. Give $3$ decimal places."), 2.718),
  mcq(m(LG, "apply-x-to-x-flat", "apply", 7, 60, "$\\frac{d}{dx}x^{x} = 0$ at:"),
    "$x = \\frac{1}{e}$",
    [
      ["$x = 1$", "xxflat-one", "$y'(1) = 1 \\cdot (0 + 1) = 1$."],
      ["$x = e$", "xxflat-e", "$\\ln x + 1 = 0$ means $\\ln x = -1$."],
      ["Nowhere", "xxflat-never", "$\\ln x + 1$ vanishes at $x = e^{-1}$."],
    ]),
  // level 8
  short(m(LG, "explain-log-product", "explain", 8, 150, "Use derivatives to prove $\\ln(ab) = \\ln a + \\ln b$ for $a, b > 0$."),
    [
      ["derivative", "$\\frac{d}{dx}\\ln(ax) = \\frac{a}{ax} = \\frac{1}{x} = \\frac{d}{dx}\\ln x$, so $\\ln(ax) - \\ln x$ is constant", 2, true],
      ["evaluate", "At $x = 1$ the constant is $\\ln a$; setting $x = b$ gives $\\ln(ab) = \\ln a + \\ln b$", 2, true],
    ]),
  num(m(LG, "apply-x-to-x-min", "apply", 8, 75, "Find the minimum value of $x^{x}$ for $x > 0$. Give $3$ decimal places."), 0.692),
  num(m(LG, "apply-variable-power", "apply", 8, 75, "For $y = (x + 1)^{x}$, find $y'(1)$. Give $3$ decimal places."), 2.386),
  mcq(m(LG, "apply-which-log-diff", "apply", 8, 75, "Which function needs logarithmic differentiation (rather than the power or exponential rule alone)?"),
    "$(x^{2} + 1)^{x}$",
    [
      ["$(x^{2} + 1)^{5}$", "whichlog-power", "Fixed exponent: the chain rule with the power rule suffices."],
      ["$5^{x^{2} + 1}$", "whichlog-exp", "Fixed base: the chain rule with the exponential rule suffices."],
      ["$x^{5} + 5^{x}$", "whichlog-sum", "Each term has a standard rule."],
    ]),
  // level 9
  short(m(LG, "transfer-change-of-base", "transfer", 9, 180, "Derive $\\frac{d}{dx}\\log_a x = \\frac{1}{x\\ln a}$ and explain why base $e$ is the natural choice."),
    [
      ["derive", "Uses $\\log_a x = \\frac{\\ln x}{\\ln a}$ and the constant multiple rule", 2, true],
      ["natural", "Only for $a = e$ is the constant $\\frac{1}{\\ln a}$ equal to $1$, giving the clean $\\frac{1}{x}$", 2, true],
    ]),
  short(m(LG, "transfer-e-limit", "transfer", 9, 180, "Use the fact that $\\frac{d}{dx}\\ln x = 1$ at $x = 1$ to show $\\lim_{n \\to \\infty}\\left(1 + \\frac{1}{n}\\right)^{n} = e$."),
    [
      ["derivative", "$\\lim_{h \\to 0}\\frac{\\ln(1 + h) - \\ln 1}{h} = 1$, so $n\\ln\\left(1 + \\frac{1}{n}\\right) \\to 1$ (taking $h = \\frac{1}{n}$)", 2, true],
      ["exponentiate", "By continuity of $e^{x}$, $\\left(1 + \\frac{1}{n}\\right)^{n} = e^{n\\ln(1 + 1/n)} \\to e^{1}$", 2, true],
    ]),
  num(m(LG, "transfer-log-limit", "transfer", 9, 90, "Find $\\lim_{x \\to 0}\\frac{\\ln(1 + 3x)}{x}$ by recognising a derivative."), 3),
  mcq(m(LG, "transfer-elasticity", "transfer", 9, 90, "For $y = Cx^{k}$ (with $C, x > 0$), the elasticity $\\frac{d\\ln y}{d\\ln x}$ equals:"),
    "$k$",
    [
      ["$Ck$", "elasticity-c", "$\\ln y = \\ln C + k\\ln x$; the constant drops out."],
      ["$kx^{k - 1}$", "elasticity-derivative", "That's $\\frac{dy}{dx}$ divided by $C$."],
      ["$\\ln k$", "elasticity-log", "The slope in log–log coordinates is $k$ itself."],
    ]),
  // level 10
  short(m(LG, "transfer-log-inequality", "transfer", 10, 180, "Prove that $\\ln x \\le x - 1$ for every $x > 0$."),
    [
      ["function", "Lets $g(x) = x - 1 - \\ln x$, with $g'(x) = 1 - \\frac{1}{x}$", 2, true],
      ["minimum", "$g' < 0$ on $(0, 1)$ and $g' > 0$ on $(1, \\infty)$, so $g$ is smallest at $x = 1$, where $g(1) = 0$; hence $g \\ge 0$", 2, true],
    ]),
  short(m(LG, "transfer-product-rule-via-logs", "transfer", 10, 180, "For positive differentiable $f$ and $g$, derive the product rule using logarithmic differentiation."),
    [
      ["logs", "With $y = fg$: $\\ln y = \\ln f + \\ln g$, so $\\frac{y'}{y} = \\frac{f'}{f} + \\frac{g'}{g}$", 2, true],
      ["multiply", "Multiplying by $y = fg$ gives $y' = f'g + fg'$", 2, true],
    ]),
  num(m(LG, "transfer-product-relative", "transfer", 10, 120, "Let $y = \\prod_{k=1}^{5}(x + k)$. Find $\\frac{y'}{y}$ at $x = 0$. Give $4$ decimal places."), 2.2833),
  mcq(m(LG, "transfer-triple-log", "transfer", 10, 120, "$\\frac{d}{dx}\\ln(\\ln(\\ln x))$ (for $x > e$) is:"),
    "$\\frac{1}{x\\ln x\\,\\ln(\\ln x)}$",
    [
      ["$\\frac{1}{\\ln(\\ln x)}$", "triplelog-outer", "Two more chain-rule factors are missing."],
      ["$\\frac{1}{x^{3}}$", "triplelog-cube", "Each layer contributes a different factor."],
      ["$\\frac{1}{x\\ln x}$", "triplelog-two", "That's the derivative of $\\ln(\\ln x)$."],
    ]),
];

// ---------------------------------------------------------------------------
// trig-derivatives
// ---------------------------------------------------------------------------
const TG = "trig-derivatives";
const trig: Item[] = [
  // level 1
  mcq(m(TG, "recall-sin", "recall", 1, 15, "$\\frac{d}{dx} \\sin x =$"),
    "$\\cos x$",
    [
      ["$-\\cos x$", "sin-sign", "The minus sign belongs to the derivative of $\\cos x$."],
      ["$\\sin x$", "sin-same", "Only $e^{x}$ is its own derivative."],
      ["$-\\sin x$", "sin-cos-confusion", "That's the derivative of $\\cos x$."],
    ]),
  mcq(m(TG, "recall-cos", "recall", 1, 15, "$\\frac{d}{dx} \\cos x =$"),
    "$-\\sin x$",
    [
      ["$\\sin x$", "cos-sign", "Cosine decreases on $\\left(0, \\frac{\\pi}{2}\\right)$, so its derivative is negative there."],
      ["$\\cos x$", "cos-same", "Cosine is not its own derivative."],
      ["$-\\cos x$", "cos-second", "That's the second derivative."],
    ]),
  mcq(m(TG, "recall-tan", "recall", 1, 15, "$\\frac{d}{dx}\\tan x =$"),
    "$\\sec^{2} x$",
    [
      ["$\\sec x\\tan x$", "tan-sec", "That's the derivative of $\\sec x$."],
      ["$-\\csc^{2} x$", "tan-cot", "That's the derivative of $\\cot x$."],
      ["$\\cot x$", "tan-reciprocal", "Differentiate $\\frac{\\sin x}{\\cos x}$ with the quotient rule."],
    ]),
  mcq(m(TG, "recall-radians", "recall", 1, 15, "The formula $\\frac{d}{dx}\\sin x = \\cos x$ requires $x$ to be measured in:"),
    "Radians",
    [
      ["Degrees", "radians-degrees", "In degrees an extra factor $\\frac{\\pi}{180}$ appears."],
      ["Either unit", "radians-either", "The limit $\\frac{\\sin h}{h} \\to 1$ holds only in radians."],
      ["Gradians", "radians-gradians", "Only radians make the formula clean."],
    ]),
  // level 2
  num(m(TG, "apply-sin-2x", "apply", 2, 20, "Find $\\frac{d}{dx} \\sin(2x)$ at $x = 0$."), 2),
  num(m(TG, "apply-cos-quarter", "apply", 2, 20, "Find $\\frac{d}{dx}\\cos x$ at $x = \\frac{\\pi}{2}$."), -1),
  num(m(TG, "apply-tan", "apply", 2, 20, "For $f(x) = \\tan x$, find $f'\\left(\\frac{\\pi}{4}\\right)$."), 2),
  mcq(m(TG, "recall-sec", "recall", 2, 20, "$\\frac{d}{dx}\\sec x =$"),
    "$\\sec x\\tan x$",
    [
      ["$\\sec^{2} x$", "sec-tan", "That's the derivative of $\\tan x$."],
      ["$-\\sec x\\tan x$", "sec-sign", "$\\sec x = (\\cos x)^{-1}$ gives $\\frac{\\sin x}{\\cos^{2} x}$, which is positive on $\\left(0, \\frac{\\pi}{2}\\right)$."],
      ["$\\csc x$", "sec-reciprocal", "Differentiate $\\frac{1}{\\cos x}$ with the reciprocal rule."],
    ]),
  // level 3
  num(m(TG, "apply-sin-squared", "apply", 3, 25, "For $f(x) = \\sin^{2} x$, find $f'\\left(\\frac{\\pi}{4}\\right)$."), 1),
  num(m(TG, "apply-x-sin", "apply", 3, 25, "For $f(x) = x\\sin x$, find $f'\\left(\\frac{\\pi}{2}\\right)$."), 1),
  num(m(TG, "apply-cos-3x", "apply", 3, 25, "Find $\\frac{d}{dx}\\cos(3x)$ at $x = \\frac{\\pi}{6}$."), -3),
  mcq(m(TG, "recall-cot", "recall", 3, 25, "$\\frac{d}{dx}\\cot x =$"),
    "$-\\csc^{2} x$",
    [
      ["$\\csc^{2} x$", "cot-sign", "The “co-” functions carry a minus sign."],
      ["$-\\tan^{2} x$", "cot-tan", "Quotient rule on $\\frac{\\cos x}{\\sin x}$ gives $-\\frac{1}{\\sin^{2} x}$."],
      ["$\\sec^{2} x$", "cot-tan-derivative", "That's the derivative of $\\tan x$."],
    ]),
  // level 4
  num(m(TG, "apply-exp-sin-product", "apply", 4, 30, "For $f(x) = e^{x}\\sin x$, find $f'\\left(\\frac{\\pi}{2}\\right)$. Give $2$ decimal places."), 4.81),
  num(m(TG, "apply-sin-cos", "apply", 4, 30, "For $f(x) = \\sin x\\cos x$, find $f'(0)$."), 1),
  num(m(TG, "apply-tan-squared", "apply", 4, 30, "For $f(x) = \\tan^{2} x$, find $f'\\left(\\frac{\\pi}{4}\\right)$."), 4),
  mcq(m(TG, "apply-sin-cycle", "apply", 4, 30, "The successive derivatives of $\\sin x$ repeat with period:"),
    "$4$",
    [
      ["$2$", "cycle-two", "After two derivatives you get $-\\sin x$, not $\\sin x$."],
      ["$1$", "cycle-one", "$\\sin x$ is not its own derivative."],
      ["They never repeat", "cycle-never", "$\\sin \\to \\cos \\to -\\sin \\to -\\cos \\to \\sin$."],
    ]),
  // level 5
  short(m(TG, "explain-tan", "explain", 5, 90, "Show that $\\frac{d}{dx} \\tan x = \\sec^{2} x$."),
    [
      ["quotient", "Writes $\\tan x = \\frac{\\sin x}{\\cos x}$ and applies the quotient rule: $\\frac{\\cos^{2} x + \\sin^{2} x}{\\cos^{2} x}$", 2, true],
      ["identity", "Uses $\\sin^{2} x + \\cos^{2} x = 1$ to get $\\frac{1}{\\cos^{2} x} = \\sec^{2} x$", 2, true],
    ]),
  mcq(m(TG, "apply-fiftieth", "apply", 5, 40, "$\\frac{d^{50}}{dx^{50}}\\sin x =$"),
    "$-\\sin x$",
    [
      ["$\\sin x$", "fiftieth-four", "$50 = 4 \\cdot 12 + 2$, so it matches the second derivative."],
      ["$\\cos x$", "fiftieth-one", "That's the first (or fifth, …) derivative."],
      ["$-\\cos x$", "fiftieth-three", "That's the third derivative's pattern."],
    ]),
  mcq(m(TG, "apply-degrees", "apply", 5, 40, "If $x$ is measured in degrees, $\\frac{d}{dx} \\sin(x^{\\circ}) =$"),
    "$\\frac{\\pi}{180}\\cos(x^{\\circ})$",
    [
      ["$\\cos(x^{\\circ})$", "degrees-ignore", "$\\sin(x^{\\circ}) = \\sin\\left(\\frac{\\pi x}{180}\\right)$, so the chain rule adds a factor."],
      ["$\\frac{180}{\\pi}\\cos(x^{\\circ})$", "degrees-invert", "The inner derivative is $\\frac{\\pi}{180}$."],
      ["$-\\cos(x^{\\circ})$", "degrees-sign", "There's no sign change."],
    ]),
  num(m(TG, "apply-sin-square-arg", "apply", 5, 40, "Find $\\frac{d}{dx}\\sin(x^{2})$ at $x = \\sqrt{\\pi}$. Give $3$ decimal places."), -3.545),
  // level 6
  short(m(TG, "explain-derive-sin", "explain", 6, 120, "Using only $\\lim_{h \\to 0} \\frac{\\sin h}{h} = 1$ and $\\lim_{h \\to 0} \\frac{\\cos h - 1}{h} = 0$, derive $\\frac{d}{dx}\\sin x = \\cos x$."),
    [
      ["addition", "Uses $\\sin(x + h) = \\sin x\\cos h + \\cos x\\sin h$", 2, true],
      ["split", "Splits the quotient into $\\sin x \\cdot \\frac{\\cos h - 1}{h} + \\cos x \\cdot \\frac{\\sin h}{h} \\to \\cos x$", 2, true],
    ]),
  num(m(TG, "apply-horizontal", "apply", 6, 45, "Where on $(0, \\pi)$ is the tangent to $y = \\sin x + \\cos x$ horizontal? Give $3$ decimal places."), 0.785),
  num(m(TG, "apply-sec-value", "apply", 6, 45, "For $f(x) = \\sec x$, find $f'\\left(\\frac{\\pi}{3}\\right)$. Give $3$ decimal places."), 3.464),
  mcq(m(TG, "apply-harmonic-equation", "apply", 6, 45, "$y = \\sin x$ satisfies:"),
    "$y'' = -y$",
    [
      ["$y'' = y$", "harmonic-plus", "That's satisfied by $e^{x}$ and $e^{-x}$."],
      ["$y' = y$", "harmonic-first", "$(\\sin x)' = \\cos x \\ne \\sin x$."],
      ["$y' = -y$", "harmonic-decay", "That's $e^{-x}$."],
    ]),
  // level 7
  short(m(TG, "explain-derive-cos", "explain", 7, 120, "Derive $\\frac{d}{dx}\\cos x = -\\sin x$ from the limit definition."),
    [
      ["addition", "Uses $\\cos(x + h) = \\cos x\\cos h - \\sin x\\sin h$", 2, true],
      ["split", "Splits into $\\cos x \\cdot \\frac{\\cos h - 1}{h} - \\sin x \\cdot \\frac{\\sin h}{h} \\to -\\sin x$", 2, true],
    ]),
  num(m(TG, "apply-log-sec-tan", "apply", 7, 60, "For $f(x) = \\ln(\\sec x + \\tan x)$, find $f'\\left(\\frac{\\pi}{4}\\right)$. Give $3$ decimal places."), 1.414),
  num(m(TG, "apply-velocity", "apply", 7, 60, "A spring's position is $x(t) = 3\\sin(2t)$. Find its velocity at $t = 0$."), 6),
  mcq(m(TG, "apply-max-slope", "apply", 7, 60, "The largest slope of the graph $y = \\sin x$ is:"),
    "$1$",
    [
      ["$\\frac{\\pi}{2}$", "maxslope-angle", "The slope is $\\cos x$, at most $1$."],
      ["$\\infty$", "maxslope-infinite", "$|\\cos x| \\le 1$."],
      ["$0$", "maxslope-zero", "That's the slope at the peaks."],
    ]),
  // level 8
  short(m(TG, "explain-damped-oscillation", "explain", 8, 150, "Show that $y = e^{-x}(A\\cos x + B\\sin x)$ satisfies $y'' + 2y' + 2y = 0$ for all constants $A$ and $B$."),
    [
      ["first", "Computes $y' = e^{-x}\\left((B - A)\\cos x - (A + B)\\sin x\\right)$", 2, true],
      ["second", "Computes $y'' = e^{-x}(-2B\\cos x + 2A\\sin x)$ and checks the combination is $0$", 2, true],
    ]),
  num(m(TG, "apply-sinc-slope", "apply", 8, 75, "For $f(x) = \\frac{\\sin x}{x}$, find $f'(\\pi)$. Give $3$ decimal places."), -0.318),
  num(m(TG, "apply-crossing-angle", "apply", 8, 75, "$y = \\sin x$ and $y = \\cos x$ cross at $x = \\frac{\\pi}{4}$. Find the acute angle between their tangent lines there, in radians. Give $3$ decimal places."), 1.231),
  mcq(m(TG, "apply-abs-sin", "apply", 8, 75, "At $x = \\pi$, $f(x) = |\\sin x|$:"),
    "Is not differentiable: the left and right slopes are $-1$ and $1$",
    [
      ["Has derivative $0$", "abssin-zero", "There's a corner, not a flat point."],
      ["Has derivative $-1$", "abssin-cos", "That's only the left-hand slope."],
      ["Is discontinuous", "abssin-discontinuous", "$|\\sin x|$ is continuous."],
    ]),
  // level 9
  short(m(TG, "transfer-initial-values", "transfer", 9, 180, "Explain why every solution of $y'' = -y$ can be written as $A\\cos x + B\\sin x$ with $A = y(0)$ and $B = y'(0)$ (assume solutions are determined by $y(0)$ and $y'(0)$)."),
    [
      ["check", "$A\\cos x + B\\sin x$ satisfies $y'' = -y$, since both $\\sin$ and $\\cos$ do and the equation is linear", 2, true],
      ["match", "At $0$ it has value $A$ and slope $B$, so choosing $A = y(0)$, $B = y'(0)$ matches any solution's initial data", 2, true],
    ]),
  short(m(TG, "transfer-why-radians", "transfer", 9, 180, "Show that $\\frac{d}{dx}\\sin(x^{\\circ}) = \\frac{\\pi}{180}\\cos(x^{\\circ})$, and explain why radians are the natural unit for calculus."),
    [
      ["chain", "$\\sin(x^{\\circ}) = \\sin\\left(\\frac{\\pi x}{180}\\right)$, so the chain rule gives the factor $\\frac{\\pi}{180}$", 2, true],
      ["natural", "Radians are the unit in which $\\frac{\\sin h}{h} \\to 1$ (arc length equals angle on the unit circle), so the derivative formulas carry no extra constants", 2, true],
    ]),
  num(m(TG, "apply-max-speed", "apply", 9, 90, "A particle has position $x(t) = 5\\cos(3t)$. What is its maximum speed?"), 15),
  mcq(m(TG, "transfer-antiderivative", "transfer", 9, 90, "Which function has derivative $\\sin(2x)$?"),
    "$\\sin^{2} x$",
    [
      ["$\\cos(2x)$", "anti-cos", "Its derivative is $-2\\sin 2x$."],
      ["$-\\cos(2x)$", "anti-negcos", "Its derivative is $2\\sin 2x$, twice too big."],
      ["$\\cos^{2} x$", "anti-cossq", "Its derivative is $-\\sin 2x$."],
    ]),
  // level 10
  short(m(TG, "transfer-shift-formula", "transfer", 10, 180, "Show that the $n$th derivative of $\\sin x$ is $\\sin\\left(x + \\frac{n\\pi}{2}\\right)$."),
    [
      ["base", "$\\frac{d}{dx}\\sin x = \\cos x = \\sin\\left(x + \\frac{\\pi}{2}\\right)$: each derivative shifts the graph left by $\\frac{\\pi}{2}$", 2, true],
      ["induction", "If the $n$th derivative is $\\sin\\left(x + \\frac{n\\pi}{2}\\right)$, differentiating gives $\\cos\\left(x + \\frac{n\\pi}{2}\\right) = \\sin\\left(x + \\frac{(n + 1)\\pi}{2}\\right)$", 2, true],
    ]),
  short(m(TG, "transfer-sec-csc", "transfer", 10, 180, "Derive $\\frac{d}{dx}\\sec x = \\sec x\\tan x$ and $\\frac{d}{dx}\\csc x = -\\csc x\\cot x$."),
    [
      ["sec", "Reciprocal rule on $\\frac{1}{\\cos x}$: $\\frac{\\sin x}{\\cos^{2} x} = \\sec x\\tan x$", 2, true],
      ["csc", "Reciprocal rule on $\\frac{1}{\\sin x}$: $-\\frac{\\cos x}{\\sin^{2} x} = -\\csc x\\cot x$", 2, true],
    ]),
  num(m(TG, "transfer-leibniz-trig", "transfer", 10, 120, "Find the $100$th derivative of $x\\sin x$ at $x = 0$."), -100),
  mcq(m(TG, "transfer-frequency", "transfer", 10, 120, "For $y = A\\sin(\\omega t)$, $y'' =$"),
    "$-\\omega^{2}y$",
    [
      ["$-\\omega y$", "freq-one-factor", "Each derivative brings down one factor of $\\omega$; two derivatives give $\\omega^{2}$."],
      ["$\\omega^{2}y$", "freq-sign", "The second derivative of $\\sin$ is $-\\sin$."],
      ["$-y$", "freq-missing", "The frequency enters through the chain rule."],
    ]),
];

// ---------------------------------------------------------------------------
// transcendental-derivatives — now derivatives of inverse functions
// ---------------------------------------------------------------------------
const TD = "transcendental-derivatives";
const inverseFunctions: Item[] = [
  // level 1
  mcq(m(TD, "recall-inverse-rule", "recall", 1, 15, "The inverse function rule says $(f^{-1})'(y) =$"),
    "$\\frac{1}{f'(f^{-1}(y))}$",
    [
      ["$\\frac{1}{f'(y)}$", "invrule-wrong-point", "$f'$ is evaluated at the input $f^{-1}(y)$, not at $y$."],
      ["$-f'(y)$", "invrule-negative", "Reflection inverts the slope; it doesn't negate it."],
      ["$f'(f^{-1}(y))$", "invrule-no-reciprocal", "The slopes are reciprocals."],
    ]),
  mcq(m(TD, "recall-arcsin", "recall", 1, 15, "$\\frac{d}{dx}\\arcsin x =$"),
    "$\\frac{1}{\\sqrt{1 - x^{2}}}$",
    [
      ["$\\frac{1}{1 + x^{2}}$", "arcsin-arctan", "That's $\\arctan'$."],
      ["$-\\frac{1}{\\sqrt{1 - x^{2}}}$", "arcsin-arccos", "That's $\\arccos'$; $\\arcsin$ is increasing."],
      ["$\\cos x$", "arcsin-sin", "That's the derivative of $\\sin x$."],
    ]),
  mcq(m(TD, "apply-arctan", "apply", 1, 15, "$\\frac{d}{dx} \\arctan x =$"),
    "$\\frac{1}{1 + x^{2}}$",
    [
      ["$\\sec^{2} x$", "arctan-tan", "That's the derivative of $\\tan x$."],
      ["$-\\frac{1}{1 + x^{2}}$", "arctan-sign", "$\\arctan$ is increasing."],
      ["$\\frac{1}{\\sqrt{1 - x^{2}}}$", "arctan-arcsin", "That's the derivative of $\\arcsin x$."],
    ]),
  mcq(m(TD, "recall-reflection", "recall", 1, 15, "Reflecting a graph in the line $y = x$ changes a tangent slope $m$ (with $m \\ne 0$) into:"),
    "$\\frac{1}{m}$",
    [
      ["$-m$", "reflect-negate", "Reflection swaps rise and run; it doesn't flip the sign."],
      ["$-\\frac{1}{m}$", "reflect-perpendicular", "That's the slope of a perpendicular line."],
      ["$m$", "reflect-same", "Rise and run trade places."],
    ]),
  // level 2
  num(m(TD, "apply-linear-inverse", "apply", 2, 20, "For $f(x) = 2x + 3$, find $(f^{-1})'(5)$."), 0.5),
  num(m(TD, "apply-cube-inverse", "apply", 2, 20, "For $f(x) = x^{3}$, find $(f^{-1})'(8)$. Give $4$ decimal places."), 0.0833),
  num(m(TD, "apply-arctan-at-1", "apply", 2, 20, "Find $\\frac{d}{dx}\\arctan x$ at $x = 1$."), 0.5),
  mcq(m(TD, "recall-arccos", "recall", 2, 20, "$\\frac{d}{dx}\\arccos x =$"),
    "$-\\frac{1}{\\sqrt{1 - x^{2}}}$",
    [
      ["$\\frac{1}{\\sqrt{1 - x^{2}}}$", "arccos-sign", "$\\arccos$ decreases from $\\pi$ to $0$."],
      ["$-\\sin x$", "arccos-cos", "That's the derivative of $\\cos x$."],
      ["$-\\frac{1}{1 + x^{2}}$", "arccos-arctan", "That's the shape of $\\arctan'$, with a sign flip."],
    ]),
  // level 3
  num(m(TD, "apply-arcsin", "apply", 3, 25, "Find $\\frac{d}{dx} \\arcsin x$ at $x = 0.6$."), 1.25),
  num(m(TD, "apply-quintic-inverse", "apply", 3, 25, "Let $f(x) = x^{5} + x$ and $g = f^{-1}$. Find $g'(2)$. Give $4$ decimal places."), 0.1667),
  num(m(TD, "apply-arctan-2x", "apply", 3, 25, "Find $\\frac{d}{dx}\\arctan(2x)$ at $x = 0$."), 2),
  mcq(m(TD, "apply-root-as-inverse", "apply", 3, 25, "Treating $\\sqrt{x}$ as the inverse of $x^{2}$ on $x \\ge 0$, the inverse function rule gives $\\frac{d}{dx}\\sqrt{x} =$"),
    "$\\frac{1}{2\\sqrt{x}}$",
    [
      ["$2\\sqrt{x}$", "rootinv-no-reciprocal", "The inverse's slope is the reciprocal of $2y$ at $y = \\sqrt{x}$."],
      ["$\\frac{1}{2x}$", "rootinv-wrong-point", "Evaluate $f'(y) = 2y$ at $y = \\sqrt{x}$, not at $x$."],
      ["$\\frac{\\sqrt{x}}{2}$", "rootinv-inverted", "It's $1$ over $2\\sqrt{x}$."],
    ]),
  // level 4
  num(m(TD, "apply-inverse-exp-plus-x", "apply", 4, 30, "Let $f(x) = e^{x} + x$ and $g = f^{-1}$. Find $g'(1)$."), 0.5),
  num(m(TD, "apply-arcsin-half", "apply", 4, 30, "Find $\\frac{d}{dx}\\arcsin\\frac{x}{2}$ at $x = 1$. Give $3$ decimal places."), 0.577),
  num(m(TD, "apply-x-arctan", "apply", 4, 30, "For $f(x) = x\\arctan x$, find $f'(1)$. Give $3$ decimal places."), 1.285),
  mcq(m(TD, "apply-inverse-table", "apply", 4, 30, "$f(1) = 3$, $f'(1) = 4$, $f(3) = 7$ and $f'(3) = 2$. Then $(f^{-1})'(3) =$"),
    "$\\frac{1}{4}$",
    [
      ["$\\frac{1}{2}$", "invtable-wrong-point", "$f^{-1}(3) = 1$, so use $f'(1) = 4$, not $f'(3)$."],
      ["$4$", "invtable-no-reciprocal", "The inverse's slope is the reciprocal."],
      ["$-\\frac{1}{4}$", "invtable-sign", "There's no sign change."],
    ]),
  // level 5
  short(m(TD, "explain-inverse-rule", "explain", 5, 90, "Prove the inverse function rule $(f^{-1})'(y) = \\frac{1}{f'(f^{-1}(y))}$ using the chain rule (assume $f^{-1}$ is differentiable)."),
    [
      ["chain", "Differentiates $f(f^{-1}(y)) = y$ to get $f'(f^{-1}(y)) \\cdot (f^{-1})'(y) = 1$", 3, true],
      ["solve", "Divides by $f'(f^{-1}(y))$, which must be nonzero", 1, true],
    ]),
  mcq(m(TD, "apply-arcsin-edges", "apply", 5, 40, "Where on $[-1, 1]$ is $\\arcsin x$ not differentiable?"),
    "At $x = \\pm 1$, where its tangent is vertical",
    [
      ["At $x = 0$", "edges-zero", "The slope there is $1$."],
      ["Nowhere", "edges-nowhere", "$\\frac{1}{\\sqrt{1 - x^{2}}}$ blows up at $\\pm 1$."],
      ["Everywhere", "edges-everywhere", "It's differentiable on the open interval $(-1, 1)$."],
    ]),
  mcq(m(TD, "apply-arcsin-plus-arccos", "apply", 5, 40, "$\\frac{d}{dx}\\left(\\arcsin x + \\arccos x\\right) =$"),
    "$0$",
    [
      ["$\\frac{2}{\\sqrt{1 - x^{2}}}$", "plus-double", "$\\arccos' = -\\arcsin'$, so they cancel."],
      ["$\\frac{\\pi}{2}$", "plus-value", "That's the (constant) value of the sum."],
      ["$1$", "plus-one", "The derivatives cancel exactly."],
    ]),
  num(m(TD, "apply-arctan-exp", "apply", 5, 40, "Find $\\frac{d}{dx}\\arctan(e^{x})$ at $x = 0$."), 0.5),
  // level 6
  short(m(TD, "explain-arcsin", "explain", 6, 120, "Derive $\\frac{d}{dx} \\arcsin x = \\frac{1}{\\sqrt{1 - x^{2}}}$ and explain why the positive square root is correct."),
    [
      ["implicit", "With $y = \\arcsin x$, $\\sin y = x$, so $\\cos y \\cdot y' = 1$", 2, true],
      ["root", "$\\cos y = \\sqrt{1 - x^{2}}$ with the positive root because $y \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$, where $\\cos y \\ge 0$", 2, true],
    ]),
  num(m(TD, "apply-arcsin-root", "apply", 6, 45, "Find $\\frac{d}{dx}\\arcsin\\sqrt{x}$ at $x = \\frac{1}{4}$. Give $3$ decimal places."), 1.155),
  num(m(TD, "apply-cubic-inverse", "apply", 6, 45, "Let $f(x) = x^{3} + 2x - 1$ and $g = f^{-1}$. Find $g'(2)$."), 0.2),
  mcq(m(TD, "apply-inverse-vertical", "apply", 6, 45, "The inverse of a differentiable one-to-one $f$ fails to be differentiable at $y_0 = f(x_0)$ when:"),
    "$f'(x_0) = 0$, which gives the inverse a vertical tangent",
    [
      ["$f(x_0) = 0$", "invvert-root", "A zero of $f$ is just the point $(x_0, 0)$."],
      ["$f''(x_0) = 0$", "invvert-second", "The first derivative decides."],
      ["$x_0 = 0$", "invvert-origin", "The location doesn't matter; the slope does."],
    ]),
  // level 7
  short(m(TD, "explain-arctan", "explain", 7, 120, "Derive $\\frac{d}{dx}\\arctan x = \\frac{1}{1 + x^{2}}$."),
    [
      ["setup", "With $y = \\arctan x$, $\\tan y = x$, so $\\sec^{2} y \\cdot y' = 1$", 2, true],
      ["identity", "Uses $\\sec^{2} y = 1 + \\tan^{2} y = 1 + x^{2}$", 2, true],
    ]),
  num(m(TD, "transfer-arctan-sum", "transfer", 7, 60, "Find $\\frac{d}{dx}\\arctan\\frac{1 + x}{1 - x}$ at $x = 0$."), 1),
  num(m(TD, "apply-arctan-tangent", "apply", 7, 60, "Find the $y$-intercept of the tangent line to $y = \\arctan x$ at $x = 1$. Give $3$ decimal places."), 0.285),
  mcq(m(TD, "transfer-arctan-reciprocal", "transfer", 7, 60, "For $x > 0$, $\\frac{d}{dx} \\arctan\\left(\\frac{1}{x}\\right)$ equals:"),
    "$-\\frac{1}{1 + x^{2}}$, so $\\arctan x + \\arctan\\frac{1}{x}$ is constant",
    [
      ["$\\frac{1}{1 + x^{2}}$", "arctanrec-sign", "The inner derivative $-\\frac{1}{x^{2}}$ brings a minus sign."],
      ["$-\\frac{1}{x^{2}}$", "arctanrec-inner-only", "Multiply by the outer derivative $\\frac{1}{1 + x^{-2}}$."],
      ["$\\frac{1}{x^{2} + x^{-2}}$", "arctanrec-no-inner", "Missing the chain-rule factor and its sign."],
    ]),
  // level 8
  short(m(TD, "explain-arccos", "explain", 8, 150, "Explain why $\\arcsin x + \\arccos x = \\frac{\\pi}{2}$ on $[-1, 1]$, and use it to find $\\frac{d}{dx}\\arccos x$."),
    [
      ["identity", "If $\\sin\\theta = x$ with $\\theta \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$, then $\\cos\\left(\\frac{\\pi}{2} - \\theta\\right) = x$ with $\\frac{\\pi}{2} - \\theta \\in [0, \\pi]$, so $\\arccos x = \\frac{\\pi}{2} - \\arcsin x$", 2, true],
      ["derivative", "Differentiating gives $\\arccos' x = -\\frac{1}{\\sqrt{1 - x^{2}}}$", 2, true],
    ]),
  num(m(TD, "apply-arcsin-squared", "apply", 8, 75, "Find $\\frac{d}{dx}(\\arcsin x)^{2}$ at $x = \\frac{1}{2}$. Give $3$ decimal places."), 1.209),
  num(m(TD, "apply-inverse-second", "apply", 8, 75, "Using $(f^{-1})''(y) = -\\frac{f''(x)}{f'(x)^{3}}$ with $x = f^{-1}(y)$, find $(f^{-1})''(2)$ for $f(x) = x^{3} + x$. Give $4$ decimal places."), -0.0938),
  mcq(m(TD, "recall-range-choice", "recall", 8, 75, "$\\arcsin$ takes values in $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$ because:"),
    "$\\sin$ is one-to-one there, and $\\cos \\ge 0$ there, fixing the sign of its derivative",
    [
      ["$\\sin$ is positive there", "range-positive", "$\\sin$ is negative on $\\left[-\\frac{\\pi}{2}, 0\\right)$."],
      ["It's the only interval where $\\sin$ is continuous", "range-continuous", "$\\sin$ is continuous everywhere."],
      ["It makes $\\arcsin$ periodic", "range-periodic", "An inverse on a restricted interval isn't periodic."],
    ]),
  // level 9
  short(m(TD, "transfer-inverse-second", "transfer", 9, 180, "Derive $(f^{-1})''(y) = -\\frac{f''(x)}{f'(x)^{3}}$ where $x = f^{-1}(y)$."),
    [
      ["start", "Writes $(f^{-1})'(y) = \\frac{1}{f'(f^{-1}(y))}$", 1, true],
      ["differentiate", "Differentiates in $y$ with the chain rule: $-\\frac{f''(f^{-1}(y)) \\cdot (f^{-1})'(y)}{f'(f^{-1}(y))^{2}} = -\\frac{f''(x)}{f'(x)^{3}}$", 3, true],
    ]),
  short(m(TD, "transfer-arctan-identity", "transfer", 9, 180, "Use derivatives to show $\\arctan x + \\arctan\\frac{1}{x} = \\frac{\\pi}{2}$ for $x > 0$. What is the sum for $x < 0$?"),
    [
      ["derivative", "The derivative of the sum is $\\frac{1}{1 + x^{2}} - \\frac{1}{1 + x^{2}} = 0$, so it's constant on $(0, \\infty)$; at $x = 1$ it's $\\frac{\\pi}{4} + \\frac{\\pi}{4}$", 2, true],
      ["negative", "It's constant on $(-\\infty, 0)$ too, but a different constant: $-\\frac{\\pi}{2}$ (check $x = -1$) — the domain has two pieces", 2, true],
    ]),
  num(m(TD, "transfer-double-angle-arcsin", "transfer", 9, 90, "Find $\\frac{d}{dx}\\arcsin\\left(2x\\sqrt{1 - x^{2}}\\right)$ at $x = 0$."), 2),
  mcq(m(TD, "transfer-arcsin-sin", "transfer", 9, 90, "For $\\frac{\\pi}{2} < x < \\frac{3\\pi}{2}$, $\\frac{d}{dx}\\arcsin(\\sin x) =$"),
    "$-1$",
    [
      ["$1$", "arcsinsin-identity", "$\\arcsin(\\sin x) = x$ only on $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$; here it equals $\\pi - x$."],
      ["$0$", "arcsinsin-zero", "It isn't constant."],
      ["It is undefined", "arcsinsin-undefined", "It's differentiable on that open interval."],
    ]),
  // level 10
  short(m(TD, "transfer-inverse-differentiable", "transfer", 10, 180, "Sketch why, if $f$ is differentiable and strictly increasing with $f'(x_0) > 0$, its inverse is differentiable at $y_0 = f(x_0)$."),
    [
      ["continuity", "The inverse of a continuous strictly monotone function is continuous, so as $y \\to y_0$, $x = f^{-1}(y) \\to x_0$", 2, true],
      ["quotient", "The inverse's difference quotient is $\\frac{x - x_0}{f(x) - f(x_0)}$, the reciprocal of $f$'s, which tends to $\\frac{1}{f'(x_0)}$", 2, true],
    ]),
  short(m(TD, "transfer-nondifferentiable-inverse", "transfer", 10, 180, "Give a differentiable bijection $\\mathbb{R} \\to \\mathbb{R}$ whose inverse is not differentiable everywhere, and explain."),
    [
      ["example", "$f(x) = x^{3}$, with inverse $x^{1/3}$", 2, true],
      ["why", "$f'(0) = 0$, so the inverse has a vertical tangent at $0$: its difference quotient $h^{-2/3}$ blows up", 2, true],
    ]),
  num(m(TD, "transfer-lambert", "transfer", 10, 120, "Let $f(x) = xe^{x}$ for $x > -1$ and $g = f^{-1}$. Find $g'(e)$. Give $3$ decimal places."), 0.184),
  mcq(m(TD, "transfer-arctan-integral", "transfer", 10, 120, "Since $\\arctan' x = \\frac{1}{1 + x^{2}}$, the integral $\\int_0^{1} \\frac{dx}{1 + x^{2}}$ equals:"),
    "$\\frac{\\pi}{4}$",
    [
      ["$\\frac{\\pi}{2}$", "arctanint-half", "$\\arctan 1 = \\frac{\\pi}{4}$."],
      ["$\\ln 2$", "arctanint-log", "That would be $\\int_0^{1} \\frac{dx}{1 + x}$."],
      ["$1$", "arctanint-one", "$\\arctan 1 - \\arctan 0 = \\frac{\\pi}{4}$."],
    ]),
];

export const calc09Items: Item[] = [...exponential, ...logarithmic, ...trig, ...inverseFunctions];
