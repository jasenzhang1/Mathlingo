# Graphical Models Cluster 2 — Latent Variables & EM

Mixture Models and Latent Variables, EM Algorithm, Gaussian Mixture Models, Laplace Approximation (4
concepts). Same format as [foundations-of-probability.md](foundations-of-probability.md).

`em-algorithm`'s A1 draws a direct structural parallel to `k-means-clustering` from the ML sweep (EM
*is* soft K-means, not merely analogous to it), and `laplace-approximation`'s R2 reuses
`fisher-information`'s "sharper peak = more information = lower variance" intuition as an exact identity
rather than a resemblance.

---

## Mixture Models and Latent Variables (`mixture-models-and-latent-variables`)
*Prereq: Marginal Distribution · ancestors 7 · b₀ = 0.54*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.46 | Describe a mixture model. | observed data comes from one of several component distributions, with a latent variable Z indicating which component generated each observation; the observed distribution is the marginal of the joint (Z,X), summed/integrated over Z | — |
| R2 | recall | mcq | −0.16 | The latent variable Z is: | never observed — it must be inferred | claims Z is "directly observed in the data" — contradicting the entire meaning of "latent" → `mixture-models-and-latent-variables` |
| A1 | apply | short-answer | 0.34 | Using `marginal-distribution`'s formula p_X(x)=Σ_z p(x,z), derive the mixture density p(x)=Σₖ πₖfₖ(x). | this is literally `marginal-distribution`'s summing-out-the-other-variable operation applied to Z: p(x)=Σ_z p(x,z)=Σₖ P(Z=k)·p(x\|Z=k)=Σₖ πₖfₖ(x) *(required: the explicit derivation from that earlier formula, not a fresh statement)* | — |
| E1 | explain | short-answer | 1.04 | Why can a mixture of simple unimodal components represent complex, multi-modal distributions? | even though each component is unimodal, their weighted combination can produce arbitrarily complex shapes with multiple "bumps" — similar in spirit to how a Fourier series builds complex functions from simple sine waves *(required: the Fourier-series-style analogy or an equivalent argument)* | — |
| T1 | transfer | short-answer | 1.54 | In customer segmentation, why is the "type" (budget-conscious vs. luxury) latent, and why is inferring it still useful? | a company typically has no direct record of which underlying type each customer belongs to — hence latent; the model's inferred segment membership, though a statistical inference rather than an observed fact, can still guide targeted marketing effectively *(required: names both why Z is latent here and why the inference remains useful)* | — |

*Coverage: 5 items, −0.46…1.54.*

---

## EM Algorithm (`em-algorithm`)
*Prereq: MLE, Mixture Models and Latent Variables · ancestors 14 · b₀ = 0.85*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.15 | Describe the EM algorithm's two steps. | E-step: given current parameters, compute the expected value (posterior distribution) of the latent variables given the data; M-step: given those inferred latent values, find parameters maximizing the likelihood as if the latent values were known | — |
| R2 | recall | mcq | 0.15 | EM is needed specifically because: | the likelihood with latent variables marginalized out is generally too complex to maximize directly — the sum/integral over Z inside a log doesn't decompose nicely | claims EM "guarantees finding the global maximum" — false; like K-means, it can get stuck in local optima → `em-algorithm` |
| A1 | apply | short-answer | 0.65 | Why is EM described as alternating between a "soft" K-means assignment step and a K-means update step? | the E-step probabilistically assigns each point to *every* component (soft assignment) rather than K-means' hard, single-component assignment; the M-step then recomputes parameters given those soft assignments, exactly paralleling K-means' centroid update *(required: the explicit soft-vs-hard assignment contrast with `k-means-clustering`)* | — |
| E1 | explain | short-answer | 1.35 | Why does EM guarantee the marginal likelihood increases monotonically each iteration, without directly maximizing it in one step? | the E-step and M-step together construct and maximize a lower bound on the true log-likelihood at each iteration — a preview of the ELBO ("Evidence Lower BOund") formalized in `variational-inference-elbo` later in this domain *(required: names the lower-bound mechanism, not just "EM always improves")* | — |
| T1 | transfer | short-answer | 1.85 | Why do practitioners use the same mitigation (multiple random restarts) for both EM and K-means' local-optimum issue? | given EM's direct structural parallel to K-means established in A1, it inherits the identical local-optimum vulnerability, so the identical fix (multiple restarts, keeping the best result by objective value) applies for the same underlying reason *(required: connects the shared fix to the shared structural cause from A1)* | — |

*Coverage: 5 items, −0.15…1.85.*

---

