import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./ml-sixty-shared";

/**
 * Practical ML evaluation (feature selection through distribution shift),
 * each brought from 30 to 60 questions. These pools had nothing below level 5
 * or above level 8, so most additions sit at levels 1–4 and 9–10.
 */

// ---------------------------------------------------------------------------
// feature-selection
// ---------------------------------------------------------------------------
const FS = "feature-selection";
const featureSelection: Item[] = [
  // 1–10
  mcq(m(FS, "recall-purpose", "recall", 1, 15, "What does feature selection do?"),
    "Keeps a subset of the original features and discards the rest",
    [
      ["Creates new features from combinations", "fs-is-extraction", "That's feature extraction (e.g. PCA)."],
      ["Removes training examples", "fs-removes-rows", "It removes columns, not rows."],
      ["Chooses the model's hyperparameters", "fs-is-tuning", "That's hyperparameter tuning."],
    ]),
  mcq(m(FS, "recall-filter", "recall", 1, 15, "A *filter* method scores features:"),
    "Individually, with a statistic such as correlation or mutual information, before any model is trained",
    [
      ["By training a model on every subset", "filter-is-wrapper", "That's a wrapper method."],
      ["Inside the model's own training", "filter-is-embedded", "That's an embedded method."],
      ["By random selection", "filter-random", "Filters use a scoring statistic."],
    ]),
  mcq(m(FS, "recall-wrapper", "recall", 1, 15, "A *wrapper* method selects features by:"),
    "Searching over subsets and scoring each by the performance of a model trained on it",
    [
      ["Computing correlations only", "wrapper-is-filter", "That's a filter."],
      ["Adding a penalty during training", "wrapper-is-embedded", "That's an embedded method."],
      ["Keeping every feature", "wrapper-keeps-all", "It searches for a subset."],
    ]),
  mcq(m(FS, "recall-embedded", "recall", 1, 15, "Which is an *embedded* feature-selection method?"),
    "Lasso ($L_1$-regularised) regression",
    [
      ["Pearson-correlation ranking", "embedded-correlation", "That's a filter."],
      ["Recursive feature elimination", "embedded-rfe", "RFE is usually classed as a wrapper."],
      ["Exhaustive subset search", "embedded-exhaustive", "That's a wrapper."],
    ]),
  mcq(m(FS, "recall-benefits", "recall", 2, 20, "Which is a benefit of feature selection?"),
    "Simpler, faster models that may generalise better and are easier to interpret",
    [
      ["It always raises accuracy", "fs-always-accuracy", "Dropping useful features can hurt."],
      ["It adds information to the data", "fs-adds-info", "It can only remove features."],
      ["It removes the need for validation", "fs-no-validation", "Selection itself must be validated."],
    ]),
  mcq(m(FS, "recall-forward", "recall", 2, 20, "Forward selection starts with:"),
    "No features, adding the most useful one at each step",
    [
      ["All features, removing one at a time", "forward-is-backward", "That's backward elimination."],
      ["A random subset", "forward-random", "It starts from the empty set."],
      ["Only the target", "forward-target", "It starts with no predictors."],
    ]),
  mcq(m(FS, "recall-variance-threshold", "recall", 2, 20, "A variance threshold filter removes features that:"),
    "Barely vary across examples (e.g. nearly constant)",
    [
      ["Have the highest variance", "variance-high", "It drops the lowest-variance features."],
      ["Correlate with the target", "variance-target", "It ignores the target."],
      ["Contain missing values", "variance-missing", "Missingness is separate."],
    ]),
  mcq(m(FS, "recall-mutual-information", "recall", 2, 20, "What advantage does mutual information have over Pearson correlation as a filter score?"),
    "It detects non-linear dependence, not just linear relationships",
    [
      ["It's faster to compute", "mi-faster", "It's usually slower."],
      ["It needs no data", "mi-no-data", "It's estimated from data."],
      ["It only works for continuous targets", "mi-continuous", "It works for discrete targets too."],
    ]),
  num(m(FS, "apply-subsets", "apply", 3, 25, "How many non-empty subsets of $12$ candidate features are there ($2^{12} - 1$)?"), 4095),
  num(m(FS, "apply-forward-fits", "apply", 3, 30, "Forward selection over $10$ candidates fits $10$ models in step one, $9$ in step two, and so on. How many fits to reach $3$ features?"), 27),
  // 11–20
  num(m(FS, "apply-backward-fits", "apply", 3, 30, "Backward elimination from $8$ features removes one per step, fitting one model per remaining feature each step. How many fits to go from $8$ down to $6$ features?"), 15),
  num(m(FS, "apply-top-k", "apply", 3, 25, "Features have absolute correlations $0.42$, $0.05$, $0.31$, $0.67$ and $0.18$ with the target. A filter keeps the top $2$. What is the largest of the discarded scores?"), 0.31),
  num(m(FS, "apply-rfe-steps", "apply", 4, 35, "Recursive feature elimination removes $10\\%$ of features (rounded down) per step, starting from $50$. How many features remain after one step?"), 45),
  num(m(FS, "apply-lasso-zero", "apply", 4, 35, "A lasso fit on $30$ features returns $22$ exactly-zero coefficients. How many features does it select?"), 8),
  num(m(FS, "apply-noise-hits", "apply", 4, 35, "Among $2{,}000$ pure-noise features, about $5\\%$ pass a $p < 0.05$ filter by chance. About how many is that?"), 100),
  mcq(m(FS, "apply-cv-placement", "apply", 4, 35, "Where must feature selection go when cross-validating?"),
    "Inside each training fold, re-run from scratch, never on the full dataset beforehand",
    [
      ["Once on the full dataset, before splitting", "fs-before-cv", "That leaks validation labels into the selection."],
      ["On the test set", "fs-on-test", "The test set must stay untouched."],
      ["After evaluation", "fs-after-eval", "Selection is part of the training pipeline."],
    ]),
  short(m(FS, "explain-filter-tradeoff", "explain", 5, 90, "What trade-off does a filter method make compared with a wrapper?"),
    [
      ["speed", "Filters are fast and model-agnostic", 2, true],
      ["blind", "But they score features one at a time, missing interactions and redundancy, and ignore the model being used", 2, true],
    ]),
  mcq(m(FS, "apply-redundant", "apply", 5, 40, "Two features are near-duplicates and both strongly predictive. What does a univariate filter tend to do?"),
    "Keep both, since each scores highly on its own, wasting a slot on redundant information",
    [
      ["Keep only one automatically", "filter-dedupes", "Filters score features independently."],
      ["Discard both", "filter-discards-both", "Both score highly."],
      ["Merge them", "filter-merges", "Filters don't create features."],
    ]),
  short(m(FS, "explain-xor", "explain", 6, 120, "A target is the XOR of two binary features. Why does a univariate filter miss them, and which method family can find them?"),
    [
      ["univariate", "Each feature alone has zero correlation/association with an XOR target, so filters score both near zero", 2, true],
      ["wrapper", "Wrapper or embedded methods that evaluate features jointly (e.g. with trees) can detect the pair", 2, true],
    ]),
  mcq(m(FS, "explain-l1-sparsity", "explain", 6, 50, "Why does an $L_1$ penalty set some coefficients exactly to zero, unlike $L_2$?"),
    "Its diamond-shaped constraint region has corners on the axes, where the optimum often lands",
    [
      ["$L_1$ penalises small coefficients more", "l1-small", "Both shrink, but $L_1$'s constant gradient pushes all the way to zero."],
      ["$L_2$ can't shrink coefficients", "l2-no-shrink", "$L_2$ shrinks but rarely to exactly zero."],
      ["$L_1$ removes features before training", "l1-before", "Sparsity emerges during optimisation."],
    ]),
  // 21–30
  num(m(FS, "transfer-exhaustive", "transfer", 7, 60, "An exhaustive search over all subsets of $25$ features, at $1$ ms per fit, takes about how many hours ($\\frac{2^{25}}{3.6 \\times 10^{6}}$)? Give $2$ decimal places."), 9.32),
  mcq(m(FS, "transfer-instability", "transfer", 8, 60, "Lasso picks different features on different bootstrap samples of the same data. What does this suggest?"),
    "Several correlated features are interchangeable, so the selection is unstable; stability selection or elastic net helps",
    [
      ["Lasso is broken", "lasso-broken", "This is expected with correlated features."],
      ["The selected features are causal", "lasso-causal", "Instability argues against over-interpreting them."],
      ["More features should be kept", "lasso-keep-more", "The issue is stability, not count."],
    ]),
  short(m(FS, "transfer-selection-bias", "transfer", 9, 150, "With $5{,}000$ noise features and $50$ rows, selecting the top features on all data and then cross-validating reports high accuracy. Explain the mechanism and the correct procedure."),
    [
      ["mechanism", "Among thousands of noise features, some correlate with the labels by chance across all rows, including the validation rows", 2, true],
      ["fix", "Perform selection inside each training fold (nested within CV); the honest estimate then falls to chance", 2, true],
    ]),
  num(m(FS, "transfer-expected-max-noise", "transfer", 9, 75, "With $n = 50$, a noise feature's correlation with the target has standard deviation $\\frac{1}{\\sqrt{n - 1}}$. About $3.5$ standard deviations is typical for the maximum of $5{,}000$ such features. What correlation is that? Give $2$ decimal places."), 0.5),
  mcq(m(FS, "transfer-not-causal", "transfer", 9, 75, "A stakeholder wants to treat the selected feature set as the causes of the outcome. What is the right caution?"),
    "Selection finds predictive features, which can be proxies or correlates rather than causes",
    [
      ["Selected features are always causal", "selected-causal", "Prediction doesn't establish causation."],
      ["Unselected features are irrelevant causally", "unselected-irrelevant", "Redundant causes can be dropped in favour of proxies."],
      ["Selection removes confounding", "selection-confounding", "It does nothing about confounding."],
    ]),
  short(m(FS, "transfer-genomics", "transfer", 9, 150, "A study has $200$ patients and $20{,}000$ gene features. Describe a sound feature-selection and evaluation strategy."),
    [
      ["method", "Use strong regularisation (lasso/elastic net) or a filter plus a simple model, with selection inside the training folds", 2, true],
      ["evaluation", "Evaluate with nested cross-validation (or an untouched test set), and check selection stability across resamples", 2, true],
    ]),
  num(m(FS, "transfer-bonferroni", "transfer", 10, 90, "Filtering $20{,}000$ features with a Bonferroni-corrected family-wise level of $0.05$ uses what per-feature $p$-value threshold?"), 0.0000025),
  mcq(m(FS, "transfer-mrmr", "transfer", 10, 90, "The mRMR criterion (minimum redundancy, maximum relevance) picks each next feature to:"),
    "Maximise its relevance to the target while minimising its redundancy with features already chosen",
    [
      ["Maximise correlation with other features", "mrmr-max-redundancy", "It minimises redundancy."],
      ["Ignore the target", "mrmr-no-target", "Relevance to the target is central."],
      ["Minimise relevance", "mrmr-min-relevance", "It maximises relevance."],
    ]),
  short(m(FS, "transfer-vs-regularisation", "transfer", 10, 180, "How do feature selection and regularisation differ in how they control model complexity, and when might you prefer each?"),
    [
      ["difference", "Selection makes hard keep/drop decisions; regularisation (e.g. ridge) shrinks all coefficients smoothly ($L_1$ does both)", 2, true],
      ["preference", "Prefer selection for interpretability, cost or data-collection savings; prefer smooth regularisation when many features each carry a little signal", 2, true],
    ]),
  num(m(FS, "apply-feature-reduction", "apply", 2, 20, "Selection reduces $64$ features to $16$. By what factor did the feature count fall?"), 4),
];

