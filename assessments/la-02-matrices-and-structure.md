# Linear Algebra Cluster 2 — Matrices & Structure

Matrix Multiplication, Matrices, Trace, Linear Transformations, Matrix Calculus, Kronecker Product,
Matrix Norms (7 concepts). Same format as [Cluster 1](la-01-vectors-and-operations.md).

`matrix-calculus` is the concept added to the graph for this sweep (see `concepts.md`) — the graph
previously had nothing defining a gradient, despite `gradient-descent` being named after one.

---

## Matrix Multiplication (`matrix-multiplication`)
*Prereq: Vector Operations · ancestors 2 · b₀ = 0.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.95 | State the dimension rule for matrix multiplication. | (m×n)(n×p) = (m×p); the inner dimensions must match | — |
| R2 | recall | mcq | −0.7 | Matrix multiplication is: | generally *not* commutative (AB≠BA) | assumes it's always commutative, by analogy with scalar multiplication → `matrix-multiplication` |
| R3 | recall | short-answer | −0.6 | What property does the identity matrix I satisfy for any compatible matrix A? | AI = IA = A — I acts as the multiplicative identity | — |
| R4 | recall | mcq | −0.5 | Is matrix multiplication associative — does (AB)C = A(BC) always hold when the products are defined? | yes, always — associativity holds even though commutativity fails | — |
| A1 | apply | numeric | −0.15 | A=[[1,2],[3,4]], B=[[5,6],[7,8]]. Compute AB and BA; confirm they differ. `[verified: AB=[[19,22],[43,50]], BA=[[23,34],[31,46]]]` | AB≠BA, confirming non-commutativity concretely | — |
| A2 | apply | numeric | −0.05 | A=[[1,0,2],[0,1,3]] (2×3), B=[[1,0],[0,1],[1,1]] (3×2). Compute AB. `[verified: [[3,2],[3,4]]]` | AB = [[3,2],[3,4]] — a 2×2 result, since the inner dimension 3 matches | — |
| A3 | apply | numeric | 0.05 | A=[[1,1],[0,1]], B=[[2,0],[1,2]], C=[[1,0],[0,3]]. Compute (AB)C and A(BC); confirm they're equal. `[verified: (AB)C=A(BC)=[[3,6],[1,6]]]` | (AB)C = A(BC) = [[3,6],[1,6]] — a concrete check of associativity | — |
| A4 | apply | numeric | 0.15 | A=[[1,2],[3,4]]. Compute AI where I is the 2×2 identity. `[verified: [[1,2],[3,4]]]` | AI = A — multiplying by I leaves A unchanged | — |
| A5 | apply | short-answer | 0.25 | How many scalar multiplications are needed to compute the product of an m×n matrix and an n×p matrix, using the standard row-times-column definition? | mnp — each of the mp output entries needs n scalar multiplications | — |
| A6 | apply | numeric | 0.35 | A=[[2,1],[0,3]], v=(4,5) (as a column vector). Compute Av. `[verified: (13,15)]` | Av = (2·4+1·5, 0·4+3·5) = (13,15) — matrix-vector product is a special case (p=1) of matrix multiplication | — |
| A7 | apply | short-answer | 0.45 | A is 2×3 and B is 2×3. Is AB defined? Is BA defined? Explain using the dimension rule. | Neither is defined as written — the inner dimensions (3 vs 2) don't match either way; only Aᵀ B or ABᵀ (etc.) could work, since compatibility depends on exact shapes, not just "both matrices exist" | — |
| E1 | explain | short-answer | 0.55 | Why is matrix multiplication defined row-times-column, rather than some other rule? Connect to function composition. | (AB)x = A(Bx) — applying B first, then A; matrix multiplication *is* function composition of the two linear maps, and the row-times-column rule is exactly what makes that composition identity hold *(required)* | — |
| E2 | explain | short-answer | 0.65 | Using the composition view from E1, explain why (AB)C = A(BC) must hold, without computing any entries. | both sides compute the composite map "apply C, then B, then A" to any vector x — composition of functions is associative simply because there's only one way to chain three function applications in a fixed order, regardless of how the chain is parenthesized *(required: the function-composition argument, not entrywise verification)* | — |
| E3 | explain | short-answer | 0.75 | Why does the identity matrix I act as a multiplicative identity, in terms of the linear transformation it represents? | I represents the identity transformation, T(x)=x, which does nothing to any vector; composing "do nothing" before or after any transformation A leaves A's action unchanged, so AI=IA=A *(required)* | — |
| E4 | explain | short-answer | 0.85 | Given associativity, why can the *order* in which you parenthesize a chain of matrix products still affect computational cost, even though the final result is the same? | associativity guarantees the *result* is identical for any parenthesization, but each parenthesization creates different intermediate matrices with different sizes, so the number of scalar multiplications (from A5's mnp rule) can differ drastically between orderings — correctness and cost are separate questions *(required: distinguishes result-equality from cost-difference)* | — |
| E5 | explain | short-answer | 0.95 | If A and B are both block matrices with compatible block sizes, why can AB be computed by treating each block like a single "entry" and multiplying blocks together (in the same row-times-column pattern)? | the row-times-column definition only relies on the entries forming a ring under addition and multiplication (matrices satisfy this too, as long as block sizes align), so block matrices multiply exactly like scalar matrices with blocks standing in for individual entries *(required)* | — |
| T1 | transfer | short-answer | 1.05 | Why does the order of matrix multiplication matter in practice — e.g. rotating an image then scaling it, versus scaling then rotating? | rotate-then-scale and scale-then-rotate are different compositions of transformations and generally produce visibly different results (e.g. an off-center rotation followed by scaling moves things differently than scaling first) — a direct real-world instance of AB≠BA *(required: a concrete geometric example, not just "order matters")* | — |
| T2 | transfer | short-answer | 1.2 | A neural network layer computes h = W₂(W₁x). Why does swapping W₁ and W₂ (computing W₁(W₂x) instead) generally produce a completely different network, not just a relabeling? | each Wᵢ represents a distinct linear transformation with its own learned structure; composition order determines which transformation acts on the raw input first and which acts on the already-transformed output, so swapping them changes what each Wᵢ is being asked to do, generally yielding different outputs entirely (AB≠BA) *(required)* | — |
| T3 | transfer | short-answer | 1.35 | You must compute the product of three matrices A(30×1), B(1×30), C(30×1). Using A6/A5's cost formula, explain why computing (AB)C vs A(BC) leads to wildly different costs, even though both give the same final answer. | (AB) is 30×30, so (AB)C costs 30·1·30 + 30·30·1 = 900+900=1800 multiplications; but BC is 1×1, so A(BC) costs 30·1·1 + 30·1·1 = 60 — associativity guarantees the same numeric result, yet the *order of parenthesization* changes cost by more than 25× *(required: concrete cost comparison using the mnp rule)* | — |
| T4 | transfer | short-answer | 1.5 | Two matrices A and B generally satisfy AB≠BA, but some special pairs *do* commute — e.g. any two diagonal matrices, or A and Aⁿ for any n. Why does diagonal structure guarantee commutativity when general matrices don't? | diagonal matrices act independently on each coordinate axis (scaling axis i by dᵢ), so applying two diagonal scalings in either order just multiplies the same per-axis factors together, which is commutative for scalars — general matrices mix coordinates together, so the order in which two different "mixings" happen generally changes the result *(required: connects diagonal structure's independence-per-axis to why commutativity emerges as a special case)* | — |

