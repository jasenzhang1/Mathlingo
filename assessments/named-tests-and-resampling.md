# Cluster 11 — Named Tests & Resampling

One/Two-Sample Z/t-tests, Chi-Square Tests, Fisher's Exact, Wilcoxon, Bootstrapping (11 concepts).
Same format as [Cluster 1](foundations-of-probability.md). This is the last cluster of the
probability/statistics sweep — everything here is an *application* of machinery built in Clusters
1–10, so items lean on cross-references rather than re-deriving shared logic, and run one level
lighter (6 items each) since the underlying test-construction logic repeats across the family.

---

## One Sample Z-Test (`one-sample-z-test`)
*Prereq: Hypothesis Test, Standard Error, Normal Distribution · ancestors 27 · b₀ = 1.17*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.17 | State the one-sample Z test statistic and its one defining, often-unrealistic assumption. | Z=(X̄−μ₀)/(σ/√n); requires σ **known** | — |
| R2 | recall | mcq | 0.47 | If σ is actually unknown but this test is used anyway (plugging in s), what's the consequence, especially for small n? | the test's true error rate departs from the nominal α — one-sample-t-test exists specifically to handle this case correctly | assumes plugging in s changes nothing about the test's validity → `one-sample-z-test` |
| A1 | apply | numeric | 0.97 | n=36, σ=12 (known), μ₀=50, x̄=57. Test H₀:μ=50 at α=0.05. `[verified: Z=3.5]` | Z=(57−50)/(12/6)=3.5; \|3.5\|>1.96, **reject** | — |
| E1 | explain | short-answer | 1.67 | Is this test's Type I error rate exactly α, or only approximately? Under what condition does each hold? | exactly α if the underlying data is truly Normal; only approximately α (via CLT, from `sampling-distribution`) if the data isn't Normal but n is large enough for X̄ to be approximately Normal regardless *(required: both cases distinguished)* | — |
| T1 | transfer | short-answer | 2.17 | Why is "σ known" almost never realistic in practice? What test replaces this one as a result? | σ is a population parameter, and if it's unknown (the near-universal case — even the calibration data used to "know" σ is itself a finite sample), the correct move is to *estimate* it with s and account for that extra uncertainty via a wider-tailed distribution — exactly what `one-sample-t-test` does next *(required: names the estimation-uncertainty gap, not just "σ is unknown")* | — |

*Coverage: 1/1/1/1... this concept runs 4 items rather than the usual 6+, since its entire content is a direct instance of `test-statistic`/`rejection-region` machinery from Cluster 10 with one added assumption; the interesting content lives downstream in the t-test contrast.*

---

## One Sample T-Test (`one-sample-t-test`)
*Prereq: One Sample Z-Test, Student's t-Distribution · ancestors 38 · b₀ = 1.33*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.33 | State the one-sample T statistic, its distribution under H₀, and the key difference from the Z-test. | T=(X̄−μ₀)/(s/√n) ~ t_{n−1} under H₀; the difference from Z is that σ is **unknown**, estimated by s | — |
| R2 | recall | mcq | 0.63 | For small n, the t-test's critical value is ___ the z-test's at the same α: | always larger | assumes t and z critical values are always equal, missing that t has heavier tails (`t-distribution`, Cluster 4) → `one-sample-t-test` |
| A1 | apply | numeric | 1.13 | n=16, x̄=52, s=8, μ₀=48, α=0.05 two-tailed, t₁₅,₀.₀₂₅≈2.131. `[verified: T=2]` | T=(52−48)/(8/4)=2; \|2\|<2.131, **fail to reject** — but a naive z-test using 1.96 would have wrongly *rejected* (2>1.96), illustrating exactly why the wider t critical value matters *(required: notes the would-be-wrong z-based decision)* | uses z's 1.96 critical value here, concluding "reject" → `one-sample-t-test` |
| E1 | explain | short-answer | 1.83 | Why do t_{n−1} critical values converge to z critical values as n grows? | matches `t-distribution`'s E1 exactly: as degrees of freedom grow, V/k concentrates near 1 (an informal LLN argument), so Tₖ≈Z/1=Z, and the extra uncertainty from estimating σ becomes negligible *(required: the direct callback)* | — |
| T1 | transfer | short-answer | 2.33 | A small clinical trial (n=16) must use t, not z, because σ is never truly known. What's the practical consequence of incorrectly using z instead, as in A1? | using z understates the genuine uncertainty from estimating σ with a small sample, producing more false rejections (Type I errors) than the nominal α promises — precisely what A1 demonstrated numerically *(required: connects back to the specific A1 result)* | — |

