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
| R3 | recall | short-answer | −1.45 | Fill in the blank: two vectors are equal if and only if all of their ___ are equal. | corresponding components | — |
| R4 | recall | mcq | −1.4 | The zero vector in Rⁿ is: | the vector with every component equal to 0 | picks "the vector with no components," confusing "all zero" with "empty" → `vectors` |
| R5 | recall | mcq | −1.35 | True or false: every nonzero vector has a well-defined direction, but the zero vector does not. | true | answers "false," claiming the zero vector has a well-defined direction like any other vector → `vectors` |
| R6 | recall | short-answer | −1.3 | What is the standard basis vector e_i in Rⁿ? | the vector with a 1 in position i and 0 in every other position | — |
| R7 | recall | mcq | −1.25 | Which of these is NOT typically used to denote a vector? | a pair of vertical bars around a letter (that notation denotes a norm, not the vector) | picks boldface (e.g. **v**), a perfectly standard vector notation, as if it were the non-vector notation → `vectors` |
| R8 | recall | short-answer | −1.1 | Fill in the blank: a vector in R³ is an ordered triple, so n = ___ for R³. | 3 | — |
| R9 | recall | mcq | −1.05 | A "row vector" and a "column vector" with the same entries are: | different objects in matrix notation, related by a transpose | claims they're identical objects with no distinction, missing that matrix notation treats their shape as meaningful → `vectors` |
| R10 | recall | numeric | −1.0 | In Rⁿ, how many standard basis vectors e₁,…,eₙ are there? `[verified: n]` | n | — |
| R11 | recall | mcq | −0.95 | The zero vector is the identity element for: | vector addition — v + 0 = v for every v | claims it's the identity element for scalar multiplication, confusing it with the scalar 1 → `vectors` |
| R12 | recall | mcq | −0.9 | True or false: a vector can be interpreted as a point in space, not only as an arrow from the origin. | true | answers "false," insisting a vector must always be visualized as an arrow and never as a point → `vectors` |
| R13 | recall | short-answer | −0.85 | What does "n" denote when a vector belongs to Rⁿ? | the dimension — the number of real-number components the vector has | — |
| R14 | recall | mcq | −0.8 | Which of these is a valid vector in R²? | (3, −1) | picks the single number 3, treating a scalar as if it were automatically a vector in R² → `vectors` |
| R15 | recall | short-answer | −0.7 | Why is a single real number usually not called a "vector" in casual usage, even though R¹ is technically a vector space? | colloquial usage of "vector" typically implies n>1, carrying multiple independent components, whereas a lone real number has only a single magnitude with no separate components to combine | — |
| R16 | recall | mcq | −0.65 | The components of a vector v=(v₁,…,vₙ) are: | real numbers, for a vector in Rⁿ | claims the components must always be positive numbers, an unwarranted restriction not part of the definition → `vectors` |
| A2 | apply | numeric | −0.6 | v=(−2,5,1). What is the third component of v? `[verified: 1]` | 1 | — |
| A3 | apply | numeric | −0.55 | Write the zero vector in R⁴. `[verified]` | (0,0,0,0) | — |
| A4 | apply | short-answer | −0.5 | Are u=(1,2,3) and w=(1,2,3.0) equal as vectors? | yes — they have identical corresponding components; formatting (integer vs. decimal display) does not change the underlying real-number values | — |
| A5 | apply | short-answer | −0.45 | Write the standard basis vector e₂ in R⁴. `[verified]` | (0,1,0,0) | — |
| A6 | apply | numeric | −0.4 | v=(7,−3). Compute −v. `[verified: (−7,3)]` | (−7,3) | — |
| E2 | explain | short-answer | 0.1 | Why is it meaningful to talk about a vector's individual components separately, even though the vector is a single mathematical object? | each component records an independent quantity along its own coordinate direction, and operations like addition treat corresponding components independently — decomposing a vector into components is both a bookkeeping device and reflects the vector's actual structure as a tuple of independent coordinates *(required: connects components to the coordinate-wise structure of operations, not just "it's convenient")* | — |
| E3 | explain | short-answer | 0.15 | Why does defining the zero vector as "all components equal to 0" guarantee it acts as the additive identity, without a separate proof? | adding 0 to any component leaves it unchanged, since component-wise addition just adds corresponding entries and 0+x=x for every real number x — so v+0=v follows immediately from the component-wise definition, with no extra argument needed *(required: the direct component-wise 0+x=x reasoning)* | — |
| E4 | explain | short-answer | 0.2 | Why can a vector be equivalently described as either "a point in space" or "an arrow from the origin to that point"? | every point in Rⁿ corresponds to exactly one arrow from the origin (the arrow whose tip is that point), and conversely every arrow from the origin determines a unique endpoint — the two descriptions simply name the same underlying n-tuple of coordinates *(required: the explicit one-to-one correspondence)* | — |
| E5 | explain | short-answer | 0.25 | Why is specifying the dimension n essential before any vector operation, such as addition, can be performed? | vector addition is defined component-wise, matching up corresponding entries; two vectors from spaces of different dimensions have no natural way to pair up their components, so the operation is undefined unless both vectors share the same n *(required: the pairing-up-components argument, not just "the sizes must match")* | — |
| T2 | transfer | short-answer | 0.6 | A GPS device reports a car's position as (latitude, longitude, altitude). In what sense is this a vector, and why might treating it exactly like a vector in R³ (e.g. adding two GPS readings) be misleading? | it is formally a vector — an ordered triple of real numbers; but latitude and longitude live on a curved (spherical) surface rather than flat Euclidean space, so ordinary component-wise vector addition of two GPS coordinates does not correspond to any meaningful physical operation, unlike adding two displacement vectors in flat 3D space *(required: names the curved-vs-flat-space distinction)* | — |
| T3 | transfer | short-answer | 0.7 | Why is representing an image as one long flattened vector useful for feeding it into many ML models, despite discarding the image's 2D spatial layout? | flattening turns the image into an ordinary vector in Rⁿ (n = width×height×channels), letting standard vector and matrix machinery (dot products, matrix multiplication, distance metrics) apply directly; the cost is that spatial relationships between nearby pixels are no longer encoded structurally, which is exactly the gap convolutional architectures are built to recover *(required: names both the enabling payoff and the structural cost)* | — |

