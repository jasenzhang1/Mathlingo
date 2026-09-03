# Regression Cluster 4 — Model Selection & Regularization

AIC/BIC, Forward/Backward/Stepwise Selection, Regularization, LASSO, Ridge Regression, Elastic Net,
LOESS Smoothing (7 concepts). Same format as [foundations-of-probability.md](foundations-of-probability.md).

`lasso` and `ridge-regression` both cash in `vector-norm`'s diamond-vs-circle geometric argument from
the linear-algebra sweep directly, and `ridge-regression`'s A1 verifies numerically that the ridge
shift repairs a genuinely singular X'X.

---

## AIC, BIC (`aic-bic`)
*Prereq: Linear Regression (Probabilistic Version) · ancestors 30 · b₀ = 1.22*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.22 | State AIC and BIC, and their general behavior. | AIC=2k−2ln(L̂); BIC=k·ln(n)−2ln(L̂); both penalize complexity (k) while rewarding fit (likelihood); lower values indicate better models | — |
| R2 | recall | mcq | 0.52 | Compared to AIC, BIC's per-parameter penalty is: | generally larger for reasonably-sized samples (since ln(n)>2 for n>7), favoring simpler models more strongly | claims the penalties are "identical" — missing the ln(n) vs. fixed-2 distinction entirely → `aic-bic` |
| A1 | apply | short-answer | 1.02 | Why does BIC's penalty grow with n while AIC's stays fixed, and what does this imply asymptotically? | BIC's ln(n) term grows without bound, making it increasingly strict about adding parameters as n→∞ — a property called consistency, favoring the true parsimonious model asymptotically; AIC's fixed penalty of 2 per parameter lacks this property and can overfit even with unlimited data *(required: names consistency and AIC's lack of it)* | — |
| E1 | explain | short-answer | 1.72 | Why do AIC/BIC provide a principled alternative to comparing raw likelihood or R² across models with different parameter counts? | per `r-squared`'s finding that R² always increases with more parameters, comparing raw fit metrics directly always favors bigger models; AIC/BIC explicitly subtract a complexity penalty, so a bigger model must achieve a *meaningfully* better fit, not just any improvement, to be preferred *(required: the direct callback to R²'s monotonic-increase problem)* | — |
| T1 | transfer | short-answer | 2.22 | Why might a practitioner prefer AIC when prediction is the goal, and BIC when identifying the "true" model is the goal? | AIC is justified as approximately minimizing prediction error on new data (related to minimizing KL-divergence between the fitted model and the true data-generating distribution); BIC is justified as approximating Bayesian model selection, favoring the model with highest posterior probability — different theoretical goals suit different practical objectives *(required: names the KL-divergence connection for AIC specifically)* | — |

*Coverage: 5 items, 0.22…2.22.*

---

## Forward, Backward, Stepwise Selection (`forward-backward-stepwise-selection`)
*Prereq: AIC/BIC · ancestors 31 · b₀ = 1.23*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.23 | Describe forward selection, backward elimination, and stepwise selection. | forward: start with no predictors, add the one most improving the criterion each step; backward: start with all predictors, remove the least useful each step; stepwise: a hybrid allowing both adds and removes | — |
| R2 | recall | mcq | 0.53 | A key limitation shared by all three is: | being greedy, they can get stuck in a locally good but not globally optimal predictor subset | claims they're "guaranteed to find the globally best subset" — the opposite of their actual, well-known limitation → `forward-backward-stepwise-selection` |
| A1 | apply | short-answer | 1.03 | Describe a scenario where forward selection misses the best pair of predictors. | two predictors that are individually useless but powerfully predictive together (an interaction effect) — forward selection, evaluating one variable at a time, may never add either since neither improves the criterion much alone, missing the joint benefit entirely *(required: the specific interaction-effect scenario)* | — |
| E1 | explain | short-answer | 1.73 | Why can backward elimination be infeasible with very many candidate predictors? | it requires fitting the full model with all predictors first, which is expensive or outright impossible if there are more predictors than observations, per `rank`'s bound making the design matrix singular in that regime; forward selection avoids this by never needing the full model *(required: the explicit rank/singularity connection)* | — |
| T1 | transfer | short-answer | 2.23 | Why are modern alternatives like LASSO often preferred over stepwise selection? | LASSO performs variable selection continuously through a single optimization, shrinking some coefficients exactly to zero, rather than a sequence of discrete greedy include/exclude decisions — generally giving more stable results where small data changes are less likely to completely change which variables are selected *(required: the continuous-vs-discrete-decisions contrast)* | — |

*Coverage: 5 items, 0.23…2.23.*

---