*Coverage: 4 items, 0.33…2.33.*

---

## One Sample Proportions Z-Test (`one-sample-proportions-z-test`)
*Prereq: One Sample Z-Test, Bernoulli and Binomial Distributions · ancestors 33 · b₀ = 1.26*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.26 | State the test statistic for H₀:p=p₀, noting exactly which value goes inside the SE. | Z=(p̂−p₀)/√(p₀(1−p₀)/n) — uses **p₀**, the hypothesized value, inside the SE, not the observed p̂ | — |
| R2 | recall | mcq | 0.56 | Why use p₀ rather than p̂ in the SE formula? | under H₀ we *assume* p=p₀ is true, so the correct SE to use is the one implied by that assumption | claims "it doesn't matter which you use" — a common shortcut that quietly breaks the test's logic → `one-sample-proportions-z-test` |
| A1 | apply | numeric | 1.06 | n=200, 130 successes (p̂=0.65), H₀:p=0.6, α=0.05. `[verified: SE≈0.0346, Z≈1.443]` | SE=√(0.6·0.4/200)≈0.0346; Z=(0.65−0.6)/0.0346≈1.44; \|1.44\|<1.96, **fail to reject** | plugs p̂=0.65 into the SE formula instead of p₀=0.6, per R2's error → `one-sample-proportions-z-test` |
| E1 | explain | short-answer | 1.76 | Why does this test require np₀≥10 and n(1−p₀)≥10 to be valid? | this is the Normal-approximation-to-Binomial condition, echoing Cluster 3's Poisson-limit intuition in reverse — here we need the Binomial count to look *Normal*, not Poisson, which requires n large enough relative to how extreme p₀ is *(required: connects to the same "n large, event not too rare" logic underlying both limits)* | — |
| T1 | transfer | short-answer | 2.26 | Why is it conceptually wrong (not just a stylistic difference) to substitute p̂ for p₀ in the SE — even though it seems like "using the best available estimate"? | the whole logic of a hypothesis test is to ask what the data would look like *if H₀ were true*; substituting p̂ abandons that assumption mid-calculation, mixing "what we assumed" with "what we observed" in a way that invalidates the test's error-rate guarantees *(required: the logical-inconsistency argument, not just "it's the convention")* | — |

*Coverage: 4 items, 0.26…2.26.*

---

## Two Sample Z-Test (`two-sample-z-test`)
*Prereq: One Sample Z-Test · ancestors 28 · b₀ = 1.18*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.18 | State the two-sample Z statistic, and explain why the combined SE is √(σ₁²/n₁+σ₂²/n₂) rather than a sum or average of the two individual SEs. | Z=((X̄₁−X̄₂)−Δ₀)/√(σ₁²/n₁+σ₂²/n₂); the *variances* add for independent samples (Var(X̄₁−X̄₂)=Var(X̄₁)+Var(X̄₂)), not the standard deviations — the SE is the square root of that sum *(required: names variances, not SDs, as what adds)* | — |
| R2 | recall | mcq | 0.48 | This test assumes the two samples are: | independent | assumes it works for paired/matched data too, missing the setup `paired-t-test` exists to handle instead → `two-sample-z-test` |
| A1 | apply | numeric | 0.98 | n₁=50,x̄₁=100,σ₁=10 (known); n₂=40,x̄₂=95,σ₂=12 (known). Test H₀:μ₁=μ₂ at α=0.05. `[verified: SE≈2.366, Z≈2.113]` | SE=√(100/50+144/40)≈2.366; Z=(100−95)/2.366≈2.11; \|2.11\|>1.96, **reject** | — |
| E1 | explain | derivation | 1.68 | Derive Var(X̄₁−X̄₂)=Var(X̄₁)+Var(X̄₂) for independent samples, from Var(X−Y)=Var(X)+Var(Y)−2Cov(X,Y). | for independent X̄₁,X̄₂, Cov(X̄₁,X̄₂)=0 (an ancestor fact from `covariance`), leaving Var(X̄₁−X̄₂)=Var(X̄₁)+Var(X̄₂) directly *(required: the Cov=0 step named explicitly)* | — |
| T1 | transfer | short-answer | 2.18 | Two independent clinical sites measure the same drug's effect. Why is independence essential here, and what would go wrong if some patients were accidentally counted in both samples? | double-counted patients would introduce a nonzero Cov(X̄₁,X̄₂) term that E1's formula doesn't account for, invalidating the SE and hence the test's error-rate guarantees *(required: names the unaccounted Cov term specifically)* | assumes double-counting only affects sample size, not the validity of the independence-based SE formula → `two-sample-z-test` |

