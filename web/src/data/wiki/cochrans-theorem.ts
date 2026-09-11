import type { WikiArticle } from "./types";

export const cochransTheoremWiki: WikiArticle = {
  conceptId: "cochrans-theorem",
  summary:
    "Cochran's theorem is the bookkeeping rule that makes classical inference work: if a sum of " +
    "squares of independent Normals splits into several quadratic forms whose ranks add up to the " +
    "number of observations, then those pieces are independent chi-squares with those ranks as " +
    "degrees of freedom. The independence of X̄ and S², the t-distribution, and every ANOVA table's " +
    "F-ratio are the same theorem applied to different decompositions.",

  sections: [
    {
      heading: "The statement",
      blocks: [
        {
          kind: "formula",
          latex:
            "X ~ N_n(0, σ²I),   ‖X‖² = Q_1 + ⋯ + Q_m   with   Q_i = XᵀA_iX,  rank(A_i) = r_i",
          caption: "Each A_i symmetric; the decomposition is an identity in X, holding for every x ∈ ℝⁿ",
        },
        {
          kind: "prose",
          text:
            "Under that setup the following three statements are equivalent, and it is the " +
            "equivalence rather than any one of them that makes the theorem so easy to apply.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "r_1 + ⋯ + r_m = n — the ranks add up to the ambient dimension.",
            "Every A_i is idempotent and A_iA_j = 0 for i ≠ j — the pieces are orthogonal " +
              "projections onto mutually orthogonal subspaces.",
            "Q_1/σ², …, Q_m/σ² are independent, with Q_i/σ² ~ χ²_{r_i}.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Counting is the whole proof obligation",
          text:
            "Condition (1) is arithmetic on integers you can read off a design, and it delivers (3), " +
            "which is a statement about a joint distribution in n dimensions. That is the leverage: " +
            "to know an ANOVA table's sums of squares are independent chi-squares you check that its " +
            "degrees-of-freedom column sums to n, and nothing else.",
        },
      ],
    },

    {
      heading: "Why it is true: orthogonal subspaces of a spherical Gaussian",
      blocks: [
        {
          kind: "prose",
          text:
            "Two facts about N_n(0, σ²I) do all the work. First, it is rotation-invariant: for any " +
            "orthogonal Q, QᵀX has covariance QᵀσIQ = σ²I, the same distribution. Second, its " +
            "coordinates in any orthonormal basis are therefore independent N(0, σ²).",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "The identity ‖x‖² = Σ xᵀA_ix for all x, with ranks summing to n, forces ΣA_i = I with " +
              "the column spaces of the A_i decomposing ℝⁿ into orthogonal subspaces V_1, …, V_m of " +
              "dimensions r_1, …, r_m.",
            "Choose an orthonormal basis of ℝⁿ built by concatenating orthonormal bases of the V_i, " +
              "and let Z = QᵀX be X in that basis. Then Z ~ N_n(0, σ²I) still.",
            "In that basis A_i is the projection keeping only the r_i coordinates belonging to V_i, " +
              "so Q_i = Σ_{j ∈ V_i} Z_j².",
            "Each Q_i/σ² is a sum of r_i squared independent standard Normals, hence χ²_{r_i}, and " +
              "different Q_i are built from disjoint sets of independent coordinates, hence " +
              "independent of one another.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Independence is orthogonality, for a spherical Gaussian",
          text:
            "The step that surprises people is that no calculation produces the independence — it " +
            "comes from the subspaces being orthogonal and the distribution not caring which " +
            "orthonormal basis you look at it in. Change the covariance to something non-spherical " +
            "and rotation-invariance is lost, along with the entire conclusion.",
        },
      ],
    },

    {
      heading: "Application 1: X̄ and S², and where the t-distribution comes from",
      blocks: [
        {
          kind: "prose",
          text:
            "X_1, …, X_n iid N(μ, σ²). The claim that X̄ and S² are independent is not obvious — " +
            "both are built from the same data, and S² is defined in terms of X̄. Cochran settles it " +
            "in three lines.",
        },
        {
          kind: "formula",
          latex: "Σ (X_i − μ)² = n(X̄ − μ)² + Σ (X_i − X̄)²",
          caption: "An algebraic identity, true observation by observation, with no probability in it",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Put Z = (X − μ1)/σ ~ N_n(0, I). The identity above reads ‖Z‖² = ZᵀPZ + ZᵀCZ, where " +
              "P = (1/n)11ᵀ and C = I − P.",
            "rank(P) = 1 and rank(C) = n − 1, and 1 + (n − 1) = n. Cochran's condition holds.",
            "So the two pieces are independent, with ZᵀPZ = n(X̄ − μ)²/σ² ~ χ²_1 and " +
              "ZᵀCZ = (n − 1)S²/σ² ~ χ²_{n−1}.",
            "Independence of those two functions of Z carries over to X̄ and S², since each is a " +
              "function of one piece alone.",
          ],
        },
        {
          kind: "example",
          title: "Assembling the t-statistic",
          problem:
            "Use the decomposition to show (X̄ − μ)/(S/√n) has a t-distribution with n − 1 degrees " +
            "of freedom.",
          steps: [
            "√n(X̄ − μ)/σ ~ N(0, 1) — this is the square root of the rank-1 piece, with its sign.",
            "(n − 1)S²/σ² ~ χ²_{n−1}, and by Cochran it is independent of the first.",
            "Divide: [√n(X̄ − μ)/σ] / √( [(n − 1)S²/σ²] / (n − 1) ) = √n(X̄ − μ)/S.",
            "The σ cancels between numerator and denominator, which is the point of the construction.",
          ],
          answer:
            "√n(X̄ − μ)/S ~ t_{n−1}, by the definition of the t as N(0, 1) over the square root of an " +
            "independent χ²_ν/ν. Every one-sample t-test rests on the independence Cochran supplies; " +
            "without it the ratio would have no known distribution, and the t table would be a " +
            "fiction.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "This is a normal-theory result, not a general one",
          text:
            "X̄ and S² are independent for the Normal and, in a precise sense, only for the Normal: " +
            "the independence characterises the family. For any other distribution they are " +
            "dependent, which is why the exact t-distribution is a normal-theory object and why " +
            "t-tests on strongly skewed small samples are justified by the CLT and robustness rather " +
            "than by this theorem.",
        },
      ],
    },

    {
      heading: "Application 2: the ANOVA table and the F-ratio",
      blocks: [
        {
          kind: "prose",
          text:
            "An analysis-of-variance table is a Cochran decomposition printed as a table. Its " +
            "degrees-of-freedom column is the list of ranks, and the requirement that the column sums " +
            "correctly is condition (1).",
        },
        {
          kind: "formula",
          latex:
            "Σ (y_i − ȳ)² = Σ n_g(ȳ_g − ȳ)² + Σ (y_i − ȳ_{g(i)})²,   (n − 1) = (g − 1) + (n − g)",
          caption: "Total = between-group + within-group, with the degrees of freedom adding to match",
        },
        {
          kind: "example",
          title: "A two-group table, counted out",
          problem:
            "Group A = (4, 6, 8), group B = (10, 12, 14). Build the decomposition, check the ranks, " +
            "and form the F-statistic.",
          steps: [
            "Grand mean 9; group means 6 and 12. Total sum of squares about the grand mean: " +
              "25 + 9 + 1 + 1 + 9 + 25 = 70.",
            "Between: 3(6 − 9)² + 3(12 − 9)² = 27 + 27 = 54, on g − 1 = 1 degree of freedom.",
            "Within: (4 + 0 + 4) + (4 + 0 + 4) = 16, on n − g = 4 degrees of freedom.",
            "54 + 16 = 70 and 1 + 4 = 5 = n − 1, so with the rank-1 grand-mean piece the ranks total " +
              "n = 6 and Cochran applies.",
            "F = (54/1)/(16/4) = 13.5, referred to F_{1,4} under the null of equal group means.",
          ],
          answer:
            "F = 13.5 on (1, 4) degrees of freedom. The ratio is an F precisely because Cochran " +
            "makes numerator and denominator independent chi-squares; the σ² each carries cancels, " +
            "which is why the test needs no knowledge of the error variance.",
        },
        {
          kind: "table",
          headers: ["Decomposition", "Projections", "Ranks"],
          rows: [
            ["Mean and deviations", "P = 11ᵀ/n, C = I − P", "1 + (n − 1) = n"],
            ["One-way ANOVA", "grand mean, between, within", "1 + (g − 1) + (n − g) = n"],
            ["Regression with p coefficients", "H − 11ᵀ/n, I − H, plus the mean", "1 + (p − 1) + (n − p) = n"],
          ],
        },
      ],
    },

    {
      heading: "Where it fails",
      blocks: [
        {
          kind: "list",
          items: [
            "Non-spherical covariance. The proof used rotation-invariance of N(0, σ²I). Under " +
              "heteroskedasticity or correlated errors the pieces are weighted sums of chi-squares, " +
              "the F-ratio is not F, and the nominal degrees of freedom overstate the information " +
              "available — the motivation for the Satterthwaite and Welch corrections.",
            "Ranks that do not add up. If Σr_i < n the pieces do not exhaust the space and the " +
              "equivalence fails; if a stated 'decomposition' has ranks summing to more than n, some " +
              "pair of subspaces overlaps and the pieces are dependent. This is the real content of " +
              "the warning that sequential (Type I) sums of squares in an unbalanced design are not " +
              "independent of one another.",
            "Non-normal data. Everything here is exact normal theory. Without normality the pieces " +
              "are still uncorrelated and still have the right expectations, but they are not " +
              "independent and not chi-square, and the tests are asymptotic at best.",
            "Estimated variance structures. Plugging an estimated Σ into a whitening step and then " +
              "invoking Cochran ignores the variability of that estimate, which is where the " +
              "difference between a t-test and a z-test comes from in the first place.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What to carry into the next lesson",
          text:
            "The regression row of the table above is the one about to be cashed in. Splitting ℝⁿ " +
            "into the column space of the design matrix and its orthogonal complement gives " +
            "ranks p and n − p; the first piece carries β̂ and the second carries the residual sum " +
            "of squares, and Cochran is what makes the estimate and its own standard error " +
            "independent — the fact that lets a t-statistic exist at all.",
          },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§5.3, Sampling from the Normal Distribution; §11.2, ANOVA" },
    { source: "Banerjee & Roy, Linear Algebra and Matrix Analysis for Statistics", locator: "Ch. 12, Cochran's Theorem" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 13, Linear and Logistic Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-02-quadratic-forms-and-regression.md" },
  ],
};
