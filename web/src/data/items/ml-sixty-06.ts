import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./ml-sixty-shared";

/**
 * MDS, kernels and SVMs, and decision trees (multidimensional scaling
 * through splitting criteria), each brought to 60 questions.
 */

// ---------------------------------------------------------------------------
// multidimensional-scaling
// ---------------------------------------------------------------------------
const MD = "multidimensional-scaling";
const mds: Item[] = [
  // 1–10
  mcq(m(MD, "recall-goal", "recall", 1, 15, "What does multidimensional scaling try to produce?"),
    "A low-dimensional set of points whose pairwise distances match given dissimilarities as closely as possible",
    [
      ["A set of cluster labels", "mds-clusters", "MDS produces coordinates, not labels."],
      ["A classifier", "mds-classifier", "MDS is unsupervised."],
      ["A list of the most important features", "mds-features", "It works from dissimilarities, not feature rankings."],
    ]),
  mcq(m(MD, "recall-distances-only", "recall", 1, 15, "Can MDS be used when only a table of pairwise dissimilarities is available, with no original features?"),
    "Yes — that's exactly its typical input",
    [
      ["No, it needs the original features", "mds-needs-features", "It needs only dissimilarities."],
      ["Only if the dissimilarities are integers", "mds-integers", "Any non-negative dissimilarities work."],
      ["Only with labels", "mds-labels", "It's unsupervised."],
    ]),
  mcq(m(MD, "recall-stress", "recall", 1, 15, "In MDS, *stress* measures:"),
    "How badly the embedded distances fit the target dissimilarities",
    [
      ["How long the algorithm runs", "stress-time", "It's a goodness-of-fit measure."],
      ["The number of dimensions", "stress-dimensions", "Stress is computed for a chosen dimension."],
      ["The variance of the data", "stress-variance", "It compares distances."],
    ]),
  mcq(m(MD, "recall-nonmetric", "recall", 2, 20, "Non-metric MDS tries to preserve:"),
    "The rank order of the dissimilarities, not their exact values",
    [
      ["The exact distances", "nonmetric-exact", "That's metric MDS."],
      ["The original features", "nonmetric-features", "MDS has no features to preserve."],
      ["Only the largest distance", "nonmetric-largest", "It preserves the whole ordering."],
    ]),
  mcq(m(MD, "recall-pca-link", "recall", 2, 20, "Classical MDS on Euclidean distances gives the same configuration as:"),
    "PCA on the original (centred) data, up to rotation and reflection",
    [
      ["$k$-means clustering", "mds-kmeans", "$k$-means doesn't give coordinates."],
      ["LDA", "mds-lda", "LDA uses labels."],
      ["t-SNE", "mds-tsne", "t-SNE optimises a different, local objective."],
    ]),
  num(m(MD, "apply-pairs", "apply", 2, 20, "How many distinct pairwise dissimilarities are there among $15$ objects?"), 105),
  num(m(MD, "apply-embedded-distance", "apply", 3, 25, "Two embedded points are $(1, 2)$ and $(4, 6)$. What is their distance?"), 5),
  num(m(MD, "apply-squared-error", "apply", 3, 25, "A pair has target dissimilarity $8$ and embedded distance $6.5$. What is its squared error?"), 2.25),
  num(m(MD, "apply-stress", "apply", 4, 40, "Kruskal stress-1 is $\\sqrt{\\frac{\\sum(d_{ij} - \\delta_{ij})^{2}}{\\sum d_{ij}^{2}}}$. With squared errors summing to $4$ and $\\sum d_{ij}^{2} = 400$, what is it?"), 0.1),
  num(m(MD, "apply-variance-fraction", "apply", 4, 35, "Classical MDS eigenvalues are $10$, $6$, $3$ and $1$. What fraction of the total do the first two capture?"), 0.8),
  // 11–20
  num(m(MD, "apply-coordinate", "apply", 4, 35, "Classical MDS coordinates are $\\sqrt{\\lambda}\\mathbf{v}$. With eigenvalue $\\lambda = 16$ and an eigenvector entry $0.5$, what is that point's coordinate?"), 2),
  num(m(MD, "apply-double-centring", "apply", 5, 45, "Classical MDS uses $\\mathbf{B} = -\\frac{1}{2}\\mathbf{J}\\mathbf{D}^{(2)}\\mathbf{J}$. For two points at distance $2$, $\\mathbf{B}$ has diagonal entries equal to the squared distance of each point from the centre. What is that value?"), 1),
  mcq(m(MD, "apply-rotation", "apply", 5, 40, "An MDS solution is rotated by $45°$. What happens to the stress?"),
    "Nothing — rotation preserves all pairwise distances",
    [
      ["It doubles", "rotation-doubles", "Distances don't change under rotation."],
      ["It falls to zero", "rotation-zero", "Rotation doesn't improve the fit."],
      ["It becomes undefined", "rotation-undefined", "Stress is unchanged."],
    ]),
  short(m(MD, "explain-identifiability", "explain", 6, 120, "Why is an MDS configuration only determined up to rotation, reflection and translation?"),
    [
      ["distances", "These transformations leave every pairwise distance unchanged", 2, true],
      ["consequence", "Since MDS only fits distances, it can't distinguish configurations related by them; axes have no intrinsic meaning", 2, true],
    ]),
  short(m(MD, "explain-negative-eigenvalues", "explain", 6, 120, "What does it mean if the double-centred matrix in classical MDS has large negative eigenvalues?"),
    [
      ["non-euclidean", "The dissimilarities aren't Euclidean distances: no exact configuration in any Euclidean space reproduces them", 2, true],
      ["handling", "Classical MDS drops them, so the fit is approximate; non-metric MDS or other methods may suit better", 2],
    ]),
  mcq(m(MD, "explain-applications", "explain", 6, 50, "Which is a natural application of MDS?"),
    "Mapping how similar people judge pairs of products to be, from survey similarity ratings",
    [
      ["Predicting house prices", "mds-prices", "That's regression."],
      ["Classifying emails as spam", "mds-spam", "That's classification."],
      ["Sorting a list", "mds-sorting", "MDS embeds dissimilarities."],
    ]),
  num(m(MD, "transfer-sammon", "transfer", 7, 60, "Sammon's stress weights each squared error by $\\frac{1}{\\delta_{ij}}$. A pair with $\\delta = 2$ and error $0.5$ contributes what weighted squared error?"), 0.125),
  num(m(MD, "transfer-cost", "transfer", 7, 60, "Classical MDS needs an $n \\times n$ matrix. For $n = 20{,}000$, how many entries (in millions) is that?"), 400),
  mcq(m(MD, "transfer-isomap", "transfer", 8, 60, "How does Isomap extend classical MDS to curved manifolds?"),
    "It replaces straight-line distances with shortest-path distances through a nearest-neighbour graph, then applies MDS",
    [
      ["It uses labels to guide the embedding", "isomap-labels", "It's unsupervised."],
      ["It applies MDS to random projections", "isomap-random", "It uses graph geodesics."],
      ["It skips the eigendecomposition", "isomap-no-eigen", "It still uses classical MDS."],
    ]),
  num(m(MD, "transfer-landmark", "transfer", 8, 60, "Landmark MDS embeds $m$ landmarks fully and places the other points relative to them, costing about $nm$ distances instead of $n^{2}$. With $n = 50{,}000$ and $m = 500$, what is the ratio $\\frac{n^{2}}{nm}$?"), 100),
  // 21–30
  short(m(MD, "transfer-choose-dimension", "transfer", 8, 150, "How would you decide how many dimensions to use for an MDS embedding?"),
    [
      ["stress-curve", "Plot stress against dimension and look for an elbow where adding dimensions stops reducing stress much", 2, true],
      ["purpose", "Balance this with the purpose (e.g. $2$ or $3$ dimensions for visualisation) and, for classical MDS, the eigenvalue spectrum", 2],
    ]),
  mcq(m(MD, "transfer-travel-times", "transfer", 9, 75, "Classical MDS on road travel times between cities gives a map that's distorted compared with a geographic map. Why?"),
    "Travel times aren't Euclidean distances — roads, terrain and traffic warp them, so no flat map fits exactly",
    [
      ["MDS always distorts", "mds-distorts", "With true Euclidean distances, MDS recovers the configuration exactly."],
      ["The cities are too far apart", "mds-far", "Scale isn't the issue."],
      ["MDS needs latitude and longitude", "mds-coordinates", "It works from dissimilarities alone."],
    ]),
  num(m(MD, "transfer-exact-dims", "transfer", 9, 75, "$n = 12$ points with exactly Euclidean pairwise distances can always be embedded without error in at most how many dimensions ($n - 1$)?"), 11),
  short(m(MD, "transfer-smacof", "transfer", 9, 150, "How is metric stress minimised in practice, and what is a known weakness of that procedure?"),
    [
      ["smacof", "By iterative majorisation (SMACOF) or gradient-based updates starting from an initial configuration", 2, true],
      ["local-minima", "It can converge to local minima, so it's run from several starts (e.g. classical MDS initialisation)", 2, true],
    ]),
  num(m(MD, "transfer-stress-change", "transfer", 10, 90, "Moving to $3$ dimensions lowers stress-1 from $0.20$ to $0.05$. By what factor did the stress fall?"), 4),
  mcq(m(MD, "transfer-tsne-vs-mds", "transfer", 10, 90, "Compared with metric MDS, why does t-SNE often show clusters more clearly but distort global layout?"),
    "t-SNE focuses on preserving local neighbourhoods and ignores large distances, while MDS tries to preserve all distances",
    [
      ["t-SNE preserves all distances exactly", "tsne-exact", "It sacrifices global distances."],
      ["MDS can't find clusters at all", "mds-no-clusters", "It can, but large distances dominate its objective."],
      ["They optimise the same objective", "tsne-mds-same", "Their objectives differ fundamentally."],
    ]),
  short(m(MD, "transfer-double-centring-proof", "transfer", 10, 180, "Explain why double-centring the squared Euclidean distance matrix recovers the Gram matrix of centred points."),
    [
      ["expansion", "$\\|\\mathbf{x}_i - \\mathbf{x}_j\\|^{2} = \\|\\mathbf{x}_i\\|^{2} + \\|\\mathbf{x}_j\\|^{2} - 2\\mathbf{x}_i \\cdot \\mathbf{x}_j$", 2, true],
      ["cancellation", "Centring rows and columns removes the squared-norm terms (for centred data), leaving $-2$ times the inner products; multiplying by $-\\frac{1}{2}$ gives the Gram matrix", 2, true],
    ]),
  mcq(m(MD, "recall-classical-name", "recall", 2, 20, "Classical MDS is also known as:"),
    "Torgerson (or principal coordinates) analysis",
    [
      ["t-SNE", "classical-tsne", "t-SNE is a different method."],
      ["$k$-means", "classical-kmeans", "That's clustering."],
      ["ICA", "classical-ica", "ICA separates independent sources."],
    ]),
  num(m(MD, "apply-dissimilarity-count", "apply", 3, 25, "A symmetric dissimilarity matrix for $n = 8$ objects, excluding the zero diagonal, has how many distinct values?"), 28),
  num(m(MD, "apply-two-d-distance", "apply", 4, 35, "After MDS, objects sit at $(0, 0)$, $(6, 0)$ and $(0, 8)$. What is the distance between the second and third?"), 10),
];

