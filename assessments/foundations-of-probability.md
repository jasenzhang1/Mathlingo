# Cluster 1 — Foundations of Probability

Set Theory → Mutual Independence (11 concepts). Table format per [`README.md`](README.md): one row
per item, difficulty `b` seeded from `expectedDifficulty` plus the level offset
(recall −1, apply −0.2, explain +0.5, transfer +1) used by `buildRetrievalBrief`. Root concepts have
no prerequisite to blame a misconception on, so their tags point back at the concept itself — that is
the correct behavior of the blame model at the root of the graph, not a gap in it.

---

## Set Theory (`set-theory`)
*Root · ancestors 0 · base b₀ = −0.50*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | −1.5 | Which is a correct De Morgan's law? | (A∪B)ᶜ = Aᶜ∩Bᶜ | `demorgan-swap` (picks (A∪B)ᶜ=Aᶜ∪Bᶜ) → `set-theory` |
| R2 | recall | short-answer | −1.3 | Define a *partition* of a sample space Ω. | pairwise disjoint blocks; union = Ω; no empty block | `partition-overlap` → `set-theory` |
| A1 | apply | short-answer | −0.75 | Express A∖B using only ∩ and complement, then simplify (A∖B)∪(A∩B). | A∖B = A∩Bᶜ; union simplifies to A | — |
| A2 | apply | mcq | −0.6 | Which holds for *all* sets A, B: (a) A∪B=B∪A (b) A−B=B−A (c) A∩∅=A? | (a) | (b) confuses set difference with a symmetric op → `set-theory`; (c) swaps the identity elements of ∪ (Ω) and ∩ (∅) → `set-theory` |
| E1 | explain | derivation | 0.1 | Prove (A∪B)ᶜ = Aᶜ∩Bᶜ directly from the definition of complement — not by citing the law. | element-wise iff chain: x∈(A∪B)ᶜ ⟺ x∉A∪B ⟺ x∉A ∧ x∉B ⟺ x∈Aᶜ∩Bᶜ *(required)* | asserts the law without the iff argument → `set-theory` |
| E2 | explain | short-answer | 0.3 | Why is ∅ a subset of *every* set? | vacuous truth: "∀x∈∅, x∈A" has no counterexample to find *(required)* | "∅ has nothing, so it can't be a subset of anything" → `set-theory` — a genuinely common gap in the underlying logic, not the set theory |
| T1 | transfer | short-answer | 0.6 | On a social network, A = Alice's friends, B = Bob's friends. Write set expressions for: people friends with both; friends with exactly one of the two; friends with neither. | A∩B; A△B = (A∪B)∖(A∩B); (A∪B)ᶜ *(all three required)* | confuses "exactly one" with A∪B → `set-theory` |

*Coverage: 2 recall, 2 apply, 2 explain, 1 transfer — 7 items, spread −1.5…0.6 (2.1 logits).*

---

