# Linear Algebra Cluster 1 — Vectors & Basic Operations

Vectors, Vector Operations, Dot Product, Vector Norm, Cauchy-Schwarz, Vector Angles, Vector Projection,
Orthogonal Vectors (8 concepts). Same table format as the probability/statistics clusters
(e.g. [foundations-of-probability.md](foundations-of-probability.md)), run at 5 items per concept —
the density this whole linear-algebra and machine-learning sweep uses, since the corpus is far larger
(104 concepts) than the probability/statistics sweep's 81.

**A genuine cross-domain payoff worth flagging up front**: `cauchy-schwarz`'s proof technique here
(bounding ‖u−tv‖²≥0 as a quadratic in t) is the *exact same argument* `correlation`'s E1 used in the
statistics sweep to bound ρ∈[−1,1]. That isn't a coincidence — correlation *is* a cosine, in the inner
product space where ⟨X,Y⟩=Cov(X,Y). Several items below make this connection explicit.

---

## Vectors (`vectors`)
*Root · ancestors 0 · b₀ = −0.50*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.5 | Define a vector in Rⁿ, and state what n represents. | an ordered list of n real numbers; n is the *dimension* — the number of components | — |
| R2 | recall | mcq | −1.2 | Which is *not* a valid way to think of a vector in R²? | a single number describing only its length | picks "an arrow from the origin," a perfectly standard interpretation, mistaking it for the wrong one → `vectors` |
| A1 | apply | numeric | −0.75 | v=(3,4). Compute −2v and v+(1,1). `[verified trivial]` | −2v=(−6,−8); v+(1,1)=(4,5) | — |
| E1 | explain | short-answer | 0.0 | Why is vector addition defined component-wise rather than, say, by adding magnitudes? | it matches the geometric "tip-to-tail" picture exactly — placing the tail of one arrow at the tip of the other and drawing the resultant arrow gives precisely the component-wise sum *(required: the tip-to-tail correspondence, not just "that's the definition")* | — |
| T1 | transfer | short-answer | 0.5 | A weather station records wind as a vector (speed and direction), not just a speed. Why does this matter when combining measurements from two nearby stations — can you just average their speeds? | averaging speeds alone discards direction; two winds of equal speed but opposite direction should roughly cancel (a near-zero net vector), but averaging their speed *magnitudes* would falsely suggest a moderate wind still blowing — component-wise vector averaging correctly captures the cancellation *(required: the cancellation example)* | — |

*Coverage: 5 items, −1.5…0.5.*

---

## Vector Operations (`vector-operations`)
*Prereq: Vectors · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | State the two basic vector operations and their component-wise definitions. | addition: (u+v)ᵢ=uᵢ+vᵢ; scalar multiplication: (cu)ᵢ=c·uᵢ | — |
| R2 | recall | mcq | −0.9 | Scalar multiplication by a *negative* number: | reverses direction and scales the magnitude | claims it "only changes magnitude," missing the direction flip → `vector-operations` |
| A1 | apply | numeric | −0.35 | u=(2,−1,3), v=(0,4,−2). Compute 2u−3v. `[verified: (4,-14,12)]` | 2u=(4,−2,6); 3v=(0,12,−6); 2u−3v=(4,−14,12) | — |
| E1 | explain | derivation | 0.35 | Show Rⁿ is closed under addition and scalar multiplication — the two properties `vector-spaces` will name as axioms. | adding two n-tuples component-wise, or scaling one, produces another n-tuple — the result never leaves Rⁿ *(required: stated as a closure argument, not just "you can add vectors")* | — |
| T1 | transfer | short-answer | 0.85 | In graphics, an object's position updates each frame via `position += velocity * dt`. Explain this as vector operations, and why treating position/velocity as vectors (not separate x, y, z scalars) simplifies the code. | this is scalar multiplication (velocity by dt) followed by vector addition, applied identically regardless of dimension — writing it as one vector equation avoids repeating the same update three times for x, y, z separately *(required)* | — |

*Coverage: 5 items, −1.15…0.85.*

---

## Dot Product (`dot-product`)
*Prereq: Vector Operations · ancestors 2 · b₀ = 0.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.95 | Define u·v algebraically, and state one property (commutative or distributive). | u·v=Σuᵢvᵢ; commutative: u·v=v·u | — |
| R2 | recall | mcq | −0.7 | u·v=0 means: | u and v are orthogonal, **or** one of them is the zero vector | states only "u and v are orthogonal," missing the zero-vector edge case → `dot-product` |
| A1 | apply | numeric | −0.15 | u=(1,2,3), v=(4,−5,6). Compute u·v. `[verified: 12]` | 4−10+18=12 | — |
| E1 | explain | derivation | 0.55 | Prove u·(v+w)=u·v+u·w directly from the component-wise definition. | Σuᵢ(vᵢ+wᵢ)=Σ(uᵢvᵢ+uᵢwᵢ)=Σuᵢvᵢ+Σuᵢwᵢ *(required: the term-by-term expansion)* | — |
| T1 | transfer | short-answer | 1.05 | A recommender system ranks movies by the dot product of a user's preference vector and each movie's feature vector. Why does a larger dot product suggest a better match? | when two vectors point in similar directions, corresponding components tend to share sign and reinforce, producing large positive terms; when directions diverge, terms can cancel or go negative — the dot product is large exactly when both magnitude and directional agreement are high *(required)* | — |

