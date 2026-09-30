import type { WikiArticle } from "../types";

/**
 * Cluster 20: focused lessons split out of broader ones — regression and hinge
 * losses, distance and cosine similarity, hyperparameter search, the three
 * interpretability methods, isolation forests, and the reinforcement-learning
 * core (MDPs, Bellman equations, Q-learning, policy gradients).
 */

const esl = "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning (2nd ed.)";
const sutton = "Sutton & Barto, Reinforcement Learning: An Introduction (2nd ed.)";
const molnar = "Molnar, Interpretable Machine Learning (2nd ed.)";

const regressionLosses: WikiArticle = {
  conceptId: "regression-losses",
  summary:
    "The loss function decides what a regression model is estimating. Squared error targets the conditional mean, " +
    "absolute error the conditional median, quantile (pinball) loss a chosen quantile, and Huber loss blends squared " +
    "error near zero with absolute error in the tails to resist outliers.",
  sections: [
    {
      heading: "The common losses",
      blocks: [
        {
          kind: "table",
          headers: ["Loss", "$L(y, \\hat{y})$ with $r = y - \\hat{y}$", "Minimiser over constants", "Outliers"],
          rows: [
            ["Squared (MSE)", "$r^2$", "mean", "heavily penalised — pulls the fit"],
            ["Absolute (MAE)", "$|r|$", "median", "robust"],
            ["Huber", "$\\tfrac12 r^2$ if $|r| \\le \\delta$, else $\\delta(|r| - \\tfrac12\\delta)$", "between mean and median", "robust, smooth at $0$"],
            ["Quantile $\\tau$", "$\\tau r$ if $r \\ge 0$, else $(\\tau - 1)r$", "$\\tau$-quantile", "robust"],
          ],
        },
        {
          kind: "example",
          title: "Which constant minimises each loss?",
          problem: "Data $1, 2, 3, 10$. Find the best constant prediction under MSE and under MAE.",
          steps: ["MSE is minimised by the mean: $16/4 = 4$.", "MAE is minimised by any median, i.e. any value in $[2, 3]$."],
          answer: "MSE → $4$ (dragged by the outlier $10$); MAE → $2.5$ (or anywhere in $[2, 3]$).",
        },
      ],
    },
    {
      heading: "Choosing a loss",
      blocks: [
        {
          kind: "list",
          items: [
            "MSE corresponds to Gaussian errors (maximum likelihood); MAE to Laplace errors.",
            "RMSE is reported on the target's scale, but it is still dominated by the largest errors.",
            "MAE's gradient is constant in size, so gradient methods need decaying steps near the optimum; Huber keeps a smooth quadratic bowl.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Evaluate with the loss you care about",
          text: "A model trained for MSE predicts means; if the business cost is asymmetric (under-stocking costs more than over-stocking), train and evaluate on a quantile loss instead.",
        },
      ],
    },
  ],
  references: [{ source: esl, locator: "§2.4, §10.6" }],
};

const hingeLoss: WikiArticle = {
  conceptId: "hinge-loss",
  summary:
    "Hinge loss scores a classifier's margin $m = y f(x)$ with $y \\in \\{-1, +1\\}$: it is zero once a point is on the " +
    "correct side with margin at least $1$, and grows linearly otherwise. Minimising it with an $\\ell_2$ penalty is exactly " +
    "the soft-margin support vector machine.",
  sections: [
    {
      heading: "Definition and comparison",
      blocks: [
        { kind: "formula", latex: "L_{\\text{hinge}}(y, f) = \\max(0, 1 - yf)", caption: "for labels $y \\in \\{-1, +1\\}$" },
        {
          kind: "table",
          headers: ["Loss of margin $m$", "Formula", "Behaviour"],
          rows: [
            ["0–1", "$\\mathbf{1}(m \\le 0)$", "what we care about; non-convex"],
            ["Hinge", "$\\max(0, 1 - m)$", "convex, exactly $0$ beyond margin $1$ — sparse support vectors"],
            ["Logistic", "$\\log(1 + e^{-m})$", "smooth, never exactly $0$ — gives probabilities"],
          ],
        },
        {
          kind: "example",
          title: "Scoring three points",
          problem: "Scores $f(x) = 2.5, 0.4, -0.3$ for points all labelled $y = +1$. Compute the hinge losses.",
          steps: ["$\\max(0, 1 - 2.5) = 0$.", "$\\max(0, 1 - 0.4) = 0.6$.", "$\\max(0, 1 + 0.3) = 1.3$."],
          answer: "$0$, $0.6$ and $1.3$ — only points inside the margin or misclassified contribute.",
        },
      ],
    },
    {
      heading: "Properties",
      blocks: [
        {
          kind: "list",
          items: [
            "Hinge is a convex upper bound on 0–1 loss, and it is classification-calibrated: its minimiser has the same sign as $P(y = 1 \\mid x) - \\tfrac12$.",
            "It is not differentiable at $m = 1$; subgradient methods or the SVM dual handle this.",
            "Because it ignores points beyond the margin, hinge-trained scores are not probabilities — use Platt scaling if you need them.",
            "Squared hinge $\\max(0, 1 - m)^2$ is differentiable and penalises violations more strongly.",
          ],
        },
      ],
    },
  ],
  references: [{ source: esl, locator: "§12.3" }],
};

const distanceMetrics: WikiArticle = {
  conceptId: "distance-metrics",
  summary:
    "Nearest neighbours, clustering and kernel methods all depend on a notion of distance. The choice of metric — and the " +
    "scaling of features — decides which points count as similar, often mattering more than the algorithm itself.",
  sections: [
    {
      heading: "Common metrics",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Euclidean ($L_2$)", description: "$\\sqrt{\\sum_i(x_i - y_i)^2}$ — straight-line distance; rotation invariant." },
            { term: "Manhattan ($L_1$)", description: "$\\sum_i|x_i - y_i|$ — grid distance; less dominated by a single large difference." },
            { term: "Minkowski ($L_p$)", description: "$\\left(\\sum_i|x_i - y_i|^p\\right)^{1/p}$; $p \\to \\infty$ gives the Chebyshev distance $\\max_i|x_i - y_i|$." },
            { term: "Mahalanobis", description: "$\\sqrt{(x - y)^\\top\\Sigma^{-1}(x - y)}$ — accounts for scale and correlation; Euclidean after whitening." },
            { term: "Hamming", description: "The number of positions where two strings or binary vectors differ." },
          ],
        },
        {
          kind: "example",
          title: "One pair, three metrics",
          problem: "Compute the $L_1$, $L_2$ and $L_\\infty$ distances between $(0, 0)$ and $(3, 4)$.",
          steps: ["$L_1 = 3 + 4 = 7$.", "$L_2 = \\sqrt{9 + 16} = 5$.", "$L_\\infty = \\max(3, 4) = 4$."],
          answer: "$7$, $5$ and $4$ — always $L_\\infty \\le L_2 \\le L_1$.",
        },
      ],
    },
    {
      heading: "Practical issues",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Scale first",
          text: "With income in dollars and age in years, Euclidean distance is essentially income distance. Standardise features (or use Mahalanobis distance) before any distance-based method.",
        },
        {
          kind: "prose",
          text:
            "A metric must be non-negative, zero only for identical points, symmetric and satisfy the triangle inequality. Cosine " +
            "“distance” $1 - \\cos\\theta$ violates the triangle inequality, and in high dimensions all pairwise Euclidean distances " +
            "concentrate around the same value, weakening nearest-neighbour methods (the curse of dimensionality).",
        },
      ],
    },
  ],
  references: [{ source: esl, locator: "§13.3, §14.3" }],
};