// ---------------------------------------------------------------------------
// kernel
// ---------------------------------------------------------------------------
const KE = "kernel";
const kernel: Item[] = [
  // 1–10
  mcq(m(KE, "recall-similarity", "recall", 1, 15, "Intuitively, a kernel $k(\\mathbf{x}, \\mathbf{z})$ measures:"),
    "The similarity between two inputs, as an inner product in some feature space",
    [
      ["The distance between two classes", "kernel-class-distance", "It compares two inputs."],
      ["A model's loss", "kernel-loss", "It's a similarity function."],
      ["The number of features", "kernel-features", "It's a function of a pair of inputs."],
    ]),
  mcq(m(KE, "recall-trick", "recall", 1, 15, "The kernel trick lets an algorithm:"),
    "Work in a high-dimensional feature space using only kernel evaluations, never computing the features explicitly",
    [
      ["Skip training", "trick-no-training", "Training still happens."],
      ["Reduce the number of data points", "trick-fewer-points", "It changes the feature space, not the data."],
      ["Use labels it doesn't have", "trick-labels", "It's about feature spaces."],
    ]),
  mcq(m(KE, "recall-gram", "recall", 1, 15, "The Gram (kernel) matrix for $n$ points has entries:"),
    "$K_{ij} = k(\\mathbf{x}_i, \\mathbf{x}_j)$ — one per pair of points",
    [
      ["One per feature", "gram-features", "It's $n \\times n$ over points."],
      ["The labels of each point", "gram-labels", "It holds similarities."],
      ["Only the diagonal", "gram-diagonal", "All pairs are included."],
    ]),
  mcq(m(KE, "recall-symmetric", "recall", 2, 20, "A valid kernel must be:"),
    "Symmetric, with a positive semidefinite Gram matrix for every set of points",
    [
      ["Always positive", "kernel-positive", "Entries can be negative (e.g. linear kernel)."],
      ["Bounded by $1$", "kernel-bounded", "Only some kernels (like RBF) are bounded."],
      ["Linear", "kernel-linear", "Many kernels are non-linear."],
    ]),
  num(m(KE, "apply-linear", "apply", 2, 20, "What is the linear kernel $\\mathbf{x} \\cdot \\mathbf{z}$ for $\\mathbf{x} = [2, -1, 3]$ and $\\mathbf{z} = [1, 4, 2]$?"), 4),
  num(m(KE, "apply-poly", "apply", 3, 25, "What is the polynomial kernel $(\\mathbf{x} \\cdot \\mathbf{z} + 1)^{2}$ for $\\mathbf{x} = [1, 2]$ and $\\mathbf{z} = [3, 1]$?"), 36),
  num(m(KE, "apply-homogeneous", "apply", 3, 25, "What is the homogeneous kernel $(\\mathbf{x} \\cdot \\mathbf{z})^{3}$ for $\\mathbf{x} = [1, 1]$ and $\\mathbf{z} = [1, 0]$?"), 1),
  num(m(KE, "apply-feature-dim", "apply", 4, 35, "The homogeneous degree-$2$ polynomial kernel on $d$ inputs corresponds to the $\\frac{d(d + 1)}{2}$ distinct degree-$2$ monomials. How many for $d = 10$?"), 55),
  num(m(KE, "apply-poly-dim", "apply", 4, 40, "The inhomogeneous kernel $(\\mathbf{x} \\cdot \\mathbf{z} + 1)^{p}$ on $d$ inputs spans $\\binom{d + p}{p}$ monomials. How many for $d = 5$ and $p = 3$?"), 56),
  num(m(KE, "apply-gram-size", "apply", 4, 35, "How many entries does the Gram matrix for $n = 3{,}000$ points have (in millions)?"), 9),
  // 11–20
  num(m(KE, "apply-normalised", "apply", 5, 40, "The normalised kernel is $\\frac{k(\\mathbf{x}, \\mathbf{z})}{\\sqrt{k(\\mathbf{x}, \\mathbf{x})k(\\mathbf{z}, \\mathbf{z})}}$. For the linear kernel with $\\mathbf{x} = [3, 4]$ and $\\mathbf{z} = [4, 3]$, what is it?"), 0.96),
  num(m(KE, "apply-feature-space-distance", "apply", 5, 45, "Feature-space squared distance is $k(\\mathbf{x}, \\mathbf{x}) + k(\\mathbf{z}, \\mathbf{z}) - 2k(\\mathbf{x}, \\mathbf{z})$. With values $5$, $3$ and $2$, what is it?"), 4),
  mcq(m(KE, "apply-dot-only", "apply", 5, 40, "Which algorithm can be kernelised because it uses the data only through dot products?"),
    "Ridge regression (and SVMs, PCA)",
    [
      ["A decision tree", "kernel-tree", "Trees split on individual features."],
      ["Naive Bayes with counts", "kernel-nb", "It uses per-feature counts."],
      ["Random forests", "kernel-forest", "Forests split on features."],
    ]),
  short(m(KE, "explain-beyond-speed", "explain", 6, 120, "Why is the kernel trick more than a computational shortcut?"),
    [
      ["infinite", "It allows feature spaces that are infinite-dimensional (e.g. RBF), which couldn't be computed explicitly at all", 2, true],
      ["structured", "It lets learning work on structured objects (strings, graphs) via similarity functions without vector features", 2],
    ]),
  short(m(KE, "explain-representer", "explain", 6, 120, "State the representer theorem and why it makes kernel methods practical."),
    [
      ["statement", "For regularised risk in an RKHS, the optimal function is a weighted sum of kernels at the training points, $f(\\mathbf{x}) = \\sum_i \\alpha_i k(\\mathbf{x}_i, \\mathbf{x})$", 2, true],
      ["practical", "So an infinite-dimensional optimisation reduces to finding $n$ coefficients", 2, true],
    ]),
  mcq(m(KE, "explain-closure", "explain", 6, 50, "If $k_1$ and $k_2$ are valid kernels, which is guaranteed to be valid?"),
    "$k_1 + k_2$ (and also $k_1 k_2$)",
    [
      ["$k_1 - k_2$", "kernel-difference", "Differences can break positive semidefiniteness."],
      ["$\\frac{k_1}{k_2}$", "kernel-ratio", "Ratios aren't guaranteed valid."],
      ["$-k_1$", "kernel-negated", "Negation flips the sign of eigenvalues."],
    ]),
  num(m(KE, "transfer-kernel-ridge", "transfer", 7, 60, "Kernel ridge regression predicts $f(\\mathbf{x}) = \\sum_i \\alpha_i k(\\mathbf{x}_i, \\mathbf{x})$. With $\\boldsymbol{\\alpha} = [2, -1]$ and kernel values $0.5$ and $0.8$ at a new point, what is $f$?"), 0.2),
  num(m(KE, "transfer-cost-predict", "transfer", 7, 60, "A kernel model with $n = 20{,}000$ training points evaluates one kernel per training point to predict. How many kernel evaluations for $500$ predictions (in millions)?"), 10),
  mcq(m(KE, "transfer-string-kernel", "transfer", 8, 60, "A string kernel counts shared substrings between two DNA sequences. Why is that useful?"),
    "It defines similarity directly on variable-length sequences, letting kernel methods learn from them without fixed-length features",
    [
      ["It converts DNA to numbers by length only", "string-length", "It captures shared content."],
      ["It's required for all sequence models", "string-required", "It's one option among many."],
      ["It isn't a valid kernel", "string-invalid", "Substring-count kernels are valid inner products."],
    ]),
  num(m(KE, "transfer-kernel-mean-distance", "transfer", 8, 75, "The squared MMD between two samples is $\\overline{k}_{XX} + \\overline{k}_{YY} - 2\\overline{k}_{XY}$ (average kernel values). With $0.6$, $0.5$ and $0.4$, what is it?"), 0.3),
  // 21–30
  short(m(KE, "transfer-scaling", "transfer", 8, 150, "Why do exact kernel methods scale poorly to millions of examples, and name one way around it."),
    [
      ["scaling", "They need the $n \\times n$ Gram matrix ($O(n^{2})$ memory) and often $O(n^{3})$ time to solve", 2, true],
      ["fix", "Approximations such as random Fourier features, Nyström, or inducing points", 2, true],
    ]),
  mcq(m(KE, "transfer-scale-kernel", "transfer", 9, 75, "If $k$ is a valid kernel and $c > 0$, is $c \\cdot k$ valid?"),
    "Yes — scaling by a positive constant keeps the Gram matrix positive semidefinite",
    [
      ["No, kernels must be normalised", "scale-normalised", "Normalisation isn't required."],
      ["Only if $c < 1$", "scale-small", "Any positive $c$ works."],
      ["Only if $c$ is an integer", "scale-integer", "Any positive real works."],
    ]),
  num(m(KE, "transfer-cauchy-schwarz", "transfer", 9, 75, "For a valid kernel, $k(\\mathbf{x}, \\mathbf{z})^{2} \\le k(\\mathbf{x}, \\mathbf{x})k(\\mathbf{z}, \\mathbf{z})$. With $k(\\mathbf{x}, \\mathbf{x}) = 4$ and $k(\\mathbf{z}, \\mathbf{z}) = 9$, what is the largest possible $k(\\mathbf{x}, \\mathbf{z})$?"), 6),
  short(m(KE, "transfer-reproducing", "transfer", 9, 150, "What is the reproducing property of an RKHS, and what does it say about evaluating a function?"),
    [
      ["property", "$f(\\mathbf{x}) = \\langle f, k(\\mathbf{x}, \\cdot) \\rangle$ for every $f$ in the RKHS", 2, true],
      ["meaning", "Evaluating a function is an inner product with the kernel centred at that point, so point evaluation is continuous", 2, true],
    ]),
  num(m(KE, "transfer-poly-terms", "transfer", 10, 90, "Explicitly computing degree-$3$ inhomogeneous polynomial features on $d = 100$ inputs gives $\\binom{103}{3}$ features. How many?"), 176851),
  mcq(m(KE, "transfer-kernel-choice", "transfer", 10, 90, "With little prior knowledge about a tabular problem, why is the RBF kernel a common default?"),
    "It's universal (can approximate any continuous function given enough data) and has only one bandwidth to tune",
    [
      ["It's always the most accurate", "rbf-most-accurate", "It's a safe default, not always best."],
      ["It needs no tuning", "rbf-no-tuning", "Its bandwidth still needs tuning."],
      ["It's linear", "rbf-linear", "It's highly non-linear."],
    ]),
  short(m(KE, "transfer-kernel-pca", "transfer", 10, 180, "Explain how kernel PCA uses the kernel trick, and what centring step it needs."),
    [
      ["eigen", "It eigendecomposes the (centred) Gram matrix instead of the covariance, finding principal components in feature space", 2, true],
      ["centring", "The Gram matrix must be centred in feature space ($\\tilde{\\mathbf{K}} = \\mathbf{J}\\mathbf{K}\\mathbf{J}$) since features can't be centred explicitly", 2, true],
    ]),
  mcq(m(KE, "recall-linear-kernel-name", "recall", 2, 20, "The kernel $k(\\mathbf{x}, \\mathbf{z}) = \\mathbf{x} \\cdot \\mathbf{z}$ is called the:"),
    "Linear kernel",
    [
      ["RBF kernel", "linear-rbf", "RBF uses squared distances."],
      ["Sigmoid kernel", "linear-sigmoid", "That uses $\\tanh$."],
      ["Polynomial kernel of degree $2$", "linear-poly2", "That squares the dot product."],
    ]),
  num(m(KE, "apply-poly-degree3", "apply", 3, 30, "What is $(\\mathbf{x} \\cdot \\mathbf{z} + 1)^{3}$ for $\\mathbf{x} = [1, 0]$ and $\\mathbf{z} = [1, 5]$?"), 8),
  num(m(KE, "apply-sum-kernel", "apply", 4, 35, "Two kernels give $k_1 = 0.7$ and $k_2 = 1.5$ for a pair. What does the sum kernel give?"), 2.2),
];

