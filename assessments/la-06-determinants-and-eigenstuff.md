# Linear Algebra Cluster 6 — Determinants & Eigenstuff

Determinant, Determinant Properties, Eigenvalues and Eigenvectors, Diagonalization, Eigendecomposition,
LU Decomposition, Symmetric Matrices (7 concepts). Same format as
[Cluster 1](la-01-vectors-and-operations.md).

`eigendecomposition`'s rotation-matrix counterexample (no real eigenvectors) is deliberately left as a
cliffhanger for `symmetric-matrices`' T1 to resolve — the two items are meant to be read together.

---

## Determinant (`determinant`)
*Prereq: Matrices · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | State det for a 2×2 matrix, and its geometric meaning. | det([[a,b],[c,d]])=ad−bc; geometrically, the signed area (or volume, in higher dimensions) of the parallelepiped formed by the matrix's columns | — |
| R2 | recall | mcq | −0.45 | det(A)=0 means: | A is singular (not invertible) | picks "A is invertible" — backwards → `determinant` |
| A1 | apply | numeric | 0.1 | Compute det([[3,1],[2,4]]). `[verified: 10]` | 3·4−1·2=10 | — |
| E1 | explain | short-answer | 0.8 | Explain geometrically why det(A)=0 means the columns are linearly dependent. | the determinant measures the volume of the parallelepiped spanned by the columns; if the columns are dependent, that shape collapses into a lower-dimensional (flat) region, which has zero volume in the original dimension *(required: the "collapses to lower dimension" mechanism)* | — |
| T1 | transfer | short-answer | 1.3 | Why does det(A)=0 for any matrix with a repeated row or column? | a repeated row/column makes the corresponding edges of the parallelepiped point along the same direction rather than genuinely spanning distinct directions, forcing the shape to be flat (zero volume) — a direct instance of E1's collapse argument *(required: connects to the geometric collapse, not just "dependent columns give zero determinant")* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Determinant Properties (`determinant-properties`)
*Prereq: Determinant · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | State two key determinant properties. | det(AB)=det(A)det(B); det(Aᵀ)=det(A) | — |
| R2 | recall | mcq | −0.35 | For an n×n matrix A, det(cA) equals: | cⁿ·det(A) | picks c·det(A), forgetting the exponent n → `determinant-properties` |
| A1 | apply | numeric | 0.2 | A is 3×3 with det(A)=5. Find det(2A). `[verified: 40]` | 2³·5=40 | — |
| E1 | explain | short-answer | 0.9 | Explain geometrically why det(AB)=det(A)det(B). | applying B then A scales volume first by det(B), then by det(A); the combined scaling factor of the composed transformation is the product of the two individual scaling factors — det(AB)=det(A)det(B) is exactly this composition rule *(required: the sequential-scaling argument, not just citing the algebraic identity)* | — |
| T1 | transfer | short-answer | 1.4 | Show det(A⁻¹)=1/det(A) follows immediately from det(AB)=det(A)det(B). | A·A⁻¹=I, so det(A)det(A⁻¹)=det(I)=1; dividing gives det(A⁻¹)=1/det(A) directly *(required: the explicit A·A⁻¹=I substitution)* | — |

*Coverage: 5 items, −0.6…1.4.*

---

