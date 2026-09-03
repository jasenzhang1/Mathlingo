# Cluster 9 — Statistics Foundations

Population vs Sample → Sample Variance (6 concepts). This is the first cluster from the `statistics`
domain proper, rather than `probability` — the transition point where the bank starts asking not just
"what is true of a distribution" but "what can be learned about one from data." Same format as
[Cluster 1](foundations-of-probability.md).

---

## Population vs Sample (`population-vs-sample`)
*Root · ancestors 0 · b₀ = −0.50*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.5 | Define "population" and "sample," and state which one a statistical analysis actually observes. | population = the complete set of units of interest; sample = the (usually much smaller) subset actually observed; conclusions about the population are drawn *from* the sample | — |
| R2 | recall | mcq | −1.3 | A "census" is: | an attempt to measure the *entire* population | calls it "a type of hypothesis test," conflating a data-collection strategy with an inferential procedure → `population-vs-sample` |
| A1 | apply | short-answer | −0.7 | A quality engineer wants the average lifespan of a batch of 10,000 bulbs. Why is testing the *entire* batch (a census) an especially bad idea here? | testing lifespan is destructive — you run each bulb until it fails; testing all 10,000 destroys the entire batch you were trying to sell, so sampling isn't just convenient, it's essential *(required: names the destructive-testing mechanism specifically)* | — |
| A2 | apply | short-answer | −0.55 | A pollster wants opinions of "American voters," but that population changes daily (people turn 18, move, pass away). Why does this make even *defining* the population for a poll surprisingly tricky? | the population is a moving, fuzzy target requiring a snapshot-in-time definition (e.g. "registered voters as of a specific date"), and different reasonable definitions (registered vs. eligible vs. likely voters) can yield genuinely different results — the population definition is itself a methodological choice *(required)* | treats "American voters" as an unambiguous, fixed group → `population-vs-sample` |
| E1 | explain | short-answer | 0.0 | Give an example of a population that isn't a group of people at all, and that is inherently hypothetical or infinite. | e.g. "all possible outcomes of rolling this die forever," or "all possible measurements a scale could produce" (used to model measurement error) — a population is any well-defined collection the researcher wants to draw conclusions about, not limited to a finite, enumerable human group *(required: a genuinely infinite/hypothetical example, not just a large finite group)* | — |
| E2 | explain | short-answer | 0.2 | State, in one or two sentences, the fundamental logical structure of statistical inference using the population/sample distinction. | we never observe the population directly; we use properties of the *sample* (statistics) to make inferences about properties of the *population* (parameters), with quantifiable uncertainty about how good that inference is *(required)* — this is exactly what `parameter-vs-statistic` names precisely next | — |
| T1 | transfer | short-answer | 0.5 | A tech company wants to know what percentage of "all possible users" would click a new button — but no fixed population of "all possible users" exists (the app doesn't exist for most of them yet). How does A/B testing handle this? | it redefines the practical population as something like "all future visits to the app under conditions like today's," and the sample is the visitors who happen to arrive during the test window — reframing an intractable question about all possible future users into a tractable statistical question about a well-defined, if somewhat artificial, population *(required)* | treats A/B testing as somehow avoiding the population/sample framework rather than redefining the population pragmatically → `population-vs-sample` |

*Coverage: 2/2/2/1 — 7 items, −1.5…0.5.*

---

## Parameter vs Statistic (`parameter-vs-statistic`)
*Prereq: Population vs Sample · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Define "parameter" and "statistic," stating which is fixed and which is random before data collection. | parameter describes the population — a fixed (usually unknown) number; statistic describes the sample, computed from data — *random* before the sample is drawn (a different sample gives a different value), fixed once actually computed | — |
| R2 | recall | mcq | −0.9 | The standard notational convention is: | Greek letters for parameters, Latin letters (often hatted) for statistics — e.g. μ vs X̄, p vs p̂ | reverses the convention → `parameter-vs-statistic` |
| A1 | apply | short-answer | −0.35 | Classify each as parameter or statistic: (a) the true defect proportion across an entire factory's annual output (b) the defect proportion found in a batch of 50 items you inspected (c) the average height of all trees in a national park (d) the average height from a 200-tree survey of that park. | (a) parameter (b) statistic (c) parameter (d) statistic | — |
| A2 | apply | short-answer | −0.2 | "A statistic is random before you observe data, fixed once you have it." Explain this using X̄ specifically: is it random or fixed *before* drawing a sample of n=30? *After* computing it? | before: X̄ is a random variable — a function of the not-yet-realized sample, which would come out differently on a hypothetical repeat; after: it's one specific fixed number (e.g. "72.3 inches") *(required: both halves, with the "hypothetical repeat" framing)* — this duality is the crux of `sampling-distribution` later | — |
| E1 | explain | short-answer | 0.35 | Why is treating a statistic as a random variable, before data collection, essential to doing anything useful with statistics? | only by treating X̄ as random can we discuss its *distribution* (mean, variance, shape), which is exactly what lets us quantify how much to trust a specific computed value as an estimate — without this framing there is no way to attach any notion of precision or uncertainty to an estimate at all *(required)* | — |
| E2 | explain | short-answer | 0.5 | Distinguish "the sample mean is close to the population mean" from "the sample mean equals the population mean." Why does conflating them matter? | a statistic is an estimate carrying inherent sampling variability — a specific X̄=72.3 is a best guess with quantifiable uncertainty (formalized later via standard error and confidence intervals), not an assertion that it exactly equals the true μ; treating a statistic as if it *were* the parameter, with no acknowledgment of estimation error, is a root cause of statistical overconfidence *(required)* | — |
| T1 | transfer | short-answer | 0.85 | A news article reports "the poll shows 52% support," with no margin of error. Using the parameter/statistic distinction, explain what the 52% *is*, and why omitting the margin of error makes the report fundamentally incomplete. | 52% is a *statistic*, estimating the true, unknown *parameter* (population support); since the statistic is a random quantity that would come out somewhat differently with a different sample, reporting it alone implicitly suggests certainty about the parameter rather than an estimate with quantifiable sampling variability *(required: names the 52% as a statistic explicitly, not just "an estimate")* | treats the 52% as directly informative about the population with no need for further qualification → `parameter-vs-statistic` |

*Coverage: 2/2/2/1 — 7 items, −1.15…0.85.*

---

## Data Types (`data-types`)
*Prereq: Population vs Sample · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Name the four basic data types (nominal, ordinal, discrete quantitative, continuous quantitative) with one example each. | nominal: eye color; ordinal: T-shirt size; discrete: number of children; continuous: height | — |
| R2 | recall | mcq | −0.9 | Which is *ordinal* (not nominal)? (a) blood type (A,B,AB,O) (b) T-shirt size (S,M,L,XL) (c) zip code. | (b) — a genuine order | picks zip code, mistaking a numeric-*looking* label for ordered quantitative data → `data-types` |
| A1 | apply | short-answer | −0.35 | Classify: (a) number of siblings (b) 1–5 star satisfaction rating (c) exact weight in kg (d) favorite programming language. | (a) discrete (b) ordinal (c) continuous (d) nominal | — |
| A2 | apply | short-answer | −0.2 | Why does computing the "average" zip code, or the "average" favorite programming language, produce a meaningless number even though the arithmetic itself is valid? | nominal categories have no inherent numeric ordering or magnitude — any numeric labels (like zip codes) are just labels, and averaging labels doesn't correspond to a meaningful "typical value"; the meaningful summary for nominal data is a mode or a set of proportions, not a mean *(required)* | — |
| E1 | explain | short-answer | 0.35 | Why does ordinal data (e.g. a 1–5 rating) sit in an awkward middle ground between nominal and quantitative? | it has order (unlike nominal) but the *gaps* between categories aren't necessarily equal or meaningful (unlike quantitative data) — is the "1→2" difference really the same amount of satisfaction change as "4→5"? This ambiguity is exactly what makes computing a mean of ordinal data a debated practice *(required)* | — |
| E2 | explain | short-answer | 0.5 | Give a concrete example of a statistical method that requires quantitative (not categorical) data, and explain what goes wrong applying it to categorical data anyway. | e.g. a standard deviation or a t-test assumes numeric, ordered, meaningfully-spaced data; applying either to nominal categories produces a number that is computable but uninterpretable — this is exactly the mechanism connecting data type to test selection, covered later in the hypothesis-testing cluster *(required: a real method named, not just "some tests don't work")* | — |
| T1 | transfer | short-answer | 0.85 | A researcher codes "Disagree"=1, "Neutral"=2, "Agree"=3 and reports the average response, 2.3, as "the average opinion." Critique this practice, and suggest a more defensible summary. | treating a 1-2-3 coding as truly quantitative (equally-spaced, meaningful gaps) is an *assumption*, not a fact — the "2.3" implicitly assumes "Neutral" sits exactly halfway between "Disagree" and "Agree" in some meaningful sense; a median response, or the full distribution of category percentages, avoids this assumption *(required: names the equal-spacing assumption specifically, and offers a concrete alternative)* | accepts the 2.3 average at face value without questioning the equal-spacing assumption → `data-types` |

*Coverage: 2/2/2/1 — 7 items, −1.15…0.85.*

---

## Sampling Methods (`sampling-methods`)
*Prereq: Population vs Sample · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Define simple random sampling (SRS). | every subset of the population of the given sample size is equally likely to be chosen | — |
| R2 | recall | mcq | −0.9 | The key property distinguishing "probability sampling" (SRS, stratified, cluster) from convenience sampling is: | every unit has a *known, nonzero* probability of selection under probability sampling | claims probability sampling is "always cheaper" — often the *opposite* is true (convenience sampling is typically the cheap option) → `sampling-methods` |
| A1 | apply | short-answer | −0.35 | A university wants precise opinions across the whole student body, worried that opinions vary a lot by major. Stratified sampling (by major) or SRS? | stratified — proportional representation from each major typically gives a *more precise* whole-population estimate than SRS when opinions genuinely differ a lot across strata (high between-stratum variance), directly echoing `law-of-total-variance`'s decomposition *(required: the between-stratum variance connection)* | — |
| A2 | apply | short-answer | −0.2 | A national survey randomly selects 50 towns, then interviews *every* household in each. Name the method, and its main advantage and disadvantage. | cluster sampling; advantage: far cheaper/more logistically feasible (interviewers visit only 50 towns); disadvantage: typically *less* precise than SRS at the same sample size, since households within the same town tend to resemble each other, reducing the effective information gained per additional household | — |
| E1 | explain | short-answer | 0.35 | Using within/between-group variance intuition, explain why stratified sampling tends to beat SRS when strata differ a lot, while cluster sampling tends to underperform SRS when units within a cluster are similar. | stratified sampling eliminates between-stratum variance from the sampling error by construction, sampling proportionally from every stratum; cluster sampling concentrates the sample within highly similar (low within-cluster-variance, but replicated) groups, wasting some of the sample's effective information *(required: both halves, in `law-of-total-variance` terms)* | — |
| E2 | explain | short-answer | 0.5 | Why can't convenience sampling be analyzed with the same confidence-interval/hypothesis-test theory built for probability sampling? | that theory (sampling distributions, standard errors) is built on every unit having a *known* selection probability; convenience samples provide no such thing, so the direction and magnitude of any resulting bias is fundamentally unknown and uncorrectable by formula alone *(required)* | — |
| T1 | transfer | short-answer | 0.85 | A 1930s pollster sampled 2+ million respondents from phone directories and car registrations and still predicted the wrong election outcome. Explain why a *massive* convenience sample can be far less trustworthy than a much smaller probability sample, and why "more data" didn't fix it. | phone/car ownership at the time correlated with wealth, which correlated with political preference — the sampling frame itself systematically excluded a large, non-random swath of voters; the resulting huge sample gives a precisely-estimated *wrong* number, because this kind of bias doesn't shrink with sample size the way random sampling error does *(required: names the correlated-exclusion mechanism, and that bias ≠ sampling error in how it scales with n)* — the real 1936 *Literary Digest* poll disaster | assumes a larger convenience sample is automatically more trustworthy than a smaller one → `sampling-methods` |

*Coverage: 2/2/2/1 — 7 items, −1.15…0.85.*

---

## Sample Mean (`sample-mean`)
*Prereq: Parameter vs Statistic, Expectation · ancestors 12 · b₀ = 0.78*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.22 | Define X̄, and state E[X̄] and Var(X̄) in terms of μ, σ². | X̄=(1/n)ΣXᵢ; E[X̄]=μ; Var(X̄)=σ²/n | — |
| R2 | recall | mcq | 0.08 | As n increases, Var(X̄): | decreases toward 0 | picks "stays the same," missing the n in the denominator entirely → `sample-mean` |
| A1 | apply | numeric | 0.58 | A population has σ=12. Find Var(X̄) and SD(X̄) for n=36. `[verified: 4, 2]` | Var(X̄)=144/36=4; SD(X̄)=2 | forgets to divide the *variance* by n before taking a square root, or divides the SD by n directly → `sample-mean` |
| A2 | apply | numeric | 0.7 | Same population: how large must n be to get SD(X̄) ≤ 1? `[verified: n≥144]` | 12/√n ≤ 1 ⟹ √n ≥ 12 ⟹ n ≥ 144 | — |
| E1 | explain | short-answer | 1.28 | Explain why Var(X̄)=σ²/n is exactly the mathematical content behind the Law of Large Numbers, and why the *rate* (SD shrinks as 1/√n, not 1/n) matters. | this is precisely the Chebyshev-based proof of the Weak LLN from `law-of-large-numbers`, now viewed through X̄'s own variance; the square-root scaling means quadrupling n only *halves* the standard error, not quarters it — a genuinely important, slightly counterintuitive rate *(required: the explicit 1/√n scaling, not just "more data helps")* | assumes SD(X̄) shrinks proportionally to 1/n → `sample-mean` |
| E2 | explain | short-answer | 1.4 | What does "the sampling distribution of X̄" mean, and how does it differ from the distribution of a single observation Xᵢ? | it describes how X̄ itself would vary *across hypothetical repeated samples* of size n — each fresh sample gives a (generally) different X̄, and the sampling distribution describes that variability; this is a fundamentally different object from the distribution of one raw data point *(required)* | conflates the sampling distribution of X̄ with the population distribution of a single Xᵢ → `sample-mean` |
| T1 | transfer | short-answer | 1.78 | A firm wants to *halve* its survey's standard error while keeping everything else fixed. Using σ/√n, how much more data is needed — twice as much? Why might this surprise a manager expecting "half the error needs twice the effort"? `[verified: needs 4x, since σ/√(4n)=σ/(2√n)]` | to halve SD(X̄), n must *quadruple* (σ/√(4n) = σ/(2√n), exactly half); this square-root law means diminishing returns on data collection, with real budget implications *(required: the explicit quadrupling, not just "more than double")* | assumes halving the error requires only doubling the sample size, matching linear intuition → `sample-mean` |

*Coverage: 2/2/2/1 — 7 items, −0.22…1.78.*

---

## Sample Variance (`sample-variance`)
*Prereq: Sample Mean, Variance · ancestors 14 · b₀ = 0.85*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.15 | State the formula for sample variance s², and name which earlier concept established its unbiasedness. | s² = (1/(n−1))Σ(Xᵢ−X̄)²; unbiasedness with the (n−1) divisor was established in `unbiased-estimator` | — |
| R2 | recall | mcq | 0.15 | For iid *Normal* data, (n−1)s²/σ² follows exactly: | χ²_{n−1} | picks χ²ₙ — the classic off-by-one on the degrees of freedom → `sample-variance` |
| A1 | apply | numeric | 0.65 | A sample of n=10 normal observations has s²=25, with true σ²=20. Compute (n−1)s²/σ² and name its exact distribution. `[verified: 11.25]` | (9)(25)/20 = 11.25, distributed as χ²₉ | uses n=10 rather than n−1=9 degrees of freedom → `sample-variance` |
| A2 | apply | short-answer | 0.8 | Explain, at a high level, why the degrees of freedom is (n−1), not n — connect to X̄ being computed from the *same* data used to compute s². | knowing X̄ and any n−1 of the n deviations (Xᵢ−X̄) determines the *last* deviation automatically, since all n deviations must sum to exactly 0 — only n−1 pieces of information are genuinely free to vary *(required: the "last deviation is forced" argument)* — the same fact that originally motivated Bessel's correction in `unbiased-estimator` | — |
| E1 | explain | derivation | 1.35 | Prove Σ(Xᵢ−X̄) = 0 for *any* sample, and explain how this shows only n−1 of the n deviations are free. `[verified numerically]` | Σ(Xᵢ−X̄) = ΣXᵢ − nX̄ = ΣXᵢ − n(ΣXᵢ/n) = 0, always *(required: the one-line proof)*; since the n deviations must sum to 0, fixing any n−1 of them forces the last | — |
| E2 | explain | short-answer | 1.55 | Why does the exact result (n−1)s²/σ² ~ χ²_{n−1} specifically require the Xᵢ to be *Normal*? What breaks if they were Exponential instead? | Chi-Square was defined (Cluster 4) as a sum of *squared standard normals*; the (approximately) standardized deviations (Xᵢ−X̄)/σ only behave like standard normals when the underlying data itself is Normal — for Exponential data the exact chi-square result fails, though an *approximate* version can hold for large n via CLT-type reasoning *(required: the explicit tie back to chi-square's own definition, not just "it needs normality")* | — |
| T1 | transfer | short-answer | 1.85 | An engineer wants a 95% confidence interval for a machine's true variance σ² (not just its mean). Explain, conceptually, how (n−1)s²/σ² having a *known* distribution (χ²_{n−1}) is exactly what makes this possible — and how the same logical template will reappear for confidence intervals on the mean. | because (n−1)s²/σ² has a fully known distribution regardless of the true σ², chi-square critical values can bracket it with 95% probability, and that probability statement can be algebraically rearranged to isolate σ² — producing an interval; the *same template* (a statistic with a known sampling distribution, rearranged into a probability statement about the parameter) is exactly how confidence intervals on μ will be built next, just with a different underlying distribution *(required: names the shared template explicitly, not just this one application)* | — |

*Coverage: 2/2/2/1 — 7 items, −0.15…1.85. T1 is the explicit bridge into [Cluster 10](hypothesis-testing-machinery.md).*

---

## Cluster 9 misconception index

| Tag | Blame |
|---|---|
| population treated as an unambiguous, always-finite, human group | `population-vs-sample` |
| parameter/statistic notational convention reversed | `parameter-vs-statistic` |
| a statistic reported as if it *were* the parameter, with no uncertainty | `parameter-vs-statistic` |
| numeric-looking labels (zip codes) treated as ordinal or quantitative | `data-types` |
| ordinal data averaged without acknowledging the equal-spacing assumption | `data-types` |
| convenience sampling assumed to improve with sheer sample size | `sampling-methods` |
| SD(X̄) assumed to shrink as 1/n rather than 1/√n | `sample-mean` |
| degrees of freedom off-by-one (n vs n−1) in sample variance | `sample-variance` |

**Cluster total: 42 items across 6 concepts.** All numeric claims verified, including the exact
chi-square statistic value and the 1/√n scaling law. This cluster is the hinge of the whole bank: it
takes every probability-theory result built in Clusters 1–8 and turns it around to face data instead
of distributions — `sample-mean`'s variance IS the Weak LLN's proof mechanism read backwards, and
`sample-variance`'s T1 hands off directly into the sampling-distribution machinery of Cluster 10.