*Coverage: 4 items, 0.18…2.18.*

---

## Two Sample T-Test (`two-sample-t-test`)
*Prereq: One Sample T-Test, Two Sample Z-Test · ancestors 40 · b₀ = 1.36*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.36 | Name the two main variants of the two-sample t-test and the assumption distinguishing them. | pooled (assumes σ₁=σ₂, combines s₁²,s₂² into one estimate, df=n₁+n₂−2) vs Welch's (does not assume equal variances, uses an approximate df formula) | — |
| R2 | recall | mcq | 0.66 | Welch's t-test is generally the safer *default* choice because: | it doesn't require assuming equal variances, often unrealistic in practice | claims Welch's "always gives a smaller p-value" — not a general fact, and not the actual reason it's recommended → `two-sample-t-test` |
| A1 | apply | numeric | 1.16 | Two samples, n₁=n₂=20, s₁²=s₂²=25, x̄₁=80, x̄₂=75. Compute the pooled T statistic. `[verified: pooled var=25, SE≈1.581, T≈3.162]` | pooled variance = (19·25+19·25)/38 = 25 (equal here, since the sample variances happen to match); SE=√(25/20+25/20)≈1.581; T=(80−75)/1.581≈3.16 | — |
| E1 | explain | short-answer | 1.86 | Why is pooling invalid — or at least misleading — when the two true variances genuinely differ? | pooling implicitly assumes a single common σ²; if σ₁≠σ₂ in truth, the pooled estimate is a biased blend that can distort the test's actual error rate, sometimes substantially *(required)* | — |
| T1 | transfer | short-answer | 2.36 | A new manufacturing process (likely to have *different variability*, not just a different mean, than the old one) is compared to the old one. Why is assuming equal variances risky here, and which test variant is safer? | a new process plausibly has a different σ as well as a different μ, making the pooled test's equal-variance assumption risky by default; Welch's test, which doesn't require that assumption, is the safer choice *(required: names the plausible-variance-difference reasoning specifically, not just "Welch's is generally safer")* | defaults to the pooled test out of habit without considering whether equal variances is plausible here → `two-sample-t-test` |

*Coverage: 4 items, 0.36…2.36.*

---

## Paired T-Test (`paired-t-test`)
*Prereq: Two Sample T-Test · ancestors 41 · b₀ = 1.37*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.37 | Describe the paired t-test's key trick, in terms of what test it reduces to. | compute differences dᵢ=Xᵢ−Yᵢ for each matched pair, then run a **one-sample** t-test on the dᵢ against H₀: mean difference = 0 | — |
| R2 | recall | mcq | 0.67 | Pairing is most beneficial (vs. an unpaired two-sample test) when: | the pairs are highly correlated/similar to each other within a pair | assumes pairing helps regardless of how related the pairs are, missing the actual mechanism → `paired-t-test` |
| A1 | apply | numeric | 1.17 | 8 subjects' before/after differences: 3,5,2,4,6,1,3,4. Test H₀: mean difference=0 at α=0.05 (df=7, critical t≈2.365). `[verified: mean=3.5, SE≈0.567, T≈6.17]` | mean=3.5, s≈1.604, SE≈0.567, T≈6.17; \|6.17\|≫2.365, **reject** — a strong, unambiguous treatment effect | — |
| E1 | explain | short-answer | 1.87 | Why does pairing increase power compared to an unpaired test on the same data? | taking differences cancels out each subject's own baseline level (some people are just naturally healthier/taller/etc.), removing *between-subject* variability from the comparison and leaving only the within-subject effect plus noise — directly the within/between decomposition from `law-of-total-variance`, with the between-term deliberately eliminated *(required: the explicit connection to that decomposition)* | — |
| T1 | transfer | short-answer | 2.37 | Why would it be a mistake to analyze before/after data on the *same* subjects with an unpaired two-sample t-test instead? | before/after measurements on the same people are inherently correlated, violating the unpaired test's independence assumption; using the wrong test typically makes it too *conservative* (understates significance), since it ignores the correlation pairing exploits *(required: names independence as the violated assumption, and the direction of the resulting error)* | uses the unpaired test anyway, treating it as merely "less efficient" rather than assumption-violating → `paired-t-test` |

