import type { WikiArticle } from "./types";

export const quadraticFormsRandomVectorsWiki: WikiArticle = {
  conceptId: "quadratic-forms-random-vectors",
  summary:
    "A quadratic form in a random vector is the scalar XᵀAX. Almost every quantity in statistics " +
    "that is called a 'sum of squares' — the sample variance, the residual sum of squares, the " +
    "Mahalanobis distance, every numerator and denominator in an F-statistic — is one of these with " +
    "a particular A. Two results carry the whole subject: its expectation is tr(AΣ) + μᵀAμ for any " +
    "distribution at all, and it is exactly chi-square when A is idempotent and X is normal.",

  sections: [
    {
      heading: "One object, wearing many names",
      blocks: [
        {
          kind: "formula",
          latex: "Q = XᵀAX = Σ_i Σ_j a_{ij} X_i X_j",
          caption: "X a random vector in ℝᵏ with mean μ and covariance Σ; A a fixed k × k matrix",
        },
        {
          kind: "prose",
          text:
            "A can always be taken symmetric. Since Q is a scalar, Q = Qᵀ = XᵀAᵀX, so " +
            "Q = Xᵀ((A + Aᵀ)/2)X — replacing A by its symmetric part changes nothing about the " +
            "random variable. Every theorem below assumes that replacement has been made, and none " +
            "of them is true for a general non-symmetric A.",
        },
        {
          kind: "table",
          headers: ["Statistic", "A", "What A does"],
          rows: [
            ["‖X‖² = ΣX_i²", "I", "Nothing — the plain sum of squares"],
            ["Σ(X_i − X̄)²", "C = I − (1/n)11ᵀ", "Subtracts the mean before squaring (the centring matrix)"],
            ["Residual sum of squares eᵀe", "I − H, with H = X(XᵀX)⁻¹Xᵀ", "Removes the part of y the model explains"],
            ["Mahalanobis distance", "Σ⁻¹", "Rescales each direction by its own standard deviation"],
            ["Var(aᵀX) as a formula in a", "Σ (with a in place of X)", "The same algebra read as a function of the direction"],
            ["Wald statistic (Rβ̂ − r)ᵀV⁻¹(Rβ̂ − r)", "V⁻¹", "Weights a vector of estimated errors by its precision"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this deserves its own lesson",
          text:
            "Each row above is normally taught in isolation, with its own derivation of its own " +
            "distribution. They are one theorem. Once you know when XᵀAX is chi-square and when two " +
            "such forms are independent, the sampling distribution of the sample variance, the " +
            "residual sum of squares, ANOVA's F-ratio and the t-statistic in a regression table all " +
            "follow by choosing A — which is the reason this concept sits between the multivariate " +
            "normal and the distribution of β̂ rather than off to one side.",
        },
      ],
    },

    {
      heading: "The expectation, with no distributional assumption at all",
      blocks: [
        {
          kind: "formula",
          latex: "E[XᵀAX] = tr(AΣ) + μᵀAμ",
          caption: "True for every X with mean μ and covariance Σ — normality is nowhere in the proof",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "XᵀAX is a 1 × 1 matrix, so it equals its own trace: XᵀAX = tr(XᵀAX).",
            "The trace is cyclic: tr(XᵀAX) = tr(AXXᵀ).",
            "The trace is linear, so expectation passes inside: E[tr(AXXᵀ)] = tr(A E[XXᵀ]).",
            "E[XXᵀ] = Σ + μμᵀ, by the same rearrangement as Var(X) = E[X²] − (E[X])² in one dimension.",
            "So E[XᵀAX] = tr(A(Σ + μμᵀ)) = tr(AΣ) + tr(Aμμᵀ) = tr(AΣ) + μᵀAμ, the last step being " +
              "the cyclic property once more on a scalar.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The tr(AΣ) term is the one that gets dropped",
          text:
            "The single most common error here is to compute μᵀAμ and stop — plugging the mean into " +
            "the form instead of taking its expectation. That is exactly the error of writing " +
            "E[X²] = (E[X])², and it is wrong by tr(AΣ), which is the whole contribution of the " +
            "randomness. It is also why an uncorrected sum of squares is a biased estimator of " +
            "anything: the bias is that missing trace term.",
        },
        {
          kind: "example",
          title: "Both terms, on a small covariance matrix",
          problem:
            "X has mean μ = (1, 2)ᵀ and covariance Σ = [[4, 2], [2, 3]]. Compute E[‖X‖²] and " +
            "E[(X_1 − X_2)²].",
          steps: [
            "For ‖X‖², A = I: tr(IΣ) = 4 + 3 = 7, and μᵀIμ = 1 + 4 = 5.",
            "So E[‖X‖²] = 7 + 5 = 12.",
            "For (X_1 − X_2)², A = [[1, −1], [−1, 1]]: AΣ = [[4 − 2, 2 − 3], [−4 + 2, −2 + 3]], whose " +
              "trace is 2 + 1 = 3.",
            "μᵀAμ = (1 − 2)² = 1.",
          ],
          answer:
            "E[‖X‖²] = 12 and E[(X_1 − X_2)²] = 3 + 1 = 4. The second decomposes exactly as " +
            "Var(X_1 − X_2) + (E[X_1 − X_2])² = 3 + 1, which is the general identity tr(AΣ) + μᵀAμ " +
            "read in the one-dimensional case: the trace term is the variance, the μ term is the " +
            "squared mean.",
        },
        {
          kind: "prose",
          text:
            "The variance needs more than the first two moments and is where normality first enters. " +
            "For X ~ N_k(μ, Σ), Var(XᵀAX) = 2 tr(AΣAΣ) + 4 μᵀAΣAμ. Setting A = I, μ = 0 and " +
            "Σ = σ²I gives 2kσ⁴, matching the variance 2k of a χ²_k scaled by σ⁴ — the first sign " +
            "that chi-square is what these forms turn into.",
        },
      ],
    },

    {
      heading: "When is a quadratic form chi-square?",
      blocks: [
        {
          kind: "prose",
          text:
            "The answer is a condition on A alone, and it is a purely linear-algebraic one: " +
            "idempotence. A matrix with A² = A is a projection, and a symmetric one is an orthogonal " +
            "projection onto its own column space.",
        },
        {
          kind: "formula",
          latex:
            "X ~ N_k(0, I),  A symmetric:   XᵀAX ~ χ²_r   ⟺   A² = A,  r = rank(A) = tr(A)",
          caption: "The central case. For X ~ N_k(μ, Σ) the condition becomes AΣ idempotent",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "A is symmetric, so the spectral theorem gives A = QΛQᵀ with Q orthogonal.",
            "Idempotence forces λ² = λ for every eigenvalue, so each λ is 0 or 1, and exactly " +
              "r = rank(A) of them are 1. Hence rank(A) = tr(A) for an idempotent matrix — the trace " +
              "counts the ones.",
            "Set Z = QᵀX. Since Q is orthogonal and X ~ N(0, I), Z ~ N(0, QᵀIQ) = N(0, I) as well: a " +
              "rotation does not disturb a spherical Gaussian.",
            "Then XᵀAX = ZᵀΛZ = Σ λ_i Z_i² = Z_1² + ⋯ + Z_r², a sum of r squared independent " +
              "standard Normals, which is the definition of χ²_r.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Degrees of freedom are a dimension, not a bookkeeping rule",
          text:
            "The r in χ²_r is rank(A) — the dimension of the subspace A projects onto. Every " +
            "'degrees of freedom' rule you have memorised is this number: n − 1 for the sample " +
            "variance because centring projects onto the (n − 1)-dimensional space orthogonal to " +
            "the vector of ones; n − p for a regression's residuals because fitting p coefficients " +
            "uses up a p-dimensional subspace. Nothing is being subtracted for having 'estimated a " +
            "parameter'; a subspace is being removed, and its dimension is the count.",
        },
        {
          kind: "example",
          title: "The centring matrix, and where n − 1 comes from",
          problem:
            "X_1, …, X_n are iid N(μ, σ²). Show that (n − 1)S²/σ² ~ χ²_{n−1}, where " +
            "S² = Σ(X_i − X̄)²/(n − 1).",
          steps: [
            "Write the sum of squares as a quadratic form: Σ(X_i − X̄)² = XᵀCX with " +
              "C = I − (1/n)11ᵀ, the centring matrix.",
            "C is symmetric, and C² = I − (2/n)11ᵀ + (1/n²)11ᵀ11ᵀ = I − (2/n)11ᵀ + (n/n²)11ᵀ = C, " +
              "since 1ᵀ1 = n. So C is an orthogonal projection.",
            "tr(C) = n − n·(1/n) = n − 1, so rank(C) = n − 1.",
            "X ~ N(μ1, σ²I), so X/σ has covariance I but mean μ1/σ, not 0. That does not matter " +
              "here: C1 = 1 − (1/n)11ᵀ1 = 1 − 1 = 0, so the mean is annihilated by the projection.",
          ],
          answer:
            "XᵀCX/σ² ~ χ²_{n−1}, i.e. (n − 1)S²/σ² ~ χ²_{n−1}. The step worth keeping is C1 = 0: " +
            "the centring projection kills the direction the mean lives in, which is exactly why the " +
            "distribution of S² does not depend on μ, and why S² can be used to estimate σ² without " +
            "knowing the mean at all.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A non-zero mean gives a noncentral chi-square, not a wrong answer",
          text:
            "If X ~ N_k(μ, I) and A is idempotent of rank r, XᵀAX has a noncentral chi-square " +
            "distribution with r degrees of freedom and noncentrality λ = μᵀAμ, whose mean is " +
            "r + λ — consistent with tr(A) + μᵀAμ from the previous section. The central case is " +
            "λ = 0, which needs Aμ = 0, not μ = 0. That distinction is what makes the power of an " +
            "F-test computable: under the alternative the numerator is noncentral, and λ measures " +
            "how far from the null the truth sits. (Conventions differ: some texts define the " +
            "noncentrality as half this quantity.)",
        },
      ],
    },

    {
      heading: "When are two forms independent?",
      blocks: [
        {
          kind: "prose",
          text:
            "An F-statistic is a ratio of two sums of squares, and the ratio only has an F " +
            "distribution if the two are independent. That is again a condition on the matrices " +
            "rather than on the data.",
        },
        {
          kind: "table",
          headers: ["Pair", "Independent when (X ~ N(μ, σ²I))", "General Σ"],
          rows: [
            ["XᵀAX and XᵀBX", "AB = 0", "AΣB = 0"],
            ["BX (a linear form) and XᵀAX", "BA = 0", "BΣA = 0"],
          ],
          caption: "Craig's theorem, and its linear-form companion. Both require joint normality",
        },
        {
          kind: "prose",
          text:
            "The geometric reading is the useful one. AB = 0 with A and B orthogonal projections " +
            "says their column spaces are orthogonal subspaces. A spherical Gaussian has independent " +
            "components in any orthonormal basis, so its projections onto orthogonal subspaces are " +
            "independent — they are built from disjoint sets of coordinates once you rotate to a " +
            "basis adapted to both subspaces.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Uncorrelated is not enough outside the normal family",
          text:
            "Every one of these criteria assumes X is multivariate normal. For a general " +
            "distribution, AΣB = 0 gives Cov(XᵀAX, XᵀBX) = 0 and nothing more, and zero covariance " +
            "between two quadratic forms does not make an F-ratio have an F distribution. This is " +
            "the same trap as concluding independence from ρ = 0, one level up.",
        },
      ],
    },

    {
      heading: "Assumptions, and what breaks without them",
      blocks: [
        {
          kind: "list",
          items: [
            "A must be symmetric before any idempotence check. Symmetrise first, or the eigenvalue " +
              "argument does not apply and rank(A) = tr(A) can fail.",
            "The chi-square conclusion needs the covariance actually used in the condition. With " +
              "Σ ≠ σ²I, checking A² = A is checking the wrong matrix; the criterion is (AΣ)² = AΣ.",
            "Heteroskedasticity and correlated errors break exactly this: they make Σ non-spherical, " +
              "so residual sums of squares are weighted mixtures of chi-squares rather than a single " +
              "chi-square, and the nominal degrees of freedom are wrong. Sandwich standard errors " +
              "and the Satterthwaite approximation are the two standard repairs.",
            "Without normality the expectation formula survives untouched, the variance formula does " +
              "not (it picks up fourth-cumulant terms), and the chi-square conclusion is only " +
              "asymptotic.",
            "A idempotent of rank r has exactly r unit eigenvalues, so tr(A) is an integer for any " +
              "genuine projection. A non-integer trace is a quick sign the matrix is not idempotent " +
              "and the form is not chi-square.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The bridge to the next two lessons",
          text:
            "Cochran's theorem is the statement that when several quadratic forms add up to ‖X‖² " +
            "and their ranks add up to n, all of them are independent chi-squares at once — the " +
            "several-subspace version of everything above. The distribution of β̂ is what you get " +
            "by pointing that machinery at A = H and A = I − H.",
        },
      ],
    },
  ],

  references: [
    { source: "Banerjee & Roy, Linear Algebra and Matrix Analysis for Statistics", locator: "Ch. 11–12, Quadratic Forms and Their Distributions" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§5.3, Sampling from the Normal Distribution" },
    { source: "Strang, Linear Algebra and Its Applications", locator: "Ch. 6, Positive Definite Matrices and Projections" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-02-quadratic-forms-and-regression.md" },
  ],
};