*Coverage: 16/6/5/3 — 30 items, −1.45…0.7.*

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
| R3 | recall | short-answer | −1.08 | Fill in the blank: vector addition is both ___ and ___. | commutative; associative | — |
| R4 | recall | mcq | −1.03 | Scalar multiplication distributes over: | both vector addition, c(u+v)=cu+cv, and scalar addition, (c+d)u=cu+du | claims it distributes over vector addition only, omitting the scalar-addition distributive law → `vector-operations` |
| R5 | recall | mcq | −0.98 | True or false: for every vector v, 1·v = v. | true | answers "false," missing that scalar multiplication by 1 is required to leave every vector unchanged → `vector-operations` |
| R6 | recall | short-answer | −0.93 | What is the additive inverse of a vector v, and what does v+(−v) equal? | −v, the component-wise negation of v; v+(−v) equals the zero vector | — |
| R7 | recall | mcq | −0.88 | Vector subtraction u−v is defined as: | u + (−v) | defines it as −(v−u), an unnecessarily roundabout (though algebraically equal) characterization that obscures the direct u+(−v) definition → `vector-operations` |
| R8 | recall | short-answer | −0.78 | Fill in the blank: multiplying any vector by the scalar 0 gives the ___. | zero vector | — |
| R9 | recall | mcq | −0.73 | u+v = v+u expresses which property? | commutativity of vector addition | names it "associativity," confusing the property that lets you reorder two terms with the one that lets you regroup three → `vector-operations` |
| R10 | recall | short-answer | −0.68 | State the associative property of vector addition. | (u+v)+w = u+(v+w) | — |
| R11 | recall | mcq | −0.63 | (c+d)u, for scalars c, d, equals: | cu + du | claims it equals cdu, confusing the scalar-addition distributive law with scalar multiplication's associativity → `vector-operations` |
| R12 | recall | mcq | −0.58 | True or false: scalar multiplication and vector addition, taken together, are called "the vector space operations." | true | answers "false," missing the standard name for the two basic operations `vector-spaces` will later axiomatize → `vector-operations` |
| R13 | recall | short-answer | −0.53 | What does "closure under addition" mean for Rⁿ? | the sum of any two vectors in Rⁿ is again a vector in Rⁿ — the result never leaves the space | — |
| R14 | recall | mcq | −0.48 | c(du), for scalars c, d and vector u, equals: | (cd)u — associativity of scalar multiplication | claims it equals (c+d)u, confusing scalar multiplication's associativity with the distributive law over scalar addition → `vector-operations` |
| R15 | recall | short-answer | −0.4 | What operation applied to a vector v and itself always yields the zero vector? | v + (−v), i.e. v − v | — |
| R16 | recall | mcq | −0.35 | Which of these is NOT one of the two basic vector operations? | the dot product — a separate operation covered under `dot-product`, not one of the two basic ones | picks scalar multiplication as if it weren't one of the two basic operations, when it plainly is → `vector-operations` |
| A2 | apply | short-answer | −0.25 | u=(1,1), v=(2,2), w=(3,3). Verify (u+v)+w = u+(v+w). `[verified: both equal (6,6)]` | (u+v)+w = (3,3)+(3,3) = (6,6); u+(v+w) = (1,1)+(5,5) = (6,6) — they match | — |
| A3 | apply | numeric | −0.15 | u=(5,−1,2). Compute 0·u and 1·u. `[verified]` | 0·u = (0,0,0); 1·u = (5,−1,2) | — |
| A4 | apply | numeric | −0.05 | u=(4,6). Compute u−u. `[verified: (0,0)]` | (0,0) | — |
| A5 | apply | numeric | 0.05 | c=3, d=−2, u=(1,4). Verify (c+d)u = cu+du. `[verified: both equal (1,4)]` | (c+d)u = 1·(1,4) = (1,4); cu+du = (3,12)+(−2,−8) = (1,4) — they match | — |
| A6 | apply | numeric | 0.15 | u=(2,−3), v=(−2,3). Compute u+v. `[verified: (0,0)]` | (0,0) — u and v are additive inverses | — |
| E2 | explain | short-answer | 0.45 | Why does commutativity of vector addition follow immediately from commutativity of real-number addition? | vector addition is defined component-wise as (u+v)ᵢ=uᵢ+vᵢ; since real-number addition satisfies uᵢ+vᵢ=vᵢ+uᵢ for every pair of components, applying this to every component simultaneously gives u+v=v+u *(required: the explicit component-wise reduction)* | — |
| E3 | explain | short-answer | 0.55 | Why does scalar multiplication by 1 leave every vector unchanged, as a consequence of the component-wise definition? | (1·v)ᵢ = 1·vᵢ = vᵢ for every component, since multiplying any real number by 1 leaves it unchanged; applying this to every component gives 1·v=v exactly *(required: the component-wise reduction)* | — |
| E4 | explain | derivation | 0.65 | Prove the distributive law c(u+v)=cu+cv directly from the component-wise definitions. | [c(u+v)]ᵢ = c(uᵢ+vᵢ) = cuᵢ+cvᵢ = (cu)ᵢ+(cv)ᵢ, using the real-number distributive law on each component; since this holds for every component i, c(u+v)=cu+cv *(required: the term-by-term expansion, not just citing the law)* | — |
| E5 | explain | short-answer | 0.75 | Why is closure under addition and scalar multiplication a defining structural property of Rⁿ, rather than an incidental fact? | it guarantees that any sequence of vector additions and scalar multiplications starting from vectors in Rⁿ can never accidentally produce a result outside Rⁿ — exactly the property `vector-spaces` generalizes into its formal axioms, so any set closed this way qualifies as a vector space, not just Rⁿ *(required: connects closure to the vector-space axioms)* | — |
| T2 | transfer | short-answer | 0.95 | A recipe app multiplies every ingredient quantity (a vector) by a scalar to serve more people, then adds a fixed "garnish" vector regardless of serving size. Which operations are used, and in what order do they compose? | scalar multiplication (scaling the ingredient vector by the serving-size factor) followed by vector addition (adding the fixed garnish vector) — exactly the two basic vector operations, composed scale-then-add; swapping the order would (unless the garnish were also scaled) give a different result *(required: names the specific order and why swapping it changes the outcome)* | — |
| T3 | transfer | short-answer | 1.05 | A physics simulation updates velocity via v ← v + a·dt. Why does this rely on both basic vector operations at once, and why can the order of computing a·dt versus updating v matter for a time-varying acceleration? | it uses scalar multiplication (a·dt) to compute the velocity change over a small time step, then vector addition to update v; if a itself changes with time, using the *wrong* a's value (e.g. from the next step instead of the current one) before adding introduces an error that compounds over many simulation steps *(required: names both operations and the compounding-error consequence of using the wrong a)* | — |

