# Machine Learning Cluster 9 — Gaussian Processes

GP Regression, GP Classification (2 concepts). Same format as [Cluster 1](ml-01-foundations.md). This
is the final cluster of the machine-learning domain.

---

## GP Regression (`gp-regression`)
*Prereq: Multivariate Normal, Kernel · ancestors 37 · b₀ = 1.32*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.32 | Describe a Gaussian Process. | a distribution over functions such that any finite set of function values follows a multivariate Normal distribution, governed by a mean function and a covariance (kernel) function | — |
| R2 | recall | mcq | 0.62 | The kernel function in a GP determines: | how correlated the function's values are at nearby vs. far-apart input points — a smoother kernel implies a smoother expected function | picks "the random seed used" — unrelated to what the kernel actually encodes → `gp-regression` |
| A1 | apply | short-answer | 1.12 | Why do GP predictions come with a built-in measure of uncertainty, rather than just a point estimate? | since a GP defines a full multivariate Normal over function values, predicting at a new point is simply *conditioning* that Gaussian on observed points — the multivariate Normal's own conditional-distribution formulas (closely related to the Schur complement from the linear-algebra sweep) naturally yield both a predicted mean and a predicted variance *(required: the conditioning argument, with the Schur complement connection)* | — |
| E1 | explain | short-answer | 1.82 | Why is GP predictive uncertainty typically small near training points and larger far from them? | a decaying kernel (e.g. RBF-style) means points far from any observed data are only weakly correlated with it, leaving the conditional Gaussian's variance large there; near observed points, strong correlation pins the prediction down tightly *(required: the kernel-decay-to-correlation-to-variance chain)* | — |
| T1 | transfer | short-answer | 2.32 | Why are GPs especially valued in Bayesian optimization (e.g. tuning expensive-to-evaluate hyperparameters)? | the built-in uncertainty estimates (E1) let an optimization algorithm balance exploitation (trying points near where the GP predicts good outcomes) against exploration (trying points where the GP is highly uncertain and might reveal a surprising improvement) — directly useful for the expensive hyperparameter tuning `hyperparameters` described *(required: names both exploitation and exploration explicitly)* | — |

*Coverage: 5 items, 0.32…2.32.*

---

## GP Classification (`gp-classification`)
*Prereq: GP Regression, Logistic Regression · ancestors 56 · b₀ = 1.52*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.52 | Describe the key challenge extending GP regression to classification, and its standard solution. | a GP's raw output is a continuous Gaussian value, but classification needs a probability in [0,1]; passing the output through a squashing/link function (the sigmoid, as in logistic regression) maps it to a valid probability | — |
| R2 | recall | mcq | 0.82 | Once passed through a sigmoid link, exact Bayesian inference becomes: | generally intractable in closed form, requiring approximation methods (e.g. the Laplace approximation) | claims it stays "exactly as easy/closed-form as GP regression" — the nonlinearity breaks the closed-form Gaussian-conditioning property entirely → `gp-classification` |
| A1 | apply | short-answer | 1.32 | Why does GP regression have a closed-form solution while GP classification doesn't? | conditioning one Gaussian on another stays Gaussian, giving GP regression its clean closed form; passing the underlying Gaussian through a nonlinear sigmoid destroys that Gaussian structure entirely, so the classification posterior is no longer Gaussian and has no simple closed form *(required: names the sigmoid's nonlinearity as specifically what breaks the closed form)* | — |
| E1 | explain | short-answer | 2.02 | What role does the sigmoid link play, and how does it connect GP classification to logistic regression directly? | both use the sigmoid to convert an unbounded real-valued score — a linear combination in logistic regression, a GP function value here — into a valid probability in [0,1]; the same function serving the same conversion purpose in both methods *(required: names the shared purpose explicitly, not just "both use sigmoid")* | — |
| T1 | transfer | short-answer | 2.52 | Describe GP classification as a generalization of logistic regression. | GP classification is a nonparametric, infinite-dimensional generalization of logistic regression — rather than assuming the underlying score is a simple linear function of the inputs, it allows the score to be any function drawn from a flexible Gaussian process prior, at the cost of needing approximate rather than exact inference *(required: names both the generalization and its approximation-inference cost)* | — |

*Coverage: 5 items, 0.52…2.52. This is the final concept of the entire machine-learning domain.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| kernel's role in a GP prior confused with an unrelated randomness source | `gp-regression` |
| GP classification assumed to retain regression's exact closed form | `gp-classification` |

**Cluster total: 10 items across 2 concepts.**

---

# Machine Learning: complete

**50 / 50 concepts done.** Total items across all 9 clusters: **~255**.
