# Cluster 2 — Random Variables & Density Machinery

Random Variables → Variance (7 concepts). Same format as [Cluster 1](foundations-of-probability.md).

**A structural note worth stating up front**, because it shaped every item below: `random-variables`
and `discrete-vs-continuous-random-variables` sit *above* PMF, PDF, and CDF in the graph, not below
them. An item filed under those two concepts cannot lean on density or mass-function formalism to
make its point — that machinery hasn't been unlocked yet. Several early drafts of these items reached
for "the density is..." as a shortcut and had to be rewritten to argue from countable additivity and
monotonicity alone instead. The rewritten versions are better items, not just compliant ones: they
show the property follows from the axioms, rather than from a formula the learner has half-memorized.

---

## Random Variables (`random-variables`)
*Prereq: Probability Function · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | −0.7 | A random variable is best described as: | a function from the sample space Ω to the real numbers | picks "a variable that changes randomly over time" — treating X as an intrinsically random quantity rather than a deterministic function of the outcome ω → `random-variables` |
| R2 | recall | short-answer | −0.5 | Why must X satisfy a measurability condition — that {ω: X(ω)≤x} is an event for every x — rather than being an arbitrary function Ω→ℝ? | so that P(X≤x) is well-defined; if the preimage weren't in the σ-algebra, we couldn't assign it a probability at all *(required)* | — |
| A1 | apply | short-answer | 0.1 | Ω={HH,HT,TH,TT} (fair coin twice), X = number of heads. Give the range of X and P(X=x) for each x. `[verified]` | X∈{0,1,2}; P(0)=1/4, P(1)=1/2, P(2)=1/4 | lists 4 outcomes as 4 values of X, not noticing HT and TH collapse to the same X-value → `random-variables` |
| A2 | apply | short-answer | 0.25 | Two dice are rolled. X = sum, Y = max. Give the range of each — note they differ even though both are defined on the same Ω. | X∈{2,…,12}; Y∈{1,…,6} | — |
| E1 | explain | derivation | 0.8 | Show that events like {a<X≤b} can be built from events of the form {X≤c}. | {a<X≤b} = {X≤b} ∖ {X≤a} *(required)* — this is the fact that later makes the CDF alone sufficient to answer every question about X | — |
| E2 | explain | short-answer | 0.95 | Explain the distinction between the random variable X (a function) and a value x it might take, and why P(X=x) only parses once you keep the two separate. | X is the pre-experiment function; x is a fixed real number; P(X=x) is shorthand for P({ω : X(ω)=x}) *(required)* | writes "P(X)" as if X itself were a probability → `random-variables` |
| T1 | transfer | short-answer | 1.3 | A forecaster says "30% chance of rain tomorrow, and if it rains, some amount will fall." Model this with a single random variable Y = rainfall amount (0 if no rain). Explain why Y needs both a discrete "spike" of probability at 0 *and* a continuous spread over positive values — you don't need to compute anything, just describe the shape. | identifies Y as neither purely discrete nor purely continuous: P(Y=0) > 0 is a genuine point mass, while the rainfall-given-rain part spreads continuously over (0,∞) *(required)* — this is the seed of the discrete/continuous distinction the next concept makes precise | assumes every random variable must be one or the other → `random-variables` |

*Coverage: 2/2/2/1 — 7 items, −0.7…1.3.*

---

