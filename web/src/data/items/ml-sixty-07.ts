import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./ml-sixty-shared";

/**
 * Pruning, ensembles and boosting, and clustering methods (pruning trees
 * through clustering methods), each brought from 30 to 60 questions.
 */

// ---------------------------------------------------------------------------
// pruning-trees
// ---------------------------------------------------------------------------
const PT = "pruning-trees";
const pruning: Item[] = [
  // 1–10
  mcq(m(PT, "recall-what", "recall", 1, 15, "What does pruning do to a decision tree?"),
    "Removes branches that add little predictive value, making the tree smaller",
    [
      ["Adds more splits", "prune-adds", "Pruning removes splits."],
      ["Reorders the features", "prune-reorders", "It cuts subtrees."],
      ["Changes the training labels", "prune-labels", "Labels are untouched."],
    ]),
  mcq(m(PT, "recall-why", "recall", 1, 15, "Why prune a decision tree?"),
    "To reduce overfitting so the tree generalises better",
    [
      ["To fit the training data more closely", "prune-fit-more", "Pruning usually raises training error slightly."],
      ["To make training slower", "prune-slower", "It's about generalisation."],
      ["To increase the number of leaves", "prune-more-leaves", "It reduces leaves."],
    ]),
  mcq(m(PT, "recall-pre-post", "recall", 1, 15, "Post-pruning differs from pre-pruning in that it:"),
    "Grows a large tree first, then cuts back branches",
    [
      ["Stops growing early using a threshold", "post-is-pre", "That's pre-pruning."],
      ["Never removes splits", "post-no-removal", "It removes them after growing."],
      ["Uses a different impurity measure", "post-impurity", "It's about when splits are removed."],
    ]),
  mcq(m(PT, "recall-min-leaf", "recall", 2, 20, "Which hyperparameter acts as pre-pruning?"),
    "Minimum number of samples per leaf",
    [
      ["Learning rate", "minleaf-lr", "Trees don't have a learning rate."],
      ["Number of trees", "minleaf-trees", "That's for ensembles."],
      ["Kernel bandwidth", "minleaf-kernel", "That's for kernel methods."],
    ]),
  num(m(PT, "apply-cost-complexity", "apply", 2, 25, "With $R_\\alpha(T) = R(T) + \\alpha|T|$, a subtree has error $R = 0.12$ and $|T| = 5$ leaves. With $\\alpha = 0.01$, what is $R_\\alpha$?"), 0.17),
  num(m(PT, "apply-compare", "apply", 3, 30, "With $\\alpha = 0.02$, tree A has $R = 0.10$ and $8$ leaves; tree B has $R = 0.16$ and $3$ leaves. What is the smaller cost-complexity value?"), 0.22),
  num(m(PT, "apply-weakest-link", "apply", 3, 30, "Weakest-link pruning computes $g(t) = \\frac{R(t) - R(T_t)}{|T_t| - 1}$. A node has $R(t) = 0.25$ and its subtree $R(T_t) = 0.10$ with $4$ leaves. What is $g(t)$?"), 0.05),
  num(m(PT, "apply-leaves-removed", "apply", 3, 25, "Collapsing a subtree with $7$ leaves into one leaf removes how many leaves?"), 6),
  num(m(PT, "apply-alpha-threshold", "apply", 4, 35, "Pruning a node is worthwhile once $\\alpha \\ge g(t)$. Two nodes have $g = 0.03$ and $g = 0.08$. Which $g$ is pruned first as $\\alpha$ increases?"), 0.03),
  num(m(PT, "apply-break-even", "apply", 4, 40, "A full tree has $R = 0.05$ with $20$ leaves; a pruned tree has $R = 0.12$ with $6$ leaves. At what $\\alpha$ are their costs equal?"), 0.005),
  // 11–20
  num(m(PT, "apply-validation-choice", "apply", 4, 35, "Validation errors for $\\alpha = 0$, $0.005$, $0.01$ and $0.02$ are $0.21$, $0.18$, $0.17$ and $0.19$. Which $\\alpha$ is chosen?"), 0.01),
  num(m(PT, "apply-min-samples", "apply", 5, 40, "With a minimum of $25$ samples per leaf and $1{,}000$ training examples, what is the most leaves the tree can have?"), 40),
  mcq(m(PT, "apply-max-depth", "apply", 5, 40, "A tree capped at depth $2$ underfits badly. What should you try?"),
    "Allow more depth (or reduce pre-pruning) and choose the limit by validation",
    [
      ["Increase $\\alpha$", "depth-more-alpha", "That prunes more."],
      ["Lower the minimum leaf size to $0$", "depth-zero-leaf", "That alone doesn't lift the depth cap."],
      ["Use fewer features", "depth-fewer-features", "That usually worsens underfitting."],
    ]),
  short(m(PT, "explain-validation-alpha", "explain", 6, 120, "Why must the pruning parameter $\\alpha$ be chosen on validation data rather than training data?"),
    [
      ["training", "On training data, the unpruned tree always has the lowest error, so $\\alpha = 0$ would always win", 2, true],
      ["validation", "Validation (or CV) error reveals which subtree generalises best", 2, true],
    ]),
  short(m(PT, "explain-pre-myopia", "explain", 6, 120, "Why can pre-pruning with a minimum-gain threshold stop too early?"),
    [
      ["myopic", "A split with little immediate gain can enable very useful splits beneath it (e.g. XOR)", 2, true],
      ["post", "Post-pruning sees the whole subtree before deciding, so it avoids this", 2, true],
    ]),
  mcq(m(PT, "explain-forest-no-prune", "explain", 6, 50, "Why do random forests usually grow deep, unpruned trees?"),
    "Averaging many trees reduces variance, so each tree can stay low-bias without pruning",
    [
      ["Pruning is impossible in forests", "forest-prune-impossible", "It's possible but unnecessary."],
      ["Deep trees never overfit", "deep-no-overfit", "Single deep trees do overfit; averaging fixes it."],
      ["Forests use stumps", "forest-stumps", "Forests use full trees; boosting often uses shallow ones."],
    ]),
  num(m(PT, "transfer-sequence-length", "transfer", 7, 60, "Weakest-link pruning of a tree with $16$ leaves, removing one internal node at a time down to the root, produces how many subtrees (including the full tree and the root alone), if each step removes exactly one leaf?"), 16),
  mcq(m(PT, "transfer-nested", "transfer", 7, 60, "Why does cost-complexity pruning produce a *nested* sequence of subtrees?"),
    "As $\\alpha$ grows, the optimal subtree only ever loses branches, so each optimal tree contains the next",
    [
      ["Because subtrees are random", "nested-random", "The sequence is deterministic."],
      ["Because $\\alpha$ decreases", "nested-alpha-decreases", "It increases along the path."],
      ["It isn't nested", "not-nested", "Breiman et al. proved nesting."],
    ]),
  num(m(PT, "transfer-1se-rule", "transfer", 8, 60, "The one-standard-error rule picks the simplest tree within $1$ SE of the best CV error. Best CV error is $0.150$ with SE $0.012$. What is the largest acceptable CV error?"), 0.162),
  short(m(PT, "transfer-1se-why", "transfer", 8, 150, "Why do practitioners often prefer the one-standard-error rule over simply picking the tree with the lowest CV error?"),
    [
      ["noise", "CV errors are noisy; differences within one SE are not reliable", 2, true],
      ["parsimony", "Choosing the simplest tree in that band gives a more interpretable, stable model with statistically equivalent error", 2, true],
    ]),
  // 21–30
  num(m(PT, "transfer-cv-alpha", "transfer", 8, 60, "Choosing $\\alpha$ by $10$-fold CV over $25$ candidate values, then refitting, requires how many tree fits (each fold's full pruning path counts as one fit)?"), 11),
  mcq(m(PT, "transfer-boosting-shallow", "transfer", 9, 75, "Boosting typically uses shallow trees and limits their number. How does this relate to pruning?"),
    "Both control complexity, but boosting does it by keeping each tree small and stopping early rather than pruning large trees",
    [
      ["Boosting prunes every tree to a stump automatically", "boost-auto-prune", "Depth is a chosen hyperparameter."],
      ["Boosting never needs complexity control", "boost-no-control", "Too many trees can overfit."],
      ["They're unrelated", "boost-pruning-unrelated", "Both are forms of regularisation."],
    ]),
  num(m(PT, "transfer-leaf-error", "transfer", 9, 75, "A node with $50$ samples ($38$ of class A) is a leaf. What is its misclassification rate?"), 0.24),
  short(m(PT, "transfer-reduced-error", "transfer", 9, 150, "Describe reduced-error pruning and one drawback compared with cost-complexity pruning."),
    [
      ["method", "Using a separate validation set, repeatedly replace subtrees with leaves whenever this doesn't increase validation error", 2, true],
      ["drawback", "It needs a held-out set (less training data) and can over-prune with a small validation set", 2, true],
    ]),
  num(m(PT, "transfer-alpha-zero-tree", "transfer", 10, 90, "At $\\alpha = 0$, cost-complexity pruning keeps the full tree. If the full tree has $64$ leaves and the root-only tree has $1$, at most how many distinct $\\alpha$ breakpoints can the pruning path have?"), 63),
  mcq(m(PT, "transfer-pruning-regression", "transfer", 10, 90, "For a regression tree, what does $R(T)$ in cost-complexity pruning usually measure?"),
    "The total (or mean) squared error of the tree on the training data",
    [
      ["The misclassification rate", "regression-misclassification", "That's for classification."],
      ["The number of leaves", "regression-r-leaves", "That's $|T|$."],
      ["The Gini impurity", "regression-gini", "Gini is for classification."],
    ]),
  short(m(PT, "transfer-pruning-interpretability", "transfer", 10, 180, "A regulator requires a credit model that loan officers can follow by hand. Explain how pruning helps and what trade-off you'd report."),
    [
      ["interpretable", "Pruning to a few levels gives a short set of readable if–then rules", 2, true],
      ["tradeoff", "Report the accuracy lost relative to deeper trees or ensembles, so the cost of interpretability is explicit", 2, true],
    ]),
  mcq(m(PT, "recall-alpha-meaning", "recall", 2, 20, "In cost-complexity pruning, $\\alpha$ represents:"),
    "The penalty per leaf, trading accuracy against tree size",
    [
      ["The learning rate", "alpha-lr", "Trees have no learning rate."],
      ["The fraction of data held out", "alpha-holdout", "That's a split ratio."],
      ["The maximum depth", "alpha-depth", "It's a per-leaf penalty."],
    ]),
  num(m(PT, "apply-penalty-only", "apply", 3, 25, "With $\\alpha = 0.004$, what is the size penalty $\\alpha|T|$ for a tree with $15$ leaves?"), 0.06),
  num(m(PT, "apply-max-depth-leaves", "apply", 2, 20, "Pre-pruning with maximum depth $5$ allows at most how many leaves?"), 32),
];

