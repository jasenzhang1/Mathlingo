import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./ml-sixty-shared";

/**
 * Shapley values, isolation forests, MDPs, Bellman equations, Q-learning and
 * policy gradients, each brought from 30 to 60 questions, spread about three
 * per level.
 */

// ---------------------------------------------------------------------------
// shapley-values
// ---------------------------------------------------------------------------
const SV = "shapley-values";
const shapley: Item[] = [
  // 1–10
  mcq(m(SV, "recall-local", "recall", 1, 15, "A set of SHAP values explains:"),
    "One prediction, by attributing it to the features",
    [
      ["The whole training procedure", "sv-training", "It explains a single prediction."],
      ["The model's accuracy", "sv-accuracy", "It attributes a prediction, not a score."],
      ["Only the most important feature", "sv-one-feature", "Every feature gets a value."],
    ]),
  mcq(m(SV, "recall-players", "recall", 1, 15, "When Shapley values explain a model's prediction, the “players” are:"),
    "The features",
    [
      ["The training examples", "players-examples", "That's data valuation, a different use."],
      ["The trees in the model", "players-trees", "Features are the players here."],
      ["The classes", "players-classes", "Features share the prediction."],
    ]),
  mcq(m(SV, "recall-positive", "recall", 1, 15, "A positive SHAP value for a feature means it:"),
    "Pushed this prediction above the baseline (average) prediction",
    [
      ["Is positively correlated with the label overall", "positive-correlated", "SHAP values are per-prediction."],
      ["Has a positive coefficient", "positive-coefficient", "Not every model has coefficients."],
      ["Is the most important feature", "positive-important", "Sign isn't rank."],
    ]),
  num(m(SV, "apply-sum", "apply", 2, 20, "The baseline is $50$ and SHAP values are $5$, $-3$ and $8$. What is the prediction?"), 60),
  num(m(SV, "apply-missing", "apply", 2, 20, "The prediction is $30$, the baseline $20$, and two SHAP values are $4$ and $2$. What is the third?"), 4),
  num(m(SV, "apply-linear", "apply", 2, 25, "Linear model $f = 4x_1$ with $\\mathbb{E}[X_1] = 1$ and independent features. What is $\\phi_1$ at $x_1 = 3$?"), 8),
  num(m(SV, "apply-coalitions", "apply", 3, 25, "How many coalitions (subsets of features) are there with $5$ features?"), 32),
  num(m(SV, "apply-orderings", "apply", 3, 25, "How many orderings of $4$ features are there?"), 24),
  num(m(SV, "apply-two-player-a", "apply", 3, 30, "$v(\\varnothing) = 0$, $v(\\lbrace A \\rbrace) = 6$, $v(\\lbrace B \\rbrace) = 2$ and $v(\\lbrace A, B \\rbrace) = 10$. What is $\\phi_A$?"), 7),
  num(m(SV, "apply-two-player-b", "apply", 4, 30, "Same game. What is $\\phi_B$?"), 3),
  // 11–20
  num(m(SV, "apply-linear-two", "apply", 4, 35, "Linear model $f = 2x_1 - 3x_2$, independent features with means $0$ and $1$. At $\\mathbf{x} = [2, 3]$, what is $\\phi_2$?"), -6),
  mcq(m(SV, "apply-symmetry", "apply", 4, 35, "Two features always contribute identically to every coalition. What does the symmetry property imply?"),
    "They receive equal Shapley values",
    [
      ["Both get $0$", "symmetry-zero", "Equal, not necessarily zero."],
      ["One gets all the credit", "symmetry-all", "Symmetry splits it equally."],
      ["Their values sum to $0$", "symmetry-sum-zero", "They're equal."],
    ]),
  short(m(SV, "explain-efficiency", "explain", 5, 90, "State the efficiency (local accuracy) property and why it makes SHAP explanations easy to read."),
    [
      ["property", "The SHAP values sum to the prediction minus the baseline (expected) prediction", 2, true],
      ["read", "So each value is a share of the gap, and the explanation fully accounts for the prediction", 2, true],
    ]),
  mcq(m(SV, "apply-kernelshap", "apply", 5, 40, "KernelSHAP is:"),
    "A model-agnostic approximation using a weighted linear regression over sampled coalitions",
    [
      ["Exact and fast for any model", "kernel-exact", "It's an approximation."],
      ["Only for trees", "kernel-trees", "That's TreeSHAP."],
      ["A training algorithm", "kernel-training", "It explains a trained model."],
    ]),
  num(m(SV, "apply-symmetric-three", "apply", 5, 40, "Three players: every single player is worth $0$, every pair $6$, and all three $12$. What is each player's Shapley value?"), 4),
  num(m(SV, "apply-weight", "apply", 6, 45, "The Shapley weight on a coalition $S$ not containing feature $i$ is $\\frac{|S|!(M - |S| - 1)!}{M!}$. What is it for $M = 3$ and $|S| = 1$? Give $4$ decimal places."), 0.1667),
  short(m(SV, "explain-baseline", "explain", 6, 120, "Why do SHAP values depend on the choice of background (baseline) data?"),
    [
      ["reference", "SHAP values explain the prediction relative to the average prediction over the background", 2, true],
      ["change", "A different background (e.g. all customers vs. approved customers) changes the baseline and so the attributions", 2, true],
    ]),
  mcq(m(SV, "explain-treeshap", "explain", 6, 50, "Why is TreeSHAP so much faster than brute-force Shapley computation?"),
    "It exploits tree structure to compute exact values in polynomial rather than exponential time",
    [
      ["It samples a few coalitions", "treeshap-samples", "It's exact for trees."],
      ["It ignores interactions", "treeshap-interactions", "It handles them exactly."],
      ["It uses a GPU only", "treeshap-gpu", "The speed-up is algorithmic."],
    ]),
  num(m(SV, "transfer-additive-three", "transfer", 7, 60, "Three players with $v(A) = v(B) = 3$, $v(C) = 0$, $v(AB) = 6$, $v(AC) = 3$, $v(BC) = 3$, $v(ABC) = 6$ and $v(\\varnothing) = 0$. What is $\\phi_A$?"), 3),
  short(m(SV, "transfer-global", "transfer", 7, 120, "How do you turn SHAP values into a global importance ranking, and what does the signed average hide?"),
    [
      ["global", "Average the absolute SHAP values of each feature over many predictions", 2, true],
      ["signed", "Signed averages can cancel: a feature pushing some predictions up and others down may look unimportant", 2, true],
    ]),
  // 21–30
  mcq(m(SV, "transfer-interventional", "transfer", 7, 60, "With correlated features, how do interventional and observational (conditional) SHAP differ?"),
    "Interventional SHAP breaks correlations and reflects what the model uses; conditional SHAP can credit correlated features the model ignores",
    [
      ["They're always identical", "interventional-identical", "They differ under correlation."],
      ["Interventional SHAP is causal about the real world", "interventional-causal", "It's “causal” only with respect to the model."],
      ["Conditional SHAP ignores correlation", "conditional-ignores", "It conditions on it."],
    ]),
  num(m(SV, "transfer-mc-cost", "transfer", 8, 60, "Monte Carlo Shapley samples $1{,}000$ orderings of $10$ features, each needing $11$ model evaluations. How many evaluations in total?"), 11000),
  num(m(SV, "transfer-product", "transfer", 8, 60, "$f(x_1, x_2) = x_1x_2$, explained against the single reference point $[0, 0]$, at $\\mathbf{x} = [2, 3]$. What is $\\phi_1$?"), 3),
  mcq(m(SV, "transfer-unused", "transfer", 8, 60, "A model ignores $x_2$, but $x_2$ is highly correlated with $x_1$. Which SHAP variant can give $x_2$ a nonzero value?"),
    "Conditional (observational) SHAP",
    [
      ["Interventional SHAP", "unused-interventional", "It gives unused features $0$."],
      ["Neither", "unused-neither", "Conditioning lets $x_2$ carry $x_1$'s information."],
      ["Only TreeSHAP with path-dependent mode", "unused-tree", "The key distinction is conditional vs. interventional."],
    ]),
  num(m(SV, "transfer-exact-cost", "transfer", 9, 75, "Exact Shapley values for $20$ features require evaluating $2^{20}$ coalitions. How many is that?"), 1048576),
  short(m(SV, "transfer-fairness", "transfer", 9, 150, "A team shows the protected attribute's SHAP values are near $0$ and concludes the model is fair. What's wrong with this argument?"),
    [
      ["proxies", "The model may use proxies correlated with the attribute, which carry the effect instead", 2, true],
      ["metrics", "Fairness concerns outcomes across groups; it should be checked with group outcome metrics, not attributions alone", 2, true],
    ]),
  mcq(m(SV, "transfer-axioms", "transfer", 9, 75, "Shapley values are the unique attribution satisfying which set of properties?"),
    "Efficiency, symmetry, dummy (null player) and additivity",
    [
      ["Sparsity, monotonicity and speed", "axioms-sparsity", "These aren't the Shapley axioms."],
      ["Linearity and convexity only", "axioms-linear", "The uniqueness uses four axioms."],
      ["Causality and fairness", "axioms-causal", "Those aren't axioms of the theorem."],
    ]),
  num(m(SV, "transfer-additivity", "transfer", 10, 90, "An ensemble predicts $\\frac{1}{2}(f + g)$. For one feature, $\\phi^{f} = 2$ and $\\phi^{g} = 4$. What is its Shapley value for the ensemble?"), 3),
  short(m(SV, "transfer-disagreement", "transfer", 10, 180, "Two teams explain the same prediction with SHAP and get different top features. Give two legitimate reasons."),
    [
      ["background", "They used different background datasets or baselines", 2, true],
      ["method", "They used different value functions (interventional vs. conditional) or approximations (KernelSHAP sampling noise, TreeSHAP modes)", 2, true],
    ]),
  mcq(m(SV, "transfer-groups", "transfer", 10, 90, "Hundreds of one-hot and pixel features make per-feature SHAP values hard to read. What's a principled fix?"),
    "Treat related features as a group (one player) and compute group-level Shapley (or Owen) values",
    [
      ["Sum raw feature values", "groups-sum-values", "Attributions, not raw values, should be grouped."],
      ["Report only the first feature", "groups-first", "That ignores the rest."],
      ["Drop all one-hot features", "groups-drop", "That discards information."],
    ]),
];

