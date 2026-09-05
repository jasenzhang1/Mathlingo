import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 1 — the vocabulary the rest of the domain is written
 * in. Mirrors `assessments/ml-01-foundations.md`, so every article here has a
 * matching question set: the wiki explains the idea, the bank checks it landed.
 */

const mlIntroduction: WikiArticle = {
  conceptId: "ml-introduction",
  summary:
    "Machine learning is what you reach for when you can recognise the right answer but cannot write " +
    "down the rule that produces it. Instead of a programmer specifying the decision logic, an " +
    "algorithm infers that logic from examples. Everything downstream in this domain — losses, " +
    "gradients, validation splits — exists to make that inference reliable.",

  sections: [
    {
      heading: "The definition that actually distinguishes it",
      blocks: [
        {
          kind: "prose",
          text:
            "A system is doing machine learning when its performance on a task improves with data, " +
            "rather than only with edits to its source code. Tom Mitchell's formulation is the one " +
            "worth memorising because it names the three things you must be able to point at before " +
            "you have a learning problem at all.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Task T", description: "What the system must do — classify an email, forecast a price, cluster customers." },
            { term: "Experience E", description: "The data it learns from. Without E there is nothing to improve on." },
            { term: "Performance measure P", description: "The number that says whether it got better. If you cannot state P, you cannot tell learning from noise." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The line is where the logic comes from, not how complex it is",
          text:
            "A hand-written spam filter with 4,000 keyword rules is not machine learning; a " +
            "three-line logistic regression fitted on labelled emails is. Complexity is irrelevant — " +
            "the question is whether a human wrote the decision rule or whether data produced it.",
        },
      ],
    },

    {
      heading: "Why learned rules beat written ones for some tasks",
      blocks: [
        {
          kind: "prose",
          text:
            "The tasks where ML wins are the ones where recognition is easy and articulation is hard. " +
            "You can identify a handwritten 7 in a tenth of a second, and you cannot write the rule " +
            "you used. That gap — between what you can demonstrate and what you can state — is " +
            "exactly the gap machine learning fills. It converts a large supply of demonstrations " +
            "into an approximation of the rule you could never articulate.",
        },
        {
          kind: "table",
          headers: ["Task", "Rule is easy to state?", "Better approach"],
          rows: [
            ["Compute sales tax", "Yes — it is a published percentage", "Ordinary code"],
            ["Validate an email address", "Mostly — a grammar exists", "Ordinary code"],
            ["Detect a tumour in a scan", "No — radiologists disagree on wording", "Machine learning"],
            ["Rank search results", "No — relevance is not formalisable", "Machine learning"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "ML is not free of hand-written logic",
          text:
            "Choosing the features, the loss, the model class, and the evaluation metric are all " +
            "human decisions that encode assumptions as firmly as any if-statement. Real systems are " +
            "a blend: a rules layer that handles the clear cases and defers the ambiguous ones to a " +
            "learned model. \"Machine learning\" names a point on a spectrum of how much of the " +
            "decision logic is learned, not a binary category.",
        },
      ],
    },

    {
      heading: "The shape of every supervised learning problem",
      blocks: [
        {
          kind: "formula",
          latex: "find f ∈ F minimising  R(f) = E[L(y, f(x))]",
          caption: "Learning as risk minimisation over a hypothesis class F",
        },
        {
          kind: "prose",
          text:
            "Almost every method in this domain is one choice of F (what functions are allowed), one " +
            "choice of L (what counts as a mistake), and one algorithm for doing the minimising. A " +
            "decision tree, an SVM, and a neural network differ mainly in F. Squared error and " +
            "cross-entropy differ only in L. Recognising the template is what makes the rest of the " +
            "curriculum feel like variations rather than fifty unrelated recipes.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "You never get to compute R(f)",
          text:
            "The true risk is an expectation over the data-generating distribution, which you do not " +
            "have. You minimise the empirical risk — the average loss on your sample — and hope it " +
            "tracks the true risk. The entire apparatus of validation sets, cross-validation, and " +
            "regularisation exists because sometimes it does not.",
        },
      ],
    },
  ],

  references: [
    { source: "Mitchell, Machine Learning", locator: "Ch. 1, Well-Posed Learning Problems" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§2.1, Introduction" },
    { source: "James et al., An Introduction to Statistical Learning", locator: "Ch. 2, Statistical Learning" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-01-foundations.md" },
  ],
};

const typesOfMachineLearning: WikiArticle = {
  conceptId: "types-of-machine-learning",
  summary:
    "Machine learning splits into three families by what kind of feedback the learner receives: " +
    "supervised learning gets the right answer for each example, unsupervised learning gets no " +
    "answers at all, and reinforcement learning gets a delayed reward for a sequence of actions. " +
    "The feedback signal — not the algorithm, not the data type — is what defines the categories.",

  sections: [
    {
      heading: "The three families",
      blocks: [
        {
          kind: "table",
          headers: ["Family", "Feedback signal", "Canonical question", "Example"],
          rows: [
            ["Supervised", "The correct output for each input", "What is y for this x?", "Predict house price from features"],
            ["Unsupervised", "None — inputs only", "What structure is in this data?", "Segment customers into groups"],
            ["Reinforcement", "Delayed scalar reward from an environment", "Which action now maximises future reward?", "Learn chess from win/loss outcomes"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Reinforcement learning is separated for a different reason",
          text:
            "Supervised and unsupervised differ by whether labels exist. Reinforcement learning is " +
            "not \"labels arriving late\" — its feedback is evaluative rather than instructive. A " +
            "supervised label says what you should have output; a reward says only how good the " +
            "outcome was, never what the right action was. And because the learner's own actions " +
            "generate its next data, the data is not even independent of the model.",
        },
      ],
    },

    {
      heading: "Where the boundaries blur",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Semi-supervised",
              description:
                "A small labelled set plus a large unlabelled one. The unlabelled data constrains where the decision boundary can plausibly sit — cheap when labelling is expensive and data is not.",
            },
            {
              term: "Self-supervised",
              description:
                "Labels manufactured from the input itself: hide a word and predict it, hide a patch and reconstruct it. Structurally supervised, practically unsupervised, and the engine behind modern language and vision pretraining.",
            },
            {
              term: "Active learning",
              description:
                "The model chooses which examples to have labelled, spending a fixed annotation budget where it is most uncertain.",
            },
          ],
        },
        {
          kind: "example",
          title: "The same task, three framings",
          problem: "A bank wants to catch fraudulent transactions. Which family applies?",
          steps: [
            "With a history of confirmed-fraud labels: supervised classification.",
            "With no labels at all: unsupervised anomaly detection — flag whatever is unlike the bulk of transactions.",
            "With an agent choosing which transactions to investigate under a budget, learning from what the investigations reveal: reinforcement learning.",
          ],
          answer:
            "All three. The available feedback, not the business problem, decides the family — which is why \"what data do we actually have?\" precedes \"which algorithm?\"",
        },
      ],
    },
  ],

  references: [
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§1.1–1.3, Types of Machine Learning" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§5.1.3, Supervised and Unsupervised Learning" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-01-foundations.md" },
  ],
};

const supervisedVsUnsupervised: WikiArticle = {
  conceptId: "supervised-vs-unsupervised-learning",
  summary:
    "Supervised learning fits a mapping from inputs to known outputs; unsupervised learning looks " +
    "for structure in inputs with no outputs attached. The distinction sounds administrative but " +
    "has a sharp practical consequence: only supervised learning has a ground truth to be evaluated " +
    "against, which is why unsupervised results are so much harder to defend.",

  sections: [
    {
      heading: "The formal difference",
      blocks: [
        {
          kind: "formula",
          latex: "supervised:  D = {(x₁, y₁), …, (xₙ, yₙ)}      unsupervised:  D = {x₁, …, xₙ}",
          caption: "The entire distinction, written out",
        },
        {
          kind: "prose",
          text:
            "With targets yᵢ present, \"good\" has a definition: predictions close to the targets. " +
            "Remove them and the objective must be invented — minimise within-cluster distance, " +
            "maximise retained variance, maximise likelihood under an assumed density. Each of those " +
            "is a modelling choice, and different choices give genuinely different, equally " +
            "defensible answers on the same data.",
        },
      ],
    },

    {
      heading: "Why evaluation is the real asymmetry",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Supervised learning has a scoreboard; unsupervised learning has an argument",
          text:
            "Held-out accuracy settles a supervised comparison in one number. Ask instead whether " +
            "k = 4 clusters beat k = 7 and there is no held-out truth to consult — silhouette " +
            "scores, elbow plots and stability analyses are proxies, and they routinely disagree. " +
            "This is not a gap in the methods; it follows from having removed the only reference " +
            "an objective comparison could use.",
        },
        {
          kind: "list",
          items: [
            "PCA is unsupervised — it maximises retained variance in the inputs and never looks at an outcome.",
            "Linear discriminant analysis looks superficially similar but is supervised: it uses class labels to choose directions that separate classes.",
            "K-means is unsupervised; k-nearest-neighbours is supervised. The shared \"k\" is a coincidence of notation, not a family resemblance.",
            "Autoencoders are unsupervised in that they need no external labels — the target is the input itself.",
          ],
        },
      ],
    },

    {
      heading: "Choosing between them in practice",
      blocks: [
        {
          kind: "prose",
          text:
            "Labels are expensive; raw data usually is not. A team with a warehouse of unlabelled " +
            "records and no annotation budget is well advised to start unsupervised — clustering and " +
            "dimensionality reduction reveal what the natural groupings are, which tells you what " +
            "would be worth labelling before you commit to labelling it. Unsupervised exploration " +
            "is often best understood as reconnaissance for a supervised project.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Clusters are not classes",
          text:
            "A clustering algorithm will happily return k groups from pure noise, and the groups " +
            "will look convincing on a scatter plot. Discovering structure and discovering " +
            "*meaningful* structure are different claims, and only the first is something the " +
            "algorithm can support.",
        },
      ],
    },
  ],

  references: [
    { source: "James et al., An Introduction to Statistical Learning", locator: "§2.1.4 and Ch. 12, Unsupervised Learning" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "Ch. 14, Unsupervised Learning" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-01-foundations.md" },
  ],
};

const classificationVsRegression: WikiArticle = {
  conceptId: "classification-vs-regression",
  summary:
    "Within supervised learning, classification predicts a discrete label and regression predicts a " +
    "continuous number. The choice is not dictated by the data — the same underlying quantity can " +
    "be framed either way — and it determines your loss function, your metrics, and what the model " +
    "output is even allowed to mean.",

  sections: [
    {
      heading: "The distinction is in the output space",
      blocks: [
        {
          kind: "formula",
          latex: "classification:  f: X → {c₁, …, c_K}      regression:  f: X → ℝ",
          caption: "Discrete codomain versus continuous codomain",
        },
        {
          kind: "table",
          headers: ["Target", "Type", "Typical loss", "Typical metric"],
          rows: [
            ["Tomorrow's temperature in °C", "Regression", "Squared error", "RMSE, MAE"],
            ["Whether it rains tomorrow", "Classification", "Cross-entropy", "Accuracy, AUC"],
            ["Customer lifetime spend", "Regression", "Squared or absolute error", "RMSE, MAPE"],
            ["Customer segment label", "Classification", "Cross-entropy", "Macro-F1"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Ordered categories are the awkward case",
          text:
            "A 1–5 star rating is neither cleanly. Treat it as regression and you assume the gap " +
            "from 1★ to 2★ equals the gap from 4★ to 5★; treat it as five unordered classes and you " +
            "throw away the ordering entirely, so predicting 1★ when the truth is 5★ costs the same " +
            "as predicting 4★. Ordinal regression exists precisely to sit between these two.",
        },
      ],
    },

    {
      heading: "Why the framing is a real decision",
      blocks: [
        {
          kind: "prose",
          text:
            "\"Predict blood pressure\" and \"predict whether blood pressure is in the dangerous " +
            "range\" are the same measurement under two framings. Regression is strictly more " +
            "informative — you can always threshold a number afterwards. But the classification " +
            "framing trains the model to be accurate at the boundary that matters, rather than " +
            "spending capacity being accurate at 90 mmHg where nothing turns on the answer.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "More information is not always more decision-relevant",
          text:
            "If the downstream action is binary — treat or don't treat — a squared-error model that " +
            "is off by 3 mmHg everywhere may be worse than a classifier that is nearly perfect near " +
            "the threshold and hopeless elsewhere. Frame the learning problem around the decision, " +
            "not around the richest available representation of the target.",
        },
        {
          kind: "example",
          title: "The framing changes what a model is punished for",
          problem:
            "A model predicts 79 mmHg when the truth is 81, and the clinical threshold is 80. How do the two framings score it?",
          steps: [
            "As regression: squared error (79 − 81)² = 4, a small loss on any realistic scale.",
            "As classification: predicted \"safe\", truth \"dangerous\" — a full misclassification.",
            "Both scores are correct. They answer different questions.",
          ],
          answer:
            "Regression calls this a near-miss; classification calls it a failure. Pick the framing whose notion of failure matches the real cost.",
        },
      ],
    },

    {
      heading: "The methods mostly transfer",
      blocks: [
        {
          kind: "prose",
          text:
            "Nearly every model class in this domain has both a classifier and a regressor: decision " +
            "trees, random forests, gradient boosting, k-NN, SVMs, neural networks, Gaussian " +
            "processes. What changes between the two versions is the output layer and the loss, not " +
            "the underlying idea — which is why it pays to learn the idea once rather than twice.",
        },
      ],
    },
  ],

  references: [
    { source: "James et al., An Introduction to Statistical Learning", locator: "§2.1.5, Regression Versus Classification Problems" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§1.5.4, Inference and Decision" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-01-foundations.md" },
  ],
};

const lossFunctions: WikiArticle = {
  conceptId: "loss-functions",
  summary:
    "A loss function turns \"this prediction was wrong\" into a number the optimiser can act on. It " +
    "is the most consequential and most under-examined choice in a modelling pipeline: the loss is " +
    "the operational definition of what the model is for, and a model will optimise exactly what " +
    "you write down, including the parts you did not mean.",

  sections: [
    {
      heading: "What a loss has to do",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "L(y, ŷ) ≥ 0", description: "Non-negative, and zero exactly when the prediction is right." },
            { term: "Monotone in error", description: "A worse prediction never scores lower than a better one." },
            { term: "Differentiable (usually)", description: "Gradient methods need a slope. Where it fails — the hinge, absolute error — subgradients stand in." },
          ],
        },
        {
          kind: "prose",
          text:
            "Nothing requires a loss to be symmetric, bounded, or interpretable, and useful losses " +
            "routinely are none of those. What is required is that lower means better, in exactly " +
            "the sense you care about.",
        },
      ],
    },

    {
      heading: "The standard menu",
      blocks: [
        {
          kind: "table",
          headers: ["Loss", "Formula", "Used for", "Behaviour"],
          rows: [
            ["Squared error", "(y − ŷ)²", "Regression", "Punishes large errors hard; fits the conditional mean"],
            ["Absolute error", "|y − ŷ|", "Regression", "Robust to outliers; fits the conditional median"],
            ["Huber", "quadratic near 0, linear beyond δ", "Regression", "Squared-error smoothness with absolute-error robustness"],
            ["Cross-entropy", "−Σ yₖ log p̂ₖ", "Classification", "Punishes confident wrong probabilities without bound"],
            ["Hinge", "max(0, 1 − y·f(x))", "Margin classifiers", "Zero once the margin is met; gives SVMs their sparsity"],
          ],
        },
        {
          kind: "example",
          title: "Why squaring changes the model, not just the number",
          problem: "One prediction is off by 2, another by 4. Compare squared and absolute error.",
          steps: [
            "Absolute: losses 2 and 4 — the second is twice as bad.",
            "Squared: losses 4 and 16 — the second is four times as bad.",
            "Doubling the error quadruples the squared loss.",
          ],
          answer:
            "Squared error will trade several small errors for the removal of one large one, so a single outlier can drag the whole fit. Absolute error will not, which is exactly why it fits the median instead of the mean.",
        },
      ],
    },

    {
      heading: "The loss encodes the cost structure",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Which statistic you recover follows from the loss",
          text:
            "Minimising expected squared error returns E[y|x]; minimising expected absolute error " +
            "returns the conditional median; minimising pinball loss at quantile τ returns the τ-th " +
            "conditional quantile. You are not choosing a convenience — you are choosing which " +
            "summary of the conditional distribution the model will report.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A symmetric loss on an asymmetric problem is a modelling error",
          text:
            "If under-stocking costs a lost sale and over-stocking costs a day of warehousing, " +
            "squared error is asserting those are equally bad. They are not, and the model will " +
            "cheerfully deliver the balanced-cost answer to a question nobody asked. Asymmetric or " +
            "quantile losses exist for this, and reaching for one is usually cheaper than " +
            "post-processing the predictions.",
        },
        {
          kind: "prose",
          text:
            "This is also why a loss and an evaluation metric can legitimately differ. You may train " +
            "on cross-entropy because it is smooth and well-behaved under gradient descent, and " +
            "report F1 because that is what the business cares about. The gap is a known and managed " +
            "compromise, not an oversight — but it should be a deliberate one.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§2.4 and §10.6, Loss Functions and Robustness" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§1.5.5, Loss Functions for Regression" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "Ch. 5, Decision Theory" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-01-foundations.md" },
  ],
};