*Coverage: 4 items, 0.37…2.37.*

---

## Chi Square Test of Independence (`chi-square-test-of-independence`)
*Prereq: Chi Square Distribution, Hypothesis Test · ancestors 35 · b₀ = 1.29*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.29 | State the test statistic and its degrees of freedom for an r×c contingency table. | Σ(O−E)²/E ~ χ²_{(r−1)(c−1)} under H₀ | — |
| R2 | recall | mcq | 0.59 | The "expected count" for a cell under H₀ (independence) is: | (row total × column total) / grand total | picks "the average of all cells," missing the marginal-product structure entirely → `chi-square-test-of-independence` |
| A1 | apply | numeric | 1.09 | 2×2 table [[30,10],[20,40]] (rows: exposed/not; columns: disease/no disease). Compute the chi-square statistic. `[verified: 16.667]` | row totals 40,60; col totals 50,50; expected cells 20,20,30,30; χ²=(30−20)²/20+(10−20)²/20+(20−30)²/30+(40−30)²/30 ≈16.67 | — |
| E1 | explain | short-answer | 1.79 | Connect this test's "expected under independence" computation directly to `joint-distribution`'s E1. | this test IS `joint-distribution`'s earlier row/column-sum independence check — comparing observed cell counts against the product of the marginals — now formalized with a known null distribution (χ²) attached, turning an ad hoc comparison into a proper hypothesis test *(required: names that earlier item explicitly)* | — |
| T1 | transfer | short-answer | 2.29 | Testing whether smoking status and disease occurrence are associated: why does a *large* chi-square statistic count as evidence against independence? | large (O−E)² terms mean observed counts deviate substantially from what independence would predict in every cell; since independence would make the expected and observed counts close on average, a large accumulated deviation is evidence the independence assumption is false *(required)* | — |

*Coverage: 4 items, 0.29…2.29.*

---

## Chi Square Goodness of Fit Test (`chi-square-goodness-of-fit-test`)
*Prereq: Chi Square Test of Independence · ancestors 36 · b₀ = 1.31*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.31 | State the test statistic (same form as the independence test) and its degrees of freedom, contrasting with that test's df. | Σ(O−E)²/E ~ χ²_{k−1} for k categories — df is k−1, *not* (r−1)(c−1) as in the independence test | — |
| R2 | recall | mcq | 0.61 | Goodness-of-fit tests whether: | a single variable's distribution matches a specified/hypothesized distribution | describes it as testing whether two variables are independent — confusing it with `chi-square-test-of-independence` → `chi-square-goodness-of-fit-test` |
| A1 | apply | numeric | 1.11 | A die is rolled 60 times: observed counts 8,12,7,15,9,9. Test H₀: fair die (expected 10 each) at α=0.05 (df=5, critical≈11.07). `[verified: χ²=4.4]` | χ²=Σ(O−10)²/10 = 4.4; 4.4 < 11.07, **fail to reject** — no evidence of an unfair die | — |
| E1 | explain | short-answer | 1.81 | Why does this test use df=k−1 while the independence test uses (r−1)(c−1)? | here the hypothesized proportions are *fully specified* in advance (e.g. 1/6 each), using up only one constraint (total count fixed); the independence test instead estimates *two* sets of marginal totals from the data itself, costing more degrees of freedom *(required: the "fully specified vs. estimated from data" contrast)* | — |
| T1 | transfer | short-answer | 2.31 | To test whether continuous measurements (e.g. inter-arrival times) follow a specific named distribution (e.g. Exponential), you must first bin the data into categories. Why can the choice of bins affect the conclusion? | different binning choices redistribute how deviations from the hypothesized distribution get aggregated into (O−E)² terms — a coarse binning can average away a real local misfit, while a very fine binning can create small-expected-count cells that make the χ² approximation unreliable, so the result is not fully bin-choice-independent *(required: names a concrete mechanism, not just "binning is subjective")* | — |

