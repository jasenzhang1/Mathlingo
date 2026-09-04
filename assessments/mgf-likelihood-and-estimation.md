# Cluster 6 — MGF, Likelihood & Estimation

MGF → Exponential Family (8 concepts). Same format as [Cluster 1](foundations-of-probability.md).

This cluster closes several loops opened earlier in the bank on purpose: `mgf-properties`' T1
re-derives the very first pilot file's core fact (sum of iid Bernoullis is Binomial) via MGF-matching
instead of combinatorics; `mle`'s T1 and `exponential-family`'s E1 both turn on the same surprising
fact about Uniform(0,θ); and `distribution-transformations`' E1 makes explicit that Cluster 4's Normal
standardization proof was secretly a special case of this cluster's general theorem, proved before the
theorem existed.

---

## Moment Generating Function (`mgf`)
*Prereq: Expectation · ancestors 10 · b₀ = 0.70*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.3 | Define M_X(t) = E[e^{tX}], and state what M_X(0) always equals. | M_X(0) = E[e⁰] = E[1] = 1, for *every* distribution | — |
| R2 | recall | mcq | 0.0 | M_X′(0) equals: | E[X] | picks Var(X) — conflating the first derivative with the second → `mgf` |
| A1 | apply | short-answer | 0.5 | X = 1 with probability p, 0 with probability 1−p. Find M_X(t) directly from the definition. `[verified: M(0)=1]` | M(t) = (1−p)e⁰ + pe^t = (1−p) + pe^t; check M(0)=(1−p)+p=1 ✓ | — |
| A2 | apply | numeric | 0.65 | Using A1's MGF, differentiate to recover E[X] and check it matches p. `[verified]` | M′(t) = pe^t; M′(0) = p = E[X], matching directly | — |
| E1 | explain | derivation | 1.2 | Derive M_X^{(k)}(0) = E[X^k] — the k-th derivative at 0 gives the k-th raw moment. | differentiating e^{tX} k times with respect to t gives X^k e^{tX}; evaluating at t=0 leaves X^k; taking E[·] gives E[X^k] *(required: the differentiate-then-evaluate-then-expect chain, not just the stated result)* | — |
| E2 | explain | short-answer | 1.4 | Explain why the MGF, when it exists in an interval around 0, uniquely determines the distribution — and why that makes it a useful *proof tool*. | the uniqueness theorem: two distributions with matching MGFs (on a common interval containing 0) are the same distribution; this means showing two MGFs match is *sufficient* to prove two random variables have the same distribution, without ever comparing pmfs or pdfs directly *(required)* | — |
| T1 | transfer | short-answer | 1.7 | Why is the MGF sometimes called a distribution's "fingerprint"? Give a scenario where comparing two MGFs is easier than comparing two pmfs or pdfs directly. | sums of independent random variables, and distributions defined only as limits, are both cases where algebra on MGFs (multiplying, or taking a limit of a single function of t) is far simpler than manipulating pmf/pdf expressions directly — this is exactly the machinery `mgf-properties` builds next | — |

*Coverage: 2/2/2/1 — 7 items, −0.3…1.7.*

---

