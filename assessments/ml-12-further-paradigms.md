# Machine Learning Cluster 12 — Further Paradigms & Methods

Transfer Learning, Self-Supervised Learning, Reinforcement Learning, Multi-Armed Bandits, Bayesian
Optimization, Stacking, Hierarchical Clustering, Density-Based Clustering (8 concepts, 64 items).

Authored directly in
[`web/src/data/items-ml/ml-12-further-paradigms.ts`](../web/src/data/items-ml/ml-12-further-paradigms.ts);
see the authorship note in [ml-10](ml-10-practical-modelling.md).

## Why these eight

Six of the eight were named by earlier clusters and defined nowhere. The most conspicuous:
`types-of-machine-learning` listed reinforcement learning as one of the three families of machine
learning, and the graph then contained no node for it — a learner could complete the domain without
ever meeting a state, an action or a reward.

| Concept | Named without definition by |
|---|---|
| `reinforcement-learning` | `types-of-machine-learning`, as one of the three families |
| `stacking` | `ensemble-methods`, as the third family alongside bagging and boosting |
| `hierarchical-clustering` | `clustering-methods`, in its table of families |
| `density-based-clustering` | `clustering-methods` and `k-means-clustering`, as what handles the concentric-rings case |
| `bayesian-optimization` | `gp-regression`, whose transfer item is entirely about it |
| `transfer-learning`, `self-supervised-learning` | `types-of-machine-learning`'s note on self-supervision, and the deep-learning branch above |

`multi-armed-bandits` was added because it is where the exploration-exploitation trade-off can be
seen in isolation, with regret as a scoreboard and guarantees the general reinforcement learning case
does not have.

## Graph edges added during authoring

| Edge | Why it is genuine |
|---|---|
| `transfer-learning` → `feature-scaling` | Matching the pretrained model's own input normalisation is not optional, and getting it wrong is the most common silent failure in fine-tuning |

Two items were rewritten to be self-contained rather than adding an edge that would have been a
stretch: the offline reinforcement learning item describes the logged-data constraint in its stem
rather than requiring `distribution-shift`.

## Threads worth following

`multi-armed-bandits` and `bayesian-optimization` are the same balance reached twice — a confidence
width from a pull count in one case, a predictive variance from a fitted surface in the other — and
the items make that correspondence explicit rather than leaving it to be noticed. `stacking`'s
out-of-fold discipline is `nested-cross-validation`'s argument applied to a construction where the
temptation to skip it is especially easy to miss. And `hierarchical-clustering`'s greedy,
irreversible merges are `decision-tree`'s greedy splitting seen from the other direction.

**Coverage: 8 / 8 concepts, 8 live items each, all clearing `verifyItem` with no blockers or
warnings.**
