import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./ml-sixty-shared";

/**
 * Losses and gradient descent (loss functions, cross-entropy, argmax vs.
 * softmax, gradient descent), each brought from 30 to 60 questions.
 */

// ---------------------------------------------------------------------------
// loss-functions
// ---------------------------------------------------------------------------
const L = "loss-functions";
const losses: Item[] = [
  mcq(m(L, "recall-lower-better", "recall", 1, 15, "For a loss function, is a smaller value better or worse?"),
    "Better — the loss measures how wrong the predictions are",
    [
      ["Worse — the loss measures accuracy", "loss-is-accuracy", "Loss measures error, so lower is better."],
      ["It depends on the dataset size", "loss-size-dependent", "Lower loss always means smaller error on the data scored."],
      ["Neither — only its sign matters", "loss-sign", "The magnitude is what's minimised."],
    ]),
  mcq(m(L, "recall-empirical-risk", "recall", 1, 15, "What is *empirical risk*?"),
    "The average loss over the training examples",
    [
      ["The loss on one example", "risk-one-example", "Empirical risk averages over all training examples."],
      ["The expected loss over the true distribution", "risk-is-true-risk", "That's the (true) risk, which can't be computed directly."],
      ["The probability of a model being wrong", "risk-is-probability", "That's error rate under $0$–$1$ loss specifically."],
    ]),
  mcq(m(L, "recall-mse-formula", "recall", 1, 15, "Which formula is mean squared error?"),
    "$\\frac{1}{n}\\sum_{i=1}^{n}(y_i - \\hat{y}_i)^{2}$",
    [
      ["$\\frac{1}{n}\\sum_{i=1}^{n}|y_i - \\hat{y}_i|$", "mse-is-mae", "That's mean absolute error."],
      ["$\\sum_{i=1}^{n}(y_i - \\hat{y}_i)$", "mse-signed", "Signed errors cancel out."],
      ["$\\max_i |y_i - \\hat{y}_i|$", "mse-max", "That's the maximum error."],
    ]),
  mcq(m(L, "recall-surrogate", "recall", 2, 20, "A *surrogate loss* is:"),
    "A tractable loss (such as logistic or hinge) optimised in place of one that's hard to optimise directly (such as $0$–$1$ loss)",
    [
      ["The loss on a validation set", "surrogate-validation", "That's validation loss."],
      ["A loss computed by another model", "surrogate-other-model", "It replaces a hard-to-optimise loss."],
      ["Any loss with a regulariser added", "surrogate-regularised", "Regularisation is separate."],
    ]),
  mcq(m(L, "recall-regularised-objective", "recall", 2, 20, "In the objective $\\frac{1}{n}\\sum_i L(y_i, f(\\mathbf{x}_i)) + \\lambda\\|\\mathbf{w}\\|^{2}$, what does the second term do?"),
    "Penalises large weights to discourage overfitting",
    [
      ["Measures prediction error", "reg-measures-error", "The first term measures error."],
      ["Speeds up the optimiser", "reg-speeds-up", "It changes what's optimal, not just speed."],
      ["Normalises the data", "reg-normalises", "It acts on the weights, not the data."],
    ]),
  num(m(L, "apply-squared-loss", "apply", 2, 20, "What is the squared loss $(y - \\hat{y})^{2}$ for $y = 10$ and $\\hat{y} = 7$?"), 9),
  num(m(L, "apply-mae-set", "apply", 3, 25, "Errors are $-4$, $2$, $0$ and $2$. What is the mean absolute error?"), 2),
  num(m(L, "apply-mse-set", "apply", 3, 25, "Errors are $-4$, $2$, $0$ and $2$. What is the mean squared error?"), 6),
  num(m(L, "apply-zero-one", "apply", 3, 25, "Predicted classes are $(1, 0, 1, 1, 0)$ and true classes $(1, 1, 1, 0, 0)$. What is the average $0$–$1$ loss?"), 0.4),
  num(m(L, "apply-hinge", "apply", 4, 30, "Hinge loss is $\\max(0, 1 - yf)$. What is it for $y = -1$ and score $f = 0.3$?"), 1.3),
  num(m(L, "apply-huber", "apply", 4, 35, "Huber loss with $\\delta = 1$ is $\\frac{1}{2}r^{2}$ for $|r| \\le 1$ and $|r| - \\frac{1}{2}$ otherwise. What is it for residual $r = 3$?"), 2.5),
  num(m(L, "apply-log-loss-one", "apply", 4, 35, "Log loss for a true positive predicted with probability $0.8$ is $-\\ln 0.8$. Give $4$ decimal places."), 0.2231),
  mcq(m(L, "apply-optimal-constant-mse", "apply", 5, 40, "Targets are $1$, $2$, $3$ and $10$. Which constant prediction minimises mean squared error?"),
    "$4$, the mean",
    [
      ["$2.5$, the median", "mse-median", "The median minimises absolute error."],
      ["$10$, the maximum", "mse-max-constant", "That's far from most targets."],
      ["$1$, the minimum", "mse-min-constant", "The mean minimises squared error."],
    ]),
  num(m(L, "apply-weighted-loss", "apply", 5, 45, "False negatives cost $5$ and false positives cost $1$. A model makes $3$ false negatives and $10$ false positives. What is the total cost?"), 25),
  short(m(L, "explain-outlier-sensitivity", "explain", 6, 120, "Compare how squared loss and absolute loss respond to a single huge outlier in the training targets, and what each implies for the fitted model."),
    [
      ["squared", "Squared loss grows quadratically, so one outlier can dominate and pull the fit strongly toward it", 2, true],
      ["absolute", "Absolute loss grows linearly, so the fit (like a median) is far more robust", 2, true],
    ]),
  short(m(L, "explain-training-vs-eval", "explain", 6, 120, "Why might a team train with cross-entropy but report F1 score? What does each serve?"),
    [
      ["training", "Cross-entropy is smooth and differentiable, suitable for gradient-based training", 2, true],
      ["reporting", "F1 reflects the business-relevant performance (e.g. on an imbalanced positive class) but isn't differentiable", 2, true],
    ]),
  mcq(m(L, "explain-convexity", "explain", 6, 50, "Why is it valuable that squared loss for a linear model is convex in the weights?"),
    "Every local minimum is a global minimum, so gradient methods can't get stuck in a worse one",
    [
      ["Convex losses are always zero at the optimum", "convex-zero", "Convexity doesn't imply zero loss."],
      ["Convex losses need no optimisation", "convex-no-optimisation", "They still need optimising, just reliably."],
      ["Convexity guarantees no overfitting", "convex-no-overfit", "Overfitting is a separate issue."],
    ]),
  num(m(L, "transfer-quantile-optimal", "transfer", 7, 60, "Under pinball loss with $\\tau = 0.75$, the optimal constant prediction is the $75$th percentile. For targets $1, 2, \\ldots, 9$, what is it (using the plain $\\tau$-quantile, the $7$th smallest value)?"), 7),
  mcq(m(L, "transfer-asymmetric", "transfer", 7, 60, "Running out of stock costs $4$ times as much as overstocking. Which quantile of demand should an inventory model predict?"),
    "The $0.8$ quantile, since $\\frac{4}{4 + 1} = 0.8$",
    [
      ["The median", "asymmetric-median", "Asymmetric costs shift the optimum away from the median."],
      ["The $0.2$ quantile", "asymmetric-inverted", "Under-stocking is costlier, so predict higher, not lower."],
      ["The mean", "asymmetric-mean", "The mean is optimal only for squared loss."],
    ]),
  num(m(L, "transfer-log-cosh", "transfer", 8, 60, "Log-cosh loss is $\\ln\\cosh(r)$. What is it for residual $r = 2$? Give $4$ decimal places."), 1.325),
  mcq(m(L, "transfer-proper-scoring", "transfer", 8, 60, "Why is log loss called a *strictly proper* scoring rule?"),
    "Its expected value is uniquely minimised by reporting the true probability, so it rewards honest probabilities",
    [
      ["It is always non-negative", "proper-nonneg", "Many improper scores are non-negative too."],
      ["It is bounded above", "proper-bounded", "Log loss is actually unbounded."],
      ["It equals accuracy", "proper-accuracy", "It scores probabilities, not decisions."],
    ]),
  short(m(L, "transfer-loss-choice-business", "transfer", 8, 150, "A ride-hailing app predicts arrival time. Being late annoys customers far more than being early. How would you reflect this in the loss, and what will the model learn to do?"),
    [
      ["asymmetric", "Use an asymmetric loss, e.g. pinball/quantile loss with a high $\\tau$, or weight late errors more", 2, true],
      ["behaviour", "The model will deliberately predict on the late side (a high quantile), so it's rarely too early in its promise", 2, true],
    ]),
  num(m(L, "transfer-focal", "transfer", 9, 75, "Focal loss is $-(1 - p)^{\\gamma}\\ln p$ for the true class. With $p = 0.9$ and $\\gamma = 2$, what is it? Give $5$ decimal places."), 0.00105),
  mcq(m(L, "transfer-hinge-zero", "transfer", 9, 75, "Why does an SVM's solution depend only on its support vectors?"),
    "Hinge loss is exactly zero for points beyond the margin, so they contribute nothing to the gradient or the solution",
    [
      ["All other points are deleted before training", "svm-deletes", "They're used; they just end up with zero loss."],
      ["Support vectors have larger features", "sv-larger", "They're the points on or inside the margin."],
      ["Hinge loss ignores misclassified points", "hinge-ignores-errors", "Misclassified points have positive loss and are support vectors."],
    ]),
  num(m(L, "transfer-risk-decomposition", "transfer", 9, 90, "For squared loss, expected loss $=$ bias$^{2}$ $+$ variance $+$ noise. With bias $0.3$, variance $0.2$ and noise variance $0.5$, what is the expected loss?"), 0.79),
  short(m(L, "transfer-bayes-optimal", "transfer", 10, 180, "For squared loss, absolute loss and $0$–$1$ loss, state which summary of the conditional distribution $p(y \\mid \\mathbf{x})$ is the optimal prediction, and explain why choosing the loss is choosing what to predict."),
    [
      ["mapping", "Squared → conditional mean; absolute → conditional median; $0$–$1$ → conditional mode", 2, true],
      ["meaning", "Each loss defines the best point summary, so the loss encodes what the predictions are meant to represent", 2, true],
    ]),
  mcq(m(L, "transfer-calibration-vs-accuracy", "transfer", 10, 90, "Two classifiers have equal accuracy, but one has much lower log loss. What does that tell you?"),
    "Its probabilities are better: more confident when right and less confident when wrong",
    [
      ["Nothing — equal accuracy means equal quality", "accuracy-sufficient", "Log loss also scores confidence."],
      ["It overfits more", "lower-logloss-overfits", "Lower held-out log loss indicates better probabilities."],
      ["Its threshold is different", "logloss-threshold", "Log loss doesn't depend on a threshold."],
    ]),
  num(m(L, "transfer-elastic-net", "transfer", 10, 90, "With weights $\\mathbf{w} = [2, -1, 0]$, what is the elastic-net penalty $\\lambda_1\\|\\mathbf{w}\\|_1 + \\lambda_2\\|\\mathbf{w}\\|_2^{2}$ for $\\lambda_1 = 0.5$ and $\\lambda_2 = 0.1$?"), 2),
  mcq(m(L, "recall-mae-units", "recall", 2, 20, "A model predicts prices in dollars. In what units is its mean absolute error?"),
    "Dollars",
    [
      ["Dollars squared", "mae-units-squared", "That's the unit of MSE."],
      ["Percent", "mae-units-percent", "That would be a percentage error such as MAPE."],
      ["It has no units", "mae-no-units", "MAE keeps the units of the target."],
    ]),
  short(m(L, "transfer-differentiability", "transfer", 7, 120, "Absolute loss $|y - \\hat{y}|$ isn't differentiable at $0$. Explain why this rarely stops gradient-based training, and name a smooth alternative."),
    [
      ["subgradient", "Exact zero residuals are rare, and a subgradient (any value in $[-1, 1]$ at $0$) works in practice", 2, true],
      ["smooth", "Smooth alternatives such as Huber or log-cosh loss behave like absolute loss for large errors", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// cross-entropy-loss
// ---------------------------------------------------------------------------
const CE = "cross-entropy-loss";
const crossEntropy: Item[] = [
  mcq(m(CE, "recall-what-scores", "recall", 1, 15, "What does cross-entropy loss score?"),
    "Predicted probabilities against the true labels",
    [
      ["Raw class predictions without probabilities", "ce-hard-labels", "It needs probabilities for each class."],
      ["Distances between feature vectors", "ce-distances", "That's a distance metric."],
      ["Regression residuals", "ce-residuals", "Residuals suit squared or absolute loss."],
    ]),
  mcq(m(CE, "recall-perfect-zero", "recall", 1, 15, "What is the cross-entropy when the model assigns probability $1$ to the correct class?"),
    "$0$",
    [
      ["$1$", "ce-perfect-one", "$-\\ln 1 = 0$."],
      ["Infinity", "ce-perfect-infinite", "Infinity occurs when the true class gets probability $0$."],
      ["$-1$", "ce-perfect-negative", "Cross-entropy is never negative."],
    ]),
  mcq(m(CE, "recall-log-loss-alias", "recall", 1, 15, "Binary cross-entropy is also called:"),
    "Log loss",
    [
      ["Hinge loss", "ce-hinge", "Hinge loss is the SVM margin loss."],
      ["Mean squared error", "ce-mse", "MSE is for regression."],
      ["$0$–$1$ loss", "ce-zero-one", "That counts mistakes only."],
    ]),
  mcq(m(CE, "recall-units", "recall", 2, 20, "Cross-entropy computed with the natural log is measured in:"),
    "Nats (with $\\log_2$ it would be bits)",
    [
      ["Bits", "ce-natural-bits", "Bits come from $\\log_2$."],
      ["Probabilities", "ce-prob-units", "It's an information quantity, not a probability."],
      ["Decibels", "ce-decibels", "Decibels are a log scale for power ratios."],
    ]),
  num(m(CE, "apply-binary-ce", "apply", 2, 25, "True label $y = 1$, predicted $\\hat{p} = 0.5$. What is $-\\ln \\hat{p}$? Give $4$ decimal places."), 0.6931),
  num(m(CE, "apply-binary-ce-neg", "apply", 3, 30, "True label $y = 0$, predicted $\\hat{p} = 0.2$ for class $1$. What is the binary cross-entropy $-\\ln(1 - \\hat{p})$? Give $4$ decimal places."), 0.2231),
  num(m(CE, "apply-multiclass-ce", "apply", 3, 30, "A $3$-class model predicts $(0.2, 0.7, 0.1)$ and the true class is the first. What is the cross-entropy? Give $4$ decimal places."), 1.6094),
  num(m(CE, "apply-average-ce", "apply", 4, 35, "Three examples have true-class probabilities $0.9$, $0.5$ and $0.1$. What is the average cross-entropy in nats? Give $4$ decimal places."), 1.0337),
  num(m(CE, "apply-bits", "apply", 4, 35, "A model assigns probability $0.25$ to the true class. What is the cross-entropy in bits?"), 2),
  num(m(CE, "apply-perplexity", "apply", 5, 40, "A language model's average cross-entropy is $3$ bits per token. What is its perplexity $2^{H}$?"), 8),
  num(m(CE, "apply-gradient-sigmoid", "apply", 5, 45, "With a sigmoid output and binary cross-entropy, $\\frac{\\partial L}{\\partial z} = \\hat{p} - y$. For $\\hat{p} = 0.3$ and $y = 1$, what is it?"), -0.7),
  mcq(m(CE, "apply-clip", "apply", 5, 40, "Why do implementations clip predicted probabilities to $[10^{-7}, 1 - 10^{-7}]$ before taking logs?"),
    "To avoid $\\ln 0 = -\\infty$, which would make the loss infinite and break training",
    [
      ["To make the model more accurate", "clip-accuracy", "It's a numerical safeguard."],
      ["Because probabilities above $0.9$ are invalid", "clip-invalid", "High probabilities are valid; only exactly $0$ or $1$ cause trouble."],
      ["To speed up training", "clip-speed", "It's about numerical stability."],
    ]),
  short(m(CE, "explain-confident-wrong", "explain", 6, 120, "Why does cross-entropy punish a confident wrong prediction so much more than squared error would?"),
    [
      ["log", "$-\\ln p$ grows without bound as the true-class probability $p \\to 0$", 2, true],
      ["squared-bounded", "Squared error on probabilities is bounded by $1$, so it penalises confident mistakes far less", 2, true],
    ]),
  short(m(CE, "explain-kl-link", "explain", 6, 120, "Explain the identity $H(p, q) = H(p) + D_{\\text{KL}}(p \\| q)$ and why it means minimising cross-entropy over $q$ minimises KL divergence."),
    [
      ["identity", "Cross-entropy equals the entropy of the true distribution plus the KL divergence from $q$ to $p$", 2, true],
      ["constant", "$H(p)$ doesn't depend on the model $q$, so minimising $H(p, q)$ minimises the KL term", 2, true],
    ]),
  mcq(m(CE, "explain-mle", "explain", 6, 50, "Minimising average cross-entropy over a training set is equivalent to:"),
    "Maximising the likelihood of the training labels under the model",
    [
      ["Minimising the number of errors", "ce-is-zero-one", "That's $0$–$1$ loss."],
      ["Maximising the margin", "ce-is-margin", "That's the SVM objective."],
      ["Minimising the model's entropy", "ce-is-entropy", "Low entropy alone could mean confidently wrong."],
    ]),
  num(m(CE, "transfer-label-smoothing", "transfer", 7, 60, "With label smoothing $\\varepsilon = 0.1$ over $K = 5$ classes, what target probability does the true class get, using $1 - \\varepsilon + \\frac{\\varepsilon}{K}$?"), 0.92),
  num(m(CE, "transfer-uniform-k", "transfer", 7, 60, "A $50$-class classifier outputs uniform probabilities. What is its cross-entropy in nats? Give $4$ decimal places."), 3.912),
  mcq(m(CE, "transfer-overconfidence", "transfer", 8, 60, "Validation accuracy keeps rising, but validation cross-entropy starts rising too. What is the most likely explanation?"),
    "The model grows overconfident: a few wrong predictions become very confident, which cross-entropy punishes heavily",
    [
      ["The validation data are corrupted", "ce-corrupt", "This pattern is typical of overconfidence."],
      ["Cross-entropy and accuracy always move together", "ce-accuracy-same", "They can diverge because cross-entropy scores confidence."],
      ["The learning rate is too small", "ce-lr-small", "That would slow both, not make them diverge."],
    ]),
  num(m(CE, "transfer-kl-compute", "transfer", 8, 75, "True distribution $p = (0.5, 0.5)$ and model $q = (0.8, 0.2)$. What is $D_{\\text{KL}}(p \\| q)$ in nats? Give $4$ decimal places."), 0.2231),
  num(m(CE, "transfer-entropy-floor", "transfer", 8, 60, "Labels are genuinely random: each class is $50\\%$ likely regardless of input. What is the lowest achievable expected binary cross-entropy in nats? Give $4$ decimal places."), 0.6931),
  short(m(CE, "transfer-class-weights", "transfer", 9, 150, "With $99\\%$ negatives, a team weights the positive class's cross-entropy term by $99$. Explain what this does to the decision boundary and to the model's probabilities."),
    [
      ["boundary", "It pushes the model to predict positive more often, as if classes were balanced", 2, true],
      ["calibration", "Its probabilities are no longer calibrated to the true base rate; they're inflated for the positive class", 2, true],
    ]),
  mcq(m(CE, "transfer-logits-stability", "transfer", 9, 75, "Why do libraries offer a loss that takes raw logits (e.g. `BCEWithLogitsLoss`) rather than probabilities?"),
    "Combining sigmoid and log in one step (using the log-sum-exp trick) avoids overflow and $\\ln 0$ for large logits",
    [
      ["Logits are more accurate predictions", "logits-accurate", "They're the same predictions before squashing."],
      ["It makes the loss convex", "logits-convex", "Convexity isn't changed; stability is."],
      ["Probabilities can't be differentiated", "prob-no-gradient", "They can; the issue is numerical precision."],
    ]),
  num(m(CE, "transfer-focal-ratio", "transfer", 9, 75, "Focal loss multiplies cross-entropy by $(1 - p)^{\\gamma}$. With $\\gamma = 2$, by what factor is an easy example with $p = 0.9$ down-weighted relative to a hard one with $p = 0.6$? Give $2$ decimal places (ratio of the hard weight to the easy weight)."), 16),
  short(m(CE, "transfer-distillation", "transfer", 10, 180, "In knowledge distillation, a student is trained with cross-entropy against a teacher's softened probabilities instead of one-hot labels. Explain why soft targets carry more information."),
    [
      ["dark-knowledge", "Soft targets show how the teacher ranks the wrong classes (similarities between classes), not just the right answer", 2, true],
      ["gradients", "This gives richer gradients per example and acts as regularisation, so the student learns more from each example", 2, true],
    ]),
  num(m(CE, "transfer-perplexity-change", "transfer", 10, 90, "A language model's cross-entropy drops from $2.0$ to $1.5$ nats per token. By what factor does its perplexity $e^{H}$ fall? Give $3$ decimal places."), 1.649),
  mcq(m(CE, "transfer-ce-vs-mse-gradient", "transfer", 10, 90, "With a sigmoid output, why does cross-entropy train faster than squared error when a prediction is badly wrong?"),
    "Squared error's gradient includes $\\sigma'(z)$, which vanishes when the sigmoid saturates; cross-entropy's gradient $\\hat{p} - y$ stays large",
    [
      ["Squared error has no gradient", "mse-no-gradient", "It has a gradient — just a tiny one when saturated."],
      ["Cross-entropy uses a larger learning rate", "ce-larger-lr", "The learning rate is a separate choice."],
      ["Cross-entropy is linear", "ce-linear", "It's the gradient's form that matters."],
    ]),
  mcq(m(CE, "recall-one-hot", "recall", 2, 20, "In multiclass cross-entropy $-\\sum_k y_k \\ln \\hat{p}_k$ with one-hot labels, how many terms are nonzero?"),
    "One — only the true class's term",
    [
      ["All $K$ terms", "ce-all-terms", "One-hot $y_k$ is zero except for the true class."],
      ["None", "ce-no-terms", "The true class's term remains."],
      ["Two", "ce-two-terms", "Only one class is true."],
    ]),
  num(m(CE, "apply-sum-ce", "apply", 4, 35, "A batch has true-class probabilities $0.5$ and $0.25$. What is the *summed* cross-entropy in bits?"), 3),
  mcq(m(CE, "apply-compare-models", "apply", 5, 40, "On one example with true class $1$, model A gives it probability $0.6$ and model B gives $0.9$. Which has lower cross-entropy?"),
    "Model B, since $-\\ln 0.9 < -\\ln 0.6$",
    [
      ["Model A", "ce-lower-prob-better", "Higher probability on the true class gives lower loss."],
      ["They're equal because both predict class $1$", "ce-same-prediction", "Cross-entropy scores confidence, not just the predicted class."],
      ["It can't be compared on one example", "ce-one-example", "The loss is defined per example."],
    ]),
  short(m(CE, "transfer-noisy-labels", "transfer", 8, 150, "Why is cross-entropy sensitive to mislabelled training examples, and name one remedy."),
    [
      ["sensitivity", "A mislabelled example the model correctly disagrees with gets a near-zero probability on its (wrong) label, giving a huge loss that dominates the gradient", 2, true],
      ["remedy", "E.g. label smoothing, robust losses (generalised cross-entropy, symmetric CE), or cleaning/down-weighting suspect labels", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// argmax-vs-softmax
// ---------------------------------------------------------------------------
const AS = "argmax-vs-softmax";
const argmaxSoftmax: Item[] = [
  mcq(m(AS, "recall-argmax-output-type", "recall", 1, 15, "What kind of value does $\\operatorname{argmax}$ return?"),
    "A position (index), not a probability",
    [
      ["A probability distribution", "argmax-distribution", "That's softmax."],
      ["The largest value itself", "argmax-is-max", "That's $\\max$; argmax returns where it occurs."],
      ["The sum of the scores", "argmax-sum", "It picks a single index."],
    ]),
  mcq(m(AS, "recall-softmax-sum", "recall", 1, 15, "Softmax outputs always sum to:"),
    "$1$",
    [
      ["$0$", "softmax-sum-zero", "Each output is positive."],
      ["The number of classes", "softmax-sum-k", "They form a probability distribution."],
      ["The largest logit", "softmax-sum-max", "They're normalised to sum to $1$."],
    ]),
  mcq(m(AS, "recall-logits-meaning", "recall", 1, 15, "What are *logits*?"),
    "The raw, unnormalised scores a classifier produces before softmax",
    [
      ["Probabilities after softmax", "logits-are-probs", "Softmax turns logits into probabilities."],
      ["Logarithms of the input features", "logits-log-features", "They're output scores."],
      ["The class labels", "logits-labels", "They're scores for each class."],
    ]),
  mcq(m(AS, "recall-order-preserved", "recall", 2, 20, "Does softmax change which class has the highest score?"),
    "No — it's monotonic, so the argmax of the softmax equals the argmax of the logits",
    [
      ["Yes, it can reorder classes", "softmax-reorders", "Exponentiating and dividing by a common sum preserves order."],
      ["Only for negative logits", "softmax-negative", "Order is preserved for any logits."],
      ["Only with temperature $1$", "softmax-temp-order", "Any positive temperature preserves order."],
    ]),
  num(m(AS, "apply-argmax-index", "apply", 2, 20, "Using $0$-based indexing, what is $\\operatorname{argmax}(0.3, -1.2, 2.5, 2.4)$?"), 2),
  num(m(AS, "apply-softmax-two", "apply", 3, 30, "What is the first entry of $\\operatorname{softmax}(1, 0)$? Give $4$ decimal places."), 0.7311),
  num(m(AS, "apply-softmax-three", "apply", 3, 30, "What is the last entry of $\\operatorname{softmax}(0, 0, \\ln 2)$?"), 0.5),
  num(m(AS, "apply-softmax-shift", "apply", 4, 35, "What is the first entry of $\\operatorname{softmax}(101, 100)$? Give $4$ decimal places."), 0.7311),
  num(m(AS, "apply-temperature", "apply", 4, 40, "With temperature $T = 2$, what is the first entry of $\\operatorname{softmax}(z / T)$ for $z = (2, 0)$? Give $4$ decimal places."), 0.7311),
  num(m(AS, "apply-log-softmax", "apply", 5, 45, "What is $\\ln\\operatorname{softmax}(z)_1$ for $z = (\\ln 3, \\ln 1)$? Give $4$ decimal places."), -0.2877),
  num(m(AS, "apply-odds", "apply", 5, 40, "Softmax gives classes $1$ and $2$ probabilities in the ratio $e^{z_1 - z_2}$. If $z_1 - z_2 = \\ln 4$, what is $p_1 / p_2$?"), 4),
  mcq(m(AS, "apply-prediction-from-probs", "apply", 4, 35, "Softmax probabilities are $(0.30, 0.31, 0.39)$. What class does the classifier predict, and how confident is it?"),
    "Class $3$ (index $2$), with low confidence — only $0.39$",
    [
      ["Class $3$, with high confidence", "argmax-high-confidence", "$0.39$ is barely ahead of the others."],
      ["No class — none exceed $0.5$", "softmax-needs-half", "Argmax always picks the largest, even below $0.5$."],
      ["Class $1$", "argmax-first", "Class $3$ has the largest probability."],
    ]),
  short(m(AS, "explain-softmax-name", "explain", 6, 120, "Why is softmax described as a “soft” version of argmax? Mention what happens as temperature changes."),
    [
      ["smooth", "Softmax is a smooth, differentiable approximation that puts most mass on the largest score", 2, true],
      ["temperature", "As $T \\to 0$ it approaches the one-hot argmax; as $T \\to \\infty$ it approaches uniform", 2, true],
    ]),
  short(m(AS, "explain-stability", "explain", 6, 120, "Explain why softmax is computed as $\\operatorname{softmax}(z - \\max_k z_k)$ in practice, and why this gives the same answer."),
    [
      ["overflow", "Exponentiating large logits overflows (e.g. $e^{1000}$); subtracting the max keeps exponents $\\le 0$", 2, true],
      ["invariance", "Softmax is invariant to adding a constant to all logits, so the result is unchanged", 2, true],
    ]),
  mcq(m(AS, "explain-argmax-gradient", "explain", 6, 50, "What is the gradient of $\\operatorname{argmax}(z)$ with respect to $z$, almost everywhere?"),
    "Zero — small changes in $z$ don't change the chosen index",
    [
      ["One", "argmax-grad-one", "The output is piecewise constant."],
      ["Equal to the softmax", "argmax-grad-softmax", "That's what a smooth relaxation provides, not argmax itself."],
      ["Undefined everywhere", "argmax-grad-undefined", "It's zero almost everywhere, undefined only at ties."],
    ]),
  num(m(AS, "transfer-max-entropy-k", "transfer", 7, 60, "What is the largest possible entropy, in nats, of a softmax output over $K = 8$ classes? Give $4$ decimal places."), 2.0794),
  num(m(AS, "transfer-softmax-jacobian", "transfer", 7, 60, "The softmax Jacobian has diagonal entries $p_i(1 - p_i)$. With $p = (0.5, 0.3, 0.2)$, what is $\\frac{\\partial p_1}{\\partial z_1}$?"), 0.25),
  num(m(AS, "transfer-softmax-off-diagonal", "transfer", 8, 60, "The softmax Jacobian's off-diagonal entries are $-p_i p_j$. With $p = (0.5, 0.3, 0.2)$, what is $\\frac{\\partial p_1}{\\partial z_2}$?"), -0.15),
  mcq(m(AS, "transfer-sigmoid-equivalence", "transfer", 8, 60, "A two-class softmax with logits $(z, 0)$ gives class-$1$ probability equal to:"),
    "$\\sigma(z) = \\frac{1}{1 + e^{-z}}$",
    [
      ["$e^{z}$", "softmax2-exp", "That's not normalised."],
      ["$\\tanh(z)$", "softmax2-tanh", "tanh ranges over $(-1, 1)$."],
      ["$\\frac{z}{1 + z}$", "softmax2-rational", "The exponential form gives the sigmoid."],
    ]),
  num(m(AS, "transfer-logsumexp", "transfer", 8, 75, "The log-sum-exp $\\ln\\sum_k e^{z_k}$ is a smooth maximum. What is it for $z = (10, 10)$? Give $4$ decimal places."), 10.6931),
  short(m(AS, "transfer-topk-sampling", "transfer", 9, 150, "A text generator always takes the argmax token and produces repetitive text. Explain why, and how sampling from the softmax with temperature or top-$k$ helps."),
    [
      ["greedy", "Greedy argmax is deterministic and keeps choosing high-probability, often repetitive continuations", 2, true],
      ["sampling", "Sampling introduces diversity; temperature controls randomness and top-$k$/top-$p$ cut off unlikely tokens", 2, true],
    ]),
  num(m(AS, "transfer-temperature-limit", "transfer", 9, 75, "Logits $(3, 1)$ at temperature $T = 0.5$. What is the first softmax entry? Give $4$ decimal places."), 0.982),
  mcq(m(AS, "transfer-calibration-temperature", "transfer", 9, 75, "Temperature scaling fits one scalar $T$ on validation data to calibrate a classifier. Why doesn't it change accuracy?"),
    "Dividing all logits by the same positive $T$ doesn't change their order, so the argmax is unchanged",
    [
      ["It changes every prediction to the correct class", "temp-fixes-errors", "It only rescales confidence."],
      ["Accuracy is computed before softmax", "accuracy-before", "Accuracy uses the argmax, which $T$ preserves."],
      ["It does change accuracy", "temp-changes-accuracy", "Order is preserved, so accuracy can't change."],
    ]),
  short(m(AS, "transfer-gumbel", "transfer", 10, 180, "Explain how adding independent Gumbel noise to logits and taking the argmax samples from the softmax distribution, and why the Gumbel-softmax relaxation is useful in training."),
    [
      ["gumbel-max", "$\\operatorname{argmax}_k (z_k + g_k)$ with i.i.d. Gumbel $g_k$ returns class $k$ with probability $\\operatorname{softmax}(z)_k$", 2, true],
      ["relaxation", "Replacing argmax with a softmax at low temperature gives a differentiable approximate sample, enabling gradients through discrete choices", 2, true],
    ]),
  num(m(AS, "transfer-free-parameters", "transfer", 10, 90, "A softmax classifier on $d = 100$ features with $K = 10$ classes uses a weight matrix and bias vector. Because adding the same vector to every class's parameters doesn't change the probabilities, how many parameters are identifiable?"), 909),
  mcq(m(AS, "transfer-sparsemax", "transfer", 10, 90, "How does sparsemax differ from softmax?"),
    "It projects scores onto the probability simplex, so it can assign exactly zero probability to low-scoring classes",
    [
      ["It always returns a one-hot vector", "sparsemax-onehot", "It can return several nonzero entries."],
      ["Its outputs don't sum to $1$", "sparsemax-unnormalised", "It still returns a probability distribution."],
      ["It's identical to softmax with $T = 1$", "sparsemax-same", "Softmax is never exactly zero."],
    ]),
  num(m(AS, "transfer-top2-gap", "transfer", 8, 60, "Softmax probabilities are proportional to $e^{z}$. If class $1$'s logit exceeds class $2$'s by $2$, how many times more probable is class $1$? Give $3$ decimal places."), 7.389),
  mcq(m(AS, "recall-softmax-output-range", "recall", 2, 20, "Each softmax output lies in which range?"),
    "$(0, 1)$ — strictly between $0$ and $1$",
    [
      ["$[-1, 1]$", "softmax-range-tanh", "That's tanh's range."],
      ["$[0, \\infty)$", "softmax-range-unbounded", "Normalisation keeps each output below $1$."],
      ["$\\{0, 1\\}$", "softmax-range-binary", "That's one-hot argmax."],
    ]),
  num(m(AS, "apply-softmax-uniform", "apply", 3, 25, "All $5$ logits are equal. What probability does softmax assign to each class?"), 0.2),
  mcq(m(AS, "transfer-multilabel-softmax", "transfer", 7, 60, "An image can contain both a cat and a dog. Why is a single softmax over $\\{\\text{cat}, \\text{dog}, \\text{neither}\\}$ a poor output layer?"),
    "Softmax forces the classes to compete for one unit of probability, so it can't say “both” with high confidence; use independent sigmoids",
    [
      ["Softmax can't handle three classes", "softmax-three", "Softmax handles any number of classes."],
      ["Softmax is too slow", "softmax-slow", "Speed isn't the issue."],
      ["Softmax always predicts “neither”", "softmax-neither", "It predicts whichever has the largest logit."],
    ]),
];

// ---------------------------------------------------------------------------
// gradient-descent
// ---------------------------------------------------------------------------
const GD = "gradient-descent";
const gradientDescent: Item[] = [
  mcq(m(GD, "recall-learning-rate", "recall", 1, 15, "In gradient descent, what is the learning rate?"),
    "The step size multiplying the gradient in each update",
    [
      ["The fraction of data used per step", "lr-batch-fraction", "That relates to batch size."],
      ["How fast the loss must fall", "lr-loss-speed", "It's a hyperparameter scaling the step."],
      ["The number of iterations", "lr-iterations", "That's the training length."],
    ]),
  mcq(m(GD, "recall-minus-sign", "recall", 1, 15, "Why does the update $\\theta \\leftarrow \\theta - \\eta\\nabla L$ subtract the gradient?"),
    "The gradient points uphill (steepest increase), so stepping against it decreases the loss",
    [
      ["To keep parameters positive", "minus-positive", "Parameters can be any sign."],
      ["Because gradients are always negative", "gradients-negative", "Gradients can have any sign."],
      ["It's an arbitrary convention", "minus-convention", "Subtracting is what makes the loss decrease."],
    ]),
  mcq(m(GD, "recall-epoch", "recall", 1, 15, "What is an *epoch*?"),
    "One full pass through the training data",
    [
      ["One parameter update", "epoch-is-step", "That's an iteration or step."],
      ["The time to compute one gradient", "epoch-is-time", "An epoch counts passes over the data."],
      ["The final trained model", "epoch-is-model", "It's a unit of training progress."],
    ]),
  mcq(m(GD, "recall-stationary", "recall", 2, 20, "Gradient descent stops making progress where $\\nabla L = \\mathbf{0}$. Such a point is called:"),
    "A stationary (critical) point",
    [
      ["A global minimum, always", "stationary-is-global", "It could be a local minimum, maximum or saddle point."],
      ["A divergence point", "stationary-diverge", "The updates simply become zero."],
      ["An epoch", "stationary-epoch", "An epoch is a pass over the data."],
    ]),
  num(m(GD, "apply-one-step", "apply", 2, 25, "$L(\\theta) = \\theta^{2}$, $\\theta_0 = 4$ and $\\eta = 0.25$. What is $\\theta_1$?"), 2),
  num(m(GD, "apply-gradient-value", "apply", 3, 25, "What is $L'(\\theta)$ for $L(\\theta) = 3\\theta^{2} - 2\\theta$ at $\\theta = 1$?"), 4),
  num(m(GD, "apply-two-steps", "apply", 3, 30, "$L(\\theta) = (\\theta - 2)^{2}$, $\\theta_0 = 0$ and $\\eta = 0.25$. What is $\\theta_2$ after two steps?"), 1.5),
  num(m(GD, "apply-vector-step", "apply", 4, 35, "$L(x, y) = x^{2} + 2y^{2}$, starting at $(2, 1)$ with $\\eta = 0.1$. What is the new $y$ after one step?"), 0.6),
  num(m(GD, "apply-loss-after-step", "apply", 4, 35, "$L(\\theta) = \\theta^{2}$, $\\theta_0 = 1$ and $\\eta = 0.1$. What is $L(\\theta_1)$?"), 0.64),
  num(m(GD, "apply-linear-reg-gradient", "apply", 5, 45, "For $L(w) = \\frac{1}{n}\\sum_i (w x_i - y_i)^{2}$ with data $(1, 2)$ and $(2, 3)$, what is $L'(w)$ at $w = 1$?"), -3),
  num(m(GD, "apply-max-step", "apply", 5, 40, "For $L(\\theta) = \\frac{a}{2}\\theta^{2}$, gradient descent converges if $0 < \\eta < \\frac{2}{a}$. With $a = 8$, what is the largest stable learning rate (the boundary)?"), 0.25),
  mcq(m(GD, "apply-oscillation", "apply", 5, 40, "Iterates on $L(\\theta) = \\theta^{2}$ go $1, -0.8, 0.64, -0.512, \\ldots$. What does this indicate?"),
    "The learning rate is large enough to overshoot each step, though still small enough to converge",
    [
      ["The learning rate is too small", "osc-too-small", "A too-small step creeps toward $0$ without changing sign."],
      ["The method is diverging", "osc-diverging", "The magnitudes shrink by $0.8$ each step."],
      ["The gradient is wrong", "osc-wrong-gradient", "This is classic overshooting with a correct gradient."],
    ]),
  short(m(GD, "explain-feature-scaling", "explain", 6, 120, "Why does gradient descent converge slowly when one feature is measured in thousands and another in fractions?"),
    [
      ["ill-conditioned", "The loss surface becomes elongated (ill-conditioned): steep along one direction, flat along the other", 2, true],
      ["zigzag", "A step size small enough for the steep direction makes progress in the flat direction very slow, causing zig-zagging", 2, true],
    ]),
  short(m(GD, "explain-saddle", "explain", 6, 120, "What is a saddle point, and why are saddle points rather than poor local minima often the main obstacle in high-dimensional optimisation?"),
    [
      ["definition", "A critical point that is a minimum along some directions and a maximum along others", 2, true],
      ["high-dim", "In high dimensions, critical points are far more likely to have some descending direction, so saddles dominate and slow gradient descent", 2, true],
    ]),
  mcq(m(GD, "explain-stopping", "explain", 6, 50, "Which is a common practical stopping rule for gradient descent?"),
    "Stop when validation loss hasn't improved for several epochs (early stopping)",
    [
      ["Stop when training loss reaches exactly $0$", "stop-zero", "That rarely happens and often means overfitting."],
      ["Stop after exactly one epoch", "stop-one-epoch", "One pass is rarely enough."],
      ["Never stop", "stop-never", "Training must end somewhere."],
    ]),
  num(m(GD, "transfer-contraction", "transfer", 7, 60, "On $L(\\theta) = \\frac{a}{2}\\theta^{2}$, each step multiplies $\\theta$ by $1 - \\eta a$. With $a = 2$ and $\\eta = 0.3$, what is that factor?"), 0.4),
  num(m(GD, "transfer-steps-to-tolerance", "transfer", 7, 60, "The error shrinks by a factor of $0.9$ per step. How many steps are needed to reduce it from $1$ to below $0.01$ (the smallest whole number)?"), 44),
  num(m(GD, "transfer-condition-number", "transfer", 8, 60, "A quadratic has Hessian eigenvalues $0.5$ and $50$. What is its condition number $\\frac{\\lambda_{\\max}}{\\lambda_{\\min}}$?"), 100),
  num(m(GD, "transfer-optimal-rate", "transfer", 8, 75, "For a quadratic with Hessian eigenvalues $\\mu = 1$ and $L = 9$, the best fixed step $\\eta = \\frac{2}{\\mu + L}$ gives contraction factor $\\frac{L - \\mu}{L + \\mu}$. What is that factor?"), 0.8),
  mcq(m(GD, "transfer-newton", "transfer", 8, 60, "Newton's method uses $\\theta \\leftarrow \\theta - \\mathbf{H}^{-1}\\nabla L$. On a quadratic loss, how many steps does it need to reach the minimum?"),
    "One",
    [
      ["The same as gradient descent", "newton-same", "The Hessian rescales the step perfectly for a quadratic."],
      ["Infinitely many", "newton-infinite", "On a quadratic it lands exactly on the minimum."],
      ["As many as the number of parameters", "newton-d-steps", "That's conjugate gradients in exact arithmetic."],
    ]),
  short(m(GD, "transfer-lr-schedule", "transfer", 8, 150, "Explain why many training runs start with a larger learning rate and decay it over time."),
    [
      ["early", "A large rate makes fast progress early and can escape poor regions", 2, true],
      ["late", "A smaller rate later lets the iterates settle into a minimum instead of bouncing around it (especially with noisy gradients)", 2, true],
    ]),
  num(m(GD, "transfer-convex-rate", "transfer", 9, 90, "For $L$-smooth convex $f$ with step $\\frac{1}{L}$, $f(\\theta_t) - f^{*} \\le \\frac{L\\|\\theta_0 - \\theta^{*}\\|^{2}}{2t}$. With $L = 4$ and $\\|\\theta_0 - \\theta^{*}\\| = 5$, how many steps guarantee a gap of at most $0.1$?"), 500),
  mcq(m(GD, "transfer-nonconvex-guarantee", "transfer", 9, 75, "On a smooth non-convex loss, what does gradient descent with a small enough step guarantee?"),
    "Convergence to a stationary point (small gradient), not necessarily a global minimum",
    [
      ["Convergence to the global minimum", "nonconvex-global", "That needs convexity or special structure."],
      ["Nothing at all", "nonconvex-nothing", "It does guarantee the gradient norm goes to zero."],
      ["Convergence in one step", "nonconvex-one-step", "No such guarantee exists."],
    ]),
  short(m(GD, "transfer-gradient-check", "transfer", 9, 150, "Describe how to check that a hand-coded gradient is correct using finite differences, including how to choose the step."),
    [
      ["central-difference", "Compare with $\\frac{L(\\theta + h\\mathbf{e}_i) - L(\\theta - h\\mathbf{e}_i)}{2h}$ for each coordinate", 2, true],
      ["step-and-tolerance", "Use a small $h$ (e.g. $10^{-5}$) and check the relative error is tiny; too small an $h$ suffers rounding error", 2, true],
    ]),
  num(m(GD, "transfer-ill-conditioned-steps", "transfer", 10, 90, "With the best fixed step, gradient descent on a quadratic with condition number $\\kappa = 99$ contracts the error by $\\frac{\\kappa - 1}{\\kappa + 1}$ per step. How many steps does it take to shrink the error by a factor of $10^{6}$ (smallest whole number)?"), 684),
  mcq(m(GD, "transfer-implicit-bias", "transfer", 10, 90, "Gradient descent on underdetermined least squares, started from $\\mathbf{w} = \\mathbf{0}$, converges to which of the infinitely many zero-loss solutions?"),
    "The minimum-norm solution",
    [
      ["A random one", "gd-random-solution", "Starting from zero, the iterates stay in the row space, giving the minimum-norm solution."],
      ["The sparsest one", "gd-sparsest", "That's what $L_1$ regularisation favours."],
      ["The one with largest weights", "gd-largest", "It's the smallest-norm solution."],
    ]),
  short(m(GD, "transfer-batch-vs-full", "transfer", 10, 180, "Full-batch gradient descent on a million examples converges in fewer iterations than stochastic gradient descent but is often slower in wall-clock time. Explain why."),
    [
      ["cost-per-step", "Each full-batch step needs a pass over all $10^{6}$ examples, while an SGD step uses one example or a small batch", 2, true],
      ["progress", "SGD makes many cheap, slightly noisy steps and reaches a good solution after far fewer total gradient computations", 2, true],
    ]),
  num(m(GD, "apply-descent-direction", "apply", 4, 35, "At $(1, 2)$ the gradient of $L$ is $[2, -4]$. What is the directional derivative along $-\\nabla L$, i.e. $-\\|\\nabla L\\|^{2}$?"), -20),
  mcq(m(GD, "recall-gradient-meaning", "recall", 2, 20, "For a loss $L(\\theta)$ with several parameters, what is $\\nabla L$?"),
    "The vector of partial derivatives, pointing in the direction of steepest increase",
    [
      ["The loss value itself", "gradient-is-loss", "It's a vector of derivatives."],
      ["The direction of steepest decrease", "gradient-downhill", "That's $-\\nabla L$."],
      ["The learning rate", "gradient-is-lr", "The learning rate scales the gradient."],
    ]),
  num(m(GD, "transfer-divergence", "transfer", 7, 60, "On $L(\\theta) = \\theta^{2}$ with $\\eta = 1.5$, each step multiplies $\\theta$ by $1 - 2\\eta$. Starting at $\\theta_0 = 1$, what is $\\theta_3$?"), -8),
];

export const mlSixty02Items: Item[] = [...losses, ...crossEntropy, ...argmaxSoftmax, ...gradientDescent];
