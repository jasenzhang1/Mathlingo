import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./ml-sixty-shared";

/**
 * Clustering and embeddings (k-means through ICA) and feature scaling, each
 * brought from 30 to 60 questions. Feature scaling's pool had nothing below
 * level 5 or above 8, so its additions sit mostly at those ends.
 */

// ---------------------------------------------------------------------------
// k-means-clustering
// ---------------------------------------------------------------------------
const KM = "k-means-clustering";
const kmeans: Item[] = [
  // 1–10
  mcq(m(KM, "recall-k", "recall", 1, 15, "In $k$-means, what is $k$?"),
    "The number of clusters, chosen in advance",
    [
      ["The number of features", "k-features", "That's $d$."],
      ["The number of iterations", "k-iterations", "Iterations run until convergence."],
      ["The number of nearest neighbours", "k-neighbours", "That's $k$-NN."],
    ]),
  mcq(m(KM, "recall-assignment", "recall", 1, 15, "In the assignment step, each point is assigned to:"),
    "The nearest centroid",
    [
      ["A random centroid", "assign-random", "It's deterministic: the nearest one."],
      ["The largest cluster", "assign-largest", "Size doesn't matter."],
      ["The centroid it was assigned to first", "assign-first", "Assignments change each iteration."],
    ]),
  mcq(m(KM, "recall-update", "recall", 1, 15, "In the update step, each centroid moves to:"),
    "The mean of the points currently assigned to it",
    [
      ["The median of all points", "update-median", "It uses only its cluster's points, and the mean."],
      ["The farthest point", "update-farthest", "It moves to the cluster mean."],
      ["A random point", "update-random", "The update is deterministic."],
    ]),
  mcq(m(KM, "recall-local", "recall", 2, 20, "Lloyd's algorithm is guaranteed to converge to:"),
    "A local minimum of the within-cluster sum of squares, not necessarily the global one",
    [
      ["The global minimum", "kmeans-global", "Different starts can give different results."],
      ["Nothing — it may cycle forever", "kmeans-cycle", "The objective never increases and has finitely many states."],
      ["The true clusters", "kmeans-true", "It optimises an objective, which may not match true structure."],
    ]),
  num(m(KM, "apply-centroid", "apply", 2, 20, "A cluster contains $3$, $5$, $7$ and $13$. What is its centroid?"), 7),
  num(m(KM, "apply-wss", "apply", 3, 25, "Cluster $\\{3, 5, 7, 13\\}$ with centroid $7$. What is its within-cluster sum of squares?"), 56),
  num(m(KM, "apply-assign", "apply", 2, 20, "Centroids sit at $2$ and $10$. A point at $5.5$ is assigned to the centroid at which value?"), 2),
  num(m(KM, "apply-2d-centroid", "apply", 3, 25, "Points $(1, 1)$, $(3, 5)$ and $(5, 3)$ form a cluster. What is the $x$-coordinate of its centroid?"), 3),
  num(m(KM, "apply-one-iteration", "apply", 4, 40, "1-D data $\\{1, 3, 8, 12\\}$ start with centroids $1$ and $3$. After one assignment-and-update step, where is the second centroid? Give $4$ decimal places."), 7.6667),
  num(m(KM, "apply-cost", "apply", 4, 35, "One Lloyd iteration costs about $nkd$ distance computations. With $n = 10^{5}$, $k = 20$ and $d = 50$, how many (in millions)?"), 100),
  // 11–20
  num(m(KM, "apply-explained", "apply", 4, 35, "Total sum of squares is $400$ and within-cluster sum of squares is $100$. What fraction of variance do the clusters explain?"), 0.75),
  num(m(KM, "apply-kmeanspp", "apply", 5, 45, "$k$-means++ picks the next centroid with probability proportional to $D(x)^{2}$. With current centroid $0$ and points $1$, $2$ and $4$, what is the probability of picking $4$? Give $4$ decimal places."), 0.7619),
  num(m(KM, "apply-elbow", "apply", 5, 40, "WSS for $k = 1, \\ldots, 5$ is $200$, $90$, $50$, $44$, $40$. The drops are $110$, $40$, $6$, $4$. At which $k$ is the elbow?"), 3),
  short(m(KM, "explain-restarts", "explain", 6, 120, "Why is $k$-means usually run several times from different initialisations?"),
    [
      ["local", "Lloyd's algorithm converges to a local minimum that depends on the starting centroids", 2, true],
      ["best", "Running several times and keeping the solution with the lowest WSS reduces the risk of a poor local optimum", 2, true],
    ]),
  short(m(KM, "explain-assumptions", "explain", 6, 120, "What implicit assumptions about cluster shape does $k$-means make, and when do they fail?"),
    [
      ["shape", "It favours compact, roughly spherical clusters of similar size and spread (Euclidean distance to a centre)", 2, true],
      ["failure", "It fails on elongated, non-convex, very unequal-size or unequal-density clusters", 2, true],
    ]),
  mcq(m(KM, "explain-mean-optimal", "explain", 6, 50, "Why is the mean the right centroid update for $k$-means?"),
    "For a fixed assignment, the mean minimises the sum of squared distances to the cluster's points",
    [
      ["The median minimises squared distance", "kmeans-median", "The median minimises absolute distance."],
      ["It's an arbitrary convention", "kmeans-arbitrary", "It's the exact minimiser."],
      ["It maximises the margin", "kmeans-margin", "That's an SVM idea."],
    ]),
  num(m(KM, "transfer-k-equals-n", "transfer", 7, 60, "What is the within-cluster sum of squares when $k$ equals the number of distinct points?"), 0),
  mcq(m(KM, "transfer-em-limit", "transfer", 7, 60, "$k$-means is a limiting case of EM for which model?"),
    "A Gaussian mixture with equal spherical covariances whose variance shrinks to zero (hard assignments)",
    [
      ["A Bernoulli mixture", "kmeans-bernoulli", "The Gaussian connection gives Euclidean distance."],
      ["A hidden Markov model", "kmeans-hmm", "There's no temporal structure."],
      ["Naive Bayes", "kmeans-nb", "That's supervised."],
    ]),
  num(m(KM, "transfer-medoid", "transfer", 8, 60, "$k$-medoids restricts centres to data points. For the cluster $\\{1, 2, 3, 4, 20\\}$, which point minimises the sum of absolute distances to the others?"), 3),
  short(m(KM, "transfer-outliers", "transfer", 8, 150, "Why is $k$-means sensitive to outliers, and which variant reduces this?"),
    [
      ["squared", "Squared distances let a single far point pull a centroid strongly (means are not robust)", 2, true],
      ["variant", "$k$-medoids (or $k$-medians) uses actual points / medians and absolute distances, which are more robust", 2, true],
    ]),
  // 21–30
  num(m(KM, "transfer-gap-wss", "transfer", 8, 60, "Doubling $k$ from $4$ to $8$ on well-separated data with $4$ true clusters lowers WSS from $40$ to $28$. By what fraction did it fall?"), 0.3),
  mcq(m(KM, "transfer-scaling", "transfer", 9, 75, "Clustering customers on income (in dollars) and number of purchases without scaling makes $k$-means:"),
    "Cluster almost entirely by income, since it dominates squared Euclidean distance",
    [
      ["Cluster by purchases", "kmeans-purchases", "Purchases vary over a much smaller numeric range."],
      ["Ignore income", "kmeans-ignore-income", "Income dominates."],
      ["Be unaffected", "kmeans-unaffected", "Units directly set the distance weights."],
    ]),
  num(m(KM, "transfer-minibatch", "transfer", 9, 75, "Mini-batch $k$-means uses batches of $1{,}024$ from $n = 5$ million points. About how many batches make one pass over the data? Round to the nearest whole number."), 4883),
  short(m(KM, "transfer-np-hard", "transfer", 9, 150, "Finding the globally optimal $k$-means solution is NP-hard, yet $k$-means is used everywhere. Explain why this isn't a contradiction."),
    [
      ["heuristic", "Lloyd's algorithm is a fast heuristic that finds good local optima, especially with $k$-means++ seeding", 2, true],
      ["guarantees", "$k$-means++ gives an $O(\\log k)$ approximation in expectation, and restarts make results reliable in practice", 2, true],
    ]),
  num(m(KM, "transfer-assignments-count", "transfer", 10, 90, "How many ways are there to assign $5$ labelled points to $2$ non-empty, unlabelled clusters (the Stirling number $S(5, 2)$)?"), 15),
  mcq(m(KM, "transfer-high-dim", "transfer", 10, 90, "In very high dimensions with many noisy features, why can $k$-means become unreliable?"),
    "Distances concentrate, so differences between points are swamped by noise and assignments become unstable",
    [
      ["Centroids can't be computed", "highdim-centroids", "Means are always computable."],
      ["It always finds $k$ perfect clusters", "highdim-perfect", "Noise hurts it."],
      ["It needs labels in high dimensions", "highdim-labels", "It stays unsupervised."],
    ]),
  short(m(KM, "transfer-choosing-k", "transfer", 10, 180, "Compare the elbow method and the silhouette score for choosing $k$, giving one weakness of each."),
    [
      ["elbow", "Elbow: look where WSS stops dropping sharply; weakness — the elbow is often ambiguous", 2, true],
      ["silhouette", "Silhouette: pick $k$ maximising average silhouette; weakness — it favours convex, well-separated clusters and is costly for large $n$", 2, true],
    ]),
  mcq(m(KM, "recall-objective", "recall", 2, 20, "$k$-means minimises:"),
    "The total squared distance from points to their assigned centroids",
    [
      ["The number of clusters", "objective-k", "$k$ is fixed in advance."],
      ["The distance between centroids", "objective-centroids", "It's within-cluster distance."],
      ["Classification error", "objective-error", "It's unsupervised."],
    ]),
  num(m(KM, "apply-distance-squared", "apply", 3, 25, "A point $(4, 7)$ is assigned to centroid $(1, 3)$. What is its squared distance to the centroid?"), 25),
  num(m(KM, "apply-iterations-total", "apply", 3, 25, "$k$-means runs $10$ restarts of $15$ iterations each. How many Lloyd iterations in total?"), 150),
];

