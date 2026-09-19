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
| R3 | recall | short-answer | −1.30 | State the general formula for the number of classifiers trained under one-vs-one (OvO), given K classes. | K(K−1)/2 | — |
| R4 | recall | mcq | −0.90 | Softmax regression, unlike OvR/OvO, produces predictions by: | computing one probability distribution over all K classes directly, from a single unified model | picks "training K independent binary classifiers and combining their outputs" — that describes OvR, not softmax's native approach → `multiclass-classification` |
| R5 | recall | short-answer | −1.20 | For OvR with K classes, how is the final predicted class chosen among the K binary classifiers' outputs? | the class whose binary classifier gives the highest confidence/score is selected | — |
| R6 | recall | mcq | −0.80 | One-vs-one (OvO) trains a classifier for: | every pair of classes | picks "every class against all the others combined" — that describes OvR, not OvO → `multiclass-classification` |
| R7 | recall | short-answer | −1.40 | Fill in the blank: one-vs-rest is also commonly called one-vs-___. | all | — |
| R8 | recall | mcq | −1.00 | Which multiclass strategy generally produces more balanced binary sub-problems, especially with many classes? | one-vs-one (OvO), since each sub-problem only involves two classes' worth of examples | picks "one-vs-rest (OvR), since it always uses the full dataset" — OvR's "rest" class can be far larger than the "one" class, creating imbalance → `multiclass-classification` |
| R9 | recall | short-answer | −0.60 | True or false: softmax regression is a native multiclass method, not a wrapper around binary classifiers. | true | — |
| R10 | recall | mcq | −1.35 | For 4-class classification, how many binary classifiers does OvR train? | 4 | picks "6" — that's OvO's count (4·3/2), not OvR's → `multiclass-classification` |
| R11 | recall | short-answer | −0.70 | State one practical downside of one-vs-one as the number of classes grows very large. | the number of classifiers grows quadratically (K(K−1)/2), which can become computationally expensive for many classes | — |
| R12 | recall | mcq | −1.10 | The softmax function converts a vector of raw scores into: | a valid probability distribution (nonnegative, summing to 1) over the classes | picks "a binary yes/no decision for each class independently" — that describes something closer to independent sigmoids per class, not softmax's coupled normalization → `multiclass-classification` |
| R13 | recall | short-answer | −0.50 | True or false: OvR and OvO can both be used with any binary classifier as the underlying building block. | true | — |
| R14 | recall | mcq | −1.45 | For 4-class classification, how many binary classifiers does OvO train? | 6 | picks "4" — that's OvR's count, not OvO's → `multiclass-classification` |
| R15 | recall | short-answer | −0.95 | Fill in the blank: OvR reduces a K-class problem to K separate ___ classification problems. | binary | — |
| R16 | recall | mcq | −0.65 | A key advantage of the OvR strategy is that it: | is computationally cheaper than OvO for a large number of classes, since it needs only K classifiers rather than K(K−1)/2 | picks "always achieves higher accuracy than OvO" — no general accuracy guarantee exists; the actual tradeoff is computational and about class balance → `multiclass-classification` |
| A2 | apply | numeric | −0.55 | For a 6-class classification problem, how many classifiers does OvO train? `[verified: 15]` | 6·5/2=15 | — |
| A3 | apply | numeric | −0.40 | For the same 6-class problem, how many classifiers does OvR train? `[verified: 6]` | 6 | — |
| A4 | apply | short-answer | −0.20 | A 100-class problem needs to be solved with limited compute budget. Which strategy, OvR or OvO, is more likely to be computationally feasible, and why? | OvR — it needs only 100 classifiers, versus OvO's 100·99/2=4,950, which likely exceeds the compute budget | — |
| A5 | apply | short-answer | 0.00 | A 3-class OvR setup gives class-A score 0.2, class-B score 0.7, class-C score 0.1 from the three binary classifiers. Which class is predicted? | class B, since it has the highest confidence score among the three | — |
| A6 | apply | numeric | 0.20 | For a 20-class problem, compute the ratio of OvO's classifier count to OvR's. `[verified: 9.5]` | OvO: 20·19/2=190; OvR: 20; ratio=190/20=9.5 | — |
| E2 | explain | short-answer | 0.20 | Explain why OvR can struggle with class imbalance even on an originally balanced K-class dataset. | for K classes with roughly equal-sized original groups, each OvR binary sub-problem pits one class (1/K of the data) against "the rest" (the other (K−1)/K of the data) — as K grows, this creates an increasingly imbalanced binary sub-problem even though the original multiclass dataset was balanced *(required: the fraction-based imbalance argument, showing it worsens as K grows)* | — |
| E3 | explain | short-answer | 0.35 | Explain why OvO's pairwise sub-problems tend to be easier for the underlying binary classifier than OvR's sub-problems. | each OvO sub-problem only needs to separate two specific classes from each other, often a more homogeneous and separable boundary, while each OvR sub-problem must separate one class from a heterogeneous mixture of all the other classes combined, which can require a more complex decision boundary to draw well *(required: the specific two-classes-versus-heterogeneous-mixture contrast)* | — |
| E4 | explain | short-answer | 0.50 | Explain why softmax regression, despite training only a single unified model, still effectively produces a decision boundary between every pair of classes. | softmax computes a score for every class from shared underlying parameters, and the predicted class is whichever has the highest score; the boundary between any two classes A and B is implicitly wherever their scores cross, which is a real, well-defined boundary even though no separate pairwise model was ever explicitly trained for that specific pair *(required: the implicit-pairwise-boundary-from-shared-parameters argument)* | — |
| E5 | explain | short-answer | 0.65 | Explain why OvR's binary classifiers' raw scores are not always directly comparable to each other, creating a subtlety in choosing "the most confident" prediction. | each of the K binary classifiers in OvR is trained completely independently, potentially on differently-scaled or differently-calibrated score outputs (depending on the base classifier and its specific one-vs-rest training data), so simply comparing raw scores across classifiers can be misleading unless those scores are calibrated onto a common, comparable scale first *(required: names the independent-training/uncalibrated-scores issue specifically)* | — |
| T2 | transfer | short-answer | 1.05 | Why might a practitioner choose OvO specifically when the underlying binary classifier's training time scales poorly with dataset size (e.g. quadratically), even though OvO requires training more classifiers overall than OvR? | if a base classifier's training cost scales badly with the number of examples, OvO's many small pairwise sub-problems (each using only the data from two classes) can actually be cheaper in total than OvR's few but much larger sub-problems (each using the full dataset), despite OvO needing more classifiers in count — the per-classifier cost, not just the classifier count, determines the actual total training time *(required: the per-classifier-cost-versus-classifier-count tradeoff argument)* | — |
| T3 | transfer | short-answer | 1.55 | A 1000-class image classifier trained with softmax achieves strong overall accuracy, but performs poorly distinguishing two visually similar classes buried within the 1000. Why might switching to a dedicated OvO classifier for just that specific pair (as a secondary refinement step) help, without abandoning softmax for the other 998 classes? | softmax's shared parameters must balance discriminating power across all 1000 classes simultaneously, which can leave subtle distinctions between any two visually similar classes under-emphasized relative to the many easier distinctions dominating the overall loss; a dedicated OvO classifier trained specifically and only on those two confusable classes can focus its entire capacity on that one hard boundary, without the diluting influence of the other 998 classes' gradients — a hybrid approach that uses softmax's efficiency broadly and OvO's focus narrowly, exactly where it's needed *(required: names the shared-capacity dilution in softmax and the focused-capacity advantage of a targeted OvO refinement)* | — |

*Coverage: 16/6/5/3 — 30 items, −1.45…1.55.*

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
