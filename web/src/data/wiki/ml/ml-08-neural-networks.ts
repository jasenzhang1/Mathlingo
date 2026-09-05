import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 8 — from the single linear threshold unit to the
 * algorithm that trains a stack of them. Mirrors
 * `assessments/ml-08-neural-networks.md`.
 */

const perceptron: WikiArticle = {
  conceptId: "perceptron",
  summary:
    "The perceptron is a single linear threshold unit: weight the inputs, add a bias, and output " +
    "the sign. Rosenblatt's learning rule provably converges when the data is linearly separable " +
    "and never terminates when it is not — a limitation that both stalled the field and defined the " +
    "problem every later architecture had to solve.",

  sections: [
    {
      heading: "The unit and its learning rule",
      blocks: [
        {
          kind: "formula",
          latex: "ŷ = sign(wᵀx + b)     update:  w ← w + η(y − ŷ)x",
          caption: "No update when the prediction is right; a nudge toward the correct side when it is wrong",
        },
        {
          kind: "prose",
          text:
            "The update has an unusually direct geometric reading. If a positive example is " +
            "misclassified, (y − ŷ) = 2, so x is added to w — rotating the weight vector toward that " +
            "example and making its score more positive. The rule is mistake-driven: correctly " +
            "classified points contribute nothing, which is why training is fast and why the final " +
            "boundary depends only on the points that were ever wrong.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The convergence theorem, and what it does not promise",
          text:
            "Novikoff's theorem: if the data is separable with margin γ and inputs bounded by R, the " +
            "perceptron makes at most (R/γ)² mistakes before converging. It promises convergence to " +
            "*some* separating hyperplane, not a good one — no margin is maximised, and the answer " +
            "depends on the order the examples arrived in. The SVM is the natural repair: same " +
            "hypothesis class, an objective that picks the best member of it.",
        },
      ],
    },

    {
      heading: "XOR, and the first winter",
      blocks: [
        {
          kind: "example",
          title: "Why a single perceptron cannot compute XOR",
          problem: "Fit w₁, w₂, b so that sign(w₁x₁ + w₂x₂ + b) gives XOR on {0,1}².",
          steps: [
            "(0,0) → 0 requires b < 0.",
            "(1,0) → 1 requires w₁ + b > 0, so w₁ > −b > 0.",
            "(0,1) → 1 requires w₂ > −b > 0.",
            "(1,1) → 0 requires w₁ + w₂ + b < 0, but w₁ + w₂ > −2b > −b, so w₁ + w₂ + b > 0.",
          ],
          answer:
            "A contradiction. No line separates {(0,1),(1,0)} from {(0,0),(1,1)}, and a single perceptron is exactly a line. Minsky and Papert's 1969 demonstration of this contributed to the first AI winter.",
        },
        {
          kind: "prose",
          text:
            "The fix was known even then: two layers solve XOR easily, since a hidden layer can " +
            "construct the features (x₁ OR x₂) and (x₁ AND x₂) that make the problem linearly " +
            "separable. What was missing was a way to train the hidden layer — a credit assignment " +
            "problem that stayed unsolved in practice until backpropagation was popularised in 1986.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The step function is why the perceptron rule is not gradient descent",
          text:
            "sign() has zero derivative everywhere it is differentiable, so there is no gradient to " +
            "follow and no way to pass an error signal back through a hidden layer. Replacing the " +
            "step with a smooth sigmoid is the single change that makes multi-layer training " +
            "possible — the entire modern field rests on that substitution.",
        },
      ],
    },
  ],

  references: [
    { source: "Rosenblatt, The Perceptron: A Probabilistic Model for Information Storage", locator: "Psychological Review 65(6), 1958" },
    { source: "Minsky & Papert, Perceptrons", locator: "Ch. 1–2" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§4.1.7, The Perceptron Algorithm" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-08-neural-networks.md" },
  ],
};

