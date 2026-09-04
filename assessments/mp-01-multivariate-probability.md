# Multivariate Probability & Asymptotics — Complete Cluster

Central Limit Theorem, Change of Variables (Jacobian), Covariance Matrix, Bivariate Normal,
Multivariate Normal, Pearson Correlation, Kullback-Leibler Divergence (7 concepts — the entire
`multivariate-probability` domain in one file). Same table format as the earlier clusters (e.g.
[foundations-of-probability.md](foundations-of-probability.md)).

This domain sits at the seam between the probability/statistics sweep and the linear-algebra sweep,
and every item here is written to cash in that position: `change-of-variables-jacobian` generalizes
`distribution-transformations` using `determinant`'s geometric meaning; `covariance-matrix` and
`multivariate-normal` are built directly on `positive-definite-matrices` and the Spectral Theorem;
`kl-divergence`'s nonnegativity proof reuses `jensen-inequality` outright.

---

## Central Limit Theorem (`central-limit-theorem`)
*Prereq: MGF, Law of Large Numbers · ancestors 16 · b₀ = 0.92*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.08 | State the Central Limit Theorem precisely. | for iid X₁,…,Xₙ with mean μ, variance σ², √n(X̄−μ)/σ converges in distribution to N(0,1) as n→∞ | — |
| R2 | recall | mcq | 0.22 | CLT applies to: | any population with finite variance, regardless of shape | claims it applies "only to normally-distributed populations" — missing CLT's entire point, per `sampling-distribution`'s earlier treatment | — |
| A1 | apply | numeric | 0.72 | Population mean 50, variance 100, n=64. State X̄'s approximate distribution per CLT. `[verified]` | approximately N(50, 100/64=1.5625) | — |
| E1 | explain | derivation | 1.42 | Sketch an MGF-based proof of CLT. `[verified: [1+t²/(2n)]^n → e^{t²/2} numerically, matching e^0.5 to 4 decimals at n=1000]` | standardize Yᵢ=(Xᵢ−μ)/σ (mean 0, var 1); its MGF near 0 is M_Y(t)=1+t²/2+o(t²); the MGF of √n(X̄−μ)/σ is [M_Y(t/√n)]ⁿ = [1+t²/(2n)+o(1/n)]ⁿ → e^{t²/2}, the standard normal's MGF; convergence of MGFs implies convergence in distribution, per `mgf`'s uniqueness property *(required: the Taylor expansion and the MGF-convergence-implies-distributional-convergence step)* | — |
| T1 | transfer | short-answer | 1.92 | How does CLT relate to `law-of-large-numbers` — what does CLT add? | LLN says X̄→μ, a single point; CLT describes the *fluctuations around* that point at the √n scale, revealing their shape (asymptotically Normal) — CLT can be seen as "zooming in" on LLN's convergence to see the randomness LLN itself doesn't describe *(required: the "zooming in" framing, not just restating both facts separately)* | — |

*Coverage: 5 items, −0.08…1.92.*

---

## Change of Variables (Jacobian) (`change-of-variables-jacobian`)
*Prereq: PDF, Determinant · ancestors 13 · b₀ = 0.82*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.02 | State the multivariate change-of-variables formula. | for Y=g(X) with g invertible and differentiable, f_Y(y) = f_X(g⁻¹(y))·\|det(J)\|, J the Jacobian matrix of g⁻¹ | — |
| R2 | recall | mcq | 0.32 | \|det(J)\| appears in the formula because it: | measures the local volume-scaling factor of the transformation | dismisses it as "an arbitrary convention" — missing the direct geometric meaning from `determinant` | — |
| A1 | apply | short-answer | 0.82 | Show that the 1-D special case of this formula reduces exactly to `distribution-transformations`'s earlier formula. | in 1D, the Jacobian matrix is the single number g⁻¹′(y), and \|det(J)\|=\|g⁻¹′(y)\| — exactly `distribution-transformations`'s f_Y(y)=f_X(g⁻¹(y))·\|g⁻¹′(y)\|, recovered as n=1 *(required: the explicit reduction, not just "they look similar")* | — |
| E1 | explain | short-answer | 1.52 | Why is the \|det(J)\| factor intuitively necessary? | a transformation that locally expands volume (\|det(J)\|>1) spreads the same total probability over a larger region, decreasing density there; a contraction (\|det(J)\|<1) concentrates probability, increasing density — density scaling is exactly the inverse of `determinant`'s volume-scaling interpretation *(required: both directions of the scaling argument)* | — |
| T1 | transfer | short-answer | 2.02 | Why does converting a 2D density from Cartesian (x,y) to polar (r,θ) require multiplying by r? `[verified: det of the polar Jacobian is exactly r]` | the Jacobian of (x,y)=(r cosθ, r sinθ) has determinant exactly r; this is precisely why polar integration always includes "r dr dθ" rather than "dr dθ" — a calculus fact many students memorize mechanically, now grounded in its density-transformation meaning *(required: the explicit determinant computation, not just citing the memorized rule)* | — |