## MGF Properties and Applications (`mgf-properties`)
*Prereq: MGF · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | State the MGF of X+Y for independent X, Y, and of aX+b in terms of M_X. | M_{X+Y}(t) = M_X(t)M_Y(t) (independent only); M_{aX+b}(t) = e^{bt}M_X(at) | — |
| R2 | recall | mcq | 0.04 | The product rule M_{X+Y}(t) = M_X(t)M_Y(t) requires: | X, Y independent | claims it holds "always" — a genuinely easy over-generalization to make → `mgf-properties` |
| A1 | apply | short-answer | 0.54 | Given M_Poisson(λ)(t) = exp(λ(e^t−1)), find M_{X+Y}(t) for independent X~Poisson(λ), Y~Poisson(μ), and identify the resulting distribution. `[verified: matches Poisson(λ+μ)]` | M_{X+Y}(t) = exp(λ(e^t−1))·exp(μ(e^t−1)) = exp((λ+μ)(e^t−1)) — exactly Poisson(λ+μ)'s MGF, re-deriving `poisson-distribution`'s convolution result in one line | — |
| A2 | apply | short-answer | 0.65 | Y₁,…,Yₙ are iid Bernoulli(p) with MGF (1−p)+pe^t (from `mgf`'s A1). Find the MGF of S=ΣYᵢ and identify its distribution. `[verified: matches known Binomial MGF]` | M_S(t) = [(1−p)+pe^t]ⁿ — exactly the Binomial(n,p) MGF; by uniqueness, S ~ Binomial(n,p), reproducing the very first combinatorial fact in this bank without any counting argument at all | — |
| E1 | explain | derivation | 1.24 | Derive M_{X+Y}(t)=M_X(t)M_Y(t) for independent X,Y from the definition. | M_{X+Y}(t) = E[e^{t(X+Y)}] = E[e^{tX}e^{tY}]; since X,Y are independent, so are e^{tX} and e^{tY} (functions of independent variables), so E[e^{tX}e^{tY}] = E[e^{tX}]E[e^{tY}] = M_X(t)M_Y(t) *(required: names explicitly why independence of X,Y transfers to independence of the transformed quantities)* | — |
| E2 | explain | short-answer | 1.4 | Why doesn't *every* distribution have an MGF? Give the intuition using a heavy-tailed example. | e^{tX} grows exponentially in X; if a distribution's tails decay too slowly (e.g. only polynomially, as with Cauchy), E[e^{tX}] diverges to infinity for any t≠0, so the MGF simply doesn't exist near 0 *(required: connects tail behavior to the divergence, not just "some distributions don't have one")* | — |
| T1 | transfer | derivation | 1.74 | Using only the MGF product rule (not combinatorics), re-derive that the sum of n iid Bernoulli(p) is Binomial(n,p) — the fact this whole bank started with. | M_S(t) = [(1−p)+pe^t]ⁿ (from A2); recognizing this as exactly the Binomial(n,p) MGF (itself obtainable from `binomial-theorem`: Σ C(n,k)(pe^t)^k(1−p)^{n−k} = ((1−p)+pe^t)ⁿ) means, by uniqueness, S must be Binomial(n,p) *(required: closes the loop explicitly — this is the same fact as the pilot file's opening PMF, now proved a second, very different way)* | re-derives the combinatorial proof instead of using the MGF machinery this item is testing → `mgf-properties` |

*Coverage: 2/2/2/1 — 7 items, −0.26…1.74. A2/T1 are the standout pair — this is the moment the whole MGF apparatus pays for itself.*

---

## Likelihood vs Probability (`likelihood-vs-probability`)
*Prereq: PMF, PDF · ancestors 9 · b₀ = 0.65*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.35 | Define the likelihood L(θ) given observed data x, and state the key distinction from the probability P(x\|θ). | same formula p(x\|θ) or f(x\|θ); probability varies x for *fixed* θ, likelihood varies θ for *fixed* (observed) x | — |
| R2 | recall | mcq | −0.05 | Viewed as a function of θ, the likelihood L(θ): | is not generally a probability distribution over θ at all | claims L(θ) "always integrates to 1 over θ" — the single most consequential confusion in this topic → `likelihood-vs-probability` |
| A1 | apply | short-answer | 0.45 | For n iid Bernoulli(θ) observations with k successes, write L(θ). | L(θ) = θᵏ(1−θ)ⁿ⁻ᵏ | writes θᵏ(1−θ)ᵏ, reusing k in both exponents → `likelihood-vs-probability` |
| A2 | apply | numeric | 0.6 | For n=10, k=7, compare L(0.5) and L(0.7) numerically — which θ is "more likely" given this data? `[verified: L(0.5)≈0.000977, L(0.7)≈0.002224]` | L(0.7) > L(0.5) — θ=0.7 is more likely, sensibly matching the observed proportion 7/10 | — |
| E1 | explain | derivation | 1.15 | Using A1's likelihood, show it is maximized at θ=k/n by differentiating log L(θ). | log L(θ) = k ln θ + (n−k) ln(1−θ); derivative k/θ − (n−k)/(1−θ) = 0 ⟹ k(1−θ) = (n−k)θ ⟹ θ = k/n *(required: the full derivative-and-solve chain)* — this is `mle` before that concept has a name | — |
| E2 | explain | short-answer | 1.3 | Why do we usually maximize the *log*-likelihood rather than the likelihood directly? | log turns a product of many small terms into a sum (avoiding numerical underflow with many data points, and simplifying differentiation); since log is strictly increasing, the maximizing θ is identical either way *(required: both the numerical and the "doesn't change the maximizer" points)* | — |
| T1 | transfer | short-answer | 1.65 | A headline claims: "Scientists find θ=0.3 is the most probable value, with probability 0.6, based on the likelihood function." What's wrong with this statement? | it treats L(θ) as a probability distribution over θ, which R2 already showed it generally is not — L(θ) need not integrate to 1 over θ, so "probability 0.6" is meaningless as stated; a genuine probability statement about θ requires Bayesian machinery (a prior, then Bayes' rule) to convert the likelihood into an actual posterior *(required: names what additional ingredient — a prior — would actually be needed)* | accepts the headline's framing and tries to compute what "probability 0.6" might mean rather than identifying the category error → `likelihood-vs-probability` |

*Coverage: 2/2/2/1 — 7 items, −0.35…1.65.*

---

## Method of Moments Estimation (`method-of-moments`)
*Prereq: Expectation · ancestors 10 · b₀ = 0.70*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.3 | Describe the method of moments procedure in one sentence. | set the first (or first few) sample moment(s) equal to the corresponding theoretical moment(s), expressed in terms of the unknown parameter(s), and solve | — |
| R2 | recall | mcq | 0.0 | For a distribution with 2 unknown parameters, method of moments generally requires: | 2 equations (matching the first two moments) | matches only the mean, treating one equation as always sufficient regardless of how many parameters are unknown → `method-of-moments` |
| A1 | apply | short-answer | 0.5 | X~Exponential(λ), so E[X]=1/λ. Given sample mean X̄=4, find λ̂. `[verified: 0.25]` | λ̂ = 1/4 = 0.25 | — |
| A2 | apply | short-answer | 0.65 | X~Uniform(0,θ), so E[X]=θ/2. Given X̄=6, find θ̂. `[verified: 12]` | θ̂ = 12 | — |
| E1 | explain | derivation | 1.2 | Method-of-moments estimators aren't unique in *how* you match moments. For Uniform(0,θ), derive the estimator you'd get by matching the *second* moment instead of the first, and show it's a genuinely different formula. `[verified: E[X²]=θ²/3]` | E[X²] = Var(X) + E[X]² = θ²/12 + θ²/4 = θ²/3; setting the sample second moment m₂ = θ²/3 gives θ̂ = √(3m₂) — a different closed form from θ̂=2X̄, and generally a *different number* on the same finite sample *(required: derives θ²/3 from Var+mean², not just asserts a different formula exists)* | — |
| E2 | explain | short-answer | 1.35 | Why are method-of-moments estimators usually easy to compute in closed form, even when MLE requires numerical optimization for the same distribution? | moments are simple functions of the data (sample averages) set equal to typically simple algebraic expressions in θ — often solvable by hand; MLE instead requires maximizing a likelihood that can be algebraically messy *(required)* | — |
| T1 | transfer | short-answer | 1.7 | For Gamma(α,β) (2 unknown parameters), set up the two method-of-moments equations using E[X]=α/β and E[X²]=α/β²+(α/β)². Why does having two unknowns require exactly two equations — no more, no fewer? | E[X]=α/β=X̄ and E[X²]=α/β²+(α/β)²=m₂ give two equations in two unknowns (α,β), solvable simultaneously; one equation per unknown parameter is required for the system to have (generically) a unique solution — fewer leaves parameters undetermined, more over-determines the system *(required)* | writes only the mean equation and tries to solve for both α and β from it alone → `method-of-moments` |

*Coverage: 2/2/2/1 — 7 items, −0.3…1.7.*

---

## Maximum Likelihood Estimation (`mle`)
*Prereq: Likelihood vs Probability · ancestors 10 · b₀ = 0.70*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.3 | Define the MLE θ̂ in one sentence. | the value of θ that maximizes the likelihood L(θ) (equivalently, log L(θ)) given the observed data | — |
| R2 | recall | mcq | 0.0 | *Invariance property*: if θ̂ is the MLE of θ, the MLE of g(θ) (any function g) is: | g(θ̂) | claims the MLE of g(θ) is "unrelated to θ̂ in general" — missing one of MLE's most useful properties → `mle` |
| A1 | apply | numeric | 0.5 | From `likelihood-vs-probability`'s derivation, θ̂=0.7 for n=10, k=7. Use *invariance* (not a fresh derivation) to find the MLE of the odds θ/(1−θ). `[verified: 2.333]` | MLE of odds = θ̂/(1−θ̂) = 0.7/0.3 = 7/3 ≈ 2.333 | re-derives the MLE from scratch for the odds parameter instead of applying invariance directly → `mle` |
| A2 | apply | derivation | 0.65 | For a single X~Exponential(λ), find the MLE of λ by maximizing L(λ)=λe^{−λx}. `[verified: λ̂=1/x]` | log L = ln λ − λx; derivative 1/λ − x = 0 ⟹ λ̂ = 1/x | — |
| E1 | explain | derivation | 1.2 | For n iid Exponential(λ) observations, derive λ̂ = 1/X̄, and note which other concept's estimator this exactly matches. `[verified: matches Method of Moments' A1 answer]` | L(λ)=λⁿexp(−λΣxᵢ); log L = n ln λ − λΣxᵢ; derivative n/λ − Σxᵢ = 0 ⟹ λ̂ = n/Σxᵢ = 1/X̄ — identical to `method-of-moments`'s estimator for this same distribution *(required: the full derivation, plus noticing the match)* | — |
| E2 | explain | short-answer | 1.35 | Argue informally why the invariance property holds for a *monotonic* g: if θ̂ maximizes L(θ), why must g(θ̂) maximize the likelihood re-expressed in terms of φ=g(θ)? | g monotonic means it's one-to-one, so maximizing over θ is exactly equivalent to maximizing over φ=g(θ) — it's the same search, just relabeled; the maximizing φ is therefore g applied to the maximizing θ, i.e. g(θ̂) *(required: the relabeling argument, not just restating the property)* | — |
| T1 | transfer | short-answer | 1.7 | MLE and Method of Moments give the *identical* estimator (1/X̄) for Exponential's rate. Is this a coincidence, or does it always happen? Give a distribution where the two methods disagree, and say why. `[verified: Uniform MLE is max(xᵢ)]` | not general — for Uniform(0,θ), the MLE is θ̂ = max(x₁,…,xₙ) (the smallest θ consistent with every observed point; L(θ)=1/θⁿ for θ≥max(xᵢ) is *decreasing* in θ, so the max is achieved at the smallest feasible θ), which is nothing like Method of Moments' θ̂=2X̄ *(required: derives *why* the Uniform MLE is a max, not just states the fact)* | assumes the two methods must always agree because they agreed for Exponential → `mle` |

*Coverage: 2/2/2/1 — 7 items, −0.3…1.7. T1's Uniform result is reused directly by `exponential-family`'s E1.*

---

## Unbiased Estimator (`unbiased-estimator`)
*Prereq: MLE, Method of Moments · ancestors 13 · b₀ = 0.82*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.18 | Define an unbiased estimator. | θ̂ is unbiased if E[θ̂] = θ for *every* possible true value of θ | — |
| R2 | recall | mcq | 0.12 | Which is TRUE? (a) MLE is always unbiased (b) the sample mean is always unbiased for the population mean (c) unbiased estimators are always the best choice. | (b) | picks (a) — `mle`'s Exponential estimator happens to be unbiased-adjacent in some cases, but MLE is *not* unbiased in general (the classic counterexample is next, in A2/E1) → `unbiased-estimator` |
| A1 | apply | derivation | 0.62 | Show X̄ = (1/n)ΣXᵢ is unbiased for μ=E[Xᵢ], using linearity of expectation. | E[X̄] = (1/n)ΣE[Xᵢ] = (1/n)(nμ) = μ *(required, one line but must be shown)* | — |
| A2 | apply | numeric | 0.75 | The "naive" variance estimator (1/n)Σ(Xᵢ−X̄)² has E[·] = ((n−1)/n)σ². For n=5, σ²=10, find its bias. `[verified by simulation: ≈8.0 vs true 10]` | bias = ((n−1)/n)σ² − σ² = −σ²/n = −10/5 = −2 — the naive estimator *underestimates* σ² by 2 on average at this sample size | assumes any "reasonable-looking" estimator built from an average must be unbiased → `unbiased-estimator` |
| E1 | explain | derivation | 1.32 | Prove E[(1/n)Σ(Xᵢ−X̄)²] = ((n−1)/n)σ², using the identity Σ(Xᵢ−X̄)² = Σ(Xᵢ−μ)² − n(X̄−μ)². | E[Σ(Xᵢ−μ)²] = nσ²; E[n(X̄−μ)²] = n·Var(X̄) = n·(σ²/n) = σ²; subtracting gives E[Σ(Xᵢ−X̄)²] = nσ²−σ² = (n−1)σ²; dividing by n gives the result `[verified: matches simulation to 3 sig figs]` *(required: the algebraic identity must be used, not assumed)* — this is exactly why the (n−1) (Bessel's) correction exists | — |
| E2 | explain | short-answer | 1.5 | Explain *intuitively* why using X̄ (an estimate) instead of the true μ systematically makes the naive estimator underestimate spread. | X̄ is, by construction, the value of c that *minimizes* Σ(Xᵢ−c)² over all choices of c — so plugging in the true (unknown) μ instead would give a sum of squared deviations at least as large; using the data's own best-fit center systematically produces a smaller apparent spread than the true center would *(required: connects to X̄ minimizing the sum of squares, the actual mechanism)* | — |
| T1 | transfer | short-answer | 1.82 | A junior analyst divides by n "because that's literally the definition of an average"; their boss insists on n−1. Who's right, and does it matter much for n=1000 vs n=5? `[verified: (n-1)/n = 0.8 at n=5, 0.999 at n=1000]` | the boss is right for unbiasedness (E1); the practical gap shrinks as n grows — (n−1)/n = 0.8 at n=5 (a 20% average underestimate) but 0.999 at n=1000 (negligible) *(required: both directions of the comparison, with the actual factor)* | treats the correction as "always negligible" or "always essential," without the sample-size-dependence → `unbiased-estimator` |

*Coverage: 2/2/2/1 — 7 items, −0.18…1.82. This whole section sets up `sample-variance`'s (n−1) denominator before that concept exists.*

---

## Distribution Transformations (`distribution-transformations`)
*Prereq: PDF, PMF · ancestors 9 · b₀ = 0.65*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.35 | State the 1-D change-of-variables formula for Y=g(X), g strictly monotonic and differentiable. | f_Y(y) = f_X(g⁻¹(y))·\|d/dy g⁻¹(y)\| | — |
| R2 | recall | mcq | −0.05 | For *non*-monotonic g (e.g. g(x)=x²), the formula: | needs to sum contributions from every x-branch mapping to the same y | assumes the single-branch formula still applies unmodified → `distribution-transformations` |
| A1 | apply | derivation | 0.45 | X~Uniform(0,1), Y=−ln(X). Find f_Y(y) and identify the distribution. `[verified: E[Y]≈1 by simulation, matching Exponential(1)]` | g⁻¹(y)=e⁻ʸ; \|d/dy e⁻ʸ\|=e⁻ʸ; f_X(e⁻ʸ)=1 for 0<e⁻ʸ<1 i.e. y>0; f_Y(y)=e⁻ʸ for y>0 — **exactly Exponential(1)** | forgets the support restriction (y>0) that comes from X's own support | 
| A2 | apply | derivation | 0.6 | X~N(0,1), Y=X². Using the two-branch rule from R2, set up f_Y(y) for y>0 (no need to simplify to the named χ²₁ constant). `[verified: reduces to φ(√y)/√y, matching χ²₁]` | f_Y(y) = φ(√y)·(1/(2√y)) + φ(−√y)·(1/(2√y)) = φ(√y)/√y (using φ even) — this matches `chi-square-distribution`'s χ²₁ density, closing the loop from that cluster | uses only one branch (x=√y), missing x=−√y entirely, halving the density → `distribution-transformations` |
| E1 | explain | derivation | 1.15 | Prove the change-of-variables formula for monotonic *increasing* g, via the CDF. | F_Y(y)=P(g(X)≤y)=P(X≤g⁻¹(y))=F_X(g⁻¹(y)); differentiate both sides in y via the chain rule to get f_Y(y)=f_X(g⁻¹(y))·(g⁻¹)′(y) *(required: the CDF-then-differentiate chain)* — this is the exact technique `normal-distribution`'s E1 used to standardize Z, proved here as the general theorem it was secretly a special case of | — |
| E2 | explain | short-answer | 1.3 | Why does the formula need \|·\| around the derivative, rather than the signed derivative? | a density must be nonnegative; for g *decreasing*, the CDF derivation flips a direction (P(X≤g⁻¹(y)) becomes P(X≥g⁻¹(y))), introducing a sign that the absolute value correctly absorbs regardless of whether g is increasing or decreasing *(required)* | — |
| T1 | transfer | short-answer | 1.65 | Computers generate Uniform(0,1) numbers natively but need other distributions for simulation. Using A1, explain how a computer can produce an Exponential(1) draw from a Uniform(0,1) draw — and why this trick (inverse transform sampling) generalizes to *any* target distribution with an invertible CDF. | generate U~Uniform(0,1), output Y=−ln(U) (exactly A1, run in reverse); more generally, if U~Uniform(0,1), then Y=F⁻¹(U) has CDF F for *any* invertible target CDF F — the general statement this specific trick is an instance of *(required: states the general F⁻¹(U) fact, not just the Exponential special case)* — this is a real building block of random-number-generation libraries | treats A1's trick as specific to Exponential, without generalizing to F⁻¹(U) → `distribution-transformations` |

*Coverage: 2/2/2/1 — 7 items, −0.35…1.65.*

---

## Exponential Family (`exponential-family`)
*Prereq: MGF · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | State the canonical one-parameter exponential family form. | f(x;θ) = h(x)·exp(η(θ)T(x) − A(θ)) | — |
| R2 | recall | mcq | 0.04 | Which of these is *not* a member of the exponential family in its usual form? | Uniform(0,θ) — because its support depends on θ | picks Poisson or Normal, not recognizing they *do* fit the canonical form → `exponential-family` |
| A1 | apply | derivation | 0.54 | Write Bernoulli(θ) in exponential family form, identifying h(x), η(θ), T(x), A(θ). | θˣ(1−θ)¹⁻ˣ = exp(x·ln(θ/(1−θ)) + ln(1−θ)); h(x)=1, η(θ)=ln(θ/(1−θ)) (the *logit*), T(x)=x, A(θ)=−ln(1−θ) *(required: the logit must appear as η(θ), not just "some function of θ")* | — |
| A2 | apply | derivation | 0.65 | Write Poisson(λ) in exponential family form. | e⁻ᵠλˣ/x! = (1/x!)exp(x ln λ − λ); h(x)=1/x!, η(λ)=ln λ, T(x)=x, A(λ)=λ | — |
| E1 | explain | short-answer | 1.24 | Explain why Uniform(0,θ) fails to be exponential family, connecting it to `mle`'s earlier finding about its MLE. | exponential family densities require the support to *not* depend on θ; Uniform(0,θ)'s support [0,θ] depends on θ directly, disqualifying it — and this is exactly why its MLE (θ̂=max(xᵢ), from `mle`'s T1) is a boundary/max solution rather than the smooth calculus solution (derivative=0) that exponential-family MLEs typically produce *(required: the explicit connection to the earlier MLE finding, not just restating the support rule)* | — |
| E2 | explain | short-answer | 1.4 | What does T(x) represent inside the exponential form, informally (without yet defining sufficiency formally)? | for Bernoulli, T(x)=x itself; for a sample of n iid Bernoullis, the sum Σxᵢ turns out to be the *only* thing about the data that ends up mattering for inference about θ — a first, informal look at what `sufficient-statistic` will name precisely | — |
| T1 | transfer | short-answer | 1.74 | Nearly every named distribution in this bank (Normal, Bernoulli, Binomial, Poisson, Gamma, Beta, Exponential) is exponential family — one reason it's studied as a unifying topic. Give one *practical* benefit of knowing this, beyond tidiness. | moments can be computed uniformly via derivatives of A(θ) (the log-partition function) instead of a fresh calculation per distribution; a single generic fitting algorithm can handle *any* exponential-family member without distribution-specific code; conjugate Bayesian priors exist automatically for the whole family *(required: at least one concrete practical payoff, not just "it's elegant")* | states only that it's "mathematically elegant" without naming a concrete downstream use → `exponential-family` |

*Coverage: 2/2/2/1 — 7 items, −0.26…1.74.*

---

## Cluster 6 misconception index

| Tag | Blame |
|---|---|
| MGF derivative order confused (mean vs variance) | `mgf` |
| MGF product rule applied without checking independence | `mgf-properties` |
| likelihood treated as a probability distribution over θ | `likelihood-vs-probability` |
| one moment equation used for a multi-parameter family | `method-of-moments` |
| MLE assumed always unbiased, or invariance property missed | `mle`, `unbiased-estimator` |
| naive (n-divisor) variance assumed unbiased | `unbiased-estimator` |
| single-branch change of variables on a non-monotonic transform | `distribution-transformations` |
| exponential-family support rule missed (Uniform's disqualification) | `exponential-family` |

**Cluster total: 56 items across 8 concepts.** All numeric and simulation-based claims verified,
including a 500,000-trial check of the classic (n−1)/n variance-bias factor and a 2-million-sample
check of the inverse-transform-sampling identity. This cluster contains the densest web of
cross-references in the bank so far — MGF-matching re-proving the pilot file's opening fact, the
Uniform MLE explaining its own exponential-family exclusion, and Cluster 4's Normal-standardization
proof turning out to be a special case of this cluster's general transformation theorem.
