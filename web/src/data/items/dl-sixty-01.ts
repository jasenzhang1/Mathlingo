import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./dl-sixty-shared";

/**
 * Perceptrons, MLPs, backpropagation, activations, optimisers, dropout, batch
 * norm and CNNs, each brought from 40 to 60 questions. Most of these pools
 * were thin at levels 1–4 and 9–10, so the additions lean there.
 */

// ---------------------------------------------------------------------------
// perceptron
// ---------------------------------------------------------------------------
const PC = "perceptron";
const perceptron: Item[] = [
  mcq(m(PC, "recall-linear", "recall", 1, 15, "A perceptron is:"),
    "A linear binary classifier that thresholds a weighted sum of its inputs",
    [
      ["A deep non-linear network", "perceptron-deep", "A single perceptron is linear."],
      ["A clustering algorithm", "perceptron-clustering", "It's supervised classification."],
      ["A regression model for real-valued outputs", "perceptron-regression", "It outputs a class."],
    ]),
  mcq(m(PC, "recall-rosenblatt", "recall", 1, 15, "Who introduced the perceptron, in the late $1950$s?"),
    "Frank Rosenblatt",
    [
      ["Geoffrey Hinton", "rosenblatt-hinton", "Hinton's key work came decades later."],
      ["Alan Turing", "rosenblatt-turing", "Turing didn't propose the perceptron."],
      ["Yann LeCun", "rosenblatt-lecun", "LeCun is known for CNNs."],
    ]),
  mcq(m(PC, "recall-mistake-driven", "recall", 1, 15, "When does the perceptron learning rule change the weights?"),
    "Only when it misclassifies a training example",
    [
      ["After every example", "mistake-every", "Correct predictions leave the weights unchanged."],
      ["Only at the end of training", "mistake-end", "It updates online."],
      ["Never — weights are fixed", "mistake-never", "It learns its weights."],
    ]),
  num(m(PC, "apply-score", "apply", 2, 20, "$\\mathbf{w} = [3, -2]$, $b = 1$ and $\\mathbf{x} = [2, 1]$. What is the score $\\mathbf{w} \\cdot \\mathbf{x} + b$?"), 5),
  num(m(PC, "apply-classify", "apply", 2, 20, "Same weights, $\\mathbf{x} = [0, 3]$. The perceptron outputs $1$ if the score is $\\ge 0$ and $0$ otherwise. What does it output?"), 0),
  num(m(PC, "apply-params", "apply", 2, 20, "A perceptron on $20$ input features has how many parameters, including the bias?"), 21),
  num(m(PC, "apply-update", "apply", 3, 25, "Update $\\mathbf{w} \\leftarrow \\mathbf{w} + \\eta(y - \\hat{y})\\mathbf{x}$ with $\\mathbf{w} = [1, 1]$, $\\eta = 0.5$, $y - \\hat{y} = 1$ and $\\mathbf{x} = [2, -2]$. What is the new $w_1$?"), 2),
  num(m(PC, "apply-distance", "apply", 3, 25, "What is the distance from the origin to the hyperplane $6x_1 + 8x_2 - 20 = 0$?"), 2),
  num(m(PC, "apply-bound", "apply", 3, 25, "Novikoff's bound allows at most $\\left(\\frac{R}{\\gamma}\\right)^{2}$ mistakes. With $R = 3$ and $\\gamma = 0.5$, how many?"), 36),
  num(m(PC, "apply-or", "apply", 4, 30, "$\\mathbf{w} = [1, 1]$ and $b = -0.5$, with output $1$ if the score is $\\ge 0$. What is the output for $\\mathbf{x} = [1, 0]$?"), 1),
  num(m(PC, "apply-margin", "apply", 4, 30, "What is the geometric margin $\\frac{y(\\mathbf{w} \\cdot \\mathbf{x} + b)}{\\|\\mathbf{w}\\|}$ of $\\mathbf{x} = [1, 2]$ with $y = +1$, $\\mathbf{w} = [3, 4]$ and $b = -1$?"), 2),
  mcq(m(PC, "apply-vs-logistic", "apply", 5, 40, "What does logistic regression give that a perceptron does not?"),
    "Probability estimates, from a smooth loss trained on every example",
    [
      ["A non-linear decision boundary", "logistic-nonlinear", "Both are linear."],
      ["The ability to classify", "logistic-classify", "Both classify."],
      ["Fewer parameters", "logistic-params", "They have the same number."],
    ]),
  short(m(PC, "explain-nonseparable", "explain", 6, 90, "What happens when the perceptron runs on data that aren't linearly separable, and what variants cope better?"),
    [
      ["cycles", "It never converges: the weights keep changing as some point is always misclassified", 2, true],
      ["variants", "The pocket algorithm (keep the best weights so far) or the averaged/voted perceptron give stable, better-generalising answers", 2, true],
    ]),
  num(m(PC, "transfer-averaged", "transfer", 7, 60, "An averaged perceptron (1-D) has weight values $1$, $3$, $3$ and $5$ after its four steps. What is the averaged weight?"), 3),
  num(m(PC, "transfer-kernel-score", "transfer", 8, 60, "A kernel perceptron has mistake counts $\\alpha = (1, 2)$ on points with labels $(+1, -1)$, and kernel values $(3, 1)$ with a new point. What is its score $\\sum_i \\alpha_i y_i K(\\mathbf{x}_i, \\mathbf{x})$?"), 1),
  short(m(PC, "transfer-sgd-view", "transfer", 8, 120, "Show that the perceptron rule is stochastic gradient descent on a particular loss."),
    [
      ["loss", "The perceptron loss is $\\max(0, -y\\,\\mathbf{w} \\cdot \\mathbf{x})$ with labels $\\pm 1$", 2, true],
      ["gradient", "Its gradient is $-y\\mathbf{x}$ on a mistake and $0$ otherwise, so an SGD step with rate $\\eta$ is exactly the perceptron update", 2, true],
    ]),
  num(m(PC, "transfer-scaling", "transfer", 9, 75, "With $R = 4$ and $\\gamma = 0.5$, the bound is $64$. If every input is multiplied by $10$, what is the bound?"), 64),
  short(m(PC, "transfer-dimension-free", "transfer", 9, 150, "Novikoff's bound doesn't involve the number of features. What does that imply?"),
    [
      ["margin", "Learnability depends on the margin relative to the data radius, not on dimension", 2, true],
      ["implication", "So even very high-dimensional (or kernel) feature spaces are fine if the data are separable with a large margin", 2, true],
    ]),
  mcq(m(PC, "transfer-svm-link", "transfer", 10, 90, "How does the hard-margin SVM improve on the perceptron for separable data?"),
    "It finds the separating hyperplane with the largest margin, while the perceptron stops at any separating one",
    [
      ["It handles non-linear data without kernels", "svm-nonlinear", "Both need kernels for that."],
      ["It needs no optimisation", "svm-no-optimisation", "It solves a QP."],
      ["It always makes fewer training errors", "svm-fewer-errors", "Both reach zero training error."],
    ]),
  short(m(PC, "transfer-mlp-history", "transfer", 10, 180, "The XOR limitation applies to single perceptrons. Explain why stacking them didn't immediately solve the problem in the $1960$s."),
    [
      ["training", "Stacked threshold units have zero gradient almost everywhere, so there was no practical way to train hidden layers", 2, true],
      ["fix", "Backpropagation with differentiable activations (popularised in the $1980$s) made multi-layer training practical", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// neural-networks
// ---------------------------------------------------------------------------
const NN = "neural-networks";
const networks: Item[] = [
  mcq(m(NN, "recall-neuron", "recall", 1, 15, "A single artificial neuron computes:"),
    "A weighted sum of its inputs plus a bias, passed through an activation function",
    [
      ["The maximum of its inputs", "neuron-max", "That's max pooling."],
      ["A random number", "neuron-random", "Its output is deterministic."],
      ["The product of all inputs", "neuron-product", "It's a weighted sum."],
    ]),
  mcq(m(NN, "recall-softmax-output", "recall", 1, 15, "Which output activation is standard for multiclass classification?"),
    "Softmax",
    [
      ["ReLU", "output-relu", "ReLU doesn't give probabilities."],
      ["Identity", "output-identity", "That's for regression."],
      ["Tanh", "output-tanh", "Its outputs don't sum to $1$."],
    ]),
  mcq(m(NN, "recall-depth", "recall", 1, 15, "A network's *depth* refers to:"),
    "The number of layers",
    [
      ["The number of units per layer", "depth-width", "That's width."],
      ["The number of training examples", "depth-examples", "That's dataset size."],
      ["The number of epochs", "depth-epochs", "That's training length."],
    ]),
  num(m(NN, "apply-dense-params", "apply", 2, 20, "A dense layer maps $4$ inputs to $3$ outputs, with biases. How many parameters?"), 15),
  num(m(NN, "apply-relu-unit", "apply", 2, 20, "A ReLU unit has $\\mathbf{w} = [2, 1]$ and $b = -3$. What is its output for $\\mathbf{x} = [2, 1]$?"), 2),
  num(m(NN, "apply-mlp-params", "apply", 2, 20, "An MLP $10 \\to 20 \\to 1$ (with biases) has how many parameters?"), 241),
  num(m(NN, "apply-sigmoid", "apply", 3, 25, "What is $\\sigma(\\ln 3)$, where $\\sigma(z) = \\frac{1}{1 + e^{-z}}$?"), 0.75),
  num(m(NN, "apply-softmax", "apply", 3, 25, "Logits $(0, 0, \\ln 2)$. What is the softmax probability of the third class?"), 0.5),
  num(m(NN, "apply-hidden-count", "apply", 3, 25, "A network has $6$ weight layers between input and output. How many hidden layers does it have?"), 5),
  num(m(NN, "apply-forward", "apply", 4, 30, "$h = \\operatorname{ReLU}(2x - 1)$ and $y = 3h + 1$. What is $y$ at $x = 2$?"), 10),
  num(m(NN, "apply-macs", "apply", 4, 30, "A dense layer $512 \\to 256$ does how many multiply-adds per example?"), 131072),
  mcq(m(NN, "apply-symmetry", "apply", 5, 40, "Every hidden weight is initialised to $0.5$. What goes wrong?"),
    "All hidden units compute the same thing and get the same gradients, so they stay identical",
    [
      ["Training diverges immediately", "symmetry-diverge", "The issue is symmetry, not divergence."],
      ["Nothing — any constant works", "symmetry-fine", "Constant initialisation can't break symmetry."],
      ["The network becomes linear", "symmetry-linear", "Activations still apply; the units are just clones."],
    ]),
  short(m(NN, "explain-depth", "explain", 6, 90, "Why do deep networks often learn useful representations more efficiently than one very wide layer?"),
    [
      ["hierarchy", "Layers build features hierarchically, reusing simpler features to compose complex ones", 2, true],
      ["efficiency", "Some functions need exponentially many units in one layer but few with depth", 2, true],
    ]),
  num(m(NN, "transfer-pieces", "transfer", 7, 60, "In 1-D, a single hidden layer of $7$ ReLUs with distinct breakpoints gives at most how many linear pieces?"), 8),
  num(m(NN, "transfer-three-layer", "transfer", 8, 60, "An MLP $100 \\to 50 \\to 50 \\to 10$ (with biases) has how many parameters?"), 8110),
  short(m(NN, "transfer-overparam", "transfer", 8, 120, "Large networks have far more parameters than training examples, yet often generalise well. Give two ideas that help explain this."),
    [
      ["implicit", "Gradient descent has an implicit bias toward simple (e.g. low-norm, flat) solutions among the many that fit the data", 2, true],
      ["double-descent", "Past the interpolation threshold, test error can fall again as size grows (double descent); architecture also supplies useful priors", 2, true],
    ]),
  num(m(NN, "transfer-batch-flops", "transfer", 9, 75, "A $1000 \\to 1000$ dense layer processes a batch of $64$. Counting $2$ FLOPs per multiply-add, how many million FLOPs is that?"), 128),
  short(m(NN, "transfer-width-depth", "transfer", 9, 150, "With a fixed parameter budget, what are the trade-offs between making a network wider and making it deeper?"),
    [
      ["deeper", "Deeper networks gain expressiveness and compositional features but are harder to optimise (needing residuals, normalisation)", 2, true],
      ["wider", "Wider networks are easier to optimise and parallelise but gain less expressiveness per parameter", 2, true],
    ]),
  mcq(m(NN, "transfer-lottery", "transfer", 10, 90, "The lottery ticket hypothesis claims that:"),
    "Dense networks contain sparse subnetworks that, trained from their original initialisation, can match the full network",
    [
      ["Random networks need no training", "lottery-no-training", "The subnetworks still need training."],
      ["Larger learning rates always win", "lottery-lr", "Unrelated."],
      ["Pruning always hurts accuracy", "lottery-pruning-hurts", "It argues much can be pruned."],
    ]),
  short(m(NN, "transfer-memorise", "transfer", 10, 180, "Networks can perfectly fit training data with random labels. What does this show about why they generalise on real data?"),
    [
      ["capacity", "Their capacity is enough to memorise anything, so classic capacity-based bounds can't explain generalisation", 2, true],
      ["structure", "Generalisation must come from the data's structure plus the training procedure's biases — real labels are learned faster and in a way that transfers", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// backpropagation
// ---------------------------------------------------------------------------
const BP = "backpropagation";
const backprop: Item[] = [
  mcq(m(BP, "recall-passes", "recall", 1, 15, "A training step with backpropagation consists of:"),
    "A forward pass computing the loss, then a backward pass computing gradients",
    [
      ["Only a forward pass", "passes-forward", "Gradients need the backward pass."],
      ["Only a backward pass", "passes-backward", "The backward pass needs forward values."],
      ["Random weight changes", "passes-random", "Updates follow gradients."],
    ]),
  mcq(m(BP, "recall-used-by", "recall", 1, 15, "The gradients from backpropagation are then used by:"),
    "An optimiser such as SGD or Adam to update the weights",
    [
      ["The loss function to change itself", "used-loss", "The loss is fixed."],
      ["The data loader", "used-loader", "Gradients update parameters."],
      ["Nothing — they're only for monitoring", "used-monitoring", "They drive learning."],
    ]),
  mcq(m(BP, "recall-graph", "recall", 1, 15, "Backpropagation works over a:"),
    "Computational graph of the operations that produced the loss",
    [
      ["Social network graph", "graph-social", "It's the graph of computations."],
      ["Dataset table", "graph-table", "It traverses operations."],
      ["Decision tree", "graph-tree", "It's a computational graph."],
    ]),
  num(m(BP, "apply-chain", "apply", 2, 20, "$y = 5u$ and $u = 3x$. What is $\\frac{dy}{dx}$?"), 15),
  num(m(BP, "apply-tanh", "apply", 2, 20, "What is the derivative of $\\tanh$ at $0$?"), 1),
  num(m(BP, "apply-square", "apply", 2, 20, "What is the derivative of $x^{2}$ at $x = 4$?"), 8),
  num(m(BP, "apply-loss-grad", "apply", 3, 25, "$L = (wx - y)^{2}$ with $w = 1$, $x = 2$ and $y = 5$. What is $\\frac{dL}{dw}$?"), -12),
  num(m(BP, "apply-sum-node", "apply", 3, 25, "$z = x + y$ and $\\frac{\\partial L}{\\partial z} = 4$. What is $\\frac{\\partial L}{\\partial x}$?"), 4),
  num(m(BP, "apply-product-node", "apply", 3, 25, "$z = xy$ with $x = 3$, $y = -2$ and $\\frac{\\partial L}{\\partial z} = 2$. What is $\\frac{\\partial L}{\\partial x}$?"), -4),
  num(m(BP, "apply-two-layer", "apply", 4, 30, "$h = w_1x$, $\\hat{y} = w_2h$ and $L = \\frac{1}{2}(\\hat{y} - y)^{2}$, with $w_1 = 2$, $w_2 = 3$, $x = 1$ and $y = 4$. What is $\\frac{\\partial L}{\\partial w_1}$?"), 6),
  num(m(BP, "apply-outer", "apply", 4, 30, "For $\\mathbf{z} = W\\mathbf{h}$, $\\frac{\\partial L}{\\partial W} = \\boldsymbol{\\delta}\\mathbf{h}^{\\top}$. With $\\boldsymbol{\\delta} = [1, 2]$ and $\\mathbf{h} = [3, 4]$, what is the entry in row $2$, column $1$?"), 6),
  mcq(m(BP, "apply-fan-out", "apply", 5, 40, "A value feeds into two later operations. How is its gradient computed?"),
    "By summing the gradients flowing back from both uses",
    [
      ["By taking the larger of the two", "fan-out-max", "Contributions add."],
      ["By averaging them", "fan-out-average", "They're summed, not averaged."],
      ["Using only the first use", "fan-out-first", "Every use contributes."],
    ]),
  short(m(BP, "explain-exploding", "explain", 6, 90, "What are exploding gradients, and how does gradient clipping help?"),
    [
      ["explode", "Repeated multiplication by factors above $1$ in the backward pass makes gradients grow huge, causing unstable steps", 2, true],
      ["clip", "Clipping rescales the gradient when its norm exceeds a threshold, keeping step sizes bounded while keeping its direction", 2, true],
    ]),
  num(m(BP, "transfer-max-node", "transfer", 7, 60, "$z = \\max(x, y)$ with $x = 5$, $y = 3$ and $\\frac{\\partial L}{\\partial z} = 2$. What is $\\frac{\\partial L}{\\partial y}$?"), 0),
  num(m(BP, "transfer-memory", "transfer", 8, 60, "A $100$-layer network stores $10^{6}$ activations per layer for the backward pass, as $4$-byte floats. How many megabytes (using $10^{6}$ bytes) is that?"), 400),
  short(m(BP, "transfer-softmax-ce", "transfer", 8, 120, "What is the gradient of softmax cross-entropy with respect to the logits, and why is it convenient?"),
    [
      ["formula", "It's $\\mathbf{p} - \\mathbf{y}$: predicted probabilities minus the one-hot target", 2, true],
      ["convenient", "It's simple, cheap and numerically stable when computed together, and bounded in each entry", 2, true],
    ]),
  num(m(BP, "transfer-true-logit", "transfer", 9, 75, "With softmax cross-entropy, the true class has predicted probability $0.7$. What is the gradient with respect to its logit?"), -0.3),
  short(m(BP, "transfer-stop-gradient", "transfer", 9, 150, "What does a stop-gradient (detach) operation do, and give one place it's used."),
    [
      ["does", "It passes the value forward but blocks gradients from flowing back through it, treating it as a constant", 2, true],
      ["use", "E.g. bootstrapped targets in DQN, target branches in self-supervised methods (BYOL/SimSiam), or truncating BPTT", 2, true],
    ]),
  num(m(BP, "transfer-checkpoint", "transfer", 10, 90, "Checkpointing every $\\sqrt{n}$ layers stores about $\\sqrt{n}$ activations. For $n = 10{,}000$ layers, how many?"), 100),
  short(m(BP, "transfer-straight-through", "transfer", 10, 180, "How can a network be trained through a non-differentiable step such as rounding or sampling a discrete code?"),
    [
      ["ste", "The straight-through estimator uses the step in the forward pass but treats it as the identity (or a smooth surrogate) in the backward pass", 2, true],
      ["alternatives", "Alternatives include the Gumbel-softmax relaxation and score-function (REINFORCE) estimators; all trade bias or variance", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// activation-functions
// ---------------------------------------------------------------------------
const AF = "activation-functions";
const activations: Item[] = [
  mcq(m(AF, "recall-unit-interval", "recall", 1, 15, "Which activation squashes its input into $(0, 1)$?"),
    "Sigmoid",
    [
      ["ReLU", "unit-relu", "ReLU is unbounded above."],
      ["Tanh", "unit-tanh", "Tanh gives $(-1, 1)$."],
      ["Identity", "unit-identity", "It's unbounded."],
    ]),
  mcq(m(AF, "recall-zero-centred", "recall", 1, 15, "Which activation is zero-centred?"),
    "Tanh",
    [
      ["Sigmoid", "centred-sigmoid", "Its outputs are all positive."],
      ["ReLU", "centred-relu", "Its outputs are non-negative."],
      ["Softplus", "centred-softplus", "Its outputs are positive."],
    ]),
  num(m(AF, "recall-relu-positive", "recall", 1, 15, "What is $\\operatorname{ReLU}(4)$?"), 4),
  num(m(AF, "apply-leaky", "apply", 2, 20, "Leaky ReLU with slope $0.01$ for negative inputs. What is its output at $-10$?"), -0.1),
  num(m(AF, "apply-tanh-derivative", "apply", 2, 20, "What is $\\tanh'(0) = 1 - \\tanh^{2}(0)$?"), 1),
  num(m(AF, "apply-sigmoid-ln4", "apply", 2, 20, "What is $\\sigma(\\ln 4)$?"), 0.8),
  num(m(AF, "apply-sigmoid-derivative", "apply", 3, 25, "$\\sigma(\\ln 3) = 0.75$. What is $\\sigma'(\\ln 3) = \\sigma(1 - \\sigma)$?"), 0.1875),
  num(m(AF, "apply-elu", "apply", 3, 25, "ELU with $\\alpha = 1$ gives $e^{x} - 1$ for $x < 0$. What is it at $x = -1$? Give $4$ decimal places."), -0.6321),
  num(m(AF, "apply-softplus", "apply", 3, 25, "Softplus is $\\ln(1 + e^{x})$. What is it at $x = 0$? Give $4$ decimal places."), 0.6931),
  num(m(AF, "apply-silu", "apply", 4, 30, "SiLU (Swish) is $x\\sigma(x)$. What is it at $x = 2$? Give $4$ decimal places."), 1.7616),
  num(m(AF, "apply-tanh-sigmoid", "apply", 4, 30, "Using $\\tanh(x) = 2\\sigma(2x) - 1$, what is $\\tanh(1)$? Give $4$ decimal places."), 0.7616),
  mcq(m(AF, "apply-default", "apply", 5, 40, "For the hidden layers of a new feedforward network, which is the usual default?"),
    "ReLU (or a smooth variant like GELU)",
    [
      ["Sigmoid", "default-sigmoid", "It saturates and slows deep training."],
      ["Step function", "default-step", "Its gradient is zero almost everywhere."],
      ["Softmax", "default-softmax", "That's for output distributions."],
    ]),
  short(m(AF, "explain-softmax-shift", "explain", 6, 90, "Why does adding the same constant to every logit leave softmax unchanged, and how is this used in practice?"),
    [
      ["invariance", "$e^{z_i + c} = e^{c}e^{z_i}$, and the common factor $e^{c}$ cancels in the normalisation", 2, true],
      ["practice", "Implementations subtract the maximum logit before exponentiating to avoid overflow", 2, true],
    ]),
  num(m(AF, "transfer-uniform-softmax", "transfer", 7, 60, "Logits $(1, 1, 1, 1)$. What probability does softmax give each class?"), 0.25),
  num(m(AF, "transfer-dead-fraction", "transfer", 8, 60, "Pre-activations into a ReLU layer are $\\mathcal{N}(0, 1)$. What fraction of outputs is exactly $0$?"), 0.5),
  mcq(m(AF, "transfer-regression-output", "transfer", 8, 60, "A network predicts house prices, which can be any positive size. Which output activation is most suitable?"),
    "Identity (linear), or softplus/exp if positivity must be enforced",
    [
      ["Sigmoid", "regression-sigmoid", "It caps outputs at $1$."],
      ["Softmax", "regression-softmax", "That's for class probabilities."],
      ["Tanh", "regression-tanh", "It caps outputs at $\\pm 1$."],
    ]),
  num(m(AF, "transfer-tanh-chain", "transfer", 9, 75, "Every layer's pre-activation is $0.5$, so each contributes a factor $\\tanh'(0.5)$. What is the product over $5$ layers? Give $4$ decimal places."), 0.3008),
  short(m(AF, "transfer-swish", "transfer", 9, 150, "Swish/SiLU is non-monotonic: it dips slightly below $0$ for negative inputs. Why might this help compared with ReLU?"),
    [
      ["gradient", "It has nonzero gradient for negative inputs, so units don't die", 2, true],
      ["smooth", "It's smooth, giving a better-behaved optimisation landscape, and the small negative bump adds expressiveness", 2, true],
    ]),
  short(m(AF, "transfer-siren", "transfer", 10, 180, "Networks that represent images as functions of pixel coordinates (implicit neural representations) often use sine activations instead of ReLU. Why?"),
    [
      ["relu", "ReLU networks are piecewise linear with a spectral bias toward low frequencies, so they blur fine detail", 2, true],
      ["sine", "Periodic activations (with suitable initialisation) represent high-frequency signals and their derivatives well", 2, true],
    ]),
  mcq(m(AF, "transfer-swiglu", "transfer", 10, 90, "SwiGLU feed-forward blocks use three weight matrices instead of two. How do models usually keep the parameter count comparable?"),
    "They shrink the hidden width to about $\\frac{2}{3}$ of the usual size",
    [
      ["They drop the output projection", "swiglu-drop", "All three matrices are used."],
      ["They halve the number of layers", "swiglu-layers", "Width, not depth, is adjusted."],
      ["They don't — SwiGLU always costs $50\\%$ more", "swiglu-more", "Width is usually reduced to compensate."],
    ]),
];

// ---------------------------------------------------------------------------
// sgd-and-adaptive-optimizers
// ---------------------------------------------------------------------------
const OP = "sgd-and-adaptive-optimizers";
const optimisers: Item[] = [
  mcq(m(OP, "recall-small-lr", "recall", 1, 15, "What is the usual symptom of a learning rate that's far too small?"),
    "Training makes very slow progress",
    [
      ["The loss explodes", "small-lr-explode", "That's a too-large learning rate."],
      ["The model overfits instantly", "small-lr-overfit", "Progress is just slow."],
      ["Gradients become zero", "small-lr-zero", "Gradients are fine; steps are tiny."],
    ]),
  mcq(m(OP, "recall-minibatch", "recall", 1, 15, "A minibatch is:"),
    "A small random subset of training examples used to estimate the gradient for one step",
    [
      ["The whole training set", "minibatch-all", "That's full-batch."],
      ["A single parameter", "minibatch-param", "It's a set of examples."],
      ["The validation set", "minibatch-validation", "It's training data."],
    ]),
  mcq(m(OP, "recall-epoch", "recall", 1, 15, "One epoch is:"),
    "One full pass through the training data",
    [
      ["One parameter update", "epoch-update", "That's a step."],
      ["One minibatch", "epoch-minibatch", "An epoch spans many minibatches."],
      ["One hour of training", "epoch-hour", "It's defined by data, not time."],
    ]),
  num(m(OP, "apply-sgd", "apply", 2, 20, "$w = 2$, gradient $3$ and learning rate $0.1$. What is $w$ after one SGD step?"), 1.7),
  num(m(OP, "apply-steps-epoch", "apply", 2, 20, "$50{,}000$ examples in batches of $100$. How many steps per epoch?"), 500),
  num(m(OP, "apply-window", "apply", 2, 20, "Momentum with $\\beta = 0.99$ averages over roughly $\\frac{1}{1 - \\beta}$ steps. How many?"), 100),
  num(m(OP, "apply-momentum", "apply", 3, 25, "Momentum $v \\leftarrow \\beta v + g$ with $\\beta = 0.9$, $v = 2$ and $g = 1$. What is the new $v$?"), 2.8),
  num(m(OP, "apply-adam-bias", "apply", 3, 25, "Adam with $\\beta_1 = 0.9$ and $m_0 = 0$ sees $g_1 = 4$, so $m_1 = 0.4$. What is the bias-corrected $\\hat{m}_1 = \\frac{m_1}{1 - \\beta_1}$?"), 4),
  num(m(OP, "apply-rmsprop", "apply", 3, 25, "RMSProp: $v \\leftarrow \\rho v + (1 - \\rho)g^{2}$ with $\\rho = 0.9$, $v = 0$ and $g = 10$. What is the new $v$?"), 10),
  num(m(OP, "apply-adagrad", "apply", 4, 30, "AdaGrad has accumulated squared gradients $9 + 16 = 25$, learning rate $1$, and current gradient $4$. What is the step size $\\frac{\\eta g}{\\sqrt{G}}$?"), 0.8),
  num(m(OP, "apply-adam-first-step", "apply", 4, 30, "On its first step, Adam's update (bias-corrected, ignoring $\\epsilon$) has magnitude equal to the learning rate. With learning rate $0.001$ and any nonzero gradient, how large is it?"), 0.001),
  mcq(m(OP, "apply-weight-decay", "apply", 5, 40, "What does weight decay do at each step?"),
    "Shrinks every weight slightly toward $0$",
    [
      ["Increases the learning rate", "decay-lr", "It acts on weights, not the rate."],
      ["Removes the smallest weights", "decay-prune", "That's pruning."],
      ["Adds noise to gradients", "decay-noise", "It's a deterministic shrinkage."],
    ]),
  short(m(OP, "explain-warmup", "explain", 6, 90, "Why do adaptive optimisers like Adam often need learning-rate warmup?"),
    [
      ["estimates", "Early on, the second-moment estimates rest on very few gradients and can be poor, so normalised steps can be erratic or too large", 2, true],
      ["warmup", "Starting with a small learning rate and ramping up avoids damaging early updates while the statistics (and the model) settle", 2, true],
    ]),
  num(m(OP, "transfer-linear-scaling", "transfer", 7, 60, "By the linear scaling rule, a learning rate of $0.1$ works at batch $256$. What learning rate goes with batch $2{,}048$?"), 0.8),
  num(m(OP, "transfer-adam-memory", "transfer", 8, 60, "Adam keeps $2$ extra $4$-byte values per parameter. How many gigabytes (using $10^{9}$ bytes) does that add for $10^{9}$ parameters?"), 8),
  short(m(OP, "transfer-sharp-flat", "transfer", 8, 120, "Why might very large batches find sharper minima that generalise worse, and how can this be mitigated?"),
    [
      ["noise", "Large batches have less gradient noise, which otherwise helps escape sharp basins", 2, true],
      ["mitigate", "Scale and warm up the learning rate, train longer, or use methods like LARS/LAMB or sharpness-aware minimisation", 2, true],
    ]),
  num(m(OP, "transfer-terminal-velocity", "transfer", 9, 75, "With a constant gradient $g = 1$ and momentum $v \\leftarrow 0.9v + g$, what value does $v$ approach?"), 10),
  short(m(OP, "transfer-choose", "transfer", 9, 150, "When would you choose SGD with momentum over Adam, and vice versa?"),
    [
      ["sgd", "SGD+momentum: well-understood vision tasks (e.g. CNNs) where it often generalises slightly better with a tuned schedule", 2, true],
      ["adam", "Adam/AdamW: transformers, sparse gradients or poorly scaled problems, and when quick progress with little tuning matters", 2, true],
    ]),
  mcq(m(OP, "transfer-sign", "transfer", 10, 90, "Sign-based optimisers (like signSGD or Lion) update each parameter by:"),
    "A fixed step size times the sign of a (momentum) gradient, so every update has the same magnitude",
    [
      ["The raw gradient", "sign-raw", "Only the sign is used."],
      ["A random amount", "sign-random", "The step is deterministic in size."],
      ["The squared gradient", "sign-squared", "Only the sign matters."],
    ]),
  short(m(OP, "transfer-epsilon", "transfer", 10, 180, "What happens to Adam's behaviour if $\\epsilon$ in $\\frac{\\hat{m}}{\\sqrt{\\hat{v}} + \\epsilon}$ is set very large (e.g. $1$)?"),
    [
      ["dominates", "When $\\epsilon \\gg \\sqrt{\\hat{v}}$, the denominator is about $\\epsilon$, so adaptive per-parameter scaling disappears", 2, true],
      ["behaviour", "Adam then behaves like SGD with momentum and learning rate $\\frac{\\eta}{\\epsilon}$", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// dropout
// ---------------------------------------------------------------------------
const DO = "dropout";
const dropout: Item[] = [
  mcq(m(DO, "recall-purpose", "recall", 1, 15, "Dropout is mainly used to:"),
    "Reduce overfitting",
    [
      ["Speed up inference", "dropout-speed", "It's a regulariser."],
      ["Increase model capacity", "dropout-capacity", "It restricts the effective capacity."],
      ["Normalise activations", "dropout-normalise", "That's normalisation layers."],
    ]),
  mcq(m(DO, "recall-when", "recall", 1, 15, "With inverted dropout, when are units randomly dropped?"),
    "Only during training",
    [
      ["Only at inference", "when-inference", "Inference uses the full network."],
      ["Both training and inference", "when-both", "Standard dropout is off at inference."],
      ["Never", "when-never", "Dropping happens in training."],
    ]),
  num(m(DO, "recall-kept", "recall", 1, 15, "With dropout rate $p = 0.5$ on $100$ units, how many are kept on average?"), 50),
  num(m(DO, "apply-scale-half", "apply", 2, 20, "With inverted dropout at $p = 0.5$, kept activations are multiplied by what?"), 2),
  num(m(DO, "apply-scaled-value", "apply", 2, 20, "Inverted dropout with $p = 0.25$. A kept activation of $3$ becomes what?"), 4),
  num(m(DO, "apply-kept-thrice", "apply", 2, 20, "A unit is kept with probability $0.9$ on each forward pass, independently. What is the probability it's kept on $3$ passes in a row?"), 0.729),
  num(m(DO, "apply-masks", "apply", 3, 25, "How many distinct dropout masks are there over $10$ units?"), 1024),
  num(m(DO, "apply-expectation", "apply", 3, 25, "Inverted dropout with $p = 0.4$ is applied to an activation of $6$. What is the expected output?"), 6),
  num(m(DO, "apply-variance", "apply", 3, 25, "Inverted dropout with keep probability $q$ applied to activation $a$ has variance $a^{2}\\frac{1 - q}{q}$. What is it for $a = 1$ and $q = 0.5$?"), 1),
  num(m(DO, "apply-all-dropped", "apply", 4, 30, "With $p = 0.5$, what is the probability all $4$ units in a layer are dropped?"), 0.0625),
  num(m(DO, "apply-spatial", "apply", 4, 30, "Spatial dropout with $p = 0.25$ on $64$ channels drops how many channels on average?"), 16),
  mcq(m(DO, "apply-eval-mode", "apply", 5, 40, "In PyTorch, what does calling `model.eval()` do to dropout layers?"),
    "Turns them off, so every unit is used and outputs are deterministic",
    [
      ["Doubles the dropout rate", "eval-doubles", "Dropout is disabled."],
      ["Deletes the layers", "eval-deletes", "They stay but become the identity."],
      ["Nothing", "eval-nothing", "It switches them to inference behaviour."],
    ]),
  short(m(DO, "explain-mc-dropout", "explain", 6, 90, "How does MC dropout estimate a model's uncertainty?"),
    [
      ["sample", "Keep dropout on at test time and run several forward passes with different masks", 2, true],
      ["spread", "The mean is the prediction; the spread across passes estimates (epistemic) uncertainty", 2, true],
    ]),
  num(m(DO, "transfer-mc-mean", "transfer", 7, 60, "Four MC-dropout passes predict $0.6$, $0.8$, $0.7$ and $0.9$. What is the mean prediction?"), 0.75),
  num(m(DO, "transfer-mc-sd", "transfer", 8, 60, "What is the (population) standard deviation of those four predictions? Give $4$ decimal places."), 0.1118),
  short(m(DO, "transfer-rnn", "transfer", 8, 120, "Why does naive per-timestep dropout on an RNN's recurrent connections hurt, and what's the fix?"),
    [
      ["hurt", "Fresh masks each step inject noise that compounds over time, disrupting the memory carried in the hidden state", 2, true],
      ["fix", "Variational dropout uses the same mask at every time step (or apply dropout only to non-recurrent connections)", 2, true],
    ]),
  short(m(DO, "transfer-bn-shift", "transfer", 9, 150, "Why can placing dropout before batch normalisation cause a train–test mismatch?"),
    [
      ["variance", "Dropout changes activation variance in training, so BN's running variance reflects dropped-out statistics", 2, true],
      ["mismatch", "At test time dropout is off, so the variance differs from what BN normalises for; place dropout after BN or use it only near the end", 2, true],
    ]),
  num(m(DO, "transfer-l2-factor", "transfer", 9, 75, "For linear regression, dropout acts like an L2 penalty scaled by $\\frac{p}{1 - p}$. What is that factor for $p = 0.2$?"), 0.25),
  mcq(m(DO, "transfer-attention", "transfer", 10, 90, "In a transformer, attention dropout randomly zeroes:"),
    "Entries of the attention-weight matrix, so each query attends to a random subset of keys",
    [
      ["Whole layers", "attention-layers", "That's stochastic depth."],
      ["Input tokens", "attention-tokens", "That's token dropout."],
      ["The weight matrices", "attention-weights", "That's DropConnect."],
    ]),
  short(m(DO, "transfer-big-data", "transfer", 10, 180, "Why is dropout often reduced or removed when training very large models on huge datasets, and what regularisation remains?"),
    [
      ["why", "With far more data than the model can memorise (often one epoch), overfitting is less of a concern and dropout slows learning", 2, true],
      ["remains", "Weight decay, data scale and diversity, data augmentation and early stopping still regularise", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// batch-normalization
// ---------------------------------------------------------------------------
const BN = "batch-normalization";
const batchNorm: Item[] = [
  mcq(m(BN, "recall-goal", "recall", 1, 15, "Batch normalisation rescales each feature in a batch to have:"),
    "Zero mean and unit variance, before a learned scale and shift",
    [
      ["Values between $0$ and $1$", "goal-minmax", "That's min–max scaling."],
      ["Unit norm per example", "goal-unit-norm", "It normalises per feature across the batch."],
      ["The same value", "goal-same", "Variation is kept, just standardised."],
    ]),
  mcq(m(BN, "recall-origin", "recall", 1, 15, "Batch normalisation was introduced by:"),
    "Ioffe and Szegedy, in $2015$",
    [
      ["Hinton and Salakhutdinov, in $2006$", "origin-hinton", "That's deep autoencoders."],
      ["Vaswani et al., in $2017$", "origin-vaswani", "That's the transformer."],
      ["He et al., in $2015$", "origin-he", "That's ResNet."],
    ]),
  num(m(BN, "recall-mean", "recall", 1, 15, "A feature has values $2$, $4$ and $6$ in a batch. What is the batch mean?"), 4),
  num(m(BN, "apply-variance", "apply", 2, 20, "Same values. What is the batch (population) variance? Give $4$ decimal places."), 2.6667),
  num(m(BN, "apply-normalise", "apply", 2, 20, "A value $6$ with batch mean $4$ and standard deviation $2$ (ignore $\\epsilon$). What is its normalised value?"), 1),
  num(m(BN, "apply-affine", "apply", 2, 20, "With $\\gamma = 3$ and $\\beta = -1$, what does $\\hat{x} = 0.5$ become?"), 0.5),
  num(m(BN, "apply-running", "apply", 3, 25, "The running mean is updated as $(1 - 0.1) \\cdot \\text{running} + 0.1 \\cdot \\text{batch}$. With running mean $10$ and batch mean $20$, what's the new running mean?"), 11),
  num(m(BN, "apply-learnable", "apply", 3, 25, "How many learnable parameters does batch norm over $128$ channels have?"), 256),
  num(m(BN, "apply-buffers", "apply", 3, 25, "How many non-learned running statistics does it store for those $128$ channels?"), 256),
  num(m(BN, "apply-fold-scale", "apply", 4, 30, "Folding batch norm into the preceding layer multiplies its weights by $\\frac{\\gamma}{\\sigma}$. What is that factor for $\\gamma = 2$ and $\\sigma = 4$?"), 0.5),
  num(m(BN, "apply-fold-bias", "apply", 4, 30, "The folded bias is $(b - \\mu)\\frac{\\gamma}{\\sigma} + \\beta$. What is it for $b = 1$, $\\mu = 3$, $\\gamma = 2$, $\\sigma = 4$ and $\\beta = 1$?"), 0),
  mcq(m(BN, "apply-placement", "apply", 5, 40, "In the original design, where does batch norm sit in a block?"),
    "After the linear or convolutional layer and before the activation",
    [
      ["After the loss", "placement-loss", "It's inside the network."],
      ["Before the input layer only", "placement-input", "It's used between layers."],
      ["Only in the output layer", "placement-output", "It's used in hidden layers."],
    ]),
  short(m(BN, "explain-train-eval", "explain", 6, 90, "Why does batch norm behave differently in training and inference, and what bug does this cause if forgotten?"),
    [
      ["modes", "Training uses each batch's statistics; inference uses running averages so outputs don't depend on the batch", 2, true],
      ["bug", "Forgetting to switch to eval mode (or poor running averages) makes inference outputs depend on the batch and degrade", 2, true],
    ]),
  num(m(BN, "transfer-elements", "transfer", 7, 60, "For a convolutional layer, batch norm's per-channel statistics pool over batch and spatial positions. With batch $32$ and $14 \\times 14$ maps, how many values per channel?"), 6272),
  num(m(BN, "transfer-ghost", "transfer", 8, 60, "Ghost batch norm splits a batch of $1{,}024$ into ghost batches of $32$ for statistics. How many ghost batches?"), 32),
  short(m(BN, "transfer-sync", "transfer", 8, 120, "In data-parallel training with $4$ examples per GPU, why might you use synchronised batch norm?"),
    [
      ["small", "Per-GPU statistics from $4$ examples are very noisy", 2, true],
      ["sync", "Sync BN computes statistics across all GPUs' examples, giving a larger effective batch at the cost of communication", 2, true],
    ]),
  num(m(BN, "transfer-effective-lr", "transfer", 9, 75, "With batch norm after a layer, its weights are scale-invariant and the effective learning rate scales like $\\frac{1}{\\|\\mathbf{w}\\|^{2}}$. If $\\|\\mathbf{w}\\|$ doubles, by what factor does it change?"), 0.25),
  short(m(BN, "transfer-finetune", "transfer", 9, 150, "When fine-tuning a pretrained CNN on a small dataset with small batches, how should its batch-norm layers be handled, and why?"),
    [
      ["freeze", "Often freeze the running statistics (keep BN in eval mode), possibly also $\\gamma$ and $\\beta$", 2, true],
      ["why", "Small, unrepresentative batches give noisy statistics that would overwrite the good pretrained ones", 2, true],
    ]),
  mcq(m(BN, "transfer-landscape", "transfer", 10, 90, "Santurkar et al. ($2018$) argued batch norm helps mainly by:"),
    "Smoothing the loss landscape, making gradients more predictable",
    [
      ["Removing internal covariate shift", "landscape-ics", "They found ICS reduction wasn't the key."],
      ["Reducing the number of parameters", "landscape-params", "It adds parameters."],
      ["Replacing dropout entirely", "landscape-dropout", "That's not the argument."],
    ]),
  short(m(BN, "transfer-leak", "transfer", 10, 180, "Explain how batch norm can leak information between examples in a batch, and one situation where that matters."),
    [
      ["leak", "Each example's output depends on the batch's mean and variance, hence on the other examples", 2, true],
      ["matters", "E.g. in contrastive learning the model can exploit batch statistics to cheat, or at test time predictions change with batch composition", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// convolutional-neural-networks
// ---------------------------------------------------------------------------
const CN = "convolutional-neural-networks";
const cnns: Item[] = [
  mcq(m(CN, "recall-use", "recall", 1, 15, "CNNs are best known for working with:"),
    "Grid-structured data such as images",
    [
      ["Unordered sets", "use-sets", "Convolutions rely on grid locality."],
      ["Tabular data with unrelated columns", "use-tabular", "Columns lack spatial structure."],
      ["Graphs only", "use-graphs", "That's GNNs."],
    ]),
  mcq(m(CN, "recall-sharing", "recall", 1, 15, "Weight sharing in a convolutional layer means:"),
    "The same filter weights are applied at every spatial position",
    [
      ["Every layer uses the same weights", "sharing-layers", "Sharing is across positions."],
      ["Weights are shared between models", "sharing-models", "It's within a layer."],
      ["Weights are all equal", "sharing-equal", "A filter's weights differ from each other."],
    ]),
  mcq(m(CN, "recall-slide", "recall", 1, 15, "A convolution computes its output by:"),
    "Sliding a small filter over the input and taking a weighted sum at each position",
    [
      ["Multiplying the whole image by one number", "slide-scalar", "It uses local weighted sums."],
      ["Sorting the pixels", "slide-sort", "It's a weighted sum."],
      ["Averaging the whole image", "slide-average", "That's global pooling."],
    ]),
  num(m(CN, "apply-output-size", "apply", 2, 20, "A $28 \\times 28$ input with a $5 \\times 5$ kernel, stride $1$ and no padding gives what output width?"), 24),
  num(m(CN, "apply-params", "apply", 2, 20, "How many parameters does a $3 \\times 3$ convolution from $16$ to $32$ channels have, with biases?"), 4640),
  num(m(CN, "apply-channels", "apply", 2, 20, "A convolutional layer has $128$ filters. How many output channels does it produce?"), 128),
  num(m(CN, "apply-receptive", "apply", 3, 25, "Three stacked $3 \\times 3$ convolutions (stride $1$) have what receptive field width?"), 7),
  num(m(CN, "apply-1x1", "apply", 3, 25, "How many parameters does a $1 \\times 1$ convolution from $256$ to $64$ channels have, with biases?"), 16448),
  num(m(CN, "apply-maxpool", "apply", 3, 25, "$2 \\times 2$ max pooling on the patch $\\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix}$ outputs what?"), 4),
  num(m(CN, "apply-same-padding", "apply", 4, 30, "A $32 \\times 32$ input with a $3 \\times 3$ kernel, stride $1$ and padding $1$ gives what output width?"), 32),
  num(m(CN, "apply-separable", "apply", 4, 30, "A depthwise separable $3 \\times 3$ convolution from $32$ to $64$ channels (no biases) has $3 \\cdot 3 \\cdot 32 + 32 \\cdot 64$ parameters. How many?"), 2336),
  mcq(m(CN, "apply-gap", "apply", 5, 40, "Replacing the final flatten-and-dense layers with global average pooling lets a CNN:"),
    "Accept inputs of different spatial sizes, with far fewer parameters",
    [
      ["Skip all convolutions", "gap-skip", "Convolutions still extract features."],
      ["Become rotation-invariant", "gap-rotation", "Pooling doesn't give that."],
      ["Train without labels", "gap-labels", "Supervision is unchanged."],
    ]),
  short(m(CN, "explain-vs-dense", "explain", 6, 90, "Why is a convolutional layer better suited to images than a fully connected layer?"),
    [
      ["local", "Nearby pixels are related, so small local filters capture structure with few parameters", 2, true],
      ["shared", "A pattern means the same thing anywhere, so sharing filters across positions saves parameters and gives translation equivariance", 2, true],
    ]),
  num(m(CN, "transfer-dense-params", "transfer", 7, 60, "A dense layer from a flattened $224 \\times 224 \\times 3$ image to $1{,}000$ units (no biases) has how many million parameters? Give $3$ decimal places."), 150.528),
  num(m(CN, "transfer-separable-ratio", "transfer", 8, 60, "A standard $3 \\times 3$ convolution from $32$ to $64$ channels has $18{,}432$ weights; the separable version has $2{,}336$. What is the ratio? Give $4$ decimal places."), 7.8904),
  short(m(CN, "transfer-dilated", "transfer", 8, 120, "What does a dilated (atrous) convolution do, and where is it useful?"),
    [
      ["does", "It spaces the kernel's taps apart, enlarging the receptive field without more parameters or downsampling", 2, true],
      ["useful", "Useful for dense prediction (e.g. segmentation) and audio, where wide context is needed at full resolution", 2, true],
    ]),
  num(m(CN, "transfer-macs", "transfer", 9, 75, "A $3 \\times 3$ convolution from $64$ to $64$ channels on a $56 \\times 56$ output needs how many million multiply-adds? Give $4$ decimal places."), 115.6055),
  short(m(CN, "transfer-vit", "transfer", 9, 150, "Why do CNNs usually beat vision transformers when training data are limited, and why can transformers win at scale?"),
    [
      ["priors", "CNNs build in locality and translation equivariance, which are good priors that save data", 2, true],
      ["scale", "With huge data, transformers learn these patterns themselves and their flexible global attention can exceed the fixed priors", 2, true],
    ]),
  mcq(m(CN, "transfer-aliasing", "transfer", 10, 90, "Strided convolution and max pooling make CNN outputs change under 1-pixel shifts. What's a principled fix?"),
    "Blur (low-pass filter) before downsampling, as in anti-aliased CNNs",
    [
      ["Remove all convolutions", "aliasing-remove", "Convolution itself is equivariant."],
      ["Use larger strides", "aliasing-larger", "That worsens aliasing."],
      ["Add more dropout", "aliasing-dropout", "Dropout doesn't address aliasing."],
    ]),
  short(m(CN, "transfer-rotation", "transfer", 10, 180, "Standard CNNs aren't rotation-equivariant. Describe two ways to handle rotations."),
    [
      ["augment", "Augment training data with rotations so the network learns approximate invariance", 2, true],
      ["architecture", "Use group-equivariant convolutions (or steerable filters) that build rotation equivariance into the layers", 2, true],
    ]),
];

export const dlSixty01Items: Item[] = [
  ...perceptron,
  ...networks,
  ...backprop,
  ...activations,
  ...optimisers,
  ...dropout,
  ...batchNorm,
  ...cnns,
];
