import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 10 — the practical layer between "I have a model"
 * and "I can trust this number". Every concept here was already being referred
 * to by the fifty articles before it without existing as a node of its own.
 */

const featureScaling: WikiArticle = {
  conceptId: "feature-scaling",
  summary:
    "Feature scaling puts features on a comparable numeric range so that no feature dominates a " +
    "computation merely by being measured in larger units. Whether it matters is not a matter of " +
    "taste: it is decided entirely by whether the method combines features into a single number.",

  sections: [
    {
      heading: "The two standard transforms",
      blocks: [
        {
          kind: "formula",
          latex: "standardise:  z = (x − μ) / σ        min-max:  x′ = (x − min) / (max − min)",
          caption: "Zero mean and unit variance, or a fixed [0, 1] range",
        },
        {
          kind: "definitions",
          items: [
            { term: "Standardisation", description: "Centres at 0 with unit standard deviation. The default: unbounded, so it tolerates outliers without compressing everything else into a sliver." },
            { term: "Min-max normalisation", description: "Maps to a fixed interval. Useful when a bounded input is required, and highly sensitive to a single extreme value, which sets the whole range." },
            { term: "Robust scaling", description: "Uses the median and interquartile range instead of mean and standard deviation, so extreme values do not set the scale." },
            { term: "Log or power transform", description: "Changes the shape rather than the range — the right move for a heavily skewed feature, and often needed before standardising is meaningful." },
          ],
        },
      ],
    },

    {
      heading: "Which methods need it, and why",
      blocks: [
        {
          kind: "table",
          headers: ["Method", "Needs scaling?", "Because"],
          rows: [
            ["k-NN, k-means, DBSCAN", "Yes, always", "A distance sums squared differences across features, so the largest-magnitude feature is the distance"],
            ["SVM, RBF and other kernels", "Yes, always", "The margin and the bandwidth are measured in the input metric"],
            ["Gradient descent on any model", "Yes, in practice", "Unequal scales make the loss surface a narrow canyon; the usable step size is set by the steepest direction"],
            ["Ridge, lasso, elastic net", "Yes", "The penalty charges coefficients equally, so a feature in small units gets an artificially large coefficient and pays more"],
            ["PCA", "Usually", "It maximises variance, and variance is in the feature's units — an unscaled large-range feature becomes PC1 by arithmetic"],
            ["Decision trees, forests, boosting", "No", "Each split compares values within one feature, and any monotone rescaling leaves the ordering unchanged"],
            ["Naive Bayes, LDA", "No", "Each feature is modelled with its own distribution and its own parameters"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The rule is: does the method mix features into one number?",
          text:
            "Everything in the \"yes\" column computes a distance, a norm, a dot product or a shared " +
            "step size — a single quantity built from all the features at once, in which units " +
            "decide the weights. Everything in the \"no\" column looks at one feature at a time. " +
            "That single question answers the scaling question for a method you have never met.",
        },
        {
          kind: "example",
          title: "Units choosing the model for you",
          problem:
            "Two features: income in pounds (~30,000) and age in years (~40). What does Euclidean distance actually measure?",
          steps: [
            "A 10-year age gap contributes 10² = 100 to the squared distance.",
            "A £5,000 income gap contributes 5,000² = 25,000,000.",
            "The age term is smaller by a factor of 250,000.",
          ],
          answer:
            "Income distance, plus rounding error. The model has not decided income matters more — the choice of pounds rather than tens of thousands did, and nobody recorded that as a modelling decision.",
        },
      ],
    },

    {
      heading: "Fitting the scaler correctly",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The scaler is fitted, so it belongs inside the split",
          text:
            "A standardiser has parameters — a mean and a standard deviation — estimated from data. " +
            "Fitting it on the full dataset before splitting lets test rows influence how training " +
            "rows are represented, which is textbook leakage. Fit on the training split, then apply " +
            "the same fitted transform to validation and test, and put the whole chain in a pipeline " +
            "so cross-validation refits it per fold.",
        },
        {
          kind: "list",
          items: [
            "Never scale the target and then forget to invert the transform before reporting errors — a common and silent source of nonsense metrics.",
            "Scale after imputation, not before: imputed values should be on the raw scale the imputer was designed for.",
            "One-hot columns are already 0/1; standardising them is harmless but rarely useful, and it destroys sparsity.",
            "At inference time the stored training statistics are used, never statistics recomputed from the incoming batch.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.4 and §14.5.1, standardisation before penalised fitting and PCA" },
    { source: "Géron, Hands-On Machine Learning", locator: "Ch. 2, Feature Scaling and Transformation Pipelines" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-10-practical-modelling.md" },
  ],
};

const featureSelection: WikiArticle = {
  conceptId: "feature-selection",
  summary:
    "Feature selection chooses a subset of the available inputs. The motivation is not tidiness: a " +
    "weakly informative feature adds noise to every distance and every coefficient estimate while " +
    "contributing almost no signal, so removing it can raise accuracy as well as lower cost.",

  sections: [
    {
      heading: "The three families",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Filter methods",
              description:
                "Score each feature against the target independently — correlation, mutual information, a univariate test — and keep the top ones. Fast and model-agnostic; blind to redundancy and to features that matter only in combination.",
            },
            {
              term: "Wrapper methods",
              description:
                "Search subsets by actually fitting the model — forward selection, backward elimination, recursive feature elimination. Directly optimises what you care about, at a cost that is exponential in principle and merely painful in practice.",
            },
            {
              term: "Embedded methods",
              description:
                "Selection falls out of fitting: a lasso penalty drives coefficients to exactly zero, a tree ensemble simply never splits on a useless feature. One fit, and the selection is consistent with the model that will be used.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Filters cannot see interactions, by construction",
          text:
            "Score each of x₁ and x₂ against an XOR target and both score zero — neither is " +
            "informative alone. A filter discards both, and the model then cannot learn the pattern " +
            "at all. Any method that evaluates features one at a time has this blind spot, which is " +
            "the strongest argument for embedded or wrapper approaches when interactions are " +
            "plausible.",
        },
      ],
    },

    {
      heading: "Selection is part of the model, so it must be cross-validated",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The single most expensive mistake in this subject",
          text:
            "Selecting the 100 features most correlated with the target on the full dataset and " +
            "*then* cross-validating produces near-perfect scores on pure noise. The selection step " +
            "already saw every fold's held-out data, so the folds are not held out at all. Selection " +
            "must happen inside the fold, refitted k times, exactly like a scaler.",
        },
        {
          kind: "example",
          title: "How large the illusion is",
          problem:
            "5,000 random features, 50 rows, a random binary label. Pick the 20 features most correlated with the label, then run 10-fold cross-validation on those 20.",
          steps: [
            "With 5,000 pure-noise features and 50 rows, some will correlate strongly with the label by chance alone.",
            "Those are exactly the ones selected — chosen using every row, including the ones each fold will later hold out.",
            "Cross-validation then evaluates a model built on features pre-screened against the answers.",
          ],
          answer:
            "Cross-validated accuracy well above 50% on data with no signal whatsoever. Redo the selection inside each fold and it collapses to chance, which is the correct answer.",
        },
      ],
    },

    {
      heading: "Choosing an approach",
      blocks: [
        {
          kind: "list",
          items: [
            "Correlated features confound every method: they split their apparent importance, so each looks dispensable while the group is not. Selecting on individual scores can drop all of them.",
            "Lasso picks one feature from a correlated group essentially arbitrarily; elastic net keeps the group together, which is usually what a domain expert wants.",
            "Selection is not the only answer to too many features — regularisation and dimensionality reduction keep the information while controlling the variance.",
            "Stability selection — running the procedure on many resamples and keeping features chosen consistently — is a far more defensible basis for a claim about which features matter.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Selection for accuracy and selection for explanation are different jobs",
          text:
            "A subset that predicts well is not the same as a subset that identifies the causes. " +
            "Two correlated features are interchangeable for prediction and emphatically not for " +
            "explanation, and no selection method run on observational data can tell you which of " +
            "them acts. Be explicit about which job you are doing.",
        },
      ],
    },
  ],

  references: [
    { source: "Guyon & Elisseeff, An Introduction to Variable and Feature Selection", locator: "JMLR 3, 2003" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§7.10.2, The Wrong and Right Way to Do Cross-Validation" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-10-practical-modelling.md" },
  ],
};

const classImbalance: WikiArticle = {
  conceptId: "class-imbalance",
  summary:
    "Class imbalance is when one class vastly outnumbers another. It breaks accuracy as a metric, " +
    "biases the fitted decision threshold toward the majority, and starves the model of the " +
    "examples it most needs — three distinct problems that the standard remedies address unequally.",

  sections: [
    {
      heading: "What actually goes wrong",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "The metric breaks: predicting the majority class for everything scores 99% accuracy on a 1% positive rate and catches nothing.",
            "The threshold drifts: a loss summed over examples is dominated by the majority, so the fitted boundary sits where it suits them.",
            "The data is thin: 1% of 1,000 rows is ten positive examples, and no reweighting creates information that ten examples do not contain.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Only the third problem is about imbalance as such",
          text:
            "The first two are ratio problems and are fixed by choosing the right metric and moving " +
            "the threshold — neither requires touching the data. The third is an absolute-count " +
            "problem: 1% of ten million rows is a hundred thousand positives and no difficulty at " +
            "all. Asking \"how many minority examples do I have?\" rather than \"what is the ratio?\" " +
            "usually settles what to do.",
        },
      ],
    },

    {
      heading: "The remedies, and what each actually buys",
      blocks: [
        {
          kind: "table",
          headers: ["Remedy", "Mechanism", "Honest assessment"],
          rows: [
            ["Pick a better metric", "Precision-recall, F-score, expected cost", "Free, and always correct. Do this first"],
            ["Move the threshold", "Choose the operating point on held-out data", "Free, principled, and usually the whole solution"],
            ["Class weights in the loss", "Charge minority errors more", "Cheap and effective; equivalent in spirit to resampling without touching the data"],
            ["Random oversampling", "Duplicate minority rows", "Adds no information; risks memorising the duplicates"],
            ["Random undersampling", "Discard majority rows", "Throws away real data, which is a real cost"],
            ["SMOTE and variants", "Synthesise minority points by interpolation", "Sometimes helps; can manufacture points in regions where the class does not live"],
            ["Collect more minority data", "More actual examples", "The only remedy that adds information, and usually the expensive one"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Resample inside the fold, and never on validation data",
          text:
            "Oversampling before splitting puts copies of the same minority row in both training and " +
            "test, so the model is scored on rows it memorised — one of the most common leakage " +
            "routes there is. Resampling belongs inside the cross-validation fold, applied to the " +
            "training part only, and the held-out part must keep the real class distribution or the " +
            "estimate no longer describes deployment.",
        },
      ],
    },

    {
      heading: "Calibration is the quiet casualty",
      blocks: [
        {
          kind: "prose",
          text:
            "Resampling and class weighting both change the effective class prior the model is fitted " +
            "under, so the probabilities it outputs are calibrated to the *resampled* population " +
            "rather than the real one. If those probabilities feed a downstream expected-cost " +
            "calculation, they are now systematically wrong — inflated toward the minority class. " +
            "Either correct the prior afterwards, or leave the data alone and move the threshold " +
            "instead, which leaves the probabilities intact.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Threshold-moving does everything resampling does, without the side effects",
          text:
            "Training on the real distribution and then choosing an operating point on held-out data " +
            "achieves the same trade between the two error types, keeps every row of real data, " +
            "invents nothing, and leaves calibration untouched. It is worth exhausting before " +
            "reaching for anything that changes the training set.",
        },
      ],
    },
  ],

  references: [
    { source: "He & Garcia, Learning from Imbalanced Data", locator: "IEEE TKDE 21(9), 2009" },
    { source: "Chawla et al., SMOTE: Synthetic Minority Over-sampling Technique", locator: "JAIR 16, 2002" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-10-practical-modelling.md" },
  ],
};

const precisionRecallCurves: WikiArticle = {
  conceptId: "precision-recall-curves",
  summary:
    "A precision-recall curve plots precision against recall as the threshold sweeps. It is the " +
    "curve to read when positives are rare, because neither axis involves true negatives — the " +
    "enormous count that lets an ROC curve look reassuring while a model is unusable.",

  sections: [
    {
      heading: "Why the denominators decide everything",
      blocks: [
        {
          kind: "formula",
          latex: "precision = TP / (TP + FP)      recall = TP / (TP + FN)      FPR = FP / (FP + TN)",
          caption: "Precision and recall never mention TN; the ROC curve's FPR is built on it",
        },
        {
          kind: "example",
          title: "The same model, two very different pictures",
          problem:
            "A million transactions, 1,000 of them fraudulent. At one threshold the model catches 500 frauds and raises 5,000 false alarms.",
          steps: [
            "Recall = 500/1,000 = 0.50.",
            "FPR = 5,000/999,000 ≈ 0.005 — a reassuring 0.5%, close to the top-left of an ROC plot.",
            "Precision = 500/5,500 ≈ 0.091.",
          ],
          answer:
            "Ten analyst hours wasted for every real fraud found. The ROC view calls this excellent; the precision-recall view calls it what it is. Nothing about the model changed — only which denominator the metric used.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "TN is the largest number in the table, and it is doing the flattering",
          text:
            "Under heavy imbalance the negatives dominate the dataset, so any false-positive count " +
            "divided by them is small. Going from 100 to 1,000 false positives barely moves FPR and " +
            "collapses precision from 0.5 to 0.09. Choosing between ROC and precision-recall is " +
            "choosing whether that vast TN count is allowed into the score.",
        },
      ],
    },

    {
      heading: "Reading the curve",
      blocks: [
        {
          kind: "list",
          items: [
            "The baseline is not 0.5: a random classifier has precision equal to the positive rate at every recall, so the chance line sits at 0.01 on a 1% problem. A PR curve must always be read against that baseline.",
            "The curve is not monotone — precision can rise as recall increases — which is why it looks jagged compared with an ROC curve.",
            "Average precision, the area under it, is the usual single-number summary; it weights the high-precision end far more heavily than AUC does.",
            "Linear interpolation between PR points is wrong (the correct interpolation is non-linear), which is why implementations use a step-wise average-precision formula instead.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "PR curves are not comparable across datasets",
          text:
            "The baseline moves with the positive rate, so an average precision of 0.4 is excellent " +
            "on a 1% problem and poor on a 40% one. ROC's baseline is 0.5 regardless, which is the " +
            "one respect in which it is the more portable summary. Compare PR numbers only within a " +
            "fixed class balance.",
        },
      ],
    },

    {
      heading: "Choosing between the two curves",
      blocks: [
        {
          kind: "table",
          headers: ["Situation", "Read"],
          rows: [
            ["Roughly balanced classes", "ROC — its baseline is fixed and interpretation is stable"],
            ["Rare positives, costly false alarms", "Precision-recall — fraud, disease screening, information retrieval"],
            ["Both classes' correct rejections matter", "ROC, or the full confusion matrix"],
            ["The deployed threshold is already fixed", "Neither — report the confusion matrix at that threshold"],
            ["Only a low false-positive region is operationally reachable", "Partial AUC over that region, or precision at a fixed review budget"],
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Saito & Rehmsmeier, The Precision-Recall Plot Is More Informative than the ROC Plot", locator: "PLoS ONE 10(3), 2015" },
    { source: "Davis & Goadrich, The Relationship Between Precision-Recall and ROC Curves", locator: "ICML 2006" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-10-practical-modelling.md" },
  ],
};

const probabilityCalibration: WikiArticle = {
  conceptId: "probability-calibration",
  summary:
    "A model is calibrated when its stated probabilities match observed frequencies: of the cases " +
    "it calls 70% likely, about 70% happen. Calibration is independent of discrimination — a model " +
    "can rank perfectly and still be badly calibrated — and it is what any downstream cost " +
    "calculation actually depends on.",

  sections: [
    {
      heading: "Calibration is not accuracy and not AUC",
      blocks: [
        {
          kind: "prose",
          text:
            "Discrimination asks whether the model puts positives above negatives; calibration asks " +
            "whether the numbers it attaches mean anything. They are separate axes. A model that " +
            "outputs 0.55 for every positive and 0.45 for every negative has perfect AUC and useless " +
            "probabilities. A model that outputs the true probability for every case but cannot " +
            "separate the classes at all is perfectly calibrated and worthless for ranking.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Reliability diagram", description: "Bin predictions by their stated probability and plot observed frequency against it. Perfect calibration is the diagonal; below it means over-confident." },
            { term: "Expected calibration error", description: "The average gap between stated and observed probability across bins, weighted by bin size. Sensitive to the binning choice." },
            { term: "Brier score", description: "Mean squared difference between the stated probability and the 0/1 outcome. A proper scoring rule that decomposes into calibration and refinement." },
            { term: "Log loss", description: "Also a proper scoring rule, and far harsher on confident mistakes — which is why it is the training objective as well as an evaluation one." },
          ],
        },
      ],
    },

    {
      heading: "Why models come out miscalibrated",
      blocks: [
        {
          kind: "table",
          headers: ["Model", "Typical direction", "Cause"],
          rows: [
            ["Naive Bayes", "Wildly over-confident", "Correlated evidence is double-counted, pushing posteriors toward 0 and 1"],
            ["SVM", "No probabilities at all", "Outputs a signed distance; Platt scaling fits a sigmoid to it"],
            ["Modern deep networks", "Over-confident", "Trained to near-zero loss on the training set; capacity outruns the data"],
            ["Random forests", "Under-confident at the extremes", "Averaging votes pulls predictions toward the middle"],
            ["Logistic regression", "Usually well calibrated", "It is fitted by maximising the very likelihood calibration is about"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Resampling for class imbalance decalibrates by construction",
          text:
            "Oversampling or class-weighting changes the effective prior the model is fitted under, " +
            "so its outputs are calibrated to the resampled population rather than the real one — " +
            "inflated toward the minority class. If those numbers feed an expected-cost decision, " +
            "the decision is now systematically wrong.",
        },
      ],
    },

    {
      heading: "Fixing it",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Platt scaling", description: "Fit a one-parameter-per-term logistic function mapping the model's score to a probability. Few parameters, so it works on small calibration sets; assumes a sigmoidal distortion." },
            { term: "Isotonic regression", description: "Fit any non-decreasing mapping from score to probability. Far more flexible, and it overfits on small calibration sets." },
            { term: "Temperature scaling", description: "Divide the logits by a single learned scalar before the softmax. One parameter, leaves the argmax and therefore the accuracy exactly unchanged — the standard fix for deep networks." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Calibration is a monotone rescaling, so ranking survives it",
          text:
            "All three methods map scores to probabilities monotonically. That means AUC is " +
            "unchanged, and so is accuracy at the corresponding threshold — calibration adds " +
            "trustworthy numbers without costing discrimination. It is close to a free improvement, " +
            "which is why it is worth doing whenever probabilities are consumed rather than just " +
            "ranked.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Calibrate on data the model was not fitted on",
          text:
            "Fitting the calibration map on the training set learns to correct distortions the model " +
            "does not exhibit there — its training predictions are already too good. Use a dedicated " +
            "calibration split or a cross-validated calibration procedure, and evaluate the result " +
            "on data used for neither.",
        },
      ],
    },
  ],

  references: [
    { source: "Niculescu-Mizil & Caruana, Predicting Good Probabilities with Supervised Learning", locator: "ICML 2005" },
    { source: "Guo et al., On Calibration of Modern Neural Networks", locator: "ICML 2017" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-10-practical-modelling.md" },
  ],
};

const nestedCrossValidation: WikiArticle = {
  conceptId: "nested-cross-validation",
  summary:
    "Nested cross-validation puts the hyperparameter search inside an outer resampling loop, so " +
    "the reported score estimates the whole selection procedure rather than the performance of its " +
    "luckiest configuration. It is the honest answer to the winner's curse that ordinary " +
    "cross-validation creates.",

  sections: [
    {
      heading: "The problem it solves",
      blocks: [
        {
          kind: "prose",
          text:
            "Search 200 configurations on a cross-validation score and report the best one, and that " +
            "number is biased upward even if all 200 models were identical in true quality — the " +
            "maximum of 200 noisy estimates sits above their common mean. The reported figure " +
            "measures the winner's luck as well as its quality, and the more thoroughly you search, " +
            "the more optimistic it becomes.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The selection is part of the model, so it has to be inside the evaluation",
          text:
            "This is the same principle that puts scalers and feature selection inside the fold. " +
            "Anything fitted using data — including the choice of which model to keep — is a step " +
            "the evaluation must not have seen. Nested cross-validation is that principle applied to " +
            "the search itself.",
        },
      ],
    },

    {
      heading: "The procedure",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Split into K outer folds.",
            "For each outer fold: hold it out; run a complete inner cross-validated hyperparameter search on the remaining data; fit the winning configuration on all of that data; score it once on the held-out outer fold.",
            "Average the K outer scores. That average estimates the performance of the *procedure* — search included — on fresh data.",
            "Separately, run the search once on all the data to obtain the configuration you will actually deploy.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The outer loop does not choose your hyperparameters",
          text:
            "Different outer folds routinely select different configurations, and that is not a bug " +
            "to be resolved by picking the most common one. The outer loop's output is a *number*, " +
            "not a model. If the folds disagree wildly, that is itself a finding — the choice is not " +
            "well determined by this much data.",
        },
        {
          kind: "example",
          title: "What it costs",
          problem: "5 outer folds, 4 inner folds, 6 hyperparameter settings. How many fits?",
          steps: [
            "Inner: 5 × 6 × 4 = 120 fits.",
            "Plus one refit of the winner per outer fold: 5 more.",
            "Plus the final search on all the data, if you count it.",
          ],
          answer:
            "125 fits where a flat cross-validated search would have used 24. That factor is why nested cross-validation is reserved for when the reported number actually matters.",
        },
      ],
    },

    {
      heading: "When it is worth it",
      blocks: [
        {
          kind: "list",
          items: [
            "Worth it when the estimate is the deliverable — a paper, a regulatory submission, a go/no-go decision — and when the dataset is small enough that selection bias is large relative to the effect being claimed.",
            "Not worth it when a genuinely untouched held-out test set is available and large enough: that achieves the same honesty in one fit rather than K times as many.",
            "The bias it removes grows with the number of configurations tried and shrinks with sample size, so a small dataset plus a large search is exactly where it earns its cost.",
            "A cheaper approximation: a single held-out test set, plus the discipline of never returning to change anything after looking at it.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Varma & Simon, Bias in Error Estimation When Using Cross-Validation for Model Selection", locator: "BMC Bioinformatics 7, 2006" },
    { source: "Cawley & Talbot, On Over-fitting in Model Selection and Subsequent Selection Bias", locator: "JMLR 11, 2010" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-10-practical-modelling.md" },
  ],
};

const learningCurves: WikiArticle = {
  conceptId: "learning-curves",
  summary:
    "A learning curve plots training and validation error against the number of training examples. " +
    "Where the two curves end up, and whether they are still moving, answers the question a single " +
    "score cannot: would more data help, and if not, what would?",

  sections: [
    {
      heading: "Reading the two curves",
      blocks: [
        {
          kind: "prose",
          text:
            "Training error rises with sample size — a model fits ten points better than ten " +
            "thousand — while validation error falls. The two converge. Everything diagnostic is in " +
            "where they converge and whether they have stopped moving.",
        },
        {
          kind: "table",
          headers: ["Shape", "Diagnosis", "What to do"],
          rows: [
            ["Both converge to a high error, flat", "High bias: the model class cannot represent the pattern", "Richer model, better features. More data will not help"],
            ["Large persistent gap, validation still falling", "High variance, and the curve has not finished", "More data will help; regularise meanwhile"],
            ["Large gap, validation flat", "High variance that data is no longer fixing", "Regularise, simplify, or improve features"],
            ["Both low and converged", "Well fitted", "Stop — and check for leakage if it is implausibly good"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is the diagnostic that says whether to spend money on data",
          text:
            "\"Would more data help?\" is usually answered by intuition and is expensive to get " +
            "wrong. A learning curve answers it directly: if validation error is still falling at " +
            "the right-hand edge, more data buys accuracy; if it has flattened well above the target, " +
            "no quantity of it will, and the budget belongs elsewhere. Fitting on 10%, 20%, … 100% " +
            "of the data you already have costs a few extra fits and can save a labelling contract.",
        },
      ],
    },

    {
      heading: "Building one properly",
      blocks: [
        {
          kind: "list",
          items: [
            "Subsample the *training* set only. The validation set stays fixed at full size, or the two curves are measuring different things at every point.",
            "Average several random subsamples at each size; a single draw at 10% is extremely noisy, and the noise is what people misread as curvature.",
            "Plot error, not accuracy, when comparing across problems — and keep the y-axis honest rather than zoomed to the last percent.",
            "Stratify the subsamples on the label, or small sizes will occasionally miss a rare class entirely.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Do not confuse this with a training-progress curve",
          text:
            "Deep learning frameworks plot loss against *epochs* and call it a learning curve too. " +
            "That is an optimisation diagnostic — it tells you about convergence and when to stop. " +
            "A learning curve in the sense here has *sample size* on the x-axis and tells you about " +
            "data sufficiency. They answer different questions and are read differently.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§7.2, learning curves and the bias-variance decomposition" },
    { source: "Ng, Machine Learning Yearning", locator: "Ch. 28–30, Diagnosing Bias and Variance with Learning Curves" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-10-practical-modelling.md" },
  ],
};

const distributionShift: WikiArticle = {
  conceptId: "distribution-shift",
  summary:
    "Distribution shift is any change between the data a model was trained on and the data it now " +
    "faces. Every guarantee in supervised learning assumes those are draws from the same " +
    "distribution, so when they are not, held-out performance stops predicting deployed " +
    "performance — usually quietly.",

  sections: [
    {
      heading: "Three kinds, with different fixes",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Covariate shift",
              description:
                "P(x) changes, P(y | x) does not. The inputs move — a new customer segment, a new sensor — but the underlying relationship holds. Fixable by importance weighting, since the thing being learned is still valid.",
            },
            {
              term: "Label shift (prior shift)",
              description:
                "P(y) changes, P(x | y) does not. Disease prevalence rises; what a case looks like does not. A generative model fixes this by swapping the prior; a discriminative one needs its threshold or its outputs adjusted.",
            },
            {
              term: "Concept drift",
              description:
                "P(y | x) itself changes — the relationship the model learned is no longer true. Fraud tactics adapt; a spam filter's signal becomes a spammer's avoided word. Nothing recovers this but new labelled data.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The distinction decides whether unlabelled data is enough",
          text:
            "Covariate and label shift can both be detected and often corrected using unlabelled " +
            "deployment data, because what changed is a marginal you can observe without labels. " +
            "Concept drift cannot: establishing that P(y | x) has changed requires knowing y. That " +
            "is why drift detection systems that monitor only the inputs catch two of the three " +
            "cases and miss the most dangerous one.",
        },
      ],
    },

    {
      heading: "Detecting it",
      blocks: [
        {
          kind: "list",
          items: [
            "Monitor input distributions per feature — a population stability index, or a two-sample test against a training reference — for covariate shift.",
            "Monitor the model's own output distribution: a sudden change in the rate of high-confidence positives is often the earliest visible signal.",
            "Train a classifier to distinguish training rows from recent production rows. If it succeeds easily, the distributions differ, and its feature importances say where.",
            "Where labels arrive eventually — a loan defaults, a diagnosis is confirmed — track performance on that delayed feedback. It is the only thing that detects concept drift directly.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A model can cause the shift it then suffers from",
          text:
            "A deployed model changes the world it observes: a credit model that declines a segment " +
            "never sees whether those applicants would have repaid, so the data it is retrained on " +
            "is shaped by its own past decisions. This feedback loop is not detectable by comparing " +
            "input distributions — the inputs look fine — and it compounds silently across " +
            "retraining cycles.",
        },
      ],
    },

    {
      heading: "Living with it",
      blocks: [
        {
          kind: "list",
          items: [
            "Split by time when evaluating, so the validation estimate already reflects performance on data from after the training period.",
            "Prefer features that are stable over ones that are marginally more predictive but tied to a transient regime.",
            "Retrain on a schedule matched to how fast the domain actually moves, and monitor rather than assume that schedule is right.",
            "Keep a small stream of freshly labelled data — even an expensive trickle — because it is the only instrument that sees concept drift.",
            "A model perched on a sharp optimum is the one that suffers most from a small shift, which is the practical link back to sensitivity analysis.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Quiñonero-Candela et al., Dataset Shift in Machine Learning", locator: "MIT Press, 2009" },
    { source: "Sugiyama & Kawanabe, Machine Learning in Non-Stationary Environments", locator: "Ch. 1–2, Covariate Shift Adaptation" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-10-practical-modelling.md" },
  ],
};

const modelInterpretability: WikiArticle = {
  conceptId: "model-interpretability",
  summary:
    "Interpretability methods explain what a fitted model does. They answer a question about the " +
    "model, not about the world — a distinction that is easy to state, easy to forget, and the " +
    "source of most of the trouble these tools cause.",

  sections: [
    {
      heading: "The standard toolkit",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Permutation importance",
              description:
                "Shuffle one feature and measure how much held-out performance drops. Model-agnostic and directly tied to predictive value. Computed on held-out data, or it measures memorisation.",
            },
            {
              term: "Partial dependence",
              description:
                "Average the prediction over the dataset while sweeping one feature. Shows the marginal shape the model learned, and assumes the swept feature is independent of the others.",
            },
            {
              term: "ICE plots",
              description:
                "The same sweep per individual row rather than averaged. Reveals heterogeneity that a partial dependence plot averages into a misleading flat line.",
            },
            {
              term: "SHAP values",
              description:
                "Attribute a prediction across features using the Shapley value from cooperative game theory — the unique attribution satisfying a set of fairness axioms. Local, additive, and expensive outside tree models.",
            },
            {
              term: "Impurity importance",
              description:
                "A tree ensemble's built-in score. Free, and biased toward high-cardinality and continuous features. Prefer permutation importance.",
            },
          ],
        },
      ],
    },

    {
      heading: "What these tools do not tell you",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Importance is not causation, and no amount of it becomes causation",
          text:
            "A feature can be important because it causes the outcome, because it proxies something " +
            "that does, or because of a quirk of how the data was collected. Every method here " +
            "reports how the *model* uses the feature. Reading \"reduce this feature and the outcome " +
            "will change\" out of an importance ranking is an inference the method does not support, " +
            "and it is the most common way these tools are misused in practice.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Correlated features break attribution in a specific way",
          text:
            "Two strongly correlated features share the credit, so each looks half as important as " +
            "the pair really is — and dropping either changes little, which reads as \"neither " +
            "matters\". Permuting one also creates input combinations that never occur in reality, " +
            "so the model is evaluated off its training manifold and the resulting number is about " +
            "an extrapolation nobody asked for.",
        },
        {
          kind: "prose",
          text:
            "Interpretability is also not one goal. Debugging a model, satisfying a regulator, and " +
            "explaining a decision to the person it affects have different standards of evidence and " +
            "different audiences, and a method that serves one can be inadequate for another. Being " +
            "explicit about which is being attempted usually resolves arguments about whether a " +
            "given explanation is good enough.",
        },
      ],
    },

    {
      heading: "Intrinsic versus post-hoc",
      blocks: [
        {
          kind: "table",
          headers: ["", "Intrinsically interpretable", "Post-hoc explained"],
          rows: [
            ["Examples", "Linear and logistic regression, shallow trees, rule lists, GAMs", "Any model plus SHAP, LIME, permutation importance"],
            ["Fidelity of the explanation", "Exact — the explanation is the model", "Approximate — a simpler story about a complex function"],
            ["Typical accuracy cost", "Sometimes real, often smaller than assumed", "None"],
            ["Failure mode", "May genuinely underfit", "The explanation can be confidently wrong"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Try the interpretable model before assuming you need to explain a black box",
          text:
            "On structured tabular data with well-chosen features, a regularised linear model or a " +
            "generalised additive model is frequently within a point or two of a boosted ensemble. " +
            "When the gap really is that small, an exact explanation beats an approximate one — and " +
            "you find out by fitting it, which costs an afternoon.",
        },
      ],
    },
  ],

  references: [
    { source: "Molnar, Interpretable Machine Learning", locator: "Ch. 8–9, Model-Agnostic Methods and Shapley Values" },
    { source: "Lundberg & Lee, A Unified Approach to Interpreting Model Predictions", locator: "NeurIPS 2017" },
    { source: "Rudin, Stop Explaining Black Box Models for High Stakes Decisions", locator: "Nature Machine Intelligence 1, 2019" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-10-practical-modelling.md" },
  ],
};

const anomalyDetection: WikiArticle = {
  conceptId: "anomaly-detection",
  summary:
    "Anomaly detection finds points unlike the rest. It is usually framed without labels not by " +
    "choice but by necessity: the anomalies are rare, heterogeneous, and the interesting ones have " +
    "not happened yet — which rules out learning what they look like from examples.",

  sections: [
    {
      heading: "Why it is not just a rare-class classification problem",
      blocks: [
        {
          kind: "prose",
          text:
            "A classifier learns what each class looks like. That works for a rare class whose " +
            "examples share a form, and fails for anomalies, which have no form in common — they " +
            "are defined by *not* resembling the normal data. The next novel failure mode will not " +
            "resemble the previous ones, so a model fitted to past anomalies can be excellent on " +
            "them and blind to the one that matters.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Model the normal, and flag the badly explained",
          text:
            "The standard move is to describe the normal data well — a density, a reconstruction, a " +
            "neighbourhood structure — and score each point by how poorly that description accounts " +
            "for it. This requires no anomaly examples at all, which is the whole reason for it, and " +
            "it generalises to anomaly types never observed.",
        },
      ],
    },

    {
      heading: "The main approaches",
      blocks: [
        {
          kind: "table",
          headers: ["Approach", "Score", "Suits"],
          rows: [
            ["Density estimation (Gaussian, KDE, GMM)", "Low probability under the fitted density", "Low dimension, roughly parametric normal data"],
            ["Distance / neighbour-based (k-NN, LOF)", "Far from its neighbours, or in a sparser region than they are", "Moderate dimension; LOF handles varying density"],
            ["One-class SVM", "Outside a fitted boundary enclosing the normal data", "Moderate dimension, non-parametric shapes"],
            ["Isolation Forest", "Isolated by few random splits", "High dimension, large n; fast and a strong default"],
            ["Reconstruction-based (PCA, autoencoder)", "Large reconstruction error", "High dimension with strong structure — images, sensor arrays"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Isolation Forest inverts the usual logic",
          text:
            "Rather than modelling the normal data and measuring departure from it, it partitions " +
            "the space with random splits and asks how few are needed to isolate each point. " +
            "Anomalies sit in sparse regions and separate almost immediately, so the score is " +
            "average path length. It needs no density estimate and no distance metric, which is " +
            "exactly why it survives high dimensions where both degrade.",
        },
      ],
    },

    {
      heading: "The hard parts",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Evaluation is the real difficulty",
          text:
            "Without labels there is nothing to score against, and with a handful of labelled " +
            "anomalies any estimate has enormous variance — one missed case moves recall by a large " +
            "fraction. Where some labels exist, average precision on them is the usual compromise, " +
            "reported with an honest interval. Where none do, the defensible checks are stability " +
            "across resamples and expert review of the top-ranked flags.",
        },
        {
          kind: "list",
          items: [
            "The threshold is a business decision, not a statistical one: it is set by how many investigations per day are affordable, which makes precision at a fixed budget the natural metric.",
            "Contamination — anomalies present in the training data — biases the fitted notion of normal toward including them. Robust estimators and trimming help.",
            "In high dimensions distance and density both degrade, so an anomaly may be unremarkable on every individual feature and clearly odd only in combination.",
            "\"Anomalous\" and \"interesting\" are different: a sensor glitch and a genuine failure both score highly, and only domain knowledge separates them.",
            "Time matters — a value normal in December and anomalous in July needs the seasonal structure modelled before anything is flagged.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Chandola, Banerjee & Kumar, Anomaly Detection: A Survey", locator: "ACM Computing Surveys 41(3), 2009" },
    { source: "Liu, Ting & Zhou, Isolation Forest", locator: "ICDM 2008" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-10-practical-modelling.md" },
  ],
};

export const ml10PracticalModelling: WikiArticle[] = [
  featureScaling,
  featureSelection,
  classImbalance,
  precisionRecallCurves,
  probabilityCalibration,
  nestedCrossValidation,
  learningCurves,
  distributionShift,
  modelInterpretability,
  anomalyDetection,
];
