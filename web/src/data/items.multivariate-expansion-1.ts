import type { Item, SourceRef } from "../lib/assessment/types";

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-multivariate-expansion",
  tier: "generated",
  title: "Mathlingo authored item (multivariate-probability 20-per-concept expansion)",
};

export const multivariateExpansion1Items: Item[] = [
  // =========================================================================
  // Change of Variables (Jacobian) — 7 new items
  // =========================================================================
  {
    id: "change-of-variables-jacobian--sum-difference-transform",
    conceptId: "change-of-variables-jacobian",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "(X, Y) has a joint density. Let U = X + Y and V = X − Y. Using the inverse map " +
      "x = (u + v)/2, y = (u − v)/2, compute |det J| for the change-of-variables formula for the " +
      "density of (U, V).",
    answerKey: 0.5,
    tolerance: 0.001,
    difficulty: 0.7,
    discrimination: 1.1,
    expectedSeconds: 120,
    prereqClosure: ["change-of-variables-jacobian"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--triangular-linear-map-3d",
    conceptId: "change-of-variables-jacobian",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X = (X₁, X₂, X₃) has a joint density. Let Y = AX with A = [[2, 0, 0], [1, 3, 0], [0, 1, 1]]. " +
      "Compute |det J| for the inverse map g⁻¹(y) = A⁻¹y, i.e. the factor by which the density formula " +
      "for Y scales f_X. Give a decimal to four places.",
    answerKey: 0.1667,
    tolerance: 0.001,
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["change-of-variables-jacobian"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--spherical-coordinates",
    conceptId: "change-of-variables-jacobian",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For the spherical map x = ρ sinφ cosθ, y = ρ sinφ sinθ, z = ρ cosφ, the Jacobian determinant is " +
      "ρ² sinφ. Evaluate it at ρ = 2, φ = π/2.",
    answerKey: 4,
    tolerance: 0.001,
    difficulty: 1.1,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["change-of-variables-jacobian"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--linear-map-2d-determinant",
    conceptId: "change-of-variables-jacobian",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "(X₁, X₂) has a joint density. Let Y = AX with A = [[3, 1], [1, 2]]. Compute |det J| for the " +
      "inverse map, i.e. the factor multiplying f_X(A⁻¹y) in the density of Y.",
    answerKey: 0.2,
    tolerance: 0.001,
    difficulty: 0.6,
    discrimination: 1.1,
    expectedSeconds: 120,
    prereqClosure: ["change-of-variables-jacobian"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--ratio-of-exponentials",
    conceptId: "change-of-variables-jacobian",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "X and Y are iid Exponential(1). Using the auxiliary variable W = Y and the transform Z = X/Y, " +
      "derive the density of Z = X/Y for z > 0.",
    rubric: {
      elements: [
        {
          id: "inverse-map",
          description: "Inverts to x = zw, y = w, valid for z > 0, w > 0.",
          weight: 2,
          required: true,
        },
        {
          id: "jacobian",
          description:
            "Computes the Jacobian of (z, w) ↦ (x, y): ∂x/∂z = w, ∂x/∂w = z, ∂y/∂z = 0, ∂y/∂w = 1, " +
            "so |det J| = |w·1 − z·0| = w.",
          weight: 3,
          required: true,
          misconception: {
            id: "jacobian-of-forward-map-used",
            description:
              "Computes the Jacobian of (x, y) ↦ (z, w) instead of the inverse map (z, w) ↦ (x, y) that the " +
              "density formula actually needs.",
            blameConceptId: "change-of-variables-jacobian",
          },
        },
        {
          id: "joint-density",
          description:
            "Writes f_{Z,W}(z, w) = f_X(zw)f_Y(w)·w = e^{−zw}e^{−w}·w = w·e^{−w(1+z)}, using independence.",
          weight: 3,
          required: true,
        },
        {
          id: "integrate-out-w",
          description:
            "Integrates out w: ∫₀^∞ w e^{−w(1+z)} dw = 1/(1+z)², giving f_Z(z) = 1/(1+z)² for z > 0.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.3,
    expectedSeconds: 270,
    prereqClosure: ["change-of-variables-jacobian"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--box-muller-derivation",
    conceptId: "change-of-variables-jacobian",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "The Box–Muller transform sets X = √(−2 ln U₁) cos(2πU₂), Y = √(−2 ln U₁) sin(2πU₂) for " +
      "independent U₁, U₂ ~ Uniform(0, 1). Using the change-of-variables formula (through the polar " +
      "substitution r = √(−2 ln u₁), θ = 2πu₂), show that (X, Y) has the density of two independent " +
      "standard Normals.",
    rubric: {
      elements: [
        {
          id: "polar-substitution",
          description:
            "Reduces to (x, y) = (r cosθ, r sinθ) with r = √(−2 ln u₁), θ = 2πu₂, so d(x,y)/d(r,θ) has " +
            "determinant r (the polar Jacobian).",
          weight: 2,
          required: true,
        },
        {
          id: "jacobian-of-r-theta-in-u",
          description:
            "Computes d(u₁,u₂)/d(r,θ): u₁ = e^{−r²/2} gives du₁/dr = −r e^{−r²/2}, and u₂ = θ/(2π) gives " +
            "du₂/dθ = 1/(2π); the matrix is diagonal so |det| = r e^{−r²/2}/(2π).",
          weight: 3,
          required: true,
          misconception: {
            id: "conflates-uniform-and-normal-jacobians",
            description:
              "Applies the polar Jacobian r directly to the (u₁, u₂) → (x, y) map without first passing " +
              "through the intermediate (r, θ) variables, dropping the e^{−r²/2}/(2π) factor entirely.",
            blameConceptId: "change-of-variables-jacobian",
          },
        },
        {
          id: "chain-the-jacobians",
          description:
            "Chains the two Jacobians: |d(u₁,u₂)/d(x,y)| = |d(u₁,u₂)/d(r,θ)| · |d(r,θ)/d(x,y)| = " +
            "[r e^{−r²/2}/(2π)] · (1/r) = e^{−r²/2}/(2π).",
          weight: 3,
          required: true,
        },
        {
          id: "identify-density",
          description:
            "Substitutes r² = x² + y² to get e^{−(x²+y²)/2}/(2π), and recognises this as exactly the " +
            "product of two independent N(0,1) densities, (1/√(2π))e^{−x²/2}·(1/√(2π))e^{−y²/2}.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.3,
    expectedSeconds: 300,
    prereqClosure: ["change-of-variables-jacobian"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "change-of-variables-jacobian--cholesky-standardization",
    conceptId: "change-of-variables-jacobian",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X has covariance matrix Σ = [[4, 2], [2, 3]]. To standardize, set Z = L⁻¹(X − μ) where L is the " +
      "Cholesky factor (LLᵀ = Σ, L lower-triangular). The inverse transform is X = LZ + μ, whose " +
      "Jacobian is L itself. Compute |det L| — the factor the change-of-variables formula uses to turn " +
      "f_Z into f_X.",
    answerKey: 2.828,
    tolerance: 0.01,
    difficulty: 1.2,
    discrimination: 1.2,
    expectedSeconds: 180,
    prereqClosure: ["change-of-variables-jacobian"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Covariance Matrix — 7 new items
  // =========================================================================
  {
    id: "covariance-matrix--build-from-dataset",
    conceptId: "covariance-matrix",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Four observations of (X, Y): (0, 1), (1, 3), (2, 3), (3, 5). Using the unbiased (n − 1) sample " +
      "covariance matrix Σ, compute det(Σ). Give a decimal to three places.",
    answerKey: 0.444,
    tolerance: 0.005,
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 180,
    prereqClosure: ["covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "covariance-matrix--build-from-joint-pmf",
    conceptId: "covariance-matrix",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X and Y are 0/1-valued with joint pmf P(0,0) = 0.2, P(0,1) = 0.1, P(1,0) = 0.1, P(1,1) = 0.6. " +
      "Compute the (X, Y) entry of the covariance matrix, Cov(X, Y).",
    answerKey: 0.11,
    tolerance: 0.002,
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "covariance-matrix--eigenbasis-decorrelation",
    conceptId: "covariance-matrix",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "(X₁, X₂) has covariance matrix Σ = [[2, 1], [1, 2]]. Let Y₁ = X₁ + X₂ and Y₂ = X₁ − X₂. Using " +
      "Cov(Y) = AΣAᵀ with A = [[1, 1], [1, −1]], what is Cov(Y₁, Y₂)?",
    choices: [
      { id: "a", text: "0", correct: true },
      {
        id: "b",
        text: "4",
        correct: false,
        misconception: {
          id: "adds-instead-of-subtracts-variances",
          description:
            "Computes Var(X₁) + Var(X₂) for the cross term instead of expanding Cov(X₁+X₂, X₁−X₂) " +
            "bilinearly, where the two off-diagonal Cov(X₁,X₂) terms cancel and only Var(X₁) − Var(X₂) " +
            "survives.",
          blameConceptId: "covariance-matrix",
        },
      },
      {
        id: "c",
        text: "1",
        correct: false,
        misconception: {
          id: "reuses-original-covariance",
          description:
            "Reports the original Cov(X₁, X₂) unchanged, treating covariance as invariant under any " +
            "linear recombination of the variables rather than recomputing it via AΣAᵀ.",
          blameConceptId: "covariance",
        },
      },
      {
        id: "d",
        text: "6",
        correct: false,
        misconception: {
          id: "computes-variance-not-covariance",
          description:
            "Reports Var(Y₁) = 6, the (1,1) entry of AΣAᵀ, instead of the requested off-diagonal entry " +
            "Cov(Y₁, Y₂).",
          blameConceptId: "covariance-matrix",
        },
      },
    ],
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 120,
    prereqClosure: ["covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "covariance-matrix--trace-three-variables",
    conceptId: "covariance-matrix",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Σ = [[5, −2, 1], [−2, 4, 0], [1, 0, 3]] is the covariance matrix of (X₁, X₂, X₃). The trace of Σ " +
      "equals the sum of the components' variances — the total variance. Compute it.",
    answerKey: 12,
    tolerance: 0.001,
    difficulty: 0.6,
    discrimination: 1.1,
    expectedSeconds: 90,
    prereqClosure: ["covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "covariance-matrix--build-from-correlation-matrix",
    conceptId: "covariance-matrix",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Var(X₁) = 9, Var(X₂) = 16, and the correlation between them is ρ = 0.5. Recover the off-diagonal " +
      "entry Cov(X₁, X₂) of the covariance matrix.",
    answerKey: 6,
    tolerance: 0.001,
    difficulty: 0.7,
    discrimination: 1.1,
    expectedSeconds: 120,
    prereqClosure: ["covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "covariance-matrix--derive-linear-transform-formula",
    conceptId: "covariance-matrix",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Derive, from the definition Σ = E[(X − μ)(X − μ)ᵀ], the formula Cov(AX) = AΣAᵀ for a constant " +
      "matrix A.",
    rubric: {
      elements: [
        {
          id: "centres-the-transform",
          description:
            "Notes E[AX] = Aμ, so AX − Aμ = A(X − μ) is the centred version of the transformed vector.",
          weight: 2,
          required: true,
        },
        {
          id: "expands-outer-product",
          description:
            "Writes Cov(AX) = E[A(X − μ)(X − μ)ᵀAᵀ], factoring the constant matrix A out on the left and " +
            "Aᵀ out on the right of the outer product.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-a-as-commuting-freely",
            description:
              "Moves A past the outer product without tracking that it must appear once on the left as A " +
              "and once on the right as Aᵀ, e.g. writing Cov(AX) = A²Σ or AΣ.",
            blameConceptId: "matrix-multiplication",
          },
        },
        {
          id: "pulls-expectation-through",
          description:
            "Pulls the (constant) matrices A and Aᵀ out of the expectation, leaving A E[(X−μ)(X−μ)ᵀ] Aᵀ = " +
            "AΣAᵀ.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.2,
    expectedSeconds: 210,
    prereqClosure: ["covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "covariance-matrix--pca-scale-transfer",
    conceptId: "covariance-matrix",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "PCA on raw covariance matrices can be dominated by whichever feature happens to be measured in " +
      "large units (e.g. income in dollars versus age in years). Explain why, and say what changes if " +
      "the eigen-decomposition is instead performed on the correlation matrix.",
    rubric: {
      elements: [
        {
          id: "scale-dependence",
          description:
            "Explains that Var(X) scales with the square of the units, so a feature rescaled from " +
            "thousands of dollars to dollars inflates its variance by 10⁶ and dominates the leading " +
            "eigenvector regardless of how informative it actually is.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-pca-as-scale-free",
            description:
              "Assumes PCA automatically finds the directions of greatest 'true' variation, missing that " +
              "raw covariance-based PCA is not invariant to per-feature rescaling.",
            blameConceptId: "covariance-matrix",
          },
        },
        {
          id: "correlation-matrix-fix",
          description:
            "States that decomposing the correlation matrix instead is equivalent to first standardizing " +
            "each feature to unit variance, so every feature enters on the same scale and none dominates " +
            "purely by unit choice.",
          weight: 3,
          required: true,
        },
        {
          id: "when-to-prefer-covariance",
          description:
            "Bonus: notes covariance-based PCA is still the right choice when the units are already " +
            "comparable and the raw variances themselves carry meaningful information worth preserving.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.3,
    expectedSeconds: 210,
    prereqClosure: ["covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Bivariate Normal — 7 new items
  // =========================================================================
  {
    id: "bivariate-normal--density-evaluation",
    conceptId: "bivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "(X, Y) is bivariate normal with μ_X = μ_Y = 0, σ_X = σ_Y = 1, ρ = 0.5. Evaluate the joint " +
      "density f(1, 1). Give a decimal to three places.",
    answerKey: 0.094,
    tolerance: 0.002,
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 180,
    prereqClosure: ["bivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bivariate-normal--marginal-via-integration",
    conceptId: "bivariate-normal",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Starting from the general bivariate normal density (arbitrary ρ, not just ρ = 0), derive that " +
      "integrating out y gives the marginal X ~ N(μ_X, σ_X²).",
    rubric: {
      elements: [
        {
          id: "complete-the-square",
          description:
            "Completes the square in y inside the exponent, isolating a term of the form " +
            "−(y − [μ_Y + ρ(σ_Y/σ_X)(x−μ_X)])²/(2σ_Y²(1−ρ²)) plus a remainder depending only on x.",
          weight: 3,
          required: true,
          misconception: {
            id: "integrates-without-completing-square",
            description:
              "Attempts the integral over y directly against the cross term still present, without first " +
              "completing the square to isolate a pure Normal kernel in y.",
            blameConceptId: "bivariate-normal",
          },
        },
        {
          id: "remainder-term",
          description:
            "Shows the leftover exponent term, after completing the square, reduces to " +
            "−(x−μ_X)²/(2σ_X²) — the ρ and σ_Y dependence cancels exactly.",
          weight: 3,
          required: true,
        },
        {
          id: "gaussian-integral",
          description:
            "Integrates the isolated Normal kernel in y over ℝ to 1 (it is a properly normalized Normal " +
            "density in y with variance σ_Y²(1−ρ²)), leaving only the x-dependent remainder times the " +
            "correct 1/(σ_X√(2π)) constant.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.3,
    expectedSeconds: 270,
    prereqClosure: ["bivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bivariate-normal--ellipse-tilt-sign",
    conceptId: "bivariate-normal",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "(X, Y) is bivariate normal with σ_X = σ_Y and ρ = −0.7. How are the elliptical contours of the " +
      "density oriented?",
    choices: [
      {
        id: "a",
        text: "Tilted with a negative slope — the major axis runs through decreasing-y as x increases",
        correct: true,
      },
      {
        id: "b",
        text: "Tilted with a positive slope",
        correct: false,
        misconception: {
          id: "sign-of-rho-flipped",
          description:
            "Reverses the sign convention: negative ρ tilts the ellipse's major axis along a line of " +
            "negative slope, since X and Y move oppositely, not together.",
          blameConceptId: "bivariate-normal",
        },
      },
      {
        id: "c",
        text: "Axis-aligned with the x- and y-axes, since σ_X = σ_Y",
        correct: false,
        misconception: {
          id: "ignores-correlation-for-tilt",
          description:
            "Uses equal variances to conclude the ellipse is axis-aligned, but the tilt is governed by ρ, " +
            "not by whether the variances happen to match; axis alignment requires ρ = 0.",
          blameConceptId: "covariance",
        },
      },
      {
        id: "d",
        text: "Circular, since |ρ| is not close enough to 1 to matter",
        correct: false,
        misconception: {
          id: "confuses-magnitude-thresholds",
          description:
            "Treats correlation as negligible unless it is near ±1, but any nonzero ρ ≠ 0 already produces " +
            "an elongated, tilted ellipse rather than a circle.",
          blameConceptId: "bivariate-normal",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.1,
    expectedSeconds: 75,
    prereqClosure: ["bivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bivariate-normal--conditional-given-y",
    conceptId: "bivariate-normal",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "(X, Y) is bivariate normal with μ_X = 2, μ_Y = −1, σ_X = 3, σ_Y = 2, ρ = −0.4. Give the " +
      "conditional distribution of X given Y = 1 (mean and variance).",
    answerKey: "N(0.8, 7.56)",
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["bivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bivariate-normal--orthant-probability",
    conceptId: "bivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For a standard bivariate normal (μ_X = μ_Y = 0, σ_X = σ_Y = 1) with correlation ρ, " +
      "P(X > 0, Y > 0) = 1/4 + arcsin(ρ)/(2π). If P(X > 0, Y > 0) = 0.375, find ρ.",
    answerKey: 0.707,
    tolerance: 0.005,
    difficulty: 1.3,
    discrimination: 1.2,
    expectedSeconds: 180,
    prereqClosure: ["bivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bivariate-normal--cholesky-simulation",
    conceptId: "bivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "To simulate a bivariate normal with σ_X = 2, σ_Y = 5, ρ = 0.6 as X = μ + LZ for iid standard " +
      "normal Z, find the Cholesky factor L = [[L₁₁, 0], [L₂₁, L₂₂]] of Σ. Compute L₂₂.",
    answerKey: 4,
    tolerance: 0.01,
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["bivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bivariate-normal--regression-line-transfer",
    conceptId: "bivariate-normal",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Show that when (X, Y) is bivariate normal, the conditional mean E[Y | X = x] is exactly the OLS " +
      "population regression line, and explain why the residual variance never depends on x.",
    rubric: {
      elements: [
        {
          id: "matches-slope",
          description:
            "Writes E[Y | X = x] = μ_Y + ρ(σ_Y/σ_X)(x − μ_X) and identifies the slope ρσ_Y/σ_X as exactly " +
            "Cov(X,Y)/Var(X), the population OLS slope.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-normality-as-incidental",
            description:
              "Notes the formulas match numerically without explaining that joint normality is what makes " +
              "the true conditional mean linear in the first place, rather than merely resembling a line.",
            blameConceptId: "bivariate-normal",
          },
        },
        {
          id: "matches-intercept",
          description:
            "Identifies the intercept μ_Y − (ρσ_Y/σ_X)μ_X as exactly the OLS population intercept ȳ − β₁x̄ " +
            "in its population form.",
          weight: 2,
          required: true,
        },
        {
          id: "homoskedasticity",
          description:
            "States Var(Y | X = x) = σ_Y²(1 − ρ²), which does not depend on x, and explains that " +
            "homoskedasticity — normally an assumption to be checked in regression — is a theorem here.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.3,
    expectedSeconds: 270,
    prereqClosure: ["bivariate-normal"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Multivariate Normal — 7 new items
  // =========================================================================
  {
    id: "multivariate-normal--marginal-submatrix",
    conceptId: "multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X = (X₁, X₂, X₃) ~ N₃(μ, Σ) with Σ = [[4, 1, 2], [1, 5, 0], [2, 0, 3]]. The marginal " +
      "distribution of (X₁, X₃) is bivariate normal with covariance matrix given by the corresponding " +
      "submatrix of Σ. Compute det of that marginal covariance matrix.",
    answerKey: 8,
    tolerance: 0.001,
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-normal--mahalanobis-distance",
    conceptId: "multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ N₂(μ, Σ) with μ = (1, 2) and Σ = [[4, 2], [2, 3]]. Compute the squared Mahalanobis distance " +
      "(x − μ)ᵀΣ⁻¹(x − μ) for x = (3, 4).",
    answerKey: 1.5,
    tolerance: 0.01,
    difficulty: 1.1,
    discrimination: 1.2,
    expectedSeconds: 180,
    prereqClosure: ["multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-normal--precision-zero-independence",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "X = (X₁, X₂, X₃) ~ N₃(μ, Σ) has precision matrix K = Σ⁻¹ = [[2, −1, 0], [−1, 2, −1], [0, −1, 2]]. " +
      "Are X₁ and X₃ conditionally independent given X₂? Justify your answer from the structure of K.",
    rubric: {
      elements: [
        {
          id: "states-the-rule",
          description:
            "States the rule for Gaussian graphical models: for a multivariate normal, K_ij = 0 if and " +
            "only if Xᵢ and Xⱼ are conditionally independent given all the other variables.",
          weight: 3,
          required: true,
          misconception: {
            id: "reads-precision-like-covariance",
            description:
              "Treats a zero entry of K the same way as a zero entry of Σ (marginal independence), missing " +
              "that the precision matrix's zero pattern encodes conditional, not marginal, independence.",
            blameConceptId: "multivariate-normal",
          },
        },
        {
          id: "applies-to-k13",
          description:
            "Notes K₁₃ = 0 in this specific matrix, and concludes X₁ ⊥ X₃ | X₂.",
          weight: 3,
          required: true,
        },
        {
          id: "notes-k12-nonzero",
          description:
            "Bonus: contrasts with K₁₂ = −1 ≠ 0, so X₁ and X₂ are conditionally dependent given X₃ — the " +
            "chain structure X₁—X₂—X₃ is visible directly in K's sparsity pattern.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.3,
    expectedSeconds: 210,
    prereqClosure: ["multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-normal--partial-correlation",
    conceptId: "multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For the same precision matrix K = [[2, −1, 0], [−1, 2, −1], [0, −1, 2]], the partial correlation " +
      "is ρ_{ij·rest} = −K_ij/√(K_ii K_jj). Compute the partial correlation between X₁ and X₂ given X₃.",
    answerKey: 0.5,
    tolerance: 0.01,
    difficulty: 1.2,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-normal--quadratic-form-chi-square",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "X ~ N_k(μ, Σ). What is the distribution of the quadratic form (X − μ)ᵀΣ⁻¹(X − μ)?",
    answerKey: "Chi-square with k degrees of freedom",
    difficulty: 0.4,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-normal--sum-independent-vectors",
    conceptId: "multivariate-normal",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ N₂(μ₁, Σ₁) with μ₁ = (1, 0), Σ₁ = [[2, 0], [0, 3]], and independently Y ~ N₂(μ₂, Σ₂) with " +
      "μ₂ = (2, 1), Σ₂ = [[1, 1], [1, 4]]. For Z = X + Y ~ N₂(μ₁ + μ₂, Σ₁ + Σ₂), compute Cov(Z₁, Z₂).",
    answerKey: 1,
    tolerance: 0.001,
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-normal--degenerate-singular-case",
    conceptId: "multivariate-normal",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A claimed 'bivariate normal' has Σ = [[1, 1], [1, 1]]. Explain why it has no density on ℝ², and " +
      "describe concretely what the distribution of (X₁, X₂) actually looks like.",
    rubric: {
      elements: [
        {
          id: "singular-sigma",
          description:
            "Computes det(Σ) = 1·1 − 1·1 = 0, so Σ is singular and Σ⁻¹ does not exist — the density " +
            "formula, which needs |Σ|^(−1/2), is undefined.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-density-always-exists",
            description:
              "Assumes every valid covariance matrix produces a genuine density function on ℝᵏ, missing " +
              "that a positive semi-definite but not strictly positive definite Σ describes a distribution " +
              "with no density in the ambient space.",
            blameConceptId: "multivariate-normal",
          },
        },
        {
          id: "correlation-one",
          description:
            "Notes Var(X₁) = Var(X₂) = 1 and Cov(X₁,X₂) = 1 give correlation ρ = 1, the extreme case.",
          weight: 2,
          required: true,
        },
        {
          id: "degenerate-support",
          description:
            "Describes the actual distribution: X₂ − X₁ has variance Var(X₁) + Var(X₂) − 2Cov(X₁,X₂) = 0, " +
            "so X₂ − X₁ is almost surely a constant — the distribution puts all its mass on a single line " +
            "in ℝ², not spread over the plane.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.3,
    expectedSeconds: 210,
    prereqClosure: ["multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Pearson Correlation — 7 new items
  // =========================================================================
  {
    id: "pearson-correlation--from-summary-statistics",
    conceptId: "pearson-correlation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A dataset has Σ(xᵢ−x̄)² = 40, Σ(yᵢ−ȳ)² = 90, and Σ(xᵢ−x̄)(yᵢ−ȳ) = 54. Compute r directly from " +
      "these sums, without the raw data.",
    answerKey: 0.9,
    tolerance: 0.005,
    difficulty: 0.7,
    discrimination: 1.1,
    expectedSeconds: 90,
    prereqClosure: ["pearson-correlation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pearson-correlation--from-joint-pmf",
    conceptId: "pearson-correlation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X and Y have joint pmf: P(−1,1) = 0.15, P(−1,0) = 0.05, P(0,0) = 0.6, P(1,−1) = 0.15, " +
      "P(1,0) = 0.05. Compute the Pearson correlation coefficient between X and Y. Give a decimal to " +
      "three places.",
    answerKey: -0.866,
    tolerance: 0.005,
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 210,
    prereqClosure: ["pearson-correlation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pearson-correlation--outlier-sensitivity",
    conceptId: "pearson-correlation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "The four points (1,1), (2,2), (3,3), (4,4) have r = 1. A fifth point (5, −20) is added. " +
      "Recompute r for all five points. Give a decimal to three places.",
    answerKey: -0.625,
    tolerance: 0.005,
    difficulty: 1.1,
    discrimination: 1.2,
    expectedSeconds: 210,
    prereqClosure: ["pearson-correlation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pearson-correlation--r-squared-interpretation",
    conceptId: "pearson-correlation",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Study hours and test score have sample correlation r = 0.6. What fraction of the variance in " +
      "test score is linearly associated with study hours (i.e. what is r²)?",
    answerKey: 0.36,
    tolerance: 0.005,
    difficulty: 0.5,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["pearson-correlation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pearson-correlation--slope-relation-derivation",
    conceptId: "pearson-correlation",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Derive that the ordinary-least-squares slope of y on x, β₁ = Σ(xᵢ−x̄)(yᵢ−ȳ)/Σ(xᵢ−x̄)², equals " +
      "r·(s_y/s_x), where s_x, s_y are the sample standard deviations.",
    rubric: {
      elements: [
        {
          id: "substitutes-r",
          description:
            "Writes the numerator Σ(xᵢ−x̄)(yᵢ−ȳ) as r·√(Σ(xᵢ−x̄)²·Σ(yᵢ−ȳ)²), directly from r's definition.",
          weight: 3,
          required: true,
        },
        {
          id: "simplifies-the-ratio",
          description:
            "Divides by Σ(xᵢ−x̄)² and simplifies √(Σ(yᵢ−ȳ)²/Σ(xᵢ−x̄)²) to s_y/s_x, since the shared factor " +
            "1/(n−1) inside each sum cancels under the square root's ratio.",
          weight: 3,
          required: true,
          misconception: {
            id: "forgets-n-minus-one-cancels",
            description:
              "Leaves a stray 1/(n−1) or √(n−1) factor in the final expression, not recognising that it " +
              "cancels between the s_y and s_x that appear in the same ratio.",
            blameConceptId: "correlation",
          },
        },
        {
          id: "conclusion",
          description:
            "Concludes β₁ = r·(s_y/s_x), and notes that when x and y are both standardized (s_x = s_y = 1) " +
            "the slope equals r exactly.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.2,
    expectedSeconds: 210,
    prereqClosure: ["pearson-correlation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pearson-correlation--monotone-nonlinear-transfer",
    conceptId: "pearson-correlation",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "For y = x³ evaluated at x = −2, −1, 0, 1, 2, compute the Pearson correlation r, and explain why " +
      "it falls short of 1 even though the relationship between x and y is perfectly monotonic.",
    rubric: {
      elements: [
        {
          id: "computes-r",
          description:
            "Computes r = Σxy/√(Σx²Σy²) = 34/√(10·130) ≈ 0.943 for the five points.",
          weight: 3,
          required: true,
        },
        {
          id: "explains-the-gap",
          description:
            "Explains the gap from 1: r measures linear association, and the cubic curve bends away from " +
            "any single straight line, so even a perfectly monotonic relationship registers less than " +
            "perfect linear correlation.",
          weight: 3,
          required: true,
          misconception: {
            id: "expects-monotonic-implies-r-one",
            description:
              "Expects any strictly monotonic relationship to give |r| = 1, conflating monotonicity with " +
              "linearity — the property r actually detects.",
            blameConceptId: "pearson-correlation",
          },
        },
        {
          id: "spearman-contrast",
          description:
            "Contrasts with Spearman's rank correlation, which would equal exactly 1 here since it only " +
            "requires the ranks to move together monotonically, not linearly.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.3,
    expectedSeconds: 240,
    prereqClosure: ["pearson-correlation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "pearson-correlation--sign-flip-negative-scale",
    conceptId: "pearson-correlation",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Corr(X, Y) = 0.65. Let Y′ = −2Y + 5. What is Corr(X, Y′)?",
    choices: [
      { id: "a", text: "−0.65", correct: true },
      {
        id: "b",
        text: "0.65",
        correct: false,
        misconception: {
          id: "ignores-sign-of-scaling-factor",
          description:
            "Applies invariance under linear rescaling but forgets that a negative multiplier reverses the " +
            "sign of r, since r(x, cy+d) = sign(c)·r(x,y) rather than always r(x,y).",
          blameConceptId: "pearson-correlation",
        },
      },
      {
        id: "c",
        text: "−1.3",
        correct: false,
        misconception: {
          id: "scales-r-like-covariance",
          description:
            "Multiplies r by the same factor −2 applied to the data, treating r as if it scaled like " +
            "covariance rather than being normalized by the standard deviations, which absorb that same " +
            "factor.",
          blameConceptId: "covariance",
        },
      },
      {
        id: "d",
        text: "1.3",
        correct: false,
        misconception: {
          id: "scales-r-and-drops-sign",
          description:
            "Makes the same scaling error as multiplying r by 2, and additionally loses the sign flip from " +
            "the negative coefficient.",
          blameConceptId: "covariance",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.1,
    expectedSeconds: 75,
    prereqClosure: ["pearson-correlation"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Central Limit Theorem — 7 new items
  // =========================================================================
  {
    id: "central-limit-theorem--continuity-correction-binomial",
    conceptId: "central-limit-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ Binomial(n = 100, p = 0.4). Using the Normal approximation from the CLT with the continuity " +
      "correction, estimate P(X ≤ 45). Give a decimal to three places.",
    answerKey: 0.869,
    tolerance: 0.01,
    difficulty: 1.2,
    discrimination: 1.2,
    expectedSeconds: 180,
    prereqClosure: ["central-limit-theorem"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "central-limit-theorem--sample-proportion",
    conceptId: "central-limit-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A poll samples n = 400 voters from a population where the true supporting proportion is " +
      "p = 0.52. Using the CLT for the sample proportion p̂, estimate P(p̂ > 0.55). Give a decimal to " +
      "three places.",
    answerKey: 0.115,
    tolerance: 0.005,
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 180,
    prereqClosure: ["central-limit-theorem"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "central-limit-theorem--difference-of-means",
    conceptId: "central-limit-theorem",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Population A has mean 10 and variance 16; population B (independent of A) has mean 12 and " +
      "variance 25. Independent samples of size n_A = 50 and n_B = 40 are drawn. By the CLT, state the " +
      "approximate distribution of X̄_A − X̄_B (mean and variance).",
    answerKey: "N(-2, 0.945)",
    difficulty: 1.1,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["central-limit-theorem"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "central-limit-theorem--sum-of-uniforms",
    conceptId: "central-limit-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "S is the sum of n = 12 iid Uniform(0, 1) random variables — the classic trick for approximating " +
      "a standard Normal draw, since Var(S) works out to exactly 1. Using the CLT, estimate P(S > 7). " +
      "Give a decimal to three places.",
    answerKey: 0.159,
    tolerance: 0.005,
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: ["central-limit-theorem"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "central-limit-theorem--berry-esseen-rate",
    conceptId: "central-limit-theorem",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Two populations have the same finite variance; one is exactly Normal, the other is heavily " +
      "skewed (e.g. Exponential). For the same sample size n, whose sample mean is closer to Normal, " +
      "and what result quantifies how the gap shrinks as n grows?",
    rubric: {
      elements: [
        {
          id: "normal-population-already-there",
          description:
            "Notes that if the population itself is Normal, X̄ is exactly Normal at every n — there is no " +
            "approximation error at all, so it 'wins' trivially for any n.",
          weight: 2,
          required: true,
        },
        {
          id: "skew-slows-convergence",
          description:
            "Explains that for the skewed population, the CLT approximation is only asymptotic, and the " +
            "approximation error at finite n grows with the population's skewness (its third absolute " +
            "moment), so more skew needs larger n to look equally Normal.",
          weight: 3,
          required: true,
          misconception: {
            id: "clt-error-treated-as-population-independent",
            description:
              "Treats the CLT's approximation quality as depending only on n, missing that the same n gives " +
              "a much worse Normal approximation for a skewed population than for a symmetric one.",
            blameConceptId: "central-limit-theorem",
          },
        },
        {
          id: "names-berry-esseen",
          description:
            "Names the Berry–Esseen theorem, which bounds the maximum gap between the true CDF of the " +
            "standardized sum and the standard Normal CDF by a constant times (third absolute moment)/" +
            "(σ³√n) — explicitly showing skewness enters the numerator and n enters as √n in the " +
            "denominator.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.3,
    expectedSeconds: 210,
    prereqClosure: ["central-limit-theorem"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "central-limit-theorem--sample-size-for-margin",
    conceptId: "central-limit-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A population has standard deviation σ = 15. Using the CLT, the standard error of X̄ is σ/√n. " +
      "What is the smallest sample size n so that the standard error is at most 1?",
    answerKey: 225,
    tolerance: 0.001,
    difficulty: 0.7,
    discrimination: 1.1,
    expectedSeconds: 90,
    prereqClosure: ["central-limit-theorem"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "central-limit-theorem--two-sided-interval",
    conceptId: "central-limit-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A population has mean 100 and standard deviation 20, and n = 50. Using the CLT, estimate " +
      "P(95 < X̄ < 105). Give a decimal to three places.",
    answerKey: 0.923,
    tolerance: 0.01,
    difficulty: 1.1,
    discrimination: 1.2,
    expectedSeconds: 180,
    prereqClosure: ["central-limit-theorem"],
    source: AUTHORED,
    status: "live",
  },
];
