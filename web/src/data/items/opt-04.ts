import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./opt-shared";

/**
 * Optimization course, part 4: proximal gradient methods, quasi-Newton
 * methods, Gauss–Newton and Levenberg–Marquardt, and Lagrange multipliers.
 * Forty questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// proximal-gradient-method
// ---------------------------------------------------------------------------
const PG = "proximal-gradient-method";
const proximal: Item[] = [
  // level 1
  mcq(m(PG, "recall-prox", "recall", 1, 15, "The proximal operator $\\operatorname{prox}_{tg}(\\mathbf{v})$ is:"),
    "$\\arg\\min_{\\mathbf{x}}\\left(g(\\mathbf{x}) + \\frac{1}{2t}\\|\\mathbf{x} - \\mathbf{v}\\|^{2}\\right)$",
    [
      ["$\\mathbf{v} - t\\nabla g(\\mathbf{v})$", "prox-gradient", "That's a gradient step, which needs differentiable $g$."],
      ["$\\arg\\min_{\\mathbf{x}} g(\\mathbf{x})$", "prox-argmin", "The prox also stays near $\\mathbf{v}$."],
      ["$g(\\mathbf{v})$", "prox-value", "It returns a point, not a value."],
    ]),
  mcq(m(PG, "recall-l1", "recall", 1, 15, "The proximal operator of $\\lambda\\|\\mathbf{x}\\|_1$ is:"),
    "Soft-thresholding",
    [
      ["Hard-thresholding", "l1-hard", "That's the prox of the $\\ell_0$ penalty."],
      ["Projection onto a ball", "l1-ball", "That's the prox of a ball's indicator."],
      ["The identity", "l1-identity", "That's for $g = 0$."],
    ]),
  mcq(m(PG, "recall-indicator", "recall", 1, 15, "The proximal operator of the indicator function of a convex set $C$ is:"),
    "Euclidean projection onto $C$",
    [
      ["Soft-thresholding", "indicator-soft", "That's for the $\\ell_1$ norm."],
      ["The gradient of $C$", "indicator-gradient", "Sets don't have gradients."],
      ["Always $\\mathbf{0}$", "indicator-zero", "It's the closest point of $C$."],
    ]),
  mcq(m(PG, "recall-ista", "recall", 1, 15, "One proximal gradient (ISTA) step for $f + g$ is:"),
    "$\\mathbf{x}_{k+1} = \\operatorname{prox}_{tg}(\\mathbf{x}_k - t\\nabla f(\\mathbf{x}_k))$",
    [
      ["$\\mathbf{x}_{k+1} = \\mathbf{x}_k - t\\nabla(f + g)(\\mathbf{x}_k)$", "ista-gradient", "$g$ may not be differentiable."],
      ["$\\mathbf{x}_{k+1} = \\operatorname{prox}_{tf}(\\mathbf{x}_k)$", "ista-prox-f", "The gradient goes on $f$, the prox on $g$."],
      ["$\\mathbf{x}_{k+1} = \\mathbf{x}_k - t\\nabla g(\\mathbf{x}_k)$", "ista-g", "Roles are swapped."],
    ]),
  // level 2
  num(m(PG, "apply-soft", "apply", 2, 20, "What is the soft-threshold $S_{0.5}(2)$?"), 1.5),
  num(m(PG, "apply-project", "apply", 2, 20, "Project $1.7$ onto the interval $[0, 1]$."), 1),
  num(m(PG, "apply-ridge-prox", "apply", 2, 20, "The prox of $\\frac{\\lambda}{2}x^{2}$ is $\\frac{v}{1 + t\\lambda}$. What is it for $v = 6$, $t = 1$ and $\\lambda = 2$?"), 2),
  mcq(m(PG, "apply-g-zero", "apply", 2, 20, "With $g = 0$, the proximal gradient method becomes:"),
    "Ordinary gradient descent",
    [
      ["Newton's method", "g-zero-newton", "No second derivatives appear."],
      ["The proximal point method", "g-zero-ppm", "That's the case $f = 0$."],
      ["Coordinate descent", "g-zero-cd", "All coordinates still move."],
    ]),
  // level 3
  num(m(PG, "apply-ista-1", "apply", 3, 25, "Minimise $\\frac{1}{2}(x - 3)^{2} + |x|$ by proximal gradient with $t = 0.5$ from $x_0 = 0$. What is $x_1$?"), 1),
  num(m(PG, "apply-ista-2", "apply", 3, 25, "Continuing, what is $x_2$?"), 1.5),
  num(m(PG, "apply-ista-limit", "apply", 3, 25, "What value do the iterates converge to?"), 2),
  num(m(PG, "apply-soft-vector", "apply", 3, 25, "Soft-threshold $(3, -0.2, -1.5)$ by $1$. What is the third component?"), -0.5),
  // level 4
  num(m(PG, "apply-group", "apply", 4, 30, "Block soft-thresholding is $\\left(1 - \\frac{t\\lambda}{\\|\\mathbf{v}\\|}\\right)_{+}\\mathbf{v}$. For $\\mathbf{v} = (3, 4)$ and $t\\lambda = 2.5$, what is the first component?"), 1.5),
  num(m(PG, "apply-step", "apply", 4, 30, "For the lasso with $\\lambda_{\\max}(X^{\\top}X) = 4$, what step $t = \\frac{1}{L}$ is safe?"), 0.25),
  num(m(PG, "apply-projected", "apply", 4, 30, "Projected gradient onto the box $[0, 1]^{2}$: from $(0.5, 0.5)$ with gradient $(1, -2)$ and $t = 0.5$, the step gives $(0, 1.5)$ before clipping. What is the second component after projection?"), 1),
  mcq(m(PG, "apply-gradient-mapping", "apply", 4, 30, "In stopping tests, the role of the gradient is played by the gradient mapping:"),
    "$\\frac{1}{t}(\\mathbf{x} - \\operatorname{prox}_{tg}(\\mathbf{x} - t\\nabla f(\\mathbf{x})))$",
    [
      ["$\\nabla f(\\mathbf{x})$ alone", "mapping-f", "It ignores $g$."],
      ["$\\nabla g(\\mathbf{x})$", "mapping-g", "$g$ may be nondifferentiable."],
      ["$f(\\mathbf{x}) + g(\\mathbf{x})$", "mapping-value", "That's the objective value."],
    ]),
  // level 5
  short(m(PG, "explain-sparsity", "explain", 5, 90, "Why do proximal methods produce exact zeros for the lasso, while subgradient methods don't?"),
    [
      ["threshold", "The prox step soft-thresholds: any component with magnitude below $t\\lambda$ is set to exactly $0$", 2, true],
      ["subgradient", "Subgradient steps move by continuous amounts and almost never land exactly on $0$, so coefficients stay small but nonzero", 2, true],
    ]),
  mcq(m(PG, "apply-fista-rate", "apply", 5, 40, "FISTA improves the proximal gradient rate from $O\\!\\left(\\frac{1}{k}\\right)$ to:"),
    "$O\\!\\left(\\frac{1}{k^{2}}\\right)$",
    [
      ["$O\\!\\left(\\frac{1}{\\sqrt{k}}\\right)$", "fista-sqrt", "That's slower."],
      ["$O(e^{-k})$ always", "fista-linear", "Linear rates need strong convexity."],
      ["$O\\!\\left(\\frac{1}{k}\\right)$ (no change)", "fista-same", "Acceleration helps."],
    ]),
  num(m(PG, "apply-nonneg", "apply", 5, 40, "Project $-0.3$ onto the nonnegative reals."), 0),
  mcq(m(PG, "apply-backtracking", "apply", 5, 40, "When $L$ is unknown, proximal gradient shrinks $t$ until:"),
    "$f(\\mathbf{x}^{+}) \\le f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^{\\top}(\\mathbf{x}^{+} - \\mathbf{x}) + \\frac{1}{2t}\\|\\mathbf{x}^{+} - \\mathbf{x}\\|^{2}$",
    [
      ["$g(\\mathbf{x}^{+}) = 0$", "backtracking-g", "$g$ needn't vanish."],
      ["$\\nabla f(\\mathbf{x}^{+}) = \\mathbf{0}$", "backtracking-gradient", "That's too strong."],
      ["$t < 10^{-8}$", "backtracking-tiny", "That's not a condition, just a tiny step."],
    ]),
  // level 6
  short(m(PG, "explain-when", "explain", 6, 120, "When is proximal gradient an attractive method, and when isn't it?"),
    [
      ["attractive", "When the objective is smooth plus a nonsmooth term with a cheap prox (e.g. $\\ell_1$, box constraints, group norms)", 2, true],
      ["not", "When the nonsmooth term's prox is itself hard (e.g. $\\|D\\mathbf{x}\\|_1$ total variation), where splitting methods like ADMM are better", 2, true],
    ]),
  num(m(PG, "apply-fista-k", "apply", 6, 45, "FISTA's bound is $\\frac{2LR^{2}}{(k + 1)^{2}}$. With $L = 4$ and $R = 1$, what is the smallest $k$ giving a gap of at most $0.01$?"), 28),
  num(m(PG, "apply-l2-prox", "apply", 6, 45, "For $g = \\lambda\\|\\mathbf{x}\\|_2$, $\\mathbf{v} = (0.6, 0.8)$ and $t\\lambda = 0.5$, what is the first component of $\\operatorname{prox}_{tg}(\\mathbf{v})$?"), 0.3),
  mcq(m(PG, "apply-ppm", "apply", 6, 45, "With $f = 0$, the proximal gradient method becomes:"),
    "The proximal point method, $\\mathbf{x}_{k+1} = \\operatorname{prox}_{tg}(\\mathbf{x}_k)$",
    [
      ["Gradient descent", "ppm-gd", "That's $g = 0$."],
      ["Newton's method", "ppm-newton", "No Hessians appear."],
      ["It's undefined", "ppm-undefined", "The prox step alone still makes sense."],
    ]),
  // level 7
  num(m(PG, "transfer-moreau", "transfer", 7, 60, "The Moreau envelope of $|x|$ with $t = 1$ at $v = 3$ is $|p| + \\frac{1}{2}(v - p)^{2}$ with $p = \\operatorname{prox}(v) = 2$. What is it?"), 2.5),
  short(m(PG, "transfer-envelope", "transfer", 7, 120, "What is the Moreau envelope of a convex function, and why is it useful?"),
    [
      ["definition", "$M_{tg}(\\mathbf{v}) = \\min_{\\mathbf{x}} g(\\mathbf{x}) + \\frac{1}{2t}\\|\\mathbf{x} - \\mathbf{v}\\|^{2}$, the value at the prox", 2, true],
      ["use", "It is a smooth approximation of $g$ with the same minimisers and a gradient $\\frac{1}{t}(\\mathbf{v} - \\operatorname{prox}_{tg}(\\mathbf{v}))$; for $|x|$ it gives the Huber function", 2, true],
    ]),
  num(m(PG, "transfer-elastic-prox", "transfer", 7, 60, "The prox of $\\lambda_1|x| + \\frac{\\lambda_2}{2}x^{2}$ is $\\frac{S_{t\\lambda_1}(v)}{1 + t\\lambda_2}$. What is it for $v = 4$, $t\\lambda_1 = 1$ and $t\\lambda_2 = 1$?"), 1.5),
  mcq(m(PG, "transfer-nonexpansive", "transfer", 7, 60, "Proximal operators of convex functions are:"),
    "Nonexpansive: $\\|\\operatorname{prox}(\\mathbf{u}) - \\operatorname{prox}(\\mathbf{v})\\| \\le \\|\\mathbf{u} - \\mathbf{v}\\|$",
    [
      ["Expansive", "nonexpansive-expansive", "They never increase distances."],
      ["Always linear", "nonexpansive-linear", "Soft-thresholding is nonlinear."],
      ["Discontinuous", "nonexpansive-discontinuous", "They're Lipschitz continuous."],
    ]),
  // level 8
  short(m(PG, "transfer-tv", "transfer", 8, 120, "Why is total-variation denoising ($g = \\lambda\\|D\\mathbf{x}\\|_1$) awkward for proximal gradient, and what's a fix?"),
    [
      ["awkward", "The prox of $\\|D\\mathbf{x}\\|_1$ has no closed form because $D$ couples the variables, so each prox is itself an optimisation problem", 2, true],
      ["fix", "Introduce $\\mathbf{z} = D\\mathbf{x}$ and use ADMM (or a primal–dual method), where the $\\mathbf{z}$-step is plain soft-thresholding", 2, true],
    ]),
  num(m(PG, "transfer-fista-t", "transfer", 8, 60, "FISTA updates $t_{k+1} = \\frac{1 + \\sqrt{1 + 4t_k^{2}}}{2}$ from $t_1 = 1$. What is $t_2$? Give $3$ decimal places."), 1.618),
  mcq(m(PG, "transfer-linear", "transfer", 8, 60, "If $f$ is strongly convex, proximal gradient with step $\\frac{1}{L}$ converges:"),
    "Linearly, with factor about $1 - \\frac{\\mu}{L}$",
    [
      ["Sublinearly only", "linear-sublinear", "Strong convexity gives linear convergence."],
      ["Quadratically", "linear-quadratic", "It's first-order."],
      ["Not at all", "linear-none", "It converges."],
    ]),
  num(m(PG, "transfer-ball", "transfer", 8, 60, "Project $\\mathbf{v} = (3, 4)$ onto the unit Euclidean ball. What is the first component?"), 0.6),
  // level 9
  short(m(PG, "transfer-nuclear", "transfer", 9, 150, "What is the proximal operator of the nuclear norm $\\lambda\\|X\\|_*$, and where is it used?"),
    [
      ["svt", "Singular value thresholding: compute the SVD $X = U\\Sigma V^{\\top}$, soft-threshold the singular values by $t\\lambda$, and recombine", 2, true],
      ["use", "It drives low-rank matrix estimation, e.g. matrix completion and robust PCA, via proximal gradient or ADMM", 2, true],
    ]),
  num(m(PG, "transfer-svt-rank", "transfer", 9, 75, "Singular values $5$, $2$ and $0.5$ are soft-thresholded by $1$. What is the rank of the result?"), 2),
  mcq(m(PG, "transfer-moreau-decomposition", "transfer", 9, 75, "Moreau's decomposition states that for convex $f$:"),
    "$\\mathbf{v} = \\operatorname{prox}_{f}(\\mathbf{v}) + \\operatorname{prox}_{f^{*}}(\\mathbf{v})$, linking a function's prox to its conjugate's",
    [
      ["$\\operatorname{prox}_f = \\nabla f$", "moreau-gradient", "Not in general."],
      ["$\\operatorname{prox}_f(\\mathbf{v}) = \\mathbf{v}$ always", "moreau-identity", "Only for $f = 0$."],
      ["$\\operatorname{prox}_{f^{*}} = -\\operatorname{prox}_f$", "moreau-negative", "They sum to $\\mathbf{v}$."],
    ]),
  num(m(PG, "transfer-conjugate-prox", "transfer", 9, 75, "For $f = |x|$, $\\operatorname{prox}_f(3) = 2$. Using Moreau's decomposition, what is $\\operatorname{prox}_{f^{*}}(3)$?"), 1),
  // level 10
  short(m(PG, "transfer-stopping", "transfer", 10, 180, "How would you decide when to stop a proximal gradient solver for the lasso?"),
    [
      ["mapping", "Stop when the gradient mapping (the scaled change $\\frac{1}{t}\\|\\mathbf{x}_{k+1} - \\mathbf{x}_k\\|$) is small, the analogue of a small gradient", 2, true],
      ["gap", "Better still, compute a duality gap from a dual feasible point; it bounds suboptimality directly and gives a scale-aware tolerance", 2, true],
    ]),
  mcq(m(PG, "transfer-inexact", "transfer", 10, 90, "If the prox can only be computed approximately, proximal gradient:"),
    "Still converges provided the prox errors shrink fast enough (summably)",
    [
      ["Always fails", "inexact-fails", "Controlled errors are tolerated."],
      ["Becomes faster", "inexact-faster", "Errors don't help."],
      ["Needs second derivatives", "inexact-second", "It stays first-order."],
    ]),
  short(m(PG, "transfer-prox-newton", "transfer", 10, 180, "What is a proximal Newton method, and when is it worth using?"),
    [
      ["what", "Replace the quadratic $\\frac{1}{2t}\\|\\cdot\\|^{2}$ term with a local Hessian model of $f$, solving a scaled prox subproblem each iteration", 2, true],
      ["when", "When $f$ is badly conditioned and its Hessian is affordable (e.g. sparse logistic regression), giving superlinear local convergence at higher per-iteration cost", 2, true],
    ]),
  num(m(PG, "transfer-nonzeros", "transfer", 10, 90, "Soft-threshold $(0.3, -1.2, 2.5, -0.8, 1.1)$ by $1$. How many components remain nonzero?"), 3),
];

// ---------------------------------------------------------------------------
// quasi-newton-methods
// ---------------------------------------------------------------------------
const QN = "quasi-newton-methods";
const quasiNewton: Item[] = [
  // level 1
  mcq(m(QN, "recall-secant", "recall", 1, 15, "Quasi-Newton methods require the new Hessian approximation to satisfy:"),
    "The secant condition $B_{k+1}\\mathbf{s}_k = \\mathbf{y}_k$",
    [
      ["$B_{k+1} = \\nabla^{2} f(\\mathbf{x}_{k+1})$", "secant-exact", "They avoid computing the Hessian."],
      ["$B_{k+1} = I$", "secant-identity", "That's steepest descent."],
      ["$B_{k+1}\\mathbf{y}_k = \\mathbf{0}$", "secant-zero", "It must map the step to the gradient change."],
    ]),
  mcq(m(QN, "recall-bfgs", "recall", 1, 15, "BFGS is named after:"),
    "Broyden, Fletcher, Goldfarb and Shanno",
    [
      ["Bisection, Fixed-point, Gradient, Secant", "bfgs-methods", "It's named after people."],
      ["Boyd, Friedman, Gauss and Seidel", "bfgs-wrong", "Not these."],
      ["Barzilai, Fletcher, Gill and Saunders", "bfgs-other", "Not these."],
    ]),
  mcq(m(QN, "recall-lbfgs", "recall", 1, 15, "L-BFGS stores:"),
    "Only the last $m$ pairs $(\\mathbf{s}_i, \\mathbf{y}_i)$, not a full matrix",
    [
      ["The full $n \\times n$ inverse Hessian", "lbfgs-full", "That's full BFGS."],
      ["All past iterates", "lbfgs-all", "Only a few recent pairs."],
      ["The exact Hessian", "lbfgs-exact", "It never forms it."],
    ]),
  mcq(m(QN, "recall-no-second", "recall", 1, 15, "Quasi-Newton methods need:"),
    "Function values and gradients only — no second derivatives",
    [
      ["The exact Hessian every iteration", "no-second-hessian", "That's Newton's method."],
      ["Only function values", "no-second-values", "They use gradients."],
      ["Third derivatives", "no-second-third", "Not at all."],
    ]),
  // level 2
  num(m(QN, "apply-1d-curvature", "apply", 2, 20, "In 1-D, $B = \\frac{y}{s}$. With $s = -1$ and $y = -2$, what is $B$?"), 2),
  num(m(QN, "apply-1d-step", "apply", 2, 20, "For $f(x) = x^{2}$ at $x_1 = 1$ with $B_1 = 2$, the step $x_2 = x_1 - \\frac{f'(x_1)}{B_1}$ gives what?"), 0),
  num(m(QN, "apply-rho", "apply", 2, 20, "BFGS uses $\\rho = \\frac{1}{\\mathbf{y}^{\\top}\\mathbf{s}}$. What is $\\rho$ for $\\mathbf{y} = (1, 2)$ and $\\mathbf{s} = (2, 1)$?"), 0.25),
  mcq(m(QN, "apply-curvature-condition", "apply", 2, 20, "BFGS keeps its approximation positive definite as long as:"),
    "$\\mathbf{y}_k^{\\top}\\mathbf{s}_k > 0$",
    [
      ["$\\mathbf{y}_k^{\\top}\\mathbf{s}_k < 0$", "curvature-negative", "That would break positive definiteness."],
      ["$\\|\\mathbf{s}_k\\| = 1$", "curvature-unit", "Length is irrelevant."],
      ["$f$ decreases by $50\\%$", "curvature-decrease", "Unrelated to the update."],
    ]),
  // level 3
  num(m(QN, "apply-sy", "apply", 3, 25, "What is $\\mathbf{s}^{\\top}\\mathbf{y}$ for $\\mathbf{s} = (2, 1)$ and $\\mathbf{y} = (1, 2)$?"), 4),
  num(m(QN, "apply-gamma", "apply", 3, 25, "A common initial scaling is $H_0 = \\gamma I$ with $\\gamma = \\frac{\\mathbf{s}^{\\top}\\mathbf{y}}{\\mathbf{y}^{\\top}\\mathbf{y}}$. What is $\\gamma$ for the same vectors?"), 0.8),
  num(m(QN, "apply-lbfgs-memory", "apply", 3, 25, "L-BFGS with $m = 10$ on $n = 10^{6}$ variables stores $2mn$ numbers. How many million?"), 20),
  num(m(QN, "apply-bfgs-memory", "apply", 3, 25, "Full BFGS stores an $n \\times n$ matrix. How many entries for $n = 10^{4}$?"), 100000000),
  // level 4
  num(m(QN, "apply-quadratic-exact", "apply", 4, 30, "For $f(x) = 1.5x^{2} - 6x$, iterates $x_0 = 0$ and $x_1 = 1$ give a secant curvature estimate. What is the quasi-Newton step's result $x_2 = x_1 - \\frac{f'(x_1)}{B}$?"), 2),
  num(m(QN, "apply-bfgs-rank", "apply", 4, 30, "What is the rank of the BFGS update matrix $B_{k+1} - B_k$ (in general)?"), 2),
  num(m(QN, "apply-sr1-rank", "apply", 4, 30, "What is the rank of the SR1 update?"), 1),
  mcq(m(QN, "apply-superlinear", "apply", 4, 30, "Under standard conditions, BFGS converges:"),
    "Superlinearly",
    [
      ["Quadratically", "superlinear-quadratic", "That needs the exact Hessian."],
      ["Linearly with rate $\\frac{1}{2}$", "superlinear-half", "It's faster than linear."],
      ["Sublinearly", "superlinear-sublinear", "Much faster than that."],
    ]),
  // level 5
  short(m(QN, "explain-pd", "explain", 5, 90, "Why does BFGS keep its inverse-Hessian approximation positive definite, and why does that matter?"),
    [
      ["why", "If $H_k \\succ 0$ and $\\mathbf{y}_k^{\\top}\\mathbf{s}_k > 0$, the BFGS formula gives $\\mathbf{z}^{\\top}H_{k+1}\\mathbf{z} > 0$ for every $\\mathbf{z} \\ne \\mathbf{0}$", 2, true],
      ["matters", "Then $\\mathbf{p}_k = -H_k\\nabla f_k$ is always a descent direction, so the line search can always make progress", 2, true],
    ]),
  mcq(m(QN, "apply-dfp", "apply", 5, 40, "How is DFP related to BFGS?"),
    "It is the dual update — the same formula with the roles of $B$ and $H$ (and $\\mathbf{s}$, $\\mathbf{y}$) swapped — and is less robust in practice",
    [
      ["They're identical", "dfp-identical", "They're duals, not the same."],
      ["DFP uses the exact Hessian", "dfp-exact", "Both avoid it."],
      ["DFP is rank one", "dfp-rank", "DFP is rank two; SR1 is rank one."],
    ]),
  num(m(QN, "apply-1d-inverse", "apply", 5, 40, "In 1-D the inverse approximation is $H = \\frac{s}{y}$. What is it for $s = 1$ and $y = 3$? Give $4$ decimal places."), 0.3333),
  mcq(m(QN, "apply-wolfe", "apply", 5, 40, "Which line-search property ensures $\\mathbf{y}_k^{\\top}\\mathbf{s}_k > 0$?"),
    "The Wolfe curvature condition",
    [
      ["The Armijo condition alone", "wolfe-armijo", "Armijo doesn't control the slope."],
      ["Using a unit step always", "wolfe-unit", "No guarantee."],
      ["Exact gradients", "wolfe-exact", "Exactness alone isn't enough."],
    ]),
  // level 6
  short(m(QN, "explain-two-loop", "explain", 6, 120, "How does L-BFGS compute $H_k\\nabla f_k$ without storing $H_k$?"),
    [
      ["recursion", "The two-loop recursion applies the stored $(\\mathbf{s}_i, \\mathbf{y}_i)$ pairs: a backward loop of inner products and updates, scaling by $H_0$, then a forward loop", 2, true],
      ["cost", "It costs $O(mn)$ operations and memory, never forming an $n \\times n$ matrix", 2, true],
    ]),
  num(m(QN, "apply-two-loop-cost", "apply", 6, 45, "The two-loop recursion costs about $4mn$ operations. How many million for $m = 5$ and $n = 10^{6}$?"), 20),
  num(m(QN, "apply-superlinear-ratio", "apply", 6, 45, "Errors fall $0.1$, $0.02$, $0.001$. What is the ratio of the last error to the one before?"), 0.05),
  mcq(m(QN, "apply-broyden", "apply", 6, 45, "For solving nonlinear systems $\\mathbf{F}(\\mathbf{x}) = \\mathbf{0}$, the quasi-Newton analogue is:"),
    "Broyden's method, a rank-one update of the Jacobian approximation",
    [
      ["BFGS", "broyden-bfgs", "BFGS assumes a symmetric Hessian of an objective."],
      ["Gradient descent", "broyden-gd", "Not a quasi-Newton method."],
      ["Bisection", "broyden-bisection", "1-D only."],
    ]),
  // level 7
  num(m(QN, "transfer-1d-h", "transfer", 7, 60, "In 1-D, BFGS gives $H = \\frac{s}{y}$. What is it for $s = 2$ and $y = 8$?"), 0.25),
  short(m(QN, "transfer-self-correct", "transfer", 7, 120, "BFGS is described as self-correcting. What does that mean?"),
    [
      ["error", "If the Hessian approximation becomes poor (e.g. too large or small in some direction), later updates tend to repair it", 2, true],
      ["contrast", "This happens with a good (Wolfe) line search; DFP lacks this robustness, which is why BFGS is preferred", 2, true],
    ]),
  num(m(QN, "transfer-secant-check", "transfer", 7, 60, "If $B = \\operatorname{diag}(2, 3)$ satisfies the secant condition for $\\mathbf{s} = (1, 1)$, what is the second component of $\\mathbf{y}$?"), 3),
  mcq(m(QN, "transfer-skip", "transfer", 7, 60, "If $\\mathbf{y}_k^{\\top}\\mathbf{s}_k \\le 0$ (possible on non-convex $f$ without Wolfe), implementations typically:"),
    "Skip or damp the update to preserve positive definiteness",
    [
      ["Apply it anyway", "skip-apply", "That could make $H$ indefinite."],
      ["Restart from the initial point", "skip-restart", "Too drastic."],
      ["Switch to bisection", "skip-bisection", "Unrelated."],
    ]),
  // level 8
  short(m(QN, "transfer-logistic", "transfer", 8, 120, "Why is L-BFGS a common default for fitting logistic regression?"),
    [
      ["smooth", "The loss is smooth and convex with cheap exact gradients, the setting where quasi-Newton methods excel", 2, true],
      ["scale", "L-BFGS needs only $O(mn)$ memory and converges in far fewer iterations than gradient descent, without forming the Hessian", 2, true],
    ]),
  num(m(QN, "transfer-memory-mb", "transfer", 8, 60, "L-BFGS with $m = 10$ on $n = 10^{5}$ variables in fp64 stores $2mn$ numbers. How many megabytes ($10^{6}$ bytes)?"), 16),
  mcq(m(QN, "transfer-stochastic", "transfer", 8, 60, "Why does plain L-BFGS struggle with stochastic minibatch gradients?"),
    "Noisy gradient differences $\\mathbf{y}_k$ give unreliable curvature pairs that corrupt the approximation",
    [
      ["It can't compute gradients", "stochastic-gradients", "It can."],
      ["Its memory is too large", "stochastic-memory", "Memory is fine."],
      ["It needs exact Hessians", "stochastic-hessians", "It never uses them."],
    ]),
  short(m(QN, "transfer-scaling", "transfer", 8, 120, "Why does the choice of initial matrix $H_0$ matter so much in L-BFGS?"),
    [
      ["role", "With few stored pairs, $H_0$ determines the step in all directions the pairs don't cover", 2, true],
      ["choice", "Scaling $H_0 = \\gamma I$ with $\\gamma = \\frac{\\mathbf{s}^{\\top}\\mathbf{y}}{\\mathbf{y}^{\\top}\\mathbf{y}}$ matches recent curvature, so unit steps are usually accepted", 2, true],
    ]),
  // level 9
  short(m(QN, "transfer-tradeoff", "transfer", 9, 150, "Compare Newton's method and BFGS in cost per iteration and convergence."),
    [
      ["newton", "Newton: needs the Hessian and an $O(n^{3})$ solve per iteration, but converges quadratically", 2, true],
      ["bfgs", "BFGS: $O(n^{2})$ per iteration with only gradients, converging superlinearly — often less total time when Hessians are expensive", 2, true],
    ]),
  num(m(QN, "transfer-order", "transfer", 9, 75, "In 1-D, BFGS reduces to the secant method on $f'$. What is its order of convergence? Give $3$ decimal places."), 1.618),
  mcq(m(QN, "transfer-lbfgsb", "transfer", 9, 75, "L-BFGS-B extends L-BFGS to handle:"),
    "Simple bound constraints $\\mathbf{l} \\le \\mathbf{x} \\le \\mathbf{u}$",
    [
      ["Arbitrary nonlinear constraints", "lbfgsb-nonlinear", "Only bounds."],
      ["Discrete variables", "lbfgsb-discrete", "It's continuous."],
      ["Nonsmooth objectives", "lbfgsb-nonsmooth", "It assumes smoothness."],
    ]),
  num(m(QN, "transfer-pair-storage", "transfer", 9, 75, "L-BFGS with $m = 7$ on $n = 1{,}000$ variables stores how many numbers in its pairs?"), 14000),
  // level 10
  short(m(QN, "transfer-deep-learning", "transfer", 10, 180, "Why do deep-learning practitioners usually use Adam rather than L-BFGS?"),
    [
      ["noise", "Training uses noisy minibatch gradients, which break L-BFGS's curvature pairs and line searches", 2, true],
      ["scale", "Adam is cheap per step, tolerant of noise and non-convexity, and works well with huge datasets; L-BFGS shines in full-batch, deterministic problems", 2, true],
    ]),
  mcq(m(QN, "transfer-sr1", "transfer", 10, 90, "SR1 is often paired with trust regions rather than line searches because:"),
    "It can produce indefinite approximations, which trust regions handle naturally",
    [
      ["It's always positive definite", "sr1-pd", "That's BFGS's property."],
      ["It needs exact Hessians", "sr1-exact", "It's quasi-Newton."],
      ["It has no secant condition", "sr1-secant", "It satisfies the secant condition."],
    ]),
  short(m(QN, "transfer-memory-choice", "transfer", 10, 180, "How would you choose the memory size $m$ in L-BFGS?"),
    [
      ["tradeoff", "Larger $m$ captures more curvature (fewer iterations) but costs $O(mn)$ memory and time per iteration", 2, true],
      ["practice", "Values of $5$–$20$ usually suffice; returns diminish quickly, so test a few values on the problem", 2, true],
    ]),
  num(m(QN, "transfer-newton-vs-bfgs", "transfer", 10, 90, "For $n = 1{,}000$, Newton's factorisation costs about $\\frac{n^{3}}{3}$ and a BFGS update about $n^{2}$ operations. What is the ratio (to the nearest whole number)?"), 333),
];

// ---------------------------------------------------------------------------
// nonlinear-least-squares
// ---------------------------------------------------------------------------
const NL = "nonlinear-least-squares";
const leastSquares: Item[] = [
  // level 1
  mcq(m(NL, "recall-objective", "recall", 1, 15, "Nonlinear least squares minimises:"),
    "$\\frac{1}{2}\\|\\mathbf{r}(\\boldsymbol{\\theta})\\|^{2}$, half the sum of squared residuals",
    [
      ["The sum of absolute residuals", "objective-abs", "That's least absolute deviations."],
      ["The largest residual", "objective-max", "That's minimax fitting."],
      ["The number of nonzero residuals", "objective-count", "Not a smooth objective."],
    ]),
  mcq(m(NL, "recall-gn-drop", "recall", 1, 15, "Gauss–Newton approximates the Hessian by:"),
    "$J^{\\top}J$, dropping the second-order term $\\sum_i r_i\\nabla^{2} r_i$",
    [
      ["The identity", "gn-identity", "That's steepest descent."],
      ["The exact Hessian", "gn-exact", "That's Newton's method."],
      ["$JJ^{\\top}$", "gn-transpose", "The order matters: $J^{\\top}J$ is parameter-by-parameter."],
    ]),
  mcq(m(NL, "recall-lm", "recall", 1, 15, "Levenberg–Marquardt modifies Gauss–Newton by:"),
    "Adding a damping term $\\lambda D$ to $J^{\\top}J$",
    [
      ["Removing the Jacobian", "lm-remove", "It still uses $J$."],
      ["Using second derivatives", "lm-second", "It uses only $J$."],
      ["Fixing the step size at $1$", "lm-fixed", "Damping changes the step."],
    ]),
  mcq(m(NL, "recall-gradient", "recall", 1, 15, "The gradient of $\\frac{1}{2}\\|\\mathbf{r}\\|^{2}$ is:"),
    "$J^{\\top}\\mathbf{r}$",
    [
      ["$J\\mathbf{r}$", "gradient-noT", "Dimensions need the transpose."],
      ["$\\mathbf{r}$", "gradient-r", "The chain rule brings in $J$."],
      ["$J^{\\top}J$", "gradient-hessian", "That's the Gauss–Newton Hessian."],
    ]),
  // level 2
  num(m(NL, "apply-grad", "apply", 2, 20, "With $J = (1, 2)^{\\top}$ (one parameter, two residuals) and $\\mathbf{r} = (3, -1)$, what is $J^{\\top}\\mathbf{r}$?"), 1),
  num(m(NL, "apply-jtj", "apply", 2, 20, "Same $J$. What is $J^{\\top}J$?"), 5),
  num(m(NL, "apply-gn-step", "apply", 2, 20, "What is the Gauss–Newton step $-\\frac{J^{\\top}\\mathbf{r}}{J^{\\top}J}$?"), -0.2),
  mcq(m(NL, "apply-zero-residual", "apply", 2, 20, "Gauss–Newton converges quadratically near the solution when:"),
    "The residuals at the solution are zero (a perfect fit)",
    [
      ["The residuals are large", "zero-large", "Then convergence is slow."],
      ["The model is non-smooth", "zero-nonsmooth", "It needs smoothness."],
      ["$J$ is rank-deficient", "zero-rank", "That causes trouble."],
    ]),
  // level 3
  num(m(NL, "apply-exp-1", "apply", 3, 25, "Fit $y = e^{\\theta t}$ to $(t, y) = (1, e)$: the Gauss–Newton update is $\\theta_{k+1} = \\theta_k - 1 + e^{1 - \\theta_k}$. From $\\theta_0 = 0$, what is $\\theta_1$? Give $4$ decimal places."), 1.7183),
  num(m(NL, "apply-exp-2", "apply", 3, 25, "Continuing, what is $\\theta_2$? Give $4$ decimal places."), 1.2059),
  num(m(NL, "apply-lm-step", "apply", 3, 25, "The LM step for one parameter is $-\\frac{J^{\\top}\\mathbf{r}}{J^{\\top}J + \\lambda}$. With $J^{\\top}\\mathbf{r} = 1$, $J^{\\top}J = 5$ and $\\lambda = 5$, what is it?"), -0.1),
  mcq(m(NL, "apply-large-lambda", "apply", 3, 25, "As the LM damping $\\lambda$ grows large, the step approaches:"),
    "A short steepest-descent step, $-\\frac{1}{\\lambda}J^{\\top}\\mathbf{r}$",
    [
      ["The Gauss–Newton step", "large-lambda-gn", "That's small $\\lambda$."],
      ["The Newton step", "large-lambda-newton", "LM never uses the full Hessian."],
      ["Zero immediately", "large-lambda-zero", "It shrinks toward zero along the gradient direction."],
    ]),
  // level 4
  num(m(NL, "apply-2param", "apply", 4, 30, "With $J = \\operatorname{diag}(1, 2)$ and $\\mathbf{r} = (2, 4)$, the Gauss–Newton step solves $J^{\\top}J\\mathbf{p} = -J^{\\top}\\mathbf{r}$. What is the second component of $\\mathbf{p}$?"), -2),
  num(m(NL, "apply-objective", "apply", 4, 30, "What is $\\frac{1}{2}\\|\\mathbf{r}\\|^{2}$ for $\\mathbf{r} = (3, 4)$?"), 12.5),
  num(m(NL, "apply-lambda-up", "apply", 4, 30, "An LM step fails to reduce the residual, so $\\lambda$ is multiplied by $10$. If it was $0.01$, what is it now?"), 0.1),
  mcq(m(NL, "apply-linear-ls", "apply", 4, 30, "If the model is linear in $\\boldsymbol{\\theta}$, Gauss–Newton:"),
    "Converges in one step, since the linearisation is exact",
    [
      ["Never converges", "linear-ls-never", "It's exact."],
      ["Needs many damped steps", "linear-ls-many", "One step solves it."],
      ["Becomes gradient descent", "linear-ls-gd", "It becomes ordinary least squares."],
    ]),
  // level 5
  short(m(NL, "explain-small-residual", "explain", 5, 90, "Why does Gauss–Newton work well when the model fits the data closely?"),
    [
      ["term", "The neglected Hessian term is $\\sum_i r_i\\nabla^{2} r_i$, which is small when residuals $r_i$ are small", 2, true],
      ["consequence", "So $J^{\\top}J$ approximates the true Hessian well and Gauss–Newton behaves like Newton, converging fast", 2, true],
    ]),
  mcq(m(NL, "apply-trust-region", "apply", 5, 40, "The Levenberg–Marquardt step is equivalent to:"),
    "Minimising the linearised model $\\|\\mathbf{r} + J\\mathbf{p}\\|^{2}$ within a trust region $\\|\\mathbf{p}\\| \\le \\Delta$",
    [
      ["An exact Newton step", "trust-newton", "It uses $J^{\\top}J$ plus damping."],
      ["A random search", "trust-random", "It's deterministic."],
      ["A bisection step", "trust-bisection", "Unrelated."],
    ]),
  num(m(NL, "apply-exp-3", "apply", 5, 40, "Continuing the exponential fit from $\\theta_2 = 1.2059$, what is $\\theta_3$? Give $4$ decimal places."), 1.0198),
  mcq(m(NL, "apply-qr", "apply", 5, 40, "Why solve the Gauss–Newton subproblem by QR on $J$ rather than forming $J^{\\top}J$?"),
    "Forming $J^{\\top}J$ squares the condition number, losing accuracy",
    [
      ["QR is always faster", "qr-faster", "It's about accuracy."],
      ["$J^{\\top}J$ can't be inverted", "qr-invert", "It often can; it's just worse conditioned."],
      ["QR uses second derivatives", "qr-second", "It doesn't."],
    ]),
  // level 6
  short(m(NL, "explain-lambda", "explain", 6, 120, "Describe how Levenberg–Marquardt adapts $\\lambda$ and why."),
    [
      ["rule", "If a step reduces the sum of squares, accept it and decrease $\\lambda$; if not, reject it and increase $\\lambda$", 2, true],
      ["why", "Small $\\lambda$ gives fast Gauss–Newton steps near the solution; large $\\lambda$ gives safe gradient-like steps far away", 2, true],
    ]),
  num(m(NL, "apply-squared-kappa", "apply", 6, 45, "If $\\kappa(J) = 100$, what is $\\kappa(J^{\\top}J)$?"), 10000),
  num(m(NL, "apply-sqrt-gn", "apply", 6, 45, "Gauss–Newton on the residual $r(\\theta) = \\theta^{2} - 2$ from $\\theta_0 = 1$ gives $\\theta_1 = \\theta_0 - \\frac{r}{J}$. What is it?"), 1.5),
  mcq(m(NL, "apply-rank-deficient", "apply", 6, 45, "If $J$ is rank-deficient, the Gauss–Newton system is singular. Levenberg–Marquardt:"),
    "Remains solvable, because $J^{\\top}J + \\lambda D$ is positive definite for $\\lambda > 0$",
    [
      ["Also fails", "rank-fails", "Damping fixes it."],
      ["Needs the exact Hessian", "rank-hessian", "It doesn't."],
      ["Drops the residuals", "rank-drop", "It uses all residuals."],
    ]),
  // level 7
  num(m(NL, "transfer-jacobian", "transfer", 7, 60, "For the model $ae^{-bt}$, the derivative with respect to $a$ at $t = 1$ and $b = 1$ is $e^{-1}$. What is it? Give $4$ decimal places."), 0.3679),
  short(m(NL, "transfer-start", "transfer", 7, 120, "Why do nonlinear least-squares fits often need good starting values, and how can you get them?"),
    [
      ["why", "The objective can have several local minima and flat regions, and Gauss–Newton/LM only converge locally", 2, true],
      ["how", "Use physical intuition, a linearised version of the model (e.g. regress $\\ln y$ on $t$ for an exponential), a coarse grid, or results from a simpler fit", 2, true],
    ]),
  num(m(NL, "transfer-dropped-term", "transfer", 7, 60, "For $r(\\theta) = \\theta^{2} - 2$ at $\\theta = 1$, what is the neglected term $r\\,r''(\\theta)$?"), -2),
  mcq(m(NL, "transfer-fisher", "transfer", 7, 60, "In statistics, Gauss–Newton for nonlinear regression is closely related to:"),
    "Fisher scoring, which uses the expected rather than observed information",
    [
      ["The EM algorithm", "fisher-em", "EM handles latent variables."],
      ["The bootstrap", "fisher-bootstrap", "That's resampling."],
      ["Gibbs sampling", "fisher-gibbs", "That's MCMC."],
    ]),
  // level 8
  short(m(NL, "transfer-bundle", "transfer", 8, 120, "Bundle adjustment in computer vision solves huge nonlinear least-squares problems. What structure makes it tractable?"),
    [
      ["sparse", "Each residual (one point in one image) depends on only one camera and one 3-D point, so $J^{\\top}J$ is very sparse", 2, true],
      ["schur", "LM steps exploit this with the Schur complement, eliminating point parameters to leave a small camera system", 2, true],
    ]),
  num(m(NL, "transfer-jtj-size", "transfer", 8, 60, "A model has $6$ parameters and $1{,}000$ residuals. How many entries does $J^{\\top}J$ have?"), 36),
  mcq(m(NL, "transfer-large-residual", "transfer", 8, 60, "On a badly fitting (large-residual) problem, Gauss–Newton may:"),
    "Converge only linearly or even diverge, since the dropped term is large",
    [
      ["Converge quadratically", "large-quadratic", "That needs small residuals."],
      ["Find the global minimum automatically", "large-global", "No such guarantee."],
      ["Become exact", "large-exact", "The approximation gets worse."],
    ]),
  num(m(NL, "transfer-variance", "transfer", 8, 60, "The residual variance is estimated by $\\frac{\\text{RSS}}{m - p}$. What is it for RSS $= 20$, $m = 12$ residuals and $p = 2$ parameters?"), 2),
  // level 9
  short(m(NL, "transfer-uncertainty", "transfer", 9, 150, "How are standard errors for nonlinear least-squares parameters usually computed?"),
    [
      ["covariance", "Approximate the covariance by $\\hat{\\sigma}^{2}(J^{\\top}J)^{-1}$ at the solution, with $\\hat{\\sigma}^{2} = \\frac{\\text{RSS}}{m - p}$", 2, true],
      ["caveat", "This linearisation can be poor for strongly nonlinear models or small samples; profile likelihood or bootstrap give better intervals", 2, true],
    ]),
  num(m(NL, "transfer-se", "transfer", 9, 75, "With $\\hat{\\sigma}^{2} = 2$ and the diagonal entry of $(J^{\\top}J)^{-1}$ equal to $0.08$, what is the standard error $\\sqrt{2 \\times 0.08}$?"), 0.4),
  mcq(m(NL, "transfer-marquardt", "transfer", 9, 75, "Marquardt's choice $D = \\operatorname{diag}(J^{\\top}J)$ instead of $D = I$:"),
    "Makes the damping scale-invariant, so rescaling a parameter doesn't change the iterates",
    [
      ["Removes the need for damping", "marquardt-remove", "Damping is still there."],
      ["Makes steps always larger", "marquardt-larger", "It rescales per parameter."],
      ["Adds second derivatives", "marquardt-second", "It uses $J$ only."],
    ]),
  num(m(NL, "transfer-big-lambda", "transfer", 9, 75, "With $J^{\\top}\\mathbf{r} = 4$ and huge $\\lambda = 100$, the LM step is about $-\\frac{J^{\\top}\\mathbf{r}}{\\lambda}$. What is it?"), -0.04),
  // level 10
  short(m(NL, "transfer-robust", "transfer", 10, 180, "How can Gauss–Newton be adapted to fit data with outliers?"),
    [
      ["robust-loss", "Replace squared residuals with a robust loss (Huber, Cauchy) that grows more slowly for large residuals", 2, true],
      ["irls", "Solve it by iteratively reweighted Gauss–Newton: each step is weighted least squares with weights that downweight large residuals", 2, true],
    ]),
  mcq(m(NL, "transfer-varpro", "transfer", 10, 90, "For a model linear in some parameters (e.g. $\\sum_j c_je^{-b_jt}$), variable projection:"),
    "Eliminates the linear parameters by solving for them exactly, then optimises only the nonlinear ones",
    [
      ["Treats all parameters as nonlinear", "varpro-all", "That's what it avoids."],
      ["Fixes the nonlinear parameters", "varpro-fix", "They're optimised."],
      ["Uses only function values", "varpro-values", "It still uses derivatives."],
    ]),
  num(m(NL, "transfer-rate", "transfer", 10, 90, "Near a nonzero-residual solution, Gauss–Newton converges linearly with rate about $\\frac{\\|S\\|}{\\lambda_{\\min}(J^{\\top}J)}$, where $S$ is the dropped term. What is it for $\\|S\\| = 0.5$ and $\\lambda_{\\min} = 2$?"), 0.25),
  short(m(NL, "transfer-vs-bfgs", "transfer", 10, 180, "When would you use Levenberg–Marquardt rather than a general method like BFGS for a fitting problem?"),
    [
      ["structure", "When the objective is a sum of squared residuals with an available Jacobian, LM exploits that structure for a good Hessian approximation from first derivatives", 2, true],
      ["choice", "BFGS is better for general objectives (likelihoods that aren't sums of squares) or when residual Jacobians are unavailable", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// lagrange-multipliers
// ---------------------------------------------------------------------------
const LG = "lagrange-multipliers";
const lagrange: Item[] = [
  // level 1
  mcq(m(LG, "recall-lagrangian", "recall", 1, 15, "For $\\min f(\\mathbf{x})$ subject to $h(\\mathbf{x}) = 0$, the Lagrangian is:"),
    "$f(\\mathbf{x}) + \\lambda h(\\mathbf{x})$",
    [
      ["$f(\\mathbf{x})h(\\mathbf{x})$", "lagrangian-product", "It's a sum, not a product."],
      ["$f(\\mathbf{x}) - h(\\mathbf{x})^{2}$", "lagrangian-penalty", "That resembles a penalty."],
      ["$\\lambda f(\\mathbf{x})$", "lagrangian-scale", "The constraint must appear."],
    ]),
  mcq(m(LG, "recall-parallel", "recall", 1, 15, "At a constrained optimum with one constraint, $\\nabla f$ is:"),
    "Parallel to $\\nabla h$",
    [
      ["Perpendicular to $\\nabla h$", "parallel-perp", "It's perpendicular to the constraint surface, i.e. parallel to $\\nabla h$."],
      ["Zero", "parallel-zero", "Only if the constraint is inactive in effect."],
      ["Equal to $h$", "parallel-h", "Unrelated."],
    ]),
  mcq(m(LG, "recall-meaning", "recall", 1, 15, "A Lagrange multiplier measures:"),
    "How fast the optimal value changes as the constraint is relaxed",
    [
      ["The distance to the optimum", "meaning-distance", "It's a sensitivity."],
      ["The number of constraints", "meaning-count", "Each constraint has its own multiplier."],
      ["The curvature of $f$", "meaning-curvature", "It's a rate of change of the optimum."],
    ]),
  mcq(m(LG, "recall-count", "recall", 1, 15, "With $n$ variables and $m$ equality constraints, the Lagrange conditions give:"),
    "$n + m$ equations in $n + m$ unknowns",
    [
      ["$n$ equations in $n$ unknowns", "count-n", "The multipliers add $m$ unknowns and constraints add $m$ equations."],
      ["$m$ equations", "count-m", "Stationarity adds $n$."],
      ["$nm$ equations", "count-product", "It's a sum."],
    ]),
  // level 2
  num(m(LG, "apply-line-x", "apply", 2, 20, "Minimise $x^{2} + y^{2}$ subject to $x + 2y = 5$. What is $x$ at the optimum?"), 1),
  num(m(LG, "apply-line-lambda", "apply", 2, 20, "Using $\\mathcal{L} = x^{2} + y^{2} + \\lambda(x + 2y - 5)$, what is $\\lambda$ at the optimum?"), -2),
  num(m(LG, "apply-line-value", "apply", 2, 20, "What is the optimal value?"), 5),
  mcq(m(LG, "apply-tangent", "apply", 2, 20, "Geometrically, at the optimum of a 2-D problem with one constraint:"),
    "A level curve of $f$ is tangent to the constraint curve",
    [
      ["The level curve crosses the constraint at a right angle", "tangent-cross", "Crossing means you could still improve."],
      ["The constraint passes through the unconstrained minimum", "tangent-through", "Then the constraint wouldn't matter."],
      ["$f = 0$", "tangent-zero", "The value is arbitrary."],
    ]),
  // level 3
  num(m(LG, "apply-area", "apply", 3, 25, "Maximise $xy$ subject to $x + y = 10$. What is the maximum?"), 25),
  num(m(LG, "apply-area-lambda", "apply", 3, 25, "From $y = \\lambda$ and $x = \\lambda$ at that optimum, what is $\\lambda$?"), 5),
  num(m(LG, "apply-simple", "apply", 3, 25, "Minimise $x^{2} + y^{2}$ subject to $x + y = 2$. What is the minimum?"), 2),
  num(m(LG, "apply-sensitivity", "apply", 3, 25, "The maximal area is $A^{*}(c) = \\frac{c^{2}}{4}$. What is $\\frac{dA^{*}}{dc}$ at $c = 10$?"), 5),
  // level 4
  num(m(LG, "apply-weighted", "apply", 4, 30, "Minimise $x^{2} + 2y^{2}$ subject to $x + y = 3$. What is the minimum?"), 6),
  num(m(LG, "apply-weighted-lambda", "apply", 4, 30, "Writing stationarity as $\\nabla f = \\lambda\\nabla h$, what is $\\lambda$ for that problem?"), 4),
  num(m(LG, "apply-circle", "apply", 4, 30, "Minimise $2x + y$ on the circle $x^{2} + y^{2} = 5$. What is the minimum value?"), -5),
  mcq(m(LG, "apply-second-order", "apply", 4, 30, "To confirm a constrained minimum, the Hessian of the Lagrangian must be positive definite:"),
    "On the tangent space of the constraints",
    [
      ["On all of $\\mathbb{R}^{n}$", "second-all", "Only feasible directions matter."],
      ["In the direction of $\\nabla h$", "second-normal", "That direction leaves the constraint."],
      ["Never — first-order conditions suffice", "second-never", "They don't distinguish minima and maxima."],
    ]),
  // level 5
  short(m(LG, "explain-gradient", "explain", 5, 90, "Explain why $\\nabla f$ must be a combination of the constraint gradients at a constrained minimiser."),
    [
      ["tangent", "Moving along the constraint surface means moving in tangent directions $\\mathbf{d}$ with $\\nabla h_j^{\\top}\\mathbf{d} = 0$; at a minimiser $f$ can't decrease along any of them, so $\\nabla f^{\\top}\\mathbf{d} = 0$", 2, true],
      ["span", "A vector orthogonal to the whole tangent space lies in the span of the constraint gradients, so $\\nabla f = -\\sum\\lambda_j\\nabla h_j$", 2, true],
    ]),
  mcq(m(LG, "apply-licq", "apply", 5, 40, "The Lagrange conditions are guaranteed to hold at a minimiser when:"),
    "The constraint gradients are linearly independent there (LICQ)",
    [
      ["$f$ is linear", "licq-linear", "That's not the qualification."],
      ["There's only one variable", "licq-one", "Irrelevant."],
      ["Always, without conditions", "licq-always", "Degenerate constraints can break them."],
    ]),
  num(m(LG, "apply-kkt-system", "apply", 5, 40, "Minimise $\\frac{1}{2}(x^{2} + y^{2})$ subject to $x + y = 1$. What is $x$?"), 0.5),
  mcq(m(LG, "apply-qp", "apply", 5, 40, "An equality-constrained convex quadratic program is solved by:"),
    "A single linear system (the KKT system)",
    [
      ["An iterative method that never terminates", "qp-iterative", "One linear solve suffices."],
      ["Bisection", "qp-bisection", "Not applicable."],
      ["Only by the simplex method", "qp-simplex", "That's for LPs."],
    ]),
  // level 6
  short(m(LG, "explain-shadow", "explain", 6, 120, "Interpret a Lagrange multiplier as a shadow price, with an example."),
    [
      ["meaning", "It is the rate at which the optimal value changes per unit relaxation of the constraint", 2, true],
      ["example", "E.g. in maximising area with a fixed fence length, $\\lambda$ is the extra area gained per extra unit of fence; in production, the value of one more unit of a scarce resource", 2, true],
    ]),
  num(m(LG, "apply-pstar-derivative", "apply", 6, 45, "For $\\min x^{2} + y^{2}$ subject to $x + 2y = c$, the optimum is $p^{*}(c) = \\frac{c^{2}}{5}$. What is $\\frac{dp^{*}}{dc}$ at $c = 5$?"), 2),
  num(m(LG, "apply-multinomial", "apply", 6, 45, "Maximising a multinomial log-likelihood $\\sum n_i\\ln\\pi_i$ subject to $\\sum\\pi_i = 1$ gives $\\hat{\\pi}_i = \\frac{n_i}{n}$. For counts $(3, 5, 2)$, what is $\\hat{\\pi}_2$?"), 0.5),
  mcq(m(LG, "apply-also-max", "apply", 6, 45, "The Lagrange conditions also hold at:"),
    "Constrained maxima and saddle points, not only minima",
    [
      ["Only global minima", "also-global", "They're necessary, not sufficient."],
      ["Only infeasible points", "also-infeasible", "Feasibility is one of the conditions."],
      ["Points where $f = 0$", "also-zero", "Unrelated."],
    ]),
  // level 7
  num(m(LG, "transfer-product", "transfer", 7, 60, "Maximise $xyz$ subject to $x + y + z = 12$ (positive variables). What is the maximum?"), 64),
  short(m(LG, "transfer-geometry", "transfer", 7, 120, "Explain geometrically why the closest point on a plane to the origin is found by Lagrange multipliers."),
    [
      ["level", "Level sets of $\\|\\mathbf{x}\\|^{2}$ are spheres; the smallest sphere touching the plane is tangent to it", 2, true],
      ["normal", "At the tangent point the sphere's normal (the position vector) is parallel to the plane's normal, which is exactly $\\nabla f = \\lambda\\nabla h$", 2, true],
    ]),
  num(m(LG, "transfer-plane", "transfer", 7, 60, "What is the distance from the origin to the closest point of the plane $x + y + z = 3$? Give $4$ decimal places."), 1.7321),
  mcq(m(LG, "transfer-degenerate", "transfer", 7, 60, "Minimise $x$ subject to $x^{2} = 0$. Why do the Lagrange conditions fail at the minimiser $x = 0$?"),
    "The constraint gradient $2x$ vanishes there, so $1 + \\lambda \\cdot 0 = 0$ has no solution",
    [
      ["$x = 0$ isn't optimal", "degenerate-not-optimal", "It's the only feasible point, so it's optimal."],
      ["$f$ isn't differentiable", "degenerate-f", "$f = x$ is smooth."],
      ["There are too many constraints", "degenerate-many", "There's one."],
    ]),
  // level 8
  short(m(LG, "transfer-pca", "transfer", 8, 120, "Show that the first principal component solves a Lagrange-multiplier problem."),
    [
      ["problem", "Maximise the variance $\\mathbf{w}^{\\top}\\Sigma\\mathbf{w}$ subject to $\\mathbf{w}^{\\top}\\mathbf{w} = 1$", 2, true],
      ["solution", "Stationarity gives $\\Sigma\\mathbf{w} = \\lambda\\mathbf{w}$, so $\\mathbf{w}$ is an eigenvector; the objective equals $\\lambda$, so the largest eigenvalue's eigenvector is optimal", 2, true],
    ]),
  num(m(LG, "transfer-pca-value", "transfer", 8, 60, "Maximise $\\mathbf{w}^{\\top}\\Sigma\\mathbf{w}$ subject to $\\|\\mathbf{w}\\| = 1$ with $\\Sigma = \\operatorname{diag}(5, 2)$. What is the maximum?"), 5),
  num(m(LG, "transfer-portfolio", "transfer", 8, 60, "Two uncorrelated assets have variances $1$ and $4$. The minimum-variance portfolio with weights summing to $1$ puts what weight on the first asset?"), 0.8),
  mcq(m(LG, "transfer-bordered", "transfer", 8, 60, "The bordered Hessian is used to:"),
    "Test second-order conditions for equality-constrained problems",
    [
      ["Compute the gradient", "bordered-gradient", "It's a second-order tool."],
      ["Solve linear programs", "bordered-lp", "Unrelated."],
      ["Find feasible starting points", "bordered-feasible", "It classifies stationary points."],
    ]),
  // level 9
  short(m(LG, "transfer-economics", "transfer", 9, 150, "In consumer theory, a household maximises utility $u(\\mathbf{x})$ subject to a budget $\\mathbf{p}^{\\top}\\mathbf{x} = I$. What do the Lagrange conditions say?"),
    [
      ["ratio", "$\\nabla u = \\lambda\\mathbf{p}$: marginal utility per unit price is equal across goods, $\\frac{\\partial u/\\partial x_i}{p_i} = \\lambda$", 2, true],
      ["lambda", "$\\lambda$ is the marginal utility of income: the gain in utility from one more unit of budget", 2, true],
    ]),
  num(m(LG, "transfer-portfolio-var", "transfer", 9, 75, "With weights $(0.8, 0.2)$ on uncorrelated assets with variances $1$ and $4$, what is the portfolio variance?"), 0.8),
  mcq(m(LG, "transfer-sign", "transfer", 9, 75, "For an equality constraint, the sign of the Lagrange multiplier:"),
    "Can be positive or negative; it depends on the direction in which relaxing the constraint helps",
    [
      ["Must be positive", "sign-positive", "That's for inequality constraints in KKT."],
      ["Must be negative", "sign-negative", "No sign restriction."],
      ["Must be zero", "sign-zero", "Then the constraint wouldn't matter."],
    ]),
  num(m(LG, "transfer-min-norm", "transfer", 9, 75, "Minimise $\\|\\mathbf{x}\\|^{2}$ subject to $\\mathbf{a}^{\\top}\\mathbf{x} = b$; the solution is $\\mathbf{x} = \\frac{b}{\\|\\mathbf{a}\\|^{2}}\\mathbf{a}$. For $\\mathbf{a} = (3, 4)$ and $b = 10$, what is the second component?"), 1.6),
  // level 10
  short(m(LG, "transfer-inequalities", "transfer", 10, 180, "Why aren't Lagrange multipliers enough for inequality constraints?"),
    [
      ["active", "An inequality may be inactive at the optimum, in which case it shouldn't affect the solution, so its multiplier must be zero", 2, true],
      ["sign", "When active, it can only push one way, so its multiplier must have a fixed sign; these extra conditions are the KKT conditions", 2, true],
    ]),
  mcq(m(LG, "transfer-saddle", "transfer", 10, 90, "For convex problems, an optimal pair $(\\mathbf{x}^{*}, \\lambda^{*})$ is a saddle point of the Lagrangian, meaning it:"),
    "Minimises $\\mathcal{L}$ over $\\mathbf{x}$ and maximises it over $\\lambda$",
    [
      ["Maximises $\\mathcal{L}$ over both", "saddle-max", "It's a min over $\\mathbf{x}$."],
      ["Minimises $\\mathcal{L}$ over both", "saddle-min", "It's a max over $\\lambda$."],
      ["Makes $\\mathcal{L} = 0$", "saddle-zero", "The value is the optimum, not $0$."],
    ]),
  short(m(LG, "transfer-penalty-motivation", "transfer", 10, 180, "Why do algorithms often combine Lagrange multipliers with a quadratic penalty (the augmented Lagrangian) instead of solving the Lagrange system directly?"),
    [
      ["direct", "Solving $\\nabla\\mathcal{L} = \\mathbf{0}$ directly finds saddle points, which is hard for nonlinear problems and not a minimisation", 2, true],
      ["augmented", "Adding $\\frac{\\rho}{2}\\|h\\|^{2}$ makes minimising over $\\mathbf{x}$ well posed and convex near the solution, while multiplier updates remove the need for a huge penalty", 2, true],
    ]),
  num(m(LG, "transfer-rayleigh", "transfer", 10, 90, "Minimise $\\mathbf{w}^{\\top}\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}\\mathbf{w}$ subject to $\\|\\mathbf{w}\\| = 1$. What is the minimum?"), 1),
];

export const opt04Items: Item[] = [...proximal, ...quasiNewton, ...leastSquares, ...lagrange];
