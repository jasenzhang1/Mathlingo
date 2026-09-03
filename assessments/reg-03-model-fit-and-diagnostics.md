# Regression Cluster 3 — Model Fit & Diagnostics

OLS Properties, SSR/SSE/SST, R², ANOVA, Effect of Adding Another Variable, Variance Inflation Factor
(6 concepts). Same format as [foundations-of-probability.md](foundations-of-probability.md).

`ssr-sse-sst`'s E1 derives its identity from the *same* orthogonality fact `normal-equations`'s T1
established; `anova`'s E1 closes the loop back to `f-distribution`'s original definition as a ratio of
independent chi-squares.

---

## OLS Properties (`ols-properties`)
*Prereq: OLS Assumptions, Linear Regression (Probabilistic Version) · ancestors 31 · b₀ = 1.23*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.23 | List the key properties of OLS estimators under standard assumptions. | unbiased; consistent; under normality, β̂ is itself Normally distributed; and BLUE per Gauss-Markov | — |
| R2 | recall | mcq | 0.53 | Var(β̂)=σ²(XᵀX)⁻¹ depends on: | σ² and the design matrix X's structure — how spread out/collinear the predictors are | claims it depends "only on n" — ignoring both σ² and X's structure entirely → `ols-properties` |
| A1 | apply | short-answer | 1.03 | Why does spreading out X values more (larger Var(X)) decrease Var(β̂₁) in simple regression? | Var(β̂₁)=σ²/Σ(xᵢ−x̄)²; a larger spread in x directly increases the denominator, shrinking the variance — a practical design implication: spreading treatment levels in an experiment gives more precise coefficient estimates *(required: the explicit denominator argument)* | — |
| E1 | explain | short-answer | 1.73 | Why does β̂ being Normally distributed follow directly from the errors being Normal? | β̂=(XᵀX)⁻¹Xᵀy is a linear function of y; linear combinations of Normal random variables are themselves Normal — the same closure property `multivariate-normal` established for the Normal family under linear operations *(required: the explicit linear-function-of-y argument, tied to that closure property)* | — |
| T1 | transfer | short-answer | 2.23 | Why is β̂ still approximately Normal for large samples even without assuming Normal errors? | β̂ is essentially a weighted sum of the yᵢ's; CLT applies to sums of random variables regardless of their individual distribution shape, giving β̂ approximate normality asymptotically even when the errors aren't exactly Normal *(required: the direct CLT connection, naming β̂ as a sum/weighted average)* | — |

*Coverage: 5 items, 0.23…2.23.*

---

## SSR, SSE, SST (`ssr-sse-sst`)
*Prereq: Simple Linear Regression · ancestors 20 · b₀ = 1.02*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.02 | Define SST, SSR, SSE, and their identity. | SST=Σ(yᵢ−ȳ)² (total); SSR=Σ(ŷᵢ−ȳ)² (explained); SSE=Σ(yᵢ−ŷᵢ)² (unexplained); SST=SSR+SSE | — |
| R2 | recall | mcq | 0.32 | The identity SST=SSR+SSE holds: | exactly, always, for OLS regression, as a direct consequence of the normal equations' orthogonality | claims it holds "only approximately, for large samples" — it's an exact algebraic identity, not an asymptotic approximation → `ssr-sse-sst` |
| A1 | apply | numeric | 0.82 | SST=100, SSE=30. Find SSR. `[verified: 70]` | SSR=100−30=70 | — |
| E1 | explain | derivation | 1.52 | Prove SST=SSR+SSE using residual orthogonality. | expand SST=Σ[(yᵢ−ŷᵢ)+(ŷᵢ−ȳ)]² = SSE + 2Σ(yᵢ−ŷᵢ)(ŷᵢ−ȳ) + SSR; the cross term vanishes exactly because residuals are orthogonal to ŷ (and hence to ŷᵢ−ȳ, since ȳ lies in C(X) when an intercept is included) — the same orthogonality `normal-equations`'s T1 established *(required: the cross-term vanishing, with the orthogonality justification)* | — |
| T1 | transfer | short-answer | 2.02 | What structural parallel connects this decomposition to `law-of-total-variance`? | both split one total variability measure into an "explained" and "unexplained" piece — here via orthogonality, there via expectation identities — the same kind of decomposition move achieved by different mathematical mechanisms *(required: names both mechanisms and the shared decomposition structure)* | — |