// ---------------------------------------------------------------------------
// ensemble-methods
// ---------------------------------------------------------------------------
const EN = "ensemble-methods";
const ensembles: Item[] = [
  // 1–10
  mcq(m(EN, "recall-idea", "recall", 1, 15, "What is the core idea of an ensemble method?"),
    "Combine several models so their errors partly cancel, giving better predictions than any single one",
    [
      ["Train one very large model", "ensemble-one-model", "Ensembles combine several models."],
      ["Use only the best model found", "ensemble-best-only", "That's model selection."],
      ["Average the training data", "ensemble-average-data", "They combine predictions."],
    ]),
  mcq(m(EN, "recall-majority", "recall", 1, 15, "For classification, a simple ensemble combines its members by:"),
    "Majority (or plurality) vote, or by averaging predicted probabilities",
    [
      ["Taking the first model's prediction", "ensemble-first", "All members contribute."],
      ["Multiplying the predictions", "ensemble-multiply", "Voting or averaging is standard."],
      ["Picking at random", "ensemble-random", "That ignores the other members."],
    ]),
  mcq(m(EN, "recall-diversity", "recall", 1, 15, "Ensembles help most when their members are:"),
    "Individually decent and make different (weakly correlated) errors",
    [
      ["Identical", "ensemble-identical", "Identical models make identical errors."],
      ["All very weak and identical", "ensemble-weak-identical", "Diversity is essential."],
      ["Trained on exactly the same data with the same seed", "ensemble-same-seed", "That produces copies, not diversity."],
    ]),
  mcq(m(EN, "recall-families", "recall", 2, 20, "Bagging and boosting differ mainly in that:"),
    "Bagging trains models independently on resamples (reducing variance); boosting trains them sequentially to fix earlier errors (reducing bias)",
    [
      ["Bagging is sequential and boosting parallel", "bag-boost-swapped", "It's the reverse."],
      ["Both reduce bias only", "both-bias", "Bagging mainly reduces variance."],
      ["They're the same method", "bag-boost-same", "Their mechanisms differ."],
    ]),
  num(m(EN, "apply-vote", "apply", 2, 20, "Seven classifiers predict $1, 1, 0, 1, 0, 0, 1$. How many votes does the winning class get?"), 4),
  num(m(EN, "apply-average", "apply", 2, 20, "Four regressors predict $20$, $24$, $18$ and $22$. What is the ensemble average?"), 21),
  num(m(EN, "apply-weighted", "apply", 3, 25, "Three models predict $10$, $16$ and $13$ with weights $0.5$, $0.3$ and $0.2$. What is the weighted average?"), 12.4),
  num(m(EN, "apply-majority-accuracy", "apply", 3, 30, "Three independent classifiers are each correct with probability $0.7$. What is the probability a majority vote is correct?"), 0.784),
  num(m(EN, "apply-variance-independent", "apply", 3, 25, "Averaging $8$ independent models, each with prediction variance $4$, gives what variance?"), 0.5),
  num(m(EN, "apply-variance-correlated", "apply", 4, 40, "Averaging $B = 20$ models with variance $\\sigma^{2} = 1$ and pairwise correlation $\\rho = 0.5$ gives $\\rho\\sigma^{2} + \\frac{1 - \\rho}{B}\\sigma^{2}$. What is it?"), 0.525),
  // 11–20
  num(m(EN, "apply-infinite-b", "apply", 4, 35, "With $\\rho = 0.3$ and $\\sigma^{2} = 2$, what variance does averaging approach as $B \\to \\infty$?"), 0.6),
  num(m(EN, "apply-five-majority", "apply", 5, 45, "Five independent classifiers each correct with probability $0.6$. What is the probability a majority (at least $3$) is correct? Give $4$ decimal places."), 0.6826),
  mcq(m(EN, "apply-soft-voting", "apply", 5, 40, "Two models give class-$1$ probabilities $0.9$ and $0.4$; a third gives $0.45$. Hard voting (threshold $0.5$) and soft voting (average probability) predict:"),
    "Hard voting: class $0$ ($1$ vote of $3$); soft voting: class $1$ (average $0.583$)",
    [
      ["Both predict class $1$", "voting-both-1", "Hard voting has only one vote for class $1$."],
      ["Both predict class $0$", "voting-both-0", "The average probability is above $0.5$."],
      ["Hard: class $1$; soft: class $0$", "voting-swapped", "It's the other way round."],
    ]),
  short(m(EN, "explain-ambiguity", "explain", 6, 120, "The ambiguity decomposition says ensemble error equals average member error minus the average disagreement (ambiguity). What does this imply about building ensembles?"),
    [
      ["diversity", "Disagreement between members directly lowers ensemble error, so diversity is valuable", 2, true],
      ["balance", "But members must stay accurate: adding diverse but bad models raises the average error term", 2, true],
    ]),
  short(m(EN, "explain-stacking", "explain", 6, 120, "How does stacking combine models, and how does it avoid overfitting the combiner?"),
    [
      ["meta", "A meta-model learns how to combine the base models' predictions", 2, true],
      ["oof", "It's trained on out-of-fold predictions so the base models' outputs on training data aren't overfit", 2, true],
    ]),
  mcq(m(EN, "explain-correlation-term", "explain", 6, 50, "In $\\rho\\sigma^{2} + \\frac{1 - \\rho}{B}\\sigma^{2}$, which term can only be reduced by making members less correlated?"),
    "$\\rho\\sigma^{2}$",
    [
      ["$\\frac{1 - \\rho}{B}\\sigma^{2}$", "term-b", "That one shrinks as $B$ grows."],
      ["Both shrink with $B$", "both-shrink", "The first doesn't depend on $B$."],
      ["Neither can be reduced", "neither-reduced", "Lower $\\rho$ reduces the first term."],
    ]),
  num(m(EN, "transfer-seven-majority", "transfer", 7, 60, "Seven independent classifiers each correct with probability $0.65$. What is the probability that at least $4$ are correct? Give $4$ decimal places."), 0.8002),
  mcq(m(EN, "transfer-correlated-fail", "transfer", 7, 60, "Five copies of the same network, trained with the same data, initialisation and seed, are ensembled. What improvement is expected?"),
    "None — the copies are identical, so averaging changes nothing",
    [
      ["A $5\\times$ variance reduction", "copies-reduction", "Identical models have correlation $1$."],
      ["Lower bias", "copies-bias", "Copies don't reduce bias."],
      ["Slightly better calibration", "copies-calibration", "The average of identical outputs is the same output."],
    ]),
  num(m(EN, "transfer-weak-majority", "transfer", 8, 60, "Eleven independent classifiers each correct with probability only $0.45$. Is majority voting better or worse than one model? Give the majority-correct probability to $4$ decimal places."), 0.3669),
  short(m(EN, "transfer-condorcet", "transfer", 8, 150, "State the Condorcet jury intuition for ensembles and its two key assumptions."),
    [
      ["result", "If each voter is right more than half the time, majority-vote accuracy rises toward $1$ as voters are added", 2, true],
      ["assumptions", "It assumes members are better than chance and make independent errors", 2, true],
    ]),
  // 21–30
  num(m(EN, "transfer-error-reduction", "transfer", 8, 75, "Averaging reduces a model's variance from $0.09$ to $0.03$. If squared bias is $0.04$ and noise $0.1$, by how much does expected squared error fall?"), 0.06),
  mcq(m(EN, "transfer-heterogeneous", "transfer", 9, 75, "Why might combining a gradient-boosted model, a neural network and a linear model beat an ensemble of five gradient-boosted models?"),
    "Different model families make more different errors, so their ensemble has lower correlation",
    [
      ["Linear models are always best", "linear-best", "Diversity, not linearity, is the point."],
      ["More model types always means more data", "types-more-data", "Data are the same."],
      ["It wouldn't — same-family ensembles are always better", "same-family-better", "Same-family members are usually more correlated."],
    ]),
  num(m(EN, "transfer-stacking-weights", "transfer", 9, 75, "A linear stacker gives weights $0.6$ and $0.4$ to two models' out-of-fold predictions $8$ and $13$ for an example. What is the stacked prediction?"), 10),
  short(m(EN, "transfer-cost", "transfer", 9, 150, "Ensembles win competitions but are less common in production. Give two practical costs that explain this."),
    [
      ["compute", "Inference cost and latency grow with the number of models", 2, true],
      ["maintenance", "More models to train, monitor and maintain, and harder to interpret", 2, true],
    ]),
  num(m(EN, "transfer-snapshot", "transfer", 10, 90, "Snapshot ensembling saves a model at the end of each of $6$ cosine learning-rate cycles in one $300$-epoch run. How many epochs per cycle?"), 50),
  mcq(m(EN, "transfer-distillation", "transfer", 10, 90, "How can the accuracy of a large ensemble be kept while cutting inference cost?"),
    "Distil it into a single smaller model trained to match the ensemble's soft predictions",
    [
      ["Delete all but one member at random", "distil-random", "That throws away the ensemble's benefit."],
      ["Average the members' weights directly", "distil-average-weights", "Weight averaging works only for closely related models."],
      ["Train the ensemble longer", "distil-longer", "That doesn't reduce inference cost."],
    ]),
  short(m(EN, "transfer-weather", "transfer", 10, 180, "A weather service averages ten physics-based forecasts started from slightly different initial conditions. Explain what this ensemble buys besides a better mean forecast."),
    [
      ["uncertainty", "The spread between members estimates forecast uncertainty (a probability of rain, confidence bands)", 2, true],
      ["chaos", "Small initial differences grow in chaotic systems, so spread signals how predictable the situation is", 2, true],
    ]),
  mcq(m(EN, "recall-stacking-name", "recall", 2, 20, "Stacking is also known as:"),
    "Stacked generalisation",
    [
      ["Bagging", "stacking-bagging", "Bagging averages bootstrap models."],
      ["Boosting", "stacking-boosting", "Boosting is sequential reweighting."],
      ["Pruning", "stacking-pruning", "Pruning simplifies trees."],
    ]),
  num(m(EN, "apply-median-ensemble", "apply", 3, 25, "Five regressors predict $3$, $9$, $4$, $5$ and $40$. What does a median ensemble predict?"), 5),
  num(m(EN, "apply-two-of-three", "apply", 4, 35, "Three independent classifiers are correct with probabilities $0.9$, $0.8$ and $0.7$. What is the probability that at least two are correct?"), 0.902),
];

