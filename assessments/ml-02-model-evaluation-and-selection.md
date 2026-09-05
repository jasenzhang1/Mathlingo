# Machine Learning Cluster 2 — Model Evaluation & Selection

Multiclass Classification, Confusion Matrices, ROC Curves, K-Fold Cross-Validation, Hyperparameters,
Sensitivity Analysis (6 concepts). Same format as [Cluster 1](ml-01-foundations.md).

`confusion-matrices`' cells map directly onto `type-i-ii-error` from the probability/statistics sweep
— false positive is a Type I error, false negative a Type II error — and this cluster's items make
that correspondence explicit rather than treating precision/recall as a fresh vocabulary.

---

## Multiclass Classification (`multiclass-classification`)
*Prereq: Classification vs Regression · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Define multiclass classification. | predicting one of more than two categories, as opposed to binary classification | — |
| R2 | recall | mcq | −0.45 | The "one-vs-rest" (OvR) strategy works by: | training a separate binary classifier per class (that class vs. everything else), then picking the most confident one | claims it "trains one combined classifier natively" — that's a native multiclass method, not OvR → `multiclass-classification` |
| A1 | apply | short-answer | 0.1 | Using OvR for 5-class digit classification, how many binary classifiers are trained? | 5, one per class | — |
| E1 | explain | short-answer | 0.8 | Distinguish one-vs-rest (OvR) from one-vs-one (OvO), including their classifier counts. | OvR trains K classifiers (each class vs. the rest); OvO trains K(K−1)/2 classifiers (every pair against each other) — OvO can be more expensive for many classes but each pairwise problem is often simpler/more balanced *(required: both counts and the tradeoff)* | — |
| T1 | transfer | short-answer | 1.3 | Why is softmax regression generally preferred over OvR/OvO wrappers for problems with very many classes (e.g. 1000-class image classification)? | softmax natively predicts one probability distribution over all classes simultaneously, avoiding the K or K(K−1)/2 separate classifiers OvR/OvO would require — the wrapper approaches scale poorly as the number of classes grows large *(required: the scaling comparison)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Confusion Matrices (`confusion-matrices`)
*Prereq: Classification vs Regression · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Name the four cells of a binary confusion matrix. | true positive, false positive, true negative, false negative | — |
| R2 | recall | mcq | −0.45 | False positives and false negatives correspond exactly to which earlier concepts? | Type I error (false positive) and Type II error (false negative), from `type-i-ii-error` | treats precision/recall as an unrelated, fresh vocabulary rather than recognizing the direct correspondence → `confusion-matrices` |
| A1 | apply | numeric | 0.1 | TP=80, FP=20, TN=850, FN=50. Compute accuracy, precision, recall. `[verified: 0.93, 0.8, 0.615]` | accuracy=(80+850)/1000=0.93; precision=80/100=0.8; recall=80/130≈0.615 | — |
| E1 | explain | short-answer | 0.8 | Why can 95% accuracy still describe a genuinely useless classifier for a rare-event problem like fraud detection (1% true fraud)? | predicting "not fraud" for every case achieves 99% accuracy trivially while catching zero actual fraud (recall=0) — a devastating critique of accuracy alone as a metric, directly parallel to `power`'s point about low-power studies looking unremarkable despite missing real effects *(required: the trivial-classifier example with its recall)* | — |
| T1 | transfer | short-answer | 1.3 | Which metric — precision or recall — is more directly hurt by false positives, and which by false negatives? Why might a spam filter and a cancer screening test prioritize these differently? | precision (TP/(TP+FP)) is hurt by false positives; recall (TP/(TP+FN)) is hurt by false negatives; a spam filter often prioritizes precision (a legitimate email marked as spam is costly), while a cancer screen prioritizes recall (a missed cancer is far worse than a false alarm) — echoing `type-i-ii-error`'s smoke-detector/spam-filter contrast *(required: both directions and a concrete application pair)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## ROC Curves (`roc-curves`)
*Prereq: Confusion Matrices · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | Define an ROC curve. | true positive rate vs. false positive rate, plotted across every possible classification threshold | — |
| R2 | recall | mcq | −0.35 | The AUC for a random/useless classifier is: | 0.5 | picks 0.0, confusing "useless" with "always wrong" (which would actually be a *perfectly* informative, just inverted, classifier) → `roc-curves` |
| A1 | apply | short-answer | 0.2 | A classifier has AUC=0.95. Good or bad, relative to the random baseline? | very good — far above the 0.5 random baseline, indicating strong discrimination across thresholds | — |
| E1 | explain | short-answer | 0.9 | Why is evaluating across all thresholds, rather than one fixed cutoff, useful? | different applications want different thresholds (e.g. a conservative cutoff to reduce false positives); AUC summarizes performance regardless of which threshold is eventually chosen, rather than committing to one arbitrary default like 0.5 *(required)* | — |
| T1 | transfer | short-answer | 1.4 | Why can ROC/AUC be misleading on a heavily imbalanced dataset (99% negative, 1% positive)? | the false positive rate's denominator is the (huge) count of actual negatives, so even a substantial *absolute* number of false positives looks like a small rate — a precision-recall curve, whose denominators involve the rare positive class directly, is often preferred in such settings *(required: names the denominator-size mechanism, not just "ROC can be misleading")* | — |

*Coverage: 5 items, −0.6…1.4.*

---

