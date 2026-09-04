import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 3 — the error decomposition that explains why models
 * fail, and the optimiser and loss that most of them are trained with. Mirrors
 * `assessments/ml-03-bias-variance-and-optimization.md`.
 */

const biasVarianceTradeoff: WikiArticle = {
  conceptId: "bias-variance-tradeoff",
  summary:
    "Expected prediction error decomposes exactly into three pieces: bias² (error from the model " +
    "being too rigid to represent the truth), variance (error from the fit swinging with the " +
    "particular training sample), and irreducible noise. Flexibility lowers bias and raises " +
    "variance, so the best model is almost never the most accurate one on its training data.",

  sections: [
    {
      heading: "The decomposition",
      blocks: [
        {
          kind: "formula",
          latex: "E[(y − f̂(x))²] = (Bias[f̂(x)])² + Var[f̂(x)] + σ²",
          caption: "Expected squared error at a point x, over the randomness in the training sample",
        },
        {
          kind: "definitions",
          items: [
            { term: "Bias", description: "E[f̂(x)] − f(x). How far the average fit, over all possible training sets, sits from the truth. A straight line fitted to a curve is biased everywhere, no matter how much data you give it." },
            { term: "Variance", description: "E[(f̂(x) − E[f̂(x)])²]. How much the fit moves when you redraw the training set. A depth-30 tree can change completely if ten rows change." },
            { term: "σ² (irreducible error)", description: "Noise in y itself. No model, however good, gets below this — and a model reporting error below σ² on held-out data has a leak." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "All three terms are non-negative, and that is the whole argument",
          text:
            "Because bias² and variance are each non-negative, driving one to zero cannot be optimal " +
            "unless the other happens to be small there too. A perfectly unbiased model class that " +
            "is wildly variable can easily have higher total error than a mildly biased, stable one. " +
            "This is the mathematical reason regularisation — deliberately adding bias — improves " +
            "test error.",
        },
      ],
    },

    {
      heading: "Reading the U-shaped curve",
      blocks: [
        {
          kind: "table",
          headers: ["Model complexity", "Bias", "Variance", "Training error", "Test error"],
          rows: [
            ["Too low (underfit)", "High", "Low", "High", "High"],
            ["About right", "Moderate", "Moderate", "Moderate", "Minimum"],
            ["Too high (overfit)", "Low", "High", "Near zero", "High again"],
          ],
        },
        {
          kind: "prose",
          text:
            "Training error decreases monotonically with flexibility; test error falls, bottoms out, " +
            "and rises. The gap between the two curves is essentially the variance term. This is why " +
            "\"my training accuracy is 100%\" is a neutral fact at best and a warning at worst.",
        },
        {
          kind: "example",
          title: "Where the terms come from concretely",
          problem: "Fit a degree-1 and a degree-15 polynomial to 20 noisy points from a smooth curve, many times over fresh samples.",
          steps: [
            "Degree 1: every fit is nearly the same line — small variance — but no line matches a curve, so bias is large and systematic.",
            "Degree 15: each fit chases its own sample's noise, so the fits differ wildly from each other — large variance — while their average tracks the truth well, so bias is small.",
            "Total error is minimised by some intermediate degree, typically 3–5 here.",
          ],
          answer:
            "Neither extreme wins. The optimum trades a little bias for a large reduction in variance, which is exactly what ridge, pruning, and early stopping all do by different mechanisms.",
        },
      ],
    },

    {
      heading: "Levers on each term",
      blocks: [
        {
          kind: "list",
          items: [
            "More data reduces variance and leaves bias alone — which is why a high-variance model is the one worth collecting more data for, and a high-bias model is not.",
            "Regularisation (ridge, lasso, dropout, weight decay) adds bias to buy a larger reduction in variance.",
            "Bagging averages many high-variance, low-bias models: variance falls roughly with the number of decorrelated members, bias is unchanged.",
            "Boosting builds up complexity from a high-bias base learner, reducing bias while managing variance through shrinkage.",
            "Feature engineering that encodes a real structural fact reduces bias without paying in variance — the only genuinely free move available.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The clean decomposition is specific to squared error",
          text:
            "Bias and variance in this additive form come from the squared-error expectation. For " +
            "0–1 classification loss there is no equally clean decomposition — analogues exist but " +
            "they do not simply add, and a small bias reduction can even leave the decision boundary " +
            "unchanged. The intuition transfers; the algebra does not.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Double descent complicates the picture, without overturning it",
          text:
            "Very heavily over-parameterised models — modern deep networks — often show test error " +
            "falling again past the interpolation threshold, a second descent beyond the classical " +
            "U. The decomposition is still exact; what changes is that implicit regularisation from " +
            "the optimiser keeps variance from exploding in that regime.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§7.3, The Bias–Variance Decomposition" },
    { source: "James et al., An Introduction to Statistical Learning", locator: "§2.2.2, The Bias-Variance Trade-Off" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-03-bias-variance-and-optimization.md" },
  ],
};

const overfittingUnderfitting: WikiArticle = {
  conceptId: "overfitting-underfitting",
  summary:
    "Overfitting is learning the training sample's noise as though it were signal; underfitting is " +
    "failing to learn the signal at all. They are the two failure modes the bias–variance " +
    "decomposition predicts, and the diagnostic that separates them is the gap between training and " +
    "validation error — not either number alone.",

  sections: [
    {
      heading: "Diagnosis from two numbers",
      blocks: [
        {
          kind: "table",
          headers: ["Training error", "Validation error", "Diagnosis", "What to do"],
          rows: [
            ["High", "High (similar)", "Underfitting — high bias", "More flexibility, better features, train longer"],
            ["Low", "High (large gap)", "Overfitting — high variance", "Regularise, simplify, get more data"],
            ["Low", "Low (small gap)", "Well fitted", "Stop; check for leakage if it looks too good"],
            ["High", "Low", "Something is wrong", "Usually a broken split, a leaky feature, or regularisation applied only at train time"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The gap is the diagnostic, not the level",
          text:
            "A model at 30% training error and 32% validation error is underfitting even though the " +
            "gap is tiny. A model at 1% and 9% is overfitting even though both numbers look good. " +
            "Read the level to judge bias and the gap to judge variance — that is the decomposition " +
            "made operational.",
        },
      ],
    },

    {
      heading: "Why overfitting happens",
      blocks: [
        {
          kind: "prose",
          text:
            "A sufficiently flexible model can interpolate any finite dataset, noise included. Since " +
            "the training objective cannot distinguish noise from signal — both are just numbers " +
            "that reduce the loss — flexibility spent on noise is indistinguishable, from the " +
            "optimiser's point of view, from flexibility spent well. Only data the model has not " +
            "seen reveals the difference.",
        },
        {
          kind: "example",
          title: "Interpolation is not understanding",
          problem: "A depth-unlimited decision tree on 1,000 training rows achieves 100% training accuracy. What has it learned?",
          steps: [
            "It has grown leaves until each contains rows of a single class — in the limit, one row per leaf.",
            "A leaf holding one row encodes that row, not a rule.",
            "On a new row that falls into that leaf, the prediction is whatever that single, possibly mislabelled, training row said.",
          ],
          answer:
            "A lookup table with a tree-shaped index. Perfect training accuracy here is evidence of memorisation and carries no information about generalisation.",
        },
      ],
    },

    {
      heading: "The standard remedies",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "More data", description: "The most reliable fix for overfitting, and the only one with no downside. It does nothing for underfitting." },
            { term: "Regularisation", description: "L1/L2 penalties, dropout, weight decay: shrink the effective capacity without changing the architecture." },
            { term: "Early stopping", description: "Halt training when validation error turns up. Cheap, and mathematically close to an L2 penalty for gradient descent on linear models." },
            { term: "Structural simplification", description: "Shallower trees, fewer features, fewer parameters — reduce capacity directly." },
            { term: "Data augmentation", description: "Manufacture new training examples via label-preserving transformations. Adds data where collection is impossible." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Adding data does not cure underfitting",
          text:
            "If the model class cannot represent the pattern, ten times as many examples produce the " +
            "same wrong fit with tighter confidence intervals. A straight line fitted to a parabola " +
            "converges — to the best straight line. Diagnose which failure you have before choosing " +
            "the remedy, because the remedies are not interchangeable and one of them is expensive.",
        },
      ],
    },
  ],

  references: [
    { source: "James et al., An Introduction to Statistical Learning", locator: "§2.2, Assessing Model Accuracy" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "Ch. 5.2 and Ch. 7, Regularization" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-03-bias-variance-and-optimization.md" },
  ],
};

const gradientDescent: WikiArticle = {
  conceptId: "gradient-descent",
  summary:
    "Gradient descent minimises a differentiable loss by repeatedly stepping in the direction of " +
    "steepest decrease. It is the workhorse behind nearly every model trained on more parameters " +
    "than a closed form can handle, and almost everything that goes wrong in training is a " +
    "statement about its step size or its curvature.",

  sections: [
    {
      heading: "The update rule",
      blocks: [
        {
          kind: "formula",
          latex: "θ_{t+1} = θ_t − η ∇L(θ_t)",
          caption: "Step against the gradient; η is the learning rate",
        },
        {
          kind: "prose",
          text:
            "The gradient ∇L points in the direction of steepest *increase*, so the minus sign is " +
            "what makes this descent rather than ascent. Its magnitude carries information too: the " +
            "step is naturally large where the surface is steep and small near a flat optimum, which " +
            "is why the algorithm slows down as it converges without being told to.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Steepest descent is steepest *locally*",
          text:
            "The negative gradient is the best direction for an infinitesimal step, not for the step " +
            "you actually take. On an elongated valley the steepest direction points across the " +
            "valley rather than along it, so the iterates zig-zag and progress is slow. That is " +
            "conditioning, and it is what momentum and second-order methods exist to fix.",
        },
      ],
    },

    {
      heading: "Choosing the learning rate",
      blocks: [
        {
          kind: "table",
          headers: ["η", "Behaviour", "Symptom in the loss curve"],
          rows: [
            ["Far too large", "Diverges", "Loss becomes NaN or grows without bound"],
            ["Too large", "Oscillates across the valley", "Loss bounces, never settles"],
            ["About right", "Steady decrease", "Smooth decline, then a plateau"],
            ["Too small", "Converges, eventually", "Nearly flat decline; wall-clock cost balloons"],
          ],
        },
        {
          kind: "prose",
          text:
            "For a convex quadratic the stable range is η < 2/L, where L is the largest eigenvalue " +
            "of the Hessian — the curvature in the steepest direction. That single fact explains the " +
            "whole table: exceed it and each step overshoots by more than it gained, so the " +
            "iteration amplifies rather than contracts.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Feature scaling is a learning-rate fix in disguise",
          text:
            "If one feature ranges over [0, 1] and another over [0, 100000], the loss surface is a " +
            "long narrow canyon and the usable learning rate is set by the steepest direction while " +
            "progress is needed in the shallowest. Standardising features makes the surface closer " +
            "to spherical, and the same optimiser converges in a fraction of the steps. This is why " +
            "scaling matters for gradient-based methods and not at all for trees.",
        },
      ],
    },

    {
      heading: "Batch, stochastic, and mini-batch",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Batch GD", description: "Uses all n examples per step. Exact gradient, smooth path, one update per full pass — infeasible when n is large." },
            { term: "Stochastic GD", description: "One example per step. Very noisy gradient, very cheap step; the noise itself helps escape shallow local minima and saddle points." },
            { term: "Mini-batch GD", description: "A batch of 32–512. The standard: enough averaging to be stable, small enough to be fast, and shaped for hardware parallelism." },
          ],
        },
        {
          kind: "prose",
          text:
            "Momentum accumulates an exponentially weighted average of past gradients, damping the " +
            "zig-zag across a valley while accumulating speed along it. Adam adds per-parameter " +
            "step sizes scaled by a running estimate of squared gradients, which makes it robust to " +
            "badly scaled features at the cost of an extra pair of hyperparameters.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Convexity is what makes convergence a guarantee",
          text:
            "On a convex loss — linear regression, logistic regression, SVMs — every local minimum " +
            "is global, so a well-chosen step size converges to the answer. Neural network losses " +
            "are not convex, so gradient descent finds *a* minimum, not *the* minimum. In practice " +
            "the many minima of a large network tend to be of similar quality, which is why the " +
            "distinction troubles theory more than it troubles practice.",
        },
      ],
    },
  ],

  references: [
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "Ch. 4 and Ch. 8, Optimization for Training Deep Models" },
    { source: "Deisenroth, Faisal & Ong, Mathematics for Machine Learning", locator: "Ch. 7, Continuous Optimization" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§9.3, Gradient Descent Method" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-03-bias-variance-and-optimization.md" },
  ],
};

const crossEntropyLoss: WikiArticle = {
  conceptId: "cross-entropy-loss",
  summary:
    "Cross-entropy is the standard loss for classification with probabilistic outputs. It is the " +
    "negative log-likelihood of the observed labels under the model's predicted distribution, which " +
    "means minimising it is maximum likelihood estimation — the classification counterpart of what " +
    "squared error does for Gaussian regression.",

  sections: [
    {
      heading: "The formula and where it comes from",
      blocks: [
        {
          kind: "formula",
          latex: "L = −Σₖ yₖ log p̂ₖ      binary:  L = −[y log p̂ + (1 − y) log(1 − p̂)]",
          caption: "Cross-entropy between the one-hot truth and the predicted distribution",
        },
        {
          kind: "prose",
          text:
            "With a one-hot label only one term survives: the loss is −log of the probability the " +
            "model assigned to the correct class. Everything about its behaviour follows from that. " +
            "Assign 0.9 to the truth and pay 0.105; assign 0.5 and pay 0.693; assign 0.01 and pay " +
            "4.6. The penalty grows without bound as the model becomes confidently wrong.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is maximum likelihood, written as a loss",
          text:
            "The likelihood of the labels is Πᵢ p̂ᵢ(yᵢ). Taking a negative logarithm turns the " +
            "product into a sum and the maximisation into a minimisation — that sum is exactly " +
            "cross-entropy. This is why it is not one loss among many for classification but the " +
            "canonical one: it inherits maximum likelihood's consistency and efficiency.",
        },
      ],
    },

    {
      heading: "Why not squared error on the probabilities?",
      blocks: [
        {
          kind: "example",
          title: "How each loss punishes a confident mistake",
          problem: "The true class has y = 1 and the model predicts p̂ = 0.01. Compare squared error with cross-entropy.",
          steps: [
            "Squared error: (1 − 0.01)² = 0.98 — bounded above by 1, no matter how wrong.",
            "Cross-entropy: −log(0.01) = 4.61, and it → ∞ as p̂ → 0.",
            "At p̂ = 0.5 the two are 0.25 and 0.693.",
          ],
          answer:
            "Squared error treats a confidently wrong prediction as barely worse than an uncertain one; cross-entropy makes it catastrophic. That is the behaviour you want from a probabilistic classifier.",
        },
        {
          kind: "prose",
          text:
            "There is an optimisation reason as well. Paired with a sigmoid output, squared error " +
            "has a gradient that includes the sigmoid's derivative, which is nearly zero when the " +
            "model is confidently wrong — the worst case is where learning stalls. With " +
            "cross-entropy those terms cancel exactly, leaving a gradient proportional to (p̂ − y): " +
            "the more wrong the prediction, the larger the update. The pairing is deliberate.",
        },
        {
          kind: "formula",
          latex: "∂L/∂z = p̂ − y      (sigmoid or softmax output, cross-entropy loss)",
          caption: "The cancellation that makes this pairing the standard one",
        },
      ],
    },

    {
      heading: "Practical notes",
      blocks: [
        {
          kind: "list",
          items: [
            "Minimising cross-entropy is equivalent to minimising the KL divergence from the true label distribution to the predicted one, since the labels' own entropy is a constant.",
            "Never take log of a raw probability that could be 0. Frameworks combine softmax and log in one numerically stable operator (log-softmax, `from_logits=True`) for exactly this reason.",
            "Cross-entropy rewards calibration, not just ranking — unlike AUC, it can be improved by making already-correct predictions more confident.",
            "Class weights or focal loss adjust the per-class contribution when the label distribution is heavily skewed.",
            "Label smoothing replaces the one-hot target with (1 − ε) on the truth and ε/(K−1) elsewhere, capping how confident the optimiser is allowed to push the model.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Low cross-entropy and high accuracy are not the same goal",
          text:
            "Accuracy depends only on which class scores highest; cross-entropy depends on the whole " +
            "probability vector. A model can improve its accuracy while its cross-entropy worsens " +
            "(it fixes a few borderline cases but grows overconfident elsewhere). Decide which one " +
            "the application needs — a downstream expected-cost calculation needs the probabilities; " +
            "a top-1 decision does not.",
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§4.3.2 and §5.2, Cross-Entropy Error Functions" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§6.2.1, Learning Conditional Distributions with Maximum Likelihood" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§6.2, Entropy and Cross-Entropy" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-03-bias-variance-and-optimization.md" },
  ],
};

export const ml03BiasVarianceAndOptimization: WikiArticle[] = [
  biasVarianceTradeoff,
  overfittingUnderfitting,
  gradientDescent,
  crossEntropyLoss,
];
