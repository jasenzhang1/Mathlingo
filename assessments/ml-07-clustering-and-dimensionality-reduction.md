# Machine Learning Cluster 7 — Clustering & Dimensionality Reduction

Clustering Methods, K-Means Clustering, SVD for Clustering, Probabilistic PCA, Kernel PCA, t-SNE,
UMAP, Independent Component Analysis, Principal Component Analysis (9 concepts). Same format as
[Cluster 1](ml-01-foundations.md).

`k-means-clustering`'s E1 reaches directly back into `law-of-total-variance`, and `ica`'s items are
built entirely around `covariance`'s Cov(X,X²)=0 counterexample from the probability/statistics
sweep — ICA exists precisely because PCA's uncorrelatedness doesn't rule out that kind of dependence.

---

## Clustering Methods (`clustering-methods`)
*Prereq: Supervised vs Unsupervised Learning · ancestors 3 · b₀ = 0.19*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.81 | Define clustering. | grouping data points so that points within a cluster are more similar to each other than to points in other clusters — an unsupervised task | — |
| R2 | recall | mcq | −0.55 | The main challenge in evaluating a clustering result, compared to a supervised classifier, is: | there's no ground-truth labels to compare against — "good" clustering is somewhat subjective/task-dependent | claims "clustering always achieves 100% accuracy" — accuracy isn't even a well-defined concept without labels → `clustering-methods` |
| A1 | apply | short-answer | 0.0 | Is clustering supervised or unsupervised? Why? | unsupervised — no labels are used; the algorithm discovers group structure entirely on its own | — |
| E1 | explain | short-answer | 0.69 | Why can different clustering algorithms give genuinely different groupings of the same data? | unlike supervised learning, where labels define a single target to converge toward, clustering has no objectively correct partition — different algorithmic assumptions (e.g. K-means assuming roughly spherical, similarly-sized clusters) lead to different, equally defensible results *(required: names that there's no single correct answer, unlike supervised learning)* | — |
| T1 | transfer | short-answer | 1.19 | Why is choosing the number of clusters K often one of the hardest practical decisions in clustering? | unlike supervised learning's cross-validation, which directly measures prediction accuracy, there's no similarly objective score to optimize over K — heuristics like the "elbow method" exist but require subjective judgment about where a curve bends *(required: the contrast with supervised CV's objectivity)* | — |

*Coverage: 5 items, −0.81…1.19.*

---

## K-Means Clustering (`k-means-clustering`)
*Prereq: Clustering Methods · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Describe the K-means algorithm's iterative steps. | initialize K centroids; assign each point to its nearest centroid; update each centroid to the mean of its assigned points; repeat until convergence | — |
| R2 | recall | mcq | −0.45 | K-means is guaranteed to converge to: | some local optimum, which can depend on the initial centroid placement | claims it always finds "the global optimum every time" — a genuinely important, common overstatement → `k-means-clustering` |
| A1 | apply | short-answer | 0.1 | Why does running K-means multiple times with different random initializations, keeping the best result, mitigate R2's local-optimum problem? | different initializations can converge to different local optima; running several and keeping the one with the lowest total within-cluster distance increases the chance of landing near the global optimum, without any guarantee of finding it exactly *(required)* | — |
| E1 | explain | short-answer | 0.8 | What objective is K-means minimizing, and how does that connect to `law-of-total-variance`'s decomposition? | it minimizes the total within-cluster sum of squared distances to each centroid; since total variance is fixed regardless of clustering, minimizing within-cluster variance is *exactly* equivalent to maximizing between-cluster variance — the identical decomposition from that earlier concept, now optimized directly *(required: the explicit "fixed total, so minimizing one term maximizes the other" argument)* | — |
| T1 | transfer | short-answer | 1.3 | Why does K-means perform poorly on clusters with very different shapes or sizes? | using Euclidean distance to a single centroid implicitly assumes clusters are roughly spherical and similarly sized; a tight small cluster next to a large elongated one violates this assumption, and methods like DBSCAN or Gaussian mixture models, which don't share this implicit assumption, often handle such cases better *(required: names the spherical/equal-size assumption specifically)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## SVD for Clustering (`svd-for-clustering`)
*Prereq: Clustering Methods, SVD · ancestors 22 · b₀ = 1.07*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.07 | Describe the basic idea of SVD-for-clustering. | apply SVD to reduce dimensionality first (keeping only the top few components), then run a clustering algorithm on the reduced representation | — |
| R2 | recall | mcq | 0.37 | A key reason to cluster in the reduced space rather than the original high-dimensional one is: | it can mitigate the curse of dimensionality's problem of distances becoming uninformative in high dimensions | claims "SVD always improves clustering accuracy with no downside" — an overclaim, not the actual justification → `svd-for-clustering` |
| A1 | apply | short-answer | 0.87 | Using Eckart-Young's guarantee, why does using the top-k SVD components (rather than a random k features) preserve the most structure for a given reduced dimensionality? | Eckart-Young proves the top-k SVD truncation is the *provably best* rank-k approximation of the data in a specific norm; a random feature subset carries no such optimality guarantee and typically preserves far less of the data's structure *(required: the explicit optimality claim)* | — |
| E1 | explain | short-answer | 1.57 | What is a genuine risk of this approach? | SVD/PCA-based reduction preserves *variance*, but directions of maximum variance aren't always the directions that best separate meaningful clusters — true cluster structure could, in principle, lie along a low-variance direction that gets discarded *(required)* | — |
| T1 | transfer | short-answer | 2.07 | Why can spectral clustering find structures (like two interleaving crescent shapes) that K-means on raw or SVD-reduced data cannot? | spectral clustering uses eigenvectors of a similarity/graph matrix rather than raw Euclidean distance, capturing cluster structure through *graph connectivity* rather than straight-line or centroid-distance geometry — this lets it separate non-convex shapes that no simple distance-based method can *(required: names graph connectivity as the distinguishing mechanism)* | — |

*Coverage: 5 items, 0.07…2.07.*

---

## Probabilistic PCA (`probabilistic-pca`)
*Prereq: PCA, MLE · ancestors 36 · b₀ = 1.31*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.31 | Describe Probabilistic PCA (PPCA). | a generative model explaining observed data X as arising from a lower-dimensional latent Z via a linear map plus Gaussian noise: X=WZ+μ+ε | — |
| R2 | recall | mcq | 0.61 | Ordinary PCA is recovered from PPCA: | as the noise variance ε→0, in the maximum-likelihood limit | claims the two are "completely unrelated methods" — PPCA's MLE solution recovers classic PCA exactly in that limit → `probabilistic-pca` |
| A1 | apply | short-answer | 1.11 | What practical advantage does PPCA have over ordinary PCA, specifically because it's a full probabilistic model? | it can naturally handle missing data via the EM algorithm, and provides a principled way to choose the number of latent dimensions via likelihood-based model comparison — neither is available directly from ordinary (deterministic) PCA *(required: both capabilities named)* | — |
| E1 | explain | short-answer | 1.81 | How does framing PCA as PPCA connect it to `mle`? | the principal components can be found by maximizing the likelihood of the observed data under this Gaussian latent-variable model, rather than the purely geometric route (eigenvectors of the covariance matrix) — two different derivations converging on the same answer in the noise→0 limit *(required: names both derivation routes and their convergence)* | — |
| T1 | transfer | short-answer | 2.31 | Why does PPCA's explicit noise model make it a stepping stone toward more complex generative models? | its probabilistic structure extends naturally to models like Factor Analysis (different noise variance per feature) and eventually neural-network-based generative models like VAEs, since PPCA already frames dimensionality reduction as a generative, likelihood-based process rather than a purely geometric one *(required: names at least one concrete extension)* | — |

*Coverage: 5 items, 0.31…2.31.*

---

## Kernel PCA (`kernel-pca`)
*Prereq: PCA, Kernel · ancestors 36 · b₀ = 1.31*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.31 | Describe kernel PCA. | apply the kernel trick to PCA, performing ordinary PCA implicitly in a (possibly infinite-dimensional) feature space defined by a kernel, without explicitly computing that mapping | — |
| R2 | recall | mcq | 0.61 | Kernel PCA is useful when: | the data's true structure is nonlinear (e.g. a curved manifold) — ordinary PCA would miss it entirely | claims it's for data whose "true structure lies along a linear subspace" — that's exactly when ordinary PCA already suffices → `kernel-pca` |
| A1 | apply | short-answer | 1.11 | Why does ordinary PCA fail on data lying exactly along a curved spiral in 2D, while kernel PCA can succeed? | ordinary PCA can only find linear (straight-line) directions of maximum variance; a curved spiral has no single linear direction capturing its structure, while an appropriate nonlinear kernel can effectively "unroll" the spiral into a space where it does become linear *(required)* | — |
| E1 | explain | short-answer | 1.81 | How does kernel PCA connect to `mercers-theorem`? | the kernel matrix used must satisfy Mercer's positive-semi-definiteness condition to correspond to any legitimate underlying feature-space PCA at all — the identical validity requirement reused from the SVM cluster, not a separate rule *(required: names it as the same requirement)* | — |
| T1 | transfer | short-answer | 2.31 | Why is kernel PCA less commonly used for visualization than newer techniques like t-SNE or UMAP? | kernel PCA's objective still preserves global variance/structure like ordinary PCA, which doesn't always produce the visually clear cluster separation that t-SNE/UMAP's local-neighborhood-preserving objectives are specifically designed to produce *(required: the objective-mismatch argument)* | — |

*Coverage: 5 items, 0.31…2.31.*

---

## t-SNE (`t-sne`)
*Prereq: Clustering Methods, KL Divergence · ancestors 15 · b₀ = 0.89*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.11 | Describe t-SNE's goal. | create a low-dimensional embedding where points close together in the original high-dimensional space remain close in the embedding — preserving local neighborhood structure, using KL-divergence to measure fidelity | — |
| R2 | recall | mcq | 0.19 | t-SNE is primarily designed to preserve: | local neighborhood structure — which points are each other's nearest neighbors | claims it preserves "global distances between all pairs, however far apart" — the opposite priority, and the source of a serious misreading of t-SNE plots → `t-sne` |
| A1 | apply | short-answer | 0.69 | Why is it a serious mistake to interpret the distance between two well-separated clusters in a t-SNE plot as meaningfully indicating how different they are? | t-SNE only optimizes local neighborhood preservation (R2); global arrangement and inter-cluster distances in the final plot are largely arbitrary artifacts of the optimization, not a reliable measure of true dissimilarity *(required: connects directly to R2's local-only focus)* | reads inter-cluster plot distance as a quantitative dissimilarity measure → `t-sne` |
| E1 | explain | short-answer | 1.39 | What role does KL-divergence play in t-SNE precisely? | it measures the difference between two probability distributions over "being neighbors" — one from similarities in the original high-dimensional space, one from the low-dimensional embedding; t-SNE optimizes the embedding to minimize this KL-divergence, directly reusing `kl-divergence` from the probability/statistics sweep as its loss function *(required: names both distributions and the minimization objective)* | — |
| T1 | transfer | short-answer | 1.89 | Why can running t-SNE multiple times on the same data produce visually different overall arrangements, even with similar local groupings? | t-SNE's optimization is non-convex, like K-means, and susceptible to different local optima depending on initialization and the perplexity hyperparameter; combined with its explicit focus on local rather than global structure, the overall layout can vary while local neighbor relationships stay largely consistent *(required: both the non-convexity and local-focus points)* | — |

*Coverage: 5 items, −0.11…1.89.*

---

## UMAP (`umap`)
*Prereq: t-SNE · ancestors 16 · b₀ = 0.92*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.08 | Describe UMAP's relationship to t-SNE. | a similar goal — preserving local neighborhood structure for visualization — built on a different mathematical foundation (topological/manifold-learning theory), generally faster, and often better at preserving some global structure | — |
| R2 | recall | mcq | 0.22 | Compared to t-SNE, UMAP is generally: | faster, with better scalability to large datasets, at similar or better visual quality | claims it's "slower but more accurate" — backwards on the main practical advantage → `umap` |
| A1 | apply | short-answer | 0.72 | Should distances between well-separated clusters in a UMAP plot be trusted as precisely meaningful? | UMAP is generally considered somewhat better than t-SNE at preserving some global structure, but the same general caution applies — local neighbor relationships are the primary thing preserved, and inter-cluster distances should still be interpreted cautiously, not as precisely quantitative *(required: the caveat, not an unqualified "yes")* | — |
| E1 | explain | short-answer | 1.42 | Why are both t-SNE and UMAP considered visualization tools primarily, rather than general preprocessing steps before further modeling? | their nonlinear, local-structure-focused embeddings don't necessarily preserve the global, linear relationships that downstream models (like linear regression) might rely on — unlike ordinary PCA, which is commonly used as a preprocessing step precisely because it preserves linear structure *(required: the PCA contrast)* | — |
| T1 | transfer | short-answer | 1.92 | Why might a data scientist choose UMAP over t-SNE for a dataset with millions of points? | UMAP's speed and scalability advantage (R2) makes it tractable where t-SNE would be computationally prohibitive, while the same caution about over-interpreting global plot geometry still applies regardless of which tool is used *(required: connects to R2's speed point specifically)* | — |

*Coverage: 5 items, −0.08…1.92.*

---

## Independent Component Analysis (`ica`)
*Prereq: PCA, KL Divergence · ancestors 35 · b₀ = 1.29*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.29 | Describe ICA's goal, and contrast it with PCA's. | recover statistically independent source signals from a mixture (e.g. the "cocktail party problem"); PCA instead finds merely *uncorrelated* directions, a strictly weaker condition | — |
| R2 | recall | mcq | 0.59 | The key difference between ICA and PCA is: | ICA seeks statistically independent components — a stronger condition than PCA's mere uncorrelatedness | claims "ICA and PCA are the same algorithm" — misses the entire point of the stronger independence requirement → `ica` |
| A1 | apply | short-answer | 1.09 | Using `covariance`'s counterexample (X~Uniform(−1,1), Y=X², Cov=0 but Y is fully determined by X), explain why PCA's uncorrelated components could still be dependent, and why ICA tries to rule this out. | Cov=0 does not imply independence, per that exact counterexample — PCA's components being uncorrelated says nothing about hidden nonlinear dependence between them; ICA explicitly targets the stronger condition of statistical independence, which would rule out even that kind of hidden dependence *(required: the direct reuse of the Cov(X,X²)=0 example, not a fresh one)* | — |
| E1 | explain | short-answer | 1.79 | Why does ICA typically require at most one true source to be Gaussian? | for Gaussian variables specifically, uncorrelated and independent coincide — a special property unique to the Gaussian/multivariate-normal family; ICA's use of higher-order statistical structure beyond correlation provides no extra information when sources are genuinely Gaussian, so it can't outperform PCA in that special case *(required: the Gaussian uncorrelated=independent special case)* | — |
| T1 | transfer | short-answer | 2.29 | Explain the cocktail party problem, and why ICA (not PCA) is the right tool for it. | several microphones each record a different linear mixture of the same underlying independent speakers; ICA, by seeking statistically independent components, matches the true generative structure (independent original voices) and can separate them, while PCA's merely-uncorrelated components generally fail to correctly unmix the sources *(required: names the linear-mixture setup and why independence, not mere uncorrelatedness, is the right target)* | — |

*Coverage: 5 items, 0.29…2.29.*

---

## Principal Component Analysis (`pca`)
*Prereq: PCA (Matrix Edition), Covariance Matrix · ancestors 33 · b₀ = 1.26*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | 0.26 | State PCA's practical goal, as distinct from `pca-matrix-edition`'s linear-algebra machinery. | dimensionality reduction — project high-dimensional data onto fewer dimensions (the top principal components) while retaining as much variance as possible | — |
| R2 | recall | mcq | 0.56 | PCA is used for all of these *except*: | directly improving predictive accuracy on every possible task, guaranteed | picks a legitimate use (visualization, or preprocessing before another algorithm) as the exception, missing that PCA's unsupervised nature is exactly what makes the "guaranteed improvement" claim false | 
| A1 | apply | short-answer | 1.06 | A 1000-feature dataset has its top 10 principal components explaining 95% of total variance. What's the practical implication for dimensionality reduction before modeling? | the data's effective dimensionality is far lower than 1000 — reducing to just 10 components retains nearly all the variance, letting downstream models train on a dramatically smaller, largely-equivalent representation *(required: the "effective dimensionality much lower" framing)* | — |
| E1 | explain | short-answer | 1.76 | What's the key risk of PCA-based reduction for supervised tasks, and what alternative exists because of it? | PCA is unsupervised and never looks at the outcome; a low-variance direction it discards could, in principle, be the *most* predictive direction for a specific supervised task — this is exactly why supervised alternatives like LDA or partial least squares exist, echoing `lda`'s earlier contrast with PCA *(required: the direct callback to lda's supervised/unsupervised distinction)* | — |
| T1 | transfer | short-answer | 2.26 | How does the "elbow" heuristic for choosing the number of components to keep connect to `eckart-young`'s point about image compression? | both are the same underlying phenomenon: real data's structure typically concentrates in a few dominant directions (rapidly decaying singular values), so a scree plot's marginal-variance elbow and image compression's negligible small singular values are two views of the identical fact *(required: names the shared rapid-decay phenomenon explicitly)* | — |

*Coverage: 5 items, 0.26…2.26. This is the final concept of the machine-learning domain's clustering/dimensionality-reduction arc, closing the loop back to `eckart-young` from the linear-algebra sweep.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| clustering evaluated as if ground-truth accuracy existed | `clustering-methods` |
| K-means assumed to guarantee the global optimum | `k-means-clustering` |
| SVD-based reduction assumed to have no downside for clustering | `svd-for-clustering` |
| PPCA and ordinary PCA treated as unrelated methods | `probabilistic-pca` |
| kernel PCA's use case (nonlinear structure) inverted | `kernel-pca` |
| t-SNE/UMAP inter-cluster plot distances read as quantitatively meaningful | `t-sne`, `umap` |
| PCA's uncorrelatedness conflated with independence | `ica` |
| PCA assumed to universally improve downstream predictive accuracy | `pca` |

**Cluster total: 45 items across 9 concepts.** `ica`'s A1 is the most pointed cross-domain callback
in the ML sweep — the exact Cov(X,X²)=0 counterexample from the probability sweep is what ICA, as a
method, exists to rule out.
