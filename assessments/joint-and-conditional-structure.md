# Cluster 5 — Joint & Conditional Structure

Joint/Marginal/Conditional Distribution, Covariance, Law of Total Expectation (5 concepts). Same
format as [Cluster 1](foundations-of-probability.md).

**Shared example.** Four of the five concepts below reuse the same 2×2 joint table (X,Y ∈ {0,1},
p(0,0)=0.1, p(0,1)=0.2, p(1,0)=0.3, p(1,1)=0.4) as it gets progressively more structure added — its
marginals, its conditionals, its covariance. Reusing one table across a concept chain, rather than a
fresh example per concept, is deliberate: it lets a learner see the *same* dependence show up in four
different computations, which is a more durable lesson than four unrelated worked examples would be.

**Closure note.** `joint-distribution` lists only `random-variables` as a prerequisite — the univariate
PMF/PDF concepts are *siblings*, not ancestors, in the current graph. So the item below introduces
joint PMF notation as this concept's own new material, rather than treating "PMF" as already-known
machinery being extended to two dimensions. That's a reasonable reading either way; flagged here in
case the graph is ever tightened to require `pmf`/`pdf` explicitly.

---

## Joint Distribution (`joint-distribution`)
*Prereq: Random Variables · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | Define the joint PMF of discrete X, Y, and its normalization condition. | p(x,y) = P(X=x, Y=y); Σₓ Σᵧ p(x,y) = 1 | — |
| R2 | recall | mcq | −0.4 | Σₓ Σᵧ p(x,y) always equals: | 1 | answers "depends on X, Y" — missing that normalization is a defining requirement, not a property to check case by case → `joint-distribution` |
| A1 | apply | numeric | 0.2 | p(0,0)=0.1, p(0,1)=0.2, p(1,0)=0.3, p(1,1)=0.4. Verify validity and find P(X=1,Y=1). `[verified: sums to 1; 0.4]` | sums to 1.0 ✓; P(1,1)=0.4 | — |
| A2 | apply | short-answer | 0.35 | Using the same table, find P(X=Y) and P(X≠Y). `[verified: 0.5, 0.5]` | P(X=Y)=p(0,0)+p(1,1)=0.5; P(X≠Y)=0.5 | — |
| E1 | explain | derivation | 0.9 | Sum the table's rows and columns to get "totals" for X alone and Y alone, then use them to check whether X and Y are independent. `[verified: X-totals 0.3/0.7, Y-totals 0.4/0.6, product 0.12≠0.1]` | row totals: 0.3, 0.7; column totals: 0.4, 0.6; independence would require p(0,0)=0.3×0.4=0.12, but the table has p(0,0)=0.1 ≠ 0.12 — so X, Y are dependent *(required: the explicit product comparison)* | checks only one cell or assumes the totals matching some pattern is sufficient → `joint-distribution` |
| E2 | explain | short-answer | 1.05 | Explain why a joint distribution carries *strictly more* information than its two row/column totals — why can't you reconstruct the joint table from the totals alone? | the totals are consistent with *many* different joint tables — e.g. the independent-product table (0.12, 0.18, 0.28, 0.42) has the *same* totals (0.3/0.7 and 0.4/0.6) as the actual dependent table (0.1, 0.2, 0.3, 0.4) `[verified]`, yet the two tables clearly differ *(required: an explicit second table with matching totals, not just an assertion)* | — |
| T1 | transfer | short-answer | 1.4 | A hospital records (blood pressure category, cholesterol category) per patient. Explain why knowing the blood pressure distribution *and* the cholesterol distribution separately still can't tell a doctor whether high readings of both tend to occur in the *same* patients. What does the joint distribution capture that the two separate ones can't? | the co-occurrence / dependence structure — precisely E2's point, applied to a real diagnostic setting: two very different patterns of overlap between the conditions are compatible with identical separate distributions of each condition alone *(required)* | assumes knowing both separate distributions is "basically" the same as knowing the joint one → `joint-distribution` |

*Coverage: 2/2/2/1 — 7 items, −0.6…1.4. E1's ad hoc row/column sums are exactly what `marginal-distribution` formalizes next.*

---

