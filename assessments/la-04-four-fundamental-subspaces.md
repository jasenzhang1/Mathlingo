# Linear Algebra Cluster 4 — The Four Fundamental Subspaces

Four Fundamental Subspaces, Column Space, Null Space, Row Space, Left Null Space, Matmul on the Four
Fundamental Subspaces, Disjointness of the Four Fundamental Subspaces (7 concepts). Same format as
[Cluster 1](la-01-vectors-and-operations.md).

This whole cluster is one unified picture, deliberately reused across every item: A=[[1,1],[2,2]] has
row space span{(1,1)} and null space span{(1,−1)}, which turn out to be orthogonal — the concrete
instance every later item in the cluster verifies or extends.

---

## Four Fundamental Subspaces (`four-fundamental-subspaces`)
*Prereq: Linear Transformations, Vector Spaces · ancestors 6 · b₀ = 0.47*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.53 | Name the four fundamental subspaces of an m×n matrix A. | column space C(A); null space N(A); row space C(Aᵀ); left null space N(Aᵀ) | — |
| R2 | recall | mcq | −0.28 | Which pair lives in Rⁿ (the "input" space)? | row space and null space | picks column space and left null space, the *output*-side pair → `four-fundamental-subspaces` |
| A1 | apply | short-answer | 0.27 | For a 3×2 matrix A, which spaces live in R³ and which in R²? | R³: column space, left null space; R²: row space, null space | — |
| E1 | explain | short-answer | 0.97 | Why do these four subspaces come in two natural pairs? | A maps Rⁿ→Rᵐ, so the "domain-side" subspaces (row space, null space) naturally live in Rⁿ, and the "codomain-side" subspaces (column space, left null space) live in Rᵐ *(required)* | — |
| T1 | transfer | short-answer | 1.47 | Why is understanding all four subspaces, not just the column space, necessary to fully understand what Ax=b can and cannot do? | column space determines which b are reachable at all; null space determines whether a reachable b has a *unique* solution or infinitely many — together they answer both "can I solve it" and "how many ways" *(required: both questions named)* | — |

*Coverage: 5 items, −0.53…1.47.*

---

## Column Space (`column-space`)
*Prereq: Four Fundamental Subspaces · ancestors 7 · b₀ = 0.54*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.46 | Define C(A). | the span of A's columns — equivalently, the set of all possible outputs Ax as x ranges over every input | — |
| R2 | recall | mcq | −0.21 | C(A) equals: | the set of all possible outputs Ax | claims C(A) is "always all of Rᵐ" — only true when A's columns span the full output space, not in general → `column-space` |
| A1 | apply | short-answer | 0.34 | A=[[1,0],[0,1],[1,1]] (3×2). Describe C(A). | a 2D plane in R³, spanned by the two (independent) columns | — |
| E1 | explain | short-answer | 1.04 | Why does Ax=b have a solution if and only if b∈C(A)? | this is essentially the definition of C(A) restated: b is reachable as some Ax exactly when b is a linear combination of A's columns, which is exactly what "b∈C(A)" means *(required)* | — |
| T1 | transfer | short-answer | 1.54 | In y=Xβ+ε, fitted values Xβ̂ must lie in C(X). Why can residuals (y−Xβ̂) never be zero unless y itself already lies in C(X)? | Xβ̂ is confined to C(X) no matter what β̂ is chosen; if y is outside C(X), no choice of β̂ can make Xβ̂ equal y exactly, so some nonzero residual is unavoidable — connecting column space directly to when a perfect regression fit is even possible *(required)* | — |

*Coverage: 5 items, −0.46…1.54.*

---

