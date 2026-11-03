import type { Item } from "../../../lib/assessment/types";
import { m, n, s } from "./shared";

/** Top-up to 50: span, basis, change of basis, four fundamental subspaces. */
const bm = (...rows: string[]) => "\\begin{bmatrix}" + rows.join("\\\\") + "\\end{bmatrix}";

const SP = "span";
const BA = "basis";
const CB = "change-of-basis";
const FF = "four-fundamental-subspaces";

const span: Item[] = [
  // level 1
  m(SP, "t50-def", 1, "The span of vectors $\\mathbf{v}_1, \\dots, \\mathbf{v}_k$ is:",
    "The set of all linear combinations $c_1\\mathbf{v}_1 + \\dots + c_k\\mathbf{v}_k$ with real $c_i$",
    [
      ["The set $\\lbrace \\mathbf{v}_1, \\dots, \\mathbf{v}_k \\rbrace$ itself", "The span contains every combination of the vectors, not just the listed vectors."],
      ["The combinations with nonnegative coefficients only", "That is the cone the vectors generate; the span allows any real coefficients, including negative ones."],
      ["The number of linearly independent vectors in the list", "That number is the dimension of the span, not the span itself."],
    ]),
  m(SP, "t50-contains-zero", 1, "Which vector is in the span of every list of vectors in $\\mathbb{R}^n$?",
    "The zero vector",
    [
      ["The all-ones vector $[1, 1, \\dots, 1]$", "The span of $[1, 0]$ is the $x$-axis, which does not contain $[1, 1]$."],
      ["Every standard basis vector $\\mathbf{e}_i$", "A single vector spans a line, which misses most of the $\\mathbf{e}_i$."],
      ["A unit vector orthogonal to all the $\\mathbf{v}_i$", "A nonzero vector orthogonal to all the $\\mathbf{v}_i$ is never in their span (unless the span is everything and no such vector exists)."],
    ]),
  m(SP, "t50-is-subspace", 1, "The span of any finite list of vectors in $\\mathbb{R}^n$ is always:",
    "A subspace of $\\mathbb{R}^n$",
    [
      ["All of $\\mathbb{R}^n$", "Only lists containing $n$ independent vectors span all of $\\mathbb{R}^n$."],
      ["A line through the origin", "The span can be a point, a line, a plane or higher-dimensional."],
      ["A bounded set", "It contains every scalar multiple of each vector, so it is unbounded unless it is $\\lbrace \\mathbf{0} \\rbrace$."],
    ]),
  m(SP, "t50-spanning-set", 1, "A set $S$ of vectors spans the vector space $V$ when:",
    "Every vector in $V$ is a linear combination of vectors in $S$",
    [
      ["The vectors in $S$ are linearly independent", "Independence is a separate property; spanning sets may be dependent and independent sets may fail to span."],
      ["$S$ contains exactly $\\dim V$ vectors", "The count alone does not guarantee spanning: $[1, 0]$ and $[2, 0]$ are two vectors that don’t span $\\mathbb{R}^2$."],
      ["Every vector of $S$ lies in $V$", "That is necessary but far from sufficient."],
    ]),
  // level 2
  m(SP, "t50-single-line", 2, "Geometrically, what is $\\operatorname{span}\\lbrace [2, -1] \\rbrace$ in $\\mathbb{R}^2$?",
    "The whole line through the origin in the direction $[2, -1]$",
    [
      ["The single point $(2, -1)$", "The span includes every multiple $c[2, -1]$, not just $c = 1$."],
      ["The segment from the origin to $(2, -1)$", "Coefficients are not restricted to $[0, 1]$; any real $c$ is allowed."],
      ["All of $\\mathbb{R}^2$", "One nonzero vector only spans a line."],
    ]),
  m(SP, "t50-span-of-zero", 2, "What is $\\operatorname{span}\\lbrace \\mathbf{0} \\rbrace$?",
    "$\\lbrace \\mathbf{0} \\rbrace$",
    [
      ["The empty set", "Every span contains the zero vector, so it is never empty."],
      ["A line through the origin", "Every multiple of $\\mathbf{0}$ is $\\mathbf{0}$, so nothing else is produced."],
      ["All of $\\mathbb{R}^n$", "Combinations of the zero vector are all zero."],
    ]),
  n(SP, "t50-multiple", 2, "Find $c$ such that $[6, -3] = c\\,[2, -1]$.", 3),
  n(SP, "t50-parallel-dim", 2, "Find the dimension $d$ of $\\operatorname{span}\\lbrace [1, 2, 3], [2, 4, 6] \\rbrace$.", 1),
  // level 3
  n(SP, "t50-on-line", 3, "Find $k$ so that $[1, k]$ lies in $\\operatorname{span}\\lbrace [3, 12] \\rbrace$.", 4),
  n(SP, "t50-two-coeffs", 3, "Write $[5, 7] = a[1, 1] + b[1, -1]$. Find $a$.", 6),
  n(SP, "t50-three-dependent", 3, "Find the dimension $d$ of the span of $[1, 0, 1]$, $[0, 1, 1]$ and $[1, 1, 2]$.", 2),
  m(SP, "t50-which-in-plane", 3, "Which vector lies in $\\operatorname{span}\\lbrace [1, 0, 2], [0, 1, -1] \\rbrace$?",
    "$[2, 3, 1]$",
    [
      ["$[1, 1, 3]$", "Every vector $a[1, 0, 2] + b[0, 1, -1]$ has third entry $2a - b$; here that is $1$, not $3$."],
      ["$[0, 0, 1]$", "The first two entries force $a = b = 0$, which makes the third entry $0$."],
      ["$[3, 1, 7]$", "With $a = 3$ and $b = 1$ the third entry must be $2a - b = 5$, not $7$."],
    ]),
  // level 4
  n(SP, "t50-solve-plane", 4, "Write $[4, 1, 7] = a[1, 0, 2] + b[0, 1, -1]$. Find $a + b$.", 5),
  n(SP, "t50-k-in-plane", 4, "For which $k$ does $[1, 2, k]$ lie in $\\operatorname{span}\\lbrace [1, 1, 0], [0, 1, 1] \\rbrace$?", 1),
  n(SP, "t50-k-fail-r3", 4, "For which $k$ do $[1, 2, 0]$, $[0, 1, 1]$ and $[2, k, 1]$ fail to span $\\mathbb{R}^3$?", 5),
  m(SP, "t50-two-in-r3", 4, "Can two vectors span $\\mathbb{R}^3$?",
    "No — the span of two vectors has dimension at most $2$",
    [
      ["Yes, if they are linearly independent", "Two independent vectors span a plane, not all of $\\mathbb{R}^3$."],
      ["Yes, if neither is the zero vector", "Nonzero vectors still give at most a plane."],
      ["Only if they are orthogonal", "Orthogonality does not add a dimension; two orthogonal vectors span a plane."],
    ]),
  // level 5
  n(SP, "t50-four-in-r4", 5, "Find the dimension $d$ of $\\operatorname{span}\\lbrace [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [1, 0, 0, 1] \\rbrace$.", 3),
  m(SP, "t50-add-vector", 5, "Appending a vector $\\mathbf{w}$ to a list leaves the span unchanged exactly when:",
    "$\\mathbf{w}$ already lies in the span of the list",
    [
      ["$\\mathbf{w}$ is a unit vector", "Length is irrelevant; what matters is whether $\\mathbf{w}$ is a combination of the list."],
      ["$\\mathbf{w}$ is orthogonal to every vector in the list", "A nonzero orthogonal vector lies outside the span and enlarges it."],
      ["$\\mathbf{w}$ is nonzero", "A nonzero vector outside the span adds a new dimension."],
    ]),
  n(SP, "t50-k-two-vectors", 5, "For which $k$ is $[1, k, 4]$ in $\\operatorname{span}\\lbrace [1, 2, 3], [2, 1, 3] \\rbrace$?", 3),
  s(SP, "t50-explain-plane", 5, "Explain why $\\operatorname{span}\\lbrace [1, 2, 3], [4, 5, 6], [7, 8, 9] \\rbrace$ is a plane rather than all of $\\mathbb{R}^3$.",
    "Finds the dependence among the three vectors, e.g. $[7, 8, 9] = 2[4, 5, 6] - [1, 2, 3]$ (or that their determinant is $0$), so the third vector adds nothing new.",
    "Notes the first two are not parallel, so together they span a $2$-dimensional plane through the origin."),
  // level 6
  s(SP, "t50-why-subspace", 6, "Show that the span of $\\mathbf{v}_1, \\dots, \\mathbf{v}_k$ is closed under addition and scalar multiplication.",
    "Adding two combinations $\\sum c_i\\mathbf{v}_i + \\sum d_i\\mathbf{v}_i = \\sum (c_i + d_i)\\mathbf{v}_i$ gives another combination.",
    "Scaling gives $a\\sum c_i\\mathbf{v}_i = \\sum (ac_i)\\mathbf{v}_i$, also a combination (and all $c_i = 0$ gives $\\mathbf{0}$)."),
  // level 7
  m(SP, "t50-equal-spans", 7, "Which pair of sets has the same span?",
    "$\\lbrace [1, 0], [1, 1] \\rbrace$ and $\\lbrace [2, 0], [0, 3] \\rbrace$",
    [
      ["$\\lbrace [1, 2] \\rbrace$ and $\\lbrace [2, 1] \\rbrace$", "These are two different lines through the origin."],
      ["$\\lbrace [1, 1, 0], [0, 1, 1] \\rbrace$ and $\\lbrace [1, 0, 0], [0, 0, 1] \\rbrace$", "Both are planes, but $[1, 1, 0]$ is not in the $xz$-plane, so the planes differ."],
      ["$\\lbrace [1, 2], [2, 4] \\rbrace$ and $\\lbrace [1, 0], [0, 1] \\rbrace$", "The first pair is parallel and spans only a line; the second spans $\\mathbb{R}^2$."],
    ]),
  // level 8
  n(SP, "t50-poly-span", 8, "In the space of polynomials of degree at most $2$, find the dimension $d$ of $\\operatorname{span}\\lbrace 1 + x, \\; x + x^{2}, \\; 1 - x^{2} \\rbrace$.", 2),
  s(SP, "t50-intersection-sum", 8, "Let $U = \\operatorname{span}\\lbrace [1, 0, 0], [0, 1, 0] \\rbrace$ and $W = \\operatorname{span}\\lbrace [0, 1, 0], [0, 0, 1] \\rbrace$. Describe $U \\cap W$ and $U + W$, with reasons.",
    "$U \\cap W$ is the $y$-axis $\\operatorname{span}\\lbrace [0, 1, 0] \\rbrace$: a vector in $U$ has third entry $0$ and a vector in $W$ has first entry $0$.",
    "$U + W = \\mathbb{R}^3$, since together the spanning vectors include all three standard basis vectors (consistent with $2 + 2 - 1 = 3$)."),
  n(SP, "t50-subsets-span", 8, "Let $\\mathbf{v}_1 = [1, 0, 1]$, $\\mathbf{v}_2 = [0, 1, 1]$, $\\mathbf{v}_3 = [1, 1, 2]$, $\\mathbf{v}_4 = [1, -1, 0]$. How many of the $4$ three-element subsets of $\\lbrace \\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3, \\mathbf{v}_4 \\rbrace$ span $\\mathbb{R}^3$? Find $k$.", 0),
  // level 9
  s(SP, "t50-symmetric-matrices", 9, "Do $" + bm("1 & 0", "0 & 0") + "$, $" + bm("0 & 1", "1 & 0") + "$ and $" + bm("0 & 0", "0 & 1") + "$ span the space of all $2 \\times 2$ matrices? If not, what exactly do they span?",
    "No: every combination is symmetric (and three matrices can’t span a $4$-dimensional space), so e.g. $" + bm("0 & 1", "0 & 0") + "$ is unreachable.",
    "They span exactly the symmetric $2 \\times 2$ matrices $" + bm("a & b", "b & c") + "$, a $3$-dimensional subspace."),
  s(SP, "t50-remove-redundant", 9, "Prove that if $\\mathbf{v}_k$ is a linear combination of $\\mathbf{v}_1, \\dots, \\mathbf{v}_{k-1}$, then removing $\\mathbf{v}_k$ does not change the span.",
    "Any combination that uses $\\mathbf{v}_k$ can have $\\mathbf{v}_k$ replaced by its expression in the others, giving a combination of $\\mathbf{v}_1, \\dots, \\mathbf{v}_{k-1}$ alone.",
    "The reverse inclusion is immediate (a combination of fewer vectors is a combination of all of them with coefficient $0$ on $\\mathbf{v}_k$), so the spans are equal."),
  n(SP, "t50-f2-count", 9, "Over the two-element field $\\mathbb{F}_2$ (arithmetic mod $2$), how many distinct vectors lie in $\\operatorname{span}\\lbrace [1, 1, 0], [0, 1, 1], [1, 0, 1] \\rbrace \\subseteq \\mathbb{F}_2^{3}$? Find $N$.", 4),
  // level 10
  s(SP, "t50-polys-infinite", 10, "Explain why no finite set of polynomials spans the space of all polynomials.",
    "A finite set has some largest degree $d$, and every linear combination of its members has degree at most $d$.",
    "So $x^{d+1}$ is never reached; the space of all polynomials is infinite-dimensional."),
  s(SP, "t50-random-vectors", 10, "Three vectors in $\\mathbb{R}^3$ have independent $\\mathcal{N}(0, 1)$ entries. Argue that they span $\\mathbb{R}^3$ with probability $1$, and say what changes if instead they are drawn in $\\mathbb{R}^4$.",
    "Failing to span means the determinant of the $3 \\times 3$ matrix they form is $0$; the determinant is a nonzero polynomial in the entries, whose zero set has probability $0$ under a continuous distribution.",
    "In $\\mathbb{R}^4$ three vectors can never span (dimension at most $3$); almost surely they span a $3$-dimensional subspace."),
];

