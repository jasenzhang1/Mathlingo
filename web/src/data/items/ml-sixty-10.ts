import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./ml-sixty-shared";

/**
 * Interpretability, anomaly detection, RL and bandits, stacking, and
 * hierarchical/density clustering, each brought from 30 to 60 questions.
 * These pools held only levels 5–8, so the additions concentrate on concrete
 * one-step applications at 1–4 and on judgement calls at 9–10.
 */

// ---------------------------------------------------------------------------
// model-interpretability
// ---------------------------------------------------------------------------
const MI = "model-interpretability";
const interpretability: Item[] = [
  // 1–10
  mcq(m(MI, "recall-why", "recall", 1, 15, "Which is a common reason to need model interpretability?"),
    "To explain individual decisions to the people they affect, such as a rejected loan applicant",
    [
      ["To make the model train faster", "interp-speed", "Interpretability is about understanding, not speed."],
      ["To increase the dataset size", "interp-data", "It doesn't add data."],
      ["To remove the need for testing", "interp-no-testing", "Models still need testing."],
    ]),
  mcq(m(MI, "recall-glass-box", "recall", 1, 15, "Which model is usually considered inherently interpretable?"),
    "A small linear model or a shallow decision tree",
    [
      ["A $100$-layer neural network", "glass-deep", "Deep networks are black boxes."],
      ["A $1{,}000$-tree gradient-boosted ensemble", "glass-ensemble", "Large ensembles are hard to read directly."],
      ["A large language model", "glass-llm", "These are among the least transparent."],
    ]),
  mcq(m(MI, "recall-local", "recall", 1, 15, "A *local* explanation describes:"),
    "Why the model made one particular prediction",
    [
      ["How the model behaves on average across all data", "local-is-global", "That's a global explanation."],
      ["How the training algorithm works", "local-algorithm", "It concerns one prediction."],
      ["The model's training time", "local-time", "Unrelated."],
    ]),
  num(m(MI, "apply-linear-contribution", "apply", 2, 20, "In $\\hat{y} = 50 + 3x_1 - 2x_2$, what does $x_1 = 4$ contribute to the prediction?"), 12),
  num(m(MI, "apply-linear-prediction", "apply", 2, 20, "Same model, $x_1 = 4$ and $x_2 = 5$. What is $\\hat{y}$?"), 52),
  mcq(m(MI, "apply-sign", "apply", 2, 20, "In a linear credit model, the coefficient on “missed payments” is $-15$. What does that mean, holding other features fixed?"),
    "Each additional missed payment lowers the score by $15$",
    [
      ["Missed payments raise the score by $15$", "sign-raises", "A negative coefficient lowers the prediction."],
      ["Missed payments are irrelevant", "sign-irrelevant", "A nonzero coefficient means the feature matters in the model."],
      ["The score is always $-15$", "sign-constant", "The coefficient multiplies the feature."],
    ]),
  num(m(MI, "apply-permutation", "apply", 3, 25, "A model's accuracy is $0.86$. Shuffling feature A drops it to $0.79$; shuffling B drops it to $0.85$. What is A's permutation importance?"), 0.07),
  num(m(MI, "apply-shap-sum", "apply", 3, 30, "A model's baseline (average) prediction is $0.30$, and a case's SHAP values are $0.15$, $-0.05$ and $0.10$. What is its prediction?"), 0.5),
  num(m(MI, "apply-shap-missing", "apply", 3, 30, "A prediction is $0.72$, the baseline $0.40$, and two of three SHAP values are $0.20$ and $-0.08$. What is the third?"), 0.2),
  num(m(MI, "apply-standardised-coef", "apply", 4, 35, "A coefficient is $0.02$ per dollar of income, and income's standard deviation is $\\$5{,}000$. What is the standardised coefficient (per standard deviation)?"), 100),
  // 11–20
  num(m(MI, "apply-odds-ratio", "apply", 4, 35, "In a logistic regression, a feature's coefficient is $\\ln 3$. By what factor does a one-unit increase multiply the odds?"), 3),
  num(m(MI, "apply-pdp-point", "apply", 4, 35, "A partial dependence value at $x = 5$ averages the model's predictions with the feature set to $5$ for every row. Predictions for three rows are $0.2$, $0.6$ and $0.4$. What is it?"), 0.4),
  num(m(MI, "apply-counterfactual", "apply", 4, 35, "A linear model approves applications scoring at least $600$. An applicant scores $570$, and each extra $\\$1{,}000$ of income adds $5$ points. How much more income (in thousands of dollars) would flip the decision?"), 6),
  short(m(MI, "explain-global-local", "explain", 5, 90, "Contrast a global and a local explanation, with one example method of each."),
    [
      ["global", "Global: describes overall model behaviour, e.g. permutation importance or partial dependence plots", 2, true],
      ["local", "Local: explains one prediction, e.g. SHAP values or LIME for that case, or a counterfactual", 2, true],
    ]),
  mcq(m(MI, "apply-ice", "apply", 5, 40, "Why might ICE curves reveal something a partial dependence plot hides?"),
    "The PDP averages individual curves, which can cancel out opposite effects in different subgroups",
    [
      ["ICE curves use fewer data", "ice-fewer", "They show each row instead of the average."],
      ["PDPs show individual rows", "pdp-rows", "That's ICE."],
      ["They always show the same thing", "ice-same", "Averaging can hide heterogeneity."],
    ]),
  short(m(MI, "explain-correlated-features", "explain", 6, 120, "Why can importance scores mislead when two features are strongly correlated?"),
    [
      ["split", "The model may use either one, so importance gets split between them or assigned arbitrarily", 2, true],
      ["permutation", "Permuting one creates unrealistic combinations, or the model leans on the other, so each looks less important than the pair is", 2, true],
    ]),
  mcq(m(MI, "explain-fidelity", "explain", 6, 50, "A surrogate tree explains a black-box model but matches its predictions only $70\\%$ of the time. What does this mean?"),
    "The explanation has low fidelity, so conclusions drawn from the tree may not reflect what the black box actually does",
    [
      ["The black box is $70\\%$ accurate", "fidelity-accuracy", "Fidelity measures agreement with the black box, not with labels."],
      ["The surrogate is a perfect explanation", "fidelity-perfect", "$30\\%$ disagreement is substantial."],
      ["The black box should be replaced by the tree", "fidelity-replace", "Low fidelity argues against that conclusion."],
    ]),
  num(m(MI, "transfer-shapley-two", "transfer", 7, 60, "A two-feature model has value $v(\\varnothing) = 0$, $v(\\{A\\}) = 10$, $v(\\{B\\}) = 4$ and $v(\\{A, B\\}) = 20$. What is A's Shapley value (average of its marginal contributions over both orderings)?"), 13),
  mcq(m(MI, "transfer-importance-not-causal", "transfer", 8, 60, "A churn model's most important feature is “number of support calls.” Should the company reduce support calls to cut churn?"),
    "Not on that basis — importance reflects predictive association, and unhappy customers may both call more and churn more",
    [
      ["Yes, importance shows causation", "importance-causal", "Importance isn't causal evidence."],
      ["Yes, if the importance is above $0.5$", "importance-threshold", "No threshold makes it causal."],
      ["No, because importance scores are always wrong", "importance-wrong", "They're informative about prediction, just not causation."],
    ]),
  num(m(MI, "transfer-lime-weight", "transfer", 8, 60, "LIME weights a perturbed sample by $e^{-d^{2}/\\sigma^{2}}$. With distance $d = 1$ and kernel width $\\sigma = 2$, what is its weight? Give $4$ decimal places."), 0.7788),
  // 21–30
  short(m(MI, "transfer-explanation-gaming", "transfer", 9, 150, "Why can a model be built to give reassuring explanations (e.g. via LIME or SHAP) while still relying on a protected attribute?"),
    [
      ["off-manifold", "These methods probe the model with perturbed or out-of-distribution inputs; an adversarial model can behave differently on such inputs", 2, true],
      ["implication", "So explanations should be audited (e.g. with in-distribution tests) rather than trusted as proof of fair behaviour", 2, true],
    ]),
  mcq(m(MI, "transfer-rashomon", "transfer", 9, 75, "Several very different models achieve the same accuracy but give different feature importances. What does this “Rashomon effect” imply?"),
    "Importance from any one model isn't a unique truth about the data; explanations should be checked across good models",
    [
      ["One of the models must be wrong", "rashomon-wrong", "All may be equally good predictors."],
      ["Feature importance is meaningless", "rashomon-meaningless", "It's model-specific, not meaningless."],
      ["The data are corrupted", "rashomon-corrupt", "Multiplicity is common with correlated features."],
    ]),
  num(m(MI, "transfer-shapley-orderings", "transfer", 9, 75, "Exact Shapley values average over all orderings of the features. How many orderings for $8$ features?"), 40320),
  short(m(MI, "transfer-regulated-choice", "transfer", 9, 150, "A lender must explain every rejection. Argue for an inherently interpretable model over a black box with post-hoc explanations, and note the trade-off."),
    [
      ["faithful", "An interpretable model's explanation is exact (the model itself), whereas post-hoc explanations can be unfaithful", 2, true],
      ["tradeoff", "It may cost some accuracy; measure that gap — often small on tabular data — before choosing", 2, true],
    ]),
  num(m(MI, "transfer-pdp-cost", "transfer", 10, 90, "A partial dependence plot over $50$ grid values on $20{,}000$ rows needs how many model predictions (in millions)?"), 1),
  mcq(m(MI, "transfer-counterfactual-actionable", "transfer", 10, 90, "A counterfactual explanation says “you'd be approved if you were $10$ years younger.” What's wrong with it?"),
    "It isn't actionable (and may rely on a protected attribute); useful counterfactuals change features the person can actually change",
    [
      ["Nothing — it's accurate", "cf-accurate", "Accuracy isn't enough for a useful explanation."],
      ["Counterfactuals must change every feature", "cf-every-feature", "They should change few, actionable ones."],
      ["Counterfactuals can't involve age", "cf-no-age", "The issue is actionability and fairness."],
    ]),
  short(m(MI, "transfer-debugging", "transfer", 10, 180, "Give an example of interpretability catching a model bug that accuracy alone wouldn't, and say how it would show up."),
    [
      ["example", "E.g. a medical model relying on a hospital-specific image marker or a leaked ID feature", 2, true],
      ["signal", "It shows up as an implausible feature dominating importance/SHAP or saliency maps focused on irrelevant regions", 2, true],
    ]),
  num(m(MI, "transfer-shap-baseline-change", "transfer", 10, 90, "A prediction is $0.80$. If the SHAP baseline is moved from $0.30$ to $0.50$, what must the SHAP values now sum to?"), 0.3),
  mcq(m(MI, "recall-posthoc", "recall", 2, 20, "A *post-hoc* explanation method is one that:"),
    "Explains an already-trained model from the outside, without changing it",
    [
      ["Is built into the model's training", "posthoc-built-in", "That's an inherently interpretable model."],
      ["Retrains the model", "posthoc-retrain", "It leaves the model unchanged."],
      ["Only works for linear models", "posthoc-linear", "It works for any model."],
    ]),
  num(m(MI, "apply-feature-share", "apply", 3, 25, "Permutation importances are $0.08$, $0.02$ and $0.10$. What share of the total does the largest account for?"), 0.5),
];

