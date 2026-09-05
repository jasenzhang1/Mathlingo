# Cluster 10 — Hypothesis Testing Machinery

Sampling Distribution → Confidence Interval (9 concepts). Same format as
[Cluster 1](foundations-of-probability.md).

**Scope note.** `sampling-distribution`'s official prerequisite includes `central-limit-theorem`,
which lives in the `multivariate-probability` domain and is out of scope for this probability+statistics
sweep. Its content is folded into `sampling-distribution` directly below rather than assumed — the
CLT's statement is this concept's own central fact, not borrowed machinery.

This cluster carries the two most consequential misinterpretations in applied statistics —
p-values are not P(H₀ true), and a 95% CI is not "95% probability the parameter is in this interval"
— and it deliberately builds toward `hypothesis-test`'s multiple-comparisons item and `power`'s
capstone, both of which require every earlier concept in the cluster at once.

---

## Sampling Distribution (`sampling-distribution`)
*Prereq: Sample Variance, Central Limit Theorem · ancestors 21 · b₀ = 1.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.05 | State the Central Limit Theorem's conclusion about X̄'s sampling distribution for large n. | X̄ is approximately Normal(μ, σ²/n) for large n, **regardless of the population's original shape**, provided it has finite variance | — |
| R2 | recall | mcq | 0.35 | The remarkable, universal part of CLT is that it: | works for *any* population distribution with finite variance | claims CLT "only works if the population is already Normal" — missing the entire point of the theorem → `sampling-distribution` |
| A1 | apply | short-answer | 0.85 | A population is heavily right-skewed. Is X̄'s sampling distribution likely Normal-looking at n=5? At n=200? | at n=5, likely not yet — the original skewness persists strongly for tiny samples; at n=200, much closer to Normal per CLT — the *rate* of convergence depends on how non-normal the population is *(required: both regimes, not just "large n is better")* | — |
| A2 | apply | numeric | 1.0 | A population (shape unspecified) has mean 500, SD 100. For n=100, state X̄'s approximate sampling distribution and use it to approximate P(X̄>520). `[verified: 0.0228]` | X̄ ≈ Normal(500, 100/√100=10); P(X̄>520) = P(Z>2) ≈ 0.0228 — the identical Z=2 tail probability from `normal-distribution`'s A1 in Cluster 4 | forgets to divide σ by √n before standardizing → `sampling-distribution` |
| E1 | explain | short-answer | 1.55 | Explain why CLT is such a practically powerful result — connect to how rarely we actually know a population's true shape. | in real applications the population's shape is almost never known, yet CLT licenses Normal-based methods for the sample mean anyway, as long as n is reasonably large — arguably the single most practically important theorem in applied statistics *(required)* | — |
| E2 | explain | short-answer | 1.7 | Why does the rate of convergence to normality depend on the population's shape? | heavily skewed or heavy-tailed populations need larger n before X̄'s distribution looks convincingly Normal, while an already-symmetric population's X̄ looks Normal almost immediately, even at small n *(required, connecting back to A1)* | — |
| T1 | transfer | short-answer | 2.05 | Customer satisfaction scores are heavily skewed (most 9–10, a long left tail of 1–2s) — clearly not Normal. Is a Normal-based 95% CI for the *true average* score justified with n=500? | yes — CLT applies to the *sampling distribution of X̄*, not to the raw data's distribution; even with heavily skewed individual scores, X̄'s own distribution is close to Normal at n=500, making Normal-based CI methods for the mean valid despite the raw data being nowhere close to Normal itself *(required: explicitly distinguishes the data's distribution from X̄'s distribution)* — the single most common point of confusion about CLT | concludes Normal-based methods are invalid because the raw data isn't Normal → `sampling-distribution` |

*Coverage: 2/2/2/1 — 7 items, 0.05…2.05.*

---

