import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./opt-shared";

/**
 * Optimization course, part 5: the KKT conditions, Lagrangian duality and
 * linear programming. Forty questions per lesson, four at each level from 1
 * to 10.
 */

// ---------------------------------------------------------------------------
// kkt-conditions
// ---------------------------------------------------------------------------
const KK = "kkt-conditions";
const kkt: Item[] = [
  // level 1
  mcq(m(KK, "recall-four", "recall", 1, 15, "Which is NOT one of the four KKT conditions?"),
    "The Hessian of $f$ is positive definite",
    [
      ["Stationarity of the Lagrangian", "four-stationarity", "That's one of them."],
      ["Complementary slackness", "four-cs", "That's one of them."],
      ["Dual feasibility ($\\mu_i \\ge 0$)", "four-dual", "That's one of them."],
    ]),
  mcq(m(KK, "recall-cs", "recall", 1, 15, "Complementary slackness says that for each inequality constraint:"),
    "$\\mu_ig_i(\\mathbf{x}^{*}) = 0$ — either the constraint is active or its multiplier is zero",
    [
      ["$\\mu_i = g_i(\\mathbf{x}^{*})$", "cs-equal", "It's a product equal to zero."],
      ["$\\mu_i > 0$ always", "cs-positive", "Inactive constraints have $\\mu_i = 0$."],
      ["$g_i(\\mathbf{x}^{*}) = 0$ always", "cs-active", "Constraints can be inactive."],
    ]),
  mcq(m(KK, "recall-sign", "recall", 1, 15, "For constraints written $g_i(\\mathbf{x}) \\le 0$, dual feasibility requires:"),
    "$\\mu_i \\ge 0$",
    [
      ["$\\mu_i \\le 0$", "sign-negative", "The sign convention gives nonnegative multipliers."],
      ["$\\mu_i = 1$", "sign-one", "They're not fixed."],
      ["No condition", "sign-none", "Inequality multipliers are sign-restricted."],
    ]),
  mcq(m(KK, "recall-sufficient", "recall", 1, 15, "For a convex problem, a point satisfying the KKT conditions is:"),
    "A global minimiser",
    [
      ["Only a local minimiser", "sufficient-local", "Convexity makes it global."],
      ["Possibly a maximum", "sufficient-max", "Not for convex problems."],
      ["Infeasible", "sufficient-infeasible", "Feasibility is one of the conditions."],
    ]),
  // level 2
  num(m(KK, "apply-active-x", "apply", 2, 20, "Minimise $(x - 2)^{2}$ subject to $x \\le 1$. What is $x^{*}$?"), 1),
  num(m(KK, "apply-active-mu", "apply", 2, 20, "Using $\\mathcal{L} = (x - 2)^{2} + \\mu(x - 1)$, what is $\\mu^{*}$?"), 2),
  num(m(KK, "apply-inactive-mu", "apply", 2, 20, "Minimise $(x - 2)^{2}$ subject to $x \\le 3$. What is $\\mu^{*}$?"), 0),
  mcq(m(KK, "apply-inactive", "apply", 2, 20, "If a constraint is inactive at the optimum ($g_i(\\mathbf{x}^{*}) < 0$), then:"),
    "Its multiplier is $0$ and removing it wouldn't change the solution",
    [
      ["Its multiplier is positive", "inactive-positive", "Complementary slackness forbids it."],
      ["The problem is infeasible", "inactive-infeasible", "Inactive constraints are satisfied."],
      ["It must be made active", "inactive-active", "No."],
    ]),
  // level 3
  num(m(KK, "apply-lower-bound", "apply", 3, 25, "Minimise $x^{2}$ subject to $x \\ge 2$, written $2 - x \\le 0$. What is $\\mu^{*}$?"), 4),
  num(m(KK, "apply-projection-x", "apply", 3, 25, "Minimise $(x - 1)^{2} + (y - 1)^{2}$ subject to $x + y \\le 1$. What is $x^{*}$?"), 0.5),
  num(m(KK, "apply-projection-mu", "apply", 3, 25, "For the same problem, what is $\\mu^{*}$?"), 1),
  num(m(KK, "apply-cs-zero", "apply", 3, 25, "At a KKT point, a constraint has $g_i(\\mathbf{x}^{*}) = -0.3$. What is $\\mu_i$?"), 0),
  // level 4
  num(m(KK, "apply-disk-value", "apply", 4, 30, "Minimise $x + y$ subject to $x^{2} + y^{2} \\le 2$. What is the minimum value?"), -2),
  num(m(KK, "apply-disk-mu", "apply", 4, 30, "For that problem, what is $\\mu^{*}$?"), 0.5),
  num(m(KK, "apply-box-mu", "apply", 4, 30, "Minimise $(x - 2)^{2}$ subject to $0 \\le x \\le 1$. What is the multiplier of the upper bound $x \\le 1$?"), 2),
  mcq(m(KK, "apply-slater", "apply", 4, 30, "Slater's condition for a convex problem requires:"),
    "A strictly feasible point: all inequalities strictly satisfied and equalities satisfied",
    [
      ["A bounded feasible set", "slater-bounded", "Boundedness isn't the condition."],
      ["A differentiable objective", "slater-differentiable", "It's about feasibility."],
      ["Linear constraints only", "slater-linear", "It applies to convex inequalities generally."],
    ]),
  // level 5
  short(m(KK, "explain-svm", "explain", 5, 90, "How does complementary slackness explain the support vectors of an SVM?"),
    [
      ["multipliers", "Each training point has a multiplier $\\alpha_i$ on its margin constraint $y_i(\\mathbf{w}^{\\top}\\mathbf{x}_i + b) \\ge 1$", 2, true],
      ["cs", "By complementary slackness $\\alpha_i > 0$ only if the constraint is tight, so only points on (or inside) the margin — the support vectors — determine $\\mathbf{w}$", 2, true],
    ]),
  mcq(m(KK, "apply-licq", "apply", 5, 40, "LICQ (linear independence constraint qualification) requires:"),
    "The gradients of the active constraints at $\\mathbf{x}^{*}$ to be linearly independent",
    [
      ["All constraints to be linear", "licq-linear", "That's a different qualification."],
      ["$f$ to be convex", "licq-convex", "It concerns constraints."],
      ["No constraints to be active", "licq-none", "It allows active constraints."],
    ]),
  num(m(KK, "apply-two-constraints", "apply", 5, 40, "Minimise $(x - 3)^{2} + (y - 1)^{2}$ subject to $x \\le 2$ and $y \\le 0$. Both are active at $(2, 0)$. What is the sum of the two multipliers?"), 4),
  mcq(m(KK, "apply-necessary", "apply", 5, 40, "Without convexity, the KKT conditions (with a constraint qualification) are:"),
    "Necessary for a local minimum, but not sufficient",
    [
      ["Sufficient but not necessary", "necessary-sufficient", "Reversed."],
      ["Neither necessary nor sufficient", "necessary-neither", "They're necessary under a CQ."],
      ["Both necessary and sufficient", "necessary-both", "Not without convexity."],
    ]),
  // level 6
  short(m(KK, "explain-active-set", "explain", 6, 120, "Describe how an active-set method solves an inequality-constrained quadratic program."),
    [
      ["guess", "Guess which constraints are active, treat them as equalities, and solve the resulting equality-constrained QP (a linear system)", 2, true],
      ["update", "Check feasibility and multiplier signs: add a violated constraint or drop one with a negative multiplier, and repeat until all KKT conditions hold", 2, true],
    ]),
  num(m(KK, "apply-sensitivity", "apply", 6, 45, "A constraint has multiplier $\\mu^{*} = 2$. About how much does the optimal value fall if the constraint is relaxed by $0.1$?"), 0.2),
  num(m(KK, "apply-nnls", "apply", 6, 45, "Minimise $(x + 1)^{2}$ subject to $x \\ge 0$. What is the multiplier of the bound?"), 2),
  mcq(m(KK, "apply-kkt-fail", "apply", 6, 45, "Minimise $x$ subject to $x^{2} \\le 0$. Why do no KKT multipliers exist at the optimum $x = 0$?"),
    "The constraint gradient $2x$ is zero there, so stationarity $1 + 2\\mu x = 0$ is impossible — a constraint qualification fails",
    [
      ["$x = 0$ is infeasible", "fail-infeasible", "It's the only feasible point."],
      ["The objective is non-convex", "fail-nonconvex", "Everything here is convex."],
      ["$\\mu$ must be negative", "fail-negative", "No $\\mu$ of any sign works."],
    ]),
  // level 7
  num(m(KK, "transfer-water-level", "transfer", 7, 60, "Water-filling allocates total power $1$ to channels with noise levels $0.2$ and $0.6$, giving each channel $\\max(0, \\nu - n_i)$. What is the water level $\\nu$?"), 0.9),
  short(m(KK, "transfer-lasso", "transfer", 7, 120, "Write the KKT conditions for the lasso $\\min\\frac{1}{2}\\|\\mathbf{y} - X\\boldsymbol{\\beta}\\|^{2} + \\lambda\\|\\boldsymbol{\\beta}\\|_1$ and interpret them."),
    [
      ["nonzero", "For $\\beta_j \\ne 0$: $\\mathbf{x}_j^{\\top}(\\mathbf{y} - X\\boldsymbol{\\beta}) = \\lambda\\operatorname{sign}(\\beta_j)$", 2, true],
      ["zero", "For $\\beta_j = 0$: $|\\mathbf{x}_j^{\\top}(\\mathbf{y} - X\\boldsymbol{\\beta})| \\le \\lambda$ — a feature enters only when its correlation with the residual reaches $\\lambda$", 2, true],
    ]),
  num(m(KK, "transfer-water-power", "transfer", 7, 60, "With $\\nu = 0.9$ and noise $0.2$, what power does the first channel receive?"), 0.7),
  mcq(m(KK, "transfer-lasso-check", "transfer", 7, 60, "In a lasso fit with $\\lambda = 1$, feature $j$ has $\\beta_j = 0$ and $|\\mathbf{x}_j^{\\top}\\mathbf{r}| = 0.7$. Is this consistent with optimality?"),
    "Yes — the KKT condition $|\\mathbf{x}_j^{\\top}\\mathbf{r}| \\le \\lambda$ holds",
    [
      ["No — it should be nonzero", "lasso-check-nonzero", "Its correlation is below $\\lambda$."],
      ["No — $|\\mathbf{x}_j^{\\top}\\mathbf{r}|$ must be exactly $0$", "lasso-check-zero", "Any value up to $\\lambda$ is allowed."],
      ["Only if $\\lambda > 2$", "lasso-check-lambda", "$0.7 \\le 1$ already."],
    ]),
  // level 8
  short(m(KK, "transfer-newton-kkt", "transfer", 8, 120, "How do interior-point and SQP methods use the KKT conditions algorithmically?"),
    [
      ["equations", "They treat the KKT conditions (with complementarity relaxed or active set guessed) as a system of nonlinear equations in $(\\mathbf{x}, \\boldsymbol{\\mu}, \\boldsymbol{\\lambda})$", 2, true],
      ["newton", "They apply Newton-type steps to that system, solving a linear KKT system each iteration, while keeping multipliers and slacks in the right sign region", 2, true],
    ]),
  num(m(KK, "transfer-water-zero", "transfer", 8, 60, "Water-filling with total power $1$ over noise levels $0.2$ and $1.5$: the level is $\\nu = 1.2$. What power does the second channel get?"), 0),
  mcq(m(KK, "transfer-second-order", "transfer", 8, 60, "For non-convex problems, second-order sufficient conditions require the Lagrangian Hessian to be positive definite on:"),
    "The critical cone — directions tangent to the active constraints (with positive multipliers)",
    [
      ["All of $\\mathbb{R}^{n}$", "second-all", "Too strong; only feasible directions matter."],
      ["The span of the constraint gradients", "second-span", "Those are normal directions."],
      ["No directions", "second-none", "A curvature check is needed."],
    ]),
  num(m(KK, "transfer-qp", "transfer", 8, 60, "Minimise $\\frac{1}{2}x^{2} - 3x$ subject to $x \\le 2$. What is the multiplier?"), 1),
  // level 9
  short(m(KK, "transfer-portfolio", "transfer", 9, 150, "In mean–variance portfolio optimisation with no short selling ($w_i \\ge 0$), what do the KKT conditions say about assets with zero weight?"),
    [
      ["zero", "An asset with $w_i = 0$ has a nonnegative multiplier, meaning its marginal contribution to the objective is no better than the assets held", 2, true],
      ["held", "Assets held with $w_i > 0$ all have equal marginal risk–return trade-off (their multipliers are zero), the familiar equalisation condition", 2, true],
    ]),
  num(m(KK, "transfer-simplex-proj", "transfer", 9, 75, "Project $(0.8, 0.6)$ onto the probability simplex $\\{x_i \\ge 0, \\sum x_i = 1\\}$. What is the first component?"), 0.6),
  mcq(m(KK, "transfer-fritz-john", "transfer", 9, 75, "The Fritz John conditions differ from KKT by:"),
    "Allowing a multiplier on the objective gradient that may be zero, so they hold without constraint qualifications",
    [
      ["Ignoring constraints", "fj-ignore", "They include constraints."],
      ["Requiring convexity", "fj-convex", "They hold more generally."],
      ["Using only equality constraints", "fj-equality", "They allow inequalities."],
    ]),
  num(m(KK, "transfer-simplex-zero", "transfer", 9, 75, "Project $(1.5, 0.1)$ onto the probability simplex. What is the second component?"), 0),
  // level 10
  short(m(KK, "transfer-certificate", "transfer", 10, 180, "How can a solver's output be checked for optimality using KKT conditions?"),
    [
      ["residuals", "Compute primal feasibility violations, the stationarity residual $\\|\\nabla_{\\mathbf{x}}\\mathcal{L}\\|$, multiplier sign violations and complementarity $|\\mu_ig_i|$", 2, true],
      ["convex", "For a convex problem, small residuals certify near-optimality (and give a duality gap bound), independent of how the solution was found", 2, true],
    ]),
  mcq(m(KK, "transfer-lp-cs", "transfer", 10, 90, "In linear programming, KKT complementary slackness says:"),
    "A positive dual variable means its primal constraint is tight, and a positive primal variable means its dual constraint is tight",
    [
      ["Primal and dual variables are equal", "lp-cs-equal", "They live in different spaces."],
      ["All dual variables are positive", "lp-cs-positive", "Many are zero."],
      ["The objective is zero", "lp-cs-zero", "Unrelated."],
    ]),
  short(m(KK, "transfer-cq-numerics", "transfer", 10, 180, "Why do constraint qualifications matter in practice, not just in theory?"),
    [
      ["unbounded", "When they fail, multipliers may not exist or may be unbounded, so algorithms that estimate multipliers become unstable", 2, true],
      ["design", "Redundant or degenerate constraints (e.g. $x^{2} \\le 0$ instead of $x = 0$) should be reformulated so active gradients are independent", 2, true],
    ]),
  num(m(KK, "transfer-count", "transfer", 10, 90, "A problem has $n = 3$ variables, $2$ inequality and $1$ equality constraint. How many unknowns appear in the KKT system ($\\mathbf{x}$ and all multipliers)?"), 6),
];

