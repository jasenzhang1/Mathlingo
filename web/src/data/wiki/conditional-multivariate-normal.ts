import type { WikiArticle } from "./types";

export const conditionalMultivariateNormalWiki: WikiArticle = {
  conceptId: "conditional-multivariate-normal",
  summary:
    "The multivariate normal's closure table states X₁ | X₂ = x₂ ~ N(μ₁ + Σ₁₂Σ₂₂⁻¹(x₂ − μ₂), " +
    "Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁) as a fact to be quoted. This article derives it, using nothing beyond the " +
    "two tools built for exactly this: the multivariate MGF's independence-from-zero-covariance " +
    "theorem, and the Var(aᵀX) = aᵀΣa machinery quadratic forms supply for computing a residual's " +
    "covariance. The derivation also explains, rather than merely names, why the resulting " +
    "covariance matrix is the Schur complement of Σ₂₂.",

  sections: [
    {
      heading: "The trick: build something independent of X₂ out of X₁",
      blocks: [
        {
          kind: "prose",
          text:
            "Conditioning is hard in general because it asks about a slice of a joint density. The " +
            "move that sidesteps the integral is to stop asking about X₁ directly and instead " +
            "construct a new random vector — X₁'s residual after regressing it on X₂ — that is " +
            "independent of X₂ by design. Once that vector's distribution is known, conditioning on " +
            "X₂ = x₂ costs nothing.",
        },
        {
          kind: "formula",
          latex: "W = X₁ − Σ₁₂Σ₂₂⁻¹X₂",
          caption: "The residual of X₁ after removing its best linear predictor from X₂",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "B = Σ₁₂Σ₂₂⁻¹",
              description:
                "The population regression coefficient matrix — the same object that appears as " +
                "(XᵀX)⁻¹Xᵀy's population analogue. W is exactly the population residual of that " +
                "regression.",
            },
            {
              term: "W",
              description:
                "A fixed linear combination of the jointly normal vector (X₁, X₂), namely " +
                "W = [I  −B](X₁, X₂)ᵀ. It is therefore itself normal, by the affine-map closure " +
                "property, before a single moment of it is computed.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Nothing here needs the density",
          text:
            "The whole argument works with the affine-map and independence theorems from " +
            "`multivariate-mgf`, plus the bilinear extension of Var(aᵀX) = aᵀΣa from " +
            "`quadratic-forms-random-vectors`. Σ₂₂ need only be invertible, which is required for " +
            "the answer to be well-posed at all — no integral over ℝᵏ is ever set up.",
        },
      ],
    },

    {
      heading: "Step 1: W and X₂ are jointly normal, and uncorrelated",
      blocks: [
        {
          kind: "prose",
          text:
            "Stack W on top of X₂ as an affine image of (X₁, X₂):",
        },
        {
          kind: "formula",
          latex: "(W, X₂) = [[I, −B], [0, I]] · (X₁, X₂)ᵀ",
          caption: "A linear map of a jointly normal vector, hence jointly normal itself",
        },
        {
          kind: "prose",
          text:
            "Covariances of linear combinations of X extend Var(aᵀX) = aᵀΣa to Cov(aᵀX, bᵀX) = aᵀΣb — " +
            "the same bilinear identity one degree up. Apply it with a = row [I, −B] and b = row " +
            "[0, I]:",
        },
        {
          kind: "formula",
          latex: "Cov(W, X₂) = Cov(X₁, X₂) − B·Cov(X₂, X₂) = Σ₁₂ − Σ₁₂Σ₂₂⁻¹Σ₂₂ = Σ₁₂ − Σ₁₂ = 0",
          caption: "B was chosen for exactly this cancellation",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "B is not a guess",
          text:
            "Σ₁₂Σ₂₂⁻¹ is the unique matrix that makes Cov(W, X₂) vanish. Solving Σ₁₂ − MΣ₂₂ = 0 for M " +
            "gives M = Σ₁₂Σ₂₂⁻¹ directly — the whole derivation is downstream of picking B to zero out " +
            "this one covariance.",
        },
      ],
    },

    {
      heading: "Step 2: uncorrelated and jointly normal ⟹ independent",
      blocks: [
        {
          kind: "prose",
          text:
            "This step is where the derivation needs the multivariate normal specifically, and it is " +
            "the theorem `multivariate-mgf` exists to supply: for a jointly normal vector, the joint " +
            "MGF's exponent is a quadratic form, so a zero cross-covariance block makes the exponent " +
            "split additively, which makes the MGF factor into the product of the two pieces' " +
            "marginal MGFs. Factorisation of the joint MGF is equivalent to independence.",
        },
        {
          kind: "formula",
          latex: "M_{(W,X₂)}(s, u) = exp(sᵀμ_W + ½sᵀΣ_W s) · exp(uᵀμ₂ + ½uᵀΣ₂₂u) = M_W(s)·M_{X₂}(u)",
          caption: "Cov(W, X₂) = 0 is exactly the condition that kills the cross term in the exponent",
        },
        {
          kind: "prose",
          text: "Hence W ⊥ X₂. This is the step a general joint distribution does not get for free — " +
            "zero covariance alone never implies independence — and it is special to the normal " +
            "family for the same reason `multivariate-mgf` gives: the exponent has nothing above " +
            "second order, so removing the second-order cross term removes all the dependence there " +
            "is.",
        },
      ],
    },

    {
      heading: "Step 3: read off W's distribution, then invert the definition",
      blocks: [
        {
          kind: "prose",
          text:
            "Because W is a linear image of (X₁, X₂), its mean and covariance follow from the affine " +
            "rule directly, using the same bilinear identity as Step 1:",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "E[W] = μ₁ − Bμ₂ = μ₁ − Σ₁₂Σ₂₂⁻¹μ₂.",
            "Var(W) = Var(X₁) − 2·Cov(X₁, BX₂) + Var(BX₂) — or more directly, applying the bilinear " +
              "identity to a = [I, −B]: Var(W) = Σ₁₁ − BΣ₂₁ − Σ₁₂Bᵀ + BΣ₂₂Bᵀ.",
            "Substitute B = Σ₁₂Σ₂₂⁻¹ and simplify the last three terms: BΣ₂₁ = Σ₁₂Σ₂₂⁻¹Σ₂₁, " +
              "Σ₁₂Bᵀ = Σ₁₂Σ₂₂⁻¹Σ₂₁ (since Σ₂₂ and hence Σ₂₂⁻¹ is symmetric), and " +
              "BΣ₂₂Bᵀ = Σ₁₂Σ₂₂⁻¹Σ₂₁. Two of the three copies cancel one of the others.",
            "Var(W) = Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁ + Σ₁₂Σ₂₂⁻¹Σ₂₁ = Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁.",
          ],
        },
        {
          kind: "prose",
          text:
            "So W ~ N(μ₁ − Σ₁₂Σ₂₂⁻¹μ₂, Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁), and — the whole point of Step 2 — this " +
            "distribution does not change if we condition on X₂ = x₂, since W is independent of X₂. " +
            "Now invert W's definition: X₁ = W + BX₂, so conditionally on X₂ = x₂, X₁ is W's (fixed) " +
            "distribution shifted by the constant Bx₂:",
        },
        {
          kind: "formula",
          latex: "X₁ | X₂ = x₂  ~  N( μ₁ + Σ₁₂Σ₂₂⁻¹(x₂ − μ₂),  Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁ )",
          caption: "The formula quoted in `multivariate-normal`, now derived rather than stated",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Every piece of the formula has a source in the proof",
          text:
            "The mean μ₁ − Σ₁₂Σ₂₂⁻¹μ₂ shifted by Bx₂ becomes μ₁ + Σ₁₂Σ₂₂⁻¹(x₂ − μ₂) — Step 3's line 1 " +
            "plus the constant added when inverting W = X₁ − BX₂. The covariance is untouched by " +
            "conditioning specifically because Step 2 proved W ⊥ X₂: observing X₂ moves where you " +
            "expect X₁ to be without moving how uncertain you are about it, and that independence is " +
            "the formal reason, not an unexplained property of the formula.",
        },
      ],
    },

    {
      heading: "Why the covariance is a Schur complement, and why that matters",
      blocks: [
        {
          kind: "prose",
          text:
            "Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁ is by definition the Schur complement of Σ₂₂ in the block matrix Σ. " +
            "That is not a coincidence dressed up in two names for one object — block elimination " +
            "(solving the top block row of Σx = b after using the bottom row to remove X₂) produces " +
            "the identical expression, because conditioning and Gaussian elimination are doing the " +
            "same bookkeeping: both remove a block's dependence on the other by subtracting off its " +
            "best linear explanation.",
        },
        {
          kind: "table",
          headers: ["Fact about the Schur complement", "What it means for the conditional"],
          rows: [
            [
              "It is the (1,1) block of Σ⁻¹, inverted: (Σ⁻¹)₁₁⁻¹ = Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁",
              "The conditional precision (Σ⁻¹)₁₁ is read straight off the joint precision matrix — " +
                "the reason Gaussian graphical models parameterise by precision rather than covariance",
            ],
            [
              "It is positive definite whenever Σ is",
              "The conditional covariance is a legitimate covariance matrix, never singular, as long " +
                "as the joint one was",
            ],
            [
              "It never exceeds Σ₁₁ (in the positive-semidefinite order)",
              "Conditioning can only shrink uncertainty: aᵀ(Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁)a ≤ aᵀΣ₁₁a for every a",
            ],
          ],
        },
        {
          kind: "example",
          title: "Positive definiteness, as a quadratic form",
          problem:
            "Show directly that aᵀ(Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁)a ≥ 0 for every vector a, using nothing but the " +
            "definition of W.",
          steps: [
            "Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁ is Var(W) by Step 3, so the quadratic form aᵀVar(W)a equals " +
              "Var(aᵀW) by the same identity `quadratic-forms-random-vectors` uses to read a variance " +
              "off a quadratic form.",
            "A variance is never negative, so aᵀ(Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁)a = Var(aᵀW) ≥ 0 for every a.",
            "Strict positivity for a ≠ 0 follows whenever Σ itself is strictly positive definite, " +
              "since then no nonzero linear combination of X — and W is one — can have zero variance.",
          ],
          answer:
            "Positive semidefinite always, positive definite whenever Σ is. No eigenvalue computation " +
            "is needed: the quadratic form is a variance because the matrix it comes from is a " +
            "covariance matrix, and that alone settles the sign.",
        },
        {
          kind: "example",
          title: "A full numeric conditional",
          problem:
            "X ~ N₂(μ, Σ) with μ = (1, 2)ᵀ and Σ = [[4, 2], [2, 3]]. Find the distribution of " +
            "X₁ | X₂ = 4.",
          steps: [
            "Σ₁₂Σ₂₂⁻¹ = 2 · (1/3) = 2/3.",
            "Conditional mean: μ₁ + (2/3)(x₂ − μ₂) = 1 + (2/3)(4 − 2) = 1 + 4/3 = 7/3.",
            "Conditional variance: Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁ = 4 − (2/3)(2) = 4 − 4/3 = 8/3.",
          ],
          answer:
            "X₁ | X₂ = 4 ~ N(7/3, 8/3). The variance 8/3 is smaller than the unconditional Var(X₁) = 4, " +
            "exactly as the shrinkage fact above requires: observing X₂ has removed some, but not all, " +
            "of the uncertainty about X₁, and how much depends only on the correlation, never on the " +
            "observed value of x₂ itself.",
        },
      ],
    },

    {
      heading: "Assumptions, and what breaks without them",
      blocks: [
        {
          kind: "list",
          items: [
            "Σ₂₂ must be invertible. If X₂ is degenerate — an exact linear combination of other " +
              "components — B = Σ₁₂Σ₂₂⁻¹ is not defined, and the conditional needs the Moore-Penrose " +
              "pseudoinverse in its place.",
            "The zero-covariance-implies-independence step is joint normality's signature property " +
              "and has no analogue for a general distribution: for most joint laws, constructing a " +
              "linear residual uncorrelated with X₂ says nothing about independence, and conditioning " +
              "genuinely requires the integral this derivation was built to avoid.",
            "The conditional covariance not depending on x₂ is also special to the normal family. For " +
              "a general joint density, Var(X₁ | X₂ = x₂) is itself a function of x₂ — normal " +
              "conditionals are homoskedastic in x₂ by construction, which is exactly why linear " +
              "regression's constant-variance assumption is automatic under joint normality rather " +
              "than an extra hypothesis.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where this machinery goes next",
          text:
            "Kriging and Gaussian process regression are this formula applied with X₂ the observed " +
            "training points and X₁ the values at unobserved locations — the posterior mean and " +
            "covariance in a Gaussian process are literally this conditional, with Σ built from a " +
            "kernel instead of estimated from data. Kalman filter updates and Gaussian graphical " +
            "models' local Markov property are the same formula read as a recursion and as a sparsity " +
            "statement about Σ⁻¹, respectively.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§4.6, Multivariate Distributions" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§2.3.1, Conditional Gaussian Distributions" },
    { source: "Banerjee & Roy, Linear Algebra and Matrix Analysis for Statistics", locator: "Ch. 10–11, Random Vectors and the Schur Complement" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-01-multivariate-probability.md" },
  ],
};
