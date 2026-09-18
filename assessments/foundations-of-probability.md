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
| R3 | recall | mcq | −1.45 | Which is the other De Morgan's law (the ∩ version)? | (A∩B)ᶜ = Aᶜ∪Bᶜ | picks (A∩B)ᶜ=Aᶜ∩Bᶜ → `set-theory` |
| R4 | recall | short-answer | −1.4 | Define A∪B, the union of A and B. | {x : x∈A or x∈B} | — |
| R5 | recall | short-answer | −1.35 | Define A∩B, the intersection of A and B. | {x : x∈A and x∈B} | — |
| R6 | recall | mcq | −1.3 | What is A∩Aᶜ, for any set A? | ∅ | picks Ω, confusing A∩Aᶜ with A∪Aᶜ → `set-theory` |
| R7 | recall | short-answer | −1.25 | True or false: A∪Aᶜ = Ω for any A ⊆ Ω. | true | — |
| R8 | recall | short-answer | −1.2 | Define the empty set ∅. | the unique set containing no elements | — |
| R9 | recall | short-answer | −1.15 | Define A ⊆ B, "A is a subset of B." | every element of A is also an element of B | — |
| R10 | recall | mcq | −1.1 | If \|A\| = n, how many elements does the power set P(A) have? | 2ⁿ | picks n² or n! → `set-theory` |
| R11 | recall | short-answer | −1.05 | What does it mean for A and B to be disjoint? | A∩B = ∅ | — |
| R12 | recall | mcq | −1.0 | Which is a correct distributive law? | A∩(B∪C) = (A∩B)∪(A∩C) | picks A∩(B∪C) = (A∩B)∪C, dropping the second intersection → `set-theory` |
| R13 | recall | short-answer | −0.95 | Fill in the blank: A∪(B∪C) = ___ (associativity of union). | (A∪B)∪C | — |
| R14 | recall | short-answer | −0.9 | True or false: A∩B = B∩A for all sets A, B. | true | — |
| R15 | recall | short-answer | −0.85 | Define the symmetric difference A△B. | (A∪B)∖(A∩B), i.e. elements in exactly one of A, B | — |
| R16 | recall | mcq | −0.8 | What is the cardinality of the empty set? | 0 | picks "undefined" — ∅ is still a well-defined set, just with 0 elements → `set-theory` |
| A3 | apply | numeric | −0.65 | \|A\|=8, \|B\|=5, \|A∩B\|=3. Find \|A∪B\|. `[verified: 10]` | 8+5−3=10 | adds without subtracting the overlap, answering 13 → `set-theory` |
| A4 | apply | short-answer | −0.5 | Simplify (A∩B)∪(A∩Bᶜ). | A — the two pieces partition A by whether elements are in B or not | leaves the expression unsimplified or answers Ω → `set-theory` |
| A5 | apply | short-answer | −0.4 | Ω={1,…,6}, A={1,2,3}, B={2,3,4}. Find A∖B and B∖A, and confirm they differ. | A∖B={1}; B∖A={4}; they differ | claims A∖B=B∖A since both "remove the shared elements" {2,3} → `set-theory` |
| A6 | apply | short-answer | −0.3 | Ω={1,…,10}, A={2,4,6,8,10}. Find Aᶜ. | {1,3,5,7,9} | takes the complement relative to A's own elements instead of Ω → `set-theory` |
| E3 | explain | derivation | 0.2 | Prove the distributive law A∩(B∪C) = (A∩B)∪(A∩C) by an element-wise iff argument. | x∈A∩(B∪C) ⟺ x∈A ∧ (x∈B∨x∈C) ⟺ (x∈A∧x∈B)∨(x∈A∧x∈C) ⟺ x∈(A∩B)∪(A∩C) *(required)* | asserts the law via a Venn picture instead of the iff chain → `set-theory` |
| E4 | explain | short-answer | 0.4 | Explain, from the definition of ∖, why A∖B ≠ B∖A in general. | A∖B=A∩Bᶜ keeps elements of A not in B; B∖A=B∩Aᶜ keeps elements of B not in A — generally different unless A=B *(required)* | — |
| E5 | explain | short-answer | 0.45 | Explain why associativity of union, A∪(B∪C)=(A∪B)∪C, licenses writing A∪B∪C with no parentheses. | both groupings pick out exactly the elements in at least one of the three sets, so the grouping never changes the result *(required)* | — |
| T2 | transfer | short-answer | 0.7 | A company's employees: A = "knows Python," B = "knows SQL." Express "knows exactly one of the two" and "knows neither" in set notation. | A△B; (A∪B)ᶜ | writes "exactly one" as A∪B → `set-theory` |
| T3 | transfer | short-answer | 0.75 | In a three-set Venn diagram (A, B, C), give the set expression for "in A and B but not C." | (A∩B)∩Cᶜ, equivalently A∩B∖C | forgets to exclude C, answering A∩B → `set-theory` |

*Coverage: 16 recall, 6 apply, 5 explain, 3 transfer — 30 items, spread −1.50…0.75 (2.25 logits).*

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
| R3 | recall | mcq | −1.6 | For two sets, \|A∪B\| equals: | \|A\|+\|B\|−\|A∩B\| | picks \|A\|+\|B\|, forgetting the overlap → `pie-boole` |
| R4 | recall | short-answer | −1.55 | State Boole's inequality symbolically for events A₁,…,Aₙ. | P(⋃Aᵢ) ≤ ΣP(Aᵢ) | — |
| R5 | recall | short-answer | −1.5 | True or false: Boole's inequality only holds when the events are disjoint. | false — it holds for any events, disjoint or not | — |
| R6 | recall | short-answer | −1.45 | What is Boole's inequality also commonly called? | the union bound | — |
| R7 | recall | mcq | −1.4 | Equality holds in Boole's inequality P(⋃Aᵢ) ≤ ΣP(Aᵢ) exactly when: | the events are pairwise disjoint | picks "the events are independent" → `pie-boole` |
| R8 | recall | short-answer | −1.35 | What sign pattern does inclusion-exclusion (PIE) follow as more sets are added? | alternating: add singles, subtract pairs, add triples, subtract quadruples, … | — |
| R9 | recall | short-answer | −1.3 | Fill in the blank: for two events, \|A∪B\| = \|A\|+\|B\| − ___. | \|A∩B\| | — |
| R10 | recall | mcq | −1.25 | The "first Bonferroni inequality" is another name for: | Boole's inequality (the union bound) | picks the full PIE formula → `pie-boole` |
| R11 | recall | short-answer | −1.2 | Does applying PIE require the events to be independent? | no — PIE follows from additivity and holds regardless of dependence | — |
| R12 | recall | short-answer | −1.15 | True or false: Boole's inequality is what you get from PIE by keeping only the first (singles) term and dropping the rest. | true | — |
| R13 | recall | mcq | −1.1 | Full inclusion-exclusion for 3 sets \|A∪B∪C\| has how many terms on the right-hand side? | 7 (3 singles, 3 pairs, 1 triple) | picks 3, counting only the singles → `pie-boole` |
| R14 | recall | short-answer | −1.05 | State Boole's inequality for exactly two events A, B. | P(A∪B) ≤ P(A)+P(B) | — |
| R15 | recall | mcq | −1.0 | Which of these is NOT required for Boole's inequality P(⋃Aᵢ) ≤ ΣP(Aᵢ) to hold? | that the events be independent | picks "that each P(Aᵢ) be a valid probability," which *is* required → `pie-boole` |
| R16 | recall | short-answer | −0.9 | In plain words, what does Boole's inequality bound? | the probability that *at least one* of several events happens, using only the individual event probabilities | — |
| A3 | apply | numeric | −0.3 | Of 100 readers, 40 read fiction, 25 read nonfiction, 10 read both. How many read at least one? `[verified: 55]` | 40+25−10 = 55 | adds without subtracting the overlap, answering 65 → `pie-boole` |
| A4 | apply | numeric | −0.15 | 8 independent alarms each false-trigger with probability 0.1. Bound P(at least one false trigger) using Boole. `[verified: 0.8]` | Σ = 8×0.1 = 0.8 | multiplies the probabilities instead of summing → `pie-boole` |
| A5 | apply | short-answer | 0.0 | \|A\|=50, \|B\|=40, \|C\|=30, \|A∩B\|=20, \|A∩C\|=15, \|B∩C\|=10, \|A∩B∩C\|=5. Find \|A∪B∪C\| by PIE. `[verified: 80]` | 50+40+30−20−15−10+5 = 80 | omits the +\|A∩B∩C\| correction term, stopping after the pairs → `pie-boole` |
| A6 | apply | numeric | 0.15 | Three independent events each with P=0.3. Compare the Boole bound on P(at least one) to the true value. `[verified: bound 0.9, true 0.657]` | bound: 3×0.3=0.9; true: 1−0.7³=0.657 — the bound is loose but not vacuous here | reports the Boole bound itself as the true probability → `pie-boole` |
| E3 | explain | derivation | 0.4 | Derive the 3-set inclusion-exclusion formula \|A∪B∪C\| from the 2-set addition rule applied twice. | write A∪B∪C = (A∪B)∪C; apply the 2-set rule to get \|A∪B\|+\|C\|−\|(A∪B)∩C\|; expand \|A∪B\|=\|A\|+\|B\|−\|A∩B\| and \|(A∪B)∩C\|=\|A∩C\|+\|B∩C\|−\|A∩B∩C\| via distributivity, then combine *(required, full chain)* | stops after applying the 2-set rule once, missing the nested expansion → `pie-boole` |
| E4 | explain | short-answer | 0.55 | The Bonferroni inequalities say truncating PIE after the singles gives an upper bound, after the singles-minus-pairs gives a lower bound, and so on. Explain why the bounds alternate direction like this. | each additional alternating term you include corrects for over- or under-counting introduced by the previous truncation, and since PIE alternates sign, each partial sum alternately overshoots and undershoots the true value *(required)* | — |
| E5 | explain | short-answer | 0.65 | Explain how Boole's inequality is the special case of the Bonferroni inequalities that uses the *fewest* terms. | it truncates PIE after just the first (singles) sum, giving the loosest possible upper bound; including the pairwise term next would tighten it into the second Bonferroni inequality *(required)* | — |
| T2 | transfer | short-answer | 0.95 | A researcher runs 20 independent hypothesis tests, each with a 5% chance of a false positive under the null. Use Boole's inequality to bound the family-wise error rate (probability of at least one false positive), and explain why this is the logic behind the Bonferroni correction. | bound: 20×0.05 = 1.0 (vacuous here) `[verified]`; in general Boole gives P(≥1 false positive) ≤ Σ(per-test α), which is exactly why Bonferroni correction sets each test's α to (target FWER)/20 — to keep the *sum*, and hence the bound, at the desired level | treats the 5% per-test rate as also the rate for the whole study → `pie-boole` |
| T3 | transfer | short-answer | 1.0 | A network has 6 independent links, each failing with probability 0.02. Use Boole's inequality to bound P(at least one link fails), and say whether that bound would still be useful if there were 100 links instead. `[verified: bound 0.12; with 100 links bound would be 2.0, vacuous]` | 6×0.02=0.12, a useful bound; with 100 links the bound is 100×0.02=2.0, which exceeds 1 and is vacuous | assumes the bound stays informative regardless of how many links are summed → `pie-boole` |