const cosineSimilarity: WikiArticle = {
  conceptId: "cosine-similarity",
  summary:
    "Cosine similarity measures the angle between two vectors, ignoring their lengths. Two documents with the same word " +
    "proportions are maximally similar even if one is ten times longer — which is why cosine is the default similarity for " +
    "text vectors and learned embeddings.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\cos(x, y) = \\frac{x \\cdot y}{\\|x\\|\\,\\|y\\|} \\in [-1, 1]",
          caption: "$1$: same direction; $0$: orthogonal; $-1$: opposite",
        },
        {
          kind: "example",
          title: "Two vectors",
          problem: "Find the cosine similarity of $x = (1, 2, 2)$ and $y = (2, 0, 1)$.",
          steps: ["$x \\cdot y = 2 + 0 + 2 = 4$.", "$\\|x\\| = 3$ and $\\|y\\| = \\sqrt{5}$.", "$\\cos = 4/(3\\sqrt{5})$."],
          answer: "$\\approx 0.596$.",
        },
      ],
    },
    {
      heading: "Relation to Euclidean distance",
      blocks: [
        {
          kind: "formula",
          latex: "\\|u - v\\|^2 = 2 - 2\\cos(u, v) \\quad \\text{for unit vectors } u, v",
          caption: "on normalised vectors, ranking by cosine = ranking by Euclidean distance",
        },
        {
          kind: "list",
          items: [
            "Scaling a vector doesn't change its cosine similarity with anything — only its direction matters.",
            "For non-negative vectors (word counts, TF-IDF) cosine lies in $[0, 1]$.",
            "Centring vectors first turns cosine similarity into the Pearson correlation.",
            "Retrieval systems normalise embeddings once, so cosine similarity becomes a dot product and can use fast maximum-inner-product search.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Magnitude can carry information",
          text: "Ignoring length is a choice. For ratings, a user who rates everything $5$ and one who rates everything $1$ have identical directions; for embeddings, anisotropy can make all cosines high, so compare against a baseline rather than reading raw values.",
        },
      ],
    },
  ],
  references: [{ source: "Manning, Raghavan & Schütze, Introduction to Information Retrieval", locator: "§6.3" }],
};