## Gaussian Mixture Models (`gaussian-mixture-models`)
*Prereq: EM Algorithm, Multivariate Normal · ancestors 40 · b₀ = 1.36*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.36 | Describe a Gaussian Mixture Model. | a mixture model where each component is a multivariate Normal, fit via EM, alternating between soft cluster assignments and re-estimating each component's mean, covariance, and mixing weight | — |
| R2 | recall | mcq | 0.66 | Compared to K-means, GMMs offer: | soft cluster assignments and the ability to model elliptical (not just spherical) shapes, via each component's own covariance | claims GMMs use "hard, all-or-nothing assignments, exactly like K-means" — missing the entire probabilistic-assignment advantage → `gaussian-mixture-models` |
| A1 | apply | short-answer | 1.16 | Why is K-means a special, limiting case of GMM? | as component covariances shrink toward a shared, spherical form (σ²I for small σ²), soft E-step assignments become increasingly "hard" (nearly all probability mass to the single nearest component), recovering K-means' hard-assignment behavior exactly in that limit *(required: the explicit shrinking-covariance limit argument)* | — |
| E1 | explain | short-answer | 1.86 | Why can GMMs capture cluster shapes K-means cannot? | using `multivariate-normal`'s eigendecomposition-based visualization (Σ=QΛQᵀ), each GMM component's covariance can have arbitrary eigenvectors/eigenvalues, allowing ellipsoidal clusters oriented and shaped in any direction — unlike K-means' implicit assumption of spherical clusters *(required: the explicit eigendecomposition connection, not just "GMMs are more flexible")* | — |
| T1 | transfer | short-answer | 2.36 | GMMs face the same challenge as K-means in choosing K, but have one genuine advantage there — what is it? | GMMs provide an explicit likelihood, so AIC/BIC (from the regression domain) can principledly compare different values of K — something ordinary K-means, having no explicit likelihood, cannot do as directly *(required: names the explicit-likelihood-enables-AIC/BIC advantage specifically)* | — |

*Coverage: 5 items, 0.36…2.36.*

---

## Laplace Approximation (`laplace-approximation`)
*Prereq: MLE, Multivariate Normal · ancestors 37 · b₀ = 1.32*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.32 | Describe the Laplace approximation. | approximate a complicated distribution with a Normal centered at its mode, with covariance given by the inverse of the negative Hessian of the log-density at that mode | — |
| R2 | recall | mcq | 0.62 | The Laplace approximation's covariance matrix connects directly to: | Fisher information — the negative Hessian of the log-likelihood at the MLE is (asymptotically) the observed Fisher information | treats the covariance formula as an unrelated technical device rather than recognizing it as Fisher information → `laplace-approximation` |
| A1 | apply | short-answer | 1.12 | Why does a sharply-peaked mode produce a narrow Normal approximation, and a flatter mode a wider one? | a sharp peak means large negative second derivative — large Fisher information, per `fisher-information`'s "sharper peak = more information = lower variance" intuition — directly reused, not a fresh geometric argument *(required: the explicit callback to that earlier intuition)* | — |
| E1 | explain | derivation | 1.82 | Sketch the derivation of the Laplace approximation via Taylor expansion. | Taylor-expand the log of the target density around its mode to second order; the first-order term vanishes since the gradient is zero at a mode; the resulting quadratic approximation to the log-density is exactly the log of a (possibly unnormalized) Normal density, which is why the approximation is Normal *(required: names the vanishing first-order term specifically)* | — |
| T1 | transfer | short-answer | 2.32 | What's a genuine limitation of the Laplace approximation, and what does it motivate? | it performs poorly for highly skewed or multi-modal distributions, per `mixture-models-and-latent-variables`'s earlier discussion — a single Normal centered at one mode can't capture multiple separate "bumps" or severe asymmetry, motivating more flexible methods like variational inference, covered next in this domain *(required: the explicit multi-modal-distribution failure case, connecting back to that earlier concept)* | — |

*Coverage: 5 items, 0.32…2.32.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| latent variable Z assumed observed | `mixture-models-and-latent-variables` |
| EM assumed to guarantee the global optimum | `em-algorithm` |
| GMM's soft assignment advantage over K-means missed | `gaussian-mixture-models` |
| Laplace approximation's covariance treated as an arbitrary formula rather than Fisher information | `laplace-approximation` |

**Cluster total: 20 items across 4 concepts.** This cluster is conceptual/derivational rather than
numerically heavy — its claims rest on exact identities (EM as soft K-means, Laplace's covariance as
observed Fisher information) rather than arithmetic requiring script verification.
