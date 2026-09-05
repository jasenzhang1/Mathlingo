# Multivariate Cluster 2 — Quadratic Forms & the Regression Payoff

Multivariate MGF, Quadratic Forms in Random Vectors, Cochran's Theorem, Distribution of β̂
(4 concepts, all added in this sweep). Same table format as
[mp-01-multivariate-probability.md](mp-01-multivariate-probability.md).

The first cluster stopped at *describing* a random vector. This one is about **scalars built out of
one**, which is what every statistic in classical inference actually is, and it is written as a
single argument in four steps:

1. `multivariate-mgf` turns the multivariate normal's closure properties into one substitution —
   M_{AX+b}(t) = e^{tᵀb}M_X(Aᵀt) — instead of a change-of-variables argument on a k-dimensional
   density.
2. `quadratic-forms-random-vectors` is the observation that the sample variance, the residual sum of
   squares, the Mahalanobis distance and every Wald statistic are all XᵀAX for different A, with one
   expectation formula and one chi-square criterion between them.
3. `cochrans-theorem` says when the pieces of such a decomposition are *independent* chi-squares,
   and reduces that question to whether a column of integers adds up.
4. `distribution-of-beta-hat` spends all three at once. Every number a regression prints is a
   function of β̂ (an affine map of a normal vector) and RSS (a quadratic form in the same vector),
   and Cochran is what makes those two independent — which is the only reason a t-statistic has a
   t-distribution.

Items lean on the earlier banks rather than restating them: `multivariate-normal`'s projection
definition is what E1 of `multivariate-mgf` differentiates, `trace`'s cyclic property is the whole
proof of E[XᵀAX], `rank`'s dimension counting is where degrees of freedom come from, and
`ols-properties`' T1 ("β̂ is approximately Normal by the CLT") is deliberately answered from the
other direction here — under normal errors it is *exactly* Normal, and the CLT is the fallback, not
the justification.

---

## Multivariate MGF (`multivariate-mgf`)
*Prereq: MGF, MGF Properties, Multivariate Normal, Covariance Matrix, Mutual Independence · ancestors 39 · b₀ = 1.34*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.34 | Define the moment generating function of a random vector X in ℝᵏ. | M_X(t) = E[exp(tᵀX)] for t in a neighbourhood of the origin; the output is a scalar even though the argument is a vector; equivalently it is the univariate MGF of the scalar projection tᵀX evaluated at 1 | — |
| R2 | recall | mcq | 0.64 | The MGF of X ~ N_k(μ, Σ) is: | exp(tᵀμ + ½tᵀΣt) | drops the ½ and answers exp(tᵀμ + tᵀΣt) — the factor is inherited from the univariate exp(sm + ½s²v), not an extra convention → `multivariate-mgf` |
| A1 | apply | numeric | 1.14 | X ~ N₂(μ, Σ) with μ = (1,2)ᵀ and Σ = [[4,2],[2,3]]. Using M_Y(s) = M_X(sa) with a = (1,1)ᵀ, give Var(X₁ + X₂). `[verified]` | aᵀΣa = 4 + 2 + 2 + 3 = 11 | answers 7 by adding only the diagonal, ignoring the two covariance entries the quadratic form aᵀΣa collects → `covariance-matrix` |
| A2 | apply | short-answer | 1.44 | A vector in ℝ² has M(t) = exp(t₁ + 2t₂ + 2t₁² + 2t₁t₂ + 1.5t₂²). Name its distribution and give μ and Σ. `[verified: log M matches tᵀμ + ½tᵀΣt exactly]` | the log is a quadratic with nothing above second order, which is the signature of a normal vector, so X ~ N₂(μ, Σ); the linear part gives μ = (1,2)ᵀ; matching ½σ₁₁ = 2 and ½σ₂₂ = 1.5 gives variances 4 and 3, while the cross term gives σ₁₂ = 2 directly, since the ½ and the two off-diagonal entries cancel *(required: reading σ₁₂ off the cross term without an extra factor of 2)* | halves the cross-term coefficient as well, reporting σ₁₂ = 1 → `multivariate-mgf` |
| E1 | explain | derivation | 1.84 | Derive M_X(t) = exp(tᵀμ + ½tᵀΣt) for X ~ N_k(μ, Σ) without integrating the density. | by the projection definition of the multivariate normal, tᵀX is univariate N(tᵀμ, tᵀΣt); the univariate MGF is E[exp(sY)] = exp(sm + ½s²v), and M_X(t) is that evaluated at s = 1 with m = tᵀμ and v = tᵀΣt; uniqueness of MGFs turns the computation into a characterisation, so any vector with this MGF is multivariate normal *(required: the reduction to the univariate MGF of tᵀX, not an integration)* | — |
| E2 | explain | derivation | 2.04 | Prove M_{AX+b}(t) = exp(tᵀb)·M_X(Aᵀt), and use it to show AX + b is N(Aμ + b, AΣAᵀ) when X is multivariate normal. | tᵀ(AX + b) = (Aᵀt)ᵀX + tᵀb, so the constant leaves the expectation as exp(tᵀb) and the rest is M_X at Aᵀt — the transpose appears because the direction of the projection is pulled back through A; substituting the multivariate normal MGF gives exp(tᵀb + (Aᵀt)ᵀμ + ½(Aᵀt)ᵀΣ(Aᵀt)) = exp(tᵀ(Aμ + b) + ½tᵀ(AΣAᵀ)t), which is the N(Aμ + b, AΣAᵀ) MGF *(required: the Aᵀ substitution, not At)* | writes M_X(At), losing the transpose and with it the AΣAᵀ that every covariance calculation depends on → `multivariate-mgf` |
| T1 | transfer | short-answer | 2.34 | Why does the MGF argument show uncorrelated jointly normal blocks are independent, when zero covariance proves nothing in general? | with Σ₁₂ = 0 the exponent's quadratic form splits as sᵀΣ₁₁s + uᵀΣ₂₂u with no cross terms left, so the joint MGF factors into the two marginal MGFs, which is equivalent to independence; the argument works because the multivariate normal's exponent contains nothing above second order, so killing the second-order cross term kills all the dependence there is, whereas a general distribution has higher-order coupling that zero covariance leaves untouched — exactly `covariance`'s Cov(X, X²) = 0 counterexample *(required: the "nothing above second order" step, not just the factorisation)* | — |