// ---------------------------------------------------------------------------
// isolation-forest
// ---------------------------------------------------------------------------
const IF = "isolation-forest";
const iforest: Item[] = [
  // 1–10
  mcq(m(IF, "recall-split", "recall", 1, 15, "How does an isolation tree choose each split?"),
    "A random feature and a random threshold between that feature's minimum and maximum",
    [
      ["The split that maximises information gain", "split-gain", "That's a decision tree."],
      ["The median of the feature", "split-median", "Thresholds are random."],
      ["The split that separates the labels", "split-labels", "No labels are used."],
    ]),
  mcq(m(IF, "recall-no-distance", "recall", 1, 15, "Unlike $k$-NN or LOF, an isolation forest:"),
    "Needs no distance or density computations",
    [
      ["Needs labels", "no-distance-labels", "It's unsupervised."],
      ["Computes all pairwise distances", "no-distance-pairwise", "It avoids them."],
      ["Only works in one dimension", "no-distance-1d", "It works in many."],
    ]),
  mcq(m(IF, "recall-unsupervised", "recall", 1, 15, "Isolation forest is:"),
    "An unsupervised anomaly detection method",
    [
      ["A supervised classifier", "iforest-supervised", "It needs no labels."],
      ["A clustering method", "iforest-clustering", "It scores anomalies."],
      ["A dimensionality reduction method", "iforest-dimred", "It scores points."],
    ]),
  num(m(IF, "apply-average-path", "apply", 2, 20, "A point's path lengths in three trees are $3$, $5$ and $4$. What is its average path length?"), 4),
  num(m(IF, "apply-height-limit", "apply", 2, 20, "With subsample size $\\psi = 64$, the height limit is $\\log_2 \\psi$. What is it?"), 6),
  num(m(IF, "apply-contamination", "apply", 2, 20, "With contamination $2\\%$ on $5{,}000$ points, how many are flagged?"), 100),
  num(m(IF, "apply-score-long", "apply", 3, 25, "The score is $s = 2^{-\\mathbb{E}[h]/c(n)}$. What is $s$ when $\\mathbb{E}[h] = 2c(n)$?"), 0.25),
  num(m(IF, "apply-score-zero", "apply", 3, 25, "What is $s$ when $\\mathbb{E}[h] = 0$?"), 1),
  num(m(IF, "apply-c2", "apply", 3, 25, "The normaliser $c(2)$ is the average path length to isolate a point among $2$. What is it?"), 1),
  num(m(IF, "apply-score-half", "apply", 4, 30, "What is $s$ when $\\mathbb{E}[h] = \\frac{1}{2}c(n)$? Give $4$ decimal places."), 0.7071),
  // 11–20
  num(m(IF, "apply-cost", "apply", 4, 35, "Building a tree costs about $\\psi\\log_2\\psi$ operations. For $100$ trees with $\\psi = 256$, how many operations?"), 204800),
  mcq(m(IF, "apply-scaling", "apply", 4, 35, "Do features need standardising before an isolation forest?"),
    "Not usually — splits are within each feature's own range, so scale doesn't matter",
    [
      ["Yes, always", "scaling-always", "Random thresholds within each feature's range ignore scale."],
      ["Only for the first tree", "scaling-first", "Scale doesn't affect any tree."],
      ["Yes, to unit norm", "scaling-norm", "No distances are computed."],
    ]),
  short(m(IF, "explain-short-path", "explain", 5, 90, "Explain why anomalies get short average path lengths in an isolation forest."),
    [
      ["few-different", "Anomalies are few and have values unlike the rest, so they sit in sparse regions", 2, true],
      ["random-split", "A random threshold is then likely to fall between them and the bulk, isolating them after few splits", 2, true],
    ]),
  mcq(m(IF, "apply-subsample", "apply", 5, 40, "Why does training each tree on a small subsample (e.g. $256$ points) often help?"),
    "It reduces swamping and masking, since fewer normal points crowd around anomalies",
    [
      ["It makes trees deeper", "subsample-deeper", "Smaller samples give shallower trees."],
      ["It increases the contamination", "subsample-contamination", "Contamination is a separate setting."],
      ["It removes all anomalies", "subsample-removes", "Anomalies stay in proportion."],
    ]),
  num(m(IF, "apply-ratio-from-score", "apply", 5, 40, "A score $s = 0.8$ means $\\frac{\\mathbb{E}[h]}{c(n)} = -\\log_2 0.8$. What is that ratio? Give $4$ decimal places."), 0.3219),
  num(m(IF, "apply-path-from-score", "apply", 6, 45, "A point has $s = 0.25$ with $c(n) = 10$. What is its average path length?"), 20),
  short(m(IF, "explain-axis-artifacts", "explain", 6, 120, "Standard isolation forests produce score maps with axis-aligned bands. Why, and what's the fix?"),
    [
      ["why", "Every split is perpendicular to one axis, so regions of equal score inherit rectangular, axis-aligned artefacts", 2, true],
      ["fix", "Extended isolation forest uses random hyperplane (oblique) splits", 2, true],
    ]),
  mcq(m(IF, "explain-high-dim", "explain", 6, 50, "Compared with LOF, why does isolation forest scale better to large, high-dimensional data?"),
    "It costs roughly linear time in $n$ and avoids distance computations that degrade in high dimensions",
    [
      ["It needs labels", "high-dim-labels", "Neither needs labels."],
      ["It computes exact densities", "high-dim-densities", "It avoids density estimation."],
      ["It uses all features in every split", "high-dim-all", "It uses one random feature per split."],
    ]),
  num(m(IF, "transfer-first-split", "transfer", 7, 60, "1-D points $0$, $1$, $2$ and $100$. The first split is uniform on $[0, 100]$. What is the probability it isolates $100$ immediately?"), 0.98),
  short(m(IF, "transfer-local", "transfer", 7, 120, "Why can isolation forest miss a local anomaly that sits just outside a dense cluster but inside the global data range?"),
    [
      ["global", "Random splits span the whole range, so a point close to a dense cluster needs many splits to separate from it", 2, true],
      ["alternative", "Density-relative methods like LOF can catch it, since its local density is much lower than its neighbours'", 2, true],
    ]),
  // 21–30
  mcq(m(IF, "transfer-categorical", "transfer", 7, 60, "How should categorical features be fed to a standard isolation forest?"),
    "Encode them carefully (e.g. one-hot or frequency encoding), since arbitrary integer codes impose a fake order",
    [
      ["As arbitrary integers, always", "categorical-integers", "Fake order distorts splits."],
      ["They can't be used at all", "categorical-never", "They can, with encoding."],
      ["As text strings", "categorical-strings", "Splits need numbers."],
    ]),
  num(m(IF, "transfer-threshold", "transfer", 8, 60, "Flagging the top $1\\%$ of $10{,}000$ scores flags how many points?"), 100),
  short(m(IF, "transfer-shift", "transfer", 8, 120, "Scores from an isolation forest trained last quarter are now higher across the board. What might be happening, and what should you do?"),
    [
      ["drift", "The data distribution has shifted, so normal points now look unusual relative to the old training sample", 2, true],
      ["action", "Investigate the shift, retrain on recent data, and recalibrate the score threshold", 2, true],
    ]),
  mcq(m(IF, "transfer-trees", "transfer", 8, 60, "What does increasing the number of trees mainly do?"),
    "Reduces the variance of the averaged path lengths, stabilising the scores",
    [
      ["Makes each tree deeper", "trees-deeper", "Depth depends on the subsample size."],
      ["Changes the contamination", "trees-contamination", "Contamination is separate."],
      ["Turns it into a supervised model", "trees-supervised", "It stays unsupervised."],
    ]),
  num(m(IF, "transfer-max-path", "transfer", 9, 75, "Points with $s \\ge 0.6$ are flagged, and $c(n) = 8$. What is the largest average path length a flagged point can have? Give $4$ decimal places."), 5.8957),
  short(m(IF, "transfer-clustered", "transfer", 9, 150, "Fraudsters submit $200$ near-identical transactions. Why might an isolation forest fail to flag them, and what helps?"),
    [
      ["masking", "They form a dense cluster, so isolating any one of them takes many splits (masking)", 2, true],
      ["help", "Small subsamples, features capturing aggregate behaviour (e.g. velocity per account), or complementary detectors", 2, true],
    ]),
  mcq(m(IF, "transfer-not-probability", "transfer", 9, 75, "Can an isolation forest score of $0.7$ be read as a $70\\%$ chance of being an anomaly?"),
    "No — it's a relative ranking score, not a calibrated probability",
    [
      ["Yes, always", "score-probability", "Scores aren't calibrated."],
      ["Only with $100$ trees", "score-trees", "The number of trees doesn't calibrate it."],
      ["Only for $1$-D data", "score-1d", "It's never a probability by construction."],
    ]),
  num(m(IF, "transfer-irrelevant", "transfer", 10, 90, "Only $3$ of $30$ features reveal an anomaly. Each split picks a feature uniformly. What is the probability that at least one of the first $5$ splits uses a relevant feature? Give $4$ decimal places."), 0.4095),
  short(m(IF, "transfer-vs-autoencoder", "transfer", 10, 180, "Compare an isolation forest with an autoencoder for anomaly detection on tabular data."),
    [
      ["iforest", "Isolation forest: fast, few hyperparameters, no scaling needed, strong on tabular data with global outliers", 2, true],
      ["autoencoder", "Autoencoder: can model complex non-linear structure (e.g. images, sequences) via reconstruction error, but needs more data, tuning and care with scaling", 2, true],
    ]),
  mcq(m(IF, "transfer-labels-help", "transfer", 10, 90, "A team now has $500$ labelled frauds. How can they best use them with an existing isolation forest?"),
    "Use them to choose the score threshold and validate precision, or train a supervised model with the isolation score as a feature",
    [
      ["Retrain the isolation forest on only the frauds", "labels-frauds-only", "It models normality from the bulk of data."],
      ["Ignore them", "labels-ignore", "They're valuable for evaluation and tuning."],
      ["Delete the frauds from the data", "labels-delete", "That throws away signal."],
    ]),
];

