# Machine Learning Cluster 11 — Deep Learning

Activation Functions, SGD and Adaptive Optimizers, Dropout, Batch Normalization, Convolutional
Neural Networks, Recurrent Neural Networks, Attention Mechanism, Transformers, Embeddings,
Autoencoders (10 concepts, 80 items).

Authored directly in
[`web/src/data/items-ml/ml-11-deep-learning.ts`](../web/src/data/items-ml/ml-11-deep-learning.ts);
see the authorship note in [ml-10](ml-10-practical-modelling.md) for why this file is an index
rather than a transcript.

## Why this branch exists

`neural-networks` and `backpropagation` previously dead-ended. The graph could train a dense network
and had nothing to say about what is actually built with one — no activations, no optimisers beyond
plain gradient descent, no architecture at all. For a curriculum aimed at professionals in ML and AI
that is the largest single gap in the domain.

The branch runs from the pieces every architecture shares to the three architectural families and
the representations they produce:

    activation-functions ─┬─ convolutional-neural-networks ─┐
                          └─ recurrent-neural-networks ─ attention-mechanism ─ transformers
    sgd-and-adaptive-optimizers        dropout        batch-normalization ─────┘
    neural-networks ─┬─ embeddings
                     └─ autoencoders

## Graph edges added during authoring

| Edge | Why it is genuine |
|---|---|
| `convolutional-neural-networks` → `overfitting-underfitting` | The architecture *is* a regularisation choice — a prior expressed in which weights exist — and it is why augmentation is not optional |
| `attention-mechanism` → `variance` | The √dₖ scaling is derived from the variance of a sum of independent products |

Two items were instead rewritten to be self-contained rather than given an edge that would have been
a stretch: the transformer/convolution comparison describes the domain assumption in its stem rather
than requiring `convolutional-neural-networks`, and the fine-tuning learning-rate item avoids
requiring `sgd-and-adaptive-optimizers`.

## Threads worth following

The cluster is written to be cross-referential rather than ten independent write-ups. The
vanishing-gradient argument introduced in `backpropagation` is what `activation-functions` explains
the fix for, what `recurrent-neural-networks` shows in its most acute form, and what the additive
cell state and residual connections both answer. Feature scaling reappears as `batch-normalization`
applied mid-network. The bias-variance trade reappears as the vision-transformer/convolution
trade-off, where the trade is over an architectural prior rather than model complexity. And PCA
reappears as the linear special case of an autoencoder.

**Coverage: 10 / 10 concepts, 8 live items each, all clearing `verifyItem` with no blockers or
warnings.**