*Coverage: 5 items, −0.95…1.05.*

---

## Vector Norm (`vector-norm`)
*Prereq: Dot Product · ancestors 3 · b₀ = 0.19*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.81 | Define the Euclidean norm using the dot product, and name its three defining axioms. | ‖v‖=√(v·v); nonnegativity/definiteness, homogeneity, triangle inequality | — |
| R2 | recall | mcq | −0.55 | ‖cv‖ for scalar c equals: | \|c\|·‖v‖ | drops the absolute value, giving c‖v‖ — wrong for negative c → `vector-norm` |
| A1 | apply | numeric | 0.0 | v=(3,4). Compute ‖v‖ and normalize v to a unit vector. `[verified: 5, (0.6,0.8)]` | ‖v‖=5; v/‖v‖=(3/5, 4/5) | — |
| E1 | explain | short-answer | 0.69 | Why does the triangle inequality ‖u+v‖≤‖u‖+‖v‖ make geometric sense, and what tool proves it algebraically? | the direct path from origin to u+v is never longer than the "detour" through u then v; Cauchy-Schwarz (next concept) is exactly the algebraic tool used to prove this rigorously *(required: names Cauchy-Schwarz as the forward-pointing tool)* | — |
| T1 | transfer | short-answer | 1.19 | In ML, L1 (sum of absolute values) and L2 (Euclidean) norm penalties are both used for regularization. Using the *shape* of each norm's level sets (a diamond for L1, a circle for L2), explain why L1 tends to push some coefficients exactly to zero while L2 shrinks all coefficients smoothly. | the diamond's corners lie on the coordinate axes, so the optimal point where a loss contour first touches the L1 diamond is disproportionately likely to land exactly on a corner (a coefficient of zero); the circle has no corners, so the L2 contact point is smooth and rarely lands on an axis exactly *(required: the corners-vs-smooth-boundary geometric argument)* | — |

*Coverage: 5 items, −0.81…1.19.*

---

## Cauchy-Schwarz Inequality (`cauchy-schwarz`)
*Prereq: Dot Product, Vector Norm · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | State the Cauchy-Schwarz inequality. | \|u·v\| ≤ ‖u‖‖v‖ | — |
| R2 | recall | mcq | −0.45 | Equality holds when: | u and v are parallel (scalar multiples of each other) | claims equality holds "when u, v are orthogonal" — that's the *opposite* extreme (u·v=0, the loosest possible case) → `cauchy-schwarz` |
| A1 | apply | numeric | 0.1 | u=(1,2), v=(3,4). Verify Cauchy-Schwarz numerically. `[verified: 11 ≤ 11.18]` | u·v=11; ‖u‖‖v‖=√5·5≈11.18; 11≤11.18 ✓ | — |
| E1 | explain | derivation | 0.8 | Prove Cauchy-Schwarz using the discriminant trick: consider ‖u−tv‖²≥0 for every real t. | expand ‖u−tv‖²=‖u‖²−2t(u·v)+t²‖v‖² ≥0 for all t; as a quadratic in t that's never negative, its discriminant satisfies 4(u·v)²−4‖u‖²‖v‖²≤0, giving (u·v)²≤‖u‖²‖v‖², i.e. \|u·v\|≤‖u‖‖v‖ *(required: the full discriminant argument)* — **the identical technique `correlation`'s E1 used to bound ρ∈[−1,1]** | — |
| T1 | transfer | short-answer | 1.3 | In what sense is correlation "the same thing" as the cosine of an angle between two vectors, in an appropriately defined space? | treating Cov(X,Y) as an inner product ⟨X,Y⟩ and Var(X)=⟨X,X⟩ as a squared norm, correlation ρ=Cov(X,Y)/(σ_Xσ_Y) becomes exactly ⟨X,Y⟩/(‖X‖‖Y‖) — literally the cosine formula from `vector-angles`, not merely an analogy *(required: names Cov as the inner product and Var as the squared norm explicitly)* | treats the resemblance as a loose metaphor rather than the same mathematical structure → `cauchy-schwarz` |

*Coverage: 5 items, −0.7…1.3.*

---

