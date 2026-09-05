# Cluster 8 — Estimation Theory

Sufficient Statistic → Cramér–Rao Lower Bound (5 concepts). Same format as
[Cluster 1](foundations-of-probability.md).

This cluster resolves two cliffhangers deliberately left open earlier in the bank:
`law-of-total-variance` finally lets the marketing-campaign risk question from Cluster 5's
`law-of-total-expectation` be answered with actual numbers, and `sufficient-statistic`'s E2 cashes in
the T(x) term `exponential-family` flagged as a preview two clusters ago.

---

## Sufficient Statistic (`sufficient-statistic`)
*Prereq: MLE · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | Define a sufficient statistic T(X) for θ. | the conditional distribution of the data given T(X) does *not* depend on θ | — |
| R2 | recall | mcq | 0.04 | The Factorization theorem: f(x;θ) factors as g(T(x),θ)h(x) if and only if: | T(x) is sufficient for θ | picks "T(x) is unbiased for θ" — confuses two unrelated properties of a statistic → `sufficient-statistic` |
| A1 | apply | derivation | 0.54 | For iid Bernoulli(θ), use factorization to show T(X)=ΣXᵢ is sufficient. | f(x;θ) = Πθˣⁱ(1−θ)¹⁻ˣⁱ = θ^{Σxᵢ}(1−θ)^{n−Σxᵢ} = g(Σxᵢ, θ)·h(x) with h(x)=1 — factors cleanly through Σxᵢ alone *(required: the explicit factorization, matching `exponential-family`'s earlier Bernoulli derivation)* | — |
| A2 | apply | derivation | 0.65 | For iid Normal(μ, σ²) with σ² *known*, show T(X)=Σxᵢ is sufficient for μ via factorization. | the joint density's μ-dependent part is exp(μΣxᵢ/σ² − nμ²/(2σ²)), depending on the data only through Σxᵢ; the rest (exp(−Σxᵢ²/(2σ²)) and normalizing constants) doesn't involve μ, giving the required g(T,θ)h(x) split | includes x's individual values in the g(T,θ) factor rather than isolating them into h(x) → `sufficient-statistic` |
| E1 | explain | short-answer | 1.24 | Explain intuitively why sufficiency means T(X) captures *all* the information in the data relevant to θ. | if the rest of the data is conditionally independent of θ given T (the defining property), then once T is known, examining the rest of the data cannot teach you anything more about θ — there is nothing left for it to reveal *(required)* | — |
| E2 | explain | short-answer | 1.44 | Connect this directly to `exponential-family`'s T(x) term: explain why the T(x) in any exponential family's canonical form f(x;θ)=h(x)exp(η(θ)T(x)−A(θ)) is *automatically* sufficient, by the Factorization theorem. | the density is already exactly in the required g(T(x),θ)·h(x) form, with g(T,θ)=exp(η(θ)T−A(θ)) — sufficiency is immediate, with no extra work, purely from the shape of the canonical form *(required: makes the connection to that earlier concept explicit, not just re-deriving sufficiency from scratch)* | — |
| T1 | transfer | short-answer | 1.74 | A hospital tracking 10,000 patients' Bernoulli(θ) recovery outcomes could safely delete every record except the total recovery count T=ΣXᵢ and n, losing nothing needed to estimate θ. Why might the hospital still want to keep the full data anyway? | sufficiency guarantees nothing is lost *for estimating this specific θ under this specific model* — but the full data may be needed for other purposes never contemplated by that model: checking model assumptions, studying interactions with other variables, auditing individual cases, or estimating a different parameter entirely later *(required: names sufficiency as relative to a specific parameter/model, not an absolute statement)* | treats sufficiency as proof the rest of the data is worthless in general → `sufficient-statistic` |

*Coverage: 2/2/2/1 — 7 items, −0.26…1.74.*

---

## Correlation (`correlation`)
*Prereq: Covariance, Variance · ancestors 13 · b₀ = 0.82*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.18 | Define ρ(X,Y) in terms of covariance and standard deviations. | ρ(X,Y) = Cov(X,Y)/(σ_X σ_Y) | — |
| R2 | recall | mcq | 0.12 | ρ(X,Y) always lies in: | [−1, 1] | picks [0,1], treating correlation like a probability that can't be negative → `correlation` |
| A1 | apply | numeric | 0.62 | Cov(X,Y)=2, Var(X)=4, Var(Y)=9. Find ρ(X,Y). `[verified: 1/3]` | ρ = 2/(2·3) = 1/3 ≈ 0.333 | forgets to take square roots of the variances before dividing → `correlation` |
| A2 | apply | short-answer | 0.75 | Reuse `covariance`'s example: X~Uniform(−1,1), Y=X², where Cov(X,Y)=0. What is ρ(X,Y) here, and what does it confirm? | ρ=0 (the numerator is 0); confirms correlation is exactly zero despite X, Y being maximally (nonlinearly) dependent — correlation captures *linear* association only, missing this perfect quadratic relationship entirely | concludes X, Y are independent because ρ=0 → `covariance` (the same error `covariance`'s R2/E2 already targeted, now recurring under a new name) |
| E1 | explain | derivation | 1.32 | Prove −1 ≤ ρ(X,Y) ≤ 1, using Var(aX−Y) ≥ 0 for *every* real a — without invoking Cauchy-Schwarz by name. | Var(aX−Y) = a²Var(X) − 2a·Cov(X,Y) + Var(Y) ≥ 0 for all a; viewed as a quadratic in a that is never negative, its discriminant must satisfy 4Cov(X,Y)² − 4Var(X)Var(Y) ≤ 0, giving Cov(X,Y)² ≤ Var(X)Var(Y), i.e. \|ρ\| ≤ 1 after dividing by σ_Xσ_Y *(required: the full discriminant argument, self-contained from Var≥0 alone)* | — |
| E2 | explain | short-answer | 1.5 | What does ρ=±1 mean about the relationship between X and Y, and how does it fall out of E1's proof? | equality in E1's discriminant condition means there *exists* an a where Var(aX−Y)=0 exactly — i.e. aX−Y is (almost surely) constant, i.e. Y is an **exact linear function of X** *(required: connects the equality case explicitly to E1's derivation, not stated as a separate fact)* | — |
| T1 | transfer | short-answer | 1.82 | A study reports ρ(screen time, happiness) = −0.3. A headline claims "screen time makes teens 30% less happy." Name at least two distinct problems with this interpretation. | (1) correlation ≠ causation — reverse causation (unhappy teens use more screens) or a confounder (e.g. underlying mental health) could equally explain it; (2) −0.3 is a *correlation coefficient*, not a percentage effect size, and "30% less happy" badly mangles what the number means; bonus: ρ only captures *linear* association (per A2), so it could understate a real but nonlinear effect *(required: at least two distinct, correctly-articulated problems)* | names only the causation issue, missing that the magnitude itself is being misreported → `correlation` |

*Coverage: 2/2/2/1 — 7 items, −0.18…1.82.*

---

## Law of Total Variance (`law-of-total-variance`)
*Prereq: Variance, Law of Total Expectation · ancestors 15 · b₀ = 0.89*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.11 | State the law of total variance. | Var(X) = E[Var(X\|Y)] + Var(E[X\|Y]) | — |
| R2 | recall | mcq | 0.19 | The two terms represent: | within-group variance and between-group variance | treats the two terms as "two unrelated quantities that happen to sum to Var(X)," missing the within/between interpretation → `law-of-total-variance` |
| A1 | apply | numeric | 0.69 | Reuse `law-of-total-expectation`'s exam example: Method A → mean 75, variance 100; Method B → mean 85, variance 64; chosen 50/50. Find Var(overall score). `[verified: 107]` | E[Var\|method] = 0.5(100)+0.5(64) = 82; Var(E[·\|method]) — a 2-point variable (75 or 85, each w.p. 0.5) with mean 80 — has variance 0.5(75−80)²+0.5(85−80)² = 25; total = 82+25 = 107 | computes only one of the two terms and reports that as the total → `law-of-total-variance` |
| A2 | apply | numeric | 0.8 | Revisit `law-of-total-expectation`'s marketing cliffhanger: 3 equally-likely campaigns with expected revenues $2M, $3M, $7M, each with within-campaign variance 1 ($M²). Find Var(overall revenue). `[verified: 5.667]` | E[Var\|campaign]=1; Var(E[·\|campaign]) uses mean 4, second moment (4+9+49)/3≈20.67, giving between-variance ≈4.67; total ≈ 1+4.67 = 5.667 | — |
| E1 | explain | derivation | 1.39 | Derive the law of total variance from Var(X)=E[X²]−(E[X])², applying the law of total expectation twice. | Var(X) = E[E[X²\|Y]] − (E[E[X\|Y]])²; substitute E[X²\|Y] = Var(X\|Y) + (E[X\|Y])² (the shortcut variance formula applied conditionally); this gives E[Var(X\|Y)] + E[(E[X\|Y])²] − (E[E[X\|Y]])², and the last two terms are exactly Var(E[X\|Y]) by definition *(required: the full multi-step substitution, including recognizing the last two terms as a variance)* | — |
| E2 | explain | short-answer | 1.6 | Why are *both* terms needed to fully understand a grouped random quantity? Contrast a case with large between-group variance and small within-group variance against the reverse. | knowing only the overall mean (as `law-of-total-expectation` alone provides) hides whether the risk comes from genuine group-to-group differences (large between-term) or from noise within each group (large within-term) — these have very different practical implications even at the same total variance *(required: the explicit contrast between the two regimes)* — this decomposition is exactly what `law-of-total-expectation`'s T1 was missing | — |
| T1 | transfer | short-answer | 1.89 | Resolve the marketing cliffhanger definitively: suppose the $7M campaign *alone* has variance 50, while A2's mixed strategy across all three campaigns has total variance only 5.667. Using both the mean and the variance, argue why a risk-averse company might prefer the mixed strategy or the $3M campaign over committing fully to the $7M one. `[verified: 5.667 vs 50]` | expected value alone (favoring $7M) ignores that committing fully to it inherits its own large variance (50) directly, while the mixed strategy's total variance (5.667) is far smaller — a genuine risk/return tradeoff that `law-of-total-expectation` alone could never surface, and exactly why this companion tool exists *(required: the explicit numeric contrast, 50 vs 5.667, driving the argument)* | repeats the "always pick highest expected value" reasoning from the original cliffhanger without incorporating the new variance information → `law-of-total-variance` |

*Coverage: 2/2/2/1 — 7 items, −0.11…1.89. This is the one concept in the whole bank explicitly built to answer a question posed two clusters earlier.*

---

## Fisher Information (`fisher-information`)
*Prereq: MLE · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | State the two equivalent definitions of Fisher information I(θ). | I(θ) = E[(∂/∂θ log f(X;θ))²] = −E[∂²/∂θ² log f(X;θ)] | — |
| R2 | recall | mcq | 0.04 | Higher Fisher information corresponds to: | a sharper, more peaked likelihood — a more precisely estimable θ | picks "a flatter, more spread-out likelihood," backwards → `fisher-information` |
| A1 | apply | derivation | 0.54 | For X~Bernoulli(θ), compute I(θ) using the curvature form. `[verified: 1/(θ(1−θ))]` | log f = x ln θ + (1−x)ln(1−θ); first derivative x/θ − (1−x)/(1−θ); second derivative −x/θ² − (1−x)/(1−θ)²; −E[·] = θ/θ² + (1−θ)/(1−θ)² = 1/θ + 1/(1−θ) = 1/(θ(1−θ)) *(required: the full differentiate-twice-then-expect chain)* | — |
| A2 | apply | numeric | 0.65 | Using A1, compare I(0.5) and I(0.1). Which θ carries *more* information per observation? `[verified: 4 vs 11.11]` | I(0.5)=1/(0.25)=4; I(0.1)=1/(0.09)≈11.11 — **more** information near the extremes than at 0.5, which can feel counterintuitive but reflects that the MLE's variance 1/(nI(θ)) is *smaller* there | assumes information should be highest at θ=0.5, by analogy with variance being maximized there for Bernoulli → `fisher-information` |
| E1 | explain | short-answer | 1.24 | Explain, geometrically, why sharper likelihood curvature means θ is more precisely estimable. | a sharply peaked likelihood drops off quickly for θ away from θ̂, meaning the data strongly rules out nearby alternative values; a flat peak leaves many nearby θ values almost equally consistent with the data, so θ is poorly pinned down *(required: the "how quickly nearby θ are ruled out" framing)* | — |
| E2 | explain | short-answer | 1.4 | Why is Fisher information additive across independent observations — total information for n iid observations is n·I(θ)? | the log-likelihood of n iid observations is a *sum* of individual log-likelihoods; derivatives (and their squares/expectations, under independence) of a sum decompose into a sum of the individual terms' contributions *(required)* | — |
| T1 | transfer | short-answer | 1.74 | A pollster with a fixed sample size wants to estimate the true support proportion θ. Using A2's finding that I(θ) is smallest at θ=0.5, explain what this implies about polling a close (50/50) race versus a landslide (90/10) race with the *same* sample size. | a close race (θ near 0.5) is the *hardest* to poll precisely — lowest Fisher information means the MLE's variance 1/(nI(θ)) is largest there — while a landslide is easier to pin down with the same n; close elections genuinely need larger samples to hit the same margin of error *(required: the explicit link from A2's I(θ) shape to sample-size requirements)* | assumes all races are equally hard to poll to a given precision regardless of θ → `fisher-information` |

*Coverage: 2/2/2/1 — 7 items, −0.26…1.74.*

---

## Cramér–Rao Lower Bound (`cramer-rao-lower-bound`)
*Prereq: Fisher Information, Unbiased Estimator · ancestors 15 · b₀ = 0.89*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.11 | State the Cramér–Rao Lower Bound for an unbiased estimator θ̂ from n iid observations. | Var(θ̂) ≥ 1/(nI(θ)) | — |
| R2 | recall | mcq | 0.19 | An estimator achieving the CRLB with equality is called: | efficient | picks "sufficient" — a different, related-sounding term from `sufficient-statistic` → `sufficient-statistic` |
| A1 | apply | numeric | 0.69 | For iid Bernoulli(θ) with I(θ)=1/(θ(1−θ)) and n=100, find the CRLB for Var(θ̂) at θ=0.5. `[verified: 0.0025]` | CRLB = 1/(nI(θ)) = 1/(100·4) = 0.0025 | — |
| A2 | apply | short-answer | 0.8 | The sample mean has Var(X̄)=θ(1−θ)/n exactly for Bernoulli data. Compare this to A1's bound and state what it proves. `[verified: exactly equal, 0.0025]` | θ(1−θ)/n = 0.5·0.5/100 = 0.0025, matching the CRLB *exactly* — the sample mean **achieves** the bound, so it is an *efficient* estimator for Bernoulli's θ *(required: notes the exact equality, not just "it's close")* | notes the two numbers match but doesn't draw the "therefore efficient" conclusion → `cramer-rao-lower-bound` |
| E1 | explain | short-answer | 1.39 | Without a full Cauchy-Schwarz-based proof, explain intuitively why the bound has the specific form 1/(nI(θ)). | more observations (larger n) should make estimation easier, giving a *smaller* lower bound — n in the denominator matches; more information per observation (larger I(θ)) should also make estimation easier, giving a smaller bound — I(θ) also belongs in the denominator *(required: both directions of the intuition, matched to the formula's structure)* | — |
| E2 | explain | short-answer | 1.55 | Why is the CRLB called a "universal speed limit," rather than just a bound on one specific estimator? | it applies to *every possible* unbiased estimator simultaneously — not one you happened to construct — so no cleverly designed unbiased estimator, however sophisticated, can ever beat it *(required: the "applies to every possible estimator" universality, not just "it's a tight bound")* | — |
| T1 | transfer | short-answer | 1.89 | Two competing unbiased estimators of a drug's efficacy θ exist. A company wants to know if some third, cleverer unbiased method could ever beat both. How does the CRLB answer this *without* testing every conceivable estimator? | compute the CRLB (1/(nI(θ))) once, from the model and sample size alone; if either existing estimator's variance already *equals* this bound, it is already optimally efficient among all unbiased estimators, and no unbiased method — however clever — can ever do better *(required: names that hitting the bound settles the question definitively, with no exhaustive search needed)* | proposes testing more candidate estimators empirically rather than checking against the bound directly → `cramer-rao-lower-bound` |

*Coverage: 2/2/2/1 — 7 items, −0.11…1.89. A1/A2 verify a genuinely striking fact: the ordinary sample mean is exactly efficient for Bernoulli, achieving the universal bound with no slack at all.*

---

## Cluster 8 misconception index

| Tag | Blame |
|---|---|
| sufficiency mistaken for unbiasedness or for a claim about all future uses of the data | `sufficient-statistic` |
| correlation assumed to range over [0,1] | `correlation` |
| ρ=0 mistaken for independence (recurrence of `covariance`'s central misconception) | `covariance` |
| correlation/causation and magnitude misreadings conflated | `correlation` |
| law-of-total-variance's two terms treated as unrelated | `law-of-total-variance` |
| Fisher information assumed maximized at θ=0.5 by analogy with variance | `fisher-information` |
| "efficient" and "sufficient" terminology confused | `sufficient-statistic` |
| CRLB match noted but its "no estimator can do better" conclusion missed | `cramer-rao-lower-bound` |

**Cluster total: 35 items across 5 concepts.** All numeric claims verified, including the exact
equality between the Bernoulli CRLB and the sample mean's true variance — not an approximation, a
genuine algebraic identity confirmed to machine precision. Two concepts in this cluster exist
specifically to complete arcs opened earlier: `law-of-total-variance` answers `law-of-total-expectation`'s
marketing question, and `sufficient-statistic` cashes in `exponential-family`'s T(x) preview.