// ---------------------------------------------------------------------------
// class-imbalance
// ---------------------------------------------------------------------------
const CI = "class-imbalance";
const classImbalance: Item[] = [
  // 1–10
  mcq(m(CI, "recall-definition", "recall", 1, 15, "Class imbalance means:"),
    "One class is much rarer than the other(s) in the data",
    [
      ["The features have different scales", "imbalance-scales", "That's a scaling issue."],
      ["The model is biased", "imbalance-model-bias", "Imbalance is a property of the data."],
      ["The training set is small", "imbalance-small", "Imbalance concerns class proportions."],
    ]),
  mcq(m(CI, "recall-minority", "recall", 1, 15, "In fraud detection with $0.2\\%$ fraud, which is the minority class?"),
    "Fraud",
    [
      ["Legitimate transactions", "minority-legit", "They're $99.8\\%$ — the majority."],
      ["Neither", "minority-neither", "Fraud is the rare class."],
      ["Both equally", "minority-both", "The classes are very unequal."],
    ]),
  mcq(m(CI, "recall-misleading-metric", "recall", 1, 15, "Which metric is most misleading under heavy imbalance?"),
    "Accuracy",
    [
      ["Recall", "misleading-recall", "Recall focuses on the minority class."],
      ["Precision", "misleading-precision", "Precision also focuses on the positive class."],
      ["Average precision", "misleading-ap", "AP reflects minority-class performance."],
    ]),
  mcq(m(CI, "recall-oversample", "recall", 1, 15, "Random oversampling addresses imbalance by:"),
    "Duplicating minority-class examples in the training set",
    [
      ["Deleting minority examples", "oversample-deletes", "That's the opposite."],
      ["Deleting majority examples", "oversample-is-undersample", "That's undersampling."],
      ["Changing the test set", "oversample-test", "Only training data are resampled."],
    ]),
  mcq(m(CI, "recall-undersample", "recall", 2, 20, "What is the main drawback of random undersampling?"),
    "It throws away majority-class data that might be informative",
    [
      ["It duplicates minority examples", "undersample-duplicates", "That's oversampling."],
      ["It makes training slower", "undersample-slower", "Smaller data trains faster."],
      ["It changes the minority labels", "undersample-labels", "Labels are untouched."],
    ]),
  mcq(m(CI, "recall-class-weights", "recall", 2, 20, "Class weighting tackles imbalance by:"),
    "Making errors on the minority class count more in the training loss",
    [
      ["Removing majority examples", "weights-remove", "Weighting keeps all data."],
      ["Changing feature scales", "weights-scales", "It reweights the loss per class."],
      ["Lowering the learning rate", "weights-lr", "It changes loss weights."],
    ]),
  mcq(m(CI, "recall-smote", "recall", 2, 20, "SMOTE creates new minority examples by:"),
    "Interpolating between a minority example and one of its minority-class nearest neighbours",
    [
      ["Copying minority examples exactly", "smote-copy", "That's random oversampling."],
      ["Adding Gaussian noise to majority examples", "smote-noise", "It synthesises minority points."],
      ["Relabelling majority examples", "smote-relabel", "It creates new points."],
    ]),
  mcq(m(CI, "recall-good-metrics", "recall", 2, 20, "Which pair of metrics stays informative under heavy imbalance?"),
    "Recall and precision (or the area under the precision–recall curve)",
    [
      ["Accuracy and error rate", "good-accuracy", "Both are dominated by the majority."],
      ["Training loss and accuracy", "good-training", "Neither isolates minority performance."],
      ["Number of epochs and batch size", "good-epochs", "Those aren't metrics."],
    ]),
  num(m(CI, "apply-baseline-accuracy", "apply", 3, 25, "In a population with $3\\%$ positives, what accuracy does always predicting negative achieve, in percent?"), 97),
  num(m(CI, "apply-imbalance-ratio", "apply", 3, 25, "A dataset has $9{,}800$ negatives and $200$ positives. What is the imbalance ratio (majority to minority)?"), 49),
  // 11–20
  num(m(CI, "apply-oversample-count", "apply", 3, 30, "Random oversampling makes $200$ positives match $9{,}800$ negatives. How many synthetic or duplicated positives are added?"), 9600),
  num(m(CI, "apply-undersample-count", "apply", 3, 25, "Random undersampling keeps all $200$ positives and an equal number of negatives. How many negatives are discarded?"), 9600),
  num(m(CI, "apply-balanced-weight", "apply", 4, 35, "The “balanced” class weight is $\\frac{n}{K n_c}$. With $n = 10{,}000$, $K = 2$ and $n_c = 200$ positives, what is the positive-class weight?"), 25),
  num(m(CI, "apply-smote-point", "apply", 4, 35, "SMOTE interpolates $\\mathbf{x} + \\lambda(\\mathbf{x}_{nn} - \\mathbf{x})$. With $\\mathbf{x} = [2, 4]$, neighbour $[6, 8]$ and $\\lambda = 0.25$, what is the first coordinate?"), 3),
  num(m(CI, "apply-recall-trivial", "apply", 4, 30, "A model that always predicts negative on data with $1\\%$ positives has what recall?"), 0),
  short(m(CI, "explain-threshold", "explain", 5, 90, "How can moving the decision threshold address imbalance without resampling?"),
    [
      ["lower", "Lowering the threshold on the predicted probability flags more cases as positive, raising minority recall", 2, true],
      ["choose", "The threshold is chosen on validation data to balance precision and recall or minimise expected cost", 2, true],
    ]),
  mcq(m(CI, "apply-split-first", "apply", 5, 40, "When should oversampling be applied relative to the train/test split?"),
    "After splitting, to the training data only",
    [
      ["Before splitting", "oversample-before", "Duplicates would land in both train and test, inflating scores."],
      ["To the test set only", "oversample-test-only", "The test set should reflect real data."],
      ["To both sets equally", "oversample-both", "The test set must stay untouched."],
    ]),
  short(m(CI, "explain-calibration-effect", "explain", 6, 120, "Resampling to a $50/50$ balance changes the model's predicted probabilities. Explain how and how to correct them."),
    [
      ["inflated", "The model learns a $50\\%$ prior, so its probabilities for the minority class are inflated relative to the true base rate", 2, true],
      ["correct", "Rescale using the prior ratio (prior-shift correction) or recalibrate on data with the true class mix", 2, true],
    ]),
  mcq(m(CI, "explain-imbalance-not-hard", "explain", 6, 50, "Is class imbalance by itself always a problem?"),
    "No — if the classes are well separated and there are enough minority examples, a model can still learn them well",
    [
      ["Yes, always", "imbalance-always-bad", "Separability and minority count matter more than the ratio."],
      ["Only for neural networks", "imbalance-nn", "It's model-independent."],
      ["Only when the ratio exceeds $2$", "imbalance-ratio-2", "No fixed ratio decides it."],
    ]),
  num(m(CI, "transfer-prior-correction", "transfer", 7, 60, "A model trained on balanced data outputs $p = 0.6$. The true positive rate is $1\\%$. Adjusting the odds by $\\frac{0.01/0.99}{0.5/0.5}$, what is the corrected probability? Give $4$ decimal places."), 0.0149),
  // 21–30
  num(m(CI, "transfer-expected-cost-threshold", "transfer", 8, 60, "Missing a positive costs $50$ and a false alarm costs $1$. With calibrated probabilities, what threshold minimises expected cost? Give $4$ decimal places."), 0.0196),
  mcq(m(CI, "transfer-smote-pitfall", "transfer", 8, 60, "When can SMOTE hurt?"),
    "When minority points are noisy or overlap the majority class, interpolation creates synthetic points inside majority regions",
    [
      ["Never", "smote-never", "Interpolating noise can mislead the model."],
      ["Only with balanced data", "smote-balanced", "It's for imbalanced data."],
      ["When there are no features", "smote-no-features", "That's not a real scenario."],
    ]),
  short(m(CI, "transfer-evaluation", "transfer", 9, 150, "A fraud model is evaluated on a test set that was undersampled to $50/50$. Why are its reported precision and accuracy misleading?"),
    [
      ["prevalence", "Precision and accuracy depend on prevalence; at $50/50$ they're far higher than at the real fraud rate", 2, true],
      ["fix", "Evaluate on data with the true class mix, or re-weight the metrics to the deployment prevalence", 2, true],
    ]),
  num(m(CI, "transfer-precision-real", "transfer", 9, 75, "A model has recall $0.8$ and false positive rate $0.02$. At a real prevalence of $0.5\\%$, what is its precision? Give $4$ decimal places."), 0.1674),
  mcq(m(CI, "transfer-focal-loss", "transfer", 9, 75, "Focal loss addresses imbalance in object detection by:"),
    "Down-weighting easy, well-classified examples (mostly abundant background) so training focuses on hard ones",
    [
      ["Removing background examples", "focal-removes", "It reweights rather than removes."],
      ["Weighting easy examples more", "focal-easy", "It down-weights them."],
      ["Ignoring the minority class", "focal-ignore", "It helps the hard (often minority) examples."],
    ]),
  num(m(CI, "transfer-effective-number", "transfer", 10, 90, "The “effective number of samples” weighting uses $\\frac{1 - \\beta^{n}}{1 - \\beta}$. With $\\beta = 0.99$ and $n = 100$, what is it? Give $2$ decimal places."), 63.4),
  short(m(CI, "transfer-anomaly-framing", "transfer", 10, 180, "When positives are extremely rare (e.g. $10$ in a million) and diverse, why might anomaly detection beat supervised classification?"),
    [
      ["few-positives", "There are too few positive examples to learn their varied patterns reliably", 2, true],
      ["normal-model", "Modelling what “normal” looks like from the abundant negatives can flag new, unseen kinds of positives", 2, true],
    ]),
  mcq(m(CI, "transfer-metric-choice", "transfer", 10, 90, "Positives are $0.1\\%$ of cases and the team can review only the top $500$ alerts per day. Which metric best matches the business need?"),
    "Precision at the top $500$ (or recall at that alert budget)",
    [
      ["Overall accuracy", "metric-accuracy", "Accuracy ignores the alert budget and is dominated by negatives."],
      ["ROC AUC alone", "metric-auc", "AUC averages over thresholds the team will never use."],
      ["Training loss", "metric-loss", "It doesn't measure the operating point."],
    ]),
  num(m(CI, "apply-minority-share", "apply", 2, 20, "A dataset has $45$ positives out of $1{,}500$ rows. What percentage is positive?"), 3),
  num(m(CI, "apply-positives-in-test", "apply", 4, 35, "A stratified $20\\%$ test split of $50{,}000$ rows with $0.4\\%$ positives contains how many positives?"), 40),
];

