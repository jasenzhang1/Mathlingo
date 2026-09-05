# Machine Learning Cluster 3 — Bias-Variance & Optimization

Bias-Variance Tradeoff, Overfitting and Underfitting, Gradient Descent, Cross Entropy Loss (4
concepts). Same format as [Cluster 1](ml-01-foundations.md). `gradient-descent` reuses
`matrix-calculus`'s own T1 item verbatim as its definitional justification, and `cross-entropy-loss`'s
T1 is the single most consequential cross-domain link in the ML sweep: training a classifier by
gradient descent on cross-entropy *is* computing an MLE.

---

## Bias-Variance Tradeoff (`bias-variance-tradeoff`)
*Prereq: Loss Functions, Variance · ancestors 13 · b₀ = 0.82*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.18 | State the bias-variance decomposition of expected test error. | expected error = bias² + variance + irreducible error | — |
| R2 | recall | mcq | 0.12 | A high-bias model typically: | is too simple and systematically misses real patterns (underfits) | claims it "fits training data too closely" — that's high variance, not high bias → `bias-variance-tradeoff` |
| A1 | apply | short-answer | 0.62 | A linear model fit to genuinely curved data — is this high bias or high variance? A very high-degree polynomial fit to a small dataset — which is it? | linear-on-curved: high bias (the model's form is too rigid, regardless of data amount); high-degree-on-small-data: high variance (flexible enough to fit this sample's noise, unstable across resamples) *(required: both cases correctly attributed)* | swaps the two, e.g. calling the rigid linear model "high variance" → `bias-variance-tradeoff` |
| E1 | explain | short-answer | 1.32 | Why do bias and variance trade off as model complexity changes? | as complexity increases, bias tends to decrease (more flexible models capture more of the true pattern) while variance tends to increase (more flexible models are more sensitive to the specific noise in a given training sample) — directly reflected in the two separate terms of R1's decomposition moving in opposite directions *(required: both directions, tied to the decomposition)* | — |
| T1 | transfer | short-answer | 1.82 | What structural parallel connects this decomposition to `law-of-total-variance` from the probability/statistics sweep? | both decompose one total quantity into interpretable, separately-actionable pieces — "total variance = within-group + between-group" and "total error = bias² + variance + irreducible error" are the same kind of move: splitting an aggregate into causes that can be addressed independently *(required: names the shared decomposition structure explicitly)* | — |

*Coverage: 5 items, −0.18…1.82.*

---

