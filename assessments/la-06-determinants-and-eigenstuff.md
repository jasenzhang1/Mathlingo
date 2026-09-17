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
| R1 | recall | short-answer | −0.70 | State det for a 2×2 matrix, and its geometric meaning. | det([[a,b],[c,d]])=ad−bc; geometrically, the signed area (or volume, in higher dimensions) of the parallelepiped formed by the matrix's columns | — |
| R2 | recall | mcq | −0.45 | det(A)=0 means: | A is singular (not invertible) | picks "A is invertible" — backwards → `determinant` |
| R3 | recall | short-answer | −0.30 | State the determinant formula for a 3×3 matrix via cofactor expansion along the first row. | det=a(ei−fh)−b(di−fg)+c(dh−eg) for [[a,b,c],[d,e,f],[g,h,i]] *(required: correct alternating cofactor signs +,−,+)* | — |
| R4 | recall | mcq | −0.10 | For a triangular (upper or lower) matrix, the determinant equals: | the product of the diagonal entries | multiplies all entries of the matrix rather than just the diagonal → `determinant` |
| A1 | apply | numeric | 0.10 | Compute det([[3,1],[2,4]]). `[verified: 10]` | 3·4−1·2=10 | — |
| A2 | apply | numeric | 0.25 | Compute det([[1,2,3],[0,4,5],[0,0,6]]). `[verified: 24]` | triangular matrix, so det = product of diagonal = 1·4·6=24 | — |
| A3 | apply | numeric | 0.35 | Compute det([[2,0],[5,−3]]). `[verified: −6]` | 2·(−3)−0·5=−6 | — |
| A4 | apply | numeric | 0.45 | Compute det([[1,2,1],[2,1,0],[1,1,2]]) by cofactor expansion along the first row. `[verified: −5]` | 1(1·2−0·1)−2(2·2−0·1)+1(2·1−1·1)=2−8+1=−5 | — |
| A5 | apply | short-answer | 0.55 | Two rows of a 3×3 matrix are swapped and the resulting determinant is −7. What was the original determinant? | row swap flips the sign, so original det = 7 | — |
| A6 | apply | numeric | 0.65 | A 4×4 matrix has det=6. One row is multiplied by 3 (only that row). Find the new determinant. `[verified: 18]` | scaling a single row by c scales det by that same factor c (not cⁿ, since only one row changes): 3·6=18 | confuses single-row scaling with whole-matrix scaling cⁿ → `determinant-properties` |
| A7 | apply | numeric | 0.75 | Compute det via row reduction: A=[[2,4],[1,3]]. Reduce to triangular form and take the product of pivots. `[verified: 2]` | R2−(1/2)R1 gives [[2,4],[0,1]]; product of pivots = 2·1=2 (matches direct computation 2·3−4·1=2) | — |
| E1 | explain | short-answer | 0.80 | Explain geometrically why det(A)=0 means the columns are linearly dependent. | the determinant measures the volume of the parallelepiped spanned by the columns; if the columns are dependent, that shape collapses into a lower-dimensional (flat) region, which has zero volume in the original dimension *(required: the "collapses to lower dimension" mechanism)* | — |
| E2 | explain | short-answer | 0.95 | Explain why swapping two rows of a matrix flips the sign of its determinant, using the geometric (volume) interpretation. | the magnitude of the parallelepiped's volume is unchanged by relabeling which edge is which, but swapping two edge vectors reverses the orientation (handedness) of the frame they define, and the determinant's sign tracks exactly that orientation *(required: ties sign specifically to orientation, not magnitude)* | — |
| E3 | explain | short-answer | 1.05 | Explain why adding a multiple of one row to another row does not change the determinant. | geometrically this is a shear — it slides one face of the parallelepiped parallel to itself without changing its base or its height perpendicular to that face, so the enclosed volume is preserved exactly *(required: names the shear/volume-preservation mechanism)* | — |
| E4 | explain | short-answer | 1.15 | Why is cofactor expansion equivalent to row reduction for computing a determinant, despite looking completely different? | both are different bookkeeping schemes for the same multilinear, alternating function of the rows that is uniquely pinned down (up to normalization) by linearity in each row, the sign flip under a swap, and det(I)=1 — any algorithm satisfying these three properties must return the same value *(required: the uniqueness-of-the-alternating-multilinear-function argument)* | — |
| E5 | explain | short-answer | 1.25 | Explain why a matrix with an all-zero row must have determinant zero, using cofactor expansion. | expanding along that all-zero row, every cofactor term is multiplied by a zero entry, so the entire sum collapses to zero regardless of the other rows' values *(required: the direct expansion argument, not just citing the "zero row implies singular" fact)* | — |
| T1 | transfer | short-answer | 1.30 | Why does det(A)=0 for any matrix with a repeated row or column? | a repeated row/column makes the corresponding edges of the parallelepiped point along the same direction rather than genuinely spanning distinct directions, forcing the shape to be flat (zero volume) — a direct instance of E1's collapse argument *(required: connects to the geometric collapse, not just "dependent columns give zero determinant")* | — |
| T2 | transfer | short-answer | 1.55 | In a change-of-variables integral, ∫f(x)dx=∫f(g(u))\|det Jg(u)\|du. Explain why the Jacobian determinant, not the Jacobian matrix itself, appears here. | the integral needs a single scalar volume-scaling factor at each point to rescale the infinitesimal volume element du into dx; the Jacobian matrix describes the full local linear map, but only its determinant captures how much volume that map stretches or shrinks *(required: connects to the local-linearization volume-scaling role of det)* | — |
| T3 | transfer | short-answer | 1.85 | A 3×3 covariance matrix Σ has det(Σ)=0. What does this imply about the data geometrically, and why would a multivariate normal density formula break down? | det(Σ)=0 means the data's spread collapses into a lower-dimensional subspace (e.g. all points lie on a plane) — exactly the "zero-volume" collapse from E1; the normal density's normalizing constant involves 1/√det(Σ), which is undefined once there is no genuine volume to normalize over *(required: connects the geometric collapse to the density formula breaking)* | — |
| T4 | transfer | short-answer | 2.20 | In numerical linear algebra, why do libraries compute log(det A) via the sum of logs of the pivots from LU decomposition, rather than multiplying pivots directly and then taking a log? | multiplying many pivots directly can overflow or underflow floating-point range long before the log is taken (e.g. a determinant near 2¹⁰⁰⁰), whereas summing the logs of the pivots individually keeps every intermediate value in a safe numerical range *(required: the overflow/underflow reasoning, not just "it's more efficient")* | — |