// ---------------------------------------------------------------------------
// anomaly-detection
// ---------------------------------------------------------------------------
const AD = "anomaly-detection";
const anomaly: Item[] = [
  // 1–10
  mcq(m(AD, "recall-goal", "recall", 1, 15, "What is anomaly detection?"),
    "Finding data points that differ markedly from the bulk of the data",
    [
      ["Predicting a continuous value", "anomaly-regression", "That's regression."],
      ["Grouping all points into clusters", "anomaly-clustering", "It singles out unusual points."],
      ["Removing duplicate rows", "anomaly-dedup", "Duplicates aren't anomalies per se."],
    ]),
  mcq(m(AD, "recall-unlabelled", "recall", 1, 15, "Why is anomaly detection often unsupervised?"),
    "Anomalies are rare and varied, so labelled examples of them are scarce",
    [
      ["Labels are illegal", "anomaly-illegal", "They're scarce, not forbidden."],
      ["Supervised learning can't detect rare events", "anomaly-supervised-impossible", "It can, given enough labels."],
      ["Anomalies have no features", "anomaly-no-features", "They have features like any point."],
    ]),
  mcq(m(AD, "recall-score", "recall", 1, 15, "Most anomaly detectors output:"),
    "A score, with a threshold turning it into a flag",
    [
      ["Only a binary label", "anomaly-binary", "Scores are usual; the threshold is a separate choice."],
      ["A cluster ID", "anomaly-cluster-id", "That's clustering."],
      ["A probability that sums to $1$ across points", "anomaly-sums", "Scores aren't normalised that way."],
    ]),
  num(m(AD, "apply-zscore", "apply", 2, 20, "A reading of $130$ comes from a process with mean $100$ and standard deviation $10$. What is its $z$-score?"), 3),
  mcq(m(AD, "apply-zscore-rule", "apply", 2, 20, "Using the rule “flag if $|z| > 3$,” is a reading with $z = 2.4$ flagged?"),
    "No",
    [
      ["Yes", "zscore-flag", "$2.4$ is below the threshold $3$."],
      ["Only if it's negative", "zscore-negative", "The rule uses the absolute value."],
      ["It can't be decided", "zscore-undecided", "The rule decides it directly."],
    ]),
  num(m(AD, "apply-iqr", "apply", 3, 25, "With $Q_1 = 20$ and $Q_3 = 40$, Tukey's upper fence is $Q_3 + 1.5 \\cdot \\text{IQR}$. What is it?"), 70),
  num(m(AD, "apply-iqr-lower", "apply", 3, 25, "Same quartiles. What is the lower fence $Q_1 - 1.5 \\cdot \\text{IQR}$?"), -10),
  num(m(AD, "apply-contamination", "apply", 3, 25, "With a contamination setting of $0.5\\%$ on $40{,}000$ points, how many points are flagged?"), 200),
  num(m(AD, "apply-knn-score", "apply", 4, 35, "A distance-based detector scores a point by its mean distance to its $3$ nearest neighbours, which are $2$, $3$ and $7$. What is its score?"), 4),
  num(m(AD, "apply-reconstruction", "apply", 4, 35, "An autoencoder reconstructs $[1, 2, 3]$ as $[1, 2.5, 1]$. What is the squared reconstruction error?"), 4.25),
  // 11–20
  num(m(AD, "apply-precision-topk", "apply", 4, 35, "Of the top $50$ flagged transactions, $18$ are confirmed fraud. What is precision@$50$?"), 0.36),
  num(m(AD, "apply-iforest-path", "apply", 4, 40, "Isolation Forest scores $s = 2^{-E[h]/c(n)}$. With average path length $E[h] = c(n)$, what is the score?"), 0.5),
  short(m(AD, "explain-novelty-outlier", "explain", 5, 90, "Distinguish outlier detection from novelty detection."),
    [
      ["outlier", "Outlier detection: the training data already contain anomalies and the method must find them", 2, true],
      ["novelty", "Novelty detection: training data are clean, and the method flags new points unlike them", 2, true],
    ]),
  mcq(m(AD, "apply-multivariate", "apply", 5, 40, "Height $190$ cm is normal and weight $45$ kg is normal on their own, but together they're unusual. This is:"),
    "A multivariate (contextual combination) anomaly that univariate checks miss",
    [
      ["Not an anomaly", "multivariate-not", "The combination is rare."],
      ["A univariate anomaly", "multivariate-univariate", "Neither value alone is unusual."],
      ["Label noise", "multivariate-label", "No labels are involved."],
    ]),
  short(m(AD, "explain-evaluation", "explain", 6, 120, "Why is evaluating an anomaly detector so hard, and how can it be done in practice?"),
    [
      ["hard", "There are few or no labelled anomalies, and new kinds may differ from any past examples", 2, true],
      ["practice", "Use expert review of top-ranked flags (precision@k), injected synthetic anomalies, or historical incidents as a partial test set", 2, true],
    ]),
  mcq(m(AD, "explain-iforest-idea", "explain", 6, 50, "Why do anomalies tend to get short paths in Isolation Forest?"),
    "They sit in sparse regions, so random splits isolate them in few steps",
    [
      ["They have large feature values", "iforest-large", "Sparseness, not magnitude, is the key."],
      ["Trees are trained on anomalies", "iforest-trained", "Trees use random splits on all data."],
      ["They're always near the centre", "iforest-centre", "They're typically far from dense regions."],
    ]),
  num(m(AD, "transfer-mahalanobis", "transfer", 7, 60, "With covariance $\\operatorname{diag}(4, 9)$ and mean $[0, 0]$, what is the squared Mahalanobis distance of $[4, 6]$?"), 8),
  mcq(m(AD, "transfer-scaling", "transfer", 8, 60, "A distance-based detector uses temperature (°C, range $20$–$30$) and pressure (Pa, range $100{,}000$–$102{,}000$) unscaled. What goes wrong?"),
    "Pressure dominates distances, so temperature anomalies are essentially invisible",
    [
      ["Temperature dominates", "scaling-temp", "Pressure has the much larger numeric range."],
      ["Nothing", "scaling-nothing", "Unscaled units distort distances."],
      ["The detector flags everything", "scaling-everything", "It flags based on pressure alone."],
    ]),
  num(m(AD, "transfer-lof", "transfer", 8, 60, "LOF compares a point's local density with its neighbours'. If a point's density is $0.2$ and its neighbours' average density is $0.8$, what is its LOF score (ratio of neighbour density to its own)?"), 4),
  // 21–30
  short(m(AD, "transfer-concept-of-normal", "transfer", 9, 150, "An anomaly detector trained on last year's traffic flags many legitimate events after a product launch. Explain why and what to do."),
    [
      ["drift", "Its notion of “normal” is fixed to last year's distribution; the launch legitimately changed normal behaviour", 2, true],
      ["action", "Retrain or update the baseline on recent data, add context features (e.g. launch period), and monitor flag rates", 2, true],
    ]),
  mcq(m(AD, "transfer-base-rate", "transfer", 9, 75, "A detector with $99\\%$ specificity screens $10$ million transactions with $0.01\\%$ fraud. Why will most of its flags be false alarms?"),
    "$1\\%$ of $9{,}999{,}000$ legitimate transactions is about $100{,}000$ false alarms, swamping roughly $1{,}000$ frauds",
    [
      ["Because specificity is low", "base-rate-spec", "$99\\%$ is high; the base rate is the issue."],
      ["Because fraud is undetectable", "base-rate-undetectable", "It may detect fraud well; false alarms still dominate."],
      ["It won't — most flags are fraud", "base-rate-wrong", "The arithmetic shows the opposite."],
    ]),
  num(m(AD, "transfer-false-alarms", "transfer", 9, 75, "In that setting ($10^{7}$ transactions, $0.01\\%$ fraud, $99\\%$ specificity, $100\\%$ recall), what is the precision? Give $4$ decimal places."), 0.0099),
  short(m(AD, "transfer-semi-supervised", "transfer", 9, 150, "A team has millions of unlabelled transactions and $200$ confirmed frauds. Describe how to use both."),
    [
      ["unsupervised", "Train an unsupervised detector on the bulk of (mostly normal) data", 2, true],
      ["labels", "Use the $200$ frauds to tune thresholds, validate precision/recall, or train a supervised model on top of anomaly scores", 2, true],
    ]),
  num(m(AD, "transfer-ensemble-scores", "transfer", 10, 90, "Two detectors give a point rank-normalised scores $0.9$ and $0.6$, combined with weights $0.7$ and $0.3$. What is the combined score?"), 0.81),
  mcq(m(AD, "transfer-masking", "transfer", 10, 90, "Several anomalies cluster together, making each look normal relative to its neighbours. This is called:"),
    "Masking",
    [
      ["Swamping", "masking-swamping", "Swamping is when normal points are wrongly flagged."],
      ["Overfitting", "masking-overfit", "It's a property of the anomalies."],
      ["Label shift", "masking-label", "No labels are involved."],
    ]),
  short(m(AD, "transfer-high-dim", "transfer", 10, 180, "Why does anomaly detection get harder with hundreds of features, and what can help?"),
    [
      ["hard", "Distances concentrate and anomalies may differ only in a few relevant features, hidden among many irrelevant ones", 2, true],
      ["help", "Feature selection, subspace methods (e.g. Isolation Forest's random features), dimensionality reduction, or domain-specific features", 2, true],
    ]),
  num(m(AD, "transfer-threshold-percentile", "transfer", 10, 90, "Scores are thresholded at the $99.5$th percentile of training scores. On $2{,}000{,}000$ new points from the same distribution, about how many are flagged?"), 10000),
  mcq(m(AD, "recall-synonym", "recall", 2, 20, "Which term is often used interchangeably with anomaly detection?"),
    "Outlier detection",
    [
      ["Classification", "synonym-classification", "Classification uses labels for known classes."],
      ["Regression", "synonym-regression", "Regression predicts values."],
      ["Feature scaling", "synonym-scaling", "That's preprocessing."],
    ]),
  num(m(AD, "apply-percent-flagged", "apply", 3, 25, "A detector flags $350$ of $70{,}000$ points. What percentage is that?"), 0.5),
];