*Coverage: 20 items, −0.95…1.5.*

---

## Matrices (`matrices`)
*Prereq: Matrix Multiplication · ancestors 3 · b₀ = 0.19*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.81 | Viewed as a linear transformation, what do a matrix's columns represent? | each column is the image of the corresponding standard basis vector under the transformation | — |
| R2 | recall | mcq | −0.55 | An m×n matrix, as a linear transformation, maps vectors from: | Rⁿ to Rᵐ | reverses it, mapping Rᵐ to Rⁿ → `matrices` |
| A1 | apply | numeric | 0.0 | A=[[2,0],[0,3]]. Compute A applied to (1,1). | (2,3) | — |
| E1 | explain | short-answer | 0.69 | Why do the columns of A tell you exactly where the basis vectors go? | Ae_i picks out the i-th column of A by the definition of matrix-vector multiplication, so the image of each basis vector *is* the corresponding column *(required)* | — |
| T1 | transfer | short-answer | 1.19 | Distinguish "a matrix as a table of pixel data" from "a matrix as a linear transformation," using an image-rotation example. | a data matrix stores values (e.g. pixel intensities) with no transformation implied; a transformation matrix, applied to coordinate vectors, actively maps each pixel's position to a new one (e.g. rotating the image) — the same word "matrix" names two conceptually different objects here *(required)* | — |
| R3 | recall | short-answer | −0.40 | What does it mean for a matrix to represent a linear transformation "in a given basis"? | the matrix's columns are the images of that basis's vectors, expressed as coordinates in the (possibly different) output basis — the same transformation looks like a different matrix in a different basis | — |
| R4 | recall | mcq | −0.20 | A square n×n matrix, viewed as a transformation, maps: | Rⁿ to itself (an "endomorphism") | thinks a square matrix must map to a different space than it maps from → `matrices` |
| A2 | apply | numeric | 0.10 | A=[[0,−1],[1,0]] (a 90° rotation). Compute A applied to (2,−1). `[verified: (1,2)]` | A(2,−1)=(1,2) — rotating the point 90° counterclockwise | — |
| A3 | apply | numeric | 0.20 | A=[[1,2],[0,1]] (a shear). Compute A applied to (1,3). `[verified: (7,3)]` | A(1,3)=(7,3) — the x-coordinate shifts by twice the y-coordinate, while y is unchanged | — |
| A4 | apply | numeric | 0.30 | A=[[1,0],[0,0]] (projection onto the x-axis). Compute A applied to (5,7). `[verified: (5,0)]` | A(5,7)=(5,0) — the y-component is discarded entirely | — |
| A5 | apply | numeric | 0.40 | A=diag(2,−1). Compute A applied to (3,4), and describe geometrically what each axis does. `[verified: (6,−4)]` | A(3,4)=(6,−4) — the x-axis is stretched by 2, the y-axis is flipped and left the same length | — |
| A6 | apply | numeric | 0.50 | R=[[0,−1],[1,0]] (rotate 90°), S=diag(2,3) (scale). Compute S(R(1,0)) and (SR)(1,0), confirming they match. `[verified: both (0,3)]` | S(R(1,0))=S(0,1)=(0,3); (SR)(1,0)=(0,3) — matches, since the matrix of a composition is the product of the matrices | — |
| A7 | apply | short-answer | 0.60 | A=[[3,1],[2,4]]. Without computing Av for any v, state where e₁=(1,0) and e₂=(0,1) are sent. | e₁ is sent to A's first column, (3,2); e₂ is sent to A's second column, (1,4) — reading columns directly, no multiplication needed | — |
| E2 | explain | short-answer | 0.80 | Why does composing two linear transformations correspond to multiplying their matrices, rather than adding them or some other operation? | applying transformation B then A to a vector x gives A(Bx); since A(Bx)=(AB)x by the definition of matrix multiplication, the single matrix describing "do B then A" is exactly the product AB — multiplication is forced by wanting composition, not addition, to be represented *(required: derives AB from A(Bx) as the composed map)* | — |
| E3 | explain | short-answer | 0.90 | Two different m×n matrices A and B can agree on where they send every basis vector only if A=B. Why does this make "a matrix" and "a linear transformation Rⁿ→Rᵐ" essentially the same object? | a linear transformation is completely determined once you know where it sends each basis vector (by linearity, every other vector's image follows); since a matrix's columns record exactly those basis images, distinct matrices always give distinct transformations and vice versa — the correspondence is one-to-one *(required: ties uniqueness to linearity, not just "matrices and transformations are related")* | — |
| E4 | explain | short-answer | 1.00 | Why does an n×n matrix with two identical columns necessarily represent a transformation that is not invertible? | two identical columns mean two different standard basis vectors are sent to the same output, so the transformation cannot be "undone" — an inverse would have to send that one output back to two different inputs, which is impossible for a function *(required: connects identical columns to the transformation failing to be one-to-one)* | — |
| E5 | explain | short-answer | 1.10 | Why is "a matrix" overloaded to mean both "a table of numbers" and "a linear transformation," and why does keeping the two views separate matter when debugging code? | the same array of numbers can be interpreted purely as stored data (e.g. a lookup table) or as an operator meant to act on vectors; conflating them can lead to applying a data matrix as if it were a transformation (or vice versa), producing numerically valid but semantically meaningless results *(required: gives a concrete consequence of conflating the two views)* | — |
| T2 | transfer | short-answer | 1.35 | A grayscale image is stored as a matrix of pixel intensities. Rotating the image 90° is done by multiplying coordinate vectors by a rotation matrix — a completely different operation from the pixel-intensity matrix itself. Why can both be called "a matrix" without contradiction? | the pixel matrix is data indexed by position, with no notion of acting on anything; the rotation matrix is an operator that maps position vectors to new position vectors — they coexist because one matrix (the image) is the *object being transformed* (via its coordinates) and the other (the rotation) is the *transformation itself*, and neither role depends on which one is "table-like" *(required: names both roles explicitly and why they don't conflict)* | — |
| T3 | transfer | short-answer | 1.50 | A recommendation system represents users and items as a ratings matrix R, but also uses a matrix P to project a user's rating vector onto a lower-dimensional "preference space." One of these matrices is a linear transformation, the other is a data table. Which is which, and why does that distinction matter for how each is updated during training? | R is a data table — its entries are observed or predicted ratings, updated to match data; P is a linear transformation whose columns define a change of representation, updated so that mapping through it produces a useful (e.g. low-dimensional) representation — treating R as if it were meant to "act on" vectors, or P as if it stored observations, would misdirect how each gets trained *(required: identifies which is which and gives a training-relevant consequence)* | — |
| T4 | transfer | short-answer | 1.70 | Explain why a database "join table" (an n×m matrix of 0s and 1s marking which rows relate to which columns) is naturally thought of as data, while the same-shaped 0/1 matrix used as a "selection operator" in linear algebra is naturally thought of as a transformation. | as a join table, the matrix's entries directly record a relationship between two datasets with no vector being acted upon; as a selection operator, the identical array of 0s and 1s is applied to a vector via matrix-vector multiplication to extract or zero out specific components — the numbers are identical, but only in the second case is the matrix functioning as a map between spaces *(required: uses the same shape example to show intent, not entries, distinguishes the two roles)* | — |

*Coverage: 20 items, −0.81…1.70.*

---

## Trace (`trace`)
*Prereq: Matrices · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Define trace(A), and state its linearity property. | sum of diagonal entries; trace(A+B)=trace(A)+trace(B) | — |
| R2 | recall | mcq | −0.45 | trace(AB) vs trace(BA), for compatible A, B: | always equal (the cyclic property), even when AB≠BA as matrices | assumes they must differ, since AB≠BA in general → `trace` |
| A1 | apply | numeric | 0.1 | A=[[1,2],[3,4]]. Compute trace(A). | 1+4=5 | — |
| E1 | explain | derivation | 0.8 | Prove trace(AB)=trace(BA), directly from the definition. | Σᵢ(AB)ᵢᵢ=ΣᵢΣⱼAᵢⱼBⱼᵢ=ΣⱼΣᵢBⱼᵢAᵢⱼ=Σⱼ(BA)ⱼⱼ — the double sum is symmetric in how the indices are grouped `[verified: trace(AB)=trace(BA)=69 for A,B from the matmul cluster]` *(required: the double-sum reindexing, not just "it's a known identity")* | — |
| T1 | transfer | short-answer | 1.3 | trace(Σ) equals the sum of a covariance matrix's variances, ignoring every off-diagonal covariance entirely. Why does that still give a meaningful "total spread" measure? | trace(Σ) = Σ Var(Xᵢ), so it captures exactly how much each individual component varies on its own, summed across all dimensions — a coherent aggregate measure even though it says nothing about how the components co-vary with each other *(required)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Linear Transformations (`linear-transformations`)
*Prereq: Matrices · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Define a linear transformation. | T(u+v)=T(u)+T(v) and T(cu)=cT(u), for every u, v, and scalar c | — |
| R2 | recall | mcq | −0.45 | Which is *not* a linear transformation? (a) T(x)=2x (b) T(x)=x+1 (c) T(x,y)=(y,x) | (b) — a translation is *affine*, not linear | picks (c), the coordinate-swap, mistaking a perfectly linear map for the non-linear one → `linear-transformations` |
| A1 | apply | short-answer | 0.1 | Spot-check T(x,y)=(x+y, x−y) for additivity using (1,2) and (3,4). `[verified: T(sum)=(10,-2)=T(v1)+T(v2)]` | T(4,6)=(10,−2); T(1,2)+T(3,4)=(3,−1)+(7,−1)=(10,−2) — matches, consistent with linearity (a spot-check, not a full proof) | — |
| E1 | explain | short-answer | 0.8 | Why can every linear transformation Rⁿ→Rᵐ be represented by some matrix A, with T(x)=Ax? | T is fully determined by where it sends the basis vectors e₁,…,eₙ (linearity forces every other vector's image to be a linear combination of these); those images become exactly the columns of A *(required: the "determined by basis images" argument)* | — |
| T1 | transfer | short-answer | 1.3 | Why must T(0)=0 for any linear transformation, and how does that immediately rule out T(x)=3x+5 as linear? | linearity gives T(0)=T(0·x)=0·T(x)=0 for any x; since T(0)=5≠0 for T(x)=3x+5, it cannot be linear — no further checking is needed once this one value is examined *(required: uses T(0·x)=0·T(x) as the mechanism, not just "translations aren't linear")* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Matrix Calculus (Gradients & Jacobians) (`matrix-calculus`)
*Prereq: Linear Transformations, Vector Norm · ancestors 7 · b₀ = 0.54*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.46 | Define the gradient of a scalar function f:Rⁿ→R, and the Jacobian of a vector function g:Rⁿ→Rᵐ. | ∇f = (∂f/∂x₁,…,∂f/∂xₙ), a vector; the Jacobian is the m×n matrix of all partial derivatives ∂gᵢ/∂xⱼ | — |
| R2 | recall | mcq | −0.16 | At a given point, ∇f points in the direction of: | steepest **ascent** | claims it points toward steepest descent — the exact reverse, and the reason gradient descent *subtracts* the gradient → `matrix-calculus` |
| A1 | apply | numeric | 0.34 | f(x,y)=x²+3y². Compute ∇f at (1,2). `[verified: (2,12)]` | ∇f=(2x,6y); at (1,2): (2,12) | — |
| A2 | apply | short-answer | 0.5 | For the linear function f(x)=a·x (a a fixed vector), find ∇f. `[verified concept: gradient of a linear function is constant]` | ∇f = a — constant everywhere, foundational for computing gradients of loss functions built from linear terms | computes a gradient that still depends on x, missing that a linear function's gradient is constant → `matrix-calculus` |
| E1 | explain | derivation | 1.04 | For f(x)=xᵀAx with symmetric A, ∇f=2Ax. Verify this on A=diag(1,2), f(x,y)=x²+2y², by direct partial differentiation. `[verified: (2x,4y)=2Ax]` | ∂f/∂x=2x, ∂f/∂y=4y, giving ∇f=(2x,4y); 2Ax with A=diag(1,2) gives (2x,4y) — matches *(required: the direct partial-derivative computation, confirming the general formula on a concrete case)* | — |
| T1 | transfer | short-answer | 1.54 | Gradient descent updates θ ← θ − η∇L(θ), *subtracting* the gradient. Using R2, explain why subtraction (not addition) is correct for minimizing L, and what would happen if the sign were flipped by mistake. | the gradient points toward steepest ascent, so moving in its negative direction moves toward steeper *descent* — exactly what minimizing L requires; adding the gradient instead would move toward steeper ascent, actively *increasing* the loss at every step — a catastrophic sign bug, not a subtle one *(required: names the sign-flip consequence explicitly)* | — |

*Coverage: 6 items, −0.46…1.54.*

---

## Kronecker Product (`kronecker-product`)
*Prereq: Matrix Multiplication · ancestors 3 · b₀ = 0.19*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.81 | Describe the Kronecker product A⊗B in one sentence. | a block matrix where every entry of A is replaced by that entry times the entire matrix B | — |
| R2 | recall | mcq | −0.55 | For A (m×n) and B (p×q), A⊗B has dimensions: | (mp)×(nq) | picks (m+p)×(n+q), treating it like a block-concatenation rather than a block-multiplication → `kronecker-product` |
| A1 | apply | numeric | 0.0 | A=[1,2] (1×2), B=[[0,1],[1,0]] (2×2). Compute A⊗B. `[verified: [[0,1,0,2],[1,0,2,0]]]` | A⊗B = [1·B, 2·B] = [[0,1,0,2],[1,0,2,0]] | — |
| E1 | explain | short-answer | 0.69 | State the vectorization identity vec(AXB)=(Bᵀ⊗A)vec(X), and explain why it's useful even without a full proof. | it converts a *matrix* equation into an ordinary *linear system* in the flattened vector vec(X), letting standard linear-solver machinery be applied to problems that were originally posed in terms of matrix products *(required: the "turns a matrix equation into a linear system" payoff)* | — |
| T1 | transfer | short-answer | 1.19 | Spatio-temporal data often models its joint covariance as a Kronecker product of a purely-spatial covariance and a purely-temporal one. Why is multiplying two simpler structures together a natural way to build a large, structured covariance, rather than estimating the full joint covariance directly? | the Kronecker structure assumes the spatial and temporal correlation patterns act independently/separably, drastically reducing the number of parameters to estimate compared to a fully general joint covariance matrix, while still capturing genuine two-way dependence *(required: the parameter-reduction/separability argument)* | — |

*Coverage: 5 items, −0.81…1.19.*

---

## Matrix Norms (`matrix-norms`)
*Prereq: Vector Norm · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Define the Frobenius norm. | ‖A‖_F = √(Σᵢⱼ Aᵢⱼ²) — the vector norm applied after flattening A into a single long vector | — |
| R2 | recall | mcq | −0.45 | The operator (spectral) norm ‖A‖₂ is defined as: | max over nonzero x of ‖Ax‖/‖x‖ | picks "the largest entry of A" — a different, much cruder quantity → `matrix-norms` |
| A1 | apply | numeric | 0.1 | A=diag(3,4). Compute ‖A‖_F. `[verified: 5]` | √(9+16)=5 | — |
| A2 | apply | short-answer | 0.2 | Same A=diag(3,4): what is the operator norm ‖A‖₂? `[verified: 4]` | 4 — the largest diagonal entry, since A stretches the (0,1) direction by exactly 4, the maximum possible stretch for this diagonal matrix | reports the operator norm as equal to the Frobenius norm (5), not distinguishing the two → `matrix-norms` |
| E1 | explain | short-answer | 0.8 | Why do Frobenius and operator norms give *different* numbers for the same matrix, as A1/A2 show (5 vs 4)? | Frobenius treats the matrix as one long vector of entries — a "total energy" measure across every direction at once; the operator norm asks only about the single worst-case direction — these are fundamentally different quantities, and the largest singular value (a preview of SVD) turns out to equal the operator norm exactly *(required: the "total energy vs. worst-case direction" distinction)* | — |
| T1 | transfer | short-answer | 1.3 | An iterative algorithm stops when ‖A_new−A_old‖ is small. Why might the wrong norm choice give a misleadingly early "converged" signal? | a small Frobenius-norm change means every individual entry has moved only a little on average, but that doesn't guarantee the matrix's *worst-case* behavior (its operator norm, governing how much it can stretch some vector) has also stabilized — a few entries could still be changing in a direction that matters a great deal *(required: connects the two norms' different meanings to a concrete convergence-monitoring failure)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| matrix multiplication assumed commutative | `matrix-multiplication` |
| domain/codomain of an m×n matrix reversed | `matrices` |
| trace(AB)=trace(BA) doubted despite AB≠BA | `trace` |
| affine maps (with a constant shift) mistaken for linear | `linear-transformations` |
| gradient direction (ascent vs descent) reversed | `matrix-calculus` |
| Kronecker product dimensions computed by addition, not multiplication | `kronecker-product` |
| Frobenius and operator norms conflated | `matrix-norms` |

**Cluster total: 36 items across 7 concepts.** All numeric claims verified by script, including the
non-trivial trace(AB)=trace(BA)=69 identity holding despite AB≠BA as matrices, and the gradient of a
quadratic form checked by direct partial differentiation against the general 2Ax formula.