// ---------------------------------------------------------------------------
// bagging
// ---------------------------------------------------------------------------
const BG = "bagging";
const bagging: Item[] = [
  // 1–10
  mcq(m(BG, "recall-bootstrap", "recall", 1, 15, "A bootstrap sample is drawn:"),
    "With replacement, the same size as the original data",
    [
      ["Without replacement, half the size", "bootstrap-half", "That's subsampling."],
      ["With replacement, one point only", "bootstrap-one", "It's a full-size resample."],
      ["Only from the test set", "bootstrap-test", "It resamples the training data."],
    ]),
  mcq(m(BG, "recall-aggregate", "recall", 1, 15, "How are bagged models' predictions combined for regression?"),
    "By averaging them",
    [
      ["By taking the maximum", "bag-max", "Averaging reduces variance."],
      ["By using the first model only", "bag-first", "All models contribute."],
      ["By multiplying them", "bag-multiply", "They're averaged."],
    ]),
  mcq(m(BG, "recall-reduces", "recall", 1, 15, "Bagging mainly reduces a model's:"),
    "Variance",
    [
      ["Bias", "bag-bias", "Each bagged model has roughly the same bias as one model."],
      ["Irreducible noise", "bag-noise", "Noise can't be reduced."],
      ["Training time", "bag-time", "Bagging trains many models."],
    ]),
  mcq(m(BG, "recall-parallel", "recall", 2, 20, "Can bagged models be trained in parallel?"),
    "Yes — each model uses its own bootstrap sample independently of the others",
    [
      ["No, each depends on the previous", "bag-sequential", "That's boosting."],
      ["Only for regression", "bag-parallel-regression", "Parallelism works for any task."],
      ["Only with two models", "bag-parallel-two", "Any number can be parallelised."],
    ]),
  num(m(BG, "apply-oob-fraction", "apply", 2, 25, "About what fraction of the original points is left out of a bootstrap sample, $(1 - \\frac{1}{n})^{n} \\approx e^{-1}$? Give $3$ decimal places."), 0.368),
  num(m(BG, "apply-unique", "apply", 3, 25, "With $n = 5{,}000$, about how many distinct points appear in a bootstrap sample ($n(1 - e^{-1})$)? Round to the nearest whole number."), 3161),
  num(m(BG, "apply-small-n", "apply", 3, 30, "With $n = 3$, what is the probability that a given point is absent from a bootstrap sample, $\\left(\\frac{2}{3}\\right)^{3}$? Give $4$ decimal places."), 0.2963),
  num(m(BG, "apply-oob-trees", "apply", 3, 25, "With $300$ bagged trees, roughly how many trees leave out any given point ($300e^{-1}$)? Round to the nearest whole number."), 110),
  num(m(BG, "apply-average-prediction", "apply", 3, 25, "Bagged trees predict $5$, $7$, $6$, $8$ and $4$. What is the bagged prediction?"), 6),
  num(m(BG, "apply-variance-reduction", "apply", 4, 40, "Bagged trees have variance $\\sigma^{2} = 3$ and pairwise correlation $\\rho = 0.6$. What is the variance of an average of $B = 30$ trees?"), 1.84),
  // 11–20
  num(m(BG, "apply-duplicates", "apply", 4, 35, "In a bootstrap sample of size $n$, the expected number of times a given point appears is:"), 1),
  num(m(BG, "apply-repeat-prob", "apply", 5, 45, "With $n = 100$, what is the probability a given point appears exactly twice in a bootstrap sample (Binomial$(100, 0.01)$)? Give $4$ decimal places."), 0.1849),
  mcq(m(BG, "apply-stable-learner", "apply", 5, 40, "Bagging a linear regression model usually gives:"),
    "Little improvement — linear regression is already stable (low variance)",
    [
      ["A huge improvement", "bag-linear-huge", "Stable learners gain little from averaging."],
      ["A non-linear model", "bag-linear-nonlinear", "An average of linear models is linear."],
      ["Worse bias", "bag-linear-bias", "Bias is roughly unchanged."],
    ]),
  short(m(BG, "explain-unstable", "explain", 6, 120, "Why does bagging help unstable learners such as deep trees much more than stable ones?"),
    [
      ["variance", "Unstable learners change a lot between resamples (high variance), so averaging cancels much of that variation", 2, true],
      ["stable", "Stable learners barely change, so their bootstrap copies are highly correlated and averaging gains little", 2, true],
    ]),
  short(m(BG, "explain-oob", "explain", 6, 120, "Explain out-of-bag error estimation and why it is nearly free."),
    [
      ["method", "Each point is predicted using only the trees whose bootstrap samples left it out, and those predictions are scored", 2, true],
      ["free", "No separate validation set or extra training is needed; it behaves like cross-validation", 2, true],
    ]),
  mcq(m(BG, "explain-noise", "explain", 6, 50, "Why can't bagging reduce irreducible error?"),
    "That error comes from noise in the targets themselves, which no averaging of models can predict",
    [
      ["Bagging only reduces bias", "bag-only-bias", "It reduces variance, not noise."],
      ["Because bootstrap samples are too small", "bag-small-samples", "Sample size isn't the issue."],
      ["It can, with enough trees", "bag-reduce-noise", "Noise is irreducible by definition."],
    ]),
  num(m(BG, "transfer-pasting", "transfer", 7, 60, "*Pasting* draws subsamples without replacement. Using $60\\%$ of $2{,}000$ examples per model, each model sees how many examples?"), 1200),
  mcq(m(BG, "transfer-time-series", "transfer", 7, 60, "For strongly autocorrelated time-series rows, why is ordinary bootstrap resampling problematic?"),
    "It breaks the temporal dependence; block bootstrap (resampling contiguous chunks) preserves it",
    [
      ["It isn't — rows are always independent", "ts-independent", "Autocorrelated rows aren't independent."],
      ["Bootstrapping can't sample time stamps", "ts-timestamps", "The issue is dependence, not timestamps."],
      ["Time series can't be bagged at all", "ts-no-bag", "Block bootstrap allows it."],
    ]),
  num(m(BG, "transfer-oob-count", "transfer", 8, 60, "A point is out-of-bag for each tree independently with probability $e^{-1}$. With $B = 25$ trees, what is the probability it's in-bag for *every* tree (so it has no OOB prediction)? Give $6$ decimal places."), 0.00001),
  short(m(BG, "transfer-classification-voting", "transfer", 8, 150, "For classification, compare combining bagged trees by majority vote versus averaging their class-probability estimates."),
    [
      ["vote", "Majority vote counts each tree's hard prediction", 1, true],
      ["average", "Averaging probabilities uses each tree's confidence, usually giving smoother and better-calibrated outputs", 2, true],
      ["practice", "Libraries such as scikit-learn average probabilities by default", 1],
    ]),
  // 21–30
  num(m(BG, "transfer-b-needed", "transfer", 8, 60, "With $\\rho = 0.2$ and $\\sigma^{2} = 1$, how many trees $B$ bring the averaged variance to $0.24$ (i.e. $0.2 + \\frac{0.8}{B} = 0.24$)?"), 20),
  mcq(m(BG, "transfer-bias-unchanged", "transfer", 9, 75, "Why does bagging leave bias roughly unchanged?"),
    "Each bootstrap model has about the same expected prediction as a single model, so their average does too",
    [
      ["Bootstrap samples are biased toward outliers", "bootstrap-outliers", "The average model's bias matches the base learner's."],
      ["Bagging adds a regularisation penalty", "bag-penalty", "No penalty is added."],
      ["It doesn't — bagging removes bias", "bag-removes-bias", "It targets variance."],
    ]),
  num(m(BG, "transfer-unique-expected", "transfer", 9, 75, "For $n = 10$, what is the exact expected fraction of distinct points in a bootstrap sample, $1 - (0.9)^{10}$? Give $4$ decimal places."), 0.6513),
  short(m(BG, "transfer-bagging-vs-cv", "transfer", 9, 150, "Bagging and $k$-fold cross-validation both train many models on different subsets. Contrast their purposes."),
    [
      ["bagging", "Bagging combines the models to make a better predictor", 2, true],
      ["cv", "Cross-validation trains models only to estimate performance; their predictions aren't combined into the final model", 2, true],
    ]),
  num(m(BG, "transfer-memory", "transfer", 10, 90, "Each bagged tree has about $2n$ nodes when grown to purity. For $n = 50{,}000$ and $200$ trees, about how many nodes in total (in millions)?"), 20),
  mcq(m(BG, "transfer-random-subspace", "transfer", 10, 90, "The random subspace method trains each model on all rows but a random subset of features. How does it complement bagging?"),
    "It decorrelates models through features rather than rows; random forests combine both ideas",
    [
      ["It's identical to bagging", "subspace-same", "It samples features, not rows."],
      ["It reduces bias instead of variance", "subspace-bias", "It also targets variance via decorrelation."],
      ["It requires boosting", "subspace-boosting", "It's independent of boosting."],
    ]),
  short(m(BG, "transfer-bagging-knn", "transfer", 10, 180, "Would you expect bagging to help a $k$-NN classifier with large $k$? Explain."),
    [
      ["stable", "Large-$k$ $k$-NN is fairly stable — its predictions change little when a few points are added or removed", 2, true],
      ["little-gain", "So bootstrap copies are highly correlated and bagging gives little benefit (1-NN might benefit more)", 2, true],
    ]),
  mcq(m(BG, "recall-name", "recall", 2, 20, "“Bagging” is short for:"),
    "Bootstrap aggregating",
    [
      ["Bayesian aggregation", "bagging-bayesian", "It's bootstrap aggregating."],
      ["Batch gradient", "bagging-batch", "Unrelated to gradients."],
      ["Balanced aggregation", "bagging-balanced", "It's bootstrap-based."],
    ]),
  num(m(BG, "apply-vote-count", "apply", 2, 20, "Of $51$ bagged classifiers, $28$ vote for class A. What fraction of the vote does A get? Give $4$ decimal places."), 0.549),
  num(m(BG, "apply-in-bag", "apply", 4, 35, "About what fraction of the original points appears at least once in a large bootstrap sample ($1 - e^{-1}$)? Give $3$ decimal places."), 0.632),
];