// ---------------------------------------------------------------------------
// precision-recall-curves
// ---------------------------------------------------------------------------
const PRC = "precision-recall-curves";
const prCurves: Item[] = [
  // 1–10
  mcq(m(PRC, "recall-axes", "recall", 1, 15, "A precision–recall curve plots:"),
    "Precision (vertical) against recall (horizontal) across decision thresholds",
    [
      ["TPR against FPR", "prc-is-roc", "That's an ROC curve."],
      ["Accuracy against threshold", "prc-accuracy", "It plots precision against recall."],
      ["Loss against epochs", "prc-loss", "That's a training curve."],
    ]),
  mcq(m(PRC, "recall-top-right", "recall", 1, 15, "Which point on a precision–recall curve represents a perfect classifier?"),
    "Precision $1$ and recall $1$ — the top-right corner",
    [
      ["Precision $0$, recall $1$", "prc-perfect-bottom", "That's flagging everything on very imbalanced data."],
      ["Precision $1$, recall $0$", "prc-perfect-left", "That finds no positives."],
      ["The origin", "prc-perfect-origin", "That's the worst point."],
    ]),
  mcq(m(PRC, "recall-threshold-direction", "recall", 1, 15, "Lowering the decision threshold generally:"),
    "Raises recall and tends to lower precision",
    [
      ["Raises precision and lowers recall", "threshold-lower-precision", "That's raising the threshold."],
      ["Raises both", "threshold-both", "There's usually a trade-off."],
      ["Changes neither", "threshold-neither", "It changes which cases are flagged."],
    ]),
  mcq(m(PRC, "recall-ap", "recall", 1, 15, "Average precision summarises:"),
    "The precision–recall curve as a weighted average of precision across recall levels",
    [
      ["Accuracy at the default threshold", "ap-accuracy", "It summarises the whole curve."],
      ["The ROC curve", "ap-roc", "That's AUC."],
      ["Precision at recall $0$ only", "ap-zero", "It spans all recall levels."],
    ]),
  mcq(m(PRC, "recall-tn-ignored", "recall", 2, 20, "Precision–recall curves don't use which count?"),
    "True negatives",
    [
      ["True positives", "prc-tp", "Both precision and recall use TP."],
      ["False positives", "prc-fp", "Precision uses FP."],
      ["False negatives", "prc-fn", "Recall uses FN."],
    ]),
  mcq(m(PRC, "recall-baseline", "recall", 2, 20, "A random classifier's precision–recall curve sits at a precision equal to:"),
    "The positive-class rate (prevalence)",
    [
      ["$0.5$ always", "baseline-half", "That's the ROC diagonal's AUC, not PR."],
      ["$0$", "baseline-zero", "Random flags still catch positives at the base rate."],
      ["$1$", "baseline-one", "Random flags are mostly wrong when positives are rare."],
    ]),
  mcq(m(PRC, "recall-imbalance", "recall", 2, 20, "Precision–recall curves are especially useful when:"),
    "The positive class is rare",
    [
      ["Classes are perfectly balanced", "prc-balanced", "ROC works fine then."],
      ["There are no positives", "prc-no-positives", "Recall is undefined without positives."],
      ["The task is regression", "prc-regression", "They're for classification."],
    ]),
  mcq(m(PRC, "recall-operating-point", "recall", 2, 20, "An *operating point* on the curve is:"),
    "The precision–recall pair at the threshold chosen for deployment",
    [
      ["The curve's area", "operating-area", "That's average precision."],
      ["The best possible model", "operating-best", "It's one chosen threshold."],
      ["The training loss", "operating-loss", "It's a point on the curve."],
    ]),
  num(m(PRC, "apply-precision", "apply", 3, 25, "A model flags $150$ cases; $105$ are truly positive. What is its precision?"), 0.7),
  num(m(PRC, "apply-recall", "apply", 3, 25, "There are $300$ positives and the model finds $105$. What is its recall?"), 0.35),
  // 11–20
  num(m(PRC, "apply-baseline", "apply", 3, 25, "On data with $4\\%$ positives, what precision does a random classifier achieve?"), 0.04),
  num(m(PRC, "apply-f1", "apply", 3, 30, "At an operating point with precision $0.6$ and recall $0.4$, what is $F_1$?"), 0.48),
  num(m(PRC, "apply-flag-all", "apply", 4, 30, "Flagging every case on data with $2{,}000$ positives among $80{,}000$ gives what precision?"), 0.025),
  num(m(PRC, "apply-ap", "apply", 4, 40, "Ranked results (✓ positive): ✓, ✓, ✗, ✓, with $3$ positives in total. Average precision is the mean of precision at each positive's rank. What is it? Give $4$ decimal places."), 0.9167),
  num(m(PRC, "apply-budget", "apply", 4, 35, "A team reviews the top $200$ cases, of which $140$ are positive, out of $350$ positives overall. What recall does it achieve?"), 0.4),
  short(m(PRC, "explain-vs-roc", "explain", 5, 90, "Why can a model look excellent on an ROC curve but poor on a precision–recall curve when positives are rare?"),
    [
      ["fpr-small", "With many negatives, a small FPR still means many false positives, which barely moves ROC", 2, true],
      ["precision", "Those false positives swamp the few true positives, so precision is low — the PR curve shows it", 2, true],
    ]),
  mcq(m(PRC, "apply-dominates", "apply", 5, 40, "Model A's PR curve lies above model B's everywhere. What follows?"),
    "At every recall level A achieves higher precision, so A is better at any operating point",
    [
      ["B is better", "dominates-b", "A's curve is higher everywhere."],
      ["They're equal on average", "dominates-equal", "Domination means A is never worse."],
      ["Nothing can be concluded", "dominates-unknown", "Domination is a clear conclusion."],
    ]),
  short(m(PRC, "explain-non-monotone", "explain", 6, 120, "Why can precision go *up* as the threshold is lowered, making PR curves jagged, while recall can only go up?"),
    [
      ["recall", "Lowering the threshold adds flagged cases, so TP can only grow and recall never falls", 2, true],
      ["precision", "Precision depends on the mix of newly added cases: adding a run of true positives can raise it, so it fluctuates", 2, true],
    ]),
  mcq(m(PRC, "explain-interpolation", "explain", 6, 50, "Why shouldn't PR curves be linearly interpolated between points the way ROC curves can be?"),
    "Precision doesn't vary linearly between operating points, so straight-line interpolation overstates the area",
    [
      ["PR curves have no points to interpolate", "prc-no-points", "They have points at each threshold."],
      ["Linear interpolation understates precision", "prc-understate", "It overstates the area."],
      ["ROC curves can't be interpolated either", "roc-no-interpolate", "ROC interpolation is achievable by randomising."],
    ]),
  num(m(PRC, "transfer-precision-from-rates", "transfer", 7, 60, "One million transactions include $1{,}000$ frauds. At some threshold a model catches $600$ frauds with an FPR of $0.5\\%$. What is its precision? Give $4$ decimal places."), 0.1072),
  // 21–30
  num(m(PRC, "transfer-ap-baseline", "transfer", 8, 60, "An average precision of $0.3$ is reported on data with $1.5\\%$ positives. How many times the random baseline is that?"), 20),
  mcq(m(PRC, "transfer-prevalence-change", "transfer", 8, 60, "A model's PR curve is measured at $5\\%$ prevalence and the model is deployed where prevalence is $0.5\\%$. What happens to its PR curve?"),
    "Precision falls at every recall level, because precision depends on prevalence while recall doesn't",
    [
      ["Nothing — PR curves are prevalence-invariant", "prc-invariant", "That's ROC's property, not PR's."],
      ["Recall falls at every precision level", "prc-recall-falls", "Recall is invariant to prevalence."],
      ["Precision rises", "prc-precision-rises", "Lower prevalence lowers precision."],
    ]),
  short(m(PRC, "transfer-choose-threshold", "transfer", 9, 150, "A medical team needs recall of at least $0.95$ and wants as few false alarms as possible. How would you use the PR curve to set the threshold, and how would you check it?"),
    [
      ["choose", "On validation data, find the highest threshold whose recall is still $\\ge 0.95$, which maximises precision subject to the constraint", 2, true],
      ["check", "Confirm the recall and precision on a separate test set (with the deployment prevalence) and monitor after deployment", 2, true],
    ]),
  num(m(PRC, "transfer-ppv-at-recall", "transfer", 9, 75, "At recall $0.9$ a model has FPR $0.1$. With $2\\%$ prevalence, what is its precision? Give $4$ decimal places."), 0.1552),
  mcq(m(PRC, "transfer-ap-vs-auc", "transfer", 9, 75, "Model A has higher ROC AUC but lower average precision than model B on a rare-event problem. Which is likely better if the team only acts on the top-ranked cases?"),
    "Model B — average precision focuses on precision among the highest-ranked predictions",
    [
      ["Model A, since AUC is always more reliable", "ap-auc-a", "AUC weighs the whole ranking, including irrelevant low ranks."],
      ["They're equivalent", "ap-auc-equal", "They rank the models differently."],
      ["Neither metric applies", "ap-auc-neither", "Both apply; AP fits this use better."],
    ]),
  num(m(PRC, "transfer-f-beta-best", "transfer", 10, 90, "Operating points (precision, recall) are $(0.9, 0.3)$, $(0.6, 0.6)$ and $(0.3, 0.9)$. What is the best $F_1$ among them?"), 0.6),
  short(m(PRC, "transfer-averaging-multilabel", "transfer", 10, 180, "For a multi-label problem with many rare labels, explain the difference between micro-averaged and macro-averaged average precision, and which better reflects rare-label performance."),
    [
      ["micro", "Micro-averaging pools all label–example decisions into one PR curve, dominated by frequent labels", 2, true],
      ["macro", "Macro-averaging computes AP per label and averages them equally, so it better reflects rare labels", 2, true],
    ]),
  mcq(m(PRC, "transfer-calibration-irrelevant", "transfer", 10, 90, "Does recalibrating a model's probabilities (with a monotonic map) change its precision–recall curve?"),
    "No — the curve depends only on the ranking of scores, which a monotonic map preserves",
    [
      ["Yes, it always improves it", "calibration-improves-prc", "Ranking is unchanged."],
      ["Yes, it moves every point", "calibration-moves", "Thresholds shift but the set of achievable points is the same."],
      ["Only for balanced data", "calibration-balanced", "It holds for any class mix."],
    ]),
  num(m(PRC, "apply-fp-count", "apply", 2, 20, "A model flags $80$ cases with precision $0.75$. How many false positives?"), 20),
  num(m(PRC, "apply-tp-from-recall", "apply", 4, 35, "There are $500$ positives and recall is $0.62$. How many are missed?"), 190),
];

