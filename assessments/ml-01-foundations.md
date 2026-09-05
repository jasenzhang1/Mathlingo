# Machine Learning Cluster 1 — Foundations

ML Introduction, Loss Functions, Types of ML, Supervised vs Unsupervised, Classification vs
Regression, Curse of Dimensionality, Training/Validation/Test Set, Data Leakage (8 concepts). Same
table format as the linear-algebra clusters (e.g. [la-01](la-01-vectors-and-operations.md)), 5 items
per concept.

---

## Machine Learning Introduction (`ml-introduction`)
*Root · ancestors 0 · b₀ = −0.50*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.5 | Define machine learning in one sentence. | a system that improves its performance on a task from data/experience, rather than following explicitly hand-coded rules for that task | — |
| R2 | recall | mcq | −1.2 | ML differs from traditional rule-based programming in that: | ML *learns* the rules/patterns from data rather than having them hand-coded | claims "ML requires more code to be written by hand" — usually the reverse | — |
| A1 | apply | short-answer | −0.75 | Classify: (a) a spam filter using a hand-written banned-keyword list (b) a spam filter trained on millions of labeled emails. | (a) traditional programming; (b) machine learning | — |
| E1 | explain | short-answer | 0.0 | Why does ML tend to outperform hand-coded rules for tasks where the rules are hard to *articulate*, even when a human can easily recognize examples? | recognizing "what makes a handwritten 7 look like a 7" draws on pattern regularities that are easy to demonstrate but extremely hard to write down as explicit if-then rules; ML infers those regularities from many examples instead of requiring them to be stated in advance *(required)* | — |
| T1 | transfer | short-answer | 0.5 | Why is "machine learning" best understood as a spectrum of automation in decision logic, rather than a strict binary category? | many real systems mix hand-specified rules with learned components (e.g. a rule-based filter that defers ambiguous cases to a learned model) — the amount of logic that's learned versus specified varies continuously, not as an on/off switch *(required: a concrete mixed example)* | — |

*Coverage: 5 items, −1.5…0.5.*

---

## Loss Functions (`loss-functions`)
*Prereq: ML Introduction · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Define a loss function and its role in training. | a number quantifying how wrong a prediction is for a given example; training minimizes it (typically via gradient descent) | — |
| R2 | recall | mcq | −0.9 | A good loss function should: | be lower for better predictions and higher for worse ones | claims it should "always output negative numbers" — an arbitrary, unnecessary requirement → `loss-functions` |
| A1 | apply | numeric | −0.35 | For squared error L(y,ŷ)=(y−ŷ)², compute the loss for y=5, ŷ=3. `[verified: 4]` | (5−3)²=4 | — |
| E1 | explain | short-answer | 0.35 | Why does squared error penalize large errors disproportionately more than small ones? `[verified: error 4 vs error 2 gives loss 16 vs 4, a 4x jump for a 2x larger error]` | squaring means doubling the error quadruples the loss (2²=4 vs 4²=16) rather than merely doubling it — large errors are punished much more than proportionally, which is exactly why squared loss is sensitive to outliers *(required: the concrete 4x-for-2x scaling)* | — |
| T1 | transfer | short-answer | 0.85 | Why might a house-price predictor prefer squared-error loss, while a loan-approval model prefers a different loss tailored to probability-like outputs? | squared error is well-suited to raw numeric targets where large misses are especially costly (house prices); a probability-valued output (approve/deny) calls for a loss built around probabilities themselves, like cross-entropy — a mismatch here foreshadows why `cross-entropy-loss` exists as a separate concept *(required: names the probability-output mismatch specifically)* | — |

*Coverage: 5 items, −1.15…0.85.*

---

## Types of Machine Learning (`types-of-machine-learning`)
*Prereq: ML Introduction · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Name the three broad categories of machine learning. | supervised, unsupervised, reinforcement learning | — |
| R2 | recall | mcq | −0.9 | Reinforcement learning differs from supervised learning in that: | it learns from delayed reward signals through interaction with an environment, rather than from labeled examples | claims it "uses no data at all" — RL still learns from data, just data generated through interaction → `types-of-machine-learning` |
| A1 | apply | short-answer | −0.35 | Classify: (a) learning chess by playing many games and observing win/loss outcomes (b) predicting house prices from labeled past sales (c) grouping customers with no predefined labels. | (a) reinforcement; (b) supervised; (c) unsupervised | — |
| E1 | explain | short-answer | 0.35 | Why is "having labels" the sharpest defining line specifically between supervised and unsupervised learning? | supervised learning's entire objective is defined by matching known labels; unsupervised learning has no such target to match against, only structure to discover — reinforcement learning is kept separate because its feedback is delayed and interactive rather than either present-or-absent labels *(required)* | — |
| T1 | transfer | short-answer | 0.85 | Give a real task that could be framed as either supervised or unsupervised learning depending on available data (e.g. fraud detection). Explain what determines the framing. | fraud detection with labeled past fraud cases is supervised; without labels, it becomes unsupervised anomaly/cluster detection — the *available data*, not the underlying task, determines which category applies *(required: names the data availability as the deciding factor)* | — |

