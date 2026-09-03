# Cluster 3 — Discrete Distributions

Poisson, Hypergeometric, Geometric, Negative Binomial (4 concepts). Bernoulli and Binomial are the
pilot file, [`bernoulli-binomial.md`](bernoulli-binomial.md); this cluster is everything downstream of
it in the discrete-distributions branch. Same format as [Cluster 1](foundations-of-probability.md).

Every "why can't this be modeled as..." item here deliberately extends the free-throw question from
the pilot file — a real-world process that resembles the distribution's shape but breaks one of its
defining assumptions, with the mechanism named, not just asserted.

---

## Poisson Distribution (`poisson-distribution`)
*Prereq: Bernoulli and Binomial Distributions · ancestors 16 · b₀ = 0.92*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.08 | State the PMF of Poisson(λ) and what λ represents. | P(X=k) = e⁻ᵠλᵏ/k!, k=0,1,2,…; λ is both the mean rate and the mean count | — |
| R2 | recall | mcq | 0.25 | For Poisson(λ), Var(X) equals: | λ — the distinctive fact that mean and variance coincide | picks λ², assuming variance generically scales as the mean squared → `poisson-distribution` |
| A1 | apply | numeric | 0.72 | A call center gets 4 calls/minute on average (Poisson). Find P(exactly 2 calls in a given minute). `[verified: 0.1465]` | e⁻⁴·4²/2! ≈ 0.1465 | — |
| A2 | apply | numeric | 0.85 | Same center, find P(at least 1 call in a 30-second window). `[verified: 0.8647]` | rate over 30s is 2 (half of 4/min); P(≥1) = 1−e⁻² ≈ 0.8647 | forgets to rescale λ to the shorter window and uses λ=4 → `poisson-distribution` |
| E1 | explain | derivation | 1.42 | Derive the Poisson PMF as the n→∞, p→0, np=λ (fixed) limit of Binomial(n,p). | C(n,k)pᵏ(1−p)ⁿ⁻ᵏ with p=λ/n: expand C(n,k)(λ/n)ᵏ(1−λ/n)ⁿ⁻ᵏ, take the limit term-by-term — n(n−1)⋯(n−k+1)/nᵏ → 1, (1−λ/n)ⁿ → e⁻ᵠ, (1−λ/n)⁻ᵏ → 1, leaving λᵏ/k! · e⁻ᵠ *(required: each of the three limits addressed, not just the conclusion)* | — |
| E2 | explain | derivation | 1.6 | Show directly (by convolution, not MGF) that if X~Poisson(λ), Y~Poisson(μ) independent, then X+Y ~ Poisson(λ+μ). | P(X+Y=n) = Σₖ P(X=k)P(Y=n−k) = e⁻⁽ᵠ⁺ᵘ⁾/n! · Σₖ C(n,k)λᵏμⁿ⁻ᵏ = e⁻⁽ᵠ⁺ᵘ⁾(λ+μ)ⁿ/n! by the binomial theorem `[verified for λ=3,μ=5,n=2: both sides give 0.010735]` *(required: the binomial-theorem step must be identified explicitly)* — a genuine payoff of the prerequisite closure, since `binomial-theorem` is an ancestor via `bernoulli-binomial` | — |
| T1 | transfer | short-answer | 1.92 | *Why can't earthquake counts in a region over a decade be modeled as Poisson*, even though "rare event count over an interval" sounds exactly like the Poisson setup? Hint: think about aftershocks. | an earthquake makes another earthquake *more likely* in the near future (aftershocks) — this breaks the constant-rate, independent-increments structure a Poisson process requires; the true process is *self-exciting*, and naively fitting Poisson would understate the true clustering and variance | says "earthquakes aren't rare enough" rather than identifying the dependence mechanism → `poisson-distribution` |
| T2 | transfer | short-answer | 1.92 | Give three real-world Poisson counts, naming the rate λ and the interval for each. Then give one counting scenario that looks Poisson-shaped but isn't, and say which assumption fails. | strong examples: typos per page (λ per page); radioactive decays per second; website hits per minute. Non-example candidates: server crashes clustered right after a bad deploy (rate isn't constant in time); customer arrivals with a lunchtime rush (rate varies — a non-homogeneous, not violated, Poisson process is the fix, worth a bonus note) | gives a non-example that's actually fine (constant-rate, independent) because the underlying assumption wasn't examined → `poisson-distribution` |