// ---------------------------------------------------------------------------
// mercers-theorem
// ---------------------------------------------------------------------------
const ME = "mercers-theorem";
const mercer: Item[] = [
  // 1–10
  mcq(m(ME, "recall-statement", "recall", 1, 15, "Mercer's theorem connects valid kernels to:"),
    "Inner products in some (possibly infinite-dimensional) feature space",
    [
      ["Decision trees", "mercer-trees", "It's about kernels and feature spaces."],
      ["Probability distributions only", "mercer-distributions", "It's about inner-product representations."],
      ["Loss functions", "mercer-loss", "It characterises kernels."],
    ]),
  mcq(m(ME, "recall-psd", "recall", 1, 15, "A kernel is valid exactly when every Gram matrix it produces is:"),
    "Symmetric positive semidefinite",
    [
      ["Diagonal", "mercer-diagonal", "Off-diagonal entries are usually nonzero."],
      ["Invertible", "mercer-invertible", "PSD matrices can be singular."],
      ["All positive entries", "mercer-positive-entries", "Entries can be negative; eigenvalues must not be."],
    ]),
  mcq(m(ME, "recall-why-matters", "recall", 2, 20, "Why does it matter whether a kernel is valid?"),
    "Kernel algorithms such as SVMs rely on convex optimisation, which can break if the Gram matrix has negative eigenvalues",
    [
      ["Invalid kernels are slower", "invalid-slower", "The issue is correctness, not speed."],
      ["Valid kernels always give perfect accuracy", "valid-perfect", "Validity is necessary, not sufficient, for good results."],
      ["It doesn't matter", "validity-irrelevant", "Optimisation can fail without it."],
    ]),
  mcq(m(ME, "recall-diagonal", "recall", 2, 20, "For any valid kernel, what can be said about $k(\\mathbf{x}, \\mathbf{x})$?"),
    "It's non-negative — it's a squared norm in feature space",
    [
      ["It's always $1$", "diagonal-one", "Only normalised kernels like RBF give $1$."],
      ["It can be negative", "diagonal-negative", "A squared norm can't be negative."],
      ["It's always $0$", "diagonal-zero", "Only for the zero vector's image."],
    ]),
  num(m(ME, "apply-2x2-det", "apply", 2, 25, "What is the determinant of the Gram matrix $\\begin{bmatrix} 1 & 0.6 \\\\ 0.6 & 1 \\end{bmatrix}$?"), 0.64),
  num(m(ME, "apply-2x2-eig", "apply", 3, 30, "What is the smaller eigenvalue of $\\begin{bmatrix} 1 & 0.6 \\\\ 0.6 & 1 \\end{bmatrix}$?"), 0.4),
  num(m(ME, "apply-invalid-eig", "apply", 3, 30, "A proposed kernel gives the Gram matrix $\\begin{bmatrix} 1 & 2 \\\\ 2 & 1 \\end{bmatrix}$. What is its smaller eigenvalue?"), -1),
  mcq(m(ME, "apply-invalid-conclusion", "apply", 4, 35, "That Gram matrix has a negative eigenvalue. What follows?"),
    "The function isn't a valid kernel",
    [
      ["It's valid but slow", "invalid-slow", "A negative eigenvalue rules out validity."],
      ["It's valid if the data are scaled", "invalid-scale", "Scaling the inputs doesn't fix the definition."],
      ["Nothing can be concluded", "invalid-unknown", "One failing set of points is enough to disprove validity."],
    ]),
  num(m(ME, "apply-max-offdiag", "apply", 4, 35, "For $\\begin{bmatrix} 4 & c \\\\ c & 9 \\end{bmatrix}$ to be PSD, what is the largest allowed $c$?"), 6),
  num(m(ME, "apply-trace", "apply", 4, 35, "A $3 \\times 3$ RBF Gram matrix has what trace (sum of eigenvalues), given every diagonal entry is $1$?"), 3),
  // 11–20
  num(m(ME, "apply-quadratic-form", "apply", 5, 45, "For Gram matrix $\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ and $\\mathbf{c} = [1, -1]$, what is $\\mathbf{c}^{T}\\mathbf{K}\\mathbf{c}$?"), 2),
  num(m(ME, "apply-eigen-expansion", "apply", 5, 45, "A kernel has Mercer expansion $k(x, z) = \\sum_j \\lambda_j \\phi_j(x)\\phi_j(z)$ with $\\lambda = (3, 1)$, and at a pair of points $\\phi_1 = (1, 2)$, $\\phi_2 = (2, -1)$ (values at $x$, then $z$). What is $k(x, z)$?"), 4),
  short(m(ME, "explain-psd-meaning", "explain", 6, 120, "Explain why positive semidefiniteness of the Gram matrix is exactly what an inner-product similarity must satisfy."),
    [
      ["norm", "For any coefficients $\\mathbf{c}$, $\\mathbf{c}^{T}\\mathbf{K}\\mathbf{c} = \\|\\sum_i c_i \\phi(\\mathbf{x}_i)\\|^{2} \\ge 0$", 2, true],
      ["meaning", "A negative value would correspond to a squared length below zero, impossible for an inner product", 2, true],
    ]),
  short(m(ME, "explain-symmetry-insufficient", "explain", 6, 120, "Why is checking that a similarity function is symmetric not enough to show it's a valid kernel?"),
    [
      ["symmetric-not-psd", "Symmetric matrices can have negative eigenvalues; validity needs positive semidefiniteness too", 2, true],
      ["example", "E.g. $\\begin{bmatrix} 1 & 2 \\\\ 2 & 1 \\end{bmatrix}$ is symmetric with eigenvalue $-1$", 2],
    ]),
  mcq(m(ME, "explain-sigmoid", "explain", 6, 50, "The sigmoid kernel $\\tanh(a\\mathbf{x} \\cdot \\mathbf{z} + c)$ is popular but notable because:"),
    "It isn't positive semidefinite for all parameter choices, so it's not always a valid Mercer kernel",
    [
      ["It's always valid", "sigmoid-valid", "It fails for many $(a, c)$."],
      ["It's the RBF kernel in disguise", "sigmoid-rbf", "It's a different function."],
      ["It has no parameters", "sigmoid-no-params", "It has $a$ and $c$."],
    ]),
  num(m(ME, "transfer-product-kernel", "transfer", 7, 60, "$k_1$ and $k_2$ give Gram matrices $\\begin{bmatrix} 1 & 0.5 \\\\ 0.5 & 1 \\end{bmatrix}$ and $\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$. What is the off-diagonal entry of the elementwise-product kernel $k_1 k_2$?"), 0.5),
  mcq(m(ME, "transfer-schur", "transfer", 7, 60, "Why is the product of two valid kernels valid?"),
    "The elementwise (Schur) product of two PSD matrices is PSD — equivalently, it's an inner product in the tensor-product feature space",
    [
      ["Products of positive numbers are positive", "product-positive", "Entries can be negative; it's the eigenvalues that matter."],
      ["It isn't always valid", "product-invalid", "The Schur product theorem guarantees it."],
      ["Because both kernels are linear", "product-linear", "It holds for any valid kernels."],
    ]),
  num(m(ME, "transfer-exp-kernel", "transfer", 8, 60, "$e^{k}$ of a valid kernel is valid. For the linear kernel value $\\mathbf{x} \\cdot \\mathbf{z} = 0.5$, what is $e^{0.5}$? Give $4$ decimal places."), 1.6487),
  short(m(ME, "transfer-numerical-psd", "transfer", 8, 150, "A Gram matrix computed in floating point has a tiny negative eigenvalue like $-10^{-12}$. Is the kernel invalid? What do practitioners do?"),
    [
      ["rounding", "Not necessarily — it's usually rounding error on a PSD (often near-singular) matrix", 2, true],
      ["jitter", "Add a small multiple of the identity (jitter, e.g. $10^{-8}\\mathbf{I}$) before factorising", 2, true],
    ]),
  num(m(ME, "transfer-jitter", "transfer", 8, 60, "A Gram matrix's smallest eigenvalue is $-0.002$. What is the smallest jitter $\\epsilon$ such that $\\mathbf{K} + \\epsilon\\mathbf{I}$ has smallest eigenvalue $0$?"), 0.002),
  // 21–30
  mcq(m(ME, "transfer-custom-similarity", "transfer", 9, 75, "A team invents an edit-distance-based similarity for text and plugs it into an SVM. What should they check first?"),
    "Whether its Gram matrices are positive semidefinite on their data (and ideally prove it in general)",
    [
      ["Whether it's fast", "custom-fast", "Validity comes first."],
      ["Whether it's symmetric only", "custom-symmetric", "Symmetry alone isn't enough."],
      ["Nothing — any similarity works", "custom-any", "Invalid similarities can break SVM optimisation."],
    ]),
  num(m(ME, "transfer-eigen-sum", "transfer", 9, 75, "A Gram matrix has eigenvalues $3.2$, $1.1$, $0.5$ and $0.2$. What is its trace?"), 5),
  short(m(ME, "transfer-easy-direction", "transfer", 9, 150, "Prove the easy direction: if $k(\\mathbf{x}, \\mathbf{z}) = \\langle \\phi(\\mathbf{x}), \\phi(\\mathbf{z}) \\rangle$ for some feature map $\\phi$, then $k$ is positive semidefinite."),
    [
      ["expand", "For any points and coefficients, $\\sum_{i,j} c_i c_j k(\\mathbf{x}_i, \\mathbf{x}_j) = \\langle \\sum_i c_i \\phi(\\mathbf{x}_i), \\sum_j c_j \\phi(\\mathbf{x}_j) \\rangle$", 2, true],
      ["nonneg", "That's a squared norm, $\\|\\sum_i c_i \\phi(\\mathbf{x}_i)\\|^{2} \\ge 0$", 2, true],
    ]),
  num(m(ME, "transfer-rank", "transfer", 10, 90, "The homogeneous degree-$2$ polynomial kernel on $\\mathbb{R}^{3}$ has a $6$-dimensional feature space. What is the maximum rank of its Gram matrix on $100$ points?"), 6),
  mcq(m(ME, "transfer-distance-kernel", "transfer", 10, 90, "Is $k(\\mathbf{x}, \\mathbf{z}) = \\|\\mathbf{x} - \\mathbf{z}\\|$ (plain Euclidean distance) a valid kernel?"),
    "No — its Gram matrix has zero diagonal and positive off-diagonals, which forces a negative eigenvalue",
    [
      ["Yes, distances are always valid kernels", "distance-valid", "A zero-diagonal matrix with positive entries has negative trace-balanced eigenvalues."],
      ["Yes, after squaring", "distance-squared", "Squared distance isn't PSD either."],
      ["Only in one dimension", "distance-1d", "It fails in any dimension with two distinct points."],
    ]),
  short(m(ME, "transfer-gp-covariance", "transfer", 10, 180, "Explain why every valid Mercer kernel can serve as the covariance function of a Gaussian process, and why an invalid one can't."),
    [
      ["covariance", "A GP needs every finite set of function values to have a valid (PSD) covariance matrix, which is exactly the kernel's Gram matrix", 2, true],
      ["invalid", "An invalid kernel would imply negative variances for some linear combinations, so no such Gaussian distribution exists", 2, true],
    ]),
  mcq(m(ME, "recall-mercer-feature-space", "recall", 2, 20, "According to Mercer's theorem, the feature space of a valid kernel may be:"),
    "Infinite-dimensional",
    [
      ["At most $3$-dimensional", "mercer-3d", "Feature spaces can be far larger."],
      ["The same as the input space always", "mercer-same", "It's usually different and larger."],
      ["Always finite", "mercer-finite", "RBF's is infinite."],
    ]),
  num(m(ME, "apply-3x3-sum", "apply", 4, 35, "Summing the entries of the Gram matrix $\\begin{bmatrix} 1 & 0.5 & 0.2 \\\\ 0.5 & 1 & 0.4 \\\\ 0.2 & 0.4 & 1 \\end{bmatrix}$ gives $\\mathbf{1}^{T}\\mathbf{K}\\mathbf{1}$. What is it?"), 5.2),
  num(m(ME, "apply-scaled-kernel", "apply", 3, 25, "A valid kernel gives $0.8$ for a pair. What does $3k$ give?"), 2.4),
  num(m(ME, "transfer-psd-bound", "transfer", 8, 60, "For $\\begin{bmatrix} 1 & c \\\\ c & 1 \\end{bmatrix}$, what is the most negative $c$ that keeps it PSD?"), -1),
];