## Eigenvalues and Eigenvectors (`eigenvalues-eigenvectors`)
*Prereq: Invertible Matrices, Determinant · ancestors 12 · b₀ = 0.78*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.22 | Define eigenvalue and eigenvector. | Av=λv for a nonzero vector v and scalar λ | — |
| R2 | recall | mcq | 0.08 | Geometrically, an eigenvector of A: | stays on the same line under A, only scaled | claims it "rotates to a completely different direction" — the opposite of the defining property → `eigenvalues-eigenvectors` |
| A1 | apply | short-answer | 0.58 | A=[[2,0],[0,3]]. Find its eigenvalues and eigenvectors by inspection. | eigenvalues 2, 3 with eigenvectors (1,0), (0,1) respectively — for a diagonal matrix, the eigenvalues *are* the diagonal entries | — |
| A2 | apply | numeric | 0.7 | A=[[4,1],[2,3]]. Find its eigenvalues by solving det(A−λI)=0. `[verified: λ=5,2]` | (4−λ)(3−λ)−2=λ²−7λ+10=0 ⟹ λ=5 or λ=2 | — |
| E1 | explain | short-answer | 1.28 | Why does solving det(A−λI)=0 find the eigenvalues? | Av=λv rearranges to (A−λI)v=0; for this to have a *nonzero* solution v, A−λI must be singular (by `invertible-matrices`' equivalence), which happens exactly when det(A−λI)=0 *(required: the singular-matrix connection, not just "that's the formula")* | — |
| T1 | transfer | short-answer | 1.78 | In a Markov chain, the stationary distribution is exactly an eigenvector of the transition matrix with eigenvalue 1. Using Av=λv, explain why "the distribution doesn't change from one step to the next" translates precisely into this statement. | "unchanged after one step" means (transition matrix)·(distribution) = (the same distribution) — exactly Av=v, which is Av=λv with λ=1 *(required: the direct substitution λ=1)* | — |

*Coverage: 6 items, −0.22…1.78.*

---

## Diagonalization (`diagonalization`)
*Prereq: Eigenvalues and Eigenvectors · ancestors 13 · b₀ = 0.82*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.18 | State what it means for A to be diagonalizable. | A=PDP⁻¹, where D is diagonal (the eigenvalues) and P's columns are the corresponding eigenvectors | — |
| R2 | recall | mcq | 0.12 | A matrix is diagonalizable if and only if: | it has n linearly independent eigenvectors | claims "it's invertible" — invertibility and diagonalizability are unrelated properties (a singular matrix can be diagonalizable; an invertible one might not be) → `diagonalization` |
| A1 | apply | short-answer | 0.62 | From `eigenvalues-eigenvectors`'s A2 (λ=5,2 for A=[[4,1],[2,3]]), are these eigenvalues distinct? What does that guarantee? | yes, distinct; distinct eigenvalues always give linearly independent eigenvectors, so A is guaranteed diagonalizable | — |
| E1 | explain | short-answer | 1.32 | Why do distinct eigenvalues always give linearly independent eigenvectors? | if eigenvectors for two different eigenvalues were dependent (one a scalar multiple of the other), applying A would force both eigenvalue equations to hold on the same vector simultaneously, which is only possible if the eigenvalues actually match — contradicting distinctness *(required: the argument, not just the stated fact)* | — |
| T1 | transfer | short-answer | 1.82 | Why is computing A¹⁰⁰ dramatically easier once A is diagonalized? | A¹⁰⁰=PD¹⁰⁰P⁻¹, and D¹⁰⁰ (diagonal) is trivial — just raise each diagonal entry to the 100th power — compared to multiplying A by itself 100 times directly, which is far more expensive *(required: the explicit PD¹⁰⁰P⁻¹ computation)* | — |

*Coverage: 5 items, −0.18…1.82.*

---

## Eigendecomposition (`eigendecomposition`)
*Prereq: Diagonalization · ancestors 14 · b₀ = 0.85*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.15 | How does eigendecomposition relate to diagonalization? | the same factored form A=PDP⁻¹, now emphasized as a *decomposition* of A into simpler pieces rather than a claim about A's diagonalizability | — |
| R2 | recall | mcq | 0.15 | Not every matrix has a real eigendecomposition, because: | some matrices lack enough independent real eigenvectors, or have complex eigenvalues | claims "eigendecomposition always exists for every square matrix" over the reals → `eigendecomposition` |
| A1 | apply | short-answer | 0.65 | A=[[0,−1],[1,0]] (a 90° rotation). Does it have real eigenvalues? `[verified: complex, discriminant negative]` | no — a 90° rotation sends *every* real vector off its own line, so no real eigenvector can exist; the eigenvalues are complex (λ=±i) | assumes every real square matrix must have real eigenvalues → `eigendecomposition` |
| E1 | explain | short-answer | 1.35 | Explain geometrically why a rotation (other than 0° or 180°) can have no real eigenvectors. | an eigenvector must stay on its own line under the transformation (`eigenvalues-eigenvectors`'s R2); a genuine rotation, by definition, moves *every* vector off its original line, so the defining property of an eigenvector can never be satisfied by any real vector *(required: the direct callback to the "stays on the same line" definition)* | — |
| T1 | transfer | short-answer | 1.85 | The Spectral Theorem guarantees symmetric matrices always have real eigenvalues and orthogonal eigenvectors. What special property of symmetric matrices rules out the rotation-like failure seen here? | symmetric matrices cannot rotate vectors the way an antisymmetric or generic matrix can — their transformation only stretches along a set of mutually orthogonal directions, never introducing the kind of directional "twist" that produces complex eigenvalues *(required: names symmetry as ruling out the rotational/twisting behavior specifically)* — resolved fully in `symmetric-matrices`' T1 | — |

*Coverage: 5 items, −0.15…1.85.*

---

## LU Decomposition (`lu-decomposition`)
*Prereq: Invertible Matrices · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | State what LU decomposition is. | A=LU, with L lower triangular (typically with 1's on the diagonal) and U upper triangular — Gaussian elimination's steps recorded as a matrix factorization | — |
| R2 | recall | mcq | 0.04 | LU decomposition is primarily used for: | solving Ax=b efficiently for *many* different b with the same A | picks "finding eigenvalues," an unrelated use → `lu-decomposition` |
| A1 | apply | short-answer | 0.54 | Why does having A=LU make solving Ax=b for many different b much cheaper than repeating full Gaussian elimination each time? | computing L and U is an O(n³) cost paid once; each new b then only needs two cheap O(n²) triangular solves (forward substitution with L, then back substitution with U), instead of a fresh O(n³) elimination *(required: the explicit cost comparison)* | — |
| E1 | explain | short-answer | 1.24 | Connect LU decomposition directly to Gaussian elimination. | L records the elimination multipliers used to zero out entries below each pivot; U is the row-echelon result of applying those elimination steps to A *(required: both halves named)* | — |
| T1 | transfer | short-answer | 1.74 | Why might LU decomposition fail (require row swaps) even for an invertible matrix? Give a tiny example. | A=[[0,1],[1,0]] has a zero in the pivot position, forcing a row swap before elimination can proceed at all, even though A is perfectly invertible (det=−1≠0) — this is exactly why real numerical software uses partial pivoting *(required: the concrete zero-pivot example)* | — |

*Coverage: 5 items, −0.26…1.74.*

---

## Symmetric Matrices (`symmetric-matrices`)
*Prereq: Matrices · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Define a symmetric matrix. | A=Aᵀ, i.e. Aᵢⱼ=Aⱼᵢ for all i,j | — |
| R2 | recall | mcq | −0.45 | Which is a genuinely guaranteed property of symmetric matrices? | their eigenvalues are always real, and eigenvectors for distinct eigenvalues are always orthogonal | claims "they're always invertible" — false; a symmetric matrix can easily be singular → `symmetric-matrices` |
| A1 | apply | short-answer | 0.1 | Is A=[[1,2],[2,3]] symmetric? Is B=[[1,2],[3,4]]? `[verified]` | A: yes (a₁₂=a₂₁=2); B: no (a₁₂=2≠3=a₂₁) | — |
| E1 | explain | short-answer | 0.8 | Why is a covariance matrix always symmetric? | Cov(Xᵢ,Xⱼ)=Cov(Xⱼ,Xᵢ) directly from the definition of covariance — the (i,j) and (j,i) entries are always equal by construction *(required: the direct algebraic reason, not just "covariance matrices happen to be symmetric")* — a genuine cross-domain link to the probability sweep's `covariance` | — |
| T1 | transfer | short-answer | 1.3 | Why is the fact that symmetric matrices always have real eigenvalues essential for covariance matrices to make sense as "measuring spread in various directions" — resolving `eigendecomposition`'s rotation cliffhanger? | a covariance matrix's eigenvalues are variances along its principal directions; a complex eigenvalue would have no meaning as a variance (variances are real, nonnegative quantities); symmetry is exactly what rules out the rotation-like behavior that produced complex eigenvalues in `eigendecomposition`'s counterexample, guaranteeing every covariance matrix's "spread" is measurable along real, orthogonal directions *(required: explicitly resolves the earlier cliffhanger)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| det(A)=0 read as "invertible" rather than "singular" | `determinant` |
| cⁿ scaling of det(cA) computed as c | `determinant-properties` |
| eigenvector definition reversed (rotates vs. stays on its line) | `eigenvalues-eigenvectors` |
| diagonalizability conflated with invertibility | `diagonalization` |
| every real matrix assumed to have real eigenvalues | `eigendecomposition` |
| LU decomposition assumed always pivot-free | `lu-decomposition` |
| symmetric matrices assumed always invertible | `symmetric-matrices` |

**Cluster total: 36 items across 7 concepts.** All numeric claims verified, including the complex
eigenvalues of the rotation-matrix counterexample (confirmed via a negative discriminant), which
`symmetric-matrices`' T1 is built to resolve.