const basis: Item[] = [
  // level 1
  m(BA, "t50-def", 1, "A basis of a vector space $V$ is a set of vectors that is:",
    "Linearly independent and spans $V$",
    [
      ["Linearly independent", "An independent set can fail to span, e.g. $\\lbrace [1, 0, 0] \\rbrace$ in $\\mathbb{R}^3$."],
      ["A spanning set of $V$", "A spanning set may contain redundant vectors; a basis has none."],
      ["Orthonormal", "Orthonormality is an extra convenience; any independent spanning set is a basis."],
    ]),
  m(BA, "t50-dim-def", 1, "The dimension of a finite-dimensional vector space $V$ is:",
    "The number of vectors in any basis of $V$",
    [
      ["The number of vectors in any spanning set of $V$", "Spanning sets can be larger than a basis."],
      ["The number of entries in the vectors of $V$", "A plane in $\\mathbb{R}^3$ has $3$-entry vectors but dimension $2$."],
      ["The number of nonzero vectors in $V$", "A nontrivial real vector space has infinitely many vectors."],
    ]),
  m(BA, "t50-standard", 1, "The standard basis of $\\mathbb{R}^3$ is:",
    "$[1, 0, 0]$, $[0, 1, 0]$, $[0, 0, 1]$",
    [
      ["$[1, 1, 1]$", "One vector only spans a line."],
      ["$[1, 0, 0]$, $[1, 1, 0]$, $[1, 1, 1]$", "This is a basis of $\\mathbb{R}^3$, but not the standard one."],
      ["$[0, 0, 0]$, $[1, 0, 0]$, $[0, 1, 0]$, $[0, 0, 1]$", "Including the zero vector makes the set dependent."],
    ]),
  m(BA, "t50-unique-coords", 1, "If $\\mathbf{b}_1, \\dots, \\mathbf{b}_n$ is a basis of $V$, then each $\\mathbf{v} \\in V$ can be written as $\\sum_i c_i\\mathbf{b}_i$:",
    "In exactly one way",
    [
      ["In infinitely many ways", "That happens for dependent spanning sets, not bases."],
      ["In at least one way, possibly several", "Independence rules out a second representation."],
      ["Only when $\\mathbf{v}$ is one of the basis vectors", "Spanning means every $\\mathbf{v}$ has a representation."],
    ]),
  // level 2
  n(BA, "t50-dim-2x3", 2, "How many vectors are in every basis of the space of $2 \\times 3$ real matrices? Find $n$.", 6),
  n(BA, "t50-dim-poly4", 2, "Find the dimension $d$ of the space of polynomials of degree at most $4$.", 5),
  m(BA, "t50-which-r2", 2, "Which set is a basis of $\\mathbb{R}^2$?",
    "$[1, 2]$, $[3, 4]$",
    [
      ["$[1, 2]$, $[2, 4]$", "The vectors are parallel, so they span only a line."],
      ["$[1, 0]$", "One vector cannot span $\\mathbb{R}^2$."],
      ["$[1, 0]$, $[0, 1]$, $[1, 1]$", "Three vectors in $\\mathbb{R}^2$ are always dependent."],
    ]),
  n(BA, "t50-std-coord", 2, "Find the second coordinate $c_2$ of $[3, -5, 2]$ with respect to the standard basis of $\\mathbb{R}^3$.", -5),
  // level 3
  n(BA, "t50-coord-2d", 3, "In the basis $\\mathbf{b}_1 = [1, 1]$, $\\mathbf{b}_2 = [1, -1]$, find the coordinate $c_1$ of $\\mathbf{v} = [8, 2]$.", 5),
  n(BA, "t50-plane-dim", 3, "Find the dimension $d$ of the plane $x + y + z = 0$ in $\\mathbb{R}^3$.", 2),
  m(BA, "t50-extend", 3, "Which vector extends $\\lbrace [1, 0, 0], [0, 1, 0] \\rbrace$ to a basis of $\\mathbb{R}^3$?",
    "$[2, 3, 1]$",
    [
      ["$[2, 3, 0]$", "It lies in the $xy$-plane already spanned, so the set stays dependent."],
      ["$[0, 0, 0]$", "The zero vector makes any set dependent."],
      ["$[-1, 4, 0]$", "Any vector with third entry $0$ is in the existing span."],
    ]),
  n(BA, "t50-coord-3d", 3, "In the basis $[1, 0, 0]$, $[1, 1, 0]$, $[1, 1, 1]$ of $\\mathbb{R}^3$, find the coordinate $c_1$ (on $[1, 0, 0]$) of $\\mathbf{v} = [4, 6, 3]$.", -2),
  // level 4
  n(BA, "t50-dim-sym3", 4, "Find the dimension $d$ of the space of symmetric $3 \\times 3$ matrices.", 6),
  n(BA, "t50-dim-trace0", 4, "Find the dimension $d$ of the space of $3 \\times 3$ matrices with trace $0$.", 8),
  n(BA, "t50-dim-solutions", 4, "Find the dimension $d$ of the solution space of $x_1 + 2x_2 - x_3 + x_4 = 0$ and $x_2 + x_3 - x_4 = 0$ in $\\mathbb{R}^4$.", 2),
  m(BA, "t50-pivot-columns", 4, "To choose a basis for the column space of $\\mathbf{A}$ from among its columns, take:",
    "The columns of the original $\\mathbf{A}$ in the pivot positions of its echelon form",
    [
      ["The pivot columns of the echelon form itself", "Row operations change the column space; the echelon form’s columns need not lie in $C(\\mathbf{A})$."],
      ["The nonzero rows of the echelon form", "Those give a basis of the row space."],
      ["Every column that has no zero entries", "Zero entries have nothing to do with independence."],
    ]),
  // level 5
  n(BA, "t50-poly-roots", 5, "Find the dimension $d$ of the space of polynomials $p$ of degree at most $3$ with $p(1) = 0$ and $p(-1) = 0$.", 2),
  n(BA, "t50-shifted-basis", 5, "In the basis $1, \\; (x - 1), \\; (x - 1)^{2}$ of polynomials of degree at most $2$, write $p(x) = x^{2}$. Find the coefficient $c$ on $(x - 1)$.", 2),
  s(BA, "t50-why-unique", 5, "Prove that coordinates with respect to a basis are unique.",
    "Two representations $\\sum c_i\\mathbf{b}_i = \\sum d_i\\mathbf{b}_i$ subtract to $\\sum (c_i - d_i)\\mathbf{b}_i = \\mathbf{0}$.",
    "Linear independence then forces every $c_i - d_i = 0$, so the coefficients agree."),
  m(BA, "t50-spanning-contains", 5, "In a space $V$ with $\\dim V = n$, every finite spanning set:",
    "Contains a basis of $V$, and so has at least $n$ vectors",
    [
      ["Is a basis of $V$", "A spanning set may include redundant vectors."],
      ["Has exactly $n$ vectors", "Spanning sets can be arbitrarily large."],
      ["Can be enlarged to a basis of $V$", "That is the property of independent sets; spanning sets are trimmed down, not enlarged."],
    ]),
  // level 6
  s(BA, "t50-n-independent", 6, "Why are any $n$ linearly independent vectors in an $n$-dimensional space automatically a basis?",
    "If they did not span, a vector outside their span could be added while keeping independence, giving $n + 1$ independent vectors.",
    "That contradicts the fact that no independent set in an $n$-dimensional space has more than $n$ vectors, so they must span."),
  // level 7
  m(BA, "t50-null-basis", 7, "A basis for $N(\\mathbf{A})$, where $\\mathbf{A} = " + bm("1 & 2 & 0", "0 & 0 & 1") + "$, is:",
    "$[-2, 1, 0]$",
    [
      ["$[2, -1, 0]$ and $[-2, 1, 0]$", "Both lie in the null space, but they are parallel, so the set is dependent."],
      ["$[1, 2, 0]$", "That is a row of $\\mathbf{A}$; $\\mathbf{A}[1, 2, 0] = [5, 0] \\ne \\mathbf{0}$."],
      ["$[-2, 1, 0]$ and $[0, 0, 1]$", "$\\mathbf{A}[0, 0, 1] = [0, 1]$, so $[0, 0, 1]$ is not in the null space."],
    ]),
  // level 8
  n(BA, "t50-min-intersection", 8, "$U$ and $W$ are subspaces of $\\mathbb{R}^7$ with $\\dim U = 4$ and $\\dim W = 5$. Find the smallest possible value $d$ of $\\dim(U \\cap W)$.", 2),
  s(BA, "t50-commutant", 8, "Find the dimension of the space of $2 \\times 2$ matrices that commute with $" + bm("1 & 0", "0 & 2") + "$, and give a basis.",
    "Comparing $\\mathbf{X}\\mathbf{D}$ and $\\mathbf{D}\\mathbf{X}$ forces the off-diagonal entries to vanish (e.g. $b = 2b$), so the commuting matrices are exactly the diagonal ones.",
    "The space has dimension $2$, with basis $" + bm("1 & 0", "0 & 0") + "$, $" + bm("0 & 0", "0 & 1") + "$."),
  n(BA, "t50-dim-skew4", 8, "Find the dimension $d$ of the space of skew-symmetric $4 \\times 4$ matrices.", 6),
  // level 9
  s(BA, "t50-same-size", 9, "Explain why any two bases of a finite-dimensional space have the same number of vectors.",
    "Key lemma (Steinitz exchange): in a space spanned by $m$ vectors, any independent set has at most $m$ vectors.",
    "Applying it both ways to two bases (each is independent and each spans) gives $|\\mathcal{B}_1| \\le |\\mathcal{B}_2|$ and $|\\mathcal{B}_2| \\le |\\mathcal{B}_1|$."),
  n(BA, "t50-even-polys", 9, "Find the dimension $d$ of the space of polynomials $p$ of degree at most $5$ with $p(x) = p(-x)$ for all $x$.", 3),
  s(BA, "t50-trig-functions", 9, "The functions $1, \\cos x, \\sin x, \\cos^{2} x, \\sin^{2} x$ span a space $V$ of functions. Find $\\dim V$ and a basis, explaining the dependence.",
    "Identifies the dependence $\\sin^{2} x = 1 - \\cos^{2} x$, so $\\sin^{2} x$ is redundant.",
    "The remaining $1, \\cos x, \\sin x, \\cos^{2} x$ are independent (e.g. $\\cos^{2} x = \\tfrac{1}{2}(1 + \\cos 2x)$ brings in a new frequency), so $\\dim V = 4$."),
  // level 10
  s(BA, "t50-reals-over-q", 10, "Explain why $\\mathbb{R}$, viewed as a vector space over $\\mathbb{Q}$, has no finite basis.",
    "A finite basis of size $n$ would give a bijection between $\\mathbb{R}$ and $\\mathbb{Q}^{n}$ via coordinates.",
    "But $\\mathbb{Q}^{n}$ is countable while $\\mathbb{R}$ is uncountable, so every basis must be infinite."),
  n(BA, "t50-f2-ordered-bases", 10, "How many ordered bases does $\\mathbb{F}_2^{3}$ have (vectors with entries in the two-element field)? Find $N$.", 168),
];

