import type { WikiArticle } from "./types";

export const changeOfVariablesJacobianWiki: WikiArticle = {
  conceptId: "change-of-variables-jacobian",
  summary:
    "When a random vector is pushed through an invertible transformation, its density does not " +
    "simply move — it also stretches or compresses, because the same total probability now has to " +
    "cover a differently sized region. The Jacobian determinant is exactly the local volume-scaling " +
    "factor of the map, so dividing by it (equivalently, multiplying by the inverse map's Jacobian) " +
    "is what keeps the transformed density integrating to one.",

  sections: [
    {
      heading: "The one-dimensional case first",
      blocks: [
        {
          kind: "prose",
          text:
            "Let X have density f_X and let Y = g(X) for a differentiable, strictly monotone g. " +
            "Because g is monotone it has an inverse, and events match up one-to-one: " +
            "{Y ≤ y} is the same event as {X ≤ g⁻¹(y)} when g is increasing. Differentiating that " +
            "CDF identity gives the density.",
        },
        {
          kind: "formula",
          latex: "f_Y(y) = f_X(g⁻¹(y)) · |d/dy g⁻¹(y)|",
          caption: "Univariate change of variables",
        },
        {
          kind: "prose",
          text:
            "The absolute value covers the decreasing case, where the inequality flips and the " +
            "derivative is negative — a density can never be negative, so only the magnitude of the " +
            "stretching matters, not its orientation.",
        },
        {
          kind: "example",
          title: "Squaring a uniform",
          problem: "X ~ Uniform(0, 1) and Y = X². Find f_Y, and evaluate it at y = 0.25.",
          steps: [
            "g(x) = x² is strictly increasing on (0,1), so g⁻¹(y) = √y for y ∈ (0,1).",
            "d/dy √y = 1/(2√y).",
            "f_X is 1 on (0,1), so f_Y(y) = 1 · 1/(2√y).",
            "At y = 0.25: 1/(2·0.5).",
          ],
          answer:
            "f_Y(y) = 1/(2√y) on (0,1), and f_Y(0.25) = 1. The density is no longer flat — squaring " +
            "compresses the interval near 0 and stretches it near 1, so probability piles up at the " +
            "low end.",
        },
      ],
    },

    {
      heading: "The multivariate formula",
      blocks: [
        {
          kind: "prose",
          text:
            "Now let X be a random vector in ℝⁿ with density f_X, and let Y = g(X) for a " +
            "differentiable bijection g with a differentiable inverse. The one-dimensional " +
            "derivative is replaced by the Jacobian matrix of the inverse map, and its absolute " +
            "value by the absolute determinant.",
        },
        {
          kind: "formula",
          latex: "f_Y(y) = f_X(g⁻¹(y)) · |det J(y)|,   J(y)ᵢⱼ = ∂(g⁻¹)ᵢ / ∂yⱼ",
          caption: "Multivariate change of variables",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Jacobian matrix J",
              description:
                "The matrix of all first-order partial derivatives of the inverse map. It is the " +
                "best linear approximation to g⁻¹ near a point — the multivariate derivative.",
            },
            {
              term: "det J",
              description:
                "The signed factor by which that linear approximation scales volume. A determinant " +
                "of 3 means a small box near y maps to a box of three times the volume near x.",
            },
            {
              term: "|det J| ≠ 0",
              description:
                "Required. A zero determinant means the map collapses a direction, so it is not " +
                "invertible there and the formula does not apply.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The n = 1 case really is the same formula",
          text:
            "For n = 1 the Jacobian matrix is the 1×1 matrix [ (g⁻¹)′(y) ], and the determinant of " +
            "a 1×1 matrix is its single entry. So |det J| = |(g⁻¹)′(y)| and the multivariate formula " +
            "reduces to the univariate one exactly — not by analogy, but by substitution.",
        },
      ],
    },

    {
      heading: "Why the determinant has to be there",
      blocks: [
        {
          kind: "prose",
          text:
            "A density is probability per unit volume. Under a transformation the probability mass " +
            "in a small region is conserved — the region's points simply get relabelled — but the " +
            "region's volume is not. So the density has to absorb the difference.",
        },
        {
          kind: "formula",
          latex: "f_Y(y)·vol(dy) = f_X(x)·vol(dx)   ⟹   f_Y(y) = f_X(x) · vol(dx)/vol(dy)",
          caption: "Conservation of probability mass across a small cell",
        },
        {
          kind: "list",
          items: [
            "If g expands volume locally, the same mass is spread thinner, so f_Y is smaller than " +
              "f_X there.",
            "If g compresses volume locally, the same mass is concentrated, so f_Y is larger.",
            "The ratio vol(dx)/vol(dy) is exactly |det J| for the inverse map, which is what the " +
              "formula multiplies by.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is the determinant's geometric meaning, cashed in",
          text:
            "The determinant was introduced in linear algebra as the signed volume of the " +
            "parallelepiped spanned by a matrix's columns — the factor by which a linear map scales " +
            "volume. Densities transform by exactly the inverse of that scaling. Nothing new is " +
            "being asserted here; the probability formula is the volume interpretation applied " +
            "locally, one tangent space at a time.",
        },
      ],
    },

    {
      heading: "The worked case everyone has already seen: polar coordinates",
      blocks: [
        {
          kind: "prose",
          text:
            "Every calculus course teaches that converting a double integral to polar coordinates " +
            "requires writing r dr dθ rather than dr dθ, and most students memorise the extra r " +
            "without ever seeing where it comes from. It is a Jacobian determinant.",
        },
        {
          kind: "example",
          title: "The polar Jacobian",
          problem: "For x = r cos θ, y = r sin θ, compute the Jacobian determinant.",
          steps: [
            "∂x/∂r = cos θ,  ∂x/∂θ = −r sin θ.",
            "∂y/∂r = sin θ,  ∂y/∂θ = r cos θ.",
            "det = (cos θ)(r cos θ) − (−r sin θ)(sin θ) = r cos²θ + r sin²θ.",
            "= r(cos²θ + sin²θ) = r.",
          ],
          answer:
            "det J = r. So an area element dx dy equals r dr dθ — the familiar factor, now with a " +
            "reason attached.",
        },
        {
          kind: "prose",
          text:
            "The geometry is easy to see once stated: a cell of angular width dθ at radius r spans " +
            "an arc of length r dθ, so it is wider the further out it sits. Cells far from the " +
            "origin are larger, and the factor r is exactly how much larger. This is also the trick " +
            "behind the classic evaluation of the Gaussian integral ∫e^(−x²/2)dx: squaring it, " +
            "converting to polar, and integrating the resulting r e^(−r²/2) in closed form.",
        },
      ],
    },

    {
      heading: "Linear transformations",
      blocks: [
        {
          kind: "prose",
          text:
            "The most common case in practice is Y = AX + b for an invertible matrix A. Here " +
            "g⁻¹(y) = A⁻¹(y − b), the Jacobian is the constant matrix A⁻¹, and det(A⁻¹) = 1/det(A).",
        },
        {
          kind: "formula",
          latex: "f_Y(y) = f_X(A⁻¹(y − b)) / |det A|",
          caption: "Affine change of variables — the Jacobian is constant everywhere",
        },
        {
          kind: "prose",
          text:
            "This single line generates several results you will meet separately elsewhere: the " +
            "density of the multivariate Normal under a linear map (which is why the MVN family is " +
            "closed under affine transformations), the |Σ|^(−1/2) factor in the MVN density itself " +
            "(taking A = Σ^(1/2) applied to a standard Normal vector), and the scaling rule " +
            "f_Y(y) = f_X(y/a)/|a| for a simple rescaling in one dimension.",
        },
        {
          kind: "example",
          title: "A rotation of the plane",
          problem:
            "X is a standard bivariate Normal and Y = QX for an orthogonal Q (a rotation). What is " +
            "f_Y?",
          steps: [
            "For orthogonal Q, det Q = ±1, so |det Q| = 1.",
            "The Jacobian factor is therefore 1 — rotations do not change volume.",
            "f_Y(y) = f_X(Q⁻¹y) = f_X(Qᵀy).",
            "The standard bivariate Normal density depends on x only through ‖x‖², and " +
              "‖Qᵀy‖ = ‖y‖ because Q preserves lengths.",
          ],
          answer:
            "f_Y = f_X. The standard multivariate Normal is rotationally invariant, which is the " +
            "reason its level sets are circles and, more usefully, the reason a standard Normal " +
            "vector's direction is uniform on the sphere.",
        },
      ],
    },

    {
      heading: "Practical cautions",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Non-monotone maps need to be split up",
          text:
            "Y = X² for X on all of ℝ is not invertible: both +x and −x map to the same y. The fix " +
            "is to partition the domain into pieces on which g is monotone, apply the formula to " +
            "each, and add the contributions: f_Y(y) = Σᵢ f_X(gᵢ⁻¹(y))·|det Jᵢ(y)|. Skipping the " +
            "split is a common way to lose exactly half the density.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Track the support, not just the algebra",
          text:
            "The formula tells you the value of f_Y but not where it is nonzero. Deriving " +
            "f_Y(y) = 1/(2√y) and forgetting that it holds only on (0,1) gives a function that does " +
            "not integrate to 1. Work out the image of the original support under g explicitly, " +
            "every time.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Which map's Jacobian?",
          text:
            "The formula as written uses the Jacobian of the inverse map g⁻¹, evaluated at y. You " +
            "may equivalently divide by |det J_g| evaluated at x = g⁻¹(y), since the two " +
            "determinants are reciprocals. Mixing the two conventions — multiplying by the forward " +
            "Jacobian — inverts the correction and is the single most common error here.",
        },
        {
          kind: "prose",
          text:
            "A last note on dimension: the formula requires g to map ℝⁿ to ℝⁿ. To find the density " +
            "of a scalar function of a vector, such as U = X₁ + X₂, the standard device is to " +
            "invent a companion variable (say V = X₂), apply the square change of variables to " +
            "(U, V), and then integrate V out. That two-step manoeuvre is where the convolution " +
            "formula for the density of a sum comes from.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§4.3, Bivariate Transformations" },
    { source: "Wasserman, All of Statistics", locator: "§2.9 and §3.4, Transformations of Random Variables" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "§8.1, Change of Variables" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-01-multivariate-probability.md" },
  ],
};
