# Cluster 7 — Inequalities & Convergence

Markov's Inequality → Order Statistics (6 concepts). Same format as [Cluster 1](foundations-of-probability.md).

The inequalities chain by construction here: Chebyshev is *derived from* Markov (not just stated
alongside it), and the Weak Law of Large Numbers is derived from Chebyshev in turn — so a learner who
has worked through this cluster in order has actually built the LLN from first principles, not just
been told it's true. `order-statistics`' E2 also closes a loop back to `mle`'s surprising Uniform
result from Cluster 6.

---

## Markov's Inequality (`markov-inequality`)
*Prereq: Expectation · ancestors 10 · b₀ = 0.70*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.3 | State Markov's inequality and its one requirement on X. | P(X≥a) ≤ E[X]/a for a>0; requires X ≥ 0 | omits the nonnegativity requirement → `markov-inequality` |
| R2 | recall | mcq | 0.0 | Markov's inequality requires knowing: | only E[X] | picks "both E[X] and Var(X)" — that's Chebyshev's requirement, not Markov's → `markov-inequality` |
| A1 | apply | numeric | 0.5 | A factory's daily output (nonnegative) has mean 100 units. Bound P(output ≥ 150). `[verified: 0.667]` | P ≤ 100/150 ≈ 0.667 | — |
| A2 | apply | numeric | 0.6 | Same factory: bound P(output ≥ 500). `[verified: 0.2]` | P ≤ 100/500 = 0.2 — the bound tightens (in relative usefulness) as the threshold grows relative to the mean | — |
| E1 | explain | derivation | 1.2 | Prove Markov's inequality using the indicator trick a·1{X≥a} ≤ X. | pointwise: if X≥a, LHS=a≤X=RHS; if X<a, LHS=0≤X=RHS (using X≥0) — so the inequality holds for every outcome; taking expectations, E[a·1{X≥a}] = a·P(X≥a) ≤ E[X] *(required: both cases of the pointwise inequality)* | — |
| E2 | explain | short-answer | 1.4 | Explain why Markov's bound can be very loose. What does it say for a ≤ E[X]? | for a ≤ E[X], the bound E[X]/a ≥ 1 is vacuous (probabilities can't exceed 1); even for a > E[X], the bound can be far above the true tail probability, because it uses *only* the mean and nothing about the distribution's shape or spread *(required: names the a≤E[X] vacuous case specifically)* — motivating the sharper bound `chebyshev-inequality` builds next | — |
| T1 | transfer | short-answer | 1.7 | A fund reports mean daily profit $10,000 (profit ≥ $0 always). Bound P(profit ≥ $1,000,000) via Markov, and explain why the *true* probability could be dramatically lower than this bound. `[verified: bound=0.01]` | bound = 10,000/1,000,000 = 0.01 (1%); the true probability is likely far below this in practice — Markov's bound, using *only* the mean, must remain valid even for some adversarially-shaped distribution that puts as much mass as possible near the threshold, so it can't rule out that worst case without more information *(required: names that the bound is the best guarantee possible from the mean alone, achievable by some distribution)* | reports the 1% bound as if it were the actual probability of a million-dollar day → `markov-inequality` |

*Coverage: 2/2/2/1 — 7 items, −0.3…1.7.*

---