const hyperparameterSearch: WikiArticle = {
  conceptId: "hyperparameter-search",
  summary:
    "Tuning hyperparameters is an optimisation problem with an expensive, noisy objective (cross-validated performance). " +
    "Grid search is exhaustive but wasteful, random search covers important dimensions better for the same budget, and " +
    "successive halving (and Hyperband) stop unpromising configurations early.",
  sections: [
    {
      heading: "Strategies",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Grid search", description: "Evaluate every combination of chosen values; cost grows exponentially with the number of hyperparameters." },
            { term: "Random search", description: "Sample configurations from distributions (often log-uniform for learning rates and penalties)." },
            { term: "Successive halving", description: "Train many configurations on a small budget, keep the best fraction, give them more budget, repeat." },
            { term: "Bayesian optimisation", description: "Model the score surface with a surrogate (e.g. a GP) and pick the next configuration by an acquisition function." },
          ],
        },
        {
          kind: "example",
          title: "Why random beats grid",
          problem: "With a budget of $9$ runs over two hyperparameters, only one of which matters, how many distinct values of the important one does each method try?",
          steps: ["A $3 \\times 3$ grid tries only $3$ distinct values of each hyperparameter.", "$9$ random draws almost surely give $9$ distinct values of each."],
          answer: "Grid: $3$; random: $9$ — random search explores the dimension that matters much more finely (Bergstra & Bengio).",
        },
      ],
    },
    {
      heading: "Good practice",
      blocks: [
        {
          kind: "list",
          items: [
            "Search on a log scale for scale-type hyperparameters (learning rate, regularisation strength).",
            "Evaluate by cross-validation, and estimate final performance with nested cross-validation or an untouched test set.",
            "Widen the range if the best value lies on its boundary.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Tuning overfits too",
          text: "With many configurations, the best validation score is optimistically biased — selection is itself fitting to the validation set.",
        },
      ],
    },
  ],
  references: [{ source: "Bergstra & Bengio (2012), Random Search for Hyper-Parameter Optimization, JMLR", locator: "§1–3" }],
};