// ---------------------------------------------------------------------------
// rbf
// ---------------------------------------------------------------------------
const RB = "rbf";
const rbf: Item[] = [
  // 1–10
  mcq(m(RB, "recall-name", "recall", 1, 15, "RBF stands for:"),
    "Radial basis function",
    [
      ["Random binary feature", "rbf-random", "It's a radial basis function."],
      ["Regularised Bayes filter", "rbf-bayes", "It's a kernel shape."],
      ["Recursive boosting forest", "rbf-forest", "Unrelated."],
    ]),
  mcq(m(RB, "recall-radial", "recall", 1, 15, "Why is the RBF kernel called “radial”?"),
    "Its value depends only on the distance $\\|\\mathbf{x} - \\mathbf{z}\\|$ between the points",
    [
      ["It uses polar coordinates", "radial-polar", "It depends on distance, in any coordinates."],
      ["It only works in $2$ dimensions", "radial-2d", "It works in any dimension."],
      ["It rotates the data", "radial-rotates", "It's a similarity, not a transformation."],
    ]),
  mcq(m(RB, "recall-range", "recall", 1, 15, "What range of values can the RBF kernel take?"),
    "$(0, 1]$, equal to $1$ only when the points coincide",
    [
      ["$[-1, 1]$", "rbf-negative", "Exponentials are positive."],
      ["$[0, \\infty)$", "rbf-unbounded", "It's at most $1$."],
      ["Exactly $0$ or $1$", "rbf-binary", "It varies smoothly."],
    ]),
  mcq(m(RB, "recall-far-points", "recall", 2, 20, "As two points move far apart, their RBF kernel value approaches:"),
    "$0$",
    [
      ["$1$", "rbf-far-one", "$1$ is for identical points."],
      ["$-1$", "rbf-far-negative", "It stays positive."],
      ["Infinity", "rbf-far-infinite", "It decays to zero."],
    ]),
  num(m(RB, "apply-value", "apply", 2, 25, "With $k(\\mathbf{x}, \\mathbf{z}) = e^{-\\gamma\\|\\mathbf{x} - \\mathbf{z}\\|^{2}}$, $\\gamma = 0.5$ and $\\|\\mathbf{x} - \\mathbf{z}\\|^{2} = 2$, what is $k$? Give $4$ decimal places."), 0.3679),
  num(m(RB, "apply-sigma-form", "apply", 3, 30, "With $k = e^{-\\|\\mathbf{x} - \\mathbf{z}\\|^{2}/(2\\sigma^{2})}$, $\\sigma = 2$ and distance $2$, what is $k$? Give $4$ decimal places."), 0.6065),
  num(m(RB, "apply-convert", "apply", 3, 25, "Converting $\\sigma = 0.5$ to the $\\gamma$ form $e^{-\\gamma\\|\\mathbf{x} - \\mathbf{z}\\|^{2}}$ uses $\\gamma = \\frac{1}{2\\sigma^{2}}$. What is $\\gamma$?"), 2),
  num(m(RB, "apply-half-distance", "apply", 4, 35, "With $\\gamma = 1$, at what distance does the RBF kernel equal $0.5$? Give $4$ decimal places ($\\sqrt{\\ln 2}$)."), 0.8326),
  num(m(RB, "apply-vectors", "apply", 4, 40, "With $\\gamma = 0.1$, what is $k$ for $\\mathbf{x} = [1, 2]$ and $\\mathbf{z} = [4, 6]$? Give $4$ decimal places."), 0.0821),
  num(m(RB, "apply-self", "apply", 3, 20, "What is $k(\\mathbf{x}, \\mathbf{x})$ for the RBF kernel with any $\\gamma$?"), 1),
  // 11–20
  mcq(m(RB, "apply-large-gamma", "apply", 4, 35, "A very large $\\gamma$ makes an RBF SVM:"),
    "Highly local and wiggly — prone to overfitting",
    [
      ["Nearly linear", "large-gamma-linear", "Small $\\gamma$ (wide kernels) tends toward smooth, near-linear fits."],
      ["Ignore the data", "large-gamma-ignore", "It fits the data very closely."],
      ["Equivalent to $k$-means", "large-gamma-kmeans", "It's still an SVM."],
    ]),
  num(m(RB, "apply-median-heuristic", "apply", 5, 40, "The median heuristic sets $\\sigma$ to the median pairwise distance. With median distance $3$, what $\\gamma = \\frac{1}{2\\sigma^{2}}$ results? Give $4$ decimal places."), 0.0556),
  num(m(RB, "apply-ratio", "apply", 5, 45, "With $\\gamma = 1$, how many times larger is the kernel at distance $1$ than at distance $2$ ($e^{3}$)? Give $2$ decimal places."), 20.09),
  short(m(RB, "explain-sigma", "explain", 6, 120, "Explain the role of the bandwidth $\\sigma$ in the RBF kernel and the effect of making it very small or very large."),
    [
      ["scale", "$\\sigma$ sets the length scale over which points count as similar", 2, true],
      ["extremes", "Tiny $\\sigma$: each point is similar only to itself (overfitting, like 1-NN); huge $\\sigma$: everything looks similar (underfitting, near-constant/linear)", 2, true],
    ]),
  short(m(RB, "explain-infinite", "explain", 6, 120, "Why does the RBF kernel correspond to an infinite-dimensional feature space?"),
    [
      ["taylor", "Expanding $e^{2\\gamma\\mathbf{x} \\cdot \\mathbf{z}}$ as a power series gives polynomial terms of every degree", 2, true],
      ["features", "So its feature map includes monomials of all orders — infinitely many features", 2, true],
    ]),
  mcq(m(RB, "explain-scaling-needed", "explain", 6, 50, "Why must features be standardised before using an RBF kernel?"),
    "One bandwidth applies to all features, so a large-scale feature would dominate the distance",
    [
      ["RBF only accepts values in $[0, 1]$", "rbf-input-range", "Any real inputs work."],
      ["Scaling makes the kernel linear", "rbf-scale-linear", "It stays non-linear."],
      ["It isn't needed", "rbf-no-scale", "Unscaled features distort similarities."],
    ]),
  num(m(RB, "transfer-rff-dim", "transfer", 7, 60, "Random Fourier features approximate an RBF kernel with $D$ random cosine features. With $D = 2{,}000$ features per point and $n = 10^{6}$ points, how many numbers are stored (in billions)?"), 2),
  mcq(m(RB, "transfer-rff-idea", "transfer", 7, 60, "What do random Fourier features exploit?"),
    "Bochner's theorem: a shift-invariant kernel is the Fourier transform of a probability distribution, so it can be approximated by averaging random cosines",
    [
      ["The kernel's Taylor series truncated at degree $2$", "rff-taylor", "They sample frequencies, not truncate a series."],
      ["$k$-means centres as features", "rff-kmeans", "That's a different approximation."],
      ["Exact eigenvectors of the Gram matrix", "rff-eigen", "That's closer to Nyström, and it's not random."],
    ]),
  num(m(RB, "transfer-gamma-limit", "transfer", 8, 60, "With $\\gamma = 50$ and distance $0.5$ between two training points, what is their kernel value? Give $6$ decimal places."), 0.000004),
  mcq(m(RB, "transfer-identity-limit", "transfer", 8, 60, "As $\\gamma \\to \\infty$, the RBF Gram matrix on distinct points approaches:"),
    "The identity matrix — every point is similar only to itself",
    [
      ["A matrix of all ones", "gamma-limit-ones", "That's the $\\gamma \\to 0$ limit."],
      ["The zero matrix", "gamma-limit-zero", "The diagonal stays at $1$."],
      ["A rank-one matrix", "gamma-limit-rank-one", "That's the small-$\\gamma$ limit."],
    ]),
  // 21–30
  short(m(RB, "transfer-small-gamma", "transfer", 8, 150, "As $\\gamma \\to 0$, what does the RBF Gram matrix approach, and what does an RBF SVM become?"),
    [
      ["ones", "The matrix approaches all ones (every pair looks identical)", 2, true],
      ["behaviour", "The model loses discriminative power; with rescaling it behaves like a nearly linear (low-order polynomial) classifier", 2, true],
    ]),
  num(m(RB, "transfer-ard", "transfer", 9, 75, "An ARD kernel uses a separate length scale per feature: $k = e^{-\\sum_j (x_j - z_j)^{2}/(2\\ell_j^{2})}$. With differences $[1, 2]$ and length scales $[1, 4]$, what is $k$? Give $4$ decimal places."), 0.5353),
  mcq(m(RB, "transfer-irrelevant", "transfer", 9, 75, "One feature is irrelevant. In an ARD RBF kernel, what should happen to its length scale when fitted well?"),
    "It grows large, so differences in that feature barely affect similarity",
    [
      ["It shrinks to zero", "ard-shrinks", "A tiny length scale would amplify the irrelevant feature."],
      ["It stays at $1$", "ard-fixed", "ARD lets it adapt."],
      ["It becomes negative", "ard-negative", "Length scales are positive."],
    ]),
  num(m(RB, "transfer-nystrom", "transfer", 9, 75, "A Nyström approximation with $m = 500$ landmarks needs an $n \\times m$ kernel block. For $n = 200{,}000$, how many entries (in millions)?"), 100),
  short(m(RB, "transfer-universal", "transfer", 10, 180, "The RBF kernel is called *universal*. What does that mean, and why doesn't it guarantee good performance?"),
    [
      ["universal", "Its RKHS is dense in the continuous functions, so in principle it can approximate any continuous target", 2, true],
      ["caveat", "Finite data, the chosen bandwidth and regularisation still decide generalisation; universality says nothing about sample efficiency", 2, true],
    ]),
  num(m(RB, "transfer-kernel-sum-predict", "transfer", 10, 90, "An RBF kernel model has $\\boldsymbol{\\alpha} = [1, 1]$ on centres at distances $0$ and $1$ from a query, with $\\gamma = \\ln 2$. What is the prediction $\\sum_i \\alpha_i k_i$?"), 1.5),
  mcq(m(RB, "transfer-rbf-network", "transfer", 10, 90, "An RBF network predicts $\\sum_j w_j e^{-\\gamma\\|\\mathbf{x} - \\mathbf{c}_j\\|^{2}}$ with centres $\\mathbf{c}_j$ chosen by $k$-means. How does it relate to a kernel SVM?"),
    "Both are weighted sums of Gaussian bumps, but the RBF network picks a few centres up front, while the SVM centres on its support vectors",
    [
      ["They're identical", "rbfnet-identical", "They choose centres and weights differently."],
      ["RBF networks are linear models of the raw input", "rbfnet-linear", "They're linear in the RBF features, not the raw input."],
      ["SVMs don't use Gaussian kernels", "svm-no-gaussian", "RBF SVMs do."],
    ]),
  mcq(m(RB, "recall-gamma-meaning", "recall", 2, 20, "In $e^{-\\gamma\\|\\mathbf{x} - \\mathbf{z}\\|^{2}}$, increasing $\\gamma$ makes the kernel:"),
    "Narrower — similarity falls off faster with distance",
    [
      ["Wider", "gamma-wider", "That's what decreasing $\\gamma$ does."],
      ["Linear", "gamma-linear", "It stays Gaussian."],
      ["Unchanged", "gamma-unchanged", "$\\gamma$ controls the width."],
    ]),
  num(m(RB, "apply-1d-kernel", "apply", 3, 25, "In 1-D with $\\gamma = 2$, what is the RBF kernel between $x = 1$ and $z = 1.5$? Give $4$ decimal places."), 0.6065),
  num(m(RB, "apply-gram-entry", "apply", 4, 35, "With $\\gamma = 0.25$, what is the RBF kernel between $[0, 0]$ and $[2, 0]$? Give $4$ decimal places."), 0.3679),
];

