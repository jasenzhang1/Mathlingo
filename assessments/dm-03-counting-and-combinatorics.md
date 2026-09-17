# Discrete Math Cluster 3 — Counting & Combinatorics

Pigeonhole Principle, Factorials, Permutations, Combinations, Stars and Bars, Integer Partitions
(6 new concepts here) plus Counting Methods and Binomial Theorem, which round the cluster out to 8
concepts total. `counting-methods` and `binomial-theorem` predate this cluster's move into the
discrete-math domain — their markdown items already live in
[foundations-of-probability.md](foundations-of-probability.md) (search for
`## Counting Methods (\`counting-methods\`)` and `## Binomial Theorem (\`binomial-theorem\`)`), and
are not repeated here. Same table format as the linear-algebra and probability/statistics sweeps
(e.g. [la-01-vectors-and-operations.md](la-01-vectors-and-operations.md)), 5 items per concept.

Every count below was checked by hand — small cases enumerated directly, factorial and binomial
values recomputed digit by digit — before being written down, per the `[verified]` convention.

---

## Pigeonhole Principle (`pigeonhole-principle`)
*Prereq: Counting Methods · ancestors 2 · b₀ = 0.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.95 | State the (basic) pigeonhole principle. | if n items are placed into k containers and n>k, some container holds at least 2 items | — |
| R2 | recall | mcq | −0.70 | The *generalized* pigeonhole principle guarantees some container holds at least: | ⌈n/k⌉ items | picks ⌊n/k⌋ (floor instead of ceiling) — undercounts the guaranteed minimum → `pigeonhole-principle` |
| A1 | apply | numeric | −0.15 | 41 students are enrolled in a class. Using the 12 birth months as containers, what is the minimum number of students the generalized pigeonhole principle guarantees share a birth month? `[verified: ⌈41/12⌉=4, since 12×3=36<41]` | 4 | — |
| E1 | explain | derivation | 0.55 | Prove that among any 13 people, two must share a birth month. | 12 months are the holes, 13 people are the pigeons; assume for contradiction every month has at most 1 person — then the total is at most 12, contradicting 13 people *(required: the explicit contradiction, not just citing the principle)* | — |
| T1 | transfer | short-answer | 1.05 | Place any 5 points inside a unit square. Using pigeonhole, show two of them must be within distance √2⁄2 of each other. | divide the unit square into 4 subsquares of side 1/2 (a 2×2 grid); 5 points into 4 subsquares forces two points into the same subsquare by pigeonhole; the farthest apart two points in a subsquare of side 1/2 can be is its diagonal, √(0.5²+0.5²)=√0.5=√2⁄2 *(required: both the subsquare partition and the diagonal-distance bound)* `[verified: √0.5=√2/2≈0.707]` | — |

*Coverage: 5 items, −0.95…1.05.*

---

## Factorials (`factorials`)
*Prereq: Counting Methods · ancestors 2 · b₀ = 0.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.95 | Define n! for a nonnegative integer n, including the value of 0!. | n! = n×(n−1)×⋯×2×1 for n≥1; 0!=1 by convention | — |
| R2 | recall | mcq | −0.70 | 7!/6! equals: | 7 | inverts the ratio (computes 6!/7!) and answers 1/7, or answers 5040/720 mis-simplified → `factorials` | — |
| A1 | apply | numeric | −0.15 | Compute 6!. `[verified: 6×5×4×3×2×1=720]` | 720 | — |
| E1 | explain | derivation | 0.55 | Using the recursive definition n!=n·(n−1)!, show why 0!=1 is forced rather than chosen arbitrarily. | at n=1 the recursion reads 1!=1·0!; since 1!=1 independently (one way to arrange one object), 0! must equal 1 for the recursion to hold *(required: the substitution at n=1, not just "by convention")* | — |
| T1 | transfer | short-answer | 1.05 | Circular arrangements of n distinct people around a round table (where rotations of the same seating count as identical) number (n−1)!, not n!. Explain where the missing factor of n goes. | fixing one person's seat as a reference point removes the rotational symmetry that was inflating the count; the remaining n−1 people can then be seated in the remaining n−1 seats in (n−1)! ways; equivalently, each circular arrangement was counted n times in the row-arrangement total n! (once per rotation), and n!/n=(n−1)! divides that overcount back out *(required: the rotation-overcount argument)* | — |

*Coverage: 5 items, −0.95…1.05.*

---

