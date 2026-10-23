import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./dl-sixty-shared";

/**
 * Initialisation, layer norm, learning-rate schedules, augmentation, mixed
 * precision, distributed training, transfer learning and self-supervised
 * learning, each brought from 40 to 60 questions. These pools were thin at
 * levels 3–4 and 8–10.
 */

// ---------------------------------------------------------------------------
// weight-initialization
// ---------------------------------------------------------------------------
const WI = "weight-initialization";
const init: Item[] = [
  mcq(m(WI, "recall-symmetry", "recall", 1, 15, "Why are weights initialised randomly rather than all to the same value?"),
    "Random values break the symmetry between units so they can learn different features",
    [
      ["Random values make training deterministic", "symmetry-deterministic", "Randomness is the point."],
      ["Equal values cause syntax errors", "symmetry-syntax", "It's a learning problem."],
      ["Random values remove the need for training", "symmetry-no-training", "Training is still needed."],
    ]),
  mcq(m(WI, "recall-he", "recall", 1, 15, "He (Kaiming) initialisation is designed for layers followed by:"),
    "ReLU activations",
    [
      ["Sigmoid activations", "he-sigmoid", "Xavier suits symmetric saturating activations."],
      ["No activation at all", "he-none", "It's tuned for ReLU's halving of variance."],
      ["Softmax outputs", "he-softmax", "It targets hidden ReLU layers."],
    ]),
  mcq(m(WI, "recall-xavier", "recall", 1, 15, "Xavier (Glorot) initialisation was designed with which activation in mind?"),
    "Tanh (and other activations that are roughly linear near $0$)",
    [
      ["ReLU", "xavier-relu", "That's He initialisation."],
      ["Step functions", "xavier-step", "Those aren't trained by gradients."],
      ["Softmax", "xavier-softmax", "It targets hidden layers."],
    ]),
  num(m(WI, "apply-xavier-var", "apply", 2, 20, "With $\\text{Var}(w) = \\frac{1}{n_{\\text{in}}}$ and $n_{\\text{in}} = 400$, what is the weight variance?"), 0.0025),
  num(m(WI, "apply-he-std", "apply", 2, 20, "He initialisation uses standard deviation $\\sqrt{\\frac{2}{n_{\\text{in}}}}$. What is it for $n_{\\text{in}} = 200$?"), 0.1),
  num(m(WI, "apply-initial-loss", "apply", 2, 20, "A $10$-class classifier starts out predicting uniform probabilities. What is its initial cross-entropy? Give $4$ decimal places."), 2.3026),
  num(m(WI, "apply-output-variance", "apply", 3, 25, "A linear unit sums $100$ inputs of variance $1$ with independent weights of variance $0.02$. What is the output variance?"), 2),
  num(m(WI, "apply-xavier-uniform", "apply", 3, 25, "Xavier uniform samples from $\\pm\\sqrt{\\frac{6}{n_{\\text{in}} + n_{\\text{out}}}}$. What is the limit for $n_{\\text{in}} = n_{\\text{out}} = 300$?"), 0.1),
  num(m(WI, "apply-glorot-var", "apply", 3, 25, "Glorot's averaged variance is $\\frac{2}{n_{\\text{in}} + n_{\\text{out}}}$. What is it for $n_{\\text{in}} = 100$ and $n_{\\text{out}} = 300$?"), 0.005),
  num(m(WI, "apply-explode", "apply", 4, 30, "Each of $10$ layers doubles the activation variance. By what factor has it grown at the output?"), 1024),
  num(m(WI, "apply-relu-halves", "apply", 4, 30, "A pre-activation $z$ has mean $0$ and variance $4$. What is $\\mathbb{E}[\\operatorname{ReLU}(z)^{2}]$?"), 2),
  num(m(WI, "apply-initial-loss-50", "apply", 4, 30, "What initial cross-entropy should a $50$-class classifier with uniform predictions show? Give $4$ decimal places."), 3.912),
  mcq(m(WI, "apply-bias-prior", "apply", 5, 40, "A binary classifier's positive class is $1\\%$ of the data. A good initial bias for the output logit is:"),
    "$\\ln\\frac{0.01}{0.99}$, so initial predictions match the base rate",
    [
      ["$0$", "bias-prior-zero", "That predicts $50\\%$, giving a large initial loss."],
      ["$1$", "bias-prior-one", "That predicts about $73\\%$."],
      ["$0.01$", "bias-prior-rate", "The bias is on the logit scale."],
    ]),
  num(m(WI, "transfer-bias-value", "transfer", 8, 60, "What is that initial bias, $\\ln\\frac{0.01}{0.99}$? Give $4$ decimal places."), -4.5951),
  short(m(WI, "transfer-mup", "transfer", 8, 120, "What problem does the maximal update parametrisation ($\\mu$P) solve for scaling models?"),
    [
      ["problem", "Under standard parametrisation, the best learning rate and initialisation shift as width grows, so tuning must be redone at each size", 2, true],
      ["solution", "$\\mu$P scales initialisations and per-layer learning rates with width so optimal hyperparameters transfer from small to large models", 2, true],
    ]),
  short(m(WI, "transfer-normalisation", "transfer", 9, 150, "Why did batch/layer normalisation and residual connections make initialisation less critical?"),
    [
      ["normalisation", "Normalisation rescales activations at every layer, so poorly scaled weights don't compound through depth", 2, true],
      ["residual", "Residual paths keep an identity route for signals and gradients, so blocks needn't be perfectly scaled", 2, true],
    ]),
  num(m(WI, "transfer-gpt2-scale", "transfer", 9, 75, "GPT-2 scales residual-branch output weights by $\\frac{1}{\\sqrt{2N}}$ for $N$ layers. What is that for $N = 48$? Give $4$ decimal places."), 0.1021),
  short(m(WI, "transfer-dead-relu", "transfer", 10, 180, "How can initialisation cause many “dead” ReLU units from the start, and how is it avoided?"),
    [
      ["cause", "Large negative biases or badly scaled weights push pre-activations negative for nearly all inputs, giving zero output and zero gradient", 2, true],
      ["avoid", "Use zero (or small positive) biases, properly scaled He initialisation, normalisation, or leaky variants", 2, true],
    ]),
  mcq(m(WI, "transfer-fixup", "transfer", 10, 90, "Fixup initialisation showed that very deep residual networks can train:"),
    "Without normalisation layers, by rescaling residual-branch weights and zero-initialising their last layers",
    [
      ["Without any training", "fixup-no-training", "They still train."],
      ["Only with batch norm", "fixup-batchnorm", "Fixup removes the need for it."],
      ["Only at shallow depth", "fixup-shallow", "It enables very deep networks."],
    ]),
  num(m(WI, "transfer-lsuv", "transfer", 10, 90, "LSUV measures a layer's output variance on a batch as $4$ and rescales the weights to make it $1$. By what factor are the weights multiplied?"), 0.5),
];