const changeOfBasis: Item[] = [
  // level 1
  m(CB, "t50-p-direction", 1, "The columns of $\\mathbf{P}$ are the basis vectors $\\mathbf{b}_1, \\dots, \\mathbf{b}_n$ of $\\mathcal{B}$ in standard coordinates. Then $\\mathbf{P}[\\mathbf{v}]_{\\mathcal{B}}$ is:",
    "$\\mathbf{v}$ in standard coordinates",
    [
      ["$\\mathbf{v}$ written in $\\mathcal{B}$-coordinates", "That is $\\mathbf{P}^{-1}\\mathbf{v}$; multiplying by $\\mathbf{P}$ goes from $\\mathcal{B}$-coordinates back to standard ones."],
      ["$\\mathbf{P}^{\\top}\\mathbf{v}$", "Transposes play no role here unless $\\mathcal{B}$ is orthonormal, and even then this is the opposite direction."],
      ["The projection of $\\mathbf{v}$ onto $\\mathbf{b}_1$", "It rebuilds the full vector $\\sum c_i\\mathbf{b}_i$, not one projection."],
    ]),
  m(CB, "t50-similar-def", 1, "Two square matrices $\\mathbf{A}$ and $\\mathbf{B}$ represent the same linear map in different bases exactly when:",
    "$\\mathbf{B} = \\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P}$ for some invertible $\\mathbf{P}$",
    [
      ["$\\mathbf{B} = \\mathbf{P}^{\\top}\\mathbf{A}\\mathbf{P}$ for some invertible $\\mathbf{P}$", "That is congruence, the rule for quadratic forms, not for linear maps."],
      ["$\\mathbf{B} = \\mathbf{P}\\mathbf{A}$ for some invertible $\\mathbf{P}$", "Multiplying on one side only changes the map itself."],
      ["$\\mathbf{B} = \\mathbf{A}^{\\top}$", "A transpose is a different map in general."],
    ]),
  m(CB, "t50-invariant", 1, "Which of these is always the same for $\\mathbf{A}$ and $\\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P}$?",
    "The eigenvalues",
    [
      ["The entries", "Changing basis generally changes every entry."],
      ["The eigenvectors", "Eigenvectors get new coordinates: if $\\mathbf{A}\\mathbf{x} = \\lambda\\mathbf{x}$ then $\\mathbf{P}^{-1}\\mathbf{x}$ is the eigenvector of $\\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P}$."],
      ["The column space", "Column spaces move with the basis; only dimensions such as the rank are preserved."],
    ]),
  m(CB, "t50-coords-def", 1, "The coordinate vector $[\\mathbf{v}]_{\\mathcal{B}}$ lists:",
    "The coefficients $c_i$ in $\\mathbf{v} = \\sum_i c_i\\mathbf{b}_i$",
    [
      ["The dot products $\\mathbf{v} \\cdot \\mathbf{b}_i$", "These equal the coordinates only when $\\mathcal{B}$ is orthonormal."],
      ["The entries of $\\mathbf{v}$", "Those are its standard coordinates."],
      ["The lengths of $\\mathbf{v}$’s projections onto each $\\mathbf{b}_i$", "Again only right for orthonormal bases, and lengths lose signs."],
    ]),
  // level 2
  n(CB, "t50-rebuild-v1", 2, "$\\mathcal{B} = \\lbrace [1, 2], [3, 1] \\rbrace$ and $[\\mathbf{v}]_{\\mathcal{B}} = [2, -1]$. Find the first standard coordinate $v_1$ of $\\mathbf{v}$.", -1),
  n(CB, "t50-rebuild-v2", 2, "$\\mathcal{B} = \\lbrace [2, 0], [1, 1] \\rbrace$ and $[\\mathbf{v}]_{\\mathcal{B}} = [1, 4]$. Find the first standard coordinate $v_1$ of $\\mathbf{v}$.", 6),
  n(CB, "t50-orthonormal-coord", 2, "$\\mathcal{B} = \\left\\lbrace \\left[\\tfrac{3}{5}, \\tfrac{4}{5}\\right], \\left[-\\tfrac{4}{5}, \\tfrac{3}{5}\\right] \\right\\rbrace$ is orthonormal. Find the first $\\mathcal{B}$-coordinate $c_1$ of $\\mathbf{v} = [5, 10]$.", 11),
  m(CB, "t50-eigenbasis-matrix", 2, "$\\mathbf{A}\\mathbf{p}_1 = 3\\mathbf{p}_1$ and $\\mathbf{A}\\mathbf{p}_2 = -\\mathbf{p}_2$. In the basis $\\lbrace \\mathbf{p}_1, \\mathbf{p}_2 \\rbrace$ the matrix of $\\mathbf{A}$ is:",
    "$" + bm("3 & 0", "0 & -1") + "$",
    [
      ["$" + bm("-1 & 0", "0 & 3") + "$", "The diagonal follows the order of the basis, $\\mathbf{p}_1$ first."],
      ["$" + bm("3 & 1", "0 & -1") + "$", "An eigenvector basis gives no off-diagonal entries."],
      ["$\\mathbf{A}$ itself", "The matrix of a map depends on the basis used."],
    ]),
  // level 3
  n(CB, "t50-solve-coords", 3, "$\\mathcal{B} = \\lbrace [1, 2], [3, 5] \\rbrace$. Find the first $\\mathcal{B}$-coordinate $c_1$ of $\\mathbf{v} = [1, 1]$.", -2),
  n(CB, "t50-trace-similar", 3, "$\\mathbf{A} = " + bm("4 & 1", "2 & 3") + "$ and $\\mathbf{P}$ is an invertible $2 \\times 2$ matrix. Find $\\operatorname{tr}(\\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P})$.", 7),
  n(CB, "t50-det-similar", 3, "$\\mathbf{A} = " + bm("4 & 1", "2 & 3") + "$ and $\\mathbf{P}$ is an invertible $2 \\times 2$ matrix. Find $\\det(\\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P})$.", 10),
  m(CB, "t50-to-b-coords", 3, "With $\\mathbf{P} = [\\mathbf{b}_1 \\; \\cdots \\; \\mathbf{b}_n]$, converting standard coordinates $\\mathbf{v}$ into $\\mathcal{B}$-coordinates means computing:",
    "$\\mathbf{P}^{-1}\\mathbf{v}$",
    [
      ["$\\mathbf{P}\\mathbf{v}$", "That goes the other way, from $\\mathcal{B}$-coordinates to standard ones."],
      ["$\\mathbf{P}^{\\top}\\mathbf{v}$, for any basis", "$\\mathbf{P}^{\\top} = \\mathbf{P}^{-1}$ only when the basis is orthonormal."],
      ["$\\mathbf{P}^{-1}\\mathbf{v}\\mathbf{P}$", "Vectors transform with one factor; the sandwich is for matrices of maps."],
    ]),
  // level 4
  n(CB, "t50-similar-entry", 4, "$\\mathbf{A} = " + bm("2 & 1", "0 & 3") + "$ and $\\mathbf{P} = " + bm("1 & 0", "1 & 1") + "$. Find the $(1, 1)$ entry of $\\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P}$.", 3),
  n(CB, "t50-b-to-c", 4, "$\\mathcal{B} = \\lbrace [1, 0], [1, 1] \\rbrace$, $\\mathcal{C} = \\lbrace [1, 1], [1, -1] \\rbrace$ and $[\\mathbf{v}]_{\\mathcal{B}} = [2, 2]$. Find the first $\\mathcal{C}$-coordinate of $\\mathbf{v}$.", 3),
  n(CB, "t50-reflection-matrix", 4, "$T$ reflects $\\mathbb{R}^2$ across the line $y = x$. In the basis $\\mathcal{B} = \\lbrace [1, 1], [1, -1] \\rbrace$, find the $(2, 2)$ entry of $[T]_{\\mathcal{B}}$.", -1),
  m(CB, "t50-power", 4, "If $\\mathbf{A} = \\mathbf{P}\\mathbf{D}\\mathbf{P}^{-1}$ with $\\mathbf{D}$ diagonal, then $\\mathbf{A}^{10}$ equals:",
    "$\\mathbf{P}\\mathbf{D}^{10}\\mathbf{P}^{-1}$",
    [
      ["$\\mathbf{P}^{10}\\mathbf{D}^{10}\\mathbf{P}^{-10}$", "The inner $\\mathbf{P}^{-1}\\mathbf{P}$ pairs cancel; $\\mathbf{P}$ itself is never raised to a power."],
      ["$\\mathbf{D}^{10}$", "That is $\\mathbf{A}^{10}$ in the eigenbasis; converting back needs $\\mathbf{P}$ and $\\mathbf{P}^{-1}$."],
      ["$\\mathbf{P}^{-1}\\mathbf{D}^{10}\\mathbf{P}$", "The factors are in the wrong order."],
    ]),
  // level 5
  n(CB, "t50-poly-coords", 5, "In the basis $\\lbrace 1, \\; 1 + x, \\; 1 + x + x^{2} \\rbrace$ of polynomials of degree at most $2$, find the coordinate $c_2$ (on $1 + x$) of $p(x) = 3 + 5x + 2x^{2}$.", 3),
  n(CB, "t50-transition-entry", 5, "$\\mathcal{B} = \\lbrace [2, 1], [1, 1] \\rbrace$ and $\\mathcal{C} = \\lbrace [1, 0], [1, 2] \\rbrace$. Find the $(1, 1)$ entry of the matrix $\\mathbf{P}_{\\mathcal{C} \\leftarrow \\mathcal{B}}$ that converts $\\mathcal{B}$-coordinates into $\\mathcal{C}$-coordinates.", 1.5),
  s(CB, "t50-why-same-charpoly", 5, "Explain why similar matrices $\\mathbf{A}$ and $\\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P}$ have the same characteristic polynomial.",
    "Writes $\\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P} - \\lambda\\mathbf{I} = \\mathbf{P}^{-1}(\\mathbf{A} - \\lambda\\mathbf{I})\\mathbf{P}$.",
    "Takes determinants: $\\det(\\mathbf{P}^{-1})\\det(\\mathbf{A} - \\lambda\\mathbf{I})\\det(\\mathbf{P}) = \\det(\\mathbf{A} - \\lambda\\mathbf{I})$, since $\\det(\\mathbf{P}^{-1})\\det(\\mathbf{P}) = 1$."),
  // level 6
  s(CB, "t50-why-orthonormal", 6, "Why is changing to an orthonormal basis computationally convenient?",
    "For orthonormal columns $\\mathbf{P}^{-1} = \\mathbf{P}^{\\top}$, so each coordinate is just a dot product $c_i = \\mathbf{b}_i \\cdot \\mathbf{v}$ — no linear system to solve.",
    "Lengths and angles are preserved by the change, so it is also numerically stable (condition number $1$)."),
  n(CB, "t50-rotate-quadratic", 6, "In coordinates $u, v$ along $\\tfrac{1}{\\sqrt{2}}[1, 1]$ and $\\tfrac{1}{\\sqrt{2}}[-1, 1]$, the quadratic form $q = 5x^{2} + 2xy + 5y^{2}$ becomes $au^{2} + bv^{2}$. Find $a$.", 6),
  // level 7
  n(CB, "t50-fibonacci-trace", 7, "Using $\\mathbf{A} = " + bm("1 & 1", "1 & 0") + "$ (whose eigenvalues are $\\varphi$ and $\\psi$), find $\\operatorname{tr}(\\mathbf{A}^{6}) = \\varphi^{6} + \\psi^{6}$.", 18),
  // level 8
  s(CB, "t50-eigenbasis-explain", 8, "Let $\\mathbf{A} = " + bm("1 & 2", "2 & 1") + "$. Find the matrix of $\\mathbf{x} \\mapsto \\mathbf{A}\\mathbf{x}$ in the basis $\\mathcal{B} = \\lbrace [1, 1], [1, -1] \\rbrace$ and explain what it shows.",
    "Computes $\\mathbf{A}[1, 1] = [3, 3] = 3[1, 1]$ and $\\mathbf{A}[1, -1] = [-1, 1] = -[1, -1]$, so the matrix is $" + bm("3 & 0", "0 & -1") + "$.",
    "Interprets it: $\\mathcal{B}$ is an eigenbasis, and the map stretches by $3$ along $[1, 1]$ and flips along $[1, -1]$."),
  n(CB, "t50-derivative-matrix", 8, "$D$ is differentiation on polynomials of degree at most $2$. In the basis $\\lbrace 1, x, x^{2} \\rbrace$, find the sum of all entries of the matrix $[D]$.", 3),
  n(CB, "t50-power-entry", 8, "Diagonalize $\\mathbf{A} = " + bm("1 & 1", "0 & 2") + "$ to find the $(1, 2)$ entry of $\\mathbf{A}^{5}$.", 31),
  // level 9
  s(CB, "t50-not-similar-identity", 9, "Show that $" + bm("1 & 1", "0 & 1") + "$ is not similar to $\\mathbf{I}$, even though both have the same eigenvalues, trace and determinant.",
    "$\\mathbf{P}^{-1}\\mathbf{I}\\mathbf{P} = \\mathbf{I}$ for every invertible $\\mathbf{P}$, so the only matrix similar to $\\mathbf{I}$ is $\\mathbf{I}$ itself.",
    "The given matrix is not $\\mathbf{I}$ (its eigenvalue $1$ has only a one-dimensional eigenspace, so it is not diagonalizable)."),
  s(CB, "t50-orthonormal-transpose", 9, "Prove that if $\\mathcal{B}$ is orthonormal then $[\\mathbf{v}]_{\\mathcal{B}} = \\mathbf{P}^{\\top}\\mathbf{v}$, and explain what goes wrong for a basis that is not orthogonal.",
    "$(\\mathbf{P}^{\\top}\\mathbf{P})_{ij} = \\mathbf{b}_i \\cdot \\mathbf{b}_j = \\delta_{ij}$, so $\\mathbf{P}^{\\top}\\mathbf{P} = \\mathbf{I}$ and $\\mathbf{P}^{-1} = \\mathbf{P}^{\\top}$.",
    "Otherwise $\\mathbf{P}^{\\top}\\mathbf{P}$ (the Gram matrix) is not $\\mathbf{I}$, and the dot products $\\mathbf{b}_i \\cdot \\mathbf{v}$ are not the coordinates; one must solve $\\mathbf{P}\\mathbf{c} = \\mathbf{v}$."),
  n(CB, "t50-det-from-basis", 9, "$\\mathbf{p}_1, \\mathbf{p}_2, \\mathbf{p}_3$ is a basis of $\\mathbb{R}^3$, and $\\mathbf{A}\\mathbf{p}_1 = 2\\mathbf{p}_1$, $\\mathbf{A}\\mathbf{p}_2 = \\mathbf{p}_1 + 2\\mathbf{p}_2$, $\\mathbf{A}\\mathbf{p}_3 = 5\\mathbf{p}_3$. Find $\\det(\\mathbf{A})$.", 20),
  // level 10
  s(CB, "t50-jordan-basis", 10, "A $2 \\times 2$ real matrix $\\mathbf{A}$ has a repeated eigenvalue $\\lambda$ but only a one-dimensional eigenspace. Explain how to choose a basis in which its matrix is $" + bm("\\lambda & 1", "0 & \\lambda") + "$.",
    "Take an eigenvector $\\mathbf{p}_1$ and solve $(\\mathbf{A} - \\lambda\\mathbf{I})\\mathbf{p}_2 = \\mathbf{p}_1$; this is solvable because $(\\mathbf{A} - \\lambda\\mathbf{I})^{2} = \\mathbf{0}$ (Cayley–Hamilton), so the image of $\\mathbf{A} - \\lambda\\mathbf{I}$ is the eigenline.",
    "Then $\\mathbf{A}\\mathbf{p}_1 = \\lambda\\mathbf{p}_1$ and $\\mathbf{A}\\mathbf{p}_2 = \\mathbf{p}_1 + \\lambda\\mathbf{p}_2$, which are exactly the columns of the Jordan block in the basis $\\lbrace \\mathbf{p}_1, \\mathbf{p}_2 \\rbrace$."),
  s(CB, "t50-rotation-complex", 10, "Show that the rotation $" + bm("0 & -1", "1 & 0") + "$ is not similar over $\\mathbb{R}$ to any diagonal matrix, and give a change of basis that diagonalizes it over $\\mathbb{C}$.",
    "Its characteristic polynomial $\\lambda^{2} + 1$ has no real roots, but a real diagonal matrix similar to it would need real eigenvalues on its diagonal.",
    "Over $\\mathbb{C}$, $[1, -i]$ and $[1, i]$ are eigenvectors for $i$ and $-i$; with $\\mathbf{P} = " + bm("1 & 1", "-i & i") + "$, $\\mathbf{P}^{-1}\\mathbf{A}\\mathbf{P} = \\operatorname{diag}(i, -i)$."),
];

