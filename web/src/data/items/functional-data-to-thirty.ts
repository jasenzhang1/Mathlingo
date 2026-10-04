import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders } from "./authoring";

/**
 * Takes every Functional Data Analysis lesson to 30 items (hilbert-space and
 * functional-data-analysis from 20, the four methods lessons from 8), rated on
 * the 1–10 level scale described in ./authoring.ts. The existing pools
 * clustered between levels 1 and 7, so these add both ends: one-step plug-ins
 * at 1–2, and derivations, proofs and open-ended designs at 8–10.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-fda",
  tier: "generated",
  title: "Mathlingo authored item (functional data analysis)",
};

const { mcq, short, num } = makeBuilders(AUTHORED);

// ---------------------------------------------------------------------------
const HSP = "hilbert-space";
const hilbertSpace: Item[] = [
  mcq(
    { concept: HSP, slug: "recall-distinguishing-property", cognitive: "recall", level: 1, seconds: 20,
      stem: "A Hilbert space is an inner-product space with one extra property. Which?" },
    "Completeness",
    [
      ["Finite dimension", "hs-finite", "$L^2$ is an infinite-dimensional Hilbert space."],
      ["Commutativity", "hs-commutative", "Vector addition is commutative in every vector space."],
      ["Having a basis of polynomials", "hs-polynomial-basis", "No particular basis is required."],
    ],
  ),
  mcq(
    { concept: HSP, slug: "recall-riesz", cognitive: "recall", level: 3, seconds: 40,
      stem: "What does the Riesz representation theorem say about a continuous linear functional $L$ on a Hilbert space $H$?" },
    "There is a unique $g \\in H$ with $L(f) = \\langle f, g \\rangle$ for every $f$",
    [
      ["$L$ must be the zero functional", "riesz-zero", "Many nonzero continuous functionals exist, e.g. $f \\mapsto \\langle f, g\\rangle$."],
      ["$L(f) = \\|f\\|$ for every $f$", "riesz-norm", "The norm is not linear."],
      ["$L$ can be represented only if $H$ is finite-dimensional", "riesz-finite", "Riesz holds in every Hilbert space; completeness is what it needs."],
    ],
  ),
  num(
    { concept: HSP, slug: "apply-dot-product", cognitive: "apply", level: 1.5, seconds: 20,
      stem: "In $\\mathbb{R}^2$ with the usual inner product, compute $\\langle (1, 2), (3, 4) \\rangle$." },
    11,
  ),
  num(
    { concept: HSP, slug: "apply-gram-schmidt-quadratic", cognitive: "apply", level: 7.5, seconds: 180,
      stem: "In $L^2[0, 1]$, Gram–Schmidt applied to $1, t, t^2$ gives $1$, $t - \\tfrac{1}{2}$, and a monic quadratic $t^2 + at + c$. Find the constant term $c$. Give $4$ decimal places." },
    0.1667,
  ),
  num(
    { concept: HSP, slug: "apply-distance-to-lines", cognitive: "apply", level: 8.5, seconds: 240,
      stem: "In $L^2[0, 1]$, find the squared distance from $f(t) = t^2$ to the subspace of linear functions $\\{a + bt\\}$. Give $5$ decimal places." },
    0.005556,
    0.00002,
  ),
  short(
    { concept: HSP, slug: "explain-evaluation-not-continuous", cognitive: "explain", level: 8.5, seconds: 180,
      stem: "Explain why point evaluation $f \\mapsto f(t_0)$ is not a continuous linear functional on $L^2[0, 1]$, and why that matters for functional data analysis." },
    [
      ["counterexample", "Functions can have tiny $L^2$ norm but large value at $t_0$ (e.g. a tall, narrow spike), so $|f(t_0)|$ is not bounded by $c\\|f\\|$; and elements of $L^2$ are only defined almost everywhere, so $f(t_0)$ isn't even well defined.", 4, true],
      ["riesz", "So there is no Riesz representer $g$ with $f(t_0) = \\langle f, g \\rangle$.", 2],
      ["why-matters", "Methods that need pointwise values (interpolation, fitting data observed at points) work in smaller spaces where evaluation is continuous — reproducing kernel Hilbert spaces.", 3, true],
    ],
  ),
  short(
    { concept: HSP, slug: "explain-bessel", cognitive: "explain", level: 7.5, seconds: 150,
      stem: "Let $e_1, \\ldots, e_K$ be orthonormal in a Hilbert space. Prove Bessel's inequality $\\sum_{k=1}^{K} \\langle f, e_k \\rangle^2 \\le \\|f\\|^2$." },
    [
      ["residual", "Let $r = f - \\sum_k \\langle f, e_k \\rangle e_k$; then $\\langle r, e_j \\rangle = 0$ for each $j$.", 3, true],
      ["pythagoras", "By orthogonality, $\\|f\\|^2 = \\|r\\|^2 + \\sum_k \\langle f, e_k \\rangle^2$.", 3, true],
      ["conclude", "Since $\\|r\\|^2 \\ge 0$, the inequality follows, with equality iff $f$ lies in the span.", 2],
    ],
  ),
  short(
    { concept: HSP, slug: "transfer-no-compactness", cognitive: "transfer", level: 9, seconds: 200,
      stem: "In $\\mathbb{R}^n$ every bounded sequence has a convergent subsequence. Show this fails in an infinite-dimensional Hilbert space, and say what it implies for estimating an infinite-dimensional object from finite data." },
    [
      ["sequence", "Take an orthonormal sequence $e_1, e_2, \\ldots$: all have norm $1$, so it is bounded.", 3, true],
      ["distance", "$\\|e_j - e_k\\|^2 = 2$ for $j \\ne k$, so no subsequence is Cauchy and none converges.", 3, true],
      ["implication", "Bounded sets are not compact, so boundedness alone doesn't pin down an estimate; infinite-dimensional estimation needs extra structure — smoothness, truncation or regularisation.", 3],
    ],
  ),
  short(
    { concept: HSP, slug: "transfer-l1-not-hilbert", cognitive: "transfer", level: 9, seconds: 200,
      stem: "Every norm that comes from an inner product satisfies the parallelogram law $\\|f + g\\|^2 + \\|f - g\\|^2 = 2\\|f\\|^2 + 2\\|g\\|^2$. Use $f = \\mathbb{1}_{[0, 1/2]}$ and $g = \\mathbb{1}_{(1/2, 1]}$ to show the $L^1[0, 1]$ norm $\\int_0^1 |f|$ does not come from an inner product." },
    [
      ["norms", "$\\|f\\|_1 = \\|g\\|_1 = \\tfrac{1}{2}$, and $\\|f + g\\|_1 = \\|f - g\\|_1 = 1$.", 4, true],
      ["compare", "Left side $1 + 1 = 2$; right side $2 \\cdot \\tfrac{1}{4} + 2 \\cdot \\tfrac{1}{4} = 1$. They differ, so no inner product induces the $L^1$ norm.", 4, true],
    ],
  ),
  short(
    { concept: HSP, slug: "transfer-minimum-norm", cognitive: "transfer", level: 10, seconds: 300,
      stem: "Prove that a nonempty closed convex set $K$ in a Hilbert space contains a unique element of smallest norm." },
    [
      ["sequence", "Let $d = \\inf_{x \\in K} \\|x\\|$ and take $x_n \\in K$ with $\\|x_n\\| \\to d$.", 2, true],
      ["cauchy", "By the parallelogram law, $\\|x_n - x_m\\|^2 = 2\\|x_n\\|^2 + 2\\|x_m\\|^2 - 4\\|\\tfrac{x_n + x_m}{2}\\|^2 \\le 2\\|x_n\\|^2 + 2\\|x_m\\|^2 - 4d^2 \\to 0$, using convexity ($\\tfrac{x_n + x_m}{2} \\in K$).", 4, true],
      ["limit", "Completeness gives a limit $x$; closedness puts $x \\in K$; continuity of the norm gives $\\|x\\| = d$.", 2, true],
      ["unique", "If $x, y$ both have norm $d$, the same identity gives $\\|x - y\\|^2 \\le 0$, so $x = y$.", 2],
    ],
  ),
];

// ---------------------------------------------------------------------------
const FDA = "functional-data-analysis";
const functionalData: Item[] = [
  mcq(
    { concept: FDA, slug: "recall-function-space", cognitive: "recall", level: 1, seconds: 20,
      stem: "In functional data analysis, a sample of $n$ curves is viewed as $n$ points in what?" },
    "A space of functions, such as the Hilbert space $L^2$",
    [
      ["A $2$-dimensional plane", "fda-plane", "Plotting curves in a plane doesn't make each curve a point there."],
      ["A contingency table", "fda-table", "Contingency tables are for categorical counts."],
      ["A single real number line", "fda-line", "A whole curve cannot be captured by one number."],
    ],
  ),
  mcq(
    { concept: FDA, slug: "recall-registration", cognitive: "recall", level: 2, seconds: 30,
      stem: "What is curve registration?" },
    "Warping each curve's time axis so that corresponding features (peaks, valleys) line up across curves",
    [
      ["Recording the curves in a database", "registration-database", "The term refers to aligning features, not storing data."],
      ["Smoothing each curve with splines", "registration-smoothing", "Smoothing removes noise; registration removes timing differences."],
      ["Rescaling each curve to have norm $1$", "registration-normalise", "Rescaling changes amplitude, not timing."],
    ],
  ),
  num(
    { concept: FDA, slug: "apply-mean-of-two", cognitive: "apply", level: 1.5, seconds: 20,
      stem: "Two curves are $f_1(t) = t$ and $f_2(t) = 3t$. What is their mean function evaluated at $t = 2$?" },
    4,
  ),
  num(
    { concept: FDA, slug: "apply-mean-function", cognitive: "apply", level: 2.5, seconds: 40,
      stem: "Three curves are $1 + t$, $1 - t$ and $1 + 2t$. Evaluate their mean function at $t = 1$. Give $3$ decimal places." },
    1.667,
  ),
  num(
    { concept: FDA, slug: "apply-phase-smearing", cognitive: "apply", level: 8, seconds: 240,
      stem: "Curves are $X(t) = \\sin\\big(2\\pi(t - \\tau)\\big)$ with a random shift $\\tau \\sim \\text{Uniform}(-0.25, 0.25)$. Each curve has peak amplitude $1$. What is the peak amplitude of the pointwise mean curve $\\mathbb{E}[X(t)]$? Give $3$ decimal places." },
    0.637,
  ),
  short(
    { concept: FDA, slug: "explain-low-rank-covariance", cognitive: "explain", level: 7.5, seconds: 150,
      stem: "You compute the sample covariance of $50$ curves observed on a grid of $1000$ points. What is the largest possible rank of this $1000 \\times 1000$ matrix, and what does that imply?" },
    [
      ["rank", "At most $49$: it is a sum of $50$ rank-one terms built from centred curves, which satisfy one linear constraint (they sum to zero).", 4, true],
      ["implication", "It is singular, so it cannot be inverted, and only about $49$ eigenfunctions can be estimated; the data determine the covariance only in the span of the observed curves.", 3, true],
    ],
  ),
  short(
    { concept: FDA, slug: "explain-amplitude-phase-identifiability", cognitive: "explain", level: 9, seconds: 200,
      stem: "Registration models each curve as $X_i(t) = A_i\\big(h_i(t)\\big)$, an amplitude function composed with a time warp $h_i$. Explain why amplitude and phase are not identifiable without constraints, and give two typical constraints." },
    [
      ["non-identifiable", "Any warp can be absorbed into the amplitude function ($A \\circ h = (A \\circ g^{-1}) \\circ (g \\circ h)$), so the same curve has many decompositions; an unconstrained warp can even fit away genuine amplitude differences (“pinching”).", 5, true],
      ["constraints", "Names constraints such as: warps are increasing and fix the endpoints; warps average to the identity; warps are penalised for roughness or restricted to a small family (e.g. shifts, landmark-based piecewise-linear).", 3, true],
    ],
  ),
  short(
    { concept: FDA, slug: "transfer-compare-mean-curves", cognitive: "transfer", level: 8, seconds: 200,
      stem: "You want to test whether mean growth curves differ between two groups of children. A colleague proposes a $t$-test at each of $100$ ages. What is wrong, and what would you do instead?" },
    [
      ["multiplicity", "$100$ correlated pointwise tests inflate the chance of a false positive, and a correction such as Bonferroni is very conservative given the correlation.", 3, true],
      ["global", "Use a global functional test — e.g. a statistic like $\\int (\\bar{X}_1(t) - \\bar{X}_2(t))^2\\,dt$ or the maximum pointwise $t$, with its null distribution from permutation of group labels — or test on the first few FPC scores.", 4, true],
      ["bands", "Mentions simultaneous confidence bands to show where the curves differ.", 1],
    ],
  ),
  mcq(
    { concept: FDA, slug: "transfer-acceleration-penalty", cognitive: "transfer", level: 7, seconds: 60,
      stem: "You want smooth estimates of acceleration $f''(t)$ from noisy position data. Which roughness penalty should the smoothing spline use?" },
    "$\\int f^{(4)}(t)^2\\,dt$, so the second derivative itself is smooth",
    [
      ["$\\int f''(t)^2\\,dt$", "penalty-second", "That yields a cubic spline whose second derivative is only piecewise linear and poorly estimated."],
      ["$\\int f(t)^2\\,dt$", "penalty-size", "Penalising size shrinks the curve towards $0$ rather than smoothing it."],
      ["No penalty; interpolate the data", "penalty-none", "Interpolation passes through the noise and makes derivatives wildly unstable."],
    ],
  ),
  short(
    { concept: FDA, slug: "transfer-wearable-design", cognitive: "transfer", level: 9.5, seconds: 300,
      stem: "A study records heart rate from wearables over $24$ hours for $500$ people, at irregular times with gaps, and wants to predict a cardiovascular event from these curves. People wake at different times. Outline a functional analysis pipeline and the main pitfalls." },
    [
      ["representation", "Handle irregular, gappy sampling with smoothing or a sparse approach (PACE-style covariance smoothing and conditional score prediction) rather than a fixed grid.", 3, true],
      ["registration", "Address phase variation from different wake times — align by wake time or register curves — so the model compares like with like.", 3, true],
      ["reduction", "Reduce the curves with FPCA and use the scores (plus covariates) in a model for the outcome, e.g. functional logistic or survival regression.", 3, true],
      ["validation", "Choose the number of components and smoothing by cross-validation on held-out subjects, and propagate score uncertainty / avoid leakage from estimating FPCA on all data.", 2],
    ],
  ),
];

// ---------------------------------------------------------------------------
const HS = "hilbert-schmidt-operators";
const hilbertSchmidt: Item[] = [
  mcq(
    { concept: HS, slug: "recall-covariance-function", cognitive: "recall", level: 1, seconds: 20,
      stem: "For a random curve $X$, what is the covariance function $C(s, t)$?" },
    "$\\operatorname{Cov}\\big(X(s), X(t)\\big)$",
    [
      ["$\\mathbb{E}[X(s)] \\cdot \\mathbb{E}[X(t)]$", "covfn-product-means", "That is the product of means, not the covariance."],
      ["$\\operatorname{Var}\\big(X(s) - X(t)\\big)$", "covfn-variogram", "That is (twice) the variogram."],
      ["$X(s) \\cdot X(t)$", "covfn-random", "That is a random quantity; the covariance is an expectation."],
    ],
  ),
  mcq(
    { concept: HS, slug: "recall-frobenius", cognitive: "recall", level: 2, seconds: 30,
      stem: "The Hilbert–Schmidt norm of an operator is the analogue of which matrix norm?" },
    "The Frobenius norm, $\\sqrt{\\sum_{ij} a_{ij}^2}$",
    [
      ["The spectral norm (largest singular value)", "hs-spectral", "That corresponds to the operator norm, which is smaller than the Hilbert–Schmidt norm in general."],
      ["The trace", "hs-trace", "The trace corresponds to the trace-class (nuclear) norm for PSD operators."],
      ["The determinant", "hs-determinant", "The determinant is not a norm and does not extend to infinite dimensions."],
    ],
  ),
  mcq(
    { concept: HS, slug: "recall-trace-class", cognitive: "recall", level: 2.5, seconds: 30,
      stem: "A positive semi-definite self-adjoint operator with eigenvalues $\\lambda_j$ is trace class when:" },
    "$\\sum_j \\lambda_j < \\infty$",
    [
      ["$\\sum_j \\lambda_j^2 < \\infty$", "trace-class-hs", "That is the Hilbert–Schmidt condition, which is weaker."],
      ["$\\lambda_1 < 1$", "trace-class-top", "The size of the top eigenvalue says nothing about summability."],
      ["All $\\lambda_j > 0$", "trace-class-positive", "Positivity is a separate property from trace class."],
    ],
  ),
  mcq(
    { concept: HS, slug: "recall-symmetry", cognitive: "recall", level: 1.5, seconds: 20,
      stem: "Which identity always holds for a covariance function?" },
    "$C(s, t) = C(t, s)$",
    [
      ["$C(s, t) = 0$ for $s \\ne t$", "covfn-white", "That describes uncorrelated values, which is not typical for curves."],
      ["$C(s, t) = C(s, s) + C(t, t)$", "covfn-sum", "Covariances don't add like this."],
      ["$C(s, t) \\le 0$", "covfn-negative", "Covariances can be positive or negative."],
    ],
  ),
  mcq(
    { concept: HS, slug: "recall-mercer", cognitive: "recall", level: 3, seconds: 35,
      stem: "For a continuous covariance function with eigenpairs $(\\lambda_j, \\phi_j)$, what does Mercer's theorem state?" },
    "$C(s, t) = \\sum_j \\lambda_j \\phi_j(s)\\phi_j(t)$, with uniform convergence",
    [
      ["$C(s, t) = \\sum_j \\phi_j(s)\\phi_j(t)$", "mercer-no-lambda", "Each term must be weighted by its eigenvalue."],
      ["$C(s, t) = \\lambda_1 \\phi_1(s)\\phi_1(t)$ exactly", "mercer-one-term", "One term is only the best rank-one approximation."],
      ["$C(s, t) = \\sum_j \\lambda_j (\\phi_j(s) + \\phi_j(t))$", "mercer-sum", "The expansion uses products of eigenfunctions."],
    ],
  ),
  mcq(
    { concept: HS, slug: "recall-compact", cognitive: "recall", level: 3.5, seconds: 35,
      stem: "Every Hilbert–Schmidt operator is also:" },
    "Compact — a limit of finite-rank operators",
    [
      ["Invertible", "hs-invertible-2", "Compact operators on infinite-dimensional spaces are never boundedly invertible."],
      ["Trace class", "hs-trace-implied", "Trace class is stronger; eigenvalues $1/j$ are Hilbert–Schmidt but not trace class."],
      ["The identity", "hs-identity", "The identity is not Hilbert–Schmidt in infinite dimensions."],
    ],
  ),
  num(
    { concept: HS, slug: "apply-constant-process", cognitive: "apply", level: 1.5, seconds: 25,
      stem: "$X(t) = Z$ for all $t$, where $\\operatorname{Var}(Z) = 4$. What is $C(0.2, 0.7)$?" },
    4,
  ),
  num(
    { concept: HS, slug: "apply-linear-process", cognitive: "apply", level: 3, seconds: 40,
      stem: "$X(t) = Zt$ with $\\operatorname{Var}(Z) = 2$. Compute $C(0.5, 0.4)$." },
    0.4,
  ),
  num(
    { concept: HS, slug: "apply-rank-one-eigenvalue", cognitive: "apply", level: 5, seconds: 90,
      stem: "On $L^2[0, 1]$, the operator with kernel $k(s, t) = st$ has one nonzero eigenvalue, with eigenfunction proportional to $t$. What is the eigenvalue? Give $3$ decimal places." },
    0.333,
  ),
  num(
    { concept: HS, slug: "apply-kernel-hs-norm", cognitive: "apply", level: 4.5, seconds: 70,
      stem: "Compute the squared Hilbert–Schmidt norm $\\int_0^1\\!\\int_0^1 k(s, t)^2\\,ds\\,dt$ of the kernel $k(s, t) = st$. Give $3$ decimal places." },
    0.111,
  ),
  num(
    { concept: HS, slug: "apply-brownian-top-eigenvalue", cognitive: "apply", level: 5.5, seconds: 70,
      stem: "The eigenvalues of Brownian motion's covariance operator on $[0, 1]$ are $\\lambda_j = \\big((j - \\tfrac{1}{2})\\pi\\big)^{-2}$. Compute $\\lambda_1$ to $3$ decimal places." },
    0.405,
  ),
  num(
    { concept: HS, slug: "apply-brownian-first-share", cognitive: "apply", level: 6.5, seconds: 90,
      stem: "The trace of Brownian motion's covariance operator on $[0, 1]$ is $\\tfrac{1}{2}$. What fraction of the total variance does the first eigenfunction explain? Give $3$ decimal places." },
    0.811,
  ),
  mcq(
    { concept: HS, slug: "explain-accumulate", cognitive: "explain", level: 5, seconds: 50,
      stem: "Why can the nonzero eigenvalues of a Hilbert–Schmidt operator accumulate only at $0$?" },
    "$\\sum_j \\lambda_j^2 < \\infty$, so for any $\\epsilon > 0$ only finitely many eigenvalues exceed $\\epsilon$ in absolute value",
    [
      ["Because the operator is positive", "accumulate-positive", "Positivity says nothing about how eigenvalues are spread."],
      ["Because there are only finitely many eigenvalues", "accumulate-finite", "There can be infinitely many; they must shrink towards $0$."],
      ["Because eigenvalues are always integers", "accumulate-integers", "Eigenvalues can be any real numbers."],
    ],
  ),
  short(
    { concept: HS, slug: "explain-hs-equals-eigen", cognitive: "explain", level: 6.5, seconds: 120,
      stem: "Explain why the squared Hilbert–Schmidt norm of a self-adjoint compact operator equals $\\sum_j \\lambda_j^2$." },
    [
      ["basis", "Compute $\\sum_j \\|\\mathcal{K} e_j\\|^2$ in the orthonormal eigenbasis $\\phi_j$ (the value is basis-independent).", 3, true],
      ["value", "$\\mathcal{K}\\phi_j = \\lambda_j \\phi_j$, so $\\|\\mathcal{K}\\phi_j\\|^2 = \\lambda_j^2$ and the sum is $\\sum_j \\lambda_j^2$.", 3, true],
      ["kernel", "Equivalently, by Mercer/Parseval, $\\int\\!\\!\\int k^2 = \\sum_j \\lambda_j^2$.", 1],
    ],
  ),
  short(
    { concept: HS, slug: "explain-trace-total-variance", cognitive: "explain", level: 8, seconds: 180,
      stem: "Show that the trace of the covariance operator equals the expected squared norm $\\mathbb{E}\\|X - \\mu\\|^2$." },
    [
      ["diagonal", "The trace of an integral operator is $\\int C(t, t)\\,dt = \\int \\operatorname{Var}(X(t))\\,dt$.", 3, true],
      ["fubini", "By Fubini, $\\int \\mathbb{E}[(X(t) - \\mu(t))^2]\\,dt = \\mathbb{E}\\int (X(t) - \\mu(t))^2\\,dt = \\mathbb{E}\\|X - \\mu\\|^2$.", 4, true],
      ["eigen", "Equivalently $\\sum_j \\lambda_j = \\sum_j \\operatorname{Var}(\\xi_j)$ by the Karhunen–Loève expansion.", 1],
    ],
  ),
  short(
    { concept: HS, slug: "explain-hs-compact", cognitive: "explain", level: 9, seconds: 240,
      stem: "Prove that a self-adjoint Hilbert–Schmidt operator $\\mathcal{K}$ with eigenvalues $\\lambda_j$ is compact by showing it is a norm-limit of finite-rank operators." },
    [
      ["truncate", "Define $\\mathcal{K}_N f = \\sum_{j \\le N} \\lambda_j \\langle f, \\phi_j \\rangle \\phi_j$, which has rank at most $N$.", 3, true],
      ["bound", "For $\\|f\\| \\le 1$, $\\|(\\mathcal{K} - \\mathcal{K}_N) f\\|^2 = \\sum_{j > N} \\lambda_j^2 \\langle f, \\phi_j\\rangle^2 \\le \\sup_{j > N} \\lambda_j^2 \\le \\sum_{j > N} \\lambda_j^2$.", 4, true],
      ["limit", "The tail sum tends to $0$ because $\\sum_j \\lambda_j^2 < \\infty$, so $\\mathcal{K}_N \\to \\mathcal{K}$ in operator norm; limits of finite-rank operators are compact.", 2, true],
    ],
  ),
  mcq(
    { concept: HS, slug: "explain-finite-rank", cognitive: "explain", level: 4, seconds: 45,
      stem: "A random curve is $X(t) = \\sum_{k=1}^{3} Z_k \\phi_k(t)$ for fixed functions $\\phi_k$ and random $Z_k$. What is the largest possible rank of its covariance operator?" },
    "$3$",
    [
      ["Infinite, because $X$ is a curve", "rank-infinite", "All curves lie in the span of three functions, so the covariance does too."],
      ["$1$", "rank-one", "Three independent coefficients can give three dimensions of variation."],
      ["It depends on the grid used", "rank-grid", "The rank is a property of the process, not of any discretisation."],
    ],
  ),
  mcq(
    { concept: HS, slug: "transfer-ou-kernel", cognitive: "transfer", level: 5, seconds: 45,
      stem: "Is $C(s, t) = e^{-|s - t|}$ a valid covariance function?" },
    "Yes — it is the covariance of a stationary Ornstein–Uhlenbeck process, and it is positive semi-definite",
    [
      ["No, because it is never negative", "ou-kernel-positive", "Non-negative covariances are allowed; validity is about positive semi-definiteness."],
      ["No, because it isn't differentiable at $s = t$", "ou-kernel-smooth", "Validity doesn't require smoothness; it only makes the paths rough."],
      ["Only on $[0, 1]$", "ou-kernel-domain", "It is valid on any interval."],
    ],
  ),
  num(
    { concept: HS, slug: "transfer-two-component-norm", cognitive: "transfer", level: 5, seconds: 60,
      stem: "$X = Z_1\\phi_1 + Z_2\\phi_2$ with orthonormal $\\phi_1, \\phi_2$ and uncorrelated $Z_1, Z_2$ of variances $3$ and $1$. What is the Hilbert–Schmidt norm of its covariance operator? Give $3$ decimal places." },
    3.162,
  ),
  short(
    { concept: HS, slug: "transfer-tikhonov", cognitive: "transfer", level: 9, seconds: 240,
      stem: "To solve the ill-posed equation $\\mathcal{C}\\beta = r$, Tikhonov regularisation uses $\\hat{\\beta} = (\\mathcal{C} + \\alpha I)^{-1} r$. Express $\\hat{\\beta}$ in the eigenbasis of $\\mathcal{C}$, and explain how $\\alpha$ controls noise amplification." },
    [
      ["eigen", "$\\hat{\\beta} = \\sum_j \\frac{\\langle r, \\phi_j\\rangle}{\\lambda_j + \\alpha}\\phi_j$.", 4, true],
      ["filter", "Compared with the unregularised $\\langle r, \\phi_j\\rangle/\\lambda_j$, each component is multiplied by the filter factor $\\lambda_j/(\\lambda_j + \\alpha)$: near $1$ when $\\lambda_j \\gg \\alpha$, near $0$ when $\\lambda_j \\ll \\alpha$.", 3, true],
      ["tradeoff", "Noise in $r$ is amplified by at most $1/\\alpha$ instead of $1/\\lambda_j \\to \\infty$; larger $\\alpha$ reduces variance but biases the well-determined components too.", 2],
    ],
  ),
  short(
    { concept: HS, slug: "transfer-no-white-noise", cognitive: "transfer", level: 9.5, seconds: 240,
      stem: "Show that no random element $X$ of an infinite-dimensional separable Hilbert space with $\\mathbb{E}\\|X\\|^2 < \\infty$ can have the identity as its covariance operator (so “white noise” is not a random function in $L^2$)." },
    [
      ["expand", "For an orthonormal basis $e_j$, $\\mathbb{E}\\|X\\|^2 = \\sum_j \\mathbb{E}\\langle X, e_j\\rangle^2$ (taking $\\mu = 0$).", 3, true],
      ["identity", "Covariance $I$ means $\\mathbb{E}\\langle X, e_j\\rangle^2 = \\langle I e_j, e_j\\rangle = 1$ for every $j$.", 3, true],
      ["contradiction", "So $\\mathbb{E}\\|X\\|^2 = \\sum_j 1 = \\infty$ — equivalently the identity isn't trace class — contradicting finite second moment.", 3, true],
    ],
  ),
  mcq(
    { concept: HS, slug: "transfer-sample-rank", cognitive: "transfer", level: 6, seconds: 50,
      stem: "The sample covariance operator is estimated from $n$ observed curves. What is its largest possible rank, and why?" },
    "$n - 1$ — it lives in the span of the $n$ centred curves, which sum to zero",
    [
      ["$n$", "sample-rank-n", "Centring removes one dimension."],
      ["Infinite", "sample-rank-infinite", "Finitely many curves span a finite-dimensional space."],
      ["The number of grid points", "sample-rank-grid", "With fewer curves than grid points, the curves limit the rank."],
    ],
  ),
];

// ---------------------------------------------------------------------------
const FP = "functional-pca";
const fpca: Item[] = [
  mcq(
    { concept: FP, slug: "recall-score-definition", cognitive: "recall", level: 1, seconds: 20,
      stem: "How is the $j$-th FPC score of curve $X_i$ defined?" },
    "$\\xi_{ij} = \\int \\big(X_i(t) - \\mu(t)\\big)\\,\\phi_j(t)\\,dt$",
    [
      ["$\\xi_{ij} = X_i(t_j)$", "score-value", "A score projects the whole curve onto $\\phi_j$; it isn't a single value."],
      ["$\\xi_{ij} = \\int \\phi_j(t)\\,dt$", "score-no-data", "That doesn't depend on the curve at all."],
      ["$\\xi_{ij} = \\lambda_j$", "score-eigenvalue", "The eigenvalue is the variance of the scores across curves."],
    ],
  ),
  mcq(
    { concept: FP, slug: "recall-eigenvalue-variance", cognitive: "recall", level: 1.5, seconds: 25,
      stem: "What does the $j$-th FPCA eigenvalue $\\lambda_j$ measure?" },
    "The variance of the $j$-th scores across curves",
    [
      ["The mean of the $j$-th scores", "eigen-mean", "Scores have mean $0$."],
      ["The maximum of $\\phi_j$", "eigen-max", "Eigenfunctions have unit norm; the eigenvalue is a variance."],
      ["The number of curves", "eigen-count", "Eigenvalues measure variation, not sample size."],
    ],
  ),
  mcq(
    { concept: FP, slug: "recall-fve", cognitive: "recall", level: 2, seconds: 25,
      stem: "The fraction of variance explained by the first $K$ components is:" },
    "$\\sum_{j \\le K} \\lambda_j \\big/ \\sum_j \\lambda_j$",
    [
      ["$\\lambda_K / \\lambda_1$", "fve-ratio", "That compares two eigenvalues, not the explained share."],
      ["$K / n$", "fve-count", "It depends on the eigenvalues, not just on $K$."],
      ["$\\lambda_1 \\cdot K$", "fve-product", "That can exceed the total variance."],
    ],
  ),
  mcq(
    { concept: FP, slug: "recall-orthonormal", cognitive: "recall", level: 2, seconds: 25,
      stem: "What relation holds between two different FPC eigenfunctions $\\phi_j$ and $\\phi_k$?" },
    "$\\int \\phi_j(t)\\phi_k(t)\\,dt = 0$ — they are orthogonal (and each has unit norm)",
    [
      ["$\\phi_j(t) = \\phi_k(t)$ at every $t$", "fpc-equal", "Different eigenfunctions are distinct directions."],
      ["$\\phi_j = -\\phi_k$", "fpc-negative", "Opposite functions span the same direction; eigenfunctions of different eigenvalues are orthogonal."],
      ["Their scores are perfectly correlated", "fpc-correlated-scores", "Their scores are uncorrelated."],
    ],
  ),
  mcq(
    { concept: FP, slug: "recall-karhunen-loeve", cognitive: "recall", level: 3, seconds: 35,
      stem: "How is FPCA related to the Karhunen–Loève expansion?" },
    "FPCA is its sample version: estimate $\\mu$ and the covariance, then use the estimated eigenfunctions and scores",
    [
      ["They are unrelated", "kl-unrelated", "Both expand curves in the covariance operator's eigenfunctions."],
      ["Karhunen–Loève applies only to Brownian motion", "kl-bm-only", "It applies to any square-integrable process."],
      ["FPCA uses Fourier functions instead", "kl-fourier", "FPCA's basis is data-adaptive."],
    ],
  ),
  mcq(
    { concept: FP, slug: "recall-pace", cognitive: "recall", level: 3.5, seconds: 35,
      stem: "For sparse data, how does PACE estimate a subject's FPC scores?" },
    "As the conditional expectation of the scores given that subject's observations (a best linear predictor)",
    [
      ["By numerical integration of the few observed points", "pace-integration", "That is what fails with sparse data."],
      ["By setting all scores to $0$", "pace-zero", "That ignores the subject's data entirely."],
      ["By averaging the subject's observations", "pace-average", "An average is one number; scores come from projecting onto each $\\phi_j$ through the covariance model."],
    ],
  ),
  num(
    { concept: FP, slug: "apply-first-share", cognitive: "apply", level: 1.5, seconds: 20,
      stem: "FPCA eigenvalues are $6$, $3$ and $1$ (and no others). What fraction of the variance does the first component explain?" },
    0.6,
  ),
  num(
    { concept: FP, slug: "apply-norm-from-scores", cognitive: "apply", level: 3, seconds: 35,
      stem: "A centred curve is $X - \\mu = 3\\phi_1 + 4\\phi_2$ with orthonormal $\\phi_j$. What is $\\|X - \\mu\\|$?" },
    5,
  ),
  num(
    { concept: FP, slug: "apply-reconstruct-value", cognitive: "apply", level: 3.5, seconds: 45,
      stem: "At time $t_0$, $\\mu(t_0) = 10$, $\\phi_1(t_0) = 0.5$ and $\\phi_2(t_0) = -1$. A curve has scores $\\xi_1 = 2$, $\\xi_2 = 1$. What is its two-component reconstruction at $t_0$?" },
    10,
  ),
  num(
    { concept: FP, slug: "apply-total-variance", cognitive: "apply", level: 6, seconds: 100,
      stem: "On $[0, 1]$, a covariance function is $C(s, t) = 4 + 4\\cos(2\\pi s)\\cos(2\\pi t)$. Compute the total variance $\\int_0^1 C(t, t)\\,dt$." },
    6,
  ),
  num(
    { concept: FP, slug: "apply-pace-one-point", cognitive: "apply", level: 7.5, seconds: 150,
      stem: "A subject has one observation $Y = \\mu(t_1) + \\xi\\phi(t_1) + \\varepsilon$, with $\\xi \\sim \\mathcal{N}(0, 4)$, $\\phi(t_1) = 0.5$, noise variance $1$, and observed $Y - \\mu(t_1) = 2$. Using one component, compute the PACE score $\\mathbb{E}[\\xi \\mid Y]$." },
    2,
  ),
  num(
    { concept: FP, slug: "apply-pace-two-points", cognitive: "apply", level: 9, seconds: 240,
      stem: "Now the subject has two observations with $\\phi(t_1) = \\phi(t_2) = 0.5$, both residuals $Y_k - \\mu(t_k) = 2$, $\\lambda = 4$ and noise variance $1$. Compute $\\mathbb{E}[\\xi \\mid Y_1, Y_2] = \\lambda\\,\\phi^\\top \\Sigma_Y^{-1}(Y - \\mu)$ with $\\Sigma_Y = \\lambda\\phi\\phi^\\top + I$. Give $3$ decimal places." },
    2.667,
  ),
  mcq(
    { concept: FP, slug: "explain-centre", cognitive: "explain", level: 4, seconds: 40,
      stem: "Why are curves centred by subtracting $\\hat{\\mu}(t)$ before FPCA?" },
    "Otherwise the first component mostly captures the mean shape rather than variation around it",
    [
      ["To make all curves positive", "centre-positive", "Centring makes values fluctuate around $0$."],
      ["To make the eigenfunctions orthogonal", "centre-orthogonal", "Eigenfunctions of a symmetric operator are orthogonal regardless."],
      ["It isn't needed", "centre-unneeded", "Uncentred PCA analyses the second-moment operator, dominated by the mean."],
    ],
  ),
  short(
    { concept: FP, slug: "explain-optimal-basis", cognitive: "explain", level: 6, seconds: 120,
      stem: "In what sense are the first $K$ FPC eigenfunctions the best $K$-dimensional basis for representing the curves?" },
    [
      ["criterion", "Among all orthonormal sets of $K$ functions, projecting onto $\\phi_1, \\ldots, \\phi_K$ minimises the expected squared reconstruction error $\\mathbb{E}\\|X - \\mu - \\sum_{k \\le K} \\langle X - \\mu, \\psi_k\\rangle \\psi_k\\|^2$.", 4, true],
      ["value", "The minimal error is $\\sum_{j > K} \\lambda_j$.", 3, true],
    ],
  ),
  short(
    { concept: FP, slug: "explain-smooth-fpca", cognitive: "explain", level: 6.5, seconds: 120,
      stem: "On a dense but noisy grid, raw FPCA eigenfunctions (after the leading few) look jagged. Why, and how does smoothed FPCA help?" },
    [
      ["why", "Later eigenfunctions have small eigenvalues, so noise in the estimated covariance contributes a large share of their shape and makes them rough.", 3, true],
      ["fix", "Smooth the curves or the covariance surface first, or penalise the roughness of $\\phi_j$ (e.g. $\\int \\phi''^2$) in the eigenproblem, trading a little bias for much lower variance.", 4, true],
    ],
  ),
  short(
    { concept: FP, slug: "explain-eigengap", cognitive: "explain", level: 8.5, seconds: 180,
      stem: "Explain why an estimated eigenfunction $\\hat{\\phi}_j$ can be very unstable when $\\lambda_j$ is close to $\\lambda_{j+1}$, even with plenty of data." },
    [
      ["perturbation", "Perturbation theory: the error in $\\hat{\\phi}_j$ scales like $\\|\\hat{\\mathcal{C}} - \\mathcal{C}\\| / \\min_{k \\ne j}|\\lambda_j - \\lambda_k|$, so a small eigengap magnifies estimation error.", 4, true],
      ["rotation", "When two eigenvalues are nearly equal, any rotation within their two-dimensional eigenspace is nearly as good, so the individual eigenfunctions are poorly identified (only their span is stable).", 3, true],
      ["practice", "Interpret the joint span, or report components only above a clear gap.", 1],
    ],
  ),
  short(
    { concept: FP, slug: "explain-first-maximises", cognitive: "explain", level: 8, seconds: 180,
      stem: "Using the expansion $\\mathcal{C}\\psi = \\sum_j \\lambda_j \\langle \\psi, \\phi_j\\rangle \\phi_j$, show that among unit-norm $\\psi$, $\\operatorname{Var}\\langle X, \\psi\\rangle$ is maximised by $\\psi = \\phi_1$." },
    [
      ["variance", "$\\operatorname{Var}\\langle X, \\psi\\rangle = \\langle \\mathcal{C}\\psi, \\psi\\rangle = \\sum_j \\lambda_j c_j^2$ with $c_j = \\langle \\psi, \\phi_j\\rangle$ and $\\sum_j c_j^2 = 1$.", 4, true],
      ["bound", "This is a weighted average of the $\\lambda_j$, so it is at most $\\lambda_1$, attained when $c_1 = 1$, i.e. $\\psi = \\phi_1$.", 4, true],
    ],
  ),
  mcq(
    { concept: FP, slug: "transfer-yield-level", cognitive: "transfer", level: 3, seconds: 35,
      stem: "FPCA of daily yield curves gives a first eigenfunction that is almost flat across maturities. What does its score measure?" },
    "The overall level of yields that day — a parallel shift",
    [
      ["The slope of the curve", "yield-slope", "Slope is typically the second component, which changes sign across maturities."],
      ["The day of the week", "yield-weekday", "Scores measure curve shape, not calendar effects."],
      ["The noise in the data", "yield-noise", "The leading component captures the largest systematic variation."],
    ],
  ),
  mcq(
    { concept: FP, slug: "transfer-outliers", cognitive: "transfer", level: 5.5, seconds: 50,
      stem: "How can FPC scores be used to flag outlying curves?" },
    "Compute $\\sum_{j \\le K} \\xi_{ij}^2/\\lambda_j$ (a truncated Mahalanobis distance) and look for curves with unusually large values, plus the reconstruction residual",
    [
      ["Flag curves whose first score is negative", "outlier-negative", "About half of all curves have negative first scores."],
      ["Flag curves with the largest mean value", "outlier-mean", "That ignores shape outliers."],
      ["Flag curves whose eigenfunctions differ", "outlier-eigenfunctions", "Eigenfunctions are shared by all curves; scores differ."],
    ],
  ),
  short(
    { concept: FP, slug: "transfer-choose-k", cognitive: "transfer", level: 6, seconds: 120,
      stem: "You fit FPCA to $35$ years of daily temperature curves. How would you choose the number of components, and why might the answer differ depending on the downstream task?" },
    [
      ["criteria", "Use a variance-explained threshold, a scree plot, or cross-validated reconstruction error.", 3, true],
      ["task", "For prediction (e.g. regression on scores), choose $K$ by cross-validated prediction error: a low-variance component can matter for the outcome, and extra components add variance.", 3, true],
    ],
  ),
  short(
    { concept: FP, slug: "transfer-sparse-longitudinal", cognitive: "transfer", level: 9, seconds: 240,
      stem: "CD4 counts are measured $2$ to $6$ times per patient at irregular visits over several years. Describe how to estimate each patient's full trajectory with FPCA and how to quantify its uncertainty." },
    [
      ["pooling", "Pool all patients: smooth the mean function and the off-diagonal raw covariances to estimate $\\mu$, $C$, the eigenpairs and the noise variance.", 3, true],
      ["scores", "Predict each patient's scores by $\\mathbb{E}[\\xi \\mid Y_i]$ (PACE) and reconstruct $\\hat{X}_i(t) = \\hat{\\mu}(t) + \\sum_{j \\le K} \\hat{\\xi}_{ij}\\hat{\\phi}_j(t)$.", 3, true],
      ["uncertainty", "Use the conditional covariance of the scores, $\\operatorname{Cov}(\\xi \\mid Y_i)$, to form pointwise bands $\\hat{\\phi}(t)^\\top \\operatorname{Cov}(\\xi \\mid Y_i)\\hat{\\phi}(t)$, possibly with a bootstrap over patients for estimation uncertainty.", 3],
    ],
  ),
  short(
    { concept: FP, slug: "transfer-derive-eigen-equation", cognitive: "transfer", level: 10, seconds: 300,
      stem: "Starting from scratch, derive the eigen-equation $\\int C(s, t)\\phi(t)\\,dt = \\lambda\\phi(s)$ for the first functional principal component by maximising $\\operatorname{Var}\\langle X, \\phi \\rangle$ subject to $\\|\\phi\\| = 1$, and explain why the maximum value is the largest eigenvalue." },
    [
      ["objective", "Write $\\operatorname{Var}\\langle X, \\phi\\rangle = \\int\\!\\!\\int \\phi(s)C(s, t)\\phi(t)\\,ds\\,dt$.", 2, true],
      ["lagrange", "Form $\\int\\!\\!\\int \\phi C \\phi - \\lambda(\\int \\phi^2 - 1)$ and take the variation in direction $h$: $2\\int h(s)\\big[\\int C(s, t)\\phi(t)dt - \\lambda\\phi(s)\\big]ds = 0$ for all $h$ (using symmetry of $C$).", 4, true],
      ["equation", "Hence $\\int C(s, t)\\phi(t)\\,dt = \\lambda\\phi(s)$: stationary points are eigenfunctions.", 2, true],
      ["value", "At such a point the objective equals $\\langle \\mathcal{C}\\phi, \\phi\\rangle = \\lambda$, so the maximum is the largest eigenvalue.", 2],
    ],
  ),
];

// ---------------------------------------------------------------------------
const MF = "multivariate-fpca";
const mfpca: Item[] = [
  mcq(
    { concept: MF, slug: "recall-when", cognitive: "recall", level: 1, seconds: 20,
      stem: "When is multivariate FPCA used instead of ordinary FPCA?" },
    "When each subject has several functional variables observed together",
    [
      ["When each subject has one curve", "mfpca-one-curve", "One curve per subject is ordinary FPCA."],
      ["When the data are scalar", "mfpca-scalar", "Scalar data call for ordinary PCA."],
      ["When curves are very smooth", "mfpca-smooth", "Smoothness doesn't decide between the two."],
    ],
  ),
  mcq(
    { concept: MF, slug: "recall-eigenfunction-form", cognitive: "recall", level: 1.5, seconds: 25,
      stem: "What is a multivariate functional principal component $\\psi_m$?" },
    "A vector of functions $(\\psi_m^{(1)}, \\ldots, \\psi_m^{(p)})$, one per variable",
    [
      ["A single function shared by all variables", "mf-shared", "Each variable gets its own component function."],
      ["A scalar weight", "mf-scalar", "The weights are the scores; components are functions."],
      ["A matrix of covariances", "mf-matrix", "The covariance is what is decomposed; components are its eigenfunctions."],
    ],
  ),
  mcq(
    { concept: MF, slug: "recall-inner-product", cognitive: "recall", level: 2.5, seconds: 35,
      stem: "Which inner product does MFPCA use on $f = (f^{(1)}, \\ldots, f^{(p)})$ and $g$?" },
    "$\\sum_{k=1}^{p} w_k \\langle f^{(k)}, g^{(k)} \\rangle$ with positive weights $w_k$",
    [
      ["$\\prod_k \\langle f^{(k)}, g^{(k)}\\rangle$", "mf-product", "A product of inner products isn't an inner product."],
      ["$\\langle f^{(1)}, g^{(1)}\\rangle$ only", "mf-first-only", "That ignores the other variables."],
      ["$\\max_k \\langle f^{(k)}, g^{(k)}\\rangle$", "mf-max", "A maximum isn't bilinear."],
    ],
  ),
  mcq(
    { concept: MF, slug: "recall-input", cognitive: "recall", level: 2, seconds: 25,
      stem: "In the Happ–Greven algorithm, what goes into the joint eigenanalysis?" },
    "The univariate FPC scores of all variables, stacked per subject",
    [
      ["The raw curves on a common grid", "hg-raw-curves", "The raw curves may live on different domains; scores avoid that."],
      ["The mean functions", "hg-means", "Means are subtracted; they don't carry variation."],
      ["Only the first variable's scores", "hg-first", "All variables contribute."],
    ],
  ),
  mcq(
    { concept: MF, slug: "recall-eigenvalues", cognitive: "recall", level: 3, seconds: 30,
      stem: "In the Happ–Greven approach, what are the multivariate eigenvalues?" },
    "The eigenvalues of the (weighted) covariance matrix of the stacked univariate scores",
    [
      ["The univariate eigenvalues added across variables", "mf-eigen-add", "Adding ignores cross-covariances."],
      ["The largest univariate eigenvalue of each variable", "mf-eigen-max", "Joint components mix variables."],
      ["Always $1$", "mf-eigen-one", "Eigenvalues are variances of the multivariate scores."],
    ],
  ),
  mcq(
    { concept: MF, slug: "recall-max-components", cognitive: "recall", level: 3.5, seconds: 35,
      stem: "If the univariate expansions keep $M_1, \\ldots, M_p$ components, how many multivariate components can Happ–Greven estimate at most?" },
    "$M_+ = \\sum_k M_k$",
    [
      ["$\\max_k M_k$", "mf-max-components", "The stacked score vector has $\\sum_k M_k$ entries."],
      ["$p$", "mf-p-components", "The number of variables doesn't cap the number of components."],
      ["Infinitely many", "mf-infinite", "The joint analysis is a finite PCA."],
    ],
  ),
  num(
    { concept: MF, slug: "apply-components-count", cognitive: "apply", level: 1.5, seconds: 20,
      stem: "Two functional variables keep $4$ and $3$ univariate components. What is the maximum number of multivariate components?" },
    7,
    0.001,
  ),
  num(
    { concept: MF, slug: "apply-weight-small-variance", cognitive: "apply", level: 2.5, seconds: 30,
      stem: "With weights $w_k = 1/\\int \\operatorname{Var}(X^{(k)}(t))\\,dt$, a variable with integrated variance $0.25$ gets what weight?" },
    4,
  ),
  num(
    { concept: MF, slug: "apply-uncorrelated-share", cognitive: "apply", level: 4, seconds: 50,
      stem: "Each of two variables has one univariate score, with variances $4$ and $1$ and zero covariance (unit weights). What fraction of total variance does the first multivariate component explain?" },
    0.8,
  ),
  num(
    { concept: MF, slug: "apply-correlated-eigenvalue", cognitive: "apply", level: 6, seconds: 90,
      stem: "The stacked score covariance matrix is $\\begin{bmatrix} 4 & 2 \\\\ 2 & 1 \\end{bmatrix}$ (unit weights). What is the largest multivariate eigenvalue?" },
    5,
  ),
  num(
    { concept: MF, slug: "apply-multivariate-score", cognitive: "apply", level: 7, seconds: 120,
      stem: "The score covariance matrix is $\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ with unit weights and orthonormal univariate bases. A subject has univariate scores $(1, 3)$. Compute their first multivariate score (with the eigenvector's first entry positive). Give $3$ decimal places." },
    2.828,
  ),
  num(
    { concept: MF, slug: "apply-weighted-share", cognitive: "apply", level: 8.5, seconds: 200,
      stem: "The unweighted score covariance matrix is $\\begin{bmatrix} 4 & 1 \\\\ 1 & 1 \\end{bmatrix}$, one score per variable. Rescale with weights $w = (\\tfrac{1}{4}, 1)$, i.e. analyse $D^{1/2} Z D^{1/2}$ with $D = \\operatorname{diag}(w)$. What fraction of the total weighted variance does the first component explain?" },
    0.75,
  ),
  mcq(
    { concept: MF, slug: "explain-not-concatenate", cognitive: "explain", level: 4, seconds: 45,
      stem: "Why not simply concatenate each subject's curves end-to-end and run ordinary FPCA?" },
    "The variables may be on different domains, grids or units, and concatenation gives an arbitrary weighting and a meaningless “time” axis across the join",
    [
      ["Concatenation loses the mean function", "concat-mean", "The mean can still be estimated; the problems are domain and scaling."],
      ["Concatenation always gives identical results to MFPCA", "concat-identical", "Only in special cases with matching domains and equal weights."],
      ["FPCA can't handle long curves", "concat-long", "Length isn't the issue."],
    ],
  ),
  short(
    { concept: MF, slug: "explain-recover-eigenfunctions", cognitive: "explain", level: 6, seconds: 120,
      stem: "Once the eigenvectors $c_m$ of the stacked score covariance are found, how are the multivariate eigenfunctions $\\psi_m$ obtained?" },
    [
      ["combination", "For each variable $k$, $\\psi_m^{(k)} = \\sum_j [c_m]^{(k)}_j \\phi_j^{(k)}$: the entries of $c_m$ belonging to variable $k$ weight that variable's univariate eigenfunctions.", 5, true],
      ["interpretation", "So each joint component is built from the univariate modes, mixed across variables by $c_m$.", 2],
    ],
  ),
  mcq(
    { concept: MF, slug: "explain-truncation-limit", cognitive: "explain", level: 7.5, seconds: 60,
      stem: "A joint mode of variation involves a pattern in variable $2$ that corresponds to its $5$th univariate FPC, but only $3$ univariate components of variable $2$ were kept. What happens?" },
    "Happ–Greven cannot recover that part of the mode, because multivariate components are built only from the retained univariate bases",
    [
      ["It is recovered anyway from the cross-covariances", "trunc-recovered", "Discarded univariate directions are simply absent from the stacked scores."],
      ["It appears as noise in variable $1$", "trunc-noise", "The discarded information doesn't move to another variable."],
      ["The algorithm fails to run", "trunc-fail", "It runs; it just can't see the discarded direction."],
    ],
  ),
  short(
    { concept: MF, slug: "explain-reduces", cognitive: "explain", level: 7, seconds: 150,
      stem: "When does MFPCA give essentially the same components as running separate univariate FPCAs, and why?" },
    [
      ["condition", "When the scores of different variables are uncorrelated (zero cross-covariance blocks).", 4, true],
      ["why", "The stacked covariance is then block-diagonal, so its eigenvectors lie within single blocks, and each multivariate component is one variable's univariate component (zero in the others), ordered by weighted eigenvalue.", 3, true],
    ],
  ),
  short(
    { concept: MF, slug: "explain-isometry", cognitive: "explain", level: 9, seconds: 240,
      stem: "Explain why, when the univariate bases are orthonormal, the eigenanalysis of the weighted stacked-score covariance matrix gives exactly the MFPCA of the truncated data in the weighted product Hilbert space." },
    [
      ["isometry", "The map sending a truncated multivariate function to its stacked coefficient vector preserves inner products: with orthonormal bases, $\\sum_k w_k\\langle f^{(k)}, g^{(k)}\\rangle$ equals the weighted dot product of the coefficient vectors.", 4, true],
      ["covariance", "Under this isometry the covariance operator on the span corresponds to the weighted score covariance matrix, so eigenvalues match and eigenvectors map to eigenfunctions.", 4, true],
      ["caveat", "This is exact for the truncated data; the approximation error comes from the univariate truncation.", 1],
    ],
  ),
  mcq(
    { concept: MF, slug: "transfer-example", cognitive: "transfer", level: 3, seconds: 30,
      stem: "Which dataset calls for multivariate FPCA?" },
    "$12$-lead ECG recordings, one curve per lead for each patient",
    [
      ["One temperature curve per city", "mf-example-one", "One curve per subject is univariate."],
      ["Blood type and age of each patient", "mf-example-scalar", "These are scalar variables."],
      ["A single long stock-price series", "mf-example-single", "One series is not a sample of multivariate curves."],
    ],
  ),
  short(
    { concept: MF, slug: "transfer-classification", cognitive: "transfer", level: 6, seconds: 120,
      stem: "You want to classify patients as healthy or diseased from three biomarker trajectories each. Describe how MFPCA fits into the pipeline." },
    [
      ["reduce", "Run MFPCA on the three trajectories to get a short vector of multivariate scores per patient.", 3, true],
      ["classify", "Use the scores (plus covariates) as features in a classifier such as logistic regression, choosing the number of components by cross-validation.", 3, true],
      ["leakage", "Fit MFPCA inside the cross-validation folds to avoid leakage.", 1],
    ],
  ),
  mcq(
    { concept: MF, slug: "transfer-sparse-variables", cognitive: "transfer", level: 7, seconds: 60,
      stem: "Each variable is measured sparsely and on its own irregular schedule. How can MFPCA still be applied?" },
    "Estimate each variable's univariate FPCA with a sparse method (e.g. PACE), then run the joint PCA on the predicted scores",
    [
      ["Only by discarding subjects with missing variables", "mf-sparse-drop", "Sparse univariate methods can handle irregular schedules."],
      ["By linearly interpolating all variables onto one grid", "mf-sparse-interpolate", "Interpolating sparse noisy data is unreliable."],
      ["It can't; MFPCA needs dense data", "mf-sparse-impossible", "Happ–Greven only needs univariate scores, however they were obtained."],
    ],
  ),
  short(
    { concept: MF, slug: "transfer-noisy-weights", cognitive: "transfer", level: 8.5, seconds: 200,
      stem: "One of three variables is much noisier than the others. Why can the standard “unit integrated variance” weighting be a poor choice here, and what alternatives exist?" },
    [
      ["problem", "Normalising by integrated variance gives the noisy variable as much weight as the others even though much of its variance is noise, so joint components can be driven by noise.", 4, true],
      ["alternatives", "Weight by signal variance (after smoothing or subtracting estimated noise), use domain-motivated weights, or check the sensitivity of components to the weights.", 3, true],
    ],
  ),
  short(
    { concept: MF, slug: "transfer-gait-design", cognitive: "transfer", level: 9.5, seconds: 300,
      stem: "A gait lab records hip, knee and ankle angle curves over one gait cycle plus a $2$-dimensional plantar-pressure image for each of $200$ participants. Design an MFPCA analysis and name the main decisions that affect the result." },
    [
      ["univariate", "Choose a univariate representation per variable — FPCA for the angle curves, a 2D basis or image FPCA for the pressure image — and how many components to keep for each.", 3, true],
      ["registration", "Decide whether to register gait cycles (e.g. align heel strike) before analysis.", 2],
      ["weights", "Choose weights so no variable dominates purely through units or variance (e.g. unit integrated variance) and check sensitivity.", 3, true],
      ["interpret", "Choose the number of multivariate components (variance explained / cross-validation), interpret them as coordinated patterns across joints and pressure, and validate stability, e.g. by bootstrap.", 2],
    ],
  ),
];

// ---------------------------------------------------------------------------
const FR = "functional-regression";
const functionalRegression: Item[] = [
  mcq(
    { concept: FR, slug: "recall-beta-name", cognitive: "recall", level: 1, seconds: 20,
      stem: "In $Y_i = \\alpha + \\int X_i(t)\\beta(t)\\,dt + \\varepsilon_i$, what is $\\beta(t)$ called?" },
    "The coefficient function",
    [
      ["The mean function", "fr-mean", "The mean function describes $X$, not how $X$ affects $Y$."],
      ["The eigenfunction", "fr-eigen", "Eigenfunctions come from the covariance of $X$."],
      ["The residual", "fr-residual", "The residual is $\\varepsilon_i$."],
    ],
  ),
  mcq(
    { concept: FR, slug: "recall-function-on-scalar", cognitive: "recall", level: 1.5, seconds: 20,
      stem: "In function-on-scalar regression, which part is a function?" },
    "The response",
    [
      ["The predictors", "fos-predictors", "In function-on-scalar the predictors are scalars."],
      ["Both response and predictors", "fos-both", "That is function-on-function regression."],
      ["Neither", "fos-neither", "That is ordinary regression."],
    ],
  ),
  mcq(
    { concept: FR, slug: "recall-fpc-regression", cognitive: "recall", level: 2.5, seconds: 30,
      stem: "What does FPC regression do with the coefficient function?" },
    "Expands $\\beta(t)$ in the first $K$ eigenfunctions of the predictor's covariance",
    [
      ["Fixes $\\beta(t)$ to be constant", "fpcr-constant", "A constant $\\beta$ would reduce to regressing on the curve's integral."],
      ["Estimates $\\beta$ separately at every grid point", "fpcr-pointwise", "That is the ill-posed approach FPC regression avoids."],
      ["Sets $\\beta$ equal to the mean function", "fpcr-mean", "The mean function is unrelated to $\\beta$."],
    ],
  ),
  mcq(
    { concept: FR, slug: "recall-penalty", cognitive: "recall", level: 3, seconds: 30,
      stem: "A penalised-spline fit of $\\beta(t)$ typically adds which term to the least-squares criterion?" },
    "$\\lambda\\int \\beta''(t)^2\\,dt$",
    [
      ["$\\lambda\\int X(t)^2\\,dt$", "penalty-x", "The penalty concerns the coefficient function, not the data."],
      ["$\\lambda \\sum_i |Y_i|$", "penalty-y", "The response isn't penalised."],
      ["$\\lambda \\beta(0)$", "penalty-endpoint", "A single value is not a roughness measure."],
    ],
  ),
  mcq(
    { concept: FR, slug: "recall-functional-logistic", cognitive: "recall", level: 3.5, seconds: 35,
      stem: "How is functional logistic regression defined for a binary outcome?" },
    "$\\operatorname{logit} P(Y_i = 1) = \\alpha + \\int X_i(t)\\beta(t)\\,dt$",
    [
      ["$P(Y_i = 1) = \\alpha + \\int X_i\\beta$", "flogit-identity", "A linear probability can leave $[0, 1]$."],
      ["$\\operatorname{logit} X_i(t) = \\beta(t)$", "flogit-x", "The link applies to the outcome's probability."],
      ["$Y_i = \\int X_i(t)\\,dt$", "flogit-no-beta", "That has no coefficient to estimate."],
    ],
  ),
  mcq(
    { concept: FR, slug: "recall-concurrent", cognitive: "recall", level: 3.5, seconds: 35,
      stem: "Which is the concurrent functional linear model?" },
    "$Y_i(t) = \\beta_0(t) + \\beta_1(t)X_i(t) + \\varepsilon_i(t)$ — the response at $t$ depends only on the predictor at the same $t$",
    [
      ["$Y_i(s) = \\int X_i(t)\\beta(s, t)\\,dt$", "concurrent-fof", "That lets $Y(s)$ depend on the whole predictor curve."],
      ["$Y_i = \\int X_i(t)\\beta(t)\\,dt$", "concurrent-sof", "That has a scalar response."],
      ["$Y_i(t) = \\beta_0 + \\beta_1 z_i$", "concurrent-scalar-coef", "That has constant coefficients and a scalar predictor."],
    ],
  ),
  num(
    { concept: FR, slug: "apply-constant-integral", cognitive: "apply", level: 1.5, seconds: 20,
      stem: "On $[0, 1]$, $\\alpha = 1$, $\\beta(t) = 2$ and $X(t) = 3$ for all $t$. Compute $\\alpha + \\int_0^1 X(t)\\beta(t)\\,dt$." },
    7,
  ),
  num(
    { concept: FR, slug: "apply-linear-integral", cognitive: "apply", level: 3, seconds: 40,
      stem: "On $[0, 1]$, $\\alpha = 0$, $\\beta(t) = t$ and $X(t) = t$. Compute the linear predictor $\\int_0^1 X(t)\\beta(t)\\,dt$. Give $3$ decimal places." },
    0.333,
  ),
  num(
    { concept: FR, slug: "apply-step-predictor", cognitive: "apply", level: 4, seconds: 60,
      stem: "On $[0, 1]$, $\\beta(t) = 6t$ and $X(t) = 1$ for $t \\le 0.5$, $0$ otherwise. Compute $\\int_0^1 X(t)\\beta(t)\\,dt$." },
    0.75,
  ),
  num(
    { concept: FR, slug: "apply-noise-amplification", cognitive: "apply", level: 4.5, seconds: 50,
      stem: "In FPC regression, $\\widehat{\\operatorname{Cov}}(\\xi_2, Y) = 0.1$ and $\\hat{\\lambda}_2 = 0.01$. What is $\\hat{b}_2$?" },
    10,
  ),
  num(
    { concept: FR, slug: "apply-ridge-coefficient", cognitive: "apply", level: 7, seconds: 120,
      stem: "Tikhonov (ridge) regularisation replaces $\\hat{b}_j = \\widehat{\\operatorname{Cov}}(\\xi_j, Y)/\\hat{\\lambda}_j$ with $\\widehat{\\operatorname{Cov}}(\\xi_j, Y)/(\\hat{\\lambda}_j + \\alpha)$. With $\\widehat{\\operatorname{Cov}}(\\xi_2, Y) = 0.1$, $\\hat{\\lambda}_2 = 0.01$ and $\\alpha = 0.09$, what is the regularised $\\hat{b}_2$?" },
    1,
  ),
  num(
    { concept: FR, slug: "apply-truncation-error", cognitive: "apply", level: 8.5, seconds: 200,
      stem: "The true coefficient function is $\\beta = \\phi_1 + 0.5\\,\\phi_3$ in the predictor's eigenbasis, with $\\lambda_3 = 0.4$. FPC regression truncated at $K = 2$ (with coefficients estimated perfectly) omits the $\\phi_3$ term. What expected squared prediction error does this omission add?" },
    0.1,
  ),
  mcq(
    { concept: FR, slug: "explain-not-ols", cognitive: "explain", level: 4, seconds: 45,
      stem: "Why can't you simply regress $Y$ on the $500$ grid values $X_i(t_1), \\ldots, X_i(t_{500})$ by ordinary least squares with $n = 100$ subjects?" },
    "There are more coefficients than observations and adjacent values are nearly collinear, so $X^\\top X$ is singular and the fit is not unique",
    [
      ["OLS can't handle continuous predictors", "not-ols-continuous", "OLS handles continuous predictors routinely."],
      ["The response must also be a curve", "not-ols-response", "A scalar response is fine; the problem is the predictors."],
      ["OLS requires normal predictors", "not-ols-normal", "OLS makes no normality assumption on predictors."],
    ],
  ),
  short(
    { concept: FR, slug: "explain-basis-driven-by-x", cognitive: "explain", level: 7.5, seconds: 150,
      stem: "Compare FPC truncation and a roughness penalty as ways to regularise $\\beta(t)$. What does each assume about where $\\beta$ lives?" },
    [
      ["fpc", "FPC truncation assumes $\\beta$ is well described by the leading eigenfunctions of $X$ — directions chosen by the predictor's variance, without reference to $Y$.", 3, true],
      ["penalty", "A roughness penalty assumes $\\beta$ is smooth, regardless of $X$'s covariance structure.", 3, true],
      ["consequence", "If $\\beta$ is smooth but concentrated in low-variance directions of $X$, the penalty can do better; if $X$'s leading modes carry the signal, truncation is efficient.", 2],
    ],
  ),
  mcq(
    { concept: FR, slug: "explain-pls", cognitive: "explain", level: 8, seconds: 60,
      stem: "What is the main weakness of FPC regression that functional partial least squares addresses?" },
    "The leading FPCs are chosen by variance in $X$ alone and may be unrelated to $Y$; PLS chooses components by covariance with $Y$",
    [
      ["FPC regression can't be computed for sparse data", "pls-sparse", "PACE scores make it computable."],
      ["FPC regression always overfits", "pls-overfit", "With small $K$ it can underfit; the issue is which directions are kept."],
      ["FPC regression ignores the mean function", "pls-mean", "Both approaches centre the data."],
    ],
  ),
  short(
    { concept: FR, slug: "explain-normal-equation", cognitive: "explain", level: 8.5, seconds: 200,
      stem: "For the population model $Y = \\alpha + \\langle X - \\mu, \\beta\\rangle + \\varepsilon$ with $\\varepsilon$ uncorrelated with $X$, derive $\\mathcal{C}\\beta = \\operatorname{Cov}(X, Y)$, where $\\operatorname{Cov}(X, Y)(s) = \\operatorname{Cov}(X(s), Y)$." },
    [
      ["multiply", "Compute $\\operatorname{Cov}(X(s), Y) = \\operatorname{Cov}\\big(X(s), \\int (X(t) - \\mu(t))\\beta(t)\\,dt\\big)$, since $\\varepsilon$ contributes nothing.", 3, true],
      ["fubini", "Exchange covariance and integral: $= \\int C(s, t)\\beta(t)\\,dt = (\\mathcal{C}\\beta)(s)$.", 4, true],
      ["ill-posed", "Notes that solving it requires inverting $\\mathcal{C}$, which is ill-posed.", 1],
    ],
  ),
  mcq(
    { concept: FR, slug: "explain-historical", cognitive: "explain", level: 5, seconds: 45,
      stem: "Why might a historical functional model, $Y(s) = \\int_0^s X(t)\\beta(s, t)\\,dt$, be preferred to an unrestricted function-on-function model?" },
    "It respects causality: the response at time $s$ can depend only on the predictor up to time $s$",
    [
      ["It has more parameters", "historical-more", "It has fewer — the upper triangle of $\\beta(s, t)$ is excluded."],
      ["It avoids needing a coefficient function", "historical-no-beta", "It still estimates $\\beta(s, t)$."],
      ["It applies only to scalar responses", "historical-scalar", "It has a functional response."],
    ],
  ),
  num(
    { concept: FR, slug: "transfer-functional-logistic", cognitive: "transfer", level: 5.5, seconds: 60,
      stem: "A functional logistic model has $\\alpha = -1$ and, for a new subject, $\\int X(t)\\beta(t)\\,dt = 1.5$. What is the predicted probability that $Y = 1$? Give $3$ decimal places." },
    0.622,
  ),
  mcq(
    { concept: FR, slug: "transfer-spectra", cognitive: "transfer", level: 3, seconds: 35,
      stem: "The fat content of meat samples is to be predicted from their near-infrared absorbance spectra ($100$ wavelengths). Which model type fits?" },
    "Scalar-on-function regression",
    [
      ["Function-on-scalar regression", "spectra-fos", "The response (fat content) is a scalar."],
      ["Function-on-function regression", "spectra-fof", "The response is not a curve."],
      ["Ordinary regression on the mean absorbance", "spectra-mean", "Averaging discards where in the spectrum the information lies."],
    ],
  ),
  short(
    { concept: FR, slug: "transfer-interpret-beta", cognitive: "transfer", level: 6.5, seconds: 150,
      stem: "Annual log precipitation of weather stations is regressed on their daily temperature curves. The estimated $\\hat{\\beta}(t)$ is large and positive in autumn and near zero elsewhere. How would you interpret it, and what cautions apply?" },
    [
      ["interpret", "Stations that are warmer than average in autumn tend to have more precipitation, holding the rest of the curve fixed; other seasons contribute little.", 4, true],
      ["caution", "The shape of $\\hat{\\beta}$ depends on the regularisation and is weakly identified; check sensitivity, use confidence bands, and remember it's associational.", 3, true],
    ],
  ),
  short(
    { concept: FR, slug: "transfer-test-no-effect", cognitive: "transfer", level: 8.5, seconds: 200,
      stem: "How would you test $H_0: \\beta(t) \\equiv 0$ in a scalar-on-function regression?" },
    [
      ["fpc-test", "Regress $Y$ on the first $K$ FPC scores and use an overall $F$-test of all $K$ coefficients (with $K$ chosen before testing, or accounting for its selection).", 4, true],
      ["permutation", "Or use a permutation test: permute $Y$ across subjects, refit, and compare a statistic such as $R^2$ to its permutation distribution.", 3, true],
      ["penalised", "Mentions likelihood-ratio tests in the mixed-model form of penalised splines as another option.", 1],
    ],
  ),
  short(
    { concept: FR, slug: "transfer-optimal-k", cognitive: "transfer", level: 10, seconds: 300,
      stem: "In FPC regression suppose $\\lambda_j \\asymp j^{-a}$ and $|b_j| \\asymp j^{-b}$ with $a > 1$ and $a + 2b > 1$. Using the prediction error of truncating at $K$ with $n$ observations and noise variance $\\sigma^2$, derive how the optimal $K$ grows with $n$." },
    [
      ["bias", "Squared bias from omitted components: $\\sum_{j > K} \\lambda_j b_j^2 \\asymp \\sum_{j > K} j^{-a - 2b} \\asymp K^{1 - a - 2b}$.", 3, true],
      ["variance", "Each estimated $\\hat{b}_j$ has variance about $\\sigma^2/(n\\lambda_j)$, contributing $\\lambda_j \\cdot \\sigma^2/(n\\lambda_j) = \\sigma^2/n$ to prediction error, so variance $\\asymp K\\sigma^2/n$.", 3, true],
      ["balance", "Balancing $K^{1 - a - 2b} \\asymp K/n$ gives $K \\asymp n^{1/(a + 2b)}$, and prediction error $\\asymp n^{-(a + 2b - 1)/(a + 2b)}$.", 3, true],
      ["caveat", "Notes that eigenfunction estimation error is ignored, which matters when eigengaps are small.", 1],
    ],
  ),
];

export const functionalDataToThirtyItems: Item[] = [
  ...hilbertSpace,
  ...functionalData,
  ...hilbertSchmidt,
  ...fpca,
  ...mfpca,
  ...functionalRegression,
];
