import type { WikiArticle } from "./types";

export const bivariateNormalWiki: WikiArticle = {
  conceptId: "bivariate-normal",
  summary:
    "The bivariate normal is the joint distribution of two variables that are individually Normal " +
    "and linearly related through a single correlation parameter ρ. Five numbers — two means, two " +
    "standard deviations, and ρ — fix it completely. It is worth studying on its own, before the " +
    "general k-dimensional case, because every structural feature of the multivariate Normal is " +
    "already visible in two dimensions where you can still draw the picture.",

  sections: [
    {
      heading: "The density and its five parameters",
      blocks: [
        {
          kind: "formula",
          latex:
            "f(x,y) = 1/(2πσ_Xσ_Y√(1−ρ²)) · exp( −(1/(2(1−ρ²)))·[ zₓ² − 2ρ zₓ z_y + z_y² ] )",
          caption: "with zₓ = (x − μ_X)/σ_X and z_y = (y − μ_Y)/σ_Y",
        },
        {
          kind: "definitions",
          items: [
            { term: "μ_X, μ_Y", description: "The two marginal means — where the distribution is centred." },
            { term: "σ_X, σ_Y", description: "The two marginal standard deviations — the spread along each axis." },
            {
              term: "ρ ∈ (−1, 1)",
              description:
                "The correlation. It is the only parameter coupling the two variables, and it " +
                "controls the tilt and the eccentricity of the elliptical contours.",
            },
          ],
        },
        {
          kind: "prose",
          text:
            "Written in vector form the density is the k = 2 case of the multivariate Normal, with " +
            "Σ = [[σ_X², ρσ_Xσ_Y], [ρσ_Xσ_Y, σ_Y²]]. Two facts fall straight out of that: " +
            "det Σ = σ_X²σ_Y²(1 − ρ²), which is where the √(1 − ρ²) in the normalising constant " +
            "comes from, and the requirement |ρ| < 1, which is exactly the condition for Σ to be " +
            "invertible rather than singular.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The exponent is a Mahalanobis distance",
          text:
            "The bracketed expression zₓ² − 2ρzₓz_y + z_y², divided by (1 − ρ²), is the quadratic " +
            "form (x − μ)ᵀΣ⁻¹(x − μ). At ρ = 0 it collapses to the ordinary squared distance " +
            "zₓ² + z_y²; as |ρ| grows, the cross term shears the distance so that points along the " +
            "correlation direction count as “closer” than their Euclidean distance suggests.",
        },
      ],
    },

    {
      heading: "The contours are ellipses",
      blocks: [
        {
          kind: "prose",
          text:
            "Fixing f(x, y) at a constant fixes the quadratic form in the exponent, and the level " +
            "set of a positive definite quadratic form is an ellipse. Sketching the ellipse for a " +
            "given ρ is the fastest way to build intuition about the whole family.",
        },
        {
          kind: "table",
          headers: ["ρ", "Shape of the contours", "Interpretation"],
          rows: [
            ["0", "Axis-aligned ellipse (a circle if σ_X = σ_Y)", "No linear relationship"],
            ["0 < ρ < 1", "Tilted up and to the right; narrower as ρ grows", "Above-average X goes with above-average Y"],
            ["−1 < ρ < 0", "Tilted down to the right", "Above-average X goes with below-average Y"],
            ["ρ → ±1", "Collapsing toward a straight line", "Σ becomes singular; the density does not exist in the limit"],
          ],
        },
        {
          kind: "prose",
          text:
            "The ellipse axes point along the eigenvectors of Σ, and the axis half-lengths are " +
            "proportional to the square roots of its eigenvalues. When σ_X = σ_Y the eigenvectors " +
            "are the 45° lines regardless of ρ, which is the case worth drawing first: correlation " +
            "then stretches the ellipse along y = x and squeezes it along y = −x, without rotating " +
            "it any further.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "ρ = ±1 is outside the family",
          text:
            "At |ρ| = 1 the ellipse degenerates to a line segment, det Σ = 0, and Σ⁻¹ does not " +
            "exist — so the density formula divides by zero. The distribution still makes sense as " +
            "a degenerate one, supported on a line, but it has no density with respect to " +
            "two-dimensional area. This is the bivariate face of the singular-Σ case.",
        },
      ],
    },

    {
      heading: "Marginals and conditionals",
      blocks: [
        {
          kind: "prose",
          text:
            "The two operations you actually perform on a joint distribution — marginalise a " +
            "variable away, or condition on its value — both return Normals. That closure is what " +
            "makes the family tractable.",
        },
        {
          kind: "formula",
          latex: "X ~ N(μ_X, σ_X²),   Y ~ N(μ_Y, σ_Y²)",
          caption: "Marginals: integrate the other variable out and ρ disappears entirely",
        },
        {
          kind: "formula",
          latex:
            "Y | X = x  ~  N( μ_Y + ρ(σ_Y/σ_X)(x − μ_X),  σ_Y²(1 − ρ²) )",
          caption: "The conditional distribution — a Normal with a shifted mean and shrunken variance",
        },
        {
          kind: "list",
          items: [
            "The conditional mean is linear in x. This is the population regression line, and its " +
              "slope ρσ_Y/σ_X is precisely the least-squares slope — so linear regression is not an " +
              "approximation under joint normality, it is exact.",
            "The conditional variance σ_Y²(1 − ρ²) does not depend on x at all. Homoskedasticity, " +
              "usually assumed in regression, is a theorem here.",
            "Knowing X reduces Y's variance by the factor (1 − ρ²), so the proportion of variance " +
              "explained is ρ² — the R² of the simple regression, recovered from the joint " +
              "distribution.",
          ],
        },
        {
          kind: "example",
          title: "Conditioning on an observation",
          problem:
            "μ_X = μ_Y = 0, σ_X = 1, σ_Y = 2, ρ = 0.5. Find the distribution of Y given X = 1.",
          steps: [
            "Conditional mean: 0 + 0.5·(2/1)·(1 − 0) = 1.",
            "Conditional variance: 4·(1 − 0.25) = 3.",
          ],
          answer:
            "Y | X = 1 ~ N(1, 3). Observing X one standard deviation above its mean moves Y's " +
            "expectation up by half of Y's standard deviation, and cuts Y's variance from 4 to 3 — " +
            "a 25% reduction, exactly ρ².",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Regression to the mean, in one line",
          text:
            "The conditional mean in standardised units is E[z_y | zₓ] = ρ·zₓ. Since |ρ| < 1, the " +
            "predicted Y is always closer to the mean, in standard-deviation units, than the " +
            "observed X was. Galton's “regression toward mediocrity” is not a substantive claim " +
            "about heredity or performance; it is arithmetic, true for any |ρ| < 1 whatsoever.",
        },
      ],
    },

    {
      heading: "The special property: ρ = 0 does imply independence",
      blocks: [
        {
          kind: "prose",
          text:
            "In general, zero correlation does not imply independence. For the bivariate normal " +
            "specifically, it does — and the proof is a two-line simplification of the density.",
        },
        {
          kind: "example",
          title: "Factoring the density at ρ = 0",
          problem: "Show that setting ρ = 0 makes f(x, y) factor into f_X(x)·f_Y(y).",
          steps: [
            "At ρ = 0 the normalising constant's √(1 − ρ²) becomes 1, leaving 1/(2πσ_Xσ_Y).",
            "The cross term −2ρzₓz_y vanishes from the exponent.",
            "The 1/(1 − ρ²) prefactor in the exponent becomes 1.",
            "What remains is exp(−½(zₓ² + z_y²)) = exp(−½zₓ²)·exp(−½z_y²).",
            "Pair each exponential with one 1/(√(2π)σ) factor.",
          ],
          answer:
            "f(x, y) = [1/(√(2π)σ_X)·e^(−zₓ²/2)]·[1/(√(2π)σ_Y)·e^(−z_y²/2)] = f_X(x)·f_Y(y), which " +
            "is the definition of independence.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The guarantee needs joint normality, not two Normal marginals",
          text:
            "Let X ~ N(0, 1) and Y = X². Then Cov(X, Y) = E[X³] = 0 by symmetry, yet Y is a " +
            "deterministic function of X. There is no contradiction: (X, X²) is not bivariate " +
            "normal — its support is a parabola, not the whole plane. Two Normal marginals are not " +
            "enough. A sharper counterexample: take X ~ N(0,1), flip a fair coin, and set Y = X or " +
            "Y = −X accordingly. Both marginals are exactly N(0,1) and Cov(X, Y) = 0, but all the " +
            "mass sits on two lines and the pair is dependent.",
        },
        {
          kind: "prose",
          text:
            "The practical consequence is a rule for when the correlation shortcut is legitimate. " +
            "Checking r ≈ 0 is a valid test for independence exactly when joint normality is " +
            "plausible, and worthless otherwise. This is why independent component analysis, which " +
            "must separate genuinely non-Gaussian sources, cannot stop at decorrelating the data: " +
            "decorrelation (what PCA gives you) is strictly weaker than independence off the " +
            "Gaussian family, so ICA reaches for higher-order statistics instead.",
        },
      ],
    },

    {
      heading: "Constructing one, and recognising one",
      blocks: [
        {
          kind: "prose",
          text:
            "The constructive definition is often more useful than the density. Take Z₁, Z₂ " +
            "independent standard Normals and set X = μ_X + σ_X Z₁ and " +
            "Y = μ_Y + σ_Y(ρZ₁ + √(1 − ρ²) Z₂). Then (X, Y) is bivariate normal with exactly the " +
            "five parameters given: Y's variance is σ_Y²(ρ² + 1 − ρ²) = σ_Y², and the correlation " +
            "works out to ρ. This is how you simulate one, and it is the two-dimensional case of " +
            "the general X = μ + Σ^(1/2)Z construction.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The definition that generalises",
          text:
            "The most robust definition of joint normality is not the density but this: (X, Y) is " +
            "bivariate normal if and only if every linear combination aX + bY is univariate Normal. " +
            "It requires no invertible Σ, so it covers the degenerate |ρ| = 1 case, and it is the " +
            "definition that extends verbatim to k dimensions. It also makes the closure properties " +
            "obvious — a linear combination of linear combinations is still a linear combination.",
        },
        {
          kind: "list",
          items: [
            "Any linear combination aX + bY is Normal, with variance a²σ_X² + b²σ_Y² + 2abρσ_Xσ_Y.",
            "Uncorrelated together with jointly normal ⟹ independent. Uncorrelated on its own ⟹ nothing.",
            "Independent ⟹ uncorrelated, always, for any distribution with finite variances.",
            "The family is closed under marginalising, conditioning, and affine maps — the three " +
              "things statistical methods actually do.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§4.5, The Bivariate Normal Distribution" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "§7.5, Multivariate Normal Distribution" },
    { source: "Wasserman, All of Statistics", locator: "§2.10 and §3.5, The Bivariate Normal" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-01-multivariate-probability.md" },
  ],
};