## Regularization (`regularization`)
*Prereq: Multiple Linear Regression, Bias-Variance Tradeoff · ancestors 29 · b₀ = 1.20*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.2 | Describe regularization's basic mechanism. | add a penalty term to the regression objective discouraging large coefficients, trading a little bias for a reduction in variance | — |
| R2 | recall | mcq | 0.5 | Regularization is particularly useful when: | there are many predictors (possibly more than observations) or predictors are highly correlated — situations where OLS becomes unstable/high-variance | picks the opposite scenario ("few predictors, none correlated") — exactly when regularization is least needed → `regularization` |
| A1 | apply | short-answer | 1.0 | Why does penalizing large coefficients help when predictors are highly correlated? | per `vif`'s finding that Var(β̂) inflates with collinearity, the penalty "reins in" the wildly unstable coefficient estimates multicollinearity would otherwise produce, trading some bias for a large variance reduction *(required: the explicit VIF-inflation callback)* | — |
| E1 | explain | short-answer | 1.7 | Describe the general regularized objective and the role of λ. | minimize [SSE + λ·(penalty on β)]; at λ=0 this reduces to ordinary OLS; as λ→∞, coefficients are pushed toward (or exactly to) zero; λ is chosen via cross-validation, a hyperparameter rather than something learned directly from training data alone, per `hyperparameters`' earlier warning *(required: both extremes of λ and the hyperparameter framing)* | — |
| T1 | transfer | short-answer | 2.2 | How does regularization explicitly implement the bias-variance tradeoff? | a regularized model deliberately accepts increased bias (β̂ is no longer unbiased once λ>0) in exchange for reduced variance, and the optimal λ chosen via CV is precisely the value minimizing *total* expected error (bias²+variance), not bias or variance alone *(required: names that the optimum balances the total, not either term individually)* | — |

*Coverage: 5 items, 0.2…2.2.*

---

## LASSO (`lasso`)
*Prereq: Regularization · ancestors 30 · b₀ = 1.22*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.22 | State LASSO's penalty term. | λΣ\|βⱼ\| — the L1 norm of the coefficients | — |
| R2 | recall | mcq | 0.52 | LASSO's distinctive property is: | it can shrink some coefficients exactly to zero, performing automatic variable selection | claims it "never shrinks coefficients" — the opposite of its defining behavior → `lasso` |
| A1 | apply | short-answer | 1.02 | Using `vector-norm`'s diamond-shaped L1 level sets, explain why LASSO's solutions often land exactly on a corner (a coefficient = 0). | the L1 constraint region is a diamond with corners on the coordinate axes; the optimal point where a loss contour first touches this region is disproportionately likely to land exactly on a corner, unlike ridge's smooth circular region, which has no corners *(required: the direct reuse of that geometric argument, not a fresh justification)* | — |
| E1 | explain | short-answer | 1.72 | Why is LASSO's automatic selection especially useful when p≫n and only a few predictors are truly relevant? | per `curse-of-dimensionality`'s earlier discussion, high-dimensional data with a "sparse" true signal benefits from a principled, automatic way to discard irrelevant dimensions — exactly what LASSO's zero-coefficient behavior provides *(required: the explicit sparsity/high-dimensionality connection)* | — |
| T1 | transfer | short-answer | 2.22 | Describe LASSO's limitation with groups of highly correlated relevant predictors, and what it motivates. | LASSO tends to arbitrarily pick one correlated predictor and zero out the others, rather than keeping all with smaller coefficients — undesirable for interpretation, since which variable "wins" can be unstable across different samples of the same data; this limitation motivates `elastic-net`, covered next *(required: names the arbitrary-selection instability specifically)* | — |

*Coverage: 5 items, 0.22…2.22.*

---