*Coverage: 16/6/5/3 — 30 items, −1.08…1.05.*

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
| R3 | recall | short-answer | −0.9 | Fill in the blank: u·v = ___. | Σuᵢvᵢ — the sum of products of corresponding components | — |
| R4 | recall | mcq | −0.85 | The dot product of two vectors is: | a scalar — a single number, not a vector | claims the dot product is itself a vector, confusing it with the (unrelated) cross product → `dot-product` |
| R5 | recall | mcq | −0.8 | True or false: u·u = ‖u‖², the squared length of u. | true | answers "false," missing the direct link between the dot product of a vector with itself and its squared norm → `dot-product` |
| R6 | recall | short-answer | −0.75 | What is (cu)·v, for a scalar c? | c(u·v) | — |
| R7 | recall | mcq | −0.65 | u·u for any vector u is always: | ≥0 — nonnegative, being a sum of squares | claims u·u can be negative for some vectors, missing that it's a sum of squared real numbers → `dot-product` |
| R8 | recall | short-answer | −0.6 | Fill in the blank: the dot product is also called the ___ product. | scalar (or inner) | — |
| R9 | recall | mcq | −0.55 | Which correctly states the distributive property of the dot product? | u·(v+w) = u·v + u·w | states it as u·(v+w) = (u·v)+w, dropping the second dot product entirely → `dot-product` |
| R10 | recall | short-answer | −0.5 | What does u·v=0, for nonzero u and v, describe about the two vectors? | they are orthogonal (perpendicular) | — |
| R11 | recall | mcq | −0.45 | In R³, u·v equals: | u₁v₁ + u₂v₂ + u₃v₃ | omits the third term, writing u·v = u₁v₁ + u₂v₂ as if R³ vectors had only two components → `dot-product` |
| R12 | recall | mcq | −0.4 | True or false: u·v = v·u for any vectors u, v. | true | answers "false," missing the dot product's commutativity, established directly from real-number multiplication → `dot-product` |
| R13 | recall | short-answer | −0.35 | What must be true of two vectors' dimensions for their dot product to be defined? | they must have the same dimension — the same number of components | — |
| R14 | recall | numeric | −0.3 | What does u·0 equal, for the zero vector 0? `[verified: 0]` | 0 | — |
| R15 | recall | short-answer | −0.25 | Why is u·u=0 only when u is the zero vector? | u·u is a sum of squares of the components; a sum of squares is zero only when every term is zero, which means every component of u is zero | — |
| R16 | recall | mcq | −0.2 | The dot product combines two vectors into: | a single number capturing both magnitude and directional agreement at once | claims it produces another vector of the same dimension as the inputs, confusing it with vector addition → `dot-product` |
| A2 | apply | numeric | −0.05 | u=(0,3,−4), v=(5,0,2). Compute u·v. `[verified: −8]` | 0+0−8 = −8 | — |
| A3 | apply | numeric | 0.05 | u=(2,2), v=(2,2). Compute u·v and compare it to ‖u‖². `[verified: both 8]` | u·v = 4+4 = 8; ‖u‖² = u·u = 8 — they match, since here u=v | — |
| A4 | apply | numeric | 0.15 | u=(1,−1,1), v=(1,1,1). Compute u·v. `[verified: 1]` | 1−1+1 = 1 | — |
| A5 | apply | short-answer | 0.25 | u=(3,4). Compute u·u, and state what it equals in terms of ‖u‖. `[verified: 25]` | u·u = 9+16 = 25 = ‖u‖² (since ‖u‖=5) | — |
| A6 | apply | numeric | 0.35 | u=(6,−2), v=(1,3). Are u and v orthogonal? `[verified: u·v=0]` | u·v = 6−6 = 0, so yes, u and v are orthogonal | — |
| E2 | explain | short-answer | 0.65 | Why does u·u always equal a sum of squares, and what does that guarantee about its sign? | u·u = Σuᵢ² by the component-wise definition, and each term uᵢ² is a square of a real number, hence ≥0; a sum of nonnegative terms is itself nonnegative, so u·u≥0 always *(required: the explicit sum-of-squares reasoning)* | — |
| E3 | explain | short-answer | 0.75 | Why is the dot product commutative, working directly from its component-wise definition? | u·v=Σuᵢvᵢ and v·u=Σvᵢuᵢ; since real-number multiplication is commutative (uᵢvᵢ=vᵢuᵢ) term by term, the two sums are identical *(required: the term-by-term commutativity argument)* | — |
| E4 | explain | derivation | 0.85 | Prove (cu)·v = c(u·v) directly from the definitions. | (cu)·v = Σ(cuᵢ)vᵢ = Σc(uᵢvᵢ) = cΣuᵢvᵢ = c(u·v), factoring the constant c out of each term and then out of the whole sum *(required: the explicit factoring steps)* | — |
| E5 | explain | short-answer | 0.95 | Why must both vectors live in the same Rⁿ for a dot product to be defined, unlike adding a scalar to every component of one vector? | the dot product pairs up corresponding components (uᵢ with vᵢ) and multiplies each pair, so it needs exactly as many components in v as in u to pair with; there's no natural way to extend the pairing when the dimensions differ, unlike an operation that can broadcast a single scalar across every component regardless of dimension *(required: the explicit pairing argument)* | — |
| T2 | transfer | short-answer | 1.15 | A spam filter compares an email's word-count vector to a "spam profile" vector via their dot product. Why does an email with many words matching high-weight spam terms produce a large dot product? | the dot product sums the products of corresponding components; when the email's word-count vector has large values exactly where the spam-profile vector also has large (high-weight) values, those term-by-term products are large and positive, driving the sum up — words absent from the email, or with low spam-weight, contribute little or nothing to the total *(required: the term-by-term large-times-large mechanism)* | — |
| T3 | transfer | short-answer | 1.25 | Why does computing u·u, rather than ‖u‖ itself, matter for numerical efficiency when computing many pairwise comparisons in high-dimensional ML pipelines? | u·u=‖u‖² can be computed with a single dot product and no square root; many algorithms (e.g. nearest-neighbor search using squared distances) never actually need the true norm, only its square — skipping the square-root step avoids a comparatively expensive operation repeated over potentially millions of vector pairs *(required: names the avoided square-root as the source of the savings)* | — |