const permutationImportance: WikiArticle = {
  conceptId: "permutation-importance",
  summary:
    "Permutation importance measures how much a model's performance drops when one feature's values are randomly shuffled, " +
    "breaking its link with the target while keeping its distribution. It works for any model, but it measures reliance of " +
    "that particular model, and it misleads when features are correlated.",
  sections: [
    {
      heading: "Algorithm",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Compute the baseline score $s$ on held-out data.",
            "For feature $j$, shuffle its column, recompute the score $s_j$ (average over several shuffles).",
            "Importance $= s - s_j$ (or the ratio): the bigger the drop, the more the model relies on $j$.",
          ],
        },
        {
          kind: "example",
          title: "Reading the output",
          problem: "Baseline accuracy is $0.90$. Shuffling feature A gives $0.72$; shuffling B gives $0.89$. Interpret.",
          steps: ["Importance of A $= 0.18$; of B $= 0.01$."],
          answer: "The model relies heavily on A and barely on B — B may still be predictive if another feature carries the same information.",
        },
      ],
    },
    {
      heading: "Pitfalls",
      blocks: [
        {
          kind: "list",
          items: [
            "Correlated features: shuffling one creates unrealistic combinations, and the model can fall back on its correlated partner, so both can look unimportant.",
            "Compute on held-out data; training-set importance rewards overfitted features.",
            "It explains the model, not the world — importance is not causal effect.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Alternatives",
          text: "Conditional permutation, dropping and refitting (leave-one-covariate-out) or grouping correlated features answer different, often more relevant, questions.",
        },
      ],
    },
  ],
  references: [{ source: molnar, locator: "Ch. 8.5" }],
};

const partialDependence: WikiArticle = {
  conceptId: "partial-dependence",
  summary:
    "A partial dependence plot shows how a model's average prediction changes as one feature is varied, averaging over the " +
    "other features' observed values. Individual conditional expectation (ICE) curves show the same for each data point, " +
    "revealing interactions that the average hides.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{f}_S(x_S) = \\frac{1}{n}\\sum_{i=1}^n\\hat{f}(x_S, x_{C}^{(i)})",
          caption: "fix the feature(s) $S$ at $x_S$, keep each row's other features $x_C^{(i)}$, and average",
        },
        {
          kind: "example",
          title: "Averaging two ICE curves",
          problem: "A model predicts $f(x, z) = xz$ for data with $z \\in \\{-1, 1\\}$ equally often. What do the ICE curves and PDP for $x$ look like?",
          steps: ["ICE for $z = 1$: $f = x$ (increasing).", "ICE for $z = -1$: $f = -x$ (decreasing).", "PDP: average $= 0$ for all $x$."],
          answer: "A flat PDP despite $x$ mattering a lot — the interaction is visible only in the ICE curves.",
        },
      ],
    },
    {
      heading: "Caveats",
      blocks: [
        {
          kind: "list",
          items: [
            "Correlated features: the average includes unrealistic combinations (e.g. large area with one room); accumulated local effects (ALE) plots avoid this.",
            "Heterogeneous effects cancel in the average; always inspect ICE curves or centred ICE.",
            "Like all model explanations, PDPs describe the model, not causal effects in the world.",
          ],
        },
      ],
    },
  ],
  references: [{ source: molnar, locator: "Ch. 8.1–8.2" }, { source: esl, locator: "§10.13.2" }],
};