## Ridge Regression (`ridge-regression`)
*Prereq: Regularization · ancestors 30 · b₀ = 1.22*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.22 | State ridge's penalty term. | λΣβⱼ² — the squared L2 norm of the coefficients | — |
| R2 | recall | mcq | 0.52 | Unlike LASSO, ridge regression: | shrinks all coefficients smoothly toward zero, generally without setting any exactly to zero | claims it "performs automatic variable selection" — that's LASSO's distinguishing property, not ridge's → `ridge-regression` |
| A1 | apply | derivation | 1.02 | β̂_ridge=(XᵀX+λI)⁻¹Xᵀy. Why does adding λI fix the singularity that multicollinearity can cause? `[verified: det(XtX)=0 for a collinear example, det(XtX+0.1I)=15.01, no longer singular]` | XᵀX is always positive semi-definite (eigenvalues ≥0); adding λI shifts every eigenvalue up by λ>0, guaranteeing strict positive definiteness — hence invertibility — regardless of whether XᵀX alone was singular *(required: the eigenvalue-shift argument, reusing `positive-definite-matrices`' eigenvalue characterization)* | — |
| E1 | explain | short-answer | 1.72 | How do ridge's two extremes (λ→0 and λ→∞) connect to the bias-variance tradeoff? | λ=0 recovers OLS exactly (low bias, high variance); λ→∞ shrinks all coefficients toward zero (predicting a constant — high bias, near-zero variance) — the two extremes of the bias-variance spectrum, with useful models living in between *(required: both extremes explicitly named)* | — |
| T1 | transfer | short-answer | 2.22 | Why might ridge be preferred over LASSO when predictors are highly correlated and most/all are genuinely relevant? | unlike LASSO's tendency (per `lasso`'s T1) to arbitrarily pick one correlated predictor and zero the rest, ridge shrinks correlated predictors' coefficients together and similarly, often giving more stable, interpretable results when sparsity isn't the right assumption *(required: the explicit contrast with LASSO's arbitrary-selection behavior)* | — |

*Coverage: 5 items, 0.22…2.22.*

---

## Elastic Net (`elastic-net`)
*Prereq: LASSO, Ridge Regression · ancestors 32 · b₀ = 1.25*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.25 | State elastic net's penalty. | λ[α·Σ\|βⱼ\| + (1−α)·Σβⱼ²] — a weighted mix of LASSO and ridge, α controlling the blend (α=1 pure LASSO, α=0 pure ridge) | — |
| R2 | recall | mcq | 0.55 | Elastic net is designed to combine: | LASSO's variable-selection ability and ridge's stability with correlated predictors | claims it combines "neither LASSO's nor ridge's properties" — missing the entire point of the hybrid design → `elastic-net` |
| A1 | apply | short-answer | 1.05 | Why does elastic net tend to select or shrink correlated predictors together, rather than arbitrarily picking one (LASSO's tendency)? | the ridge component of the penalty discourages the wild, arbitrary differentiation between correlated predictors that pure LASSO can exhibit, producing a "grouping effect" instead *(required: names the ridge component as the specific mechanism resolving LASSO's T1 limitation)* | — |
| E1 | explain | short-answer | 1.75 | Why does elastic net cost more to properly tune than LASSO or ridge alone? | it introduces an additional hyperparameter α alongside λ, requiring a 2-dimensional cross-validation grid search rather than a 1-dimensional one, per `hyperparameters`' earlier discussion of tuning cost — a genuine practical cost of its added flexibility *(required: names the 2D grid search specifically)* | — |
| T1 | transfer | short-answer | 2.25 | What general lesson about regularization does elastic net illustrate? | different penalty shapes (L1's diamond vs. L2's circle, per `vector-norm`'s geometric argument) produce different shrinkage behaviors (sparse vs. smooth), and a method designer can combine penalty shapes to trade off between their respective strengths — a principle extending well beyond just LASSO/ridge to other regularization schemes in modern ML *(required: names the general combine-penalty-shapes principle, not just elastic net's specific formula)* | — |

*Coverage: 5 items, 0.25…2.25.*

---

## LOESS Smoothing (`loess-smoothing`)
*Prereq: Simple Linear Regression · ancestors 20 · b₀ = 1.02*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.02 | Describe LOESS. | fit a separate, simple regression locally around each point of interest, using nearby data weighted by distance — a nonparametric alternative to one global regression line | — |
| R2 | recall | mcq | 0.32 | LOESS is "nonparametric" because it: | doesn't assume a single, fixed global functional form — the fitted curve's shape adapts locally to whatever pattern the data shows | claims it "has no parameters whatsoever" — LOESS still has local regression coefficients at each fitted point, just no single global form → `loess-smoothing` |
| A1 | apply | short-answer | 0.82 | Why does LOESS need a bandwidth/span hyperparameter, and how does it connect to `rbf`'s bandwidth σ? | it controls how many nearby points to include and how much weight distant points get; exactly parallel to RBF's σ from the ML sweep — small bandwidth gives a wiggly, low-bias/high-variance fit (like small-K KNN or small-σ RBF), large bandwidth gives a smooth, high-bias/low-variance fit *(required: the explicit RBF-bandwidth parallel)* | — |
| E1 | explain | short-answer | 1.52 | Why can LOESS capture nonlinear relationships a single global linear regression cannot? | fitting different local lines/curves at different points lets the overall fitted curve bend in ways no single global equation could represent, without needing to specify the exact nonlinear form in advance *(required)* | — |
| T1 | transfer | short-answer | 2.02 | Why is LOESS primarily used for visualization rather than precise, inferential predictions? | it has no simple, fixed set of coefficients to interpret the way a linear regression's β's can be, and its predictions, while often visually insightful, come with less straightforward theoretical guarantees (standard errors, confidence intervals) than parametric regression *(required: contrasts the lack of interpretable coefficients with parametric regression's clean inference)* | — |

*Coverage: 5 items, 0.02…2.02.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| AIC and BIC's penalty growth rates conflated | `aic-bic` |
| greedy stepwise methods assumed to find the global optimum | `forward-backward-stepwise-selection` |
| regularization's use case (many/correlated predictors) inverted | `regularization` |
| LASSO and ridge's shrinkage behaviors (sparse vs. smooth) swapped | `lasso`, `ridge-regression` |
| elastic net's motivation (combining two behaviors) missed | `elastic-net` |
| LOESS mistaken for having no local parameters at all | `loess-smoothing` |

**Cluster total: 35 items across 7 concepts.** All numeric/derivation claims verified, including a
concrete confirmation that the ridge shift repairs a genuinely singular X'X (det 0 → det 15.01).
