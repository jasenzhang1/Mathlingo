import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 14 — training deep networks at scale.
 *
 * Clusters 11 and 13 say what gets built and why. Neither says what it takes to
 * train one: how the weights start, why a transformer normalises per token
 * rather than per batch, what a warmup is for, which invariances may be
 * manufactured into the data, and what changes when the run no longer fits on
 * one device. These are decisions every practitioner makes, and none of them
 * had a node.
 */

const weightInitialization: WikiArticle = {
  conceptId: "weight-initialization",
  summary:
    "Initialisation is not a formality. Every layer multiplies the variance of its input by a factor " +
    "set by its weights, and that factor is raised to the power of the depth. Slightly too small and " +
    "the signal — and the gradient — is gone by layer twenty; slightly too large and it saturates or " +
    "overflows. Xavier and He initialisation both come from asking for a factor of exactly 1.",

  sections: [
    {
      heading: "Two failures before any training happens",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "All-zero weights make a layer a single unit",
          text:
            "If every weight in a layer starts at the same value, every unit in that layer computes " +
            "the same thing, receives the same gradient, and updates identically — forever. Width " +
            "becomes decoration. Randomness at initialisation is not for luck; it is what breaks the " +
            "symmetry between units so that they can learn different features at all.",
        },
        {
          kind: "prose",
          text:
            "Given randomness, the remaining question is scale. Treat the pre-activation of a unit " +
            "as a sum of n independent products of a weight and an input. Variances of independent " +
            "terms add, so the layer's output variance is n times the variance of one product.",
        },
        {
          kind: "formula",
          latex: "Var(y) = n · Var(w) · Var(x)",
          caption: "n is the fan-in — the number of inputs feeding one unit",
        },
        {
          kind: "prose",
          text:
            "The factor n·Var(w) is applied once per layer, so across depth d the signal is scaled " +
            "by (n·Var(w))ᵈ. Anything but 1 is an exponential, and exponentials in depth are how a " +
            "network dies before the first gradient step. Setting the bracket to 1 gives Var(w) = " +
            "1/n, which is Xavier initialisation (usually written with the average of fan-in and " +
            "fan-out, to balance the forward and backward passes).",
        },
      ],
    },

    {
      heading: "ReLU halves the variance, so He doubles the weights",
      blocks: [
        {
          kind: "formula",
          latex: "Xavier: Var(w) = 1/n_in;    He: Var(w) = 2/n_in",
          caption: "The factor of 2 is the correction for ReLU zeroing half its inputs",
        },
        {
          kind: "prose",
          text:
            "ReLU sets every negative pre-activation to zero. On a symmetric input distribution that " +
            "is half of them, so the variance leaving the activation is about half the variance " +
            "entering it. Xavier's derivation assumed a roughly linear activation around zero and " +
            "does not know about that loss; He initialisation restores it by doubling the weight " +
            "variance. Using Xavier with ReLU is not catastrophic in a shallow network and is " +
            "clearly visible in a deep one, where the missing factor compounds.",
        },
        {
          kind: "example",
          title: "The number you would actually use",
          problem: "A dense layer has 512 inputs and a ReLU activation. What standard deviation does He initialisation call for?",
          steps: [
            "He: Var(w) = 2/n_in = 2/512 = 0.00390625.",
            "Standard deviation = √0.00390625.",
          ],
          answer:
            "0.0625. Xavier would have asked for √(1/512) ≈ 0.0442 — a factor of √2 smaller. Applied once, the difference is invisible; applied at every one of thirty layers, it is a factor of 2¹⁵ in the variance reaching the top.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The gain depends on the activation, so it is a property of the pair",
          text:
            "Frameworks expose this as a 'gain': 1 for tanh with Xavier, √2 for ReLU, and other " +
            "values elsewhere. There is no correct initialisation independent of what follows it — " +
            "the scheme is chosen for the activation, which is why changing an activation and " +
            "keeping the initialiser is a quiet way to break a network.",
        },
      ],
    },

    {
      heading: "What softened the problem, and why it did not remove it",
      blocks: [
        {
          kind: "list",
          items: [
            "Normalisation layers rescale activations mid-network, so a badly scaled initialisation is corrected after the first layer rather than compounding. This is much of why modern networks tolerate initialisation choices that would once have been fatal.",
            "Residual connections keep a path of derivative 1, so a poorly scaled block degrades the signal instead of destroying it.",
            "Zero-initialising the last layer inside each residual block makes every block start as an exact identity, so a deep network begins life as a well-behaved shallow one.",
            "The output layer of a classifier is usually initialised small, so the initial predictions are near-uniform and the first loss is close to log(number of classes) — a useful sanity check that a run has started correctly.",
            "Embedding tables are conventionally drawn from a small normal rather than a fan-in rule, since a lookup has no fan-in to speak of.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A first-step loss far from log(k) means something is already wrong",
          text:
            "A ten-class classifier should start at a loss of about ln(10) ≈ 2.303. Starting much " +
            "higher means the output layer is initialised too large and the network is confidently " +
            "wrong; starting much lower usually means a label is leaking into the input. Reading " +
            "that single number before training is the cheapest debugging step available.",
        },
      ],
    },
  ],

  references: [
    { source: "Glorot & Bengio, Understanding the Difficulty of Training Deep Feedforward Neural Networks", locator: "AISTATS 2010" },
    { source: "He et al., Delving Deep into Rectifiers", locator: "ICCV 2015" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§8.4, Parameter Initialization Strategies" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-14-training-at-scale.md" },
  ],
};