// ---------------------------------------------------------------------------
// probability-calibration
// ---------------------------------------------------------------------------
const PC = "probability-calibration";
const calibration: Item[] = [
  // 1–10
  mcq(m(PC, "recall-definition", "recall", 1, 15, "A classifier is *calibrated* when:"),
    "Among cases it scores $p$, about a fraction $p$ are actually positive",
    [
      ["It's always correct", "calibrated-correct", "Calibration is about matching frequencies."],
      ["It outputs only $0$ or $1$", "calibrated-binary", "Calibration concerns probabilities."],
      ["Its accuracy exceeds $0.5$", "calibrated-accuracy", "Accuracy is separate."],
    ]),
  mcq(m(PC, "recall-reliability", "recall", 1, 15, "A reliability diagram plots:"),
    "Observed frequency of positives against predicted probability, bin by bin",
    [
      ["Precision against recall", "reliability-pr", "That's a PR curve."],
      ["TPR against FPR", "reliability-roc", "That's an ROC curve."],
      ["Loss against epochs", "reliability-loss", "That's a training curve."],
    ]),
  mcq(m(PC, "recall-perfect-line", "recall", 1, 15, "On a reliability diagram, perfect calibration lies on:"),
    "The diagonal $y = x$",
    [
      ["A horizontal line", "perfect-horizontal", "That means probabilities carry no information."],
      ["A vertical line", "perfect-vertical", "That isn't meaningful here."],
      ["The $x$-axis", "perfect-x-axis", "That means no positives at all."],
    ]),
  mcq(m(PC, "recall-platt", "recall", 1, 15, "Platt scaling calibrates scores by fitting:"),
    "A logistic (sigmoid) function from the model's scores to probabilities",
    [
      ["A step function", "platt-step", "That's closer to isotonic regression."],
      ["A neural network", "platt-network", "It fits just two parameters."],
      ["A decision tree", "platt-tree", "It fits a sigmoid."],
    ]),
  mcq(m(PC, "recall-isotonic", "recall", 2, 20, "Isotonic regression calibration fits:"),
    "A non-decreasing step function from scores to probabilities",
    [
      ["A sigmoid", "isotonic-sigmoid", "That's Platt scaling."],
      ["A straight line through the origin", "isotonic-line", "It's free-form and monotone."],
      ["A single temperature", "isotonic-temperature", "That's temperature scaling."],
    ]),
  mcq(m(PC, "recall-brier-better", "recall", 2, 20, "For the Brier score, is lower or higher better?"),
    "Lower",
    [
      ["Higher", "brier-higher", "It's a mean squared error."],
      ["Closer to $0.5$", "brier-half", "Zero is perfect."],
      ["It has no preferred direction", "brier-direction", "Lower means better probabilities."],
    ]),
  mcq(m(PC, "recall-overconfident", "recall", 2, 20, "A model that predicts $0.95$ for cases that are positive only $70\\%$ of the time is:"),
    "Overconfident",
    [
      ["Underconfident", "calibration-under", "Its stated probability exceeds the observed rate."],
      ["Perfectly calibrated", "calibration-perfect", "$0.95 \\ne 0.70$."],
      ["Uncalibratable", "calibration-impossible", "It can be recalibrated."],
    ]),
  mcq(m(PC, "recall-ranking", "recall", 2, 20, "Does a monotonic calibration map change a model's ranking of cases?"),
    "No — it preserves the order, so AUC is unchanged",
    [
      ["Yes, it reorders them", "calibration-reorders", "Monotone maps keep the order."],
      ["It reverses them", "calibration-reverses", "Monotone increasing maps preserve order."],
      ["Only for isotonic regression", "calibration-isotonic-reorder", "Isotonic is monotone too (ties aside)."],
    ]),
  num(m(PC, "apply-brier", "apply", 3, 30, "Predictions $0.8$, $0.3$ and $0.6$ have outcomes $1$, $0$ and $0$. What is the Brier score? Give $4$ decimal places."), 0.1633),
  num(m(PC, "apply-bin-gap", "apply", 3, 25, "In the $0.7$–$0.8$ bin, the average prediction is $0.75$ and $60\\%$ are positive. What is the absolute calibration gap?"), 0.15),
  // 11–20
  num(m(PC, "apply-ece", "apply", 4, 40, "Two bins hold $60\\%$ and $40\\%$ of predictions, with gaps $0.05$ and $0.15$. What is the expected calibration error (bin-weighted average gap)?"), 0.09),
  num(m(PC, "apply-temperature", "apply", 4, 35, "Temperature scaling divides a logit of $3$ by $T = 1.5$. What is the new logit?"), 2),
  num(m(PC, "apply-sigmoid", "apply", 4, 35, "What probability does logit $2$ give after the sigmoid? Give $4$ decimal places."), 0.8808),
  num(m(PC, "apply-platt", "apply", 4, 40, "Platt scaling gives $p = \\frac{1}{1 + e^{Af + B}}$. With $A = -2$, $B = 1$ and score $f = 0.5$, what is $p$?"), 0.5),
  num(m(PC, "apply-constant-brier", "apply", 4, 35, "Always predicting the base rate $0.2$ on data with $20\\%$ positives gives what Brier score?"), 0.16),
  short(m(PC, "explain-held-out", "explain", 5, 90, "Why must a calibration map be fitted on data the model wasn't trained on?"),
    [
      ["overconfident-train", "On training data the model is typically overconfident (it has fitted those examples), so a map fitted there would be wrong", 2, true],
      ["held-out", "Held-out data show how the model's scores relate to outcomes on new cases", 2, true],
    ]),
  mcq(m(PC, "apply-isotonic-small", "apply", 5, 40, "With only $150$ held-out examples, which calibration method is safer?"),
    "Platt or temperature scaling — few parameters, so less risk of overfitting than isotonic regression",
    [
      ["Isotonic regression", "isotonic-small", "Its flexible step function overfits small data."],
      ["No calibration ever", "no-calibration", "Simple calibration usually still helps."],
      ["A deep calibration network", "deep-calibration", "Far too flexible for $150$ examples."],
    ]),
  short(m(PC, "explain-sharpness", "explain", 6, 120, "Calibration alone isn't enough for good probabilities. Explain why with the example of always predicting the base rate."),
    [
      ["calibrated", "Predicting the base rate for everyone is perfectly calibrated", 2, true],
      ["useless", "But it doesn't discriminate between cases (no sharpness/resolution), so it's useless for decisions", 2, true],
    ]),
  mcq(m(PC, "explain-temperature-over-one", "explain", 6, 50, "Temperature scaling with $T > 1$ makes predicted probabilities:"),
    "Softer — pulled toward uniform, reducing overconfidence",
    [
      ["Sharper and more extreme", "temp-sharper", "That's $T < 1$."],
      ["Unchanged", "temp-unchanged", "Dividing logits changes the probabilities."],
      ["Reordered", "temp-reorders", "The ranking is unchanged."],
    ]),
  num(m(PC, "transfer-log-loss-gain", "transfer", 7, 60, "Recalibration changes a positive case's predicted probability from $0.98$ to $0.9$ and a negative case's from $0.98$ to $0.9$. What is the change in total log loss over the two cases (new minus old)? Give $4$ decimal places."), -1.5243),
  // 21–30
  mcq(m(PC, "transfer-decision-threshold", "transfer", 8, 60, "A hospital intervenes when $P(\\text{event}) > 0.2$. Patients the model scores at $0.2$ actually have events $35\\%$ of the time. What happens if the model is recalibrated?"),
    "Those patients' probabilities rise to about $0.35$, so more patients cross the $0.2$ threshold and are flagged",
    [
      ["Fewer patients are flagged", "recal-fewer", "The model was underestimating risk, so recalibrated probabilities rise."],
      ["Nothing changes, since ranking is preserved", "recal-nothing", "Ranking is preserved, but a fixed probability threshold now captures more patients."],
      ["The threshold must rise to $0.35$", "recal-threshold", "The clinical threshold stays; the probabilities change."],
    ]),
  mcq(m(PC, "transfer-modern-nets", "transfer", 8, 60, "Large modern neural networks trained with cross-entropy are often:"),
    "Overconfident, which temperature scaling usually corrects well",
    [
      ["Underconfident", "nets-underconfident", "They tend to be overconfident."],
      ["Perfectly calibrated", "nets-calibrated", "They usually need calibration."],
      ["Unable to output probabilities", "nets-no-probs", "Softmax outputs probabilities."],
    ]),
  short(m(PC, "transfer-shift", "transfer", 9, 150, "A model was well calibrated at launch, but a year later its predicted $10\\%$ cases are positive $20\\%$ of the time. What likely happened, and what should be done?"),
    [
      ["shift", "Distribution or prior shift: the base rate or the feature–outcome relationship has changed", 2, true],
      ["action", "Monitor calibration over time, recalibrate on recent labelled data, and retrain if discrimination has also degraded", 2, true],
    ]),
  num(m(PC, "transfer-brier-decomposition", "transfer", 9, 75, "Brier score decomposes as reliability $-$ resolution $+$ uncertainty. With reliability $0.01$, resolution $0.05$ and uncertainty $0.16$, what is the Brier score?"), 0.12),
  mcq(m(PC, "transfer-ensembles-calibration", "transfer", 9, 75, "Why do deep ensembles often give better-calibrated probabilities than a single network?"),
    "Averaging members softens overconfident predictions where they disagree, reflecting model uncertainty",
    [
      ["Each member is perfectly calibrated", "ensemble-each-calibrated", "Members are individually overconfident."],
      ["Ensembles always predict $0.5$", "ensemble-half", "They average, not flatten everything."],
      ["Ensembles don't output probabilities", "ensemble-no-probs", "They average probabilities."],
    ]),
  num(m(PC, "transfer-ece-three", "transfer", 10, 90, "Three bins hold $50\\%$, $30\\%$ and $20\\%$ of predictions, with gaps $0.02$, $0.08$ and $0.20$. What is the ECE?"), 0.074),
  short(m(PC, "transfer-multiclass", "transfer", 10, 180, "How does calibration extend to multiclass classifiers, and why is full multiclass calibration hard to check?"),
    [
      ["notions", "Common notions: top-label (confidence) calibration, per-class calibration, or full calibration of the probability vector", 2, true],
      ["hard", "Full calibration requires matching frequencies for every probability vector, which needs vast data to estimate in many dimensions", 2, true],
    ]),
  mcq(m(PC, "transfer-proper-score", "transfer", 10, 90, "Why is the Brier score a sensible metric for probability quality?"),
    "It's a strictly proper scoring rule, minimised in expectation by reporting the true probabilities",
    [
      ["It's identical to accuracy", "brier-accuracy", "It scores probabilities, not decisions."],
      ["It ignores confidence", "brier-ignores", "It penalises confident errors heavily."],
      ["It only measures ranking", "brier-ranking", "That's AUC."],
    ]),
  num(m(PC, "apply-inverse-temperature", "apply", 3, 25, "After temperature scaling with $T = 2$, a logit is $1.2$. What was the original logit?"), 2.4),
  num(m(PC, "apply-observed-rate", "apply", 2, 20, "Of $250$ cases predicted at about $0.4$, $100$ were positive. What is the observed rate?"), 0.4),
];

