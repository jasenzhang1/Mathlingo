import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Linear algebra 40-pass (part E): projections, stability, Cholesky, spectral theorem, SVD, PCA, low rank. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
void mcq;

const ID = "idempotent-matrices";
const RQ = "rayleigh-quotient";
const MS = "matrix-stability";
const CH = "cholesky-decomposition";
const ST = "spectral-theorem";
const SV = "svd";
const US = "uniqueness-of-svd";
const SF = "svd-four-fundamental-subspaces";
const MP = "moore-penrose-inverse";
const PC = "pca-matrix-edition";
const EY = "eckart-young";

const M425 = "$\\mathbf{A} =\\begin{bmatrix}4 & 2\\\\2 & 5\\end{bmatrix}$";

export const laFortyEItems: Item[] = [
  // --- idempotent-matrices -------------------------------------------------------------
  n(ID, "x4l-trace", 4, "An idempotent matrix $\\mathbf{P}$ has rank $3$. Compute $\\operatorname{tr}(\\mathbf{P})$.", 3),
  n(ID, "x4l-eigcount", 5, "How many distinct values can the eigenvalues of an idempotent matrix take?", 2),
  n(ID, "x4l-hat", 7, "For a regression with $n = 20$ observations and $p = 4$ columns, compute $\\operatorname{tr}(\\mathbf{H})$ for the hat matrix $\\mathbf{H}$.", 4),
  n(ID, "x4l-resid", 8, "Compute $\\operatorname{tr}(\\mathbf{I} - \\mathbf{H})$ for the same regression.", 16),
  s(ID, "x4l-eig", 8.5, "Why are the eigenvalues of an idempotent matrix $0$ or $1$?",
    "If $\\mathbf{P}\\mathbf{x} = \\lambda \\mathbf{x}$ with $\\mathbf{x} \\ne \\mathbf{0}$, then $\\lambda \\mathbf{x} = \\mathbf{P}\\mathbf{x} = \\mathbf{P}^2\\mathbf{x} = \\lambda^2\\mathbf{x}$, so $\\lambda^2 = \\lambda$.",
    "Idempotent matrices are diagonalisable, so rank = number of eigenvalues equal to $1$ = trace."),
  n(ID, "x4l-oblique", 8.5, "$\\mathbf{P} = \\begin{bmatrix}1 & 1\\\\0 & 0\\end{bmatrix}$. Find the $(1, 2)$ entry of $\\mathbf{P}^2$.", 1),
  n(ID, "x4l-oblique-rank", 9, "What is the rank of that $\\mathbf{P}$?", 1),
  s(ID, "x4l-orth-vs-obl", 9, "Distinguish orthogonal projections from oblique ones.",
    "Every idempotent matrix projects onto its column space along its null space; it's an orthogonal projection exactly when it's also symmetric ($\\mathbf{P} = \\mathbf{P}^\\top$), so that the null space is orthogonal to the range.",
    "Oblique projections like $\\begin{bmatrix}1 & 1\\\\0 & 0\\end{bmatrix}$ can lengthen vectors ($\\|\\mathbf{P}\\| > 1$); orthogonal ones never do."),
  n(ID, "x4l-center", 9, "What is the rank of the centring matrix $\\mathbf{I} - \\frac{1}{n}\\mathbf{1}\\mathbf{1}^\\top$ for $n = 5$?", 4),
  s(ID, "x4l-cochran", 9.5, "Explain the idea behind Cochran's theorem.",
    "If $\\mathbf{z} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})$ and $\\mathbf{P}$ is a symmetric idempotent matrix of rank $r$, then $\\mathbf{z}^\\top \\mathbf{P}\\mathbf{z} \\sim \\chi^2_r$ (rotate to the eigenbasis: it's a sum of $r$ squared standard normals).",
    "When $\\mathbf{I} = \\mathbf{P}_1 + \\cdots + \\mathbf{P}_k$ with ranks adding to $n$, the quadratic forms are independent $\\chi^2$ variables — this is why regression and residual sums of squares give F-tests."),

  // --- rayleigh-quotient ----------------------------------------------------------------
  n(RQ, "x4l-e1", 4, "Compute $R(\\mathbf{x}) = \\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}/\\mathbf{x}^\\top \\mathbf{x}$ for $\\mathbf{A} = \\operatorname{diag}(1, 5)$ and $\\mathbf{x} = [1, 0]$.", 1),
  n(RQ, "x4l-max", 5, "What is the maximum of $R(\\mathbf{x})$ over nonzero $\\mathbf{x}$ for the same $\\mathbf{A}$?", 5),
  n(RQ, "x4l-mix", 7, "Compute $R(\\mathbf{x})$ for the same $\\mathbf{A}$ at $\\mathbf{x} = [1, 1]$.", 3),
  n(RQ, "x4l-offdiag", 8, "Compute $R(\\mathbf{x})$ for $\\mathbf{A} = \\begin{bmatrix}2 & 1\\\\1 & 2\\end{bmatrix}$ at $\\mathbf{x} = [1, 0]$.", 2),
  s(RQ, "x4l-variational", 8.5, "Why is the Rayleigh quotient maximised by the top eigenvector of a symmetric matrix?",
    "Expand $\\mathbf{x} = \\sum_i c_i\\mathbf{q}_i$ in orthonormal eigenvectors: $R(\\mathbf{x}) = \\sum_i \\lambda_ic_i^2/\\sum_i c_i^2$, a weighted average of the eigenvalues.",
    "A weighted average is at most $\\lambda_{\\max}$, attained when all the weight is on $\\mathbf{q}_1$; similarly the minimum is $\\lambda_{\\min}$."),
  n(RQ, "x4l-courant", 8.5, "Courant–Fischer: the second eigenvalue is the maximum of $R(\\mathbf{x})$ over $\\mathbf{x} \\perp \\mathbf{q}_1$. For $\\operatorname{diag}(1, 3, 5)$, what is it?", 3),
  n(RQ, "x4l-quadratic", 9, "If $\\mathbf{x}$ is an eigenvector approximation with error $\\varepsilon = 0.01$, the Rayleigh quotient's eigenvalue error is of order $\\varepsilon^2$. Compute $\\varepsilon^2$.", 0.0001, 0.00001),
  s(RQ, "x4l-rqi", 9, "Explain Rayleigh quotient iteration and why it converges so fast.",
    "Alternate: set the shift $\\mu = R(\\mathbf{x})$, then solve $(\\mathbf{A} - \\mu \\mathbf{I})\\mathbf{y} = \\mathbf{x}$ and normalise (inverse iteration with an adaptive shift).",
    "Because the Rayleigh quotient's error is quadratic in the eigenvector error, the iteration converges cubically for symmetric matrices."),
  n(RQ, "x4l-generalised", 9, "Find the maximum of the generalised Rayleigh quotient $\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}/\\mathbf{x}^\\top \\mathbf{B}\\mathbf{x}$ for $\\mathbf{A} = \\operatorname{diag}(4, 1)$ and $\\mathbf{B} = \\operatorname{diag}(2, 1)$.", 2),
  s(RQ, "x4l-pca-lda", 9.5, "Connect the Rayleigh quotient to PCA and to Fisher's linear discriminant.",
    "PCA's first direction maximises $\\mathbf{w}^\\top\\boldsymbol{\\Sigma} \\mathbf{w}/\\mathbf{w}^\\top \\mathbf{w}$ — the top eigenvector of the covariance matrix.",
    "Fisher's LDA maximises $\\mathbf{w}^\\top \\mathbf{S}_B\\mathbf{w}/\\mathbf{w}^\\top \\mathbf{S}_W\\mathbf{w}$ (between- over within-class scatter), a generalised Rayleigh quotient solved by the eigenproblem $\\mathbf{S}_B\\mathbf{w} = \\lambda \\mathbf{S}_W\\mathbf{w}$."),

  // --- matrix-stability ---------------------------------------------------------------
  n(MS, "x4l-rho", 4, "$\\mathbf{x}_{k+1} = \\mathbf{A}\\mathbf{x}_k$ with $\\mathbf{A} = \\operatorname{diag}(0.5, 0.9)$. What is the spectral radius?", 0.9, 0.001),
  n(MS, "x4l-cont", 5, "For $\\dot{\\mathbf{x}} = \\mathbf{A}\\mathbf{x}$ with $\\mathbf{A} = \\operatorname{diag}(-1, 2)$, what is the largest real part of an eigenvalue (showing instability)?", 2),
  n(MS, "x4l-jordan-rho", 7, "What is the spectral radius of $\\begin{bmatrix}0.5 & 1\\\\0 & 0.5\\end{bmatrix}$?", 0.5, 0.001),
  n(MS, "x4l-transient", 8, "For that matrix, find the $(1, 2)$ entry of $\\mathbf{A}^2$.", 1),
  s(MS, "x4l-growth", 8.5, "Why can a system with spectral radius below $1$ still show large transient growth?",
    "For non-normal matrices, $\\|\\mathbf{A}^k\\|$ can grow for a while before decaying: e.g. $\\begin{bmatrix}0.5 & 1\\\\0 & 0.5\\end{bmatrix}^k$ has $(1, 2)$ entry $k \\cdot 0.5^{k-1}$.",
    "Eigenvalues govern only the long-run rate; nearly parallel eigenvectors (non-normality) allow transient amplification — relevant in fluid dynamics and ecology."),
  n(MS, "x4l-ar2", 8.5, "The AR(2) model $x_t = 1.2x_{t-1} - 0.32x_{t-2}$ has companion-matrix eigenvalues solving $\\lambda^2 - 1.2\\lambda + 0.32 = 0$. Find the larger.", 0.8, 0.001),
  n(MS, "x4l-halflife", 9, "With dominant eigenvalue $0.9$, how many steps does it take for a deviation to halve?", 6.5788, 0.001),
  s(MS, "x4l-disc-cont", 9, "Relate the stability conditions for discrete and continuous linear systems.",
    "Discrete $\\mathbf{x}_{k+1} = \\mathbf{A}\\mathbf{x}_k$ is stable when all $|\\lambda| < 1$; continuous $\\dot{\\mathbf{x}} = \\mathbf{A}\\mathbf{x}$ is stable when all $\\operatorname{Re}(\\lambda) < 0$.",
    "Sampling a continuous system every $h$ gives $\\mathbf{A}_d = e^{\\mathbf{A}h}$ with eigenvalues $e^{\\lambda h}$, and $|e^{\\lambda h}| < 1$ exactly when $\\operatorname{Re}(\\lambda) < 0$."),
  n(MS, "x4l-euler", 9, "Explicit Euler for $\\dot{x} = -2x$ gives $x_{k+1} = (1 - 2h)x_k$. What is the largest step $h$ for which the iteration is (non-strictly) stable?", 1),
  s(MS, "x4l-lyapunov", 9.5, "Explain the Lyapunov equation $\\mathbf{A}^\\top \\mathbf{P} + \\mathbf{P}\\mathbf{A} = -\\mathbf{Q}$ as a stability test.",
    "$\\dot{\\mathbf{x}} = \\mathbf{A}\\mathbf{x}$ is asymptotically stable iff for some (any) positive definite $\\mathbf{Q}$ there is a positive definite solution $\\mathbf{P}$.",
    "Then $V(\\mathbf{x}) = \\mathbf{x}^\\top \\mathbf{P}\\mathbf{x}$ is a Lyapunov function: it's positive and decreases along trajectories, since $\\dot{V} = -\\mathbf{x}^\\top \\mathbf{Q}\\mathbf{x} < 0$. The discrete analogue is $\\mathbf{A}^\\top \\mathbf{P}\\mathbf{A} - \\mathbf{P} = -\\mathbf{Q}$."),

  // --- cholesky-decomposition ---------------------------------------------------------
  n(CH, "x4l-diag", 4, "Find $\\ell_{22}$ in the Cholesky factorisation of $\\operatorname{diag}(4, 9)$.", 3),
  n(CH, "x4l-l11", 5, `${M425}. Find $\\ell_{11}$ in its Cholesky factor.`, 2),
  n(CH, "x4l-l21", 7, `${M425}. Find $\\ell_{21}$.`, 1),
  n(CH, "x4l-l22", 8, `${M425}. Find $\\ell_{22}$.`, 2),
  s(CH, "x4l-pd", 8.5, "Why does the Cholesky factorisation require positive definiteness, and how does it fail otherwise?",
    "$\\mathbf{A} = \\mathbf{L}\\mathbf{L}^\\top$ with real $\\mathbf{L}$ implies $\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x} = \\|\\mathbf{L}^\\top \\mathbf{x}\\|^2 \\ge 0$, so only positive (semi)definite matrices can have one.",
    "The algorithm takes square roots of $a_{jj} - \\sum_k \\ell_{jk}^2$; for a non-PD matrix one of these is $\\le 0$ and it breaks down — which makes it a cheap PD test."),
  n(CH, "x4l-logdet", 8.5, "Compute $\\log\\det \\mathbf{A} = 2\\sum_i \\log \\ell_{ii}$ when $\\mathbf{L}$ has diagonal $[2, 2]$.", 2.7726, 0.001),
  n(CH, "x4l-sample", 9, `Sampling $\\mathbf{x} = \\boldsymbol{\\mu} + \\mathbf{L}\\mathbf{z}$ from $\\mathcal{N}(\\mathbf{0}, \\mathbf{A})$ with ${M425}, $\\boldsymbol{\\mu} = \\mathbf{0}$ and $\\mathbf{z} = [1, 0]$: find $x_2$.`, 1),
  s(CH, "x4l-sampling", 9, "Explain how Cholesky is used to sample correlated Gaussians, and why it works.",
    "Draw $\\mathbf{z} \\sim \\mathcal{N}(\\mathbf{0}, \\mathbf{I})$ and set $\\mathbf{x} = \\boldsymbol{\\mu} + \\mathbf{L}\\mathbf{z}$ with $\\boldsymbol{\\Sigma} = \\mathbf{L}\\mathbf{L}^\\top$.",
    "Then $\\text{Cov}(\\mathbf{x}) = \\mathbf{L}\\,\\text{Cov}(\\mathbf{z})\\,\\mathbf{L}^\\top = \\mathbf{L}\\mathbf{L}^\\top = \\boldsymbol{\\Sigma}$, and $\\mathbf{x}$ is Gaussian as a linear transform of a Gaussian."),
  n(CH, "x4l-cost", 9, "Cholesky costs about $n^3/3$ flops and LU about $2n^3/3$. What is the ratio?", 0.5, 0.001),
  s(CH, "x4l-stable", 9.5, "Why is Cholesky numerically stable without pivoting?",
    "From $a_{jj} = \\sum_k \\ell_{jk}^2$, every entry satisfies $|\\ell_{jk}| \\le \\sqrt{a_{jj}}$, so there's no element growth.",
    "Hence it's backward stable for any positive definite matrix; pivoting is only needed for semidefinite or rank-revealing variants."),

  // --- spectral-theorem ----------------------------------------------------------------
  n(ST, "x4l-det", 5, "A symmetric $3 \\times 3$ matrix has eigenvalues $1$, $2$ and $3$. Compute its determinant.", 6),
  n(ST, "x4l-count", 5.5, "How many orthonormal eigenvectors does a $4 \\times 4$ real symmetric matrix have?", 4),
  n(ST, "x4l-square", 8.5, "A symmetric $\\mathbf{A}$ has eigenvalues $2$ and $-1$. What is the smaller eigenvalue of $\\mathbf{A}^2$?", 1),
  s(ST, "x4l-state", 8.5, "State the spectral theorem for real symmetric matrices.",
    "Every real symmetric matrix can be written $\\mathbf{A} = \\mathbf{Q}\\boldsymbol{\\Lambda}\\mathbf{Q}^\\top$ with $\\mathbf{Q}$ orthogonal and $\\boldsymbol{\\Lambda}$ real diagonal.",
    "Equivalently, $\\mathbb{R}^n$ has an orthonormal basis of eigenvectors of $\\mathbf{A}$, and $\\mathbf{A} = \\sum_i \\lambda_i\\mathbf{q}_i\\mathbf{q}_i^\\top$."),
  n(ST, "x4l-rot", 9, "The $90^\\circ$ rotation matrix is normal. How many real eigenvalues does it have?", 0),
  s(ST, "x4l-normal", 9, "Why does the spectral theorem extend to normal matrices over $\\mathbb{C}$ but require symmetry over the reals?",
    "Over $\\mathbb{C}$, $\\mathbf{A}$ is unitarily diagonalisable iff $\\mathbf{A}\\mathbf{A}^* = \\mathbf{A}^*\\mathbf{A}$ (normal); unitary, Hermitian and skew-Hermitian matrices all qualify.",
    "Real orthogonal diagonalisation needs real eigenvalues too, which requires symmetry: rotations are normal but have complex eigenvalues."),
  n(ST, "x4l-max", 9, "A symmetric matrix $\\mathbf{A}$ has eigenvalues $5$ and $1$. What is the maximum of $\\mathbf{x}^\\top \\mathbf{A}\\mathbf{x}$ over unit vectors?", 5),
  s(ST, "x4l-proof", 9, "Sketch a proof of the spectral theorem by induction.",
    "A symmetric matrix has a real eigenvalue with unit eigenvector $\\mathbf{q}_1$ (e.g. the maximiser of the Rayleigh quotient).",
    "The orthogonal complement of $\\mathbf{q}_1$ is invariant under $\\mathbf{A}$ (if $\\mathbf{x} \\perp \\mathbf{q}_1$ then $\\mathbf{q}_1^\\top \\mathbf{A}\\mathbf{x} = \\lambda_1\\mathbf{q}_1^\\top \\mathbf{x} = 0$), and $\\mathbf{A}$ restricted to it is symmetric; apply induction."),
  n(ST, "x4l-commute", 9.5, "$\\mathbf{A} = \\begin{bmatrix}2 & 1\\\\1 & 2\\end{bmatrix}$ and $\\mathbf{B} = \\begin{bmatrix}1 & 3\\\\3 & 1\\end{bmatrix}$ commute and share eigenvectors. What is the eigenvalue of $\\mathbf{B}$ on $[1, 1]/\\sqrt{2}$?", 4),
  s(ST, "x4l-operators", 9.5, "How does the spectral theorem generalise to operators in infinite dimensions?",
    "Compact self-adjoint operators on a Hilbert space have an orthonormal basis of eigenvectors with real eigenvalues tending to $0$; e.g. Mercer's theorem for kernels, and Karhunen–Loève expansions.",
    "Differential operators like $-d^2/dx^2$ with boundary conditions are self-adjoint with eigenfunctions $\\sin(k\\pi x)$: Fourier series are the spectral decomposition of the Laplacian."),

  // --- svd ----------------------------------------------------------------------------
  n(SV, "x4l-diag", 5, "What is the largest singular value of $\\operatorname{diag}(3, -4)$?", 4),
  n(SV, "x4l-rank", 5.5, "A matrix has singular values $5$, $3$ and $0$. What is its rank?", 2),
  n(SV, "x4l-col", 8, "Find the singular value of $\\begin{bmatrix}3 & 0\\\\4 & 0\\end{bmatrix}$ that isn't zero.", 5),
  n(SV, "x4l-frob", 8.5, "A matrix has singular values $5$ and $3$. Compute its Frobenius norm.", 5.831, 0.001),
  s(SV, "x4l-eig", 8.5, "How is the SVD related to the eigendecompositions of $\\mathbf{A}^\\top \\mathbf{A}$ and $\\mathbf{A}\\mathbf{A}^\\top$?",
    "$\\mathbf{A}^\\top \\mathbf{A} = \\mathbf{V}\\boldsymbol{\\Sigma}^2\\mathbf{V}^\\top$ and $\\mathbf{A}\\mathbf{A}^\\top = \\mathbf{U}\\boldsymbol{\\Sigma}^2\\mathbf{U}^\\top$: the right and left singular vectors are their eigenvectors, and the singular values are the square roots of their eigenvalues.",
    "Computing the SVD via $\\mathbf{A}^\\top \\mathbf{A}$ squares the condition number, so stable algorithms (Golub–Kahan bidiagonalisation) work on $\\mathbf{A}$ directly."),
  n(SV, "x4l-ones", 9, "Find the largest singular value of $\\begin{bmatrix}1 & 1\\\\1 & 1\\end{bmatrix}$.", 2),
  n(SV, "x4l-cond", 9, "A matrix has singular values $10$ and $0.1$. Compute its condition number.", 100),
  s(SV, "x4l-geometry", 9, "Describe the geometric meaning of the SVD.",
    "$\\mathbf{A} = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$: rotate or reflect with $\\mathbf{V}^\\top$, stretch the axes by the singular values, then rotate or reflect with $\\mathbf{U}$.",
    "It maps the unit sphere to an ellipsoid whose semi-axes are $\\sigma_i\\mathbf{u}_i$ — every linear map is a rotation, a stretch and a rotation."),
  n(SV, "x4l-nuclear", 9.5, "A matrix has singular values $5$, $3$ and $1$. Compute its nuclear norm.", 9),
  s(SV, "x4l-randomised", 9.5, "Explain the idea of randomised SVD.",
    "Multiply $\\mathbf{A}$ by a random $n \\times (k + p)$ matrix $\\boldsymbol{\\Omega}$ to get $\\mathbf{Y} = \\mathbf{A}\\boldsymbol{\\Omega}$, whose columns approximately span the top-$k$ column space of $\\mathbf{A}$; orthonormalise $\\mathbf{Y} = \\mathbf{Q}\\mathbf{R}$.",
    "Then compute the small SVD of $\\mathbf{Q}^\\top \\mathbf{A}$ and lift back. A few power iterations sharpen it when singular values decay slowly; it's far cheaper than a full SVD for large, approximately low-rank matrices."),

  // --- uniqueness-of-svd -------------------------------------------------------------------
  n(US, "x4l-signs", 4, "A $3 \\times 3$ matrix has distinct, nonzero singular values. How many SVDs are there, counting only simultaneous sign flips of the pairs $(\\mathbf{u}_i, \\mathbf{v}_i)$?", 8),
  n(US, "x4l-identity", 5, "What are the singular values of $\\mathbf{I}_2$? (Give their common value.)", 1),
  n(US, "x4l-rotation", 5.5, "For $\\mathbf{I}_2 = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$, any rotation $\\mathbf{U} = \\mathbf{V}$ works. How many free parameters does a $2 \\times 2$ rotation have?", 1),
  n(US, "x4l-flip", 8.5, "If $\\mathbf{u}_1$ is replaced by $-\\mathbf{u}_1$, by what multiple of $\\mathbf{v}_1$ must $\\mathbf{v}_1$ be replaced to keep $\\mathbf{A} = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$?", -1),
  s(US, "x4l-sense", 8.5, "In what sense is the SVD unique?",
    "The singular values (in decreasing order) are unique. For distinct nonzero singular values, each pair $(\\mathbf{u}_i, \\mathbf{v}_i)$ is unique up to a simultaneous sign flip.",
    "For a repeated singular value, only the corresponding subspaces are unique; any orthonormal basis of them works (with $\\mathbf{V}$ rotated to match). Vectors for zero singular values are also arbitrary within the null spaces."),
  n(US, "x4l-subspace", 9, "For $\\mathbf{A} = \\operatorname{diag}(2, 2, 1)$, what is the dimension of the singular subspace for $\\sigma = 2$?", 2),
  s(US, "x4l-repeated", 9, "Why do repeated or nearly repeated singular values make individual singular vectors ill-defined numerically?",
    "With a repeated singular value, any rotation within its subspace is a valid choice; with nearly repeated values, a tiny perturbation can rotate the computed vectors a lot.",
    "Only the whole subspace is stable; comparing singular vectors across datasets or runs should use subspace angles, not individual vectors."),
  n(US, "x4l-free-cols", 9, "A $4 \\times 3$ matrix has rank $3$ and distinct singular values. In its full SVD, how many columns of $\\mathbf{U}$ can be any orthonormal basis of the left null space (i.e. aren't pinned down beyond that)?", 1),
  s(US, "x4l-values", 9, "Why are the singular values unique even when the singular vectors aren't?",
    "They are the square roots of the eigenvalues of $\\mathbf{A}^\\top \\mathbf{A}$, which are determined by $\\mathbf{A}$ alone.",
    "Equivalently, $\\sigma_k$ has a variational characterisation (Courant–Fischer for $\\|\\mathbf{A}\\mathbf{x}\\|$) that doesn't refer to any basis."),
  s(US, "x4l-wedin", 9.5, "What governs how sensitive singular vectors are to perturbations (Wedin's theorem)?",
    "Singular values are perfectly conditioned: $|\\sigma_i(\\mathbf{A} + \\mathbf{E}) - \\sigma_i(\\mathbf{A})| \\le \\|\\mathbf{E}\\|$.",
    "Singular subspaces move by an angle of about $\\|\\mathbf{E}\\|/\\text{gap}$, where the gap separates the chosen singular values from the rest — small gaps mean unstable vectors."),

  // --- svd-four-fundamental-subspaces ----------------------------------------------------
  n(SF, "x4l-leftnull", 4, "$\\mathbf{A}$ is $5 \\times 3$ with rank $2$. How many columns of $\\mathbf{U}$ span the left null space?", 3),
  n(SF, "x4l-null", 5, "How many columns of $\\mathbf{V}$ span the null space?", 1),
  n(SF, "x4l-av", 5.5, "$\\mathbf{A} = \\sigma_1\\mathbf{u}_1\\mathbf{v}_1^\\top$ with $\\sigma_1 = 4$. $\\mathbf{A}\\mathbf{v}_1$ is what multiple of $\\mathbf{u}_1$?", 4),
  n(SF, "x4l-atu", 8.5, "For the same $\\mathbf{A}$, $\\mathbf{A}^\\top \\mathbf{u}_1$ is what multiple of $\\mathbf{v}_1$?", 4),
  s(SF, "x4l-which", 8.5, "Which singular vectors span which of the four fundamental subspaces?",
    "For rank $r$: $\\mathbf{u}_1, \\ldots, \\mathbf{u}_r$ span the column space and $\\mathbf{u}_{r+1}, \\ldots, \\mathbf{u}_m$ the left null space; $\\mathbf{v}_1, \\ldots, \\mathbf{v}_r$ span the row space and $\\mathbf{v}_{r+1}, \\ldots, \\mathbf{v}_n$ the null space.",
    "$\\mathbf{A}\\mathbf{v}_i = \\sigma_i\\mathbf{u}_i$ and $\\mathbf{A}^\\top \\mathbf{u}_i = \\sigma_i\\mathbf{v}_i$ for $i \\le r$, so $\\mathbf{A}$ maps the row space onto the column space; the remaining vectors are sent to $\\mathbf{0}$."),
  n(SF, "x4l-dims", 9, "$\\mathbf{A}$ is $6 \\times 4$ with singular values $3, 2, 0, 0$. What is the dimension of the left null space?", 4),
  s(SF, "x4l-rank", 9, "Use the SVD to show that row rank equals column rank.",
    "The number of nonzero singular values $r$ gives both: $\\mathbf{u}_1, \\ldots, \\mathbf{u}_r$ form a basis of the column space and $\\mathbf{v}_1, \\ldots, \\mathbf{v}_r$ a basis of the row space.",
    "So both spaces have dimension $r$."),
  n(SF, "x4l-proj", 9, "The projection onto $C(\\mathbf{A})$ is $\\mathbf{U}_r\\mathbf{U}_r^\\top$. Compute its trace for rank $2$.", 2),
  s(SF, "x4l-ls", 9, "Explain how the SVD gives the minimum-norm least squares solution in terms of the four subspaces.",
    "$\\mathbf{x}^+ = \\sum_{i \\le r}\\frac{\\mathbf{u}_i^\\top \\mathbf{b}}{\\sigma_i}\\mathbf{v}_i$: project $\\mathbf{b}$ onto the column space ($\\mathbf{u}_i^\\top \\mathbf{b}$), undo the stretching, and map back into the row space.",
    "The left-null-space part of $\\mathbf{b}$ is the unavoidable residual; adding any null-space component to $\\mathbf{x}^+$ gives another least squares solution, but with a larger norm."),
  s(SF, "x4l-numerical", 9.5, "How does the SVD help determine numerical rank and compare subspaces?",
    "The numerical rank is the number of singular values above a tolerance; a large gap $\\sigma_r \\gg \\sigma_{r+1}$ makes the rank and the subspaces well defined.",
    "The principal angles between two subspaces with orthonormal bases $\\mathbf{Q}_1$, $\\mathbf{Q}_2$ are the arccosines of the singular values of $\\mathbf{Q}_1^\\top \\mathbf{Q}_2$."),

  // --- moore-penrose-inverse -----------------------------------------------------------------
  n(MP, "x4l-diag11", 4, "Find the $(1, 1)$ entry of the pseudoinverse of $\\operatorname{diag}(2, 0)$.", 0.5, 0.001),
  n(MP, "x4l-diag22", 5, "Find its $(2, 2)$ entry.", 0),
  n(MP, "x4l-vector", 7, "The pseudoinverse of the column $\\mathbf{v} = [3, 4]^\\top$ is $\\mathbf{v}^\\top/\\|\\mathbf{v}\\|^2$. Find its first entry.", 0.12, 0.001),
  n(MP, "x4l-fullcol", 8, "For $\\mathbf{A} = [1, 1]^\\top$ (full column rank), $\\mathbf{A}^+ = (\\mathbf{A}^\\top \\mathbf{A})^{-1}\\mathbf{A}^\\top$. What is each entry?", 0.5, 0.001),
  s(MP, "x4l-penrose", 8.5, "State the four Penrose conditions that define $\\mathbf{A}^+$.",
    "$\\mathbf{A}\\mathbf{A}^+\\mathbf{A} = \\mathbf{A}$ and $\\mathbf{A}^+\\mathbf{A}\\mathbf{A}^+ = \\mathbf{A}^+$.",
    "$(\\mathbf{A}\\mathbf{A}^+)^\\top = \\mathbf{A}\\mathbf{A}^+$ and $(\\mathbf{A}^+\\mathbf{A})^\\top = \\mathbf{A}^+\\mathbf{A}$ (both products are orthogonal projections). Exactly one matrix satisfies all four."),
  n(MP, "x4l-minnorm", 8.5, "Use the pseudoinverse to find the minimum-norm solution of $\\begin{bmatrix}1 & 1\\end{bmatrix}\\mathbf{x} = 2$. Give $x_1$.", 1),
  n(MP, "x4l-ones", 9, "Find the $(1, 1)$ entry of the pseudoinverse of $\\begin{bmatrix}1 & 1\\\\1 & 1\\end{bmatrix}$.", 0.25, 0.001),
  s(MP, "x4l-why-min", 9, "Why is $\\mathbf{A}^+\\mathbf{b}$ the minimum-norm least squares solution?",
    "$\\mathbf{A}\\mathbf{A}^+$ is the projection onto $C(\\mathbf{A})$, so $\\mathbf{A}\\mathbf{A}^+\\mathbf{b}$ is the closest achievable point: $\\mathbf{A}^+\\mathbf{b}$ solves least squares.",
    "$\\mathbf{A}^+\\mathbf{b}$ lies in the row space, and every other least squares solution adds a null-space component orthogonal to it, which only increases the norm."),
  n(MP, "x4l-rank1", 9, "For $\\mathbf{A} = \\mathbf{u}\\mathbf{v}^\\top$ with $\\mathbf{u} = \\mathbf{e}_1$ and $\\mathbf{v} = \\mathbf{e}_2$, $\\mathbf{A}^+ = \\mathbf{v}\\mathbf{u}^\\top$. Find its $(2, 1)$ entry.", 1),
  s(MP, "x4l-discontinuous", 9.5, "Why is the pseudoinverse discontinuous, and how does regularisation help?",
    "$\\mathbf{A}^+$ inverts each nonzero singular value, so a tiny singular value $\\sigma$ contributes $1/\\sigma$; perturbing a zero singular value to $\\varepsilon$ makes $\\mathbf{A}^+$ jump by $1/\\varepsilon$.",
    "Truncated SVD (drop the small $\\sigma$) or Tikhonov/ridge $(\\mathbf{A}^\\top \\mathbf{A} + \\lambda \\mathbf{I})^{-1}\\mathbf{A}^\\top$ (which tends to $\\mathbf{A}^+$ as $\\lambda \\to 0$) replace $1/\\sigma$ by bounded filters."),

  // --- pca-matrix-edition -------------------------------------------------------------------
  n(PC, "x4l-pve", 4, "The covariance matrix has eigenvalues $4$ and $1$. What proportion of variance does PC1 explain?", 0.8, 0.001),
  n(PC, "x4l-cum", 5, "Eigenvalues $6$, $3$ and $1$: what cumulative proportion do the first two PCs explain?", 0.9, 0.001),
  n(PC, "x4l-var", 5.5, "A centred $100 \\times 3$ data matrix has $\\mathbf{X}^\\top \\mathbf{X} = \\operatorname{diag}(198, 99, 0)$. Using $\\mathbf{X}^\\top \\mathbf{X}/(n - 1)$, what is the largest variance?", 2),
  n(PC, "x4l-svd-var", 9, "PCA via SVD: the centred data matrix ($n = 101$) has singular values $20$ and $10$. Compute the variance of PC1.", 4),
  s(PC, "x4l-center", 9, "Why must data be centred, and often scaled, before PCA?",
    "Without centring, the first component points towards the mean rather than the direction of greatest variance.",
    "Without scaling, variables with large units dominate the variance; standardising (PCA on the correlation matrix) is appropriate when units aren't comparable."),
  n(PC, "x4l-score", 9, "With $\\mathbf{X} = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$, the PC scores are $\\mathbf{U}\\boldsymbol{\\Sigma}$. If $\\sigma_1 = 20$ and an observation's entry in $\\mathbf{u}_1$ is $0.1$, what is its PC1 score?", 2),
  s(PC, "x4l-two-views", 9, "Explain why maximum-variance PCA and minimum-reconstruction-error PCA are the same problem.",
    "For a unit direction $\\mathbf{w}$ and centred data, $\\|\\mathbf{x}\\|^2 = (\\mathbf{w}^\\top \\mathbf{x})^2 + \\|\\mathbf{x} - \\mathbf{w}\\mathbf{w}^\\top \\mathbf{x}\\|^2$ (Pythagoras).",
    "Summing over the data, the total is fixed, so maximising projected variance is the same as minimising squared reconstruction error; for $k$ components, Eckart–Young gives the same answer."),
  n(PC, "x4l-recon", 9.5, "Singular values of the centred data are $20$, $10$ and $5$. What is the reconstruction error (sum of squares) when keeping only the first PC?", 125),
  s(PC, "x4l-limits", 9.5, "When can PCA mislead, and what are alternatives?",
    "PCA is sensitive to outliers (a single extreme point can dominate a component) and captures only linear structure; directions of high variance needn't be the relevant ones.",
    "Alternatives: robust PCA (low-rank plus sparse), kernel PCA or manifold methods for nonlinear structure, and supervised methods (PLS) when a response matters."),
  s(PC, "x4l-rotation", 9.5, "Why aren't PCA loadings unique, and how does rotation (e.g. varimax) change interpretation?",
    "Each loading vector is defined only up to sign, and with equal eigenvalues only the subspace is defined.",
    "Rotating the retained components (varimax) keeps the same subspace and total explained variance but redistributes it to make loadings sparse and interpretable — the components are then no longer ordered by variance or uncorrelated in the same sense."),

  // --- eckart-young --------------------------------------------------------------------
  n(EY, "x4l-spec", 4, "Singular values are $5$, $3$ and $1$. What is the spectral-norm error of the best rank-$1$ approximation?", 3),
  n(EY, "x4l-frob1", 5, "What is its Frobenius-norm error?", 3.1623, 0.001),
  n(EY, "x4l-frob2", 5.5, "What is the Frobenius-norm error of the best rank-$2$ approximation?", 1),
  n(EY, "x4l-captured", 8.5, "What fraction of the squared Frobenius norm does the rank-$1$ approximation capture?", 0.7143, 0.001),
  s(EY, "x4l-state", 8.5, "State the Eckart–Young–Mirsky theorem.",
    "Truncating the SVD, $\\mathbf{A}_k = \\sum_{i \\le k}\\sigma_i\\mathbf{u}_i\\mathbf{v}_i^\\top$, gives the best rank-$k$ approximation in the spectral and Frobenius norms.",
    "The errors are $\\|\\mathbf{A} - \\mathbf{A}_k\\|_2 = \\sigma_{k+1}$ and $\\|\\mathbf{A} - \\mathbf{A}_k\\|_F = \\sqrt{\\sum_{i>k}\\sigma_i^2}$."),
  n(EY, "x4l-storage", 9, "Storing a rank-$k$ approximation of an $m \\times n$ matrix takes $k(m + n + 1)$ numbers. Compute it for $m = n = 1000$ and $k = 20$.", 40020),
  s(EY, "x4l-unitarily", 9, "Why does the truncated SVD give the optimal approximation in every unitarily invariant norm?",
    "Unitarily invariant norms depend only on the singular values, and Weyl's inequalities give $\\sigma_{i+k}(\\mathbf{A}) \\le \\sigma_i(\\mathbf{A} - \\mathbf{B})$ for any rank-$k$ matrix $\\mathbf{B}$.",
    "So every singular value of the error is at least the corresponding tail value $\\sigma_{k+i}(\\mathbf{A})$, which the truncated SVD attains exactly (Mirsky's theorem)."),
  n(EY, "x4l-ratio", 9, "What fraction of the full $10^6$ entries does that rank-$20$ approximation store?", 0.04002, 0.0002),
  s(EY, "x4l-l1", 9, "Why isn't the best low-rank approximation in the entrywise $L^1$ norm given by the SVD?",
    "The $L^1$ norm isn't unitarily invariant, so rotations change it and the singular value argument breaks down.",
    "Low-rank $L^1$ approximation is NP-hard in general; it's attractive because it's robust to outliers, and is approached with convex relaxations (robust PCA) or alternating minimisation."),
  s(EY, "x4l-completion", 9.5, "Explain matrix completion and why a low-rank matrix can be recovered from a subset of its entries.",
    "If the matrix has low rank $r$ and is incoherent (its information isn't concentrated in a few rows or columns), about $O(nr\\log^2 n)$ randomly observed entries determine it.",
    "Recovery minimises the nuclear norm (a convex surrogate for rank) subject to matching the observed entries, or uses alternating least squares — the basis of recommender systems like the Netflix Prize models."),
];