const layerNormalization: WikiArticle = {
  conceptId: "layer-normalization",
  summary:
    "Batch normalisation standardises each feature across the examples in a batch. Layer " +
    "normalisation standardises each example across its own features. The difference sounds " +
    "cosmetic and decides everything: layer norm's statistics come from one example, so they do not " +
    "depend on what else is in the batch, do not change between training and inference, and do not " +
    "leak information across positions in a sequence.",

  sections: [
    {
      heading: "Normalising across what",
      blocks: [
        {
          kind: "formula",
          latex: "LN(x) = γ · (x − μ) / √(σ² + ε) + β,   μ and σ² over the feature dimension of one example",
          caption: "Two learned vectors, γ and β, restore the scale and shift the normalisation removed",
        },
        {
          kind: "table",
          headers: ["", "Batch norm", "Layer norm"],
          rows: [
            ["Statistics over", "The batch, per feature", "The features, per example"],
            ["Depends on other examples", "Yes", "No"],
            ["Train and inference differ", "Yes — running averages at inference", "No — identical computation"],
            ["Small batches", "Noisy statistics, degrades", "Unaffected"],
            ["Variable-length sequences", "Awkward: padding pollutes the statistics", "Natural: each token normalises itself"],
            ["Standard home", "Convolutional vision networks", "Transformers and recurrent models"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The learned γ and β are not an afterthought",
          text:
            "Normalising to zero mean and unit variance destroys information the layer might need — " +
            "a sigmoid unit forced to live near zero is stuck in its linear region. The scale and " +
            "shift let the network undo the normalisation where undoing it helps, so the layer's " +
            "worst case is roughly the identity rather than a loss of expressiveness.",
        },
      ],
    },

    {
      heading: "Why a transformer cannot use batch norm",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Sequences vary in length and are padded to a common size. Batch statistics computed over padded positions are statistics of nothing, and masking them correctly is fiddly enough to be a recurring source of silent bugs.",
            "Per-device batches are small at scale — a large model's batch is split across many devices, and each device may hold a handful of sequences. Batch norm's statistics are then estimated from very few samples.",
            "Autoregressive generation runs one sequence at a time. A layer whose output depends on the rest of the batch is a layer whose output depends on who else happened to be served in the same request.",
            "The train/inference asymmetry — batch statistics during training, running averages afterwards — is a second implementation that must match the first. Layer norm has no second implementation.",
          ],
        },
        {
          kind: "example",
          title: "Layer norm on one token",
          problem: "A token's activations are (2, 4, 4, 4, 5, 5, 7, 9). What does layer normalisation produce for the first component, before γ and β?",
          steps: [
            "Mean: (2 + 4 + 4 + 4 + 5 + 5 + 7 + 9)/8 = 40/8 = 5.",
            "Squared deviations: 9, 1, 1, 1, 0, 0, 4, 16 — summing to 32, so the variance is 32/8 = 4 and the standard deviation is 2.",
            "First component: (2 − 5)/2.",
          ],
          answer:
            "−1.5. Note what was not used: no other token, and no other example in the batch. The same eight numbers produce the same output whether they arrive alone or in a batch of a thousand.",
        },
      ],
    },

    {
      heading: "Where the layer goes, and RMSNorm",
      blocks: [
        {
          kind: "formula",
          latex: "Post-norm: x ← LN(x + F(x));    Pre-norm: x ← x + F(LN(x))",
          caption: "The same two components in the other order — and the difference is not stylistic",
        },
        {
          kind: "prose",
          text:
            "In pre-norm the residual stream runs from input to output with nothing applied to it, so " +
            "the identity path stays clean at any depth and gradients reach the early layers " +
            "regardless. In post-norm every block's output passes through a normalisation, so the " +
            "clean path is broken once per block, and deep post-norm transformers famously do not " +
            "train without a learning-rate warmup. Pre-norm is the modern default for that reason, " +
            "and it trades a little final quality for a great deal of stability.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "RMSNorm",
              description:
                "Drops the mean subtraction and the shift, dividing by the root mean square alone. Cheaper, one fewer parameter vector, and empirically no worse — which suggests the re-centring was never the part that mattered.",
            },
            {
              term: "Group norm",
              description:
                "Splits the channels into groups and normalises within each. The compromise used in vision when batches are too small for batch norm.",
            },
            {
              term: "The ε",
              description:
                "Added inside the square root so a constant feature vector does not divide by zero. Its value is not free at low precision: too small and the reciprocal overflows in fp16.",
            },
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Ba, Kiros & Hinton, Layer Normalization", locator: "2016" },
    { source: "Xiong et al., On Layer Normalization in the Transformer Architecture", locator: "ICML 2020" },
    { source: "Zhang & Sennrich, Root Mean Square Layer Normalization", locator: "NeurIPS 2019" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-14-training-at-scale.md" },
  ],
};

const learningRateSchedules: WikiArticle = {
  conceptId: "learning-rate-schedules",
  summary:
    "The learning rate is the one hyperparameter that is a function of time rather than a number. " +
    "Early in training the gradient direction is reliable but the optimiser's own statistics are " +
    "not, so the rate should be small and rising; late in training the model is near a minimum and " +
    "a large step only bounces around it, so the rate should decay. Almost every modern run is that " +
    "shape: warm up, then decay.",

  sections: [
    {
      heading: "One rate is wrong at both ends",
      blocks: [
        {
          kind: "table",
          headers: ["Phase", "Too small", "Too large"],
          rows: [
            ["First steps", "Wastes compute, but recovers", "Divergence or a permanent bad region — the failure that ends runs"],
            ["Middle", "Slow but sound progress", "Loss plateaus above where it should, or oscillates"],
            ["End", "Converges to a sharper local region", "Bounces around the minimum and never settles"],
          ],
        },
        {
          kind: "formula",
          latex: "η(t) = η_max · t/T_w  for t < T_w;   η(t) = η_min + ½(η_max − η_min)(1 + cos(π · (t − T_w)/(T − T_w)))  after",
          caption: "Linear warmup into a cosine decay — the default shape for large model training",
        },
        {
          kind: "example",
          title: "Reading a schedule at two points",
          problem: "A run warms up linearly over 2,000 steps to a peak of 3 x 10⁻⁴, then decays by cosine to zero over the remaining steps. What is the rate at step 500, and at the halfway point of the decay?",
          steps: [
            "Warmup is linear: at step 500 of 2,000 the rate is (500/2000) x 3 x 10⁻⁴.",
            "Halfway through a cosine decay to zero, cos(π/2) = 0, so the factor is ½(1 + 0) = ½.",
            "Half of the peak is 1.5 x 10⁻⁴.",
          ],
          answer:
            "7.5 x 10⁻⁵ at step 500, and 1.5 x 10⁻⁴ at the midpoint of the decay. The cosine's virtue is the shape at the ends: it leaves the peak slowly and approaches zero slowly, spending its budget where the rate change matters and not on the transitions.",
        },
      ],
    },

    {
      heading: "What warmup is actually for",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Adam's second moment is unreliable at first",
              description:
                "The per-parameter step size divides by a running estimate of the gradient's magnitude. In the first few steps that estimate is built from almost no samples, so its variance is large and a parameter can receive an enormous step from a fluke. Warmup keeps the multiplier small until the estimate has settled.",
            },
            {
              term: "Post-norm architectures need it structurally",
              description:
                "Without a clean residual path, gradient magnitudes at initialisation vary sharply with depth, and a full-size step early on moves the deep layers far more than the shallow ones. Pre-norm reduces this, which is why pre-norm models tolerate shorter warmups.",
            },
            {
              term: "Large batches make each step more consequential",
              description:
                "A bigger batch justifies a bigger rate — the linear scaling rule — but a bigger rate applied to an unsettled optimiser is exactly the divergence risk above. Warmup is what makes large-batch training work in practice.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A diverging run in the first hundred steps is a schedule problem, not a model problem",
          text:
            "Loss going to NaN early almost always means the rate reached full size before the " +
            "optimiser's statistics did, or that a normalisation is missing where the architecture " +
            "assumes one. Lengthening warmup and lowering the peak fixes far more of these than any " +
            "change to the model does.",
        },
      ],
    },

    {
      heading: "The other schedules, and how to choose",
      blocks: [
        {
          kind: "list",
          items: [
            "Step decay — divide by ten at fixed epochs. The classic vision recipe; the loss curve shows a visible drop at each step, which is diagnostic and also slightly misleading.",
            "Cosine to a floor — decay to about a tenth of the peak rather than to zero, so a run can be continued rather than being finished by its own schedule.",
            "Linear decay — as good as cosine in most language-model comparisons, and easier to reason about when the total step count changes.",
            "One-cycle — warm up to a high peak, then decay below the starting rate. Aggressive, effective for short runs.",
            "Reduce-on-plateau — cut the rate when validation stops improving. Reactive rather than planned, and awkward at scale where a run's length is fixed by a compute budget.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The schedule is entangled with the total step count",
          text:
            "A cosine schedule spends its decay over a horizon fixed in advance. Stopping a run at " +
            "60% of that horizon does not give you a 60%-length run — it gives you a run whose rate " +
            "never decayed properly, which is measurably worse than the same compute spent under a " +
            "schedule set for that length. This is why the length of a training run is a decision " +
            "made before it starts, not during it.",
        },
      ],
    },
  ],

  references: [
    { source: "Loshchilov & Hutter, SGDR: Stochastic Gradient Descent with Warm Restarts", locator: "ICLR 2017" },
    { source: "Goyal et al., Accurate, Large Minibatch SGD", locator: "2017, on warmup and linear scaling" },
    { source: "Smith, A Disciplined Approach to Neural Network Hyper-Parameters", locator: "2018 (one-cycle)" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-14-training-at-scale.md" },
  ],
};

const dataAugmentation: WikiArticle = {
  conceptId: "data-augmentation",
  summary:
    "Augmentation manufactures training examples by transforming the ones you have in ways that " +
    "should not change the label. Every transform is therefore a claim about an invariance — and " +
    "the method is only as good as that claim. It is the cheapest regularisation available when the " +
    "claim is true, and a way of training a model on wrong labels when it is not.",

  sections: [
    {
      heading: "An invariance you already believe",
      blocks: [
        {
          kind: "prose",
          text:
            "A horizontally flipped cat is a cat, so flipping is free supervision about a symmetry " +
            "the data has and the model does not know. A horizontally flipped 6 is not a 6, and a " +
            "horizontally flipped chest X-ray has its heart on the wrong side. The transform is " +
            "identical in all three cases; what differs is whether the invariance holds. This is why " +
            "augmentation choices do not transfer between domains and why copying a vision recipe " +
            "into a medical or text pipeline is a common and expensive mistake.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is an architectural prior expressed in the data",
          text:
            "A convolution builds translation invariance into the weights, where it cannot be " +
            "unlearned. Augmentation builds an invariance into the *data*, where the model has to " +
            "learn it but can also learn its limits. That makes augmentation the softer instrument: " +
            "it is how you express a belief you are only mostly sure about.",
        },
        {
          kind: "table",
          headers: ["Domain", "Standard transforms", "The claim being made"],
          rows: [
            ["Images", "Random crop, horizontal flip, colour jitter, rotation", "Object identity survives position, mirroring, lighting and small rotation"],
            ["Images (mixing)", "Mixup, CutMix", "A blend of two images deserves a blend of their labels — a claim about the model's behaviour between examples, not about the images"],
            ["Audio", "Time shift, pitch shift, SpecAugment masking", "The content survives small shifts and the loss of a frequency band or a time slice"],
            ["Text", "Back-translation, token dropout, synonym swap", "Meaning survives paraphrase — the weakest of these claims, and why text augmentation is used least"],
            ["Tabular", "SMOTE and relatives", "Interpolating between two minority-class rows produces a plausible row — often false when features are categorical or constrained"],
          ],
        },
      ],
    },

    {
      heading: "How much it buys",
      blocks: [
        {
          kind: "example",
          title: "Counting the crops",
          problem: "A 256 x 256 image is randomly cropped to 224 x 224 during training. How many distinct crops exist, and does the count tell you how much augmentation helps?",
          steps: [
            "Horizontal offsets: 256 − 224 + 1 = 33. Vertical offsets: the same 33.",
            "Distinct crops: 33 x 33.",
            "With horizontal flipping, double it.",
          ],
          answer:
            "1,089 crops, or 2,178 with flips. But the count overstates the gain badly: neighbouring crops share almost every pixel, so these are not 1,089 independent examples — they are one example with a small amount of jitter. Augmentation's benefit comes from the invariance it teaches, not from the cardinality it appears to add.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Augment after the split, never before",
          text:
            "Augmenting the dataset and then splitting it puts near-duplicates of the same source " +
            "example on both sides of the split. The validation score then measures how well the " +
            "model recognises images it has effectively already seen, and it can be many points " +
            "optimistic. This is data leakage in its most easily missed form, and it is invisible in " +
            "the metrics that are supposed to catch leakage.",
        },
      ],
    },

    {
      heading: "Test time, and the modern role",
      blocks: [
        {
          kind: "list",
          items: [
            "Augmentation is a training-time transform. The validation and test pipelines apply only the deterministic preprocessing — a centre crop, the same normalisation — so that a score is comparable across epochs and runs.",
            "Test-time augmentation is the deliberate exception: average the model's predictions over several augmented copies of a test input. It reliably buys a little accuracy for a multiple of the inference cost, which makes it a competition technique more than a production one.",
            "Strong augmentation and heavy regularisation overlap. A model trained with aggressive augmentation often needs less dropout and less weight decay, and tuning all three independently wastes trials.",
            "In self-supervised learning augmentation stops being a regulariser and becomes the task itself: what a contrastive model treats as the same thing is exactly what its augmentations declare interchangeable.",
            "For generative models the calculus changes: augmentations leak into the samples, so a flip-augmented image model will happily generate mirrored text.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Shorten & Khoshgoftaar, A Survey on Image Data Augmentation", locator: "Journal of Big Data 6, 2019" },
    { source: "Zhang et al., mixup: Beyond Empirical Risk Minimization", locator: "ICLR 2018" },
    { source: "Cubuk et al., RandAugment", locator: "NeurIPS 2020" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-14-training-at-scale.md" },
  ],
};

const mixedPrecisionTraining: WikiArticle = {
  conceptId: "mixed-precision-training",
  summary:
    "Mixed precision runs the expensive parts of training in 16-bit arithmetic and keeps the " +
    "numerically delicate parts in 32-bit. The result is roughly half the activation memory and a " +
    "large speedup on hardware with dedicated half-precision units, in exchange for one real " +
    "hazard: fp16's smallest representable magnitude is large enough that ordinary gradients " +
    "underflow to zero.",

  sections: [
    {
      heading: "What 16 bits cannot hold",
      blocks: [
        {
          kind: "table",
          headers: ["Format", "Exponent bits", "Mantissa bits", "Smallest normal", "Largest", "Character"],
          rows: [
            ["fp32", "8", "23", "≈ 1.2 x 10⁻³⁸", "≈ 3.4 x 10³⁸", "The reference"],
            ["fp16", "5", "10", "≈ 6.1 x 10⁻⁵", "65,504", "Precise, narrow — overflows and underflows"],
            ["bf16", "8", "7", "≈ 1.2 x 10⁻³⁸", "≈ 3.4 x 10³⁸", "Imprecise, wide — fp32's range with fewer digits"],
          ],
          caption: "The two 16-bit formats spend their bits differently, and the difference decides which hazard you get",
        },
        {
          kind: "prose",
          text:
            "The choice is between range and precision. fp16 keeps more significant digits but its " +
            "exponent runs out early, so small gradients flush to zero and large intermediate values " +
            "overflow to infinity. bf16 keeps fp32's exponent and throws away digits instead, so " +
            "nothing underflows and nothing overflows — which is why bf16 needs no loss scaling and " +
            "has become the default wherever the hardware supports it.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Gradients live exactly where fp16 runs out",
          text:
            "Late in training, gradient magnitudes of 10⁻⁷ or 10⁻⁸ are entirely ordinary. fp16's " +
            "smallest normal value is about 6 x 10⁻⁵. Those gradients do not become imprecise — they " +
            "become zero, silently, and the affected parameters simply stop learning while the loss " +
            "curve looks plausible.",
        },
      ],
    },

    {
      heading: "Loss scaling",
      blocks: [
        {
          kind: "formula",
          latex: "backward(S · L)  ⇒  gradients scaled by S;   unscale by 1/S before the optimiser step",
          caption: "Multiply the loss, shift every gradient into fp16's representable range, divide before updating",
        },
        {
          kind: "prose",
          text:
            "Because differentiation is linear, scaling the loss by a constant scales every gradient " +
            "by the same constant. That moves the whole distribution of gradient magnitudes up into " +
            "the representable range, and dividing by S before the optimiser step leaves the update " +
            "mathematically identical. A dynamic scaler tunes S automatically: raise it while steps " +
            "succeed, and on an inf or NaN, halve it and skip that step.",
        },
        {
          kind: "example",
          title: "Rescuing a gradient",
          problem: "A gradient of 1 x 10⁻⁸ would flush to zero in fp16. What does a loss scale of 2¹⁶ = 65,536 do to it?",
          steps: [
            "Scaled gradient: 1 x 10⁻⁸ x 65,536.",
            "That is 6.5536 x 10⁻⁴, comfortably above fp16's smallest normal of ≈ 6.1 x 10⁻⁵.",
            "The optimiser divides by 65,536 before applying the update.",
          ],
          answer:
            "6.5536 x 10⁻⁴ — representable, so the information survives the backward pass and the update is the one full precision would have made. Note that skipping a step on overflow is not a fudge: the alternative is applying an update computed from an infinity.",
        },
      ],
    },

    {
      heading: "What stays in 32 bits, and what it costs in memory",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Master weights",
              description:
                "The optimiser keeps an fp32 copy of every parameter. Updates are often smaller than the gap between adjacent fp16 values, so adding them to an fp16 weight would round to no change at all — the update would vanish rather than accumulate.",
            },
            {
              term: "Optimiser moments",
              description:
                "Adam's running averages are accumulations over thousands of steps, which is exactly the pattern that makes rounding error compound. They stay fp32.",
            },
            {
              term: "Reductions and softmax",
              description:
                "Sums over long vectors, normalisation statistics and the softmax's exponentials accumulate in fp32 even when their inputs are half precision.",
            },
            {
              term: "The forward and backward matmuls",
              description:
                "Everything expensive. These are the operations the hardware's half-precision units accelerate, and they are the reason the technique exists.",
            },
          ],
        },
        {
          kind: "example",
          title: "Where the memory actually goes",
          problem: "For a 1-billion-parameter model trained with Adam in mixed precision, how many bytes per parameter does the model state require?",
          steps: [
            "fp16 working weights: 2 bytes. fp32 master weights: 4 bytes.",
            "Adam's two moments in fp32: 4 + 4 = 8 bytes.",
            "Total: 2 + 4 + 8 = 14 bytes per parameter, before any activations or gradients.",
          ],
          answer:
            "14 GB for a 1B model — against the 2 GB the weights alone suggest. This arithmetic is why 'the model fits in memory' is the wrong question during training, and it is what sharding the optimiser state across devices is designed to fix.",
        },
      ],
    },
  ],

  references: [
    { source: "Micikevicius et al., Mixed Precision Training", locator: "ICLR 2018" },
    { source: "Kalamkar et al., A Study of BFLOAT16 for Deep Learning Training", locator: "2019" },
    { source: "Rajbhandari et al., ZeRO: Memory Optimizations Toward Training Trillion Parameter Models", locator: "SC 2020" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-14-training-at-scale.md" },
  ],
};

const distributedTraining: WikiArticle = {
  conceptId: "distributed-training",
  summary:
    "Once a run outgrows one device there are three things you can split: the batch, the individual " +
    "layers, or the sequence of layers. Each splits a different resource and pays a different " +
    "communication bill, and the choice is forced by which limit you hit first — time per step, " +
    "or memory.",

  sections: [
    {
      heading: "Three axes",
      blocks: [
        {
          kind: "table",
          headers: ["", "What is split", "What is communicated", "Solves"],
          rows: [
            ["Data parallel", "The batch; every device holds all weights", "Gradients, all-reduced every step", "Time per step, when the model fits"],
            ["Tensor (model) parallel", "Individual weight matrices across devices", "Activations, several times per layer", "A single layer that does not fit"],
            ["Pipeline parallel", "The layer stack into consecutive stages", "Activations at stage boundaries only", "A model that does not fit, with modest communication"],
            ["Sharded data parallel (ZeRO / FSDP)", "Optimiser state, gradients and weights across devices", "Weight shards gathered just in time", "Memory, while keeping the data-parallel programming model"],
          ],
        },
        {
          kind: "prose",
          text:
            "Data parallelism is the default because it is nearly free to reason about: every " +
            "device runs the same program on different examples, and one all-reduce per step keeps " +
            "them identical. Its communication is the whole gradient — proportional to the model " +
            "size and independent of the batch — so it stops being cheap exactly when the model " +
            "becomes large, which is when the other two axes are introduced.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Tensor parallelism belongs inside a machine",
          text:
            "Splitting a matmul means exchanging activations several times per layer, so it is only " +
            "viable across devices joined by a very fast interconnect — typically within one node. " +
            "Pipeline and data parallelism tolerate slower links. Real configurations are therefore " +
            "3-D: tensor parallel within a node, pipeline across a few nodes, data parallel across " +
            "everything else.",
        },
      ],
    },

    {
      heading: "The pipeline bubble",
      blocks: [
        {
          kind: "formula",
          latex: "bubble fraction = (P − 1) / (M + P − 1)",
          caption: "P pipeline stages, M microbatches per step — the share of time a device spends idle",
        },
        {
          kind: "example",
          title: "Why microbatches exist",
          problem: "A model is split into 4 pipeline stages and each step is divided into 8 microbatches. What fraction of device time is idle?",
          steps: [
            "Bubble fraction = (P − 1)/(M + P − 1) = 3/(8 + 3).",
            "3/11 ≈ 0.273.",
            "With 32 microbatches instead: 3/35 ≈ 0.086.",
          ],
          answer:
            "About 27% idle at 8 microbatches, and about 9% at 32. The bubble is the cost of the stages waiting to be filled and drained, and the only lever is more microbatches per step — which needs a larger batch, which is the constraint that ties this choice to the learning-rate schedule.",
        },
      ],
    },

    {
      heading: "What a large batch does to the schedule",
      blocks: [
        {
          kind: "example",
          title: "The global batch is a product",
          problem: "64 devices, 8 sequences per device, and gradients accumulated over 4 micro-steps before each update. What is the global batch size?",
          steps: [
            "Per device per micro-step: 8.",
            "Across devices: 8 x 64 = 512.",
            "Across accumulation steps: 512 x 4.",
          ],
          answer:
            "2,048 sequences per optimiser step. Gradient accumulation is what lets a fixed hardware allocation hit a target batch size — the arithmetic is the same as adding devices, traded against wall-clock time per step.",
        },
        {
          kind: "list",
          items: [
            "The linear scaling rule: multiply the batch by k and the learning rate by k, with a warmup long enough to survive the larger steps. It holds well over a wide range and then stops.",
            "Where it stops is the critical batch size — beyond it, doubling the batch stops halving the number of steps needed, and the extra devices buy nothing. Gradient noise scale is the standard estimate of where that point is.",
            "Larger batches mean fewer optimiser steps for the same data, so schedules expressed in steps have to be rewritten when the batch changes. Expressing them in tokens or examples avoids a whole class of mistakes.",
            "Synchronous data parallelism runs at the speed of the slowest device each step. One straggler slows every device, which is why throughput monitoring at scale watches the variance across devices, not just the mean.",
            "Checkpointing is part of the design at this scale, not an afterthought: a run of thousands of device-days will lose devices, and the recovery unit is the checkpoint interval.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Activation memory scales with batch, weights do not",
          text:
            "It is easy to conclude a model does not fit when what does not fit is the batch. " +
            "Activation checkpointing — discarding intermediate activations and recomputing them " +
            "during the backward pass — trades roughly 30% more compute for a large reduction in " +
            "memory, and it is usually the first thing to try before reaching for another axis of " +
            "parallelism.",
        },
      ],
    },
  ],

  references: [
    { source: "Goyal et al., Accurate, Large Minibatch SGD", locator: "2017, on the linear scaling rule" },
    { source: "Huang et al., GPipe: Efficient Training of Giant Neural Networks", locator: "NeurIPS 2019" },
    { source: "Shoeybi et al., Megatron-LM: Training Multi-Billion Parameter Language Models", locator: "2019, on tensor parallelism" },
    { source: "McCandlish et al., An Empirical Model of Large-Batch Training", locator: "2018, on the critical batch size" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-14-training-at-scale.md" },
  ],
};

export const ml14TrainingAtScale: WikiArticle[] = [
  weightInitialization,
  layerNormalization,
  learningRateSchedules,
  dataAugmentation,
  mixedPrecisionTraining,
  distributedTraining,
];