*Coverage: 7 items, 0.34…2.34.*

---

## Quadratic Forms in Random Vectors (`quadratic-forms-random-vectors`)
*Prereq: Multivariate Normal, Covariance Matrix, Trace, Rank, Chi Square Distribution · ancestors 45 · b₀ = 1.41*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.41 | State E[XᵀAX] for a random vector with mean μ and covariance Σ. | E[XᵀAX] = tr(AΣ) + μᵀAμ, and it holds for any distribution with those two moments — normality is nowhere in it | — |
| R2 | recall | mcq | 0.71 | For X ~ N_k(0, I) and A symmetric, XᵀAX is chi-square exactly when: | A is idempotent, and then the degrees of freedom are rank(A), which for an idempotent matrix equals tr(A) | answers "whenever A is positive definite" — positive definiteness makes the form non-negative but says nothing about which distribution it has; idempotence is the condition → `quadratic-forms-random-vectors` |
| A1 | apply | numeric | 1.21 | X has mean μ = (1,2)ᵀ and covariance Σ = [[4,2],[2,3]]. Compute E of the squared norm of X. `[verified]` | tr(Σ) + μᵀμ = 7 + 5 = 12 | answers 5 by evaluating the form at the mean, the multivariate version of writing E[X²] = (E[X])² → `quadratic-forms-random-vectors` |
| A2 | apply | numeric | 1.51 | Same X. With A = [[1,−1],[−1,1]], compute E[(X₁ − X₂)²]. `[verified]` | tr(AΣ) = 2 + 1 = 3 and μᵀAμ = (1 − 2)² = 1, so E[(X₁ − X₂)²] = 4 | — |
| E1 | explain | derivation | 1.91 | Prove E[XᵀAX] = tr(AΣ) + μᵀAμ. | XᵀAX is 1 × 1 so it equals its own trace, and the trace is cyclic, giving tr(AXXᵀ); the trace is linear so expectation passes inside, leaving tr(A E[XXᵀ]) with E[XXᵀ] = Σ + μμᵀ; expanding gives tr(AΣ) + tr(Aμμᵀ) = tr(AΣ) + μᵀAμ, the last step being the cyclic property once more on a scalar *(required: the trace trick, not a coordinate-by-coordinate expansion)* | — |
| E2 | explain | derivation | 2.11 | For X ~ N_n(μ1, σ²I), show that XᵀCX/σ² ~ χ²_{n−1} where C = I − (1/n)11ᵀ is the centring matrix. `[verified: C idempotent, tr(C) = n − 1, Monte Carlo mean 4.00 and variance 8.00 at n = 5]` | C is symmetric and C² = C, since 1ᵀ1 = n makes the cross terms collapse, so C is an orthogonal projection with tr(C) = n − 1 = rank(C); an idempotent quadratic form in a standard normal vector is χ² on rank(C) degrees of freedom; the mean is annihilated because C1 = 0, so no noncentrality term survives and the distribution does not depend on μ at all *(required: both the idempotence check and the C1 = 0 step)* | — |
| T1 | transfer | short-answer | 2.41 | Why are degrees of freedom a dimension rather than a penalty for having estimated a parameter? | the df of an idempotent quadratic form is rank(A), the dimension of the subspace A projects onto; centring projects onto the space orthogonal to the vector of ones, which has dimension n − 1, and fitting p regression coefficients leaves a residual space of dimension n − p — nothing is being "subtracted for estimating something", a subspace is being removed and its dimension is the count *(required: naming rank(A) as the df and reading n − 1 as a dimension)* | treats n − 1 as an arbitrary small-sample correction, which leaves the n − p in regression and the (r−1)(c−1) in a contingency table as three unrelated rules → `quadratic-forms-random-vectors` |

