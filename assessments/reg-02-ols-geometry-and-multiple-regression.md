# Regression Cluster 2 — OLS Geometry & Multiple Regression

Geometric Interpretation of OLS, Multiple Linear Regression, Linear Regression (Probabilistic
Version), OLS Assumptions, Homoskedasticity (5 concepts). Same format as
[foundations-of-probability.md](foundations-of-probability.md).

`linear-regression-probabilistic-version`'s R2 is the regression-domain twin of `cross-entropy-loss`'s
MLE identity from the ML sweep — OLS *is* an MLE, not merely inspired by one — and its T1 explains why
that reframing is exactly what makes `logistic-regression` and `glm` (later in this domain) natural
extensions rather than unrelated methods.

---

## Geometric Interpretation of OLS (`geometric-interpretation-of-ols`)
*Prereq: Normal Equations, Column Space, Vector Projection · ancestors 33 · b₀ = 1.26*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.26 | State the geometric picture of OLS. | ŷ=Xβ̂ is the orthogonal projection of y onto C(X); the residual (y−ŷ) is the component of y orthogonal to C(X) | — |
| R2 | recall | mcq | 0.56 | The hat matrix H=X(XᵀX)⁻¹Xᵀ (with ŷ=Hy) is: | a projection matrix — idempotent (H²=H) and symmetric | dismisses H as "an arbitrary computational convenience," missing its precise characterization → `geometric-interpretation-of-ols` |
| A1 | apply | derivation | 1.06 | Verify H is idempotent symbolically. `[verified numerically: max|H²-H|≈0]` | H² = X(XᵀX)⁻¹XᵀX(XᵀX)⁻¹Xᵀ = X(XᵀX)⁻¹(XᵀX)(XᵀX)⁻¹Xᵀ = X(XᵀX)⁻¹Xᵀ = H — the middle (XᵀX)(XᵀX)⁻¹ cancels to the identity *(required: the explicit cancellation step)* | — |
| E1 | explain | short-answer | 1.76 | Why does H²=H make geometric sense, independent of the algebra? | projecting a vector already in the target subspace (like ŷ, already in C(X)) leaves it unchanged — projecting twice gives the same result as projecting once, exactly what H(Hy)=Hy states *(required: the "already in the subspace" argument)* | — |
| T1 | transfer | short-answer | 2.26 | Why does trace(H) equal exactly p, and what practical quantity does that give? `[verified numerically: trace=2=p for a 4x2 example]` | H's eigenvalues satisfy λ²=λ (from H²=H applied to an eigenvector), forcing λ∈{0,1}; trace(H) sums the eigenvalues, which equals the count of 1's — exactly rank(H)=rank(X)=p; this is used practically as the model's "effective number of parameters," or degrees of freedom used *(required: the eigenvalue-restriction argument, reusing `trace`'s cyclic-property spirit)* | — |

*Coverage: 5 items, 0.26…2.26.*

---

## Multiple Linear Regression (`multiple-linear-regression`)
*Prereq: Normal Equations · ancestors 25 · b₀ = 1.13*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.13 | State the multiple regression model, and how the normal equations extend to it. | Y=β₀+β₁X₁+⋯+βₚXₚ+ε; the same XᵀXβ̂=Xᵀy applies, with X now having multiple columns | — |
| R2 | recall | mcq | 0.43 | βⱼ in multiple regression is interpreted as: | the effect of Xⱼ holding all other predictors constant (the partial effect) | claims βⱼ is "always the same as in a simple regression using only Xⱼ" — a common and consequential error, since correlated predictors can change coefficients dramatically → `multiple-linear-regression` |
| A1 | apply | short-answer | 0.93 | Describe a scenario where a predictor's coefficient *changes sign* moving from simple to multiple regression. | X alone might show a positive association with Y, but once a correlated confounder Z is added, X's coefficient can flip sign if Z was masking or reversing the true relationship — a classic sign of confounding or suppression *(required: a concrete confounding mechanism, not just "coefficients can change")* | — |
| E1 | explain | short-answer | 1.63 | Why does adding a correlated predictor change the *other* predictors' coefficients, not just add a new one? | each coefficient captures the unique contribution of that variable after accounting for its overlap with the others; adding a new correlated variable reshuffles how much "credit" each existing variable gets for the shared variation *(required: the "credit reshuffling" mechanism)* | — |
| T1 | transfer | short-answer | 2.13 | How is a multiple regression coefficient conceptually similar to a conditional/partial relationship, connecting to `schur-complement`? | βⱼ represents the relationship between Xⱼ and Y *after removing* what's explained by the other predictors — structurally the same operation the Schur complement performs when computing a conditional covariance by removing what one block predicts about another *(required: the explicit Schur-complement parallel)* | — |

*Coverage: 5 items, 0.13…2.13.*

---

