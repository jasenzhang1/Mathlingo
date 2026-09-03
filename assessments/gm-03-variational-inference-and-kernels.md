# Graphical Models Cluster 3 — Variational Inference & Kernels

Variational Inference: ELBO, Variational Inference: VAEs, Gaussian Process, Reproducing Kernel
Hilbert Space, Wasserstein Distance (5 concepts). Same format as
[foundations-of-probability.md](foundations-of-probability.md). This is the final cluster of the
graphical-models domain and of the entire expanded sweep.

`variational-inference-elbo`'s A1 reuses `kl-divergence`'s Gibbs'-inequality proof directly to explain
the ELBO's name, and its T1 resolves `em-algorithm`'s lower-bound cliffhanger from the previous
cluster by showing EM is a special case of variational inference, not merely similar to it.

---

## Variational Inference: ELBO (`variational-inference-elbo`)
*Prereq: Mixture Models and Latent Variables, KL Divergence · ancestors 14 · b₀ = 0.85*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.15 | State variational inference's goal. | approximate an intractable posterior p(Z\|X) with a simpler, tractable q(Z), by minimizing D_KL(q(Z)‖p(Z\|X)) | — |
| R2 | recall | mcq | 0.15 | The ELBO is used instead of directly minimizing that KL divergence because: | the true posterior (and its KL divergence) involves the intractable evidence p(X); maximizing the ELBO is mathematically equivalent to minimizing that KL divergence without needing p(X) directly | claims "KL divergence is easier to compute directly" — the opposite is true; it's the intractability of p(X) that forces the ELBO detour → `variational-inference-elbo` |
| A1 | apply | short-answer | 0.65 | State the ELBO decomposition log p(X) = ELBO + D_KL(q‖p(Z\|X)), and explain why this makes ELBO a lower bound. | since D_KL≥0 always (Gibbs' inequality, proven via Jensen's inequality in `kl-divergence`'s E1), rearranging gives ELBO = log p(X) − D_KL(q‖p(Z\|X)) ≤ log p(X) — a direct reuse of that earlier nonnegativity proof, not a fresh argument *(required: the explicit reuse of `kl-divergence`'s nonnegativity)* | — |
| E1 | explain | short-answer | 1.35 | Why is maximizing ELBO over q equivalent to minimizing D_KL(q‖p(Z\|X))? | log p(X) is a constant with respect to q; maximizing ELBO = log p(X) − D_KL(q‖p(Z\|X)) over q is therefore identical to minimizing D_KL(q‖p(Z\|X)) over q — a direct algebraic consequence of the decomposition in A1 *(required: the explicit "constant w.r.t. q" argument)* | — |
| T1 | transfer | short-answer | 1.85 | How is the EM algorithm a special case of variational inference, resolving `em-algorithm`'s earlier lower-bound cliffhanger? | the E-step exactly maximizes the ELBO over q by setting q(Z) to the true posterior when tractable, and the M-step maximizes the ELBO over the model parameters — unifying EM and variational inference under one framework rather than treating EM's "lower bound" as a separate, unrelated fact *(required: names both steps' role in the unified framework)* | — |

*Coverage: 5 items, −0.15…1.85.*

---

## Variational Inference: VAEs (`variational-inference-vaes`)
*Prereq: Variational Inference: ELBO, Neural Networks, Backpropagation · ancestors 32 · b₀ = 1.25*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.25 | Describe a VAE's two networks. | an "encoder" network parameterizing the approximate posterior q(Z\|X); a "decoder" network modeling p(X\|Z); trained by maximizing the ELBO via backpropagation | — |
| R2 | recall | mcq | 0.55 | VAEs generalize classical variational inference by: | using neural networks (flexible function approximators) for the approximate posterior and likelihood, instead of simple hand-chosen parametric families | claims VAEs are "identical to classical VI with no changes" — missing the entire neural-network generalization → `variational-inference-vaes` |
| A1 | apply | short-answer | 1.05 | Why does training a VAE require the reparameterization trick? | backpropagation requires differentiable operations throughout, but sampling directly from a distribution isn't differentiable with respect to its parameters (μ,σ); the trick samples Z=μ+σε for ε~N(0,1), moving randomness into a parameter-free noise variable so the remaining computation is differentiable and backprop-compatible *(required: names the non-differentiability of direct sampling as the specific problem)* | — |
| E1 | explain | short-answer | 1.75 | Why are the encoder and decoder trained jointly rather than separately? | the ELBO decomposes into a reconstruction term (how well the decoder recovers X from a sampled Z) plus a KL-regularization term (how close q(Z\|X) stays to a simple prior p(Z)); both networks' parameters appear in both terms, requiring joint optimization of the shared objective *(required: names both ELBO terms and that both networks appear in both)* | — |
| T1 | transfer | short-answer | 2.25 | Why are VAEs considered generative models, per `generative-vs-discriminative-models`'s ML-sweep distinction? | once trained, new data can be generated by sampling Z from the simple prior p(Z) and passing it through the decoder — the same "generate new samples" capability that concept identified as generative models' distinctive advantage over discriminative ones *(required: the explicit callback to that earlier concept's distinguishing capability)* | — |

*Coverage: 5 items, 0.25…2.25.*

---

## Gaussian Process (`gaussian-process`)
*Prereq: Multivariate Normal, Kernel · ancestors 37 · b₀ = 1.32*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.32 | Describe a GP as a Bayesian nonparametric prior over functions. | "nonparametric" means effective model complexity grows with data, unlike a fixed-size parametric model; a GP is nonetheless fully specified by a mean function and a covariance/kernel function | — |
| R2 | recall | mcq | 0.62 | Which is *not* true of a GP being "nonparametric"? | that it has no parameters whatsoever | the kernel itself typically carries hyperparameters (e.g. bandwidth σ); "nonparametric" describes growing effective complexity, not zero parameters → `gaussian-process` |
| A1 | apply | short-answer | 1.12 | Contrast a parametric model (fixed β regardless of data amount) with a GP's growing effective complexity. | a linear regression's parameter count stays fixed no matter how much data arrives; a GP's effective flexibility grows as more data reveals more structure, since it's a distribution over entire functions rather than a fixed finite parameter vector — the same framing `gp-regression` used in the ML sweep *(required: the explicit fixed-vs-growing contrast)* | — |
| E1 | explain | short-answer | 1.82 | Why does a GP fit into the "graphical models" domain despite not looking like a traditional node/edge graph? | a GP is an infinite-dimensional generalization of a multivariate Normal graphical model, where every possible input point is implicitly a "node," and the kernel function determines the continuum of pairwise dependencies ("edges") between them *(required: the explicit infinite-dimensional-MVN framing)* | — |
| T1 | transfer | short-answer | 2.32 | Why is a GP considered a Bayesian approach specifically? | the GP itself serves as a prior over functions, and observing data updates it into a posterior (also a GP, via the conditioning argument from `gp-regression`) — this prior-to-posterior updating via Bayes' rule is the defining characteristic of a Bayesian method, here applied to an infinite-dimensional function rather than a finite parameter vector *(required: names the prior-to-posterior Bayes'-rule update explicitly)* | — |

*Coverage: 5 items, 0.32…2.32.*

---

## Reproducing Kernel Hilbert Space (`rkhs`)
*Prereq: Mercer's Theorem · ancestors 18 · b₀ = 0.97*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.03 | Describe an RKHS informally, and its reproducing property. | the (possibly infinite-dimensional) feature space implicitly defined by a valid kernel; a Hilbert space where ⟨f, K(x,·)⟩ = f(x) for any f in the space | — |
| R2 | recall | mcq | 0.27 | RKHS theory provides the rigorous foundation for: | why the kernel trick is valid — why replacing dot products with kernel evaluations corresponds to a genuine inner product in some well-defined space | picks "computing p-values" — entirely unrelated to what RKHS theory establishes → `rkhs` |
| A1 | apply | short-answer | 0.77 | Why is the reproducing property ⟨f,K(x,·)⟩=f(x) useful? | it lets evaluating f at a point x be done via an inner product (with the "kernel slice" K(x,·)) instead of computing f(x) directly — connecting pointwise evaluation to the geometric inner-product structure of the space *(required: the explicit "evaluation via inner product" framing)* | — |
| E1 | explain | short-answer | 1.47 | How does RKHS theory relate directly to `mercers-theorem`'s validity condition? | Mercer's theorem guarantees a positive-semi-definite kernel corresponds to *some* genuine inner-product space; RKHS theory then provides the precise, rigorous construction of that exact space, making mathematically precise what "the feature space implied by a kernel" actually is *(required: distinguishes Mercer's existence guarantee from RKHS's explicit construction)* | — |
| T1 | transfer | short-answer | 1.97 | How does RKHS theory justify kernel ridge regression's complexity control? | the RKHS norm of a function serves as a natural complexity penalty (smoother/simpler functions have smaller RKHS norm), giving a rigorous foundation for why penalizing a function's RKHS norm controls model complexity and prevents overfitting — connecting directly back to `regularization`'s general principle from the regression domain *(required: names the RKHS-norm-as-complexity-penalty mechanism, with the explicit regularization callback)* | — |

*Coverage: 5 items, −0.03…1.97.*

---

## Wasserstein Distance (`wasserstein-distance`)
*Prereq: KL Divergence · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | Describe the Wasserstein ("earth mover's") distance, and how it differs from KL divergence structurally. | the minimum cost of transforming one distribution into another, cost being mass moved times distance moved; unlike KL divergence, it *is* a true metric — symmetric and satisfying the triangle inequality | — |
| R2 | recall | mcq | 0.04 | A key advantage of Wasserstein distance over KL divergence is: | it stays well-defined and meaningful even when two distributions have non-overlapping support, where KL divergence becomes infinite or undefined | claims it's "identical to KL divergence mathematically" — missing the entire point of using a different measure → `wasserstein-distance` |
| A1 | apply | short-answer | 0.54 | Why is D_KL(P‖Q) infinite when P puts positive probability where Q has zero probability, and how does Wasserstein avoid this? | D_KL(P‖Q)=E_P[log(P(X)/Q(X))]; if Q(x)=0 where P(x)>0, the log term blows up to +∞ at that point; Wasserstein distance instead stays finite, reflecting the physical distance the mass would need to travel, regardless of overlap *(required: the explicit log-blowup mechanism from `kl-divergence`'s own definition)* | — |
| E1 | explain | short-answer | 1.24 | State the "earth mover's" intuition precisely. | imagining P as a pile of dirt shaped according to its density and Q as a target shape, Wasserstein distance is the minimum total (mass × distance) work needed to reshape the P-pile into the Q-shape *(required: the explicit mass-times-distance "work" framing)* | — |
| T1 | transfer | short-answer | 1.74 | Why did Wasserstein distance become important for training GANs (WGANs) more stably? | Wasserstein distance stays meaningful when a generative model's early, poorly-trained output distribution shares almost no support with the true data distribution — exactly R2's advantage — while KL-divergence-like objectives can vanish or explode in that non-overlapping regime, a genuine source of earlier GANs' training instability *(required: connects the non-overlapping-support scenario explicitly to training instability)* | — |

*Coverage: 5 items, −0.26…1.74. This is the final concept of the entire graphical-models domain and
of the full expanded sweep.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| ELBO's necessity attributed to KL divergence being hard to compute directly | `variational-inference-elbo` |
| VAEs treated as identical to classical VI | `variational-inference-vaes` |
| GP's "nonparametric" label misread as "zero parameters" | `gaussian-process` |
| RKHS theory conflated with an unrelated statistical tool | `rkhs` |
| Wasserstein distance treated as mathematically identical to KL divergence | `wasserstein-distance` |

**Cluster total: 25 items across 5 concepts.**

---

# Graphical Models: complete

**15 / 15 concepts done.** Total items across all 3 clusters: **~75**.
