# Machine Learning Cluster 15 — Scaling, Adapting & Serving

Scaling Laws, Tokenization, Contrastive Learning, Parameter-Efficient Fine-Tuning, Instruction Tuning
and RLHF, Knowledge Distillation, Quantization (7 concepts, 56 items).

Authored directly in
[`web/src/data/items-ml/ml-15-adapting-and-serving.ts`](../web/src/data/items-ml/ml-15-adapting-and-serving.ts);
see the authorship note in [ml-10](ml-10-practical-modelling.md).

Taught last in the Machine Learning chapter, as the section **Scaling, Adapting & Serving**. It reads
after cluster 12 rather than beside clusters 13 and 14 because it rests on transfer learning,
self-supervision and reinforcement learning, all of which cluster 12 introduces.

## Why this cluster exists

The branch built through clusters 11, 13 and 14 stops at a trained model. Everything a professional
does *after* that point was missing: deciding how large the model should have been, knowing what the
input was cut into before it was embedded, adapting a pretrained model without retraining it, turning
a preference into an objective, and making the result cheap enough to serve.

| Concept | The gap it closes |
|---|---|
| `scaling-laws` | The budget question — how many parameters, how many tokens — had no node, and it is the first question asked on any real training project |
| `tokenization` | Assumed by every language-model article and defined nowhere, despite explaining arithmetic failures, multilingual cost and why perplexities are not comparable |
| `contrastive-learning` | `self-supervised-learning` said labels can be manufactured; this is the objective that actually does it, and the one behind CLIP and modern embedding models |
| `parameter-efficient-fine-tuning` | `transfer-learning` assumed full fine-tuning, which is not how anyone adapts a large model now |
| `instruction-tuning-and-rlhf` | The three-stage pipeline that separates a next-token predictor from an assistant, and the KL constraint that keeps it from hacking its own reward |
| `knowledge-distillation` | Named in passing by the ensemble material and never defined; also how most small language models are now built |
| `quantization` | The last mile of serving, and the reason the same recipe that works at small scale fails on a large model |

## Graph edges added during authoring

| Edge | Why it is genuine |
|---|---|
| `contrastive-learning` → `cross-entropy-loss` | InfoNCE is a cross-entropy over similarity scores with the positive as the correct class. The loss is not analogous to classification — it is one |
| `parameter-efficient-fine-tuning` → `rank` | LoRA is a rank constraint written as BA, and the parameter arithmetic that motivates it is rank arithmetic |
| `instruction-tuning-and-rlhf` → `kl-divergence` | The objective is E[r] − β·KL(π ‖ π_ref); without the divergence the leash cannot be stated, and reward hacking cannot be explained |
| `knowledge-distillation` → `ensemble-methods` | The method was introduced to compress an ensemble into one model, and the comparison against paying for every member at inference is the clearest statement of what it buys |
| `knowledge-distillation` → `kl-divergence` | The loss is a divergence between softened distributions, not a comparison of labels |
| `quantization` → `mixed-precision-training` | The formats, the range-versus-precision trade and the notion of keeping some things in higher precision all come from there |
| `tokenization` → `embeddings` | The vocabulary decision is paid for in the embedding table, and the arithmetic item is that table |

One item was written to stand on its own rather than take an edge that would have been a stretch: the
outlier-channel item in `quantization` describes the phenomenon — a few activation channels carrying
magnitudes hundreds of times the rest — in its stem, so it does not require `transformers`, which is
not upstream of quantisation and should not be made so for one item.

## Threads worth following

**The same trade, priced four ways.** Scaling laws price quality against compute; distillation prices
it against capacity; quantisation prices it against precision; parameter-efficient fine-tuning prices
it against how much of the model you are allowed to move. The transfer items are built so that the
learner has to name what is being spent, not just what is being gained — the compute-optimal versus
deployment-optimal item and the distillation-versus-quantisation item are the two clearest.

**Manufactured supervision, twice.** `autoregressive-models` manufactures labels by shifting the
sequence; `contrastive-learning` manufactures them by augmenting an example twice. Both turn an
unlabelled corpus into a supervised problem, and both inherit exactly the biases of the manufacturing
process — which is what the exposure-bias item and the colour-jitter item are each getting at from
their own side.

**The objective is never quite the goal.** Perplexity is not capability; a reward model is not
correctness; a benchmark score thresholds a continuous quantity. Three items in this cluster are
about the gap between the number being optimised and the thing wanted — the emergence item, the
length-bias item, and the fine-tuning-for-facts item — and together they are the cluster's argument
for reading metrics sceptically.

**Numeric claims** verified against a computation script [verified]: 6 × 1e9 × 2e10 = 1.2e20,
2^(1/0.076) = 9139, 32,000 × 4,096 = 131,072,000, 1350/1000 = 1.35, ln(512) = 6.2383,
−ln(σ(2)) = 0.1269, 2 × 1024 × 16 = 32,768 with a ratio of 32, σ(1.0) = 0.7311, the T = 2 softmax of
(5, 2, 1) giving 0.1643 for the second class, round(0.3 ÷ (0.5/127)) × (0.5/127) = 0.29921, and
13e9 × 0.5 bytes = 6.5 GB.

**Coverage: 7 / 7 concepts, 8 live items each, all clearing `verifyItem` with no blockers or
warnings.**