// ---------------------------------------------------------------------------
// svd-for-clustering
// ---------------------------------------------------------------------------
const SV = "svd-for-clustering";
const svd: Item[] = [
  // 1–10
  mcq(m(SV, "recall-svd", "recall", 1, 15, "The SVD factors a matrix $\\mathbf{X}$ as:"),
    "$\\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^{T}$, with orthogonal $\\mathbf{U}$, $\\mathbf{V}$ and non-negative diagonal $\\boldsymbol{\\Sigma}$",
    [
      ["$\\mathbf{L}\\mathbf{U}$, lower times upper triangular", "svd-lu", "That's LU decomposition."],
      ["$\\mathbf{Q}\\mathbf{R}$", "svd-qr", "That's QR decomposition."],
      ["A sum of cluster centroids", "svd-centroids", "SVD is a matrix factorisation."],
    ]),
  mcq(m(SV, "recall-truncated", "recall", 1, 15, "Truncated SVD keeps:"),
    "Only the top $r$ singular values and their singular vectors",
    [
      ["Only the smallest singular values", "truncated-smallest", "The largest carry the most structure."],
      ["Every singular value", "truncated-all", "That's the full SVD."],
      ["The diagonal of $\\mathbf{X}$", "truncated-diagonal", "It keeps singular components."],
    ]),
  mcq(m(SV, "recall-why", "recall", 1, 15, "Why reduce dimension with SVD before clustering?"),
    "To remove noise and redundancy so distances reflect the main structure, and to speed up clustering",
    [
      ["To add labels", "svd-labels", "SVD is unsupervised."],
      ["Because clustering requires exactly $2$ dimensions", "svd-2d", "Clustering works in any dimension."],
      ["To increase the number of features", "svd-more-features", "It reduces them."],
    ]),
  mcq(m(SV, "recall-lsa", "recall", 2, 20, "Applying truncated SVD to a term–document matrix is called:"),
    "Latent semantic analysis (LSA)",
    [
      ["Linear discriminant analysis", "lsa-lda", "LDA is supervised classification."],
      ["$k$-means", "lsa-kmeans", "LSA is a factorisation."],
      ["Word2vec", "lsa-word2vec", "Word2vec is a neural embedding."],
    ]),
  num(m(SV, "apply-energy", "apply", 2, 25, "Singular values are $6$, $3$ and $2$. What fraction of the total squared energy does the first capture? Give $4$ decimal places."), 0.7347),
  num(m(SV, "apply-max-rank", "apply", 2, 20, "A $500 \\times 40$ matrix has at most how many nonzero singular values?"), 40),
  num(m(SV, "apply-storage", "apply", 3, 30, "A rank-$r$ approximation of an $m \\times n$ matrix stores $r(m + n + 1)$ numbers. With $m = 1{,}000$, $n = 200$ and $r = 10$, how many?"), 12010),
  num(m(SV, "apply-reconstruction-error", "apply", 3, 30, "Singular values are $6$, $3$ and $2$. What is the squared Frobenius error of the best rank-$1$ approximation?"), 13),
  num(m(SV, "apply-rank-needed", "apply", 4, 35, "Squared singular values are $60$, $25$, $8$, $4$ and $3$. How many components capture at least $90\\%$ of the energy?"), 3),
  num(m(SV, "apply-projection", "apply", 4, 40, "A centred point $[3, 4]$ is projected onto the top right singular vector $\\mathbf{v}_1 = [0.6, 0.8]$. What is its coordinate?"), 5),
  // 11–20
  num(m(SV, "apply-full-cost", "apply", 5, 45, "A full SVD of an $n \\times d$ matrix costs about $nd^{2}$. With $n = 10^{5}$ and $d = 1{,}000$, how many operations (in units of $10^{11}$)?"), 1),
  mcq(m(SV, "apply-centring", "apply", 5, 40, "Why center the data before SVD-based clustering?"),
    "Otherwise the first singular vector mostly points toward the mean rather than capturing variation",
    [
      ["SVD can't run on uncentred data", "centre-cant-run", "It runs, but captures the mean."],
      ["Centring adds labels", "centre-labels", "It only removes the mean."],
      ["Centring is never needed", "centre-unneeded", "It matters for variance-based structure."],
    ]),
  num(m(SV, "apply-eckart-young", "apply", 4, 35, "By Eckart–Young, the best rank-$2$ approximation's squared error equals the sum of the discarded squared singular values. With singular values $5$, $4$, $2$ and $1$, what is it?"), 5),
  short(m(SV, "explain-denoise", "explain", 6, 120, "Explain how truncating the SVD can make clusters easier to find."),
    [
      ["signal", "The top singular directions capture the dominant shared structure (signal), while small ones are mostly noise", 2, true],
      ["distances", "Dropping the noisy directions makes distances between points reflect cluster structure more cleanly", 2, true],
    ]),
  short(m(SV, "explain-risk", "explain", 6, 120, "What is a genuine risk of reducing dimension with SVD before clustering?"),
    [
      ["discard", "The structure that separates the clusters may lie in a low-variance direction, which truncation discards", 2, true],
      ["variance-not-separation", "SVD keeps directions of high variance, not necessarily those that separate groups", 2, true],
    ]),
  mcq(m(SV, "explain-lsa-synonyms", "explain", 6, 50, "Two documents share no words but discuss the same topic. How can LSA place them close together?"),
    "Words that co-occur across the corpus load on the same latent dimensions, so documents using related words get similar coordinates",
    [
      ["LSA uses a dictionary of synonyms", "lsa-dictionary", "It learns from co-occurrence statistics."],
      ["LSA can't do this", "lsa-cant", "Capturing such latent similarity is its main purpose."],
      ["It counts letters instead of words", "lsa-letters", "It factorises the term–document matrix."],
    ]),
  num(m(SV, "transfer-randomised", "transfer", 7, 60, "Randomised SVD for a rank-$10$ approximation often uses $r + p$ random probes with oversampling $p = 10$. How many probe vectors is that?"), 20),
  mcq(m(SV, "transfer-kmeans-lowrank", "transfer", 7, 60, "How is $k$-means related to a low-rank approximation?"),
    "Replacing each point by its centroid gives a rank-at-most-$k$ approximation of the data, and $k$-means minimises its squared error over such cluster-constrained approximations",
    [
      ["They're unrelated", "kmeans-lowrank-unrelated", "Centroid replacement is a low-rank approximation."],
      ["$k$-means equals truncated SVD exactly", "kmeans-equals-svd", "SVD is the unconstrained optimum; $k$-means adds the cluster constraint."],
      ["$k$-means increases rank", "kmeans-increases-rank", "It reduces the effective rank."],
    ]),
  num(m(SV, "transfer-mp-edge", "transfer", 8, 60, "For pure noise of unit variance with aspect ratio $\\gamma = \\frac{d}{n}$, the largest eigenvalue of the sample covariance is about $(1 + \\sqrt{\\gamma})^{2}$. With $\\gamma = 0.25$, what is it?"), 2.25),
  short(m(SV, "transfer-co-clustering", "transfer", 8, 150, "How can the SVD be used to co-cluster rows and columns (e.g. documents and words) simultaneously?"),
    [
      ["joint", "Left singular vectors embed rows and right singular vectors embed columns in the same latent space", 2, true],
      ["cluster", "Clustering the combined embeddings (e.g. on a normalised bipartite matrix) groups rows with the columns that characterise them", 2, true],
    ]),
  // 21–30
  num(m(SV, "transfer-scree-gap", "transfer", 8, 60, "Singular values are $20$, $18$, $15$, $3$, $2.5$, $2$. Looking for the largest ratio between consecutive values, after how many components is the biggest gap?"), 3),
  mcq(m(SV, "transfer-nmf", "transfer", 9, 75, "Compared with truncated SVD, nonnegative matrix factorisation is often easier to interpret for clustering because:"),
    "Its factors are non-negative, giving additive, parts-based components that read like soft cluster memberships",
    [
      ["It's always more accurate", "nmf-accurate", "SVD gives the best low-rank fit in Frobenius norm."],
      ["Its factors are orthogonal", "nmf-orthogonal", "That's SVD; NMF factors needn't be."],
      ["It needs labels", "nmf-labels", "It's unsupervised."],
    ]),
  num(m(SV, "transfer-randomised-cost", "transfer", 9, 75, "Randomised SVD with $l = 20$ probes costs about $ndl$ operations versus $nd^{2}$ for a full SVD. With $d = 2{,}000$, what is the speed-up factor $\\frac{d}{l}$?"), 100),
  short(m(SV, "transfer-normalise-rows", "transfer", 9, 150, "In spectral-style clustering on SVD embeddings, rows are often normalised to unit length before $k$-means. Why?"),
    [
      ["direction", "Cluster identity is carried by the direction of each row's embedding, while its length reflects magnitude (e.g. document length or degree)", 2, true],
      ["effect", "Normalising removes the magnitude effect so $k$-means groups by direction", 2, true],
    ]),
  num(m(SV, "transfer-energy-tail", "transfer", 10, 90, "Squared singular values decay geometrically as $100 \\cdot 0.5^{j}$ for $j = 0, 1, 2, \\ldots$. What fraction of the total energy do the first $3$ components capture?"), 0.875),
  mcq(m(SV, "transfer-sparse", "transfer", 10, 90, "Why do practitioners use truncated SVD (e.g. `TruncatedSVD`) rather than PCA on very sparse TF–IDF matrices?"),
    "PCA centres the data, which destroys sparsity and creates a huge dense matrix; truncated SVD works on the sparse matrix directly",
    [
      ["PCA can't handle text", "pca-no-text", "It can, but centring densifies the matrix."],
      ["Truncated SVD gives labels", "tsvd-labels", "It's unsupervised."],
      ["They're always identical", "tsvd-pca-same", "They differ because of centring."],
    ]),
  short(m(SV, "transfer-choose-r", "transfer", 10, 180, "Describe two principled ways to choose the truncation rank $r$ for SVD before clustering."),
    [
      ["ways", "E.g. look for a gap/elbow in the singular values, keep enough energy (e.g. $90\\%$), compare against a random-matrix noise threshold, or pick $r$ by downstream clustering stability/quality", 4, true],
    ]),
  mcq(m(SV, "recall-singular-values", "recall", 2, 20, "Singular values are always:"),
    "Non-negative real numbers, conventionally sorted in decreasing order",
    [
      ["Possibly negative", "sv-negative", "They're non-negative by definition."],
      ["Complex numbers", "sv-complex", "For real matrices they're real."],
      ["Equal to the eigenvalues of $\\mathbf{X}$", "sv-eigenvalues", "They're square roots of the eigenvalues of $\\mathbf{X}^{T}\\mathbf{X}$."],
    ]),
  num(m(SV, "apply-sv-from-eig", "apply", 3, 25, "An eigenvalue of $\\mathbf{X}^{T}\\mathbf{X}$ is $49$. What is the corresponding singular value of $\\mathbf{X}$?"), 7),
  num(m(SV, "apply-frobenius", "apply", 3, 25, "Singular values are $3$, $4$ and $12$. What is the Frobenius norm of the matrix ($\\sqrt{\\sum \\sigma_i^{2}}$)?"), 13),
];

