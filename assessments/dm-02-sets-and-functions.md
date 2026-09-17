# Discrete Math Cluster 2 — Sets & Functions

Power Set → Cardinality & Countability (7 new concepts). Same table format as the other discrete-math
and probability/statistics clusters (e.g. [la-01-vectors-and-operations.md](la-01-vectors-and-operations.md)),
run at 5 items per concept. `set-theory` is the root of this cluster but is **not** re-covered here —
its items already exist in [foundations-of-probability.md](foundations-of-probability.md) under
`## Set Theory (`set-theory`)`, authored before the domain move to `discrete-math`. That section
remains the authored reference for `set-theory`'s scope; this file starts one level below it.

---

## Power Set (`power-set`)
*Prereq: Set Theory · ancestors 1 · b₀ = −0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.30 | Define the power set P(S) of a set S, and give the formula for \|P(S)\| in terms of \|S\|. | P(S) = the set of *all* subsets of S, including ∅ and S itself; \|P(S)\| = 2^{\|S\|} | — |
| R2 | recall | mcq | −1.05 | S = {a, b}. Which of the following is *not* a valid element of P(S)? | the bare element `a` (not wrapped as a set) | picks ∅, treating the empty set as somehow not a legitimate subset → `power-set` |
| A1 | apply | numeric | −0.55 | S = {1, 2, 3}. Compute \|P(S)\| and list every element of P(S). `[verified: 8]` | \|P(S)\| = 2³ = 8; P(S) = {∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}} | forgets ∅ or S itself when listing, undercounting → `power-set` |
| E1 | explain | derivation | 0.20 | Prove \|P(S)\| = 2ⁿ for \|S\| = n by exhibiting a bijection between P(S) and the set of length-n binary strings. | map each subset A ⊆ S to its indicator string, where position i is 1 iff the i-th element of S is in A; this is a bijection because every subset determines a unique string and every string determines a unique subset (include element i iff position i is 1) *(required: the bijection stated in both directions, not just "there are 2 choices per element")* | asserts 2ⁿ by a hand-wavy "each element is in or out" without the bijection → `power-set` |
| T1 | transfer | short-answer | 0.70 | A system has n independent boolean feature flags. Explain why the number of distinct configurations of the whole system equals \|P(S)\| for S = the set of flags, and why this is the same count as the number of n-bit binary numbers. | a configuration is exactly a choice of which flags are "on," i.e. a subset of the flag set S — so configurations correspond one-to-one with elements of P(S); reading "on/off" as 1/0 per flag reproduces exactly the indicator-string bijection from E1, so both counts are 2ⁿ *(required: names the subset-as-configuration correspondence explicitly)* | — |

*Coverage: 5 items, −1.30…0.70.*

---

## Cartesian Product (`cartesian-product`)
*Prereq: Set Theory · ancestors 1 · b₀ = −0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.30 | Define the Cartesian product A × B. | A × B = {(a, b) : a ∈ A, b ∈ B} — the set of all *ordered* pairs with first coordinate from A and second from B | — |
| R2 | recall | mcq | −1.05 | Which statement about A × B is *false* in general? | A × B = B × A | assumes the product is commutative like ∪ or ∩, missing that pair order matters → `cartesian-product` |
| A1 | apply | numeric | −0.55 | A = {1, 2}, B = {x, y, z}. Compute \|A × B\| and list its elements. `[verified: 6]` | \|A×B\| = 2·3 = 6; A×B = {(1,x),(1,y),(1,z),(2,x),(2,y),(2,z)} | — |
| E1 | explain | derivation | 0.20 | Prove \|A × B\| = \|A\|·\|B\| for finite sets, using the rule of product. | for each of the \|A\| choices of first coordinate, there are exactly \|B\| independent choices of second coordinate that pair with it, and no pair is double-counted since the coordinates are ordered — summing \|B\| copies over the \|A\| choices gives \|A\|·\|B\| *(required: the independent-choice argument, not just citing the formula)* | — |
| T1 | transfer | short-answer | 0.70 | A chessboard square is addressed by a file (a–h) and a rank (1–8). Explain why the 64 squares are naturally A × B for A = {a,…,h}, B = {1,…,8}, and why *both* coordinates are needed to name a square uniquely — one alone is not enough. | the square set is exactly the Cartesian product because a square is precisely a (file, rank) pair drawn independently from each set; a file alone (e.g. "column c") or a rank alone (e.g. "row 4") names a whole line of 8 squares, not one square — only the ordered pair pins down a single element of A × B *(required: explains why one coordinate under-determines the square)* | — |