## Chebyshev's Inequality (`chebyshev-inequality`)
*Prereq: Markov's Inequality, Variance · ancestors 12 · b₀ = 0.78*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.22 | State Chebyshev's inequality in standardized form (k standard deviations). | P(\|X−μ\| ≥ kσ) ≤ 1/k² | — |
| R2 | recall | mcq | 0.08 | Compared to the empirical 68-95-99.7 rule, Chebyshev's advantage is: | it applies to *any* distribution with finite variance, not just Normal | picks "it gives a tighter bound" — backwards; Chebyshev trades sharpness for universality → `chebyshev-inequality` |
| A1 | apply | numeric | 0.58 | A distribution (shape unknown) has mean 50, SD 5. Bound P(\|X−50\| ≥ 15). `[verified: k=3, bound=1/9≈0.111]` | k=15/5=3; bound ≤ 1/9 ≈ 0.111 | — |
| A2 | apply | numeric | 0.7 | Same setup: bound P(X<35 or X>65) — note this is the *same event* as A1, just rephrased. `[verified: 1/9]` | identical computation, ≤ 1/9 | treats it as a different, harder problem requiring a fresh calculation → `chebyshev-inequality` |
| E1 | explain | derivation | 1.28 | Derive Chebyshev's inequality *from Markov's*, applied to Y=(X−μ)². | Y=(X−μ)² ≥ 0; apply Markov with threshold k²σ²: P(Y≥k²σ²) ≤ E[Y]/(k²σ²) = σ²/(k²σ²) = 1/k²; note {Y≥k²σ²} is exactly {\|X−μ\|≥kσ}, so P(\|X−μ\|≥kσ) ≤ 1/k² *(required: the full substitution, including the event-equivalence step)* | — |
| E2 | explain | short-answer | 1.45 | Chebyshev is generally tighter than Markov for the same event, but still typically much looser than the *true* probability for well-behaved distributions. Illustrate with a Normal example. `[verified: true P(\|Z\|≥3)≈0.0027 vs Chebyshev's 1/9≈0.111]` | for standard Normal, the true P(\|Z\|≥3) ≈ 0.0027, while Chebyshev's guaranteed-safe bound is 1/9 ≈ 0.111 — roughly 40× looser *(required: the concrete numeric contrast, not just "it's looser")* | — |
| T1 | transfer | short-answer | 1.78 | Without assuming any shape for a stock's daily returns (mean 0%, SD 2%), Chebyshev-bound P(\|return\| ≥ 6%). Why might a risk manager prefer this conservative bound over a Normal-based calculation that gives a much smaller number? `[verified: k=3, bound≈0.111]` | bound ≤ 1/9 ≈ 11.1%; a risk manager may prefer the looser-but-universally-valid Chebyshev bound *because* it doesn't assume normality — real financial returns are well known to have fatter tails than Normal, so a Normal-based number can badly understate real tail risk, while Chebyshev's guarantee holds regardless of the true shape *(required: names the normality assumption as the actual risk being avoided)* | uses the tighter Normal-based number without questioning whether the normality assumption is safe for this data → `chebyshev-inequality` |

*Coverage: 2/2/2/1 — 7 items, −0.22…1.78.*

---

## Jensen's Inequality (`jensen-inequality`)
*Prereq: Expectation · ancestors 10 · b₀ = 0.70*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.3 | State Jensen's inequality for a convex function g. | E[g(X)] ≥ g(E[X]) | — |
| R2 | recall | mcq | 0.0 | Which is FALSE? (a) for convex g, E[g(X)]≥g(E[X]) (b) equality holds if X is a constant (c) Jensen's inequality only applies to linear g. | (c) is false | picks (c) as a true statement — backwards: linear g gives *trivial* equality; the inequality's actual content is for genuinely nonlinear (strictly convex/concave) g → `jensen-inequality` |
| A1 | apply | short-answer | 0.5 | Use Jensen (g(x)=x², convex) to explain why Var(X)=E[X²]−(E[X])² is *always* ≥ 0. | E[X²] ≥ (E[X])² directly by Jensen, since x² is convex; so E[X²]−(E[X])² ≥ 0 — the "obvious" fact that variance can't be negative is Jensen's inequality in disguise *(required: makes the connection explicit, not just cites Var≥0 as a separate axiom)* | — |
| A2 | apply | numeric | 0.65 | A round trip covers equal distance at 60mph and 40mph. Is the trip's average speed the arithmetic mean, 50mph? Use Jensen (g(x)=1/x, convex for x>0) to explain why the true average is *lower*, and compute it. `[verified: 48mph]` | true average speed is the harmonic mean: 2/(1/60+1/40) = 48mph, below 50 — more *time* is spent at the slower 40mph leg (same distance, lower speed = more time), dragging the true average down *(required: the harmonic-mean computation and the "more time at the slow speed" mechanism)* | computes 50mph, applying the arithmetic mean to rates without checking whether that's the right average for this quantity → `jensen-inequality` |
| E1 | explain | derivation | 1.2 | Prove Jensen's inequality using the tangent-line definition of convexity: g(x) ≥ g(x₀) + g′(x₀)(x−x₀) at any x₀. | set x₀=E[X], x=X: g(X) ≥ g(E[X]) + g′(E[X])(X−E[X]); take expectations of both sides: E[g(X)] ≥ g(E[X]) + g′(E[X])·E[X−E[X]] = g(E[X]) + g′(E[X])·0 = g(E[X]) *(required: the E[X−E[X]]=0 cancellation must be shown)* | — |
| E2 | explain | short-answer | 1.35 | Explain intuitively why convexity causes E[g(X)] ≥ g(E[X]) — what is convexity "doing" to spread-out inputs? | a convex function curves upward, so averaging the *outputs* of a spread-out set of inputs tends to land higher than applying g to the single averaged *input* — spread gets "punished upward" by a convex function (and correspondingly "rewarded downward" by a concave one, the mechanism behind risk aversion under a concave utility) *(required: the spread/curvature intuition, not just restating the formula)* | — |
| T1 | transfer | short-answer | 1.7 | A stock alternates +50%, −50% in successive years. The arithmetic average return is (50%+(−50%))/2 = 0%, suggesting break-even. Trace $100 through both years and explain, via Jensen, why the arithmetic mean of returns systematically *overstates* true compounded growth. `[verified: 100→150→75]` | $100 → $150 (+50%) → $75 (−50%) — a real **25% loss**, not break-even; compounded growth is a *multiplicative* (geometric) quantity, and by Jensen's inequality applied to the concavity of log-growth, the arithmetic mean of percentage returns is always ≥ the true compounded growth rate — the correct summary statistic here is the *geometric* mean, not the arithmetic one *(required: the $100→$75 trace, not just citing the geometric-mean rule)* | reports 0% expected return as consistent with the actual $75 outcome, not recognizing the discrepancy as meaningful → `jensen-inequality` |