*Coverage: 2/2/2/2 — 8 items, −0.08…1.92.*

---

## Hypergeometric Distribution (`hypergeometric-distribution`)
*Prereq: Counting Methods, Variance · ancestors 12 · b₀ = 0.78*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.22 | State the PMF of Hypergeometric(N, K, n) and what each parameter means. | P(X=k) = C(K,k)C(N−K,n−k)/C(N,n); N = population, K = successes in population, n = draws (without replacement) | — |
| R2 | recall | mcq | 0.0 | The essential difference between Hypergeometric and Binomial is: | Hypergeometric draws are *without replacement*, so trials are dependent and the success probability shifts after each draw | picks "Hypergeometric assumes constant probability of success across draws" — exactly backwards → `hypergeometric-distribution` |
| A1 | apply | numeric | 0.58 | A 52-card deck has 13 hearts. Draw 5 cards without replacement. Find P(exactly 2 hearts). `[verified: 0.2743]` | C(13,2)C(39,3)/C(52,5) ≈ 0.2743 | uses the *binomial* pmf with p=13/52 instead → `hypergeometric-distribution` |
| A2 | apply | numeric | 0.7 | A shipment of 50 items has 5 defective. Inspect 10 without replacement. Find E[number defective], and compare it to what Binomial(10, 5/50) predicts. `[verified: both give 1]` | E[X] = n·K/N = 10·5/50 = 1 — *identical* to the binomial mean np = 1. Required: notices the means agree exactly even though the distributions differ | assumes the means must differ because the distributions differ → `hypergeometric-distribution` |
| E1 | explain | derivation | 1.28 | Derive E[X] = nK/N using indicator variables Iᵢ = 1{draw i is a success}, *without* assuming the draws are independent. | by symmetry, each draw is marginally a success with probability K/N (even though draws are dependent on each other), so E[Iᵢ] = K/N for every i; linearity of expectation needs no independence, so E[X] = ΣE[Iᵢ] = nK/N *(required: explicitly notes linearity doesn't require independence — this is the point of the exercise)* | assumes linearity requires independence and tries to argue independence first → `mutual-independence` |
| E2 | explain | short-answer | 1.5 | Why is Var(Hypergeometric) *smaller* than the matching Binomial's variance (same n, p=K/N)? | sampling without replacement is *negatively* correlated draw-to-draw — seeing a success depletes the remaining pool of successes, making the next draw less likely to succeed — and this negative correlation reduces the total variance; the finite population correction (N−n)/(N−1) < 1 encodes exactly this, and → 1 as N grows large relative to n *(required: names the negative correlation mechanism, not just "there's a correction factor")* `[verified: N=50,K=5,n=10 gives Var_binom=0.90 vs Var_hyper=0.7347]` | — |
| T1 | transfer | short-answer | 1.78 | You draw 5 cards from a deck and count hearts — why isn't this Binomial(5, 0.25)? Now: you sample 1000 voters from a city of 500,000 and count supporters — why is a Binomial approximation fine there? *(This question first appeared, marked ⚠, in the Bernoulli/Binomial pilot file — it belongs here.)* | small population: p genuinely shifts after each draw (5/52, then 4/51 or 5/51, …); large population: n/N ≈ 0.002 makes the shift negligible — the usual rule of thumb is n < 10% of N, which is exactly E2's correction factor approaching 1 | applies the 10%-rule as a hard cutoff rather than understanding it traces to the correction factor shrinking continuously → `hypergeometric-distribution` |
| T2 | transfer | short-answer | 1.78 | *Why can't* the number of aces in your 5-card poker hand and the number of aces in your opponent's 5-card hand (same deck, dealt after yours) be modeled as two *independent* Hypergeometric(52,4,5) draws? Hint: think about what your hand tells you about what's left. | your hand changes the remaining deck's composition — 47 cards left with 4 minus (aces in your hand) aces remaining — so the opponent's draw is Hypergeometric on a *different, dependent* population, not an independent copy of your draw's distribution | treats "both draws are Hypergeometric" as meaning "both draws are independent" → `hypergeometric-distribution` |

*Coverage: 2/2/2/2 — 8 items, −0.22…1.78.*

---

## Geometric Distribution (`geometric-distribution`)
*Prereq: Bernoulli and Binomial Distributions · ancestors 16 · b₀ = 0.92*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.08 | State the PMF of Geometric(p) under the "number of trials until first success" convention. | P(X=k) = (1−p)ᵏ⁻¹p, k=1,2,3,… | — |
| R2 | recall | mcq | 0.15 | There are two conventions — counting the trial of first success (range starts at 1) or counting failures before it (range starts at 0). Which quantity is the *same* under both? | Var(X) — shifting a random variable by a constant never changes its variance, per `variance`'s shift-invariance | picks E[X], not noticing the two means (1/p vs (1−p)/p) genuinely differ by exactly the shift → `geometric-distribution` |
| A1 | apply | numeric | 0.72 | A sales rep closes a deal on each independent call with probability 0.15. Find P(the first sale happens on exactly the 5th call). `[verified: 0.0783]` | (0.85)⁴(0.15) ≈ 0.0783 | uses (0.85)⁵ · 0.15 — off-by-one on the exponent → `geometric-distribution` |
| A2 | apply | numeric | 0.9 | Same rep: find E[calls until first sale] and P(it takes more than 10 calls). `[verified: E=6.667, P=0.1969]` | E[X]=1/0.15≈6.667; P(X>10)=(0.85)¹⁰≈0.1969 | — |
| E1 | explain | derivation | 1.42 | Prove the memoryless property: P(X>m+n \| X>m) = P(X>n). | first show P(X>k)=(1−p)ᵏ (no success in k trials); then P(X>m+n\|X>m) = (1−p)ᵐ⁺ⁿ/(1−p)ᵐ = (1−p)ⁿ = P(X>n) *(required: derives P(X>k) rather than asserting it)* | — |
| E2 | explain | short-answer | 1.65 | Explain *why* the geometric distribution is memoryless, in terms of what independence actually means — not just by citing the algebra in E1. | each trial is independent of every past trial, so having already failed m times carries *no information* about future trials — the "clock resets" precisely because failures are uninformative under `mutual-independence` *(required)* | — |
| T1 | transfer | short-answer | 1.92 | A gambler who has missed 5 free throws in a row says "a geometric model says I'm due — my chance of making one within the next 2 throws must be higher now than it was fresh." Under a *true* Geometric(p) model, is this right? What does memorylessness actually say — and why might real free-throw shooting not be geometric at all (tying back to the Bernoulli/Binomial pilot's confidence argument)? | under a true geometric model: **no** — memorylessness means P(make within next 2) is *exactly* the same as it was before any misses; this is the gambler's fallacy restated in geometric language. Real shooting likely isn't geometric for the same reason it isn't Binomial(2,p): makes and misses are plausibly correlated with confidence and rhythm, which memorylessness (and independence) explicitly rules out | agrees the gambler is right under the geometric model → `geometric-distribution`; or, correctly rejects the gambler's math but doesn't connect it to the earlier independence violation → misses the required synthesis |

*Coverage: 2/2/2/1 — 7 items, −0.08…1.92. T1 deliberately closes the loop back to the pilot file's free-throw question.*

---

## Negative Binomial Distribution (`negative-binomial-distribution`)
*Prereq: Geometric Distribution · ancestors 17 · b₀ = 0.95*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.05 | State the PMF of NegativeBinomial(r, p) (trials-until-r-th-success convention), and explain the C(k−1, r−1) term combinatorially. | P(X=k) = C(k−1,r−1)pʳ(1−p)ᵏ⁻ʳ; the term counts arrangements of r−1 successes among the *first* k−1 trials, since the k-th trial is forced to be the r-th success | — |
| R2 | recall | mcq | 0.2 | NegativeBinomial(r=1, p) is exactly: | Geometric(p) | picks Binomial(1,p) — confuses "one success" with "one trial" → `negative-binomial-distribution` |
| A1 | apply | numeric | 0.75 | A biologist needs 3 successful captures; each attempt succeeds independently with probability 0.2. Find P(the 3rd capture happens on exactly the 10th attempt). `[verified: 0.0604]` | C(9,2)(0.2)³(0.8)⁷ ≈ 0.0604 | uses C(10,3) instead of C(9,2), not fixing the last trial as a forced success → `negative-binomial-distribution` |
| A2 | apply | numeric | 0.9 | Same setup: find E[attempts for 3 captures] and Var. `[verified: E=15, Var=60]` | E[X]=r/p=15; Var(X)=r(1−p)/p²=60 | — |
| E1 | explain | derivation | 1.45 | Show NegativeBinomial(r,p) is the sum of r iid Geometric(p) waiting times, using the trial-sequence interpretation directly (no MGFs). | the trials-to-1st-success, plus trials-to-2nd-success-after-the-1st, plus … r such gaps are each Geometric(p) by memorylessness (each gap "restarts fresh" after the previous success, per `geometric-distribution`'s E1/E2), and their sum is exactly the total trials to the r-th success *(required: explicitly invokes memorylessness as what licenses treating each gap as a fresh, independent Geometric)* | — |
| E2 | explain | short-answer | 1.7 | Why is it C(k−1, r−1) and not C(k, r)? | the k-th (final) trial is *forced* to be a success — that's what stops the process — so only the first k−1 trials are free, and only r−1 successes need to be placed among them *(required)* | — |
| T1 | transfer | short-answer | 1.95 | Give a real process better modeled by Negative Binomial than Binomial (hint: a stopping rule based on successes, not a fixed trial count — e.g. a VC fund investing until it has 5 successful exits). Then: why is it wrong to "fix" n at its average value r/p and just use Binomial(r/p, p) instead? | good examples: keep inspecting until k defects are found; recruit patients until 20 complete a trial protocol. The Binomial-with-averaged-n approximation is wrong because **the number of trials is itself the random quantity being modeled** — plugging in its mean as a fixed n discards the genuine variability in *when* the process stops (Var = r(1−p)/p², a real feature of the process), and conflates a random stopping time with a deterministic sample size | proposes averaging n as a reasonable simplification without noticing n is the object of interest, not a nuisance parameter → `negative-binomial-distribution` — and this is the same "fixed n" condition first raised for `bernoulli-binomial` (R2 of the foundations cluster), now seen failing in the other direction |

*Coverage: 2/2/2/1 — 7 items, −0.05…1.95.*

---

## Cluster 3 misconception index

| Tag | Blame |
|---|---|
| Var(Poisson) assumed to be λ² | `poisson-distribution` |
| forgetting to rescale λ to a sub-interval | `poisson-distribution` |
| Hypergeometric/Binomial pmf swap | `hypergeometric-distribution` |
| assuming linearity of expectation needs independence | `mutual-independence` |
| off-by-one in Geometric's exponent | `geometric-distribution` |
| gambler's fallacy re-appearing under memorylessness | `geometric-distribution` |
| C(k,r) vs C(k−1,r−1) in Negative Binomial | `negative-binomial-distribution` |
| averaging a random stopping time into a fixed Binomial n | `negative-binomial-distribution` (mirrors `bernoulli-binomial`'s fixed-n condition) |

**Cluster total: 30 items across 4 concepts.** All numeric claims verified by script, including the
Poisson-sum convolution identity checked against a direct binomial-theorem expansion. Every
"why can't..." transfer item names a concrete mechanism (aftershock clustering, deck depletion,
confidence/rhythm, random stopping time) rather than asserting the model fails in the abstract — the
standard this cluster was built to meet, set by the pilot file's free-throw question.
