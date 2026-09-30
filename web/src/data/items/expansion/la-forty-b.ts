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
  n(TR, "x4l-basic", 4, "Compute $\\mathrm{tr}\\begin{pmatrix}2 & 1\\\\5 & 7\\end{pmatrix}$.", 9),
  n(TR, "x4l-ab", 7, "$A = \\begin{pmatrix}1 & 2\\\\3 & 4\\end{pmatrix}$ and $B = \\begin{pmatrix}0 & 1\\\\1 & 0\\end{pmatrix}$. Compute $\\mathrm{tr}(AB)$.", 5),
  n(TR, "x4l-eig", 8, "A matrix has eigenvalues $2$, $3$ and $-1$. Compute its trace.", 4),
  n(TR, "x4l-frob", 8, "Compute $\\mathrm{tr}(A^\\top A)$ for $A = \\begin{pmatrix}1 & 2\\\\3 & 4\\end{pmatrix}$.", 30),
  s(TR, "x4l-cyclic", 8.5, "Prove $\\mathrm{tr}(AB) = \\mathrm{tr}(BA)$.",
    "$\\mathrm{tr}(AB) = \\sum_i\\sum_ka_{ik}b_{ki}$ and $\\mathrm{tr}(BA) = \\sum_k\\sum_ib_{ki}a_{ik}$ — the same double sum.",
    "It extends to cyclic permutations, $\\mathrm{tr}(ABC) = \\mathrm{tr}(CAB)$, but not arbitrary ones: $\\mathrm{tr}(ABC) \\ne \\mathrm{tr}(ACB)$ in general. It holds even when $AB$ and $BA$ have different sizes."),
  n(TR, "x4l-proj", 8.5, "What is the trace of a rank-$3$ orthogonal projection matrix in $\\mathcal{R}^{10}$?", 3),
  n(TR, "x4l-quad", 9, "$x$ has mean $0$ and covariance $I$, and $A = \\mathrm{diag}(1, 2, 3)$. Compute $\\mathbb{E}[x^\\top Ax]$.", 6),
  s(TR, "x4l-trick", 9, "Derive $\\mathbb{E}[x^\\top Ax] = \\mathrm{tr}(A\\Sigma) + \\mu^\\top A\\mu$.",
    "A scalar equals its own trace, so $x^\\top Ax = \\mathrm{tr}(Axx^\\top)$; by linearity $\\mathbb{E}[x^\\top Ax] = \\mathrm{tr}(A\\mathbb{E}[xx^\\top])$.",
    "$\\mathbb{E}[xx^\\top] = \\Sigma + \\mu\\mu^\\top$, giving $\\mathrm{tr}(A\\Sigma) + \\mu^\\top A\\mu$. This is how expected residual sums of squares are computed."),
  n(TR, "x4l-hutch", 9, "Hutchinson's estimator uses $z^\\top Az$ with random $\\pm1$ entries in $z$ to estimate $\\mathrm{tr}(A)$. What is its variance when $A$ is diagonal?", 0),
  s(TR, "x4l-unique", 9.5, "Why is the trace (up to scaling) the only linear functional on square matrices with $f(AB) = f(BA)$?",
    "Such an $f$ vanishes on commutators $AB - BA$; the off-diagonal units $E_{ij}$ and the differences $E_{ii} - E_{jj}$ are commutators, so $f$ is determined by one common value on the $E_{ii}$.",
    "Hence $f = c \\cdot \\mathrm{tr}$. This similarity invariance is why the trace equals the sum of eigenvalues in any basis."),

  // --- linear-transformations (9) -------------------------------------------------------
  n(LT, "x4l-apply", 7, "$T(x, y) = (2x + y, x - y)$. Find the second component of $T(1, 1)$.", 0),
  n(LT, "x4l-rot", 8, "In the matrix of the rotation by $90°$ counter-clockwise, what is the $(1, 2)$ entry?", -1),
  n(LT, "x4l-area", 8, "By what factor does $T = \\begin{pmatrix}2 & 1\\\\1 & 3\\end{pmatrix}$ scale areas?", 5),
  n(LT, "x4l-reflect", 8.5, "Reflection across the line $y = x$: find the first component of $T(3, 5)$.", 5),
  s(LT, "x4l-basis", 8.5, "Why is a linear transformation determined by its values on a basis?",
    "Every vector is a unique combination $v = \\sum c_ib_i$ of basis vectors, and linearity forces $T(v) = \\sum c_iT(b_i)$.",
    "Conversely any choice of images for the basis vectors defines a linear map; this is why a matrix (the images of the standard basis as columns) captures $T$ completely."),
  n(LT, "x4l-affine", 9, "$T(x) = x + (1, 0)$. Find the first component of $T(0)$ (which shows $T$ isn't linear).", 1),
  n(LT, "x4l-deriv-rank", 9, "What is the rank of differentiation acting on polynomials of degree at most $3$?", 3),
  s(LT, "x4l-deriv", 9, "Describe the kernel and image of differentiation on polynomials of degree at most $3$.",
    "The kernel is the constants (dimension $1$); the image is all polynomials of degree at most $2$ (dimension $3$).",
    "Rank–nullity checks out: $1 + 3 = 4$, the dimension of the domain."),
  s(LT, "x4l-injective", 9.5, "Prove that a linear map is injective if and only if its kernel is $\\lbrace 0\\rbrace$.",
    "If $T$ is injective, $T(v) = 0 = T(0)$ forces $v = 0$.",
    "If the kernel is trivial and $T(u) = T(v)$, then $T(u - v) = 0$, so $u - v = 0$. Linearity turns “no collisions anywhere” into “no collision at $0$”."),

  // --- matrix-norms --------------------------------------------------------------------
  n(MN, "x4l-frob", 4, "Compute the Frobenius norm of $\\begin{pmatrix}1 & 2\\\\2 & 4\\end{pmatrix}$.", 5),
  n(MN, "x4l-one", 7, "Compute $\\|A\\|_1$ (the largest absolute column sum) for $A = \\begin{pmatrix}1 & -3\\\\2 & 4\\end{pmatrix}$.", 7),
  n(MN, "x4l-inf", 8, "Compute $\\|A\\|_\\infty$ (the largest absolute row sum) for the same matrix.", 6),
  n(MN, "x4l-spec-diag", 8, "Compute the spectral norm of $\\mathrm{diag}(3, -5, 2)$.", 5),
  s(MN, "x4l-spectral", 8.5, "Why is the spectral norm equal to the largest singular value?",
    "$\\|Ax\\|^2 = x^\\top A^\\top Ax$, and over unit vectors this is maximised by the top eigenvector of $A^\\top A$, with value $\\lambda_{\\max}(A^\\top A) = \\sigma_1^2$.",
    "So $\\|A\\|_2 = \\sigma_1$; for symmetric matrices it's the largest $|\\lambda|$."),
  n(MN, "x4l-rank1", 8.5, "Compute the spectral norm of $uv^\\top$ with $\\|u\\| = 2$ and $\\|v\\| = 3$.", 6),
  n(MN, "x4l-frob-sv", 9, "A matrix has singular values $3$ and $4$. Compute its Frobenius norm.", 5),
  n(MN, "x4l-cond", 9, "Compute the $2$-norm condition number of $\\mathrm{diag}(100, 0.5)$.", 200),
  s(MN, "x4l-cond-why", 9, "What does the condition number measure, and why does it matter for solving $Ax = b$?",
    "The relative error in $x$ can be up to $\\kappa(A) = \\|A\\|\\|A^{-1}\\|$ times the relative error in $b$ (or $A$).",
    "Roughly $\\log_{10}\\kappa$ digits of accuracy are lost; forming the normal equations squares $\\kappa$, which is why QR is preferred for least squares."),
  s(MN, "x4l-frob-induced", 9.5, "Why isn't the Frobenius norm induced by any vector norm?",
    "Every induced norm has $\\|I\\| = \\sup_{x \\ne 0}\\|x\\|/\\|x\\| = 1$, but $\\|I\\|_F = \\sqrt{n}$.",
    "It's still submultiplicative ($\\|AB\\|_F \\le \\|A\\|_F\\|B\\|_F$) and consistent with the $2$-norm ($\\|Ax\\|_2 \\le \\|A\\|_F\\|x\\|_2$)."),

  // --- matrix-calculus ------------------------------------------------------------------
  n(MC, "x4l-linear", 4, "Find the second component of $\\nabla_x(a^\\top x)$ for $a = (1, 2, 3)$.", 2),
  n(MC, "x4l-norm", 7, "Find the first component of $\\nabla(x^\\top x)$ at $x = (1, 2)$.", 2),
  n(MC, "x4l-quad", 8, "For $A = \\begin{pmatrix}2 & 1\\\\1 & 3\\end{pmatrix}$, find the first component of $\\nabla(x^\\top Ax) = 2Ax$ at $x = (1, 1)$.", 6),
  n(MC, "x4l-hess", 8, "What is the $(1, 2)$ entry of the Hessian of $x^\\top Ax$ for that $A$?", 2),
  s(MC, "x4l-normal", 8.5, "Derive the least squares normal equations using matrix calculus.",
    "$\\nabla_\\beta\\|y - X\\beta\\|^2 = -2X^\\top(y - X\\beta)$; setting it to zero gives $X^\\top X\\beta = X^\\top y$.",
    "The Hessian $2X^\\top X$ is positive semidefinite, so this stationary point is a minimum (unique when $X$ has full column rank)."),
  n(MC, "x4l-trace-grad", 8.5, "$\\frac{\\partial}{\\partial X}\\mathrm{tr}(AX) = A^\\top$. For $A = \\begin{pmatrix}1 & 2\\\\3 & 4\\end{pmatrix}$, what is the $(1, 2)$ entry of the gradient?", 3),
  n(MC, "x4l-logdet", 9, "$\\frac{\\partial}{\\partial X}\\log\\det X = X^{-\\top}$. For $X = \\mathrm{diag}(2, 4)$, what is the $(2, 2)$ entry of the gradient?", 0.25, 0.001),
  s(MC, "x4l-layout", 9, "Explain numerator versus denominator layout in matrix calculus.",
    "They differ in whether the derivative of $y \\in \\mathcal{R}^m$ with respect to $x \\in \\mathcal{R}^n$ is written as an $m \\times n$ Jacobian (numerator layout) or its $n \\times m$ transpose (denominator layout).",
    "Formulas from different references differ by transposes, so pick one convention and keep it (a gradient of a scalar is usually a column vector)."),
  n(MC, "x4l-ls-grad", 9, "Find the first component of $\\nabla\\|Ax - b\\|^2$ at $x = 0$ with $A = I_2$ and $b = (1, 2)$.", -2),
  s(MC, "x4l-mvn", 9.5, "Sketch the derivation of the MLE of $\\Sigma$ for a multivariate normal using matrix calculus.",
    "$\\ell(\\Sigma) = -\\frac n2\\log\\det\\Sigma - \\frac n2\\mathrm{tr}(\\Sigma^{-1}S)$ with $S$ the sample covariance (divisor $n$); differentiate in $\\Sigma^{-1}$ (or use $d\\log\\det\\Sigma = \\mathrm{tr}(\\Sigma^{-1}d\\Sigma)$ and $d\\Sigma^{-1} = -\\Sigma^{-1}d\\Sigma\\Sigma^{-1}$).",
    "Setting the derivative $-\\frac n2\\Sigma^{-1} + \\frac n2\\Sigma^{-1}S\\Sigma^{-1}$ to zero gives $\\hat\\Sigma = S$."),

  // --- linear-dependence -----------------------------------------------------------------
  n(LD, "x4l-k", 4, "Find $k$ such that $(1, 2)$ and $(3, k)$ are linearly dependent.", 6),
  n(LD, "x4l-max", 7, "What is the largest number of linearly independent vectors in $\\mathcal{R}^3$?", 3),
  n(LD, "x4l-det", 8, "Compute $\\det$ of the matrix with rows $(1, 2, 3)$, $(4, 5, 6)$, $(7, 8, 9)$.", 0),
  n(LD, "x4l-coef", 8, "Write $(7, 8, 9) = a(1, 2, 3) + c(4, 5, 6)$. Find $c$.", 2),
  s(LD, "x4l-four", 8.5, "Why are any four vectors in $\\mathcal{R}^3$ linearly dependent?",
    "Finding coefficients with $\\sum c_iv_i = 0$ is a homogeneous system of $3$ equations in $4$ unknowns, which always has a nonzero solution (there's at least one free variable).",
    "In general, any set with more vectors than the dimension is dependent."),
  n(LD, "x4l-wronskian", 8.5, "Compute the Wronskian of $1$, $x$, $x^2$ at $x = 1$.", 2),
  n(LD, "x4l-random", 9, "Two random vectors in $\\mathcal{R}^2$ have independent, equally likely $\\pm1$ entries. What is the probability they are linearly dependent?", 0.5, 0.001),
  s(LD, "x4l-functions", 9, "Show that $\\sin x$, $\\cos x$ and $e^x$ are linearly independent functions.",
    "Suppose $a\\sin x + b\\cos x + ce^x = 0$ for all $x$. As $x \\to \\infty$, the bounded trig terms can't cancel $ce^x$, so $c = 0$.",
    "Then $x = 0$ gives $b = 0$ and $x = \\pi/2$ gives $a = 0$ (alternatively, the Wronskian is nonzero somewhere)."),
  n(LD, "x4l-rank", 9, "How many linearly independent columns does $\\begin{pmatrix}1 & 2 & 3\\\\2 & 4 & 6\\\\1 & 0 & 1\\end{pmatrix}$ have?", 2),
  s(LD, "x4l-regression", 9.5, "Why do linearly dependent columns in a design matrix make regression coefficients non-identifiable?",
    "If $Xv = 0$ for some $v \\ne 0$, then $X\\beta = X(\\beta + tv)$ for every $t$: different coefficient vectors give identical fitted values, so the data can't distinguish them.",
    "$X^\\top X$ is singular; fixes are dropping a column (e.g. the dummy-variable trap), constraints, or regularisation such as ridge."),

  // --- vector-spaces ---------------------------------------------------------------------
  m(VS, "x4l-which", 4, "Which of these is a vector space under the usual operations?", "Polynomials of degree at most $3$",
    [["Polynomials of degree exactly $3$", "Not closed under addition (leading terms can cancel), and $0$ isn't included."], ["Vectors in $\\mathcal{R}^2$ with positive entries", "Not closed under negation."], ["The unit circle in $\\mathcal{R}^2$", "Not closed under addition or scaling."]]),
  n(VS, "x4l-sym", 7, "What is the dimension of the space of $3 \\times 3$ symmetric matrices?", 6),
  n(VS, "x4l-poly", 8, "What is the dimension of the space of polynomials of degree at most $5$?", 6),
  n(VS, "x4l-hyperplane", 8, "What is the dimension of $\\lbrace x \\in \\mathcal{R}^4 : x_1 + x_2 + x_3 + x_4 = 0\\rbrace$?", 3),
  s(VS, "x4l-not", 8.5, "Why isn't $\\lbrace(x, y) : xy \\ge 0\\rbrace$ a subspace of $\\mathcal{R}^2$?",
    "It's closed under scaling but not under addition: $(1, 0)$ and $(0, -1)$ are in it, but their sum $(1, -1)$ has $xy = -1 < 0$.",
    "It's a union of two quadrant cones; subspaces must be closed under both operations."),
  n(VS, "x4l-ode", 8.5, "What is the dimension of the solution space of $y'' + y = 0$?", 2),
  n(VS, "x4l-traceless", 9, "What is the dimension of the space of $4 \\times 4$ matrices with trace $0$?", 15),
  s(VS, "x4l-infinite", 9, "Why is the space of continuous functions on $[0, 1]$ infinite-dimensional?",
    "The monomials $1, x, x^2, \\ldots, x^n$ are linearly independent for every $n$ (a nonzero polynomial has finitely many roots).",
    "So no finite set can span the space, and its dimension is infinite."),
  n(VS, "x4l-recurrence", 9, "What is the dimension of the space of sequences satisfying $a_{n+2} = a_{n+1} + a_n$?", 2),
  s(VS, "x4l-field", 9.5, "Why does the field of scalars matter? Compare $\\mathbb{C}$ as a real and as a complex vector space.",
    "Over $\\mathbb{C}$, the complex numbers form a $1$-dimensional space (basis $\\lbrace 1\\rbrace$); over the reals they're $2$-dimensional (basis $\\lbrace 1, i\\rbrace$).",
    "The field also governs which results hold: every real matrix has eigenvalues over $\\mathbb{C}$, but a rotation of $\\mathcal{R}^2$ has none over the reals."),

  // --- span ----------------------------------------------------------------------------
  n(SP, "x4l-dim", 4, "What is the dimension of $\\mathrm{span}\\lbrace(1, 0, 0), (0, 1, 0), (1, 1, 0)\\rbrace$?", 2),
  n(SP, "x4l-coef", 7, "Write $(2, 3, 0) = a(1, 0, 0) + b(0, 1, 0)$. Find $a$.", 2),
  n(SP, "x4l-dim2", 8, "What is the dimension of $\\mathrm{span}\\lbrace(1, 2, 3), (2, 4, 6), (0, 1, 1)\\rbrace$?", 2),
  n(SP, "x4l-k", 8, "Find $k$ such that $(1, k, 5) \\in \\mathrm{span}\\lbrace(1, 1, 1), (0, 1, 2)\\rbrace$.", 3),
  s(SP, "x4l-smallest", 8.5, "Show that $\\mathrm{span}(S)$ is the smallest subspace containing $S$.",
    "The span is closed under addition and scaling (a combination of combinations is a combination), so it's a subspace containing $S$.",
    "Any subspace containing $S$ must contain every linear combination of $S$'s vectors, so it contains the span."),
  n(SP, "x4l-plane", 8.5, "How many vectors are needed to span the plane $x - 2y + z = 0$ in $\\mathcal{R}^3$?", 2),
  n(SP, "x4l-cols", 9, "What is the dimension of the span of the columns of $\\begin{pmatrix}1 & 1\\\\1 & 1\\\\1 & 1\\end{pmatrix}$?", 1),
  s(SP, "x4l-solvable", 9, "Relate span to the solvability of $Ax = b$.",
    "$Ax$ is a linear combination of $A$'s columns with weights $x$, so $Ax = b$ is solvable exactly when $b$ lies in the span of the columns (the column space).",
    "If the columns span $\\mathcal{R}^m$ (rank $m$), every $b$ is reachable."),
  n(SP, "x4l-poly", 9, "What is the dimension of $\\mathrm{span}\\lbrace 1 + x, 1 - x, x^2\\rbrace$?", 3),
  s(SP, "x4l-random", 9.5, "Do $n$ random Gaussian vectors span $\\mathcal{R}^n$? What changes for random $\\pm1$ vectors?",
    "With probability $1$: the set where the determinant vanishes has measure zero, so continuous random vectors are almost surely independent (though possibly ill-conditioned).",
    "With discrete $\\pm1$ entries there's a positive probability of dependence (e.g. two equal rows), though it tends to $0$ as $n$ grows."),

  // --- basis ----------------------------------------------------------------------------
  n(BA, "x4l-size", 4, "How many vectors are in a basis of $\\mathcal{R}^5$?", 5),
  n(BA, "x4l-coord1", 7, "Find the first coordinate of $(3, 5)$ in the basis $\\lbrace(1, 1), (1, -1)\\rbrace$.", 4),
  n(BA, "x4l-coord2", 8, "Find the second coordinate.", -1),
  n(BA, "x4l-taylor", 8, "Write $x^2$ in the basis $1, (x - 1), (x - 1)^2, (x - 1)^3$. What is the coefficient of $(x - 1)^2$?", 1),
  s(BA, "x4l-same-size", 8.5, "Why do all bases of a finite-dimensional space have the same number of elements?",
    "The Steinitz exchange lemma: any linearly independent set has at most as many vectors as any spanning set.",
    "A basis is both, so for two bases $B$ and $C$, $|B| \\le |C|$ and $|C| \\le |B|$ — which makes dimension well defined."),
  n(BA, "x4l-taylor2", 8.5, "In the same basis, what is the coefficient of $(x - 1)$ in $x^2$?", 2),
  n(BA, "x4l-z2", 9, "How many ordered bases does the vector space of pairs over the $2$-element field ($\\mathbb{Z}_2^2$) have?", 6),
  s(BA, "x4l-onb", 9, "Why are coordinates easier to compute in an orthonormal basis?",
    "In a general basis $B$, finding coordinates means solving $Bc = v$.",
    "In an orthonormal basis each coordinate is just a dot product, $c_i = q_i \\cdot v$, and lengths and angles are preserved."),
  n(BA, "x4l-coord3", 9, "Find the first coordinate of $(2, 1)$ in the basis $\\lbrace(1, 2), (3, 4)\\rbrace$.", -2.5, 0.001),
  s(BA, "x4l-hamel", 9.5, "Why does an infinite-dimensional space like the continuous functions need a different notion of basis?",
    "A Hamel basis allows only finite linear combinations; for such spaces it exists (by the axiom of choice) but is uncountable and can't be written down.",
    "Analysis uses Schauder or orthonormal bases with convergent infinite series, e.g. Fourier series in $L^2$."),

  // --- subspace-operations -------------------------------------------------------------------
  n(SO, "x4l-sum", 4, "$\\dim U = 2$, $\\dim W = 2$ and $\\dim(U \\cap W) = 1$. Compute $\\dim(U + W)$.", 3),
  n(SO, "x4l-planes", 7, "Two distinct planes through the origin in $\\mathcal{R}^3$ intersect in a subspace of what dimension?", 1),
  n(SO, "x4l-min-int", 8, "In $\\mathcal{R}^5$, $\\dim U = 3$ and $\\dim W = 4$. What is the smallest possible $\\dim(U \\cap W)$?", 2),
  n(SO, "x4l-complement", 8, "What is the dimension of the orthogonal complement of a $2$-dimensional subspace of $\\mathcal{R}^7$?", 5),
  s(SO, "x4l-union", 8.5, "Why is the union of two subspaces usually not a subspace?",
    "The union of the $x$-axis and the $y$-axis contains $(1, 0)$ and $(0, 1)$ but not their sum $(1, 1)$.",
    "The union is a subspace only when one subspace contains the other; the smallest subspace containing both is $U + W$."),
  n(SO, "x4l-int", 8.5, "$U = \\mathrm{span}\\lbrace(1, 0, 0), (0, 1, 0)\\rbrace$ and $W = \\mathrm{span}\\lbrace(0, 1, 0), (0, 0, 1)\\rbrace$. Compute $\\dim(U \\cap W)$.", 1),
  n(SO, "x4l-sum2", 9, "For the same $U$ and $W$, compute $\\dim(U + W)$.", 3),
  s(SO, "x4l-direct", 9, "What is a direct sum, and how can you recognise one?",
    "$V = U \\oplus W$ when every $v \\in V$ is uniquely $u + w$ with $u \\in U$ and $w \\in W$.",
    "Equivalently $U + W = V$ and $U \\cap W = \\lbrace 0\\rbrace$, or $\\dim U + \\dim W = \\dim V$ with trivial intersection."),
  n(SO, "x4l-oblique", 9, "Project $(0, 1)$ onto $U = \\mathrm{span}\\lbrace(1, 0)\\rbrace$ along $W = \\mathrm{span}\\lbrace(1, 1)\\rbrace$. Find the first component of the result.", -1),
  s(SO, "x4l-dim-formula", 9.5, "Prove $\\dim(U + W) = \\dim U + \\dim W - \\dim(U \\cap W)$.",
    "Take a basis $b_1, \\ldots, b_k$ of $U \\cap W$, extend it to a basis of $U$ with $u_1, \\ldots, u_p$ and to a basis of $W$ with $w_1, \\ldots, w_q$.",
    "Show all $b$'s, $u$'s and $w$'s together are independent and span $U + W$; so $\\dim(U + W) = k + p + q = (k + p) + (k + q) - k$."),

  // --- change-of-basis ------------------------------------------------------------------------
  n(CB, "x4l-scaled", 4, "In the basis $\\lbrace(2, 0), (0, 3)\\rbrace$, find the second coordinate of $(4, 9)$.", 3),
  n(CB, "x4l-to-std", 7, "The columns of $P = \\begin{pmatrix}1 & 1\\\\0 & 1\\end{pmatrix}$ form a basis $B$. If $[x]_B = (2, 3)$, find the first standard coordinate of $x$.", 5),
  n(CB, "x4l-to-b", 8, "With the same $P$, find the first $B$-coordinate of the standard vector $(5, 3)$.", 2),
  n(CB, "x4l-trace", 8, "$A = \\begin{pmatrix}2 & 1\\\\0 & 3\\end{pmatrix}$. Compute $\\mathrm{tr}(P^{-1}AP)$ for any invertible $P$.", 5),
  s(CB, "x4l-similar", 8.5, "Why do similar matrices represent the same linear map?",
    "If $P$'s columns are a new basis, $P^{-1}AP$ is the matrix of the same map $x \\mapsto Ax$ written in the new coordinates: convert to standard coordinates, apply $A$, convert back.",
    "So similar matrices share every basis-independent property: eigenvalues, trace, determinant, rank, characteristic polynomial."),
  n(CB, "x4l-rotated", 8.5, "Rotate the standard basis by $30°$. Find the first coordinate of $(1, 0)$ in the rotated basis.", 0.866, 0.001),
  n(CB, "x4l-eigbasis", 9, "$A = \\begin{pmatrix}4 & 1\\\\2 & 3\\end{pmatrix}$ has eigenvectors $(1, 1)$ (eigenvalue $5$) and $(1, -2)$ (eigenvalue $2$). In that basis, what is the $(1, 1)$ entry of the matrix of $A$?", 5),
  s(CB, "x4l-contra", 9, "Why do coordinates transform with $P^{-1}$ while basis vectors transform with $P$?",
    "If the new basis vectors are the columns of $P$ (written in old coordinates), then $x = P[x]_{\\text{new}}$, so $[x]_{\\text{new}} = P^{-1}x$.",
    "The basis and the coordinates change in opposite ways so the vector itself is unchanged (contravariance of coordinates)."),
  n(CB, "x4l-congruent", 9, "With $A = I$ and $P = \\begin{pmatrix}1 & 1\\\\0 & 1\\end{pmatrix}$, compute the $(2, 2)$ entry of $P^\\top AP$.", 2),
  s(CB, "x4l-sim-vs-cong", 9.5, "Distinguish similarity $P^{-1}AP$ from congruence $P^\\top AP$, and say which applies to linear maps and which to quadratic forms.",
    "Linear maps change by similarity, which preserves eigenvalues. Quadratic forms $x^\\top Ax$ (and bilinear forms) change by congruence when $x = Py$.",
    "Congruence doesn't preserve eigenvalues, only the signs: by Sylvester's law of inertia, the numbers of positive, negative and zero eigenvalues are invariant. For orthogonal $P$ the two coincide."),

  // --- four-fundamental-subspaces --------------------------------------------------------------
  n(FF, "x4l-null", 4, "$A$ is $5 \\times 3$ with rank $2$. What is the dimension of its null space?", 1),
  n(FF, "x4l-leftnull", 7, "For the same $A$, what is the dimension of the left null space?", 3),
  n(FF, "x4l-row", 8, "What is the dimension of its row space?", 2),
  n(FF, "x4l-nullvec", 8, "The null space of $\\begin{pmatrix}1 & 2\\\\2 & 4\\end{pmatrix}$ is spanned by a vector with first component $-2$. What is its second component?", 1),
  s(FF, "x4l-orth", 8.5, "State the orthogonality relations among the four fundamental subspaces of an $m \\times n$ matrix.",
    "In $\\mathcal{R}^n$, the null space is the orthogonal complement of the row space; in $\\mathcal{R}^m$, the left null space is the orthogonal complement of the column space.",
    "Hence $\\dim(\\text{row}) + \\dim(\\text{null}) = n$ and $\\dim(\\text{col}) + \\dim(\\text{left null}) = m$, with row and column spaces both of dimension $r$."),
  n(FF, "x4l-sym-leftnull", 8.5, "What is the dimension of the left null space of $\\begin{pmatrix}1 & 2\\\\2 & 4\\end{pmatrix}$?", 1),
  n(FF, "x4l-wide", 9, "$A$ is $4 \\times 6$ with rank $4$. What is the dimension of its null space?", 2),
  s(FF, "x4l-fredholm", 9, "Explain the Fredholm alternative for $Ax = b$.",
    "$Ax = b$ is solvable if and only if $b$ is orthogonal to every $y$ with $A^\\top y = 0$ (the left null space).",
    "So either the system has a solution, or there's a $y$ with $A^\\top y = 0$ and $y^\\top b \\ne 0$ that certifies it has none."),
  n(FF, "x4l-consistent", 9, "$A = \\begin{pmatrix}1 & 1\\\\1 & 1\\\\1 & 1\\end{pmatrix}$ and $b = (1, 1, c)$. For which $c$ is $Ax = b$ solvable?", 1),
  s(FF, "x4l-svd", 9.5, "How does the SVD give orthonormal bases for all four fundamental subspaces?",
    "With $A = U\\Sigma V^\\top$ of rank $r$: the first $r$ columns of $U$ span the column space and the rest the left null space; the first $r$ columns of $V$ span the row space and the rest the null space.",
    "$A$ maps $v_i$ to $\\sigma_iu_i$ for $i \\le r$ and kills the other $v_i$, so the SVD shows exactly how $A$ moves the row space onto the column space."),
];