*Coverage: 16/6/5/3 — 30 items, −0.9…1.25.*

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
| R3 | recall | short-answer | −0.75 | Fill in the blank: a vector with norm exactly 1 is called a ___ vector. | unit | — |
| R4 | recall | mcq | −0.7 | ‖v‖=0 if and only if: | v is the zero vector | claims ‖v‖=0 can also happen for certain nonzero vectors, contradicting the definiteness axiom → `vector-norm` |
| R5 | recall | mcq | −0.65 | True or false: ‖v‖ ≥ 0 for every vector v. | true | answers "false," missing the nonnegativity axiom every norm satisfies → `vector-norm` |
| R6 | recall | short-answer | −0.6 | What operation turns a nonzero vector v into a unit vector pointing in the same direction? | dividing v by its own norm: v/‖v‖ | — |
| R7 | recall | mcq | −0.5 | Which three properties must every vector norm satisfy? | nonnegativity/definiteness, absolute homogeneity, and the triangle inequality | lists "nonnegativity, symmetry, and additivity," substituting properties borrowed from a metric or a bilinear form rather than the norm's own three axioms → `vector-norm` |
| R8 | recall | short-answer | −0.45 | Fill in the blank: the Euclidean norm of v is ‖v‖ = √(___). | v·v | — |
| R9 | recall | mcq | −0.4 | The L1 (Manhattan) norm of v=(v₁,…,vₙ) is: | Σ\|vᵢ\|, the sum of absolute values | describes it as √(Σvᵢ²), which is actually the L2 (Euclidean) norm → `vector-norm` |
| R10 | recall | short-answer | −0.35 | State the homogeneity axiom of a norm as an equation. | ‖cv‖ = \|c\|‖v‖, for any scalar c | — |
| R11 | recall | numeric | −0.3 | What is ‖0‖, the norm of the zero vector? `[verified: 0]` | 0 | — |
| R12 | recall | mcq | −0.25 | True or false: the L2 norm and the L1 norm generally give different values for the same vector. | true | answers "false," claiming all norms of a given vector must coincide → `vector-norm` |
| R13 | recall | short-answer | −0.2 | What does the "definiteness" axiom of a norm add, beyond mere nonnegativity? | ‖v‖=0 must imply v is the zero vector — not merely that ‖v‖ can't be negative | — |
| R14 | recall | mcq | −0.15 | Which of these is NOT one of a norm's three defining axioms? | exact additivity, ‖u+v‖=‖u‖+‖v‖ — the actual axiom is the weaker triangle inequality, ‖u+v‖≤‖u‖+‖v‖ | picks homogeneity as the non-axiom, when homogeneity is in fact one of the three required properties → `vector-norm` |
| R15 | recall | short-answer | −0.1 | How does "normalizing" a vector differ from "negating" it? | normalizing rescales a vector to have norm 1 while preserving its direction (dividing by its own norm); negating flips a vector's direction by multiplying by −1, without changing its length at all | — |
| R16 | recall | mcq | −0.05 | The relationship between the dot product and the Euclidean norm is: | ‖v‖² = v·v | states ‖v‖ = v·v directly, omitting the square root that the norm's own definition requires → `vector-norm` |
| A2 | apply | numeric | 0.1 | v=(6,8). Compute ‖v‖. `[verified: 10]` | √(36+64) = 10 | — |
| A3 | apply | numeric | 0.2 | v=(1,2,2). Compute ‖v‖. `[verified: 3]` | √(1+4+4) = 3 | — |
| A4 | apply | numeric | 0.3 | v=(0,−5). Normalize v to a unit vector. `[verified: (0,−1)]` | ‖v‖=5, so v/‖v‖ = (0,−1) | — |
| A5 | apply | numeric | 0.4 | v=(2,−2,1). Compute both the L1 norm and the L2 norm, and compare. `[verified: L1=5, L2=3]` | L1 = \|2\|+\|−2\|+\|1\| = 5; L2 = √(4+4+1) = 3; the L1 value is larger | — |
| A6 | apply | short-answer | 0.5 | v=(3,0,4). Verify ‖v‖² = v·v. `[verified: both 25]` | v·v = 9+0+16 = 25; ‖v‖=5, so ‖v‖² = 25 — they match | — |
| E2 | explain | short-answer | 0.79 | Why does ‖v‖=√(v·v) require v·v≥0, and what guarantees that? | the square root of a negative number isn't real, so the norm formula is only well-defined because v·v is always ≥0 — a sum of squares, per `dot-product`'s own nonnegativity result — so the norm's well-definedness relies directly on that earlier fact *(required: the explicit dependence on v·v≥0)* | — |
| E3 | explain | short-answer | 0.89 | Why does the definiteness axiom (‖v‖=0 ⟹ v=0) matter for using a norm to measure "distance to the origin"? | without definiteness, a nonzero vector could have norm 0, meaning distinct points could be treated as "the same distance" (zero) from the origin as the origin itself; definiteness is exactly what rules out this degenerate collapse and makes ‖v‖ a genuine distance measure *(required: the explicit degenerate-collapse scenario)* | — |
| E4 | explain | derivation | 0.99 | Derive ‖cv‖=\|c\|‖v‖ starting from ‖cv‖=√((cv)·(cv)). | (cv)·(cv) = c²(v·v), pulling the scalar c out of each factor of the dot product; so ‖cv‖=√(c²(v·v))=√(c²)·√(v·v)=\|c\|·‖v‖, using √(c²)=\|c\| *(required: the explicit c² factoring and the √(c²)=\|c\| step)* | — |
| E5 | explain | short-answer | 1.09 | Why is the L1 norm always at least as large as the L2 norm for the same vector with more than one nonzero component? | the L1 norm sums the absolute values directly, while the L2 norm squares each term, sums them, and takes a single square root; the squaring-then-single-root process effectively "discounts" a magnitude spread across multiple components relative to L1's direct sum, so L1≥L2 for any vector with more than one nonzero entry *(required: contrasts the direct-sum and square-then-root mechanisms)* | — |
| T2 | transfer | short-answer | 1.29 | In word embeddings, cosine similarity normalizes both vectors before taking their dot product. Why does that normalization step matter? | the raw dot product is influenced by both direction and magnitude, so a longer embedding vector could produce a larger dot product purely from its size, not genuine similarity of meaning; dividing each vector by its own norm removes the magnitude factor entirely, leaving a similarity score that reflects only the angle between the vectors *(required: names magnitude as the confound normalization removes)* | — |
| T3 | transfer | short-answer | 1.39 | Why might an optimization algorithm monitor ‖∇L‖, the norm of the loss gradient, as a stopping criterion, rather than watching each partial derivative separately? | the norm collapses an entire vector of partial derivatives into a single nonnegative number summarizing how far the current parameters are from a stationary point; checking every component separately would require tracking many numbers each iteration, while the single scalar — which reaches exactly 0 at a critical point, by the definiteness axiom (R4) — gives one clean, interpretable stopping signal *(required: connects the stopping criterion to the definiteness axiom)* | — |