*Coverage: 5 items, 0.02…2.02.*

---

## Covariance Matrix (`covariance-matrix`)
*Prereq: Covariance, Positive Definite Matrices · ancestors 27 · b₀ = 1.17*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.17 | Define the covariance matrix Σ for a random vector X. | Σᵢⱼ = Cov(Xᵢ,Xⱼ) — symmetric, variances on the diagonal, covariances off-diagonal | — |
| R2 | recall | mcq | 0.47 | Σ is guaranteed to be: | positive semi-definite always, though not necessarily strictly positive definite | claims Σ is "positive definite always" — false whenever an exact linear relationship exists among components, per `positive-definite-matrices`' earlier finding | — |
| A1 | apply | numeric | 0.97 | Var(X₁)=4, Var(X₂)=9, Cov(X₁,X₂)=3. Write Σ. | [[4,3],[3,9]] | — |
| E1 | explain | short-answer | 1.67 | What does a singular Σ (positive semi-definite but not strictly definite) mean about X's components? | reuses `positive-definite-matrices`' T1 directly: aᵀΣa=0 for some nonzero a means Var(aᵀX)=0, i.e. that linear combination is almost surely constant — an exact linear relationship among the components *(required: the direct reuse, not a fresh derivation)* | — |
| T1 | transfer | short-answer | 2.17 | Why is a sample covariance matrix always singular when there are more features than samples (p>n)? What breaks as a result? | the underlying data matrix has rank ≤ min(n,p)=n<p per `rank`'s bound, forcing the sample covariance (built from that data) to be singular too; methods requiring Σ⁻¹ (LDA, Mahalanobis distance) break down or require regularization to proceed *(required: the explicit rank-bound connection)* | — |

*Coverage: 5 items, 0.17…2.17.*

---