// ---------------------------------------------------------------------------
// probabilistic-pca
// ---------------------------------------------------------------------------
const PP = "probabilistic-pca";
const ppca: Item[] = [
  // 1–10
  mcq(m(PP, "recall-model", "recall", 1, 15, "Probabilistic PCA models each observation as:"),
    "$\\mathbf{x} = \\mathbf{W}\\mathbf{z} + \\boldsymbol{\\mu} + \\boldsymbol{\\varepsilon}$, with a Gaussian latent $\\mathbf{z}$ and isotropic Gaussian noise",
    [
      ["A deterministic projection with no noise", "ppca-deterministic", "PPCA adds explicit noise."],
      ["A mixture of discrete clusters", "ppca-clusters", "Its latent variable is continuous."],
      ["A decision tree output", "ppca-tree", "It's a linear Gaussian model."],
    ]),
  mcq(m(PP, "recall-latent-prior", "recall", 1, 15, "In PPCA, the latent variable $\\mathbf{z}$ has prior:"),
    "$\\mathcal{N}(\\mathbf{0}, \\mathbf{I})$",
    [
      ["Uniform on $[0, 1]$", "ppca-uniform", "It's a standard Gaussian."],
      ["$\\mathcal{N}(\\boldsymbol{\\mu}, \\boldsymbol{\\Sigma})$ with learned $\\boldsymbol{\\Sigma}$", "ppca-learned-prior", "The prior is fixed; $\\mathbf{W}$ absorbs the scaling."],
      ["Laplace", "ppca-laplace", "Non-Gaussian latents give ICA-like models."],
    ]),
  mcq(m(PP, "recall-limit", "recall", 1, 15, "As the noise variance $\\sigma^{2} \\to 0$, PPCA reduces to:"),
    "Ordinary PCA",
    [
      ["Factor analysis", "ppca-fa", "Factor analysis differs in its noise model."],
      ["$k$-means", "ppca-kmeans", "The latent stays continuous."],
      ["ICA", "ppca-ica", "ICA needs non-Gaussian sources."],
    ]),
  mcq(m(PP, "recall-vs-fa", "recall", 2, 20, "PPCA differs from factor analysis in that:"),
    "PPCA uses the same noise variance for every feature; factor analysis gives each feature its own",
    [
      ["PPCA has no noise", "ppca-fa-no-noise", "PPCA has isotropic noise."],
      ["Factor analysis has no latent variables", "fa-no-latent", "Both have latent factors."],
      ["They're identical", "ppca-fa-identical", "Their noise models differ."],
    ]),
  num(m(PP, "apply-marginal-variance", "apply", 2, 25, "In $1$-D PPCA with $W = 3$ and $\\sigma^{2} = 2$, what is the marginal variance of $x$ ($W^{2} + \\sigma^{2}$)?"), 11),
  num(m(PP, "apply-sigma-mle", "apply", 3, 30, "The MLE of $\\sigma^{2}$ is the average of the discarded eigenvalues. With eigenvalues $8$, $4$, $1.2$, $0.8$ and $1.0$ and $q = 2$ kept, what is it?"), 1),
  num(m(PP, "apply-params", "apply", 3, 30, "PPCA with $d = 20$ and $q = 3$ has $dq + 1 - \\frac{q(q - 1)}{2}$ covariance parameters. How many?"), 58),
  num(m(PP, "apply-scale", "apply", 3, 30, "The MLE column scale of $\\mathbf{W}$ is $\\sqrt{\\lambda_j - \\sigma^{2}}$. With $\\lambda_1 = 10$ and $\\sigma^{2} = 1$, what is it?"), 3),
  num(m(PP, "apply-covariance-entry", "apply", 4, 35, "With $\\mathbf{W} = [2, 1]$ (one latent dimension) and $\\sigma^{2} = 0.5$, what is the off-diagonal entry $C_{12}$ of $\\mathbf{C} = \\mathbf{W}\\mathbf{W}^{T} + \\sigma^{2}\\mathbf{I}$?"), 2),
  num(m(PP, "apply-covariance-diag", "apply", 4, 35, "Same setting. What is $C_{11}$?"), 4.5),
  // 11–20
  num(m(PP, "apply-posterior-mean", "apply", 5, 45, "$1$-D PPCA with $W = 2$, $\\sigma^{2} = 1$ and $\\mu = 0$: the posterior mean of $z$ given $x$ is $\\frac{W}{W^{2} + \\sigma^{2}}x$. For $x = 5$, what is it?"), 2),
  num(m(PP, "apply-posterior-variance", "apply", 5, 45, "Same setting. The posterior variance of $z$ is $\\frac{\\sigma^{2}}{W^{2} + \\sigma^{2}}$. What is it?"), 0.2),
  mcq(m(PP, "apply-missing", "apply", 5, 40, "A practical advantage of PPCA over standard PCA is that it can:"),
    "Handle missing values naturally by marginalising them in EM",
    [
      ["Use class labels", "ppca-labels", "It's unsupervised."],
      ["Find non-linear structure", "ppca-nonlinear", "It's still linear."],
      ["Avoid any matrix computations", "ppca-no-matrices", "It still uses linear algebra."],
    ]),
  short(m(PP, "explain-generative-uses", "explain", 6, 120, "Name two practical capabilities PPCA has because it's a probabilistic generative model."),
    [
      ["capabilities", "E.g. computing likelihoods (for model comparison or outlier detection), generating samples, handling missing data, Bayesian treatment of dimension, or mixtures of PPCAs", 4, true],
    ]),
  short(m(PP, "explain-rotation", "explain", 6, 120, "Why is the PPCA loading matrix $\\mathbf{W}$ only identified up to rotation?"),
    [
      ["invariance", "Replacing $\\mathbf{W}$ by $\\mathbf{W}\\mathbf{R}$ with orthogonal $\\mathbf{R}$ leaves $\\mathbf{W}\\mathbf{W}^{T}$, and so the likelihood, unchanged", 2, true],
      ["prior", "Because the latent prior $\\mathcal{N}(\\mathbf{0}, \\mathbf{I})$ is rotationally symmetric", 2, true],
    ]),
  mcq(m(PP, "explain-em", "explain", 6, 50, "Why can EM be attractive for fitting PPCA in high dimensions?"),
    "It avoids forming and eigendecomposing the full $d \\times d$ covariance, working with $d \\times q$ matrices instead",
    [
      ["EM always finds the exact answer in one step", "ppca-em-one-step", "It's iterative."],
      ["EM needs labels", "ppca-em-labels", "It's unsupervised."],
      ["EM makes the model non-linear", "ppca-em-nonlinear", "The model stays linear."],
    ]),
  num(m(PP, "transfer-loglik-dims", "transfer", 7, 60, "PPCA reduces $d = 64$ features to $q = 5$ latent dimensions. How many parameters does the loading matrix $\\mathbf{W}$ have?"), 320),
  mcq(m(PP, "transfer-outlier", "transfer", 7, 60, "How can PPCA flag outliers?"),
    "Points with very low likelihood under the fitted Gaussian $\\mathcal{N}(\\boldsymbol{\\mu}, \\mathbf{C})$ are unusual",
    [
      ["Points with the largest feature values", "outlier-largest", "Likelihood accounts for correlation, not just magnitude."],
      ["Points with missing values", "outlier-missing", "Missing values can be handled; they aren't outliers per se."],
      ["It can't", "outlier-cant", "Its likelihood makes outlier scoring natural."],
    ]),
  num(m(PP, "transfer-bic-params", "transfer", 8, 60, "Comparing $q = 2$ and $q = 3$ for $d = 10$ using the parameter count $dq + 1 - \\frac{q(q - 1)}{2}$, how many extra parameters does $q = 3$ add?"), 8),
  short(m(PP, "transfer-mixture", "transfer", 8, 150, "What is a mixture of probabilistic PCAs, and what kind of data suits it?"),
    [
      ["model", "Several PPCA models, each with its own mean and loadings, with mixing weights — fitted by EM", 2, true],
      ["data", "Data lying near several different low-dimensional linear subspaces (locally linear structure)", 2, true],
    ]),
  // 21–30
  num(m(PP, "transfer-noise-variance-sum", "transfer", 8, 60, "With $d = 6$ eigenvalues $9$, $5$, $1.5$, $1.2$, $1.0$ and $0.3$ and $q = 2$, what is the MLE noise variance?"), 1),
  mcq(m(PP, "transfer-bayesian-pca", "transfer", 9, 75, "Bayesian PCA places priors on the columns of $\\mathbf{W}$ (automatic relevance determination). What does this achieve?"),
    "Columns not supported by the data shrink to zero, automatically choosing the latent dimension",
    [
      ["It makes $\\mathbf{W}$ orthogonal", "bpca-orthogonal", "ARD prunes columns."],
      ["It removes noise entirely", "bpca-no-noise", "Noise is still modelled."],
      ["It adds labels", "bpca-labels", "It stays unsupervised."],
    ]),
  num(m(PP, "transfer-explained", "transfer", 9, 75, "With eigenvalues $12$, $6$, $1$ and $1$ and $q = 2$, the MLE $\\sigma^{2} = 1$. What fraction of total variance is attributed to the latent structure, $\\frac{\\sum_{j \\le q}(\\lambda_j - \\sigma^{2})}{\\sum_j \\lambda_j}$?"), 0.8),
  short(m(PP, "transfer-likelihood-selection", "transfer", 9, 150, "Why does PPCA's likelihood make choosing the number of components more principled than a scree plot?"),
    [
      ["criterion", "One can compare held-out log-likelihood or use BIC/marginal likelihood across $q$", 2, true],
      ["objective", "This gives a quantitative trade-off between fit and complexity instead of eyeballing an elbow", 2, true],
    ]),
  num(m(PP, "transfer-cov-det", "transfer", 10, 90, "$1$-latent PPCA in $2$-D with $\\mathbf{W} = [1, 1]$ and $\\sigma^{2} = 1$ gives $\\mathbf{C} = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$. What is $\\det\\mathbf{C}$?"), 3),
  mcq(m(PP, "transfer-vae-link", "transfer", 10, 90, "How does a linear variational autoencoder with Gaussian decoder relate to PPCA?"),
    "With a linear decoder and Gaussian assumptions it recovers the PPCA solution; non-linear decoders generalise it",
    [
      ["They're unrelated", "vae-ppca-unrelated", "Linear VAEs reduce to PPCA."],
      ["VAEs can't be linear", "vae-not-linear", "A linear decoder is a valid special case."],
      ["PPCA is a type of GAN", "ppca-gan", "PPCA is a latent-variable Gaussian model."],
    ]),
  short(m(PP, "transfer-noise-model", "transfer", 10, 180, "When would factor analysis be preferred over PPCA, given their noise models?"),
    [
      ["heteroscedastic", "When features have very different noise levels (e.g. different sensors), since FA gives each its own noise variance", 2, true],
      ["consequence", "PPCA's single $\\sigma^{2}$ would let noisy features masquerade as latent structure", 2, true],
    ]),
  mcq(m(PP, "recall-noise", "recall", 2, 20, "PPCA's noise term $\\boldsymbol{\\varepsilon}$ is distributed as:"),
    "$\\mathcal{N}(\\mathbf{0}, \\sigma^{2}\\mathbf{I})$",
    [
      ["$\\mathcal{N}(\\mathbf{0}, \\boldsymbol{\\Psi})$ with diagonal $\\boldsymbol{\\Psi}$", "noise-fa", "That's factor analysis."],
      ["Uniform", "noise-uniform", "It's Gaussian."],
      ["Zero", "noise-zero", "That's the PCA limit."],
    ]),
  num(m(PP, "apply-std-from-var", "apply", 3, 25, "PPCA estimates noise variance $\\sigma^{2} = 0.36$. What is the noise standard deviation?"), 0.6),
  num(m(PP, "apply-latent-sample", "apply", 4, 35, "With $W = 1.5$, $\\mu = 2$, latent $z = 2$ and noise $\\varepsilon = -0.5$, what is the generated $x = Wz + \\mu + \\varepsilon$?"), 4.5),
];