*Coverage: 16/6/5/3 — 30 items, −0.75…1.39.*

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
| R3 | recall | short-answer | −0.65 | Fill in the blank: Cauchy-Schwarz states \|u·v\| ≤ ___. | ‖u‖‖v‖ | — |
| R4 | recall | mcq | −0.6 | Cauchy-Schwarz holds for: | any vectors u, v in an inner product space, not only in R² or R³ | claims it holds only for two-dimensional vectors, missing the inequality's full generality → `cauchy-schwarz` |
| R5 | recall | mcq | −0.55 | True or false: Cauchy-Schwarz is proved using a quadratic-in-t discriminant argument. | true | answers "false," missing the specific discriminant-trick proof technique E1 walks through → `cauchy-schwarz` |
| R6 | recall | short-answer | −0.5 | What must be true of u and v for equality to hold in Cauchy-Schwarz? | u and v must be parallel — one is a scalar multiple of the other | — |
| R7 | recall | mcq | −0.4 | Cauchy-Schwarz directly implies which bound on the cosine formula u·v/(‖u‖‖v‖)? | it always lies in [−1, 1] | claims the ratio can exceed 1 in magnitude for sufficiently large vectors, missing that Cauchy-Schwarz rules this out regardless of scale → `cauchy-schwarz` |
| R8 | recall | short-answer | −0.35 | Fill in the blank: the quadratic in t used in the proof is ‖u−tv‖² ≥ ___. | 0 | — |
| R9 | recall | mcq | −0.3 | The discriminant of a quadratic at²+bt+c that is never negative must satisfy: | b²−4ac ≤ 0 | claims the discriminant must satisfy b²−4ac ≥ 0, the opposite of the condition that keeps a quadratic from ever going negative → `cauchy-schwarz` |
| R10 | recall | short-answer | −0.25 | In the proof, what does expanding ‖u−tv‖² produce? | a quadratic in t: ‖u‖² − 2t(u·v) + t²‖v‖² | — |
| R11 | recall | mcq | −0.2 | Which of these is a consequence of Cauchy-Schwarz, established in a later concept? | the triangle inequality for the norm | claims Cauchy-Schwarz is itself a consequence of the triangle inequality, reversing the actual logical dependency E5 establishes → `cauchy-schwarz` |
| R12 | recall | mcq | −0.15 | True or false: \|u·v\| can exceed ‖u‖‖v‖ for some vectors. | false | answers "true," directly contradicting the inequality itself → `cauchy-schwarz` |
| R13 | recall | short-answer | −0.1 | What famous statistical bound is a direct instance of Cauchy-Schwarz? | the bound ρ∈[−1,1] for the correlation coefficient | — |
| R14 | recall | mcq | −0.05 | Cauchy-Schwarz being an inequality, rather than always an equality, reflects the fact that: | u and v need not be parallel in general | claims it reflects that dot products can be negative, an unrelated property that has nothing to do with why the bound isn't always tight → `cauchy-schwarz` |
| R15 | recall | short-answer | 0.0 | Why must ‖v‖≠0 for the standard cosine formula u·v/(‖u‖‖v‖) to make sense? | dividing by ‖v‖=0 is undefined; the formula requires both norms to be nonzero | — |
| R16 | recall | mcq | 0.05 | The Cauchy-Schwarz inequality relates: | \|u·v\| to the product of the two norms, ‖u‖‖v‖ | claims it relates ‖u+v‖ to ‖u‖+‖v‖, describing the triangle inequality instead of Cauchy-Schwarz → `cauchy-schwarz` |
| A2 | apply | numeric | 0.2 | u=(2,0), v=(0,3). Verify Cauchy-Schwarz numerically. `[verified: 0 ≤ 6]` | u·v=0; ‖u‖‖v‖=2×3=6; 0≤6 ✓ | — |
| A3 | apply | numeric | 0.3 | u=(1,1), v=(1,1). Verify the equality case. `[verified: 2=2]` | u·v=2; ‖u‖‖v‖=√2×√2=2 — equal, confirming equality when the vectors coincide (a special case of parallel) | — |
| A4 | apply | numeric | 0.4 | u=(3,4), v=(6,8) (v=2u, parallel). Verify equality holds. `[verified: 50=50]` | u·v=18+32=50; ‖u‖=5, ‖v‖=10, so ‖u‖‖v‖=50 — equal | — |
| A5 | apply | numeric | 0.5 | u=(1,0,0), v=(0,1,0). Verify Cauchy-Schwarz and note how far from equality it is. `[verified: 0 ≤ 1]` | u·v=0; ‖u‖‖v‖=1; 0≤1 — orthogonal vectors sit at the *loosest* extreme of the inequality, far from equality | — |
| A6 | apply | numeric | 0.6 | u=(2,−1), v=(−4,2) (v=−2u, parallel but opposite direction). Does equality still hold, using \|u·v\|? `[verified: 10=10]` | u·v=−10, so \|u·v\|=10; ‖u‖=√5, ‖v‖=2√5, so ‖u‖‖v‖=10 — equal, since the absolute value makes equality hold for parallel vectors in either direction | — |
| E2 | explain | short-answer | 0.9 | Why does the discriminant proof of Cauchy-Schwarz work for *any* real t, not just a cleverly chosen one? | the argument only uses that ‖u−tv‖²≥0 holds for every real t, since it's a squared norm — automatically true regardless of which t is plugged in; the discriminant condition then follows purely from that universal nonnegativity, with no need to identify any particular optimal t *(required: names that the argument holds for every t, not a chosen one)* | — |
| E3 | explain | short-answer | 1.0 | Why does equality in Cauchy-Schwarz correspond exactly to the discriminant being zero, rather than merely small? | a discriminant of exactly zero is precisely the condition under which the quadratic ‖u−tv‖² touches zero at some t (a repeated root), meaning u−tv=0 for that t, i.e. u is exactly tv; any strictly negative discriminant means the quadratic stays strictly positive for every t, so u−tv is never the zero vector *(required: connects the repeated-root condition to u−tv=0 exactly)* | — |
| E4 | explain | derivation | 1.1 | Show Cauchy-Schwarz reduces trivially to an equality when v is the zero vector. | if v=0, then u·v=0 and ‖v‖=0, so both sides of \|u·v\|≤‖u‖‖v‖ become 0≤0 — a trivial equality regardless of u; this is a degenerate edge case still covered by the general "u,v parallel" equality condition, since the zero vector is a scalar multiple (c=0) of any vector *(required: identifies the zero vector as a degenerate case of the parallel condition)* | — |
| E5 | explain | short-answer | 1.2 | Why is Cauchy-Schwarz considered more fundamental than the triangle inequality, rather than the reverse? | the triangle inequality ‖u+v‖≤‖u‖+‖v‖ is proved *using* Cauchy-Schwarz, to bound the cross term u·v in the expansion of ‖u+v‖²; Cauchy-Schwarz is therefore logically prior — it supplies the key tool the triangle inequality's own proof depends on *(required: names the cross-term-bounding role Cauchy-Schwarz plays in that proof)* | — |
| T2 | transfer | short-answer | 1.4 | Why does Cauchy-Schwarz guarantee Pearson's r can never exceed 1 in absolute value? | treating the deviation vectors (xᵢ−x̄) and (yᵢ−ȳ) as ordinary vectors, r is exactly their normalized dot product, u·v/(‖u‖‖v‖); Cauchy-Schwarz guarantees any such ratio lies in [−1,1], so r can never exceed 1 in absolute value — a purely algebraic fact underlying a statistical guarantee *(required: the explicit vectors-as-deviations identification)* | — |
| T3 | transfer | short-answer | 1.5 | Support vector machines bound a classification margin using ‖w‖, the norm of the decision boundary's normal vector. Where does a Cauchy-Schwarz-style bound naturally arise in that geometry? | the margin computation projects the difference between two class-boundary points onto the direction of w — a dot-product-based quantity — so any argument bounding that projected distance uses exactly the \|·\|≤‖·‖‖·‖ structure of Cauchy-Schwarz to relate a raw dot product to the lengths of the vectors involved *(required: names the projection step as where the dot-product bound is applied)* | — |