*Coverage: 5 items, −1.15…0.85.*

---

## Supervised vs Unsupervised Learning (`supervised-vs-unsupervised-learning`)
*Prereq: Types of Machine Learning · ancestors 2 · b₀ = 0.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.95 | Define supervised and unsupervised learning. | supervised: learning a mapping from inputs to known outputs/labels; unsupervised: finding structure in unlabeled data | — |
| R2 | recall | mcq | −0.7 | Clustering is: | unsupervised | picks "supervised," missing that clustering uses no labels at all → `supervised-vs-unsupervised-learning` |
| A1 | apply | short-answer | −0.15 | Is PCA supervised or unsupervised? | unsupervised — it uses no outcome/label information, per `pca-matrix-edition`'s T1 in the linear-algebra sweep | — |
| E1 | explain | short-answer | 0.55 | Why is unsupervised learning generally harder to *evaluate* than supervised learning? | supervised learning has ground-truth labels to directly measure predictions against; unsupervised learning has no such reference, so "how good" a clustering or structure discovery is often requires indirect or subjective criteria *(required)* | — |
| T1 | transfer | short-answer | 1.05 | Why might a company with lots of raw data but few labels start with an unsupervised approach before investing in supervised modeling? | clustering or other unsupervised exploration can reveal structure in the data cheaply, without the expensive process of labeling, helping decide where labeling effort would even be worthwhile *(required)* | — |

*Coverage: 5 items, −0.95…1.05.*

---