// ---------------------------------------------------------------------------
// kernel-pca
// ---------------------------------------------------------------------------
const KP = "kernel-pca";
const kpca: Item[] = [
  // 1–10
  mcq(m(KP, "recall-what", "recall", 1, 15, "Kernel PCA performs PCA:"),
    "In a high-dimensional feature space defined by a kernel, without computing the features explicitly",
    [
      ["On the raw features only", "kpca-raw", "That's ordinary PCA."],
      ["On the labels", "kpca-labels", "It's unsupervised."],
      ["On a random subset of features", "kpca-random", "It works in kernel feature space."],
    ]),
  mcq(m(KP, "recall-matrix", "recall", 1, 15, "Kernel PCA eigendecomposes:"),
    "The centred $n \\times n$ kernel (Gram) matrix",
    [
      ["The $d \\times d$ covariance matrix", "kpca-covariance", "That's ordinary PCA."],
      ["The label vector", "kpca-label-vector", "There are no labels."],
      ["The distance matrix without centring", "kpca-uncentred", "The Gram matrix must be centred."],
    ]),
  mcq(m(KP, "recall-nonlinear", "recall", 1, 15, "Kernel PCA is useful when:"),
    "The data's important structure is non-linear, so linear projections miss it",
    [
      ["The data are already linear", "kpca-linear-data", "Then ordinary PCA suffices."],
      ["You need class labels", "kpca-need-labels", "It's unsupervised."],
      ["The dataset is enormous", "kpca-enormous", "Its $n \\times n$ matrix makes huge $n$ hard."],
    ]),
  mcq(m(KP, "recall-linear-kernel", "recall", 2, 20, "Kernel PCA with the linear kernel is equivalent to:"),
    "Ordinary PCA",
    [
      ["LDA", "kpca-lda", "LDA uses labels."],
      ["$k$-means", "kpca-kmeans", "$k$-means clusters."],
      ["ICA", "kpca-ica", "ICA seeks independence."],
    ]),
  num(m(KP, "apply-gram-size", "apply", 2, 20, "Kernel PCA on $n = 2{,}000$ points works with a Gram matrix of how many entries (in millions)?"), 4),
  num(m(KP, "apply-max-components", "apply", 3, 25, "With $n = 150$ points, at most how many nonzero kernel principal components are there after centring ($n - 1$)?"), 149),
  num(m(KP, "apply-rbf-self", "apply", 2, 20, "What is the RBF kernel value of a point with itself?"), 1),
  num(m(KP, "apply-variance-fraction", "apply", 3, 30, "Centred Gram eigenvalues are $8$, $4$, $2$ and $2$. What fraction do the first two capture?"), 0.75),
  num(m(KP, "apply-centring-entry", "apply", 4, 40, "Centring uses $\\tilde{K}_{ij} = K_{ij} - \\bar{K}_{i\\cdot} - \\bar{K}_{\\cdot j} + \\bar{K}_{\\cdot\\cdot}$. With $K_{12} = 0.5$, row-$1$ mean $0.6$, column-$2$ mean $0.7$ and grand mean $0.65$, what is $\\tilde{K}_{12}$?"), -0.15),
  num(m(KP, "apply-projection", "apply", 4, 40, "A new point's projection onto a kernel component is $\\sum_i \\alpha_i \\tilde{k}(\\mathbf{x}_i, \\mathbf{x})$. With $\\boldsymbol{\\alpha} = [0.5, -0.5, 0.2]$ and centred kernel values $[0.4, 0.1, 0.5]$, what is it?"), 0.25),
  // 11–20
  num(m(KP, "apply-nystrom", "apply", 5, 45, "A Nyström approximation with $m = 300$ landmarks for $n = 60{,}000$ points needs an $n \\times m$ block. How many entries (in millions)?"), 18),
  num(m(KP, "apply-memory", "apply", 5, 40, "Storing a dense $n \\times n$ Gram matrix in $8$-byte floats for $n = 50{,}000$ takes how many gigabytes (using $10^{9}$ bytes per GB)?"), 20),
  mcq(m(KP, "apply-circles", "apply", 5, 40, "Two concentric circles of points: which method can separate them along its first component?"),
    "Kernel PCA with an RBF kernel",
    [
      ["Ordinary PCA", "circles-pca", "No straight line separates concentric circles."],
      ["LDA without labels", "circles-lda", "LDA needs labels and is linear."],
      ["Truncated SVD", "circles-svd", "It's linear."],
    ]),
  short(m(KP, "explain-centring", "explain", 6, 120, "Ordinary PCA centres the data; kernel PCA can't centre features it never computes. How does it handle centring?"),
    [
      ["double-centre", "It centres the Gram matrix instead: $\\tilde{\\mathbf{K}} = \\mathbf{J}\\mathbf{K}\\mathbf{J}$ with $\\mathbf{J} = \\mathbf{I} - \\frac{1}{n}\\mathbf{1}\\mathbf{1}^{T}$", 2, true],
      ["equivalence", "This equals the inner products of mean-centred feature vectors", 2, true],
    ]),
  short(m(KP, "explain-preimage", "explain", 6, 120, "What is the pre-image problem in kernel PCA, and why does it arise?"),
    [
      ["problem", "Mapping a point from feature space (e.g. a denoised projection) back to an input that produces it", 2, true],
      ["why", "The feature map isn't invertible and most feature-space points have no exact pre-image, so an approximate optimisation is needed", 2, true],
    ]),
  mcq(m(KP, "explain-scaling", "explain", 6, 50, "Why is kernel PCA rarely used directly on millions of points?"),
    "The $n \\times n$ Gram matrix costs $O(n^{2})$ memory and its eigendecomposition $O(n^{3})$ time",
    [
      ["It needs labels for each point", "kpca-labels-cost", "It's unsupervised."],
      ["It only works in $2$-D", "kpca-2d", "It works in any dimension."],
      ["It requires a GPU", "kpca-gpu", "Cost, not hardware, is the barrier."],
    ]),
  num(m(KP, "transfer-cost-ratio", "transfer", 7, 60, "Eigendecomposition costs about $n^{3}$. How many times longer does it take for $n = 20{,}000$ than for $n = 5{,}000$?"), 64),
  mcq(m(KP, "transfer-spectral-link", "transfer", 7, 60, "How is kernel PCA related to spectral clustering?"),
    "Both embed points using leading eigenvectors of a similarity (kernel or graph) matrix, then work in that embedding",
    [
      ["They're unrelated", "kpca-spectral-unrelated", "Both are eigenvector embeddings of similarity matrices."],
      ["Spectral clustering uses labels", "spectral-labels", "Both are unsupervised."],
      ["Kernel PCA is a clustering algorithm", "kpca-clustering", "It produces an embedding."],
    ]),
  num(m(KP, "transfer-scaled-eigenvalue", "transfer", 8, 60, "A centred Gram eigenvalue $\\lambda_K = 300$ for $n = 100$ points corresponds to a feature-space variance of $\\frac{\\lambda_K}{n}$. What is it?"), 3),
  short(m(KP, "transfer-bandwidth", "transfer", 8, 150, "How does the RBF bandwidth affect kernel PCA's components, and how might you choose it?"),
    [
      ["effect", "A tiny bandwidth makes every point dissimilar (near-identity Gram, many equal components); a huge one makes everything similar (near-linear behaviour)", 2, true],
      ["choose", "Tune it by a downstream task, reconstruction/pre-image error, or a heuristic like the median distance", 2, true],
    ]),
  // 21–30
  num(m(KP, "transfer-rff-features", "transfer", 8, 60, "Approximating kernel PCA with $D = 1{,}000$ random Fourier features turns it into ordinary PCA on an $n \\times D$ matrix. With $n = 10^{6}$, how many entries is that (in billions)?"), 1),
  mcq(m(KP, "transfer-visualisation", "transfer", 9, 75, "Why is kernel PCA less used for visualisation than t-SNE or UMAP?"),
    "It's sensitive to the kernel choice and often fails to separate neighbourhoods as clearly, while also scaling poorly",
    [
      ["It can't produce $2$-D output", "kpca-no-2d", "It can, using two components."],
      ["It requires labels", "kpca-vis-labels", "It's unsupervised."],
      ["It's identical to t-SNE", "kpca-tsne", "They optimise different objectives."],
    ]),
  num(m(KP, "transfer-variance-check", "transfer", 9, 75, "Centred Gram eigenvalues are $5$, $3$, $1$, $0.6$ and $0.4$. How many components are needed to capture at least $90\\%$?"), 3),
  short(m(KP, "transfer-mercer-link", "transfer", 9, 150, "Why does kernel PCA require a valid (Mercer) kernel?"),
    [
      ["psd", "The Gram matrix must be positive semidefinite so its eigenvalues (variances in feature space) are non-negative", 2, true],
      ["meaning", "Otherwise there's no feature space for which it's an inner product, and the “variances” would be meaningless", 2, true],
    ]),
  num(m(KP, "transfer-landmark-error", "transfer", 10, 90, "A Nyström approximation keeps the top $m$ eigenvalues exactly. With true eigenvalues $10$, $5$, $2$, $1$, $1$, $1$ and rank $m = 3$, what is the sum of the eigenvalues it drops?"), 3),
  mcq(m(KP, "transfer-denoising", "transfer", 10, 90, "How can kernel PCA denoise images?"),
    "Project noisy images onto the top kernel components, then solve the pre-image problem to map back to image space",
    [
      ["By deleting noisy pixels", "denoise-delete", "It projects in feature space."],
      ["By training on clean labels", "denoise-labels", "It's unsupervised."],
      ["By increasing the number of components", "denoise-more-components", "Keeping fewer components removes noise."],
    ]),
  short(m(KP, "transfer-out-of-sample", "transfer", 10, 180, "How is a new point embedded with a fitted kernel PCA, and what must be stored from training?"),
    [
      ["compute", "Compute its kernel values with all training points, centre them using the training statistics, and take weighted sums with each component's coefficients", 2, true],
      ["store", "This requires storing the training points (or landmarks) and the eigenvector coefficients", 2, true],
    ]),
  mcq(m(KP, "recall-kpca-unsupervised", "recall", 2, 20, "Is kernel PCA supervised or unsupervised?"),
    "Unsupervised",
    [
      ["Supervised", "kpca-supervised", "It uses no labels."],
      ["Reinforcement learning", "kpca-rl", "There's no reward."],
      ["Semi-supervised", "kpca-semi", "It uses no labels at all."],
    ]),
  num(m(KP, "apply-gram-symmetric", "apply", 3, 25, "A Gram matrix for $n$ points is symmetric. For $n = 40$, how many distinct entries need computing, including the diagonal ($\\frac{n(n + 1)}{2}$)?"), 820),
  num(m(KP, "apply-poly-kpca", "apply", 4, 35, "Kernel PCA with $(\\mathbf{x} \\cdot \\mathbf{z})^{2}$ on $2$-D inputs works in a feature space of how many distinct monomials ($x_1^{2}$, $x_1x_2$, $x_2^{2}$)?"), 3),
];