## Linear Regression, Probabilistic Version (`linear-regression-probabilistic-version`)
*Prereq: Multiple Linear Regression, MLE, Normal Distribution · ancestors 29 · b₀ = 1.20*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.2 | State the probabilistic linear regression model. | Y\|X ~ Normal(Xβ, σ²), equivalently ε ~ Normal(0, σ²) | — |
| R2 | recall | mcq | 0.5 | Under this model, the OLS estimator β̂ is exactly: | the Maximum Likelihood Estimator (MLE) for β | calls it "an arbitrary, unrelated estimator" — missing the exact identity, the regression-domain twin of `cross-entropy-loss`'s MLE connection → `linear-regression-probabilistic-version` |
| A1 | apply | short-answer | 1.0 | Why is maximizing this model's likelihood equivalent to minimizing the sum of squared residuals? `[verified: log-likelihood has term -(1/2σ²)Σ(y-Xβ)², so maximizing over β = minimizing Σ(y-Xβ)²]` | the Normal log-likelihood contains the term −(1/(2σ²))Σ(yᵢ−xᵢᵀβ)²; maximizing likelihood over β means making this term least negative, which is exactly minimizing Σ(yᵢ−xᵢᵀβ)² *(required: the explicit log-likelihood term, not just "they're related")* | — |
| E1 | explain | short-answer | 1.7 | Why is this probabilistic reframing practically important, beyond elegance? | it provides the sampling distribution needed to derive confidence intervals and hypothesis tests for β, connecting to `fisher-information` and `cramer-rao-lower-bound` from the probability/statistics sweep — something the purely geometric "minimize squared error" view never directly supplies *(required: names the CI/hypothesis-test payoff and at least one of those earlier concepts)* | — |
| T1 | transfer | short-answer | 2.2 | Why does this MLE framing generalize naturally to `logistic-regression` and `glm` later in this domain, in a way the geometric view doesn't? | once regression is framed as maximizing a likelihood, swapping the Normal assumption for a different one (Bernoulli, for logistic regression) is a natural extension of the same machinery; the purely geometric "minimize squared error" framing has no obvious analogous generalization to binary outcomes *(required: names the swap-the-distribution generalization explicitly)* | — |

*Coverage: 5 items, 0.2…2.2.*

---

## OLS Assumptions (`ols-assumptions`)
*Prereq: Multiple Linear Regression · ancestors 26 · b₀ = 1.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.15 | List the key OLS assumptions. | linearity; independent errors; homoskedasticity (constant error variance); normality of errors (for exact inference); no perfect multicollinearity | — |
| R2 | recall | mcq | 0.45 | Violating normality specifically: | doesn't bias coefficient estimates (still unbiased under weaker Gauss-Markov conditions) but affects the validity of exact CIs/tests, though CLT often rescues this for large n | claims it "makes OLS coefficient estimates themselves biased" — a common, consequential over-attribution of normality's role → `ols-assumptions` |
| A1 | apply | short-answer | 0.95 | Is homoskedasticity needed for OLS coefficients to be unbiased? | no — unbiasedness follows from the weaker Gauss-Markov conditions; homoskedasticity is needed for OLS to be the *minimum-variance* unbiased estimator and for standard standard-error formulas to be correct *(required: distinguishes unbiasedness from efficiency/correct SEs)* | — |
| E1 | explain | short-answer | 1.65 | Why are residual plots the standard tool for checking these assumptions? | violations often show up as visible patterns (a funnel shape for heteroskedasticity, a curved pattern for nonlinearity) that are far easier to spot visually than to detect from the coefficient estimates alone *(required: at least one concrete pattern example)* | — |
| T1 | transfer | short-answer | 2.15 | Why is violating linearity often considered the most serious assumption failure among these? | if the true relationship isn't linear, OLS doesn't just get the standard errors wrong (a fixable inference problem) — it produces systematically biased estimates of a fundamentally misspecified model, giving misleading predictions and interpretations regardless of sample size *(required: contrasts this with the "fixable inference" failures of the other assumptions)* | — |

*Coverage: 5 items, 0.15…2.15.*

---

## Homoskedasticity (`homoskedasticity`)
*Prereq: OLS Assumptions · ancestors 27 · b₀ = 1.17*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.17 | Define homoskedasticity and its opposite. | Var(ε\|X) is constant across all X; heteroskedasticity is when this variance changes with X | — |
| R2 | recall | mcq | 0.47 | A classic example of heteroskedasticity is: | income prediction, where error variance tends to be larger for high-income individuals | claims heteroskedasticity "never occurs in real data" — it's extremely common → `homoskedasticity` |
| A1 | apply | short-answer | 0.97 | A residual-vs-fitted plot shows a clear funnel shape, spread increasing with fitted value. For or against homoskedasticity? | against — this is the classic visual signature of heteroskedasticity, increasing variance with the fitted value | — |
| E1 | explain | short-answer | 1.67 | Why does heteroskedasticity, despite not biasing coefficient estimates, make standard OLS standard-error formulas wrong? | the standard Var(β̂) formula assumes a constant σ² throughout its derivation; when true variance varies with X, that formula gives an incorrect (often too small) estimate of true uncertainty, producing overly narrow, overconfident confidence intervals *(required: names the "assumes constant σ² in the derivation" mechanism)* | — |
| T1 | transfer | short-answer | 2.17 | Explain robust ("heteroskedasticity-consistent") standard errors, and why practitioners often use them as a default safeguard. | robust standard errors (e.g. White's estimator) give valid uncertainty estimates even under heteroskedasticity of unknown form, without needing to specify exactly how the variance changes with X; because they cost little when homoskedasticity actually holds, many practitioners default to them as a safeguard regardless of whether heteroskedasticity is confirmed present *(required: names that the specific form of heteroskedasticity need not be known)* | — |

*Coverage: 5 items, 0.17…2.17.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| hat matrix treated as an arbitrary computational device rather than a projection | `geometric-interpretation-of-ols` |
| multiple-regression coefficients assumed stable when adding correlated predictors | `multiple-linear-regression` |
| OLS/MLE connection treated as coincidental rather than exact | `linear-regression-probabilistic-version` |
| normality violation conflated with biased coefficient estimates | `ols-assumptions` |
| heteroskedasticity assumed rare or negligible in practice | `homoskedasticity` |

**Cluster total: 25 items across 5 concepts.** All numeric claims verified, including hat-matrix
idempotency and trace(H)=p confirmed to machine precision on a concrete 4×2 example.