*Coverage: 7 items, 0.41…2.41.*

---

## Cochran's Theorem (`cochrans-theorem`)
*Prereq: Quadratic Forms in Random Vectors, Mutual Independence, Sample Variance, t-Distribution · ancestors 51 · b₀ = 1.48*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.48 | State Cochran's theorem. | for X ~ N_n(0, σ²I), if the squared norm of X decomposes as a sum of quadratic forms XᵀA_iX with ranks r_i, then the ranks summing to n is equivalent to the pieces being independent, each χ²_{r_i} after dividing by σ² | — |
| R2 | recall | mcq | 0.78 | The condition that makes the pieces independent chi-squares is: | that the ranks of the quadratic forms sum to n, the ambient dimension | answers "that the pieces be uncorrelated" — uncorrelatedness is a consequence, and outside the normal family it would not give independence anyway → `cochrans-theorem` |
| A1 | apply | numeric | 1.28 | Group A is (4,6,8) and group B is (10,12,14). Build the one-way decomposition and give the F-statistic. `[verified: total 70 = between 54 + within 16, df 1 and 4]` | grand mean 9, group means 6 and 12, so between-group SS is 27 + 27 = 54 on 1 df and within-group SS is 8 + 8 = 16 on 4 df, giving F = 54/(16/4) = 13.5 | — |
| A2 | apply | short-answer | 1.58 | For X₁,…,Xₙ iid N(μ, σ²), write the decomposition Cochran is applied to and check its rank condition. | standardise to Z = (X − μ1)/σ ~ N_n(0, I) and split the squared norm as ZᵀPZ + ZᵀCZ with P = (1/n)11ᵀ and C = I − P; rank(P) = 1 and rank(C) = n − 1, which sum to n, so the two pieces are independent with the first χ²₁ and the second χ²_{n−1} *(required: the explicit rank count 1 + (n − 1) = n)* | — |
| E1 | explain | derivation | 1.98 | Use the decomposition to prove X̄ and S² are independent, and assemble the t-statistic from the pieces. | the two pieces are functions of X̄ and of S² separately, so Cochran's independence transfers to them; the first gives √n(X̄ − μ)/σ ~ N(0,1) and the second gives (n−1)S²/σ² ~ χ²_{n−1}; dividing the standard normal by the square root of the independent chi-square over its df cancels σ and leaves √n(X̄ − μ)/S ~ t_{n−1} — the independence is what licenses the ratio, since the t is defined only for independent numerator and denominator *(required: naming the independence as what the t definition needs)* | — |
| E2 | explain | short-answer | 2.18 | Why does the theorem need the covariance to be σ²I specifically? | the proof rotates to an orthonormal basis adapted to the subspaces, which is legitimate only because N(0, σ²I) is rotation-invariant — QᵀX has covariance QᵀσIQ = σ²I, the same distribution; with a general Σ that step fails, the pieces become weighted mixtures of chi-squares rather than chi-squares, and the nominal degrees of freedom are wrong, which is exactly what Welch and Satterthwaite corrections repair *(required: rotation-invariance as the property being used)* | — |
| T1 | transfer | short-answer | 2.48 | An ANOVA table's degrees-of-freedom column sums to n. What is that really asserting, and what breaks in an unbalanced design with sequential sums of squares? | it asserts Cochran's rank condition, so the column summing correctly is the certificate that the sums of squares are independent chi-squares and the F-ratios are genuine F's; in an unbalanced design the subspaces for different factors are not orthogonal, so sequential sums of squares depend on the order the terms enter and the pieces are not independent — the ranks may still add up while the orthogonality that gave them meaning does not hold *(required: connecting non-orthogonal subspaces to the order-dependence of Type I sums of squares)* | reads the df column as bookkeeping that always works out, missing that it is a claim about orthogonal subspaces → `cochrans-theorem` |

