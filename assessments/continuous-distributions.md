# Cluster 4 — Continuous Distributions

Normal → F-Distribution (8 concepts). Same format as [Cluster 1](foundations-of-probability.md).

**One closure note.** `f-distribution`'s only official prerequisite is `chi-square-distribution` — it
does *not* list `t-distribution`, even though the cleanest possible fact about F (T² ~ F₁,ₖ) needs
both. That item is kept, because it is too good to drop, but explicitly flagged ⚠ as needing
`t-distribution` unlocked too; everything else in the F section stays inside the concept's real
closure. This is the same discipline the pilot file used for its own downstream-leaking items.

---

## Normal Distribution (`normal-distribution`)
*Prereq: PDF, Expectation, Variance · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | State the density of Normal(μ, σ²) and what μ, σ² each control. | f(x) = 1/(σ√(2π)) · exp(−(x−μ)²/(2σ²)); μ shifts location, σ controls spread | — |
| R2 | recall | mcq | 0.1 | Which is FALSE? (a) Normal is symmetric about μ (b) ≈95% of its mass lies within 2σ of μ (c) Normal is the *only* distribution with mean = median = mode. | (c) is false | picks (c) as true — misses that *any* symmetric, unimodal distribution (e.g. the t-distribution) shares this property; it isn't special to Normal → `normal-distribution` |
| A1 | apply | numeric | 0.54 | IQ scores ~ N(100, 15²). Find P(score > 130). `[verified: 0.0228]` | Z = (130−100)/15 = 2; P(Z>2) ≈ 0.0228 | forgets to standardize and looks up P(X>130) directly on a Z-table → `normal-distribution` |
| A2 | apply | numeric | 0.7 | X ~ N(50, 10²). Find the 90th percentile of X. `[verified: 62.82]` | z₀.₉₀ ≈ 1.2816; x = 50 + 10(1.2816) ≈ 62.82 | applies the z-score formula backwards, computing 50 − 10(1.2816) → `normal-distribution` |
| E1 | explain | derivation | 1.24 | Show directly (by differentiating the CDF, not by citing a named transformation rule) that Z=(X−μ)/σ is standard normal when X~N(μ,σ²). | F_Z(z) = P(Z≤z) = P(X≤μ+σz) = F_X(μ+σz); differentiate: f_Z(z) = σ·f_X(μ+σz); substitute the Normal density and simplify the exponent to −z²/2, leaving the standard normal density *(required: the full substitution, not just citing that standardizing "works")* | — |
| E2 | explain | short-answer | 1.4 | Using only the symmetry f(μ+t) = f(μ−t), argue (don't just assert) that the mean, median, and mode of Normal(μ,σ²) all equal μ. | symmetry about μ makes μ the median directly (half the mass on each side by reflection); it makes μ the mode since f is maximized where the exponent's magnitude is smallest, i.e. at x=μ; and it makes μ the mean since ∫(x−μ)f(x)dx integrates an odd function around μ to 0 *(required: an argument for each of the three, not just one)* | — |
| T1 | transfer | short-answer | 1.74 | Give two real quantities well-approximated by Normal, and one quantity often *assumed* Normal that isn't — say specifically what property of Normal it violates. | good fits: measurement error, standardized test scores away from floor/ceiling effects. Common bad fit: household income (or reaction times) — right-skewed and bounded below by 0, while Normal is symmetric with support on all of ℝ; a Normal model would assign real probability to impossible negative values *(required: names the specific violated property, not just "it's not Normal")* | picks a skewed example but says only "it doesn't look bell-shaped," without naming *which* Normal property (symmetry, unbounded support) actually fails → `normal-distribution` |

*Coverage: 2/2/2/1 — 7 items, −0.26…1.74.*

---

## Uniform Distribution (`uniform-distribution`)
*Prereq: PDF, Expectation, Variance · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | State the density, E[X], and Var(X) for Uniform(a,b). | f(x)=1/(b−a) on [a,b]; E[X]=(a+b)/2; Var(X)=(b−a)²/12 | — |
| R2 | recall | mcq | 0.1 | Uniform(a,b) is called the "maximum-entropy" distribution on [a,b] because: | it assumes nothing beyond the support itself — no other information is encoded | picks "it has the highest variance among all distributions on [a,b]" — actually false: a two-point distribution at the endpoints has variance (b−a)²/4, larger than Uniform's (b−a)²/12 → `uniform-distribution` |
| A1 | apply | numeric | 0.54 | X ~ Uniform(2,10). Find P(3<X<7), E[X], Var(X). `[verified: 0.5, 6, 5.333]` | P=4/8=0.5; E[X]=6; Var=64/12≈5.333 | — |
| A2 | apply | numeric | 0.7 | Buses run every 15 minutes with no other information; you arrive at a random time. Find your expected wait and P(wait < 5 min). `[verified: 7.5, 0.333]` | Uniform(0,15): E=7.5; P(X<5)=5/15=1/3 | — |
| E1 | explain | derivation | 1.24 | Derive Var(Uniform(a,b)) = (b−a)²/12 from E[X²] − (E[X])². | E[X]=(a+b)/2; E[X²]=∫ₐᵇ x²/(b−a) dx = (a²+ab+b²)/3; subtract (a+b)²/4 and simplify to (b−a)²/12 *(required: the full algebra, not the formula quoted from memory)* | — |
| E2 | explain | short-answer | 1.4 | Show, with a concrete counterexample on Uniform(0,10), that Uniform is *not* memoryless the way Exponential is. `[verified]` | P(X>7\|X>5) = (3/10)/(5/10) = 0.6, but P(X>2) = 0.8 — the two differ, so knowing you've survived past 5 *does* change the outlook (it doesn't here — it improves it, since the interval is bounded and running out) | claims Uniform is memoryless by analogy to Exponential without checking → `uniform-distribution` |
| T1 | transfer | short-answer | 1.74 | Give two real scenarios well-modeled as Uniform. Then: why *can't* "the wait for the next bus if buses arrive as a truly random (Poisson) process averaging one every 10 minutes" be modeled as Uniform(0,10), even though the average gap is 10 minutes? Hint: what does "no memory" mean for a Poisson process? | good fits: rounding error, a fair spinner's angle, a random-number generator's output. The Poisson wait time is **Exponential**, not Uniform: a Poisson process has no upper bound on the gap between events (Uniform(0,10) implicitly guarantees the bus arrives by minute 10, which a memoryless process does not promise), and its hazard is constant rather than rising toward a deadline the way E2 showed Uniform's effectively does | assumes "average gap of 10 minutes" is enough to justify Uniform(0,10) without checking the process's memory structure → `uniform-distribution` |

