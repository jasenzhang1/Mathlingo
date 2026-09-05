# Linear Algebra Cluster 3 — Vector Spaces & Bases

Linear Dependence, Vector Spaces, Span, Basis, Change of Basis, Subspace Operations (6 concepts).
Same format as [Cluster 1](la-01-vectors-and-operations.md).

---

## Linear Dependence (`linear-dependence`)
*Prereq: Vector Operations · ancestors 2 · b₀ = 0.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.95 | Define linear dependence. | a set of vectors is linearly dependent if some *nontrivial* combination of them sums to the zero vector | — |
| R2 | recall | mcq | −0.7 | If a set includes the zero vector, the set is: | automatically linearly dependent | claims it's "automatically independent" — misses that 0·(everything else)+1·(zero vector)=0 is already a nontrivial combination → `linear-dependence` |
| A1 | apply | short-answer | −0.15 | Are (1,2) and (2,4) linearly dependent? `[verified]` | yes — (2,4)=2(1,2) | — |
| E1 | explain | short-answer | 0.55 | Why are any 4 vectors in R³ automatically linearly dependent? | a linearly independent set in Rⁿ can have at most n vectors (each new independent direction uses up one of only n available dimensions); 4 vectors in a 3-dimensional space necessarily exceeds that cap *(required: the "cannot exceed the dimension" argument)* | — |
| T1 | transfer | short-answer | 1.05 | A regression has more predictors than data points (p>n), making the design matrix's columns necessarily dependent. What's the practical consequence for fitting a unique coefficient vector? | the system is underdetermined — infinitely many coefficient combinations fit the data identically well, so there is no unique solution without additional constraints (exactly the gap regularization methods like ridge/lasso are built to close) *(required: names the non-uniqueness, not just "it's a problem")* | — |

*Coverage: 5 items, −0.95…1.05.*

---

## Vector Spaces (`vector-spaces`)
*Prereq: Vector Operations · ancestors 2 · b₀ = 0.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.95 | List the key closure properties a vector space must satisfy. | closed under addition; closed under scalar multiplication; contains a zero vector | — |
| R2 | recall | mcq | −0.7 | Which of these *is* a vector space? (a) all of R² with positive first coordinate (b) all of R² (c) all of R² with first coordinate exactly 1 | (b) | picks (a) — fails closure under multiplication by a negative scalar → `vector-spaces` |
| A1 | apply | short-answer | −0.15 | Is the set of 2×2 matrices with trace=0 a vector space? `[verified: trace linearity confirms closure]` | yes — trace(A+B)=trace(A)+trace(B)=0, trace(cA)=c·trace(A)=0, and the zero matrix has trace 0 *(required: all three checks)* | — |
| E1 | explain | short-answer | 0.55 | Why do polynomials of degree ≤n form a vector space? | adding two such polynomials, or scaling one, produces another polynomial of degree ≤n, and the zero polynomial is included — the same closure properties as arrow-vectors, just for a different kind of object *(required: connects to the general closure definition, broadening what "vector" can mean)* | — |
| T1 | transfer | short-answer | 1.05 | Why do the solutions to a homogeneous linear ODE like f″+f=0 form a vector space? Connect to superposition. | if f and g both solve the equation, so does af+bg for any constants a,b (superposition) — this is exactly vector-space closure under addition and scalar multiplication, applied to functions rather than arrows *(required: names superposition as the closure property in disguise)* | — |

*Coverage: 5 items, −0.95…1.05.*

---

