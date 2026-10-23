import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./opt-shared";

/**
 * Optimization course, part 1: optimality conditions, convexity, bisection and
 * Newton–Raphson. Forty questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// optimization-problems-and-optimality
// ---------------------------------------------------------------------------
const OP = "optimization-problems-and-optimality";
const optimality: Item[] = [
  // level 1
  mcq(m(OP, "recall-max-as-min", "recall", 1, 15, "Maximising $f(\\mathbf{x})$ is equivalent to:"),
    "Minimising $-f(\\mathbf{x})$",
    [
      ["Minimising $\\frac{1}{f(\\mathbf{x})}$", "max-reciprocal", "That changes the problem when $f$ changes sign or is near $0$."],
      ["Minimising $f(\\mathbf{x})^{2}$", "max-square", "Squaring rewards values near $0$, not large ones."],
      ["Minimising $f(-\\mathbf{x})$", "max-reflect", "That reflects the input, not the objective."],
    ]),
  mcq(m(OP, "recall-stationary", "recall", 1, 15, "A stationary point of a differentiable $f$ is a point where:"),
    "$\\nabla f(\\mathbf{x}) = \\mathbf{0}$",
    [
      ["$f(\\mathbf{x}) = 0$", "stationary-root", "That's a root, not a stationary point."],
      ["The Hessian is zero", "stationary-hessian", "The gradient, not the Hessian, vanishes."],
      ["$f$ is at its global minimum", "stationary-global", "Stationary points also include maxima and saddles."],
    ]),
  mcq(m(OP, "recall-feasible", "recall", 1, 15, "The feasible set of an optimisation problem is:"),
    "The set of points satisfying all of the constraints",
    [
      ["The set of minimisers", "feasible-minimisers", "Minimisers are the best feasible points."],
      ["The range of the objective", "feasible-range", "It's a set of inputs, not outputs."],
      ["The points where the gradient vanishes", "feasible-stationary", "That's the stationary set."],
    ]),
  mcq(m(OP, "recall-global", "recall", 1, 15, "A global minimiser $\\mathbf{x}^{*}$ satisfies $f(\\mathbf{x}^{*}) \\le f(\\mathbf{x})$ for:"),
    "Every feasible $\\mathbf{x}$",
    [
      ["Every $\\mathbf{x}$ in a small neighbourhood", "global-local", "That defines a local minimiser."],
      ["Every stationary point only", "global-stationary", "It must beat all feasible points."],
      ["The starting point of an algorithm", "global-start", "That's far too weak."],
    ]),
  // level 2
  num(m(OP, "apply-stationary-1d", "apply", 2, 20, "Find the stationary point of $f(x) = x^{2} - 6x + 1$."), 3),
  num(m(OP, "apply-min-value", "apply", 2, 20, "What is the minimum value of $f(x) = x^{2} - 6x + 1$?"), -8),
  num(m(OP, "apply-gradient", "apply", 2, 20, "For $f(x, y) = x^{2} + 3y^{2}$, what is the second component of $\\nabla f$ at $(1, 2)$?"), 12),
  mcq(m(OP, "apply-quadratic-hessian", "apply", 2, 20, "What is the Hessian of $f(\\mathbf{x}) = \\frac{1}{2}\\mathbf{x}^{\\top}Q\\mathbf{x} - \\mathbf{b}^{\\top}\\mathbf{x}$ for symmetric $Q$?"),
    "$Q$",
    [
      ["$2Q$", "hessian-2q", "The $\\frac{1}{2}$ cancels the $2$."],
      ["$Q\\mathbf{x} - \\mathbf{b}$", "hessian-gradient", "That's the gradient."],
      ["$\\mathbf{b}\\mathbf{b}^{\\top}$", "hessian-bb", "The linear term has zero Hessian."],
    ]),
  // level 3
  num(m(OP, "apply-cubic-stationary", "apply", 3, 25, "$f(x) = x^{3} - 3x$ has two stationary points. What is the positive one?"), 1),
  num(m(OP, "apply-second-derivative", "apply", 3, 25, "What is $f''(1)$ for $f(x) = x^{3} - 3x$?"), 6),
  mcq(m(OP, "apply-classify-max", "apply", 3, 25, "For $f(x) = x^{3} - 3x$, the stationary point $x = -1$ is:"),
    "A local maximum, since $f''(-1) = -6 < 0$",
    [
      ["A local minimum", "classify-min", "The second derivative is negative there."],
      ["A saddle point", "classify-saddle", "In one dimension, $f'' < 0$ gives a strict local maximum."],
      ["The global maximum", "classify-global", "$f \\to \\infty$ as $x \\to \\infty$, so there is no global maximum."],
    ]),
  num(m(OP, "apply-2d-min", "apply", 3, 25, "What is the $y$-coordinate of the minimiser of $f(x, y) = x^{2} + y^{2} - 2x - 4y$?"), 2),
  // level 4
  num(m(OP, "apply-hessian-det", "apply", 4, 30, "What is the determinant of the Hessian of $f(x, y) = x^{2} + xy + 2y^{2}$?"), 7),
  mcq(m(OP, "apply-saddle", "apply", 4, 30, "At a stationary point the Hessian is $\\operatorname{diag}(2, -3)$. The point is:"),
    "A saddle point",
    [
      ["A local minimum", "saddle-min", "One eigenvalue is negative."],
      ["A local maximum", "saddle-max", "One eigenvalue is positive."],
      ["Impossible to classify", "saddle-inconclusive", "Indefinite Hessians always give saddles."],
    ]),
  num(m(OP, "apply-eigen-min", "apply", 4, 30, "What is the smallest eigenvalue of the Hessian $\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$?"), 1),
  mcq(m(OP, "apply-no-minimiser", "apply", 4, 30, "Why does $\\min_{x \\in \\mathbb{R}} e^{x}$ have no solution?"),
    "The infimum $0$ is approached as $x \\to -\\infty$ but never attained",
    [
      ["$e^{x}$ is not differentiable", "no-min-differentiable", "It's smooth everywhere."],
      ["$e^{x}$ has several minima", "no-min-several", "It has none."],
      ["$e^{x}$ is not convex", "no-min-convex", "It's convex; convexity doesn't guarantee a minimiser."],
    ]),
  // level 5
  short(m(OP, "explain-first-order", "explain", 5, 90, "Use a Taylor expansion to explain why the gradient must vanish at an interior local minimiser of a smooth function."),
    [
      ["taylor", "$f(\\mathbf{x}^{*} + \\mathbf{d}) \\approx f(\\mathbf{x}^{*}) + \\nabla f(\\mathbf{x}^{*})^{\\top}\\mathbf{d}$ for small $\\mathbf{d}$", 2, true],
      ["contradiction", "If $\\nabla f \\ne \\mathbf{0}$, taking $\\mathbf{d} = -\\epsilon\\nabla f$ makes $f$ smaller, contradicting minimality", 2, true],
    ]),
  mcq(m(OP, "apply-weierstrass", "apply", 5, 40, "Which condition guarantees that a minimiser exists?"),
    "$f$ is continuous and the feasible set is closed and bounded (nonempty)",
    [
      ["$f$ is differentiable", "weierstrass-differentiable", "$e^{x}$ is differentiable with no minimiser."],
      ["The feasible set is open", "weierstrass-open", "$\\min x$ over $(0, 1)$ has no minimiser."],
      ["$f$ has a stationary point", "weierstrass-stationary", "It could be a maximum or saddle."],
    ]),
  mcq(m(OP, "apply-higher-order", "apply", 5, 40, "Each of $x^{4}$, $-x^{4}$ and $x^{3}$ has $f'(0) = f''(0) = 0$. Which has a local minimum at $0$?"),
    "$x^{4}$",
    [
      ["$-x^{4}$", "higher-negative", "That has a maximum at $0$."],
      ["$x^{3}$", "higher-cubic", "That has an inflection point at $0$."],
      ["All three", "higher-all", "The second-order test is inconclusive; only $x^{4}$ is a minimum."],
    ]),
  num(m(OP, "apply-quadratic-solve", "apply", 5, 40, "Minimise $\\frac{1}{2}\\mathbf{x}^{\\top}Q\\mathbf{x} - \\mathbf{b}^{\\top}\\mathbf{x}$ with $Q = \\operatorname{diag}(2, 4)$ and $\\mathbf{b} = [2, 8]$. What is the second component of the minimiser?"), 2),
  // level 6
  short(m(OP, "explain-necessary-sufficient", "explain", 6, 120, "Contrast the second-order necessary and second-order sufficient conditions for a local minimum."),
    [
      ["necessary", "Necessary: at a local minimiser, $\\nabla f = \\mathbf{0}$ and the Hessian is positive semidefinite", 2, true],
      ["sufficient", "Sufficient: $\\nabla f = \\mathbf{0}$ with a positive definite Hessian guarantees a strict local minimum; semidefinite alone can be inconclusive", 2, true],
    ]),
  num(m(OP, "apply-local-min-value", "apply", 6, 45, "$f(x, y) = x^{3} - 3x + y^{2}$ has a local minimum at $(1, 0)$. What is $f$ there?"), -2),
  mcq(m(OP, "apply-linear-rate", "apply", 6, 45, "A method converges linearly when, for some $c < 1$:"),
    "$\\|\\mathbf{x}_{k+1} - \\mathbf{x}^{*}\\| \\le c\\,\\|\\mathbf{x}_k - \\mathbf{x}^{*}\\|$",
    [
      ["$\\|\\mathbf{x}_{k+1} - \\mathbf{x}^{*}\\| \\le c\\,\\|\\mathbf{x}_k - \\mathbf{x}^{*}\\|^{2}$", "linear-quadratic", "That's quadratic convergence."],
      ["The error falls like $\\frac{1}{k}$", "linear-sublinear", "That's sublinear."],
      ["The error is a linear function of $k$", "linear-arithmetic", "Linear convergence means a geometric decrease."],
    ]),
  num(m(OP, "apply-quadratic-rate", "apply", 6, 45, "A method satisfies $e_{k+1} \\le e_k^{2}$. If $e_k = 10^{-2}$, what bound applies to $e_{k+1}$?"), 0.0001),
  // level 7
  num(m(OP, "transfer-rosenbrock", "transfer", 7, 60, "What is the Rosenbrock function $f(x, y) = (1 - x)^{2} + 100(y - x^{2})^{2}$ at $(0, 0)$?"), 1),
  short(m(OP, "transfer-small-gradient", "transfer", 7, 120, "An algorithm stops because $\\|\\nabla f(\\mathbf{x}_k)\\| < 10^{-8}$. Why doesn't this prove $\\mathbf{x}_k$ is a global minimiser?"),
    [
      ["stationary", "A small gradient only shows $\\mathbf{x}_k$ is near a stationary point, which could be a saddle, a maximum or a poor local minimum", 2, true],
      ["convexity", "Only with extra structure, such as convexity, does a stationary point have to be a global minimiser", 2, true],
    ]),
  num(m(OP, "transfer-linear-steps", "transfer", 7, 60, "A method halves the error each step, starting from error $1$. How many steps until the error is below $10^{-3}$?"), 10),
  mcq(m(OP, "transfer-superlinear", "transfer", 7, 60, "Superlinear convergence means:"),
    "$\\frac{\\|\\mathbf{x}_{k+1} - \\mathbf{x}^{*}\\|}{\\|\\mathbf{x}_k - \\mathbf{x}^{*}\\|} \\to 0$",
    [
      ["The error ratio tends to $1$", "superlinear-one", "That's slower than linear."],
      ["The error halves each step", "superlinear-half", "That's linear with rate $\\frac{1}{2}$."],
      ["Convergence in finitely many steps", "superlinear-finite", "Superlinear methods need not terminate."],
    ]),
  // level 8
  num(m(OP, "transfer-taylor", "transfer", 8, 60, "Use the second-order Taylor model of $e^{x}$ at $0$ to estimate $e^{0.1}$. Give $3$ decimal places."), 1.105),
  short(m(OP, "transfer-nonconvex-hard", "transfer", 8, 120, "Why is finding a global minimiser of a general non-convex function hard, while finding a local one is comparatively easy?"),
    [
      ["local", "Local methods only need local information (gradients, Hessians), and descent from any start reaches some stationary point", 2, true],
      ["global", "There may be exponentially many local minima, and local information can't tell which basin holds the global one; certifying global optimality needs global information", 2, true],
    ]),
  num(m(OP, "transfer-digits", "transfer", 8, 60, "Under quadratic convergence the number of correct digits roughly doubles each step. Starting with $3$ correct digits, about how many are correct after $2$ more steps?"), 12),
  mcq(m(OP, "transfer-infeasible", "transfer", 8, 60, "The constraints $x \\ge 2$ and $x \\le 1$ make a problem:"),
    "Infeasible — the feasible set is empty",
    [
      ["Unbounded", "infeasible-unbounded", "Unbounded means feasible points with $f \\to -\\infty$."],
      ["Convex with a unique solution", "infeasible-unique", "No point is feasible."],
      ["Solvable by ignoring one constraint", "infeasible-ignore", "That solves a different problem."],
    ]),
  // level 9
  short(m(OP, "transfer-epigraph", "transfer", 9, 150, "Minimising $\\max_i f_i(\\mathbf{x})$ is nonsmooth. Show how to rewrite it as a smooth constrained problem."),
    [
      ["epigraph", "Introduce a variable $t$ and minimise $t$ subject to $f_i(\\mathbf{x}) \\le t$ for every $i$", 2, true],
      ["equivalence", "At the optimum $t$ equals the largest $f_i$, so the problems have the same solutions, and the new one has smooth objective and constraints", 2, true],
    ]),
  num(m(OP, "transfer-least-squares", "transfer", 9, 75, "Minimise $\\sum_i (y_i - \\beta x_i)^{2}$ for data $x = (1, 2)$ and $y = (2, 3)$. What is $\\hat{\\beta}$?"), 1.6),
  mcq(m(OP, "transfer-saddles", "transfer", 9, 75, "In very high-dimensional non-convex problems (such as neural network training), which kind of stationary point is most common?"),
    "Saddle points",
    [
      ["Strict local minima", "saddles-minima", "A minimum needs every Hessian eigenvalue positive, which is unlikely in high dimensions."],
      ["Global maxima", "saddles-maxima", "These are rare and irrelevant to minimisation."],
      ["Points with zero Hessian", "saddles-zero", "Degenerate points aren't typical."],
    ]),
  num(m(OP, "transfer-saddle-eigen", "transfer", 9, 75, "What is the product of the Hessian eigenvalues of $f(x, y) = x^{2} - y^{2}$?"), -4),
  // level 10
  short(m(OP, "transfer-mle", "transfer", 10, 180, "Why is maximum likelihood estimation an optimisation problem, and what first-order condition does the estimate satisfy?"),
    [
      ["objective", "The estimate maximises the log-likelihood $\\ell(\\boldsymbol{\\theta})$ (equivalently minimises $-\\ell$) over the parameter space", 2, true],
      ["condition", "At an interior optimum the score vanishes: $\\nabla_{\\boldsymbol{\\theta}}\\ell(\\hat{\\boldsymbol{\\theta}}) = \\mathbf{0}$ (the likelihood equations)", 2, true],
    ]),
  num(m(OP, "transfer-ridge", "transfer", 10, 90, "Minimise $\\sum_i (y_i - \\beta x_i)^{2} + \\lambda\\beta^{2}$ with $\\sum x_iy_i = 8$, $\\sum x_i^{2} = 5$ and $\\lambda = 3$. What is $\\hat{\\beta}$?"), 1),
  mcq(m(OP, "transfer-unbounded", "transfer", 10, 90, "Which problem is unbounded below?"),
    "Minimise $x + y$ subject to $x - y \\le 1$",
    [
      ["Minimise $x^{2} + y^{2}$", "unbounded-quadratic", "Its minimum is $0$."],
      ["Minimise $x$ subject to $0 \\le x \\le 1$", "unbounded-box", "Its minimum is $0$."],
      ["Minimise $e^{x}$", "unbounded-exp", "It's bounded below by $0$, though not attained."],
    ]),
  short(m(OP, "transfer-scaling", "transfer", 10, 180, "Rescaling a variable (e.g. measuring income in dollars instead of thousands) doesn't change the minimiser. Explain why it can still change how fast an algorithm finds it."),
    [
      ["same", "The minimiser just moves to the corresponding point in new units, so the problem is equivalent", 2, true],
      ["algorithm", "Gradients and curvature change with scale, altering the condition number; gradient descent slows on badly scaled problems, while affine-invariant Newton does not", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// convexity-for-optimization
// ---------------------------------------------------------------------------
const CV = "convexity-for-optimization";
const convexity: Item[] = [
  // level 1
  mcq(m(CV, "recall-convex-set", "recall", 1, 15, "A set $C$ is convex when:"),
    "The segment between any two points of $C$ lies entirely in $C$",
    [
      ["It contains the origin", "set-origin", "Convex sets needn't contain $0$."],
      ["It is bounded", "set-bounded", "Half-planes are convex and unbounded."],
      ["Its boundary is smooth", "set-smooth", "Polygons are convex with corners."],
    ]),
  mcq(m(CV, "recall-ball", "recall", 1, 15, "Which set is convex?"),
    "A solid ball $\\{\\mathbf{x} : \\|\\mathbf{x}\\| \\le 1\\}$",
    [
      ["A circle $\\{\\mathbf{x} : \\|\\mathbf{x}\\| = 1\\}$", "ball-sphere", "The midpoint of two opposite points isn't on the circle."],
      ["A ring $\\{1 \\le \\|\\mathbf{x}\\| \\le 2\\}$", "ball-ring", "It has a hole."],
      ["Two disjoint intervals", "ball-union", "The segment between them leaves the set."],
    ]),
  mcq(m(CV, "recall-local-global", "recall", 1, 15, "For a convex function on a convex set, every local minimum is:"),
    "A global minimum",
    [
      ["A saddle point", "local-saddle", "Convex functions have no saddles of that kind."],
      ["Unique", "local-unique", "Convex functions can have many minimisers (a flat bottom)."],
      ["Strict", "local-strict", "Strictness needs strict convexity."],
    ]),
  mcq(m(CV, "recall-second-order", "recall", 1, 15, "A twice-differentiable $f$ is convex if and only if:"),
    "Its Hessian is positive semidefinite everywhere",
    [
      ["Its gradient is never zero", "second-gradient", "Convex functions often have $\\nabla f = \\mathbf{0}$ at their minimum."],
      ["Its Hessian is negative definite", "second-negative", "That's concavity."],
      ["It is positive everywhere", "second-positive", "Positivity is unrelated to convexity."],
    ]),
  // level 2
  num(m(CV, "apply-exp-second", "apply", 2, 20, "What is the second derivative of $f(x) = e^{2x}$ at $x = 0$?"), 4),
  mcq(m(CV, "apply-union", "apply", 2, 20, "Which operation does NOT always produce a convex set from convex sets?"),
    "Union",
    [
      ["Intersection", "union-intersection", "Intersections of convex sets are convex."],
      ["Affine image", "union-affine", "Affine maps preserve convexity."],
      ["Scaling by a positive constant", "union-scale", "Scaling preserves convexity."],
    ]),
  num(m(CV, "apply-convex-combination", "apply", 2, 20, "What is the convex combination $0.25 \\cdot 2 + 0.75 \\cdot 6$?"), 5),
  mcq(m(CV, "apply-abs", "apply", 2, 20, "Is $f(x) = |x|$ convex?"),
    "Yes — it is a norm, though not differentiable at $0$",
    [
      ["No, because it has a kink", "abs-kink", "Convexity doesn't need differentiability."],
      ["Only for $x > 0$", "abs-positive", "It's convex on all of $\\mathbb{R}$."],
      ["No, because $f''(0)$ doesn't exist", "abs-second", "The Hessian test applies only to twice-differentiable functions."],
    ]),
  // level 3
  num(m(CV, "apply-chord", "apply", 3, 25, "For $f(x) = x^{2}$, $x = 0$ and $y = 4$, what is the chord value $\\frac{1}{2}f(x) + \\frac{1}{2}f(y)$?"), 8),
  num(m(CV, "apply-det", "apply", 3, 25, "What is the determinant of $\\begin{bmatrix} 4 & 2 \\\\ 2 & 2 \\end{bmatrix}$?"), 4),
  mcq(m(CV, "apply-norm", "apply", 3, 25, "Why is every norm convex?"),
    "The triangle inequality and homogeneity give $\\|\\theta\\mathbf{x} + (1 - \\theta)\\mathbf{y}\\| \\le \\theta\\|\\mathbf{x}\\| + (1 - \\theta)\\|\\mathbf{y}\\|$",
    [
      ["Norms are differentiable", "norm-differentiable", "Norms have a kink at $\\mathbf{0}$."],
      ["Norms are linear", "norm-linear", "They're not linear."],
      ["Norms are always quadratic", "norm-quadratic", "Only the squared Euclidean norm is."],
    ]),
  num(m(CV, "apply-log-second", "apply", 3, 25, "What is the second derivative of $f(x) = -\\ln x$ at $x = 0.5$?"), 4),
  // level 4
  num(m(CV, "apply-smoothness", "apply", 4, 30, "For $f(x, y) = \\frac{1}{2}(x^{2} + 9y^{2})$, what is the smoothness constant $L$?"), 9),
  num(m(CV, "apply-strong", "apply", 4, 30, "For the same function, what is the strong convexity constant $\\mu$?"), 1),
  num(m(CV, "apply-condition", "apply", 4, 30, "And its condition number $\\kappa = \\frac{L}{\\mu}$?"), 9),
  mcq(m(CV, "apply-pointwise-max", "apply", 4, 30, "The pointwise maximum $\\max(f_1(\\mathbf{x}), f_2(\\mathbf{x}))$ of two convex functions is:"),
    "Convex",
    [
      ["Concave", "max-concave", "The maximum of convex functions stays convex."],
      ["Convex only if $f_1 = f_2$", "max-equal", "It's always convex."],
      ["Never differentiable", "max-nondiff", "It can be differentiable, and differentiability isn't the question."],
    ]),
  // level 5
  short(m(CV, "explain-first-order", "explain", 5, 90, "State the first-order characterisation of convexity and explain why it makes $\\nabla f(\\mathbf{x}^{*}) = \\mathbf{0}$ sufficient for a global minimum."),
    [
      ["condition", "$f(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^{\\top}(\\mathbf{y} - \\mathbf{x})$: every tangent plane lies below the function", 2, true],
      ["consequence", "With $\\nabla f(\\mathbf{x}^{*}) = \\mathbf{0}$ it gives $f(\\mathbf{y}) \\ge f(\\mathbf{x}^{*})$ for all $\\mathbf{y}$", 2, true],
    ]),
  mcq(m(CV, "apply-product", "apply", 5, 40, "Which is NOT convex on $\\mathbb{R}$, even though it is a product of convex functions?"),
    "$x \\cdot x^{2} = x^{3}$",
    [
      ["$x^{2} \\cdot x^{2} = x^{4}$", "product-quartic", "$x^{4}$ is convex."],
      ["$e^{x} \\cdot e^{x} = e^{2x}$", "product-exp", "$e^{2x}$ is convex."],
      ["$|x| \\cdot |x| = x^{2}$", "product-abs", "$x^{2}$ is convex."],
    ]),
  num(m(CV, "apply-quartic", "apply", 5, 40, "What is $f''(1)$ for $f(x) = x^{4}$?"), 12),
  mcq(m(CV, "apply-sublevel", "apply", 5, 40, "For convex $f$, the sublevel set $\\{\\mathbf{x} : f(\\mathbf{x}) \\le \\alpha\\}$ is:"),
    "Convex",
    [
      ["Always bounded", "sublevel-bounded", "For $f(x) = e^{x}$ it's a half-line."],
      ["Always nonempty", "sublevel-nonempty", "For small $\\alpha$ it can be empty."],
      ["A single point", "sublevel-point", "Usually it's a region."],
    ]),
  // level 6
  short(m(CV, "explain-strong-unique", "explain", 6, 120, "Why does strong convexity guarantee a unique minimiser?"),
    [
      ["growth", "Strong convexity gives $f(\\mathbf{y}) \\ge f(\\mathbf{x}^{*}) + \\frac{\\mu}{2}\\|\\mathbf{y} - \\mathbf{x}^{*}\\|^{2}$ at a minimiser, so $f$ grows at least quadratically away from it", 2, true],
      ["unique", "Any other point has strictly larger value, so no second minimiser exists (and the growth also ensures one exists)", 2, true],
    ]),
  num(m(CV, "apply-tangent-bound", "apply", 6, 45, "For $f(x) = x^{2}$, the tangent at $x = 1$ gives the bound $f(y) \\ge 1 + 2(y - 1)$. What lower bound does it give at $y = 3$?"), 5),
  num(m(CV, "apply-negative-eigen", "apply", 6, 45, "What is the negative eigenvalue of $\\begin{bmatrix} 2 & 4 \\\\ 4 & 2 \\end{bmatrix}$?"), -2),
  mcq(m(CV, "apply-logistic", "apply", 6, 45, "Why is the logistic regression loss convex in the coefficients?"),
    "Each term $\\ln(1 + e^{-y\\mathbf{x}^{\\top}\\boldsymbol{\\beta}})$ is a convex function of an affine function of $\\boldsymbol{\\beta}$, and sums preserve convexity",
    [
      ["Because the sigmoid is convex", "logistic-sigmoid", "The sigmoid is neither convex nor concave."],
      ["Because it is quadratic", "logistic-quadratic", "It isn't quadratic."],
      ["It isn't convex", "logistic-not", "It is convex, which is why it has no spurious local minima."],
    ]),
  // level 7
  num(m(CV, "transfer-kappa", "transfer", 7, 60, "A quadratic's Hessian has eigenvalues $0.5$ and $50$. What is its condition number?"), 100),
  short(m(CV, "transfer-composition", "transfer", 7, 120, "State a composition rule that preserves convexity and use it to show $e^{\\|\\mathbf{x}\\|^{2}}$ is convex."),
    [
      ["rule", "If $g$ is convex and $h$ is convex and nondecreasing, then $h(g(\\mathbf{x}))$ is convex", 2, true],
      ["apply", "$\\|\\mathbf{x}\\|^{2}$ is convex and $e^{t}$ is convex and increasing, so $e^{\\|\\mathbf{x}\\|^{2}}$ is convex", 2, true],
    ]),
  mcq(m(CV, "transfer-cubic", "transfer", 7, 60, "Why is $f(x) = x^{3}$ not convex on $\\mathbb{R}$?"),
    "$f''(x) = 6x$ is negative for $x < 0$",
    [
      ["It isn't differentiable", "cubic-differentiable", "It's smooth."],
      ["It has no minimum", "cubic-minimum", "Lacking a minimum doesn't rule out convexity ($e^{x}$)."],
      ["It's odd", "cubic-odd", "Oddness isn't the issue; the curvature sign is."],
    ]),
  num(m(CV, "transfer-strong-param", "transfer", 7, 60, "What is the largest $\\mu$ for which $f(x) = x^{2}$ is $\\mu$-strongly convex?"), 2),
  // level 8
  num(m(CV, "transfer-softplus-L", "transfer", 8, 60, "The softplus $f(x) = \\ln(1 + e^{x})$ has $f''(x) = \\sigma(x)(1 - \\sigma(x))$. What is its smoothness constant $L$ (the maximum of $f''$)?"), 0.25),
  short(m(CV, "transfer-psd-cone", "transfer", 8, 120, "Show that the set of positive semidefinite matrices is convex."),
    [
      ["definition", "$A \\succeq 0$ means $\\mathbf{v}^{\\top}A\\mathbf{v} \\ge 0$ for every vector $\\mathbf{v}$", 2, true],
      ["combination", "For $A, B \\succeq 0$ and $\\theta \\in [0, 1]$, $\\mathbf{v}^{\\top}(\\theta A + (1 - \\theta)B)\\mathbf{v} = \\theta\\mathbf{v}^{\\top}A\\mathbf{v} + (1 - \\theta)\\mathbf{v}^{\\top}B\\mathbf{v} \\ge 0$", 2, true],
    ]),
  mcq(m(CV, "transfer-indicator", "transfer", 8, 60, "The indicator function of a set $C$ ($0$ on $C$, $+\\infty$ elsewhere) is convex when:"),
    "$C$ is convex",
    [
      ["$C$ is bounded", "indicator-bounded", "Boundedness isn't required."],
      ["$C$ is finite", "indicator-finite", "A finite set of several points isn't convex."],
      ["Always", "indicator-always", "A non-convex $C$ gives a non-convex indicator."],
    ]),
  num(m(CV, "transfer-upper-bound", "transfer", 8, 60, "For $f(x) = x^{2}$ with $L = 2$, evaluate the quadratic upper bound $f(x) + f'(x)(y - x) + \\frac{L}{2}(y - x)^{2}$ at $x = 1$, $y = 2$."), 4),
  // level 9
  short(m(CV, "transfer-relaxation", "transfer", 9, 150, "Why do sparse estimation methods replace the count of nonzeros $\\|\\boldsymbol{\\beta}\\|_0$ with $\\|\\boldsymbol{\\beta}\\|_1$?"),
    [
      ["nonconvex", "$\\|\\boldsymbol{\\beta}\\|_0$ is non-convex and combinatorial: minimising with it means searching over subsets", 2, true],
      ["relaxation", "$\\|\\boldsymbol{\\beta}\\|_1$ is its tightest convex relaxation on a box; it keeps the problem convex and still produces exact zeros", 2, true],
    ]),
  num(m(CV, "transfer-ls-kappa", "transfer", 9, 75, "A least-squares problem has $X^{\\top}X$ with eigenvalues $4$ and $1$. What is the condition number of the objective?"), 4),
  mcq(m(CV, "transfer-strict-not-strong", "transfer", 9, 75, "Which function is strictly convex but not strongly convex on $\\mathbb{R}$?"),
    "$e^{x}$",
    [
      ["$x^{2}$", "strict-quadratic", "$x^{2}$ is $2$-strongly convex."],
      ["$|x|$", "strict-abs", "$|x|$ isn't strictly convex (it's linear on each side)."],
      ["$x$", "strict-linear", "Linear functions aren't strictly convex."],
    ]),
  num(m(CV, "transfer-iterations-ratio", "transfer", 9, 75, "Gradient descent needs about $\\kappa\\ln\\frac{1}{\\varepsilon}$ iterations. By what factor does the work grow when $\\kappa$ goes from $10$ to $1{,}000$?"), 100),
  // level 10
  short(m(CV, "transfer-deep-learning", "transfer", 10, 180, "Neural network losses are non-convex, yet gradient methods train them well. Give two reasons this can happen."),
    [
      ["landscape", "In overparameterised networks many local minima have similar, low loss, and most bad stationary points are saddles that gradient noise escapes", 2, true],
      ["structure", "Good initialisation, architecture (residuals, normalisation) and implicit regularisation of SGD steer training toward good, flat regions", 2, true],
    ]),
  mcq(m(CV, "transfer-unimodal", "transfer", 10, 90, "A quasi-convex (unimodal) function on $\\mathbb{R}$, like $\\sqrt{|x|}$:"),
    "Has convex sublevel sets but may not be convex, so tangent-line bounds can fail",
    [
      ["Is always convex", "unimodal-convex", "$\\sqrt{|x|}$ is not convex."],
      ["Has several separated minima", "unimodal-several", "Unimodal means a single basin."],
      ["Cannot be minimised by bisection-type methods", "unimodal-bisection", "Golden-section search works on unimodal functions."],
    ]),
  short(m(CV, "transfer-equality", "transfer", 10, 180, "Why does a convex optimisation problem only allow affine equality constraints?"),
    [
      ["set", "The feasible set $\\{\\mathbf{x} : h(\\mathbf{x}) = 0\\}$ must be convex, and for a nonlinear $h$ (e.g. $x^{2} + y^{2} = 1$) it usually isn't", 2, true],
      ["affine", "If $h$ is affine, its zero set is an affine subspace, which is convex; writing $h = 0$ as $h \\le 0$ and $-h \\le 0$ needs both $h$ and $-h$ convex, i.e. $h$ affine", 2, true],
    ]),
  num(m(CV, "transfer-jensen-gap", "transfer", 10, 90, "For convex $f(x) = x^{2}$ and a random $X$ equal to $0$ or $4$ with equal probability, what is $\\mathbb{E}[f(X)] - f(\\mathbb{E}[X])$?"), 4),
];

// ---------------------------------------------------------------------------
// bisection-method
// ---------------------------------------------------------------------------
const BI = "bisection-method";
const bisection: Item[] = [
  // level 1
  mcq(m(BI, "recall-sign-change", "recall", 1, 15, "To start bisection on $[a, b]$, the function must satisfy:"),
    "$f(a)$ and $f(b)$ have opposite signs",
    [
      ["$f(a) = f(b)$", "sign-equal", "Equal values give no bracket."],
      ["$f'(a) > 0$", "sign-derivative", "Bisection uses no derivatives."],
      ["$f$ is a polynomial", "sign-polynomial", "Any continuous $f$ works."],
    ]),
  mcq(m(BI, "recall-ivt", "recall", 1, 15, "Which theorem guarantees a root inside a bracket?"),
    "The intermediate value theorem",
    [
      ["The mean value theorem", "ivt-mvt", "That concerns derivatives."],
      ["Taylor's theorem", "ivt-taylor", "That gives local approximations."],
      ["The central limit theorem", "ivt-clt", "That's probability."],
    ]),
  mcq(m(BI, "recall-halves", "recall", 1, 15, "Each bisection step:"),
    "Halves the width of the bracketing interval",
    [
      ["Doubles the number of correct digits", "halves-digits", "That's Newton's quadratic convergence."],
      ["Shrinks the interval by a factor of $10$", "halves-ten", "It halves it."],
      ["Uses the derivative to choose the next point", "halves-derivative", "It uses only signs."],
    ]),
  mcq(m(BI, "recall-guarantee", "recall", 1, 15, "For a continuous function with a valid starting bracket, bisection:"),
    "Always converges to a root",
    [
      ["Converges only from a close starting point", "guarantee-local", "That's Newton's limitation."],
      ["Can diverge", "guarantee-diverge", "The root stays bracketed."],
      ["Needs $f$ to be convex", "guarantee-convex", "Only continuity is needed."],
    ]),
  // level 2
  num(m(BI, "apply-midpoint", "apply", 2, 20, "What is the first midpoint when bisecting $[2, 5]$?"), 3.5),
  num(m(BI, "apply-width", "apply", 2, 20, "A bracket of width $8$ is bisected $3$ times. What is its width?"), 1),
  num(m(BI, "apply-sign-product", "apply", 2, 20, "For $f(x) = x^{2} - 3$, what is $f(1) \\cdot f(2)$?"), -2),
  mcq(m(BI, "apply-keep", "apply", 2, 20, "On $[a, b]$ with midpoint $m$, $f(a) < 0$, $f(b) > 0$ and $f(m) > 0$. Which interval is kept?"),
    "$[a, m]$",
    [
      ["$[m, b]$", "keep-right", "$f(m)$ and $f(b)$ have the same sign, so no guaranteed root there."],
      ["$[a, b]$", "keep-whole", "The bracket must shrink."],
      ["Neither", "keep-neither", "$[a, m]$ still has a sign change."],
    ]),
  // level 3
  num(m(BI, "apply-cubic-mid1", "apply", 3, 25, "Bisect $f(x) = x^{3} - x - 2$ on $[1, 2]$. What is $f$ at the first midpoint?"), -0.125),
  num(m(BI, "apply-cubic-mid2", "apply", 3, 25, "Continuing, what is the second midpoint?"), 1.75),
  num(m(BI, "apply-steps-tol", "apply", 3, 25, "Starting from width $1$, how many halvings make the width at most $0.001$?"), 10),
  num(m(BI, "apply-steps-tol-2", "apply", 3, 25, "Starting from width $2$, how many halvings make the width at most $10^{-6}$?"), 21),
  // level 4
  num(m(BI, "apply-error-bound", "apply", 4, 30, "Bisecting $[0, 1]$, the midpoint after $4$ halvings is within $\\frac{1}{2^{5}}$ of the root. What is that bound?"), 0.03125),
  num(m(BI, "apply-digits", "apply", 4, 30, "How many decimal digits does each bisection step gain, $\\log_{10} 2$? Give $4$ decimal places."), 0.301),
  mcq(m(BI, "apply-double-root", "apply", 4, 30, "Why can't bisection find the root of $f(x) = (x - 1)^{2}$?"),
    "$f$ touches zero without changing sign, so no bracket exists",
    [
      ["$f$ isn't continuous", "double-continuous", "It's continuous."],
      ["The root is irrational", "double-irrational", "The root is $1$."],
      ["$f$ grows too fast", "double-fast", "Growth isn't the issue."],
    ]),
  num(m(BI, "apply-cos", "apply", 4, 30, "For $f(x) = \\cos x - x$, what is $f(1)$? Give $4$ decimal places."), -0.4597),
  // level 5
  short(m(BI, "explain-linear", "explain", 5, 90, "Why does bisection converge only linearly, and with what rate?"),
    [
      ["halving", "Each step halves the bracket regardless of how close the midpoint is, so the error bound shrinks by a constant factor", 2, true],
      ["rate", "The rate is $\\frac{1}{2}$: one binary digit per step, using no information about the shape of $f$", 2, true],
    ]),
  mcq(m(BI, "apply-discontinuity", "apply", 5, 40, "Bisection on $f(x) = \\frac{1}{x}$ over $[-1, 1]$ converges to $0$. What happened?"),
    "$f$ changes sign at a discontinuity, not a root — the method needs continuity",
    [
      ["$0$ is a root of $\\frac{1}{x}$", "discontinuity-root", "$\\frac{1}{x}$ is never zero."],
      ["Bisection diverged", "discontinuity-diverged", "It converged, to the wrong kind of point."],
      ["The tolerance was too large", "discontinuity-tolerance", "No tolerance fixes a missing root."],
    ]),
  num(m(BI, "apply-golden", "apply", 5, 40, "Golden-section search shrinks the bracket by about $0.618$ per evaluation. How many evaluations reduce it below $10^{-3}$ of its original width?"), 15),
  mcq(m(BI, "apply-minimise", "apply", 5, 40, "To minimise a differentiable unimodal $f$ on $[a, b]$ with bisection, you can:"),
    "Bisect on $f'$, which changes sign at the minimiser",
    [
      ["Bisect on $f$ itself", "minimise-f", "$f$ needn't change sign at a minimum."],
      ["Always take the left half", "minimise-left", "The choice must depend on the sign of $f'$."],
      ["Bisect on $f''$", "minimise-second", "$f''$ locates inflection points."],
    ]),
  // level 6
  short(m(BI, "explain-dimensions", "explain", 6, 120, "Why doesn't bisection extend directly to systems of equations in several variables?"),
    [
      ["no-bracket", "In several dimensions there is no ordering, so a sign change at two points doesn't bracket a solution", 2, true],
      ["consequence", "Multivariate root finding relies on Newton-type methods (or more elaborate topological methods) instead", 2, true],
    ]),
  num(m(BI, "apply-compare-newton", "apply", 6, 45, "How many bisection steps reduce a width-$0.1$ bracket below $10^{-8}$?"), 24),
  mcq(m(BI, "apply-multiple-roots", "apply", 6, 45, "A bracket contains three roots. Bisection will:"),
    "Converge to one of them, without control over which",
    [
      ["Fail to converge", "multiple-fail", "A sign change persists in one half every step."],
      ["Converge to their average", "multiple-average", "It converges to an actual root."],
      ["Find all three", "multiple-all", "It tracks one bracket."],
    ]),
  num(m(BI, "apply-fourth-mid", "apply", 6, 45, "Bisecting $f(x) = x^{2} - 2$ on $[1, 2]$, the midpoints are $1.5$, $1.25$ and $1.375$. What is the fourth midpoint?"), 1.4375),
  // level 7
  short(m(BI, "transfer-brent", "transfer", 7, 120, "What does Brent's method combine, and why?"),
    [
      ["combine", "Fast interpolation steps (secant, inverse quadratic) with bisection as a fallback, always keeping a bracket", 2, true],
      ["why", "It gets superlinear speed when interpolation behaves and keeps bisection's guarantee when it doesn't", 2, true],
    ]),
  num(m(BI, "transfer-machine", "transfer", 7, 60, "Starting from width $1$, how many halvings reach width $2^{-52}$ (about double-precision spacing near $1$)?"), 52),
  mcq(m(BI, "transfer-stopping", "transfer", 7, 60, "Why is stopping on interval width usually more reliable than stopping on $|f(m)| < \\varepsilon$?"),
    "A small $|f(m)|$ can happen far from the root when $f$ is flat, while the width directly bounds the error in $x$",
    [
      ["$|f(m)|$ can't be computed", "stopping-compute", "It's computed every step."],
      ["Width never shrinks", "stopping-shrink", "It halves every step."],
      ["They're always equivalent", "stopping-equivalent", "They differ when the slope is far from $1$."],
    ]),
  num(m(BI, "transfer-expand", "transfer", 7, 60, "To bracket the root of $f(x) = x - 10$ from $[0, 1]$, the right end is doubled ($2, 4, 8, \\ldots$) until $f$ changes sign. How many doublings are needed?"), 4),
  // level 8
  short(m(BI, "transfer-implied-vol", "transfer", 8, 120, "Why is bisection a sensible default for computing an option's implied volatility?"),
    [
      ["monotone", "The option price is continuous and increasing in volatility, so a sign change in price minus market price brackets a unique root", 2, true],
      ["robust", "Bisection is guaranteed to converge where Newton can fail (vega near zero for deep in- or out-of-the-money options)", 2, true],
    ]),
  num(m(BI, "transfer-vol-steps", "transfer", 8, 60, "An implied volatility is bracketed in $[0, 1]$. How many halvings bring the width to at most $10^{-4}$?"), 14),
  mcq(m(BI, "transfer-regula-falsi", "transfer", 8, 60, "Regula falsi keeps a bracket but uses a secant point instead of the midpoint. Its common weakness is:"),
    "One endpoint gets stuck, so the bracket shrinks slowly from one side only",
    [
      ["It loses the bracket", "falsi-bracket", "It always keeps a sign change."],
      ["It needs derivatives", "falsi-derivatives", "It uses only function values."],
      ["It converges quadratically", "falsi-quadratic", "That would be a strength."],
    ]),
  num(m(BI, "transfer-cost", "transfer", 8, 60, "Each evaluation of $f$ takes $1$ ms. About how many milliseconds do $30$ bisection steps take (one evaluation per step)?"), 30),
  // level 9
  short(m(BI, "transfer-quantile", "transfer", 9, 150, "How can bisection compute a quantile of a continuous distribution whose CDF $F$ can be evaluated but not inverted?"),
    [
      ["equation", "Solve $F(x) - p = 0$; since $F$ is continuous and nondecreasing, a bracket where it changes sign contains the quantile", 2, true],
      ["procedure", "Bisect that bracket until its width meets the tolerance; the monotonicity makes the method reliable", 2, true],
    ]),
  num(m(BI, "transfer-median", "transfer", 9, 75, "Bisection on $1 - e^{-x} - 0.5$ finds the median of an Exponential($1$) variable. What value does it converge to? Give $4$ decimal places."), 0.6931),
  mcq(m(BI, "transfer-binary-search", "transfer", 9, 75, "Binary search on a sorted list is bisection on a discrete problem. How does its cost grow with the list length $n$?"),
    "$O(\\log n)$",
    [
      ["$O(n)$", "binary-linear", "That's a linear scan."],
      ["$O(n\\log n)$", "binary-nlogn", "That's sorting."],
      ["$O(1)$", "binary-constant", "Each step halves the range, so it grows with $n$."],
    ]),
  num(m(BI, "transfer-binary-steps", "transfer", 9, 75, "In the worst case, how many comparisons does binary search need on $10^{6}$ sorted items, $\\lceil\\log_2(10^{6})\\rceil$?"), 20),
  // level 10
  short(m(BI, "transfer-robust-choice", "transfer", 10, 180, "When would you deliberately choose bisection over Newton's method, despite its slower convergence?"),
    [
      ["cases", "When derivatives are unavailable or unreliable, evaluations are noisy, or a failure would be costly (e.g. inside an automated pipeline)", 2, true],
      ["reason", "Bisection's guarantee and predictable cost matter more there than speed, especially when each evaluation is cheap", 2, true],
    ]),
  num(m(BI, "transfer-ratio", "transfer", 10, 90, "After $10$ evaluations, by what factor is a golden-section bracket ($0.618$ per step) wider than a bisection bracket ($0.5$ per step)? Give $2$ decimal places."), 8.32),
  mcq(m(BI, "transfer-noisy", "transfer", 10, 90, "Function values are corrupted by noise of size $10^{-6}$. What happens to bisection near the root?"),
    "Once $|f|$ is below the noise level, sign decisions become random, so the bracket may be wrong — accuracy is limited to where $|f|$ exceeds the noise",
    [
      ["Nothing — bisection is immune to noise", "noisy-immune", "Sign tests can be fooled when $|f|$ is tiny."],
      ["It diverges to infinity", "noisy-diverge", "The interval still shrinks; it may just lose the root."],
      ["It converges faster", "noisy-faster", "Noise never helps."],
    ]),
  short(m(BI, "transfer-hybrid-design", "transfer", 10, 180, "Design a safeguarded root finder that uses Newton steps but never loses a bracket."),
    [
      ["newton", "From the current point, compute the Newton step; accept it if it lands inside the current bracket (and shrinks it enough)", 2, true],
      ["fallback", "Otherwise take a bisection step; after each step update the bracket using the sign of $f$ at the new point", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// newton-raphson-method
// ---------------------------------------------------------------------------
const NR = "newton-raphson-method";
const newtonRaphson: Item[] = [
  // level 1
  mcq(m(NR, "recall-update", "recall", 1, 15, "The Newton–Raphson update for solving $f(x) = 0$ is:"),
    "$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$",
    [
      ["$x_{n+1} = x_n - f'(x_n)$", "update-gradient", "That's a gradient step on $f$, not root finding."],
      ["$x_{n+1} = \\frac{x_n + f(x_n)}{2}$", "update-average", "That isn't Newton's method."],
      ["$x_{n+1} = x_n - \\frac{f'(x_n)}{f(x_n)}$", "update-inverted", "The ratio is upside down."],
    ]),
  mcq(m(NR, "recall-tangent", "recall", 1, 15, "Geometrically, each Newton–Raphson step:"),
    "Moves to where the tangent line at $x_n$ crosses zero",
    [
      ["Moves to the midpoint of a bracket", "tangent-midpoint", "That's bisection."],
      ["Fits a parabola through three points", "tangent-parabola", "That's inverse quadratic interpolation."],
      ["Moves a fixed distance downhill", "tangent-fixed", "The step depends on $f$ and $f'$."],
    ]),
  mcq(m(NR, "recall-needs", "recall", 1, 15, "Besides $f$, Newton–Raphson needs:"),
    "The derivative $f'$",
    [
      ["A bracketing interval", "needs-bracket", "That's bisection."],
      ["The second derivative $f''$", "needs-second", "Only $f'$ is used."],
      ["Two starting points", "needs-two", "That's the secant method."],
    ]),
  mcq(m(NR, "recall-rate", "recall", 1, 15, "Near a simple root, Newton–Raphson converges:"),
    "Quadratically",
    [
      ["Linearly with rate $\\frac{1}{2}$", "rate-linear", "That's bisection."],
      ["Sublinearly", "rate-sublinear", "It's much faster."],
      ["In exactly one step", "rate-one", "Only for linear $f$."],
    ]),
  // level 2
  num(m(NR, "apply-sqrt-step", "apply", 2, 20, "Apply one Newton–Raphson step to $f(x) = x^{2} - 2$ from $x_0 = 1$."), 1.5),
  num(m(NR, "apply-linear", "apply", 2, 20, "Apply one step to $f(x) = 3x - 6$ from $x_0 = 10$."), 2),
  num(m(NR, "apply-sqrt9", "apply", 2, 20, "Apply one step to $f(x) = x^{2} - 9$ from $x_0 = 2$."), 3.25),
  mcq(m(NR, "apply-babylonian", "apply", 2, 20, "For $f(x) = x^{2} - a$, the Newton–Raphson update simplifies to:"),
    "$x_{n+1} = \\frac{1}{2}\\left(x_n + \\frac{a}{x_n}\\right)$",
    [
      ["$x_{n+1} = \\frac{x_n + a}{2}$", "babylonian-plain", "The second term is $\\frac{a}{x_n}$."],
      ["$x_{n+1} = x_n - 2x_n$", "babylonian-derivative", "That drops $f$."],
      ["$x_{n+1} = \\sqrt{a}$", "babylonian-exact", "That's the answer, not the update."],
    ]),
  // level 3
  num(m(NR, "apply-second-step", "apply", 3, 25, "Continuing $x^{2} - 2$ from $x_1 = 1.5$, what is $x_2$? Give $4$ decimal places."), 1.4167),
  num(m(NR, "apply-cube-root", "apply", 3, 25, "Apply one step to $f(x) = x^{3} - 8$ from $x_0 = 3$. Give $4$ decimal places."), 2.2963),
  num(m(NR, "apply-reciprocal", "apply", 3, 25, "Newton–Raphson on $f(x) = \\frac{1}{x} - a$ gives $x_{n+1} = x_n(2 - ax_n)$, computing $\\frac{1}{a}$ without division. With $a = 4$ and $x_0 = 0.2$, what is $x_1$?"), 0.24),
  num(m(NR, "apply-exp", "apply", 3, 25, "Apply one step to $f(x) = e^{x} - 2$ from $x_0 = 0$."), 1),
  // level 4
  num(m(NR, "apply-error-square", "apply", 4, 30, "Near a root, $e_{n+1} \\approx Ce_n^{2}$ with $C = 0.5$. If $e_n = 0.01$, about what is $e_{n+1}$?"), 0.00005),
  num(m(NR, "apply-constant", "apply", 4, 30, "For $f(x) = x^{2} - 2$, the error constant is $\\frac{f''(x^{*})}{2f'(x^{*})}$ at $x^{*} = \\sqrt{2}$. What is it? Give $4$ decimal places."), 0.3536),
  mcq(m(NR, "apply-zero-derivative", "apply", 4, 30, "What goes wrong when starting $f(x) = x^{2} - 2$ at $x_0 = 0$?"),
    "$f'(0) = 0$, so the tangent is horizontal and the step is undefined",
    [
      ["It converges to $-\\sqrt{2}$", "zero-derivative-negative", "It can't take a step at all."],
      ["It converges in one step", "zero-derivative-one", "The step divides by zero."],
      ["It cycles between two points", "zero-derivative-cycle", "That's a different failure."],
    ]),
  num(m(NR, "apply-cycle", "apply", 4, 30, "For $f(x) = x^{3} - 2x + 2$ from $x_0 = 0$, what is $x_1$?"), 1),
  // level 5
  short(m(NR, "explain-derivation", "explain", 5, 90, "Derive the Newton–Raphson update from a first-order Taylor expansion."),
    [
      ["linearise", "Near $x_n$, $f(x) \\approx f(x_n) + f'(x_n)(x - x_n)$", 2, true],
      ["solve", "Setting the linear model to zero and solving gives $x = x_n - \\frac{f(x_n)}{f'(x_n)}$, the next iterate", 2, true],
    ]),
  mcq(m(NR, "apply-cycle-continue", "apply", 5, 40, "Continuing $f(x) = x^{3} - 2x + 2$ from $x_1 = 1$, the next iterate is $x_2 = 0$. What happens next?"),
    "The iterates cycle $0, 1, 0, 1, \\ldots$ forever without converging",
    [
      ["It converges to the root", "cycle-converges", "It returns to $0$ and repeats."],
      ["It diverges to infinity", "cycle-diverges", "It stays in a 2-cycle."],
      ["It stops because $f'(0) = 0$", "cycle-stops", "$f'(0) = -2 \\ne 0$."],
    ]),
  num(m(NR, "apply-system", "apply", 5, 45, "For the system $x^{2} + y^{2} = 4$, $x - y = 0$, one Newton step from $(1, 1)$ solves $J\\mathbf{s} = -\\mathbf{F}$ with $J = \\begin{bmatrix} 2 & 2 \\\\ 1 & -1 \\end{bmatrix}$ and $\\mathbf{F} = (-2, 0)$. What is the new $x$?"), 1.5),
  mcq(m(NR, "apply-local", "apply", 5, 40, "Newton–Raphson is called locally convergent because:"),
    "Convergence is guaranteed only from starting points close enough to the root",
    [
      ["It only works on local data", "local-data", "The term refers to starting points."],
      ["It converges slowly", "local-slow", "It's fast when it converges."],
      ["It needs a bracket", "local-bracket", "It doesn't use brackets."],
    ]),
  // level 6
  short(m(NR, "explain-multiple-root", "explain", 6, 120, "Why does Newton–Raphson converge only linearly at a double root, and how can that be fixed?"),
    [
      ["why", "At a root of multiplicity $m$, $f'(x^{*}) = 0$, so the quadratic error analysis breaks down; the error shrinks by a factor $1 - \\frac{1}{m}$ per step", 2, true],
      ["fix", "Use the modified step $x - m\\frac{f(x)}{f'(x)}$ if $m$ is known, or apply Newton to $\\frac{f}{f'}$, which has a simple root there", 2, true],
    ]),
  num(m(NR, "apply-double-root", "apply", 6, 45, "For $f(x) = (x - 1)^{2}$, a Newton step from $x_0 = 3$ gives what?"), 2),
  num(m(NR, "apply-modified", "apply", 6, 45, "The modified step $x - 2\\frac{f(x)}{f'(x)}$ for the same $f$ from $x_0 = 3$ gives what?"), 1),
  num(m(NR, "apply-cube-root-diverge", "apply", 6, 45, "For $f(x) = x^{1/3}$, the Newton update is $x_{n+1} = -2x_n$. Starting from $x_0 = 0.1$, what is $x_3$?"), -0.8),
  // level 7
  num(m(NR, "transfer-digits", "transfer", 7, 60, "Newton–Raphson for $\\sqrt{2}$ has errors $0.086$, $0.0025$, $2.1 \\times 10^{-6}$. If the next error is about $0.35 \\times (2.1 \\times 10^{-6})^{2}$, roughly what power of ten is it (give the exponent)?"), -12),
  short(m(NR, "transfer-damping", "transfer", 7, 120, "How can Newton–Raphson be made more reliable far from the root without losing its speed near it?"),
    [
      ["damp", "Damp the step, $x_{n+1} = x_n - \\alpha\\frac{f(x_n)}{f'(x_n)}$, choosing $\\alpha \\le 1$ by backtracking so that $|f|$ decreases", 2, true],
      ["speed", "Near the root the full step $\\alpha = 1$ is accepted, so quadratic convergence is recovered; alternatively, safeguard with a bisection bracket", 2, true],
    ]),
  mcq(m(NR, "transfer-basins", "transfer", 7, 60, "For a polynomial with several roots, the starting points that lead to each root (the basins of attraction):"),
    "Can have intricate, even fractal, boundaries",
    [
      ["Are always intervals around each root", "basins-intervals", "Basins can interleave."],
      ["Are always equal in size", "basins-equal", "Sizes vary."],
      ["Don't exist — Newton always finds the nearest root", "basins-nearest", "It can jump to distant roots."],
    ]),
  num(m(NR, "transfer-kepler", "transfer", 7, 60, "Kepler's equation $E - 0.5\\sin E = 1$ is solved by Newton from $E_0 = 1$. What is $E_1$? Give $4$ decimal places."), 1.5765),
  // level 8
  short(m(NR, "transfer-systems-cost", "transfer", 8, 120, "What does each Newton step cost for a system of $n$ equations in $n$ unknowns, and how is that cost reduced in practice?"),
    [
      ["cost", "Forming the $n \\times n$ Jacobian and solving $J\\mathbf{s} = -\\mathbf{F}$, about $O(n^{3})$ for a dense factorisation", 2, true],
      ["reduce", "Reuse a factorised Jacobian for several steps, exploit sparsity, solve iteratively (Newton–Krylov), or use Broyden's quasi-Newton updates", 2, true],
    ]),
  num(m(NR, "transfer-implied-step", "transfer", 8, 60, "Computing implied volatility by Newton: the price error is $0.4$ and vega (the derivative) is $20$. By how much does the volatility estimate change?"), -0.02),
  mcq(m(NR, "transfer-finite-difference", "transfer", 8, 60, "If $f'$ is replaced by $\\frac{f(x_n + h) - f(x_n)}{h}$ with a fixed small $h$:"),
    "Convergence typically becomes linear (or slightly worse), and too small an $h$ suffers round-off",
    [
      ["Quadratic convergence is fully kept for any $h$", "finite-keeps", "The derivative error limits the rate."],
      ["The method stops converging", "finite-stops", "It still converges, just more slowly."],
      ["It becomes bisection", "finite-bisection", "It's still a tangent-like step."],
    ]),
  num(m(NR, "transfer-ln", "transfer", 8, 60, "Find $\\ln 3$ by Newton on $f(x) = e^{x} - 3$ from $x_0 = 1$. What is $x_1$? Give $4$ decimal places."), 1.1036),
  // level 9
  short(m(NR, "transfer-optimisation-link", "transfer", 9, 150, "Explain how Newton–Raphson becomes Newton's method for minimisation, and what new risk appears."),
    [
      ["link", "A smooth minimiser solves $f'(x) = 0$ (or $\\nabla f = \\mathbf{0}$), so apply Newton–Raphson to the derivative: $x_{n+1} = x_n - \\frac{f'(x_n)}{f''(x_n)}$", 2, true],
      ["risk", "It converges to any stationary point, including maxima and saddles, so descent checks or Hessian modifications are needed", 2, true],
    ]),
  num(m(NR, "transfer-steps-digits", "transfer", 9, 75, "Starting with $1$ correct digit and doubling the number of correct digits each step, how many steps reach at least $16$ digits?"), 4),
  mcq(m(NR, "transfer-hardware", "transfer", 9, 75, "Processors compute $\\frac{1}{\\sqrt{a}}$ with a few Newton steps on $f(x) = \\frac{1}{x^{2}} - a$ because:"),
    "The update $x(1.5 - 0.5ax^{2})$ uses only multiplications, and quadratic convergence needs few steps from a table-lookup guess",
    [
      ["Division is impossible in hardware", "hardware-division", "It's possible, just slower."],
      ["Newton needs no starting guess", "hardware-guess", "A lookup provides one."],
      ["Bisection would need derivatives", "hardware-bisection", "Bisection needs none."],
    ]),
  num(m(NR, "transfer-inv-sqrt", "transfer", 9, 75, "One step of $x_{n+1} = x_n(1.5 - 0.5ax_n^{2})$ for $a = 4$ from $x_0 = 0.4$ gives what?"), 0.472),
  // level 10
  short(m(NR, "transfer-failure-analysis", "transfer", 10, 180, "A Newton solver inside a simulation occasionally returns nonsense. List likely causes and safeguards."),
    [
      ["causes", "Poor starting guesses, near-zero derivatives, multiple roots, cycling, or wrong/inaccurate derivatives", 2, true],
      ["safeguards", "Brackets with bisection fallback, damping/line search, iteration limits, checks that $|f|$ decreases and that the result is in a valid range", 2, true],
    ]),
  num(m(NR, "transfer-halley-compare", "transfer", 10, 90, "Halley's method has cubic convergence. If its error is $10^{-2}$, about what is it after one step (error $\\approx e^{3}$)?"), 0.000001),
  mcq(m(NR, "transfer-implicit", "transfer", 10, 90, "Implicit ODE solvers (like backward Euler) call Newton's method at every time step because:"),
    "Each step requires solving a nonlinear equation for the next state",
    [
      ["They need to find minima", "implicit-minima", "They solve equations, not minimisations."],
      ["Newton is needed to differentiate", "implicit-differentiate", "Newton solves equations."],
      ["Explicit methods are always unstable", "implicit-unstable", "Explicit methods are fine for non-stiff problems."],
    ]),
  short(m(NR, "transfer-start-choice", "transfer", 10, 180, "How would you choose a good starting point for Newton–Raphson on a function you know little about?"),
    [
      ["coarse", "Use a coarse scan, plot or a few bisection steps to locate a bracket and a point near the root", 2, true],
      ["domain", "Use domain knowledge or a cheap approximation (e.g. a linearised model or the previous solution in a sequence of similar problems) as a warm start", 2, true],
    ]),
];

export const opt01Items: Item[] = [...optimality, ...convexity, ...bisection, ...newtonRaphson];
