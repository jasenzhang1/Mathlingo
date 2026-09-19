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
| R3 | recall | short-answer | −0.9 | Fill in the blank: matrix multiplication is ___ but generally not commutative. | associative | — |
| R4 | recall | mcq | −0.85 | The identity matrix I satisfies, for any compatible A: | AI = IA = A | claims only AI=A holds while IA≠A in general, missing that the identity acts as identity from both sides → `matrix-multiplication` |
| R5 | recall | mcq | −0.8 | True or false: (AB)C = A(BC) for compatible matrices A, B, C. | true | answers "false," missing associativity, one of the two properties matrix multiplication does satisfy → `matrix-multiplication` |
| R6 | recall | short-answer | −0.75 | What is (AB)ᵀ, in terms of Aᵀ and Bᵀ? | Bᵀ Aᵀ — the transpose of a product reverses the order | — |
| R7 | recall | mcq | −0.65 | Matrix multiplication distributes over matrix addition as: | A(B+C) = AB + AC | states it as A(B+C) = AB + C, dropping the second A entirely → `matrix-multiplication` |
| R8 | recall | short-answer | −0.6 | Fill in the blank: multiplying any matrix A by a compatible zero matrix gives the ___. | zero matrix | — |
| R9 | recall | mcq | −0.55 | If A is m×n and B is p×q, the product AB is defined only when: | n=p — the inner dimensions match | claims AB is defined whenever m=q, confusing the inner-dimension matching condition with a condition on the outer dimensions → `matrix-multiplication` |
| R10 | recall | short-answer | −0.5 | For A (m×n) and B (n×p), what is the shape of AB? | m×p | — |
| R11 | recall | mcq | −0.45 | (AB)ᵀ = BᵀAᵀ demonstrates that the transpose operation: | reverses the order of a matrix product | claims transpose preserves the order, i.e. (AB)ᵀ=AᵀBᵀ, the identity that generally fails to even have compatible dimensions → `matrix-multiplication` |
| R12 | recall | mcq | −0.4 | True or false: for square matrices, AI=A but IA≠A in general. | false — both AI=A and IA=A hold | answers "true," contradicting R4's two-sided identity property → `matrix-multiplication` |
| R13 | recall | short-answer | −0.35 | Why is the naive cost of multiplying two n×n matrices described as O(n³)? | computing each of the n² entries of the product requires an n-term dot product (n multiplications and additions), giving n²×n = n³ total operations | — |
| R14 | recall | mcq | −0.3 | A(B+C) = AB+AC is called: | left-distributivity of matrix multiplication over addition | calls it "commutativity," a property matrix multiplication does not generally have at all → `matrix-multiplication` |
| R15 | recall | short-answer | −0.25 | Does (A+B)C = AC+BC hold in general, and what is this property called? | yes — this is right-distributivity of matrix multiplication over addition | — |
| R16 | recall | mcq | −0.2 | Multiplying an m×n matrix by an n×1 vector produces: | an m×1 vector — the special case of matrix-vector multiplication | claims the result is an n×1 vector, keeping the wrong dimension from the input rather than the output side of the map → `matrix-multiplication` |
| A2 | apply | numeric | −0.05 | A=[[2,0],[1,3]], I the 2×2 identity. Compute AI. `[verified: AI=A]` | AI = [[2,0],[1,3]] = A | — |
| A3 | apply | numeric | 0.05 | Using A1's A, B, verify (AB)ᵀ = BᵀAᵀ. `[verified: both equal [[19,43],[22,50]]]` | (AB)ᵀ = [[19,43],[22,50]]; BᵀAᵀ = [[5,7],[6,8]][[1,3],[2,4]] = [[19,43],[22,50]] — they match | — |
| A4 | apply | numeric | 0.15 | A is 2×3, B is 3×4. What are the dimensions of AB? `[verified: 2×4]` | 2×4 | — |
| A5 | apply | short-answer | 0.25 | A is 2×3, C is 2×4. Is AC defined? | no — the inner dimensions (3 and 2) don't match, so AC is undefined | — |
| A6 | apply | numeric | 0.35 | A=I (2×2 identity), B=[[7,−2],[4,9]]. Compute AB and BA. `[verified: both equal B]` | AB = B and BA = B — multiplying by the identity commutes trivially, even though matrix multiplication is not commutative in general | — |
| E2 | explain | short-answer | 0.65 | Why does associativity (AB)C=A(BC) follow from viewing matrices as functions, without checking entries? | both sides compute the same composition of linear maps, applying C first, then B, then A, to any input vector x; function composition is always associative ((f∘g)∘h = f∘(g∘h)) regardless of which functions are involved, so matrix multiplication inherits associativity for free once recognized as function composition *(required: the explicit function-composition framing)* | — |
| E3 | explain | short-answer | 0.75 | Why does (AB)ᵀ = BᵀAᵀ reverse the order, rather than keeping AᵀBᵀ? | transposing swaps rows and columns, reversing the roles of which map is applied first; tracing through (AB)x = A(Bx) and transposing shows the composition order must flip to keep dimensions and the underlying linear map consistent — AᵀBᵀ would generally not even have compatible dimensions unless A and B happen to be square and equal-sized *(required: the dimension-consistency argument, not just citing the identity)* | — |
| E4 | explain | derivation | 0.85 | Verify A(B+C)=AB+AC entry by entry from the definition of matrix multiplication. | the (i,j) entry of A(B+C) is Σₖ Aᵢₖ(B+C)ₖⱼ = Σₖ Aᵢₖ(Bₖⱼ+Cₖⱼ) = ΣₖAᵢₖBₖⱼ + ΣₖAᵢₖCₖⱼ, exactly the (i,j) entry of AB plus the (i,j) entry of AC — the real-number distributive law applied inside the sum, entry by entry *(required: the explicit entry-wise expansion)* | — |
| E5 | explain | short-answer | 0.95 | Why does the O(n³) naive cost of matrix multiplication matter practically, and what does the existence of faster algorithms (e.g. Strassen's) imply? | for large n, an O(n³) algorithm becomes prohibitively slow — doubling n makes it 8× slower — so this cost is a genuine bottleneck in large-scale ML and numerical computing; Strassen's algorithm and its successors reduce the exponent below 3 by cleverly reusing intermediate products, trading more additions for fewer multiplications, showing the naive row-times-column rule is not the only or fastest way to compute a product *(required: names both the practical bottleneck and what a faster algorithm implies)* | — |
| T2 | transfer | short-answer | 1.15 | Neural network forward passes chain many matrix multiplications. Why does associativity matter for how a framework can group these multiplications for efficiency? | associativity guarantees W₃(W₂(W₁x)) = ((W₃W₂)W₁)x = (W₃(W₂W₁))x for weight matrices Wᵢ, so a framework is free to choose whichever grouping minimizes total computation — e.g. precomputing W₃W₂ once if it will be reused across many inputs x — without changing the mathematical result *(required: names the reordering freedom associativity licenses, with a concrete grouping example)* | — |
| T3 | transfer | short-answer | 1.25 | Why is it useful, when debugging a batched GPU matrix-multiplication implementation, that A(B+C)=AB+AC holds *exactly* in exact arithmetic, even though floating-point results can differ slightly? | the mathematical guarantee means any two mathematically equivalent ways of computing a result should agree exactly; when floating-point implementations of the two sides disagree by more than expected rounding error, that discrepancy signals an actual bug (a shape mismatch silently broadcasting wrong, or a transposition error) rather than acceptable numerical noise, since the true algebraic identity is exact, not approximate *(required: distinguishes expected rounding error from a genuine bug signal)* | — |

*Coverage: 16/6/5/3 — 30 items, −0.9…1.25.*

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
| R3 | recall | short-answer | −0.76 | Fill in the blank: the entry Aᵢⱼ of a matrix sits in row ___ and column ___. | i; j | — |
| R4 | recall | mcq | −0.71 | A matrix with the same number of rows and columns is called: | square | calls it "diagonal," confusing the shape property (equal rows and columns) with a structural property about which entries are zero → `matrices` |
| R5 | recall | mcq | −0.66 | True or false: matrix addition is defined entrywise, requiring both matrices to have the same dimensions. | true | answers "false," missing that matrices of different sizes cannot be added at all → `matrices` |
| R6 | recall | short-answer | −0.61 | What is the transpose Aᵀ of a matrix A, informally? | the matrix obtained by swapping A's rows and columns, so Aᵀᵢⱼ = Aⱼᵢ | — |
| R7 | recall | mcq | −0.5 | A matrix A is symmetric when: | Aᵀ = A | claims A is symmetric whenever it's square, omitting the actual entry-matching condition Aᵀ=A → `matrices` |
| R8 | recall | short-answer | −0.45 | Fill in the blank: a matrix with all off-diagonal entries equal to 0 is called a ___ matrix. | diagonal | — |
| R9 | recall | mcq | −0.4 | The zero matrix, added to any compatible matrix A, gives: | A unchanged | claims it gives the zero matrix regardless of A, confusing addition with multiplication by zero → `matrices` |
| R10 | recall | short-answer | −0.35 | How is scalar multiplication of a matrix defined? | entrywise — every entry of A is multiplied by the scalar c | — |
| R11 | recall | mcq | −0.3 | Two matrices are equal if and only if: | they have the same dimensions and every corresponding entry matches | claims two matrices are equal whenever they have the same dimensions, regardless of their entries → `matrices` |
| R12 | recall | mcq | −0.25 | True or false: every square matrix is automatically symmetric. | false | answers "true," missing that squareness is necessary but far from sufficient for symmetry → `matrices` |
| R13 | recall | short-answer | −0.2 | What structural distinction separates a "row vector" from a 1×n matrix? | none — a row vector is literally a 1×n matrix, a special case with only one row | — |
| R14 | recall | mcq | −0.15 | In the notation Aᵢⱼ, which index is conventionally the row index? | i, the first index | claims j (the second index) is the row index, reversing the standard row-then-column convention → `matrices` |
| R15 | recall | short-answer | −0.1 | What is the identity matrix I, described as a special diagonal matrix? | the diagonal matrix with every diagonal entry equal to 1 | — |
| R16 | recall | mcq | −0.05 | A matrix representing a linear transformation from Rⁿ to Rᵐ has shape: | m×n | claims the shape is n×m, swapping which dimension comes from the domain and which from the codomain → `matrices` |
| A2 | apply | numeric | 0.1 | A=[[1,2],[3,4]]. Compute Aᵀ. `[verified]` | [[1,3],[2,4]] | — |
| A3 | apply | short-answer | 0.2 | A=[[5,−1],[−1,7]]. Is A symmetric? `[verified: Aᵀ=A]` | yes — the off-diagonal entries match (both −1), so Aᵀ=A | — |
| A4 | apply | numeric | 0.3 | A=[[2,3],[3,5]]. Compute A applied to (1,1). `[verified: (5,8)]` | (2+3, 3+5) = (5,8) | — |
| A5 | apply | short-answer | 0.4 | Give a 3×3 diagonal matrix with diagonal entries 2, −1, 4. `[verified]` | diag(2,−1,4) | — |
| A6 | apply | numeric | 0.5 | A=[[0,1],[1,0]]. Compute A applied to (5,9). `[verified: (9,5)]` | (9,5) — A swaps the two components | — |
| E2 | explain | short-answer | 0.79 | Why does Aᵀᵢⱼ=Aⱼᵢ correspond to "swapping rows and columns"? | defining Aᵀᵢⱼ=Aⱼᵢ literally relabels: what was the (j,i) entry (row j, column i) of A becomes the (i,j) entry (row i, column j) of Aᵀ — every row of A becomes the corresponding column of Aᵀ and vice versa, exactly what "swapping rows and columns" means *(required: the explicit index-relabeling argument)* | — |
| E3 | explain | short-answer | 0.89 | Why must a matrix be square for it to possibly be symmetric? | symmetry requires Aᵢⱼ=Aⱼᵢ for every valid pair of indices; if A is not square, some entries Aᵢⱼ exist without a corresponding Aⱼᵢ entry to compare — the transpose would even have different dimensions than A itself — so Aᵀ=A cannot even be evaluated, let alone hold *(required: the dimension-mismatch argument for non-square A)* | — |
| E4 | explain | derivation | 0.99 | Show Ix=x for the identity matrix I, by direct computation. | the i-th entry of Ix is Σⱼ Iᵢⱼxⱼ; since Iᵢⱼ=1 when i=j and 0 otherwise, this collapses to Iᵢᵢxᵢ=1·xᵢ=xᵢ — every entry of Ix equals the corresponding entry of x, so Ix=x exactly *(required: the explicit collapse using Iᵢⱼ's 0/1 structure)* | — |
| E5 | explain | short-answer | 1.04 | Why does knowing a matrix's columns — where the basis vectors go — let you reconstruct the whole linear transformation? | any vector x=(x₁,…,xₙ) can be written as x=Σxᵢeᵢ, a linear combination of the standard basis vectors; linearity then forces T(x)=ΣxᵢT(eᵢ)=Σxᵢ(column i of A), so the n columns completely determine T's action on every other vector, by linearity alone *(required: the explicit x=Σxᵢeᵢ decomposition and linearity step)* | — |
| T2 | transfer | short-answer | 1.29 | A covariance matrix Σ is always symmetric. Using the transpose definition, explain why Σᵢⱼ=Σⱼᵢ is guaranteed structurally, before any data is involved. | Σᵢⱼ is defined as Cov(Xᵢ,Xⱼ), and covariance is symmetric in its two arguments — Cov(Xᵢ,Xⱼ)=Cov(Xⱼ,Xᵢ); since Aᵀ=A means Aᵢⱼ=Aⱼᵢ for every i,j, and that's exactly the covariance identity, Σ's symmetry follows directly from the definition of covariance itself, with no numbers needed *(required: connects Aᵀ=A directly to covariance's own symmetry)* | — |
| T3 | transfer | short-answer | 1.39 | Why does whether an image-processing convolution kernel matrix is symmetric affect whether the resulting filter treats all rotational directions equally? | a symmetric kernel (Aᵀ=A) applies the same weighting pattern regardless of how the neighborhood is read (row-by-row versus column-by-column), tending to respond identically to features rotated by 90°; an asymmetric kernel — like a directional edge detector — deliberately breaks this symmetry so the filter responds more strongly to edges in one orientation than another *(required: connects Aᵀ=A to the rotational-symmetry behavior of the filter)* | — |

*Coverage: 16/6/5/3 — 30 items, −0.76…1.39.*

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
| R3 | recall | short-answer | −0.65 | Fill in the blank: trace(A) is only defined for ___ matrices. | square | — |
| R4 | recall | mcq | −0.6 | trace(cA), for scalar c, equals: | c·trace(A) | claims trace(cA) equals c²·trace(A), incorrectly squaring the scalar factor → `trace` |
| R5 | recall | mcq | −0.55 | True or false: trace(Aᵀ) = trace(A). | true | answers "false," missing that transposing leaves the diagonal (and hence the trace) untouched → `trace` |
| R6 | recall | numeric | −0.5 | What is trace(Iₙ), the trace of the n×n identity matrix? `[verified: n]` | n | — |
| R7 | recall | mcq | −0.4 | trace(A+B) equals: | trace(A) + trace(B) | claims trace(A+B) equals trace(A)·trace(B), confusing the additive linearity of trace with a multiplicative rule → `trace` |
| R8 | recall | short-answer | −0.35 | Fill in the blank: trace is the sum of a matrix's ___ entries. | diagonal | — |
| R9 | recall | mcq | −0.3 | The trace of a matrix also equals: | the sum of its eigenvalues | claims it equals the product of its eigenvalues, confusing trace with the determinant instead → `trace` |
| R10 | recall | short-answer | −0.25 | Why is "a 1×1 matrix equals its own trace" a useful fact in derivations like E[XᵀAX]? | it lets a scalar such as XᵀAX (technically a 1×1 matrix) be rewritten as its own trace, which can then be manipulated using trace's cyclic property to rearrange the matrices inside | — |
| R11 | recall | mcq | −0.2 | For an idempotent projection matrix P, trace(P) equals: | rank(P) | claims trace(P) always equals the number of rows of P, regardless of its rank → `trace` |
| R12 | recall | mcq | −0.15 | True or false: trace(AB) always equals trace(A)·trace(B). | false | answers "true," a multiplicative claim that does not hold for trace in general → `trace` |
| R13 | recall | numeric | −0.1 | What is trace(0), the trace of any zero matrix? `[verified: 0]` | 0 | — |
| R14 | recall | mcq | −0.05 | trace's cyclic property, trace(ABC)=trace(BCA)=trace(CAB), allows: | cyclically rotating the order of the matrices inside a trace | claims it allows any arbitrary permutation of A, B, C inside the trace, overgeneralizing beyond the cyclic rotations the property actually guarantees → `trace` |
| R15 | recall | short-answer | 0.0 | Why can't the matrices inside a trace be freely permuted in any order? | only cyclic rotations are guaranteed to preserve the trace; a non-cyclic rearrangement (like swapping two adjacent factors without cycling) is not covered by the property and can genuinely change the value | — |
| R16 | recall | mcq | 0.05 | trace maps a square matrix to: | a single scalar | claims trace maps a matrix to another matrix of the same size, missing that it collapses to one number → `trace` |
| A2 | apply | numeric | 0.2 | A=[[3,1],[0,−2]]. Compute trace(A). `[verified: 1]` | 3+(−2) = 1 | — |
| A3 | apply | numeric | 0.3 | A=[[2,5],[5,2]]. Compute trace(2A). `[verified: 8]` | 2×(2+2) = 8 | — |
| A4 | apply | numeric | 0.4 | A=[[1,2],[3,4]], B=[[0,1],[1,0]]. Compute trace(A+B). `[verified: 5]` | trace(A)=5, trace(B)=0, so trace(A+B)=5 | — |
| A5 | apply | numeric | 0.5 | What is trace(I₄), the trace of the 4×4 identity matrix? `[verified: 4]` | 4 | — |
| A6 | apply | numeric | 0.6 | P=[[0.5,0.5],[0.5,0.5]] (an idempotent projection, rank 1). Compute trace(P) and confirm it equals rank(P). `[verified: 1=1]` | trace(P) = 0.5+0.5 = 1 = rank(P) | — |
| E2 | explain | short-answer | 0.9 | Why does trace(cA)=c·trace(A) follow immediately from the definition, entry by entry? | trace(cA) sums the diagonal entries of cA, each of which is c times the corresponding diagonal entry of A; factoring c out of every term in that sum gives c times the sum of A's diagonal entries, exactly c·trace(A) *(required: the explicit entry-wise factoring)* | — |
| E3 | explain | short-answer | 1.0 | Why does trace(Aᵀ)=trace(A), using the transpose's definition? | transposing swaps off-diagonal entries with their mirror image across the diagonal, but leaves every diagonal entry Aᵢᵢ exactly where it is, since Aᵀᵢᵢ=Aᵢᵢ; trace only sums diagonal entries, and those are unaffected by transposing, so the trace is unchanged *(required: names that diagonal entries are fixed points of the transpose)* | — |
| E4 | explain | derivation | 1.1 | Derive trace(Iₙ)=n directly from the definition of the identity matrix. | Iₙ has 1 on every diagonal entry and 0 elsewhere; trace sums exactly the n diagonal entries, each equal to 1, giving 1+1+⋯+1 (n times) = n *(required: the explicit sum of n ones)* | — |
| E5 | explain | short-answer | 1.2 | Why is trace(AB)=trace(BA) surprising at first glance, given AB≠BA as matrices in general? | the cyclic property only claims the *scalar* trace of the two products agrees, not that the matrices AB and BA are themselves equal — they can be entirely different matrices, yet the specific number obtained by summing each product's diagonal always coincides, a genuinely nontrivial fact proved by reindexing the double sum *(required: distinguishes the matrix-level inequality from the scalar-level trace equality)* | — |
| T2 | transfer | short-answer | 1.4 | PCA's total variance is trace(Σ). Why does trace being preserved under an orthogonal change of basis matter for interpreting PCA's explained-variance percentages? | since trace equals the sum of eigenvalues (R9), and PCA's transformed covariance matrix (in the eigenbasis) is diagonal with the eigenvalues on the diagonal, trace(Σ) computed in the original basis equals the sum of eigenvalues computed in the rotated (principal-component) basis — so "percentage of variance explained by the first k components" compares like quantities regardless of the starting basis *(required: names trace-as-sum-of-eigenvalues as the connecting fact)* | — |
| T3 | transfer | short-answer | 1.5 | A neural network's weight regularization sometimes penalizes trace(WᵀW). What does this term measure, and why is trace a natural way to express it? | trace(WᵀW) equals the sum of the squares of every entry of W, since each diagonal entry of WᵀW is a column's squared norm; this is exactly the squared Frobenius norm of W — trace provides a compact way to express "total squared magnitude across every weight" as a single scalar, without writing out a double sum over all entries explicitly *(required: connects trace(WᵀW) to the squared Frobenius norm)* | — |

*Coverage: 16/6/5/3 — 30 items, −0.65…1.5.*

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
| R3 | recall | short-answer | −0.65 | Fill in the blank: a linear transformation satisfies T(u+v)=___ and T(cu)=___. | T(u)+T(v); cT(u) | — |
| R4 | recall | mcq | −0.6 | T(0), for any linear transformation T, must equal: | 0, the zero vector | claims T(0) can be any vector depending on T, missing that linearity forces it to be exactly 0 → `linear-transformations` |
| R5 | recall | mcq | −0.55 | True or false: every linear transformation Rⁿ→Rᵐ can be represented by some m×n matrix. | true | answers "false," missing the matrix-representability property `matrices`' own E1 relies on → `linear-transformations` |
| R6 | recall | short-answer | −0.5 | What is the identity transformation? | T(x)=x for every x — it leaves every vector unchanged | — |
| R7 | recall | mcq | −0.4 | Composing two linear transformations T₁ then T₂ corresponds to: | multiplying their matrices, in the order matching applying T₁ first | claims composing T₁ then T₂ corresponds to adding their matrices, confusing composition with the unrelated operation of matrix addition → `linear-transformations` |
| R8 | recall | short-answer | −0.35 | Fill in the blank: a linear transformation preserves ___ combinations of vectors. | linear — T(au+bv)=aT(u)+bT(v) | — |
| R9 | recall | mcq | −0.3 | Which of these is a linear transformation of R²? | a 90° rotation about the origin | picks "a translation by (1,0)," an affine map that fails T(0)=0 → `linear-transformations` |
| R10 | recall | short-answer | −0.25 | Why is a reflection across a line through the origin linear, but a reflection across an arbitrary line generally is not? | a reflection through the origin still sends the origin to itself and satisfies both linearity axioms; a reflection across a line not through the origin moves the origin itself, violating T(0)=0, so it fails to be linear — it's affine instead | — |
| R11 | recall | mcq | −0.2 | The zero transformation T(x)=0 for all x is: | a valid (if trivial) linear transformation | claims the zero transformation isn't linear because it "throws away all information," conflating a degenerate but perfectly linear map with a non-linear one → `linear-transformations` |
| R12 | recall | mcq | −0.15 | True or false: a linear transformation must map the origin to itself. | true | answers "false," directly contradicting T(0)=0 → `linear-transformations` |
| R13 | recall | short-answer | −0.1 | Which single image, if nonzero, is enough to prove T is NOT linear? | T(0), the image of the zero vector — if T(0)≠0, T cannot be linear | — |
| R14 | recall | mcq | −0.05 | Scaling every coordinate by the same factor c, T(x)=cx, is: | a linear transformation, for any fixed scalar c | claims T(x)=cx is linear only when c>0, an unnecessary restriction not part of the definition → `linear-transformations` |
| R15 | recall | short-answer | 0.0 | What must be checked to verify a candidate function T is linear, beyond spot-checking a few examples? | both defining properties — additivity and homogeneity — must hold for *every* possible u, v, and scalar c, not just the particular examples checked | — |
| R16 | recall | mcq | 0.05 | A shear transformation, like T(x,y)=(x+y,y), is: | linear | claims a shear is not linear because it "distorts shapes," confusing visual distortion with the algebraic definition of linearity → `linear-transformations` |
| A2 | apply | short-answer | 0.2 | T(x,y)=(2x,3y). Verify T(u+v)=T(u)+T(v) for u=(1,2), v=(3,1). `[verified: both (8,9)]` | T(u)=(2,6), T(v)=(6,3), sum=(8,9); u+v=(4,3), T(u+v)=(8,9) — matches | — |
| A3 | apply | short-answer | 0.3 | Is T(x,y)=(x², y) linear? Check homogeneity using u=(1,1), c=2. `[verified: T(2,2)=(4,2)≠(2,2)=2T(1,1)]` | no — T(2u)=T(2,2)=(4,2), but 2T(u)=2(1,1)=(2,2); these don't match, so T is not linear | — |
| A4 | apply | numeric | 0.4 | T(x,y,z)=(x+y, y+z). Compute T(0,0,0). `[verified: (0,0)]` | (0,0) — consistent with (though not sufficient proof of) linearity | — |
| A5 | apply | numeric | 0.5 | T(x)=5x (1-D). Verify T(3)+T(4)=T(7). `[verified: both 35]` | T(3)+T(4)=15+20=35; T(7)=35 — matches | — |
| A6 | apply | short-answer | 0.6 | T(x,y)=(x,y,1). Is T linear? Check T(0,0). `[verified: T(0,0)=(0,0,1)≠(0,0,0)]` | no — T(0,0)=(0,0,1)≠(0,0,0), so T fails T(0)=0 and cannot be linear; it's an affine embedding instead | — |
| E2 | explain | short-answer | 0.9 | Why does T(0)=0 follow automatically from the two linearity axioms, rather than being a separate axiom itself? | T(0)=T(0·x)=0·T(x)=0 for any x, using the homogeneity axiom with c=0 — T(0)=0 is a logical consequence of homogeneity, not an independent requirement *(required: the explicit T(0·x)=0·T(x) step)* | — |
| E3 | explain | short-answer | 1.0 | Why does composing two linear transformations always give another linear transformation? | if T₁ and T₂ are both linear, (T₂∘T₁)(u+v) = T₂(T₁(u+v)) = T₂(T₁(u)+T₁(v)) = T₂(T₁(u))+T₂(T₁(v)), using T₁'s additivity and then T₂'s additivity in turn; the same chaining argument works for homogeneity, so the composite inherits both linearity axioms *(required: the explicit two-step chaining through T₁ then T₂)* | — |
| E4 | explain | derivation | 1.1 | Verify T(x,y)=(2x,3y) satisfies homogeneity, T(cu)=cT(u), for general scalar c and u=(x,y). | T(cu)=T(cx,cy)=(2cx,3cy); cT(u)=c(2x,3y)=(2cx,3cy) — these match exactly for every c, x, y *(required: the explicit both-sides computation)* | — |
| E5 | explain | short-answer | 1.2 | Why must additivity and homogeneity be checked together — could a function satisfy one but not the other? | yes — the two properties are logically independent; some functions satisfy homogeneity for every scalar but fail additivity (or vice versa), so genuine linearity requires verifying both properties hold, not assuming one implies the other *(required: names that the two properties are logically independent)* | — |
| T2 | transfer | short-answer | 1.4 | A neural network layer computes y=Wx+b. Why is it called "linear" in casual ML usage despite technically violating T(0)=0? | y=Wx+b generally sends 0 to b≠0, technically making it affine rather than linear in the strict algebraic sense; ML practitioners often use "linear layer" loosely to mean "no nonlinear activation function applied," a different (weaker) sense of "linear" than the algebraic definition here, which can cause real confusion when precision matters *(required: distinguishes the affine-vs-linear technicality from the ML usage)* | — |
| T3 | transfer | short-answer | 1.5 | Why does confirming an image-compression transform is genuinely linear, not merely "looks proportional," matter for guaranteeing correct decompression? | if the forward transform T and its inverse T⁻¹ are both genuinely linear, composing them is guaranteed to itself be linear and, being the identity on the relevant space, to satisfy exact recovery for every linear combination of inputs; a transform that merely "looks proportional" on a few tested examples but secretly fails additivity or homogeneity somewhere could silently corrupt certain pixel-value combinations, even if it passes casual spot checks *(required: contrasts genuine linearity's compositional guarantee against a spot-checked approximation)* | — |

*Coverage: 16/6/5/3 — 30 items, −0.65…1.5.*

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