// ---------------------------------------------------------------------------
// markov-decision-processes
// ---------------------------------------------------------------------------
const MD = "markov-decision-processes";
const mdp: Item[] = [
  // 1–10
  mcq(m(MD, "recall-transition", "recall", 1, 15, "In an MDP, $P(s' \\mid s, a)$ is:"),
    "The probability of moving to state $s'$ after taking action $a$ in state $s$",
    [
      ["The reward for action $a$", "transition-reward", "That's $R$."],
      ["The policy", "transition-policy", "The policy is $\\pi(a \\mid s)$."],
      ["The discount factor", "transition-discount", "That's $\\gamma$."],
    ]),
  mcq(m(MD, "recall-reward", "recall", 1, 15, "The reward function in an MDP gives:"),
    "The immediate numerical feedback for a transition",
    [
      ["The long-term value of a state", "reward-value", "That's the value function."],
      ["The next state", "reward-next", "That's the transition function."],
      ["The action to take", "reward-action", "That's the policy."],
    ]),
  mcq(m(MD, "recall-gamma-range", "recall", 1, 15, "The discount factor $\\gamma$ takes values in:"),
    "$[0, 1]$",
    [
      ["$(1, \\infty)$", "gamma-large", "Values above $1$ make returns blow up."],
      ["$[-1, 0]$", "gamma-negative", "It's non-negative."],
      ["Any real number", "gamma-any", "It's between $0$ and $1$."],
    ]),
  num(m(MD, "apply-undiscounted", "apply", 2, 20, "Rewards $2$, $2$ and $2$ with $\\gamma = 1$. What is the return?"), 6),
  num(m(MD, "apply-two-rewards", "apply", 2, 20, "Rewards $8$ and $8$ at steps $0$ and $1$ with $\\gamma = 0.5$. What is the return?"), 12),
  num(m(MD, "apply-missing-prob", "apply", 2, 20, "From $(s, a)$ the next state is $s_1$ with probability $0.3$, $s_3$ with $0.5$, or $s_2$. What is $P(s_2 \\mid s, a)$?"), 0.2),
  num(m(MD, "apply-expected-reward", "apply", 3, 25, "An action gives reward $10$ with probability $0.7$ and $-5$ otherwise. What is its expected reward?"), 5.5),
  num(m(MD, "apply-constant", "apply", 3, 25, "A reward of $2$ every step forever with $\\gamma = 0.9$. What is the return?"), 20),
  num(m(MD, "apply-delayed", "apply", 3, 25, "Rewards $0$, $0$, $50$ at steps $0$, $1$, $2$ with $\\gamma = 0.8$. What is the return?"), 32),
  num(m(MD, "apply-two-step-prob", "apply", 4, 30, "$P(B \\mid A) = 0.5$ and $P(C \\mid B) = 0.4$ under a fixed policy. What is the probability of the path $A \\to B \\to C$?"), 0.2),
  // 11–20
  num(m(MD, "apply-bound", "apply", 4, 30, "Rewards satisfy $|r| \\le 1$ and $\\gamma = 0.95$. What is the largest possible absolute return?"), 20),
  mcq(m(MD, "apply-gamma-zero", "apply", 4, 35, "An agent with $\\gamma = 0$ is:"),
    "Myopic — it maximises only the immediate reward",
    [
      ["Far-sighted", "gamma-zero-far", "Future rewards get zero weight."],
      ["Unable to act", "gamma-zero-unable", "It acts greedily on immediate reward."],
      ["Identical to $\\gamma = 1$", "gamma-zero-one", "Opposite extremes."],
    ]),
  short(m(MD, "explain-pomdp", "explain", 5, 90, "What is the difference between an MDP and a POMDP?"),
    [
      ["observe", "In an MDP the agent observes the full state; in a POMDP it gets only observations that partially reveal it", 2, true],
      ["consequence", "So a POMDP agent must act on its history or a belief over states, not on the current observation alone", 2, true],
    ]),
  mcq(m(MD, "apply-stationary", "apply", 5, 40, "A stationary policy:"),
    "Chooses actions by a rule that depends on the state but not on the time step",
    [
      ["Never changes the state", "stationary-state", "It's about the rule, not the dynamics."],
      ["Always picks the same action", "stationary-same", "It can depend on the state."],
      ["Is always random", "stationary-random", "It can be deterministic."],
    ]),
  num(m(MD, "apply-next-value", "apply", 5, 40, "The next state is $s_1$ (value $10$) with probability $0.6$ or $s_2$ (value $5$). What is the expected next-state value?"), 8),
  num(m(MD, "apply-absorbing", "apply", 6, 45, "An absorbing state gives reward $3$ every step with $\\gamma = 0.75$. What is its value?"), 12),
  short(m(MD, "explain-discounting", "explain", 6, 120, "Give two reasons for discounting future rewards in a continuing task."),
    [
      ["finite", "It keeps infinite-horizon returns finite, so values are well defined", 2, true],
      ["preference", "It encodes a preference for sooner rewards or uncertainty about the future (e.g. a chance the task ends)", 2, true],
    ]),
  mcq(m(MD, "explain-terminal", "explain", 6, 50, "What is the value of a terminal state?"),
    "$0$, since no further rewards follow",
    [
      ["The last reward received", "terminal-last", "That reward belongs to the transition into it."],
      ["Infinite", "terminal-infinite", "Nothing follows it."],
      ["$1$", "terminal-one", "It's $0$ by convention."],
    ]),
  num(m(MD, "transfer-stochastic-policy", "transfer", 7, 60, "A policy picks $a_1$ (reward $10$) with probability $0.3$ and $a_2$ (reward $0$) otherwise. What is the expected immediate reward?"), 3),
  short(m(MD, "transfer-reward-design", "transfer", 7, 120, "A cleaning robot is rewarded $+1$ per piece of dirt collected. How might it exploit this reward, and how would you fix it?"),
    [
      ["exploit", "It could dump dirt and re-collect it, earning reward without cleaning", 2, true],
      ["fix", "Reward the desired outcome (e.g. cleanliness of the room) rather than a gameable proxy, or penalise creating mess", 2, true],
    ]),
  // 21–30
  num(m(MD, "transfer-termination", "transfer", 7, 60, "An undiscounted task ends independently with probability $0.1$ each step. What is the expected episode length?"), 10),
  num(m(MD, "transfer-stationary-dist", "transfer", 8, 60, "A two-state chain moves $A \\to B$ with probability $0.2$ and $B \\to A$ with probability $0.3$. What is the long-run fraction of time in $A$?"), 0.6),
  mcq(m(MD, "transfer-average-reward", "transfer", 8, 60, "When is the average-reward formulation preferable to discounting?"),
    "In continuing tasks where long-run performance matters and no natural discount exists",
    [
      ["In short episodic games", "average-episodic", "Episodic tasks have natural returns."],
      ["When rewards are always zero", "average-zero", "Then nothing matters."],
      ["Never", "average-never", "It's standard in some continuing problems."],
    ]),
  short(m(MD, "transfer-frame-stack", "transfer", 8, 120, "A single video frame doesn't reveal a ball's velocity. How do RL systems restore the Markov property here?"),
    [
      ["problem", "One frame gives position but not motion, so it isn't a Markov state", 2, true],
      ["fix", "Stack several recent frames, or use a recurrent network to summarise history", 2, true],
    ]),
  num(m(MD, "transfer-cycle", "transfer", 9, 75, "Under a fixed policy, $A \\to B$ gives reward $1$ and $B \\to A$ gives $0$, with $\\gamma = 0.5$. What is $V(A)$? Give $4$ decimal places."), 1.3333),
  short(m(MD, "transfer-hidden", "transfer", 9, 150, "In poker, why is the game naturally a POMDP, and what does an optimal agent need to track?"),
    [
      ["hidden", "Opponents' cards are hidden, so observations don't determine the state", 2, true],
      ["belief", "The agent must maintain a belief over hidden states (and opponents' strategies) and act on it", 2, true],
    ]),
  mcq(m(MD, "transfer-finite-horizon", "transfer", 9, 75, "In a finite-horizon MDP, why can the optimal policy depend on the time step?"),
    "With few steps left, long-term investments no longer pay off, so the best action changes with time remaining",
    [
      ["It can't — optimal policies are always stationary", "finite-stationary", "That holds for infinite-horizon discounted MDPs."],
      ["Because rewards change randomly", "finite-random", "The horizon itself is the reason."],
      ["Because $\\gamma$ must be $1$", "finite-gamma", "The time remaining matters regardless."],
    ]),
  num(m(MD, "transfer-occupancy", "transfer", 10, 90, "The discounted state-visitation measure sums $\\gamma^{t}$ over all steps. What is the total mass for $\\gamma = 0.99$?"), 100),
  short(m(MD, "transfer-inventory", "transfer", 10, 180, "Formulate stock reordering for a shop as an MDP: give the state, actions and reward."),
    [
      ["state-action", "State: current stock level (and perhaps outstanding orders, day of week); action: how many units to order", 2, true],
      ["reward", "Reward: sales revenue minus ordering, holding and stock-out costs; transitions depend on random demand", 2, true],
    ]),
  mcq(m(MD, "transfer-reward-hypothesis", "transfer", 10, 90, "The “reward hypothesis” claims:"),
    "All goals can be framed as maximising expected cumulative scalar reward",
    [
      ["Rewards must be positive", "hypothesis-positive", "Rewards can be negative."],
      ["Rewards must be given every step", "hypothesis-every-step", "They can be sparse."],
      ["Rewards are always learned", "hypothesis-learned", "It's about framing goals."],
    ]),
];