// ---------------------------------------------------------------------------
// reinforcement-learning
// ---------------------------------------------------------------------------
const RL = "reinforcement-learning";
const rl: Item[] = [
  // 1–10
  mcq(m(RL, "recall-agent", "recall", 1, 15, "In reinforcement learning, the *agent* is:"),
    "The learner that observes states and chooses actions",
    [
      ["The environment", "rl-agent-env", "The environment responds to the agent."],
      ["The reward", "rl-agent-reward", "Rewards are feedback."],
      ["The dataset", "rl-agent-data", "RL data come from interaction."],
    ]),
  mcq(m(RL, "recall-goal", "recall", 1, 15, "An RL agent's goal is to:"),
    "Maximise cumulative (usually discounted) reward",
    [
      ["Minimise the number of actions", "rl-goal-actions", "It maximises return."],
      ["Predict labels", "rl-goal-labels", "There are no labels."],
      ["Maximise the immediate reward only", "rl-goal-greedy", "It cares about long-term return."],
    ]),
  mcq(m(RL, "recall-state", "recall", 1, 15, "The *state* in RL is:"),
    "A description of the situation the agent is in",
    [
      ["The agent's reward", "rl-state-reward", "Rewards are separate."],
      ["The action chosen", "rl-state-action", "Actions are chosen in states."],
      ["The learning rate", "rl-state-lr", "It's the situation description."],
    ]),
  num(m(RL, "apply-return", "apply", 2, 20, "Rewards $2$, $0$, $5$ arrive over three steps with $\\gamma = 1$. What is the return?"), 7),
  num(m(RL, "apply-discounted", "apply", 2, 25, "Rewards $4$, $4$ arrive at steps $0$ and $1$ with $\\gamma = 0.5$. What is the discounted return?"), 6),
  num(m(RL, "apply-three-steps", "apply", 3, 25, "Rewards $1$, $2$, $4$ at steps $0$, $1$, $2$ with $\\gamma = 0.5$. What is the return?"), 3),
  num(m(RL, "apply-infinite", "apply", 3, 30, "A reward of $1$ arrives every step forever with $\\gamma = 0.8$. What is the return?"), 5),
  num(m(RL, "apply-final-reward", "apply", 3, 30, "Only a final reward of $100$ arrives at step $3$ (steps $0$–$2$ give $0$). With $\\gamma = 0.9$, what is the return from step $0$? Give $1$ decimal place."), 72.9),
  num(m(RL, "apply-q-greedy", "apply", 3, 25, "In a state, $Q(s, \\text{left}) = 2.4$, $Q(s, \\text{right}) = 3.1$ and $Q(s, \\text{stay}) = 1.0$. What value does a greedy agent expect (the largest $Q$)?"), 3.1),
  num(m(RL, "apply-v-from-q", "apply", 4, 35, "Under a policy that picks left with probability $0.25$ and right with $0.75$, with $Q$ values $4$ and $8$, what is $V(s) = \\sum_a \\pi(a \\mid s)Q(s, a)$?"), 7),
  // 11–20
  num(m(RL, "apply-epsilon-greedy", "apply", 4, 35, "With $\\epsilon = 0.2$ and $4$ actions, an $\\epsilon$-greedy agent picks a random action with probability $\\epsilon$. What is the probability it picks the greedy action (which can also be chosen at random)?"), 0.85),
  num(m(RL, "apply-td-target", "apply", 4, 35, "A TD target is $r + \\gamma V(s')$. With $r = 1$, $\\gamma = 0.9$ and $V(s') = 10$, what is it?"), 10),
  short(m(RL, "explain-vs-supervised", "explain", 5, 90, "How does a reward differ from a supervised label?"),
    [
      ["evaluative", "A reward evaluates the action taken (how good it was) rather than telling the agent the correct action", 2, true],
      ["delayed", "Rewards can be delayed and depend on sequences of actions, unlike per-example labels", 2, true],
    ]),
  mcq(m(RL, "apply-on-off-policy", "apply", 5, 40, "Q-learning learns about the greedy policy while behaving $\\epsilon$-greedily. It is therefore:"),
    "Off-policy",
    [
      ["On-policy", "qlearning-on-policy", "It learns about a different policy than it follows."],
      ["Supervised", "qlearning-supervised", "It learns from rewards."],
      ["Model-based", "qlearning-model-based", "It's model-free."],
    ]),
  short(m(RL, "explain-markov", "explain", 6, 120, "Explain the Markov property and why RL algorithms rely on it."),
    [
      ["definition", "The next state and reward depend only on the current state and action, not on the earlier history", 2, true],
      ["reliance", "This lets value functions be defined per state and computed recursively (Bellman equations)", 2, true],
    ]),
  mcq(m(RL, "explain-model-based", "explain", 6, 50, "What distinguishes a model-based RL method from a model-free one?"),
    "It learns or uses a model of the environment's dynamics to plan, rather than learning values or policies directly from experience",
    [
      ["It uses a neural network", "model-based-nn", "Both kinds can use networks."],
      ["It needs no rewards", "model-based-no-reward", "It still optimises rewards."],
      ["It only works offline", "model-based-offline", "It can be online or offline."],
    ]),
  num(m(RL, "transfer-gamma-horizon", "transfer", 7, 60, "With $\\gamma = 0.95$, a reward $20$ steps ahead is discounted by $0.95^{20}$. What weight is that? Give $4$ decimal places."), 0.3585),
  mcq(m(RL, "transfer-reward-shaping", "transfer", 8, 60, "A robot rewarded only for reaching a distant goal rarely learns. Adding small rewards for moving closer is called:"),
    "Reward shaping",
    [
      ["Reward hacking", "shaping-hacking", "Hacking is exploiting a flawed reward."],
      ["Discounting", "shaping-discounting", "Discounting weights future rewards."],
      ["Exploration", "shaping-exploration", "Shaping changes the reward signal."],
    ]),
  num(m(RL, "transfer-potential-shaping", "transfer", 8, 60, "Potential-based shaping adds $\\gamma\\Phi(s') - \\Phi(s)$. With $\\gamma = 0.9$, $\\Phi(s) = 10$ and $\\Phi(s') = 12$, what is the shaping bonus?"), 0.8),
  // 21–30
  short(m(RL, "transfer-sample-efficiency", "transfer", 9, 150, "Why is reinforcement learning often far less sample-efficient than supervised learning?"),
    [
      ["sparse", "Rewards are sparse and delayed, so credit for good actions must be inferred from many trials", 2, true],
      ["exploration", "The agent must explore to gather informative data, and its data distribution changes as its policy improves", 2, true],
    ]),
  mcq(m(RL, "transfer-sim2real", "transfer", 9, 75, "Why does a policy trained in simulation often fail on a real robot?"),
    "The sim-to-real gap: dynamics, sensors and friction differ from the simulator, so the policy meets states it never saw",
    [
      ["Real robots don't give rewards", "sim2real-rewards", "Rewards can be defined for real robots too."],
      ["Simulators are too accurate", "sim2real-accurate", "Inaccuracy, not accuracy, is the issue."],
      ["Policies can't run on hardware", "sim2real-hardware", "They run; they just behave poorly."],
    ]),
  num(m(RL, "transfer-average-reward", "transfer", 9, 75, "A continuing task gives rewards $3$, $5$, $4$, $4$ repeating forever. What is the average reward per step?"), 4),
  short(m(RL, "transfer-offline-rl", "transfer", 9, 150, "What makes offline reinforcement learning (learning only from a fixed log) hard, compared with online RL?"),
    [
      ["no-exploration", "The agent can't try new actions to correct its estimates", 2, true],
      ["extrapolation", "Value estimates for actions rarely seen in the log are unreliable, and the learned policy may exploit those overestimates", 2, true],
    ]),
  num(m(RL, "transfer-bootstrap-target", "transfer", 10, 90, "A $2$-step return uses $r_0 + \\gamma r_1 + \\gamma^{2}V(s_2)$. With $r_0 = 1$, $r_1 = 2$, $\\gamma = 0.5$ and $V(s_2) = 8$, what is it?"), 4),
  mcq(m(RL, "transfer-rlhf", "transfer", 10, 90, "In RLHF for language models, what plays the role of the reward?"),
    "A learned reward model trained to predict human preferences between outputs",
    [
      ["The next-token log-likelihood", "rlhf-likelihood", "That's the pre-training objective."],
      ["A fixed hand-written score", "rlhf-handwritten", "It's learned from comparisons."],
      ["The length of the response", "rlhf-length", "Length would be a poor, hackable reward."],
    ]),
  short(m(RL, "transfer-safety", "transfer", 10, 180, "Explain why deploying an RL agent that keeps learning in the real world raises safety concerns that a fixed supervised model doesn't."),
    [
      ["exploration", "Exploration means deliberately trying untested actions, which can be harmful in the real world", 2, true],
      ["drift", "Its behaviour keeps changing as it learns, so tests before deployment don't guarantee later behaviour; constraints and monitoring are needed", 2, true],
    ]),
  num(m(RL, "transfer-discount-for-horizon", "transfer", 10, 90, "Which discount $\\gamma$ gives an effective horizon $\\frac{1}{1 - \\gamma}$ of $50$ steps?"), 0.98),
  mcq(m(RL, "recall-episode", "recall", 2, 20, "An *episode* in RL is:"),
    "One run of interaction from a start state until a terminal state",
    [
      ["One parameter update", "episode-update", "An episode is a full interaction sequence."],
      ["One reward", "episode-reward", "An episode contains many steps."],
      ["The whole training run", "episode-training", "Training spans many episodes."],
    ]),
  num(m(RL, "apply-steps-episode", "apply", 3, 25, "An agent runs $40$ episodes of $250$ steps each. How many environment steps in total?"), 10000),
];