## Marginal Distribution (`marginal-distribution`)
*Prereq: Joint Distribution · ancestors 6 · b₀ = 0.47*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.53 | Define the marginal PMF of X in terms of a joint PMF p(x,y). | p_X(x) = Σᵧ p(x,y) — sum out y | — |
| R2 | recall | mcq | −0.35 | To get the marginal of X from a joint PMF table, you: | sum each row (or column, depending on layout) | picks "take the diagonal entries" — confuses marginalizing with the P(X=Y) computation from the previous concept's A2 → `marginal-distribution` |
| A1 | apply | numeric | 0.27 | Using the shared table, find the marginal PMFs of X and of Y — this is exactly `joint-distribution`'s E1, now formalized and named. `[verified: 0.3/0.7 and 0.4/0.6]` | p_X = (0.3, 0.7); p_Y = (0.4, 0.6) | — |
| A2 | apply | short-answer | 0.4 | For continuous joint density f(x,y)=x+y on [0,1]², find the marginal density f_X(x). `[verified: integrates to 1]` | f_X(x) = ∫₀¹ (x+y) dy = x + 0.5, for 0≤x≤1; check: ∫₀¹(x+0.5)dx = 1 ✓ | forgets to integrate out y and leaves f_X as a function of both x and y → `marginal-distribution` |
| E1 | explain | derivation | 0.97 | Prove that a marginal PMF (obtained by summing out the other variable) is itself a valid PMF, using only the joint PMF's own normalization. | Σₓ p_X(x) = Σₓ Σᵧ p(x,y) = 1, directly from the joint's defining condition *(required: the double-sum equality, not just "it must be valid because it's a distribution")* | — |
| E2 | explain | short-answer | 1.1 | Using an explicit example, show that two *different* joint distributions can share the *same* two marginals. | the shared table's dependent joint (0.1, 0.2, 0.3, 0.4) and the independent-product table built from its own marginals (0.12, 0.18, 0.28, 0.42) both have marginals (0.3, 0.7) and (0.4, 0.6) `[verified]`, yet the joint entries differ — proving the marginals alone don't pin down the joint *(required: the concrete second table)* | — |
| T1 | transfer | short-answer | 1.47 | A weather app reports P(rain tomorrow)=30% and, separately, P(traffic jam tomorrow)=40%. Someone computes P(rain AND traffic)=0.3×0.4=12%. What assumption does this secretly make, and why is it probably wrong here? | it assumes X, Y are *independent* — that the joint pmf is the product of the marginals, exactly the assumption E2 showed the marginals alone cannot justify; rain plausibly *causes* more traffic (positive dependence), so treating them as independent likely **understates** the true joint probability | accepts the 12% figure as correct because "that's how you combine two probabilities" → `marginal-distribution` |

*Coverage: 2/2/2/1 — 7 items, −0.53…1.47.*

---

## Conditional Distribution (`conditional-distribution`)
*Prereq: Joint Distribution, Conditional Probability · ancestors 7 · b₀ = 0.54*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.46 | Define the conditional PMF of Y given X=x, and its one requirement. | p(y\|x) = p(x,y)/p_X(x), requiring p_X(x) > 0 | — |
| R2 | recall | mcq | −0.2 | As a function of y for *fixed* x, p(y\|x) is: | a valid PMF — nonnegative and summing to 1 over y | claims it "always equals the marginal p_Y(y)" — true only under independence, not in general → `conditional-distribution` |
| A1 | apply | numeric | 0.34 | Using the shared table (marginals p_X = 0.3, 0.7), find the conditional PMF of Y given X=0. `[verified: 1/3, 2/3]` | p(0\|0)=0.1/0.3=1/3; p(1\|0)=0.2/0.3=2/3 | divides by the wrong marginal, e.g. by p_Y instead of p_X → `conditional-distribution` |
| A2 | apply | numeric | 0.5 | Find the conditional PMF of Y given X=1, and compare to A1's answer given X=0. What does the difference tell you about independence? `[verified: 0.4286, 0.5714 — differs from A1]` | p(0\|1)≈0.4286, p(1\|1)≈0.5714 — different from (1/3, 2/3), confirming X and Y are dependent, consistent with `joint-distribution`'s E1 finding | finds the conditionals differ but doesn't connect that to dependence → `conditional-distribution` |
| E1 | explain | derivation | 1.04 | Prove p(·\|x) is a valid PMF over y, for any fixed x with p_X(x)>0. | Σᵧ p(y\|x) = Σᵧ p(x,y)/p_X(x) = p_X(x)/p_X(x) = 1, using the marginal's own defining sum from `marginal-distribution` *(required)* | — |
| E2 | explain | short-answer | 1.2 | Explain why "X, Y independent" is *equivalent* to "the conditional distribution of Y given X=x doesn't depend on x" — argue both directions. | independence ⟹ p(x,y)=p_X(x)p_Y(y) ⟹ p(y\|x)=p_Y(y) for every x (no dependence on x); conversely, if p(y\|x)=p_Y(y) for every x, then p(x,y)=p(y\|x)p_X(x)=p_Y(y)p_X(x), which is exactly the independence factorization *(required: both directions, not just one)* | — |
| T1 | transfer | short-answer | 1.54 | A doctor reports: given a patient smokes, P(lung disease)=15%; given they don't, P(lung disease)=2%. Why can quoting one overall (marginal) P(lung disease) for the whole population be seriously misleading for an individual patient? | the marginal is a weighted blend of the two very different conditional risks (weighted by smoking prevalence — a first, informal glimpse of `law-of-total-expectation`); reporting only the blend obscures a huge disparity that matters enormously depending on which conditional group a specific patient actually falls into *(required)* | treats the marginal risk as informative for a specific, known smoker or non-smoker → `conditional-distribution` |

