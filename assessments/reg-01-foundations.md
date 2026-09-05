# Regression Cluster 1 — Foundations

Regression, Regress to the Mean, Linear Regression Terminology, Simple Linear Regression, Ordinary
Least Squares, Normal Equations (6 concepts). Same format as
[foundations-of-probability.md](foundations-of-probability.md). `normal-equations`' T1 is the payoff
item of this cluster: it shows OLS's central formula is literally `vector-projection`'s orthogonality
principle from the linear-algebra sweep, not merely inspired by it.

---

## Regression (`regression`)
*Root · ancestors 0 · b₀ = −0.50*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.5 | Define regression. | modeling the relationship between a response/outcome variable and one or more predictors, to predict or explain the response | — |
| R2 | recall | mcq | −1.2 | Regression is broadly a form of: | supervised learning, specifically for continuous outcomes | picks "unsupervised learning" — regression requires a known outcome to fit against, per `classification-vs-regression` in the ML sweep → `regression` |
| A1 | apply | short-answer | −0.75 | Is predicting a house's sale price from its square footage a regression problem? | yes | — |
| E1 | explain | short-answer | 0.0 | Why is regression both a prediction tool and an explanation tool, and how can these goals conflict? | prediction asks "what will Y be for a new X," while explanation asks "how does X relate to Y"; a model optimized purely for prediction accuracy (a complex ensemble) can be far harder to interpret than a simple linear model, so the two goals can pull in different directions *(required: names the tension explicitly)* | — |
| T1 | transfer | short-answer | 0.5 | Why does "regression" as a statistical term have an older, more specific history than its broad modern usage? | the term originated with Galton's studies of height and inherited traits, where he observed the literal phenomenon `regress-to-the-mean` names — the modern broad sense (any model predicting a continuous outcome) is a later generalization of that original, specific meaning *(required: names Galton's original observation as the origin)* | — |

*Coverage: 5 items, −1.5…0.5.*

---

## Regress to the Mean (`regress-to-the-mean`)
*Prereq: Regression · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Describe regression to the mean. | extreme observations tend to be followed by less extreme ones, due to random variation alone, not necessarily any causal process | — |
| R2 | recall | mcq | −0.9 | A common mistake related to this phenomenon is: | wrongly attributing a natural statistical reversion to a causal intervention | claims this fallacy "never happens in practice" — it's a widely-documented, common error → `regress-to-the-mean` |
| A1 | apply | short-answer | −0.35 | A baseball player has an unusually good season, then performs closer to his career average the next. Why does regression to the mean predict this alone, with no ability change? | if observed performance = true ability + random noise, an extreme observed value likely had a large positive noise component by chance; fresh, independent noise the following season is unlikely to repeat that same extreme luck, pulling the observation back toward the true ability level *(required: the noise-decomposition argument)* | — |
| E1 | explain | short-answer | 0.35 | Explain the statistical mechanism behind regression to the mean precisely. | an extreme observed value is more likely to reflect a merely-good true ability plus a large favorable noise draw than an exceptional true ability alone; since noise is independent across measurements, the next measurement's noise won't replicate that same favorable draw, so the observation moves back toward the mean *(required: the "noise doesn't replicate" argument, not just restating the phenomenon)* | — |
| T1 | transfer | short-answer | 0.85 | Flight instructors observed praised pilots performing worse next time and criticized pilots performing better, concluding criticism works better than praise. Why is this likely a fallacy? | pilots singled out for praise had an unusually *good* landing (likely inflated by favorable chance), and pilots criticized had an unusually *bad* one (likely deflated by unfavorable chance); both groups would regress toward their typical performance regardless of any feedback given, mimicking a causal effect that was never actually there *(required: applies the mechanism to both directions, praise and criticism)* | attributes the pattern to feedback effectiveness without considering that both extremes would regress regardless → `regress-to-the-mean` |

*Coverage: 5 items, −1.15…0.85.*

---