// ---------------------------------------------------------------------------
// svm
// ---------------------------------------------------------------------------
const SV = "svm";
const svm: Item[] = [
  // 1–10
  mcq(m(SV, "recall-margin", "recall", 1, 15, "In an SVM, the *margin* is:"),
    "The distance between the decision boundary and the closest training points",
    [
      ["The number of misclassified points", "margin-errors", "That's the error count."],
      ["The training loss", "margin-loss", "It's a geometric distance."],
      ["The learning rate", "margin-lr", "SVMs don't need one for the dual."],
    ]),
  mcq(m(SV, "recall-labels", "recall", 1, 15, "SVMs conventionally encode the two classes as:"),
    "$y \\in \\{-1, +1\\}$",
    [
      ["$y \\in \\{0, 1\\}$", "svm-labels-01", "That's logistic regression's usual coding."],
      ["$y \\in \\{1, 2\\}$", "svm-labels-12", "The $\\pm 1$ coding makes $yf$ a signed margin."],
      ["Any real number", "svm-labels-real", "That's regression."],
    ]),
  mcq(m(SV, "recall-prediction", "recall", 1, 15, "A linear SVM classifies a point $\\mathbf{x}$ by:"),
    "The sign of $\\mathbf{w} \\cdot \\mathbf{x} + b$",
    [
      ["Its distance to the nearest support vector", "svm-nearest", "That's closer to 1-NN."],
      ["A majority vote of neighbours", "svm-vote", "That's $k$-NN."],
      ["The largest probability", "svm-probability", "SVMs output signed scores, not probabilities."],
    ]),
  mcq(m(SV, "recall-c-role", "recall", 2, 20, "In a soft-margin SVM, what does a *small* $C$ do?"),
    "Tolerates more margin violations in exchange for a wider margin — stronger regularisation",
    [
      ["Forbids any margin violations", "small-c-hard", "That's the large-$C$ (hard-margin) limit."],
      ["Shrinks the margin", "small-c-narrow", "Small $C$ widens it."],
      ["Has no effect", "small-c-none", "$C$ controls the trade-off."],
    ]),
  num(m(SV, "apply-margin-width", "apply", 2, 25, "With $\\|\\mathbf{w}\\| = 4$, what is the margin width $\\frac{2}{\\|\\mathbf{w}\\|}$?"), 0.5),
  num(m(SV, "apply-score", "apply", 3, 25, "$\\mathbf{w} = [3, -2]$ and $b = -1$. What is the score $\\mathbf{w} \\cdot \\mathbf{x} + b$ for $\\mathbf{x} = [1, 1]$?"), 0),
  num(m(SV, "apply-distance", "apply", 3, 30, "$\\mathbf{w} = [3, 4]$, $b = -5$. What is the distance from $\\mathbf{x} = [3, 4]$ to the hyperplane, $\\frac{|\\mathbf{w} \\cdot \\mathbf{x} + b|}{\\|\\mathbf{w}\\|}$?"), 4),
  num(m(SV, "apply-hinge", "apply", 3, 25, "What is the hinge loss $\\max(0, 1 - yf)$ for $y = 1$ and score $f = 0.4$?"), 0.6),
  num(m(SV, "apply-hinge-correct", "apply", 3, 25, "What is the hinge loss for $y = -1$ and score $f = -2.5$?"), 0),
  num(m(SV, "apply-w-from-dual", "apply", 4, 40, "With $\\mathbf{w} = \\sum_i \\alpha_i y_i \\mathbf{x}_i$, support vectors $\\mathbf{x}_1 = [1, 2]$ ($y = +1$, $\\alpha = 0.5$) and $\\mathbf{x}_2 = [3, 0]$ ($y = -1$, $\\alpha = 0.5$). What is the first component of $\\mathbf{w}$?"), -1),
  // 11–20
  num(m(SV, "apply-objective", "apply", 4, 40, "Soft-margin objective $\\frac{1}{2}\\|\\mathbf{w}\\|^{2} + C\\sum_i \\xi_i$ with $\\|\\mathbf{w}\\|^{2} = 4$, $C = 10$ and slacks summing to $0.3$. What is it?"), 5),
  num(m(SV, "apply-gram-entries", "apply", 4, 35, "A kernel SVM on $n = 25{,}000$ points needs a Gram matrix with how many entries (in millions)?"), 625),
  mcq(m(SV, "apply-sv-types", "apply", 5, 40, "In a soft-margin SVM, a training point with $0 < \\alpha_i < C$ is:"),
    "A support vector lying exactly on the margin",
    [
      ["A point beyond the margin", "sv-alpha-zero", "Those have $\\alpha_i = 0$."],
      ["A margin violator", "sv-alpha-c", "Those have $\\alpha_i = C$."],
      ["Not a support vector", "sv-not-sv", "Nonzero $\\alpha$ means it's a support vector."],
    ]),
  short(m(SV, "explain-max-margin", "explain", 6, 120, "Why does maximising the margin, rather than just separating the data, tend to generalise better?"),
    [
      ["robust", "A wide margin leaves room for noise: small perturbations of points don't cross the boundary", 2, true],
      ["capacity", "It limits the classifier's effective capacity (margin-based bounds), reducing overfitting", 2, true],
    ]),
  short(m(SV, "explain-dual", "explain", 6, 120, "Why is the SVM's dual formulation useful?"),
    [
      ["kernel", "The data appear only through inner products $\\mathbf{x}_i \\cdot \\mathbf{x}_j$, so kernels can replace them", 2, true],
      ["sparsity", "The solution depends only on the support vectors (nonzero $\\alpha_i$)", 2, true],
    ]),
  mcq(m(SV, "explain-outliers", "explain", 6, 50, "Why is an SVM unaffected by a correctly classified point far from the boundary?"),
    "Its hinge loss is zero and it isn't a support vector, so it doesn't influence the solution",
    [
      ["SVMs delete distant points", "svm-delete", "They're kept but carry zero weight."],
      ["Distant points have negative weight", "svm-negative-weight", "Their $\\alpha$ is zero."],
      ["It is affected strongly", "svm-affected", "Only support vectors matter."],
    ]),
  num(m(SV, "transfer-loo-bound", "transfer", 7, 60, "The leave-one-out error of an SVM is at most $\\frac{\\#\\text{SV}}{n}$. With $45$ support vectors among $900$ points, what is the bound?"), 0.05),
  mcq(m(SV, "transfer-platt", "transfer", 7, 60, "How does Platt scaling turn SVM scores into probabilities?"),
    "It fits a sigmoid $\\frac{1}{1 + e^{Af + B}}$ to the scores on held-out data",
    [
      ["It divides scores by their maximum", "platt-max", "That doesn't give calibrated probabilities."],
      ["It retrains the SVM with cross-entropy", "platt-retrain", "It's a post-hoc sigmoid fit."],
      ["It counts support vectors", "platt-count", "It fits a calibration curve."],
    ]),
  num(m(SV, "transfer-functional-margin", "transfer", 8, 60, "A point with $y = +1$ has score $f = 2.4$ and $\\|\\mathbf{w}\\| = 1.2$. What is its geometric margin $\\frac{yf}{\\|\\mathbf{w}\\|}$?"), 2),
  short(m(SV, "transfer-scaling-poor", "transfer", 8, 150, "Why do kernel SVMs scale poorly to millions of examples, and what is usually used instead?"),
    [
      ["cost", "Training needs the Gram matrix and roughly $O(n^{2})$–$O(n^{3})$ time; prediction cost grows with the number of support vectors", 2, true],
      ["alternatives", "Linear SVMs (e.g. LIBLINEAR), kernel approximations, gradient-boosted trees or neural networks", 2, true],
    ]),
  // 21–30
  mcq(m(SV, "transfer-hinge-logistic", "transfer", 8, 60, "Both SVMs and logistic regression minimise a regularised loss. What is the key difference between hinge and logistic loss?"),
    "Hinge loss is exactly zero beyond the margin (giving sparse support vectors); logistic loss is always positive, so every point contributes",
    [
      ["Hinge loss is smooth everywhere", "hinge-smooth", "It has a kink at $yf = 1$."],
      ["Logistic loss ignores misclassified points", "logistic-ignores", "It penalises them."],
      ["They're identical", "hinge-logistic-same", "Their shapes differ in important ways."],
    ]),
  num(m(SV, "transfer-slack", "transfer", 8, 60, "A point with $y = -1$ has score $f = 0.5$. What is its slack $\\xi = \\max(0, 1 - yf)$?"), 1.5),
  short(m(SV, "transfer-kkt", "transfer", 9, 150, "Use the KKT conditions to explain the three cases of training points in a soft-margin SVM."),
    [
      ["zero", "$\\alpha_i = 0$: point is beyond the margin, $y_i f(\\mathbf{x}_i) \\ge 1$", 1, true],
      ["margin", "$0 < \\alpha_i < C$: point lies exactly on the margin, $y_i f = 1$", 1, true],
      ["violator", "$\\alpha_i = C$: point violates the margin ($y_i f \\le 1$), possibly misclassified", 2, true],
    ]),
  num(m(SV, "transfer-bias", "transfer", 9, 75, "For an on-margin support vector with $y = +1$ and $\\mathbf{w} \\cdot \\mathbf{x} = 2.6$, what bias $b$ satisfies $y(\\mathbf{w} \\cdot \\mathbf{x} + b) = 1$?"), -1.6),
  mcq(m(SV, "transfer-class-imbalance", "transfer", 9, 75, "With $95\\%$ negatives, how can an SVM be adjusted so the minority class isn't ignored?"),
    "Use class-specific penalties, e.g. a larger $C$ for the positive class (class weights)",
    [
      ["Use a smaller $C$ for all points", "imbalance-small-c", "That doesn't target the imbalance."],
      ["Remove the bias term", "imbalance-no-bias", "That makes things worse."],
      ["Use the linear kernel", "imbalance-linear", "The kernel doesn't fix imbalance."],
    ]),
  num(m(SV, "transfer-multiclass-count", "transfer", 9, 75, "One-vs-one SVMs for $10$ classes require how many binary SVMs?"), 45),
  short(m(SV, "transfer-c-gamma", "transfer", 10, 180, "For an RBF SVM, describe how $C$ and $\\gamma$ interact and how you'd tune them."),
    [
      ["interaction", "Both control complexity: large $C$ and large $\\gamma$ both push toward overfitting; good pairs lie along a diagonal ridge", 2, true],
      ["tuning", "Search jointly on a log-scale grid (or random/Bayesian search) with cross-validation", 2, true],
    ]),
  num(m(SV, "transfer-margin-change", "transfer", 10, 90, "Doubling $\\|\\mathbf{w}\\|$ from $2$ to $4$ changes the margin width $\\frac{2}{\\|\\mathbf{w}\\|}$ by what factor?"), 0.5),
  mcq(m(SV, "recall-support-vectors", "recall", 2, 20, "Support vectors are:"),
    "The training points that lie on or inside the margin and define the decision boundary",
    [
      ["All training points", "sv-all", "Only a subset typically."],
      ["The class means", "sv-means", "They're actual training points."],
      ["The misclassified test points", "sv-test", "They come from training data."],
    ]),
  num(m(SV, "apply-norm", "apply", 2, 20, "What is $\\|\\mathbf{w}\\|$ for $\\mathbf{w} = [6, 8]$?"), 10),
];

