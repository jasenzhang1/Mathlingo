# Linear Algebra Cluster 5 — Rank & Orthogonalization

Rank, Rank-Nullity Theorem, Orthonormal Basis, Gram-Schmidt Algorithm, QR Decomposition, Invertible
Matrices (6 concepts). Same format as [Cluster 1](la-01-vectors-and-operations.md).

---

## Rank (`rank`)
*Prereq: Column Space, Row Space · ancestors 9 · b₀ = 0.65*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.35 | Define rank(A). | dim(C(A)) — equivalently dim(row space), since the two always agree (`row-space`'s R2) | — |
| R2 | recall | mcq | −0.05 | For an m×n matrix, rank(A) is always ≤: | min(m,n) | picks "m only" or "n only," missing that both bounds apply simultaneously → `rank` |
| A1 | apply | short-answer | 0.45 | A=[[1,2],[2,4]]. Find rank(A). Then find rank(I₃) (3×3 identity). `[verified: 1 and 3]` | rank=1 for A (rows/columns dependent); rank=3 for I₃ (full rank) | — |
| E1 | explain | derivation | 1.15 | Prove rank(A) ≤ min(m,n), using both bounds. | C(A) is a subspace of Rᵐ, so its dimension can't exceed m; there are only n columns total, so at most n of them can be independent, bounding rank by n as well — combining gives rank(A) ≤ min(m,n) *(required: both halves of the argument)* | — |
| T1 | transfer | short-answer | 1.65 | A dataset has 100 samples and 500 features. Why is the data matrix's rank at most 100, regardless of feature count? What does that imply about finding 500 independent directions of variation? | rank ≤ min(100,500)=100, since only 100 rows exist to provide information; no matter how many features are engineered, at most 100 independent directions of variation can ever be found in this data — directly relevant to PCA and dimensionality reduction *(required: the min-with-rows argument, not just "there are more columns than rows")* | assumes more features always means more genuinely independent directions of variation → `rank` |

*Coverage: 5 items, −0.35…1.65.*

---

## Rank-Nullity Theorem (`rank-nullity-theorem`)
*Prereq: Rank, Null Space · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | State the Rank-Nullity Theorem. | rank(A) + nullity(A) = n, the number of columns | — |
| R2 | recall | mcq | 0.04 | A 5×3 matrix with rank 2 has nullity: | 1 | computes 3−2 incorrectly, or uses the wrong dimension (5) instead of n=3 → `rank-nullity-theorem` |
| A1 | apply | numeric | 0.54 | A is 4×6 with rank 4. Find its nullity. `[verified: 2]` | nullity = 6−4 = 2 | — |
| E1 | explain | derivation | 1.24 | Prove Rank-Nullity using the fact that row space and null space are orthogonal complements in Rⁿ. | orthogonal complements in Rⁿ have dimensions summing to n (`disjointness-four-fundamental-subspaces`); dim(row space)=rank(A) by definition, and dim(null space)=nullity(A); adding gives rank(A)+nullity(A)=n directly *(required: builds the proof from the earlier orthogonal-complement fact, not as an isolated identity)* | — |
| T1 | transfer | short-answer | 1.74 | A is 10×7 with rank 5. Without solving Ax=b, how many free parameters will the general solution have, if one exists at all? `[verified: nullity=2]` | nullity=7−5=2; if a solution exists, the general solution forms a 2-dimensional family (2 free parameters) *(required: uses nullity, not rank, as the count of free parameters)* | reports 5 (the rank) as the number of free parameters, rather than the nullity → `rank-nullity-theorem` |

*Coverage: 5 items, −0.26…1.74.*

---

## Orthonormal Basis (`orthonormal-basis`)
*Prereq: Basis, Orthogonal Vectors · ancestors 8 · b₀ = 0.60*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.4 | Define an orthonormal basis. | a basis whose vectors are pairwise orthogonal and each has unit norm | — |
| R2 | recall | mcq | −0.1 | The main computational advantage of an orthonormal basis is: | a vector's coordinates can be found by simple dot products, with no matrix inversion needed | claims it "requires fewer vectors than other bases" — a basis's size (the dimension) is fixed regardless of orthonormality → `orthonormal-basis` |
| A1 | apply | short-answer | 0.4 | Verify {(1/√2,1/√2), (1/√2,−1/√2)} is orthonormal. `[verified: dot=0, both norms=1]` | dot product = 1/2−1/2=0 (orthogonal); each has norm √(1/2+1/2)=1 (unit) | — |
| E1 | explain | short-answer | 1.1 | Why, for an orthonormal basis {q₁,…,qₙ}, is v's coordinate along qᵢ simply v·qᵢ? | `vector-projection`'s coefficient formula is u·v/‖v‖²; since ‖qᵢ‖=1, the denominator vanishes to 1, leaving just v·qᵢ — no system of equations or matrix inversion required *(required: the direct simplification from the projection formula)* | — |
| T1 | transfer | short-answer | 1.6 | Why do numerical algorithms (for least squares, eigenvalues, etc.) strongly prefer orthonormal bases whenever possible? | orthonormal transformations preserve lengths and angles exactly, so they don't amplify small numerical errors the way an arbitrary, skewed basis can — combined with E1's computational simplicity, this makes orthonormal bases both faster and more numerically stable *(required: names stability, not just computational convenience)* | — |

*Coverage: 5 items, −0.4…1.6.*

---

## Gram-Schmidt Algorithm (`gram-schmidt`)
*Prereq: Orthonormal Basis · ancestors 9 · b₀ = 0.65*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.35 | Describe the basic idea of Gram-Schmidt. | process vectors one at a time, subtracting off each one's projection onto the previously-built orthonormal vectors, then normalizing — producing an orthonormal set spanning the same space | — |
| R2 | recall | mcq | −0.05 | Gram-Schmidt applied to a basis of a subspace produces: | an orthonormal basis for the *same* subspace | claims it produces "a different subspace" — the span is preserved exactly, only the basis vectors change → `gram-schmidt` |
| A1 | apply | numeric | 0.45 | Apply Gram-Schmidt to v₁=(1,1), v₂=(1,0). `[verified: q1=(0.707,0.707), q2=(0.707,-0.707)]` | q₁=v₁/‖v₁‖=(1/√2,1/√2); w₂=v₂−(v₂·q₁)q₁=(1,0)−(1/√2)(1/√2,1/√2)=(1/2,−1/2); q₂=w₂/‖w₂‖=(1/√2,−1/√2) | — |
| E1 | explain | short-answer | 1.15 | Why does subtracting v₂'s projection onto q₁ guarantee the result is orthogonal to q₁? | `vector-projection`'s defining property is exactly that the residual (v₂ − its projection onto q₁) is orthogonal to q₁ — Gram-Schmidt's subtraction step *is* that projection-residual construction, applied repeatedly *(required: the direct callback)* | — |
| T1 | transfer | short-answer | 1.65 | Why can processing v₁ then v₂ give a *different* orthonormal basis than processing v₂ then v₁, even though both span the same subspace? | Gram-Schmidt keeps the *first* processed vector's direction exactly (only normalizing it), and builds every later vector relative to it — swapping the order changes which vector gets this privileged "unchanged direction" role, producing a different (though equally valid) orthonormal basis for the identical span *(required: names which vector is treated specially and why order changes it)* | — |

*Coverage: 5 items, −0.35…1.65.*

---

## QR Decomposition (`qr-decomposition`)
*Prereq: Gram-Schmidt Algorithm · ancestors 10 · b₀ = 0.70*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.3 | State the QR decomposition. | A=QR, where Q has orthonormal columns and R is upper triangular | — |
| R2 | recall | mcq | 0.0 | QR decomposition is essentially: | Gram-Schmidt, repackaged as a matrix factorization | treats QR as "an unrelated algorithm to Gram-Schmidt" — missing that Q *is* the orthonormalized vectors and R holds the projection coefficients computed along the way → `qr-decomposition` |
| A1 | apply | short-answer | 0.5 | Using `gram-schmidt`'s worked example, what do R's entries represent? | R's diagonal entries are the norms ‖wᵢ‖ before normalization; its off-diagonal entries (row i, column j>i) are the projection coefficients vⱼ·qᵢ used along the way | — |
| E1 | explain | short-answer | 1.2 | Why is R specifically *upper* triangular, not just some arbitrary matrix? | qᵢ is built only from v₁,…,vᵢ, never from later vectors; so vⱼ (j>i) can have a nonzero coefficient on qᵢ, but vᵢ can never have a coefficient on qⱼ for j>i, since qⱼ hasn't been constructed yet at that point in the process — exactly the pattern an upper-triangular matrix encodes *(required: the "not yet constructed" argument)* | — |
| T1 | transfer | short-answer | 1.7 | QR decomposition solves least-squares regression more stably than directly inverting XᵀX. Why does working with the orthonormal Q, rather than the original X, improve numerical stability? | `orthonormal-basis`'s T1 established that orthonormal transformations don't amplify small errors; replacing X with its QR factors routes the computation through Q's well-behaved orthonormal structure instead of squaring X into XᵀX, which can dramatically worsen numerical conditioning *(required: the direct callback to orthonormal stability)* | — |

*Coverage: 5 items, −0.3…1.7.*

---

## Invertible Matrices (`invertible-matrices`)
*Prereq: Rank · ancestors 10 · b₀ = 0.70*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.3 | State the rank/invertibility equivalence for a square n×n matrix. | A is invertible ⟺ rank(A)=n (full rank) ⟺ N(A)={0} | — |
| R2 | recall | mcq | 0.0 | Which is FALSE? (a) an invertible matrix has a unique inverse (b) the product of two invertible matrices is invertible (c) every square matrix is invertible | (c) is false | — |
| A1 | apply | short-answer | 0.5 | A=[[1,2],[2,4]] (rank 1). Is A invertible? A=[[1,2],[3,5]] — is this invertible? `[verified: det=-1≠0]` | first: no, rank<2=n; second: yes, det=1·5−2·3=−1≠0 | — |
| E1 | explain | short-answer | 1.2 | Why can a square matrix with a nontrivial null space never be invertible? | if N(A)≠{0}, nullity≥1, so by Rank-Nullity, rank(A)=n−nullity<n — A is not full rank, hence not invertible; this equivalence is a direct corollary of Rank-Nullity, not a separate fact requiring its own proof *(required: derives it from Rank-Nullity explicitly)* | — |
| T1 | transfer | short-answer | 1.7 | Why does solving the normal equations XᵀXβ̂=Xᵀy for a unique β̂ require XᵀX to be invertible, and how does that trace back to X's own columns? | XᵀX invertible requires it to be full rank, which happens exactly when X's columns are linearly independent (no redundant or perfectly collinear predictors) — collinear predictors make XᵀX singular, and the normal equations then have no unique solution *(required: connects XᵀX's invertibility back to X's column independence specifically)* | — |

*Coverage: 5 items, −0.3…1.7.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| rank bounded by only one of m, n instead of both | `rank` |
| nullity computed against the wrong dimension (rows vs columns) | `rank-nullity-theorem` |
| orthonormal basis size assumed smaller than a general basis | `orthonormal-basis` |
| Gram-Schmidt believed to change the spanned subspace | `gram-schmidt` |
| R's triangular structure treated as arbitrary rather than mechanistic | `qr-decomposition` |
| singular matrices assumed to sometimes still be invertible | `invertible-matrices` |

**Cluster total: 30 items across 6 concepts.** All numeric claims verified, including the full
Gram-Schmidt worked example checked to 4 decimal places and cross-referenced directly into
`qr-decomposition`'s own worked item.