// ---------------------------------------------------------------------------
// t-sne
// ---------------------------------------------------------------------------
const TS = "t-sne";
const tsne: Item[] = [
  // 1–10
  mcq(m(TS, "recall-use", "recall", 1, 15, "t-SNE is mainly used for:"),
    "Visualising high-dimensional data in $2$ or $3$ dimensions",
    [
      ["Classification", "tsne-classification", "It's an embedding method."],
      ["Feature selection", "tsne-feature-selection", "It creates new coordinates."],
      ["Regression", "tsne-regression", "It doesn't predict targets."],
    ]),
  mcq(m(TS, "recall-preserves", "recall", 1, 15, "t-SNE mainly preserves:"),
    "Local neighbourhoods — which points are near which",
    [
      ["Global distances between clusters", "tsne-global", "Global distances are not reliably preserved."],
      ["The original features' values", "tsne-features", "Coordinates are new."],
      ["Cluster sizes", "tsne-sizes", "Sizes can be distorted."],
    ]),
  mcq(m(TS, "recall-name", "recall", 1, 15, "The “t” in t-SNE refers to:"),
    "The Student-$t$ distribution used for similarities in the low-dimensional map",
    [
      ["Time", "tsne-time", "It refers to Student's $t$."],
      ["Tree", "tsne-tree", "Barnes–Hut trees speed it up, but aren't the name."],
      ["Transpose", "tsne-transpose", "It's the $t$ distribution."],
    ]),
  mcq(m(TS, "recall-perplexity", "recall", 2, 20, "t-SNE's perplexity parameter roughly sets:"),
    "The effective number of neighbours each point considers",
    [
      ["The number of output dimensions", "perplexity-dims", "That's separate."],
      ["The learning rate", "perplexity-lr", "That's another setting."],
      ["The number of clusters", "perplexity-clusters", "t-SNE doesn't choose a cluster count."],
    ]),
  num(m(TS, "apply-perplexity", "apply", 2, 25, "Perplexity is $2^{H}$, where $H$ is the entropy (in bits) of a point's neighbour distribution. What perplexity does $H = 5$ give?"), 32),
  num(m(TS, "apply-entropy", "apply", 3, 30, "What entropy $H$ (in bits) corresponds to perplexity $50$? Give $4$ decimal places."), 5.6439),
  num(m(TS, "apply-student-t", "apply", 3, 30, "The low-dimensional affinity is proportional to $\\frac{1}{1 + d^{2}}$. What is it for distance $d = 2$?"), 0.2),
  num(m(TS, "apply-symmetrise", "apply", 3, 30, "Symmetrised affinities are $p_{ij} = \\frac{p_{j \\mid i} + p_{i \\mid j}}{2n}$. With $p_{j \\mid i} = 0.3$, $p_{i \\mid j} = 0.1$ and $n = 100$, what is $p_{ij}$?"), 0.002),
  num(m(TS, "apply-kl-term", "apply", 4, 40, "One pair has $p_{ij} = 0.04$ and $q_{ij} = 0.01$. What is its KL contribution $p_{ij}\\ln\\frac{p_{ij}}{q_{ij}}$? Give $4$ decimal places."), 0.0555),
  num(m(TS, "apply-exaggeration", "apply", 4, 35, "Early exaggeration multiplies $p_{ij}$ by $12$. A pair with $p_{ij} = 0.0025$ is temporarily treated as what?"), 0.03),
  // 11–20
  num(m(TS, "apply-heavy-tail", "apply", 5, 45, "Compare the Student-$t$ affinity $\\frac{1}{1 + d^{2}}$ with a Gaussian $e^{-d^{2}}$ at $d = 3$. What is the ratio $\\frac{1/(1 + 9)}{e^{-9}}$? Round to the nearest whole number."), 810),
  num(m(TS, "apply-pairs", "apply", 5, 40, "Exact t-SNE considers all pairs. For $n = 20{,}000$ points, how many unordered pairs (in millions)?"), 199.99),
  mcq(m(TS, "apply-new-points", "apply", 5, 40, "Why can't a fitted t-SNE map directly embed new points?"),
    "Standard t-SNE optimises coordinates for the given points; it learns no mapping function to apply to new data",
    [
      ["New points need labels", "tsne-new-labels", "It's unsupervised."],
      ["t-SNE is too fast", "tsne-fast", "Speed isn't the issue."],
      ["It can — it's a linear projection", "tsne-linear", "It's a non-parametric embedding."],
    ]),
  short(m(TS, "explain-cluster-size", "explain", 6, 120, "Why is it a mistake to read cluster sizes or the distances between clusters in a t-SNE plot as meaningful?"),
    [
      ["local", "t-SNE preserves local neighbourhoods; it adapts densities per point, expanding dense clusters and compressing sparse ones", 2, true],
      ["global", "Between-cluster gaps depend on perplexity, initialisation and optimisation, not true distances", 2, true],
    ]),
  short(m(TS, "explain-heavy-tail", "explain", 6, 120, "Why does t-SNE use a heavy-tailed Student-$t$ distribution in the low-dimensional space?"),
    [
      ["crowding", "To fix the crowding problem: there's far less room in $2$-D than in high dimensions for moderately distant neighbours", 2, true],
      ["effect", "Heavy tails let moderately distant points sit far apart, separating clusters clearly", 2, true],
    ]),
  mcq(m(TS, "explain-kl", "explain", 6, 50, "t-SNE minimises KL divergence $\\sum p_{ij}\\ln\\frac{p_{ij}}{q_{ij}}$. What does this asymmetric choice emphasise?"),
    "Keeping close high-dimensional neighbours close in the map; placing far points near each other is penalised much less",
    [
      ["Preserving large distances", "kl-large-distances", "Large $p_{ij}$ pairs dominate, which are close pairs."],
      ["Equal treatment of all pairs", "kl-equal", "KL is asymmetric."],
      ["Maximising variance", "kl-variance", "That's PCA."],
    ]),
  num(m(TS, "transfer-barnes-hut", "transfer", 7, 60, "Barnes–Hut t-SNE costs about $n\\log n$ instead of $n^{2}$. For $n = 100{,}000$ (with $\\log_2 n \\approx 17$), what is the speed-up factor $\\frac{n}{\\log_2 n}$? Round to the nearest whole number."), 5882),
  mcq(m(TS, "transfer-different-runs", "transfer", 7, 60, "Two t-SNE runs on the same data look different. Why?"),
    "The objective is non-convex and the initialisation is random, so runs reach different local optima (and arbitrary rotations/reflections)",
    [
      ["The data changed", "runs-data-changed", "The data are the same."],
      ["t-SNE uses labels", "runs-labels", "It's unsupervised."],
      ["One run has a bug", "runs-bug", "Variation is expected."],
    ]),
  num(m(TS, "transfer-perplexity-limit", "transfer", 8, 60, "A rule of thumb requires perplexity below $\\frac{n - 1}{3}$. With $n = 91$ points, what is the largest allowed perplexity?"), 30),
  short(m(TS, "transfer-pca-init", "transfer", 8, 150, "Why do modern t-SNE implementations often initialise with PCA rather than randomly?"),
    [
      ["global", "PCA initialisation preserves more global structure, which t-SNE's local objective doesn't restore", 2, true],
      ["reproducible", "It also makes results more reproducible across runs", 2, true],
    ]),
  // 21–30
  num(m(TS, "transfer-crowding", "transfer", 8, 60, "In $10$ dimensions, up to $11$ points can be mutually equidistant ($d + 1$). How many can be mutually equidistant in $2$ dimensions?"), 3),
  mcq(m(TS, "transfer-clustering-on-tsne", "transfer", 9, 75, "Is it sound to run $k$-means on t-SNE coordinates and report the clusters as real?"),
    "Risky — t-SNE can create apparent clusters and distort density; cluster in the original space or validate carefully",
    [
      ["Yes, t-SNE coordinates are true distances", "tsne-true-distances", "They aren't."],
      ["Yes, always", "tsne-always", "Its distortions can mislead clustering."],
      ["It's impossible to cluster $2$-D coordinates", "tsne-impossible", "It's possible but questionable."],
    ]),
  num(m(TS, "transfer-gradient-term", "transfer", 9, 75, "The t-SNE gradient for point $i$ includes $4(p_{ij} - q_{ij})\\frac{\\mathbf{y}_i - \\mathbf{y}_j}{1 + \\|\\mathbf{y}_i - \\mathbf{y}_j\\|^{2}}$. With $p_{ij} - q_{ij} = 0.01$ and a $1$-D separation of $1$, what is this term?"), 0.02),
  short(m(TS, "transfer-perplexity-effect", "transfer", 9, 150, "How does changing perplexity from $5$ to $100$ typically change a t-SNE plot?"),
    [
      ["low", "Low perplexity focuses on very local structure: many small, fragmented clusters", 2, true],
      ["high", "High perplexity considers more neighbours: smoother, more global structure, merged clusters", 2, true],
    ]),
  num(m(TS, "transfer-q-normalisation", "transfer", 10, 90, "Three map points have pairwise distances $1$, $1$ and $2$. With unnormalised affinities $\\frac{1}{1 + d^{2}}$ (each pair counted twice in the denominator), what is $q$ for one of the distance-$1$ pairs? Give $4$ decimal places."), 0.2083),
  mcq(m(TS, "transfer-reading", "transfer", 10, 90, "Which conclusion can you safely draw from a t-SNE plot alone?"),
    "Points shown close together are likely similar in the original space",
    [
      ["Cluster A is twice as spread out as cluster B", "tsne-spread", "Spreads are distorted."],
      ["Cluster A is farther from B than from C", "tsne-cluster-distance", "Between-cluster distances aren't reliable."],
      ["There are exactly $5$ clusters", "tsne-count", "Apparent clusters can be artefacts of perplexity."],
    ]),
  short(m(TS, "transfer-parametric", "transfer", 10, 180, "What is parametric t-SNE, and what problem of standard t-SNE does it solve?"),
    [
      ["definition", "A neural network is trained to map inputs to the embedding by minimising the t-SNE objective", 2, true],
      ["solves", "It gives an explicit function, so new points can be embedded without re-running the optimisation", 2, true],
    ]),
  mcq(m(TS, "recall-output-dims", "recall", 2, 20, "A typical t-SNE visualisation uses how many output dimensions?"),
    "$2$ (sometimes $3$)",
    [
      ["$10$", "tsne-10d", "Visualisation needs $2$ or $3$."],
      ["The same as the input", "tsne-same-dims", "It reduces dimension."],
      ["$1$", "tsne-1d", "Two is standard."],
    ]),
  num(m(TS, "apply-affinity-d1", "apply", 3, 25, "What is the unnormalised Student-$t$ affinity $\\frac{1}{1 + d^{2}}$ at $d = 1$?"), 0.5),
  num(m(TS, "apply-perplexity-uniform", "apply", 4, 35, "If a point's neighbour distribution is uniform over exactly $16$ neighbours, what is its perplexity?"), 16),
];