## Linear Regression Terminology (`linear-regression-terminology`)
*Prereq: Regression · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Define response, predictor, coefficient, and residual. | response/dependent variable (Y, predicted); predictor/independent variable(s) (X, used to predict); coefficients (β, the weights); residual (observed minus predicted Y) | — |
| R2 | recall | mcq | −0.9 | "Independent variable" in regression terminology means: | simply the input/predictor variable(s), regardless of whether they're statistically independent of each other | reads it as claiming the predictors are "statistically independent (in the probability sense) from each other" — a genuinely common, understandable confusion → `linear-regression-terminology` |
| A1 | apply | short-answer | −0.35 | In "sales = β₀ + β₁·advertising + ε," identify each term's role. | response: sales; predictor: advertising; intercept: β₀; coefficient: β₁; error term: ε | — |
| E1 | explain | short-answer | 0.35 | Why can calling X "independent" be genuinely misleading given `independence-set-theory`'s precise probabilistic meaning? | predictors in a multiple regression are often correlated with each other — a phenomenon important enough to have its own name, multicollinearity (`vif`, later in this domain) — directly contradicting the probabilistic sense of "independent" that the same word carries elsewhere in this curriculum *(required: names multicollinearity as the direct contradiction)* | — |
| T1 | transfer | short-answer | 0.85 | Why does this terminology confusion matter across fields? | economics often says "exogenous/endogenous," ML often says "features/target," and statistics says "independent/dependent" — all naming the same roles with field-specific vocabulary, a genuine barrier to interdisciplinary communication if the correspondence isn't recognized *(required: at least two alternate vocabularies named)* | — |

*Coverage: 5 items, −1.15…0.85.*

---

## Simple Linear Regression (`simple-linear-regression`)
*Prereq: Linear Regression Terminology, Covariance, Sample Variance · ancestors 19 · b₀ = 1.00*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.0 | State the simple linear regression model and its least-squares slope/intercept estimates. | Y=β₀+β₁X+ε; β̂₁=Cov(X,Y)/Var(X); β̂₀=Ȳ−β̂₁X̄ | — |
| R2 | recall | mcq | 0.3 | β̂₁ relates to the correlation coefficient r by: | β̂₁ = r·(s_Y/s_X) — the slope equals correlation scaled by the ratio of standard deviations | claims β̂₁ "always equals r exactly" — only true when s_X=s_Y → `simple-linear-regression` |
| A1 | apply | numeric | 0.8 | Cov(X,Y)=6, Var(X)=3, X̄=10, Ȳ=50. Find β̂₁ and β̂₀. `[verified: 2, 30]` | β̂₁=6/3=2; β̂₀=50−2(10)=30 | — |
| E1 | explain | derivation | 1.5 | Derive β̂₁=Cov(X,Y)/Var(X) from first principles by minimizing Σ(yᵢ−β₀−β₁xᵢ)². | take partial derivatives with respect to β₀ and β₁, set both to zero, and solve the resulting system — a direct application of `matrix-calculus`'s gradient-zero optimization technique, even in this simple two-parameter case *(required: the actual partial-derivative-and-solve steps, not just quoting the formula)* | — |
| T1 | transfer | short-answer | 2.0 | Why does measuring the same relationship in different units (inches vs. cm) change the numerical slope but not the correlation? `[verified: β̂₁=r·(sy/sx), an algebraic identity]` | β̂₁=r·(s_Y/s_X) depends on the *scales* of X and Y through their standard deviations, while r is unit-free and stays exactly the same regardless of units — slope and correlation describe the same relationship but answer different questions ("how much does Y change per unit X" vs. "how strong is the linear association") *(required: the explicit unit-dependence contrast)* | — |

*Coverage: 5 items, 0.0…2.0.*

---

