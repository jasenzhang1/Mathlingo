import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 19 — additions filed across three existing chapters:
 * argmax vs softmax and the stochastic-gradient-descent section (Bias-Variance
 * & Optimization), the confusion-matrix metrics (Classification Metrics), and
 * QDA and multidimensional scaling beside LDA and PCA.
 */

const argmaxVsSoftmax: WikiArticle = {
  conceptId: "argmax-vs-softmax",
  summary:
    "A classifier produces a vector of scores (logits) $z \\in \\mathbb{R}^K$. Argmax turns it into a hard decision — the " +
    "index of the largest score. Softmax turns it into a probability distribution. They agree on which class is on top, " +
    "but only softmax is differentiable, which is why models train through softmax and cross-entropy and predict with " +
    "argmax. Temperature interpolates between the two.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{argmax}(z) = \\arg\\max_k z_k, \\qquad \\operatorname{softmax}(z)_k = \\frac{e^{z_k}}{\\sum_{j=1}^{K} e^{z_j}}",
        },
        {
          kind: "list",
          items: [
            "Softmax outputs are positive and sum to $1$; it preserves the ranking of the logits, so $\\operatorname{argmax}(\\operatorname{softmax}(z)) = \\operatorname{argmax}(z)$.",
            "Softmax is shift-invariant: $\\operatorname{softmax}(z + c) = \\operatorname{softmax}(z)$. Implementations subtract $\\max_k z_k$ before exponentiating so $e^{z_k}$ cannot overflow.",
            "For $K = 2$, softmax reduces to the sigmoid of the logit difference: $\\operatorname{softmax}(z)_1 = \\sigma(z_1 - z_2)$.",
          ],
        },
      ],
    },
    {
      heading: "Why training needs softmax",
      blocks: [
        {
          kind: "prose",
          text:
            "Argmax is piecewise constant: nudging a logit almost never changes the winning index, so its gradient is zero " +
            "almost everywhere and undefined at ties. Gradient descent gets no signal from it. Softmax is smooth, and paired " +
            "with cross-entropy it gives the cleanest gradient in machine learning: $\\partial L / \\partial z_k = \\operatorname{softmax}(z)_k - y_k$ " +
            "— predicted minus true probability.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Softmax outputs are not automatically calibrated",
          text:
            "Softmax guarantees a valid distribution, not a truthful one. Deep networks trained to low loss are often " +
            "overconfident; temperature scaling on a validation set is the usual fix.",
        },
      ],
    },
    {
      heading: "Temperature",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{softmax}(z / T)_k = \\frac{e^{z_k / T}}{\\sum_j e^{z_j / T}}",
          caption: "$T \\to 0^+$: a one-hot vector at the argmax. $T \\to \\infty$: the uniform distribution",
        },
        {
          kind: "list",
          items: [
            "Low temperature sharpens the distribution (greedier sampling from a language model); high temperature flattens it (more diverse samples).",
            "Temperature never changes the argmax, so it leaves accuracy untouched — which is why it can be tuned after training for calibration.",
            "Softmax is the gradient of $\\operatorname{logsumexp}$, a smooth approximation to $\\max$; the name “soft-argmax” would be more accurate.",
          ],
        },
        {
          kind: "example",
          title: "Softmax and temperature",
          problem: "Logits $z = (2, 1, 0)$. Compute $\\operatorname{softmax}(z)$ and $\\operatorname{softmax}(z / 0.5)$.",
          steps: [
            "$e^2, e^1, e^0 = 7.389, 2.718, 1$; the sum is $11.107$, so $\\operatorname{softmax}(z) \\approx (0.665, 0.245, 0.090)$.",
            "At $T = 0.5$ the logits become $(4, 2, 0)$: $e^4, e^2, e^0 = 54.60, 7.389, 1$, sum $62.99$, giving $\\approx (0.867, 0.117, 0.016)$.",
          ],
          answer: "Both put class $1$ on top; lowering the temperature moves it from $0.665$ towards $1$.",
        },
      ],
    },
  ],
  references: [
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§6.2.2.3" },
    { source: "Guo et al., On Calibration of Modern Neural Networks (ICML, 2017)", locator: "§4" },
  ],
};