## Standard Error (`standard-error`)
*Prereq: Sampling Distribution · ancestors 22 · b₀ = 1.07*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.07 | Define SE(X̄), distinguishing it clearly from the SD of the raw data. | SE(X̄)=σ/√n is the SD of X̄'s *sampling* distribution — how much X̄ itself varies across repeated samples — not σ itself, the spread of individual data points | — |
| R2 | recall | mcq | 0.37 | When σ is unknown (the usual case), the estimated SE of X̄ is: | s/√n, plugging in the sample SD | uses s with no n-adjustment at all, treating SE as identical to SD → `standard-error` |
| A1 | apply | numeric | 0.87 | A sample of n=64 has s=16. Find the estimated SE of X̄. `[verified: 2]` | SE ≈ 16/√64 = 2 | — |
| A2 | apply | short-answer | 1.0 | "Average commute is 25 minutes (SD=10, n=100)." A reader uses the *full SD* (10) instead of the SE for a margin of error. Compute both and explain the consequence. `[verified: SD=10, SE=1]` | SD=10 describes individual commute-time spread; SE=10/√100=1 describes how much the *sample mean itself* would vary across repeated studies; using 10 instead of 1 makes the resulting interval **ten times too wide**, badly overstating uncertainty about the true average *(required: the explicit 10× factor)* | — |
| E1 | explain | short-answer | 1.57 | Precisely distinguish the two questions SD and SE each answer. | SD answers "how spread out is a typical single data point?"; SE answers "how much would *my estimate of the mean* vary if I repeated this whole study?" — confusing them either drastically overstates or understates the precision of an estimate *(required: both questions stated explicitly)* | — |
| E2 | explain | short-answer | 1.7 | Why does SE shrink as n grows while SD does not? | SE=σ/√n depends on n directly; SD is a fixed property of the population, entirely unrelated to how large a sample happens to be taken — exactly `sample-mean`'s earlier 1/√n scaling result, now named as SE specifically *(required)* | — |
| T1 | transfer | short-answer | 2.07 | A study reports "SD=15 mmHg" from n=1000 patients. A journalist writes "very precise — patients vary by only about 15 points." Is this interpretation of what 15 mmHg *measures* correct? What quantity actually describes the precision of the estimated *average*? `[verified: SE≈0.474]` | the journalist correctly describes individual patient variability (SD), which has nothing to do with sample size or estimation precision; the actual precision of the estimated average is the SE, 15/√1000≈0.47 mmHg — much smaller, reflecting that the average is known very precisely even though individuals vary a lot *(required: computes the actual SE and contrasts it with SD)* | conflates "the study is precise" (about the mean) with "individuals don't vary much" (about SD) → `standard-error` |

*Coverage: 2/2/2/1 — 7 items, 0.07…2.07.*

---

## Test Statistic (`test-statistic`)
*Prereq: Sampling Distribution · ancestors 22 · b₀ = 1.07*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.07 | Define a test statistic, emphasizing its purpose. | a number computed from sample data, constructed to have a *known* distribution when a specific (usually null) hypothesis is true — used to measure how unusual the data would be under that hypothesis | — |
| R2 | recall | mcq | 0.37 | For H₀: μ=μ₀, Z=(X̄−μ₀)/SE measures: | how many standard errors X̄ is from the hypothesized value μ₀ | reads Z as "how far X̄ is from zero," ignoring μ₀ entirely → `test-statistic` |
| A1 | apply | numeric | 0.87 | X̄=52, SE=2, H₀ claims μ₀=50. Compute Z. `[verified: 1]` | Z=(52−50)/2=1 | — |
| A2 | apply | numeric | 1.0 | Same setup with X̄=58. Compute Z, and compare its evidential weight against A1's. `[verified: 4]` | Z=(58−50)/2=4 — far larger than A1's Z=1, indicating data much less consistent with the null (Z=4 is extremely rare under standard normal) *(required: the comparative statement, not just the number)* | — |
| E1 | explain | short-answer | 1.57 | Why standardize (divide by SE) rather than use the raw difference X̄−μ₀ directly? | a raw difference of "2 units" means something different depending on how precisely X̄ is estimated (i.e. on SE); standardizing puts the difference in universal units (standard errors), comparable against a known reference distribution regardless of the original measurement's units or precision *(required)* | — |
| E2 | explain | short-answer | 1.7 | State the full logical chain connecting a test statistic's value to "evidence against H₀." | the test statistic's distribution under H₀ is known; an observed value in a region that would be very unlikely under that known distribution is treated as evidence against H₀ — this compute/compare/judge structure is the entire mechanical core of hypothesis testing, foreshadowing `rejection-region` and `p-value` directly *(required)* | — |
| T1 | transfer | short-answer | 2.07 | Two entirely different studies (different claims, sample means, SEs, units) both produce Z=0.3. Explain why both represent "similarly weak evidence" despite the very different raw numbers involved. | standardization (E1) is exactly what makes this possible — both Z values are measured in the same universal units (SEs from the hypothesized value), referenced against the same standard normal distribution, so Z=0.3 represents the same *degree* of surprise regardless of the wildly different raw quantities behind each case *(required)* | — |