// ---------------------------------------------------------------------------
// umap
// ---------------------------------------------------------------------------
const UM = "umap";
const umap: Item[] = [
  // 1–10
  mcq(m(UM, "recall-what", "recall", 1, 15, "UMAP is primarily a method for:"),
    "Non-linear dimensionality reduction, often for visualisation",
    [
      ["Supervised classification", "umap-classification", "It's mainly an embedding method."],
      ["Gradient boosting", "umap-boosting", "Unrelated."],
      ["Hypothesis testing", "umap-testing", "It produces embeddings."],
    ]),
  mcq(m(UM, "recall-graph", "recall", 1, 15, "UMAP begins by building:"),
    "A weighted $k$-nearest-neighbour graph of the data",
    [
      ["A decision tree", "umap-tree", "It builds a neighbour graph."],
      ["A covariance matrix", "umap-covariance", "That's PCA."],
      ["A set of cluster centroids", "umap-centroids", "That's $k$-means."],
    ]),
  mcq(m(UM, "recall-n-neighbors", "recall", 1, 15, "Increasing UMAP's `n_neighbors` tends to:"),
    "Emphasise more global structure at the expense of fine local detail",
    [
      ["Focus on finer local detail", "nn-local", "Fewer neighbours do that."],
      ["Change the output dimension", "nn-dimension", "That's `n_components`."],
      ["Have no effect", "nn-none", "It strongly shapes the embedding."],
    ]),
  mcq(m(UM, "recall-min-dist", "recall", 2, 20, "UMAP's `min_dist` controls:"),
    "How tightly points may be packed together in the embedding",
    [
      ["The number of neighbours", "min-dist-neighbours", "That's `n_neighbors`."],
      ["The minimum distance between clusters", "min-dist-clusters", "It concerns point packing, not cluster gaps."],
      ["The learning rate", "min-dist-lr", "It's a layout parameter."],
    ]),
  num(m(UM, "apply-edges", "apply", 2, 20, "A $k$NN graph with $n = 20{,}000$ points and $k = 10$ has how many directed edges?"), 200000),
  num(m(UM, "apply-fuzzy-union", "apply", 3, 30, "UMAP symmetrises with the fuzzy union $w_{ij} + w_{ji} - w_{ij}w_{ji}$. With $w_{ij} = 0.6$ and $w_{ji} = 0.5$, what is it?"), 0.8),
  num(m(UM, "apply-local-weight", "apply", 3, 30, "UMAP's local weight is $e^{-(d - \\rho)/\\sigma}$. With $d = 2$, $\\rho = 1$ and $\\sigma = 1$, what is it? Give $4$ decimal places."), 0.3679),
  num(m(UM, "apply-nearest-weight", "apply", 3, 25, "What weight does UMAP give a point's nearest neighbour, where $d = \\rho$?"), 1),
  num(m(UM, "apply-low-dim-similarity", "apply", 4, 35, "UMAP's low-dimensional similarity is $\\frac{1}{1 + a d^{2b}}$. With $a = b = 1$ and $d = 2$, what is it?"), 0.2),
  num(m(UM, "apply-negative-samples", "apply", 4, 35, "With $5$ negative samples per positive edge and $300{,}000$ positive edges sampled per epoch, how many negative samples per epoch?"), 1500000),
  // 11–20
  num(m(UM, "apply-cross-entropy-term", "apply", 5, 45, "UMAP's cross-entropy term for an attractive edge is $-w\\ln v$. With $w = 1$ and low-dimensional similarity $v = 0.5$, what is it? Give $4$ decimal places."), 0.6931),
  mcq(m(UM, "apply-new-points", "apply", 5, 40, "Unlike classic t-SNE, standard UMAP implementations can:"),
    "Transform new points into an existing embedding",
    [
      ["Use labels by default", "umap-labels-default", "Supervision is optional."],
      ["Guarantee global distances", "umap-global", "Global distances still aren't guaranteed."],
      ["Run without a neighbour graph", "umap-no-graph", "The graph is central."],
    ]),
  num(m(UM, "apply-repulsive-term", "apply", 5, 45, "The repulsive cross-entropy term is $-(1 - w)\\ln(1 - v)$. With $w = 0$ and $v = 0.75$, what is it? Give $4$ decimal places."), 1.3863),
  short(m(UM, "explain-vs-tsne", "explain", 6, 120, "Compared with t-SNE, give two practical reasons an analyst might choose UMAP."),
    [
      ["reasons", "UMAP is usually faster and scales to larger data, tends to preserve more global structure, and can embed new points / produce more than $2$ dimensions for downstream use", 4, true],
    ]),
  short(m(UM, "explain-cautions", "explain", 6, 120, "Give two cautions when interpreting a UMAP plot."),
    [
      ["cautions", "Distances between clusters and cluster sizes/densities aren't reliable; results depend on `n_neighbors` and `min_dist`; apparent clusters may be artefacts", 4, true],
    ]),
  mcq(m(UM, "explain-manifold", "explain", 6, 50, "UMAP's theory assumes the data are:"),
    "Uniformly distributed on a low-dimensional manifold embedded in the high-dimensional space",
    [
      ["Gaussian clusters", "umap-gaussian", "It makes a manifold assumption."],
      ["Linearly separable", "umap-linear", "It's for non-linear structure."],
      ["Labelled", "umap-labelled", "It's unsupervised by default."],
    ]),
  num(m(UM, "transfer-sigma", "transfer", 7, 60, "UMAP chooses each point's $\\sigma$ so that $\\sum_j e^{-(d_j - \\rho)/\\sigma} = \\log_2 k$. With $k = 16$, what target sum is used?"), 4),
  mcq(m(UM, "transfer-supervised", "transfer", 7, 60, "How does supervised UMAP use labels?"),
    "It combines the data's neighbour graph with label information, pulling same-label points together in the embedding",
    [
      ["It replaces the data with labels", "sumap-replace", "It uses both."],
      ["It trains a classifier first", "sumap-classifier", "It modifies the graph."],
      ["It ignores labels", "sumap-ignore", "That's unsupervised UMAP."],
    ]),
  num(m(UM, "transfer-embedding-dims", "transfer", 8, 60, "UMAP is used to reduce $768$-dimensional text embeddings to $15$ dimensions before clustering. By what factor is the dimension reduced? Give $1$ decimal place."), 51.2),
  short(m(UM, "transfer-clustering", "transfer", 8, 150, "Running HDBSCAN on a UMAP embedding is a popular pipeline. Give one reason it works well and one risk."),
    [
      ["works", "UMAP concentrates local neighbourhoods, making density-based clusters easier to find than in the raw high-dimensional space", 2, true],
      ["risk", "UMAP can create or exaggerate separations, so clusters must be validated in the original space or by stability", 2, true],
    ]),
  // 21–30
  num(m(UM, "transfer-graph-memory", "transfer", 8, 60, "A $k$NN graph with $n = 10^{6}$ and $k = 30$ stores each edge as an index and a weight ($12$ bytes). How many megabytes (using $10^{6}$ bytes per MB)?"), 360),
  mcq(m(UM, "transfer-linear-alternative", "transfer", 9, 75, "When should a linear method like PCA be preferred over UMAP?"),
    "When you need interpretable axes, reproducible projections, preserved global variance, or a transform for downstream modelling with guarantees",
    [
      ["Never", "pca-never", "PCA has clear advantages in some uses."],
      ["When the data are non-linear", "pca-nonlinear", "That favours UMAP."],
      ["Only for $2$-D data", "pca-2d", "PCA works in any dimension."],
    ]),
  num(m(UM, "transfer-ab-fit", "transfer", 9, 75, "With $a = 1.6$ and $b = 0.9$, what is the low-dimensional similarity $\\frac{1}{1 + a d^{2b}}$ at $d = 1$? Give $4$ decimal places."), 0.3846),
  short(m(UM, "transfer-reproducibility", "transfer", 9, 150, "UMAP results vary between runs. What makes them vary, and how would you make an analysis reproducible?"),
    [
      ["sources", "Random initialisation and stochastic optimisation (negative sampling), plus approximate nearest-neighbour search", 2, true],
      ["fix", "Fix the random seed (accepting slower, single-threaded runs), and report parameters; check conclusions across several seeds", 2, true],
    ]),
  num(m(UM, "transfer-union-symmetric", "transfer", 10, 90, "With fuzzy union $w_{ij} + w_{ji} - w_{ij}w_{ji}$, what is the symmetric weight if both directed weights are $0.3$?"), 0.51),
  mcq(m(UM, "transfer-density", "transfer", 10, 90, "Why can dense and sparse clusters look similarly sized in UMAP?"),
    "Each point's neighbourhood scale $\\sigma$ adapts to local density, normalising away density differences",
    [
      ["UMAP measures density exactly", "umap-density-exact", "It normalises local scale."],
      ["Clusters must be equal size", "umap-equal-size", "No such constraint exists."],
      ["Because of the output dimension", "umap-output-dims", "The adaptive scale is the cause."],
    ]),
  short(m(UM, "transfer-densmap", "transfer", 10, 180, "What does densMAP add to UMAP, and why?"),
    [
      ["adds", "A term that preserves local density (how spread out each point's neighbourhood is)", 2, true],
      ["why", "Plain UMAP equalises local densities, hiding real differences in cluster spread", 2, true],
    ]),
  mcq(m(UM, "recall-umap-name", "recall", 2, 20, "UMAP stands for:"),
    "Uniform manifold approximation and projection",
    [
      ["Unsupervised mean averaging procedure", "umap-wrong-name", "It's uniform manifold approximation and projection."],
      ["Universal matrix analysis protocol", "umap-matrix", "That's not it."],
      ["Uniform model aggregation process", "umap-aggregation", "That's not it."],
    ]),
  num(m(UM, "apply-edges-undirected", "apply", 3, 25, "After symmetrising, a $k$NN graph with $n = 1{,}000$ and $k = 15$ has at most how many undirected edges?"), 15000),
  num(m(UM, "apply-weight-ratio", "apply", 4, 35, "With $\\rho = 1$ and $\\sigma = 0.5$, what is the local weight for a neighbour at distance $1.5$? Give $4$ decimal places."), 0.3679),
];