*Coverage: 2/2/2/1 — 7 items, −0.3…1.7.*

---

## Modes of Convergence (`modes-of-convergence`)
*Prereq: Random Variables · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | Define convergence in probability. | Xₙ →ₚ X if, for every ε>0, P(\|Xₙ−X\|>ε) → 0 as n→∞ | — |
| R2 | recall | mcq | −0.3 | The correct implication hierarchy, strongest to weakest, is: | almost sure ⟹ in probability ⟹ in distribution | reverses the order, believing convergence in distribution is the strongest → `modes-of-convergence` |
| A1 | apply | short-answer | 0.2 | Xₙ = X + 1/n for a fixed random variable X. Does Xₙ → X almost surely? In probability? | yes to both — Xₙ(ω) − X(ω) = 1/n → 0 for *every* outcome ω, so convergence is sure (hence almost sure), and almost sure convergence implies convergence in probability | — |
| A2 | apply | short-answer | 0.35 | The classic "typewriter sequence": Xₙ is the indicator of a shrinking-width interval that sweeps repeatedly across [0,1], hitting every point infinitely often. It converges to 0 in probability but *not* almost surely. Explain why this construction achieves that split. | P(Xₙ=1) → 0 as the interval widths shrink (giving convergence in probability), yet for *every fixed* ω, Xₙ(ω)=1 happens infinitely often as the sweep repeats forever — so no individual sample path ever settles at 0, which is exactly what almost sure convergence would require *(required: distinguishes "probability of being 1 shrinks" from "every individual path eventually stays near 0")* | — |
| E1 | explain | short-answer | 0.9 | Why is convergence in distribution the *weakest* of the three modes? | it only requires the CDFs Fₙ(x) → F(x) pointwise (at continuity points) — it says nothing about Xₙ and X being numerically close to each other, and the two sequences need not even live on the same probability space *(required, contrasted with convergence in probability, which does require \|Xₙ−X\| to actually shrink)* | — |
| E2 | explain | short-answer | 1.05 | Using the typewriter sequence from A2, explain the mechanism by which convergence in probability fails to imply almost sure convergence. | the set of outcomes where Xₙ is "far" from the limit keeps shrinking in probability at each n, but that set keeps *moving around* the sample space rather than shrinking to nothing and staying there — so every individual ω keeps getting hit again and again, even though the probability of being hit at any single fixed n goes to 0 *(required: the "shrinking but moving" mechanism, not just "it's a known counterexample")* | — |
| T1 | transfer | short-answer | 1.4 | An estimator θ̂ₙ is known to converge to the true θ *in probability*. A colleague says: "that means for any realization of the data, θ̂ₙ eventually gets arbitrarily close to θ and stays there." Is the colleague right? What would need to be true instead? | no — the colleague has described *almost sure* convergence, a strictly stronger claim; convergence in probability only guarantees the *probability* of a large deviation shrinks at each fixed n, not that any particular realized sequence permanently settles down; the colleague's statement would require θ̂ₙ → θ almost surely | accepts the colleague's description as an equivalent restatement of convergence in probability → `modes-of-convergence` |