// ---------------------------------------------------------------------------
// multi-armed-bandits
// ---------------------------------------------------------------------------
const MAB = "multi-armed-bandits";
const bandits: Item[] = [
  // 1–10
  mcq(m(MAB, "recall-name", "recall", 1, 15, "The name “multi-armed bandit” comes from:"),
    "Slot machines (“one-armed bandits”) — choosing which of several machines to play",
    [
      ["Robbers with many weapons", "bandit-robbers", "It refers to slot machines."],
      ["Neural networks with many layers", "bandit-layers", "Unrelated."],
      ["Octopus-inspired robots", "bandit-octopus", "It's a gambling metaphor."],
    ]),
  mcq(m(MAB, "recall-state", "recall", 1, 15, "How does a bandit problem differ from full reinforcement learning?"),
    "There are no states that evolve with the agent's actions — each choice is a one-step decision",
    [
      ["Bandits have no rewards", "bandit-no-rewards", "Rewards are central."],
      ["Bandits need labels", "bandit-labels", "They learn from rewards."],
      ["Bandits have more states", "bandit-more-states", "They have none (or a fixed context)."],
    ]),
  mcq(m(MAB, "recall-explore-exploit", "recall", 1, 15, "The core dilemma in bandits is:"),
    "Exploring arms to learn their rewards versus exploiting the arm that currently looks best",
    [
      ["Choosing a learning rate", "dilemma-lr", "The dilemma is exploration vs. exploitation."],
      ["Choosing the number of layers", "dilemma-layers", "Unrelated."],
      ["Choosing a loss function", "dilemma-loss", "It's about which arm to pull."],
    ]),
  num(m(MAB, "apply-mean", "apply", 2, 20, "An arm returned rewards $1$, $0$, $1$, $1$ and $0$. What is its estimated mean reward?"), 0.6),
  num(m(MAB, "apply-epsilon-explore", "apply", 2, 20, "$\\epsilon$-greedy with $\\epsilon = 0.1$ runs $2{,}000$ rounds. About how many are exploration rounds?"), 200),
  num(m(MAB, "apply-regret", "apply", 3, 25, "The best arm's mean is $0.7$. Over $50$ rounds an algorithm averages $0.62$ per round. What is its cumulative regret?"), 4),
  num(m(MAB, "apply-greedy-pick", "apply", 3, 25, "Arms have estimated means $0.31$, $0.45$ and $0.40$. Using $1$-based numbering, which arm does a greedy algorithm pull?"), 2),
  num(m(MAB, "apply-ucb", "apply", 3, 30, "UCB1 scores an arm by $\\bar{x} + \\sqrt{\\frac{2\\ln t}{n}}$. With $\\bar{x} = 0.5$, $t = 100$ and $n = 25$, what is the bonus term? Give $3$ decimal places."), 0.607),
  num(m(MAB, "apply-ucb-score", "apply", 4, 35, "Same arm ($\\bar{x} = 0.5$, bonus $0.607$). What is its UCB score?"), 1.107),
  num(m(MAB, "apply-beta-mean", "apply", 4, 35, "Thompson sampling with a Beta$(1, 1)$ prior: an arm saw $7$ successes and $3$ failures. Its posterior is Beta$(8, 4)$. What is the posterior mean? Give $4$ decimal places."), 0.6667),
  // 11–20
  num(m(MAB, "apply-gap", "apply", 4, 35, "Arm means are $0.8$ (best), $0.75$ and $0.5$. What is the gap $\\Delta$ of the second arm?"), 0.05),
  num(m(MAB, "apply-linear-regret", "apply", 4, 35, "$\\epsilon$-greedy with fixed $\\epsilon = 0.05$, $5$ arms and gaps averaging $0.2$ for the suboptimal ones loses about $\\epsilon \\cdot \\frac{4}{5} \\cdot 0.2$ per round. Over $10{,}000$ rounds, how much regret is that?"), 80),
  short(m(MAB, "explain-greedy-fails", "explain", 5, 90, "Why can a purely greedy bandit algorithm get stuck on a bad arm forever?"),
    [
      ["unlucky", "If the best arm gives a few unlucky early rewards, its estimate is low and greedy never tries it again", 2, true],
      ["no-correction", "Without exploration, estimates of unplayed arms never get corrected", 2, true],
    ]),
  mcq(m(MAB, "apply-contextual", "apply", 5, 40, "A news site shows each visitor one of $5$ headlines, using the visitor's location and device. This is a:"),
    "Contextual bandit",
    [
      ["Plain multi-armed bandit", "contextual-plain", "The context (location, device) informs the choice."],
      ["Supervised classification", "contextual-supervised", "Only the shown headline's reward is observed."],
      ["Clustering problem", "contextual-clustering", "It's a sequential decision problem."],
    ]),
  short(m(MAB, "explain-ucb-optimism", "explain", 6, 120, "Explain the principle of “optimism in the face of uncertainty” behind UCB."),
    [
      ["optimism", "Each arm is scored by an optimistic upper bound: its mean plus a bonus that is large when it has been tried rarely", 2, true],
      ["effect", "Uncertain arms get explored until their bound falls, so exploration is targeted rather than random", 2, true],
    ]),
  mcq(m(MAB, "explain-thompson", "explain", 6, 50, "How does Thompson sampling choose an arm?"),
    "It samples a mean from each arm's posterior and pulls the arm with the highest sample",
    [
      ["It always pulls the arm with the highest posterior mean", "thompson-greedy", "That's greedy; sampling adds exploration."],
      ["It pulls arms in a fixed rotation", "thompson-rotation", "Choices are random, guided by posteriors."],
      ["It pulls a uniformly random arm", "thompson-uniform", "Arms with better posteriors are favoured."],
    ]),
  num(m(MAB, "transfer-log-regret", "transfer", 7, 60, "UCB's regret grows like $\\ln T$. If regret is $20$ at $T = 1{,}000$, roughly what is it at $T = 1{,}000{,}000$ (assuming proportionality to $\\ln T$)?"), 40),
  mcq(m(MAB, "transfer-ab-vs-bandit", "transfer", 8, 60, "Why might a company prefer a bandit over a fixed $50/50$ A/B test?"),
    "A bandit shifts traffic toward the better variant during the test, reducing the cost of showing the worse one",
    [
      ["Bandits give cleaner statistical estimates", "bandit-cleaner", "Fixed splits usually give cleaner unbiased estimates."],
      ["A/B tests can't compare two variants", "ab-cant-compare", "They can."],
      ["Bandits need no traffic", "bandit-no-traffic", "They need traffic to learn."],
    ]),
  num(m(MAB, "transfer-beta-variance", "transfer", 8, 75, "A Beta$(a, b)$ posterior has variance $\\frac{ab}{(a + b)^{2}(a + b + 1)}$. What is it for Beta$(8, 4)$? Give $4$ decimal places."), 0.0171),
  // 21–30
  short(m(MAB, "transfer-nonstationary", "transfer", 9, 150, "Standard bandit algorithms assume each arm's reward distribution is fixed. What goes wrong if user preferences drift, and how can algorithms adapt?"),
    [
      ["problem", "Old observations no longer reflect current means, so the algorithm keeps exploiting an arm that's become worse", 2, true],
      ["adapt", "Use sliding windows or discounting of old rewards, or periodic forced exploration", 2, true],
    ]),
  mcq(m(MAB, "transfer-best-arm", "transfer", 9, 75, "How does a best-arm identification objective differ from regret minimisation?"),
    "It aims to identify the best arm confidently by the end, without caring about rewards earned along the way",
    [
      ["It maximises total reward during the test", "best-arm-regret", "That's regret minimisation."],
      ["It ignores which arm is best", "best-arm-ignores", "Identifying it is the whole goal."],
      ["They're identical", "best-arm-same", "They trade off exploration differently."],
    ]),
  num(m(MAB, "transfer-hoeffding-bound", "transfer", 9, 90, "To estimate an arm's mean within $\\pm 0.05$ with probability $95\\%$, Hoeffding needs $n \\ge \\frac{\\ln(2/0.05)}{2 \\cdot 0.05^{2}}$ pulls. What is the smallest whole $n$?"), 738),
  short(m(MAB, "transfer-delayed-feedback", "transfer", 9, 150, "In an ad campaign, conversions arrive days after an ad is shown. How does this delayed feedback affect a bandit, and how can it be handled?"),
    [
      ["effect", "Recent pulls look like failures until conversions arrive, biasing estimates and slowing learning", 2, true],
      ["handle", "Model the delay, use only matured observations, or update estimates as conversions arrive (batched updates)", 2, true],
    ]),
  num(m(MAB, "transfer-lower-bound", "transfer", 10, 90, "The Lai–Robbins lower bound says each suboptimal arm must be pulled about $\\frac{\\ln T}{\\text{KL}}$ times. With $T = e^{10}$ and $\\text{KL} = 0.5$, how many pulls is that?"), 20),
  mcq(m(MAB, "transfer-off-policy-eval", "transfer", 10, 90, "How can a new bandit policy be evaluated from logs of an old policy without deploying it?"),
    "Inverse propensity scoring: reweight logged rewards by the ratio of the new to the old policy's action probabilities",
    [
      ["Average all logged rewards", "ope-average", "That evaluates the old policy, not the new one."],
      ["It can't be done", "ope-impossible", "Off-policy evaluation makes it possible (with enough overlap)."],
      ["Use only the most common action", "ope-common-action", "That ignores the new policy's choices."],
    ]),
  short(m(MAB, "transfer-explore-cost", "transfer", 10, 180, "In a medical trial framed as a bandit, why might pure regret minimisation conflict with scientific goals?"),
    [
      ["imbalance", "Shifting patients toward the apparently better treatment leaves few patients on the other arm, weakening the statistical comparison", 2, true],
      ["ethics-science", "This trades knowledge for patient benefit; designs must balance ethics, power and bias in estimates", 2, true],
    ]),
  num(m(MAB, "transfer-ip-weight", "transfer", 10, 90, "A logged reward of $1$ came from an action the old policy chose with probability $0.2$; the new policy would choose it with probability $0.6$. What is its importance-weighted reward?"), 3),
  mcq(m(MAB, "recall-arm", "recall", 2, 20, "In a bandit problem, an *arm* is:"),
    "One of the options the agent can choose, each with its own unknown reward distribution",
    [
      ["A state of the environment", "arm-state", "Bandits have no evolving state."],
      ["A layer of a network", "arm-layer", "It's an option."],
      ["The total reward", "arm-reward", "It's a choice."],
    ]),
  num(m(MAB, "apply-pull-share", "apply", 3, 25, "After $500$ rounds, arm $1$ was pulled $410$ times. What fraction of pulls went to it?"), 0.82),
];

