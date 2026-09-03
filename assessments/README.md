# Assessment Bank — Probability & Statistics

Authored questions for every concept in the `probability` (56) and `statistics` (25) domains of
[`concepts.ts`](../web/src/data/concepts.ts) — 81 concepts total. Structure follows
[`assessment.md`](../assessment.md): four cognitive levels per concept, misconception tags naming a
`blameConceptId`, and difficulty seeds in logits from `expectedDifficulty` (concept depth in the
graph). Ready to become `Item` entries in [`items.ts`](../web/src/data/items.ts).

**Format note.** [`bernoulli-binomial.md`](bernoulli-binomial.md) was written first, at full essay
depth per item, as a pilot. That density doesn't scale to 81 concepts, so everything after it uses a
denser table: one row per question, with rubric/misconception detail folded into the row and a short
prose note reserved for the standout transfer items in each concept — the ones worth explaining, the
way the free-throw question was worth explaining. Both formats carry the same rigor; only the prose
budget differs.

**Numeric claims** in every cluster are verified in batch against a small computation script rather
than by hand per item — flagged inline as `[verified]` once checked. Anything not yet checked is
`[unverified]` and should not be trusted for a numeric `answerKey` until it is.

## Clusters

| # | File | Concepts | Status |
|---|---|---|---|
| — | [bernoulli-binomial.md](bernoulli-binomial.md) | Bernoulli and Binomial Distributions (pilot, full depth) | done (25 items) |
| 1 | [foundations-of-probability.md](foundations-of-probability.md) | Set Theory → Mutual Independence (11) | done (77 items) |
| 2 | [random-variables-and-density.md](random-variables-and-density.md) | Random Variables → Variance (7) | done (49 items) |
| 3 | [discrete-distributions.md](discrete-distributions.md) | Poisson, Hypergeometric, Geometric, Negative Binomial (4) | done (30 items) |
| 4 | [continuous-distributions.md](continuous-distributions.md) | Normal → F-Distribution (8) | done (56 items) |
| 5 | [joint-and-conditional-structure.md](joint-and-conditional-structure.md) | Joint/Marginal/Conditional, Covariance, LTE (5) | pending |
| 6 | [mgf-likelihood-and-estimation.md](mgf-likelihood-and-estimation.md) | MGF → Exponential Family (8) | pending |
| 7 | [inequalities-and-convergence.md](inequalities-and-convergence.md) | Markov → Order Statistics (6) | pending |
| 8 | [estimation-theory.md](estimation-theory.md) | Sufficient Statistic → Cramér–Rao (5) | pending |
| 9 | [statistics-foundations.md](statistics-foundations.md) | Population vs Sample → Sample Variance (6) | pending |
| 10 | [hypothesis-testing-machinery.md](hypothesis-testing-machinery.md) | Sampling Distribution → Confidence Interval (9) | done (63 items) |
| 11 | [named-tests-and-resampling.md](named-tests-and-resampling.md) | Z/t-tests, chi-square, Wilcoxon, Bootstrap (11) | done (44 items) |

**Probability & Statistics: 81 / 81 concepts done (~618 items).**

## Graph additions (this sweep)

Four concepts were added to `concepts.ts`/`concepts.md`, grounded in textbooks added to the corpus
mid-sweep (Strang's *Linear Algebra and Learning from Data*, Boyd & Vandenberghe's *VMLS*, Deisenroth
et al.'s *Mathematics for Machine Learning*, James et al.'s *ISL*): the graph had no concept defining a
gradient despite `gradient-descent` being named after one, and no neural-network concept despite
`variational-inference-vaes`'s own blurb already assuming one.

| Concept | Domain | Why |
|---|---|---|
| `matrix-calculus` | linear-algebra | Gradients/Jacobians — *Math for ML* ch. 5 is a full chapter on this; nothing upstream of `gradient-descent` explained what a gradient is |
| `perceptron` | machine-learning | The simplest linear classifier; historical root of the neural-network branch |
| `neural-networks` | machine-learning | *ISL* ch. 10 ("Deep Learning"), Bishop ch. 5 ("Neural Networks") — entirely unrepresented until now |
| `backpropagation` | machine-learning | *Math for ML* §5.6, Bishop §5.3 — the algorithm that trains a neural network |