## Vector Angles (`vector-angles`)
*Prereq: Cauchy-Schwarz · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | State the formula recovering the angle between two vectors from their dot product. | cos θ = u·v/(‖u‖‖v‖) | — |
| R2 | recall | mcq | −0.35 | If u·v=0 (neither vector zero), the angle between them is: | 90° | picks 0°, confusing zero dot product with parallel vectors → `vector-angles` |
| A1 | apply | numeric | 0.2 | u=(1,0), v=(1,1). Find the angle between them. `[verified: 45°]` | cos θ = 1/√2; θ=45° | — |
| E1 | explain | short-answer | 0.9 | Why is Cauchy-Schwarz exactly what guarantees cos θ=u·v/(‖u‖‖v‖) is always a valid cosine, i.e. in [−1,1]? | Cauchy-Schwarz states \|u·v\|≤‖u‖‖v‖, which after dividing both sides by ‖u‖‖v‖ says exactly that the ratio lies in [−1,1] — without this guarantee, the formula could in principle output a value corresponding to no real angle at all *(required: the explicit division-and-bound argument)* | — |
| T1 | transfer | short-answer | 1.4 | Connect back to `cauchy-schwarz`'s T1: explain why "correlation is the cosine of the angle between two centered random variables" is a literal statement, using this concept's formula directly. | substituting Cov and the standard deviations into cos θ=⟨X,Y⟩/(‖X‖‖Y‖) reproduces the correlation formula exactly — ρ *is* cos θ under this identification, not merely analogous to it *(required)* | — |

*Coverage: 5 items, −0.6…1.4.*

---

## Vector Projection (`vector-projection`)
*Prereq: Dot Product, Vector Norm · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | State the formula for the projection of u onto v. | proj_v(u) = (u·v/‖v‖²)·v | — |
| R2 | recall | mcq | −0.45 | The projection of u onto v is: | a vector in the same direction as v (or its negative), representing u's "shadow" along v | claims it's "always the same length as u" — only true when u is already parallel to v → `vector-projection` |
| A1 | apply | numeric | 0.1 | u=(3,4), v=(1,0). Find proj_v(u). `[verified: (3,0)]` | u·v=3, ‖v‖²=1, proj=3(1,0)=(3,0) — projecting onto the x-axis keeps only the x-component | — |
| E1 | explain | derivation | 0.8 | Derive the projection formula by requiring (u−proj_v(u)) be orthogonal to v. | set proj_v(u)=cv and require (u−cv)·v=0; solving gives c=u·v/‖v‖² *(required: the orthogonality-and-solve chain, not the formula quoted directly)* | — |
| T1 | transfer | short-answer | 1.3 | In linear regression, fitted values ŷ are literally the orthogonal projection of y onto the column space of X. Using this concept's core idea, explain why the residuals (y−ŷ) end up orthogonal to every column of X. | the defining property of an orthogonal projection is exactly that the "leftover" (residual) is orthogonal to whatever was projected onto — the same requirement used to derive proj_v(u) here, now applied to an entire subspace rather than a single vector v *(required: the direct analogy to the single-vector case)* — the geometric heart of ordinary least squares | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Orthogonal Vectors (`orthogonal-vectors`)
*Prereq: Dot Product · ancestors 3 · b₀ = 0.19*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.81 | Define orthogonal vectors, and note the special edge case involving the zero vector. | u·v=0; the zero vector is orthogonal to *every* vector, including itself | — |
| R2 | recall | mcq | −0.55 | Two nonzero orthogonal vectors are necessarily: | linearly independent | claims they're "linearly dependent" — backwards → `orthogonal-vectors` |
| A1 | apply | short-answer | 0.0 | Verify (1,2,−1) and (1,0,1) are orthogonal. `[verified: dot=0]` | dot product = 1+0−1=0 ✓ | — |
| E1 | explain | derivation | 0.69 | Prove nonzero orthogonal vectors are always linearly independent. | by contradiction: if v=cu for nonzero scalar c, then u·v=c‖u‖²≠0 (since u≠0), contradicting orthogonality unless c=0, which isn't allowed for a nontrivial dependence *(required: the contradiction argument, not just citing the fact)* | — |
| T1 | transfer | short-answer | 1.19 | Why do statisticians and engineers prefer orthogonal directions where possible — orthogonal experimental designs, orthogonal frequency components in a Fourier transform? | orthogonal directions carry independent information with no redundancy or overlap — moving along one coordinate doesn't "blend into" another, which is exactly what makes each measured effect separately interpretable *(required)* | — |

*Coverage: 5 items, −0.81…1.19.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| vector-as-scalar confusion (direction discarded) | `vectors` |
| sign of scalar multiplication ignored | `vector-operations` |
| zero-vector edge case in dot-product-zero dropped | `dot-product` |
| \|c\| dropped from norm scaling | `vector-norm` |
| Cauchy-Schwarz equality case inverted (orthogonal vs parallel) | `cauchy-schwarz` |
| zero dot product read as parallel rather than perpendicular | `vector-angles` |
| projection assumed to preserve length | `vector-projection` |
| orthogonality assumed to imply dependence | `orthogonal-vectors` |

**Cluster total: 40 items across 8 concepts.** All numeric claims verified by script. The
Cauchy-Schwarz / correlation connection, threaded through `cauchy-schwarz` and `vector-angles`, is the
standout cross-domain result in this cluster.