const shapleyValues: WikiArticle = {
  conceptId: "shapley-values",
  summary:
    "Shapley values divide a prediction among the features, treating them as players in a cooperative game whose payout is " +
    "the prediction. Each feature gets its average marginal contribution over all orderings — the unique allocation " +
    "satisfying efficiency, symmetry, dummy and additivity. SHAP makes them practical for ML models.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\phi_j = \\sum_{S \\subseteq F \\setminus \\{j\\}}\\frac{|S|!\\,(|F| - |S| - 1)!}{|F|!}\\left[v(S \\cup \\{j\\}) - v(S)\\right]",
          caption: "$v(S)$ is the model's expected output when only the features in $S$ are known",
        },
        {
          kind: "example",
          title: "Two features",
          problem: "$v(\\emptyset) = 10$, $v(\\{A\\}) = 16$, $v(\\{B\\}) = 12$, $v(\\{A, B\\}) = 20$. Find $\\phi_A$ and $\\phi_B$.",
          steps: [
            "$\\phi_A = \\tfrac12[(16 - 10) + (20 - 12)] = 7$.",
            "$\\phi_B = \\tfrac12[(12 - 10) + (20 - 16)] = 3$.",
          ],
          answer: "$\\phi_A = 7$, $\\phi_B = 3$; they sum to $20 - 10 = 10$ (efficiency).",
        },
      ],
    },
    {
      heading: "In practice",
      blocks: [
        {
          kind: "list",
          items: [
            "Exact computation needs $2^{|F|}$ coalitions; KernelSHAP samples coalitions, TreeSHAP computes exact values for tree ensembles in polynomial time.",
            "“Removing” a feature means averaging over a background distribution — interventional (marginal) or conditional, which answer different questions when features are correlated.",
            "Global importance is often summarised as mean $|\\phi_j|$ over the data.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Attribution is not causation",
          text: "Shapley values explain how the model uses features for a prediction. They do not say what would happen to the outcome if you changed a feature in the world.",
        },
      ],
    },
  ],
  references: [{ source: molnar, locator: "Ch. 9.5–9.6" }, { source: "Lundberg & Lee (2017), A Unified Approach to Interpreting Model Predictions, NeurIPS", locator: "§2–4" }],
};

const isolationForest: WikiArticle = {
  conceptId: "isolation-forest",
  summary:
    "Isolation forests detect anomalies by isolating points rather than modelling normal density. Random trees split on " +
    "random features at random thresholds; anomalies, being few and different, are separated after only a few splits, " +
    "so a short average path length signals an outlier.",
  sections: [
    {
      heading: "Scoring",
      blocks: [
        {
          kind: "formula",
          latex: "s(x) = 2^{-\\mathbb{E}[h(x)]/c(n)}, \\qquad c(n) = 2H(n - 1) - \\frac{2(n - 1)}{n}",
          caption: "$h(x)$: path length; $c(n)$: average path length of an unsuccessful BST search; $H$ the harmonic number",
        },
        {
          kind: "list",
          items: [
            "$s \\to 1$: very short paths — likely anomalies.",
            "$s \\ll 0.5$: long paths — normal points.",
            "$s \\approx 0.5$ everywhere: no distinct anomalies.",
          ],
        },
        {
          kind: "example",
          title: "Interpreting a score",
          problem: "With subsample size $n = 256$, $c(n) \\approx 10.24$. A point has average path length $3$. Compute its score.",
          steps: ["$s = 2^{-3/10.24} = 2^{-0.293}$."],
          answer: "$\\approx 0.82$ — a strong anomaly candidate.",
        },
      ],
    },
    {
      heading: "Strengths and limits",
      blocks: [
        {
          kind: "list",
          items: [
            "Linear time and small memory: each tree uses a subsample (commonly $256$ points), which also reduces masking and swamping.",
            "No distance computations, so it scales to large, high-dimensional data.",
            "Axis-parallel splits create artefacts; extended isolation forests use random hyperplanes.",
            "It flags global outliers well but can miss local anomalies inside dense regions; LOF targets those.",
          ],
        },
      ],
    },
  ],
  references: [{ source: "Liu, Ting & Zhou (2008), Isolation Forest, ICDM", locator: "§2–4" }],
};