// ---------------------------------------------------------------------------
// svms-for-regression (31 → 60)
// ---------------------------------------------------------------------------
const SR = "svms-for-regression";
const svr: Item[] = [
  // 1–10
  mcq(m(SR, "recall-tube", "recall", 1, 15, "In support vector regression, what is the $\\epsilon$-tube?"),
    "A band of width $\\pm\\epsilon$ around the prediction within which errors cost nothing",
    [
      ["The margin between two classes", "tube-classes", "SVR is regression."],
      ["The training set", "tube-training", "It's a region around the fitted function."],
      ["The learning rate", "tube-lr", "It's an error tolerance."],
    ]),
  mcq(m(SR, "recall-loss-name", "recall", 1, 15, "SVR uses which loss?"),
    "The $\\epsilon$-insensitive loss $\\max(0, |y - f| - \\epsilon)$",
    [
      ["Squared loss", "svr-squared", "That's least squares."],
      ["Hinge loss", "svr-hinge", "Hinge is for SVM classification."],
      ["Cross-entropy", "svr-ce", "That's for classification probabilities."],
    ]),
  mcq(m(SR, "recall-svs", "recall", 1, 15, "Which training points become support vectors in SVR?"),
    "Those on or outside the $\\epsilon$-tube",
    [
      ["Those strictly inside the tube", "svr-inside", "Inside points have zero loss and zero weight."],
      ["All training points", "svr-all", "Only points on or outside the tube."],
      ["The points with the smallest targets", "svr-smallest", "Location relative to the tube matters, not target size."],
    ]),
  mcq(m(SR, "recall-large-eps", "recall", 2, 20, "Making $\\epsilon$ larger generally gives:"),
    "Fewer support vectors and a flatter, sparser model",
    [
      ["More support vectors", "large-eps-more", "A wider tube contains more points."],
      ["A more wiggly fit", "large-eps-wiggly", "It ignores more small errors."],
      ["Exactly zero training error", "large-eps-zero", "Errors inside the tube aren't penalised, but the fit isn't exact."],
    ]),
  num(m(SR, "apply-loss-inside", "apply", 2, 25, "With $\\epsilon = 0.4$ and residual $-0.25$, what is the $\\epsilon$-insensitive loss?"), 0),
  num(m(SR, "apply-loss-outside", "apply", 2, 25, "With $\\epsilon = 0.4$ and residual $1.1$, what is the loss?"), 0.7),
  num(m(SR, "apply-total-loss", "apply", 3, 30, "With $\\epsilon = 0.5$, residuals are $0.2$, $-1.5$, $2$ and $0.5$. What is the total $\\epsilon$-insensitive loss?"), 2.5),
  num(m(SR, "apply-count-svs", "apply", 3, 30, "Same residuals ($0.2$, $-1.5$, $2$, $0.5$) with $\\epsilon = 0.5$. How many points are on or outside the tube?"), 3),
  num(m(SR, "apply-prediction", "apply", 3, 25, "Linear SVR with $w = 1.5$ and $b = 2$. What is the prediction at $x = 4$?"), 8),
  num(m(SR, "apply-tube-width", "apply", 3, 25, "With $\\epsilon = 0.25$, what is the total vertical width of the tube?"), 0.5),
  // 11–20
  num(m(SR, "apply-objective", "apply", 4, 40, "SVR objective $\\frac{1}{2}\\|\\mathbf{w}\\|^{2} + C\\sum_i(\\xi_i + \\xi_i^{*})$ with $\\|\\mathbf{w}\\|^{2} = 2$, $C = 5$ and slacks summing to $0.4$. What is it?"), 3),
  num(m(SR, "apply-nu", "apply", 4, 35, "In $\\nu$-SVR, $\\nu$ is a lower bound on the fraction of support vectors. With $\\nu = 0.15$ and $n = 600$, at least how many support vectors?"), 90),
  num(m(SR, "apply-dual-prediction", "apply", 5, 45, "Kernel SVR predicts $f(\\mathbf{x}) = \\sum_i (\\alpha_i - \\alpha_i^{*})k(\\mathbf{x}_i, \\mathbf{x}) + b$. With coefficient differences $[0.5, -0.2]$, kernel values $[0.8, 0.5]$ and $b = 1$, what is $f$?"), 1.3),
  short(m(SR, "explain-robustness", "explain", 6, 120, "Why is SVR less affected by a single huge outlier than ordinary least squares?"),
    [
      ["linear", "SVR's loss grows linearly outside the tube, while squared loss grows quadratically", 2, true],
      ["bounded-influence", "So the outlier's pull on the fit is bounded (its coefficient is capped at $C$)", 2, true],
    ]),
  short(m(SR, "explain-epsilon-units", "explain", 6, 120, "Why is a library's default $\\epsilon$ (e.g. $0.1$) a poor choice without considering the target's scale?"),
    [
      ["units", "$\\epsilon$ is in the target's units: $0.1$ is huge for targets near $0.01$ and negligible for targets in the thousands", 2, true],
      ["fix", "Standardise the target or set $\\epsilon$ relative to its spread/noise level", 2, true],
    ]),
  mcq(m(SR, "explain-c-epsilon", "explain", 6, 50, "In SVR, $C$ and $\\epsilon$ control different things. Which statement is right?"),
    "$\\epsilon$ sets which errors are ignored; $C$ sets how heavily errors beyond the tube are penalised against model flatness",
    [
      ["Both set the tube width", "c-eps-same", "Only $\\epsilon$ sets the width."],
      ["$C$ sets the kernel bandwidth", "c-bandwidth", "That's $\\gamma$."],
      ["$\\epsilon$ is the learning rate", "eps-lr", "It's an error tolerance."],
    ]),
  num(m(SR, "transfer-c-scaling", "transfer", 7, 60, "Doubling $C$ in the SVR objective is equivalent to halving which coefficient in front of $\\frac{1}{2}\\|\\mathbf{w}\\|^{2}$ (as a fraction)?"), 0.5),
  mcq(m(SR, "transfer-krr-compare", "transfer", 7, 60, "Compared with kernel ridge regression, SVR:"),
    "Has a sparse solution (only support vectors), while kernel ridge uses every training point",
    [
      ["Is always more accurate", "svr-more-accurate", "Accuracy depends on the problem."],
      ["Has a closed-form solution", "svr-closed-form", "That's kernel ridge; SVR solves a QP."],
      ["Uses squared loss", "svr-squared-loss", "SVR uses the $\\epsilon$-insensitive loss."],
    ]),
  num(m(SR, "transfer-noise-epsilon", "transfer", 8, 60, "A rule of thumb sets $\\epsilon \\approx \\sigma\\sqrt{\\frac{\\ln n}{n}}$ times a constant $3$. With noise $\\sigma = 2$ and $n = 100$, what $\\epsilon$ results? Give $3$ decimal places."), 1.288),
  short(m(SR, "transfer-target-scaling", "transfer", 8, 150, "Why should the target $y$, and not only the features, be standardised before fitting SVR?"),
    [
      ["epsilon-c", "Both $\\epsilon$ and the effective penalty $C$ depend on the target's scale, so standardising makes default/tuned values transferable", 2, true],
      ["invert", "Predictions are then transformed back to the original units", 2],
    ]),
  // 21–29
  mcq(m(SR, "transfer-sparsity-benefit", "transfer", 8, 60, "Why does the sparsity of SVR's solution matter at prediction time?"),
    "Each prediction only needs kernel evaluations against the support vectors, not all training points",
    [
      ["It makes training faster than any other method", "sparsity-training", "The benefit is mainly at prediction time."],
      ["It removes the need for a kernel", "sparsity-no-kernel", "Kernels are still evaluated."],
      ["It guarantees zero training error", "sparsity-zero-error", "Sparsity concerns which points carry weight."],
    ]),
  num(m(SR, "transfer-outlier-coefficient", "transfer", 9, 75, "In SVR, an outlier's dual coefficient is capped at $C$. With $C = 2$ and a kernel value of $0.9$ at a query, what is the outlier's largest possible contribution to the prediction?"), 1.8),
  short(m(SR, "transfer-quantile-link", "transfer", 9, 150, "How is the $\\epsilon$-insensitive loss related to absolute (L1) loss, and what does that imply about what SVR estimates?"),
    [
      ["limit", "With $\\epsilon = 0$ it reduces to absolute loss", 2, true],
      ["median", "So SVR targets something like a conditional median (robust to outliers) rather than a conditional mean", 2, true],
    ]),
  num(m(SR, "transfer-svs-from-nu", "transfer", 9, 75, "In $\\nu$-SVR, $\\nu$ also upper-bounds the fraction of points outside the tube. With $\\nu = 0.1$ and $n = 2{,}000$, at most how many points lie strictly outside it?"), 200),
  mcq(m(SR, "transfer-wide-tube", "transfer", 10, 90, "If $\\epsilon$ exceeds the spread of all targets around their mean, what does linear SVR typically return?"),
    "A flat function ($\\mathbf{w} = \\mathbf{0}$), since a constant fits every point inside the tube at zero loss and minimises $\\|\\mathbf{w}\\|^{2}$",
    [
      ["The least-squares line", "wide-tube-ols", "No error is penalised, so flatness wins."],
      ["An error", "wide-tube-error", "It's a valid (degenerate) solution."],
      ["A perfect interpolation", "wide-tube-interpolate", "Interpolation needs large $\\|\\mathbf{w}\\|$, which isn't rewarded."],
    ]),
  short(m(SR, "transfer-when-svr", "transfer", 10, 180, "SVR has largely been displaced by gradient boosting for tabular regression. Name a setting where SVR can still be a good choice and why."),
    [
      ["setting", "Small-to-medium datasets with smooth relationships, where a well-tuned kernel and robustness to outliers help", 2, true],
      ["reason", "SVR's convex optimisation gives a unique solution and good generalisation with few examples", 2],
    ]),
  mcq(m(SR, "recall-svr-goal", "recall", 2, 20, "SVR tries to find a function that:"),
    "Is as flat as possible while keeping most errors within $\\epsilon$",
    [
      ["Passes through every training point", "svr-interpolate", "Small errors within the tube are allowed."],
      ["Minimises squared error only", "svr-least-squares", "It uses a different loss and a flatness penalty."],
      ["Separates two classes", "svr-classify", "That's an SVM classifier."],
    ]),
  num(m(SR, "apply-residual-loss", "apply", 4, 35, "With $\\epsilon = 1$, a prediction of $12$ for a true value of $9.5$ has what loss?"), 1.5),
  num(m(SR, "apply-inside-count", "apply", 4, 35, "With $\\epsilon = 0.3$, residuals are $0.1$, $-0.4$, $0.25$, $0.6$ and $-0.2$. How many lie strictly inside the tube?"), 3),
];