// ---------------------------------------------------------------------------
// stacking
// ---------------------------------------------------------------------------
const SK = "stacking";
const stacking: Item[] = [
  // 1–10
  mcq(m(SK, "recall-levels", "recall", 1, 15, "In stacking, the models are arranged as:"),
    "Base models whose predictions feed a meta-model that makes the final prediction",
    [
      ["A single model trained twice", "stacking-twice", "There are several base models and a meta-model."],
      ["Trees grown sequentially on residuals", "stacking-boosting", "That's boosting."],
      ["Independent models averaged equally", "stacking-averaging", "Stacking learns how to combine."],
    ]),
  mcq(m(SK, "recall-meta-input", "recall", 1, 15, "What are the meta-model's inputs?"),
    "The base models' predictions (sometimes plus the original features)",
    [
      ["Only the raw features", "meta-raw", "Its main inputs are base predictions."],
      ["The labels", "meta-labels", "Labels are its targets, not inputs."],
      ["Random noise", "meta-noise", "It uses base predictions."],
    ]),
  mcq(m(SK, "recall-diverse", "recall", 1, 15, "Stacking benefits most from base models that are:"),
    "Individually good and different in kind, so their errors differ",
    [
      ["Identical", "stacking-identical", "Identical models add nothing."],
      ["All very poor", "stacking-poor", "They should be reasonably accurate."],
      ["Trained on the test set", "stacking-test", "That's leakage."],
    ]),
  num(m(SK, "apply-meta-features", "apply", 2, 20, "There are $4$ base models, each producing one prediction per example. How many input features does the meta-model receive (without the original features)?"), 4),
  num(m(SK, "apply-meta-features-multiclass", "apply", 3, 25, "There are $3$ base classifiers on a $5$-class problem, each giving a probability per class. How many meta-features?"), 15),
  num(m(SK, "apply-linear-meta", "apply", 3, 25, "A linear meta-model has weights $0.5$, $0.3$ and $0.2$ on base predictions $10$, $20$ and $15$. What is the stacked prediction?"), 14),
  num(m(SK, "apply-oof-fits", "apply", 3, 25, "Generating out-of-fold predictions for $4$ base models with $5$-fold CV takes how many base-model fits?"), 20),
  num(m(SK, "apply-with-refit", "apply", 3, 30, "Adding one full-data refit of each of the $4$ base models (to predict on new data), how many fits in total?"), 24),
  num(m(SK, "apply-blend-holdout", "apply", 4, 35, "Blending holds out $20\\%$ of $10{,}000$ rows to train the meta-model. How many rows train the base models?"), 8000),
  num(m(SK, "apply-weighted-error", "apply", 4, 35, "Two base models have errors $+4$ and $-2$ on an example. With meta-weights $0.4$ and $0.6$, what is the stacked error?"), 0.4),
  // 11–20
  mcq(m(SK, "apply-meta-simple", "apply", 4, 35, "Why is the meta-model usually simple (e.g. regularised linear regression)?"),
    "Its inputs are few and highly correlated, so a complex meta-model easily overfits",
    [
      ["Complex meta-models can't be trained", "meta-complex-impossible", "They can, but they overfit."],
      ["Simple models are always more accurate", "meta-simple-accurate", "Simplicity is about avoiding overfitting here."],
      ["The meta-model doesn't need training", "meta-no-training", "It's trained on out-of-fold predictions."],
    ]),
  num(m(SK, "apply-gain", "apply", 4, 35, "The best base model scores $0.842$ AUC and the stack $0.851$. What is the gain in AUC points (thousandths)?"), 9),
  short(m(SK, "explain-oof", "explain", 5, 90, "What does the out-of-fold step in stacking achieve?"),
    [
      ["honest", "Each base prediction for a training row comes from a model that didn't see that row", 2, true],
      ["meta", "So the meta-model learns from predictions that look like those on new data, not from overfit in-sample predictions", 2, true],
    ]),
  mcq(m(SK, "apply-in-sample-meta", "apply", 5, 40, "A meta-model is trained on base models' in-sample predictions. What typically happens?"),
    "It over-trusts the most overfit base model, and the stack performs badly on new data",
    [
      ["It works perfectly", "in-sample-perfect", "In-sample predictions are overoptimistic."],
      ["It ignores all base models", "in-sample-ignores", "It leans heavily on the overfit ones."],
      ["Nothing changes", "in-sample-nothing", "The meta-model's learned weights are distorted."],
    ]),
  short(m(SK, "explain-vs-voting", "explain", 6, 120, "How does stacking's combination rule differ from simple averaging or voting?"),
    [
      ["learned", "Stacking learns the combination (weights or a non-linear rule) from data", 2, true],
      ["adaptive", "It can down-weight weak models and exploit complementary strengths, whereas averaging treats all equally", 2, true],
    ]),
  mcq(m(SK, "explain-same-family", "explain", 6, 50, "Stacking five slightly different gradient-boosted models usually gains little. Why?"),
    "Their predictions are highly correlated, so the meta-model has little complementary information to combine",
    [
      ["Gradient boosting can't be stacked", "gbm-cant-stack", "It can; diversity is the issue."],
      ["Five models is too many", "five-too-many", "Count isn't the problem."],
      ["The meta-model is always linear", "meta-always-linear", "Correlation, not linearity, limits the gain."],
    ]),
  num(m(SK, "transfer-nested-cost", "transfer", 7, 60, "Evaluating a stack with an outer $5$-fold CV, where each outer fold itself runs $5$-fold OOF for $3$ base models plus refits, needs $5 \\times (3 \\times 5 + 3)$ base fits. How many?"), 90),
  mcq(m(SK, "transfer-meta-features-original", "transfer", 8, 60, "Why might the meta-model also be given some original features?"),
    "So it can learn which base model to trust in which region of the input space",
    [
      ["To replace the base models", "original-replace", "Base predictions remain the main inputs."],
      ["Because base predictions are useless", "original-useless", "They're the key inputs."],
      ["It's required for regression", "original-regression", "It's optional."],
    ]),
  num(m(SK, "transfer-constrained-weights", "transfer", 8, 60, "A meta-model with non-negative weights summing to $1$ gives $0.7$ to model A. If B is the only other model, what weight does B get?"), 0.3),
  // 21–30
  short(m(SK, "transfer-small-data", "transfer", 9, 150, "With only $300$ training rows, why is stacking risky, and what's a safer alternative?"),
    [
      ["risky", "OOF predictions and the meta-model are estimated from very little data, so the combination is noisy and can overfit", 2, true],
      ["alternative", "A simple average of a few diverse models, or a single well-regularised model", 2, true],
    ]),
  mcq(m(SK, "transfer-production-cost", "transfer", 9, 75, "Why is stacking common in competitions but rare in production?"),
    "It adds training and serving cost, latency and maintenance for gains that are often small",
    [
      ["Stacking is less accurate", "stacking-less-accurate", "It's often slightly more accurate."],
      ["Production systems can't use multiple models", "production-single", "They can, at a cost."],
      ["Stacking needs labels at prediction time", "stacking-labels-predict", "It doesn't."],
    ]),
  num(m(SK, "transfer-latency", "transfer", 9, 75, "Three base models take $12$, $30$ and $8$ ms run sequentially, and the meta-model $1$ ms. What is the total prediction latency?"), 51),
  short(m(SK, "transfer-vs-boosting", "transfer", 9, 150, "Both stacking and boosting combine models. Contrast how each builds and combines its members."),
    [
      ["stacking", "Stacking trains diverse base models independently (in parallel), then learns a combiner on their out-of-fold predictions", 2, true],
      ["boosting", "Boosting trains models sequentially, each correcting the previous ones' errors, and adds them with fixed weights", 2, true],
    ]),
  num(m(SK, "transfer-parallel-latency", "transfer", 10, 90, "If the same three base models ($12$, $30$, $8$ ms) run in parallel, what is the total latency including the $1$ ms meta-model?"), 31),
  mcq(m(SK, "transfer-time-series-stacking", "transfer", 10, 90, "How should out-of-fold predictions be generated when stacking time-series forecasters?"),
    "With forward-chaining splits, so each base prediction uses only earlier data",
    [
      ["With shuffled $k$-fold CV", "stacking-ts-shuffle", "That leaks future information into OOF predictions."],
      ["In-sample", "stacking-ts-in-sample", "That overfits."],
      ["From the test period", "stacking-ts-test", "That's leakage."],
    ]),
  short(m(SK, "transfer-select-base", "transfer", 10, 180, "Given a shortlist of trained candidate models, how would you choose which to include in a stack?"),
    [
      ["accuracy-diversity", "Prefer models that are each reasonably accurate and whose OOF errors are weakly correlated", 2, true],
      ["validate", "Check with nested evaluation that adding each model improves the stack's held-out score, using greedy forward selection or regularised meta-weights", 2, true],
    ]),
  num(m(SK, "transfer-correlation-gain", "transfer", 10, 90, "Two unbiased base models have error variance $1$ each and error correlation $\\rho$. Averaging them gives error variance $\\frac{1 + \\rho}{2}$. What is it for $\\rho = 0.6$?"), 0.8),
  mcq(m(SK, "recall-original-name", "recall", 2, 20, "Stacking was originally called:"),
    "Stacked generalisation (Wolpert, $1992$)",
    [
      ["Bootstrap aggregating", "stacking-bagging-name", "That's bagging."],
      ["Adaptive boosting", "stacking-adaboost-name", "That's AdaBoost."],
      ["Random subspace method", "stacking-subspace-name", "That's a different ensemble idea."],
    ]),
  num(m(SK, "apply-average-stack", "apply", 2, 20, "An equal-weight blend of three models predicting $0.6$, $0.9$ and $0.3$ gives what?"), 0.6),
];

