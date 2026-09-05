# Machine Learning Cluster 6 — Trees & Ensembles

Decision Tree, Splitting Criteria, Pruning Trees, Ensemble Methods, Bagging, Random Forests, AdaBoost,
Gradient Boosting, XGBoost (9 concepts). Same format as [Cluster 1](ml-01-foundations.md).

`splitting-criteria`'s E1 closes the loop all the way back to the very first pilot file: Gini impurity
for a binary split is *exactly* 2p(1−p), twice the Bernoulli variance from `bernoulli-binomial`, not
merely an analogous formula.

---

## Decision Tree (`decision-tree`)
*Prereq: Classification vs Regression · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Describe a decision tree's prediction mechanism. | a sequence of if-then splits on feature values, recursively partitioning the data, ending in leaf nodes that give a prediction (majority class or average value) | — |
| R2 | recall | mcq | −0.45 | Unlike KNN, decision trees are: | invariant to feature scale, since splits compare relative order within one feature at a time | claims they're "sensitive to feature scale" — directly backwards from KNN's own weakness → `decision-tree` |
| A1 | apply | short-answer | 0.1 | A tree splits on "income > $50,000." Does rescaling income to thousands ("income > 50") change predictions? | no — the threshold rescales correspondingly, but the actual partition of the data (who's above/below) is unchanged, since the split only compares relative ordering *(required)* | — |
| E1 | explain | short-answer | 0.8 | Why are decision trees called "greedy" in how they're built? | at each step, the tree picks the single best split available right now by some criterion, without considering whether a locally-worse split might lead to a better tree several levels down — local, not global, optimality *(required)* | — |
| T1 | transfer | short-answer | 1.3 | Why does a single tree grown to full depth almost always overfit severely, and what two different fixes does this motivate? | an unconstrained tree splits until every leaf is pure, becoming extremely flexible and essentially memorizing the training data — a textbook high-variance, low-bias failure mode per `bias-variance-tradeoff`; this motivates both pruning (simplify one tree) and ensemble methods (combine many trees) as two different fixes for the same underlying problem *(required: names both fixes and that they address the same root cause)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Splitting Criteria (`splitting-criteria`)
*Prereq: Decision Tree · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | Name two common classification splitting criteria. | Gini impurity and entropy (information gain) — both measure how "mixed" the classes are within a node; splits are chosen to maximize the reduction | — |
| R2 | recall | mcq | −0.35 | A perfectly pure node (only one class present) has: | zero impurity | claims it has "maximum impurity" — backwards → `splitting-criteria` |
| A1 | apply | numeric | 0.2 | Compute Gini = 1−Σpᵢ² for a binary node with proportions (0.5, 0.5), then for (0.9, 0.1). `[verified: 0.5, 0.18]` | Gini(0.5,0.5)=1−0.5=0.5 (maximum); Gini(0.9,0.1)=1−0.82=0.18 (much lower, more pure) | — |
| E1 | explain | short-answer | 0.9 | Why is Gini impurity maximized at p=0.5 for a binary split — and what earlier concept does this connect to exactly? | for a binary split, Gini = 1−(p²+(1−p)²) = 2p(1−p) `[verified algebraically]` — *exactly* twice the Bernoulli variance p(1−p) from `bernoulli-binomial`, not a mere resemblance; both are maximized at p=0.5 for the same reason: maximal uncertainty about a single binary outcome *(required: the explicit 2p(1−p) derivation and the Bernoulli-variance identification)* | — |
| T1 | transfer | short-answer | 1.4 | Why is a split producing two perfectly pure children always considered "good" by impurity reduction, regardless of how unbalanced the resulting sizes are (e.g. 990 vs 10)? | the impurity criterion only measures how mixed each child's classes are, not how many points land in each child — a 990/10 split into two pure groups reduces impurity to zero just as effectively as an even split would, which can make a greedy tree choose splits that look "unhelpful" by human intuition yet are mathematically optimal by this criterion *(required: names that size imbalance is simply outside what the criterion measures)* | — |

*Coverage: 5 items, −0.6…1.4.*

---

## Pruning Trees (`pruning-trees`)
*Prereq: Decision Tree, Overfitting and Underfitting · ancestors 19 · b₀ = 1.00*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.0 | Describe pruning. | after growing a tree to full (or near-full) depth, remove branches that don't improve validation performance, to combat overfitting | — |
| R2 | recall | mcq | 0.3 | Pruning is best understood as: | a regularization technique trading some training accuracy for better generalization | describes it as "a way to make training faster" — a possible side effect, not the actual purpose → `pruning-trees` |
| A1 | apply | short-answer | 0.8 | Cost-complexity pruning penalizes tree size with α·\|T\|. What happens to tree size as α increases from 0 toward a large value? | at α=0, no penalty, so the full unpruned tree is "optimal"; as α grows, the penalty for extra leaves increases, favoring smaller trees; as α→∞, the tree shrinks toward a single leaf *(required: all three regimes)* | — |
| E1 | explain | short-answer | 1.5 | Why is the optimal α chosen using validation performance, not training performance? | training loss always prefers less pruning (more leaves lower training error monotonically); this is exactly `hyperparameters`' earlier point that training loss is a biased guide for complexity-controlling choices, requiring a separate validation signal *(required: the direct callback to that hyperparameters argument)* | — |
| T1 | transfer | short-answer | 2.0 | Why do pruning and ensembling (bagging, random forests) represent philosophically different fixes for an overfitting tree? | pruning makes one tree simpler, trading flexibility for reduced variance directly; ensembling instead combines many complex, unpruned trees and reduces variance by averaging out their individual noise, without simplifying any single tree at all *(required: names both mechanisms and that they don't overlap)* | — |

*Coverage: 5 items, 0.0…2.0.*

---

## Ensemble Methods (`ensemble-methods`)
*Prereq: Decision Tree · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | Define ensemble methods. | combining predictions from multiple models to get a better overall prediction than any single model alone | — |
| R2 | recall | mcq | −0.35 | The statistical principle behind why ensembling reduces variance is: | averaging multiple noisy estimates reduces overall variance, per `sample-mean`'s 1/√n scaling | claims "more models always means more overfitting" — the opposite of ensembling's actual variance-reduction effect → `ensemble-methods` |
| A1 | apply | numeric | 0.2 | Averaging 10 independent models each with prediction variance σ², what's the averaged prediction's variance? `[verified: σ²/10]` | σ²/10 — a direct instance of Var(X̄)=σ²/n from `sample-mean` | — |
| E1 | explain | short-answer | 0.9 | Why does ensembling work best when individual models are as independent/diverse as possible? | if all models make the exact same errors (perfectly correlated), averaging does nothing to reduce variance — exactly as averaging perfectly correlated random variables gives no variance reduction, only independent (or weakly correlated) ones benefit *(required: the correlated-variables parallel)* | — |
| T1 | transfer | short-answer | 1.4 | Contrast bagging and boosting's philosophies for achieving ensemble diversity. | bagging trains many models on randomized resamples of the same data, hoping randomness alone produces diversity; boosting trains models sequentially, each deliberately targeting the previous model's specific mistakes — diversity through design, not chance *(required: both mechanisms named, foreshadowing `bagging` and `adaboost`)* | — |

*Coverage: 5 items, −0.6…1.4.*

---

## Bagging (`bagging`)
*Prereq: Ensemble Methods · ancestors 6 · b₀ = 0.47*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.53 | Describe bagging. | train many models, each on a different bootstrap resample of the training data (sampling with replacement), then average or majority-vote their predictions | — |
| R2 | recall | mcq | −0.28 | Bagging primarily reduces: | variance | claims it primarily reduces "bias" — bagging's averaging mechanism targets variance, per `ensemble-methods`' R2 → `bagging` |
| A1 | apply | short-answer | 0.27 | How does bagging apply `bootstrapping`'s exact resampling procedure to create each model's training set? | each model's training set is one bootstrap resample — drawn with replacement, the same size n as the original — of the full training data, exactly as `bootstrapping` defined it *(required: the direct reuse, not a fresh description)* | — |
| E1 | explain | short-answer | 0.97 | Why is bagging especially effective for high-variance, low-bias models (deep trees) but of little benefit for high-bias, low-variance models (linear regression)? | bagging's entire mechanism is variance reduction (R2); it can only help where variance is the dominant problem — a model already suffering mainly from bias gets no benefit from averaging away noise it doesn't have much of *(required)* | — |
| T1 | transfer | short-answer | 1.47 | Explain out-of-bag (OOB) error estimation, and why it's a free alternative to a separate validation set. `[verified: ~37% of points excluded from a given bootstrap sample]` | each bootstrap resample leaves out roughly 1/3 of the original data on average (per (1−1/n)ⁿ→e⁻¹); each point can therefore validate the models that didn't include it in training, giving a built-in performance estimate with no separate held-out set needed *(required: the ~1/3 figure and its source)* | — |

*Coverage: 5 items, −0.53…1.47.*

---

## Random Forests (`random-forests`)
*Prereq: Bagging, Splitting Criteria · ancestors 8 · b₀ = 0.60*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.4 | Describe random forests' extra ingredient beyond bagging. | at each split, only a random subset of features is considered, not all of them — an additional source of randomness that further decorrelates the trees | — |
| R2 | recall | mcq | −0.1 | The feature-subsampling step exists specifically to: | further reduce correlation between the trees | claims it's "mainly to speed up training" — a side effect, not the statistical motivation → `random-forests` |
| A1 | apply | short-answer | 0.4 | Without feature subsampling, why might many bagged trees choose the same dominant feature at the top, even on different bootstrap samples? | the strongest feature typically produces the best split by the impurity criterion regardless of which bootstrap sample is used, so plain bagging can still leave trees more correlated than desired — exactly the correlation problem `ensemble-methods`' E1 warned reduces variance-reduction benefit *(required: the direct callback)* | — |
| E1 | explain | short-answer | 1.1 | Connect feature subsampling directly to `ensemble-methods`' diversity argument. | forcing different random feature subsets at each split makes the resulting trees less correlated with each other than plain bagging alone would produce, giving more effective variance reduction when averaged — a direct application of "diversity maximizes averaging benefit" *(required)* | — |
| T1 | transfer | short-answer | 1.6 | Why are random forests often called a "nearly free lunch," needing little hyperparameter tuning? | averaging many diverse, low-bias trees is inherently robust to exact choices like the number of trees or features sampled per split — more trees essentially never hurts performance, only costs more compute, unlike hyperparameters in methods where a wrong setting can actively harm results *(required: names the "more never hurts" robustness specifically)* | — |

*Coverage: 5 items, −0.4…1.6.*

---

## AdaBoost (`adaboost`)
*Prereq: Ensemble Methods · ancestors 6 · b₀ = 0.47*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.53 | Describe AdaBoost's core mechanism. | train models sequentially; after each, increase the weight of examples the previous model got wrong; combine all models via a weighted vote, with better-performing models getting more say | — |
| R2 | recall | mcq | −0.28 | AdaBoost's approach to diversity differs from bagging's because it: | sequentially and deliberately targets the previous models' mistakes, rather than relying on randomness | claims it "uses random resampling, just like bagging" — missing the entire sequential-targeting mechanism → `adaboost` |
| A1 | apply | short-answer | 0.27 | If an example is correctly classified by the current ensemble, does its weight increase or decrease for the next round? | decrease (relatively) — AdaBoost upweights the *missed* examples specifically, so correctly-classified ones receive relatively less emphasis going forward | — |
| E1 | explain | short-answer | 0.97 | Why does AdaBoost reduce bias, unlike bagging's variance-focused mechanism? | each successive model is explicitly forced to focus on and fix the ensemble's current mistakes, progressively covering more of the true pattern earlier (weaker) models missed — a fundamentally different, sequential-correction mechanism rather than parallel averaging *(required)* | — |
| T1 | transfer | short-answer | 1.47 | Why is AdaBoost more sensitive to noisy/mislabeled data than bagging or random forests? | a genuinely mislabeled point gets "wrong" repeatedly, causing its weight to grow larger and larger across rounds, which can drive later models to overfit specifically to that single bad point in an attempt to satisfy its now-huge weight *(required: the runaway-weight mechanism)* | — |

*Coverage: 5 items, −0.53…1.47.*

---

## Gradient Boosting (`gradient-boosting`)
*Prereq: Ensemble Methods, Gradient Descent · ancestors 16 · b₀ = 0.92*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.08 | Describe gradient boosting's core mechanism. | train models sequentially, each fit to the negative gradient of the loss (for squared error, this is just the residuals) of the current ensemble — gradient descent performed in "function space" | — |
| R2 | recall | mcq | 0.22 | Gradient boosting generalizes AdaBoost by: | allowing any differentiable loss function, by fitting each new model to that loss's gradient | claims it "removes the sequential structure entirely" — gradient boosting is still fully sequential → `gradient-boosting` |
| A1 | apply | short-answer | 0.72 | For squared-error loss, show that fitting to the negative gradient is (up to a constant) the same as fitting to the residuals. `[verified: dL/dF=-2(y-F), negative gradient = 2(y-F), proportional to residual]` | L=(y−F(x))², dL/dF=−2(y−F(x)); the negative gradient is 2(y−F(x)), proportional to the residual (y−F(x)) *(required: the explicit derivative)* | — |
| E1 | explain | short-answer | 1.42 | Why is gradient boosting described as "gradient descent in function space"? | ordinary gradient descent updates a fixed vector of parameters; here, each step *adds an entirely new function* (a tree) to the ensemble, and the "step direction" is a function (the negative gradient evaluated at each training point) rather than a parameter-update vector *(required: the parameter-vector vs. function contrast)* | — |
| T1 | transfer | short-answer | 1.92 | Why is gradient boosting, like AdaBoost but unlike bagging, prone to overfitting with too many rounds, and what's the standard remedy? | each additional round keeps fitting more closely to the current ensemble's residual errors, eventually starting to fit noise rather than signal; practitioners monitor validation performance and use early stopping — halting once it stops improving — as a critical hyperparameter for boosting methods specifically *(required: names early stopping as the specific remedy)* | — |

*Coverage: 5 items, −0.08…1.92.*

---

## XGBoost (`xgboost`)
*Prereq: Gradient Boosting · ancestors 17 · b₀ = 0.95*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.05 | Describe XGBoost in one sentence. | a highly optimized, regularized implementation of gradient boosting, adding explicit complexity penalties to the objective plus significant engineering optimizations for speed and scale | — |
| R2 | recall | mcq | 0.25 | XGBoost's explicit regularization term primarily combats: | the overfitting risk identified in `gradient-boosting`'s T1 (too many/too complex trees) | picks "the curse of dimensionality specifically" — an unrelated concern from regularization's actual purpose here → `xgboost` |
| A1 | apply | short-answer | 0.75 | Why does XGBoost's leaf-count and leaf-value penalty serve a similar purpose to `pruning-trees`' α·\|T\| penalty? | both add an explicit complexity penalty directly into the optimization objective, rather than relying solely on early stopping to control complexity — the same principle applied at a different stage of tree-building *(required: the direct parallel to cost-complexity pruning)* | — |
| E1 | explain | short-answer | 1.45 | Distinguish XGBoost's engineering optimizations from its statistical improvements. | engineering (sparse-data handling, parallelized construction, cache-aware computation) makes the algorithm run faster and at larger scale; the regularization term is a statistical improvement that makes the resulting model generalize better for a given amount of training — two different, complementary kinds of improvement over plain gradient boosting *(required: both categories named and distinguished)* | — |
| T1 | transfer | short-answer | 1.95 | Why have gradient-boosted trees historically dominated tabular-data competitions, while neural networks dominate unstructured data? | decision trees and their ensembles naturally handle mixed, nonlinear relationships among a moderate number of meaningfully-named tabular features without extensive feature engineering; neural networks instead excel at learning hierarchical feature representations from raw, high-dimensional, unstructured signal where hand-crafted features are hard to construct at all *(required: both halves of the contrast)* | — |

*Coverage: 5 items, −0.05…1.95.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| decision trees assumed sensitive to feature scale | `decision-tree` |
| pure-node impurity direction reversed | `splitting-criteria` |
| pruning's α tuned against training rather than validation performance | `pruning-trees` |
| ensembling assumed to worsen overfitting | `ensemble-methods` |
| bagging's variance-vs-bias target confused | `bagging` |
| random forest's feature subsampling reduced to a speed optimization | `random-forests` |
| AdaBoost's sequential targeting conflated with bagging's randomness | `adaboost` |
| gradient boosting's sequential nature assumed removed by generalizing AdaBoost | `gradient-boosting` |
| XGBoost's regularization and engineering improvements conflated | `xgboost` |

**Cluster total: 45 items across 9 concepts.** All numeric claims verified, including the exact
Gini=2p(1−p) identity (matching Bernoulli variance precisely, not approximately) and the ~37%
out-of-bag exclusion rate confirmed at n=100.
