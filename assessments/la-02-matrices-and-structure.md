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
| A1 | apply | numeric | −0.15 | A=[[1,2],[3,4]], B=[[5,6],[7,8]]. Compute AB and BA; confirm they differ. `[verified: AB=[[19,22],[43,50]], BA=[[23,34],[31,46]]]` | AB≠BA, confirming non-commutativity concretely | — |
| E1 | explain | short-answer | 0.55 | Why is matrix multiplication defined row-times-column, rather than some other rule? Connect to function composition. | (AB)x = A(Bx) — applying B first, then A; matrix multiplication *is* function composition of the two linear maps, and the row-times-column rule is exactly what makes that composition identity hold *(required)* | — |
| T1 | transfer | short-answer | 1.05 | Why does the order of matrix multiplication matter in practice — e.g. rotating an image then scaling it, versus scaling then rotating? | rotate-then-scale and scale-then-rotate are different compositions of transformations and generally produce visibly different results (e.g. an off-center rotation followed by scaling moves things differently than scaling first) — a direct real-world instance of AB≠BA *(required: a concrete geometric example, not just "order matters")* | — |

*Coverage: 5 items, −0.95…1.05.*

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

*Coverage: 5 items, −0.81…1.19.*

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
