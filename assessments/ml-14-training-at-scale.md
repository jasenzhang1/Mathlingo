# Machine Learning Cluster 14 — Training Deep Networks at Scale

Weight Initialization, Layer Normalization, Learning Rate Schedules, Data Augmentation, Mixed
Precision Training, Distributed Training (6 concepts, 48 items).

Authored directly in
[`web/src/data/items-ml/ml-14-training-at-scale.ts`](../web/src/data/items-ml/ml-14-training-at-scale.ts);
see the authorship note in [ml-10](ml-10-practical-modelling.md) for why this file is an index rather
than a transcript.

Taught between clusters 11 and 12, immediately after
[ml-13](ml-13-neural-architectures.md), as the section **Training Deep Networks at Scale**.

## Why this cluster exists

Clusters 11 and 13 answer "what gets built and why". Nothing in the graph answered "what does it take
to train one". A learner could describe a transformer in detail and had no node for how its weights
start, why it normalises per token rather than per batch, what a warmup is for, which invariances may
be manufactured into its data, what half precision costs, or what changes when the run stops fitting
on one device. Those are decisions made on every real project, and the first four are made before the
first step runs.

| Concept | The gap it closes |
|---|---|
| `weight-initialization` | The variance argument behind Xavier and He, and why the choice is a property of the activation rather than of the layer |
| `layer-normalization` | `batch-normalization` existed alone, so the graph could not say why no transformer uses it |
| `learning-rate-schedules` | The one hyperparameter that is a function of time, and the warmup that decides whether large runs survive their first hundred steps |
| `data-augmentation` | The cheapest regularisation there is, and the clearest case of a prior expressed in data rather than in weights |
| `mixed-precision-training` | Half the memory and most of the speed of a modern run, plus the silent underflow that comes with it |
| `distributed-training` | What is split, what is communicated, and why the batch size is entangled with the schedule |

## Graph edges added during authoring

New concepts point only at existing ones, so no shipped item's ancestor set — and therefore no seeded
difficulty — changed.

| Edge | Why it is genuine |
|---|---|
| `weight-initialization` → `variance` | Both schemes are derived by requiring Var(y) = n·Var(w)·Var(x) to be preserved layer to layer. The argument *is* the variance of a sum |
| `weight-initialization` → `loss-functions` | The standard check on an initialisation is what the loss reports at step zero — ln(k) for k balanced classes — which cannot be stated without it |
| `layer-normalization` → `transformers` | The content that matters is pre-norm versus post-norm and the batch-independence argument, and neither exists without the architecture that made the choice consequential |
| `data-augmentation` → `training-validation-test-set` | Augmentation is defined as a training-split-only transform, and its worst failure — augmenting before the split — cannot be stated without the split |
| `distributed-training` → `learning-rate-schedules` | The linear scaling rule and the warmup it requires are why a batch-size decision is a schedule decision |

Two items were rewritten to stand on their own rather than take an edge that would have been a
stretch: the initialisation item that asks why modern networks are less sensitive names the two
architectural changes in its stem rather than requiring `batch-normalization`, which is not upstream
of it; and the diverging-run item contrasts optimisation against the model and the data rather than
against regularisation, which would have required `overfitting-underfitting`.

## Threads worth following

**Everything here is an exponential in depth or in scale.** Initialisation is the clearest case —
n·Var(w) is applied once per layer, so 0.5 and 2.0 are both catastrophic by layer thirty, and that is
the same compounding the residual connection answers in cluster 13. The pipeline bubble, the
all-reduce volume and the optimiser's 14 bytes per parameter are the same kind of arithmetic done on
the other axis.

**Half of this cluster is about statistics you do not control.** Batch norm's statistics come from
whoever else is in the batch; Adam's second moment is an estimate built from a handful of steps; a
loss scale exists because fp16 cannot represent what a gradient distribution actually contains. Layer
normalisation, warmup and loss scaling are three answers to the same shape of problem.

**The augmentation article is the bridge to cluster 15.** An invariance asserted through data rather
than through weights is exactly what a contrastive objective consumes, and the item about colour
jitter destroying a ripeness classifier is the same argument as the one in `contrastive-learning`,
reached from the supervised side.

**Numeric claims** verified against a computation script [verified]: √(2/512) = 0.0625,
ln(10) = 2.303, −4/√8 = −1.4142, 2 × 768 = 1536, (500/2000) × 3e−4 = 7.5e−5,
½(1 + cos(π/4)) × 4e−4 = 3.4142e−4, (512 − 448 + 1)² = 4225, 2e−9 × 32768 = 6.5536e−5,
14 bytes × 3e9 = 42 GB, 32 × 16 × 2 = 1024, and 7/23 = 0.3043.

**Coverage: 6 / 6 concepts, 8 live items each, all clearing `verifyItem` with no blockers or
warnings.**
