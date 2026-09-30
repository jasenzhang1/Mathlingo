import type { Domain } from "./concepts";

/**
 * Subsections inside each domain — the chapter layer between "Probability" and
 * "Random Variables".
 *
 * These are not a new taxonomy. They are the clusters the assessment banks in
 * `/assessments` are already written against (`assessments/README.md`), which
 * were themselves cut along the chapters of the books in `/textbooks.md`:
 * Blitzstein & Hwang and Casella & Berger for probability, Strang and Axler for
 * linear algebra, Wasserman for inference, ESL and PRML for machine learning.
 * Keeping one grouping means a section header in the list view names the same
 * thing an item bank does, rather than a parallel invention that drifts.
 *
 * Sections run in teaching order within a domain. Ordering *inside* a section
 * is still the graph's call — see `lib/learningOrder.ts`.
 *
 * Every concept should appear in exactly one section; `learningOrder.ts` sweeps
 * up anything missed into a trailing "Further Topics" section rather than
 * dropping it, so a newly added concept shows up in the list before anyone
 * remembers to file it here.
 */

export interface SectionSpec {
  id: string;
  label: string;
  conceptIds: string[];
}

export const sectionSpecs: Record<Domain, SectionSpec[]> = {
  "discrete-math": [
    {
      id: "logic-and-proof",
      label: "Logic & Proof Techniques",
      conceptIds: [
        "propositional-logic",
        "logical-equivalences",
        "direct-proof",
        "proof-by-contradiction",
        "mathematical-induction",
        "strong-induction",
        "recursion",
        "fibonacci-numbers",
      ],
    },
    {
      id: "sets-and-functions",
      label: "Sets & Functions",
      conceptIds: [
        "set-theory",
        "power-set",
        "cartesian-product",
        "proof-by-sets",
        "functions-relations",
        "equivalence-relations",
        "injections-surjections-bijections",
        "cardinality",
      ],
    },
    {
      id: "combinatorics",
      label: "Combinatorics",
      conceptIds: [
        "counting-methods",
        "pigeonhole-principle",
        "factorials",
        "permutations",
        "combinations",
        "stars-and-bars",
        "integer-partitions",
        "binomial-theorem",
      ],
    },
    {
      id: "graph-theory",
      label: "Graph Theory",
      conceptIds: [
        "graph-basics",
        "graph-paths-connectivity",
        "trees",
        "eulerian-hamiltonian-paths",
        "graph-coloring",
      ],
    },
    {
      id: "number-theory",
      label: "Number Theory",
      conceptIds: [
        "modular-arithmetic",
        "gcd-euclidean-algorithm",
        "modular-inverses",
        "fermat-euler-theorems",
        "chinese-remainder-theorem",
      ],
    },
  ],

  probability: [
    {
      id: "foundations",
      label: "Foundations of Probability",
      conceptIds: [
        "pie-boole",
        "sigma-algebra",
        "axioms-of-probability",
        "probability-function",
        "conditional-probability",
        "bayes-rule",
        "independence-set-theory",
        "mutual-independence",
      ],
    },
    {
      id: "random-variables",
      label: "Random Variables & Density Machinery",
      conceptIds: [
        "random-variables",
        "discrete-vs-continuous-random-variables",
        "cdf",
        "pmf",
        "pdf",
        "expectation",
        "variance",
      ],
    },
    {
      id: "discrete-distributions",
      label: "Discrete Distributions",
      conceptIds: [
        "bernoulli-binomial",
        "poisson-distribution",
        "hypergeometric-distribution",
        "geometric-distribution",
        "negative-binomial-distribution",
      ],
    },
    {
      id: "continuous-distributions",
      label: "Continuous Distributions",
      conceptIds: [
        "normal-distribution",
        "uniform-distribution",
        "exponential-distribution",
        "gamma-distribution",
        "beta-distribution",
        "chi-square-distribution",
        "t-distribution",
        "f-distribution",
      ],
    },
    {
      id: "joint-structure",
      label: "Joint & Conditional Structure",
      conceptIds: [
        "joint-distribution",
        "marginal-distribution",
        "conditional-distribution",
        "covariance",
        "law-of-total-expectation",
      ],
    },
    {
      id: "mgf-likelihood",
      label: "MGF, Likelihood & Estimation",
      conceptIds: [
        "mgf",
        "mgf-properties",
        "likelihood-vs-probability",
        "method-of-moments",
        "mle",
        "unbiased-estimator",
        "distribution-transformations",
        "exponential-family",
      ],
    },
    {
      id: "inequalities-convergence",
      label: "Inequalities & Convergence",
      conceptIds: [
        "markov-inequality",
        "chebyshev-inequality",
        "jensen-inequality",
        "modes-of-convergence",
        "law-of-large-numbers",
        "order-statistics",
      ],
    },
    {
      id: "estimation-theory",
      label: "Estimation Theory",
      // `power` is filed in the probability domain in concepts.ts though the
      // assessment bank teaches it with the testing machinery; it sits here,
      // next to Fisher information and the CRLB, rather than in another domain.
      conceptIds: [
        "sufficient-statistic",
        "correlation",
        "law-of-total-variance",
        "fisher-information",
        "cramer-rao-lower-bound",
        "power",
      ],
    },
  ],

  "linear-algebra": [
    {
      id: "vectors",
      label: "Vectors & Basic Operations",
      conceptIds: [
        "vectors",
        "vector-operations",
        "dot-product",
        "vector-norm",
        "cauchy-schwarz",
        "vector-angles",
        "vector-projection",
        "orthogonal-vectors",
      ],
    },
    {
      id: "matrices",
      label: "Matrices & Structure",
      conceptIds: [
        "matrix-multiplication",
        "matrices",
        "trace",
        "linear-transformations",
        "matrix-calculus",
        "kronecker-product",
        "matrix-norms",
      ],
    },
    {
      id: "vector-spaces",
      label: "Vector Spaces & Bases",
      conceptIds: [
        "linear-dependence",
        "vector-spaces",
        "span",
        "basis",
        "change-of-basis",
        "subspace-operations",
      ],
    },
    {
      id: "four-subspaces",
      label: "The Four Fundamental Subspaces",
      conceptIds: [
        "four-fundamental-subspaces",
        "column-space",
        "null-space",
        "row-space",
        "left-null-space",
        "matmul-four-fundamental-subspaces",
        "disjointness-four-fundamental-subspaces",
      ],
    },
    {
      id: "rank-orthogonalization",
      label: "Rank & Orthogonalization",
      conceptIds: [
        "rank",
        "rank-nullity-theorem",
        "orthonormal-basis",
        "gram-schmidt",
        "qr-decomposition",
        "invertible-matrices",
      ],
    },
    {
      id: "determinants-eigen",
      label: "Determinants & Eigenstuff",
      conceptIds: [
        "determinant",
        "determinant-properties",
        "eigenvalues-eigenvectors",
        "diagonalization",
        "eigendecomposition",
        "lu-decomposition",
        "symmetric-matrices",
      ],
    },
    {
      id: "spectral-theory",
      label: "Spectral Theory & Special Matrices",
      conceptIds: [
        "spectral-theorem",
        "orthogonal-matrices",
        "positive-definite-matrices",
        "cholesky-decomposition",
        "idempotent-matrices",
        "schur-complement",
        "rayleigh-quotient",
        "matrix-stability",
      ],
    },
    {
      id: "svd",
      label: "SVD & Applications",
      conceptIds: [
        "svd",
        "uniqueness-of-svd",
        "svd-four-fundamental-subspaces",
        "moore-penrose-inverse",
        "eckart-young",
        "pca-matrix-edition",
      ],
    },
  ],

  "multivariate-probability": [
    {
      id: "multivariate-distributions",
      label: "Multivariate Distributions",
      conceptIds: [
        "change-of-variables-jacobian",
        "covariance-matrix",
        "bivariate-normal",
        "multivariate-normal",
        "multivariate-mgf",
        "pearson-correlation",
      ],
    },
    {
      /**
       * The section the domain was missing. Everything above describes a random
       * vector; nothing described a *scalar built out of one*, which is what
       * every sum of squares in statistics actually is. Quadratic forms supply
       * the machinery, Cochran's theorem says when the pieces are independent,
       * and beta-hat is where both get spent — the standard errors, t-statistics
       * and F-tests a regression prints are this section's arithmetic.
       */
      id: "quadratic-forms",
      label: "Quadratic Forms & the Regression Payoff",
      conceptIds: [
        "quadratic-forms-random-vectors",
        "cochrans-theorem",
        "distribution-of-beta-hat",
      ],
    },
    {
      /**
       * Both halves of the section above feed this one concept: the MGF's
       * independence-from-zero-covariance theorem and quadratic forms' Var(aᵀX)
       * machinery are exactly what deriving X₁ | X₂ = x₂ needs. It is placed
       * after `quadratic-forms` rather than immediately following
       * `multivariate-distributions` so that both prerequisites are already
       * behind a learner who reaches it.
       */
      id: "conditional-normals",
      label: "Conditioning a Multivariate Normal",
      conceptIds: ["conditional-multivariate-normal", "precision-matrix"],
    },
    {
      id: "asymptotics",
      label: "Asymptotics",
      conceptIds: ["central-limit-theorem"],
    },
  ],

  /**
   * Placed after multivariate probability because mutual information needs
   * joint and conditional distributions, and before statistics and ML because
   * cross-entropy loss, the ELBO and every KL-regularised objective downstream
   * are built from what this chapter defines. KL divergence lives here now; it
   * used to close the multivariate chapter.
   */
  "information-theory": [
    {
      id: "entropy",
      label: "Entropy",
      conceptIds: ["self-information", "shannon-entropy", "joint-and-conditional-entropy"],
    },
    {
      id: "divergence-and-mutual-information",
      label: "Divergence & Mutual Information",
      conceptIds: [
        "kl-divergence",
        "cross-entropy",
        "mutual-information",
        "data-processing-inequality",
      ],
    },
    {
      id: "continuous-and-coding",
      label: "Continuous Entropy & Coding",
      conceptIds: ["differential-entropy", "maximum-entropy", "source-coding"],
    },
  ],

  statistics: [
    {
      id: "foundations",
      label: "Statistics Foundations",
      conceptIds: [
        "population-vs-sample",
        "parameter-vs-statistic",
        "data-types",
        "sampling-methods",
        "sample-mean",
        "sample-variance",
      ],
    },
    {
      id: "testing-machinery",
      label: "Hypothesis Testing Machinery",
      conceptIds: [
        "sampling-distribution",
        "standard-error",
        "test-statistic",
        "rejection-region",
        "hypothesis-test",
        "type-i-ii-error",
        "p-value",
        "confidence-interval",
      ],
    },
    {
      // Needs `power` and `sufficient-statistic`, both filed in probability's
      // estimation-theory section, which comes earlier — so no forward edges.
      id: "optimal-tests",
      label: "Most Powerful Tests",
      conceptIds: ["neyman-pearson-lemma", "uniformly-most-powerful-test"],
    },
    {
      id: "named-tests",
      label: "Named Tests & Resampling",
      conceptIds: [
        "one-sample-z-test",
        "one-sample-t-test",
        "one-sample-proportions-z-test",
        "two-sample-z-test",
        "two-sample-t-test",
        "paired-t-test",
        "chi-square-test-of-independence",
        "chi-square-goodness-of-fit-test",
        "fischers-exact-test",
        "wilcoxon-rank-sum-test",
        "bootstrapping",
      ],
    },
    {
      id: "beyond-one-comparison",
      label: "Beyond a Single Comparison",
      conceptIds: [
        "two-sample-proportions-z-test",
        "effect-size",
        "multiple-testing",
        "family-wise-error-rate",
        "false-discovery-rate",
        "equivalence-testing",
        "sequential-testing",
        "prediction-interval",
      ],
    },
    {
      id: "distribution-free",
      label: "Distribution-Free Methods",
      conceptIds: [
        "permutation-test",
        "wilcoxon-signed-rank-test",
        "kruskal-wallis-test",
        "mcnemar-test",
        "kolmogorov-smirnov-test",
        "qq-plots",
      ],
    },
  ],

  /**
   * "Linear Models" — the domain id stays `regression` so saved progress and
   * links survive the rename. Sections follow the chapters of Seber & Lee,
   * *Linear Regression Analysis* (2nd ed.), the unit's textbook; each concept
   * sits in the chapter that develops it, including the ones that predate the
   * book being adopted. The book's Ch. 1–2 (random vectors, quadratic forms,
   * the multivariate normal) are taught in `multivariate-probability` and
   * reached through prerequisites rather than repeated here. The last section
   * holds the models this unit teaches that the book does not — GLMs, mixed
   * models, survival — which build on everything above it.
   *
   * Three placements depart from the book so that no section opens on a
   * concept whose prerequisites come later: `anova` (the book's Ch. 8 opener)
   * sits in Ch. 4 because the lack-of-fit test needs it; `vif` sits with the
   * other Ch. 3 partitioning results because polynomial regression needs it;
   * and robust regression (the book's §3.13) follows Ch. 10, because
   * M-estimation only makes sense once outliers and leverage have been met.
   */
  regression: [
    {
      id: "foundations",
      label: "Ch. 3 · Least Squares Estimation",
      conceptIds: [
        "regression",
        "regress-to-the-mean",
        "linear-regression-terminology",
        "simple-linear-regression",
        "ordinary-least-squares",
        "normal-equations",
        "geometric-interpretation-of-ols",
        "hat-matrix",
        "multiple-linear-regression",
        "linear-regression-probabilistic-version",
        "ols-assumptions",
        "ols-properties",
      ],
    },
    {
      id: "estimation-extensions",
      label: "Ch. 3 · Partitioning, Restrictions & Generalized Least Squares",
      conceptIds: [
        "ssr-sse-sst",
        "r-squared",
        "effect-of-adding-another-variable",
        "vif",
        "partitioned-regression",
        "restricted-least-squares",
        "less-than-full-rank-models",
        "estimable-functions",
        "homoskedasticity",
        "weighted-least-squares",
        "generalized-least-squares",
        "centering-and-scaling",
      ],
    },
    {
      id: "hypothesis-testing",
      label: "Ch. 4 · Hypothesis Testing",
      conceptIds: [
        "anova",
        "general-linear-hypothesis",
        "noncentral-chi-square-and-f",
        "lack-of-fit-test",
      ],
    },
    {
      id: "simultaneous-inference",
      label: "Ch. 5 · Confidence Intervals & Regions",
      conceptIds: [
        "simultaneous-confidence-intervals",
        "confidence-regions-for-beta",
        "confidence-bands-regression-surface",
      ],
    },
    {
      id: "straight-line",
      label: "Ch. 6 · Straight-Line Regression",
      conceptIds: [
        "inverse-prediction-calibration",
        "regression-through-the-origin",
        "dummy-variables-comparing-lines",
        "two-phase-regression",
        "loess-smoothing",
      ],
    },
    {
      id: "polynomial",
      label: "Ch. 7 · Polynomial Regression & Splines",
      conceptIds: [
        "polynomial-regression",
        "orthogonal-polynomials",
        "regression-splines",
        "smoothing-splines",
        "response-surface-methodology",
      ],
    },
    {
      id: "analysis-of-variance",
      label: "Ch. 8 · Analysis of Variance",
      conceptIds: [
        "one-way-anova-model",
        "multiple-comparisons-tukey",
        "two-way-anova-balanced",
        "two-way-anova-unbalanced",
        "tukey-nonadditivity-test",
        "higher-way-anova",
        "randomized-block-designs",
        "analysis-of-covariance",
      ],
    },
    {
      id: "departures",
      label: "Ch. 9 · Departures from Assumptions",
      conceptIds: [
        "misspecification-bias",
        "sandwich-estimator",
        "robustness-of-f-test",
        "errors-in-variables",
        "collinearity-eigenanalysis",
      ],
    },
    {
      id: "diagnostics",
      label: "Ch. 10 · Diagnosis & Remedies",
      conceptIds: [
        "studentized-residuals",
        "outliers-leverage-influence",
        "case-deletion-diagnostics",
        "partial-residual-plots",
        "heteroskedasticity-tests",
        "durbin-watson-test",
        "normal-probability-plots",
        "box-cox-transformation",
        "principal-components-regression",
      ],
    },
    {
      id: "robust-regression",
      label: "Ch. 3.13 · Robust Regression",
      conceptIds: [
        "m-estimators-regression",
        "breakdown-point-and-influence-function",
        "high-breakdown-regression",
        "quantile-regression",
      ],
    },
    {
      id: "computation",
      label: "Ch. 11 · Computing the Fit",
      conceptIds: [
        "least-squares-via-cholesky",
        "least-squares-via-qr",
        "least-squares-via-svd",
        "updating-and-sweep-operator",
        "numerical-accuracy-least-squares",
      ],
    },
    {
      id: "selection-regularization",
      label: "Ch. 12 · Prediction & Model Selection",
      conceptIds: [
        "aic-bic",
        "subset-selection-criteria",
        "forward-backward-stepwise-selection",
        "all-subsets-regression",
        "regularization",
        "ridge-regression",
        "lasso",
        "elastic-net",
        "stein-shrinkage",
        "post-selection-inference",
      ],
    },
    {
      id: "generalized",
      label: "Beyond the Linear Model",
      conceptIds: [
        "odds-and-log-odds",
        "logistic-regression",
        "odds-ratio",
        "probit-regression",
        "glm",
        "poisson-regression",
        "deviance-residuals",
        "generalized-estimating-equations",
        "mixed-effect-models",
        "cox-proportional-hazards-model",
      ],
    },
  ],

  "time-series": [
    {
      id: "stochastic-processes",
      label: "Stochastic Processes & Markov Chains",
      conceptIds: ["stochastic-processes"],
    },
    {
      id: "stationarity-autocorrelation",
      label: "Stationarity & Autocorrelation",
      conceptIds: ["stationarity-white-noise", "acf", "pacf"],
    },
    {
      id: "linear-time-series-models",
      label: "Linear Time Series Models",
      conceptIds: ["ar-models", "ma-models", "wold-decomposition", "arma", "arima"],
    },
    {
      id: "volatility-multivariate",
      label: "Volatility & Multivariate Time Series",
      conceptIds: ["garch", "cointegration"],
    },
  ],

  "machine-learning": [
    {
      id: "foundations",
      label: "Foundations",
      conceptIds: [
        "ml-introduction",
        "types-of-machine-learning",
        "supervised-vs-unsupervised-learning",
        "classification-vs-regression",
        "curse-of-dimensionality",
        "training-validation-test-set",
        "data-leakage",
      ],
    },
    {
      id: "losses",
      label: "Loss Functions",
      conceptIds: [
        "loss-functions",
        "regression-losses",
        "cross-entropy-loss",
        "hinge-loss",
      ],
    },
    {
      id: "bias-variance",
      label: "Bias, Variance & Overfitting",
      conceptIds: [
        "bias-variance-tradeoff",
        "overfitting-underfitting",
        "learning-curves",
      ],
    },
    {
      id: "gradient-descent",
      label: "Gradient-Based Optimisation",
      conceptIds: [
        "gradient-descent",
        "stochastic-gradient-descent",
        "mini-batch-sgd",
        "sgd-step-sizes",
        "momentum",
      ],
    },
    {
      id: "validation",
      label: "Validation & Tuning",
      conceptIds: [
        "k-fold-cross-validation",
        "nested-cross-validation",
        "hyperparameters",
        "hyperparameter-search",
        "sensitivity-analysis",
      ],
    },
    {
      id: "classification-metrics",
      label: "Classification Metrics",
      conceptIds: [
        "multiclass-classification",
        "argmax-vs-softmax",
        "confusion-matrices",
        "sensitivity-and-specificity",
        "predictive-values",
        "precision-recall-f1",
      ],
    },
    {
      id: "threshold-free-metrics",
      label: "Curves & Calibration",
      conceptIds: [
        "roc-curves",
        "precision-recall-curves",
        "probability-calibration",
      ],
    },
    {
      id: "similarity",
      label: "Distance & Similarity",
      conceptIds: [
        "distance-metrics",
        "cosine-similarity",
        "knn",
      ],
    },
    {
      id: "classic-classifiers",
      label: "Generative & Discriminative Classifiers",
      conceptIds: [
        "generative-vs-discriminative-models",
        "naive-bayes",
        "lda",
        "qda",
      ],
    },
    {
      id: "svms-kernels",
      label: "SVMs & Kernels",
      conceptIds: [
        "svm",
        "svms-for-regression",
        "kernel",
        "mercers-theorem",
        "rbf",
      ],
    },
    {
      id: "trees",
      label: "Decision Trees",
      conceptIds: [
        "decision-tree",
        "splitting-criteria",
        "pruning-trees",
      ],
    },
    {
      id: "ensembles",
      label: "Ensembles",
      conceptIds: [
        "ensemble-methods",
        "bagging",
        "random-forests",
        "adaboost",
        "gradient-boosting",
        "xgboost",
        "stacking",
      ],
    },
    {
      id: "clustering",
      label: "Clustering",
      conceptIds: [
        "clustering-methods",
        "k-means-clustering",
        "hierarchical-clustering",
        "density-based-clustering",
        "svd-for-clustering",
      ],
    },
    {
      id: "dim-reduction",
      label: "Dimensionality Reduction",
      conceptIds: [
        "pca",
        "probabilistic-pca",
        "kernel-pca",
        "ica",
        "multidimensional-scaling",
        "t-sne",
        "umap",
      ],
    },
    {
      id: "data-issues",
      label: "Features & Data Problems",
      conceptIds: [
        "feature-scaling",
        "feature-selection",
        "class-imbalance",
        "distribution-shift",
      ],
    },
    {
      id: "anomalies",
      label: "Anomaly Detection",
      conceptIds: [
        "anomaly-detection",
        "isolation-forest",
      ],
    },
    {
      id: "interpretability",
      label: "Interpretability",
      conceptIds: [
        "model-interpretability",
        "permutation-importance",
        "partial-dependence",
        "shapley-values",
      ],
    },
    {
      id: "reinforcement-learning",
      label: "Reinforcement Learning",
      conceptIds: [
        "reinforcement-learning",
        "multi-armed-bandits",
        "markov-decision-processes",
        "bellman-equations",
        "q-learning",
        "policy-gradients",
      ],
    },
  ],

  "deep-learning": [
    {
      id: "neural-networks",
      label: "Neural Networks",
      conceptIds: ["perceptron", "neural-networks", "backpropagation"],
    },
    {
      id: "core-concepts",
      label: "Core Concepts",
      conceptIds: [
        "activation-functions",
        "sgd-and-adaptive-optimizers",
        "dropout",
        "batch-normalization",
        "embeddings",
        "autoencoders",
      ],
    },
    {
      id: "convolutional-networks",
      label: "Convolutional Neural Networks",
      conceptIds: [
        "convolutional-neural-networks",
        "cnn-stride-and-padding",
        "cnn-pooling",
        "cnn-design-choices",
      ],
    },
    {
      /**
       * Attention and transformers ride along with the recurrent models rather
       * than sitting in Core Concepts: attention is taught as the fix for the
       * RNN's fixed-size bottleneck, and `autoregressive-models` (next-token
       * decoding, KV caches) rests on transformers — so the chain RNN → LSTM →
       * attention → transformer → autoregressive decoding has to live in one
       * chapter for no prerequisite to point forward across sections.
       */
      id: "autoregressive-models",
      label: "Autoregressive Models",
      conceptIds: [
        "recurrent-neural-networks",
        "lstm-and-gru",
        "attention-mechanism",
        "transformers",
        "autoregressive-models",
      ],
    },
    {
      id: "architectures",
      label: "Neural Network Architectures",
      conceptIds: [
        "architecture-families",
        "residual-networks",
        "variational-inference-vaes",
        "generative-adversarial-networks",
        "mixture-of-experts",
      ],
    },
    {
      id: "state-space-models",
      label: "State Space Models",
      conceptIds: ["state-space-models", "structured-state-spaces-s4", "mamba-selective-ssm"],
    },
    {
      id: "graph-neural-networks",
      label: "Graph Neural Networks",
      conceptIds: ["graph-neural-networks", "message-passing-neural-networks", "gnn-pitfalls"],
    },
    {
      id: "diffusion-models",
      label: "Diffusion & Score-Based Models",
      conceptIds: [
        "normalizing-flows",
        "score-matching",
        "denoising-score-matching",
        "diffusion-models",
      ],
    },
    {
      id: "training-at-scale",
      label: "Training Deep Networks at Scale",
      conceptIds: [
        "weight-initialization",
        "layer-normalization",
        "learning-rate-schedules",
        "data-augmentation",
        "mixed-precision-training",
        "distributed-training",
      ],
    },
    {
      id: "adapting-and-serving",
      label: "Scaling, Adapting & Serving",
      conceptIds: [
        "transfer-learning",
        "self-supervised-learning",
        "scaling-laws",
        "tokenization",
        "contrastive-learning",
        "parameter-efficient-fine-tuning",
        "instruction-tuning-and-rlhf",
        "knowledge-distillation",
        "quantization",
      ],
    },
  ],

  "bayesian-statistics": [
    {
      id: "bayesian-foundations",
      label: "Prior, Likelihood & Posterior",
      conceptIds: [
        "bayesian-inference",
        "prior-selection",
        "conjugate-priors",
      ],
    },
    {
      id: "conjugate-models",
      label: "Conjugate Models",
      conceptIds: [
        "beta-binomial-model",
        "gamma-poisson-model",
        "normal-normal-model",
      ],
    },
    {
      id: "posterior-summaries-prediction",
      label: "Posterior Summaries & Prediction",
      conceptIds: [
        "credible-intervals",
        "posterior-predictive-distribution",
        "posterior-predictive-checks",
        "bayesian-ab-testing",
      ],
    },
    {
      id: "bayesian-models",
      label: "Bayesian Models & Model Comparison",
      conceptIds: [
        "hierarchical-bayesian-models",
        "empirical-bayes",
        "bayesian-linear-regression",
        "bayes-factors",
        "bayesian-model-averaging",
      ],
    },
    {
      id: "approximate-inference",
      label: "Approximating the Posterior",
      conceptIds: [
        "laplace-approximation",
        "variational-inference-elbo",
      ],
    },
    {
      id: "bayesian-computation",
      label: "Markov Chain Monte Carlo",
      conceptIds: [
        "markov-chain-monte-carlo",
        "gibbs-sampling",
        "hamiltonian-monte-carlo",
        "mcmc-diagnostics",
        "reversible-jump-mcmc",
      ],
    },
    {
      id: "bayesian-nonparametrics",
      label: "Gaussian Processes & Nonparametrics",
      conceptIds: [
        "gaussian-process",
        "gp-regression",
        "gp-classification",
        "bayesian-optimization",
        "dirichlet-process",
        "stick-breaking-construction",
      ],
    },
  ],

  "graphical-models": [
    {
      id: "graphs-markov",
      label: "Graphs & Markov Structure",
      conceptIds: [
        "graphs",
        "directed-vs-undirected-graphs",
        "conditional-independence-d-separation",
        "markov-random-fields",
        "markov-chains",
        "hmm",
      ],
    },
    {
      id: "causal-inference",
      label: "Causal Inference with DAGs",
      conceptIds: ["causal-dags", "backdoor-adjustment", "mediation-analysis"],
    },
    {
      id: "gaussian-structure-learning",
      label: "Gaussian Graphical Models & the Graphical Lasso",
      conceptIds: ["gaussian-graphical-models", "graphical-lasso", "joint-graphical-lasso"],
    },
    {
      id: "latent-variables",
      label: "Latent Variables & EM",
      conceptIds: [
        "mixture-models-and-latent-variables",
        "em-algorithm",
        "gaussian-mixture-models",
      ],
    },
    {
      // Deterministic rules first, so the curse of dimensionality motivates Monte
      // Carlo; importance sampling opens the next section and reuses all of it.
      id: "numerical-integration",
      label: "Numerical Integration",
      conceptIds: [
        "quadrature-rules",
        "gaussian-quadrature",
        "monte-carlo-integration",
        "variance-reduction",
        "quasi-monte-carlo",
        "importance-sampling",
      ],
    },
    {
      id: "variational-kernels",
      label: "Kernels & Optimal Transport",
      conceptIds: [
        "rkhs",
        "wasserstein-distance",
      ],
    },
    {
      id: "fda",
      label: "Functional Data Analysis",
      conceptIds: [
        "hilbert-space",
        "functional-data-analysis",
        "hilbert-schmidt-operators",
        "functional-pca",
        "multivariate-fpca",
        "functional-regression",
      ],
    },
  ],

  "stochastic-processes": [
    {
      id: "foundations",
      label: "From Random Walk to Brownian Motion",
      conceptIds: ["simple-random-walk", "brownian-motion"],
    },
    {
      id: "markov-chain-theory",
      label: "Markov Chain Theory",
      conceptIds: [
        "chapman-kolmogorov",
        "state-classification",
        "periodicity",
        "absorbing-markov-chains",
        "first-passage-hitting-times",
        "ergodicity",
        "detailed-balance-reversibility",
      ],
    },
    {
      id: "random-walks-and-stopping",
      label: "Random Walks & Stopping",
      conceptIds: [
        "stopping-times-strong-markov",
        "gamblers-ruin",
        "ballot-theorem",
        "optional-stopping-theorem",
        "optimal-stopping",
      ],
    },
    {
      id: "counting-and-renewal",
      label: "Counting & Renewal Processes",
      conceptIds: ["counting-processes", "interarrival-times", "renewal-processes"],
    },
    {
      id: "point-processes",
      label: "Point Processes",
      conceptIds: [
        "poisson-process",
        "poisson-thinning-superposition",
        "nonhomogeneous-poisson-process",
        "compound-poisson-process",
        "conditional-intensity",
        "hawkes-process",
        "cox-process",
        "log-gaussian-cox-process",
        "ogata-thinning",
      ],
    },
    {
      id: "markov-and-filtering",
      label: "Markov Processes & Filtering",
      conceptIds: [
        "continuous-time-markov-chains",
        "birth-death-processes",
        "kalman-filter",
        "karhunen-loeve-expansion",
      ],
    },
  ],

  "stochastic-calculus": [
    {
      id: "information-and-martingales",
      label: "Information and Martingales",
      conceptIds: ["filtrations-and-adapted-processes", "martingales-continuous-time"],
    },
    {
      id: "ito-calculus",
      label: "Itô Calculus",
      conceptIds: [
        "quadratic-variation",
        "ito-integral",
        "ito-doeblin-formula",
        "multidimensional-ito-calculus",
      ],
    },
    {
      id: "sdes-and-pricing",
      label: "SDEs and Risk-Neutral Pricing",
      conceptIds: [
        "stochastic-differential-equations",
        "geometric-brownian-motion",
        "black-scholes-merton-equation",
        "girsanov-theorem",
        "risk-neutral-pricing",
        "martingale-representation-theorem",
      ],
    },
    {
      id: "pde-connections",
      label: "Connections with PDEs",
      conceptIds: ["feynman-kac-theorem"],
    },
  ],

  "financial-instruments": [
    {
      id: "fixed-income",
      label: "Fixed Income and the Term Structure",
      conceptIds: [
        "time-value-of-money",
        "bonds-and-fixed-income",
        "yield-to-maturity",
        "yield-curve-and-term-structure",
        "bond-duration-and-convexity",
      ],
    },
    {
      id: "equities-and-funds",
      label: "Equities and Pooled Vehicles",
      conceptIds: ["equities-and-stock-markets", "etfs-and-index-funds", "mutual-funds-and-nav"],
    },
    {
      id: "forwards-futures-options",
      label: "Forwards, Futures, and Options",
      conceptIds: [
        "derivatives-overview",
        "forwards-and-futures",
        "options-calls-and-puts",
        "option-payoff-and-put-call-parity",
        "option-pricing-and-greeks",
      ],
    },
    {
      id: "swaps-and-credit",
      label: "Swaps and Credit Derivatives",
      conceptIds: ["interest-rate-and-currency-swaps", "credit-default-swaps"],
    },
  ],

  python: [
    {
      id: "fundamentals",
      label: "Fundamentals",
      conceptIds: [
        "python-variables-types",
        "python-type-conversion",
        "python-operators",
      ],
    },
    {
      id: "control-flow",
      label: "Control Flow",
      conceptIds: [
        "python-conditionals",
        "python-while-loops",
        "python-for-loops",
      ],
    },
    {
      id: "functions",
      label: "Functions",
      conceptIds: [
        "python-functions",
        "python-arguments",
        "python-args-kwargs",
        "python-scope",
        "python-lambda",
        "python-higher-order",
        "python-sorting-key",
      ],
    },
    {
      id: "containers-and-iteration",
      label: "Containers & Iteration",
      conceptIds: [
        "python-lists-intro",
        "python-indexing",
        "python-slicing",
        "python-list-operations",
        "python-tuples",
        "python-dictionaries",
        "python-sets",
        "python-loops",
        "python-comprehensions",
      ],
    },
    {
      id: "numpy",
      label: "NumPy",
      conceptIds: [
        "numpy-arrays",
        "numpy-array-creation",
        "numpy-indexing",
        "numpy-broadcasting",
        "numpy-matrices",
        "numpy-dtypes",
        "numpy-reshaping",
        "numpy-aggregations",
        "numpy-random",
      ],
    },
    {
      id: "pandas",
      label: "pandas",
      conceptIds: [
        "pandas-dataframes",
        "pandas-groupby",
        "pandas-io",
        "pandas-selection",
        "pandas-filtering",
        "pandas-missing",
        "pandas-dtypes",
        "pandas-sorting",
        "pandas-apply",
        "pandas-strings",
        "pandas-datetime",
        "pandas-pivot",
        "pandas-concat",
        "pandas-window",
      ],
    },
    {
      id: "strings-text",
      label: "Strings & Text",
      conceptIds: [
        "python-strings",
        "python-string-methods",
        "python-fstrings",
        "python-regex",
      ],
    },
    {
      id: "errors",
      label: "Errors & Robustness",
      conceptIds: [
        "python-exceptions",
        "python-raising",
      ],
    },
    {
      id: "iteration",
      label: "Iterators & Generators",
      conceptIds: [
        "python-iterators",
        "python-generators",
        "python-itertools",
      ],
    },
    {
      id: "classes",
      label: "Classes & Objects",
      conceptIds: [
        "python-classes",
        "python-methods",
        "python-dunder",
        "python-inheritance",
      ],
    },
    {
      id: "stdlib-io",
      label: "Modules, Files & the Standard Library",
      conceptIds: [
        "python-modules",
        "python-collections",
        "python-datetime",
        "python-files",
        "python-json",
      ],
    },
  ],
};