*Coverage: 2/2/2/1 — 7 items, −0.26…1.74. E2/T1 deliberately set up the Exponential section's defining property by contrast.*

---

## Exponential Distribution (`exponential-distribution`)
*Prereq: Poisson Distribution · ancestors 17 · b₀ = 0.95*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.05 | State the density, E[X], and Var(X) for Exponential(λ). | f(x)=λe⁻ᵠˣ, x≥0; E[X]=1/λ; Var(X)=1/λ² | — |
| R2 | recall | mcq | 0.3 | How does Exponential(λ) relate to Poisson(λ)? | Exponential models the *waiting time* between Poisson events; Poisson models the *count* of events in a fixed interval | claims they're "the same distribution" in different notation → `exponential-distribution` |
| A1 | apply | numeric | 0.75 | A bulb's lifetime is Exponential with mean 1000 hours. Find P(lasts > 1500 hours). `[verified: 0.2231]` | λ=1/1000; P(X>1500)=e⁻¹·⁵ ≈ 0.2231 | — |
| A2 | apply | numeric | 0.9 | Same bulb: find P(lasts > 2500 hours \| already lasted 1000 hours), using memorylessness, and compare to A1. `[verified: equal, 0.2231]` | by memorylessness this equals P(X>1500) from A1 exactly — the bulb "forgets" it has already survived 1000 hours | computes P(X>2500) unconditionally (e⁻²·⁵) instead of applying memorylessness → `exponential-distribution` |
| E1 | explain | derivation | 1.45 | Prove memorylessness: P(X>s+t \| X>s) = P(X>t). | P(X>x)=e⁻ᵠˣ; ratio e⁻ᵠ⁽ˢ⁺ᵗ⁾/e⁻ᵠˢ = e⁻ᵠᵗ = P(X>t) *(required, full chain)* | — |
| E2 | explain | short-answer | 1.7 | Exponential is the *unique* continuous memoryless distribution, the way Geometric is the unique discrete one. Explain the connection: how is Exponential a continuous-time limit of Geometric? | chop time into tiny intervals, treat each as a Bernoulli trial with a tiny success probability; the waiting time (in units of intervals) is Geometric, and letting the interval width shrink to 0 while the rate stays fixed produces Exponential in the limit *(required)* — the same discretize-and-take-a-limit move as the Poisson-from-Binomial derivation earlier in this bank | — |
| T1 | transfer | short-answer | 1.95 | Give two real waiting times well-modeled by Exponential. Then: *why can't* the time until a car engine fails be modeled as Exponential, even though "time until failure" sounds like exactly the right setup? Hint: think about wear and aging. | good fits: gaps between radioactive decays; gaps between independent website hits. Engine failure: mechanical wear increases the *hazard rate* with age — a 10-year-old engine is more likely to fail soon than a new one, which directly violates memorylessness (Exponential "forgets" its age entirely); the right family has an *increasing* hazard rate over time, unlike Exponential's constant one | attributes the failure to "engines don't fail randomly" rather than naming the specific violated property (constant hazard / memorylessness) → `exponential-distribution` |