const curseOfDimensionality: WikiArticle = {
  conceptId: "curse-of-dimensionality",
  summary:
    "In high dimensions, intuitions built in two and three dimensions stop being approximately " +
    "wrong and start being categorically wrong. Data becomes sparse, all pairwise distances " +
    "converge to each other, and volume concentrates in places you would never guess. Any method " +
    "that leans on \"nearby points are similar\" degrades as the number of features grows.",

  sections: [
    {
      heading: "Sparsity: the exponential you cannot outrun",
      blocks: [
        {
          kind: "prose",
          text:
            "Split each axis into 10 bins. In one dimension that is 10 cells and 100 points fill them " +
            "comfortably. In ten dimensions it is 10¹⁰ cells — ten billion — and the same 100 points " +
            "leave essentially every cell empty. Sample size needed for a fixed density grows " +
            "exponentially in the dimension, and no realistic data collection keeps up.",
        },
        {
          kind: "formula",
          latex: "n required ∝ bᵈ   (b bins per axis, d dimensions)",
          caption: "Why \"just collect more data\" stops being an answer",
        },
        {
          kind: "example",
          title: "How far you must reach to find neighbours",
          problem:
            "To capture a fraction r of the data in a d-dimensional unit cube, a neighbourhood must span what fraction of each axis?",
          steps: [
            "A hypercube of side s has volume sᵈ, so s = r^(1/d).",
            "d = 1, r = 0.1: s = 0.1 — a genuinely local neighbourhood.",
            "d = 10, r = 0.1: s = 0.1^0.1 ≈ 0.79.",
            "d = 100, r = 0.1: s ≈ 0.977.",
          ],
          answer:
            "In 100 dimensions, capturing a tenth of the data means covering 98% of every axis. \"Local\" methods have stopped being local, which is precisely why k-NN falls apart in high dimensions.",
        },
      ],
    },

    {
      heading: "Distance concentration",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "The nearest and farthest points stop being distinguishable",
          text:
            "For many distributions, the ratio (max distance − min distance) / min distance tends to " +
            "0 as d grows: every point is roughly equidistant from every other. Since k-NN, k-means, " +
            "RBF kernels and DBSCAN all rank points by distance, and the ranking is being computed " +
            "over values that barely differ, the ranking becomes noise-dominated.",
        },
        {
          kind: "list",
          items: [
            "The volume of a unit hypersphere → 0 as d → ∞, while its bounding cube keeps volume 1 — almost all of a cube's volume is in its corners.",
            "Almost all the volume of a high-dimensional ball sits in a thin shell just inside its surface, so \"typical\" points are near the boundary, not the middle.",
            "Two independent random directions in high dimensions are nearly orthogonal with overwhelming probability.",
          ],
        },
      ],
    },

    {
      heading: "Why anything works at all",
      blocks: [
        {
          kind: "prose",
          text:
            "Real data of nominal dimension d rarely fills that space. Images with a million pixels " +
            "live on a far lower-dimensional manifold, because the pixel patterns that constitute a " +
            "photograph are a vanishing subset of all possible pixel arrays. The manifold hypothesis " +
            "says the effective dimension — the one that governs the curse — is much smaller than " +
            "the ambient one.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Reduce dimension", description: "PCA, autoencoders, feature selection: work in the effective dimension instead of the ambient one." },
            { term: "Impose structure", description: "Linear models, convolutions, and additive models restrict the hypothesis class so exponentially less data is needed." },
            { term: "Regularise", description: "Penalties and priors substitute assumptions for data where data is unavailable." },
            { term: "Use non-local methods", description: "Trees and linear models split or extrapolate globally rather than averaging over neighbours." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Adding a feature is not free",
          text:
            "A weakly informative extra feature adds noise to every distance computation while " +
            "contributing almost no signal, so it can lower accuracy even though it \"contains " +
            "information\". This is the honest argument for feature selection, and it is why blindly " +
            "widening a dataset often makes a k-NN or kernel model worse.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§2.5, Local Methods in High Dimensions" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§1.4, The Curse of Dimensionality" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-01-foundations.md" },
  ],
};

