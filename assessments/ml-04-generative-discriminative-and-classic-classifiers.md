# Machine Learning Cluster 4 — Generative/Discriminative & Classic Classifiers

Generative vs Discriminative Models, Naive Bayes, Linear Discriminant Analysis, K Nearest Neighbors,
Support Vector Machine, SVMs for Regression (6 concepts). Same format as
[Cluster 1](ml-01-foundations.md). This cluster is lighter on closed-form numeric items and heavier on
mechanism — no item here rests on an unverified arithmetic claim.

---

## Generative vs Discriminative Models (`generative-vs-discriminative-models`)
*Prereq: Classification vs Regression · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Distinguish generative from discriminative models. | generative: models the full joint P(X,Y) (often via P(X\|Y) and P(Y)); discriminative: models P(Y\|X) directly, focusing only on the decision boundary | — |
| R2 | recall | mcq | −0.45 | A key practical advantage of generative models is: | they can generate new synthetic data samples, since they model the full joint distribution | claims they're "always more accurate at classification" — not a general guarantee, and not the actual distinguishing superpower → `generative-vs-discriminative-models` |
| A1 | apply | short-answer | 0.1 | Is logistic regression generative or discriminative? Naive Bayes? | logistic regression: discriminative (models P(Y\|X) directly); naive Bayes: generative (models P(X\|Y) and P(Y), combines via Bayes' rule) | — |
| E1 | explain | short-answer | 0.8 | Why can a generative model always derive P(Y\|X) via Bayes' rule, while a discriminative model generally can't recover P(X) or generate new data? | having modeled the full joint P(X,Y), a generative model can compute *any* conditional or marginal from it, including P(Y\|X); a discriminative model only ever modeled P(Y\|X) and has no representation of P(X) at all to draw from *(required: the "has vs. lacks a representation of P(X)" argument)* | — |
| T1 | transfer | short-answer | 1.3 | Why does a modern generative image model need something like P(X) (the full distribution of images), while a discriminative image classifier only needs P(Y\|X)? | generating a *new*, realistic image requires sampling from a model of what images look like overall — P(X); a classifier only ever needs to map a *given* image to a label, never needing to represent the space of all possible images *(required: connects the classic distinction to why generative AI needs a fundamentally different objective than classification)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Naive Bayes (`naive-bayes`)
*Prereq: Bayes' Rule, Generative vs Discriminative Models · ancestors 11 · b₀ = 0.74*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.26 | State naive Bayes' "naive" assumption. | features are conditionally independent given the class label | — |
| R2 | recall | mcq | 0.04 | Naive Bayes is called "naive" because: | it makes the often-unrealistic assumption that features are independent given the class | treats "naive" as a comment on the algorithm's sophistication rather than the specific independence assumption → `naive-bayes` |
| A1 | apply | short-answer | 0.54 | For a spam classifier, naive Bayes assumes "free" and "money" are independent given spam status. Why is this technically false, yet the classifier often still works reasonably well? | spam emails saying "free" plausibly also say "money" more often — genuinely correlated even within the spam class, violating the assumption; despite this, the classifier often ranks classes correctly in practice because the *relative ordering* of posterior probabilities can survive even when the assumption is technically wrong *(required: names both the violation and why it can still work)* | — |
| E1 | explain | short-answer | 1.24 | Why does the conditional independence assumption make naive Bayes' computation dramatically simpler? | estimating the full joint P(x₁,…,xₙ\|y) needs exponentially many parameters as features grow; assuming independence reduces this to estimating each P(xᵢ\|y) separately — linear in the number of features, directly sidestepping `curse-of-dimensionality`'s exponential blowup for joint distributions *(required: the exponential-vs-linear contrast, tied to curse of dimensionality)* | — |
| T1 | transfer | short-answer | 1.74 | Using Bayes' rule directly, explain how naive Bayes combines the simplified likelihood with the prior to get the posterior needed for classification. | P(y\|x₁,…,xₙ) ∝ P(y)·Π P(xᵢ\|y) — the prior P(y) times the naively-factored likelihood, an exact instance of `bayes-rule`'s formula with the likelihood term simplified *(required: the explicit Bayes'-rule framing, naming both pieces)* | — |

*Coverage: 5 items, −0.26…1.74.*

---

## Linear Discriminant Analysis (`lda`)
*Prereq: Multivariate Normal, Generative vs Discriminative Models · ancestors 40 · b₀ = 1.36*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.36 | State LDA's generative assumption, and what makes its boundary linear. | each class's features are multivariate Normal; crucially, all classes *share the same covariance matrix*, differing only in their means — this shared covariance is exactly what makes the resulting decision boundary linear | — |
| R2 | recall | mcq | 0.66 | Dropping the shared-covariance assumption (each class gets its own covariance) gives: | Quadratic Discriminant Analysis (QDA), with a curved decision boundary | calls the result "still LDA" — a genuinely different method with a different boundary shape → `lda` |
| A1 | apply | short-answer | 1.16 | Why does sharing one covariance matrix but allowing different means produce a *linear* boundary between two classes? | the boundary is where the two classes' Gaussian densities are equal; with equal covariance, the quadratic terms in each Gaussian's exponent cancel exactly, leaving only a linear equation in x *(required: the cancellation argument specifically, not just "LDA is linear by definition")* | — |
| E1 | explain | short-answer | 1.86 | Why is LDA a generative model despite ultimately producing a classification boundary? | it models the full P(X\|Y) for each class (as a multivariate Normal) and combines with a prior P(Y) via Bayes' rule, the same generative structure as `naive-bayes`, rather than modeling P(Y\|X) directly *(required: the direct parallel to naive Bayes' generative structure)* | — |
| T1 | transfer | short-answer | 2.36 | Give a scenario where LDA's shared-covariance assumption is a poor fit, and explain why QDA might fit better despite needing more parameters. | two classes with genuinely different amounts of internal spread violate the shared-covariance assumption; QDA's per-class covariances reduce this bias, but estimating more covariance parameters per class increases variance, especially with limited data per class — a direct instance of the bias-variance tradeoff *(required: the explicit bias-variance framing of the QDA tradeoff)* | — |

*Coverage: 5 items, 0.36…2.36.*

---

## K Nearest Neighbors (`knn`)
*Prereq: Classification vs Regression, Curse of Dimensionality · ancestors 5 · b₀ = 0.40*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.6 | Describe the KNN prediction rule. | find the K closest training points to a new point, and take a majority vote (or average, for regression) among their labels | — |
| R2 | recall | mcq | −0.35 | KNN is called "lazy learning" because: | it does essentially no work at training time (just stores the data) and does all its computation at prediction time | claims it "requires no computation at prediction time" — the opposite; that's exactly when all the work happens → `knn` |
| A1 | apply | short-answer | 0.2 | As K increases from 1 toward N, does the decision boundary get smoother or more jagged? What does this imply for bias and variance? | smoother as K increases (at the extreme K=N, every point gets the same, majority-class prediction — very high bias, low variance); small K (e.g. K=1) gives a jagged, low-bias, high-variance fit sensitive to individual noisy points *(required: both extremes and their bias-variance character)* | — |
| E1 | explain | short-answer | 0.9 | Why does KNN suffer badly from the curse of dimensionality? | in high dimensions, per `curse-of-dimensionality`, all points start looking roughly equidistant, so "nearest" neighbors become increasingly uninformative as dimensionality grows — directly undermining KNN's core mechanism *(required: the direct callback, not a fresh restatement)* | — |
| T1 | transfer | short-answer | 1.4 | Why does KNN essentially require feature scaling, unlike decision trees? | without scaling, a feature measured in large units (income in dollars, tens of thousands) would completely dominate the distance calculation over a feature in small units (age in years, 0–100), even if age is actually more predictive — decision trees split on one feature at a time and are unaffected by scale, but KNN's distance metric mixes all features together *(required: the concrete large-vs-small-unit example, and the decision-tree contrast)* | — |

*Coverage: 5 items, −0.6…1.4.*

---

## Support Vector Machine (`svm`)
*Prereq: Kernel, Classification vs Regression · ancestors 8 · b₀ = 0.60*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.4 | Describe SVM's core idea. | find the separating hyperplane that maximizes the margin — the distance to the nearest points of each class ("support vectors") — not just any separating boundary | — |
| R2 | recall | mcq | −0.1 | The support vectors are: | only the training points closest to the boundary, which alone determine where it's placed | claims "all the training points" are support vectors — most points, once the model is fit, are irrelevant to where the boundary sits → `svm` |
| A1 | apply | short-answer | 0.4 | If a training point far from the boundary (not a support vector) is removed and the SVM re-trained, does the boundary change? | no — non-support-vector points have no influence on the final boundary; only the support vectors matter *(required: the "no change" answer with the reasoning, not just a guess)* | — |
| E1 | explain | short-answer | 1.1 | Why does maximizing the margin, rather than finding any separating boundary, tend to generalize better to new data? | a boundary with a large buffer zone is less likely to misclassify a new test point that falls slightly off from where the training points sat, compared to a boundary that barely squeezes between the classes with no room to spare *(required)* | — |
| T1 | transfer | short-answer | 1.6 | Why does the kernel trick let SVM find nonlinear boundaries efficiently, without ever explicitly computing the (potentially infinite-dimensional) transformed features? | a kernel function computes the inner product *as if* the data had been mapped into a higher-dimensional space, without ever materializing that mapping — the SVM optimization only ever needs these inner products, never the transformed vectors themselves *(required: names that only inner products are needed, not the explicit mapping)* — exactly why `kernel` is SVM's prerequisite | — |

*Coverage: 5 items, −0.4…1.6.*

---

## SVMs for Regression (`svms-for-regression`)
*Prereq: Support Vector Machine · ancestors 9 · b₀ = 0.65*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.35 | Describe SVR's core idea. | fit a function so that as many points as possible fall within an ε-tolerance "tube" around it, ignoring errors smaller than ε; only points *outside* the tube incur a penalty and become support vectors | — |
| R2 | recall | mcq | −0.05 | The ε parameter in SVR controls: | how wide the no-penalty tube around the prediction is | confuses it with "the learning rate" — an unrelated optimization-algorithm parameter → `svms-for-regression` |
| A1 | apply | short-answer | 0.45 | With a very large ε (wide tube), do more or fewer points become support vectors? What does this imply about model flexibility? | fewer — more points fall comfortably inside the wide tube; this generally gives a simpler, less flexible fit, trading some accuracy on fine-grained variation for reduced sensitivity — a bias-variance tradeoff *(required: the direction and the bias-variance framing)* | — |
| E1 | explain | short-answer | 1.15 | What is the conceptual parallel between SVR's ε-tube and ordinary SVM's margin? | both define a buffer zone incurring no penalty; only points outside the zone (the "support vectors" in each case) actually influence or determine the final fitted function *(required: the direct margin/tube parallel)* | — |
| T1 | transfer | short-answer | 1.65 | Why might SVR be preferred over ordinary least-squares regression for data with occasional large outliers? | SVR's loss depends only on how far *outside* the ε-tube a point falls, giving it a degree of robustness to outliers; ordinary least-squares' squared-error loss penalizes large errors quadratically (per `loss-functions`), making it highly sensitive to even a single large outlier *(required: the explicit callback to squared error's quadratic penalty)* | — |

*Coverage: 5 items, −0.35…1.65.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| generative model advantage misattributed to accuracy rather than data generation | `generative-vs-discriminative-models` |
| "naive" mistaken for a comment on sophistication rather than the independence assumption | `naive-bayes` |
| LDA and QDA conflated | `lda` |
| KNN's lazy-learning timing (training vs. prediction cost) reversed | `knn` |
| all training points assumed to be support vectors | `svm` |
| SVR's ε confused with an optimization learning rate | `svms-for-regression` |

**Cluster total: 30 items across 6 concepts.** No item in this cluster rests on an unverified numeric
claim — the content here is entirely mechanism and geometry, checked for correctness by construction
rather than by script.