*Coverage: 2/2/2/1 — 7 items, 0.07…2.07.*

---

## Rejection Region (`rejection-region`)
*Prereq: Test Statistic · ancestors 23 · b₀ = 1.09*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.09 | Define the rejection region, and what determines its boundary. | the set of test-statistic values for which H₀ is rejected; its boundary (critical value) is set by the chosen significance level α and by whether the test is one- or two-tailed | — |
| R2 | recall | mcq | 0.39 | For a two-tailed Z-test at α=0.05, the rejection region is: | \|Z\| > 1.96 | picks Z>1.645 — the one-tailed critical value, applied to a two-tailed test → `rejection-region` |
| A1 | apply | short-answer | 0.89 | For a one-tailed test (H₀:μ≤μ₀ vs H₁:μ>μ₀) at α=0.05, state the rejection region. | Z > 1.645 — all of α's mass in one tail, rather than split 0.025/0.025 | uses the two-tailed critical value 1.96 for a one-tailed test → `rejection-region` |
| A2 | apply | numeric | 1.0 | From `test-statistic`'s A2 (Z=4), using the two-tailed rejection region \|Z\|>1.96 at α=0.05, is H₀ rejected? `[verified: yes]` | yes — \|4\|=4 > 1.96, clearly inside the rejection region | — |
| E1 | explain | short-answer | 1.59 | Why must α (and hence the rejection region) be fixed *before* looking at the data? What goes wrong if a researcher picks the boundary after computing their result to make it "significant"? | this is a form of p-hacking/data-dredging — the test's actual guaranteed error rate is α only if the threshold was fixed in advance; choosing it after seeing the data means effectively searching for a threshold that "works," which inflates the true false-rejection rate far above the nominal α *(required)* | — |
| E2 | explain | short-answer | 1.75 | Why is a one-tailed rejection region more powerful for detecting an effect in a specific direction, but only valid when there's a genuine, pre-specified reason to rule out the other direction? | putting all of α in one tail lowers the critical value needed for that direction, increasing sensitivity to it — but this is legitimate only if the other direction was ruled out *before* seeing the data on genuine substantive grounds, not chosen for convenience *(required: names the pre-specification requirement)* | — |
| T1 | transfer | short-answer | 2.09 | A researcher gets a two-tailed p=0.06 (narrowly non-significant), then switches to a one-tailed test on the same data, getting p=0.03 ("significant"), justified by "I always expected this direction." Why is this switch, done *after* seeing the result, a serious problem — even though a genuinely pre-registered one-tailed test would have been fine? | switching test types after seeing the near-miss result is p-hacking — the decision to use a one-tailed test must be made and justified *before* seeing the data; doing it retroactively because it produces the desired outcome inflates the true false-positive rate far above 0.05, exactly the mechanism E1 warned about *(required: names the after-the-fact timing as the actual problem, not the one-tailed test itself)* | argues the one-tailed test is legitimate because "the direction really was expected" without acknowledging the after-the-fact timing problem → `rejection-region` |

