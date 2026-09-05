import type { Item, SourceRef } from "../lib/assessment/types";

/**
 * The servable bank for the four concepts added to `multivariate-probability`
 * in the quadratic-forms sweep — Multivariate MGF, Quadratic Forms in Random
 * Vectors, Cochran's Theorem, and the Distribution of β̂ — at eight items each,
 * authored from `assessments/mp-02-quadratic-forms-and-regression.md` and the
 * matching wiki articles.
 *
 * Eight is the bar `auditCoverage` sets: 8+ live items, live coverage at
 * recall/apply/explain, and a difficulty spread of at least 1.5 logits. All
 * four pools clear it with a spread near 2.0, matching the seven concepts the
 * domain already had.
 *
 * These expand the markdown cluster's 29 rather than transcribing them. The
 * markdown records the design; what it cannot carry is a real multiple-choice
 * item, since it states one distractor in prose and the ingest pipeline
 * (`tools/ingestBanks.ts`) therefore demotes every `mcq` row to a short answer.
 * The four MCQs below carry three diagnosed distractors apiece, which is the
 * only form in which a wrong choice can push blame onto the prerequisite that
 * actually failed.
 *
 * Every numeric key was computed twice — once by hand from the algebra stated
 * in the rubric, once in NumPy — before being written here: the two E[XᵀAX]
 * values (12 and 8) also against a two-million-draw Monte Carlo, and the whole
 * worked regression (β̂ = (1, 1.7), RSS = 0.30, s² = 0.15, SE(β̂₁) = 0.17321,
 * t = 9.8150) against a direct least-squares solve.
 *
 * On prerequisite closure: every item declares only concepts genuinely upstream
 * of the one under test. Two facts a learner arriving here has not necessarily
 * met — the definition of the F distribution for the F-versus-t item, and the
 * mean square ratio for the ANOVA item — are supplied in the stem rather than
 * assumed, the same convention the graphical-models bank adopted.
 */

/** Authored from the concept and its prerequisites, with no external seed. */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-mp2",
  tier: "generated",
  title: "Mathlingo authored item (quadratic-forms sweep)",
};

const CASELLA_BERGER: SourceRef = {
  id: "casella-berger",
  tier: "restricted",
  title: "Statistical Inference (Casella & Berger, 2nd ed.)",
  locator: "§4.6, §5.3, §11.3 — multivariate distributions, sampling from the normal, regression",
  rewriteApprovedBy: "pending-review",
};

const BANERJEE_ROY: SourceRef = {
  id: "banerjee-roy",
  tier: "restricted",
  title: "Linear Algebra and Matrix Analysis for Statistics (Banerjee & Roy)",
  locator: "Ch. 10–13 — random vectors, quadratic forms, Cochran's theorem, the linear model",
  rewriteApprovedBy: "pending-review",
};

const STRANG_18_06: SourceRef = {
  id: "mit-ocw-18.06",
  tier: "open",
  title: "MIT 18.06 Linear Algebra (Strang, OpenCourseWare)",
  url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
  license: "CC-BY-NC-SA-4.0",
};

const OCW_18_650: SourceRef = {
  id: "mit-ocw-18.650",
  tier: "open",
  title: "MIT 18.650 Statistics for Applications (OpenCourseWare)",
  url: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
  license: "CC-BY-NC-SA-4.0",
};

