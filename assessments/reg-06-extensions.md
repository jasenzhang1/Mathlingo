# Regression Cluster 6 — Extensions

Weighted Least Squares, Outliers/Leverage/Influence, Polynomial Regression, Quantile Regression,
Poisson Regression (5 concepts). Same format as [foundations-of-probability.md](foundations-of-probability.md).

Added after the initial 29-concept regression sweep, each filling a gap the sweep's own wiki content
surfaced rather than an arbitrary addition: `homoskedasticity`'s wiki names weighted least squares as
its direct remedy without defining it; `geometric-interpretation-of-ols`'s hat matrix already derives
leverage but nothing gave it, or Cook's distance, a home; `loess-smoothing`'s wiki ends on "the usual
workflow: use LOESS to discover the shape, then a parametric term such as a quadratic" — a forward
reference to a concept that did not exist; `ordinary-least-squares`'s own contrast of squared versus
absolute loss gestures at quantile regression as the general case; and `glm`'s own blurb says it
"unifies linear, logistic, and Poisson regression," naming a method with no concept page — the same gap
`gradient-descent` left around `matrix-calculus` in the earlier ML sweep. `checkPrereqClosure` caught
one further real gap while authoring the items: `polynomial-regression`'s collinearity item genuinely
needs `vif`, so that edge was added to `concepts.ts` too.

These five expand to the servable app's 8-item bar (`web/src/data/items/regression-extensions.ts`);
the tables below are the 5-item design skeleton, same convention as every other cluster in this bank.

---

## Weighted Least Squares (`weighted-least-squares`)
*Prereq: Homoskedasticity · ancestors 28 · b₀ = 1.18*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | 1.18 | State the WLS objective and the correct weight for known error variance σᵢ². | Σwᵢ(yᵢ−xᵢᵀβ)², wᵢ=1/σᵢ² | places the weight in the denominator, or aims to equalise every term rather than weight by precision → `weighted-least-squares` |
| A1 | apply | numeric | 1.68 | Five factory averages, sample sizes 20,20,20,80,80, weighted by wᵢ∝nᵢ. Ratio of an 80-unit weight to a 20-unit weight? `[verified: 4]` | 80/20=4 | — |
| E1 | explain | short-answer | 2.38 | Is WLS an exception to "OLS is BLUE," or something else? | the Aitken theorem generalises Gauss–Markov to a known non-scalar error covariance; WLS is its solution when that covariance is diagonal, and OLS is the Σ=σ²I special case *(required: names the Aitken generalisation, not a contradiction)* | treats WLS beating OLS's variance as contradicting Gauss–Markov → `weighted-least-squares` |
| T1 | transfer | short-answer | 2.88 | Contrast WLS against robust standard errors, and say which is the safer default when the variance structure is unknown. | robust SEs keep β̂_OLS and repair only its uncertainty, valid under any unknown heteroskedasticity; WLS changes β̂ itself and is more efficient only when the weights are right — robust SEs are the safer default absent confidently known weights *(required: names that WLS changes the estimator, robust SE does not)* | conflates the two as interchangeable fixes for the same problem → `weighted-least-squares` |

*Coverage: 4 items, 1.18…2.88.*

---

## Outliers, Leverage, and Influence (`outliers-leverage-influence`)
*Prereq: Geometric Interpretation of OLS · ancestors 34 · b₀ = 1.28*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | 1.28 | Distinguish an outlier, a high-leverage point, and an influential point. | outlier: surprising response; leverage: unusual predictor values, from X alone; influence: how much removing the point would change the fit — needs both | collapses all three into one, or defines influence from X alone → `outliers-leverage-influence` |
| A1 | apply | numeric | 1.78 | p+1=3, σ̂²=4, a point has eᵢ=4, hᵢᵢ=0.5. Cook's distance Dᵢ=[eᵢ²/((p+1)σ̂²)]·[hᵢᵢ/(1−hᵢᵢ)²]? `[verified: 2.67]` | (16/12)·(0.5/0.25)=2.667 | — |
| E1 | explain | short-answer | 2.48 | Why does a high-leverage point often show a small raw residual? | Var(eᵢ)=σ²(1−hᵢᵢ) shrinks toward 0 as hᵢᵢ→1, since the fit is dragged toward that point rather than resisting it — so scanning for large residuals alone misses the most consequential points *(required: the explicit Var(eᵢ) mechanism)* | treats residual size as leverage-independent → `outliers-leverage-influence` |
| T1 | transfer | short-answer | 3.08 | Is a high Cook's distance by itself grounds for deleting a point? | no — an influential point can be the single most informative observation; verify it first (data error vs. genuine extreme), and sequential deletion of several flagged points can produce a fit that looks stable only because it was shorn of everything that disagreed with it *(required: names the sequential-deletion danger)* | treats high influence as sufficient justification for deletion → `outliers-leverage-influence` |

*Coverage: 4 items, 1.28…3.08.*

---