## Ordinary Least Squares (`ordinary-least-squares`)
*Prereq: Simple Linear Regression · ancestors 20 · b₀ = 1.02*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.02 | Define OLS. | choosing coefficients to minimize the sum of squared residuals, Σ(yᵢ−ŷᵢ)² | — |
| R2 | recall | mcq | 0.32 | OLS minimizes *squared* error rather than absolute error because: | squared error is differentiable everywhere and yields a closed-form solution, which absolute error lacks | claims squared error is "always more accurate" — a vague, unjustified claim, not the actual mathematical reason → `ordinary-least-squares` |
| A1 | apply | short-answer | 0.82 | Why doesn't minimizing Σ\|yᵢ−ŷᵢ\| have as clean a closed-form solution as OLS? | \|·\| is not differentiable at 0, so setting a derivative to zero — the technique that produces OLS's clean formula — doesn't work the same way for absolute error *(required: names the non-differentiability at 0 specifically)* | — |
| E1 | explain | short-answer | 1.52 | State the Gauss-Markov theorem informally. | under linearity, no perfect collinearity, zero-mean errors, homoskedasticity, and no autocorrelation, OLS is BLUE — the Best Linear Unbiased Estimator, having the smallest variance among *all* linear unbiased estimators *(required: names "BLUE" and at least the key assumptions)* | — |
| T1 | transfer | short-answer | 2.02 | Why can OLS still perform poorly with nearly collinear predictors, even though Gauss-Markov guarantees it's BLUE? | BLUE only means best *among unbiased* linear estimators — accepting a little bias (as ridge regression does) can achieve much lower *total* error via the bias-variance tradeoff when collinearity has inflated OLS's variance dramatically *(required: the explicit "best among unbiased, not best overall" distinction)* | — |

*Coverage: 5 items, 0.02…2.02.*

---

## Normal Equations (`normal-equations`)
*Prereq: Ordinary Least Squares, Matrix Multiplication · ancestors 24 · b₀ = 1.11*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.11 | State the normal equations in matrix form. | XᵀXβ̂ = Xᵀy, giving β̂=(XᵀX)⁻¹Xᵀy when XᵀX is invertible | — |
| R2 | recall | mcq | 0.41 | The normal equations are derived by: | setting the gradient of ‖y−Xβ‖² with respect to β equal to zero | describes them as "a guessed, reasonable formula" — they follow directly from calculus, not intuition → `normal-equations` |
| A1 | apply | short-answer | 0.91 | Why must XᵀX be invertible to solve for β̂ directly, and what's the fallback when it isn't? | invertibility is required by `invertible-matrices`' equivalence for the formula (XᵀX)⁻¹Xᵀy to make sense at all; when XᵀX is singular, the Moore-Penrose pseudo-inverse (from the linear-algebra sweep) still yields the minimum-norm solution *(required: names the pseudo-inverse fallback explicitly)* | — |
| E1 | explain | derivation | 1.61 | Derive the normal equations by differentiating ‖y−Xβ‖². | ∇_β[(y−Xβ)ᵀ(y−Xβ)] = −2Xᵀ(y−Xβ) = 0, giving XᵀXβ=Xᵀy *(required: the explicit gradient computation, reusing `matrix-calculus`'s machinery)* | — |
| T1 | transfer | short-answer | 2.11 | Connect Xᵀ(y−Xβ̂)=0 directly to `vector-projection`'s orthogonality principle. | this rearrangement of the normal equations says the residual vector (y−Xβ̂) is orthogonal to *every column* of X — exactly the defining property of an orthogonal projection from `vector-projection`, confirming OLS geometrically projects y onto C(X), not just by analogy but as the identical mathematical condition *(required: states it as the identical condition, not a resemblance)* | — |

*Coverage: 5 items, 0.11…2.11. This is the geometric payoff of the whole cluster.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| regression assumed unsupervised | `regression` |
| statistical reversion misattributed to a causal intervention | `regress-to-the-mean` |
| "independent variable" read as statistically independent predictors | `linear-regression-terminology` |
| regression slope conflated with correlation, ignoring unit-dependence | `simple-linear-regression` |
| Gauss-Markov's BLUE guarantee treated as "best overall," ignoring the unbiased qualifier | `ordinary-least-squares` |
| normal equations treated as an assumed formula rather than a calculus result | `normal-equations` |

**Cluster total: 30 items across 6 concepts.** All numeric claims verified, including the
β̂₁=r·(s_Y/s_X) identity used directly in `simple-linear-regression`'s T1.
