# Linear Algebra Cluster 7 — Spectral Theory & Special Matrices

Spectral Theorem, Orthogonal Matrices, Positive Definite Matrices, Cholesky Decomposition, Schur
Complement, Rayleigh Quotient, Matrix Stability (7 concepts). Same format as
[Cluster 1](la-01-vectors-and-operations.md).

`spectral-theorem`'s T1 resolves `eigendecomposition`'s rotation-matrix cliffhanger from the previous
cluster in full; `positive-definite-matrices` and `schur-complement` both reach directly back into the
probability/statistics sweep (covariance matrices, conditional variance).

---

## Spectral Theorem (`spectral-theorem`)
*Prereq: Symmetric Matrices, Eigendecomposition, Orthonormal Basis · ancestors 22 · b₀ = 1.07*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.07 | State the Spectral Theorem. | every symmetric A can be written A=QΛQᵀ, where Q is orthogonal (orthonormal eigenvectors as columns) and Λ is diagonal with real eigenvalues | — |
| R2 | recall | mcq | 0.37 | The Spectral Theorem strengthens ordinary diagonalization (A=PDP⁻¹) by guaranteeing: | P can always be chosen orthogonal, so P⁻¹=Pᵀ | claims "D always has positive entries" — eigenvalues of a symmetric matrix can certainly be negative → `spectral-theorem` |
| A1 | apply | short-answer | 0.87 | A symmetric A has orthonormal eigenvectors q₁,q₂ with eigenvalues 3,5. Write A=QΛQᵀ explicitly. | Q=[q₁ q₂], Λ=diag(3,5); equivalently A=3q₁q₁ᵀ+5q₂q₂ᵀ, a sum of rank-1 pieces | — |
| E1 | explain | derivation | 1.57 | Prove symmetric matrices have orthogonal eigenvectors for distinct eigenvalues. | if Av₁=λ₁v₁, Av₂=λ₂v₂ with λ₁≠λ₂: λ₁(v₁·v₂)=(Av₁)·v₂=v₁·(Av₂)=λ₂(v₁·v₂) using A=Aᵀ; so (λ₁−λ₂)(v₁·v₂)=0, and since λ₁≠λ₂, v₁·v₂=0 *(required: the full symmetric-substitution chain)* | — |
| T1 | transfer | short-answer | 2.07 | Why does PCA rely fundamentally on the Spectral Theorem applied to a covariance matrix? | a covariance matrix's eigenvectors are *guaranteed* real and orthogonal (not merely generically likely to be), which is exactly what's needed for the principal components to form a valid orthonormal coordinate system — this resolves `eigendecomposition`'s rotation-matrix cliffhanger: symmetry is precisely the property that rules out the rotational behavior that broke real eigendecomposition there *(required: the explicit resolution of that earlier example)* | — |

*Coverage: 5 items, 0.07…2.07.*

---

## Orthogonal Matrices (`orthogonal-matrices`)
*Prereq: Orthonormal Basis · ancestors 9 · b₀ = 0.65*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.35 | Define an orthogonal matrix Q. | QᵀQ=I, equivalently Q⁻¹=Qᵀ, and Q's columns form an orthonormal basis | — |
| R2 | recall | mcq | −0.05 | Orthogonal matrices, as transformations, always: | preserve lengths and angles (rotations/reflections only) | claims they "stretch some vectors and shrink others" — that's exactly what orthogonal transformations *don't* do → `orthogonal-matrices` |
| A1 | apply | numeric | 0.45 | Q=[[0,−1],[1,0]] (90° rotation). Verify QᵀQ=I. `[verified: identity]` | QᵀQ = [[1,0],[0,1]] ✓ | — |
| E1 | explain | derivation | 1.15 | Prove QᵀQ=I implies ‖Qx‖=‖x‖ for every x. | ‖Qx‖²=(Qx)ᵀ(Qx)=xᵀQᵀQx=xᵀx=‖x‖² *(required: the full substitution)* | — |
| T1 | transfer | short-answer | 1.65 | Why does numerical software strongly prefer orthogonal matrices for rotations, reflections, and basis changes? | Q⁻¹=Qᵀ makes inversion free (no matrix inversion algorithm needed), and E1 guarantees lengths and angles are preserved exactly — both a computational and a geometric advantage, and exactly why `eigendecomposition`'s rotation example was orthogonal to begin with despite having no real eigenvectors *(required: both the computational and geometric points)* | — |

*Coverage: 5 items, −0.35…1.65.*

---