## Classification vs Regression (`classification-vs-regression`)
*Prereq: Supervised vs Unsupervised Learning · ancestors 3 · b₀ = 0.19*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.81 | Distinguish classification from regression. | classification predicts a discrete category; regression predicts a continuous numeric value | — |
| R2 | recall | mcq | −0.55 | Predicting a house's exact sale price is: | regression | treats it as classification, perhaps by analogy to predicting a price *bucket* (which genuinely would be classification) → `classification-vs-regression` |
| A1 | apply | short-answer | 0.0 | Classify: (a) tomorrow's temperature in degrees (b) whether it will rain (c) a customer's total lifetime spend (d) a customer's segment label. | (a) regression (b) classification (c) regression (d) classification | — |
| E1 | explain | short-answer | 0.69 | Why can the same underlying task be reframed as either regression or classification, and why does that choice matter? | predicting an exact numeric quantity (regression) versus which bucket it falls into (classification) are different framings of related information; the choice determines which loss function and evaluation metric are appropriate — squared error doesn't apply to a category, and accuracy doesn't apply to a real number *(required: names that the loss/metric choice follows from the framing)* | — |
| T1 | transfer | short-answer | 1.19 | Why might "is blood pressure in the dangerous range" (classification) be more useful for a clinical decision tool than "predict the exact number" (regression), despite regression being more information-rich? | the clinical decision is itself binary (act or don't act), so a classification framing directly answers the question that matters operationally, while a regression output still requires a separate threshold decision downstream — more raw information doesn't always mean more decision-relevant output *(required)* | — |

*Coverage: 5 items, −0.81…1.19.*

---

## Curse of Dimensionality (`curse-of-dimensionality`)
*Prereq: ML Introduction · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Describe the curse of dimensionality. | as the number of features grows, the volume of the space grows exponentially, so any fixed amount of data covers a vanishing fraction of it — data becomes increasingly sparse | — |
| R2 | recall | mcq | −0.9 | As dimensionality increases (fixed sample size), distances between points tend to: | become less informative — points start looking roughly equidistant from each other | claims distances "become more informative/discriminating" — the opposite, and the source of KNN's high-dimensional struggles → `curse-of-dimensionality` |
| A1 | apply | numeric | −0.35 | If 100 points adequately cover a 1D range at some density, roughly how many are needed for the same density in 10 dimensions? `[verified: 100^10=10^20]` | 100¹⁰=10²⁰ — an astronomically larger requirement, illustrating the exponential blowup concretely | — |
| E1 | explain | short-answer | 0.35 | Why is most of a high-dimensional hypercube's volume near its corners/surface rather than its center? | as dimensions increase, the fraction of a cube's volume within any fixed distance of the center shrinks toward zero, since that "central" region's volume grows far more slowly than the full cube's — a genuinely counter-intuitive geometric fact underlying several curse-of-dimensionality phenomena *(required: names the differential volume growth, not just states the fact)* | — |
| T1 | transfer | short-answer | 0.85 | Why does the curse of dimensionality make K-Nearest-Neighbors degrade badly with many irrelevant features? | KNN relies on distance comparisons being meaningful; as noisy/irrelevant dimensions accumulate, per R2 all points start looking equidistant, drowning out the signal from the few genuinely useful features — a direct foreshadowing of `knn`'s own dependence on this concept | — |

*Coverage: 5 items, −1.15…0.85.*

---

## Training vs Validation vs Test Set (`training-validation-test-set`)
*Prereq: Supervised vs Unsupervised Learning · ancestors 3 · b₀ = 0.19*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.81 | Define the roles of the training, validation, and test sets. | training: fit the model; validation: tune hyperparameters/select among models; test: a final, unbiased performance estimate, used only once at the end | — |
| R2 | recall | mcq | −0.55 | Repeatedly checking test-set performance *while* tuning a model causes: | the test set to effectively become a second validation set, giving an overly optimistic final estimate | claims this causes "no problem at all" → `training-validation-test-set` |
| A1 | apply | short-answer | 0.0 | A 1000-example dataset is split 70/15/15 into train/val/test. Describe what each subset is used for, and at which stage. | training (70%) fits model parameters; validation (15%) is checked repeatedly during development to tune hyperparameters and pick among models; test (15%) is touched only once, at the very end, for the final reported number *(required: the "used only once" timing for test)* | — |
| E1 | explain | short-answer | 0.69 | Why is repeatedly checking test-set performance a form of subtle information leakage, even without directly training on it? | choosing which model or hyperparameters to keep *based on* test performance implicitly tunes the final choice to that specific test set — the test set influenced the decision even though no gradient step ever touched it, inflating its apparent future performance *(required: the "influenced the decision, not the gradients" distinction)* | — |
| T1 | transfer | short-answer | 1.19 | Why do ML competitions with a public leaderboard risk the same leakage problem, and why do they typically hold back a separate private leaderboard? | repeated public-leaderboard submissions let participants implicitly tune to the public test set exactly as in E1; a hidden private set, revealed only at the end, gives a genuinely unbiased final measure uncontaminated by that iterative tuning *(required: connects explicitly to E1's mechanism)* | — |

*Coverage: 5 items, −0.81…1.19.*

---

## Data Leakage (`data-leakage`)
*Prereq: Training vs Validation vs Test Set · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Define data leakage. | information that wouldn't be available at real prediction time (often, information from after the outcome occurred) accidentally influences training, making performance look better than it will be in practice | — |
| R2 | recall | mcq | −0.45 | A classic leakage example is: | using a feature only known *after* the outcome has already occurred | picks "using more training data" — unrelated to leakage → `data-leakage` |
| A1 | apply | short-answer | 0.1 | A loan-default model uses "account flagged for collections" as a feature. Why is this likely leakage if the flag is usually set *after* a default begins? | the feature is effectively a proxy for the outcome itself, available only once the default has already started — at true prediction time (before any default), this information wouldn't exist yet *(required: names the timing mismatch)* | — |
| E1 | explain | short-answer | 0.8 | Describe the subtler leakage that occurs when normalization or PCA is applied to the *entire* dataset before splitting into train/test. | the test set's own statistics (its mean, SD, or contribution to the PCA directions) leak into the preprocessing step, influencing the "trained" transformation even though the model itself never saw test labels directly *(required: names that leakage can happen through preprocessing statistics, not just labels)* | — |
| T1 | transfer | short-answer | 1.3 | Why does data leakage typically produce a model that looks great in development but fails badly in deployment? | the leaked information (future data, or test-set statistics) simply won't be available in the same form once the model faces genuinely new data in production — the apparent performance was borrowing information that deployment can't supply *(required)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| ML vs rule-based programming treated as requiring more manual code | `ml-introduction` |
| loss function sign/magnitude conventions assumed arbitrary | `loss-functions` |
| reinforcement learning assumed to use no data | `types-of-machine-learning` |
| clustering mistaken for supervised | `supervised-vs-unsupervised-learning` |
| numeric-vs-bucket framing conflated as always equivalent | `classification-vs-regression` |
| high-dimensional distances assumed to stay informative | `curse-of-dimensionality` |
| test set reused during iterative tuning | `training-validation-test-set` |
| leakage assumed to require direct label exposure | `data-leakage` |

**Cluster total: 40 items across 8 concepts.** All numeric claims verified by script, including the
100¹⁰ illustration of exponential data-density requirements.
