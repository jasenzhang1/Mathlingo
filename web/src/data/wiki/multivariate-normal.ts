import type { WikiArticle } from "./types";

export const multivariateNormalWiki: WikiArticle = {
  conceptId: "multivariate-normal",
  summary:
    "The multivariate normal generalises the bell curve to a random vector in ℝᵏ, parameterised by " +
    "a mean vector μ and a covariance matrix Σ. Its importance is not that data are often shaped " +
    "this way — they often are not — but that the family is closed under exactly the operations " +
    "statistics performs: marginalising, conditioning, and affine transformation all return " +
    "multivariate normals, with parameters given by explicit matrix formulas.",

  sections: [
    {
      heading: "The density",
      blocks: [
        {
          kind: "formula",
          latex: "f(x) = (2π)^(−k/2) |Σ|^(−1/2) exp( −½ (x − μ)ᵀ Σ⁻¹ (x − μ) )",
          caption: "X ~ N_k(μ, Σ), for x ∈ ℝᵏ and Σ symmetric positive definite",
        },
        {
          kind: "prose",
          text:
            "Every piece has a univariate ancestor. The (x − μ)ᵀΣ⁻¹(x − μ) is the squared " +
            "Mahalanobis distance, replacing (x − μ)²/σ². The |Σ|^(−1/2) replaces 1/σ, since the " +
            "determinant is the multivariate notion of a scale — a volume rather than a length. " +
            "And (2π)^(−k/2) is one factor of 1/√(2π) for each of the k dimensions.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "μ ∈ ℝᵏ",
              description: "The mean vector, E[X], componentwise. It only shifts the distribution.",
            },
            {
              term: "Σ ∈ ℝᵏˣᵏ",
              description:
                "The covariance matrix: symmetric, and required to be strictly positive definite for the " +
                "density to exist, since Σ⁻¹ and |Σ| > 0 both appear in it.",
            },
            {
              term: "|Σ|",
              description:
                "The determinant, often called the generalised variance. It is the squared volume " +
                "scaling of the map that produces X from a standard Normal vector.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Σ positive definite, not merely diagonal",
          text:
            "A common misreading is that Σ must be diagonal — that the multivariate Normal is just " +
            "k independent Normals stacked. It is not: any positive definite Σ is allowed, and the " +
            "correlated case is the interesting one. Diagonal Σ is the special case in which the " +
            "components happen to be independent.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The definition without a density",
          text:
            "X is multivariate normal if and only if aᵀX is univariate Normal for every fixed " +
            "vector a. This definition needs no Σ⁻¹, so it also covers the degenerate case where Σ " +
            "is singular — the distribution then lives on a lower-dimensional affine subspace and " +
            "has no density in ℝᵏ, but is still perfectly well defined. Degenerate MVNs are not " +
            "exotic: they turn up whenever variables satisfy an exact constraint, such as " +
            "multinomial counts that must sum to n.",
        },
      ],
    },

    {
      heading: "Geometry: ellipsoids aligned with Σ's eigenvectors",
      blocks: [
        {
          kind: "prose",
          text:
            "Level sets of the density are level sets of the quadratic form " +
            "(x − μ)ᵀΣ⁻¹(x − μ) = c, which are ellipsoids centred at μ. The spectral theorem says " +
            "exactly where they point.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Σ is symmetric, so Σ = QΛQᵀ with Q orthogonal and Λ = diag(λ₁, …, λ_k), λᵢ > 0.",
            "Then Σ⁻¹ = QΛ⁻¹Qᵀ, so writing u = Qᵀ(x − μ) turns the quadratic form into Σᵢ uᵢ²/λᵢ.",
            "In those coordinates the form is a plain weighted sum of squares — the cross terms are " +
              "gone, and the level set is the standard ellipsoid Σ uᵢ²/λᵢ = c.",
            "The coordinates uᵢ are measured along Σ's eigenvectors, so the ellipsoid's principal " +
              "axes are those eigenvectors, with half-lengths proportional to √λᵢ.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is PCA, arrived at from the other side",
          text:
            "The eigenvector for the largest λ is the direction of greatest variance, and √λ is the " +
            "standard deviation along it. PCA finds those directions from data; here they fall out " +
            "of the density's geometry. Both are the same eigendecomposition of the same matrix, " +
            "which is why PCA and fitting a Gaussian to data are so closely intertwined.",
        },
        {
          kind: "example",
          title: "Reading a 2 × 2 case",
          problem: "X ~ N₂(0, Σ) with Σ = [[4, 2], [2, 3]]. Find |Σ|, Var(X₁ − X₂), and f(0).",
          steps: [
            "|Σ| = 4·3 − 2·2 = 8.",
            "For a = (1, −1)ᵀ: Var(aᵀX) = aᵀΣa = 4 + 3 − 2(2) = 3.",
            "f(μ) = (2π)^(−1)·8^(−1/2) = 1/(2π·2.828).",
          ],
          answer:
            "|Σ| = 8, Var(X₁ − X₂) = 3, f(0) ≈ 0.0563. The peak height falls as |Σ| grows: more " +
            "spread out, so lower everywhere.",
        },
      ],
    },

    {
      heading: "The closure properties",
      blocks: [
        {
          kind: "prose",
          text:
            "This section is why the multivariate Normal is everywhere. Partition X into two " +
            "blocks, X = (X₁, X₂), with μ and Σ partitioned to match: " +
            "Σ = [[Σ₁₁, Σ₁₂], [Σ₂₁, Σ₂₂]].",
        },
        {
          kind: "table",
          headers: ["Operation", "Result"],
          rows: [
            ["Affine map Y = AX + b", "Y ~ N(Aμ + b, AΣAᵀ)"],
            ["Marginal of a sub-vector", "X₁ ~ N(μ₁, Σ₁₁) — just read off the corresponding block"],
            ["Conditional", "X₁ | X₂ = x₂ ~ N(μ₁ + Σ₁₂Σ₂₂⁻¹(x₂ − μ₂), Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁)"],
            ["Sum of independent MVNs", "N(μ_a + μ_b, Σ_a + Σ_b)"],
            ["Uncorrelated blocks (Σ₁₂ = 0)", "X₁ and X₂ are independent"],
          ],
        },
        {
          kind: "prose",
          text:
            "Three things about the conditional formula are worth dwelling on. The conditional mean " +
            "is affine in x₂, with coefficient matrix Σ₁₂Σ₂₂⁻¹ — which is the population " +
            "multiple-regression coefficient matrix, so regression is exact rather than " +
            "approximate under joint normality. The conditional covariance " +
            "Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁ is the Schur complement of Σ₂₂ in Σ. And it does not depend on the " +
            "observed x₂ at all: observing a value changes where you expect X₁ to be, never how " +
            "uncertain you are about it.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Closure is the whole reason this family dominates",
          text:
            "A generic joint distribution gives you conditionals and marginals that are messy " +
            "integrals in some other family. Here they stay in the family and their parameters are " +
            "matrix expressions in the ones you started with. Kalman filters, Gaussian processes, " +
            "linear discriminant analysis, MANOVA, Gaussian graphical models and the Laplace " +
            "approximation are all built by chaining the two rows of that table.",
        },
      ],
    },

    {
      heading: "Standardisation and simulation",
      blocks: [
        {
          kind: "prose",
          text:
            "Because Σ is symmetric positive definite it has a symmetric square root " +
            "Σ^(1/2) = QΛ^(1/2)Qᵀ, and an inverse square root Σ^(−1/2) = QΛ^(−1/2)Qᵀ. These give " +
            "the multivariate versions of standardising and un-standardising.",
        },
        {
          kind: "formula",
          latex: "Z = Σ^(−1/2)(X − μ) ~ N_k(0, I),   and back again,   X = μ + Σ^(1/2) Z",
          caption: "Whitening, and its inverse — the matrix analogue of z = (x − μ)/σ",
        },
        {
          kind: "example",
          title: "Verifying that whitening works",
          problem: "Show Cov(Z) = I for Z = Σ^(−1/2)(X − μ).",
          steps: [
            "Z is an affine map of X with A = Σ^(−1/2), so Cov(Z) = AΣAᵀ.",
            "Σ^(−1/2) is symmetric, so Aᵀ = A and Cov(Z) = Σ^(−1/2) Σ Σ^(−1/2).",
            "Write Σ = Σ^(1/2)Σ^(1/2) and cancel: Σ^(−1/2)Σ^(1/2)·Σ^(1/2)Σ^(−1/2) = I·I.",
            "E[Z] = Σ^(−1/2)(E[X] − μ) = 0.",
          ],
          answer:
            "Z ~ N_k(0, I): mean zero, identity covariance, hence k independent standard Normals. " +
            "Exactly what dividing by σ does in one dimension.",
        },
        {
          kind: "prose",
          text:
            "In practice the Cholesky factor L, with Σ = LLᵀ, is used instead of the symmetric " +
            "square root: it is cheaper to compute and X = μ + LZ has the same distribution, since " +
            "Cov(LZ) = LILᵀ = Σ. Any matrix A with AAᵀ = Σ will do — the square root is not unique, " +
            "and the distribution does not care which one you pick.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where the chi-square comes from",
          text:
            "The squared Mahalanobis distance (X − μ)ᵀΣ⁻¹(X − μ) equals ‖Z‖² = ΣZᵢ², a sum of k " +
            "squared independent standard Normals — so it is exactly χ²_k. That single fact gives " +
            "you the confidence ellipsoid (the region where the quadratic form is below the χ²_k " +
            "critical value), the standard multivariate outlier test, and the shape of Hotelling's " +
            "T².",
        },
      ],
    },

    {
      heading: "Assumptions, and when they bite",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Normal marginals do not make a Normal vector",
          text:
            "Every marginal of an MVN is Normal, but the converse fails. You can build a joint " +
            "distribution with Normal marginals and non-elliptical, even multimodal, contours by " +
            "coupling them with a non-Gaussian copula. Checking each variable's histogram is " +
            "therefore not a test of joint normality; the useful diagnostics look at the " +
            "Mahalanobis distances against a χ²_k reference instead.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The tails are thin, and that is a modelling choice",
          text:
            "MVN density decays like e^(−r²/2) in the Mahalanobis radius, so extreme joint events " +
            "are extraordinarily rare under the model. Financial returns are the standard " +
            "cautionary case: their joint tails are heavier and, worse, more dependent in a crash " +
            "than any Σ can express. A multivariate t distribution, which is an MVN with a random " +
            "scale mixed in, is the usual first repair.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Everything here needs Σ⁻¹ to exist",
          text:
            "The density, the conditional formulas, and the Mahalanobis distance all invert Σ (or " +
            "Σ₂₂). With p > n features, or with an exact linear relationship among components, the " +
            "estimated Σ is singular and these expressions are undefined rather than merely " +
            "imprecise. Shrinkage toward a diagonal target, or a sparsity assumption on Σ⁻¹ (the " +
            "graphical lasso), is what makes them usable again.",
        },
        {
          kind: "list",
          items: [
            "Maximum likelihood estimates are the sample mean and the sample covariance with " +
              "divisor n, so the MLE of Σ is biased low; the unbiased estimator uses n − 1.",
            "The MVN maximises entropy among all distributions on ℝᵏ with a given mean and " +
              "covariance — the formal sense in which it assumes nothing beyond the first two " +
              "moments.",
            "The multivariate central limit theorem says a standardised sample mean vector converges " +
              "to N_k(0, Σ), which is why so many asymptotic procedures land in this family whatever " +
              "the data looked like.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§4.5–4.6, Multivariate Distributions" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§2.3, The Gaussian Distribution" },
    { source: "Deisenroth, Faisal & Ong, Mathematics for Machine Learning", locator: "§6.5, Gaussian Distribution" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-01-multivariate-probability.md" },
  ],
};
