import type { WikiArticle } from "../types";

export const multidimensionalItoCalculusWiki: WikiArticle = {
  conceptId: "multidimensional-ito-calculus",
  summary:
    "When several, possibly correlated, Brownian motions drive a vector of processes, Itô's lemma " +
    "picks up a new ingredient beyond the one-dimensional case: a cross-variation term that captures " +
    "how correlated noise sources interact through the Hessian of $f$. Everything else — Taylor-expand, " +
    "keep the terms of order $dt$, discard the rest — is the same argument as before, just carried out " +
    "with a vector of processes instead of one.",

  sections: [
    {
      heading: "Correlated Brownian motions",
      blocks: [
        {
          kind: "formula",
          latex: "d\\langle W^i, W^j \\rangle_t = \\rho_{ij}\\, dt, \\qquad \\rho_{ii} = 1",
          caption: "ρ_ij is the instantaneous correlation between Wⁱ and Wʲ; the diagonal is quadratic variation of each Brownian motion with itself",
        },
        {
          kind: "prose",
          text:
            "$W^1, \\ldots, W^n$ are each individually standard Brownian motions, but they need not move " +
            "independently — $\\rho_{ij}$ captures how tightly the $i$-th and $j$-th sources of noise move " +
            "together. This is the natural extension of the quadratic variation multiplication table to " +
            "several noise sources: $dW^i \\cdot dW^j = \\rho_{ij}\\, dt$, reducing to the familiar " +
            "$dW \\cdot dW = dt$ when $i = j$, and to $dW^i \\cdot dW^j = 0$ when the two are independent " +
            "($\\rho_{ij} = 0$).",
        },
      ],
    },

    {
      heading: "The multivariate Itô formula",
      blocks: [
        {
          kind: "prose",
          text:
            "Let $X_t = (X_t^1, \\ldots, X_t^n)$ follow a system of SDEs, $dX^i = \\mu_i\\, dt + " +
            "\\sum_k \\sigma_{ik}\\, dW^k$, and let $f(t, x)$ be a scalar function of time and the vector " +
            "$x$. The same second-order Taylor expansion used in the one-dimensional case, now applied to " +
            "several coordinates at once, gives:",
        },
        {
          kind: "formula",
          latex:
            "df = f_t\\, dt + \\nabla f \\cdot dX + \\tfrac{1}{2} \\sum_{i,j} \\left(\\sigma\\sigma^\\top\\right)_{ij} f_{x_i x_j}\\, dt",
          caption: "∇f·dX is the vector chain-rule term; the sum is the new cross-variation term, using dXⁱ·dXʲ = (σσᵀ)_ij dt",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The new ingredient is the off-diagonal Hessian term",
          text:
            "In one dimension the second-order term was just $\\tfrac12 \\sigma^2 f_{xx}\\, dt$ — a single " +
            "number times a single second derivative. Here, whenever $i \\ne j$, the term " +
            "$(\\sigma\\sigma^\\top)_{ij} f_{x_i x_j}\\, dt$ is genuinely new: it exists only because two " +
            "different noise sources are correlated *and* $f$ has mixed curvature between those two " +
            "coordinates. Set $\\rho_{ij} = 0$ for all $i \\ne j$ and every one of these cross terms " +
            "vanishes, collapsing back to $n$ separate copies of the one-dimensional formula.",
        },
      ],
    },

    {
      heading: "Example: two correlated GBMs",
      blocks: [
        {
          kind: "prose",
          text:
            "Let $S^1, S^2$ both follow geometric Brownian motion, $dS^i = \\mu_i S^i\\, dt + \\sigma_i " +
            "S^i\\, dW^i$, with $d\\langle W^1, W^2 \\rangle_t = \\rho\\, dt$. Apply the multivariate " +
            "formula to $f(x_1, x_2) = x_1 x_2$, the product, so $f_{x_1} = x_2$, $f_{x_2} = x_1$, " +
            "$f_{x_1x_1} = f_{x_2x_2} = 0$, and $f_{x_1x_2} = 1$.",
        },
        {
          kind: "formula",
          latex:
            "d(S^1 S^2) = S^2\\, dS^1 + S^1\\, dS^2 + \\rho\\sigma_1\\sigma_2 S^1 S^2\\, dt",
          caption: "Only the mixed-partial term survives from the Hessian sum, contributing exactly the covariance rate ρσ₁σ₂S¹S² dt",
        },
        {
          kind: "prose",
          text:
            "Substituting $dS^1$ and $dS^2$ and collecting terms shows $S^1 S^2$ itself follows GBM-like " +
            "dynamics with drift $(\\mu_1 + \\mu_2 + \\rho\\sigma_1\\sigma_2) S^1 S^2$ — the correlation " +
            "term adds directly to the combined drift. This is the mechanism, for instance, behind why a " +
            "basket or spread of two correlated assets has a drift that depends on their correlation, not " +
            "just their individual drifts.",
        },
      ],
    },

    {
      heading: "Why this matters",
      blocks: [
        {
          kind: "list",
          items: [
            "Multi-asset option pricing (basket options, spread options, quantos) requires exactly this cross-variation term — correlation between underlyings shows up nowhere else in the pricing PDE.",
            "The multivariate Girsanov theorem, used to move between measures in a multi-asset model, is the vector generalization of the same measure-change idea, and needs this Itô formula to justify the resulting drift changes.",
            "In risk management, portfolio variance calculations are literally an application of the cross-variation term to a linear combination of correlated assets.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§4.7, Multiple Stock Prices" },
    { source: "Øksendal, Stochastic Differential Equations", locator: "Ch. 4, The Itô Formula — multidimensional case" },
  ],
};