// ---------------------------------------------------------------------------
// nested-cross-validation
// ---------------------------------------------------------------------------
const NC = "nested-cross-validation";
const nested: Item[] = [
  // 1–10
  mcq(m(NC, "recall-purpose", "recall", 1, 15, "What is nested cross-validation for?"),
    "Estimating the performance of a whole modelling procedure that includes hyperparameter tuning, without optimistic bias",
    [
      ["Tuning faster", "nested-faster", "It's slower; its point is honesty."],
      ["Replacing the need for data", "nested-no-data", "It reuses the data carefully."],
      ["Training a final model directly", "nested-final-model", "The final model is refitted separately."],
    ]),
  mcq(m(NC, "recall-inner", "recall", 1, 15, "In nested cross-validation, the inner loop:"),
    "Tunes hyperparameters using only the outer loop's training portion",
    [
      ["Estimates final performance", "inner-estimates", "That's the outer loop."],
      ["Uses the outer test fold", "inner-uses-test", "The outer test fold must stay unseen."],
      ["Trains the final deployed model", "inner-final", "It only selects settings per outer fold."],
    ]),
  mcq(m(NC, "recall-outer", "recall", 1, 15, "In nested cross-validation, the outer loop:"),
    "Measures how well the tuned procedure performs on folds never used for tuning",
    [
      ["Chooses hyperparameters", "outer-tunes", "That's the inner loop."],
      ["Shuffles features", "outer-features", "It splits data for evaluation."],
      ["Trains on the test data", "outer-train-test", "Its test folds are held out."],
    ]),
  mcq(m(NC, "recall-bias-name", "recall", 1, 15, "The optimism of reporting the best score from a tuning search is often called:"),
    "Selection bias (the winner's curse)",
    [
      ["Survivorship bias", "nested-survivorship", "The specific effect here is selection bias."],
      ["Label bias", "nested-label", "It's about choosing the maximum."],
      ["Sampling bias", "nested-sampling", "It's selection among many tuned results."],
    ]),
  mcq(m(NC, "recall-final-model", "recall", 2, 20, "After nested CV reports an estimate, how is the deployed model usually obtained?"),
    "Run the tuning procedure (e.g. the inner CV search) on all the data and fit the chosen configuration",
    [
      ["Use the best outer-fold model", "nested-best-fold", "That model saw less data and was selected on a lucky fold."],
      ["Average the outer-fold hyperparameters", "nested-average-hp", "Re-running the procedure on all data is standard."],
      ["Deploy all outer models", "nested-deploy-all", "Not the standard practice."],
    ]),
  mcq(m(NC, "recall-estimates-what", "recall", 2, 20, "Nested cross-validation's final number estimates the performance of:"),
    "The procedure (tune, then fit) rather than one particular hyperparameter setting",
    [
      ["The single best hyperparameter setting", "nested-best-setting", "Different outer folds may pick different settings."],
      ["The training-set fit", "nested-training-fit", "It's held-out performance."],
      ["The inner-loop score", "nested-inner-score", "Inner scores are used only for selection."],
    ]),
  mcq(m(NC, "recall-when", "recall", 2, 20, "Nested CV is most valuable when:"),
    "Data are too limited for a separate untouched test set and hyperparameters must be tuned",
    [
      ["Data are enormous", "nested-enormous", "Then a simple held-out test set suffices."],
      ["No tuning is done", "nested-no-tuning", "Without tuning, ordinary CV is honest."],
      ["Only for regression", "nested-regression", "It applies to any task."],
    ]),
  mcq(m(NC, "recall-also-known", "recall", 2, 20, "Nested cross-validation is sometimes called:"),
    "Double cross-validation",
    [
      ["Leave-one-out", "nested-loocv", "LOOCV is a choice of folds, not nesting."],
      ["Bootstrapping", "nested-bootstrap", "That's resampling with replacement."],
      ["Stratification", "nested-stratification", "That's about class balance in folds."],
    ]),
  num(m(NC, "apply-fits", "apply", 3, 25, "Five outer folds, four inner folds and $10$ hyperparameter settings: how many inner-loop fits are there ($5 \\times 4 \\times 10$)?"), 200),
  num(m(NC, "apply-fits-with-refit", "apply", 3, 30, "Adding one refit of the chosen setting per outer fold to the $200$ inner fits, how many fits in total?"), 205),
  // 11–20
  num(m(NC, "apply-outer-mean", "apply", 3, 25, "Outer-fold accuracies are $0.81$, $0.78$, $0.84$, $0.80$ and $0.82$. What is the nested-CV estimate?"), 0.81),
  num(m(NC, "apply-inner-size", "apply", 4, 35, "With $1{,}000$ examples, $5$ outer folds and $4$ inner folds, how many examples does each inner training set contain?"), 600),
  num(m(NC, "apply-inner-reps", "apply", 4, 30, "With $10$ outer folds, how many times is the full inner search repeated?"), 10),
  num(m(NC, "apply-optimism", "apply", 4, 35, "A flat CV search reports $0.88$, but nested CV reports $0.83$. How large was the optimism?"), 0.05),
  num(m(NC, "apply-sd", "apply", 4, 35, "Outer-fold scores are $0.70$, $0.74$, $0.72$ and $0.76$. What is their sample standard deviation? Give $4$ decimal places."), 0.0258),
  short(m(NC, "explain-flat-bias", "explain", 5, 90, "Why is the best score from a flat cross-validated search an optimistic estimate of performance?"),
    [
      ["selection", "Taking the maximum over many configurations favours those that were lucky on these particular folds", 2, true],
      ["reuse", "The same folds were used both to choose and to evaluate, so the reported score is biased upward", 2, true],
    ]),
  mcq(m(NC, "apply-inside-everything", "apply", 5, 40, "Which steps must be inside the inner loop of nested CV?"),
    "Every data-dependent choice: scaling, feature selection, and hyperparameter search",
    [
      ["Only the model fit", "inner-model-only", "Preprocessing fitted outside leaks information."],
      ["Only hyperparameter search", "inner-search-only", "Fitted preprocessing must also be inside."],
      ["Nothing — preprocessing goes outside", "inner-nothing", "That leaks outer test information."],
    ]),
  short(m(NC, "explain-cost", "explain", 6, 120, "Why is nested cross-validation's cost roughly multiplicative, and how might you reduce it?"),
    [
      ["multiplicative", "The whole inner search (settings × inner folds) is repeated for every outer fold", 2, true],
      ["reduce", "Use fewer folds, random/Bayesian search with fewer settings, early stopping, or a single held-out test set if data are plentiful", 2, true],
    ]),
  mcq(m(NC, "explain-varying-choices", "explain", 6, 50, "Different outer folds selected different hyperparameters. Is that a problem?"),
    "Not necessarily — it shows how variable the tuning is, and nested CV evaluates the procedure, not one setting",
    [
      ["Yes, nested CV is invalid then", "varying-invalid", "Variation is expected and informative."],
      ["Yes, you must use the most frequent choice", "varying-mode", "Not required; the final model is re-tuned on all data."],
      ["It means the data are corrupted", "varying-corrupt", "It reflects selection variability."],
    ]),
  num(m(NC, "transfer-cost-hours", "transfer", 7, 60, "Each fit takes $3$ minutes. Nested CV with $5$ outer folds, $5$ inner folds and $12$ settings (plus a refit per outer fold) takes how many hours?"), 15.25),
  // 21–30
  mcq(m(NC, "transfer-model-comparison", "transfer", 8, 60, "A team compares a tuned gradient-boosted model with a tuned neural network. Why use nested CV for both?"),
    "So each family's estimate includes its own tuning, making the comparison fair rather than favouring the more heavily tuned one",
    [
      ["Because nested CV picks the best family automatically", "nested-picks-family", "It estimates each procedure's performance."],
      ["To avoid training either model", "nested-no-training", "Both are trained many times."],
      ["Because flat CV can't handle neural networks", "flat-no-nn", "It can, but its estimate is biased."],
    ]),
  num(m(NC, "transfer-selection-optimism", "transfer", 8, 75, "$40$ equally good configurations have CV scores with noise standard deviation $0.01$. The expected maximum of $40$ standard normals is about $2.25$. Roughly how much does the best CV score overstate true performance?"), 0.0225),
  short(m(NC, "transfer-large-data", "transfer", 9, 150, "With $500{,}000$ labelled rows, a team plans nested $10 \\times 10$ CV. Argue for a simpler design."),
    [
      ["holdout", "With so much data, a single untouched test set (and a validation split for tuning) gives a precise, unbiased estimate", 2, true],
      ["cost", "Nested $10 \\times 10$ CV would multiply training cost about $100$-fold for little gain in accuracy of the estimate", 2, true],
    ]),
  num(m(NC, "transfer-repeated-nested", "transfer", 9, 75, "Repeating $5 \\times 5$ nested CV with $3$ different random partitions and $8$ settings needs how many inner fits?"), 600),
  mcq(m(NC, "transfer-not-a-model", "transfer", 9, 75, "A colleague asks for “the nested-CV model” to deploy. What is the right answer?"),
    "Nested CV doesn't produce one model; it estimates a procedure. Deploy the result of running that procedure on all the data",
    [
      ["The model from the first outer fold", "nested-first-fold", "No outer-fold model is special."],
      ["The inner-loop winner of the last fold", "nested-last-fold", "That model saw only part of the data."],
      ["An average of all inner models", "nested-average-all", "That isn't the standard procedure."],
    ]),
  num(m(NC, "transfer-variance-est", "transfer", 10, 90, "Outer-fold scores have standard deviation $0.03$ over $5$ folds. A naive standard error is $\\frac{s}{\\sqrt{k}}$. What is it? Give $4$ decimal places."), 0.0134),
  short(m(NC, "transfer-leakage-in-nested", "transfer", 10, 180, "Even with nested CV, a team's estimate was far too high because the same patient appeared in several folds. Explain why nesting didn't prevent this and what does."),
    [
      ["grouping", "Nesting controls tuning bias, not dependence between rows; correlated rows of one patient leak information across folds", 2, true],
      ["fix", "Split by patient (group $k$-fold) in both the outer and inner loops", 2, true],
    ]),
  mcq(m(NC, "transfer-nested-time-series", "transfer", 10, 90, "How should nested CV be adapted for time-series forecasting?"),
    "Use forward-chaining splits in both loops: always tune and test on later periods than the training data",
    [
      ["Shuffle both loops", "nested-ts-shuffle", "Shuffling leaks future information."],
      ["Only nest the inner loop", "nested-ts-inner-only", "Both loops must respect time."],
      ["Time series can't use nested CV", "nested-ts-impossible", "Forward-chaining makes it possible."],
    ]),
  num(m(NC, "apply-outer-test-size", "apply", 2, 20, "With $1{,}200$ examples and $4$ outer folds, how many examples are in each outer test fold?"), 300),
  num(m(NC, "apply-outer-train-size", "apply", 3, 25, "With $1{,}200$ examples and $4$ outer folds, how many examples does each outer training portion hold?"), 900),
];