const mdps: WikiArticle = {
  conceptId: "markov-decision-processes",
  summary:
    "A Markov decision process formalises sequential decision making: an agent in state $s$ picks action $a$, receives " +
    "reward $r$, and moves to $s'$ with probability $P(s' \\mid s, a)$. The goal is a policy maximising expected discounted " +
    "return. The Markov property — the future depends on the present state and action only — is what makes the problem tractable.",
  sections: [
    {
      heading: "Components",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "States $\\mathcal{S}$ and actions $\\mathcal{A}$", description: "What the agent observes and can do." },
            { term: "Transitions $P(s' \\mid s, a)$", description: "The environment's dynamics." },
            { term: "Reward $R(s, a)$", description: "The immediate scalar feedback." },
            { term: "Discount $\\gamma \\in [0, 1)$", description: "Weights future rewards; the return is $G_t = \\sum_{k \\ge 0}\\gamma^kr_{t+k+1}$." },
            { term: "Policy $\\pi(a \\mid s)$", description: "The agent's (possibly stochastic) rule for choosing actions." },
          ],
        },
        {
          kind: "example",
          title: "A discounted return",
          problem: "Rewards $1, 1, 1$ then $0$ forever, with $\\gamma = 0.9$. What is the return?",
          steps: ["$G = 1 + 0.9 + 0.81$."],
          answer: "$2.71$. A constant reward of $1$ forever would give $1/(1 - \\gamma) = 10$.",
        },
      ],
    },
    {
      heading: "Why discount?",
      blocks: [
        {
          kind: "list",
          items: [
            "It keeps infinite-horizon returns finite (bounded by $R_{\\max}/(1 - \\gamma)$).",
            "It encodes preference for sooner rewards and uncertainty about the future; the effective horizon is about $1/(1 - \\gamma)$.",
            "Episodic tasks can use $\\gamma = 1$ because returns end at a terminal state.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Partial observability",
          text: "If the agent can't see the full state (a POMDP), the observation isn't Markov; agents then act on beliefs or memory (e.g. recurrent policies).",
        },
      ],
    },
  ],
  references: [{ source: sutton, locator: "Ch. 3" }],
};

const bellman: WikiArticle = {
  conceptId: "bellman-equations",
  summary:
    "Value functions measure how good it is to be in a state (or to take an action there) under a policy. They satisfy " +
    "recursive Bellman equations relating a state's value to its successors'. The optimality version characterises the " +
    "best policy and is solved by value iteration or policy iteration when the model is known.",
  sections: [
    {
      heading: "Value functions",
      blocks: [
        {
          kind: "formula",
          latex: "V^\\pi(s) = \\sum_a\\pi(a \\mid s)\\sum_{s'}P(s' \\mid s, a)\\left[R(s, a) + \\gamma V^\\pi(s')\\right]",
          caption: "Bellman expectation equation",
        },
        {
          kind: "formula",
          latex: "Q^*(s, a) = R(s, a) + \\gamma\\sum_{s'}P(s' \\mid s, a)\\max_{a'}Q^*(s', a')",
          caption: "Bellman optimality equation; the optimal policy acts greedily with respect to $Q^*$",
        },
        {
          kind: "example",
          title: "A one-state loop",
          problem: "A single state earns reward $2$ each step and returns to itself, with $\\gamma = 0.8$. Solve $V = 2 + 0.8V$.",
          steps: ["$0.2V = 2$."],
          answer: "$V = 10$.",
        },
      ],
    },
    {
      heading: "Dynamic programming",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Value iteration", description: "Repeat $V \\leftarrow \\max_a[R + \\gamma PV]$; the Bellman operator is a $\\gamma$-contraction, so it converges geometrically to $V^*$." },
            { term: "Policy iteration", description: "Alternate exact policy evaluation with greedy policy improvement; converges in finitely many steps for finite MDPs." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "From planning to learning",
          text: "Dynamic programming needs $P$ and $R$. Reinforcement learning methods (TD, Q-learning) replace the expectations with sampled experience.",
        },
      ],
    },
  ],
  references: [{ source: sutton, locator: "Ch. 3–4" }],
};