## Positive Definite Matrices (`positive-definite-matrices`)
*Prereq: Symmetric Matrices, Eigenvalues and Eigenvectors · ancestors 14 · b₀ = 0.85*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.15 | Define positive definite. | symmetric A such that xᵀAx>0 for every nonzero x | — |
| R2 | recall | mcq | 0.15 | A symmetric matrix is positive definite if and only if: | all its eigenvalues are positive | claims "all its entries are positive" — false in general, and refuted directly by A1 → `positive-definite-matrices` |
| A1 | apply | numeric | 0.65 | Is A=[[2,−1],[−1,2]] positive definite? `[verified: eigenvalues 3,1, both positive]` | eigenvalues 3 and 1, both positive — yes, positive definite, *despite* having a negative off-diagonal entry, directly refuting R2's false alternative | rejects A as positive definite because of the negative entry → `positive-definite-matrices` |
| E1 | explain | short-answer | 1.35 | Why is every covariance matrix automatically positive *semi*-definite? | for any linear combination aᵀX of a random vector X, Var(aᵀX)=aᵀΣa, and variance can never be negative — so aᵀΣa≥0 for every a, which is exactly positive semi-definiteness *(required: the direct Var(aᵀX)=aᵀΣa identity)* — a genuine link to `covariance` in the probability sweep | — |
| T1 | transfer | short-answer | 1.85 | Why does strict positive *definiteness* (not just semi-) of a covariance matrix correspond to no exact linear relationship existing among the variables? | aᵀΣa=0 for some nonzero a means Var(aᵀX)=0, i.e. the linear combination aᵀX is (almost surely) a constant — an exact linear redundancy among the components; strict positive definiteness rules this out entirely, requiring every nontrivial linear combination to have genuine variance *(required: the Var=0 ⟹ constant argument)* | — |

*Coverage: 5 items, −0.15…1.85.*

---

## Cholesky Decomposition (`cholesky-decomposition`)
*Prereq: Positive Definite Matrices · ancestors 15 · b₀ = 0.89*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.11 | State the Cholesky decomposition and its requirement. | A=LLᵀ, L lower triangular; requires A symmetric and positive definite | — |
| R2 | recall | mcq | 0.19 | Cholesky decomposition requires: | a symmetric and positive definite matrix | claims "any square matrix" works — general LU decomposition, not Cholesky, applies there → `cholesky-decomposition` |
| A1 | apply | short-answer | 0.69 | Why is Cholesky roughly twice as fast as general LU decomposition on the same matrix? | symmetry means only about half the matrix's information is independent (the upper triangle mirrors the lower) — Cholesky exploits this redundancy directly, unlike general LU which treats every entry independently *(required)* | — |
| E1 | explain | derivation | 1.39 | Explain how Cholesky is used to generate correlated samples with target covariance Σ, and verify the covariance claim. | draw independent standard normal z, and transform as Lz where Σ=LLᵀ; Cov(Lz)=L·Cov(z)·Lᵀ=L·I·Lᵀ=LLᵀ=Σ exactly *(required: the explicit Cov(Lz) computation)* | — |
| T1 | transfer | short-answer | 1.89 | Why does Cholesky decomposition fail (attempting a square root of a negative number) if mistakenly applied to a matrix that isn't actually positive definite — and how is that failure itself useful? | a non-positive-definite matrix has at least one non-positive eigenvalue, which surfaces as an attempted square root of a negative quantity partway through the algorithm; this failure is a genuinely useful diagnostic that an estimated covariance matrix has a numerical error or isn't valid *(required: the diagnostic-value framing, not just "it errors out")* | — |

*Coverage: 5 items, −0.11…1.89.*

---

## Schur Complement (`schur-complement`)
*Prereq: Invertible Matrices · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | Define the Schur complement of D in the block matrix [[A,B],[C,D]]. | A − BD⁻¹C, assuming D is invertible | — |
| R2 | recall | mcq | 0.04 | The Schur complement is primarily useful for: | computing determinants and inverses of block matrices efficiently, by reducing to smaller sub-blocks | picks "finding eigenvalues directly" — an unrelated use → `schur-complement` |
| A1 | apply | short-answer | 0.54 | State the block-determinant identity using the Schur complement. | det([[A,B],[C,D]]) = det(D)·det(A−BD⁻¹C), for invertible D | — |
| E1 | explain | short-answer | 1.24 | Connect the Schur complement to conditional distributions of a jointly Gaussian vector. | for a jointly Gaussian vector split into two blocks, the conditional covariance of one block given the other is *exactly* the Schur complement of the other block's covariance submatrix — a purely algebraic block-matrix tool that turns out to compute `conditional-distribution`'s conditional covariance directly *(required: names this as an exact identity, not an analogy)* | — |
| T1 | transfer | short-answer | 1.74 | Why does "conditioning reduces uncertainty" (a natural intuition from `conditional-distribution`) show up in the Schur complement formula as subtracting a nonnegative term? | BD⁻¹C represents how much the other blocks predict about A; subtracting it from A can only shrink (never grow) A's effective spread, so the conditional covariance is never larger than the unconditional one — the algebra directly encodes the intuition *(required: the "subtracting a nonnegative term can only shrink" argument)* | — |

*Coverage: 5 items, −0.26…1.74.*

---