const neuralNetworks: WikiArticle = {
  conceptId: "neural-networks",
  summary:
    "A neural network composes alternating affine maps and elementwise nonlinearities. The affine " +
    "parts are matrix multiplications and the nonlinear parts are what stop the whole stack from " +
    "collapsing into a single matrix — which is the entire reason depth buys anything.",

  sections: [
    {
      heading: "The forward pass",
      blocks: [
        {
          kind: "formula",
          latex: "a⁽⁰⁾ = x;   z⁽ˡ⁾ = W⁽ˡ⁾a⁽ˡ⁻¹⁾ + b⁽ˡ⁾;   a⁽ˡ⁾ = σ(z⁽ˡ⁾)",
          caption: "One layer: an affine map, then an elementwise nonlinearity",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Without σ, depth is worthless",
          text:
            "W₃(W₂(W₁x)) = (W₃W₂W₁)x, a single matrix. A hundred linear layers have exactly the " +
            "representational power of one. Every claim about deep networks being more expressive " +
            "than shallow ones depends on the nonlinearity being there — it is not a performance " +
            "tweak, it is the load-bearing element.",
        },
        {
          kind: "table",
          headers: ["Activation", "Form", "Note"],
          rows: [
            ["Sigmoid", "1/(1 + e⁻ᶻ)", "Saturates at both ends; gradients vanish. Now used mainly for binary outputs"],
            ["Tanh", "(eᶻ − e⁻ᶻ)/(eᶻ + e⁻ᶻ)", "Zero-centred sigmoid; still saturates"],
            ["ReLU", "max(0, z)", "The default. No saturation for z > 0, cheap, sparse — but units can die"],
            ["Leaky ReLU / GELU", "small slope or smooth gate for z < 0", "Fix the dying-ReLU problem; GELU is standard in transformers"],
            ["Softmax", "eᶻᵏ / Σⱼeᶻʲ", "Output layer for multiclass — not a hidden-layer activation"],
          ],
        },
      ],
    },

    {
      heading: "What depth actually buys",
      blocks: [
        {
          kind: "prose",
          text:
            "The universal approximation theorem says one hidden layer of sufficient width can " +
            "approximate any continuous function on a compact set to arbitrary accuracy. That " +
            "settles expressiveness and settles nothing practical: the required width can be " +
            "exponential in the input dimension, and the theorem says nothing about whether " +
            "gradient descent can find those weights from finite data.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Depth is about efficient reuse, not about what is representable",
          text:
            "Some functions need exponentially many units in a shallow network and only polynomially " +
            "many when depth is available, because a deep network can build on intermediate features " +
            "rather than re-deriving them. In vision this is visible: edges compose into textures, " +
            "textures into parts, parts into objects. Depth is a statement about the parameter " +
            "efficiency of hierarchical structure.",
        },
        {
          kind: "list",
          items: [
            "The loss surface is non-convex, so training finds a local minimum. In large networks these tend to be of comparable quality, which is why the theoretical worry is smaller than it sounds.",
            "Weights must be initialised randomly and asymmetrically: identical weights produce identical gradients, and every unit in a layer stays identical forever.",
            "Regularisation is unusually varied — weight decay, dropout, batch normalisation, early stopping, data augmentation — because capacity is enormous by default.",
            "Inputs should be standardised, for the same conditioning reason gradient descent needs it everywhere else.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "Ch. 6, Deep Feedforward Networks" },
    { source: "Prince, Understanding Deep Learning", locator: "Ch. 3–4, Shallow and Deep Neural Networks" },
    { source: "James et al., An Introduction to Statistical Learning", locator: "Ch. 10, Deep Learning" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-08-neural-networks.md" },
  ],
};

const backpropagation: WikiArticle = {
  conceptId: "backpropagation",
  summary:
    "Backpropagation computes the gradient of the loss with respect to every parameter by applying " +
    "the chain rule from the output backwards. Its significance is entirely computational: it gets " +
    "all the derivatives for roughly the cost of one forward pass, where the naive approach would " +
    "cost one forward pass per parameter.",

  sections: [
    {
      heading: "The chain rule, organised",
      blocks: [
        {
          kind: "formula",
          latex: "δ⁽ᴸ⁾ = ∇_a L ⊙ σ′(z⁽ᴸ⁾);   δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾ᵀδ⁽ˡ⁺¹⁾) ⊙ σ′(z⁽ˡ⁾)",
          caption: "The error signal δ propagates backwards; ⊙ is elementwise multiplication",
        },
        {
          kind: "formula",
          latex: "∂L/∂W⁽ˡ⁾ = δ⁽ˡ⁾ (a⁽ˡ⁻¹⁾)ᵀ,    ∂L/∂b⁽ˡ⁾ = δ⁽ˡ⁾",
          caption: "Each layer's parameter gradients from its own δ and the activation it received",
        },
        {
          kind: "prose",
          text:
            "Backpropagation is not a learning algorithm and not an optimiser — it computes " +
            "gradients, and gradient descent (or Adam, or L-BFGS) uses them. Conflating the two is " +
            "the most common misconception about it, and it obscures the fact that any optimiser " +
            "consuming gradients can be dropped in unchanged.",
        },
      ],
    },

    {
      heading: "Why it is cheap",
      blocks: [
        {
          kind: "example",
          title: "Backprop versus finite differences",
          problem: "A network has 1 million parameters. Compare the cost of numerical differentiation with backpropagation.",
          steps: [
            "Finite differences perturb one parameter, run a full forward pass, and difference: one forward pass per parameter.",
            "That is 10⁶ forward passes for one gradient — and the result is still only approximate.",
            "Backpropagation runs one forward pass, then one backward pass of comparable cost.",
          ],
          answer:
            "Roughly 2× a forward pass, versus 10⁶ — a factor of about half a million, and exact rather than approximate. Reverse-mode automatic differentiation gets all derivatives of one output at the cost of a constant multiple of evaluating it once, and that constant is what made deep learning computationally possible.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Forward mode would be the wrong direction here",
          text:
            "Forward-mode differentiation costs one pass per *input* and is efficient when there are " +
            "few inputs and many outputs. Training has millions of parameters and one scalar loss, " +
            "so the reverse direction is the efficient one. The asymmetry is not incidental — it is " +
            "why \"backwards\" is in the name.",
        },
      ],
    },

    {
      heading: "Vanishing and exploding gradients",
      blocks: [
        {
          kind: "prose",
          text:
            "The recursion multiplies by σ′(z) at every layer. The sigmoid's derivative peaks at " +
            "0.25, so ten sigmoid layers scale the gradient by at most 0.25¹⁰ ≈ 10⁻⁶ — early layers " +
            "receive essentially no signal and stop learning. This is the vanishing gradient " +
            "problem, and for two decades it made deep networks untrainable in practice.",
        },
        {
          kind: "list",
          items: [
            "ReLU has derivative exactly 1 for positive inputs, so it does not shrink the signal — the single most important fix.",
            "Residual connections give the gradient an identity path that skips layers entirely.",
            "Careful initialisation (Xavier, He) keeps activation and gradient variances roughly constant across layers.",
            "Batch and layer normalisation keep pre-activations in the responsive part of the nonlinearity.",
            "Gradient clipping caps the exploding direction, which is the corresponding failure in recurrent networks.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Activations must be stored, and that is the memory bill",
          text:
            "Every layer's forward activations are needed to compute its gradient, so memory scales " +
            "with depth × batch size, not just with parameter count. This is why batch size is " +
            "limited by memory rather than by compute, and why gradient checkpointing — recomputing " +
            "activations on the backward pass instead of storing them — trades time for space.",
        },
      ],
    },
  ],

  references: [
    { source: "Rumelhart, Hinton & Williams, Learning Representations by Back-Propagating Errors", locator: "Nature 323, 1986" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§6.5, Back-Propagation and Other Differentiation Algorithms" },
    { source: "Deisenroth, Faisal & Ong, Mathematics for Machine Learning", locator: "§5.6, Backpropagation and Automatic Differentiation" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-08-neural-networks.md" },
  ],
};

export const ml08NeuralNetworks: WikiArticle[] = [perceptron, neuralNetworks, backpropagation];