// ---------------------------------------------------------------------------
// lagrangian-duality
// ---------------------------------------------------------------------------
const DU = "lagrangian-duality";
const duality: Item[] = [
  // level 1
  mcq(m(DU, "recall-dual-function", "recall", 1, 15, "The Lagrange dual function is:"),
    "$g(\\boldsymbol{\\mu}, \\boldsymbol{\\lambda}) = \\inf_{\\mathbf{x}}\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\mu}, \\boldsymbol{\\lambda})$",
    [
      ["$\\sup_{\\mathbf{x}}\\mathcal{L}$", "dual-sup", "It's an infimum over $\\mathbf{x}$."],
      ["$f(\\mathbf{x}^{*})$", "dual-optimum", "That's the primal optimum."],
      ["$\\nabla\\mathcal{L}$", "dual-gradient", "It's a value, not a gradient."],
    ]),
  mcq(m(DU, "recall-concave", "recall", 1, 15, "The dual function is always:"),
    "Concave, even when the primal problem is not convex",
    [
      ["Convex", "concave-convex", "It's a pointwise infimum of affine functions, hence concave."],
      ["Linear", "concave-linear", "Only in special cases."],
      ["Differentiable", "concave-differentiable", "It can have kinks."],
    ]),
  mcq(m(DU, "recall-weak", "recall", 1, 15, "Weak duality states:"),
    "$d^{*} \\le p^{*}$ for every problem",
    [
      ["$d^{*} = p^{*}$ for every problem", "weak-equal", "That's strong duality, which needs conditions."],
      ["$d^{*} \\ge p^{*}$", "weak-reversed", "The dual gives lower bounds."],
      ["$d^{*} = 0$", "weak-zero", "Unrelated."],
    ]),
  mcq(m(DU, "recall-slater", "recall", 1, 15, "Strong duality holds for a convex problem when:"),
    "Slater's condition holds (a strictly feasible point exists)",
    [
      ["The objective is linear", "slater-linear", "Linearity alone isn't the condition (though LPs need only feasibility)."],
      ["The problem has a unique solution", "slater-unique", "Uniqueness isn't required."],
      ["Always, without conditions", "slater-always", "Some convex problems have a gap."],
    ]),
  // level 2
  num(m(DU, "apply-g-at-2", "apply", 2, 20, "For $\\min x^{2}$ s.t. $x \\ge 1$, the dual function is $g(\\mu) = \\mu - \\frac{\\mu^{2}}{4}$. What is $g(2)$?"), 1),
  num(m(DU, "apply-g-at-1", "apply", 2, 20, "What is $g(1)$ for the same dual function?"), 0.75),
  num(m(DU, "apply-gap", "apply", 2, 20, "A problem has $p^{*} = 5$ and $d^{*} = 3$. What is the duality gap?"), 2),
  mcq(m(DU, "apply-strong", "apply", 2, 20, "Strong duality means:"),
    "$d^{*} = p^{*}$ — the best lower bound equals the optimal value",
    [
      ["$d^{*} < p^{*}$", "strong-less", "That's a positive gap."],
      ["The dual is unbounded", "strong-unbounded", "Then the primal would be infeasible."],
      ["The multipliers are all zero", "strong-zero", "Unrelated."],
    ]),
  // level 3
  num(m(DU, "apply-dual-opt-mu", "apply", 3, 25, "For $\\min x^{2}$ s.t. $x \\ge 3$, the dual is $g(\\mu) = 3\\mu - \\frac{\\mu^{2}}{4}$. What $\\mu$ maximises it?"), 6),
  num(m(DU, "apply-dual-opt-value", "apply", 3, 25, "What is $d^{*}$ for that problem?"), 9),
  num(m(DU, "apply-gap-pair", "apply", 3, 25, "For the same problem, the feasible point $x = 3.5$ and the multiplier $\\mu = 4$ give values $12.25$ and $g(4)$. What is the gap $f(x) - g(\\mu)$?"), 4.25),
  mcq(m(DU, "apply-lower-bound", "apply", 3, 25, "Which multipliers give a valid lower bound $g(\\boldsymbol{\\mu}, \\boldsymbol{\\lambda}) \\le p^{*}$?"),
    "Any $\\boldsymbol{\\mu} \\ge \\mathbf{0}$ and any $\\boldsymbol{\\lambda}$",
    [
      ["Only the optimal multipliers", "lower-optimal", "Every dual feasible pair gives a bound."],
      ["Only $\\boldsymbol{\\mu} \\le \\mathbf{0}$", "lower-negative", "The sign is $\\ge 0$."],
      ["None — it's an upper bound", "lower-upper", "Dual values are lower bounds for minimisation."],
    ]),
  // level 4
  num(m(DU, "apply-lp-dual", "apply", 4, 30, "For $\\max 3x + 2y$ s.t. $x + y \\le 4$, $x + 3y \\le 6$, $x, y \\ge 0$, the dual optimum is $\\mathbf{y}^{*} = (3, 0)$. What is the dual objective $4y_1 + 6y_2$?"), 12),
  num(m(DU, "apply-2d-dual", "apply", 4, 30, "For $\\min x^{2} + y^{2}$ s.t. $x + y \\ge 2$, the dual function is $g(\\mu) = 2\\mu - \\frac{\\mu^{2}}{2}$. What is $d^{*}$?"), 2),
  num(m(DU, "apply-2d-mu", "apply", 4, 30, "What $\\mu^{*}$ attains it?"), 2),
  mcq(m(DU, "apply-lp-lp", "apply", 4, 30, "The dual of a linear program is:"),
    "Another linear program",
    [
      ["A quadratic program", "lp-qp", "It stays linear."],
      ["Always infeasible", "lp-infeasible", "Only when the primal is unbounded."],
      ["A semidefinite program", "lp-sdp", "It's an LP."],
    ]),
  // level 5
  short(m(DU, "explain-concave", "explain", 5, 90, "Why is the dual function concave regardless of whether the primal is convex?"),
    [
      ["affine", "For each fixed $\\mathbf{x}$, $\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\mu}, \\boldsymbol{\\lambda})$ is affine in the multipliers", 2, true],
      ["infimum", "The dual function is the pointwise infimum of this family of affine functions, and an infimum of affine functions is concave", 2, true],
    ]),
  mcq(m(DU, "apply-sensitivity", "apply", 5, 40, "In the perturbed problem with constraint $g_i(\\mathbf{x}) \\le u_i$, the optimal multiplier $\\mu_i^{*}$ gives (under strong duality):"),
    "$\\frac{\\partial p^{*}}{\\partial u_i} = -\\mu_i^{*}$: how fast the optimum improves as the constraint is loosened",
    [
      ["The optimal $x_i$", "sensitivity-x", "It's a rate of change of the optimal value."],
      ["The number of iterations needed", "sensitivity-iterations", "Unrelated."],
      ["$p^{*}$ itself", "sensitivity-value", "It's a derivative of $p^{*}$."],
    ]),
  num(m(DU, "apply-perturbation", "apply", 5, 40, "With $p^{*} = 9$ and $\\mu^{*} = 6$, estimate the new optimum when the constraint is loosened by $0.1$."), 8.4),
  mcq(m(DU, "apply-nonconvex-gap", "apply", 5, 40, "For non-convex problems, the duality gap is:"),
    "Often positive, though the dual still gives a valid lower bound",
    [
      ["Always zero", "nonconvex-zero", "Non-convex problems typically have gaps."],
      ["Always infinite", "nonconvex-infinite", "It's usually finite."],
      ["Negative", "nonconvex-negative", "Weak duality forbids that."],
    ]),
  // level 6
  short(m(DU, "explain-certificate", "explain", 6, 120, "How does a primal–dual pair certify optimality?"),
    [
      ["bound", "Any dual feasible point gives $g \\le p^{*}$ and any primal feasible point gives $f \\ge p^{*}$", 2, true],
      ["certificate", "If $f(\\mathbf{x}) - g(\\boldsymbol{\\mu}, \\boldsymbol{\\lambda}) \\le \\varepsilon$, then $\\mathbf{x}$ is within $\\varepsilon$ of optimal — no knowledge of $p^{*}$ needed; zero gap proves both optimal", 2, true],
    ]),
  num(m(DU, "apply-svm-vars", "apply", 6, 45, "A soft-margin SVM is trained on $500$ examples. How many dual variables does it have?"), 500),
  num(m(DU, "apply-violation", "apply", 6, 45, "In dual decomposition with coupling constraint $x_1 + x_2 = 1$, the subproblems return $x_1 = 0.8$ and $x_2 = 0.6$. What is the constraint violation, which serves as the dual (sub)gradient?"), 0.4),
  mcq(m(DU, "apply-svm-kernel", "apply", 6, 45, "Why does the SVM dual enable the kernel trick?"),
    "The data appear only through inner products $\\mathbf{x}_i^{\\top}\\mathbf{x}_j$, which can be replaced by a kernel $k(\\mathbf{x}_i, \\mathbf{x}_j)$",
    [
      ["The dual has fewer constraints", "kernel-fewer", "The point is the inner-product form."],
      ["The dual is linear", "kernel-linear", "It's a QP."],
      ["The primal can't be solved", "kernel-primal", "It can; it just doesn't expose inner products."],
    ]),
  // level 7
  num(m(DU, "transfer-dual-ascent", "transfer", 7, 60, "A dual ascent step is $\\lambda \\leftarrow \\lambda + \\alpha(A\\mathbf{x} - \\mathbf{b})$. With $\\lambda = 1$, $\\alpha = 0.5$ and residual $0.4$, what is the new $\\lambda$?"), 1.2),
  short(m(DU, "transfer-conjugate", "transfer", 7, 120, "How is the convex conjugate $f^{*}(\\mathbf{y}) = \\sup_{\\mathbf{x}}(\\mathbf{y}^{\\top}\\mathbf{x} - f(\\mathbf{x}))$ connected to duality?"),
    [
      ["appears", "Minimising the Lagrangian over $\\mathbf{x}$ produces conjugates: e.g. for linear constraints the dual function is $-f^{*}(-A^{\\top}\\boldsymbol{\\lambda}) - \\mathbf{b}^{\\top}\\boldsymbol{\\lambda}$", 2, true],
      ["fenchel", "Fenchel duality pairs $\\min f(\\mathbf{x}) + h(A\\mathbf{x})$ with $\\max -f^{*}(A^{\\top}\\mathbf{y}) - h^{*}(-\\mathbf{y})$, a clean conjugate-based form of Lagrangian duality", 2, true],
    ]),
  num(m(DU, "transfer-conjugate-value", "transfer", 7, 60, "The conjugate of $f(x) = \\frac{1}{2}x^{2}$ is $f^{*}(y) = \\frac{1}{2}y^{2}$. What is $f^{*}(3)$?"), 4.5),
  mcq(m(DU, "transfer-relaxation", "transfer", 7, 60, "In integer programming, Lagrangian relaxation is used to:"),
    "Obtain lower bounds by dualising hard constraints, guiding branch-and-bound",
    [
      ["Find the exact optimum directly", "relaxation-exact", "It gives bounds, with a possible gap."],
      ["Make the problem non-convex", "relaxation-nonconvex", "It simplifies it."],
      ["Remove the objective", "relaxation-objective", "The objective stays."],
    ]),
  // level 8
  short(m(DU, "transfer-kkt-equivalence", "transfer", 8, 120, "State the relationship between strong duality and the KKT conditions for a convex problem."),
    [
      ["forward", "If strong duality holds and both optima are attained, every primal–dual optimal pair satisfies the KKT conditions", 2, true],
      ["backward", "Conversely, for a convex problem any point satisfying KKT gives a primal–dual optimal pair with zero gap", 2, true],
    ]),
  num(m(DU, "transfer-relative-gap", "transfer", 8, 60, "A solver reports primal value $10.5$ and dual value $10.2$. What is the relative gap $\\frac{10.5 - 10.2}{10.2}$? Give $4$ decimal places."), 0.0294),
  mcq(m(DU, "transfer-slater-fail", "transfer", 8, 60, "Which convex problem fails Slater's condition?"),
    "Minimise $x$ subject to $x^{2} \\le 0$",
    [
      ["Minimise $x$ subject to $x \\ge 1$", "slater-fail-linear", "$x = 2$ is strictly feasible."],
      ["Minimise $x^{2}$ subject to $x \\le 5$", "slater-fail-box", "$x = 0$ is strictly feasible."],
      ["Minimise $x^{2} + y^{2}$ subject to $x + y \\le 1$", "slater-fail-plane", "The origin is strictly feasible."],
    ]),
  num(m(DU, "transfer-dual-mu", "transfer", 8, 60, "For $\\min x$ s.t. $x^{2} \\le 1$, the dual function is $g(\\mu) = -\\frac{1}{4\\mu} - \\mu$. What $\\mu$ maximises it?"), 0.5),
  // level 9
  short(m(DU, "transfer-why-dual", "transfer", 9, 150, "Give two reasons an algorithm might solve the dual problem instead of the primal."),
    [
      ["size", "The dual may have far fewer variables (one per constraint) or simpler constraints, e.g. only nonnegativity or a box", 2, true],
      ["structure", "It may decompose into independent subproblems (dual decomposition) or expose structure like kernels, enabling parallel or kernelised solvers", 2, true],
    ]),
  num(m(DU, "transfer-min-norm-dual", "transfer", 9, 75, "For $\\min\\frac{1}{2}\\|\\mathbf{x}\\|^{2}$ s.t. $A\\mathbf{x} = \\mathbf{b}$, the dual optimum is $\\frac{1}{2}\\mathbf{b}^{\\top}(AA^{\\top})^{-1}\\mathbf{b}$. What is it for $A = (1, 1)$ and $b = 2$?"), 1),
  mcq(m(DU, "transfer-max-flow", "transfer", 9, 75, "The max-flow min-cut theorem is an instance of:"),
    "LP duality",
    [
      ["The central limit theorem", "flow-clt", "Unrelated."],
      ["Weak duality only, with a gap", "flow-gap", "The values are equal."],
      ["Newton's method", "flow-newton", "Unrelated."],
    ]),
  num(m(DU, "transfer-exp-conjugate", "transfer", 9, 75, "The conjugate of $f(x) = e^{x}$ is $f^{*}(y) = y\\ln y - y$. What is $f^{*}(e)$?"), 0),
  // level 10
  short(m(DU, "transfer-maxcut", "transfer", 10, 180, "How do dual (and semidefinite) relaxations help with hard non-convex problems like Max-Cut?"),
    [
      ["bound", "The Lagrangian dual (equivalently, an SDP relaxation) is a convex problem whose value bounds the non-convex optimum", 2, true],
      ["use", "The bound certifies solution quality, and rounding the relaxed solution (as in Goemans–Williamson) gives provably good approximate solutions", 2, true],
    ]),
  mcq(m(DU, "transfer-fenchel", "transfer", 10, 90, "Fenchel's duality theorem concerns problems of the form:"),
    "$\\min_{\\mathbf{x}} f(\\mathbf{x}) + h(A\\mathbf{x})$, dualised through the conjugates $f^{*}$ and $h^{*}$",
    [
      ["Only linear programs", "fenchel-lp", "It covers general convex functions."],
      ["Unconstrained quadratic problems only", "fenchel-quadratic", "It's much more general."],
      ["Integer programs", "fenchel-integer", "It's for convex problems."],
    ]),
  short(m(DU, "transfer-lasso-gap", "transfer", 10, 180, "How can duality give a reliable stopping rule for a lasso solver?"),
    [
      ["dual-point", "From the current residual, scale it to obtain a dual feasible point (satisfying $\\|X^{\\top}\\boldsymbol{\\theta}\\|_\\infty \\le \\lambda$)", 2, true],
      ["gap", "The primal objective minus that dual value bounds the suboptimality; stop when this duality gap is below tolerance", 2, true],
    ]),
  num(m(DU, "transfer-weak-check", "transfer", 10, 90, "Any feasible $\\mathbf{x}$ and dual-feasible multipliers bound $p^{*}$. If $f(\\mathbf{x}) = 7.3$ and $g(\\boldsymbol{\\mu}) = 7.1$, what is the largest possible suboptimality of $\\mathbf{x}$?"), 0.2),
];