// ---------------------------------------------------------------------------
// learning-curves
// ---------------------------------------------------------------------------
const LC = "learning-curves";
const learning: Item[] = [
  // 1–10
  mcq(m(LC, "recall-axes", "recall", 1, 15, "A (sample-size) learning curve plots:"),
    "Training and validation error (or score) against the number of training examples",
    [
      ["Loss against epochs", "lc-epochs", "That's a training-history curve, a different plot."],
      ["Precision against recall", "lc-pr", "That's a PR curve."],
      ["Accuracy against threshold", "lc-threshold", "That's a threshold curve."],
    ]),
  mcq(m(LC, "recall-train-rises", "recall", 1, 15, "As training-set size grows, training error typically:"),
    "Rises, because it gets harder to fit more examples perfectly",
    [
      ["Falls to zero", "lc-train-falls", "Fitting more data is harder."],
      ["Stays constant", "lc-train-constant", "It changes with size."],
      ["Becomes negative", "lc-train-negative", "Errors can't be negative."],
    ]),
  mcq(m(LC, "recall-val-falls", "recall", 1, 15, "As training-set size grows, validation error typically:"),
    "Falls, because the model generalises better with more data",
    [
      ["Rises", "lc-val-rises", "More data usually helps generalisation."],
      ["Stays at zero", "lc-val-zero", "It starts high and falls."],
      ["Equals training error always", "lc-val-equals", "They converge only eventually."],
    ]),
  mcq(m(LC, "recall-high-bias", "recall", 1, 15, "Which learning-curve pattern signals high bias?"),
    "Training and validation errors converge quickly to a high value",
    [
      ["A large gap that narrows slowly", "bias-is-variance", "That signals high variance."],
      ["Both errors near zero", "bias-zero", "That's a good fit."],
      ["Validation error far below training error", "bias-inverted", "That's unusual and suggests a problem."],
    ]),
  mcq(m(LC, "recall-high-variance", "recall", 2, 20, "Which pattern signals high variance?"),
    "Low training error with a large gap to validation error that shrinks as data grow",
    [
      ["Both errors high and close", "variance-is-bias", "That's high bias."],
      ["Both errors zero", "variance-zero", "That's ideal."],
      ["Training error above validation error", "variance-inverted", "That's atypical."],
    ]),
  mcq(m(LC, "recall-more-data-bias", "recall", 2, 20, "If a learning curve shows high bias, will more data help much?"),
    "No — both errors have already plateaued; a more flexible model or better features are needed",
    [
      ["Yes, always", "more-data-always", "More data mainly reduces variance."],
      ["Yes, if the data are shuffled", "more-data-shuffled", "Shuffling doesn't reduce bias."],
      ["Only with more epochs", "more-data-epochs", "Bias needs more capacity or better features."],
    ]),
  mcq(m(LC, "recall-multiple-sizes", "recall", 2, 20, "Why is a learning curve computed at several training-set sizes?"),
    "To see the trend — whether validation error is still falling or has levelled off",
    [
      ["Because one size can't be trained", "lc-one-size", "One size gives a single point, not a trend."],
      ["To tune the learning rate", "lc-lr", "It's about data quantity."],
      ["To average out labels", "lc-labels", "It's about the trend with size."],
    ]),
  mcq(m(LC, "recall-log-axis", "recall", 2, 20, "Why is the training-size axis often drawn on a log scale?"),
    "Sizes span orders of magnitude, and gains typically diminish roughly logarithmically",
    [
      ["Errors are negative", "log-negative", "The axis is sample size."],
      ["It hides the gap", "log-hides", "It spreads out small sizes for clarity."],
      ["Learning curves must be linear", "log-linear", "No such requirement."],
    ]),
  num(m(LC, "apply-gap", "apply", 3, 25, "At $5{,}000$ examples, training error is $4\\%$ and validation error $17\\%$. What is the gap in percentage points?"), 13),
  num(m(LC, "apply-gain", "apply", 3, 25, "Validation error falls from $22\\%$ at $1{,}000$ examples to $16\\%$ at $4{,}000$. How many points per quadrupling of data?"), 6),
  // 11–20
  num(m(LC, "apply-extrapolate", "apply", 4, 35, "If validation error keeps falling $6$ points per quadrupling, what does it reach at $64{,}000$ examples, starting from $16\\%$ at $4{,}000$?"), 4),
  num(m(LC, "apply-power-law", "apply", 4, 40, "Validation error follows $E(n) = 2n^{-0.5}$. What is it at $n = 10{,}000$?"), 0.02),
  num(m(LC, "apply-power-law-n", "apply", 4, 40, "Under $E(n) = 2n^{-0.5}$, how many examples are needed for $E = 0.01$?"), 40000),
  num(m(LC, "apply-cost-per-point", "apply", 4, 35, "Collecting $30{,}000$ more labels costs $\\$60{,}000$ and is projected to cut error by $1.5$ points. What is the cost per point of error reduction, in dollars?"), 40000),
  num(m(LC, "apply-subsample-fits", "apply", 3, 25, "A learning curve uses $6$ training sizes with $5$-fold CV at each. How many fits?"), 30),
  short(m(LC, "explain-bias-variance", "explain", 5, 90, "Explain the shapes of the training and validation curves in terms of the bias–variance trade-off."),
    [
      ["training", "With little data the model fits training examples well (low training error), but that fit is dominated by variance", 2, true],
      ["convergence", "As data grow, variance falls so validation error drops, while training error rises; both approach the level set by bias plus noise", 2, true],
    ]),
  mcq(m(LC, "apply-decision", "apply", 5, 40, "Training error $2\\%$, validation error $18\\%$, and the gap is still shrinking at the largest size. What's the best next step?"),
    "Collect more data (or regularise), since the model is still variance-limited",
    [
      ["Use a bigger model", "lc-bigger", "That would increase variance further."],
      ["Stop — the model is optimal", "lc-optimal", "The gap shows room to improve."],
      ["Remove regularisation", "lc-remove-reg", "That increases variance."],
    ]),
  short(m(LC, "explain-noise", "explain", 6, 120, "Why is each point on a learning curve noisy, and how should it be made more reliable?"),
    [
      ["noise", "Each point depends on which examples were sampled and on the validation split", 2, true],
      ["fix", "Average over several random subsamples/folds and show error bars", 2, true],
    ]),
  mcq(m(LC, "explain-epochs-vs-size", "explain", 6, 50, "How does a sample-size learning curve differ from a loss-versus-epoch curve?"),
    "The first varies how much data the model sees; the second tracks one training run over time on fixed data",
    [
      ["They're the same plot", "lc-same-plot", "Their x-axes measure different things."],
      ["The second varies data size", "lc-epochs-data", "Epochs repeat the same data."],
      ["Neither shows validation error", "lc-no-validation", "Both usually show training and validation."],
    ]),
  num(m(LC, "transfer-asymptote", "transfer", 7, 60, "Validation error follows $E(n) = 0.05 + 3n^{-0.5}$. What error floor does it approach as $n \\to \\infty$?"), 0.05),
  // 21–30
  num(m(LC, "transfer-data-for-target", "transfer", 8, 60, "Under $E(n) = 0.05 + 3n^{-0.5}$, how many examples reach $E = 0.08$?"), 10000),
  mcq(m(LC, "transfer-complex-model", "transfer", 8, 60, "Compared with a simple model, a more complex model's learning curve typically shows:"),
    "Lower training error and a larger gap at small sizes, but potentially lower validation error with enough data",
    [
      ["Higher training error everywhere", "complex-higher-train", "More capacity fits training data better."],
      ["No gap at any size", "complex-no-gap", "Flexible models have larger gaps with little data."],
      ["Identical curves", "complex-identical", "Capacity changes the curves."],
    ]),
  short(m(LC, "transfer-budget-decision", "transfer", 9, 150, "A team must choose between a $\\$200{,}000$ labelling project and a $\\$50{,}000$ modelling effort. How would learning curves inform the decision?"),
    [
      ["shape", "If validation error is still falling steeply with data (variance-limited), more labels likely pay off", 2, true],
      ["plateau", "If curves have plateaued (bias-limited), better modelling or features is the better investment; extrapolating the curve estimates the gain per dollar", 2, true],
    ]),
  num(m(LC, "transfer-extrapolation-check", "transfer", 9, 75, "Validation errors are $20\\%$ at $1{,}000$, $14\\%$ at $4{,}000$ and $11\\%$ at $16{,}000$ examples. By how many points did the gain shrink from the first quadrupling to the second?"), 3),
  mcq(m(LC, "transfer-leaky-curve", "transfer", 9, 75, "A learning curve's validation error is already near zero at $50$ examples and stays flat. What should you suspect?"),
    "Leakage or a trivially easy (or mislabelled) validation set, rather than a genuinely solved problem",
    [
      ["The model is perfect", "lc-perfect", "Near-zero error with tiny data is a red flag."],
      ["High bias", "lc-tiny-bias", "High bias shows high error."],
      ["High variance", "lc-tiny-variance", "High variance shows a large gap."],
    ]),
  num(m(LC, "transfer-scaling-exponent", "transfer", 10, 90, "Error falls from $0.2$ to $0.1$ when data grow from $1{,}000$ to $16{,}000$. Assuming $E \\propto n^{-\\alpha}$, what is $\\alpha$?"), 0.25),
  short(m(LC, "transfer-distribution", "transfer", 10, 180, "A learning curve built on last year's data shows plenty of room to improve with more data. Why might buying more of the same data still disappoint in deployment?"),
    [
      ["shift", "If deployment data differ from last year's distribution, extra examples from the old distribution may not reduce error on the new one", 2, true],
      ["check", "Build validation sets from recent/deployment-like data, or collect data matching the target distribution", 2, true],
    ]),
  mcq(m(LC, "transfer-noise-floor", "transfer", 10, 90, "If labels themselves are noisy, what limits how low the validation error can go, however much data is collected?"),
    "The irreducible error from label noise (the Bayes error)",
    [
      ["The model's training speed", "floor-speed", "Speed doesn't set the floor."],
      ["The number of features only", "floor-features", "Label noise sets an absolute floor."],
      ["Nothing — error always reaches $0$", "floor-zero", "Noisy labels make $0$ unreachable."],
    ]),
  num(m(LC, "apply-train-val", "apply", 2, 20, "At the largest size, training error is $9\\%$ and validation error $11\\%$. What is the gap in points?"), 2),
  num(m(LC, "apply-sizes", "apply", 3, 25, "Training sizes double from $500$ each step: $500$, $1{,}000$, $2{,}000$, … What is the $5$th size?"), 8000),
];

