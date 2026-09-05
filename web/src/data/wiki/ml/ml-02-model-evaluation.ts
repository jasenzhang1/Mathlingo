import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 2 — how you find out whether a model is any good, and
 * how you choose between models without fooling yourself. Mirrors
 * `assessments/ml-02-model-evaluation-and-selection.md`.
 */

const multiclassClassification: WikiArticle = {
  conceptId: "multiclass-classification",
  summary:
    "Multiclass classification predicts one label out of K > 2 mutually exclusive classes. The " +
    "conceptual jump from binary is small, but almost every binary convenience — a single decision " +
    "threshold, one ROC curve, an unambiguous \"positive\" class — either generalises awkwardly or " +
    "not at all, and that is where the errors come from.",

  sections: [
    {
      heading: "One label out of K",
      blocks: [
        {
          kind: "formula",
          latex: "softmax(z)ₖ = e^{zₖ} / Σⱼ e^{zⱼ},   Σₖ softmax(z)ₖ = 1",
          caption: "The standard multiclass output layer: K scores in, a probability vector out",
        },
        {
          kind: "prose",
          text:
            "Softmax generalises the sigmoid: with K = 2 it reduces to the logistic function of the " +
            "score difference. The normalisation by Σⱼ e^{zⱼ} is what enforces mutual exclusivity — " +
            "raising one class's probability necessarily lowers the others'.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Multiclass is not multi-label",
          text:
            "Multiclass means exactly one label is correct (a digit is a 7, not also a 3). " +
            "Multi-label means any subset can be correct (an article is about both sport and " +
            "politics). Multi-label uses K independent sigmoids, not a softmax, precisely because " +
            "the probabilities must not be forced to sum to 1.",
        },
      ],
    },

    {
      heading: "Reducing to binary, when you must",
      blocks: [
        {
          kind: "table",
          headers: ["Scheme", "Classifiers trained", "Each trained on", "Trouble"],
          rows: [
            ["One-vs-rest (OvR)", "K", "All data, class k versus everything else", "Each problem is imbalanced; scores from separate models are not comparable"],
            ["One-vs-one (OvO)", "K(K−1)/2", "Only the two classes involved", "Quadratic in K, but each fit is small; ties need breaking"],
            ["Native multiclass", "1", "All data at once", "None structurally — softmax, trees and k-NN handle K directly"],
          ],
        },
        {
          kind: "prose",
          text:
            "Decision trees, k-NN, naive Bayes, LDA and softmax-output neural networks are natively " +
            "multiclass. SVMs are not — the maximum-margin formulation is intrinsically binary — " +
            "which is why scikit-learn silently wraps SVC in one-vs-one and LinearSVC in one-vs-rest.",
        },
      ],
    },

    {
      heading: "Metrics need an averaging decision",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Micro-average", description: "Pool all TP/FP/FN across classes, then compute the metric once. Large classes dominate; for single-label multiclass, micro-F1 equals accuracy." },
            { term: "Macro-average", description: "Compute the metric per class, then take the unweighted mean. Every class counts equally, so a rare class can sink the score." },
            { term: "Weighted average", description: "Per-class metrics weighted by class support. A compromise that usually tracks accuracy." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The averaging choice is a values statement",
          text:
            "With 95% of examples in one class, micro-averaging reports how the model does on the " +
            "typical example and macro-averaging reports how it does on the typical class. Neither " +
            "is more correct — but reporting one while your stakeholder assumes the other is how " +
            "a model that ignores every minority class gets shipped as \"96% accurate\".",
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§4.1.2 and §4.3.4, Multiclass Discriminants and Softmax" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§10.3, Multinomial Logistic Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-02-model-evaluation-and-selection.md" },
  ],
};

const confusionMatrices: WikiArticle = {
  conceptId: "confusion-matrices",
  summary:
    "A confusion matrix cross-tabulates predicted labels against true labels. It is the object " +
    "every classification metric is computed from, and its value is that it separates the kinds of " +
    "mistake a model makes — which a single accuracy figure deliberately destroys.",

  sections: [
    {
      heading: "The four cells",
      blocks: [
        {
          kind: "table",
          headers: ["", "Predicted positive", "Predicted negative"],
          rows: [
            ["Actually positive", "True positive (TP)", "False negative (FN) — a miss"],
            ["Actually negative", "False positive (FP) — a false alarm", "True negative (TN)"],
          ],
          caption: "Rows are truth, columns are prediction. Both orderings appear in the wild — check the axis labels before reading anyone's matrix.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Accuracy", description: "(TP + TN) / total. Useless under class imbalance." },
            { term: "Precision", description: "TP / (TP + FP). Of the alarms raised, what fraction were real?" },
            { term: "Recall / sensitivity / TPR", description: "TP / (TP + FN). Of the real positives, what fraction did we catch?" },
            { term: "Specificity / TNR", description: "TN / (TN + FP). Of the real negatives, what fraction did we leave alone?" },
            { term: "F1", description: "2·precision·recall / (precision + recall) — the harmonic mean, which is small unless both are large." },
          ],
        },
      ],
    },

    {
      heading: "Why accuracy is the wrong default",
      blocks: [
        {
          kind: "example",
          title: "The 99% accurate model that detects nothing",
          problem:
            "A disease affects 1 in 100 people. A model predicts \"healthy\" for everyone. Compute its metrics on 10,000 patients.",
          steps: [
            "TP = 0, FN = 100, FP = 0, TN = 9,900.",
            "Accuracy = 9,900 / 10,000 = 99%.",
            "Recall = 0 / 100 = 0. Precision is undefined (0/0) — no positive was ever predicted.",
          ],
          answer:
            "99% accurate and clinically worthless. The confusion matrix shows this immediately; the accuracy figure conceals it completely.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Precision and recall trade off through the threshold",
          text:
            "Lower the decision threshold and more cases are called positive: recall rises, " +
            "precision usually falls. Raise it and the reverse happens. Neither is a property of " +
            "the model alone — both are properties of the model *and* the operating point, which is " +
            "why quoting one without the other is meaningless.",
        },
      ],
    },

    {
      heading: "Choosing which error to prefer",
      blocks: [
        {
          kind: "prose",
          text:
            "The matrix cannot tell you which cell matters; the cost structure of the application " +
            "does. In cancer screening a false negative sends a sick patient home and a false " +
            "positive triggers a follow-up test, so recall dominates. In spam filtering a false " +
            "positive buries a genuine email in the junk folder and a false negative is an " +
            "annoyance, so precision dominates.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "F1 is a default, not an answer",
          text:
            "The harmonic mean weights precision and recall equally, which is an assumption about " +
            "costs, not a neutral choice. When the costs genuinely differ, use Fβ (β > 1 favours " +
            "recall) or compute expected cost from the matrix directly. Note also that F1 ignores " +
            "TN entirely — on a problem where correctly-rejected negatives matter, it is measuring " +
            "three of the four cells.",
        },
        {
          kind: "prose",
          text:
            "For K classes the matrix is K × K, and its off-diagonal entries are the diagnostic " +
            "payload: a model confusing 4s with 9s is a different problem from one confusing 4s " +
            "with 7s, and only the full matrix distinguishes them.",
        },
      ],
    },
  ],

  references: [
    { source: "James et al., An Introduction to Statistical Learning", locator: "§4.4.2, Confusion Matrices and ROC" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§9.2.5, Classification Performance" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-02-model-evaluation-and-selection.md" },
  ],
};

