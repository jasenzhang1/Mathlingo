import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./dl-sixty-shared";

/**
 * Architecture families, residual networks, LSTMs/GRUs, autoregressive
 * models, state space models (S4, Mamba) and GNNs, each brought from 40 to 60
 * questions. Most of these pools sat at levels 5–8, so the additions fill
 * 1–4 and 9–10.
 */

// ---------------------------------------------------------------------------
// architecture-families
// ---------------------------------------------------------------------------
const AR = "architecture-families";
const families: Item[] = [
  mcq(m(AR, "recall-mlp", "recall", 1, 15, "A multilayer perceptron (MLP) is built from:"),
    "Fully connected (dense) layers with non-linear activations",
    [
      ["Convolutions only", "mlp-conv", "That's a CNN."],
      ["Attention layers", "mlp-attention", "That's a transformer."],
      ["Recurrent cells", "mlp-recurrent", "That's an RNN."],
    ]),
  mcq(m(AR, "recall-transformer", "recall", 1, 15, "The core operation of the transformer family is:"),
    "Self-attention",
    [
      ["Convolution", "transformer-conv", "That's the CNN family."],
      ["Recurrence", "transformer-recurrence", "Transformers have no recurrence."],
      ["Max pooling", "transformer-pooling", "Attention is the core."],
    ]),
  mcq(m(AR, "recall-rnn", "recall", 1, 15, "Recurrent networks are designed for:"),
    "Sequences, processed one step at a time with a carried state",
    [
      ["Single images", "rnn-images", "Images are CNN territory."],
      ["Unordered sets", "rnn-sets", "RNNs rely on order."],
      ["Graphs", "rnn-graphs", "That's GNNs."],
    ]),
  mcq(m(AR, "recall-gnn", "recall", 1, 15, "Which family is designed for data like molecules or social networks?"),
    "Graph neural networks",
    [
      ["CNNs", "gnn-cnn", "CNNs assume grids."],
      ["RNNs", "gnn-rnn", "RNNs assume sequences."],
      ["Plain MLPs", "gnn-mlp", "MLPs ignore relational structure."],
    ]),
  num(m(AR, "apply-dense", "apply", 2, 20, "A dense layer maps $300$ inputs to $100$ outputs. How many weights (no biases)?"), 30000),
  num(m(AR, "apply-single-kernel", "apply", 2, 20, "A $3 \\times 3$ convolution from $1$ channel to $1$ channel (no bias) has how many weights?"), 9),
  num(m(AR, "apply-attention-path", "apply", 2, 20, "In one self-attention layer, how many steps separate any two positions?"), 1),
  num(m(AR, "apply-conv-params", "apply", 3, 25, "A $5 \\times 5$ convolution from $3$ to $8$ channels, with biases, has how many parameters?"), 608),
  num(m(AR, "apply-rnn-path", "apply", 3, 25, "In an RNN, how many recurrent steps separate token $1$ from token $50$?"), 49),
  num(m(AR, "apply-receptive", "apply", 3, 25, "Four stacked $3 \\times 3$ stride-$1$ convolutions have what receptive field width?"), 9),
  num(m(AR, "apply-flatten-dense", "apply", 3, 25, "A dense layer from a flattened $32 \\times 32 \\times 3$ image to $10$ classes (no biases) has how many weights?"), 30720),
  num(m(AR, "apply-sharing-ratio", "apply", 4, 30, "A dense layer from a $28 \\times 28$ single-channel image to a $28 \\times 28$ output has $784^{2}$ weights; a $3 \\times 3$ convolution has $9$. What is the ratio? Give $2$ decimal places."), 68295.11),
  num(m(AR, "apply-vit-patches", "apply", 4, 30, "A ViT splits a $224 \\times 224$ image into $16 \\times 16$ patches. How many tokens (excluding any class token)?"), 196),
  short(m(AR, "transfer-tabular", "transfer", 9, 150, "Which model families suit tabular data with heterogeneous, unordered columns, and why do CNNs and RNNs not?"),
    [
      ["choice", "Gradient-boosted trees (often strongest) or MLPs/tabular transformers with per-feature embeddings", 2, true],
      ["why-not", "CNNs and RNNs assume locality or order among inputs, which unordered columns don't have", 2, true],
    ]),
  short(m(AR, "transfer-point-clouds", "transfer", 9, 150, "A model must classify 3-D point clouds given as unordered lists of points. What property must its architecture have, and how is it achieved?"),
    [
      ["property", "Permutation invariance: the output mustn't depend on the order of the points", 2, true],
      ["how", "Apply a shared network to each point and aggregate with a symmetric function (sum/max), as in DeepSets/PointNet, or use set/graph attention", 2, true],
    ]),
  mcq(m(AR, "transfer-convnext", "transfer", 9, 75, "ConvNeXt showed that:"),
    "A CNN modernised with transformer-era design choices can match vision transformers",
    [
      ["CNNs can't scale past ResNet-50", "convnext-cant-scale", "It scaled CNNs competitively."],
      ["Attention is required for ImageNet accuracy", "convnext-attention", "ConvNeXt has no attention."],
      ["Vision transformers are always worse", "convnext-vit-worse", "It showed parity, not dominance."],
    ]),
  num(m(AR, "transfer-patch-size", "transfer", 9, 75, "A ViT's patch size is halved from $16$ to $8$. By what factor does its self-attention cost grow?"), 16),
  short(m(AR, "transfer-bias-vs-scale", "transfer", 10, 180, "Explain how the best amount of built-in inductive bias depends on dataset size."),
    [
      ["small", "With little data, strong correct priors (locality, equivariance) cut variance and win", 2, true],
      ["large", "With huge data, flexible low-bias models can learn the structure themselves and avoid being limited by imperfect priors", 2, true],
    ]),
  mcq(m(AR, "transfer-equivariant", "transfer", 10, 90, "Why are E(3)-equivariant networks popular for molecular property prediction?"),
    "Their outputs transform correctly under rotations and translations, matching the physics, so they need less data",
    [
      ["They ignore atom positions", "equivariant-ignore", "They use positions in a symmetry-respecting way."],
      ["They're always faster", "equivariant-faster", "Speed isn't the main reason."],
      ["They don't need training", "equivariant-no-training", "They're trained like other networks."],
    ]),
  short(m(AR, "transfer-hybrid", "transfer", 10, 180, "Why do many modern vision models use convolutions early and attention later?"),
    [
      ["early", "Early layers process high-resolution local detail, where convolutions are cheap and their locality prior fits", 2, true],
      ["late", "Later layers work on fewer, coarser tokens, where global attention is affordable and captures long-range relations", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// residual-networks
// ---------------------------------------------------------------------------
const RS = "residual-networks";
const resnets: Item[] = [
  mcq(m(RS, "recall-imagenet", "recall", 1, 15, "Residual networks won which competition in $2015$?"),
    "The ImageNet (ILSVRC) classification challenge",
    [
      ["The Netflix Prize", "imagenet-netflix", "That was earlier and about recommendations."],
      ["The DARPA Grand Challenge", "imagenet-darpa", "That's self-driving cars."],
      ["Kaggle Titanic", "imagenet-titanic", "Unrelated."],
    ]),
  mcq(m(RS, "recall-adds", "recall", 1, 15, "A skip connection in a residual block:"),
    "Adds the block's input to the output of its layers",
    [
      ["Multiplies the input by the output", "adds-multiplies", "It's an addition."],
      ["Removes the input", "adds-removes", "It keeps the input."],
      ["Skips training of the block", "adds-skips-training", "The block is still trained."],
    ]),
  mcq(m(RS, "recall-resnet50", "recall", 1, 15, "The “50” in ResNet-50 refers to:"),
    "The number of weight layers",
    [
      ["The number of classes", "resnet50-classes", "ImageNet has $1{,}000$ classes."],
      ["The number of epochs", "resnet50-epochs", "It's the depth."],
      ["Its accuracy", "resnet50-accuracy", "It's the depth."],
    ]),
  mcq(m(RS, "recall-identity-params", "recall", 1, 15, "How many parameters does an identity skip connection have?"),
    "None",
    [
      ["One per channel", "identity-per-channel", "Identity adds no weights."],
      ["As many as the block", "identity-block", "It's a plain addition."],
      ["One scalar", "identity-scalar", "Plain identity has none."],
    ]),
  num(m(RS, "apply-output", "apply", 2, 20, "A residual block has $F(x) = 3$ at $x = 2$. What is $y = F(x) + x$?"), 5),
  num(m(RS, "apply-derivative", "apply", 2, 20, "If $F'(x) = 0.2$, what is $\\frac{dy}{dx}$ for $y = F(x) + x$?"), 1.2),
  num(m(RS, "apply-projection", "apply", 2, 20, "A $1 \\times 1$ projection shortcut from $64$ to $128$ channels (no bias) has how many weights?"), 8192),
  num(m(RS, "apply-plain-shrink", "apply", 3, 25, "Ten plain layers each scale the gradient by $0.9$. What factor remains? Give $4$ decimal places."), 0.3487),
  num(m(RS, "apply-basic-block", "apply", 3, 25, "A basic block has two $3 \\times 3$ convolutions with $128$ channels in and out (no biases). How many weights?"), 294912),
  num(m(RS, "apply-paths", "apply", 3, 25, "Viewing each residual block as “take it or skip it,” how many paths run through $10$ blocks?"), 1024),
  num(m(RS, "apply-resnet18-blocks", "apply", 3, 25, "ResNet-18 has a stem convolution, basic blocks of $2$ convolutions each, and a final dense layer, for $18$ weight layers. How many basic blocks?"), 8),
  num(m(RS, "apply-variance-growth", "apply", 4, 30, "The input to a residual stream has variance $1$, and each of $9$ blocks adds an independent output of variance $1$. What is the final variance?"), 10),
  num(m(RS, "apply-zero-init", "apply", 4, 30, "A block's last normalisation scale is initialised to $0$, so $F(x) = 0$. What is the block's output for $x = 7$?"), 7),
  short(m(RS, "transfer-residual-stream", "transfer", 9, 150, "In transformers, the residual connections are often called the “residual stream.” What does that picture capture?"),
    [
      ["channel", "Each sublayer reads from and adds to a shared running vector, rather than replacing it", 2, true],
      ["consequence", "Information written early can persist and be used by any later layer, so layers communicate through this stream", 2, true],
    ]),
  short(m(RS, "transfer-stochastic-depth", "transfer", 9, 150, "What is stochastic depth, and why does it work well with residual networks?"),
    [
      ["what", "During training, whole residual blocks are randomly skipped (replaced by the identity), with deeper blocks dropped more often", 2, true],
      ["why", "The skip connection keeps the network valid without the block, giving regularisation and faster training, like an ensemble of depths", 2, true],
    ]),
  mcq(m(RS, "transfer-rezero", "transfer", 9, 75, "ReZero writes $y = x + \\alpha F(x)$ with $\\alpha$ initialised to:"),
    "$0$, so every block starts as the identity",
    [
      ["$1$", "rezero-one", "That's a standard residual block."],
      ["A random value", "rezero-random", "It starts exactly at $0$."],
      ["$-1$", "rezero-negative", "It starts at $0$."],
    ]),
  num(m(RS, "transfer-survival", "transfer", 9, 75, "Stochastic depth with $50$ blocks uses survival probability $1 - \\frac{\\ell}{50}(1 - 0.5)$ for block $\\ell$. What is it for block $25$?"), 0.75),
  short(m(RS, "transfer-ode", "transfer", 10, 180, "Explain the view of a residual network as a discretised differential equation."),
    [
      ["euler", "$x_{t+1} = x_t + F(x_t)$ is a forward-Euler step of $\\frac{dx}{dt} = F(x)$", 2, true],
      ["consequence", "This motivated neural ODEs, which solve the continuous equation with adaptive solvers and constant memory via the adjoint method", 2, true],
    ]),
  mcq(m(RS, "transfer-densenet", "transfer", 10, 90, "How do DenseNet's connections differ from ResNet's?"),
    "DenseNet concatenates each layer's output with all earlier feature maps, rather than adding",
    [
      ["DenseNet has no skip connections", "densenet-none", "It has many."],
      ["DenseNet multiplies features", "densenet-multiplies", "It concatenates."],
      ["They're identical", "densenet-same", "Concatenation differs from addition."],
    ]),
  short(m(RS, "transfer-init-scaling", "transfer", 10, 180, "Very deep residual networks can still blow up at initialisation. Why, and how do schemes like Fixup address it?"),
    [
      ["why", "Each block adds variance to the residual stream, so activations grow with depth when blocks start at full strength", 2, true],
      ["fix", "Scale or zero-initialise the last layer of each branch (e.g. by $L^{-1/(2m-2)}$ or $0$), so blocks start near the identity", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// lstm-and-gru
// ---------------------------------------------------------------------------
const LG = "lstm-and-gru";
const gated: Item[] = [
  mcq(m(LG, "recall-gate-range", "recall", 1, 15, "Why do LSTM gate values lie between $0$ and $1$?"),
    "They're outputs of sigmoid functions",
    [
      ["They're outputs of ReLU", "range-relu", "ReLU is unbounded above."],
      ["They're probabilities from softmax", "range-softmax", "Each gate is an independent sigmoid."],
      ["They're fixed constants", "range-constant", "They're computed from inputs."],
    ]),
  mcq(m(LG, "recall-inventors", "recall", 1, 15, "The LSTM was introduced by:"),
    "Hochreiter and Schmidhuber ($1997$)",
    [
      ["Cho et al. ($2014$)", "inventors-cho", "That's the GRU."],
      ["Vaswani et al. ($2017$)", "inventors-vaswani", "That's the transformer."],
      ["Rumelhart, Hinton and Williams ($1986$)", "inventors-rumelhart", "That's backpropagation."],
    ]),
  mcq(m(LG, "recall-forget-one", "recall", 1, 15, "A forget gate value of $1$ means the cell:"),
    "Keeps its previous cell state entirely",
    [
      ["Erases its previous cell state", "forget-one-erase", "That's a value of $0$."],
      ["Outputs nothing", "forget-one-output", "That's the output gate."],
      ["Ignores the input", "forget-one-input", "That's the input gate."],
    ]),
  mcq(m(LG, "recall-gru-merge", "recall", 1, 15, "Compared with an LSTM, a GRU:"),
    "Merges the cell and hidden states into one state and uses two gates",
    [
      ["Adds a fourth gate", "gru-fourth", "It has fewer gates."],
      ["Has no gates", "gru-no-gates", "It has update and reset gates."],
      ["Uses attention", "gru-attention", "It's a recurrent cell."],
    ]),
  num(m(LG, "apply-cell-update", "apply", 2, 20, "$c_t = f_tc_{t-1} + i_t\\tilde{c}_t$ with $f_t = 0.5$, $c_{t-1} = 4$, $i_t = 1$ and $\\tilde{c}_t = 0.5$. What is $c_t$?"), 2.5),
  num(m(LG, "apply-hidden", "apply", 2, 20, "$h_t = o_t\\tanh(c_t)$ with $o_t = 1$ and $c_t = \\ln 3$. What is $h_t$?"), 0.8),
  num(m(LG, "apply-gru-update", "apply", 2, 20, "A GRU sets $h_t = (1 - z_t)h_{t-1} + z_t\\tilde{h}_t$. With $z_t = 0.25$, $h_{t-1} = 4$ and $\\tilde{h}_t = 0$, what is $h_t$?"), 3),
  num(m(LG, "apply-forget-chain", "apply", 3, 25, "A forget gate stays at $0.9$ for $10$ steps with no new input. What fraction of the cell state remains? Give $4$ decimal places."), 0.3487),
  num(m(LG, "apply-sigmoid-zero", "apply", 3, 25, "A gate's pre-activation is $0$. What is the gate value?"), 0.5),
  num(m(LG, "apply-lstm-params", "apply", 3, 25, "An LSTM has $4$ blocks of $h(h + x) + h$ parameters. How many for $x = 16$ and $h = 32$?"), 6272),
  num(m(LG, "apply-gru-params", "apply", 3, 25, "A GRU has $3$ such blocks. How many for $x = 16$ and $h = 32$?"), 4704),
  num(m(LG, "apply-forget-bias", "apply", 4, 30, "With the forget-gate bias initialised to $1$ and other inputs $0$, what is the forget gate? Give $4$ decimal places."), 0.7311),
  num(m(LG, "apply-bidirectional", "apply", 4, 30, "A bidirectional LSTM with hidden size $128$ in each direction outputs vectors of what size per step?"), 256),
  short(m(LG, "transfer-streaming", "transfer", 9, 150, "For on-device streaming speech recognition, why might an LSTM still be chosen over a transformer?"),
    [
      ["constant", "It processes each frame with constant compute and memory, needing no growing cache of past frames", 2, true],
      ["latency", "That gives low, predictable latency on small hardware; a transformer needs chunking or limited context to match", 2, true],
    ]),
  num(m(LG, "transfer-half-life", "transfer", 9, 75, "A forget gate holds at $0.99$. After how many steps has the cell state halved? Give $2$ decimal places."), 68.97),
  mcq(m(LG, "transfer-peephole", "transfer", 9, 75, "Peephole connections in an LSTM let:"),
    "The gates see the cell state directly, not only the hidden state and input",
    [
      ["The output skip the cell", "peephole-skip", "They feed the cell state into the gates."],
      ["The network see future inputs", "peephole-future", "They're about the cell state."],
      ["The forget gate be removed", "peephole-remove", "All gates remain."],
    ]),
  short(m(LG, "transfer-stacking", "transfer", 9, 150, "Why do many sequence models stack several LSTM layers, and what usually helps when doing so?"),
    [
      ["why", "Higher layers can build more abstract features over the lower layers' outputs, as in deep feed-forward networks", 2, true],
      ["help", "Residual connections between layers, dropout between them, and careful initialisation keep deep stacks trainable", 2, true],
    ]),
  short(m(LG, "transfer-carousel", "transfer", 10, 180, "Explain the “constant error carousel” and how it lets gradients survive many steps."),
    [
      ["path", "The cell state update $c_t = f_tc_{t-1} + \\ldots$ gives a path where $\\frac{\\partial c_t}{\\partial c_{t-1}} = f_t$, with no squashing non-linearity", 2, true],
      ["survive", "With $f_t$ near $1$, gradients flow back nearly unchanged over many steps instead of shrinking geometrically", 2, true],
    ]),
  mcq(m(LG, "transfer-mingru", "transfer", 10, 90, "Recent “minimal” GRU/LSTM variants become parallelisable over time by:"),
    "Making the gates depend only on the current input, not the previous hidden state, so the recurrence is linear and scannable",
    [
      ["Removing all gates", "mingru-no-gates", "Gates remain, but input-only."],
      ["Using attention", "mingru-attention", "They stay recurrent."],
      ["Increasing the hidden size", "mingru-size", "Size doesn't change sequential dependence."],
    ]),
  num(m(LG, "transfer-forget-for-half-life", "transfer", 10, 90, "What constant forget gate value gives a half-life of $1{,}000$ steps? Give $4$ decimal places."), 0.9993),
];

// ---------------------------------------------------------------------------
// autoregressive-models
// ---------------------------------------------------------------------------
const AM = "autoregressive-models";
const autoregressive: Item[] = [
  mcq(m(AM, "recall-one-at-a-time", "recall", 1, 15, "An autoregressive model generates a sequence:"),
    "One element at a time, each conditioned on the elements before it",
    [
      ["All at once in parallel", "one-at-a-time-parallel", "Generation is sequential."],
      ["Right to left only", "one-at-a-time-right", "Left to right is standard, but the point is conditioning on earlier ones."],
      ["Without using earlier outputs", "one-at-a-time-ignore", "Earlier outputs are its inputs."],
    ]),
  mcq(m(AM, "recall-gpt", "recall", 1, 15, "Which is an autoregressive model?"),
    "GPT",
    [
      ["BERT", "gpt-bert", "BERT is a masked (bidirectional) encoder."],
      ["k-means", "gpt-kmeans", "That's clustering."],
      ["A random forest", "gpt-forest", "That's a tree ensemble."],
    ]),
  mcq(m(AM, "recall-feedback", "recall", 1, 15, "When generating, an autoregressive model's input at each step includes:"),
    "Its own previously generated outputs",
    [
      ["Only the original prompt, never its outputs", "feedback-prompt-only", "Generated tokens are fed back."],
      ["Random noise only", "feedback-noise", "It conditions on prior tokens."],
      ["Future tokens", "feedback-future", "Those don't exist yet."],
    ]),
  mcq(m(AM, "recall-chain-rule", "recall", 1, 15, "The autoregressive factorisation is an application of:"),
    "The chain rule of probability",
    [
      ["Bayes' rule only", "chain-bayes", "It's the product (chain) rule."],
      ["The central limit theorem", "chain-clt", "Unrelated."],
      ["Independence of tokens", "chain-independence", "No independence is assumed."],
    ]),
  num(m(AM, "apply-joint-two", "apply", 2, 20, "$p(x_1) = 0.5$ and $p(x_2 \\mid x_1) = 0.4$. What is $p(x_1, x_2)$?"), 0.2),
  num(m(AM, "apply-perplexity", "apply", 2, 20, "A model's mean cross-entropy is $\\ln 4$ nats per token. What is its perplexity?"), 4),
  num(m(AM, "apply-passes", "apply", 2, 20, "Generating $100$ new tokens one at a time takes how many forward passes (without speculative tricks)?"), 100),
  num(m(AM, "apply-joint-three", "apply", 3, 25, "Conditional probabilities of three tokens are $0.5$, $0.5$ and $0.2$. What is the joint probability?"), 0.05),
  num(m(AM, "apply-log-prob", "apply", 3, 25, "Two tokens each have probability $0.5$. What is the sequence's log-probability (natural log)? Give $4$ decimal places."), -1.3863),
  num(m(AM, "apply-temperature", "apply", 3, 25, "Logits $(2, 0)$ are divided by temperature $T = 2$. What probability does the first token get? Give $4$ decimal places."), 0.7311),
  num(m(AM, "apply-top-k", "apply", 3, 25, "Probabilities are $0.5$, $0.3$ and $0.2$. With top-$k = 2$ and renormalisation, what is the top token's probability?"), 0.625),
  num(m(AM, "apply-top-p", "apply", 4, 30, "Probabilities $0.5$, $0.3$, $0.15$ and $0.05$. Top-$p$ with $p = 0.8$ keeps the smallest set reaching $0.8$. How many tokens?"), 2),
  num(m(AM, "apply-bits", "apply", 4, 30, "A model's cross-entropy is $2\\ln 2$ nats per token. How many bits per token is that?"), 2),
  short(m(AM, "transfer-bidirectional", "transfer", 9, 150, "Why can't an autoregressive language model use bidirectional context the way BERT does, and what does it gain instead?"),
    [
      ["why", "Each prediction may only condition on earlier tokens, or it would see the answer; a causal mask enforces this", 2, true],
      ["gain", "It defines a proper joint distribution, so it can generate text and score sequence likelihoods exactly", 2, true],
    ]),
  num(m(AM, "transfer-speculative", "transfer", 9, 75, "Speculative decoding drafts $4$ tokens; each is accepted with probability $0.8$, and acceptance stops at the first rejection. What is the expected number of accepted draft tokens? Give $4$ decimal places."), 2.3616),
  mcq(m(AM, "transfer-repetition", "transfer", 9, 75, "A repetition penalty in decoding:"),
    "Lowers the scores of tokens that have already appeared, discouraging loops",
    [
      ["Raises the probability of repeated tokens", "repetition-raises", "It discourages them."],
      ["Retrains the model", "repetition-retrain", "It's a decoding-time adjustment."],
      ["Removes the softmax", "repetition-softmax", "It adjusts logits before it."],
    ]),
  short(m(AM, "transfer-images", "transfer", 9, 150, "Autoregressive image models generate pixels or tokens in raster order. What makes this costly, and how do modern models reduce the cost?"),
    [
      ["cost", "An image has many thousands of pixels, so generating one at a time needs a huge number of sequential steps", 2, true],
      ["reduce", "Compress images into a smaller grid of discrete tokens (e.g. a VQ tokenizer) and generate those, or predict several tokens per step", 2, true],
    ]),
  num(m(AM, "transfer-perplexity-mean", "transfer", 10, 90, "Three tokens have cross-entropies $1$, $2$ and $3$ nats. Perplexity is $e$ raised to the mean. What is it? Give $4$ decimal places."), 7.3891),
  short(m(AM, "transfer-likelihood", "transfer", 10, 180, "Compare autoregressive models with GANs on evaluating likelihoods and on sampling speed."),
    [
      ["likelihood", "Autoregressive models give exact log-likelihoods; GANs give none, so they're evaluated only by sample quality", 2, true],
      ["speed", "GANs sample in one forward pass, while autoregressive models need one pass per token", 2, true],
    ]),
  mcq(m(AM, "transfer-beam-open-ended", "transfer", 10, 90, "Why does beam search often produce dull, repetitive text in open-ended generation?"),
    "Maximising probability favours generic, high-likelihood continuations, unlike human text, which isn't the most probable sequence",
    [
      ["Beam search samples too randomly", "beam-random", "It's deterministic."],
      ["Beam search can't produce long text", "beam-short", "It can; the issue is blandness."],
      ["Beam search ignores the model", "beam-ignores", "It follows the model's probabilities closely."],
    ]),
];

// ---------------------------------------------------------------------------
// state-space-models
// ---------------------------------------------------------------------------
const SS = "state-space-models";
const ssms: Item[] = [
  mcq(m(SS, "recall-linear", "recall", 1, 15, "The core of a deep state space layer is:"),
    "A linear recurrence on a hidden state, driven by the input",
    [
      ["A softmax attention matrix", "linear-attention", "That's attention."],
      ["A convolution with a $3 \\times 3$ kernel", "linear-conv", "It's a state recurrence (equivalent to a long convolution)."],
      ["A decision tree", "linear-tree", "Unrelated."],
    ]),
  mcq(m(SS, "recall-cost", "recall", 1, 15, "How does a state space layer's cost grow with sequence length $L$?"),
    "Roughly linearly (or $L\\log L$ in convolution form)",
    [
      ["Quadratically", "cost-quadratic", "That's attention."],
      ["Exponentially", "cost-exponential", "It's near-linear."],
      ["Not at all", "cost-constant", "Total cost grows with $L$."],
    ]),
  mcq(m(SS, "recall-fixed-state", "recall", 1, 15, "During generation, a state space layer's memory:"),
    "Stays a fixed size, however long the sequence gets",
    [
      ["Grows with every token", "fixed-state-grows", "That's a transformer's KV cache."],
      ["Is reset every step", "fixed-state-reset", "The state carries information forward."],
      ["Stores every past input", "fixed-state-stores", "It compresses the past."],
    ]),
  mcq(m(SS, "recall-control", "recall", 1, 15, "State space models originally come from:"),
    "Control theory and signal processing",
    [
      ["Natural language processing", "control-nlp", "They were imported into NLP later."],
      ["Database design", "control-database", "Unrelated."],
      ["Computer graphics", "control-graphics", "They come from control and signals."],
    ]),
  num(m(SS, "apply-step", "apply", 2, 20, "$h_1 = ah_0 + bu_1$ with $a = 0.5$, $h_0 = 2$, $b = 1$ and $u_1 = 1$. What is $h_1$?"), 2),
  num(m(SS, "apply-readout", "apply", 2, 20, "The output is $y = ch$ with $c = 3$ and $h = 2$. What is $y$?"), 6),
  num(m(SS, "apply-state-size", "apply", 2, 20, "A layer keeps a state of size $16$ for each of $512$ channels. How many numbers in total?"), 8192),
  num(m(SS, "apply-decay", "apply", 3, 25, "A mode with $|\\lambda| = 0.5$ runs $3$ steps with no input. What fraction of its value remains?"), 0.125),
  num(m(SS, "apply-kernel", "apply", 3, 25, "The convolution kernel is $K_k = c\\,a^{k}b$. With $c = 1$, $b = 2$ and $a = 0.5$, what is $K_2$?"), 0.5),
  num(m(SS, "apply-cost-ratio", "apply", 3, 25, "For $L = 1{,}000$, attention costs about $L^{2}$ and an SSM about $L$. What is the ratio?"), 1000),
  num(m(SS, "apply-euler", "apply", 3, 25, "Forward Euler gives $\\bar{a} = 1 + \\Delta a$. For $a = -2$ and $\\Delta = 0.1$, what is $\\bar{a}$?"), 0.8),
  num(m(SS, "apply-zoh", "apply", 4, 30, "Zero-order hold gives $\\bar{a} = e^{\\Delta a}$. For $a = -1$ and $\\Delta = 0.5$, what is $\\bar{a}$? Give $4$ decimal places."), 0.6065),
  num(m(SS, "apply-half-life", "apply", 4, 30, "A mode with $|\\lambda| = 0.9$ halves after how many steps? Give $4$ decimal places."), 6.5788),
  short(m(SS, "transfer-long-signals", "transfer", 9, 150, "Why are state space models attractive for very long signals like raw audio or genomes?"),
    [
      ["cost", "Linear-time training and constant-memory inference make sequences of hundreds of thousands of steps feasible", 2, true],
      ["fit", "Their continuous-time, decaying-memory structure suits smooth signals with long-range but structured dependencies", 2, true],
    ]),
  short(m(SS, "transfer-recall-weakness", "transfer", 9, 150, "Why do pure SSMs struggle to copy an exact string seen thousands of tokens earlier?"),
    [
      ["compress", "The whole past is compressed into a fixed-size state, so exact details of arbitrary earlier tokens can be overwritten", 2, true],
      ["contrast", "Attention keeps every past token in its cache and can look any of them up directly", 2, true],
    ]),
  mcq(m(SS, "transfer-hybrid", "transfer", 9, 75, "Hybrid models such as Jamba combine:"),
    "Mostly SSM layers with a few attention layers",
    [
      ["Only SSM layers", "hybrid-only-ssm", "They add some attention."],
      ["CNNs and decision trees", "hybrid-cnn-tree", "Unrelated."],
      ["Only attention layers", "hybrid-only-attention", "Most layers are SSMs."],
    ]),
  num(m(SS, "transfer-memory-ratio", "transfer", 9, 75, "At $10^{6}$ tokens, a KV cache stores $2LD$ numbers per layer with $D = 512$, while an SSM stores $8{,}192$. What is the ratio?"), 125000),
  short(m(SS, "transfer-resolution", "transfer", 10, 180, "How does the continuous-time view of an SSM let one model handle signals sampled at different rates?"),
    [
      ["continuous", "The layer is defined by a continuous system $(A, B, C)$; the step size $\\Delta$ only enters through discretisation", 2, true],
      ["resample", "Changing the sampling rate just changes $\\Delta$, so the same parameters apply to a new rate without retraining", 2, true],
    ]),
  mcq(m(SS, "transfer-linear-attention", "transfer", 10, 90, "Causal linear attention can be written as:"),
    "A recurrence that updates a fixed-size matrix state with each key–value outer product, i.e. a kind of SSM",
    [
      ["Full softmax attention", "linear-attention-softmax", "Removing the softmax is what enables the recurrence."],
      ["A convolutional network", "linear-attention-cnn", "It's a recurrent state update."],
      ["A decision tree", "linear-attention-tree", "Unrelated."],
    ]),
  short(m(SS, "transfer-stability", "transfer", 10, 180, "How do SSM parametrisations guarantee the recurrence stays stable during training?"),
    [
      ["condition", "Discrete eigenvalues must stay inside the unit circle (continuous eigenvalues with negative real part)", 2, true],
      ["param", "E.g. parametrise $a = -e^{\\theta}$ (always negative) and use $\\bar{a} = e^{\\Delta a}$, so any $\\theta$ gives a decaying mode", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// structured-state-spaces-s4
// ---------------------------------------------------------------------------
const S4 = "structured-state-spaces-s4";
const s4: Item[] = [
  mcq(m(S4, "recall-authors", "recall", 1, 15, "S4 was introduced by:"),
    "Gu, Goel and Ré",
    [
      ["Vaswani et al.", "authors-vaswani", "They introduced the transformer."],
      ["Hochreiter and Schmidhuber", "authors-lstm", "They introduced the LSTM."],
      ["He et al.", "authors-he", "They introduced ResNet."],
    ]),
  mcq(m(S4, "recall-lti", "recall", 1, 15, "Within one layer, S4's parameters $(\\bar{A}, \\bar{B}, C)$:"),
    "Are the same at every time step (time-invariant)",
    [
      ["Change with each input", "lti-input", "That's Mamba's selective change."],
      ["Are random each step", "lti-random", "They're learned and fixed in time."],
      ["Depend on future inputs", "lti-future", "They're constant over time."],
    ]),
  num(m(S4, "apply-state-count", "apply", 2, 20, "An S4 layer with state size $N = 64$ on $512$ channels keeps how many state values?"), 32768),
  num(m(S4, "apply-kernel-length", "apply", 2, 20, "In convolution mode on a length-$1{,}024$ sequence, how long is S4's kernel?"), 1024),
  num(m(S4, "apply-euler", "apply", 3, 25, "Forward Euler: $\\bar{A} = 1 + \\Delta A$ for scalar $A = -1$ and $\\Delta = 0.5$. What is $\\bar{A}$?"), 0.5),
  num(m(S4, "apply-kernel-entry", "apply", 3, 25, "The kernel is $\\bar{K}_k = C\\bar{A}^{k}\\bar{B}$. With $\\bar{A} = 0.5$, $\\bar{B} = 1$ and $C = 2$, what is $\\bar{K}_3$?"), 0.25),
  num(m(S4, "apply-zoh", "apply", 4, 30, "Zero-order hold: $\\bar{A} = e^{\\Delta A}$ with $A = -2$ and $\\Delta = 0.25$. Give $4$ decimal places."), 0.6065),
  num(m(S4, "apply-fft-cost", "apply", 4, 30, "An FFT convolution over $L = 2{,}048$ costs about $L\\log_2 L$ operations. How many?"), 22528),
  mcq(m(S4, "apply-training-mode", "apply", 5, 40, "During training on full sequences, S4 is usually computed:"),
    "As a long convolution, using FFTs",
    [
      ["Step by step as a recurrence", "training-recurrence", "That's used for generation."],
      ["With attention", "training-attention", "S4 doesn't use attention."],
      ["By sampling", "training-sampling", "It's a deterministic computation."],
    ]),
  short(m(S4, "explain-diagonal", "explain", 5, 90, "Why do S4-style models restrict $A$ to (nearly) diagonal form?"),
    [
      ["cost", "Powers and exponentials of a diagonal matrix are elementwise, making the kernel cheap to compute", 2, true],
      ["sufficient", "Diagonal (or diagonal-plus-low-rank) matrices still capture the needed dynamics, as S4D showed", 2, true],
    ]),
  num(m(S4, "apply-speedup", "apply", 6, 45, "For $L = 1{,}024$, a direct convolution costs about $L^{2}$ and an FFT one about $L\\log_2 L$. What is the ratio?"), 102.4),
  mcq(m(S4, "explain-s4d", "explain", 6, 50, "S4D's main finding was that:"),
    "A purely diagonal state matrix, suitably initialised, performs about as well as S4's structured one",
    [
      ["Diagonal matrices can't be stable", "s4d-unstable", "They can, with negative real parts."],
      ["Attention is required", "s4d-attention", "S4D uses no attention."],
      ["HiPPO hurts performance", "s4d-hippo", "HiPPO-inspired initialisation still helps."],
    ]),
  num(m(S4, "transfer-output", "transfer", 7, 60, "Scalar SSM $x_k = 0.5x_{k-1} + u_k$, $y_k = x_k$, $x_0 = 0$, with inputs $1$, $1$, $1$. What is $y_3$?"), 1.75),
  short(m(S4, "transfer-resample", "transfer", 7, 120, "An S4 model trained on audio at $16$ kHz must run on $8$ kHz audio. What change makes this work, and why?"),
    [
      ["change", "Double the step size $\\Delta$ (one sample now spans twice the time)", 2, true],
      ["why", "The continuous-time parameters describe the signal in real time, so only the discretisation needs to change", 2, true],
    ]),
  num(m(S4, "transfer-bilinear", "transfer", 8, 60, "Bilinear discretisation $\\bar{A} = \\frac{1 + \\Delta A/2}{1 - \\Delta A/2}$ with $A = -1$ and $\\Delta = 1$. Give $4$ decimal places."), 0.3333),
  mcq(m(S4, "transfer-stable", "transfer", 8, 60, "Why must the continuous $A$ have eigenvalues with negative real parts?"),
    "So the state decays over time instead of blowing up",
    [
      ["So the kernel is periodic", "stable-periodic", "Stability is about decay."],
      ["So the layer can use attention", "stable-attention", "Unrelated."],
      ["So the model trains faster on GPUs", "stable-gpu", "It's a stability condition."],
    ]),
  num(m(S4, "transfer-time-constant", "transfer", 9, 75, "A mode with $\\bar{A} = 0.999$ has a time constant of about $\\frac{1}{1 - \\bar{A}}$ steps. How many?"), 1000),
  short(m(S4, "transfer-language", "transfer", 9, 150, "S4 excelled on long-range benchmarks but lagged transformers on language modelling. Why?"),
    [
      ["lti", "As an LTI system it applies the same filter regardless of content, so it can't decide what to remember based on the tokens", 2, true],
      ["language", "Language needs content-based selection and recall (e.g. induction heads), which motivated selective SSMs like Mamba", 2, true],
    ]),
  short(m(S4, "transfer-dplr", "transfer", 10, 180, "Why did the original S4 use a diagonal-plus-low-rank (DPLR) form for $A$?"),
    [
      ["hippo", "The HiPPO matrix that gives good long memory isn't stably diagonalisable, but it is normal plus low rank", 2, true],
      ["compute", "DPLR lets the kernel be computed efficiently (via Cauchy kernels and the Woodbury identity) while keeping HiPPO's dynamics", 2, true],
    ]),
  num(m(S4, "transfer-rate-change", "transfer", 10, 90, "A mode has $\\bar{A} = 0.9$ at the original sampling rate. With zero-order hold, what is $\\bar{A}$ after halving the sampling rate (doubling $\\Delta$)?"), 0.81),
];

// ---------------------------------------------------------------------------
// mamba-selective-ssm
// ---------------------------------------------------------------------------
const MB = "mamba-selective-ssm";
const mamba: Item[] = [
  mcq(m(MB, "recall-authors", "recall", 1, 15, "Mamba was introduced by:"),
    "Gu and Dao ($2023$)",
    [
      ["Vaswani et al. ($2017$)", "mamba-vaswani", "That's the transformer."],
      ["Hochreiter and Schmidhuber ($1997$)", "mamba-lstm", "That's the LSTM."],
      ["Goodfellow et al. ($2014$)", "mamba-gan", "That's GANs."],
    ]),
  mcq(m(MB, "recall-selective", "recall", 1, 15, "“Selective” in Mamba refers to:"),
    "SSM parameters such as $\\Delta$, $B$ and $C$ being computed from the current input",
    [
      ["Selecting which layers to train", "selective-layers", "It's about input-dependent parameters."],
      ["Selecting tokens with attention", "selective-attention", "Mamba has no attention."],
      ["Random feature selection", "selective-random", "Parameters are computed, not sampled."],
    ]),
  num(m(MB, "apply-discretise", "apply", 2, 20, "With $A = -1$ and $\\Delta = \\ln 4$, what is $\\bar{A} = e^{\\Delta A}$?"), 0.25),
  num(m(MB, "apply-state", "apply", 2, 20, "A Mamba layer has $1{,}024$ channels, each with state size $16$. How many state values?"), 16384),
  num(m(MB, "apply-compose", "apply", 3, 25, "Compose $h \\mapsto 0.5h + 1$ and then $h \\mapsto 0.5h + 3$. The result is $h \\mapsto 0.25h + c$. What is $c$?"), 3.5),
  num(m(MB, "apply-scan-depth", "apply", 3, 25, "A parallel scan over $L = 1{,}024$ elements has depth about $\\log_2 L$. What is it?"), 10),
  num(m(MB, "apply-half", "apply", 4, 30, "With $A = -3$ and $\\Delta = \\frac{\\ln 2}{3}$, what is $\\bar{A}$?"), 0.5),
  num(m(MB, "apply-gate-zero", "apply", 4, 30, "The SSM output $y = 2$ is multiplied by $\\operatorname{SiLU}(z)$ with $z = 0$. What is the gated output?"), 0),
  mcq(m(MB, "apply-block", "apply", 5, 40, "A Mamba block replaces the transformer's attention-plus-MLP pair with:"),
    "One homogeneous block combining a projection, a short convolution, the selective SSM and a gating branch",
    [
      ["Two attention layers", "block-attention", "Mamba has no attention."],
      ["An LSTM cell", "block-lstm", "It's a selective SSM block."],
      ["A decision tree", "block-tree", "Unrelated."],
    ]),
  short(m(MB, "explain-content", "explain", 5, 90, "What can a selective SSM do that an LTI SSM like S4 cannot?"),
    [
      ["content", "Decide, based on each token's content, whether to store it, ignore it or reset the state", 2, true],
      ["tasks", "This enables content-dependent tasks like selective copying and induction-style recall", 2, true],
    ]),
  num(m(MB, "apply-cache-ratio", "apply", 6, 45, "At $L = 4{,}096$ and $D = 2{,}048$, a KV cache holds $2LD$ numbers per layer, while a Mamba layer (expansion $2$, state size $16$) holds $2 \\cdot 2{,}048 \\cdot 16$. What is the ratio?"), 256),
  mcq(m(MB, "explain-no-conv", "explain", 6, 50, "Why can't Mamba use S4's FFT convolution for training?"),
    "Its parameters vary with time, so there's no single fixed kernel to convolve with",
    [
      ["FFTs don't run on GPUs", "no-conv-gpu", "They do."],
      ["Its state is too small", "no-conv-small", "Time variance is the reason."],
      ["It has no recurrence", "no-conv-no-recurrence", "It is recurrent."],
    ]),
  num(m(MB, "transfer-product", "transfer", 7, 60, "Three tokens pass with $\\bar{A}$ values $0.8$, $0.5$ and $0.25$ and no new input. What fraction of the state survives?"), 0.1),
  mcq(m(MB, "transfer-mamba2", "transfer", 7, 60, "Mamba-2 restricts each head's $\\bar{A}$ to:"),
    "A scalar times the identity",
    [
      ["A full dense matrix", "mamba2-dense", "That would be far costlier."],
      ["A fixed constant for all inputs", "mamba2-constant", "It stays input-dependent."],
      ["The zero matrix", "mamba2-zero", "That would erase the state."],
    ]),
  num(m(MB, "transfer-attention-per-token", "transfer", 8, 60, "Per generated token, attention costs grow with context length while Mamba's don't. Going from $1{,}000$ to $8{,}000$ tokens of context multiplies attention's per-token cost by what factor?"), 8),
  short(m(MB, "transfer-delta-init", "transfer", 8, 120, "Why is the range of $\\Delta$ at initialisation important in Mamba?"),
    [
      ["timescales", "$\\Delta$ sets how fast each channel forgets, so its range determines the timescales the model can represent", 2, true],
      ["init", "Initialising across a broad range (e.g. log-uniform) gives channels a mix of short and long memories to start from", 2, true],
    ]),
  num(m(MB, "transfer-softplus", "transfer", 9, 75, "Mamba computes $\\Delta = \\operatorname{softplus}(x) = \\ln(1 + e^{x})$. What is $\\Delta$ at $x = 0$? Give $4$ decimal places."), 0.6931),
  mcq(m(MB, "transfer-jamba", "transfer", 9, 75, "Why do hybrid models keep a few attention layers among many Mamba layers?"),
    "Attention supplies precise retrieval of arbitrary earlier tokens, which pure SSMs do poorly",
    [
      ["Attention is cheaper than Mamba", "jamba-cheaper", "It's costlier at long context."],
      ["Mamba can't process text", "jamba-text", "It can; it struggles with exact recall."],
      ["To remove the need for training", "jamba-training", "Unrelated."],
    ]),
  short(m(MB, "transfer-vision", "transfer", 10, 180, "What extra design decision does applying Mamba to images require, compared with text?"),
    [
      ["order", "Images have no natural 1-D order, so patches must be flattened in some scan order", 2, true],
      ["fix", "Models often scan in several directions (e.g. rows, columns, both ways) and merge them, so each patch gets context from all sides", 2, true],
    ]),
  num(m(MB, "transfer-chunks", "transfer", 10, 90, "Mamba-2's algorithm splits a length-$4{,}096$ sequence into chunks of $64$. How many chunks?"), 64),
];

// ---------------------------------------------------------------------------
// graph-neural-networks
// ---------------------------------------------------------------------------
const GN = "graph-neural-networks";
const gnns: Item[] = [
  mcq(m(GN, "recall-nodes-edges", "recall", 1, 15, "A graph consists of:"),
    "Nodes and edges connecting pairs of nodes",
    [
      ["Rows and columns only", "nodes-table", "That's a table."],
      ["Pixels on a grid only", "nodes-pixels", "Grids are a special case."],
      ["A single sequence", "nodes-sequence", "Sequences are another special case."],
    ]),
  mcq(m(GN, "recall-node-output", "recall", 1, 15, "After message passing, a GNN produces:"),
    "An embedding for each node, which can be pooled for graph-level tasks",
    [
      ["A single number for the dataset", "output-single", "It produces per-node outputs."],
      ["A new adjacency matrix only", "output-adjacency", "It updates node features."],
      ["A sorted list of nodes", "output-sorted", "Order isn't the output."],
    ]),
  mcq(m(GN, "recall-molecules", "recall", 1, 15, "When a molecule is treated as a graph, the nodes are usually:"),
    "Atoms",
    [
      ["Bonds", "molecules-bonds", "Bonds are edges."],
      ["Molecules in the dataset", "molecules-dataset", "Each molecule is one graph."],
      ["Electrons", "molecules-electrons", "Atoms are the usual nodes."],
    ]),
  mcq(m(GN, "recall-symmetric", "recall", 1, 15, "For an undirected graph, the adjacency matrix is:"),
    "Symmetric",
    [
      ["Diagonal", "symmetric-diagonal", "Edges appear off the diagonal."],
      ["Always full of $1$s", "symmetric-ones", "Only connected pairs are $1$."],
      ["Triangular", "symmetric-triangular", "Both $(u, v)$ and $(v, u)$ are set."],
    ]),
  num(m(GN, "apply-edges", "apply", 2, 20, "The degrees of an undirected graph's nodes sum to $20$. How many edges does it have?"), 10),
  num(m(GN, "apply-adjacency-size", "apply", 2, 20, "How many entries does the adjacency matrix of a $50$-node graph have?"), 2500),
  num(m(GN, "apply-mean", "apply", 2, 20, "A node's neighbours have features $2$, $4$ and $9$. What does mean aggregation give?"), 5),
  num(m(GN, "apply-sum", "apply", 3, 25, "Same neighbours. What does sum aggregation give?"), 15),
  num(m(GN, "apply-gcn-coefficient", "apply", 3, 25, "A GCN weights the message from $u$ to $v$ by $\\frac{1}{\\sqrt{d_u d_v}}$ (degrees including self-loops). What is it for $d_u = 4$ and $d_v = 9$? Give $4$ decimal places."), 0.1667),
  num(m(GN, "apply-two-hop", "apply", 3, 25, "In a tree where every node has degree $3$, how many nodes are exactly $2$ hops from a given node?"), 6),
  num(m(GN, "apply-layers-hops", "apply", 3, 25, "How many message-passing layers does a node need to receive information from nodes $4$ hops away?"), 4),
  num(m(GN, "apply-gcn-params", "apply", 4, 30, "A GCN layer maps $64$ features to $32$, with biases. How many parameters?"), 2080),
  num(m(GN, "apply-gat", "apply", 4, 30, "A GAT node has two neighbours with attention scores $0$ and $\\ln 3$. What weight does the second get after softmax?"), 0.75),
  short(m(GN, "transfer-oversmoothing", "transfer", 9, 150, "What is oversmoothing in deep GNNs, and how is it mitigated?"),
    [
      ["what", "Repeated neighbour averaging makes node embeddings converge to similar values, losing distinguishing information", 2, true],
      ["mitigate", "Use few layers, residual/jumping-knowledge connections, normalisation (e.g. PairNorm), or edge dropout", 2, true],
    ]),
  short(m(GN, "transfer-graph-transformer", "transfer", 9, 150, "Graph transformers let every node attend to every other. What must they add to use the graph's structure?"),
    [
      ["structure", "Plain attention ignores edges, so structure must be injected", 2, true],
      ["how", "Via positional encodings (e.g. Laplacian eigenvectors, random-walk features) or attention biases based on shortest-path distance or edges", 2, true],
    ]),
  mcq(m(GN, "transfer-sampling", "transfer", 9, 75, "GraphSAGE-style neighbour sampling is used to:"),
    "Bound the cost of training on huge graphs by sampling a fixed number of neighbours per layer",
    [
      ["Make the graph smaller permanently", "sampling-permanent", "Sampling happens per batch."],
      ["Add new edges", "sampling-add", "It samples existing ones."],
      ["Label the nodes", "sampling-labels", "It's about computation."],
    ]),
  num(m(GN, "transfer-fanout", "transfer", 9, 75, "Neighbour sampling with fan-out $10$ per layer for $3$ layers reaches at most how many nodes at depth $3$ for one target node?"), 1000),
  short(m(GN, "transfer-oversquashing", "transfer", 10, 180, "What is over-squashing, and how does graph rewiring help?"),
    [
      ["what", "Information from exponentially many distant nodes must pass through a few bottleneck edges into fixed-size vectors, so long-range signals get lost", 2, true],
      ["rewire", "Adding edges or virtual nodes (rewiring) shortens paths and relieves bottlenecks", 2, true],
    ]),
  mcq(m(GN, "transfer-wl", "transfer", 10, 90, "Standard message-passing GNNs can distinguish non-isomorphic graphs at most as well as:"),
    "The 1-dimensional Weisfeiler–Lehman (1-WL) test",
    [
      ["Any polynomial-time algorithm", "wl-polytime", "Their ceiling is 1-WL."],
      ["Exact graph isomorphism testing", "wl-exact", "They can't distinguish all graphs."],
      ["Random guessing", "wl-random", "They do much better than chance."],
    ]),
  short(m(GN, "transfer-recommendation", "transfer", 10, 180, "How can a GNN be used for recommendation on a user–item interaction graph?"),
    [
      ["graph", "Treat users and items as nodes of a bipartite graph, with edges for interactions", 2, true],
      ["predict", "Message passing gives embeddings that capture collaborative signals from multi-hop neighbours; scores between user and item embeddings predict new links", 2, true],
    ]),
];

export const dlSixty03Items: Item[] = [
  ...families,
  ...resnets,
  ...gated,
  ...autoregressive,
  ...ssms,
  ...s4,
  ...mamba,
  ...gnns,
];