const trainingValidationTest: WikiArticle = {
  conceptId: "training-validation-test-set",
  summary:
    "Three splits, three jobs: the training set fits parameters, the validation set chooses between " +
    "models, and the test set estimates how the chosen model will perform on data it has never " +
    "influenced. The reason there are three rather than two is that choosing on a set consumes it " +
    "as an unbiased estimator, exactly as fitting does.",

  sections: [
    {
      heading: "The division of labour",
      blocks: [
        {
          kind: "table",
          headers: ["Split", "What it decides", "How often it is touched", "Typical share"],
          rows: [
            ["Training", "Model parameters (weights, splits, coefficients)", "Every epoch", "60–80%"],
            ["Validation", "Hyperparameters, architecture, early stopping, model choice", "Many times", "10–20%"],
            ["Test", "Nothing — it only reports", "Once, at the very end", "10–20%"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Any set you optimise against becomes optimistic about itself",
          text:
            "Training error is optimistic because the parameters were chosen to minimise it. " +
            "Validation error becomes optimistic for the same reason once you have compared fifty " +
            "configurations on it — you have selected the configuration that got luckiest on that " +
            "particular sample. The test set is unbiased only because no decision was ever made " +
            "using it.",
        },
      ],
    },

    {
      heading: "Why a two-way split is not enough",
      blocks: [
        {
          kind: "prose",
          text:
            "Suppose you try 200 hyperparameter settings and report the best validation score as your " +
            "estimate of performance. Even if all 200 models were identical in true quality, the " +
            "maximum of 200 noisy estimates is systematically above their common mean. The reported " +
            "number is the winner's-curse value, not the model's quality. A held-out test set breaks " +
            "the loop because the selection never saw it.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Looking at the test set once is one look too many if you then change something",
          text:
            "The moment a disappointing test score sends you back to try a different model, the test " +
            "set has entered the selection loop and its next reading is no longer unbiased. In " +
            "practice this leakage is gradual and invisible, which is why competition leaderboards " +
            "keep a truly private split.",
        },
      ],
    },

    {
      heading: "Splitting correctly",
      blocks: [
        {
          kind: "list",
          items: [
            "Random splits assume exchangeable rows. For time series, split by time — training on the future to predict the past measures nothing you can deploy.",
            "Group data (multiple rows per patient, per user, per session) must be split by group, or near-duplicates straddle the boundary and inflate the score.",
            "Stratify on the label when classes are imbalanced, so a rare class is not absent from validation entirely.",
            "Fix and record the random seed. An unreproducible split makes every subsequent comparison unfalsifiable.",
            "With little data, replace the validation set with k-fold cross-validation and keep a single held-out test set.",
          ],
        },
        {
          kind: "prose",
          text:
            "Preprocessing belongs inside the split, not before it. Scalers, imputers and encoders " +
            "must be fitted on training data alone and then applied to validation and test — fitting " +
            "them on everything is the most common form of data leakage there is.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§7.2, The Bias–Variance Decomposition and §7.10, Cross-Validation" },
    { source: "James et al., An Introduction to Statistical Learning", locator: "§5.1, Cross-Validation" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-01-foundations.md" },
  ],
};

const dataLeakage: WikiArticle = {
  conceptId: "data-leakage",
  summary:
    "Data leakage is any path by which information unavailable at prediction time reaches the model " +
    "during training. Its signature is a validation score that is too good and a production system " +
    "that is not. It is the single most common reason a model that looked excellent in a notebook " +
    "fails on deployment.",

  sections: [
    {
      heading: "The two families",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Target leakage",
              description:
                "A feature encodes the answer, usually because it is recorded after the outcome. \"Number of chemotherapy sessions\" predicts cancer diagnosis with near-perfect accuracy and is worthless prospectively.",
            },
            {
              term: "Train–test contamination",
              description:
                "Information crosses the split boundary. Scaling on the full dataset, imputing with the global mean, oversampling before splitting, or tuning on the test set all put test information into training.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Leakage is defined by availability at prediction time, not by causality",
          text:
            "The test is procedural, not statistical: at the moment the model must predict, does " +
            "this value exist? A feature can be perfectly legitimate causally and still be leakage " +
            "if it is only populated after the event you are predicting.",
        },
      ],
    },

    {
      heading: "How it announces itself",
      blocks: [
        {
          kind: "list",
          items: [
            "Cross-validated accuracy far above what domain experts think is achievable.",
            "A single feature with implausibly high importance that nobody can explain mechanistically.",
            "Validation error below training error, a pattern that is otherwise rare.",
            "A large, unexplained gap between offline evaluation and the first week of live performance.",
          ],
        },
        {
          kind: "example",
          title: "Scaling before splitting",
          problem: "A pipeline standardises all features on the full dataset, then splits 80/20. What leaked?",
          steps: [
            "The mean and standard deviation used to scale were computed over training and test rows together.",
            "Every training row was therefore transformed using summary statistics that depend on test rows.",
            "The model's inputs carry a trace of the test distribution — small, but enough to bias the estimate optimistically.",
          ],
          answer:
            "Fit the scaler on the training split only and apply it to the others. In scikit-learn this is what a Pipeline inside cross-validation exists to guarantee.",
        },
      ],
    },

    {
      heading: "Prevention",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Split first, before any statistic is computed from the data.",
            "Put every fitted transform inside a pipeline so cross-validation refits it per fold.",
            "For each feature, ask when its value is written relative to the target. Anything written after is suspect.",
            "Split by time for temporal data and by group for repeated measures on the same entity.",
            "Treat a suspiciously good score as a bug report, not a result. Investigate before celebrating.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Duplicate rows are quiet leakage",
          text:
            "Near-duplicate records — the same customer under two ids, the same article syndicated to " +
            "two sites — split across train and test give the model a memorised answer rather than a " +
            "generalised one. Deduplication is part of splitting, not part of cleaning.",
        },
      ],
    },
  ],

  references: [
    { source: "Kaufman, Rosset & Perlich, Leakage in Data Mining", locator: "ACM TKDD 6(4), 2012" },
    { source: "James et al., An Introduction to Statistical Learning", locator: "§5.1.4, The Wrong and Right Way to Do Cross-Validation" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-01-foundations.md" },
  ],
};

export const ml01Foundations: WikiArticle[] = [
  mlIntroduction,
  typesOfMachineLearning,
  supervisedVsUnsupervised,
  classificationVsRegression,
  lossFunctions,
  curseOfDimensionality,
  trainingValidationTest,
  dataLeakage,
];
