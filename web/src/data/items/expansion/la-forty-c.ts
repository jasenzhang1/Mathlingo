import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Linear algebra 40-pass (part C): the four subspaces, orthonormality, Gram–Schmidt, rank, QR. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const CS = "column-space";
const NS = "null-space";
const RS = "row-space";
const LN = "left-null-space";
const MF = "matmul-four-fundamental-subspaces";
const DJ = "disjointness-four-fundamental-subspaces";
const OB = "orthonormal-basis";
const GS = "gram-schmidt";
const RK = "rank";
const QR = "qr-decomposition";
const RN = "rank-nullity-theorem";

export const laFortyCItems: Item[] = [
  // --- column-space -------------------------------------------------------------------
  n(CS, "x4l-dim", 4, "A $4 \\times 3$ matrix has rank $3$. What is the dimension of its column space?", 3),
  n(CS, "x4l-mult", 7, "$b = (2, 4, 6)$ is in the column space of $\\begin{pmatrix}1\\\\2\\\\3\\end{pmatrix}$. What multiple of the column is it?", 2),
  n(CS, "x4l-rank1", 8, "What is the dimension of the column space of $\\begin{pmatrix}1 & 2\\\\2 & 4\\\\3 & 6\\end{pmatrix}$?", 1),
  n(CS, "x4l-c", 8, "$A = \\begin{pmatrix}1 & 0\\\\0 & 1\\\\1 & 1\\end{pmatrix}$. Find $c$ such that $(2, 3, c)$ is in the column space of $A$.", 5),
  s(CS, "x4l-ab", 8.5, "Why is the column space of $AB$ contained in the column space of $A$?",
    "Each column of $AB$ is $A$ times a column of $B$, i.e. a combination of $A$'s columns.",
    "So $\\mathrm{col}(AB) \\subseteq \\mathrm{col}(A)$ and $\\mathrm{rank}(AB) \\le \\mathrm{rank}(A)$, with equality when $B$ has full row rank."),
  n(CS, "x4l-outer", 8.5, "What is the dimension of the column space of a nonzero outer product $uv^\\top$?", 1),
  n(CS, "x4l-proj", 9, "$P$ is the orthogonal projection onto a $3$-dimensional subspace of $\\mathcal{R}^6$. What is the dimension of $\\mathrm{col}(P)$?", 3),
  s(CS, "x4l-ls", 9, "Explain the column space as the set of achievable outputs, and why least squares projects $y$ onto it.",
    "$\\lbrace X\\beta\\rbrace$ is exactly $\\mathrm{col}(X)$: every fitted-value vector a linear model can produce.",
    "When $y \\notin \\mathrm{col}(X)$, the best achievable fit is the closest point of $\\mathrm{col}(X)$ to $y$ — its orthogonal projection $X(X^\\top X)^{-1}X^\\top y$."),
  n(CS, "x4l-augment", 9, "If $b$ is not in $\\mathrm{col}(A)$, by how much does $\\mathrm{rank}[A \\mid b]$ exceed $\\mathrm{rank}(A)$?", 1),
  s(CS, "x4l-aat", 9.5, "Show that $\\mathrm{col}(A) = \\mathrm{col}(AA^\\top)$.",
    "$\\mathrm{col}(AA^\\top) \\subseteq \\mathrm{col}(A)$ since each column of $AA^\\top$ is $A$ times something.",
    "Their dimensions agree: $\\mathrm{null}(AA^\\top) = \\mathrm{null}(A^\\top)$ (if $AA^\\top y = 0$ then $\\|A^\\top y\\|^2 = 0$), so $\\mathrm{rank}(AA^\\top) = \\mathrm{rank}(A^\\top) = \\mathrm{rank}(A)$; a subspace of equal dimension is the whole space."),

  // --- null-space ---------------------------------------------------------------------
  n(NS, "x4l-dim", 4, "A $3 \\times 5$ matrix has rank $3$. What is the dimension of its null space?", 2),
  n(NS, "x4l-ones", 7, "What is the dimension of the null space of $\\begin{pmatrix}1 & 1 & 1\\end{pmatrix}$?", 2),
  n(NS, "x4l-solve", 8, "Solve $\\begin{pmatrix}1 & 2 & 3\\end{pmatrix}x = 0$ with $x_2 = 1$ and $x_3 = 0$. Find $x_1$.", -2),
  n(NS, "x4l-vec", 8, "$A = \\begin{pmatrix}1 & 2\\\\3 & 6\\end{pmatrix}$ has null vector $(a, 1)$. Find $a$.", -2),
  s(NS, "x4l-general", 8.5, "Why is the general solution of $Ax = b$ a particular solution plus the null space?",
    "If $Ax_p = b$ and $Ax = b$, then $A(x - x_p) = 0$, so $x - x_p \\in \\mathrm{null}(A)$; conversely $x_p + n$ solves the system for every $n \\in \\mathrm{null}(A)$.",
    "So the solution set is an affine copy of the null space: unique when the null space is $\\lbrace 0\\rbrace$, infinite otherwise."),
  n(NS, "x4l-free", 8.5, "How many free variables does the RREF $\\begin{pmatrix}1 & 0 & 2 & 0\\\\0 & 1 & 3 & 0\\\\0 & 0 & 0 & 1\\end{pmatrix}$ have?", 1),
  n(NS, "x4l-vec3", 9, "$A = \\begin{pmatrix}1 & 1 & 0\\\\0 & 1 & 1\\end{pmatrix}$. Find the null vector with $x_3 = 1$ and give $x_1$.", 1),
  s(NS, "x4l-ata", 9, "Prove that $\\mathrm{null}(A) = \\mathrm{null}(A^\\top A)$.",
    "If $Ax = 0$ then $A^\\top Ax = 0$. Conversely, if $A^\\top Ax = 0$ then $x^\\top A^\\top Ax = \\|Ax\\|^2 = 0$, so $Ax = 0$.",
    "Consequences: $\\mathrm{rank}(A^\\top A) = \\mathrm{rank}(A)$, and $A^\\top A$ is invertible exactly when $A$ has full column rank."),
  n(NS, "x4l-allones", 9, "What is the dimension of the null space of the $6 \\times 6$ all-ones matrix?", 5),
  s(NS, "x4l-laplacian", 9.5, "Interpret the null space of a regression design matrix and of a graph Laplacian.",
    "For a design matrix, null vectors are coefficient changes that leave fitted values unchanged — the unidentifiable directions (collinearity).",
    "For a graph Laplacian $L = D - A$, $x^\\top Lx = \\sum_{\\text{edges}}(x_i - x_j)^2$, so null vectors are constant on each connected component: the nullity equals the number of components."),

  // --- row-space ---------------------------------------------------------------------
  n(RS, "x4l-dim", 4, "A $3 \\times 5$ matrix has rank $2$. What is the dimension of its row space?", 2),
  n(RS, "x4l-basis", 7, "The row space of $\\begin{pmatrix}1 & 2\\\\2 & 4\\end{pmatrix}$ is spanned by $(1, k)$. Find $k$.", 2),
  n(RS, "x4l-rref", 8, "What is the dimension of the row space of the RREF $\\begin{pmatrix}1 & 0 & 3\\\\0 & 1 & 4\\\\0 & 0 & 0\\end{pmatrix}$?", 2),
  n(RS, "x4l-member", 8, "Compute the third coordinate of $2(1, 0, 3) + 3(0, 1, 4)$ (confirming $(2, 3, 18)$ lies in that row space).", 18),
  s(RS, "x4l-rowops", 8.5, "Why do elementary row operations preserve the row space but not the column space?",
    "Each new row is a combination of old rows and the operations are invertible, so the span of the rows is unchanged.",
    "Row operations mix entries within each column, changing the column vectors themselves (though they preserve the linear relations among the columns, which is why pivot columns of $A$ still form a basis of $\\mathrm{col}(A)$)."),
  n(RS, "x4l-dim2", 8.5, "A matrix with $7$ columns has rank $3$. What is the dimension of its row space?", 3),
  n(RS, "x4l-minnorm", 9, "Find $x_1$ in the minimum-norm solution of $x_1 + x_2 = 2$.", 1),
  s(RS, "x4l-minnorm-why", 9, "Why does the minimum-norm solution of $Ax = b$ lie in the row space?",
    "Any solution splits as $x = x_r + x_n$ with $x_r$ in the row space and $x_n$ in the null space; $x_n$ doesn't change $Ax$.",
    "Since $\\|x\\|^2 = \\|x_r\\|^2 + \\|x_n\\|^2$, the norm is smallest when $x_n = 0$ — and $x_r = A^+b$ is unique."),
  n(RS, "x4l-minnorm2", 9, "Find $x_2$ in the minimum-norm solution of $x_1 + 2x_2 + 2x_3 = 9$.", 2),
  s(RS, "x4l-rank", 9.5, "Prove that row rank equals column rank.",
    "Row reduction preserves the row space and the linear relations among columns, and in RREF both ranks equal the number of pivots.",
    "Alternatively: if $c_1, \\ldots, c_r$ is a basis of the column space, $A = CR$ with $C$ ($m \\times r$) and $R$ ($r \\times n$), so every row of $A$ is a combination of $R$'s $r$ rows: row rank $\\le$ column rank, and by symmetry equality."),

  // --- left-null-space ------------------------------------------------------------------
  n(LN, "x4l-dim", 4, "A $5 \\times 3$ matrix has rank $3$. What is the dimension of its left null space?", 2),
  n(LN, "x4l-vec", 7, "The left null space of $\\begin{pmatrix}1\\\\1\\end{pmatrix}$ is spanned by $(1, k)$. Find $k$.", -1),
  n(LN, "x4l-dim2", 8, "What is the dimension of the left null space of $\\begin{pmatrix}1 & 2\\\\2 & 4\\\\3 & 6\\end{pmatrix}$?", 2),
  n(LN, "x4l-find", 8, "For $A = \\begin{pmatrix}1 & 0\\\\0 & 1\\\\1 & 1\\end{pmatrix}$, find $c$ such that $y = (1, 1, c)$ satisfies $y^\\top A = 0$.", -1),
  s(LN, "x4l-meaning", 8.5, "Interpret the left null space.",
    "Its vectors $y$ with $y^\\top A = 0$ record linear dependencies among the rows of $A$.",
    "They also give the constraints on $b$: $Ax = b$ is solvable exactly when $y^\\top b = 0$ for every such $y$."),
  n(LN, "x4l-graph", 8.5, "A connected graph has $4$ nodes and $5$ edges. What is the dimension of the left null space of its edge–node incidence matrix (rank $3$)?", 2),
  n(LN, "x4l-k4", 9, "For $K_4$ ($4$ nodes, $6$ edges), what is the dimension of the left null space of the incidence matrix?", 3),
  s(LN, "x4l-kvl", 9, "Explain the left null space of a graph's incidence matrix in terms of cycles.",
    "Each vector $y$ with $y^\\top A = 0$ is a flow around the graph that's conserved at every node — a combination of cycles.",
    "Its dimension is $m - n + 1$ (edges − nodes + $1$ for a connected graph), the number of independent loops; Kirchhoff's voltage law says potential differences sum to zero around these loops."),
  n(LN, "x4l-resid", 9, "$X$ is $10 \\times 3$ with full column rank. What is the dimension of the subspace containing the least squares residual?", 7),
  s(LN, "x4l-resid-why", 9.5, "Why does the least squares residual lie in the left null space of $X$?",
    "The normal equations $X^\\top(y - X\\hat\\beta) = 0$ say exactly that $e^\\top X = 0$.",
    "Geometrically, $y = \\hat{y} + e$ splits $y$ into its components in $\\mathrm{col}(X)$ and its orthogonal complement $\\mathrm{null}(X^\\top)$, which has dimension $n - p$ — the residual degrees of freedom."),

  // --- matmul-four-fundamental-subspaces -----------------------------------------------------
  n(MF, "x4l-bound", 4, "$\\mathrm{rank}(A) = 3$ and $\\mathrm{rank}(B) = 2$. What is the largest possible $\\mathrm{rank}(AB)$?", 2),
  n(MF, "x4l-injective", 7, "$A$ is $5 \\times 4$ with rank $4$, and $B$ is $4 \\times 6$ with rank $4$. Compute $\\mathrm{rank}(AB)$.", 4),
  n(MF, "x4l-sylvester", 8, "$A$ is $5 \\times 4$ with rank $3$, and $B$ is $4 \\times 6$ with rank $3$. Give Sylvester's lower bound $\\mathrm{rank}(A) + \\mathrm{rank}(B) - 4$ on $\\mathrm{rank}(AB)$.", 2),
  n(MF, "x4l-nullB", 8, "$B$ is $4 \\times 6$ with rank $3$. What is $\\dim\\mathrm{null}(B)$?", 3),
  s(MF, "x4l-inclusions", 8.5, "Show that $\\mathrm{null}(B) \\subseteq \\mathrm{null}(AB)$ and $\\mathrm{col}(AB) \\subseteq \\mathrm{col}(A)$.",
    "If $Bx = 0$ then $ABx = A0 = 0$.",
    "Every output $ABx = A(Bx)$ is an output of $A$. Similarly $\\mathrm{row}(AB) \\subseteq \\mathrm{row}(B)$ and $\\mathrm{null}(A^\\top) \\subseteq \\mathrm{null}((AB)^\\top)$."),
  n(MF, "x4l-ata", 8.5, "$A$ is $10 \\times 4$ with rank $3$. Compute $\\mathrm{rank}(A^\\top A)$.", 3),
  n(MF, "x4l-null-ab", 9, "$A$ is $5 \\times 4$ with rank $4$ (injective), and $B$ is $4 \\times 6$ with rank $3$. Compute $\\dim\\mathrm{null}(AB)$.", 3),
  s(MF, "x4l-invertible", 9, "How does multiplying by an invertible matrix affect the four fundamental subspaces?",
    "With $P$ invertible, $\\mathrm{col}(AP) = \\mathrm{col}(A)$ and $\\mathrm{null}(PA) = \\mathrm{null}(A)$, so ranks are unchanged.",
    "Row operations ($PA$) preserve the row and null spaces; column operations ($AP$) preserve the column and left null spaces."),
  n(MF, "x4l-outer", 9, "What is the rank of the product of a nonzero $3 \\times 1$ column and a nonzero $1 \\times 3$ row?", 1),
  s(MF, "x4l-sylvester-proof", 9.5, "Prove Sylvester's rank inequality $\\mathrm{rank}(AB) \\ge \\mathrm{rank}(A) + \\mathrm{rank}(B) - n$ for $A$ ($m \\times n$) and $B$ ($n \\times p$).",
    "Restrict $A$ to $\\mathrm{col}(B)$: $\\mathrm{rank}(AB) = \\dim A(\\mathrm{col}(B)) = \\mathrm{rank}(B) - \\dim(\\mathrm{null}(A) \\cap \\mathrm{col}(B))$ by rank–nullity.",
    "The intersection has dimension at most $\\dim\\mathrm{null}(A) = n - \\mathrm{rank}(A)$, which gives the inequality."),

  // --- disjointness-four-fundamental-subspaces -------------------------------------------------
  n(DJ, "x4l-int", 4, "What is the dimension of $\\mathrm{row}(A) \\cap \\mathrm{null}(A)$ for any matrix $A$?", 0),
  n(DJ, "x4l-sum", 7, "$A$ is $3 \\times 3$ with rank $2$. What is $\\dim(\\mathrm{row}(A) + \\mathrm{null}(A))$?", 3),
  n(DJ, "x4l-row-part", 8, "For $A = \\begin{pmatrix}1 & 1\\end{pmatrix}$, split $x = (3, 1)$ into row-space and null-space parts. Give the first component of the row-space part.", 2),
  n(DJ, "x4l-null-part", 8, "Give the first component of the null-space part.", 1),
  s(DJ, "x4l-why", 8.5, "Why is $\\mathrm{row}(A) \\cap \\mathrm{null}(A) = \\lbrace 0\\rbrace$?",
    "The null space is the orthogonal complement of the row space: $Ax = 0$ says $x$ is orthogonal to every row.",
    "A vector in both is orthogonal to itself, so $\\|x\\|^2 = 0$ and $x = 0$."),
  n(DJ, "x4l-col-left", 8.5, "What is the dimension of $\\mathrm{col}(A) \\cap \\mathrm{null}(A^\\top)$ for any matrix $A$?", 0),
  n(DJ, "x4l-null-part2", 9, "For $A = \\begin{pmatrix}1 & 1\\end{pmatrix}$, give the second component of the null-space part of $(5, 1)$.", -2),
  s(DJ, "x4l-action", 9, "Explain how every $x$ splits uniquely into row-space and null-space parts, and what $A$ does to each.",
    "$\\mathcal{R}^n = \\mathrm{row}(A) \\oplus \\mathrm{null}(A)$ orthogonally, so $x = x_r + x_n$ uniquely (project onto each).",
    "$A$ kills $x_n$ and maps the row space one-to-one onto the column space, so $Ax = Ax_r$; this is the picture behind the pseudoinverse."),
  n(DJ, "x4l-nilpotent", 9, "For $A = \\begin{pmatrix}0 & 1\\\\0 & 0\\end{pmatrix}$, compute $\\dim(\\mathrm{col}(A) \\cap \\mathrm{null}(A))$.", 1),
  s(DJ, "x4l-col-null", 9.5, "Why can $\\mathrm{col}(A)$ and $\\mathrm{null}(A)$ intersect nontrivially for a square $A$, unlike the row and null spaces? How does this relate to nilpotency?",
    "For square $A$ both live in $\\mathcal{R}^n$ but aren't orthogonal complements of each other, so nothing forces them apart.",
    "They intersect nontrivially exactly when $\\mathrm{rank}(A^2) < \\mathrm{rank}(A)$ (some output is sent to $0$ on the next step); for a nilpotent $A$ the column space eventually falls into the null space."),

  // --- orthonormal-basis --------------------------------------------------------------
  n(OB, "x4l-trace", 4, "For $Q$ with columns $(1, 0)$ and $(0, 1)$, compute $\\mathrm{tr}(Q^\\top Q)$.", 2),
  n(OB, "x4l-norm", 7, "Normalise $(1, 1)$. What is each entry?", 0.7071, 0.001),
  n(OB, "x4l-coord1", 8, "With the orthonormal basis $q_1 = (1, 1)/\\sqrt{2}$, $q_2 = (1, -1)/\\sqrt{2}$, find the first coordinate of $(3, 1)$.", 2.8284, 0.001),
  n(OB, "x4l-coord2", 8, "Find the second coordinate.", 1.4142, 0.001),
  s(OB, "x4l-parseval", 8.5, "Why does $\\|x\\|^2$ equal the sum of squared coordinates in any orthonormal basis (Parseval)?",
    "Write $x = \\sum c_iq_i$ with $c_i = q_i \\cdot x$; then $\\|x\\|^2 = \\sum_i\\sum_jc_ic_j(q_i \\cdot q_j) = \\sum c_i^2$, since $q_i \\cdot q_j = \\delta_{ij}$.",
    "Orthonormal changes of basis preserve lengths and inner products; Parseval's identity for Fourier series is the infinite-dimensional version."),
  n(OB, "x4l-parseval-calc", 8.5, "Check Parseval: compute $2.8284^2 + 1.4142^2$.", 10, 0.01),
  n(OB, "x4l-proj", 9, "Project $(1, 2, 4)$ onto the span of the orthonormal vectors $q_1 = (1, 0, 0)$ and $q_2 = (0, 1, 1)/\\sqrt{2}$. Find the third component.", 3),
  s(OB, "x4l-qqt", 9, "For $Q$ with orthonormal columns ($n \\times k$, $k < n$), why is $Q^\\top Q = I$ but $QQ^\\top \\ne I$?",
    "$Q^\\top Q$ collects the inner products $q_i \\cdot q_j = \\delta_{ij}$, giving the $k \\times k$ identity.",
    "$QQ^\\top$ is the $n \\times n$ orthogonal projection onto $\\mathrm{col}(Q)$, which has rank $k < n$; it equals $I$ only when $Q$ is square (orthogonal)."),
  n(OB, "x4l-count", 9, "How many orthonormal bases of $\\mathcal{R}^2$ have $(1, 0)$ as their first vector?", 2),
  s(OB, "x4l-numerics", 9.5, "Why are orthonormal bases preferred numerically?",
    "A matrix with orthonormal columns has condition number $1$: multiplying by it doesn't amplify rounding errors or distort lengths.",
    "Coordinates come from dot products instead of solving possibly ill-conditioned systems, which is why stable algorithms (QR, SVD, Householder) work with orthogonal transformations."),

  // --- gram-schmidt -------------------------------------------------------------------
  n(GS, "x4l-first", 4, "Gram–Schmidt on $(3, 4)$: find the first component of the first orthonormal vector.", 0.6, 0.001),
  n(GS, "x4l-u2", 7, "Gram–Schmidt on $v_1 = (1, 1)$, $v_2 = (1, 0)$: find the first component of $u_2 = v_2 - \\mathrm{proj}_{v_1}v_2$.", 0.5, 0.001),
  n(GS, "x4l-q2", 8, "Find the second component of the normalised $q_2$.", -0.7071, 0.001),
  n(GS, "x4l-norm", 8, "Gram–Schmidt on $(1, 1, 0)$, $(1, 0, 1)$: compute $\\|u_2\\|$.", 1.2247, 0.001),
  s(GS, "x4l-mgs", 8.5, "Why does classical Gram–Schmidt lose orthogonality in floating point, and what fixes it?",
    "Classical GS subtracts all projections computed from the original vector; rounding errors accumulate, and nearly dependent inputs produce vectors far from orthogonal.",
    "Modified Gram–Schmidt (subtracting projections one at a time from the updated vector), re-orthogonalisation, or Householder QR restore stability."),
  n(GS, "x4l-legendre", 8.5, "Gram–Schmidt on $1, x, x^2$ with $\\langle f, g\\rangle = \\int_{-1}^1f(x)g(x)\\,dx$ gives, as third (monic) polynomial, $x^2 - c$. Find $c$.", 0.3333, 0.001),
  n(GS, "x4l-norm1", 9, "Compute $\\langle 1, 1\\rangle = \\int_{-1}^11\\,dx$.", 2),
  s(GS, "x4l-qr", 9, "Explain how Gram–Schmidt produces the QR factorisation.",
    "Gram–Schmidt writes each $a_j$ as a combination of $q_1, \\ldots, q_j$: $a_j = \\sum_{i \\le j}r_{ij}q_i$ with $r_{ij} = q_i \\cdot a_j$ and $r_{jj} = \\|u_j\\|$.",
    "Collecting these gives $A = QR$ with $Q$'s columns orthonormal and $R$ upper triangular."),
  n(GS, "x4l-dependent", 9, "Gram–Schmidt on $(1, 2)$, $(2, 4)$: compute $\\|u_2\\|$.", 0),
  s(GS, "x4l-poly", 9.5, "How do Legendre polynomials arise from Gram–Schmidt, and why do orthogonal polynomials matter?",
    "Applying Gram–Schmidt to $1, x, x^2, \\ldots$ with the inner product $\\int_{-1}^1fg$ gives the Legendre polynomials (up to scaling); other weights give Hermite, Laguerre and Chebyshev families.",
    "They make polynomial least squares well conditioned (unlike raw monomials, which are nearly collinear) and underlie Gaussian quadrature and spectral methods."),

  // --- rank ---------------------------------------------------------------------------
  n(RK, "x4l-basic", 4, "Compute the rank of $\\begin{pmatrix}1 & 2\\\\3 & 6\\end{pmatrix}$.", 1),
  n(RK, "x4l-diag", 7, "Compute the rank of $\\mathrm{diag}(1, 1, 0)$.", 2),
  n(RK, "x4l-two-outer", 8, "$u, w$ are linearly independent, and so are $v, z$. Compute $\\mathrm{rank}(uv^\\top + wz^\\top)$.", 2),
  n(RK, "x4l-ones", 8, "Compute the rank of the $5 \\times 5$ all-ones matrix.", 1),
  s(RK, "x4l-ata", 8.5, "Why is $\\mathrm{rank}(A) = \\mathrm{rank}(A^\\top A)$?",
    "$\\mathrm{null}(A^\\top A) = \\mathrm{null}(A)$, because $A^\\top Ax = 0$ implies $\\|Ax\\|^2 = x^\\top A^\\top Ax = 0$.",
    "Both have $n$ columns, so rank–nullity gives equal ranks; that's why $X^\\top X$ is invertible exactly when $X$ has full column rank."),
  n(RK, "x4l-123", 8.5, "Compute the rank of $\\begin{pmatrix}1 & 2 & 3\\\\4 & 5 & 6\\\\7 & 8 & 9\\end{pmatrix}$.", 2),
  n(RK, "x4l-sum", 9, "$\\mathrm{rank}(A) = 2$ and $\\mathrm{rank}(B) = 3$ for large matrices of the same size. What is the largest possible $\\mathrm{rank}(A + B)$?", 5),
  s(RK, "x4l-numerical", 9, "What is numerical rank, and why is exact rank ill-posed in floating point?",
    "An arbitrarily small perturbation can make any rank-deficient matrix full rank, so exact rank is a discontinuous function of the entries.",
    "Numerical rank counts singular values above a tolerance (e.g. $\\max(m, n)\\varepsilon\\sigma_1$), which is stable and meaningful."),
  n(RK, "x4l-tol", 9, "Singular values are $5$, $2$ and $10^{-12}$. With tolerance $10^{-8}$, what is the numerical rank?", 2),
  s(RK, "x4l-lowrank", 9.5, "Why are many real data matrices approximately low rank?",
    "Rows and columns are often driven by a few latent factors (users' tastes, underlying signals), so the matrix is close to a sum of a few outer products.",
    "Udell and Townsend showed that matrices generated by smooth latent-variable models are approximately low rank with high probability — which is why low-rank approximation, PCA and matrix completion work."),

  // --- qr-decomposition ------------------------------------------------------------------
  m(QR, "x4l-r", 4, "In $A = QR$, the matrix $R$ is:", "Upper triangular",
    [["Orthogonal", "That's $Q$."], ["Diagonal", "Only in special cases."], ["Lower triangular", "It's upper triangular."]]),
  n(QR, "x4l-single", 7, "Compute $R$ in the QR factorisation of the column $\\begin{pmatrix}3\\\\4\\end{pmatrix}$.", 5),
  n(QR, "x4l-r11", 8, "For $A = \\begin{pmatrix}1 & 1\\\\1 & 0\\end{pmatrix}$, compute $r_{11} = \\|a_1\\|$.", 1.4142, 0.001),
  n(QR, "x4l-r12", 8, "For the same $A$, compute $r_{12} = q_1 \\cdot a_2$.", 0.7071, 0.001),
  s(QR, "x4l-ls", 8.5, "Explain how QR solves least squares.",
    "With $X = QR$ (thin QR), $\\|y - X\\beta\\|^2$ is minimised when $R\\beta = Q^\\top y$, solved by back substitution.",
    "This avoids forming $X^\\top X$, which would square the condition number; the residual norm is the norm of the part of $y$ outside $\\mathrm{col}(Q)$."),
  n(QR, "x4l-det", 8.5, "$A = QR$ with $r_{11} = \\sqrt{2}$ and $r_{22} = 1/\\sqrt{2}$. Compute $|\\det A|$.", 1),
  n(QR, "x4l-householder", 9, "The Householder reflector with $v = x + \\|x\\|e_1 = (8, 4)$ maps $x = (3, 4)$ to a multiple of $e_1$. What is the first component of the result?", -5),
  s(QR, "x4l-vs-normal", 9, "Why is QR preferred to the normal equations for least squares?",
    "The normal equations work with $X^\\top X$, whose condition number is $\\kappa(X)^2$, so ill-conditioned problems lose twice as many digits.",
    "QR works with orthogonal transformations (condition number $1$), so its accuracy depends on $\\kappa(X)$; the cost is modestly higher."),
  n(QR, "x4l-flops", 9, "Householder QR of an $m \\times n$ matrix costs about $2mn^2$ flops when $m \\gg n$. Estimate it for $m = 1000$ and $n = 10$.", 200000),
  s(QR, "x4l-pivot", 9.5, "Explain QR with column pivoting and why it is “rank-revealing.”",
    "At each step the remaining column of largest norm is moved to the front: $AP = QR$, with the diagonal of $R$ non-increasing in magnitude.",
    "A sharp drop in $|r_{kk}|$ reveals the numerical rank and picks a well-conditioned subset of columns — useful for rank-deficient least squares and column subset selection."),

  // --- rank-nullity-theorem ---------------------------------------------------------------
  n(RN, "x4l-basic", 4, "$T: \\mathcal{R}^7 \\to \\mathcal{R}^4$ has rank $4$. What is its nullity?", 3),
  n(RN, "x4l-rank", 7, "A $5 \\times 8$ matrix has nullity $4$. What is its rank?", 4),
  n(RN, "x4l-inj", 8, "What is the smallest possible nullity of a linear map $\\mathcal{R}^5 \\to \\mathcal{R}^3$?", 2),
  n(RN, "x4l-onto", 8, "A linear map $\\mathcal{R}^6 \\to \\mathcal{R}^4$ is onto. What is its nullity?", 2),
  s(RN, "x4l-proof", 8.5, "Prove the rank–nullity theorem.",
    "Take a basis $k_1, \\ldots, k_p$ of the kernel and extend it to a basis of the domain with $v_1, \\ldots, v_r$.",
    "Show $T(v_1), \\ldots, T(v_r)$ span the image (the $k$'s map to $0$) and are independent (a dependence would put a combination of $v$'s in the kernel). So $\\dim V = p + r$ = nullity + rank."),
  n(RN, "x4l-deriv", 8.5, "Differentiation maps polynomials of degree at most $4$ to themselves. What is its nullity?", 1),
  n(RN, "x4l-trace", 9, "What is the nullity of the trace map from $3 \\times 3$ matrices to the reals?", 8),
  s(RN, "x4l-square", 9, "Why can't a linear map $\\mathcal{R}^n \\to \\mathcal{R}^n$ be injective without being surjective?",
    "Injective means nullity $0$, so rank–nullity gives rank $n$, i.e. the image is all of $\\mathcal{R}^n$.",
    "So for square matrices, injective, surjective and invertible are equivalent — each follows from the others."),
  n(RN, "x4l-skew", 9, "What is the nullity of the map $X \\mapsto X - X^\\top$ on $2 \\times 2$ matrices?", 3),
  s(RN, "x4l-infinite", 9.5, "Show how the conclusion of the previous question fails in infinite dimensions.",
    "On sequences, the right shift $(a_1, a_2, \\ldots) \\mapsto (0, a_1, a_2, \\ldots)$ is injective but not surjective.",
    "The left shift is surjective but not injective. Rank–nullity still holds formally, but with infinite dimensions the counting argument no longer forces equivalence."),
];