// ---------------------------------------------------------------------------
// linear-programming
// ---------------------------------------------------------------------------
const LP = "linear-programming";
const lp: Item[] = [
  // level 1
  mcq(m(LP, "recall-definition", "recall", 1, 15, "A linear program has:"),
    "A linear objective and linear equality/inequality constraints",
    [
      ["A quadratic objective", "definition-quadratic", "That's a QP."],
      ["Integer variables", "definition-integer", "That's integer programming."],
      ["No constraints", "definition-none", "A linear objective alone is unbounded."],
    ]),
  mcq(m(LP, "recall-vertex", "recall", 1, 15, "If an LP has an optimal solution, one exists at:"),
    "A vertex of the feasible polyhedron",
    [
      ["The centre of the feasible set", "vertex-centre", "Linear objectives push to the boundary."],
      ["A point where the gradient is zero", "vertex-gradient", "The objective gradient is constant."],
      ["The origin", "vertex-origin", "Not necessarily."],
    ]),
  mcq(m(LP, "recall-simplex", "recall", 1, 15, "The simplex method:"),
    "Moves from vertex to adjacent vertex, improving the objective",
    [
      ["Moves through the interior", "simplex-interior", "That's interior-point methods."],
      ["Uses gradient descent", "simplex-gd", "It pivots between vertices."],
      ["Checks every vertex", "simplex-every", "It visits only improving ones."],
    ]),
  mcq(m(LP, "recall-slack", "recall", 1, 15, "A slack variable converts:"),
    "An inequality $\\mathbf{a}^{\\top}\\mathbf{x} \\le b$ into an equality $\\mathbf{a}^{\\top}\\mathbf{x} + s = b$ with $s \\ge 0$",
    [
      ["An equality into an inequality", "slack-reverse", "It's the other way."],
      ["A maximisation into a minimisation", "slack-max", "That's negating the objective."],
      ["A free variable into two", "slack-free", "That's variable splitting."],
    ]),
  // level 2
  num(m(LP, "apply-objective", "apply", 2, 20, "Evaluate $3x + 2y$ at the vertex $(3, 1)$."), 11),
  num(m(LP, "apply-slack", "apply", 2, 20, "What is the slack of $x + y \\le 4$ at $(3, 0)$?"), 1),
  num(m(LP, "apply-box-vertices", "apply", 2, 20, "How many vertices does the square $[0, 1]^{2}$ have?"), 4),
  mcq(m(LP, "apply-outcomes", "apply", 2, 20, "Which is NOT a possible outcome for an LP?"),
    "A unique optimum strictly inside the feasible region",
    [
      ["Infeasible", "outcomes-infeasible", "That can happen."],
      ["Unbounded", "outcomes-unbounded", "That can happen."],
      ["A whole edge of optimal solutions", "outcomes-edge", "That can happen when the objective is parallel to an edge."],
    ]),
  // level 3
  num(m(LP, "apply-intersection", "apply", 3, 25, "Where do $x + y = 4$ and $x + 3y = 6$ intersect? Give the $y$-coordinate."), 1),
  num(m(LP, "apply-max", "apply", 3, 25, "Maximise $3x + 2y$ s.t. $x + y \\le 4$, $x + 3y \\le 6$, $x, y \\ge 0$. What is the maximum?"), 12),
  num(m(LP, "apply-basic-count", "apply", 3, 25, "In standard form with $n = 4$ variables and $m = 2$ equality constraints, how many ways are there to choose the $2$ basic variables?"), 6),
  mcq(m(LP, "apply-bfs", "apply", 3, 25, "A basic feasible solution is:"),
    "A feasible point where the non-basic variables are zero and the basis columns determine the rest — a vertex",
    [
      ["Any feasible point", "bfs-any", "Interior points aren't basic."],
      ["The optimal solution", "bfs-optimal", "Most BFSs aren't optimal."],
      ["A point with all variables positive", "bfs-positive", "Non-basic variables are zero."],
    ]),
  // level 4
  num(m(LP, "apply-standard-vars", "apply", 4, 30, "Converting $\\max 3x + 2y$ with two $\\le$ constraints and $x, y \\ge 0$ to standard form adds slacks. How many variables are there in total?"), 4),
  num(m(LP, "apply-ratio-test", "apply", 4, 30, "An entering column is $(2, 1)$ with right-hand sides $(8, 3)$. The ratio test takes $\\min\\frac{b_i}{a_i}$ over $a_i > 0$. How far can the entering variable increase?"), 3),
  num(m(LP, "apply-dual-value", "apply", 4, 30, "The dual of the example LP is $\\min 4y_1 + 6y_2$. At $\\mathbf{y} = (3, 0)$, what is its value?"), 12),
  mcq(m(LP, "apply-optimality", "apply", 4, 30, "For a minimisation in standard form, the simplex method stops when:"),
    "All reduced costs of non-basic variables are nonnegative",
    [
      ["All variables are positive", "optimality-positive", "Non-basic variables are zero."],
      ["The ratio test fails", "optimality-ratio", "That signals unboundedness."],
      ["The objective is zero", "optimality-zero", "The optimum can be anything."],
    ]),
  // level 5
  short(m(LP, "explain-vertex", "explain", 5, 90, "Why does a bounded, feasible LP always have an optimal vertex?"),
    [
      ["linear", "A linear objective has no interior stationary points: from any non-vertex point you can move along some direction in the face without worsening the objective", 2, true],
      ["vertex", "Repeating this reaches a vertex at least as good; since there are finitely many vertices, the best of them is optimal", 2, true],
    ]),
  mcq(m(LP, "apply-klee-minty", "apply", 5, 40, "The Klee–Minty examples show that the simplex method:"),
    "Can visit exponentially many vertices in the worst case",
    [
      ["Always runs in polynomial time", "klee-polynomial", "Its worst case is exponential."],
      ["Can fail to find the optimum", "klee-fail", "It still finds it, just slowly."],
      ["Needs integer data", "klee-integer", "Unrelated."],
    ]),
  num(m(LP, "apply-cs-dual", "apply", 5, 40, "At the primal optimum, a constraint has slack $2$. By complementary slackness, what is its dual variable?"), 0),
  mcq(m(LP, "apply-cycling", "apply", 5, 40, "Bland's rule in the simplex method prevents:"),
    "Cycling at degenerate vertices",
    [
      ["Unboundedness", "bland-unbounded", "It doesn't change the LP."],
      ["Infeasibility", "bland-infeasible", "It's a pivoting rule."],
      ["Rounding errors", "bland-rounding", "It's combinatorial."],
    ]),
  // level 6
  short(m(LP, "explain-phase-one", "explain", 6, 120, "What is Phase I of the simplex method?"),
    [
      ["purpose", "It finds an initial basic feasible solution when none is obvious (e.g. constraints aren't of the form $A\\mathbf{x} \\le \\mathbf{b}$ with $\\mathbf{b} \\ge \\mathbf{0}$)", 2, true],
      ["how", "Add artificial variables and minimise their sum; a zero optimum gives a feasible starting basis, a positive one proves the LP infeasible", 2, true],
    ]),
  num(m(LP, "apply-transport-vars", "apply", 6, 45, "A transportation problem ships from $2$ suppliers to $3$ customers. How many shipment variables?"), 6),
  num(m(LP, "apply-shadow", "apply", 6, 45, "In the example LP, the first constraint's dual value is $3$. If its right-hand side rises from $4$ to $5$ (staying in range), what is the new optimal value?"), 15),
  mcq(m(LP, "apply-strong", "apply", 6, 45, "LP strong duality holds whenever:"),
    "The primal (or dual) has a finite optimum — no extra condition like Slater's is needed",
    [
      ["The constraint matrix is square", "strong-square", "Not required."],
      ["All variables are integers", "strong-integer", "That's integer programming."],
      ["Never", "strong-never", "It's a central theorem."],
    ]),
  // level 7
  num(m(LP, "transfer-lad", "transfer", 7, 60, "Least absolute deviations regression with $n = 100$ observations and $p = 3$ coefficients splits each residual into two nonnegative parts. How many LP variables in total?"), 203),
  short(m(LP, "transfer-integer", "transfer", 7, 120, "How does the LP relaxation help solve integer programs?"),
    [
      ["relax", "Dropping integrality gives an LP whose optimum bounds the integer optimum (from below for minimisation)", 2, true],
      ["branch", "Branch-and-bound splits on fractional variables, using LP bounds to prune subproblems that can't beat the best integer solution found", 2, true],
    ]),
  num(m(LP, "transfer-second-lp", "transfer", 7, 60, "Maximise $5x + 4y$ s.t. $6x + 4y \\le 24$, $x + 2y \\le 6$, $x, y \\ge 0$. What is the maximum?"), 21),
  mcq(m(LP, "transfer-ipm", "transfer", 7, 60, "Compared with simplex, interior-point methods for LP:"),
    "Have polynomial worst-case complexity and need few, expensive iterations",
    [
      ["Always visit every vertex", "ipm-vertices", "They avoid vertices until the end."],
      ["Warm-start better", "ipm-warm", "Simplex warm-starts better."],
      ["Can't solve large LPs", "ipm-large", "They excel on large sparse LPs."],
    ]),
  // level 8
  short(m(LP, "transfer-dual-simplex", "transfer", 8, 120, "Why is the dual simplex method useful after adding a constraint to a solved LP?"),
    [
      ["state", "The old optimal basis stays dual feasible (optimal reduced costs) but may become primal infeasible", 2, true],
      ["fix", "Dual simplex restores primal feasibility from there in few pivots — ideal for branch-and-bound and cutting planes", 2, true],
    ]),
  num(m(LP, "transfer-dual-y1", "transfer", 8, 60, "For that LP ($\\max 5x + 4y$), both primal variables are positive, so both dual constraints $6y_1 + y_2 \\ge 5$ and $4y_1 + 2y_2 \\ge 4$ are tight. What is $y_1$?"), 0.75),
  mcq(m(LP, "transfer-unbounded-dual", "transfer", 8, 60, "If the primal LP is unbounded, the dual is:"),
    "Infeasible",
    [
      ["Unbounded too", "unbounded-unbounded", "Weak duality rules that out."],
      ["Optimal with value $0$", "unbounded-zero", "A finite dual optimum would bound the primal."],
      ["Always feasible", "unbounded-feasible", "It can't be."],
    ]),
  num(m(LP, "transfer-dual-value", "transfer", 8, 60, "With $\\mathbf{y} = (0.75, 0.5)$, what is the dual objective $24y_1 + 6y_2$?"), 21),
  // level 9
  short(m(LP, "transfer-ot", "transfer", 9, 150, "How is optimal transport between two discrete distributions an LP?"),
    [
      ["variables", "Variables $\\pi_{ij} \\ge 0$ give the mass moved from source $i$ to target $j$; the objective is $\\sum c_{ij}\\pi_{ij}$", 2, true],
      ["constraints", "Row sums must equal the source weights and column sums the target weights — linear equalities, so it's an LP (a transportation problem)", 2, true],
    ]),
  num(m(LP, "transfer-ot-vars", "transfer", 9, 75, "Optimal transport between distributions on $10$ and $20$ points has how many variables?"), 200),
  mcq(m(LP, "transfer-tu", "transfer", 9, 75, "Why do network-flow LPs (like assignment and transportation) have integer optimal solutions for integer data?"),
    "Their constraint matrices are totally unimodular, so every vertex is integral",
    [
      ["Simplex rounds the answer", "tu-rounds", "No rounding is needed."],
      ["LPs always have integer solutions", "tu-always", "Most don't."],
      ["The objective is integer", "tu-objective", "It's the constraint structure."],
    ]),
  num(m(LP, "transfer-y2", "transfer", 9, 75, "For the same dual system ($6y_1 + y_2 = 5$, $4y_1 + 2y_2 = 4$), what is $y_2$?"), 0.5),
  // level 10
  short(m(LP, "transfer-ml", "transfer", 10, 180, "Give two machine-learning or statistics problems that are linear programs."),
    [
      ["examples", "E.g. least absolute deviations or quantile regression, $\\ell_1$-norm SVMs, Dantzig selector, or optimal transport / Wasserstein distances between discrete distributions", 2, true],
      ["why", "Absolute values and maxima become linear constraints with auxiliary variables, so these problems inherit LP solvers' reliability and duality theory", 2, true],
    ]),
  mcq(m(LP, "transfer-ellipsoid", "transfer", 10, 90, "Khachiyan's ellipsoid method was historically important because it:"),
    "Was the first polynomial-time algorithm for LP, though too slow in practice",
    [
      ["Replaced simplex in practice", "ellipsoid-replaced", "It's impractically slow."],
      ["Solves integer programs efficiently", "ellipsoid-integer", "It's for LP."],
      ["Visits all vertices", "ellipsoid-vertices", "It shrinks ellipsoids."],
    ]),
  short(m(LP, "transfer-column-generation", "transfer", 10, 180, "What is column generation, and when is it used?"),
    [
      ["what", "Solve an LP restricted to a few columns (variables), then use the dual prices to search for a new column with negative reduced cost; add it and repeat", 2, true],
      ["when", "For LPs with enormously many variables, e.g. cutting-stock or crew-scheduling, where columns can be priced by solving a subproblem instead of listing them", 2, true],
    ]),
  num(m(LP, "transfer-cube", "transfer", 10, 90, "How many vertices does the $10$-dimensional unit cube $[0, 1]^{10}$ have?"), 1024),
];

export const opt05Items: Item[] = [...kkt, ...duality, ...lp];