// ---------------------------------------------------------------------------
// distribution-shift
// ---------------------------------------------------------------------------
const DS = "distribution-shift";
const shift: Item[] = [
  // 1–10
  mcq(m(DS, "recall-definition", "recall", 1, 15, "Distribution shift means:"),
    "The data a model sees in deployment differ in distribution from its training data",
    [
      ["The model's weights change", "shift-weights", "It concerns the data, not the model."],
      ["The features are rescaled", "shift-scaling", "Scaling is a preprocessing choice."],
      ["The training set is shuffled", "shift-shuffle", "Shuffling doesn't change the distribution."],
    ]),
  mcq(m(DS, "recall-iid", "recall", 1, 15, "Which standard assumption does distribution shift violate?"),
    "That training and deployment data are drawn from the same distribution (i.i.d.)",
    [
      ["That features are normally distributed", "shift-normal", "Normality isn't the core assumption."],
      ["That the model is linear", "shift-linear", "It's about the data distribution."],
      ["That labels are binary", "shift-binary", "Label type is unrelated."],
    ]),
  mcq(m(DS, "recall-covariate", "recall", 1, 15, "In covariate shift, which changes?"),
    "The input distribution $p(\\mathbf{x})$, while $p(y \\mid \\mathbf{x})$ stays the same",
    [
      ["The labelling rule $p(y \\mid \\mathbf{x})$", "covariate-concept", "That's concept drift."],
      ["Only the class proportions $p(y)$", "covariate-label", "That's label shift."],
      ["Nothing", "covariate-nothing", "The inputs' distribution changes."],
    ]),
  mcq(m(DS, "recall-label-shift", "recall", 1, 15, "In label (prior) shift, which changes?"),
    "The class proportions $p(y)$, while $p(\\mathbf{x} \\mid y)$ stays the same",
    [
      ["$p(\\mathbf{x})$ only", "label-is-covariate", "That's covariate shift."],
      ["$p(y \\mid \\mathbf{x})$ with fixed $p(y)$", "label-is-concept", "That's concept drift."],
      ["The feature names", "label-feature-names", "It's about class proportions."],
    ]),
  mcq(m(DS, "recall-concept", "recall", 2, 20, "In concept drift, which changes?"),
    "The relationship between inputs and labels, $p(y \\mid \\mathbf{x})$",
    [
      ["Only the inputs' distribution", "concept-covariate", "That's covariate shift."],
      ["Only the class proportions", "concept-label", "That's label shift."],
      ["Only the number of features", "concept-features", "It's about the input–label relationship."],
    ]),
  mcq(m(DS, "recall-example-covariate", "recall", 2, 20, "A model trained on daytime photos is deployed on night-time photos of the same objects. This is mainly:"),
    "Covariate shift",
    [
      ["Label shift", "night-label", "The class proportions needn't change."],
      ["Concept drift", "night-concept", "What counts as each object hasn't changed."],
      ["No shift", "night-none", "The input distribution clearly changed."],
    ]),
  mcq(m(DS, "recall-example-concept", "recall", 2, 20, "After a policy change, the same customer behaviour now signals fraud where it didn't before. This is:"),
    "Concept drift",
    [
      ["Covariate shift", "policy-covariate", "The inputs may be unchanged; their meaning changed."],
      ["Label shift only", "policy-label", "The input–label relationship changed."],
      ["Feature scaling", "policy-scaling", "Unrelated."],
    ]),
  mcq(m(DS, "recall-monitor", "recall", 2, 20, "Which signal can reveal input drift even before labels arrive?"),
    "Changes in the distributions of the input features or of the model's predictions",
    [
      ["Test accuracy from training time", "monitor-old-accuracy", "That doesn't change after deployment."],
      ["The number of model parameters", "monitor-params", "Parameters are fixed."],
      ["The training loss", "monitor-train-loss", "Training is over."],
    ]),
  num(m(DS, "apply-importance-weight", "apply", 3, 30, "Importance weighting uses $w(\\mathbf{x}) = \\frac{p_{\\text{test}}(\\mathbf{x})}{p_{\\text{train}}(\\mathbf{x})}$. If a region has density $0.3$ at test time and $0.1$ in training, what weight do its training examples get?"), 3),
  num(m(DS, "apply-psi", "apply", 4, 40, "The population stability index sums $(a - e)\\ln\\frac{a}{e}$ over bins. For one bin with expected share $e = 0.2$ and actual share $a = 0.3$, what is its contribution? Give $4$ decimal places."), 0.0405),
  // 11–20
  num(m(DS, "apply-label-shift-odds", "apply", 4, 40, "Under label shift, the positive rate moves from $20\\%$ in training to $50\\%$ in deployment. By what factor should the posterior odds be multiplied ($\\frac{0.5/0.5}{0.2/0.8}$)?"), 4),
  num(m(DS, "apply-adjusted-posterior", "apply", 4, 40, "A model trained at $20\\%$ prevalence outputs $p = 0.5$. After label shift to $50\\%$, with the odds multiplied by $4$, what is the adjusted probability?"), 0.8),
  num(m(DS, "apply-accuracy-drop", "apply", 3, 25, "Accuracy was $0.91$ at launch and $0.79$ six months later. How many points did it drop?"), 12),
  short(m(DS, "explain-why-holdout-fails", "explain", 5, 90, "Why can a carefully built held-out test score overestimate deployment performance?"),
    [
      ["same-distribution", "The held-out set comes from the same distribution and period as the training data", 2, true],
      ["shift", "Deployment data can differ (shift), so the test score doesn't reflect the conditions the model meets later", 2, true],
    ]),
  mcq(m(DS, "apply-gradual-vs-sudden", "apply", 5, 40, "A sensor is recalibrated overnight, instantly shifting its readings. This is:"),
    "Sudden drift",
    [
      ["Gradual drift", "drift-gradual", "The change happened at once."],
      ["Recurring drift", "drift-recurring", "Nothing suggests a repeating pattern."],
      ["No drift", "drift-none", "The input distribution changed."],
    ]),
  short(m(DS, "explain-detect-concept", "explain", 6, 120, "Why is concept drift usually the slowest kind of shift to detect?"),
    [
      ["labels", "It changes $p(y \\mid \\mathbf{x})$, which can only be measured once true labels arrive, often with a delay", 2, true],
      ["inputs", "The inputs may look unchanged, so input-distribution monitoring can miss it", 2, true],
    ]),
  mcq(m(DS, "explain-importance-limits", "explain", 6, 50, "When does importance weighting for covariate shift break down?"),
    "When test inputs fall in regions with little or no training data, making weights huge or undefined",
    [
      ["When $p(y \\mid \\mathbf{x})$ is unchanged", "importance-concept-same", "That's exactly the setting it's designed for."],
      ["When there are many training examples", "importance-many", "Lots of data helps."],
      ["Never", "importance-never", "Poor overlap is a well-known failure."],
    ]),
  num(m(DS, "transfer-ess", "transfer", 7, 60, "Importance weights of $n = 4$ examples are $1$, $1$, $1$ and $5$. The effective sample size is $\\frac{(\\sum w)^{2}}{\\sum w^{2}}$. What is it? Give $4$ decimal places."), 2.2857),
  mcq(m(DS, "transfer-feedback", "transfer", 8, 60, "A credit model declines applicants it scores as risky, so their outcomes are never observed. How does this distort later retraining?"),
    "Labels exist only for approved applicants, so the training data no longer represent the full applicant population (selection bias)",
    [
      ["It doesn't — all outcomes are recorded", "feedback-recorded", "Declined applicants have no repayment outcome."],
      ["It causes label shift only", "feedback-label-only", "It's a selection bias across the input space."],
      ["It improves the model automatically", "feedback-improves", "It can entrench errors."],
    ]),
  num(m(DS, "transfer-psi-total", "transfer", 8, 60, "PSI over three bins with expected shares $0.3$, $0.4$, $0.3$ and actual shares $0.2$, $0.4$, $0.4$ is $\\sum (a - e)\\ln\\frac{a}{e}$. What is it? Give $4$ decimal places."), 0.0693),
  // 21–30
  short(m(DS, "transfer-monitoring-design", "transfer", 9, 150, "Design a monitoring setup for a deployed fraud model that catches the three kinds of shift."),
    [
      ["inputs", "Track input feature distributions (e.g. PSI, KS tests) for covariate shift", 1, true],
      ["predictions-priors", "Track prediction score distributions and estimated class priors for label shift", 1, true],
      ["performance", "Track performance on delayed labels (precision, recall, calibration) for concept drift, with alert thresholds and retraining triggers", 2, true],
    ]),
  num(m(DS, "transfer-label-shift-em", "transfer", 9, 75, "A classifier's average predicted positive rate on new unlabelled data is $0.35$, while its training prevalence was $0.2$. In simple label-shift estimation, what's the naive estimate of the new prevalence?"), 0.35),
  mcq(m(DS, "transfer-domain-classifier", "transfer", 9, 75, "How can a “domain classifier” detect covariate shift?"),
    "Train a model to distinguish training inputs from new inputs; if it succeeds well above chance, the distributions differ",
    [
      ["By predicting the original labels", "domain-original-labels", "It predicts which dataset an input came from."],
      ["By computing accuracy on training data", "domain-train-accuracy", "That doesn't compare distributions."],
      ["It can't", "domain-cant", "It's a standard shift test."],
    ]),
  mcq(m(DS, "transfer-domain-auc", "transfer", 10, 90, "A domain classifier separating training from deployment inputs reaches AUC $0.5$, yet the model's accuracy has collapsed. What is the most likely explanation?"),
    "The inputs haven't shifted, so the problem is concept drift (or label shift): the input–output relationship or class balance changed",
    [
      ["Strong covariate shift", "domain-auc-covariate", "AUC $0.5$ means the inputs are indistinguishable."],
      ["The domain classifier is too accurate", "domain-auc-accurate", "AUC $0.5$ is chance level."],
      ["Nothing has changed", "domain-auc-nothing", "Collapsing accuracy shows something changed."],
    ]),
  short(m(DS, "transfer-robustness", "transfer", 10, 180, "Name two strategies for building models that are more robust to distribution shift, beyond retraining."),
    [
      ["strategies", "E.g. train on diverse data from many environments, data augmentation, invariant/causal features, domain adaptation, or distributionally robust optimisation", 4, true],
    ]),
  mcq(m(DS, "transfer-recommender-loop", "transfer", 10, 90, "A recommender trained on logged clicks only sees clicks on items it chose to show. Why does this create a shift problem?"),
    "The logged data depend on the old policy, so a new policy that shows different items faces inputs and feedback the logs barely cover",
    [
      ["Clicks are always unbiased", "clicks-unbiased", "They're biased by what was shown."],
      ["It only affects the training loss", "loop-training-loss", "It affects what the model can learn and evaluate."],
      ["Recommenders can't experience shift", "recommender-no-shift", "Feedback loops are a classic source of shift."],
    ]),
  mcq(m(DS, "recall-umbrella-term", "recall", 2, 20, "Another common name for distribution shift is:"),
    "Dataset shift",
    [
      ["Data augmentation", "shift-augmentation", "Augmentation is a training technique."],
      ["Feature scaling", "shift-scaling-term", "Scaling is preprocessing."],
      ["Overfitting", "shift-overfitting", "Overfitting is a different failure."],
    ]),
  num(m(DS, "apply-weighted-mean", "apply", 3, 25, "Training examples with losses $2$ and $4$ get importance weights $1$ and $3$. What is the weighted average loss?"), 3.5),
  num(m(DS, "apply-prevalence-change", "apply", 4, 35, "A disease's prevalence rises from $2\\%$ to $6\\%$. By what factor did it change?"), 3),
  num(m(DS, "transfer-psi-threshold", "transfer", 8, 60, "A common rule says PSI above $0.25$ indicates major shift. A feature's PSI rises from $0.08$ to $0.31$. By how much did it exceed the threshold?"), 0.06),
];

export const mlSixty09Items: Item[] = [
  ...featureSelection,
  ...classImbalance,
  ...prCurves,
  ...calibration,
  ...nested,
  ...learning,
  ...shift,
];
