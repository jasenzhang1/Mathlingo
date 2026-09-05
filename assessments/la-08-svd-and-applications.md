# Linear Algebra Cluster 8 — SVD & Applications

Singular Value Decomposition, Uniqueness of SVD, SVD and the Four Fundamental Subspaces,
Moore-Penrose Inverse, Eckart-Young Theorem, Principal Component Analysis (Matrix Edition) (6 concepts).
Same format as [Cluster 1](la-01-vectors-and-operations.md). This is the final linear-algebra cluster
— `pca-matrix-edition`'s E1 is deliberately the capstone item of the entire 54-concept domain, tying
together Rayleigh quotients, the Spectral Theorem, and Eckart-Young into one coherent method.

---

## Singular Value Decomposition (`svd`)
*Prereq: Positive Definite Matrices, Eigendecomposition · ancestors 17 · b₀ = 0.95*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.05 | State the SVD, and the one thing that distinguishes it from eigendecomposition. | A=UΣVᵀ for *any* m×n matrix A (U, V orthogonal, Σ diagonal with nonnegative singular values) — it exists for every matrix, even rectangular or singular ones, unlike eigendecomposition | — |
| R2 | recall | mcq | 0.25 | The singular values relate to the eigenvalues of AᵀA by: | singular values are the *square roots* of AᵀA's eigenvalues | claims "they ARE the eigenvalues of AᵀA" directly, skipping the square root → `svd` |
| A1 | apply | numeric | 0.75 | AᵀA has eigenvalues 9 and 4. Find A's singular values. `[verified: 3, 2]` | √9=3, √4=2 | — |
| E1 | explain | short-answer | 1.45 | Why does SVD exist for every matrix, while eigendecomposition can fail (per `eigendecomposition`'s rotation counterexample)? | AᵀA is *always* symmetric and positive semi-definite, regardless of what A itself looks like, guaranteeing real, nonnegative eigenvalues via the Spectral Theorem — real square roots of those eigenvalues always exist, so singular values always exist even when A's own eigenvalues might not be real *(required: the AᵀA-is-always-symmetric-PSD argument)* | — |
| T1 | transfer | short-answer | 1.95 | Why is SVD considered the most universal matrix decomposition in applied linear algebra and data science? | real data matrices are almost always rectangular (more samples than features or vice versa) and SVD requires no squareness at all, unlike eigendecomposition which additionally can fail even on square matrices *(required: both the rectangularity and the eigendecomposition-can-fail points)* | — |

*Coverage: 5 items, −0.05…1.95.*

---

## Uniqueness of SVD (`uniqueness-of-svd`)
*Prereq: Singular Value Decomposition · ancestors 18 · b₀ = 0.97*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.03 | In what sense is SVD unique, and in what sense isn't it? | the singular *values* are always unique (given a fixed ordering convention); the singular *vectors* are not always unique, especially when singular values repeat | — |
| R2 | recall | mcq | 0.27 | If two singular values are equal, the corresponding singular vectors are: | not pinned down to one pair — any orthonormal basis of the shared subspace works equally well | claims they're "still uniquely determined" even with a repeat → `uniqueness-of-svd` |
| A1 | apply | short-answer | 0.77 | Singular values 5, 5, 2 (a repeat). Why aren't the vectors for the two 5's pinned down to one specific pair? | any orthonormal basis of their shared 2-dimensional subspace is an equally valid choice of singular vectors — exactly parallel to eigenvectors being non-unique for a repeated eigenvalue *(required: the shared-subspace argument)* | — |
| E1 | explain | short-answer | 1.47 | Why is the *sign* of singular vectors ambiguous even for distinct singular values? | if (u,v) is a valid singular-vector pair, so is (−u,−v) — the product uvᵀ (and hence its contribution to A) is unchanged by flipping both signs together *(required)* | — |
| T1 | transfer | short-answer | 1.97 | Why can PCA results from different software or random seeds show "flipped" principal component signs, even when the decomposition is mathematically identical? | the sign ambiguity from E1 means either sign choice is an equally valid singular/eigenvector — a flip between two runs indicates no real disagreement, just an arbitrary choice made differently *(required: connects directly to E1's sign-flip fact)* | treats a sign flip between two PCA runs as evidence of a computational error or genuine disagreement → `uniqueness-of-svd` |

*Coverage: 5 items, −0.03…1.97.*

---

## SVD and the Four Fundamental Subspaces (`svd-four-fundamental-subspaces`)
*Prereq: Singular Value Decomposition · ancestors 18 · b₀ = 0.97*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.03 | How does SVD reveal the column space and left null space via U? | the first r columns of U (r=rank(A)) form an orthonormal basis for C(A); the last m−r columns form a basis for the left null space | — |
| R2 | recall | mcq | 0.27 | The number of nonzero singular values equals: | the rank of A | picks "always min(m,n)" — only true when A is full rank; in general it's the rank, which can be smaller → `svd-four-fundamental-subspaces` |
| A1 | apply | short-answer | 0.77 | A is 5×3 with singular values 4, 2, 0. Find rank(A), and how many columns of V span the null space. `[verified: rank=2, 1 null-space column]` | rank=2 (two nonzero singular values); n−r=3−2=1 column of V spans the null space | — |
| E1 | explain | short-answer | 1.47 | Why does SVD give such a clean, unified picture of all four fundamental subspaces at once, compared to computing each separately via row reduction? | U's and V's columns split automatically by whether their corresponding singular value is zero or nonzero — one decomposition simultaneously produces orthonormal bases for all four subspaces, rather than requiring four separate computations *(required)* | — |
| T1 | transfer | short-answer | 1.97 | How does this concept complete `disjointness-four-fundamental-subspaces`'s abstract "orthogonal complements" statement with something concrete? | rather than merely asserting row space ⊥ null space abstractly, SVD hands you the actual orthonormal basis vectors for each (the relevant columns of U and V), making the orthogonal-complement relationship explicit and computable *(required: names the shift from abstract to concrete/computable)* | — |

*Coverage: 5 items, −0.03…1.97.*

---

## Moore-Penrose Inverse (`moore-penrose-inverse`)
*Prereq: Singular Value Decomposition · ancestors 18 · b₀ = 0.97*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.03 | Define the pseudo-inverse A⁺ via SVD. | if A=UΣVᵀ, then A⁺=VΣ⁺Uᵀ, where Σ⁺ inverts each nonzero singular value and leaves zeros as zero | — |
| R2 | recall | mcq | 0.27 | The pseudo-inverse is needed specifically because: | some matrices have no ordinary inverse (non-square, or singular) | claims it's "always faster to compute than the ordinary inverse" — a different, unrelated property → `moore-penrose-inverse` |
| A1 | apply | short-answer | 0.77 | For an invertible square matrix A, what does A⁺ reduce to? | the ordinary inverse A⁻¹ — the pseudo-inverse generalizes but agrees with the regular inverse whenever it exists | — |
| E1 | explain | short-answer | 1.47 | State the key application of the pseudo-inverse to least squares. | solving min‖Ax−b‖² even when A isn't invertible (e.g. an overdetermined system); x=A⁺b gives the minimum-norm least-squares solution *(required)* | — |
| T1 | transfer | short-answer | 1.97 | Why does the standard OLS formula β̂=(XᵀX)⁻¹Xᵀy break down with perfectly collinear predictors, and how does β̂=X⁺y still give a sensible answer? | perfectly collinear predictors make XᵀX singular, so (XᵀX)⁻¹ doesn't exist; the pseudo-inverse X⁺ sidesteps this entirely by inverting only the nonzero singular values, producing the minimum-norm solution among the (now infinitely many) coefficient vectors that fit equally well *(required: names XᵀX's singularity as the specific failure, and the minimum-norm resolution)* | — |

*Coverage: 5 items, −0.03…1.97.*

---

## Eckart-Young Theorem (`eckart-young`)
*Prereq: Singular Value Decomposition · ancestors 18 · b₀ = 0.97*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.03 | State the Eckart-Young theorem. | the best rank-k approximation to A (minimizing the Frobenius or operator-norm distance) is obtained by truncating A's SVD to its k largest singular values and corresponding vectors | — |
| R2 | recall | mcq | 0.27 | "Best rank-k approximation" means: | the closest rank-k matrix to A, in a specific matrix-norm sense | treats it as "any arbitrary rank-k matrix" — missing that Eckart-Young is a genuine optimality guarantee, not just a construction → `eckart-young` |
| A1 | apply | numeric | 0.77 | A's singular values are 10, 5, 1. Compute the Frobenius-norm approximation error for the best rank-1 and best rank-2 approximations. `[verified: √26≈5.1, and 1]` | error = √(sum of squares of the *dropped* singular values); rank-1 drops 5,1: √(25+1)≈5.1; rank-2 drops only 1: √1=1 | — |
| E1 | explain | short-answer | 1.47 | Why is Eckart-Young the precise theoretical justification for PCA's dimensionality reduction, rather than just a reasonable heuristic? | keeping the top k principal components is *provably* the best possible rank-k approximation of the (centered) data matrix in the Eckart-Young sense — not merely a plausible choice, an optimal one *(required: the "provably optimal, not heuristic" framing)* | — |
| T1 | transfer | short-answer | 1.97 | Why can SVD-based image compression achieve large file-size reduction with minimal visible quality loss for many real images? | real images often have rapidly decaying singular values — most of the "information" concentrates in a few large ones — so a low-rank Eckart-Young approximation captures nearly all of the image's structure while discarding the numerous small, largely-negligible singular values *(required: names the rapid-decay property specifically, not just "SVD compresses well")* | — |

*Coverage: 5 items, −0.03…1.97.*

---

## Principal Component Analysis (Matrix Edition) (`pca-matrix-edition`)
*Prereq: SVD, Rayleigh Quotient, Covariance · ancestors 31 · b₀ = 1.23*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.23 | State the connection between PCA and eigenvectors/singular vectors. | PCA's principal components are the eigenvectors of the data's covariance matrix, ordered by eigenvalue (variance explained) — equivalently, the top singular vectors of the centered data matrix | — |
| R2 | recall | mcq | 0.53 | The first principal component captures: | the direction of maximum variance in the data | picks "the direction most correlated with the outcome variable" — PCA is unsupervised and never looks at any outcome → `pca-matrix-edition` |
| A1 | apply | numeric | 1.03 | A covariance matrix has eigenvalues 8, 3, 1 (total variance 12). What fraction of total variance does the first principal component explain? `[verified: 66.7%]` | 8/12 ≈ 66.7% | — |
| E1 | explain | short-answer | 1.73 | Trace the full chain connecting Rayleigh quotients, the Spectral Theorem, and Eckart-Young into "PCA." | (1) the first PC maximizes the covariance matrix's Rayleigh quotient (`rayleigh-quotient`); (2) by the Spectral Theorem, that maximizer is exactly the top eigenvector; (3) by Eckart-Young, keeping the top k such components is provably the best rank-k summary of the data — three independently-derived results converging into one coherent method *(required: all three steps named in sequence)* | — |
| T1 | transfer | short-answer | 2.23 | Why is PCA called unsupervised, and how does contrasting it with LDA make this concrete? | PCA's entire derivation — maximizing variance via the covariance matrix's Rayleigh quotient — never references any outcome or label variable at all; LDA, by contrast, explicitly uses class labels to find discriminative directions, making the supervised/unsupervised distinction concrete rather than terminological *(required: the explicit LDA contrast)* | — |

*Coverage: 5 items, 0.23…2.23. This is the capstone item of the entire linear-algebra domain — E1 explicitly names every prior concept it draws on.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| singular values equated with, rather than square-rooted from, AᵀA's eigenvalues | `svd` |
| singular vectors assumed unique despite repeated singular values | `uniqueness-of-svd` |
| singular vector sign flips treated as computational disagreement | `uniqueness-of-svd` |
| rank confused with min(m,n) rather than the count of nonzero singular values | `svd-four-fundamental-subspaces` |
| pseudo-inverse motivation confused with a speed claim | `moore-penrose-inverse` |
| "best rank-k approximation" treated as an arbitrary construction rather than a provable optimum | `eckart-young` |
| PCA treated as using outcome/label information | `pca-matrix-edition` |

**Cluster total: 30 items across 6 concepts.** All numeric claims verified. `pca-matrix-edition`'s E1
is the deliberate capstone of the 54-concept linear-algebra sweep.

---

# Linear Algebra: complete

**54 / 54 concepts done.** Total items across all 8 clusters: **~271**.