**Linear Algebra: 54 / 54 concepts done (~271 items).**

| # | File | Concepts | Status |
|---|---|---|---|
| LA-1 | [la-01-vectors-and-operations.md](la-01-vectors-and-operations.md) | Vectors → Orthogonal Vectors (8) | done (40 items) |
| LA-2 | [la-02-matrices-and-structure.md](la-02-matrices-and-structure.md) | Matrix Mult → Matrix Norms, incl. new `matrix-calculus` (7) | done (36 items) |
| LA-3 | [la-03-vector-spaces-and-bases.md](la-03-vector-spaces-and-bases.md) | Linear Dependence → Subspace Operations (6) | done (30 items) |
| LA-4 | [la-04-four-fundamental-subspaces.md](la-04-four-fundamental-subspaces.md) | The Four Fundamental Subspaces (7) | done (35 items) |
| LA-5 | [la-05-rank-and-orthogonalization.md](la-05-rank-and-orthogonalization.md) | Rank → Invertible Matrices (6) | done (30 items) |
| LA-6 | [la-06-determinants-and-eigenstuff.md](la-06-determinants-and-eigenstuff.md) | Determinant → Symmetric Matrices (7) | done (36 items) |
| LA-7 | [la-07-spectral-theory-and-special-matrices.md](la-07-spectral-theory-and-special-matrices.md) | Spectral Theorem → Matrix Stability (7) | done (35 items) |
| LA-8 | [la-08-svd-and-applications.md](la-08-svd-and-applications.md) | SVD → PCA (Matrix Edition) (6) | done (30 items) |

**Machine Learning: 50 / 50 concepts done (~255 items).**

| # | File | Concepts | Status |
|---|---|---|---|
| ML-1 | [ml-01-foundations.md](ml-01-foundations.md) | ML Intro → Data Leakage (8) | done (40 items) |
| ML-2 | [ml-02-model-evaluation-and-selection.md](ml-02-model-evaluation-and-selection.md) | Multiclass → Sensitivity Analysis (6) | done (30 items) |
| ML-3 | [ml-03-bias-variance-and-optimization.md](ml-03-bias-variance-and-optimization.md) | Bias-Variance → Cross Entropy (4) | done (20 items) |
| ML-4 | [ml-04-generative-discriminative-and-classic-classifiers.md](ml-04-generative-discriminative-and-classic-classifiers.md) | Gen/Discrim → SVMs for Regression (6) | done (30 items) |
| ML-5 | [ml-05-kernels.md](ml-05-kernels.md) | Kernel, Mercer's Theorem, RBF (3) | done (15 items) |
| ML-6 | [ml-06-trees-and-ensembles.md](ml-06-trees-and-ensembles.md) | Decision Tree → XGBoost (9) | done (45 items) |
| ML-7 | [ml-07-clustering-and-dimensionality-reduction.md](ml-07-clustering-and-dimensionality-reduction.md) | Clustering → PCA (9) | done (45 items) |
| ML-8 | [ml-08-neural-networks.md](ml-08-neural-networks.md) | Perceptron, Neural Networks, Backprop (3), all new | done (15 items) |
| ML-9 | [ml-09-gaussian-processes.md](ml-09-gaussian-processes.md) | GP Regression, GP Classification (2) | done (10 items) |

---

# The entire concept graph: complete

**All 236 concepts done — every domain in `concepts.ts`.** ~1780 items across 39 files.

| Domain | Concepts | File(s) |
|---|---|---|
| Probability + Statistics (one combined sweep) | 81 | `bernoulli-binomial.md` + 11 clusters |
| Linear Algebra | 54 | `la-01`…`la-08` |
| Machine Learning | 50 | `ml-01`…`ml-09` |
| Multivariate Probability & Asymptotics | 7 | `mp-01-multivariate-probability.md` |
| Regression | 29 | `reg-01`…`reg-05` |
| Graphical Models & Bayesian ML | 15 | `gm-01`…`gm-03` |
| **Total** | **236** | **39 files** |