const stochasticGradientDescent: WikiArticle = {
  conceptId: "stochastic-gradient-descent",
  summary:
    "When the loss is an average over $n$ training examples, the full gradient costs $n$ gradient evaluations per step. " +
    "Stochastic gradient descent instead steps along the gradient of a single randomly chosen example. That gradient is " +
    "an unbiased estimate of the full one, so on average SGD goes the right way — at a tiny fraction of the cost, and " +
    "with noise that has to be managed.",
  sections: [
    {
      heading: "The update",
      blocks: [
        {
          kind: "formula",
          latex: "L(\\theta) = \\frac{1}{n}\\sum_{i=1}^{n} \\ell_i(\\theta), \\qquad \\theta_{t+1} = \\theta_t - \\eta_t \\nabla \\ell_{i_t}(\\theta_t), \\quad i_t \\sim \\text{Uniform}\\{1, \\ldots, n\\}",
        },
        {
          kind: "list",
          items: [
            "Unbiased: $\\mathbb{E}_{i}[\\nabla \\ell_i(\\theta)] = \\nabla L(\\theta)$.",
            "Noisy: the gradient noise has covariance $\\tfrac{1}{n}\\sum_i (\\nabla \\ell_i - \\nabla L)(\\nabla \\ell_i - \\nabla L)^\\top$, which does not vanish at the minimum unless every example is fit perfectly.",
            "Cheap: each step costs $O(1)$ examples rather than $O(n)$, so SGD makes $n$ updates in the time full-batch descent makes one.",
          ],
        },
      ],
    },
    {
      heading: "Why noise is tolerable — even useful",
      blocks: [
        {
          kind: "prose",
          text:
            "Early in training, all examples agree roughly on the direction downhill, so one example's gradient is nearly as " +
            "good as all of them: SGD makes fast progress while full-batch descent is still computing its first step. Near a " +
            "minimum the examples disagree and the noise dominates, so SGD bounces around the optimum instead of settling " +
            "— the reason step sizes must shrink (see SGD Step Sizes & Convergence).",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Implicit regularisation",
          text:
            "In deep learning the noise also seems to help generalisation: it makes it hard to stay in sharp, narrow minima, " +
            "biasing SGD towards flat ones that tend to generalise better. This is an empirical observation with partial theory, " +
            "not a theorem.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "One SGD step for least squares",
          problem:
            "$\\ell_i(\\theta) = \\tfrac{1}{2}(\\theta x_i - y_i)^2$ with current $\\theta = 1$, sampled example $(x_i, y_i) = (2, 5)$, and $\\eta = 0.1$. Find the next $\\theta$.",
          steps: [
            "$\\nabla \\ell_i = (\\theta x_i - y_i)x_i = (2 - 5)(2) = -6$.",
            "$\\theta \\leftarrow 1 - 0.1 \\times (-6) = 1.6$.",
          ],
          answer: "$\\theta = 1.6$ — pulled towards $y_i/x_i = 2.5$, the value that fits this one example.",
        },
      ],
    },
  ],
  references: [
    { source: "Bottou, Curtis & Nocedal, Optimization Methods for Large-Scale Machine Learning (SIAM Review, 2018)", locator: "§3–4" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§8.3.1" },
  ],
};

const miniBatchSgd: WikiArticle = {
  conceptId: "mini-batch-sgd",
  summary:
    "Mini-batch SGD averages the gradients of $B$ examples per step. The estimate stays unbiased and its variance falls " +
    "by a factor of $B$ — so its standard deviation falls only by $\\sqrt{B}$. Batching also lets hardware process examples " +
    "in parallel, which is usually the real reason batches exist.",
  sections: [
    {
      heading: "Variance and cost",
      blocks: [
        {
          kind: "formula",
          latex: "g_B = \\frac{1}{B}\\sum_{i \\in \\mathcal{B}} \\nabla \\ell_i(\\theta), \\qquad \\mathbb{E}[g_B] = \\nabla L(\\theta), \\qquad \\operatorname{Cov}(g_B) \\approx \\frac{1}{B}\\Sigma",
          caption: "$\\Sigma$ is the per-example gradient covariance; exact for sampling with replacement",
        },
        {
          kind: "list",
          items: [
            "Doubling $B$ halves the gradient variance but doubles the computation per step — the noise-per-example trade is the same.",
            "An epoch is one pass through the data: $n/B$ steps. Shuffling each epoch and sampling without replacement usually beats sampling with replacement in practice.",
            "On a GPU, a batch of $64$ can cost about the same wall-clock time as a batch of $1$, so moderate batches are nearly free variance reduction.",
          ],
        },
      ],
    },
    {
      heading: "Large batches and the learning rate",
      blocks: [
        {
          kind: "prose",
          text:
            "Beyond a critical batch size, the gradient estimate is already accurate and further averaging buys little: the " +
            "number of steps to reach a given loss stops falling. Below it, the linear scaling rule — multiply the learning rate " +
            "by $k$ when the batch grows by $k$ — keeps training dynamics roughly unchanged, usually combined with a warmup.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Batch statistics couple examples",
          text:
            "With batch normalisation the examples in a batch are no longer processed independently; very small batches make " +
            "the normalisation statistics noisy. Changing $B$ therefore changes more than the gradient variance.",
        },
      ],
    },
  ],
  references: [
    { source: "Goyal et al., Accurate, Large Minibatch SGD (2017)", locator: "§2" },
    { source: "McCandlish et al., An Empirical Model of Large-Batch Training (2018)", locator: "§2" },
  ],
};

const sgdStepSizes: WikiArticle = {
  conceptId: "sgd-step-sizes",
  summary:
    "With a constant step size, SGD converges only to a neighbourhood of the minimum whose size is proportional to the " +
    "step: the gradient noise keeps kicking it out. To converge exactly, steps must shrink — but not so fast that SGD " +
    "stalls before it arrives. The Robbins–Monro conditions make that precise.",
  sections: [
    {
      heading: "The Robbins–Monro conditions",
      blocks: [
        {
          kind: "formula",
          latex: "\\sum_{t=1}^{\\infty} \\eta_t = \\infty, \\qquad \\sum_{t=1}^{\\infty} \\eta_t^2 < \\infty",
        },
        {
          kind: "list",
          items: [
            "The first says the steps can carry the iterate any distance: it never stalls short of the optimum.",
            "The second says the accumulated noise, whose variance scales with $\\sum \\eta_t^2$, stays finite.",
            "$\\eta_t = c/t$ satisfies both. $\\eta_t = c/\\sqrt{t}$ fails the second (though with iterate averaging it is often preferred); $\\eta_t = c/t^2$ fails the first.",
          ],
        },
      ],
    },
    {
      heading: "Constant steps and the noise floor",
      blocks: [
        {
          kind: "prose",
          text:
            "For a strongly convex loss with constant step $\\eta$, SGD approaches the optimum geometrically until the expected " +
            "squared distance is $O(\\eta \\sigma^2)$, where $\\sigma^2$ is the gradient noise variance, and then fluctuates " +
            "there. Halving the step halves the floor but slows the approach. The common recipe — train at a constant step, " +
            "then decay it — takes the fast approach first and the low floor second.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Polyak–Ruppert averaging", description: "Report $\\bar{\\theta}_T = \\tfrac{1}{T}\\sum_t \\theta_t$ instead of the last iterate. Averaging cancels the noise, allowing larger steps such as $c/\\sqrt{t}$ with optimal asymptotic rates." },
            { term: "Rates", description: "Convex, Lipschitz: $O(1/\\sqrt{T})$ in expected suboptimality. Strongly convex with $\\eta_t \\propto 1/t$: $O(1/T)$. Neither matches full-batch descent's linear rate — the price of noise." },
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Robbins & Monro, A Stochastic Approximation Method (Annals of Mathematical Statistics, 1951)", locator: "full paper" },
    { source: "Bottou, Curtis & Nocedal, Optimization Methods for Large-Scale Machine Learning (SIAM Review, 2018)", locator: "§4.2–4.3" },
  ],
};

const momentum: WikiArticle = {
  conceptId: "momentum",
  summary:
    "Momentum replaces the raw gradient with an exponentially weighted average of recent gradients. In a long, narrow " +
    "valley the components along the valley agree from step to step and accumulate, while the components across it flip " +
    "sign and cancel — so the iterate speeds up where progress is consistent and stops zig-zagging where it is not.",
  sections: [
    {
      heading: "Heavy-ball momentum",
      blocks: [
        {
          kind: "formula",
          latex: "v_{t+1} = \\beta v_t + \\nabla L(\\theta_t), \\qquad \\theta_{t+1} = \\theta_t - \\eta v_{t+1}",
          caption: "$\\beta \\in [0, 1)$, typically $0.9$; $\\beta = 0$ recovers plain (stochastic) gradient descent",
        },
        {
          kind: "list",
          items: [
            "Unrolled, $v_{t+1} = \\sum_{s \\le t} \\beta^{t - s} \\nabla L(\\theta_s)$: a geometric average with an effective memory of about $1/(1 - \\beta)$ steps.",
            "With a constant gradient $g$, the velocity approaches $g/(1 - \\beta)$, so the effective step is $\\eta/(1 - \\beta)$ — ten times larger at $\\beta = 0.9$.",
            "Averaging also smooths the noise of stochastic gradients.",
          ],
        },
      ],
    },
    {
      heading: "Nesterov momentum",
      blocks: [
        {
          kind: "formula",
          latex: "v_{t+1} = \\beta v_t + \\nabla L(\\theta_t - \\eta \\beta v_t), \\qquad \\theta_{t+1} = \\theta_t - \\eta v_{t+1}",
        },
        {
          kind: "prose",
          text:
            "Nesterov evaluates the gradient at the look-ahead point the momentum is about to carry you to, so it can brake " +
            "before overshooting. On smooth convex problems it achieves the optimal $O(1/T^2)$ rate for first-order methods, " +
            "versus $O(1/T)$ for gradient descent; on an ill-conditioned quadratic its iteration count scales with $\\sqrt{\\kappa}$ " +
            "rather than $\\kappa$, the condition number.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Too much momentum oscillates",
          text:
            "With $\\beta$ close to $1$ and a large step, the iterate overshoots the minimum and circles it. Momentum and the " +
            "learning rate must be tuned together, since the effective step is $\\eta/(1 - \\beta)$.",
        },
      ],
    },
  ],
  references: [
    { source: "Polyak, Some methods of speeding up the convergence of iteration methods (1964)", locator: "§2" },
    { source: "Sutskever et al., On the importance of initialization and momentum in deep learning (ICML, 2013)", locator: "§2" },
  ],
};

const sensitivitySpecificity: WikiArticle = {
  conceptId: "sensitivity-and-specificity",
  summary:
    "Sensitivity and specificity describe what a test or classifier does to each true class separately. Sensitivity is " +
    "the fraction of actual positives it flags; specificity is the fraction of actual negatives it clears. Because each " +
    "conditions on the true class, neither depends on how common positives are — they are properties of the test.",
  sections: [
    {
      heading: "Definitions from the confusion matrix",
      blocks: [
        {
          kind: "table",
          headers: ["", "Predicted positive", "Predicted negative"],
          rows: [
            ["Actually positive", "TP", "FN"],
            ["Actually negative", "FP", "TN"],
          ],
        },
        {
          kind: "formula",
          latex: "\\text{Sensitivity} = \\text{TPR} = \\frac{TP}{TP + FN}, \\qquad \\text{Specificity} = \\text{TNR} = \\frac{TN}{TN + FP}",
        },
        {
          kind: "list",
          items: [
            "As probabilities: sensitivity $= P(\\hat{Y} = 1 \\mid Y = 1)$, specificity $= P(\\hat{Y} = 0 \\mid Y = 0)$.",
            "Complements: false negative rate $= 1 -$ sensitivity; false positive rate $= 1 -$ specificity.",
            "In testing language, $1 -$ specificity is the Type I error rate $\\alpha$ and sensitivity is the power $1 - \\beta$.",
          ],
        },
      ],
    },
    {
      heading: "The threshold trade-off",
      blocks: [
        {
          kind: "prose",
          text:
            "A classifier that outputs a score becomes a test once you pick a threshold. Lowering it flags more cases: " +
            "sensitivity rises and specificity falls. Plotting sensitivity against $1 -$ specificity over all thresholds gives " +
            "the ROC curve. A test that flags everyone has sensitivity $1$ and specificity $0$ — so either number alone is " +
            "meaningless.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "SnNout and SpPin",
          text:
            "A highly Sensitive test, when Negative, rules the condition out; a highly Specific test, when Positive, rules it " +
            "in. Screening tests aim for sensitivity; confirmatory tests aim for specificity.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Reading a confusion matrix",
          problem: "Of $100$ sick patients a test flags $90$; of $900$ healthy patients it flags $45$. Find sensitivity and specificity.",
          steps: [
            "$TP = 90$, $FN = 10$: sensitivity $= 90/100 = 0.90$.",
            "$FP = 45$, $TN = 855$: specificity $= 855/900 = 0.95$.",
          ],
          answer: "Sensitivity $0.90$, specificity $0.95$.",
        },
      ],
    },
  ],
  references: [
    { source: "Altman & Bland, Diagnostic tests 1: sensitivity and specificity (BMJ, 1994)", locator: "full paper" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning (2nd ed.)", locator: "§9.2.5" },
  ],
};

const predictiveValues: WikiArticle = {
  conceptId: "predictive-values",
  summary:
    "Predictive values answer the question a patient or user actually asks: given this result, how likely is it right? " +
    "The positive predictive value is the fraction of flagged cases that are truly positive; the negative predictive " +
    "value is the fraction of cleared cases that are truly negative. Unlike sensitivity and specificity, they depend " +
    "heavily on prevalence — Bayes' rule in a table.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{PPV} = \\frac{TP}{TP + FP} = P(Y = 1 \\mid \\hat{Y} = 1), \\qquad \\text{NPV} = \\frac{TN}{TN + FN} = P(Y = 0 \\mid \\hat{Y} = 0)",
        },
        {
          kind: "formula",
          latex: "\\text{PPV} = \\frac{\\text{sens} \\cdot \\pi}{\\text{sens} \\cdot \\pi + (1 - \\text{spec})(1 - \\pi)}, \\qquad \\text{NPV} = \\frac{\\text{spec}\\,(1 - \\pi)}{\\text{spec}\\,(1 - \\pi) + (1 - \\text{sens})\\,\\pi}",
          caption: "$\\pi$ is the prevalence $P(Y = 1)$ — Bayes' rule with the test as evidence",
        },
      ],
    },
    {
      heading: "The base-rate effect",
      blocks: [
        {
          kind: "example",
          title: "A good test for a rare disease",
          problem: "Sensitivity $0.99$, specificity $0.99$, prevalence $1\\%$. What is the PPV?",
          steps: [
            "Per $10{,}000$ people: $100$ sick, of whom $99$ test positive.",
            "$9{,}900$ healthy, of whom $1\\%$, i.e. $99$, test positive.",
            "$\\text{PPV} = 99/(99 + 99) = 0.5$.",
          ],
          answer: "Only half of positive results are real, despite $99\\%$ sensitivity and specificity.",
        },
        {
          kind: "list",
          items: [
            "As prevalence falls, PPV falls and NPV rises. In a population where the condition is rare, a negative is very reassuring and a positive is weak evidence.",
            "PPV and NPV computed in a case-control study (often $50\\%$ cases) do not transfer to the field, where prevalence differs; sensitivity and specificity do.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Don't confuse the conditionals",
          text:
            "“The test detects $99\\%$ of cases” is $P(+ \\mid \\text{sick})$. “A positive means $99\\%$ chance of disease” is " +
            "$P(\\text{sick} \\mid +)$. Swapping them is the base-rate fallacy.",
        },
      ],
    },
  ],
  references: [
    { source: "Altman & Bland, Diagnostic tests 2: predictive values (BMJ, 1994)", locator: "full paper" },
    { source: "Blitzstein & Hwang, Introduction to Probability (2nd ed.)", locator: "Example 2.3.9" },
  ],
};

const precisionRecallF1: WikiArticle = {
  conceptId: "precision-recall-f1",
  summary:
    "Machine learning renamed two diagnostic-testing quantities: precision is PPV and recall is sensitivity. Both ignore " +
    "true negatives, which makes them the natural pair when positives are rare and negatives are plentiful and " +
    "uninteresting — retrieval, fraud, rare-event detection. F1 is their harmonic mean, a single number that is high " +
    "only when both are.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{Precision} = \\frac{TP}{TP + FP}, \\quad \\text{Recall} = \\frac{TP}{TP + FN}, \\quad F_1 = \\frac{2PR}{P + R} = \\frac{2\\,TP}{2\\,TP + FP + FN}",
        },
        {
          kind: "list",
          items: [
            "The harmonic mean is dominated by the smaller value: $P = 1$, $R = 0.1$ gives $F_1 \\approx 0.18$, while the arithmetic mean would be $0.55$.",
            "$F_1$ never involves $TN$, so it is unchanged by adding more easy negatives — unlike accuracy.",
            "$F_\\beta = (1 + \\beta^2)\\dfrac{PR}{\\beta^2 P + R}$ weights recall $\\beta$ times as heavily as precision: $F_2$ for screening, $F_{0.5}$ when false alarms are costly.",
          ],
        },
      ],
    },
    {
      heading: "Averaging over classes",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Macro-F1", description: "Compute $F_1$ per class and average them unweighted. Every class counts equally, so rare classes matter." },
            { term: "Micro-F1", description: "Pool $TP$, $FP$, $FN$ over all classes, then compute $F_1$. Dominated by frequent classes; for single-label multiclass problems it equals accuracy." },
            { term: "Weighted-F1", description: "Average per-class $F_1$ weighted by class support — between the two." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Precision, recall and F1",
          problem: "A spam filter flags $50$ emails, of which $40$ are spam. There are $80$ spam emails in total. Find precision, recall and $F_1$.",
          steps: [
            "$TP = 40$, $FP = 10$, $FN = 40$.",
            "Precision $= 40/50 = 0.8$; recall $= 40/80 = 0.5$.",
            "$F_1 = 2(0.8)(0.5)/(1.3) \\approx 0.615$.",
          ],
          answer: "Precision $0.8$, recall $0.5$, $F_1 \\approx 0.615$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "F1 depends on the threshold and the prevalence",
          text:
            "Like PPV, precision changes with prevalence, so $F_1$ is not comparable across datasets with different class " +
            "balance. Report the threshold used, or show the whole precision-recall curve.",
        },
      ],
    },
  ],
  references: [
    { source: "Manning, Raghavan & Schütze, Introduction to Information Retrieval", locator: "§8.3" },
    { source: "Sokolova & Lapalme, A systematic analysis of performance measures for classification tasks (2009)", locator: "§3" },
  ],
};

