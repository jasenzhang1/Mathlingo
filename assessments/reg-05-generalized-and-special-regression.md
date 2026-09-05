# Regression Cluster 5 — Generalized & Special Regression

Mixed Effect Models, Logistic Regression, Probit Regression, Generalized Linear Model, Cox
Proportional Hazards Model (5 concepts). Same format as
[foundations-of-probability.md](foundations-of-probability.md). This is the final cluster of the
regression domain. `logistic-regression`'s E1 cashes in `exponential-family`'s logit derivation from
the probability sweep directly, and `glm`'s E1 fulfills that same concept's T1 forward-pointer about a
generic fitting algorithm for the whole exponential family.

---

## Mixed Effect Models (`mixed-effect-models`)
*Prereq: Multiple Linear Regression, Sampling Methods · ancestors 27 · b₀ = 1.17*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.17 | Distinguish fixed and random effects in a mixed model. | fixed effects: population-level coefficients, the same for everyone; random effects: allow individual/group-level variation (e.g. per-subject random intercepts), drawn from a distribution | — |
| R2 | recall | mcq | 0.13 | Mixed models are especially appropriate when: | observations are clustered/grouped (repeated measures per patient, students within schools), violating ordinary regression's independence assumption | claims they're for data where "all observations are completely independent" — the opposite of when they're needed → `mixed-effect-models` |
| A1 | apply | short-answer | 0.63 | Why does treating repeated measurements from the same patient as independent understate the true standard errors? | measurements from the same patient are correlated (their own baseline health affects all their readings similarly), so they carry less genuinely new information than the same count of measurements from different patients would — echoing `paired-t-test`'s earlier independence-violation point *(required: the direct callback to that earlier concept)* | — |
| E1 | explain | short-answer | 1.33 | What role does a random intercept play, and how does it connect to `law-of-total-variance`? | it lets each subject have its own baseline level while still estimating a single shared set of fixed-effect coefficients; the random-effect variance captures between-group variability and the residual captures within-group variability — exactly the within/between decomposition from that earlier concept *(required: the explicit within/between framing)* | — |
| T1 | transfer | short-answer | 1.83 | How does `sampling-methods`' cluster sampling naturally produce data suited to mixed-effects analysis? | cluster-sampled data (whole households or schools surveyed together) has the same within-cluster correlation structure mixed models are designed to handle — both arise from the identical underlying reality of grouped observations *(required: names the shared correlation structure explicitly)* | — |

*Coverage: 5 items, −0.17…1.83.*

---

## Logistic Regression (`logistic-regression`)
*Prereq: MLE, Bernoulli and Binomial Distributions, Multiple Linear Regression · ancestors 33 · b₀ = 1.26*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.26 | State the logistic regression model. | P(Y=1\|X) = sigmoid(Xβ) = 1/(1+e^(−Xβ)) | — |
| R2 | recall | mcq | 0.56 | Logistic regression's coefficients are estimated via: | maximum likelihood, since the Bernoulli/binomial likelihood has no OLS-style closed form | claims OLS is used "exactly like linear regression" — logistic regression's likelihood requires MLE, not least squares → `logistic-regression` |
| A1 | apply | numeric | 1.06 | Xβ=2 for an observation. Compute P(Y=1\|X). `[verified: 0.8808]` | sigmoid(2) = 1/(1+e⁻²) ≈ 0.881 | — |
| E1 | explain | short-answer | 1.76 | Why is a logistic coefficient interpreted through log-odds, connecting to `exponential-family`? | `exponential-family` showed the logit η(θ)=ln(θ/(1−θ)) is the natural parameter for the Bernoulli exponential family; logistic regression literally models this natural parameter as linear in X — a one-unit increase in Xⱼ adds βⱼ to the log-odds, exactly the natural-parameter interpretation established earlier, not a fresh coincidence *(required: names the natural-parameter identity explicitly)* | — |
| T1 | transfer | short-answer | 2.26 | Why is ordinary linear regression a poor choice for modeling a binary outcome's probability directly? | a linear function's output is unbounded and can predict probabilities below 0 or above 1, which is nonsensical; the sigmoid link guarantees outputs stay within [0,1] — exactly the problem a proper link function (as in `cross-entropy-loss`'s ML-sweep framing) is designed to solve *(required: names the unbounded-output problem specifically)* | — |

*Coverage: 5 items, 0.26…2.26.*

---

## Probit Regression (`probit-regression`)
*Prereq: Logistic Regression, Normal Distribution · ancestors 35 · b₀ = 1.29*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.29 | Describe probit regression's link function. | the standard Normal CDF Φ(Xβ), used in place of the logistic sigmoid | — |
| R2 | recall | mcq | 0.59 | In practice, logistic and probit regression typically give: | very similar predicted probabilities for most datasets, since the logistic and Normal CDFs have similar shapes | claims they give "identical predictions always" — an overclaim; they're similar, not identical, differing mainly in tail decay speed → `probit-regression` |
| A1 | apply | short-answer | 1.09 | Why are probit's coefficients harder to interpret than logistic's log-odds interpretation? | the Normal CDF Φ has no simple closed-form inverse relationship to a familiar quantity like "odds," so probit coefficients lack the convenient odds-ratio reading logistic regression enjoys, even when the two models' predictions are similar *(required: names the missing simple-inverse relationship)* | — |
| E1 | explain | short-answer | 1.79 | Why might probit be preferred in fields assuming an underlying latent Normal variable? | probit can be derived as Y=1 exactly when a latent Y*=Xβ+ε exceeds a threshold, with ε~Normal(0,1) — giving it a natural threshold-crossing interpretation tied to an underlying continuous, Normally-distributed process (e.g. "utility" in economic choice models) *(required: the explicit latent-variable derivation)* | — |
| T1 | transfer | short-answer | 2.29 | Why is the logistic-vs-probit choice largely a matter of convention, and why might logistic still be the default? | per R2, predictions are typically very similar in practice; logistic regression's easier-to-communicate odds-ratio interpretation makes it the practical default, unless a specific theoretical reason (like E1's latent-variable motivation) favors probit *(required: connects to both R2's similarity finding and E1's specific exception)* | — |

