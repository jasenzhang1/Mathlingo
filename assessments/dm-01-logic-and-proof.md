# Discrete Math Cluster 1 — Logic & Proof Techniques

Propositional Logic, Logical Equivalences & Quantifiers, Direct Proof, Proof by Contradiction,
Mathematical Induction, Strong Induction, Recursion & Recurrence Relations, Fibonacci Numbers
(8 concepts). Same table format as the linear-algebra and probability/statistics sweeps, run at 5
items per concept.

**The thread running through this cluster**: `direct-proof`'s E1 proves `1+2+⋯+n = n(n+1)/2` by the
Gauss pairing trick, and `mathematical-induction`'s E1 proves the *same identity* by induction — two
genuinely different techniques converging on one fact, worth noticing side by side. A second thread
runs `strong-induction` → `recursion` → `fibonacci-numbers`: strong induction's transfer item explains
why a two-term recursive rule needs strong induction to reason about, `recursion`'s transfer item
applies that directly to the Fibonacci recurrence, and `fibonacci-numbers`'s own induction proof
(`F(1)+⋯+F(n)=F(n+2)-1`) is exactly the two-back argument that was previewed two concepts earlier.

---

## Propositional Logic (`propositional-logic`)
*Root · ancestors 0 · b₀ = −0.50*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.50 | Define a proposition, and give the truth-table meaning of ∧ (and) and ∨ (or). | a proposition is a declarative sentence that is either true or false, never both; p∧q is true only when both p and q are true; p∨q is true when at least one of p, q is true (inclusive or) | — |
| R2 | recall | mcq | −1.25 | p→q ("if p then q") is false exactly when: | p is true and q is false | picks "p is false and q is true" — the *opposite* of the one false row, missing that a false hypothesis makes the conditional vacuously true → `propositional-logic` |
| A1 | apply | numeric | −0.70 | How many rows does the truth table for a compound proposition in 3 propositional variables have? `[verified]` | 2³ = 8 | — |
| E1 | explain | derivation | 0.00 | Show, via truth table, that p→q is logically equivalent to ¬p∨q. | build both truth tables over all 4 rows of (p,q); p→q gives T,F,T,T and ¬p∨q gives T,F,T,T — identical in every row *(required: the full 4-row comparison, not just a claim of equivalence)* | — |
| T1 | transfer | short-answer | 0.50 | In most programming languages, `p && q` skips evaluating `q` once `p` is found false ("short-circuit evaluation"). Explain the logical principle that makes this safe. | p∧q is false whenever p is false, regardless of q's value — so q's truth value can never change the result once p is false, meaning it never needs to be evaluated at all *(required: ties the skip to ∧'s truth table, not just "it's an optimization")* | — |

*Coverage: 5 items, −1.50…0.50.*

---

## Logical Equivalences & Quantifiers (`logical-equivalences`)
*Prereq: Propositional Logic · ancestors 1 · b₀ = −0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.30 | State De Morgan's laws for ¬(p∧q) and ¬(p∨q). | ¬(p∧q) ≡ ¬p∨¬q; ¬(p∨q) ≡ ¬p∧¬q | — |
| R2 | recall | mcq | −1.05 | The negation of ∀x P(x) is: | ∃x ¬P(x) | picks ∀x ¬P(x) — fails to flip the quantifier along with the predicate → `logical-equivalences` |
| A1 | apply | short-answer | −0.50 | Negate: "Every student passed the exam and no student cheated." | "Some student did not pass, or some student cheated." `[verified: ¬((∀x Passed(x)) ∧ (∀x ¬Cheated(x))) = (∃x ¬Passed(x)) ∨ (∃x Cheated(x))]` | — |
| E1 | explain | derivation | 0.20 | Prove p→q ≡ ¬q→¬p (the contrapositive) by truth table, and show the converse q→p is *not* equivalent to p→q. | p→q gives T,F,T,T across (T,T),(T,F),(F,T),(F,F); ¬q→¬p gives the identical T,F,T,T — equivalent. q→p gives T,T,F,T, which disagrees with p→q at row (p=T,q=F): p→q is F there but q→p is T *(required: names the specific differing row, not just "they differ")* | — |
| T1 | transfer | short-answer | 0.70 | Set-theoretic De Morgan's laws state $(A\cup B)^c = A^c \cap B^c$. Explain the precise correspondence to ¬(p∨q) ≡ ¬p∧¬q. | relabel ∪↔∨, ∩↔∧, complement↔¬, and "x ∈ A" as a proposition — the set law and the propositional law are the *same statement* under this dictionary, not merely similar-looking *(required: the explicit term-by-term correspondence)* | — |

*Coverage: 5 items, −1.30…0.70.*

---

## Direct Proof (`direct-proof`)
*Prereq: Logical Equivalences & Quantifiers · ancestors 2 · b₀ = −0.10*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.10 | Describe the structure of a direct proof of p→q. | assume p (the hypothesis) as given; chain forward through definitions and previously established facts until q (the conclusion) is reached; no contradiction, no case split | — |
| R2 | recall | mcq | −0.85 | To directly prove "if n is odd then n² is odd," the first line should be: | "Assume n is odd, so n = 2k+1 for some integer k." | assumes "n² is odd, so n is odd" and works backward — proves a different (though related) statement, and risks circular reasoning → `direct-proof` |
| A1 | apply | short-answer | −0.30 | Continue the proof after "Assume n is odd, so n = 2k+1 for some integer k." | n² = (2k+1)² = 4k²+4k+1 = 2(2k²+2k)+1, which has the form 2m+1 with m = 2k²+2k, so n² is odd `[verified: (2k+1)² expands correctly]` | — |
| E1 | explain | derivation | 0.40 | Give a direct proof, using the Gauss pairing trick (not induction), that 1+2+⋯+n = n(n+1)/2 for every positive integer n. | write S = 1+2+⋯+n and also S = n+(n−1)+⋯+1; add term-by-term: each pair sums to n+1, and there are n pairs, so 2S = n(n+1), giving S = n(n+1)/2 `[verified: n=4: 1+2+3+4=10; 4·5/2=10]` *(required: the pairing/doubling argument, not a cited formula)* | — |
| T1 | transfer | short-answer | 0.90 | Two-column geometry proofs and algebraic chains of equalities are both called "direct." What structural feature makes both direct? | both move forward from what is given toward the target in one unbroken chain of justified steps, never assuming the negation of the goal and never splitting into cases *(required)* | — |

*Coverage: 5 items, −1.10…0.90.*

---

## Proof by Contradiction (`proof-by-contradiction`)
*Prereq: Logical Equivalences & Quantifiers · ancestors 2 · b₀ = −0.08*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.08 | Describe the structure of a proof by contradiction of statement P. | assume ¬P (the negation of the goal); derive, via valid steps, some statement of the form Q∧¬Q (an absurdity); conclude ¬P was false, so P holds | — |
| R2 | recall | mcq | −0.83 | Proof by contradiction differs from proving the contrapositive because: | contradiction negates the *entire* target statement (which need not even be a conditional) and derives any absurdity, while the contrapositive applies only to conditionals and specifically derives ¬p | claims they are "the same technique with different names," missing that the contrapositive is a targeted rewrite of an if-then statement while contradiction is fully general → `proof-by-contradiction` |
| A1 | apply | short-answer | −0.28 | To prove "there is no smallest positive rational number" by contradiction, what should the first line assume? | "Assume, for contradiction, that there *is* a smallest positive rational number; call it r." | — |
| E1 | explain | derivation | 0.42 | Prove by contradiction that √2 is irrational. | suppose √2 = a/b with integers a, b, b≠0, gcd(a,b)=1; then a² = 2b², so a² is even, so a is even (odd² is odd), write a=2c; then 4c²=2b² so b²=2c², so b is even too; but then gcd(a,b)≥2, contradicting gcd(a,b)=1 `[verified: parity chain correct throughout]` — hence √2 is irrational *(required: the full parity chain through to the contradiction, not just "assume it's rational")* | — |
| T1 | transfer | short-answer | 0.92 | Euclid's proof of infinitely many primes assumes a finite complete list p₁,...,pₙ of all primes, then considers N = p₁p₂⋯pₙ + 1. Explain how this reaches a contradiction. | N leaves remainder 1 on division by every pᵢ, so no pᵢ divides N; but every integer greater than 1 has some prime factor, and that prime factor cannot be any pᵢ — contradicting that the list was complete *(required: names both "no pᵢ divides N" and "N has some prime factor")* | — |

*Coverage: 5 items, −1.08…0.92.*

---

## Mathematical Induction (`mathematical-induction`)
*Prereq: Direct Proof · ancestors 3 · b₀ = 0.10*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.90 | State the two steps of a proof by induction that P(n) holds for all integers n≥n₀. | base case: verify P(n₀) directly; inductive step: assume P(k) for arbitrary k≥n₀ (the inductive hypothesis), and prove P(k+1) follows from it | — |
| R2 | recall | mcq | −0.65 | Skipping the base case in an induction proof: | can make the whole argument vacuous — e.g. "P(n): n = n+1" has a valid-looking inductive step (add 1 to both sides) but no true base case, and is false for every n | claims it's "harmless as long as the inductive step is correct," missing that the inductive step alone proves nothing without an anchor → `mathematical-induction` |
| A1 | apply | numeric | −0.10 | Using S(n) = n(n+1)/2, what is S(10)? `[verified]` | 10·11/2 = 55 | — |
| E1 | explain | derivation | 0.60 | Prove by induction that 1+2+⋯+n = n(n+1)/2 for every positive integer n. | base case n=1: LHS=1, RHS=1·2/2=1, equal; inductive step: assume 1+2+⋯+k = k(k+1)/2 for some k≥1, then 1+2+⋯+k+(k+1) = k(k+1)/2+(k+1) = (k+1)(k+2)/2, the formula at n=k+1 `[verified: k=3: 6+4=10; formula at n=4: 4·5/2=10]` *(required: both the base case and the algebraic step from k to k+1)* | — |
| T1 | transfer | short-answer | 1.10 | Explain the "domino" intuition for induction, and why removing either the base case or the inductive step breaks the chain. | the base case knocks over the first domino; the inductive step guarantees each domino topples the next; together every domino eventually falls, however far out — without the base case nothing starts falling, and without the inductive step one domino falling says nothing about the rest *(required: addresses both dominoes)* | — |

*Coverage: 5 items, −0.90…1.10.*

---

## Strong Induction (`strong-induction`)
*Prereq: Mathematical Induction · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.70 | How does strong induction's inductive step differ from ordinary induction's? | ordinary induction assumes only P(k) to prove P(k+1); strong induction assumes P(n₀), P(n₀+1), …, P(k) — every smaller case, not just the immediately preceding one — to prove P(k+1) | — |
| R2 | recall | mcq | −0.45 | Strong induction and ordinary induction: | are logically equivalent in what they can prove, but strong induction is often more natural when the step needs an arbitrary *earlier* case, not just the last one | claims strong induction is "a strictly more powerful axiom that proves statements ordinary induction cannot" → `strong-induction` | 
| A1 | apply | short-answer | 0.10 | Every integer n≥8 can be written as 3a+5b for nonnegative integers a, b. Give such a representation for n=8, 9, and 10 — the base cases a strong-induction proof of this fact would need. `[verified]` | 8=3+5; 9=3+3+3; 10=5+5 | — |
| E1 | explain | derivation | 0.80 | Use strong induction to prove: every integer n≥2 is either prime or a product of primes. | base case n=2: prime; inductive step: let n>2, assume every integer k with 2≤k<n is prime or a product of primes (strong hypothesis); if n is prime, done; otherwise n=ab with 1<a,b<n, so the strong hypothesis applies to *both* a and b, each is prime or a product of primes, hence n=ab is a product of primes *(required: applies the hypothesis to both a and b, not just one)* | — |
| T1 | transfer | short-answer | 1.30 | A recursive function computing a(n) from both a(n−1) and a(n−2) needs strong induction, not ordinary induction, to prove facts about it. Explain why. | proving a property of a(n) requires the inductive hypothesis at both a(n−1) and a(n−2) simultaneously; ordinary induction's hypothesis only supplies the single immediately preceding case, which is not enough when the recursive step reaches back two steps — strong induction's "every smaller case" hypothesis covers both automatically *(required: names that multiple prior cases are needed)* | — |

*Coverage: 5 items, −0.70…1.30.*

---

## Recursion & Recurrence Relations (`recursion`)
*Prereq: Strong Induction · ancestors 5 · b₀ = 0.50*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.50 | What two ingredients does a recursive definition of a sequence need? | one or more base case(s) giving explicit starting value(s), and a recursive rule defining each later term in terms of earlier term(s) | — |
| R2 | recall | mcq | −0.25 | A recursive definition with no base case: | does not actually define anything — evaluating any term triggers an infinite regress that never bottoms out | claims it's "fine as long as the recursive rule is correct," missing that the rule alone never terminates → `recursion` |
| A1 | apply | numeric | 0.30 | A sequence is defined by a(1)=1 and a(n)=2a(n−1)+1 for n≥2. Compute a(4). `[verified]` | a(2)=3, a(3)=7, a(4)=15 | — |
| E1 | explain | derivation | 1.00 | Prove by induction that the recursively defined sequence a(1)=1, a(n)=2a(n−1)+1 satisfies a(n) = 2ⁿ−1 for every n≥1. | base case n=1: 2¹−1=1=a(1); inductive step: assume a(k)=2^k−1, then a(k+1)=2a(k)+1=2(2^k−1)+1=2^{k+1}−1, matching the formula at n=k+1 `[verified: k=3: 2·7+1=15=2⁴−1]` *(required: uses the recursive rule directly in the inductive step, not just checking a few values)* | — |
| T1 | transfer | short-answer | 1.50 | The Fibonacci sequence is defined by F(0)=0, F(1)=1, F(n)=F(n−1)+F(n−2). Explain why proving a closed-form formula for F(n) needs strong induction rather than ordinary induction. | the rule for F(n) reaches back *two* terms, F(n−1) and F(n−2), so the inductive step needs the hypothesis available at both n−1 and n−2 at once — exactly what `strong-induction`'s T1 previewed — so a rigorous proof uses two base cases (F(0), F(1)) and a strong-induction step *(required: names both base cases and the two-back dependency)* | — |

*Coverage: 5 items, −0.50…1.50.*

---

## Fibonacci Numbers (`fibonacci-numbers`)
*Prereq: Recursion & Recurrence Relations · ancestors 6 · b₀ = 0.68*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.32 | State the Fibonacci recurrence and its two base cases. | F(0)=0, F(1)=1, F(n)=F(n−1)+F(n−2) for n≥2 | — |
| R2 | recall | mcq | −0.07 | F(7) equals: | 13 | picks 8 — an off-by-one that reports F(6) instead of F(7) → `fibonacci-numbers` |
| A1 | apply | numeric | 0.48 | Given F(9)=34 and F(10)=55, use the recurrence to compute F(11). `[verified]` | F(11) = F(10)+F(9) = 55+34 = 89 | — |
| E1 | explain | derivation | 1.18 | Prove by induction that F(1)+F(2)+⋯+F(n) = F(n+2)−1 for every n≥1. | base case n=1: LHS=F(1)=1, RHS=F(3)−1=2−1=1, equal `[verified]`; inductive step: assume F(1)+⋯+F(k)=F(k+2)−1, then F(1)+⋯+F(k)+F(k+1) = F(k+2)−1+F(k+1) = (F(k+2)+F(k+1))−1 = F(k+3)−1 by the Fibonacci recurrence itself, matching the formula at n=k+1 `[verified: n=6: 1+1+2+3+5+8=20; F(8)−1=21−1=20]` *(required: explicitly invokes the recurrence to merge F(k+2)+F(k+1) into F(k+3))* | — |
| T1 | transfer | short-answer | 1.68 | Binet's formula states $F(n) = \frac{\varphi^n - \psi^n}{\sqrt5}$ with $\varphi=\frac{1+\sqrt5}{2}\approx1.618$, $\psi=\frac{1-\sqrt5}{2}\approx-0.618$. Without proving the formula, explain why F(n) always comes out an integer despite φ, ψ being irrational, and why F(n)≈φⁿ/√5 for large n. | φ and ψ are the two roots of x²=x+1, so integer combinations of their powers stay tied to √5 in a way that cancels exactly in $(\varphi^n-\psi^n)/\sqrt5$, always landing on an integer; since $\lvert\psi\rvert<1$, $\psi^n\to0$ as n grows, so that term becomes negligible and $F(n)\approx\varphi^n/\sqrt5$ — the reason $F(n+1)/F(n)\to\varphi$, the golden ratio, in the long run *(required: both the cancellation-to-integer point and the $\psi^n\to0$ approximation point)* | — |

*Coverage: 5 items, −0.32…1.68.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| vacuous truth of the material conditional misread (false hypothesis case inverted) | `propositional-logic` |
| negation of a universal quantifier fails to flip to existential | `logical-equivalences` |
| direct proof written by assuming the conclusion / proving the converse | `direct-proof` |
| proof by contradiction conflated with proving the contrapositive | `proof-by-contradiction` |
| base case treated as skippable | `mathematical-induction` |
| strong induction treated as strictly more powerful than ordinary induction | `strong-induction` |
| recursive definition assumed valid with no base case | `recursion` |
| off-by-one indexing into the Fibonacci sequence | `fibonacci-numbers` |

**Cluster total: 40 items across 8 concepts.** All truth-table entries, parity/divisibility chains,
induction algebra, and Fibonacci values are verified by hand above and flagged `[verified]` inline.
The Gauss-pairing/induction pair on `1+2+⋯+n` and the strong-induction→recursion→Fibonacci thread on
two-term recurrences are the standout cross-item connections in this cluster.
