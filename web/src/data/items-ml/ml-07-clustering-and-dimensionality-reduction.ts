import type { Item } from "../../lib/assessment/types";
import { ML_07 } from "./sources";

/**
 * Cluster 7 — clustering and dimensionality reduction. Ported from
 * `assessments/ml-07-clustering-and-dimensionality-reduction.md`.
 *
 * As in cluster 6, the markdown's cross-references frequently point sideways
 * rather than upstream — `k-fold-cross-validation` from `clustering-methods`,
 * `law-of-total-variance` from `k-means-clustering`, `eckart-young` and
 * `curse-of-dimensionality` from `svd-for-clustering`, `mercers-theorem` from
 * `kernel-pca`, `lda` and `eckart-young` from `pca`. Each item keeps the
 * connection and supplies the borrowed fact in the stem. Genuine upstream
 * dependencies (`kl-divergence` for t-SNE, `covariance` for ICA, `mle` for
 * PPCA, `svd` for SVD-clustering) are declared as such.
 */
export const ml07Items: Item[] = [
  // --- Clustering Methods ---------------------------------------------------
  {
    id: "clustering-methods--recall-definition",
    conceptId: "clustering-methods",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define clustering.",
    rubric: {
      elements: [
        {
          id: "grouping-by-similarity",
          description:
            "Grouping points so that those within a cluster are more similar to each other than to points in other clusters.",
          weight: 3,
          required: true,
        },
        {
          id: "unsupervised",
          description: "It is an unsupervised task — no labels are used.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.81,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["clustering-methods", "supervised-vs-unsupervised-learning"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "clustering-methods--recall-evaluation-challenge",
    conceptId: "clustering-methods",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Compared with evaluating a supervised classifier, the main difficulty in evaluating a clustering result is that:",
    choices: [
      {
        id: "a",
        text: "there are no ground-truth labels to compare against, so what counts as a good clustering is partly a judgement about the task",
        correct: true,
      },
      {
        id: "b",
        text: "clustering always achieves 100% accuracy",
        correct: false,
        misconception: {
          id: "accuracy-applied-to-clustering",
          description:
            "Accuracy is not even definable without labels. The algorithm's output is a partition, and there is nothing to check it against.",
          blameConceptId: "clustering-methods",
        },
      },
      {
        id: "c",
        text: "clustering algorithms are too slow to evaluate",
        correct: false,
        misconception: {
          id: "evaluation-difficulty-read-as-cost",
          description:
            "Confuses a computational cost with a conceptual gap. The difficulty is that there is no reference answer, not that computing one is expensive.",
          blameConceptId: "clustering-methods",
        },
      },
      {
        id: "d",
        text: "clusters cannot be visualised",
        correct: false,
        misconception: {
          id: "evaluation-confused-with-visualisation",
          description:
            "Visualisation is often easy and often misleading — a convincing picture is not evidence that the structure was there before the algorithm looked.",
          blameConceptId: "clustering-methods",
        },
      },
    ],
    difficulty: -0.55,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["clustering-methods"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "clustering-methods--apply-supervised-or-not",
    conceptId: "clustering-methods",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Is clustering supervised or unsupervised? Justify it from the definition rather than by example.",
    rubric: {
      elements: [
        {
          id: "unsupervised",
          description: "Unsupervised.",
          weight: 2,
          required: true,
        },
        {
          id: "no-labels-consulted",
          description:
            "No labels are used at any point — the algorithm discovers the grouping from the inputs alone, and the cluster ids it outputs are results, not inputs.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["clustering-methods", "supervised-vs-unsupervised-learning"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "clustering-methods--explain-different-algorithms-differ",
    conceptId: "clustering-methods",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why can two clustering algorithms give genuinely different groupings of the same data, with neither being wrong?",
    rubric: {
      elements: [
        {
          id: "no-single-correct-partition",
          description:
            "Unlike supervised learning, where labels define one target to converge on, there is no objectively correct partition to converge on.",
          weight: 4,
          required: true,
        },
        {
          id: "assumptions-differ",
          description:
            "Each algorithm encodes different assumptions about what a cluster is — roughly spherical and similarly sized, dense and connected, elliptical — and those assumptions carve the same data differently.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.69,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["clustering-methods", "supervised-vs-unsupervised-learning"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "clustering-methods--transfer-choosing-k",
    conceptId: "clustering-methods",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "In supervised learning, held-out data settles a comparison between two models in a single number. Why is choosing the number of clusters k so much harder than that?",
    rubric: {
      elements: [
        {
          id: "no-objective-score",
          description:
            "There is no held-out truth to score against, so no equivalent objective criterion exists to optimise over k.",
          weight: 4,
          required: true,
        },
        {
          id: "heuristics-need-judgement",
          description:
            "The available tools — an elbow in the within-cluster sum of squares, silhouette scores, the gap statistic — are heuristics that require judgement and can disagree with each other.",
          weight: 4,
          required: true,
        },
        {
          id: "monotone-objective",
          description:
            "Bonus: notes that the clustering objective itself improves monotonically with k, so it cannot be used to pick k.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.19,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["clustering-methods"],
    source: ML_07,
    status: "shadow",
  },

  // --- K-Means Clustering ---------------------------------------------------
  {
    id: "k-means-clustering--recall-steps",
    conceptId: "k-means-clustering",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the iterative steps of the k-means algorithm.",
    rubric: {
      elements: [
        {
          id: "initialise",
          description: "Initialise k centroids.",
          weight: 2,
          required: true,
        },
        {
          id: "assignment-step",
          description: "Assign each point to its nearest centroid.",
          weight: 2,
          required: true,
        },
        {
          id: "update-step",
          description:
            "Move each centroid to the mean of its assigned points, and repeat until assignments stop changing.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["k-means-clustering", "clustering-methods"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "k-means-clustering--recall-convergence",
    conceptId: "k-means-clustering",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "k-means is guaranteed to converge to:",
    choices: [
      {
        id: "a",
        text: "some local optimum, which can depend on where the centroids started",
        correct: true,
      },
      {
        id: "b",
        text: "the global optimum, every time",
        correct: false,
        misconception: {
          id: "kmeans-thought-globally-optimal",
          description:
            "Confuses guaranteed termination with guaranteed optimality. Both steps decrease the objective monotonically, which forces termination but says nothing about where.",
          blameConceptId: "k-means-clustering",
        },
      },
      {
        id: "c",
        text: "a solution that may not exist — it can fail to converge",
        correct: false,
        misconception: {
          id: "kmeans-thought-non-convergent",
          description:
            "It always terminates: the objective never increases and there are finitely many possible assignments.",
          blameConceptId: "k-means-clustering",
        },
      },
      {
        id: "d",
        text: "the same answer regardless of initialisation",
        correct: false,
        misconception: {
          id: "kmeans-thought-initialisation-independent",
          description:
            "Different starting centroids reach different local optima — sometimes very different — which is exactly why restarts and k-means++ seeding exist.",
          blameConceptId: "k-means-clustering",
        },
      },
    ],
    difficulty: -0.45,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["k-means-clustering"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "k-means-clustering--apply-restarts",
    conceptId: "k-means-clustering",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Why does running k-means several times from different random initialisations and keeping the best result mitigate the local-optimum problem — and what does it still not guarantee?",
    rubric: {
      elements: [
        {
          id: "different-starts-different-optima",
          description:
            "Different initialisations converge to different local optima, so several runs sample several of them.",
          weight: 3,
          required: true,
        },
        {
          id: "keep-lowest-objective",
          description:
            "Keeping the run with the lowest within-cluster sum of squares picks the best of those samples.",
          weight: 3,
          required: true,
        },
        {
          id: "no-guarantee",
          description:
            "States the limit honestly: it raises the chance of landing near the global optimum without ever guaranteeing it.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["k-means-clustering"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "k-means-clustering--explain-objective-and-decomposition",
    conceptId: "k-means-clustering",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "What objective does k-means minimise? Given that the total spread of the data is a fixed quantity that splits into a within-cluster part and a between-cluster part, what else is k-means therefore doing?",
    rubric: {
      elements: [
        {
          id: "names-the-objective",
          description:
            "It minimises the total within-cluster sum of squared distances to each centroid.",
          weight: 3,
          required: true,
        },
        {
          id: "fixed-total-argument",
          description:
            "Makes the argument explicitly: the total is fixed no matter how the points are partitioned, so minimising the within-cluster part is *exactly* maximising the between-cluster part — the same optimisation stated two ways.",
          weight: 5,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-both-goals-independently",
          description:
            "Presents 'compact clusters' and 'well-separated clusters' as two separate objectives being traded off, missing that the fixed total makes them one.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["k-means-clustering", "clustering-methods"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "k-means-clustering--transfer-shape-assumptions",
    conceptId: "k-means-clustering",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why does k-means perform poorly when clusters differ markedly in shape or size, and what kinds of method handle those cases better?",
    rubric: {
      elements: [
        {
          id: "spherical-equal-size-assumption",
          description:
            "Names the implicit assumption: minimising squared Euclidean distance to a single centre can only carve out roughly spherical, comparably sized regions.",
          weight: 4,
          required: true,
        },
        {
          id: "concrete-failure",
          description:
            "Gives a concrete failure — a tight small cluster beside a large elongated one, or two concentric rings whose means coincide.",
          weight: 3,
          required: true,
        },
        {
          id: "alternatives",
          description:
            "Names alternatives that do not share the assumption: density-based methods, Gaussian mixtures with per-component covariance, or spectral clustering.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["k-means-clustering", "clustering-methods"],
    source: ML_07,
    status: "shadow",
  },

  // --- SVD for Clustering ---------------------------------------------------
  {
    id: "svd-for-clustering--recall-basic-idea",
    conceptId: "svd-for-clustering",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the basic idea of using the SVD before clustering.",
    rubric: {
      elements: [
        {
          id: "truncate-then-cluster",
          description:
            "Truncate the SVD to the top few components to get a low-dimensional representation, then run the clustering algorithm on that instead of on the raw data.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.07,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["svd-for-clustering", "clustering-methods", "svd"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "svd-for-clustering--recall-why-reduced-space",
    conceptId: "svd-for-clustering",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In very high dimensions, pairwise distances between points become nearly equal and stop discriminating. A key reason to cluster in a reduced space is therefore that it:",
    choices: [
      {
        id: "a",
        text: "restores distances that carry information, by discarding directions that are mostly noise",
        correct: true,
      },
      {
        id: "b",
        text: "always improves clustering accuracy with no downside",
        correct: false,
        misconception: {
          id: "svd-preprocessing-overclaimed",
          description:
            "An overclaim, not the justification. Truncation is lossy — genuine cluster structure can sit in a discarded low-variance direction.",
          blameConceptId: "svd-for-clustering",
        },
      },
      {
        id: "c",
        text: "makes the clustering algorithm's objective convex",
        correct: false,
        misconception: {
          id: "projection-thought-to-convexify",
          description:
            "k-means stays non-convex in any number of dimensions. Projection changes the representation, not the shape of the optimisation.",
          blameConceptId: "k-means-clustering",
        },
      },
      {
        id: "d",
        text: "removes the need to choose the number of clusters",
        correct: false,
        misconception: {
          id: "projection-thought-to-fix-k",
          description:
            "Choosing the rank r and choosing k are two separate unresolved choices; reducing dimension adds one rather than removing one.",
          blameConceptId: "clustering-methods",
        },
      },
    ],
    difficulty: 0.37,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["svd-for-clustering"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "svd-for-clustering--apply-optimal-truncation",
    conceptId: "svd-for-clustering",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A classical theorem says the top-r truncation of the SVD is the best rank-r approximation of a matrix in the Frobenius norm. Use it to explain why keeping the top r singular directions beats keeping r randomly chosen features.",
    rubric: {
      elements: [
        {
          id: "provable-optimality",
          description:
            "The truncation is provably optimal among all rank-r approximations, so no other choice of r directions preserves more of the data in that norm.",
          weight: 4,
          required: true,
        },
        {
          id: "random-subset-has-no-guarantee",
          description:
            "A random feature subset carries no such guarantee and typically retains far less structure — it is one arbitrary rank-r approximation among many.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.87,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["svd-for-clustering", "svd", "rank"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "svd-for-clustering--explain-the-risk",
    conceptId: "svd-for-clustering",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "What is the genuine risk of reducing dimension with the SVD before clustering?",
    rubric: {
      elements: [
        {
          id: "variance-is-not-separation",
          description:
            "The truncation preserves *variance*, and the directions of greatest variance are not necessarily the directions that separate meaningful clusters.",
          weight: 4,
          required: true,
        },
        {
          id: "structure-can-be-discarded",
          description:
            "So real cluster structure lying along a low-variance direction can be thrown away before the clustering algorithm ever sees it.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.57,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["svd-for-clustering", "svd"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "svd-for-clustering--transfer-spectral-clustering",
    conceptId: "svd-for-clustering",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Spectral clustering can separate two interleaving crescent shapes that centroid-based clustering cannot, on raw or SVD-reduced data alike. What is the distinguishing mechanism?",
    rubric: {
      elements: [
        {
          id: "graph-connectivity",
          description:
            "Names graph connectivity as the mechanism: it eigendecomposes a similarity/Laplacian matrix, so points are grouped by being connected through a chain of near neighbours rather than by straight-line distance to a centre.",
          weight: 5,
          required: true,
        },
        {
          id: "non-convex-shapes",
          description:
            "That is what lets it separate non-convex shapes, which no centroid-distance criterion can carve out.",
          weight: 3,
          required: true,
        },
        {
          id: "still-kmeans-at-the-end",
          description:
            "Bonus: notes the final step is usually k-means in the eigenvector space — the embedding does the work, not a new clustering rule.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.07,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["svd-for-clustering", "eigenvalues-eigenvectors", "clustering-methods"],
    source: ML_07,
    status: "shadow",
  },

  // --- Probabilistic PCA ----------------------------------------------------
  {
    id: "probabilistic-pca--recall-model",
    conceptId: "probabilistic-pca",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "Describe probabilistic PCA as a generative model.",
    rubric: {
      elements: [
        {
          id: "latent-plus-noise",
          description:
            "Observed data arises from a lower-dimensional latent z through a linear map plus Gaussian noise: x = Wz + μ + ε.",
          weight: 4,
          required: true,
        },
        {
          id: "gaussian-latent",
          description: "The latent z carries a standard Gaussian prior.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 0.31,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["probabilistic-pca", "pca", "mle"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "probabilistic-pca--recall-limit",
    conceptId: "probabilistic-pca",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Ordinary PCA is recovered from probabilistic PCA:",
    choices: [
      {
        id: "a",
        text: "in the maximum-likelihood solution as the noise variance σ² → 0",
        correct: true,
      },
      {
        id: "b",
        text: "never — they are unrelated methods",
        correct: false,
        misconception: {
          id: "ppca-thought-unrelated",
          description:
            "Misses that PPCA's maximum likelihood estimate of W spans exactly the principal subspace, which is what makes PPCA an explanation of PCA rather than a competitor.",
          blameConceptId: "probabilistic-pca",
        },
      },
      {
        id: "c",
        text: "as the latent dimension q approaches the data dimension d",
        correct: false,
        misconception: {
          id: "limit-taken-in-q",
          description:
            "Taking q → d makes the model saturate and explains nothing; the correspondence is a limit in the noise, not in the latent dimension.",
          blameConceptId: "probabilistic-pca",
        },
      },
      {
        id: "d",
        text: "only when the data is exactly Gaussian",
        correct: false,
        misconception: {
          id: "limit-thought-to-need-gaussian-data",
          description:
            "The Gaussian assumption is in the *model*, not a requirement on the data; the maximum likelihood solution recovers the principal subspace regardless.",
          blameConceptId: "probabilistic-pca",
        },
      },
    ],
    difficulty: 0.61,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["probabilistic-pca"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "probabilistic-pca--apply-two-advantages",
    conceptId: "probabilistic-pca",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Name two practical capabilities probabilistic PCA has specifically because it is a full probabilistic model, and say why ordinary PCA lacks each.",
    rubric: {
      elements: [
        {
          id: "missing-data",
          description:
            "Missing values can be handled by marginalising the unobserved coordinates (via EM) rather than imputing them first, because the model defines a density over x.",
          weight: 4,
          required: true,
        },
        {
          id: "choosing-q",
          description:
            "The latent dimension can be chosen by likelihood-based model comparison — AIC/BIC or cross-validated likelihood — instead of eyeballing a scree plot.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.11,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["probabilistic-pca", "mle", "pca"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "probabilistic-pca--explain-two-routes",
    conceptId: "probabilistic-pca",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "PCA can be derived geometrically or by maximum likelihood under the PPCA model. Describe both routes and their relationship.",
    rubric: {
      elements: [
        {
          id: "geometric-route",
          description:
            "Geometric: the components are eigenvectors of the sample covariance matrix, chosen to maximise retained variance.",
          weight: 3,
          required: true,
        },
        {
          id: "likelihood-route",
          description:
            "Likelihood: maximise the likelihood of the observed data under the Gaussian latent-variable model, and W's estimate spans the same subspace.",
          weight: 4,
          required: true,
        },
        {
          id: "convergence",
          description:
            "States the relationship: two independent derivations that converge on the same answer in the σ² → 0 limit, so PPCA explains what PCA was implicitly assuming.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.81,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["probabilistic-pca", "mle", "pca", "eigenvalues-eigenvectors"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "probabilistic-pca--transfer-stepping-stone",
    conceptId: "probabilistic-pca",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why does PPCA's explicit noise model make it a stepping stone toward richer generative models? Name at least one concrete extension and the assumption it relaxes.",
    rubric: {
      elements: [
        {
          id: "concrete-extension",
          description:
            "Names a concrete extension — factor analysis (a separate noise variance per feature instead of one shared σ²), a mixture of PPCA models, or a latent-variable model whose decoder is a neural network.",
          weight: 4,
          required: true,
        },
        {
          id: "why-the-framing-enables-it",
          description:
            "Explains why the framing enables it: once dimensionality reduction is expressed as a likelihood-based generative process rather than a geometric projection, each assumption in that process becomes a separate thing you can change.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.31,
    discrimination: 1.5,
    expectedSeconds: 230,
    prereqClosure: ["probabilistic-pca", "mle"],
    source: ML_07,
    status: "shadow",
  },

  // --- Kernel PCA -----------------------------------------------------------
  {
    id: "kernel-pca--recall-describe",
    conceptId: "kernel-pca",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe kernel PCA.",
    rubric: {
      elements: [
        {
          id: "pca-in-feature-space",
          description:
            "PCA carried out in the feature space induced by a kernel, so the components are nonlinear functions of the original coordinates.",
          weight: 4,
          required: true,
        },
        {
          id: "without-the-mapping",
          description:
            "Achieved without ever computing that mapping, by eigendecomposing the kernel matrix.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.31,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["kernel-pca", "pca", "kernel"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "kernel-pca--recall-when-useful",
    conceptId: "kernel-pca",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Kernel PCA is worth reaching for when:",
    choices: [
      {
        id: "a",
        text: "the data's structure is nonlinear — a curved manifold that ordinary PCA would miss",
        correct: true,
      },
      {
        id: "b",
        text: "the data's structure lies along a linear subspace",
        correct: false,
        misconception: {
          id: "kernel-pca-applied-to-linear-case",
          description:
            "That is exactly when ordinary PCA already suffices, at far lower cost and with an exact reconstruction that kernel PCA cannot give.",
          blameConceptId: "kernel-pca",
        },
      },
      {
        id: "c",
        text: "the dataset has millions of rows",
        correct: false,
        misconception: {
          id: "kernel-pca-thought-scalable",
          description:
            "Backwards on cost. Kernel PCA is O(n³) in the number of samples, so large n is precisely where it becomes infeasible.",
          blameConceptId: "kernel-pca",
        },
      },
      {
        id: "d",
        text: "an exact reconstruction of the original inputs is needed",
        correct: false,
        misconception: {
          id: "kernel-pca-thought-reconstructive",
          description:
            "The pre-image problem means there is generally no exact way back to input space — this is kernel PCA's main limitation, not a use case.",
          blameConceptId: "kernel-pca",
        },
      },
    ],
    difficulty: 0.61,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["kernel-pca"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "kernel-pca--apply-spiral",
    conceptId: "kernel-pca",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Data lies exactly along a curved spiral in two dimensions. Why does ordinary PCA fail to capture it while kernel PCA can succeed?",
    rubric: {
      elements: [
        {
          id: "pca-only-linear",
          description:
            "PCA can only find straight-line directions of maximum variance, and a spiral has no single linear direction that captures its structure.",
          weight: 4,
          required: true,
        },
        {
          id: "kernel-unrolls-it",
          description:
            "An appropriate kernel maps the data into a space where the spiral becomes linear, so a linear method applied there recovers it.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.11,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["kernel-pca", "pca", "kernel"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "kernel-pca--explain-validity-requirement",
    conceptId: "kernel-pca",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A kernel is valid — it equals an inner product in some feature space — exactly when every kernel matrix it produces is positive semidefinite. Why does kernel PCA need that condition, and is it a new requirement or one you have already met?",
    rubric: {
      elements: [
        {
          id: "same-requirement",
          description:
            "It is the identical requirement already met for kernel methods generally, not a separate rule for PCA.",
          weight: 3,
          required: true,
        },
        {
          id: "why-it-is-needed",
          description:
            "Without it the matrix corresponds to no feature space at all, so there is no underlying PCA for the eigendecomposition to be *of* — and negative eigenvalues would give components with negative variance.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.81,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["kernel-pca", "kernel", "positive-definite-matrices", "eigenvalues-eigenvectors"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "kernel-pca--transfer-vs-neighbour-embeddings",
    conceptId: "kernel-pca",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Newer visualisation methods optimise an objective that preserves each point's nearest neighbours. Why is kernel PCA less used for visualisation than those, despite also being nonlinear?",
    rubric: {
      elements: [
        {
          id: "objective-mismatch",
          description:
            "Names the mismatch: kernel PCA still maximises retained variance — a global criterion — which does not aim at, and often does not produce, visually separated clusters.",
          weight: 5,
          required: true,
        },
        {
          id: "neighbour-objectives-target-it",
          description:
            "Neighbour-preserving objectives target exactly the property a cluster picture is read for, so they produce clearer separation by construction.",
          weight: 3,
          required: true,
        },
        {
          id: "what-kernel-pca-keeps",
          description:
            "Bonus: notes the trade — kernel PCA's components remain a genuine variance decomposition, which the neighbour embeddings are not.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.31,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["kernel-pca", "pca"],
    source: ML_07,
    status: "shadow",
  },

  // --- t-SNE ----------------------------------------------------------------
  {
    id: "t-sne--recall-goal",
    conceptId: "t-sne",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe t-SNE's goal.",
    rubric: {
      elements: [
        {
          id: "local-structure",
          description:
            "Produce a low-dimensional embedding in which points close together in the original space remain close — preserving local neighbourhood structure.",
          weight: 4,
          required: true,
        },
        {
          id: "kl-objective",
          description:
            "Fidelity is measured by KL divergence between two distributions over pairs.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.11,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["t-sne", "clustering-methods", "kl-divergence"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "t-sne--recall-what-it-preserves",
    conceptId: "t-sne",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "t-SNE is primarily designed to preserve:",
    choices: [
      {
        id: "a",
        text: "local neighbourhood structure — which points are each other's nearest neighbours",
        correct: true,
      },
      {
        id: "b",
        text: "global distances between all pairs, however far apart",
        correct: false,
        misconception: {
          id: "tsne-thought-to-preserve-global",
          description:
            "The opposite of its design, and the source of the most serious misreadings of t-SNE plots. The KL objective's asymmetry deliberately makes distant pairs cheap to misplace.",
          blameConceptId: "t-sne",
        },
      },
      {
        id: "c",
        text: "the total variance of the data",
        correct: false,
        misconception: {
          id: "tsne-confused-with-pca",
          description:
            "Variance preservation is PCA's criterion. t-SNE's embedding coordinates have no variance interpretation at all.",
          blameConceptId: "t-sne",
        },
      },
      {
        id: "d",
        text: "the density of points in each region",
        correct: false,
        misconception: {
          id: "tsne-thought-to-preserve-density",
          description:
            "Density is actively distorted: dense clusters are expanded and sparse ones contracted, which is why cluster sizes in a t-SNE plot mean nothing.",
          blameConceptId: "t-sne",
        },
      },
    ],
    difficulty: 0.19,
    discrimination: 1.4,
    expectedSeconds: 40,
    prereqClosure: ["t-sne"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "t-sne--apply-intercluster-distance",
    conceptId: "t-sne",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Two well-separated clusters appear far apart in a t-SNE plot. Why is it a serious mistake to read that gap as showing how different they are?",
    rubric: {
      elements: [
        {
          id: "only-local-is-optimised",
          description:
            "Only local neighbourhood preservation is optimised, so nothing in the objective constrains where clusters end up relative to one another.",
          weight: 4,
          required: true,
        },
        {
          id: "layout-is-an-artefact",
          description:
            "The global arrangement is largely an artefact of the optimisation — initialisation, perplexity, the run — rather than a measurement of dissimilarity.",
          weight: 4,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "treats-gap-as-quantitative",
          description:
            "Concedes some caution but still treats the plotted gap as a rough quantitative measure of dissimilarity.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.69,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["t-sne"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "t-sne--explain-kl-role",
    conceptId: "t-sne",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "What exactly does KL divergence measure in t-SNE? Name both distributions it compares.",
    rubric: {
      elements: [
        {
          id: "distribution-p",
          description:
            "P: a distribution over pairs derived from similarities in the original high-dimensional space — how likely each point is to be another's neighbour.",
          weight: 3,
          required: true,
        },
        {
          id: "distribution-q",
          description:
            "Q: the corresponding distribution computed from the low-dimensional embedding.",
          weight: 3,
          required: true,
        },
        {
          id: "minimised-over-the-embedding",
          description:
            "t-SNE moves the embedded points to minimise KL(P ‖ Q) — the divergence is the loss function, not a diagnostic.",
          weight: 3,
          required: true,
        },
        {
          id: "asymmetry-matters",
          description:
            "Bonus: notes the asymmetry is deliberate — placing true neighbours far apart is expensive, the reverse is cheap, which is what makes it a local method.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.39,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["t-sne", "kl-divergence"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "t-sne--transfer-run-to-run-variation",
    conceptId: "t-sne",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Two t-SNE runs on the same data give visibly different overall layouts while the local groupings look similar. Explain both halves of that.",
    rubric: {
      elements: [
        {
          id: "non-convexity",
          description:
            "The optimisation is non-convex with random initialisation, so different runs reach different solutions — and perplexity changes the objective as well.",
          weight: 4,
          required: true,
        },
        {
          id: "local-focus-explains-the-asymmetry",
          description:
            "Because only local structure is constrained, the layout is free to vary while neighbour relationships stay stable — the varying part is precisely the part the objective does not pin down.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.89,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["t-sne"],
    source: ML_07,
    status: "shadow",
  },

  // --- UMAP -----------------------------------------------------------------
  {
    id: "umap--recall-relationship-to-tsne",
    conceptId: "umap",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe UMAP's relationship to t-SNE.",
    rubric: {
      elements: [
        {
          id: "same-goal",
          description:
            "Same goal — a low-dimensional embedding preserving local neighbourhood structure for visualisation.",
          weight: 3,
          required: true,
        },
        {
          id: "different-foundation-and-speed",
          description:
            "Built on a different foundation (manifold/topological rather than pairwise probability distributions), substantially faster, and somewhat better at retaining global structure.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.08,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["umap", "t-sne"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "umap--recall-comparison",
    conceptId: "umap",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Compared with t-SNE, UMAP is generally:",
    choices: [
      {
        id: "a",
        text: "faster and more scalable to large datasets, at similar or better visual quality",
        correct: true,
      },
      {
        id: "b",
        text: "slower but more accurate",
        correct: false,
        misconception: {
          id: "umap-speed-inverted",
          description:
            "Backwards on the main practical advantage — speed is precisely why UMAP displaced t-SNE in large-n exploratory work.",
          blameConceptId: "umap",
        },
      },
      {
        id: "c",
        text: "a linear method, unlike t-SNE",
        correct: false,
        misconception: {
          id: "umap-thought-linear",
          description:
            "Both are nonlinear. Neither produces components that are linear combinations of the original features.",
          blameConceptId: "umap",
        },
      },
      {
        id: "d",
        text: "deterministic, giving the same layout on every run",
        correct: false,
        misconception: {
          id: "umap-thought-deterministic",
          description:
            "UMAP is stochastic too; its layout varies across runs and with n_neighbors, so a fixed seed is needed for reproducibility.",
          blameConceptId: "umap",
        },
      },
    ],
    difficulty: 0.22,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["umap"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "umap--apply-trusting-distances",
    conceptId: "umap",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Should the distance between two well-separated clusters in a UMAP plot be trusted as quantitatively meaningful? Answer carefully.",
    rubric: {
      elements: [
        {
          id: "somewhat-better-not-trustworthy",
          description:
            "Better than t-SNE at retaining some global structure, but still not a quantitative measurement.",
          weight: 4,
          required: true,
        },
        {
          id: "local-is-what-is-preserved",
          description:
            "What the objective preserves is neighbour relationships, so inter-cluster geometry remains a by-product to be read cautiously.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "unqualified-yes",
          description:
            "Answers a plain 'yes' on the strength of UMAP's better global-structure reputation.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.72,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["umap", "t-sne"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "umap--explain-visualisation-not-preprocessing",
    conceptId: "umap",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A linear projection that maximises retained variance is routinely used as a preprocessing step before modelling. Why are t-SNE and UMAP embeddings treated as visualisation output rather than as features?",
    rubric: {
      elements: [
        {
          id: "nonlinear-local-embedding-distorts",
          description:
            "Their embeddings are nonlinear and locally focused, so they do not preserve the global or linear relationships a downstream model would rely on.",
          weight: 4,
          required: true,
        },
        {
          id: "contrast-with-linear-projection",
          description:
            "Contrasts with the variance-maximising linear projection, which is used as preprocessing precisely because it preserves linear structure and can be applied to new points as a fixed map.",
          weight: 4,
          required: true,
        },
        {
          id: "distortions-propagate",
          description:
            "Bonus: notes that modelling on those coordinates imports every distortion — meaningless cluster sizes and gaps — into a quantitative result.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.42,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["umap", "t-sne"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "umap--transfer-millions-of-points",
    conceptId: "umap",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why might an analyst choose UMAP over t-SNE for a dataset of several million points, and what does that choice not buy them?",
    rubric: {
      elements: [
        {
          id: "tractability",
          description:
            "Speed and scalability make it tractable where t-SNE would be prohibitive — minutes rather than an overnight job, which is what makes iterating on the picture possible at all.",
          weight: 4,
          required: true,
        },
        {
          id: "same-caution-remains",
          description:
            "It does not buy trustworthy global geometry: the same caution about over-reading cluster sizes and gaps applies regardless of which tool produced the plot.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.92,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["umap", "t-sne"],
    source: ML_07,
    status: "shadow",
  },

  // --- Independent Component Analysis --------------------------------------
  {
    id: "ica--recall-goal-vs-pca",
    conceptId: "ica",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe ICA's goal and contrast it with PCA's.",
    rubric: {
      elements: [
        {
          id: "ica-goal",
          description:
            "Recover statistically independent source signals from an observed mixture.",
          weight: 3,
          required: true,
        },
        {
          id: "pca-contrast",
          description:
            "PCA finds merely *uncorrelated* directions of maximum variance — a strictly weaker condition than independence.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.29,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["ica", "pca", "kl-divergence"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "ica--recall-key-difference",
    conceptId: "ica",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The key difference between ICA and PCA is that:",
    choices: [
      {
        id: "a",
        text: "ICA seeks statistically independent components, a stronger condition than PCA's uncorrelatedness",
        correct: true,
      },
      {
        id: "b",
        text: "they are the same algorithm under different names",
        correct: false,
        misconception: {
          id: "ica-equated-with-pca",
          description:
            "Misses the entire point. PCA consults only the covariance matrix; ICA needs higher-order statistics precisely because covariance cannot detect the dependence it targets.",
          blameConceptId: "ica",
        },
      },
      {
        id: "c",
        text: "ICA components are orthogonal and ordered by variance, unlike PCA's",
        correct: false,
        misconception: {
          id: "ica-properties-swapped",
          description:
            "Reversed. It is PCA whose components are orthogonal and variance-ordered; ICA's are neither.",
          blameConceptId: "ica",
        },
      },
      {
        id: "d",
        text: "ICA is supervised and PCA is not",
        correct: false,
        misconception: {
          id: "ica-thought-supervised",
          description:
            "Both are unsupervised. Neither consults an outcome variable at any stage.",
          blameConceptId: "supervised-vs-unsupervised-learning",
        },
      },
    ],
    difficulty: 0.59,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["ica"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "ica--apply-uncorrelated-not-independent",
    conceptId: "ica",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Take X symmetric about zero and Y = X². Use this pair to explain why PCA's uncorrelated components could still be dependent, and what ICA does about it.",
    rubric: {
      elements: [
        {
          id: "the-counterexample",
          description:
            "Shows Cov(X, Y) = E[X³] − E[X]E[X²] = 0 by symmetry, while Y is a deterministic function of X — as dependent as two variables can be.",
          weight: 4,
          required: true,
        },
        {
          id: "implication-for-pca",
          description:
            "Concludes that PCA's uncorrelatedness says nothing about nonlinear dependence between components, because covariance is a second-moment statistic.",
          weight: 4,
          required: true,
        },
        {
          id: "what-ica-targets",
          description:
            "States that ICA targets full statistical independence, which rules out exactly this kind of hidden dependence.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.09,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["ica", "covariance", "expectation"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "ica--explain-gaussian-restriction",
    conceptId: "ica",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does ICA require that at most one true source be Gaussian?",
    rubric: {
      elements: [
        {
          id: "gaussian-special-case",
          description:
            "For jointly Gaussian variables, uncorrelated and independent coincide — a property unique to that family.",
          weight: 4,
          required: true,
        },
        {
          id: "no-preferred-rotation",
          description:
            "So a rotation of independent Gaussians is again independent Gaussians with the same distribution: the mixing is unidentifiable, and there is no preferred solution for ICA to find.",
          weight: 5,
          required: true,
        },
        {
          id: "hence-non-gaussianity-objectives",
          description:
            "Bonus: connects this to why ICA algorithms maximise kurtosis or negentropy — non-Gaussianity is the signal they exploit.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.79,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["ica", "covariance", "joint-distribution"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "ica--transfer-cocktail-party",
    conceptId: "ica",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Explain the cocktail party problem and why ICA rather than PCA is the right tool for it.",
    rubric: {
      elements: [
        {
          id: "linear-mixture-setup",
          description:
            "Describes the setup: several microphones each record a different linear mixture of the same simultaneous speakers, and the mixing matrix is unknown.",
          weight: 3,
          required: true,
        },
        {
          id: "independence-matches-the-truth",
          description:
            "ICA's assumption — that the sources are statistically independent — matches the actual generative structure, since the speakers really are independent of one another.",
          weight: 4,
          required: true,
        },
        {
          id: "why-pca-fails",
          description:
            "PCA's merely-uncorrelated components carry no such correspondence to the true sources, so its directions generally do not unmix the voices.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.29,
    discrimination: 1.5,
    expectedSeconds: 230,
    prereqClosure: ["ica", "pca", "covariance"],
    source: ML_07,
    status: "shadow",
  },

  // --- Principal Component Analysis ----------------------------------------
  {
    id: "pca--recall-practical-goal",
    conceptId: "pca",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State PCA's practical goal, as distinct from the linear-algebra machinery that computes it.",
    rubric: {
      elements: [
        {
          id: "dimension-reduction",
          description:
            "Project high-dimensional data onto a small number of directions — the top principal components.",
          weight: 3,
          required: true,
        },
        {
          id: "retain-variance",
          description: "Chosen so that as much of the variance as possible is retained.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.26,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["pca", "pca-matrix-edition", "covariance-matrix"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "pca--recall-what-it-cannot-promise",
    conceptId: "pca",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "PCA is legitimately used for all of the following EXCEPT:",
    choices: [
      {
        id: "a",
        text: "guaranteeing improved predictive accuracy on any supervised task",
        correct: true,
      },
      {
        id: "b",
        text: "visualising high-dimensional data in two or three dimensions",
        correct: false,
        misconception: {
          id: "visualisation-called-invalid",
          description:
            "Visualisation is a standard and valid use. What PCA cannot promise is that the retained directions are the predictive ones.",
          blameConceptId: "pca",
        },
      },
      {
        id: "c",
        text: "compressing data before another algorithm runs on it",
        correct: false,
        misconception: {
          id: "preprocessing-called-invalid",
          description:
            "Preprocessing is a standard use, and one of the main reasons PCA is fitted on the training split alone.",
          blameConceptId: "pca",
        },
      },
      {
        id: "d",
        text: "reducing noise by discarding low-variance directions",
        correct: false,
        misconception: {
          id: "denoising-called-invalid",
          description:
            "Denoising by truncation is a legitimate use — though it rests on the assumption that noise is what lives in the small directions.",
          blameConceptId: "pca",
        },
      },
    ],
    difficulty: 0.56,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["pca"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "pca--apply-effective-dimensionality",
    conceptId: "pca",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A 1,000-feature dataset has its top 10 principal components explaining 95% of the total variance. What does that tell you, and what does it license you to do?",
    rubric: {
      elements: [
        {
          id: "effective-dimensionality",
          description:
            "The data's effective dimensionality is far below 1,000 — the variation lives in a roughly 10-dimensional subspace.",
          weight: 4,
          required: true,
        },
        {
          id: "licenses-reduction",
          description:
            "So downstream models can train on 10 features rather than 1,000 at almost no cost in retained variation.",
          weight: 3,
          required: true,
        },
        {
          id: "caveat",
          description:
            "Bonus: notes the caveat — retained *variance* is not the same as retained *predictive* information.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.06,
    discrimination: 1.4,
    expectedSeconds: 170,
    prereqClosure: ["pca", "covariance-matrix"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "pca--explain-unsupervised-risk",
    conceptId: "pca",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "What is the key risk of PCA-based reduction before a supervised task, and what kind of alternative exists because of it?",
    rubric: {
      elements: [
        {
          id: "unsupervised-risk",
          description:
            "PCA never looks at the outcome, so a direction it discards for having little variance could be the most predictive one — variance is not relevance.",
          weight: 5,
          required: true,
        },
        {
          id: "supervised-alternatives",
          description:
            "Names supervised alternatives that choose directions using the target — linear discriminant analysis, partial least squares.",
          weight: 3,
          required: true,
        },
        {
          id: "concrete-case",
          description:
            "Bonus: gives a concrete case — a nuisance factor such as lighting or a batch effect dominating the variance while the signal sits in a small direction.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.76,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["pca", "covariance-matrix"],
    source: ML_07,
    status: "shadow",
  },
  {
    id: "pca--transfer-elbow-and-compression",
    conceptId: "pca",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "An image can be compressed by keeping only its largest singular values, and a scree plot is read for the elbow where extra components stop paying. What single fact about real data underlies both?",
    rubric: {
      elements: [
        {
          id: "rapid-decay",
          description:
            "Names the shared fact: real data's singular values decay rapidly, so its structure concentrates in a few dominant directions.",
          weight: 5,
          required: true,
        },
        {
          id: "two-views-of-one-thing",
          description:
            "States that the elbow and the discardable small singular values are two views of that same decay, not two separate phenomena.",
          weight: 4,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "treats-them-as-analogous",
          description:
            "Describes the two as 'similar ideas' without identifying the rapid singular-value decay that both are reading off.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.26,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["pca", "svd", "pca-matrix-edition"],
    source: ML_07,
    status: "shadow",
  },
];