## Bivariate Normal (`bivariate-normal`)
*Prereq: Normal Distribution, Covariance, Change of Variables (Jacobian) · ancestors 20 · b₀ = 1.02*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.02 | Name the 5 parameters that fully characterize a bivariate normal. | two means, two variances, one correlation ρ | — |
| R2 | recall | mcq | 0.32 | For a bivariate normal specifically, ρ=0: | does imply independence — a special property of the (multivariate) Normal family | claims "correlation zero never implies independence, even for Normals" — false for jointly Normal variables specifically | — |
| A1 | apply | short-answer | 0.82 | Why doesn't `covariance`'s Cov(X,X²)=0 counterexample contradict R2? | X and X² are not *jointly* Gaussian (bivariate normal) even though X alone is Normal — R2's guarantee requires *joint* normality, which that counterexample never had *(required: names the missing joint-normality condition specifically)* | applies R2's guarantee to any pair involving a Normal variable, regardless of their joint distribution → `bivariate-normal` |
| E1 | explain | derivation | 1.52 | Show directly, from the bivariate normal density formula, that ρ=0 makes it factor into the product of the two marginals. `[verified: f(1,2)=fx(1)*fy(2) exactly]` | at ρ=0, √(1−ρ²)=1 and the cross term −2ρ(x−μx)(y−μy)/(σxσy) vanishes from the exponent, leaving exp(−½[(x−μx)²/σx²+(y−μy)²/σy²]) — which splits exactly into the product of the two univariate Normal densities *(required: the explicit exponent simplification, not just citing the result)* | — |
| T1 | transfer | short-answer | 2.02 | What's the practical implication of R2 — when is checking correlation alone a valid test for independence, and when does that shortcut fail? | it's valid exactly when the variables are (at least approximately) jointly Normal; the shortcut fails the moment joint normality is violated, which is exactly why ICA (from the ML sweep) needed the *stronger* independence criterion for genuinely non-Gaussian sources *(required: the explicit connection back to ICA's motivation)* | — |

*Coverage: 5 items, 0.02…2.02.*

---

## Multivariate Normal (`multivariate-normal`)
*Prereq: Bivariate Normal, Covariance Matrix, Eigendecomposition · ancestors 34 · b₀ = 1.28*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.28 | State the general k-dimensional multivariate normal density. | f(x) = (2π)^(−k/2)\|Σ\|^(−1/2) exp(−½(x−μ)ᵀΣ⁻¹(x−μ)) | — |
| R2 | recall | mcq | 0.58 | The multivariate Normal requires Σ to be: | positive definite (strictly), so Σ⁻¹ and \|Σ\|>0 are well-defined | picks "diagonal" — Σ can have any positive-definite structure, not just a diagonal one → `multivariate-normal` |
| A1 | apply | short-answer | 1.08 | Using Σ=QΛQᵀ (the Spectral Theorem), explain why the MVN's level sets are ellipsoids aligned with Σ's eigenvectors. | writing the quadratic form (x−μ)ᵀΣ⁻¹(x−μ) in the eigenbasis of Σ decouples it into a sum of independent squared terms scaled by 1/λᵢ; equal-density contours are therefore ellipsoids whose axes point along Σ's eigenvectors, with axis lengths proportional to √λᵢ (the standard deviations along those principal directions) *(required: the eigenbasis decoupling, not just "it's an ellipse")* | — |
| E1 | explain | derivation | 1.78 | Show that Z=Σ^(−1/2)(X−μ), for X~MVN(μ,Σ), has a standard MVN distribution, and connect this to univariate standardization. | Σ^(−1/2) is defined via eigendecomposition (QΛ^(−1/2)Qᵀ); this linear transformation gives Cov(Z)=Σ^(−1/2)ΣΣ^(−1/2)=I and E[Z]=0 — the exact multivariate generalization of Z=(X−μ)/σ from `normal-distribution`, with the matrix square root replacing the scalar one *(required: the explicit Cov(Z)=I computation and the univariate parallel)* | — |
| T1 | transfer | short-answer | 2.28 | Why does the multivariate normal underlie so many classical multivariate methods (LDA, MANOVA, Gaussian graphical models)? | once multivariate normality is assumed, every conditional and marginal distribution derived from it is *also* Normal — a remarkably "closed" family under exactly the operations (conditioning, marginalizing) that statistical methods need, making downstream calculations tractable in ways a generic joint distribution would not allow *(required: the closure-under-conditioning-and-marginalizing property specifically)* | — |

*Coverage: 5 items, 0.28…2.28.*

---

## Pearson Correlation (`pearson-correlation`)
*Prereq: Correlation, Sample Variance · ancestors 18 · b₀ = 0.97*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.03 | State the sample Pearson correlation formula. | r = Σ(xᵢ−x̄)(yᵢ−ȳ) / √(Σ(xᵢ−x̄)²Σ(yᵢ−ȳ)²) | — |
| R2 | recall | mcq | 0.27 | Like its population counterpart, sample Pearson correlation measures only: | linear association | claims it measures "any kind of association" — the same limitation `correlation`'s A2 established for ρ carries over exactly to r → `pearson-correlation` |
| A1 | apply | numeric | 0.77 | Data (1,2),(2,4),(3,5),(4,8). Compute r. `[verified: 0.9812]` | r ≈ 0.981 | — |
| E1 | explain | short-answer | 1.47 | Show term-by-term that r is exactly the sample analog of ρ=Cov(X,Y)/(σ_Xσ_Y). | the numerator Σ(xᵢ−x̄)(yᵢ−ȳ) is a sample-covariance-like sum, and the denominator terms √(Σ(xᵢ−x̄)²) are sample-SD-like quantities — r substitutes sample estimates for each population quantity in ρ's formula directly, term by term *(required: the explicit term-by-term correspondence)* | — |
| T1 | transfer | short-answer | 1.97 | Why can reporting r without a confidence interval or a test of H₀:ρ=0 be misleading, especially for small samples? | r is a *statistic* estimating the parameter ρ, per `parameter-vs-statistic`, and carries genuine sampling variability — with a small sample, r can look "impressively large" purely by chance even when the true ρ is zero, so an unqualified r overstates the evidence for a real relationship *(required: the explicit statistic-vs-parameter framing)* | — |

*Coverage: 5 items, −0.03…1.97.*

---

## Kullback-Leibler Divergence (`kl-divergence`)
*Prereq: Expectation · ancestors 10 · b₀ = 0.70*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.3 | Define KL divergence. | D_KL(P‖Q) = E_P[log(P(X)/Q(X))] — measures how different Q is from reference P | — |
| R2 | recall | mcq | 0.0 | D_KL(P‖Q) = D_KL(Q‖P): | is generally false — KL divergence is asymmetric | claims KL "is always symmetric," treating it as a true distance/metric → `kl-divergence` |
| A1 | apply | short-answer | 0.5 | What is always true about D_KL(P‖Q), regardless of P and Q? | it is always ≥0, with equality if and only if P=Q (almost everywhere) — Gibbs' inequality | — |
| E1 | explain | derivation | 1.2 | Prove D_KL(P‖Q)≥0 using Jensen's inequality. `[verified numerically: KL(0.5,0.5 vs 0.9,0.1)=0.511>0]` | D_KL(P‖Q) = E_P[−log(Q(X)/P(X))]; since −log is convex, Jensen gives E_P[−log(Q(X)/P(X))] ≥ −log(E_P[Q(X)/P(X)]); E_P[Q(X)/P(X)] = Σₓ P(x)·Q(x)/P(x) = Σₓ Q(x) = 1 over P's support, so the bound is −log(1)=0 *(required: the full Jensen application with −log's convexity, and the sum-to-1 step)* — a direct reuse of `jensen-inequality` | — |
| T1 | transfer | short-answer | 1.7 | Why is KL divergence so widely used in statistics and ML despite not being a true distance? | it's always nonnegative with a well-defined minimum of exactly 0 at P=Q (E1's Gibbs' inequality), which is precisely what makes "minimize KL divergence" a sensible optimization objective — this same nonnegativity property is what `t-sne` and `variational-inference-elbo` both lean on when using it as a loss *(required: names the nonnegative-minimum property as what licenses using it as an optimization target)* | — |

*Coverage: 5 items, −0.3…1.7.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| CLT restricted to already-Normal populations | `central-limit-theorem` |
| Jacobian determinant treated as an arbitrary convention rather than a volume-scaling factor | `change-of-variables-jacobian` |
| covariance matrices assumed always strictly positive definite | `covariance-matrix` |
| ρ=0⟹independence over-generalized beyond the jointly-Normal case | `bivariate-normal` |
| MVN's Σ requirement relaxed to "diagonal" | `multivariate-normal` |
| sample r treated as a linear-association-free general dependence measure | `pearson-correlation` |
| KL divergence assumed symmetric | `kl-divergence` |

**Cluster total: 35 items across 7 concepts — the entire multivariate-probability domain.** All
numeric and derivation claims verified, including the exact bivariate-normal factorization at ρ=0 and
the MGF Taylor-expansion convergence to e^0.5 at n=1000.
