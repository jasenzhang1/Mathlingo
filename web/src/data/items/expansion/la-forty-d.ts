import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Linear algebra 40-pass (part D): inverses, determinants, LU, eigen-theory, orthogonal and PD matrices. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
void mcq;

const IM = "invertible-matrices";
const DT = "determinant";
const SY = "symmetric-matrices";
const DP = "determinant-properties";
const LU = "lu-decomposition";
const EV = "eigenvalues-eigenvectors";
const DG = "diagonalization";
const ED = "eigendecomposition";
const OM = "orthogonal-matrices";
const SC = "schur-complement";
const PD = "positive-definite-matrices";

const A41 = "$\\mathbf{A} = \\begin{bmatrix}4 & 1\\\\2 & 3\\end{bmatrix}$";
const SIG = "$\\boldsymbol{\\Sigma} = \\begin{bmatrix}4 & 2\\\\2 & 3\\end{bmatrix}$";

export const laFortyDItems: Item[] = [
  // --- invertible-matrices -------------------------------------------------------------
  n(IM, "x4l-diag", 4, "Find the $(2, 2)$ entry of the inverse of $\\operatorname{diag}(2, 4)$.", 0.25, 0.001),
  n(IM, "x4l-2x2", 7, "Find the $(1, 1)$ entry of the inverse of $\\begin{bmatrix}1 & 2\\\\3 & 4\\end{bmatrix}$.", -2),
  n(IM, "x4l-product", 8, "$\\mathbf{A}$ and $\\mathbf{B}$ are $2 \\times 2$ with $\\mathbf{A}^{-1} = 2\\mathbf{I}$ and $\\mathbf{B}^{-1} = 3\\mathbf{I}$. Compute $\\det((\\mathbf{A}\\mathbf{B})^{-1})$.", 36),
  n(IM, "x4l-sm", 8, "Sherman–Morrison: $(\\mathbf{I} + \\mathbf{u}\\mathbf{v}^\\top)^{-1} = \\mathbf{I} - \\frac{\\mathbf{u}\\mathbf{v}^\\top}{1 + \\mathbf{v}^\\top \\mathbf{u}}$. With $\\mathbf{u} = \\mathbf{v} = \\mathbf{e}_1$, find the $(1, 1)$ entry.", 0.5, 0.001),
  s(IM, "x4l-equiv", 8.5, "List several conditions equivalent to invertibility of a square matrix $\\mathbf{A}$.",
    "$\\det \\mathbf{A} \\ne 0$; $\\operatorname{rank}(\\mathbf{A}) = n$; $N(\\mathbf{A}) = \\lbrace \\mathbf{0} \\rbrace$; the columns (or rows) are linearly independent and form a basis.",
    "$\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ has a unique solution for every $\\mathbf{b}$; $0$ is not an eigenvalue; all singular values are positive; $\\mathbf{A}$ is a product of elementary matrices."),
  n(IM, "x4l-shear-inv", 8.5, "Find the $(1, 2)$ entry of $\\left(\\begin{bmatrix}1 & 1\\\\0 & 1\\end{bmatrix}^5\\right)^{-1}$.", -5),
  n(IM, "x4l-woodbury", 9, "Check the Woodbury identity in the scalar case $\\mathbf{A} = 2$, $\\mathbf{U} = \\mathbf{V} = 1$, $\\mathbf{C} = 3$: compute $(\\mathbf{A} + \\mathbf{U}\\mathbf{C}\\mathbf{V})^{-1}$.", 0.2, 0.001),
  s(IM, "x4l-avoid", 9, "Why shouldn't you compute $\\mathbf{A}^{-1}$ explicitly to solve $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$?",
    "Forming the inverse costs about three times as much as an LU factorisation and is usually less accurate (the multiplication $\\mathbf{A}^{-1}\\mathbf{b}$ adds error).",
    "Factor once (LU, Cholesky or QR) and use triangular solves; this also reuses the factorisation for new right-hand sides."),
  n(IM, "x4l-random", 9, "A $2 \\times 2$ matrix has independent, uniformly random entries in $\\lbrace 0, 1\\rbrace$. What is the probability it's invertible (over the reals)?", 0.375, 0.001),
  s(IM, "x4l-neumann", 9.5, "Explain the Neumann series $(\\mathbf{I} - \\mathbf{A})^{-1} = \\sum_{k \\ge 0}\\mathbf{A}^k$ and when it converges.",
    "$(\\mathbf{I} - \\mathbf{A})(\\mathbf{I} + \\mathbf{A} + \\cdots + \\mathbf{A}^k) = \\mathbf{I} - \\mathbf{A}^{k+1}$, so the series converges to $(\\mathbf{I} - \\mathbf{A})^{-1}$ whenever $\\mathbf{A}^k \\to \\mathbf{0}$, i.e. the spectral radius of $\\mathbf{A}$ is below $1$.",
    "It justifies Leontief input–output models and iterative solvers (Jacobi iteration), and gives the first-order approximation $(\\mathbf{I} - \\mathbf{A})^{-1} \\approx \\mathbf{I} + \\mathbf{A}$ for small $\\mathbf{A}$."),

  // --- determinant ---------------------------------------------------------------------
  n(DT, "x4l-2x2", 4, "Compute $\\det\\begin{bmatrix}3 & 1\\\\2 & 4\\end{bmatrix}$.", 10),
  n(DT, "x4l-tri", 7, "Compute the determinant of an upper-triangular matrix with diagonal $2, 3, 4$.", 24),
  n(DT, "x4l-3x3", 8, "Compute $\\det\\begin{bmatrix}1 & 2 & 3\\\\0 & 1 & 4\\\\5 & 6 & 0\\end{bmatrix}$.", 1),
  n(DT, "x4l-tridiag3", 8, "Compute $\\det\\begin{bmatrix}2 & 1 & 0\\\\1 & 2 & 1\\\\0 & 1 & 2\\end{bmatrix}$.", 4),
  s(DT, "x4l-geometry", 8.5, "Interpret the determinant geometrically.",
    "$|\\det \\mathbf{A}|$ is the factor by which $\\mathbf{A}$ scales volumes: the unit cube maps to a parallelepiped of volume $|\\det \\mathbf{A}|$.",
    "The sign says whether orientation is preserved; $\\det \\mathbf{A} = 0$ means the map collapses space onto a lower-dimensional subspace."),
  n(DT, "x4l-tridiag4", 8.5, "The $n \\times n$ tridiagonal matrix with $2$ on the diagonal and $1$ off it has determinant $n + 1$. Compute it for $n = 4$.", 5),
  n(DT, "x4l-vandermonde", 9, "Compute the Vandermonde determinant $\\prod_{i<j}(x_j - x_i)$ for $x = 1, 2, 3$.", 2),
  s(DT, "x4l-compute", 9, "Why is cofactor expansion impractical for large matrices, and how are determinants actually computed?",
    "Cofactor (Leibniz) expansion has $n!$ terms — hopeless beyond $n \\approx 10$.",
    "In practice, compute $\\mathbf{P}\\mathbf{A} = \\mathbf{L}\\mathbf{U}$ in $O(n^3)$ and take $\\det \\mathbf{A} = \\pm\\prod_i u_{ii}$ (the sign comes from the permutation); use log-determinants to avoid overflow."),
  n(DT, "x4l-leibniz", 9, "How many terms does the Leibniz formula have for a $6 \\times 6$ determinant?", 720),
  s(DT, "x4l-unique", 9.5, "Characterise the determinant as the unique alternating, multilinear, normalised function of the columns.",
    "It is linear in each column, changes sign when two columns are swapped (so it vanishes when two columns are equal), and $\\det \\mathbf{I} = 1$.",
    "These properties force the Leibniz formula: expanding each column in the standard basis leaves only permutation terms, each fixed by the alternating property. Hence all its other properties follow."),

  // --- symmetric-matrices ------------------------------------------------------------
  n(SY, "x4l-entry", 4, "A symmetric matrix $\\mathbf{A}$ has $a_{12} = 5$. What is $a_{21}$?", 5),
  n(SY, "x4l-ata", 7, "For $\\mathbf{A} = \\begin{bmatrix}1 & 2\\\\0 & 1\\end{bmatrix}$, find the $(1, 2)$ entry of $\\mathbf{A}^\\top \\mathbf{A}$.", 2),
  n(SY, "x4l-eig", 8, "Find the larger eigenvalue of $\\begin{bmatrix}2 & 1\\\\1 & 2\\end{bmatrix}$.", 3),
  n(SY, "x4l-orth", 8, "Compute the dot product of eigenvectors of that matrix for eigenvalues $3$ and $1$.", 0),
  s(SY, "x4l-real", 8.5, "Why are the eigenvalues of a real symmetric matrix real?",
    "If $\\mathbf{A}\\mathbf{x} = \\lambda \\mathbf{x}$ with complex $\\mathbf{x}$, then $\\bar{\\mathbf{x}}^\\top \\mathbf{A}\\mathbf{x} = \\lambda\\|\\mathbf{x}\\|^2$; taking the conjugate transpose and using that $\\mathbf{A} = \\mathbf{A}^\\top$ is real gives $\\bar{\\mathbf{x}}^\\top \\mathbf{A}\\mathbf{x} = \\bar\\lambda\\|\\mathbf{x}\\|^2$.",
    "So $\\lambda = \\bar\\lambda$. Eigenvectors can then be chosen real too."),
  n(SY, "x4l-params", 8.5, "How many independent entries does a $4 \\times 4$ symmetric matrix have?", 10),
  n(SY, "x4l-ones", 9, "Find the largest eigenvalue of the $3 \\times 3$ all-ones matrix.", 3),
  s(SY, "x4l-orthogonal", 9, "Why are eigenvectors of a symmetric matrix for distinct eigenvalues orthogonal?",
    "If $\\mathbf{A}\\mathbf{x} = \\lambda \\mathbf{x}$ and $\\mathbf{A}\\mathbf{y} = \\mu \\mathbf{y}$, then $\\lambda\\, \\mathbf{x}^\\top \\mathbf{y} = (\\mathbf{A}\\mathbf{x})^\\top \\mathbf{y} = \\mathbf{x}^\\top \\mathbf{A}\\mathbf{y} = \\mu\\, \\mathbf{x}^\\top \\mathbf{y}$, using $\\mathbf{A}^\\top = \\mathbf{A}$.",
    "With $\\lambda \\ne \\mu$ this forces $\\mathbf{x}^\\top \\mathbf{y} = 0$."),
  n(SY, "x4l-quad", 9, "Evaluate $\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}$ for $\\mathbf{A} = \\begin{bmatrix}2 & 1\\\\1 & 2\\end{bmatrix}$ at $\\mathbf{x} = [1, -1]$.", 2),
  s(SY, "x4l-product", 9.5, "If $\\mathbf{A}$ and $\\mathbf{B}$ are symmetric, is $\\mathbf{A}\\mathbf{B}$? When is it?",
    "$(\\mathbf{A}\\mathbf{B})^\\top = \\mathbf{B}^\\top \\mathbf{A}^\\top = \\mathbf{B}\\mathbf{A}$, so $\\mathbf{A}\\mathbf{B}$ is symmetric exactly when $\\mathbf{A}$ and $\\mathbf{B}$ commute.",
    "Commuting symmetric matrices can be diagonalised by the same orthogonal matrix; e.g. $\\begin{bmatrix}1 & 0\\\\0 & 2\\end{bmatrix}\\begin{bmatrix}0 & 1\\\\1 & 0\\end{bmatrix}$ isn't symmetric."),

  // --- determinant-properties ---------------------------------------------------------
  n(DP, "x4l-scale", 4, "$\\mathbf{A}$ is $3 \\times 3$ with $\\det \\mathbf{A} = 5$. Compute $\\det(2\\mathbf{A})$.", 40),
  n(DP, "x4l-transpose", 7, "$\\det \\mathbf{A} = -3$. Compute $\\det(\\mathbf{A}^\\top)$.", -3),
  n(DP, "x4l-inverse", 8, "$\\det \\mathbf{A} = 4$. Compute $\\det(\\mathbf{A}^{-1})$.", 0.25, 0.001),
  n(DP, "x4l-product", 8, "$\\det \\mathbf{A} = 2$ and $\\det \\mathbf{B} = -3$. Compute $\\det(\\mathbf{A}\\mathbf{B})$.", -6),
  s(DP, "x4l-rowops", 8.5, "How do the three elementary row operations affect the determinant?",
    "Swapping two rows flips the sign; multiplying a row by $c$ multiplies the determinant by $c$.",
    "Adding a multiple of one row to another leaves it unchanged — which is why elimination to triangular form computes determinants."),
  n(DP, "x4l-combo", 8.5, "You swap two rows twice and then multiply a row by $3$. By what factor does the determinant change?", 3),
  n(DP, "x4l-ata", 9, "$\\mathbf{A}$ is $3 \\times 3$ with $\\det \\mathbf{A} = 2$. Compute $\\det(\\mathbf{A}^\\top \\mathbf{A})$.", 4),
  s(DP, "x4l-sum", 9, "Why is $\\det(\\mathbf{A} + \\mathbf{B}) \\ne \\det \\mathbf{A} + \\det \\mathbf{B}$ in general? Give an example.",
    "The determinant is multilinear in the columns, not linear in the whole matrix.",
    "E.g. $\\mathbf{A} = \\operatorname{diag}(1, 0)$ and $\\mathbf{B} = \\operatorname{diag}(0, 1)$: $\\det \\mathbf{A} = \\det \\mathbf{B} = 0$ but $\\det(\\mathbf{A} + \\mathbf{B}) = 1$."),
  n(DP, "x4l-reflect", 9, "What is the determinant of a reflection (Householder) matrix?", -1),
  s(DP, "x4l-lemma", 9.5, "State the matrix determinant lemma and give a use.",
    "For invertible $\\mathbf{A}$: $\\det(\\mathbf{A} + \\mathbf{u}\\mathbf{v}^\\top) = (1 + \\mathbf{v}^\\top \\mathbf{A}^{-1}\\mathbf{u})\\det \\mathbf{A}$.",
    "It updates a determinant after a rank-one change in $O(n^2)$ instead of $O(n^3)$ — used for Gaussian log-likelihoods under low-rank updates and in Bayesian optimisation."),

  // --- lu-decomposition ---------------------------------------------------------------
  n(LU, "x4l-l21", 4, "In the LU factorisation of $\\begin{bmatrix}2 & 1\\\\4 & 5\\end{bmatrix}$, find the multiplier $l_{21}$.", 2),
  n(LU, "x4l-u22", 7, "Find $u_{22}$.", 3),
  n(LU, "x4l-det", 8, "Use the factorisation to compute the determinant.", 6),
  n(LU, "x4l-zero-pivot", 8, "What is the first pivot of $\\begin{bmatrix}0 & 1\\\\1 & 1\\end{bmatrix}$ without row exchanges (showing why pivoting is needed)?", 0),
  s(LU, "x4l-pivoting", 8.5, "Explain partial pivoting and the factorisation $\\mathbf{P}\\mathbf{A} = \\mathbf{L}\\mathbf{U}$.",
    "At each step, swap rows so the pivot is the largest-magnitude entry in its column; this keeps all multipliers $|l_{ij}| \\le 1$.",
    "The swaps are recorded in a permutation matrix $\\mathbf{P}$, giving $\\mathbf{P}\\mathbf{A} = \\mathbf{L}\\mathbf{U}$; it avoids zero pivots and limits error growth."),
  n(LU, "x4l-u22b", 8.5, "In the LU factorisation (no pivoting) of $\\begin{bmatrix}1 & 2\\\\3 & 4\\end{bmatrix}$, find $u_{22}$.", -2),
  n(LU, "x4l-flops", 9, "LU costs about $\\frac{2}{3}n^3$ flops. Estimate it for $n = 1000$.", 666666667),
  s(LU, "x4l-reuse", 9, "Why factor once and reuse $\\mathbf{L}\\mathbf{U}$ for many right-hand sides?",
    "The factorisation costs $O(n^3)$, while each forward and back substitution costs only $O(n^2)$.",
    "Solving for $k$ right-hand sides costs $O(n^3 + kn^2)$ instead of $O(kn^3)$ — e.g. in Newton iterations with a fixed Jacobian, or computing selected columns of $\\mathbf{A}^{-1}$."),
  n(LU, "x4l-tiny", 9, "LU without pivoting on $\\begin{bmatrix}10^{-20} & 1\\\\1 & 1\\end{bmatrix}$: what is the multiplier $l_{21}$?", 1e20),
  s(LU, "x4l-growth", 9.5, "What is the growth factor in Gaussian elimination, and why is partial pivoting stable in practice?",
    "The growth factor is the ratio of the largest entry appearing during elimination to the largest entry of $\\mathbf{A}$; the backward error is proportional to it.",
    "With partial pivoting it can be $2^{n-1}$ in contrived examples, but it's almost always small in practice (a still not fully explained empirical fact), so partial pivoting is the standard."),

  // --- eigenvalues-eigenvectors ----------------------------------------------------------
  n(EV, "x4l-diag", 4, "Find the larger eigenvalue of $\\operatorname{diag}(3, 7)$.", 7),
  n(EV, "x4l-large", 7, `${A41}. Find its larger eigenvalue.`, 5),
  n(EV, "x4l-vec", 8, `${A41}. Its eigenvector for eigenvalue $2$ is $[1, k]$. Find $k$.`, -2),
  n(EV, "x4l-rot", 8, "What is the modulus of each eigenvalue of the $90^\\circ$ rotation matrix?", 1),
  s(EV, "x4l-char", 8.5, "Why does $\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0$ characterise the eigenvalues?",
    "$\\lambda$ is an eigenvalue exactly when $(\\mathbf{A} - \\lambda \\mathbf{I})\\mathbf{x} = \\mathbf{0}$ has a nonzero solution.",
    "That happens exactly when $\\mathbf{A} - \\lambda \\mathbf{I}$ is singular, i.e. $\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0$ — a degree-$n$ polynomial equation in $\\lambda$."),
  n(EV, "x4l-poly", 8.5, "$\\mathbf{A}$ has eigenvalues $2$ and $3$. Find the larger eigenvalue of $\\mathbf{A}^2 + \\mathbf{I}$.", 10),
  n(EV, "x4l-inv", 9, "$\\mathbf{A}$ has eigenvalue $4$. What is the corresponding eigenvalue of $\\mathbf{A}^{-1}$?", 0.25, 0.001),
  s(EV, "x4l-power", 9, "Explain the power method and what governs its convergence rate.",
    "Repeatedly multiply a vector by $\\mathbf{A}$ and normalise; the component along the dominant eigenvector grows fastest, so the iterate converges to it.",
    "The error shrinks like $|\\lambda_2/\\lambda_1|^k$, so convergence is slow when the top two eigenvalues are close; shifts or Krylov methods accelerate it."),
  n(EV, "x4l-iters", 9, "With $|\\lambda_2/\\lambda_1| = 0.9$, how many power-method iterations reduce the error by a factor of $10^{-6}$?", 132),
  s(EV, "x4l-pagerank", 9.5, "Explain PageRank as an eigenvector problem.",
    "Form the Google matrix $\\mathbf{G} = \\alpha \\mathbf{P} + (1 - \\alpha)\\frac{1}{n}\\mathbf{1}\\mathbf{1}^\\top$, with $\\mathbf{P}$ the column-stochastic link matrix; PageRank is the eigenvector with eigenvalue $1$ (the stationary distribution of a random surfer).",
    "The damping $\\alpha \\approx 0.85$ makes $\\mathbf{G}$ positive, so Perron–Frobenius guarantees a unique positive eigenvector, and $|\\lambda_2| \\le \\alpha$ makes the power method converge quickly."),

  // --- diagonalization --------------------------------------------------------------------
  n(DG, "x4l-det", 4, "$\\mathbf{A} = \\mathbf{P}\\mathbf{D}\\mathbf{P}^{-1}$ with $\\mathbf{D} = \\operatorname{diag}(2, 3)$. Compute $\\det \\mathbf{A}$.", 6),
  n(DG, "x4l-cube", 7, "For the same $\\mathbf{A}$, find the larger eigenvalue of $\\mathbf{A}^3$.", 27),
  n(DG, "x4l-defective", 8, "How many linearly independent eigenvectors does $\\begin{bmatrix}1 & 1\\\\0 & 1\\end{bmatrix}$ have?", 1),
  n(DG, "x4l-geo", 8, "What is the geometric multiplicity of $\\lambda = 1$ for that matrix?", 1),
  s(DG, "x4l-mult", 8.5, "Distinguish algebraic from geometric multiplicity, and relate them to diagonalisability.",
    "Algebraic multiplicity is the eigenvalue's multiplicity as a root of the characteristic polynomial; geometric multiplicity is the dimension of its eigenspace.",
    "Always geometric $\\le$ algebraic; a matrix is diagonalisable exactly when they are equal for every eigenvalue."),
  n(DG, "x4l-fib", 8.5, "Diagonalising $\\begin{bmatrix}1 & 1\\\\1 & 0\\end{bmatrix}$ gives Binet's formula. What is its dominant eigenvalue?", 1.618, 0.001),
  n(DG, "x4l-proj", 9, "Compute the $(1, 1)$ entry of $\\begin{bmatrix}0.5 & 0.5\\\\0.5 & 0.5\\end{bmatrix}^{100}$.", 0.5, 0.001),
  s(DG, "x4l-distinct", 9, "Why does an $n \\times n$ matrix with $n$ distinct eigenvalues have to be diagonalisable?",
    "Eigenvectors for distinct eigenvalues are linearly independent (induct: apply $\\mathbf{A} - \\lambda_k\\mathbf{I}$ to a supposed dependence to eliminate one vector at a time).",
    "$n$ independent eigenvectors form a basis, so $\\mathbf{P}$ is invertible and $\\mathbf{A} = \\mathbf{P}\\mathbf{D}\\mathbf{P}^{-1}$."),
  n(DG, "x4l-markov", 9, "Find the second eigenvalue of the Markov matrix $\\begin{bmatrix}0.9 & 0.1\\\\0.2 & 0.8\\end{bmatrix}$.", 0.7, 0.001),
  s(DG, "x4l-jordan", 9.5, "What does the Jordan form describe, and why do defective matrices matter in practice?",
    "Every square matrix is similar to a block-diagonal Jordan form; each block has $\\lambda$ on the diagonal and $1$s just above it, one block per independent eigenvector.",
    "Defective blocks produce polynomial factors: $e^{\\mathbf{A}t}$ contains terms like $te^{\\lambda t}$, e.g. critically damped oscillators; the Jordan form itself is numerically unstable to compute."),

  // --- eigendecomposition -------------------------------------------------------------------
  n(ED, "x4l-trace", 4, "Symmetric $\\mathbf{A} = \\mathbf{Q}\\boldsymbol{\\Lambda}\\mathbf{Q}^\\top$ with $\\boldsymbol{\\Lambda} = \\operatorname{diag}(1, 4)$. Compute $\\operatorname{tr}(\\mathbf{A})$.", 5),
  n(ED, "x4l-sqrt", 7, "For the same $\\mathbf{A}$, what is the larger eigenvalue of $\\mathbf{A}^{1/2}$?", 2),
  n(ED, "x4l-rank", 8, "A symmetric matrix has eigenvalues $3, 0, 0, 2$. What is its rank?", 2),
  n(ED, "x4l-entry", 8, "$\\mathbf{A} = 3\\mathbf{q}_1\\mathbf{q}_1^\\top + \\mathbf{q}_2\\mathbf{q}_2^\\top$ with $\\mathbf{q}_1 = [1, 1]/\\sqrt{2}$ and $\\mathbf{q}_2 = [1, -1]/\\sqrt{2}$. Find the $(1, 2)$ entry of $\\mathbf{A}$.", 1),
  s(ED, "x4l-projections", 8.5, "Explain the spectral decomposition of a symmetric matrix as a sum of rank-one projections.",
    "$\\mathbf{A} = \\sum_i\\lambda_i\\mathbf{q}_i\\mathbf{q}_i^\\top$: each term projects onto an eigenvector and scales by its eigenvalue.",
    "It makes functions of $\\mathbf{A}$ easy, $f(\\mathbf{A}) = \\sum_i f(\\lambda_i)\\mathbf{q}_i\\mathbf{q}_i^\\top$, and truncating the sum gives the best low-rank approximations."),
  n(ED, "x4l-exp", 8.5, "For the same $\\mathbf{A}$, find the $(1, 2)$ entry of $e^{\\mathbf{A}}$.", 8.6836, 0.001),
  n(ED, "x4l-inv", 9, "For the same $\\mathbf{A}$, find the $(1, 2)$ entry of $\\mathbf{A}^{-1}$.", -0.3333, 0.001),
  s(ED, "x4l-functions", 9, "Why is the eigendecomposition used to compute functions of matrices, and what are its limitations for non-normal matrices?",
    "If $\\mathbf{A} = \\mathbf{V}\\boldsymbol{\\Lambda}\\mathbf{V}^{-1}$, then $f(\\mathbf{A}) = \\mathbf{V}f(\\boldsymbol{\\Lambda})\\mathbf{V}^{-1}$, turning a matrix function into scalar functions of the eigenvalues (powers, exponentials, square roots).",
    "For non-normal matrices $\\mathbf{V}$ can be badly conditioned, amplifying errors; Schur-based or Padé methods are preferred, and defective matrices have no eigendecomposition at all."),
  n(ED, "x4l-cond", 9, "A symmetric positive definite matrix has eigenvalues $3$ and $1$. What is its condition number?", 3),
  s(ED, "x4l-pseudo", 9.5, "Why can eigenvalues of non-normal matrices be very sensitive to perturbations?",
    "For non-normal $\\mathbf{A}$ the eigenvectors can be nearly parallel, so the eigenvector matrix is ill-conditioned and tiny perturbations can move eigenvalues a lot (Bauer–Fike bounds the shift by $\\kappa(\\mathbf{V})\\|\\mathbf{E}\\|$).",
    "Pseudospectra — the sets of $z$ where $\\|(z\\mathbf{I} - \\mathbf{A})^{-1}\\|$ is large — describe the behaviour better, e.g. transient growth of $\\|\\mathbf{A}^k\\|$ even when all $|\\lambda| < 1$."),

  // --- orthogonal-matrices -------------------------------------------------------------
  n(OM, "x4l-det", 4, "What is the determinant of a rotation matrix?", 1),
  n(OM, "x4l-trace", 7, "$\\mathbf{Q}$ is a $3 \\times 3$ orthogonal matrix. Compute $\\operatorname{tr}(\\mathbf{Q}^\\top \\mathbf{Q})$.", 3),
  n(OM, "x4l-norm", 8, "$\\mathbf{Q}$ is orthogonal and $\\|\\mathbf{x}\\| = 5$. Compute $\\|\\mathbf{Q}\\mathbf{x}\\|$.", 5),
  n(OM, "x4l-rot60", 8, "Find the $(1, 1)$ entry of the rotation by $60^\\circ$.", 0.5, 0.001),
  s(OM, "x4l-eig", 8.5, "Why do all eigenvalues of an orthogonal matrix have modulus $1$?",
    "If $\\mathbf{Q}\\mathbf{x} = \\lambda \\mathbf{x}$ (allowing complex $\\mathbf{x}$), then $\\|\\mathbf{x}\\| = \\|\\mathbf{Q}\\mathbf{x}\\| = |\\lambda|\\,\\|\\mathbf{x}\\|$, since $\\mathbf{Q}$ preserves length.",
    "So $|\\lambda| = 1$: real eigenvalues are $\\pm 1$, and complex ones come in conjugate pairs $e^{\\pm i\\theta}$ (rotations)."),
  n(OM, "x4l-compose", 8.5, "Rotation by $30^\\circ$ followed by rotation by $45^\\circ$ is a rotation by how many degrees?", 75),
  n(OM, "x4l-householder", 9, "For a unit vector $\\mathbf{u}$, what eigenvalue does $\\mathbf{I} - 2\\mathbf{u}\\mathbf{u}^\\top$ have for the eigenvector $\\mathbf{u}$?", -1),
  s(OM, "x4l-axis", 9, "Explain why every rotation of $\\mathbb{R}^3$ has an axis.",
    "A $3 \\times 3$ rotation has $\\det = 1$ and eigenvalues of modulus $1$, one of them real; the complex ones come in a conjugate pair with product $1$.",
    "So the real eigenvalue must be $1$: its eigenvector is fixed by the rotation — the axis (Euler's rotation theorem)."),
  n(OM, "x4l-perms", 9, "How many $3 \\times 3$ permutation matrices are there?", 6),
  s(OM, "x4l-qr", 9.5, "Why are products of Householder reflectors or Givens rotations used to compute QR factorisations?",
    "Each is orthogonal, so applying them never amplifies errors (condition number $1$); Householder reflectors zero a whole column below the diagonal, Givens rotations zero single entries.",
    "The product of these orthogonal factors is $\\mathbf{Q}$; this is backward stable, unlike classical Gram–Schmidt, and Givens rotations suit sparse or structured matrices."),

  // --- schur-complement --------------------------------------------------------------
  n(SC, "x4l-scalar", 4, "For the block matrix with scalar blocks $a = 2$, $b = 1$, $c = 1$, $d = 3$, compute the Schur complement $d - ca^{-1}b$.", 2.5, 0.001),
  n(SC, "x4l-det", 7, "Use $\\det = a \\cdot (d - ca^{-1}b)$ to find the determinant of that $2 \\times 2$ matrix.", 5),
  n(SC, "x4l-condvar", 8, `${SIG}. Compute $\\text{Var}(X_2 \\mid X_1)$.`, 2),
  n(SC, "x4l-coef", 8, `${SIG}. Compute the regression coefficient $\\Sigma_{21}/\\Sigma_{11}$ of $X_2$ on $X_1$.`, 0.5, 0.001),
  s(SC, "x4l-elim", 8.5, "Explain how Schur complements arise from block elimination.",
    "Eliminating $\\mathbf{x}$ from $\\begin{bmatrix}\\mathbf{A} & \\mathbf{B}\\\\\\mathbf{C} & \\mathbf{D}\\end{bmatrix}\\begin{bmatrix}\\mathbf{x}\\\\\\mathbf{y}\\end{bmatrix} = \\begin{bmatrix}\\mathbf{f}\\\\\\mathbf{g}\\end{bmatrix}$ gives $(\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B})\\mathbf{y} = \\mathbf{g} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{f}$.",
    "So the Schur complement is the reduced system for $\\mathbf{y}$; it also gives $\\det \\mathbf{M} = \\det \\mathbf{A}\\det(\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B})$ and the blocks of $\\mathbf{M}^{-1}$."),
  n(SC, "x4l-pd", 8.5, "For $\\begin{bmatrix}1 & 2\\\\2 & 3\\end{bmatrix}$, compute the Schur complement $d - b^2/a$ (which shows the matrix isn't positive definite).", -1),
  n(SC, "x4l-invblock", 9, "The $(1, 1)$ block of the inverse is $(a - bd^{-1}c)^{-1}$. With $a = 2$, $b = c = 1$ and $d = 3$, compute it.", 0.6, 0.001),
  s(SC, "x4l-fwl", 9, "Relate the Schur complement to partialling out in regression (Frisch–Waugh–Lovell).",
    "In $\\mathbf{X}^\\top \\mathbf{X} = \\begin{bmatrix}\\mathbf{X}_1^\\top \\mathbf{X}_1 & \\mathbf{X}_1^\\top \\mathbf{X}_2\\\\\\mathbf{X}_2^\\top \\mathbf{X}_1 & \\mathbf{X}_2^\\top \\mathbf{X}_2\\end{bmatrix}$, the Schur complement $\\mathbf{X}_2^\\top \\mathbf{X}_2 - \\mathbf{X}_2^\\top \\mathbf{X}_1(\\mathbf{X}_1^\\top \\mathbf{X}_1)^{-1}\\mathbf{X}_1^\\top \\mathbf{X}_2 = \\mathbf{X}_2^\\top \\mathbf{M}_1\\mathbf{X}_2$ is the cross-product of $\\mathbf{X}_2$ after regressing out $\\mathbf{X}_1$.",
    "Hence the coefficients on $\\mathbf{X}_2$ come from regressing the residualised $\\mathbf{y}$ on the residualised $\\mathbf{X}_2$, and their variance uses the inverse Schur complement."),
  n(SC, "x4l-precision", 9, `${SIG}. Compute $(\\boldsymbol{\\Sigma}^{-1})_{22}$.`, 0.5, 0.001),
  s(SC, "x4l-gauss", 9.5, "Explain the role of the Schur complement in Gaussian conditioning and the Kalman filter update.",
    "For jointly Gaussian $(\\mathbf{x}, \\mathbf{y})$, $\\text{Cov}(\\mathbf{x} \\mid \\mathbf{y}) = \\boldsymbol{\\Sigma}_{xx} - \\boldsymbol{\\Sigma}_{xy}\\boldsymbol{\\Sigma}_{yy}^{-1}\\boldsymbol{\\Sigma}_{yx}$ — a Schur complement — and the conditional mean uses the same blocks.",
    "The Kalman filter's covariance update $\\mathbf{P} - \\mathbf{P}\\mathbf{H}^\\top(\\mathbf{H}\\mathbf{P}\\mathbf{H}^\\top + \\mathbf{R})^{-1}\\mathbf{H}\\mathbf{P}$ is exactly this conditioning of the state on the new observation."),

  // --- positive-definite-matrices -------------------------------------------------------
  n(PD, "x4l-diag", 4, "What is the smallest eigenvalue of $\\operatorname{diag}(2, 3)$?", 2),
  n(PD, "x4l-det", 7, "Compute $\\det\\begin{bmatrix}2 & 1\\\\1 & 2\\end{bmatrix}$.", 3),
  n(PD, "x4l-indef", 8, "Find the smallest eigenvalue of $\\begin{bmatrix}1 & 2\\\\2 & 1\\end{bmatrix}$.", -1),
  n(PD, "x4l-quad", 8, "Evaluate $\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}$ for $\\mathbf{A} = \\begin{bmatrix}2 & 1\\\\1 & 2\\end{bmatrix}$ at $\\mathbf{x} = [1, 1]$.", 6),
  s(PD, "x4l-sylvester", 8.5, "State Sylvester's criterion for positive definiteness.",
    "A symmetric matrix is positive definite if and only if all its leading principal minors are positive.",
    "For positive semidefiniteness, all principal minors (not just the leading ones) must be non-negative — e.g. $\\operatorname{diag}(0, -1)$ has non-negative leading minors but isn't PSD."),
  n(PD, "x4l-maxc", 8.5, "What is the largest $c$ for which $\\begin{bmatrix}1 & c\\\\c & 1\\end{bmatrix}$ is positive semidefinite?", 1),
  n(PD, "x4l-det3", 9, "Compute $\\det\\begin{bmatrix}4 & 2 & 0\\\\2 & 3 & 1\\\\0 & 1 & 2\\end{bmatrix}$.", 12),
  s(PD, "x4l-cov", 9, "Why are covariance matrices positive semidefinite, and when are they positive definite?",
    "For any $\\mathbf{a}$, $\\mathbf{a}^\\top\\boldsymbol{\\Sigma} \\mathbf{a} = \\text{Var}(\\mathbf{a}^\\top X) \\ge 0$.",
    "$\\boldsymbol{\\Sigma}$ is positive definite unless some non-trivial linear combination of the variables is constant (exact collinearity), e.g. when there are fewer observations than variables."),
  n(PD, "x4l-laplacian", 9, "Find the smallest eigenvalue of $\\begin{bmatrix}2 & -1\\\\-1 & 2\\end{bmatrix}$.", 1),
  s(PD, "x4l-convex", 9.5, "Explain how positive definite matrices relate to convexity and Newton's method.",
    "$f(\\mathbf{x}) = \\tfrac{1}{2}\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x} - \\mathbf{b}^\\top \\mathbf{x}$ is strictly convex exactly when $\\mathbf{A}$ is positive definite, with unique minimiser $\\mathbf{A}^{-1}\\mathbf{b}$; generally a twice-differentiable function is convex when its Hessian is PSD.",
    "Newton's step $-\\mathbf{H}^{-1}\\nabla f$ is a descent direction only when $\\mathbf{H}$ is positive definite; otherwise it must be modified (damping, trust regions, or Levenberg–Marquardt)."),
];
