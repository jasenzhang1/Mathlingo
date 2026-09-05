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
  probability: [
    {
      id: "foundations",
      label: "Foundations of Probability",
      conceptIds: [
        "set-theory",
        "pie-boole",
        "sigma-algebra",
        "axioms-of-probability",
        "probability-function",
        "counting-methods",
        "binomial-theorem",
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
        "pearson-correlation",
      ],
    },
    {
      id: "asymptotics",
      label: "Asymptotics & Divergences",
      conceptIds: ["central-limit-theorem", "kl-divergence"],
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
      ],
    },
  ],

  regression: [
    {
      id: "foundations",
      label: "Regression Foundations",
      conceptIds: [
        "regression",
        "regress-to-the-mean",
        "linear-regression-terminology",
        "simple-linear-regression",
        "ordinary-least-squares",
        "normal-equations",
      ],
    },
    {
      id: "ols-geometry",
      label: "OLS Geometry & Multiple Regression",
      conceptIds: [
        "geometric-interpretation-of-ols",
        "multiple-linear-regression",
        "linear-regression-probabilistic-version",
        "ols-assumptions",
        "homoskedasticity",
      ],
    },
    {
      id: "fit-diagnostics",
      label: "Model Fit & Diagnostics",
      conceptIds: [
        "ols-properties",
        "ssr-sse-sst",
        "r-squared",
        "anova",
        "effect-of-adding-another-variable",
        "vif",
      ],
    },
    {
      id: "selection-regularization",
      label: "Model Selection & Regularization",
      conceptIds: [
        "aic-bic",
        "forward-backward-stepwise-selection",
        "regularization",
        "lasso",
        "ridge-regression",
        "elastic-net",
        "loess-smoothing",
      ],
    },
    {
      id: "generalized",
      label: "Generalized & Special Regression",
      conceptIds: [
        "mixed-effect-models",
        "logistic-regression",
        "probit-regression",
        "glm",
        "cox-proportional-hazards-model",
      ],
    },
    {
      id: "extensions",
      label: "Extensions",
      conceptIds: [
        "weighted-least-squares",
        "outliers-leverage-influence",
        "polynomial-regression",
        "quantile-regression",
        "poisson-regression",
      ],
    },
  ],

  "machine-learning": [
    {
      id: "foundations",
      label: "Foundations",
      conceptIds: [
        "ml-introduction",
        "loss-functions",
        "types-of-machine-learning",
        "supervised-vs-unsupervised-learning",
        "classification-vs-regression",
        "curse-of-dimensionality",
        "training-validation-test-set",
        "data-leakage",
      ],
    },
    {
      id: "evaluation",
      label: "Model Evaluation & Selection",
      conceptIds: [
        "multiclass-classification",
        "confusion-matrices",
        "roc-curves",
        "k-fold-cross-validation",
        "hyperparameters",
        "sensitivity-analysis",
      ],
    },
    {
      id: "bias-variance",
      label: "Bias-Variance & Optimization",
      conceptIds: [
        "bias-variance-tradeoff",
        "overfitting-underfitting",
        "gradient-descent",
        "cross-entropy-loss",
      ],
    },
    {
      id: "classic-classifiers",
      label: "Generative, Discriminative & Classic Classifiers",
      conceptIds: [
        "generative-vs-discriminative-models",
        "naive-bayes",
        "lda",
        "knn",
        "svm",
        "svms-for-regression",
      ],
    },
    {
      id: "kernels",
      label: "Kernels",
      conceptIds: ["kernel", "mercers-theorem", "rbf"],
    },
    {
      id: "trees-ensembles",
      label: "Trees & Ensembles",
      conceptIds: [
        "decision-tree",
        "splitting-criteria",
        "pruning-trees",
        "ensemble-methods",
        "bagging",
        "random-forests",
        "adaboost",
        "gradient-boosting",
        "xgboost",
      ],
    },
    {
      id: "clustering-dimred",
      label: "Clustering & Dimensionality Reduction",
      conceptIds: [
        "clustering-methods",
        "k-means-clustering",
        "svd-for-clustering",
        "probabilistic-pca",
        "kernel-pca",
        "t-sne",
        "umap",
        "ica",
        "pca",
      ],
    },
    {
      id: "neural-networks",
      label: "Neural Networks",
      conceptIds: ["perceptron", "neural-networks", "backpropagation"],
    },
    {
      id: "gaussian-processes",
      label: "Gaussian Processes",
      conceptIds: ["gp-regression", "gp-classification"],
    },
    {
      id: "practical-modelling",
      label: "Practical Modelling & Evaluation",
      conceptIds: [
        "feature-scaling",
        "feature-selection",
        "class-imbalance",
        "precision-recall-curves",
        "probability-calibration",
        "nested-cross-validation",
        "learning-curves",
        "distribution-shift",
        "model-interpretability",
        "anomaly-detection",
      ],
    },
    {
      id: "deep-learning",
      label: "Deep Learning",
      conceptIds: [
        "activation-functions",
        "sgd-and-adaptive-optimizers",
        "dropout",
        "batch-normalization",
        "convolutional-neural-networks",
        "recurrent-neural-networks",
        "attention-mechanism",
        "transformers",
        "embeddings",
        "autoencoders",
      ],
    },
    {
      id: "architectures",
      label: "Neural Network Architectures",
      conceptIds: [
        "architecture-families",
        "residual-networks",
        "lstm-and-gru",
        "autoregressive-models",
        "state-space-models",
        "graph-neural-networks",
        "generative-adversarial-networks",
        "diffusion-models",
        "mixture-of-experts",
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
      id: "further-paradigms",
      label: "Further Paradigms & Methods",
      conceptIds: [
        "transfer-learning",
        "self-supervised-learning",
        "reinforcement-learning",
        "multi-armed-bandits",
        "bayesian-optimization",
        "stacking",
        "hierarchical-clustering",
        "density-based-clustering",
      ],
    },
    {
      id: "adapting-and-serving",
      label: "Scaling, Adapting & Serving",
      conceptIds: [
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
      id: "latent-variables",
      label: "Latent Variables & EM",
      conceptIds: [
        "mixture-models-and-latent-variables",
        "em-algorithm",
        "gaussian-mixture-models",
        "laplace-approximation",
      ],
    },
    {
      id: "variational-kernels",
      label: "Variational Inference & Kernels",
      conceptIds: [
        "variational-inference-elbo",
        "variational-inference-vaes",
        "gaussian-process",
        "rkhs",
        "wasserstein-distance",
      ],
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
      ],
    },
    {
      id: "pandas",
      label: "pandas",
      conceptIds: ["pandas-dataframes", "pandas-groupby"],
    },
  ],
};