// ---------------------------------------------------------------------------
// random-forests
// ---------------------------------------------------------------------------
const RF = "random-forests";
const forests: Item[] = [
  // 1–10
  mcq(m(RF, "recall-two-sources", "recall", 1, 15, "A random forest adds which source of randomness to bagged trees?"),
    "Choosing a random subset of features to consider at each split",
    [
      ["Random labels", "rf-random-labels", "Labels are never randomised."],
      ["Random learning rates", "rf-random-lr", "Trees have no learning rate."],
      ["Random tree depths only", "rf-random-depth", "Feature subsampling is the key addition."],
    ]),
  mcq(m(RF, "recall-mtry", "recall", 1, 15, "The hyperparameter $m$ (`max_features`, or $m_{\\text{try}}$) in a random forest is:"),
    "The number of features randomly considered at each split",
    [
      ["The number of trees", "mtry-trees", "That's `n_estimators`."],
      ["The maximum depth", "mtry-depth", "That's `max_depth`."],
      ["The minimum leaf size", "mtry-leaf", "That's `min_samples_leaf`."],
    ]),
  mcq(m(RF, "recall-trees-overfit", "recall", 1, 15, "Does adding more trees to a random forest cause overfitting?"),
    "No — test error typically levels off as trees are added; more trees mainly cost computation",
    [
      ["Yes, sharply", "rf-more-trees-overfit", "Averaging more trees doesn't add variance."],
      ["Yes, after $10$ trees", "rf-ten-trees", "There's no such threshold."],
      ["Only for regression", "rf-regression-overfit", "The behaviour is the same for both tasks."],
    ]),
  mcq(m(RF, "recall-importance", "recall", 2, 20, "Random forests provide feature importance scores. The default impurity-based importance is known to be biased toward:"),
    "Features with many distinct values (high cardinality)",
    [
      ["Binary features", "rf-imp-binary", "Binary features have few split points."],
      ["Features with missing values", "rf-imp-missing", "The known bias concerns cardinality."],
      ["Features listed first", "rf-imp-order", "Column order doesn't matter."],
    ]),
  num(m(RF, "apply-mtry-classification", "apply", 2, 25, "The usual classification default is $m = \\sqrt{p}$. With $p = 64$ features, what is $m$?"), 8),
  num(m(RF, "apply-mtry-regression", "apply", 2, 25, "The usual regression default is $m = \\frac{p}{3}$. With $p = 30$, what is $m$?"), 10),
  num(m(RF, "apply-variance", "apply", 3, 30, "Trees have variance $2$ and correlation $0.25$. What is the variance of a forest of $50$ trees, $\\rho\\sigma^{2} + \\frac{1 - \\rho}{B}\\sigma^{2}$?"), 0.53),
  num(m(RF, "apply-proximity", "apply", 3, 25, "Two points land in the same leaf in $140$ of $500$ trees. What is their RF proximity?"), 0.28),
  num(m(RF, "apply-vote-share", "apply", 3, 25, "In a $200$-tree forest, $130$ trees vote for class A. What is the forest's estimated probability for A?"), 0.65),
  num(m(RF, "apply-chance-feature", "apply", 4, 35, "With $p = 100$ and $m = 10$, what is the probability that a particular feature is among the candidates at a given split?"), 0.1),
  // 11–20
  num(m(RF, "apply-absent-feature", "apply", 4, 40, "With $p = 100$ and $m = 10$, a dominant feature is excluded from a split's candidates with probability $0.9$. What is the probability it is excluded from both of the first two splits (independently)?"), 0.81),
  num(m(RF, "apply-permutation-importance", "apply", 5, 40, "A forest's OOB accuracy is $0.88$. After permuting feature X it drops to $0.81$. What is X's permutation importance (the accuracy drop)?"), 0.07),
  mcq(m(RF, "apply-m-equals-p", "apply", 5, 40, "A random forest with $m = p$ is equivalent to:"),
    "Plain bagged trees",
    [
      ["A single decision tree", "rf-single-tree", "There are still many bootstrapped trees."],
      ["Gradient boosting", "rf-boosting", "Trees are still independent."],
      ["Linear regression", "rf-linear", "It's still a tree ensemble."],
    ]),
  short(m(RF, "explain-decorrelation", "explain", 6, 120, "Why does a random forest subsample features at each split? Explain using the variance formula $\\rho\\sigma^{2} + \\frac{1 - \\rho}{B}\\sigma^{2}$."),
    [
      ["dominant", "Without it, strong features dominate the top splits of every tree, making trees highly correlated (large $\\rho$)", 2, true],
      ["decorrelate", "Feature subsampling lowers $\\rho$, shrinking the term $\\rho\\sigma^{2}$ that averaging alone can't reduce", 2, true],
    ]),
  short(m(RF, "explain-full-depth", "explain", 6, 120, "Why are random-forest trees usually grown to full depth rather than pruned?"),
    [
      ["low-bias", "Deep trees have low bias; their high variance is what the averaging is there to remove", 2, true],
      ["no-prune", "Pruning would add bias that averaging can't fix", 2, true],
    ]),
  mcq(m(RF, "explain-free-lunch", "explain", 6, 50, "Why are random forests often called a strong “default” method for tabular data?"),
    "They work well with little tuning, handle mixed feature types and interactions, and are robust to overfitting as trees are added",
    [
      ["They always beat every other method", "rf-always-best", "Gradient boosting often wins when tuned."],
      ["They need no data", "rf-no-data", "They need training data."],
      ["They're linear and interpretable", "rf-linear-interpretable", "They're non-linear ensembles."],
    ]),
  num(m(RF, "transfer-correlated-features", "transfer", 7, 60, "A key feature has three near-duplicate copies. With impurity importance shared among them, roughly what fraction of the original importance does each copy receive? Give $4$ decimal places."), 0.3333),
  mcq(m(RF, "transfer-extra-trees", "transfer", 7, 60, "Extremely randomised trees (Extra-Trees) differ from random forests by:"),
    "Also choosing split thresholds at random, rather than searching for the best one",
    [
      ["Using a single tree", "extra-single", "They're also ensembles."],
      ["Not subsampling features", "extra-no-features", "They do subsample features."],
      ["Using boosting", "extra-boosting", "Trees are still independent."],
    ]),
  num(m(RF, "transfer-cost", "transfer", 8, 60, "Training cost scales roughly with $B \\cdot m \\cdot n\\log n$. Halving $m$ and doubling $B$ changes cost by what factor?"), 1),
  short(m(RF, "transfer-vs-boosting", "transfer", 8, 150, "Gradient boosting often beats random forests when well tuned. Why might a team still choose a random forest?"),
    [
      ["robust", "Forests need far less tuning and are hard to overfit by adding trees", 2, true],
      ["practical", "They train in parallel and give free OOB error estimates", 2],
    ]),
  // 21–30
  num(m(RF, "transfer-oob-reliability", "transfer", 8, 75, "Each OOB prediction uses about $e^{-1}$ of the trees. In a $40$-tree forest, about how many trees vote on each OOB prediction? Round to the nearest whole number."), 15),
  mcq(m(RF, "transfer-extrapolation", "transfer", 9, 75, "A random forest regressor is trained on targets between $10$ and $90$. What can it predict for an input far outside the training range?"),
    "Nothing outside $[10, 90]$ — its predictions are averages of training targets",
    [
      ["Any value, by extrapolation", "rf-extrapolates", "Leaf values are training averages."],
      ["Always exactly $50$", "rf-midpoint", "It returns averages of relevant leaves, often near the edge values."],
      ["Negative values", "rf-negative", "It can't go below the minimum training target."],
    ]),
  num(m(RF, "transfer-floor", "transfer", 9, 75, "With $\\rho = 0.15$ and $\\sigma^{2} = 4$, what variance does a forest approach as $B \\to \\infty$?"), 0.6),
  short(m(RF, "transfer-importance-caveat", "transfer", 9, 150, "Two features are strongly correlated and both predictive. Why can permutation importance understate both?"),
    [
      ["substitution", "When one is permuted, the model can still use the other, so accuracy barely drops", 2, true],
      ["fix", "Group correlated features when permuting, or use conditional importance / drop-column importance", 2, true],
    ]),
  num(m(RF, "transfer-quantile-forest", "transfer", 10, 90, "Quantile regression forests keep all training targets in each leaf. If the leaf neighbourhood of a query has targets $3, 5, 6, 8, 9, 11, 14, 20, 21, 30$, what is the $0.9$ quantile (the $9$th smallest)?"), 21),
  mcq(m(RF, "transfer-imbalanced-rf", "transfer", 10, 90, "With $1\\%$ positives, which random-forest adjustment directly targets the imbalance?"),
    "Balanced bootstrap sampling or class weights, so each tree sees enough positives",
    [
      ["Increasing $m$", "imbalance-mtry", "That changes feature sampling, not class balance."],
      ["Fewer trees", "imbalance-fewer-trees", "That doesn't address imbalance."],
      ["Using regression trees", "imbalance-regression", "That doesn't fix the class mix."],
    ]),
  short(m(RF, "transfer-proximity-uses", "transfer", 10, 180, "Random-forest proximities measure how often two points share a leaf. Name two uses of these proximities."),
    [
      ["uses", "E.g. outlier detection (points with low proximity to their class), imputing missing values, or clustering/visualising data with MDS on $1 -$ proximity", 4, true],
    ]),
  mcq(m(RF, "recall-forest-definition", "recall", 2, 20, "A random forest is:"),
    "An ensemble of decision trees trained on bootstrap samples with random feature subsets at each split",
    [
      ["A single very deep tree", "forest-one-tree", "It's many trees."],
      ["A boosted sequence of stumps", "forest-boosting", "That's AdaBoost or gradient boosting."],
      ["A clustering method", "forest-clustering", "It's a supervised ensemble."],
    ]),
  num(m(RF, "apply-trees-per-core", "apply", 3, 25, "Training $480$ trees in parallel on $16$ cores gives each core how many trees?"), 30),
  num(m(RF, "apply-mtry-log", "apply", 4, 35, "Another heuristic sets $m = \\log_2 p + 1$. With $p = 256$, what is $m$?"), 9),
];