// ---------------------------------------------------------------------------
// bellman-equations
// ---------------------------------------------------------------------------
const BE = "bellman-equations";
const bellman: Item[] = [
  // 1–10
  mcq(m(BE, "recall-vstar", "recall", 1, 15, "The optimal value $V^{*}(s)$ is:"),
    "The highest expected return achievable from $s$ by any policy",
    [
      ["The immediate reward at $s$", "vstar-reward", "It accounts for all future rewards."],
      ["The value under a random policy", "vstar-random", "It's the best over policies."],
      ["The number of actions at $s$", "vstar-actions", "It's an expected return."],
    ]),
  mcq(m(BE, "recall-recursion", "recall", 1, 15, "A Bellman equation relates a state's value to:"),
    "The immediate reward plus the discounted value of the next state",
    [
      ["The value of the initial state only", "recursion-initial", "It's a one-step recursion."],
      ["The number of visits to the state", "recursion-visits", "Visits are statistics."],
      ["The learning rate", "recursion-lr", "Unrelated."],
    ]),
  mcq(m(BE, "recall-gamma", "recall", 1, 15, "In the Bellman equation $V(s) = r + \\gamma V(s')$, what does $\\gamma$ do?"),
    "It discounts the value of the next state",
    [
      ["It scales the immediate reward", "gamma-reward", "It multiplies the future value."],
      ["It sets the learning rate", "gamma-lr", "It's the discount."],
      ["It chooses the action", "gamma-action", "It's the discount."],
    ]),
  num(m(BE, "apply-self-loop", "apply", 2, 20, "A single state earns reward $1$ each step forever with $\\gamma = 0.5$. What is its value?"), 2),
  num(m(BE, "apply-v-from-q", "apply", 2, 20, "$\\pi(\\cdot \\mid s) = (0.25, 0.75)$ and $Q(s, \\cdot) = (2, 6)$. What is $V^{\\pi}(s)$?"), 5),
  num(m(BE, "apply-vstar", "apply", 2, 20, "$Q^{*}(s, \\cdot) = (3, 7, 5)$. What is $V^{*}(s)$?"), 7),
  num(m(BE, "apply-q-deterministic", "apply", 3, 25, "Deterministic transition: $r = 2$, $\\gamma = 0.9$, $V(s') = 10$. What is $Q(s, a)$?"), 11),
  num(m(BE, "apply-q-stochastic", "apply", 3, 25, "$r = 1$, $\\gamma = 0.5$, and the next state has value $4$ or $8$ with equal probability. What is $Q(s, a)$?"), 4),
  num(m(BE, "apply-greedy-index", "apply", 3, 25, "$Q^{*}(s, \\cdot) = (3, 7, 5)$. Which action (numbered from $1$) is optimal?"), 2),
  num(m(BE, "apply-vi-first", "apply", 4, 30, "Value iteration starts at $V_0 = 0$. A state's two actions give immediate rewards $2$ and $5$. What is $V_1$ there?"), 5),
  // 11–20
  num(m(BE, "apply-vi-second", "apply", 4, 30, "A single state with a self-loop gives reward $1$, $\\gamma = 0.9$, $V_0 = 0$. What is $V_2$?"), 1.9),
  num(m(BE, "apply-contraction", "apply", 4, 35, "Value iteration's error starts at $10$ and shrinks by at least a factor $\\gamma = 0.5$ per iteration. What is the bound after $3$ iterations?"), 1.25),
  short(m(BE, "explain-two-equations", "explain", 5, 90, "Contrast the Bellman expectation equation with the Bellman optimality equation."),
    [
      ["expectation", "The expectation equation averages over the policy's actions, giving $V^{\\pi}$ for a fixed policy", 2, true],
      ["optimality", "The optimality equation takes a max over actions, giving $V^{*}$", 2, true],
    ]),
  mcq(m(BE, "apply-linear-system", "apply", 5, 40, "Evaluating a fixed policy in a small finite MDP amounts to:"),
    "Solving a linear system $V = R^{\\pi} + \\gamma P^{\\pi}V$",
    [
      ["Solving a non-linear max equation", "linear-max", "The max appears only in the optimality equation."],
      ["Running gradient descent on a neural network", "linear-nn", "It's a linear system for tabular MDPs."],
      ["Sorting the states", "linear-sort", "It's linear algebra."],
    ]),
  num(m(BE, "apply-solve", "apply", 5, 40, "Solve $V = 3 + 0.8V$."), 15),
  num(m(BE, "apply-iterations", "apply", 6, 45, "With $\\gamma = 0.9$, how many value-iteration steps guarantee the error falls from $100$ to at most $1$?"), 44),
  short(m(BE, "explain-max-nonlinear", "explain", 6, 120, "Why can't the Bellman optimality equation be solved by one linear solve, and how is it solved instead?"),
    [
      ["nonlinear", "The max over actions makes it non-linear in $V$", 2, true],
      ["methods", "Iterative methods: value iteration, policy iteration (alternating linear solves and greedy improvement), or linear programming", 2, true],
    ]),
  mcq(m(BE, "explain-q-learning-link", "explain", 6, 50, "Q-learning's update can be seen as:"),
    "A sample-based, incremental version of the Bellman optimality equation for $Q$",
    [
      ["Exact policy evaluation", "link-evaluation", "It targets the optimality equation."],
      ["Supervised regression on labels", "link-supervised", "Its targets bootstrap from its own estimates."],
      ["Monte Carlo averaging of full returns", "link-mc", "It bootstraps after one step."],
    ]),
  num(m(BE, "transfer-two-state", "transfer", 7, 60, "$A \\to B$ gives reward $0$; $B \\to B$ gives reward $1$ forever; $\\gamma = 0.9$. What is $V(A)$?"), 9),
  short(m(BE, "transfer-improvement", "transfer", 7, 120, "Why does acting greedily with respect to $Q^{\\pi}$ give a policy at least as good as $\\pi$?"),
    [
      ["one-step", "In every state, the greedy action's value $\\max_a Q^{\\pi}(s, a)$ is at least $V^{\\pi}(s)$", 2, true],
      ["unroll", "Applying this improvement at every step and unrolling the Bellman equation shows the new policy's value is at least $V^{\\pi}$ everywhere", 2, true],
    ]),
  // 21–30
  mcq(m(BE, "transfer-bootstrap", "transfer", 7, 60, "Methods that update a value estimate using other value estimates are said to:"),
    "Bootstrap",
    [
      ["Bag", "bootstrap-bag", "Bagging is an ensemble method."],
      ["Regularise", "bootstrap-regularise", "It's about using estimates as targets."],
      ["Prune", "bootstrap-prune", "Unrelated."],
    ]),
  num(m(BE, "transfer-residual", "transfer", 8, 60, "$V(s) = 5$, $r = 1$, $\\gamma = 0.5$, $V(s') = 6$ (deterministic). What is the Bellman residual $|V(s) - (r + \\gamma V(s'))|$?"), 1),
  num(m(BE, "transfer-solve-loop", "transfer", 8, 60, "With probability $0.5$ a state earns $2$ and stays; otherwise it ends with reward $0$. With $\\gamma = 1$, solve $V = 0.5(2 + V)$."), 2),
  mcq(m(BE, "transfer-unique", "transfer", 8, 60, "Why does the Bellman optimality equation have a unique solution for $\\gamma < 1$?"),
    "The Bellman operator is a $\\gamma$-contraction, so by Banach's theorem it has a unique fixed point",
    [
      ["Because rewards are positive", "unique-positive", "Rewards can be any bounded values."],
      ["Because there's only one policy", "unique-one-policy", "There may be many optimal policies, but one $V^{*}$."],
      ["It doesn't", "unique-not", "It does for $\\gamma < 1$."],
    ]),
  num(m(BE, "transfer-greedy-bound", "transfer", 9, 75, "A greedy policy from an approximate $V$ with error $\\varepsilon$ loses at most $\\frac{2\\gamma\\varepsilon}{1 - \\gamma}$. What is that for $\\gamma = 0.8$ and $\\varepsilon = 0.5$?"), 4),
  short(m(BE, "transfer-projection", "transfer", 9, 150, "With linear function approximation, the true $V^{\\pi}$ usually isn't representable. What do TD methods converge to instead?"),
    [
      ["projected", "The fixed point of the projected Bellman equation: $V = \\Pi T^{\\pi} V$, where $\\Pi$ projects onto the representable functions", 2, true],
      ["consequence", "It's generally not the best approximation of $V^{\\pi}$, but its error is bounded relative to it (on-policy)", 2, true],
    ]),
  mcq(m(BE, "transfer-soft", "transfer", 9, 75, "The soft (entropy-regularised) Bellman equation replaces the max with:"),
    "A log-sum-exp (soft maximum) over actions",
    [
      ["A min over actions", "soft-min", "It's a smoothed max."],
      ["A plain average over actions", "soft-average", "The softness is controlled by a temperature."],
      ["The median", "soft-median", "It's log-sum-exp."],
    ]),
  num(m(BE, "transfer-soft-value", "transfer", 10, 90, "Soft value $V = \\tau\\ln\\sum_a e^{Q(s, a)/\\tau}$ with $\\tau = 1$ and $Q = (0, \\ln 3)$. What is $V$? Give $4$ decimal places."), 1.3863),
  short(m(BE, "transfer-distributional", "transfer", 10, 180, "What does the distributional Bellman equation track, and why can that help?"),
    [
      ["track", "It describes the whole distribution of returns $Z(s, a) \\overset{D}{=} R + \\gamma Z(S', A')$, not just the mean", 2, true],
      ["help", "Learning the distribution gives richer training signal and supports risk-sensitive decisions", 2, true],
    ]),
  mcq(m(BE, "transfer-finite-horizon", "transfer", 10, 90, "For a finite horizon $H$, how is the Bellman recursion typically solved?"),
    "Backwards in time: $V_H = 0$, then compute $V_{t}$ from $V_{t + 1}$",
    [
      ["Forwards from $t = 0$ only", "horizon-forward", "Values depend on the future, so you go backwards."],
      ["By a single linear solve", "horizon-single", "The max requires backward induction."],
      ["It can't be solved", "horizon-unsolvable", "Backward induction solves it exactly."],
    ]),
];

