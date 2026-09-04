import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 5 — kernels: the one idea that lets a linear method
 * fit a nonlinear boundary without ever leaving the linear algebra. Mirrors
 * `assessments/ml-05-kernels.md`.
 */

const kernel: WikiArticle = {
  conceptId: "kernel",
  summary:
    "A kernel is a function K(x, z) that returns the inner product of x and z after some feature " +
    "map φ, without ever computing φ. Any algorithm written purely in terms of inner products can " +
    "therefore be run in a high- or infinite-dimensional feature space at the cost of the original " +
    "one. That substitution is the kernel trick.",

  sections: [
    {
      heading: "The trick, stated precisely",
      blocks: [
        {
          kind: "formula",
          latex: "K(x, z) = ⟨φ(x), φ(z)⟩",
          caption: "A kernel is an inner product in a feature space you never build",
        },
        {
          kind: "prose",
          text:
            "The observation that makes it work is that many algorithms — SVMs, ridge regression, " +
            "PCA, k-means — can be rewritten so the data appears only inside inner products. Once " +
            "that is true, swapping ⟨x, z⟩ for K(x, z) transports the whole algorithm into the " +
            "feature space with no other change.",
        },
        {
          kind: "example",
          title: "Seeing the saving in one line",
          problem: "Take K(x, z) = (xᵀz)² on two-dimensional inputs. What feature map does it implement, and what does it cost?",
          steps: [
            "(xᵀz)² = (x₁z₁ + x₂z₂)² = x₁²z₁² + 2x₁x₂z₁z₂ + x₂²z₂².",
            "That is ⟨φ(x), φ(z)⟩ for φ(x) = (x₁², √2·x₁x₂, x₂²).",
            "Explicit route: build two 3-vectors, then a 3-dimensional dot product.",
            "Kernel route: one 2-dimensional dot product, then square it.",
          ],
          answer:
            "Identical result. In d dimensions at degree p the explicit map has O(d^p) components while the kernel still costs O(d) — and for the RBF kernel the feature space is infinite-dimensional, so the explicit route does not exist at all.",
        },
      ],
    },

    {
      heading: "The standard kernels",
      blocks: [
        {
          kind: "table",
          headers: ["Kernel", "K(x, z)", "Feature space", "Hyperparameters"],
          rows: [
            ["Linear", "xᵀz", "The input space itself", "none"],
            ["Polynomial", "(γ xᵀz + r)^p", "All monomials up to degree p", "γ, r, p"],
            ["RBF / Gaussian", "exp(−γ‖x − z‖²)", "Infinite-dimensional", "γ"],
            ["Sigmoid", "tanh(γ xᵀz + r)", "Not always a valid inner product", "γ, r"],
            ["Laplacian", "exp(−γ‖x − z‖₁)", "Infinite-dimensional, less smooth", "γ"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A kernel is a similarity measure with a guarantee attached",
          text:
            "Read K(x, z) as \"how similar are these two points\" and the kernelised algorithms " +
            "become intuitive: an SVM's prediction is a weighted vote of similarities to the support " +
            "vectors. The positive-semidefiniteness requirement is what upgrades an arbitrary " +
            "similarity function into one that corresponds to a genuine geometry — which is what " +
            "Mercer's theorem certifies.",
        },
        {
          kind: "list",
          items: [
            "Kernels are closed under addition, positive scaling, and multiplication, so K₁ + K₂ and K₁·K₂ are kernels. Composite kernels for structured data are built this way.",
            "There are kernels for objects with no vector representation at all — string kernels, graph kernels, tree kernels — which is a large part of why the framework mattered.",
            "The Gram matrix Kᵢⱼ = K(xᵢ, xⱼ) is n × n, so kernel methods cost O(n²) memory and O(n²)–O(n³) time. That, not accuracy, is why they lost ground on large datasets.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Schölkopf & Smola, Learning with Kernels", locator: "Ch. 2, Kernels" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§12.3, Support Vector Machines and Kernels" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-05-kernels.md" },
  ],
};

const mercersTheorem: WikiArticle = {
  conceptId: "mercers-theorem",
  summary:
    "Mercer's theorem says a symmetric function K is an inner product in some feature space if and " +
    "only if it is positive semidefinite. It is the licence for the kernel trick: it tells you " +
    "which similarity functions can be used as kernels without ever asking you to exhibit the " +
    "feature map.",

  sections: [
    {
      heading: "The condition",
      blocks: [
        {
          kind: "formula",
          latex: "for all finite {x₁…xₙ} and all c ∈ ℝⁿ:  ΣᵢΣⱼ cᵢcⱼ K(xᵢ, xⱼ) ≥ 0",
          caption: "Every Gram matrix the kernel produces must be positive semidefinite",
        },
        {
          kind: "prose",
          text:
            "The condition is exactly what an inner product must satisfy, which is why it is both " +
            "necessary and sufficient. Necessity is one line: if K(x, z) = ⟨φ(x), φ(z)⟩ then " +
            "ΣᵢΣⱼ cᵢcⱼ⟨φ(xᵢ), φ(xⱼ)⟩ = ‖Σᵢ cᵢφ(xᵢ)‖² ≥ 0, since a squared norm cannot be negative. " +
            "Sufficiency is the substantial half of the theorem: it constructs the feature space " +
            "from the kernel's eigenfunctions.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It converts an existence question into a matrix property",
          text:
            "\"Is there some φ, possibly infinite-dimensional, whose inner product this is?\" is not " +
            "a question you can answer by searching. Mercer replaces it with \"is every Gram matrix " +
            "PSD?\" — a checkable property of the function you already have. That is what makes " +
            "kernel design a tractable activity.",
        },
      ],
    },

    {
      heading: "Why it matters in practice",
      blocks: [
        {
          kind: "prose",
          text:
            "The SVM dual is a convex quadratic program precisely when the Gram matrix is positive " +
            "semidefinite. Feed it an indefinite kernel and convexity is lost: the solver may " +
            "converge to a local optimum, may not converge at all, and the geometric story about " +
            "margins in a feature space no longer holds. The theorem is not bookkeeping — it is the " +
            "precondition for the optimisation being well posed.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The sigmoid kernel is the standard cautionary tale",
          text:
            "tanh(γ xᵀz + r) is offered by every SVM library and is not PSD for most parameter " +
            "settings. It often works anyway, which is worse than failing loudly: the resulting " +
            "problem is non-convex, the solution depends on the solver's starting point, and " +
            "results are not reproducible across implementations.",
        },
        {
          kind: "list",
          items: [
            "Mercer's theorem underwrites the reproducing kernel Hilbert space (RKHS) view: the feature space it constructs is exactly the RKHS whose reproducing kernel is K.",
            "It is also what makes Gaussian processes well defined — a GP's covariance function must be a valid kernel, or the implied covariance matrices are not valid covariance matrices.",
            "The closure properties (sums, products, positive scalings of kernels are kernels) are corollaries, and they are how new kernels are built without re-proving PSD from scratch.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Schölkopf & Smola, Learning with Kernels", locator: "§2.2, The Representation of Similarities in Linear Spaces" },
    { source: "Rasmussen & Williams, Gaussian Processes for Machine Learning", locator: "Ch. 4, Covariance Functions" },
    { source: "Hsing & Eubank, Theoretical Foundations of Functional Data Analysis", locator: "Ch. 4, Mercer's Theorem and RKHS" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-05-kernels.md" },
  ],
};

const rbf: WikiArticle = {
  conceptId: "rbf",
  summary:
    "The radial basis function kernel, exp(−γ‖x − z‖²), measures similarity as a Gaussian bump " +
    "around each point. It is the default kernel for good reason — it can approximate any " +
    "continuous decision boundary — and its single bandwidth parameter γ controls the whole " +
    "bias–variance trade-off on its own.",

  sections: [
    {
      heading: "The kernel",
      blocks: [
        {
          kind: "formula",
          latex: "K(x, z) = exp(−γ‖x − z‖²),   equivalently exp(−‖x − z‖² / 2σ²) with γ = 1/(2σ²)",
          caption: "Both parameterisations appear constantly; they are reciprocal, which is the usual source of confusion",
        },
        {
          kind: "prose",
          text:
            "K depends on x and z only through the distance between them — that is what \"radial\" " +
            "means — and it decays from 1 at zero distance towards 0 as the points separate. Every " +
            "value lies in (0, 1], so it reads directly as a similarity score.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Its feature space is infinite-dimensional",
          text:
            "Expanding the exponential as a power series gives an infinite sum of polynomial terms, " +
            "so the implicit φ has infinitely many components. This is the clearest possible " +
            "demonstration of why the kernel trick is not merely a speed-up: here the explicit " +
            "feature map cannot be computed at all, at any cost, and the kernel still can.",
        },
      ],
    },

    {
      heading: "What γ does",
      blocks: [
        {
          kind: "table",
          headers: ["γ", "Bandwidth", "Influence of one point", "Failure mode"],
          rows: [
            ["Large", "Narrow", "Very local — similarity dies quickly with distance", "Overfitting: islands of prediction around individual training points"],
            ["Well chosen", "Comparable to the data's scale", "Neighbourhood-sized", "—"],
            ["Small", "Wide", "Nearly constant similarity everywhere", "Underfitting: the kernel matrix approaches all-ones and the model becomes almost linear"],
          ],
        },
        {
          kind: "example",
          title: "How similarity collapses with γ",
          problem: "Two points are 2 units apart, so ‖x − z‖² = 4. Compute K for γ = 0.01, 0.5 and 10.",
          steps: [
            "γ = 0.01: exp(−0.04) ≈ 0.961 — nearly identical, from the kernel's point of view.",
            "γ = 0.5: exp(−2) ≈ 0.135 — clearly distinguishable.",
            "γ = 10: exp(−40) ≈ 4 × 10⁻¹⁸ — effectively unrelated.",
          ],
          answer:
            "Same data, three completely different notions of \"nearby\". γ is not a minor tuning knob; it defines the geometry the model reasons in, which is why it and C must be tuned jointly.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "γ is meaningless without feature scaling",
          text:
            "‖x − z‖² sums squared differences across features, so a feature measured in the " +
            "thousands dominates the distance and therefore dominates the kernel. A single γ then " +
            "cannot be right for all features. Standardise first; the common heuristic default " +
            "γ = 1/(d · Var(X)) is only sensible on scaled data.",
        },
      ],
    },

    {
      heading: "Where else it turns up",
      blocks: [
        {
          kind: "list",
          items: [
            "As the squared-exponential covariance function of a Gaussian process, where γ sets the length scale over which the sampled functions vary.",
            "In RBF networks, where the same bumps are used as hidden-layer basis functions with learned centres.",
            "In kernel density estimation, where the Gaussian kernel plays the role of the smoothing window and γ plays the role of the bandwidth.",
            "In kernel PCA and spectral clustering, where the RBF Gram matrix defines the affinity graph.",
          ],
        },
        {
          kind: "prose",
          text:
            "It is worth noticing that these are not four coincidences. Each is the same statement — " +
            "that closeness in input space should mean similarity of function values — applied to a " +
            "different task, which is why the same bandwidth-versus-smoothness trade-off appears in " +
            "all of them.",
        },
      ],
    },
  ],

  references: [
    { source: "Schölkopf & Smola, Learning with Kernels", locator: "§2.3, Examples of Kernels" },
    { source: "Rasmussen & Williams, Gaussian Processes for Machine Learning", locator: "§4.2, Examples of Covariance Functions" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-05-kernels.md" },
  ],
};

export const ml05Kernels: WikiArticle[] = [kernel, mercersTheorem, rbf];