*Coverage: 2/2/2/1 — 7 items, −0.05…1.95.*

---

## Gamma Distribution (`gamma-distribution`)
*Prereq: Exponential Distribution · ancestors 18 · b₀ = 0.97*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.03 | State E[X], Var(X) for Gamma(α, β), and identify which parameter is "shape" and which is "rate." | E[X]=α/β; Var(X)=α/β²; α = shape, β = rate | — |
| R2 | recall | mcq | 0.32 | Gamma(1, β) is exactly: | Exponential(β) | picks Normal or Uniform, not recognizing Exponential as Gamma's α=1 special case → `gamma-distribution` |
| A1 | apply | numeric | 0.77 | Customers arrive as Poisson(3/hour). Find E[time to the 5th customer] and its variance, via Gamma(5,3). `[verified: 1.667, 0.556]` | E[X]=5/3≈1.667 hours; Var=5/9≈0.556 | — |
| A2 | apply | numeric | 0.9 | Same setup: find P(the 5th customer arrives within 1 hour) — *without* the Gamma pdf, using the count/waiting-time duality instead. `[verified: 0.1847]` | "5th arrival before time 1" ⟺ "at least 5 arrivals by time 1"; N(1)~Poisson(3), so P = P(N(1)≥5) = 1−P(N(1)≤4) ≈ 0.1847 | tries to integrate the Gamma density directly and mishandles Γ(5) → `gamma-distribution` |
| E1 | explain | derivation | 1.47 | Show the sum of α iid Exponential(β) waiting times is Gamma(α,β), using the waiting-time interpretation directly (no MGFs). | the gap to the 1st Poisson event, plus the (memoryless, hence fresh) gap from the 1st to the 2nd, plus … α such gaps, sum to the total wait for the α-th event; each gap is Exponential(β) by `exponential-distribution`'s memorylessness *(required — explicitly invokes memorylessness as the reason each gap restarts fresh)* — the same structure as `negative-binomial-distribution`'s sum-of-geometrics proof | — |
| E2 | explain | short-answer | 1.6 | Explain the *Erlang–Poisson duality* used in A2: why does "waiting time to the α-th event exceeds t" have exactly the same probability as "fewer than α events have occurred by time t"? | these describe the identical event two ways: the α-th event hasn't happened by time t *if and only if* strictly fewer than α events have occurred by then *(required: an "if and only if" argument, not just restating both sides)* | — |
| T1 | transfer | short-answer | 1.97 | Give a real process better modeled by Gamma than Exponential (hint: "time until the *k*-th something," k>1). Then use the duality from E2 to find P(a store's 10th customer of the day arrives within the first hour, given customers arrive as Poisson(8/hour)) — without writing down the Gamma density or Γ(10). | good examples: time until a machine's 3rd failure needing replacement; time until a store's 10th customer. Computation: P(T₁₀<1) = P(N(1)≥10), N(1)~Poisson(8) — computed as a Poisson tail sum, demonstrating the practical payoff of never needing Γ(10) for an integer-shape Gamma | tries to evaluate the Gamma CDF directly with the Gamma function → `gamma-distribution` |

*Coverage: 2/2/2/1 — 7 items, −0.03…1.97.*

---

## Beta Distribution (`beta-distribution`)
*Prereq: Gamma Distribution · ancestors 19 · b₀ = 1.00*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.0 | What kind of quantity does Beta(α,β) model, and what does Beta(1,1) reduce to? | a random *probability or proportion* on [0,1]; Beta(1,1) = Uniform(0,1) | — |
| R2 | recall | mcq | 0.3 | Beta(1,1) equals: | Uniform(0,1) | picks "a point mass at 0.5," confusing "flat/uninformative" with "concentrated at the center" → `beta-distribution` |
| A1 | apply | numeric | 0.8 | X ~ Beta(2,3). Find E[X] and Var(X). `[verified: 0.4, 0.04]` | E[X]=2/5=0.4; Var(X)=2·3/(5²·6)=0.04 | — |
| A2 | apply | short-answer | 0.95 | If α and β both grow large while α/(α+β) stays fixed, what happens to the shape of Beta(α,β)? Hint: think about the variance formula. | Var = αβ/[(α+β)²(α+β+1)] shrinks toward 0 as α,β→∞ with their ratio fixed, since the denominator grows faster (order (α+β)³) than the numerator (order (α+β)²); the distribution concentrates sharply around its mean *(required: the growth-rate comparison, not just "variance goes down")* | — |
| E1 | explain | derivation | 1.5 | Verify E[X] = α/(α+β) using ∫x^α(1−x)^(β−1)dx = B(α+1,β) and the Gamma recursion Γ(n+1)=nΓ(n). | E[X] = B(α+1,β)/B(α,β); expand each Beta function via Gammas, use Γ(α+1)=αΓ(α) to cancel, leaving α/(α+β) *(required: the recursion step named explicitly)* | — |
| E2 | explain | short-answer | 1.65 | Why is Beta a natural choice specifically for modeling "a random probability," in a way Gamma or Exponential aren't? | Beta's support is exactly [0,1], matching the constraint that a probability must lie in that range; Gamma/Exponential have unbounded support on (0,∞) and would assign probability to nonsensical values like p=1.3 *(required)*; Beta is also flexible enough to be flat, U-shaped, or peaked depending on α,β | — |
| T1 | transfer | short-answer | 2.0 | Before seeing any A/B test data, you believe a website's conversion rate p is "probably around 5%, but I'm not very sure." Without doing any calculation, explain why Beta is a far more natural choice than Normal to represent this belief about p. | p is a probability, constrained to [0,1]; Normal has support on all of ℝ and would assign nonzero probability to impossible values like p=−0.1 or p=1.3; Beta's support matches the constraint exactly, and its shape can be tuned (via α,β) to peak near 0.05 with an appropriate spread *(required: names the support mismatch specifically, not just "Beta is designed for this")* | picks Normal because "the sample size will be large so CLT applies" — true of the *estimator's* sampling distribution later on, but not a reason to use Normal for a *prior belief about p itself* → `beta-distribution` |

*Coverage: 2/2/2/1 — 7 items, 0.0…2.0.*

---

## Chi Square Distribution (`chi-square-distribution`)
*Prereq: Normal Distribution, Gamma Distribution · ancestors 20 · b₀ = 1.02*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.02 | Define χ²ₖ in terms of standard normals, and state E[X], Var(X). | Z₁²+⋯+Zₖ² for iid Zᵢ~N(0,1); E[X]=k; Var(X)=2k | — |
| R2 | recall | mcq | 0.32 | If Z₁,…,Zₖ are iid N(0,1), then Z₁²+⋯+Zₖ² has distribution: | χ²ₖ | picks N(0,k), forgetting squaring destroys normality and negativity → `chi-square-distribution` |
| A1 | apply | numeric | 0.82 | X ~ χ²₁₀. Find E[X], Var(X). `[verified: 10, 20]` | E[X]=10; Var(X)=20 | — |
| A2 | apply | short-answer | 0.95 | X~χ²₈, Y~χ²₅ independent. What is X+Y's distribution, and why (one line, from the definition)? | χ²₁₃ — X+Y is the sum of 8+5=13 iid squared standard normals pooled from the two independent groups | adds the distributions' means but guesses a non-chi-square family for the sum → `chi-square-distribution` |
| E1 | explain | derivation | 1.52 | Prove E[χ²ₖ] = k directly from the definition, using E[Zᵢ²] = Var(Zᵢ) + E[Zᵢ]² for each standard normal. | E[Zᵢ²] = 1 + 0 = 1 (a callback to `variance`'s shortcut formula, run in reverse); linearity gives E[ΣZᵢ²] = k·1 = k *(required: the Var+mean² step, not just "each term contributes 1")* | — |
| E2 | explain | short-answer | 1.65 | Explain intuitively why χ²ₖ becomes more symmetric and Normal-looking as k grows, without invoking the formal CLT. | it's a sum of k iid terms, and sums of many iid terms tend to look increasingly Gaussian (the general intuition behind CLT, used informally here); concretely, the relative spread SD/mean = √(2k)/k = √(2/k) shrinks as k grows, so the distribution's *shape* relative to its own scale becomes tighter and more symmetric *(required: the relative-spread computation, not just an appeal to "CLT")* | — |
| T1 | transfer | short-answer | 2.02 | A quality engineer wants to test whether a machine's part-diameter variance exceeds a spec, and proposes comparing her variance *estimate* to a Normal distribution. Explain why Chi-Square is the right family instead — connect it to how a variance estimate is actually built. | a sample variance is built from **squared** deviations from a mean; since those (approximately) standardized deviations behave like standard normals, a sum of their squares is exactly what defines χ² — this is precisely the mechanism that will later justify `sample-variance`'s sampling distribution | reaches for Normal because "most sampling distributions are approximately Normal," missing that variance estimates are built from *squared* quantities, which is what chi-square is specifically for → `chi-square-distribution` |

*Coverage: 2/2/2/1 — 7 items, 0.02…2.02.*

---

## Student's t-Distribution (`t-distribution`)
*Prereq: Chi Square Distribution · ancestors 21 · b₀ = 1.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.05 | Define Tₖ in terms of a standard normal Z and an independent χ²ₖ variable V, and state what happens as k→∞. | Tₖ = Z/√(V/k); as k→∞, Tₖ → N(0,1) | — |
| R2 | recall | mcq | 0.35 | Compared to Normal(0,1), t with small degrees of freedom has: | heavier tails | picks "lighter tails," backwards → `t-distribution` |
| A1 | apply | short-answer | 0.85 | Without computing an exact value, explain why P(\|T₅\| > 2) is *larger* than P(\|Z\| > 2) for standard normal Z. | t has heavier tails than Normal at every fixed df, so it assigns strictly more probability to extreme values beyond any fixed threshold *(required)* | assumes t and Normal agree everywhere except very close to the tails' extreme ends → `t-distribution` |
| A2 | apply | numeric | 1.0 | Find Var(T₄) using Var(Tₖ)=k/(k−2). What happens to this formula as k→2⁺, and what does that mean? `[verified: 2; blows up]` | Var(T₄)=4/2=2 (already larger than Normal's variance of 1); as k→2⁺ the formula diverges, and for k≤2 the variance is infinite/undefined — an extreme version of "heavier tails" | assumes Var(Tₖ) is always close to 1 like the standard normal, missing that it can be undefined for small k → `t-distribution` |
| E1 | explain | short-answer | 1.55 | Show Var(Tₖ)=k/(k−2) is always > 1 for finite k>2, and explain why it approaches 1 as k→∞. | k/(k−2) > 1 whenever k>2 since k−2<k; as k→∞, V/k → 1 (an informal law-of-large-numbers intuition — the chi-square average concentrates near its mean of 1), so Tₖ ≈ Z/1 = Z, recovering variance 1 *(required: both halves)* | — |
| E2 | explain | short-answer | 1.7 | Explain the mechanism behind t's heavier tails, using Tₖ = Z/√(V/k) directly. | when V/k happens to be small by chance (the variance estimate underestimates the truth), the division inflates T, producing more extreme values than Z alone would generate; this self-correcting inflation *is* the heavy tail, and it's exactly what "pricing in" uncertain variance estimation looks like *(required: the division-by-a-noisy-quantity mechanism, not just "t has more spread")* | — |
| T1 | transfer | short-answer | 2.05 | Why must a small clinical trial (n=8) use the t-distribution for its confidence interval, while a huge trial (n=10,000) can essentially use Normal instead? Connect this to what "degrees of freedom" represents. | with small n, the sample standard deviation is itself a noisy, uncertain estimate of the true σ (few degrees of freedom), so t "prices in" that extra estimation uncertainty via heavier tails (E2's mechanism); with large n the sample SD is essentially exact (V/k→1 very precisely, per E1), so t converges to Normal and the distinction stops mattering in practice | treats "large sample" as making the *data* Normal, rather than making the *variance estimate* precise enough that t and Normal coincide → `t-distribution` |

*Coverage: 2/2/2/1 — 7 items, 0.05…2.05. This whole section is deliberately built to motivate `one-sample-t-test` before that concept exists.*

---

## F-Distribution (`f-distribution`)
*Prereq: Chi Square Distribution · ancestors 21 · b₀ = 1.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.05 | Define F_{d₁,d₂} in terms of two independent chi-squares, and state its support. | F_{d₁,d₂} = (V₁/d₁)/(V₂/d₂) for independent V₁~χ²_d₁, V₂~χ²_d₂; support is (0,∞) only | — |
| R2 | recall | mcq | 0.35 | The square of a t-distributed variable with k df, T², has distribution: | F_{1,k} | picks χ²ₖ, missing that squaring a *ratio* (T is itself built from a ratio) doesn't collapse to a plain chi-square → `f-distribution` |
| A1 | apply | short-answer | 0.85 | Explain directly from the definition why F_{d₁,d₂} can never be negative. | both V₁ and V₂ are sums of squares, hence always ≥0; a ratio of two nonnegative quantities (each further divided by a positive constant) is always ≥0 *(required)* | — |
| A2 | apply | short-answer | 1.0 | If X ~ F_{5,20}, is 1/X also F-distributed? If so, with which parameters? | yes — 1/X ~ F_{20,5}; inverting the ratio swaps numerator and denominator, hence swaps the two degrees-of-freedom parameters directly | assumes 1/X has the same parameters as X → `f-distribution` |
| E1 | explain | short-answer | 1.55 | Without computing E[F] exactly, argue informally why E[F_{d₁,d₂}] should be *close to 1* when d₁ and d₂ are both large. | E[V₁/d₁]=E[V₂/d₂]=1 always; for large d₁,d₂ both ratios concentrate tightly around 1 (their relative spread √(2/d) shrinks, per `chi-square-distribution`'s E2), so their ratio concentrates near 1/1=1 *(required: the concentration argument, reusing the chi-square relative-spread fact)* | — |
| E2 | explain | short-answer | 1.7 | Why is F always positive and — unlike Normal or Chi-Square itself in the large-df limit — persistently *not* symmetric? | F is a ratio of two already-skewed, strictly positive quantities (chi-squares); ratios of skewed positive quantities tend to inherit and often amplify that skew, rather than symmetrizing the way a *sum* of many terms would *(required: contrasts ratio-of-skewed with sum-of-skewed, the mechanism, not just "it's skewed because it's F")* | — |
| T1 | transfer | derivation | 2.02 | *⚠ requires `t-distribution` in addition to `chi-square-distribution`.* Show that if T~tₖ, then T² ~ F_{1,k}. | Tₖ = Z/√(V/k), so T² = Z²/(V/k); Z² ~ χ²₁ (established in the Chi-Square section's own derivation of Z²~Gamma(½,½)=χ²₁); T² = (Z²/1)/(V/k), matching F_{1,k}'s definition exactly *(required: the full substitution chain)* | forgets Z² needs to be recognized as χ²₁ first, and tries to treat Z itself as chi-square → `chi-square-distribution` |
| T2 | transfer | short-answer | 2.02 | You want to compare the *variability* (not the means) of two manufacturing lines' output. Explain, briefly, why a **ratio** of variance estimates is a more natural comparison than a **difference**. | variances live on a squared, strictly-positive, multiplicative scale; a ratio is scale-free and naturally bounded below by 0, so "twice as variable" always reads as a ratio of 2 regardless of units — a difference is unit-dependent and treats a small perturbation and a genuine doubling inconsistently depending on the underlying scale *(required)* | — |

*Coverage: 2/2/2/2 — 8 items, 0.05…2.02. T1 is filed here rather than dropped because the identity is too clean to lose; it is the one item in this whole bank that needs two sibling concepts unlocked at once rather than a strict ancestor chain.*

---

## Cluster 4 misconception index

| Tag | Blame |
|---|---|
| forgetting to standardize before a Normal lookup | `normal-distribution` |
| Uniform assumed max-variance or memoryless | `uniform-distribution` |
| Exponential/Poisson conflated as the same distribution | `exponential-distribution` |
| Gamma CDF attempted by hand instead of via the Poisson-count duality | `gamma-distribution` |
| Beta(1,1) mistaken for a point mass | `beta-distribution` |
| chi-square sum-of-squares treated as Normal | `chi-square-distribution` |
| t heavy tails direction reversed, or Var(Tₖ) assumed always finite | `t-distribution` |
| F ratio inversion or sign errors | `f-distribution` |

**Cluster total: 56 items across 8 concepts.** All numeric claims verified by script, including the
standard-normal quantile (bisection against an erf-based CDF) and the Gamma/Poisson tail duality. The
cluster is deliberately chained: Uniform's non-memorylessness sets up Exponential's defining property;
Exponential's sum sets up Gamma; Gamma's integer case sets up Chi-Square via Z²~Gamma(½,½); Chi-Square
sets up both t and F, which meet again in F's flagged T1.