const rocCurves: WikiArticle = {
  conceptId: "roc-curves",
  summary:
    "An ROC curve plots true positive rate against false positive rate as the decision threshold " +
    "sweeps from strict to permissive. It evaluates the model's *ranking* of examples rather than " +
    "its predictions at any one threshold, which is exactly what you want when the operating point " +
    "has not been chosen yet.",

  sections: [
    {
      heading: "What the curve traces",
      blocks: [
        {
          kind: "formula",
          latex: "TPR = TP / (TP + FN)      FPR = FP / (FP + TN)",
          caption: "One (FPR, TPR) point per threshold; sweeping the threshold traces the curve",
        },
        {
          kind: "prose",
          text:
            "At threshold 1 nothing is called positive: TPR = FPR = 0, the bottom-left corner. At " +
            "threshold 0 everything is: TPR = FPR = 1, the top-right. In between, each threshold " +
            "gives one point, and the curve is their locus. Every ROC curve therefore passes through " +
            "both corners regardless of how good the model is — the shape in between is the " +
            "information.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Diagonal (AUC = 0.5)", description: "Random ranking. The model orders positives and negatives no better than a coin." },
            { term: "Top-left corner (AUC = 1)", description: "Perfect separation: some threshold catches every positive with no false alarms." },
            { term: "AUC < 0.5", description: "Worse than random — usually a sign that the label or the score is inverted, not that the model is genuinely anti-informative." },
          ],
        },
      ],
    },
    {
      heading: "What AUC actually means",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "AUC has an exact probabilistic reading",
          text:
            "AUC equals the probability that a randomly chosen positive is scored higher than a " +
            "randomly chosen negative. That is why it is threshold-free: it depends only on the " +
            "ordering of scores, not on their calibration or scale. It is also the Mann–Whitney U " +
            "statistic in disguise, which connects it directly to the Wilcoxon rank-sum test.",
        },
        {
          kind: "example",
          title: "Ranking, not calibration",
          problem:
            "Model A outputs probabilities {0.9, 0.8} for two positives and {0.3, 0.2} for two negatives. Model B outputs {0.55, 0.54} and {0.46, 0.45}. Compare AUC.",
          steps: [
            "Both models rank all positives above all negatives.",
            "AUC counts only the ordering of pairs, and both order all 4 positive–negative pairs correctly.",
            "AUC = 1.0 for both, despite B's probabilities being far less confident and far less useful for a fixed 0.5 threshold.",
          ],
          answer:
            "Identical AUC, very different calibration. If you need the probabilities themselves to be trustworthy, AUC is not the metric that checks it — a reliability diagram or Brier score is.",
        },
      ],
    },
    {
      heading: "When to prefer precision–recall",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "ROC flatters models on heavily imbalanced data",
          text:
            "FPR has TN in its denominator, and under heavy imbalance TN is enormous. Going from 100 " +
            "to 1,000 false positives barely moves FPR when there are a million negatives, so the " +
            "ROC curve stays reassuringly close to the top-left while precision collapses from 0.5 " +
            "to 0.09. The precision–recall curve, which never mentions TN, shows the damage.",
        },
        {
          kind: "list",
          items: [
            "Use ROC/AUC when classes are roughly balanced, or when you care about ranking quality across the whole range.",
            "Use the precision–recall curve when positives are rare and false positives are costly — fraud, disease screening, information retrieval.",
            "Use neither alone if the deployed threshold is already known: report the confusion matrix at that threshold.",
            "Partial AUC restricted to a low-FPR region is the right tool when only the strict end of the curve is operationally reachable.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Fawcett, An Introduction to ROC Analysis", locator: "Pattern Recognition Letters 27(8), 2006" },
    { source: "James et al., An Introduction to Statistical Learning", locator: "§4.4.2, ROC Curves" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-02-model-evaluation-and-selection.md" },
  ],
};

