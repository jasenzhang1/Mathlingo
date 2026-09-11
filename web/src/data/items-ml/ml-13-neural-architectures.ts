import type { Item } from "../../lib/assessment/types";
import { ML_13 } from "./sources";

/**
 * Cluster 13 — neural network architectures. Eight items per concept, two each
 * at recall, apply, explain and transfer. Authored directly in typed form; see
 * `assessments/ml-13-neural-architectures.md` for the design record.
 *
 * The numeric items in this cluster are deliberately small arithmetic on real
 * quantities — parameter counts, gradient products, noise schedules — rather
 * than invented figures, because the point of each one is that the number is
 * the argument. 0.9^50 is why plain deep stacks stopped training; 0.99^100 is
 * why a gate beats a matrix; 2/8 is the whole case for a sparse layer.
 */
export const ml13Items: Item[] = [
  // --- Architecture Families ------------------------------------------------
  {
    id: "architecture-families--recall-what-an-architecture-encodes",
    conceptId: "architecture-families",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In what sense is a choice of architecture a choice of prior about the data?",
    rubric: {
      elements: [
        {
          id: "prior",
          description:
            "The architecture decides which weights exist and which are shared, so it asserts in advance what may interact with what — an assumption about the data, not just a size choice.",
          weight: 4,
          required: true,
        },
        {
          id: "example",
          description:
            "Names at least one concrete case: a convolution asserts that a pattern means the same thing wherever it appears; a recurrence asserts the past reaches the present only through a fixed-size state.",
          weight: 3,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["architecture-families", "convolutional-neural-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "architecture-families--recall-path-lengths",
    conceptId: "architecture-families",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In which family does the number of computation steps between two distant positions in a sequence grow with the distance between them?",
    choices: [
      {
        id: "a",
        text: "A recurrent network — information passes through one state update per intervening step",
        correct: true,
      },
      {
        id: "b",
        text: "A self-attention layer, because it computes scores for every pair",
        correct: false,
        misconception: {
          id: "attention-cost-confused-with-path-length",
          description:
            "Attention's cost is quadratic in length, but its path length is 1 — every position reaches every other directly. Cost and path length are separate axes.",
          blameConceptId: "attention-mechanism",
        },
      },
      {
        id: "c",
        text: "A dense layer, because it has the most weights",
        correct: false,
        misconception: {
          id: "params-confused-with-path-length",
          description:
            "A dense layer connects every input to every output in one step. Parameter count says nothing about how far information has to travel.",
          blameConceptId: "architecture-families",
        },
      },
      {
        id: "d",
        text: "All of them equally, since depth is what sets path length",
        correct: false,
        misconception: {
          id: "path-length-thought-uniform",
          description:
            "Path length differs by family, and it is the property that decides whether long-range dependencies are learnable at all.",
          blameConceptId: "architecture-families",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 50,
    prereqClosure: ["architecture-families", "recurrent-neural-networks", "attention-mechanism"],
    source: ML_13,
    status: "live",
  },
  {
    id: "architecture-families--apply-conv-weight-count",
    conceptId: "architecture-families",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A convolutional layer uses 5 x 5 kernels, takes 16 input channels and produces 32 output channels. How many weights does it hold, excluding biases?",
    answerKey: 12800,
    tolerance: 0.000001,
    difficulty: 0.8,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["architecture-families", "convolutional-neural-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "architecture-families--apply-dense-vs-conv",
    conceptId: "architecture-families",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For a 224 x 224 RGB image, compare the weight count of a dense layer mapping the flattened image to 1,000 units against a 3 x 3 convolution with 3 input and 64 output channels. What does the gap say about the two layers?",
    rubric: {
      elements: [
        {
          id: "dense",
          description: "Dense: 224 x 224 x 3 = 150,528 inputs, so 150,528 x 1,000 ≈ 1.5 x 10^8 weights.",
          weight: 3,
          required: true,
        },
        {
          id: "conv",
          description: "Convolution: 3 x 3 x 3 x 64 = 1,728 weights, reused at every spatial position.",
          weight: 3,
          required: true,
        },
        {
          id: "reading",
          description:
            "The gap (roughly five orders of magnitude) is not an approximation of the dense layer but an assumption: the convolution has asserted translation invariance and deleted every weight that could express a position-dependent detector.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["architecture-families", "convolutional-neural-networks", "neural-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "architecture-families--explain-sharing-vs-regularisation",
    conceptId: "architecture-families",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Weight decay and weight sharing both restrict a model. Why is weight sharing a fundamentally stronger restriction?",
    rubric: {
      elements: [
        {
          id: "penalty-vs-constraint",
          description:
            "Weight decay makes some solutions expensive but leaves them reachable; weight sharing removes the parameters entirely, so the excluded functions cannot be represented at any setting of the weights.",
          weight: 5,
          required: true,
        },
        {
          id: "consequence",
          description:
            "A hard constraint that is wrong about the data cannot be trained away with more data, whereas a penalty can be outweighed by evidence.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["architecture-families", "overfitting-underfitting", "convolutional-neural-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "architecture-families--explain-vit-vs-cnn-data-scale",
    conceptId: "architecture-families",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A vision transformer, which builds in almost no assumption about spatial structure, loses to a convolutional network of similar size on a small dataset and beats it on a very large one. Explain why the ordering flips.",
    rubric: {
      elements: [
        {
          id: "prior-substitutes-for-data",
          description:
            "A correct architectural prior supplies information the model would otherwise have to learn, so it helps most when there is little data to learn it from.",
          weight: 4,
          required: true,
        },
        {
          id: "prior-costs-flexibility",
          description:
            "The same prior also excludes hypotheses, so once data is plentiful enough to learn the structure directly, the restriction only costs the flexibility to model whatever the prior got wrong.",
          weight: 4,
          required: true,
        },
        {
          id: "bias-variance",
          description: "Frames it as the bias-variance trade applied to the architecture rather than to model size.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["architecture-families", "bias-variance-tradeoff", "transformers", "convolutional-neural-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "architecture-families--transfer-wrong-prior",
    conceptId: "architecture-families",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A colleague applies a 1-D convolution across the 40 columns of a tabular dataset, reasoning that it will need far fewer parameters than a dense layer. What has the architecture assumed, and why is the parameter saving not a saving here?",
    rubric: {
      elements: [
        {
          id: "assumption",
          description:
            "A convolution assumes adjacency is meaningful and that the same pattern of neighbouring values means the same thing wherever it occurs along the axis.",
          weight: 4,
          required: true,
        },
        {
          id: "false-here",
          description:
            "Column order in a table is arbitrary — permuting the columns changes the model's output while changing nothing about the data — so the assumption is false and the deleted weights were needed.",
          weight: 4,
          required: true,
        },
        {
          id: "cost",
          description:
            "Fewer parameters bought bias, not efficiency: the model is cheaper and also unable to represent the interactions that matter.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["architecture-families", "convolutional-neural-networks", "bias-variance-tradeoff"],
    source: ML_13,
    status: "live",
  },
  {
    id: "architecture-families--transfer-choose-for-streaming",
    conceptId: "architecture-families",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A model must run on a sensor stream indefinitely, producing an output after every reading, on a device with fixed memory. Which family does the constraint rule out, and why?",
    rubric: {
      elements: [
        {
          id: "rules-out-attention",
          description:
            "Attention over the full history is ruled out: its cost grows with the length of the context and it must keep every past position available, so memory grows without bound on an indefinite stream.",
          weight: 4,
          required: true,
        },
        {
          id: "what-fits",
          description:
            "A recurrent or state space layer carries a fixed-size state and costs the same per reading no matter how long the stream has run.",
          weight: 4,
          required: true,
        },
        {
          id: "cost-acknowledged",
          description:
            "Notes what is given up: a fixed-size state must compress the past, so exact recall of a specific old reading is not guaranteed.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["architecture-families", "attention-mechanism", "recurrent-neural-networks"],
    source: ML_13,
    status: "live",
  },

  // --- Residual Networks ----------------------------------------------------
  {
    id: "residual-networks--recall-block-form",
    conceptId: "residual-networks",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Write the form of a residual block, and say what the block is therefore learning.",
    rubric: {
      elements: [
        {
          id: "form",
          description: "y = F(x) + x — the block's transformation is added to its input rather than replacing it.",
          weight: 4,
          required: true,
        },
        {
          id: "residual",
          description:
            "F is a correction to the input, so 'do nothing useful here' corresponds to F = 0 rather than to learning an identity map.",
          weight: 3,
        },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["residual-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "residual-networks--recall-degradation-evidence",
    conceptId: "residual-networks",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Before residual connections, a 56-layer plain network had higher training error than a 20-layer one. What does the training-set evidence establish?",
    choices: [
      {
        id: "a",
        text: "The failure was optimisation, not capacity or overfitting — the deeper network could represent the shallower one and could not be trained to it",
        correct: true,
      },
      {
        id: "b",
        text: "The deeper network overfits, so it needs more regularisation",
        correct: false,
        misconception: {
          id: "degradation-read-as-overfitting",
          description:
            "Overfitting raises test error while training error falls. Higher error on the training set rules it out — this is the whole reason the measurement was reported on the training set.",
          blameConceptId: "overfitting-underfitting",
        },
      },
      {
        id: "c",
        text: "The deeper network lacks the capacity to fit the data",
        correct: false,
        misconception: {
          id: "degradation-read-as-capacity",
          description:
            "The deeper network contains the shallower one as a special case (extra layers set to the identity), so its capacity is strictly greater.",
          blameConceptId: "residual-networks",
        },
      },
      {
        id: "d",
        text: "The learning rate was too high for that depth",
        correct: false,
        misconception: {
          id: "degradation-read-as-tuning",
          description:
            "The effect survives tuning, which is what made it an architectural problem rather than a hyperparameter one.",
          blameConceptId: "gradient-descent",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["residual-networks", "overfitting-underfitting"],
    source: ML_13,
    status: "live",
  },
  {
    id: "residual-networks--apply-gradient-product",
    conceptId: "residual-networks",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "In a plain 50-layer stack each layer's Jacobian has norm about 0.9. By what factor is the gradient scaled by the time it reaches the first layer? Give the value of 0.9^50 to four significant figures.",
    answerKey: 0.005154,
    tolerance: 0.00001,
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["residual-networks", "backpropagation"],
    source: ML_13,
    status: "live",
  },
  {
    id: "residual-networks--apply-jacobian",
    conceptId: "residual-networks",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Differentiate y = F(x) + x with respect to x, and use the result to say what the addition does to a product of 50 such factors.",
    rubric: {
      elements: [
        {
          id: "jacobian",
          description: "∂y/∂x = I + ∂F/∂x.",
          weight: 4,
          required: true,
        },
        {
          id: "product",
          description:
            "Multiplying 50 such terms expands into a sum over paths, one of which takes the identity term at every block and contributes exactly 1, so the product cannot be driven to zero by depth alone.",
          weight: 4,
          required: true,
        },
        {
          id: "contrast",
          description: "Contrasts with the plain stack, where every path is a product of small factors and 0.9^50 ≈ 0.005.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["residual-networks", "backpropagation", "matrix-calculus"],
    source: ML_13,
    status: "live",
  },
  {
    id: "residual-networks--explain-zero-vs-identity",
    conceptId: "residual-networks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is it easier for a residual block to learn to do nothing than for a plain block to learn the identity?",
    rubric: {
      elements: [
        {
          id: "target",
          description:
            "For a residual block, doing nothing means F = 0 — driving weights toward zero, which is where initialisation starts and where weight decay pulls.",
          weight: 4,
          required: true,
        },
        {
          id: "plain",
          description:
            "A plain block must discover a specific product of matrices and nonlinearities that reproduces its input, which is a narrow target in a very large parameter space and is not favoured by anything in training.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["residual-networks", "backpropagation"],
    source: ML_13,
    status: "live",
  },
  {
    id: "residual-networks--explain-not-amplification",
    conceptId: "residual-networks",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Which statement most accurately describes what a skip connection does to backpropagation?",
    choices: [
      {
        id: "a",
        text: "It adds a path whose local derivative is exactly 1, so the multiplicative chain can no longer drive the gradient to zero",
        correct: true,
      },
      {
        id: "b",
        text: "It amplifies the gradient so deeper layers receive a larger signal",
        correct: false,
        misconception: {
          id: "skip-read-as-amplifier",
          description:
            "Nothing is amplified. The identity term prevents shrinkage; it does not scale the gradient up, and a network relying on amplification would explode instead.",
          blameConceptId: "residual-networks",
        },
      },
      {
        id: "c",
        text: "It normalises the gradient's scale at each block, like batch normalisation",
        correct: false,
        misconception: {
          id: "skip-confused-with-normalisation",
          description:
            "Normalisation rescales activations; a skip changes the network's function by adding the input back. They are complementary, and each works without the other.",
          blameConceptId: "residual-networks",
        },
      },
      {
        id: "d",
        text: "It lets gradients skip the layers entirely, so those layers train on a separate signal",
        correct: false,
        misconception: {
          id: "skip-read-as-bypass",
          description:
            "The gradient flows along both paths and they sum. F still receives gradient through its own branch; nothing is bypassed.",
          blameConceptId: "backpropagation",
        },
      },
    ],
    difficulty: 1.5,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["residual-networks", "backpropagation"],
    source: ML_13,
    status: "live",
  },
  {
    id: "residual-networks--transfer-lstm-analogy",
    conceptId: "residual-networks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A gated recurrent cell carries a memory forward across time by adding to it, multiplying what it keeps by a learned number between 0 and 1. In what sense is that the same mechanism as a residual connection, and in what sense is it more general?",
    rubric: {
      elements: [
        {
          id: "same",
          description:
            "Both create a path along which the state is carried by addition rather than by repeated matrix multiplication, so the derivative along that path does not shrink multiplicatively.",
          weight: 4,
          required: true,
        },
        {
          id: "axis",
          description: "The residual connection runs across depth; the cell state runs across time.",
          weight: 3,
          required: true,
        },
        {
          id: "gate",
          description:
            "The LSTM's path is gated — its per-step factor is a learned forget gate rather than a fixed 1 — so it can also choose to erase, which a plain skip cannot.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["residual-networks", "backpropagation"],
    source: ML_13,
    status: "live",
  },
  {
    id: "residual-networks--transfer-block-deletion",
    conceptId: "residual-networks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "Deleting one layer from a trained plain network destroys its accuracy; deleting one block from a trained residual network of the same depth barely changes it. What does that difference say about what a residual network has learned?",
    rubric: {
      elements: [
        {
          id: "ensemble",
          description:
            "It behaves less like one deep composition and more like an ensemble of many paths of differing lengths, since removing a block removes some paths and leaves the rest intact.",
          weight: 4,
          required: true,
        },
        {
          id: "plain-contrast",
          description:
            "In a plain network there is exactly one path, so every layer is load-bearing and removing any one breaks the composition.",
          weight: 4,
          required: true,
        },
        {
          id: "caveat",
          description:
            "Notes the limit of the reading: the paths share weights and are trained jointly, so this is an analogy for robustness rather than a claim that the network is a literal ensemble.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["residual-networks", "convolutional-neural-networks"],
    source: ML_13,
    status: "live",
  },

  // --- LSTM and GRU ---------------------------------------------------------
  {
    id: "lstm-and-gru--recall-three-gates",
    conceptId: "lstm-and-gru",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the three gates of an LSTM cell and say what each one decides.",
    rubric: {
      elements: [
        {
          id: "gates",
          description:
            "Forget — how much of the previous cell state survives; input — how much of the new candidate is written in; output — how much of the cell state is exposed as this step's hidden state.",
          weight: 5,
          required: true,
        },
        {
          id: "separation",
          description:
            "Notes that keeping the write and the forget decisions separate is what lets a cell hold a value while still reading new input.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["lstm-and-gru"],
    source: ML_13,
    status: "live",
  },
  {
    id: "lstm-and-gru--recall-why-sigmoid-gates",
    conceptId: "lstm-and-gru",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why are the gates sigmoids rather than ReLUs, when ReLU is the default activation everywhere else?",
    choices: [
      {
        id: "a",
        text: "A gate multiplies, and an output in (0, 1) makes that multiplication an interpolation — keep this fraction, discard the rest",
        correct: true,
      },
      {
        id: "b",
        text: "Sigmoids are cheaper to evaluate than ReLUs",
        correct: false,
        misconception: {
          id: "gate-choice-read-as-cost",
          description:
            "ReLU is the cheaper function — a comparison against zero. The sigmoid is chosen despite its cost, for the range it produces.",
          blameConceptId: "activation-functions",
        },
      },
      {
        id: "c",
        text: "Sigmoids avoid the vanishing-gradient problem better than ReLUs",
        correct: false,
        misconception: {
          id: "gate-choice-read-as-gradient-fix",
          description:
            "The reverse is true: the sigmoid saturates and ReLU was adopted to avoid exactly that. The vanishing problem here is solved by the additive cell path, not by the gates' activation.",
          blameConceptId: "activation-functions",
        },
      },
      {
        id: "d",
        text: "The cell state must stay bounded, and only a sigmoid guarantees that",
        correct: false,
        misconception: {
          id: "gate-confused-with-candidate",
          description:
            "Bounding the content is the tanh on the candidate's job. The gate's job is to produce a fraction to multiply by.",
          blameConceptId: "lstm-and-gru",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["lstm-and-gru", "activation-functions"],
    source: ML_13,
    status: "live",
  },
  {
    id: "lstm-and-gru--apply-forget-gate-product",
    conceptId: "lstm-and-gru",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A dimension of an LSTM cell holds its forget gate at 0.99 for 100 consecutive steps. By what factor is a gradient travelling along the cell path scaled over that span? Give 0.99^100 to four significant figures.",
    answerKey: 0.3660,
    tolerance: 0.0001,
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["lstm-and-gru", "recurrent-neural-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "lstm-and-gru--apply-parameter-count",
    conceptId: "lstm-and-gru",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "An LSTM layer has hidden size 128 and input size 64. Each of its four transformations (three gates and the candidate) takes the concatenated [hidden, input] vector and has its own bias. How many parameters does the layer hold in total?",
    answerKey: 98816,
    tolerance: 0.000001,
    difficulty: 1.2,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["lstm-and-gru", "matrix-multiplication"],
    source: ML_13,
    status: "live",
  },
  {
    id: "lstm-and-gru--explain-additive-path",
    conceptId: "lstm-and-gru",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "The cell update is cₜ = fₜ ⊙ cₜ₋₁ + iₜ ⊙ c̃ₜ. Explain why this fixes the vanishing gradient that a plain recurrence suffers, and be precise about what it does not fix.",
    rubric: {
      elements: [
        {
          id: "derivative",
          description:
            "Along the cell path ∂cₜ/∂cₜ₋₁ is the forget gate, so backpropagation multiplies learnable numbers the network can hold near 1 rather than repeatedly multiplying by a weight matrix.",
          weight: 4,
          required: true,
        },
        {
          id: "contrast",
          description:
            "In a plain recurrence the same factor is the recurrent weight matrix, whose repeated product shrinks or explodes according to its singular values, and the network cannot decouple that from the transformation it wants to compute.",
          weight: 3,
          required: true,
        },
        {
          id: "limit",
          description:
            "Only the cell path is protected: gradients flowing through the gates and the candidate still pass through weight matrices and can still vanish, so an LSTM extends the usable range rather than removing the limit.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["lstm-and-gru", "recurrent-neural-networks", "backpropagation"],
    source: ML_13,
    status: "live",
  },
  {
    id: "lstm-and-gru--explain-forget-bias-init",
    conceptId: "lstm-and-gru",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is initialising the forget-gate bias to 1 or 2 a standard trick, and what happens if it is left at zero?",
    rubric: {
      elements: [
        {
          id: "at-zero",
          description:
            "At zero bias the gate starts near σ(0) = 0.5, so a memory is halved every step and is effectively gone within a few dozen steps before training has learned anything.",
          weight: 4,
          required: true,
        },
        {
          id: "positive",
          description:
            "A positive bias starts the gate near 1 — 'keep by default' — so long-range information survives long enough for a gradient to reward keeping it.",
          weight: 4,
          required: true,
        },
        {
          id: "chicken-egg",
          description:
            "Names the circularity being broken: the network cannot learn that a memory was useful if the memory never survives long enough to be used.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["lstm-and-gru", "activation-functions"],
    source: ML_13,
    status: "live",
  },
  {
    id: "lstm-and-gru--transfer-gru-tie",
    conceptId: "lstm-and-gru",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A GRU uses hₜ = (1 − zₜ) ⊙ hₜ₋₁ + zₜ ⊙ h̃ₜ, tying its write to one minus its forget. Which LSTM behaviour does that tie make impossible, and why is the GRU nevertheless often the better default on a small dataset?",
    rubric: {
      elements: [
        {
          id: "impossible",
          description:
            "The GRU cannot write new content without displacing the old in the same proportion — an LSTM can add to a memory while keeping it, because its input and forget gates are independent.",
          weight: 4,
          required: true,
        },
        {
          id: "why-fine",
          description:
            "The GRU has fewer parameters (three transformations rather than four, and no separate output gate), so it has less to estimate and less to overfit when data is limited.",
          weight: 4,
          required: true,
        },
        {
          id: "empirical",
          description: "Notes the two are usually within noise of each other on accuracy, so the choice is rarely decisive.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["lstm-and-gru", "recurrent-neural-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "lstm-and-gru--transfer-why-attention-won",
    conceptId: "lstm-and-gru",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Gating largely solved the long-range gradient problem, yet gated recurrence was displaced at scale by architectures that compute every position of a sequence in one pass. Give the reason that is not about accuracy, and explain why it compounds with hardware.",
    rubric: {
      elements: [
        {
          id: "parallelism",
          description:
            "A recurrence cannot compute step t before step t − 1, so training time scales with sequence length regardless of how many processors are available; an architecture without that dependency computes all positions at once.",
          weight: 5,
          required: true,
        },
        {
          id: "compounding",
          description:
            "On hardware whose throughput grows by adding parallel units, an architecture that cannot use them cannot be scaled up in the same wall-clock budget — so the gap widens into models that are simply larger, not merely faster to train.",
          weight: 3,
          required: true,
        },
        {
          id: "where-recurrence-survives",
          description:
            "Notes where recurrence still wins: streaming inference and very long sequences, where the all-at-once alternatives pay a cost growing faster than linearly in the length.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["lstm-and-gru", "recurrent-neural-networks"],
    source: ML_13,
    status: "live",
  },

  // --- Autoregressive Models ------------------------------------------------
  {
    id: "autoregressive-models--recall-factorisation",
    conceptId: "autoregressive-models",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Write the factorisation an autoregressive model uses for the joint distribution of a sequence, and say what justifies it.",
    rubric: {
      elements: [
        {
          id: "form",
          description: "p(x₁, …, x_n) = Πₜ p(xₜ | x₁, …, xₜ₋₁) — a product of next-step conditionals.",
          weight: 4,
          required: true,
        },
        {
          id: "justification",
          description:
            "It is the chain rule of probability applied repeatedly, so it is an exact identity rather than an approximation; the modelling assumption is only in how each conditional is parameterised.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["autoregressive-models", "conditional-probability"],
    source: ML_13,
    status: "live",
  },
  {
    id: "autoregressive-models--recall-causal-mask",
    conceptId: "autoregressive-models",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the causal mask in an autoregressive transformer for?",
    choices: [
      {
        id: "a",
        text: "It stops each position attending to later positions, so all positions can be trained in parallel without any of them seeing its own answer",
        correct: true,
      },
      {
        id: "b",
        text: "It hides a random subset of tokens so the model learns to fill them in",
        correct: false,
        misconception: {
          id: "causal-confused-with-masked-lm",
          description:
            "That is masked language modelling, a different objective. A causal mask hides the future specifically, and hides it at every position at once.",
          blameConceptId: "autoregressive-models",
        },
      },
      {
        id: "c",
        text: "It reduces the quadratic cost of attention by about half",
        correct: false,
        misconception: {
          id: "causal-read-as-efficiency",
          description:
            "Halving the score matrix is a side effect, not the purpose. Without the mask the objective is meaningless, whatever it costs.",
          blameConceptId: "attention-mechanism",
        },
      },
      {
        id: "d",
        text: "It prevents padding tokens from contributing to the loss",
        correct: false,
        misconception: {
          id: "causal-confused-with-padding-mask",
          description:
            "Padding masks exist too and are a separate mechanism. The causal mask is about temporal order, not about which positions are real.",
          blameConceptId: "autoregressive-models",
        },
      },
    ],
    difficulty: 0.7,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["autoregressive-models", "transformers", "attention-mechanism"],
    source: ML_13,
    status: "live",
  },
  {
    id: "autoregressive-models--apply-perplexity",
    conceptId: "autoregressive-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A language model reaches a mean next-token cross-entropy of 2.0 nats per token on a held-out set. What is its perplexity, to three decimal places?",
    answerKey: 7.389,
    tolerance: 0.001,
    difficulty: 0.8,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["autoregressive-models", "loss-functions"],
    source: ML_13,
    status: "live",
  },
  {
    id: "autoregressive-models--apply-teacher-forcing",
    conceptId: "autoregressive-models",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Training on a 1,000-token sequence and generating 1,000 tokens both evaluate 1,000 conditionals. Explain why only one of the two parallelises.",
    rubric: {
      elements: [
        {
          id: "training",
          description:
            "In training every conditioning prefix is the data itself and is known in advance, so all positions can be computed in one masked forward pass — this is teacher forcing.",
          weight: 4,
          required: true,
        },
        {
          id: "generation",
          description:
            "In generation the prefix for step t contains the token sampled at step t − 1, which does not exist until that step has run, so the loop is inherently serial.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description: "Names the resulting cost profile: cheap parallel training, expensive serial sampling.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["autoregressive-models", "transformers"],
    source: ML_13,
    status: "live",
  },
  {
    id: "autoregressive-models--explain-exposure-bias",
    conceptId: "autoregressive-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "What is exposure bias, and which observed failure of generated text does it explain?",
    rubric: {
      elements: [
        {
          id: "definition",
          description:
            "Training conditions every prediction on a true prefix, while generation conditions on the model's own output — a distribution the model was never trained on.",
          weight: 4,
          required: true,
        },
        {
          id: "failure",
          description:
            "One off-distribution token makes the next context slightly unlike anything in training, which makes the next error likelier, so quality degrades as generation goes on — text that starts well and drifts.",
          weight: 4,
          required: true,
        },
        {
          id: "mitigation",
          description:
            "Mentions a mitigation — scheduled sampling, or fine-tuning on the model's own outputs — and that neither removes the mismatch entirely.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["autoregressive-models"],
    source: ML_13,
    status: "live",
  },
  {
    id: "autoregressive-models--explain-mode-not-best",
    conceptId: "autoregressive-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Beam search finds sequences of higher joint probability than sampling does, yet produces worse open-ended text. Explain why maximising probability is the wrong objective here.",
    rubric: {
      elements: [
        {
          id: "mode",
          description:
            "The most probable sequences under any well-fit model of human text are short, generic and repetitive, because those genuinely are the most common continuations.",
          weight: 4,
          required: true,
        },
        {
          id: "goal-mismatch",
          description:
            "What is wanted is a typical sample from the distribution, not its mode; sampling methods target that, and the gap is a property of the objective rather than a defect in the model.",
          weight: 4,
          required: true,
        },
        {
          id: "where-beam-works",
          description:
            "Notes that beam search remains right where one correct answer is wanted and the distribution is genuinely peaked, such as translation.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["autoregressive-models", "conditional-probability"],
    source: ML_13,
    status: "live",
  },
  {
    id: "autoregressive-models--transfer-temperature",
    conceptId: "autoregressive-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Dividing the logits by a temperature T before the softmax is the standard diversity knob. Describe the limits T → 0 and T → ∞, and explain why raising T is not the same as top-p sampling.",
    rubric: {
      elements: [
        {
          id: "limits",
          description:
            "T → 0 concentrates all mass on the argmax and is greedy decoding; T → ∞ flattens the distribution toward uniform over the whole vocabulary.",
          weight: 4,
          required: true,
        },
        {
          id: "difference",
          description:
            "Temperature rescales every probability and never removes a candidate, so raising it makes very poor tokens reachable; top-p truncates the tail first and renormalises, so it adds diversity only among plausible options.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Draws the practical conclusion: high temperature alone degrades coherence, which is why the two are usually combined.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["autoregressive-models", "transformers"],
    source: ML_13,
    status: "live",
  },
  {
    id: "autoregressive-models--transfer-kv-cache",
    conceptId: "autoregressive-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "Generating token t with an attention model recomputes attention over the whole prefix. Explain what caching keys and values changes about the cost, and what new constraint the cache introduces.",
    rubric: {
      elements: [
        {
          id: "saving",
          description:
            "Cached keys and values make each new token cost O(t) work instead of recomputing the prefix's projections, turning a total of O(n³)-ish recomputation into O(n²) over a full generation.",
          weight: 4,
          required: true,
        },
        {
          id: "cost",
          description:
            "The cache grows linearly with context length and with layers and heads, so memory rather than compute becomes the binding constraint on long contexts.",
          weight: 4,
          required: true,
        },
        {
          id: "link",
          description:
            "Connects it to why fixed-state alternatives are attractive: a recurrent or state space layer generates at constant memory per step regardless of how long the context has grown.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["autoregressive-models", "attention-mechanism", "transformers"],
    source: ML_13,
    status: "live",
  },

  // --- State Space Models ---------------------------------------------------
  {
    id: "state-space-models--recall-two-forms",
    conceptId: "state-space-models",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "A state space layer can be evaluated in two different ways. Name both, and say which is used when.",
    rubric: {
      elements: [
        {
          id: "forms",
          description:
            "As a linear recurrence hₖ = Āhₖ₋₁ + B̄uₖ, and as a convolution of the input with a fixed kernel obtained by unrolling that recurrence.",
          weight: 4,
          required: true,
        },
        {
          id: "when",
          description:
            "The convolutional form is used in training, where the whole sequence is available and it parallelises across positions; the recurrent form is used at generation time, where it costs O(1) per step with a fixed-size state.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["state-space-models", "convolutional-neural-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "state-space-models--recall-why-linear",
    conceptId: "state-space-models",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why does the recurrence contain no nonlinearity inside the state update?",
    choices: [
      {
        id: "a",
        text: "Because linearity is what lets the recurrence be unrolled into a convolution, so the same weights can be trained in parallel across positions",
        correct: true,
      },
      {
        id: "b",
        text: "Because a nonlinearity would make the model unable to fit nonlinear data",
        correct: false,
        misconception: {
          id: "ssm-linearity-read-as-capacity-loss",
          description:
            "The layer is linear only inside the recurrence; nonlinearities sit between layers, so the stacked model is a nonlinear function of its input.",
          blameConceptId: "state-space-models",
        },
      },
      {
        id: "c",
        text: "Because nonlinear recurrences cannot be differentiated",
        correct: false,
        misconception: {
          id: "ssm-linearity-read-as-differentiability",
          description:
            "Backpropagation through time differentiates nonlinear recurrences perfectly well — that is what training an LSTM does.",
          blameConceptId: "recurrent-neural-networks",
        },
      },
      {
        id: "d",
        text: "Because it keeps the state bounded without needing a gate",
        correct: false,
        misconception: {
          id: "ssm-linearity-read-as-stability",
          description:
            "Boundedness comes from constraining the eigenvalues of Ā, not from linearity — a linear recurrence with a modulus above 1 diverges.",
          blameConceptId: "state-space-models",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["state-space-models", "recurrent-neural-networks", "convolutional-neural-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "state-space-models--apply-memory-half-life",
    conceptId: "state-space-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A mode of the transition matrix Ā has eigenvalue modulus 0.9. After how many steps has that mode's contribution from a past input fallen to half? Give the answer to two decimal places.",
    answerKey: 6.58,
    tolerance: 0.01,
    difficulty: 1.1,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["state-space-models", "eigenvalues-eigenvectors"],
    source: ML_13,
    status: "live",
  },
  {
    id: "state-space-models--apply-cost-ratio",
    conceptId: "state-space-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Self-attention costs work proportional to L² in the sequence length, while a state space layer's parallel scan costs work proportional to L. At L = 4096, how many times more work does the attention layer do, on those proportionalities alone?",
    answerKey: 4096,
    tolerance: 0.000001,
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["state-space-models", "attention-mechanism"],
    source: ML_13,
    status: "live",
  },
  {
    id: "state-space-models--explain-eigenvalues-are-memory",
    conceptId: "state-space-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why do the eigenvalues of Ā determine how far back the layer can remember, and why is a randomly initialised Ā a poor starting point?",
    rubric: {
      elements: [
        {
          id: "powers",
          description:
            "An input k steps old reaches the current state through Ā^k, and diagonalising turns that into λ^k per mode — so modulus below 1 decays geometrically, above 1 explodes, and near 1 persists.",
          weight: 4,
          required: true,
        },
        {
          id: "random-bad",
          description:
            "A random spectrum gives one arbitrary set of time scales, usually decaying fast, so the layer starts with no long memory and gradient descent has to discover the spectrum from a bad initialisation.",
          weight: 4,
          required: true,
        },
        {
          id: "structured-init",
          description:
            "Names the fix: structured initialisation such as HiPPO, which sets Ā so the state approximates the input's history over a well-spread range of time scales from the start.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["state-space-models", "eigenvalues-eigenvectors"],
    source: ML_13,
    status: "live",
  },
  {
    id: "state-space-models--explain-selectivity-trade",
    conceptId: "state-space-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Mamba makes the state space parameters depend on the current input. What does that buy, and what does it cost?",
    rubric: {
      elements: [
        {
          id: "buys",
          description:
            "Content-dependent memory: with fixed parameters the layer treats every token identically and cannot decide to skip a filler token or to hold one that just became important.",
          weight: 4,
          required: true,
        },
        {
          id: "costs",
          description:
            "The coefficients now vary with position, so the model is no longer a fixed convolution and the FFT-based training path is lost; it is recovered as a parallel scan, which still runs in linear time but needs a hardware-aware implementation.",
          weight: 4,
          required: true,
        },
        {
          id: "why-still-parallel",
          description:
            "Notes why a scan is still possible: the recurrence remains linear in the state, which is what associativity — and therefore parallel prefix computation — requires.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["state-space-models", "attention-mechanism"],
    source: ML_13,
    status: "live",
  },
  {
    id: "state-space-models--transfer-vs-attention-recall",
    conceptId: "state-space-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A task requires reproducing a rare identifier that appeared once, 30,000 tokens ago. Explain why this is the case where a fixed-state model is at its weakest relative to attention, and what a hybrid architecture is trying to achieve.",
    rubric: {
      elements: [
        {
          id: "compression",
          description:
            "A state space layer must compress the entire history into a fixed-size state, so an item it did not choose to keep is unrecoverable — capacity does not grow with context.",
          weight: 4,
          required: true,
        },
        {
          id: "attention-contrast",
          description:
            "Attention keeps every position addressable and matches on content, so exact retrieval of an arbitrary past token is a direct lookup — paid for with a cache and cost that both grow with context.",
          weight: 4,
          required: true,
        },
        {
          id: "hybrid",
          description:
            "A hybrid runs most layers linear and a few attention layers, buying linear-time bulk processing while keeping exact lookup where it is needed.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["state-space-models", "attention-mechanism", "lstm-and-gru"],
    source: ML_13,
    status: "live",
  },
  {
    id: "state-space-models--transfer-lstm-comparison",
    conceptId: "state-space-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "Both an LSTM and a state space layer carry a state forward and both can remember over long spans. What can a state space layer do at training time that an LSTM cannot, and which property makes the difference?",
    rubric: {
      elements: [
        {
          id: "parallel-training",
          description:
            "It can be trained in parallel across the whole sequence — as a convolution or a parallel scan — whereas an LSTM must compute step t after step t − 1.",
          weight: 4,
          required: true,
        },
        {
          id: "why",
          description:
            "The difference is the nonlinearity inside the recurrence: the LSTM's gates depend nonlinearly on the previous state, so its unrolled form has no closed shape, while a linear recurrence unrolls into a fixed set of coefficients.",
          weight: 4,
          required: true,
        },
        {
          id: "same-at-inference",
          description:
            "Notes that at generation time the two are alike: both step forward with a fixed-size state at constant cost per token.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["state-space-models", "lstm-and-gru", "recurrent-neural-networks"],
    source: ML_13,
    status: "live",
  },

  // --- Graph Neural Networks ------------------------------------------------
  {
    id: "graph-neural-networks--recall-message-passing",
    conceptId: "graph-neural-networks",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the three stages of one message-passing layer, and state the property the aggregation function must have.",
    rubric: {
      elements: [
        {
          id: "stages",
          description:
            "Compute a message along each edge from the pair of node states, aggregate the messages arriving at each node, then update the node's state from its old state and the aggregate.",
          weight: 4,
          required: true,
        },
        {
          id: "invariance",
          description:
            "The aggregation must be permutation invariant — sum, mean or max — because a node's neighbours form a set with no canonical order, and the model's output must not depend on how the adjacency list was written.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["graph-neural-networks", "graphs"],
    source: ML_13,
    status: "live",
  },
  {
    id: "graph-neural-networks--recall-gcn-normalisation",
    conceptId: "graph-neural-networks",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A GCN aggregates with the degree-normalised adjacency rather than a plain sum over neighbours. What does the normalisation prevent?",
    choices: [
      {
        id: "a",
        text: "High-degree nodes dominating and activation scales blowing up where degrees are uneven",
        correct: true,
      },
      {
        id: "b",
        text: "The model becoming sensitive to the order of the neighbours",
        correct: false,
        misconception: {
          id: "gcn-norm-confused-with-invariance",
          description:
            "Permutation invariance comes from aggregating over a set at all; a plain unnormalised sum is already invariant.",
          blameConceptId: "graph-neural-networks",
        },
      },
      {
        id: "c",
        text: "Over-smoothing, so that arbitrarily deep GCNs become safe",
        correct: false,
        misconception: {
          id: "gcn-norm-read-as-oversmoothing-fix",
          description:
            "Normalised averaging is the diffusion that causes over-smoothing. The normalisation controls scale; it does not stop representations converging with depth.",
          blameConceptId: "graph-neural-networks",
        },
      },
      {
        id: "d",
        text: "Information from a node's own features being lost",
        correct: false,
        misconception: {
          id: "gcn-norm-confused-with-self-loop",
          description:
            "Keeping the node's own features is the self-loop's job — the Â in the formula is the adjacency plus the identity.",
          blameConceptId: "graph-neural-networks",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["graph-neural-networks", "graphs"],
    source: ML_13,
    status: "live",
  },
  {
    id: "graph-neural-networks--apply-receptive-field",
    conceptId: "graph-neural-networks",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "In a graph where every node has exactly 10 neighbours and no short cycles, how many nodes can influence a given node's representation after 4 message-passing layers? Count the 4-hop neighbourhood as 10^4, ignoring the node itself and its nearer shells.",
    answerKey: 10000,
    tolerance: 0.000001,
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["graph-neural-networks", "graphs"],
    source: ML_13,
    status: "live",
  },
  {
    id: "graph-neural-networks--apply-gcn-edge-weight",
    conceptId: "graph-neural-networks",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "In a GCN with self-loops, the coefficient on the message from node u to node v is 1/√(d̂ᵤ · d̂ᵥ), where d̂ is degree plus one for the self-loop. Node v has 3 neighbours and node u has 5. What is the coefficient, to four decimal places?",
    answerKey: 0.2041,
    tolerance: 0.0001,
    difficulty: 1.2,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["graph-neural-networks", "graphs"],
    source: ML_13,
    status: "live",
  },
  {
    id: "graph-neural-networks--explain-over-smoothing",
    conceptId: "graph-neural-networks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Convolutional networks get better with 50 layers; graph networks are usually 2 to 4. Explain the two reasons depth behaves differently here.",
    rubric: {
      elements: [
        {
          id: "receptive-field",
          description:
            "The receptive field grows multiplicatively with hops rather than gently with kernel size, so a few layers already reach most of the graph and further depth adds no new information.",
          weight: 4,
          required: true,
        },
        {
          id: "over-smoothing",
          description:
            "Repeated neighbourhood averaging is a diffusion that converges toward a state independent of the starting features, so node representations become indistinguishable and node-level accuracy collapses.",
          weight: 4,
          required: true,
        },
        {
          id: "defences",
          description: "Names a defence — residual connections, jumping-knowledge readouts, or simply staying shallow.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["graph-neural-networks", "convolutional-neural-networks", "graphs"],
    source: ML_13,
    status: "live",
  },
  {
    id: "graph-neural-networks--explain-sum-vs-mean",
    conceptId: "graph-neural-networks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Sum aggregation is strictly more expressive than mean or max. Give a concrete pair of neighbourhoods that mean cannot distinguish and sum can, and say what that implies about the choice.",
    rubric: {
      elements: [
        {
          id: "example",
          description:
            "A node with one neighbour of feature x and a node with five identical neighbours of feature x: the mean is x in both cases, while the sums are x and 5x. Max fails the same way.",
          weight: 5,
          required: true,
        },
        {
          id: "implication",
          description:
            "Mean and max discard multiplicity, so any task where how many neighbours have a property matters needs sum — the GIN argument for sum aggregation being the maximally expressive choice among the three.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["graph-neural-networks", "graphs"],
    source: ML_13,
    status: "live",
  },
  {
    id: "graph-neural-networks--transfer-wl-limit",
    conceptId: "graph-neural-networks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A 6-cycle and a graph of two disjoint triangles both have six degree-2 nodes with identical features. Explain why standard message passing gives them the same representation forever, and name one way to break the tie.",
    rubric: {
      elements: [
        {
          id: "why-same",
          description:
            "Every node in both graphs sees the same multiset of neighbour states at every round, so the updates are identical at every layer and no amount of training separates them — the 1-WL expressiveness ceiling.",
          weight: 5,
          required: true,
        },
        {
          id: "fix",
          description:
            "Adding features that break the symmetry — cycle counts, distance encodings, Laplacian positional encodings, or random node identifiers — gives the two graphs different inputs and lifts the model past the ceiling.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["graph-neural-networks", "graphs"],
    source: ML_13,
    status: "live",
  },
  {
    id: "graph-neural-networks--transfer-cnn-as-special-case",
    conceptId: "graph-neural-networks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "An image is a graph whose nodes are pixels and whose edges join neighbours. Explain in what sense a convolution is then a message-passing layer, and what a general graph network has to give up that a convolution keeps.",
    rubric: {
      elements: [
        {
          id: "correspondence",
          description:
            "A convolution gathers from each pixel's fixed neighbourhood, weights the messages, and sums them — the same gather-aggregate-update pattern, on a grid graph.",
          weight: 4,
          required: true,
        },
        {
          id: "what-is-given-up",
          description:
            "On a grid, neighbours have canonical positions, so a convolution can give the neighbour above a different weight from the neighbour to the left. A general graph has no such ordering, so the aggregation must be permutation invariant and every neighbour is treated by the same message function.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Draws the consequence: the graph model is the more general one and therefore the weaker prior, which is why it needs extra positional or structural features to recover distinctions a convolution gets from the grid for free.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["graph-neural-networks", "convolutional-neural-networks", "graphs"],
    source: ML_13,
    status: "live",
  },

  // --- Generative Adversarial Networks --------------------------------------
  {
    id: "generative-adversarial-networks--recall-two-players",
    conceptId: "generative-adversarial-networks",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the two networks in a GAN, state what each one optimises, and say what kind of solution the pair is looking for.",
    rubric: {
      elements: [
        {
          id: "roles",
          description:
            "A generator maps noise to samples and tries to be judged real; a discriminator classifies samples as real or generated and tries to be right.",
          weight: 4,
          required: true,
        },
        {
          id: "saddle",
          description:
            "They optimise the same objective in opposite directions, so the target is a saddle point of a two-player game rather than a minimum of a loss.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["generative-adversarial-networks", "generative-vs-discriminative-models"],
    source: ML_13,
    status: "live",
  },
  {
    id: "generative-adversarial-networks--recall-no-likelihood",
    conceptId: "generative-adversarial-networks",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why can a GAN not report the likelihood it assigns to a held-out image?",
    choices: [
      {
        id: "a",
        text: "It defines its distribution only implicitly, as the pushforward of noise through the generator, and never evaluates a density",
        correct: true,
      },
      {
        id: "b",
        text: "Its likelihood is intractable but could be computed with enough compute",
        correct: false,
        misconception: {
          id: "gan-likelihood-read-as-intractable",
          description:
            "It is not an expensive integral that could in principle be done; the model has no density to evaluate at all. That is a structural difference from a model with an intractable normaliser.",
          blameConceptId: "generative-adversarial-networks",
        },
      },
      {
        id: "c",
        text: "The discriminator holds the likelihood, but it is discarded after training",
        correct: false,
        misconception: {
          id: "gan-likelihood-attributed-to-discriminator",
          description:
            "The discriminator estimates a density *ratio* between real and generated data, not either density. A ratio cannot be turned into a likelihood without knowing one of them.",
          blameConceptId: "generative-adversarial-networks",
        },
      },
      {
        id: "d",
        text: "Because it is trained adversarially rather than by maximum likelihood, which makes the likelihood undefined",
        correct: false,
        misconception: {
          id: "gan-likelihood-confused-with-training-rule",
          description:
            "Training rule and model class are separate: a model with an explicit density has a likelihood however it was fit. The reason here is the implicit definition of the distribution.",
          blameConceptId: "generative-adversarial-networks",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["generative-adversarial-networks", "generative-vs-discriminative-models"],
    source: ML_13,
    status: "live",
  },
  {
    id: "generative-adversarial-networks--apply-optimal-discriminator",
    conceptId: "generative-adversarial-networks",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "At a point x the data density is 0.3 and the generator's density is 0.1. What does the optimal discriminator output at x?",
    answerKey: 0.75,
    tolerance: 0.001,
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["generative-adversarial-networks", "pdf"],
    source: ML_13,
    status: "live",
  },
  {
    id: "generative-adversarial-networks--apply-equilibrium-value",
    conceptId: "generative-adversarial-networks",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Substituting the optimal discriminator into the GAN objective gives 2·JSD(p_data ‖ p_g) − 2 log 2. What value does the objective take at the equilibrium where the generator matches the data distribution? Give the answer in nats to four decimal places.",
    answerKey: -1.3863,
    tolerance: 0.0001,
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 140,
    prereqClosure: ["generative-adversarial-networks", "kl-divergence"],
    source: ML_13,
    status: "live",
  },
  {
    id: "generative-adversarial-networks--explain-non-saturating-loss",
    conceptId: "generative-adversarial-networks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Early in training the discriminator wins easily. Explain what that does to the generator's gradient under the original objective, and why maximising log D(G(z)) instead fixes it.",
    rubric: {
      elements: [
        {
          id: "problem",
          description:
            "With D(G(z)) near 0, log(1 − D(G(z))) is nearly flat, so the generator receives almost no gradient exactly when it is worst and most needs one.",
          weight: 4,
          required: true,
        },
        {
          id: "fix",
          description:
            "Maximising log D(G(z)) has a steep gradient in that same region, so learning is fastest when the generator is furthest from fooling the discriminator.",
          weight: 4,
          required: true,
        },
        {
          id: "same-fixed-point",
          description:
            "Notes that the change alters the gradient's magnitude, not the location of the equilibrium, so it is a reparameterisation of the same game.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["generative-adversarial-networks", "neural-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "generative-adversarial-networks--explain-mode-collapse",
    conceptId: "generative-adversarial-networks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "A GAN trained on all ten digits produces only convincing 3s and 8s. Explain why the objective does not penalise this, and why the training curves will not reveal it.",
    rubric: {
      elements: [
        {
          id: "no-coverage-term",
          description:
            "The generator is rewarded only for samples the discriminator accepts; nothing in the objective asks it to cover the data distribution, so a narrow generator that fools the current discriminator is doing exactly what it was asked.",
          weight: 4,
          required: true,
        },
        {
          id: "dynamics",
          description:
            "The discriminator eventually learns to reject the collapsed mode, the generator moves to another, and the two can cycle — a moving target rather than a converged failure.",
          weight: 3,
          required: true,
        },
        {
          id: "no-signal",
          description:
            "At any equilibrium both losses sit near their starting values, so the loss curves are uninformative and quality has to be measured externally, for instance by FID.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["generative-adversarial-networks", "kl-divergence"],
    source: ML_13,
    status: "live",
  },
  {
    id: "generative-adversarial-networks--transfer-disjoint-support",
    conceptId: "generative-adversarial-networks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "Early in training the generator's samples and the real data occupy essentially disjoint regions. Explain what happens to the Jensen-Shannon divergence there, why that is bad for optimisation, and what a Wasserstein GAN changes.",
    rubric: {
      elements: [
        {
          id: "constant",
          description:
            "With disjoint supports the JSD is pinned at log 2 regardless of how far apart the two distributions are, so its gradient with respect to the generator is zero and moving closer earns nothing.",
          weight: 4,
          required: true,
        },
        {
          id: "wasserstein",
          description:
            "An earth-mover distance measures how far mass must be transported, so it keeps varying when supports are disjoint and provides a usable gradient throughout.",
          weight: 4,
          required: true,
        },
        {
          id: "cost",
          description:
            "Notes the price: the dual form requires the critic to be Lipschitz, enforced by weight clipping or a gradient penalty, which is a new constraint to get right.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["generative-adversarial-networks", "kl-divergence", "jensen-inequality"],
    source: ML_13,
    status: "live",
  },
  {
    id: "generative-adversarial-networks--transfer-perfect-discriminator",
    conceptId: "generative-adversarial-networks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team reports that their discriminator reaches 99.9% accuracy within a few hundred steps and stays there, while sample quality never improves. Diagnose the failure and say what balance the training loop is supposed to maintain.",
    rubric: {
      elements: [
        {
          id: "diagnosis",
          description:
            "A discriminator that is always right supplies no informative gradient: everything the generator learns arrives through the discriminator's slope, and a saturated classifier has none to give.",
          weight: 4,
          required: true,
        },
        {
          id: "balance",
          description:
            "The two networks must be kept comparably strong — through update ratios, learning rates, capacity, or regularising the discriminator — so the discriminator stays a useful teacher rather than a perfect judge.",
          weight: 4,
          required: true,
        },
        {
          id: "contrast",
          description:
            "Notes what makes this unlike ordinary supervised training, where a classifier reaching high accuracy is the goal rather than a failure state.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["generative-adversarial-networks", "neural-networks", "generative-vs-discriminative-models"],
    source: ML_13,
    status: "live",
  },

  // --- Diffusion Models -----------------------------------------------------
  {
    id: "diffusion-models--recall-forward-process",
    conceptId: "diffusion-models",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the forward process of a diffusion model, and say how many parameters it has.",
    rubric: {
      elements: [
        {
          id: "process",
          description:
            "It adds Gaussian noise to the data over many steps on a fixed schedule, each step shrinking the signal slightly and adding variance, until the sample is indistinguishable from pure noise.",
          weight: 4,
          required: true,
        },
        {
          id: "no-parameters",
          description:
            "None — the forward process is fixed by the chosen schedule and is not learned. Only the reverse process is a model.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["diffusion-models", "normal-distribution"],
    source: ML_13,
    status: "live",
  },
  {
    id: "diffusion-models--recall-training-target",
    conceptId: "diffusion-models",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In the standard training objective, what does the network predict?",
    choices: [
      {
        id: "a",
        text: "The noise that was added to produce the noisy input, given that input and its noise level",
        correct: true,
      },
      {
        id: "b",
        text: "Whether its input is a real image or a generated one",
        correct: false,
        misconception: {
          id: "diffusion-confused-with-adversarial",
          description:
            "That is a discriminator's job in a GAN. Diffusion training has no adversary — the target is generated by the training loop itself.",
          blameConceptId: "generative-adversarial-networks",
        },
      },
      {
        id: "c",
        text: "A latent code from which the image can be reconstructed by a decoder",
        correct: false,
        misconception: {
          id: "diffusion-confused-with-autoencoder",
          description:
            "That is an autoencoder. Diffusion's intermediate states are the data at a known noise level, not a learned compressed code — though latent diffusion does run the process inside an autoencoder's space.",
          blameConceptId: "autoencoders",
        },
      },
      {
        id: "d",
        text: "The full sequence of reverse steps in one pass",
        correct: false,
        misconception: {
          id: "diffusion-one-shot-misread",
          description:
            "One network evaluation undoes one step's worth of noise; the sequence is a sampling loop, which is exactly why generation costs many forward passes.",
          blameConceptId: "diffusion-models",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["diffusion-models"],
    source: ML_13,
    status: "live",
  },
  {
    id: "diffusion-models--apply-alpha-bar",
    conceptId: "diffusion-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A schedule uses a constant βₜ = 0.02, so αₜ = 0.98 at every step. What is ᾱₜ — the product of the αs — at t = 100? Give the answer to four decimal places.",
    answerKey: 0.1326,
    tolerance: 0.0001,
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["diffusion-models"],
    source: ML_13,
    status: "live",
  },
  {
    id: "diffusion-models--apply-signal-coefficient",
    conceptId: "diffusion-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "With ᾱ₁₀₀ ≈ 0.1326 and xₜ = √ᾱₜ·x₀ + √(1 − ᾱₜ)·ε, what coefficient multiplies the clean image x₀ at t = 100? Give the answer to four decimal places.",
    answerKey: 0.3642,
    tolerance: 0.0002,
    difficulty: 1.1,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["diffusion-models", "normal-distribution"],
    source: ML_13,
    status: "live",
  },
  {
    id: "diffusion-models--explain-closed-form-marginal",
    conceptId: "diffusion-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Training never simulates the forward chain step by step. Explain the property of the forward process that makes this possible, and what it buys.",
    rubric: {
      elements: [
        {
          id: "gaussians-compose",
          description:
            "Each step is Gaussian and linear in the previous state, so the composition of t steps is itself Gaussian with a closed-form mean and variance — any noise level can be sampled directly from a clean example.",
          weight: 4,
          required: true,
        },
        {
          id: "buys",
          description:
            "Each training step picks a random t and gets an independent regression problem, so training parallelises fully across noise levels instead of running a length-t simulation per example.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["diffusion-models", "normal-distribution", "variance"],
    source: ML_13,
    status: "live",
  },
  {
    id: "diffusion-models--explain-stability-vs-gan",
    conceptId: "diffusion-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is diffusion training stable in a way GAN training is not, and what is paid for that stability?",
    rubric: {
      elements: [
        {
          id: "supervised",
          description:
            "The target is the noise the training loop itself drew, so the objective is an ordinary regression against a known answer — a loss that decreases as the model improves, with no second network whose strength must be balanced.",
          weight: 4,
          required: true,
        },
        {
          id: "price",
          description:
            "Sampling requires a sequence of network evaluations rather than one, so generation is orders of magnitude more expensive per sample.",
          weight: 4,
          required: true,
        },
        {
          id: "coverage",
          description:
            "Notes the second gain: the objective covers the whole data distribution at every noise level, so mode collapse is not the failure mode it is for an adversarial objective.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["diffusion-models", "generative-adversarial-networks"],
    source: ML_13,
    status: "live",
  },
  {
    id: "diffusion-models--transfer-guidance-tradeoff",
    conceptId: "diffusion-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "Classifier-free guidance extrapolates away from the unconditional prediction with a scale s. A team raises s to improve prompt adherence and finds every sample for a given prompt now looks alike. Explain the mechanism and name the trade.",
    rubric: {
      elements: [
        {
          id: "mechanism",
          description:
            "Guidance pushes each denoising step further along the direction that distinguishes the conditional prediction from the unconditional one, which sharpens the effective conditional distribution around its high-probability region.",
          weight: 4,
          required: true,
        },
        {
          id: "trade",
          description:
            "Sharpening concentrates mass, so adherence rises while diversity falls — the samples collapse toward the mode of the conditional distribution rather than covering it.",
          weight: 4,
          required: true,
        },
        {
          id: "analogy",
          description:
            "Connects it to lowering the temperature when sampling a sequence model: both trade coverage for confidence, and neither is a correction to a fault in the model.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["diffusion-models", "normal-distribution"],
    source: ML_13,
    status: "live",
  },
  {
    id: "diffusion-models--transfer-latent-diffusion",
    conceptId: "diffusion-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Latent diffusion runs the whole noising and denoising process inside a pretrained autoencoder's latent space rather than on pixels. Quantify roughly what that saves for a 512 x 512 image compressed to a 64 x 64 latent, and say what the arrangement depends on.",
    rubric: {
      elements: [
        {
          id: "saving",
          description:
            "Each spatial dimension shrinks by a factor of 8, so the grid the network runs on is about 64 times smaller, and every one of the many sampling passes is cheaper by roughly that factor.",
          weight: 4,
          required: true,
        },
        {
          id: "dependency",
          description:
            "It depends on the autoencoder's latent being a faithful, smooth code: anything its decoder cannot reconstruct is unreachable by the diffusion model however well the latter is trained, so the autoencoder sets a ceiling on final quality.",
          weight: 4,
          required: true,
        },
        {
          id: "why-it-works",
          description:
            "Notes why the compression is affordable: the autoencoder removes imperceptible high-frequency detail, leaving the diffusion model to spend its capacity on semantic structure.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["diffusion-models", "autoencoders"],
    source: ML_13,
    status: "live",
  },

  // --- Mixture of Experts ---------------------------------------------------
  {
    id: "mixture-of-experts--recall-sparse-routing",
    conceptId: "mixture-of-experts",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What does a mixture-of-experts layer replace, and what does the router do with each token?",
    rubric: {
      elements: [
        {
          id: "replacement",
          description:
            "It replaces a single feed-forward block with many parallel experts of the same shape.",
          weight: 3,
          required: true,
        },
        {
          id: "routing",
          description:
            "A gate scores the experts for each token and only the top k are evaluated, their outputs combined by gate weight — so compute per token is set by k, not by the number of experts.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["mixture-of-experts", "transformers"],
    source: ML_13,
    status: "live",
  },
  {
    id: "mixture-of-experts--recall-what-is-not-saved",
    conceptId: "mixture-of-experts",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A sparse mixture layer cuts compute per token relative to a dense layer of the same total size. What does it not cut?",
    choices: [
      {
        id: "a",
        text: "Memory — every expert's parameters must be resident even though only a few are used per token",
        correct: true,
      },
      {
        id: "b",
        text: "Nothing else; the technique reduces both compute and memory proportionally",
        correct: false,
        misconception: {
          id: "moe-memory-assumed-sparse",
          description:
            "Sparsity is in which experts run, not in which are stored. Any token in the batch may route anywhere, so all experts have to be available.",
          blameConceptId: "mixture-of-experts",
        },
      },
      {
        id: "c",
        text: "Training data requirements, which fall because each expert sees fewer tokens",
        correct: false,
        misconception: {
          id: "moe-data-requirement-inverted",
          description:
            "Each expert seeing fewer tokens is a reason to need *more* data, not less: every expert still has to be trained.",
          blameConceptId: "mixture-of-experts",
        },
      },
      {
        id: "d",
        text: "The number of parameters the model holds, which is the same as a dense model of equal quality",
        correct: false,
        misconception: {
          id: "moe-parameter-count-confused",
          description:
            "Holding many more parameters than it uses per token is the entire point — the two counts are deliberately different, which is why both are reported.",
          blameConceptId: "mixture-of-experts",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["mixture-of-experts", "transformers"],
    source: ML_13,
    status: "live",
  },
  {
    id: "mixture-of-experts--apply-active-parameters",
    conceptId: "mixture-of-experts",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A layer holds 8 experts of 100 million parameters each and routes every token to its top 2. How many million parameters are evaluated per token?",
    answerKey: 200,
    tolerance: 0.000001,
    difficulty: 0.7,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["mixture-of-experts"],
    source: ML_13,
    status: "live",
  },
  {
    id: "mixture-of-experts--apply-capacity",
    conceptId: "mixture-of-experts",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A batch of 4,096 tokens is routed across 8 experts with a capacity factor of 1.25, where each expert's buffer is capacity_factor x tokens / experts. How many tokens can one expert accept before it starts dropping them?",
    answerKey: 640,
    tolerance: 0.000001,
    difficulty: 1.0,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["mixture-of-experts"],
    source: ML_13,
    status: "live",
  },
  {
    id: "mixture-of-experts--explain-routing-collapse",
    conceptId: "mixture-of-experts",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Left alone, a router over 8 experts tends to end up using 2 of them. Explain the feedback loop, and how a load-balancing loss interrupts it.",
    rubric: {
      elements: [
        {
          id: "loop",
          description:
            "Only chosen experts receive gradient, so an expert picked early improves and is picked more often, while an unchosen expert never improves and is never chosen — a rich-get-richer loop rather than a slow drift.",
          weight: 4,
          required: true,
        },
        {
          id: "auxiliary-loss",
          description:
            "An auxiliary term penalises uneven traffic — typically the correlation between the fraction of tokens sent to each expert and the mean gate probability it receives — and is minimised when both are uniform.",
          weight: 4,
          required: true,
        },
        {
          id: "not-prescriptive",
          description:
            "Notes that the term pushes traffic to spread without dictating which expert gets which tokens, so specialisation can still emerge.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["mixture-of-experts", "gradient-descent"],
    source: ML_13,
    status: "live",
  },
  {
    id: "mixture-of-experts--explain-token-dropping",
    conceptId: "mixture-of-experts",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Why does an expert have a fixed capacity at all, and what happens to a token that arrives at a full expert?",
    rubric: {
      elements: [
        {
          id: "why-fixed",
          description:
            "Experts are laid out across devices with buffers sized in advance, so the computation must be shaped before the routing decisions are known; a fixed capacity makes the batch's shape independent of how the tokens happen to route.",
          weight: 4,
          required: true,
        },
        {
          id: "dropped",
          description:
            "The token is not processed by that expert — it passes through the layer's residual connection unchanged, so it is degraded rather than lost.",
          weight: 4,
          required: true,
        },
        {
          id: "tuning",
          description:
            "Notes the trade in the capacity factor: near 1.0 wastes least compute and drops most; higher values reserve slack that is often unused.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["mixture-of-experts", "transformers"],
    source: ML_13,
    status: "live",
  },
  {
    id: "mixture-of-experts--transfer-vs-ensembles",
    conceptId: "mixture-of-experts",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "An ensemble trains several models and averages all of their predictions at inference. A mixture of experts holds many sub-networks and evaluates a few. Explain what each arrangement is buying, and why only one of them reduces variance.",
    rubric: {
      elements: [
        {
          id: "ensemble",
          description:
            "An ensemble averages the predictions of members trained to be imperfectly correlated, which cancels part of their independent error — variance reduction, paid for by running every member.",
          weight: 4,
          required: true,
        },
        {
          id: "moe",
          description:
            "A mixture evaluates only the experts the router chose, so there is no averaging over many independent estimates and little variance reduction; what it buys is specialised capacity at compute set by k.",
          weight: 4,
          required: true,
        },
        {
          id: "training",
          description:
            "Notes that the members are also trained differently: ensemble members are trained independently, mixture experts jointly with the router that feeds them.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["mixture-of-experts", "ensemble-methods"],
    source: ML_13,
    status: "live",
  },
  {
    id: "mixture-of-experts--transfer-serving-constraint",
    conceptId: "mixture-of-experts",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem: "A team benchmarks a sparse model against a dense one with the same active parameter count and finds equal throughput on a large batch but much worse latency for single-request serving. Explain what changed between the two settings.",
    rubric: {
      elements: [
        {
          id: "batch-case",
          description:
            "With a large batch, tokens spread across experts, every expert has work, and the sparse layer's arithmetic per token matches the dense model's — so throughput is comparable.",
          weight: 4,
          required: true,
        },
        {
          id: "single-request",
          description:
            "A single request's few tokens touch only a handful of experts, so most of the parameters resident in memory do no work and the layer is bound by moving weights rather than by arithmetic — the cost profile the dense model does not have.",
          weight: 4,
          required: true,
        },
        {
          id: "implication",
          description:
            "Draws the implication: sparse models are best where batches are large, and the memory bill is paid whatever the batch size.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.5,
    expectedSeconds: 230,
    prereqClosure: ["mixture-of-experts", "transformers"],
    source: ML_13,
    status: "live",
  },
];