## PIE, Boole's Inequality (`pie-boole`)
*Prereq: Set Theory · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | State inclusion-exclusion for \|A∪B∪C\|. | Σ\|singles\| − Σ\|pairs\| + \|triple\| | `pie-drops-triple` (stops after pairs) → `pie-boole` |
| R2 | recall | mcq | −1.0 | Boole's inequality says P(⋃Aᵢ) is: | ≤ ΣP(Aᵢ), always | "= ΣP(Aᵢ) when the Aᵢ are disjoint only" picked as the general rule → `pie-boole` |
| A1 | apply | numeric | −0.35 | 30 students take French, 20 take Spanish, 8 take both. How many take at least one? `[verified: 42]` | \|A∪B\| = 30+20−8 = 42 | subtracts nothing (double-counts) → `pie-boole` |
| A2 | apply | numeric | −0.2 | Rolling a fair die 4 times, bound P(at least one repeated value) using Boole's inequality over the 6 pairwise "roll i = roll j" events — is the bound tight? `[verified]` | Boole gives ≤ C(4,2)·(1/6) = 1.0 (vacuous — a probability can't exceed 1); true probability of a repeat is 1 − (6·5·4·3)/6⁴ = **0.7222** — the bound is *useless* here, and the required insight is recognizing a vacuous bound as vacuous rather than reporting it | treats a Boole bound of 1.0 as if it were informative, or arithmetic-slips the complement (e.g. reports 0.4028 instead of 0.7222) → `pie-boole` |
| E1 | explain | derivation | 0.35 | Prove Boole's inequality from the axioms of probability for two events, then argue the general case by induction. | writes A∪B = A ⊔ (B∖A), applies countable additivity, uses monotonicity P(B∖A) ≤ P(B) *(required)* | assumes independence to split the union → `mutual-independence` |
| E2 | explain | short-answer | 0.5 | Why does Boole's inequality never need the events to be independent or disjoint? | it is proved from additivity plus monotonicity alone, both of which hold regardless of dependence *(required)* | — |
| T1 | transfer | short-answer | 0.85 | A spell-checker flags a document if *any* of its 500 words is misspelled, each independently mis-flagged (false positive) with probability 0.002. Use Boole to bound the false-positive rate on the whole document, and say whether the bound is close to the truth here. | bound: 500×0.002 = 1.0 (vacuous, same failure mode as A2); true rate 1−0.998⁵⁰⁰ ≈ 0.632 `[verified]`. Required: notice the bound is only useful when the per-event probabilities are small relative to 1/n | reports the Boole bound as the actual false-positive rate → `pie-boole` |

*Coverage: 2/2/2/1 — 7 items, −1.15…0.85 (2.0 logits). Note: A2/T1 deliberately teach the bound's limits, not just its statement.*

---