*Coverage: 5 items, −1.30…0.70.*

---

## Proof by Sets — Double Inclusion (`proof-by-sets`)
*Prereq: Set Theory, Direct Proof · ancestors 4 · b₀ = 0.10*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.90 | State the double-inclusion method for proving two sets A and B are equal. | show A ⊆ B (every x ∈ A satisfies x ∈ B) *and* B ⊆ A (every x ∈ B satisfies x ∈ A); together these give A = B | — |
| R2 | recall | mcq | −0.65 | To prove A ⊆ B by element-chasing, the proof must begin: | "Let x be an arbitrary element of A" — then show x ∈ B | starts from "let x ∈ A ∩ B," implicitly assuming the very membership in B that must still be shown → `proof-by-sets` |
| A1 | apply | short-answer | −0.15 | A = {1,2,3}, B = {2,3,4}, C = {3,4,5}. Verify numerically that A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C) for this instance. `[verified]` | B∪C = {2,3,4,5}; A∩(B∪C) = {2,3}. A∩B = {2,3}; A∩C = {3}; (A∩B)∪(A∩C) = {2,3}. Both sides equal {2,3} | computes only one side and assumes the identity rather than checking both → `proof-by-sets` |
| E1 | explain | derivation | 0.60 | Prove A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C) for *all* sets A, B, C, by double inclusion with element-chasing in both directions. | (⊆) Let x ∈ A∩(B∪C). Then x∈A and (x∈B or x∈C). If x∈B then x∈A∩B; if x∈C then x∈A∩C; either way x∈(A∩B)∪(A∩C). (⊇) Let x∈(A∩B)∪(A∩C). Then x∈A∩B or x∈A∩C. Either case gives x∈A, and gives x∈B or x∈C, so x∈B∪C; hence x∈A∩(B∪C). Both inclusions hold, so the sets are equal *(required: both directions, with the case split on "or" handled explicitly in each)* | proves only one inclusion and declares the identity established → `proof-by-sets`; or handles the "or" by picking one case and ignoring the other → `logical-equivalences` |
| T1 | transfer | short-answer | 1.10 | Explain why proving A ⊆ B by element-chasing is really a direct proof in disguise — i.e. how it fits the "hypothesis ⟹ conclusion" shape `direct-proof` teaches — and why double inclusion for A = B is exactly two such proofs chained together. | showing A ⊆ B is proving the implication "x ∈ A ⟹ x ∈ B" for an arbitrary x, which is precisely the direct-proof pattern of assuming the hypothesis and deriving the conclusion; A = B by double inclusion is then two independent direct proofs, one for each direction, and neither is optional since an implication only rules out one direction of failure *(required: names the implication x∈A⟹x∈B as the direct-proof instance)* | treats double inclusion as a special set-theory trick unrelated to direct proof, rather than the same logical pattern applied twice → `direct-proof` |

*Coverage: 5 items, −0.90…1.10.*

---