*Coverage: 16 recall, 6 apply, 5 explain, 3 transfer — 30 items, spread −1.60…1.0 (2.6 logits). Note: A2/A6/T1/T3 deliberately teach the bound's limits, not just its statement.*

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
| R3 | recall | mcq | −1.6 | What is the smallest possible σ-algebra on any Ω? | {∅, Ω} — the trivial σ-algebra | picks the power set, confusing smallest with largest → `sigma-algebra` |
| R4 | recall | short-answer | −1.55 | What is the largest possible σ-algebra on Ω? | the power set of Ω, 2^Ω (every subset is an event) | — |
| R5 | recall | short-answer | −1.5 | True or false: every σ-algebra must contain Ω itself. | true — it's the first axiom | — |
| R6 | recall | short-answer | −1.45 | Define a "measurable space." | a pair (Ω, ℱ) where Ω is a set and ℱ is a σ-algebra on Ω | — |
| R7 | recall | mcq | −1.4 | Elements of a σ-algebra ℱ are best described as: | events (subsets of Ω) | picks "outcomes" — elements of Ω, not ℱ → `sigma-algebra` |
| R8 | recall | short-answer | −1.35 | Fill in the blank: closure under complement means if A∈ℱ then ___∈ℱ. | Aᶜ | — |
| R9 | recall | short-answer | −1.3 | Which axiom guarantees ℱ is closed under countable union? | the third axiom: for A₁,A₂,…∈ℱ, ⋃ᵢAᵢ∈ℱ | — |
| R10 | recall | mcq | −1.25 | The union-closure axiom of a σ-algebra requires closure under: | countable unions (which also gives finite unions as a special case) | picks "finite unions only" → `sigma-algebra` |
| R11 | recall | short-answer | −1.2 | True or false: every σ-algebra is automatically closed under countable intersection too. | true — it follows from complement- and union-closure via De Morgan | — |
| R12 | recall | short-answer | −1.15 | What is the σ-algebra generated by the open intervals of ℝ called? | the Borel σ-algebra | — |
| R13 | recall | mcq | −1.1 | The pair (Ω, ℱ) itself, before any probability is assigned, is called a: | measurable space | picks "probability space" — that requires P too → `sigma-algebra` |
| R14 | recall | short-answer | −1.05 | True or false: the axioms explicitly list ∅∈ℱ as a required axiom. | false — it follows from Ω∈ℱ and complement closure, as shown in R2 | — |
| R15 | recall | short-answer | −1.0 | List the three axioms of a σ-algebra by name. | (1) Ω∈ℱ, (2) closed under complement, (3) closed under countable union | — |
| R16 | recall | mcq | −0.95 | A σ-algebra is a collection of: | subsets of Ω (events), not elements of Ω | picks "elements of Ω" → `sigma-algebra` |
| A3 | apply | short-answer | −0.3 | Ω={a,b,c}. Is the full power set of Ω (all 8 subsets) a σ-algebra? | yes — the power set always satisfies all three axioms trivially | assumes the power set is too large to be a valid σ-algebra → `sigma-algebra` |
| A4 | apply | short-answer | −0.15 | Ω={1,2,3}. Is ℱ={∅, Ω, {1}, {2,3}} a σ-algebra? | yes — Ω∈ℱ, complements {1}ᶜ={2,3} and {2,3}ᶜ={1} are both present, and all unions stay in ℱ | checks only that Ω and ∅ are present and stops → `sigma-algebra` |
| A5 | apply | short-answer | 0.0 | Ω={1,2,3}. Is ℱ={∅, Ω, {1}} a σ-algebra? | no — {1}ᶜ={2,3} is missing, so complement-closure fails | assumes {∅,Ω,A} is automatically a σ-algebra for any A → `sigma-algebra` |
| A6 | apply | short-answer | 0.15 | How many distinct σ-algebras exist on Ω={1,2}? `[verified: 2]` | exactly 2 — the trivial one {∅,Ω} and the full power set {∅,{1},{2},Ω}; with only 2 elements no intermediate collection can be closed under complement | assumes there must be more options since Ω has 2 elements → `sigma-algebra` |
| E3 | explain | derivation | 0.4 | Prove a σ-algebra is closed under set difference: if A,B∈ℱ then A∖B∈ℱ. | A∖B = A∩Bᶜ; Bᶜ∈ℱ by complement-closure, and ℱ is closed under (countable, hence finite) intersection by A2's result, so A∩Bᶜ∈ℱ *(required: cites both closure facts)* | asserts A∖B∈ℱ without justifying it from the two closure properties → `sigma-algebra` |
| E4 | explain | short-answer | 0.55 | Explain why {∅,Ω} and the power set 2^Ω are the two extremes among σ-algebras on Ω. | {∅,Ω} is the coarsest possible — it distinguishes nothing beyond "did something happen at all"; 2^Ω is the finest possible — every subset is distinguishable as an event; every other σ-algebra on Ω sits between these in how much it can distinguish *(required)* | — |
| E5 | explain | short-answer | 0.6 | Why is (Ω, ℱ) called a "measurable space" even before any probability P is defined on it? | ℱ fixes *which* subsets are even eligible to be assigned a probability — the structure of "what can be measured" is separate from, and prior to, the actual assignment of numbers via P *(required)* | — |
| T2 | transfer | short-answer | 0.9 | A trader can only observe whether a stock closed "up" or "down" today, never the exact price. Model this as a σ-algebra ℱ on the space of exact closing prices Ω=(0,∞), coarser than the full Borel σ-algebra. | ℱ = {∅, Ω, U, Uᶜ} where U is the set of prices above today's opening price — only two distinguishable events are representable, far coarser than Borel, which would let you ask about any exact price range | tries to build ℱ from every possible exact price, missing that the trader's limited information is exactly what a coarse σ-algebra encodes → `sigma-algebra` |
| T3 | transfer | short-answer | 0.95 | Give an example of two σ-algebras ℱ₁ ⊂ ℱ₂ on the same Ω, and explain what it means that ℱ₂ carries "more information" than ℱ₁. | e.g. Ω={1,2,3,4}, ℱ₁={∅,Ω,{1,2},{3,4}} (only distinguishes "low" vs "high"), ℱ₂=2^Ω (distinguishes every outcome); ℱ₂ can express every event ℱ₁ can plus strictly more, so any question answerable with ℱ₁'s events is also answerable with ℱ₂'s *(required: a concrete ℱ₁⊂ℱ₂ pair with the distinguishing-power argument)* | claims a smaller σ-algebra (fewer sets) must be "less accurate," rather than encoding coarser distinguishable information → `sigma-algebra` |