const qda: WikiArticle = {
  conceptId: "qda",
  summary:
    "Quadratic discriminant analysis models each class as a Gaussian with its own mean and its own covariance matrix. " +
    "Dropping LDA's shared-covariance assumption makes the log-ratio of class densities quadratic in $x$, so decision " +
    "boundaries become conics — ellipses, parabolas, hyperbolas. The price is many more parameters to estimate.",
  sections: [
    {
      heading: "The discriminant",
      blocks: [
        {
          kind: "formula",
          latex: "\\delta_k(x) = -\\tfrac{1}{2}\\log|\\Sigma_k| - \\tfrac{1}{2}(x - \\mu_k)^\\top \\Sigma_k^{-1}(x - \\mu_k) + \\log \\pi_k",
          caption: "classify to $\\arg\\max_k \\delta_k(x)$",
        },
        {
          kind: "prose",
          text:
            "When all $\\Sigma_k = \\Sigma$, the $\\log|\\Sigma_k|$ terms and the quadratic term $x^\\top \\Sigma^{-1} x$ are the same for " +
            "every class and cancel in comparisons, leaving LDA's linear discriminant. With separate covariances they do not " +
            "cancel, and the boundary $\\delta_j(x) = \\delta_k(x)$ is quadratic.",
        },
      ],
    },
    {
      heading: "Parameters and the bias-variance trade-off",
      blocks: [
        {
          kind: "table",
          headers: ["Model", "Covariance parameters ($p$ features, $K$ classes)"],
          rows: [
            ["LDA", "$p(p + 1)/2$"],
            ["QDA", "$K \\cdot p(p + 1)/2$"],
            ["Naive Bayes (Gaussian)", "$K \\cdot p$ — diagonal covariances"],
          ],
        },
        {
          kind: "list",
          items: [
            "With $p = 50$ and $K = 3$, QDA estimates $3 \\times 1275 = 3825$ covariance parameters versus $1275$ for LDA.",
            "Each $\\hat{\\Sigma}_k$ needs more than $p$ observations in class $k$ to be invertible; small classes make QDA unstable.",
            "Regularised discriminant analysis shrinks each $\\hat{\\Sigma}_k$ towards the pooled covariance: $\\hat{\\Sigma}_k(\\alpha) = \\alpha \\hat{\\Sigma}_k + (1 - \\alpha)\\hat{\\Sigma}$, interpolating between QDA and LDA.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "When to choose which",
          text:
            "If the classes differ in spread or orientation and there is plenty of data per class, QDA's flexibility pays. If " +
            "data are scarce relative to $p$, LDA's bias is usually cheaper than QDA's variance.",
        },
      ],
    },
  ],
  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning (2nd ed.)", locator: "§4.3–4.3.1" },
    { source: "James et al., An Introduction to Statistical Learning (2nd ed.)", locator: "§4.4.3" },
  ],
};