// ---------------------------------------------------------------------------
// hierarchical-clustering
// ---------------------------------------------------------------------------
const HC = "hierarchical-clustering";
const hierarchical: Item[] = [
  // 1–10
  mcq(m(HC, "recall-output", "recall", 1, 15, "What does hierarchical clustering produce, instead of one flat partition?"),
    "A nested hierarchy of clusters, shown as a dendrogram",
    [
      ["A single set of $k$ centroids", "hc-centroids", "That's $k$-means."],
      ["A classifier", "hc-classifier", "It's unsupervised."],
      ["A density estimate", "hc-density", "It produces a merge tree."],
    ]),
  mcq(m(HC, "recall-no-k", "recall", 1, 15, "Does agglomerative clustering need the number of clusters in advance?"),
    "No — you can cut the dendrogram afterwards at any level",
    [
      ["Yes, always", "hc-needs-k", "The full hierarchy is built first."],
      ["Only for Ward's linkage", "hc-ward-k", "No linkage needs $k$ up front."],
      ["Only for large datasets", "hc-large-k", "Size doesn't change this."],
    ]),
  mcq(m(HC, "recall-agglomerative", "recall", 1, 15, "Agglomerative clustering starts with:"),
    "Every point in its own cluster",
    [
      ["All points in one cluster", "agglomerative-one", "That's divisive clustering."],
      ["$k$ random centroids", "agglomerative-centroids", "That's $k$-means."],
      ["Two clusters", "agglomerative-two", "It starts with $n$ singletons."],
    ]),
  num(m(HC, "apply-merges", "apply", 2, 20, "Agglomerative clustering of $25$ points into a single cluster takes how many merges?"), 24),
  num(m(HC, "apply-clusters-after", "apply", 2, 20, "Starting with $40$ singletons, how many clusters remain after $30$ merges?"), 10),
  num(m(HC, "apply-single", "apply", 3, 25, "1-D clusters $\\{2, 5\\}$ and $\\{9, 14\\}$. What is their single-linkage distance?"), 4),
  num(m(HC, "apply-complete", "apply", 3, 25, "Same clusters. What is their complete-linkage distance?"), 12),
  num(m(HC, "apply-average", "apply", 3, 30, "Same clusters. What is their average-linkage distance (mean of the four cross distances)?"), 8),
  num(m(HC, "apply-cut", "apply", 3, 25, "Merges of $7$ points happen at heights $0.5$, $1$, $1.5$, $4$, $5$ and $9$. Cutting at height $3$ leaves how many clusters?"), 4),
  num(m(HC, "apply-pairwise", "apply", 4, 35, "Agglomerative clustering of $1{,}000$ points needs how many pairwise distances (unordered pairs)?"), 499500),
  // 11–20
  num(m(HC, "apply-ward-cost", "apply", 4, 40, "Ward's cost $\\frac{n_A n_B}{n_A + n_B}\\|\\boldsymbol{\\mu}_A - \\boldsymbol{\\mu}_B\\|^{2}$ for clusters of sizes $4$ and $4$ whose centroids are $3$ apart is what?"), 18),
  num(m(HC, "apply-memory", "apply", 4, 35, "Storing the full distance matrix for $40{,}000$ points in $8$-byte floats takes how many gigabytes (using $10^{9}$ bytes)?"), 12.8),
  short(m(HC, "explain-greedy", "explain", 5, 90, "Why is agglomerative clustering called greedy, and what's a consequence?"),
    [
      ["greedy", "At each step it merges the currently closest pair, never revisiting earlier merges", 2, true],
      ["consequence", "An early poor merge can't be undone, so the hierarchy may be suboptimal globally", 2, true],
    ]),
  mcq(m(HC, "apply-linkage-choice", "apply", 5, 40, "You expect compact, roughly spherical clusters of similar size. Which linkage suits this?"),
    "Ward's linkage",
    [
      ["Single linkage", "linkage-single-compact", "Single linkage favours long chains."],
      ["No linkage", "linkage-none", "A linkage rule is required."],
      ["Random linkage", "linkage-random", "That isn't a standard method."],
    ]),
  short(m(HC, "explain-chaining", "explain", 6, 120, "Explain the chaining effect of single linkage with an example of when it's helpful and when it's harmful."),
    [
      ["effect", "Single linkage joins clusters through their closest points, so it follows chains of nearby points", 2, true],
      ["help-harm", "Helpful for elongated or curved clusters; harmful when a thin bridge of noise points connects two distinct groups", 2, true],
    ]),
  mcq(m(HC, "explain-cophenetic", "explain", 6, 50, "The cophenetic distance between two points is:"),
    "The dendrogram height at which they first join the same cluster",
    [
      ["Their original Euclidean distance", "cophenetic-euclidean", "It's measured on the dendrogram."],
      ["The number of merges in total", "cophenetic-merges", "It's specific to a pair of points."],
      ["Their distance to the root", "cophenetic-root", "It's the merge height for the pair."],
    ]),
  num(m(HC, "transfer-ward-merge", "transfer", 7, 60, "Ward merges clusters of sizes $1$ and $3$ whose centroids are $4$ apart. By how much does the within-cluster sum of squares increase?"), 12),
  mcq(m(HC, "transfer-dendrogram-reading", "transfer", 8, 60, "Two leaves sit side by side in a dendrogram. Does that mean they're close?"),
    "Not necessarily — leaf order is partly arbitrary; closeness is shown by the height at which they join",
    [
      ["Yes, adjacency always means closest", "dendrogram-adjacency", "Branches can be flipped without changing the tree."],
      ["No, they're always far apart", "dendrogram-far", "They may or may not be close."],
      ["Only if the dendrogram is sorted", "dendrogram-sorted", "Merge height is what matters."],
    ]),
  num(m(HC, "transfer-gap-cut", "transfer", 8, 60, "Merge heights are $0.2$, $0.3$, $0.35$, $0.4$, $2.1$ and $2.3$ for $7$ points. Cutting in the largest gap (between $0.4$ and $2.1$) gives how many clusters?"), 3),
  // 21–30
  short(m(HC, "transfer-no-single-answer", "transfer", 9, 150, "Explain why there's generally no single correct way to cut a dendrogram, and give two practical guides."),
    [
      ["nested", "The hierarchy contains structure at many scales; different cuts reflect different, equally valid granularities", 2, true],
      ["guides", "E.g. cut at a large gap in merge heights, choose $k$ by silhouette or stability, or use domain needs", 2, true],
    ]),
  mcq(m(HC, "transfer-phylogeny", "transfer", 9, 75, "Why is hierarchical clustering a natural fit for building trees of species from genetic distances?"),
    "Evolutionary relationships are themselves nested, so a merge tree mirrors common-ancestry structure",
    [
      ["Species have no distances", "phylo-no-distances", "Genetic distances are its input."],
      ["Because it needs labels", "phylo-labels", "It's unsupervised."],
      ["Because $k$-means can't run on DNA", "phylo-kmeans", "The nested structure is the reason."],
    ]),
  num(m(HC, "transfer-time-complexity", "transfer", 9, 75, "Naive agglomerative clustering costs about $n^{3}$. How many times longer does $n = 2{,}000$ take than $n = 500$?"), 64),
  short(m(HC, "transfer-scaling", "transfer", 9, 150, "Agglomerative clustering on $5$ million points is infeasible. Describe a practical two-stage workaround."),
    [
      ["stage1", "First compress the data, e.g. $k$-means into a few thousand micro-clusters (or sample)", 2, true],
      ["stage2", "Then run hierarchical clustering on the micro-cluster centres (weighted by size), and map points back", 2, true],
    ]),
  num(m(HC, "transfer-cophenetic-corr", "transfer", 10, 90, "Cophenetic correlation compares original distances with cophenetic distances. For three pairs with original distances $1$, $2$, $3$ and cophenetic distances $1$, $3$, $3$, what is their Pearson correlation? Give $3$ decimal places."), 0.866),
  mcq(m(HC, "transfer-divisive", "transfer", 10, 90, "Why is divisive (top-down) hierarchical clustering rarely used compared with agglomerative?"),
    "Choosing the best split of a cluster is combinatorially expensive, so exact divisive methods don't scale",
    [
      ["It gives no dendrogram", "divisive-no-dendrogram", "It also produces a hierarchy."],
      ["It needs labels", "divisive-labels", "It's unsupervised."],
      ["It always gives worse results", "divisive-worse", "It can be good; cost is the barrier."],
    ]),
  short(m(HC, "transfer-linkage-assumptions", "transfer", 10, 180, "Explain why choosing a linkage rule is really choosing an assumption about cluster shape."),
    [
      ["rules", "Single linkage assumes connectivity (chains), complete linkage compact clusters with small diameter, Ward's spherical low-variance clusters", 2, true],
      ["consequence", "So different linkages can give very different hierarchies on the same data; pick the one matching the expected structure", 2, true],
    ]),
  num(m(HC, "transfer-merge-count-cut", "transfer", 10, 90, "For $n$ points, cutting a full dendrogram to get $k$ clusters undoes how many of the final merges? With $n = 100$ and $k = 6$, answer the number undone."), 5),
  mcq(m(HC, "recall-dendrogram-height", "recall", 2, 20, "In a dendrogram, what does the height at which two branches join represent?"),
    "The distance (by the chosen linkage) at which those clusters merged",
    [
      ["The number of points in the clusters", "height-size", "Size isn't encoded in height."],
      ["The order of the data rows", "height-order", "Height reflects merge distance."],
      ["The cluster labels", "height-labels", "There are no labels."],
    ]),
  num(m(HC, "apply-leaves", "apply", 2, 20, "A dendrogram of $64$ points has how many leaves?"), 64),
];