## K-Fold Cross-Validation (`k-fold-cross-validation`)
*Prereq: Training vs Validation vs Test Set, Overfitting and Underfitting · ancestors 18 · b₀ = 0.97*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.03 | Describe k-fold cross-validation. | split into k equal folds; train on k−1, validate on the remaining fold, rotating which fold is held out; average the k validation scores | — |
| R2 | recall | mcq | 0.27 | The main advantage over a single train/validation split is: | every data point is used for validation exactly once, giving a more reliable estimate less dependent on one lucky/unlucky split | claims it "eliminates the need for a test set entirely" — cross-validation and a held-out test set serve different purposes → `k-fold-cross-validation` |
| A1 | apply | numeric | 0.77 | With 5-fold CV on 1000 examples, how many are in each validation fold, and how many for training per round? `[verified: 200, 800]` | 200 validation, 800 training per round | — |
| E1 | explain | short-answer | 1.47 | Why does averaging k validation scores give a more reliable estimate than a single split? | this is exactly `sample-mean`'s variance-reduction fact from the probability/statistics sweep, applied here: averaging several noisy estimates (each fold's score) reduces variance compared to relying on one *(required: the direct callback to averaging reducing variance, not just "more data is better")* | — |
| T1 | transfer | short-answer | 1.97 | Why is k-fold CV computationally more expensive than a single split, and when is that tradeoff worth it versus not? | it requires k separate full training runs instead of one; worth it for smaller datasets/cheaper models where the more reliable estimate matters and compute is affordable, but can become prohibitive for very large datasets or expensive models like large neural networks trained k times *(required: both sides of the tradeoff)* | — |

*Coverage: 5 items, −0.03…1.97.*

---

## Hyperparameters (`hyperparameters`)
*Prereq: K-Fold Cross-Validation · ancestors 19 · b₀ = 1.00*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.0 | Define a hyperparameter, with an example. | a setting chosen before training, controlling the learning process or model complexity — not learned directly from data via the optimization process; e.g. learning rate, number of trees, k in KNN | — |
| R2 | recall | mcq | 0.3 | Hyperparameters are typically tuned using: | the validation set (via cross-validation), not the training set | claims they're tuned "the same way model parameters are learned," directly on the training set → `hyperparameters` |
| A1 | apply | short-answer | 0.8 | Is the learning rate a parameter or a hyperparameter? Is the learned weight vector? | learning rate: hyperparameter (set before training); weight vector: parameter (learned from data during training) | — |
| E1 | explain | short-answer | 1.5 | Why can't hyperparameters simply be learned via gradient descent on the training loss, the way parameters are? | letting training loss choose hyperparameters like model complexity would always favor more complexity (lower training loss achievable that way), leading straight to overfitting; hyperparameter tuning needs the separate validation signal precisely because training loss alone is a biased guide for these choices *(required: the "training loss always prefers more complexity" mechanism)* | — |
| T1 | transfer | short-answer | 2.0 | Why does grid search become infeasible as the number of hyperparameters grows, and what's typically used instead? | trying every combination across several hyperparameters blows up exponentially in the number of hyperparameters — the same exponential mechanism as `curse-of-dimensionality`; random search or Bayesian optimization are preferred for tuning many hyperparameters at once, since they don't require exhaustively covering the grid *(required: the explicit exponential-blowup connection)* | — |

*Coverage: 5 items, 0.0…2.0.*

---

## Sensitivity Analysis (`sensitivity-analysis`)
*Prereq: Hyperparameters · ancestors 20 · b₀ = 1.02*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.02 | Define sensitivity analysis. | systematically varying a model's inputs or hyperparameters to see how much the output/performance changes — assessing robustness and which factors matter most | — |
| R2 | recall | mcq | 0.32 | A model whose predictions change wildly with tiny hyperparameter changes is: | sensitive/unstable with respect to that hyperparameter | calls this "well-regularized" — the opposite is true | — |
| A1 | apply | short-answer | 0.82 | Accuracy is 85% at learning rate 0.01, 84% at 0.011, but only 40% at 0.015. What does this suggest, and what caution follows? | a genuinely sensitive/unstable region beyond 0.011, possibly reflecting the onset of divergence; practically, avoid settling on a value too close to this instability boundary even if it currently tests well, since small real-world variations (a different seed, slightly different data) could push performance into the unstable region *(required: the caution about proximity to instability, not just "it's sensitive here")* | — |
| E1 | explain | short-answer | 1.52 | How does sensitivity analysis differ conceptually from ordinary hyperparameter tuning? | tuning searches for the single best validation score; sensitivity analysis instead asks how much performance changes as hyperparameters vary *near* a chosen setting, providing information about the robustness of that choice rather than which choice scores highest *(required: the different question each one asks)* | — |
| T1 | transfer | short-answer | 2.02 | Why should a safety-critical deployment (medical diagnosis, autonomous driving) care about sensitivity analysis even after finding hyperparameters with the best validation score? | a model perched at the edge of an unstable region (as in A1) might behave unpredictably once real-world data drifts even slightly from the validation distribution — the best validation score alone says nothing about how close to a cliff that setting sits *(required: connects to A1's instability-edge risk specifically)* | — |

*Coverage: 5 items, 0.02…2.02.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| OvR and native multiclass methods conflated | `multiclass-classification` |
| confusion-matrix cells treated as unrelated to Type I/II error | `confusion-matrices` |
| ROC baseline (0.5) confused with the "always wrong" extreme (0.0) | `roc-curves` |
| CV believed to replace the need for a held-out test set | `k-fold-cross-validation` |
| hyperparameters tuned directly against training loss | `hyperparameters` |
| grid search assumed to scale linearly in hyperparameter count | `hyperparameters` |
| sensitivity analysis conflated with ordinary tuning | `sensitivity-analysis` |

**Cluster total: 30 items across 6 concepts.** All numeric claims verified.