*Coverage: 2/2/2/1 — 7 items, 0.09…2.09.*

---

## Hypothesis Test (`hypothesis-test`)
*Prereq: Rejection Region · ancestors 24 · b₀ = 1.11*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.11 | List the basic steps of a hypothesis test. | (1) state H₀, H₁ (2) choose α (3) compute the test statistic (4) determine the rejection region / p-value (5) decide and interpret in context | — |
| R2 | recall | mcq | 0.41 | "Failing to reject H₀" means: | there wasn't enough evidence in this sample to conclude H₀ is false — but H₀ could still be false | treats failing to reject as "H₀ has been proven true" — the central, most commonly violated interpretive point in hypothesis testing → `hypothesis-test` |
| A1 | apply | short-answer | 0.91 | A drug trial fails to reject H₀ (no effect) at α=0.05. A headline claims "Study PROVES the drug doesn't work." Critique this using R2. | wrong — failing to reject doesn't prove no effect; it could mean the drug genuinely has none, or the sample was too small to detect a real but modest effect (a Type II error possibility) — "no evidence of an effect" ≠ "evidence of no effect" *(required)* | — |
| A2 | apply | short-answer | 1.0 | State H₀ and H₁ for testing whether a coin is biased *toward heads specifically* (not just "biased"). | H₀: p=0.5; H₁: p>0.5 — a one-sided alternative, since the question specifically concerns bias toward heads, connecting directly to `rejection-region`'s one/two-tailed distinction | states a two-sided H₁ (p≠0.5) despite the question specifying a direction → `hypothesis-test` |
| E1 | explain | short-answer | 1.61 | Why is H₀ typically the "no effect / status quo" hypothesis rather than the researcher's actual hypothesis of interest? | the procedure assumes H₀ and asks whether the data would be surprising under it — this only works if H₀ is specific enough to compute an exact sampling distribution from (which "no effect" usually is, a single value); "there is *some* effect" is typically too vague — an entire range of possible effect sizes — to yield one sampling distribution *(required)* | — |
| E2 | explain | short-answer | 1.75 | Narrate the full logical chain of a hypothesis test, integrating test statistic, rejection region, and decision. | compute a test statistic with a known distribution under H₀; check whether it falls in a *pre-specified* rejection region; if so, treat the data as sufficiently inconsistent with H₀ to reject it, while acknowledging this conclusion could still be wrong with controlled probability α *(required: the chain must connect coherently end to end)* | — |
| T1 | transfer | short-answer | 2.11 | A company runs 20 separate α=0.05 tests looking for *any* significant side effect among 20 outcomes, finds one significant hit, and announces "we found a significant side effect." Why is this misleading, even if every null hypothesis is actually true? `[verified: 1−0.95²⁰≈0.64]` | if all 20 nulls are true, P(at least one false positive across 20 independent tests) = 1−0.95²⁰ ≈ **64%**, not the nominal 5% — reporting only the one "hit" while ignoring the other 19 badly misrepresents the actual evidence *(required: the explicit 64% computation)* — the multiple-comparisons problem, and directly reachable via `pie-boole`'s Boole's inequality as a (looser, 100%-capped) bound | assumes each test's 5% rate applies unchanged to the batch of 20 → `hypothesis-test` |

*Coverage: 2/2/2/1 — 7 items, 0.11…2.11.*

---

