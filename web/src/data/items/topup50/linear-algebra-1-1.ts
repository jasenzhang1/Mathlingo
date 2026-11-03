import type { Item } from "../../../lib/assessment/types";
import { m, n, s } from "./shared";

/** 50-per-lesson top-up: vectors, vector operations, dot product. */
const V = "vectors";
const VO = "vector-operations";
const DP = "dot-product";

const vectors: Item[] = [
  // level 1
  m(V, "t50-scalar-vs-vector", 1, "Which quantity is a scalar rather than a vector?",
    "The temperature $21^{\\circ}$C at a point",
    [
      ["A velocity of $30$ km/h due north", "A velocity has a direction as well as a size, so it is a vector."],
      ["A displacement of $3$ m east and $4$ m north", "A displacement has two directional components, so it is a vector."],
      ["A force of $10$ N pushing straight down", "A force has a direction, so it is a vector."],
    ]),
  m(V, "t50-zero-vector", 1, "The zero vector in $\\mathbb{R}^4$ is:",
    "$[0, 0, 0, 0]$",
    [
      ["$0$", "That is the scalar zero; a vector in $\\mathbb{R}^4$ needs $4$ components."],
      ["$[1, 1, 1, 1]$", "That is the all-ones vector, not the additive identity."],
      ["$[0, 0, 0]$", "That has only $3$ components, so it lives in $\\mathbb{R}^3$."],
    ]),
  m(V, "t50-equality", 1, "Two vectors $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^n$ are equal exactly when:",
    "Every component matches: $u_i = v_i$ for all $i$",
    [
      ["They have the same length", "$[1, 0]$ and $[0, 1]$ have the same length but point different ways."],
      ["They contain the same numbers in some order", "Order matters: $[1, 2] \\ne [2, 1]$."],
      ["Their components have the same sum", "$[3, 0]$ and $[1, 2]$ have equal sums but are different vectors."],
    ]),
  m(V, "t50-component-index", 1, "In $\\mathbf{v} = [7, -2, 5]$, the symbol $v_2$ denotes:",
    "$-2$",
    [
      ["$7$", "$7$ is the first component, $v_1$."],
      ["$5$", "That counts from zero; in this notation components are numbered from $1$, so $5$ is $v_3$."],
      ["$2$", "The subscript is the position, not the value."],
    ]),
  // level 2
  n(V, "t50-dimension-count", 2, "The vector $[4, 0, -1, 3, 0, 2]$ lies in $\\mathbb{R}^n$. Find $n$.", 6),
  n(V, "t50-displacement-component", 2, "Find the second component of the displacement vector from $P = (2, -1, 5)$ to $Q = (-3, 4, 1)$.", 5),
  m(V, "t50-free-vector-tip", 2, "The vector from $A = (1, 1)$ to $B = (4, 3)$ is redrawn starting at the point $(10, 10)$. Where does its tip land?",
    "$(13, 12)$",
    [
      ["$(4, 3)$", "That treats the vector as tied to $B$; a vector can be moved, only its components $[3, 2]$ matter."],
      ["$(14, 13)$", "That adds the point $B$ itself rather than the displacement $B - A$."],
      ["$(11, 11)$", "That adds the point $A$ rather than the displacement $B - A$."],
    ]),
  n(V, "t50-tip-from-tail", 2, "A vector $\\mathbf{v} = [3, -2]$ is drawn starting at the point $(-1, 4)$. Find the $y$-coordinate of its tip.", 2),
  // level 3
  n(V, "t50-midpoint", 3, "Find the first coordinate of the midpoint of $P = (3, -2, 7)$ and $Q = (9, 6, -1)$.", 6),
  n(V, "t50-fourth-vertex", 3, "$A = (1, 2)$, $B = (4, 3)$ and $C = (6, 7)$ are consecutive vertices of parallelogram $ABCD$. Find the $x$-coordinate of $D$.", 3),
  m(V, "t50-same-direction", 3, "Which vector points in the same direction as $[2, -3]$?",
    "$[6, -9]$",
    [
      ["$[-4, 6]$", "That is a negative multiple, so it points the opposite way."],
      ["$[3, -2]$", "Swapping components does not give a scalar multiple."],
      ["$[4, -5]$", "Adding the same amount to each component is not scaling; $4/2 \\ne -5/(-3)$."],
    ]),
  n(V, "t50-parallel-k", 3, "For which $k$ is $[3, k]$ parallel to $[6, 10]$?", 5),
  n(V, "t50-one-third-point", 3, "Find the $y$-coordinate of the point one third of the way from $P = (0, 3)$ to $Q = (9, 12)$.", 6),
  // level 4
  n(V, "t50-centroid", 4, "Find the $y$-coordinate of the centroid of the triangle with vertices $(1, 2)$, $(5, -1)$ and $(3, 8)$.", 3),
  n(V, "t50-section-ratio", 4, "Point $R$ lies on the segment from $P = (2, 5)$ to $Q = (12, -5)$ with $PR : RQ = 3 : 2$. Find the $x$-coordinate of $R$.", 8),
  m(V, "t50-collinear-test", 4, "Which three points are collinear?",
    "$(1, 1)$, $(3, 5)$, $(4, 7)$",
    [
      ["$(0, 0)$, $(1, 2)$, $(3, 5)$", "The displacements $[1, 2]$ and $[3, 5]$ are not multiples of each other."],
      ["$(1, 1)$, $(2, 3)$, $(4, 6)$", "The displacements $[1, 2]$ and $[3, 5]$ are not multiples of each other."],
      ["$(2, 0)$, $(0, 2)$, $(2, 2)$", "The displacements $[-2, 2]$ and $[0, 2]$ are not parallel."],
    ]),
  n(V, "t50-unknown-coordinates", 4, "The displacement from $P = (a, 3, -1)$ to $Q = (5, b, 2)$ is $[7, -4, 3]$. Find $a + b$.", -3),
  // level 5
  s(V, "t50-explain-free-vector", 5, "The vector $[2, 1]$ is drawn once from $(0, 0)$ and once from $(5, -3)$. Are these the same vector? Explain what a vector records and what it does not.",
    "Says yes: a vector records only its components (magnitude and direction), so sliding the arrow to a new starting point does not change it.",
    "Notes that the starting point is not part of the vector — only the difference head minus tail matters — unlike a point or position."),
  // level 6
  m(V, "t50-data-vector", 6, "A dataset stores each house as $[\\text{floor area}, \\text{bedrooms}, \\text{price}]$. Which operation on these vectors is meaningful?",
    "Averaging all the house vectors to describe a typical house",
    [
      ["Sorting each vector’s components into increasing order", "Each position carries a meaning; sorting mixes area, bedrooms and price."],
      ["Ranking houses by the sum of their three components", "The sum adds quantities in different units, so it has no meaning."],
      ["Treating $[a, b, c]$ and $[c, b, a]$ as the same house", "Order matters in a vector; reversing it swaps area with price."],
    ]),
  // level 7
  s(V, "t50-units-standardise", 7, "Two houses are stored as $[\\text{area in m}^2, \\text{bedrooms}]$: $[120, 3]$ and $[125, 1]$. Explain why the straight-line distance between these vectors is a poor measure of how similar the houses are, and how to fix it.",
    "Explains that the components are on different scales/units, so the area difference dominates the distance and the large bedroom difference barely registers.",
    "Proposes rescaling each component (for example standardising by subtracting the mean and dividing by the standard deviation, or weighting components) before computing distances."),
  n(V, "t50-parallelogram-diagonal", 7, "In parallelogram $ABCD$, $\\overrightarrow{AB} = [3, 1]$ and $\\overrightarrow{AD} = [1, 4]$. Find the second component of the diagonal $\\overrightarrow{BD}$.", 3),
  m(V, "t50-origin-dependence", 7, "Moving the origin of the coordinate system changes which of these?",
    "The position vectors of the points",
    [
      ["The displacement vector between two points", "A displacement is a difference of positions, so the shift of origin cancels."],
      ["The distance between two points", "Distance is the length of a displacement, which does not depend on the origin."],
      ["Whether three points are collinear", "Collinearity is a property of displacements, which do not depend on the origin."],
    ]),
  // level 8
  s(V, "t50-midsegment-proof", 8, "Use vectors to prove that the segment joining the midpoints of two sides of a triangle is parallel to the third side and half as long.",
    "With vertices $\\mathbf{a}, \\mathbf{b}, \\mathbf{c}$, takes midpoints $\\tfrac{1}{2}(\\mathbf{a} + \\mathbf{b})$ and $\\tfrac{1}{2}(\\mathbf{a} + \\mathbf{c})$ and finds their difference $\\tfrac{1}{2}(\\mathbf{c} - \\mathbf{b})$.",
    "Concludes that this is a scalar multiple ($\\tfrac{1}{2}$) of the third side $\\mathbf{c} - \\mathbf{b}$, so it is parallel and half the length."),
  n(V, "t50-parallelogram-cevian", 8, "In parallelogram $ABCD$, $M$ is the midpoint of $BC$, and segment $AM$ meets diagonal $BD$ at $P$. Find $BD / BP$.", 3),
  // level 9
  n(V, "t50-cevian-ratio", 9, "In triangle $ABC$, $D$ lies on $BC$ with $BD : DC = 1 : 2$, and $E$ is the midpoint of $CA$. Segments $AD$ and $BE$ meet at $P$. Find $AP / PD$.", 3),
  s(V, "t50-centroid-origin-free", 9, "For points $\\mathbf{a}_1, \\ldots, \\mathbf{a}_n$, show there is exactly one point $\\mathbf{p}$ with $\\sum_{i=1}^{n} (\\mathbf{a}_i - \\mathbf{p}) = \\mathbf{0}$, and that this point does not depend on where the origin is placed.",
    "Solves the equation to get $\\mathbf{p} = \\tfrac{1}{n}\\sum_i \\mathbf{a}_i$, which is the unique solution since the equation is $n\\mathbf{p} = \\sum_i \\mathbf{a}_i$ with $n \\ne 0$.",
    "Shows origin independence: shifting the origin by $\\mathbf{t}$ replaces each $\\mathbf{a}_i$ by $\\mathbf{a}_i - \\mathbf{t}$ and $\\mathbf{p}$ by $\\mathbf{p} - \\mathbf{t}$, and the differences $\\mathbf{a}_i - \\mathbf{p}$ are unchanged, so the same geometric point is picked out."),
  // level 10
  n(V, "t50-cevian-ratio-hard", 10, "In triangle $ABC$, $D$ lies on $BC$ with $BD : DC = 2 : 3$, and $E$ lies on $CA$ with $CE : EA = 1 : 2$. Segments $AD$ and $BE$ meet at $P$. Find $AP / PD$.", 5),
  s(V, "t50-affine-dependence", 10, "Show that four points with position vectors $\\mathbf{a}, \\mathbf{b}, \\mathbf{c}, \\mathbf{d} \\in \\mathbb{R}^3$ lie in a common plane if and only if there are scalars $\\lambda_1, \\ldots, \\lambda_4$, not all zero, with $\\lambda_1 + \\lambda_2 + \\lambda_3 + \\lambda_4 = 0$ and $\\lambda_1\\mathbf{a} + \\lambda_2\\mathbf{b} + \\lambda_3\\mathbf{c} + \\lambda_4\\mathbf{d} = \\mathbf{0}$.",
    "Uses that the points are coplanar exactly when the displacements $\\mathbf{b} - \\mathbf{a}$, $\\mathbf{c} - \\mathbf{a}$, $\\mathbf{d} - \\mathbf{a}$ are linearly dependent, i.e. $\\mu_2(\\mathbf{b} - \\mathbf{a}) + \\mu_3(\\mathbf{c} - \\mathbf{a}) + \\mu_4(\\mathbf{d} - \\mathbf{a}) = \\mathbf{0}$ with the $\\mu_i$ not all zero.",
    "Translates both ways: expanding gives $\\lambda_1 = -(\\mu_2 + \\mu_3 + \\mu_4)$ and $\\lambda_i = \\mu_i$, so the coefficients sum to zero; conversely, substituting $\\lambda_1 = -(\\lambda_2 + \\lambda_3 + \\lambda_4)$ turns the relation back into a dependence among the displacements."),
];

