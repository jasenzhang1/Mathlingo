import type { WikiArticle } from "./types";

export const distributionOfBetaHatWiki: WikiArticle = {
  conceptId: "distribution-of-beta-hat",
  summary:
    "Under the normal linear model, β̂ = (XᵀX)⁻¹Xᵀy is an affine map of a multivariate normal " +
    "vector, so it is exactly multivariate normal — N_p(β, σ²(XᵀX)⁻¹) — in any sample size. The " +
    "residual sum of squares is a quadratic form in the same vector, so it is exactly chi-square, " +
    "and Cochran's theorem makes the two independent. Every standard error, t-statistic, p-value " +
    "and confidence interval a regression prints is arithmetic on those three facts.",

  sections: [
    {
      heading: "The model, and the one assumption that does the work",
      blocks: [
        {
          kind: "formula",
          latex: "y = Xβ + ε,   ε ~ N_n(0, σ²I),   X fixed with rank(X) = p < n",
          caption: "The normal linear model. Equivalently y ~ N_n(Xβ, σ²I)",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "X, n × p",
              description:
                "The design matrix, treated as fixed and of full column rank — so XᵀX is invertible " +
                "and β is identified. Full rank is an assumption about the data you collected, not " +
                "about the world.",
            },
            {
              term: "ε ~ N(0, σ²I)",
              description:
                "Three assumptions in one symbol: mean zero (correct specification), σ²I " +
                "(homoskedastic and uncorrelated), and Normal. Only the last is needed for exactness; " +
                "the first two are needed for the answer to be right at all.",
            },
            {
              term: "H = X(XᵀX)⁻¹Xᵀ",
              description:
                "The hat matrix — the orthogonal projection onto the column space of X. Symmetric, " +
                "idempotent, with tr(H) = rank(H) = p, so I − H is the complementary projection of " +
                "rank n − p.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Nothing here is an approximation",
          text:
            "The results below hold for n = 5 as exactly as for n = 5,000,000. That is the payoff of " +
            "assuming normal errors: no central limit theorem is invoked anywhere, and the t and F " +
            "distributions are exact rather than asymptotic. Everything that looks like a large-sample " +
            "argument in regression is what you fall back to when this assumption is dropped.",
        },
      ],
    },

    {
      heading: "β̂ is an affine map of a normal vector",
      blocks: [
        {
          kind: "prose",
          text:
            "The least-squares estimator is not merely approximately linear in y — it is exactly " +
            "linear, with a coefficient matrix that does not depend on y at all. That single " +
            "observation, combined with the multivariate normal's closure under affine maps, gives " +
            "the whole distribution.",
        },
        {
          kind: "formula",
          latex: "β̂ = (XᵀX)⁻¹Xᵀ y = Ay   ⟹   β̂ ~ N_p( AXβ, σ² AAᵀ ) = N_p( β, σ²(XᵀX)⁻¹ )",
          caption: "With A = (XᵀX)⁻¹Xᵀ; the MGF rule M_{Ay}(t) = M_y(Aᵀt) is what licenses the first step",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Mean: E[β̂] = A E[y] = (XᵀX)⁻¹XᵀXβ = β. Unbiased, and note this needed only E[ε] = 0, " +
              "not normality or constant variance.",
            "Covariance: Cov(β̂) = A(σ²I)Aᵀ = σ²(XᵀX)⁻¹Xᵀ X(XᵀX)⁻¹ = σ²(XᵀX)⁻¹, using the symmetry " +
              "of (XᵀX)⁻¹. Here σ²I is doing real work: the middle factor collapses only because the " +
              "error covariance is a multiple of the identity.",
            "Shape: an affine image of a multivariate normal is multivariate normal, so β̂ is exactly " +
              "N_p with the mean and covariance just computed — no further argument is needed.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The covariance matrix is a statement about the design, not the data",
          text:
            "σ²(XᵀX)⁻¹ depends on y nowhere. The precision of every coefficient is fixed the moment " +
            "you choose which x values to observe — which is what makes experimental design a " +
            "mathematical subject, and why a badly conditioned XᵀX (nearly collinear predictors) " +
            "inflates standard errors no amount of data cleaning can repair. The variance inflation " +
            "factor is exactly the diagonal of this matrix, read against what it would have been " +
            "under an orthogonal design.",
        },
        {
          kind: "example",
          title: "Reading the covariance matrix off a small design",
          problem:
            "Four observations at x = 1, 2, 3, 4, with an intercept. Compute Cov(β̂) up to σ², and " +
            "interpret its off-diagonal entry.",
          steps: [
            "XᵀX = [[n, Σx], [Σx, Σx²]] = [[4, 10], [10, 30]], with determinant 120 − 100 = 20.",
            "(XᵀX)⁻¹ = (1/20)[[30, −10], [−10, 4]] = [[1.5, −0.5], [−0.5, 0.2]].",
            "So Var(β̂_1) = 0.2σ², which is σ²/S_xx with S_xx = Σ(x − x̄)² = 2.25 + 0.25 + 0.25 + " +
              "2.25 = 5 — the simple-regression formula, recovered from the matrix one.",
            "Cov(β̂_0, β̂_1) = −0.5σ², so Corr(β̂_0, β̂_1) = −0.5/√(1.5 × 0.2) = −0.913.",
          ],
          answer:
            "Cov(β̂) = σ²[[1.5, −0.5], [−0.5, 0.2]]. The strong negative correlation says the two " +
            "estimates trade off: a fitted line that is steeper than the truth must have a lower " +
            "intercept to still pass through the data's centre of mass. Centring the predictor makes " +
            "XᵀX diagonal and the correlation exactly zero, which is the real reason centring is " +
            "recommended — the fit is unchanged, but the parameters stop being entangled.",
        },
      ],
    },

    {
      heading: "s² is a quadratic form, and independent of β̂",
      blocks: [
        {
          kind: "prose",
          text:
            "σ² is never known, so every standard error has to be estimated, and the estimate is " +
            "built from the same y that produced β̂. Whether the resulting ratio has a usable " +
            "distribution depends entirely on those two being independent — which is where the " +
            "quadratic-form machinery earns its place.",
        },
        {
          kind: "formula",
          latex:
            "e = y − ŷ = (I − H)y = (I − H)ε,   RSS = eᵀe = εᵀ(I − H)ε,   s² = RSS/(n − p)",
          caption: "The residuals do not see Xβ at all: (I − H)X = 0, so the systematic part drops out",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "I − H is symmetric and idempotent of rank n − p, so RSS/σ² = (ε/σ)ᵀ(I − H)(ε/σ) is a " +
              "quadratic form in a standard normal vector with an idempotent matrix: RSS/σ² ~ " +
              "χ²_{n−p}.",
            "Hence E[s²] = σ², which is why the divisor is n − p rather than n: it is the rank of " +
              "the projection, i.e. the dimension of the space the residuals are free to live in.",
            "β̂ − β = (XᵀX)⁻¹Xᵀε is a linear form in ε with matrix B = (XᵀX)⁻¹Xᵀ, and " +
              "B(I − H) = (XᵀX)⁻¹Xᵀ − (XᵀX)⁻¹XᵀX(XᵀX)⁻¹Xᵀ = 0.",
            "By the linear-form version of Craig's theorem — equivalently by Cochran, splitting ℝⁿ " +
              "into the column space of X (rank p) and its orthogonal complement (rank n − p, and " +
              "p + (n − p) = n) — β̂ and RSS are independent.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two orthogonal subspaces, two independent statistics",
          text:
            "The geometry is the memorable form. H projects y onto the column space of X, and " +
            "everything about the fit lives there; I − H projects onto the orthogonal complement, " +
            "and everything about the noise level lives there. A spherical Gaussian's projections " +
            "onto orthogonal subspaces are independent, so the estimate and its own error bar are " +
            "independent — the same decomposition that makes X̄ independent of S², with the " +
            "column space of X in place of the vector of ones.",
        },
      ],
    },

    {
      heading: "Everything a regression table prints",
      blocks: [
        {
          kind: "table",
          headers: ["Reported quantity", "Exact distribution", "Which fact it uses"],
          rows: [
            ["β̂_j", "N(β_j, σ²[(XᵀX)⁻¹]_{jj})", "Affine map of a normal vector"],
            ["SE(β̂_j) = s√[(XᵀX)⁻¹]_{jj}", "σ√[(XᵀX)⁻¹]_{jj} × √(χ²_{n−p}/(n−p))", "RSS is chi-square"],
            ["t_j = (β̂_j − β_j)/SE(β̂_j)", "t_{n−p}", "Independence of β̂ and s²"],
            ["Confidence interval β̂_j ± t_{n−p,α/2} SE", "Coverage exactly 1 − α", "The same t"],
            ["F for q linear restrictions", "F_{q, n−p}", "Two independent chi-squares"],
            ["Confidence ellipsoid for β", "Level set of a quadratic form", "Mahalanobis distance under N_p"],
          ],
        },
        {
          kind: "prose",
          text:
            "The t-statistic is the assembly of all three results: divide the standard normal " +
            "(β̂_j − β_j)/(σ√[(XᵀX)⁻¹]_{jj}) by the square root of the independent χ²_{n−p}/(n−p) " +
            "given by s²/σ². The unknown σ cancels — which is the entire purpose of the ratio — and " +
            "what remains is exactly Student's t on n − p degrees of freedom.",
        },
        {
          kind: "formula",
          latex:
            "F = (Rβ̂ − r)ᵀ [ R(XᵀX)⁻¹Rᵀ ]⁻¹ (Rβ̂ − r) / (q s²)  ~  F_{q, n−p}   under H_0: Rβ = r",
          caption: "The general test of q linear restrictions; q = 1 recovers the square of the t-statistic",
        },
        {
          kind: "prose",
          text:
            "The numerator is a quadratic form in the normal vector Rβ̂ − r, weighted by the inverse " +
            "of its own covariance — the Mahalanobis distance of the estimate from the null, which " +
            "is chi-square on q degrees of freedom. The denominator is the independent χ²_{n−p} " +
            "from the residuals. Dividing each by its degrees of freedom gives an F by definition. " +
            "Setting R = I and r = β and taking the level set at the F critical value is the joint " +
            "confidence ellipsoid, whose axes are the eigenvectors of (XᵀX)⁻¹ — the multivariate " +
            "normal's ellipsoid geometry, now describing uncertainty about coefficients rather than " +
            "spread of data.",
        },
        {
          kind: "example",
          title: "Reproducing a regression table by hand",
          problem:
            "Fit y on x with x = (1, 2, 3, 4) and y = (3, 4, 6, 8). Report β̂, s², the standard " +
            "errors and the t-statistics, and say what each rests on.",
          steps: [
            "S_xx = 5 and S_xy = (−1.5)(−2.25) + (−0.5)(−1.25) + (0.5)(0.75) + (1.5)(2.75) = 8.5, so " +
              "β̂_1 = 8.5/5 = 1.7 and β̂_0 = 5.25 − 1.7(2.5) = 1.",
            "Fitted values 2.7, 4.4, 6.1, 7.8; residuals 0.3, −0.4, −0.1, 0.2; RSS = 0.09 + 0.16 + " +
              "0.01 + 0.04 = 0.30.",
            "n − p = 4 − 2 = 2, so s² = 0.15. This is the rank of I − H, confirmed by " +
              "tr(I − H) = 4 − tr(H) = 4 − 2.",
            "(XᵀX)⁻¹ = [[1.5, −0.5], [−0.5, 0.2]] from the previous example, so " +
              "SE(β̂_1) = √(0.15 × 0.2) = √0.03 = 0.1732 and SE(β̂_0) = √(0.15 × 1.5) = 0.4743.",
            "t_1 = 1.7/0.1732 = 9.82 and t_0 = 1/0.4743 = 2.11, each on 2 degrees of freedom.",
          ],
          answer:
            "β̂ = (1, 1.7), s² = 0.15, SEs 0.474 and 0.173, t-statistics 2.11 and 9.82 on t_2. Every " +
            "number came from three ingredients: (XᵀX)⁻¹ (the design), RSS (the fit), and n − p (the " +
            "rank of the residual projection). The reference distribution is t_2 rather than a " +
            "Normal because s² was estimated from two residual degrees of freedom — and it is a t " +
            "rather than nothing at all because Cochran made s² independent of β̂.",
        },
      ],
    },

    {
      heading: "What survives when normality does not",
      blocks: [
        {
          kind: "table",
          headers: ["Assumption dropped", "What is lost", "What remains"],
          rows: [
            [
              "Normal errors",
              "Exactness of the t and F distributions",
              "β̂ is still BLUE by Gauss–Markov, and still asymptotically normal by the CLT, so t-tests are approximately valid in large samples",
            ],
            [
              "Homoskedasticity (Σ = σ²Ω)",
              "Cov(β̂) = σ²(XᵀX)⁻¹ and the chi-square for RSS",
              "β̂ stays unbiased; the true covariance is (XᵀX)⁻¹XᵀΣX(XᵀX)⁻¹, estimated by sandwich (robust) standard errors, or fixed by weighted least squares",
            ],
            [
              "Independent errors",
              "Everything above, more severely",
              "Clustered or HAC standard errors, or an explicit correlation model such as GLS",
            ],
            [
              "Full column rank",
              "β is not identified and (XᵀX)⁻¹ does not exist",
              "Ridge or the pseudoinverse gives a unique estimate, at the cost of bias and of these exact distributions",
            ],
            [
              "X fixed / exogenous",
              "Unbiasedness itself",
              "Nothing in this article repairs it — this is the assumption instrumental variables and causal designs exist to address",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The reported standard error is conditional on the model being right",
          text:
            "σ²(XᵀX)⁻¹ measures sampling variability of β̂ under this design and this specification. " +
            "It says nothing about the variability introduced by having chosen the specification " +
            "after looking at the data. A standard error computed after stepwise selection on the " +
            "same sample is not the standard error of anything: the selection makes X random and " +
            "correlated with ε, and both the unbiasedness and the n − p degrees of freedom are lost.",
        },
        {
          kind: "list",
          items: [
            "Prediction at a new point x_0 uses the same normal vector: x_0ᵀβ̂ ~ N(x_0ᵀβ, σ²x_0ᵀ(XᵀX)⁻¹x_0), " +
              "and a prediction interval adds the σ² of the new observation's own error on top of that.",
            "Multicollinearity does not bias anything; it inflates the diagonal of (XᵀX)⁻¹, so " +
              "coefficients are individually uncertain while the fitted values may be precise — the " +
              "reason a joint F-test can reject while no single t-statistic does.",
            "Ridge regression trades this exactness for stability: β̂_ridge = (XᵀX + λI)⁻¹Xᵀy is " +
              "still normal, with mean (XᵀX + λI)⁻¹XᵀXβ ≠ β, so the usual t-statistics no longer " +
              "have their nominal distribution.",
            "Asymptotically the CLT gives √n(β̂ − β) →_d N_p(0, σ²Q⁻¹) with Q = lim XᵀX/n, so the " +
              "same covariance formula survives as an approximation without normality — the t just " +
              "becomes a z.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.3, Simple Linear Regression: Normal Errors" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 13, Linear and Logistic Regression" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.2, Linear Regression Models and Least Squares" },
    { source: "Banerjee & Roy, Linear Algebra and Matrix Analysis for Statistics", locator: "Ch. 13, The Linear Model" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-02-quadratic-forms-and-regression.md" },
  ],
};
