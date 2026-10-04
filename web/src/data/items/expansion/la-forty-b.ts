import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Linear algebra 40-pass (part B): trace, maps, matrix norms and calculus, spaces, bases, subspaces. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const TR = "trace";
const LT = "linear-transformations";
const MN = "matrix-norms";
const MC = "matrix-calculus";
const LD = "linear-dependence";
const VS = "vector-spaces";
const SP = "span";
const BA = "basis";
const SO = "subspace-operations";
const CB = "change-of-basis";
const FF = "four-fundamental-subspaces";

export const laFortyBItems: Item[] = [
  // --- trace -------------------------------------------------------------------------
  n(TR, "x4l-basic", 4, "Compute $\\operatorname{tr}\\begin{bmatrix}2 & 1\\\\5 & 7\\end{bmatrix}$.", 9),
  n(TR, "x4l-ab", 7, "$\\mathbf{A} = \\begin{bmatrix}1 & 2\\\\3 & 4\\end{bmatrix}$ and $\\mathbf{B} = \\begin{bmatrix}0 & 1\\\\1 & 0\\end{bmatrix}$. Compute $\\operatorname{tr}(\\mathbf{A}\\mathbf{B})$.", 5),
  n(TR, "x4l-eig", 8, "A matrix has eigenvalues $2$, $3$ and $-1$. Compute its trace.", 4),
  n(TR, "x4l-frob", 8, "Compute $\\operatorname{tr}(\\mathbf{A}^\\top \\mathbf{A})$ for $\\mathbf{A} = \\begin{bmatrix}1 & 2\\\\3 & 4\\end{bmatrix}$.", 30),
  s(TR, "x4l-cyclic", 8.5, "Prove $\\operatorname{tr}(\\mathbf{A}\\mathbf{B}) = \\operatorname{tr}(\\mathbf{B}\\mathbf{A})$.",
    "$\\operatorname{tr}(\\mathbf{A}\\mathbf{B}) = \\sum_i\\sum_k a_{ik}b_{ki}$ and $\\operatorname{tr}(\\mathbf{B}\\mathbf{A}) = \\sum_k\\sum_i b_{ki}a_{ik}$ — the same double sum.",
    "It extends to cyclic permutations, $\\operatorname{tr}(\\mathbf{A}\\mathbf{B}\\mathbf{C}) = \\operatorname{tr}(\\mathbf{C}\\mathbf{A}\\mathbf{B})$, but not arbitrary ones: $\\operatorname{tr}(\\mathbf{A}\\mathbf{B}\\mathbf{C}) \\ne \\operatorname{tr}(\\mathbf{A}\\mathbf{C}\\mathbf{B})$ in general. It holds even when $\\mathbf{A}\\mathbf{B}$ and $\\mathbf{B}\\mathbf{A}$ have different sizes."),
  n(TR, "x4l-proj", 8.5, "What is the trace of a rank-$3$ orthogonal projection matrix in $\\mathbb{R}^{10}$?", 3),
  n(TR, "x4l-quad", 9, "$\\mathbf{x}$ has mean $\\mathbf{0}$ and covariance $\\mathbf{I}$, and $\\mathbf{A} = \\operatorname{diag}(1, 2, 3)$. Compute $\\mathbb{E}[\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}]$.", 6),
  s(TR, "x4l-trick", 9, "Derive $\\mathbb{E}[\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}] = \\operatorname{tr}(\\mathbf{A}\\boldsymbol{\\Sigma}) + \\boldsymbol{\\mu}^\\top \\mathbf{A}\\boldsymbol{\\mu}$.",
    "A scalar equals its own trace, so $\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x} = \\operatorname{tr}(\\mathbf{A}\\mathbf{x}\\mathbf{x}^\\top)$; by linearity $\\mathbb{E}[\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}] = \\operatorname{tr}(\\mathbf{A}\\,\\mathbb{E}[\\mathbf{x}\\mathbf{x}^\\top])$.",
    "$\\mathbb{E}[\\mathbf{x}\\mathbf{x}^\\top] = \\boldsymbol{\\Sigma} + \\boldsymbol{\\mu}\\boldsymbol{\\mu}^\\top$, giving $\\operatorname{tr}(\\mathbf{A}\\boldsymbol{\\Sigma}) + \\boldsymbol{\\mu}^\\top \\mathbf{A}\\boldsymbol{\\mu}$. This is how expected residual sums of squares are computed."),
  n(TR, "x4l-hutch", 9, "Hutchinson's estimator uses $\\mathbf{z}^\\top \\mathbf{A}\\mathbf{z}$ with random $\\pm 1$ entries in $\\mathbf{z}$ to estimate $\\operatorname{tr}(\\mathbf{A})$. What is its variance when $\\mathbf{A}$ is diagonal?", 0),
  s(TR, "x4l-unique", 9.5, "Why is the trace (up to scaling) the only linear functional on square matrices with $f(\\mathbf{A}\\mathbf{B}) = f(\\mathbf{B}\\mathbf{A})$?",
    "Such an $f$ vanishes on commutators $\\mathbf{A}\\mathbf{B} - \\mathbf{B}\\mathbf{A}$; the off-diagonal units $\\mathbf{E}_{ij}$ and the differences $\\mathbf{E}_{ii} - \\mathbf{E}_{jj}$ are commutators, so $f$ is determined by one common value on the $\\mathbf{E}_{ii}$.",
    "Hence $f = c \\cdot \\operatorname{tr}$. This similarity invariance is why the trace equals the sum of eigenvalues in any basis."),

  // --- linear-transformations (9) -------------------------------------------------------
  n(LT, "x4l-apply", 7, "$T(x, y) = [2x + y, x - y]$. Find the second component of $T(1, 1)$.", 0),
  n(LT, "x4l-rot", 8, "In the matrix of the rotation by $90^\\circ$ counter-clockwise, what is the $(1, 2)$ entry?", -1),
  n(LT, "x4l-area", 8, "By what factor does $T = \\begin{bmatrix}2 & 1\\\\1 & 3\\end{bmatrix}$ scale areas?", 5),
  n(LT, "x4l-reflect", 8.5, "Reflection across the line $y = x$: find the first component of $T(3, 5)$.", 5),
  s(LT, "x4l-basis", 8.5, "Why is a linear transformation determined by its values on a basis?",
    "Every vector is a unique combination $\\mathbf{v} = \\sum_i c_i\\mathbf{b}_i$ of basis vectors, and linearity forces $T(\\mathbf{v}) = \\sum_i c_iT(\\mathbf{b}_i)$.",
    "Conversely any choice of images for the basis vectors defines a linear map; this is why a matrix (the images of the standard basis as columns) captures $T$ completely."),
  n(LT, "x4l-affine", 9, "$T(\\mathbf{x}) = \\mathbf{x} + [1, 0]$. Find the first component of $T(\\mathbf{0})$ (which shows $T$ isn't linear).", 1),
  n(LT, "x4l-deriv-rank", 9, "What is the rank of differentiation acting on polynomials of degree at most $3$?", 3),
  s(LT, "x4l-deriv", 9, "Describe the kernel and image of differentiation on polynomials of degree at most $3$.",
    "The kernel is the constants (dimension $1$); the image is all polynomials of degree at most $2$ (dimension $3$).",
    "Rank–nullity checks out: $1 + 3 = 4$, the dimension of the domain."),
  s(LT, "x4l-injective", 9.5, "Prove that a linear map is injective if and only if its kernel is $\\lbrace 0\\rbrace$.",
    "If $T$ is injective, $T(\\mathbf{v}) = \\mathbf{0} = T(\\mathbf{0})$ forces $\\mathbf{v} = \\mathbf{0}$.",
    "If the kernel is trivial and $T(\\mathbf{u}) = T(\\mathbf{v})$, then $T(\\mathbf{u} - \\mathbf{v}) = \\mathbf{0}$, so $\\mathbf{u} - \\mathbf{v} = \\mathbf{0}$. Linearity turns “no collisions anywhere” into “no collision at $\\mathbf{0}$”."),

  // --- matrix-norms --------------------------------------------------------------------
  n(MN, "x4l-frob", 4, "Compute the Frobenius norm of $\\begin{bmatrix}1 & 2\\\\2 & 4\\end{bmatrix}$.", 5),
  n(MN, "x4l-one", 7, "Compute $\\|\\mathbf{A}\\|_1$ (the largest absolute column sum) for $\\mathbf{A} = \\begin{bmatrix}1 & -3\\\\2 & 4\\end{bmatrix}$.", 7),
  n(MN, "x4l-inf", 8, "Compute $\\|\\mathbf{A}\\|_\\infty$ (the largest absolute row sum) for the same matrix.", 6),
  n(MN, "x4l-spec-diag", 8, "Compute the spectral norm of $\\operatorname{diag}(3, -5, 2)$.", 5),
  s(MN, "x4l-spectral", 8.5, "Why is the spectral norm equal to the largest singular value?",
    "$\\|\\mathbf{A}\\mathbf{x}\\|^2 = \\mathbf{x}^\\top \\mathbf{A}^\\top \\mathbf{A}\\mathbf{x}$, and over unit vectors this is maximised by the top eigenvector of $\\mathbf{A}^\\top \\mathbf{A}$, with value $\\lambda_{\\max}(\\mathbf{A}^\\top \\mathbf{A}) = \\sigma_1^2$.",
    "So $\\|\\mathbf{A}\\|_2 = \\sigma_1$; for symmetric matrices it's the largest $|\\lambda|$."),
  n(MN, "x4l-rank1", 8.5, "Compute the spectral norm of $\\mathbf{u}\\mathbf{v}^\\top$ with $\\|\\mathbf{u}\\| = 2$ and $\\|\\mathbf{v}\\| = 3$.", 6),
  n(MN, "x4l-frob-sv", 9, "A matrix has singular values $3$ and $4$. Compute its Frobenius norm.", 5),
  n(MN, "x4l-cond", 9, "Compute the $2$-norm condition number of $\\operatorname{diag}(100, 0.5)$.", 200),
  s(MN, "x4l-cond-why", 9, "What does the condition number measure, and why does it matter for solving $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$?",
    "The relative error in $\\mathbf{x}$ can be up to $\\kappa(\\mathbf{A}) = \\|\\mathbf{A}\\|\\|\\mathbf{A}^{-1}\\|$ times the relative error in $\\mathbf{b}$ (or $\\mathbf{A}$).",
    "Roughly $\\log_{10}\\kappa$ digits of accuracy are lost; forming the normal equations squares $\\kappa$, which is why QR is preferred for least squares."),
  s(MN, "x4l-frob-induced", 9.5, "Why isn't the Frobenius norm induced by any vector norm?",
    "Every induced norm has $\\|\\mathbf{I}\\| = \\sup_{\\mathbf{x} \\ne \\mathbf{0}}\\|\\mathbf{x}\\|/\\|\\mathbf{x}\\| = 1$, but $\\|\\mathbf{I}\\|_F = \\sqrt{n}$.",
    "It's still submultiplicative ($\\|\\mathbf{A}\\mathbf{B}\\|_F \\le \\|\\mathbf{A}\\|_F\\|\\mathbf{B}\\|_F$) and consistent with the $2$-norm ($\\|\\mathbf{A}\\mathbf{x}\\|_2 \\le \\|\\mathbf{A}\\|_F\\|\\mathbf{x}\\|_2$)."),

  // --- matrix-calculus ------------------------------------------------------------------
  n(MC, "x4l-linear", 4, "Find the second component of $\\nabla_{\\mathbf{x}}(\\mathbf{a}^\\top \\mathbf{x})$ for $\\mathbf{a} = [1, 2, 3]$.", 2),
  n(MC, "x4l-norm", 7, "Find the first component of $\\nabla(\\mathbf{x}^\\top \\mathbf{x})$ at $\\mathbf{x} = [1, 2]$.", 2),
  n(MC, "x4l-quad", 8, "For $\\mathbf{A} = \\begin{bmatrix}2 & 1\\\\1 & 3\\end{bmatrix}$, find the first component of $\\nabla(\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}) = 2\\mathbf{A}\\mathbf{x}$ at $\\mathbf{x} = [1, 1]$.", 6),
  n(MC, "x4l-hess", 8, "What is the $(1, 2)$ entry of the Hessian of $\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}$ for that $\\mathbf{A}$?", 2),
  s(MC, "x4l-normal", 8.5, "Derive the least squares normal equations using matrix calculus.",
    "$\\nabla_{\\boldsymbol{\\beta}}\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|^2 = -2\\mathbf{X}^\\top(\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta})$; setting it to zero gives $\\mathbf{X}^\\top \\mathbf{X}\\boldsymbol{\\beta} = \\mathbf{X}^\\top \\mathbf{y}$.",
    "The Hessian $2\\mathbf{X}^\\top \\mathbf{X}$ is positive semidefinite, so this stationary point is a minimum (unique when $\\mathbf{X}$ has full column rank)."),
  n(MC, "x4l-trace-grad", 8.5, "$\\frac{\\partial}{\\partial \\mathbf{X}}\\operatorname{tr}(\\mathbf{A}\\mathbf{X}) = \\mathbf{A}^\\top$. For $\\mathbf{A} = \\begin{bmatrix}1 & 2\\\\3 & 4\\end{bmatrix}$, what is the $(1, 2)$ entry of the gradient?", 3),
  n(MC, "x4l-logdet", 9, "$\\frac{\\partial}{\\partial \\mathbf{X}}\\log\\det \\mathbf{X} = \\mathbf{X}^{-\\top}$. For $\\mathbf{X} = \\operatorname{diag}(2, 4)$, what is the $(2, 2)$ entry of the gradient?", 0.25, 0.001),
  s(MC, "x4l-layout", 9, "Explain numerator versus denominator layout in matrix calculus.",
    "They differ in whether the derivative of $\\mathbf{y} \\in \\mathbb{R}^m$ with respect to $\\mathbf{x} \\in \\mathbb{R}^n$ is written as an $m \\times n$ Jacobian (numerator layout) or its $n \\times m$ transpose (denominator layout).",
    "Formulas from different references differ by transposes, so pick one convention and keep it (a gradient of a scalar is usually a column vector)."),
  n(MC, "x4l-ls-grad", 9, "Find the first component of $\\nabla\\|\\mathbf{A}\\mathbf{x} - \\mathbf{b}\\|^2$ at $\\mathbf{x} = \\mathbf{0}$ with $\\mathbf{A} = \\mathbf{I}_2$ and $\\mathbf{b} = [1, 2]$.", -2),
  s(MC, "x4l-mvn", 9.5, "Sketch the derivation of the MLE of $\\Sigma$ for a multivariate normal using matrix calculus.",
    "$\\ell(\\boldsymbol{\\Sigma}) = -\\frac{n}{2}\\log\\det\\boldsymbol{\\Sigma} - \\frac{n}{2}\\operatorname{tr}(\\boldsymbol{\\Sigma}^{-1}\\mathbf{S})$ with $\\mathbf{S}$ the sample covariance (divisor $n$); differentiate in $\\boldsymbol{\\Sigma}^{-1}$ (or use $d\\log\\det\\boldsymbol{\\Sigma} = \\operatorname{tr}(\\boldsymbol{\\Sigma}^{-1}d\\boldsymbol{\\Sigma})$ and $d\\boldsymbol{\\Sigma}^{-1} = -\\boldsymbol{\\Sigma}^{-1}(d\\boldsymbol{\\Sigma})\\boldsymbol{\\Sigma}^{-1}$).",
    "Setting the derivative $-\\frac{n}{2}\\boldsymbol{\\Sigma}^{-1} + \\frac{n}{2}\\boldsymbol{\\Sigma}^{-1}\\mathbf{S}\\boldsymbol{\\Sigma}^{-1}$ to zero gives $\\hat{\\boldsymbol{\\Sigma}} = \\mathbf{S}$."),

  // --- linear-dependence -----------------------------------------------------------------
  n(LD, "x4l-k", 4, "Find $k$ such that $[1, 2]$ and $[3, k]$ are linearly dependent.", 6),
  n(LD, "x4l-max", 7, "What is the largest number of linearly independent vectors in $\\mathbb{R}^3$?", 3),
  n(LD, "x4l-det", 8, "Compute $\\det$ of the matrix with rows $[1, 2, 3]$, $[4, 5, 6]$, $[7, 8, 9]$.", 0),
  n(LD, "x4l-coef", 8, "Write $[7, 8, 9] = a(1, 2, 3) + c(4, 5, 6)$. Find $c$.", 2),
  s(LD, "x4l-four", 8.5, "Why are any four vectors in $\\mathbb{R}^3$ linearly dependent?",
    "Finding coefficients with $\\sum_i c_i\\mathbf{v}_i = \\mathbf{0}$ is a homogeneous system of $3$ equations in $4$ unknowns, which always has a nonzero solution (there's at least one free variable).",
    "In general, any set with more vectors than the dimension is dependent."),
  n(LD, "x4l-wronskian", 8.5, "Compute the Wronskian of $1$, $x$, $x^2$ at $x = 1$.", 2),
  n(LD, "x4l-random", 9, "Two random vectors in $\\mathbb{R}^2$ have independent, equally likely $\\pm 1$ entries. What is the probability they are linearly dependent?", 0.5, 0.001),
  s(LD, "x4l-functions", 9, "Show that $\\sin x$, $\\cos x$ and $e^x$ are linearly independent functions.",
    "Suppose $a\\sin x + b\\cos x + ce^x = 0$ for all $x$. As $x \\to \\infty$, the bounded trig terms can't cancel $ce^x$, so $c = 0$.",
    "Then $x = 0$ gives $b = 0$ and $x = \\pi/2$ gives $a = 0$ (alternatively, the Wronskian is nonzero somewhere)."),
  n(LD, "x4l-rank", 9, "How many linearly independent columns does $\\begin{bmatrix}1 & 2 & 3\\\\2 & 4 & 6\\\\1 & 0 & 1\\end{bmatrix}$ have?", 2),
  s(LD, "x4l-regression", 9.5, "Why do linearly dependent columns in a design matrix make regression coefficients non-identifiable?",
    "If $\\mathbf{X}\\mathbf{v} = \\mathbf{0}$ for some $\\mathbf{v} \\ne \\mathbf{0}$, then $\\mathbf{X}\\boldsymbol{\\beta} = \\mathbf{X}(\\boldsymbol{\\beta} + t\\mathbf{v})$ for every $t$: different coefficient vectors give identical fitted values, so the data can't distinguish them.",
    "$\\mathbf{X}^\\top \\mathbf{X}$ is singular; fixes are dropping a column (e.g. the dummy-variable trap), constraints, or regularisation such as ridge."),

  // --- vector-spaces ---------------------------------------------------------------------
  m(VS, "x4l-which", 4, "Which of these is a vector space under the usual operations?", "Polynomials of degree at most $3$",
    [["Polynomials of degree exactly $3$", "Not closed under addition (leading terms can cancel), and $0$ isn't included."], ["Vectors in $\\mathbb{R}^2$ with positive entries", "Not closed under negation."], ["The unit circle in $\\mathbb{R}^2$", "Not closed under addition or scaling."]]),
  n(VS, "x4l-sym", 7, "What is the dimension of the space of $3 \\times 3$ symmetric matrices?", 6),
  n(VS, "x4l-poly", 8, "What is the dimension of the space of polynomials of degree at most $5$?", 6),
  n(VS, "x4l-hyperplane", 8, "What is the dimension of $\\lbrace \\mathbf{x} \\in \\mathbb{R}^4 : x_1 + x_2 + x_3 + x_4 = 0\\rbrace$?", 3),
  s(VS, "x4l-not", 8.5, "Why isn't $\\lbrace(x, y) : xy \\ge 0\\rbrace$ a subspace of $\\mathbb{R}^2$?",
    "It's closed under scaling but not under addition: $[1, 0]$ and $[0, -1]$ are in it, but their sum $[1, -1]$ has $xy = -1 < 0$.",
    "It's a union of two quadrant cones; subspaces must be closed under both operations."),
  n(VS, "x4l-ode", 8.5, "What is the dimension of the solution space of $y'' + y = 0$?", 2),
  n(VS, "x4l-traceless", 9, "What is the dimension of the space of $4 \\times 4$ matrices with trace $0$?", 15),
  s(VS, "x4l-infinite", 9, "Why is the space of continuous functions on $[0, 1]$ infinite-dimensional?",
    "The monomials $1, x, x^2, \\ldots, x^n$ are linearly independent for every $n$ (a nonzero polynomial has finitely many roots).",
    "So no finite set can span the space, and its dimension is infinite."),
  n(VS, "x4l-recurrence", 9, "What is the dimension of the space of sequences satisfying $a_{n+2} = a_{n+1} + a_n$?", 2),
  s(VS, "x4l-field", 9.5, "Why does the field of scalars matter? Compare $\\mathbb{C}$ as a real and as a complex vector space.",
    "Over $\\mathbb{C}$, the complex numbers form a $1$-dimensional space (basis $\\lbrace 1\\rbrace$); over the reals they're $2$-dimensional (basis $\\lbrace 1, i\\rbrace$).",
    "The field also governs which results hold: every real matrix has eigenvalues over $\\mathbb{C}$, but a rotation of $\\mathbb{R}^2$ has none over the reals."),

  // --- span ----------------------------------------------------------------------------
  n(SP, "x4l-dim", 4, "What is the dimension of $\\operatorname{span}\\lbrace(1, 0, 0), [0, 1, 0], [1, 1, 0]\\rbrace$?", 2),
  n(SP, "x4l-coef", 7, "Write $[2, 3, 0] = a(1, 0, 0) + b(0, 1, 0)$. Find $a$.", 2),
  n(SP, "x4l-dim2", 8, "What is the dimension of $\\operatorname{span}\\lbrace(1, 2, 3), [2, 4, 6], [0, 1, 1]\\rbrace$?", 2),
  n(SP, "x4l-k", 8, "Find $k$ such that $[1, k, 5] \\in \\operatorname{span}\\lbrace(1, 1, 1), [0, 1, 2]\\rbrace$.", 3),
  s(SP, "x4l-smallest", 8.5, "Show that $\\operatorname{span}(S)$ is the smallest subspace containing $S$.",
    "The span is closed under addition and scaling (a combination of combinations is a combination), so it's a subspace containing $S$.",
    "Any subspace containing $S$ must contain every linear combination of $S$'s vectors, so it contains the span."),
  n(SP, "x4l-plane", 8.5, "How many vectors are needed to span the plane $x - 2y + z = 0$ in $\\mathbb{R}^3$?", 2),
  n(SP, "x4l-cols", 9, "What is the dimension of the span of the columns of $\\begin{bmatrix}1 & 1\\\\1 & 1\\\\1 & 1\\end{bmatrix}$?", 1),
  s(SP, "x4l-solvable", 9, "Relate span to the solvability of $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$.",
    "$\\mathbf{A}\\mathbf{x}$ is a linear combination of the columns of $\\mathbf{A}$ with weights $\\mathbf{x}$, so $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ is solvable exactly when $\\mathbf{b}$ lies in the span of the columns (the column space).",
    "If the columns span $\\mathbb{R}^m$ (rank $m$), every $\\mathbf{b}$ is reachable."),
  n(SP, "x4l-poly", 9, "What is the dimension of $\\operatorname{span}\\lbrace 1 + x, 1 - x, x^2\\rbrace$?", 3),
  s(SP, "x4l-random", 9.5, "Do $n$ random Gaussian vectors span $\\mathbb{R}^n$? What changes for random $\\pm 1$ vectors?",
    "With probability $1$: the set where the determinant vanishes has measure zero, so continuous random vectors are almost surely independent (though possibly ill-conditioned).",
    "With discrete $\\pm1$ entries there's a positive probability of dependence (e.g. two equal rows), though it tends to $0$ as $n$ grows."),

  // --- basis ----------------------------------------------------------------------------
  n(BA, "x4l-size", 4, "How many vectors are in a basis of $\\mathbb{R}^5$?", 5),
  n(BA, "x4l-coord1", 7, "Find the first coordinate of $[3, 5]$ in the basis $\\lbrace(1, 1), [1, -1]\\rbrace$.", 4),
  n(BA, "x4l-coord2", 8, "Find the second coordinate.", -1),
  n(BA, "x4l-taylor", 8, "Write $x^2$ in the basis $1, (x - 1), (x - 1)^2, (x - 1)^3$. What is the coefficient of $(x - 1)^2$?", 1),
  s(BA, "x4l-same-size", 8.5, "Why do all bases of a finite-dimensional space have the same number of elements?",
    "The Steinitz exchange lemma: any linearly independent set has at most as many vectors as any spanning set.",
    "A basis is both, so for two bases $B$ and $C$, $|B| \\le |C|$ and $|C| \\le |B|$ — which makes dimension well defined."),
  n(BA, "x4l-taylor2", 8.5, "In the same basis, what is the coefficient of $(x - 1)$ in $x^2$?", 2),
  n(BA, "x4l-z2", 9, "How many ordered bases does the vector space of pairs over the $2$-element field ($\\mathbb{Z}_2^2$) have?", 6),
  s(BA, "x4l-onb", 9, "Why are coordinates easier to compute in an orthonormal basis?",
    "In a general basis, with the basis vectors as the columns of $\\mathbf{B}$, finding coordinates means solving $\\mathbf{B}\\mathbf{c} = \\mathbf{v}$.",
    "In an orthonormal basis each coordinate is just a dot product, $c_i = \\mathbf{q}_i \\cdot \\mathbf{v}$, and lengths and angles are preserved."),
  n(BA, "x4l-coord3", 9, "Find the first coordinate of $[2, 1]$ in the basis $\\lbrace(1, 2), [3, 4]\\rbrace$.", -2.5, 0.001),
  s(BA, "x4l-hamel", 9.5, "Why does an infinite-dimensional space like the continuous functions need a different notion of basis?",
    "A Hamel basis allows only finite linear combinations; for such spaces it exists (by the axiom of choice) but is uncountable and can't be written down.",
    "Analysis uses Schauder or orthonormal bases with convergent infinite series, e.g. Fourier series in $L^2$."),

  // --- subspace-operations -------------------------------------------------------------------
  n(SO, "x4l-sum", 4, "$\\dim U = 2$, $\\dim W = 2$ and $\\dim(U \\cap W) = 1$. Compute $\\dim(U + W)$.", 3),
  n(SO, "x4l-planes", 7, "Two distinct planes through the origin in $\\mathbb{R}^3$ intersect in a subspace of what dimension?", 1),
  n(SO, "x4l-min-int", 8, "In $\\mathbb{R}^5$, $\\dim U = 3$ and $\\dim W = 4$. What is the smallest possible $\\dim(U \\cap W)$?", 2),
  n(SO, "x4l-complement", 8, "What is the dimension of the orthogonal complement of a $2$-dimensional subspace of $\\mathbb{R}^7$?", 5),
  s(SO, "x4l-union", 8.5, "Why is the union of two subspaces usually not a subspace?",
    "The union of the $x$-axis and the $y$-axis contains $[1, 0]$ and $[0, 1]$ but not their sum $[1, 1]$.",
    "The union is a subspace only when one subspace contains the other; the smallest subspace containing both is $U + W$."),
  n(SO, "x4l-int", 8.5, "$U = \\operatorname{span}\\lbrace(1, 0, 0), [0, 1, 0]\\rbrace$ and $W = \\operatorname{span}\\lbrace(0, 1, 0), [0, 0, 1]\\rbrace$. Compute $\\dim(U \\cap W)$.", 1),
  n(SO, "x4l-sum2", 9, "For the same $U$ and $W$, compute $\\dim(U + W)$.", 3),
  s(SO, "x4l-direct", 9, "What is a direct sum, and how can you recognise one?",
    "$V = U \\oplus W$ when every $\\mathbf{v} \\in V$ is uniquely $\\mathbf{u} + \\mathbf{w}$ with $\\mathbf{u} \\in U$ and $\\mathbf{w} \\in W$.",
    "Equivalently $U + W = V$ and $U \\cap W = \\lbrace \\mathbf{0} \\rbrace$, or $\\dim U + \\dim W = \\dim V$ with trivial intersection."),
  n(SO, "x4l-oblique", 9, "Project $[0, 1]$ onto $U = \\operatorname{span}\\lbrace(1, 0)\\rbrace$ along $W = \\operatorname{span}\\lbrace(1, 1)\\rbrace$. Find the first component of the result.", -1),
  s(SO, "x4l-dim-formula", 9.5, "Prove $\\dim(U + W) = \\dim U + \\dim W - \\dim(U \\cap W)$.",
    "Take a basis $\\mathbf{b}_1, \\ldots, \\mathbf{b}_k$ of $U \\cap W$, extend it to a basis of $U$ with $\\mathbf{u}_1, \\ldots, \\mathbf{u}_p$ and to a basis of $W$ with $\\mathbf{w}_1, \\ldots, \\mathbf{w}_q$.",
    "Show all the $\\mathbf{b}$'s, $\\mathbf{u}$'s and $\\mathbf{w}$'s together are independent and span $U + W$; so $\\dim(U + W) = k + p + q = (k + p) + (k + q) - k$."),

  // --- change-of-basis ------------------------------------------------------------------------
  n(CB, "x4l-scaled", 4, "In the basis $\\lbrace(2, 0), [0, 3]\\rbrace$, find the second coordinate of $[4, 9]$.", 3),
  n(CB, "x4l-to-std", 7, "The columns of $\\mathbf{P} = \\begin{bmatrix}1 & 1\\\\0 & 1\\end{bmatrix}$ form a basis $B$. If $[\\mathbf{x}]_B = [2, 3]$, find the first standard coordinate of $\\mathbf{x}$.", 5),
  n(CB, "x4l-to-b", 8, "With the same $\\mathbf{P}$, find the first $B$-coordinate of the standard vector $[5, 3]$.", 2),
  n(CB, "x4l-trace", 8, "$\\mathbf{A} = \\begin{bmatrix}2 & 1\\\\0 & 3\\end{bmatrix}$. Compute $\\operatorname{tr}(\\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P})$ for any invertible $\\mathbf{P}$.", 5),
  s(CB, "x4l-similar", 8.5, "Why do similar matrices represent the same linear map?",
    "If the columns of $\\mathbf{P}$ are a new basis, $\\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P}$ is the matrix of the same map $\\mathbf{x} \\mapsto \\mathbf{A}\\mathbf{x}$ written in the new coordinates: convert to standard coordinates, apply $\\mathbf{A}$, convert back.",
    "So similar matrices share every basis-independent property: eigenvalues, trace, determinant, rank, characteristic polynomial."),
  n(CB, "x4l-rotated", 8.5, "Rotate the standard basis by $30^\\circ$. Find the first coordinate of $[1, 0]$ in the rotated basis.", 0.866, 0.001),
  n(CB, "x4l-eigbasis", 9, "$\\mathbf{A} = \\begin{bmatrix}4 & 1\\\\2 & 3\\end{bmatrix}$ has eigenvectors $[1, 1]$ (eigenvalue $5$) and $[1, -2]$ (eigenvalue $2$). In that basis, what is the $(1, 1)$ entry of the matrix of $\\mathbf{A}$?", 5),
  s(CB, "x4l-contra", 9, "Why do coordinates transform with $\\mathbf{P}^{-1}$ while basis vectors transform with $\\mathbf{P}$?",
    "If the new basis vectors are the columns of $\\mathbf{P}$ (written in old coordinates), then $\\mathbf{x} = \\mathbf{P}[\\mathbf{x}]_{\\text{new}}$, so $[\\mathbf{x}]_{\\text{new}} = \\mathbf{P}^{-1}\\mathbf{x}$.",
    "The basis and the coordinates change in opposite ways so the vector itself is unchanged (contravariance of coordinates)."),
  n(CB, "x4l-congruent", 9, "With $\\mathbf{A} = \\mathbf{I}$ and $\\mathbf{P} = \\begin{bmatrix}1 & 1\\\\0 & 1\\end{bmatrix}$, compute the $(2, 2)$ entry of $\\mathbf{P}^\\top \\mathbf{A}\\mathbf{P}$.", 2),
  s(CB, "x4l-sim-vs-cong", 9.5, "Distinguish similarity $\\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P}$ from congruence $\\mathbf{P}^\\top \\mathbf{A}\\mathbf{P}$, and say which applies to linear maps and which to quadratic forms.",
    "Linear maps change by similarity, which preserves eigenvalues. Quadratic forms $\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}$ (and bilinear forms) change by congruence when $\\mathbf{x} = \\mathbf{P}\\mathbf{y}$.",
    "Congruence doesn't preserve eigenvalues, only their signs: by Sylvester's law of inertia, the numbers of positive, negative and zero eigenvalues are invariant. For orthogonal $\\mathbf{P}$ the two coincide."),

  // --- four-fundamental-subspaces --------------------------------------------------------------
  n(FF, "x4l-null", 4, "$\\mathbf{A}$ is $5 \\times 3$ with rank $2$. What is the dimension of its null space?", 1),
  n(FF, "x4l-leftnull", 7, "For the same $\\mathbf{A}$, what is the dimension of the left null space?", 3),
  n(FF, "x4l-row", 8, "What is the dimension of its row space?", 2),
  n(FF, "x4l-nullvec", 8, "The null space of $\\begin{bmatrix}1 & 2\\\\2 & 4\\end{bmatrix}$ is spanned by a vector with first component $-2$. What is its second component?", 1),
  s(FF, "x4l-orth", 8.5, "State the orthogonality relations among the four fundamental subspaces of an $m \\times n$ matrix.",
    "In $\\mathbb{R}^n$, the null space is the orthogonal complement of the row space; in $\\mathbb{R}^m$, the left null space is the orthogonal complement of the column space.",
    "Hence $\\dim(\\text{row}) + \\dim(\\text{null}) = n$ and $\\dim(\\text{col}) + \\dim(\\text{left null}) = m$, with row and column spaces both of dimension $r$."),
  n(FF, "x4l-sym-leftnull", 8.5, "What is the dimension of the left null space of $\\begin{bmatrix}1 & 2\\\\2 & 4\\end{bmatrix}$?", 1),
  n(FF, "x4l-wide", 9, "$\\mathbf{A}$ is $4 \\times 6$ with rank $4$. What is the dimension of its null space?", 2),
  s(FF, "x4l-fredholm", 9, "Explain the Fredholm alternative for $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$.",
    "$\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ is solvable if and only if $\\mathbf{b}$ is orthogonal to every $\\mathbf{y}$ with $\\mathbf{A}^\\top \\mathbf{y} = \\mathbf{0}$ (the left null space).",
    "So either the system has a solution, or there's a $\\mathbf{y}$ with $\\mathbf{A}^\\top \\mathbf{y} = \\mathbf{0}$ and $\\mathbf{y}^\\top \\mathbf{b} \\ne 0$ that certifies it has none."),
  n(FF, "x4l-consistent", 9, "$\\mathbf{A} = \\begin{bmatrix}1 & 1\\\\1 & 1\\\\1 & 1\\end{bmatrix}$ and $\\mathbf{b} = [1, 1, c]$. For which $c$ is $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ solvable?", 1),
  s(FF, "x4l-svd", 9.5, "How does the SVD give orthonormal bases for all four fundamental subspaces?",
    "With $\\mathbf{A} = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$ of rank $r$: the first $r$ columns of $\\mathbf{U}$ span the column space and the rest the left null space; the first $r$ columns of $\\mathbf{V}$ span the row space and the rest the null space.",
    "$\\mathbf{A}$ maps $\\mathbf{v}_i$ to $\\sigma_i\\mathbf{u}_i$ for $i \\le r$ and kills the other $\\mathbf{v}_i$, so the SVD shows exactly how $\\mathbf{A}$ moves the row space onto the column space."),
];