// ---------------------------------------------------------------------------
// layer-normalization
// ---------------------------------------------------------------------------
const LN = "layer-normalization";
const layerNorm: Item[] = [
  mcq(m(LN, "recall-axis", "recall", 1, 15, "Layer normalisation computes its mean and variance:"),
    "Across the features of each example separately",
    [
      ["Across the batch for each feature", "axis-batch", "That's batch normalisation."],
      ["Across the whole dataset", "axis-dataset", "It's per example."],
      ["Across time steps only", "axis-time", "It's across features."],
    ]),
  mcq(m(LN, "recall-transformers", "recall", 1, 15, "Which architecture family uses layer normalisation by default?"),
    "Transformers",
    [
      ["Classic ImageNet CNNs", "transformers-cnn", "Those typically use batch norm."],
      ["Decision trees", "transformers-trees", "They don't normalise activations."],
      ["k-NN", "transformers-knn", "It has no layers."],
    ]),
  mcq(m(LN, "recall-inference", "recall", 1, 15, "How does layer normalisation behave at inference compared with training?"),
    "Exactly the same — it keeps no running statistics",
    [
      ["It switches to running averages", "inference-running", "That's batch norm."],
      ["It's turned off", "inference-off", "It always runs."],
      ["It uses the test batch's statistics", "inference-batch", "It never uses batch statistics."],
    ]),
  num(m(LN, "apply-mean", "apply", 2, 20, "A token's activations are $(2, 4, 6, 8)$. What mean does layer norm subtract?"), 5),
  num(m(LN, "apply-variance", "apply", 2, 20, "Same activations. What is their (population) variance?"), 5),
  num(m(LN, "apply-params", "apply", 2, 20, "How many learnable parameters does layer norm over $1{,}024$ features have (scale and shift)?"), 2048),
  num(m(LN, "apply-normalise", "apply", 3, 25, "In $(2, 4, 6, 8)$, what does $8$ become after normalising (ignore $\\epsilon$)? Give $4$ decimal places."), 1.3416),
  num(m(LN, "apply-rms", "apply", 3, 25, "What is the root mean square $\\sqrt{\\operatorname{mean}(x^{2})}$ of $(3, 4)$? Give $4$ decimal places."), 3.5355),
  num(m(LN, "apply-rmsnorm-params", "apply", 3, 25, "RMSNorm keeps only a scale per feature. How many parameters for $4{,}096$ features?"), 4096),
  num(m(LN, "apply-rmsnorm", "apply", 4, 30, "RMSNorm divides by the RMS. What does $3$ in $(3, 4)$ become (scale $1$)? Give $4$ decimal places."), 0.8485),
  num(m(LN, "apply-affine", "apply", 4, 30, "After normalisation $\\hat{x} = -1$. With $\\gamma = 2$ and $\\beta = 1$, what is the output?"), -1),
  num(m(LN, "apply-constant", "apply", 4, 30, "A token's activations are all $5$. What does each become after layer norm (with $\\epsilon > 0$ and $\\beta = 0$)?"), 0),
  mcq(m(LN, "apply-batch-independent", "apply", 5, 40, "Why is layer norm convenient for variable-length sequences and batch size $1$?"),
    "Its statistics come from each example alone, so they don't depend on other examples or on padding",
    [
      ["It needs large batches", "batch-independent-large", "It works at any batch size."],
      ["It ignores the features", "batch-independent-ignores", "It normalises over features."],
      ["It only runs at inference", "batch-independent-inference", "It runs in training too."],
    ]),
  num(m(LN, "transfer-residual-growth", "transfer", 8, 60, "In a pre-LN transformer, $63$ blocks each add an independent update of variance $1$ to a residual stream that starts at variance $1$. What is the stream's final standard deviation?"), 8),
  short(m(LN, "transfer-qk-norm", "transfer", 8, 120, "What does QK-normalisation do, and what instability does it prevent?"),
    [
      ["what", "It applies layer norm (or RMSNorm) to queries and keys before their dot product", 2, true],
      ["prevents", "Without it, attention logits can grow huge, saturating the softmax into near one-hot weights and causing loss spikes or divergence", 2, true],
    ]),
  short(m(LN, "transfer-invariance", "transfer", 9, 150, "Layer norm makes a block's output unchanged if its input vector is scaled by any positive constant. What follows for training?"),
    [
      ["invariance", "The weights feeding the layer are effectively scale-invariant, so their norm doesn't change the function", 2, true],
      ["consequence", "Weight norm then acts like an effective learning-rate control (with weight decay), and the gradient is orthogonal to the weights", 2, true],
    ]),
  num(m(LN, "transfer-sphere", "transfer", 9, 75, "Before $\\gamma$ and $\\beta$, a layer-normalised vector has mean $0$ and variance $1$ across $d = 256$ features. What is its Euclidean norm?"), 16),
  short(m(LN, "transfer-outliers", "transfer", 10, 180, "Large language models develop a few “massive activation” features. How does that interact with layer norm, and why does it matter for quantisation?"),
    [
      ["interact", "A huge feature dominates the variance, so normalisation shrinks every other feature in that token; models use this as a learned mechanism (e.g. attention sinks)", 2, true],
      ["quantisation", "The outliers stretch the value range, so low-bit quantisation loses precision unless outliers are handled separately", 2, true],
    ]),
  mcq(m(LN, "transfer-final-ln", "transfer", 10, 90, "Why do pre-LN transformers add one more layer norm after the last block?"),
    "Because pre-LN leaves the residual stream unnormalised, and the output head needs a well-scaled input",
    [
      ["To double the model size", "final-ln-size", "It adds very few parameters."],
      ["Because post-LN requires it", "final-ln-post", "It's a pre-LN need."],
      ["To replace the softmax", "final-ln-softmax", "The softmax remains."],
    ]),
  short(m(LN, "transfer-rnn", "transfer", 10, 180, "Why does layer normalisation suit recurrent networks better than batch normalisation?"),
    [
      ["per-step", "It normalises each time step's hidden state using that example's own features, needing no per-time-step batch statistics", 2, true],
      ["lengths", "Batch norm would need separate statistics per step and struggles with variable lengths and small batches", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// learning-rate-schedules
// ---------------------------------------------------------------------------
const LR = "learning-rate-schedules";
const schedules: Item[] = [
  mcq(m(LR, "recall-warmup", "recall", 1, 15, "During warmup, the learning rate:"),
    "Rises from a small value up to its peak",
    [
      ["Falls to zero", "warmup-falls", "That's decay."],
      ["Stays constant", "warmup-constant", "It increases."],
      ["Oscillates randomly", "warmup-random", "It ramps up smoothly."],
    ]),
  mcq(m(LR, "recall-decay", "recall", 1, 15, "Learning-rate decay lowers the rate later in training mainly so that:"),
    "Updates become smaller and the model can settle into a good minimum",
    [
      ["Training speeds up", "decay-faster", "Steps get smaller."],
      ["The model forgets earlier data", "decay-forget", "It's about convergence."],
      ["More data can be loaded", "decay-data", "Unrelated."],
    ]),
  mcq(m(LR, "recall-step", "recall", 1, 15, "A step schedule:"),
    "Cuts the learning rate by a fixed factor at chosen milestones",
    [
      ["Changes it every step smoothly", "step-smooth", "That's cosine or exponential decay."],
      ["Increases it at milestones", "step-increases", "It decreases."],
      ["Keeps it constant", "step-constant", "It drops at milestones."],
    ]),
  num(m(LR, "apply-warmup", "apply", 2, 20, "Linear warmup goes from $0$ to $0.002$ over $1{,}000$ steps. What is the rate at step $250$?"), 0.0005),
  num(m(LR, "apply-step-decay", "apply", 2, 20, "Starting at $0.1$, the rate halves every $10$ epochs. What is it during epoch $25$?"), 0.025),
  num(m(LR, "apply-cosine-end", "apply", 2, 20, "A cosine schedule $\\eta_t = \\frac{1}{2}\\eta_{\\max}\\left(1 + \\cos\\frac{\\pi t}{T}\\right)$. What is $\\eta$ at $t = T$?"), 0),
  num(m(LR, "apply-cosine-mid", "apply", 3, 25, "Same schedule with $\\eta_{\\max} = 0.004$. What is $\\eta$ at $t = \\frac{T}{2}$?"), 0.002),
  num(m(LR, "apply-cosine-quarter", "apply", 3, 25, "Same schedule with $\\eta_{\\max} = 1$. What is $\\eta$ at $t = \\frac{T}{4}$? Give $4$ decimal places."), 0.8536),
  num(m(LR, "apply-exponential", "apply", 3, 25, "Exponential decay $\\eta_t = 0.1 \\times 0.95^{t}$. What is $\\eta_{10}$? Give $4$ decimal places."), 0.0599),
  num(m(LR, "apply-inverse-sqrt", "apply", 4, 30, "An inverse-square-root schedule after warmup is $\\eta_t = \\eta_0\\sqrt{\\frac{w}{t}}$. With $\\eta_0 = 10^{-3}$, $w = 4{,}000$ and $t = 16{,}000$, what is $\\eta_t$?"), 0.0005),
  num(m(LR, "apply-linear-decay", "apply", 4, 30, "A linear decay goes from $0.01$ to $0$ over $1{,}000$ steps. What is the rate at step $750$?"), 0.0025),
  num(m(LR, "apply-cosine-floor", "apply", 4, 30, "Cosine decay with a floor: $\\eta = \\eta_{\\min} + \\frac{1}{2}(\\eta_{\\max} - \\eta_{\\min})(1 + \\cos\\pi p)$, with $\\eta_{\\max} = 10^{-3}$ and $\\eta_{\\min} = 10^{-4}$. What is $\\eta$ at $p = 0.5$?"), 0.00055),
  mcq(m(LR, "apply-wsd", "apply", 5, 40, "What practical advantage does a warmup–stable–decay schedule have over cosine?"),
    "The long constant phase can be continued or branched into short decays at any point, so the total length needn't be fixed in advance",
    [
      ["It needs no warmup", "wsd-no-warmup", "It includes warmup."],
      ["It never decays", "wsd-no-decay", "It ends with a decay."],
      ["It uses a higher final rate", "wsd-higher", "It decays to a low rate."],
    ]),
  short(m(LR, "transfer-decay-drop", "transfer", 8, 120, "Why does the training loss often drop sharply as soon as the learning rate decays?"),
    [
      ["noise", "At a high rate, SGD noise keeps the iterate bouncing around a valley at a loss above its floor", 2, true],
      ["settle", "Lowering the rate reduces that noise, so the iterate settles toward the valley bottom and the loss falls quickly", 2, true],
    ]),
  num(m(LR, "transfer-mean-lr", "transfer", 8, 60, "A linear decay from $0.006$ to $0$ is used for a whole run. What is the average learning rate over the run?"), 0.003),
  short(m(LR, "transfer-range-test", "transfer", 9, 150, "How does a learning-rate range test pick a peak learning rate?"),
    [
      ["sweep", "Train briefly while increasing the rate exponentially each step, recording the loss", 2, true],
      ["pick", "Choose a rate somewhat below where the loss falls fastest, well before it starts to diverge", 2, true],
    ]),
  num(m(LR, "transfer-warmup-steps", "transfer", 9, 75, "A run of $50{,}000$ steps uses warmup for the first $2\\%$. How many warmup steps?"), 1000),
  short(m(LR, "transfer-averaging", "transfer", 10, 180, "How can averaging weights over training substitute for a decay schedule?"),
    [
      ["average", "Averaging iterates (e.g. an exponential moving average or tail average) cancels much of the SGD noise around the minimum", 2, true],
      ["substitute", "So a constant-rate run plus averaging can match a decayed run, and schedule-free methods build this in without fixing the run length", 2, true],
    ]),
  mcq(m(LR, "transfer-cyclical", "transfer", 10, 90, "Cyclical learning rates repeatedly raise and lower the rate. One intended benefit is:"),
    "Periodic high rates help escape poor regions or saddle points, while low rates allow refinement",
    [
      ["They remove the need to choose any rate", "cyclical-no-choice", "Bounds must still be chosen."],
      ["They guarantee the global minimum", "cyclical-global", "No schedule guarantees that."],
      ["They make every step identical", "cyclical-identical", "Steps vary by design."],
    ]),
  num(m(LR, "transfer-batch-scaling", "transfer", 10, 90, "Under the square-root scaling rule (often used with Adam), multiplying the batch size by $4$ multiplies the learning rate by what?"), 2),
];

// ---------------------------------------------------------------------------
// data-augmentation
// ---------------------------------------------------------------------------
const DA = "data-augmentation";
const augmentation: Item[] = [
  mcq(m(DA, "recall-flip", "recall", 1, 15, "Which is a standard augmentation for natural photos?"),
    "Random horizontal flipping",
    [
      ["Shuffling the labels", "flip-labels", "That corrupts supervision."],
      ["Deleting half the dataset", "flip-delete", "That removes data."],
      ["Sorting pixels by brightness", "flip-sort", "That destroys structure."],
    ]),
  mcq(m(DA, "recall-training-only", "recall", 1, 15, "Random augmentations are normally applied:"),
    "To training data only",
    [
      ["To test data only", "training-only-test", "Test data should reflect real inputs."],
      ["To labels only", "training-only-labels", "They transform inputs."],
      ["Never during training", "training-only-never", "That's when they're used."],
    ]),
  mcq(m(DA, "recall-diversity", "recall", 1, 15, "Data augmentation helps mainly by:"),
    "Showing the model label-preserving variations, which reduces overfitting",
    [
      ["Adding new labels", "diversity-labels", "Labels are kept."],
      ["Speeding up inference", "diversity-speed", "It's a training technique."],
      ["Making the model smaller", "diversity-smaller", "Model size is unchanged."],
    ]),
  num(m(DA, "apply-crops", "apply", 2, 20, "Random $32 \\times 32$ crops from a $40 \\times 40$ image at integer offsets: how many distinct crops?"), 81),
  num(m(DA, "apply-flip-views", "apply", 2, 20, "Horizontal flipping turns each image into how many possible versions (including the original)?"), 2),
  num(m(DA, "apply-mixup-label", "apply", 2, 20, "Mixup with $\\lambda = 0.3$ combines image A (class A) with image B. What weight does the mixed label put on class A?"), 0.3),
  num(m(DA, "apply-mixup-pixel", "apply", 3, 25, "Mixup with $\\lambda = 0.7$: a pixel is $200$ in A and $100$ in B. What is the mixed value?"), 170),
  num(m(DA, "apply-cutmix", "apply", 3, 25, "CutMix pastes a $16 \\times 16$ patch from B into a $32 \\times 32$ image A. What label weight goes to B?"), 0.25),
  num(m(DA, "apply-dihedral", "apply", 3, 25, "Combining the $4$ right-angle rotations with an optional flip gives how many distinct transformations?"), 8),
  num(m(DA, "apply-tta-cost", "apply", 4, 30, "Test-time augmentation averages $10$ crops per image. By what factor does inference compute grow?"), 10),
  num(m(DA, "apply-randaugment", "apply", 4, 30, "RandAugment applies $N = 2$ operations chosen (with replacement, order mattering) from $14$. How many ordered pairs are possible?"), 196),
  num(m(DA, "apply-beta-mean", "apply", 4, 30, "Mixup draws $\\lambda \\sim \\text{Beta}(1, 1)$. What is the mean of $\\lambda$?"), 0.5),
  mcq(m(DA, "apply-label-preserving", "apply", 5, 40, "What must hold for an augmentation to be safe?"),
    "It mustn't change the correct label (e.g. no vertical flips for “6” versus “9”)",
    [
      ["It must make images larger", "preserving-larger", "Size isn't the criterion."],
      ["It must be applied at test time", "preserving-test", "It's for training."],
      ["It must be invertible", "preserving-invertible", "Cropping isn't invertible but is safe."],
    ]),
  num(m(DA, "transfer-specaugment", "transfer", 8, 60, "SpecAugment masks up to $20$ consecutive frames in a $400$-frame spectrogram. What is the largest masked fraction?"), 0.05),
  short(m(DA, "transfer-segmentation", "transfer", 8, 120, "What changes when augmenting data for semantic segmentation rather than classification?"),
    [
      ["geometry", "Geometric transforms (crops, flips, rotations, scaling) must be applied identically to the image and its mask", 2, true],
      ["photometric", "Colour changes apply to the image only; interpolation of masks must use nearest-neighbour to keep labels valid", 2, true],
    ]),
  short(m(DA, "transfer-contrastive", "transfer", 9, 150, "In contrastive self-supervised learning, why do augmentations define what the representation learns?"),
    [
      ["invariance", "The objective pulls two augmented views together, so the representation becomes invariant to whatever the augmentations change", 2, true],
      ["choice", "Too weak gives trivial solutions; too strong discards useful information (e.g. colour for flower species)", 2, true],
    ]),
  num(m(DA, "transfer-erasing", "transfer", 9, 75, "Random erasing removes a $20 \\times 10$ region from a $50 \\times 40$ image. What fraction of the image is erased?"), 0.1),
  short(m(DA, "transfer-domain-randomisation", "transfer", 10, 180, "How is domain randomisation used to train models in simulation that work in the real world?"),
    [
      ["randomise", "Randomise textures, lighting, colours, camera poses and physics parameters heavily in simulation", 2, true],
      ["transfer", "The real world then looks like just another variation, so the model has learned features robust to the sim-to-real gap", 2, true],
    ]),
  mcq(m(DA, "transfer-augmix", "transfer", 10, 90, "AugMix improves robustness by:"),
    "Mixing several randomly augmented chains of an image and adding a consistency loss across them",
    [
      ["Using only one fixed augmentation", "augmix-fixed", "It mixes diverse chains."],
      ["Removing all augmentation", "augmix-none", "It relies on augmentation."],
      ["Mixing labels from different classes", "augmix-labels", "That's mixup; AugMix keeps the label."],
    ]),
  short(m(DA, "transfer-class-bias", "transfer", 10, 180, "How can augmentation accidentally introduce a spurious cue that the model learns?"),
    [
      ["cue", "If augmentation differs by class (e.g. only minority-class images are rotated or blurred), the transformation itself predicts the label", 2, true],
      ["fix", "Apply the same augmentation distribution to all classes, and check that augmented artefacts can't reveal the label", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// mixed-precision-training
// ---------------------------------------------------------------------------
const MX = "mixed-precision-training";
const mixed: Item[] = [
  mcq(m(MX, "recall-fp32", "recall", 1, 15, "How many bits does single precision (fp32) use?"),
    "$32$",
    [
      ["$16$", "fp32-16", "That's half precision."],
      ["$64$", "fp32-64", "That's double precision."],
      ["$8$", "fp32-8", "That's fp8."],
    ]),
  mcq(m(MX, "recall-bf16-range", "recall", 1, 15, "bf16 has the same number of exponent bits as:"),
    "fp32",
    [
      ["fp16", "bf16-range-fp16", "fp16 has fewer exponent bits."],
      ["int8", "bf16-range-int8", "Integers have no exponent."],
      ["fp64", "bf16-range-fp64", "fp64 has more."],
    ]),
  mcq(m(MX, "recall-tensor-cores", "recall", 1, 15, "Mixed precision speeds training on modern GPUs mainly because:"),
    "Specialised units (tensor cores) run low-precision matrix multiplications much faster",
    [
      ["Lower precision needs fewer layers", "tensor-cores-layers", "The architecture is unchanged."],
      ["It skips the backward pass", "tensor-cores-backward", "Backprop still runs."],
      ["It uses less data", "tensor-cores-data", "The data are unchanged."],
    ]),
  num(m(MX, "apply-fp16-bytes", "apply", 2, 20, "How many bytes does one fp16 number take?"), 2),
  num(m(MX, "apply-bf16-memory", "apply", 2, 20, "How many gigabytes ($10^{9}$ bytes) do $10^{9}$ parameters take in bf16?"), 2),
  num(m(MX, "apply-fp32-memory", "apply", 2, 20, "And in fp32?"), 4),
  num(m(MX, "apply-loss-scale", "apply", 3, 25, "A common loss scale is $2^{16}$. What is that?"), 65536),
  num(m(MX, "apply-scaled-gradient", "apply", 3, 25, "A gradient of $10^{-8}$ is multiplied by $65{,}536$. What is the result, in units of $10^{-4}$? Give $4$ decimal places."), 6.5536),
  num(m(MX, "apply-mantissa", "apply", 3, 25, "fp16 has $10$ explicit mantissa bits. How many distinct mantissa patterns is that?"), 1024),
  num(m(MX, "apply-adam-bytes", "apply", 4, 30, "Mixed-precision Adam stores fp16 weights ($2$ bytes), fp16 gradients ($2$), an fp32 master copy ($4$) and two fp32 moments ($8$). How many bytes per parameter?"), 16),
  num(m(MX, "apply-adam-total", "apply", 4, 30, "At that rate, how many gigabytes ($10^{9}$ bytes) for a $10^{9}$-parameter model, before activations?"), 16),
  num(m(MX, "apply-dynamic-scale", "apply", 4, 30, "A dynamic loss scaler starts at $65{,}536$ and halves after each overflow. What is it after $3$ overflows?"), 8192),
  mcq(m(MX, "apply-fp32-ops", "apply", 5, 40, "Which operation is usually kept in fp32 under automatic mixed precision?"),
    "Softmax and normalisation statistics (and large reductions)",
    [
      ["Every matrix multiplication", "fp32-ops-matmul", "Matmuls are what run in low precision."],
      ["Convolutions", "fp32-ops-conv", "These run in low precision."],
      ["Nothing", "fp32-ops-nothing", "Sensitive ops stay in fp32."],
    ]),
  num(m(MX, "transfer-bf16-mantissa", "transfer", 8, 60, "bf16 has $7$ explicit mantissa bits. How many distinct mantissa patterns is that?"), 128),
  short(m(MX, "transfer-fp8", "transfer", 8, 120, "fp8 comes in E4M3 and E5M2 variants. How are they typically used in training?"),
    [
      ["formats", "E4M3 has more precision and less range; E5M2 has more range and less precision", 2, true],
      ["use", "E4M3 is used for weights and activations in the forward pass, E5M2 for gradients, with per-tensor scaling factors", 2, true],
    ]),
  short(m(MX, "transfer-stochastic-rounding", "transfer", 9, 150, "Why can stochastic rounding help when training with low-precision weights?"),
    [
      ["problem", "With round-to-nearest, updates smaller than half a unit in the last place are always lost, so small steps never accumulate", 2, true],
      ["fix", "Stochastic rounding rounds up with probability proportional to the remainder, so updates are preserved in expectation", 2, true],
    ]),
  num(m(MX, "transfer-activations", "transfer", 9, 75, "Activations take $40$ GB in fp32. How many gigabytes in bf16?"), 20),
  short(m(MX, "transfer-fp32-accumulate", "transfer", 10, 180, "Why do mixed-precision matrix multiplications accumulate their sums in fp32?"),
    [
      ["error", "Summing thousands of products in fp16 loses small terms as the running sum grows (swamping), causing large errors", 2, true],
      ["fix", "Accumulating in fp32 keeps the sum accurate while inputs stay low-precision; hardware supports this at little cost", 2, true],
    ]),
  mcq(m(MX, "transfer-bf16-no-scaling", "transfer", 10, 90, "Why does bf16 training usually need no loss scaling?"),
    "Its exponent range matches fp32, so small gradients don't underflow",
    [
      ["It has more mantissa bits than fp16", "bf16-mantissa", "It has fewer."],
      ["Its gradients are always large", "bf16-large", "Range, not gradient size, is the reason."],
      ["It runs everything in fp32", "bf16-fp32", "It computes in bf16."],
    ]),
  num(m(MX, "transfer-epsilon", "transfer", 10, 90, "In fp16, the gap between $1$ and the next representable number is $2^{-10}$. What is it? Give $7$ decimal places."), 0.0009766),
];

// ---------------------------------------------------------------------------
// distributed-training
// ---------------------------------------------------------------------------
const DT = "distributed-training";
const distributed: Item[] = [
  mcq(m(DT, "recall-data", "recall", 1, 15, "In data parallelism, each device holds:"),
    "A full copy of the model and processes a different slice of the batch",
    [
      ["A different layer of the model", "data-layer", "That's pipeline parallelism."],
      ["A slice of each weight matrix", "data-slice", "That's tensor parallelism."],
      ["No model at all", "data-none", "Each holds a replica."],
    ]),
  mcq(m(DT, "recall-pipeline", "recall", 1, 15, "Pipeline parallelism splits a model by:"),
    "Assigning consecutive groups of layers to different devices",
    [
      ["Splitting each matrix multiplication", "pipeline-matmul", "That's tensor parallelism."],
      ["Giving each device different data", "pipeline-data", "That's data parallelism."],
      ["Running different models", "pipeline-models", "It's one model."],
    ]),
  mcq(m(DT, "recall-tensor", "recall", 1, 15, "Tensor parallelism splits:"),
    "Individual weight matrices across devices within a layer",
    [
      ["The dataset across devices", "tensor-dataset", "That's data parallelism."],
      ["Layers into stages", "tensor-stages", "That's pipeline parallelism."],
      ["Training into separate runs", "tensor-runs", "It's within one run."],
    ]),
  num(m(DT, "apply-global-batch", "apply", 2, 20, "$16$ GPUs each process $8$ sequences per micro-step with $4$ accumulation steps. What is the global batch?"), 512),
  num(m(DT, "apply-per-gpu", "apply", 2, 20, "A global batch of $1{,}024$ is split evenly across $32$ GPUs (no accumulation). How many per GPU?"), 32),
  num(m(DT, "apply-steps", "apply", 2, 20, "$1{,}024{,}000$ examples with a global batch of $2{,}048$. How many steps per epoch?"), 500),
  num(m(DT, "apply-bubble", "apply", 3, 25, "The pipeline bubble fraction is $\\frac{p - 1}{m + p - 1}$. What is it for $p = 4$ stages and $m = 12$ microbatches?"), 0.2),
  num(m(DT, "apply-ring", "apply", 3, 25, "Ring all-reduce sends about $\\frac{2(N - 1)}{N}$ times the gradient size per device. What is the factor for $N = 8$?"), 1.75),
  num(m(DT, "apply-zero", "apply", 3, 25, "Fully sharding $16$ GB of weights, gradients and optimiser state across $8$ GPUs leaves how many gigabytes per GPU?"), 2),
  num(m(DT, "apply-traffic", "apply", 4, 30, "Gradients for $10^{9}$ parameters in fp16 take $2$ GB. With the ring factor $1.75$, how many gigabytes does each device send?"), 3.5),
  num(m(DT, "apply-efficiency", "apply", 4, 30, "$8$ GPUs give a $7\\times$ speed-up over one. What is the scaling efficiency?"), 0.875),
  num(m(DT, "apply-tp-share", "apply", 4, 30, "Tensor parallelism splits an MLP's weight matrices across $4$ GPUs. What fraction of them does each GPU hold?"), 0.25),
  mcq(m(DT, "apply-accumulation", "apply", 5, 40, "Gradient accumulation lets you:"),
    "Reach a large effective batch on limited memory by summing gradients over several micro-batches before stepping",
    [
      ["Train without gradients", "accumulation-none", "It accumulates gradients."],
      ["Use less total compute", "accumulation-compute", "Compute is the same; memory is saved."],
      ["Skip the optimiser", "accumulation-optimiser", "The optimiser steps after accumulating."],
    ]),
  num(m(DT, "transfer-allreduce-time", "transfer", 8, 60, "Each device sends $3.5$ GB at $100$ GB/s. How many milliseconds does the all-reduce take?"), 35),
  short(m(DT, "transfer-overlap", "transfer", 8, 120, "How do data-parallel frameworks hide gradient communication time?"),
    [
      ["bucket", "Gradients are grouped into buckets and all-reduced as soon as each bucket's backward computation finishes", 2, true],
      ["overlap", "Communication of later layers' gradients overlaps with backprop through earlier layers, so little time is spent waiting", 2, true],
    ]),
  short(m(DT, "transfer-stragglers", "transfer", 9, 150, "Why do stragglers hurt synchronous data-parallel training so much at scale?"),
    [
      ["wait", "Every step waits for the slowest device, so one slow or faulty GPU slows all of them", 2, true],
      ["scale", "With thousands of devices, some are slow at almost every step; mitigation includes health checks, replacement and asynchronous or backup workers", 2, true],
    ]),
  num(m(DT, "transfer-weak-scaling", "transfer", 9, 75, "$512$ GPUs run at $80\\%$ scaling efficiency. What speed-up over a single GPU is that?"), 409.6),
  short(m(DT, "transfer-checkpointing", "transfer", 10, 180, "How should a large run choose how often to checkpoint?"),
    [
      ["tradeoff", "Frequent checkpoints waste time writing state; rare ones lose more work when a failure occurs", 2, true],
      ["rule", "Balance them, e.g. Young's rule $\\sqrt{2CM}$ for checkpoint cost $C$ and mean time between failures $M$, and use asynchronous or sharded saves to cut $C$", 2, true],
    ]),
  mcq(m(DT, "transfer-fsdp", "transfer", 10, 90, "In FSDP, before a layer's forward pass, each device:"),
    "All-gathers that layer's full parameters from the shards, then frees them after use",
    [
      ["Keeps the full model at all times", "fsdp-full", "That's plain data parallelism."],
      ["Skips the layer", "fsdp-skip", "Every layer runs."],
      ["Uses only its own shard", "fsdp-shard", "It needs the full weights to compute."],
    ]),
  num(m(DT, "transfer-young", "transfer", 10, 90, "Young's rule sets the checkpoint interval to $\\sqrt{2CM}$. With $C = 2$ minutes and $M = 100$ minutes, what interval (in minutes)?"), 20),
];

// ---------------------------------------------------------------------------
// transfer-learning
// ---------------------------------------------------------------------------
const TL = "transfer-learning";
const transfer: Item[] = [
  mcq(m(TL, "recall-imagenet", "recall", 1, 15, "For vision tasks, a very common source of pretrained weights has been:"),
    "Models trained on ImageNet",
    [
      ["Models trained on the target task's test set", "imagenet-test", "That's leakage."],
      ["Randomly initialised models", "imagenet-random", "Those aren't pretrained."],
      ["Decision trees", "imagenet-trees", "Pretrained CNNs/ViTs are standard."],
    ]),
  mcq(m(TL, "recall-feature-extraction", "recall", 1, 15, "In feature extraction, the pretrained backbone is:"),
    "Frozen, and only a new head is trained on its features",
    [
      ["Fully retrained", "extraction-retrained", "That's fine-tuning."],
      ["Discarded", "extraction-discarded", "Its features are the point."],
      ["Trained from scratch", "extraction-scratch", "It's pretrained and frozen."],
    ]),
  mcq(m(TL, "recall-fine-tuning", "recall", 1, 15, "Fine-tuning means:"),
    "Continuing to train some or all pretrained weights on the new task",
    [
      ["Training only on the source task", "fine-tuning-source", "It adapts to the target task."],
      ["Never updating any weights", "fine-tuning-frozen", "That's feature extraction."],
      ["Randomly re-initialising the model", "fine-tuning-reinit", "It starts from pretrained weights."],
    ]),
  num(m(TL, "apply-head", "apply", 2, 20, "A new head maps $512$ features to $5$ classes, with biases. How many parameters?"), 2565),
  num(m(TL, "apply-probe", "apply", 2, 20, "A linear probe maps $768$ features to $3$ classes, with biases. How many parameters?"), 2307),
  num(m(TL, "apply-lower-lr", "apply", 2, 20, "Pretraining used a learning rate of $10^{-3}$, and fine-tuning uses one $10\\times$ smaller. What is it?"), 0.0001),
  num(m(TL, "apply-discriminative", "apply", 3, 25, "Discriminative learning rates halve for each layer group below the head. With $10^{-3}$ at the head, what rate does the third group below get?"), 0.000125),
  num(m(TL, "apply-steps", "apply", 3, 25, "Fine-tuning on $400$ images with batch size $16$ for $30$ epochs takes how many optimiser steps?"), 750),
  num(m(TL, "apply-trainable-percent", "apply", 3, 25, "Of a model's $25$ million parameters, $1$ million are trainable. What percentage is that?"), 4),
  num(m(TL, "apply-normalise", "apply", 3, 25, "ImageNet normalisation uses mean $0.485$ and standard deviation $0.229$ for red. What does a red value of $0.6$ become? Give $4$ decimal places."), 0.5022),
  mcq(m(TL, "apply-lp-ft", "apply", 4, 35, "The LP-FT recipe first trains a linear probe, then fine-tunes everything. Why?"),
    "A good head first means early fine-tuning gradients don't distort the pretrained features as much",
    [
      ["It halves training time", "lp-ft-time", "It may take longer."],
      ["Linear probes need no data", "lp-ft-data", "They need labelled data."],
      ["It freezes the backbone permanently", "lp-ft-freeze", "The second stage unfreezes it."],
    ]),
  num(m(TL, "apply-total-params", "apply", 4, 30, "A frozen backbone has $11{,}176{,}512$ parameters and the new head has $2{,}565$. How many parameters does the full model have?"), 11179077),
  num(m(TL, "apply-ewc", "apply", 4, 30, "An EWC-style penalty is $\\frac{\\lambda}{2}\\sum_i F_i(\\theta_i - \\theta_i^{*})^{2}$. With $\\lambda = 2$, $F = (1, 4)$ and both parameters moved by $0.5$, what is it?"), 1.25),
  mcq(m(TL, "apply-when-freeze", "apply", 5, 40, "You have few labelled examples from a domain similar to the pretraining data. Which is usually best?"),
    "Freeze most of the backbone and train the head (maybe the top layers)",
    [
      ["Train from scratch", "freeze-scratch", "Too little data for that."],
      ["Fine-tune everything with a high learning rate", "freeze-high-lr", "That risks overfitting and forgetting."],
      ["Discard the pretrained head and backbone", "freeze-discard", "The backbone is the asset."],
    ]),
  short(m(TL, "transfer-domain-adaptation", "transfer", 8, 120, "What is unsupervised domain adaptation, and give one way to do it."),
    [
      ["what", "Adapting a model trained on labelled source data to a target domain with only unlabelled data", 2, true],
      ["how", "E.g. align feature distributions (adversarial DANN, MMD), self-training with pseudo-labels, or adapting normalisation statistics", 2, true],
    ]),
  mcq(m(TL, "transfer-gradual", "transfer", 8, 60, "Gradual unfreezing (as in ULMFiT) means:"),
    "Unfreezing layers one group at a time from the top down over the course of fine-tuning",
    [
      ["Freezing more layers each epoch", "gradual-freezing", "It unfreezes progressively."],
      ["Raising the learning rate each epoch", "gradual-lr", "It's about which layers train."],
      ["Training layers in random order", "gradual-random", "It goes top-down."],
    ]),
  short(m(TL, "transfer-l2sp", "transfer", 9, 150, "What does L2-SP regularisation do during fine-tuning, and why?"),
    [
      ["what", "It penalises the squared distance of the weights from their pretrained values (the starting point) rather than from zero", 2, true],
      ["why", "It keeps the model close to the useful pretrained solution, reducing overfitting and forgetting on small datasets", 2, true],
    ]),
  num(m(TL, "transfer-head-share", "transfer", 9, 75, "In that model, what fraction of all parameters belongs to the head? Give $6$ decimal places."), 0.000229),
  short(m(TL, "transfer-foundation", "transfer", 10, 180, "How have large foundation models changed the practice of transfer learning?"),
    [
      ["general", "One broadly pretrained model now serves many tasks, often via prompting or zero-/few-shot use without any fine-tuning", 2, true],
      ["efficient", "When adaptation is needed, parameter-efficient methods (adapters, LoRA) or light fine-tuning replace full retraining", 2, true],
    ]),
  mcq(m(TL, "transfer-scratch", "transfer", 10, 90, "When is training from scratch more sensible than transfer learning?"),
    "When the target data are plentiful and very different from any available pretraining domain (e.g. unusual sensor data)",
    [
      ["Whenever labels are scarce", "scratch-scarce", "Scarce labels favour transfer."],
      ["Always for images", "scratch-images", "Images usually benefit from pretraining."],
      ["Never", "scratch-never", "Sometimes it's the better choice."],
    ]),
];

// ---------------------------------------------------------------------------
// self-supervised-learning
// ---------------------------------------------------------------------------
const SL = "self-supervised-learning";
const ssl: Item[] = [
  mcq(m(SL, "recall-labels", "recall", 1, 15, "In self-supervised learning, training targets come from:"),
    "The data themselves, e.g. hidden parts to predict",
    [
      ["Human annotators", "labels-human", "That's supervised learning."],
      ["A reward signal", "labels-reward", "That's reinforcement learning."],
      ["Random numbers", "labels-random", "Targets are derived from the data."],
    ]),
  mcq(m(SL, "recall-next-token", "recall", 1, 15, "Which is a self-supervised objective?"),
    "Predicting the next word in unlabelled text",
    [
      ["Classifying images with human labels", "next-token-labels", "That's supervised."],
      ["Maximising a game score", "next-token-game", "That's RL."],
      ["Clustering with known labels", "next-token-clustering", "That uses labels."],
    ]),
  mcq(m(SL, "recall-simclr", "recall", 1, 15, "SimCLR is an example of:"),
    "Contrastive self-supervised learning",
    [
      ["Masked language modelling", "simclr-mlm", "That's BERT."],
      ["Reinforcement learning", "simclr-rl", "It's representation learning."],
      ["A GAN", "simclr-gan", "It has no generator."],
    ]),
  num(m(SL, "apply-masked", "apply", 2, 20, "$15\\%$ of a $200$-token sequence is masked. How many tokens?"), 30),
  num(m(SL, "apply-mae-visible", "apply", 2, 20, "MAE masks $75\\%$ of $196$ patches. How many patches does the encoder see?"), 49),
  num(m(SL, "apply-views", "apply", 2, 20, "SimCLR makes two views of each of $256$ images. How many views are in the batch?"), 512),
  num(m(SL, "apply-negatives", "apply", 3, 25, "In SimCLR with $N = 256$ images ($2N$ views), how many negatives does each anchor have?"), 510),
  num(m(SL, "apply-rotation", "apply", 3, 25, "The rotation pretext task predicts which of $0°$, $90°$, $180°$ or $270°$ was applied. How many classes?"), 4),
  num(m(SL, "apply-jigsaw", "apply", 3, 25, "A jigsaw task shuffles a $3 \\times 3$ grid of tiles. How many possible orderings are there?"), 362880),
  num(m(SL, "apply-infonce", "apply", 4, 30, "InfoNCE with the positive's logit $2$ and three negatives at logit $0$: what is $-\\ln\\frac{e^{2}}{e^{2} + 3}$? Give $4$ decimal places."), 0.3408),
  num(m(SL, "apply-bert-mask", "apply", 4, 30, "BERT replaces $80\\%$ of selected tokens with [MASK]. Of $30$ selected tokens, how many become [MASK]?"), 24),
  num(m(SL, "apply-ema", "apply", 4, 30, "A momentum encoder updates $\\theta_{\\text{target}} \\leftarrow 0.99\\theta_{\\text{target}} + 0.01\\theta_{\\text{online}}$. With $\\theta_{\\text{target}} = 1$ and $\\theta_{\\text{online}} = 2$, what is the new value?"), 1.01),
  mcq(m(SL, "apply-evaluation", "apply", 5, 40, "A linear probe evaluates a self-supervised representation by:"),
    "Training only a linear classifier on frozen features and measuring its accuracy",
    [
      ["Fine-tuning the whole network", "evaluation-finetune", "That's fine-tuning evaluation."],
      ["Measuring the pretext loss", "evaluation-pretext", "That doesn't reflect downstream use."],
      ["Counting parameters", "evaluation-params", "Size isn't quality."],
    ]),
  num(m(SL, "transfer-vicreg", "transfer", 8, 60, "VICReg's variance term is $\\max(0, 1 - \\text{std})$ per dimension. What is it for a dimension with standard deviation $0.5$?"), 0.5),
  short(m(SL, "transfer-jepa", "transfer", 8, 120, "How do joint-embedding predictive architectures (JEPA) differ from masked autoencoders?"),
    [
      ["target", "JEPA predicts the representation (embedding) of masked regions, not their raw pixels", 2, true],
      ["benefit", "So it needn't model unpredictable low-level detail and tends to learn more semantic features", 2, true],
    ]),
  short(m(SL, "transfer-scaling", "transfer", 9, 150, "Why does self-supervised pretraining benefit more from scale than supervised pretraining?"),
    [
      ["data", "It can use essentially unlimited unlabelled data, while labelled datasets are bounded by annotation cost", 2, true],
      ["signal", "Its targets are rich (e.g. every token or patch), giving many bits of supervision per example", 2, true],
    ]),
  num(m(SL, "transfer-chance", "transfer", 9, 75, "With $512$ candidates (one positive), InfoNCE at chance (uniform scores) gives loss $\\ln 512$. What is it? Give $4$ decimal places."), 6.2383),
  short(m(SL, "transfer-dimensional-collapse", "transfer", 10, 180, "What is dimensional collapse in self-supervised learning, and how is it detected and prevented?"),
    [
      ["what", "Embeddings don't collapse to a point but occupy a low-dimensional subspace, wasting capacity", 2, true],
      ["detect-prevent", "Seen in the singular-value spectrum of embeddings; prevented by decorrelation terms (Barlow Twins, VICReg), whitening or projector design", 2, true],
    ]),
  mcq(m(SL, "transfer-data2vec", "transfer", 10, 90, "data2vec's notable idea is:"),
    "Using the same objective — predicting a teacher's contextual representations of masked inputs — for speech, vision and text",
    [
      ["Using labels for all three modalities", "data2vec-labels", "It's self-supervised."],
      ["Predicting raw pixels only", "data2vec-pixels", "It predicts representations."],
      ["Training separate GANs per modality", "data2vec-gan", "It's one unified objective."],
    ]),
  short(m(SL, "transfer-medical", "transfer", 10, 180, "Why is self-supervised pretraining especially useful in medical imaging?"),
    [
      ["labels", "Expert labels are expensive and scarce, while unlabelled scans are plentiful", 2, true],
      ["domain", "Pretraining on in-domain unlabelled scans learns features suited to medical images, often beating ImageNet pretraining when few labels exist", 2, true],
    ]),
];

export const dlSixty05Items: Item[] = [
  ...init,
  ...layerNorm,
  ...schedules,
  ...augmentation,
  ...mixed,
  ...distributed,
  ...transfer,
  ...ssl,
];
