import type { WikiArticle } from "../types";

export const hatMatrixWiki: WikiArticle = {
  conceptId: "hat-matrix",

  summary:
    "H = X(XᵀX)⁻¹Xᵀ is not a new object — it is the symmetric idempotent matrix of `idempotent-matrices`, " +
    "specialized to project onto the column space of a design matrix. Every fact this article needs about " +
    "H — that trace(H) counts a dimension, that I − H is idempotent too, that the two projections annihilate " +
    "each other — was already proved there in general. Applying those three facts to H and I − H is what " +
    "produces the n − p degrees of freedom behind every t-statistic a regression prints.",

  sections: [
    {
      heading: "H is the general theory, specialized",
      blocks: [
        {
          kind: "prose",
          text:
            "`idempotent-matrices` proves three things about any symmetric idempotent matrix P, with no " +
            "reference to regression at all: (1) P is an orthogonal projection onto its own range, (2) " +
            "trace(P) = rank(P), because idempotence forces every eigenvalue to be 0 or 1, and (3) I − P is " +
            "also symmetric idempotent, with P(I − P) = 0 and rank(P) + rank(I − P) = n. Regression's " +
            "contribution is a single computation: showing that H = X(XᵀX)⁻¹Xᵀ satisfies P² = P and Pᵀ = P, " +
            "for an X that is n × p of full column rank.",
        },
        {
          kind: "formula",
          latex: "H = X(XᵀX)⁻¹Xᵀ,   ŷ = Hy,   e = (I − H)y",
          caption: "H puts the hat on y — hence the name",
        },
        {
          kind: "example",
          title: "H² = H, by cancellation",
          problem: "Verify that H is idempotent.",
          steps: [
            "H² = X(XᵀX)⁻¹Xᵀ · X(XᵀX)⁻¹Xᵀ.",
            "The middle Xᵀ·X(XᵀX)⁻¹ collapses: Xᵀ X (XᵀX)⁻¹ = I_p.",
            "What remains is X(XᵀX)⁻¹Xᵀ = H.",
          ],
          answer:
            "H² = H. Symmetry is immediate since (XᵀX)⁻¹ is symmetric and (ABC)ᵀ = CᵀBᵀAᵀ reverses cleanly " +
            "back to X(XᵀX)⁻¹Xᵀ. So H is exactly the kind of matrix `idempotent-matrices` studies — nothing " +
            "about regression is needed to invoke everything already proved there.",
        },
      ],
    },

    {
      heading: "Two dimensions that add to n",
      blocks: [
        {
          kind: "prose",
          text:
            "Because H is symmetric idempotent, `idempotent-matrices` already guarantees trace(H) = rank(H). " +
            "H projects onto the column space of X, so its range is C(X), of dimension p — the number of " +
            "estimated coefficients. That is the whole content of \"model degrees of freedom equals the " +
            "number of parameters\": it is trace(H) = p, read straight off a diagonal.",
        },
        {
          kind: "formula",
          latex: "trace(H) = rank(H) = p,   trace(I − H) = n − trace(H) = n − p",
          caption: "The complementary projection's rank is forced by rank(H) + rank(I − H) = n",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "n − p is a dimension count, not a formula to memorize",
          text:
            "I − H is symmetric idempotent for the same reason I − P always is: (I − H)² = I − 2H + H² = " +
            "I − 2H + H = I − H. Its range is the orthogonal complement of C(X), so its dimension is what is " +
            "left of ℝⁿ after removing the p directions the model can fit — exactly n − p. The residual " +
            "vector e = (I − H)y is confined to that subspace, so it has only n − p free coordinates even " +
            "though it lives in ℝⁿ.",
        },
      ],
    },

    {
      heading: "RSS is a quadratic form in an idempotent matrix",
      blocks: [
        {
          kind: "prose",
          text:
            "Write the errors as ε = y − Xβ, assumed ε ~ N_n(0, σ²I). Because H is built only from X, " +
            "(I − H)Xβ = Xβ − Hy has its systematic part cancel exactly: (I − H)X = X − X(XᵀX)⁻¹XᵀX = X − X = 0. " +
            "So the residual vector sees only the noise.",
        },
        {
          kind: "formula",
          latex: "e = (I − H)y = (I − H)ε,   RSS = eᵀe = εᵀ(I − H)ε",
          caption: "The residual sum of squares is a quadratic form in ε with matrix I − H",
        },
        {
          kind: "prose",
          text:
            "A quadratic form (z/σ)ᵀP(z/σ) in a standard normal vector z, built from a symmetric idempotent " +
            "matrix P of rank r, is by definition a sum of r squared independent standard normals — a " +
            "chi-square on r degrees of freedom. I − H is exactly such a matrix, with rank n − p, so:",
        },
        {
          kind: "formula",
          latex: "RSS/σ² = (ε/σ)ᵀ(I − H)(ε/σ)  ~  χ²_{n−p}",
          caption: "Not an approximation — exact for every n once the errors are normal",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where s² = RSS/(n − p) actually comes from",
          text:
            "E[χ²_{n−p}] = n − p, so E[RSS] = (n − p)σ², and dividing by n − p makes s² an unbiased estimator " +
            "of σ². The divisor is not a bias-correction bolted on afterward; it is the rank of I − H, which " +
            "is n − p because trace(H) = p, which is true because H is idempotent. Every step traces back to " +
            "the single algebraic fact P² = P.",
        },
      ],
    },

    {
      heading: "β̂ and s² are independent",
      blocks: [
        {
          kind: "prose",
          text:
            "β̂ − β = (XᵀX)⁻¹Xᵀε is a linear function of ε with matrix B = (XᵀX)⁻¹Xᵀ. Testing whether that " +
            "linear form and the quadratic form εᵀ(I − H)ε are independent comes down to one more product:",
        },
        {
          kind: "formula",
          latex: "B(I − H) = (XᵀX)⁻¹Xᵀ − (XᵀX)⁻¹XᵀX(XᵀX)⁻¹Xᵀ = (XᵀX)⁻¹Xᵀ − (XᵀX)⁻¹Xᵀ = 0",
          caption: "The same cancellation as H(I − H) = 0, one factor of X earlier",
        },
        {
          kind: "prose",
          text:
            "A linear form and a quadratic form in a spherical normal vector are independent whenever this " +
            "product vanishes. Geometrically, β̂ depends on y only through its projection Hy onto C(X), and " +
            "RSS depends on y only through its projection (I − H)y onto the orthogonal complement — two " +
            "orthogonal pieces of an isotropic Gaussian carry no information about each other.",
        },
      ],
    },

    {
      heading: "Why the t-statistic has n − p degrees of freedom",
      blocks: [
        {
          kind: "prose",
          text:
            "Every ingredient of a single coefficient's t-statistic is now in hand: β̂_j is normal (an affine " +
            "map of ε), s² is an independent σ²χ²_{n−p}/(n − p), and the unknown σ cancels in the ratio.",
        },
        {
          kind: "formula",
          latex:
            "t_j = (β̂_j − β_j) / SE(β̂_j) = [ (β̂_j − β_j)/(σ√[(XᵀX)⁻¹]_{jj}) ]  /  √( RSS/σ² / (n−p) )",
          caption: "A standard normal divided by the square root of an independent χ²_{n−p}/(n − p) — the definition of Student's t",
        },
        {
          kind: "prose",
          text:
            "The numerator is standard normal because β̂_j is exactly normal around β_j. The denominator is " +
            "√(χ²_{n−p}/(n − p)) because RSS/σ² is exactly that chi-square. Independence between the two — " +
            "proved above from B(I − H) = 0 — is what licenses calling the ratio a t-distribution at all " +
            "rather than some uncharacterized quotient. And the single number n − p that indexes it is not a " +
            "separate assumption: it is rank(I − H), forced by trace(H) = p, forced by H² = H.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The whole chain, in one line",
          text:
            "P² = P  ⟹  trace(H) = rank(H) = p  ⟹  rank(I − H) = n − p  ⟹  RSS/σ² ~ χ²_{n−p}  ⟹  " +
            "t_j ~ t_{n−p}. Each arrow is a fact from `idempotent-matrices`, applied once. Nothing about " +
            "regression contributes anything beyond the single verification that H is idempotent in the " +
            "first place — the rest is that one algebraic property doing all the remaining work.",
        },
        {
          kind: "example",
          title: "Reading off the degrees of freedom",
          problem:
            "A regression has an intercept and 4 predictors, fit on 30 observations. What distribution does " +
            "each coefficient's t-statistic follow?",
          steps: [
            "p = 5 (intercept plus 4 slopes), n = 30.",
            "trace(H) = rank(H) = p = 5.",
            "trace(I − H) = n − p = 25.",
          ],
          answer: "t_25 — Student's t on 25 degrees of freedom, for every one of the 5 coefficients.",
        },
      ],
    },
  ],

  references: [
    { source: "Strang, Linear Algebra and Its Applications", locator: "§4.2–4.3, Projections and Least Squares" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.3, Simple Linear Regression: Normal Errors" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.2, Linear Regression Models and Least Squares" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-02-ols-geometry-and-multiple-regression.md" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-02-quadratic-forms-and-regression.md (distribution-of-beta-hat)" },
  ],
};