## Functions & Relations (`functions-relations`)
*Prereq: Set Theory · ancestors 1 · b₀ = −0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.30 | Define a relation from A to B, and define what additionally makes a relation a *function* f: A → B. | a relation is any subset R ⊆ A×B; it is a function iff every a ∈ A appears as the first coordinate of *exactly one* pair — every input has exactly one output | — |
| R2 | recall | mcq | −1.05 | A = {1,2,3}, B = {4,5}. Which of these relations is *not* a function from A to B? | {(1,4),(1,5),(2,4),(3,5)} — 1 is paired with both 4 and 5 | picks a relation that merely doesn't hit every element of B, confusing "onto" (a separate property) with the defining requirement of a function → `functions-relations` |
| A1 | apply | short-answer | −0.55 | Let f: {−2,−1,0,1,2} → ℤ be f(x) = x². Compute the image (range) of f. `[verified]` | f(−2)=4, f(−1)=1, f(0)=0, f(1)=1, f(2)=4; image = {0, 1, 4} | lists 5 output values instead of the distinct set, e.g. {4,1,0,1,4} → `functions-relations` |
| E1 | explain | short-answer | 0.20 | A relation R ⊆ A×B is drawn as a "bipartite" picture with arrows from A to B. State, in terms of arrows, exactly what must be true for R to be a function — and explain why a relation that draws *two* arrows out of some a ∈ A fails to be one. | every a ∈ A must have exactly one arrow out of it; two arrows out of the same a means f(a) would have to equal two different values simultaneously, which makes "f(a)" not a well-defined single output *(required: the well-definedness argument, not just "it violates the rule")* | — |
| T1 | transfer | short-answer | 0.70 | In a relational database, a table's rows are literally a subset of a Cartesian product of its columns — a *relation* in this mathematical sense. Explain what it means, in this language, for one column to be *functionally dependent* on another, and why that is the database version of "function." | a column Y is functionally dependent on column X exactly when the pairs (X-value, Y-value) that occur in the table form a function from X-values to Y-values — every X-value that appears is paired with exactly one Y-value, never two different ones *(required: restates functional dependency as the function-defining uniqueness condition)* | — |

*Coverage: 5 items, −1.30…0.70.*

---

## Equivalence Relations & Partitions (`equivalence-relations`)
*Prereq: Functions & Relations · ancestors 2 · b₀ = −0.10*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.10 | Define an equivalence relation, and state the theorem connecting equivalence relations to partitions. | reflexive (a~a), symmetric (a~b ⟹ b~a), transitive (a~b and b~c ⟹ a~c); the equivalence classes of ~ partition the set, and conversely every partition defines an equivalence relation | — |
| R2 | recall | mcq | −0.85 | Which property fails for the relation "≤" on the integers, so that ≤ is *not* an equivalence relation? | symmetry: a ≤ b does not imply b ≤ a (unless a = b) | claims transitivity fails, when ≤ is in fact transitive — the actual failure is symmetry → `equivalence-relations` |
| A1 | apply | short-answer | −0.35 | Partition {0,1,2,3,4,5,6,7} into equivalence classes under "congruent mod 3." List the classes and verify they're disjoint and cover the set. `[verified]` | [0] = {0,3,6}, [1] = {1,4,7}, [2] = {2,5}; the three classes are pairwise disjoint and their union is {0,…,7}, confirming a partition | places an element in two classes at once (e.g. puts 3 in both [0] and [1]) → `equivalence-relations` |
| E1 | explain | derivation | 0.40 | Prove that congruence mod n (a ≡ b mod n iff n \| (a−b)) is an equivalence relation. | Reflexive: n \| (a−a) = 0 always. Symmetric: if n \| (a−b) then a−b = kn, so b−a = (−k)n, so n \| (b−a). Transitive: if n\|(a−b) and n\|(b−c), write a−b=kn, b−c=mn; then a−c=(a−b)+(b−c)=(k+m)n, so n\|(a−c) *(required: all three properties proved from the divisibility definition, not asserted)* | proves reflexivity and symmetry but skips transitivity, or asserts it without the (k+m)n computation → `equivalence-relations` |
| T1 | transfer | short-answer | 0.90 | Rational numbers are formally defined as equivalence classes of pairs of integers (a,b) with b≠0, under (a,b) ~ (c,d) iff ad = bc. Explain why this equivalence-class construction is exactly what lets 1/2 and 2/4 count as "the same" rational number without picking one representation as privileged. | (1,2) ~ (2,4) because 1·4 = 2·2, so both pairs land in the same equivalence class; the rational number *is* that whole class, not any single pair, so 1/2 and 2/4 are two different names (representatives) for one and the same object — no representative is more "correct" than another *(required: identifies the rational number with the class, not with a chosen representative)* | treats 1/2 as "the" rational and 2/4 as merely equal to it by coincidence, rather than both being representatives of one equivalence class → `equivalence-relations` |