## Overfitting and Underfitting (`overfitting-underfitting`)
*Prereq: Bias-Variance Tradeoff · ancestors 14 · b₀ = 0.85*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.15 | Define overfitting and underfitting in bias-variance terms. | overfitting: fits training data (including its noise) too well, generalizes poorly — high variance; underfitting: too simple, misses real patterns even in the training data — high bias | — |
| R2 | recall | mcq | 0.15 | The classic symptom of overfitting is: | low training error but high validation/test error (a large gap) | describes underfitting instead — "high error on both" → `overfitting-underfitting` |
| A1 | apply | short-answer | 0.65 | 99% training accuracy, 60% test accuracy — which is this? 55% training, 54% test (both low) — which is this? | first: overfitting (large train/test gap); second: underfitting (both bad and close together, indicating the model isn't capturing patterns present even in training data) *(required: both cases correctly diagnosed)* | — |
| E1 | explain | short-answer | 1.35 | Why does regularization (L1/L2 penalties, early stopping) combat overfitting by *increasing* bias? | regularization deliberately constrains model flexibility, trading a small increase in bias for a larger reduction in variance — per the bias-variance decomposition, this trade can lower *total* error even though bias alone goes up *(required: the explicit trade framing, using the decomposition)* | — |
| T1 | transfer | short-answer | 1.85 | Why does adding more training data generally fix overfitting but does little for underfitting? | more data helps a flexible model "average out" noise, reducing variance — the same 1/√n scaling from `sample-mean`; but it doesn't change the fundamental limitation of a model whose *form* is too simple to capture the true pattern, however much data it sees *(required: the explicit 1/√n connection, and naming the form-limitation for underfitting)* | assumes more data is a universal fix for poor model performance regardless of its source → `overfitting-underfitting` |

*Coverage: 5 items, −0.15…1.85.*

---

## Gradient Descent (`gradient-descent`)
*Prereq: Loss Functions, Matrix Calculus · ancestors 10 · b₀ = 0.70*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.3 | State the gradient descent update rule, and identify η. | θ ← θ − η∇L(θ); η is the learning rate, controlling step size | — |
| R2 | recall | mcq | 0.0 | If η is set too large, gradient descent may: | overshoot the minimum and potentially diverge (oscillate or blow up) | claims it "converges faster with no downside" — a large step size risks instability, not free speed → `gradient-descent` |
| A1 | apply | numeric | 0.5 | L(θ)=(θ−3)², so ∇L(θ)=2(θ−3). Starting at θ=0 with η=0.1, compute θ after one step. `[verified: 0.6]` | ∇L(0)=−6; θ_new=0−0.1(−6)=0.6 | — |
| E1 | explain | short-answer | 1.2 | Using `matrix-calculus`'s fact that the gradient points toward steepest ascent, explain why the update *subtracts* η∇L(θ). | this is exactly `matrix-calculus`'s own T1 argument, now the definitional heart of gradient descent: since ∇L points toward steeper ascent, subtracting it moves toward steeper descent — the correct direction for minimizing L *(required: the explicit reuse of that argument)* | — |
| T1 | transfer | short-answer | 1.7 | Why is stochastic gradient descent (computing the gradient from one or a small minibatch, not the whole dataset) used for huge datasets despite giving a noisier gradient estimate each step? | it trades a noisier per-step estimate for a dramatically cheaper cost per step, letting many more steps run in the same compute budget; the noise itself can even help escape shallow local minima that full-batch gradient descent might get stuck in *(required: both the cost tradeoff and the noise-can-help point)* | — |

*Coverage: 5 items, −0.3…1.7.*

---

## Cross Entropy Loss (`cross-entropy-loss`)
*Prereq: Loss Functions, Likelihood vs Probability · ancestors 12 · b₀ = 0.78*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.22 | State binary cross-entropy loss. | L = −[y log(ŷ) + (1−y) log(1−ŷ)], y the true 0/1 label, ŷ the predicted probability | — |
| R2 | recall | mcq | 0.08 | Cross-entropy loss is directly connected to which earlier concept? | negative log-likelihood — minimizing cross-entropy is exactly maximizing likelihood, from `mle` | treats the connection as coincidental resemblance rather than an exact algebraic identity → `cross-entropy-loss` |
| A1 | apply | numeric | 0.58 | y=1, ŷ=0.9. Compute the loss. Then y=1, ŷ=0.1. Compare. `[verified: 0.105 vs 2.303]` | −log(0.9)≈0.105; −log(0.1)≈2.303 — much larger, reflecting a severe penalty for confident wrongness | — |
| E1 | explain | short-answer | 1.28 | Why does cross-entropy loss go to infinity as a confidently wrong prediction approaches ŷ→0 (with y=1)? Why is that desirable? | −log(ŷ)→∞ as ŷ→0; this unbounded penalty heavily discourages a classifier from being both wrong *and* overconfident, which is a genuinely desirable property — a merely-wrong-but-uncertain prediction is punished far less *(required: the limit argument and why it's a desirable design choice)* | — |
| T1 | transfer | short-answer | 1.78 | Show that minimizing cross-entropy over a dataset of Bernoulli-labeled examples is exactly equivalent to maximizing likelihood (`mle`), and explain what that means for gradient-descent-trained classifiers. | the negative log-likelihood of n independent Bernoulli(ŷᵢ) observations is exactly Σ−[yᵢlog(ŷᵢ)+(1−yᵢ)log(1−ŷᵢ)] — the sum of per-example cross-entropy terms; minimizing this sum via gradient descent is therefore literally computing an MLE, connecting a modern training objective directly to classical estimation theory *(required: the explicit sum-of-log-likelihoods identity, not just "they're related")* | states the connection is a helpful analogy rather than an exact mathematical identity → `cross-entropy-loss` |

*Coverage: 5 items, −0.22…1.78.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| high bias and high variance symptoms swapped | `bias-variance-tradeoff` |
| overfitting and underfitting's train/test gap signatures reversed | `overfitting-underfitting` |
| more data assumed to fix any performance problem | `overfitting-underfitting` |
| large learning rate assumed harmless | `gradient-descent` |
| gradient sign (ascent vs descent) reversed | `gradient-descent` |
| cross-entropy/MLE connection treated as analogy rather than identity | `cross-entropy-loss` |

**Cluster total: 20 items across 4 concepts.** All numeric claims verified, including the exact
cross-entropy values at ŷ=0.9 and ŷ=0.1 showing the ~22× loss penalty for confident wrongness.