## Permutations (`permutations`)
*Prereq: Factorials · ancestors 3 · b₀ = 0.25*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.75 | State the formula for P(n,k), and describe in words what it counts. | P(n,k) = n!/(n−k)!; the number of ordered selections of k objects from n distinct objects, no repeats | — |
| R2 | recall | mcq | −0.50 | P(n,n) equals: | n! | answers (n−1)!, confusing it with the circular-permutation count from `factorials` → `permutations` | — |
| A1 | apply | numeric | 0.05 | Compute P(7,3). `[verified: 7×6×5=210, matches 7!/4!=5040/24=210]` | 210 | — |
| E1 | explain | derivation | 0.75 | Derive P(n,k)=n!/(n−k)! from the multiplication principle directly (not by quoting the formula). | the k slots have n, n−1, …, n−k+1 choices respectively (k factors total) by the multiplication principle; writing the full product n! = [n(n−1)⋯(n−k+1)] × (n−k)! and dividing both sides by (n−k)! recovers exactly that k-factor product as n!/(n−k)! *(required: identifying the k-factor product with the missing tail of n!)* | — |
| T1 | transfer | short-answer | 1.25 | A 4-digit PIN allows any of the 10 digits to repeat in any position. Explain why P(10,4)=5040 is the *wrong* count for the number of possible PINs, and give the correct one. | P(10,4) forbids repeats, but a PIN can reuse digits (e.g. 1122 is valid), so this is not a permutation problem at all; each of the 4 positions independently has 10 choices, giving 10⁴=10,000 by the multiplication principle, not P(10,4) *(required: names the repetition mismatch as the reason P(10,4) is inapplicable)* `[verified: 10^4=10000]` | applies the no-repetition permutation formula to a repetition-allowed problem → `permutations` |

*Coverage: 5 items, −0.75…1.25.*

---

## Combinations (`combinations`)
*Prereq: Permutations · ancestors 4 · b₀ = 0.45*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.55 | State C(n,k) and explain how it is derived from P(n,k). | C(n,k) = P(n,k)/k! = n!/(k!(n−k)!); dividing by k! removes the overcounting of each k-element subset's k! internal orderings | — |
| R2 | recall | mcq | −0.30 | C(10,3) equals which of the following? | C(10,7) | picks C(7,3) — swaps which quantity gets subtracted from n, giving a numerically different (and smaller) value → `combinations`; or picks P(10,3), confusing combinations with permutations → `combinations` | — |
| A1 | apply | numeric | 0.25 | Compute C(9,4). `[verified: (9×8×7×6)/(4×3×2×1)=3024/24=126]` | 126 | — |
| E1 | explain | derivation | 0.95 | Prove Pascal's rule C(n,k)=C(n−1,k−1)+C(n−1,k) combinatorially — by a counting argument, not algebra. | fix one particular element x of the n-element set; every k-subset either contains x (choose the remaining k−1 elements from the other n−1, giving C(n−1,k−1) ways) or excludes x (choose all k elements from the other n−1, giving C(n−1,k) ways); these two cases are disjoint and exhaustive, so they sum to the total C(n,k) *(required: the disjoint-and-exhaustive framing, not the algebraic factorial identity)* | — |
| T1 | transfer | short-answer | 1.45 | A 5-card poker hand from a 52-card deck is usually counted as C(52,5)=2,598,960. Explain why this is a combination count rather than a permutation count, and what would go wrong with probability calculations if P(52,5) were used instead. | a hand is the *set* of 5 cards a player holds — dealing them in a different order produces the same hand, so order does not matter and C(52,5) is correct; using P(52,5)=311,875,200 instead would count every hand 5!=120 times over (once per deal order), so any probability computed as favourable/total would come out identical only if the numerator were inflated by the same wrong factor of 120 — mixing the two conventions silently breaks the calculation *(required: the 120×-overcount and its effect on probability)* `[verified: C(52,5)=2,598,960; P(52,5)=52·51·50·49·48=311,875,200; 311,875,200/2,598,960=120=5!]` | — |

*Coverage: 5 items, −0.55…1.45.*

---

## Stars and Bars (`stars-and-bars`)
*Prereq: Combinations · ancestors 5 · b₀ = 0.65*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.35 | State the stars-and-bars formula for splitting n identical items into k labeled groups (empty groups allowed), and explain what the "stars" and "bars" represent. | C(n+k−1, k−1); the n stars represent the items, and the k−1 bars mark the k−1 dividers that split the row of stars into k groups | — |
| R2 | recall | mcq | −0.10 | If each of the k groups must receive *at least one* item, the correct count is: | C(n−1, k−1) | picks C(n+k−1, k−1), forgetting to first remove one item per group to enforce the nonempty constraint → `stars-and-bars` | — |
| A1 | apply | numeric | 0.45 | 12 identical candies are distributed among 4 children (a child may get none). How many distributions are there? `[verified: C(15,3)=(15×14×13)/(3×2×1)=2730/6=455]` | 455 | — |
| E1 | explain | derivation | 1.15 | Derive the stars-and-bars formula by describing the stars/bars encoding directly, and check it against the small case n=2, k=2. | n stars and k−1 bars form a row of n+k−1 symbols; a distribution is fully determined by choosing which k−1 of those n+k−1 positions hold bars (equivalently which n hold stars), giving C(n+k−1,k−1) *(required: the positions-not-values argument)*; check: n=2,k=2 gives C(3,1)=3, matching the direct list (0,2),(1,1),(2,0) `[verified: C(3,1)=3]` | — |
| T1 | transfer | short-answer | 1.65 | Explain why x₁+x₂+x₃=10 with each xᵢ≥1 has C(9,2)=36 solutions, by relating it back to the standard (xᵢ≥0) stars-and-bars formula. | substitute yᵢ=xᵢ−1 so each yᵢ≥0; the equation becomes y₁+y₂+y₃=10−3=7; applying the standard formula with n=7, k=3 gives C(7+3−1,3−1)=C(9,2) *(required: the shift-by-one substitution, not just quoting C(9,2))* `[verified: C(9,2)=(9×8)/2=36]` | — |

