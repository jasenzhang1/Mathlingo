import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./opt-shared";

/**
 * Optimization course, part 2: the secant method, Newton's method for
 * minimisation, line search, and the convergence theory of gradient descent.
 * Forty questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// secant-method
// ---------------------------------------------------------------------------
const SC = "secant-method";
const secant: Item[] = [
  // level 1
  mcq(m(SC, "recall-formula", "recall", 1, 15, "The secant method updates $x_{n+1} = x_n - f(x_n)\\,\\cdot$:"),
    "$\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$",
    [
      ["$\\frac{1}{f'(x_n)}$", "formula-newton", "That's Newton–Raphson."],
      ["$\\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$", "formula-inverted", "That's the slope; the step divides by it."],
      ["$\\frac{1}{2}$", "formula-half", "That's not the secant method."],
    ]),
  mcq(m(SC, "recall-two-points", "recall", 1, 15, "How many starting points does the secant method need?"),
    "Two",
    [
      ["One", "two-one", "Newton needs one; the secant line needs two."],
      ["Three", "two-three", "That's inverse quadratic interpolation or Muller's method."],
      ["A bracketing interval with a sign change", "two-bracket", "The two points needn't bracket the root."],
    ]),
  mcq(m(SC, "recall-order", "recall", 1, 15, "Near a simple root, the secant method converges with order about:"),
    "$1.618$, the golden ratio",
    [
      ["$1$", "order-one", "It's superlinear."],
      ["$2$", "order-two", "That's Newton's order."],
      ["$3$", "order-three", "That's Halley's method."],
    ]),
  mcq(m(SC, "recall-no-derivative", "recall", 1, 15, "The main practical advantage of the secant method over Newton–Raphson is that it:"),
    "Needs no derivative — only one new function value per step",
    [
      ["Converges faster per step", "advantage-faster", "Newton converges faster per step."],
      ["Always keeps a bracket", "advantage-bracket", "Plain secant can leave any bracket."],
      ["Works for discontinuous functions", "advantage-discontinuous", "It assumes smoothness."],
    ]),
  // level 2
  num(m(SC, "apply-first-step", "apply", 2, 20, "Apply one secant step to $f(x) = x^{2} - 2$ with $x_0 = 1$ and $x_1 = 2$. Give $4$ decimal places."), 1.3333),
  num(m(SC, "apply-slope", "apply", 2, 20, "What is the slope of the secant line through $(1, -1)$ and $(2, 2)$?"), 3),
  num(m(SC, "apply-linear", "apply", 2, 20, "Apply one secant step to the linear $f(x) = 2x - 4$ with $x_0 = 0$ and $x_1 = 1$."), 2),
  mcq(m(SC, "apply-golden", "apply", 2, 20, "The secant method's order $p$ satisfies $p^{2} = p + 1$. Its positive root is:"),
    "$\\frac{1 + \\sqrt{5}}{2}$",
    [
      ["$\\sqrt{2}$", "golden-sqrt2", "That doesn't satisfy $p^{2} = p + 1$."],
      ["$2$", "golden-two", "$4 \\ne 3$."],
      ["$\\frac{\\sqrt{5} - 1}{2}$", "golden-conjugate", "That's $\\varphi - 1$, which solves a different equation."],
    ]),
  // level 3
  num(m(SC, "apply-second-step", "apply", 3, 25, "Continue $x^{2} - 2$ with $x_1 = 2$ and $x_2 = \\frac{4}{3}$. What is $x_3$?"), 1.4),
  num(m(SC, "apply-x2-minus-4", "apply", 3, 25, "Apply one secant step to $f(x) = x^{2} - 4$ with $x_0 = 1$ and $x_1 = 3$."), 1.75),
  num(m(SC, "apply-phi", "apply", 3, 25, "What is $\\varphi = \\frac{1 + \\sqrt{5}}{2}$? Give $3$ decimal places."), 1.618),
  num(m(SC, "apply-efficiency-newton", "apply", 3, 25, "If evaluating $f'$ costs as much as $f$, Newton's order per evaluation (efficiency index) is $2^{1/2}$. What is it? Give $4$ decimal places."), 1.4142),
  // level 4
  num(m(SC, "apply-two-steps-order", "apply", 4, 30, "Two secant steps cost the same as one Newton step (when $f'$ costs as much as $f$) and achieve order $\\varphi^{2}$. What is it? Give $3$ decimal places."), 2.618),
  num(m(SC, "apply-error-product", "apply", 4, 30, "Near the root, $e_{n+1} \\approx Ce_ne_{n-1}$. With $C = 0.35$, $e_n = 0.014$ and $e_{n-1} = 0.08$, what is $e_{n+1}$? Give $6$ decimal places."), 0.000392),
  mcq(m(SC, "apply-brent", "apply", 4, 30, "Which root finder is the usual library default, combining secant-type steps with bisection?"),
    "Brent's method",
    [
      ["Pure Newton–Raphson", "brent-newton", "It needs derivatives and has no safeguard."],
      ["Gradient descent", "brent-gd", "That minimises, it doesn't find roots."],
      ["The simplex method", "brent-simplex", "That's for linear programs."],
    ]),
  mcq(m(SC, "apply-leave-bracket", "apply", 4, 30, "The two starting points bracket a root. Can the plain secant method's next iterate fall outside the bracket?"),
    "Yes — unlike regula falsi, it doesn't track signs, so iterates can leave the bracket",
    [
      ["No, it always stays inside", "leave-never", "Only bracketing variants guarantee that."],
      ["Only if $f$ is linear", "leave-linear", "For linear $f$ it lands exactly on the root."],
      ["Only when $f'$ is known", "leave-derivative", "It doesn't use $f'$."],
    ]),
  // level 5
  short(m(SC, "explain-order", "explain", 5, 90, "Explain where the order $\\varphi \\approx 1.618$ of the secant method comes from."),
    [
      ["recursion", "The error satisfies $e_{n+1} \\approx Ce_ne_{n-1}$, because the slope uses the two latest points", 2, true],
      ["solve", "Trying $e_{n+1} \\approx Ke_n^{p}$ gives $p = 1 + \\frac{1}{p}$, i.e. $p^{2} = p + 1$, with positive root $\\varphi$", 2, true],
    ]),
  mcq(m(SC, "apply-cancellation", "apply", 5, 40, "Why can the secant slope become inaccurate near convergence?"),
    "$f(x_n) - f(x_{n-1})$ is a difference of two tiny, nearly equal numbers, so round-off dominates",
    [
      ["The function becomes discontinuous", "cancellation-discontinuous", "Continuity doesn't change."],
      ["The step becomes too large", "cancellation-large", "Steps get small, not large."],
      ["The derivative becomes zero", "cancellation-derivative", "At a simple root $f'$ is nonzero."],
    ]),
  num(m(SC, "apply-exp", "apply", 5, 40, "Apply one secant step to $f(x) = e^{x} - 2$ with $x_0 = 0$ and $x_1 = 1$. Give $4$ decimal places."), 0.582),
  mcq(m(SC, "apply-illinois", "apply", 5, 40, "The Illinois modification of regula falsi:"),
    "Halves the stored function value at an endpoint that stays fixed, so the stuck side gets moved",
    [
      ["Removes the bracket", "illinois-bracket", "It keeps the bracket."],
      ["Adds a derivative evaluation", "illinois-derivative", "It's still derivative-free."],
      ["Uses the midpoint every step", "illinois-midpoint", "That's bisection."],
    ]),
  // level 6
  short(m(SC, "explain-cost", "explain", 6, 120, "When is the secant method cheaper overall than Newton–Raphson, even though it needs more iterations?"),
    [
      ["derivative-cost", "When $f'$ is expensive (or unavailable), since secant needs one $f$ per step while Newton needs $f$ and $f'$", 2, true],
      ["efficiency", "Per function evaluation, secant achieves order about $1.618$ versus Newton's $\\sqrt{2} \\approx 1.414$ if $f'$ costs as much as $f$", 2, true],
    ]),
  num(m(SC, "apply-budget", "apply", 6, 45, "With a budget of $10$ evaluations, and $f'$ costing the same as $f$, how many Newton steps can be taken?"), 5),
  num(m(SC, "apply-slope-near", "apply", 6, 45, "For $f(x) = x^{2} - 2$, what is the secant slope through $x = 1.4$ and $x = 1.41463$? Give $3$ decimal places."), 2.815),
  mcq(m(SC, "apply-broyden", "apply", 6, 45, "The multivariate generalisation of the secant method for solving $\\mathbf{F}(\\mathbf{x}) = \\mathbf{0}$ is:"),
    "Broyden's method, which updates a Jacobian approximation to satisfy $B_{k+1}\\mathbf{s}_k = \\mathbf{y}_k$",
    [
      ["The simplex method", "broyden-simplex", "That's for linear programming."],
      ["Bisection on each coordinate", "broyden-bisection", "Brackets don't generalise that way."],
      ["Gradient descent", "broyden-gd", "That doesn't use secant information."],
    ]),
  // level 7
  num(m(SC, "transfer-secant-curvature", "transfer", 7, 60, "Estimate the curvature of $f$ from $f'(x) = x^{3}$ at $x_0 = 1$ and $x_1 = 2$: what is $\\frac{f'(x_1) - f'(x_0)}{x_1 - x_0}$?"), 7),
  short(m(SC, "transfer-iqi", "transfer", 7, 120, "What is inverse quadratic interpolation, and why do root finders interpolate $x$ as a function of $f$ rather than the reverse?"),
    [
      ["what", "Fit a quadratic through three points $(f_i, x_i)$, giving $x$ as a function of $f$, and evaluate it at $f = 0$", 2, true],
      ["why", "The new estimate is then a direct evaluation, with no quadratic equation to solve and no complex roots; it converges with order about $1.84$", 2, true],
    ]),
  num(m(SC, "transfer-cubic", "transfer", 7, 60, "Apply one secant step to $f(x) = x^{3} - x - 2$ with $x_0 = 1$ and $x_1 = 2$. Give $4$ decimal places."), 1.3333),
  mcq(m(SC, "transfer-equal-values", "transfer", 7, 60, "What happens if $f(x_n) = f(x_{n-1})$?"),
    "The secant line is horizontal and the step divides by zero, so the method must guard against it",
    [
      ["It has found the root", "equal-root", "Equal values needn't be zero."],
      ["It takes a bisection step automatically", "equal-bisection", "Plain secant has no fallback."],
      ["Nothing — the step is $0$", "equal-zero", "The denominator is zero."],
    ]),
  // level 8
  short(m(SC, "transfer-irr", "transfer", 8, 120, "Why is the secant method (or Brent's) a natural choice for computing a bond's yield or an investment's internal rate of return?"),
    [
      ["equation", "Yield solves price$(r)$ $=$ market price, a smooth one-dimensional equation that is cheap to evaluate", 2, true],
      ["derivative", "Its derivative is available but fiddly; secant needs none and converges superlinearly, and the price is monotone so bracketing is easy", 2, true],
    ]),
  num(m(SC, "transfer-yield", "transfer", 8, 60, "Solve $\\frac{100}{1 + r} - 95 = 0$ by one secant step from $r_0 = 0$ and $r_1 = 0.1$. Give $4$ decimal places."), 0.055),
  num(m(SC, "transfer-digit-growth", "transfer", 8, 60, "With order $1.618$, the number of correct digits grows by about that factor per step. Starting from $2$ correct digits, about how many after $3$ steps (to the nearest whole number)?"), 8),
  mcq(m(SC, "transfer-when-newton", "transfer", 8, 60, "When is Newton–Raphson clearly preferable to the secant method?"),
    "When $f'$ is cheap relative to $f$ (e.g. from automatic differentiation alongside $f$)",
    [
      ["When $f'$ is unavailable", "when-unavailable", "Then Newton can't be used directly."],
      ["When function evaluations are very expensive and $f'$ costs as much", "when-expensive", "Then secant is more efficient."],
      ["When there is no good starting point", "when-no-start", "Both need a good start."],
    ]),
  // level 9
  short(m(SC, "transfer-steffensen", "transfer", 9, 150, "Steffensen's method replaces $f'(x_n)$ with $\\frac{f(x_n + f(x_n)) - f(x_n)}{f(x_n)}$. What does it achieve, and at what cost?"),
    [
      ["achieve", "Quadratic convergence like Newton without needing derivatives", 2, true],
      ["cost", "Two function evaluations per step, and it can be less robust far from the root", 2, true],
    ]),
  num(m(SC, "transfer-broyden-1d", "transfer", 9, 75, "In one dimension, Broyden's update gives $B = \\frac{y}{s}$. With step $s = 0.5$ and change in $f$ of $y = 1.5$, what is $B$?"), 3),
  mcq(m(SC, "transfer-muller", "transfer", 9, 75, "Muller's method fits a parabola through three points. A notable feature is that it:"),
    "Can produce complex iterates, so it can find complex roots from real starting points",
    [
      ["Needs derivatives", "muller-derivatives", "It's derivative-free."],
      ["Converges linearly", "muller-linear", "Its order is about $1.84$."],
      ["Requires a bracket", "muller-bracket", "It doesn't."],
    ]),
  num(m(SC, "transfer-efficiency-ratio", "transfer", 9, 75, "What is the ratio of the secant method's efficiency index ($1.618$) to Newton's ($1.4142$)? Give $3$ decimal places."), 1.144),
  // level 10
  short(m(SC, "transfer-to-bfgs", "transfer", 10, 180, "Explain how the secant idea carries over to quasi-Newton optimisation methods such as BFGS."),
    [
      ["condition", "For minimisation, apply the secant idea to $\\nabla f$: require the Hessian approximation to satisfy $B_{k+1}\\mathbf{s}_k = \\mathbf{y}_k$, the change in gradient over the step", 2, true],
      ["update", "In $n$ dimensions this doesn't determine $B$, so BFGS picks the closest symmetric positive definite update (a rank-two change), giving superlinear convergence without Hessians", 2, true],
    ]),
  mcq(m(SC, "transfer-double-root", "transfer", 10, 90, "At a double root, the secant method:"),
    "Slows to linear convergence (with rate about $0.618$)",
    [
      ["Keeps order $1.618$", "double-keeps", "Multiplicity destroys superlinear convergence."],
      ["Converges quadratically", "double-quadratic", "It gets slower, not faster."],
      ["Always diverges", "double-diverges", "It still converges, slowly."],
    ]),
  short(m(SC, "transfer-guards", "transfer", 10, 180, "List safeguards a production implementation of the secant method should include."),
    [
      ["numerics", "Guard against a zero or tiny denominator, and stop when successive iterates (or $|f|$) meet a tolerance", 2, true],
      ["robustness", "Cap the iteration count, keep a bracket when one is known and fall back to bisection if a step leaves it or fails to shrink it", 2, true],
    ]),
  num(m(SC, "transfer-double-rate", "transfer", 10, 90, "At a double root, the secant error shrinks by about $\\frac{\\sqrt{5} - 1}{2}$ per step. What is that? Give $3$ decimal places."), 0.618),
];

// ---------------------------------------------------------------------------
// newton-method-optimization
// ---------------------------------------------------------------------------
const NO = "newton-method-optimization";
const newtonOpt: Item[] = [
  // level 1
  mcq(m(NO, "recall-step", "recall", 1, 15, "The Newton step for minimising $f$ solves:"),
    "$\\nabla^{2} f(\\mathbf{x})\\,\\mathbf{p} = -\\nabla f(\\mathbf{x})$",
    [
      ["$\\mathbf{p} = -\\nabla f(\\mathbf{x})$", "step-gradient", "That's steepest descent."],
      ["$\\nabla f(\\mathbf{x})\\,\\mathbf{p} = -f(\\mathbf{x})$", "step-root", "That's root finding on $f$."],
      ["$\\nabla^{2} f(\\mathbf{x})\\,\\mathbf{p} = \\mathbf{0}$", "step-zero", "The gradient must appear on the right."],
    ]),
  mcq(m(NO, "recall-nr-link", "recall", 1, 15, "Newton's method for minimisation is Newton–Raphson applied to:"),
    "The equation $\\nabla f(\\mathbf{x}) = \\mathbf{0}$",
    [
      ["The equation $f(\\mathbf{x}) = 0$", "nr-link-f", "That finds zeros of $f$, not minimisers."],
      ["The Hessian", "nr-link-hessian", "The Hessian is the Jacobian of the equation being solved."],
      ["A linear program", "nr-link-lp", "Unrelated."],
    ]),
  mcq(m(NO, "recall-model", "recall", 1, 15, "Each Newton step minimises:"),
    "A quadratic model of $f$ built from its gradient and Hessian at the current point",
    [
      ["A linear model of $f$", "model-linear", "A linear model has no minimiser."],
      ["$f$ itself exactly", "model-exact", "Only if $f$ is quadratic."],
      ["A random approximation", "model-random", "The model is the second-order Taylor expansion."],
    ]),
  mcq(m(NO, "recall-quadratic-one-step", "recall", 1, 15, "On a strictly convex quadratic, a full Newton step from any point:"),
    "Lands exactly on the minimiser",
    [
      ["Halves the distance to it", "quadratic-halves", "The model is exact, so one step suffices."],
      ["May diverge", "quadratic-diverge", "Not for a strictly convex quadratic."],
      ["Needs a line search to converge", "quadratic-linesearch", "The full step is already exact."],
    ]),
  // level 2
  num(m(NO, "apply-1d", "apply", 2, 20, "One Newton step on $f(x) = x^{2} - 4x$ from $x_0 = 0$ gives what?"), 2),
  num(m(NO, "apply-quartic", "apply", 2, 20, "One Newton step on $f(x) = x^{4}$ from $x_0 = 1$ gives what? Give $4$ decimal places."), 0.6667),
  num(m(NO, "apply-2d-quadratic", "apply", 2, 20, "One Newton step on $f(x, y) = x^{2} + 2y^{2} - 4x - 8y$ from any start gives the minimiser. What is its $y$-coordinate?"), 2),
  mcq(m(NO, "apply-descent-condition", "apply", 2, 20, "The Newton direction is guaranteed to be a descent direction when:"),
    "The Hessian is positive definite",
    [
      ["The gradient is large", "descent-gradient", "Gradient size doesn't fix the direction's sign."],
      ["The Hessian is indefinite", "descent-indefinite", "Then it may point uphill."],
      ["Always", "descent-always", "It can point uphill in non-convex regions."],
    ]),
  // level 3
  num(m(NO, "apply-log-step1", "apply", 3, 25, "Minimise $f(x) = x - \\ln x$ by Newton from $x_0 = 0.5$; the update is $x_{k+1} = 2x_k - x_k^{2}$. What is $x_1$?"), 0.75),
  num(m(NO, "apply-log-step2", "apply", 3, 25, "Continuing, what is $x_2$?"), 0.9375),
  num(m(NO, "apply-quartic-two", "apply", 3, 25, "Newton on $f(x) = x^{4}$ multiplies $x$ by $\\frac{2}{3}$ each step. Starting at $x_0 = 1$, what is $x_2$? Give $4$ decimal places."), 0.4444),
  num(m(NO, "apply-decrement", "apply", 3, 25, "The Newton decrement squared is $\\lambda^{2} = \\frac{f'(x)^{2}}{f''(x)}$ in 1-D. What is it for $f(x) = x^{2}$ at $x = 3$?"), 18),
  // level 4
  num(m(NO, "apply-2d-step", "apply", 4, 30, "For $f(x, y) = x^{2} + xy + y^{2} - 3x$, take a Newton step from $(0, 0)$. What is the new $x$?"), 2),
  num(m(NO, "apply-cost-scaling", "apply", 4, 30, "Solving the Newton system by dense factorisation costs $O(n^{3})$. By what factor does that cost grow when $n$ doubles?"), 8),
  mcq(m(NO, "apply-affine", "apply", 4, 30, "Newton's method is affine invariant, meaning:"),
    "A linear change of variables doesn't change the iterates (mapped back to the original variables)",
    [
      ["It converges in one step on any function", "affine-one-step", "Only on quadratics."],
      ["It ignores the Hessian", "affine-ignores", "It relies on it."],
      ["Its step size is always $1$", "affine-step", "Damped versions use smaller steps."],
    ]),
  num(m(NO, "apply-damped", "apply", 4, 30, "A damped Newton step with $\\alpha = 0.5$ on $f(x) = x^{2} - 4x$ from $x_0 = 0$ gives what?"), 1),
  // level 5
  short(m(NO, "explain-descent", "explain", 5, 90, "Show that the Newton direction is a descent direction when the Hessian is positive definite."),
    [
      ["slope", "The directional derivative is $\\nabla f^{\\top}\\mathbf{p} = -\\nabla f^{\\top}(\\nabla^{2} f)^{-1}\\nabla f$", 2, true],
      ["sign", "If $\\nabla^{2} f \\succ 0$ then so is its inverse, so this is negative whenever $\\nabla f \\ne \\mathbf{0}$", 2, true],
    ]),
  mcq(m(NO, "apply-inflection", "apply", 5, 40, "Pure Newton on $f(x) = x^{3}$ from $x_0 = 1$ heads toward $x = 0$. What is $x = 0$?"),
    "An inflection point, not a minimum — Newton is attracted to any stationary point",
    [
      ["The global minimum", "inflection-min", "$x^{3}$ has no minimum."],
      ["A local maximum", "inflection-max", "It's an inflection point."],
      ["Not a stationary point", "inflection-not", "$f'(0) = 0$."],
    ]),
  num(m(NO, "apply-cubic-step", "apply", 5, 40, "One Newton step on $f(x) = x^{3}$ from $x_0 = 1$ gives what?"), 0.5),
  mcq(m(NO, "apply-modify", "apply", 5, 40, "In a non-convex region, a standard fix for an indefinite Hessian is to:"),
    "Add $\\tau I$ (or use a modified Cholesky factorisation) so the matrix becomes positive definite",
    [
      ["Use the Hessian anyway", "modify-anyway", "The step may go uphill."],
      ["Negate the gradient", "modify-negate", "That doesn't fix the curvature."],
      ["Set the step to zero", "modify-zero", "That stops progress."],
    ]),
  // level 6
  short(m(NO, "explain-two-phases", "explain", 6, 120, "Describe the two phases of damped Newton's method on a strongly convex function."),
    [
      ["damped", "Far from the solution, the line search shortens steps, and $f$ decreases by at least a fixed amount each iteration", 2, true],
      ["quadratic", "Close to the solution, full steps are accepted and convergence becomes quadratic, typically needing only a few more iterations", 2, true],
    ]),
  num(m(NO, "apply-tau", "apply", 6, 45, "A Hessian has eigenvalues $-1$ and $3$. What shift $\\tau$ in $H + \\tau I$ makes the smallest eigenvalue $0.5$?"), 1.5),
  num(m(NO, "apply-exp-step", "apply", 6, 45, "One Newton step on $f(x) = e^{x} - 2x$ from $x_0 = 0$ gives what?"), 1),
  mcq(m(NO, "apply-cost-dominant", "apply", 6, 45, "For large $n$, what usually dominates the cost of a Newton iteration?"),
    "Forming and factorising the Hessian to solve the Newton system",
    [
      ["Evaluating $f$", "dominant-f", "That's usually much cheaper."],
      ["The line search", "dominant-linesearch", "A few function evaluations are cheap by comparison."],
      ["Updating $\\mathbf{x}$", "dominant-update", "That's a vector addition."],
    ]),
  // level 7
  num(m(NO, "transfer-exp-step2", "transfer", 7, 60, "Continue $f(x) = e^{x} - 2x$ from $x_1 = 1$. What is $x_2$? Give $4$ decimal places."), 0.7358),
  short(m(NO, "transfer-trust-region", "transfer", 7, 120, "Contrast line-search Newton with trust-region Newton."),
    [
      ["line-search", "Line search fixes the direction (a possibly modified Newton direction) and chooses how far to go along it", 2, true],
      ["trust-region", "Trust region fixes a radius and minimises the quadratic model within it, choosing direction and length together; it handles indefinite Hessians naturally", 2, true],
    ]),
  num(m(NO, "transfer-decrement-stop", "transfer", 7, 60, "Near the solution, $f(\\mathbf{x}) - f^{*} \\approx \\frac{\\lambda^{2}}{2}$. What suboptimality does $\\lambda^{2} = 2 \\times 10^{-6}$ indicate?"), 0.000001),
  mcq(m(NO, "transfer-glm", "transfer", 7, 60, "Fitting a logistic regression by Newton's method is known as:"),
    "Iteratively reweighted least squares (IRLS)",
    [
      ["Coordinate descent", "glm-coordinate", "That updates one coefficient at a time."],
      ["Gradient boosting", "glm-boosting", "That's an ensemble method."],
      ["The simplex method", "glm-simplex", "That's for LPs."],
    ]),
  // level 8
  short(m(NO, "transfer-inexact", "transfer", 8, 120, "What is inexact (truncated) Newton, and why is it useful for large problems?"),
    [
      ["what", "Solve the Newton system only approximately, with a few conjugate gradient iterations, stopping early", 2, true],
      ["why", "CG needs only Hessian–vector products, which can be computed without forming the Hessian, so memory stays $O(n)$ while convergence stays fast", 2, true],
    ]),
  num(m(NO, "transfer-storage", "transfer", 8, 60, "Storing a dense Hessian for $n = 10^{5}$ variables in fp64 ($8$ bytes) takes how many gigabytes ($10^{9}$ bytes)?"), 80),
  num(m(NO, "transfer-irls-weight", "transfer", 8, 60, "In IRLS for logistic regression, each observation is weighted by $p(1 - p)$. What is the weight when $p = 0.8$?"), 0.16),
  mcq(m(NO, "transfer-fisher", "transfer", 8, 60, "Fisher scoring differs from Newton's method by:"),
    "Replacing the observed Hessian with its expected value (the Fisher information)",
    [
      ["Ignoring the gradient", "fisher-gradient", "It still uses the score."],
      ["Using a fixed step of $0.1$", "fisher-step", "That's not what defines it."],
      ["Being derivative-free", "fisher-derivative-free", "It uses first derivatives and the Fisher information."],
    ]),
  // level 9
  num(m(NO, "transfer-overshoot", "transfer", 9, 75, "For $f(x) = x - \\ln x$ the pure Newton update is $x_{k+1} = 2x_k - x_k^{2}$. Starting from $x_0 = 3$, what is $x_1$?"), -3),
  mcq(m(NO, "transfer-overshoot-meaning", "transfer", 9, 75, "What does that iterate show?"),
    "Pure Newton can leave the domain ($x > 0$) far from the solution, so damping is needed",
    [
      ["The minimiser is negative", "overshoot-negative", "The minimiser is $1$."],
      ["Newton converges in one step", "overshoot-one-step", "It left the domain."],
      ["The function is concave", "overshoot-concave", "$f$ is convex on $x > 0$."],
    ]),
  num(m(NO, "transfer-backtrack", "transfer", 9, 75, "From $x_0 = 3$ with Newton direction $p = -6$, backtracking tries $\\alpha = 1, 0.5, 0.25, \\ldots$ and accepts the first point in the domain $x > 0$ that lowers $f$. What $x$ is accepted?"), 1.5),
  short(m(NO, "transfer-self-concordance", "transfer", 9, 150, "Why is self-concordance important in the analysis of Newton's method?"),
    [
      ["classical", "Classical analysis depends on unknown constants (strong convexity, Lipschitz Hessian) that aren't affine invariant", 2, true],
      ["self-concordant", "For self-concordant functions (like log barriers), the iteration bound depends only on $f(\\mathbf{x}_0) - f^{*}$ and the tolerance, independent of scaling — the basis of interior-point complexity", 2, true],
    ]),
  // level 10
  short(m(NO, "transfer-deep-learning", "transfer", 10, 180, "Why is Newton's method rarely used to train large neural networks?"),
    [
      ["scale", "With millions or billions of parameters, forming, storing and factorising the Hessian is impossible", 2, true],
      ["nature", "The losses are non-convex with many saddles and gradients are stochastic, so Newton steps can head toward saddles and noisy curvature estimates are unreliable", 2, true],
    ]),
  mcq(m(NO, "transfer-saddle-free", "transfer", 10, 90, "Saddle-free Newton uses $|H|$ (eigenvalues replaced by their absolute values) in place of $H$. Its purpose is:"),
    "To be repelled by saddle points instead of attracted to them, while keeping Newton-like scaling",
    [
      ["To make the Hessian cheaper", "saddle-free-cheaper", "It's at least as costly."],
      ["To converge to maxima", "saddle-free-maxima", "It aims to minimise."],
      ["To remove the need for gradients", "saddle-free-gradients", "Gradients are still needed."],
    ]),
  short(m(NO, "transfer-equality", "transfer", 10, 180, "How does Newton's method extend to minimising $f$ subject to linear equality constraints $A\\mathbf{x} = \\mathbf{b}$?"),
    [
      ["kkt", "Minimise the quadratic model subject to $A\\mathbf{p} = \\mathbf{0}$, which means solving the KKT system $\\begin{bmatrix} \\nabla^{2} f & A^{\\top} \\\\ A & 0 \\end{bmatrix}\\begin{bmatrix} \\mathbf{p} \\\\ \\mathbf{w} \\end{bmatrix} = \\begin{bmatrix} -\\nabla f \\\\ \\mathbf{0} \\end{bmatrix}$", 2, true],
      ["feasible", "Starting from a feasible point, every step keeps $A\\mathbf{x} = \\mathbf{b}$, and convergence is again quadratic near the solution", 2, true],
    ]),
  num(m(NO, "transfer-quadratic-steps", "transfer", 10, 90, "In the quadratic phase, $e_{k+1} = e_k^{2}$. Starting from $e = 0.1$, how many steps until $e \\le 10^{-10}$?"), 4),
];

// ---------------------------------------------------------------------------
// line-search-methods
// ---------------------------------------------------------------------------
const LS = "line-search-methods";
const lineSearch: Item[] = [
  // level 1
  mcq(m(LS, "recall-descent", "recall", 1, 15, "A direction $\\mathbf{p}$ is a descent direction at $\\mathbf{x}$ when:"),
    "$\\nabla f(\\mathbf{x})^{\\top}\\mathbf{p} < 0$",
    [
      ["$\\nabla f(\\mathbf{x})^{\\top}\\mathbf{p} > 0$", "descent-positive", "That's an ascent direction."],
      ["$\\|\\mathbf{p}\\| = 1$", "descent-unit", "Length doesn't determine descent."],
      ["$\\mathbf{p} = \\mathbf{x}$", "descent-x", "Unrelated."],
    ]),
  mcq(m(LS, "recall-armijo", "recall", 1, 15, "The Armijo condition requires:"),
    "A sufficient decrease in $f$, proportional to the step and the directional derivative",
    [
      ["The gradient to vanish at the new point", "armijo-gradient", "That's exact line search."],
      ["The step to be at least $1$", "armijo-large", "It bounds how long a step can be."],
      ["The Hessian to be positive definite", "armijo-hessian", "It's about function values."],
    ]),
  mcq(m(LS, "recall-backtracking", "recall", 1, 15, "Backtracking line search:"),
    "Starts with a trial step and shrinks it by a constant factor until the Armijo condition holds",
    [
      ["Grows the step until $f$ increases", "backtracking-grows", "It shrinks the step."],
      ["Solves $\\phi'(\\alpha) = 0$ exactly", "backtracking-exact", "That's exact line search."],
      ["Uses a fixed step forever", "backtracking-fixed", "It adapts each iteration."],
    ]),
  mcq(m(LS, "recall-c1", "recall", 1, 15, "A typical value for the Armijo constant $c_1$ is:"),
    "$10^{-4}$",
    [
      ["$0.99$", "c1-large", "That would demand nearly the full predicted decrease."],
      ["$2$", "c1-two", "$c_1$ must be below $1$."],
      ["$-1$", "c1-negative", "$c_1$ must be positive."],
    ]),
  // level 2
  num(m(LS, "apply-phi-prime", "apply", 2, 20, "For $f(x) = x^{2}$ at $x = 1$ with direction $p = -2$, what is $\\phi'(0) = f'(x)p$?"), -4),
  num(m(LS, "apply-shrink", "apply", 2, 20, "Backtracking with $\\rho = 0.5$ starts at $\\alpha = 1$ and shrinks twice. What is $\\alpha$?"), 0.25),
  num(m(LS, "apply-directional", "apply", 2, 20, "With $\\nabla f = (1, 2)$ and $\\mathbf{p} = (-1, 0)$, what is $\\nabla f^{\\top}\\mathbf{p}$?"), -1),
  mcq(m(LS, "apply-curvature-purpose", "apply", 2, 20, "The curvature (second Wolfe) condition rules out steps that are:"),
    "Too short",
    [
      ["Too long", "curvature-long", "That's Armijo's job."],
      ["In the wrong direction", "curvature-direction", "Direction is fixed before the search."],
      ["Exactly optimal", "curvature-optimal", "The exact minimiser satisfies it."],
    ]),
  // level 3
  num(m(LS, "apply-armijo-rhs", "apply", 3, 25, "With $f(\\mathbf{x}) = 5$, $c_1 = 0.1$, $\\alpha = 0.5$ and $\\nabla f^{\\top}\\mathbf{p} = -4$, what is the Armijo threshold $f(\\mathbf{x}) + c_1\\alpha\\nabla f^{\\top}\\mathbf{p}$?"), 4.8),
  num(m(LS, "apply-backtrack-accept", "apply", 3, 25, "Minimise $f(x) = x^{2}$ from $x = 2$ with $p = -4$, $c_1 = 10^{-4}$, $\\rho = 0.5$, starting at $\\alpha = 1$. Which $\\alpha$ is accepted?"), 0.5),
  num(m(LS, "apply-exact-quadratic", "apply", 3, 25, "For $f(x) = \\frac{1}{2}x^{2}$ at $x = 4$ with $p = -4$, what step $\\alpha$ minimises $f(x + \\alpha p)$ exactly?"), 1),
  mcq(m(LS, "apply-wolfe", "apply", 3, 25, "The Wolfe conditions consist of:"),
    "The Armijo (sufficient decrease) condition plus the curvature condition",
    [
      ["Armijo only", "wolfe-armijo", "Wolfe adds the curvature condition."],
      ["The KKT conditions", "wolfe-kkt", "Those are for constrained optimality."],
      ["Exact minimisation along the line", "wolfe-exact", "Wolfe steps are inexact."],
    ]),
  // level 4
  num(m(LS, "apply-exact-alpha", "apply", 4, 30, "For $f(\\mathbf{x}) = \\frac{1}{2}\\mathbf{x}^{\\top}A\\mathbf{x}$ with $A = \\operatorname{diag}(1, 4)$ at $\\mathbf{x} = (1, 1)$, steepest descent with exact line search uses $\\alpha = \\frac{\\mathbf{g}^{\\top}\\mathbf{g}}{\\mathbf{g}^{\\top}A\\mathbf{g}}$. What is $\\alpha$? Give $4$ decimal places."), 0.2615),
  num(m(LS, "apply-curvature-threshold", "apply", 4, 30, "With $\\phi'(0) = -4$ and $c_2 = 0.9$, the curvature condition needs $\\phi'(\\alpha) \\ge$ what?"), -3.6),
  mcq(m(LS, "apply-strong-wolfe", "apply", 4, 30, "The strong Wolfe curvature condition is:"),
    "$|\\phi'(\\alpha)| \\le c_2|\\phi'(0)|$",
    [
      ["$\\phi'(\\alpha) \\ge c_2\\phi'(0)$", "strong-wolfe-weak", "That's the ordinary (weak) curvature condition."],
      ["$\\phi(\\alpha) \\le \\phi(0)$", "strong-wolfe-decrease", "That's simple decrease."],
      ["$\\phi'(\\alpha) = 0$", "strong-wolfe-exact", "That's exact line search."],
    ]),
  num(m(LS, "apply-shrinks", "apply", 4, 30, "Backtracking with $\\rho = 0.5$ from $\\alpha = 1$ must reach $\\alpha \\le 0.1$. How many shrinks?"), 4),
  // level 5
  short(m(LS, "explain-too-short", "explain", 5, 90, "Why isn't the Armijo condition alone enough for a line search that may choose any $\\alpha$?"),
    [
      ["short", "Armijo is satisfied by arbitrarily small steps, so a search could make negligible progress", 2, true],
      ["fix", "Backtracking from a reasonable initial step avoids this implicitly; otherwise the curvature condition is needed to rule out tiny steps", 2, true],
    ]),
  mcq(m(LS, "apply-zoutendijk", "apply", 5, 40, "Zoutendijk's theorem implies $\\|\\nabla f(\\mathbf{x}_k)\\| \\to 0$ provided the search directions:"),
    "Stay bounded away from being orthogonal to the gradient",
    [
      ["Are always the Newton direction", "zoutendijk-newton", "Any direction with a good angle works."],
      ["Have unit length", "zoutendijk-unit", "The angle, not the length, matters."],
      ["Are chosen randomly", "zoutendijk-random", "Random directions can be nearly orthogonal."],
    ]),
  num(m(LS, "apply-cos-angle", "apply", 5, 40, "What is $\\cos\\theta$ between $\\mathbf{p} = (-1, 0)$ and $-\\nabla f = (-1, -1)$? Give $4$ decimal places."), 0.7071),
  mcq(m(LS, "apply-c2-cg", "apply", 5, 40, "Why do nonlinear conjugate gradient methods use a small $c_2$ (e.g. $0.1$)?"),
    "They need a fairly accurate line search to keep successive directions effective",
    [
      ["To allow very long steps", "c2-cg-long", "$c_2$ controls the slope condition."],
      ["Because they never use line search", "c2-cg-never", "They rely on it."],
      ["To make Armijo stricter", "c2-cg-armijo", "That's $c_1$."],
    ]),
  // level 6
  short(m(LS, "explain-sy", "explain", 6, 120, "Show why the curvature condition guarantees $\\mathbf{s}_k^{\\top}\\mathbf{y}_k > 0$, and why quasi-Newton methods need it."),
    [
      ["derivation", "With $\\mathbf{s}_k = \\alpha\\mathbf{p}_k$, the condition gives $\\nabla f_{k+1}^{\\top}\\mathbf{s}_k \\ge c_2\\nabla f_k^{\\top}\\mathbf{s}_k$, so $\\mathbf{y}_k^{\\top}\\mathbf{s}_k \\ge (c_2 - 1)\\nabla f_k^{\\top}\\mathbf{s}_k > 0$ since $\\nabla f_k^{\\top}\\mathbf{s}_k < 0$", 2, true],
      ["need", "BFGS keeps its Hessian approximation positive definite only when $\\mathbf{s}_k^{\\top}\\mathbf{y}_k > 0$", 2, true],
    ]),
  num(m(LS, "apply-largest-armijo", "apply", 6, 45, "For $f(x) = x^{2}$ at $x = 1$ with $p = -1$ and $c_1 = 0.5$, what is the largest $\\alpha$ satisfying the Armijo condition?"), 1),
  num(m(LS, "apply-interpolation", "apply", 6, 45, "Quadratic interpolation uses $\\alpha = -\\frac{\\phi'(0)\\alpha_0^{2}}{2(\\phi(\\alpha_0) - \\phi(0) - \\phi'(0)\\alpha_0)}$. With $\\phi(0) = 1$, $\\phi'(0) = -2$, $\\alpha_0 = 2$ and $\\phi(2) = 1$, what is $\\alpha$?"), 1),
  mcq(m(LS, "apply-trust-region", "apply", 6, 45, "The main alternative to line search for globalising Newton-type methods is:"),
    "A trust-region method",
    [
      ["Bisection", "trust-bisection", "That's for 1-D root finding."],
      ["Random restarts", "trust-random", "That's a heuristic for global optima."],
      ["Increasing the step each iteration", "trust-increase", "That's not a globalisation strategy."],
    ]),
  // level 7
  num(m(LS, "transfer-orthogonal", "transfer", 7, 60, "With exact line search, steepest descent on a quadratic produces successive gradients $\\mathbf{g}_k$, $\\mathbf{g}_{k+1}$. What is $\\mathbf{g}_k^{\\top}\\mathbf{g}_{k+1}$?"), 0),
  short(m(LS, "transfer-exact-cost", "transfer", 7, 120, "Why do practical methods use inexact rather than exact line searches?"),
    [
      ["cost", "Exact minimisation along the line needs many function and gradient evaluations per iteration", 2, true],
      ["benefit", "Inexact steps satisfying Wolfe conditions already guarantee global convergence, and the saved evaluations are better spent on more iterations", 2, true],
    ]),
  num(m(LS, "transfer-guaranteed", "transfer", 7, 60, "For an $L$-smooth $f$ with $L = 10$, a gradient step is accepted by Armijo ($c_1 = 0.5$) whenever $\\alpha \\le \\frac{1}{L}$. Backtracking with $\\rho = 0.5$ from $\\alpha = 1$: what is the first trial step that is guaranteed to be accepted?"), 0.0625),
  mcq(m(LS, "transfer-nonmonotone", "transfer", 7, 60, "A non-monotone line search accepts a step if $f$ decreases relative to:"),
    "The maximum of the last few function values, allowing occasional increases",
    [
      ["The current value only", "nonmonotone-current", "That's a monotone search."],
      ["The global minimum", "nonmonotone-global", "That's unknown."],
      ["Zero", "nonmonotone-zero", "Unrelated."],
    ]),
  // level 8
  short(m(LS, "transfer-newton-unit", "transfer", 8, 120, "Why should a line search for Newton or quasi-Newton methods always try $\\alpha = 1$ first?"),
    [
      ["natural", "The unit step is the minimiser of the local quadratic model, so it is the natural step size", 2, true],
      ["rate", "Accepting $\\alpha = 1$ near the solution is what gives quadratic (or superlinear) convergence; shrinking it there would slow the method", 2, true],
    ]),
  num(m(LS, "transfer-directional", "transfer", 8, 60, "What is the directional derivative of $f(x, y) = x^{2} + y^{2}$ at $(1, 1)$ along the unit vector $(-1, 0)$?"), -2),
  mcq(m(LS, "transfer-ascent", "transfer", 8, 60, "A line search is given a direction with $\\nabla f^{\\top}\\mathbf{p} > 0$. What happens?"),
    "No positive step can satisfy Armijo for small $\\alpha$, so backtracking shrinks forever or fails — the direction must be fixed first",
    [
      ["It finds a good step anyway", "ascent-anyway", "Small steps increase $f$."],
      ["It reverses the direction automatically", "ascent-reverse", "Standard searches don't."],
      ["It converges to a maximum", "ascent-maximum", "It simply fails."],
    ]),
  short(m(LS, "transfer-zoutendijk", "transfer", 8, 120, "What does Zoutendijk's theorem let you conclude about steepest descent with a Wolfe line search?"),
    [
      ["angle", "For steepest descent, $\\cos\\theta_k = 1$ for every $k$", 2, true],
      ["conclusion", "So $\\sum\\|\\nabla f_k\\|^{2} < \\infty$ and the gradients tend to zero: global convergence to stationary points from any start", 2, true],
    ]),
  // level 9
  short(m(LS, "transfer-stochastic", "transfer", 9, 150, "Why are classical line searches awkward in stochastic gradient training?"),
    [
      ["noise", "Function values and gradients are noisy minibatch estimates, so Armijo comparisons can be wrong", 2, true],
      ["cost", "Evaluating $f$ at trial points costs extra passes; in practice schedules or adaptive methods replace line search (with stochastic line-search variants as research)", 2, true],
    ]),
  num(m(LS, "transfer-armijo-quadratic", "transfer", 9, 75, "For $f(x) = \\frac{L}{2}x^{2}$ with $L = 4$, a gradient step satisfies Armijo with $c_1 = 0.5$ exactly when $\\alpha \\le \\frac{1}{L}$. What is the largest accepted $\\alpha$?"), 0.25),
  mcq(m(LS, "transfer-polyak", "transfer", 9, 75, "Polyak's step size $\\alpha = \\frac{f(\\mathbf{x}) - f^{*}}{\\|\\nabla f(\\mathbf{x})\\|^{2}}$ requires knowing:"),
    "The optimal value $f^{*}$",
    [
      ["The Hessian", "polyak-hessian", "Only $f^{*}$ beyond the gradient."],
      ["The Lipschitz constant", "polyak-lipschitz", "It adapts without $L$."],
      ["The minimiser $\\mathbf{x}^{*}$", "polyak-minimiser", "Only the value is needed."],
    ]),
  num(m(LS, "transfer-bb", "transfer", 9, 75, "The Barzilai–Borwein step is $\\alpha = \\frac{\\mathbf{s}^{\\top}\\mathbf{s}}{\\mathbf{s}^{\\top}\\mathbf{y}}$. With $\\mathbf{s} = (1, 0)$ and $\\mathbf{y} = (2, 0)$, what is $\\alpha$?"), 0.5),
  // level 10
  short(m(LS, "transfer-deep-lr", "transfer", 10, 180, "Deep learning uses learning-rate schedules instead of line searches. What does each approach assume, and what does it trade?"),
    [
      ["line-search", "Line search assumes accurate function values and adapts the step to local curvature at the cost of extra evaluations", 2, true],
      ["schedule", "Schedules assume noisy gradients and cheap steps; they need tuning but no extra evaluations, and the noise itself is managed by the decaying rate", 2, true],
    ]),
  num(m(LS, "transfer-evaluations", "transfer", 10, 90, "Backtracking with $\\rho = 0.5$ from $\\alpha = 1$ first succeeds at $\\alpha = \\frac{1}{16}$. How many function evaluations at trial points did that take?"), 5),
  mcq(m(LS, "transfer-bb-nonmonotone", "transfer", 10, 90, "Barzilai–Borwein steps are usually paired with a non-monotone line search because:"),
    "BB steps can increase $f$ temporarily, and a monotone search would reject them and lose their speed",
    [
      ["BB steps are always too small", "bb-small", "They can be large."],
      ["BB needs exact line search", "bb-exact", "BB replaces line search."],
      ["Non-monotone searches are cheaper per step", "bb-cheaper", "The point is accepting useful increases."],
    ]),
  short(m(LS, "transfer-design", "transfer", 10, 180, "You must pick line-search settings for an L-BFGS solver. What would you choose, and why?"),
    [
      ["settings", "A Wolfe (or strong Wolfe) search with $c_1 \\approx 10^{-4}$ and $c_2 \\approx 0.9$, trying $\\alpha = 1$ first", 2, true],
      ["why", "Small $c_1$ accepts most reasonable steps, $c_2 = 0.9$ is loose but guarantees $\\mathbf{s}^{\\top}\\mathbf{y} > 0$ for the update, and the unit step preserves superlinear convergence", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// gradient-method-convergence
// ---------------------------------------------------------------------------
const GC = "gradient-method-convergence";
const gradientTheory: Item[] = [
  // level 1
  mcq(m(GC, "recall-update", "recall", 1, 15, "Gradient descent updates:"),
    "$\\mathbf{x}_{k+1} = \\mathbf{x}_k - \\alpha\\nabla f(\\mathbf{x}_k)$",
    [
      ["$\\mathbf{x}_{k+1} = \\mathbf{x}_k + \\alpha\\nabla f(\\mathbf{x}_k)$", "update-ascent", "That's gradient ascent."],
      ["$\\mathbf{x}_{k+1} = \\mathbf{x}_k - (\\nabla^{2} f)^{-1}\\nabla f$", "update-newton", "That's Newton's method."],
      ["$\\mathbf{x}_{k+1} = \\alpha\\mathbf{x}_k$", "update-scale", "That ignores the gradient."],
    ]),
  mcq(m(GC, "recall-step", "recall", 1, 15, "For an $L$-smooth function, the standard safe constant step size is:"),
    "$\\frac{1}{L}$",
    [
      ["$L$", "step-L", "That's far too large when $L > 1$."],
      ["$\\frac{2}{\\mu}$", "step-mu", "The step is set by smoothness, not strong convexity."],
      ["$1$ always", "step-one", "It depends on the curvature."],
    ]),
  mcq(m(GC, "recall-linear", "recall", 1, 15, "For a smooth, strongly convex function, gradient descent converges:"),
    "Linearly (geometrically)",
    [
      ["Quadratically", "linear-quadratic", "That's Newton near the solution."],
      ["Like $\\frac{1}{k}$", "linear-sublinear", "That's the merely convex case."],
      ["Not at all", "linear-none", "It does converge."],
    ]),
  mcq(m(GC, "recall-sublinear", "recall", 1, 15, "For smooth convex (not strongly convex) $f$, the gap $f(\\mathbf{x}_k) - f^{*}$ shrinks like:"),
    "$O\\!\\left(\\frac{1}{k}\\right)$",
    [
      ["$O\\!\\left(\\frac{1}{k^{2}}\\right)$", "sublinear-accelerated", "That's the accelerated rate."],
      ["$O(c^{k})$", "sublinear-linear", "That needs strong convexity."],
      ["$O\\!\\left(\\frac{1}{\\sqrt{k}}\\right)$", "sublinear-subgradient", "That's the subgradient method."],
    ]),
  // level 2
  num(m(GC, "apply-step", "apply", 2, 20, "A function is $L$-smooth with $L = 4$. What is the step $\\frac{1}{L}$?"), 0.25),
  num(m(GC, "apply-gd-step", "apply", 2, 20, "One gradient step on $f(x) = x^{2}$ from $x = 2$ with $\\alpha = 0.25$ gives what?"), 1),
  num(m(GC, "apply-kappa", "apply", 2, 20, "With $L = 50$ and $\\mu = 2$, what is the condition number $\\kappa$?"), 25),
  mcq(m(GC, "apply-decrease-range", "apply", 2, 20, "For $L$-smooth $f$, a gradient step decreases $f$ (when $\\nabla f \\ne \\mathbf{0}$) for any step size in:"),
    "$\\left(0, \\frac{2}{L}\\right)$",
    [
      ["$\\left(0, \\frac{1}{L}\\right)$ only", "range-half", "Steps up to $\\frac{2}{L}$ still decrease $f$."],
      ["$(0, L)$", "range-L", "Large steps can increase $f$."],
      ["Any positive step", "range-any", "Too large a step overshoots."],
    ]),
  // level 3
  num(m(GC, "apply-guaranteed-decrease", "apply", 3, 25, "With step $\\frac{1}{L}$, $f$ decreases by at least $\\frac{1}{2L}\\|\\nabla f\\|^{2}$. What is that for $\\|\\nabla f\\| = 4$ and $L = 2$?"), 4),
  num(m(GC, "apply-factor", "apply", 3, 25, "For strongly convex $f$ with $\\kappa = 20$, the squared distance to $\\mathbf{x}^{*}$ shrinks by $1 - \\frac{1}{\\kappa}$ per step. What is that factor?"), 0.95),
  num(m(GC, "apply-sublinear-bound", "apply", 3, 25, "Evaluate $\\frac{L\\|\\mathbf{x}_0 - \\mathbf{x}^{*}\\|^{2}}{2k}$ for $L = 2$, $\\|\\mathbf{x}_0 - \\mathbf{x}^{*}\\| = 10$ and $k = 100$."), 1),
  mcq(m(GC, "apply-too-large", "apply", 3, 25, "On $f(x) = \\frac{L}{2}x^{2}$, gradient descent with $\\alpha > \\frac{2}{L}$:"),
    "Diverges, with $|x|$ growing each step",
    [
      ["Converges faster", "too-large-faster", "The multiplier $1 - \\alpha L$ exceeds $1$ in size."],
      ["Converges in one step", "too-large-one", "That needs $\\alpha = \\frac{1}{L}$."],
      ["Stays put", "too-large-stays", "It moves, outward."],
    ]),
  // level 4
  num(m(GC, "apply-diverge", "apply", 4, 30, "On $f(x) = x^{2}$ (so $L = 2$), gradient descent with $\\alpha = 1.5$ maps $x \\mapsto (1 - 2\\alpha)x$. From $x_0 = 1$, what is $x_1$?"), -2),
  num(m(GC, "apply-optimal-step", "apply", 4, 30, "For a quadratic with $L = 10$ and $\\mu = 1$, what is the optimal constant step $\\frac{2}{L + \\mu}$? Give $4$ decimal places."), 0.1818),
  num(m(GC, "apply-quadratic-rate", "apply", 4, 30, "With that step, the error shrinks by $\\frac{\\kappa - 1}{\\kappa + 1}$ per step. What is it for $\\kappa = 10$? Give $4$ decimal places."), 0.8182),
  num(m(GC, "apply-iterations", "apply", 4, 30, "Gradient descent needs about $\\kappa\\ln\\frac{1}{\\varepsilon}$ iterations. Estimate it for $\\kappa = 100$ and $\\varepsilon = 10^{-4}$, to the nearest whole number."), 921),
  // level 5
  short(m(GC, "explain-zigzag", "explain", 5, 90, "Explain why gradient descent zig-zags on an ill-conditioned quadratic."),
    [
      ["direction", "The gradient is dominated by the steep (large-eigenvalue) direction, not the direction toward the minimiser", 2, true],
      ["overshoot", "A step big enough to progress along the flat direction overshoots across the steep one, so iterates bounce between the valley walls", 2, true],
    ]),
  mcq(m(GC, "apply-precondition", "apply", 5, 40, "Preconditioning gradient descent aims to:"),
    "Reduce the effective condition number by rescaling the problem",
    [
      ["Increase the Lipschitz constant", "precondition-increase", "That would hurt."],
      ["Remove the need for gradients", "precondition-gradients", "Gradients are still used."],
      ["Make the problem non-convex", "precondition-nonconvex", "Rescaling preserves convexity."],
    ]),
  num(m(GC, "apply-coordinates", "apply", 5, 40, "Gradient descent on $f(x, y) = \\frac{1}{2}(x^{2} + 10y^{2})$ with $\\alpha = 0.1$ from $(1, 1)$. What is the new $x$?"), 0.9),
  mcq(m(GC, "apply-lower-bound", "apply", 5, 40, "For smooth convex problems, the best possible rate for any method using only gradients is:"),
    "$O\\!\\left(\\frac{1}{k^{2}}\\right)$, which plain gradient descent does not reach",
    [
      ["$O\\!\\left(\\frac{1}{k}\\right)$, which gradient descent reaches", "lower-bound-gd", "Acceleration does better."],
      ["$O(e^{-k})$", "lower-bound-exp", "That needs strong convexity."],
      ["There is no limit", "lower-bound-none", "Nemirovski–Yudin and Nesterov proved lower bounds."],
    ]),
  // level 6
  short(m(GC, "explain-nonconvex", "explain", 6, 120, "What does gradient descent guarantee on a smooth non-convex function?"),
    [
      ["stationarity", "With step $\\frac{1}{L}$, the smallest gradient norm seen so far satisfies $\\min_i\\|\\nabla f(\\mathbf{x}_i)\\|^{2} \\le \\frac{2L(f(\\mathbf{x}_0) - f^{*})}{k}$", 2, true],
      ["meaning", "It reaches approximate stationary points at rate $O\\!\\left(\\frac{1}{\\sqrt{k}}\\right)$ in gradient norm, with no guarantee of a global (or even local) minimum", 2, true],
    ]),
  num(m(GC, "apply-steps-1e6", "apply", 6, 45, "The slow direction shrinks by $0.9$ per step. How many steps reduce it by a factor of $10^{6}$?"), 132),
  num(m(GC, "apply-bound-doubling", "apply", 6, 45, "The convex bound is $1$ at $k = 100$. What is it at $k = 200$?"), 0.5),
  mcq(m(GC, "apply-exact-orthogonal", "apply", 6, 45, "With exact line search on a quadratic, consecutive steepest-descent directions are:"),
    "Orthogonal",
    [
      ["Parallel", "orthogonal-parallel", "Then the second step would be pointless."],
      ["Conjugate", "orthogonal-conjugate", "That's conjugate gradients."],
      ["Identical", "orthogonal-identical", "The gradient changes after each step."],
    ]),
  // level 7
  num(m(GC, "transfer-rescale", "transfer", 7, 60, "Substituting $y = \\frac{u}{\\sqrt{10}}$ turns $\\frac{1}{2}(x^{2} + 10y^{2})$ into $\\frac{1}{2}(x^{2} + u^{2})$. What is the new condition number?"), 1),
  short(m(GC, "transfer-pl", "transfer", 7, 120, "What is the Polyak–Łojasiewicz (PL) condition, and why is it useful?"),
    [
      ["definition", "$\\frac{1}{2}\\|\\nabla f(\\mathbf{x})\\|^{2} \\ge \\mu(f(\\mathbf{x}) - f^{*})$: the gradient is large whenever $f$ is far above its minimum", 2, true],
      ["use", "It gives linear convergence of gradient descent without requiring convexity, and holds for some non-convex problems (e.g. overparameterised least squares)", 2, true],
    ]),
  num(m(GC, "transfer-rate", "transfer", 7, 60, "With $\\mu = 0.5$ and $L = 5$, what is the per-step factor $1 - \\frac{\\mu}{L}$?"), 0.9),
  mcq(m(GC, "transfer-ridge-mu", "transfer", 7, 60, "Adding a ridge penalty $\\frac{\\lambda}{2}\\|\\boldsymbol{\\beta}\\|^{2}$ to least squares makes the objective:"),
    "$\\lambda$-strongly convex (at least), since the Hessian becomes $X^{\\top}X + \\lambda I$",
    [
      ["Non-convex", "ridge-nonconvex", "It adds positive curvature."],
      ["Less smooth", "ridge-less-smooth", "It adds smooth curvature."],
      ["Linear", "ridge-linear", "It's quadratic."],
    ]),
  // level 8
  num(m(GC, "transfer-k-needed", "transfer", 8, 60, "Using $f(\\mathbf{x}_k) - f^{*} \\le \\frac{LR^{2}}{2k}$ with $L = 1$ and $R = 1$, how many iterations guarantee a gap of at most $10^{-3}$?"), 500),
  short(m(GC, "transfer-stochastic", "transfer", 8, 120, "How does the convergence of stochastic gradient descent differ from that of full gradient descent, and why?"),
    [
      ["noise", "Stochastic gradients are noisy, so with a constant step SGD only reaches a neighbourhood of the solution whose size scales with the step and noise", 2, true],
      ["rate", "Decaying steps give convergence but at slower sublinear rates (e.g. $O\\!\\left(\\frac{1}{k}\\right)$ in distance for strongly convex problems), traded for very cheap iterations", 2, true],
    ]),
  num(m(GC, "transfer-digit", "transfer", 8, 60, "With $\\kappa = 10^{4}$, about how many iterations does gradient descent need per extra digit of accuracy, $\\kappa\\ln 10$? Give the nearest whole number."), 23026),
  mcq(m(GC, "transfer-nonsmooth", "transfer", 8, 60, "Gradient descent with a constant step on $f(x) = |x|$ (using the sign as the gradient):"),
    "Fails to converge, oscillating around $0$ — the smooth theory needs a Lipschitz gradient",
    [
      ["Converges linearly", "nonsmooth-linear", "$|x|$ isn't smooth at $0$."],
      ["Converges in one step from anywhere", "nonsmooth-one", "Only from a lucky point."],
      ["Diverges to infinity", "nonsmooth-diverge", "It stays bounded but oscillates."],
    ]),
  // level 9
  short(m(GC, "transfer-standardise", "transfer", 9, 150, "Why does standardising features speed up gradient descent for linear and logistic regression?"),
    [
      ["conditioning", "Features on very different scales give $X^{\\top}X$ widely spread eigenvalues, i.e. a large condition number", 2, true],
      ["effect", "Standardising makes the curvature more uniform across directions, lowering $\\kappa$ and so the iteration count, without changing the fitted model (up to rescaling)", 2, true],
    ]),
  num(m(GC, "transfer-ill", "transfer", 9, 75, "On $\\frac{1}{2}\\mathbf{x}^{\\top}\\operatorname{diag}(1, 100)\\mathbf{x}$ with $\\alpha = \\frac{1}{100}$, the first coordinate shrinks by $0.99$ per step. How many steps until it falls below $10^{-3}$ of its start?"), 688),
  mcq(m(GC, "transfer-early-stopping", "transfer", 9, 75, "Stopping gradient descent early on least squares acts like:"),
    "Implicit regularisation, similar to ridge regression",
    [
      ["Increasing model capacity", "early-capacity", "It restricts the fit."],
      ["Feature selection", "early-selection", "Coefficients shrink smoothly, not to zero."],
      ["Nothing — only the final answer matters", "early-nothing", "Early iterates differ systematically."],
    ]),
  num(m(GC, "transfer-logistic-L", "transfer", 9, 75, "The logistic loss $\\sum_i \\ln(1 + e^{-y_i\\mathbf{x}_i^{\\top}\\boldsymbol{\\beta}})$ has smoothness constant $\\frac{1}{4}\\lambda_{\\max}(X^{\\top}X)$. What is it when $\\lambda_{\\max} = 8$?"), 2),
  // level 10
  short(m(GC, "transfer-gradient-flow", "transfer", 10, 180, "Relate gradient descent to the gradient flow ODE $\\dot{\\mathbf{x}} = -\\nabla f(\\mathbf{x})$."),
    [
      ["euler", "Gradient descent is the forward-Euler discretisation of gradient flow with time step $\\alpha$", 2, true],
      ["insight", "Along the flow $\\frac{d}{dt}f = -\\|\\nabla f\\|^{2} \\le 0$; the step-size limit $\\alpha < \\frac{2}{L}$ is the stability condition of the Euler scheme on stiff (ill-conditioned) problems", 2, true],
    ]),
  num(m(GC, "transfer-speedup", "transfer", 10, 90, "With $\\kappa = 10^{4}$, gradient descent needs $O(\\kappa)$ and accelerated methods $O(\\sqrt{\\kappa})$ iterations per digit. What is the ratio?"), 100),
  mcq(m(GC, "transfer-pl-example", "transfer", 10, 90, "Which non-convex-friendly property gives gradient descent linear convergence?"),
    "The Polyak–Łojasiewicz inequality",
    [
      ["Lipschitz continuity of $f$", "pl-lipschitz", "That bounds slopes, not convergence speed."],
      ["Having a stationary point", "pl-stationary", "Too weak."],
      ["Being twice differentiable", "pl-twice", "Smoothness alone gives only sublinear stationarity."],
    ]),
  short(m(GC, "transfer-unknown-L", "transfer", 10, 180, "$L$ is unknown. How can you still run gradient descent with convergence guarantees?"),
    [
      ["backtracking", "Use backtracking: shrink $\\alpha$ until the sufficient-decrease (descent lemma) condition holds", 2, true],
      ["guarantee", "The accepted step is at least $\\frac{\\rho}{L}$, so the same rates hold up to a constant, with a few extra evaluations per iteration", 2, true],
    ]),
];

export const opt02Items: Item[] = [...secant, ...newtonOpt, ...lineSearch, ...gradientTheory];