const kFoldCrossValidation: WikiArticle = {
  conceptId: "k-fold-cross-validation",
  summary:
    "K-fold cross-validation splits the data into k parts, trains on k − 1 of them and tests on the " +
    "held-out part, and repeats k times so every observation is tested on exactly once. It buys a " +
    "far lower-variance estimate of out-of-sample error than a single split, at k times the compute.",

  sections: [
    {
      heading: "The procedure",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Shuffle and partition the data into k folds of roughly equal size (stratified by class, if classifying).",
            "For i = 1 … k: train on all folds but fold i, evaluate on fold i.",
            "Average the k scores. The standard deviation across folds is a rough stability check, though the folds are not independent.",
            "Refit on all the data once the hyperparameters are chosen — the k models were a means of estimation, not the deliverable.",
          ],
        },
        {
          kind: "formula",
          latex: "CV(k) = (1/k) Σᵢ₌₁ᵏ  L(fold i, model trained without fold i)",
          caption: "Every observation contributes to training k − 1 times and to testing exactly once",
        },
      ],
    },

    {
      heading: "Choosing k",
      blocks: [
        {
          kind: "table",
          headers: ["k", "Bias of the estimate", "Variance", "Cost"],
          rows: [
            ["2", "High — each model sees only half the data", "Low", "2 fits"],
            ["5 or 10", "Modest", "Moderate", "5–10 fits"],
            ["n (leave-one-out)", "Nearly unbiased", "Often high", "n fits"],
          ],
          caption: "5 and 10 are the standard compromises, and the empirical evidence for them is fairly strong.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why leave-one-out is not simply the best",
          text:
            "LOOCV trains on n − 1 points every time, so its bias is tiny. But the n training sets " +
            "are nearly identical, so the n error estimates are highly positively correlated, and " +
            "averaging correlated quantities reduces variance far less than averaging independent " +
            "ones. The result is a low-bias, high-variance estimate — plus n model fits.",
        },
        {
          kind: "prose",
          text:
            "For least-squares linear models LOOCV has a closed form via the hat matrix's leverage " +
            "values, so it costs one fit rather than n. That special case is a genuine free lunch " +
            "and does not generalise to models without a linear smoother representation.",
        },
      ],
    },

    {
      heading: "Getting it wrong",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Feature selection must happen inside the loop",
          text:
            "Selecting the 100 features most correlated with the target on the full dataset and " +
            "*then* cross-validating gives near-perfect scores on pure noise: the selection step " +
            "already saw every fold's test data. Every data-dependent step — selection, scaling, " +
            "imputation, resampling — belongs inside the fold, refitted k times.",
        },
        {
          kind: "list",
          items: [
            "Time series: use forward-chaining (train on the past, test on the next block). Random folds train on the future.",
            "Grouped data: use GroupKFold so all rows for one patient or user land in the same fold.",
            "Model selection on CV scores makes those scores optimistic; nested cross-validation, or a separate held-out test set, restores an honest estimate.",
            "Repeated k-fold (several shuffles) reduces the variance introduced by one particular partition.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "James et al., An Introduction to Statistical Learning", locator: "§5.1, Cross-Validation" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§7.10, Cross-Validation" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-02-model-evaluation-and-selection.md" },
  ],
};