*Coverage: 16 recall, 6 apply, 5 explain, 3 transfer — 30 items, spread −1.60…0.95 (2.55 logits).*

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
| R3 | recall | mcq | −1.5 | Which of these is a *consequence* of the axioms rather than an axiom itself? | P(A) ≤ 1 for all A | picks "P(A) ≥ 0" as a consequence, when it is in fact axiom 1 itself → `axioms-of-probability` |
| R4 | recall | short-answer | −1.45 | State the normalization axiom. | P(Ω) = 1 | — |
| R5 | recall | short-answer | −1.4 | State the non-negativity axiom. | P(A) ≥ 0 for every event A | — |
| R6 | recall | short-answer | −1.35 | True or false: the axioms require P to be defined on every subset of Ω. | false — only on the events in the σ-algebra ℱ | — |
| R7 | recall | mcq | −1.3 | Which of these is NOT one of Kolmogorov's three axioms? | "P is a continuous function of the outcome" | picks "countable additivity over disjoint events" as not an axiom, when it is the third one → `axioms-of-probability` |
| R8 | recall | short-answer | −1.25 | Fill in the blank: P(Aᶜ) = ___. | 1 − P(A) | — |
| R9 | recall | mcq | −1.2 | The normalization axiom sets the total probability of the sample space Ω to: | 1 | picks "the number of outcomes in Ω" → `axioms-of-probability` |
| R10 | recall | short-answer | −1.15 | True or false: a probability value can be negative. | false — axiom 1 forbids it | — |
| R11 | recall | short-answer | −1.1 | Define a "probability measure" in one line. | a function P on the events of a σ-algebra satisfying non-negativity, normalization, and countable additivity | — |
| R12 | recall | mcq | −1.05 | Which is a derived consequence, not an axiom? | P(∅) = 0 | picks "countable additivity" as derived, when it is axiom 3 → `axioms-of-probability` |
| R13 | recall | short-answer | −1.0 | State monotonicity in words. | if A ⊆ B, then P(A) ≤ P(B) | — |
| R14 | recall | short-answer | −0.95 | True or false: the three axioms alone guarantee P(A) ≤ P(B) whenever A ⊆ B. | true — this is monotonicity, itself a derived consequence (see E1) | — |
| R15 | recall | mcq | −0.9 | The three probability axioms are usually credited to: | Kolmogorov | picks Bayes or Laplace → `axioms-of-probability` |
| R16 | recall | short-answer | −0.85 | Fill in the blank: countable additivity requires the events A₁,A₂,… to be ___. | pairwise disjoint | — |
| A3 | apply | numeric | −0.1 | P(A) = 0.3. Find P(Aᶜ). `[verified: 0.7]` | 1 − 0.3 = 0.7 | computes P(Aᶜ) = P(A) = 0.3 → `axioms-of-probability` |
| A4 | apply | short-answer | 0.05 | A function assigns P(A₁)=0.4, P(A₂)=0.35, P(A₃)=0.35 to three pairwise disjoint events covering Ω. Is this a valid probability assignment? | no — the three probabilities sum to 1.1, violating normalization (P(Ω) should be 1) | checks only that each value is between 0 and 1 and stops, without summing → `axioms-of-probability` |
| A5 | apply | numeric | 0.2 | A₁, A₂, A₃ are pairwise disjoint with P(A₁)=0.2, P(A₂)=0.3, P(A₃)=0.1. Find P(A₁∪A₂∪A₃). `[verified: 0.6]` | additivity: 0.2+0.3+0.1 = 0.6 | multiplies the probabilities instead of summing → `axioms-of-probability` |
| A6 | apply | short-answer | 0.3 | A model reports P(A) = 1.2 for some event A. Using only the axioms (not intuition), explain precisely which axiom this violates. | it violates normalization together with monotonicity: since A ⊆ Ω, monotonicity (itself derived from the axioms) forces P(A) ≤ P(Ω) = 1, so P(A) = 1.2 is impossible | says only "probabilities can't exceed 1" without tracing it back to normalization + monotonicity → `axioms-of-probability` |
| E3 | explain | derivation | 0.6 | Prove P(A) ≤ 1 for every event A, using monotonicity and normalization together. | A ⊆ Ω for every event A; monotonicity (proved in E1) gives P(A) ≤ P(Ω); normalization gives P(Ω) = 1; combining, P(A) ≤ 1 *(required: both facts cited and combined)* | asserts P(A)≤1 as if it were itself an axiom, skipping the derivation → `axioms-of-probability` |
| E4 | explain | short-answer | 0.75 | Why is it significant that only *three* axioms are needed to build the entire theory of probability — what does that buy us? | every other fact about probability (P(∅)=0, P(Aᶜ)=1−P(A), monotonicity, the addition rule, Bayes' rule, …) is a logical *consequence* of these three, not a separate assumption — so the whole theory rests on a minimal, checkable foundation, and any new claim about probability can be verified by tracing it back to these three *(required)* | — |
| E5 | explain | short-answer | 0.85 | Explain why axiom 3 is stated as *countable* additivity rather than simply "additivity," given that most everyday examples only ever use two or three events. | countable additivity is strictly stronger than finite additivity, and later constructions (CDFs as limits, continuous random variables, laws of large numbers) genuinely need infinite sequences of events to behave — a theory built on finite additivity alone would be too weak to support them *(required)* | — |
| T2 | transfer | short-answer | 1.15 | A financial model assigns probabilities to five mutually exclusive, exhaustive market outcomes that sum to 0.95. Identify exactly which axiom is violated and what the actual mathematical requirement is. | normalization is violated: for pairwise disjoint events covering Ω, additivity plus P(Ω)=1 forces the probabilities to sum to *exactly* 1, not approximately 1 — 0.95 is not a rounding quirk, it's an inconsistent model | dismisses the 0.05 shortfall as negligible rounding rather than a genuine axiom violation → `axioms-of-probability` |
| T3 | transfer | short-answer | 1.2 | A weather app reports "60% chance of rain" and, separately, "55% chance of no rain" for the same day. Using the axioms, show these two numbers cannot both be correct. | rain and no-rain are complementary events, so P(no rain) must equal 1 − P(rain) = 1 − 0.6 = 0.4 exactly, by the P(Aᶜ)=1−P(A) consequence of the axioms — 0.55 contradicts this | treats the two figures as independently plausible rounding of unrelated estimates rather than a hard axiomatic constraint → `axioms-of-probability` |

*Coverage: 16 recall, 6 apply, 5 explain, 3 transfer — 30 items, spread −1.50…1.20 (2.7 logits).*

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
| R3 | recall | mcq | −1.5 | Which is the general (non-disjoint) addition rule for P(A∪B)? | P(A) + P(B) − P(A∩B) | picks P(A)+P(B), the disjoint-only case, as the general rule → `probability-function` |
| R4 | recall | short-answer | −1.4 | State the formula for P(A∪B) when A and B are disjoint. | P(A) + P(B) — the intersection term drops out since P(A∩B)=0 | — |
| R5 | recall | short-answer | −1.3 | True or false: P(A∪B) can exceed 1. | false — probabilities never exceed 1 | — |
| R6 | recall | short-answer | −1.2 | Rearrange the addition rule to solve for P(A∩B) in terms of P(A), P(B), P(A∪B). | P(A∩B) = P(A) + P(B) − P(A∪B) | — |
| R7 | recall | mcq | −1.1 | Which expression gives P(exactly one of A, B occurs)? | P(A) + P(B) − 2P(A∩B) | picks P(A)+P(B)−P(A∩B), which is P(A∪B) (at least one), not exactly one → `probability-function` |
| R8 | recall | short-answer | −1.0 | True or false: P(A∪B) ≤ P(A) + P(B) always, whether or not A, B overlap. | true | — |
| R9 | recall | short-answer | −0.9 | True or false: if P(A) + P(B) > 1, then A and B must overlap (P(A∩B) > 0). | true — otherwise P(A∪B) would exceed 1, which is impossible | — |
| R10 | recall | mcq | −0.8 | The general addition rule reduces to simple addition P(A)+P(B) exactly when: | A and B are disjoint | picks "A and B are independent" → `probability-function` |
| R11 | recall | short-answer | −0.7 | In words, what does P(A∪B) represent? | the probability that at least one of A or B occurs | — |
| R12 | recall | short-answer | −0.6 | Fill in the blank: for any events A, B, P(A∩B) ≤ ___. | min(P(A), P(B)) | — |
| R13 | recall | mcq | −0.5 | Which inequality always holds for any A, B? | P(A∪B) ≥ max(P(A), P(B)) | picks P(A∪B) ≤ max(P(A),P(B)), backwards → `probability-function` |
| R14 | recall | short-answer | −0.4 | True or false: P is a function from *events* to [0,1], not from individual outcomes. | true | — |
| R15 | recall | short-answer | −0.3 | Fill in the blank: the general addition rule is P(A∪B) = P(A) + P(B) − ___. | P(A∩B) | — |
| R16 | recall | mcq | −0.2 | P(A∩B) can never be: | greater than min(P(A), P(B)) | picks "greater than P(A)+P(B)" — true but a weaker, less useful bound than the intended min bound → `probability-function` |
| A3 | apply | numeric | −0.05 | P(A)=0.55, P(B)=0.4, P(A∩B)=0.2. Find P(A∪B). `[verified: 0.75]` | 0.55+0.4−0.2 = 0.75 | adds without subtracting the overlap, answering 0.95 → `probability-function` |
| A4 | apply | short-answer | 0.05 | P(A)=0.6, P(B)=0.7. Find the tightest possible bounds on P(A∩B). `[verified: [0.3, 0.6]]` | upper bound: min(0.6,0.7)=0.6; lower bound: P(A)+P(B)−1=0.3 (since P(A∪B)≤1) | gives only the upper bound and forgets the lower (Bonferroni-type) bound exists → `probability-function` |
| A5 | apply | numeric | 0.15 | P(A)=0.5, P(B)=0.5, A and B disjoint. Find P(A∪B). `[verified: 1]` | disjoint ⟹ additivity applies directly: 0.5+0.5=1 | subtracts an assumed nonzero overlap even though A, B are stated to be disjoint → `probability-function` |
| A6 | apply | numeric | 0.25 | P(A)=0.5, P(B)=0.4, P(A∩B)=0.1. Find P(exactly one of A, B occurs). `[verified: 0.7]` | P(A)+P(B)−2P(A∩B) = 0.5+0.4−0.2 = 0.7 | computes P(A∪B)=0.8 and reports that as "exactly one" → `probability-function` |
| E3 | explain | derivation | 0.75 | Prove the lower Bonferroni-type bound P(A∩B) ≥ P(A)+P(B)−1, from the axioms. | the addition rule gives P(A∩B)=P(A)+P(B)−P(A∪B); since P(A∪B)≤1 (a consequence of the axioms, `axioms-of-probability`), substituting the largest possible value of P(A∪B) gives the smallest possible P(A∩B): P(A)+P(B)−1 *(required, the substitution step)* | derives only the upper bound P(A∩B)≤min(P(A),P(B)) and treats that as the complete answer → `probability-function` |
| E4 | explain | short-answer | 0.9 | Explain why P(A∩B) ≤ min(P(A), P(B)) follows from monotonicity alone. | A∩B ⊆ A and A∩B ⊆ B, so monotonicity (P of a subset ≤ P of the superset) gives P(A∩B) ≤ P(A) and P(A∩B) ≤ P(B) simultaneously, hence P(A∩B) ≤ the smaller of the two *(required)* | — |
| E5 | explain | short-answer | 1.0 | Explain why the general addition rule is a *generalization* of additivity for disjoint events, not a replacement for it. | when A∩B=∅, P(A∩B)=0 by the axioms' additivity, and the general rule P(A)+P(B)−P(A∩B) collapses exactly to P(A)+P(B) — so disjoint additivity is the special case, recovered automatically rather than needing a separate rule *(required)* | — |
| T2 | transfer | short-answer | 1.3 | A survey reports 70% of respondents like coffee, 65% like tea, and only 20% like neither. Use the addition rule to check whether these figures are consistent, and if so, find P(like both). | consistent: P(coffee∪tea) = 1−0.2 = 0.8; addition rule gives P(both) = 0.7+0.65−0.8 = 0.55 `[verified]`, which is a valid probability (between 0 and min(0.7,0.65)) — the figures check out | computes P(coffee∪tea) as 0.7+0.65=1.35 directly, missing that it must first be derived from the "neither" figure → `probability-function` |
| T3 | transfer | short-answer | 1.35 | A retailer claims P(customer buys item A) = 0.8 and P(customer buys item B) = 0.75, with the two purchases modeled as disjoint events (a customer buys at most one item type). Explain why this claim is impossible on its face, without any further data. | disjoint events require P(A∪B)=P(A)+P(B)=1.55>1, which the axioms forbid outright — the claim is inconsistent regardless of what "disjoint" is meant to capture about customer behavior | tries to compute P(A∩B) to check consistency, missing that the very premise of disjointness with these numbers is already impossible → `probability-function` |

*Coverage: 16 recall, 6 apply, 5 explain, 3 transfer — 30 items, spread −1.50…1.35 (2.85 logits).*

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
| R3 | recall | mcq | −1.6 | The number of ways to arrange n distinct items in a row is: | n! | picks n, confusing "n items" with "n arrangements" → `counting-methods` |
| R4 | recall | short-answer | −1.5 | Define n! (n factorial). | the product n×(n−1)×(n−2)×⋯×2×1 | — |
| R5 | recall | short-answer | −1.45 | True or false: 0! = 1. | true, by convention (and consistency with the formulas that use it) | — |
| R6 | recall | short-answer | −1.4 | State the formula for C(n,k), the number of unordered k-subsets of n items. | n!/(k!(n−k)!) | — |
| R7 | recall | mcq | −1.35 | C(n,0) equals: | 1 — there is exactly one way to choose nothing | picks 0, thinking "choosing none" means "no ways" → `counting-methods` |
| R8 | recall | short-answer | −1.3 | Fill in the blank: the number of *ordered* subsets ("permutations") of k from n distinct items is ___. | n!/(n−k)! | — |
| R9 | recall | short-answer | −1.25 | Name the four counting cases formed by crossing "ordered vs. unordered" with "with vs. without replacement." | ordered-with-replacement (nᵏ), ordered-without-replacement (n!/(n−k)!), unordered-without-replacement (C(n,k)), unordered-with-replacement (stars and bars, C(n+k−1,k)) | — |
| R10 | recall | mcq | −1.2 | The number of ways to seat n distinct people around a circular table (rotations considered the same arrangement) is: | (n−1)! | picks n!, forgetting rotational symmetry collapses n equivalent arrangements into one → `counting-methods` |
| R11 | recall | short-answer | −1.15 | True or false: permutations count order; combinations do not. | true | — |
| R12 | recall | short-answer | −1.1 | State the count for sampling k items *with* replacement, *ordered*, from n options. | nᵏ | — |
| R13 | recall | mcq | −1.05 | "Sampling with replacement, unordered" is counted by: | stars and bars, C(n+k−1, k) | picks C(n,k), the without-replacement unordered count → `counting-methods` |
| R14 | recall | short-answer | −1.0 | State the multinomial coefficient for splitting n items into groups of sizes n₁,…,nᵣ (Σnᵢ=n). | n!/(n₁!n₂!⋯nᵣ!) | — |
| R15 | recall | short-answer | −0.95 | Fill in the blank: C(n,k) = C(n, ___), by the symmetry identity. | n−k | — |
| R16 | recall | short-answer | −0.9 | True or false: the number of subsets of any size of an n-element set is 2ⁿ. | true | — |
| A3 | apply | numeric | −0.3 | How many ways can 6 distinct books be arranged on a shelf? `[verified: 720]` | 6! = 720 | computes C(6,6)=1, using combinations instead of permutations for an ordered arrangement → `counting-methods` |
| A4 | apply | numeric | −0.15 | How many distinct 3-person committees can be formed from 10 people? `[verified: 120]` | C(10,3) = 120 | uses 10×9×8=720 (ordered), forgetting a committee has no internal order → `counting-methods` |
| A5 | apply | numeric | 0.0 | Distribute 7 identical candies among 4 distinct kids (a kid may get 0). How many ways? `[verified: 120]` | stars and bars: C(4+7−1, 7) = C(10,7) = 120 | uses C(4,7), applying the without-replacement formula to an unlimited-repeats situation → `counting-methods` |
| A6 | apply | numeric | 0.15 | How many ways can 5 distinct people be seated around a circular table? `[verified: 24]` | (5−1)! = 4! = 24 | computes 5! = 120, not accounting for rotational equivalence → `counting-methods` |
| E3 | explain | derivation | 0.4 | Derive the permutation formula n!/(n−k)! by counting sequential choices (not by quoting the formula). | the 1st position has n choices, the 2nd has n−1 (one used), …, the k-th has n−k+1; multiplying gives n(n−1)⋯(n−k+1), which equals n!/(n−k)! after multiplying and dividing by (n−k)! *(required: the sequential-choice argument, not just algebra)* | quotes the formula and verifies it algebraically without the sequential-choice reasoning asked for | 
| E4 | explain | short-answer | 0.55 | Explain why "stars and bars" correctly counts distributions of k identical items into n distinct bins. | representing the distribution as a sequence of k stars and n−1 bars (dividers between bins) turns "how many ways to distribute" into "how many ways to arrange this sequence," which is C(n+k−1, k) since the bars can sit in any k of the n+k−1 total positions *(required: the star/bar encoding, not just the final formula)* | — |
| E5 | explain | short-answer | 0.65 | Explain why C(n,k) = n!/(n−k)! divided by k!, connecting combinations back to permutations directly. | every unordered k-subset corresponds to exactly k! different ordered arrangements (permutations) of the same k items, so dividing the permutation count by k! removes the "which order" information and leaves just "which items" *(required)* | — |
| T2 | transfer | short-answer | 0.95 | How many distinct arrangements are there of the letters in "MISSISSIPPI"? Set up the multinomial coefficient and compute it. `[verified: 11!/(4!4!2!) = 34,650]` | 11 letters total: M×1, I×4, S×4, P×2; 11!/(1!4!4!2!) = 34,650 | uses 11! without dividing by the repeated-letter factorials → `counting-methods` |
| T3 | transfer | short-answer | 1.0 | A manager must allocate 10 identical training slots among 3 distinct teams, and each team must get *at least one* slot. Set up the count via stars and bars, adjusting for the "at least one" constraint. `[verified: C(9,2) = 36]` | give each team 1 slot first (uses 3), leaving 7 to distribute freely among 3 teams with no constraint: C(7+3−1,7) = C(9,7) = C(9,2) = 36 | applies stars and bars directly to 10 items and 3 bins without first setting aside the mandatory minimum, over-counting invalid all-zero allocations → `counting-methods` |

*Coverage: 16 recall, 6 apply, 5 explain, 3 transfer — 30 items, spread −1.60…1.0 (2.6 logits).*

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
| R3 | recall | mcq | −1.55 | The coefficients in the expansion of (1+x)ⁿ are: | C(n,k) for k=0,…,n | picks n choose (n−k) as if it differed from C(n,k) → `binomial-theorem` |
| R4 | recall | short-answer | −1.45 | State the binomial theorem for (1+x)ⁿ specifically. | Σₖ C(n,k) xᵏ, k=0..n | — |
| R5 | recall | short-answer | −1.35 | True or false: Σₖ (−1)ᵏ C(n,k) = 0 for n ≥ 1. | true | — |
| R6 | recall | short-answer | −1.25 | Fill in the blank: the entry in row n, position k of Pascal's triangle is ___. | C(n,k) | — |
| R7 | recall | mcq | −1.15 | The general term in the expansion of (x+y)ⁿ is: | C(n,k) xᵏ yⁿ⁻ᵏ | picks C(n,k) xᵏyᵏ, using the same exponent for both variables → `binomial-theorem` |
| R8 | recall | short-answer | −1.05 | State the binomial theorem symbolically for (x+y)ⁿ. | Σₖ C(n,k) xᵏ yⁿ⁻ᵏ, k=0..n | — |
| R9 | recall | short-answer | −0.95 | True or false: the expansion of (x+y)ⁿ has exactly n+1 terms. | true | — |
| R10 | recall | mcq | −0.85 | C(n,1) equals: | n | picks 1, confusing C(n,0) with C(n,1) → `binomial-theorem` |
| R11 | recall | short-answer | −0.75 | Fill in the blank: C(n,n) = ___. | 1 | — |
| R12 | recall | short-answer | −0.65 | True or false: the binomial theorem requires x and y to both be positive. | false — it holds for any real (or complex) x, y | — |
| R13 | recall | mcq | −0.55 | Pascal's rule C(n,k) = C(n−1,k−1) + C(n−1,k) reflects which counting split? | whether a fixed distinguished item is included in the chosen subset or not | picks "whether n is even or odd" — unrelated to the identity → `binomial-theorem` |
| R14 | recall | short-answer | −0.45 | What is another common notation for the binomial coefficient C(n,k)? | (n choose k), written as a vertical column n over k in parentheses | — |
| R15 | recall | mcq | −0.35 | The sum of all entries in row 4 of Pascal's triangle (C(4,0)+…+C(4,4)) equals: | 16 (= 2⁴) | picks 8, halving 2ⁿ → `binomial-theorem` |
| R16 | recall | short-answer | −0.25 | True or false: the coefficients of (x+y)ⁿ read the same forwards and backwards (are symmetric). | true — C(n,k) = C(n,n−k) | — |
| A3 | apply | numeric | −0.1 | Find the coefficient of x²y² in (x+y)⁴. `[verified: 6]` | C(4,2) = 6 | uses C(4,4)=1, misreading which two exponents index the term → `binomial-theorem` |
| A4 | apply | numeric | 0.05 | Find the sum of all coefficients in the expansion of (2x+3y)⁵ by evaluating at x=y=1. `[verified: 3125]` | (2·1+3·1)⁵ = 5⁵ = 3125 | expands term by term and re-sums the individual C(5,k)2^k3^(5−k) values incorrectly instead of using the x=y=1 shortcut, or forgets to raise (2+3) to the 5th power → `binomial-theorem` |
| A5 | apply | numeric | 0.2 | Find the coefficient of x³ in (1+x)⁷. `[verified: 35]` | C(7,3) = 35 | uses C(7,4) by symmetry but then also fails to note they're actually equal, second-guessing into a wrong number → `binomial-theorem` |
| A6 | apply | numeric | 0.35 | Find the coefficient of x⁴y³ in (3x−y)⁷. `[verified: -2835]` | C(7,4)·3⁴·(−1)³ = 35·81·(−1) = −2835 | drops the sign from (−1)³, reporting +2835 → `binomial-theorem` |
| E3 | explain | derivation | 0.6 | Derive Σₖ C(n,k) = 2ⁿ by substituting specific values into the binomial theorem. | set x=y=1 in Σₖ C(n,k)xᵏyⁿ⁻ᵏ = (x+y)ⁿ, giving Σₖ C(n,k) = (1+1)ⁿ = 2ⁿ *(required: names the substitution, not just quoting the identity)* | quotes the identity as a known fact about subset-counting without deriving it from the theorem via substitution | 
| E4 | explain | short-answer | 0.75 | Derive Σₖ (−1)ᵏC(n,k) = 0 by a similar substitution to E3. | set x=1, y=−1 in the binomial theorem: Σₖ C(n,k)(1)ᵏ(−1)ⁿ⁻ᵏ = (1+(−1))ⁿ = 0ⁿ = 0 for n≥1, and rearranging the sign convention gives the alternating sum *(required: the specific substitution choice)* | — |
| E5 | explain | short-answer | 0.85 | Explain the relationship between the binomial theorem and Pascal's triangle: why does each row of the triangle give the coefficients for one power of (x+y)? | Pascal's rule C(n,k)=C(n−1,k−1)+C(n−1,k) is exactly the recurrence that generates each row from the one above, and each C(n,k) computed this way is exactly the coefficient the binomial theorem assigns to xᵏyⁿ⁻ᵏ in (x+y)ⁿ — the triangle is a computational device for the theorem's coefficients *(required)* | — |
| T2 | transfer | short-answer | 1.15 | Use the first three terms of the binomial expansion of (1+x)¹⁰ to approximate (1.01)¹⁰, and compare to the exact value. `[verified: approx 1.10452, exact 1.104622...]` | (1+0.01)¹⁰ ≈ C(10,0)+C(10,1)(0.01)+C(10,2)(0.01)² = 1+0.1+0.0045 = 1.1045, very close to the true 1.10462...; higher-order terms are negligible since 0.01 is small | includes only the first two terms (drops the C(10,2)(0.01)² correction), losing accuracy needlessly → `binomial-theorem` |
| T3 | transfer | short-answer | 1.2 | Explain why Σₖ C(n,k) = 2ⁿ also equals "the number of subsets of an n-element set," and connect this back to the binomial theorem's x=y=1 substitution. | each subset of size k corresponds to one of the C(n,k) ways of choosing k items; summing over all possible sizes k=0..n counts every subset exactly once, giving 2ⁿ total subsets — the same number the binomial theorem produces at x=y=1, because "choose k items" is the combinatorial content of C(n,k) either way *(required: connects the two counts explicitly)* | treats the subset-counting fact and the binomial-theorem identity as an unrelated coincidence rather than the same statement → `binomial-theorem` |

*Coverage: 16 recall, 6 apply, 5 explain, 3 transfer — 30 items, spread −1.55…1.2 (2.75 logits).*

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
| R3 | recall | mcq | −1.6 | The multiplication rule rearranges the definition of P(A\|B) to give: | P(A∩B) = P(A\|B)·P(B) | picks P(A∩B) = P(A\|B)+P(B) → `conditional-probability` |
| R4 | recall | short-answer | −1.5 | Fill in the blank: P(A\|B) = ___. | P(A∩B)/P(B) | — |
| R5 | recall | short-answer | −1.4 | True or false: P(A\|B) is defined even when P(B) = 0. | false — division by zero, so it's undefined | — |
| R6 | recall | short-answer | −1.3 | State the chain rule for three events A, B, C. | P(A∩B∩C) = P(A)·P(B\|A)·P(C\|A∩B) | — |
| R7 | recall | mcq | −1.2 | P(A\|B) = P(A) holds exactly when: | A and B are independent | picks "A and B are disjoint" → `conditional-probability` |
| R8 | recall | short-answer | −1.1 | True or false: P(A\|Ω) = P(A). | true — conditioning on the whole sample space changes nothing | — |
| R9 | recall | short-answer | −1.0 | In one line, what does "conditioning on B" do to the sample space? | it restricts attention to the outcomes in B, treating B as the new "whole" space | — |
| R10 | recall | mcq | −0.9 | P(B\|B) equals: | 1 | picks P(B), not recognizing the conditioning restricts the space to B itself → `conditional-probability` |
| R11 | recall | short-answer | −0.8 | Fill in the blank: P(A\|B) is NOT generally equal to ___. | P(B\|A) | — |
| R12 | recall | short-answer | −0.7 | True or false: P(A\|B) + P(Aᶜ\|B) = 1. | true — P(·\|B) is itself a valid probability function | — |
| R13 | recall | mcq | −0.6 | Rearranged, the multiplication rule can also be written as: | P(A∩B) = P(B\|A)·P(A) | picks P(A∩B) = P(B\|A)·P(B), mismatching the conditioning event → `conditional-probability` |
| R14 | recall | short-answer | −0.5 | How is P(A\|B) read aloud? | "the probability of A given B" | — |
| R15 | recall | mcq | −0.4 | For P(A\|B) to be well-defined, which condition is required? | P(B) > 0 | picks P(A) > 0 → `conditional-probability` |
| R16 | recall | short-answer | −0.3 | True or false: P(A\|A) = 1. | true | — |
| A3 | apply | numeric | 0.15 | A standard deck's face cards (J,Q,K) are drawn from; given the card is a face card, find P(it's a king). `[verified: 1/3]` | 4 kings among 12 face cards: 4/12 = 1/3 | computes 4/52, forgetting to restrict the denominator to the conditioning event → `conditional-probability` |
| A4 | apply | numeric | 0.3 | Two fair dice are rolled; given the sum is 8, find P(one of the dice shows a 2). `[verified: 2/5]` | sum=8 outcomes: (2,6),(3,5),(4,4),(5,3),(6,2) — 5 total; 2 of them include a 2: 2/5 | uses the unconditional P(a 2 appears)=11/36 instead of restricting to the 5 sum-8 outcomes → `conditional-probability` |
| A5 | apply | short-answer | 0.4 | In a factory, 60% of parts come from Line A, 40% from Line B. 5% of Line A's parts are defective, 8% of Line B's. What is P(part is from Line A \| part is defective)? Give the setup only, not the final Bayes number (that's the next concept). | needs P(defective) = 0.6(0.05)+0.4(0.08) = 0.062 first via the law of total probability, then P(A\|defective) = P(A∩defective)/P(defective) = 0.03/0.062 — the setup shows the conditional-probability definition is the right tool even before naming Bayes' rule | tries to answer directly with 0.05, confusing P(defective\|A) with the requested P(A\|defective) → `conditional-probability` |
| A6 | apply | numeric | 0.5 | P(A)=0.4, P(B)=0.3, P(A∩B)=0.1. Find P(A\|B) and P(B\|A). `[verified: 1/3, 0.25]` | P(A\|B)=0.1/0.3≈0.333; P(B\|A)=0.1/0.4=0.25 | divides by P(A∩B) instead of the conditioning event's own probability, or swaps which quotient answers which question → `conditional-probability` |
| E3 | explain | derivation | 0.85 | Derive the multiplication rule P(A∩B) = P(A\|B)P(B) directly from the definition of conditional probability. | starting from P(A\|B) = P(A∩B)/P(B) (with P(B)>0), multiply both sides by P(B) to isolate P(A∩B) *(required, the algebra shown explicitly)* | states the multiplication rule as a separate axiom rather than deriving it from the definition | 
| E4 | explain | short-answer | 1.0 | Explain, intuitively, why conditioning on B "zooms in and rescales" — why doesn't P(A\|B) just equal P(A∩B)? | once we know B occurred, B becomes the new universe of possible outcomes, so probabilities within it must be rescaled to sum to 1 again; dividing by P(B) is exactly that rescaling, which is why P(A\|B) ≥ P(A∩B) whenever P(B)<1 *(required)* | — |
| E5 | explain | short-answer | 1.1 | Explain precisely how P(A\|B) differs from P(A∩B) as quantities — what does each one answer? | P(A∩B) is the probability of both happening, measured against the *entire* original sample space Ω; P(A\|B) is the probability of A happening, measured against the *restricted* space B — the same event A∩B "in the numerator" but normalized differently *(required)* | treats P(A\|B) and P(A∩B) as interchangeable since both "involve A and B" → `conditional-probability` |
| T2 | transfer | short-answer | 1.4 | A doctor says "given that this patient has a fever, there's a 30% chance they have the flu." A student writes P(flu ∩ fever) = 0.3 directly into a later calculation. What's wrong, and what would the student need to fix it? | wrong — 0.3 is P(flu\|fever), not the joint P(flu∩fever); to get the joint the student needs P(fever) too, via the multiplication rule P(flu∩fever) = P(flu\|fever)·P(fever) | treats a stated conditional probability as if it were already the joint probability → `conditional-probability` |
| T3 | transfer | short-answer | 1.45 | A factory's quality report states "given a batch fails inspection, there's an 85% chance it came from the new supplier." Explain what additional information you'd need to find P(batch fails ∩ from new supplier), and why the 85% alone isn't enough. | 85% is P(new supplier\|fails), a conditional probability restricted to failed batches; to get the joint probability you need P(fails) as well, since P(fails∩new supplier)=P(new supplier\|fails)·P(fails) — the 85% alone says nothing about how *common* failures are in the first place | assumes the 85% already tells you how often batches both fail and come from the new supplier → `conditional-probability` |

*Coverage: 16 recall, 6 apply, 5 explain, 3 transfer — 30 items, spread −1.60…1.45 (3.05 logits).*

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
| R3 | recall | mcq | −1.55 | In Bayes' rule P(A\|B) = P(B\|A)P(A)/P(B), the term P(B\|A) is called the: | likelihood | picks "posterior" for P(B\|A) → `bayes-rule` |
| R4 | recall | short-answer | −1.45 | What is P(B) called in the denominator of Bayes' rule? | the evidence (or marginal likelihood) | — |
| R5 | recall | short-answer | −1.35 | True or false: Bayes' rule requires P(B) > 0. | true | — |
| R6 | recall | short-answer | −1.25 | Fill in the blank: posterior = (___ × prior) / evidence. | likelihood | — |
| R7 | recall | mcq | −1.15 | Bayes' rule is derived from: | two different expansions of the same joint probability P(A∩B) | picks "the law of total probability alone," which supplies only the denominator, not the whole identity → `bayes-rule` |
| R8 | recall | short-answer | −1.05 | State the odds form of Bayes' rule in words. | posterior odds = likelihood ratio × prior odds | — |
| R9 | recall | short-answer | −0.95 | True or false: Bayes' rule can be applied sequentially, using yesterday's posterior as today's prior. | true | — |
| R10 | recall | mcq | −0.85 | In Bayes' rule, P(A) — before any evidence B is observed — is called the: | prior | picks "likelihood" for P(A) → `bayes-rule` |
| R11 | recall | short-answer | −0.75 | Define the posterior probability in one line. | the updated probability of A after observing evidence B, i.e. P(A\|B) | — |
| R12 | recall | short-answer | −0.65 | Fill in the blank: Bayes' theorem states P(A\|B) = ___. | P(B\|A)P(A) / P(B) | — |
| R13 | recall | mcq | −0.55 | If P(B\|A) = P(B) (i.e. B carries no information about A), Bayes' rule shows P(A\|B) equals: | P(A) — the posterior equals the prior, unchanged | picks "0," assuming no new information means the probability collapses → `bayes-rule` |
| R14 | recall | short-answer | −0.45 | True or false: Bayes' rule only applies with exactly two events. | false — it generalizes to any partition of the sample space via the law of total probability | — |
| R15 | recall | mcq | −0.35 | Which term in Bayes' rule normalizes the result to a valid probability (so posteriors sum to 1)? | the denominator, P(B) | picks the numerator P(B\|A)P(A) → `bayes-rule` |
| R16 | recall | short-answer | −0.25 | Write Bayes' rule for P(A\|B) with the denominator expanded via the law of total probability over A, Aᶜ. | P(A\|B) = P(B\|A)P(A) / [P(B\|A)P(A) + P(B\|Aᶜ)P(Aᶜ)] | — |
| A3 | apply | numeric | 0.25 | A bag has two coins: one fair, one two-headed, chosen with equal probability. You flip the chosen coin twice and get 2 heads. Find P(two-headed \| 2 heads). `[verified: 0.8]` | P(2H\|fair)=0.25, P(2H\|two-headed)=1; P(2H)=0.5(0.25)+0.5(1)=0.625; P(two-headed\|2H)=0.5/0.625=0.8 | uses only one flip's worth of evidence (0.5×1/(0.5×0.5+0.5×1)=2/3) instead of both flips → `bayes-rule` |
| A4 | apply | numeric | 0.28 | Machine 1 makes 70% of a factory's items with a 2% defect rate; Machine 2 makes 30% with a 5% defect rate. An item is defective — find P(it came from Machine 1). `[verified: ≈0.483]` | P(def)=0.7(0.02)+0.3(0.05)=0.029; P(M1\|def)=0.014/0.029≈0.483 | reports the 2% defect rate itself as the answer, confusing P(def\|M1) with P(M1\|def) → `conditional-probability` |
| A5 | apply | short-answer | 0.32 | Three mutually exclusive hypotheses have priors 0.2, 0.3, 0.5; evidence E has likelihoods 0.1, 0.4, 0.2 under each. Find the (normalized) posteriors and confirm they sum to 1. `[verified: 0.0833, 0.5, 0.4167]` | unnormalized: 0.02, 0.12, 0.1 (sum 0.24); posteriors: 0.02/0.24≈0.083, 0.12/0.24=0.5, 0.1/0.24≈0.417 — sums to 1 | reports the unnormalized products as the final posteriors, without dividing by their sum → `bayes-rule` |
| A6 | apply | numeric | 0.38 | P(A)=0.3, P(B\|A)=0.6, P(B\|Aᶜ)=0.2. Find P(A\|B). `[verified: 0.5625]` | P(B)=0.3(0.6)+0.7(0.2)=0.32; P(A\|B)=0.18/0.32=0.5625 | uses only 0.3×0.6 as the numerator but forgets to build the full denominator from both branches → `bayes-rule` |
| E3 | explain | derivation | 0.95 | Derive the *odds* form of Bayes' rule, posterior odds = likelihood ratio × prior odds, from the standard form applied to A and Aᶜ. | write P(A\|B)/P(Aᶜ\|B) = [P(B\|A)P(A)/P(B)] / [P(B\|Aᶜ)P(Aᶜ)/P(B)]; the P(B) cancels, leaving [P(B\|A)/P(B\|Aᶜ)]·[P(A)/P(Aᶜ)] = likelihood ratio × prior odds *(required: shows the P(B) cancellation explicitly)* | — |
| E4 | explain | short-answer | 1.1 | Explain why it's valid to use yesterday's posterior as today's prior when new evidence arrives sequentially. | Bayes' rule only requires *some* prior belief and *some* new evidence — it doesn't care whether that prior came from background knowledge or from a previous application of the rule itself, so chaining updates this way is mathematically identical to conditioning on all the evidence at once *(required)* | — |
| E5 | explain | short-answer | 1.2 | Explain, structurally, why "naive Bayes" classifiers multiply several P(feature\|class) terms together inside Bayes' rule — what assumption licenses that multiplication? | Bayes' rule itself only needs one likelihood term P(evidence\|class); when the evidence is several features, computing their joint likelihood exactly requires their full joint distribution, but *assuming* the features are conditionally independent given the class lets that joint likelihood factor into a simple product — the "naive" part is exactly this independence assumption, layered on top of (not part of) Bayes' rule itself *(required)* | — |
| T2 | transfer | short-answer | 1.55 | A spam filter estimates P(spam)=0.4 overall. An incoming email contains the word "free": P(contains "free" \| spam)=0.3, P(contains "free" \| not spam)=0.05. Find P(spam \| contains "free"), and explain why a filter that just flagged every email with "free" as spam would perform worse than this. `[verified: ≈0.8]` | P(contains)=0.4(0.3)+0.6(0.05)=0.15; P(spam\|contains)≈0.12/0.15=0.8; a flat rule ignores the base rate P(spam)=0.4 and the false-positive rate among legitimate mail, both of which Bayes' rule properly combines | reports the 0.3 likelihood itself as the filter's spam probability, skipping the base-rate combination entirely → `bayes-rule` |
| T3 | transfer | short-answer | 1.6 | A fingerprint database search flags a match with a false-positive rate of 1 in 10,000, and the search was run against a database of 1,000,000 people (so many "trials" occurred). A prosecutor claims "the match means there's only a 1 in 10,000 chance it's the wrong person." Explain the error — this is the database-search analogue of the pilot's blood-type fallacy. | with a large database searched exhaustively, the *expected number* of innocent false matches is 1,000,000/10,000 = 100, so among all matches found this way, the wrongly-matched individual is one of roughly 100 candidates, not a 1-in-10,000 fluke — the prosecutor's number is P(match\|innocent), not P(innocent\|match), and ignores how many people were searched | accepts the 1-in-10,000 figure directly as the probability of a wrongful match without accounting for the size of the search → `bayes-rule` |

*Coverage: 16 recall, 6 apply, 5 explain, 3 transfer — 30 items, spread −1.55…1.6 (3.15 logits). Two original apply items deliberately: A1 is symmetric/gentle, A2 is the canonical inverted-conditional trap.*

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
| R3 | recall | mcq | −1.55 | Fill in the blank: A and B are independent iff P(A∩B) = ___. | P(A)·P(B) | picks P(A)+P(B), confusing independence with the addition rule → `independence-set-theory` |
| R4 | recall | short-answer | −1.45 | True or false: any event with probability 0 is independent of every other event. | true — P(A∩B) ≤ P(A) = 0, and P(A)P(B) = 0, so the product test holds trivially | — |
| R5 | recall | short-answer | −1.35 | True or false: any event with probability 1 is independent of every other event. | true — P(A∩B) = P(B) when P(A)=1, and P(A)P(B) = P(B) too | — |
| R6 | recall | mcq | −1.25 | Using conditional probability, two events A, B (with P(B)>0) are independent exactly when: | P(A\|B) = P(A) | picks P(A\|B) = P(B) → `independence-set-theory` |
| R7 | recall | short-answer | −1.15 | True or false: independence is symmetric — if A is independent of B, then B is independent of A. | true | — |
| R8 | recall | short-answer | −1.05 | True or false: if A and B are independent, then A and Bᶜ are also independent. | true (proved in E1) | — |
| R9 | recall | mcq | −0.95 | Two events are independent if knowing one occurred: | doesn't change the probability of the other | picks "guarantees the other also occurred" → `independence-set-theory` |
| R10 | recall | short-answer | −0.85 | True or false: disjoint events with positive probability are always independent. | false — they are never independent (shown in E1 of the previous concept-level reasoning) | — |
| R11 | recall | mcq | −0.75 | Which pair is a more plausible real-world candidate for actual independence? | two unrelated fair coin flips | picks "two consecutive days' returns of the same stock" as clearly independent, when real markets often show at least weak dependence → `independence-set-theory` |
| R12 | recall | short-answer | −0.65 | State the multiplicative test used to check whether A, B are independent. | check whether P(A∩B) = P(A)·P(B); if equal, independent, otherwise not | — |
| R13 | recall | short-answer | −0.55 | True or false: two events can be both mutually exclusive and independent only if at least one of them has probability 0. | true | — |
| R14 | recall | short-answer | −0.45 | Fill in the blank: independence of A and Bᶜ follows from independence of ___ and ___. | A and B | — |
| R15 | recall | mcq | −0.35 | Which numeric check confirms A, B are independent? | P(A∩B) =? P(A)·P(B) | picks P(A∪B) =? P(A)+P(B) → `independence-set-theory` |
| R16 | recall | short-answer | −0.25 | True or false: knowing only P(A)=0.5 tells you whether A is independent of some other event B. | false — you also need P(B) and P(A∩B) to check the multiplicative condition | — |
| A3 | apply | numeric | 0.15 | P(A)=0.3, P(B)=0.4, P(A∩B)=0.12. Are A and B independent? `[verified: yes, 0.3×0.4=0.12]` | P(A)P(B)=0.12=P(A∩B), so yes, independent | checks only that P(A∩B) is "small" rather than performing the exact product test → `independence-set-theory` |
| A4 | apply | numeric | 0.3 | P(A)=0.5, P(B)=0.5, P(A∩B)=0.3. Are A and B independent? `[verified: no, 0.5×0.5=0.25≠0.3]` | P(A)P(B)=0.25 ≠ 0.3=P(A∩B), so not independent | assumes independence by default whenever P(A) and P(B) are each ≤1 without checking the product → `independence-set-theory` |
| A5 | apply | numeric | 0.4 | Two cards are drawn *with replacement* from a standard deck. Find P(both are red). `[verified: 0.25]` | draws with replacement are independent: (26/52)×(26/52) = 0.25 | draws without noticing "with replacement" restores independence, and instead applies a without-replacement (dependent) calculation → `hypergeometric-distribution` |
| A6 | apply | numeric | 0.45 | A and B are independent, P(A)=0.6, P(B)=0.5. Find P(Aᶜ∩Bᶜ). `[verified: 0.2]` | independence extends to complements (E1, applied twice): P(Aᶜ∩Bᶜ)=P(Aᶜ)P(Bᶜ)=0.4×0.5=0.2 | computes P(Aᶜ)P(Bᶜ) using the *original* probabilities 0.6 and 0.5 instead of their complements → `independence-set-theory` |
| E3 | explain | derivation | 0.85 | Prove: if A and B are independent, then Aᶜ and Bᶜ are also independent. | apply E1's result (A, Bᶜ independent) a second time, treating Bᶜ as the "B" in that argument: since A and Bᶜ are independent, so are Aᶜ and Bᶜ (swap roles of A/B in the same proof) *(required: explicitly reuses/re-applies E1 rather than starting from scratch)* | re-derives from scratch using inclusion-exclusion without noticing E1 already supplies the tool needed | 
| E4 | explain | short-answer | 1.0 | The conditional form P(A\|B)=P(A) and the multiplicative form P(A∩B)=P(A)P(B) both express independence. Explain why the multiplicative form is the better *primitive* definition. | the multiplicative form is symmetric in A and B and remains well-defined even when P(B)=0 (where P(A\|B) isn't defined at all); the conditional form is a *consequence* you can derive from it whenever P(B)>0, not the other way around *(required)* | — |
| E5 | explain | short-answer | 1.1 | Explain why "A and B seem unrelated" is not the same claim as "A and B are independent," and why only a computation can settle it. | intuitive unrelatedness is not a mathematical property — two events can *look* unconnected yet still fail the multiplicative test (or vice versa) due to a hidden common cause or a coincidence in the numbers; independence is a precise numerical condition, P(A∩B)=P(A)P(B), that must be checked, not eyeballed *(required)* | — |
| T2 | transfer | short-answer | 1.45 | A diagnostic tool assumes two symptoms are independent given a disease, multiplying their individual probabilities to score a patient. If the symptoms are actually *positively* correlated (both driven by the same underlying severity), what happens to the tool's computed probability compared to the truth? | the tool understates the true joint probability of both symptoms co-occurring, since positive correlation means P(both\|disease) > P(symptom1\|disease)·P(symptom2\|disease) — the independence assumption produces a number too low, potentially under-flagging genuinely sick patients | assumes an incorrect independence assumption only changes precision, not the direction of the error → `independence-set-theory` |
| T3 | transfer | short-answer | 1.5 | A reliability engineer computes a system's failure probability by multiplying each of 10 components' individual failure probabilities, assuming independence. If several components actually share a common power supply (so they tend to fail together), does the true system failure probability tend to be higher or lower than the computed one? | higher — shared-cause (positively correlated) failures make joint failure events more likely than the independence assumption predicts, so multiplying individual probabilities *understates* the true risk of simultaneous failure | assumes the independence assumption is a "safe" simplification that can only overstate risk, never understate it → `independence-set-theory` |

*Coverage: 16 recall, 6 apply, 5 explain, 3 transfer — 30 items, spread −1.55…1.5 (3.05 logits).*

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
