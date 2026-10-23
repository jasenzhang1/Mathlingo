import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./opt-shared";

/**
 * Optimization course, part 3: momentum and acceleration, conjugate
 * gradients, coordinate descent and subgradient methods. Forty questions per
 * lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// momentum-and-acceleration
// ---------------------------------------------------------------------------
const MA = "momentum-and-acceleration";
const momentum: Item[] = [
  // level 1
  mcq(m(MA, "recall-heavy-ball", "recall", 1, 15, "Polyak's heavy-ball method adds which term to a gradient step?"),
    "$\\beta(\\mathbf{x}_k - \\mathbf{x}_{k-1})$, a multiple of the previous step",
    [
      ["$\\beta\\nabla^{2} f(\\mathbf{x}_k)$", "heavy-hessian", "It uses no second derivatives."],
      ["A random perturbation", "heavy-random", "The term is deterministic."],
      ["$\\beta\\mathbf{x}_k$", "heavy-x", "It uses the previous step, not the point itself."],
    ]),
  mcq(m(MA, "recall-lookahead", "recall", 1, 15, "Nesterov's accelerated gradient evaluates the gradient:"),
    "At an extrapolated look-ahead point $\\mathbf{y}_k$",
    [
      ["At the current iterate $\\mathbf{x}_k$", "lookahead-current", "That's heavy ball."],
      ["At the previous iterate", "lookahead-previous", "It looks ahead, not back."],
      ["At a random point", "lookahead-random", "The extrapolation is deterministic."],
    ]),
  mcq(m(MA, "recall-rate", "recall", 1, 15, "On smooth convex problems, Nesterov's method achieves $f(\\mathbf{x}_k) - f^{*} =$:"),
    "$O\\!\\left(\\frac{1}{k^{2}}\\right)$",
    [
      ["$O\\!\\left(\\frac{1}{k}\\right)$", "rate-gd", "That's plain gradient descent."],
      ["$O\\!\\left(\\frac{1}{\\sqrt{k}}\\right)$", "rate-subgradient", "That's the subgradient method."],
      ["$O(e^{-k})$ always", "rate-linear", "Linear rates need strong convexity."],
    ]),
  mcq(m(MA, "recall-analogy", "recall", 1, 15, "The physical picture behind momentum is:"),
    "A ball rolling downhill with friction, building speed along consistent directions",
    [
      ["A spring bouncing in place", "analogy-spring", "Momentum accumulates progress."],
      ["Random walkers", "analogy-random", "The method is deterministic."],
      ["A balance scale", "analogy-scale", "Unrelated."],
    ]),
  // level 2
  num(m(MA, "apply-heavy-ball", "apply", 2, 20, "Heavy ball on $f(x) = \\frac{1}{2}x^{2}$ with $\\alpha = 0.5$, $\\beta = 0.5$ and $x_{-1} = x_0 = 1$ gives $x_1 = 0.5$. What is $x_2$?"), 0),
  num(m(MA, "apply-sqrt-kappa", "apply", 2, 20, "What is $\\sqrt{\\kappa}$ for $\\kappa = 400$?"), 20),
  num(m(MA, "apply-coefficient", "apply", 2, 20, "Nesterov's momentum coefficient $\\frac{k - 1}{k + 2}$ at $k = 4$ is what?"), 0.5),
  mcq(m(MA, "apply-beta-dl", "apply", 2, 20, "A common momentum coefficient $\\beta$ in deep-learning SGD is:"),
    "$0.9$",
    [
      ["$1.5$", "beta-large", "$\\beta \\ge 1$ makes the velocity blow up."],
      ["$0$", "beta-zero", "That's plain SGD."],
      ["$-0.9$", "beta-negative", "Negative momentum opposes progress."],
    ]),
  // level 3
  num(m(MA, "apply-nesterov-step", "apply", 3, 25, "Nesterov on $f(x) = x^{2}$ ($L = 2$): $x_k = 2$, $x_{k-1} = 1$ and coefficient $0.5$ give $y_k = 2.5$. What is $x_{k+1} = y_k - \\frac{1}{L}f'(y_k)$?"), 0),
  num(m(MA, "apply-hb-rate", "apply", 3, 25, "With tuned parameters, heavy ball on a quadratic contracts by $\\frac{\\sqrt{\\kappa} - 1}{\\sqrt{\\kappa} + 1}$ per step. What is it for $\\kappa = 100$? Give $4$ decimal places."), 0.8182),
  num(m(MA, "apply-gd-rate", "apply", 3, 25, "Gradient descent with its best constant step contracts by $\\frac{\\kappa - 1}{\\kappa + 1}$. What is it for $\\kappa = 100$? Give $4$ decimal places."), 0.9802),
  num(m(MA, "apply-bound-ratio", "apply", 3, 25, "At $k = 100$, by what factor is the $\\frac{1}{k^{2}}$ bound smaller than the $\\frac{1}{k}$ bound (same constant)?"), 100),
  // level 4
  num(m(MA, "apply-hb-beta", "apply", 4, 30, "The tuned heavy-ball momentum is $\\beta = \\left(\\frac{\\sqrt{\\kappa} - 1}{\\sqrt{\\kappa} + 1}\\right)^{2}$. What is it for $\\kappa = 100$? Give $4$ decimal places."), 0.6694),
  num(m(MA, "apply-hb-alpha", "apply", 4, 30, "The tuned heavy-ball step is $\\alpha = \\frac{4}{(\\sqrt{L} + \\sqrt{\\mu})^{2}}$. What is it for $L = 100$ and $\\mu = 1$? Give $4$ decimal places."), 0.0331),
  num(m(MA, "apply-iterations", "apply", 4, 30, "Accelerated methods need on the order of $\\sqrt{\\kappa}$ iterations per factor-$e$ reduction. How many for $\\kappa = 2{,}500$?"), 50),
  mcq(m(MA, "apply-nonmonotone", "apply", 4, 30, "Unlike gradient descent with step $\\frac{1}{L}$, Nesterov's method:"),
    "Is not monotone — $f$ can temporarily increase",
    [
      ["Never overshoots", "nonmonotone-never", "Momentum carries it past the minimiser."],
      ["Needs second derivatives", "nonmonotone-second", "It's first-order."],
      ["Converges more slowly on quadratics", "nonmonotone-slower", "It's faster."],
    ]),
  // level 5
  short(m(MA, "explain-valley", "explain", 5, 90, "Explain how momentum speeds up progress in a long, narrow valley."),
    [
      ["accumulate", "Along the valley floor the gradient points consistently the same way, so the momentum term accumulates and the effective step grows", 2, true],
      ["cancel", "Across the valley the gradient alternates in sign, so successive contributions cancel and the oscillation is damped", 2, true],
    ]),
  mcq(m(MA, "apply-restart", "apply", 5, 40, "Adaptive restart for accelerated methods means:"),
    "Resetting the momentum to zero when $f$ increases (or the step opposes the gradient)",
    [
      ["Restarting from the initial point", "restart-initial", "It keeps the current point."],
      ["Increasing the step size", "restart-step", "It resets momentum."],
      ["Switching to Newton's method", "restart-newton", "It stays first-order."],
    ]),
  num(m(MA, "apply-velocity", "apply", 5, 40, "In velocity form $v \\leftarrow \\beta v - \\alpha\\nabla f$, with $v = 1$, $\\beta = 0.9$, $\\alpha = 0.1$ and $\\nabla f = 2$, what is the new $v$?"), 0.7),
  mcq(m(MA, "apply-hb-failure", "apply", 5, 40, "On general (non-quadratic) smooth convex functions, heavy-ball momentum:"),
    "Can fail to converge, whereas Nesterov's method has guarantees",
    [
      ["Always beats Nesterov", "hb-failure-beats", "It lacks general guarantees."],
      ["Reduces to Newton's method", "hb-failure-newton", "It's first-order."],
      ["Is identical to Nesterov", "hb-failure-identical", "They evaluate the gradient at different points."],
    ]),
  // level 6
  short(m(MA, "explain-nesterov-difference", "explain", 6, 120, "What is the essential difference between Nesterov's method and heavy ball, and why does it matter?"),
    [
      ["where", "Nesterov evaluates the gradient after applying the momentum step (at the look-ahead point), heavy ball before it", 2, true],
      ["matters", "Seeing the gradient where momentum is about to take it lets Nesterov correct overshoot, which yields its guaranteed $O\\!\\left(\\frac{1}{k^{2}}\\right)$ rate on all smooth convex functions", 2, true],
    ]),
  num(m(MA, "apply-terminal-velocity", "apply", 6, 45, "With a constant gradient $g = 1$, $\\alpha = 0.1$ and $\\beta = 0.9$, the velocity settles where $v = \\beta v - \\alpha g$. What is $|v|$?"), 1),
  num(m(MA, "apply-effective-step", "apply", 6, 45, "Under a constant gradient, momentum multiplies the effective step by $\\frac{1}{1 - \\beta}$. What is that for $\\beta = 0.99$?"), 100),
  mcq(m(MA, "apply-fista", "apply", 6, 45, "FISTA is:"),
    "Nesterov acceleration applied to the proximal gradient method",
    [
      ["A quasi-Newton method", "fista-quasi", "It's first-order."],
      ["Heavy ball for subgradients", "fista-subgradient", "It uses proximal steps."],
      ["A second-order interior-point method", "fista-interior", "Unrelated."],
    ]),
  // level 7
  num(m(MA, "transfer-k-needed", "transfer", 7, 60, "With $f(\\mathbf{x}_k) - f^{*} \\le \\frac{1}{k^{2}}$, how many iterations guarantee a gap of $10^{-4}$?"), 100),
  short(m(MA, "transfer-lower-bound", "transfer", 7, 120, "What does it mean that Nesterov's method is “optimal,” and what is that claim relative to?"),
    [
      ["bound", "There are smooth convex functions on which any method that builds iterates from gradient combinations needs $\\Omega\\!\\left(\\frac{1}{k^{2}}\\right)$ error (and $\\Omega(\\sqrt{\\kappa})$ dependence when strongly convex)", 2, true],
      ["matches", "Nesterov's rate matches these lower bounds up to constants, so no first-order method can do fundamentally better in the worst case", 2, true],
    ]),
  num(m(MA, "transfer-strong-factor", "transfer", 7, 60, "For strongly convex $f$, Nesterov contracts by about $1 - \\frac{1}{\\sqrt{\\kappa}}$ per step. What is that for $\\kappa = 100$?"), 0.9),
  mcq(m(MA, "transfer-noise", "transfer", 7, 60, "Why doesn't the $\\frac{1}{k^{2}}$ rate carry over directly to stochastic gradients?"),
    "Gradient noise accumulates in the momentum, so errors aren't damped fast enough",
    [
      ["Stochastic gradients are biased", "noise-biased", "Minibatch gradients are typically unbiased."],
      ["Momentum can't be computed", "noise-compute", "It can; it's just less effective."],
      ["The problem becomes non-convex", "noise-nonconvex", "Convexity is unchanged."],
    ]),
  // level 8
  short(m(MA, "transfer-restart-why", "transfer", 8, 120, "Why does restarting momentum often recover fast linear convergence without knowing $\\mu$?"),
    [
      ["ripples", "With too much momentum for the local curvature, iterates overshoot and ripple; the ripple period reflects $\\sqrt{\\kappa}$", 2, true],
      ["restart", "Restarting at each ripple discards the excess momentum, which in effect tunes the momentum to the unknown strong convexity", 2, true],
    ]),
  num(m(MA, "transfer-big-kappa", "transfer", 8, 60, "For $\\kappa = 10^{6}$, by what factor does acceleration reduce the iteration count ($\\kappa$ versus $\\sqrt{\\kappa}$)?"), 1000),
  mcq(m(MA, "transfer-cg", "transfer", 8, 60, "Which method also achieves $\\sqrt{\\kappa}$ dependence on quadratics, without any tuned parameters?"),
    "The conjugate gradient method",
    [
      ["Plain gradient descent", "cg-gd", "Its dependence is on $\\kappa$."],
      ["Coordinate descent", "cg-coordinate", "Its rate depends on coordinate constants, not $\\sqrt{\\kappa}$."],
      ["The subgradient method", "cg-subgradient", "Much slower."],
    ]),
  short(m(MA, "transfer-adam", "transfer", 8, 120, "How does momentum appear in the Adam optimiser, and what role does it play there?"),
    [
      ["first-moment", "Adam's first moment is an exponential moving average of gradients, $\\mathbf{m} \\leftarrow \\beta_1\\mathbf{m} + (1 - \\beta_1)\\mathbf{g}$ — heavy-ball-style momentum", 2, true],
      ["role", "It smooths noisy stochastic gradients and keeps progress along consistent directions; the second moment then rescales per coordinate", 2, true],
    ]),
  // level 9
  short(m(MA, "transfer-fragile", "transfer", 9, 150, "Accelerated methods are sometimes called “fragile.” In what sense, and when is plain gradient descent preferable?"),
    [
      ["fragile", "Their guarantees degrade with inexact gradients or a mis-specified $L$ or $\\mu$: errors accumulate rather than being damped", 2, true],
      ["prefer", "With heavy noise, non-convexity, or when monotone decrease and simplicity matter, plain (or restarted) gradient descent can be more reliable", 2, true],
    ]),
  num(m(MA, "transfer-strong-momentum", "transfer", 9, 75, "For strongly convex problems Nesterov uses momentum $\\frac{\\sqrt{\\kappa} - 1}{\\sqrt{\\kappa} + 1}$. What is it for $\\kappa = 16$?"), 0.6),
  mcq(m(MA, "transfer-ripples", "transfer", 9, 75, "The ripples in an over-accelerated run have a period that grows with:"),
    "$\\sqrt{\\kappa}$",
    [
      ["$\\kappa^{2}$", "ripples-square", "The period scales like the square root."],
      ["The dimension $n$", "ripples-dimension", "It's governed by conditioning."],
      ["Nothing — they're random", "ripples-random", "The method is deterministic."],
    ]),
  num(m(MA, "transfer-coefficient-100", "transfer", 9, 75, "What is Nesterov's coefficient $\\frac{k - 1}{k + 2}$ at $k = 100$? Give $4$ decimal places."), 0.9706),
  // level 10
  short(m(MA, "transfer-ode", "transfer", 10, 180, "Su, Boyd and Candès showed Nesterov's method approximates $\\ddot{\\mathbf{x}} + \\frac{3}{t}\\dot{\\mathbf{x}} + \\nabla f(\\mathbf{x}) = \\mathbf{0}$. What does this ODE view explain?"),
    [
      ["damping", "It's a heavy particle with friction that decays like $\\frac{3}{t}$: early on little damping lets it accelerate, later damping settles it", 2, true],
      ["insight", "The vanishing damping explains both the faster $O\\!\\left(\\frac{1}{t^{2}}\\right)$ decay and the oscillations, and why the constant $3$ (the $k + 2$ in the coefficient) matters", 2, true],
    ]),
  mcq(m(MA, "transfer-gd-ode", "transfer", 10, 90, "In the same ODE picture, plain gradient descent corresponds to:"),
    "Gradient flow $\\dot{\\mathbf{x}} = -\\nabla f(\\mathbf{x})$, a first-order ODE with no inertia",
    [
      ["The same second-order ODE", "gd-ode-same", "It has no momentum, so no second derivative in time."],
      ["An undamped oscillator", "gd-ode-oscillator", "Gradient flow doesn't oscillate."],
      ["Brownian motion", "gd-ode-brownian", "That's closer to SGD with noise."],
    ]),
  num(m(MA, "transfer-ratio-1e4", "transfer", 10, 90, "To reach $10^{-6}$ with $\\kappa = 10^{4}$, gradient descent needs about $\\kappa\\ln 10^{6}$ iterations and acceleration about $\\sqrt{\\kappa}\\ln 10^{6}$. What is the ratio?"), 100),
  short(m(MA, "transfer-choose", "transfer", 10, 180, "You're minimising a smooth, strongly convex loss with exact gradients and an unknown $\\mu$. Which first-order method would you use, and how would you set it up?"),
    [
      ["method", "Nesterov's accelerated gradient (or FISTA if there's a simple nonsmooth term) with a backtracking estimate of $L$", 2, true],
      ["restart", "Use the convex-case coefficient $\\frac{k - 1}{k + 2}$ with adaptive restart, which recovers near-optimal linear convergence without knowing $\\mu$", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// conjugate-gradient-method
// ---------------------------------------------------------------------------
const CG = "conjugate-gradient-method";
const conjugate: Item[] = [
  // level 1
  mcq(m(CG, "recall-solves", "recall", 1, 15, "The conjugate gradient method solves $A\\mathbf{x} = \\mathbf{b}$ when $A$ is:"),
    "Symmetric positive definite",
    [
      ["Any square matrix", "solves-any", "It needs symmetry and positive definiteness."],
      ["Upper triangular", "solves-triangular", "Back substitution handles that directly."],
      ["Singular", "solves-singular", "Then there's no unique solution."],
    ]),
  mcq(m(CG, "recall-conjugate", "recall", 1, 15, "Directions $\\mathbf{p}_i$ and $\\mathbf{p}_j$ are $A$-conjugate when:"),
    "$\\mathbf{p}_i^{\\top}A\\mathbf{p}_j = 0$ for $i \\ne j$",
    [
      ["$\\mathbf{p}_i^{\\top}\\mathbf{p}_j = 0$", "conjugate-orthogonal", "That's ordinary orthogonality."],
      ["$A\\mathbf{p}_i = \\mathbf{p}_j$", "conjugate-map", "Unrelated."],
      ["$\\mathbf{p}_i = -\\mathbf{p}_j$", "conjugate-opposite", "That's not conjugacy."],
    ]),
  mcq(m(CG, "recall-n-steps", "recall", 1, 15, "In exact arithmetic, CG on an $n \\times n$ system finishes in at most:"),
    "$n$ iterations",
    [
      ["$1$ iteration", "n-steps-one", "Only if $A$ is a multiple of the identity (or the start is lucky)."],
      ["$n^{2}$ iterations", "n-steps-square", "It's at most $n$."],
      ["It never terminates", "n-steps-never", "Conjugacy forces termination."],
    ]),
  mcq(m(CG, "recall-matvec", "recall", 1, 15, "What does CG need from $A$ at each iteration?"),
    "One matrix–vector product",
    [
      ["A full factorisation", "matvec-factor", "That's a direct method."],
      ["The inverse of $A$", "matvec-inverse", "Computing it would defeat the purpose."],
      ["Its eigenvalues", "matvec-eigen", "They affect the speed but aren't computed."],
    ]),
  // level 2
  num(m(CG, "apply-residual", "apply", 2, 20, "With $\\mathbf{x}_0 = \\mathbf{0}$ and $\\mathbf{b} = (1, 2)$, what is the second component of $\\mathbf{r}_0 = \\mathbf{b} - A\\mathbf{x}_0$?"), 2),
  num(m(CG, "apply-alpha0", "apply", 2, 20, "For $A = \\begin{bmatrix} 4 & 1 \\\\ 1 & 3 \\end{bmatrix}$ and $\\mathbf{r}_0 = \\mathbf{p}_0 = (1, 2)$, $\\mathbf{r}_0^{\\top}\\mathbf{r}_0 = 5$ and $\\mathbf{p}_0^{\\top}A\\mathbf{p}_0 = 20$. What is $\\alpha_0$?"), 0.25),
  num(m(CG, "apply-pAp", "apply", 2, 20, "What is $\\mathbf{p}^{\\top}A\\mathbf{p}$ for $\\mathbf{p} = (1, 1)$ and $A = \\operatorname{diag}(2, 3)$?"), 5),
  mcq(m(CG, "apply-residual-gradient", "apply", 2, 20, "For $f(\\mathbf{x}) = \\frac{1}{2}\\mathbf{x}^{\\top}A\\mathbf{x} - \\mathbf{b}^{\\top}\\mathbf{x}$, the residual $\\mathbf{r} = \\mathbf{b} - A\\mathbf{x}$ equals:"),
    "The negative gradient $-\\nabla f(\\mathbf{x})$",
    [
      ["The gradient $\\nabla f(\\mathbf{x})$", "residual-gradient-sign", "The sign is flipped."],
      ["The Hessian", "residual-hessian", "The Hessian is $A$."],
      ["The error $\\mathbf{x} - \\mathbf{x}^{*}$", "residual-error", "The residual is $-A$ times the error."],
    ]),
  // level 3
  num(m(CG, "apply-x1", "apply", 3, 25, "Continuing, $\\mathbf{x}_1 = \\mathbf{x}_0 + \\alpha_0\\mathbf{p}_0$. What is its second component?"), 0.5),
  num(m(CG, "apply-beta0", "apply", 3, 25, "With $\\mathbf{r}_1 = (-0.5, 0.25)$ and $\\mathbf{r}_0^{\\top}\\mathbf{r}_0 = 5$, what is $\\beta_0 = \\frac{\\mathbf{r}_1^{\\top}\\mathbf{r}_1}{\\mathbf{r}_0^{\\top}\\mathbf{r}_0}$?"), 0.0625),
  num(m(CG, "apply-conjugacy-check", "apply", 3, 25, "For $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$, what is $\\mathbf{p}^{\\top}A\\mathbf{q}$ with $\\mathbf{p} = (1, 0)$ and $\\mathbf{q} = (1, -2)$?"), 0),
  num(m(CG, "apply-a-norm", "apply", 3, 25, "What is the $A$-norm $\\sqrt{\\mathbf{e}^{\\top}A\\mathbf{e}}$ of $\\mathbf{e} = (1, 1)$ with $A = \\operatorname{diag}(2, 3)$? Give $4$ decimal places."), 2.2361),
  // level 4
  num(m(CG, "apply-x2", "apply", 4, 30, "CG on $\\begin{bmatrix} 4 & 1 \\\\ 1 & 3 \\end{bmatrix}\\mathbf{x} = (1, 2)$ terminates at the exact solution. What is its first component? Give $4$ decimal places."), 0.0909),
  num(m(CG, "apply-distinct-eigen", "apply", 4, 30, "A $100 \\times 100$ SPD matrix has only $2$ distinct eigenvalues. At most how many CG iterations are needed (exact arithmetic)?"), 2),
  num(m(CG, "apply-rate", "apply", 4, 30, "CG's error bound shrinks by $\\frac{\\sqrt{\\kappa} - 1}{\\sqrt{\\kappa} + 1}$ per step. What is that for $\\kappa = 100$? Give $4$ decimal places."), 0.8182),
  num(m(CG, "apply-identity", "apply", 4, 30, "How many CG iterations does it take to solve $I\\mathbf{x} = \\mathbf{b}$ from $\\mathbf{x}_0 = \\mathbf{0}$?"), 1),
  // level 5
  short(m(CG, "explain-n-steps", "explain", 5, 90, "Why does CG terminate in at most $n$ steps in exact arithmetic?"),
    [
      ["independent", "The $A$-conjugate directions are linearly independent, so after $n$ of them they span $\\mathbb{R}^{n}$", 2, true],
      ["optimal", "Each step minimises $f$ exactly along a new direction without spoiling earlier ones, so after $n$ steps $f$ is minimised over the whole space", 2, true],
    ]),
  mcq(m(CG, "apply-krylov", "apply", 5, 40, "After $k$ steps, CG's iterate minimises the $A$-norm error over:"),
    "The Krylov subspace $\\operatorname{span}\\{\\mathbf{r}_0, A\\mathbf{r}_0, \\ldots, A^{k-1}\\mathbf{r}_0\\}$ (shifted by $\\mathbf{x}_0$)",
    [
      ["All of $\\mathbb{R}^{n}$", "krylov-all", "Only after $n$ steps."],
      ["The span of the coordinate axes", "krylov-axes", "That's unrelated to $A$."],
      ["The eigenvectors of $A$", "krylov-eigen", "The Krylov subspace is built from $\\mathbf{r}_0$."],
    ]),
  num(m(CG, "apply-bound-10", "apply", 5, 40, "Evaluate the bound factor $2\\left(\\frac{9}{11}\\right)^{10}$. Give $4$ decimal places."), 0.2689),
  mcq(m(CG, "apply-spd", "apply", 5, 40, "Why must $A$ be symmetric positive definite for standard CG?"),
    "CG minimises the convex quadratic $\\frac{1}{2}\\mathbf{x}^{\\top}A\\mathbf{x} - \\mathbf{b}^{\\top}\\mathbf{x}$, which needs $A \\succ 0$, and its short recurrences rely on symmetry",
    [
      ["Otherwise matrix–vector products fail", "spd-matvec", "Products work for any $A$."],
      ["Only SPD matrices are sparse", "spd-sparse", "Sparsity is unrelated."],
      ["It needn't be", "spd-needn't", "Without it, CG can break down."],
    ]),
  // level 6
  short(m(CG, "explain-preconditioning", "explain", 6, 120, "What does preconditioning do for CG, and what makes a good preconditioner?"),
    [
      ["effect", "It applies CG to an equivalent system like $M^{-1}A\\mathbf{x} = M^{-1}\\mathbf{b}$ whose eigenvalues are clustered or better conditioned, so fewer iterations are needed", 2, true],
      ["good", "$M$ should approximate $A$ well yet be cheap to apply, e.g. diagonal (Jacobi), incomplete Cholesky, or multigrid", 2, true],
    ]),
  num(m(CG, "apply-jacobi", "apply", 6, 45, "For $A = \\operatorname{diag}(1, 100)$ with the Jacobi preconditioner $M = \\operatorname{diag}(A)$, what is the condition number of $M^{-1}A$?"), 1),
  num(m(CG, "apply-sqrt-iterations", "apply", 6, 45, "CG needs on the order of $\\sqrt{\\kappa}$ iterations per factor reduction. What is that for $\\kappa = 10^{4}$?"), 100),
  mcq(m(CG, "apply-fletcher-reeves", "apply", 6, 45, "In nonlinear CG, the Fletcher–Reeves choice of $\\beta_k$ is:"),
    "$\\frac{\\|\\nabla f_{k+1}\\|^{2}}{\\|\\nabla f_k\\|^{2}}$",
    [
      ["$\\frac{\\nabla f_{k+1}^{\\top}(\\nabla f_{k+1} - \\nabla f_k)}{\\|\\nabla f_k\\|^{2}}$", "fletcher-pr", "That's Polak–Ribière."],
      ["$0$", "fletcher-zero", "That's steepest descent."],
      ["$1$", "fletcher-one", "That's not a standard choice."],
    ]),
  // level 7
  num(m(CG, "transfer-fr-beta", "transfer", 7, 60, "With $\\|\\nabla f_{k+1}\\|^{2} = 2$ and $\\|\\nabla f_k\\|^{2} = 8$, what is the Fletcher–Reeves $\\beta_k$?"), 0.25),
  short(m(CG, "transfer-truncated-newton", "transfer", 7, 120, "How is CG used inside Newton's method for large problems?"),
    [
      ["inner", "CG solves the Newton system $\\nabla^{2} f\\,\\mathbf{p} = -\\nabla f$ approximately, needing only Hessian–vector products", 2, true],
      ["truncate", "It stops early (when the residual is small enough, or on detecting negative curvature), giving an inexact Newton step at much lower cost", 2, true],
    ]),
  mcq(m(CG, "transfer-precision", "transfer", 7, 60, "In floating-point arithmetic, CG:"),
    "Gradually loses conjugacy, so it may need more than $n$ iterations and is run until the residual is small",
    [
      ["Always finishes in exactly $n$ steps", "precision-exact", "Rounding breaks exact conjugacy."],
      ["Becomes unstable and diverges", "precision-diverge", "It still converges in practice."],
      ["Becomes identical to steepest descent", "precision-sd", "It remains far better."],
    ]),
  num(m(CG, "transfer-memory", "transfer", 7, 60, "CG keeps about $4$ vectors of length $n$. For $n = 10^{6}$ in fp64 ($8$ bytes), how many megabytes ($10^{6}$ bytes)?"), 32),
  // level 8
  short(m(CG, "transfer-vs-cholesky", "transfer", 8, 120, "When is CG preferable to a direct Cholesky solve, and when is Cholesky better?"),
    [
      ["cg", "CG for very large, sparse (or matrix-free) systems where factorisation fill-in or memory is prohibitive, especially with a good preconditioner", 2, true],
      ["cholesky", "Cholesky for moderate dense systems, or when solving with many right-hand sides, since the factorisation is reused and gives an exact answer", 2, true],
    ]),
  num(m(CG, "transfer-matvec-flops", "transfer", 8, 60, "A sparse matrix has $5 \\times 10^{5}$ nonzeros. At $2$ flops per nonzero, how many flops does one matrix–vector product take?"), 1000000),
  mcq(m(CG, "transfer-pr", "transfer", 8, 60, "Why is Polak–Ribière often preferred to Fletcher–Reeves in nonlinear CG?"),
    "It automatically restarts (β near $0$) when progress stalls, making it more robust in practice",
    [
      ["It needs no line search", "pr-no-linesearch", "Both use line searches."],
      ["It converges in $n$ steps on any function", "pr-n-steps", "Only quadratics finish in $n$ steps."],
      ["It uses the Hessian", "pr-hessian", "Both are first-order."],
    ]),
  num(m(CG, "transfer-krylov-dim", "transfer", 8, 60, "After $7$ CG iterations from $\\mathbf{x}_0$, what is the dimension of the Krylov subspace searched (assuming no early termination)?"), 7),
  // level 9
  short(m(CG, "transfer-cgls", "transfer", 9, 150, "How can CG solve a least-squares problem $\\min\\|A\\mathbf{x} - \\mathbf{b}\\|$, and why avoid forming $A^{\\top}A$?"),
    [
      ["cgls", "Apply CG to the normal equations $A^{\\top}A\\mathbf{x} = A^{\\top}\\mathbf{b}$ implicitly, using products with $A$ and $A^{\\top}$ (CGLS/LSQR)", 2, true],
      ["why", "Forming $A^{\\top}A$ squares the condition number and destroys sparsity; the implicit versions avoid both", 2, true],
    ]),
  num(m(CG, "transfer-squared-kappa", "transfer", 9, 75, "If $\\kappa(A) = 100$, what is $\\kappa(A^{\\top}A)$?"), 10000),
  mcq(m(CG, "transfer-nonsymmetric", "transfer", 9, 75, "For a nonsymmetric system, which Krylov method replaces CG?"),
    "GMRES (or BiCGSTAB)",
    [
      ["Plain CG", "nonsymmetric-cg", "CG needs symmetry."],
      ["Bisection", "nonsymmetric-bisection", "That's 1-D root finding."],
      ["Coordinate descent", "nonsymmetric-coordinate", "Not a Krylov method."],
    ]),
  num(m(CG, "transfer-three-eigen", "transfer", 9, 75, "An SPD matrix has $3$ distinct eigenvalues. At most how many CG iterations are needed (exact arithmetic)?"), 3),
  // level 10
  short(m(CG, "transfer-lanczos", "transfer", 10, 180, "How is CG related to the Lanczos process?"),
    [
      ["same", "Both build the same Krylov subspace with short three-term recurrences; Lanczos produces an orthonormal basis and a tridiagonal matrix $T_k$", 2, true],
      ["link", "CG is equivalent to solving the tridiagonal system from Lanczos implicitly, and its coefficients determine $T_k$, whose eigenvalues approximate $A$'s extremes", 2, true],
    ]),
  short(m(CG, "transfer-vs-nesterov", "transfer", 10, 180, "Compare CG with Nesterov's accelerated gradient on a strongly convex quadratic."),
    [
      ["rate", "Both achieve $\\sqrt{\\kappa}$ dependence, but CG is optimal within its Krylov subspace at every step and needs no knowledge of $L$ or $\\mu$", 2, true],
      ["scope", "CG exploits the quadratic structure (exact line searches, conjugacy); Nesterov applies to general smooth convex functions where CG's guarantees vanish", 2, true],
    ]),
  mcq(m(CG, "transfer-minres", "transfer", 10, 90, "For a symmetric but indefinite system (e.g. a KKT system), which method is appropriate?"),
    "MINRES",
    [
      ["Standard CG", "minres-cg", "CG can break down on indefinite matrices."],
      ["Cholesky", "minres-cholesky", "Cholesky needs positive definiteness."],
      ["Gradient descent", "minres-gd", "It doesn't solve indefinite systems."],
    ]),
  num(m(CG, "transfer-iteration-estimate", "transfer", 10, 90, "A standard estimate of CG iterations is $\\frac{\\sqrt{\\kappa}}{2}\\ln\\frac{2}{\\varepsilon}$. For $\\kappa = 100$ and $\\varepsilon = 10^{-6}$, round up to a whole number."), 73),
];

// ---------------------------------------------------------------------------
// coordinate-descent
// ---------------------------------------------------------------------------
const CD = "coordinate-descent";
const coordinate: Item[] = [
  // level 1
  mcq(m(CD, "recall-one", "recall", 1, 15, "Coordinate descent updates:"),
    "One coordinate (or block) at a time, holding the others fixed",
    [
      ["All coordinates simultaneously along the gradient", "one-all", "That's gradient descent."],
      ["Coordinates in random directions", "one-random-direction", "Moves are along coordinate axes."],
      ["The Hessian", "one-hessian", "It updates variables."],
    ]),
  mcq(m(CD, "recall-gauss-seidel", "recall", 1, 15, "Exact cyclic coordinate descent on a positive definite quadratic is the same as:"),
    "The Gauss–Seidel iteration for $A\\mathbf{x} = \\mathbf{b}$",
    [
      ["Newton's method", "gauss-seidel-newton", "Newton updates all coordinates using the full Hessian."],
      ["The simplex method", "gauss-seidel-simplex", "That's for LPs."],
      ["Conjugate gradients", "gauss-seidel-cg", "CG uses conjugate directions."],
    ]),
  mcq(m(CD, "recall-glmnet", "recall", 1, 15, "The popular `glmnet` package fits lasso and elastic-net models with:"),
    "Cyclic coordinate descent",
    [
      ["Newton's method on the full problem", "glmnet-newton", "The $\\ell_1$ term isn't differentiable."],
      ["Simulated annealing", "glmnet-annealing", "It's a convex problem."],
      ["The simplex method", "glmnet-simplex", "It uses coordinate descent."],
    ]),
  mcq(m(CD, "recall-orders", "recall", 1, 15, "Which is NOT a common rule for choosing the next coordinate?"),
    "Always the coordinate with the smallest partial derivative",
    [
      ["Cyclic order", "orders-cyclic", "That's standard."],
      ["Uniformly at random", "orders-random", "That's randomised CD."],
      ["The largest partial derivative (Gauss–Southwell)", "orders-greedy", "That's the greedy rule."],
    ]),
  // level 2
  num(m(CD, "apply-x-update", "apply", 2, 20, "For $f(x, y) = x^{2} + xy + y^{2} - 3x$, the exact $x$-update is $x = \\frac{3 - y}{2}$. From $y = 0$, what is $x$?"), 1.5),
  num(m(CD, "apply-y-update", "apply", 2, 20, "The exact $y$-update is $y = -\\frac{x}{2}$. With $x = 1.5$, what is $y$?"), -0.75),
  num(m(CD, "apply-separable", "apply", 2, 20, "For the separable $f(x, y) = (x - 1)^{2} + (y + 2)^{2}$, one sweep of exact coordinate descent from $(0, 0)$ gives what $y$?"), -2),
  mcq(m(CD, "apply-separable-why", "apply", 2, 20, "Why does one sweep solve a fully separable problem exactly?"),
    "Each coordinate's optimal value doesn't depend on the others",
    [
      ["Coordinate descent is always exact", "separable-always", "Coupled problems need many sweeps."],
      ["The Hessian is zero", "separable-zero", "The Hessian is diagonal, not zero."],
      ["The problem is linear", "separable-linear", "It's quadratic."],
    ]),
  // level 3
  num(m(CD, "apply-sweep2", "apply", 3, 25, "Continuing from $y = -0.75$, what is the next $x = \\frac{3 - y}{2}$?"), 1.875),
  num(m(CD, "apply-soft", "apply", 3, 25, "What is the soft-threshold $S_1(2.5) = \\operatorname{sign}(z)\\max(|z| - 1, 0)$ at $z = 2.5$?"), 1.5),
  num(m(CD, "apply-soft-zero", "apply", 3, 25, "What is $S_1(-0.4)$?"), 0),
  num(m(CD, "apply-lasso-update", "apply", 3, 25, "A lasso coordinate update is $\\beta_j = \\frac{S_{\\lambda}(\\mathbf{x}_j^{\\top}\\mathbf{r})}{\\|\\mathbf{x}_j\\|^{2}}$. With $\\mathbf{x}_j^{\\top}\\mathbf{r} = 6$, $\\lambda = 2$ and $\\|\\mathbf{x}_j\\|^{2} = 4$, what is $\\beta_j$?"), 1),
  // level 4
  num(m(CD, "apply-optimum", "apply", 4, 30, "What is the $x$-coordinate of the minimiser of $f(x, y) = x^{2} + xy + y^{2} - 3x$?"), 2),
  num(m(CD, "apply-sweep-factor", "apply", 4, 30, "The $x$-errors after successive sweeps are $0.5$, $0.125$ and $0.03125$. By what factor does the error shrink per sweep?"), 4),
  num(m(CD, "apply-coordinate-L", "apply", 4, 30, "For $f = \\frac{1}{2}\\mathbf{x}^{\\top}A\\mathbf{x}$ with $A = \\begin{bmatrix} 4 & 1 \\\\ 1 & 9 \\end{bmatrix}$, what is the coordinate-wise Lipschitz constant $L_2 = A_{22}$?"), 9),
  num(m(CD, "apply-coordinate-step", "apply", 4, 30, "Same $A$, at $\\mathbf{x} = (0, 1)$: $\\partial_2 f = 9$. A coordinate gradient step $x_2 \\leftarrow x_2 - \\frac{1}{L_2}\\partial_2 f$ gives what $x_2$?"), 0),
  // level 5
  short(m(CD, "explain-nonsmooth-trap", "explain", 5, 90, "Why can coordinate descent get stuck on $f(x, y) = |x - y| - \\frac{1}{2}(x + y)$?"),
    [
      ["stuck", "At any point with $x = y$, changing one coordinate by $t$ changes $f$ by $|t| - \\frac{t}{2} \\ge 0$, so no single-coordinate move improves $f$", 2, true],
      ["reason", "Yet moving along the diagonal decreases $f$; the nonsmooth term couples the coordinates, so coordinate-wise optimality isn't stationarity", 2, true],
    ]),
  mcq(m(CD, "apply-gauss-southwell", "apply", 5, 40, "The Gauss–Southwell rule picks the coordinate with:"),
    "The largest absolute partial derivative",
    [
      ["The smallest partial derivative", "southwell-smallest", "That makes the least progress."],
      ["The next index cyclically", "southwell-cyclic", "That's the cyclic rule."],
      ["A random index", "southwell-random", "That's the randomised rule."],
    ]),
  num(m(CD, "apply-southwell-pick", "apply", 5, 40, "The gradient is $(0.5, -3, 2)$. Which coordinate (numbered from $1$) does Gauss–Southwell update?"), 2),
  mcq(m(CD, "apply-randomised", "apply", 5, 40, "Randomised coordinate descent is attractive because:"),
    "It has clean convergence guarantees in expectation, depending on coordinate-wise constants",
    [
      ["It always beats cyclic order", "randomised-always", "Not always in practice."],
      ["It needs no gradients", "randomised-gradients", "It uses partial derivatives."],
      ["It solves non-convex problems globally", "randomised-global", "No such guarantee."],
    ]),
  // level 6
  short(m(CD, "explain-residual", "explain", 6, 120, "Why is each coordinate update in lasso coordinate descent so cheap?"),
    [
      ["residual", "Keep the residual $\\mathbf{r} = \\mathbf{y} - X\\boldsymbol{\\beta}$ up to date; the update needs only $\\mathbf{x}_j^{\\top}\\mathbf{r}$, an $O(n)$ inner product", 2, true],
      ["closed-form", "The one-dimensional problem has a closed-form soft-thresholding solution, and changing $\\beta_j$ updates $\\mathbf{r}$ in $O(n)$", 2, true],
    ]),
  num(m(CD, "apply-sweep-cost", "apply", 6, 45, "Each coordinate update costs about $n = 1{,}000$ operations, and there are $p = 500$ coordinates. About how many operations per sweep?"), 500000),
  mcq(m(CD, "apply-warm-start", "apply", 6, 45, "Why fit the lasso along a decreasing sequence of $\\lambda$ values with warm starts?"),
    "Solutions change little between nearby $\\lambda$, so each fit starts close to its answer and needs few sweeps",
    [
      ["Large $\\lambda$ is more accurate", "warm-accurate", "All fits are equally accurate."],
      ["It avoids computing gradients", "warm-gradients", "Each update still uses partial derivatives."],
      ["It makes the problem smooth", "warm-smooth", "The penalty stays nonsmooth."],
    ]),
  num(m(CD, "apply-lambda-max", "apply", 6, 45, "The smallest $\\lambda$ giving the all-zero lasso solution is $\\max_j|\\mathbf{x}_j^{\\top}\\mathbf{y}|$. With values $3$, $-7$ and $5$, what is it?"), 7),
  // level 7
  num(m(CD, "transfer-trap-change", "transfer", 7, 60, "For $f(x, y) = |x - y| - \\frac{1}{2}(x + y)$ at $(1, 1)$, by how much does $f$ change when $x$ increases by $0.5$?"), 0.25),
  short(m(CD, "transfer-als", "transfer", 7, 120, "Explain alternating least squares for matrix factorisation $X \\approx UV^{\\top}$ as block coordinate descent."),
    [
      ["blocks", "Fix $V$ and solve for $U$ (a least-squares problem), then fix $U$ and solve for $V$, alternating", 2, true],
      ["properties", "Each block step is convex and exact, so the objective never increases, though the joint problem is non-convex and only a stationary point is guaranteed", 2, true],
    ]),
  mcq(m(CD, "transfer-coupled", "transfer", 7, 60, "Coordinate descent is slow when:"),
    "Variables are strongly coupled, e.g. highly correlated features, so progress must zig-zag along the axes",
    [
      ["The problem is separable", "coupled-separable", "Then it's exact in one sweep."],
      ["Coordinates are independent", "coupled-independent", "Independence makes it fast."],
      ["The objective is quadratic", "coupled-quadratic", "Quadratics are fine if well conditioned."],
    ]),
  num(m(CD, "transfer-gauss-seidel", "transfer", 7, 60, "Gauss–Seidel on $\\begin{bmatrix} 4 & 1 \\\\ 1 & 3 \\end{bmatrix}\\mathbf{x} = (1, 2)$ from $(0, 0)$: first $x = \\frac{1}{4} = 0.25$, then $y = \\frac{2 - x}{3}$. What is $y$? Give $4$ decimal places."), 0.5833),
  // level 8
  short(m(CD, "transfer-smo", "transfer", 8, 120, "How is coordinate descent used to train support vector machines?"),
    [
      ["dual", "SVMs are trained in the dual, a box-constrained quadratic program in the multipliers $\\alpha_i$", 2, true],
      ["updates", "Coordinate (or pairwise, as in SMO) updates of the $\\alpha_i$ have closed forms, with pairs needed to keep the equality constraint $\\sum y_i\\alpha_i = 0$", 2, true],
    ]),
  num(m(CD, "transfer-elastic-net", "transfer", 8, 60, "An elastic-net coordinate update is $\\beta = \\frac{S_{\\lambda\\alpha}(z)}{\\|\\mathbf{x}\\|^{2} + \\lambda(1 - \\alpha)}$. With $z = 5$, $\\lambda = 2$, $\\alpha = 0.5$ and $\\|\\mathbf{x}\\|^{2} = 1$, what is $\\beta$?"), 2),
  mcq(m(CD, "transfer-em", "transfer", 8, 60, "The EM algorithm can be viewed as:"),
    "Coordinate ascent on a lower bound of the log-likelihood, alternating over the latent distribution and the parameters",
    [
      ["Newton's method on the likelihood", "em-newton", "EM doesn't use the Hessian."],
      ["Gradient descent with momentum", "em-momentum", "It alternates exact block maximisations."],
      ["A simplex method", "em-simplex", "Unrelated."],
    ]),
  num(m(CD, "transfer-random-rate", "transfer", 8, 60, "Randomised CD on a strongly convex quadratic contracts the expected gap by $1 - \\frac{\\mu}{nL_{\\max}}$ per update. What is it for $\\mu = 1$, $n = 10$ and $L_{\\max} = 1$?"), 0.9),
  // level 9
  short(m(CD, "transfer-when-wins", "transfer", 9, 150, "When does coordinate descent beat full-gradient methods?"),
    [
      ["cheap", "When a single coordinate update costs about $\\frac{1}{n}$ of a full gradient (as with residual tricks in regression), so $n$ updates cost one gradient", 2, true],
      ["constants", "When coordinate-wise curvature constants are much smaller than the global $L$, allowing larger effective steps; also when the nonsmooth part is separable", 2, true],
    ]),
  num(m(CD, "transfer-gs-second", "transfer", 9, 75, "Continuing Gauss–Seidel with $y = 0.5833$, what is the next $x = \\frac{1 - y}{4}$? Give $4$ decimal places."), 0.1042),
  mcq(m(CD, "transfer-jacobi", "transfer", 9, 75, "Updating all coordinates in parallel using the old values (Jacobi style) can:"),
    "Diverge on coupled problems where sequential (Gauss–Seidel) updates converge",
    [
      ["Never diverge", "jacobi-never", "Parallel updates can overshoot."],
      ["Always be faster per sweep", "jacobi-faster", "Not in iterations, and it may fail."],
      ["Equal Newton's method", "jacobi-newton", "It ignores off-diagonal coupling."],
    ]),
  short(m(CD, "transfer-screening", "transfer", 9, 150, "What are screening (strong) rules in lasso coordinate descent, and why do they help?"),
    [
      ["rule", "They predict, from correlations with the residual, which coefficients will be zero at the next $\\lambda$, and drop them from the sweep", 2, true],
      ["help", "Sweeps then touch only a small active set, saving much computation; KKT checks afterwards catch any wrongly discarded coefficients", 2, true],
    ]),
  // level 10
  short(m(CD, "transfer-admm-link", "transfer", 10, 180, "How is ADMM related to block coordinate descent?"),
    [
      ["blocks", "ADMM minimises the augmented Lagrangian over the $\\mathbf{x}$-block, then the $\\mathbf{z}$-block — one block coordinate pass", 2, true],
      ["dual", "It then updates the multiplier; that dual step is what makes it converge to the constrained solution, which plain block CD on a penalty would not", 2, true],
    ]),
  mcq(m(CD, "transfer-accelerated", "transfer", 10, 90, "Accelerated randomised coordinate descent (e.g. APPROX) improves the rate's dependence on conditioning by:"),
    "Adding Nesterov-style momentum to coordinate updates",
    [
      ["Using second derivatives", "accelerated-second", "It stays first-order."],
      ["Updating all coordinates every step", "accelerated-all", "That's full-gradient acceleration."],
      ["Removing randomisation", "accelerated-deterministic", "It's still randomised."],
    ]),
  num(m(CD, "transfer-path-cost", "transfer", 10, 90, "A lasso path uses $100$ values of $\\lambda$, $10$ sweeps each, at $5 \\times 10^{5}$ operations per sweep. How many million operations is that?"), 500),
  short(m(CD, "transfer-nonconvex", "transfer", 10, 180, "What does block coordinate descent guarantee on a non-convex problem like matrix factorisation, and what can go wrong?"),
    [
      ["guarantee", "Each block step can only decrease the objective, so values converge, and (under conditions like unique block minimisers) limit points are stationary", 2, true],
      ["wrong", "It can converge to poor local minima or saddle points, stall in flat regions, and results depend on initialisation", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// subgradient-method
// ---------------------------------------------------------------------------
const SG = "subgradient-method";
const subgradient: Item[] = [
  // level 1
  mcq(m(SG, "recall-definition", "recall", 1, 15, "A vector $\\mathbf{g}$ is a subgradient of convex $f$ at $\\mathbf{x}$ when:"),
    "$f(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\mathbf{g}^{\\top}(\\mathbf{y} - \\mathbf{x})$ for all $\\mathbf{y}$",
    [
      ["$f(\\mathbf{y}) \\le f(\\mathbf{x}) + \\mathbf{g}^{\\top}(\\mathbf{y} - \\mathbf{x})$", "definition-reversed", "That would be an over-estimator."],
      ["$\\mathbf{g} = \\nabla f(\\mathbf{x})$ only", "definition-gradient", "At kinks there's no gradient but there are subgradients."],
      ["$\\|\\mathbf{g}\\| = 1$", "definition-unit", "Length isn't the criterion."],
    ]),
  mcq(m(SG, "recall-abs", "recall", 1, 15, "The subdifferential of $|x|$ at $x = 0$ is:"),
    "$[-1, 1]$",
    [
      ["$\\{0\\}$", "abs-zero", "Any slope between $-1$ and $1$ supports $|x|$ at $0$."],
      ["$\\{1\\}$", "abs-one", "That's for $x > 0$."],
      ["Empty", "abs-empty", "Convex functions have subgradients at interior points."],
    ]),
  mcq(m(SG, "recall-not-descent", "recall", 1, 15, "A step along a negative subgradient:"),
    "May increase $f$ — the subgradient method is not a descent method",
    [
      ["Always decreases $f$", "not-descent-always", "Not at kinks."],
      ["Never changes $f$", "not-descent-never", "It usually does."],
      ["Always lands on the minimiser", "not-descent-lands", "Far from it."],
    ]),
  mcq(m(SG, "recall-rate", "recall", 1, 15, "With well-chosen steps, the subgradient method's error decreases like:"),
    "$O\\!\\left(\\frac{1}{\\sqrt{k}}\\right)$",
    [
      ["$O\\!\\left(\\frac{1}{k^{2}}\\right)$", "rate-accelerated", "That's accelerated smooth optimisation."],
      ["$O(e^{-k})$", "rate-linear", "Much faster than it achieves."],
      ["$O\\!\\left(\\frac{1}{k}\\right)$", "rate-gd", "That's smooth gradient descent."],
    ]),
  // level 2
  num(m(SG, "apply-abs-negative", "apply", 2, 20, "What is the (only) subgradient of $|x|$ at $x = -3$?"), -1),
  num(m(SG, "apply-max-active", "apply", 2, 20, "For $f(x) = \\max(x, 2x)$ at $x = 1$, only $2x$ is active. What is the subgradient?"), 2),
  num(m(SG, "apply-hinge", "apply", 2, 20, "What is the subgradient of the hinge $\\max(0, 1 - t)$ at $t = 0.5$?"), -1),
  mcq(m(SG, "apply-optimality", "apply", 2, 20, "A convex $f$ is minimised at $\\mathbf{x}^{*}$ if and only if:"),
    "$\\mathbf{0} \\in \\partial f(\\mathbf{x}^{*})$",
    [
      ["$\\nabla f(\\mathbf{x}^{*})$ exists and is $\\mathbf{0}$", "optimality-gradient", "At a kink there's no gradient, yet it can be the minimiser."],
      ["$\\partial f(\\mathbf{x}^{*})$ is empty", "optimality-empty", "It's never empty in the interior."],
      ["$f(\\mathbf{x}^{*}) = 0$", "optimality-value", "The value can be anything."],
    ]),
  // level 3
  num(m(SG, "apply-soft-small", "apply", 3, 25, "Minimise $|x| + \\frac{1}{2}(x - 0.5)^{2}$. What is $x^{*}$?"), 0),
  num(m(SG, "apply-soft-large", "apply", 3, 25, "Minimise $|x| + \\frac{1}{2}(x - 2)^{2}$. What is $x^{*}$?"), 1),
  num(m(SG, "apply-step", "apply", 3, 25, "A subgradient step on $|x|$ from $x = 1.2$ with $\\alpha = 1$ gives what?"), 0.2),
  num(m(SG, "apply-subdiff-low", "apply", 3, 25, "For $f(x) = |x| + \\frac{1}{2}(x - 0.5)^{2}$, $\\partial f(0) = [-1, 1] - 0.5$. What is the lower endpoint?"), -1.5),
  // level 4
  num(m(SG, "apply-oscillate", "apply", 4, 30, "Continuing the constant-step run on $|x|$ ($\\alpha = 1$): $x_0 = 1.2$, $x_1 = 0.2$, $x_2 = -0.8$. What is $x_3$?"), 0.2),
  num(m(SG, "apply-constant-floor", "apply", 4, 30, "With a constant step, the subgradient method gets within about $\\frac{\\alpha G^{2}}{2}$ of $f^{*}$. What is that for $\\alpha = 0.1$ and $G = 1$?"), 0.05),
  num(m(SG, "apply-rg-bound", "apply", 4, 30, "With the best fixed-horizon step, the error is about $\\frac{RG}{\\sqrt{k}}$. What is it for $R = 1$, $G = 1$ and $k = 10{,}000$?"), 0.01),
  mcq(m(SG, "apply-diminishing", "apply", 4, 30, "Which step-size rule guarantees convergence of the subgradient method?"),
    "$\\alpha_k = \\frac{1}{k}$ (so $\\sum\\alpha_k = \\infty$ and $\\sum\\alpha_k^{2} < \\infty$)",
    [
      ["A constant $\\alpha = 1$", "diminishing-constant", "That only reaches a neighbourhood."],
      ["$\\alpha_k = 2^{-k}$", "diminishing-geometric", "$\\sum\\alpha_k < \\infty$, so it can stop short."],
      ["$\\alpha_k = k$", "diminishing-growing", "Growing steps diverge."],
    ]),
  // level 5
  short(m(SG, "explain-not-descent", "explain", 5, 90, "Why isn't $-\\mathbf{g}$ always a descent direction for a subgradient $\\mathbf{g}$, and how does the method cope?"),
    [
      ["why", "At a kink a subgradient can point uphill: for $f = |x| + 2|y|$ at $(1, 0)$, $\\mathbf{g} = (1, 2)$ is a subgradient, but stepping along $-\\mathbf{g}$ gives $f = 1 + 3\\alpha$, an increase", 2, true],
      ["cope", "The method instead uses the fact that steps reduce the distance to the minimiser set for small enough $\\alpha$, and tracks the best value found", 2, true],
    ]),
  num(m(SG, "apply-iterations", "apply", 5, 40, "To guarantee error $\\varepsilon$ via $\\frac{RG}{\\sqrt{k}} \\le \\varepsilon$ with $RG = 1$, how many iterations for $\\varepsilon = 0.01$?"), 10000),
  mcq(m(SG, "apply-polyak-needs", "apply", 5, 40, "Polyak's step $\\alpha_k = \\frac{f(\\mathbf{x}_k) - f^{*}}{\\|\\mathbf{g}_k\\|^{2}}$ requires:"),
    "The optimal value $f^{*}$",
    [
      ["The minimiser $\\mathbf{x}^{*}$", "polyak-needs-x", "Only the value."],
      ["The Hessian", "polyak-needs-hessian", "It's first-order."],
      ["A Lipschitz gradient", "polyak-needs-lipschitz", "It works for nonsmooth $f$."],
    ]),
  num(m(SG, "apply-polyak", "apply", 5, 40, "Compute Polyak's step with $f(\\mathbf{x}_k) = 3$, $f^{*} = 1$ and $\\|\\mathbf{g}_k\\| = 2$."), 0.5),
  // level 6
  short(m(SG, "explain-max", "explain", 6, 120, "What is the subdifferential of $f(\\mathbf{x}) = \\max_i f_i(\\mathbf{x})$ for convex differentiable $f_i$?"),
    [
      ["active", "Only the active functions matter: those with $f_i(\\mathbf{x}) = f(\\mathbf{x})$", 2, true],
      ["hull", "$\\partial f(\\mathbf{x})$ is the convex hull of their gradients $\\nabla f_i(\\mathbf{x})$; any active gradient is a valid subgradient", 2, true],
    ]),
  num(m(SG, "apply-hull-length", "apply", 6, 45, "For $f(x) = \\max(1 - x, 2x - 2)$ at $x = 1$, both pieces are active, so $\\partial f(1) = [-1, 2]$. What is the length of that interval?"), 3),
  num(m(SG, "apply-support-bound", "apply", 6, 45, "Using the subgradient $g = 0.5$ of $|x|$ at $0$, what lower bound $0 + g(y - 0)$ does it give at $y = -2$?"), -1),
  mcq(m(SG, "apply-projected", "apply", 6, 45, "To handle a convex constraint set $C$, the projected subgradient method:"),
    "Takes a subgradient step, then projects the result back onto $C$",
    [
      ["Ignores the constraint", "projected-ignore", "Iterates would leave $C$."],
      ["Uses Lagrange multipliers only", "projected-multipliers", "That's a different approach."],
      ["Restarts when infeasible", "projected-restart", "Projection fixes infeasibility each step."],
    ]),
  // level 7
  num(m(SG, "transfer-diminishing", "transfer", 7, 60, "Run the subgradient method on $|x|$ from $x_0 = 1.5$ with $\\alpha_k = \\frac{1}{k}$ ($k = 1, 2, \\ldots$). What is $x_2$?"), 0),
  short(m(SG, "transfer-best", "transfer", 7, 120, "Why does the subgradient method report the best iterate rather than the last?"),
    [
      ["increase", "Steps can increase $f$, so the last iterate may be worse than earlier ones", 2, true],
      ["bound", "The convergence theory bounds $f_{\\text{best}}^{(k)} - f^{*}$ (or the average iterate), not the final iterate's value", 2, true],
    ]),
  num(m(SG, "transfer-step-sum", "transfer", 7, 60, "What is $\\sum_{k=1}^{4}\\frac{1}{k}$? Give $4$ decimal places."), 2.0833),
  mcq(m(SG, "transfer-no-zeros", "transfer", 7, 60, "Running the subgradient method on the lasso typically:"),
    "Leaves coefficients small but nonzero, rather than exactly zero",
    [
      ["Produces exact zeros like proximal methods", "no-zeros-exact", "Subgradient steps rarely land exactly on $0$."],
      ["Makes every coefficient zero", "no-zeros-all", "Only with huge $\\lambda$."],
      ["Fails to run", "no-zeros-fail", "It runs, just slowly."],
    ]),
  // level 8
  short(m(SG, "transfer-dual-decomposition", "transfer", 8, 120, "Why are subgradient methods used in dual decomposition?"),
    [
      ["nonsmooth", "The dual function is often nondifferentiable (when the Lagrangian minimiser isn't unique), but the constraint violation at the minimiser is a subgradient", 2, true],
      ["parallel", "Each block solves its own subproblem in parallel, and the multipliers are updated by a subgradient step on the dual", 2, true],
    ]),
  num(m(SG, "transfer-digit-cost", "transfer", 8, 60, "Because iterations scale like $\\frac{1}{\\varepsilon^{2}}$, by what factor does the work grow when $\\varepsilon$ goes from $10^{-2}$ to $10^{-3}$?"), 100),
  mcq(m(SG, "transfer-when", "transfer", 8, 60, "When is the plain subgradient method a reasonable choice?"),
    "For very large nonsmooth convex problems with no cheap proximal operator, where low accuracy suffices",
    [
      ["When high accuracy is needed quickly", "when-accuracy", "It converges slowly."],
      ["For smooth strongly convex problems", "when-smooth", "Gradient methods are far better there."],
      ["For small LPs", "when-lp", "Simplex or interior points are better."],
    ]),
  num(m(SG, "transfer-svm", "transfer", 8, 60, "For the hinge loss $\\max(0, 1 - y\\,wx)$ with $y = 1$, $x = 2$ and margin $ywx = 0.5$, what is the subgradient with respect to $w$, $-yx$?"), -2),
  // level 9
  short(m(SG, "transfer-lower-bound", "transfer", 9, 150, "Is the $O\\!\\left(\\frac{1}{\\sqrt{k}}\\right)$ rate a weakness of the method or of the problem class?"),
    [
      ["class", "Of the class: for general Lipschitz convex functions, any method using only subgradients needs $\\Omega\\!\\left(\\frac{1}{\\sqrt{k}}\\right)$ error in the worst case (in high dimensions)", 2, true],
      ["escape", "Faster rates need more structure, such as smoothness, strong convexity, or a cheap proximal operator", 2, true],
    ]),
  num(m(SG, "transfer-fixed-step", "transfer", 9, 75, "The best fixed step for horizon $k$ is $\\alpha = \\frac{R}{G\\sqrt{k}}$. What is it for $R = 10$, $G = 5$ and $k = 100$?"), 0.2),
  mcq(m(SG, "transfer-smoothing", "transfer", 9, 75, "Nesterov smoothing improves on the subgradient method by:"),
    "Replacing the nonsmooth $f$ with a smooth approximation and applying an accelerated method, giving $O\\!\\left(\\frac{1}{k}\\right)$",
    [
      ["Using exact line searches", "smoothing-linesearch", "That doesn't fix nonsmoothness."],
      ["Adding noise", "smoothing-noise", "That's randomised smoothing, a different idea."],
      ["Using second derivatives", "smoothing-second", "It stays first-order."],
    ]),
  num(m(SG, "transfer-polyak-estimate", "transfer", 9, 75, "Polyak's step uses $f^{*}$; if only a lower bound $\\hat{f} = 0.5$ is known, with $f(\\mathbf{x}_k) = 2.5$ and $\\|\\mathbf{g}_k\\|^{2} = 4$, what step results?"), 0.5),
  // level 10
  short(m(SG, "transfer-robustness", "transfer", 10, 180, "Despite its slow rate, the subgradient method has practical strengths. Name two."),
    [
      ["simple", "Each step is just a subgradient evaluation and a vector update, so it scales to huge problems and needs very little memory", 2, true],
      ["robust", "It applies to any convex Lipschitz function, tolerates noisy (stochastic) subgradients, and parallelises naturally in decomposition schemes", 2, true],
    ]),
  mcq(m(SG, "transfer-stochastic", "transfer", 10, 90, "Stochastic gradient descent on a nonsmooth convex loss (like SVM hinge loss) is analysed as:"),
    "A stochastic subgradient method, with $O\\!\\left(\\frac{1}{\\sqrt{k}}\\right)$ rates (or $O\\!\\left(\\frac{1}{k}\\right)$ with strong convexity)",
    [
      ["Newton's method", "stochastic-newton", "No second-order information is used."],
      ["An exact proximal method", "stochastic-prox", "Plain SGD takes subgradient steps."],
      ["A linear program", "stochastic-lp", "Unrelated."],
    ]),
  short(m(SG, "transfer-vs-prox", "transfer", 10, 180, "For minimising a least-squares loss plus $\\lambda\\|\\mathbf{x}\\|_1$, why prefer proximal gradient over the subgradient method?"),
    [
      ["structure", "The objective is smooth plus a simple nonsmooth term whose prox (soft-thresholding) is cheap", 2, true],
      ["benefit", "Proximal gradient exploits that to get $O\\!\\left(\\frac{1}{k}\\right)$ (or $O\\!\\left(\\frac{1}{k^{2}}\\right)$ with FISTA) instead of $O\\!\\left(\\frac{1}{\\sqrt{k}}\\right)$, and produces exact zeros", 2, true],
    ]),
  num(m(SG, "transfer-bound-value", "transfer", 10, 90, "Evaluate $\\frac{RG}{\\sqrt{k}}$ for $R = 2$, $G = 3$ and $k = 10{,}000$."), 0.06),
];

export const opt03Items: Item[] = [...momentum, ...conjugate, ...coordinate, ...subgradient];