## Type I and Type II Error (`type-i-ii-error`)
*Prereq: Hypothesis Test · ancestors 25 · b₀ = 1.13*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.13 | Define Type I and Type II error, with their associated probabilities. | Type I: rejecting a *true* H₀ (false positive), probability α; Type II: failing to reject a *false* H₀ (false negative), probability β | — |
| R2 | recall | mcq | 0.43 | For fixed sample size, decreasing α generally: | increases β | assumes decreasing α is unambiguously "safer," missing the tradeoff with β entirely → `type-i-ii-error` |
| A1 | apply | short-answer | 0.93 | In a criminal trial analogy (H₀=innocent), what do a Type I and a Type II error each correspond to? | Type I: convicting an innocent person; Type II: acquitting a guilty person | — |
| A2 | apply | short-answer | 1.05 | A company sets α=0.01 (very strict) for a quality-control defect test. What's the likely consequence for detecting genuine defects? | with such a strict α, β (missing a genuine defect) will be higher than with a more lenient α — the company has traded fewer false alarms for more missed real defects *(required: names the tradeoff explicitly, using R2)* | — |
| E1 | explain | short-answer | 1.63 | Why does decreasing α tend to increase β? Use the rejection-region mechanism. | shrinking the rejection region (to reduce false rejections under a true H₀) simultaneously makes it *harder* to reject H₀ even when H₁ is actually true, mechanically increasing the Type II error rate — a "shrinking a region grows its complement's failure mode" argument, not just a restated tradeoff *(required)* | — |
| E2 | explain | short-answer | 1.78 | Why should the choice of which error to prioritize depend on real-world consequences? Contrast a smoke detector with a spam filter. | a smoke detector should tolerate more Type I errors (false alarms) because a Type II error (missed real fire) is catastrophic; a spam filter's Type I error (flagging a legitimate email as spam) is often considered worse than its Type II error (letting spam through), since missing an important email costs most users more *(required: both contrasting examples, with the direction of preference justified)* | assumes one error type is universally "worse" across all applications → `type-i-ii-error` |
| T1 | transfer | short-answer | 2.13 | For COVID testing (H₀="patient does not have the disease"), describe Type I and Type II errors specifically, and explain why public health authorities during a pandemic might deliberately accept a *higher* Type I rate for a *lower* Type II rate — contrary to the usual α=0.05 convention. | Type I: telling a healthy person they're infected (unnecessary quarantine, anxiety); Type II: telling an infected person they're healthy (continued spread of a contagious disease) — during a pandemic, a missed case (Type II) is often judged far more costly to society than an unnecessary quarantine (Type I), justifying a deliberate shift away from the conventional default *(required: both error definitions specific to this context, plus the direction-and-reason for the shift)* | applies the academic α=0.05 default uncritically without considering the asymmetric real-world costs → `type-i-ii-error` |

*Coverage: 2/2/2/1 — 7 items, 0.13…2.13.*

---

## Power (`power`)
*Prereq: Type I and Type II Error · ancestors 26 · b₀ = 1.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.15 | Define statistical power. | Power = 1−β = P(correctly rejecting H₀ \| H₁ is true) — the probability of detecting a real effect when one exists | — |
| R2 | recall | mcq | 0.45 | Which increases power, all else equal? | a larger sample size | picks "a smaller true effect size" — backwards; smaller effects are *harder* to detect → `power` |
| A1 | apply | short-answer | 0.95 | A study with 40% power finds a non-significant result. Is this strong evidence the effect doesn't exist? | no — even if the true effect is real, there's a 60% chance (β=0.6) the study fails to detect it purely from low power; a non-significant result from an underpowered study is only weak evidence against the effect *(required)* | treats any non-significant result as equally strong evidence against an effect, regardless of the study's power → `power` |
| A2 | apply | short-answer | 1.1 | A study currently has 55% power but the researcher wants 80%. Should n increase or decrease, and why? | increase — larger n directly increases power (R2); a formal power analysis would compute the specific n needed to reach exactly 80% for this effect size | — |
| E1 | explain | short-answer | 1.65 | Using the same rejection-region-shrinking logic as `type-i-ii-error`'s E1 (now reversed), explain why *increasing* α increases power. | increasing α *grows* the rejection region, making it easier to reject H₀ whenever H₁ is actually true — at the direct cost of more false rejections when H₀ is true; this completes the α/β/power triangle from the previous two concepts *(required: explicitly the mirror-image argument of the earlier item)* | — |
| E2 | explain | short-answer | 1.8 | Why does a larger true effect size increase power, with no change to n or α? | the test statistic's sampling distributions under H₀ and under the specific H₁ overlap *less* when the true effect is larger, making it easier to distinguish the two from a given sample *(required: the overlap/distinguishability mechanism)* | — |
| T1 | transfer | short-answer | 2.15 | A trial with only 30 of a recommended 500 patients finds no significant drug effect. A competitor claims this proves the drug doesn't work. Critique this using `hypothesis-test`, `type-i-ii-error`, and `power` together. | failing to reject H₀ never proves it true (`hypothesis-test`); with only 30 of 500 recommended patients, the study almost certainly had very low power to detect the expected effect size, making a Type II error highly likely regardless of whether the drug actually works; the claim conflates "no significant evidence found" with "evidence of no effect," compounded by a design unlikely to detect a real effect even if one existed *(required: draws on all three concepts explicitly, not just one)* | critiques the trial on only one of the three grounds (e.g. sample size alone, without the "fail to reject ≠ proof" point) → `power` |