*Coverage: 5 items, 0.29…2.29.*

---

## Generalized Linear Model (GLM) (`glm`)
*Prereq: Logistic Regression, Exponential Family · ancestors 36 · b₀ = 1.31*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.31 | Describe the three parts of the GLM framework. | (1) a response distribution from the exponential family; (2) a linear predictor Xβ; (3) a link function connecting the linear predictor to the response's mean | — |
| R2 | recall | mcq | 0.61 | Linear, logistic, and Poisson regression differ primarily in: | which exponential-family distribution is assumed for the response, and correspondingly which link function is used | claims "they're actually the same model with different names" — missing the genuine distributional differences unified only by the shared framework → `glm` |
| A1 | apply | short-answer | 1.11 | Match each response/link pair to its method: (a) Normal, identity link (b) Bernoulli, logit link (c) Poisson, log link. | (a) ordinary linear regression (b) logistic regression (c) Poisson regression (count data) | — |
| E1 | explain | short-answer | 1.81 | Why is restricting GLM to exponential-family responses essential, not incidental? | `exponential-family`'s natural parameter η(θ) is exactly what makes one generic fitting algorithm (iteratively reweighted least squares) work for any member of the family without distribution-specific code — precisely the practical payoff that concept's T1 anticipated in the probability sweep *(required: the direct reuse of that earlier concept's forward-pointer)* | — |
| T1 | transfer | short-answer | 2.31 | Why does understanding the GLM framework let a practitioner adapt quickly to a new outcome type? | once the three-part structure (response distribution, linear predictor, link function) is understood, swapping the response distribution (e.g. Normal to Poisson) is a natural, incremental change rather than learning an entirely new toolset from scratch *(required: names the "swap one component, keep the structure" framing)* | — |

*Coverage: 5 items, 0.31…2.31.*

---

## Cox Proportional Hazards Model (`cox-proportional-hazards-model`)
*Prereq: GLM · ancestors 37 · b₀ = 1.32*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.32 | State the Cox model's hazard function. | h(t\|X) = h₀(t)·exp(Xβ) — a baseline hazard (depending only on time) times a proportional factor depending on covariates | — |
| R2 | recall | mcq | 0.62 | The "proportional hazards" assumption means: | the hazard ratio between two individuals with different covariates stays constant over time | claims "the hazard is constant over time for everyone" — that describes a constant baseline hazard specifically, not the proportionality assumption naming the model → `cox-proportional-hazards-model` |
| A1 | apply | short-answer | 1.12 | Why can h₀(t) be left completely unspecified, and what does that make the model? | covariate effects (β) can be estimated without assuming any particular parametric shape for the baseline hazard — this is exactly what makes Cox regression "semi-parametric," a genuine robustness property *(required: names semi-parametric and the robustness payoff)* | — |
| E1 | explain | short-answer | 1.82 | Why does Cox regression handle censored data naturally, unlike ordinary regression? | its likelihood is built specifically to incorporate the information that a censored subject's event time is *known to exceed* some observed value, even without the exact time — rather than discarding or mistreating that partial information the way ordinary regression would *(required: the explicit "known to exceed" partial-information argument)* | — |
| T1 | transfer | short-answer | 2.32 | How does Cox regression still connect to the GLM structure despite being semi-parametric? | it retains a linear predictor Xβ and a log-link-style structure (exp(Xβ)) multiplying the baseline hazard, preserving the "linear predictor through a link function" pattern even while relaxing the fully-parametric response-distribution assumption GLMs otherwise require *(required: names both the retained linear-predictor structure and the relaxed assumption)* | — |

*Coverage: 5 items, 0.32…2.32. This is the final concept of the regression domain.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| clustered/repeated-measures data treated as satisfying independence | `mixed-effect-models` |
| logistic regression's coefficients estimated via OLS rather than MLE | `logistic-regression` |
| logistic and probit predictions assumed identical rather than merely similar | `probit-regression` |
| GLM's shared response distributions treated as making the methods identical | `glm` |
| proportional-hazards assumption confused with a constant-hazard assumption | `cox-proportional-hazards-model` |

**Cluster total: 25 items across 5 concepts.** All numeric claims verified.

---

# Regression: complete

**29 / 29 concepts done.** Total items across all 5 clusters: **~145**.