// ---------------------------------------------------------------------------
// density-based-clustering
// ---------------------------------------------------------------------------
const DB = "density-based-clustering";
const density: Item[] = [
  // 1–10
  mcq(m(DB, "recall-idea", "recall", 1, 15, "Density-based clustering defines clusters as:"),
    "Dense regions of points separated by sparser regions",
    [
      ["Spheres around $k$ centroids", "density-spheres", "That's $k$-means."],
      ["Branches of a dendrogram", "density-dendrogram", "That's hierarchical clustering."],
      ["Groups with equal numbers of points", "density-equal", "Cluster sizes are free."],
    ]),
  mcq(m(DB, "recall-dbscan-name", "recall", 1, 15, "DBSCAN stands for:"),
    "Density-based spatial clustering of applications with noise",
    [
      ["Dynamic Bayesian spectral clustering", "dbscan-bayesian", "It's density-based."],
      ["Distributed batch scanning", "dbscan-batch", "Unrelated."],
      ["Deep binary spatial clustering", "dbscan-deep", "It's not a deep-learning method."],
    ]),
  mcq(m(DB, "recall-noise", "recall", 1, 15, "What does DBSCAN do with points in sparse regions far from any cluster?"),
    "Labels them as noise rather than assigning them to a cluster",
    [
      ["Assigns them to the nearest cluster", "dbscan-assign", "That's $k$-means behaviour."],
      ["Deletes them from the data", "dbscan-delete", "They're labelled, not deleted."],
      ["Makes each its own cluster", "dbscan-singleton", "They're marked as noise."],
    ]),
  num(m(DB, "apply-core", "apply", 2, 20, "With `minPts` $= 4$, a point has $5$ points (including itself) within $\\varepsilon$. Is it a core point? Answer $1$ for yes, $0$ for no."), 1),
  num(m(DB, "apply-not-core", "apply", 2, 20, "With `minPts` $= 6$, a point has $4$ points (including itself) within $\\varepsilon$. Is it a core point? Answer $1$ for yes, $0$ for no."), 0),
  num(m(DB, "apply-neighbours-1d", "apply", 3, 25, "1-D points $0, 1, 1.5, 4, 4.2$. With $\\varepsilon = 1$, how many points (including itself) lie within $\\varepsilon$ of $1$?"), 3),
  num(m(DB, "apply-minpts-rule", "apply", 3, 25, "A common rule sets `minPts` to at least $d + 1$. For $3$-D data, what is the minimum?"), 4),
  num(m(DB, "apply-minpts-2d", "apply", 3, 25, "Another rule of thumb uses `minPts` $= 2d$. For $5$-dimensional data, what is it?"), 10),
  num(m(DB, "apply-noise-fraction", "apply", 3, 25, "DBSCAN labels $180$ of $6{,}000$ points as noise. What percentage is that?"), 3),
  num(m(DB, "apply-clusters-count", "apply", 4, 35, "1-D points $0, 0.5, 1, 5, 5.4, 5.8, 10$ with $\\varepsilon = 0.6$ and `minPts` $= 2$ (including the point itself). How many clusters does DBSCAN find?"), 2),
  // 11–20
  num(m(DB, "apply-noise-count", "apply", 4, 35, "Same setting. How many points are labelled noise?"), 1),
  num(m(DB, "apply-kdistance", "apply", 4, 35, "To choose $\\varepsilon$, sort each point's distance to its $4$th nearest neighbour and look for the knee. If the sorted values jump from $0.8$ to $2.5$, a reasonable $\\varepsilon$ is at the knee value before the jump. What is it?"), 0.8),
  short(m(DB, "explain-no-k", "explain", 5, 90, "How does DBSCAN decide the number of clusters, and what does it need instead?"),
    [
      ["emerges", "The number of clusters emerges from the density structure — connected dense regions become clusters", 2, true],
      ["params", "Instead it needs $\\varepsilon$ (neighbourhood radius) and `minPts` (density threshold)", 2, true],
    ]),
  mcq(m(DB, "apply-rings", "apply", 5, 40, "Two concentric rings of points: which method separates them?"),
    "DBSCAN, which follows connected dense regions",
    [
      ["$k$-means", "rings-kmeans", "It splits along a straight boundary."],
      ["Ward's hierarchical clustering", "rings-ward", "It favours compact blobs."],
      ["PCA", "rings-pca", "PCA isn't clustering."],
    ]),
  short(m(DB, "explain-varying-density", "explain", 6, 120, "Why does DBSCAN struggle when clusters have very different densities, and what variant helps?"),
    [
      ["single-eps", "One global $\\varepsilon$ either merges the sparse cluster into noise or merges dense clusters together", 2, true],
      ["hdbscan", "HDBSCAN (or OPTICS) handles varying densities by considering a range of density levels", 2, true],
    ]),
  mcq(m(DB, "explain-border", "explain", 6, 50, "A border point lies within $\\varepsilon$ of core points from two different clusters. Which cluster gets it?"),
    "Whichever cluster reaches it first in processing order — border assignment is order-dependent",
    [
      ["Both clusters", "border-both", "Standard DBSCAN gives each point one label."],
      ["Neither — it becomes noise", "border-noise", "It's reachable from a core point, so it's not noise."],
      ["The larger cluster always", "border-larger", "There's no size rule."],
    ]),
  num(m(DB, "transfer-scaling", "transfer", 7, 60, "One feature is in millimetres (spread about $500$) and another in metres (spread about $0.5$). Without scaling, how many times larger is the first feature's typical contribution to distances?"), 1000),
  mcq(m(DB, "transfer-high-dim", "transfer", 8, 60, "Why does DBSCAN become hard to use in very high dimensions?"),
    "Distances concentrate, so choosing an $\\varepsilon$ that separates dense from sparse regions becomes nearly impossible",
    [
      ["It can't compute distances", "dbscan-no-distances", "It can; they're just uninformative."],
      ["It needs labels in high dimensions", "dbscan-labels", "It stays unsupervised."],
      ["It always finds one cluster per dimension", "dbscan-per-dim", "No such rule."],
    ]),
  num(m(DB, "transfer-region-query", "transfer", 8, 60, "Without an index, DBSCAN's region queries compare every point with every other. How many distance computations for $n = 20{,}000$ (counting each ordered pair, in millions)?"), 400),
  // 21–30
  short(m(DB, "transfer-anomaly", "transfer", 9, 150, "How can DBSCAN double as an anomaly detector, and what's a caveat?"),
    [
      ["noise", "Points labelled noise lie in sparse regions and can be treated as anomalies", 2, true],
      ["caveat", "The result is binary and sensitive to $\\varepsilon$/`minPts`; clustered anomalies may form their own cluster instead of being flagged", 2, true],
    ]),
  mcq(m(DB, "transfer-eps-sensitivity", "transfer", 9, 75, "A small change in $\\varepsilon$ merges two clusters into one. Why?"),
    "A few points in the gap become reachable, creating a density-connected bridge between the clusters",
    [
      ["$\\varepsilon$ sets the number of clusters directly", "eps-sets-k", "It sets the neighbourhood radius."],
      ["The data changed", "eps-data-changed", "Only the parameter changed."],
      ["DBSCAN is random", "eps-random", "It's deterministic apart from border ties."],
    ]),
  num(m(DB, "transfer-hdbscan-min-size", "transfer", 9, 75, "HDBSCAN with `min_cluster_size` $= 50$ on $1{,}000$ points can find at most how many clusters?"), 20),
  short(m(DB, "transfer-vs-kmeans", "transfer", 9, 150, "Give two situations where DBSCAN is clearly preferable to $k$-means, and one where $k$-means is preferable."),
    [
      ["dbscan", "DBSCAN: arbitrary-shaped clusters, unknown number of clusters, or data with noise/outliers", 2, true],
      ["kmeans", "$k$-means: very large data with roughly spherical clusters of similar density, or when a fixed $k$ is required", 2, true],
    ]),
  num(m(DB, "transfer-indexed-cost", "transfer", 10, 90, "With a spatial index, DBSCAN costs about $n\\log_2 n$. For $n = 2^{20}$, how many times faster is that than $n^{2}$? Give the ratio $\\frac{n}{\\log_2 n}$, rounded to the nearest whole number."), 52429),
  mcq(m(DB, "transfer-optics", "transfer", 10, 90, "What does OPTICS produce that plain DBSCAN doesn't?"),
    "An ordering of points with reachability distances, from which clusterings at many density levels can be extracted",
    [
      ["A single fixed partition", "optics-single", "That's DBSCAN."],
      ["Centroids for each cluster", "optics-centroids", "It's density-based, without centroids."],
      ["A supervised classifier", "optics-classifier", "It's unsupervised."],
    ]),
  short(m(DB, "transfer-streaming", "transfer", 10, 180, "A fraud system wants density-based clustering on a continuous stream of transactions. Explain why plain DBSCAN is awkward here and what kind of approach fits better."),
    [
      ["awkward", "Plain DBSCAN is batch: it needs the whole dataset and must be rerun to absorb new points", 2, true],
      ["fit", "Incremental or streaming density methods (e.g. micro-cluster summaries like DenStream) update clusters as data arrive", 2, true],
    ]),
  num(m(DB, "transfer-core-fraction", "transfer", 10, 90, "Of $5{,}000$ points, $3{,}100$ are core, $1{,}600$ border and the rest noise. What fraction are noise?"), 0.06),
  mcq(m(DB, "recall-hdbscan", "recall", 2, 20, "HDBSCAN extends DBSCAN by:"),
    "Building a hierarchy over density levels and extracting stable clusters, removing the need for a single $\\varepsilon$",
    [
      ["Using labels", "hdbscan-labels", "It's unsupervised."],
      ["Fixing $k$ in advance", "hdbscan-k", "It doesn't need $k$."],
      ["Using centroids", "hdbscan-centroids", "It's density-based."],
    ]),
  num(m(DB, "apply-eps-neighbourhood", "apply", 3, 25, "In 2-D with $\\varepsilon = 1$, is the point $(0.6, 0.7)$ within $\\varepsilon$ of the origin? Answer $1$ for yes, $0$ for no."), 1),
];

