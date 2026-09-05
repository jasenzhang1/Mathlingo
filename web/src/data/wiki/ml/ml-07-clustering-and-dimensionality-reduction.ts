import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 7 — the unsupervised half of the domain: finding
 * groups, and finding the few directions that matter. Mirrors
 * `assessments/ml-07-clustering-and-dimensionality-reduction.md`.
 */

const clusteringMethods: WikiArticle = {
  conceptId: "clustering-methods",
  summary:
    "Clustering partitions data into groups of similar points with no labels to learn from. Because " +
    "there is no ground truth, the algorithm's definition of \"similar\" is the entire content of " +
    "the result — different definitions give different, equally valid answers on the same data, and " +
    "no held-out score can adjudicate between them.",

  sections: [
    {
      heading: "The main families",
      blocks: [
        {
          kind: "table",
          headers: ["Family", "Example", "Cluster shape assumed", "Needs k?"],
          rows: [
            ["Centroid-based", "K-means", "Convex, roughly spherical, similar size", "Yes"],
            ["Density-based", "DBSCAN, HDBSCAN", "Any shape; explicit noise points", "No — needs ε and minPts"],
            ["Hierarchical", "Agglomerative linkage", "Depends on the linkage rule", "No — cut the dendrogram later"],
            ["Distribution-based", "Gaussian mixture models", "Elliptical, via per-component covariance", "Yes"],
            ["Graph/spectral", "Spectral clustering", "Any shape connected in the affinity graph", "Yes"],
          ],
        },
        {
          kind: "prose",
          text:
            "Hierarchical methods deserve a note: they produce a whole nested family of clusterings " +
            "at once, presented as a dendrogram, so the choice of k is deferred to inspection rather " +
            "than made in advance. That is genuinely useful when the right granularity is itself the " +
            "question.",
        },
      ],
    },

    {
      heading: "Evaluating without labels",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Silhouette coefficient", description: "Per point: (b − a)/max(a, b), where a is the mean distance within its cluster and b to the nearest other cluster. Ranges from −1 to 1; near 0 means the point sits on a boundary." },
            { term: "Elbow method", description: "Plot within-cluster sum of squares against k and look for the kink. Honest about being a judgement call, and often there is no kink." },
            { term: "Gap statistic", description: "Compare the within-cluster dispersion to what a uniform reference distribution would give. More principled, considerably slower." },
            { term: "Stability", description: "Cluster many bootstrap resamples and check whether the same points keep landing together. Arguably the most convincing evidence available." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Every algorithm returns clusters, including on noise",
          text:
            "Run k-means with k = 4 on uniform random points and you get four tidy Voronoi cells " +
            "with a respectable silhouette score. The algorithm cannot tell you whether the " +
            "structure it found was there before it looked. Comparing against a null reference, as " +
            "the gap statistic does, is the only internal check that addresses this directly.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The metric is a modelling assumption, not a detail",
          text:
            "Euclidean distance assumes every feature contributes equally on the same scale; cosine " +
            "distance ignores magnitude entirely and looks only at direction, which is why it is the " +
            "default for text; Manhattan distance is more robust in high dimensions. Changing the " +
            "metric changes the clusters as decisively as changing the algorithm — and unlike the " +
            "algorithm, the metric choice is often made silently by a library default.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§14.3, Cluster Analysis" },
    { source: "James et al., An Introduction to Statistical Learning", locator: "§12.4, Clustering Methods" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-07-clustering-and-dimensionality-reduction.md" },
  ],
};

const kMeansClustering: WikiArticle = {
  conceptId: "k-means-clustering",
  summary:
    "K-means alternates between assigning each point to its nearest centroid and moving each " +
    "centroid to the mean of its assigned points. Both steps decrease the same objective, so it " +
    "always converges — to a local optimum that depends on where it started.",

  sections: [
    {
      heading: "Lloyd's algorithm",
      blocks: [
        {
          kind: "formula",
          latex: "minimise  Σₖ Σ_{x ∈ Cₖ} ‖x − μₖ‖²",
          caption: "Within-cluster sum of squares — the quantity both steps monotonically reduce",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Initialise k centroids (k-means++ rather than uniformly at random).",
            "Assignment step: attach every point to the nearest centroid. This cannot increase the objective, since each point moves to its cheapest option.",
            "Update step: set each centroid to the mean of its points. The mean is the unique minimiser of summed squared distance, so this cannot increase it either.",
            "Repeat until assignments stop changing.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Convergence is guaranteed; optimality is not",
          text:
            "The objective decreases at every step and there are finitely many possible assignments, " +
            "so the algorithm must terminate. But it terminates at a local minimum, and different " +
            "initialisations reach different ones — sometimes very different. Standard practice is " +
            "`n_init` restarts keeping the best objective, and k-means++ seeding, which spreads " +
            "initial centroids apart and gives an O(log k) approximation guarantee in expectation.",
        },
      ],
    },

    {
      heading: "The assumptions baked into the objective",
      blocks: [
        {
          kind: "list",
          items: [
            "Clusters are convex and isotropic — minimising squared Euclidean distance to a centre can only carve out Voronoi cells.",
            "Clusters are of comparable size and spread; a large diffuse cluster next to a small tight one gets split and merged wrongly.",
            "Every point belongs to exactly one cluster — there is no noise category, so outliers are forced into a cluster and drag its centroid.",
            "k is known in advance. The objective decreases monotonically in k, so it cannot be used to choose k.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Two concentric rings defeat it completely",
          text:
            "The natural clusters are an inner and an outer ring, but neither is convex and their " +
            "means coincide at the centre. K-means will slice the annulus into k pie wedges, every " +
            "one of them wrong. This is not a tuning failure — it is the objective doing exactly " +
            "what it says. DBSCAN, spectral clustering, or kernel k-means are the answers.",
        },
        {
          kind: "example",
          title: "Why the mean is the update rule",
          problem: "Given a fixed assignment, which centroid value minimises Σ‖x − μ‖²?",
          steps: [
            "Differentiate Σᵢ‖xᵢ − μ‖² with respect to μ: −2Σᵢ(xᵢ − μ).",
            "Set to zero: Σᵢxᵢ = |C|·μ.",
            "So μ = (1/|C|)Σᵢxᵢ, the sample mean.",
          ],
          answer:
            "The update step is not a heuristic — it is the exact minimiser given the assignment. Swap squared error for absolute error and the same argument returns the median, which is k-medoids and is far more robust to outliers.",
        },
      ],
    },
  ],

  references: [
    { source: "Arthur & Vassilvitskii, k-means++: The Advantages of Careful Seeding", locator: "SODA 2007" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§14.3.6, K-means Clustering" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-07-clustering-and-dimensionality-reduction.md" },
  ],
};

const svdForClustering: WikiArticle = {
  conceptId: "svd-for-clustering",
  summary:
    "Applying the SVD before clustering — the core of spectral clustering and of latent semantic " +
    "analysis — projects data into a low-dimensional space where groups that were tangled in the " +
    "original coordinates become linearly separable. The change of representation, not the " +
    "clustering algorithm, does the work.",

  sections: [
    {
      heading: "Why a projection first",
      blocks: [
        {
          kind: "prose",
          text:
            "K-means in the raw space suffers from the curse of dimensionality: distances " +
            "concentrate, so the nearest centroid is barely nearer than the others and the " +
            "assignments become noise-driven. Truncating the SVD to the top r singular directions " +
            "keeps the dominant structure and discards directions that are mostly noise, so " +
            "distances in the projected space carry far more signal per dimension.",
        },
        {
          kind: "formula",
          latex: "A ≈ U_r Σ_r V_rᵀ,   cluster the rows of U_r Σ_r instead of the rows of A",
          caption: "Truncated SVD as a preprocessing step for clustering",
        },
      ],
    },

    {
      heading: "Spectral clustering",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Build an affinity matrix W, typically Wᵢⱼ = exp(−γ‖xᵢ − xⱼ‖²) or a k-nearest-neighbour graph.",
            "Form the graph Laplacian L = D − W (or its normalised version).",
            "Take the eigenvectors of the k smallest eigenvalues as new coordinates.",
            "Run k-means in that eigenvector space.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The eigenvectors turn connectivity into geometry",
          text:
            "The Laplacian's small eigenvalues correspond to slowly varying functions on the graph — " +
            "ones that are nearly constant within a well-connected component and change across weak " +
            "links. Embedding points by those eigenvectors places connected groups at distinct " +
            "locations, so a non-convex cluster that k-means could never carve out becomes a compact " +
            "blob it handles trivially. The two concentric rings that defeat plain k-means separate " +
            "cleanly here.",
        },
        {
          kind: "prose",
          text:
            "The number of eigenvalues at or near zero equals the number of connected components, " +
            "which gives spectral methods a principled — if noisy in practice — way to suggest k. " +
            "The eigengap heuristic looks for the largest jump in the sorted eigenvalues.",
        },
      ],
    },

    {
      heading: "Latent semantic analysis, the same idea on text",
      blocks: [
        {
          kind: "prose",
          text:
            "Take a term–document matrix, truncate its SVD to a few hundred dimensions, and " +
            "documents that share no vocabulary but discuss the same topic land near each other: " +
            "\"car\" and \"automobile\" load on a common latent direction. Clustering in that space " +
            "groups by topic rather than by literal word overlap. The Eckart–Young theorem is what " +
            "guarantees the truncation is the best rank-r approximation available in the Frobenius " +
            "norm, so nothing better could have been kept.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Choosing r is a real decision, and both errors are costly",
          text:
            "Too few components and genuine distinctions are collapsed into one direction; too many " +
            "and the noise the projection was meant to remove is retained. Explained-variance curves " +
            "and the eigengap are the usual guides, and both are heuristics — this is the same " +
            "unfalsifiable-choice problem that runs through all of unsupervised learning.",
        },
      ],
    },
  ],

  references: [
    { source: "von Luxburg, A Tutorial on Spectral Clustering", locator: "Statistics and Computing 17(4), 2007" },
    { source: "Strang, Linear Algebra and Learning from Data", locator: "Ch. I.9 and IV.6, SVD and Clustering" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-07-clustering-and-dimensionality-reduction.md" },
  ],
};

const probabilisticPca: WikiArticle = {
  conceptId: "probabilistic-pca",
  summary:
    "Probabilistic PCA writes PCA as a latent variable model: a low-dimensional Gaussian latent z, " +
    "mapped linearly into data space, plus isotropic Gaussian noise. Maximum likelihood recovers " +
    "the ordinary principal components, and the probabilistic framing then buys everything a " +
    "density gives you that a projection does not.",

  sections: [
    {
      heading: "The generative model",
      blocks: [
        {
          kind: "formula",
          latex: "z ~ N(0, I_q),   x | z ~ N(Wz + μ, σ²I)   ⇒   x ~ N(μ, WWᵀ + σ²I)",
          caption: "A constrained Gaussian: the covariance is low-rank plus isotropic noise",
        },
        {
          kind: "prose",
          text:
            "The maximum likelihood estimate of W spans exactly the principal subspace of the sample " +
            "covariance, and as σ² → 0 the model's posterior mean projection converges to classical " +
            "PCA. So PPCA does not compete with PCA — it explains what PCA was implicitly assuming " +
            "all along: a Gaussian latent structure with equal noise in every direction.",
        },
      ],
    },

    {
      heading: "What the probabilistic framing buys",
      blocks: [
        {
          kind: "list",
          items: [
            "A likelihood, so models with different q can be compared by AIC/BIC or cross-validated likelihood instead of by eyeballing a scree plot.",
            "Principled handling of missing data — marginalise the unobserved coordinates instead of imputing them first.",
            "A density over x, which makes novelty detection possible: a genuinely low-probability point is identifiable, whereas classical PCA only reports a reconstruction error with no scale.",
            "An EM algorithm that never forms the d × d covariance matrix, so it scales to high dimensions where the eigendecomposition would not.",
            "A prior over W, giving Bayesian PCA and automatic relevance determination for choosing q.",
            "A natural extension to mixtures of PPCA — a different local linear subspace per component.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Relax the isotropic noise and you get factor analysis",
          text:
            "PPCA insists the noise variance is the same σ² in every dimension. Let each dimension " +
            "have its own noise variance — Ψ diagonal rather than σ²I — and the model becomes " +
            "factor analysis. That one change makes the model invariant to rescaling individual " +
            "features, which PCA notoriously is not. The two methods are neighbours in one family, " +
            "separated by a single assumption.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The latent axes are only identified up to rotation",
          text:
            "W and WR for any orthogonal R give the same distribution over x, so the individual " +
            "latent directions carry no meaning on their own — only the subspace they span does. " +
            "Interpreting \"factor 1\" as a specific concept requires an extra constraint (the PCA " +
            "ordering, a varimax rotation, a sparsity prior), not just a fit.",
        },
      ],
    },
  ],

  references: [
    { source: "Tipping & Bishop, Probabilistic Principal Component Analysis", locator: "JRSS-B 61(3), 1999" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§12.2, Probabilistic PCA" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-07-clustering-and-dimensionality-reduction.md" },
  ],
};

const kernelPca: WikiArticle = {
  conceptId: "kernel-pca",
  summary:
    "Kernel PCA runs PCA in the feature space induced by a kernel, so the components are nonlinear " +
    "functions of the original coordinates. It finds curved structure that linear PCA cannot, at " +
    "the cost of an n × n eigenproblem and the loss of a straightforward way back to input space.",

  sections: [
    {
      heading: "PCA rewritten in inner products",
      blocks: [
        {
          kind: "prose",
          text:
            "Ordinary PCA eigendecomposes the d × d covariance matrix. The dual formulation " +
            "eigendecomposes the n × n Gram matrix instead and recovers the same components, because " +
            "the two matrices share their non-zero eigenvalues. Since the Gram matrix is built " +
            "entirely from inner products, replacing them with a kernel performs PCA in the " +
            "feature space without ever computing φ.",
        },
        {
          kind: "formula",
          latex: "K̃ = K − 1ₙK − K1ₙ + 1ₙK1ₙ,   then eigendecompose K̃",
          caption: "Centring must be done in feature space, since φ(x) cannot be centred directly",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The centring step is not optional",
          text:
            "PCA assumes centred data. You cannot subtract the mean of φ(x) because you never " +
            "compute φ(x) — hence the double-centring formula above, which subtracts the feature-" +
            "space mean using only kernel evaluations. Skipping it makes the leading component " +
            "mostly encode the mean, and it is one of the most common kernel PCA implementation bugs.",
        },
      ],
    },

    {
      heading: "What it gains and what it costs",
      blocks: [
        {
          kind: "table",
          headers: ["", "PCA", "Kernel PCA"],
          rows: [
            ["Eigenproblem size", "d × d", "n × n"],
            ["Components available", "at most d", "up to n"],
            ["Structure captured", "Linear subspaces only", "Any structure the kernel can express"],
            ["Projecting a new point", "One matrix multiply", "n kernel evaluations against the training set"],
            ["Reconstructing input space", "Exact and trivial", "The pre-image problem — no closed form"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The pre-image problem is the real limitation",
          text:
            "A point in feature space usually has no exact counterpart in input space, because φ's " +
            "image is a curved surface rather than the whole space. So kernel PCA cannot denoise-" +
            "and-reconstruct the way linear PCA does; approximate pre-image methods exist and are " +
            "iterative and unreliable. If your use case is compression or reconstruction rather " +
            "than visualisation or feature extraction, this is disqualifying.",
        },
        {
          kind: "prose",
          text:
            "Cost also scales the wrong way for large datasets: PCA is O(d³) in the number of " +
            "features, kernel PCA is O(n³) in the number of samples. With a million rows and fifty " +
            "columns, linear PCA is instant and kernel PCA is infeasible without Nyström " +
            "approximation.",
        },
      ],
    },
  ],

  references: [
    { source: "Schölkopf, Smola & Müller, Nonlinear Component Analysis as a Kernel Eigenvalue Problem", locator: "Neural Computation 10(5), 1998" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§12.3, Kernel PCA" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-07-clustering-and-dimensionality-reduction.md" },
  ],
};

const tSne: WikiArticle = {
  conceptId: "t-sne",
  summary:
    "t-SNE builds a probability distribution over pairs of points in the original space, another in " +
    "two or three dimensions, and moves the low-dimensional points until the two distributions " +
    "match in KL divergence. It is a visualisation method — outstanding at showing local " +
    "neighbourhood structure, and untrustworthy about everything else.",

  sections: [
    {
      heading: "How it works",
      blocks: [
        {
          kind: "formula",
          latex: "minimise KL(P ‖ Q) = Σᵢⱼ pᵢⱼ log(pᵢⱼ / qᵢⱼ)",
          caption: "P from Gaussian similarities in high dimensions, Q from a Student-t in the map",
        },
        {
          kind: "prose",
          text:
            "The asymmetry of the KL divergence is the design. A large pᵢⱼ (truly close points) " +
            "paired with a small qᵢⱼ (placed far apart in the map) costs a great deal; the reverse " +
            "costs little. So the optimiser works very hard to keep true neighbours together and is " +
            "relaxed about where non-neighbours end up — which is precisely why local structure is " +
            "faithful and global structure is not.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The heavy-tailed t-distribution solves the crowding problem",
          text:
            "In high dimensions there is room for many points to be mutually equidistant; in two " +
            "dimensions there is not, so moderately distant points get crushed into the middle. " +
            "Using a Student-t with one degree of freedom for Q means a moderate qᵢⱼ can be achieved " +
            "at a much larger map distance than a Gaussian would allow, giving the map the room it " +
            "needs. The \"t\" in t-SNE is this fix.",
        },
      ],
    },

    {
      heading: "Reading a t-SNE plot honestly",
      blocks: [
        {
          kind: "list",
          items: [
            "Cluster sizes are meaningless — the algorithm expands dense clusters and contracts sparse ones.",
            "Distances between clusters are meaningless. Two clusters far apart in the map are not more different than two adjacent ones.",
            "Apparent clusters can appear in data with no cluster structure at all, especially at low perplexity.",
            "The result changes between runs (it is a non-convex optimisation with random initialisation) and changes a lot with perplexity, typically 5–50.",
            "There is no `transform` for new points: the embedding is fitted to a fixed dataset, not learned as a function.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Never feed t-SNE coordinates into a downstream model",
          text:
            "The two output dimensions are a picture, not features. Clustering on them, computing " +
            "distances in them, or training a classifier on them imports every distortion listed " +
            "above into a quantitative result. Use PCA, an autoencoder, or the raw features for " +
            "modelling; use t-SNE for looking.",
        },
        {
          kind: "prose",
          text:
            "The standard pipeline runs PCA to ~50 dimensions first and then t-SNE, which is faster " +
            "and less noise-sensitive than running t-SNE on raw high-dimensional data.",
        },
      ],
    },
  ],

  references: [
    { source: "van der Maaten & Hinton, Visualizing Data using t-SNE", locator: "JMLR 9, 2008" },
    { source: "Wattenberg, Viégas & Johnson, How to Use t-SNE Effectively", locator: "Distill, 2016" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-07-clustering-and-dimensionality-reduction.md" },
  ],
};

const umap: WikiArticle = {
  conceptId: "umap",
  summary:
    "UMAP builds a fuzzy topological representation of the data as a weighted neighbour graph and " +
    "finds a low-dimensional layout with a matching structure. It is substantially faster than " +
    "t-SNE, preserves more global structure, and can embed new points — but it inherits most of " +
    "t-SNE's interpretive caveats.",

  sections: [
    {
      heading: "What differs from t-SNE",
      blocks: [
        {
          kind: "table",
          headers: ["", "t-SNE", "UMAP"],
          rows: [
            ["Foundation", "Probability distributions over pairs, KL divergence", "Fuzzy simplicial sets from Riemannian geometry, cross-entropy"],
            ["Cost", "O(n log n) with Barnes-Hut, still slow at scale", "Substantially faster; routinely handles millions of points"],
            ["Global structure", "Largely discarded", "Better preserved, though still not metric"],
            ["New points", "Not supported", "`transform` is supported"],
            ["Main knobs", "perplexity, learning rate", "n_neighbors, min_dist"],
          ],
        },
        {
          kind: "definitions",
          items: [
            { term: "n_neighbors", description: "How much of the data is treated as local. Small values emphasise fine local structure; large values push the embedding towards a global view." },
            { term: "min_dist", description: "How tightly points may pack in the output. Small values give dense, well-separated clumps; larger values give a more evenly spread map." },
          ],
        },
      ],
    },

    {
      heading: "The same warnings still apply",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Better global structure is not trustworthy global structure",
          text:
            "UMAP's relative distances between clusters carry more information than t-SNE's, and " +
            "still not enough to quantify. Cluster sizes remain uninterpretable, apparent gaps can " +
            "be artefacts of n_neighbors, and running on noise still yields a plausible-looking " +
            "picture. Treat any structure as a hypothesis to check in the original space.",
        },
        {
          kind: "prose",
          text:
            "UMAP does support a supervised mode, where labels inform the graph construction and the " +
            "embedding separates known classes more strongly. That is useful for presentation and " +
            "dangerous for evidence: a supervised embedding that separates the classes is not " +
            "evidence the classes are separable.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Its speed is what changed practice",
          text:
            "t-SNE on a million cells is an overnight job; UMAP is minutes. That difference is why " +
            "UMAP became the default in single-cell genomics and other large-n exploratory settings " +
            "— not because the pictures are categorically better, but because iterating on them " +
            "became possible.",
        },
      ],
    },
  ],

  references: [
    { source: "McInnes, Healy & Melville, UMAP: Uniform Manifold Approximation and Projection", locator: "arXiv:1802.03426, 2018" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-07-clustering-and-dimensionality-reduction.md" },
  ],
};

const ica: WikiArticle = {
  conceptId: "ica",
  summary:
    "Independent component analysis separates a mixed signal into statistically independent " +
    "sources. Where PCA looks for uncorrelated directions of maximum variance, ICA looks for " +
    "maximally non-Gaussian, mutually independent ones — and that difference is exactly the " +
    "difference between second-order and higher-order structure.",

  sections: [
    {
      heading: "The cocktail party problem",
      blocks: [
        {
          kind: "formula",
          latex: "x = As    (observed mixtures x, unknown mixing A, independent sources s)",
          caption: "ICA estimates an unmixing matrix W ≈ A⁻¹ from x alone",
        },
        {
          kind: "prose",
          text:
            "Several microphones record several simultaneous speakers; each microphone hears a " +
            "different linear mixture. ICA recovers the individual voices using only the assumption " +
            "that the speakers are statistically independent of one another. The same structure " +
            "recovers artefact-free sources from EEG and MEG recordings, which is where the method " +
            "is most heavily used.",
        },
      ],
    },

    {
      heading: "Independence versus uncorrelatedness",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Uncorrelated is a statement about second moments only",
          text:
            "Let X be symmetric about zero and Y = X². Then Cov(X, Y) = E[X³] − E[X]E[X²] = 0, so X " +
            "and Y are uncorrelated — while Y is a deterministic function of X, which is as " +
            "dependent as two variables can be. PCA cannot tell these apart, because it only ever " +
            "consults the covariance matrix. ICA targets full independence, which requires " +
            "higher-order statistics.",
        },
        {
          kind: "table",
          headers: ["", "PCA", "ICA"],
          rows: [
            ["Objective", "Maximum variance", "Maximum independence / non-Gaussianity"],
            ["Statistics used", "Second order (covariance)", "Higher order (kurtosis, negentropy, mutual information)"],
            ["Components", "Orthogonal and ordered by variance", "Neither orthogonal nor ordered"],
            ["Typical purpose", "Compression, denoising, visualisation", "Source separation, artefact removal"],
          ],
        },
      ],
    },

    {
      heading: "Assumptions and ambiguities",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "At most one source may be Gaussian",
          text:
            "A rotation of independent Gaussians is again independent Gaussians with the same " +
            "distribution, so the mixing is unidentifiable in the Gaussian case — there is no " +
            "preferred rotation to find. Non-Gaussianity is not a technical nicety here; it is the " +
            "only thing that makes the problem solvable, which is why ICA algorithms maximise " +
            "kurtosis or negentropy as their objective.",
        },
        {
          kind: "list",
          items: [
            "The scale of each source is unidentifiable: doubling a source and halving its mixing column gives identical observations. Sources are conventionally normalised to unit variance.",
            "The order is unidentifiable too — there is no analogue of PCA's variance ordering, so components come out in arbitrary order.",
            "Data is whitened (usually with PCA) before ICA, which handles the second-order structure and leaves ICA to find the rotation.",
            "The mixing is assumed linear and instantaneous; echoes and delays require convolutive extensions.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Hyvärinen & Oja, Independent Component Analysis: Algorithms and Applications", locator: "Neural Networks 13(4), 2000" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§14.7, Independent Component Analysis" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-07-clustering-and-dimensionality-reduction.md" },
  ],
};

const pca: WikiArticle = {
  conceptId: "pca",
  summary:
    "Principal component analysis finds the orthogonal directions along which the data varies most, " +
    "and represents each observation by its coordinates along the first few. It is simultaneously " +
    "the maximum-variance projection, the minimum-reconstruction-error projection, and the " +
    "truncated SVD of the centred data — three descriptions of one object.",

  sections: [
    {
      heading: "Three equivalent definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Maximum variance", description: "The first component is the unit direction w maximising Var(Xw); each later one maximises variance subject to being orthogonal to all earlier ones." },
            { term: "Minimum reconstruction error", description: "The rank-r subspace minimising Σᵢ‖xᵢ − x̂ᵢ‖². Keeping the most variance and losing the least information are the same optimisation." },
            { term: "Eigen/SVD", description: "The components are the eigenvectors of the covariance matrix, equivalently the right singular vectors of the centred data matrix." },
          ],
        },
        {
          kind: "formula",
          latex: "Σ = (1/(n−1)) XᵀX = VΛVᵀ;   explained variance of PCⱼ = λⱼ / Σₖ λₖ",
          caption: "Eigenvalues are variances along their eigenvectors, which is what makes the scree plot readable",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Compute it from the SVD, not from the covariance matrix",
          text:
            "Forming XᵀX squares the condition number, so small singular values — exactly the ones " +
            "you are trying to identify as negligible — are computed with badly degraded accuracy. " +
            "Every serious implementation runs the SVD on the centred X directly. The Eckart–Young " +
            "theorem then certifies that the truncation is the best rank-r approximation in the " +
            "Frobenius and spectral norms alike.",
        },
      ],
    },

    {
      heading: "Using it well",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Centre the data. Skipping this makes the first component point at the mean, not at the variation.",
            "Standardise when features have different units — otherwise the component is chosen by whichever feature has the largest numbers.",
            "Fit on the training split only, then transform validation and test. Fitting on everything is textbook leakage.",
            "Choose r from the scree plot, a cumulative-variance threshold, or cross-validated downstream performance.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "PCA is unsupervised, so the top components need not be predictive",
          text:
            "Variance is not relevance. If the largest variation in the data is an irrelevant " +
            "nuisance — lighting in images, a batch effect in assays — PC1 captures it and the " +
            "signal you need may sit in PC17. Partial least squares and LDA use the target to choose " +
            "directions and are the right tools when prediction, rather than description, is the goal.",
        },
        {
          kind: "prose",
          text:
            "Components are linear combinations of all original features, so interpretability is " +
            "usually lost — \"0.3 × income − 0.2 × age + …\" rarely names anything. Sparse PCA " +
            "restores some of it by forcing most loadings to zero. And PCA can only find linear " +
            "structure: data on a curved manifold needs kernel PCA, an autoencoder, or a " +
            "neighbour-graph method.",
        },
      ],
    },
  ],

  references: [
    { source: "Jolliffe, Principal Component Analysis", locator: "Ch. 1–3" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§14.5, Principal Components, Curves and Surfaces" },
    { source: "Strang, Linear Algebra and Learning from Data", locator: "Ch. I.9, Principal Components and the Best Low Rank Matrix" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-07-clustering-and-dimensionality-reduction.md" },
  ],
};

export const ml07ClusteringAndDimensionalityReduction: WikiArticle[] = [
  clusteringMethods,
  kMeansClustering,
  svdForClustering,
  probabilisticPca,
  kernelPca,
  tSne,
  umap,
  ica,
  pca,
];