// ---------------------------------------------------------------------------
// adaboost
// ---------------------------------------------------------------------------
const AB = "adaboost";
const adaboost: Item[] = [
  // 1–10
  mcq(m(AB, "recall-sequential", "recall", 1, 15, "How does AdaBoost train its weak learners?"),
    "Sequentially, each one focusing on the examples earlier learners got wrong",
    [
      ["Independently on bootstrap samples", "ada-bootstrap", "That's bagging."],
      ["All at once on the same weights", "ada-simultaneous", "Weights change between rounds."],
      ["On random feature subsets only", "ada-features", "That's the random subspace idea."],
    ]),
  mcq(m(AB, "recall-stump", "recall", 1, 15, "The classic weak learner in AdaBoost is:"),
    "A decision stump (a one-split tree)",
    [
      ["A deep neural network", "ada-deep-net", "Weak learners are simple."],
      ["A fully grown tree", "ada-full-tree", "Full trees aren't weak."],
      ["$k$-means", "ada-kmeans", "That's unsupervised."],
    ]),
  mcq(m(AB, "recall-weak", "recall", 1, 15, "A weak learner only needs to be:"),
    "Slightly better than random guessing on the weighted data",
    [
      ["Perfect on the training data", "weak-perfect", "That would be a strong learner."],
      ["Better than $90\\%$ accurate", "weak-90", "Barely better than chance is enough."],
      ["Worse than chance", "weak-worse", "It must beat chance."],
    ]),
  mcq(m(AB, "recall-reweight", "recall", 2, 20, "After a round, AdaBoost increases the weights of:"),
    "The examples that round's learner misclassified",
    [
      ["Correctly classified examples", "reweight-correct", "Those get lower relative weight."],
      ["All examples equally", "reweight-all", "The point is to change relative emphasis."],
      ["The test examples", "reweight-test", "Only training weights change."],
    ]),
  num(m(AB, "apply-alpha", "apply", 2, 25, "AdaBoost's vote weight is $\\alpha = \\frac{1}{2}\\ln\\frac{1 - \\varepsilon}{\\varepsilon}$. What is $\\alpha$ for weighted error $\\varepsilon = 0.2$? Give $4$ decimal places."), 0.6931),
  num(m(AB, "apply-alpha-half", "apply", 3, 25, "What is $\\alpha$ when $\\varepsilon = 0.5$?"), 0),
  num(m(AB, "apply-multiplier", "apply", 3, 30, "Misclassified examples' weights are multiplied by $e^{\\alpha}$. With $\\alpha = 0.6931$ ($= \\ln 2$), what is the multiplier?"), 2),
  num(m(AB, "apply-alpha-0.1", "apply", 3, 30, "What is $\\alpha$ for $\\varepsilon = 0.1$? Give $4$ decimal places."), 1.0986),
  num(m(AB, "apply-correct-multiplier", "apply", 4, 35, "Correctly classified examples are multiplied by $e^{-\\alpha}$. With $\\alpha = \\ln 3$, what is that factor? Give $4$ decimal places."), 0.3333),
  num(m(AB, "apply-final-vote", "apply", 4, 40, "Three stumps with $\\alpha = 0.9$, $0.4$ and $0.6$ predict $+1$, $-1$ and $-1$. What is the weighted sum $\\sum_t \\alpha_t h_t(\\mathbf{x})$?"), -0.1),
  // 11–20
  num(m(AB, "apply-training-bound", "apply", 4, 40, "AdaBoost's training error is at most $\\prod_t 2\\sqrt{\\varepsilon_t(1 - \\varepsilon_t)}$. With $\\varepsilon = 0.3$ in each of $2$ rounds, what is the bound?"), 0.84),
  num(m(AB, "apply-rounds", "apply", 5, 45, "If every round has $\\varepsilon = 0.3$, each multiplies the bound by $2\\sqrt{0.21} \\approx 0.9165$. After how many rounds does the bound first fall below $0.5$?"), 8),
  mcq(m(AB, "apply-worse-than-chance", "apply", 5, 40, "A weak learner has weighted error $0.7$. What does AdaBoost do with it?"),
    "Gives it a negative $\\alpha$, effectively flipping its predictions",
    [
      ["Discards it", "worse-discard", "Its flipped version is useful."],
      ["Gives it a large positive $\\alpha$", "worse-positive", "$\\alpha$ is negative when $\\varepsilon > 0.5$."],
      ["Stops training", "worse-stop", "The formula handles it."],
    ]),
  short(m(AB, "explain-bias", "explain", 6, 120, "Why does boosting reduce bias, unlike bagging?"),
    [
      ["sequential", "Each learner is trained to fix the errors of the current ensemble, so the combined model can represent patterns no single weak learner can", 2, true],
      ["additive", "The weighted sum of many simple learners builds a far more flexible model, lowering bias", 2, true],
    ]),
  short(m(AB, "explain-noise", "explain", 6, 120, "Why is AdaBoost sensitive to mislabelled training examples?"),
    [
      ["weights", "A mislabelled example keeps being misclassified, so its weight grows exponentially round after round", 2, true],
      ["distortion", "Later learners then concentrate on fitting these noisy points, distorting the ensemble", 2, true],
    ]),
  mcq(m(AB, "explain-exponential-loss", "explain", 6, 50, "AdaBoost can be derived as stagewise minimisation of which loss?"),
    "The exponential loss $e^{-yf(\\mathbf{x})}$",
    [
      ["Squared loss", "ada-squared", "That gives L2 boosting."],
      ["Hinge loss", "ada-hinge", "That's the SVM loss."],
      ["Absolute loss", "ada-absolute", "AdaBoost corresponds to exponential loss."],
    ]),
  num(m(AB, "transfer-exp-loss", "transfer", 7, 60, "What is the exponential loss $e^{-yf}$ for $y = -1$ and $f = 1.5$? Give $4$ decimal places."), 4.4817),
  mcq(m(AB, "transfer-margin", "transfer", 7, 60, "Why can AdaBoost's test error keep falling after training error reaches zero?"),
    "It keeps increasing the margins $yf(\\mathbf{x})$ of training examples, which margin theory links to better generalisation",
    [
      ["Training error is miscalculated", "ada-miscalculated", "It's genuinely zero."],
      ["Test data leak into training", "ada-leak", "No leakage is involved."],
      ["It never does", "ada-never", "This is a well-documented phenomenon."],
    ]),
  num(m(AB, "transfer-normalise", "transfer", 8, 60, "Four examples start with weight $0.25$. One is misclassified with $\\alpha = \\ln 3$, so its weight is multiplied by $3$ and the other three by $\\frac{1}{3}$. After normalising, what is the misclassified example's weight?"), 0.75),
  short(m(AB, "transfer-samme", "transfer", 8, 150, "How does SAMME extend AdaBoost to $K > 2$ classes, and why is the extra term needed?"),
    [
      ["formula", "It uses $\\alpha = \\ln\\frac{1 - \\varepsilon}{\\varepsilon} + \\ln(K - 1)$", 2, true],
      ["reason", "With $K$ classes random guessing has error $1 - \\frac{1}{K}$, so a learner only needs to beat that; the extra term keeps $\\alpha > 0$ for such learners", 2, true],
    ]),
  // 21–30
  num(m(AB, "transfer-samme-alpha", "transfer", 8, 75, "SAMME with $K = 4$ and $\\varepsilon = 0.6$: what is $\\alpha = \\ln\\frac{1 - \\varepsilon}{\\varepsilon} + \\ln(K - 1)$? Give $4$ decimal places."), 0.6931),
  mcq(m(AB, "transfer-equal-accuracy", "transfer", 9, 75, "Two weak learners have the same raw accuracy, but one is trained later in boosting. Why might they get very different $\\alpha$?"),
    "$\\alpha$ depends on weighted error under that round's weights, which emphasise the hard examples",
    [
      ["$\\alpha$ depends only on raw accuracy", "alpha-raw", "It uses the weighted error."],
      ["Later learners always get larger $\\alpha$", "alpha-later-larger", "Later learners often face harder weighted problems."],
      ["$\\alpha$ is random", "alpha-random", "It's computed from the weighted error."],
    ]),
  num(m(AB, "transfer-weight-growth", "transfer", 9, 75, "A noisy example is misclassified in each of $5$ rounds with $\\alpha = 0.5$ each time. Ignoring normalisation, by what factor has its weight grown ($e^{2.5}$)? Give $2$ decimal places."), 12.18),
  short(m(AB, "transfer-robust-boosting", "transfer", 9, 150, "Name two ways to make boosting more robust to label noise."),
    [
      ["methods", "Use a gentler loss (e.g. logistic loss / LogitBoost, or robust losses), shrinkage with early stopping, or cap/trim example weights", 4, true],
    ]),
  num(m(AB, "transfer-alpha-inverse", "transfer", 10, 90, "What weighted error $\\varepsilon$ gives $\\alpha = 1$? Give $4$ decimal places ($\\varepsilon = \\frac{1}{1 + e^{2}}$)."), 0.1192),
  mcq(m(AB, "transfer-boost-vs-bag-variance", "transfer", 10, 90, "With very many rounds and deep trees, what is AdaBoost's main risk?"),
    "Overfitting (high variance), since it keeps adding complex learners focused on hard, possibly noisy, examples",
    [
      ["Underfitting", "ada-underfit", "Deep trees and many rounds increase flexibility."],
      ["It can't run that long", "ada-time-limit", "It can run arbitrarily long."],
      ["Lower margins", "ada-lower-margins", "Margins tend to grow."],
    ]),
  short(m(AB, "transfer-weak-to-strong", "transfer", 10, 180, "AdaBoost answered the theoretical question of whether weak learners can be boosted into strong ones. Explain what “boosting” proved."),
    [
      ["question", "Whether a learner slightly better than chance can always be combined into one with arbitrarily low error", 2, true],
      ["answer", "Yes: training error falls exponentially in the number of rounds as long as each round beats chance by a margin", 2, true],
    ]),
  mcq(m(AB, "recall-adaboost-name", "recall", 2, 20, "AdaBoost stands for:"),
    "Adaptive boosting",
    [
      ["Additive bootstrap", "adaboost-bootstrap", "It's adaptive boosting."],
      ["Advanced bagging", "adaboost-bagging", "It's a boosting algorithm."],
      ["Averaged boosting", "adaboost-averaged", "It's adaptive."],
    ]),
  num(m(AB, "apply-alpha-0.4", "apply", 3, 30, "What is $\\alpha$ for $\\varepsilon = 0.4$? Give $4$ decimal places."), 0.2027),
  num(m(AB, "apply-sign", "apply", 3, 25, "The final AdaBoost score is $-0.35$. What class ($+1$ or $-1$) does it predict?"), -1),
];