*Coverage: 20 items, −0.70…2.20.*

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
| R3 | recall | short-answer | −0.20 | State the effect of swapping two rows of a matrix on its determinant, and the effect of adding a multiple of one row to another. | swapping two rows multiplies det by −1; adding a multiple of one row to another leaves det unchanged | — |
| R4 | recall | mcq | −0.05 | If A has an all-zero row or column, det(A) equals: | 0 | assumes a zero row only reduces the determinant's magnitude rather than forcing it exactly to zero → `determinant-properties` |
| A2 | apply | numeric | 0.35 | A is 4×4 with det(A)=2. Find det(3A). `[verified: 162]` | 3⁴·2=81·2=162 | — |
| A3 | apply | numeric | 0.45 | A and B are both 3×3 with det(A)=4, det(B)=−2. Find det(AB) and det(BA). `[verified: −8 for both]` | det(AB)=det(A)det(B)=4·(−2)=−8; det(BA)=det(B)det(A)=−8 also, since scalar multiplication commutes even though matrix multiplication does not | — |
| A4 | apply | numeric | 0.55 | A is invertible with det(A)=−5. Find det(A⁻¹) and det(Aᵀ). `[verified: −1/5 and −5]` | det(A⁻¹)=1/det(A)=−1/5; det(Aᵀ)=det(A)=−5 | — |
| A5 | apply | numeric | 0.65 | A 3×3 matrix has one row scaled by 4 (only that row); its determinant goes from 5 to what value? `[verified: 20]` | scaling a single row by a scalar c scales det by c (not cⁿ, which only applies when every row is scaled): 4·5=20 | confuses single-row scaling with the whole-matrix cⁿ rule → `determinant-properties` |
| A6 | apply | short-answer | 0.75 | det(A)=0 for a 3×3 matrix A. What must det(A²) and det(A¹⁰⁰) equal? | det(Aᵏ)=det(A)ᵏ=0ᵏ=0 for any positive power k, so both det(A²) and det(A¹⁰⁰) are 0 | — |
| A7 | apply | numeric | 0.85 | A and B are 2×2 with det(A)=3, det(B)=5. Find det(A²B⁻¹). `[verified: 9/5]` | det(A²B⁻¹)=det(A)²·det(B)⁻¹=9·(1/5)=9/5 | — |
| E2 | explain | short-answer | 1.00 | Explain why det(Aᵀ)=det(A) even though transposing swaps rows and columns. | cofactor expansion along a row of A gives the same sum of terms as cofactor expansion along the corresponding column of Aᵀ, because transposing just relabels which index is "row" and which is "column" without changing which products of entries appear or their signs *(required: names the row/column symmetry of the expansion, not just "it's a known identity")* | — |
| E3 | explain | short-answer | 1.10 | Explain why the product rule det(AB)=det(A)det(B) implies det(A)≠0 for every invertible matrix A. | if A is invertible, A·A⁻¹=I, so det(A)det(A⁻¹)=det(I)=1; if det(A) were 0, the left side would be 0, which can never equal 1, so det(A) must be nonzero *(required: the explicit contradiction argument)* | — |
| E4 | explain | short-answer | 1.20 | Why does scaling a single row of an n×n matrix by c scale the whole determinant by c, while scaling the entire matrix by c scales the determinant by cⁿ? | the determinant is linear in each row separately (holding the others fixed), so scaling just one row scales the whole (multilinear) expression by that one factor c; scaling every row by c applies that same factor n separate times, once per row, multiplying to cⁿ *(required: the multilinearity-in-each-row argument)* | — |
| E5 | explain | short-answer | 1.30 | Explain why det(AB)=det(BA) even when AB≠BA as matrices. | det(AB) and det(BA) are both just det(A)·det(B), a product of two scalars, and scalar multiplication commutes regardless of whether the underlying matrix multiplication does; the matrices AB and BA can genuinely differ as matrices while still sharing the same determinant *(required: distinguishes matrix equality from scalar-determinant equality)* | order of matrix multiplication assumed to matter for the determinant the same way it matters for the matrix product itself → `determinant-properties` |
| T2 | transfer | short-answer | 1.65 | A linear transformation is the composition of a rotation (det=1), a reflection (det=−1), and a scaling by 3 in each of 3 dimensions (det=3³=27). Find the determinant of the composed transformation and state what it means about orientation and volume. | multiply: det=1·(−1)·27=−27; the negative sign means orientation is flipped overall, and the magnitude 27 means volumes are scaled up by a factor of 27 | — |
| T3 | transfer | short-answer | 1.95 | In a change-of-variables from Cartesian to spherical coordinates, the Jacobian determinant is r²sin(φ). Using det(cA)=cⁿdet(A) intuition, explain why this factor depends on position (r,φ) rather than being a single global constant like it would be for a linear map. | the coordinate transformation is nonlinear, so its local scaling factor varies from point to point rather than being fixed as it would for a genuinely linear map cA; det(cA)=cⁿdet(A) only applies to a *uniform* global scaling, whereas the spherical map stretches space differently depending on how far out (r) and how tilted (φ) you are *(required: explains why nonlinearity breaks the constant-scaling picture)* | — |
| T4 | transfer | short-answer | 2.30 | Two economists model a country's economy with transformation matrices A (year 1 policy) and B (year 2 policy) applied in sequence as BA. A colleague claims "since det(AB)=det(BA), it doesn't matter which policy is applied first." Is the colleague right or wrong, and why? | the colleague is wrong about what matters — det(AB)=det(BA) only says the two orderings produce the *same overall volume-scaling factor*; it says nothing about whether the resulting transformations act identically on any individual vector, and in general AB≠BA as matrices, so the order of applying the actual policies changes the outcome even though the aggregate "scaling" statistic happens to coincide *(required: distinguishes the scalar coincidence from genuine matrix non-commutativity)* | equates equal determinants with equal matrices/transformations → `determinant-properties` |