const multidimensionalScaling: WikiArticle = {
  conceptId: "multidimensional-scaling",
  summary:
    "Multidimensional scaling starts from a table of pairwise distances — no coordinates at all — and finds points in a " +
    "low-dimensional space whose distances match them as closely as possible. Classical MDS does this in closed form " +
    "with an eigendecomposition, and on Euclidean distances it gives exactly the PCA scores; metric and non-metric MDS " +
    "minimise a stress function instead.",
  sections: [
    {
      heading: "Classical MDS",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Square the distances: $D^{(2)}_{ij} = d_{ij}^2$.",
            "Double-centre: $B = -\\tfrac{1}{2} J D^{(2)} J$, with $J = I - \\tfrac{1}{n}\\mathbf{1}\\mathbf{1}^\\top$. If the distances are Euclidean, $B = XX^\\top$ for centred coordinates $X$ — a Gram matrix.",
            "Eigendecompose $B = V \\Lambda V^\\top$ and keep the top $k$ eigenpairs: $\\hat{X} = V_k \\Lambda_k^{1/2}$.",
          ],
        },
        {
          kind: "prose",
          text:
            "Double centring works because $\\|x_i - x_j\\|^2 = \\|x_i\\|^2 + \\|x_j\\|^2 - 2x_i^\\top x_j$: subtracting row and column " +
            "means removes the squared norms and leaves the inner products. The configuration is determined only up to " +
            "rotation, reflection and translation — distances cannot see those.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Classical MDS is PCA",
          text:
            "PCA eigendecomposes the $p \\times p$ covariance $X^\\top X$; classical MDS eigendecomposes the $n \\times n$ Gram " +
            "matrix $XX^\\top$. They share nonzero eigenvalues, and MDS's coordinates equal the PCA scores. MDS is the tool " +
            "when you only have distances, or when $n \\ll p$.",
        },
      ],
    },
    {
      heading: "Stress-based MDS",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{Stress}(z_1, \\ldots, z_n) = \\sum_{i < j} \\big(d_{ij} - \\|z_i - z_j\\|\\big)^2",
        },
        {
          kind: "list",
          items: [
            "Metric MDS minimises stress directly (e.g. with the SMACOF algorithm), handling non-Euclidean dissimilarities for which $B$ has negative eigenvalues.",
            "Non-metric (Kruskal) MDS matches only the rank order of dissimilarities, fitting a monotone transform — useful for survey or perceptual data where only “more similar” is meaningful.",
            "Isomap is classical MDS on geodesic (shortest-path graph) distances, which lets it unroll curved manifolds.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning (2nd ed.)", locator: "§14.8" },
    { source: "Borg & Groenen, Modern Multidimensional Scaling (2nd ed.)", locator: "Ch. 8, 12" },
  ],
};

export const ml19OptimizationAndMetrics: WikiArticle[] = [
  argmaxVsSoftmax,
  stochasticGradientDescent,
  miniBatchSgd,
  sgdStepSizes,
  momentum,
  sensitivitySpecificity,
  predictiveValues,
  precisionRecallF1,
  qda,
  multidimensionalScaling,
];