*Coverage: 16/6/5/3 — 30 items, −0.65…1.5.*

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
| R3 | recall | short-answer | −0.55 | Fill in the blank: cos θ = ___. | u·v/(‖u‖‖v‖) | — |
| R4 | recall | mcq | −0.5 | The angle between two vectors is defined to lie in the range: | [0°, 180°] | claims the range is [0°, 360°], as if the formula could distinguish a "clockwise" from a "counterclockwise" angle → `vector-angles` |
| R5 | recall | mcq | −0.45 | True or false: the angle between a vector and itself is always 0°. | true | answers "false," missing that cos θ=u·u/(‖u‖‖u‖)=1 forces θ=0° whenever u is compared with itself → `vector-angles` |
| R6 | recall | short-answer | −0.4 | What operation recovers θ itself from a computed cos θ value? | taking the arccosine (inverse cosine) of the value | — |
| R7 | recall | mcq | −0.3 | If u and v point in exactly opposite directions (u=−cv for c>0), the angle between them is: | 180° | answers 90°, confusing "opposite direction" with "perpendicular" → `vector-angles` |
| R8 | recall | short-answer | −0.25 | Fill in the blank: if u·v>0, the angle between u and v is ___ than 90°. | less (the angle is acute) | — |
| R9 | recall | mcq | −0.2 | If u·v<0, the angle between u and v is: | obtuse — greater than 90° | claims a negative dot product still means an acute angle, missing the sign-of-cosine relationship altogether → `vector-angles` |
| R10 | recall | short-answer | −0.15 | Why is the angle between two vectors undefined if one of them is the zero vector? | the formula divides by ‖u‖‖v‖, and the zero vector has norm 0, making the denominator 0 and the expression undefined | — |
| R11 | recall | mcq | −0.1 | If u and v point in exactly the same direction (u=cv for c>0), the angle between them is: | 0° | answers 90°, confusing "same direction" with "perpendicular" → `vector-angles` |
| R12 | recall | mcq | −0.05 | True or false: the angle formula requires u and v to have the same dimension. | true | answers "false," forgetting that both the dot product and the norms it uses require matching dimensions → `vector-angles` |
| R13 | recall | short-answer | 0.0 | What sign relationship holds between cos θ and u·v, for nonzero u, v? | they always share the same sign, since ‖u‖‖v‖>0 | — |
| R14 | recall | mcq | 0.05 | The formula cos θ=u·v/(‖u‖‖v‖) generalizes which familiar geometry result? | the 2D/3D law-of-cosines-based angle formula, now stated for any dimension n | names the Pythagorean theorem as what it generalizes, an unrelated identity about right triangles → `vector-angles` |
| R15 | recall | short-answer | 0.1 | Is the angle between u and v the same as the angle between v and u? | yes — both the dot product and the product of norms in the formula are symmetric in u and v | — |
| R16 | recall | mcq | 0.15 | An angle of exactly 90° between two nonzero vectors is equivalent to which earlier condition? | `orthogonal-vectors`'s u·v=0 | claims a 90° angle corresponds to ‖u‖=‖v‖, confusing orthogonality with equal length → `vector-angles` |
| A2 | apply | numeric | 0.3 | u=(1,0), v=(0,−1). Find the angle between them. `[verified: 90°]` | cos θ = 0/(1×1) = 0, so θ=90° | — |
| A3 | apply | numeric | 0.4 | u=(1,1), v=(−1,−1). Find the angle between them. `[verified: 180°]` | cos θ = (−1−1)/(√2×√2) = −1, so θ=180° | — |
| A4 | apply | numeric | 0.5 | u=(1,0), v=(1,0). Find the angle between them. `[verified: 0°]` | cos θ = 1/(1×1) = 1, so θ=0° | — |
| A5 | apply | numeric | 0.6 | u=(1,√3), v=(1,0). Find the angle between them. `[verified: 60°]` | ‖u‖=2, dot=1, so cos θ = 1/2, giving θ=60° | — |
| A6 | apply | short-answer | 0.7 | u=(3,4), v=(6,8) (v=2u). Find the angle between them, and explain why it's exactly 0° despite the vectors having different lengths. `[verified: 0°]` | θ=0° — v is a positive scalar multiple of u (same direction); the angle formula depends only on direction, not magnitude, since both vectors are normalized by their own norms | — |
| E2 | explain | short-answer | 1.0 | Why can cos θ, computed from the vector-angle formula, never fall outside [−1,1]? | this is exactly Cauchy-Schwarz: \|u·v\|≤‖u‖‖v‖, divided through by ‖u‖‖v‖>0, gives \|cos θ\|≤1 automatically for any nonzero u, v *(required: the explicit division-by-‖u‖‖v‖ connection to Cauchy-Schwarz)* | — |
| E3 | explain | short-answer | 1.1 | Why is the angle between two vectors always taken in [0°,180°] rather than allowing negative angles or angles beyond 180°? | cosine is symmetric (cos(−θ)=cos θ) and periodic, so a single cos θ value corresponds to infinitely many possible angles; restricting to [0°,180°], where cosine is one-to-one, is what lets arccos return a single, unambiguous angle from a given cosine value *(required: the one-to-one-on-[0°,180°] argument)* | — |
| E4 | explain | derivation | 1.2 | Verify, using the cosine formula, that swapping u and v gives the same angle. | cos θ_uv = u·v/(‖u‖‖v‖) and cos θ_vu = v·u/(‖v‖‖u‖); since u·v=v·u (dot product commutativity) and ‖u‖‖v‖=‖v‖‖u‖, the two expressions are identical, so θ_uv=θ_vu *(required: the explicit commutativity argument on both the numerator and denominator)* | — |
| E5 | explain | short-answer | 1.3 | Why does a small (but nonzero) ‖u‖ or ‖v‖ not make the computed angle unreliable, whereas a norm of *exactly* zero does? | the formula genuinely normalizes by both norms, so any nonzero magnitude — however small — still yields a well-defined ratio in [−1,1]; only when a norm is exactly zero does the division become undefined, since there's then no well-defined direction to measure an angle from at all *(required: the exactly-zero-vs-small-but-nonzero distinction)* | — |
| T2 | transfer | short-answer | 1.5 | In cosine-similarity document retrieval, why does the *angle* between two TF-IDF vectors matter more than their raw magnitudes for judging topical similarity? | two documents on the same topic, one much longer than the other, produce TF-IDF vectors pointing in similar directions but with very different magnitudes (word counts scale with length); using the angle rather than a raw distance metric focuses on the *pattern* of relative word usage, correctly ranking them as topically similar regardless of length *(required: names magnitude-vs-direction as the source of the length confound)* | — |
| T3 | transfer | short-answer | 1.6 | PCA finds mutually orthogonal principal-component directions. Using this concept's formula, what does "orthogonal directions" guarantee about the angle between any two distinct components? | it guarantees the angle between any two distinct principal-component directions is exactly 90° — orthogonality is u·v=0, which by this concept's formula corresponds to cos θ=0, i.e. θ=90° exactly, not merely approximately close to it *(required: names the exact, not approximate, 90° conclusion)* | — |