const qLearning: WikiArticle = {
  conceptId: "q-learning",
  summary:
    "Temporal-difference methods learn value functions from experience by bootstrapping: they update estimates towards " +
    "a target that uses the current estimate of the next state. Q-learning learns optimal action values off-policy, " +
    "while SARSA learns the values of the policy it actually follows.",
  sections: [
    {
      heading: "Updates",
      blocks: [
        {
          kind: "formula",
          latex: "Q(s, a) \\leftarrow Q(s, a) + \\alpha\\left[r + \\gamma\\max_{a'}Q(s', a') - Q(s, a)\\right]",
          caption: "Q-learning; SARSA replaces $\\max_{a'}Q(s', a')$ by $Q(s', a')$ for the action actually taken",
        },
        {
          kind: "example",
          title: "One update",
          problem: "$Q(s, a) = 2$, reward $r = 1$, $\\max_{a'}Q(s', a') = 5$, $\\gamma = 0.9$, $\\alpha = 0.1$. Update $Q(s, a)$.",
          steps: ["Target $= 1 + 0.9 \\times 5 = 5.5$.", "TD error $= 5.5 - 2 = 3.5$.", "$Q \\leftarrow 2 + 0.1 \\times 3.5$."],
          answer: "$2.35$.",
        },
      ],
    },
    {
      heading: "Exploration and stability",
      blocks: [
        {
          kind: "list",
          items: [
            "ε-greedy: take a random action with probability ε, otherwise the greedy one; decay ε over time.",
            "Tabular Q-learning converges to $Q^*$ if every state–action pair is visited infinitely often and step sizes satisfy the Robbins–Monro conditions.",
            "SARSA is on-policy, so it learns safer behaviour when exploration is risky (the cliff-walking example).",
            "With function approximation, bootstrapping + off-policy learning + approximation (the “deadly triad”) can diverge; DQN stabilises it with experience replay and target networks.",
          ],
        },
      ],
    },
  ],
  references: [{ source: sutton, locator: "Ch. 6" }],
};

const policyGradients: WikiArticle = {
  conceptId: "policy-gradients",
  summary:
    "Policy gradient methods parameterise the policy $\\pi_\\theta(a \\mid s)$ directly and ascend the gradient of expected " +
    "return. They handle continuous actions and stochastic policies naturally, at the cost of high-variance gradient " +
    "estimates — reduced by baselines and learned critics.",
  sections: [
    {
      heading: "The policy gradient theorem",
      blocks: [
        {
          kind: "formula",
          latex: "\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\pi_\\theta}\\left[\\nabla_\\theta\\log\\pi_\\theta(a_t \\mid s_t)\\,(G_t - b(s_t))\\right]",
          caption: "REINFORCE with a baseline $b$; any baseline independent of the action keeps the estimator unbiased",
        },
        {
          kind: "example",
          title: "A softmax policy update",
          problem: "Two actions with logits $(0, 0)$, so $\\pi = (0.5, 0.5)$. Action $1$ is taken and $G - b = 2$. With step size $0.1$, how does the logit of action $1$ change?",
          steps: ["$\\partial\\log\\pi(1)/\\partial\\theta_1 = 1 - \\pi(1) = 0.5$.", "Update $= 0.1 \\times 2 \\times 0.5$."],
          answer: "It increases by $0.1$ (and action $2$'s logit falls by $0.1$).",
        },
      ],
    },
    {
      heading: "Variance reduction and actor–critic",
      blocks: [
        {
          kind: "list",
          items: [
            "Using the advantage $A(s, a) = Q(s, a) - V(s)$ instead of raw returns centres the signal.",
            "Actor–critic methods learn $V$ (the critic) by TD and use it for the advantage, trading a little bias for much lower variance.",
            "Trust-region methods (TRPO, PPO) limit how far each update moves the policy, preventing destructive steps.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where you have seen this",
          text: "RLHF fine-tunes language models with PPO: the policy is the model, and the reward comes from a learned preference model, with a KL penalty keeping it near the original.",
        },
      ],
    },
  ],
  references: [{ source: sutton, locator: "Ch. 13" }],
};

export const ml20FocusedTopics: WikiArticle[] = [
  regressionLosses,
  hingeLoss,
  distanceMetrics,
  cosineSimilarity,
  hyperparameterSearch,
  permutationImportance,
  partialDependence,
  shapleyValues,
  isolationForest,
  mdps,
  bellman,
  qLearning,
  policyGradients,
];