## Rayleigh Quotient (`rayleigh-quotient`)
*Prereq: Symmetric Matrices, Eigenvalues and Eigenvectors · ancestors 14 · b₀ = 0.85*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.15 | Define the Rayleigh quotient. | R(x) = (xᵀAx)/(xᵀx), for symmetric A and nonzero x | — |
| R2 | recall | mcq | 0.15 | The maximum of R(x) over all nonzero x equals: | the largest eigenvalue of A | picks "the trace of A" — trace is the *sum* of eigenvalues, not the max → `rayleigh-quotient` |
| A1 | apply | numeric | 0.65 | A=diag(2,5). Compute R(x) for x=(1,0), (0,1), (1,1); which is largest? `[verified: 2, 5, 3.5]` | R(1,0)=2, R(0,1)=5, R(1,1)=3.5 — the maximum among these matches the largest eigenvalue, 5, achieved at its eigenvector | — |
| E1 | explain | short-answer | 1.35 | Why is the maximum of R(x) achieved exactly at the largest eigenvalue's eigenvector? | writing x in the eigenbasis, xᵀAx becomes a weighted sum of eigenvalues (weighted by squared coordinates), making R(x) a weighted average of the eigenvalues; this average is maximized by putting all the weight on the single largest eigenvalue's direction *(required: the weighted-average argument)* | — |
| T1 | transfer | short-answer | 1.85 | Why is PCA's first principal component found by maximizing the Rayleigh quotient of the data's covariance matrix? | the direction of maximum variance is exactly the direction maximizing xᵀΣx/xᵀx — this is literally the Rayleigh quotient maximization from E1, applied to Σ, not merely an analogous problem *(required: states this as the identical mechanism, not a parallel one)* | — |

*Coverage: 5 items, −0.15…1.85.*

---

## Matrix Stability (`matrix-stability`)
*Prereq: Eigenvalues and Eigenvectors, Matrix Norms · ancestors 16 · b₀ = 0.92*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.08 | Describe what "stability" means for the iteration x_{k+1}=Ax_k. | whether repeated application of A drives x_k to zero, keeps it bounded, or blows up, as k→∞ — governed by A's eigenvalues | — |
| R2 | recall | mcq | 0.22 | This iteration converges to zero for *any* starting x₀ if and only if: | all eigenvalues of A have magnitude less than 1 (spectral radius <1) | picks "det(A)<1" — the determinant is a product of eigenvalues, and can be small even with one large eigenvalue present → `matrix-stability` |
| A1 | apply | short-answer | 0.72 | A=diag(0.5, 1.5). Does the iteration converge to zero for a generic starting vector? | no — the component along the eigenvalue-1.5 direction grows without bound, even though the eigenvalue-0.5 component shrinks to zero; the largest eigenvalue magnitude (the spectral radius) governs long-run behavior | assumes convergence because "most" eigenvalues (or the average) are below 1 → `matrix-stability` |
| E1 | explain | derivation | 1.42 | Using x_k=A^kx₀=PD^kP⁻¹x₀, explain why the largest eigenvalue magnitude eventually dominates. | D^k raises each diagonal entry to the k-th power; whichever eigenvalue has the largest magnitude grows or shrinks slower relative to the others and eventually dominates every other term as k grows, regardless of the initial mixture (unless that direction's component in x₀ happens to be exactly zero) *(required: the term-domination argument via D^k)* | — |
| T1 | transfer | short-answer | 1.92 | Why do engineers check the spectral radius when analyzing whether a control system or iterative algorithm stays stable over many iterations? Connect to `matrix-norms`' operator norm. | the spectral radius is exactly what governs long-run growth or decay under repeated application, per E1; the operator norm is always an upper bound on the spectral radius (though not always equal for non-symmetric matrices), so a small operator norm gives a safe, if sometimes loose, stability guarantee when the exact spectral radius is hard to compute *(required: the operator-norm-as-upper-bound relationship)* | — |

*Coverage: 5 items, −0.08…1.92.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| Spectral Theorem assumed to force positive eigenvalues | `spectral-theorem` |
| orthogonal matrices assumed to stretch/shrink vectors | `orthogonal-matrices` |
| positive definiteness judged from entry signs rather than eigenvalues | `positive-definite-matrices` |
| Cholesky assumed valid for any square matrix | `cholesky-decomposition` |
| Schur complement mistaken for an eigenvalue tool | `schur-complement` |
| Rayleigh quotient max confused with trace | `rayleigh-quotient` |
| stability judged from determinant or average eigenvalue rather than spectral radius | `matrix-stability` |

**Cluster total: 35 items across 7 concepts.** All numeric claims verified. This cluster completes the
resolution of `eigendecomposition`'s rotation cliffhanger (`spectral-theorem`'s T1) and plants two
direct callbacks into the probability/statistics sweep (`positive-definite-matrices`' E1 on covariance,
`schur-complement`'s E1 on conditional covariance).