*Coverage: 5 items, −1.10…0.90.*

---

## Injections, Surjections, and Bijections (`injections-surjections-bijections`)
*Prereq: Functions & Relations · ancestors 2 · b₀ = −0.10*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.10 | Define injective, surjective, and bijective for f: A → B. | injective: distinct inputs give distinct outputs (f(a)=f(a') ⟹ a=a'); surjective: every b∈B equals f(a) for some a∈A; bijective: both at once | — |
| R2 | recall | mcq | −0.85 | f: ℝ → ℝ, f(x) = x². This function is: | neither injective nor surjective | claims f is injective — mistaking "passes as a well-defined function" (unique output per input) for injectivity (unique input per output); f(1)=f(−1)=1 is a direct counterexample → `injections-surjections-bijections` |
| A1 | apply | short-answer | −0.35 | f: {1,2,3} → {a,b,c,d}, f(1)=a, f(2)=b, f(3)=c. Is f injective? Is f surjective? `[verified]` | injective: yes — 1,2,3 map to distinct values a,b,c. Surjective: no — d is never hit | claims surjective because "every input has an output," conflating that with every *output* being hit → `injections-surjections-bijections` |
| E1 | explain | derivation | 0.40 | Prove that if f: A → B is a bijection between finite sets, then \|A\| = \|B\|. | injectivity means no two elements of A share an image, so the \|A\| images are all distinct elements of B, giving \|A\| ≤ \|B\|; surjectivity means every element of B is hit, so B has no more than \|A\| elements, giving \|B\| ≤ \|A\|; together \|A\| ≤ \|B\| and \|B\| ≤ \|A\| force \|A\| = \|B\| *(required: both inequalities derived separately, one from each property, then combined)* | argues only "each element is used exactly once" without deriving the two separate inequalities → `injections-surjections-bijections` |
| T1 | transfer | short-answer | 0.90 | Counting finite sets means comparing \|A\| and \|B\| as numbers. For infinite sets that stops making sense directly. Explain how "there exists a bijection A → B" generalizes "\|A\| = \|B\|" in a way that still works when A and B are infinite. | for finite sets, a bijection existing is *equivalent* to the element counts being equal (by E1's argument), so nothing is lost by using "bijection exists" as the definition of same size instead of counting; but unlike counting, this definition still makes sense when A and B have no finite count at all — it only asks for a pairing-up, which infinite sets can still have or lack *(required: states that bijection-existence and equal-count coincide for finite sets, which is why it's a legitimate generalization rather than a different notion entirely)* | — |

*Coverage: 5 items, −1.10…0.90.*

---

## Cardinality & Countability (`cardinality`)
*Prereq: Injections, Surjections, and Bijections · ancestors 3 · b₀ = 0.10*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.90 | Define "A and B have the same cardinality," and define what it means for a set to be countably infinite. | A and B have the same cardinality iff there exists a bijection A → B; a set is countably infinite iff it has the same cardinality as ℕ, i.e. its elements can be listed as a sequence a₁, a₂, a₃, … hitting every element exactly once | — |
| R2 | recall | mcq | −0.65 | Which of these sets is *not* countable? | ℝ, the real numbers | picks ℚ (the rationals), reasoning that because ℚ is dense it must be "too big" to count — density and countability are unrelated; ℚ is in fact countable → `cardinality` |
| A1 | apply | short-answer | −0.15 | Exhibit an explicit bijection f: ℕ → ℤ (with ℕ = {0,1,2,…}), and verify it on n = 0,1,2,3,4. `[verified]` | f(n) = n/2 if n even, −(n+1)/2 if n odd; f(0)=0, f(1)=−1, f(2)=1, f(3)=−2, f(4)=2 — the "zigzag" that alternately hits 0, −1, 1, −2, 2, … covering every integer exactly once | proposes f(n) = n − (some shift), which only covers integers in one direction and misses either the negative or positive half → `cardinality` |
| E1 | explain | derivation | 0.60 | Prove ℕ × ℕ is countable by describing an explicit enumeration (a bijection ℕ → ℕ×ℕ, or an injection ℕ×ℕ → ℕ composed appropriately), and explain why this shows the pairs can be listed in a single sequence. | enumerate along diagonals of constant sum k = i+j: list all (i,j) with i+j=0, then i+j=1, then i+j=2, …; each diagonal is finite (k+1 pairs), so every (i,j) is reached after finitely many steps, giving a well-defined sequence a₁,a₂,… that hits every pair exactly once — this is exactly a bijection ℕ → ℕ×ℕ *(required: the diagonal-by-diagonal construction, with the finiteness of each diagonal stated as why every pair is eventually reached)* | — |
| T1 | transfer | short-answer | 1.10 | Give the informal Cantor-diagonal argument for why ℝ (or just [0,1]) cannot be listed in a sequence, i.e. is uncountable. This is an intuition-level argument, not a fully rigorous proof. | suppose, for contradiction, every real number in [0,1] *could* be listed as a sequence x₁, x₂, x₃, …, each written as an infinite decimal; build a new number y by choosing y's n-th digit to differ from the n-th digit of xₙ (e.g. by a fixed rule like "5 unless xₙ's n-th digit is 5, then 6"); then y differs from every xₙ in at least the n-th digit, so y is a real number in [0,1] that was not on the list — contradicting the assumption that the list contained *every* real number in [0,1] *(required: the "differ in the n-th digit" diagonal construction and the resulting contradiction; a fully rigorous handling of decimal-representation edge cases like 0.4999…=0.5 is not required at this level)* | lists countably many reals and concludes "some reals are missing" without constructing the specific diagonal number that provably isn't on *any* proposed list → `cardinality` |

*Coverage: 5 items, −0.90…1.10.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| ∅ treated as not a genuine subset | `power-set` |
| power set listed without the bijection-to-binary-strings argument | `power-set` |
| Cartesian product assumed commutative (A×B = B×A) | `cartesian-product` |
| element-chasing proof starts from the conclusion instead of an arbitrary hypothesis element | `proof-by-sets` |
| only one direction of a double-inclusion proof carried out | `proof-by-sets` |
| double inclusion treated as a set-theory trick rather than two direct proofs | `direct-proof` |
| a relation with two outputs per input still accepted as a function | `functions-relations` |
| "onto" (surjectivity) confused with well-definedness of a function | `functions-relations`, `injections-surjections-bijections` |
| ≤ mistaken for an equivalence relation (symmetry failure missed) | `equivalence-relations` |
| equivalence-class representative treated as more "correct" than others | `equivalence-relations` |
| f(x)=x² misclassified as injective | `injections-surjections-bijections` |
| density of ℚ mistaken for uncountability | `cardinality` |
| Cantor diagonal argument gestured at without constructing the actual diverging number | `cardinality` |

**Cluster total: 35 items across 7 concepts (plus `set-theory`'s existing 7 items in
`foundations-of-probability.md`, for 42 across the full 8-concept cluster).** All numeric and
element-listing claims above were checked by hand. The double-inclusion proof of
A∩(B∪C)=(A∩B)∪(A∩C) in `proof-by-sets` and the diagonal argument in `cardinality`'s T1 are the
standout derivations in this cluster — the first because it is the template every later set-identity
proof in the curriculum reuses, the second because it is a genuine (if informal) taste of Cantor's
theorem rather than a black-boxed "uncountable, trust me."