const topup: Item[] = [
  num(m(AD, "apply-zscore-low", "apply", 2, 20, "A reading of $70$ comes from a process with mean $100$ and standard deviation $15$. What is its $z$-score?"), -2),
  num(m(RL, "apply-two-step", "apply", 2, 20, "Rewards $3$ and $10$ arrive at steps $0$ and $1$ with $\\gamma = 0.9$. What is the discounted return?"), 12),
  num(m(MAB, "apply-epsilon-exploit", "apply", 2, 20, "With $\\epsilon = 0.15$, what fraction of rounds does $\\epsilon$-greedy spend exploiting?"), 0.85),
  num(m(SK, "apply-base-count", "apply", 1, 15, "A stack combines a random forest, a logistic regression and a $k$-NN model under one meta-model. How many base models are there?"), 3),
  num(m(HC, "apply-merges-small", "apply", 1, 15, "How many merges does agglomerative clustering of $5$ points into one cluster take?"), 4),
  num(m(DB, "apply-core-small", "apply", 1, 15, "With `minPts` $= 3$, a point has exactly $3$ points (including itself) within $\\varepsilon$. Is it a core point? Answer $1$ for yes, $0$ for no."), 1),
];

export const mlSixty10Items: Item[] = [
  ...topup,
  ...interpretability,
  ...anomaly,
  ...rl,
  ...bandits,
  ...stacking,
  ...hierarchical,
  ...density,
];