// ---------------------------------------------------------------------------
// q-learning
// ---------------------------------------------------------------------------
const QL = "q-learning";
const qlearning: Item[] = [
  // 1–10
  mcq(m(QL, "recall-q-meaning", "recall", 1, 15, "$Q(s, a)$ estimates:"),
    "The expected return from taking action $a$ in state $s$ and acting well afterwards",
    [
      ["The immediate reward only", "q-immediate", "It includes future rewards."],
      ["The probability of taking $a$", "q-probability", "That's a policy."],
      ["The number of times $a$ was tried", "q-count", "That's a visit count."],
    ]),
  mcq(m(QL, "recall-model-free", "recall", 1, 15, "Q-learning is model-free, which means:"),
    "It learns from sampled transitions without knowing the transition probabilities",
    [
      ["It uses no parameters", "model-free-params", "It stores $Q$ values."],
      ["It needs a simulator of the dynamics", "model-free-simulator", "It only needs experience."],
      ["It has no reward", "model-free-reward", "Rewards drive learning."],
    ]),
  mcq(m(QL, "recall-table", "recall", 1, 15, "Tabular Q-learning stores:"),
    "One value for each state–action pair",
    [
      ["One value per state", "table-state", "That's a $V$ table."],
      ["One value per episode", "table-episode", "It's per state–action pair."],
      ["A neural network", "table-nn", "That's deep Q-learning."],
    ]),
  num(m(QL, "apply-table-size", "apply", 2, 20, "A problem has $10$ states and $4$ actions. How many entries does the $Q$-table have?"), 40),
  num(m(QL, "apply-greedy-value", "apply", 2, 20, "$Q(s, \\cdot) = (1, 5, 3)$. What value does the greedy action have?"), 5),
  num(m(QL, "apply-random-steps", "apply", 2, 20, "$\\epsilon$-greedy with $\\epsilon = 0.05$ runs $1{,}000$ steps. About how many actions are random?"), 50),
  num(m(QL, "apply-update", "apply", 3, 25, "$Q(s, a) = 0$, $\\alpha = 0.5$, $r = 4$, $\\gamma = 0.9$ and $\\max_{a'}Q(s', a') = 2$. What is the updated $Q(s, a)$?"), 2.9),
  num(m(QL, "apply-td-error", "apply", 3, 25, "$Q(s, a) = 3$ and the TD target is $5$. What is the TD error?"), 2),
  num(m(QL, "apply-alpha-one", "apply", 3, 25, "With $\\alpha = 1$, $r = 1$, $\\gamma = 0.5$ and $\\max_{a'}Q(s', a') = 6$, what is the updated $Q(s, a)$?"), 4),
  num(m(QL, "apply-non-greedy", "apply", 4, 30, "$\\epsilon$-greedy with $\\epsilon = 0.2$ over $4$ actions. What is the probability of one specific non-greedy action?"), 0.05),
  // 11–20
  num(m(QL, "apply-alpha-decay", "apply", 4, 30, "A learning rate $\\alpha_n = \\frac{1}{n}$ is used for the $n$th visit. What is it on the $4$th visit?"), 0.25),
  mcq(m(QL, "apply-terminal", "apply", 4, 35, "On a transition into a terminal state, the Q-learning target is:"),
    "Just the reward $r$",
    [
      ["$r + \\gamma\\max_{a'}Q(s', a')$ as usual", "terminal-usual", "Terminal states have no future value."],
      ["$0$", "terminal-zero", "The reward still counts."],
      ["$\\gamma r$", "terminal-gamma", "The reward isn't discounted here."],
    ]),
  short(m(QL, "explain-replay", "explain", 5, 90, "Why does being off-policy let Q-learning use an experience replay buffer?"),
    [
      ["target", "Its target uses $\\max_{a'}Q$, which doesn't depend on the policy that generated the data", 2, true],
      ["reuse", "So transitions collected by older policies remain valid training data and can be reused", 2, true],
    ]),
  mcq(m(QL, "apply-cliff", "apply", 5, 40, "In cliff walking with $\\epsilon$-greedy exploration, why does SARSA learn a safer path than Q-learning?"),
    "SARSA's on-policy target accounts for exploratory slips near the cliff, while Q-learning assumes greedy behaviour",
    [
      ["SARSA uses a larger learning rate", "cliff-lr", "The target, not the rate, differs."],
      ["Q-learning can't learn paths", "cliff-paths", "It learns the optimal (risky) path."],
      ["SARSA ignores rewards", "cliff-rewards", "It uses them on-policy."],
    ]),
  num(m(QL, "apply-replay-reuse", "apply", 5, 40, "Over $10^{6}$ steps, a DQN does one update every $4$ steps with batches of $32$. If every transition stays in the buffer, how many times is each sampled on average?"), 8),
  num(m(QL, "apply-double", "apply", 6, 45, "Double DQN: the online network picks $a^{*} = \\arg\\max_{a'}Q_{\\text{online}}(s', a')$, and the target network gives $Q_{\\text{target}}(s', a^{*}) = 3$. With $r = 1$ and $\\gamma = 0.9$, what is the target?"), 3.7),
  short(m(QL, "explain-target-network", "explain", 6, 120, "Why does DQN use a separate, slowly updated target network?"),
    [
      ["moving", "With one network, each update shifts the targets themselves, causing oscillation or divergence", 2, true],
      ["fix", "Freezing the target network for many steps keeps targets stable, making updates more like supervised regression", 2, true],
    ]),
  mcq(m(QL, "explain-continuous", "explain", 6, 50, "Why is standard Q-learning awkward with continuous actions?"),
    "The target and the greedy policy need $\\max_a Q(s, a)$, an optimisation over infinitely many actions",
    [
      ["$Q$ can't be defined for continuous actions", "continuous-undefined", "It can; maximising it is the problem."],
      ["Continuous actions have no rewards", "continuous-rewards", "They do."],
      ["It needs a model", "continuous-model", "It's still model-free."],
    ]),
  num(m(QL, "transfer-max-bias", "transfer", 7, 60, "Two actions have true value $0$, and each estimate is independently $+1$ or $-1$ with equal probability. What is the expected value of the max of the two estimates?"), 0.5),
  short(m(QL, "transfer-sparse", "transfer", 7, 120, "Why does $\\epsilon$-greedy Q-learning struggle when the only reward is at the end of a long chain of correct actions?"),
    [
      ["random", "Random exploration almost never stumbles on the full sequence, so the reward is rarely seen", 2, true],
      ["fix", "Directed exploration (optimistic initialisation, count bonuses), reward shaping, or demonstrations help", 2, true],
    ]),
  // 21–30
  mcq(m(QL, "transfer-large-alpha", "transfer", 7, 60, "What typically happens if the learning rate $\\alpha$ is too large in a noisy environment?"),
    "$Q$ estimates chase recent noisy samples and oscillate instead of converging",
    [
      ["Learning becomes very slow", "alpha-slow", "That's too small."],
      ["Exploration stops", "alpha-exploration", "Exploration is controlled by $\\epsilon$."],
      ["Nothing changes", "alpha-nothing", "Step size matters."],
    ]),
  num(m(QL, "transfer-n-step", "transfer", 8, 60, "A $3$-step target with rewards $1$, $1$, $1$, $\\gamma = 0.5$ and $\\max_{a'}Q(s_3, a') = 8$ is what?"), 2.75),
  short(m(QL, "transfer-divergence", "transfer", 8, 120, "Why can Q-learning with a neural network diverge even though tabular Q-learning converges?"),
    [
      ["triad", "Function approximation, bootstrapping and off-policy updates together (the deadly triad) remove the contraction guarantee", 2, true],
      ["generalisation", "Updating one state's value changes others through shared weights, which can feed back and amplify errors", 2, true],
    ]),
  mcq(m(QL, "transfer-prioritised", "transfer", 8, 60, "Prioritised experience replay samples transitions:"),
    "In proportion to their TD error magnitude, so surprising transitions are replayed more often",
    [
      ["Uniformly at random", "prioritised-uniform", "That's standard replay."],
      ["Only the most recent ones", "prioritised-recent", "Priority is by TD error."],
      ["Only those with positive reward", "prioritised-positive", "Priority uses error size."],
    ]),
  num(m(QL, "transfer-dueling", "transfer", 9, 75, "A dueling network outputs $V(s) = 5$ and advantages $(1, -1, 0)$, combined as $Q = V + A - \\text{mean}(A)$. What is $Q$ for the first action?"), 6),
  short(m(QL, "transfer-reward-clipping", "transfer", 9, 150, "DQN clipped Atari rewards to $[-1, 1]$. What does this gain and what does it cost?"),
    [
      ["gain", "One learning rate and network scale work across games with very different reward magnitudes", 2, true],
      ["cost", "The agent can't distinguish small from large rewards, so it may optimise a different objective than the true score", 2, true],
    ]),
  mcq(m(QL, "transfer-cql", "transfer", 9, 75, "Conservative Q-learning (CQL) for offline RL:"),
    "Pushes down $Q$ values of actions not seen in the dataset to avoid exploiting overestimates",
    [
      ["Increases $Q$ for unseen actions", "cql-increase", "That would worsen extrapolation errors."],
      ["Requires online exploration", "cql-online", "It's designed for offline data."],
      ["Removes the Bellman update", "cql-no-bellman", "It adds a regulariser to it."],
    ]),
  mcq(m(QL, "transfer-robbins-monro", "transfer", 10, 90, "Tabular Q-learning needs $\\sum_n \\alpha_n = \\infty$ and $\\sum_n \\alpha_n^{2} < \\infty$. For $\\alpha_n = n^{-p}$, which $p$ satisfy both?"),
    "$\\frac{1}{2} < p \\le 1$",
    [
      ["$p > 1$", "robbins-large", "Then $\\sum \\alpha_n$ is finite."],
      ["$p \\le \\frac{1}{2}$", "robbins-small", "Then $\\sum \\alpha_n^{2}$ diverges."],
      ["Any $p > 0$", "robbins-any", "Both conditions restrict $p$."],
    ]),
  short(m(QL, "transfer-random-behaviour", "transfer", 10, 180, "Explain how Q-learning can learn the optimal policy while behaving completely randomly, and what condition is required."),
    [
      ["off-policy", "Its target uses the max over next actions, so it estimates $Q^{*}$ regardless of the behaviour policy", 2, true],
      ["coverage", "Every state–action pair must still be visited infinitely often, with suitable step sizes", 2, true],
    ]),
  num(m(QL, "transfer-soft-max", "transfer", 10, 90, "Soft value $V = \\tau\\ln\\sum_a e^{Q(s, a)/\\tau}$ with $\\tau = 0.5$ and $Q = (1, 1)$. What is $V$? Give $4$ decimal places."), 1.3466),
];