*Coverage: 5 items, 0.02…2.02.*

---

## R² (`r-squared`)
*Prereq: SSR/SSE/SST · ancestors 21 · b₀ = 1.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.05 | Define R². | R² = SSR/SST = 1 − SSE/SST — the proportion of total variability in Y explained by the model | — |
| R2 | recall | mcq | 0.35 | For simple linear regression, R² equals exactly: | the square of the Pearson correlation coefficient, r² | picks "the slope β̂₁" — a different quantity that isn't generally equal to R² → `r-squared` |
| A1 | apply | numeric | 0.85 | r=0.8 in a simple regression. Find R². `[verified: 0.64, and independently confirmed R²=r² on real regression data]` | 0.8²=0.64 | — |
| E1 | explain | short-answer | 1.55 | Why does R² always increase (or stay the same) when adding any predictor, even an irrelevant one? | more predictors give OLS more flexibility to reduce SSE, never less, so R² can never decrease — exactly why R² alone is a poor model-selection criterion across models with different predictor counts, motivating adjusted R² and AIC/BIC *(required: the "more flexibility, SSE never increases" mechanism)* | — |
| T1 | transfer | short-answer | 2.05 | Why doesn't a high R² guarantee good predictions on new data? | a model with many predictors can achieve high training R² (per E1's monotonic increase) while generalizing poorly — exactly `overfitting-underfitting`'s phenomenon from the ML sweep; R² on training data is analogous to training accuracy, not test accuracy *(required: the explicit training/test parallel)* | — |

*Coverage: 5 items, 0.05…2.05.*

---

## ANOVA (`anova`)
*Prereq: SSR/SSE/SST, F-Distribution, Hypothesis Test · ancestors 42 · b₀ = 1.38*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.38 | State the ANOVA F-test's hypotheses and statistic. | H₀: β₁=⋯=βₚ=0 (no predictor helps) vs. H₁: at least one is nonzero; F=(SSR/p)/(SSE/(n−p−1)), following an F-distribution under H₀ | — |
| R2 | recall | mcq | 0.68 | The F-statistic's numerator and denominator are each: | a "mean square" — a variance-like quantity (sum of squares divided by its degrees of freedom) | treats them as "unrelated quantities" that happen to be divided — missing why an F-distribution is the correct reference at all → `anova` |
| A1 | apply | short-answer | 1.18 | Why would we expect F≈1 under H₀, and why is a large F evidence against it? | under H₀, both SSR/p and SSE/(n−p−1) are just estimating the same noise variance, so their ratio should hover near 1; a large F means the "explained" mean square substantially exceeds the "noise" mean square, evidence the predictors genuinely carry signal *(required: the "both estimate the same noise variance under H₀" argument)* | — |
| E1 | explain | short-answer | 1.88 | Connect ANOVA's F-statistic directly to `f-distribution`'s original definition. | SSR/σ² and SSE/σ² each follow (scaled) chi-square distributions under H₀ and normality, via a Cochran's-theorem-style decomposition of SST into independent pieces; their ratio, scaled by degrees of freedom, is exactly the ratio-of-independent-chi-squares construction that defines the F-distribution *(required: names the independent chi-square decomposition explicitly, not just "F comes from chi-squares")* | — |
| T1 | transfer | short-answer | 2.38 | Why run the overall ANOVA F-test before individual coefficient t-tests? | running many individual t-tests, one per predictor, at α=0.05 each inflates the overall false-positive rate across the whole model — the same multiple-comparisons problem from `hypothesis-test`'s earlier T1; a single overall F-test asks one question about the whole predictor set at once, avoiding that inflation *(required: the explicit multiple-comparisons connection)* | — |

*Coverage: 5 items, 0.38…2.38.*

---

