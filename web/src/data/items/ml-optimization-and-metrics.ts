import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders } from "./authoring";

/**
 * Machine Learning additions: argmax vs softmax, the four stochastic-gradient-
 * descent concepts, the three confusion-matrix metric concepts, QDA and
 * multidimensional scaling. Eight items per concept, two per cognitive level.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-ml-optimization-metrics",
  tier: "generated",
  title: "Mathlingo authored item (ML optimisation and metrics)",
};

const { mcq, short, num } = makeBuilders(AUTHORED);

// ---------------------------------------------------------------------------
const AS = "argmax-vs-softmax";
const argmaxSoftmax: Item[] = [
  mcq(
    { concept: AS, slug: "recall-outputs", cognitive: "recall", difficulty: -1.0, seconds: 30,
      stem: "What does $\\operatorname{softmax}(z)$ return for a logit vector $z \\in \\mathbb{R}^K$?" },
    "A vector of $K$ positive numbers that sum to $1$",
    [
      ["The index of the largest logit", "softmax-is-argmax", "That is argmax; softmax returns a whole distribution."],
      ["The logits rescaled to lie in $[0, 1]$ by min-max normalisation", "softmax-minmax", "Softmax exponentiates and normalises by the sum; the smallest entry is not mapped to $0$."],
      ["A one-hot vector at the largest logit", "softmax-one-hot", "Softmax is one-hot only in the zero-temperature limit."],
    ],
  ),
  mcq(
    { concept: AS, slug: "recall-shift", cognitive: "recall", difficulty: -0.4, seconds: 40,
      stem: "For a constant $c$, how does $\\operatorname{softmax}(z + c)$ compare with $\\operatorname{softmax}(z)$?" },
    "They are identical — the factor $e^c$ cancels between numerator and denominator",
    [
      ["Every probability is multiplied by $e^c$", "softmax-shift-scales", "The same factor multiplies the normaliser, so it cancels."],
      ["The largest probability grows", "softmax-shift-sharpens", "Only scaling the logits (temperature) changes sharpness; shifting does not."],
      ["They differ unless $c = 0$", "softmax-shift-changes", "Shift invariance holds for every constant $c$."],
    ],
  ),
  num(
    { concept: AS, slug: "apply-compute", cognitive: "apply", difficulty: -0.2, seconds: 60,
      stem: "Compute the first entry of $\\operatorname{softmax}(2, 1, 0)$. Give $3$ decimal places." },
    0.665,
  ),
  num(
    { concept: AS, slug: "apply-gradient", cognitive: "apply", difficulty: 0.3, seconds: 80,
      stem: "Logits $z = (2, 1, 0)$ feed a softmax with cross-entropy loss, and the true class is class $2$. Using $\\partial L/\\partial z_k = \\operatorname{softmax}(z)_k - y_k$, compute $\\partial L / \\partial z_2$. Give $3$ decimal places." },
    -0.755,
  ),
  short(
    { concept: AS, slug: "explain-no-gradient", cognitive: "explain", difficulty: 0.2, seconds: 90,
      stem: "Why can't a network be trained by gradient descent on a loss computed from $\\operatorname{argmax}$ of its logits, and how does softmax fix this?" },
    [
      ["flat", "Argmax is piecewise constant: small changes to the logits don't change the chosen index, so the gradient is zero almost everywhere (and undefined at ties).", 4, true],
      ["smooth", "Softmax is a smooth, differentiable function of every logit, so the loss changes continuously and gradients flow — e.g. $\\operatorname{softmax}(z) - y$ with cross-entropy.", 4, true],
    ],
  ),
  mcq(
    { concept: AS, slug: "explain-temperature-accuracy", cognitive: "explain", difficulty: 0.3, seconds: 45,
      stem: "After training, a classifier's logits are divided by a temperature $T = 2$ before the softmax. What happens to its accuracy?" },
    "Nothing — dividing by $T > 0$ preserves the order of the logits, so the argmax is unchanged",
    [
      ["It falls, because the probabilities become flatter", "temp-lowers-accuracy", "Flatter probabilities change confidence, not the ranking."],
      ["It rises, because the model becomes less overconfident", "temp-raises-accuracy", "Calibration can improve, but predictions are identical."],
      ["It depends on the number of classes", "temp-depends-k", "Order preservation holds for any $K$."],
    ],
  ),
  mcq(
    { concept: AS, slug: "transfer-greedy-decoding", cognitive: "transfer", difficulty: 0.2, seconds: 45,
      stem: "A language model samples each token from $\\operatorname{softmax}(z / T)$. What does sampling become as $T \\to 0^+$?" },
    "Greedy decoding — always choosing the argmax token",
    [
      ["Uniform random sampling over the vocabulary", "temp-zero-uniform", "That is the $T \\to \\infty$ limit."],
      ["Sampling from the unmodified softmax", "temp-zero-unchanged", "That is $T = 1$."],
      ["Undefined, because the logits blow up", "temp-zero-undefined", "The limit of the distribution is well defined: a point mass at the argmax (assuming no ties)."],
    ],
  ),
  short(
    { concept: AS, slug: "transfer-overflow", cognitive: "transfer", difficulty: 0.6, seconds: 100,
      stem: "Computing $\\operatorname{softmax}(1000, 999, 998)$ directly in floating point returns NaN. Explain why, and how every practical implementation avoids it." },
    [
      ["overflow", "$e^{1000}$ overflows to infinity, and $\\infty/\\infty$ is NaN.", 3, true],
      ["fix", "Subtract $\\max_k z_k$ first — computing $\\operatorname{softmax}(0, -1, -2)$ — which is exact by shift invariance and keeps every exponent $\\le 0$.", 4, true],
      ["log", "Mentions computing log-probabilities with log-sum-exp for the loss, for the same reason.", 1],
    ],
  ),
];

// ---------------------------------------------------------------------------
const SGD = "stochastic-gradient-descent";
const sgd: Item[] = [
  mcq(
    { concept: SGD, slug: "recall-unbiased", cognitive: "recall", difficulty: -0.6, seconds: 40,
      stem: "With $L(\\theta) = \\tfrac{1}{n}\\sum_i \\ell_i(\\theta)$ and $i$ drawn uniformly, what is $\\mathbb{E}_i[\\nabla \\ell_i(\\theta)]$?" },
    "$\\nabla L(\\theta)$ — the single-example gradient is an unbiased estimate of the full gradient",
    [
      ["$0$, since the noise averages out", "sgd-expect-zero", "The noise averages to zero; the gradient itself averages to $\\nabla L$."],
      ["$n \\nabla L(\\theta)$", "sgd-expect-sum", "The loss is an average, so the expected per-example gradient equals the average gradient."],
      ["It is biased towards the most recent examples", "sgd-biased", "Uniform sampling makes the estimate unbiased at every step."],
    ],
  ),
  mcq(
    { concept: SGD, slug: "recall-cost", cognitive: "recall", difficulty: -0.8, seconds: 30,
      stem: "For a dataset of $n$ examples, how does the cost of one SGD step compare with one full-batch gradient step?" },
    "SGD costs $O(1)$ example gradients per step; full-batch costs $O(n)$",
    [
      ["They cost the same; SGD just takes smaller steps", "sgd-same-cost", "The saving is in computing the gradient on one example instead of all $n$."],
      ["SGD costs $O(n^2)$ because it samples repeatedly", "sgd-quadratic", "Each step samples one example; there is no quadratic cost."],
      ["SGD costs $O(\\log n)$", "sgd-log-cost", "The per-step cost doesn't depend on $n$ at all."],
    ],
  ),
  num(
    { concept: SGD, slug: "apply-step", cognitive: "apply", difficulty: -0.3, seconds: 60,
      stem: "With $\\ell_i(\\theta) = \\tfrac{1}{2}(\\theta x_i - y_i)^2$, current $\\theta = 0$, sampled example $(x_i, y_i) = (1, 3)$ and step size $\\eta = 0.5$, what is $\\theta$ after one SGD step?" },
    1.5,
  ),
  num(
    { concept: SGD, slug: "apply-variance", cognitive: "apply", difficulty: 0.5, seconds: 100,
      stem: "$\\ell_i(\\theta) = \\tfrac{1}{2}(\\theta - a_i)^2$ with data $a = (1, 2, 6)$. At $\\theta = 0$, a single example is drawn uniformly. What is the variance of the stochastic gradient $\\nabla \\ell_i(0)$? Give $3$ decimal places." },
    4.667,
  ),
  short(
    { concept: SGD, slug: "explain-no-settle", cognitive: "explain", difficulty: 0.4, seconds: 100,
      stem: "Full-batch gradient descent with a small constant step converges to the minimum of a strongly convex loss. Explain why SGD with a constant step does not, and what it does instead." },
    [
      ["noise", "At the minimum $\\nabla L = 0$, but individual $\\nabla \\ell_i$ are generally nonzero, so each SGD step still moves the iterate.", 4, true],
      ["floor", "It fluctuates in a neighbourhood of the minimum whose size scales with the step size (and gradient noise variance).", 3, true],
      ["fix", "Mentions decaying the step size or averaging iterates to converge.", 1],
    ],
  ),
  mcq(
    { concept: SGD, slug: "explain-early-progress", cognitive: "explain", difficulty: 0.3, seconds: 45,
      stem: "Why does SGD often reduce the training loss much faster than full-batch descent early in training, measured per example processed?" },
    "Far from the optimum, the per-example gradients mostly agree, so one example gives nearly the full gradient's direction at a fraction of the cost",
    [
      ["Because stochastic gradients are larger", "sgd-larger-gradients", "Their expectation equals the full gradient; the saving is in cost, not size."],
      ["Because SGD uses second-order information", "sgd-second-order", "SGD uses only first-order gradients."],
      ["Because noise is always helpful for optimisation", "sgd-noise-always-helps", "Near the optimum noise hurts convergence; the early advantage is about cost per useful step."],
    ],
  ),
  short(
    { concept: SGD, slug: "transfer-streaming", cognitive: "transfer", difficulty: 0.5, seconds: 100,
      stem: "A recommendation model receives a continuous stream of new user interactions and must keep up to date. Explain why SGD is a natural fit, and one risk of training this way." },
    [
      ["online", "SGD updates from one (or a few) example(s) at a time, so each new interaction can update the model immediately without revisiting the whole history.", 4, true],
      ["risk", "Names a risk: forgetting older patterns, sensitivity to the recent data distribution / drift, or instability from a step size that is too large.", 3, true],
    ],
  ),
  mcq(
    { concept: SGD, slug: "transfer-flat-minima", cognitive: "transfer", difficulty: 0.8, seconds: 50,
      stem: "Small-batch SGD often finds solutions that generalise better than large-batch training reaching the same training loss. What is the leading explanation?" },
    "Gradient noise makes it hard to stay in sharp minima, biasing SGD towards flatter minima that tend to generalise better",
    [
      ["Small batches see more data per epoch", "sgd-more-data", "Every epoch sees all the data regardless of batch size."],
      ["SGD's gradient estimates are biased towards simpler models", "sgd-bias-simple", "The estimates are unbiased; the effect comes from their noise."],
      ["Small batches always reach a lower training loss", "sgd-lower-loss", "The comparison is at equal training loss; the difference is in generalisation."],
    ],
  ),
];

// ---------------------------------------------------------------------------
const MB = "mini-batch-sgd";
const miniBatch: Item[] = [
  mcq(
    { concept: MB, slug: "recall-variance", cognitive: "recall", difficulty: -0.5, seconds: 40,
      stem: "Averaging the gradients of a mini-batch of $B$ independently sampled examples changes the gradient estimate's variance by what factor?" },
    "It is divided by $B$",
    [
      ["It is divided by $\\sqrt{B}$", "mb-sqrt-variance", "The standard deviation falls by $\\sqrt{B}$; the variance falls by $B$."],
      ["It is divided by $B^2$", "mb-square", "The average of $B$ independent terms has variance $\\sigma^2/B$."],
      ["It is unchanged; only the bias changes", "mb-bias", "Both estimates are unbiased; averaging reduces variance."],
    ],
  ),
  mcq(
    { concept: MB, slug: "recall-epoch", cognitive: "recall", difficulty: -0.9, seconds: 30,
      stem: "What is an epoch in mini-batch training?" },
    "One pass through the whole training set — about $n/B$ steps",
    [
      ["One gradient step", "epoch-is-step", "A step processes one batch; an epoch is many steps."],
      ["One pass through a single mini-batch", "epoch-is-batch", "That is one step."],
      ["The period until the learning rate is decayed", "epoch-is-schedule", "Schedules are often expressed in epochs, but an epoch is a pass through the data."],
    ],
  ),
  num(
    { concept: MB, slug: "apply-steps-per-epoch", cognitive: "apply", difficulty: -0.5, seconds: 40,
      stem: "A training set has $50{,}000$ examples and the batch size is $128$, keeping the final partial batch. How many steps make one epoch?" },
    391,
    0.001,
  ),
  num(
    { concept: MB, slug: "apply-std", cognitive: "apply", difficulty: -0.1, seconds: 45,
      stem: "The per-example gradient of one parameter has standard deviation $2.0$. What is the standard deviation of its mini-batch average with $B = 16$?" },
    0.5,
  ),
  short(
    { concept: MB, slug: "explain-no-free-lunch", cognitive: "explain", difficulty: 0.4, seconds: 100,
      stem: "Doubling the batch size halves the gradient variance. Explain why this is not automatically a win, and when larger batches do help." },
    [
      ["cost", "Each step now costs twice the computation, so noise reduction per example processed is unchanged; the number of epochs to converge need not fall.", 4, true],
      ["helps", "Larger batches help when hardware parallelism makes them nearly free in wall-clock time, or allow a proportionally larger step (below the critical batch size).", 3, true],
    ],
  ),
  mcq(
    { concept: MB, slug: "explain-critical", cognitive: "explain", difficulty: 0.6, seconds: 50,
      stem: "What happens once the batch size exceeds the “critical batch size”?" },
    "Further increases barely reduce the number of steps to reach a given loss, so extra compute per step is mostly wasted",
    [
      ["Training diverges", "mb-critical-diverge", "Large batches don't cause divergence by themselves; they stop paying off."],
      ["The gradient becomes biased", "mb-critical-bias", "The average stays unbiased at every batch size."],
      ["The number of steps needed starts to rise", "mb-critical-more-steps", "Steps plateau; they don't typically increase."],
    ],
  ),
  num(
    { concept: MB, slug: "transfer-linear-scaling", cognitive: "transfer", difficulty: 0.3, seconds: 50,
      stem: "A model trains well with batch size $256$ and learning rate $0.1$. Using the linear scaling rule, what learning rate should be used with batch size $2048$?" },
    0.8,
  ),
  short(
    { concept: MB, slug: "transfer-batchnorm", cognitive: "transfer", difficulty: 0.7, seconds: 100,
      stem: "A team reduces the batch size to $2$ to fit a huge model into GPU memory, and a network with batch normalisation suddenly trains badly. Explain why, and suggest a fix." },
    [
      ["stats", "Batch norm estimates each feature's mean and variance from the batch; with $2$ examples these estimates are extremely noisy, and the train-time and test-time normalisations disagree.", 4, true],
      ["fix", "Suggests group or layer normalisation, gradient accumulation with synchronised/virtual batch statistics, or freezing batch-norm statistics.", 3, true],
    ],
  ),
];

// ---------------------------------------------------------------------------
const SS = "sgd-step-sizes";
const stepSizes: Item[] = [
  mcq(
    { concept: SS, slug: "recall-conditions", cognitive: "recall", difficulty: -0.3, seconds: 40,
      stem: "What are the Robbins–Monro conditions on the step sizes $\\eta_t$ of SGD?" },
    "$\\sum_t \\eta_t = \\infty$ and $\\sum_t \\eta_t^2 < \\infty$",
    [
      ["$\\sum_t \\eta_t < \\infty$ and $\\sum_t \\eta_t^2 = \\infty$", "rm-swapped", "The conditions are swapped: finite total step would stall the iterate."],
      ["$\\eta_t$ constant and small", "rm-constant", "A constant step fails $\\sum_t \\eta_t^2 < \\infty$, leaving a noise floor."],
      ["$\\eta_t \\to 0$", "rm-just-vanish", "Vanishing is necessary but not sufficient; $1/t^2$ vanishes yet the steps sum to a finite distance."],
    ],
  ),
  mcq(
    { concept: SS, slug: "recall-which-schedule", cognitive: "recall", difficulty: -0.1, seconds: 40,
      stem: "Which schedule satisfies both Robbins–Monro conditions?" },
    "$\\eta_t = c/t$",
    [
      ["$\\eta_t = c/\\sqrt{t}$", "rm-sqrt", "$\\sum 1/t$ diverges, so $\\sum \\eta_t^2 = c^2 \\sum 1/t = \\infty$."],
      ["$\\eta_t = c/t^2$", "rm-t-squared", "$\\sum 1/t^2$ is finite, so the iterate can only travel a bounded distance."],
      ["$\\eta_t = c$", "rm-constant-schedule", "A constant step's squares sum to infinity."],
    ],
  ),
  mcq(
    { concept: SS, slug: "apply-too-fast", cognitive: "apply", difficulty: 0.2, seconds: 50,
      stem: "SGD is started far from the optimum with $\\eta_t = 1/t^2$. What goes wrong?" },
    "The total distance the iterates can travel, $\\sum_t \\eta_t \\|g_t\\|$, may be too small to reach the optimum, so SGD can stall short of it",
    [
      ["The iterates diverge", "rm-fast-diverge", "Rapidly shrinking steps are the opposite of divergence."],
      ["The noise floor stays large", "rm-fast-noise", "Shrinking steps remove the noise floor; the problem is stalling."],
      ["Nothing — any decreasing schedule converges", "rm-any-decreasing", "Decreasing is not enough; the steps must also sum to infinity."],
    ],
  ),
  num(
    { concept: SS, slug: "apply-floor", cognitive: "apply", difficulty: 0.3, seconds: 50,
      stem: "For a strongly convex loss, SGD with constant step $\\eta$ settles at an expected squared distance from the optimum proportional to $\\eta$. At $\\eta = 0.1$ that distance is $0.02$. What is it at $\\eta = 0.05$?" },
    0.01,
  ),
  short(
    { concept: SS, slug: "explain-conditions", cognitive: "explain", difficulty: 0.6, seconds: 120,
      stem: "Explain in words why each Robbins–Monro condition is needed for SGD to converge." },
    [
      ["sum", "$\\sum \\eta_t = \\infty$: the steps must be able to carry the iterate any distance, so it cannot stall before reaching the optimum from any start.", 4, true],
      ["sum-sq", "$\\sum \\eta_t^2 < \\infty$: the accumulated gradient noise has variance proportional to $\\sum \\eta_t^2$, which must stay finite for the noise to die out.", 4, true],
    ],
  ),
  mcq(
    { concept: SS, slug: "explain-averaging", cognitive: "explain", difficulty: 0.6, seconds: 45,
      stem: "What does Polyak–Ruppert averaging — reporting $\\bar{\\theta}_T = \\tfrac{1}{T}\\sum_t \\theta_t$ — accomplish?" },
    "It averages away the noise in the iterates, allowing larger steps such as $c/\\sqrt{t}$ while achieving optimal asymptotic rates",
    [
      ["It makes the gradient estimates unbiased", "avg-unbiased", "The gradients are already unbiased; averaging acts on the iterates."],
      ["It speeds up the early phase of training", "avg-early", "Averaging early iterates drags the estimate towards the starting point; its benefit is asymptotic."],
      ["It replaces the need for a learning rate", "avg-no-lr", "A step-size schedule is still required."],
    ],
  ),
  short(
    { concept: SS, slug: "transfer-step-decay", cognitive: "transfer", difficulty: 0.6, seconds: 100,
      stem: "Training curves for image classifiers often show the loss plateauing, then dropping sharply the moment the learning rate is divided by $10$. Explain the drop using the idea of an SGD noise floor." },
    [
      ["plateau", "At the plateau, SGD with the current step is bouncing around within its noise floor, which is proportional to the step size.", 4, true],
      ["drop", "Dividing the step by $10$ shrinks the floor, so the iterate quickly settles closer to the minimum and the loss drops.", 3, true],
      ["tradeoff", "Decaying earlier would have slowed the approach; the schedule trades speed first for precision later.", 1],
    ],
  ),
  mcq(
    { concept: SS, slug: "transfer-rate", cognitive: "transfer", difficulty: 0.7, seconds: 45,
      stem: "For a strongly convex loss, what expected suboptimality rate does SGD with $\\eta_t \\propto 1/t$ achieve after $T$ steps?" },
    "$O(1/T)$",
    [
      ["Linear, $O(\\rho^T)$ for some $\\rho < 1$", "rate-linear", "That is full-batch gradient descent's rate; gradient noise prevents SGD from matching it."],
      ["$O(1/\\sqrt{T})$", "rate-sqrt", "That is the rate for merely convex (not strongly convex) losses."],
      ["$O(1/T^2)$", "rate-nesterov", "That is accelerated full-batch descent on smooth convex problems."],
    ],
  ),
];

// ---------------------------------------------------------------------------
const MO = "momentum";
const momentum: Item[] = [
  mcq(
    { concept: MO, slug: "recall-update", cognitive: "recall", difficulty: -0.5, seconds: 40,
      stem: "Which is the heavy-ball momentum update, with velocity $v$ and momentum coefficient $\\beta$?" },
    "$v_{t+1} = \\beta v_t + \\nabla L(\\theta_t)$, then $\\theta_{t+1} = \\theta_t - \\eta v_{t+1}$",
    [
      ["$\\theta_{t+1} = \\theta_t - \\eta \\beta \\nabla L(\\theta_t)$", "momentum-scaled-lr", "That just rescales the learning rate; it has no memory of past gradients."],
      ["$v_{t+1} = \\beta v_t + \\nabla L(\\theta_t)^2$", "momentum-squared", "Averaging squared gradients is what RMSProp and Adam do for step-size scaling."],
      ["$\\theta_{t+1} = \\beta\\theta_t - \\eta \\nabla L(\\theta_t)$", "momentum-weight-decay", "Shrinking $\\theta$ itself is weight decay, not momentum."],
    ],
  ),
  mcq(
    { concept: MO, slug: "recall-memory", cognitive: "recall", difficulty: -0.2, seconds: 35,
      stem: "With $\\beta = 0.9$, roughly how many recent gradients does the momentum average effectively remember?" },
    "About $1/(1 - \\beta) = 10$",
    [
      ["About $0.9$", "momentum-memory-beta", "$\\beta$ is the decay factor, not the memory length."],
      ["About $90$", "momentum-memory-ninety", "That is the memory for $\\beta \\approx 0.99$."],
      ["All past gradients equally", "momentum-memory-all", "Older gradients are down-weighted geometrically by $\\beta^{t - s}$."],
    ],
  ),
  num(
    { concept: MO, slug: "apply-steady-step", cognitive: "apply", difficulty: 0.1, seconds: 60,
      stem: "The gradient is constant at $g = 2$, with $\\beta = 0.9$ and $\\eta = 0.01$. Once the velocity has converged, how far does $\\theta$ move per step?" },
    0.2,
  ),
  num(
    { concept: MO, slug: "apply-two-steps", cognitive: "apply", difficulty: -0.2, seconds: 45,
      stem: "Starting from $v_0 = 0$ with $\\beta = 0.9$, the first two gradients are $g_1 = 1$ and $g_2 = 1$. Using $v_t = \\beta v_{t-1} + g_t$, what is $v_2$?" },
    1.9,
  ),
  short(
    { concept: MO, slug: "explain-ravine", cognitive: "explain", difficulty: 0.5, seconds: 100,
      stem: "Explain why momentum speeds up gradient descent in a long, narrow valley of the loss surface." },
    [
      ["across", "Across the valley the gradient flips sign from step to step, so those components cancel in the running average and the zig-zag is damped.", 4, true],
      ["along", "Along the valley the gradient points the same way every step, so those components accumulate and the effective step grows (up to $\\eta/(1 - \\beta)$).", 4, true],
    ],
  ),
  mcq(
    { concept: MO, slug: "explain-nesterov", cognitive: "explain", difficulty: 0.5, seconds: 45,
      stem: "How does Nesterov momentum differ from heavy-ball momentum?" },
    "It evaluates the gradient at the look-ahead point $\\theta_t - \\eta\\beta v_t$ rather than at $\\theta_t$",
    [
      ["It uses a larger $\\beta$", "nesterov-beta", "Both methods use the same $\\beta$; the difference is where the gradient is taken."],
      ["It averages squared gradients", "nesterov-squared", "That describes RMSProp or Adam."],
      ["It resets the velocity every epoch", "nesterov-reset", "Neither method resets the velocity by design."],
    ],
  ),
  mcq(
    { concept: MO, slug: "transfer-oscillation", cognitive: "transfer", difficulty: 0.4, seconds: 45,
      stem: "With $\\beta = 0.99$ and a learning rate that worked well without momentum, the loss starts oscillating wildly. What is the most likely cause?" },
    "The effective step $\\eta/(1 - \\beta)$ is now $100$ times larger, so the iterate overshoots the minimum",
    [
      ["Momentum makes the gradient biased", "momentum-biased", "The running average is not the issue; the effective step size is."],
      ["$\\beta$ is too small to damp oscillations", "momentum-too-small", "The problem is $\\beta$ being too large for this learning rate."],
      ["Momentum is incompatible with mini-batches", "momentum-minibatch", "Momentum is routinely used with mini-batch SGD."],
    ],
  ),
  short(
    { concept: MO, slug: "transfer-retune", cognitive: "transfer", difficulty: 0.6, seconds: 100,
      stem: "You increase momentum from $\\beta = 0.9$ to $\\beta = 0.99$ to smooth noisy gradients. How should you change the learning rate to keep the effective step size roughly the same, and why?" },
    [
      ["reduce", "Divide the learning rate by about $10$.", 3, true],
      ["why", "The effective step is $\\eta/(1 - \\beta)$, which goes from $10\\eta$ to $100\\eta$; dividing $\\eta$ by $10$ keeps it at $10\\eta_{\\text{old}}$.", 4, true],
      ["tradeoff", "The longer memory then averages over about $100$ gradients, reducing noise but reacting more slowly to changes in the landscape.", 1],
    ],
  ),
];

// ---------------------------------------------------------------------------
const SE = "sensitivity-and-specificity";
const sensSpec: Item[] = [
  mcq(
    { concept: SE, slug: "recall-sensitivity", cognitive: "recall", difficulty: -1.0, seconds: 30,
      stem: "In terms of confusion-matrix counts, sensitivity is:" },
    "$\\dfrac{TP}{TP + FN}$",
    [
      ["$\\dfrac{TP}{TP + FP}$", "sens-is-ppv", "That is precision (PPV): it conditions on the prediction, not the true class."],
      ["$\\dfrac{TN}{TN + FP}$", "sens-is-spec", "That is specificity, the rate for true negatives."],
      ["$\\dfrac{TP + TN}{TP + TN + FP + FN}$", "sens-is-accuracy", "That is accuracy."],
    ],
  ),
  mcq(
    { concept: SE, slug: "recall-specificity", cognitive: "recall", difficulty: -0.8, seconds: 30,
      stem: "Specificity is which probability?" },
    "$P(\\text{test negative} \\mid \\text{truly negative})$",
    [
      ["$P(\\text{truly negative} \\mid \\text{test negative})$", "spec-is-npv", "That is the negative predictive value; the conditioning is reversed."],
      ["$P(\\text{test positive} \\mid \\text{truly negative})$", "spec-is-fpr", "That is the false positive rate, $1 -$ specificity."],
      ["$P(\\text{test negative})$", "spec-marginal", "Specificity conditions on the true class."],
    ],
  ),
  num(
    { concept: SE, slug: "apply-sensitivity", cognitive: "apply", difficulty: -0.6, seconds: 40,
      stem: "A test flags $72$ of $80$ people who have a condition. What is its sensitivity?" },
    0.9,
  ),
  num(
    { concept: SE, slug: "apply-specificity", cognitive: "apply", difficulty: -0.5, seconds: 40,
      stem: "Of $300$ people without a condition, a test flags $15$. What is its specificity?" },
    0.95,
  ),
  short(
    { concept: SE, slug: "explain-prevalence", cognitive: "explain", difficulty: 0.3, seconds: 90,
      stem: "Explain why sensitivity and specificity do not depend on the prevalence of the condition in the population tested." },
    [
      ["conditioning", "Each conditions on the true class — sensitivity uses only actual positives and specificity only actual negatives — so the mix of positives and negatives does not enter.", 4, true],
      ["property", "They describe how the test behaves on each kind of case, a property of the test (assuming the case types are similar across populations).", 2],
      ["contrast", "Contrasts with PPV/NPV, which condition on the result and do change with prevalence.", 2],
    ],
  ),
  mcq(
    { concept: SE, slug: "explain-threshold", cognitive: "explain", difficulty: 0.0, seconds: 40,
      stem: "A classifier flags cases whose score exceeds a threshold. What happens when the threshold is lowered?" },
    "Sensitivity rises and specificity falls",
    [
      ["Both rise", "threshold-both-up", "Flagging more cases catches more positives but also more negatives."],
      ["Sensitivity falls and specificity rises", "threshold-reversed", "That is what raising the threshold does."],
      ["Neither changes; they are properties of the model", "threshold-fixed", "They are properties of the model at a given threshold."],
    ],
  ),
  mcq(
    { concept: SE, slug: "transfer-screening", cognitive: "transfer", difficulty: 0.2, seconds: 45,
      stem: "A first-stage screening test for a serious but treatable disease will be followed by a confirmatory test for anyone who screens positive. Which property matters most for the screening test?" },
    "High sensitivity, so that a negative screen reliably rules the disease out",
    [
      ["High specificity, to avoid false alarms", "screen-specificity", "False alarms are caught by the confirmatory test; missed cases at screening are lost."],
      ["High accuracy", "screen-accuracy", "With a rare disease, accuracy is dominated by negatives and can be high even when many cases are missed."],
      ["High PPV", "screen-ppv", "PPV at screening is usually low for rare diseases; that is acceptable when positives are confirmed."],
    ],
  ),
  short(
    { concept: SE, slug: "transfer-hypothesis-testing", cognitive: "transfer", difficulty: 0.6, seconds: 100,
      stem: "Treat “has the condition” as the alternative hypothesis and “test positive” as rejecting the null. Translate sensitivity and specificity into hypothesis-testing terms." },
    [
      ["alpha", "$1 -$ specificity, the false positive rate, is the Type I error rate $\\alpha$.", 4, true],
      ["power", "Sensitivity is the power $1 - \\beta$; $1 -$ sensitivity is the Type II error rate.", 4, true],
    ],
  ),
];

// ---------------------------------------------------------------------------
const PV = "predictive-values";
const predictive: Item[] = [
  mcq(
    { concept: PV, slug: "recall-ppv", cognitive: "recall", difficulty: -0.8, seconds: 30,
      stem: "The positive predictive value of a test is:" },
    "$\\dfrac{TP}{TP + FP}$ — the fraction of positive results that are truly positive",
    [
      ["$\\dfrac{TP}{TP + FN}$", "ppv-is-sens", "That is sensitivity, which conditions on the true class."],
      ["$\\dfrac{TN}{TN + FN}$", "ppv-is-npv", "That is the negative predictive value."],
      ["$\\dfrac{FP}{FP + TN}$", "ppv-is-fpr", "That is the false positive rate."],
    ],
  ),
  mcq(
    { concept: PV, slug: "recall-prevalence", cognitive: "recall", difficulty: -0.4, seconds: 35,
      stem: "Which of these change when the same test is used in a population with a different prevalence?" },
    "PPV and NPV",
    [
      ["Sensitivity and specificity", "pv-sens-spec-change", "These condition on the true class and are, ideally, prevalence-free."],
      ["Only sensitivity", "pv-only-sens", "Sensitivity conditions on actual positives and does not depend on how many there are."],
      ["None of them", "pv-none", "Predictive values condition on the result, whose composition depends on prevalence."],
    ],
  ),
  num(
    { concept: PV, slug: "apply-rare-disease", cognitive: "apply", difficulty: 0.2, seconds: 80,
      stem: "A test has sensitivity $0.99$ and specificity $0.99$. The prevalence is $1\\%$. What is the PPV?" },
    0.5,
  ),
  num(
    { concept: PV, slug: "apply-ppv", cognitive: "apply", difficulty: 0.3, seconds: 80,
      stem: "A test has sensitivity $0.9$ and specificity $0.95$, and the prevalence is $10\\%$. Compute the PPV to $3$ decimal places." },
    0.667,
  ),
  short(
    { concept: PV, slug: "explain-base-rate", cognitive: "explain", difficulty: 0.4, seconds: 100,
      stem: "A highly accurate test for a rare disease can still have a low PPV. Explain why, using a population of $10{,}000$ people." },
    [
      ["counts", "With a rare disease, the healthy vastly outnumber the sick, so even a small false positive rate produces as many false positives as there are true positives (or more).", 4, true],
      ["bayes", "PPV is $P(\\text{disease} \\mid +)$, which by Bayes' rule depends on the prior (prevalence), not just on $P(+ \\mid \\text{disease})$.", 3, true],
      ["numbers", "Uses concrete counts from the population to illustrate.", 1],
    ],
  ),
  mcq(
    { concept: PV, slug: "explain-direction", cognitive: "explain", difficulty: 0.2, seconds: 40,
      stem: "As the prevalence of a condition falls, with sensitivity and specificity fixed, what happens to PPV and NPV?" },
    "PPV falls and NPV rises",
    [
      ["PPV rises and NPV falls", "pv-direction-reversed", "Fewer true positives means a positive is less likely to be real."],
      ["Both fall", "pv-both-fall", "Negatives become more trustworthy as the condition becomes rarer."],
      ["Neither changes", "pv-fixed", "Predictive values depend on prevalence through Bayes' rule."],
    ],
  ),
  num(
    { concept: PV, slug: "transfer-npv", cognitive: "transfer", difficulty: 0.4, seconds: 80,
      stem: "A test has sensitivity $0.9$ and specificity $0.95$, and the prevalence is $10\\%$. Compute the NPV to $3$ decimal places." },
    0.988,
    0.002,
  ),
  short(
    { concept: PV, slug: "transfer-case-control", cognitive: "transfer", difficulty: 0.7, seconds: 120,
      stem: "A diagnostic study recruited $500$ patients with a disease and $500$ without, and reports a PPV of $0.95$. A clinic where $2\\%$ of patients have the disease wants to use the test. Explain why the reported PPV is misleading for the clinic, and what they should compute instead." },
    [
      ["prevalence", "The study's prevalence was artificially $50\\%$; PPV depends on prevalence, and at $2\\%$ it will be much lower.", 4, true],
      ["recompute", "Take the study's sensitivity and specificity (which transfer) and recompute PPV with Bayes' rule at $\\pi = 0.02$.", 3, true],
    ],
  ),
];

// ---------------------------------------------------------------------------
const PR = "precision-recall-f1";
const precisionRecall: Item[] = [
  mcq(
    { concept: PR, slug: "recall-names", cognitive: "recall", difficulty: -0.8, seconds: 30,
      stem: "In diagnostic-testing terms, precision and recall are:" },
    "Precision is PPV; recall is sensitivity",
    [
      ["Precision is sensitivity; recall is PPV", "pr-swapped", "Precision conditions on predicted positives (PPV); recall on actual positives (sensitivity)."],
      ["Precision is specificity; recall is sensitivity", "pr-precision-spec", "Specificity concerns true negatives, which precision never uses."],
      ["Precision is accuracy; recall is NPV", "pr-accuracy", "Neither precision nor recall uses true negatives."],
    ],
  ),
  mcq(
    { concept: PR, slug: "recall-f1", cognitive: "recall", difficulty: -0.5, seconds: 35,
      stem: "$F_1$ is which combination of precision $P$ and recall $R$?" },
    "Their harmonic mean, $\\dfrac{2PR}{P + R}$",
    [
      ["Their arithmetic mean, $\\dfrac{P + R}{2}$", "f1-arithmetic", "The arithmetic mean lets a high value mask a very low one; $F_1$ does not."],
      ["Their geometric mean, $\\sqrt{PR}$", "f1-geometric", "The geometric mean is the Fowlkes–Mallows index, not $F_1$."],
      ["Their product, $PR$", "f1-product", "The product is not normalised to equal $P$ when $P = R$."],
    ],
  ),
  num(
    { concept: PR, slug: "apply-f1", cognitive: "apply", difficulty: -0.1, seconds: 60,
      stem: "A classifier has $TP = 30$, $FP = 20$, $FN = 10$. Compute its $F_1$ score to $3$ decimal places." },
    0.667,
  ),
  num(
    { concept: PR, slug: "apply-lopsided", cognitive: "apply", difficulty: 0.0, seconds: 45,
      stem: "A classifier has precision $1.0$ and recall $0.1$. Compute its $F_1$ score to $3$ decimal places." },
    0.182,
  ),
  short(
    { concept: PR, slug: "explain-no-tn", cognitive: "explain", difficulty: 0.4, seconds: 100,
      stem: "Precision, recall and $F_1$ never use the true-negative count. Explain why that makes them preferable to accuracy for detecting rare events." },
    [
      ["accuracy", "With rare positives, accuracy is dominated by the many easy true negatives: predicting “negative” for everything scores very high accuracy while finding nothing.", 4, true],
      ["focus", "Precision and recall measure performance on the positive class only, so they are unaffected by the (large, uninteresting) number of true negatives.", 3, true],
    ],
  ),
  mcq(
    { concept: PR, slug: "explain-harmonic", cognitive: "explain", difficulty: 0.2, seconds: 45,
      stem: "Why does $F_1$ use the harmonic mean rather than the arithmetic mean of precision and recall?" },
    "The harmonic mean is dominated by the smaller value, so a model cannot score well by maximising one while neglecting the other",
    [
      ["The harmonic mean is always larger, rewarding good models", "f1-harmonic-larger", "The harmonic mean is never larger than the arithmetic mean."],
      ["Precision and recall are rates of the same denominator", "f1-same-denominator", "They have different denominators ($TP + FP$ and $TP + FN$)."],
      ["It makes $F_1$ symmetric in $TP$ and $TN$", "f1-symmetric-tn", "$F_1$ does not use $TN$ at all."],
    ],
  ),
  mcq(
    { concept: PR, slug: "transfer-macro", cognitive: "transfer", difficulty: 0.4, seconds: 50,
      stem: "A $5$-class text classifier is evaluated on data where one class makes up $80\\%$ of examples, and performance on the rare classes matters most. Which summary should be reported?" },
    "Macro-averaged $F_1$, which weights every class equally",
    [
      ["Micro-averaged $F_1$", "micro-for-rare", "Micro-averaging pools counts and is dominated by the $80\\%$ class; for single-label problems it equals accuracy."],
      ["Accuracy", "accuracy-for-rare", "Accuracy is dominated by the majority class."],
      ["Support-weighted $F_1$", "weighted-for-rare", "Weighting by support again emphasises the majority class."],
    ],
  ),
  num(
    { concept: PR, slug: "transfer-f2", cognitive: "transfer", difficulty: 0.5, seconds: 70,
      stem: "For a screening application recall is weighted more heavily using $F_2 = \\dfrac{5PR}{4P + R}$. Compute $F_2$ for precision $0.5$ and recall $0.8$, to $3$ decimal places." },
    0.714,
  ),
];

// ---------------------------------------------------------------------------
const Q = "qda";
const qdaItems: Item[] = [
  mcq(
    { concept: Q, slug: "recall-assumption", cognitive: "recall", difficulty: -0.7, seconds: 35,
      stem: "What does quadratic discriminant analysis assume about the class-conditional distributions?" },
    "Each class is Gaussian with its own mean and its own covariance matrix",
    [
      ["Each class is Gaussian with its own mean and a shared covariance", "qda-shared", "That is LDA's assumption."],
      ["Features are independent within each class", "qda-naive", "That is naive Bayes."],
      ["Nothing — QDA is non-parametric", "qda-nonparametric", "QDA is a parametric Gaussian model."],
    ],
  ),
  mcq(
    { concept: Q, slug: "recall-boundary", cognitive: "recall", difficulty: -0.4, seconds: 35,
      stem: "What shape are QDA's decision boundaries in feature space?" },
    "Quadratic surfaces — e.g. ellipses, parabolas or hyperbolas in two dimensions",
    [
      ["Hyperplanes", "qda-linear", "Linear boundaries arise when covariances are shared (LDA)."],
      ["Axis-aligned rectangles", "qda-tree", "Rectangular regions come from decision trees."],
      ["Arbitrary shapes, as in nearest neighbours", "qda-knn", "QDA's boundaries are constrained to be quadratic."],
    ],
  ),
  num(
    { concept: Q, slug: "apply-params", cognitive: "apply", difficulty: -0.1, seconds: 50,
      stem: "With $p = 10$ features and $K = 3$ classes, how many covariance parameters does QDA estimate in total?" },
    165,
    0.001,
  ),
  mcq(
    { concept: Q, slug: "apply-reduces", cognitive: "apply", difficulty: 0.0, seconds: 40,
      stem: "Under what condition does QDA's classifier reduce to LDA's?" },
    "When all the class covariance matrices are equal",
    [
      ["When the class means are equal", "qda-equal-means", "Equal means make the classes indistinguishable by location, not linear."],
      ["When the priors are equal", "qda-equal-priors", "Priors shift the boundary but do not change its shape."],
      ["When there are only two classes", "qda-two-classes", "Two-class QDA still has a quadratic boundary."],
    ],
  ),
  short(
    { concept: Q, slug: "explain-quadratic", cognitive: "explain", difficulty: 0.6, seconds: 120,
      stem: "Starting from the Gaussian discriminant $\\delta_k(x) = -\\tfrac{1}{2}\\log|\\Sigma_k| - \\tfrac{1}{2}(x - \\mu_k)^\\top \\Sigma_k^{-1}(x - \\mu_k) + \\log \\pi_k$, explain why QDA's boundary is quadratic but LDA's is linear." },
    [
      ["expand", "Expanding gives a term $-\\tfrac{1}{2}x^\\top \\Sigma_k^{-1} x$ that is quadratic in $x$.", 3, true],
      ["lda", "With a shared $\\Sigma$, that term and $\\log|\\Sigma|$ are identical across classes and cancel in $\\delta_j - \\delta_k$, leaving a linear function.", 3, true],
      ["qda", "With different $\\Sigma_k$ they do not cancel, so $\\delta_j(x) = \\delta_k(x)$ is a quadratic equation.", 2],
    ],
  ),
  mcq(
    { concept: Q, slug: "explain-small-class", cognitive: "explain", difficulty: 0.4, seconds: 45,
      stem: "A class has $15$ training examples and there are $20$ features. What goes wrong when QDA is fit?" },
    "That class's sample covariance is singular (rank at most $14$), so it cannot be inverted",
    [
      ["The class mean cannot be estimated", "qda-mean", "A mean needs only one observation."],
      ["The class prior becomes zero", "qda-prior", "The prior is $15/n$, which is positive."],
      ["Nothing — QDA handles any sample size", "qda-any-n", "Each covariance needs more than $p$ observations to be invertible."],
    ],
  ),
  short(
    { concept: Q, slug: "transfer-choose", cognitive: "transfer", difficulty: 0.6, seconds: 120,
      stem: "You have $30$ labelled examples per class, $3$ classes and $20$ features. Scatterplots suggest the classes have somewhat different spreads. Would you choose LDA or QDA? Justify with the bias-variance trade-off." },
    [
      ["params", "QDA needs $3 \\times 210 = 630$ covariance parameters from $30$ points per class, versus $210$ pooled for LDA; its estimates would be very noisy (and near-singular).", 4, true],
      ["choice", "Prefer LDA (or regularised DA): its bias from assuming equal covariances is likely smaller than QDA's variance at this sample size.", 3, true],
      ["validate", "Mentions cross-validating the choice or shrinking QDA's covariances towards the pooled one.", 1],
    ],
  ),
  mcq(
    { concept: Q, slug: "transfer-rda", cognitive: "transfer", difficulty: 0.7, seconds: 50,
      stem: "Regularised discriminant analysis uses $\\hat{\\Sigma}_k(\\alpha) = \\alpha\\hat{\\Sigma}_k + (1 - \\alpha)\\hat{\\Sigma}_{\\text{pooled}}$. What are the models at $\\alpha = 1$ and $\\alpha = 0$?" },
    "$\\alpha = 1$ gives QDA; $\\alpha = 0$ gives LDA",
    [
      ["$\\alpha = 1$ gives LDA; $\\alpha = 0$ gives QDA", "rda-swapped", "At $\\alpha = 1$ each class keeps its own covariance, which is QDA."],
      ["$\\alpha = 1$ gives naive Bayes; $\\alpha = 0$ gives LDA", "rda-naive", "Naive Bayes corresponds to diagonal covariances, a different shrinkage target."],
      ["Both give QDA; $\\alpha$ only rescales", "rda-rescale", "$\\alpha$ interpolates between class-specific and pooled covariances."],
    ],
  ),
];

// ---------------------------------------------------------------------------
const MDS = "multidimensional-scaling";
const mds: Item[] = [
  mcq(
    { concept: MDS, slug: "recall-input", cognitive: "recall", difficulty: -0.8, seconds: 30,
      stem: "What is the input to multidimensional scaling?" },
    "A matrix of pairwise distances or dissimilarities between the objects",
    [
      ["A data matrix of features, which MDS then standardises", "mds-needs-features", "MDS needs only distances; that is what distinguishes it from PCA."],
      ["Class labels for each object", "mds-labels", "MDS is unsupervised."],
      ["A covariance matrix of the features", "mds-covariance", "PCA starts from the covariance; MDS starts from distances between objects."],
    ],
  ),
  mcq(
    { concept: MDS, slug: "recall-double-centre", cognitive: "recall", difficulty: -0.2, seconds: 40,
      stem: "Classical MDS converts the matrix of squared distances $D^{(2)}$ into a Gram matrix by which operation?" },
    "$B = -\\tfrac{1}{2} J D^{(2)} J$, with $J = I - \\tfrac{1}{n}\\mathbf{1}\\mathbf{1}^\\top$",
    [
      ["$B = D^{(2)}$ itself", "mds-no-centring", "Squared distances are not inner products; centring is needed to remove the squared-norm terms."],
      ["$B = (D^{(2)})^{-1}$", "mds-inverse", "Inversion is not part of classical MDS."],
      ["$B = D^{(2)} - \\operatorname{mean}(D^{(2)})$", "mds-single-centre", "Subtracting one overall mean doesn't remove both row and column norm terms."],
    ],
  ),
  num(
    { concept: MDS, slug: "apply-variance-explained", cognitive: "apply", difficulty: 0.0, seconds: 50,
      stem: "The eigenvalues of the double-centred matrix $B$ are $8, 2, 0.5, 0$. What fraction of the total is captured by a $2$-dimensional classical MDS embedding? Give $3$ decimal places." },
    0.952,
  ),
  mcq(
    { concept: MDS, slug: "apply-coordinates", cognitive: "apply", difficulty: 0.2, seconds: 40,
      stem: "With $B = V\\Lambda V^\\top$, what are the $k$-dimensional classical MDS coordinates?" },
    "$V_k \\Lambda_k^{1/2}$ — the top $k$ eigenvectors scaled by the square roots of their eigenvalues",
    [
      ["$V_k$", "mds-unscaled", "Unscaled eigenvectors all have unit length and lose the spread along each axis."],
      ["$V_k \\Lambda_k$", "mds-lambda", "Scaling by $\\Lambda$ rather than $\\Lambda^{1/2}$ gives $\\hat{X}\\hat{X}^\\top = V\\Lambda^2 V^\\top \\ne B$."],
      ["The bottom $k$ eigenvectors", "mds-bottom", "The largest eigenvalues carry the most distance structure."],
    ],
  ),
  short(
    { concept: MDS, slug: "explain-equals-pca", cognitive: "explain", difficulty: 0.7, seconds: 120,
      stem: "Explain why classical MDS applied to the Euclidean distances between the rows of a centred data matrix $X$ recovers the PCA scores." },
    [
      ["gram", "Double centring the squared Euclidean distances recovers the Gram matrix $B = XX^\\top$.", 3, true],
      ["svd", "With $X = U S W^\\top$, $XX^\\top = U S^2 U^\\top$, so MDS coordinates $U_k S_k$ equal $X W_k$, the PCA scores.", 4, true],
      ["eig", "The nonzero eigenvalues of $XX^\\top$ and $X^\\top X$ coincide.", 1],
    ],
  ),
  mcq(
    { concept: MDS, slug: "explain-uniqueness", cognitive: "explain", difficulty: 0.3, seconds: 40,
      stem: "Why is an MDS configuration only determined up to rotation, reflection and translation?" },
    "Those transformations preserve every pairwise distance, and distances are all MDS sees",
    [
      ["Because the eigen-solver is numerically unstable", "mds-numerical", "It is a genuine non-identifiability, not a numerical issue."],
      ["Because MDS standardises the data first", "mds-standardise", "MDS doesn't standardise; the ambiguity comes from distance invariance."],
      ["It isn't — the configuration is unique", "mds-unique", "Any rigid motion of the points leaves the distances, and so the fit, unchanged."],
    ],
  ),
  mcq(
    { concept: MDS, slug: "transfer-survey", cognitive: "transfer", difficulty: 0.4, seconds: 45,
      stem: "Survey respondents rank how similar pairs of brands feel, but the numbers have no meaningful scale — only their order matters. Which method fits?" },
    "Non-metric (Kruskal) MDS, which preserves only the rank order of the dissimilarities",
    [
      ["Classical MDS", "mds-classical-for-ordinal", "Classical MDS treats the numbers as Euclidean distances, which ordinal ratings are not."],
      ["PCA on the rating matrix", "mds-pca-ordinal", "PCA needs feature vectors and treats the numbers as metric."],
      ["$k$-means clustering", "mds-kmeans", "Clustering groups the brands but doesn't produce a map preserving similarity order."],
    ],
  ),
  short(
    { concept: MDS, slug: "transfer-negative-eigen", cognitive: "transfer", difficulty: 0.8, seconds: 120,
      stem: "You run classical MDS on travel times between cities and find that $B$ has several large negative eigenvalues. What does this mean, and what can you do?" },
    [
      ["non-euclidean", "Travel times aren't Euclidean distances (roads, one-way systems, triangle-inequality violations), so $B$ is not a valid Gram matrix and is not positive semidefinite.", 4, true],
      ["remedy", "Keep only the positive eigenvalues and treat the result as an approximation, or use metric/non-metric stress-based MDS, which doesn't require Euclidean input.", 3, true],
    ],
  ),
];

export const mlOptimizationAndMetricsItems: Item[] = [
  ...argmaxSoftmax,
  ...sgd,
  ...miniBatch,
  ...stepSizes,
  ...momentum,
  ...sensSpec,
  ...predictive,
  ...precisionRecall,
  ...qdaItems,
  ...mds,
];