const vectorOperations: Item[] = [
  // level 1
  m(VO, "t50-scalar-mult-def", 1, "Multiplying a vector $\\mathbf{v}$ by a scalar $c$ means:",
    "Multiplying every component of $\\mathbf{v}$ by $c$",
    [
      ["Multiplying only the first component by $c$", "Scaling acts on every component, otherwise the direction would change."],
      ["Adding $c$ to every component", "That shifts the vector; it confuses scaling with translation."],
      ["Appending $c$ as an extra component", "Scaling keeps the vector in the same space $\\mathbb{R}^n$."],
    ]),
  m(VO, "t50-subtraction-def", 1, "The difference $\\mathbf{u} - \\mathbf{v}$ is defined as:",
    "$\\mathbf{u} + (-1)\\mathbf{v}$, computed component by component",
    [
      ["$\\mathbf{v} - \\mathbf{u}$", "Subtraction is not commutative; $\\mathbf{v} - \\mathbf{u}$ is the negative of $\\mathbf{u} - \\mathbf{v}$."],
      ["The number $\\|\\mathbf{u}\\| - \\|\\mathbf{v}\\|$", "That is a scalar; vector subtraction produces a vector."],
      ["Only defined when $\\mathbf{u}$ is longer than $\\mathbf{v}$", "Any two vectors of the same dimension can be subtracted."],
    ]),
  m(VO, "t50-negative-scalar", 1, "Multiplying a nonzero vector by $-2$:",
    "Reverses its direction and doubles its length",
    [
      ["Keeps its direction and halves its length", "That would be multiplying by $\\tfrac{1}{2}$, not $-2$."],
      ["Reverses its direction but keeps its length", "That ignores the factor $2$ in the size of the scalar."],
      ["Rotates it by $90^{\\circ}$", "Scalar multiples stay on the same line through the origin."],
    ]),
  m(VO, "t50-additive-inverse", 1, "The additive inverse of $\\mathbf{v} = [3, -5]$ is:",
    "$[-3, 5]$",
    [
      ["$[3, 5]$", "Every component must be negated, not just one."],
      ["$[-3, -5]$", "Negating $-5$ gives $5$, not $-5$."],
      ["$[\\tfrac{1}{3}, -\\tfrac{1}{5}]$", "That takes reciprocals; the additive inverse is what you add to get $\\mathbf{0}$."],
    ]),
  // level 2
  n(VO, "t50-sum-component", 2, "Let $\\mathbf{u} = [2, -7, 4]$ and $\\mathbf{v} = [-5, 3, 1]$. Find the second component of $\\mathbf{u} + \\mathbf{v}$.", -4),
  n(VO, "t50-scale-component", 2, "Find the third component of $-3[2, 0, -4]$.", 12),
  n(VO, "t50-difference-component", 2, "Let $\\mathbf{u} = [6, 1]$ and $\\mathbf{v} = [2, 9]$. Find the second component of $\\mathbf{u} - \\mathbf{v}$.", -8),
  m(VO, "t50-dimension-mismatch", 2, "What is $[1, 2] + [3, 4, 5]$?",
    "Undefined — the vectors have different dimensions",
    [
      ["$[4, 6, 5]$", "That silently pads the shorter vector with a zero; addition needs equal dimensions."],
      ["$[4, 6]$", "That silently drops the extra component; addition needs equal dimensions."],
      ["$15$", "That adds every entry into a scalar; vector addition returns a vector."],
    ]),
  // level 3
  n(VO, "t50-linear-combination", 3, "Find the first component of $2[1, -3] - 3[4, 2] + [5, 7]$.", -5),
  n(VO, "t50-solve-for-x", 3, "Solve $3\\mathbf{x} + [2, -1] = [11, 8]$ for $\\mathbf{x}$. Find the second component of $\\mathbf{x}$.", 3),
  m(VO, "t50-distributive", 3, "By the distributive law, $c(\\mathbf{u} + \\mathbf{v})$ equals:",
    "$c\\mathbf{u} + c\\mathbf{v}$",
    [
      ["$c\\mathbf{u} + \\mathbf{v}$", "The scalar multiplies both terms, not just the first."],
      ["$c^2\\mathbf{u} + \\mathbf{v}$", "The scalar is distributed once to each term, not squared."],
      ["$c\\mathbf{u} - c\\mathbf{v}$", "Distributing does not change the sign of the second term."],
    ]),
  // level 4
  n(VO, "t50-two-unknowns-a", 4, "Find $a$ such that $a[1, 2] + b[3, -1] = [11, 1]$ for some $b$.", 2),
  n(VO, "t50-two-unknowns-b", 4, "Find $b$ such that $a[2, 1] + b[1, 3] = [1, 8]$ for some $a$.", 3),
  n(VO, "t50-equilibrium", 4, "Three forces $[3, 4]$, $[-1, 2]$ and $[x, y]$ act on a particle and sum to $\\mathbf{0}$. Find $y$.", -6),
  m(VO, "t50-midpoint-to-vertex", 4, "With position vectors $\\mathbf{a}, \\mathbf{b}, \\mathbf{c}$, which expression is the vector from the midpoint of $\\overline{AB}$ to $C$?",
    "$\\mathbf{c} - \\tfrac{1}{2}(\\mathbf{a} + \\mathbf{b})$",
    [
      ["$\\tfrac{1}{2}(\\mathbf{a} + \\mathbf{b}) - \\mathbf{c}$", "That points from $C$ to the midpoint — head minus tail reversed."],
      ["$\\mathbf{c} - \\tfrac{1}{2}(\\mathbf{b} - \\mathbf{a})$", "The midpoint is the average $\\tfrac{1}{2}(\\mathbf{a} + \\mathbf{b})$, not half the difference."],
      ["$\\mathbf{c} - (\\mathbf{a} + \\mathbf{b})$", "That forgets to halve the sum, so it does not use the midpoint."],
    ]),
  // level 5
  s(VO, "t50-zero-product", 5, "Show that if $c\\mathbf{v} = \\mathbf{0}$ for a scalar $c$ and vector $\\mathbf{v}$, then $c = 0$ or $\\mathbf{v} = \\mathbf{0}$.",
    "Handles the case $c \\ne 0$: multiplying by $\\tfrac{1}{c}$ gives $\\mathbf{v} = \\tfrac{1}{c}(c\\mathbf{v}) = \\tfrac{1}{c}\\mathbf{0} = \\mathbf{0}$ (or argues componentwise that each $cv_i = 0$ forces $v_i = 0$).",
    "Notes that the remaining case is $c = 0$, so the two cases together prove the statement."),
  n(VO, "t50-closed-polygon", 5, "The side vectors of a closed hexagon, traversed in order, are $[2, 1]$, $[1, 3]$, $[-2, 2]$, $[-3, 0]$, $[x, -4]$ and $[1, y]$. Find $x + y$.", -1),
  // level 6
  n(VO, "t50-segment-meets-line", 6, "The points $\\mathbf{p}_t = (1 - t)\\mathbf{a} + t\\mathbf{b}$ with $\\mathbf{a} = [1, 7]$ and $\\mathbf{b} = [5, -1]$ trace a segment. For which $t$ does $\\mathbf{p}_t$ lie on the line $y = x$?", 0.5),
  n(VO, "t50-three-weights", 6, "Find $\\lambda_2$ such that $\\lambda_1[1, 0] + \\lambda_2[1, 1] + \\lambda_3[0, 1] = [3, 4]$ and $\\lambda_1 + \\lambda_2 + \\lambda_3 = 5$.", 2),
  // level 7
  s(VO, "t50-affine-midpoint", 7, "Explain why $\\tfrac{1}{2}(\\mathbf{p} + \\mathbf{q})$ names the same point no matter where the origin is placed, while $\\mathbf{p} + \\mathbf{q}$ does not name any origin-independent point.",
    "Shows that shifting the origin by $\\mathbf{t}$ turns $\\tfrac{1}{2}(\\mathbf{p} + \\mathbf{q})$ into $\\tfrac{1}{2}(\\mathbf{p} + \\mathbf{q}) - \\mathbf{t}$, the same point in the new coordinates (the weights sum to $1$).",
    "Shows that $(\\mathbf{p} - \\mathbf{t}) + (\\mathbf{q} - \\mathbf{t}) = (\\mathbf{p} + \\mathbf{q}) - 2\\mathbf{t}$, which is not the old point shifted by $\\mathbf{t}$, so it depends on the origin (the weights sum to $2$)."),
  m(VO, "t50-barycentric-location", 7, "For triangle vertices $\\mathbf{a}, \\mathbf{b}, \\mathbf{c}$, where does the point $\\tfrac{1}{2}\\mathbf{a} + \\tfrac{1}{3}\\mathbf{b} + \\tfrac{1}{6}\\mathbf{c}$ lie?",
    "Inside the triangle, nearest to vertex $A$",
    [
      ["Outside the triangle, because the weights are unequal", "Any positive weights summing to $1$ give a point inside the triangle."],
      ["On side $BC$", "Points on $BC$ have zero weight on $\\mathbf{a}$."],
      ["At the centroid", "The centroid needs equal weights $\\tfrac{1}{3}$ on each vertex."],
    ]),
  // level 8
  s(VO, "t50-zero-times-v", 8, "Using only the vector-space axioms, prove that $0\\mathbf{v} = \\mathbf{0}$ for every vector $\\mathbf{v}$.",
    "Writes $0\\mathbf{v} = (0 + 0)\\mathbf{v} = 0\\mathbf{v} + 0\\mathbf{v}$ using distributivity over scalar addition.",
    "Adds the additive inverse $-(0\\mathbf{v})$ to both sides (with associativity) to conclude $\\mathbf{0} = 0\\mathbf{v}$."),
  s(VO, "t50-tetrahedron-bimedians", 8, "Prove that in any tetrahedron the three segments joining midpoints of opposite edges all pass through one point, which bisects each of them.",
    "For opposite edges $AB$ and $CD$, the midpoints are $\\tfrac{1}{2}(\\mathbf{a} + \\mathbf{b})$ and $\\tfrac{1}{2}(\\mathbf{c} + \\mathbf{d})$, and the midpoint of the segment joining them is $\\tfrac{1}{4}(\\mathbf{a} + \\mathbf{b} + \\mathbf{c} + \\mathbf{d})$.",
    "Notes the expression is symmetric in the four vertices, so the other two pairs of opposite edges give the same point; all three segments pass through it and are bisected there."),
  s(VO, "t50-skew-lines", 8, "Decide whether the lines $\\mathbf{r} = [1, 0, 2] + s[2, -1, 1]$ and $\\mathbf{r} = [3, 1, 0] + t[1, 1, -2]$ intersect, and justify your answer.",
    "Sets the components equal and solves two of the equations, e.g. $1 + 2s = 3 + t$ and $-s = 1 + t$, giving $s = \\tfrac{1}{3}$, $t = -\\tfrac{4}{3}$.",
    "Checks the third equation fails ($2 + \\tfrac{1}{3} = \\tfrac{7}{3}$ but $-2t = \\tfrac{8}{3}$), and with non-parallel directions concludes the lines do not meet (they are skew)."),
  // level 9
  s(VO, "t50-cancellation", 9, "Prove from the vector-space axioms that if $\\mathbf{u} + \\mathbf{w} = \\mathbf{v} + \\mathbf{w}$, then $\\mathbf{u} = \\mathbf{v}$, naming each axiom you use.",
    "Adds $-\\mathbf{w}$ to both sides and regroups: $(\\mathbf{u} + \\mathbf{w}) + (-\\mathbf{w}) = \\mathbf{u} + (\\mathbf{w} + (-\\mathbf{w})) = \\mathbf{u} + \\mathbf{0} = \\mathbf{u}$, and likewise for $\\mathbf{v}$.",
    "Names the axioms used: existence of the additive inverse, associativity of addition, and the zero vector as additive identity."),
  // level 10
  s(VO, "t50-barycentric-uniqueness", 10, "Show that every point $\\mathbf{p} \\in \\mathbb{R}^2$ can be written uniquely as $\\alpha\\mathbf{a} + \\beta\\mathbf{b} + \\gamma\\mathbf{c}$ with $\\alpha + \\beta + \\gamma = 1$ exactly when $\\mathbf{a}, \\mathbf{b}, \\mathbf{c}$ are not collinear, and explain what the signs of $\\alpha, \\beta, \\gamma$ tell you about where $\\mathbf{p}$ is.",
    "Rewrites the condition as $\\mathbf{p} - \\mathbf{a} = \\beta(\\mathbf{b} - \\mathbf{a}) + \\gamma(\\mathbf{c} - \\mathbf{a})$; unique $\\beta, \\gamma$ exist for every $\\mathbf{p}$ exactly when $\\mathbf{b} - \\mathbf{a}$ and $\\mathbf{c} - \\mathbf{a}$ are independent, i.e. the points are not collinear.",
    "Interprets the signs: all weights positive means inside the triangle, a zero weight means on the line through the other two vertices, and a negative weight means on the far side of that line."),
  n(VO, "t50-cevian-combination", 10, "In triangle $ABC$, $D$ lies on $AB$ with $AD : DB = 1 : 2$, and $E$ is the midpoint of $AC$. Segments $CD$ and $BE$ meet at $P$. Find $CP / PD$.", 1.5),
];