*Coverage: 4 items, 0.31…2.31.*

---

## Fisher's Exact Test (`fischers-exact-test`)
*Prereq: Chi Square Test of Independence, Hypergeometric Distribution · ancestors 37 · b₀ = 1.32*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.32 | What makes this test "exact," and when is it preferred over chi-square? | no large-sample/Normal approximation is used at all; preferred for small samples, especially when expected counts fall below chi-square's validity threshold of 5 | — |
| R2 | recall | mcq | 0.62 | Fisher's Exact Test computes exact p-values using which distribution, conditioning on the observed marginal totals? | Hypergeometric | picks Chi-square, missing that this test's entire point is to avoid the chi-square approximation → `fischers-exact-test` |
| A1 | apply | derivation | 1.12 | For the small 2×2 table [[3,1],[1,4]] (row totals 4,5; column totals 4,5; N=9), set up the exact probability of observing top-left=3 given the fixed marginals. `[verified: 20/126≈0.159]` | P(top-left=3) = C(4,3)·C(5,1)/C(9,4) = 4·5/126 ≈ 0.159 — a direct hypergeometric pmf evaluation | uses the chi-square approximation instead, despite the table being far too small for it to be trustworthy → `chi-square-test-of-independence` |
| E1 | explain | short-answer | 1.82 | Explain why conditioning on the fixed marginal totals makes this exactly the `hypergeometric-distribution` setup from Cluster 3. | fixing both row and column totals is equivalent to imagining all N units shuffled together, with a predetermined number belonging to each row-category, then "dealt" into the column-categories according to the fixed column totals — exactly drawing without replacement from a population with two types *(required: the explicit shuffling/dealing analogy)* | — |
| T1 | transfer | short-answer | 2.32 | A rare-disease study with only 9 total patients wants to test whether a treatment is associated with recovery. Why is Fisher's Exact Test the appropriate choice here rather than chi-square? | with only 9 patients, expected cell counts are almost certainly below chi-square's validity threshold of 5, making its Normal-based approximation unreliable; Fisher's computes an exact probability with no such approximation, remaining valid at any sample size *(required: the explicit small-expected-count justification)* | — |

*Coverage: 4 items, 0.32…2.32.*

---

## Wilcoxon Rank Sum Test (`wilcoxon-rank-sum-test`)
*Prereq: Order Statistics, Hypothesis Test · ancestors 26 · b₀ = 1.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.15 | Describe the basic idea of the Wilcoxon rank-sum test. | rank *all* observations from both groups combined, then compare the sum of ranks between the two groups | — |
| R2 | recall | mcq | 0.45 | The main advantage of Wilcoxon over the two-sample t-test is: | it doesn't require assuming the data follows a Normal (or any specific) distribution | claims it's "always more powerful" — an honest tradeoff is being missed; it typically sacrifices some power on genuinely Normal data in exchange for validity elsewhere → `wilcoxon-rank-sum-test` |
| A1 | apply | short-answer | 0.95 | Group A: 5,7,9; Group B: 2,4,6. Rank all 6 combined, and find each group's rank sum. `[verified: A=14, B=7]` | combined sorted: 2,4,5,6,7,9 → ranks 1–6; Group A gets ranks 3,5,6 (sum 14); Group B gets ranks 1,2,4 (sum 7) | — |
| E1 | explain | short-answer | 1.65 | Why does being "non-parametric" specifically help with skewed data, like the income/reaction-time examples from `normal-distribution`'s earlier T1? | ranks are invariant to any monotonic transformation of the data (e.g. taking a log doesn't change the ranks at all), so the test's conclusion doesn't depend on getting a distributional assumption right — unlike the t-test, which directly assumes approximate Normality of the sampling distribution of the mean *(required: the monotonic-invariance mechanism, not just "it avoids assuming Normality")* | — |
| T1 | transfer | short-answer | 2.15 | Reaction-time data is right-skewed with occasional extreme outliers. Why might a t-test on mean reaction time be misleadingly influenced by outliers, while Wilcoxon is more robust? | an extreme outlier (say 10 seconds against a typical 0.3) massively inflates a mean and its variance-based test statistic; that same outlier, however extreme, can only ever occupy the single largest rank — ranks encode order, not magnitude, so one outlier can't distort the rank-sum any more than a "somewhat large" value would *(required: the "ranks encode order, not magnitude" mechanism)* | — |