// ---------------------------------------------------------------------------
// decision-tree
// ---------------------------------------------------------------------------
const DT = "decision-tree";
const tree: Item[] = [
  // 1–10
  mcq(m(DT, "recall-root", "recall", 1, 15, "The *root* of a decision tree is:"),
    "The first node, where every example starts",
    [
      ["A leaf with the final prediction", "root-leaf", "Leaves are at the ends."],
      ["The most common class", "root-class", "It's a node, not a class."],
      ["The deepest node", "root-deepest", "It's the top node."],
    ]),
  mcq(m(DT, "recall-leaf", "recall", 1, 15, "A *leaf* of a decision tree:"),
    "Holds a final prediction and has no further splits",
    [
      ["Tests a feature", "leaf-tests", "That's an internal node."],
      ["Is always the root", "leaf-root", "The root is at the top."],
      ["Contains no training examples", "leaf-empty", "Leaves hold the examples that reach them."],
    ]),
  mcq(m(DT, "recall-scale-invariant", "recall", 1, 15, "Do decision trees need features to be standardised?"),
    "No — splits depend only on the order of values, not their scale",
    [
      ["Yes, always", "tree-scaling", "Monotone rescaling doesn't change splits."],
      ["Only for categorical features", "tree-scale-categorical", "Categories aren't scaled anyway."],
      ["Only for regression trees", "tree-scale-regression", "Neither type needs it."],
    ]),
  mcq(m(DT, "recall-regression-leaf", "recall", 2, 20, "A regression tree's leaf predicts:"),
    "The mean target value of the training examples in that leaf",
    [
      ["The most common class", "regression-leaf-mode", "That's a classification leaf."],
      ["A linear model of all features", "regression-leaf-linear", "Standard trees use a constant."],
      ["The median of all training targets", "regression-leaf-global", "It uses only that leaf's examples."],
    ]),
  num(m(DT, "apply-leaves", "apply", 2, 20, "A full binary tree of depth $4$ has how many leaves?"), 16),
  num(m(DT, "apply-internal-nodes", "apply", 3, 25, "A binary tree with $20$ leaves has how many internal split nodes?"), 19),
  num(m(DT, "apply-leaf-mean", "apply", 3, 25, "A regression leaf holds targets $4$, $6$, $5$ and $9$. What does it predict?"), 6),
  num(m(DT, "apply-trace", "apply", 3, 25, "Tree: if $x_1 \\le 3$ predict $7$; else if $x_2 \\le 1$ predict $2$; else predict $11$. What is the prediction for $(x_1, x_2) = (5, 0.5)$?"), 2),
  num(m(DT, "apply-classification-leaf", "apply", 3, 25, "A leaf holds $14$ examples of class A and $6$ of class B. What fraction of its examples does the predicted class account for?"), 0.7),
  num(m(DT, "apply-depth-1-regions", "apply", 4, 35, "A tree of depth $3$ with $2$ features partitions the plane into at most how many axis-aligned regions?"), 8),
  // 11–20
  num(m(DT, "apply-staircase", "apply", 5, 45, "To approximate the diagonal boundary $x_1 = x_2$ on $[0, 1]^{2}$ with a staircase of $k$ steps, a tree needs about $2k$ splits. How many splits for $k = 15$?"), 30),
  mcq(m(DT, "apply-interpretation", "apply", 4, 35, "A tree splits first on “income $> 50{,}000$”. What does that tell you?"),
    "That this split gave the largest impurity reduction at the root on the training data",
    [
      ["That income causes the outcome", "split-causal", "Splits reflect association in the data."],
      ["That income is the only useful feature", "split-only-feature", "Other features can appear lower down."],
      ["That the tree is overfitting", "split-overfit", "The first split says nothing about overfitting."],
    ]),
  mcq(m(DT, "apply-categorical", "apply", 5, 40, "How can a tree split on a categorical feature with categories $\\{\\text{red}, \\text{green}, \\text{blue}\\}$?"),
    "By sending a subset of categories one way and the rest the other, e.g. $\\{\\text{red}\\}$ vs. $\\{\\text{green}, \\text{blue}\\}$",
    [
      ["Only by converting to numbers $1$, $2$, $3$ and thresholding", "categorical-codes", "That imposes an arbitrary order (though some libraries do it)."],
      ["Trees can't use categorical features", "categorical-impossible", "They can split on category subsets."],
      ["By averaging the categories", "categorical-average", "Categories can't be averaged."],
    ]),
  short(m(DT, "explain-greedy", "explain", 6, 120, "Why are decision trees built greedily, and what can go wrong because of it?"),
    [
      ["greedy", "Finding the globally optimal tree is computationally intractable, so each split is chosen to be best locally", 2, true],
      ["problem", "A split that looks weak now (e.g. one half of an XOR) may be essential later, so greedy trees can miss better structures", 2, true],
    ]),
  short(m(DT, "explain-unstable", "explain", 6, 120, "Why are single decision trees unstable, and how do ensembles fix this?"),
    [
      ["unstable", "Small changes in the data can change an early split, which changes everything below it — high variance", 2, true],
      ["ensembles", "Averaging many trees (bagging, random forests) cancels much of this variance", 2, true],
    ]),
  mcq(m(DT, "explain-extrapolation", "explain", 6, 50, "A regression tree trained on house prices between $\\$100{,}000$ and $\\$900{,}000$ is asked about a mansion. What happens?"),
    "It can predict at most the highest leaf mean — trees can't extrapolate beyond the training range",
    [
      ["It extrapolates linearly", "tree-extrapolates", "Leaves are constants."],
      ["It returns an error", "tree-error", "It returns a leaf value."],
      ["It predicts a negative price", "tree-negative", "Leaf values are averages of training targets."],
    ]),
  num(m(DT, "transfer-max-depth-needed", "transfer", 7, 60, "To isolate each of $1{,}024$ distinct training points in its own leaf with a balanced binary tree, what depth is needed?"), 10),
  mcq(m(DT, "transfer-xor", "transfer", 7, 60, "Why can a greedy tree struggle with the XOR pattern ($y = x_1 \\oplus x_2$)?"),
    "No single split on $x_1$ or $x_2$ reduces impurity at the root, so a greedy criterion sees no gain from the first split",
    [
      ["Trees can't represent XOR", "tree-no-xor", "A depth-$2$ tree represents it exactly."],
      ["XOR needs a linear boundary", "xor-linear", "XOR isn't linearly separable."],
      ["The features must be scaled", "xor-scaling", "Scaling is irrelevant to trees."],
    ]),
  num(m(DT, "transfer-sse-reduction", "transfer", 8, 60, "A node's targets are $1$, $3$, $5$ and $7$. Splitting into $\\{1, 3\\}$ and $\\{5, 7\\}$ reduces the sum of squared errors from $20$ to what?"), 4),
  short(m(DT, "transfer-oblique", "transfer", 8, 150, "A boundary depends on the ratio of two features ($x_1/x_2 > 2$). Why is this hard for a standard tree, and what helps?"),
    [
      ["axis-aligned", "Standard trees make axis-aligned splits, so a ratio (an oblique boundary) needs a long staircase of splits", 2, true],
      ["fix", "Engineer the ratio as a feature, or use oblique trees/other models", 2, true],
    ]),
  // 21–30
  mcq(m(DT, "transfer-missing", "transfer", 8, 60, "How do CART-style trees often handle missing values at a split?"),
    "With surrogate splits on correlated features (or by learning which branch missing values should go to)",
    [
      ["By deleting every row with any missing value", "tree-delete-missing", "That's one crude option, not the CART approach."],
      ["By setting missing values to zero", "tree-zero-missing", "That can be very misleading."],
      ["Trees can't handle missing values at all", "tree-no-missing", "Many implementations handle them natively."],
    ]),
  num(m(DT, "transfer-leaf-count-depth", "transfer", 9, 75, "A tree with $L$ leaves has $2L - 1$ nodes in total. How many nodes for $L = 37$?"), 73),
  short(m(DT, "transfer-interpretability-limit", "transfer", 9, 150, "Trees are praised as interpretable. Why does that break down for a tree of depth $20$?"),
    [
      ["size", "A depth-$20$ tree can have up to about a million leaves, far too many rules for a person to follow", 2, true],
      ["instability", "Its structure is also unstable, so explanations may change with small data changes", 2],
    ]),
  num(m(DT, "transfer-candidate-splits", "transfer", 9, 75, "A continuous feature has $500$ distinct values at a node. How many candidate thresholds does an exhaustive split search consider?"), 499),
  mcq(m(DT, "transfer-monotone", "transfer", 10, 90, "Applying $\\log$ to a positive feature before training a tree changes the fitted tree how?"),
    "Not at all (up to the threshold values themselves), since splits depend only on the ordering",
    [
      ["Completely different splits", "log-different", "Order is preserved by $\\log$."],
      ["The tree becomes linear", "log-linear", "Trees stay piecewise constant."],
      ["It improves accuracy substantially", "log-accuracy", "Monotone transforms don't change tree predictions."],
    ]),
  short(m(DT, "transfer-trees-vs-linear", "transfer", 10, 180, "When would you expect a single shallow decision tree to beat linear regression, and when the reverse?"),
    [
      ["tree", "Trees win with strong interactions, thresholds and non-linear effects that a linear model misses", 2, true],
      ["linear", "Linear models win when the true relationship is smooth and additive, especially with little data (trees approximate it with steps)", 2, true],
    ]),
  mcq(m(DT, "recall-greedy-term", "recall", 2, 20, "The standard tree-growing algorithm is called *recursive binary splitting* because:"),
    "It splits a node into two, then applies the same procedure to each child",
    [
      ["It uses binary features only", "binary-features", "Features can be continuous."],
      ["It makes exactly two splits", "two-splits", "It keeps splitting recursively."],
      ["It predicts binary outcomes only", "binary-outcomes", "Trees handle multiclass and regression."],
    ]),
  num(m(DT, "apply-max-leaves", "apply", 4, 35, "A tree is limited to depth $6$. What is the maximum number of leaves?"), 64),
  num(m(DT, "apply-path-length", "apply", 3, 25, "A prediction passes through $4$ internal split nodes. At what depth is the leaf?"), 4),
  num(m(DT, "transfer-gain-sse", "transfer", 8, 60, "A node with SSE $50$ is split into children with SSE $12$ and $18$. What is the SSE reduction?"), 20),
];