## Null Space (`null-space`)
*Prereq: Four Fundamental Subspaces · ancestors 7 · b₀ = 0.54*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.46 | Define N(A). | all x such that Ax=0 | — |
| R2 | recall | mcq | −0.21 | N(A) always contains: | at least the zero vector, possibly more | claims N(A) can be "empty sometimes" — impossible, since A·0=0 always → `null-space` |
| A1 | apply | short-answer | 0.34 | A=[[1,1],[2,2]]. Find N(A). `[verified: (1,-1) works]` | rows are dependent, giving one equation x₁+x₂=0; N(A)=span{(1,−1)} | — |
| E1 | explain | short-answer | 1.04 | Why is N(A)={0} exactly when A's columns are linearly independent? | Ax=0 means some combination of A's columns (weighted by x's entries) sums to zero; if the columns are independent, the *only* combination summing to zero is the trivial one (x=0); if dependent, a nontrivial combination exists, giving a nonzero x in N(A) *(required: connects to `linear-dependence` directly)* | — |
| T1 | transfer | short-answer | 1.54 | If Ax=b has a solution xₚ, why must it have either exactly one solution or infinitely many — never exactly two or three? | the full solution set is xₚ+N(A); N(A) is a subspace, so it's either just {0} (giving the one solution xₚ) or an infinite set (since any nonzero subspace is infinite, containing every scalar multiple of its elements) — there's no subspace with exactly 2 or 3 elements *(required)* | — |

*Coverage: 5 items, −0.46…1.54.*

---

## Row Space (`row-space`)
*Prereq: Four Fundamental Subspaces · ancestors 7 · b₀ = 0.54*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.46 | Define the row space of A. | the span of A's rows, equivalently C(Aᵀ) | — |
| R2 | recall | mcq | −0.21 | Row space and column space of the same A generally: | have the *same dimension* (rank), even though they may live in different spaces | assumes their dimensions are unrelated in general, missing the deep row-rank=column-rank fact → `row-space` |
| A1 | apply | short-answer | 0.34 | A=[[1,2],[2,4],[3,6]] (3×2). Describe the row space. | span{(1,2)} — every row is a multiple of (1,2) | — |
| E1 | explain | short-answer | 1.04 | Why is it at all surprising that row rank equals column rank, given that rows and columns of a non-square matrix live in *completely different* spaces (Rⁿ vs Rᵐ)? | there's no a priori reason two quantities computed in unrelated ambient spaces should coincide numerically — the fact that they always do is one of the deepest, most useful results in elementary linear algebra, not an obvious bookkeeping coincidence *(required: names the surprise explicitly, not just restates the fact)* | — |
| T1 | transfer | short-answer | 1.54 | Row operations (Gaussian elimination) preserve the row space exactly, but generally change the column space. Why does this make row-reduction valid for finding a row-space basis but not a column-space basis directly? | each row operation replaces a row with a linear combination of rows, keeping the span of the rows unchanged; but replacing rows can create entirely different linear combinations among the columns, so the columns of a reduced matrix generally span a *different* space than A's original columns did *(required: the mechanism, not just "it works differently")* | — |

*Coverage: 5 items, −0.46…1.54.*

---

## Left Null Space (`left-null-space`)
*Prereq: Four Fundamental Subspaces · ancestors 7 · b₀ = 0.54*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.46 | Define the left null space of A. | all y such that yᵀA=0, equivalently N(Aᵀ) | — |
| R2 | recall | mcq | −0.21 | The left null space consists of vectors y such that: | y is orthogonal to every column of A | picks "y is a multiple of a column of A" — unrelated to the actual defining condition → `left-null-space` |
| A1 | apply | short-answer | 0.34 | A=[[1,2],[2,4]] (columns dependent). Find the left null space. `[verified: (-2,1) works]` | y₁+2y₂=0 and 2y₁+4y₂=0 are the same equation; left null space = span{(−2,1)} | — |
| E1 | explain | short-answer | 1.04 | How does the left null space of A relate to the ordinary null space of Aᵀ? | they're the *same object*, viewed two ways — "left null space of A" and "null space of Aᵀ" are two names for one subspace, since yᵀA=0 is exactly Aᵀy=0 transposed *(required: the notational unification stated explicitly)* | — |
| T1 | transfer | short-answer | 1.54 | Why does understanding what's orthogonal to every column of a design matrix X matter for understanding regression residuals? | the left null space of X characterizes directions no linear combination of X's columns can reach; regression residuals are exactly the part of y that lands outside C(X), so their structure is tied to this orthogonal complement *(required: connects the left null space to the residual space conceptually)* | — |

*Coverage: 5 items, −0.46…1.54.*

---

## Matmul on the Four Fundamental Subspaces (`matmul-four-fundamental-subspaces`)
*Prereq: Column Space, Null Space, Row Space, Left Null Space · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | For x in the null space, what is Ax? For x in the row space, what is Ax? | Ax=0 for x∈N(A); Ax is generally nonzero and lands in C(A) for x in the row space | — |
| R2 | recall | mcq | 0.04 | Every x∈Rⁿ decomposes uniquely as x=x_row+x_null. Then Ax equals: | A(x_row) — the null-space part contributes nothing | claims Ax is "always just 0," overgeneralizing the null-space behavior to the whole decomposition → `matmul-four-fundamental-subspaces` |
| A1 | apply | short-answer | 0.54 | Explain, without fully computing it, why A maps the row space *invertibly* onto the column space, even when A itself (on all of Rⁿ) is not invertible. | restricted to the row space, A has no nonzero vectors sent to 0 (those live in the null space, which the row space doesn't overlap except at 0), so distinct row-space vectors map to distinct column-space vectors — an invertible correspondence between the two, even though A is singular overall *(required: the no-overlap-except-zero argument)* | — |
| E1 | explain | short-answer | 1.24 | In what precise sense does this reveal an "invertible core" hiding inside a non-invertible matrix? | A's full failure of invertibility comes entirely from the null space collapsing those directions to 0; on the complementary row-space directions, A behaves like a genuine, invertible correspondence onto C(A) — a preview of exactly what SVD makes fully explicit *(required: names the null space as the sole source of non-invertibility)* | — |
| T1 | transfer | short-answer | 1.74 | Why does choosing a basis for Rⁿ built from a row-space basis plus a null-space basis give an especially clean picture of what A does to every vector? | in such a basis, A's action splits cleanly: the null-space basis vectors are annihilated entirely, and the row-space basis vectors map invertibly onto a basis of C(A) — every vector's image is determined by discarding its null-space component and invertibly transforming the rest *(required: describes both halves of the split)* | — |

*Coverage: 5 items, −0.26…1.74.*

---

## Disjointness of the Four Fundamental Subspaces (`disjointness-four-fundamental-subspaces`)
*Prereq: Matmul on the Four Fundamental Subspaces · ancestors 12 · b₀ = 0.78*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.22 | State the two orthogonality relationships among the four subspaces. | row space ⊥ null space (in Rⁿ); column space ⊥ left null space (in Rᵐ) | — |
| R2 | recall | mcq | 0.08 | Row space and null space together span: | all of Rⁿ | says "it depends on the matrix" — missing that they are full orthogonal *complements*, which always together span the whole space → `disjointness-four-fundamental-subspaces` |
| A1 | apply | numeric | 0.58 | For A=[[1,1],[2,2]] (row space span{(1,1)}, null space span{(1,−1)}), verify orthogonality directly. `[verified: dot=0]` | (1,1)·(1,−1)=1−1=0 ✓ | — |
| E1 | explain | derivation | 1.28 | Prove row space ⊥ null space directly from the definitions. | for any x∈N(A), Ax=0 means *every row* of A dotted with x gives 0 — so x is orthogonal to every row, hence orthogonal to their entire span (the row space) *(required: the "orthogonal to every row, hence the span" step)* | — |
| T1 | transfer | short-answer | 1.78 | Connect back to `subspace-operations`'s T1: why does "orthogonal complement" here mean more than "these subspaces only share the zero vector"? | many unrelated subspace pairs intersect only at zero without being orthogonal complements at all; orthogonal complements additionally require every vector in one to be perpendicular to every vector in the other, *and* together span the whole ambient space — row space and null space satisfy both, not merely a trivial intersection *(required: both extra conditions named)* | treats "trivial intersection" as sufficient to conclude orthogonal complement status → `disjointness-four-fundamental-subspaces` |

*Coverage: 5 items, −0.22…1.78.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| input/output-space pairing of the four subspaces reversed | `four-fundamental-subspaces` |
| C(A) assumed to always equal the full output space | `column-space` |
| N(A) assumed possibly empty | `null-space` |
| row rank / column rank assumed independent | `row-space` |
| left null space's defining condition confused with column membership | `left-null-space` |
| A's action on x=x_row+x_null over-generalized to "always 0" | `matmul-four-fundamental-subspaces` |
| trivial intersection conflated with full orthogonal complement | `disjointness-four-fundamental-subspaces` |

**Cluster total: 35 items across 7 concepts.** All numeric claims verified against the single running
example A=[[1,1],[2,2]], reused from `null-space` through `disjointness-four-fundamental-subspaces` so
the same concrete matrix accumulates meaning across the whole cluster.