*Coverage: 2/2/2/1 — 7 items, 0.15…2.15. T1 is a deliberate capstone requiring the whole error-rate sub-arc at once.*

---

## P-Value (`p-value`)
*Prereq: Hypothesis Test · ancestors 25 · b₀ = 1.13*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.13 | Define the p-value precisely. | P(test statistic as extreme or more extreme than observed \| H₀ is true) — a probability computed *assuming* H₀ | — |
| R2 | recall | mcq | 0.43 | The p-value is: | the probability of the data (or more extreme), given H₀ is true | picks "the probability H₀ is true" — arguably the single most important misconception in this entire bank → `p-value` |
| A1 | apply | numeric | 0.93 | A two-tailed Z-test gives Z=2.5. Find the p-value. `[verified: 0.0124]` | p = 2·P(Z>2.5) ≈ 0.0124 | forgets to double the one-tailed probability for a two-tailed test → `p-value` |
| A2 | apply | short-answer | 1.05 | At α=0.05, using A1's p≈0.0124, is H₀ rejected? Confirm this matches the rejection-region approach for Z=2.5. `[verified: consistent, |2.5|>1.96]` | reject, since p=0.0124<0.05; and \|2.5\|=2.5>1.96, so the rejection-region approach agrees — confirming the two methods are equivalent | — |
| E1 | explain | short-answer | 1.63 | Explain precisely why "the p-value is the probability H₀ is true" is wrong, using the actual definition. | the p-value is computed by *assuming* H₀ from the start — it's a probability conditional *on* H₀ — so it cannot simultaneously mean "the probability H₀ is true," which would require a posterior probability via Bayes' rule with a prior on H₀ *(required: the explicit conditional-direction argument)* — the same category error `likelihood-vs-probability` warned about earlier | — |
| E2 | explain | short-answer | 1.78 | Why do the p-value and rejection-region approaches always give the identical decision at a given α? | "test statistic in the rejection region" and "p-value < α" are logically equivalent statements — both say the observed data is among the most extreme α-fraction of outcomes possible under H₀ *(required)* | — |
| T1 | transfer | short-answer | 2.13 | A study reports p=0.03 for a new teaching method. A teacher tells colleagues "this means there's a 97% chance the method actually works." Why is this a misinterpretation? | p=0.03 means: if the method had no real effect, there'd be only a 3% chance of seeing data this extreme by chance — it says nothing directly about the probability the method works, which would require Bayesian reasoning with a prior the calculation never used *(required: connects to the actual definition, not just "that's wrong")* — the single most consequential statistical misinterpretation in practice | restates the teacher's claim as "basically correct, just imprecisely worded" → `p-value` |

*Coverage: 2/2/2/1 — 7 items, 0.13…2.13.*

---