*Coverage: 7 items, 0.48…2.48.*

---

## Distribution of β̂ (`distribution-of-beta-hat`)
*Prereq: Cochran's Theorem, Multivariate MGF, Linear Regression (Probabilistic Version), Geometric Interpretation of OLS, F-Distribution · ancestors 69 · b₀ = 1.62*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.62 | Under y = Xβ + ε with ε ~ N(0, σ²I) and X of full column rank, state the exact distribution of β̂. | β̂ ~ N_p(β, σ²(XᵀX)⁻¹) — multivariate normal, unbiased, with a covariance that depends on the design and σ² but never on y | — |
| R2 | recall | mcq | 0.92 | The exactness of that distribution in finite samples rests on: | the errors being Normal, together with β̂ being an exactly linear function of y | credits the central limit theorem — the CLT is the fallback when the errors are not Normal and delivers only an asymptotic statement, so it cannot be what makes a finite-sample result exact → `distribution-of-beta-hat` |
| A1 | apply | numeric | 1.42 | Four observations at x = 1,2,3,4 with an intercept, and σ² = 1. Compute Var(β̂₁). `[verified: (XᵀX)⁻¹ = [[1.5,−0.5],[−0.5,0.2]]]` | XᵀX = [[4,10],[10,30]] with determinant 20, so the inverse has lower-right entry 4/20, so Var(β̂₁) = σ²/S_xx with S_xx = 5, i.e. 1/5 = 0.2 | — |
| A2 | apply | numeric | 1.72 | Same design with y = (3,4,6,8). Compute the t-statistic for the slope. `[verified: β̂ = (1, 1.7), RSS = 0.30, s² = 0.15, SE = 0.1732, t = 9.8150]` | β̂₁ = 8.5/5 = 1.7 with residuals 0.3, −0.4, −0.1, 0.2, so RSS = 0.30 and s² = 0.30/(4 − 2) = 0.15, giving SE = √(0.15 × 0.2) = 0.1732 and t ≈ 9.82 | divides RSS by n instead of n − p, understating the standard error because the df is the rank of I − H, not the sample size → `quadratic-forms-random-vectors` |
| E1 | explain | derivation | 2.12 | Derive β̂ ~ N_p(β, σ²(XᵀX)⁻¹) from the affine-map rule for multivariate normals. | β̂ = Ay with A = (XᵀX)⁻¹Xᵀ a fixed matrix, so β̂ is an affine image of y ~ N(Xβ, σ²I) and is therefore multivariate normal; its mean is AXβ = β and its covariance is A(σ²I)Aᵀ = σ²(XᵀX)⁻¹XᵀX(XᵀX)⁻¹ = σ²(XᵀX)⁻¹, where the collapse depends on the error covariance being a multiple of the identity *(required: identifying β̂ as exactly linear in y, and using σ²I in the covariance collapse)* | — |
| E2 | explain | derivation | 2.32 | Show that RSS/σ² ~ χ²_{n−p} and that it is independent of β̂, then assemble the t-statistic. | residuals are e = (I − H)y = (I − H)ε since (I − H)X = 0, so RSS/σ² is a quadratic form in a standard normal vector with I − H idempotent of rank n − p, hence χ²_{n−p} and E[s²] = σ²; β̂ − β = (XᵀX)⁻¹Xᵀε is a linear form whose matrix satisfies (XᵀX)⁻¹Xᵀ(I − H) = 0, so by Cochran the fit and the residuals live in orthogonal subspaces and are independent; dividing the standard normal (β̂ⱼ − βⱼ)/(σ√[(XᵀX)⁻¹]ⱼⱼ) by the root of the independent χ²_{n−p}/(n−p) cancels σ and gives t_{n−p} *(required: the orthogonality (XᵀX)⁻¹Xᵀ(I − H) = 0 as the source of the independence)* | — |
| T1 | transfer | short-answer | 2.52 | A joint F-test rejects while no individual t-statistic is significant. What does the geometry of β̂'s distribution say is going on? | the F-test uses the full covariance σ²(XᵀX)⁻¹ and asks whether β̂ lies outside a confidence ellipsoid, while each t looks only at one coordinate's marginal; with strongly correlated predictors the ellipsoid is long and thin along a diagonal, so the origin can sit far outside it while lying inside every one-dimensional projection — collinearity inflates the diagonal of (XᵀX)⁻¹ without inflating the precision of the linear combination the data actually pin down *(required: the ellipsoid-versus-marginal-projection framing, not just "collinearity inflates variances")* | reads the disagreement as an error in one of the tests, rather than as a marginal and a joint statement about the same normal vector → `distribution-of-beta-hat` |
| T2 | transfer | short-answer | 2.62 | Which reported regression numbers survive dropping normality, and which survive dropping homoskedasticity? | dropping normality leaves β̂ unbiased and BLUE by Gauss-Markov and asymptotically normal by the CLT, so t and F become approximations rather than exact — this is the honest reading of `ols-properties`' CLT argument, which is the fallback rather than the justification; dropping homoskedasticity breaks the covariance formula itself, since Cov(β̂) becomes (XᵀX)⁻¹XᵀΣX(XᵀX)⁻¹ and RSS is no longer chi-square, so every printed standard error is wrong rather than merely approximate, and sandwich estimators or weighted least squares are needed *(required: the distinction that non-normality costs exactness while heteroskedasticity costs correctness)* | — |