*Coverage: 16/6/5/3 — 30 items, −0.55…1.6.*

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
| R3 | recall | short-answer | −0.65 | Fill in the blank: proj_v(u) = ___. | (u·v/‖v‖²)·v | — |
| R4 | recall | mcq | −0.6 | The "scalar projection" of u onto v (the component of u along v) is: | u·v/‖v‖ — a number, not a vector | claims the scalar projection is itself a vector, confusing it with the vector projection proj_v(u) → `vector-projection` |
| R5 | recall | mcq | −0.55 | True or false: proj_v(u) always points in the same direction as v, or its exact opposite. | true | answers "false," missing that proj_v(u) is by construction a scalar multiple of v → `vector-projection` |
| R6 | recall | short-answer | −0.5 | What condition must v satisfy for proj_v(u) to be defined? | v must be nonzero, since the formula divides by ‖v‖² | — |
| R7 | recall | mcq | −0.4 | proj_v(u), when v is a unit vector (‖v‖=1), simplifies to: | (u·v)v — the ‖v‖² denominator becomes 1 | keeps a ‖v‖² in the denominator even after specifying ‖v‖=1, missing that it simplifies away → `vector-projection` |
| R8 | recall | short-answer | −0.35 | Fill in the blank: the vector u−proj_v(u) is called the ___ of u relative to v. | orthogonal component (or the rejection) | — |
| R9 | recall | mcq | −0.3 | proj_v(v), the projection of v onto itself, equals: | v | claims proj_v(v) equals the zero vector, missing that a vector projected onto its own direction gives itself back exactly → `vector-projection` |
| R10 | recall | short-answer | −0.25 | Why does proj_v(u) use ‖v‖² (not ‖v‖) in its denominator? | one factor of ‖v‖ normalizes the direction of v, and the second accounts for the extra ‖v‖ implicitly carried by the numerator's v-scaled term — together they leave exactly the right scalar coefficient on v | — |
| R11 | recall | mcq | −0.2 | If u·v=0, then proj_v(u) equals: | the zero vector | claims proj_v(u) equals u itself whenever u·v=0, the opposite of the correct behavior when u has no component along v at all → `vector-projection` |
| R12 | recall | mcq | −0.15 | True or false: proj_v(u) and proj_u(v) are generally the same vector. | false | answers "true," missing that the two projections generally point along different lines (v's line versus u's line) and have different lengths → `vector-projection` |
| R13 | recall | short-answer | −0.1 | What is proj_v(cu), for a scalar c, in terms of proj_v(u)? | c·proj_v(u) — projection is linear in u | — |
| R14 | recall | mcq | −0.05 | The "shadow" interpretation of proj_v(u) refers to: | the shadow u casts onto the line through v, under light shining perpendicular to v | describes it as "the shadow v casts onto u," reversing which vector is being cast and which is the target line → `vector-projection` |
| R15 | recall | short-answer | 0.0 | What is ‖proj_v(u)‖ equal to, in terms of the angle θ between u and v? | ‖u‖\|cos θ\| | — |
| R16 | recall | mcq | 0.05 | proj_v(u) has the same length as u exactly when: | u is already parallel to v (θ=0° or 180°) | claims proj_v(u) always has the same length as u regardless of the angle between them, missing R15's cos θ factor → `vector-projection` |
| A2 | apply | numeric | 0.2 | u=(0,5), v=(1,0). Find proj_v(u). `[verified: (0,0)]` | u·v=0, so proj_v(u) = (0,0) | — |
| A3 | apply | numeric | 0.3 | u=(2,2), v=(1,0). Find proj_v(u). `[verified: (2,0)]` | u·v=2, ‖v‖²=1, so proj_v(u) = 2(1,0) = (2,0) | — |
| A4 | apply | numeric | 0.4 | u=(4,0), v=(0,2). Find proj_v(u). `[verified: (0,0)]` | u·v=0, so proj_v(u) = (0,0) | — |
| A5 | apply | numeric | 0.5 | u=(1,2,2), v=(0,0,3). Find proj_v(u). `[verified: (0,0,2)]` | u·v=6, ‖v‖²=9, so proj_v(u) = (6/9)(0,0,3) = (0,0,2) | — |
| A6 | apply | short-answer | 0.6 | u=(3,4), v=(3,4) (u=v exactly). Find proj_v(u), and verify it equals u. `[verified: (3,4)]` | u·v=25, ‖v‖²=25, so proj_v(u) = (25/25)(3,4) = (3,4) = u | — |
| E2 | explain | short-answer | 0.9 | Why is proj_v(u) linear in u — proj_v(cu)=c·proj_v(u) and proj_v(u+w)=proj_v(u)+proj_v(w)? | the formula (u·v/‖v‖²)v depends on u only through the dot product u·v in the numerator, and the dot product is linear in its first argument, so any linearity property of the dot product (scaling, additivity) carries straight through to the projection formula *(required: traces the linearity back to the dot product's own linearity)* | — |
| E3 | explain | short-answer | 1.0 | Why does u−proj_v(u) end up orthogonal to v, using the defining property from E1 directly? | this is exactly how proj_v(u) is derived in E1: c is chosen precisely so that (u−cv)·v=0, i.e. so the leftover vector is orthogonal to v — orthogonality isn't a separate fact to prove here, it's the equation that defines c in the first place *(required: names orthogonality as the defining equation, not a derived consequence)* | — |
| E4 | explain | derivation | 1.1 | Show proj_v(u) is itself orthogonal to the leftover piece u−proj_v(u). | proj_v(u)=cv for c=u·v/‖v‖², and (u−cv)·v=0 by E1's derivation; so (u−cv)·(cv) = c[(u−cv)·v] = c×0 = 0 — the projection and the orthogonal leftover are themselves orthogonal to each other *(required: the explicit factoring of c out of the dot product)* | — |
| E5 | explain | short-answer | 1.2 | Why does proj_v(proj_v(u)) = proj_v(u) — projecting an already-projected vector onto v again changes nothing? | proj_v(u) is already a scalar multiple of v, say cv; projecting cv onto v gives ((cv)·v/‖v‖²)v = c(‖v‖²/‖v‖²)v = cv, the same vector — projection is idempotent once a vector already lies exactly along the target direction *(required: the explicit substitution showing the ‖v‖² factors cancel)* | — |
| T2 | transfer | short-answer | 1.4 | Gram-Schmidt orthogonalization repeatedly subtracts a projection from a vector to build an orthogonal basis. Why is subtracting proj_v(u) from u, rather than some other multiple of v, the right amount to remove? | subtracting exactly proj_v(u) is precisely what E1's derivation shows leaves a result orthogonal to v; any other multiple of v would leave a nonzero component still along v, so Gram-Schmidt's guarantee of producing an orthogonal set depends on removing exactly this amount, no more and no less *(required: connects the exact amount removed to E1's orthogonality-defining equation)* | — |
| T3 | transfer | short-answer | 1.5 | In simple linear regression, the slope can be derived by projecting the response y onto the (centered) predictor x. What is "projected away," and what does it correspond to statistically? | the leftover piece y−proj_x(y) is what's projected away — the part of y that cannot be explained by a linear relationship with x — and this leftover is exactly the residual vector, orthogonal to x by construction, matching this concept's own T1 connection to OLS residuals *(required: names the leftover as the residual vector specifically)* | — |

*Coverage: 16/6/5/3 — 30 items, −0.65…1.5.*

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
| R3 | recall | short-answer | −0.76 | Fill in the blank: u and v are orthogonal if and only if u·v = ___. | 0 | — |
| R4 | recall | mcq | −0.71 | A set of vectors that are pairwise orthogonal AND each have norm 1 is called: | an orthonormal set | calls it simply "an orthogonal set," dropping the unit-norm requirement that distinguishes orthonormal from merely orthogonal → `orthogonal-vectors` |
| R5 | recall | mcq | −0.66 | True or false: ‖u+v‖²=‖u‖²+‖v‖² holds when u and v are orthogonal. | true | answers "false," missing the generalized Pythagorean identity that orthogonality guarantees → `orthogonal-vectors` |
| R6 | recall | short-answer | −0.61 | Is the zero vector orthogonal to itself? | yes — 0·0=0, satisfying the definition | — |
| R7 | recall | mcq | −0.5 | An "orthogonal set," distinct from an "orthonormal set," need not have: | unit norm — orthogonal vectors can have any nonzero length | claims an orthogonal set must still have all vectors of equal (though not necessarily unit) length, an extra requirement the definition doesn't impose → `orthogonal-vectors` |
| R8 | recall | short-answer | −0.45 | A maximal set of mutually orthogonal nonzero vectors that spans the space is called an ___. | orthogonal basis | — |
| R9 | recall | mcq | −0.4 | For more than two vectors, "mutually orthogonal" means: | every pair among them has a zero dot product | claims it means only that consecutive vectors in some listed order are orthogonal, missing that *every* pair must satisfy the condition → `orthogonal-vectors` |
| R10 | recall | short-answer | −0.35 | What special role do the standard basis vectors e₁,…,eₙ play with respect to orthogonality? | they are pairwise orthogonal and each has norm 1, so together they form an orthonormal basis | — |
| R11 | recall | mcq | −0.3 | Orthogonal vectors are automatically: | linearly independent, provided they are all nonzero | claims orthogonal vectors are automatically a spanning set for the whole space, an unrelated (and generally false, unless there are enough of them) property → `orthogonal-vectors` |
| R12 | recall | mcq | −0.25 | True or false: any two non-parallel vectors in R² must be orthogonal. | false | answers "true," missing that non-parallel vectors can meet at any angle strictly between 0° and 180°, not only 90° → `orthogonal-vectors` |
| R13 | recall | short-answer | −0.2 | What is the "orthogonal complement" of a set of vectors, informally? | the set of all vectors orthogonal to every vector in the original set | — |
| R14 | recall | mcq | −0.15 | Which pair is guaranteed orthogonal, for any nonzero vector v=(a,b) in R²? | v and its 90°-rotation (−b, a) | pairs v with its own negation, −v, which is parallel (not orthogonal) to v → `orthogonal-vectors` |
| R15 | recall | short-answer | −0.1 | Does orthogonality require both vectors to have the same dimension? | yes — orthogonality is defined via the dot product, which itself requires matching dimensions | — |
| R16 | recall | mcq | −0.05 | Two orthogonal nonzero vectors necessarily have an angle between them of: | 90° | claims the angle could be anywhere in [0°,180°] depending on the vectors' lengths, missing that orthogonality fixes the angle exactly → `orthogonal-vectors` |
| A2 | apply | short-answer | 0.1 | Verify (2,0,0) and (0,3,0) are orthogonal. `[verified: dot=0]` | dot product = 0+0+0 = 0 ✓ | — |
| A3 | apply | numeric | 0.2 | u=(1,1,1), v=(1,−2,1). Are they orthogonal? `[verified: dot=0]` | dot product = 1−2+1 = 0, so yes | — |
| A4 | apply | short-answer | 0.3 | u=(3,4). Find a nonzero vector orthogonal to u. `[verified: 3(−4)+4(3)=0]` | e.g. (−4,3) — its 90° rotation; dot with u is 3(−4)+4(3) = −12+12 = 0 | — |
| A5 | apply | numeric | 0.4 | u=(3,0), v=(0,4) (orthogonal). Verify ‖u+v‖²=‖u‖²+‖v‖². `[verified: 25=25]` | u+v=(3,4), so ‖u+v‖²=9+16=25; ‖u‖²+‖v‖²=9+16=25 — they match | — |
| A6 | apply | short-answer | 0.5 | Are (1,2) and (2,4) orthogonal? `[verified: dot=10]` | no — their dot product is 2+8=10≠0; in fact these two vectors are parallel, not orthogonal | — |
| E2 | explain | short-answer | 0.79 | Why is the zero vector considered orthogonal to every vector, including itself, rather than treated as an exception? | the definition u·v=0 is a purely algebraic condition, and 0·v=0 for literally every v, since every term in the dot-product sum is 0 times something — the zero vector satisfies the orthogonality condition against any vector with no special-casing needed *(required: the explicit 0·v=0 argument)* | — |
| E3 | explain | derivation | 0.89 | Prove ‖u+v‖²=‖u‖²+‖v‖² when u·v=0, expanding from the dot product. | ‖u+v‖² = (u+v)·(u+v) = u·u + 2u·v + v·v = ‖u‖² + 2(0) + ‖v‖² = ‖u‖²+‖v‖², since the cross term vanishes exactly when u and v are orthogonal *(required: the full expansion showing the cross term is what orthogonality kills)* | — |
| E4 | explain | short-answer | 0.94 | Why does an orthonormal set carry more information than a merely orthogonal set, for representing a vector's coordinates? | with an orthonormal basis, the coefficient of each basis vector in a linear combination comes directly from a dot product (v·eᵢ), with no extra division needed since ‖eᵢ‖²=1 already; a merely orthogonal (non-unit) basis requires an extra normalization step — dividing by each basis vector's squared norm — to extract the same coefficients *(required: names the extra normalization step orthogonal-but-not-orthonormal bases require)* | — |
| E5 | explain | short-answer | 1.04 | Why does orthogonality, unlike parallelism or correlation, not come in degrees? | orthogonality is defined by the single equation u·v=0, a sharp yes/no algebraic condition with no notion of "partial" satisfaction; u·v is either exactly zero or it is some nonzero number, with nothing in between counting as orthogonal, unlike a continuously varying quantity such as cosine similarity *(required: contrasts the binary condition against a continuously varying alternative)* | — |
| T2 | transfer | short-answer | 1.29 | Fourier series decompose a function into orthogonal sine/cosine components. Why does orthogonality, rather than mere linear independence, make it easy to compute each component's coefficient? | with an orthogonal (or orthonormal) basis, projecting the target function onto each basis component isolates that component's coefficient directly via a single inner product, with no cross-contamination from the other components, since their dot products with each other vanish structurally; a merely linearly independent but non-orthogonal basis would require solving a full linear system to disentangle the coefficients instead *(required: contrasts the direct-projection route against solving a linear system)* | — |
| T3 | transfer | short-answer | 1.39 | An orthogonal matrix Q has pairwise orthonormal columns. Using this concept's Pythagorean identity, explain why multiplying a vector by Q never changes its length. | for orthonormal columns, ‖Qx‖² expands (via the dot product) into a sum where every cross term between distinct columns vanishes (orthogonality) and every squared term keeps coefficient 1 (unit norm) — collapsing exactly to ‖x‖², the same generalized-Pythagorean cancellation E3 established for two vectors, now applied across every pair of Q's columns at once *(required: connects the length-preservation directly to E3's cross-term cancellation)* | — |

*Coverage: 16/6/5/3 — 30 items, −0.76…1.39.*

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
| distributive law over scalar addition dropped, i.e. (c+d)u treated as cdu | `vector-operations` |
| dot product treated as vector-valued rather than scalar | `dot-product` |
| L1 and L2 norms conflated as always equal | `vector-norm` |
| Cauchy-Schwarz's logical dependency reversed (treated as a consequence of the triangle inequality) | `cauchy-schwarz` |
| "same direction" and "perpendicular" angle conditions swapped | `vector-angles` |
| scalar projection confused with vector projection | `vector-projection` |
| orthogonal set required to have unit norm, conflating it with orthonormal | `orthogonal-vectors` |

**Cluster total: 240 items across 8 concepts, 30 per concept.** All numeric claims verified by
script (Cauchy-Schwarz equality cases, projection formulas, ANOVA-style Pythagorean checks included).
The Cauchy-Schwarz / correlation connection, threaded through `cauchy-schwarz` and `vector-angles`, is
the standout cross-domain result in this cluster.