// ---------------------------------------------------------------------------
// splitting-criteria
// ---------------------------------------------------------------------------
const SC = "splitting-criteria";
const splitting: Item[] = [
  // 1–10
  mcq(m(SC, "recall-impurity", "recall", 1, 15, "What does node *impurity* measure?"),
    "How mixed the classes are among the examples in a node",
    [
      ["How many features the node uses", "impurity-features", "It's about the labels in the node."],
      ["The node's depth", "impurity-depth", "Depth is separate."],
      ["Noise in the input features", "impurity-noise", "It's about class mixture."],
    ]),
  mcq(m(SC, "recall-goal", "recall", 1, 15, "A good split is one that:"),
    "Makes the child nodes purer than the parent",
    [
      ["Makes the children equal in size", "split-equal-size", "Balance is nice but purity is the goal."],
      ["Uses the most features", "split-most-features", "A split uses one feature."],
      ["Increases impurity", "split-more-impure", "The goal is to reduce it."],
    ]),
  mcq(m(SC, "recall-entropy-max", "recall", 1, 15, "For two classes, entropy (base $2$) is largest when the proportions are:"),
    "$50/50$, giving $1$ bit",
    [
      ["$100/0$", "entropy-max-pure", "A pure node has entropy $0$."],
      ["$90/10$", "entropy-max-skewed", "Skewed nodes are fairly pure."],
      ["$75/25$", "entropy-max-75", "Entropy peaks at an even split."],
    ]),
  mcq(m(SC, "recall-regression-criterion", "recall", 2, 20, "Regression trees usually choose splits that reduce:"),
    "The sum of squared errors (variance) within the children",
    [
      ["Gini impurity", "regression-gini", "Gini is for classification."],
      ["Entropy", "regression-entropy", "Entropy is for classification."],
      ["The number of leaves", "regression-leaves", "That's a size constraint."],
    ]),
  num(m(SC, "apply-gini-node", "apply", 2, 25, "What is the Gini impurity $1 - \\sum_k p_k^{2}$ of a node with proportions $0.8$ and $0.2$?"), 0.32),
  num(m(SC, "apply-gini-three", "apply", 3, 25, "What is the Gini impurity of a node with proportions $0.5$, $0.3$ and $0.2$?"), 0.62),
  num(m(SC, "apply-entropy", "apply", 3, 30, "What is the entropy (base $2$) of a node with proportions $0.25$ and $0.75$? Give $4$ decimal places."), 0.8113),
  num(m(SC, "apply-misclassification", "apply", 3, 25, "What is the misclassification error $1 - \\max_k p_k$ for proportions $0.6$, $0.3$, $0.1$?"), 0.4),
  num(m(SC, "apply-weighted-gini", "apply", 4, 35, "A parent of $100$ examples splits into $60$ with Gini $0.2$ and $40$ with Gini $0.45$. What is the weighted child Gini?"), 0.3),
  num(m(SC, "apply-gini-gain", "apply", 4, 35, "Continuing: the parent's Gini was $0.48$. What is the Gini decrease?"), 0.18),
  // 11–20
  num(m(SC, "apply-info-gain", "apply", 5, 45, "A $50/50$ parent (entropy $1$) splits into two equal halves with proportions $0.9/0.1$ and $0.1/0.9$. Each child's entropy is $0.469$. What is the information gain? Give $3$ decimal places."), 0.531),
  num(m(SC, "apply-gini-binary", "apply", 4, 35, "For two classes, Gini simplifies to $2p(1 - p)$. What is it for $p = 0.3$?"), 0.42),
  num(m(SC, "apply-variance-reduction", "apply", 5, 45, "A regression node has targets $2$, $4$, $10$ and $12$ (variance $17$). Splitting into $\\{2, 4\\}$ and $\\{10, 12\\}$ gives child variances of $1$ each. What is the weighted variance reduction?"), 16),
  short(m(SC, "explain-gini-entropy-vs-error", "explain", 6, 120, "Why are Gini impurity and entropy preferred to misclassification error for growing trees?"),
    [
      ["sensitivity", "They're strictly concave, so they reward splits that improve class proportions even when the majority class doesn't change", 2, true],
      ["error-flat", "Misclassification error is piecewise linear and often shows zero gain for genuinely useful splits", 2, true],
    ]),
  short(m(SC, "explain-high-cardinality", "explain", 6, 120, "Why do impurity criteria favour features with many distinct values, such as a customer ID, and how can this be countered?"),
    [
      ["bias", "Many possible split points (or categories) let the tree find a split that looks pure by chance, overfitting", 2, true],
      ["counter", "Use gain ratio, limit categories, drop ID-like features, or use permutation-based/unbiased split selection", 2, true],
    ]),
  mcq(m(SC, "explain-same-split", "explain", 6, 50, "In practice, how often do Gini and entropy choose different splits?"),
    "Rarely — they usually agree, and the resulting trees perform similarly",
    [
      ["Almost always", "gini-entropy-differ", "Their curves are very similar in shape."],
      ["Never, they're identical functions", "gini-entropy-identical", "They're different functions that usually agree."],
      ["Only for regression", "gini-entropy-regression", "Both are classification criteria."],
    ]),
  num(m(SC, "transfer-gain-ratio", "transfer", 7, 60, "Gain ratio divides information gain by the split's intrinsic information. With gain $0.3$ and intrinsic information $1.5$, what is it?"), 0.2),
  num(m(SC, "transfer-intrinsic-info", "transfer", 7, 60, "A split sends $25\\%$ of examples left and $75\\%$ right. What is its intrinsic information (the entropy of $0.25/0.75$)? Give $4$ decimal places."), 0.8113),
  mcq(m(SC, "transfer-tiny-split", "transfer", 8, 60, "A split sends $990$ examples one way and $10$ the other, with the $10$ perfectly pure. Why is its impurity decrease small?"),
    "The decrease is weighted by child size, and the pure child is only $1\\%$ of the data",
    [
      ["Pure children always give zero gain", "pure-zero-gain", "Purity helps, but it's weighted by size."],
      ["The criterion ignores small children", "small-ignored", "It weights, rather than ignores, them."],
      ["Because the split is wrong", "split-wrong", "It's a legitimate but low-value split."],
    ]),
  num(m(SC, "transfer-entropy-three", "transfer", 8, 60, "What is the entropy (base $2$) of a node with proportions $0.5$, $0.25$ and $0.25$?"), 1.5),
  // 21–30
  short(m(SC, "transfer-continuous-thresholds", "transfer", 8, 150, "Explain how the best threshold on a continuous feature is found efficiently."),
    [
      ["sort", "Sort the node's examples by the feature once", 2, true],
      ["sweep", "Sweep through candidate thresholds between consecutive distinct values, updating class counts incrementally to compute each split's impurity", 2, true],
    ]),
  num(m(SC, "transfer-weighted-entropy", "transfer", 9, 75, "Children of sizes $30$ and $70$ have entropies $0$ and $0.8$. What is the weighted child entropy?"), 0.56),
  mcq(m(SC, "transfer-cost-sensitive", "transfer", 9, 75, "In fraud detection, missing fraud is far costlier than a false alarm. How can a tree's splitting reflect this?"),
    "Weight the fraud class more heavily in the impurity calculation (class weights), so splits prioritise isolating fraud",
    [
      ["Use entropy instead of Gini", "cost-entropy", "That doesn't encode costs."],
      ["Remove all non-fraud examples", "cost-remove", "The tree couldn't learn the contrast."],
      ["Grow the tree deeper only", "cost-deeper", "Depth alone doesn't encode asymmetric costs."],
    ]),
  num(m(SC, "transfer-weighted-gini", "transfer", 9, 75, "With class weights, a node has weighted proportions $0.4$ and $0.6$. What is its weighted Gini?"), 0.48),
  short(m(SC, "transfer-entropy-proof", "transfer", 10, 180, "Explain why entropy is never negative and why it's maximised by the uniform distribution over $K$ classes."),
    [
      ["nonneg", "Each term $-p_k\\log p_k \\ge 0$ because $0 \\le p_k \\le 1$ makes $\\log p_k \\le 0$", 2, true],
      ["uniform", "By Jensen's inequality (concavity of $\\log$), $H \\le \\log K$, with equality when every $p_k = \\frac{1}{K}$", 2, true],
    ]),
  num(m(SC, "transfer-max-entropy", "transfer", 10, 90, "What is the maximum possible entropy (base $2$) for a node with $8$ classes?"), 3),
  mcq(m(SC, "transfer-pure-split-overfit", "transfer", 10, 90, "A split produces two perfectly pure children of $1$ example each. Why might this be undesirable?"),
    "It probably fits noise; such tiny pure leaves don't generalise, which is why minimum-leaf-size limits exist",
    [
      ["Pure leaves are always ideal", "pure-ideal", "Tiny pure leaves usually overfit."],
      ["It increases impurity", "pure-increases", "Impurity drops to zero there."],
      ["Trees can't create leaves of size $1$", "leaf-size-one", "They can, unless limited."],
    ]),
  mcq(m(SC, "recall-gini-pure", "recall", 2, 20, "What is the Gini impurity of a perfectly pure node?"),
    "$0$",
    [
      ["$1$", "gini-pure-one", "A pure node has $\\sum p_k^{2} = 1$, so Gini is $0$."],
      ["$0.5$", "gini-pure-half", "That's a $50/50$ binary node."],
      ["Undefined", "gini-pure-undefined", "It's well defined."],
    ]),
  num(m(SC, "apply-gini-uniform", "apply", 4, 35, "What is the Gini impurity of a node with $4$ equally frequent classes?"), 0.75),
  num(m(SC, "apply-entropy-pure", "apply", 2, 20, "What is the entropy of a node whose examples all belong to one class?"), 0),
];

export const mlSixty06Items: Item[] = [
  ...mds,
  ...kernel,
  ...mercer,
  ...rbf,
  ...svm,
  ...svr,
  ...tree,
  ...splitting,
];