// ---------------------------------------------------------------------------
// gradient-boosting
// ---------------------------------------------------------------------------
const GB = "gradient-boosting";
const gboost: Item[] = [
  // 1–10
  mcq(m(GB, "recall-residuals", "recall", 1, 15, "For squared loss, each new tree in gradient boosting is fitted to:"),
    "The residuals $y - F(\\mathbf{x})$ of the current model",
    [
      ["The original targets", "gb-targets", "It fits what the current model still gets wrong."],
      ["Random noise", "gb-noise", "It fits residuals."],
      ["The previous tree's predictions", "gb-previous", "It fits the remaining error."],
    ]),
  mcq(m(GB, "recall-additive", "recall", 1, 15, "A gradient-boosted model's prediction is:"),
    "An initial constant plus the sum of all trees' (shrunken) predictions",
    [
      ["The average of independent trees", "gb-average", "That's bagging."],
      ["The last tree's prediction only", "gb-last", "All trees are added together."],
      ["The product of the trees", "gb-product", "Contributions are summed."],
    ]),
  mcq(m(GB, "recall-shrinkage", "recall", 1, 15, "In gradient boosting, the learning rate (shrinkage):"),
    "Scales down each tree's contribution so the model improves in small steps",
    [
      ["Sets the tree depth", "shrinkage-depth", "Depth is separate."],
      ["Controls the bootstrap size", "shrinkage-bootstrap", "That's subsampling."],
      ["Has no effect on accuracy", "shrinkage-none", "It strongly affects generalisation."],
    ]),
  mcq(m(GB, "recall-sequential-boost", "recall", 2, 20, "Why can't gradient boosting's trees be trained fully in parallel the way a random forest's can?"),
    "Each tree depends on the residuals left by all previous trees",
    [
      ["Trees are too deep", "gb-deep", "The dependency, not depth, prevents it."],
      ["It uses bootstrap samples", "gb-bootstrap", "The sequential dependency is the reason."],
      ["It can, exactly like a forest", "gb-parallel", "Rounds are inherently sequential (though each tree's split search can be parallelised)."],
    ]),
  num(m(GB, "apply-residual", "apply", 2, 20, "Current prediction $15$, true value $19$, squared loss. What residual does the next tree try to fit?"), 4),
  num(m(GB, "apply-update", "apply", 2, 25, "Current prediction $15$; the new tree predicts $4$; learning rate $0.1$. What is the updated prediction?"), 15.4),
  num(m(GB, "apply-initial", "apply", 3, 25, "For squared loss, the initial constant is the mean target. With targets $3$, $7$, $8$ and $10$, what is it?"), 7),
  num(m(GB, "apply-two-rounds", "apply", 3, 30, "Start at $F_0 = 10$ for a point with $y = 20$. With learning rate $0.5$ and each tree predicting the residual exactly, what is $F_2$?"), 17.5),
  num(m(GB, "apply-log-odds-init", "apply", 3, 30, "For log loss, the initial prediction is the log-odds of the positive rate. With $25\\%$ positives, what is it? Give $4$ decimal places."), -1.0986),
  num(m(GB, "apply-log-loss-gradient", "apply", 4, 35, "With log loss, the negative gradient for one example is $y - p$. For $y = 1$ and $p = 0.35$, what is it?"), 0.65),
  // 11–20
  num(m(GB, "apply-leaf-value", "apply", 4, 40, "With log loss, a leaf's Newton step is $\\frac{\\sum(y - p)}{\\sum p(1 - p)}$. A leaf has two points with $(y, p) = (1, 0.5)$ and $(0, 0.5)$. What is the leaf value?"), 0),
  num(m(GB, "apply-leaf-value-2", "apply", 5, 45, "A leaf has points $(y, p) = (1, 0.2)$ and $(1, 0.4)$. What is the Newton leaf value $\\frac{\\sum(y - p)}{\\sum p(1 - p)}$? Give $4$ decimal places."), 3.5),
  num(m(GB, "apply-absolute-gradient", "apply", 4, 35, "For absolute loss $|y - F|$, the negative gradient is $\\operatorname{sign}(y - F)$. For $y = 5$ and $F = 8$, what is it?"), -1),
  short(m(GB, "explain-functional-gd", "explain", 6, 120, "Explain why gradient boosting is called gradient descent in function space."),
    [
      ["gradient", "At each step it computes the negative gradient of the loss with respect to the current predictions at each training point", 2, true],
      ["tree-step", "A tree approximates that gradient as a function of $\\mathbf{x}$, and adding it (times a learning rate) is a descent step", 2, true],
    ]),
  short(m(GB, "explain-lr-trees", "explain", 6, 120, "Why does a small learning rate with many trees usually generalise better than a large rate with few trees?"),
    [
      ["small-steps", "Small steps let the model approach the solution gradually, with each tree making only a modest correction", 2, true],
      ["regularisation", "This acts as regularisation (less fitting of noise early on), at the cost of more trees", 2, true],
    ]),
  mcq(m(GB, "explain-too-many-trees", "explain", 6, 50, "Unlike adding trees to a random forest, adding too many trees to gradient boosting can:"),
    "Overfit, so the number of trees is tuned, often with early stopping",
    [
      ["Never hurt", "gb-never-hurt", "Boosting keeps fitting residuals, including noise."],
      ["Only slow training", "gb-only-slow", "It also risks overfitting."],
      ["Reduce bias to zero safely", "gb-zero-bias", "Fitting noise raises variance."],
    ]),
  num(m(GB, "transfer-trees-halving", "transfer", 7, 60, "As a rule of thumb, halving the learning rate roughly doubles the trees needed. A model needs $400$ trees at rate $0.1$. About how many at rate $0.025$?"), 1600),
  mcq(m(GB, "transfer-quantile", "transfer", 7, 60, "A team needs the $90$th percentile of delivery time. How can gradient boosting provide it?"),
    "Use the quantile (pinball) loss with $\\tau = 0.9$",
    [
      ["Use squared loss and add $10\\%$", "quantile-add-10", "That doesn't target a quantile."],
      ["Use log loss", "quantile-log-loss", "Log loss is for classification."],
      ["It can't", "quantile-impossible", "Any differentiable (or subgradient) loss works."],
    ]),
  num(m(GB, "transfer-depth-interaction", "transfer", 8, 60, "A tree of depth $d$ can capture interactions among up to $d$ features. What depth allows $4$-way interactions?"), 4),
  short(m(GB, "transfer-subsampling", "transfer", 8, 150, "What is stochastic gradient boosting, and why does it often help?"),
    [
      ["method", "Each tree is fitted on a random subsample (e.g. $50\\%$–$80\\%$) of the training rows", 2, true],
      ["benefit", "This decorrelates trees and adds regularisation, often improving generalisation and speeding training", 2, true],
    ]),
  // 21–30
  num(m(GB, "transfer-early-stopping", "transfer", 8, 75, "Validation loss is lowest at tree $230$, and early stopping uses patience $50$. At what tree count does training stop if the loss never improves again?"), 280),
  mcq(m(GB, "transfer-vs-adaboost", "transfer", 9, 75, "How does gradient boosting generalise AdaBoost?"),
    "AdaBoost is gradient boosting with exponential loss; gradient boosting allows any differentiable loss",
    [
      ["They're unrelated", "gb-ada-unrelated", "AdaBoost is a special case."],
      ["Gradient boosting uses bootstrap samples instead", "gb-ada-bootstrap", "It fits gradients, not bootstraps."],
      ["AdaBoost uses squared loss", "ada-squared-loss", "AdaBoost uses exponential loss."],
    ]),
  num(m(GB, "transfer-shrunken-sum", "transfer", 9, 90, "With $F_0 = 0$, target $y = 1$ and each tree fitting the residual exactly, what fraction of $y$ is reached after $10$ rounds at learning rate $0.2$ ($1 - 0.8^{10}$)? Give $4$ decimal places."), 0.8926),
  short(m(GB, "transfer-leakage-target", "transfer", 9, 150, "A gradient-boosted classifier scores excellently in validation but poorly in production, and its top feature is a field updated after the outcome. Explain the problem and the fix."),
    [
      ["leak", "Target leakage: the feature encodes information only available after the outcome", 2, true],
      ["fix", "Remove it or recompute it as of prediction time, then re-validate with a time-respecting split", 2, true],
    ]),
  num(m(GB, "transfer-huber-gradient", "transfer", 10, 90, "Huber loss with $\\delta = 1$ has negative gradient $y - F$ if $|y - F| \\le 1$, else $\\operatorname{sign}(y - F)$. For $y = 10$ and $F = 6.5$, what is it?"), 1),
  mcq(m(GB, "transfer-histogram", "transfer", 10, 90, "Modern implementations (LightGBM, histogram-based GBM) bucket feature values into bins. Why?"),
    "Split search over a few hundred bins is far faster and uses less memory than over every distinct value",
    [
      ["Binning improves accuracy in all cases", "histogram-accuracy", "It's mainly a speed and memory gain."],
      ["Trees can't split on continuous values", "histogram-continuous", "They can; binning just speeds it up."],
      ["To make the model linear", "histogram-linear", "Trees stay piecewise constant."],
    ]),
  short(m(GB, "transfer-gb-vs-nn", "transfer", 10, 180, "Why have gradient-boosted trees remained the default for many tabular problems even as deep learning dominates images and text?"),
    [
      ["tabular", "Tabular features are heterogeneous, with sharp thresholds and interactions that trees capture naturally", 2, true],
      ["practical", "Boosted trees need little preprocessing, train fast, and tune easily, while neural nets lack the right inductive bias for such data", 2, true],
    ]),
  mcq(m(GB, "recall-weak-learner", "recall", 2, 20, "The base learners in gradient boosting are usually:"),
    "Shallow regression trees",
    [
      ["Deep classification trees", "gb-deep-trees", "Shallow trees are typical."],
      ["Linear SVMs", "gb-svm", "Trees are standard."],
      ["$k$-means clusters", "gb-kmeans", "Base learners are regression models."],
    ]),
  num(m(GB, "apply-sum-trees", "apply", 3, 25, "$F_0 = 2$, and three trees contribute $1.5$, $-0.5$ and $0.8$ (already shrunk). What is the final prediction?"), 3.8),
  num(m(GB, "apply-residual-after", "apply", 4, 35, "A point has $y = 12$ and current prediction $9$. After adding a tree predicting $2.5$ with learning rate $0.4$, what is its new residual?"), 2),
];