*Coverage: 5 items, −0.35…1.65.*

---

## Integer Partitions (`integer-partitions`)
*Prereq: Stars and Bars · ancestors 6 · b₀ = 0.85*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.15 | Define an integer partition of n, and explain how it differs from a stars-and-bars distribution of n into k groups. | a partition of n is a multiset of positive integers summing to n, with no notion of which "group" a part belongs to; stars-and-bars groups are labeled/distinguishable, so two distributions that put different amounts in group 1 vs. group 2 are different outcomes even if the same multiset of amounts appears — as a partition, they are the *same* partition | — |
| R2 | recall | mcq | 0.10 | p(4), the number of partitions of 4, equals: | 5 (4; 3+1; 2+2; 2+1+1; 1+1+1+1) | answers 8, confusing partitions (unordered) with *compositions* of 4 — ordered sums, which number 2ⁿ⁻¹=2³=8 → `integer-partitions` | — |
| A1 | apply | numeric | 0.65 | How many distinct partitions does 6 have — i.e. what is p(6)? `[verified by direct enumeration: 6; 5+1; 4+2; 4+1+1; 3+3; 3+2+1; 3+1+1+1; 2+2+2; 2+2+1+1; 2+1+1+1+1; 1+1+1+1+1+1 — 11 partitions]` | 11 | — |
| E1 | explain | derivation | 1.35 | List the partitions of 5 into at most 3 parts, and contrast the count with the stars-and-bars count of ways to split 5 identical items into 3 *labeled* groups. | partitions of 5 with ≤3 parts: 5; 4+1; 3+2; 3+1+1; 2+2+1 — 5 partitions (2+1+1+1 and 1+1+1+1+1 are excluded, having 4 and 5 parts); stars-and-bars for 5 items into 3 labeled groups gives C(5+3−1,3−1)=C(7,2)=21; the 21 labeled outcomes collapse to only 5 once group labels are erased, since many different (group 1, group 2, group 3) assignments correspond to the same unordered multiset of amounts *(required: both counts and the collapsing explanation)* `[verified: C(7,2)=21; 5 partitions enumerated above]` | — |
| T1 | transfer | short-answer | 1.85 | Unlike stars-and-bars's C(n+k−1,k−1), there is no simple closed-form formula for p(n). Explain why the stars-and-bars derivation breaks down here, and name the tool actually used to compute p(n). | stars-and-bars works because choosing a distribution reduces to choosing *positions* for bars among labeled slots — but a partition has no fixed, labeled slots to place bars into, since the "groups" (part sizes) are not distinguished from each other and their number isn't fixed in advance; p(n) is instead extracted as the coefficient of xⁿ in the generating function ∏ᵢ 1/(1−xⁱ), or built up via a recursion on the largest allowed part *(required: names the missing-labeled-slots reason, and names generating functions or an equivalent recursive method)* | treats the absence of a closed form as an oversight rather than a structural consequence of the groups being unlabeled → `integer-partitions` |

*Coverage: 5 items, −0.15…1.85.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| generalized pigeonhole bound floored instead of ceilinged | `pigeonhole-principle` |
| 0! or ratio-of-factorials computed backwards | `factorials` |
| permutation formula applied where repetition is allowed | `permutations` |
| permutation/combination formulas swapped, or symmetry identity mis-subtracted | `combinations` |
| nonempty-group constraint dropped from stars-and-bars | `stars-and-bars` |
| partitions (unlabeled) confused with compositions or stars-and-bars (labeled) | `integer-partitions` |

**This file: 30 items across 6 concepts.** `counting-methods` and `binomial-theorem` bring the
cluster to 8 concepts and 40 items in total, with their 5-item tables living in
[foundations-of-probability.md](foundations-of-probability.md). All numeric claims above were
verified by hand: factorial values recomputed digit by digit, binomial coefficients recomputed from
first principles, and every partition list enumerated directly rather than taken from a remembered
formula.