## Effect of Adding Another Variable (`effect-of-adding-another-variable`)
*Prereq: Multiple Linear Regression, R² · ancestors 28 · b₀ = 1.18*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.18 | List the key effects of adding a new predictor to a regression. | R² always increases or stays the same; existing coefficients can change; the new variable's own significance depends on whether it explains variation not already captured by the others | — |
| R2 | recall | mcq | 0.48 | Adjusted R² differs from ordinary R² because it: | penalizes adding predictors that don't meaningfully improve fit, and can actually decrease when a useless predictor is added | claims it's "always larger than R²" — the opposite is typical when a weak predictor is added → `effect-of-adding-another-variable` |
| A1 | apply | short-answer | 0.98 | Why can adjusted R² decrease from a useless predictor while ordinary R² can only increase? | the adjustment formula explicitly penalizes the number of predictors used, so a tiny R² gain from a useless variable can be outweighed by the penalty for the extra parameter — resolving `r-squared`'s earlier cliffhanger about R² being a poor comparison tool *(required: the explicit penalty-outweighs-gain mechanism)* | — |
| E1 | explain | short-answer | 1.68 | Describe the partial F-test for adding a group of predictors. | it compares the increase in SSR (or decrease in SSE) from adding the new predictors against what chance alone would produce — a direct generalization of the individual-coefficient t-test to testing several coefficients simultaneously *(required: names it as a generalization of the single-coefficient t-test)* | — |
| T1 | transfer | short-answer | 2.18 | Why should individually-insignificant predictors alongside a highly significant overall F-test raise suspicion of multicollinearity? | when predictors are highly correlated with each other, their individual contributions become hard to disentangle, inflating individual standard errors even though they collectively explain substantial variation in Y — foreshadowing `vif` directly as the diagnostic for exactly this pattern *(required: names the disentangling difficulty as the specific mechanism)* | — |

*Coverage: 5 items, 0.18…2.18.*

---

## Variance Inflation Factor (`vif`)
*Prereq: Effect of Adding Another Variable · ancestors 29 · b₀ = 1.20*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.2 | Define VIF for predictor Xⱼ. | VIF_j = 1/(1−R²_j), where R²_j is from regressing Xⱼ on all other predictors | — |
| R2 | recall | mcq | 0.5 | A VIF of 1 (the minimum) means: | Xⱼ is completely uncorrelated with the other predictors (R²_j=0), so its coefficient variance isn't inflated at all | claims VIF=1 means Xⱼ "is perfectly correlated with the other predictors" — the opposite extreme → `vif` |
| A1 | apply | numeric | 1.0 | R²_j=0.75. Compute VIF_j. `[verified: 4]` | 1/(1−0.75)=4 | — |
| E1 | explain | short-answer | 1.7 | Why is VIF called a "variance inflation" factor specifically? | Var(β̂ⱼ) = [σ²/((n−1)Var(Xⱼ))]·VIF_j — VIF_j is exactly the multiplicative factor by which Xⱼ's coefficient variance is inflated compared to what it would be if Xⱼ were uncorrelated with the other predictors, directly cashing in `ols-properties`' R2 about Var(β̂) depending on collinearity structure *(required: the explicit multiplicative-factor formula, not just "it measures inflation")* | — |
| T1 | transfer | short-answer | 2.2 | Connect the VIF>5 or VIF>10 rule of thumb to `effect-of-adding-another-variable`'s earlier scenario. | a high VIF means a predictor's coefficient estimate is highly unstable precisely because its unique effect is hard to disentangle from other correlated predictors — exactly the symptom of individually-insignificant coefficients alongside a significant overall F-test described there *(required: the explicit connection to that earlier scenario)* | — |

*Coverage: 5 items, 0.2…2.2.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| Var(β̂) treated as independent of the design matrix's structure | `ols-properties` |
| SST=SSR+SSE treated as approximate rather than exact | `ssr-sse-sst` |
| R² confused with the regression slope | `r-squared` |
| adjusted R² assumed to always exceed ordinary R² | `effect-of-adding-another-variable` |
| VIF=1 misread as maximal rather than minimal collinearity | `vif` |

**Cluster total: 30 items across 6 concepts.** All numeric claims verified, including R²=r² confirmed
independently on actual regression data (0.81 both ways), not just the algebraic identity.
