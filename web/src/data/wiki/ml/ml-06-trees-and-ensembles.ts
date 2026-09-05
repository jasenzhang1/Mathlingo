import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 6 — decision trees, and the two very different ways
 * of combining them. Mirrors `assessments/ml-06-trees-and-ensembles.md`.
 */

const decisionTree: WikiArticle = {
  conceptId: "decision-tree",
  summary:
    "A decision tree splits the feature space with a sequence of axis-aligned yes/no questions and " +
    "predicts a constant within each resulting region. It is the most interpretable model in this " +
    "curriculum and, on its own, one of the least accurate — which is exactly why every serious " +
    "tree method is an ensemble of them.",

  sections: [
    {
      heading: "How a tree is grown",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "At the current node, consider every feature and every candidate threshold.",
            "Score each candidate split by how much it reduces impurity (classification) or squared error (regression).",
            "Take the best split, partition the data, and recurse on each child.",
            "Stop when a depth limit, a minimum node size, or a purity threshold is reached.",
            "Predict the majority class (or the mean) of the training points in each leaf.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The growth procedure is greedy, and that is a real limitation",
          text:
            "Each split is chosen to be locally best, with no lookahead. Finding the globally " +
            "optimal tree is NP-hard, so every practical algorithm is greedy — which means a split " +
            "that looks mediocre now but enables two excellent splits below it will never be taken. " +
            "This is a large part of why a single tree underperforms and why ensembles, which " +
            "explore many different greedy paths, recover so much.",
        },
      ],
    },

    {
      heading: "What trees are good at",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Trees", "Linear / kernel models"],
          rows: [
            ["Feature scaling needed", "No — splits are order-based", "Yes, essentially always"],
            ["Interactions", "Captured automatically by nested splits", "Must be entered by hand"],
            ["Monotone feature transforms", "Invariant — log(x) gives the same tree", "Change the fit"],
            ["Mixed categorical/numeric data", "Handled natively", "Needs encoding"],
            ["Missing values", "Surrogate splits or a default direction", "Needs imputation"],
            ["Extrapolation beyond the training range", "Impossible — leaves are constants", "Natural"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Trees cannot extrapolate, at all",
          text:
            "Every prediction is the mean of some set of training targets, so a regression tree's " +
            "output is bounded by the training targets' range. Feed it a house twice the size of " +
            "anything it has seen and it predicts the mean of the largest houses it knows. Linear " +
            "models extrapolate — sometimes wrongly, but they do it. For time series with a trend " +
            "this difference alone rules trees out unless the trend is differenced away first.",
        },
      ],
    },

    {
      heading: "Instability, and what it implies",
      blocks: [
        {
          kind: "prose",
          text:
            "Trees are high-variance in a specific and instructive way: because the structure is " +
            "built top-down, changing which split wins at the root changes every subtree below it. " +
            "A handful of different training rows can produce a visibly different tree with similar " +
            "accuracy. That is bad news for interpreting any single tree as an explanation, and " +
            "good news for bagging, whose entire benefit comes from averaging away variance.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Axis-aligned splits make some easy problems hard",
          text:
            "The boundary x₁ + x₂ = 1 is a single straight line that a linear model fits with two " +
            "coefficients. A tree can only approximate it with a staircase of axis-aligned cuts, " +
            "needing many splits and still getting the corners wrong. Conversely a rectangular " +
            "region that trees capture in two splits takes a linear model an interaction term and " +
            "some luck. Neither family dominates; they fail in different directions.",
        },
      ],
    },
  ],

  references: [
    { source: "Breiman, Friedman, Olshen & Stone, Classification and Regression Trees", locator: "Ch. 2–3" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§9.2, Tree-Based Methods" },
    { source: "James et al., An Introduction to Statistical Learning", locator: "Ch. 8, Tree-Based Methods" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-06-trees-and-ensembles.md" },
  ],
};

const splittingCriteria: WikiArticle = {
  conceptId: "splitting-criteria",
  summary:
    "A splitting criterion scores how much a candidate split purifies the data. Gini impurity and " +
    "entropy are the two standards for classification, squared-error reduction for regression, and " +
    "the reason they exist in this form is that both reward splits producing nodes dominated by one " +
    "class.",

  sections: [
    {
      heading: "The impurity measures",
      blocks: [
        {
          kind: "formula",
          latex: "Gini = 1 − Σₖ pₖ²        Entropy = −Σₖ pₖ log₂ pₖ",
          caption: "Both are 0 for a pure node and maximal for a uniform mixture",
        },
        {
          kind: "table",
          headers: ["Class split", "Gini", "Entropy (bits)"],
          rows: [
            ["100 / 0", "0", "0"],
            ["90 / 10", "0.18", "0.469"],
            ["70 / 30", "0.42", "0.881"],
            ["50 / 50", "0.5", "1.0"],
          ],
          caption: "For two classes Gini maxes at 0.5 and entropy at 1 bit — the scales differ, the ranking rarely does.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Binary Gini is exactly twice the Bernoulli variance",
          text:
            "For two classes, Gini = 1 − p² − (1 − p)² = 2p(1 − p), and the variance of a " +
            "Bernoulli(p) is p(1 − p). The same p(1 − p) shape that made a coin flip least " +
            "predictable at p = ½ is what makes a node least pure at p = ½. Impurity and variance " +
            "are not analogous here — they are the same quantity up to a factor of 2.",
        },
      ],
    },

    {
      heading: "Scoring a split",
      blocks: [
        {
          kind: "formula",
          latex: "ΔI = I(parent) − Σ_children (nⱼ / n) · I(childⱼ)",
          caption: "Weighted impurity reduction; the weights are what stop tiny pure nodes from winning",
        },
        {
          kind: "example",
          title: "Which split is better?",
          problem:
            "A node holds 100 samples, 50 of each class (Gini 0.5). Split A gives (40/10) and (10/40); split B gives (50/20) and (0/30). Which wins?",
          steps: [
            "Split A children: Gini(40/10) = 1 − 0.8² − 0.2² = 0.32, twice; weighted = 0.5·0.32 + 0.5·0.32 = 0.32.",
            "Split B children: Gini(50/20) = 1 − (5/7)² − (2/7)² ≈ 0.408 on 70 samples; Gini(0/30) = 0 on 30.",
            "Weighted for B = 0.7·0.408 + 0.3·0 ≈ 0.286.",
            "ΔI(A) = 0.5 − 0.32 = 0.18;  ΔI(B) = 0.5 − 0.286 ≈ 0.214.",
          ],
          answer:
            "Split B, because one perfectly pure child of reasonable size buys more than two moderately improved ones. This is also why the child weights matter: without them A's symmetric split would look competitive.",
        },
      ],
    },

    {
      heading: "Gini or entropy, and the trap of multi-valued features",
      blocks: [
        {
          kind: "prose",
          text:
            "The two criteria agree on the chosen split roughly 98% of the time. Gini is marginally " +
            "cheaper — no logarithm — and is scikit-learn's default; entropy has the information-" +
            "theoretic reading (expected bits needed to encode the label) and is what ID3 and C4.5 " +
            "use. Choosing between them is not where model quality is won.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Raw information gain is biased toward high-cardinality features",
          text:
            "Split on a customer ID and every child is a single perfectly pure row: information gain " +
            "is maximal and the split is worthless. C4.5's gain ratio divides gain by the split's " +
            "own entropy to penalise many-valued features, and CART's binary-only splitting limits " +
            "the damage differently. Any criterion that only rewards purity will be gamed by " +
            "identifiers.",
        },
        {
          kind: "prose",
          text:
            "For regression the criterion is variance (equivalently squared-error) reduction, which " +
            "is the same idea with the impurity measure swapped: a split is good when the targets " +
            "within each child are close to their child's mean.",
        },
      ],
    },
  ],

  references: [
    { source: "Breiman et al., Classification and Regression Trees", locator: "§4.1–4.2, Splitting Rules" },
    { source: "Quinlan, C4.5: Programs for Machine Learning", locator: "Ch. 2, Gain Ratio" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§9.2.3, Classification Trees" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-06-trees-and-ensembles.md" },
  ],
};

const pruningTrees: WikiArticle = {
  conceptId: "pruning-trees",
  summary:
    "Pruning removes branches from a fully grown tree to reduce overfitting. Growing large and then " +
    "cutting back beats stopping early, because a split that looks worthless on its own can enable " +
    "an excellent split beneath it — and early stopping never gets to find out.",

  sections: [
    {
      heading: "Post-pruning versus early stopping",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Pre-pruning (early stopping)",
              description:
                "Refuse to split when the gain is below a threshold, the node is too small, or the depth limit is hit. Cheap, and short-sighted: it evaluates each split in isolation.",
            },
            {
              term: "Post-pruning",
              description:
                "Grow the tree to (near) purity, then remove subtrees whose removal does not hurt validation performance. More expensive, and better, because it judges a subtree by what it collectively achieves.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The XOR argument",
          text:
            "On an XOR pattern, neither feature alone reduces impurity at all — every first split " +
            "scores zero. Early stopping halts immediately and returns a stump. Grow two levels " +
            "anyway and the tree separates the classes perfectly. This is the greedy algorithm's " +
            "blind spot made concrete, and it is the whole case for growing first and cutting later.",
        },
      ],
    },

    {
      heading: "Cost-complexity pruning",
      blocks: [
        {
          kind: "formula",
          latex: "R_α(T) = R(T) + α · |leaves(T)|",
          caption: "Training error plus a per-leaf price α — the tree's own regularisation path",
        },
        {
          kind: "prose",
          text:
            "As α increases from 0, the minimising subtree shrinks through a finite nested sequence " +
            "from the full tree to the root. That sequence can be computed once, and " +
            "cross-validation then picks the α whose subtree generalises best. It is the same " +
            "structure as ridge or lasso: one penalty parameter indexing a path of models, chosen " +
            "on held-out data.",
        },
        {
          kind: "table",
          headers: ["α", "Tree", "Bias", "Variance"],
          rows: [
            ["0", "Fully grown, leaves nearly pure", "Low", "High"],
            ["Moderate", "Pruned to the useful structure", "Moderate", "Moderate"],
            ["Large", "Root only — a single constant prediction", "High", "Low"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Pruning matters much less inside an ensemble",
          text:
            "Random forests deliberately grow deep, unpruned trees: the variance that pruning would " +
            "control is instead removed by averaging, and leaving individual trees high-variance " +
            "and low-bias is exactly what makes the average good. Boosting goes the other way and " +
            "uses very shallow trees. In both cases the ensemble, not the individual tree, is where " +
            "complexity is controlled — so pruning is a single-tree technique first and foremost.",
        },
      ],
    },
  ],

  references: [
    { source: "Breiman et al., Classification and Regression Trees", locator: "Ch. 3, Right Sized Trees and Honest Estimates" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§9.2.2, Cost-Complexity Pruning" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-06-trees-and-ensembles.md" },
  ],
};

const ensembleMethods: WikiArticle = {
  conceptId: "ensemble-methods",
  summary:
    "An ensemble combines several models into one prediction. It works only when the members make " +
    "different mistakes: averaging identical models changes nothing. Every ensemble technique is " +
    "therefore, at bottom, a mechanism for manufacturing useful disagreement.",

  sections: [
    {
      heading: "Why averaging helps, quantitatively",
      blocks: [
        {
          kind: "formula",
          latex: "Var(mean of B models) = ρσ² + (1 − ρ)σ²/B",
          caption: "σ² is one model's variance, ρ the average pairwise correlation between them",
        },
        {
          kind: "prose",
          text:
            "Read the two terms. The second vanishes as B → ∞: adding members always helps, up to " +
            "a point. The first does not depend on B at all — it is the floor set by how correlated " +
            "the members are. With ρ = 1 the ensemble is no better than one model, however many you " +
            "add. This single formula explains almost every design decision in bagging and random " +
            "forests.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Decorrelation is the scarce resource, not model count",
          text:
            "Going from 100 to 1,000 trees shrinks a term that is already small. Reducing ρ from " +
            "0.6 to 0.3 halves the term that dominates. That is why random forests bother to " +
            "restrict the features available at each split: the point is not more trees but less " +
            "similar trees.",
        },
      ],
    },

    {
      heading: "The three families",
      blocks: [
        {
          kind: "table",
          headers: ["Family", "Members trained", "Diversity from", "Mainly reduces"],
          rows: [
            ["Bagging", "In parallel, independently", "Bootstrap resampling (plus feature subsampling)", "Variance"],
            ["Boosting", "Sequentially, each on the last one's errors", "Reweighting or residual fitting", "Bias"],
            ["Stacking", "In parallel, then a meta-model learns to combine", "Different model families", "Both, opportunistically"],
          ],
        },
        {
          kind: "prose",
          text:
            "The parallel/sequential distinction is not merely an implementation detail. Bagging is " +
            "embarrassingly parallel and cannot overfit by adding members. Boosting is inherently " +
            "sequential — member t + 1 is defined by member t's residuals — and can overfit if run " +
            "too long. Their hyperparameters mean opposite things as a result.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "An ensemble of biased models stays biased",
          text:
            "Averaging removes variance, not bias. A thousand linear models averaged over bootstrap " +
            "samples of nonlinear data give you a linear model with tight confidence intervals — " +
            "still wrong, now confidently. Bagging is the right tool for high-variance base " +
            "learners (deep trees); it is close to useless for stable, high-bias ones.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "Ch. 8.7, 15 and 16, Bagging, Random Forests and Ensemble Learning" },
    { source: "Dietterich, Ensemble Methods in Machine Learning", locator: "MCS 2000" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-06-trees-and-ensembles.md" },
  ],
};

const bagging: WikiArticle = {
  conceptId: "bagging",
  summary:
    "Bagging — bootstrap aggregating — trains one model per bootstrap resample of the training set " +
    "and averages their predictions. It reduces variance without increasing bias, and it comes with " +
    "a free validation estimate in the form of the out-of-bag samples.",

  sections: [
    {
      heading: "The procedure",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Draw B bootstrap samples: each is n draws with replacement from the n training rows.",
            "Fit one model — usually a deep, unpruned tree — on each sample.",
            "Average the predictions (regression) or take a majority vote (classification).",
          ],
        },
        {
          kind: "prose",
          text:
            "Sampling with replacement is what creates the diversity. Each bootstrap sample contains " +
            "duplicates and omits others, so each tree sees a slightly different dataset and grows a " +
            "different structure. Since trees are unstable, \"slightly different data\" is enough to " +
            "produce genuinely different models — which is precisely why trees are the standard base " +
            "learner for bagging and stable models are not.",
        },
      ],
    },

    {
      heading: "Out-of-bag evaluation",
      blocks: [
        {
          kind: "example",
          title: "What fraction of rows does a bootstrap sample miss?",
          problem: "With n rows drawn n times with replacement, what is the probability a given row is never drawn?",
          steps: [
            "Each draw misses a specific row with probability (1 − 1/n).",
            "Over n independent draws: (1 − 1/n)ⁿ.",
            "As n → ∞ this tends to e⁻¹ ≈ 0.368.",
          ],
          answer:
            "About 36.8% of rows are out-of-bag for any given tree. Each row can be predicted by the ~1/3 of trees that never saw it, giving a cross-validation-like error estimate for the price of the fit you were doing anyway.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "OOB error is nearly free k-fold cross-validation",
          text:
            "It is not identical — OOB predictions come from about a third of the ensemble rather " +
            "than all of it, so it is slightly pessimistic for small B — but it needs no extra " +
            "fitting and is available during training. For large forests it tracks 5-fold CV " +
            "closely enough to use for model selection.",
        },
      ],
    },

    {
      heading: "Limits",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Bagged trees stay correlated, and that caps the gain",
          text:
            "If one feature is strongly predictive, nearly every bootstrap tree splits on it at the " +
            "root and the trees end up similar. The ρσ² floor from the ensemble variance formula " +
            "then dominates, and adding trees stops helping. Random forests exist to attack exactly " +
            "this: restricting the candidate features at each split forces trees apart even when one " +
            "feature is dominant.",
        },
        {
          kind: "list",
          items: [
            "Bagging cannot overfit by adding trees — more members monotonically reduce variance and never increase bias.",
            "Interpretability is the cost: 500 trees are not readable, so importance measures and partial dependence plots replace reading the model.",
            "The base learner must be unstable. Bagged linear regression is very nearly a single linear regression.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Breiman, Bagging Predictors", locator: "Machine Learning 24(2), 1996" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§8.7, Bagging" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-06-trees-and-ensembles.md" },
  ],
};

const randomForests: WikiArticle = {
  conceptId: "random-forests",
  summary:
    "A random forest is bagged trees plus one extra source of randomness: at every split, only a " +
    "random subset of features is considered. That single addition breaks the correlation between " +
    "trees that plain bagging cannot escape, and it is the reason forests outperform bagging " +
    "essentially always.",

  sections: [
    {
      heading: "The one change that matters",
      blocks: [
        {
          kind: "formula",
          latex: "m = √d  (classification)      m ≈ d/3  (regression)",
          caption: "Features sampled per split, out of d total — the standard defaults",
        },
        {
          kind: "prose",
          text:
            "The subset is redrawn at every split, not once per tree. A tree whose strongest feature " +
            "is withheld at the root is forced to find the second-best structure, which is often a " +
            "genuinely different and still-useful view of the data. Averaged over hundreds of trees, " +
            "that produces an ensemble whose members disagree in informative ways.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why deliberately handicapping each tree improves the forest",
          text:
            "Restricting features makes every individual tree worse — higher bias, lower accuracy " +
            "on its own. But it lowers ρ, and in ρσ² + (1 − ρ)σ²/B the ρ term is the binding " +
            "constraint. Trading a little individual quality for a large drop in correlation is a " +
            "net win, and it is one of the cleanest examples in machine learning of an ensemble " +
            "property that no member possesses.",
        },
      ],
    },

    {
      heading: "Tuning and behaviour",
      blocks: [
        {
          kind: "table",
          headers: ["Hyperparameter", "Effect", "Practical guidance"],
          rows: [
            ["n_estimators (B)", "More trees → lower variance, never overfits", "As many as the compute budget allows; watch OOB error plateau"],
            ["max_features (m)", "Smaller m → less correlation, weaker trees", "The main knob worth tuning; √d and d/3 are good starts"],
            ["max_depth / min_samples_leaf", "Controls individual tree complexity", "Usually left unrestricted; depth is not how forests regularise"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Impurity-based feature importance is biased",
          text:
            "The default `feature_importances_` favours high-cardinality and continuous features " +
            "because they offer more candidate splits and therefore more chances to reduce impurity " +
            "by luck. Permutation importance computed on held-out data, or SHAP values, are the " +
            "honest alternatives. Correlated features also split their importance between them, " +
            "making each look unimportant.",
        },
        {
          kind: "prose",
          text:
            "Forests are the standard strong baseline for tabular data: minimal preprocessing, " +
            "little tuning, near-immunity to overfitting from added trees, and OOB error included. " +
            "Gradient boosting usually beats them at the top end, but only after tuning that a " +
            "forest does not require.",
        },
      ],
    },
  ],

  references: [
    { source: "Breiman, Random Forests", locator: "Machine Learning 45(1), 2001" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "Ch. 15, Random Forests" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-06-trees-and-ensembles.md" },
  ],
};

const adaboost: WikiArticle = {
  conceptId: "adaboost",
  summary:
    "AdaBoost trains weak learners in sequence, reweighting the training data after each round so " +
    "the next learner concentrates on what the previous ones got wrong. The final prediction is a " +
    "weighted vote in which more accurate learners count for more. It reduces bias, which is the " +
    "opposite of what bagging does.",

  sections: [
    {
      heading: "The algorithm",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Start with uniform weights wᵢ = 1/n on every training example.",
            "Fit a weak learner (classically a depth-1 tree, a \"stump\") to the weighted data.",
            "Compute its weighted error ε and its vote weight α = ½ ln((1 − ε)/ε).",
            "Multiply the weights of misclassified examples by e^{α} and correctly classified ones by e^{−α}; renormalise.",
            "Repeat, then predict sign(Σ αₜ hₜ(x)).",
          ],
        },
        {
          kind: "formula",
          latex: "α = ½ ln((1 − ε) / ε)",
          caption: "A learner with ε = 0.5 gets α = 0 — no vote at all; ε < 0.5 gets a positive vote",
        },
        {
          kind: "prose",
          text:
            "The α formula is worth pausing on. It diverges as ε → 0, giving an almost-perfect " +
            "learner an enormous vote, and it goes negative for ε > 0.5, which amounts to using a " +
            "worse-than-random learner backwards. The requirement on a weak learner is therefore " +
            "only that it beat chance — nothing more.",
        },
      ],
    },

    {
      heading: "Why sequential reweighting reduces bias",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Bagging averages equals; boosting builds a specialist team",
          text:
            "Every bagged tree solves the same problem on a resample, so averaging cancels their " +
            "independent errors — variance falls, bias does not. Each boosted learner solves a " +
            "*different* problem, defined by what remains unexplained, so the sum represents " +
            "structure no single member could. That is why boosting turns depth-1 stumps, which " +
            "individually cannot represent anything interesting, into a highly flexible model.",
        },
        {
          kind: "prose",
          text:
            "AdaBoost is exactly forward stagewise additive modelling with the exponential loss " +
            "e^{−y f(x)}. That identification, due to Friedman, Hastie and Tibshirani, is what " +
            "connects it to gradient boosting: swap the exponential loss for an arbitrary " +
            "differentiable loss and fit each new learner to the negative gradient, and you have " +
            "gradient boosting with AdaBoost as one special case.",
        },
      ],
    },

    {
      heading: "Where it struggles",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Exponential loss makes it fragile to label noise",
          text:
            "A mislabelled example is misclassified every round, so its weight grows exponentially " +
            "and eventually the ensemble devotes itself to fitting a wrong label. Boosting's " +
            "characteristic failure on noisy data is a direct consequence of the loss function's " +
            "unbounded penalty, and it is why logistic loss (LogitBoost, gradient boosting with " +
            "deviance) is preferred when labels are unreliable.",
        },
        {
          kind: "list",
          items: [
            "Weak learners are kept deliberately shallow — depth 1 to 3. Deep learners defeat the purpose and overfit fast.",
            "Boosting can overfit as rounds increase, unlike bagging; the round count is a genuine hyperparameter set by validation.",
            "Training is sequential and cannot be parallelised across rounds, only within each fit.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Freund & Schapire, A Decision-Theoretic Generalization of On-Line Learning", locator: "JCSS 55(1), 1997" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "Ch. 10, Boosting and Additive Trees" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-06-trees-and-ensembles.md" },
  ],
};

const gradientBoosting: WikiArticle = {
  conceptId: "gradient-boosting",
  summary:
    "Gradient boosting generalises AdaBoost by fitting each new learner to the negative gradient of " +
    "an arbitrary differentiable loss — the pseudo-residuals — rather than to reweighted data. It " +
    "is gradient descent performed in function space, one weak learner per step.",

  sections: [
    {
      heading: "Gradient descent, but the parameter is a function",
      blocks: [
        {
          kind: "formula",
          latex: "rᵢ = −[∂L(yᵢ, F(xᵢ)) / ∂F(xᵢ)]     F_{m}(x) = F_{m−1}(x) + ν · h_m(x)",
          caption: "Fit h_m to the pseudo-residuals r, then take a shrunken step of size ν",
        },
        {
          kind: "prose",
          text:
            "In ordinary gradient descent you nudge a parameter vector against the gradient. Here " +
            "the object being improved is the function F itself, the gradient is evaluated at each " +
            "training point, and the \"step\" is a regression tree fitted to those gradients. With " +
            "squared-error loss the pseudo-residuals are exactly the ordinary residuals y − F(x), " +
            "which is why the method is often introduced as \"fit the next tree to what is left over\".",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Any differentiable loss becomes available",
          text:
            "The algorithm never needs the loss's minimiser in closed form — only its gradient. That " +
            "buys squared error, absolute error, Huber, logistic deviance, Poisson, quantile and " +
            "ranking losses from one implementation. AdaBoost is the exponential-loss special case, " +
            "not a different algorithm.",
        },
      ],
    },

    {
      heading: "The three hyperparameters that interact",
      blocks: [
        {
          kind: "table",
          headers: ["Hyperparameter", "Typical value", "Role"],
          rows: [
            ["Learning rate ν (shrinkage)", "0.01–0.1", "Scales each tree's contribution. Smaller is better, and needs more trees"],
            ["n_estimators M", "100–5,000", "Number of boosting rounds. Traded directly against ν"],
            ["max_depth", "3–8", "Controls the interaction order each tree can capture"],
          ],
        },
        {
          kind: "prose",
          text:
            "ν and M are two views of one quantity: roughly, halving ν requires doubling M for the " +
            "same fit. Small ν with many trees generalises better because each correction is " +
            "cautious and the ensemble averages over many small, partly redundant steps. Depth " +
            "controls interaction order — depth 1 gives a purely additive model, depth 2 allows " +
            "pairwise interactions, and so on.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "More rounds is not monotonically better",
          text:
            "This is the sharpest practical difference from random forests. Adding trees to a forest " +
            "never hurts; adding rounds to a boosted model eventually fits noise and test error " +
            "turns up. Always use early stopping on a validation set rather than a fixed round " +
            "count, and never carry over the intuition from bagging.",
        },
        {
          kind: "prose",
          text:
            "Stochastic gradient boosting adds row subsampling (fit each tree on a random fraction " +
            "of the data), which reduces variance and speeds training — bagging's idea imported " +
            "into a boosting loop.",
        },
      ],
    },
  ],

  references: [
    { source: "Friedman, Greedy Function Approximation: A Gradient Boosting Machine", locator: "Annals of Statistics 29(5), 2001" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§10.10, Numerical Optimization via Gradient Boosting" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-06-trees-and-ensembles.md" },
  ],
};

const xgboost: WikiArticle = {
  conceptId: "xgboost",
  summary:
    "XGBoost is gradient boosting with an explicit regularisation term in the objective, a " +
    "second-order (Newton) approximation of the loss, and a set of systems optimisations. The " +
    "algorithmic changes are what make it more accurate; the engineering is what made it ubiquitous.",

  sections: [
    {
      heading: "Regularisation written into the objective",
      blocks: [
        {
          kind: "formula",
          latex: "Obj = Σᵢ L(yᵢ, ŷᵢ) + Σₖ Ω(fₖ),   Ω(f) = γT + ½λ‖w‖²",
          caption: "T is the number of leaves and w the leaf weights — complexity is penalised explicitly",
        },
        {
          kind: "prose",
          text:
            "Classical gradient boosting regularises implicitly, through shrinkage, depth limits and " +
            "early stopping. XGBoost puts the penalty in the objective the split finder optimises, " +
            "so every split decision already accounts for the complexity it adds. γ acts as a " +
            "minimum gain required to justify a new leaf, and λ shrinks the leaf values themselves.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Second-order information is the other real change",
          text:
            "Standard gradient boosting uses only the first derivative. XGBoost takes a second-order " +
            "Taylor expansion, so each split's gain and each leaf's optimal weight use both the " +
            "gradient gᵢ and the Hessian hᵢ. The leaf weight becomes −Σg / (Σh + λ), which is a " +
            "Newton step rather than a gradient step — better-scaled updates and faster convergence " +
            "in rounds.",
        },
      ],
    },

    {
      heading: "The systems work",
      blocks: [
        {
          kind: "list",
          items: [
            "Approximate split finding on feature histograms rather than exhaustive scans over every candidate threshold.",
            "A sparsity-aware split finder that learns a default direction for missing values instead of requiring imputation.",
            "Column blocks stored in compressed sorted order, enabling parallel split evaluation across features within a single tree.",
            "Cache-aware access patterns and out-of-core computation for datasets larger than memory.",
          ],
        },
        {
          kind: "prose",
          text:
            "None of these change what is being computed in a way that alters the model's " +
            "definition, and all of them change what is feasible to compute. That distinction is " +
            "worth holding onto: XGBoost's dominance in tabular competitions from 2015 onward came " +
            "as much from being fast enough to tune properly as from being better per fit.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It is still boosting, with all that implies",
          text:
            "Sequential training, sensitivity to the round count, vulnerability to label noise, and " +
            "a genuine tuning burden all remain. LightGBM (leaf-wise growth, faster on wide data) " +
            "and CatBoost (ordered boosting, native categorical handling) make different trade-offs " +
            "within the same family. And a random forest remains the better choice when you need a " +
            "strong result with no tuning at all.",
        },
      ],
    },
  ],

  references: [
    { source: "Chen & Guestrin, XGBoost: A Scalable Tree Boosting System", locator: "KDD 2016" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "Ch. 10, Boosting and Additive Trees" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-06-trees-and-ensembles.md" },
  ],
};

export const ml06TreesAndEnsembles: WikiArticle[] = [
  decisionTree,
  splittingCriteria,
  pruningTrees,
  ensembleMethods,
  bagging,
  randomForests,
  adaboost,
  gradientBoosting,
  xgboost,
];