// ---------------------------------------------------------------------------
// policy-gradients
// ---------------------------------------------------------------------------
const PG = "policy-gradients";
const policyGradients: Item[] = [
  // 1–10
  mcq(m(PG, "recall-direct", "recall", 1, 15, "Policy gradient methods:"),
    "Parametrise the policy directly and adjust its parameters to increase expected return",
    [
      ["Learn only a $Q$-table", "direct-q-table", "That's value-based."],
      ["Need labelled actions", "direct-labels", "They learn from rewards."],
      ["Never use gradients", "direct-no-gradients", "They follow the gradient of return."],
    ]),
  mcq(m(PG, "recall-stochastic", "recall", 1, 15, "Policy gradient methods typically use:"),
    "Stochastic policies, which give a probability for each action",
    [
      ["Only deterministic lookup tables", "stochastic-tables", "Stochasticity enables exploration and smooth gradients."],
      ["No policy at all", "stochastic-none", "The policy is the object learned."],
      ["Fixed random actions", "stochastic-fixed", "The probabilities are learned."],
    ]),
  mcq(m(PG, "recall-continuous", "recall", 1, 15, "Which setting suits policy gradients especially well?"),
    "Continuous action spaces, e.g. robot joint torques",
    [
      ["Only tiny discrete problems", "continuous-tiny", "They scale to large and continuous spaces."],
      ["Problems with no rewards", "continuous-no-reward", "They need rewards."],
      ["Supervised classification", "continuous-supervised", "That's a different setting."],
    ]),
  num(m(PG, "apply-softmax", "apply", 2, 20, "Softmax policy with logits $(\\ln 3, 0)$. What is the probability of action $1$?"), 0.75),
  num(m(PG, "apply-advantage", "apply", 2, 20, "$Q(s, a) = 4$ and $V(s) = 6$. What is the advantage?"), -2),
  num(m(PG, "apply-reinforce-term", "apply", 2, 20, "A REINFORCE term is $G \\cdot \\nabla_\\theta \\ln\\pi$. With $G = 5$ and $\\nabla_\\theta \\ln\\pi = 0.2$, what is it?"), 1),
  num(m(PG, "apply-uniform", "apply", 3, 25, "Softmax policy with logits $(0, 0, 0)$. What is the probability of each action? Give $4$ decimal places."), 0.3333),
  num(m(PG, "apply-score-own", "apply", 3, 25, "For a softmax policy, $\\frac{\\partial \\ln\\pi(a_1)}{\\partial z_1} = 1 - \\pi(a_1)$. What is it when $\\pi(a_1) = 0.25$?"), 0.75),
  num(m(PG, "apply-score-other", "apply", 3, 25, "And $\\frac{\\partial \\ln\\pi(a_1)}{\\partial z_2} = -\\pi(a_2)$. What is it when $\\pi(a_2) = 0.4$?"), -0.4),
  num(m(PG, "apply-step", "apply", 4, 30, "With learning rate $0.1$, advantage $2$ and $\\nabla_\\theta \\ln\\pi = 0.5$, by how much does $\\theta$ change?"), 0.1),
  // 11–20
  num(m(PG, "apply-baseline", "apply", 4, 30, "Three episodes return $4$, $6$ and $8$; the baseline is their mean. What is the advantage of the episode returning $8$?"), 2),
  mcq(m(PG, "apply-on-policy", "apply", 4, 35, "Vanilla policy gradient (REINFORCE) is:"),
    "On-policy — it needs fresh data from the current policy",
    [
      ["Off-policy", "reinforce-off", "Old data need importance weighting."],
      ["Model-based", "reinforce-model", "It's model-free."],
      ["Supervised", "reinforce-supervised", "It uses returns, not labels."],
    ]),
  short(m(PG, "explain-variance", "explain", 5, 90, "Why are REINFORCE gradient estimates so noisy?"),
    [
      ["returns", "They use full Monte Carlo returns, which vary widely across episodes because of random actions and transitions", 2, true],
      ["credit", "Every action in an episode is credited with the whole return, even actions that didn't matter", 2, true],
    ]),
  mcq(m(PG, "apply-actor-critic", "apply", 5, 40, "An actor–critic method combines:"),
    "A policy (actor) with a learned value function (critic) that supplies lower-variance advantage estimates",
    [
      ["Two policies voting", "ac-two-policies", "The critic estimates values."],
      ["A policy and a replay buffer only", "ac-buffer", "The critic is a value function."],
      ["A supervised and an unsupervised model", "ac-supervised", "Both parts are RL components."],
    ]),
  num(m(PG, "apply-td-advantage", "apply", 5, 40, "One-step advantage $r + \\gamma V(s') - V(s)$ with $r = 1$, $\\gamma = 0.9$, $V(s') = 10$ and $V(s) = 9$. What is it?"), 1),
  num(m(PG, "apply-gaussian-score", "apply", 6, 45, "A Gaussian policy has $\\frac{\\partial \\ln\\pi}{\\partial\\mu} = \\frac{a - \\mu}{\\sigma^{2}}$. What is it for $a = 3$, $\\mu = 1$ and $\\sigma = 2$?"), 0.5),
  num(m(PG, "apply-entropy", "apply", 6, 45, "What is the entropy, in nats, of a uniform policy over $4$ actions? Give $4$ decimal places."), 1.3863),
  short(m(PG, "explain-entropy-bonus", "explain", 6, 120, "Why do many policy gradient methods add an entropy bonus to the objective?"),
    [
      ["collapse", "Without it, the policy can become deterministic too early and stop exploring", 2, true],
      ["bonus", "Rewarding entropy keeps action probabilities spread out, sustaining exploration and avoiding poor local optima", 2, true],
    ]),
  num(m(PG, "transfer-ratio", "transfer", 7, 60, "PPO's ratio is $\\rho = \\frac{\\pi_{\\text{new}}(a \\mid s)}{\\pi_{\\text{old}}(a \\mid s)}$. What is it for $0.6$ and $0.4$?"), 1.5),
  num(m(PG, "transfer-ppo-negative", "transfer", 7, 60, "PPO objective $\\min(\\rho A, \\operatorname{clip}(\\rho, 1 - \\epsilon, 1 + \\epsilon)A)$ with $\\rho = 1.5$, $A = -1$ and $\\epsilon = 0.2$. What is it?"), -1.5),
  // 21–30
  short(m(PG, "transfer-importance", "transfer", 7, 120, "Why does reusing old trajectories for a policy gradient update require importance weights?"),
    [
      ["mismatch", "The data came from an older policy, so their action frequencies don't match the current policy", 2, true],
      ["weights", "Weighting each sample by $\\frac{\\pi_{\\text{new}}}{\\pi_{\\text{old}}}$ corrects the expectation, at the cost of variance when the policies differ a lot", 2, true],
    ]),
  num(m(PG, "transfer-gae", "transfer", 8, 60, "GAE sums $\\sum_l (\\gamma\\lambda)^{l}\\delta_l$. With TD errors $2$, $-1$, $4$ and $\\gamma\\lambda = 0.5$, what is the advantage?"), 2.5),
  mcq(m(PG, "transfer-dpg", "transfer", 8, 60, "Deterministic policy gradient methods such as DDPG:"),
    "Use a deterministic actor and backpropagate through a learned $Q$ critic's action gradient",
    [
      ["Use Monte Carlo returns only", "dpg-mc", "They rely on the critic's gradient."],
      ["Require discrete actions", "dpg-discrete", "They're for continuous actions."],
      ["Have no critic", "dpg-no-critic", "The critic is essential."],
    ]),
  short(m(PG, "transfer-premature", "transfer", 8, 120, "A policy quickly becomes nearly deterministic and its return stops improving. Diagnose and suggest fixes."),
    [
      ["diagnose", "Premature convergence: large updates or no exploration pressure collapsed the policy onto a suboptimal action", 2, true],
      ["fix", "Add or raise an entropy bonus, lower the learning rate, or constrain update size (PPO clipping / KL penalty)", 2, true],
    ]),
  num(m(PG, "transfer-kl", "transfer", 9, 75, "What is $\\text{KL}(p \\| q)$ between Bernoulli policies with $p = 0.5$ and $q = 0.6$ (in nats)? Give $4$ decimal places."), 0.0204),
  short(m(PG, "transfer-normalise", "transfer", 9, 150, "Many implementations normalise advantages within each batch (zero mean, unit variance). Why?"),
    [
      ["scale", "It keeps update magnitudes stable even as reward scales change during training", 2, true],
      ["baseline", "Centring acts like a baseline, so about half the actions are pushed down and half up, reducing variance", 2, true],
    ]),
  mcq(m(PG, "transfer-trpo", "transfer", 9, 75, "TRPO constrains each policy update by:"),
    "A bound on the average KL divergence between the old and new policies",
    [
      ["A fixed learning rate only", "trpo-lr", "It uses a trust region in policy space."],
      ["Clipping rewards", "trpo-rewards", "It constrains the policy change."],
      ["Freezing the critic", "trpo-critic", "The constraint is on the policy."],
    ]),
  num(m(PG, "transfer-se", "transfer", 10, 90, "Per-episode gradient estimates have standard deviation $10$. What is the standard error of their average over $400$ episodes?"), 0.5),
  short(m(PG, "transfer-rlhf", "transfer", 10, 180, "In RLHF, a policy gradient method optimises a learned reward model. Why is a KL penalty to the original model needed?"),
    [
      ["hacking", "Without it, the policy can exploit flaws in the reward model, producing outputs that score highly but are poor (reward hacking)", 2, true],
      ["anchor", "The KL penalty keeps the policy close to the pretrained distribution, where the reward model is reliable", 2, true],
    ]),
  mcq(m(PG, "transfer-local", "transfer", 10, 90, "Why do policy gradient methods generally guarantee only convergence to a local optimum?"),
    "Expected return is a non-convex function of the policy parameters, and gradient ascent follows local slopes",
    [
      ["Because gradients are always zero", "local-zero", "Gradients guide updates."],
      ["Because they're value-based", "local-value", "They're policy-based."],
      ["They always find the global optimum", "local-global", "Non-convexity prevents that guarantee."],
    ]),
];

export const mlSixty12Items: Item[] = [
  ...shapley,
  ...iforest,
  ...mdp,
  ...bellman,
  ...qlearning,
  ...policyGradients,
];