// ---------------------------------------------------------------------------
// xgboost
// ---------------------------------------------------------------------------
const XG = "xgboost";
const xgboost: Item[] = [
  // 1–10
  mcq(m(XG, "recall-what", "recall", 1, 15, "XGBoost is:"),
    "An optimised, regularised implementation of gradient-boosted trees",
    [
      ["A neural network library", "xgb-neural", "It's a tree-boosting library."],
      ["A clustering algorithm", "xgb-clustering", "It's supervised."],
      ["A type of random forest", "xgb-forest", "It boosts rather than bags."],
    ]),
  mcq(m(XG, "recall-second-order", "recall", 1, 15, "XGBoost's objective uses which derivatives of the loss?"),
    "First (gradient) and second (Hessian) derivatives",
    [
      ["Only first derivatives", "xgb-first-only", "It adds second-order information."],
      ["No derivatives", "xgb-no-derivatives", "It's gradient-based."],
      ["Third derivatives", "xgb-third", "A second-order expansion is used."],
    ]),
  mcq(m(XG, "recall-regularisation", "recall", 1, 15, "XGBoost's regularisation term $\\Omega(f) = \\gamma T + \\frac{1}{2}\\lambda\\|\\mathbf{w}\\|^{2}$ penalises:"),
    "The number of leaves $T$ and the size of the leaf weights $\\mathbf{w}$",
    [
      ["The number of features", "xgb-reg-features", "It acts on tree structure and leaf values."],
      ["The training-set size", "xgb-reg-n", "Data size isn't penalised."],
      ["The learning rate", "xgb-reg-lr", "The learning rate is a separate setting."],
    ]),
  mcq(m(XG, "recall-gamma", "recall", 2, 20, "In XGBoost, increasing $\\gamma$ (`min_split_loss`):"),
    "Requires a larger loss reduction before a split is made, producing simpler trees",
    [
      ["Makes trees deeper", "gamma-deeper", "It discourages splits."],
      ["Increases the learning rate", "gamma-lr", "That's `eta`."],
      ["Has no effect", "gamma-none", "It prunes low-gain splits."],
    ]),
  num(m(XG, "apply-leaf-weight", "apply", 2, 25, "The optimal leaf weight is $w^{*} = -\\frac{G}{H + \\lambda}$. With $G = -8$, $H = 3$ and $\\lambda = 1$, what is $w^{*}$?"), 2),
  num(m(XG, "apply-leaf-weight-lambda", "apply", 3, 25, "Same $G = -8$ and $H = 3$, but $\\lambda = 5$. What is $w^{*}$?"), 1),
  num(m(XG, "apply-leaf-score", "apply", 3, 30, "A leaf's contribution to the objective is $-\\frac{1}{2}\\frac{G^{2}}{H + \\lambda}$. With $G = 6$, $H = 2$ and $\\lambda = 1$, what is it?"), -6),
  num(m(XG, "apply-gain", "apply", 4, 40, "Split gain $= \\frac{1}{2}\\left[\\frac{G_L^{2}}{H_L + \\lambda} + \\frac{G_R^{2}}{H_R + \\lambda} - \\frac{(G_L + G_R)^{2}}{H_L + H_R + \\lambda}\\right] - \\gamma$. With $G_L = -4$, $H_L = 3$, $G_R = 6$, $H_R = 4$, $\\lambda = 1$ and $\\gamma = 0$, what is the gain?"), 5.35),
  num(m(XG, "apply-gain-gamma", "apply", 4, 35, "The same split with $\\gamma = 5$: what is the gain?"), 0.35),
  num(m(XG, "apply-hessian-logloss", "apply", 4, 35, "For log loss, each point's Hessian is $p(1 - p)$. What is it for $p = 0.2$?"), 0.16),
  // 11–20
  num(m(XG, "apply-gradient-logloss", "apply", 4, 35, "For log loss, each point's gradient is $p - y$. With $p = 0.2$ and $y = 1$, what is it?"), -0.8),
  num(m(XG, "apply-leaf-from-points", "apply", 5, 45, "A leaf holds two log-loss points with gradients $-0.8$, $-0.6$ and Hessians $0.16$, $0.24$. With $\\lambda = 1$, what is $w^{*}$? Give $4$ decimal places."), 1),
  num(m(XG, "apply-squared-hessian", "apply", 5, 40, "For squared loss $\\frac{1}{2}(y - F)^{2}$, what is each point's Hessian?"), 1),
  short(m(XG, "explain-second-order", "explain", 6, 120, "Why does using both the gradient and the Hessian help XGBoost choose leaf values and splits?"),
    [
      ["newton", "It's a Newton step: the Hessian rescales the gradient by local curvature, giving better-sized leaf values than gradient alone", 2, true],
      ["closed-form", "It yields closed-form leaf weights and a split-gain formula that can be evaluated quickly", 2, true],
    ]),
  short(m(XG, "explain-engineering", "explain", 6, 120, "Name two of XGBoost's engineering (as opposed to statistical) improvements."),
    [
      ["engineering", "E.g. sparsity-aware split finding / default directions for missing values, weighted quantile sketch, cache-aware column blocks, parallel and out-of-core computation", 4, true],
    ]),
  mcq(m(XG, "explain-missing", "explain", 6, 50, "How does XGBoost handle missing feature values at a split?"),
    "It learns a default direction for missing values at each split, choosing whichever side gives the better gain",
    [
      ["It deletes rows with missing values", "xgb-delete", "It routes them instead."],
      ["It imputes zeros", "xgb-zero", "It learns a direction."],
      ["It can't handle them", "xgb-cant", "Missing values are handled natively."],
    ]),
  num(m(XG, "transfer-min-child-weight", "transfer", 7, 60, "`min_child_weight` requires each child's Hessian sum to reach a threshold. For log loss with $p = 0.5$ everywhere (Hessian $0.25$ each), how many points must a child contain to reach $10$?"), 40),
  mcq(m(XG, "transfer-lambda-effect", "transfer", 7, 60, "Raising $\\lambda$ in XGBoost:"),
    "Shrinks leaf weights toward zero and makes splits slightly harder to justify",
    [
      ["Enlarges leaf weights", "lambda-enlarges", "It appears in the denominator, shrinking them."],
      ["Has no effect on splits", "lambda-no-split-effect", "It also enters the gain formula."],
      ["Increases tree depth", "lambda-depth", "It's a regulariser, not a depth control."],
    ]),
  num(m(XG, "transfer-eta", "transfer", 8, 60, "A leaf's optimal weight is $1.6$ and the learning rate `eta` is $0.05$. How much does this tree add to predictions for points in that leaf?"), 0.08),
  short(m(XG, "transfer-gamma-pruning", "transfer", 8, 150, "Explain how XGBoost's $\\gamma$ term relates to cost-complexity pruning of a single tree."),
    [
      ["penalty", "$\\gamma$ is a fixed cost per leaf, just like $\\alpha$ per leaf in cost-complexity pruning", 2, true],
      ["effect", "A split is kept only if its loss reduction exceeds $\\gamma$, so low-value branches are pruned", 2, true],
    ]),
  // 21–30
  num(m(XG, "transfer-gain-zero-split", "transfer", 8, 75, "With $\\lambda = 0$ and $\\gamma = 0$, a node has $G = 0$ split into $G_L = -3$, $H_L = 1$ and $G_R = 3$, $H_R = 1$. What is the gain?"), 9),
  mcq(m(XG, "transfer-colsample", "transfer", 9, 75, "XGBoost's `colsample_bytree` parameter borrows which idea from random forests?"),
    "Randomly sampling a subset of features for each tree to decorrelate trees",
    [
      ["Bootstrap sampling of rows", "colsample-rows", "That's `subsample`."],
      ["Out-of-bag error", "colsample-oob", "That's a different idea."],
      ["Majority voting", "colsample-voting", "Boosting sums trees."],
    ]),
  num(m(XG, "transfer-scale-pos-weight", "transfer", 9, 75, "A common heuristic sets `scale_pos_weight` to the ratio of negatives to positives. With $49{,}000$ negatives and $1{,}000$ positives, what is it?"), 49),
  short(m(XG, "transfer-tuning-order", "transfer", 9, 150, "Describe a sensible order for tuning XGBoost's main hyperparameters."),
    [
      ["order", "Fix a moderate learning rate and use early stopping for the number of trees; tune tree complexity (`max_depth`, `min_child_weight`), then sampling (`subsample`, `colsample`), then regularisation ($\\lambda$, $\\gamma$)", 3, true],
      ["final", "Finally lower the learning rate and raise the tree count for a last gain", 1],
    ]),
  num(m(XG, "transfer-hist-bins", "transfer", 10, 90, "With $256$ histogram bins per feature and $50$ features, how many candidate split points does a node evaluate at most?"), 12750),
  mcq(m(XG, "transfer-weighted-quantile", "transfer", 10, 90, "Why does XGBoost's weighted quantile sketch weight points by their Hessian when proposing split candidates?"),
    "The second-order objective weights each point's contribution by its Hessian, so candidates should split the Hessian mass evenly",
    [
      ["Hessians are the labels", "sketch-labels", "They're curvature weights."],
      ["To sort features alphabetically", "sketch-sort", "It's about weighted quantiles."],
      ["It weights by gradient only", "sketch-gradient", "The Hessian is the weight."],
    ]),
  short(m(XG, "transfer-xgb-dominance", "transfer", 10, 180, "XGBoost dominated tabular ML competitions for years. Give two reasons beyond raw accuracy."),
    [
      ["reasons", "Speed and scalability (parallel, sparse-aware, out-of-core), built-in regularisation and missing-value handling, and robustness with modest tuning", 4, true],
    ]),
  mcq(m(XG, "recall-eta", "recall", 2, 20, "In XGBoost, `eta` is the:"),
    "Learning rate (shrinkage applied to each tree)",
    [
      ["Number of trees", "eta-trees", "That's `n_estimators` / `num_boost_round`."],
      ["Maximum depth", "eta-depth", "That's `max_depth`."],
      ["Regularisation on leaf count", "eta-gamma", "That's $\\gamma$."],
    ]),
  num(m(XG, "apply-two-leaves-score", "apply", 3, 30, "With $\\lambda = 1$, two leaves have $(G, H) = (4, 3)$ and $(-2, 1)$. What is the sum of their scores $-\\frac{1}{2}\\frac{G^{2}}{H + \\lambda}$?"), -3),
  num(m(XG, "apply-squared-gradient", "apply", 3, 25, "For squared loss $\\frac{1}{2}(y - F)^{2}$, a point with $y = 7$ and $F = 4$ has what gradient $F - y$?"), -3),
];

