import type { WikiArticle } from "./types";

export const multivariateMgfWiki: WikiArticle = {
  conceptId: "multivariate-mgf",
  summary:
    "The multivariate moment generating function replaces the scalar argument t with a vector, " +
    "M_X(t) = E[exp(tᵀX)], and in doing so turns questions about a joint distribution into algebra " +
    "on a single function. It is the tool that makes the multivariate normal's closure properties " +
    "provable in two lines rather than by integrating a k-dimensional density: affine maps, sums, " +
    "marginals and independence all become simple operations on M.",

  sections: [
    {
      heading: "The definition, and the trick hiding inside it",
      blocks: [
        {
          kind: "formula",
          latex: "M_X(t) = E[ exp(tᵀX) ] = E[ exp(t_1X_1 + ⋯ + t_kX_k) ],   t ∈ ℝᵏ",
          caption: "Defined for t in some open ball around the origin; the value at t = 0 is always 1",
        },
        {
          kind: "prose",
          text:
            "The argument is a vector and the output is still a single number. That is the whole " +
            "design: a k-dimensional joint distribution, which as a density is an object on ℝᵏ that " +
            "resists manipulation, is encoded in one scalar-valued function whose behaviour under " +
            "the operations statistics performs is easy to write down.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is a univariate MGF in disguise",
          text:
            "Fix t. Then tᵀX is an ordinary scalar random variable, and M_X(t) = E[exp(1 · tᵀX)] is " +
            "that variable's univariate MGF evaluated at 1. So the multivariate MGF is not a new " +
            "object so much as the whole family of one-dimensional projections of X, indexed by the " +
            "direction t. Every proof below is really a univariate proof applied one direction at a " +
            "time.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "t ∈ ℝᵏ",
              description:
                "The direction and scale of the projection being taken. Setting some coordinates to 0 " +
                "is what produces marginals.",
            },
            {
              term: "K_X(t) = log M_X(t)",
              description:
                "The cumulant generating function. Its gradient at 0 is the mean vector and its " +
                "Hessian at 0 is Σ, which is often cleaner than differentiating M itself.",
            },
            {
              term: "φ_X(t) = E[exp(i tᵀX)]",
              description:
                "The characteristic function — the same construction with an imaginary argument. It " +
                "exists for every distribution, which the MGF does not, and every theorem below has a " +
                "characteristic-function version that needs no existence caveat.",
            },
          ],
        },
      ],
    },

    {
      heading: "Reading moments off it",
      blocks: [
        {
          kind: "prose",
          text:
            "Differentiating under the expectation brings powers of the coordinates down, exactly as " +
            "in the univariate case. Evaluating at t = 0 kills the exponential and leaves the moment.",
        },
        {
          kind: "formula",
          latex: "∂M/∂t_i |_{t=0} = E[X_i],    ∂²M/∂t_i∂t_j |_{t=0} = E[X_iX_j]",
          caption: "Mixed partials give cross moments; the covariance is then E[X_iX_j] − E[X_i]E[X_j]",
        },
        {
          kind: "prose",
          text:
            "Working with K = log M instead gives the centred quantities directly: ∇K(0) = μ and the " +
            "Hessian ∇²K(0) = Σ. The mixed second partial of the log is the covariance rather than " +
            "the raw cross moment, so no subtraction step is needed.",
        },
        {
          kind: "example",
          title: "Recovering μ and Σ from an MGF",
          problem:
            "A random vector in ℝ² has M(t) = exp(t_1 + 2t_2 + 2t_1² + 2t_1t_2 + 1.5t_2²). Identify " +
            "its distribution, mean vector and covariance matrix.",
          steps: [
            "Take logs: K(t) = t_1 + 2t_2 + 2t_1² + 2t_1t_2 + 1.5t_2². It is a quadratic with no terms " +
              "beyond order two, which is the signature of a normal vector.",
            "Match against K(t) = tᵀμ + ½tᵀΣt. The linear part gives μ = (1, 2)ᵀ.",
            "The quadratic part is ½(σ_{11}t_1² + 2σ_{12}t_1t_2 + σ_{22}t_2²). Matching t_1²: ½σ_{11} = 2, " +
              "so σ_{11} = 4. Matching t_1t_2: σ_{12} = 2. Matching t_2²: ½σ_{22} = 1.5, so σ_{22} = 3.",
          ],
          answer:
            "X ~ N_2(μ, Σ) with μ = (1, 2)ᵀ and Σ = [[4, 2], [2, 3]]. Note that the coefficient of the " +
            "cross term is σ_{12} itself, not twice it — the ½ out front and the two off-diagonal " +
            "entries cancel.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Existence is not automatic",
          text:
            "M_X(t) is only defined where the expectation is finite. Heavy-tailed vectors — the " +
            "multivariate t, the multivariate Cauchy — have no MGF anywhere except t = 0, so none of " +
            "the arguments below apply to them. The characteristic function is the repair: it is " +
            "bounded by 1 and therefore always exists, and every uniqueness and independence theorem " +
            "here holds for it verbatim.",
        },
      ],
    },

    {
      heading: "The three theorems that make it worth using",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Statement", "What it buys"],
          rows: [
            [
              "Uniqueness",
              "If M_X = M_Y on a neighbourhood of 0, then X and Y have the same joint distribution",
              "Identify a distribution by recognising its MGF, with no integration",
            ],
            [
              "Affine maps",
              "M_{AX+b}(t) = exp(tᵀb) · M_X(Aᵀt)",
              "The distribution of any linear combination, read off in one substitution",
            ],
            [
              "Independence",
              "X and Y are independent if and only if M_{(X,Y)}(s, u) = M_X(s) · M_Y(u) near 0",
              "Turns a statement about joint densities into a factorisation check",
            ],
            [
              "Marginals",
              "M_{X_1}(s) = M_X((s, 0, …, 0))",
              "Zero out the coordinates you are not asking about",
            ],
            [
              "Sums of independents",
              "M_{X+Y}(t) = M_X(t) · M_Y(t)",
              "Convolution becomes multiplication, as in one dimension",
            ],
          ],
        },
        {
          kind: "prose",
          text:
            "The affine rule is the one worth memorising in its transposed form. Substituting Aᵀt " +
            "rather than At is not a typo: tᵀ(AX) = (Aᵀt)ᵀX, so the direction the projection is " +
            "taken in gets pulled back through A, and the transpose is where AΣAᵀ in every " +
            "covariance calculation comes from.",
        },
      ],
    },

    {
      heading: "The multivariate normal's MGF",
      blocks: [
        {
          kind: "formula",
          latex: "X ~ N_k(μ, Σ)  ⟺  M_X(t) = exp( tᵀμ + ½ tᵀΣt )",
          caption: "The single formula this article exists to produce",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "By the projection definition of the multivariate normal, tᵀX is univariate Normal with " +
              "mean tᵀμ and variance tᵀΣt.",
            "The univariate Normal MGF is E[exp(sY)] = exp(sm + ½s²v) for Y ~ N(m, v).",
            "Evaluate it at s = 1 with m = tᵀμ and v = tᵀΣt: M_X(t) = exp(tᵀμ + ½tᵀΣt).",
            "Uniqueness runs the argument backwards: any vector whose MGF has this form is " +
              "multivariate normal with those parameters.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Every closure property is now one substitution",
          text:
            "For Y = AX + b: M_Y(t) = exp(tᵀb)·exp((Aᵀt)ᵀμ + ½(Aᵀt)ᵀΣ(Aᵀt)) = " +
            "exp(tᵀ(Aμ + b) + ½tᵀ(AΣAᵀ)t), which is the MGF of N(Aμ + b, AΣAᵀ). Marginals are the " +
            "case where A selects coordinates. Sums of independent normals multiply their MGFs, " +
            "adding the exponents, hence adding means and covariances. Three results that each cost " +
            "a change-of-variables argument with the density, and one line each here.",
        },
        {
          kind: "example",
          title: "A linear combination, without touching the density",
          problem:
            "X ~ N_2(μ, Σ) with μ = (1, 2)ᵀ and Σ = [[4, 2], [2, 3]]. Find the distribution of " +
            "Y = X_1 + X_2.",
          steps: [
            "Y = aᵀX with a = (1, 1)ᵀ, so M_Y(s) = M_X(sa).",
            "aᵀμ = 1 + 2 = 3.",
            "aᵀΣa = 4 + 2 + 2 + 3 = 11.",
            "M_Y(s) = exp(3s + ½·11·s²), which is the N(3, 11) MGF.",
          ],
          answer:
            "Y ~ N(3, 11). The variance is not 4 + 3 = 7: the two covariance entries contribute 2 · 2 " +
            "as well, which is exactly the cross term aᵀΣa keeps track of.",
        },
        {
          kind: "example",
          title: "Uncorrelated blocks really are independent",
          problem:
            "X = (X_1, X_2) is multivariate normal with Σ block-diagonal, Σ_{12} = 0. Show the blocks " +
            "are independent.",
          steps: [
            "Write t = (s, u) to match the blocks. Then tᵀμ = sᵀμ_1 + uᵀμ_2.",
            "With Σ_{12} = 0 the quadratic form splits: tᵀΣt = sᵀΣ_{11}s + uᵀΣ_{22}u, since the cross " +
              "terms are exactly the ones Σ_{12} multiplies.",
            "So M(s, u) = exp(sᵀμ_1 + ½sᵀΣ_{11}s) · exp(uᵀμ_2 + ½uᵀΣ_{22}u) = M_{X_1}(s) · M_{X_2}(u).",
            "Factorisation of the joint MGF is equivalent to independence.",
          ],
          answer:
            "Independent. This is the cleanest proof of the multivariate normal's signature property, " +
            "and it makes plain why the property is special to this family: the exponent is quadratic, " +
            "so 'no cross terms in Σ' and 'the MGF factors' are the same statement. For a general " +
            "distribution the exponent has terms of every order and zero covariance kills only one " +
            "of them.",
        },
      ],
    },

    {
      heading: "Cramér–Wold: one dimension at a time is enough",
      blocks: [
        {
          kind: "prose",
          text:
            "The insight from the first section — that M_X(t) is the univariate MGF of tᵀX at 1 — has " +
            "a converse worth stating on its own, because it is the formal licence for the " +
            "multivariate normal's projection definition.",
        },
        {
          kind: "formula",
          latex:
            "aᵀX_n →_d aᵀX  for every a ∈ ℝᵏ   ⟹   X_n →_d X",
          caption: "The Cramér–Wold device: all one-dimensional projections determine the joint law",
        },
        {
          kind: "prose",
          text:
            "The proof is a single substitution in the characteristic function: φ_X(t) = E[exp(i tᵀX)] " +
            "is the characteristic function of the scalar tᵀX evaluated at 1, so knowing the law of " +
            "every projection determines φ_X at every t, and uniqueness does the rest.",
        },
        {
          kind: "list",
          items: [
            "It is why 'X is multivariate normal if and only if aᵀX is univariate Normal for every a' " +
              "is a definition rather than a curiosity — the projections carry all the information.",
            "It reduces the multivariate central limit theorem to the univariate one: apply the " +
              "ordinary CLT to aᵀ(X̄ − μ) for each fixed a, then let Cramér–Wold assemble the " +
              "conclusion into N_k(0, Σ).",
            "It is the reason a quadratic form in a normal vector can be analysed by rotating to a " +
              "convenient basis: rotations act on projections, and projections are all there is.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Normal marginals are not normal projections",
          text:
            "Cramér–Wold asks about aᵀX for every a, not just for the k coordinate directions. " +
            "Checking that each X_i is Normal only checks k of infinitely many projections, which is " +
            "why a vector can have perfectly Normal marginals and still fail to be multivariate " +
            "normal — the failure shows up in some diagonal direction nobody looked at.",
        },
      ],
    },

    {
      heading: "Where this goes next",
      blocks: [
        {
          kind: "table",
          headers: ["Result downstream", "The MGF step it rests on"],
          rows: [
            ["Any affine image of a normal vector is normal", "M_{AX+b}(t) = exp(tᵀb) M_X(Aᵀt)"],
            ["β̂ = (XᵀX)⁻¹Xᵀy is exactly normal in finite samples", "The same affine rule, with A = (XᵀX)⁻¹Xᵀ"],
            ["Uncorrelated jointly normal quantities are independent", "The block factorisation above"],
            ["Sums of squares of normals are chi-square", "The χ² MGF (1 − 2s)^(−r/2), matched after rotating"],
            ["The multivariate CLT", "Cramér–Wold plus the univariate MGF proof"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why regression theory can be done by hand at all",
          text:
            "Everything a regression table prints is a function of β̂ and the residual sum of " +
            "squares. The first is an affine map of a normal vector and the second is a quadratic " +
            "form in one, so between this article's affine rule and the chi-square theory of " +
            "quadratic forms, the exact finite-sample distribution of every reported number follows " +
            "without a simulation.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§4.6, Multivariate Distributions; §2.3, MGFs" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§2.3, The Gaussian Distribution" },
    { source: "Banerjee & Roy, Linear Algebra and Matrix Analysis for Statistics", locator: "Ch. 10, Random Vectors" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-02-quadratic-forms-and-regression.md" },
  ],
};