// ---------------------------------------------------------------------------
// ica
// ---------------------------------------------------------------------------
const IC = "ica";
const ica: Item[] = [
  // 1–10
  mcq(m(IC, "recall-goal", "recall", 1, 15, "Independent component analysis aims to:"),
    "Recover statistically independent source signals from observed mixtures of them",
    [
      ["Find directions of maximum variance", "ica-variance", "That's PCA."],
      ["Cluster the data", "ica-cluster", "It separates signals."],
      ["Predict a label", "ica-predict", "It's unsupervised."],
    ]),
  mcq(m(IC, "recall-cocktail", "recall", 1, 15, "The classic illustration of ICA is:"),
    "The cocktail-party problem: separating individual voices from several microphone recordings",
    [
      ["Classifying handwritten digits", "ica-digits", "That's classification."],
      ["Recommending movies", "ica-recommend", "That's collaborative filtering."],
      ["Forecasting sales", "ica-forecast", "That's time-series forecasting."],
    ]),
  mcq(m(IC, "recall-gaussian", "recall", 1, 15, "ICA cannot separate sources that are:"),
    "Gaussian (more than one of them)",
    [
      ["Uniform", "ica-uniform", "Uniform sources are non-Gaussian and separable."],
      ["Sparse", "ica-sparse", "Sparse sources are very non-Gaussian."],
      ["Audio signals", "ica-audio", "Audio is a classic ICA application."],
    ]),
  mcq(m(IC, "recall-ambiguities", "recall", 2, 20, "ICA recovers sources only up to:"),
    "Their order, scale and sign",
    [
      ["An additive constant only", "ica-constant", "Order, scale and sign are all ambiguous."],
      ["Nothing — sources are recovered exactly", "ica-exact", "These ambiguities are inherent."],
      ["A rotation", "ica-rotation", "Rotation ambiguity is what non-Gaussianity removes."],
    ]),
  num(m(IC, "apply-kurtosis-gaussian", "apply", 2, 20, "What is the excess kurtosis of a Gaussian?"), 0),
  mcq(m(IC, "apply-kurtosis-uniform", "apply", 3, 25, "A uniform distribution has excess kurtosis $-1.2$. How does that classify it?"),
    "Sub-Gaussian — lighter tails than a Gaussian",
    [
      ["Super-Gaussian — heavier tails", "uniform-super", "Negative excess kurtosis means lighter tails."],
      ["Gaussian", "uniform-gaussian", "A Gaussian has excess kurtosis $0$."],
      ["Impossible to say from kurtosis", "uniform-unknown", "The sign of excess kurtosis classifies it."],
    ]),
  num(m(IC, "apply-mixing", "apply", 3, 25, "With mixing $x_1 = 3s_1 + s_2$, $s_1 = 2$ and $s_2 = -1$, what is $x_1$?"), 5),
  num(m(IC, "apply-unmix", "apply", 3, 30, "With mixing matrix $\\mathbf{A} = \\begin{bmatrix} 2 & 0 \\\\ 0 & 4 \\end{bmatrix}$ and observation $\\mathbf{x} = [6, 8]$, what is the recovered $s_2$?"), 2),
  num(m(IC, "apply-unmix-full", "apply", 4, 40, "With $\\mathbf{A} = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ and $\\mathbf{x} = [5, 2]$, solving $\\mathbf{x} = \\mathbf{A}\\mathbf{s}$, what is $s_1$?"), 3),
  num(m(IC, "apply-sources-count", "apply", 4, 35, "Square ICA on $16$ EEG channels can recover at most how many independent components?"), 16),
  // 11–20
  mcq(m(IC, "apply-laplace-kurtosis", "apply", 4, 35, "Speech signals are often modelled as Laplace-distributed, with excess kurtosis $3$. Why does that suit ICA?"),
    "They're strongly super-Gaussian (peaked, heavy-tailed), so they're far from Gaussian and easy for ICA to separate",
    [
      ["They're Gaussian, which ICA needs", "laplace-gaussian", "ICA needs non-Gaussian sources."],
      ["They're sub-Gaussian", "laplace-sub", "Positive excess kurtosis means super-Gaussian."],
      ["Kurtosis is irrelevant to ICA", "kurtosis-irrelevant", "Non-Gaussianity is what ICA exploits."],
    ]),
  num(m(IC, "apply-whitening", "apply", 5, 45, "Whitening a $1$-D signal with variance $9$ divides it by its standard deviation. What does a value of $6$ become?"), 2),
  mcq(m(IC, "apply-pca-vs-ica", "apply", 5, 40, "How do PCA and ICA differ in what they require of components?"),
    "PCA requires only uncorrelated components; ICA requires statistically independent ones",
    [
      ["PCA requires independence; ICA only uncorrelatedness", "pca-ica-swapped", "It's the reverse."],
      ["Both require only uncorrelatedness", "both-uncorrelated", "ICA's independence is stronger."],
      ["Neither imposes any requirement", "neither-requirement", "Both impose structure."],
    ]),
  short(m(IC, "explain-uncorrelated-not-independent", "explain", 6, 120, "Give an example of two variables that are uncorrelated but not independent, and explain why that matters for ICA."),
    [
      ["example", "E.g. $X$ symmetric about $0$ and $Y = X^{2}$: $\\text{Cov}(X, Y) = 0$, yet $Y$ is determined by $X$", 2, true],
      ["matters", "Uncorrelatedness (what whitening/PCA gives) leaves a rotation unresolved; ICA uses higher-order dependence to fix it", 2, true],
    ]),
  short(m(IC, "explain-gaussian-unidentifiable", "explain", 6, 120, "Why can't ICA separate two Gaussian sources?"),
    [
      ["rotation", "Any rotation of independent Gaussians is still independent Gaussian — the joint distribution is rotationally symmetric", 2, true],
      ["consequence", "So no unique unmixing exists; at most one source may be Gaussian", 2, true],
    ]),
  mcq(m(IC, "explain-clt", "explain", 6, 50, "Why does maximising non-Gaussianity tend to recover the sources?"),
    "By the central limit theorem, mixtures of independent sources are more Gaussian than the sources themselves",
    [
      ["Sources are always Gaussian", "sources-gaussian", "They must be non-Gaussian."],
      ["Mixing makes signals less Gaussian", "mixing-less-gaussian", "Mixing makes them more Gaussian."],
      ["It maximises variance", "ica-max-variance", "That's PCA's criterion."],
    ]),
  num(m(IC, "transfer-negentropy", "transfer", 7, 60, "A kurtosis-based contrast scores a component by $\\text{kurt}^{2}$. With excess kurtosis $-1.2$, what is the score?"), 1.44),
  mcq(m(IC, "transfer-eeg", "transfer", 7, 60, "How is ICA used to remove eye-blink artefacts from EEG?"),
    "Unmix the channels, identify the component matching blinks, zero it, and remix the remaining components",
    [
      ["Delete the frontal electrodes", "eeg-delete", "That loses brain signal too."],
      ["Low-pass filter everything", "eeg-filter", "Blinks overlap brain frequencies."],
      ["Train a classifier on blinks", "eeg-classifier", "ICA separates them without labels."],
    ]),
  num(m(IC, "transfer-scale-ambiguity", "transfer", 8, 60, "A source $s$ with mixing column $\\mathbf{a}$ gives the same data as source $2s$ with column $\\frac{1}{2}\\mathbf{a}$. If $\\mathbf{a} = [4, 6]$, what is the second entry of the rescaled column?"), 3),
  short(m(IC, "transfer-fastica", "transfer", 8, 150, "Describe the FastICA approach to finding one component."),
    [
      ["whiten", "Whiten the data, then search for a unit vector $\\mathbf{w}$ maximising the non-Gaussianity of $\\mathbf{w}^{T}\\mathbf{x}$", 2, true],
      ["fixed-point", "It uses a fast fixed-point (Newton-like) update with a non-linearity such as $\\tanh$, then normalises $\\mathbf{w}$", 2, true],
    ]),
  // 21–30
  num(m(IC, "transfer-whitened-params", "transfer", 8, 60, "After whitening $d$-dimensional data, the unmixing matrix is orthogonal, with $\\frac{d(d - 1)}{2}$ free parameters. How many for $d = 8$?"), 28),
  mcq(m(IC, "transfer-more-sources", "transfer", 9, 75, "There are $5$ speakers but only $3$ microphones. What is the difficulty for standard ICA?"),
    "It's under-determined — more sources than mixtures — so standard square ICA can't recover all sources",
    [
      ["None — ICA always recovers all sources", "ica-all-sources", "Square ICA needs at least as many mixtures as sources."],
      ["ICA needs more speakers than microphones", "ica-more-speakers", "It's the other way round."],
      ["Microphones must be Gaussian", "ica-mics-gaussian", "Sources, not microphones, must be non-Gaussian."],
    ]),
  num(m(IC, "transfer-mixture-kurtosis", "transfer", 9, 75, "Averaging $n$ independent sources each with excess kurtosis $\\kappa$ gives excess kurtosis $\\frac{\\kappa}{n}$. With $\\kappa = 6$ and $n = 4$, what is it?"), 1.5),
  short(m(IC, "transfer-likelihood", "transfer", 9, 150, "Write the ICA log-likelihood for an unmixing matrix $\\mathbf{W}$ (with $\\mathbf{s} = \\mathbf{W}\\mathbf{x}$) and explain its two parts."),
    [
      ["formula", "$\\ell(\\mathbf{W}) = \\sum_t \\sum_i \\log p_i(\\mathbf{w}_i^{T}\\mathbf{x}_t) + T\\log|\\det\\mathbf{W}|$", 2, true],
      ["parts", "The first scores how well each recovered source fits a non-Gaussian source density; the Jacobian term accounts for the change of variables", 2, true],
    ]),
  num(m(IC, "transfer-det", "transfer", 10, 90, "For unmixing matrix $\\mathbf{W} = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$, what is $\\log|\\det\\mathbf{W}|$? Give $4$ decimal places."), 1.6094),
  mcq(m(IC, "transfer-fmri", "transfer", 10, 90, "In fMRI, spatial ICA treats each component as:"),
    "An independent spatial map with its own time course, revealing brain networks without a task model",
    [
      ["A single voxel", "fmri-voxel", "Components are spatial maps across many voxels."],
      ["A classifier output", "fmri-classifier", "ICA is unsupervised."],
      ["Gaussian noise only", "fmri-noise", "Components capture structured signals."],
    ]),
  short(m(IC, "transfer-ordering", "transfer", 10, 180, "Since ICA components have no natural order (unlike PCA), how might you rank or select them in practice?"),
    [
      ["criteria", "E.g. by explained variance after back-projection, by non-Gaussianity/kurtosis, by correlation with known artefacts or reference signals, or by expert inspection", 4, true],
    ]),
  mcq(m(IC, "recall-whiten-first", "recall", 2, 20, "ICA algorithms usually first:"),
    "Centre and whiten the data (often with PCA)",
    [
      ["Sort the data", "ica-sort", "Sorting isn't part of ICA."],
      ["Add labels", "ica-labels", "It's unsupervised."],
      ["Square every value", "ica-square", "Whitening is the standard preprocessing."],
    ]),
  num(m(IC, "apply-mixture-value", "apply", 3, 25, "With $x_2 = s_1 - 2s_2$, $s_1 = 4$ and $s_2 = 1.5$, what is $x_2$?"), 1),
  num(m(IC, "apply-sign-flip", "apply", 4, 35, "ICA returns a source estimate of $-3$ when the true source value is $3$. Up to which sign factor is it recovered? Answer $1$ or $-1$."), -1),
];

