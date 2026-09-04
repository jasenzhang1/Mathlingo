import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 11 — deep learning. `neural-networks` and
 * `backpropagation` previously dead-ended: the graph could train a dense
 * network and had nothing to say about what gets built with one. This branch
 * runs from the pieces every architecture shares to the three architectural
 * families and the representations they produce.
 */

const activationFunctions: WikiArticle = {
  conceptId: "activation-functions",
  summary:
    "The activation is the elementwise nonlinearity between layers. It is not a tuning detail: " +
    "without it a stack of layers collapses to a single matrix, so the activation is the entire " +
    "reason depth buys anything. Which one you choose then decides whether gradients survive the " +
    "trip back through the network.",

  sections: [
    {
      heading: "The menu",
      blocks: [
        {
          kind: "table",
          headers: ["Activation", "Form", "Derivative", "Verdict"],
          rows: [
            ["Sigmoid", "1/(1 + e⁻ᶻ)", "≤ 0.25, → 0 at both tails", "Saturates; only for binary outputs now"],
            ["Tanh", "(eᶻ − e⁻ᶻ)/(eᶻ + e⁻ᶻ)", "≤ 1, → 0 at both tails", "Zero-centred sigmoid; still saturates"],
            ["ReLU", "max(0, z)", "1 if z > 0, else 0", "The default. No positive-side saturation, and cheap"],
            ["Leaky ReLU", "z if z > 0, else αz", "1 or α", "Fixes dead units by never sending exactly 0 back"],
            ["GELU / SiLU", "smooth gated variants", "smooth, non-monotone", "Standard in transformers; slightly better empirically"],
            ["Softmax", "eᶻᵏ / Σⱼeᶻʲ", "—", "An output layer, not a hidden activation"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "ReLU's derivative of exactly 1 is the whole point",
          text:
            "Backpropagation multiplies one factor per layer. Sigmoid contributes at most 0.25, so " +
            "ten layers scale the gradient by at most 0.25¹⁰ ≈ 10⁻⁶ and the early layers stop " +
            "learning. ReLU contributes exactly 1 wherever the unit is active, so the signal passes " +
            "through undiminished. That single change did more to make deep networks trainable than " +
            "any other.",
        },
      ],
    },

    {
      heading: "How each one fails",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Saturation (sigmoid, tanh)",
              description:
                "At large |z| the curve flattens and the derivative goes to zero. A unit pushed into its tail stops receiving gradient and effectively freezes — and the further wrong it is, the more stuck it gets.",
            },
            {
              term: "Dying ReLU",
              description:
                "A unit whose pre-activation is negative for every input outputs 0 always, so its derivative is 0 always and it never recovers. A large learning rate can kill a substantial fraction of a layer in one step.",
            },
            {
              term: "Non-zero-centred output (sigmoid, ReLU)",
              description:
                "All-positive activations make every weight in the next layer receive a gradient of the same sign, so updates zig-zag rather than moving diagonally. This is part of why tanh was preferred over sigmoid, and why normalisation layers help.",
            },
          ],
        },
        {
          kind: "example",
          title: "Why ReLU is not 'linear enough to collapse'",
          problem: "ReLU is linear on z > 0 and linear on z < 0. Why does a ReLU network not reduce to one matrix?",
          steps: [
            "Linearity requires f(a + b) = f(a) + f(b) everywhere. Take a = 3, b = −5.",
            "max(0, 3 + (−5)) = max(0, −2) = 0.",
            "max(0, 3) + max(0, −5) = 3 + 0 = 3.",
          ],
          answer:
            "0 ≠ 3, so ReLU is not a linear map — it is piecewise linear, and the kink is what breaks the composition argument. Which piece each unit sits on depends on the input, so the network is a different linear function on each region of input space, with exponentially many regions in depth.",
        },
      ],
    },

    {
      heading: "Choosing one",
      blocks: [
        {
          kind: "list",
          items: [
            "Hidden layers: ReLU by default; a leaky or smooth variant if you see dead units or are training a transformer.",
            "Binary output: sigmoid, paired with binary cross-entropy so the derivative terms cancel.",
            "Multiclass output: softmax, paired with cross-entropy for the same reason.",
            "Regression output: no activation at all — an unbounded target needs an unbounded output.",
            "Recurrent cells still use sigmoid and tanh internally, deliberately: the gates need outputs bounded in (0, 1) to act as gates.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§6.3, Hidden Units" },
    { source: "Glorot, Bordes & Bengio, Deep Sparse Rectifier Neural Networks", locator: "AISTATS 2011" },
    { source: "Prince, Understanding Deep Learning", locator: "§3.2, Activation Functions" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-11-deep-learning.md" },
  ],
};

const sgdAndAdaptiveOptimizers: WikiArticle = {
  conceptId: "sgd-and-adaptive-optimizers",
  summary:
    "Plain gradient descent is almost never what runs. Momentum damps the zig-zag across a valley " +
    "while accumulating speed along it; adaptive methods give each parameter its own step size " +
    "from a running estimate of its gradient magnitude. Both attack the same underlying problem: " +
    "one global step size cannot suit a badly conditioned surface.",

  sections: [
    {
      heading: "Momentum",
      blocks: [
        {
          kind: "formula",
          latex: "v ← βv + ∇L(θ);   θ ← θ − ηv",
          caption: "An exponentially weighted average of past gradients, typically β = 0.9",
        },
        {
          kind: "prose",
          text:
            "In a long narrow valley the gradient points mostly across the valley and only weakly " +
            "along it. The across components alternate sign step to step and largely cancel in the " +
            "running average; the along component keeps the same sign and accumulates. Momentum " +
            "therefore damps exactly the oscillation that limits the step size, and builds speed in " +
            "the direction that makes progress.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "β = 0.9 means an average over roughly the last ten gradients",
          text:
            "An exponentially weighted average with decay β has an effective window of about " +
            "1/(1 − β) terms. That is a useful reading: β = 0.9 averages ten, β = 0.99 averages a " +
            "hundred. Raising β smooths more and responds more slowly to a genuine change of " +
            "direction.",
        },
      ],
    },

    {
      heading: "Adaptive step sizes",
      blocks: [
        {
          kind: "formula",
          latex: "m ← β₁m + (1−β₁)g;   v ← β₂v + (1−β₂)g²;   θ ← θ − η·m̂/(√v̂ + ε)",
          caption: "Adam: a momentum term m and a per-parameter scale from the squared-gradient average v",
        },
        {
          kind: "definitions",
          items: [
            { term: "AdaGrad", description: "Divides by the square root of the accumulated sum of squared gradients. The denominator only grows, so the effective step size decays monotonically to zero — good for convex problems, fatal for long training runs." },
            { term: "RMSProp", description: "Replaces the sum with an exponentially weighted average, so the step size can recover. This is the fix that made adaptive methods usable for deep networks." },
            { term: "Adam", description: "RMSProp plus momentum, with bias correction for the initialisation at zero. The default for most deep learning." },
            { term: "AdamW", description: "Decouples weight decay from the adaptive scaling. In Adam, an L2 penalty added to the loss gets divided by √v like everything else, which is not what weight decay is supposed to do; AdamW applies it directly to the parameters instead." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Dividing by √v is automatic feature scaling, inside the optimiser",
          text:
            "A parameter that consistently receives large gradients gets a large v and therefore a " +
            "small step; one with small gradients gets a large step. That is the same correction " +
            "standardising the inputs would have made to the loss surface, applied per parameter at " +
            "run time — which is why Adam is far more forgiving of unscaled inputs than plain " +
            "gradient descent, and why it needs less learning-rate tuning to get started.",
        },
      ],
    },

    {
      heading: "Schedules, and what to actually use",
      blocks: [
        {
          kind: "list",
          items: [
            "Warmup: start at a tiny learning rate for the first few hundred steps. Adam's v estimate is unreliable early, and a large step on a bad estimate can destroy a network in one update — this is essentially mandatory for transformers.",
            "Cosine or step decay: reduce the rate over training so late steps refine rather than bounce. Most of the final accuracy is won during the low-rate phase.",
            "SGD with momentum often generalises slightly better than Adam on vision tasks given enough tuning; Adam is more robust out of the box and dominates language work.",
            "The learning rate remains the single most important hyperparameter under any optimiser. A range test — sweep it upward for a few hundred steps and watch where the loss turns — costs minutes and beats guessing.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "An adaptive optimiser does not remove the need for a schedule",
          text:
            "Adam adapts the *relative* step size across parameters; it does not know when training " +
            "should slow down overall. A constant learning rate with Adam typically plateaus above " +
            "where a decayed one lands. The two mechanisms are orthogonal and both are needed.",
        },
      ],
    },
  ],

  references: [
    { source: "Kingma & Ba, Adam: A Method for Stochastic Optimization", locator: "ICLR 2015" },
    { source: "Loshchilov & Hutter, Decoupled Weight Decay Regularization", locator: "ICLR 2019" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "Ch. 8, Optimization for Training Deep Models" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-11-deep-learning.md" },
  ],
};

const dropout: WikiArticle = {
  conceptId: "dropout",
  summary:
    "Dropout deletes each unit independently with probability p during training, and keeps all of " +
    "them at inference. Deliberately damaging the network on every forward pass regularises it, " +
    "because no unit can rely on any particular other unit being present.",

  sections: [
    {
      heading: "The mechanism",
      blocks: [
        {
          kind: "prose",
          text:
            "On each training forward pass, sample a fresh binary mask and zero the dropped units. " +
            "Backpropagation then flows only through the survivors, so only their weights are " +
            "updated on that step. At inference nothing is dropped and the full network is used.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It works by preventing co-adaptation",
          text:
            "Without dropout, a unit can learn to correct a specific other unit's systematic error — " +
            "a partnership that works on the training set and is fragile off it. If either partner " +
            "may vanish at any step, no such contract can be relied on, and each unit is pushed to " +
            "be independently useful. That is a different regularisation mechanism from a weight " +
            "penalty, which shrinks magnitudes without touching what units coordinate on.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is also an exponentially large ensemble, trained for the price of one",
          text:
            "Each mask defines a different thinned sub-network, and there are 2ⁿ of them for n " +
            "droppable units. Training samples one per step, and they share weights. Using the full " +
            "network at test time approximates averaging their predictions — so dropout is bagging " +
            "over an ensemble that could never be trained explicitly.",
        },
      ],
    },

    {
      heading: "The scaling detail that must be right",
      blocks: [
        {
          kind: "formula",
          latex: "inverted dropout:  divide surviving activations by (1 − p) at training time",
          caption: "Keeps the expected activation constant, so inference needs no adjustment at all",
        },
        {
          kind: "example",
          title: "Why some correction is unavoidable",
          problem:
            "A unit's inputs sum to 10 in expectation. With p = 0.5 dropout and no correction, what does the next layer see at training time versus at inference?",
          steps: [
            "Training: half the inputs are zeroed, so the expected sum is 5.",
            "Inference: nothing is dropped, so the sum is 10.",
            "The next layer's weights were fitted against inputs averaging 5 and now receive 10.",
          ],
          answer:
            "Every activation is twice what the following layer was trained for, and the error compounds through the depth. Inverted dropout divides the survivors by (1 − p) = 0.5 during training, restoring the expectation to 10 and leaving inference untouched — which is why every modern implementation does the correction on the training side.",
        },
      ],
    },

    {
      heading: "Using it well",
      blocks: [
        {
          kind: "list",
          items: [
            "Typical rates: 0.5 for wide fully connected layers, 0.1–0.3 for convolutional ones, which are already regularised by weight sharing.",
            "It must be disabled at evaluation time. Forgetting to switch the model to eval mode produces noisy, pessimistic validation numbers and is a classic bug.",
            "Dropout and batch normalisation interact badly when stacked, because dropout changes the activation statistics batch norm is estimating. Modern architectures typically use one or the other in a given block.",
            "Training loss above validation loss is normal *with* dropout, since the training pass is handicapped and the validation pass is not — this is not the leakage signature it resembles.",
            "It slows convergence: each step updates a fraction of the network, so more epochs are needed.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Keeping dropout on at test time buys you an uncertainty estimate",
          text:
            "Running several stochastic forward passes and looking at the spread of predictions — " +
            "Monte Carlo dropout — approximates a Bayesian posterior over the network's weights. It " +
            "is a cheap way to get uncertainty from a model that was not built to provide any, " +
            "though a Gaussian process gives a better-founded one when the data is small enough to " +
            "afford it.",
        },
      ],
    },
  ],

  references: [
    { source: "Srivastava et al., Dropout: A Simple Way to Prevent Neural Networks from Overfitting", locator: "JMLR 15, 2014" },
    { source: "Gal & Ghahramani, Dropout as a Bayesian Approximation", locator: "ICML 2016" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-11-deep-learning.md" },
  ],
};

const batchNormalization: WikiArticle = {
  conceptId: "batch-normalization",
  summary:
    "Batch normalisation standardises each activation across the examples in a minibatch, then " +
    "applies a learned scale and shift. It lets much larger learning rates be used, speeds " +
    "convergence substantially, and introduces a train/inference asymmetry that is the source of " +
    "most of the bugs involving it.",

  sections: [
    {
      heading: "The operation",
      blocks: [
        {
          kind: "formula",
          latex: "x̂ = (x − μ_batch)/√(σ²_batch + ε);   y = γx̂ + β",
          caption: "Standardise across the batch, then let the network learn its own scale γ and shift β",
        },
        {
          kind: "prose",
          text:
            "The learned γ and β matter: without them the layer would be forced to keep every " +
            "activation at zero mean and unit variance, which is a genuine constraint on what the " +
            "network can represent. With them, the network can undo the normalisation exactly if " +
            "that is what it wants — so nothing is lost, and the optimisation is reparameterised " +
            "into coordinates that are far easier to move in.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is feature scaling applied in the middle of the network",
          text:
            "Standardising the inputs helps because unequal scales make the loss surface a narrow " +
            "canyon. The same argument applies to the inputs of every hidden layer, which are " +
            "activations nobody scaled. Batch norm applies the fix there — and unlike input " +
            "scaling, it re-applies it continuously as those activations shift during training.",
        },
      ],
    },

    {
      heading: "The train/inference asymmetry",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "At inference there is no batch, so stored statistics are used instead",
          text:
            "A single prediction has no batch to compute μ and σ² from, and even with one, a " +
            "prediction that depends on which other examples happened to be alongside it would be " +
            "unacceptable. So training maintains a running average of the batch statistics, and " +
            "inference uses those frozen values. Forgetting to switch to evaluation mode is the " +
            "single most common batch-norm bug, and it makes predictions silently depend on batch " +
            "composition.",
        },
        {
          kind: "list",
          items: [
            "Small batches give noisy statistics, so batch norm degrades badly below roughly 8–16 examples and can be worse than nothing at batch size 1.",
            "The batch dependence is also a subtle information leak between examples in a batch, which matters for some privacy and contrastive-learning settings.",
            "Layer normalisation — normalising across features within each example instead of across the batch — removes the batch dependence entirely, which is why transformers use it.",
            "Group and instance normalisation sit between the two, normalising over subsets of channels.",
          ],
        },
      ],
    },

    {
      heading: "What it actually does",
      blocks: [
        {
          kind: "prose",
          text:
            "The original explanation was that it reduces \"internal covariate shift\" — the drift " +
            "in each layer's input distribution as earlier layers update. Later work found that " +
            "explanation does not hold up well: networks with deliberately injected shift after the " +
            "normalisation still train fine. The better-supported account is that it smooths the " +
            "loss landscape, making the gradients more predictable and permitting much larger " +
            "stable learning rates.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A textbook case of a technique outliving its explanation",
          text:
            "The empirical benefit was never in doubt and is not diminished by the revision. It is " +
            "worth holding as an example of how deep learning often works: a mechanism is found to " +
            "help, a plausible story is attached, and the story is corrected later without the " +
            "practice changing. Being able to say \"this works and the accepted explanation is " +
            "contested\" is more honest than repeating the original one.",
        },
        {
          kind: "list",
          items: [
            "It has a mild regularising effect, since each example's normalisation depends on its batch-mates — which is noise, and noise regularises.",
            "The bias term in a layer immediately before batch norm is redundant: β subsumes it.",
            "Placement relative to the activation (before or after) is a real architectural choice with measurable differences, and conventions differ between architectures.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Ioffe & Szegedy, Batch Normalization", locator: "ICML 2015" },
    { source: "Santurkar et al., How Does Batch Normalization Help Optimization?", locator: "NeurIPS 2018" },
    { source: "Ba, Kiros & Hinton, Layer Normalization", locator: "arXiv:1607.06450, 2016" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-11-deep-learning.md" },
  ],
};

const convolutionalNeuralNetworks: WikiArticle = {
  conceptId: "convolutional-neural-networks",
  summary:
    "A convolutional layer slides a small set of shared weights across the input rather than " +
    "connecting every input to every output. That single change encodes two facts about images — " +
    "that useful patterns are local, and that they mean the same thing wherever they appear — and " +
    "cuts the parameter count by orders of magnitude.",

  sections: [
    {
      heading: "Two priors, one architecture",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Locality",
              description:
                "Each output depends only on a small neighbourhood of the input. An edge is determined by adjacent pixels, not by one in the opposite corner.",
            },
            {
              term: "Weight sharing (translation equivariance)",
              description:
                "The same filter is applied at every position, so a pattern detected in one place is detected identically elsewhere. Shift the input and the feature map shifts with it.",
            },
          ],
        },
        {
          kind: "example",
          title: "The parameter saving is not marginal",
          problem:
            "Connect a 224 × 224 × 3 image to 64 output channels: fully connected to a same-sized layer, versus a 3 × 3 convolution.",
          steps: [
            "Fully connected: 150,528 inputs × 64 outputs per spatial position — hundreds of millions of weights, and none shared.",
            "Convolution: 3 × 3 × 3 × 64 = 1,728 weights, plus 64 biases.",
            "The convolution's parameter count does not depend on the image size at all.",
          ],
          answer:
            "About 1,800 parameters against hundreds of millions. The saving is what makes training on realistic image datasets possible, and the size-independence is why the same architecture handles different resolutions.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is a prior expressed as architecture rather than as a penalty",
          text:
            "Regularisation usually means adding a term to the loss. Here the assumption — that " +
            "the useful structure is local and translation-invariant — is built into which weights " +
            "exist at all. That is a far stronger constraint, and it is why convolutional networks " +
            "need so much less data than a dense network would to reach the same accuracy on images.",
        },
      ],
    },

    {
      heading: "The components",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Kernel / filter", description: "The small weight patch that slides across the input. 3 × 3 is the modern default; stacking two 3 × 3 layers covers the same region as one 5 × 5 with fewer parameters and an extra nonlinearity." },
            { term: "Stride", description: "How far the kernel moves per step. Stride 2 halves the spatial dimensions and is now often used in place of pooling." },
            { term: "Padding", description: "Adding a border of zeros so the output keeps the input's size. Without it every layer shrinks the image, which limits depth." },
            { term: "Channels", description: "Each filter produces one output channel. Depth in channels is how a layer represents many distinct patterns at each location." },
            { term: "Pooling", description: "Downsamples by taking a max or mean over a window, buying a degree of translation *invariance* on top of equivariance. Increasingly replaced by strided convolutions." },
          ],
        },
        {
          kind: "prose",
          text:
            "Stacking these layers grows the receptive field — the region of the original image each " +
            "unit can see — while the channel count grows and the spatial size shrinks. The " +
            "resulting hierarchy is visible when the filters are inspected: edges in the first " +
            "layer, textures and motifs in the middle, object parts near the top. That is the " +
            "efficient-reuse argument for depth made concrete rather than asserted.",
        },
      ],
    },

    {
      heading: "Limits worth knowing",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Equivariance is not invariance, and neither covers rotation or scale",
          text:
            "Convolution guarantees that a shifted input gives a shifted feature map — pooling and " +
            "the final classifier are what turn that into invariance. Nothing in the architecture " +
            "provides invariance to rotation, scale or viewpoint; those come from data " +
            "augmentation, which is why augmentation is not optional in practice.",
        },
        {
          kind: "list",
          items: [
            "Residual connections are what made very deep convolutional networks trainable, by giving gradients an identity path around each block.",
            "The receptive field grows only linearly with depth in a plain stack, which is why dilated convolutions exist for tasks needing wide context.",
            "The same architecture applies wherever the locality-and-sharing prior holds: 1-D convolutions for audio and time series, 3-D for volumetric scans.",
            "Vision transformers drop the prior and let attention learn the structure instead — competitive at large data scale, and worse than convolutions when data is scarce, which is exactly what a prior predicts.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "LeCun et al., Gradient-Based Learning Applied to Document Recognition", locator: "Proc. IEEE 86(11), 1998" },
    { source: "He et al., Deep Residual Learning for Image Recognition", locator: "CVPR 2016" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "Ch. 9, Convolutional Networks" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-11-deep-learning.md" },
  ],
};

const recurrentNeuralNetworks: WikiArticle = {
  conceptId: "recurrent-neural-networks",
  summary:
    "A recurrent network processes a sequence one step at a time, carrying a hidden state forward " +
    "and applying the same weights at every step. Weight sharing across time is the sequential " +
    "analogue of a convolution's sharing across space — and it creates a gradient problem that " +
    "dominated sequence modelling until gating and then attention addressed it.",

  sections: [
    {
      heading: "The recurrence",
      blocks: [
        {
          kind: "formula",
          latex: "hₜ = σ(W_hh·hₜ₋₁ + W_xh·xₜ + b);   yₜ = W_hy·hₜ",
          caption: "The same W at every step — the state is the only channel through which the past reaches the present",
        },
        {
          kind: "prose",
          text:
            "Sharing the weights across time means the network handles sequences of any length with " +
            "a fixed parameter count, and a pattern learned at step 3 applies at step 300. Training " +
            "unrolls the recurrence into a deep feedforward network — one layer per time step — and " +
            "runs ordinary backpropagation through it, which is why it is called backpropagation " +
            "through time.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Unrolling makes the depth equal to the sequence length",
          text:
            "A 500-step sequence is a 500-layer network sharing one weight matrix. The gradient " +
            "reaching step 1 has been multiplied by that matrix 500 times, so it either vanishes to " +
            "nothing or explodes, depending on whether the relevant singular value is below or above " +
            "1. This is the vanishing-gradient problem in its most acute form, and it is the reason " +
            "plain recurrent networks cannot learn long-range dependencies.",
        },
      ],
    },

    {
      heading: "Gating: LSTM and GRU",
      blocks: [
        {
          kind: "prose",
          text:
            "An LSTM adds a cell state that is updated by *addition* rather than by repeated matrix " +
            "multiplication, with learned gates deciding what to forget, what to write, and what to " +
            "expose. Because the cell state's default path is close to the identity, the gradient " +
            "can flow along it across many steps without being repeatedly rescaled — the same trick " +
            "residual connections use in deep feedforward networks.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Forget gate", description: "How much of the previous cell state to keep. Initialising its bias positive so it starts near 'keep everything' is a standard and genuinely helpful trick." },
            { term: "Input gate", description: "How much of the newly computed candidate to write into the cell." },
            { term: "Output gate", description: "How much of the cell state to expose as the hidden state this step." },
            { term: "GRU", description: "A simplification with two gates and no separate cell state. Fewer parameters, usually comparable accuracy, and often the better default when data is limited." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Exploding gradients are the easy half of the problem",
          text:
            "Clipping the gradient norm caps the explosion and costs almost nothing — a two-line " +
            "fix that works. Vanishing has no such patch, because you cannot amplify a signal that " +
            "has already been destroyed. That asymmetry is why architectural change, not a training " +
            "trick, was needed.",
        },
      ],
    },

    {
      heading: "Why attention displaced them",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Recurrent", "Attention-based"],
          rows: [
            ["Path length between distant positions", "O(sequence length)", "O(1) — every position reaches every other directly"],
            ["Parallelism during training", "None across time; step t needs step t−1", "Full — all positions computed at once"],
            ["Cost per layer", "Linear in length", "Quadratic in length"],
            ["Long-range dependencies", "Hard, even with gating", "Direct"],
          ],
        },
        {
          kind: "prose",
          text:
            "The decisive factor was parallelism as much as accuracy. A recurrent network cannot " +
            "compute step t before step t − 1, so training time scales with sequence length no " +
            "matter how much hardware is available. Attention removes that dependency entirely, and " +
            "on modern accelerators that difference compounds into models that are simply larger. " +
            "Recurrent models remain reasonable for genuinely streaming settings and for short " +
            "sequences where the quadratic cost of attention is not worth paying.",
        },
      ],
    },
  ],

  references: [
    { source: "Hochreiter & Schmidhuber, Long Short-Term Memory", locator: "Neural Computation 9(8), 1997" },
    { source: "Cho et al., Learning Phrase Representations using RNN Encoder-Decoder", locator: "EMNLP 2014" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "Ch. 10, Sequence Modeling" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-11-deep-learning.md" },
  ],
};

const attentionMechanism: WikiArticle = {
  conceptId: "attention-mechanism",
  summary:
    "Attention computes an output for each position as a weighted average of values drawn from " +
    "every position, with the weights determined by how well a query matches each key. It replaces " +
    "a fixed-length bottleneck with a direct, learned, content-based lookup.",

  sections: [
    {
      heading: "Queries, keys and values",
      blocks: [
        {
          kind: "formula",
          latex: "Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V",
          caption: "Scores from query-key dot products, normalised, then used to average the values",
        },
        {
          kind: "definitions",
          items: [
            { term: "Query", description: "What this position is looking for." },
            { term: "Key", description: "What each position offers, used for matching against queries." },
            { term: "Value", description: "What each position actually contributes once selected." },
          ],
        },
        {
          kind: "prose",
          text:
            "The separation of keys from values is the design worth understanding. A position can " +
            "advertise itself as relevant on one basis (its key) while contributing something quite " +
            "different (its value). Collapsing the two — matching on the content you also return — " +
            "would be a strictly less expressive mechanism, and the split is what makes attention a " +
            "learned lookup rather than a similarity average.",
        },
      ],
    },

    {
      heading: "Why the √dₖ",
      blocks: [
        {
          kind: "example",
          title: "The scaling factor is not cosmetic",
          problem:
            "Query and key components are independent with mean 0 and variance 1. What is the variance of their dot product in dimension dₖ?",
          steps: [
            "The dot product is a sum of dₖ independent products, each with mean 0 and variance 1.",
            "Variances add, so the sum has variance dₖ and standard deviation √dₖ.",
            "With dₖ = 64 the scores have a spread of about 8; with dₖ = 512, about 23.",
          ],
          answer:
            "Scores of that magnitude push the softmax into a regime where one weight is ≈ 1 and the rest ≈ 0 — and where its gradient is nearly zero, so the layer stops learning. Dividing by √dₖ restores unit variance and keeps the softmax in its responsive range.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The problem it solves is saturation, which is the same problem as everywhere else",
          text:
            "A softmax with extreme inputs saturates exactly as a sigmoid does, with the same " +
            "consequence: a vanishing derivative. The scaling factor is one more instance of the " +
            "recurring deep-learning discipline of keeping quantities in the range where their " +
            "nonlinearity still has slope.",
        },
      ],
    },

    {
      heading: "What it buys, and what it costs",
      blocks: [
        {
          kind: "list",
          items: [
            "Constant path length: any position can read any other in a single layer, so there is no long-range dependency problem to solve.",
            "Full parallelism: all positions are computed simultaneously, which is the property that made large-scale training feasible.",
            "Content-based rather than position-based routing: what gets attended to depends on the values, not on a fixed pattern.",
            "Quadratic cost: the score matrix is n × n in the sequence length, which is the binding constraint on context length and the target of most efficient-attention research.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Attention weights are not explanations",
          text:
            "It is tempting to read a high attention weight as \"the model used this\". The " +
            "literature is clear that this inference is unreliable: attention distributions can be " +
            "substantially altered while leaving the output nearly unchanged, so they are not " +
            "faithful attributions. They are a useful debugging view and weak evidence about " +
            "mechanism.",
        },
      ],
    },
  ],

  references: [
    { source: "Bahdanau, Cho & Bengio, Neural Machine Translation by Jointly Learning to Align and Translate", locator: "ICLR 2015" },
    { source: "Vaswani et al., Attention Is All You Need", locator: "NeurIPS 2017" },
    { source: "Jain & Wallace, Attention Is Not Explanation", locator: "NAACL 2019" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-11-deep-learning.md" },
  ],
};

const transformers: WikiArticle = {
  conceptId: "transformers",
  summary:
    "The transformer removes recurrence and convolution entirely and builds the network from " +
    "self-attention, position-wise feedforward layers, residual connections and layer " +
    "normalisation. Its decisive property is that training parallelises fully across the sequence.",

  sections: [
    {
      heading: "Self-attention and multiple heads",
      blocks: [
        {
          kind: "prose",
          text:
            "Self-attention is attention where queries, keys and values all come from the same " +
            "sequence: every position attends to every position, including itself. Multi-head " +
            "attention runs several such operations in parallel on different learned projections of " +
            "the input, then concatenates the results.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Multiple heads exist because one averaged distribution is too blunt",
          text:
            "A single attention distribution has to serve every relationship at once — syntactic " +
            "agreement, coreference, topical relevance — and averaging them produces a compromise " +
            "that represents none well. Splitting the representation into h subspaces lets each " +
            "head specialise in a different relation. The dimension per head shrinks accordingly, " +
            "so the total cost is roughly unchanged: it is a reallocation of capacity, not an " +
            "increase.",
        },
      ],
    },

    {
      heading: "The pieces that make it trainable",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Positional encoding",
              description:
                "Attention is permutation-equivariant — it has no notion of order — so position information must be added explicitly, by sinusoidal encodings, learned embeddings, or a rotary scheme applied to the queries and keys.",
            },
            {
              term: "Residual connections",
              description:
                "Every sublayer is wrapped as x + Sublayer(x), giving gradients an identity path through the whole stack. Without them, depth of this scale is not trainable.",
            },
            {
              term: "Layer normalisation",
              description:
                "Normalises across features within each example rather than across the batch, so nothing depends on batch composition — essential for variable-length sequences and small batches.",
            },
            {
              term: "Position-wise feedforward",
              description:
                "A two-layer MLP applied identically at each position. Attention moves information between positions; this transforms it. Both are needed, and it holds most of the parameters.",
            },
            {
              term: "Causal masking",
              description:
                "For generation, future positions are masked out so position t attends only to ≤ t. This is what allows every position's loss to be computed in one parallel pass while preserving the left-to-right factorisation.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Without positional encoding a transformer cannot tell a sentence from its anagram",
          text:
            "Permute the input positions and self-attention permutes the output identically — the " +
            "set of tokens is all it sees. Order is supplied entirely by the positional signal, " +
            "which is why the choice of scheme materially affects how well a model extrapolates to " +
            "sequences longer than it was trained on.",
        },
      ],
    },

    {
      heading: "Why it took over",
      blocks: [
        {
          kind: "list",
          items: [
            "Parallel training across the sequence: no step depends on the previous one, unlike a recurrent network, so hardware utilisation is far higher.",
            "Constant path length between any two positions, so long-range dependencies need no special mechanism.",
            "Empirically smooth scaling: performance improves predictably with parameters, data and compute, which makes large investments plannable rather than speculative.",
            "Architectural generality: the same block handles text, images as patches, audio and protein sequences, so improvements transfer across fields.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The quadratic cost is the standing constraint",
          text:
            "Self-attention builds an n × n score matrix, so doubling the context quadruples the " +
            "compute and memory. Sparse, linear and low-rank attention variants, and " +
            "memory-efficient exact implementations, all target this. It is the reason context " +
            "length is a headline specification rather than a free parameter.",
        },
      ],
    },
  ],

  references: [
    { source: "Vaswani et al., Attention Is All You Need", locator: "NeurIPS 2017" },
    { source: "Prince, Understanding Deep Learning", locator: "Ch. 12, Transformers" },
    { source: "Kaplan et al., Scaling Laws for Neural Language Models", locator: "arXiv:2001.08361, 2020" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-11-deep-learning.md" },
  ],
};

const embeddings: WikiArticle = {
  conceptId: "embeddings",
  summary:
    "An embedding maps a discrete item — a word, a product, a user — to a dense vector learned " +
    "from data, so that geometric relationships in the vector space correspond to semantic ones. " +
    "It replaces a representation in which every pair of items is equally dissimilar with one in " +
    "which similarity is meaningful.",

  sections: [
    {
      heading: "The problem with one-hot",
      blocks: [
        {
          kind: "prose",
          text:
            "A one-hot vector for a 50,000-word vocabulary is 50,000-dimensional, almost entirely " +
            "zero, and — the decisive defect — orthogonal to every other word. \"Cat\" and \"kitten\" " +
            "are exactly as dissimilar as \"cat\" and \"tuesday\". Nothing learned about one word can " +
            "transfer to a related one, because the representation encodes no relatedness to " +
            "transfer along.",
        },
        {
          kind: "table",
          headers: ["", "One-hot", "Embedding"],
          rows: [
            ["Dimension", "Vocabulary size", "50–1,000, chosen"],
            ["Density", "One non-zero", "All non-zero"],
            ["Similarity between items", "Always zero", "Learned, and meaningful"],
            ["Generalisation across items", "None", "Related items share structure"],
            ["Where it comes from", "Assigned", "Learned from a task"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "An embedding layer is a lookup, and it is also a matrix multiply",
          text:
            "Multiplying a one-hot vector by a weight matrix selects one row of it. So an embedding " +
            "layer *is* a fully connected layer applied to a one-hot input — implemented as an " +
            "indexed lookup because materialising the one-hot vector would be absurd. That " +
            "equivalence explains why the embedding trains by ordinary backpropagation with no " +
            "special machinery.",
        },
      ],
    },

    {
      heading: "Where the geometry comes from",
      blocks: [
        {
          kind: "prose",
          text:
            "Nobody places the vectors. They arise from a training objective — predicting a word " +
            "from its context, predicting whether a user clicked an item, or any downstream task — " +
            "and the geometry is a by-product of what the objective needed. Words that appear in " +
            "similar contexts end up nearby because that is what lets the model predict them " +
            "interchangeably. The distributional hypothesis, that words are characterised by the " +
            "company they keep, is the assumption doing the work.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The king − man + woman ≈ queen story is weaker than it is usually told",
          text:
            "Linear analogies do work above chance, and the standard demonstrations quietly exclude " +
            "the three input words from the candidate answers — without that exclusion the nearest " +
            "vector is frequently just \"king\" again. Treat vector arithmetic as evidence that some " +
            "relational structure is captured, not as a demonstration that the space is organised " +
            "into clean semantic axes.",
        },
        {
          kind: "list",
          items: [
            "Static embeddings give one vector per word, so every sense of a polysemous word is averaged into a single point — 'bank' sits between finance and rivers.",
            "Contextual embeddings from transformer models produce a different vector per occurrence, which is the main advance over the static generation.",
            "Embeddings inherit the biases of the corpus they were trained on, and those biases are measurable in the geometry — a documented and consequential property, not a hypothetical one.",
            "Cosine similarity is the usual metric, since magnitude often tracks frequency rather than meaning.",
            "The same idea applies far beyond text: items and users in recommenders, nodes in graphs, categorical columns in tabular models.",
          ],
        },
      ],
    },

    {
      heading: "Practical notes",
      blocks: [
        {
          kind: "list",
          items: [
            "Dimension is a genuine hyperparameter: too small underfits the relationships, too large overfits and costs memory. A few hundred is typical for large vocabularies.",
            "Rare items get few gradient updates and end up poorly placed. Subword tokenisation avoids this for text by ensuring every fragment is common.",
            "For tabular categorical features, a learned embedding usually beats one-hot when cardinality is high — it is the same argument, applied to postcodes rather than words.",
            "Approximate nearest-neighbour indexes make retrieval over millions of embeddings fast enough to serve, which is what underpins vector search.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Mikolov et al., Efficient Estimation of Word Representations in Vector Space", locator: "ICLR Workshop 2013" },
    { source: "Pennington, Socher & Manning, GloVe: Global Vectors for Word Representation", locator: "EMNLP 2014" },
    { source: "Bolukbasi et al., Man is to Computer Programmer as Woman is to Homemaker?", locator: "NeurIPS 2016" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-11-deep-learning.md" },
  ],
};

const autoencoders: WikiArticle = {
  conceptId: "autoencoders",
  summary:
    "An autoencoder is trained to reconstruct its own input through a bottleneck. Because the " +
    "target is the input, it needs no labels; because the bottleneck is narrow, it must learn what " +
    "in the input is worth keeping. It is nonlinear dimensionality reduction that is learned " +
    "rather than derived.",

  sections: [
    {
      heading: "Encoder, bottleneck, decoder",
      blocks: [
        {
          kind: "formula",
          latex: "minimise ‖x − g(f(x))‖²   over encoder f and decoder g",
          caption: "The target is the input; the constraint is that it must pass through a narrow layer",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A linear autoencoder recovers PCA's subspace",
          text:
            "With linear encoder and decoder and squared-error loss, the optimal solution spans " +
            "exactly the principal subspace — the same answer PCA gives. That makes the " +
            "relationship precise: an autoencoder is PCA with the linearity assumption removed, " +
            "and the nonlinearity is the entire difference. It also means a linear autoencoder is " +
            "strictly worse than PCA in practice, since it finds the same subspace by gradient " +
            "descent rather than in closed form, and without the ordering of components.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Without a constraint, the identity function is a perfect solution",
          text:
            "If the hidden layer is at least as wide as the input, the network can simply copy its " +
            "input through and achieve zero loss having learned nothing. Something must force it to " +
            "discard: a narrow bottleneck, a sparsity penalty on the activations, or noise added to " +
            "the input. The constraint is not a refinement of the method — it is the method.",
        },
      ],
    },

    {
      heading: "The useful variants",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Undercomplete",
              description:
                "Bottleneck narrower than the input. The plain case, and the direct nonlinear analogue of PCA.",
            },
            {
              term: "Denoising",
              description:
                "Corrupt the input and reconstruct the clean version. The model cannot copy — it must learn the structure that lets it repair damage, which is often a better representation than the plain version yields.",
            },
            {
              term: "Sparse",
              description:
                "Penalise the number of active hidden units rather than their count, so the layer can be wide while each input uses few of them.",
            },
            {
              term: "Variational",
              description:
                "The encoder outputs a distribution rather than a point, with a KL term pulling it toward a prior. This makes the latent space continuous and samplable, turning a compressor into a generative model — a different object with a different objective, sharing only the shape.",
            },
          ],
        },
      ],
    },

    {
      heading: "What they are actually good for",
      blocks: [
        {
          kind: "list",
          items: [
            "Anomaly detection: train on normal data only, then flag inputs the model reconstructs badly. One of the most robust uses, precisely because it needs no anomaly examples.",
            "Denoising and inpainting, where the reconstruction itself is the deliverable.",
            "Pretraining a representation when labels are scarce and unlabelled data is not — though contrastive self-supervised methods have largely overtaken them here.",
            "Nonlinear visualisation, as a middle ground between PCA's linearity and the uninterpretable geometry of a neighbour embedding.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Reconstruction quality is not representation quality",
          text:
            "A model can reconstruct beautifully while its latent code is a poor feature set for " +
            "anything else — it may have learned an efficient encoding of exactly the details that " +
            "do not matter downstream. If the representation is what you want, evaluate it on the " +
            "downstream task rather than on reconstruction error.",
        },
      ],
    },
  ],

  references: [
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "Ch. 14, Autoencoders" },
    { source: "Vincent et al., Extracting and Composing Robust Features with Denoising Autoencoders", locator: "ICML 2008" },
    { source: "Baldi & Hornik, Neural Networks and Principal Component Analysis", locator: "Neural Networks 2(1), 1989" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-11-deep-learning.md" },
  ],
};

export const ml11DeepLearning: WikiArticle[] = [
  activationFunctions,
  sgdAndAdaptiveOptimizers,
  dropout,
  batchNormalization,
  convolutionalNeuralNetworks,
  recurrentNeuralNetworks,
  attentionMechanism,
  transformers,
  embeddings,
  autoencoders,
];