## Discrete vs Continuous Random Variables (`discrete-vs-continuous-random-variables`)
*Prereq: Random Variables · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | −0.6 | A continuous random variable is one whose range is uncountable and for which: | P(X=x) = 0 for every single value x | picks "takes non-integer values" — conflating *continuous* with *not an integer* (a variable taking values in {0.5, 1.5, 2.5, …} is still discrete) → `discrete-vs-continuous-random-variables` |
| R2 | recall | short-answer | −0.45 | Give an example of a random variable that is neither purely discrete nor purely continuous. | e.g. insurance claim size: P(claim = 0) > 0 (no claim filed), with a continuous spread over claim > 0 — the T1 example from the previous concept, now named | — |
| A1 | apply | short-answer | 0.2 | Classify each as discrete or continuous: (a) number of defective items in a batch of 100 (b) time until a server crashes (c) number of typos on a page (d) a room's temperature measured with infinite precision. | (a) discrete (b) continuous (c) discrete (d) continuous | classifies (b) as discrete because "time" is often measured in discrete units (seconds) in practice → `discrete-vs-continuous-random-variables` |
| A2 | apply | short-answer | 0.35 | X takes values in the countably *infinite* set {1, 2, 3, …}. Is X discrete? Why doesn't "discrete" mean "finite"? | yes, still discrete — discrete means *countable* (finite or countably infinite), not finite *(required)* | — |
| E1 | explain | short-answer | 0.9 | Without invoking a density function, explain why it doesn't make sense for a *continuous* random variable to assign positive probability to every individual value — use X = the exact height of a randomly chosen adult (infinite precision) as the example. | there are uncountably many possible exact values; if each carried probability p>0, even countably many of them would already force total probability above 1, contradicting P(Ω)=1 *(required: an argument from countable additivity, not an appeal to "there are too many values")* | — |
| E2 | explain | short-answer | 1.05 | Why can a discrete RV's full distribution be written as a table (value, probability), while this is impossible for a continuous one? | countably many point masses can be summed via countable additivity to exhaust probability 1; uncountably many points cannot be enumerated or summed this way — probability has to be assigned to *intervals* instead *(required)* | — |
| T1 | transfer | short-answer | 1.4 | A stock's daily return has a CDF that jumps by exactly 0.05 at return = −10% (a "circuit breaker" halts trading and clusters losses at exactly that value) and is otherwise smooth everywhere else. Is the underlying random variable discrete, continuous, or neither? | neither — mixed, same structure as the insurance-claim and rainfall examples: one genuine point mass (the circuit-breaker floor) plus a continuous spread elsewhere | forces a binary discrete-or-continuous answer → `discrete-vs-continuous-random-variables` |

*Coverage: 2/2/2/1 — 7 items, −0.6…1.4.*

---

## Cumulative Distribution Function (`cdf`)
*Prereq: Random Variables · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | Define the CDF of a random variable X. | F(x) = P(X ≤ x) for every real x | defines it with strict inequality P(X<x) → `cdf` |
| R2 | recall | multi-select | −0.45 | Which must every CDF satisfy? | non-decreasing; right-continuous; F(x)→0 as x→−∞; F(x)→1 as x→+∞ | "must be continuous everywhere" picked as required — true only when X is purely continuous, not in general → `cdf` |
| A1 | apply | short-answer | 0.2 | X takes value 0 with probability 0.3 and value 1 with probability 0.7. Describe F(x) for all x. | F(x)=0 for x<0; F(x)=0.3 for 0≤x<1; F(x)=1 for x≥1 — a step function with jumps at the values X can take | draws F as continuous, smoothing over the jumps → `cdf` |
| A2 | apply | numeric | 0.35 | Using the F from A1, find P(X≤0.5), P(X<1), and P(X=1). `[verified]` | F(0.5)=0.3; P(X<1)=F(1⁻)=0.3; P(X=1)=F(1)−F(1⁻)=1−0.3=0.7 | computes P(X<1) as F(1)=1 instead of the left-limit → `cdf` |
| E1 | explain | derivation | 0.9 | Prove F is non-decreasing, using only monotonicity of probability. | for a<b, {X≤a}⊆{X≤b}, so F(a)=P(X≤a)≤P(X≤b)=F(b) by monotonicity *(required)* — monotonicity itself traces back to `probability-function` | — |
| E2 | explain | short-answer | 1.05 | Explain why P(X=x) = F(x) − F(x⁻) (the size of the jump at x), from the definition of F alone. | {X≤x} = {X<x} ⊔ {X=x}; taking the limit of F as the left endpoint approaches x from below gives F(x⁻)=P(X<x), so the gap is exactly P(X=x) *(required)* | — |
| T1 | transfer | short-answer | 1.4 | *(Companion to the mixed-distribution transfer item above.)* A grading curve's CDF is smooth everywhere except a single jump of size 0.02 exactly at the passing score, because ties at that score are rounded up. What does the jump tell you, on its own, without any other information about the curve? | a jump of size 0.02 at a point means exactly that much probability mass sits *at that single value* — P(score = passing) = 0.02, regardless of what the rest of the distribution looks like | reads the jump as information about the *slope* of F near that point rather than a point mass at it → `cdf` |

