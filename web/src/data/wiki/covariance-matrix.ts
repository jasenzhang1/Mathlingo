import type { WikiArticle } from "./types";

export const covarianceMatrixWiki: WikiArticle = {
  conceptId: "covariance-matrix",
  summary:
    "The covariance matrix Σ collects every pairwise covariance among the components of a random " +
    "vector into a single symmetric matrix, with the variances on its diagonal. Packaging them this " +
    "way is not just tidiness: it turns questions about linear combinations of correlated variables " +
    "into quadratic forms, which is exactly the object linear algebra already knows how to analyse " +
    "through eigenvalues, definiteness, and rank.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "prose",
          text:
            "Let X = (X₁, …, X_k)ᵀ be a random vector with mean vector μ = E[X], meaning " +
            "μᵢ = E[Xᵢ] componentwise. The covariance matrix is the matrix of all pairwise " +
            "covariances.",
        },
        {
          kind: "formula",
          latex: "Σ = Cov(X) = E[(X − μ)(X − μ)ᵀ],   Σᵢⱼ = Cov(Xᵢ, Xⱼ)",
          caption: "Covariance matrix of a random vector",
        },
        {
          kind: "prose",
          text:
            "The outer product (X − μ)(X − μ)ᵀ is a k × k random matrix; taking expectations " +
            "entrywise gives Σ. On the diagonal, Σᵢᵢ = Cov(Xᵢ, Xᵢ) = Var(Xᵢ), so the variances are " +
            "recovered as a special case. Off the diagonal sit the covariances, and because " +
            "Cov(Xᵢ, Xⱼ) = Cov(Xⱼ, Xᵢ) the matrix is symmetric by construction.",
        },
        {
          kind: "example",
          title: "A 2 × 2 covariance matrix",
          problem:
            "Var(X₁) = 4, Var(X₂) = 9, Cov(X₁, X₂) = 3. Write Σ, and read off the correlation.",
          steps: [
            "Diagonal entries are the variances: 4 and 9.",
            "Both off-diagonal entries are the covariance, 3.",
            "ρ = Cov/(σ₁σ₂) = 3/(2·3).",
          ],
          answer:
            "Σ = [[4, 3], [3, 9]], and ρ = 0.5. Note that the correlation matrix is what you get by " +
            "standardising: R = D^(−1/2) Σ D^(−1/2) with D = diag(Σ), here [[1, 0.5], [0.5, 1]].",
        },
      ],
    },

    {
      heading: "The property that does the work: positive semi-definiteness",
      blocks: [
        {
          kind: "prose",
          text:
            "Take any fixed vector a ∈ ℝᵏ and form the scalar random variable aᵀX — a weighted sum " +
            "of the components, which is what a portfolio, a linear regression fit, or a principal " +
            "component all are. Its variance is a quadratic form in Σ.",
        },
        {
          kind: "formula",
          latex: "Var(aᵀX) = aᵀ Σ a  ≥ 0   for every a",
          caption: "Every quadratic form in Σ is a variance, hence non-negative",
        },
        {
          kind: "prose",
          text:
            "That inequality is the whole story. Variances cannot be negative, so aᵀΣa ≥ 0 for all " +
            "a — which is precisely the definition of a positive semi-definite matrix. Every " +
            "covariance matrix is symmetric positive semi-definite, and conversely every symmetric " +
            "positive semi-definite matrix is the covariance matrix of some random vector.",
        },
        {
          kind: "list",
          items: [
            "Σ is symmetric, so by the spectral theorem it has real eigenvalues and an orthonormal " +
              "eigenbasis: Σ = QΛQᵀ.",
            "Positive semi-definiteness means every eigenvalue λᵢ ≥ 0.",
            "The eigenvector for the largest λ is the direction of maximum variance — this is " +
              "exactly what PCA extracts.",
            "The eigenvalue λᵢ is the variance of X along the i-th eigenvector direction, so the " +
              "eigenvalues are a variance budget, and Σλᵢ = tr(Σ) = the total variance.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Semi-definite, not definite",
          text:
            "Σ is guaranteed positive semi-definite, and only semi-definite. It is positive definite " +
            "only when no exact " +
            "linear relationship holds among the components. If aᵀΣa = 0 for some a ≠ 0, then " +
            "Var(aᵀX) = 0, so aᵀX is almost surely constant — a genuine linear dependency in the " +
            "data. Assuming Σ is always invertible is one of the most consequential errors in " +
            "multivariate statistics, because it is exactly the assumption that fails when you need " +
            "Σ⁻¹.",
        },
      ],
    },

    {
      heading: "How Σ transforms",
      blocks: [
        {
          kind: "prose",
          text:
            "Almost everything downstream reduces to one identity: how the covariance matrix behaves " +
            "under an affine map Y = AX + b.",
        },
        {
          kind: "formula",
          latex: "E[AX + b] = Aμ + b,    Cov(AX + b) = A Σ Aᵀ",
          caption: "The affine transformation rule — the shift b never affects covariance",
        },
        {
          kind: "table",
          headers: ["Take A to be…", "and you get…"],
          rows: [
            ["a row vector aᵀ", "Var(aᵀX) = aᵀΣa — the quadratic form above"],
            ["the row (1, 1, …, 1)", "Var(ΣXᵢ) = ΣᵢΣⱼ Σᵢⱼ = sum of every entry of Σ"],
            ["Qᵀ, Q an eigenbasis of Σ", "QᵀΣQ = Λ, diagonal — uncorrelated coordinates (PCA)"],
            ["Σ^(−1/2)", "Σ^(−1/2)ΣΣ^(−1/2) = I — multivariate standardisation (whitening)"],
            ["a selection matrix", "the covariance matrix of a sub-vector, as a submatrix of Σ"],
          ],
        },
        {
          kind: "example",
          title: "Variance of a difference",
          problem: "With Σ = [[4, 3], [3, 9]], compute Var(X₁ + X₂) and Var(X₁ − X₂).",
          steps: [
            "For the sum, a = (1, 1)ᵀ: aᵀΣa = 4 + 9 + 2(3).",
            "For the difference, a = (1, −1)ᵀ: aᵀΣa = 4 + 9 − 2(3).",
          ],
          answer:
            "Var(X₁ + X₂) = 19 and Var(X₁ − X₂) = 7. Positive covariance inflates the variance of a " +
            "sum and deflates that of a difference — which is why hedging works, and why paired " +
            "designs reduce noise when the pairs are positively correlated.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Whitening, and why Σ^(−1/2) exists",
          text:
            "Because Σ = QΛQᵀ with λᵢ ≥ 0, you can define Σ^(1/2) = QΛ^(1/2)Qᵀ by taking square " +
            "roots of the eigenvalues, and Σ^(−1/2) = QΛ^(−1/2)Qᵀ when all λᵢ > 0. Then " +
            "Z = Σ^(−1/2)(X − μ) has mean 0 and covariance I: the exact multivariate analogue of " +
            "z = (x − μ)/σ, with the matrix square root standing in for the scalar one. The " +
            "quantity ‖Z‖ is the Mahalanobis distance.",
        },
      ],
    },

    {
      heading: "The sample covariance matrix",
      blocks: [
        {
          kind: "prose",
          text:
            "Given n observations of a k-dimensional vector, stacked as rows of an n × k data " +
            "matrix X, the sample covariance matrix estimates Σ.",
        },
        {
          kind: "formula",
          latex: "S = (1/(n − 1)) Σᵢ (xᵢ − x̄)(xᵢ − x̄)ᵀ = (1/(n − 1)) X̃ᵀX̃",
          caption: "X̃ is the column-centred data matrix; the n − 1 makes S unbiased for Σ",
        },
        {
          kind: "prose",
          text:
            "Writing it in the Gram form X̃ᵀX̃ makes the rank behaviour immediate. " +
            "rank(X̃ᵀX̃) = rank(X̃) ≤ min(n − 1, k), where the n − 1 rather than n comes from " +
            "centring, which costs one degree of freedom by forcing the rows to sum to zero.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "When k > n, S is always singular",
          text:
            "With more features than observations, rank(S) ≤ n − 1 < k, so S has at least " +
            "k − n + 1 zero eigenvalues and cannot be inverted — no matter how clean the data are. " +
            "This is not an estimation accident; it is a rank bound. Every method that needs S⁻¹ " +
            "(linear discriminant analysis, Mahalanobis distance, GLS, Gaussian graphical models) " +
            "breaks here, and the standard repairs are shrinkage toward a diagonal target " +
            "(Ledoit–Wolf), a ridge-style S + λI, or a structural assumption such as sparsity in " +
            "S⁻¹.",
        },
        {
          kind: "prose",
          text:
            "Even when k < n, a sample covariance matrix estimated from few observations is poorly " +
            "conditioned in a specific, predictable way: its largest eigenvalues are biased upward " +
            "and its smallest downward relative to the truth. Since Σ⁻¹ divides by those smallest " +
            "eigenvalues, the inverse is far noisier than S itself — which is why regularising Σ is " +
            "routine practice rather than a last resort.",
        },
      ],
    },

    {
      heading: "Reading a covariance matrix",
      blocks: [
        {
          kind: "table",
          headers: ["What you see in Σ", "What it means"],
          rows: [
            ["Diagonal", "Variances of the individual components"],
            ["A large off-diagonal entry", "Strong linear co-movement — but scale-dependent, so compare correlations instead"],
            ["Σ diagonal", "All components uncorrelated (not necessarily independent)"],
            ["Σ = σ²I", "Isotropic: equal variance in every direction, no preferred axis"],
            ["A near-zero eigenvalue", "A near-exact linear relationship among components; the matrix is ill-conditioned"],
            ["Condition number λ_max/λ_min large", "Σ⁻¹ will amplify noise; regularisation is warranted"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Covariance is not scale-free",
          text:
            "Changing units from metres to centimetres multiplies a covariance by 100. Comparing " +
            "the magnitudes of off-diagonal entries across differently scaled variables is " +
            "meaningless; standardise to the correlation matrix first. This is the same reason PCA " +
            "on raw covariances is dominated by whichever variable happens to have the largest " +
            "units, and why PCA is usually run on the correlation matrix instead.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Zero off-diagonal entries do not mean independence",
          text:
            "Σ records linear association only. The standard counterexample carries over verbatim: " +
            "with X symmetric about 0, Cov(X, X²) = 0 even though X² is a deterministic function of " +
            "X. A diagonal Σ rules out linear dependence and nothing more — the one family where it " +
            "does imply independence is the multivariate Normal.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§4.5–4.6, Multivariate Distributions" },
    { source: "Strang, Linear Algebra and Its Applications", locator: "Ch. 6, Positive Definite Matrices" },
    { source: "Deisenroth, Faisal & Ong, Mathematics for Machine Learning", locator: "§6.4, Summary Statistics and Independence" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-01-multivariate-probability.md" },
  ],
};