const fourSubspaces: Item[] = [
  // level 1
  m(FF, "t50-null-def", 1, "The null space $N(\\mathbf{A})$ of an $m \\times n$ matrix $\\mathbf{A}$ is:",
    "$\\lbrace \\mathbf{x} \\in \\mathbb{R}^n : \\mathbf{A}\\mathbf{x} = \\mathbf{0} \\rbrace$",
    [
      ["$\\lbrace \\mathbf{y} \\in \\mathbb{R}^m : \\mathbf{A}^{\\top}\\mathbf{y} = \\mathbf{0} \\rbrace$", "That is the left null space $N(\\mathbf{A}^{\\top})$."],
      ["The span of the columns of $\\mathbf{A}$", "That is the column space $C(\\mathbf{A})$."],
      ["The set of $\\mathbf{b}$ for which $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ has no solution", "Those $\\mathbf{b}$ lie in $\\mathbb{R}^m$ outside $C(\\mathbf{A})$ and don’t even form a subspace."],
    ]),
  m(FF, "t50-which-in-rm", 1, "For an $m \\times n$ matrix, which two fundamental subspaces live in $\\mathbb{R}^m$?",
    "The column space and the left null space",
    [
      ["The row space and the null space", "Those live in the input space $\\mathbb{R}^n$."],
      ["The column space and the null space", "The null space consists of inputs, so it lives in $\\mathbb{R}^n$."],
      ["The row space and the left null space", "The row space is spanned by rows of length $n$, so it lives in $\\mathbb{R}^n$."],
    ]),
  m(FF, "t50-complement-row", 1, "Inside $\\mathbb{R}^n$, the orthogonal complement of the row space $C(\\mathbf{A}^{\\top})$ is:",
    "$N(\\mathbf{A})$",
    [
      ["$N(\\mathbf{A}^{\\top})$", "The left null space lives in $\\mathbb{R}^m$; it complements the column space."],
      ["$C(\\mathbf{A})$", "The column space lives in $\\mathbb{R}^m$."],
      ["Always $\\lbrace \\mathbf{0} \\rbrace$", "Only when $\\mathbf{A}$ has full column rank."],
    ]),
  m(FF, "t50-left-dim", 1, "If $\\mathbf{A}$ is $m \\times n$ with rank $r$, then $\\dim N(\\mathbf{A}^{\\top})$ equals:",
    "$m - r$",
    [
      ["$n - r$", "That is $\\dim N(\\mathbf{A})$."],
      ["$r$", "That is the dimension of the column and row spaces."],
      ["$m - n$", "The rank must enter; this could even be negative."],
    ]),
  // level 2
  n(FF, "t50-dim-null", 2, "$\\mathbf{A}$ is $5 \\times 8$ with rank $3$. Find $\\dim N(\\mathbf{A})$.", 5),
  n(FF, "t50-dim-left", 2, "$\\mathbf{A}$ is $7 \\times 4$ with rank $4$. Find $\\dim N(\\mathbf{A}^{\\top})$.", 3),
  n(FF, "t50-sum-dims", 2, "$\\mathbf{A}$ is $6 \\times 9$ with rank $4$. Find the sum $S$ of the dimensions of its four fundamental subspaces.", 15),
  m(FF, "t50-solvable", 2, "$\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ has at least one solution exactly when:",
    "$\\mathbf{b} \\in C(\\mathbf{A})$",
    [
      ["$\\mathbf{b} \\in N(\\mathbf{A})$", "The null space consists of inputs $\\mathbf{x}$, not right-hand sides."],
      ["$\\mathbf{b} \\in N(\\mathbf{A}^{\\top})$", "Nonzero vectors there are exactly the directions $\\mathbf{A}$ can never reach."],
      ["$\\mathbf{b} \\ne \\mathbf{0}$", "$\\mathbf{b} = \\mathbf{0}$ is always solvable, and many nonzero $\\mathbf{b}$ are not."],
    ]),
  // level 3
  n(FF, "t50-rank1-null", 3, "Find $\\dim N(\\mathbf{A})$ for $\\mathbf{A} = " + bm("1 & 2 & 3", "2 & 4 & 6") + "$.", 2),
  n(FF, "t50-rank1-left", 3, "Find $\\dim N(\\mathbf{A}^{\\top})$ for $\\mathbf{A} = " + bm("1 & 2 & 3", "2 & 4 & 6") + "$.", 1),
  m(FF, "t50-rank1-left-vector", 3, "Which vector spans the left null space of $" + bm("1 & 2 & 3", "2 & 4 & 6") + "$?",
    "$[2, -1]$",
    [
      ["$[-2, 1, 0]$", "That vector is in $N(\\mathbf{A}) \\subseteq \\mathbb{R}^3$, not the left null space in $\\mathbb{R}^2$."],
      ["$[1, 2]$", "$\\mathbf{A}^{\\top}[1, 2] = [5, 10, 15] \\ne \\mathbf{0}$; it spans the column space instead."],
      ["$[1, 2, 3]$", "That spans the row space."],
    ]),
  n(FF, "t50-null-membership", 3, "For which $k$ is $[3, k, 1]$ in $N(\\mathbf{A})$, where $\\mathbf{A} = " + bm("1 & 2 & -7") + "$?", 2),
  // level 4
  n(FF, "t50-echelon-null", 4, "Find $\\dim N(\\mathbf{A})$ for $\\mathbf{A} = " + bm("1 & 2 & 0 & 1", "0 & 0 & 1 & 3", "1 & 2 & 1 & 4") + "$.", 2),
  n(FF, "t50-echelon-left", 4, "Find $\\dim N(\\mathbf{A}^{\\top})$ for $\\mathbf{A} = " + bm("1 & 2 & 0 & 1", "0 & 0 & 1 & 3", "1 & 2 & 1 & 4") + "$.", 1),
  m(FF, "t50-echelon-left-vector", 4, "Which vector lies in $N(\\mathbf{A}^{\\top})$ for $\\mathbf{A} = " + bm("1 & 2 & 0 & 1", "0 & 0 & 1 & 3", "1 & 2 & 1 & 4") + "$?",
    "$[1, 1, -1]$",
    [
      ["$[1, -1, 1]$", "Row $1$ minus row $2$ plus row $3$ is $[2, 4, 0, 2]$, not $\\mathbf{0}$."],
      ["$[-2, 1, 0, 0]$", "That is in $N(\\mathbf{A}) \\subseteq \\mathbb{R}^4$; the left null space lives in $\\mathbb{R}^3$."],
      ["$[1, 1, 1]$", "The sum of the rows is $[2, 4, 2, 8]$, not $\\mathbf{0}$."],
    ]),
  n(FF, "t50-null-param", 4, "For $\\mathbf{A} = " + bm("1 & 0 & 2", "0 & 1 & -1") + "$, the null space is spanned by $[a, 1, 1]$. Find $a$.", -2),
  // level 5
  n(FF, "t50-left-component", 5, "For $\\mathbf{A} = " + bm("1", "1") + "$ and $\\mathbf{b} = [3, 5]$, find the squared length of the component of $\\mathbf{b}$ in $N(\\mathbf{A}^{\\top})$.", 2),
  m(FF, "t50-full-column-rank", 5, "An $m \\times n$ matrix with rank $n < m$ has:",
    "$N(\\mathbf{A}) = \\lbrace \\mathbf{0} \\rbrace$ and a nontrivial left null space",
    [
      ["$N(\\mathbf{A}^{\\top}) = \\lbrace \\mathbf{0} \\rbrace$ and a nontrivial null space", "Reversed: $\\dim N(\\mathbf{A}) = n - n = 0$ while $\\dim N(\\mathbf{A}^{\\top}) = m - n > 0$."],
      ["Both null spaces trivial", "$\\dim N(\\mathbf{A}^{\\top}) = m - n > 0$."],
      ["Both null spaces nontrivial", "$\\dim N(\\mathbf{A}) = n - r = 0$."],
    ]),
  s(FF, "t50-why-orthogonal", 5, "Explain why every vector in $N(\\mathbf{A})$ is orthogonal to every vector in the row space $C(\\mathbf{A}^{\\top})$.",
    "$\\mathbf{A}\\mathbf{x} = \\mathbf{0}$ says each row of $\\mathbf{A}$ has dot product $0$ with $\\mathbf{x}$.",
    "A row-space vector is a combination of rows, and the dot product is linear, so it is also orthogonal to $\\mathbf{x}$."),
  // level 6
  s(FF, "t50-certificate", 6, "$\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ has no solution. Explain how a vector $\\mathbf{y} \\in N(\\mathbf{A}^{\\top})$ can certify this, and why such a certificate always exists.",
    "If $\\mathbf{A}^{\\top}\\mathbf{y} = \\mathbf{0}$ and $\\mathbf{y} \\cdot \\mathbf{b} \\ne 0$, a solution would give $\\mathbf{y} \\cdot \\mathbf{b} = \\mathbf{y}^{\\top}\\mathbf{A}\\mathbf{x} = (\\mathbf{A}^{\\top}\\mathbf{y})^{\\top}\\mathbf{x} = 0$, a contradiction.",
    "Such $\\mathbf{y}$ exists whenever $\\mathbf{b} \\notin C(\\mathbf{A})$, because $N(\\mathbf{A}^{\\top}) = C(\\mathbf{A})^{\\perp}$ and $\\mathbf{b}$ then has a nonzero component there (the Fredholm alternative)."),
  // level 7
  n(FF, "t50-graph-loops", 7, "A connected graph has $5$ nodes and $7$ edges; its $7 \\times 5$ incidence matrix $\\mathbf{A}$ (one row per edge) has rank $4$. Find $\\dim N(\\mathbf{A}^{\\top})$, the number of independent loops.", 3),
  // level 8
  s(FF, "t50-construct-rank1", 8, "Construct a $2 \\times 2$ matrix of rank $1$ whose column space contains $[1, 2]$ and whose null space contains $[1, 1]$, and explain your construction.",
    "Uses a rank-one form $\\mathbf{u}\\mathbf{v}^{\\top}$ with $\\mathbf{u} = [1, 2]$ (fixing the column space) and $\\mathbf{v}$ orthogonal to $[1, 1]$, e.g. $\\mathbf{v} = [1, -1]$ (fixing the null space).",
    "Gives a valid matrix such as $" + bm("1 & -1", "2 & -2") + "$ and checks it sends $[1, 1]$ to $\\mathbf{0}$."),
  s(FF, "t50-impossible", 8, "Explain why no matrix can have row space spanned by $[1, 2, 1]$ and null space containing $[1, 0, 0]$.",
    "The null space must be orthogonal to the row space.",
    "But $[1, 2, 1] \\cdot [1, 0, 0] = 1 \\ne 0$, so the two requirements contradict each other."),
  n(FF, "t50-aat-null", 8, "$\\mathbf{A}$ is $10 \\times 4$ with $\\dim N(\\mathbf{A}) = 1$. Find $\\dim N(\\mathbf{A}\\mathbf{A}^{\\top})$.", 7),
  n(FF, "t50-left-component-3d", 8, "For $\\mathbf{A} = " + bm("1 & 0", "0 & 1", "1 & 1") + "$ and $\\mathbf{b} = [1, 2, 6]$, find the squared length of the component of $\\mathbf{b}$ in $N(\\mathbf{A}^{\\top})$.", 3),
  // level 9
  s(FF, "t50-ata-null", 9, "Prove that $N(\\mathbf{A}^{\\top}\\mathbf{A}) = N(\\mathbf{A})$.",
    "If $\\mathbf{A}\\mathbf{x} = \\mathbf{0}$ then $\\mathbf{A}^{\\top}\\mathbf{A}\\mathbf{x} = \\mathbf{0}$, so $N(\\mathbf{A}) \\subseteq N(\\mathbf{A}^{\\top}\\mathbf{A})$.",
    "Conversely $\\mathbf{A}^{\\top}\\mathbf{A}\\mathbf{x} = \\mathbf{0}$ gives $\\mathbf{x}^{\\top}\\mathbf{A}^{\\top}\\mathbf{A}\\mathbf{x} = \\|\\mathbf{A}\\mathbf{x}\\|^{2} = 0$, so $\\mathbf{A}\\mathbf{x} = \\mathbf{0}$."),
  s(FF, "t50-svd-bases", 9, "Explain how the SVD $\\mathbf{A} = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^{\\top}$ of a rank-$r$ matrix gives orthonormal bases for all four fundamental subspaces.",
    "The first $r$ columns of $\\mathbf{V}$ span the row space and the remaining $n - r$ span the null space (they are sent to $\\mathbf{0}$).",
    "The first $r$ columns of $\\mathbf{U}$ span the column space and the remaining $m - r$ span the left null space."),
  n(FF, "t50-graph-components", 9, "A graph has $6$ nodes, $9$ edges and $2$ connected components; $\\mathbf{A}$ is its $9 \\times 6$ incidence matrix. Find $\\dim N(\\mathbf{A}^{\\top})$.", 5),
  // level 10
  s(FF, "t50-same-subspaces", 10, "Two $m \\times n$ matrices $\\mathbf{A}$ and $\\mathbf{B}$ have the same four fundamental subspaces. Must $\\mathbf{B} = c\\mathbf{A}$ for a scalar $c$? Justify.",
    "No: e.g. $\\mathbf{I}$ and $\\operatorname{diag}(1, 2)$ both have column and row space $\\mathbb{R}^2$ and trivial null spaces, yet are not multiples.",
    "Explains what is forced: equal row spaces give $\\mathbf{B} = \\mathbf{M}\\mathbf{A}$ for an invertible $\\mathbf{M}$, and the subspaces pin down the map only up to such an invertible reshuffling on the column space, not up to a scalar."),
  s(FF, "t50-least-squares", 10, "Use the four fundamental subspaces to explain why the least-squares residual $\\mathbf{b} - \\mathbf{A}\\hat{\\mathbf{x}}$ lies in $N(\\mathbf{A}^{\\top})$, and why the minimum-norm least-squares solution lies in the row space.",
    "The normal equations say $\\mathbf{A}^{\\top}(\\mathbf{b} - \\mathbf{A}\\hat{\\mathbf{x}}) = \\mathbf{0}$: the residual is orthogonal to $C(\\mathbf{A})$, i.e. in $C(\\mathbf{A})^{\\perp} = N(\\mathbf{A}^{\\top})$.",
    "All least-squares solutions differ by null-space vectors and share one row-space component; since the null space is orthogonal to the row space, adding any null component only increases the length, so the shortest solution lies in $C(\\mathbf{A}^{\\top})$."),
];

export const t50LinearAlgebra21Items: Item[] = [...span, ...basis, ...changeOfBasis, ...fourSubspaces];