const dotProduct: Item[] = [
  // level 1
  m(DP, "t50-result-type", 1, "What kind of object is $\\mathbf{u} \\cdot \\mathbf{v}$ for $\\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^3$?",
    "A scalar (a single real number)",
    [
      ["A vector in $\\mathbb{R}^3$", "That confuses the dot product with the componentwise product."],
      ["A $3 \\times 3$ matrix", "That is the outer product $\\mathbf{u}\\mathbf{v}^\\top$."],
      ["A vector orthogonal to both", "That is the cross product, not the dot product."],
    ]),
  m(DP, "t50-negative-sign", 1, "If $\\mathbf{u} \\cdot \\mathbf{v} < 0$ for nonzero vectors, the angle between them is:",
    "Obtuse (between $90^{\\circ}$ and $180^{\\circ}$)",
    [
      ["Acute", "Acute angles have positive cosine, so a positive dot product."],
      ["Exactly $90^{\\circ}$", "A right angle gives a dot product of exactly $0$."],
      ["Undefined, because dot products are never negative", "Only $\\mathbf{v} \\cdot \\mathbf{v}$ is guaranteed nonnegative."],
    ]),
  m(DP, "t50-self-dot", 1, "$\\mathbf{v} \\cdot \\mathbf{v}$ equals:",
    "$\\|\\mathbf{v}\\|^2$",
    [
      ["$\\|\\mathbf{v}\\|$", "The sum of squared components is the squared length; the square root is missing."],
      ["$2\\|\\mathbf{v}\\|$", "The components are squared, not doubled."],
      ["$1$ for every $\\mathbf{v}$", "Only unit vectors satisfy $\\mathbf{v} \\cdot \\mathbf{v} = 1$."],
    ]),
  m(DP, "t50-geometric-form", 1, "Geometrically, $\\mathbf{u} \\cdot \\mathbf{v}$ equals:",
    "$\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|\\cos\\theta$",
    [
      ["$\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|\\sin\\theta$", "That is the size of the cross product (the parallelogram area)."],
      ["$(\\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|)\\cos\\theta$", "The lengths multiply, they do not add."],
      ["$\\cos\\theta$", "That holds only for unit vectors; in general the lengths scale it."],
    ]),
  // level 2
  n(DP, "t50-compute-3d", 2, "Compute $[2, -1, 3] \\cdot [4, 5, -2]$.", -3),
  n(DP, "t50-compute-4d", 2, "Compute $[1, 2, 3, 4] \\cdot [4, 3, 2, 1]$.", 20),
  m(DP, "t50-not-associative", 2, "For vectors $\\mathbf{u}, \\mathbf{v}, \\mathbf{w} \\in \\mathbb{R}^n$, what is $(\\mathbf{u} \\cdot \\mathbf{v}) \\cdot \\mathbf{w}$?",
    "Not a dot product at all: $\\mathbf{u} \\cdot \\mathbf{v}$ is a scalar, so it can only mean the scalar multiple $(\\mathbf{u} \\cdot \\mathbf{v})\\mathbf{w}$",
    [
      ["It equals $\\mathbf{u} \\cdot (\\mathbf{v} \\cdot \\mathbf{w})$ by associativity", "Neither side is a dot product of two vectors, and the two scalar multiples point along different vectors."],
      ["It is always $0$", "Nothing forces it to vanish; it is a multiple of $\\mathbf{w}$."],
      ["It is a scalar", "A scalar times the vector $\\mathbf{w}$ is a vector."],
    ]),
  // level 3
  n(DP, "t50-find-k", 3, "Find $k$ such that $[k, 2, -1] \\cdot [3, k, 4] = 6$.", 2),
  n(DP, "t50-bilinear", 3, "Given $\\mathbf{u} \\cdot \\mathbf{v} = 3$ and $\\mathbf{u} \\cdot \\mathbf{w} = -2$, compute $\\mathbf{u} \\cdot (2\\mathbf{v} + 5\\mathbf{w})$.", -4),
  m(DP, "t50-basket-cost", 3, "A basket holds quantities $\\mathbf{q} = [2, 5, 1]$ of three goods with prices $\\mathbf{p} = [3, 1, 10]$ dollars. What does $\\mathbf{q} \\cdot \\mathbf{p}$ represent?",
    "The total cost of the basket, $\\$21$",
    [
      ["The vector of costs per good, $[6, 5, 10]$", "That is the componentwise product; the dot product also sums it."],
      ["The average price, about $\\$4.67$", "The dot product weights prices by quantities and sums; it does not average."],
      ["The number of goods, $8$", "That is $\\mathbf{q} \\cdot \\mathbf{1}$, which ignores prices."],
    ]),
  // level 4
  n(DP, "t50-expand-difference", 4, "Given $\\|\\mathbf{u}\\| = 4$, $\\|\\mathbf{v}\\| = 2$ and $\\mathbf{u} \\cdot \\mathbf{v} = -3$, compute $\\|\\mathbf{u} - \\mathbf{v}\\|^2$.", 26),
  n(DP, "t50-expand-product", 4, "Given $\\|\\mathbf{u}\\| = 3$, $\\|\\mathbf{v}\\| = 1$ and $\\mathbf{u} \\cdot \\mathbf{v} = 2$, compute $(2\\mathbf{u} - \\mathbf{v}) \\cdot (\\mathbf{u} + 3\\mathbf{v})$.", 25),
  n(DP, "t50-from-angle", 4, "$\\|\\mathbf{u}\\| = 6$, $\\|\\mathbf{v}\\| = 5$, and the angle between them is $60^{\\circ}$. Compute $\\mathbf{u} \\cdot \\mathbf{v}$.", 15),
  m(DP, "t50-orthogonal-choice", 4, "Which vector is orthogonal to $[3, -2, 1]$?",
    "$[1, 2, 1]$",
    [
      ["$[2, 3, 1]$", "The swap-and-negate trick works in $\\mathbb{R}^2$; here the dot product is $6 - 6 + 1 = 1$."],
      ["$[-3, 2, -1]$", "That is a negative multiple, so it is parallel, not orthogonal."],
      ["$[3, 2, 1]$", "Its dot product is $9 - 4 + 1 = 6$, not $0$."],
    ]),
  // level 5
  s(DP, "t50-cancel-dot", 5, "If $\\mathbf{a} \\cdot \\mathbf{x} = \\mathbf{a} \\cdot \\mathbf{y}$ for a fixed nonzero vector $\\mathbf{a}$, must $\\mathbf{x} = \\mathbf{y}$? Explain.",
    "Says no: the equation only says $\\mathbf{a} \\cdot (\\mathbf{x} - \\mathbf{y}) = 0$, i.e. $\\mathbf{x} - \\mathbf{y}$ is orthogonal to $\\mathbf{a}$.",
    "Gives a counterexample such as $\\mathbf{a} = [1, 0]$, $\\mathbf{x} = [0, 1]$, $\\mathbf{y} = [0, 2]$ (or notes equality would follow only if it held for every $\\mathbf{a}$)."),
  n(DP, "t50-work", 5, "A force $\\mathbf{F} = [3, 4, -1]$ N moves an object through the displacement $\\mathbf{d} = [2, -1, 5]$ m. Find the work $W = \\mathbf{F} \\cdot \\mathbf{d}$ in joules.", -3),
  n(DP, "t50-from-sum-norm", 5, "Vectors satisfy $\\|\\mathbf{a}\\| = 2$, $\\|\\mathbf{b}\\| = 3$ and $\\|\\mathbf{a} + \\mathbf{b}\\| = 4$. Compute $\\mathbf{a} \\cdot \\mathbf{b}$.", 1.5),
  // level 6
  n(DP, "t50-min-over-sphere", 6, "Over all vectors $\\mathbf{v}$ with $\\|\\mathbf{v}\\| = 3$, find the minimum value of $[2, -1, 2] \\cdot \\mathbf{v}$.", -9),
  // level 7
  s(DP, "t50-correlation-cosine", 7, "For centred data vectors $\\mathbf{x}, \\mathbf{y} \\in \\mathbb{R}^n$ (each with mean $0$), explain why the sample correlation equals the cosine of the angle between $\\mathbf{x}$ and $\\mathbf{y}$, and what correlations of $1$ and $0$ mean geometrically.",
    "Writes the correlation as $\\dfrac{\\sum_i x_i y_i}{\\sqrt{\\sum_i x_i^2 \\sum_i y_i^2}} = \\dfrac{\\mathbf{x} \\cdot \\mathbf{y}}{\\|\\mathbf{x}\\|\\,\\|\\mathbf{y}\\|} = \\cos\\theta$.",
    "Interprets: correlation $1$ means the vectors point the same way (positive multiples) and correlation $0$ means they are orthogonal."),
  m(DP, "t50-valid-inner-product", 7, "Which formula defines a valid inner product on $\\mathbb{R}^2$?",
    "$\\langle \\mathbf{u}, \\mathbf{v} \\rangle = 2u_1v_1 + 3u_2v_2$",
    [
      ["$u_1v_1 - u_2v_2$", "Not positive: $\\mathbf{u} = [0, 1]$ gives $\\langle \\mathbf{u}, \\mathbf{u} \\rangle = -1$."],
      ["$u_1v_2 + u_2v_1$", "Not positive: $\\mathbf{u} = [1, -1]$ gives $\\langle \\mathbf{u}, \\mathbf{u} \\rangle = -2$."],
      ["$|u_1v_1| + |u_2v_2|$", "Not linear: the absolute values break $\\langle -\\mathbf{u}, \\mathbf{v} \\rangle = -\\langle \\mathbf{u}, \\mathbf{v} \\rangle$."],
    ]),
  // level 8
  s(DP, "t50-orthogonal-iff-closest", 8, "Prove that $\\mathbf{u} \\cdot \\mathbf{v} = 0$ if and only if $\\|\\mathbf{u} + t\\mathbf{v}\\| \\ge \\|\\mathbf{u}\\|$ for every real $t$.",
    "Expands $\\|\\mathbf{u} + t\\mathbf{v}\\|^2 - \\|\\mathbf{u}\\|^2 = 2t(\\mathbf{u} \\cdot \\mathbf{v}) + t^2\\|\\mathbf{v}\\|^2$, which is $t^2\\|\\mathbf{v}\\|^2 \\ge 0$ when $\\mathbf{u} \\cdot \\mathbf{v} = 0$.",
    "For the converse, if $\\mathbf{u} \\cdot \\mathbf{v} \\ne 0$ picks a small $t$ with sign opposite to $\\mathbf{u} \\cdot \\mathbf{v}$ (e.g. $t = -\\mathbf{u} \\cdot \\mathbf{v} / \\|\\mathbf{v}\\|^2$) to make the difference negative."),
  n(DP, "t50-rhombus-diagonal", 8, "A rhombus has side length $5$ and one diagonal of length $8$. Using the identity $\\|\\mathbf{a} + \\mathbf{b}\\|^2 + \\|\\mathbf{a} - \\mathbf{b}\\|^2 = 2\\|\\mathbf{a}\\|^2 + 2\\|\\mathbf{b}\\|^2$ for its side vectors, find the length of the other diagonal.", 6),
  m(DP, "t50-tetrahedron-dot", 8, "The four vertices of a regular tetrahedron centred at the origin are unit vectors summing to $\\mathbf{0}$. What is the dot product of any two of them?",
    "$-\\tfrac{1}{3}$",
    [
      ["$0$", "At most $3$ nonzero vectors in $\\mathbb{R}^3$ can be mutually orthogonal, and these sum to $\\mathbf{0}$."],
      ["$-\\tfrac{1}{2}$", "That is the value for three unit vectors summing to zero (an equilateral triangle)."],
      ["$\\tfrac{1}{3}$", "Sign error: $0 = \\|\\sum \\mathbf{v}_i\\|^2 = 4 + 12c$ forces $c < 0$."],
    ]),
  n(DP, "t50-three-unit-sum", 8, "Unit vectors $\\mathbf{a}, \\mathbf{b}, \\mathbf{c}$ satisfy $\\mathbf{a} + \\mathbf{b} + \\mathbf{c} = \\mathbf{0}$. Compute $\\mathbf{a} \\cdot \\mathbf{b} + \\mathbf{b} \\cdot \\mathbf{c} + \\mathbf{c} \\cdot \\mathbf{a}$.", -1.5),
  // level 9
  s(DP, "t50-bilinear-forms", 9, "Show that the standard dot product is the only bilinear form $B$ on $\\mathbb{R}^n$ with $B(\\mathbf{e}_i, \\mathbf{e}_j) = 1$ when $i = j$ and $0$ otherwise, and explain how a general bilinear form can be written as $\\mathbf{u}^\\top \\mathbf{M}\\mathbf{v}$.",
    "Uses bilinearity to expand $B(\\mathbf{u}, \\mathbf{v}) = \\sum_i \\sum_j u_i v_j B(\\mathbf{e}_i, \\mathbf{e}_j)$, which collapses to $\\sum_i u_i v_i$ under the given values.",
    "Identifies the general case: $B(\\mathbf{u}, \\mathbf{v}) = \\mathbf{u}^\\top \\mathbf{M}\\mathbf{v}$ with $M_{ij} = B(\\mathbf{e}_i, \\mathbf{e}_j)$, and the dot product is the case $\\mathbf{M} = \\mathbf{I}$."),
  n(DP, "t50-equal-pairwise-min", 9, "Unit vectors $\\mathbf{v}_1, \\ldots, \\mathbf{v}_5$ satisfy $\\mathbf{v}_i \\cdot \\mathbf{v}_j = c$ for all $i \\ne j$. Find the smallest possible value of $c$.", -0.25),
  // level 10
  s(DP, "t50-obtuse-family-bound", 10, "Prove that $\\mathbb{R}^n$ contains at most $n + 1$ nonzero vectors whose pairwise dot products are all negative.",
    "Fixes one vector $\\mathbf{v}$ and projects the others onto its orthogonal complement, $\\mathbf{w}_i = \\mathbf{v}_i - \\dfrac{\\mathbf{v}_i \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|^2}\\mathbf{v}$, and shows $\\mathbf{w}_i \\cdot \\mathbf{w}_j = \\mathbf{v}_i \\cdot \\mathbf{v}_j - \\dfrac{(\\mathbf{v}_i \\cdot \\mathbf{v})(\\mathbf{v}_j \\cdot \\mathbf{v})}{\\|\\mathbf{v}\\|^2} < 0$, since the subtracted term is positive.",
    "Concludes by induction on $n$: the projected vectors live in an $(n - 1)$-dimensional space with pairwise negative dot products, so there are at most $n$ of them, giving at most $n + 1$ in total (base case: at most $2$ in $\\mathbb{R}^1$)."),
  n(DP, "t50-gram-feasibility", 10, "Unit vectors $\\mathbf{a}, \\mathbf{b}, \\mathbf{c} \\in \\mathbb{R}^3$ satisfy $\\mathbf{a} \\cdot \\mathbf{b} = \\tfrac{1}{2}$ and $\\mathbf{a} \\cdot \\mathbf{c} = \\mathbf{b} \\cdot \\mathbf{c} = x$. Find the smallest possible value of $x$. Give $4$ decimal places.", -0.866),
];

export const t50LinearAlgebra11Items: Item[] = [...vectors, ...vectorOperations, ...dotProduct];