// ---------------------------------------------------------------------------
// clustering-methods
// ---------------------------------------------------------------------------
const CL = "clustering-methods";
const clustering: Item[] = [
  // 1–10
  mcq(m(CL, "recall-goal", "recall", 1, 15, "What is the goal of clustering?"),
    "To group similar items together without using labels",
    [
      ["To predict a known label", "clustering-predict", "That's classification."],
      ["To reduce the number of features", "clustering-dimred", "That's dimensionality reduction."],
      ["To sort data by value", "clustering-sort", "Clustering groups by similarity."],
    ]),
  mcq(m(CL, "recall-partitional", "recall", 1, 15, "Which is a partitional (flat) clustering method?"),
    "$k$-means",
    [
      ["Agglomerative clustering", "partitional-agglomerative", "That's hierarchical."],
      ["PCA", "partitional-pca", "PCA isn't clustering."],
      ["Logistic regression", "partitional-logistic", "That's a classifier."],
    ]),
  mcq(m(CL, "recall-dendrogram", "recall", 1, 15, "A dendrogram shows:"),
    "The sequence of merges in hierarchical clustering, with the heights at which clusters join",
    [
      ["Cluster centroids", "dendrogram-centroids", "It shows the merge tree."],
      ["The number of features", "dendrogram-features", "It's about merges."],
      ["A decision tree", "dendrogram-decision", "It's a clustering hierarchy."],
    ]),
  mcq(m(CL, "recall-noise-points", "recall", 2, 20, "Which clustering method can label some points as noise rather than forcing them into a cluster?"),
    "DBSCAN",
    [
      ["$k$-means", "noise-kmeans", "$k$-means assigns every point."],
      ["Ward's hierarchical clustering", "noise-ward", "Every point ends up in the hierarchy."],
      ["Gaussian mixture models", "noise-gmm", "They assign every point soft memberships."],
    ]),
  num(m(CL, "apply-single-link", "apply", 2, 25, "1-D clusters $\\{1, 3\\}$ and $\\{7, 10\\}$. What is their single-linkage (closest-pair) distance?"), 4),
  num(m(CL, "apply-complete-link", "apply", 2, 25, "Same clusters $\\{1, 3\\}$ and $\\{7, 10\\}$. What is their complete-linkage (farthest-pair) distance?"), 9),
  num(m(CL, "apply-average-link", "apply", 3, 30, "Same clusters. What is their average-linkage distance (mean over all $4$ cross pairs)?"), 6.5),
  num(m(CL, "apply-centroid-link", "apply", 3, 25, "Same clusters. What is the distance between their centroids?"), 6.5),
  num(m(CL, "apply-merges", "apply", 3, 25, "Agglomerative clustering of $n = 80$ points down to one cluster performs how many merges?"), 79),
  num(m(CL, "apply-ward", "apply", 4, 40, "Ward's merge cost is $\\frac{n_A n_B}{n_A + n_B}\\|\\boldsymbol{\\mu}_A - \\boldsymbol{\\mu}_B\\|^{2}$. Clusters of sizes $2$ and $3$ have centroids $4$ apart. What is the cost?"), 19.2),
  // 11–20
  num(m(CL, "apply-dbscan-core", "apply", 4, 35, "DBSCAN with `minPts` $= 5$: a point has $4$ other points within $\\varepsilon$ (so $5$ counting itself). Is it a core point? Answer $1$ for yes, $0$ for no."), 1),
  num(m(CL, "apply-rand-index", "apply", 5, 45, "Two clusterings of $5$ points agree on $8$ of the $10$ pairs (same/different cluster). What is the Rand index?"), 0.8),
  mcq(m(CL, "apply-crescents", "apply", 5, 40, "Data form two interleaved crescent shapes. Which method can separate them?"),
    "DBSCAN or spectral clustering, which follow density/connectivity rather than distance to a centre",
    [
      ["$k$-means", "crescents-kmeans", "It finds convex, roughly spherical clusters."],
      ["Ward's method", "crescents-ward", "It also favours compact, spherical groups."],
      ["PCA", "crescents-pca", "PCA doesn't cluster."],
    ]),
  short(m(CL, "explain-evaluation", "explain", 6, 120, "Why is evaluating a clustering much harder than evaluating a classifier?"),
    [
      ["no-truth", "There are usually no ground-truth labels to compare against", 2, true],
      ["multiple", "Several different groupings can all be valid; internal metrics encode their own assumptions (e.g. compactness)", 2, true],
    ]),
  short(m(CL, "explain-chaining", "explain", 6, 120, "What is the chaining effect in single-linkage clustering?"),
    [
      ["chain", "Clusters merge through chains of close points, so two distinct groups joined by a thin bridge become one long cluster", 2, true],
      ["cause", "Because single linkage uses only the closest pair between clusters", 2, true],
    ]),
  mcq(m(CL, "explain-distance-choice", "explain", 6, 50, "Switching from Euclidean to cosine distance for clustering documents tends to:"),
    "Group documents by topic (direction of word use) regardless of their length",
    [
      ["Group documents by length", "cosine-length", "Cosine ignores vector length."],
      ["Have no effect", "cosine-no-effect", "The geometry changes substantially."],
      ["Make clustering impossible", "cosine-impossible", "Cosine distance is widely used for text."],
    ]),
  num(m(CL, "transfer-spectral-zero", "transfer", 7, 60, "A similarity graph has $4$ connected components. How many eigenvalues of its graph Laplacian equal $0$?"), 4),
  mcq(m(CL, "transfer-kleinberg", "transfer", 7, 60, "Kleinberg's impossibility theorem says no clustering function can satisfy which three properties at once?"),
    "Scale invariance, richness and consistency",
    [
      ["Accuracy, speed and interpretability", "kleinberg-practical", "The axioms are formal properties of clustering functions."],
      ["Convexity, smoothness and sparsity", "kleinberg-optimisation", "Those aren't the axioms."],
      ["Bias, variance and noise", "kleinberg-bias-variance", "That's a different decomposition."],
    ]),
  num(m(CL, "transfer-ari-identical", "transfer", 8, 60, "What adjusted Rand index do two identical clusterings get?"), 1),
  short(m(CL, "transfer-spectral", "transfer", 8, 150, "Explain the main idea of spectral clustering and why it can find non-convex clusters."),
    [
      ["graph", "Build a similarity graph and use the leading eigenvectors of its Laplacian to embed the points", 2, true],
      ["connectivity", "Points connected through chains of neighbours land close in that embedding, so $k$-means there recovers connected, possibly non-convex shapes", 2, true],
    ]),
  // 21–30
  num(m(CL, "transfer-cut-height", "transfer", 8, 60, "A dendrogram has merges at heights $1$, $2$, $3$, $7$ and $8$ for $6$ points. Cutting at height $5$ leaves how many clusters?"), 3),
  mcq(m(CL, "transfer-gmm-soft", "transfer", 9, 75, "How does a Gaussian mixture model differ from $k$-means in its cluster assignments?"),
    "It gives soft, probabilistic memberships and allows elliptical clusters with their own covariances",
    [
      ["It gives hard assignments only", "gmm-hard", "Its assignments are probabilities."],
      ["It needs labels", "gmm-labels", "It's unsupervised."],
      ["It can only find spherical clusters", "gmm-spherical", "Full covariances allow ellipses."],
    ]),
  num(m(CL, "transfer-hierarchical-cost", "transfer", 9, 75, "Naive agglomerative clustering stores an $n \\times n$ distance matrix. For $n = 30{,}000$, how many entries is that (in millions)?"), 900),
  short(m(CL, "transfer-choose-method", "transfer", 9, 150, "You must cluster $10$ million customer records with unknown cluster shapes and possible outliers. Discuss which methods are feasible and why."),
    [
      ["scalable", "Hierarchical clustering's $O(n^{2})$ memory rules it out; scalable options include mini-batch $k$-means and scalable DBSCAN variants (HDBSCAN with approximations)", 2, true],
      ["tradeoffs", "$k$-means is fast but assumes compact clusters and is outlier-sensitive; density methods handle shapes and noise but need careful parameters", 2, true],
    ]),
  num(m(CL, "transfer-silhouette-average", "transfer", 10, 90, "Points' silhouettes are $0.7$, $0.5$, $-0.1$ and $0.3$. What is the mean silhouette?"), 0.35),
  mcq(m(CL, "transfer-feature-scaling", "transfer", 10, 90, "Customers are clustered on income (in dollars) and age (in years) without scaling. What happens?"),
    "Income dominates the distances, so the clusters are essentially income bands",
    [
      ["Age dominates", "scaling-age", "Age varies over a much smaller numeric range."],
      ["Both contribute equally", "scaling-equal", "Units decide the weights without scaling."],
      ["Clustering fails to run", "scaling-fails", "It runs, but with distorted distances."],
    ]),
  short(m(CL, "transfer-stability", "transfer", 10, 180, "How can resampling-based stability be used to assess a clustering or choose the number of clusters?"),
    [
      ["procedure", "Cluster many bootstrap samples or subsamples and measure how consistently pairs of points end up together (e.g. ARI between runs)", 2, true],
      ["choose", "Prefer the number of clusters (and method) that gives the most stable groupings", 2, true],
    ]),
  mcq(m(CL, "recall-hierarchical-types", "recall", 2, 20, "Agglomerative hierarchical clustering works:"),
    "Bottom-up: start with each point alone and repeatedly merge the closest clusters",
    [
      ["Top-down: start with one cluster and split", "agglomerative-divisive", "That's divisive clustering."],
      ["By choosing $k$ centroids", "agglomerative-centroids", "That's $k$-means."],
      ["By density thresholds", "agglomerative-density", "That's DBSCAN."],
    ]),
  num(m(CL, "apply-within-ss", "apply", 3, 30, "A cluster contains $2$, $4$ and $9$. What is its within-cluster sum of squares about its mean?"), 26),
  num(m(CL, "apply-pairs-cluster", "apply", 4, 35, "A cluster has $12$ points. How many within-cluster pairs does it contain?"), 66),
];

export const mlSixty07Items: Item[] = [
  ...pruning,
  ...ensembles,
  ...bagging,
  ...forests,
  ...adaboost,
  ...gboost,
  ...xgboost,
  ...clustering,
];