*Coverage: 2/2/2/1 — 7 items, −0.6…1.4.*

---

## Law of Large Numbers (`law-of-large-numbers`)
*Prereq: Modes of Convergence, Chebyshev's Inequality · ancestors 14 · b₀ = 0.85*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.15 | State the Weak Law of Large Numbers. | for iid X₁,…,Xₙ with mean μ and finite variance, X̄ₙ →ₚ μ as n→∞ | — |
| R2 | recall | mcq | 0.15 | The Strong LLN differs from the Weak LLN in that it establishes: | convergence *almost surely* rather than merely in probability | claims it establishes "a faster rate of convergence" — the distinction is the *mode* of convergence, not the speed → `law-of-large-numbers` |
| A1 | apply | derivation | 0.65 | X̄ₙ has mean μ and variance σ²/n. Apply Chebyshev to bound P(\|X̄ₙ−μ\|≥ε) for fixed ε, and show it → 0 as n→∞. | P(\|X̄ₙ−μ\|≥ε) ≤ Var(X̄ₙ)/ε² = σ²/(nε²) → 0 as n→∞, for any fixed ε>0 — this *is* the definition of convergence in probability *(required: identifies that the shrinking bound is exactly what the definition demands)* | — |
| A2 | apply | numeric | 0.8 | For iid Xᵢ with σ²=4, find the smallest n (via A1's Chebyshev bound) guaranteeing P(\|X̄ₙ−μ\|≥0.5) ≤ 0.05. `[verified: n=320]` | σ²/(nε²) ≤ 0.05 ⟹ n ≥ σ²/(ε²·0.05) = 4/0.0125 = 320 | — |
| E1 | explain | derivation | 1.35 | Prove the Weak LLN formally, combining X̄ₙ's variance σ²/n with Chebyshev's inequality. | Var(X̄ₙ)=σ²/n (from properties of an average of iid terms); Chebyshev gives P(\|X̄ₙ−μ\|≥ε) ≤ σ²/(nε²); since this → 0 for every fixed ε>0, X̄ₙ →ₚ μ *by definition* *(required: the explicit "by definition of convergence in probability" closing step, tying the bound to the formal statement being proved)* | — |
| E2 | explain | short-answer | 1.5 | Why does the LLN require *finite variance*? What breaks for a Cauchy-distributed Xᵢ (no finite mean or variance)? | without finite variance, the Chebyshev proof technique collapses entirely (the bound σ²/(nε²) is infinite/meaningless); for genuinely heavy-tailed cases like Cauchy, the sample mean does not converge to any constant as n grows at all *(required: connects the proof's breakdown to the actual failure of convergence, not just "variance is needed for the proof")* | — |
| T1 | transfer | short-answer | 1.85 | A casino relies on LLN across millions of bets despite genuine per-bet uncertainty. Explain why LLN makes the casino's *average* profit per bet reliably close to its expected edge as bet count grows — and why this same logic would *not* protect a gambler making one enormous, one-time bet with "the same underlying probabilities." | LLN concentrates the *average over many repeated trials*; the casino's average profit per hand converges to its expected edge as n→∞, so total profit grows reliably; a single large bet is essentially n=1, where LLN provides no guarantee — the outcome variance for one trial stays large regardless of what happens as n→∞ elsewhere *(required: names that LLN's protection comes from repetition, not from the probabilities themselves)* | argues the gambler is equally protected because "the probabilities are the same" → `law-of-large-numbers` |

*Coverage: 2/2/2/1 — 7 items, −0.15…1.85. A1/E1 together are literally the proof of the Weak LLN, split across an apply item and its explain-level restatement.*

---

## Order Statistics (`order-statistics`)
*Prereq: CDF · ancestors 6 · b₀ = 0.47*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.53 | Define the order statistics X₍₁₎,…,X₍ₙ₎ of a sample. Which is the min, which the max? | the sorted values X₍₁₎≤X₍₂₎≤⋯≤X₍ₙ₎; X₍₁₎ is the min, X₍ₙ₎ is the max | — |
| R2 | recall | mcq | −0.23 | The CDF of the maximum, F₍ₙ₎(x), equals: | F(x)ⁿ | picks 1−[1−F(x)]ⁿ — that's actually the CDF of the *minimum*, an easy swap → `order-statistics` |
| A1 | apply | derivation | 0.27 | Derive F₍ₙ₎(x) = F(x)ⁿ directly from independence. | max≤x ⟺ *all* n values ≤x; by independence, P(all ≤x) = ΠP(Xᵢ≤x) = F(x)ⁿ *(required: the "all, not just one" equivalence)* | — |
| A2 | apply | numeric | 0.4 | X₁,…,X₅ iid Uniform(0,1). Find P(max ≤ 0.9). `[verified: 0.59049]` | F(x)=x for Uniform(0,1), so F₍₅₎(0.9) = 0.9⁵ ≈ 0.590 | uses n·F(x) instead of F(x)ⁿ → `order-statistics` |
| E1 | explain | derivation | 0.97 | Derive the CDF of the minimum, F₍₁₎(x) = 1−[1−F(x)]ⁿ, via the complement trick. | P(min≤x) = 1 − P(min>x) = 1 − P(all Xᵢ>x) = 1 − [1−F(x)]ⁿ by independence *(required: the complement step)* | — |
| E2 | explain | short-answer | 1.1 | Connect order statistics directly to `mle`'s earlier finding: the Uniform(0,θ) MLE is θ̂=max(x₁,…,xₙ). Explain what this reveals about *why* that MLE is biased. | θ̂ = X₍ₙ₎, the largest order statistic; every observed value is ≤ θ (by the distribution's own support), so their max is too — meaning X₍ₙ₎ *never exceeds* θ and therefore E[X₍ₙ₎] < θ strictly, confirming the MLE systematically underestimates θ *(required: the "max can never exceed θ" argument, naming X₍ₙ₎ explicitly as an order statistic)* | — |
| T1 | transfer | short-answer | 1.47 | Civil engineers designing a levee need the distribution of the *worst* (highest) flood level over 100 years, not the average year's level. Explain why an extreme's distribution behaves very differently from a single year's, and why "average year plus a margin" can be a dangerously inadequate design approach. | the max's distribution concentrates in the upper tail of the single-year distribution, and — for many common underlying distributions — E[max over n years] can keep growing with n, unlike the single-year mean, which stays fixed; a fixed additive margin built from typical-year data ignores that extremes are governed by tail behavior with its own scaling, and can badly underestimate the risk of an unlucky multi-year confluence *(required: names that the max's expectation grows with n while the single-year mean doesn't)* | assumes the worst-case-over-100-years level is well-approximated by the single-year mean plus a fixed buffer → `order-statistics` |

*Coverage: 2/2/2/1 — 7 items, −0.53…1.47.*

---

## Cluster 7 misconception index

| Tag | Blame |
|---|---|
| Markov bound quoted as the actual probability | `markov-inequality` |
| Chebyshev's universality mistaken for tightness | `chebyshev-inequality` |
| arithmetic mean applied to rates/multiplicative quantities | `jensen-inequality` |
| convergence-in-distribution mistaken for the strongest mode | `modes-of-convergence` |
| convergence in probability conflated with almost-sure convergence | `modes-of-convergence` |
| LLN's protection attributed to "favorable probabilities" rather than repetition | `law-of-large-numbers` |
| max/min CDF formulas swapped | `order-statistics` |

**Cluster total: 42 items across 6 concepts.** All numeric claims verified, including the standard
normal tail probability at 3 SD (0.0027) checked against an erf-based CDF, confirming Chebyshev's bound
is roughly 40× looser there. The cluster's central achievement is structural, not just content: Chebyshev
is *built from* Markov, and the Weak Law of Large Numbers is *built from* Chebyshev, inside the items
themselves (A1/E1 of `law-of-large-numbers`) — a learner who completes this cluster in order has
assembled the LLN's proof from two earlier results, not been handed it as a black box.