## Span (`span`)
*Prereq: Vector Spaces, Linear Dependence · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Define the span of a set of vectors. | the set of all linear combinations of those vectors | — |
| R2 | recall | mcq | −0.45 | The span of a single nonzero vector v in R² is: | a line through the origin | picks "all of R²" — one vector can't span a 2D space → `span` |
| A1 | apply | short-answer | 0.1 | What is the span of (1,0) and (0,1) in R²? What about (1,1) and (2,2)? | first pair: all of R²; second pair: only a line (since they're dependent — (2,2)=2(1,1)) | claims both pairs span all of R², missing that dependence collapses the second pair's span to a line → `span` |
| E1 | explain | short-answer | 0.8 | Why doesn't adding a vector already in the span of a set change the span? | any vector in the existing span is, by definition, already some linear combination of the original vectors — including it as an "extra" vector adds no combination that wasn't already achievable *(required)* | — |
| T1 | transfer | short-answer | 1.3 | An engineered feature is a linear combination of existing features. Why does adding it to a linear model add no new representational power, despite "more features" sounding like more expressiveness? | the new feature already lies in the span of the existing features, so every prediction the model could make with it included, it could already make without it — span exactly captures "what new directions are reachable," and a combination of existing directions reaches nothing new *(required)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Basis (`basis`)
*Prereq: Span · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | Define a basis. | a linearly independent set that spans the whole space | — |
| R2 | recall | mcq | −0.35 | Every basis for a given vector space has: | a unique number of vectors — the space's dimension | assumes different bases can have different sizes, missing the well-definedness of dimension → `basis` |
| A1 | apply | short-answer | 0.2 | Is {(1,0),(1,1)} a basis for R²? Is {(1,0),(2,0),(0,1)}? `[verified]` | first: yes — 2 independent vectors spanning a 2D space; second: no — (1,0) and (2,0) are dependent, disqualifying the set even though it does span | accepts the second set as a basis because it spans R², without checking independence → `basis` |
| E1 | explain | short-answer | 0.9 | Why must a basis be *both* independent and spanning? What fails if only one holds? | a spanning set that isn't independent gives non-unique coordinate representations (redundancy); an independent set that doesn't span can't represent every vector in the space at all — both failures make "basis" the wrong word *(required: both failure modes named)* | — |
| T1 | transfer | short-answer | 1.4 | Why can choosing a different basis (e.g. eigenvectors instead of the standard basis) make certain computations, like matrix powers, dramatically simpler — even though the space itself hasn't changed? | the space and the transformation are unchanged, but expressed in a basis aligned with the transformation's own structure, the coordinates of the computation can become trivial (e.g. a diagonal matrix in an eigenbasis) — a preview of `diagonalization` | — |

*Coverage: 5 items, −0.6…1.4.*

---

## Change of Basis (`change-of-basis`)
*Prereq: Basis, Linear Transformations · ancestors 9 · b₀ = 0.65*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.35 | Describe, conceptually, what a change-of-basis matrix does. | converts a vector's coordinate representation in one basis into its representation in another — the vector itself doesn't change, only its coordinates | — |
| R2 | recall | mcq | −0.1 | If P converts B-coordinates to standard coordinates, converting standard coordinates back to B-coordinates uses: | P⁻¹ | uses P again in the reverse direction → `change-of-basis` |
| A1 | apply | numeric | 0.4 | b₁=(1,1), b₂=(1,−1) form a basis for R². A vector v has B-coordinates (2,3) — i.e. v=2b₁+3b₂. Find v in standard coordinates. `[verified: (5,-1)]` | v=2(1,1)+3(1,−1)=(5,−1) | — |
| E1 | explain | short-answer | 1.1 | Why does the same vector have different coordinates in different bases, while still being "the same vector" geometrically? | the coordinates are just labels expressing the vector as a combination of a chosen basis's directions; changing basis relabels those coordinates without moving the vector itself — a change-of-basis matrix is a relabeling, not a transformation of the vector *(required: the relabeling framing explicitly)* | — |
| T1 | transfer | short-answer | 1.65 | PCA re-expresses data in a new basis (the principal components). Why does this change of basis alone, before dropping any components, lose no information? | a change of basis is invertible — it's a relabeling, not a projection or deletion — so the full original data can always be recovered from its new coordinates; information is only lost once components are actually *dropped*, a separate step *(required: the invertibility argument)* | — |

*Coverage: 5 items, −0.35…1.65.*

---

## Subspace Operations (`subspace-operations`)
*Prereq: Span · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | Define the sum U+W and the intersection U∩W of two subspaces. | U+W = {u+w : u∈U, w∈W}; U∩W = vectors in both U and W | — |
| R2 | recall | mcq | −0.35 | The intersection of two subspaces is: | always itself a subspace | assumes it's "only a subspace if U, W share the same dimension" → `subspace-operations` |
| A1 | apply | short-answer | 0.2 | Let U be the x-axis and W the y-axis in R². Is U∪W a subspace? `[verified: (1,0)+(0,1)=(1,1) is in neither]` | no — (1,0)+(0,1)=(1,1) lies in neither axis, so U∪W fails closure under addition; a *union* of subspaces is generally not itself a subspace, unlike the sum U+W | assumes any union of subspaces is automatically a subspace, confusing it with the sum → `subspace-operations` |
| E1 | explain | derivation | 0.9 | Prove U∩W is always a subspace, given that U and W each are. | if x,y∈U∩W, then x,y∈U (so x+y∈U by U's closure) and x,y∈W (so x+y∈W by W's closure), hence x+y∈U∩W; the same argument handles scalar multiples, and 0 lies in both since both are subspaces *(required: closure under both operations, and the zero vector)* | — |
| T1 | transfer | short-answer | 1.4 | The null space and row space of a matrix turn out to be *orthogonal complements* of each other. Why is that a much stronger relationship than merely having a trivial (zero-only) intersection? | orthogonal complements not only intersect trivially but together *span the entire ambient space*, and every vector decomposes uniquely into a piece from each — a trivial intersection alone guarantees neither the spanning property nor the orthogonality, both of which the fundamental subspaces relationship provides *(required: names both missing properties — spanning the whole space, and orthogonality itself)* | treats "trivial intersection" and "orthogonal complement" as equivalent statements → `subspace-operations` |

*Coverage: 5 items, −0.6…1.4.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| zero vector assumed to preserve independence | `linear-dependence` |
| vector-space closure checked incompletely (e.g. scalar sign ignored) | `vector-spaces` |
| dependent vectors assumed to still span the full space | `span` |
| spanning confused with a sufficient condition for "basis" | `basis` |
| change-of-basis direction (P vs P⁻¹) reversed | `change-of-basis` |
| union of subspaces assumed to be a subspace | `subspace-operations` |

**Cluster total: 30 items across 6 concepts.** All numeric claims verified. `basis`'s T1 and
`change-of-basis`'s T1 both foreshadow `diagonalization` and PCA respectively, well before either
concept is formally reached.
