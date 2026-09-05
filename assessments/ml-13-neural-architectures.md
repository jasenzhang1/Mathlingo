# Machine Learning Cluster 13 — Neural Network Architectures

Architecture Families, Residual Networks, LSTM and GRU, Autoregressive Models, State Space Models,
Graph Neural Networks, Generative Adversarial Networks, Diffusion Models, Mixture of Experts
(9 concepts, 72 items).

Authored directly in
[`web/src/data/items-ml/ml-13-neural-architectures.ts`](../web/src/data/items-ml/ml-13-neural-architectures.ts);
see the authorship note in [ml-10](ml-10-practical-modelling.md) for why this file is an index rather
than a transcript.

Numbered 13 because it was authored after cluster 12. It is *taught* between 11 and 12 — it extends
the deep-learning branch and is drawn on by transfer learning and self-supervision — and both
[`sections.ts`](../web/src/data/sections.ts) and the two ml index files order it that way. The
section header a learner sees is **Neural Network Architectures**, inside the Machine Learning
chapter, directly after **Deep Learning**.

## Why this cluster exists

Cluster 11 introduced three architectural families and stopped. Three gaps followed from that.

**The families are never compared.** A learner finishes cluster 11 able to describe a convolution and
a recurrence separately, with nothing that says what each one *assumes*, or why the same model wins
on one dataset size and loses on another. `architecture-families` is that comparison: weight sharing
as a hard constraint rather than a penalty, path length as a separate axis from cost, and the
bias-variance trade applied to the wiring rather than to the parameter count.

**The sequence story stops at attention.** The LSTM was a paragraph inside
`recurrent-neural-networks`; next-token prediction was assumed by `transformers` and defined nowhere;
and the linear-recurrence models that now compete with attention on long sequences were absent
entirely. `lstm-and-gru`, `autoregressive-models` and `state-space-models` carry that thread through
to where the field actually is.

**Generative modelling had one node.** `autoencoders` was the whole of it. Adversarial and diffusion
training are the two dominant alternatives, and the interesting content is in the comparison — what
each family can report about a held-out sample, what each pays at sampling time, and which failure
mode each is prone to.

| Concept | The gap it closes |
|---|---|
| `architecture-families` | The three families of cluster 11 are never put side by side, so "which architecture" reads as taste rather than as a choice of prior |
| `residual-networks` | Every transformer sublayer is a residual block, and cluster 11 never says what the addition does or why depth failed without it |
| `lstm-and-gru` | Named in `recurrent-neural-networks` and given no node, despite being the answer to the vanishing gradient that article ends on |
| `autoregressive-models` | The objective every language model is trained on, assumed throughout the transformer material and stated nowhere |
| `state-space-models` | S4 and Mamba are the current answer to attention's quadratic cost; the graph had nothing on linear-time sequence modelling |
| `graph-neural-networks` | The fourth major family, and the one whose inductive bias is easiest to state precisely |
| `generative-adversarial-networks` | Generative modelling was `autoencoders` alone; the adversarial objective is where the divergence framing becomes concrete |
| `diffusion-models` | The current default for image generation, and the sharpest contrast to autoregressive cost profiles |
| `mixture-of-experts` | Total versus active parameters is now standard in frontier model reporting and had no node to explain it |

## Graph edges added during authoring

New concepts point only at existing ones, so no shipped item's ancestor set — and therefore no
seeded difficulty — changed.

| Edge | Why it is genuine |
|---|---|
| `state-space-models` → `attention-mechanism` | The family exists to buy back linear time in the sequence length. Both evaluation forms, the fixed-size generation state and the hybrid stacks are answers to what attention costs, and none of it reads without attention |
| `autoregressive-models` → `conditional-probability` | The factorisation is the chain rule of probability; without it the objective cannot be stated, only recited |
| `state-space-models` → `eigenvalues-eigenvectors` | The eigenvalue moduli of the transition matrix *are* the model's memory horizon, and the half-life item computes one |
| `generative-adversarial-networks` → `kl-divergence` | Substituting the optimal discriminator turns the game's value into a Jensen-Shannon divergence, which is where mode collapse and the disjoint-support failure are read off |

Three items were rewritten to be self-contained rather than given an edge that would have been a
stretch. The LSTM parallelism item describes an architecture that computes every position in one pass
rather than requiring `attention-mechanism`, which sits downstream in teaching order; the residual
analogy item describes a gated memory carried by addition rather than requiring the recurrent branch;
and the graph-network transfer item compares against a convolution, which is upstream, rather than
against self-attention, which is not.

## Threads worth following

The cluster is written as one argument rather than nine write-ups, and three threads run through it.

**Addition beats multiplication.** The vanishing-gradient story from `backpropagation` is answered
three times here by the same move. A residual block's Jacobian is I + ∂F/∂x, so a path of local
derivative exactly 1 survives any depth. An LSTM's cell derivative is the forget gate, so 0.99¹⁰⁰ ≈
0.37 replaces 0.9¹⁰⁰ ≈ 2.7 × 10⁻⁵. A state space layer's memory is λᵏ, learnable and constrained to
the unit disc. Same fix, three axes: depth, time, and spectrum.

**Every architecture pays somewhere.** Attention buys O(1) path length with O(L²) cost and a cache
that grows with context; a state space layer buys O(L) with a fixed-size state that must compress;
a mixture of experts buys capacity at constant compute and pays in resident memory; diffusion buys
training stability and pays per sample. The transfer items are built to make the learner name the
price rather than the feature.

**The prior is the model.** `architecture-families` opens with 150 million weights against 1,728 for
the same input, and the point is not the ratio — it is that the convolution has asserted something
and deleted the weights that could have said otherwise. The wrong-prior transfer item (a convolution
across arbitrary table columns) and the vision-transformer data-scale item are the same argument from
the other two directions.

**Numeric claims** are verified against a computation script rather than by hand [verified]:
0.9⁵⁰ = 0.005154, 0.99¹⁰⁰ = 0.3660, 5·5·16·32 = 12,800, 4·128·192 + 4·128 = 98,816, e² = 7.389,
ln(0.5)/ln(0.9) = 6.58, 1/√24 = 0.2041, −2 ln 2 = −1.3863, 0.98¹⁰⁰ = 0.1326 with √0.1326 = 0.3642,
and 1.25 × 4096/8 = 640.

**Coverage: 9 / 9 concepts, 8 live items each, all clearing `verifyItem` with no blockers or
warnings.**
