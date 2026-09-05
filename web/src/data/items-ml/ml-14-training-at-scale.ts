import type { Item } from "../../lib/assessment/types";
import { ML_14 } from "./sources";

/**
 * Cluster 14 — training deep networks at scale. Eight items per concept, two
 * each at recall, apply, explain and transfer. Authored directly in typed form;
 * see `assessments/ml-14-training-at-scale.md` for the design record.
 *
 * The numeric items here are the arithmetic a practitioner actually does before
 * a run: the standard deviation an initialiser asks for, the rate at a given
 * step of a schedule, the bytes per parameter an optimiser needs, the fraction
 * of a pipeline that sits idle. Each was computed twice.
 */
export const ml14Items: Item[] = [
  // --- Weight Initialization ------------------------------------------------
  {
    id: "weight-initialization--recall-why-not-zero",
    conceptId: "weight-initialization",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Why can a layer's weights not all be initialised to the same value?",
    rubric: {
      elements: [
        {
          id: "symmetry",
          description:
            "Every unit would compute the same function, receive the same gradient, and update identically, so the layer would behave as a single unit no matter how wide it is.",
          weight: 4,
          required: true,
        },
        {
          id: "purpose",
          description:
            "Randomness at initialisation exists to break that symmetry, not to introduce useful noise.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["weight-initialization", "neural-networks"],
    source: ML_14,
    status: "live",
  },
  {
    id: "weight-initialization--recall-he-vs-xavier",
    conceptId: "weight-initialization",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "He initialisation uses twice the weight variance Xavier does. What is the factor of 2 correcting for?",
    choices: [
      {
        id: "a",
        text: "ReLU zeroing roughly half of its inputs, which halves the variance passed on",
        correct: true,
      },
      {
        id: "b",
        text: "The backward pass, which doubles the effective fan-in",
        correct: false,
        misconception: {
          id: "he-factor-attributed-to-backward-pass",
          description:
            "Balancing forward and backward is why Xavier uses the average of fan-in and fan-out, not why He uses a 2. The 2 is about the activation.",
          blameConceptId: "weight-initialization",
        },
      },
      {
        id: "c",
        text: "Deeper networks, which need larger weights the deeper they get",
        correct: false,
        misconception: {
          id: "he-factor-thought-depth-dependent",
          description:
            "Both schemes set a per-layer factor of 1 precisely so that depth does not enter. A depth-dependent initialiser would be the thing they are designed to avoid.",
          blameConceptId: "weight-initialization",
        },
      },
      {
        id: "d",
        text: "The bias terms, which contribute their own variance",
        correct: false,
        misconception: {
          id: "he-factor-attributed-to-biases",
          description:
            "Biases are conventionally initialised at zero and contribute nothing here. The derivation concerns the weight-input products only.",
          blameConceptId: "weight-initialization",
        },
      },
    ],
    difficulty: 0.7,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["weight-initialization", "activation-functions"],
    source: ML_14,
    status: "live",
  },
  {
    id: "weight-initialization--apply-he-std",
    conceptId: "weight-initialization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A dense layer has 512 inputs and a ReLU activation. What standard deviation does He initialisation call for? Give the answer to four decimal places.",
    answerKey: 0.0625,
    tolerance: 0.0001,
    difficulty: 0.8,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["weight-initialization", "variance"],
    source: ML_14,
    status: "live",
  },
  {
    id: "weight-initialization--apply-initial-loss",
    conceptId: "weight-initialization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A ten-class classifier is initialised so that its first predictions are near-uniform. What cross-entropy loss should the first training step report, in nats to three decimal places?",
    answerKey: 2.303,
    tolerance: 0.001,
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["weight-initialization", "loss-functions"],
    source: ML_14,
    status: "live",
  },
  {
    id: "weight-initialization--explain-variance-argument",
    conceptId: "weight-initialization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Derive why Xavier initialisation sets Var(w) = 1/n, and explain what goes wrong at 0.5/n and at 2/n in a thirty-layer network.",
    rubric: {
      elements: [
        {
          id: "derivation",
          description:
            "A pre-activation is a sum of n independent weight-input products, and variances of independent terms add, so Var(y) = n·Var(w)·Var(x). Setting n·Var(w) = 1 preserves the variance layer to layer.",
          weight: 4,
          required: true,
        },
        {
          id: "compounding",
          description:
            "The factor applies once per layer, so across depth d the signal scales by (n·Var(w))^d — an exponential in depth. At 0.5/n that is 0.5³⁰ ≈ 10⁻⁹ and the signal is gone; at 2/n it is 2³⁰ ≈ 10⁹ and it saturates or overflows.",
          weight: 4,
          required: true,
        },
        {
          id: "gradient",
          description: "Notes that the same argument runs backwards, which is why the gradient dies or explodes with the signal.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["weight-initialization", "variance", "neural-networks"],
    source: ML_14,
    status: "live",
  },
  {
    id: "weight-initialization--explain-why-it-matters-less-now",
    conceptId: "weight-initialization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Two architectural changes made modern networks far less sensitive to initialisation: layers that rescale activations partway through the network, and connections that add a block's input back to its output. Explain why each one reduces the sensitivity, and why initialisation still is not free.",
    rubric: {
      elements: [
        {
          id: "normalisation",
          description:
            "Rescaling activations partway through resets their scale, so a badly scaled initialisation is corrected after a layer or two instead of compounding as a power of the depth.",
          weight: 3,
          required: true,
        },
        {
          id: "residual",
          description:
            "Residual connections keep a path of derivative 1, so a poorly scaled block degrades the signal rather than destroying it.",
          weight: 3,
          required: true,
        },
        {
          id: "still-matters",
          description:
            "The first forward pass still happens before any normalisation has been calibrated, very deep or unnormalised stacks still diverge, and the output layer's scale still decides whether training starts from confident nonsense.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["weight-initialization", "activation-functions", "variance"],
    source: ML_14,
    status: "live",
  },
  {
    id: "weight-initialization--transfer-first-loss-diagnostic",
    conceptId: "weight-initialization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A colleague's 100-class classifier reports a first-step loss of 11.2. What should it be, what does the discrepancy indicate, and what would a first-step loss of 0.4 indicate instead?",
    rubric: {
      elements: [
        {
          id: "expected",
          description: "Near-uniform predictions over 100 classes give ln(100) ≈ 4.605.",
          weight: 3,
          required: true,
        },
        {
          id: "too-high",
          description:
            "11.2 is far above that, so the output layer's initial logits are large: the model starts confidently wrong, which is an output-layer scale that is too big.",
          weight: 4,
          required: true,
        },
        {
          id: "too-low",
          description:
            "0.4 is far below chance before any learning has happened, which is not possible from the input alone — it points to a label leaking into the features.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["weight-initialization", "loss-functions"],
    source: ML_14,
    status: "live",
  },
  {
    id: "weight-initialization--transfer-activation-swap",
    conceptId: "weight-initialization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team swaps every tanh in a 40-layer network for a ReLU and keeps the Xavier initialiser. Training, which used to work, now stalls. Explain the mechanism.",
    rubric: {
      elements: [
        {
          id: "mismatch",
          description:
            "Xavier's derivation assumes an activation roughly linear near zero; ReLU discards half its input, so each layer loses about half the variance and the initialiser no longer preserves it.",
          weight: 4,
          required: true,
        },
        {
          id: "compounding",
          description:
            "The missing factor of about ½ applies at every layer, so over 40 layers the signal reaching the top is smaller by an enormous factor and the early layers receive essentially no gradient.",
          weight: 4,
          required: true,
        },
        {
          id: "fix",
          description: "The fix is the matching initialiser — He, with variance 2/n — not a change to the architecture.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["weight-initialization", "activation-functions", "variance"],
    source: ML_14,
    status: "live",
  },

  // --- Layer Normalization --------------------------------------------------
  {
    id: "layer-normalization--recall-axis",
    conceptId: "layer-normalization",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Batch normalisation and layer normalisation both standardise activations. Over what does each compute its mean and variance?",
    rubric: {
      elements: [
        {
          id: "batch",
          description: "Batch norm: over the examples in the batch, separately for each feature.",
          weight: 3,
          required: true,
        },
        {
          id: "layer",
          description: "Layer norm: over the features of a single example, so no other example is involved.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["layer-normalization", "batch-normalization"],
    source: ML_14,
    status: "live",
  },
  {
    id: "layer-normalization--recall-gamma-beta",
    conceptId: "layer-normalization",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why does layer normalisation apply a learned scale γ and shift β after normalising?",
    choices: [
      {
        id: "a",
        text: "So the network can undo the normalisation where zero mean and unit variance are not what the next layer needs",
        correct: true,
      },
      {
        id: "b",
        text: "To keep the output in a fixed range, which normalisation alone does not guarantee",
        correct: false,
        misconception: {
          id: "gamma-beta-read-as-range-control",
          description:
            "Scale and shift widen the achievable range rather than bounding it. Nothing here is guaranteeing a range.",
          blameConceptId: "layer-normalization",
        },
      },
      {
        id: "c",
        text: "To store the running statistics needed at inference time",
        correct: false,
        misconception: {
          id: "gamma-beta-confused-with-running-stats",
          description:
            "Running statistics are a batch-norm mechanism. Layer norm computes its statistics from the example in front of it, at training and inference alike.",
          blameConceptId: "batch-normalization",
        },
      },
      {
        id: "d",
        text: "To make the layer differentiable, which the division would otherwise prevent",
        correct: false,
        misconception: {
          id: "gamma-beta-read-as-differentiability",
          description:
            "The normalisation is already differentiable; the ε in the denominator handles the degenerate case.",
          blameConceptId: "layer-normalization",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["layer-normalization", "batch-normalization"],
    source: ML_14,
    status: "live",
  },
  {
    id: "layer-normalization--apply-one-token",
    conceptId: "layer-normalization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A token's activations are (3, 7, 7, 11). What does layer normalisation output for the first component, before γ and β? Use the population variance (divide by 4) and give the answer to four decimal places.",
    answerKey: -1.4142,
    tolerance: 0.0001,
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["layer-normalization", "variance"],
    source: ML_14,
    status: "live",
  },
  {
    id: "layer-normalization--apply-parameter-count",
    conceptId: "layer-normalization",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A layer-normalisation layer sits on a model dimension of 768, with a learned scale and shift per feature. How many parameters does it hold?",
    answerKey: 1536,
    tolerance: 0.000001,
    difficulty: 0.7,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["layer-normalization"],
    source: ML_14,
    status: "live",
  },
  {
    id: "layer-normalization--explain-why-not-batch-norm",
    conceptId: "layer-normalization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Give three reasons a transformer language model uses layer normalisation rather than batch normalisation.",
    rubric: {
      elements: [
        {
          id: "padding",
          description:
            "Sequences are padded to a common length, so batch statistics would be computed partly over padding, and masking them correctly is an easy thing to get silently wrong.",
          weight: 3,
          required: true,
        },
        {
          id: "small-batches",
          description:
            "Per-device batches are small at scale, so batch statistics would be estimated from very few sequences and would be noisy.",
          weight: 3,
          required: true,
        },
        {
          id: "generation",
          description:
            "Autoregressive generation serves one sequence at a time; a layer whose output depends on the rest of the batch makes a response depend on who else is being served.",
          weight: 3,
          required: true,
        },
        {
          id: "asymmetry",
          description:
            "Mentions the train/inference asymmetry batch norm needs — running averages — which layer norm avoids entirely.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["layer-normalization", "batch-normalization", "transformers"],
    source: ML_14,
    status: "live",
  },
  {
    id: "layer-normalization--explain-pre-vs-post",
    conceptId: "layer-normalization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Compare x ← LN(x + F(x)) with x ← x + F(LN(x)). Why does the second train more reliably at depth?",
    rubric: {
      elements: [
        {
          id: "clean-path",
          description:
            "In the pre-norm form the residual stream runs from input to output with nothing applied to it, so the identity path survives to any depth and gradients reach the early layers.",
          weight: 4,
          required: true,
        },
        {
          id: "post-norm",
          description:
            "In the post-norm form a normalisation sits on the residual path at every block, so the clean path is interrupted once per block and deep post-norm stacks need a warmup to train at all.",
          weight: 4,
          required: true,
        },
        {
          id: "trade",
          description: "Notes the trade: pre-norm buys stability and often gives up a little final quality.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["layer-normalization", "transformers", "backpropagation"],
    source: ML_14,
    status: "live",
  },
  {
    id: "layer-normalization--transfer-rmsnorm",
    conceptId: "layer-normalization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "RMSNorm drops the mean subtraction and the shift, dividing by the root mean square alone, and performs about as well. What does that suggest about which part of layer normalisation was doing the work?",
    rubric: {
      elements: [
        {
          id: "scale-not-centre",
          description:
            "The benefit comes from controlling the scale of the activations, not from re-centring them — if re-centring mattered, removing it would cost accuracy.",
          weight: 4,
          required: true,
        },
        {
          id: "savings",
          description:
            "It also saves a pass over the features and one parameter vector, which is worth having in a layer evaluated twice per block at every token.",
          weight: 3,
          required: true,
        },
        {
          id: "caution",
          description:
            "Notes the limit of the inference: this is an empirical result on transformer-shaped models, not a proof that centring is never useful.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["layer-normalization", "transformers"],
    source: ML_14,
    status: "live",
  },
  {
    id: "layer-normalization--transfer-batch-size-one",
    conceptId: "layer-normalization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A vision model using batch normalisation is deployed to serve one image per request and its accuracy drops sharply against the validation set. Diagnose the likely cause, and say why an equivalent model using layer normalisation would not show it.",
    rubric: {
      elements: [
        {
          id: "running-stats",
          description:
            "At inference batch norm uses running averages collected during training; if those are stale, collected under a different preprocessing, or the deployment forgot to switch out of training mode, the layer normalises with the wrong statistics.",
          weight: 4,
          required: true,
        },
        {
          id: "batch-of-one",
          description:
            "In training mode a batch of one has zero variance per feature, so the normalisation divides by ε and the activations are destroyed — the extreme case of batch norm's dependence on the batch.",
          weight: 4,
          required: true,
        },
        {
          id: "ln-contrast",
          description:
            "Layer norm computes the same statistics from the single example at training and inference, so there is no second code path and no batch to be missing.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["layer-normalization", "batch-normalization"],
    source: ML_14,
    status: "live",
  },

  // --- Learning Rate Schedules ----------------------------------------------
  {
    id: "learning-rate-schedules--recall-standard-shape",
    conceptId: "learning-rate-schedules",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the shape of the learning rate schedule used in almost every large training run, and say what each phase is for.",
    rubric: {
      elements: [
        {
          id: "shape",
          description:
            "A linear warmup from near zero to a peak over the first few thousand steps, then a decay — usually cosine or linear — to zero or to a small floor.",
          weight: 4,
          required: true,
        },
        {
          id: "purpose",
          description:
            "The warmup keeps early steps small while the optimiser's statistics are unreliable; the decay lets the model settle rather than bouncing around a minimum.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["learning-rate-schedules", "sgd-and-adaptive-optimizers"],
    source: ML_14,
    status: "live",
  },
  {
    id: "learning-rate-schedules--recall-warmup-purpose",
    conceptId: "learning-rate-schedules",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the main reason a warmup helps an Adam-trained model?",
    choices: [
      {
        id: "a",
        text: "Adam's running estimate of gradient magnitude is built from very few samples at first, so an early full-size step can be enormous by accident",
        correct: true,
      },
      {
        id: "b",
        text: "The loss surface is steepest at initialisation, so small steps are needed to descend it accurately",
        correct: false,
        misconception: {
          id: "warmup-attributed-to-loss-curvature",
          description:
            "Curvature is not the argument, and Adam's per-parameter scaling already responds to gradient magnitude. What is unreliable early on is the estimate that scaling is divided by.",
          blameConceptId: "sgd-and-adaptive-optimizers",
        },
      },
      {
        id: "c",
        text: "It lets the batch normalisation statistics converge before real training begins",
        correct: false,
        misconception: {
          id: "warmup-confused-with-normalisation-stats",
          description:
            "Normalisation statistics adapt continuously and need no warm-up period. The interaction with normalisation is about which residual ordering is used, not about statistics converging.",
          blameConceptId: "batch-normalization",
        },
      },
      {
        id: "d",
        text: "It prevents overfitting in the early epochs, when the model sees each example for the first time",
        correct: false,
        misconception: {
          id: "warmup-read-as-regularisation",
          description:
            "Warmup is a stability device, not a regulariser: it addresses divergence in the first hundreds of steps, long before overfitting is possible.",
          blameConceptId: "learning-rate-schedules",
        },
      },
    ],
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["learning-rate-schedules", "sgd-and-adaptive-optimizers"],
    source: ML_14,
    status: "live",
  },
  {
    id: "learning-rate-schedules--apply-warmup-value",
    conceptId: "learning-rate-schedules",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A run warms up linearly over 2,000 steps to a peak rate of 3 x 10⁻⁴. What is the learning rate at step 500? Give the answer in units of 10⁻⁵ — that is, report 7.5 for 7.5 x 10⁻⁵.",
    answerKey: 7.5,
    tolerance: 0.001,
    difficulty: 0.7,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["learning-rate-schedules"],
    source: ML_14,
    status: "live",
  },
  {
    id: "learning-rate-schedules--apply-cosine-value",
    conceptId: "learning-rate-schedules",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "After warmup a run decays by cosine from a peak of 4 x 10⁻⁴ to zero, following ½·η_max·(1 + cos(π·p)) where p is the fraction of the decay completed. What is the rate at p = 0.25? Give the answer in units of 10⁻⁴, to four decimal places.",
    answerKey: 3.4142,
    tolerance: 0.0001,
    difficulty: 1.3,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["learning-rate-schedules"],
    source: ML_14,
    status: "live",
  },
  {
    id: "learning-rate-schedules--explain-why-decay",
    conceptId: "learning-rate-schedules",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does a constant learning rate that is right in the middle of training become wrong at the end of it?",
    rubric: {
      elements: [
        {
          id: "near-minimum",
          description:
            "Near a minimum the useful step size is smaller than the noise in the stochastic gradient, so a fixed rate keeps the parameters bouncing in a region around the optimum rather than settling into it.",
          weight: 4,
          required: true,
        },
        {
          id: "noise-floor",
          description:
            "The size of that region scales with the learning rate, so decaying it shrinks the floor the loss can reach — which is why the loss visibly drops when a step decay fires.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["learning-rate-schedules", "gradient-descent", "sgd-and-adaptive-optimizers"],
    source: ML_14,
    status: "live",
  },
  {
    id: "learning-rate-schedules--explain-post-norm-warmup",
    conceptId: "learning-rate-schedules",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Post-norm transformers famously need a warmup and pre-norm ones tolerate a much shorter one. Explain the connection between where the normalisation sits and how long the warmup must be.",
    rubric: {
      elements: [
        {
          id: "post-norm-gradients",
          description:
            "With a normalisation on the residual path at every block, gradient magnitudes at initialisation vary sharply with depth, so a full-size early step moves different layers by wildly different amounts.",
          weight: 4,
          required: true,
        },
        {
          id: "pre-norm",
          description:
            "Pre-norm keeps an unmodified identity path from input to output, so gradients are better behaved from the first step and less has to be waited out.",
          weight: 4,
          required: true,
        },
        {
          id: "conclusion",
          description:
            "Draws the general point: the warmup length is a property of the architecture and optimiser together, not a universal constant to copy between recipes.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["learning-rate-schedules", "layer-normalization", "transformers"],
    source: ML_14,
    status: "live",
  },
  {
    id: "learning-rate-schedules--transfer-early-stop-cosine",
    conceptId: "learning-rate-schedules",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team plans a 100,000-step run with a cosine schedule, then stops at 60,000 steps to save budget. Why is the resulting model worse than one from a run scheduled for 60,000 steps from the start, given identical compute?",
    rubric: {
      elements: [
        {
          id: "unfinished-decay",
          description:
            "A cosine schedule spends its decay across a horizon fixed in advance, so at 60% of a 100,000-step schedule the rate is still well above its floor and the model has never been given the small steps that let it settle.",
          weight: 4,
          required: true,
        },
        {
          id: "correct-alternative",
          description:
            "A schedule set for 60,000 steps completes the same shape within the budget, so the same compute ends at a decayed rate and a converged model.",
          weight: 4,
          required: true,
        },
        {
          id: "practice",
          description:
            "Names the practical consequence: run length is a decision made before training starts, and schedules that decay to a floor rather than to zero are what make a run resumable.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["learning-rate-schedules", "sgd-and-adaptive-optimizers"],
    source: ML_14,
    status: "live",
  },
  {
    id: "learning-rate-schedules--transfer-nan-at-step-80",
    conceptId: "learning-rate-schedules",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A run's loss goes to NaN at step 80 with no warmup configured. Give the two changes most likely to fix it, and explain why a change to the model's architecture or its dataset is unlikely to be the answer.",
    rubric: {
      elements: [
        {
          id: "fixes",
          description:
            "Add or lengthen the warmup, and lower the peak rate — both keep the early steps small while the optimiser's second-moment estimate is still unreliable.",
          weight: 4,
          required: true,
        },
        {
          id: "why-not-model-or-data",
          description:
            "At step 80 the model has seen a negligible fraction of the data and has learned essentially nothing, so the failure is in how it is being stepped rather than in what it is being asked to fit.",
          weight: 4,
          required: true,
        },
        {
          id: "other-suspects",
          description:
            "Mentions a legitimate alternative suspect — gradient clipping, a missing normalisation, or a loss scale under mixed precision.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["learning-rate-schedules", "sgd-and-adaptive-optimizers"],
    source: ML_14,
    status: "live",
  },

  // --- Data Augmentation ----------------------------------------------------
  {
    id: "data-augmentation--recall-what-a-transform-asserts",
    conceptId: "data-augmentation",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What claim is a team making about its data every time it adds an augmentation?",
    rubric: {
      elements: [
        {
          id: "invariance",
          description:
            "That the label is invariant to the transform — the augmented example is still a correct example of the same class.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "If the claim is false, the augmentation is generating mislabelled training data rather than free supervision.",
          weight: 3,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["data-augmentation"],
    source: ML_14,
    status: "live",
  },
  {
    id: "data-augmentation--recall-train-only",
    conceptId: "data-augmentation",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which pipeline applies random augmentation?",
    choices: [
      {
        id: "a",
        text: "Training only — validation and test use the deterministic preprocessing so scores stay comparable",
        correct: true,
      },
      {
        id: "b",
        text: "Training and validation, so the two distributions match",
        correct: false,
        misconception: {
          id: "augmentation-applied-to-validation",
          description:
            "A randomly augmented validation set gives a different score every time it is evaluated, which destroys the one thing a validation score is for: comparability across epochs and runs.",
          blameConceptId: "training-validation-test-set",
        },
      },
      {
        id: "c",
        text: "All three, since the model should be evaluated the way it was trained",
        correct: false,
        misconception: {
          id: "augmentation-applied-everywhere",
          description:
            "The model is evaluated the way it will be used, not the way it was trained. Test-time augmentation exists, but it averages over several copies deliberately rather than sampling one at random.",
          blameConceptId: "data-augmentation",
        },
      },
      {
        id: "d",
        text: "None — augmentation is applied once to the dataset before training begins",
        correct: false,
        misconception: {
          id: "augmentation-as-preprocessing-step",
          description:
            "Augmenting the stored dataset fixes the variety at whatever was generated, and doing it before the split puts near-duplicates on both sides of it. Augmentation is sampled fresh each epoch.",
          blameConceptId: "data-augmentation",
        },
      },
    ],
    difficulty: 0.7,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["data-augmentation", "training-validation-test-set"],
    source: ML_14,
    status: "live",
  },
  {
    id: "data-augmentation--apply-crop-count",
    conceptId: "data-augmentation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A 512 x 512 image is randomly cropped to 448 x 448 during training. How many distinct crops are possible, ignoring flips?",
    answerKey: 4225,
    tolerance: 0.000001,
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["data-augmentation", "convolutional-neural-networks"],
    source: ML_14,
    status: "live",
  },
  {
    id: "data-augmentation--apply-crop-count-meaning",
    conceptId: "data-augmentation",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Random cropping a 512 x 512 image to 448 x 448 yields 4,225 distinct crops per image. Does a 1,000-image dataset therefore behave like a 4.2-million-image one? Explain.",
    rubric: {
      elements: [
        {
          id: "no",
          description:
            "No — neighbouring crops share almost every pixel, so they are one example with jitter rather than thousands of independent examples.",
          weight: 4,
          required: true,
        },
        {
          id: "what-it-does-buy",
          description:
            "The benefit is the invariance being taught (the label does not depend on exact framing), not the cardinality of the augmented set.",
          weight: 4,
          required: true,
        },
        {
          id: "diversity-limit",
          description:
            "Notes that augmentation cannot introduce content the dataset does not contain — 1,000 images of one breed of dog remain 1,000 images of one breed.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["data-augmentation", "overfitting-underfitting"],
    source: ML_14,
    status: "live",
  },
  {
    id: "data-augmentation--explain-flip-domains",
    conceptId: "data-augmentation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Horizontal flipping is standard for natural-image classification, harmful for handwritten digits, and dangerous for chest X-rays. Explain each case in terms of the same underlying claim.",
    rubric: {
      elements: [
        {
          id: "photos",
          description:
            "For natural images the claim holds — a mirrored cat is a cat — so flipping teaches a real symmetry for free.",
          weight: 3,
          required: true,
        },
        {
          id: "digits",
          description:
            "For digits it fails: a mirrored 2 is not a 2, and several digits map onto each other or onto non-digits, so the model is trained on wrong labels.",
          weight: 3,
          required: true,
        },
        {
          id: "xrays",
          description:
            "For chest X-rays it fails in a way that is worse for being subtle: flipping produces an anatomically impossible image with the heart on the wrong side, and situs inversus is a real finding the model should detect rather than learn to ignore.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["data-augmentation"],
    source: ML_14,
    status: "live",
  },
  {
    id: "data-augmentation--explain-vs-architecture-prior",
    conceptId: "data-augmentation",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "A convolution builds translation invariance into the weights; augmentation builds an invariance into the data. Explain the practical difference between the two ways of expressing the same belief.",
    rubric: {
      elements: [
        {
          id: "hard-vs-soft",
          description:
            "The architectural version is a hard constraint the model cannot violate at any setting of its weights; the data version is learned, so the model can also learn the invariance's limits from counterexamples.",
          weight: 4,
          required: true,
        },
        {
          id: "when-each",
          description:
            "That makes augmentation the right instrument for a belief you are only mostly sure about, and the architectural prior the right one for a symmetry that genuinely always holds.",
          weight: 4,
          required: true,
        },
        {
          id: "cost",
          description:
            "Notes the cost of the soft version: it must be learned, so it consumes capacity and training time that the hard constraint gets for free.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["data-augmentation", "convolutional-neural-networks", "bias-variance-tradeoff"],
    source: ML_14,
    status: "live",
  },
  {
    id: "data-augmentation--transfer-leakage",
    conceptId: "data-augmentation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A team augments its 5,000 images to 50,000, shuffles, and then splits 80/20 into training and validation. Validation accuracy is 12 points above what the model achieves in production. Explain the mechanism and the fix.",
    rubric: {
      elements: [
        {
          id: "mechanism",
          description:
            "Augmented copies of the same source image end up on both sides of the split, so the validation set contains near-duplicates of training examples and the score measures recognition of images the model has effectively seen.",
          weight: 5,
          required: true,
        },
        {
          id: "fix",
          description:
            "Split first, by source image, and augment only the training partition — grouping by the underlying source so no source contributes to both sides.",
          weight: 4,
          required: true,
        },
        {
          id: "generalisation",
          description:
            "Notes that the same trap appears with any duplicated or near-duplicated source: multiple frames of one video, several scans of one patient, repeated rows in a log.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["data-augmentation", "training-validation-test-set", "overfitting-underfitting"],
    source: ML_14,
    status: "live",
  },
  {
    id: "data-augmentation--transfer-tuning-interaction",
    conceptId: "data-augmentation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team adds aggressive augmentation and finds their carefully tuned dropout rate and weight decay now hurt. Explain why, and what that says about tuning the three together.",
    rubric: {
      elements: [
        {
          id: "same-budget",
          description:
            "All three limit how closely the model can fit the training data, so they draw on one budget: adding augmentation raises the effective regularisation, and settings tuned without it are now too strong.",
          weight: 4,
          required: true,
        },
        {
          id: "symptom",
          description:
            "The symptom is underfitting — training and validation loss both stalling higher than before, rather than the gap between them widening.",
          weight: 3,
          required: true,
        },
        {
          id: "practice",
          description:
            "Tuning them independently wastes trials because their effects overlap; the standard practice is to fix an augmentation policy first and re-tune the explicit regularisers against it.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["data-augmentation", "overfitting-underfitting", "bias-variance-tradeoff"],
    source: ML_14,
    status: "live",
  },

  // --- Mixed Precision Training ---------------------------------------------
  {
    id: "mixed-precision-training--recall-fp16-vs-bf16",
    conceptId: "mixed-precision-training",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "fp16 and bf16 are both 16 bits. How do they spend those bits differently, and which hazard does each one have?",
    rubric: {
      elements: [
        {
          id: "split",
          description:
            "fp16 gives more bits to the mantissa and fewer to the exponent; bf16 keeps fp32's exponent range and gives up mantissa bits.",
          weight: 4,
          required: true,
        },
        {
          id: "hazards",
          description:
            "fp16 is more precise but underflows and overflows within the range training actually visits; bf16 has fp32's range and simply carries fewer significant digits.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["mixed-precision-training"],
    source: ML_14,
    status: "live",
  },
  {
    id: "mixed-precision-training--recall-master-weights",
    conceptId: "mixed-precision-training",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why does mixed-precision training keep a full-precision copy of every parameter?",
    choices: [
      {
        id: "a",
        text: "Updates are often smaller than the gap between adjacent half-precision values, so adding them to a half-precision weight would round to no change at all",
        correct: true,
      },
      {
        id: "b",
        text: "For checkpointing, so the saved model can be reloaded at full precision",
        correct: false,
        misconception: {
          id: "master-weights-read-as-checkpointing",
          description:
            "A checkpoint could be up-converted at save time. The master copy exists because the update itself would be lost, step after step, if it were applied in half precision.",
          blameConceptId: "mixed-precision-training",
        },
      },
      {
        id: "c",
        text: "Because the forward pass needs full precision to compute the loss accurately",
        correct: false,
        misconception: {
          id: "master-weights-attributed-to-forward-pass",
          description:
            "The forward pass runs in half precision deliberately — that is where the speedup comes from. Only reductions and a few numerically delicate operations accumulate in fp32.",
          blameConceptId: "mixed-precision-training",
        },
      },
      {
        id: "d",
        text: "To detect overflow by comparing the two copies each step",
        correct: false,
        misconception: {
          id: "master-weights-read-as-overflow-check",
          description:
            "Overflow is detected by testing the gradients for inf or NaN, which needs no second copy of the weights.",
          blameConceptId: "mixed-precision-training",
        },
      },
    ],
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["mixed-precision-training", "sgd-and-adaptive-optimizers"],
    source: ML_14,
    status: "live",
  },
  {
    id: "mixed-precision-training--apply-loss-scale",
    conceptId: "mixed-precision-training",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A gradient of 2 x 10⁻⁹ would flush to zero in fp16. A loss scale of 2¹⁵ = 32,768 is applied. What is the scaled gradient? Give the answer in units of 10⁻⁵, to four decimal places.",
    answerKey: 6.5536,
    tolerance: 0.0001,
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["mixed-precision-training", "backpropagation"],
    source: ML_14,
    status: "live",
  },
  {
    id: "mixed-precision-training--apply-optimizer-memory",
    conceptId: "mixed-precision-training",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A 3-billion-parameter model is trained with Adam in mixed precision: fp16 working weights, fp32 master weights, and Adam's two fp32 moments. How many gigabytes does the model state occupy, counting 1 GB as 10⁹ bytes?",
    answerKey: 42,
    tolerance: 0.000001,
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["mixed-precision-training", "sgd-and-adaptive-optimizers"],
    source: ML_14,
    status: "live",
  },
  {
    id: "mixed-precision-training--explain-loss-scaling-valid",
    conceptId: "mixed-precision-training",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why multiplying the loss by a constant and dividing the gradients by it before the update leaves the training mathematically unchanged, and what a dynamic scaler does when it sees an infinity.",
    rubric: {
      elements: [
        {
          id: "linearity",
          description:
            "Differentiation is linear, so scaling the loss by S scales every gradient by exactly S; dividing by S before the optimiser step recovers the original gradient.",
          weight: 4,
          required: true,
        },
        {
          id: "why-it-helps",
          description:
            "The scaling happens before the gradients are stored in half precision, so it moves the whole distribution of magnitudes above fp16's underflow threshold.",
          weight: 3,
          required: true,
        },
        {
          id: "dynamic",
          description:
            "On an inf or NaN the scaler halves S and skips that step entirely — applying an update computed from an overflowed gradient would be worse than losing one step.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["mixed-precision-training", "backpropagation"],
    source: ML_14,
    status: "live",
  },
  {
    id: "mixed-precision-training--explain-why-bf16-no-scaling",
    conceptId: "mixed-precision-training",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Why does bf16 training generally need no loss scaling, and what does it give up in exchange?",
    rubric: {
      elements: [
        {
          id: "range",
          description:
            "bf16 keeps fp32's 8 exponent bits, so its representable range is the same and ordinary gradient magnitudes neither underflow nor overflow — the problem loss scaling solves does not arise.",
          weight: 4,
          required: true,
        },
        {
          id: "precision",
          description:
            "It pays with mantissa bits: roughly 3 significant decimal digits against fp16's 3-4, so individual values are coarser and accumulations are noisier.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Notes that the coarseness is tolerable because the delicate accumulations — reductions, optimiser moments, master weights — are kept in fp32 regardless.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["mixed-precision-training"],
    source: ML_14,
    status: "live",
  },
  {
    id: "mixed-precision-training--transfer-silent-underflow",
    conceptId: "mixed-precision-training",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "An fp16 run without loss scaling trains for a while and then stops improving, with no error and a loss curve that simply flattens. Explain what is most likely happening and why it is silent.",
    rubric: {
      elements: [
        {
          id: "underflow",
          description:
            "As training proceeds gradient magnitudes shrink; once they fall below fp16's smallest normal value they become exactly zero rather than merely imprecise, so those parameters stop receiving updates.",
          weight: 4,
          required: true,
        },
        {
          id: "silence",
          description:
            "Zero is a perfectly valid number, so nothing raises an error — the update is applied, it is just an update of nothing, and the loss curve looks like ordinary convergence.",
          weight: 4,
          required: true,
        },
        {
          id: "diagnosis",
          description:
            "Names a check: inspect the fraction of gradient entries that are exactly zero, or simply enable loss scaling and see whether training resumes.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["mixed-precision-training", "backpropagation", "gradient-descent"],
    source: ML_14,
    status: "live",
  },
  {
    id: "mixed-precision-training--transfer-memory-budget",
    conceptId: "mixed-precision-training",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A colleague says a 7-billion-parameter model 'fits easily' on a 24 GB device because fp16 weights are only 14 GB. What have they left out, and what is the arithmetic they should have done?",
    rubric: {
      elements: [
        {
          id: "optimizer-state",
          description:
            "Training also holds fp32 master weights and Adam's two fp32 moments — 4 + 4 + 4 bytes per parameter on top of the 2 for the working copy, so about 14 bytes per parameter rather than 2.",
          weight: 4,
          required: true,
        },
        {
          id: "arithmetic",
          description:
            "That is roughly 98 GB of model state for 7B parameters, before activations, gradients or the batch — nowhere near 24 GB.",
          weight: 4,
          required: true,
        },
        {
          id: "options",
          description:
            "Names an option that changes the answer: sharding the optimiser state across devices, offloading it, activation checkpointing, or training an adapter instead of the full model.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["mixed-precision-training", "sgd-and-adaptive-optimizers"],
    source: ML_14,
    status: "live",
  },

  // --- Distributed Training -------------------------------------------------
  {
    id: "distributed-training--recall-three-axes",
    conceptId: "distributed-training",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the three things that can be split across devices in a distributed run, and say what each split solves.",
    rubric: {
      elements: [
        {
          id: "data",
          description:
            "Data parallel: split the batch, replicate the weights, all-reduce the gradients. Solves time per step when the model fits.",
          weight: 3,
          required: true,
        },
        {
          id: "tensor",
          description:
            "Tensor or model parallel: split individual weight matrices, communicate activations. Solves a single layer that does not fit.",
          weight: 3,
          required: true,
        },
        {
          id: "pipeline",
          description:
            "Pipeline parallel: split the stack into consecutive stages, communicate only at the boundaries. Solves a model that does not fit, cheaply in communication.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["distributed-training"],
    source: ML_14,
    status: "live",
  },
  {
    id: "distributed-training--recall-what-data-parallel-communicates",
    conceptId: "distributed-training",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In synchronous data-parallel training, what is exchanged between devices each step, and what is its size proportional to?",
    choices: [
      {
        id: "a",
        text: "The gradients, all-reduced — proportional to the number of parameters, and independent of the batch size",
        correct: true,
      },
      {
        id: "b",
        text: "The activations, proportional to the batch size",
        correct: false,
        misconception: {
          id: "data-parallel-confused-with-tensor-parallel",
          description:
            "Exchanging activations is what tensor and pipeline parallelism do. In data parallelism each device runs the whole model on its own examples and never needs another device's activations.",
          blameConceptId: "distributed-training",
        },
      },
      {
        id: "c",
        text: "The weights, broadcast from a parameter server each step",
        correct: false,
        misconception: {
          id: "data-parallel-read-as-weight-broadcast",
          description:
            "Every replica applies the same all-reduced gradient to identical weights, so the copies stay in step without ever being sent. Weight sharding is a different design (ZeRO/FSDP), where they are gathered just in time.",
          blameConceptId: "distributed-training",
        },
      },
      {
        id: "d",
        text: "The training examples, redistributed to balance load",
        correct: false,
        misconception: {
          id: "data-parallel-read-as-data-shuffling",
          description:
            "Each device reads its own shard of the data locally. Moving examples between devices would be the one thing data parallelism is designed to avoid.",
          blameConceptId: "distributed-training",
        },
      },
    ],
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["distributed-training"],
    source: ML_14,
    status: "live",
  },
  {
    id: "distributed-training--apply-global-batch",
    conceptId: "distributed-training",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A run uses 32 devices, 16 sequences per device per micro-step, and accumulates gradients over 2 micro-steps before each optimiser update. What is the global batch size in sequences per update?",
    answerKey: 1024,
    tolerance: 0.000001,
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["distributed-training"],
    source: ML_14,
    status: "live",
  },
  {
    id: "distributed-training--apply-pipeline-bubble",
    conceptId: "distributed-training",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A model is split into 8 pipeline stages and each step is divided into 16 microbatches. Using bubble fraction = (P − 1)/(M + P − 1), what fraction of device time is idle? Give the answer to four decimal places.",
    answerKey: 0.3043,
    tolerance: 0.0001,
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["distributed-training"],
    source: ML_14,
    status: "live",
  },
  {
    id: "distributed-training--explain-tensor-parallel-locality",
    conceptId: "distributed-training",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is tensor parallelism confined to devices inside one machine, while pipeline and data parallelism are used across machines?",
    rubric: {
      elements: [
        {
          id: "frequency",
          description:
            "Splitting a matmul means exchanging activations several times per layer, so the communication is frequent, latency-sensitive and on the critical path of every forward and backward pass.",
          weight: 4,
          required: true,
        },
        {
          id: "others",
          description:
            "Pipeline parallelism communicates only at stage boundaries and data parallelism only once per step, so both tolerate a slower link between machines.",
          weight: 4,
          required: true,
        },
        {
          id: "practice",
          description:
            "Notes the consequence: real configurations are layered — tensor parallel within a node, pipeline across a few nodes, data parallel across everything else.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["distributed-training"],
    source: ML_14,
    status: "live",
  },
  {
    id: "distributed-training--explain-linear-scaling-limit",
    conceptId: "distributed-training",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "The linear scaling rule says to multiply the learning rate by k when multiplying the batch by k. Explain the reasoning behind it and why it eventually stops working.",
    rubric: {
      elements: [
        {
          id: "reasoning",
          description:
            "A k-times larger batch gives a gradient estimate with lower variance, and takes k times fewer steps over the same data, so a proportionally larger step keeps the total distance travelled per epoch roughly unchanged.",
          weight: 4,
          required: true,
        },
        {
          id: "limit",
          description:
            "Past the critical batch size the gradient is already close to the full-data gradient, so further averaging removes almost no noise and doubling the batch no longer halves the steps needed — the extra devices buy nothing.",
          weight: 4,
          required: true,
        },
        {
          id: "warmup",
          description:
            "Notes that the rule needs a warmup to be usable at all, since the enlarged rate applied at initialisation is exactly the divergence risk.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["distributed-training", "learning-rate-schedules", "variance"],
    source: ML_14,
    status: "live",
  },
  {
    id: "distributed-training--transfer-oom-diagnosis",
    conceptId: "distributed-training",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A team hits out-of-memory errors and immediately reaches for pipeline parallelism. Give two cheaper things to check first, and explain what each one addresses.",
    rubric: {
      elements: [
        {
          id: "activations",
          description:
            "Activation memory scales with batch size while weights do not, so the first question is whether the batch is what does not fit — reducing the per-device batch and recovering the global batch with gradient accumulation costs nothing but time.",
          weight: 4,
          required: true,
        },
        {
          id: "checkpointing-or-sharding",
          description:
            "Activation checkpointing recomputes intermediate activations in the backward pass, trading roughly 30% more compute for a large memory saving; sharding the optimiser state across data-parallel ranks removes most of the 12 bytes per parameter Adam holds.",
          weight: 4,
          required: true,
        },
        {
          id: "why-later",
          description:
            "Notes why pipeline parallelism is the later resort: it introduces a bubble, constrains the batch, and complicates the training loop.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["distributed-training", "mixed-precision-training"],
    source: ML_14,
    status: "live",
  },
  {
    id: "distributed-training--transfer-straggler",
    conceptId: "distributed-training",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A 512-device synchronous run is 20% slower than a 256-device one per unit of work, and average device utilisation looks healthy. What should be suspected, and why does the average hide it?",
    rubric: {
      elements: [
        {
          id: "straggler",
          description:
            "A straggler: synchronous training waits for the slowest device at every all-reduce, so one degraded device — a slow link, thermal throttling, a noisy neighbour — sets the pace for all of them.",
          weight: 4,
          required: true,
        },
        {
          id: "average-hides",
          description:
            "The mean utilisation stays high because the other devices are busy waiting or working; what reveals it is the variance across devices and the per-step time distribution rather than its mean.",
          weight: 4,
          required: true,
        },
        {
          id: "scale",
          description:
            "Notes that the probability of at least one degraded device rises with the device count, which is why this appears when scaling up and not before.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["distributed-training", "variance"],
    source: ML_14,
    status: "live",
  },
];