*Coverage: 4 items, 0.15…2.15.*

---

## Bootstrapping (`bootstrapping`)
*Prereq: Sampling Distribution · ancestors 22 · b₀ = 1.07*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.07 | Describe the basic bootstrap procedure in one sentence. | resample *with replacement* from the observed data (same size n as the original), repeat many times, computing the statistic of interest each time, to approximate its sampling distribution | — |
| R2 | recall | mcq | 0.37 | The bootstrap's "plug-in principle" treats: | the observed sample as a stand-in for the true population | treats "the true population as known exactly" — missing that the whole method exists because the population is *not* known → `bootstrapping` |
| A1 | apply | short-answer | 0.87 | Original sample: {2,4,4,7,9}. Which are valid bootstrap resamples (same size, with replacement)? (a) {4,4,7,7,9} (b) {2,4,7,9} (c) {4,4,4,4,4} | (a) and (c) are both valid — any combination of the original values, repeats allowed, of size 5; (b) is invalid, having only 4 values | rejects (c) as "too extreme to be valid," not recognizing that any resample of the correct size, however repetitive, is legitimate → `bootstrapping` |
| E1 | explain | short-answer | 1.57 | Why is bootstrapping especially valuable for a statistic like the median, which has no simple closed-form SE formula? | there is no formula analogous to σ/√n for the median's standard error; the bootstrap sidesteps this entirely by simulating the sampling process directly, and the same approach generalizes to *any* statistic computable on a resampled dataset, however complicated *(required: the "no formula needed" payoff stated explicitly)* | — |
| T1 | transfer | short-answer | 2.07 | Why can't you bootstrap by resampling *without* replacement (same size n from a sample of size n)? | resampling without replacement of the same size n would just reproduce a permutation of the exact same n values every time — no new information about sampling variability at all; *with* replacement is essential because it allows genuinely different resamples (some values repeated, others omitted), which is what lets the bootstrap distribution capture any variability in the first place *(required: the "just a permutation, no new information" argument)* | — |

*Coverage: 4 items, 0.07…2.07.*

---

## Cluster 11 misconception index

| Tag | Blame |
|---|---|
| σ-unknown case handled as if σ were known | `one-sample-z-test` |
| t and z critical values assumed identical regardless of n | `one-sample-t-test` |
| p̂ substituted for p₀ inside a proportions-test SE | `one-sample-proportions-z-test` |
| independence assumption of the two-sample test overlooked for paired data | `two-sample-z-test`, `paired-t-test` |
| pooled variance test used despite plausibly unequal variances | `two-sample-t-test` |
| independence-test and goodness-of-fit df formulas swapped | `chi-square-goodness-of-fit-test` |
| chi-square approximation used at sample sizes too small for its validity | `fischers-exact-test` |
| Wilcoxon assumed strictly more powerful than the t-test in general | `wilcoxon-rank-sum-test` |
| bootstrap resampling done without replacement | `bootstrapping` |

**Cluster total: 44 items across 11 concepts.** All numeric claims verified by script, including the
pooled two-sample t statistic, the exact hypergeometric probability underlying Fisher's test, and the
Wilcoxon rank sums by direct computation.

---

# Probability & Statistics: complete

**81 / 81 concepts done.** See [README.md](README.md) for the full cluster index. Total item count
across all 12 files (11 clusters + the `bernoulli-binomial` pilot): **~618 items.**