## Confidence Interval (`confidence-interval`)
*Prereq: Standard Error · ancestors 23 · b₀ = 1.09*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.09 | State the general CI formula, and what "95% confidence" correctly means. | X̄ ± (critical value)·SE; "95% confidence" describes the *procedure*: if repeated across many samples, about 95% of the resulting intervals would contain the true parameter — not a probability statement about one specific interval | — |
| R2 | recall | mcq | 0.39 | For a 95% CI [45,55], the correct interpretation is: | if this sampling procedure were repeated many times, about 95% of the resulting intervals would contain the true parameter | picks "there's a 95% probability the true parameter is between 45 and 55" — the central, defining subtlety this whole concept exists to correct → `confidence-interval` |
| A1 | apply | numeric | 0.89 | X̄=50, SE=2. Construct an approximate 95% CI using critical value 1.96. `[verified: [46.08, 53.92]]` | 50 ± 1.96(2) = [46.08, 53.92] | — |
| A2 | apply | short-answer | 1.0 | A 95% CI for a drug's effect is [−2, 8], which includes 0. What does this say about rejecting H₀:effect=0 at α=0.05? | fail to reject — since the CI includes 0, the equivalent hypothesis test would not reject H₀ at this α *(required: uses the CI-test equivalence, not a fresh calculation)* | — |
| E1 | explain | short-answer | 1.59 | Why does a 95% CI excluding μ₀ correspond exactly to rejecting H₀:μ=μ₀ at α=0.05? | both procedures are built from the same test-statistic/rejection-region logic, algebraically rearranged — both ultimately ask "is μ₀ more than (critical value)×SE away from X̄?", just phrased as an interval containing/excluding a value versus a statistic falling in/out of a region *(required: the shared underlying question, not just "they happen to agree")* | — |
| E2 | explain | short-answer | 1.75 | Why is it technically wrong (in the frequentist framework) to say "there's a 95% probability the true parameter is in this specific, already-computed interval"? | the true parameter is a fixed, unknown number, not a random variable, in this framework — once the interval is computed, the parameter either is or isn't in it (probability 1 or 0, just unknown which); "95%" describes the *method's* reliability across hypothetical repetitions, not a probability statement about this one fixed interval *(required: the fixed-parameter argument specifically)* | — |
| T1 | transfer | short-answer | 2.09 | A poll reports "52% support, 95% CI [48%, 56%]." A commentator says "there's a 95% chance the true support is between 48% and 56%." What's wrong, and what's the correct interpretation? | this is exactly R2/E2's misinterpretation, applied to its most common real-world venue; the correct statement: the *procedure* used to generate such intervals would capture the true support level in about 95% of hypothetical repeated polls — not that this specific interval has a 95% probability of containing it *(required: restates the correct procedural interpretation explicitly)*; worth noting Bayesian credible intervals *do* support the more intuitive reading, which is part of why this confusion is so persistent | restates the commentator's claim as basically fine, just informally phrased → `confidence-interval` |

*Coverage: 2/2/2/1 — 7 items, 0.09…2.09.*

---

## Cluster 10 misconception index

| Tag | Blame |
|---|---|
| Normal-based methods rejected because raw data isn't Normal | `sampling-distribution` |
| SD and SE conflated in either direction | `standard-error` |
| test-statistic standardization purpose missed | `test-statistic` |
| one-/two-tailed critical values swapped, or test type switched post hoc | `rejection-region` |
| "fail to reject" read as "proven true" | `hypothesis-test` |
| multiple-comparisons inflation ignored | `hypothesis-test` |
| α/β tradeoff treated as one-directional ("lower is always better") | `type-i-ii-error` |
| low-power non-significance treated as evidence of no effect | `power` |
| **p-value read as P(H₀ true)** | `p-value` |
| **95% CI read as a probability statement about one fixed interval** | `confidence-interval` |

**Cluster total: 63 items across 9 concepts.** All numeric claims verified, including the exact
multiple-comparisons inflation figure (1−0.95²⁰≈64%) and the two-tailed p-value at Z=2.5. This cluster
carries the two most consequential misreadings in all of applied statistics, and both get dedicated,
unambiguous treatment: `p-value`'s R2/T1 and `confidence-interval`'s R2/E2/T1.
