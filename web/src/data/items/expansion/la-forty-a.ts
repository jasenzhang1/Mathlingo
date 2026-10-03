import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Linear algebra 40-pass (part A): vectors, products, norms, angles, matrices. Weighted to the hard end. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
void mcq;

const VE = "vectors";
const VO = "vector-operations";
const DP = "dot-product";
const VN = "vector-norm";
const OV = "orthogonal-vectors";
const CS = "cauchy-schwarz";
const VP = "vector-projection";
const VA = "vector-angles";
const MM = "matrix-multiplication";
const MA = "matrices";
const KP = "kronecker-product";

export const laFortyAItems: Item[] = [
  // --- vectors ------------------------------------------------------------------------
  n(VE, "x4l-length", 4, "What is the length of the vector from $P = [1, 2]$ to $Q = [4, 6]$?", 5),
  n(VE, "x4l-unit", 7, "Find the first component of the unit vector in the direction of $[3, 4]$.", 0.6, 0.001),
  n(VE, "x4l-mid", 8, "Find the second coordinate of the midpoint of $[2, -1, 4]$ and $[6, 3, 0]$.", 1),
  n(VE, "x4l-ratio", 8, "The point dividing the segment from $[0, 0]$ to $[10, 5]$ in the ratio $2{:}3$ (measured from the start): find its $x$-coordinate.", 4),
  s(VE, "x4l-views", 8.5, "Contrast three views of a vector: an arrow, a list of numbers, and an element of an abstract vector space.",
    "An arrow is a basis-free geometric displacement; a list of numbers is its coordinates relative to a chosen basis; an abstract vector is anything satisfying the vector-space axioms (polynomials, functions, matrices).",
    "Coordinates depend on the basis while the vector doesn't; the abstract view lets the same linear algebra apply far beyond arrows in $\\mathbb{R}^n$."),
  n(VE, "x4l-centroid", 8.5, "Find the $y$-coordinate of the centroid of the triangle with vertices $(0, 0)$, $[6, 0]$ and $[0, 9]$.", 3),
  n(VE, "x4l-count", 9, "How many unit-length vectors in $\\mathbb{R}^3$ have every entry in $\\lbrace -1, 0, 1\\rbrace$?", 6),
  s(VE, "x4l-affine", 9, "In affine geometry, why is a point different from a vector?",
    "The difference of two points is a vector, and a point plus a vector is a point, but adding two points has no meaning (it depends on the origin).",
    "Only affine combinations with weights summing to $1$ are meaningful for points; homogeneous coordinates encode this with a last coordinate of $1$ for points and $0$ for vectors."),
  n(VE, "x4l-bary", 9, "Write $[2, 3] = a(0, 0) + b(4, 0) + c(0, 6)$ with $a + b + c = 1$. Find $c$.", 0.5, 0.001),
  s(VE, "x4l-poly", 9.5, "Why can the polynomials of degree at most $2$ be treated as $\\mathbb{R}^3$, and what does that buy you?",
    "The map $a + bx + cx^2 \\mapsto [a, b, c]$ (coordinates in the basis $1, x, x^2$) is a linear bijection that preserves addition and scaling — an isomorphism.",
    "Linear maps on polynomials become matrices (e.g. differentiation), so computations like solving or finding eigenvectors reduce to matrix algebra."),

  // --- vector-operations ----------------------------------------------------------------
  n(VO, "x4l-combo", 4, "Let $\\mathbf{u} = [1, -2]$ and $\\mathbf{v} = [0, 5]$. Compute the second component of $3\\mathbf{u} + 2\\mathbf{v}$.", 4),
  n(VO, "x4l-solve", 7, "Let $\\mathbf{u} = [1, 2]$, $\\mathbf{v} = [3, 1]$ and $\\mathbf{w} = [5, 5]$. Find $a$ such that $a\\mathbf{u} + b\\mathbf{v} = \\mathbf{w}$.", 2),
  n(VO, "x4l-cross", 8, "Let $\\mathbf{e}_1 = [1, 0, 0]$ and $\\mathbf{e}_2 = [0, 1, 0]$. Find the third component of $\\mathbf{e}_1 \\times \\mathbf{e}_2$.", 1),
  n(VO, "x4l-cross-norm", 8, "Compute $\\|\\mathbf{u} \\times \\mathbf{v}\\|$ for $\\mathbf{u} = [1, 2, 0]$ and $\\mathbf{v} = [3, 1, 0]$.", 5),
  s(VO, "x4l-cross-dims", 8.5, "Why does the cross product exist only in $\\mathbb{R}^3$ (and $\\mathbb{R}^7$)?",
    "A bilinear product that is orthogonal to both inputs and has norm equal to the parallelogram's area exists only in dimensions $3$ and $7$ (tied to the quaternions and octonions).",
    "In general dimensions the right generalisation is the wedge (exterior) product, which produces a bivector rather than a vector."),
  n(VO, "x4l-area", 8.5, "Compute the area of the triangle with vertices $\\mathbf{0} = [0, 0, 0]$, $\\mathbf{a} = [1, 2, 0]$ and $\\mathbf{b} = [3, 1, 0]$.", 2.5, 0.001),
  n(VO, "x4l-triple", 9, "Compute the scalar triple product $\\mathbf{u} \\cdot (\\mathbf{v} \\times \\mathbf{w})$ for $\\mathbf{u} = [1, 0, 0]$, $\\mathbf{v} = [0, 2, 0]$ and $\\mathbf{w} = [0, 0, 3]$.", 6),
  s(VO, "x4l-triple-meaning", 9, "Interpret the scalar triple product $\\mathbf{u} \\cdot (\\mathbf{v} \\times \\mathbf{w})$.",
    "It's the signed volume of the parallelepiped spanned by $\\mathbf{u}$, $\\mathbf{v}$ and $\\mathbf{w}$, and it equals $\\det[\\mathbf{u}\\ \\mathbf{v}\\ \\mathbf{w}]$.",
    "It's zero exactly when the three vectors are coplanar (linearly dependent); its sign gives the orientation."),
  n(VO, "x4l-tetra", 9, "Compute the volume of the tetrahedron whose edges from the origin are $\\mathbf{u} = [1, 0, 0]$, $\\mathbf{v} = [0, 2, 0]$ and $\\mathbf{w} = [0, 0, 3]$.", 1),
  s(VO, "x4l-cancel", 9.5, "Prove from the vector-space axioms that $\\mathbf{u} + \\mathbf{w} = \\mathbf{v} + \\mathbf{w}$ implies $\\mathbf{u} = \\mathbf{v}$.",
    "Add the additive inverse $-\\mathbf{w}$ to both sides and use associativity: $\\mathbf{u} + (\\mathbf{w} + (-\\mathbf{w})) = \\mathbf{v} + (\\mathbf{w} + (-\\mathbf{w}))$, so $\\mathbf{u} + \\mathbf{0} = \\mathbf{v} + \\mathbf{0}$.",
    "The identity axiom gives $\\mathbf{u} = \\mathbf{v}$. Only the axioms were used, so cancellation holds in every vector space."),

  // --- dot-product --------------------------------------------------------------------
  n(DP, "x4l-basic", 4, "Compute $[1, 2, 3] \\cdot [4, -5, 6]$.", 12),
  n(DP, "x4l-orth", 7, "Find $k$ such that $[2, k] \\cdot [3, -1] = 0$.", 6),
  n(DP, "x4l-sum", 8, "$\\mathbf{u} \\cdot \\mathbf{u} = 9$, $\\mathbf{v} \\cdot \\mathbf{v} = 16$ and $\\mathbf{u} \\cdot \\mathbf{v} = 6$. Compute $\\|\\mathbf{u} + \\mathbf{v}\\|^2$.", 37),
  n(DP, "x4l-diff", 8, "Same vectors: compute $(\\mathbf{u} + \\mathbf{v}) \\cdot (\\mathbf{u} - \\mathbf{v})$.", -7),
  s(DP, "x4l-polar", 8.5, "Prove the polarisation identity $\\mathbf{u} \\cdot \\mathbf{v} = \\frac{1}{4}\\left(\\|\\mathbf{u} + \\mathbf{v}\\|^2 - \\|\\mathbf{u} - \\mathbf{v}\\|^2\\right)$.",
    "Expand: $\\|\\mathbf{u} \\pm \\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\pm 2\\,\\mathbf{u} \\cdot \\mathbf{v} + \\|\\mathbf{v}\\|^2$; subtracting leaves $4\\,\\mathbf{u} \\cdot \\mathbf{v}$.",
    "So an inner-product norm determines the inner product — lengths determine angles."),
  n(DP, "x4l-polar-calc", 8.5, "$\\|\\mathbf{u} + \\mathbf{v}\\| = 5$ and $\\|\\mathbf{u} - \\mathbf{v}\\| = 3$. Compute $\\mathbf{u} \\cdot \\mathbf{v}$.", 4),
  n(DP, "x4l-weighted", 9, "With $\\langle \\mathbf{u}, \\mathbf{v}\\rangle = \\mathbf{u}^\\top \\mathbf{W}\\mathbf{v}$ and $\\mathbf{W} = \\operatorname{diag}(1, 4)$, compute $\\langle(1, 1), [2, -1]\\rangle$.", -2),
  s(DP, "x4l-W", 9, "What properties must $\\mathbf{W}$ have for $\\mathbf{u}^\\top \\mathbf{W}\\mathbf{v}$ to be an inner product?",
    "$\\mathbf{W}$ must be symmetric (so the product is symmetric) and positive definite (so $\\langle \\mathbf{u}, \\mathbf{u}\\rangle > 0$ for $\\mathbf{u} \\ne \\mathbf{0}$).",
    "Every inner product on $\\mathbb{R}^n$ has this form; e.g. Mahalanobis geometry uses $\\mathbf{W} = \\boldsymbol{\\Sigma}^{-1}$."),
  n(DP, "x4l-random", 9, "Two independent random vectors in $\\mathbb{R}^{100}$ have i.i.d. $\\pm 1$ entries. Compute the variance of their dot product.", 100),
  s(DP, "x4l-cosine", 9.5, "Derive $\\mathbf{u} \\cdot \\mathbf{v} = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta$ from the law of cosines.",
    "The side $\\mathbf{u} - \\mathbf{v}$ of the triangle satisfies $\\|\\mathbf{u} - \\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + \\|\\mathbf{v}\\|^2 - 2\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta$ (law of cosines) and also $\\|\\mathbf{u}\\|^2 + \\|\\mathbf{v}\\|^2 - 2\\,\\mathbf{u} \\cdot \\mathbf{v}$ (algebra).",
    "Comparing gives the formula; in higher dimensions it's used the other way round, to define the angle between vectors."),

  // --- vector-norm ----------------------------------------------------------------------
  n(VN, "x4l-l2", 4, "Compute $\\|(1, -2, 2)\\|_2$.", 3),
  n(VN, "x4l-l1", 7, "Compute $\\|(3, -4)\\|_1$.", 7),
  n(VN, "x4l-linf", 8, "Compute $\\|(3, -4, 1)\\|_\\infty$.", 4),
  n(VN, "x4l-normalise", 8, "Normalise $[1, 1, 1, 1]$ to unit $2$-norm. What is each entry?", 0.5, 0.001),
  s(VN, "x4l-p-half", 8.5, "Why isn't $\\|\\mathbf{x}\\|_p = \\left(\\sum_i |x_i|^p\\right)^{1/p}$ a norm when $p < 1$?",
    "It violates the triangle inequality: with $p = \\tfrac12$, $\\|(1, 0)\\| = \\|(0, 1)\\| = 1$ but $\\|(1, 1)\\| = 4 > 2$.",
    "Equivalently, its unit ball isn't convex; for $p \\ge 1$ Minkowski's inequality guarantees the triangle inequality."),
  n(VN, "x4l-half-calc", 8.5, "Compute $\\left(\\sum_i |x_i|^{1/2}\\right)^2$ for $\\mathbf{x} = [1, 1]$.", 4),
  n(VN, "x4l-ratio", 9, "What is the largest possible ratio $\\|\\mathbf{x}\\|_1/\\|\\mathbf{x}\\|_2$ in $\\mathbb{R}^{16}$?", 4),
  s(VN, "x4l-ineq", 9, "Show that $\\|\\mathbf{x}\\|_2 \\le \\|\\mathbf{x}\\|_1 \\le \\sqrt{n}\\,\\|\\mathbf{x}\\|_2$.",
    "$\\|\\mathbf{x}\\|_1^2 = \\sum_i |x_i|^2 + \\sum_{i \\ne j}|x_i||x_j| \\ge \\|\\mathbf{x}\\|_2^2$. For the upper bound, apply Cauchy–Schwarz to $|\\mathbf{x}|$ and the all-ones vector: $\\sum_i |x_i| \\le \\sqrt{n}\\,\\|\\mathbf{x}\\|_2$.",
    "Equality on the left for vectors with one nonzero entry, on the right when all $|x_i|$ are equal."),
  n(VN, "x4l-A-norm", 9, "Compute $\\sqrt{\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}}$ for $\\mathbf{A} = \\begin{bmatrix}2 & 0\\\\0 & 8\\end{bmatrix}$ and $\\mathbf{x} = [1, 0.5]$.", 2),
  s(VN, "x4l-equiv", 9.5, "Why are all norms on $\\mathbb{R}^n$ equivalent, and why does this fail in infinite dimensions?",
    "The unit sphere of $\\mathbb{R}^n$ (in any fixed norm) is compact, and every norm is continuous and positive on it, so it attains a positive minimum and maximum — giving constants with $c\\|\\mathbf{x}\\|_a \\le \\|\\mathbf{x}\\|_b \\le C\\|\\mathbf{x}\\|_a$.",
    "In infinite dimensions the unit sphere isn't compact: e.g. on functions the sup norm and $L^2$ norm aren't equivalent, so they define different notions of convergence."),

  // --- orthogonal-vectors ---------------------------------------------------------------
  n(OV, "x4l-check", 4, "Compute $[2, 1] \\cdot [-1, 2]$.", 0),
  n(OV, "x4l-find", 7, "Find $c$ such that $[1, c, 2] \\perp [3, 1, -1]$.", -1),
  n(OV, "x4l-pyth", 8, "$\\mathbf{u} \\perp \\mathbf{v}$ with $\\|\\mathbf{u}\\| = 3$ and $\\|\\mathbf{v}\\| = 4$. Compute $\\|\\mathbf{u} - \\mathbf{v}\\|$.", 5),
  n(OV, "x4l-max", 8, "What is the largest number of mutually orthogonal nonzero vectors in $\\mathbb{R}^5$?", 5),
  s(OV, "x4l-indep", 8.5, "Prove that mutually orthogonal nonzero vectors are linearly independent.",
    "If $\\sum_i c_i\\mathbf{v}_i = \\mathbf{0}$, take the dot product with $\\mathbf{v}_j$: all cross terms vanish, leaving $c_j\\|\\mathbf{v}_j\\|^2 = 0$.",
    "Since $\\mathbf{v}_j \\ne \\mathbf{0}$, $c_j = 0$ for every $j$."),
  n(OV, "x4l-cross", 8.5, "Find the first component of $[1, 1, 0] \\times [0, 1, 1]$, a vector orthogonal to both.", 1),
  n(OV, "x4l-count", 9, "How many vectors in $\\mathbb{R}^4$ with entries $\\pm 1$ are orthogonal to $[1, 1, 1, 1]$?", 6),
  s(OV, "x4l-near", 9, "Why can high-dimensional spaces hold exponentially many nearly orthogonal vectors?",
    "Random unit vectors in $\\mathbb{R}^n$ have dot products of order $1/\\sqrt{n}$, concentrated near $0$.",
    "So about $e^{c\\varepsilon^2n}$ vectors can have all pairwise $|\\cos| < \\varepsilon$ (Johnson–Lindenstrauss) — though at most $n$ can be exactly orthogonal."),
  n(OV, "x4l-random-sd", 9, "Approximate the SD of the dot product of two random unit vectors in $\\mathbb{R}^{400}$, which is about $1/\\sqrt{n}$.", 0.05, 0.001),
  s(OV, "x4l-functions", 9.5, "In what sense are $\\sin x$ and $\\cos x$ orthogonal on $[-\\pi, \\pi]$?",
    "With the inner product $\\langle f, g\\rangle = \\int_{-\\pi}^\\pi f(x)g(x)\\,dx$, $\\int\\sin x\\cos x\\,dx = 0$.",
    "The whole Fourier system $\\lbrace 1, \\sin kx, \\cos kx\\rbrace$ is orthogonal, which is why Fourier coefficients are just projections — orthogonality in an infinite-dimensional inner-product space."),

  // --- cauchy-schwarz -------------------------------------------------------------------
  n(CS, "x4l-max", 4, "$\\|\\mathbf{u}\\| = 3$ and $\\|\\mathbf{v}\\| = 5$. What is the largest possible value of $\\mathbf{u} \\cdot \\mathbf{v}$?", 15),
  n(CS, "x4l-equal", 7, "Compute $|\\mathbf{u} \\cdot \\mathbf{v}|$ for $\\mathbf{u} = [1, 2]$ and $\\mathbf{v} = [2, 4]$ (a case of equality).", 10),
  n(CS, "x4l-expect", 8, "$\\mathbb{E}[X^2] = 4$ and $\\mathbb{E}[Y^2] = 9$. What is the largest possible $\\mathbb{E}[XY]$?", 6),
  n(CS, "x4l-min-sq", 8, "$x + y + z = 3$. What is the smallest possible value of $x^2 + y^2 + z^2$?", 3),
  s(CS, "x4l-proof", 8.5, "Prove the Cauchy–Schwarz inequality using the quadratic $\\|\\mathbf{u} + t\\mathbf{v}\\|^2 \\ge 0$.",
    "$\\|\\mathbf{u} + t\\mathbf{v}\\|^2 = \\|\\mathbf{v}\\|^2t^2 + 2(\\mathbf{u} \\cdot \\mathbf{v})t + \\|\\mathbf{u}\\|^2 \\ge 0$ for all real $t$, so its discriminant is non-positive: $4(\\mathbf{u} \\cdot \\mathbf{v})^2 - 4\\|\\mathbf{u}\\|^2\\|\\mathbf{v}\\|^2 \\le 0$.",
    "Equality requires a real root, i.e. $\\mathbf{u} + t\\mathbf{v} = \\mathbf{0}$ for some $t$: $\\mathbf{u}$ and $\\mathbf{v}$ are linearly dependent."),
  n(CS, "x4l-lagrange", 8.5, "Find the maximum of $3x + 4y$ subject to $x^2 + y^2 = 1$.", 5),
  n(CS, "x4l-rho", 9, "$\\text{Cov}(X, Y) = 12$, $\\text{Var}(X) = 9$ and $\\text{Var}(Y) = 25$. Compute the correlation.", 0.8, 0.001),
  s(CS, "x4l-corr", 9, "Derive $|\\rho| \\le 1$ from Cauchy–Schwarz.",
    "Covariance is an inner product on centred random variables: $\\text{Cov}(X, Y) = \\mathbb{E}[(X - \\mu_X)(Y - \\mu_Y)]$.",
    "Cauchy–Schwarz gives $|\\text{Cov}(X, Y)| \\le \\sigma_X\\sigma_Y$, so $|\\rho| \\le 1$, with equality iff $Y$ is an exact linear function of $X$."),
  n(CS, "x4l-sum-bound", 9, "Four numbers satisfy $\\sum_i x_i^2 = 9$. What is the largest possible value of $\\sum_i x_i$?", 6),
  s(CS, "x4l-triangle", 9.5, "Prove the triangle inequality $\\|\\mathbf{u} + \\mathbf{v}\\| \\le \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$ from Cauchy–Schwarz.",
    "$\\|\\mathbf{u} + \\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 + 2\\,\\mathbf{u} \\cdot \\mathbf{v} + \\|\\mathbf{v}\\|^2 \\le \\|\\mathbf{u}\\|^2 + 2\\|\\mathbf{u}\\|\\|\\mathbf{v}\\| + \\|\\mathbf{v}\\|^2 = (\\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|)^2$.",
    "Take square roots. Equality holds when $\\mathbf{u}$ and $\\mathbf{v}$ point in the same direction."),

  // --- vector-projection ---------------------------------------------------------------
  n(VP, "x4l-scalar", 4, "Compute the scalar projection of $[3, 4]$ onto $[1, 0]$.", 3),
  n(VP, "x4l-proj", 7, "Find the first component of the projection of $[2, 3]$ onto $[1, 1]$.", 2.5, 0.001),
  n(VP, "x4l-dist", 8, "Compute the distance from $[2, 3]$ to the line spanned by $[1, 1]$.", 0.7071, 0.001),
  n(VP, "x4l-matrix", 8, "The projection matrix onto the line spanned by $[1, 1]$ has what $(1, 1)$ entry?", 0.5, 0.001),
  s(VP, "x4l-closest", 8.5, "Why is the orthogonal projection the closest point on a line (or subspace)?",
    "For any other point $\\mathbf{w}$ in the subspace, $\\mathbf{x} - \\mathbf{w} = (\\mathbf{x} - \\mathbf{p}) + (\\mathbf{p} - \\mathbf{w})$ with $\\mathbf{x} - \\mathbf{p}$ orthogonal to $\\mathbf{p} - \\mathbf{w}$.",
    "Pythagoras gives $\\|\\mathbf{x} - \\mathbf{w}\\|^2 = \\|\\mathbf{x} - \\mathbf{p}\\|^2 + \\|\\mathbf{p} - \\mathbf{w}\\|^2 \\ge \\|\\mathbf{x} - \\mathbf{p}\\|^2$, with equality only when $\\mathbf{w} = \\mathbf{p}$."),
  n(VP, "x4l-plane", 8.5, "Project $[1, 2, 3]$ onto the plane $x + y + z = 0$. Find the first component.", -1),
  n(VP, "x4l-plane-dist", 9, "Compute the distance from $[1, 2, 3]$ to the plane $x + y + z = 0$.", 3.4641, 0.001),
  s(VP, "x4l-ls", 9, "Relate projection onto a line to least squares with one predictor and no intercept.",
    "Minimising $\\|\\mathbf{y} - \\beta\\mathbf{x}\\|^2$ gives $\\hat\\beta = \\frac{\\mathbf{x} \\cdot \\mathbf{y}}{\\mathbf{x} \\cdot \\mathbf{x}}$, and $\\hat\\beta\\mathbf{x}$ is exactly the projection of $\\mathbf{y}$ onto the line spanned by $\\mathbf{x}$.",
    "The residual $\\mathbf{y} - \\hat\\beta\\mathbf{x}$ is orthogonal to $\\mathbf{x}$ — the normal equation."),
  n(VP, "x4l-slope", 9, "Least squares through the origin: $\\mathbf{x} = [1, 2, 3]$ and $\\mathbf{y} = [2, 3, 7]$. Compute $\\hat\\beta$.", 2.0714, 0.001),
  s(VP, "x4l-commute", 9.5, "Projecting onto $\\mathbf{u}$ and then onto $\\mathbf{v}$ usually differs from the reverse order. When do the two projections commute?",
    "$\\mathbf{P}_{\\mathbf{u}}\\mathbf{P}_{\\mathbf{v}} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|^2\\|\\mathbf{v}\\|^2}\\mathbf{u}\\mathbf{v}^\\top$ while $\\mathbf{P}_{\\mathbf{v}}\\mathbf{P}_{\\mathbf{u}}$ is its transpose; they're equal only when $\\mathbf{u}\\mathbf{v}^\\top$ is symmetric, i.e. $\\mathbf{u} \\parallel \\mathbf{v}$, or when $\\mathbf{u} \\cdot \\mathbf{v} = 0$ (both products are $\\mathbf{0}$).",
    "In general, projections commute exactly when their product is itself a projection — onto the intersection of the subspaces."),

  // --- vector-angles -------------------------------------------------------------------
  n(VA, "x4l-cos", 4, "Compute $\\cos\\theta$ between $[1, 0]$ and $[1, 1]$.", 0.7071, 0.001),
  n(VA, "x4l-45", 7, "Find the angle in degrees between $[1, 0, 0]$ and $[1, 1, 0]$.", 45),
  n(VA, "x4l-180", 8, "Find the angle in degrees between $[1, 2, 3]$ and $[-1, -2, -3]$.", 180),
  n(VA, "x4l-cube", 8, "Find the angle in degrees between a cube's main diagonal $[1, 1, 1]$ and an edge $[1, 0, 0]$.", 54.7356, 0.001),
  s(VA, "x4l-random", 8.5, "Why is the angle between two random high-dimensional vectors usually close to $90^\\circ$?",
    "For independent random directions in $\\mathbb{R}^n$, the cosine is an average of many independent zero-mean terms, so it concentrates near $0$ with spread about $1/\\sqrt{n}$.",
    "This concentration of measure is why random projections and random features work."),
  n(VA, "x4l-face", 8.5, "Find the angle in degrees between the face diagonals $[1, 1, 0]$ and $[1, 0, 1]$ of a cube.", 60),
  n(VA, "x4l-4d", 9, "Find the angle in degrees between $[1, 1, 1, 1]$ and $[1, 0, 0, 0]$.", 60),
  n(VA, "x4l-hundred", 9, "In $\\mathbb{R}^{100}$, the angle between the diagonal $(1, \\ldots, 1)$ and an axis has cosine $1/\\sqrt{100}$. Find the angle in degrees.", 84.2608, 0.001),
  s(VA, "x4l-metric", 9, "Explain the angle between vectors as a distance on the sphere, and its relation to correlation.",
    "The angle $\\arccos(\\mathbf{u} \\cdot \\mathbf{v})$ between unit vectors is the great-circle distance on the unit sphere and is a true metric.",
    "For centred data vectors, $\\cos\\theta$ is the sample correlation, so uncorrelated means orthogonal after centring."),
  s(VA, "x4l-preserve", 9.5, "Show that orthogonal transformations preserve angles, and explain why general invertible maps don't.",
    "If $\\mathbf{Q}^\\top \\mathbf{Q} = \\mathbf{I}$, then $(\\mathbf{Q}\\mathbf{u}) \\cdot (\\mathbf{Q}\\mathbf{v}) = \\mathbf{u}^\\top \\mathbf{Q}^\\top \\mathbf{Q}\\mathbf{v} = \\mathbf{u} \\cdot \\mathbf{v}$ and norms are preserved, so the cosine is unchanged.",
    "A shear or unequal scaling changes dot products relative to norms (e.g. it can map perpendicular vectors to non-perpendicular ones); only scalar multiples of orthogonal maps are conformal."),

  // --- matrix-multiplication (9) --------------------------------------------------------
  n(MM, "x4l-entries", 7, "$\\mathbf{A}$ is $3 \\times 4$ and $\\mathbf{B}$ is $4 \\times 2$. How many entries does $\\mathbf{A}\\mathbf{B}$ have?", 6),
  n(MM, "x4l-flops", 8, "How many scalar multiplications does computing $\\mathbf{A}\\mathbf{B}$ take for those sizes?", 24),
  n(MM, "x4l-order1", 8, "$\\mathbf{A}$ is $10 \\times 100$, $\\mathbf{B}$ is $100 \\times 5$ and $\\mathbf{C}$ is $5 \\times 50$. How many scalar multiplications does $(\\mathbf{A}\\mathbf{B})\\mathbf{C}$ need?", 7500),
  n(MM, "x4l-order2", 8.5, "How many does $\\mathbf{A}(\\mathbf{B}\\mathbf{C})$ need?", 75000),
  s(MM, "x4l-views", 8.5, "Describe four ways to view the product $\\mathbf{A}\\mathbf{B}$.",
    "Entry $(i, j)$ is the dot product of row $i$ of $\\mathbf{A}$ with column $j$ of $\\mathbf{B}$; each column of $\\mathbf{A}\\mathbf{B}$ is $\\mathbf{A}$ times the corresponding column of $\\mathbf{B}$.",
    "Each row of $\\mathbf{A}\\mathbf{B}$ is the corresponding row of $\\mathbf{A}$ times $\\mathbf{B}$; and $\\mathbf{A}\\mathbf{B} = \\sum_k(\\text{column } k \\text{ of } \\mathbf{A})(\\text{row } k \\text{ of } \\mathbf{B})$, a sum of outer products."),
  n(MM, "x4l-shear", 9, "Compute the $(1, 2)$ entry of $\\begin{bmatrix}1 & 1\\\\0 & 1\\end{bmatrix}^{10}$.", 10),
  n(MM, "x4l-fib", 9, "Compute the $(1, 1)$ entry of $\\begin{bmatrix}1 & 1\\\\1 & 0\\end{bmatrix}^5$.", 8),
  s(MM, "x4l-noncommute", 9, "Why isn't matrix multiplication commutative? Give an example and a geometric interpretation.",
    "$\\mathbf{A}\\mathbf{B}$ means “apply $\\mathbf{B}$, then $\\mathbf{A}$”, and order matters: rotating then projecting differs from projecting then rotating.",
    "E.g. $\\mathbf{A} = \\begin{bmatrix}0 & 1\\\\0 & 0\\end{bmatrix}$, $\\mathbf{B} = \\begin{bmatrix}0 & 0\\\\1 & 0\\end{bmatrix}$: $\\mathbf{A}\\mathbf{B} = \\begin{bmatrix}1 & 0\\\\0 & 0\\end{bmatrix}$ but $\\mathbf{B}\\mathbf{A} = \\begin{bmatrix}0 & 0\\\\0 & 1\\end{bmatrix}$."),
  s(MM, "x4l-strassen", 9.5, "Explain the idea of Strassen's algorithm and the resulting complexity.",
    "A $2 \\times 2$ block product can be computed with $7$ block multiplications instead of $8$ (using extra additions); applied recursively this gives $O(n^{\\log_27}) \\approx O(n^{2.807})$.",
    "Later methods lower the exponent further (the current bound is about $2.37$), but they're rarely practical; Strassen is slightly less numerically stable than the standard algorithm."),

  // --- matrices ----------------------------------------------------------------------
  n(MA, "x4l-entries", 4, "How many entries does a $4 \\times 7$ matrix have?", 28),
  n(MA, "x4l-transpose", 7, "For $\\mathbf{A} = \\begin{bmatrix}1 & 2\\\\3 & 4\\end{bmatrix}$, what is $(\\mathbf{A}^\\top)_{12}$?", 3),
  n(MA, "x4l-sym-free", 8, "How many entries can be chosen freely in a $5 \\times 5$ symmetric matrix?", 15),
  n(MA, "x4l-skew-free", 8, "How many entries can be chosen freely in a $5 \\times 5$ skew-symmetric matrix?", 10),
  s(MA, "x4l-decomp", 8.5, "Show that every square matrix is a sum of a symmetric and a skew-symmetric matrix.",
    "$\\mathbf{A} = \\frac{1}{2}(\\mathbf{A} + \\mathbf{A}^\\top) + \\frac{1}{2}(\\mathbf{A} - \\mathbf{A}^\\top)$; the first part is symmetric and the second skew-symmetric.",
    "The decomposition is unique, and the two parts are orthogonal under the trace inner product $\\langle \\mathbf{A}, \\mathbf{B}\\rangle = \\operatorname{tr}(\\mathbf{A}^\\top \\mathbf{B})$."),
  n(MA, "x4l-sym-part", 8.5, "Find the off-diagonal entry of the symmetric part of $\\begin{bmatrix}1 & 4\\\\2 & 3\\end{bmatrix}$.", 3),
  n(MA, "x4l-upper", 9, "What is the dimension of the space of upper-triangular $4 \\times 4$ matrices?", 10),
  s(MA, "x4l-space", 9, "Why do the $n \\times n$ matrices form a vector space, and what is its dimension?",
    "Matrix addition and scalar multiplication are entrywise, so all the vector-space axioms hold as they do in $\\mathbb{R}^{n^2}$.",
    "The matrices $\\mathbf{E}_{ij}$ (a single $1$ in position $(i, j)$) form a basis, so the dimension is $n^2$."),
  n(MA, "x4l-binary", 9, "How many $2 \\times 2$ matrices have every entry in $\\lbrace 0, 1\\rbrace$?", 16),
  s(MM, "x4l-blocks", 9.5, "Explain block matrices and when block multiplication is valid.",
    "Partition matrices into submatrices; the product can be computed block by block with the usual row-times-column rule as long as the column partition of the left factor matches the row partition of the right.",
    "The only difference from scalars is that blocks don't commute, so their order within each product must be kept (e.g. the Schur complement $\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B}$)."),

  // --- kronecker-product ------------------------------------------------------------------
  n(KP, "x4l-rows", 4, "$\\mathbf{A}$ is $2 \\times 3$ and $\\mathbf{B}$ is $4 \\times 5$. How many rows does $\\mathbf{A} \\otimes \\mathbf{B}$ have?", 8),
  n(KP, "x4l-sum", 7, "Compute the sum of the entries of $\\begin{bmatrix}1 & 2\\end{bmatrix} \\otimes \\begin{bmatrix}1\\\\1\\end{bmatrix}$.", 6),
  n(KP, "x4l-trace", 8, "$\\operatorname{tr}(\\mathbf{A}) = 3$ and $\\operatorname{tr}(\\mathbf{B}) = 4$. Compute $\\operatorname{tr}(\\mathbf{A} \\otimes \\mathbf{B})$.", 12),
  n(KP, "x4l-det", 8, "$\\mathbf{A}$ is $2 \\times 2$ with $\\det \\mathbf{A} = 2$, and $\\mathbf{B}$ is $3 \\times 3$ with $\\det \\mathbf{B} = 5$. Compute $\\det(\\mathbf{A} \\otimes \\mathbf{B})$.", 200),
  s(KP, "x4l-mixed", 8.5, "State the mixed-product property and use it to find the eigenvalues of $\\mathbf{A} \\otimes \\mathbf{B}$.",
    "$(\\mathbf{A} \\otimes \\mathbf{B})(\\mathbf{C} \\otimes \\mathbf{D}) = \\mathbf{A}\\mathbf{C} \\otimes \\mathbf{B}\\mathbf{D}$ whenever the products are defined.",
    "If $\\mathbf{A}\\mathbf{x} = \\lambda\\mathbf{x}$ and $\\mathbf{B}\\mathbf{y} = \\mu\\mathbf{y}$, then $(\\mathbf{A} \\otimes \\mathbf{B})(\\mathbf{x} \\otimes \\mathbf{y}) = \\lambda\\mu(\\mathbf{x} \\otimes \\mathbf{y})$: the eigenvalues of $\\mathbf{A} \\otimes \\mathbf{B}$ are all products $\\lambda_i\\mu_j$."),
  n(KP, "x4l-eig", 8.5, "$\\mathbf{A}$ has eigenvalues $1$ and $2$; $\\mathbf{B}$ has eigenvalues $3$ and $5$. What is the largest eigenvalue of $\\mathbf{A} \\otimes \\mathbf{B}$?", 10),
  n(KP, "x4l-rank", 9, "$\\operatorname{rank}(\\mathbf{A}) = 2$ and $\\operatorname{rank}(\\mathbf{B}) = 3$. Compute $\\operatorname{rank}(\\mathbf{A} \\otimes \\mathbf{B})$.", 6),
  s(KP, "x4l-vec", 9, "Explain the identity $\\operatorname{vec}(\\mathbf{A}\\mathbf{X}\\mathbf{B}) = (\\mathbf{B}^\\top \\otimes \\mathbf{A})\\operatorname{vec}(\\mathbf{X})$ and give a use.",
    "Stacking the columns of $\\mathbf{A}\\mathbf{X}\\mathbf{B}$ gives a linear function of $\\operatorname{vec}(\\mathbf{X})$, whose matrix is $\\mathbf{B}^\\top \\otimes \\mathbf{A}$.",
    "It turns matrix equations such as the Sylvester equation $\\mathbf{A}\\mathbf{X} + \\mathbf{X}\\mathbf{B} = \\mathbf{C}$ into ordinary linear systems, and describes matrix-normal covariances."),
  n(KP, "x4l-ksum", 9, "The Kronecker sum $\\mathbf{A} \\otimes \\mathbf{I} + \\mathbf{I} \\otimes \\mathbf{B}$ has eigenvalues $\\lambda_i + \\mu_j$. With the eigenvalues of $\\mathbf{A}$ being $1, 2$ and those of $\\mathbf{B}$ being $3, 5$, find the largest.", 7),
  s(KP, "x4l-separable", 9.5, "Why does a separable (Kronecker) covariance structure make computation cheap?",
    "$(\\mathbf{A} \\otimes \\mathbf{B})^{-1} = \\mathbf{A}^{-1} \\otimes \\mathbf{B}^{-1}$ and $\\det(\\mathbf{A} \\otimes \\mathbf{B}) = \\det(\\mathbf{A})^m\\det(\\mathbf{B})^n$, so an $mn \\times mn$ problem reduces to an $n \\times n$ and an $m \\times m$ problem.",
    "Cost drops from $O((mn)^3)$ to $O(m^3 + n^3)$ — the basis of fast spatio-temporal Gaussian processes and matrix-normal models."),
];