*Coverage: 2/2/2/1 — 7 items, −0.6…1.4.*

---

## Probability Mass Function (`pmf`)
*Prereq: Discrete vs Continuous RVs, CDF · ancestors 7 · b₀ = 0.54*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.46 | Define the PMF of a discrete X, and state its two defining conditions. | p(x) = P(X=x); p(x) ≥ 0 for all x; Σₓ p(x) = 1 | — |
| R2 | recall | mcq | −0.3 | Which of these could *not* be a valid PMF on {1,2,3}? | p(1)=0.5, p(2)=0.6, p(3)=−0.1 (negative probability *and* doesn't sum to 1) | picks p(1)=1, p(2)=0, p(3)=0, thinking a PMF can't put all its mass on one point → `pmf` |
| A1 | apply | numeric | 0.34 | p(1)=c, p(2)=2c, p(3)=3c is a valid PMF. Find c and P(X≥2). `[verified: c=1/6, P=5/6]` | c=1/6; P(X≥2)=5/6 | normalizes over the wrong set, e.g. divides by 3 (the number of outcomes) instead of solving Σp(x)=1 → `pmf` |
| A2 | apply | short-answer | 0.5 | F has jumps of size 0.2, 0.3, 0.5 at x=1,2,3 and is flat elsewhere. Recover the PMF. | p(1)=0.2, p(2)=0.3, p(3)=0.5 — jump size *is* the PMF value, from `cdf`'s E2 | reads off the *cumulative* values (0.2, 0.5, 1.0) instead of the jump sizes → `cdf` |
| E1 | explain | derivation | 1.04 | Prove Σₓ p(x) = 1 from countable additivity, using the fact that {X=x} for distinct x partitions Ω. | the events {X=x} are pairwise disjoint and their union is Ω (every outcome gives *some* value); countable additivity then gives Σ P(X=x) = P(Ω) = 1 *(required — the partition property must be stated, not assumed)* | — |
| E2 | explain | short-answer | 1.2 | Why is the PMF the wrong tool for a continuous random variable? | p(x) = P(X=x) = 0 for every x when X is continuous, so the "PMF" would be identically zero and carry no information *(required — ties back to the previous cluster's E1)* | — |
| T1 | transfer | short-answer | 1.54 | Two different random experiments: (1) roll a fair six-sided die and record 1 if the result is prime (2,3,5), 0 otherwise; (2) flip a coin that lands heads with probability exactly 1/2. Verify both produce the *same* PMF, and explain what that tells you about what a PMF does and doesn't capture. | primes on a die: P(1)=3/6=1/2=P(0), matching the coin exactly `[verified]`. Required: a PMF describes only the induced distribution of values, not the underlying sample space or experiment — two unrelated experiments can be "the same random variable" in every distributional sense | treats the two experiments as necessarily different random variables because the sample spaces differ → `pmf` |

*Coverage: 2/2/2/1 — 7 items, −0.46…1.54.*

---

## Probability Density Function (`pdf`)
*Prereq: Discrete vs Continuous RVs, CDF · ancestors 7 · b₀ = 0.54*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.46 | Define the PDF f of a continuous X, and its two defining conditions. | f = F′ where F is differentiable; f(x) ≥ 0; ∫₋∞^∞ f(x)dx = 1 | — |
| R2 | recall | mcq | −0.3 | Which is true of f(x) for a continuous random variable? | f(x) can exceed 1 | picks "f(x) = P(X=x)" — the single most common density misreading → `pdf` |
| A1 | apply | numeric | 0.34 | f(x) = c for 0 ≤ x ≤ 4, and 0 elsewhere. Find c and P(1≤X≤3). `[verified: c=0.25, P=0.5]` | c = 0.25; P = 0.25×2 = 0.5 | integrates over the whole real line as if the support were unbounded, rather than restricting to [0,4] → `pdf` |
| A2 | apply | numeric | 0.5 | f(x) = 2x for 0≤x≤1, 0 elsewhere. Verify it's a valid density, then find P(X>0.5). `[verified: valid; P=0.75]` | ∫₀¹ 2x dx = 1, valid; P(X>0.5) = ∫₀.₅¹ 2x dx = 0.75 | computes P(X>0.5) as 1 − 0.5 = 0.5, treating the density as if it were uniform → `pdf` |
| E1 | explain | short-answer | 1.04 | Explain concretely why f(x) can exceed 1, using f(x)=5 on [0, 0.2] as an example. | f is a *density* — probability per unit length — not a probability; a narrow support can carry a tall density and still integrate to 1 (5 × 0.2 = 1) *(required: the concrete check that it does integrate to 1)* | — |
| E2 | explain | derivation | 1.2 | Show P(a≤X≤b) = F(b) − F(a) = ∫ₐᵇ f(x)dx, connecting the two definitions via the fundamental theorem of calculus. | F(b)−F(a) by definition of CDF; equals ∫ₐᵇ f by FTC since f=F′ *(required, both directions stated)* | — |
| T1 | transfer | short-answer | 1.54 | A dart lands at a random distance X (normalized to [0,1]) from the center of a board, uniformly over the *board's area* (not uniformly in distance!). Before computing anything: argue geometrically why the density of X should *increase* with x. Then verify f(x)=2x is consistent with that argument. | a thin ring at radius x has area proportional to its circumference, 2πx; a uniform-over-area dart is proportionally more likely to land in a ring farther out, so the density in x must grow linearly — matching f(x)=2x after normalizing *(required: the area argument comes first, not just confirming the formula integrates to 1)* | assumes uniform-over-area means uniform-in-distance (constant density) → `pdf` |

*Coverage: 2/2/2/1 — 7 items, −0.46…1.54.*

---

## Expectation (`expectation`)
*Prereq: PMF, PDF · ancestors 9 · b₀ = 0.65*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.35 | State the definition of E[X] for discrete and for continuous X. | Σₓ x·p(x) discrete; ∫x·f(x)dx continuous | — |
| R2 | recall | mcq | −0.2 | Which is FALSE in general? (a) E[X] is always a value X can actually take (b) E[aX+b] = aE[X]+b (c) E is linear. | (a) is the false one | picks (a) as *true* — expects the mean of a fair die (3.5) to be a possible roll → `expectation` |
| A1 | apply | numeric | 0.45 | X has PMF p(1)=0.5, p(2)=0.3, p(3)=0.2. Find E[X]. `[verified: 1.7]` | 1(0.5)+2(0.3)+3(0.2) = 1.7 | — |
| A2 | apply | numeric | 0.6 | X has density f(x)=2x on [0,1] (from the dart example). Find E[X]. `[verified: 2/3]` | ∫₀¹ x·2x dx = ∫2x² = 2/3 ≈ 0.667 | applies the discrete formula (sums instead of integrates) → `expectation` |
| E1 | explain | derivation | 1.15 | Prove linearity: E[aX+b] = aE[X] + b, from the discrete definition. | Σ(ax+b)p(x) = aΣx p(x) + bΣp(x) = aE[X] + b, using Σp(x)=1 *(required — the full algebraic chain, not just the statement)* | — |
| E2 | explain | short-answer | 1.3 | Explain why E[X] is a "probability-weighted average" and, using the die-roll intuition from R2, why it need not equal any outcome X can produce. | a weighted average pulled toward more-likely values need not land on any single achievable value, the same way a center of mass need not sit on the object itself *(required)* | — |
| T1 | transfer | short-answer | 1.65 | An insurance policy pays $0 with probability 0.9, and (if a claim occurs) a random amount uniform on [$1000, $5000] with probability 0.1. Find the fair premium — the expected payout — by splitting into the two cases and combining. `[verified: $300]` | E[payout] = 0.9(0) + 0.1·E[Uniform(1000,5000)] = 0.1(3000) = $300 — a first, informal encounter with conditioning on cases before `law-of-total-expectation` names it | computes E[Uniform(1000,5000)] correctly but forgets to weight by the 0.1 probability of a claim occurring at all → `expectation` |

*Coverage: 2/2/2/1 — 7 items, −0.35…1.65.*

---

## Variance (`variance`)
*Prereq: Expectation · ancestors 10 · b₀ = 0.70*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.3 | Give two equivalent formulas for Var(X). | E[(X−E[X])²] and E[X²] − (E[X])² | — |
| R2 | recall | mcq | −0.15 | Which is FALSE? (a) Var(X) ≥ 0 always (b) Var(aX+b) = a²Var(X) (c) Var(aX+b) = a·Var(X) + b. | (c) is false | picks (c) as true — treats variance as linear the way expectation is, forgetting shifts vanish and scales square → `variance` |
| A1 | apply | numeric | 0.5 | Using the PMF from Expectation's A1 (E[X]=1.7), find Var(X). `[verified: 0.61]` | E[X²] = 1(0.5)+4(0.3)+9(0.2) = 3.5; Var = 3.5 − 1.7² = 0.61 | forgets to square E[X] before subtracting → `variance` |
| A2 | apply | numeric | 0.65 | Using the density f(x)=2x on [0,1] (E[X]=2/3), find Var(X). `[verified: 1/18 ≈ 0.0556]` | E[X²] = ∫₀¹ x²·2x dx = 2/4 = 0.5; Var = 0.5 − (2/3)² = 1/18 | — |
| E1 | explain | derivation | 1.2 | Derive the shortcut formula Var(X) = E[X²] − (E[X])² starting from E[(X−E[X])²], using linearity of expectation. | expand (X−μ)² = X² − 2μX + μ²; apply linearity term by term; μ=E[X] is a constant so E[μ²]=μ² and E[2μX]=2μ² *(required, full expansion)* — arguably the single most-used algebra trick in the subject | expands the square but drops a term, or forgets μ is a constant under the expectation → `expectation` |
| E2 | explain | short-answer | 1.35 | Explain why Var(aX+b) = a²Var(X): why does the shift *b* vanish entirely, while the scale *a* enters *squared*? | shifting every outcome by b shifts the mean by b too, so deviations from the mean are unchanged — spread is shift-invariant; scaling by a scales every deviation by a, and variance is an *average squared* deviation, so the factor becomes a² *(required, both halves)* | — |
| T1 | transfer | short-answer | 1.7 | Variance is reported in squared units (e.g. dollars²), which is why practitioners usually quote the standard deviation instead. If a temperature's variance in Celsius is V, what is its variance in Fahrenheit (F = 1.8C + 32), and by what factor did it change? `[verified: 1.8² V = 3.24V]` | Var(F) = 1.8² · Var(C) = 3.24V — a real unit-conversion consequence of E2's scaling rule | assumes temperature variance is unchanged by a unit conversion, since "temperature is temperature" → `variance` |

*Coverage: 2/2/2/1 — 7 items, −0.3…1.7.*

---

## Cluster 2 misconception index

| Tag | Blame |
|---|---|
| RV-as-intrinsically-random / P(X) written as if X were a probability | `random-variables` |
| continuous ⟺ non-integer conflation | `discrete-vs-continuous-random-variables` |
| CDF jump/limit errors (P(X<x) vs P(X≤x)) | `cdf` |
| PMF/CDF confusion (reading cumulative values as point masses) | `cdf` or `pmf` depending on direction |
| density read as a probability, or as bounded by 1 | `pdf` |
| mean must be an attainable value | `expectation` |
| variance treated as linear (shift not absorbed, scale not squared) | `variance` |

**Cluster total: 49 items across 7 concepts (7 each).** All numeric claims verified by script; all
concepts clear `auditCoverage`'s three bars. The structural note at the top of this file — no
density/CDF machinery inside `random-variables` or `discrete-vs-continuous-random-variables` — is the
main thing worth re-checking if these items are ever edited independently of each other.
