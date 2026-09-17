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

## Idempotent Matrices (`idempotent-matrices`)
*Prereq: Symmetric Matrices, Eigenvalues and Eigenvectors, Trace, Vector Projection · ancestors 16 · b₀ = 0.75*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.65 | Define an idempotent matrix P. | a square matrix satisfying P²=P — applying it twice does the same as applying it once | — |
| R2 | recall | mcq | −0.45 | Every eigenvalue of an idempotent matrix must equal: | 0 or 1, and no other value | claims eigenvalues can be "any value between 0 and 1" — idempotence forces λ²=λ, which has exactly two solutions, not a continuum → `idempotent-matrices` |
| R3 | recall | short-answer | −0.25 | State the relationship between trace and rank for an idempotent matrix, and why it holds. | tr(P)=rank(P), because trace sums the eigenvalues and idempotence restricts them to 0 or 1, so the sum simply counts the ones — which is the dimension of P's range | — |
| R4 | recall | mcq | −0.05 | If P is both symmetric and idempotent, P is: | the orthogonal projection matrix onto its own column space | claims symmetry adds nothing beyond idempotence — it is exactly what upgrades a general (possibly oblique) projection to an *orthogonal* one → `idempotent-matrices` |
| A1 | apply | numeric | 0.15 | P=[[1,1],[0,0]]. Verify P²=P. Is P symmetric? `[verified: P²=P; not symmetric]` | P²=[[1·1+1·0, 1·1+1·0],[0,0]]=[[1,1],[0,0]]=P ✓; P≠Pᵀ, so this is a valid but *oblique* projector | — |
| A2 | apply | numeric | 0.35 | P=[[0.5,0.5],[0.5,0.5]]. Verify P²=P and find its eigenvalues. `[verified: P²=P; eigenvalues 0,1]` | each entry of P² equals 0.5·0.5+0.5·0.5=0.5, matching P exactly; eigenvalues solve λ²=λ with trace 1 and det 0, giving λ=0,1 | — |
| A3 | apply | numeric | 0.55 | X=[[1],[1],[1]] (a 3×1 column of ones). Compute the hat matrix H=X(XᵀX)⁻¹Xᵀ. `[verified: H = (1/3)·J₃, every entry 1/3]` | XᵀX=3 (scalar), so H=(1/3)XXᵀ, and XXᵀ is the 3×3 all-ones matrix J₃ — every entry of H is 1/3 | — |
| A4 | apply | short-answer | 0.75 | For the H found in A3, verify tr(H)=1, matching rank(X)=1. `[verified: tr(H)=1]` | the diagonal entries are each 1/3, and 1/3+1/3+1/3=1, exactly the rank of the 3×1 matrix X | — |
| A5 | apply | short-answer | 0.95 | A symmetric idempotent P on ℝ⁷ has tr(P)=4. State rank(P), rank(I−P), and tr(I−P). | rank(P)=4 (idempotent ⟹ trace=rank); I−P is also idempotent with rank 7−4=3, so tr(I−P)=3 | — |
| A6 | apply | short-answer | 1.15 | A regression report lists a leverage value hᵢᵢ=1.24 for one observation. Explain why this must be a computational error. | for the hat matrix H, hᵢᵢ=(H²)ᵢᵢ=Σⱼhᵢⱼ²≥hᵢᵢ², forcing hᵢᵢ(1−hᵢᵢ)≥0 and hence 0≤hᵢᵢ≤1; a value above 1 is algebraically impossible for an idempotent matrix's diagonal, so the number was misreported or miscomputed | reports it as "just an unusually influential point" rather than recognizing the algebraic impossibility → `idempotent-matrices` |
| A7 | apply | numeric | 1.35 | C=I−(1/3)J₃ is the 3×3 centering matrix. Compute C explicitly and verify C²=C. `[verified: C has 2/3 on the diagonal, −1/3 off-diagonal; C²=C]` | C=[[2/3,−1/3,−1/3],[−1/3,2/3,−1/3],[−1/3,−1/3,2/3]]; each diagonal entry of C² is (2/3)²+2(−1/3)²=4/9+2/9=6/9=2/3, and each off-diagonal entry is 2(2/3)(−1/3)+(−1/3)²=−4/9+1/9=−3/9=−1/3, matching C exactly | — |
| E1 | explain | derivation | 1.55 | Prove that every eigenvalue of an idempotent matrix is 0 or 1. | if Pv=λv for v≠0, then P²v=λ²v; but P²=P means P²v=Pv=λv, so λ²v=λv, and since v≠0, λ²=λ, whose only real solutions are λ=0 and λ=1 *(required: the full λ²=λ substitution chain)* | — |
| E2 | explain | derivation | 1.75 | Prove tr(P)=rank(P) for idempotent P from the eigenvalue argument in E1. | trace is the sum of all eigenvalues; by E1 each eigenvalue is 0 or 1, so the sum simply counts how many eigenvalues equal 1; that count is the dimension of the eigenspace for λ=1, which is exactly the range of P and hence rank(P) *(required: the "trace counts the ones" step)* | — |
| E3 | explain | derivation | 1.95 | Prove that if P is symmetric and idempotent, then v−Pv is orthogonal to every vector in the range of P, for any v. | take any u=Pw in the range of P; uᵀ(v−Pv)=(Pw)ᵀ(v−Pv)=wᵀPᵀ(v−Pv)=wᵀP(v−Pv) (using Pᵀ=P) =wᵀ(Pv−P²v)=wᵀ(Pv−Pv)=0, using P²=P in the last step *(required: the explicit substitution using both Pᵀ=P and P²=P)* | — |
| E4 | explain | short-answer | 2.15 | For the hat matrix H, explain why H(I−H)=0 and what this implies about fitted values and residuals. | H(I−H)=H−H²=H−H=0 directly from idempotence; consequently ŷᵀ(y−ŷ)=(Hy)ᵀ(I−H)y=yᵀH(I−H)y=0, so the fitted values and residuals are exactly orthogonal — not approximately, and not by any statistical assumption, purely from H being idempotent *(required: both the H(I−H)=0 step and the resulting orthogonality of ŷ and residuals)* | — |
| E5 | explain | short-answer | 2.35 | Explain why no idempotent matrix other than the identity can be invertible. | if P²=P and P⁻¹ exists, multiply both sides on the left (or right) by P⁻¹: P⁻¹P²=P⁻¹P gives P=I; so the only invertible idempotent matrix is the identity, and every other idempotent matrix is necessarily singular, consistent with E1's λ=0 eigenvalues *(required: the explicit P⁻¹P²=P⁻¹P step)* | assumes idempotent matrices are generically invertible "since most matrices are" → `idempotent-matrices` | 
| T1 | transfer | short-answer | 2.55 | Connect tr(H)=p (H the hat matrix of an n×p design matrix X of full rank) directly to "degrees of freedom" and the divisor n−p in s²=RSS/(n−p). | H is symmetric idempotent with rank(X)=p, so tr(H)=rank(H)=p by E2's argument; I−H is then idempotent of rank n−p, so tr(I−H)=n−p is exactly the residual degrees of freedom — the divisor in s² is not a separate convention, it is the trace of the complementary projector *(required: the explicit tr(I−H)=n−p identification)* | — |
| T2 | transfer | short-answer | 2.75 | Why does the sample variance use divisor n−1, using the centering matrix C=I−(1/n)J from A7? | C is symmetric idempotent (verified in A7 for n=3) with rank n−1, since it projects onto the subspace orthogonal to the all-ones vector; the sum of squared centered deviations is a quadratic form built from C, so its "natural" degrees of freedom — tr(C) — is n−1, exactly the divisor used in the sample variance *(required: identifying tr(C)=n−1 as the source of the divisor)* | — |
| T3 | transfer | short-answer | 2.95 | Under normal errors, RSS/σ²=(ε/σ)ᵀ(I−H)(ε/σ) is exactly χ²ₙ₋ₚ. Which property of I−H established in this concept makes that an *exact* claim rather than an approximation? | I−H is symmetric idempotent of rank n−p (by E2's trace=rank argument), and a quadratic form in a standard normal vector built from a symmetric idempotent matrix of rank r is exactly χ²ᵣ by definition — the exactness comes entirely from I−H's algebraic structure, with no large-sample argument invoked anywhere *(required: naming symmetric-idempotent-of-rank-r as the exact condition for χ²ᵣ)* | — |
| T4 | transfer | short-answer | 3.15 | A6 showed leverage hᵢᵢ must lie in [0,1]. Explain why regression diagnostics flag observations with hᵢᵢ close to 1 as "high-leverage," using the projection interpretation of H. | H projects y onto C(X), and hᵢᵢ measures how much the iᵗʰ fitted value ŷᵢ depends on the iᵗʰ observed yᵢ itself (the iᵗʰ diagonal weight in that projection); hᵢᵢ near its maximum of 1 means the fit at that point is driven almost entirely by that single observation, with almost none of the "averaging" over other data points that keeps ordinary fitted values stable *(required: hᵢᵢ as self-influence within the projection, not just "a large number")* | — |

*Coverage: 20 items, −0.65…3.15.*

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
