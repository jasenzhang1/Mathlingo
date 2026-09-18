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
| R2 | recall | mcq | 0.88 | Which theorem establishes that WLS is BLUE when the weights equal the true inverse variances? | Aitken's theorem (the generalized Gauss–Markov theorem) | names Gauss–Markov's original homoskedastic theorem instead, missing that Aitken extends it → `weighted-least-squares` |
| R3 | recall | short-answer | 0.93 | Fill in the blank: an observation with large error variance receives a ___ WLS weight than one with small error variance. | smaller | — |
| R4 | recall | mcq | 0.98 | WLS is best described as a special case of which broader estimator? | Generalized Least Squares (GLS), with a diagonal weight matrix | calls it a special case of ridge regression — WLS has no shrinkage penalty → `weighted-least-squares` |
| R5 | recall | short-answer | 1.03 | True or false, with a one-line reason: WLS changes the point estimate β̂ itself, not just its standard errors. | True — reweighting the objective changes which β minimizes it, unlike a robust-SE correction, which leaves β̂_OLS unchanged | — |
| R6 | recall | short-answer | 1.08 | Write the closed-form WLS estimator β̂ in matrix notation, given diagonal weight matrix W. | β̂ = (XᵀWX)⁻¹XᵀWy | — |
| R7 | recall | mcq | 1.13 | In *feasible* WLS (FGLS), the weights used are: | estimated from the data (e.g. from a regression of squared residuals), not known in advance | assumes the weights must be known exactly beforehand, ruling out FGLS entirely → `weighted-least-squares` |
| R8 | recall | short-answer | 1.23 | Fill in the blank: the WLS weight for observation i, given known error variance σᵢ², is wᵢ = ___. | 1/σᵢ² | — |
| R9 | recall | mcq | 1.28 | Which of the following is *not* a stated purpose of WLS? | reducing the number of predictors in the model | correctly lists WLS's real purposes (correcting heteroskedasticity, upweighting precise observations) alongside this unrelated one → `weighted-least-squares` |
| R10 | recall | short-answer | 1.33 | What specific violation of OLS's assumptions does WLS address? | heteroskedasticity — non-constant error variance across observations | — |
| R11 | recall | short-answer | 1.38 | True or false: under homoskedasticity (constant σ² across observations), WLS and OLS produce identical point estimates. | True — every weight is equal, so it factors out of the objective and the same β minimizes it | — |
| R12 | recall | mcq | 1.43 | The weight matrix W in the WLS objective (y−Xβ)ᵀW(y−Xβ) is typically: | diagonal, with entries wᵢ = 1/σᵢ² | treats W as required to be the full error covariance matrix Σ itself rather than its inverse-diagonal weighting → `weighted-least-squares` |
| R13 | recall | short-answer | 1.48 | Define "precision" as the term is used to motivate WLS weighting. | precision = 1/variance; an observation with lower error variance is more precise and is given more weight | — |
| R14 | recall | mcq | 1.53 | Which concept must a learner already understand before WLS, per this concept's own prerequisite? | Homoskedasticity — WLS is explicitly presented as its remedy | picks Ridge Regression, unrelated to WLS's motivating problem → `weighted-least-squares` |
| R15 | recall | short-answer | 1.58 | Fill in the blank: WLS reduces exactly to OLS when every weight wᵢ is ___. | equal (constant across all observations) | — |
| R16 | recall | mcq | 0.83 | The WLS objective Σ wᵢ(yᵢ−xᵢᵀβ)² is minimized over: | β, holding the weights wᵢ fixed at their known or estimated values | believes the weights wᵢ are also optimized jointly with β in the same minimization → `weighted-least-squares` |
| A2 | apply | numeric | 1.63 | Two groups have error variances σ₁²=9 and σ₂²=1. Ratio of Group 2's WLS weight to Group 1's? `[verified: 9]` | w=1/σ²; (1/1)/(1/9)=9 | — |
| A3 | apply | numeric | 1.73 | An observation has error variance σ²=0.25. Its WLS weight? `[verified: 4]` | w=1/0.25=4 | — |
| A4 | apply | numeric | 1.78 | Residuals e₁=2, e₂=−3 with weights w₁=0.5, w₂=2. Weighted sum of squares Σwᵢeᵢ²? `[verified: 20]` | 0.5(4)+2(9)=2+18=20 | — |
| A5 | apply | numeric | 1.83 | Weights set proportional to sample size, n₁=15, n₂=45. Ratio of Group 2's weight to Group 1's? `[verified: 3]` | 45/15=3 | — |
| A6 | apply | numeric | 1.88 | An intercept-only WLS fit on y₁=2, y₂=8 with weights w₁=1, w₂=4. The WLS estimate (weighted mean)? `[verified: 6.8]` | (1·2+4·8)/(1+4)=34/5=6.8 | — |
| E2 | explain | short-answer | 2.28 | Why does OLS remain unbiased under heteroskedasticity even though it stops being efficient? | unbiasedness only requires E[e\|X]=0, which heteroskedasticity does not violate; heteroskedasticity instead inflates Var(β̂_OLS) relative to the efficient WLS estimator *(required: separates bias from efficiency explicitly)* | conflates "no longer efficient" with "now biased" → `weighted-least-squares` |
| E3 | explain | short-answer | 2.33 | Why does using estimated, rather than exactly known, weights in FGLS weaken its finite-sample guarantees? | the weights are themselves estimated from the data, so they carry sampling variability that couples with β̂'s own estimation; FGLS is only asymptotically equivalent to WLS with known weights, not exactly BLUE in finite samples *(required: names the asymptotic-only equivalence)* | treats FGLS as exactly as efficient as WLS with true weights at any sample size → `weighted-least-squares` |
| E4 | explain | short-answer | 2.43 | Why is a plot of squared residuals against a predictor a common diagnostic before applying WLS? | a systematic trend, such as squared residuals growing with x, is direct visual evidence of heteroskedasticity, and its shape suggests which weighting function to use (variance ∝ x ⇒ weight ∝ 1/x) *(required: connects the diagnostic's shape to choosing the weight function)* | treats the plot as only confirming heteroskedasticity exists, missing that its shape informs the weight choice → `weighted-least-squares` |
| E5 | explain | short-answer | 2.48 | Why does ignoring known heteroskedasticity and running plain OLS give a valid β̂ but invalid t-tests? | β̂_OLS stays unbiased regardless of heteroskedasticity, but the standard OLS variance formula σ²(XᵀX)⁻¹ assumes constant error variance, so the reported SEs — and hence t-statistics and p-values — are wrong even though the point estimate itself is fine *(required: separates estimate validity from inference validity)* | assumes an invalid t-test implies the coefficient estimate is also wrong → `weighted-least-squares` |
| T2 | transfer | short-answer | 2.93 | A dataset has error variance proportional to x² (σᵢ²∝xᵢ²). What transformation turns this WLS problem into an equivalent OLS problem? | divide every term — y, x, and the intercept's implicit 1 — by xᵢ; the transformed errors have constant variance, so OLS on the transformed variables is algebraically identical to WLS on the original ones *(required: names dividing by xᵢ specifically, matching this variance form)* | applies a generic log-transform instead of the division matched to this specific variance-proportional-to-x² structure → `weighted-least-squares` |
| T3 | transfer | short-answer | 2.98 | Why might a researcher prefer WLS over log-transforming Y to address heteroskedasticity? | a log transform changes the modeled quantity to multiplicative effects and can introduce bias when back-transforming predictions to the original scale (Jensen's inequality), whereas WLS keeps the model on the original scale and only reweights estimation *(required: names the back-transformation bias risk of the log approach)* | assumes the log transform and WLS are interchangeable fixes with no trade-off → `weighted-least-squares` |

*Coverage: 16/6/5/3 — 30 items, 0.83…2.98.*

---

## Outliers, Leverage, and Influence (`outliers-leverage-influence`)
*Prereq: Geometric Interpretation of OLS · ancestors 34 · b₀ = 1.28*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | 1.28 | Distinguish an outlier, a high-leverage point, and an influential point. | outlier: surprising response; leverage: unusual predictor values, from X alone; influence: how much removing the point would change the fit — needs both | collapses all three into one, or defines influence from X alone → `outliers-leverage-influence` |
| A1 | apply | numeric | 1.78 | p+1=3, σ̂²=4, a point has eᵢ=4, hᵢᵢ=0.5. Cook's distance Dᵢ=[eᵢ²/((p+1)σ̂²)]·[hᵢᵢ/(1−hᵢᵢ)²]? `[verified: 2.67]` | (16/12)·(0.5/0.25)=2.667 | — |
| E1 | explain | short-answer | 2.48 | Why does a high-leverage point often show a small raw residual? | Var(eᵢ)=σ²(1−hᵢᵢ) shrinks toward 0 as hᵢᵢ→1, since the fit is dragged toward that point rather than resisting it — so scanning for large residuals alone misses the most consequential points *(required: the explicit Var(eᵢ) mechanism)* | treats residual size as leverage-independent → `outliers-leverage-influence` |
| T1 | transfer | short-answer | 3.08 | Is a high Cook's distance by itself grounds for deleting a point? | no — an influential point can be the single most informative observation; verify it first (data error vs. genuine extreme), and sequential deletion of several flagged points can produce a fit that looks stable only because it was shorn of everything that disagreed with it *(required: names the sequential-deletion danger)* | treats high influence as sufficient justification for deletion → `outliers-leverage-influence` |
| R2 | recall | mcq | 0.98 | Leverage hᵢᵢ is computed from: | the predictor values X alone (the hat matrix diagonal) — it never looks at y | claims leverage is computed from the response y or the residuals, not X alone → `outliers-leverage-influence` |
| R3 | recall | short-answer | 1.03 | Fill in the blank: the hat matrix is defined as H = ___. | X(XᵀX)⁻¹Xᵀ | — |
| R4 | recall | short-answer | 1.08 | True or false: leverage values hᵢᵢ always lie in the interval [0,1]. | True | — |
| R5 | recall | short-answer | 1.13 | What does the trace of the hat matrix H equal? | p+1, the number of estimated parameters including the intercept | — |
| R6 | recall | mcq | 1.18 | A commonly used rule-of-thumb threshold for flagging "high leverage" is: | hᵢᵢ > 2(p+1)/n | flags leverage using an absolute cutoff like hᵢᵢ>0.9 regardless of n or p, ignoring that the threshold must scale with sample size and parameter count → `outliers-leverage-influence` |
| R7 | recall | short-answer | 1.23 | Fill in the blank: Cook's distance combines ___ and ___ into a single influence measure. | residual size (how surprising the response is) and leverage (how unusual the predictor values are) | — |
| R8 | recall | mcq | 1.33 | A common rule-of-thumb threshold for flagging a "large" Cook's distance is: | Dᵢ > 4/n | treats any nonzero Cook's distance as automatically large, with no sample-size-dependent threshold → `outliers-leverage-influence` |
| R9 | recall | short-answer | 1.38 | Define a studentized residual. | a residual divided by its estimated standard deviation, which itself accounts for the point's leverage — so it is comparable in scale across points with different leverage | — |
| R10 | recall | mcq | 1.43 | DFBETAS measures: | how much each individual regression coefficient changes when a given observation is deleted | claims DFBETAS reports one aggregate number summarizing the whole fit's change, which is what Cook's distance does, not DFBETAS → `outliers-leverage-influence` |
| R11 | recall | short-answer | 1.48 | Fill in the blank: DFFITS measures how much ___ changes, in standardized units, when observation i is deleted. | the fitted value ŷᵢ | — |
| R12 | recall | short-answer | 1.53 | True or false: an observation can have high leverage without being influential. | True — if its response value is consistent with the pattern the rest of the data already predicts, removing it barely changes the fit despite its unusual predictor values | — |
| R13 | recall | mcq | 1.58 | Of the three ideas outlier, leverage, and influence, which can be determined from X alone, without ever looking at y? | leverage | claims influence can be read from X alone, when it also requires the response and how much removing the point changes the fit → `outliers-leverage-influence` |
| R14 | recall | short-answer | 1.63 | State the formula for Cook's distance Dᵢ in terms of the residual eᵢ, leverage hᵢᵢ, p+1, and σ̂². | Dᵢ = [eᵢ²/((p+1)σ̂²)]·[hᵢᵢ/(1−hᵢᵢ)²] | — |
| R15 | recall | mcq | 1.68 | The prerequisite concept for Outliers, Leverage, and Influence is: | Geometric Interpretation of OLS | names an unrelated concept such as Variance Inflation Factor, which is not this concept's stated prerequisite → `outliers-leverage-influence` |
| R16 | recall | short-answer | 0.93 | True or false: influence necessarily requires both an unusual y-value and unusual leverage at the same point. | False — a moderately unusual residual combined with high leverage, or a very large residual at moderate leverage, can each drive a large Cook's distance on its own | — |
| A2 | apply | numeric | 1.65 | p+1=2, σ̂²=1, a point has eᵢ=3, hᵢᵢ=0.2. Cook's distance? `[verified: 1.41]` | (9/2)·(0.2/0.64)=4.5·0.3125=1.40625≈1.41 | — |
| A3 | apply | numeric | 1.7 | n=20 observations, p+1=4 parameters. What is the average leverage h̄ᵢᵢ across all points? `[verified: 0.2]` | trace(H)=p+1, so h̄=(p+1)/n=4/20=0.2 | — |
| A4 | apply | numeric | 1.9 | A point has leverage hᵢᵢ=0.9. What fraction of σ² does its residual variance Var(eᵢ)=σ²(1−hᵢᵢ) represent? `[verified: 0.1]` | 1−0.9=0.1 | — |
| A5 | apply | numeric | 1.95 | Raw residual eᵢ=6, hᵢᵢ=0.36, σ̂=2. Standardized residual eᵢ/(σ̂√(1−hᵢᵢ))? `[verified: 3.75]` | 6/(2·0.8)=3.75 | — |
| A6 | apply | numeric | 2.0 | n=10 observations, p+1=3 parameters. Sum of all leverage values Σhᵢᵢ? `[verified: 3]` | trace(H)=p+1=3 | — |
| E2 | explain | short-answer | 2.53 | Why does the identity trace(H)=p+1 mean not every observation can simultaneously have low leverage? | leverage values must sum to p+1 across all n points, so their average is (p+1)/n; if n is not much larger than p, many points are forced to have non-trivial leverage simply by this budget constraint *(required: the explicit averaging-constraint argument)* | treats leverage as an unconstrained per-point property with no relationship to the other points' values → `outliers-leverage-influence` |
| E3 | explain | short-answer | 2.63 | Why is deleting a single influential point sometimes not enough to reveal whether it was distorting the fit? | if several correlated influential points exist, removing only one can still leave the others driving a distorted fit; leave-one-out diagnostics implicitly assume influence is concentrated in single points, which can fail when influence is shared across a small cluster *(required: names the masking effect of multiple joint influential points)* | assumes checking each point's influence one at a time always catches every distortion → `outliers-leverage-influence` |
| E4 | explain | short-answer | 2.73 | Why does DFBETAS give more targeted information than Cook's distance for diagnosing a specific coefficient? | Cook's distance is a single aggregate summary of how much the entire fitted vector changes if a point is dropped, while DFBETAS reports the change in each individual coefficient separately, revealing which specific predictor's estimate a point is distorting *(required: names the aggregate-vs-per-coefficient distinction)* | treats Cook's distance and DFBETAS as measuring the same thing at different scales → `outliers-leverage-influence` |
| E5 | explain | short-answer | 2.83 | Why can a point be an outlier in y but not influential? | if that point has very low leverage (an unremarkable x), removing it barely moves the fitted line regardless of how far its y value sits from the fit, since low-leverage points have little power to pull the regression surface toward themselves *(required: connects low leverage to low influence despite a large residual)* | assumes a large residual alone guarantees high influence, ignoring the leverage factor → `outliers-leverage-influence` |
| T2 | transfer | short-answer | 3.13 | In a dataset with a genuine data-entry error at high leverage, compare deleting the point outright versus winsorizing it. | deletion removes the point's information entirely, which is fine if it's confirmed erroneous rather than a legitimately extreme observation; winsorizing (capping its value) keeps some information but can silently bias the fit toward the cap if used on an unverified but genuine extreme point — the safer path is always to verify the cause first, as T1 already established *(required: contrasts the information-loss/bias trade-off, not just an operational preference)* | picks one method as universally correct without connecting the choice to whether the point's cause was verified → `outliers-leverage-influence` |
| T3 | transfer | short-answer | 3.23 | Why can a model-selection procedure like AIC be distorted by a small number of highly influential points, even if it never computes Cook's distance directly? | AIC is a function of the fitted model's likelihood, which those points disproportionately shaped; a model chosen to fit them well can look "better" by AIC while generalizing worse, so influence diagnostics are a check model-selection criteria alone cannot provide *(required: connects influence to the likelihood-based criterion's blind spot)* | assumes AIC's likelihood-based comparison already accounts for influential points because it's a "principled" statistic → `outliers-leverage-influence` |

*Coverage: 16/6/5/3 — 30 items, 0.93…3.23.*

---

## Polynomial Regression (`polynomial-regression`)
*Prereq: Multiple Linear Regression, Variance Inflation Factor (VIF) · ancestors 30 · b₀ = 1.22*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | mcq | 1.22 | Why is Y=β₀+β₁X+β₂X²+ε fitted by ordinary least squares? | it is linear in the coefficients β, even though the fitted curve is not a straight line in X | believes it needs an iterative nonlinear solver → `polynomial-regression` |
| A1 | apply | numeric | 1.72 | Ŷ=10+4X−0.5X². Value of X at the maximum, and the fitted value there? `[verified: X=4, Ŷ=18]` | vertex at X=−b/2a=4; Ŷ(4)=18 | — |
| E1 | explain | short-answer | 2.42 | X and X² report very high VIFs with perfectly clean data. Why, and what's the fix? | over a positive range, large X mechanically gives large X², so the columns are correlated by construction, not from a data flaw; centre X at its mean before forming the powers, unchanged fitted values *(required: names the structural, not empirical, source)* | treats the inflated VIF as a data defect → `polynomial-regression` |
| T1 | transfer | short-answer | 3.02 | Why does a cubic that fits training data beautifully sometimes predict wildly just outside the observed range? | a line extrapolates at a constant rate; a polynomial's slope keeps changing, so high-order terms harmless inside the data can dominate and diverge just past its edge — the usual workflow uses LOESS to find the shape, a low-degree polynomial to quantify it, and a theory-grounded model to extrapolate *(required: names the changing-derivative mechanism)* | treats extrapolation risk as uniform across model types → `polynomial-regression` |
| R2 | recall | mcq | 0.93 | The model Y=β₀+β₁X+β₂X²+ε is fitted by: | ordinary least squares, exactly as with any linear-in-parameters model | claims a special nonlinear or iterative solver is required simply because the fitted curve bends → `polynomial-regression` |
| R3 | recall | short-answer | 0.98 | Fill in the blank: in polynomial regression, X² is treated as a ___ predictor column, alongside X. | separate (additional) | — |
| R4 | recall | short-answer | 1.03 | True or false: increasing the polynomial degree never increases the training-set RSS. | True — a higher-degree model nests the lower-degree one, so least squares can only match or improve the training fit | — |
| R5 | recall | mcq | 1.08 | Choosing polynomial degree purely to minimize training RSS leads to: | overfitting, since RSS keeps falling or stays flat as degree rises regardless of the true relationship | assumes minimizing training RSS is a safe way to pick the right degree → `polynomial-regression` |
| R6 | recall | short-answer | 1.13 | What technique is commonly used in practice to select polynomial degree? | cross-validation (comparing held-out error across candidate degrees) | — |
| R7 | recall | short-answer | 1.18 | Fill in the blank: centering X before forming X², X³, ... primarily addresses ___. | the structural multicollinearity between the powers of X | — |
| R8 | recall | mcq | 1.23 | Orthogonal polynomials are used instead of raw powers of X primarily to: | avoid the numerical instability and collinearity among the columns X, X², X³, ... | claims orthogonal polynomials are used to make the fitted curve itself smoother, rather than to fix the numerical/collinearity issue → `polynomial-regression` |
| R9 | recall | short-answer | 1.28 | Define what "linear in the coefficients" means, as applied to polynomial regression. | the model is linear in the parameters β₀, β₁, β₂, ... even though the fitted relationship between Y and X is nonlinear | — |
| R10 | recall | short-answer | 1.33 | True or false: a quadratic term alone is sufficient to capture any nonlinear relationship between X and Y. | False — a quadratic only captures one bend; many relationships need higher-degree terms or a different functional form entirely | — |
| R11 | recall | mcq | 1.38 | The wild oscillation of high-degree polynomial fits near the edges of the data range is known as: | Runge's phenomenon | calls it "heteroskedasticity," an unrelated concept about non-constant error variance → `polynomial-regression` |
| R12 | recall | short-answer | 1.43 | State one drawback of high-degree polynomial regression besides poor extrapolation. | its coefficient estimates become unstable and highly sensitive to small changes in the training data | — |
| R13 | recall | short-answer | 1.48 | Fill in the blank: the prerequisite concepts for Polynomial Regression are ___ and ___. | Multiple Linear Regression and Variance Inflation Factor (VIF) | — |
| R14 | recall | mcq | 1.53 | Compared to LOESS, polynomial regression is: | a single global parametric formula fit over the whole range, rather than a local, flexible smoother | claims polynomial regression is itself a local smoothing method like LOESS → `polynomial-regression` |
| R15 | recall | short-answer | 1.58 | True or false: individual polynomial coefficients (β₁, β₂, ...) are typically interpreted on their own in applied work. | False — they are rarely individually meaningful since they only jointly determine the fitted curve's shape; interpretation is usually via the fitted curve itself | — |
| R16 | recall | mcq | 0.88 | Why is adding a quadratic term to a simple linear regression useful for testing curvature? | a statistically significant β₂ signals the relationship deviates from a straight line | claims a squared term is added only to improve R², with no interpretation as a curvature test → `polynomial-regression` |
| A2 | apply | numeric | 1.62 | Ŷ=5+2X−0.25X². Value of X at the vertex, and the fitted value there? `[verified: X=4, Ŷ=9]` | vertex at X=−b/2a=−2/(2·−0.25)=4; Ŷ(4)=5+8−4=9 | — |
| A3 | apply | numeric | 1.67 | Ŷ=1+3X−X². Value of X at the vertex, and the fitted value there? `[verified: X=1.5, Ŷ=3.25]` | vertex at X=−3/(2·−1)=1.5; Ŷ(1.5)=1+4.5−2.25=3.25 | — |
| A4 | apply | numeric | 1.77 | Ŷ=2+X−0.5X²+0.1X³. Fitted value at X=2? `[verified: 2.8]` | 2+2−2+0.8=2.8 | — |
| A5 | apply | numeric | 1.87 | Predictors centered at their mean, X̄=15. An observation has X=18. What is its centered value Xc=X−X̄, and Xc²? `[verified: Xc=3, Xc²=9]` | 18−15=3; 3²=9 | — |
| A6 | apply | numeric | 1.97 | A cubic fit's coefficient on X³ is 0.02, on X² is −0.3. At X=10, which term contributes more to Ŷ in magnitude? `[verified: cubic term=20, quadratic term=-30, quadratic larger]` | 0.02·1000=20; −0.3·100=−30; the quadratic term is larger in magnitude | — |
| E2 | explain | short-answer | 2.47 | Why does adding higher-degree terms never increase training RSS, even if the true relationship is linear? | a higher-degree polynomial model nests the lower-degree one — setting the extra coefficients to zero exactly recovers it — so the least-squares fit can only match or improve training RSS, never worsen it *(required: the explicit nesting argument)* | treats each added degree as an independent risk that could raise RSS → `polynomial-regression` |
| E3 | explain | short-answer | 2.57 | Why is cross-validated error, not training RSS, the right criterion for choosing polynomial degree? | training RSS decreases monotonically with degree by construction (per E2), so minimizing it always favors the highest available degree; cross-validation estimates out-of-sample error, which rises again once the fit starts capturing noise rather than signal *(required: connects training-RSS monotonicity to why it fails as a selection criterion)* | assumes training RSS and cross-validated error select the same degree → `polynomial-regression` |
| E4 | explain | short-answer | 2.67 | Why does a high-degree polynomial's coefficient vector often change drastically from a small change in the training data? | high-degree polynomial basis columns are highly correlated and numerically similar over most of the range, so least squares must divide credit among nearly-collinear columns, which is inherently unstable to small perturbations in y *(required: names the collinearity-driven instability, distinct from the X,X² centering fix)* | attributes the instability solely to the already-addressed X,X² collinearity rather than the broader high-degree basis correlation → `polynomial-regression` |
| E5 | explain | short-answer | 2.77 | Why does adding a squared term to a simple linear regression give a formal test for curvature, not just a visual judgment? | under the null hypothesis of a truly linear relationship, β₂=0; a statistically significant β₂ in the fitted quadratic is direct evidence the relationship departs from a straight line, converting "does this look curved?" into a hypothesis test on β₂ *(required: frames it explicitly as a hypothesis test on β₂)* | treats the squared term's significance as merely improving fit rather than testing a specific hypothesis about curvature → `polynomial-regression` |
| T2 | transfer | short-answer | 3.07 | Contrast polynomial regression with regression splines as tools for capturing nonlinearity. | a single global polynomial must use the same functional form everywhere, so fitting one region's curvature well can distort distant regions; splines fit local piecewise polynomials joined smoothly at knots, capturing local shape without one region's curvature contaminating another's fit *(required: the global-vs-local mechanism, not just "splines are more flexible")* | treats splines as simply a higher-degree polynomial rather than a fundamentally local, piecewise fit → `polynomial-regression` |
| T3 | transfer | short-answer | 3.17 | A model with an X⁴ term shows statistically significant coefficients but much worse test-set RMSE than a quadratic model. What does this reveal? | statistical significance reflects whether a coefficient reliably differs from zero in-sample, not whether including it improves generalization; the quartic is overfitting noise that happens to look systematic within this sample, which only a held-out comparison exposes *(required: separates in-sample significance from out-of-sample generalization)* | treats significant coefficients as sufficient evidence the higher-degree model generalizes better → `polynomial-regression` |

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