export const multivariateFormsItems: Item[] = [
  // =========================================================================
  // Multivariate MGF
  // =========================================================================
  {
    id: "multivariate-mgf--recall-definition",
    conceptId: "multivariate-mgf",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Define the moment generating function of a random vector X in ℝᵏ, and say how it relates to " +
      "the ordinary univariate MGF.",
    rubric: {
      elements: [
        {
          id: "definition",
          description: "Gives M_X(t) = E[exp(tᵀX)] for t in a neighbourhood of the origin.",
          weight: 3,
          required: true,
        },
        {
          id: "scalar-output",
          description:
            "Notes the argument is a vector while the value is a scalar, so M is a function on ℝᵏ.",
          weight: 1,
        },
        {
          id: "univariate-link",
          description:
            "Identifies M_X(t) as the univariate MGF of the scalar projection tᵀX evaluated at 1, so " +
            "the multivariate object is the family of one-dimensional projections indexed by t.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["multivariate-mgf", "mgf", "expectation"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "multivariate-mgf--recall-mvn-form",
    conceptId: "multivariate-mgf",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For X ~ N_k(μ, Σ), the moment generating function is:",
    choices: [
      { id: "a", text: "exp(tᵀμ + ½ tᵀΣt)", correct: true },
      {
        id: "b",
        text: "exp(tᵀμ + tᵀΣt)",
        correct: false,
        misconception: {
          id: "mgf-drops-the-half",
          description:
            "Drops the ½. It is inherited from the univariate MGF exp(sm + ½s²v), not an extra " +
            "convention, and without it the second derivative at 0 returns 2Σ rather than Σ.",
          blameConceptId: "mgf",
        },
      },
      {
        id: "c",
        text: "exp(tᵀμ + ½ tᵀΣ⁻¹t)",
        correct: false,
        misconception: {
          id: "mgf-inverts-sigma",
          description:
            "Imports Σ⁻¹ from the density's exponent. The MGF is an expectation of exp(tᵀX), not a " +
            "density; only the density's quadratic form carries the inverse.",
          blameConceptId: "multivariate-normal",
        },
      },
      {
        id: "d",
        text: "(2π)^(−k/2)|Σ|^(−1/2) exp(tᵀμ + ½ tᵀΣt)",
        correct: false,
        misconception: {
          id: "mgf-carries-density-constant",
          description:
            "Attaches the density's normalising constant. M(0) must equal 1 for every distribution, " +
            "which this expression fails, so no normalising factor can appear.",
          blameConceptId: "mgf",
        },
      },
    ],
    difficulty: 0.65,
    discrimination: 1.6,
    expectedSeconds: 45,
    prereqClosure: ["multivariate-mgf", "multivariate-normal", "covariance-matrix"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "multivariate-mgf--apply-variance-of-sum",
    conceptId: "multivariate-mgf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X ~ N₂(μ, Σ) with μ = (1, 2)ᵀ and Σ = [[4, 2], [2, 3]]. Using M_Y(s) = M_X(sa) with " +
      "a = (1, 1)ᵀ, the sum Y = X₁ + X₂ is Normal. Compute its variance.",
    answerKey: 11,
    tolerance: 0.01,
    difficulty: 1.15,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["multivariate-mgf", "covariance-matrix", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-mgf--apply-read-off-covariance",
    conceptId: "multivariate-mgf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A random vector in ℝ² has M(t) = exp(t₁ + 2t₂ + 2t₁² + 2t₁t₂ + 1.5t₂²). Matching log M " +
      "against tᵀμ + ½tᵀΣt, compute Cov(X₁, X₂).",
    answerKey: 2,
    tolerance: 0.01,
    difficulty: 1.45,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["multivariate-mgf", "covariance-matrix", "covariance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-mgf--explain-derive-mvn-mgf",
    conceptId: "multivariate-mgf",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Derive M_X(t) = exp(tᵀμ + ½tᵀΣt) for X ~ N_k(μ, Σ) without integrating the k-dimensional " +
      "density.",
    rubric: {
      elements: [
        {
          id: "projection-is-normal",
          description:
            "Uses the projection definition: tᵀX is univariate Normal with mean tᵀμ and variance tᵀΣt.",
          weight: 3,
          required: true,
        },
        {
          id: "evaluate-at-one",
          description:
            "Recognises M_X(t) as the univariate MGF exp(sm + ½s²v) of that projection evaluated at " +
            "s = 1, giving exp(tᵀμ + ½tᵀΣt).",
          weight: 3,
        },
        {
          id: "uniqueness",
          description:
            "Notes that MGF uniqueness turns the computation into a characterisation: any vector with " +
            "this MGF is multivariate normal with those parameters.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "integrates-the-density",
          description:
            "Sets up the k-dimensional integral of exp(tᵀx) against the density and completes the " +
            "square. Correct, but it is the argument the projection definition exists to avoid, and " +
            "it needs Σ invertible where the projection argument does not.",
          weight: 0,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.4,
    expectedSeconds: 240,
    prereqClosure: ["multivariate-mgf", "multivariate-normal", "mgf-properties", "normal-distribution"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "multivariate-mgf--explain-affine-rule",
    conceptId: "multivariate-mgf",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Prove M_{AX+b}(t) = exp(tᵀb) · M_X(Aᵀt), then use it to show that AX + b is " +
      "N(Aμ + b, AΣAᵀ) when X ~ N_k(μ, Σ).",
    rubric: {
      elements: [
        {
          id: "transpose-substitution",
          description:
            "Shows tᵀ(AX + b) = (Aᵀt)ᵀX + tᵀb, so the constant factors out and the remaining " +
            "expectation is M_X evaluated at Aᵀt — the transpose, not A itself.",
          weight: 3,
          required: true,
        },
        {
          id: "substitute-mvn",
          description:
            "Substitutes the multivariate normal MGF and collects: exp(tᵀ(Aμ + b) + ½tᵀ(AΣAᵀ)t).",
          weight: 3,
        },
        {
          id: "identify-result",
          description:
            "Concludes by uniqueness that this is exactly N(Aμ + b, AΣAᵀ), so the family is closed " +
            "under affine maps.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.5,
    expectedSeconds: 240,
    prereqClosure: ["multivariate-mgf", "multivariate-normal", "matrix-multiplication", "covariance-matrix"],
    source: BANERJEE_ROY,
    status: "live",
  },
  {
    id: "multivariate-mgf--transfer-uncorrelated-implies-independent",
    conceptId: "multivariate-mgf",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Zero covariance does not imply independence in general, yet for jointly normal blocks it " +
      "does. Explain what the MGF argument shows, and why the argument is special to this family.",
    rubric: {
      elements: [
        {
          id: "factorisation",
          description:
            "With Σ₁₂ = 0 the quadratic form splits as sᵀΣ₁₁s + uᵀΣ₂₂u with no cross terms, so the " +
            "joint MGF factors into the two marginal MGFs — which is equivalent to independence.",
          weight: 3,
          required: true,
        },
        {
          id: "nothing-above-second-order",
          description:
            "Explains the specialness: the multivariate normal's exponent contains nothing above " +
            "second order, so removing the second-order cross term removes all the dependence there is.",
          weight: 3,
        },
        {
          id: "general-counterexample",
          description:
            "Contrasts with a general distribution, where higher-order coupling survives zero " +
            "covariance — the Cov(X, X²) = 0 situation, in which X and X² are plainly dependent.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["multivariate-mgf", "covariance", "mutual-independence", "multivariate-normal"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "multivariate-mgf--transfer-marginals-vs-projections",
    conceptId: "multivariate-mgf",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "A colleague checks a histogram of each of five variables, finds all five plausibly Normal, " +
      "and concludes the vector is multivariate normal. Using the fact that M_X(t) is the univariate " +
      "MGF of tᵀX, explain what they have and have not checked.",
    rubric: {
      elements: [
        {
          id: "which-projections",
          description:
            "Points out that they have checked five projections — the coordinate directions — while " +
            "multivariate normality is a claim about aᵀX for every a in ℝᵏ.",
          weight: 3,
          required: true,
        },
        {
          id: "failure-is-diagonal",
          description:
            "Notes that a violation therefore shows up in some direction nobody looked at, which is " +
            "why joint normality can fail with every marginal Normal.",
          weight: 2,
        },
        {
          id: "better-diagnostic",
          description:
            "Suggests a diagnostic that uses the joint structure — Mahalanobis distances against a " +
            "chi-square reference, or a scatter of a few linear combinations — rather than more " +
            "marginal histograms.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["multivariate-mgf", "multivariate-normal", "bivariate-normal"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Quadratic Forms in Random Vectors
  // =========================================================================
  {
    id: "quadratic-forms--recall-expectation-formula",
    conceptId: "quadratic-forms-random-vectors",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "State the expectation of the quadratic form XᵀAX for a random vector with mean μ and " +
      "covariance Σ, and say what has to be assumed about X's distribution.",
    rubric: {
      elements: [
        {
          id: "formula",
          description: "Gives E[XᵀAX] = tr(AΣ) + μᵀAμ.",
          weight: 3,
          required: true,
        },
        {
          id: "no-assumption",
          description:
            "States that nothing beyond the existence of the first two moments is assumed — the " +
            "result is not a normal-theory one.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.45,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["quadratic-forms-random-vectors", "trace", "covariance-matrix", "expectation"],
    source: BANERJEE_ROY,
    status: "live",
  },
  {
    id: "quadratic-forms--recall-chi-square-criterion",
    conceptId: "quadratic-forms-random-vectors",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "For X ~ N_k(0, I) and A symmetric, XᵀAX has a chi-square distribution exactly when A is:",
    choices: [
      { id: "a", text: "idempotent, with degrees of freedom rank(A)", correct: true },
      {
        id: "b",
        text: "positive definite",
        correct: false,
        misconception: {
          id: "qf-confuses-pd-with-idempotent",
          description:
            "Positive definiteness makes the form non-negative but says nothing about which " +
            "distribution it has. A = 2I is positive definite and gives 2χ²_k, which is not a " +
            "chi-square.",
          blameConceptId: "positive-definite-matrices",
        },
      },
      {
        id: "c",
        text: "of full rank",
        correct: false,
        misconception: {
          id: "qf-confuses-rank-with-idempotence",
          description:
            "Rank fixes the degrees of freedom once the form is chi-square, but idempotence is what " +
            "makes it chi-square at all. Most full-rank A give a weighted sum of chi-squares.",
          blameConceptId: "rank",
        },
      },
      {
        id: "d",
        text: "diagonal",
        correct: false,
        misconception: {
          id: "qf-requires-diagonal",
          description:
            "Diagonal with entries 0 and 1 is one idempotent case, but the projection onto any " +
            "subspace works — the centring and hat matrices are dense and both qualify.",
          blameConceptId: "quadratic-forms-random-vectors",
        },
      },
    ],
    difficulty: 0.75,
    discrimination: 1.7,
    expectedSeconds: 45,
    prereqClosure: ["quadratic-forms-random-vectors", "chi-square-distribution", "rank"],
    source: BANERJEE_ROY,
    status: "live",
  },
  {
    id: "quadratic-forms--apply-expected-squared-norm",
    conceptId: "quadratic-forms-random-vectors",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "X has mean μ = (1, 2)ᵀ and covariance Σ = [[4, 2], [2, 3]]. Compute E[X₁² + X₂²], the " +
      "expected squared norm.",
    answerKey: 12,
    tolerance: 0.01,
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["quadratic-forms-random-vectors", "trace", "covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "quadratic-forms--apply-cross-product-form",
    conceptId: "quadratic-forms-random-vectors",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same X: mean μ = (1, 2)ᵀ, covariance Σ = [[4, 2], [2, 3]]. Taking A = [[0, 1], [1, 0]], the " +
      "form XᵀAX equals 2X₁X₂. Compute its expectation.",
    answerKey: 8,
    tolerance: 0.01,
    difficulty: 1.5,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["quadratic-forms-random-vectors", "trace", "covariance", "covariance-matrix"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "quadratic-forms--explain-craig-independence",
    conceptId: "quadratic-forms-random-vectors",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Two quadratic forms XᵀAX and XᵀBX in X ~ N_n(0, σ²I) are independent exactly when AB = 0. " +
      "Let P be a symmetric idempotent matrix. Show the criterion applies to XᵀPX and Xᵀ(I − P)X, " +
      "and give the geometric reading.",
    rubric: {
      elements: [
        {
          id: "product-is-zero",
          description:
            "Computes P(I − P) = P − P² = 0 using idempotence, so the criterion is met and the two " +
            "forms are independent.",
          weight: 3,
          required: true,
        },
        {
          id: "geometry",
          description:
            "Reads AB = 0 for two projections as their column spaces being orthogonal subspaces, so " +
            "the two forms measure the vector's length in complementary directions.",
          weight: 3,
        },
        {
          id: "why-normality-needed",
          description:
            "Notes that joint normality is essential: for a general distribution the criterion gives " +
            "zero covariance between the forms and nothing stronger.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["quadratic-forms-random-vectors", "multivariate-normal", "mutual-independence"],
    source: BANERJEE_ROY,
    status: "live",
  },
  {
    id: "quadratic-forms--explain-trace-trick",
    conceptId: "quadratic-forms-random-vectors",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem: "Prove that E[XᵀAX] = tr(AΣ) + μᵀAμ.",
    rubric: {
      elements: [
        {
          id: "trace-of-a-scalar",
          description:
            "Observes XᵀAX is 1 × 1 so equals its own trace, then applies cyclicity to get tr(AXXᵀ).",
          weight: 3,
          required: true,
        },
        {
          id: "expectation-inside",
          description:
            "Uses linearity of the trace to move the expectation inside: tr(A E[XXᵀ]), with " +
            "E[XXᵀ] = Σ + μμᵀ.",
          weight: 3,
        },
        {
          id: "final-collapse",
          description:
            "Expands to tr(AΣ) + tr(Aμμᵀ) and collapses the second term to the scalar μᵀAμ by " +
            "cyclicity once more.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "drops-the-trace-term",
          description:
            "Evaluates the form at the mean and reports μᵀAμ alone — the multivariate version of " +
            "writing E[X²] = (E[X])². The missing tr(AΣ) is the entire contribution of the " +
            "randomness, and is the bias of every uncorrected sum of squares.",
          weight: 0,
          misconception: {
            id: "qf-plug-in-the-mean",
            description:
              "Treats E[g(X)] as g(E[X]) for the quadratic form, losing the tr(AΣ) term.",
            blameConceptId: "expectation",
          },
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["quadratic-forms-random-vectors", "trace", "covariance-matrix", "expectation"],
    source: BANERJEE_ROY,
    status: "live",
  },
  {
    id: "quadratic-forms--explain-centring-matrix",
    conceptId: "quadratic-forms-random-vectors",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Let 1 be the vector of n ones and C = I − (1/n)11ᵀ, so that XᵀCX is the sum of squared " +
      "deviations of X's entries from their average. For X ~ N_n(μ1, σ²I), show that " +
      "XᵀCX/σ² ~ χ²_{n−1}.",
    rubric: {
      elements: [
        {
          id: "idempotence",
          description:
            "Verifies C is symmetric and C² = C, using 1ᵀ1 = n to collapse the cross terms, so C is " +
            "an orthogonal projection.",
          weight: 3,
          required: true,
        },
        {
          id: "rank-is-n-minus-one",
          description:
            "Computes tr(C) = n − 1, which for an idempotent matrix is its rank, giving the degrees " +
            "of freedom.",
          weight: 3,
        },
        {
          id: "mean-annihilated",
          description:
            "Notes C1 = 0, so the mean is annihilated by the projection: no noncentrality survives " +
            "and the distribution does not depend on μ at all.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: [
      "quadratic-forms-random-vectors",
      "chi-square-distribution",
      "trace",
      "rank",
      "multivariate-normal",
    ],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "quadratic-forms--transfer-degrees-of-freedom",
    conceptId: "quadratic-forms-random-vectors",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Three different 'degrees of freedom' rules — n − 1 for a sum of squared deviations from the " +
      "average, n − p for the residuals of a p-parameter fit, and rank(A) for a general quadratic " +
      "form — are the same statement. Say what that statement is, and what it means for the usual " +
      "explanation that a degree of freedom is 'used up' by estimating a parameter.",
    rubric: {
      elements: [
        {
          id: "df-is-rank",
          description:
            "Identifies the common statement: the degrees of freedom of an idempotent quadratic form " +
            "is rank(A), the dimension of the subspace A projects onto.",
          weight: 3,
          required: true,
        },
        {
          id: "reads-the-cases",
          description:
            "Reads both special cases as dimensions: centring projects onto the space orthogonal to " +
            "the vector of ones (dimension n − 1); fitting p coefficients leaves a residual space of " +
            "dimension n − p.",
          weight: 3,
        },
        {
          id: "reframes-the-folk-rule",
          description:
            "Concludes that nothing is 'used up' — a subspace is removed and its dimension is the " +
            "count, which is why the rule generalises to cases with no parameter being estimated.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["quadratic-forms-random-vectors", "rank", "chi-square-distribution"],
    source: STRANG_18_06,
    status: "live",
  },

  // =========================================================================
  // Cochran's Theorem
  // =========================================================================
  {
    id: "cochrans-theorem--recall-statement",
    conceptId: "cochrans-theorem",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten", "spoken"],
    stem: "State Cochran's theorem.",
    rubric: {
      elements: [
        {
          id: "setup",
          description:
            "Sets up X ~ N_n(0, σ²I) with the squared norm decomposed as a sum of quadratic forms " +
            "XᵀA_iX of ranks r_i.",
          weight: 3,
          required: true,
        },
        {
          id: "rank-condition",
          description: "States the condition that the ranks sum to n.",
          weight: 3,
        },
        {
          id: "conclusion",
          description:
            "Concludes that the pieces are then mutually independent, with Q_i/σ² ~ χ²_{r_i}.",
          weight: 3,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["cochrans-theorem", "quadratic-forms-random-vectors", "chi-square-distribution"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "cochrans-theorem--recall-condition",
    conceptId: "cochrans-theorem",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "In Cochran's theorem, the condition that delivers independent chi-square pieces is that:",
    choices: [
      { id: "a", text: "the ranks of the quadratic forms sum to n", correct: true },
      {
        id: "b",
        text: "the quadratic forms are pairwise uncorrelated",
        correct: false,
        misconception: {
          id: "cochran-uncorrelated-is-enough",
          description:
            "Uncorrelatedness is a consequence of the theorem, not its hypothesis, and outside the " +
            "normal family it would not deliver independence in any case.",
          blameConceptId: "cochrans-theorem",
        },
      },
      {
        id: "c",
        text: "each matrix A_i is symmetric",
        correct: false,
        misconception: {
          id: "cochran-symmetry-is-enough",
          description:
            "Symmetry is a standing assumption that costs nothing — any quadratic form can be " +
            "symmetrised without changing it — so it cannot be what makes the pieces independent.",
          blameConceptId: "quadratic-forms-random-vectors",
        },
      },
      {
        id: "d",
        text: "the sums of squares are equal in size",
        correct: false,
        misconception: {
          id: "cochran-equal-pieces",
          description:
            "Confuses a balanced design with the theorem's hypothesis. The pieces may be wildly " +
            "different in magnitude; only their ranks matter.",
          blameConceptId: "cochrans-theorem",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.7,
    expectedSeconds: 45,
    prereqClosure: ["cochrans-theorem", "rank", "chi-square-distribution"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "cochrans-theorem--apply-anova-f",
    conceptId: "cochrans-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Group A is (4, 6, 8) and group B is (10, 12, 14). Decompose the total sum of squares about " +
      "the grand mean into between-group and within-group pieces, then compute the ratio of the " +
      "between-group mean square (its sum of squares over 1 degree of freedom) to the within-group " +
      "mean square (its sum of squares over 4).",
    answerKey: 13.5,
    tolerance: 0.01,
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["cochrans-theorem", "quadratic-forms-random-vectors", "sample-mean"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "cochrans-theorem--apply-rank-count",
    conceptId: "cochrans-theorem",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Twelve observations fall into three groups of four. The decomposition has three pieces: the " +
      "grand mean (rank 1), between groups (rank 2), and within groups. Given that the ranks must " +
      "sum to n = 12 for Cochran's theorem to apply, compute the rank of the within-group piece.",
    answerKey: 9,
    tolerance: 0.01,
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["cochrans-theorem", "rank"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "cochrans-theorem--explain-overlapping-ranks",
    conceptId: "cochrans-theorem",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "An analyst presents a decomposition of a sum of squares into pieces whose ranks add to " +
      "n + 2 rather than n. What must be true about the pieces, and what happens to any ratio of " +
      "mean squares built from them?",
    rubric: {
      elements: [
        {
          id: "subspaces-overlap",
          description:
            "Concludes the subspaces cannot be mutually orthogonal — they overlap, so some variation " +
            "is being counted more than once.",
          weight: 3,
          required: true,
        },
        {
          id: "not-independent",
          description:
            "Notes Cochran's conclusion fails: the pieces are not independent and need not be " +
            "chi-square, so the ratio has no F distribution.",
          weight: 3,
        },
        {
          id: "practical-reading",
          description:
            "Connects it to practice — this is what a decomposition with correlated predictors or " +
            "double-counted effects looks like, and the reported p-value is not interpretable.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["cochrans-theorem", "rank", "quadratic-forms-random-vectors"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "cochrans-theorem--explain-xbar-s2-independence",
    conceptId: "cochrans-theorem",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "For X₁, …, Xₙ iid N(μ, σ²), use Cochran's theorem to prove that X̄ and S² are independent, " +
      "then assemble the statistic √n(X̄ − μ)/S and name its distribution.",
    rubric: {
      elements: [
        {
          id: "decomposition",
          description:
            "Standardises to Z = (X − μ1)/σ and splits the squared norm into ZᵀPZ + ZᵀCZ with " +
            "P = 11ᵀ/n of rank 1 and C = I − P of rank n − 1, noting 1 + (n − 1) = n.",
          weight: 3,
          required: true,
        },
        {
          id: "identify-pieces",
          description:
            "Identifies the pieces as n(X̄ − μ)²/σ² ~ χ²₁ and (n − 1)S²/σ² ~ χ²_{n−1}, each a " +
            "function of X̄ and of S² alone, so their independence transfers.",
          weight: 3,
        },
        {
          id: "assemble-t",
          description:
            "Forms the ratio of the standard normal to the root of the independent chi-square over " +
            "its degrees of freedom, cancels σ, and names t_{n−1} — noting the independence is " +
            "exactly what the definition of the t requires.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.6,
    expectedSeconds: 300,
    prereqClosure: [
      "cochrans-theorem",
      "sample-variance",
      "sample-mean",
      "t-distribution",
      "chi-square-distribution",
    ],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "cochrans-theorem--explain-spherical-requirement",
    conceptId: "cochrans-theorem",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Why does Cochran's theorem require the covariance to be σ²I specifically, and what goes " +
      "wrong under heteroskedasticity?",
    rubric: {
      elements: [
        {
          id: "rotation-invariance",
          description:
            "Names rotation-invariance as the property being used: QᵀX has covariance Qᵀ(σ²I)Q = σ²I, " +
            "so the proof may rotate to an orthonormal basis adapted to the subspaces.",
          weight: 3,
          required: true,
        },
        {
          id: "what-breaks",
          description:
            "Explains that with a general Σ the rotation changes the distribution, and the pieces " +
            "become weighted mixtures of chi-squares rather than chi-squares.",
          weight: 3,
        },
        {
          id: "consequence",
          description:
            "Notes the practical consequence: nominal degrees of freedom are wrong and ratios of " +
            "mean squares are not F, which is what Welch and Satterthwaite adjustments approximate " +
            "around.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["cochrans-theorem", "multivariate-normal", "covariance-matrix"],
    source: BANERJEE_ROY,
    status: "live",
  },
  {
    id: "cochrans-theorem--transfer-anova-df-column",
    conceptId: "cochrans-theorem",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "An analysis-of-variance table's degrees-of-freedom column sums to the number of " +
      "observations. What claim is that column actually making, and why do sequential sums of " +
      "squares in an unbalanced design stop supporting it?",
    rubric: {
      elements: [
        {
          id: "column-is-the-condition",
          description:
            "Identifies the column as Cochran's rank condition, so its summing correctly is the " +
            "certificate that the sums of squares are independent chi-squares and the ratios genuine " +
            "F's.",
          weight: 3,
          required: true,
        },
        {
          id: "unbalanced-designs",
          description:
            "Explains that in an unbalanced design the factor subspaces are not orthogonal, so " +
            "sequential sums of squares depend on the order terms enter and the pieces are not " +
            "independent.",
          weight: 3,
        },
        {
          id: "ranks-can-still-add",
          description:
            "Notes the subtlety that the ranks may still add up while the orthogonality that gave " +
            "them meaning does not hold, so the column alone is not a proof.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.45,
    discrimination: 1.5,
    expectedSeconds: 240,
    prereqClosure: ["cochrans-theorem", "quadratic-forms-random-vectors", "rank"],
    source: OCW_18_650,
    status: "live",
  },

  // =========================================================================
  // Distribution of β̂
  // =========================================================================
  {
    id: "distribution-of-beta-hat--recall-statement",
    conceptId: "distribution-of-beta-hat",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "For y = Xβ + ε with ε ~ N_n(0, σ²I) and X fixed of full column rank, state the exact " +
      "distribution of the least-squares estimator β̂.",
    rubric: {
      elements: [
        {
          id: "distribution",
          description: "Gives β̂ ~ N_p(β, σ²(XᵀX)⁻¹).",
          weight: 3,
          required: true,
        },
        {
          id: "unbiased",
          description: "Names it as exactly multivariate normal and unbiased, in any sample size.",
          weight: 2,
        },
        {
          id: "design-only",
          description:
            "Observes the covariance depends on the design and σ² but never on the observed y.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.65,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["distribution-of-beta-hat", "multiple-linear-regression", "multivariate-normal"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "distribution-of-beta-hat--recall-what-makes-it-exact",
    conceptId: "distribution-of-beta-hat",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What makes β̂ ~ N_p(β, σ²(XᵀX)⁻¹) exact rather than approximate in a finite sample?",
    choices: [
      {
        id: "a",
        text: "The errors are Normal, and β̂ is an exactly linear function of y",
        correct: true,
      },
      {
        id: "b",
        text: "The central limit theorem applies to β̂ as a weighted sum of the observations",
        correct: false,
        misconception: {
          id: "beta-hat-credits-the-clt",
          description:
            "The CLT is the fallback when the errors are not Normal, and it delivers only an " +
            "asymptotic statement — so it cannot be the source of a finite-sample exact result.",
          blameConceptId: "distribution-of-beta-hat",
        },
      },
      {
        id: "c",
        text: "The sample size exceeds the number of predictors",
        correct: false,
        misconception: {
          id: "beta-hat-confuses-identifiability",
          description:
            "n > p is needed for XᵀX to be invertible and for residual degrees of freedom to exist, " +
            "but it is about identifiability rather than about the shape of the distribution.",
          blameConceptId: "multiple-linear-regression",
        },
      },
      {
        id: "d",
        text: "The residuals are orthogonal to the fitted values",
        correct: false,
        misconception: {
          id: "beta-hat-confuses-orthogonality-with-normality",
          description:
            "That orthogonality is an algebraic consequence of least squares and holds whatever the " +
            "error distribution; it is what makes β̂ and s² independent, not what makes β̂ Normal.",
          blameConceptId: "geometric-interpretation-of-ols",
        },
      },
    ],
    difficulty: 0.95,
    discrimination: 1.7,
    expectedSeconds: 60,
    prereqClosure: [
      "distribution-of-beta-hat",
      "linear-regression-probabilistic-version",
      "multivariate-normal",
    ],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "distribution-of-beta-hat--apply-slope-variance",
    conceptId: "distribution-of-beta-hat",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Four observations at x = 1, 2, 3, 4, fitted with an intercept and slope, with σ² = 1. Given " +
      "XᵀX = [[4, 10], [10, 30]], compute Var(β̂₁).",
    answerKey: 0.2,
    tolerance: 0.01,
    difficulty: 1.45,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["distribution-of-beta-hat", "invertible-matrices", "determinant", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "distribution-of-beta-hat--apply-t-statistic",
    conceptId: "distribution-of-beta-hat",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Same design — x = 1, 2, 3, 4 with an intercept, so (XᵀX)⁻¹ = [[1.5, −0.5], [−0.5, 0.2]] — " +
      "now with y = (3, 4, 6, 8). Fit by least squares and compute the t-statistic for the slope, " +
      "using s² = RSS/(n − p).",
    answerKey: 9.815,
    tolerance: 0.01,
    difficulty: 1.75,
    discrimination: 1.6,
    expectedSeconds: 300,
    prereqClosure: [
      "distribution-of-beta-hat",
      "ordinary-least-squares",
      "t-distribution",
      "quadratic-forms-random-vectors",
    ],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "distribution-of-beta-hat--explain-affine-derivation",
    conceptId: "distribution-of-beta-hat",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Derive β̂ ~ N_p(β, σ²(XᵀX)⁻¹) from the fact that an affine image of a multivariate normal " +
      "vector is multivariate normal.",
    rubric: {
      elements: [
        {
          id: "linear-in-y",
          description:
            "Writes β̂ = Ay with A = (XᵀX)⁻¹Xᵀ fixed, so β̂ is an affine image of y ~ N(Xβ, σ²I) and " +
            "is therefore multivariate normal.",
          weight: 3,
          required: true,
        },
        {
          id: "mean",
          description: "Computes E[β̂] = AXβ = β, using only E[ε] = 0.",
          weight: 2,
        },
        {
          id: "covariance",
          description:
            "Computes A(σ²I)Aᵀ = σ²(XᵀX)⁻¹XᵀX(XᵀX)⁻¹ = σ²(XᵀX)⁻¹, noting the collapse depends on " +
            "the error covariance being a multiple of the identity.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.6,
    expectedSeconds: 300,
    prereqClosure: [
      "distribution-of-beta-hat",
      "multivariate-mgf",
      "multivariate-normal",
      "normal-equations",
    ],
    source: BANERJEE_ROY,
    status: "live",
  },
  {
    id: "distribution-of-beta-hat--explain-rss-and-independence",
    conceptId: "distribution-of-beta-hat",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Show that RSS/σ² ~ χ²_{n−p} and that it is independent of β̂, then assemble the t-statistic " +
      "for a single coefficient.",
    rubric: {
      elements: [
        {
          id: "rss-is-a-quadratic-form",
          description:
            "Writes e = (I − H)y = (I − H)ε using (I − H)X = 0, so RSS/σ² is a quadratic form in a " +
            "standard normal vector with I − H idempotent of rank n − p, hence χ²_{n−p}.",
          weight: 3,
          required: true,
        },
        {
          id: "independence",
          description:
            "Shows (XᵀX)⁻¹Xᵀ(I − H) = 0, so the linear form carrying β̂ and the quadratic form " +
            "carrying RSS live in orthogonal subspaces and are independent by Cochran.",
          weight: 3,
        },
        {
          id: "assemble",
          description:
            "Divides the standard normal (β̂ⱼ − βⱼ)/(σ√[(XᵀX)⁻¹]ⱼⱼ) by the root of the independent " +
            "χ²_{n−p}/(n − p), cancels σ, and identifies t_{n−p}.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.6,
    expectedSeconds: 360,
    prereqClosure: [
      "distribution-of-beta-hat",
      "cochrans-theorem",
      "quadratic-forms-random-vectors",
      "geometric-interpretation-of-ols",
      "t-distribution",
    ],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "distribution-of-beta-hat--transfer-f-versus-t",
    conceptId: "distribution-of-beta-hat",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "A regression with two strongly correlated predictors reports a joint F-test that rejects, " +
      "while neither coefficient's t-statistic is significant. Taking the F-test as asking whether " +
      "β̂ falls outside a confidence ellipsoid built from σ²(XᵀX)⁻¹, explain the disagreement.",
    rubric: {
      elements: [
        {
          id: "joint-versus-marginal",
          description:
            "Frames the two tests as a joint statement about the vector versus marginal statements " +
            "about single coordinates of the same normal distribution.",
          weight: 3,
          required: true,
        },
        {
          id: "ellipsoid-shape",
          description:
            "Explains that correlated predictors make the ellipsoid long and thin along a diagonal, " +
            "so the null point can lie far outside it while sitting inside every one-dimensional " +
            "projection.",
          weight: 3,
        },
        {
          id: "what-is-estimable",
          description:
            "Concludes that the data pin down a linear combination of the coefficients precisely " +
            "while leaving each one individually uncertain — collinearity inflating the diagonal of " +
            "(XᵀX)⁻¹, not a contradiction between the tests.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.5,
    discrimination: 1.6,
    expectedSeconds: 270,
    prereqClosure: [
      "distribution-of-beta-hat",
      "f-distribution",
      "multivariate-normal",
      "covariance-matrix",
    ],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "distribution-of-beta-hat--transfer-dropping-assumptions",
    conceptId: "distribution-of-beta-hat",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten", "spoken"],
    stem:
      "Which of the numbers a regression prints survive dropping the normality of the errors, and " +
      "which survive dropping homoskedasticity? Say precisely what is lost in each case.",
    rubric: {
      elements: [
        {
          id: "normality-costs-exactness",
          description:
            "Dropping normality leaves β̂ unbiased, still best linear unbiased, and asymptotically " +
            "normal — so the t and F become approximations rather than exact statements.",
          weight: 3,
          required: true,
        },
        {
          id: "homoskedasticity-costs-correctness",
          description:
            "Dropping homoskedasticity breaks the covariance formula itself: Cov(β̂) becomes " +
            "(XᵀX)⁻¹XᵀΣX(XᵀX)⁻¹ and RSS is no longer chi-square, so every printed standard error is " +
            "wrong rather than merely approximate.",
          weight: 3,
        },
        {
          id: "repairs",
          description:
            "Names the repairs: large-sample inference needs nothing extra under non-normality, " +
            "while heteroskedasticity calls for sandwich (robust) standard errors or weighted least " +
            "squares.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.65,
    discrimination: 1.5,
    expectedSeconds: 270,
    prereqClosure: [
      "distribution-of-beta-hat",
      "linear-regression-probabilistic-version",
      "covariance-matrix",
    ],
    source: AUTHORED,
    status: "live",
  },
];