*Coverage: 2/2/2/1 — 7 items, −0.46…1.54.*

---

## Covariance (`covariance`)
*Prereq: Expectation, Joint Distribution · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | Define Cov(X,Y) and give its shortcut formula. | E[(X−E[X])(Y−E[Y])] = E[XY] − E[X]E[Y] | — |
| R2 | recall | mcq | 0.04 | Which is FALSE? (a) Cov(X,X)=Var(X) (b) independent ⟹ Cov=0 (c) Cov=0 ⟹ independent. | (c) is false | picks (c) as true — **the single most important misconception in this topic**, treating zero covariance and independence as equivalent → `covariance` |
| A1 | apply | numeric | 0.54 | E[X]=2, E[Y]=3, E[XY]=8. Find Cov(X,Y). `[verified: 2]` | 8 − 2·3 = 2 | — |
| A2 | apply | numeric | 0.65 | Using the shared table, compute E[X], E[Y], E[XY], and Cov(X,Y). `[verified: 0.7, 0.6, 0.4, −0.02]` | E[X]=0.7, E[Y]=0.6; E[XY] gets a contribution only from (1,1): 1·1·0.4=0.4; Cov = 0.4 − 0.42 = −0.02 | sums X·Y·p(x,y) over all four cells but forgets that three of the four terms vanish (whenever X=0 or Y=0), double-counting → `covariance` |
| E1 | explain | derivation | 1.24 | Derive Cov(X,Y) = E[XY] − E[X]E[Y] from E[(X−E[X])(Y−E[Y])], via linearity. | expand the product: XY − X·E[Y] − Y·E[X] + E[X]E[Y]; apply linearity termwise, using that E[X], E[Y] are constants under the expectation *(required, full expansion)* — the two-variable analog of `variance`'s shortcut-formula derivation | — |
| E2 | explain | derivation | 1.4 | Construct an explicit example where Cov(X,Y)=0 but X and Y are *maximally* dependent (Y is a deterministic function of X). | X ~ Uniform(−1,1), Y = X². Cov(X,Y) = E[X³] − E[X]E[X²] = 0 − 0 = 0 (E[X³]=0 by odd symmetry, E[X]=0) `[verified numerically: ≈0]`, yet Y is *completely determined* by X — about as dependent as two variables can be *(required: the explicit counterexample with both moments computed, not just an assertion that one exists)* | — |
| T1 | transfer | short-answer | 1.74 | An analyst finds Cov(hours studied, exam score) > 0 in one class, and separately Cov(ice cream sales, drowning deaths) > 0 across cities, concluding "studying causes higher scores" and "ice cream causes drowning." What's wrong with using covariance alone to justify either causal claim — and what's genuinely different between the two examples? | covariance measures *association only*, never causation on its own; the ice-cream/drowning case is a classic *confounder* (hot weather drives both); studying and scores plausibly do reflect a real causal link — but the covariance number alone cannot distinguish the two cases, which is exactly the point *(required: names confounding for the second case, and states that covariance can't discriminate the two situations)* | accepts the study-hours claim as justified because it "makes intuitive sense," without noticing the argument used to support it is identical to the flawed ice-cream argument → `covariance` |

*Coverage: 2/2/2/1 — 7 items, −0.26…1.74. E2 is the standout item in this cluster.*

---

## Law of Total Expectation (`law-of-total-expectation`)
*Prereq: Expectation, Conditional Distribution · ancestors 13 · b₀ = 0.82*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.18 | State the law of total expectation. | E[X] = E[E[X\|Y]] | — |
| R2 | recall | mcq | 0.12 | E[X\|Y] is itself: | a random variable — a function of Y | treats E[X\|Y] as a fixed number, missing the conceptual leap the whole law depends on → `law-of-total-expectation` |
| A1 | apply | numeric | 0.62 | Revisit `expectation`'s insurance example formally: let Y=1{claim occurs}. E[payout\|Y=0]=0, E[payout\|Y=1]=$3000, P(Y=1)=0.1. Recover the $300 premium via the law. `[verified: 300]` | E[payout] = P(Y=0)·0 + P(Y=1)·3000 = 0.9(0)+0.1(3000) = $300 — the same answer as before, now produced by the named tool rather than ad hoc case-splitting | — |
| A2 | apply | numeric | 0.75 | A student uses one of two study methods, chosen 50/50 at random: Method A gives expected score 75, Method B gives expected score 85. Find the overall expected score. `[verified: 80]` | 0.5(75) + 0.5(85) = 80 | averages the two *methods* as if they were equally represented in some other proportion, or forgets to weight by the 50/50 split explicitly when the split isn't even → `law-of-total-expectation` |
| E1 | explain | derivation | 1.32 | Prove the law of total expectation for the discrete case, via a double-sum swap. | E[X] = Σₓ x·p_X(x) = Σₓ x Σᵧ p(x,y) = Σᵧ Σₓ x·p(x\|y)·p_Y(y) = Σᵧ p_Y(y)·E[X\|Y=y] = E[E[X\|Y]] *(required: the sum-order swap must be shown explicitly, not asserted)* | — |
| E2 | explain | short-answer | 1.5 | Why must E[X\|Y] be treated as a random variable (a function of Y) *before* E[E[X\|Y]] means anything? What would go wrong if it were just one number? | if E[X\|Y] were a single fixed number, the outer expectation E[·] would have nothing to average over — the whole point of the law is that E[X\|Y=y] varies with y, and the *outer* expectation averages that variation, weighted by how likely each y is *(required)* | — |
| T1 | transfer | short-answer | 1.82 | A company's revenue depends on which of 3 equally-likely marketing campaigns ran, with expected revenues $2M, $3M, and $7M. An analyst says "just always run the $7M one — it's the guaranteed best." What's the error, using the law of total expectation to frame it? | the analyst conflates *highest expected value* with *guaranteed outcome* — expected revenue is a long-run average, not a promise; the $7M campaign could carry far higher variance (huge upside and huge downside) that the expectation number alone says nothing about, which is exactly the kind of question `law-of-total-variance` exists to answer next | agrees $7M is "guaranteed" simply because it's the largest of the three expected values → `law-of-total-expectation` |

*Coverage: 2/2/2/1 — 7 items, −0.18…1.82.*

---

## Cluster 5 misconception index

| Tag | Blame |
|---|---|
| joint normalization treated as case-dependent rather than definitional | `joint-distribution` |
| marginal computed as diagonal entries, not row/column sums | `marginal-distribution` |
| dividing by the wrong marginal in a conditional PMF | `conditional-distribution` |
| independence assumed from matching marginals alone | `marginal-distribution` or `joint-distribution` |
| **Cov(X,Y)=0 treated as implying independence** | `covariance` |
| covariance/correlation cited as proof of causation | `covariance` |
| E[X\|Y] treated as a fixed number rather than a function of Y | `law-of-total-expectation` |

**Cluster total: 35 items across 5 concepts.** All numeric claims verified — the table computations by
script, and the Cov(X, X²)=0 counterexample by both closed form and a 2-million-sample Monte Carlo
check. The shared 2×2 table running through the first four concepts is the throughline: the same
dependence gets discovered informally in `joint-distribution`, named in `marginal-distribution`, put to
use in `conditional-distribution`, and finally measured in `covariance`.
