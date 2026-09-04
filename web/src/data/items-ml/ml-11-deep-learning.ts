import type { Item } from "../../lib/assessment/types";
import { ML_11 } from "./sources";

/**
 * Cluster 11 — deep learning. Eight items per concept, two each at recall,
 * apply, explain and transfer. Authored directly in typed form; see
 * `assessments/ml-11-deep-learning.md` for the design record.
 */
export const ml11Items: Item[] = [
  // --- Activation Functions -------------------------------------------------
  {
    id: "activation-functions--recall-why-needed",
    conceptId: "activation-functions",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Why does a network need an activation function between its layers at all?",
    rubric: {
      elements: [
        { id: "collapse", description: "Without one, composing linear layers gives another linear map, so the whole stack has the representational power of a single layer.", weight: 4, required: true },
      ],
    },
    difficulty: -0.3,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["activation-functions", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "activation-functions--recall-relu-derivative",
    conceptId: "activation-functions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is ReLU's derivative for a positive pre-activation, and why does that value matter?",
    choices: [
      { id: "a", text: "Exactly 1 — so backpropagation passes the gradient through undiminished", correct: true },
      {
        id: "b",
        text: "At most 0.25, like the sigmoid's",
        correct: false,
        misconception: {
          id: "relu-derivative-confused-with-sigmoid",
          description:
            "0.25 is the sigmoid's maximum, and it is precisely the shrinkage factor ReLU was adopted to avoid.",
          blameConceptId: "activation-functions",
        },
      },
      {
        id: "c",
        text: "It varies with the input magnitude",
        correct: false,
        misconception: {
          id: "relu-derivative-thought-variable",
          description:
            "ReLU is piecewise linear, so its slope is constant on each piece — 1 above zero, 0 below.",
          blameConceptId: "activation-functions",
        },
      },
      {
        id: "d",
        text: "Zero, which is why ReLU units die",
        correct: false,
        misconception: {
          id: "dead-relu-generalised",
          description:
            "The derivative is 0 only on the negative side. Confusing the two sides turns a specific failure mode into a claim that ReLU cannot train at all.",
          blameConceptId: "activation-functions",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["activation-functions"],
    source: ML_11,
    status: "live",
  },
  {
    id: "activation-functions--apply-sigmoid-shrinkage",
    conceptId: "activation-functions",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "The sigmoid's derivative is at most 0.25. Through 6 sigmoid layers, what is the largest factor by which backpropagation can scale the gradient? Express the answer as 0.25⁶ in decimal.",
    answerKey: 0.000244140625,
    tolerance: 0.00001,
    difficulty: 0.4,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["activation-functions", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "activation-functions--apply-relu-not-linear",
    conceptId: "activation-functions",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Show by a concrete counterexample that ReLU is not a linear function, using a = 3 and b = −5.",
    rubric: {
      elements: [
        { id: "lhs", description: "max(0, 3 + (−5)) = max(0, −2) = 0.", weight: 3, required: true },
        { id: "rhs", description: "max(0, 3) + max(0, −5) = 3 + 0 = 3.", weight: 3, required: true },
        { id: "conclusion", description: "0 ≠ 3, so additivity fails and ReLU is piecewise linear rather than linear — the kink is what breaks the collapse argument.", weight: 3, required: true },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.5,
    expectedSeconds: 140,
    prereqClosure: ["activation-functions"],
    source: ML_11,
    status: "live",
  },
  {
    id: "activation-functions--explain-saturation-vs-dying",
    conceptId: "activation-functions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Saturation and the dying-ReLU problem both leave a unit stuck. Explain how the two failures differ.",
    rubric: {
      elements: [
        {
          id: "saturation",
          description:
            "A saturated sigmoid or tanh unit sits in a tail where the curve is flat, so its derivative is near zero — and the further into the tail, the more stuck. It can in principle recover if its inputs change.",
          weight: 4,
          required: true,
        },
        {
          id: "dying",
          description:
            "A dead ReLU has a negative pre-activation for *every* input, so its derivative is exactly zero always and it receives no gradient at all — it cannot recover, and a large learning rate can kill many units in one step.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["activation-functions", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "activation-functions--explain-output-choices",
    conceptId: "activation-functions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "State the right output activation for binary classification, multiclass classification, and regression, with a reason for each.",
    rubric: {
      elements: [
        { id: "binary", description: "Sigmoid — maps an unbounded score to a probability in (0, 1).", weight: 3, required: true },
        { id: "multiclass", description: "Softmax — produces a normalised distribution over the classes, encoding that exactly one is correct.", weight: 3, required: true },
        { id: "regression", description: "None at all — an unbounded target needs an unbounded output, and any squashing function would cap what the model can predict.", weight: 4, required: true },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["activation-functions", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "activation-functions--transfer-why-recurrent-cells-keep-sigmoid",
    conceptId: "activation-functions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "ReLU displaced sigmoid in hidden layers, yet recurrent cells still use sigmoid and tanh internally. Why is that not an inconsistency?",
    rubric: {
      elements: [
        {
          id: "gates-need-bounds",
          description:
            "Those sigmoids are gates: their output multiplies a signal to decide how much passes, which requires a value bounded in (0, 1). ReLU's unbounded output cannot express 'let through 30% of this'.",
          weight: 5,
          required: true,
        },
        {
          id: "different-job",
          description:
            "The saturation problem ReLU solves is about propagating gradient through a deep *stack*; a gate is doing a different job, and its bounded range is the point rather than a defect.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["activation-functions", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "activation-functions--transfer-piecewise-regions",
    conceptId: "activation-functions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A ReLU network is a linear function on each region of its input space. Explain how that is compatible with it approximating a smooth curved function well.",
    rubric: {
      elements: [
        {
          id: "many-regions",
          description:
            "Which linear piece each unit is on depends on the input, so the number of distinct regions grows very rapidly — roughly exponentially — with depth.",
          weight: 4,
          required: true,
        },
        {
          id: "piecewise-linear-approximation",
          description:
            "A smooth function is approximated arbitrarily well by enough small linear pieces, exactly as a curve is approximated by a fine polygon — so a large number of regions gives a close fit despite each piece being flat.",
          weight: 4,
          required: true,
        },
        {
          id: "depth-is-efficient",
          description:
            "Bonus: notes that depth generates regions far more efficiently than width, which is the concrete form of the efficiency argument for depth.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["activation-functions", "neural-networks"],
    source: ML_11,
    status: "live",
  },

  // --- SGD and Adaptive Optimizers -----------------------------------------
  {
    id: "sgd-and-adaptive-optimizers--recall-momentum",
    conceptId: "sgd-and-adaptive-optimizers",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "State the momentum update and say what quantity it accumulates.",
    rubric: {
      elements: [
        { id: "the-rule", description: "v ← βv + ∇L(θ), then θ ← θ − ηv.", weight: 4, required: true },
        { id: "what-it-is", description: "v is an exponentially weighted average of past gradients, typically with β = 0.9.", weight: 3, required: true },
      ],
    },
    difficulty: -0.2,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["sgd-and-adaptive-optimizers", "gradient-descent"],
    source: ML_11,
    status: "live",
  },
  {
    id: "sgd-and-adaptive-optimizers--recall-adam-parts",
    conceptId: "sgd-and-adaptive-optimizers",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Adam combines which two ideas?",
    choices: [
      { id: "a", text: "Momentum, plus a per-parameter step size scaled by a running average of squared gradients", correct: true },
      {
        id: "b",
        text: "Momentum, plus a learning-rate schedule",
        correct: false,
        misconception: {
          id: "adam-thought-to-schedule",
          description:
            "Adam adapts the relative step size across parameters; it has no notion of when training overall should slow down, which is why a schedule is still needed alongside it.",
          blameConceptId: "sgd-and-adaptive-optimizers",
        },
      },
      {
        id: "c",
        text: "Second-order curvature, plus gradient clipping",
        correct: false,
        misconception: {
          id: "adam-thought-second-order",
          description:
            "The √v denominator uses squared *gradients*, not second derivatives — it is a first-order method throughout.",
          blameConceptId: "sgd-and-adaptive-optimizers",
        },
      },
      {
        id: "d",
        text: "Minibatching, plus weight decay",
        correct: false,
        misconception: {
          id: "adam-confused-with-batching",
          description:
            "Minibatching is orthogonal — every optimiser here uses it — and weight decay is a regulariser rather than part of the update rule.",
          blameConceptId: "sgd-and-adaptive-optimizers",
        },
      },
    ],
    difficulty: 0.15,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["sgd-and-adaptive-optimizers"],
    source: ML_11,
    status: "live",
  },
  {
    id: "sgd-and-adaptive-optimizers--apply-effective-window",
    conceptId: "sgd-and-adaptive-optimizers",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "An exponentially weighted average with decay β averages roughly 1/(1 − β) terms. Over how many past gradients does β = 0.98 effectively average?",
    answerKey: 50,
    tolerance: 0.5,
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["sgd-and-adaptive-optimizers"],
    source: ML_11,
    status: "live",
  },
  {
    id: "sgd-and-adaptive-optimizers--apply-momentum-in-a-valley",
    conceptId: "sgd-and-adaptive-optimizers",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "In a long narrow valley, the gradient's across-valley component alternates sign each step while the along-valley component keeps its sign. Trace what momentum does to each.",
    rubric: {
      elements: [
        {
          id: "across-cancels",
          description:
            "The alternating across-valley components largely cancel in the running average, so the oscillation is damped.",
          weight: 4,
          required: true,
        },
        {
          id: "along-accumulates",
          description:
            "The consistently signed along-valley component accumulates, so speed builds in the direction that makes progress.",
          weight: 4,
          required: true,
        },
        {
          id: "why-it-matters",
          description:
            "Bonus: notes that the oscillation was what capped the usable step size, so damping it permits a larger one.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["sgd-and-adaptive-optimizers", "gradient-descent"],
    source: ML_11,
    status: "live",
  },
  {
    id: "sgd-and-adaptive-optimizers--explain-adagrad-flaw",
    conceptId: "sgd-and-adaptive-optimizers",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "AdaGrad divides by the square root of the accumulated sum of squared gradients. Why does that fail on a long training run, and what does RMSProp change?",
    rubric: {
      elements: [
        {
          id: "the-flaw",
          description:
            "The accumulated sum only ever grows, so the effective step size decays monotonically toward zero and training stalls before convergence.",
          weight: 5,
          required: true,
        },
        {
          id: "the-fix",
          description:
            "RMSProp replaces the sum with an exponentially weighted average, so old gradients decay out and the step size can recover — which is what made adaptive methods usable for deep networks.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.25,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["sgd-and-adaptive-optimizers", "gradient-descent"],
    source: ML_11,
    status: "live",
  },
  {
    id: "sgd-and-adaptive-optimizers--explain-adaptive-as-scaling",
    conceptId: "sgd-and-adaptive-optimizers",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Adam is noticeably more forgiving of unscaled input features than plain gradient descent. Explain why, from the update rule.",
    rubric: {
      elements: [
        {
          id: "per-parameter-scaling",
          description:
            "Dividing by √v gives a parameter that consistently receives large gradients a small step and one with small gradients a large step.",
          weight: 4,
          required: true,
        },
        {
          id: "same-correction-as-standardising",
          description:
            "That is the same correction standardising the inputs would have made to the loss surface, applied per parameter at run time — so the conditioning problem is partly absorbed by the optimiser rather than by preprocessing.",
          weight: 5,
          required: true,
        },
        {
          id: "not-a-substitute",
          description:
            "Bonus: notes it is a mitigation rather than a substitute — scaling still helps, and other methods in the pipeline may need it regardless.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["sgd-and-adaptive-optimizers", "gradient-descent"],
    source: ML_11,
    status: "live",
  },
  {
    id: "sgd-and-adaptive-optimizers--transfer-warmup",
    conceptId: "sgd-and-adaptive-optimizers",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Transformer training almost always begins with a few hundred steps at a very small learning rate. Explain what would go wrong without it.",
    rubric: {
      elements: [
        {
          id: "early-v-is-unreliable",
          description:
            "Adam's running estimate of squared gradients is built from very few samples at the start, so the per-parameter denominator is unreliable.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "A full-size step taken on a bad estimate can move parameters far enough to destabilise the network in a single update, and the run may never recover — warmup keeps the steps small until the estimate is trustworthy.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["sgd-and-adaptive-optimizers", "backpropagation"],
    source: ML_11,
    status: "live",
  },
  {
    id: "sgd-and-adaptive-optimizers--transfer-adamw",
    conceptId: "sgd-and-adaptive-optimizers",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "AdamW decouples weight decay from the adaptive scaling. What was wrong with adding an L2 penalty to the loss under plain Adam?",
    rubric: {
      elements: [
        {
          id: "the-penalty-gets-scaled",
          description:
            "An L2 term added to the loss becomes part of the gradient, so it is divided by √v like everything else — parameters with large historical gradients get their decay shrunk, and parameters with small ones get it amplified.",
          weight: 5,
          required: true,
        },
        {
          id: "not-what-decay-means",
          description:
            "That is not what weight decay is supposed to do: the intended effect is a uniform pull toward zero, independent of a parameter's gradient history. AdamW applies it directly to the parameters instead.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["sgd-and-adaptive-optimizers", "gradient-descent"],
    source: ML_11,
    status: "live",
  },

  // --- Dropout --------------------------------------------------------------
  {
    id: "dropout--recall-what-it-does",
    conceptId: "dropout",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe what dropout does during training and what it does at inference.",
    rubric: {
      elements: [
        { id: "training", description: "Training: sample a fresh mask each forward pass and zero each unit independently with probability p.", weight: 4, required: true },
        { id: "inference", description: "Inference: nothing is dropped — the full network is used.", weight: 3, required: true },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["dropout", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "dropout--recall-eval-mode",
    conceptId: "dropout",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A model with dropout is evaluated without switching it to evaluation mode. What is the symptom?",
    choices: [
      { id: "a", text: "Validation scores that are noisy and pessimistic, varying between identical runs", correct: true },
      {
        id: "b",
        text: "Validation scores that are too optimistic",
        correct: false,
        misconception: {
          id: "dropout-at-eval-thought-optimistic",
          description:
            "Leaving dropout on handicaps the evaluation, so scores are worse than the model deserves — the opposite of an optimistic bias.",
          blameConceptId: "dropout",
        },
      },
      {
        id: "c",
        text: "No effect, since dropout only changes training",
        correct: false,
        misconception: {
          id: "dropout-thought-inert-at-eval",
          description:
            "The dropout layer is active until the model is told otherwise; the framework does not infer intent from context.",
          blameConceptId: "dropout",
        },
      },
      {
        id: "d",
        text: "Training loss rises",
        correct: false,
        misconception: {
          id: "eval-mode-confused-with-training",
          description:
            "Evaluation mode affects the evaluation pass, not the training loop that already ran.",
          blameConceptId: "dropout",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["dropout"],
    source: ML_11,
    status: "live",
  },
  {
    id: "dropout--apply-inverted-scaling",
    conceptId: "dropout",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Inverted dropout divides surviving activations by (1 − p) during training. With p = 0.2, by what factor is a surviving activation multiplied? Give three decimal places.",
    answerKey: 1.25,
    tolerance: 0.005,
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["dropout"],
    source: ML_11,
    status: "live",
  },
  {
    id: "dropout--apply-why-correction-needed",
    conceptId: "dropout",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A unit's inputs sum to 10 in expectation. With p = 0.5 dropout and no scaling correction, compare what the next layer sees at training time and at inference, and say why that breaks the network.",
    rubric: {
      elements: [
        { id: "training-expectation", description: "Training: half the inputs are zeroed, so the expected sum is 5.", weight: 3, required: true },
        { id: "inference-value", description: "Inference: nothing is dropped, so the sum is 10.", weight: 3, required: true },
        { id: "why-it-breaks", description: "The following layer's weights were fitted against inputs averaging 5 and now receive twice that, and the discrepancy compounds through the depth.", weight: 4, required: true },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["dropout", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "dropout--explain-co-adaptation",
    conceptId: "dropout",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain the co-adaptation account of why dropout regularises, and say how it differs from what a weight penalty does.",
    rubric: {
      elements: [
        {
          id: "co-adaptation",
          description:
            "Without dropout a unit can learn to correct a specific other unit's systematic error — a partnership that holds on the training set and is fragile off it. If either partner may vanish at any step, no such contract can be relied on.",
          weight: 5,
          required: true,
        },
        {
          id: "different-from-a-penalty",
          description:
            "A weight penalty shrinks magnitudes and says nothing about what units coordinate on; dropout targets the coordination directly, which is a different mechanism rather than a different strength of the same one.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["dropout", "overfitting-underfitting"],
    source: ML_11,
    status: "live",
  },
  {
    id: "dropout--explain-implicit-ensemble",
    conceptId: "dropout",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Dropout is also described as training an exponentially large ensemble for the price of one model. Explain that reading.",
    rubric: {
      elements: [
        {
          id: "each-mask-is-a-subnetwork",
          description:
            "Each sampled mask defines a different thinned sub-network — 2ⁿ of them for n droppable units — and each training step trains one of them.",
          weight: 4,
          required: true,
        },
        {
          id: "weight-sharing-and-averaging",
          description:
            "They all share weights, so training one improves the others, and using the full network at test time approximates averaging their predictions — bagging over an ensemble that could never be trained explicitly.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.65,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["dropout", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "dropout--transfer-training-loss-above-validation",
    conceptId: "dropout",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A network trained with dropout shows training loss consistently above validation loss. Normally that pattern signals a broken split. Why is it expected here?",
    rubric: {
      elements: [
        {
          id: "asymmetric-conditions",
          description:
            "The training pass is handicapped — half the units are missing — while the validation pass uses the full network, so the two numbers are not measured under the same conditions.",
          weight: 5,
          required: true,
        },
        {
          id: "how-to-tell-them-apart",
          description:
            "The genuine leakage version persists when dropout is disabled for both; if the gap closes or reverses once the training loss is measured in evaluation mode, dropout was the explanation.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["dropout", "overfitting-underfitting"],
    source: ML_11,
    status: "live",
  },
  {
    id: "dropout--transfer-mc-dropout",
    conceptId: "dropout",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Keeping dropout switched on at test time and running several forward passes is used to obtain uncertainty estimates. Explain the idea and one honest limitation.",
    rubric: {
      elements: [
        {
          id: "the-idea",
          description:
            "Each stochastic pass samples a different sub-network, so the spread of their predictions approximates a posterior over the network's weights — uncertainty from a model that was not built to provide any.",
          weight: 4,
          required: true,
        },
        {
          id: "the-limitation",
          description:
            "It is an approximation whose quality depends on the dropout rate and architecture rather than on any modelled belief, so the resulting intervals are not calibrated by construction and should be checked before being relied on.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["dropout", "neural-networks"],
    source: ML_11,
    status: "live",
  },

  // --- Batch Normalization --------------------------------------------------
  {
    id: "batch-normalization--recall-operation",
    conceptId: "batch-normalization",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "State what batch normalisation computes, including the learned parameters.",
    rubric: {
      elements: [
        { id: "normalise", description: "Standardise each activation across the examples in the minibatch: x̂ = (x − μ_batch)/√(σ²_batch + ε).", weight: 4, required: true },
        { id: "learned-affine", description: "Then apply a learned scale γ and shift β: y = γx̂ + β.", weight: 3, required: true },
      ],
    },
    difficulty: 0.05,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["batch-normalization", "feature-scaling"],
    source: ML_11,
    status: "live",
  },
  {
    id: "batch-normalization--recall-inference-statistics",
    conceptId: "batch-normalization",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "At inference on a single example, which statistics does batch normalisation use?",
    choices: [
      { id: "a", text: "Running averages of the batch statistics accumulated during training", correct: true },
      {
        id: "b",
        text: "The statistics of the current batch, as during training",
        correct: false,
        misconception: {
          id: "inference-thought-to-use-batch",
          description:
            "A single prediction has no batch, and even with one, a prediction depending on which other examples were alongside it would be unacceptable.",
          blameConceptId: "batch-normalization",
        },
      },
      {
        id: "c",
        text: "The statistics of the training set, recomputed at inference time",
        correct: false,
        misconception: {
          id: "inference-thought-to-recompute",
          description:
            "The training data is generally not available at serving time; the running averages are maintained precisely so it need not be.",
          blameConceptId: "batch-normalization",
        },
      },
      {
        id: "d",
        text: "None — normalisation is skipped at inference",
        correct: false,
        misconception: {
          id: "inference-thought-to-skip",
          description:
            "Skipping it would feed the next layer activations on a completely different scale from the ones it was fitted against.",
          blameConceptId: "batch-normalization",
        },
      },
    ],
    difficulty: 0.35,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["batch-normalization"],
    source: ML_11,
    status: "live",
  },
  {
    id: "batch-normalization--apply-why-gamma-and-beta",
    conceptId: "batch-normalization",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Why are the learned γ and β needed, given that the point of the layer is to normalise?",
    rubric: {
      elements: [
        {
          id: "without-them-it-constrains",
          description:
            "Without them the layer would force every activation to zero mean and unit variance, which is a genuine restriction on what the network can represent.",
          weight: 4,
          required: true,
        },
        {
          id: "with-them-nothing-is-lost",
          description:
            "With them the network can undo the normalisation exactly if that is what it wants, so nothing is lost — the optimisation is reparameterised into coordinates that are easier to move in, and no expressiveness is given up for it.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["batch-normalization", "backpropagation"],
    source: ML_11,
    status: "live",
  },
  {
    id: "batch-normalization--apply-small-batches",
    conceptId: "batch-normalization",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A model must train at batch size 2 because of memory limits. What happens to batch normalisation, and what would you use instead?",
    rubric: {
      elements: [
        {
          id: "noisy-statistics",
          description:
            "μ and σ² estimated from two examples are extremely noisy, so each example's normalisation swings with whichever example it is paired with — the layer can be worse than nothing at this size.",
          weight: 4,
          required: true,
        },
        {
          id: "alternative",
          description:
            "Use layer normalisation (or group normalisation), which normalises across features within each example and therefore has no batch dependence at all.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["batch-normalization", "feature-scaling"],
    source: ML_11,
    status: "live",
  },
  {
    id: "batch-normalization--explain-same-idea-as-input-scaling",
    conceptId: "batch-normalization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Relate batch normalisation to the argument for standardising input features, and say what it adds beyond it.",
    rubric: {
      elements: [
        {
          id: "same-argument",
          description:
            "Unequal scales make the loss surface a narrow canyon; the same argument applies to the inputs of every hidden layer, which are activations nobody scaled.",
          weight: 4,
          required: true,
        },
        {
          id: "what-it-adds",
          description:
            "Unlike input scaling it re-applies the correction continuously, as those activations shift during training — a one-off transform of the inputs cannot do that.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["batch-normalization", "feature-scaling"],
    source: ML_11,
    status: "live",
  },
  {
    id: "batch-normalization--explain-contested-mechanism",
    conceptId: "batch-normalization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "The original 'internal covariate shift' explanation for batch normalisation is now contested. Summarise the dispute and say what it does and does not change.",
    rubric: {
      elements: [
        {
          id: "the-original-claim",
          description:
            "The original account was that it reduces the drift in each layer's input distribution as earlier layers update.",
          weight: 3,
          required: true,
        },
        {
          id: "the-challenge",
          description:
            "Later work found networks with deliberately injected shift after the normalisation still train fine, and argued instead that it smooths the loss landscape, making gradients more predictable and permitting larger stable learning rates.",
          weight: 4,
          required: true,
        },
        {
          id: "what-is-unaffected",
          description:
            "The empirical benefit was never in doubt and the practice is unchanged — a technique outliving its explanation, which is worth being able to state as such.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["batch-normalization"],
    source: ML_11,
    status: "live",
  },
  {
    id: "batch-normalization--transfer-batch-dependence",
    conceptId: "batch-normalization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "During training, one example's normalisation depends on the others in its batch. Give one benefit and one genuine problem this creates.",
    rubric: {
      elements: [
        {
          id: "benefit",
          description:
            "It injects noise into each example's representation, which has a mild regularising effect — the same reason any stochastic perturbation regularises.",
          weight: 4,
          required: true,
        },
        {
          id: "problem",
          description:
            "It is an information channel between examples in a batch, which matters where that coupling is unacceptable — privacy-sensitive training, or contrastive setups where it can leak the answer between positives and negatives.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["batch-normalization"],
    source: ML_11,
    status: "live",
  },
  {
    id: "batch-normalization--transfer-with-dropout",
    conceptId: "batch-normalization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Stacking dropout immediately before batch normalisation is known to interact badly. Explain the mechanism.",
    rubric: {
      elements: [
        {
          id: "dropout-changes-the-statistics",
          description:
            "Dropout changes the variance of the activations it feeds forward, and does so differently at training time (masked) and inference (not masked).",
          weight: 4,
          required: true,
        },
        {
          id: "the-running-averages-are-wrong",
          description:
            "Batch norm's running averages are therefore estimated under one distribution and applied under another, so the normalisation is systematically wrong at inference — which is why modern blocks generally use one or the other.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["batch-normalization", "backpropagation"],
    source: ML_11,
    status: "live",
  },

  // --- Convolutional Neural Networks ---------------------------------------
  {
    id: "convolutional-neural-networks--recall-two-priors",
    conceptId: "convolutional-neural-networks",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the two assumptions about the data that a convolutional layer builds into the architecture.",
    rubric: {
      elements: [
        { id: "locality", description: "Locality: each output depends only on a small neighbourhood of the input.", weight: 3, required: true },
        { id: "weight-sharing", description: "Weight sharing, giving translation equivariance: the same filter is applied at every position, so a pattern means the same thing wherever it appears.", weight: 4, required: true },
      ],
    },
    difficulty: -0.05,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["convolutional-neural-networks", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "convolutional-neural-networks--recall-extrapolation-of-size",
    conceptId: "convolutional-neural-networks",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How does a convolutional layer's parameter count depend on the input image's height and width?",
    choices: [
      { id: "a", text: "Not at all — it depends only on the kernel size and the channel counts", correct: true },
      {
        id: "b",
        text: "Linearly in the number of pixels",
        correct: false,
        misconception: {
          id: "conv-params-thought-to-scale-with-pixels",
          description:
            "That is a fully connected layer. The whole point of sharing one kernel across positions is that the count is independent of how many positions there are.",
          blameConceptId: "convolutional-neural-networks",
        },
      },
      {
        id: "c",
        text: "Quadratically in the image side length",
        correct: false,
        misconception: {
          id: "conv-params-thought-quadratic",
          description:
            "The *computation* scales with the number of positions; the parameters do not. Conflating the two misses why one architecture handles multiple resolutions.",
          blameConceptId: "convolutional-neural-networks",
        },
      },
      {
        id: "d",
        text: "It depends on the stride",
        correct: false,
        misconception: {
          id: "conv-params-thought-stride-dependent",
          description:
            "Stride changes the output size and therefore the compute, not how many weights the kernel has.",
          blameConceptId: "convolutional-neural-networks",
        },
      },
    ],
    difficulty: 0.25,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["convolutional-neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "convolutional-neural-networks--apply-parameter-count",
    conceptId: "convolutional-neural-networks",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A 3 × 3 convolution maps 3 input channels to 64 output channels, with one bias per output channel. How many parameters does it have?",
    answerKey: 1792,
    tolerance: 0.001,
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["convolutional-neural-networks", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "convolutional-neural-networks--apply-receptive-field",
    conceptId: "convolutional-neural-networks",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Two stacked 3 × 3 convolutions cover the same input region as one 5 × 5. Compare the two on parameter count and on expressiveness.",
    rubric: {
      elements: [
        { id: "region", description: "Both see a 5 × 5 region: the second 3 × 3 layer's receptive field extends one pixel further in each direction than the first's.", weight: 3, required: true },
        { id: "parameters", description: "Per channel pair, two 3 × 3 kernels are 18 weights against a 5 × 5 kernel's 25 — fewer parameters.", weight: 3, required: true },
        { id: "expressiveness", description: "The stacked version also has a nonlinearity between the two layers, so it can represent more than a single linear filter over the same region.", weight: 4, required: true },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["convolutional-neural-networks", "activation-functions"],
    source: ML_11,
    status: "live",
  },
  {
    id: "convolutional-neural-networks--explain-prior-as-architecture",
    conceptId: "convolutional-neural-networks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Regularisation usually means adding a term to the loss. In what sense is a convolutional layer a stronger form of the same idea?",
    rubric: {
      elements: [
        {
          id: "constraint-on-what-exists",
          description:
            "The assumption is built into which weights exist at all, rather than into a penalty discouraging certain values — a hard constraint rather than a soft one.",
          weight: 5,
          required: true,
        },
        {
          id: "consequence-for-data",
          description:
            "That is why convolutional networks need far less data than a dense network to reach the same accuracy on images: the prior supplies what data would otherwise have to.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["convolutional-neural-networks", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "convolutional-neural-networks--explain-equivariance-not-invariance",
    conceptId: "convolutional-neural-networks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Convolution gives translation equivariance, not invariance. Explain the difference and where invariance actually comes from.",
    rubric: {
      elements: [
        {
          id: "equivariance",
          description:
            "Equivariance: shift the input and the feature map shifts identically — the representation moves with the object.",
          weight: 4,
          required: true,
        },
        {
          id: "where-invariance-comes-from",
          description:
            "Invariance — same output regardless of position — comes from pooling, strided downsampling and the final classifier collapsing the spatial dimensions, not from the convolution itself.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.65,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["convolutional-neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "convolutional-neural-networks--transfer-augmentation-necessity",
    conceptId: "convolutional-neural-networks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Data augmentation with rotations and rescaling is not optional for image models in practice. Explain why, from what the architecture does and does not provide.",
    rubric: {
      elements: [
        {
          id: "only-translation-is-built-in",
          description:
            "The architecture provides equivariance to translation and nothing else — rotation, scale and viewpoint have no corresponding structure in the weights.",
          weight: 5,
          required: true,
        },
        {
          id: "augmentation-supplies-the-rest",
          description:
            "Those invariances must therefore be learned from examples, and augmentation is how the examples are manufactured — it is filling a genuine gap in the prior rather than adding generic noise.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["convolutional-neural-networks", "overfitting-underfitting"],
    source: ML_11,
    status: "live",
  },
  {
    id: "convolutional-neural-networks--transfer-vit-tradeoff",
    conceptId: "convolutional-neural-networks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Vision transformers drop the locality and weight-sharing priors and let attention learn the structure. They beat convolutions at very large data scale and lose at small scale. Explain why that pattern is exactly what a prior predicts.",
    rubric: {
      elements: [
        {
          id: "priors-substitute-for-data",
          description:
            "A prior supplies structure the data would otherwise have to provide, so it helps most when data is scarce.",
          weight: 4,
          required: true,
        },
        {
          id: "and-cost-at-scale",
          description:
            "It also constrains: if the assumption is not exactly right, a model that could have learned the true structure from enough data will overtake one that had it imposed — which is what happens at large scale.",
          weight: 5,
          required: true,
        },
        {
          id: "the-general-lesson",
          description:
            "Bonus: identifies this as the general shape of the bias-variance trade applied to architectural assumptions rather than to model complexity.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["convolutional-neural-networks", "bias-variance-tradeoff"],
    source: ML_11,
    status: "live",
  },

  // --- Recurrent Neural Networks -------------------------------------------
  {
    id: "recurrent-neural-networks--recall-recurrence",
    conceptId: "recurrent-neural-networks",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "State the recurrent update and say what is shared across time steps.",
    rubric: {
      elements: [
        { id: "the-update", description: "hₜ = σ(W_hh·hₜ₋₁ + W_xh·xₜ + b).", weight: 4, required: true },
        { id: "sharing", description: "The same weight matrices are applied at every time step, so the parameter count is independent of sequence length.", weight: 3, required: true },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["recurrent-neural-networks", "activation-functions", "backpropagation"],
    source: ML_11,
    status: "live",
  },
  {
    id: "recurrent-neural-networks--recall-which-problem-is-easy",
    conceptId: "recurrent-neural-networks",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Of the exploding and vanishing gradient problems in a recurrent network, which has a cheap and effective fix?",
    choices: [
      { id: "a", text: "Exploding — clipping the gradient norm caps it at almost no cost", correct: true },
      {
        id: "b",
        text: "Vanishing — a larger learning rate compensates for it",
        correct: false,
        misconception: {
          id: "vanishing-thought-fixable-by-lr",
          description:
            "You cannot amplify a signal that has already been destroyed to numerical noise; scaling it up scales the noise with it.",
          blameConceptId: "recurrent-neural-networks",
        },
      },
      {
        id: "c",
        text: "Both are fixed by clipping",
        correct: false,
        misconception: {
          id: "clipping-thought-to-fix-both",
          description:
            "Clipping bounds a gradient that is too large. It does nothing whatsoever for one that is too small.",
          blameConceptId: "recurrent-neural-networks",
        },
      },
      {
        id: "d",
        text: "Neither has a practical fix",
        correct: false,
        misconception: {
          id: "both-thought-unfixable",
          description:
            "Overstates the difficulty. The asymmetry between the two is the reason gating was an architectural change and clipping was a two-line one.",
          blameConceptId: "recurrent-neural-networks",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["recurrent-neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "recurrent-neural-networks--apply-unrolled-depth",
    conceptId: "recurrent-neural-networks",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Backpropagation through time unrolls the recurrence into one layer per step. For a sequence of 500 steps, how many layers deep is the effective network the gradient must traverse to reach step 1?",
    answerKey: 500,
    tolerance: 0.001,
    difficulty: 0.55,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["recurrent-neural-networks", "backpropagation"],
    source: ML_11,
    status: "live",
  },
  {
    id: "recurrent-neural-networks--apply-gate-roles",
    conceptId: "recurrent-neural-networks",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Name the three gates of an LSTM and say what each controls.",
    rubric: {
      elements: [
        { id: "forget", description: "Forget gate: how much of the previous cell state to keep.", weight: 3, required: true },
        { id: "input", description: "Input gate: how much of the newly computed candidate to write into the cell.", weight: 3, required: true },
        { id: "output", description: "Output gate: how much of the cell state to expose as this step's hidden state.", weight: 3, required: true },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["recurrent-neural-networks", "activation-functions"],
    source: ML_11,
    status: "live",
  },
  {
    id: "recurrent-neural-networks--explain-why-gating-helps",
    conceptId: "recurrent-neural-networks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "An LSTM's cell state is updated mainly by addition rather than by repeated matrix multiplication. Explain why that is what rescues the gradient.",
    rubric: {
      elements: [
        {
          id: "the-problem-restated",
          description:
            "Repeated multiplication by the same matrix scales the gradient by a power of its singular values, so it vanishes or explodes exponentially in the number of steps.",
          weight: 4,
          required: true,
        },
        {
          id: "additive-path",
          description:
            "An additive update gives the cell state a near-identity default path, so gradient can flow along it across many steps without being repeatedly rescaled — the same trick residual connections use in deep feedforward networks.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["recurrent-neural-networks", "backpropagation"],
    source: ML_11,
    status: "live",
  },
  {
    id: "recurrent-neural-networks--explain-forget-bias-init",
    conceptId: "recurrent-neural-networks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Initialising an LSTM's forget-gate bias to a positive value is a standard trick. Explain why it helps.",
    rubric: {
      elements: [
        {
          id: "what-it-does",
          description:
            "A positive bias puts the forget gate's sigmoid near 1 at initialisation, so the cell state starts out close to 'keep everything'.",
          weight: 4,
          required: true,
        },
        {
          id: "why-that-matters",
          description:
            "That preserves the near-identity path from the first step, so gradient reaches distant time steps while the gates are still learning — a gate initialised near 0 would erase the state and the signal before anything could be learned about when to keep it.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["recurrent-neural-networks", "activation-functions"],
    source: ML_11,
    status: "live",
  },
  {
    id: "recurrent-neural-networks--transfer-why-attention-won",
    conceptId: "recurrent-neural-networks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Attention-based models displaced recurrent ones for most sequence tasks. Give the decisive reason, and explain why it is not primarily about accuracy.",
    rubric: {
      elements: [
        {
          id: "parallelism",
          description:
            "A recurrent network cannot compute step t before step t − 1, so training time scales with sequence length no matter how much hardware is available; attention removes that dependency and computes all positions at once.",
          weight: 5,
          required: true,
        },
        {
          id: "compounds-into-scale",
          description:
            "On modern accelerators that difference compounds into models that are simply larger and trained on more data — so the accuracy gap is largely downstream of the parallelism, not independent of it.",
          weight: 4,
          required: true,
        },
        {
          id: "path-length-too",
          description:
            "Bonus: also names the constant path length between distant positions, against a recurrent network's linear one.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["recurrent-neural-networks", "backpropagation"],
    source: ML_11,
    status: "live",
  },
  {
    id: "recurrent-neural-networks--transfer-when-still-right",
    conceptId: "recurrent-neural-networks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Give a setting where a recurrent model is still the better choice than an attention-based one, and justify it from their respective costs.",
    rubric: {
      elements: [
        {
          id: "streaming-or-short",
          description:
            "Genuinely streaming inference with unbounded input — where a fixed-size hidden state summarising the past is exactly what is wanted — or short sequences on constrained hardware.",
          weight: 4,
          required: true,
        },
        {
          id: "the-cost-argument",
          description:
            "Attention costs O(n²) in sequence length and must hold the whole context, so on a long or unbounded stream it is the expensive option; a recurrent step is O(1) in the history length.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["recurrent-neural-networks"],
    source: ML_11,
    status: "live",
  },

  // --- Attention Mechanism --------------------------------------------------
  {
    id: "attention-mechanism--recall-qkv",
    conceptId: "attention-mechanism",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the three roles in an attention computation and say what each represents.",
    rubric: {
      elements: [
        { id: "query", description: "Query: what this position is looking for.", weight: 3, required: true },
        { id: "key", description: "Key: what each position offers, used for matching against queries.", weight: 3, required: true },
        { id: "value", description: "Value: what each position actually contributes once selected.", weight: 3, required: true },
      ],
    },
    difficulty: 0.05,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["attention-mechanism", "recurrent-neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "attention-mechanism--recall-cost",
    conceptId: "attention-mechanism",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How does self-attention's cost scale with sequence length n?",
    choices: [
      { id: "a", text: "Quadratically — the score matrix is n × n", correct: true },
      {
        id: "b",
        text: "Linearly, like a recurrent layer",
        correct: false,
        misconception: {
          id: "attention-cost-thought-linear",
          description:
            "Every position attends to every position, so there are n² scores. Linear cost is what the efficient-attention variants are trying to achieve, not what standard attention has.",
          blameConceptId: "attention-mechanism",
        },
      },
      {
        id: "c",
        text: "It does not depend on n",
        correct: false,
        misconception: {
          id: "attention-cost-thought-constant",
          description:
            "The *path length* between positions is constant; the cost is not. Conflating the two misses the binding constraint on context length.",
          blameConceptId: "attention-mechanism",
        },
      },
      {
        id: "d",
        text: "Logarithmically",
        correct: false,
        misconception: {
          id: "attention-cost-thought-log",
          description:
            "There is no hierarchical structure in standard attention to give a logarithmic cost — every pair is scored explicitly.",
          blameConceptId: "attention-mechanism",
        },
      },
    ],
    difficulty: 0.35,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["attention-mechanism"],
    source: ML_11,
    status: "live",
  },
  {
    id: "attention-mechanism--apply-score-variance",
    conceptId: "attention-mechanism",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Query and key components are independent with mean 0 and variance 1. In dimension dₖ = 64, what is the standard deviation of their unscaled dot product?",
    answerKey: 8,
    tolerance: 0.05,
    difficulty: 0.7,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["attention-mechanism", "dot-product", "variance"],
    source: ML_11,
    status: "live",
  },
  {
    id: "attention-mechanism--apply-why-scale",
    conceptId: "attention-mechanism",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Explain what happens to the softmax when scores have a standard deviation of 8, and why dividing by √dₖ fixes it.",
    rubric: {
      elements: [
        {
          id: "saturation",
          description:
            "Scores that spread over a range of roughly ±20 push the softmax to put almost all its mass on one position, and in that regime its gradient is nearly zero — the layer stops learning.",
          weight: 4,
          required: true,
        },
        {
          id: "the-fix",
          description:
            "Dividing by √dₖ restores unit variance to the scores, keeping the softmax in the range where it still has slope.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["attention-mechanism", "dot-product"],
    source: ML_11,
    status: "live",
  },
  {
    id: "attention-mechanism--explain-keys-vs-values",
    conceptId: "attention-mechanism",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why are keys and values separate projections rather than the same vector used for both?",
    rubric: {
      elements: [
        {
          id: "advertise-vs-contribute",
          description:
            "A position can advertise itself as relevant on one basis and contribute something quite different — the criterion for being selected and the content returned need not coincide.",
          weight: 5,
          required: true,
        },
        {
          id: "expressiveness",
          description:
            "Collapsing them would force matching on exactly the content returned, which is a strictly less expressive mechanism — the split is what makes attention a learned lookup rather than a similarity average.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["attention-mechanism"],
    source: ML_11,
    status: "live",
  },
  {
    id: "attention-mechanism--explain-what-it-buys",
    conceptId: "attention-mechanism",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Name two structural properties attention has that a recurrent layer does not, and say what each removes as a problem.",
    rubric: {
      elements: [
        {
          id: "constant-path-length",
          description:
            "Constant path length: any position reads any other in one layer, so there is no long-range dependency problem to solve architecturally.",
          weight: 4,
          required: true,
        },
        {
          id: "parallelism",
          description:
            "Full parallelism across positions: no step waits on the previous one, so training time stops scaling with sequence length.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["attention-mechanism", "recurrent-neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "attention-mechanism--transfer-attention-is-not-explanation",
    conceptId: "attention-mechanism",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A colleague presents an attention heatmap as evidence of what the model used to make a decision. What is the objection, and what would the heatmap legitimately support?",
    rubric: {
      elements: [
        {
          id: "the-objection",
          description:
            "Attention distributions can often be substantially altered while leaving the output nearly unchanged, so a high weight is not a faithful attribution — the model may not have depended on what the heatmap highlights.",
          weight: 5,
          required: true,
        },
        {
          id: "legitimate-use",
          description:
            "It remains a useful debugging view and weak evidence about mechanism — a hypothesis to test by intervention, not a conclusion.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["attention-mechanism"],
    source: ML_11,
    status: "live",
  },
  {
    id: "attention-mechanism--transfer-quadratic-constraint",
    conceptId: "attention-mechanism",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Doubling a model's context length quadruples the attention compute. Explain why context length is therefore a headline specification rather than a free parameter, and what kinds of approach attack it.",
    rubric: {
      elements: [
        {
          id: "why-it-binds",
          description:
            "The n × n score matrix must be computed and, naively, held in memory, so context length is limited by hardware rather than by anything about the data — it is a real engineering budget, not a setting.",
          weight: 4,
          required: true,
        },
        {
          id: "the-approaches",
          description:
            "Names approaches: sparse attention restricting which pairs are scored, linear or low-rank approximations of the operation, and memory-efficient exact implementations that avoid materialising the matrix.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["attention-mechanism"],
    source: ML_11,
    status: "live",
  },

  // --- Transformers ---------------------------------------------------------
  {
    id: "transformers--recall-components",
    conceptId: "transformers",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name four components of a transformer block besides self-attention.",
    rubric: {
      elements: [
        {
          id: "four-components",
          description:
            "Any four of: position-wise feedforward network, residual connections, layer normalisation, positional encoding, multiple attention heads, causal masking in decoder blocks.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.15,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["transformers", "attention-mechanism"],
    source: ML_11,
    status: "live",
  },
  {
    id: "transformers--recall-positional-encoding",
    conceptId: "transformers",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why does a transformer need positional encoding when a recurrent network does not?",
    choices: [
      { id: "a", text: "Self-attention is permutation-equivariant, so without it the model sees only a set of tokens", correct: true },
      {
        id: "b",
        text: "To make training converge faster",
        correct: false,
        misconception: {
          id: "positional-thought-optimisation",
          description:
            "It is not an optimisation aid. Without it the architecture is literally incapable of distinguishing a sentence from its anagram.",
          blameConceptId: "transformers",
        },
      },
      {
        id: "c",
        text: "To reduce the quadratic cost of attention",
        correct: false,
        misconception: {
          id: "positional-confused-with-efficiency",
          description:
            "Positional encoding adds information; it does nothing to the number of pairs scored.",
          blameConceptId: "attention-mechanism",
        },
      },
      {
        id: "d",
        text: "To normalise the activations between layers",
        correct: false,
        misconception: {
          id: "positional-confused-with-normalisation",
          description:
            "That is layer normalisation's job — a separate component with a separate purpose.",
          blameConceptId: "batch-normalization",
        },
      },
    ],
    difficulty: 0.45,
    discrimination: 1.5,
    expectedSeconds: 50,
    prereqClosure: ["transformers", "attention-mechanism"],
    source: ML_11,
    status: "live",
  },
  {
    id: "transformers--apply-head-dimension",
    conceptId: "transformers",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A model has d_model = 512 and 8 attention heads, with the representation split evenly across them. What is the dimension per head?",
    answerKey: 64,
    tolerance: 0.001,
    difficulty: 0.75,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["transformers", "attention-mechanism"],
    source: ML_11,
    status: "live",
  },
  {
    id: "transformers--apply-causal-mask",
    conceptId: "transformers",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Causal masking prevents position t from attending to positions after it. Explain what this makes possible during training that would otherwise be impossible.",
    rubric: {
      elements: [
        {
          id: "all-positions-at-once",
          description:
            "Every position's next-token loss can be computed in a single parallel forward pass over the whole sequence, rather than one step at a time.",
          weight: 4,
          required: true,
        },
        {
          id: "while-preserving-the-factorisation",
          description:
            "The mask is what keeps that honest: without it each position would see its own answer, and the left-to-right factorisation the model is supposed to learn would be violated.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["transformers", "attention-mechanism"],
    source: ML_11,
    status: "live",
  },
  {
    id: "transformers--explain-multiple-heads",
    conceptId: "transformers",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why use several attention heads rather than one, and why does that not multiply the cost?",
    rubric: {
      elements: [
        {
          id: "one-distribution-is-blunt",
          description:
            "A single attention distribution must serve every relationship at once — agreement, coreference, topical relevance — and averaging them produces a compromise representing none well.",
          weight: 4,
          required: true,
        },
        {
          id: "specialisation",
          description:
            "Splitting the representation into h subspaces lets each head specialise in a different relation.",
          weight: 3,
          required: true,
        },
        {
          id: "cost-is-reallocated",
          description:
            "The dimension per head shrinks proportionally, so the total is roughly unchanged — it is a reallocation of capacity, not an increase.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["transformers", "attention-mechanism"],
    source: ML_11,
    status: "live",
  },
  {
    id: "transformers--explain-attention-and-ffn",
    conceptId: "transformers",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A transformer block contains both attention and a position-wise feedforward network. What does each do, and why is neither sufficient alone?",
    rubric: {
      elements: [
        {
          id: "attention-moves",
          description:
            "Attention moves information between positions — it is the only component that lets one position see another.",
          weight: 4,
          required: true,
        },
        {
          id: "ffn-transforms",
          description:
            "The feedforward network transforms each position's representation independently, and holds most of the block's parameters — it is where per-position computation happens.",
          weight: 4,
          required: true,
        },
        {
          id: "why-both",
          description:
            "Attention alone only ever forms weighted averages of values; without the nonlinear per-position transform there is very little computation being done on what was gathered.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["transformers", "attention-mechanism", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "transformers--transfer-layer-norm-choice",
    conceptId: "transformers",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Transformers use layer normalisation rather than batch normalisation. Give two reasons specific to what transformers process.",
    rubric: {
      elements: [
        {
          id: "variable-length",
          description:
            "Sequences vary in length and are padded, so batch statistics computed across examples would mix real positions with padding and vary with batch composition.",
          weight: 4,
          required: true,
        },
        {
          id: "no-batch-dependence",
          description:
            "Layer normalisation normalises across features within each example, so nothing depends on which other examples are present — which also removes the train/inference asymmetry and the small-batch degradation.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["transformers", "batch-normalization"],
    source: ML_11,
    status: "live",
  },
  {
    id: "transformers--transfer-generality",
    conceptId: "transformers",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "The same block architecture handles text, images as patches, audio and protein sequences. What property makes that possible, and what is given up relative to an architecture built around a domain assumption — such as one whose weights are shared across image positions because a pattern means the same thing wherever it appears?",
    rubric: {
      elements: [
        {
          id: "the-property",
          description:
            "It assumes almost nothing about the input beyond it being a set of vectors with positions — no locality, no ordering structure, no fixed grid — so any domain that can be tokenised into such a set fits.",
          weight: 4,
          required: true,
        },
        {
          id: "what-is-given-up",
          description:
            "The domain prior: a convolution's locality and weight sharing are true facts about images that a transformer must instead learn from data, which is why it needs far more of it at small scale.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["transformers"],
    source: ML_11,
    status: "live",
  },

  // --- Embeddings -----------------------------------------------------------
  {
    id: "embeddings--recall-what-it-is",
    conceptId: "embeddings",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is an embedding, and what does it replace?",
    rubric: {
      elements: [
        { id: "definition", description: "A learned dense vector representing a discrete item — a word, a product, a user — in which geometric relationships correspond to semantic ones.", weight: 4, required: true },
        { id: "what-it-replaces", description: "It replaces a one-hot representation, in which every pair of items is equally dissimilar.", weight: 3, required: true },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["embeddings", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "embeddings--recall-lookup-is-a-matmul",
    conceptId: "embeddings",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "An embedding layer is implemented as an indexed lookup. What operation is it mathematically equivalent to?",
    choices: [
      { id: "a", text: "Multiplying a one-hot vector by a weight matrix, which selects one row", correct: true },
      {
        id: "b",
        text: "A hash function mapping items to fixed vectors",
        correct: false,
        misconception: {
          id: "embedding-thought-fixed",
          description:
            "A hash assigns vectors without learning. Embedding rows are parameters trained by backpropagation like any others.",
          blameConceptId: "embeddings",
        },
      },
      {
        id: "c",
        text: "A principal component projection of the one-hot space",
        correct: false,
        misconception: {
          id: "embedding-confused-with-pca",
          description:
            "PCA is derived from a covariance structure; an embedding is fitted to a task objective, and the two give different geometries.",
          blameConceptId: "pca",
        },
      },
      {
        id: "d",
        text: "A nearest-neighbour lookup in a fixed vocabulary table",
        correct: false,
        misconception: {
          id: "embedding-confused-with-retrieval",
          description:
            "Retrieval happens over embeddings; it is not what produces them.",
          blameConceptId: "embeddings",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 50,
    prereqClosure: ["embeddings", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "embeddings--apply-parameter-count",
    conceptId: "embeddings",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "An embedding table covers a vocabulary of 50,000 items with 300 dimensions each. How many parameters does it hold?",
    answerKey: 15000000,
    tolerance: 1,
    difficulty: 0.85,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["embeddings"],
    source: ML_11,
    status: "live",
  },
  {
    id: "embeddings--apply-why-not-one-hot",
    conceptId: "embeddings",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Give the decisive defect of a one-hot representation — not its size — and say what it costs a model.",
    rubric: {
      elements: [
        {
          id: "mutual-orthogonality",
          description:
            "Every one-hot vector is orthogonal to every other, so 'cat' and 'kitten' are exactly as dissimilar as 'cat' and 'tuesday' — the representation encodes no relatedness.",
          weight: 4,
          required: true,
        },
        {
          id: "no-transfer",
          description:
            "Nothing learned about one item can transfer to a related one, because there is no relatedness structure to transfer along — every item must be learned from its own examples alone.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["embeddings"],
    source: ML_11,
    status: "live",
  },
  {
    id: "embeddings--explain-where-geometry-comes-from",
    conceptId: "embeddings",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Nobody places the vectors. Explain how the geometry arises, and what assumption makes it meaningful.",
    rubric: {
      elements: [
        {
          id: "byproduct-of-an-objective",
          description:
            "The vectors are parameters fitted to a training objective — predicting a word from its context, predicting a click — so the geometry is a by-product of what that objective needed.",
          weight: 4,
          required: true,
        },
        {
          id: "the-assumption",
          description:
            "It is meaningful under the distributional hypothesis: items appearing in similar contexts are similar, so items the model must treat interchangeably end up nearby.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["embeddings", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "embeddings--explain-static-vs-contextual",
    conceptId: "embeddings",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "What does a static embedding do with a word like 'bank', and how does a contextual embedding differ?",
    rubric: {
      elements: [
        {
          id: "static-averages-senses",
          description:
            "A static embedding gives one vector per word, so every sense is averaged into a single point — 'bank' sits somewhere between finance and rivers, and represents neither well.",
          weight: 4,
          required: true,
        },
        {
          id: "contextual-per-occurrence",
          description:
            "A contextual embedding produces a different vector per occurrence, computed from the surrounding text, so the two senses land in different places — the main advance over the static generation.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["embeddings", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "embeddings--transfer-analogy-caveat",
    conceptId: "embeddings",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "The 'king − man + woman ≈ queen' demonstration is weaker than usually presented. State the methodological caveat and what the result does support.",
    rubric: {
      elements: [
        {
          id: "the-caveat",
          description:
            "The standard demonstrations exclude the three input words from the candidate answers; without that exclusion the nearest vector is frequently just 'king' again.",
          weight: 5,
          required: true,
        },
        {
          id: "what-it-does-support",
          description:
            "Linear analogies do work above chance, so some relational structure is genuinely captured — it is evidence of that, not evidence that the space is organised into clean semantic axes.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["embeddings"],
    source: ML_11,
    status: "live",
  },
  {
    id: "embeddings--transfer-tabular-categoricals",
    conceptId: "embeddings",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A tabular dataset has a postcode column with 8,000 distinct values. Argue for a learned embedding over one-hot encoding here, using the same reasoning as for words.",
    rubric: {
      elements: [
        {
          id: "same-argument",
          description:
            "One-hot makes all 8,000 postcodes mutually orthogonal, so nothing learned about one transfers to a neighbouring or demographically similar one, and each must be learned from its own rows alone.",
          weight: 4,
          required: true,
        },
        {
          id: "what-an-embedding-buys",
          description:
            "A learned low-dimensional embedding lets similar postcodes end up nearby — similarity defined by whatever the target rewards — so sparse postcodes borrow strength from related ones, and the parameter count collapses from 8,000 columns to a small table.",
          weight: 5,
          required: true,
        },
        {
          id: "rare-values-caveat",
          description:
            "Bonus: notes that very rare values still receive few gradient updates and are poorly placed, so a fallback bucket is usually needed.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["embeddings", "neural-networks"],
    source: ML_11,
    status: "live",
  },

  // --- Autoencoders ---------------------------------------------------------
  {
    id: "autoencoders--recall-objective",
    conceptId: "autoencoders",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is an autoencoder trained to do, and what makes that non-trivial?",
    rubric: {
      elements: [
        { id: "objective", description: "Reconstruct its own input, so no labels are needed — the target is the input.", weight: 3, required: true },
        { id: "the-constraint", description: "A bottleneck or other constraint forces it to discard; without one, copying the input through is a perfect solution that learns nothing.", weight: 4, required: true },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["autoencoders", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "autoencoders--recall-linear-case",
    conceptId: "autoencoders",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A linear autoencoder with squared-error loss finds a subspace. Which one?",
    choices: [
      { id: "a", text: "The principal subspace — the same one PCA finds", correct: true },
      {
        id: "b",
        text: "A subspace maximising class separation",
        correct: false,
        misconception: {
          id: "linear-ae-confused-with-lda",
          description:
            "That is a supervised criterion, and an autoencoder never sees a label — its only target is its own input.",
          blameConceptId: "autoencoders",
        },
      },
      {
        id: "c",
        text: "A subspace of statistically independent directions",
        correct: false,
        misconception: {
          id: "linear-ae-confused-with-ica",
          description:
            "Independence requires higher-order statistics; squared-error reconstruction is a second-order criterion, so it recovers the variance-maximising subspace instead.",
          blameConceptId: "ica",
        },
      },
      {
        id: "d",
        text: "No particular subspace — the solution is arbitrary",
        correct: false,
        misconception: {
          id: "linear-ae-thought-arbitrary",
          description:
            "The *basis within* the subspace is arbitrary — rotations are equivalent — but the subspace itself is determined.",
          blameConceptId: "autoencoders",
        },
      },
    ],
    difficulty: 0.65,
    discrimination: 1.4,
    expectedSeconds: 50,
    prereqClosure: ["autoencoders", "pca", "probabilistic-pca"],
    source: ML_11,
    status: "live",
  },
  {
    id: "autoencoders--apply-identity-trap",
    conceptId: "autoencoders",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "An autoencoder's hidden layer is as wide as its input and it achieves near-zero reconstruction error. Has it learned anything? Justify your answer.",
    rubric: {
      elements: [
        { id: "no", description: "Not necessarily — with enough width it can simply copy the input through, achieving zero loss having learned the identity function.", weight: 4, required: true },
        { id: "what-is-needed", description: "Something must force it to discard: a narrower bottleneck, a sparsity penalty on the activations, or noise added to the input.", weight: 4, required: true },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["autoencoders", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "autoencoders--apply-denoising-variant",
    conceptId: "autoencoders",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A denoising autoencoder corrupts its input and reconstructs the clean version. Explain why that often yields a better representation than the plain version.",
    rubric: {
      elements: [
        {
          id: "copying-is-blocked",
          description:
            "Copying no longer works — the input it receives is not the target — so the identity shortcut is unavailable by construction rather than by architectural constraint.",
          weight: 4,
          required: true,
        },
        {
          id: "must-learn-structure",
          description:
            "To repair damage it must learn the structure that makes the data predictable from itself, which is a more demanding and more useful thing to have learned than an efficient encoding.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["autoencoders", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "autoencoders--explain-relation-to-pca",
    conceptId: "autoencoders",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "State precisely how an autoencoder relates to PCA, and say why a *linear* autoencoder is a worse choice than PCA in practice.",
    rubric: {
      elements: [
        {
          id: "the-relation",
          description:
            "An autoencoder is PCA with the linearity assumption removed: in the linear case with squared-error loss the optimum spans exactly the principal subspace, and the nonlinearity is the entire difference.",
          weight: 4,
          required: true,
        },
        {
          id: "why-linear-ae-is-worse",
          description:
            "It reaches the same subspace by gradient descent rather than in closed form, with no guarantee of convergence to it, and without the variance ordering of components that PCA supplies.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["autoencoders", "pca", "probabilistic-pca"],
    source: ML_11,
    status: "live",
  },
  {
    id: "autoencoders--explain-vae-difference",
    conceptId: "autoencoders",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A variational autoencoder shares the encoder-bottleneck-decoder shape but is a different kind of object. What changes, and what does that change buy?",
    rubric: {
      elements: [
        {
          id: "what-changes",
          description:
            "The encoder outputs a distribution rather than a point, and a divergence term pulls that distribution toward a prior.",
          weight: 4,
          required: true,
        },
        {
          id: "what-it-buys",
          description:
            "The latent space becomes continuous and samplable, so the model can generate new data rather than only compress — turning a compressor into a generative model with a different objective, sharing only the shape.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["autoencoders", "probabilistic-pca"],
    source: ML_11,
    status: "live",
  },
  {
    id: "autoencoders--transfer-anomaly-detector",
    conceptId: "autoencoders",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Reconstruction error is one of the more robust ways to build an anomaly detector. Explain the construction and the one condition it depends on.",
    rubric: {
      elements: [
        {
          id: "the-construction",
          description:
            "Train on normal data only, then score each new point by how badly it is reconstructed — the model can rebuild what it has learned the structure of, and cannot rebuild what it has not.",
          weight: 4,
          required: true,
        },
        {
          id: "the-condition",
          description:
            "The training set must be essentially free of anomalies: if they are present the model learns to reconstruct them too, so they score low and become invisible.",
          weight: 5,
          required: true,
        },
        {
          id: "why-robust",
          description:
            "Bonus: notes it needs no anomaly examples, so it generalises to anomaly types never observed.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["autoencoders", "neural-networks"],
    source: ML_11,
    status: "live",
  },
  {
    id: "autoencoders--transfer-reconstruction-is-not-representation",
    conceptId: "autoencoders",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "An autoencoder reconstructs beautifully, but its latent codes are poor features for the downstream classifier. Explain how both can be true, and what should have been measured.",
    rubric: {
      elements: [
        {
          id: "how-both-are-true",
          description:
            "Reconstruction rewards encoding whatever is needed to rebuild the input, which may be exactly the high-variance details — texture, lighting, background — that the downstream task does not care about.",
          weight: 5,
          required: true,
        },
        {
          id: "what-to-measure",
          description:
            "If the representation is the deliverable, evaluate it on the downstream task — a linear probe on the latent codes — rather than on reconstruction error, which is measuring a different objective.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.45,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["autoencoders", "pca"],
    source: ML_11,
    status: "live",
  },
];
