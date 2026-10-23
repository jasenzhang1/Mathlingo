import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./dl-sixty-shared";

/**
 * CNN stride/padding, pooling and design, RNNs, attention, transformers,
 * embeddings and autoencoders, each brought from 40 to 60 questions, leaning
 * on whichever levels each pool was thinnest at.
 */

// ---------------------------------------------------------------------------
// cnn-stride-and-padding
// ---------------------------------------------------------------------------
const SP = "cnn-stride-and-padding";
const stridePadding: Item[] = [
  mcq(m(SP, "recall-valid", "recall", 1, 15, "“Valid” padding in a convolution means:"),
    "No padding — the kernel only visits positions fully inside the input",
    [
      ["Padding that keeps the output size equal to the input", "valid-same", "That's “same” padding."],
      ["Padding with random values", "valid-random", "Valid uses no padding."],
      ["Padding only at the bottom", "valid-bottom", "There's no padding at all."],
    ]),
  mcq(m(SP, "recall-stride-two", "recall", 1, 15, "Changing a convolution's stride from $1$ to $2$ roughly:"),
    "Halves the output's height and width",
    [
      ["Doubles the output size", "stride-doubles", "Larger strides shrink the output."],
      ["Doubles the number of parameters", "stride-params", "Stride doesn't change parameters."],
      ["Has no effect", "stride-none", "It skips every other position."],
    ]),
  num(m(SP, "apply-valid-size", "apply", 2, 20, "Input width $64$, kernel $3$, padding $0$, stride $1$. What is the output width?"), 62),
  num(m(SP, "apply-stride-size", "apply", 2, 20, "Input width $64$, kernel $3$, padding $1$, stride $2$. What is the output width, using $\\left\\lfloor \\frac{n + 2p - k}{s} \\right\\rfloor + 1$?"), 32),
  num(m(SP, "apply-same-5", "apply", 3, 25, "Input width $100$, kernel $5$, padding $2$, stride $1$. What is the output width?"), 100),
  num(m(SP, "apply-pad-for-5", "apply", 3, 25, "For a stride-$1$ convolution with kernel $5$, what padding $p$ keeps the width unchanged?"), 2),
  num(m(SP, "apply-alexnet", "apply", 4, 30, "AlexNet's first layer: input $227$, kernel $11$, stride $4$, padding $0$. What is the output width?"), 55),
  num(m(SP, "apply-positions", "apply", 4, 30, "A $32 \\times 32$ map passes through a stride-$2$ convolution with same-style padding, giving $16 \\times 16$. How many output positions per channel?"), 256),
  mcq(m(SP, "apply-param-independence", "apply", 5, 40, "Which of these changes a convolutional layer's parameter count?"),
    "The kernel size",
    [
      ["The stride", "independence-stride", "Stride changes where the kernel is applied, not its weights."],
      ["The padding", "independence-padding", "Padding adds input border, not weights."],
      ["The input's height and width", "independence-size", "Weights are shared across positions."],
    ]),
  short(m(SP, "explain-border", "explain", 6, 90, "Zero padding can create artefacts near image borders. Why, and what alternatives exist?"),
    [
      ["why", "Zeros are unlike real image content, so border outputs see an artificial dark frame and the network can learn border-specific behaviour", 2, true],
      ["alternatives", "Reflect/replicate or circular padding, or cropping outputs to valid regions", 2, true],
    ]),
  num(m(SP, "transfer-dilation", "transfer", 7, 60, "A $3 \\times 3$ kernel with dilation $3$ spans what effective width, $d(k - 1) + 1$?"), 7),
  num(m(SP, "transfer-receptive", "transfer", 7, 60, "Layers: $3 \\times 3$ stride $1$, then $3 \\times 3$ stride $2$, then $3 \\times 3$ stride $1$. What is the receptive field width of the last layer?"), 9),
  num(m(SP, "transfer-transposed", "transfer", 8, 60, "A transposed convolution has output width $(n - 1)s - 2p + k$. With $n = 8$, $s = 2$, $p = 1$ and $k = 4$, what is it?"), 16),
  num(m(SP, "transfer-flops-ratio", "transfer", 8, 60, "With same-style padding, switching a 2-D convolution from stride $1$ to stride $2$ divides its multiply-adds by what factor?"), 4),
  short(m(SP, "transfer-odd-kernels", "transfer", 9, 150, "Why are odd kernel sizes ($3$, $5$, $7$) used almost universally?"),
    [
      ["centre", "An odd kernel has a centre pixel, so each output aligns with an input position", 2, true],
      ["padding", "Same padding is then symmetric ($p = \\frac{k - 1}{2}$ on each side), avoiding half-pixel shifts", 2, true],
    ]),
  num(m(SP, "transfer-five-stride2", "transfer", 9, 75, "Five stacked $3 \\times 3$ convolutions, each with stride $2$. What is the receptive field width of the last layer?"), 63),
  short(m(SP, "transfer-aliasing", "transfer", 10, 180, "Why does a stride-$2$ convolution break shift equivariance, and how can that be reduced?"),
    [
      ["aliasing", "Subsampling discards every other position, so a 1-pixel input shift can change outputs drastically (aliasing)", 2, true],
      ["fix", "Low-pass filter (blur) before subsampling, as in anti-aliased (BlurPool) networks", 2, true],
    ]),
  num(m(SP, "transfer-odd-input", "transfer", 10, 90, "Input width $7$, kernel $3$, padding $1$, stride $2$. What is the output width?"), 4),
  mcq(m(SP, "transfer-even-kernel", "transfer", 10, 90, "A stride-$1$ convolution with kernel size $4$ must keep the width unchanged. What padding is needed?"),
    "Asymmetric padding: $3$ in total, e.g. $1$ on one side and $2$ on the other",
    [
      ["$2$ on each side", "even-two", "That grows the output by $1$."],
      ["$1.5$ on each side", "even-half", "Padding must be whole pixels."],
      ["None", "even-none", "That shrinks the output by $3$."],
    ]),
  short(m(SP, "transfer-causal", "transfer", 10, 180, "For 1-D convolutions on time series (as in WaveNet), what is causal padding and why is it needed?"),
    [
      ["what", "Pad only on the left (the past) by $k - 1$ (times the dilation), so each output depends only on current and earlier inputs", 2, true],
      ["why", "Symmetric padding would let outputs see future values, which is invalid for forecasting or autoregressive generation", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// cnn-pooling
// ---------------------------------------------------------------------------
const PO = "cnn-pooling";
const pooling: Item[] = [
  mcq(m(PO, "recall-average", "recall", 1, 15, "Average pooling outputs:"),
    "The mean of the values in each window",
    [
      ["The largest value in each window", "average-max", "That's max pooling."],
      ["The sum of all values in the map", "average-sum", "It works per window."],
      ["A learned weighted sum", "average-learned", "Average pooling has no weights."],
    ]),
  mcq(m(PO, "recall-channels", "recall", 1, 15, "A $2 \\times 2$ pooling layer with stride $2$ changes:"),
    "The height and width, but not the number of channels",
    [
      ["The number of channels only", "channels-only", "Pooling works per channel."],
      ["Nothing", "channels-nothing", "It halves height and width."],
      ["The channels and the spatial size", "channels-both", "Channels are unchanged."],
    ]),
  num(m(PO, "apply-max", "apply", 2, 20, "Max-pool the window $\\begin{bmatrix} 4 & 1 \\\\ 0 & 2 \\end{bmatrix}$."), 4),
  num(m(PO, "apply-average", "apply", 2, 20, "Average-pool the same window."), 1.75),
  num(m(PO, "apply-output-values", "apply", 3, 25, "$2 \\times 2$ pooling with stride $2$ on a $64 \\times 64 \\times 32$ tensor gives how many values?"), 32768),
  num(m(PO, "apply-global-max", "apply", 3, 25, "Global max pooling on a $7 \\times 7 \\times 256$ tensor gives how many values?"), 256),
  num(m(PO, "apply-3x3", "apply", 3, 25, "$3 \\times 3$ pooling with stride $3$ on a width-$27$ map gives what width?"), 9),
  num(m(PO, "apply-stride-one", "apply", 4, 30, "$2 \\times 2$ pooling with stride $1$ and no padding on a width-$10$ map gives what width?"), 9),
  num(m(PO, "apply-comparisons", "apply", 4, 30, "Each $2 \\times 2$ max needs $3$ comparisons. How many comparisons for a $16 \\times 16$ output map?"), 768),
  short(m(PO, "explain-location", "explain", 6, 90, "Pooling throws away exact positions. Why is that fine for classification but a problem for segmentation, and how do segmentation networks cope?"),
    [
      ["tradeoff", "Classification only needs what is present; segmentation needs where, at pixel precision", 2, true],
      ["cope", "Encoder–decoder designs with skip connections (e.g. U-Net) or dilated convolutions recover fine spatial detail", 2, true],
    ]),
  num(m(PO, "transfer-gem-one", "transfer", 7, 60, "GeM pooling $\\left(\\frac{1}{N}\\sum x_i^{p}\\right)^{1/p}$ with $p = 1$ on values $1$, $2$, $3$ and $6$ gives what?"), 3),
  num(m(PO, "transfer-gem-two", "transfer", 7, 60, "Same values with $p = 2$. Give $4$ decimal places."), 3.5355),
  mcq(m(PO, "transfer-gem-limit", "transfer", 7, 60, "As $p \\to \\infty$, GeM pooling approaches:"),
    "Max pooling",
    [
      ["Average pooling", "gem-limit-average", "That's $p = 1$."],
      ["Min pooling", "gem-limit-min", "That's $p \\to -\\infty$ (for positive values)."],
      ["Zero", "gem-limit-zero", "It tends to the largest value."],
    ]),
  num(m(PO, "transfer-spp", "transfer", 8, 60, "Spatial pyramid pooling with $1 \\times 1$, $2 \\times 2$ and $3 \\times 3$ grids on $512$ channels outputs how many values?"), 7168),
  num(m(PO, "transfer-avg-grad", "transfer", 8, 60, "In backprop through $2 \\times 2$ average pooling, the upstream gradient is $8$. What gradient does each input get?"), 2),
  mcq(m(PO, "transfer-attention-pool", "transfer", 8, 60, "Attention pooling differs from average pooling by:"),
    "Weighting each position by learned, input-dependent scores before summing",
    [
      ["Always picking the maximum", "attention-pool-max", "It's a soft weighted average."],
      ["Using fixed equal weights", "attention-pool-equal", "That's average pooling."],
      ["Having no parameters", "attention-pool-no-params", "Scores come from learned parameters."],
    ]),
  short(m(PO, "transfer-generative", "transfer", 9, 150, "Why do many generators and modern backbones replace max pooling with strided convolutions?"),
    [
      ["learned", "Strided convolutions learn how to downsample instead of applying a fixed rule", 2, true],
      ["gradients", "Max pooling routes gradient to one input per window, giving sparse gradients; generators (e.g. DCGAN) train more stably without it", 2, true],
    ]),
  num(m(PO, "transfer-lse", "transfer", 10, 90, "Log-sum-exp pooling $\\frac{1}{r}\\ln\\left(\\frac{1}{N}\\sum e^{r x_i}\\right)$ with $r = 1$ on values $0$ and $\\ln 3$ gives what? Give $4$ decimal places."), 0.6931),
  short(m(PO, "transfer-sets", "transfer", 10, 180, "Why are sum, mean and max pooling used to aggregate sets of elements (e.g. point clouds or graph neighbourhoods)?"),
    [
      ["invariance", "They're permutation-invariant, so the output doesn't depend on element order", 2, true],
      ["differences", "Sum keeps set-size information, mean normalises it away, max captures the most salient element", 2, true],
    ]),
  mcq(m(PO, "transfer-sum-vs-mean", "transfer", 10, 90, "A graph network must count how many neighbours carry a certain feature. Which aggregator can represent this?"),
    "Sum",
    [
      ["Mean", "sum-vs-mean-mean", "Mean loses the count."],
      ["Max", "sum-vs-mean-max", "Max only says whether one exists."],
      ["None of them", "sum-vs-mean-none", "Sum preserves counts."],
    ]),
];

// ---------------------------------------------------------------------------
// cnn-design-choices
// ---------------------------------------------------------------------------
const DC = "cnn-design-choices";
const design: Item[] = [
  mcq(m(DC, "recall-vgg", "recall", 1, 15, "VGG networks are known for:"),
    "Stacking many small $3 \\times 3$ convolutions",
    [
      ["Using only $11 \\times 11$ kernels", "vgg-large", "That was AlexNet's first layer."],
      ["Introducing residual connections", "vgg-residual", "That's ResNet."],
      ["Using attention", "vgg-attention", "VGG is purely convolutional."],
    ]),
  mcq(m(DC, "recall-resnet", "recall", 1, 15, "Which architecture introduced residual (skip) connections that made very deep CNNs trainable?"),
    "ResNet",
    [
      ["LeNet", "resnet-lenet", "LeNet was a small early CNN."],
      ["VGG", "resnet-vgg", "VGG had no skip connections."],
      ["AlexNet", "resnet-alexnet", "AlexNet had no skip connections."],
    ]),
  num(m(DC, "apply-weights", "apply", 2, 20, "How many weights (no biases) does a $3 \\times 3$ convolution from $32$ to $64$ channels have?"), 18432),
  num(m(DC, "apply-flops-ratio", "apply", 2, 20, "Halving height and width while doubling channels: by what factor do a $3 \\times 3$ layer's multiply-adds change ($HW C^{2}$ becomes $\\frac{H}{2}\\frac{W}{2}(2C)^{2}$)?"), 1),
  num(m(DC, "apply-grouped", "apply", 3, 25, "A $3 \\times 3$ convolution from $64$ to $64$ channels with $4$ groups (no biases) has how many weights?"), 9216),
  num(m(DC, "apply-se", "apply", 3, 25, "A squeeze-and-excitation block on $256$ channels with reduction $16$ uses two dense layers ($256 \\to 16 \\to 256$, no biases). How many weights?"), 8192),
  num(m(DC, "apply-depth-flops", "apply", 4, 30, "Doubling a CNN's depth (adding identical layers) multiplies its FLOPs by about what factor?"), 2),
  num(m(DC, "apply-compound", "apply", 4, 35, "Compound scaling multiplies depth by $1.2$, width by $1.1$ and resolution by $1.15$. FLOPs scale as $d \\cdot w^{2} \\cdot r^{2}$. By what factor? Give $4$ decimal places."), 1.9203),
  num(m(DC, "apply-activation-memory", "apply", 4, 30, "A $56 \\times 56 \\times 256$ feature map in fp16 ($2$ bytes per value) takes how many megabytes ($10^{6}$ bytes)? Give $4$ decimal places."), 1.6056),
  mcq(m(DC, "apply-inverted-residual", "apply", 5, 40, "MobileNetV2's inverted residual block:"),
    "Expands channels with a $1 \\times 1$ convolution, applies a depthwise $3 \\times 3$, then projects back down",
    [
      ["Compresses then expands, like a ResNet bottleneck", "inverted-bottleneck", "It's the inverse: expand first."],
      ["Uses only $7 \\times 7$ standard convolutions", "inverted-7x7", "It relies on depthwise convolutions."],
      ["Has no skip connection", "inverted-no-skip", "It keeps a residual between thin layers."],
    ]),
  mcq(m(DC, "apply-stem", "apply", 5, 40, "Why do ImageNet CNNs downsample aggressively in the first layers (the stem)?"),
    "High-resolution early layers are the most expensive, so shrinking quickly saves compute and memory",
    [
      ["Early layers need large receptive fields only", "stem-receptive", "Cost is the main reason."],
      ["Images contain no fine detail", "stem-no-detail", "They do; it's a trade-off."],
      ["It removes the need for later pooling", "stem-no-pooling", "Later stages still downsample."],
    ]),
  num(m(DC, "transfer-depthwise7", "transfer", 7, 60, "A $7 \\times 7$ depthwise convolution on $96$ channels (no biases) has how many weights?"), 4704),
  short(m(DC, "transfer-pretrained-first", "transfer", 7, 120, "For a new image task with a few thousand labelled images, why start from a pretrained backbone rather than designing a new CNN?"),
    [
      ["features", "Pretrained features (edges, textures, parts) transfer widely, so far fewer labelled images are needed", 2, true],
      ["risk", "A custom architecture trained from scratch would likely overfit and needs much more tuning", 2, true],
    ]),
  num(m(DC, "transfer-bottleneck", "transfer", 8, 60, "A ResNet bottleneck: $1 \\times 1$ ($256 \\to 64$), $3 \\times 3$ ($64 \\to 64$), $1 \\times 1$ ($64 \\to 256$), no biases. How many weights?"), 69632),
  short(m(DC, "transfer-mobile", "transfer", 8, 120, "What design choices would you make for a CNN that must run in real time on a phone?"),
    [
      ["efficient-ops", "Use depthwise separable or inverted-residual blocks, fewer channels, and an efficient architecture (e.g. MobileNet/EfficientNet-Lite)", 2, true],
      ["deployment", "Lower input resolution, quantise to int8, and measure latency on the device rather than trusting FLOPs", 2, true],
    ]),
  mcq(m(DC, "transfer-convnext-norm", "transfer", 8, 60, "Which normalisation does ConvNeXt use in place of batch norm?"),
    "Layer normalisation",
    [
      ["Group normalisation", "convnext-group", "It adopted transformer-style layer norm."],
      ["No normalisation", "convnext-none", "It keeps a normalisation layer."],
      ["Instance normalisation", "convnext-instance", "It uses layer norm."],
    ]),
  num(m(DC, "transfer-separable-ratio", "transfer", 9, 75, "A depthwise separable $3 \\times 3$ convolution with $256$ input and output channels costs $\\frac{1}{C_{\\text{out}}} + \\frac{1}{k^{2}}$ of the standard one. What fraction? Give $4$ decimal places."), 0.115),
  short(m(DC, "transfer-cifar-stem", "transfer", 9, 150, "An ImageNet ResNet does poorly on $32 \\times 32$ CIFAR images. What would you change in its stem, and why?"),
    [
      ["change", "Replace the $7 \\times 7$ stride-$2$ convolution and max pool with a single $3 \\times 3$ stride-$1$ convolution", 2, true],
      ["why", "The ImageNet stem downsamples $4\\times$ immediately, leaving tiny $8 \\times 8$ maps that discard most of a small image's detail", 2, true],
    ]),
  short(m(DC, "transfer-latency-flops", "transfer", 10, 180, "Why can a network with fewer FLOPs run slower on a GPU than one with more?"),
    [
      ["memory", "Ops like depthwise convolutions do little compute per byte moved, so they're memory-bandwidth-bound and run at low utilisation", 2, true],
      ["overhead", "Many small layers add kernel-launch and synchronisation overhead; FLOPs ignore parallelism and memory access", 2, true],
    ]),
  mcq(m(DC, "transfer-repvgg", "transfer", 10, 90, "RepVGG trains with parallel $3 \\times 3$, $1 \\times 1$ and identity branches. What happens at inference?"),
    "The branches are algebraically merged into a single $3 \\times 3$ convolution per layer",
    [
      ["All three branches still run", "repvgg-all", "They're fused into one kernel."],
      ["The $3 \\times 3$ branch is dropped", "repvgg-drop", "It's merged, not dropped."],
      ["The network is retrained", "repvgg-retrain", "Merging is exact, with no retraining."],
    ]),
];

// ---------------------------------------------------------------------------
// recurrent-neural-networks
// ---------------------------------------------------------------------------
const RN = "recurrent-neural-networks";
const rnns: Item[] = [
  mcq(m(RN, "recall-sequential", "recall", 1, 15, "A recurrent neural network processes a sequence by:"),
    "Reading one element at a time and updating a hidden state",
    [
      ["Reading all elements at once with attention", "sequential-attention", "That's a transformer."],
      ["Sorting the elements first", "sequential-sort", "Order matters and is kept."],
      ["Ignoring element order", "sequential-order", "It's order-sensitive."],
    ]),
  mcq(m(RN, "recall-hidden", "recall", 1, 15, "The hidden state of an RNN acts as:"),
    "A memory summarising what the network has seen so far",
    [
      ["The final prediction only", "hidden-prediction", "It's carried between steps."],
      ["A fixed constant", "hidden-constant", "It changes every step."],
      ["The learning rate", "hidden-lr", "Unrelated."],
    ]),
  mcq(m(RN, "recall-task", "recall", 1, 15, "Which task is a classic use of RNNs?"),
    "Language modelling — predicting the next word",
    [
      ["Classifying unordered tabular rows", "task-tabular", "No sequence there."],
      ["Image segmentation of single photos", "task-segmentation", "That's typically CNNs."],
      ["Clustering customers", "task-clustering", "Not a sequence task."],
    ]),
  num(m(RN, "apply-params", "apply", 2, 20, "A simple RNN with input size $5$ and hidden size $10$ has $W_{xh}$, $W_{hh}$ and a bias. How many parameters?"), 160),
  num(m(RN, "apply-linear-two", "apply", 2, 20, "A linear RNN $h_t = 0.5h_{t-1} + x_t$ starts at $h_0 = 0$ and reads $x_1 = 1$, $x_2 = 1$. What is $h_2$?"), 1.5),
  num(m(RN, "apply-unroll", "apply", 2, 20, "Backpropagation through time on a $50$-step sequence unrolls the RNN into how many time steps?"), 50),
  num(m(RN, "apply-decay", "apply", 3, 25, "The same linear RNN reads $2$, $0$, $0$. What is $h_3$?"), 0.5),
  num(m(RN, "apply-vanish", "apply", 3, 25, "Each step scales the gradient by $0.8$. What factor remains after $5$ steps? Give $4$ decimal places."), 0.3277),
  num(m(RN, "apply-output-layer", "apply", 3, 25, "An output layer maps a $20$-unit hidden state to a $1{,}000$-word vocabulary, with biases. How many parameters?"), 21000),
  num(m(RN, "apply-tanh", "apply", 4, 30, "A hidden state is $h_1 = \\tanh(z)$ with $z = \\ln 2$. What is $h_1$?"), 0.6),
  num(m(RN, "apply-lstm-params", "apply", 4, 30, "An LSTM has $4$ gate blocks, each with $h(h + x) + h$ parameters. How many for input size $10$ and hidden size $20$?"), 2480),
  num(m(RN, "apply-gru-params", "apply", 4, 30, "A GRU has $3$ such blocks. How many parameters for the same sizes?"), 1860),
  mcq(m(RN, "apply-exposure-bias", "apply", 5, 40, "Training with teacher forcing can cause “exposure bias.” What is it?"),
    "At generation time the model sees its own (possibly wrong) outputs, a distribution it never saw in training",
    [
      ["The model sees too much training data", "exposure-data", "It's about inputs at test time."],
      ["Gradients explode", "exposure-gradients", "That's a different problem."],
      ["The model can't see earlier inputs", "exposure-earlier", "It sees them; the issue is their source."],
    ]),
  short(m(RN, "explain-truncated", "explain", 7, 120, "What does truncated BPTT trade off?"),
    [
      ["saves", "Backpropagating through only the last $k$ steps bounds memory and compute per update", 2, true],
      ["loses", "Gradients can't capture dependencies longer than $k$ steps, though the hidden state still carries information forward", 2, true],
    ]),
  num(m(RN, "transfer-explode", "transfer", 8, 60, "Each step scales the gradient by $1.1$. What factor results after $100$ steps, to the nearest whole number?"), 13781),
  short(m(RN, "transfer-inference-memory", "transfer", 9, 150, "Why can an RNN generate long sequences with constant memory per step, unlike a standard transformer?"),
    [
      ["rnn", "The RNN keeps only a fixed-size hidden state, updated each step", 2, true],
      ["transformer", "A transformer attends to all previous tokens, so its KV cache (and per-token cost) grows with sequence length", 2, true],
    ]),
  mcq(m(RN, "transfer-beam", "transfer", 9, 75, "Beam search decoding in a sequence-to-sequence RNN:"),
    "Keeps the $k$ most probable partial sequences at each step instead of only the single best",
    [
      ["Samples uniformly at random", "beam-random", "It's a deterministic search."],
      ["Keeps every possible sequence", "beam-all", "That's exponential."],
      ["Always picks the most likely next token", "beam-greedy", "That's greedy decoding ($k = 1$)."],
    ]),
  short(m(RN, "transfer-time-constants", "transfer", 10, 180, "Explain how gates in LSTMs and GRUs act like learned, input-dependent time constants."),
    [
      ["decay", "A gate value near $1$ keeps the old state (slow decay), near $0$ overwrites it (fast decay)", 2, true],
      ["learned", "Because gates depend on the input, the network decides per step and per unit how long to remember, unlike a fixed decay", 2, true],
    ]),
  num(m(RN, "transfer-memory-span", "transfer", 10, 90, "A forget gate stays at $0.95$. The memory's time constant is about $\\frac{1}{1 - f}$ steps. How many?"), 20),
  mcq(m(RN, "transfer-orthogonal", "transfer", 10, 90, "Why initialise an RNN's recurrent matrix to be orthogonal?"),
    "Orthogonal matrices preserve vector norms, so signals and gradients neither vanish nor explode through many steps at first",
    [
      ["It makes the network linear", "orthogonal-linear", "Activations still apply."],
      ["It removes the need for training", "orthogonal-no-training", "It's only an initialisation."],
      ["It makes all weights zero", "orthogonal-zero", "Orthogonal matrices are full rank."],
    ]),
];

// ---------------------------------------------------------------------------
// attention-mechanism
// ---------------------------------------------------------------------------
const AT = "attention-mechanism";
const attention: Item[] = [
  mcq(m(AT, "recall-focus", "recall", 1, 15, "Attention lets a model:"),
    "Weigh different parts of its input by relevance when computing each output",
    [
      ["Process only the first token", "focus-first", "It can use all positions."],
      ["Avoid using parameters", "focus-no-params", "It uses learned projections."],
      ["Skip training", "focus-skip", "It's trained like other layers."],
    ]),
  mcq(m(AT, "recall-output", "recall", 1, 15, "The output of attention for one query is:"),
    "A weighted average of the value vectors",
    [
      ["The largest key", "output-largest", "It blends values."],
      ["The sum of the queries", "output-queries", "It mixes values."],
      ["A random value", "output-random", "Weights come from query–key scores."],
    ]),
  mcq(m(AT, "recall-origin", "recall", 1, 15, "Attention in neural networks first became prominent in:"),
    "Neural machine translation (Bahdanau et al., $2014$)",
    [
      ["Image classification with AlexNet", "origin-alexnet", "AlexNet had no attention."],
      ["Reinforcement learning on Atari", "origin-atari", "That was DQN."],
      ["Word2vec", "origin-word2vec", "Word2vec has no attention."],
    ]),
  num(m(AT, "apply-weighted", "apply", 2, 20, "Attention weights $(0.5, 0.5)$ over values $2$ and $6$. What is the output?"), 4),
  num(m(AT, "apply-sqrt", "apply", 2, 20, "With $d_k = 64$, what is the scaling factor $\\sqrt{d_k}$?"), 8),
  num(m(AT, "apply-score", "apply", 2, 20, "What is the raw score $\\mathbf{q} \\cdot \\mathbf{k}$ for $\\mathbf{q} = [1, 2]$ and $\\mathbf{k} = [3, 1]$?"), 5),
  num(m(AT, "apply-softmax", "apply", 3, 25, "Scaled scores are $(0, \\ln 3)$. What attention weight does the second key get?"), 0.75),
  num(m(AT, "apply-scaled", "apply", 3, 25, "A raw score is $16$ with $d_k = 16$. What is the scaled score?"), 4),
  num(m(AT, "apply-matrix-size", "apply", 3, 25, "Self-attention over $1{,}000$ tokens builds an attention matrix with how many entries per head?"), 1000000),
  num(m(AT, "apply-vector-output", "apply", 4, 30, "Weights $(0.25, 0.75)$ over value vectors $[4, 0]$ and $[0, 8]$. What is the first component of the output?"), 1),
  num(m(AT, "apply-projection-params", "apply", 4, 30, "With $d_{\\text{model}} = 512$, the $W_Q$, $W_K$, $W_V$ and $W_O$ projections (each $512 \\times 512$, no biases) have how many parameters in total?"), 1048576),
  num(m(AT, "apply-causal-pairs", "apply", 4, 30, "With a causal mask over $10$ tokens, how many query–key pairs are allowed (including each token with itself)?"), 55),
  mcq(m(AT, "apply-additive", "apply", 5, 40, "How does additive (Bahdanau) attention score a query against a key?"),
    "With a small feed-forward network on the query and key, rather than a dot product",
    [
      ["By adding the query and key and taking the norm", "additive-norm", "It uses a learned network."],
      ["By a scaled dot product", "additive-dot", "That's multiplicative attention."],
      ["By counting matching tokens", "additive-count", "It's a learned score."],
    ]),
  short(m(AT, "explain-permutation", "explain", 7, 120, "Why is self-attention on its own unaware of token order, and what is done about it?"),
    [
      ["equivariant", "Permuting the input tokens just permutes the outputs: scores depend only on content, not position", 2, true],
      ["fix", "Positional information is injected, e.g. absolute positional embeddings, sinusoids, RoPE or relative position biases", 2, true],
    ]),
  num(m(AT, "transfer-memory", "transfer", 8, 60, "One head's attention matrix for $8{,}192$ tokens in fp16 ($2$ bytes per entry) takes how many mebibytes ($2^{20}$ bytes)?"), 128),
  short(m(AT, "transfer-sparse", "transfer", 9, 150, "What do local or sparse attention patterns gain and lose compared with full attention?"),
    [
      ["gain", "Cost grows roughly linearly in sequence length instead of quadratically", 2, true],
      ["lose", "Direct long-range interactions are restricted, so distant dependencies must pass through several layers or special global tokens", 2, true],
    ]),
  mcq(m(AT, "transfer-sink", "transfer", 9, 75, "Language models often put large attention weight on the first token regardless of content. This “attention sink” arises because:"),
    "Softmax weights must sum to $1$, so heads with nothing useful to attend to dump weight on an always-present token",
    [
      ["The first token is always the most important", "sink-important", "Its content often doesn't matter."],
      ["It's a bug in tokenisers", "sink-bug", "It's a learned behaviour."],
      ["Causal masks forbid attending elsewhere", "sink-mask", "Other earlier tokens are allowed."],
    ]),
  num(m(AT, "transfer-gqa", "transfer", 10, 90, "Grouped-query attention uses $32$ query heads but only $8$ key–value heads. By what factor does it shrink the KV cache versus standard multi-head attention?"), 4),
  num(m(AT, "transfer-kv-cache", "transfer", 10, 90, "KV cache: $32$ layers, $32$ heads, head size $128$, $4{,}096$ tokens, fp16, storing both K and V. How many gibibytes ($2^{30}$ bytes)?"), 2),
  mcq(m(AT, "transfer-temperature", "transfer", 10, 90, "Multiplying all attention scores by a large constant before the softmax makes the weights:"),
    "Sharper — closer to a hard choice of the top-scoring key",
    [
      ["More uniform", "temperature-uniform", "That's dividing by a large constant."],
      ["Unchanged", "temperature-unchanged", "Softmax isn't scale-invariant."],
      ["Negative", "temperature-negative", "Softmax outputs stay positive."],
    ]),
];

// ---------------------------------------------------------------------------
// transformers
// ---------------------------------------------------------------------------
const TR = "transformers";
const transformers: Item[] = [
  mcq(m(TR, "recall-paper", "recall", 1, 15, "The transformer was introduced in which paper?"),
    "“Attention Is All You Need” (Vaswani et al., $2017$)",
    [
      ["“ImageNet Classification with Deep CNNs”", "paper-alexnet", "That's AlexNet."],
      ["“Deep Residual Learning”", "paper-resnet", "That's ResNet."],
      ["“Playing Atari with Deep RL”", "paper-dqn", "That's DQN."],
    ]),
  mcq(m(TR, "recall-parallel", "recall", 1, 15, "During training, a transformer processes the tokens of a sequence:"),
    "In parallel, unlike an RNN's step-by-step processing",
    [
      ["Strictly one at a time", "parallel-sequential", "That's an RNN."],
      ["In random order with no positions", "parallel-random", "Positions are encoded."],
      ["Only the first token", "parallel-first", "All tokens are processed."],
    ]),
  mcq(m(TR, "recall-stack", "recall", 1, 15, "A transformer model is built by:"),
    "Stacking many identical blocks of attention and feed-forward layers",
    [
      ["Using a single attention layer", "stack-single", "Many blocks are stacked."],
      ["Stacking convolutional layers only", "stack-conv", "Its blocks use attention."],
      ["Chaining RNN cells", "stack-rnn", "It has no recurrence."],
    ]),
  num(m(TR, "apply-head-dim", "apply", 2, 20, "$d_{\\text{model}} = 4096$ with $32$ heads. What is the dimension per head?"), 128),
  num(m(TR, "apply-ffn", "apply", 2, 20, "The feed-forward hidden size is $4d_{\\text{model}}$. What is it for $d_{\\text{model}} = 1024$?"), 4096),
  num(m(TR, "apply-layer-params", "apply", 2, 20, "A transformer layer has about $12d^{2}$ parameters. How many for $d = 768$?"), 7077888),
  num(m(TR, "apply-sinusoid", "apply", 3, 25, "Sinusoidal positional encodings use $\\cos$ on odd dimensions. What is an odd dimension's value at position $0$?"), 1),
  num(m(TR, "apply-attention-flops", "apply", 3, 25, "Computing $QK^{\\top}$ costs about $n^{2}d$ multiply-adds. For $n = 2{,}048$ and $d = 1{,}024$, how many billion ($10^{9}$)? Give $3$ decimal places."), 4.295),
  num(m(TR, "apply-embedding", "apply", 3, 25, "An embedding table for $50{,}000$ tokens with $d = 768$ has how many million parameters?"), 38.4),
  num(m(TR, "apply-model-params", "apply", 4, 30, "A $24$-layer model with $d = 1{,}024$ has about $12 \\cdot 24 \\cdot d^{2}$ non-embedding parameters. How many million? Give $4$ decimal places."), 301.9899),
  num(m(TR, "apply-training-flops", "apply", 4, 30, "Training costs about $6ND$ FLOPs. For $N = 10^{9}$ parameters and $D = 2 \\times 10^{10}$ tokens, how many units of $10^{20}$ FLOPs?"), 1.2),
  num(m(TR, "apply-kv-per-token", "apply", 4, 30, "The KV cache stores $2 \\cdot L \\cdot d$ values per token. With $L = 24$, $d = 1{,}024$ and fp16 ($2$ bytes), how many bytes per token?"), 98304),
  mcq(m(TR, "apply-pre-ln", "apply", 5, 40, "In a pre-LN transformer block, layer normalisation is applied:"),
    "To the input of each sublayer, inside the residual branch",
    [
      ["After the residual addition", "pre-ln-post", "That's post-LN."],
      ["Only at the very end of the model", "pre-ln-end", "It's in every block (plus usually a final one)."],
      ["Only to the embeddings", "pre-ln-embeddings", "It's before every sublayer."],
    ]),
  short(m(TR, "explain-decoder-only", "explain", 7, 120, "Why have decoder-only transformers become the dominant design for large language models?"),
    [
      ["objective", "Next-token prediction on raw text is a simple, scalable objective that needs no labels", 2, true],
      ["general", "One causal model handles understanding and generation through prompting, and caches efficiently during generation", 2, true],
    ]),
  num(m(TR, "transfer-context-cost", "transfer", 8, 60, "Context length grows $4\\times$. By what factor does the attention score computation grow?"), 16),
  short(m(TR, "transfer-rope", "transfer", 9, 150, "How does RoPE encode position, and why does that help with relative positions?"),
    [
      ["rotate", "It rotates query and key vectors by angles proportional to their positions", 2, true],
      ["relative", "So their dot product depends only on the position difference, giving relative-position awareness", 2, true],
    ]),
  mcq(m(TR, "transfer-tied", "transfer", 9, 75, "Tying a language model's input embedding and output projection weights:"),
    "Uses the same matrix for both, saving parameters and sharing information between them",
    [
      ["Freezes both during training", "tied-frozen", "They're still trained."],
      ["Doubles the vocabulary", "tied-vocab", "The vocabulary is unchanged."],
      ["Removes the softmax", "tied-softmax", "The softmax remains."],
    ]),
  short(m(TR, "transfer-length-generalisation", "transfer", 10, 180, "Why do transformers often fail on sequences longer than those seen in training, and what helps?"),
    [
      ["why", "Positions (or relative distances) beyond the training range were never seen, so attention patterns and position encodings extrapolate poorly", 2, true],
      ["help", "Relative schemes like ALiBi, RoPE with interpolation/scaling, and fine-tuning on longer contexts", 2, true],
    ]),
  num(m(TR, "transfer-decode-speed", "transfer", 10, 90, "Decoding reads every weight once per token. A $7 \\times 10^{9}$-parameter fp16 model ($14$ GB) on hardware with $1$ TB/s of memory bandwidth can generate at most how many tokens per second (batch $1$)? Give $2$ decimal places."), 71.43),
  mcq(m(TR, "transfer-icl", "transfer", 10, 90, "In-context learning means a transformer:"),
    "Adapts its behaviour to examples given in the prompt, without any weight updates",
    [
      ["Fine-tunes its weights on the prompt", "icl-finetune", "No weights change."],
      ["Retrains from scratch on each prompt", "icl-retrain", "No training happens."],
      ["Ignores the prompt", "icl-ignores", "The prompt drives the behaviour."],
    ]),
];

// ---------------------------------------------------------------------------
// embeddings
// ---------------------------------------------------------------------------
const EM = "embeddings";
const embeddings: Item[] = [
  mcq(m(EM, "recall-dense", "recall", 1, 15, "An embedding represents an item as:"),
    "A dense, learned vector of real numbers",
    [
      ["A one-hot vector", "dense-onehot", "Embeddings replace one-hot vectors."],
      ["A single integer", "dense-integer", "The integer is just the lookup index."],
      ["A string", "dense-string", "It's numeric."],
    ]),
  mcq(m(EM, "recall-learned", "recall", 1, 15, "How are embedding vectors usually obtained?"),
    "They're learned by gradient descent as part of training",
    [
      ["They're written by hand", "learned-hand", "They're learned."],
      ["They're random and never change", "learned-random", "They start random and are trained."],
      ["They're computed by sorting", "learned-sort", "They're optimised."],
    ]),
  mcq(m(EM, "recall-similar", "recall", 1, 15, "In a good embedding space, similar items:"),
    "Have nearby vectors",
    [
      ["Have orthogonal vectors", "similar-orthogonal", "Unrelated items tend toward orthogonality."],
      ["Have the same index", "similar-index", "Indices are arbitrary."],
      ["Have vectors of length $0$", "similar-zero", "Length isn't the point."],
    ]),
  num(m(EM, "apply-table", "apply", 2, 20, "An embedding table has $1{,}000$ items and $64$ dimensions. How many parameters?"), 64000),
  num(m(EM, "apply-cos-parallel", "apply", 2, 20, "What is the cosine similarity of $[2, 0]$ and $[3, 0]$?"), 1),
  num(m(EM, "apply-dot", "apply", 2, 20, "What is the dot product of $[1, 2, 3]$ and $[1, 0, 1]$?"), 4),
  num(m(EM, "apply-cos", "apply", 3, 25, "What is the cosine similarity of $[1, 0, 1]$ and $[0, 1, 1]$?"), 0.5),
  num(m(EM, "apply-euclid", "apply", 3, 25, "What is the Euclidean distance between $[1, 2]$ and $[4, 6]$?"), 5),
  num(m(EM, "apply-memory", "apply", 3, 25, "A $50{,}000 \\times 512$ embedding table in fp32 takes how many megabytes ($10^{6}$ bytes)?"), 102.4),
  num(m(EM, "apply-analogy", "apply", 4, 30, "Toy vectors: king $= [5, 3]$, man $= [4, 1]$, woman $= [4, 3]$. What is the second coordinate of king $-$ man $+$ woman?"), 5),
  num(m(EM, "apply-hashing", "apply", 4, 30, "The hashing trick maps $10^{6}$ IDs into $2^{16}$ buckets. On average, how many IDs share a bucket? Give $2$ decimal places."), 15.26),
  num(m(EM, "apply-rows-updated", "apply", 4, 30, "A batch of $512$ tokens contains $300$ distinct tokens. How many embedding rows receive nonzero gradients?"), 300),
  mcq(m(EM, "apply-negative-sampling", "apply", 5, 40, "Why does word2vec use negative sampling?"),
    "To avoid a full softmax over the vocabulary by contrasting each true pair with a few random “negative” words",
    [
      ["To remove rare words", "negative-rare", "That's subsampling."],
      ["To make embeddings negative", "negative-values", "It's about the training objective."],
      ["To add labels", "negative-labels", "It's self-supervised."],
    ]),
  short(m(EM, "explain-two-tower", "explain", 7, 120, "How does a two-tower recommender use embeddings to retrieve items quickly?"),
    [
      ["towers", "One network embeds users (or queries) and another embeds items into the same space, trained so relevant pairs score highly", 2, true],
      ["retrieval", "Item embeddings are precomputed and indexed, so retrieval is a fast nearest-neighbour search on the user embedding", 2, true],
    ]),
  num(m(EM, "transfer-skipgram-pairs", "transfer", 8, 60, "Skip-gram with window $2$ pairs each word with up to $2$ neighbours on each side. How many (centre, context) pairs come from a $10$-word sentence?"), 34),
  short(m(EM, "transfer-bias", "transfer", 9, 150, "How can word embeddings encode social biases, and why does that matter downstream?"),
    [
      ["encode", "They learn co-occurrence patterns from text, so stereotypical associations (e.g. gender and occupations) end up in the geometry", 2, true],
      ["matters", "Systems built on them (search, screening, translation) can reproduce or amplify those biases", 2, true],
    ]),
  mcq(m(EM, "transfer-matryoshka", "transfer", 9, 75, "Matryoshka embeddings are trained so that:"),
    "Prefixes of the vector (e.g. the first $64$ of $768$ dimensions) are themselves useful embeddings",
    [
      ["Every dimension is binary", "matryoshka-binary", "That's binary quantisation."],
      ["The vector has no fixed size", "matryoshka-variable", "The full size is fixed; prefixes are usable."],
      ["Embeddings are nested inside images", "matryoshka-images", "It's about truncation."],
    ]),
  short(m(EM, "transfer-reindex", "transfer", 10, 180, "A search system upgrades its embedding model. Why must the whole document index be re-embedded?"),
    [
      ["incompatible", "Different models produce different, unaligned vector spaces, so new query vectors can't be compared with old document vectors", 2, true],
      ["practice", "Re-embed the corpus (or learn a mapping between spaces) and version the index together with the model", 2, true],
    ]),
  num(m(EM, "transfer-pq", "transfer", 10, 90, "A $768$-dimensional fp32 vector takes $3{,}072$ bytes. Product quantisation stores it as $96$ one-byte codes. What is the compression ratio?"), 32),
  mcq(m(EM, "transfer-anisotropy", "transfer", 10, 90, "Sentence embeddings all have cosine similarity above $0.7$ with each other. A simple fix is to:"),
    "Subtract the mean embedding (and optionally whiten) before comparing",
    [
      ["Multiply every vector by $10$", "anisotropy-scale", "Cosine ignores scale."],
      ["Use more decimal places", "anisotropy-precision", "Precision isn't the issue."],
      ["Add random noise", "anisotropy-noise", "That just degrades the signal."],
    ]),
];

// ---------------------------------------------------------------------------
// autoencoders
// ---------------------------------------------------------------------------
const AE = "autoencoders";
const autoencoders: Item[] = [
  mcq(m(AE, "recall-target", "recall", 1, 15, "An autoencoder is trained to output:"),
    "Its own input",
    [
      ["A class label", "target-label", "It needs no labels."],
      ["The next frame of a video", "target-next", "That's prediction, not reconstruction."],
      ["Random noise", "target-noise", "It reconstructs the input."],
    ]),
  mcq(m(AE, "recall-code", "recall", 1, 15, "The latent code of an autoencoder is:"),
    "The compressed representation produced by the encoder",
    [
      ["The reconstructed input", "code-reconstruction", "That's the decoder's output."],
      ["The training labels", "code-labels", "There are no labels."],
      ["The loss value", "code-loss", "It's a representation."],
    ]),
  mcq(m(AE, "recall-use", "recall", 1, 15, "A common use of autoencoders is:"),
    "Non-linear dimensionality reduction",
    [
      ["Supervised classification without features", "use-classification", "They learn features without labels."],
      ["Sorting data", "use-sorting", "Unrelated."],
      ["Hyperparameter search", "use-hpo", "Unrelated."],
    ]),
  num(m(AE, "apply-mse", "apply", 2, 20, "Input $[1, 3]$ is reconstructed as $[2, 3]$. What is the mean squared error?"), 0.5),
  num(m(AE, "apply-ratio", "apply", 2, 20, "An autoencoder compresses $784$-dimensional inputs to $16$ dimensions. What is the compression factor?"), 49),
  num(m(AE, "apply-encoder-params", "apply", 2, 20, "A linear encoder maps $100$ inputs to $20$ latent units, with biases. How many parameters?"), 2020),
  num(m(AE, "apply-bce", "apply", 3, 25, "A pixel's target is $1$ and the decoder outputs $0.5$. What is its binary cross-entropy loss? Give $4$ decimal places."), 0.6931),
  num(m(AE, "apply-symmetric-params", "apply", 3, 25, "An MLP autoencoder $784 \\to 128 \\to 32 \\to 128 \\to 784$ (with biases) has how many parameters?"), 209968),
  num(m(AE, "apply-mae-masked", "apply", 3, 25, "A masked autoencoder hides $75\\%$ of an image's $196$ patches. How many are masked?"), 147),
  num(m(AE, "apply-threshold", "apply", 4, 30, "Reconstruction errors on normal data have mean $0.02$ and standard deviation $0.005$. What is the threshold at mean $+ \\, 3$ standard deviations?"), 0.035),
  num(m(AE, "apply-pca-variance", "apply", 4, 30, "A linear autoencoder with a $2$-unit bottleneck spans the top PCA subspace. With covariance eigenvalues $5$, $3$, $1$ and $1$, what fraction of variance does it keep?"), 0.8),
  mcq(m(AE, "apply-tied", "apply", 5, 40, "An autoencoder with tied weights:"),
    "Uses the transpose of the encoder's weight matrix as the decoder's weights",
    [
      ["Freezes the encoder", "tied-frozen", "Both are trained, sharing weights."],
      ["Has no decoder", "tied-no-decoder", "The decoder reuses the encoder's weights."],
      ["Uses the same input twice", "tied-input", "It's about weight sharing."],
    ]),
  short(m(AE, "explain-latent-holes", "explain", 7, 120, "Why does decoding random points in a plain autoencoder's latent space often give garbage?"),
    [
      ["unstructured", "Nothing forces the codes to fill the space smoothly, so training codes occupy scattered regions with gaps", 2, true],
      ["consequence", "Points in the gaps were never decoded in training, so outputs there are meaningless; VAEs regularise the latent space to fix this", 2, true],
    ]),
  num(m(AE, "transfer-sparsity-kl", "transfer", 8, 60, "A sparse autoencoder's penalty for one unit is $\\text{KL}(\\rho \\| \\hat{\\rho}) = \\rho\\ln\\frac{\\rho}{\\hat{\\rho}} + (1 - \\rho)\\ln\\frac{1 - \\rho}{1 - \\hat{\\rho}}$. What is it for target $\\rho = 0.05$ and average activation $\\hat{\\rho} = 0.1$? Give $4$ decimal places."), 0.0167),
  mcq(m(AE, "transfer-vqvae", "transfer", 9, 75, "A VQ-VAE differs from a standard autoencoder by:"),
    "Snapping each latent vector to the nearest entry of a learned discrete codebook",
    [
      ["Having no decoder", "vqvae-no-decoder", "It decodes the quantised codes."],
      ["Using labels", "vqvae-labels", "It's unsupervised."],
      ["Using a continuous Gaussian latent", "vqvae-gaussian", "Its latents are discrete."],
    ]),
  short(m(AE, "transfer-anomaly-pitfall", "transfer", 9, 150, "An autoencoder for anomaly detection reconstructs the anomalies almost as well as normal data. Why might this happen, and what helps?"),
    [
      ["why", "With too much capacity (or a weak bottleneck) it learns a near-identity map that generalises to anything", 2, true],
      ["help", "Tighten the bottleneck, add regularisation or denoising, or use a memory/prototype-based autoencoder", 2, true],
    ]),
  num(m(AE, "transfer-vq-bytes", "transfer", 9, 75, "A VQ-VAE encodes an image as a $32 \\times 32$ grid of codes from a $512$-entry codebook ($9$ bits each). How many bytes is that?"), 1152),
  short(m(AE, "transfer-mae-vs-contrastive", "transfer", 10, 180, "Contrast masked-autoencoder pretraining with contrastive pretraining for images."),
    [
      ["mae", "MAE reconstructs masked patches, needing no augmentations or negatives, and learns features that fine-tune well", 2, true],
      ["contrastive", "Contrastive learning pulls augmented views together and apart from others, giving features that work well frozen (linear probing) but relying on augmentation design", 2, true],
    ]),
  mcq(m(AE, "transfer-sae-interpretability", "transfer", 10, 90, "Why are sparse autoencoders trained on a language model's internal activations?"),
    "To decompose activations into many sparsely active features that are often more interpretable than individual neurons",
    [
      ["To compress the model for deployment", "sae-compress", "Their purpose is interpretability."],
      ["To generate new text", "sae-generate", "They reconstruct activations."],
      ["To replace attention", "sae-replace", "They analyse the model."],
    ]),
  num(m(AE, "transfer-sae-features", "transfer", 10, 90, "A sparse autoencoder expands a $4{,}096$-dimensional activation by a factor of $16$. How many features does its dictionary have?"), 65536),
];

export const dlSixty02Items: Item[] = [
  ...stridePadding,
  ...pooling,
  ...design,
  ...rnns,
  ...attention,
  ...transformers,
  ...embeddings,
  ...autoencoders,
];