*Coverage: 20 items, −0.60…2.30.*

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
| R3 | recall | short-answer | 0.25 | State the relationship between the eigenvalues of A and det(A), and between the eigenvalues of A and trace(A). | det(A) equals the product of all eigenvalues (with multiplicity); trace(A) equals the sum of all eigenvalues (with multiplicity) | — |
| R4 | recall | mcq | 0.40 | The eigenvalues of a triangular matrix are: | exactly its diagonal entries | computes eigenvalues via a full characteristic-polynomial expansion, missing that triangular structure makes them immediately readable → `eigenvalues-eigenvectors` |
| A3 | apply | numeric | 0.80 | Find the eigenvalues of A=[[5,0,0],[0,−1,0],[0,0,3]]. `[verified: 5,−1,3]` | diagonal matrix, so the eigenvalues are exactly the diagonal entries: 5, −1, 3 | — |
| A4 | apply | numeric | 0.90 | Find the eigenvalues of A=[[1,2],[2,1]] by solving det(A−λI)=0. `[verified: λ=3,−1]` | (1−λ)²−4=0 ⟹ λ²−2λ−3=0 ⟹ (λ−3)(λ+1)=0 ⟹ λ=3 or λ=−1 | — |
| A5 | apply | numeric | 1.00 | A=[[1,2],[2,1]] has eigenvalues 3 and −1 (from A4). Find the eigenvector for λ=3. `[verified: (1,1)]` | (A−3I)v=0 ⟹ [[−2,2],[2,−2]]v=0 ⟹ v=(1,1) (or any scalar multiple) | — |
| A6 | apply | numeric | 1.10 | Use trace and determinant shortcuts to find the eigenvalues of A=[[6,2],[2,3]] without expanding the full characteristic polynomial. `[verified: 7,2]` | trace=9=λ₁+λ₂, det=18−4=14=λ₁λ₂; solving λ²−9λ+14=0 gives λ=7,2, matching both sum and product checks | — |
| A7 | apply | numeric | 1.20 | A is 3×3 with characteristic polynomial λ³−6λ²+11λ−6. Factor it to find all eigenvalues. `[verified: 1,2,3]` | factors as (λ−1)(λ−2)(λ−3), so the eigenvalues are 1, 2, 3 (check: sum=6=trace, product=6=det) | — |
| E2 | explain | short-answer | 1.40 | Explain why an eigenvalue of 0 means the matrix is singular, using the definition Av=λv directly. | if λ=0, the eigenvalue equation reads Av=0 for some nonzero vector v, which says v is in the null space of A; a nonzero null space means A is not injective and therefore not invertible, i.e. singular *(required: the direct Av=0 with v≠0 argument)* | — |
| E3 | explain | short-answer | 1.50 | Explain why complex eigenvalues of a real matrix must always come in conjugate pairs. | the characteristic polynomial det(A−λI) has entirely real coefficients (since A is real), and for any polynomial with real coefficients, complex roots occur in conjugate pairs by the conjugate root theorem *(required: ties to the real-coefficient property of the characteristic polynomial)* | — |
| E4 | explain | short-answer | 1.60 | Explain why the number of distinct eigenvalues of an n×n matrix can be less than n, but never more than n. | eigenvalues are roots of the characteristic polynomial, which has degree exactly n, so by the fundamental theorem of algebra it has at most n distinct roots (n counting multiplicity); some roots may repeat, giving fewer than n distinct values, but a degree-n polynomial can never have more than n roots *(required: ties to the degree of the characteristic polynomial)* | — |
| E5 | explain | short-answer | 1.70 | Why does an eigenvector remaining "on the same line" under A directly imply that the entire line spanned by v is mapped to itself? | A(cv)=c(Av)=c(λv)=λ(cv) for any scalar c, by linearity of A; so every point on the line through v — not just v itself — is scaled by λ and stays on that same line, meaning the whole 1-dimensional subspace is invariant under A *(required: the explicit linearity argument extending from v to the whole line)* | — |
| T2 | transfer | short-answer | 2.00 | In PCA, the covariance matrix's largest eigenvalue is 8 with eigenvector (1,0); the smallest eigenvalue is 2 with eigenvector (0,1). If you must summarize the data's spread in one number, why does the largest eigenvalue (not the trace or determinant) tell you the "most informative direction"? | each eigenvalue is the variance of the data specifically along its own eigenvector direction; the largest eigenvalue identifies the single direction along which the data spreads out the most, which is exactly what captures the most information when projecting to fewer dimensions — the trace only gives the total variance summed over all directions, losing which direction that variance lives in *(required: distinguishes direction-specific variance from the aggregate trace)* | — |
| T3 | transfer | short-answer | 2.25 | A PageRank-style transition matrix has largest eigenvalue 1 (the stationary distribution) and second-largest eigenvalue 0.85. Explain why a value of 0.85 close to 1 means the random walk mixes (converges to the stationary distribution) slowly. | after k steps, the deviation from the stationary distribution decays like (second eigenvalue)ᵏ; since 0.85ᵏ shrinks to zero much more slowly than a smaller eigenvalue would (e.g. 0.1ᵏ), a second eigenvalue close to 1 means many steps are needed before the distribution is close to stationary *(required: the (second eigenvalue)^k decay-rate argument)* | — |
| T4 | transfer | short-answer | 2.55 | In a system of differential equations ẋ=Ax modeling a spring-mass system, A has eigenvalues −2±3i. Explain what the real part (−2) and imaginary part (3) each tell you about the physical behavior, without solving the system explicitly. | the real part (−2, negative) governs exponential decay of the amplitude over time — since it's negative, oscillations die out (stable); the imaginary part (3) sets the angular frequency of the oscillation itself — the system oscillates while decaying, like a damped spring rather than a pure exponential or a pure undamped oscillator *(required: separately interprets real part as decay/growth and imaginary part as oscillation frequency)* | — |

*Coverage: 20 items, −0.22…2.55.*

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