## Sigma Algebra (`sigma-algebra`)
*Prereq: Set Theory · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | multi-select | −1.15 | Which are required of a σ-algebra ℱ on Ω? | Ω∈ℱ; closed under complement; closed under *countable* union | "closed under finite union only" and "closed under arbitrary (uncountable) union" are both wrong picks → `sigma-algebra` |
| R2 | recall | short-answer | −1.0 | Show ∅ ∈ ℱ follows from the other axioms. | Ω∈ℱ, complement closure ⟹ Ωᶜ=∅∈ℱ | — |
| A1 | apply | short-answer | −0.35 | Ω = {1,2,3,4}. Is ℱ = {∅, Ω, {1,2}, {3,4}} a σ-algebra? Is {∅, Ω, {1}, {2,3,4}, {1,2}} one? | first: yes; second: no — {1,2} is present but {1}ᶜ∩{1,2} = {2} is missing, so it isn't closed under intersection (equivalently union with {2,3,4} isn't handled) | declares any collection containing Ω and ∅ sufficient → `sigma-algebra` |
| A2 | apply | short-answer | −0.2 | Show a σ-algebra is closed under countable intersection, using only the stated axioms. | De Morgan: ⋂Aᵢ = (⋃Aᵢᶜ)ᶜ, and both operations used are axioms *(required)* | — |
| E1 | explain | derivation | 0.35 | Why do we need σ-algebras at all — why not just let *every* subset of Ω be an event? | for continuous spaces (e.g. Ω=[0,1]), the power set is too large to assign a countably-additive probability consistently (non-measurable sets exist); a σ-algebra is the largest collection on which "probability" behaves *(required, at the level of naming the obstruction, not proving Vitali's construction)* | thinks the restriction is only a bookkeeping convenience → `sigma-algebra` |
| E2 | explain | short-answer | 0.5 | Why must union-closure be over *countable*, not just finite, collections? | later constructions (limits of events, e.g. "eventually always heads") need countably infinite unions/intersections to even be expressible as events *(required)* | — |
| T1 | transfer | short-answer | 0.85 | The Borel σ-algebra on ℝ is generated by the open intervals. Explain what "generated by" means, and why we don't just define it as "all subsets of ℝ". | smallest σ-algebra containing the generators, i.e. the intersection of every σ-algebra that contains them; "all subsets" fails for the same non-measurability reason as E1 | conflates "generated by" with "equal to" → `sigma-algebra` |

*Coverage: 2/2/2/1 — 7 items, −1.15…0.85.*

---

## Axioms of Probability (`axioms-of-probability`)
*Prereq: Sigma Algebra · ancestors 2 · b₀ = 0.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | −0.95 | Kolmogorov's axioms require which of these? | P(A)≥0 for all A; P(Ω)=1; countable additivity over disjoint events | "P(A)≤1 for all A" listed as an *axiom* rather than a derived fact → `axioms-of-probability` |
| R2 | recall | short-answer | −0.75 | State countable additivity precisely — what condition on the Aᵢ does it require? | pairwise disjointness; then P(⋃Aᵢ) = ΣP(Aᵢ) | — |
| A1 | apply | short-answer | −0.15 | Prove P(∅) = 0 from the three axioms. | ∅ is disjoint from itself repeated; countable additivity forces P(∅) = ΣP(∅), which only holds if P(∅)=0 (given P(∅)≥0 and finiteness of P(Ω)=1) *(required)* | asserts P(∅)=0 "by definition" → `axioms-of-probability` |
| A2 | apply | short-answer | 0.0 | Prove P(Aᶜ) = 1 − P(A). | A ⊔ Aᶜ = Ω, additivity gives P(A)+P(Aᶜ)=P(Ω)=1 *(required)* | — |
| E1 | explain | derivation | 0.55 | Prove monotonicity: A ⊆ B ⟹ P(A) ≤ P(B). | write B = A ⊔ (B∖A), additivity gives P(B)=P(A)+P(B∖A), and P(B∖A)≥0 by axiom 1 *(required)* | assumes P(B∖A) = P(B) − P(A) is itself an axiom rather than deriving it | 
| E2 | explain | short-answer | 0.7 | Only *countable* additivity is assumed, not additivity over arbitrary (uncountable) collections. Why would uncountable additivity be too strong an axiom? | a continuum of disjoint singleton events each with probability 0 would need to sum (uncountably) to 1, which is inconsistent with any real-valued sum — e.g. Uniform(0,1) *(required: names a concrete inconsistency, not just "it's too strong")* | — |
| T1 | transfer | short-answer | 1.05 | A measure µ satisfies µ(A)≥0 and countable additivity but µ(Ω) = 5, not 1. Is µ a valid probability measure? What is it instead, and how would you turn it into one? | not a probability measure (fails normalization); it's a general *measure*; normalize via P(A) = µ(A)/µ(Ω) | conflates "measure" and "probability measure," or claims any non-negative additive set function is automatically a probability → `axioms-of-probability` |

*Coverage: 2/2/2/1 — 7 items, −0.95…1.05.*

---

## Probability Function (`probability-function`)
*Prereq: Axioms of Probability · ancestors 3 · b₀ = 0.19*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.81 | Write the general (non-disjoint) addition rule for P(A∪B). | P(A)+P(B)−P(A∩B) | drops the intersection term, applying the disjoint-only version generally → `probability-function` |
| R2 | recall | mcq | −0.6 | If P(A)=0.7 and P(B)=0.5, which value of P(A∩B) is *impossible*? | Options include 0.05 (impossible, since P(A∪B)≤1 forces P(A∩B)≥P(A)+P(B)−1=0.2), 0.3, 0.5 | picks 0.05 as valid, missing the Bonferroni-type lower bound → `probability-function` |
| A1 | apply | numeric | −0.05 | P(A)=0.6, P(B)=0.4, P(A∩B)=0.25. Find P(A∪B) and P(exactly one of A, B). `[verified]` | P(A∪B)=0.75; P(exactly one) = P(A∪B) − P(A∩B) = 0.5 | computes "exactly one" as P(A)+P(B) → `probability-function` |
| A2 | apply | numeric | 0.1 | P(A)=0.3, P(B)=0.5, A and B disjoint. Find P(A∪B) and P(Aᶜ∩Bᶜ). `[verified]` | P(A∪B)=0.8 (disjoint ⟹ additivity applies directly); P(Aᶜ∩Bᶜ)=P((A∪B)ᶜ)=0.2 | — |
| E1 | explain | derivation | 0.69 | Derive P(A∪B) = P(A)+P(B)−P(A∩B) from the axioms (not by citing a Venn diagram). | write A∪B = A ⊔ (B∖A) and B = (A∩B) ⊔ (B∖A); additivity on each, then eliminate P(B∖A) *(required)* | cites the Venn-diagram picture as the proof → `probability-function` |
| E2 | explain | short-answer | 0.85 | Why is P a *function* from events to numbers, not from outcomes to numbers — what would go wrong for continuous Ω if it were the latter? | for continuous Ω individual outcomes typically have probability 0; only sets (intervals) can carry nonzero probability, which is exactly why the sample space needs a σ-algebra of events *(required)* | — |
| T1 | transfer | short-answer | 1.19 | A quality report says P(defect in part A) = 0.1, P(defect in part B) = 0.1, P(defect in A or B) = 0.25. Is this report internally consistent? | no — the addition rule forces P(A∪B) ≤ P(A)+P(B) = 0.2 < 0.25, a contradiction; identifies the report as impossible regardless of any additional information | tries to "solve for" P(A∩B) and gets a negative number without recognizing that as proof of inconsistency → `probability-function` |

*Coverage: 2/2/2/1 — 7 items, −0.81…1.19.*

---

## Counting Methods (`counting-methods`)
*Prereq: Set Theory · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | −1.15 | Choosing an *ordered* subset of k from n distinct items: how many ways? | n!/(n−k)! | picks C(n,k), the unordered count → `counting-methods` |
| R2 | recall | short-answer | −0.9 | State the "stars and bars" formula for the number of ways to place k identical balls into n distinct bins. | C(n+k−1, k) | — |
| A1 | apply | numeric | −0.35 | How many distinct 5-card poker hands are there? `[verified: C(52,5)=2598960]` | C(52,5) = 2,598,960 | uses 52×51×50×49×48 (ordered) without dividing by 5! → `counting-methods` |
| A2 | apply | numeric | −0.2 | In how many ways can the letters of "STATISTICS" be arranged? `[verified]` | 10 letters, repeats S×3, T×3, I×2, A×1, C×1: 10!/(3!3!2!) = 50,400 | uses 10! without dividing by repeated-letter factorials → `binomial-theorem` (multinomial coefficients are the generalization of the binomial coefficient) |
| E1 | explain | derivation | 0.35 | Prove C(n,k) = C(n,n−k) *combinatorially* — i.e. by a bijection, not algebra on the formula. | choosing the k items to include is the same act as choosing the n−k items to exclude *(required: an explicit bijection argument, not just plugging into the formula)* | proves it only by algebraic manipulation of factorials, missing the combinatorial content asked for | 
| E2 | explain | short-answer | 0.5 | Explain why "ordered, without replacement" (permutations) and "unordered, without replacement" (combinations) differ by exactly a factor of k!. | every unordered selection of k items corresponds to exactly k! orderings of those same items *(required)* | — |
| T1 | transfer | short-answer | 0.85 | A password is 8 characters from {a–z, 0–9}, and must contain at least one digit. Set up (don't just state) the count via complementary counting. | total 36⁸ minus all-letter passwords 26⁸; `[verified: 36^8 - 26^8 = 2,612,282,842,880]`. Required: identifies complementary counting as the strategy, not direct case-splitting on digit position | attempts to place "exactly one digit" and multiply, missing that the condition is "at least one" → `counting-methods` |

*Coverage: 2/2/2/1 — 7 items, −1.15…0.85.*

---

## Binomial Theorem (`binomial-theorem`)
*Prereq: Counting Methods · ancestors 2 · b₀ = 0.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.95 | State the binomial theorem for (x+y)ⁿ. | Σₖ C(n,k) xᵏ yⁿ⁻ᵏ, k=0..n | — |
| R2 | recall | mcq | −0.7 | The coefficients C(n,0), C(n,1), …, C(n,n) sum to: | 2ⁿ | picks n (confusing the number of terms with their sum) → `binomial-theorem` |
| A1 | apply | numeric | −0.15 | Find the coefficient of x³y⁵ in (x+y)⁸. `[verified: C(8,3)=56]` | C(8,3) = 56 | uses C(8,5) thinking the second exponent indexes k (gets the same number here by symmetry — use a non-symmetric example to actually test this, see A2) | 
| A2 | apply | numeric | 0.0 | Find the coefficient of x²y⁷ in (2x+y)⁹. `[verified]` | C(9,2)·2² = 36·4 = 144 — tests whether the learner remembers the coefficient 2 gets raised to the power too | forgets to raise the coefficient 2 to the power, answering 36 → `binomial-theorem` |
| E1 | explain | derivation | 0.55 | Prove the binomial theorem by a *counting* argument (not induction): why does C(n,k) count the coefficient of xᵏyⁿ⁻ᵏ in the expanded product of n factors (x+y)? | expanding (x+y)ⁿ = (x+y)(x+y)⋯(x+y) means picking x or y from each of the n factors; the xᵏyⁿ⁻ᵏ term arises once for every way of choosing which k factors contribute the x *(required)* | proves only by induction, missing the combinatorial reading asked for |
| E2 | explain | short-answer | 0.7 | Use the binomial theorem to explain why Σₖ C(n,k) pᵏ(1−p)ⁿ⁻ᵏ = 1 for the Binomial pmf. | set x=p, y=1−p in the theorem: (p+(1−p))ⁿ = 1ⁿ = 1 *(required)* — this is why `bernoulli-binomial` lists this concept as a prerequisite | — |
| T1 | transfer | short-answer | 1.05 | Pascal's triangle row n gives C(n,0)..C(n,n). Explain the identity C(n,k) = C(n−1,k−1) + C(n−1,k) both algebraically and by a counting argument (the argument that generates Pascal's triangle). | algebra: factorial manipulation; counting: split on whether a fixed distinguished item is chosen (C(n−1,k−1) ways) or not (C(n−1,k) ways) *(both required)* | gives only the algebraic proof when a counting argument was asked for → `binomial-theorem` |

*Coverage: 2/2/2/1 — 7 items, −0.95…1.05.*

---

## Conditional Probability (`conditional-probability`)
*Prereq: Probability Function · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Define P(A\|B), and state the one condition required for it to be defined. | P(A∩B)/P(B), requires P(B) > 0 | omits the P(B)>0 condition → `conditional-probability` |
| R2 | recall | mcq | −0.5 | If A and B are *disjoint* (mutually exclusive) with P(B) > 0, then P(A\|B) equals: | 0 | picks P(A) — conflating disjoint with independent → `mutual-independence` |
| A1 | apply | numeric | 0.1 | A die is rolled; given the result is even, what is P(result is 4)? `[verified: 1/3]` | P(4\|even) = P({4})/P({2,4,6}) = (1/6)/(1/2) = 1/3 | computes 1/6 (forgets to restrict the sample space to the conditioning event) → `conditional-probability` |
| A2 | apply | numeric | 0.25 | In a class, 60% study, 45% pass, and 35% both study and pass. What is P(pass \| study)? `[verified: 35/60 ≈ 0.583]` | 0.35/0.60 ≈ 0.583 | computes P(study\|pass) = 0.35/0.45 instead → `conditional-probability` |
| E1 | explain | derivation | 0.8 | Show that P(·\|B) is itself a valid probability function on the restricted sample space B — i.e. verify it satisfies the three axioms. | non-negativity and P(B\|B)=1 are immediate; countable additivity: for disjoint Aᵢ, P(⋃Aᵢ\|B) = P((⋃Aᵢ)∩B)/P(B) = ΣP(Aᵢ∩B)/P(B) = ΣP(Aᵢ\|B) *(required: all three axioms addressed)* | verifies only P(B\|B)=1 and treats that as sufficient | 
| E2 | explain | short-answer | 0.95 | The *chain rule* P(A∩B∩C) = P(A)·P(B\|A)·P(C\|A∩B) follows from the definition of conditional probability alone. Show it, and say why this is useful even before independence is assumed. | telescoping product of definitions; useful because it lets you build up a joint probability from a sequence of "easier" conditional judgments (e.g. sequential draws without replacement) *(required)* | — |
| T1 | transfer | short-answer | 1.3 | You're told "P(rain \| cloudy) = 0.8." A friend says this means "80% of days are both cloudy and rainy." Are they right? If not, what do they need P(cloudy) for to get that number? | wrong — 0.8 is the probability of rain *restricted to cloudy days*, not a joint probability of the whole sample space; the joint P(rain∩cloudy) = P(rain\|cloudy)·P(cloudy), which needs the marginal P(cloudy) too | conflates a conditional probability with a joint probability → `conditional-probability` |

*Coverage: 2/2/2/1 — 7 items, −0.7…1.3.*

---

## Bayes' Rule (`bayes-rule`)
*Prereq: Conditional Probability · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | State Bayes' rule. | P(A\|B) = P(B\|A)P(A) / P(B) | — |
| R2 | recall | mcq | −0.4 | In P(A\|B) = P(B\|A)P(A)/P(B), P(A) is called the: | prior | picks "posterior" for P(A) instead of P(A\|B) → `bayes-rule` |
| A1 | apply | numeric | 0.2 | Two urns: Urn 1 has 3 red/2 blue, Urn 2 has 1 red/4 blue. Pick an urn at random (50/50), draw a ball, it's red. P(Urn 1 \| red)? `[verified]` | P(red)=0.5·0.6+0.5·0.2=0.4; P(Urn1\|red)=0.5·0.6/0.4=0.75 | forgets the law-of-total-probability denominator and reports P(red\|Urn1)=0.6 as the answer → `bayes-rule` |
| A2 | apply | numeric | 0.35 | *(the screening-test item already live as `bayes-rule--transfer-screening`; retained here as the canonical apply-level companion at a fresh set of numbers.)* Disease prevalence 0.5%, test sensitivity 98%, false-positive rate 3%. P(disease \| positive)? `[verified]` | P(pos)=0.005·0.98+0.995·0.03=0.0347; P(disease\|pos)=0.0049/0.0347≈0.141 | reports the sensitivity (0.98) as the answer → `conditional-probability` (inverse-conditional error) |
| E1 | explain | derivation | 0.9 | Derive Bayes' rule from the definition of conditional probability alone (both P(A\|B) and P(B\|A) expand from the same joint). | P(A\|B)=P(A∩B)/P(B), P(B\|A)=P(A∩B)/P(A) ⟹ P(A∩B)=P(B\|A)P(A); substitute *(required)* | — |
| E2 | explain | short-answer | 1.05 | Explain why a rare disease with an accurate test can still yield P(disease\|positive) far below the test's sensitivity. | the false-positive pool (nearly all of the healthy 99.5%, times even a small false-positive rate) can outnumber the true-positive pool (a small prevalence times a high sensitivity) — a base-rate argument *(required)* | — |
| T1 | transfer | short-answer | 1.4 | A juror hears "the defendant's blood type matches the crime-scene sample; only 1% of the population has this type." A lawyer argues "so there's a 99% chance the defendant is guilty." Name the fallacy and what's missing from the argument. | prosecutor's fallacy — confuses P(evidence\|innocent) [≈1%] with P(guilty\|evidence); the correct computation needs a *prior* on guilt (e.g. from the size of the population who could plausibly have committed the crime) via Bayes' rule, not the match rate alone | restates the 1% as if it directly answered the question asked → `bayes-rule` |

*Coverage: 2/2/2/1 — 7 items, −0.6…1.4. Two apply items deliberately: A1 is symmetric/gentle, A2 is the canonical inverted-conditional trap.*

---

## Independence (Set Theory) (`independence-set-theory`)
*Prereq: Probability Function · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Define independence of two events A, B. | P(A∩B) = P(A)P(B) | defines it as P(A\|B)=P(A\|Bᶜ) — true but not the primitive definition, and undefined when P(B) or P(Bᶜ) is 0 → `independence-set-theory` |
| R2 | recall | mcq | −0.5 | Which pair is necessarily true: independent events are always disjoint / disjoint events (with positive probability) are never independent / independent events always have equal probability? | disjoint events with positive probability are never independent | picks "independent events are always disjoint" → `independence-set-theory` |
| A1 | apply | numeric | 0.1 | P(A)=0.4, P(B)=0.5. If A, B independent, find P(A∪B). If instead A, B disjoint, find P(A∪B). `[verified]` | independent: 0.4+0.5−0.4·0.5=0.7; disjoint: 0.4+0.5=0.9 | uses the disjoint addition rule (no subtraction) in the independent case → `probability-function` |
| A2 | apply | short-answer | 0.25 | Two fair dice are rolled. Are "sum = 7" and "first die = 4" independent? `[verified: yes, both computations give 1/6]` | P(sum=7)=1/6, P(sum=7\|first=4)=P(second=3)=1/6 — equal, so independent (a fact worth being surprised by) | assumes any relationship between two dice must be independent without checking → `conditional-probability` |
| E1 | explain | derivation | 0.8 | Prove: if A and B are independent, then so are A and Bᶜ. | P(A∩Bᶜ)=P(A)−P(A∩B)=P(A)−P(A)P(B)=P(A)(1−P(B))=P(A)P(Bᶜ) *(required, full chain)* | — |
| E2 | explain | short-answer | 0.95 | The single most common confusion in this topic: explain, precisely, the difference between "independent" and "mutually exclusive" (disjoint), and why they pull in *opposite* directions for P(A∩B). | independence says the events don't inform each other; disjoint says they *can't co-occur* — disjoint is actually strong (negative) information about co-occurrence, so disjoint events with positive individual probabilities are always dependent *(required: the "opposite directions" framing, not just two separate definitions)* | — |
| T1 | transfer | short-answer | 1.3 | A stock's daily up/down moves are modeled as independent. A trader says "it's been up 6 days straight, so it's 'due' for a down day." What does independence actually imply about tomorrow, and name the fallacy. | independence implies tomorrow's move is unaffected by the streak — P(down tomorrow) is unchanged; this is the gambler's fallacy | agrees that a long streak changes the odds under an independence model → `independence-set-theory` |

*Coverage: 2/2/2/1 — 7 items, −0.7…1.3.*

---

## Mutual Independence (`mutual-independence`)
*Prereq: Independence (Set Theory) · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | Define mutual independence of events A₁,…,Aₙ (not just pairwise). | P(⋂ᵢ∈S Aᵢ) = Πᵢ∈S P(Aᵢ) for **every** subset S of {1,…,n}, not just pairs | states only the pairwise condition and calls it sufficient → `mutual-independence` |
| R2 | recall | mcq | −0.4 | For n=3 events, how many independence equations does *full* mutual independence require (beyond the trivial ones)? | 4 — three pairwise, one triple-wise | counts only the 3 pairwise conditions → `mutual-independence` |
| A1 | apply | numeric | 0.2 | Three independent fair coins are flipped. Find P(all three heads) and P(exactly one head). `[verified: 1/8, 3/8]` | all heads: (1/2)³=1/8; exactly one: C(3,1)(1/2)³=3/8 | computes "exactly one" as 1/2 · (1/2)² without the C(3,1) count → `binomial-theorem` |
| A2 | apply | short-answer | 0.35 | Three components in series each function independently with probability 0.95. What's the probability the system (all three) functions? `[verified: 0.857375]` | 0.95³ = 0.857375 — the multiplicative form is exactly what mutual independence licenses | adds the probabilities (0.95×3, capping oddly) or averages them instead of multiplying → `mutual-independence` |
| E1 | explain | derivation | 0.9 | The classic counterexample: let X, Y be independent fair coin flips (0/1), and Z = X XOR Y. Show A={X=1}, B={Y=1}, C={Z=1} are *pairwise* independent but not *mutually* independent. | check all 3 pairs: each pair is independent by direct computation (P=1/4=1/2·1/2 for each); but P(A∩B∩C) = P(X=1,Y=1,Z=1) = 0 (since Z=X⊕Y=0 when X=Y=1) ≠ P(A)P(B)P(C)=1/8 *(required: the explicit triple computation showing the failure)* | checks only the pairwise conditions and concludes mutual independence holds → `mutual-independence` |
| E2 | explain | short-answer | 1.05 | Why does the variance of a sum, Var(ΣXᵢ) = ΣVar(Xᵢ), require only *pairwise* independence (in fact only pairwise zero covariance), while the multiplicative factorization of a joint pmf/pdf requires the *full* mutual independence condition? | variance of a sum expands into a sum of covariance terms, each of which only involves a pair at a time; a joint density factoring for *every* subset is a strictly stronger, higher-order statement *(required)* — this is why the XOR counterexample in E1 doesn't break additivity of variance even though it breaks mutual independence | claims the XOR counterexample also breaks Var(sum)=sum(Var) → `mutual-independence` |
| T1 | transfer | short-answer | 1.4 | A server farm has 100 machines, each failing independently with probability 0.01 per day. A manager claims "with 100 machines at 1% each, we'll basically always have exactly one failure a day." Critique this using what mutual independence actually implies about the *distribution* of the failure count (this is the seed of `bernoulli-binomial`). | mutual independence with identical p gives a Binomial(100, 0.01) count, not a deterministic "exactly one" — P(0 failures)≈0.366, P(1)≈0.370, P(≥2)≈0.264 `[verified]`; the manager has mistaken the *mean* (1) for the *typical outcome*, ignoring the spread independence still allows | treats E[count]=1 as meaning the count is usually exactly 1 → `bernoulli-binomial` (this is precisely the prerequisite this concept was added to support, per `assessment.md` §1.4) |

*Coverage: 2/2/2/1 — 7 items, −0.6…1.4. E1 (the XOR counterexample) is the standout item in this cluster — it is the sharpest available demonstration that "independence" is not one condition but a hierarchy.*

---

## Cluster 1 misconception index

| Tag | Blame |
|---|---|
| `demorgan-swap`, `partition-overlap` | `set-theory` |
| `pie-drops-triple` | `pie-boole` |
| several unnamed sigma-algebra / axiom slips | `sigma-algebra`, `axioms-of-probability` |
| inverse-conditional errors (Bayes read backwards) | `conditional-probability` |
| disjoint ⟺ independent conflation | `mutual-independence` or `conditional-probability` depending on direction |
| pairwise-implies-mutual independence | `mutual-independence` |
| gambler's fallacy | `independence-set-theory` |

**Cluster total: 77 items across 11 concepts (7 each).** All spreads exceed the 1.5-logit minimum
`auditCoverage` wants; all concepts clear recall/apply/explain. Numeric claims marked `[verified]`
have been checked; a few (A1/Bayes urn, A2/Bayes screening) are marked `[verified]` pending the
cluster-wide batch check in the tracking issue for this bank.
