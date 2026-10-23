import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./opt-shared";

/**
 * Optimization course, part 6: barrier and interior-point methods, penalty and
 * augmented Lagrangian methods, and ADMM. Forty questions per lesson, four at
 * each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// interior-point-methods
// ---------------------------------------------------------------------------
const IP = "interior-point-methods";
const interior: Item[] = [
  // level 1
  mcq(m(IP, "recall-barrier", "recall", 1, 15, "For constraints $f_i(\\mathbf{x}) \\le 0$, the logarithmic barrier is:"),
    "$\\phi(\\mathbf{x}) = -\\sum_i\\ln(-f_i(\\mathbf{x}))$",
    [
      ["$\\sum_i f_i(\\mathbf{x})^{2}$", "barrier-quadratic", "That's a quadratic penalty."],
      ["$\\sum_i\\ln f_i(\\mathbf{x})$", "barrier-sign", "$f_i \\le 0$, so its logarithm is undefined."],
      ["$\\max_i f_i(\\mathbf{x})$", "barrier-max", "That's not a barrier."],
    ]),
  mcq(m(IP, "recall-interior", "recall", 1, 15, "Barrier method iterates are always:"),
    "Strictly feasible — inside the feasible region, never on its boundary",
    [
      ["On the boundary", "interior-boundary", "The barrier is infinite there."],
      ["Infeasible until the last step", "interior-infeasible", "That's some penalty methods."],
      ["At vertices", "interior-vertices", "That's the simplex method."],
    ]),
  mcq(m(IP, "recall-central-path", "recall", 1, 15, "The central path is:"),
    "The curve of barrier-problem minimisers $\\mathbf{x}^{*}(t)$ as $t$ increases",
    [
      ["The line between two vertices", "central-edge", "That's a simplex move."],
      ["The path of gradient descent", "central-gd", "It's defined by barrier minimisers."],
      ["The boundary of the feasible set", "central-boundary", "It runs through the interior."],
    ]),
  mcq(m(IP, "recall-t", "recall", 1, 15, "In $\\min tf_0(\\mathbf{x}) + \\phi(\\mathbf{x})$, increasing $t$:"),
    "Gives less weight to the barrier, so minimisers approach the true optimum",
    [
      ["Gives more weight to the barrier", "t-more", "Larger $t$ emphasises the objective."],
      ["Makes iterates infeasible", "t-infeasible", "They stay interior."],
      ["Has no effect", "t-none", "It moves along the central path."],
    ]),
  // level 2
  num(m(IP, "apply-barrier-value", "apply", 2, 20, "For the constraint $x - 1 \\le 0$, what is the barrier term $-\\ln(1 - x)$ at $x = 0$?"), 0),
  num(m(IP, "apply-gap", "apply", 2, 20, "On the central path the duality gap is $\\frac{m}{t}$. What is it for $m = 10$ and $t = 100$?"), 0.1),
  num(m(IP, "apply-central-point", "apply", 2, 20, "For $\\min x$ s.t. $x \\ge 1$, the central path is $x^{*}(t) = 1 + \\frac{1}{t}$. What is $x^{*}(10)$?"), 1.1),
  mcq(m(IP, "apply-boundary", "apply", 2, 20, "As $\\mathbf{x}$ approaches the boundary where some $f_i(\\mathbf{x}) \\to 0$, the barrier $\\phi(\\mathbf{x})$:"),
    "Tends to $+\\infty$",
    [
      ["Tends to $0$", "boundary-zero", "$-\\ln$ of a small number is large."],
      ["Tends to $-\\infty$", "boundary-negative", "It blows up positively."],
      ["Stays bounded", "boundary-bounded", "That's what makes it a barrier."],
    ]),
  // level 3
  num(m(IP, "apply-barrier-derivative", "apply", 3, 25, "What is the derivative of $-\\ln(x - 1)$ at $x = 1.5$?"), -2),
  num(m(IP, "apply-t-needed", "apply", 3, 25, "With $m = 50$ constraints, what $t$ makes the gap $\\frac{m}{t}$ equal to $10^{-3}$?"), 50000),
  num(m(IP, "apply-outer", "apply", 3, 25, "The barrier method needs $\\frac{\\ln(m/(t_0\\varepsilon))}{\\ln\\mu}$ outer iterations. With $m = 1$, $t_0 = 1$, $\\varepsilon = 10^{-6}$ and $\\mu = 10$, how many?"), 6),
  mcq(m(IP, "apply-phase-one", "apply", 3, 25, "Phase I of a barrier method:"),
    "Finds a strictly feasible starting point (or shows none exists)",
    [
      ["Computes the optimum", "phase-one-optimum", "That's Phase II."],
      ["Chooses $\\mu$", "phase-one-mu", "It's about feasibility."],
      ["Removes constraints", "phase-one-remove", "Constraints stay."],
    ]),
  // level 4
  num(m(IP, "apply-dual-estimate", "apply", 4, 30, "A central point gives dual multipliers $\\mu_i = -\\frac{1}{tf_i(\\mathbf{x})}$. What is $\\mu_i$ for $t = 10$ and $f_i(\\mathbf{x}) = -0.5$?"), 0.2),
  num(m(IP, "apply-box-central", "apply", 4, 30, "For $\\min x$ s.t. $0 \\le x \\le 2$, the barrier problem at $t = 1$ is $\\min x - \\ln x - \\ln(2 - x)$. What is its minimiser? Give $4$ decimal places."), 0.5858),
  num(m(IP, "apply-box-gap", "apply", 4, 30, "What duality gap bound $\\frac{m}{t}$ applies there ($2$ constraints, $t = 1$)?"), 2),
  mcq(m(IP, "apply-centering", "apply", 4, 30, "Why does each centering step need only a few Newton iterations?"),
    "It is warm-started from the previous central point, which is close to the new one",
    [
      ["The barrier problem is linear", "centering-linear", "It's non-linear."],
      ["Newton converges in one step on any function", "centering-one", "Only on quadratics."],
      ["$t$ never changes", "centering-t", "It increases each outer iteration."],
    ]),
  // level 5
  short(m(IP, "explain-log", "explain", 5, 90, "Why use a logarithmic barrier rather than, say, $\\sum\\frac{1}{-f_i}$?"),
    [
      ["self-concordant", "The log barrier is self-concordant, so Newton's method on it has scale-free iteration bounds", 2, true],
      ["dual", "Its gradient gives dual feasible multipliers $\\mu_i = -\\frac{1}{tf_i}$ and an exact duality gap $\\frac{m}{t}$, a clean stopping rule", 2, true],
    ]),
  mcq(m(IP, "apply-self-concordance", "apply", 5, 40, "Self-concordance bounds:"),
    "The third derivative of a function by its second derivative ($|f'''| \\le 2f''^{3/2}$)",
    [
      ["The function value", "self-value", "It concerns derivatives."],
      ["The gradient by the function", "self-gradient", "It's third versus second derivative."],
      ["Nothing — it's a naming convention", "self-nothing", "It's a precise condition."],
    ]),
  num(m(IP, "apply-sqrt-m", "apply", 5, 40, "Worst-case interior-point bounds scale like $\\sqrt{m}$. What is $\\sqrt{m}$ for $m = 10{,}000$?"), 100),
  mcq(m(IP, "apply-primal-dual", "apply", 5, 40, "Primal–dual interior-point methods apply Newton's method to the KKT conditions with complementary slackness replaced by:"),
    "$\\mu_if_i(\\mathbf{x}) = -\\frac{1}{t}$",
    [
      ["$\\mu_if_i(\\mathbf{x}) = 0$ exactly", "pd-exact", "That's the unrelaxed condition."],
      ["$\\mu_i = 1$", "pd-one", "Multipliers vary."],
      ["$f_i(\\mathbf{x}) = 0$ for all $i$", "pd-active", "That forces all constraints active."],
    ]),
  // level 6
  short(m(IP, "explain-vs-simplex", "explain", 6, 120, "Contrast interior-point methods with the simplex method for linear programming."),
    [
      ["path", "Simplex walks along edges between vertices; interior-point methods follow the central path through the interior", 2, true],
      ["tradeoffs", "Interior point has polynomial worst-case complexity and few (expensive) iterations nearly independent of size; simplex can be exponential in theory but warm-starts well", 2, true],
    ]),
  num(m(IP, "apply-t-final", "apply", 6, 45, "With $m = 100$ constraints, what $t$ gives a duality gap of $10^{-6}$?"), 100000000),
  mcq(m(IP, "apply-mehrotra", "apply", 6, 45, "Mehrotra's predictor–corrector technique:"),
    "Takes an affine-scaling predictor step to choose the centering parameter, then a corrector step, sharply cutting iteration counts",
    [
      ["Removes the need for Newton steps", "mehrotra-newton", "It's built on Newton steps."],
      ["Is a simplex pivoting rule", "mehrotra-simplex", "It's for interior-point methods."],
      ["Increases $t$ by $1$ each step", "mehrotra-increment", "It adapts the centering."],
    ]),
  num(m(IP, "apply-mu-2", "apply", 6, 45, "To cut the gap by a factor $10^{6}$ with update factor $\\mu = 2$, how many outer iterations are needed (round up)?"), 20),
  // level 7
  num(m(IP, "transfer-gap-1000", "transfer", 7, 60, "For $\\min x$ s.t. $x \\ge 1$, what is $x^{*}(t) - 1$ at $t = 1{,}000$?"), 0.001),
  short(m(IP, "transfer-warm-start", "transfer", 7, 120, "Why do interior-point methods warm-start poorly?"),
    [
      ["boundary", "A previous solution sits near the boundary, where the barrier is huge and the central path is badly conditioned", 2, true],
      ["consequence", "Starting there gives tiny or poor Newton steps; moving back toward the centre wastes much of the advantage, unlike simplex restarts from an optimal basis", 2, true],
    ]),
  num(m(IP, "transfer-kkt-size", "transfer", 7, 60, "A problem has $1{,}000$ variables and $500$ equality constraints. What is the dimension of the reduced KKT system (variables plus equality multipliers)?"), 1500),
  mcq(m(IP, "transfer-sdp", "transfer", 7, 60, "Semidefinite programs are typically solved by:"),
    "Interior-point methods, using the barrier $-\\ln\\det X$",
    [
      ["The simplex method", "sdp-simplex", "SDPs have no finite vertex structure."],
      ["Bisection", "sdp-bisection", "Not applicable."],
      ["Plain gradient descent", "sdp-gd", "Possible for some, but IPMs are standard."],
    ]),
  // level 8
  short(m(IP, "transfer-homotopy", "transfer", 8, 120, "Explain the barrier method as a homotopy (continuation) method."),
    [
      ["family", "It defines a family of smooth problems indexed by $t$ whose solutions trace the central path from an interior point to the optimum", 2, true],
      ["follow", "It follows that path by gradually increasing $t$ and re-solving with Newton from the previous solution, never solving the hard constrained problem directly", 2, true],
    ]),
  num(m(IP, "transfer-box-barrier", "transfer", 8, 60, "What is the barrier $-\\ln x - \\ln(1 - x)$ for $0 \\le x \\le 1$ at $x = 0.5$? Give $4$ decimal places."), 1.3863),
  mcq(m(IP, "transfer-infeasible-start", "transfer", 8, 60, "Infeasible-start primal–dual methods:"),
    "Allow iterates that don't yet satisfy equality constraints, driving the residuals to zero along the way",
    [
      ["Require a strictly feasible start", "infeasible-strict", "That's the basic barrier method."],
      ["Never converge", "infeasible-never", "They're the practical standard."],
      ["Ignore equality constraints", "infeasible-ignore", "They drive their residuals to zero."],
    ]),
  num(m(IP, "transfer-quadratic-central", "transfer", 8, 60, "For $\\min x^{2}$ s.t. $x \\ge 1$, the barrier problem $\\min tx^{2} - \\ln(x - 1)$ at $t = 1$ has minimiser solving $2x(x - 1) = 1$. What is it? Give $4$ decimal places."), 1.366),
  // level 9
  short(m(IP, "transfer-sparse", "transfer", 9, 150, "What dominates the cost of an interior-point iteration, and how do solvers keep it manageable?"),
    [
      ["cost", "Solving the Newton (KKT) linear system, e.g. forming and factorising $AD A^{\\top}$ for LP", 2, true],
      ["manage", "Exploit sparsity with sparse Cholesky and good orderings, or use iterative solvers with preconditioners; the system's structure barely changes between iterations", 2, true],
    ]),
  num(m(IP, "transfer-dense-cost", "transfer", 9, 75, "Factorising a dense $10^{4} \\times 10^{4}$ system costs about $\\frac{n^{3}}{3}$ flops. How many billion? Give $1$ decimal place."), 333.3),
  mcq(m(IP, "transfer-hsde", "transfer", 9, 75, "The homogeneous self-dual embedding lets an interior-point solver:"),
    "Start anywhere and either find an optimal solution or a certificate of infeasibility",
    [
      ["Skip Newton steps", "hsde-newton", "It still uses Newton steps."],
      ["Solve non-convex problems globally", "hsde-nonconvex", "It's for convex conic problems."],
      ["Avoid the barrier", "hsde-barrier", "It's an interior-point framework."],
    ]),
  num(m(IP, "transfer-iterations", "transfer", 9, 75, "A worst-case bound is $\\sqrt{m}\\ln\\frac{1}{\\varepsilon}$ Newton steps. For $m = 100$ and $\\varepsilon = 10^{-8}$, round to the nearest whole number."), 184),
  // level 10
  short(m(IP, "transfer-vs-admm", "transfer", 10, 180, "When would you use ADMM instead of an interior-point method?"),
    [
      ["scale", "When the problem is so large that even one KKT factorisation is too expensive or memory-hungry", 2, true],
      ["accuracy", "When modest accuracy is enough, the problem splits into simple pieces (prox steps, parallel blocks), or warm starts across many similar problems matter", 2, true],
    ]),
  mcq(m(IP, "transfer-ipopt", "transfer", 10, 90, "IPOPT applies interior-point ideas to:"),
    "General nonlinear (possibly non-convex) programs, finding local solutions",
    [
      ["Only linear programs", "ipopt-lp", "It handles nonlinear problems."],
      ["Integer programs", "ipopt-integer", "It's continuous."],
      ["Unconstrained problems only", "ipopt-unconstrained", "It handles constraints."],
    ]),
  short(m(IP, "transfer-ill-conditioning", "transfer", 10, 180, "As $t \\to \\infty$, the barrier Hessian becomes badly conditioned. Why doesn't this ruin interior-point methods in practice?"),
    [
      ["why-ill", "Near the boundary, terms like $\\frac{1}{f_i^{2}}$ blow up for active constraints while others stay small, so the Hessian's eigenvalues spread", 2, true],
      ["benign", "The ill-conditioning is structured: Newton directions remain accurate when computed with careful (e.g. Cholesky with appropriate pivoting) solves, and primal–dual formulations keep it benign", 2, true],
    ]),
  num(m(IP, "transfer-mu-choice", "transfer", 10, 90, "What update factor $\\mu$ cuts the gap by $10^{8}$ in exactly $4$ outer iterations?"), 100),
];

// ---------------------------------------------------------------------------
// augmented-lagrangian-method
// ---------------------------------------------------------------------------
const AL = "augmented-lagrangian-method";
const augmented: Item[] = [
  // level 1
  mcq(m(AL, "recall-penalty", "recall", 1, 15, "The quadratic penalty method for $h(\\mathbf{x}) = \\mathbf{0}$ minimises:"),
    "$f(\\mathbf{x}) + \\frac{\\rho}{2}\\|h(\\mathbf{x})\\|^{2}$ for increasing $\\rho$",
    [
      ["$f(\\mathbf{x}) - \\rho\\ln h(\\mathbf{x})$", "penalty-barrier", "That's a barrier."],
      ["$f(\\mathbf{x})$ alone", "penalty-none", "The constraint must enter."],
      ["$\\|h(\\mathbf{x})\\|^{2}$ alone", "penalty-h-only", "The objective must enter."],
    ]),
  mcq(m(AL, "recall-augmented", "recall", 1, 15, "The augmented Lagrangian is:"),
    "The ordinary Lagrangian plus a quadratic penalty, $f + \\boldsymbol{\\lambda}^{\\top}h + \\frac{\\rho}{2}\\|h\\|^{2}$",
    [
      ["The Lagrangian with $\\boldsymbol{\\lambda} = 0$", "augmented-zero", "That's the pure penalty."],
      ["A log barrier", "augmented-barrier", "That's for interior-point methods."],
      ["The dual function", "augmented-dual", "The dual is a minimum over $\\mathbf{x}$."],
    ]),
  mcq(m(AL, "recall-update", "recall", 1, 15, "The method of multipliers updates the multiplier by:"),
    "$\\boldsymbol{\\lambda} \\leftarrow \\boldsymbol{\\lambda} + \\rho h(\\mathbf{x})$",
    [
      ["$\\boldsymbol{\\lambda} \\leftarrow \\rho\\boldsymbol{\\lambda}$", "update-scale", "It adds the scaled violation."],
      ["$\\boldsymbol{\\lambda} \\leftarrow \\boldsymbol{\\lambda} - \\nabla f$", "update-gradient", "It uses the constraint violation."],
      ["$\\boldsymbol{\\lambda} \\leftarrow 0$", "update-zero", "It accumulates information."],
    ]),
  mcq(m(AL, "recall-name", "recall", 1, 15, "The augmented Lagrangian method is also called:"),
    "The method of multipliers",
    [
      ["The simplex method", "name-simplex", "That's for LPs."],
      ["The barrier method", "name-barrier", "That's interior-point."],
      ["Gradient descent", "name-gd", "Not this."],
    ]),
  // level 2
  num(m(AL, "apply-penalty-2", "apply", 2, 20, "For $\\min x^{2}$ s.t. $x = 1$, the penalty minimiser is $x(\\rho) = \\frac{\\rho}{2 + \\rho}$. What is $x(2)$?"), 0.5),
  num(m(AL, "apply-penalty-18", "apply", 2, 20, "What is $x(18)$?"), 0.9),
  num(m(AL, "apply-violation", "apply", 2, 20, "The constraint violation is $\\frac{2}{2 + \\rho}$. What is it for $\\rho = 98$?"), 0.02),
  mcq(m(AL, "apply-limit", "apply", 2, 20, "The quadratic penalty method satisfies the constraint exactly only:"),
    "In the limit $\\rho \\to \\infty$",
    [
      ["At $\\rho = 1$", "limit-one", "The violation is still positive."],
      ["Never, even in the limit", "limit-never", "The violation vanishes as $\\rho \\to \\infty$."],
      ["Immediately for any $\\rho$", "limit-immediate", "That's what the augmented Lagrangian fixes."],
    ]),
  // level 3
  num(m(AL, "apply-al-x1", "apply", 3, 25, "For $\\min x^{2}$ s.t. $x = 1$ with $\\rho = 2$, the AL minimiser is $x = \\frac{2 - \\lambda}{4}$. With $\\lambda_0 = 0$, what is $x_1$?"), 0.5),
  num(m(AL, "apply-al-lambda1", "apply", 3, 25, "Then $\\lambda_1 = \\lambda_0 + \\rho(x_1 - 1)$. What is it?"), -1),
  num(m(AL, "apply-al-x2", "apply", 3, 25, "What is $x_2$?"), 0.75),
  num(m(AL, "apply-lambda-star", "apply", 3, 25, "What multiplier $\\lambda^{*}$ does the method converge to? (Stationarity: $2x + \\lambda = 0$ at $x = 1$.)"), -2),
  // level 4
  num(m(AL, "apply-al-lambda2", "apply", 4, 30, "Continuing, what is $\\lambda_2 = \\lambda_1 + \\rho(x_2 - 1)$?"), -1.5),
  num(m(AL, "apply-exact", "apply", 4, 30, "If $\\lambda = \\lambda^{*} = -2$ is used with $\\rho = 2$, what does the AL minimiser $x = \\frac{2 - \\lambda}{4}$ give?"), 1),
  num(m(AL, "apply-hessian", "apply", 4, 30, "The penalty function $x^{2} + \\frac{\\rho}{2}(x - 1)^{2}$ has second derivative $2 + \\rho$. What is it for $\\rho = 1{,}000$?"), 1002),
  mcq(m(AL, "apply-exact-penalty", "apply", 4, 30, "The exact penalty $f + \\rho\\|h\\|_1$ recovers the constrained solution for finite $\\rho$, but:"),
    "It is nonsmooth, so smooth unconstrained solvers struggle with it",
    [
      ["It needs $\\rho = \\infty$", "exact-infinite", "A finite $\\rho$ above a threshold suffices."],
      ["It has no minimiser", "exact-none", "It does."],
      ["It changes the solution", "exact-changes", "It preserves it for large enough $\\rho$."],
    ]),
  // level 5
  short(m(AL, "explain-update", "explain", 5, 90, "Why is $\\boldsymbol{\\lambda} + \\rho h(\\mathbf{x}_{k+1})$ the right multiplier update?"),
    [
      ["stationarity", "Minimising $\\mathcal{L}_\\rho$ gives $\\nabla f + (\\boldsymbol{\\lambda}_k + \\rho h)^{\\top}\\nabla h = \\mathbf{0}$ at $\\mathbf{x}_{k+1}$", 2, true],
      ["match", "This is exactly the Lagrange stationarity condition with multiplier $\\boldsymbol{\\lambda}_k + \\rho h(\\mathbf{x}_{k+1})$, so that's the natural new estimate; it's also a dual gradient-ascent step of size $\\rho$", 2, true],
    ]),
  mcq(m(AL, "apply-dual-ascent", "apply", 5, 40, "The multiplier update of the augmented Lagrangian method can be viewed as:"),
    "Gradient ascent on the dual of the augmented problem, with step size $\\rho$",
    [
      ["Gradient descent on $f$", "dual-ascent-primal", "It acts on the multipliers."],
      ["A Newton step", "dual-ascent-newton", "It's first-order in the dual."],
      ["A random update", "dual-ascent-random", "It's deterministic."],
    ]),
  num(m(AL, "apply-ratio", "apply", 5, 40, "The errors $1 - x_k$ go $0.5$, $0.25$, $0.125$. What is the ratio per iteration?"), 0.5),
  mcq(m(AL, "apply-inequality", "apply", 5, 40, "For an inequality $g(\\mathbf{x}) \\le 0$, a standard multiplier update is:"),
    "$\\mu \\leftarrow \\max(0, \\mu + \\rho g(\\mathbf{x}))$",
    [
      ["$\\mu \\leftarrow \\mu + \\rho g(\\mathbf{x})$ with no projection", "inequality-free", "The multiplier must stay nonnegative."],
      ["$\\mu \\leftarrow -\\mu$", "inequality-flip", "Not a valid update."],
      ["$\\mu \\leftarrow 0$ always", "inequality-zero", "It must track active constraints."],
    ]),
  // level 6
  short(m(AL, "explain-ill", "explain", 6, 120, "Why does a large penalty parameter make the quadratic penalty method hard to use?"),
    [
      ["eigenvalues", "The penalty Hessian gains eigenvalues of order $\\rho$ in directions normal to the constraints while others stay order $1$", 2, true],
      ["consequence", "The condition number grows like $\\rho$, so inner solvers slow down and lose accuracy exactly when the constraint is nearly enforced", 2, true],
    ]),
  num(m(AL, "apply-rho6", "apply", 6, 45, "With $\\rho = 6$, the AL minimiser for the same problem is $x = \\frac{\\rho - \\lambda}{2 + \\rho}$. From $\\lambda_0 = 0$: $x_1 = 0.75$ and $\\lambda_1 = -1.5$. What is $x_2$?"), 0.9375),
  num(m(AL, "apply-rho6-ratio", "apply", 6, 45, "Here the error shrinks by $\\frac{2}{2 + \\rho}$ per iteration. What is it for $\\rho = 6$?"), 0.25),
  mcq(m(AL, "apply-inexact", "apply", 6, 45, "In practice, the inner minimisation of $\\mathcal{L}_\\rho$:"),
    "Is solved only approximately, with tolerances tightened as the outer iterations converge",
    [
      ["Must be solved exactly", "inexact-exact", "That's wasteful early on."],
      ["Is skipped", "inexact-skipped", "Some minimisation is needed."],
      ["Uses the simplex method", "inexact-simplex", "Any suitable unconstrained solver works."],
    ]),
  // level 7
  num(m(AL, "transfer-ineq-update", "transfer", 7, 60, "An inequality multiplier $\\mu = 0.5$ is updated with $\\rho = 2$ and $g(\\mathbf{x}) = -1$. What is $\\max(0, \\mu + \\rho g)$?"), 0),
  short(m(AL, "transfer-vs-penalty", "transfer", 7, 120, "Contrast the augmented Lagrangian method with the pure quadratic penalty method."),
    [
      ["penalty", "Pure penalty needs $\\rho \\to \\infty$ to enforce constraints, causing ill-conditioning", 2, true],
      ["augmented", "The augmented Lagrangian converges to the exact solution with a fixed, moderate $\\rho$, because multiplier updates absorb the constraint force", 2, true],
    ]),
  num(m(AL, "transfer-rho-needed", "transfer", 7, 60, "For the pure penalty on $\\min x^{2}$ s.t. $x = 1$, what is the smallest $\\rho$ making the violation $\\frac{2}{2 + \\rho}$ at most $10^{-3}$?"), 1998),
  mcq(m(AL, "transfer-coupling", "transfer", 7, 60, "Compared with dual decomposition, the augmented Lagrangian's quadratic term:"),
    "Couples variables that appear in the same constraint, so the $\\mathbf{x}$-minimisation no longer splits into independent pieces",
    [
      ["Makes the problem separable", "coupling-separable", "It does the opposite."],
      ["Removes the constraint", "coupling-remove", "The constraint is still enforced."],
      ["Has no effect on structure", "coupling-none", "$\\|h(\\mathbf{x})\\|^{2}$ mixes variables."],
    ]),
  // level 8
  short(m(AL, "transfer-slack", "transfer", 8, 120, "How can inequality constraints be handled within the augmented Lagrangian framework?"),
    [
      ["slack", "Add slack variables, $g_i(\\mathbf{x}) + s_i = 0$ with $s_i \\ge 0$, and apply the equality-constrained method with simple bounds on $s$", 2, true],
      ["equivalent", "Eliminating the slacks gives the projected update $\\mu_i \\leftarrow \\max(0, \\mu_i + \\rho g_i)$ and a piecewise-quadratic penalty", 2, true],
    ]),
  num(m(AL, "transfer-2d-x1", "transfer", 8, 60, "Minimise $x^{2} + y^{2}$ s.t. $x + y = 2$ with $\\rho = 1$, $\\lambda_0 = 0$. By symmetry $x = y$, and the AL minimiser satisfies $4x - 2 + \\lambda = 0$. What is $x_1$?"), 0.5),
  num(m(AL, "transfer-2d-lambda1", "transfer", 8, 60, "Then $\\lambda_1 = \\lambda_0 + \\rho(x_1 + y_1 - 2)$. What is it?"), -1),
  mcq(m(AL, "transfer-lancelot", "transfer", 8, 60, "LANCELOT and the ALM components of modern NLP solvers are based on:"),
    "The augmented Lagrangian framework",
    [
      ["The simplex method", "lancelot-simplex", "Not this."],
      ["Pure barrier methods", "lancelot-barrier", "They use augmented Lagrangians."],
      ["Genetic algorithms", "lancelot-genetic", "They're deterministic optimisers."],
    ]),
  // level 9
  short(m(AL, "transfer-applications", "transfer", 9, 150, "Give an application where augmented Lagrangian methods are attractive and explain why."),
    [
      ["example", "E.g. PDE-constrained optimisation, trajectory optimisation, or training with hard constraints (fairness, physics)", 2, true],
      ["why", "They turn hard constraints into a sequence of unconstrained problems solvable by existing large-scale solvers, without the extreme ill-conditioning of pure penalties", 2, true],
    ]),
  num(m(AL, "transfer-2d-x2", "transfer", 9, 75, "Continuing that 2-D problem with $\\lambda_1 = -1$, what is $x_2$ from $4x - 2 + \\lambda = 0$?"), 0.75),
  mcq(m(AL, "transfer-rockafellar", "transfer", 9, 75, "Rockafellar showed the method of multipliers is equivalent to:"),
    "The proximal point method applied to the dual problem",
    [
      ["Newton's method on the primal", "rockafellar-newton", "It's a proximal method on the dual."],
      ["The simplex method", "rockafellar-simplex", "Unrelated."],
      ["Bisection on $\\rho$", "rockafellar-bisection", "Unrelated."],
    ]),
  num(m(AL, "transfer-2d-lambda-star", "transfer", 9, 75, "What is $\\lambda^{*}$ for $\\min x^{2} + y^{2}$ s.t. $x + y = 2$, using $\\mathcal{L} = f + \\lambda(x + y - 2)$?"), -2),
  // level 10
  short(m(AL, "transfer-to-admm", "transfer", 10, 180, "Explain how ADMM arises from the augmented Lagrangian method."),
    [
      ["problem", "For $\\min f(\\mathbf{x}) + g(\\mathbf{z})$ s.t. $A\\mathbf{x} + B\\mathbf{z} = \\mathbf{c}$, the method of multipliers minimises $\\mathcal{L}_\\rho$ jointly over $(\\mathbf{x}, \\mathbf{z})$, which couples them", 2, true],
      ["admm", "ADMM replaces the joint minimisation with one pass of minimising over $\\mathbf{x}$ then $\\mathbf{z}$, keeping $f$ and $g$ separate, followed by the same multiplier update", 2, true],
    ]),
  mcq(m(AL, "transfer-nonconvex", "transfer", 10, 90, "For non-convex problems, the augmented Lagrangian method:"),
    "Converges locally to KKT points when $\\rho$ exceeds a threshold that makes the augmented Hessian positive definite near the solution",
    [
      ["Always finds the global optimum", "nonconvex-global", "Only local guarantees."],
      ["Cannot be applied", "nonconvex-cannot", "It's widely used for non-convex NLPs."],
      ["Needs $\\rho = 0$", "nonconvex-zero", "It needs $\\rho$ large enough."],
    ]),
  short(m(AL, "transfer-rho-strategy", "transfer", 10, 180, "How should $\\rho$ be chosen and updated in an augmented Lagrangian method?"),
    [
      ["start", "Start with a moderate $\\rho$ so inner problems are well conditioned", 2, true],
      ["update", "Increase $\\rho$ (e.g. by a factor of $10$) only when the constraint violation fails to fall by a sufficient fraction between outer iterations; otherwise keep it fixed", 2, true],
    ]),
  num(m(AL, "transfer-iterations", "transfer", 10, 90, "If the error halves every outer iteration starting from $1$, how many iterations bring it to $10^{-6}$ or below?"), 20),
];

// ---------------------------------------------------------------------------
// admm
// ---------------------------------------------------------------------------
const AD = "admm";
const admm: Item[] = [
  // level 1
  mcq(m(AD, "recall-form", "recall", 1, 15, "ADMM solves problems of the form:"),
    "$\\min f(\\mathbf{x}) + g(\\mathbf{z})$ subject to $A\\mathbf{x} + B\\mathbf{z} = \\mathbf{c}$",
    [
      ["$\\min f(\\mathbf{x})$ with no constraints", "form-unconstrained", "It needs a split structure."],
      ["Integer programs", "form-integer", "It's for continuous convex problems."],
      ["Only linear programs", "form-lp", "It's much more general."],
    ]),
  mcq(m(AD, "recall-steps", "recall", 1, 15, "Each ADMM iteration consists of:"),
    "An $\\mathbf{x}$-minimisation, a $\\mathbf{z}$-minimisation, then a dual (multiplier) update",
    [
      ["A joint minimisation over $(\\mathbf{x}, \\mathbf{z})$", "steps-joint", "That's the method of multipliers."],
      ["A Newton step on all variables", "steps-newton", "It alternates blocks."],
      ["Only a dual update", "steps-dual", "Primal blocks are minimised too."],
    ]),
  mcq(m(AD, "recall-scaled", "recall", 1, 15, "In scaled-form ADMM, the scaled dual variable is:"),
    "$\\mathbf{u} = \\frac{\\boldsymbol{\\lambda}}{\\rho}$",
    [
      ["$\\mathbf{u} = \\rho\\boldsymbol{\\lambda}$", "scaled-times", "It divides by $\\rho$."],
      ["$\\mathbf{u} = \\mathbf{x} - \\mathbf{z}$", "scaled-residual", "That's the residual for $\\mathbf{x} = \\mathbf{z}$ constraints."],
      ["$\\mathbf{u} = \\mathbf{0}$ always", "scaled-zero", "It's updated each iteration."],
    ]),
  mcq(m(AD, "recall-convergence", "recall", 1, 15, "For closed convex $f$ and $g$ (with a saddle point), ADMM converges for:"),
    "Any penalty parameter $\\rho > 0$",
    [
      ["Only $\\rho = 1$", "convergence-one", "Any positive $\\rho$ works, though speed varies."],
      ["Only very large $\\rho$", "convergence-large", "No threshold is needed."],
      ["No $\\rho$ — it needs Newton steps", "convergence-none", "It converges as a first-order method."],
    ]),
  // level 2
  num(m(AD, "apply-x1", "apply", 2, 20, "For $\\min\\frac{1}{2}(x - 3)^{2} + |z|$ s.t. $x = z$ with $\\rho = 1$, the $x$-update is $x = \\frac{3 + z - u}{2}$. From $z = u = 0$, what is $x_1$?"), 1.5),
  num(m(AD, "apply-z1", "apply", 2, 20, "The $z$-update is $z = S_1(x + u)$. What is $z_1$?"), 0.5),
  num(m(AD, "apply-u1", "apply", 2, 20, "The dual update is $u \\leftarrow u + x - z$. What is $u_1$?"), 1),
  mcq(m(AD, "apply-gauss-seidel", "apply", 2, 20, "ADMM differs from the method of multipliers by:"),
    "Minimising over $\\mathbf{x}$ and $\\mathbf{z}$ one after the other instead of jointly",
    [
      ["Using no multipliers", "gs-multipliers", "It keeps the multiplier update."],
      ["Using a barrier", "gs-barrier", "No barrier is involved."],
      ["Using second derivatives", "gs-second", "It's first-order in spirit."],
    ]),
  // level 3
  num(m(AD, "apply-x2", "apply", 3, 25, "Continuing with $z_1 = 0.5$ and $u_1 = 1$, what is $x_2$?"), 1.25),
  num(m(AD, "apply-z2", "apply", 3, 25, "What is $z_2 = S_1(x_2 + u_1)$?"), 1.25),
  num(m(AD, "apply-limit", "apply", 3, 25, "What value do $x$ and $z$ converge to?"), 2),
  num(m(AD, "apply-u-limit", "apply", 3, 25, "What value does $u$ converge to?"), 1),
  // level 4
  num(m(AD, "apply-primal-residual", "apply", 4, 30, "For the constraint $x = z$, the primal residual is $x - z$. What is it for $x = 1.8$ and $z = 1.7$?"), 0.1),
  num(m(AD, "apply-dual-residual", "apply", 4, 30, "The dual residual is $\\rho(z_k - z_{k-1})$ (here $A = I$, $B = -I$). What is it for $\\rho = 2$ and a change in $z$ of $0.05$?"), 0.1),
  num(m(AD, "apply-consensus-z", "apply", 4, 30, "In consensus ADMM, $z$ is the average of $x_i + u_i$. With $x = (1, 2, 6)$ and $u = \\mathbf{0}$, what is $z$?"), 3),
  mcq(m(AD, "apply-lasso-z", "apply", 4, 30, "In ADMM for the lasso ($\\boldsymbol{\\beta} = \\mathbf{z}$), the $\\mathbf{z}$-update is:"),
    "Elementwise soft-thresholding of $\\boldsymbol{\\beta} + \\mathbf{u}$ by $\\frac{\\lambda}{\\rho}$",
    [
      ["A ridge-regression solve", "lasso-z-ridge", "That's the $\\boldsymbol{\\beta}$-update."],
      ["A projection onto the simplex", "lasso-z-simplex", "That's for different constraints."],
      ["Newton's method", "lasso-z-newton", "It's closed-form."],
    ]),
  // level 5
  short(m(AD, "explain-decouple", "explain", 5, 90, "Why does ADMM decouple $f$ and $g$, and why is that useful?"),
    [
      ["decouple", "Each subproblem involves only one of $f$ or $g$ plus a simple quadratic term, because the other block is held fixed", 2, true],
      ["useful", "Each step can then use a specialised solver or closed form (a prox, a linear solve, a projection), even when $f + g$ together would be hard", 2, true],
    ]),
  mcq(m(AD, "apply-balancing", "apply", 5, 40, "Residual balancing adjusts $\\rho$ by:"),
    "Increasing it when the primal residual is much larger than the dual residual, and decreasing it in the opposite case",
    [
      ["Always increasing it", "balancing-increase", "It can go either way."],
      ["Setting it to the objective value", "balancing-objective", "Unrelated."],
      ["Fixing it at $1$", "balancing-fixed", "That's no adaptation."],
    ]),
  num(m(AD, "apply-x3", "apply", 5, 40, "Continuing the scalar example with $z_2 = 1.25$ and $u_2 = 1$, what is $x_3$?"), 1.625),
  mcq(m(AD, "apply-lasso-x", "apply", 5, 40, "In lasso ADMM, the $\\boldsymbol{\\beta}$-update solves a system with matrix $X^{\\top}X + \\rho I$. Why is this cheap across iterations?"),
    "The matrix never changes, so it can be factorised once and reused",
    [
      ["It's always diagonal", "lasso-x-diagonal", "$X^{\\top}X$ is usually dense."],
      ["It doesn't need solving", "lasso-x-none", "It does, but the factorisation is cached."],
      ["$\\rho$ changes each iteration", "lasso-x-rho", "With fixed $\\rho$ the matrix is fixed."],
    ]),
  // level 6
  short(m(AD, "explain-consensus", "explain", 6, 120, "How does consensus ADMM fit a model on data split across several machines?"),
    [
      ["local", "Each machine minimises its own loss plus a proximity term to the current consensus $\\mathbf{z}$, in parallel, using only its local data", 2, true],
      ["global", "The coordinator averages the local solutions (plus duals) into a new $\\mathbf{z}$, and each machine updates its dual; only parameter vectors are communicated, never raw data", 2, true],
    ]),
  num(m(AD, "apply-factor-saving", "apply", 6, 45, "Factorising $X^{\\top}X + \\rho I$ once instead of in each of $100$ iterations saves how many factorisations?"), 99),
  num(m(AD, "apply-rho-update", "apply", 6, 45, "With residual balancing, $\\|\\mathbf{r}\\| = 10$ greatly exceeds $\\|\\mathbf{s}\\| = 0.5$, so $\\rho$ is doubled. If $\\rho = 1$, what is the new $\\rho$?"), 2),
  mcq(m(AD, "apply-douglas-rachford", "apply", 6, 45, "ADMM is equivalent to:"),
    "Douglas–Rachford splitting applied to the dual problem",
    [
      ["The simplex method", "dr-simplex", "Unrelated."],
      ["Newton's method", "dr-newton", "It's a splitting method."],
      ["Gradient descent on the primal", "dr-gd", "It's a dual splitting scheme."],
    ]),
  // level 7
  num(m(AD, "transfer-x4", "transfer", 7, 60, "Continuing the scalar example ($z_3 = 1.625$, $u_3 = 1$), what is $x_4$?"), 1.8125),
  short(m(AD, "transfer-stopping", "transfer", 7, 120, "What stopping criteria does ADMM use, and why two residuals?"),
    [
      ["residuals", "Stop when both the primal residual $\\|A\\mathbf{x} + B\\mathbf{z} - \\mathbf{c}\\|$ and the dual residual $\\|\\rho A^{\\top}B(\\mathbf{z}_k - \\mathbf{z}_{k-1})\\|$ are below tolerances", 2, true],
      ["why", "The primal residual measures feasibility and the dual residual measures stationarity (dual feasibility); both are needed for near-optimality", 2, true],
    ]),
  num(m(AD, "transfer-error", "transfer", 7, 60, "In the scalar example the error $2 - x_k$ halves each iteration after the first steps. If it is $0.375$, what is it one iteration later?"), 0.1875),
  mcq(m(AD, "transfer-multiblock", "transfer", 7, 60, "Directly extending ADMM to three or more blocks:"),
    "Can diverge even on convex problems unless the method is modified",
    [
      ["Always converges", "multiblock-always", "A known counterexample shows divergence."],
      ["Is impossible to write down", "multiblock-impossible", "It's easy to write, just not guaranteed."],
      ["Converges faster than two blocks", "multiblock-faster", "No guarantee at all."],
    ]),
  // level 8
  short(m(AD, "transfer-tv", "transfer", 8, 120, "How would you use ADMM for total-variation denoising, $\\min\\frac{1}{2}\\|\\mathbf{x} - \\mathbf{y}\\|^{2} + \\lambda\\|D\\mathbf{x}\\|_1$?"),
    [
      ["split", "Introduce $\\mathbf{z} = D\\mathbf{x}$, so $g(\\mathbf{z}) = \\lambda\\|\\mathbf{z}\\|_1$ and the constraint is $D\\mathbf{x} - \\mathbf{z} = \\mathbf{0}$", 2, true],
      ["steps", "The $\\mathbf{x}$-step solves $(I + \\rho D^{\\top}D)\\mathbf{x} = \\mathbf{y} + \\rho D^{\\top}(\\mathbf{z} - \\mathbf{u})$ (a sparse or FFT-diagonalisable system) and the $\\mathbf{z}$-step is soft-thresholding", 2, true],
    ]),
  num(m(AD, "transfer-copies", "transfer", 8, 60, "Consensus ADMM with $10$ workers, each holding a copy of an $n = 1{,}000$-dimensional parameter vector. How many local parameters in total?"), 10000),
  mcq(m(AD, "transfer-over-relaxation", "transfer", 8, 60, "Over-relaxed ADMM replaces $A\\mathbf{x}_{k+1}$ with $\\alpha A\\mathbf{x}_{k+1} - (1 - \\alpha)(B\\mathbf{z}_k - \\mathbf{c})$. Typical $\\alpha$ values are:"),
    "Between about $1.5$ and $1.8$, often speeding convergence",
    [
      ["Between $0$ and $0.5$", "over-small", "That's under-relaxation."],
      ["Exactly $1$ always", "over-one", "$\\alpha = 1$ is plain ADMM."],
      ["Above $3$", "over-large", "Convergence needs $\\alpha < 2$."],
    ]),
  num(m(AD, "transfer-unscale", "transfer", 8, 60, "If the unscaled multiplier is $\\lambda = 3$ and $\\rho = 1.5$, what is the scaled dual $u = \\frac{\\lambda}{\\rho}$?"), 2),
  // level 9
  short(m(AD, "transfer-accuracy", "transfer", 9, 150, "Describe ADMM's typical convergence behaviour and why it suits statistics and machine learning."),
    [
      ["behaviour", "It reaches modest accuracy within tens of iterations but then converges slowly ($O\\!\\left(\\frac{1}{k}\\right)$ in general), so high accuracy is expensive", 2, true],
      ["suit", "In estimation, statistical error dominates optimisation error well before high accuracy, so moderate accuracy plus cheap, parallel iterations is ideal", 2, true],
    ]),
  mcq(m(AD, "transfer-nonconvex", "transfer", 9, 75, "ADMM applied to non-convex problems (e.g. sparse coding or rank constraints):"),
    "Often works well as a heuristic, but without general convergence guarantees",
    [
      ["Always finds the global optimum", "nonconvex-global", "No guarantees."],
      ["Never converges", "nonconvex-never", "It frequently works in practice."],
      ["Becomes Newton's method", "nonconvex-newton", "It stays a splitting method."],
    ]),
  num(m(AD, "transfer-halvings", "transfer", 9, 75, "If the error halves every iteration, how many iterations reduce it by a factor of at least $1{,}000$?"), 10),
  short(m(AD, "transfer-rho-choice", "transfer", 9, 150, "How does $\\rho$ affect ADMM, and how would you pick it?"),
    [
      ["effect", "Large $\\rho$ enforces the constraint strongly (small primal residual) but slows progress on the objective (large dual residual); small $\\rho$ does the reverse", 2, true],
      ["pick", "Scale the problem sensibly, start near $\\rho = 1$ (or a problem-based estimate), and use residual balancing to adapt it", 2, true],
    ]),
  // level 10
  short(m(AD, "transfer-constraints", "transfer", 10, 180, "How can ADMM handle a constraint $\\mathbf{x} \\in C$ for a convex set $C$ with an easy projection?"),
    [
      ["indicator", "Write the problem as $\\min f(\\mathbf{x}) + I_C(\\mathbf{z})$ s.t. $\\mathbf{x} = \\mathbf{z}$, where $I_C$ is the indicator of $C$", 2, true],
      ["projection", "The $\\mathbf{z}$-update becomes the projection of $\\mathbf{x} + \\mathbf{u}$ onto $C$, so the constraint costs only a projection per iteration", 2, true],
    ]),
  mcq(m(AD, "transfer-linearized", "transfer", 10, 90, "Linearised ADMM replaces the $\\mathbf{x}$-subproblem's quadratic term $\\frac{\\rho}{2}\\|A\\mathbf{x} + \\cdots\\|^{2}$ with a linearisation plus a proximal term. Its purpose is:"),
    "To avoid solving a linear system with $A^{\\top}A$, turning the step into a simple prox of $f$",
    [
      ["To add second-order information", "linearized-second", "It simplifies, not enriches."],
      ["To remove the dual update", "linearized-dual", "The dual update stays."],
      ["To make $f$ nonconvex", "linearized-nonconvex", "Unrelated."],
    ]),
  num(m(AD, "transfer-consensus-u", "transfer", 10, 90, "Consensus ADMM with $x = (1, 2, 3, 6)$ and $u = (0.5, -0.5, 0, 0)$ sets $z$ to the average of $x_i + u_i$. What is $z$?"), 3),
  short(m(AD, "transfer-family", "transfer", 10, 180, "Place ADMM in the family of methods from this chapter: what does it inherit from dual ascent and from the method of multipliers?"),
    [
      ["dual-ascent", "From dual ascent and dual decomposition: separate minimisations over blocks, enabling parallel and distributed computation", 2, true],
      ["multipliers", "From the method of multipliers: the augmented quadratic term, giving robustness and convergence under mild assumptions (no strict convexity or step-size tuning needed)", 2, true],
    ]),
];

export const opt06Items: Item[] = [...interior, ...augmented, ...admm];