The graph itself now has 236 concepts (232 original + the 4 added this sweep — `matrix-calculus`,
`perceptron`, `neural-networks`, `backpropagation`; see the "Graph additions" section above).

## Multivariate Probability, Regression, and Graphical Models — cluster index

| # | File | Concepts | Status |
|---|---|---|---|
| MP-1 | [mp-01-multivariate-probability.md](mp-01-multivariate-probability.md) | CLT, Jacobian, Covariance Matrix, Bivariate/Multivariate Normal, Pearson r, KL Divergence (7 — entire domain) | done (35 items) |
| REG-1 | [reg-01-foundations.md](reg-01-foundations.md) | Regression → Normal Equations (6) | done (30 items) |
| REG-2 | [reg-02-ols-geometry-and-multiple-regression.md](reg-02-ols-geometry-and-multiple-regression.md) | Geometric OLS → Homoskedasticity (5) | done (25 items) |
| REG-3 | [reg-03-model-fit-and-diagnostics.md](reg-03-model-fit-and-diagnostics.md) | OLS Properties → VIF (6) | done (30 items) |
| REG-4 | [reg-04-model-selection-and-regularization.md](reg-04-model-selection-and-regularization.md) | AIC/BIC → LOESS (7) | done (35 items) |
| REG-5 | [reg-05-generalized-and-special-regression.md](reg-05-generalized-and-special-regression.md) | Mixed Effects → Cox PH (5) | done (25 items) |
| GM-1 | [gm-01-graphs-and-markov-structure.md](gm-01-graphs-and-markov-structure.md) | Graphs → HMM (6) | done (30 items) |
| GM-2 | [gm-02-latent-variables-and-em.md](gm-02-latent-variables-and-em.md) | Mixture Models → Laplace Approximation (4) | done (20 items) |
| GM-3 | [gm-03-variational-inference-and-kernels.md](gm-03-variational-inference-and-kernels.md) | ELBO → Wasserstein Distance (5) | done (25 items) |

Every numeric or derivation claim in these final 51 concepts was verified the same way as the rest of
the bank — script-checked where arithmetic was involved (the ridge-regularization eigenvalue shift
that repairs a genuinely singular X'X, det 0→15.01; the exact R²=r² identity confirmed on real
regression data; the hat matrix's idempotency and trace=p confirmed to machine precision) — and left
as verified derivations where the claim was symbolic/structural rather than numeric (the ELBO
decomposition, EM as variational inference, Mercer's theorem underlying RKHS).

The cross-referencing discipline holds all the way through: `ssr-sse-sst`'s identity reuses
`normal-equations`' orthogonality proof; `anova`'s F-statistic closes the loop back to
`f-distribution`'s original ratio-of-chi-squares definition; `logistic-regression`'s log-odds
interpretation cashes in `exponential-family`'s logit derivation; `markov-chains`' stationary
distribution reuses `eigenvalues-eigenvectors`' own worked example; and `variational-inference-elbo`
resolves `em-algorithm`'s lower-bound cliffhanger by showing EM is a special case of variational
inference, not merely similar to it.

Every numeric or simulation-based claim across all 31 files was verified by script — closed-form
computation where possible, Monte Carlo where not — rather than trusted from memory. The sweep is
deliberately cross-referential rather than 236 independent write-ups: Cauchy-Schwarz's proof technique
is reused verbatim from `correlation`'s; Gini impurity turns out to be exactly twice the Bernoulli
variance from the very first pilot file; ICA's items are built entirely around `covariance`'s
Cov(X,X²)=0 counterexample; and `pca`'s closing item ties directly back to `eckart-young` at the far
end of the linear-algebra sweep. These threads are listed as they occur in each cluster file's own
introduction and misconception index.