const hyperparameters: WikiArticle = {
  conceptId: "hyperparameters",
  summary:
    "Parameters are learned from the training data by the fitting procedure; hyperparameters are " +
    "set before fitting and control how that procedure behaves. The dividing line is simply whether " +
    "the training objective is what determines the value — and it explains why hyperparameters " +
    "cannot be tuned on the training set.",

  sections: [
    {
      heading: "The distinction",
      blocks: [
        {
          kind: "table",
          headers: ["Model", "Parameters (learned)", "Hyperparameters (chosen)"],
          rows: [
            ["Ridge regression", "Coefficients β", "Penalty strength λ"],
            ["Decision tree", "Split variables and thresholds", "Max depth, min samples per leaf"],
            ["k-NN", "None — the data is the model", "k, distance metric, weighting"],
            ["Neural network", "Weights and biases", "Layer sizes, learning rate, batch size, dropout rate"],
            ["SVM", "Support-vector coefficients α", "C, kernel, kernel bandwidth γ"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Why you cannot tune λ on the training set",
          text:
            "Training loss is monotone in flexibility: λ = 0 always gives the lowest training error, " +
            "max depth = ∞ always fits the training data best, k = 1 always achieves zero training " +
            "error for k-NN. Optimising a hyperparameter against training loss therefore selects the " +
            "most overfit model available, every time. Held-out data is not a nicety here — it is " +
            "the only signal that discriminates.",
        },
      ],
    },

    {
      heading: "Search strategies",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Grid search", description: "Every combination on a predefined lattice. Exhaustive, reproducible, and exponentially expensive in the number of hyperparameters." },
            { term: "Random search", description: "Sample configurations at random from ranges. Usually beats grid search at equal budget, because only a few hyperparameters matter and random sampling gives many distinct values of each." },
            { term: "Bayesian optimisation", description: "Fit a surrogate model (often a Gaussian process) to the score surface and use its uncertainty to choose the next configuration. Worth it when each evaluation is expensive." },
            { term: "Successive halving / Hyperband", description: "Start many configurations cheaply, kill the poor performers early, give the survivors more budget." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Random search wins because effective dimension is low",
          text:
            "Bergstra and Bengio's argument is geometric: a 3 × 3 × 3 grid tries only 3 distinct " +
            "values of each hyperparameter across 27 fits, while 27 random draws try 27 distinct " +
            "values of each. When one hyperparameter dominates and the rest barely matter — the " +
            "usual case — the random design explores the one that matters nine times as finely.",
        },
      ],
    },

    {
      heading: "The honest estimate problem",
      blocks: [
        {
          kind: "prose",
          text:
            "Search hard enough on a validation set and you will find a configuration that fits that " +
            "set's noise. The validation score of the winner is then a biased estimate of its true " +
            "performance — the winner's curse again. Nested cross-validation solves it: an inner " +
            "loop selects the hyperparameters, an outer loop scores the whole selection procedure " +
            "on data the inner loop never saw. Expensive, and the correct thing to do when the " +
            "reported number matters.",
        },
        {
          kind: "list",
          items: [
            "Search learning rates, penalties and bandwidths on a log scale — the interesting variation is multiplicative.",
            "Report the search space alongside the result; a good score from a hand-picked space is not reproducible.",
            "Prefer fewer, well-chosen hyperparameters over a large space explored thinly.",
            "A model whose performance swings wildly across nearby hyperparameter values is fragile even at its best setting — see sensitivity analysis.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Bergstra & Bengio, Random Search for Hyper-Parameter Optimization", locator: "JMLR 13, 2012" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§7.10.2, The Wrong and Right Way to Do Cross-Validation" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-02-model-evaluation-and-selection.md" },
  ],
};

const sensitivityAnalysis: WikiArticle = {
  conceptId: "sensitivity-analysis",
  summary:
    "Sensitivity analysis asks how much the output changes when an input, assumption or " +
    "hyperparameter changes. In modelling it answers the question a single validation score cannot: " +
    "is this result a property of the data, or an artefact of one arbitrary choice among many?",

  sections: [
    {
      heading: "What you vary, and what you learn",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Hyperparameter sensitivity", description: "Sweep λ, depth, or k and plot the validation score. A sharp peak means the good result depends on a choice you tuned on finite data." },
            { term: "Data sensitivity", description: "Refit on bootstrap resamples or with influential points removed. Large swings mean the conclusion rests on a handful of observations." },
            { term: "Assumption sensitivity", description: "Rerun under a different imputation rule, outlier policy, or feature encoding. This is where most \"the result flipped\" surprises live." },
            { term: "Feature sensitivity", description: "Perturb one feature and watch the prediction — the basis of permutation importance and partial dependence plots." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Flatness is itself a finding",
          text:
            "A model whose score is essentially unchanged for λ anywhere in [0.01, 1] is telling you " +
            "that the penalty is not what is driving performance, and that you should stop tuning it " +
            "and look elsewhere. Robustness is not a boring result; it is the result that lets you " +
            "deploy without fear of the setting drifting.",
        },
      ],
    },

    {
      heading: "Why it belongs in every evaluation",
      blocks: [
        {
          kind: "example",
          title: "Two models with the same validation score",
          problem:
            "Model A scores 0.87 at its best λ, dropping to 0.61 if λ moves by a factor of two. Model B scores 0.85 across three orders of magnitude of λ. Which do you ship?",
          steps: [
            "A's headline number is higher by 0.02.",
            "A's peak was selected on finite validation data, so the true optimum is probably not exactly where A found it.",
            "Under distribution drift the optimal λ moves, and A falls off its peak while B does not.",
          ],
          answer:
            "B, in almost every production setting. A's advantage is within the noise of the selection process; its fragility is not.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "One-at-a-time sweeps miss interactions",
          text:
            "Varying each hyperparameter alone, holding the rest at their tuned values, explores a " +
            "cross through the space and nothing else. If learning rate and batch size interact — " +
            "and they do — that cross can look flat in every direction while the surface has a " +
            "cliff a short diagonal step away. Global methods (Sobol indices, random sweeps over " +
            "the joint space) are the fix.",
        },
        {
          kind: "prose",
          text:
            "The discipline transfers directly from statistics and from finance, where a valuation " +
            "that swings on the third decimal of an assumed volatility is understood to be a " +
            "statement about the assumption rather than about the asset. The same standard is worth " +
            "holding a model to.",
        },
      ],
    },
  ],

  references: [
    { source: "Saltelli et al., Global Sensitivity Analysis: The Primer", locator: "Ch. 1–2" },
    { source: "Molnar, Interpretable Machine Learning", locator: "Ch. 8, Permutation Feature Importance and Partial Dependence" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-02-model-evaluation-and-selection.md" },
  ],
};

export const ml02ModelEvaluation: WikiArticle[] = [
  multiclassClassification,
  confusionMatrices,
  rocCurves,
  kFoldCrossValidation,
  hyperparameters,
  sensitivityAnalysis,
];