// ---------------------------------------------------------------------------
// feature-scaling (levels 5–8 only so far)
// ---------------------------------------------------------------------------
const FS = "feature-scaling";
const scaling: Item[] = [
  // 1–10
  mcq(m(FS, "recall-what", "recall", 1, 15, "What does feature scaling do?"),
    "Puts features on comparable numeric ranges",
    [
      ["Removes features", "scaling-removes", "It rescales; nothing is removed."],
      ["Adds new features", "scaling-adds", "It transforms existing ones."],
      ["Changes the labels", "scaling-labels", "It applies to inputs."],
    ]),
  mcq(m(FS, "recall-standardisation", "recall", 1, 15, "Standardisation transforms a feature to have:"),
    "Mean $0$ and standard deviation $1$",
    [
      ["Range $[0, 1]$", "standardise-range", "That's min-max normalisation."],
      ["Median $0$ only", "standardise-median", "Robust scaling uses the median."],
      ["All positive values", "standardise-positive", "Standardised values can be negative."],
    ]),
  mcq(m(FS, "recall-minmax", "recall", 1, 15, "Min-max normalisation maps a feature's training values to:"),
    "The range $[0, 1]$",
    [
      ["Mean $0$, standard deviation $1$", "minmax-standard", "That's standardisation."],
      ["The range $[-1, 1]$ always", "minmax-neg-one", "The usual target is $[0, 1]$."],
      ["Integers", "minmax-integers", "It produces real values."],
    ]),
  mcq(m(FS, "recall-trees", "recall", 1, 15, "Which model is essentially unaffected by feature scaling?"),
    "A decision tree",
    [
      ["$k$-nearest neighbours", "trees-knn", "Distances depend on scale."],
      ["An RBF-kernel SVM", "trees-svm", "Kernel distances depend on scale."],
      ["$k$-means", "trees-kmeans", "Distances depend on scale."],
    ]),
  mcq(m(FS, "recall-fit-on-train", "recall", 2, 20, "Scaling parameters (mean, standard deviation, min, max) should be computed from:"),
    "The training set only",
    [
      ["The full dataset", "fit-full", "That leaks test information."],
      ["The test set", "fit-test", "The test set must stay untouched."],
      ["Each new batch separately at deployment", "fit-batch", "Deployment uses the training statistics."],
    ]),
  mcq(m(FS, "recall-robust", "recall", 2, 20, "Robust scaling uses:"),
    "The median and interquartile range instead of the mean and standard deviation",
    [
      ["The minimum and maximum", "robust-minmax", "That's min-max scaling."],
      ["The mode and range", "robust-mode", "It uses median and IQR."],
      ["The mean only", "robust-mean", "It uses robust statistics."],
    ]),
  num(m(FS, "apply-zscore", "apply", 2, 20, "A feature has training mean $60$ and standard deviation $8$. What is the standardised value of $76$?"), 2),
  num(m(FS, "apply-minmax", "apply", 2, 20, "A feature ranges from $10$ to $50$ in training. What is the min-max value of $30$?"), 0.5),
  num(m(FS, "apply-robust", "apply", 3, 25, "A feature has median $40$ and IQR $20$. What is the robust-scaled value of $70$?"), 1.5),
  num(m(FS, "apply-out-of-range", "apply", 3, 25, "A feature's training range is $10$ to $50$. What min-max value does a test point of $60$ get?"), 1.25),
  // 11–20
  num(m(FS, "apply-inverse", "apply", 3, 25, "A standardised value is $-1.5$ for a feature with mean $100$ and standard deviation $20$. What is the original value?"), 70),
  num(m(FS, "apply-distance-domination", "apply", 4, 35, "Two records differ by $3$ in age (years) and $4{,}000$ in income (dollars). What share of their squared Euclidean distance comes from income? Give $6$ decimal places."), 0.999999),
  num(m(FS, "apply-after-scaling", "apply", 4, 35, "After standardising (age SD $12$, income SD $20{,}000$), the same records differ by $\\frac{3}{12}$ and $\\frac{4{,}000}{20{,}000}$. What is the scaled Euclidean distance? Give $4$ decimal places."), 0.3202),
  num(m(FS, "apply-log-transform", "apply", 4, 35, "A right-skewed income of $\\$100{,}000$ is log-transformed with $\\log_{10}$. What value results?"), 5),
  num(m(FS, "apply-maxabs", "apply", 4, 35, "Max-abs scaling divides by the largest absolute training value. With values in $[-40, 25]$, what is the scaled value of $-10$?"), -0.25),
  short(m(FS, "explain-fit-transform", "explain", 6, 120, "Why do scaling libraries separate `fit` (on training data) from `transform` (on any data)?"),
    [
      ["leakage", "Fitting on test data would leak information about it into the model's preprocessing", 2, true],
      ["consistency", "New data must be transformed with exactly the statistics the model was trained with", 2, true],
    ]),
  num(m(FS, "transfer-unit-norm", "transfer", 7, 60, "Normalising a row vector to unit $L_2$ norm, what does $[3, 4]$ become? Give the first entry."), 0.6),
  mcq(m(FS, "transfer-sparse-data", "transfer", 7, 60, "Why is standardisation (centring) a poor choice for a huge sparse TF–IDF matrix?"),
    "Subtracting the mean turns zeros into nonzero values, destroying sparsity and exploding memory",
    [
      ["Standardisation can't handle text", "standardise-text", "It can, but centring densifies the matrix."],
      ["TF–IDF values are already standardised", "tfidf-standardised", "They aren't mean-zero."],
      ["It changes the vocabulary", "standardise-vocab", "The columns stay the same."],
    ]),
  num(m(FS, "transfer-quantile", "transfer", 8, 60, "A quantile transformer maps a value to its training-set percentile. A value greater than $730$ of $1{,}000$ training values maps to what?"), 0.73),
  short(m(FS, "transfer-regularisation-link", "transfer", 8, 150, "Explain why $L_1$ and $L_2$ penalties make feature scaling essential, even though plain least squares doesn't need it."),
    [
      ["penalty-scale", "The penalty acts on coefficient sizes, which depend on each feature's units", 2, true],
      ["unequal", "Without scaling, features measured in small units need large coefficients and get penalised more, so regularisation becomes arbitrary", 2, true],
    ]),
  // 21–30
  num(m(FS, "transfer-coef-rescale", "transfer", 8, 60, "A linear model on standardised income has coefficient $2.5$. Income's training standard deviation is $\\$10{,}000$. What is the coefficient per dollar of raw income?"), 0.00025),
  mcq(m(FS, "transfer-outliers", "transfer", 9, 75, "A feature has a few extreme outliers. Why is min-max scaling a poor choice?"),
    "The outliers set the min and max, squashing nearly all ordinary values into a tiny part of $[0, 1]$",
    [
      ["Min-max removes outliers", "minmax-removes", "It keeps them, at the extremes."],
      ["Min-max can't handle negatives", "minmax-negatives", "It handles any range."],
      ["It's the best choice for outliers", "minmax-best-outliers", "Robust scaling is better suited."],
    ]),
  num(m(FS, "transfer-nn-gradient", "transfer", 9, 75, "In linear regression trained by gradient descent, the loss curvature along a feature scales with its variance. If one feature has variance $10{,}000$ and another $1$, what is the condition number of the (diagonal) Hessian?"), 10000),
  short(m(FS, "transfer-pipeline", "transfer", 9, 150, "In cross-validation, where must the scaler be fitted, and what goes wrong otherwise?"),
    [
      ["inside", "Inside each training fold (e.g. as a pipeline step), using only that fold's training data", 2, true],
      ["wrong", "Fitting on all data first leaks validation-fold statistics, making CV estimates optimistic", 2, true],
    ]),
  num(m(FS, "transfer-pca-variance-share", "transfer", 10, 90, "Unscaled PCA on two independent features with variances $9{,}900$ and $100$: what share of variance does the first component take?"), 0.99),
  mcq(m(FS, "transfer-batchnorm", "transfer", 10, 90, "How does batch normalisation relate to input feature scaling?"),
    "It standardises activations inside a network during training, extending the benefit of scaling to every layer",
    [
      ["It replaces the need to scale labels", "bn-labels", "It acts on activations."],
      ["It's identical to min-max scaling of inputs", "bn-minmax", "It standardises per mini-batch at each layer."],
      ["It only applies to decision trees", "bn-trees", "It's a neural-network layer."],
    ]),
  short(m(FS, "transfer-drift", "transfer", 10, 180, "After deployment, the incoming data's mean for a feature drifts far from the training mean. Explain what happens to the scaled feature and what you'd do."),
    [
      ["effect", "Scaled values shift away from the training distribution (e.g. consistently large $z$-scores), so the model sees inputs unlike its training data", 2, true],
      ["action", "Monitor for drift, investigate the cause, and retrain (refitting the scaler on recent data) rather than silently refitting the scaler alone", 2, true],
    ]),
  mcq(m(FS, "recall-why-scale", "recall", 2, 20, "Feature scaling matters most for models that rely on:"),
    "Distances, dot products or gradient-based optimisation",
    [
      ["Axis-aligned threshold splits", "why-scale-trees", "Trees don't depend on scale."],
      ["Counting categories", "why-scale-counts", "Counting is scale-free."],
      ["Majority voting of labels", "why-scale-voting", "Voting itself isn't scale-dependent."],
    ]),
  num(m(FS, "apply-zscore-negative", "apply", 3, 25, "A feature has mean $5$ and standard deviation $2$. What is the standardised value of $2$?"), -1.5),
  num(m(FS, "apply-minmax-custom", "apply", 4, 35, "Min-max scaling to $[-1, 1]$ uses $2\\frac{x - \\min}{\\max - \\min} - 1$. With range $0$ to $200$, what does $150$ become?"), 0.5),
];

export const mlSixty08Items: Item[] = [
  ...kmeans,
  ...svd,
  ...ppca,
  ...kpca,
  ...tsne,
  ...umap,
  ...ica,
  ...scaling,
];
