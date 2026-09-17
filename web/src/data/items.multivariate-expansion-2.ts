import type { Item, SourceRef } from "../lib/assessment/types";

/**
 * Expansion pack bringing six multivariate-probability concepts up to 20 live
 * items each: multivariate-mgf (+5), quadratic-forms-random-vectors (+5),
 * conditional-multivariate-normal (+12), cochrans-theorem (+5),
 * distribution-of-beta-hat (+4), kl-divergence (+7) — 38 items total.
 *
 * Every item below is a genuinely new angle on its concept relative to the
 * existing pools in `items.ts` and `items.multivariate-forms.ts`: new
 * matrices/parameters, new derivations (cumulant generating functions,
 * Var(X'AX), the partitioned-inverse route to the conditional normal, the
 * rank-additivity proof that idempotence is a consequence rather than a
 * hypothesis of Cochran's theorem), and new named distribution pairs for KL
 * divergence (exponential, Poisson, unequal-variance normals).
 *
 * Every numeric answer was computed twice by hand from the stated formula —
 * once symbolically, once by re-substituting the drawn numbers from scratch —
 * before being written here; the arithmetic is recorded inline in comments
 * next to each numeric item so a reviewer can re-check it without redoing the
 * algebra blind.
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-multivariate-expansion",
  tier: "generated",
  title: "Mathlingo authored item (multivariate-probability 20-per-concept expansion)",
};

export const multivariateExpansion2Items: Item[] = [
  // =========================================================================
  // multivariate-mgf (+5)
  // =========================================================================
  {
    id: "multivariate-mgf--recall-derivatives-give-moments",
    conceptId: "multivariate-mgf",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Besides reading μ and Σ off the exponent of a multivariate normal MGF, moments can be pulled " +
      "out of *any* MGF by differentiating. State the mixed-partial-derivative identity that recovers " +
      "E[XᵢXⱼ] from M_X(t), and the single-partial identity that recovers E[Xᵢ].",
    rubric: {
      elements: [
        {
          id: "mixed-partial",
          description:
            "Gives ∂²M_X/∂tᵢ∂tⱼ evaluated at t = 0 equals E[XᵢXⱼ], since differentiating " +
            "E[exp(tᵀX)] under the expectation brings down a factor of XᵢXⱼ before t is set to 0.",
          weight: 3,
          required: true,
        },
        {
          id: "single-partial",
          description: "Gives ∂M_X/∂tᵢ at t = 0 equals E[Xᵢ], the i = j degenerate case of the same idea.",
          weight: 2,
        },
        {
          id: "why-it-works-generally",
          description:
            "Notes this works for any random vector with an MGF defined near 0, not only the normal " +
            "— it is what 'moment generating' means, independent of the closed form the normal happens " +
            "to have.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.55,
    discrimination: 1.1,
    expectedSeconds: 75,
    prereqClosure: ["multivariate-mgf", "mgf", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-mgf--apply-three-dimensional-variance",
    conceptId: "multivariate-mgf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ N₃(μ, Σ) with Σ = [[2,1,0],[1,3,1],[0,1,2]]. Using M_Y(s) = M_X(sa) with a = (1,1,1)ᵀ, " +
      "compute Var(X₁ + X₂ + X₃). " +
      "[check: aᵀΣa is the sum of all nine entries of Σ, since every off-diagonal pair is counted " +
      "once from each side — 2+1+0 + 1+3+1 + 0+1+2 = 11]",
    answerKey: 11,
    tolerance: 0.01,
    difficulty: 1.25,
    discrimination: 1.2,
    expectedSeconds: 100,
    prereqClosure: ["multivariate-mgf", "covariance-matrix", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-mgf--apply-sum-of-independent-vectors",
    conceptId: "multivariate-mgf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ N₂(μₓ, Σₓ) with Σₓ = [[2,0],[0,2]] and Y ~ N₂(μ_y, Σ_y) with Σ_y = [[1,0.5],[0.5,1]] are " +
      "independent. Since independent MGFs multiply, M_{X+Y}(t) = M_X(t)M_Y(t), so Z = X + Y is " +
      "N₂(μₓ + μ_y, Σₓ + Σ_y). Compute Cov(Z₁, Z₂). " +
      "[check: the (1,2) entry of Σₓ + Σ_y is 0 + 0.5 = 0.5]",
    answerKey: 0.5,
    tolerance: 0.01,
    difficulty: 1.35,
    discrimination: 1.15,
    expectedSeconds: 120,
    prereqClosure: ["multivariate-mgf", "covariance-matrix", "mutual-independence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-mgf--apply-read-independence-from-factored-mgf",
    conceptId: "multivariate-mgf",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A normal vector (X₁, X₂, X₃) has joint MGF " +
      "M(t₁,t₂,t₃) = exp(t₁ + 2t₂ + 2t₁² + 2t₁t₂ + 1.5t₂² + t₃ + 3t₃²). Which statement correctly " +
      "follows from this MGF?",
    choices: [
      {
        id: "a",
        text:
          "X₃ is independent of (X₁, X₂), because the exponent has no t₁t₃ or t₂t₃ cross term, so M " +
          "factors as a function of (t₁,t₂) times a function of t₃",
        correct: true,
      },
      {
        id: "b",
        text: "X₁ and X₂ are independent of each other, since neither is correlated with X₃",
        correct: false,
        misconception: {
          id: "mgf-independence-from-third-variable-transfers",
          description:
            "Confuses X₃'s independence from the (X₁,X₂) block with independence between X₁ and X₂ " +
            "themselves. The exponent's 2t₁t₂ term is exactly Σ₁₂ ≠ 0, so X₁ and X₂ are correlated " +
            "and hence dependent.",
          blameConceptId: "multivariate-mgf",
        },
      },
      {
        id: "c",
        text:
          "All three variables are mutually independent, since the exponent is a sum of terms each " +
          "involving only one or two of the variables",
        correct: false,
        misconception: {
          id: "mgf-cross-term-means-nothing",
          description:
            "Misreads a nonzero cross term as compatible with independence. A cross term t₁t₂ in the " +
            "exponent is precisely the signature of Σ₁₂ ≠ 0 — it is evidence against independence, " +
            "not neutral bookkeeping.",
          blameConceptId: "covariance-matrix",
        },
      },
      {
        id: "d",
        text: "No independence can be concluded at all, since the exponent contains cross terms",
        correct: false,
        misconception: {
          id: "mgf-any-cross-term-blocks-all-independence",
          description:
            "Overgeneralizes: the presence of some cross term does not preclude other independence " +
            "relations holding simultaneously. X₃ is still independent of (X₁,X₂) regardless of the " +
            "t₁t₂ term that couples X₁ and X₂.",
          blameConceptId: "multivariate-mgf",
        },
      },
    ],
    difficulty: 1.1,
    discrimination: 1.25,
    expectedSeconds: 90,
    prereqClosure: ["multivariate-mgf", "mutual-independence", "covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-mgf--explain-cumulant-generating-function",
    conceptId: "multivariate-mgf",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Define K_X(t) = log M_X(t), the cumulant generating function. Show that for X ~ N_k(μ, Σ), " +
      "K_X(t) is exactly the quadratic tᵀμ + ½tᵀΣt itself — not merely its exponential — and use this " +
      "to explain why every third- and higher-order cumulant of a multivariate normal vector is zero, " +
      "even though raw moments like E[X₁X₂X₃] need not be (whenever μ ≠ 0).",
    rubric: {
      elements: [
        {
          id: "log-collapses",
          description:
            "Observes log(exp(tᵀμ + ½tᵀΣt)) = tᵀμ + ½tᵀΣt directly, so K_X is a polynomial of degree " +
            "exactly 2 in t, with no higher-order terms to differentiate.",
          weight: 3,
          required: true,
        },
        {
          id: "cumulants-are-derivatives-of-K",
          description:
            "States that the order-n cumulant is the corresponding mixed partial derivative of K_X at " +
            "t = 0, so any partial derivative of order 3 or higher of a degree-2 polynomial is " +
            "identically zero — the vanishing is a fact about K_X's degree, not a special cancellation.",
          weight: 3,
        },
        {
          id: "raw-moments-still-nonzero",
          description:
            "Contrasts this with raw moments, which come from derivatives of M_X = exp(K_X) rather " +
            "than of K_X itself; the chain rule reintroduces lower-order cumulants (here, the mean) " +
            "into every higher raw moment, so E[X₁X₂X₃] is generally nonzero once μ ≠ 0 even though the " +
            "third cumulant vanishes.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.3,
    expectedSeconds: 270,
    prereqClosure: ["multivariate-mgf", "multivariate-normal", "mgf-properties"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // quadratic-forms-random-vectors (+5)
  // =========================================================================
  {
    id: "quadratic-forms--apply-variance-of-squared-norm",
    conceptId: "quadratic-forms-random-vectors",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ N₂(μ, Σ) with μ = (1, 2)ᵀ and Σ = [[4,2],[2,3]]. For normal X and symmetric A, " +
      "Var(XᵀAX) = 2tr(AΣAΣ) + 4μᵀAΣAμ. Taking A = I (so XᵀAX = ‖X‖²), compute Var(‖X‖²). " +
      "[check: Σ² = [[20,14],[14,13]] so tr(Σ²) = 33; Σμ = (8,8)ᵀ so μᵀΣμ = 24; " +
      "Var = 2(33) + 4(24) = 66 + 96 = 162]",
    answerKey: 162,
    tolerance: 0.5,
    difficulty: 1.65,
    discrimination: 1.2,
    expectedSeconds: 180,
    prereqClosure: ["quadratic-forms-random-vectors", "trace", "covariance-matrix", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "quadratic-forms--apply-idempotent-difference-form",
    conceptId: "quadratic-forms-random-vectors",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "X ~ N₂(0, I) and A = ½[[1,−1],[−1,1]]. Verify A is idempotent, give its rank, and name the " +
      "exact distribution of XᵀAX.",
    rubric: {
      elements: [
        {
          id: "idempotence-check",
          description:
            "Computes A² = ¼[[1,−1],[−1,1]]² = ¼[[2,−2],[−2,2]] = ½[[1,−1],[−1,1]] = A, confirming " +
            "idempotence.",
          weight: 3,
          required: true,
        },
        {
          id: "rank",
          description: "Gives tr(A) = ½ + ½ = 1, so rank(A) = 1 for this idempotent matrix.",
          weight: 2,
        },
        {
          id: "distribution",
          description:
            "Identifies XᵀAX = ½(X₁ − X₂)² as ((X₁−X₂)/√2)², a squared standard normal since " +
            "X₁ − X₂ ~ N(0,2), hence XᵀAX ~ χ²₁ — matching rank(A) as the degrees of freedom.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.25,
    expectedSeconds: 150,
    prereqClosure: ["quadratic-forms-random-vectors", "chi-square-distribution", "rank", "multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "quadratic-forms--explain-derive-variance-formula",
    conceptId: "quadratic-forms-random-vectors",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "For X ~ N_k(μ, Σ) and A symmetric, derive Var(XᵀAX) = 2tr(AΣAΣ) + 4μᵀAΣAμ. (You may use, " +
      "without reproving it, that for jointly normal (Y₁,...,Yₖ), " +
      "Cov(YᵢYⱼ, YₗYₘ) = ΣᵢₗΣⱼₘ + ΣᵢₘΣⱼₗ when all four means are zero — Isserlis' theorem for pairs.)",
    rubric: {
      elements: [
        {
          id: "center-first",
          description:
            "Writes X = μ + Z with Z ~ N_k(0, Σ), expands XᵀAX = μᵀAμ + 2μᵀAZ + ZᵀAZ, and notes " +
            "Var(XᵀAX) = Var(2μᵀAZ + ZᵀAZ) since μᵀAμ is a constant.",
          weight: 3,
          required: true,
        },
        {
          id: "cross-term-vanishes",
          description:
            "Observes Cov(μᵀAZ, ZᵀAZ) = 0 because Z and ZᵀAZ are both even/odd functions of a " +
            "symmetric distribution around 0 in the relevant moment (E[Zᵢ·ZⱼZₗ] = 0 for zero-mean " +
            "jointly normal Z, a third central moment), so the variance splits additively into " +
            "4Var(μᵀAZ) + Var(ZᵀAZ).",
          weight: 3,
        },
        {
          id: "linear-piece",
          description: "Computes Var(μᵀAZ) = μᵀAΣAμ directly from the bilinear covariance identity.",
          weight: 2,
        },
        {
          id: "quadratic-piece",
          description:
            "Uses the given pairwise Isserlis identity summed over i,j to get Var(ZᵀAZ) = 2tr(AΣAΣ), " +
            "then adds the two pieces: 4μᵀAΣAμ + 2tr(AΣAΣ).",
          weight: 3,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.3,
    expectedSeconds: 330,
    prereqClosure: ["quadratic-forms-random-vectors", "trace", "covariance-matrix", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "quadratic-forms--recall-noncentral-vs-central",
    conceptId: "quadratic-forms-random-vectors",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "For X ~ N_k(μ, I) and A symmetric idempotent, XᵀAX is a (possibly noncentral) chi-square. It " +
      "reduces to a *central* chi-square exactly when:",
    choices: [
      { id: "a", text: "Aμ = 0", correct: true },
      {
        id: "b",
        text: "μ = 0",
        correct: false,
        misconception: {
          id: "qf-overstates-centrality-condition",
          description:
            "μ = 0 is sufficient but not necessary. Any μ orthogonal to A's range also gives Aμ = 0 " +
            "and hence a central chi-square, even with μ far from 0.",
          blameConceptId: "quadratic-forms-random-vectors",
        },
      },
      {
        id: "c",
        text: "the noncentrality parameter μᵀΣμ is zero",
        correct: false,
        misconception: {
          id: "qf-misidentifies-noncentrality-parameter",
          description:
            "The noncentrality parameter of XᵀAX is μᵀAμ (or ‖Aμ‖² style, built from A), not μᵀΣμ — " +
            "conflating the mean's quadratic form in A with the covariance's quadratic form in A.",
          blameConceptId: "quadratic-forms-random-vectors",
        },
      },
      {
        id: "d",
        text: "A is positive definite",
        correct: false,
        misconception: {
          id: "qf-confuses-pd-with-centrality",
          description:
            "Positive definiteness of A is irrelevant to whether the chi-square is central — " +
            "centrality is governed entirely by whether Aμ = 0, the same idempotence-versus-definiteness " +
            "confusion that appears in whether a quadratic form is chi-square at all.",
          blameConceptId: "quadratic-forms-random-vectors",
        },
      },
    ],
    difficulty: 0.85,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["quadratic-forms-random-vectors", "chi-square-distribution", "multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "quadratic-forms--transfer-mahalanobis-distance",
    conceptId: "quadratic-forms-random-vectors",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "For X ~ N_k(μ, Σ) with Σ invertible, the Mahalanobis distance is defined as " +
      "D²(X) = (X − μ)ᵀΣ⁻¹(X − μ). Using the quadratic-forms chi-square criterion, show D²(X) ~ χ²_k.",
    rubric: {
      elements: [
        {
          id: "whiten",
          description:
            "Writes Σ = Σ^{1/2}Σ^{1/2} (or any square-root/Cholesky factor) and sets " +
            "Z = Σ^{-1/2}(X − μ), which by the affine-map rule is N_k(0, I) since " +
            "Σ^{-1/2}ΣΣ^{-1/2} = I.",
          weight: 3,
          required: true,
        },
        {
          id: "rewrite-as-norm",
          description:
            "Substitutes to get D²(X) = ZᵀΣ^{1/2}Σ⁻¹Σ^{1/2}Z = ZᵀZ = ‖Z‖², recognising the middle " +
            "product collapses to the identity.",
          weight: 3,
        },
        {
          id: "apply-criterion",
          description:
            "Applies the chi-square criterion to A = I, which is trivially symmetric idempotent of " +
            "rank k, for Z ~ N_k(0, I), concluding ‖Z‖² ~ χ²_k exactly.",
          weight: 2,
        },
        {
          id: "reading",
          description:
            "Notes the payoff: Mahalanobis distance is 'ordinary Euclidean distance after whitening', " +
            "which is why it is the standard outlier/goodness-of-fit statistic for multivariate normal " +
            "data — it is a quadratic form in disguise, not a new idea.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.25,
    expectedSeconds: 240,
    prereqClosure: ["quadratic-forms-random-vectors", "multivariate-normal", "chi-square-distribution", "covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // cochrans-theorem (+5)
  // =========================================================================
  {
    id: "cochrans-theorem--apply-regression-decomposition",
    conceptId: "cochrans-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Four observations at x = 1, 2, 3, 4 give y = (3, 4, 6, 8), fitted by least squares as " +
      "ŷ = 1 + 1.7x with residuals 0.3, −0.4, −0.1, 0.2. Cochran's decomposition splits the total sum " +
      "of squares about ȳ into SS_regression (rank 1, on top of the intercept) and RSS (rank n − p = 2), " +
      "which are independent. Compute the F-statistic (SS_regression / 1) / (RSS / 2). " +
      "[check: ȳ = 5.25, SS_total = 5.0625+1.5625+0.5625+7.5625 = 14.75; " +
      "RSS = 0.09+0.16+0.01+0.04 = 0.30; SS_regression = 14.75 − 0.30 = 14.45; " +
      "F = 14.45 / (0.30/2) = 14.45/0.15 = 96.333]",
    answerKey: 96.333,
    tolerance: 0.05,
    difficulty: 1.7,
    discrimination: 1.25,
    expectedSeconds: 240,
    prereqClosure: ["cochrans-theorem", "quadratic-forms-random-vectors", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "cochrans-theorem--apply-two-way-anova-ranks",
    conceptId: "cochrans-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A two-way layout has 3 row levels and 2 column levels, one observation per cell (n = 6), fit " +
      "by an additive (no-interaction) model. Cochran's decomposition has four pieces: grand mean " +
      "(rank 1), row effect (rank 3 − 1 = 2), column effect (rank 2 − 1 = 1), and a remainder. Using " +
      "the condition that the ranks sum to n, find the remainder's rank.",
    answerKey: 2,
    tolerance: 0,
    difficulty: 1.4,
    discrimination: 1.15,
    expectedSeconds: 120,
    prereqClosure: ["cochrans-theorem", "rank"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "cochrans-theorem--explain-orthogonal-projection-proof",
    conceptId: "cochrans-theorem",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Suppose A₁, …, A_m are symmetric idempotent matrices with A_iA_j = 0 for i ≠ j and " +
      "ΣᵢAᵢ = I (mutually orthogonal projections tiling ℝⁿ). For X ~ N_n(0, σ²I), prove directly — by " +
      "choosing an adapted orthonormal basis — that the pieces XᵀAᵢX/σ² are independent χ²_{rᵢ} with " +
      "rᵢ = rank(Aᵢ), without invoking the general rank-sum theorem as a black box.",
    rubric: {
      elements: [
        {
          id: "adapted-basis",
          description:
            "Builds an orthonormal basis of ℝⁿ by concatenating orthonormal bases of each Aᵢ's range " +
            "(possible since the ranges are pairwise orthogonal and together span ℝⁿ, because the " +
            "Aᵢ sum to I), and forms the orthogonal matrix Q with these as columns.",
          weight: 3,
          required: true,
        },
        {
          id: "rotate-x",
          description:
            "Sets Y = QᵀX ~ N_n(0, σ²I) by rotation-invariance, and notes each Aᵢ acts as the " +
            "coordinate projection onto its own block of Y's indices in this basis, so XᵀAᵢX = " +
            "sum of squares of the rᵢ coordinates of Y assigned to block i.",
          weight: 3,
        },
        {
          id: "blocks-disjoint-and-iid",
          description:
            "Concludes the m pieces are sums of squares over disjoint, non-overlapping blocks of the " +
            "iid N(0, σ²) coordinates of Y, hence independent of each other by construction, each " +
            "χ²_{rᵢ} after dividing by σ² since a sum of rᵢ squared iid standard normals is exactly " +
            "the χ²_{rᵢ} definition.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.3,
    expectedSeconds: 330,
    prereqClosure: ["cochrans-theorem", "quadratic-forms-random-vectors", "mutual-independence", "chi-square-distribution"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "cochrans-theorem--explain-idempotence-is-a-consequence",
    conceptId: "cochrans-theorem",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Cochran's theorem is often introduced by first assuming each Aᵢ is symmetric idempotent. In " +
      "fact, if X ~ N_n(0, σ²I), Σᵢ XᵀAᵢX = XᵀX with each Aᵢ merely symmetric, and Σᵢrᵢ = n where " +
      "rᵢ = rank(Aᵢ), idempotence of every Aᵢ follows automatically — it need not be assumed. Why?",
    choices: [
      {
        id: "a",
        text:
          "Because 0 ⪯ Aᵢ ⪯ I forces every eigenvalue of Aᵢ into [0,1], so tr(Aᵢ) ≤ rank(Aᵢ) with " +
          "equality exactly when every eigenvalue is 0 or 1; summing gives n = Σtr(Aᵢ) ≤ Σrank(Aᵢ) = n, " +
          "forcing equality termwise and hence idempotence for every Aᵢ",
        correct: true,
      },
      {
        id: "b",
        text: "Because any symmetric matrix is automatically idempotent",
        correct: false,
        misconception: {
          id: "cochran-symmetric-implies-idempotent",
          description:
            "False in general — 2I is symmetric but (2I)² = 4I ≠ 2I. Symmetry and idempotence are " +
            "independent properties; the theorem's content is that the rank condition forces the " +
            "second one, not that the first one implies it.",
          blameConceptId: "quadratic-forms-random-vectors",
        },
      },
      {
        id: "c",
        text:
          "It doesn't — idempotence must still be assumed separately; the rank condition alone is not " +
          "strong enough to force it",
        correct: false,
        misconception: {
          id: "cochran-denies-rank-additivity",
          description:
            "Denies the actual, more surprising content of the rank-additivity theorem: the rank " +
            "condition together with Σ Aᵢ = I does force idempotence, which is precisely what makes " +
            "stating Cochran's theorem from a rank count alone a complete hypothesis.",
          blameConceptId: "cochrans-theorem",
        },
      },
      {
        id: "d",
        text:
          "Because idempotent matrices are exactly those whose diagonal entries are all 0 or 1, and " +
          "the Aᵢ's diagonals must partition I's diagonal of 1's",
        correct: false,
        misconception: {
          id: "cochran-idempotent-diagonal-misconception",
          description:
            "Idempotent matrices need not have 0/1 diagonal entries at all — a rank-1 projection like " +
            "½[[1,−1],[−1,1]] is idempotent with diagonal entries of ½. The condition is on the " +
            "eigenvalues, not the diagonal entries.",
          blameConceptId: "quadratic-forms-random-vectors",
        },
      },
    ],
    difficulty: 1.9,
    discrimination: 1.3,
    expectedSeconds: 180,
    prereqClosure: ["cochrans-theorem", "quadratic-forms-random-vectors", "rank"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "cochrans-theorem--transfer-two-sample-t-test",
    conceptId: "cochrans-theorem",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "The pooled two-sample t-test uses a pooled variance S²_p built from two independent samples of " +
      "sizes n₁ and n₂, and divides a normal numerator by an independent χ²_{n₁+n₂−2} to get a " +
      "t_{n₁+n₂−2} statistic. Explain where Cochran's theorem is doing work here, and why the " +
      "denominator's degrees of freedom is n₁ + n₂ − 2 rather than n₁ + n₂ − 1.",
    rubric: {
      elements: [
        {
          id: "two-independent-cochran-applications",
          description:
            "Notes that within each sample separately, Cochran's theorem (applied to that sample's " +
            "centring decomposition) gives (nₖ − 1)Sₖ²/σ² ~ χ²_{nₖ−1} independent of that sample's own " +
            "mean, and the two samples are independent of each other by design, so the sum " +
            "(n₁−1)S₁² + (n₂−1)S₂² over σ² is itself χ²_{(n₁−1)+(n₂−1)} by the additivity of " +
            "independent chi-squares.",
          weight: 3,
          required: true,
        },
        {
          id: "df-is-two-subtractions",
          description:
            "Explains n₁ + n₂ − 2 as two separate rank-1 subtractions (one centring per sample), not " +
            "one — each sample loses exactly one dimension to estimating its own mean, and the losses " +
            "add because the two centring projections act on disjoint coordinate blocks.",
          weight: 3,
        },
        {
          id: "numerator-independence",
          description:
            "Notes the numerator X̄₁ − X̄₂ is independent of both S₁² and S₂² individually (each by " +
            "the within-sample Cochran argument), hence of the pooled S²_p, which is what licenses " +
            "assembling the t ratio at all.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.3,
    expectedSeconds: 270,
    prereqClosure: ["cochrans-theorem", "sample-variance", "t-distribution", "chi-square-distribution"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // distribution-of-beta-hat (+4)
  // =========================================================================
  {
    id: "distribution-of-beta-hat--apply-intercept-slope-covariance",
    conceptId: "distribution-of-beta-hat",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Four observations at x = 1, 2, 3, 4 with an intercept and σ² = 1, so " +
      "(XᵀX)⁻¹ = [[1.5, −0.5], [−0.5, 0.2]]. Compute Cov(β̂₀, β̂₁), the off-diagonal entry of " +
      "σ²(XᵀX)⁻¹. [check: σ² × (−0.5) = −0.5]",
    answerKey: -0.5,
    tolerance: 0.01,
    difficulty: 1.5,
    discrimination: 1.15,
    expectedSeconds: 90,
    prereqClosure: ["distribution-of-beta-hat", "invertible-matrices", "covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "distribution-of-beta-hat--apply-prediction-variance",
    conceptId: "distribution-of-beta-hat",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same design: (XᵀX)⁻¹ = [[1.5, −0.5], [−0.5, 0.2]], σ² = 1. The fitted value at a new point " +
      "x₀ = 5 is ŷ₀ = x₀ᵀβ̂ with x₀ = (1, 5)ᵀ, an affine function of the normal vector β̂, so " +
      "Var(ŷ₀) = σ²x₀ᵀ(XᵀX)⁻¹x₀. Compute Var(ŷ₀). " +
      "[check: (XᵀX)⁻¹x₀ = (1.5·1 − 0.5·5, −0.5·1 + 0.2·5) = (−1, 0.5); " +
      "x₀ᵀ·(−1,0.5) = 1·(−1) + 5·0.5 = 1.5]",
    answerKey: 1.5,
    tolerance: 0.02,
    difficulty: 1.6,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["distribution-of-beta-hat", "invertible-matrices", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "distribution-of-beta-hat--explain-linear-combination-distribution",
    conceptId: "distribution-of-beta-hat",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "For any fixed vector c ∈ ℝᵖ, derive the exact distribution of cᵀβ̂, and explain why this — " +
      "rather than the marginal distribution of a single β̂ⱼ — is the object a general linear hypothesis " +
      "test (e.g. testing β₁ = β₂) actually needs.",
    rubric: {
      elements: [
        {
          id: "affine-of-affine",
          description:
            "Notes cᵀβ̂ = cᵀAy with A = (XᵀX)⁻¹Xᵀ, so it is itself an affine (here, purely linear) " +
            "image of β̂'s multivariate normal distribution, hence univariate normal.",
          weight: 3,
          required: true,
        },
        {
          id: "mean-and-variance",
          description:
            "Computes E[cᵀβ̂] = cᵀβ and Var(cᵀβ̂) = cᵀ(σ²(XᵀX)⁻¹)c = σ²cᵀ(XᵀX)⁻¹c, both immediate from " +
            "the linear-combination rule for a multivariate normal vector's known mean and covariance.",
          weight: 3,
        },
        {
          id: "why-general-c-matters",
          description:
            "Explains that a hypothesis like β₁ = β₂ is c = (0,1,−1,0,…)ᵀ dotted with β, so its test " +
            "statistic needs Var(cᵀβ̂) for that specific c — the two marginal variances Var(β̂₁), " +
            "Var(β̂₂) alone are not enough unless Cov(β̂₁,β̂₂) is also folded in via this same formula.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.25,
    expectedSeconds: 270,
    prereqClosure: ["distribution-of-beta-hat", "multivariate-normal", "multivariate-mgf"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "distribution-of-beta-hat--transfer-leverage-and-extrapolation",
    conceptId: "distribution-of-beta-hat",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Prediction intervals for ŷ₀ = x₀ᵀβ̂ visibly widen as x₀ moves away from the bulk of the training " +
      "predictors. Using Var(ŷ₀) = σ²x₀ᵀ(XᵀX)⁻¹x₀, explain why this happens, and why it is a statement " +
      "about (XᵀX)⁻¹ rather than about σ² changing.",
    rubric: {
      elements: [
        {
          id: "quadratic-form-in-x0",
          description:
            "Identifies Var(ŷ₀) as a quadratic form in x₀ built from the fixed matrix (XᵀX)⁻¹, so it " +
            "necessarily grows (in the positive-semidefinite sense) as x₀ moves in directions where " +
            "(XᵀX)⁻¹ is 'large' — i.e., directions the training data barely constrained.",
          weight: 3,
          required: true,
        },
        {
          id: "sigma-squared-is-fixed",
          description:
            "Notes σ² is a single scalar, the same for every x₀ — it cannot be the source of the " +
            "widening; the entire x₀-dependence, and hence the leverage effect, lives in x₀ᵀ(XᵀX)⁻¹x₀.",
          weight: 3,
        },
        {
          id: "geometric-reading",
          description:
            "Connects this to leverage: XᵀX summarises how much the training predictors spread out, " +
            "and (XᵀX)⁻¹ is correspondingly large in directions with little spread, so extrapolating " +
            "along a direction the data never explored inflates the quadratic form and the prediction " +
            "variance with it.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.25,
    expectedSeconds: 240,
    prereqClosure: ["distribution-of-beta-hat", "covariance-matrix", "geometric-interpretation-of-ols"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // kl-divergence (+7)
  // =========================================================================
  {
    id: "kl-divergence--apply-exponential-pair",
    conceptId: "kl-divergence",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "P = Exponential(rate 2), Q = Exponential(rate 1). Using D_KL(P‖Q) = log(λ_P/λ_Q) + λ_Q/λ_P − 1 " +
      "for exponentials, compute D_KL(P ‖ Q) in nats, to three decimals. " +
      "[check: log(2) + 1/2 − 1 = 0.693 + 0.5 − 1 = 0.193]",
    answerKey: 0.193,
    tolerance: 0.005,
    difficulty: 0.7,
    discrimination: 1.1,
    expectedSeconds: 150,
    prereqClosure: ["kl-divergence", "expectation", "pdf"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "kl-divergence--apply-poisson-pair",
    conceptId: "kl-divergence",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "P = Poisson(3), Q = Poisson(2). Using D_KL(P‖Q) = λ_P log(λ_P/λ_Q) − (λ_P − λ_Q) for Poissons, " +
      "compute D_KL(P ‖ Q) in nats, to three decimals. " +
      "[check: 3·log(1.5) − 1 = 3(0.4055) − 1 = 1.2164 − 1 = 0.216]",
    answerKey: 0.216,
    tolerance: 0.005,
    difficulty: 0.75,
    discrimination: 1.15,
    expectedSeconds: 150,
    prereqClosure: ["kl-divergence", "expectation", "pmf"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "kl-divergence--apply-normals-unequal-variance-forward",
    conceptId: "kl-divergence",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "P = N(0, 1), Q = N(1, 4). Using the general formula " +
      "D_KL(N(μ₁,σ₁²)‖N(μ₂,σ₂²)) = log(σ₂/σ₁) + (σ₁² + (μ₁−μ₂)²)/(2σ₂²) − ½, compute D_KL(P ‖ Q) in " +
      "nats, to three decimals. [check: log(2) + (1+1)/8 − 0.5 = 0.693 + 0.25 − 0.5 = 0.443]",
    answerKey: 0.443,
    tolerance: 0.005,
    difficulty: 0.85,
    discrimination: 1.15,
    expectedSeconds: 150,
    prereqClosure: ["kl-divergence", "expectation", "pdf"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "kl-divergence--apply-normals-unequal-variance-reverse",
    conceptId: "kl-divergence",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "With the same two Normals — P = N(0, 1) and Q = N(1, 4) — now compute D_KL(Q ‖ P) in nats, to " +
      "three decimals, and compare to the forward value 0.443 computed with the roles reversed. " +
      "[check: log(1/2) + (4+1)/2 − 0.5 = −0.693 + 2.5 − 0.5 = 1.307]",
    answerKey: 1.307,
    tolerance: 0.005,
    difficulty: 0.95,
    discrimination: 1.15,
    expectedSeconds: 150,
    prereqClosure: ["kl-divergence", "expectation", "pdf"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "kl-divergence--explain-fisher-information-connection",
    conceptId: "kl-divergence",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "For a parametric family P_θ, show that D_KL(P_θ ‖ P_{θ+δ}) ≈ ½δ²I(θ) for small δ, where " +
      "I(θ) is the Fisher information at θ. (You may use, without reproving it, that " +
      "E_θ[∂/∂θ log p_θ(X)] = 0 and E_θ[(∂/∂θ log p_θ(X))²] = I(θ).)",
    rubric: {
      elements: [
        {
          id: "taylor-expand",
          description:
            "Writes D_KL(P_θ‖P_{θ+δ}) = E_θ[log p_θ(X) − log p_{θ+δ}(X)] and Taylor-expands " +
            "log p_{θ+δ}(X) in δ around θ to second order: log p_θ(X) − δ·∂_θ log p_θ(X) − " +
            "(δ²/2)∂²_θ log p_θ(X) + O(δ³).",
          weight: 3,
          required: true,
        },
        {
          id: "first-order-vanishes",
          description:
            "Takes E_θ of the expansion: the zeroth-order terms cancel, and the first-order term " +
            "δ·E_θ[∂_θ log p_θ(X)] vanishes by the given score-mean-zero identity, leaving only the " +
            "second-order term.",
          weight: 3,
        },
        {
          id: "second-order-is-fisher-info",
          description:
            "Identifies −E_θ[∂²_θ log p_θ(X)] with I(θ) via the information-matrix identity (the " +
            "second Bartlett identity), giving D_KL(P_θ‖P_{θ+δ}) ≈ (δ²/2)I(θ), so KL divergence " +
            "behaves like a squared Riemannian distance with I(θ) as the local metric.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.3,
    expectedSeconds: 300,
    prereqClosure: ["kl-divergence", "expectation", "pdf"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "kl-divergence--explain-mutual-information-as-kl",
    conceptId: "kl-divergence",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Mutual information is defined as I(X;Y) = D_KL(P_{X,Y} ‖ P_X ⊗ P_Y), the divergence from the " +
      "joint distribution to the product of the marginals. Explain why this makes I(X;Y) ≥ 0 " +
      "automatically, why it equals 0 exactly when X and Y are independent, and why this makes it a " +
      "stronger dependence detector than correlation.",
    rubric: {
      elements: [
        {
          id: "nonnegativity-for-free",
          description:
            "Notes I(X;Y) ≥ 0 is not a new fact about mutual information — it is Gibbs' inequality " +
            "(D_KL ≥ 0) applied to this particular pair of distributions, inheriting the property for " +
            "free rather than needing a separate proof.",
          weight: 3,
          required: true,
        },
        {
          id: "zero-iff-independent",
          description:
            "Uses the equality condition of Gibbs' inequality (D_KL = 0 iff the two distributions " +
            "coincide) to conclude I(X;Y) = 0 exactly when P_{X,Y} = P_X ⊗ P_Y, which is the definition " +
            "of independence.",
          weight: 3,
        },
        {
          id: "stronger-than-correlation",
          description:
            "Contrasts this with correlation, which only detects linear association and can be exactly " +
            "0 for strongly dependent variables (e.g. Y = X² with symmetric X); mutual information " +
            "detects any departure from the product-of-marginals form, linear or not.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.2,
    expectedSeconds: 210,
    prereqClosure: ["kl-divergence", "expectation", "pmf"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "kl-divergence--transfer-aic-as-estimated-kl",
    conceptId: "kl-divergence",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "The Akaike Information Criterion, AIC = 2k − 2log L̂, is derived as an approximately unbiased " +
      "estimator of the expected KL divergence between the fitted model and the true data-generating " +
      "distribution (up to an additive constant that does not depend on the model). Explain what role " +
      "the 2k term plays in this interpretation, and why comparing AIC across models is comparing " +
      "estimated KL divergences rather than comparing fit alone.",
    rubric: {
      elements: [
        {
          id: "log-likelihood-estimates-cross-entropy",
          description:
            "Notes that −log L̂/n is a plug-in estimate of the cross-entropy H(P_true, P_model), and " +
            "since D_KL(P_true‖P_model) = H(P_true, P_model) − H(P_true) with H(P_true) unknown but " +
            "constant across candidate models, differences in log-likelihood already estimate " +
            "differences in KL divergence up to that shared constant.",
          weight: 3,
          required: true,
        },
        {
          id: "2k-corrects-optimism",
          description:
            "Explains that maximising log-likelihood on the same data used to fit the model gives an " +
            "*optimistically* biased estimate of the expected KL to a fresh dataset — the model is " +
            "partly fit to its own noise — and the 2k penalty is a first-order correction for that " +
            "optimism, growing with the number of fitted parameters k.",
          weight: 3,
        },
        {
          id: "comparison-is-kl-comparison",
          description:
            "Concludes that ranking models by AIC is therefore ranking them by an unbiased estimate of " +
            "expected KL divergence to the truth, not by raw fit — a model with better raw " +
            "log-likelihood can still lose on AIC once its extra parameters' optimism penalty is added.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.2,
    expectedSeconds: 240,
    prereqClosure: ["kl-divergence", "expectation"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // conditional-multivariate-normal (+12)
  // =========================================================================
  {
    id: "conditional-multivariate-normal--apply-three-dim-mean",
    conceptId: "conditional-multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ N₃(μ, Σ) with X = (X₁, X₂, X₃), μ = (1, 0, 2)ᵀ, and " +
      "Σ = [[3,1,1],[1,2,0],[1,0,2]]. Compute E[X₁ | X₂ = 2, X₃ = 4]. " +
      "[check: Σ₁₂ = (1,1), Σ₂₂ = [[2,0],[0,2]] so Σ₂₂⁻¹ = diag(0.5,0.5); " +
      "Σ₁₂Σ₂₂⁻¹ = (0.5,0.5); (x₂−μ₂) = (2,2); dot product = 0.5·2+0.5·2 = 2; mean = 1 + 2 = 3]",
    answerKey: 3,
    tolerance: 0.01,
    difficulty: 1.1,
    discrimination: 1.15,
    expectedSeconds: 150,
    prereqClosure: ["conditional-multivariate-normal", "covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conditional-multivariate-normal--apply-three-dim-variance",
    conceptId: "conditional-multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same X ~ N₃(μ, Σ) as above: μ = (1, 0, 2)ᵀ, Σ = [[3,1,1],[1,2,0],[1,0,2]]. Compute " +
      "Var(X₁ | X₂ = 2, X₃ = 4). [check: Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁ = 3 − (0.5,0.5)·(1,1)ᵀ = 3 − 1 = 2]",
    answerKey: 2,
    tolerance: 0.01,
    difficulty: 1.3,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["conditional-multivariate-normal", "quadratic-forms-random-vectors", "covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conditional-multivariate-normal--apply-independent-block-no-effect",
    conceptId: "conditional-multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ N₂(μ, Σ) with μ = (4, −1)ᵀ and Σ = [[5, 0], [0, 3]] (so Σ₁₂ = 0, meaning X₁ ⊥ X₂). " +
      "Compute Var(X₁ | X₂ = x₂) for an arbitrary x₂, and confirm it equals the unconditional Var(X₁). " +
      "[check: Σ₁₁ − Σ₁₂²/Σ₂₂ = 5 − 0/3 = 5, matching Σ₁₁ = 5 exactly]",
    answerKey: 5,
    tolerance: 0.01,
    difficulty: 0.6,
    discrimination: 1.1,
    expectedSeconds: 90,
    prereqClosure: ["conditional-multivariate-normal", "covariance-matrix", "mutual-independence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conditional-multivariate-normal--explain-singular-sigma22",
    conceptId: "conditional-multivariate-normal",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Suppose X = (X₁, X₂, X₃) is jointly normal with X₃ = 2X₂ exactly (a deterministic linear " +
      "relationship, so Var(X₂ − X₃/2) = 0). Explain what breaks in the formula X₁ | (X₂,X₃) = x " +
      "using Σ₂₂⁻¹, and what replaces it.",
    rubric: {
      elements: [
        {
          id: "sigma22-singular",
          description:
            "Identifies that Σ₂₂, the covariance of (X₂,X₃), is singular here — X₃ = 2X₂ means the " +
            "(X₂,X₃) block has rank 1 as a random vector, so its 2×2 covariance matrix has rank at " +
            "most 1 and Σ₂₂⁻¹ does not exist.",
          weight: 3,
          required: true,
        },
        {
          id: "moore-penrose-fix",
          description:
            "States the fix: replace Σ₂₂⁻¹ with the Moore–Penrose pseudoinverse Σ₂₂⁺ in both the mean " +
            "and covariance formulas, which agrees with the ordinary inverse whenever one exists and " +
            "remains well-defined when it does not.",
          weight: 3,
        },
        {
          id: "why-it-still-makes-sense",
          description:
            "Notes that the underlying conditioning is still well-posed — observing X₂ = x₂ pins down " +
            "X₃ = 2x₂ deterministically too, so there is really only one degree of freedom of new " +
            "information in (X₂,X₃), and the pseudoinverse route correctly uses only that one degree " +
            "of freedom rather than trying to invert a direction with zero variance.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.25,
    expectedSeconds: 210,
    prereqClosure: ["conditional-multivariate-normal", "covariance-matrix", "invertible-matrices"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conditional-multivariate-normal--explain-partitioned-inverse-route",
    conceptId: "conditional-multivariate-normal",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Derive the conditional formula X₁ | X₂ = x₂ ~ N(μ₁ + Σ₁₂Σ₂₂⁻¹(x₂ − μ₂), Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁) by " +
      "the density route: write the joint density's exponent using the block form of Σ⁻¹, and " +
      "complete the square in x₁ directly, rather than by constructing an independent residual.",
    rubric: {
      elements: [
        {
          id: "block-inverse",
          description:
            "Quotes the partitioned-matrix-inverse identity for Σ⁻¹ in terms of the Schur complement " +
            "S = Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁: the (1,1) block of Σ⁻¹ is S⁻¹, and the (1,2) block is " +
            "−S⁻¹Σ₁₂Σ₂₂⁻¹.",
          weight: 3,
          required: true,
        },
        {
          id: "expand-exponent",
          description:
            "Expands the joint density's exponent −½(x−μ)ᵀΣ⁻¹(x−μ) using these blocks and collects the " +
            "terms quadratic and linear in (x₁−μ₁) with x₂ fixed at its observed value, isolating a " +
            "term of the form −½(x₁ − μ₁ − Σ₁₂Σ₂₂⁻¹(x₂−μ₂))ᵀS⁻¹(x₁ − μ₁ − Σ₁₂Σ₂₂⁻¹(x₂−μ₂)) plus terms " +
            "depending only on x₂.",
          weight: 3,
        },
        {
          id: "conditional-density-shape",
          description:
            "Concludes that as a function of x₁ alone (x₂ fixed), the conditional density is " +
            "proportional to exp(−½(x₁ − m)ᵀS⁻¹(x₁ − m)) with m = μ₁ + Σ₁₂Σ₂₂⁻¹(x₂−μ₂), which is " +
            "exactly the N(m, S) density up to normalisation, matching the residual-based derivation's " +
            "result via a completely different route.",
          weight: 3,
        },
      ],
      forbiddenMoves: [
        {
          id: "skips-the-schur-identity",
          description:
            "Expands (x−μ)ᵀΣ⁻¹(x−μ) using generic 2×2 block entries without ever invoking the specific " +
            "Schur-complement form of Σ⁻¹'s blocks, which makes the 'complete the square' step " +
            "unmotivated rather than a direct read-off.",
          weight: 0,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.3,
    expectedSeconds: 330,
    prereqClosure: ["conditional-multivariate-normal", "multivariate-normal", "schur-complement"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conditional-multivariate-normal--apply-bivariate-correlation-mean",
    conceptId: "conditional-multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ N₂(μ, Σ) with μ = (0, 10)ᵀ and Σ = [[4, 6], [6, 25]] (correlation ρ = 6/√(4·25) = 0.6). " +
      "Compute E[X₁ | X₂ = 16]. [check: Σ₁₂/Σ₂₂ = 6/25 = 0.24; (x₂−μ₂) = 16−10 = 6; " +
      "mean = 0 + 0.24·6 = 1.44]",
    answerKey: 1.44,
    tolerance: 0.01,
    difficulty: 1.0,
    discrimination: 1.15,
    expectedSeconds: 120,
    prereqClosure: ["conditional-multivariate-normal", "covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conditional-multivariate-normal--apply-bivariate-correlation-variance",
    conceptId: "conditional-multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same X: μ = (0, 10)ᵀ, Σ = [[4, 6], [6, 25]]. Compute Var(X₁ | X₂ = 16), and confirm it matches " +
      "σ₁²(1 − ρ²) with ρ = 0.6. [check: Σ₁₁ − Σ₁₂²/Σ₂₂ = 4 − 36/25 = 4 − 1.44 = 2.56; " +
      "σ₁²(1−ρ²) = 4(1−0.36) = 4(0.64) = 2.56]",
    answerKey: 2.56,
    tolerance: 0.01,
    difficulty: 1.15,
    discrimination: 1.15,
    expectedSeconds: 150,
    prereqClosure: ["conditional-multivariate-normal", "covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conditional-multivariate-normal--transfer-regression-to-the-mean",
    conceptId: "conditional-multivariate-normal",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "'Regression to the mean' — the observation that unusually tall parents tend to have somewhat " +
      "less tall children — is a direct reading of the conditional-mean formula. Using " +
      "E[X₁ | X₂ = x₂] = μ₁ + ρ(σ₁/σ₂)(x₂ − μ₂) with 0 < |ρ| < 1, explain why an extreme x₂ predicts a " +
      "*less* extreme X₁ in standardized units, and why this is not evidence of any causal " +
      "'regression' happening over time.",
    rubric: {
      elements: [
        {
          id: "shrinkage-factor",
          description:
            "Identifies that the standardized deviation of X₂ from its mean, (x₂ − μ₂)/σ₂, is scaled " +
            "by ρ (with |ρ| < 1) and then rescaled by σ₁ to predict X₁'s deviation, so the predicted " +
            "deviation of X₁ in its own standard-deviation units is exactly ρ times the observed " +
            "deviation of X₂ in its own standard-deviation units — strictly smaller in magnitude " +
            "whenever |ρ| < 1.",
          weight: 3,
          required: true,
        },
        {
          id: "not-a-time-dynamic",
          description:
            "Explains this is a static property of the joint distribution, not a process unfolding " +
            "over generations or trials: applying the same formula the other direction (predicting " +
            "parent height from an extreme child) shows exactly the same shrinkage, which a genuine " +
            "temporal 'drift toward the mean' could not produce symmetrically.",
          weight: 3,
        },
        {
          id: "symmetric-in-both-directions",
          description:
            "Notes the fallacy this guards against: mistaking the statistical shrinkage for a causal " +
            "force pulling extreme values toward average — the formula is symmetric in which variable " +
            "is treated as 'given', so there is no privileged direction of causation implied.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.2,
    expectedSeconds: 210,
    prereqClosure: ["conditional-multivariate-normal", "covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conditional-multivariate-normal--explain-variance-as-r-squared",
    conceptId: "conditional-multivariate-normal",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "For X ~ N₂(μ, Σ) with correlation ρ, show that Var(X₁ | X₂ = x₂) = σ₁²(1 − ρ²), and explain " +
      "why 1 − ρ² is the 'fraction of Var(X₁) left unexplained by X₂' — the same ρ² that appears as R² " +
      "in simple linear regression.",
    rubric: {
      elements: [
        {
          id: "algebraic-simplification",
          description:
            "Substitutes Σ₁₂ = ρσ₁σ₂ and Σ₂₂ = σ₂² into Σ₁₁ − Σ₁₂²/Σ₂₂ to get " +
            "σ₁² − ρ²σ₁²σ₂²/σ₂² = σ₁²(1 − ρ²) directly.",
          weight: 3,
          required: true,
        },
        {
          id: "fraction-explained-reading",
          description:
            "Reads (σ₁² − Var(X₁|X₂))/σ₁² = ρ² as the proportional reduction in variance achieved by " +
            "conditioning on X₂, which is exactly the population definition of R² for the simple " +
            "regression of X₁ on X₂.",
          weight: 3,
        },
        {
          id: "connects-to-regression-coefficient",
          description:
            "Connects this to `distribution-of-beta-hat`: the population regression slope is " +
            "Σ₁₂/Σ₂₂ = ρσ₁/σ₂, and R² for a single predictor is exactly the square of the correlation " +
            "between predictor and response — the same ρ² computed two different ways.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.2,
    expectedSeconds: 210,
    prereqClosure: ["conditional-multivariate-normal", "covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conditional-multivariate-normal--recall-when-conditioning-has-no-effect",
    conceptId: "conditional-multivariate-normal",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "For X ~ N₂(μ, Σ), conditioning X₁ on X₂ = x₂ leaves *both* the mean and the variance completely " +
      "unchanged from the unconditional N(μ₁, Σ₁₁) — for every value of x₂ — exactly when:",
    choices: [
      { id: "a", text: "Σ₁₂ = 0", correct: true },
      {
        id: "b",
        text: "ρ = 1 (X₁ and X₂ are perfectly correlated)",
        correct: false,
        misconception: {
          id: "cmn-confuses-perfect-correlation-with-no-effect",
          description:
            "This is the opposite extreme: ρ = 1 makes X₁ fully determined by x₂, driving the " +
            "conditional variance to 0 — the largest possible effect conditioning can have, not the " +
            "absence of one.",
          blameConceptId: "conditional-multivariate-normal",
        },
      },
      {
        id: "c",
        text: "μ₂ = 0",
        correct: false,
        misconception: {
          id: "cmn-irrelevant-mean-condition",
          description:
            "The location of X₂'s mean has no bearing on whether conditioning changes anything — it " +
            "only shifts which values of x₂ count as 'typical'; the formula's dependence on x₂ is " +
            "governed entirely by Σ₁₂, not μ₂.",
          blameConceptId: "conditional-multivariate-normal",
        },
      },
      {
        id: "d",
        text: "Σ₂₂ = I",
        correct: false,
        misconception: {
          id: "cmn-confuses-rescaling-with-independence",
          description:
            "Rescaling X₂ to unit variance changes Σ₁₂Σ₂₂⁻¹ but does not make it vanish unless Σ₁₂ was " +
            "already 0 — normalizing a correlated variable's variance does not remove the correlation.",
          blameConceptId: "covariance-matrix",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.15,
    expectedSeconds: 60,
    prereqClosure: ["conditional-multivariate-normal", "mutual-independence"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conditional-multivariate-normal--apply-fraction-of-variance-explained",
    conceptId: "conditional-multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Using the three-dimensional example X ~ N₃(μ, Σ) with μ = (1,0,2)ᵀ, Σ = [[3,1,1],[1,2,0],[1,0,2]] " +
      "(where Var(X₁) = 3 and Var(X₁ | X₂,X₃) = 2), compute the fraction of Var(X₁) explained by " +
      "jointly conditioning on (X₂, X₃), i.e. 1 − Var(X₁|X₂,X₃)/Var(X₁). Give a decimal to four places.",
    answerKey: 0.3333,
    tolerance: 0.001,
    difficulty: 1.4,
    discrimination: 1.15,
    expectedSeconds: 120,
    prereqClosure: ["conditional-multivariate-normal", "covariance-matrix", "quadratic-forms-random-vectors"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "conditional-multivariate-normal--transfer-partial-correlation-sign-reversal",
    conceptId: "conditional-multivariate-normal",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "When X₁ is itself multi-dimensional, X₁ | X₂ = x₂ is a full multivariate normal with its own " +
      "covariance structure — the partial correlations among X₁'s components, given X₂. Explain why a " +
      "partial correlation can have the opposite sign from the corresponding marginal correlation, " +
      "using the conditional covariance formula Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁.",
    rubric: {
      elements: [
        {
          id: "conditional-covariance-is-a-subtraction",
          description:
            "Notes that each entry of the conditional covariance matrix is the corresponding marginal " +
            "covariance entry minus a correction term coming from Σ₁₂Σ₂₂⁻¹Σ₂₁, and that correction is " +
            "not required to have the same sign as the marginal covariance it is subtracted from.",
          weight: 3,
          required: true,
        },
        {
          id: "confounding-reading",
          description:
            "Reads this as the Gaussian analogue of confounding: X₂ can induce a positive marginal " +
            "association between two components of X₁ that are actually negatively associated once " +
            "X₂'s shared influence is removed, if the correction term is large enough and of the right " +
            "sign to overwhelm the original covariance — a continuous, closed-form version of Simpson's " +
            "paradox.",
          weight: 3,
        },
        {
          id: "computable-not-mysterious",
          description:
            "Emphasises that, unlike Simpson's paradox in general contingency tables, the sign flip " +
            "here is fully computable in closed form from Σ alone — one does not need to inspect data " +
            "subgroups to know whether or by how much it will occur.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.25,
    expectedSeconds: 240,
    prereqClosure: ["conditional-multivariate-normal", "covariance-matrix", "correlation"],
    source: AUTHORED,
    status: "live",
  },
];
