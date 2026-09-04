import type { WikiArticle } from "./types";

export const gaussianMixtureModelsWiki: WikiArticle = {
  conceptId: "gaussian-mixture-models",
  summary:
    "A Gaussian mixture model is the mixture model with multivariate Normal components, fitted by EM. " +
    "Each component carries its own mean, covariance, and mixing weight, so clusters may be " +
    "ellipsoidal, differently sized, and differently oriented — none of which K-means can express. " +
    "Because the model has an explicit likelihood, it also supports things clustering algorithms " +
    "usually cannot: density estimation, principled model selection over K, and calibrated " +
    "uncertainty about which cluster a point belongs to.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "p(x) = Σ_{k=1}^{K} π_k · N(x ; μ_k, Σ_k)",
          caption: "K multivariate Normal components with weights π_k summing to 1",
        },
        {
          kind: "definitions",
          items: [
            { term: "π_k", description: "Mixing weight — the prior probability a point comes from component k." },
            { term: "μ_k", description: "Component mean, a vector in R^d — where the cluster sits." },
            {
              term: "Σ_k",
              description:
                "Component covariance, a d×d PSD matrix — the cluster's shape, size, and orientation.",
            },
            {
              term: "γ_{ik}",
              description:
                "Responsibility: P(Z_i = k | x_i), how much point i belongs to component k. Rows sum to 1.",
            },
          ],
        },
        {
          kind: "prose",
          text:
            "Parameter count grows quickly. Full covariances cost K·d(d+1)/2 parameters, which for " +
            "d = 50 and K = 5 is already 6375 numbers before the means. Constrained families — " +
            "diagonal, spherical, or a shared covariance tied across components — are the standard " +
            "response and are worth trying before concluding a GMM does not fit.",
        },
      ],
    },

    {
      heading: "Fitting by EM",
      blocks: [
        {
          kind: "prose",
          text:
            "The EM updates for a GMM are the general EM recipe with Gaussian components substituted " +
            "in, and every M-step has a closed form. Read them as responsibility-weighted versions of " +
            "the ordinary sample mean and sample covariance.",
        },
        {
          kind: "formula",
          latex: "γ_{ik} = π_k N(xᵢ; μ_k, Σ_k) / Σⱼ π_j N(xᵢ; μ_j, Σ_j)",
          caption: "E-step: soft assignment by Bayes' rule",
        },
        {
          kind: "formula",
          latex: "N_k = Σᵢ γ_{ik};  π_k = N_k/n;  μ_k = (1/N_k)Σᵢ γ_{ik}xᵢ;  Σ_k = (1/N_k)Σᵢ γ_{ik}(xᵢ−μ_k)(xᵢ−μ_k)ᵀ",
          caption: "M-step: weighted counts, weighted means, weighted covariances",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "N_k is an effective count",
          text:
            "N_k = Σᵢ γ_{ik} is how many points component k owns, counting fractions. Under hard " +
            "assignment it would be an integer and these formulas would be exactly the per-cluster " +
            "sample mean and covariance. Softness is the only difference.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The singularity that will bite you",
          text:
            "Let one component's mean sit exactly on a data point and shrink its covariance toward " +
            "zero: that point's density goes to infinity, and so does the likelihood. The maximum " +
            "likelihood problem for a GMM with free covariances is genuinely unbounded, so “find the " +
            "global maximum” is not even a well-posed goal. Standard fixes are a small ridge added to " +
            "the diagonal of each Σ_k, a minimum-variance floor, or a MAP formulation with an " +
            "inverse-Wishart prior. Every mature implementation does one of these.",
        },
      ],
    },

    {
      heading: "What GMMs buy over K-means",
      blocks: [
        {
          kind: "table",
          headers: ["", "K-means", "GMM"],
          rows: [
            ["Assignment", "Hard", "Soft, with probabilities"],
            ["Cluster shape", "Spherical, implicitly equal-sized", "Any ellipsoid via Σ_k"],
            ["Cluster size", "Implicitly equal", "Free, via π_k"],
            ["Output", "Labels", "Labels, probabilities, and a density"],
            ["Choosing K", "Elbow plot, silhouette", "AIC/BIC, held-out likelihood, plus the above"],
            ["Cost per iteration", "Cheaper", "Higher — covariance inversions"],
          ],
        },
        {
          kind: "prose",
          text:
            "The shape advantage is best read through the eigendecomposition Σ_k = QΛQᵀ. The " +
            "eigenvectors in Q give the axes of the cluster's ellipsoid and the eigenvalues in Λ give " +
            "its extent along each axis. A GMM component can therefore be long and thin, tilted at any " +
            "angle. K-means, minimising plain Euclidean distance to a centroid, is implicitly assuming " +
            "Σ = σ²I for every cluster — axis-aligned, equal in every direction, the same for all " +
            "clusters. Two elongated diagonal bands crossing at an angle are trivial for a GMM and " +
            "impossible for K-means.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "K-means as a limiting case",
          text:
            "Fix Σ_k = σ²I for all k and let σ² → 0. The responsibility of the nearest component tends " +
            "to 1 and the others to 0, since the density ratio between components is governed by " +
            "exp(−‖x−μ‖²/2σ²) and that ratio becomes infinitely sharp. The E-step becomes nearest-" +
            "centroid assignment and the M-step becomes the centroid mean. K-means is not similar to a " +
            "GMM; it is one, at zero temperature.",
        },
      ],
    },

    {
      heading: "Choosing K",
      blocks: [
        {
          kind: "prose",
          text:
            "Both methods face the same question and a GMM has one genuine advantage in answering it: " +
            "it defines a likelihood. That makes the information criteria from the regression domain " +
            "directly applicable, where K-means — having no likelihood — can only offer heuristics like " +
            "the elbow plot.",
        },
        {
          kind: "formula",
          latex: "BIC = −2·log L̂ + p·log n,   AIC = −2·log L̂ + 2p",
          caption: "p is the number of free parameters, which grows fast with K and d — choose the smallest value",
        },
        {
          kind: "example",
          title: "Comparing two values of K",
          problem:
            "n = 1000 points in d = 2. K = 2 gives log L̂ = −3200; K = 3 gives −3150. Full covariances. " +
            "Which does BIC prefer?",
          steps: [
            "Parameters per component: 2 (mean) + 3 (2×2 symmetric covariance) = 5, plus K−1 free mixing weights.",
            "K = 2: p = 10 + 1 = 11. BIC = 6400 + 11(6.9078) = 6400 + 75.99 = 6475.99.",
            "K = 3: p = 15 + 2 = 17. BIC = 6300 + 17(6.9078) = 6300 + 117.43 = 6417.43.",
            "Lower BIC wins.",
          ],
          answer:
            "K = 3, by about 58 BIC units. The 50-point gain in log-likelihood comfortably outweighs " +
            "the 6 extra parameters. Had the gain been only 15, the penalty would have flipped the " +
            "verdict — which is the whole point of using a criterion rather than raw likelihood, since " +
            "raw likelihood always prefers larger K.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "BIC selects a good density model, not the true number of clusters",
          text:
            "If the real clusters are not Gaussian, BIC will happily use several Gaussian components to " +
            "tile one non-Gaussian cluster, and report a K larger than any substantive interpretation " +
            "would want. The criterion answers “how many components describe this density well?”, which " +
            "coincides with “how many groups are there?” only when the components are correctly " +
            "specified.",
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§9.2, Mixtures of Gaussians; §9.2.1 the singularity problem" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§6.8, Mixture models for density estimation and classification" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§21.4, Clustering using mixture models" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-02-latent-variables-and-em.md" },
  ],
};