*Coverage: 8 items, 0.62…2.62.*

---

## Cluster misconception index

| Misconception | Fires on | Blame |
|---|---|---|
| Drops the ½ from the multivariate normal MGF exponent | `multivariate-mgf` R2 | `multivariate-mgf` |
| Halves the cross term when reading Σ off a quadratic exponent | `multivariate-mgf` A2 | `multivariate-mgf` |
| Adds only the diagonal of Σ for the variance of a sum | `multivariate-mgf` A1 | `covariance-matrix` |
| Substitutes At rather than Aᵀt in the affine MGF rule | `multivariate-mgf` E2 | `multivariate-mgf` |
| Confuses positive definiteness with idempotence as the chi-square criterion | `quadratic-forms-random-vectors` R2 | `quadratic-forms-random-vectors` |
| Evaluates the quadratic form at the mean, dropping tr(AΣ) | `quadratic-forms-random-vectors` A1 | `quadratic-forms-random-vectors` |
| Reads degrees of freedom as a penalty rather than a subspace dimension | `quadratic-forms-random-vectors` T1 | `quadratic-forms-random-vectors` |
| Takes uncorrelatedness as Cochran's condition | `cochrans-theorem` R2 | `cochrans-theorem` |
| Treats the ANOVA df column as bookkeeping rather than an orthogonality claim | `cochrans-theorem` T1 | `cochrans-theorem` |
| Credits the CLT for a finite-sample exact distribution | `distribution-of-beta-hat` R2 | `distribution-of-beta-hat` |
| Divides RSS by n rather than by n − p | `distribution-of-beta-hat` A2 | `quadratic-forms-random-vectors` |
| Reads an F/t disagreement as an error rather than a joint-versus-marginal statement | `distribution-of-beta-hat` T1 | `distribution-of-beta-hat` |

**Cluster total: 29 items across 4 concepts, difficulty 0.34…2.62.**

Numeric claims were verified against an independent computation (NumPy) rather than by hand: the
E[XᵀAX] = tr(AΣ) + μᵀAμ values 12 and 4 against a two-million-draw Monte Carlo (11.99 and 4.00,
with the variance formula 2tr(AΣAΣ) + 4μᵀAΣAμ matching at 162.0 and 30.1); the centring matrix's
idempotence, rank and the χ²₄ mean and variance (3.995 and 8.00) at n = 5; the ANOVA split
70 = 54 + 16 with F = 13.5; and the whole worked regression — (XᵀX)⁻¹ = [[1.5, −0.5], [−0.5, 0.2]],
β̂ = (1, 1.7), RSS = 0.30, s² = 0.15, SE(β̂₁) = 0.17321, t = 9.8150, tr(H) = 2 and
rank(I − H) = 2.