## Polynomial Regression (`polynomial-regression`)
*Prereq: Multiple Linear Regression, Variance Inflation Factor (VIF) · ancestors 30 · b₀ = 1.22*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | 1.22 | Why is Y=β₀+β₁X+β₂X²+ε fitted by ordinary least squares? | it is linear in the coefficients β, even though the fitted curve is not a straight line in X | believes it needs an iterative nonlinear solver → `polynomial-regression` |
| A1 | apply | numeric | 1.72 | Ŷ=10+4X−0.5X². Value of X at the maximum, and the fitted value there? `[verified: X=4, Ŷ=18]` | vertex at X=−b/2a=4; Ŷ(4)=18 | — |
| E1 | explain | short-answer | 2.42 | X and X² report very high VIFs with perfectly clean data. Why, and what's the fix? | over a positive range, large X mechanically gives large X², so the columns are correlated by construction, not from a data flaw; centre X at its mean before forming the powers, unchanged fitted values *(required: names the structural, not empirical, source)* | treats the inflated VIF as a data defect → `polynomial-regression` |
| T1 | transfer | short-answer | 3.02 | Why does a cubic that fits training data beautifully sometimes predict wildly just outside the observed range? | a line extrapolates at a constant rate; a polynomial's slope keeps changing, so high-order terms harmless inside the data can dominate and diverge just past its edge — the usual workflow uses LOESS to find the shape, a low-degree polynomial to quantify it, and a theory-grounded model to extrapolate *(required: names the changing-derivative mechanism)* | treats extrapolation risk as uniform across model types → `polynomial-regression` |

*Coverage: 4 items, 1.22…3.02.*

---

## Quantile Regression (`quantile-regression`)
*Prereq: Ordinary Least Squares · ancestors 21 · b₀ = 1.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | 1.05 | State the pinball loss ρ_τ(u) and what τ=0.5 reduces it to. | ρ_τ(u)=u(τ−𝟙[u<0]); at τ=0.5, ρ_0.5(u)=½\|u\| — least absolute deviations | treats ρ_τ as symmetric for every τ, which would target only the median regardless of τ → `quantile-regression` |
| A1 | apply | numeric | 1.55 | ρ_τ(u)=u(τ−𝟙[u<0]), τ=0.3, u=−5. Loss? `[verified: 3.5]` | −5(0.3−1)=3.5 | — |
| E1 | explain | derivation | 2.25 | Show the minimiser of E[ρ_τ(Y−c)] over c is the τ-th quantile of Y. | split the expectation by Y above/below c, differentiate w.r.t. c, set to zero; the stationarity condition reduces to τ=P(Y≤c), the definition of the τ-th quantile *(required: the actual differentiation, not an assertion)* | — |
| T1 | transfer | short-answer | 2.85 | An OLS wage-education coefficient is $2,000/yr; τ=0.1 and τ=0.9 fits give $800 and $3,600. What does this reveal that OLS alone can't? | the OLS number is a single average effect that can't distinguish a uniform wage shift from a widening spread; the pattern here shows education widens the conditional wage distribution rather than shifting it uniformly *(required: the widening-spread reading, not just "different quantiles differ")* | assumes the OLS coefficient applies uniformly across the conditional distribution → `quantile-regression` |

*Coverage: 4 items, 1.05…2.85.*

---

## Poisson Regression (`poisson-regression`)
*Prereq: Generalized Linear Model (GLM), Poisson Distribution · ancestors 38 · b₀ = 1.33*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | 1.33 | State the Poisson regression model. | Y\|X ~ Poisson(μ), ln(μ)=xᵀβ — a log link on the mean | uses the identity link, which can predict a negative mean → `poisson-regression` |
| A1 | apply | numeric | 1.83 | Coefficient 0.25 on a promotion indicator. Multiplicative effect on expected count? `[verified: 1.284]` | e^0.25≈1.284 | — |
| E1 | explain | short-answer | 2.53 | Residual deviance 340 on 110 df. Diagnose, and distinguish the effect on β̂ from the effect on inference. | 340/110≈3.1 ≫1 signals overdispersion; β̂ stays consistent (mean structure unaffected) but standard errors computed under Var=μ are too small, so intervals are too narrow and results look spuriously significant *(required: the explicit bias/variance-of-inference distinction)* | reports the ratio without connecting it to what it implies about the variance assumption → `poisson-regression` |
| T1 | transfer | short-answer | 3.13 | Compare quasi-Poisson and negative binomial as overdispersion remedies — when would you reach for each? | quasi-Poisson keeps μ as the mean, allows Var=φμ, inflates SEs by √φ, leaves β̂ unchanged; negative binomial is a genuinely different distribution, Var=μ+αμ², enabling likelihood-based comparisons (AIC, deviance tests) the quasi version can't support *(required: distinguishes an SE-only correction from a model change)* | treats the two remedies as interchangeable → `poisson-regression` |

*Coverage: 4 items, 1.33…3.13.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| weight placement or motivation for WLS misstated | `weighted-least-squares` |
| WLS treated as contradicting, rather than generalising, Gauss–Markov | `weighted-least-squares` |
| outlier/leverage/influence collapsed into one concept | `outliers-leverage-influence` |
| high leverage assumed to imply a large residual | `outliers-leverage-influence` |
| high Cook's distance treated as sufficient grounds for deletion | `outliers-leverage-influence` |
| polynomial regression assumed to need nonlinear optimisation | `polynomial-regression` |
| structural (x, x²) collinearity mistaken for a data defect | `polynomial-regression` |
| pinball loss assumed symmetric regardless of τ | `quantile-regression` |
| a single mean coefficient assumed to describe the whole conditional distribution | `quantile-regression` |
| Poisson regression given an identity rather than log link | `poisson-regression` |
| quasi-Poisson and negative binomial treated as interchangeable | `poisson-regression` |

**Cluster total: 20 design-doc items across 5 concepts, expanded to 40 items (8 each) in
[`regression-extensions.ts`](../web/src/data/items/regression-extensions.ts).** Every numeric claim
verified independently before being written, including Cook's distance (2.667), the pinball-loss value
(3.5), and both Poisson multiplicative-effect computations.
